import assert from 'node:assert/strict';
import {createFixture,loadModules} from './fixture.mjs';
const {sql}=createFixture();const {GET,POST,newSession,authCookie,SESSION_SECONDS}=await loadModules(true),base='https://diary.example',cookies={};
for(const u of ['a','b','eve'])cookies[u]=authCookie(new Request(base),'session',await newSession('google:'+u),SESSION_SECONDS).split(';')[0];
async function api(u,data){const r=await(data?POST:GET)(new Request(base+'/api/diary',{method:data?'POST':'GET',headers:{cookie:cookies[u]||'',Origin:base},body:data?JSON.stringify(data):undefined}));return{status:r.status,data:await r.json()};}
await api('a');const b=(await api('b')).data;await api('a',{action:'friend-request',code:b.profile.code});const f=(await api('b')).data.friends[0].id;
await api('b',{action:'friend-accept',friendship:f});
const photo='data:image/jpeg;base64,'+Buffer.from([255,216,255,192,0,11,8,3,192,5,0,1,1,17,0,255,218,0,8,1,1,0,0,63,0,1,255,217]).toString('base64');
const msg={action:'friend-message',friendship:f,clientId:crypto.randomUUID(),body:'hello',photo};
const sent=await api('a',msg);assert.equal(sent.status,200);
const undo={action:'friend-message-unsend',friendship:f,id:sent.data.id};
assert.equal((await api('b',undo)).status,404);assert.equal((await api('eve',undo)).status,404);assert.equal((await api('nobody',undo)).status,401);
assert.equal((await api('a',undo)).status,200);assert.equal((await api('a',undo)).status,200);
assert.equal((await api('a',msg)).status,409);
const row=sql.prepare('SELECT * FROM friend_messages WHERE id=?').get(sent.data.id);assert.equal(row.body,'');assert.equal(row.photo,null);assert.ok(row.unsent_at);
assert.equal((await api('b',{action:'friend-photo',friendship:f,id:sent.data.id})).status,404);
const state=(await api('b')).data.friends[0];assert.equal(state.unread,0);assert.equal(state.lastMessageBody,null);
for(let i=0;i<55;i++)sql.prepare('INSERT INTO friend_messages(id,friendship,owner,target,client_id,body,created) VALUES(?,?,?,?,?,?,?)').run('filler'+i,f,'google:b','google:a',crypto.randomUUID(),'later',Date.now()+(i+1)*61000);
const thread=(await api('b',{action:'friend-thread',friendship:f})).data;assert.equal(thread.items.length,50);assert.ok(!thread.items.some(e=>e.id===sent.data.id));assert.ok(thread.unsent.some(e=>e.id===sent.data.id));
const older=(await api('b',{action:'friend-thread',friendship:f,before:thread.older})).data.items.find(e=>e.id===sent.data.id);assert.equal(older.body,'');assert.equal(older.hasPhoto,0);assert.ok(older.unsent_at);
await api('b',{action:'friend-block',friendship:f});assert.equal((await api('a',undo)).status,403);
console.log('PASS: unsend ownership, idempotency, photo removal, retry protection, unread/preview cleanup, old-page synchronization and block checks');

