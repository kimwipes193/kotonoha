import { authConfig, authResponse, renewSessionCookie } from '@/lib/auth';
export const dynamic='force-dynamic';
export async function GET(req:Request){try{const cookie=await renewSessionCookie(req);const response=authResponse({ready:!!authConfig(),signedIn:!!cookie});if(cookie)response.headers.append('Set-Cookie',cookie);return response;}catch{return authResponse({error:'ログイン状態を確認できません。'},503);}}
