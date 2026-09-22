import assert from 'node:assert/strict';
import {createFixture,loadModules} from './fixture.mjs';
try {
const {sql}=createFixture();const {GET,POST,newSession,authCookie,SESSION_SECONDS}=await loadModules(true);const base='https://diary.example';
const cookies={};for(const u of ['a','b','eve'])cookies[u]=authCookie(new Request(base),'session',await newSession('google:'+u),SESSION_SECONDS).split(';')[0];
async function api(u,data){const r=await(data?POST:GET)(new Request(base+'/api/diary',{method:data?'POST':'GET',headers:{cookie:cookies[u]||'',Origin:base},body:data?JSON.stringify(data):undefined}));return{status:r.status,data:await r.json()};}
await api('a');const b=(await api('b')).data;await api('a',{action:'friend-request',code:b.profile.code});const f=(await api('b')).data.friends[0].id;
const message=(body='こんにちは',clientId=crypto.randomUUID())=>({action:'friend-message',friendship:f,body,clientId});
assert.equal((await api('a',message())).status,403);assert.equal((await api('eve',{action:'friend-thread',friendship:f})).status,404);assert.equal((await api('unknown',message())).status,401);
await api('b',{action:'friend-accept',friendship:f});
const m=message('<b>ねこ</b>');const sent=await api('a',m);assert.equal(sent.status,200);assert.equal((await api('a',m)).data.id,sent.data.id);assert.equal((await api('a',{...m,body:'変化'})).status,409);
assert.equal(sql.prepare('SELECT COUNT(*) n FROM friend_messages').get().n,1);
let inbox=(await api('b')).data;assert.equal(inbox.friends[0].unread,1);assert.equal(inbox.friends[0].lastMessageBody,m.body);assert.equal('lastMessageOwner' in inbox.friends[0],false);
assert.equal((await api('a',message(''))).status,400);assert.equal((await api('a',message('x'.repeat(1001)))).status,400);
let thread=await api('b',{action:'friend-thread',friendship:f});assert.equal(thread.data.items[0].body,m.body);assert.equal('owner' in thread.data.items[0],false);
assert.equal((await api('a',{action:'friend-message-read',friendship:f,id:sent.data.id})).status,404);
assert.equal((await api('b',{action:'friend-message-read',friendship:f,id:sent.data.id})).status,200);assert.equal((await api('b')).data.friends[0].unread,0);
// Diary contents stay locked until both parties submit, even through DM endpoints.
const diary={action:'friend-send',friendship:f,body:'今日の空は青かった。',mood:'🌤️',paper:'plain',stickers:[]};assert.equal((await api('a',diary)).status,200);
const letter=(await api('a')).data.friendLetters[0];assert.equal((await api('b',{action:'friend-letter',friendship:f,id:letter.id})).status,403);
assert.equal((await api('b',{action:'friend-thread',friendship:f})).data.items.some(e=>e.kind==='diary'),false);
assert.equal((await api('b',diary)).status,200);thread=await api('b',{action:'friend-thread',friendship:f});assert.equal(thread.data.items.filter(e=>e.kind==='diary').length,2);assert.ok(thread.data.items.filter(e=>e.kind==='diary').every(e=>e.body===null));assert.equal((await api('b',{action:'friend-letter',friendship:f,id:letter.id})).data.letter.body,diary.body);
assert.equal((await api('eve',{action:'friend-letter',friendship:f,id:letter.id})).status,404);
// Fifty-item pagination including identical timestamps has no gaps or repeats.
for(let i=0;i<65;i++)sql.prepare('INSERT INTO friend_messages(id,friendship,owner,target,client_id,body,created) VALUES(?,?,?,?,?,?,?)').run('old-'+String(i).padStart(3,'0'),f,'google:a','google:b',crypto.randomUUID(),'古いメッセージ '+i,1000+Math.floor(i/20)*61000);
const first=(await api('b',{action:'friend-thread',friendship:f})).data;const second=(await api('b',{action:'friend-thread',friendship:f,before:first.older})).data;assert.equal(first.items.length,50);assert.equal(new Set([...first.items,...second.items].map(e=>e.key)).size,68);assert.equal(second.older,null);
assert.equal((await api('b',{action:'friend-thread',friendship:f,before:{created:'oops',key:''}})).status,400);
// Text messages are independent of the one-diary-per-day quota.
assert.equal((await api('a',message('また明日'))).status,200);assert.equal((await api('a',diary)).status,409);
for(let i=0;i<28;i++)assert.equal((await api('a',message('お便り '+i))).status,200);
assert.equal((await api('a',message('多すぎる'))).status,429);
await api('b',{action:'friend-block',friendship:f});assert.equal((await api('a',message())).status,403);assert.equal((await api('a',{action:'friend-thread',friendship:f})).status,403);
assert.throws(()=>sql.prepare('INSERT INTO friend_messages(id,friendship,owner,target,client_id,body,created) VALUES(?,?,?,?,?,?,?)').run('blocked',f,'google:a','google:b',crypto.randomUUID(),'no',Date.now()),/FRIEND_UNAVAILABLE/);
console.log('PASS: DM authentication, consent, isolation, retries, receipts, diary locks, pagination, rate limits and blocking');
} catch(e){console.error(e.message);process.exitCode=1;}
