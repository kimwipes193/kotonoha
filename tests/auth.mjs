import assert from 'node:assert/strict';
import { generateKeyPair, exportJWK, SignJWT } from 'jose';
import { createFixture, loadModules } from './fixture.mjs';
const {sql,env}=createFixture();
const {startGoogle,finishGoogle,getUser,logout,newSession,authCookie,SESSION_SECONDS}=await loadModules();
const base=env.APP_ORIGIN;
const {publicKey,privateKey}=await generateKeyPair('RS256');
const jwk=await exportJWK(publicKey);jwk.kid='test-google-key';jwk.alg='RS256';jwk.use='sig';
let tokenResponse='';const realFetch=globalThis.fetch;
globalThis.fetch=async(url,options)=>{
 const target=String(url);
 if(target==='https://www.googleapis.com/oauth2/v3/certs')return Response.json({keys:[jwk]});
 if(target==='https://oauth2.googleapis.com/token'){assert.equal(options.method,'POST');assert.ok(options.body.get('code_verifier'));return Response.json({id_token:tokenResponse});}
 throw new Error('Unexpected network request: '+target);
};
async function flow(){const start=await startGoogle(new Request(base+'/api/auth/google'));assert.equal(start.status,303);const url=new URL(start.headers.get('location'));assert.equal(url.origin,'https://accounts.google.com');assert.equal(url.searchParams.get('scope'),'openid email');assert.equal(url.searchParams.get('code_challenge_method'),'S256');assert.ok(url.searchParams.get('code_challenge'));const cookie=start.headers.get('set-cookie').split(';')[0];return {url,cookie,callback:new Request(base+'/api/auth/google/callback?code=test-code&state='+url.searchParams.get('state'),{headers:{cookie}})};}
try{
 env.PAGES_ORIGIN='https://kotonoha-post.pages.dev';
 const pagesLogin=await startGoogle(new Request(env.PAGES_ORIGIN+'/api/auth/google'));
 assert.equal(new URL(pagesLogin.headers.get('location')).searchParams.get('redirect_uri'),env.PAGES_ORIGIN+'/api/auth/google/callback');
 assert.equal((await startGoogle(new Request('https://untrusted.pages.dev/api/auth/google'))).status,400);
 assert.equal((await startGoogle(new Request('https://kotonoha-post.pages.dev.evil.example/api/auth/google'))).status,400);
 assert.equal(await getUser(new Request(base,{headers:{'oai-authenticated-user-id':'forged'}})),null);
 assert.equal(await getUser(new Request(base,{headers:{cookie:'__Host-kotonoha_session=forged'}})),null);
 const configId=env.GOOGLE_CLIENT_ID;env.GOOGLE_CLIENT_ID='';assert.equal((await startGoogle(new Request(base+'/api/auth/google'))).status,503);env.GOOGLE_CLIENT_ID=configId;
 for(const scenario of ['valid','nonce','audience','issuer','expired','email']){
  const f=await flow();tokenResponse=await new SignJWT({nonce:scenario==='nonce'?'wrong':f.url.searchParams.get('nonce'),email_verified:scenario!=='email'}).setProtectedHeader({alg:'RS256',kid:jwk.kid}).setIssuer(scenario==='issuer'?'https://attacker.example':'https://accounts.google.com').setAudience(scenario==='audience'?'wrong':configId).setSubject('google-user-123').setIssuedAt().setExpirationTime(scenario==='expired'?'0s':'5m').sign(privateKey);
  const result=await finishGoogle(f.callback);
  assert.equal(result.status,303);
  if(scenario==='valid'){
   assert.equal(result.headers.get('location'),'/');const cookie=result.headers.getSetCookie().find(v=>v.startsWith('__Host-kotonoha_session=')).split(';')[0];
   assert.equal(await getUser(new Request(base,{headers:{cookie}})),'google:google-user-123');
   assert.equal((await finishGoogle(f.callback)).headers.get('location'),'/?login=expired');
   assert.equal((await logout(new Request(base+'/api/auth/logout',{method:'POST',headers:{cookie,origin:'https://attacker.example'}}))).status,403);
   await logout(new Request(base+'/api/auth/logout',{method:'POST',headers:{cookie,origin:base}}));assert.equal(await getUser(new Request(base,{headers:{cookie}})),null);
  }else assert.equal(result.headers.get('location'),'/?login=failed',scenario);
 }
 const f=await flow();const wrongBrowser=new Request(f.callback.url,{headers:{cookie:authCookie(new Request(base),'oauth','a'.repeat(43),600).split(';')[0]}});
 assert.equal((await finishGoogle(wrongBrowser)).headers.get('location'),'/?login=expired');
 const {renewSessionCookie}=await loadModules();
 const savedToken=await newSession('google:saved');const savedRequest=new Request(base,{headers:{cookie:authCookie(new Request(base),'session',savedToken,SESSION_SECONDS).split(';')[0]}});
 const before=Date.now;Date.now=()=>before()+20*86400000;
 const renewed=await renewSessionCookie(savedRequest);assert.ok(renewed.includes('Max-Age=2592000'));assert.ok(renewed.includes('HttpOnly'));assert.ok(renewed.includes('Secure'));
 Date.now=()=>before()+40*86400000;assert.equal(await getUser(savedRequest),'google:saved');
 await logout(new Request(base+'/api/auth/logout',{method:'POST',headers:{cookie:savedRequest.headers.get('cookie'),origin:base}}));assert.equal(await renewSessionCookie(savedRequest),null);Date.now=before;
 const token=await newSession('google:expired-user');sql.prepare('UPDATE auth_sessions SET expires=0').run();assert.equal(await getUser(new Request(base,{headers:{cookie:authCookie(new Request(base),'session',token,SESSION_SECONDS).split(';')[0]}})),null);
 assert.equal(await renewSessionCookie(new Request(base,{headers:{cookie:authCookie(new Request(base),'session',token,SESSION_SECONDS).split(';')[0]}})),null);
 console.log('PASS: Google authorization, PKCE, signed identity, state/cookie binding, replay protection, invalid claims, expiry, logout, forged headers rejected');
}finally{globalThis.fetch=realFetch;}
