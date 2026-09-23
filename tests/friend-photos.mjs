import assert from 'node:assert/strict';
import {createFixture,loadModules} from './fixture.mjs';
try{
const {sql}=createFixture();const {GET,POST,newSession,authCookie,SESSION_SECONDS}=await loadModules(true),base='https://diary.example',cookies={};
for(const u of ['a','b','eve'])cookies[u]=authCookie(new Request(base),'session',await newSession('google:'+u),SESSION_SECONDS).split(';')[0];
async function api(u,data){const r=await(data?POST:GET)(new Request(base+'/api/diary',{method:data?'POST':'GET',headers:{cookie:cookies[u]||'',Origin:base},body:data?JSON.stringify(data):undefined}));return{status:r.status,data:await r.json()};}
await api('a');const b=(await api('b')).data;await api('a',{action:'friend-request',code:b.profile.code});const f=(await api('b')).data.friends[0].id;
const photo='data:image/jpeg;base64,'+Buffer.from([255,216,255,192,0,11,8,3,192,5,0,1,1,17,0,255,218,0,8,1,1,0,0,63,0,1,255,217]).toString('base64');
const msg={action:'friend-message',friendship:f,clientId:crypto.randomUUID(),body:'',photo};
assert.equal((await api('a',msg)).status,403);await api('b',{action:'friend-accept',friendship:f});
const sent=await api('a',msg);assert.equal(sent.status,200);assert.equal((await api('a',msg)).data.id,sent.data.id);assert.equal(sql.prepare('SELECT COUNT(*) n FROM friend_messages').get().n,1);
assert.equal((await api('a',{...msg,photo:null})).status,400);
assert.equal((await api('a',{...msg,body:'changed'})).status,409);
for(const bad of ['data:image/svg+xml;base64,PHN2Zz4=',photo+'A','https://evil.example/image','data:image/jpeg;base64,'+'A'.repeat(350000)])assert.equal((await api('a',{...msg,clientId:crypto.randomUUID(),photo:bad})).status,400);
const lookup={action:'friend-photo',friendship:f,id:sent.data.id};
assert.equal((await api('b',lookup)).data.photo,photo);assert.equal((await api('a',lookup)).data.photo,photo);assert.equal((await api('eve',lookup)).status,404);assert.equal((await api('nobody',lookup)).status,401);assert.equal((await api('b',{...lookup,id:'missing'})).status,404);
const thread=(await api('b',{action:'friend-thread',friendship:f})).data.items[0];assert.equal(thread.hasPhoto,1);assert.equal('photo' in thread,false);assert.equal((await api('b')).data.friends[0].lastMessageBody,'📷');
assert.equal((await api('b',{action:'friend-message-read',friendship:f,id:sent.data.id})).status,200);assert.equal((await api('b')).data.friends[0].unread,0);
await api('b',{action:'friend-block',friendship:f});assert.equal((await api('a',lookup)).status,403);assert.equal((await api('b',lookup)).status,403);
console.log('PASS: DM photo round trip, retry identity, validation, lightweight polling, receipts, consent, private access and block revocation');
}catch(e){console.error(e.message);process.exitCode=1;}
