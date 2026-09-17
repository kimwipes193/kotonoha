import { logout, authResponse } from '@/lib/auth';
export const dynamic='force-dynamic';
export async function POST(req:Request){try{return await logout(req);}catch{return authResponse({error:'ログアウトできませんでした。もう一度お試しください。'},503);}}
