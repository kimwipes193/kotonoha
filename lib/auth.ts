import { env } from 'cloudflare:workers';
import { createRemoteJWKSet, jwtVerify } from 'jose';

const keys = createRemoteJWKSet(new URL('https://www.googleapis.com/oauth2/v3/certs'));
export const SESSION_SECONDS = 60 * 60 * 24 * 30;
const STATE_SECONDS = 600;
export function authDb() { if (!env.DB) throw new Error('Authentication storage unavailable'); return env.DB; }
export function authConfig(req?:Request) {
 if (!env.GOOGLE_CLIENT_ID || !env.GOOGLE_CLIENT_SECRET || !env.APP_ORIGIN) return null;
 try { const url = new URL(env.APP_ORIGIN); if (url.origin !== env.APP_ORIGIN || (url.protocol !== 'https:' && !(url.protocol === 'http:' && ['localhost','127.0.0.1'].includes(url.hostname)))) return null;
 const requested=req?new URL(req.url).origin:url.origin;
 const origin=requested===env.PAGES_ORIGIN?requested:url.origin;
 return {clientId:env.GOOGLE_CLIENT_ID, clientSecret:env.GOOGLE_CLIENT_SECRET, origin}; } catch { return null; }
}
export function randomToken() { return base64url(crypto.getRandomValues(new Uint8Array(32))); }
function base64url(bytes: Uint8Array) { return btoa(String.fromCharCode(...bytes)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,''); }
export async function digest(value: string) { return base64url(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(value)))); }
export function cookieName(req:Request,kind:'session'|'oauth') { return `${new URL(req.url).protocol==='https:'?'__Host-':''}kotonoha_${kind}`; }
export function readCookie(req:Request,kind:'session'|'oauth') {
 const name=cookieName(req,kind)+'=';const matches=(req.headers.get('cookie')||'').split(';').map(s=>s.trim()).filter(s=>s.startsWith(name));
 if(matches.length!==1)return null;const value=matches[0].slice(name.length);return /^[A-Za-z0-9_-]{43}$/.test(value)?value:null;
}
export function authCookie(req:Request,kind:'session'|'oauth',value:string,seconds:number) {
 return `${cookieName(req,kind)}=${value}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${seconds}${new URL(req.url).protocol==='https:'?'; Secure':''}`;
}
export async function getUser(req:Request):Promise<string|null> {
 const token=readCookie(req,'session');if(!token)return null;
 const session=await authDb().prepare('SELECT owner FROM auth_sessions WHERE token_hash=? AND expires>?').bind(await digest(token),Date.now()).first<{owner:string}>();
 return session?.owner??null;
}
// Renew only an existing, unexpired session. Never recreate a logged-out session.
export async function renewSessionCookie(req:Request):Promise<string|null>{
 const token=readCookie(req,'session');if(!token)return null;
 const now=Date.now(),expires=now+SESSION_SECONDS*1000;
 const row=await authDb().prepare('UPDATE auth_sessions SET expires=? WHERE token_hash=? AND expires>? RETURNING owner').bind(expires,await digest(token),now).first<{owner:string}>();
 return row?authCookie(req,'session',token,SESSION_SECONDS):null;
}
export async function newSession(owner:string) {
 const token=randomToken();await authDb().prepare('INSERT INTO auth_sessions(token_hash,owner,expires) VALUES(?,?,?)').bind(await digest(token),owner,Date.now()+SESSION_SECONDS*1000).run();return token;
}
export async function revokeSession(req:Request) { const token=readCookie(req,'session');if(token)await authDb().prepare('DELETE FROM auth_sessions WHERE token_hash=?').bind(await digest(token)).run(); }
export function authResponse(body:unknown,status=200) {return Response.json(body,{status,headers:{'Cache-Control':'no-store','Referrer-Policy':'no-referrer'}});}
function redirect(req:Request,path:string,cookies:string[]=[]) {const headers=new Headers({'Location':path,'Cache-Control':'no-store','Referrer-Policy':'no-referrer'});for(const cookie of cookies)headers.append('Set-Cookie',cookie);return new Response(null,{status:303,headers});}
export async function startGoogle(req:Request) {
 const config=authConfig(req);if(!config)return authResponse({error:'Googleログインは設定準備中です。管理者の設定完了後にお試しください。'},503);
 if(new URL(req.url).origin!==config.origin)return authResponse({error:'正規のサイトURLからログインしてください。'},400);
 if(req.headers.get('purpose')==='prefetch'||req.headers.get('next-router-prefetch'))return new Response(null,{status:204});
 const state=randomToken(),browser=randomToken(),verifier=randomToken(),nonce=randomToken();
 const database=authDb();
 await database.batch([database.prepare('DELETE FROM oauth_states WHERE expires<=?').bind(Date.now()),database.prepare('DELETE FROM auth_sessions WHERE expires<=?').bind(Date.now()),database.prepare('INSERT INTO oauth_states(state_hash,browser_hash,verifier,nonce,expires) VALUES(?,?,?,?,?)').bind(await digest(state),await digest(browser),verifier,nonce,Date.now()+STATE_SECONDS*1000)]);
 const url=new URL('https://accounts.google.com/o/oauth2/v2/auth');
 url.search=new URLSearchParams({client_id:config.clientId,redirect_uri:config.origin+'/api/auth/google/callback',response_type:'code',scope:'openid email',state,nonce,code_challenge:await digest(verifier),code_challenge_method:'S256',prompt:'select_account'}).toString();
 return redirect(req,url.href,[authCookie(req,'oauth',browser,STATE_SECONDS)]);
}
export async function finishGoogle(req:Request) {
 const config=authConfig(req);if(!config)return authResponse({error:'Googleログインは設定準備中です。'},503);
 const url=new URL(req.url),state=url.searchParams.get('state'),browser=readCookie(req,'oauth');
 if(url.origin!==config.origin||!state||!/^[A-Za-z0-9_-]{43}$/.test(state)||!browser)return redirect(req,'/?login=expired',[authCookie(req,'oauth','',0)]);
 // Consume the state atomically; callbacks cannot be replayed across requests.
 const flow=await authDb().prepare('DELETE FROM oauth_states WHERE state_hash=? AND browser_hash=? AND expires>? RETURNING verifier,nonce').bind(await digest(state),await digest(browser),Date.now()).first<{verifier:string;nonce:string}>();
 if(!flow)return redirect(req,'/?login=expired',[authCookie(req,'oauth','',0)]);
 if(url.searchParams.has('error'))return redirect(req,'/?login=cancelled',[authCookie(req,'oauth','',0)]);
 const code=url.searchParams.get('code');if(!code||code.length>4096)return redirect(req,'/?login=failed',[authCookie(req,'oauth','',0)]);
 try{
 const response=await fetch('https://oauth2.googleapis.com/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({client_id:config.clientId,client_secret:config.clientSecret,redirect_uri:config.origin+'/api/auth/google/callback',grant_type:'authorization_code',code,code_verifier:flow.verifier}),signal:AbortSignal.timeout(15000)});
 if(!response.ok)throw new Error('Google token exchange failed');
 const result=await response.json() as {id_token?:string};if(!result.id_token)throw new Error('Missing identity token');
 const {payload}=await jwtVerify(result.id_token,keys,{issuer:['https://accounts.google.com','accounts.google.com'],audience:config.clientId,algorithms:['RS256'],requiredClaims:['sub','exp','iat','nonce'],maxTokenAge:'10m'});
 if(payload.nonce!==flow.nonce||payload.email_verified!==true||typeof payload.sub!=='string'||payload.sub.length>255||!payload.sub||(payload.azp!==undefined&&payload.azp!==config.clientId))throw new Error('Invalid identity claims');
 const token=await newSession('google:'+payload.sub);
 await revokeSession(req);
 return redirect(req,'/',[authCookie(req,'session',token,SESSION_SECONDS),authCookie(req,'oauth','',0)]);
 }catch {return redirect(req,'/?login=failed',[authCookie(req,'oauth','',0)]);}
}
export async function logout(req:Request) {
 const origin=authConfig(req)?.origin??new URL(req.url).origin;
 if(req.headers.get('origin')!==origin)return authResponse({error:'操作元を確認できません。'},403);
 await revokeSession(req);return redirect(req,'/',[authCookie(req,'session','',0),authCookie(req,'oauth','',0)]);
}
