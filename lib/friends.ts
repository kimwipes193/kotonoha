import {validProfileDetails} from './profile-details';
import {messageAction} from './friend-messages';
import {validProfilePhoto} from './profile-image';
import {dayKey,checkDiary,moods} from './diary-rules';
import {validDrawing,hasDrawing} from './drawing';
import {validStickerPlacements} from './sticker-layout';
import {fonts} from './rewards';
export const profileIcons=['🐈','🐼','🐰','🦊','🐻','🐧','🌷','🌻','🌙','⭐','🍮','💌'];
export function validBirthday(value:unknown):value is string{if(value==='')return true;if(typeof value!=='string'||!/^\d{2}-\d{2}$/.test(value))return false;const d=new Date('2000-'+value+'T00:00:00Z');return Number.isFinite(d.getTime())&&d.toISOString().slice(5,10)===value;}
export function isBirthday(birthday:string,day=dayKey()){return birthday===day.slice(5)||(birthday==='02-29'&&day.slice(5)==='02-28'&&new Date(day.slice(0,4)+'-03-01T00:00:00Z').getTime()-new Date(day+'T00:00:00Z').getTime()===86400000);}
export async function ensureProfile(database:D1Database,owner:string){await database.prepare("INSERT OR IGNORE INTO profiles(owner,code) VALUES(?,?)").bind(owner,crypto.randomUUID().replaceAll('-','').slice(0,16).toUpperCase()).run();return (await database.prepare('SELECT code,nickname,icon,birthday,details FROM profiles WHERE owner=?').bind(owner).first<{code:string;nickname:string;icon:string;birthday:string;details:string}>())!;}
export async function friendState(database:D1Database,owner:string){
 const profile=await ensureProfile(database,owner);
 const relations=await database.prepare(`SELECT f.id,f.status,f.requester=? AS outgoing,p.code,
 CASE WHEN f.status='accepted' THEN (SELECT CASE WHEN photo IS NOT NULL AND body='' THEN '📷' ELSE body END FROM friend_messages WHERE unsent_at IS NULL AND friendship=f.id ORDER BY created DESC,id DESC LIMIT 1) END lastMessageBody,
 CASE WHEN f.status='accepted' THEN (SELECT created FROM friend_messages WHERE unsent_at IS NULL AND friendship=f.id ORDER BY created DESC,id DESC LIMIT 1) END lastMessageCreated,
 CASE WHEN f.status='accepted' THEN (SELECT owner FROM friend_messages WHERE unsent_at IS NULL AND friendship=f.id ORDER BY created DESC,id DESC LIMIT 1) END lastMessageOwner,
 CASE WHEN f.status='accepted' THEN (SELECT MAX(e.created) FROM friend_entries e WHERE e.friendship=f.id AND e.cancelled=0 AND (e.owner=? OR e.matched IS NOT NULL)) END lastDiaryCreated,
 CASE WHEN f.status='accepted' THEN (SELECT COUNT(*) FROM friend_messages WHERE unsent_at IS NULL AND friendship=f.id AND target=? AND read_at IS NULL) ELSE 0 END unread,CASE WHEN f.status='accepted' THEN p.nickname END nickname,CASE WHEN f.status='accepted' THEN p.icon END icon,CASE WHEN f.status='accepted' THEN p.details END details,CASE WHEN f.status='accepted' THEN p.birthday END birthday FROM friendships f JOIN profiles p ON p.owner=CASE WHEN f.a=? THEN f.b ELSE f.a END WHERE (f.a=? OR f.b=?) AND f.status IN ('pending','accepted') AND NOT EXISTS(SELECT 1 FROM blocks b WHERE (b.owner=f.a AND b.target=f.b) OR(b.owner=f.b AND b.target=f.a)) ORDER BY f.created DESC`).bind(owner,owner,owner,owner,owner,owner).all();
 const letters=await database.prepare("SELECT e.id,e.friendship,e.owner=? AS mine,e.day,e.created,e.matched IS NOT NULL AS ready,e.read_at,e.cancelled,CASE WHEN e.owner=? OR e.matched IS NOT NULL THEN e.body END body,CASE WHEN e.owner=? OR e.matched IS NOT NULL THEN e.drawing END drawing,e.mood,e.region,e.paper,e.sticker,e.stickers,e.font FROM friend_entries e JOIN friendships f ON f.id=e.friendship WHERE (e.owner=? OR e.target=?) AND f.status='accepted' AND e.cancelled=0 AND NOT EXISTS(SELECT 1 FROM blocks b WHERE (b.owner=f.a AND b.target=f.b) OR (b.owner=f.b AND b.target=f.a)) AND (e.owner=? OR e.matched IS NOT NULL) ORDER BY e.created DESC LIMIT 200").bind(owner,owner,owner,owner,owner,owner).all();
 const pending=await database.prepare('SELECT id FROM friend_entries WHERE owner=? AND read_at IS NULL AND cancelled=0 LIMIT 1').bind(owner).first();
 const today=await database.prepare('SELECT id FROM friend_entries WHERE owner=? AND day=? LIMIT 1').bind(owner,dayKey()).first();
 const birthdayGift=await database.prepare("SELECT id FROM rewards WHERE owner=? AND day=? AND kind='birthday-0'").bind(owner,dayKey().slice(0,4)).first();
 const incoming=await database.prepare('SELECT friendship FROM friend_entries WHERE target=? AND matched IS NULL AND cancelled=0').bind(owner).all();
 return {friendIncoming:incoming.results.map(r=>r.friendship),profile:{...profile,isBirthday:isBirthday(profile.birthday),birthdayGift:!!birthdayGift},friends:relations.results.map(({lastMessageOwner,...f})=>({...f,lastMessageMine:lastMessageOwner===owner})),friendLetters:letters.results,friendWaiting:!!pending,friendToday:!!today};
}
export async function friendAction(database:D1Database,owner:string,data:any,region:string){
 const out=(body:unknown,status=200)=>Response.json(body,{status,headers:{'Cache-Control':'no-store'}});
 const fail=(error:string,status=400)=>out({error},status);
 await ensureProfile(database,owner);
 if(data.action==='profile-save'){
  if(typeof data.birthday==='string'&&/^\d{4}$/.test(data.birthday))data.birthday=data.birthday.slice(0,2)+'-'+data.birthday.slice(2);
  if(typeof data.nickname!=='string'||data.nickname.trim().length<1||data.nickname.length>24||checkDiary(data.nickname)||(!profileIcons.includes(data.icon)&&!validProfilePhoto(data.icon))||!validBirthday(data.birthday))return fail('プロフィールを確認してください。');
  if(data.details!==undefined){
   if(!validProfileDetails(data.details))return fail('プロフィールの飾りと好きなものを確認してください。');
   const acquired=await database.prepare("SELECT DISTINCT item FROM rewards WHERE owner=? AND kind<>'bonus'").bind(owner).all<{item:string}>();
   if(data.details.stickers.some((p:{sticker:string})=>!acquired.results.some(r=>r.item===p.sticker)))return fail('獲得済みのステッカーを選んでください。');
  }
  await database.prepare('UPDATE profiles SET nickname=?,icon=?,birthday=?,details=COALESCE(?,details) WHERE owner=?').bind(data.nickname.trim(),data.icon,data.birthday,data.details===undefined?null:JSON.stringify(data.details),owner).run();return out({message:'プロフィールを保存しました。'});
 }
 if(data.action==='friend-request'){
  if(typeof data.code!=='string'||! /^[A-F0-9]{16}$/.test(data.code))return fail('フレンドコードを確認してください。');
  const target=await database.prepare('SELECT owner FROM profiles WHERE code=? AND owner<>?').bind(data.code,owner).first<{owner:string}>();if(!target)return fail('フレンドコードを確認してください。');
  const blocked=await database.prepare('SELECT id FROM blocks WHERE (owner=? AND target=?) OR (owner=? AND target=?)').bind(owner,target.owner,target.owner,owner).first();if(blocked)return fail('この相手には申請できません。');
  const count=await database.prepare("SELECT COUNT(*) n FROM friendships WHERE (a=? OR b=?) AND status IN ('pending','accepted')").bind(owner,owner).first<{n:number}>();if((count?.n??0)>=50)return fail('フレンドと申請は合計50件までです。');
  const [a,b]=[owner,target.owner].sort();await database.prepare("INSERT INTO friendships(id,a,b,requester,status,created) VALUES(?,?,?,?,'pending',?) ON CONFLICT(a,b) DO UPDATE SET requester=excluded.requester,status='pending',created=excluded.created WHERE friendships.status='removed'").bind(crypto.randomUUID(),a,b,owner,Date.now()).run();return out({message:'フレンド申請を送りました。'});
 }
 const relation=await database.prepare('SELECT * FROM friendships WHERE id=? AND (a=? OR b=?)').bind(typeof data.friendship==='string'?data.friendship:'',owner,owner).first<{id:string;a:string;b:string;requester:string;status:string}>();
 if(!relation)return fail('フレンドを確認してください。',404);
 const target=relation.a===owner?relation.b:relation.a;
 if(data.action==='friend-accept'){
  if(relation.status!=='pending'||relation.requester===owner)return fail('この申請は承認できません。');
  const blocked=await database.prepare('SELECT id FROM blocks WHERE (owner=? AND target=?) OR(owner=? AND target=?)').bind(owner,target,target,owner).first();if(blocked)return fail('この申請は承認できません。');
  await database.prepare("UPDATE friendships SET status='accepted' WHERE id=? AND status='pending'").bind(relation.id).run();return out({message:'フレンドになりました。'});
 }
 if(data.action==='friend-remove'||data.action==='friend-block'){
  if(data.action==='friend-block')await database.prepare('INSERT OR IGNORE INTO blocks(id,owner,target) VALUES(?,?,?)').bind(crypto.randomUUID(),owner,target).run();
  await database.batch([database.prepare("UPDATE friendships SET status='removed' WHERE id=?").bind(relation.id),database.prepare('UPDATE friend_entries SET cancelled=1 WHERE friendship=?').bind(relation.id)]);return out({message:'フレンド・申請を解除しました。'});
 }
 if(relation.status!=='accepted')return fail('フレンドを確認してください。',403);
 const blocked=await database.prepare('SELECT id FROM blocks WHERE (owner=? AND target=?) OR(owner=? AND target=?)').bind(owner,target,target,owner).first();if(blocked)return fail('フレンドを確認してください。',403);
 const messageResponse=await messageAction(database,owner,target,relation.id,data);if(messageResponse)return messageResponse;
 if(data.action==='friend-read'){
  const letter=await database.prepare('SELECT id FROM friend_entries WHERE id=? AND friendship=? AND target=? AND matched IS NOT NULL AND cancelled=0').bind(data.id,relation.id,owner).first();if(!letter)return fail('交換が成立すると読めます。',403);
  await database.prepare('UPDATE friend_entries SET read_at=COALESCE(read_at,?) WHERE id=?').bind(Date.now(),data.id).run();return out({message:''});
 }
 if(data.action==='friend-send'){
  const drawing=data.drawing??[],placements=data.stickers??[],font=data.font??'sans';
  if(!validDrawing(drawing)||!validStickerPlacements(placements)||!fonts.some(f=>f.id===font)||!moods.includes(data.mood))return fail('日記の設定を確認してください。');
  const error=checkDiary(data.body,hasDrawing(drawing));if(error)return fail(error);
  const stock=await database.prepare("SELECT item FROM rewards WHERE owner=? AND consumed_by IS NULL AND kind<>'bonus'").bind(owner).all<{item:string}>();if(placements.some(p=>placements.filter(q=>q.sticker===p.sticker).length>stock.results.filter(r=>r.item===p.sticker).length))return fail('持っている便箋とステッカーを選んでください。');if(!['plain',...stock.results.map(r=>r.item).filter(i=>i.startsWith('paper-'))].includes(data.paper))return fail('持っている便箋を選んでください。');
  await database.prepare('INSERT INTO friend_entries(id,friendship,owner,target,day,body,mood,region,paper,sticker,stickers,drawing,font,created) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?)').bind(crypto.randomUUID(),relation.id,owner,target,dayKey(),data.body.trim(),data.mood,region,data.paper,placements[0]?.sticker??'',JSON.stringify(placements),drawing.length?JSON.stringify(drawing):null,font,Date.now()).run();return out({message:'フレンド宛ての日記を預かりました。'});
 }
 return fail('操作を確認してください。');
}
