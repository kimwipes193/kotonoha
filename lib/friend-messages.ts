import {checkDiary} from './diary-rules';
export async function messageAction(database:D1Database,owner:string,target:string,friendship:string,data:any):Promise<Response|null>{
 const out=(body:unknown,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}});
 if(data.action==='friend-message'){
  if(typeof data.clientId!=='string'||! /^[0-9a-f-]{36}$/i.test(data.clientId))return out({error:'メッセージを確認してください。'},400);
  if(typeof data.body!=='string'||!data.body.trim()||data.body.length>1000)return out({error:'メッセージは1〜1,000文字で書いてください。'},400);
  const error=checkDiary(data.body);if(error)return out({error},400);
  const previous=await database.prepare('SELECT id,friendship,body FROM friend_messages WHERE owner=? AND client_id=?').bind(owner,data.clientId).first<{id:string;friendship:string;body:string}>();
  if(previous){if(previous.friendship!==friendship||previous.body!==data.body.trim())return out({error:'メッセージを確認してください。'},409);return out({id:previous.id});}
  const id=crypto.randomUUID();
  await database.prepare('INSERT INTO friend_messages(id,friendship,owner,target,client_id,body,created) VALUES(?,?,?,?,?,?,?) ON CONFLICT(owner,client_id) DO NOTHING').bind(id,friendship,owner,target,data.clientId,data.body.trim(),Date.now()).run();
  const saved=await database.prepare("SELECT id,friendship,body FROM friend_messages WHERE owner=? AND client_id=?").bind(owner,data.clientId).first<{id:string;friendship:string;body:string}>();
  if(!saved||saved.friendship!==friendship||saved.body!==data.body.trim())return out({error:'メッセージを確認してください。'},409);
  return out({id:saved.id});
 }
 if(data.action==='friend-thread'){
  const cursor=data.before;
  if(cursor!==undefined&&(!cursor||!Number.isSafeInteger(cursor.created)||cursor.created<0||typeof cursor.key!=='string'||cursor.key.length>100))return out({error:'履歴を確認してください。'},400);
  const rows=await database.prepare(`SELECT * FROM (
   SELECT 'message' kind,'m:'||id key,id,owner=? mine,body,created,read_at,1 ready FROM friend_messages WHERE friendship=?
   UNION ALL
   SELECT 'diary' kind,'d:'||id key,id,owner=? mine,NULL body,created,read_at,matched IS NOT NULL ready FROM friend_entries WHERE friendship=? AND cancelled=0 AND (owner=? OR matched IS NOT NULL)
  ) WHERE (? IS NULL OR created<? OR (created=? AND key<?)) ORDER BY created DESC,key DESC LIMIT 51`).bind(owner,friendship,owner,friendship,owner,cursor?.created??null,cursor?.created??null,cursor?.created??null,cursor?.key??'').all();
  const items=rows.results.slice(0,50);const last=items.at(-1);
  return out({items:items.reverse(),older:rows.results.length>50&&last?{created:last.created,key:last.key}:null});
 }
 if(data.action==='friend-message-read'){
  const row=await database.prepare('SELECT created,id FROM friend_messages WHERE id=? AND friendship=? AND target=?').bind(typeof data.id==='string'?data.id:'',friendship,owner).first<{created:number;id:string}>();
  if(!row)return out({error:'メッセージを確認してください。'},404);
  await database.prepare('UPDATE friend_messages SET read_at=COALESCE(read_at,?) WHERE friendship=? AND target=? AND (created<? OR(created=? AND id<=?))').bind(Date.now(),friendship,owner,row.created,row.created,row.id).run();return out({});
 }
 if(data.action==='friend-letter'){
  const letter=await database.prepare('SELECT id,friendship,owner=? mine,body,drawing,stickers,font,mood,region,paper,sticker,created,matched IS NOT NULL ready,read_at FROM friend_entries WHERE id=? AND friendship=? AND cancelled=0 AND (owner=? OR matched IS NOT NULL)').bind(owner,typeof data.id==='string'?data.id:'',friendship,owner).first();
  return letter?out({letter}):out({error:'交換が成立すると読めます。'},403);
 }
 return null;
}
