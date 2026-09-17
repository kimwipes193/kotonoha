import { finishGoogle, authResponse } from '@/lib/auth';
export const dynamic='force-dynamic';
export async function GET(req:Request){try{return await finishGoogle(req);}catch{return authResponse({error:'ログインを完了できませんでした。もう一度お試しください。'},503);}}
