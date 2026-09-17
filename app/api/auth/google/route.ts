import { startGoogle, authResponse } from '@/lib/auth';
export const dynamic='force-dynamic';
export async function GET(req:Request){try{return await startGoogle(req);}catch{return authResponse({error:'ログインを開始できませんでした。しばらくしてから再試行してください。'},503);}}
