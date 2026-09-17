import { env } from 'cloudflare:workers';
import { checkDiary, dayKey, items, moods, regions } from '@/lib/diary-rules';
export const dynamic='force-dynamic';
function db(){ if(!env.DB) throw new Error('Database unavailable'); return env.DB; }
function reply(data:unknown,status=200){return Response.json(data,{status,headers:{'Cache-Control':'no-store'}});}
function user(req:Request){return req.headers.get('oai-authenticated-user-id');}
async function match(owner:string){
 const database=db();
 const waiting=await database.prepare('SELECT e.id FROM entries e WHERE e.owner=? AND e.created<=? AND NOT EXISTS (SELECT 1 FROM entries r WHERE r.received_for=e.id) ORDER BY e.created LIMIT 20').bind(owner,Date.now()-30000).all<{id:string}>();
 for(const own of waiting.results){
  await database.prepare(`UPDATE entries SET receiver=?,received_for=? WHERE id=(SELECT e.id FROM entries e WHERE e.owner<>? AND e.receiver IS NULL AND e.flagged=0 AND e.created<=? AND NOT EXISTS(SELECT 1 FROM blocks b WHERE (b.owner=? AND b.target=e.owner) OR (b.target=? AND b.owner=e.owner)) ORDER BY e.created LIMIT 1) AND receiver IS NULL AND NOT EXISTS(SELECT 1 FROM entries WHERE received_for=?)`).bind(owner,own.id,owner,Date.now()-30000,owner,owner,own.id).run();
 }
}
export async function GET(req:Request){
 const owner=user(req); if(!owner)return reply({error:'保存・交換にはログインが必要です。',signedIn:false},401);
 try{
 await match(owner); const database=db(); const day=dayKey();
 const [sent,received,collection,today,bonus]=await Promise.all([
 database.prepare('SELECT id,body,mood,region,paper,sticker,created,receiver IS NOT NULL AS delivered,reaction FROM entries WHERE owner=? ORDER BY created DESC LIMIT 100').bind(owner).all(),
 database.prepare('SELECT id,body,mood,region,paper,sticker,created,reaction FROM entries e WHERE receiver=? AND flagged=0 AND NOT EXISTS(SELECT 1 FROM blocks b WHERE b.owner=? AND b.target=e.owner) ORDER BY created DESC LIMIT 100').bind(owner,owner).all(),
 database.prepare("SELECT item FROM rewards WHERE owner=? AND kind='gacha'").bind(owner).all(),
 database.prepare('SELECT COUNT(*) AS count FROM entries WHERE owner=? AND day=?').bind(owner,day).first<{count:number}>(),
 database.prepare('SELECT kind FROM rewards WHERE owner=? AND day=?').bind(owner,day).all<{kind:string}>()
 ]);
 return reply({signedIn:true,sent:sent.results,received:received.results,collection:collection.results.map((r:any)=>r.item),today:today?.count??0,bonus:bonus.results.some(r=>r.kind==='bonus'),drawn:bonus.results.some(r=>r.kind==='gacha')});
 }catch(e){console.error('Diary load failed',e);return reply({error:'日記帳を読み込めませんでした。少し待って再試行してください。'},503);}
}
export async function POST(req:Request){
 const owner=user(req);if(!owner)return reply({error:'保存・交換にはログインしてください。'},401);
 if(req.headers.get('origin')!==new URL(req.url).origin)return reply({error:'操作元を確認できません。'},403);
 try{
 const raw=await req.text();if(raw.length>8000)return reply({error:'入力が長すぎます。'},400);
 let data:any;try{data=JSON.parse(raw);}catch{return reply({error:'入力を確認してください。'},400);}
 const database=db(),day=dayKey(),id=crypto.randomUUID();
 if(data.action==='send'){
  const error=checkDiary(data.body);if(error)return reply({error},400);
  if(!moods.includes(data.mood)||!regions.includes(data.region))return reply({error:'気分と国・地域を選んでください。'},400);
  const owned=await database.prepare("SELECT item FROM rewards WHERE owner=? AND kind='gacha'").bind(owner).all<{item:string}>();
  const unlocked=owned.results.map(r=>r.item);
  if(!['plain',...unlocked.filter(i=>i.startsWith('paper-'))].includes(data.paper)||!['',...unlocked.filter(i=>!i.startsWith('paper-'))].includes(data.sticker))return reply({error:'持っている便箋とステッカーを選んでください。'},400);
  const count=await database.prepare('SELECT COUNT(*) AS n FROM entries WHERE owner=? AND day=?').bind(owner,day).first<{n:number}>();
  const n=count?.n??0;const bonus=await database.prepare("SELECT id FROM rewards WHERE owner=? AND day=? AND kind='bonus'").bind(owner,day).first();
  if(n>= (bonus?2:1))return reply({error:'今日の交換は完了しています。また明日、待っています。'},409);
  await database.prepare('INSERT INTO entries(id,owner,day,slot,body,mood,region,paper,sticker,created) VALUES(?,?,?,?,?,?,?,?,?,?)').bind(id,owner,day,n,data.body.trim(),data.mood,data.region,data.paper,data.sticker,Date.now()).run();
  return reply({message:'日記を預かりました。相手が見つかるまで、少しお待ちください。'});
 }
 if(data.action==='gacha'){
  const roll=new Uint32Array(1);crypto.getRandomValues(roll);const item=items[Math.floor(roll[0]/4294967296*items.length)];
  await database.prepare("INSERT INTO rewards(id,owner,day,kind,item) VALUES(?,?,?,'gacha',?)").bind(id,owner,day,item).run();return reply({item,message:'今日の贈りものが届きました。'});
 }
 if(data.action==='bonus')return reply({error:'広告配信は準備中です。視聴完了を確認できるようになると、追加の1通が使えます。'},503);
 if(['react','report','block'].includes(data.action)){
  const entry=await database.prepare('SELECT owner FROM entries WHERE id=? AND receiver=? AND flagged=0').bind(data.id,owner).first<{owner:string}>();
  if(!entry)return reply({error:'この日記は操作できません。'},404);
  if(data.action==='react'){
   if(!['🤍','🌷','🫂','✨'].includes(data.reaction))return reply({error:'リアクションを選んでください。'},400);
   await database.prepare('UPDATE entries SET reaction=? WHERE id=? AND receiver=?').bind(data.reaction,data.id,owner).run();
  }else if(data.action==='block'){
   await database.prepare('INSERT OR IGNORE INTO blocks(id,owner,target) VALUES(?,?,?)').bind(id,owner,entry.owner).run();
  }else{
   if(!['個人情報','攻撃的な内容','不適切な内容','その他'].includes(data.reason))return reply({error:'通報理由を選んでください。'},400);
   await database.batch([database.prepare('INSERT OR IGNORE INTO reports(id,owner,entry,reason,created) VALUES(?,?,?,?,?)').bind(id,owner,data.id,data.reason,Date.now()),database.prepare('UPDATE entries SET flagged=1 WHERE id=?').bind(data.id)]);
  }
  return reply({message:data.action==='react'?'気持ちを届けました。':'この日記を非表示にしました。'});
 }
 return reply({error:'操作を確認してください。'},400);
 }catch(e){console.error('Diary write failed',e);if(String(e).includes('UNIQUE'))return reply({error:'今日の操作はすでに完了しています。画面を更新してください。'},409);return reply({error:'保存できませんでした。内容を残したまま再試行できます。'},503);}
}

