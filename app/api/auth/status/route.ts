import { authConfig, authResponse, getUser } from '@/lib/auth';
export const dynamic='force-dynamic';
export async function GET(req:Request){try{return authResponse({ready:!!authConfig(),signedIn:!!(await getUser(req))});}catch{return authResponse({error:'ログイン状態を確認できません。'},503);}}
