import assert from 'node:assert/strict';
import {createFixture,loadModules} from './fixture.mjs';
createFixture();
const {GET,POST,newSession,authCookie,SESSION_SECONDS,requestCountry}=await loadModules(true);
const base='https://diary.example';
const cookies=new Map();
for(const owner of ['alice','bob'])cookies.set(owner,authCookie(new Request(base),'session',await newSession('google:'+owner),SESSION_SECONDS).split(';')[0]);
async function api(owner,data,origin=base){const req=new Request(base+'/api/diary',{method:data?'POST':'GET',headers:{...(owner?{cookie:cookies.get(owner)}:{}),...(data?{'Content-Type':'application/json',Origin:origin}:{})},body:data?JSON.stringify(data):undefined});Object.defineProperty(req,'cf',{value:{country:owner==='bob'?'FR':'JP'}});const r=await (data?POST(req):GET(req));return {status:r.status,data:await r.json()};}
assert.equal((await api(null)).status,401);
assert.equal((await api(null)).data.region,'日本');
assert.equal(requestCountry(new Request(base,{headers:{'CF-IPCountry':'US'}})),'どこか');
for(const code of ['XX','T1','ZZ','invalid',null]){const req=new Request(base);Object.defineProperty(req,'cf',{value:{country:code}});assert.equal(requestCountry(req),'どこか');}
assert.equal((await api('alice',{action:'gacha'},'https://invalid.example')).status,403);
const diary={action:'send',body:'あ',mood:'🌤️',region:'日本',paper:'plain',sticker:''};
assert.equal((await api('alice',{...diary,body:'私の連絡先は example@example.com です。'})).status,400);
assert.equal((await api('alice',{...diary,body:'あ'.repeat(201)})).status,400);
assert.equal((await api('alice',{...diary,body:'あ'.repeat(200)})).status,200);
assert.equal((await api('alice',diary)).status,409);
assert.equal((await api('bob',{...diary,region:'偽の国'})).status,200);
assert.equal((await api('alice')).data.received.length,0);
assert.equal((await api('alice',{action:'gacha'})).status,200);
const savedError=console.error;console.error=()=>{};try{assert.equal((await api('alice',{action:'gacha'})).status,409);}finally{console.error=savedError;}
const realNow=Date.now;Date.now=()=>realNow()+31000;
const box=(await api('alice')).data;
assert.equal(box.received.length,1);assert.equal(box.today,1);assert.ok(box.collection.length>=1);
assert.equal(box.received[0].region,'フランス');assert.equal(box.received[0].owner,undefined);
const id=box.received[0].id;
assert.equal((await api('bob',{action:'react',id,reaction:'☺️'})).status,404);
assert.equal((await api('alice',{action:'react',id,reaction:'☺️'})).status,200);
assert.equal((await api('alice')).data.received[0].reaction,'☺️');
for(const reaction of ['😢','😂','😠','☺️']){assert.equal((await api('alice',{action:'react',id,reaction})).status,200);assert.equal((await api('alice')).data.received[0].reaction,reaction);}
assert.equal((await api('alice',{action:'react',id,reaction:'🤍'})).status,400);
assert.equal((await api('alice',{action:'report',id,reason:'その他'})).status,200);
assert.equal((await api('alice')).data.received.length,0);
Date.now=realNow;
console.log('PASS: route integration — authentication, origin, moderation, save, daily limits, gacha, delay, matching, ownership, reaction, reporting');


