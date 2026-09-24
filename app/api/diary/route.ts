import {friendState,friendAction} from '@/lib/friends';
import {validDrawing,hasDrawing} from '@/lib/drawing';
import { validStickerLayout, defaultStickerLayout, validStickerPlacements } from '@/lib/sticker-layout';
import { translateDiary } from '@/lib/diary-translation';
import { fonts, weekKey } from '@/lib/rewards';
import { syncProgress } from '@/lib/progression';
import { env } from 'cloudflare:workers';
import { getUser } from '@/lib/auth';
import { requestCountry } from '@/lib/country';
import { checkDiary, dayKey, items, moods } from '@/lib/diary-rules';
export const dynamic='force-dynamic';
function db(){ if(!env.DB) throw new Error('Database unavailable'); return env.DB; }
function reply(data:unknown,status=200){return Response.json(data,{status,headers:{'Cache-Control':'no-store'}});}

async function match(owner:string){
 const database=db();
 const waiting=await database.prepare('SELECT e.id,e.day FROM entries e WHERE e.owner=? AND e.created<=? AND NOT EXISTS (SELECT 1 FROM entries r WHERE r.received_for=e.id) AND EXISTS (SELECT 1 FROM entries candidate WHERE candidate.day=e.day AND candidate.owner<>e.owner AND candidate.receiver IS NULL AND candidate.flagged=0 AND candidate.created<=? AND NOT EXISTS (SELECT 1 FROM blocks b WHERE (b.owner=e.owner AND b.target=candidate.owner) OR (b.target=e.owner AND b.owner=candidate.owner))) ORDER BY e.created LIMIT 20').bind(owner,Date.now()-30000,Date.now()-30000).all<{id:string;day:string}>();
 for(const own of waiting.results){
  await database.prepare(`UPDATE entries SET receiver=?,received_for=? WHERE id=(SELECT e.id FROM entries e WHERE e.owner<>? AND e.day=? AND e.receiver IS NULL AND e.flagged=0 AND e.created<=? AND NOT EXISTS(SELECT 1 FROM blocks b WHERE (b.owner=? AND b.target=e.owner) OR (b.target=? AND b.owner=e.owner)) ORDER BY e.created LIMIT 1) AND receiver IS NULL AND NOT EXISTS(SELECT 1 FROM entries WHERE received_for=?)`).bind(owner,own.id,owner,own.day,Date.now()-30000,owner,owner,own.id).run();
 }
}
export async function GET(req:Request){
 try{
 const region=requestCountry(req);
 const owner=await getUser(req); if(!owner)return reply({error:'保存・交換にはログインが必要です。',signedIn:false,region},401);
 await match(owner); const database=db(); const day=dayKey(); const progress=await syncProgress(database,owner);
 const [sent,received,collection,today,bonus]=await Promise.all([
 database.prepare('SELECT id,body,mood,region,paper,sticker,sticker_layout,stickers,drawing,font,created,receiver IS NOT NULL AS delivered,reaction FROM entries WHERE owner=? ORDER BY created DESC LIMIT 100').bind(owner).all(),
 database.prepare('SELECT id,body,mood,region,paper,sticker,sticker_layout,stickers,drawing,font,created,reaction FROM entries e WHERE receiver=? AND flagged=0 AND NOT EXISTS(SELECT 1 FROM blocks b WHERE b.owner=? AND b.target=e.owner) ORDER BY created DESC LIMIT 100').bind(owner,owner).all(),
 database.prepare("SELECT id,day,kind,item,consumed_by FROM rewards WHERE owner=? AND kind<>'bonus'").bind(owner).all(),
 database.prepare('SELECT COUNT(*) AS count FROM entries WHERE owner=? AND day=?').bind(owner,day).first<{count:number}>(),
 database.prepare('SELECT kind FROM rewards WHERE owner=? AND day=?').bind(owner,day).all<{kind:string}>()
 ]);
 return reply({...await friendState(database,owner),region,progress,rewardHistory:collection.results.map(({id,day,kind,item})=>({id,day,kind,item})),signedIn:true,sent:sent.results,received:received.results,discovered:[...new Set(collection.results.map((r:any)=>r.item))],collection:collection.results.filter((r:any)=>!r.consumed_by).map((r:any)=>r.item),today:today?.count??0,bonus:bonus.results.some(r=>r.kind==='bonus'),drawn:bonus.results.some(r=>r.kind==='gacha')});
 }catch(e){console.error('Diary load failed',e);return reply({error:'日記帳を読み込めませんでした。少し待って再試行してください。'},503);}
}
export async function POST(req:Request){
 try{
 const owner=await getUser(req);if(!owner)return reply({error:'保存・交換にはログインしてください。'},401);
 if(req.headers.get('origin')!==new URL(req.url).origin)return reply({error:'操作元を確認できません。'},403);
 const raw=await req.text();if(raw.length>400000)return reply({error:'入力が長すぎます。'},400);
 let data:any;try{data=JSON.parse(raw);}catch{return reply({error:'入力を確認してください。'},400);}
 const database=db(),day=dayKey(),id=crypto.randomUUID();
 if(typeof data.action==='string'&&(data.action.startsWith('friend-')||data.action==='profile-save'))return await friendAction(database,owner,data,requestCountry(req));
 if(data.action==='translate')return translateDiary(database,(env as unknown as {AI?:Parameters<typeof translateDiary>[1]}).AI,owner,data);
 if(data.action==='pet'){
  if(typeof data.eventId!=='string'||! /^[0-9a-f-]{36}$/i.test(data.eventId))return reply({error:'なで記録を確認できません。'},400);
  await database.prepare('INSERT OR IGNORE INTO pet_events(id,owner,week,created) VALUES(?,?,?,?)').bind(data.eventId,owner,weekKey(new Date(Date.now())),Date.now()).run();
  const progress=await syncProgress(database,owner);
  return reply({progress});
 }
 if(data.action==='send'){
  const stickerLayout=data.stickerLayout??defaultStickerLayout;if(!validStickerLayout(stickerLayout))return reply({error:'ステッカーの配置を確認してください。'},400);
  const placements=data.stickers===undefined?(data.sticker?[{sticker:data.sticker,layout:stickerLayout}]:[]):data.stickers;
  if(!validStickerPlacements(placements))return reply({error:'ステッカーは5枚までです。配置を確認してください。'},400);
  const font=data.font??'sans';if(!fonts.some(f=>f.id===font))return reply({error:'フォントを選んでください。'},400);
  const drawing=data.drawing??[];if(!validDrawing(drawing))return reply({error:'手書きデータを確認してください。'},400);
  const error=checkDiary(data.body,hasDrawing(drawing));if(error)return reply({error},400);
  if(!moods.includes(data.mood))return reply({error:'気分を選んでください。'},400);
  const owned=await database.prepare("SELECT item,consumed_by FROM rewards WHERE owner=? AND kind<>'bonus'").bind(owner).all<{item:string;consumed_by:string|null}>();
  const unlocked=owned.results.filter(r=>!r.consumed_by).map(r=>r.item);
  if(!['plain',...unlocked.filter(i=>i.startsWith('paper-'))].includes(data.paper)||placements.some(p=>placements.filter(q=>q.sticker===p.sticker).length>unlocked.filter(item=>item===p.sticker).length))return reply({error:'持っている便箋とステッカーを選んでください。'},400);
  const count=await database.prepare('SELECT COUNT(*) AS n FROM entries WHERE owner=? AND day=?').bind(owner,day).first<{n:number}>();
  const n=count?.n??0;const bonus=await database.prepare("SELECT id FROM rewards WHERE owner=? AND day=? AND kind='bonus'").bind(owner,day).first();
  if(n>= (bonus?2:1))return reply({error:'今日の交換は完了しています。また明日、待っています。'},409);
  await database.prepare('INSERT INTO entries(id,owner,day,slot,body,mood,region,paper,sticker,sticker_layout,stickers,drawing,font,created) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind(id,owner,day,n,data.body.trim(),data.mood,requestCountry(req),data.paper,placements[0]?.sticker??'',JSON.stringify(placements[0]?.layout??stickerLayout),JSON.stringify(placements),drawing.length?JSON.stringify(drawing):null,font,Date.now()).run();
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
   if(!['😢','😂','😠','☺️'].includes(data.reaction))return reply({error:'リアクションを選んでください。'},400);
   await database.prepare('UPDATE entries SET reaction=? WHERE id=? AND receiver=?').bind(data.reaction,data.id,owner).run();
  }else if(data.action==='block'){
   await database.prepare('INSERT OR IGNORE INTO blocks(id,owner,target) VALUES(?,?,?)').bind(id,owner,entry.owner).run();
   await database.batch([database.prepare("UPDATE friendships SET status='removed' WHERE (a=? AND b=?) OR(a=? AND b=?)").bind(owner,entry.owner,entry.owner,owner),database.prepare('UPDATE friend_entries SET cancelled=1 WHERE (owner=? AND target=?) OR(owner=? AND target=?)').bind(owner,entry.owner,entry.owner,owner)]);
  }else{
   if(!['個人情報','攻撃的な内容','不適切な内容','その他'].includes(data.reason))return reply({error:'通報理由を選んでください。'},400);
   await database.batch([database.prepare('INSERT OR IGNORE INTO reports(id,owner,entry,reason,created) VALUES(?,?,?,?,?)').bind(id,owner,data.id,data.reason,Date.now()),database.prepare('UPDATE entries SET flagged=1 WHERE id=?').bind(data.id)]);
  }
  return reply({message:data.action==='react'?'気持ちを届けました。':'この日記を非表示にしました。'});
 }
 return reply({error:'操作を確認してください。'},400);
 }catch(e){console.error('Diary write failed',(e as Error).message);if(String(e).includes('DM_RATE_LIMIT'))return reply({error:'少し待ってからメッセージを送ってください。'},429);if(String(e).includes('FRIEND_WAITING'))return reply({error:'相手が日記を開くまで、次のお便りは待っていてください。'},409);if(String(e).includes('FRIEND_UNAVAILABLE'))return reply({error:'フレンドを確認してください。'},403);if(String(e).includes('STICKER_UNAVAILABLE'))return reply({error:'このステッカーは使用済みです。別のステッカーを選んでください。'},409);if(String(e).includes('UNIQUE'))return reply({error:'今日の操作はすでに完了しています。画面を更新してください。'},409);return reply({error:'保存できませんでした。内容を残したまま再試行できます。'},503);}
}


