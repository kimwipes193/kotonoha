import assert from 'node:assert/strict';import {createFixture,loadModules} from './fixture.mjs';
try{
 const {sql}=createFixture();const {GET,POST,newSession,authCookie,SESSION_SECONDS,defaultProfileDetails}=await loadModules(true);const base='https://diary.example';const cookies={};for(const u of ['a','b','eve'])cookies[u]=authCookie(new Request(base),'session',await newSession('google:'+u),SESSION_SECONDS).split(';')[0];
 async function api(u,data){const r=await(data?POST:GET)(new Request(base+'/api/diary',{method:data?'POST':'GET',headers:{cookie:cookies[u],Origin:base},body:data?JSON.stringify(data):undefined}));return {status:r.status,data:await r.json()};}
 await api('a');const b=(await api('b')).data;await api('a',{action:'friend-request',code:b.profile.code});const f=(await api('b')).data.friends[0];
 const d=defaultProfileDetails();d.theme='gingham';d.color='mint';d.favorites={food:'プリン',color:'黄色',place:'図書館',work:'星の王子さま'};d.stickers=[{sticker:'🌷',layout:{x:20,y:30,scale:1.2,rotation:20}}];const save={action:'profile-save',nickname:'ねこ',icon:'🐈',birthday:'0415',details:d};
 assert.equal((await api('a',save)).status,400,'unowned sticker rejected');
 sql.prepare("INSERT INTO rewards(id,owner,day,kind,item,consumed_by) VALUES('p','google:a','past','gacha','🌷','used')").run();
 assert.equal((await api('a',save)).status,200);assert.deepEqual(JSON.parse((await api('a')).data.profile.details),d);assert.equal((await api('b')).data.friends[0].details,null);assert.equal((await api('eve')).data.friends.length,0);
 await api('b',{action:'friend-accept',friendship:f.id});assert.deepEqual(JSON.parse((await api('b')).data.friends[0].details),d);
 assert.equal((await api('a',{...save,details:{...d,color:'url(evil)'}})).status,400);assert.equal((await api('a',{...save,details:{...d,stickers:Array(6).fill(d.stickers[0])}})).status,400);assert.equal((await api('a',{...save,details:{...d,favorites:{...d.favorites,food:'https://example.com'}}})).status,400);assert.equal((await api('a',{...save,details:{...d,favorites:{...d.favorites,work:'長'.repeat(41)}}})).status,400);
 assert.equal((await api('a',{action:'profile-save',nickname:'別のねこ',icon:'🐈',birthday:'0415'})).status,200);assert.deepEqual(JSON.parse((await api('a')).data.profile.details),d,'older clients preserve decoration');assert.equal(sql.prepare("SELECT consumed_by FROM rewards WHERE id='p'").get().consumed_by,'used');
 await api('b',{action:'friend-block',friendship:f.id});assert.equal((await api('b')).data.friends.length,0);
 console.log('PASS: profile styles/favorites/stickers persistence, ownership, moderation, legacy saves, pending/stranger/block privacy');
}catch(e){console.error(e.message);process.exitCode=1;}
