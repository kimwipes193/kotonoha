import assert from 'node:assert/strict';
import {createFixture,loadModules} from './fixture.mjs';
const {sql,env}=createFixture();
const {POST,newSession,authCookie,SESSION_SECONDS}=await loadModules(true);
const base='https://diary.example';
const cookies={};for(const owner of ['alice','bob','other'])cookies[owner]=authCookie(new Request(base),'session',await newSession('google:'+owner),SESSION_SECONDS).split(';')[0];
async function api(owner,data,origin=base){const r=await POST(new Request(base+'/api/diary',{method:'POST',headers:{...(owner?{cookie:cookies[owner]}:{}),Origin:origin},body:JSON.stringify({action:'translate',id:'letter',target:'en',...data})}));return {status:r.status,...await r.json()};}
sql.prepare("INSERT INTO entries(id,owner,day,slot,body,mood,region,paper,sticker,created,receiver) VALUES('letter','google:bob','2026-09-19',0,'こんにちは。','🌤️','日本','plain','',0,'google:alice')").run();
let calls=0;env.AI={async run(model,input){calls++;assert.equal(model,'@cf/google/gemma-4-26b-a4b-it');assert.equal(input.messages[1].content,'こんにちは。');assert.equal(input.max_completion_tokens,3000);return {choices:[{message:{content:'Hello.'},finish_reason:'stop'}]};}};
assert.equal((await api(null)).status,401);assert.equal((await api('alice',{},'https://bad.example')).status,403);assert.equal((await api('other')).status,404);assert.equal((await api('alice',{target:'de'})).status,400);assert.equal((await api('alice',{target:'constructor'})).status,400);assert.equal((await api('alice',{id:'missing'})).status,404);assert.equal(calls,0);
for(const target of ['ja','en','fr','zh-CN','ko'])assert.equal((await api('alice',{target})).text,'Hello.');assert.equal(calls,5);
assert.equal((await api('alice')).text,'Hello.');assert.equal((await api('bob')).text,'Hello.');assert.equal(calls,5);
sql.prepare("INSERT INTO blocks(id,owner,target) VALUES('block','google:alice','google:bob')").run();assert.equal((await api('alice')).status,404);sql.exec('DELETE FROM blocks');
sql.exec('UPDATE entries SET flagged=1');assert.equal((await api('alice')).status,404);sql.exec('UPDATE entries SET flagged=0; DELETE FROM diary_translations');
env.AI={async run(){throw new Error('private provider error');}};assert.equal((await api('alice')).status,503);
env.AI={async run(){return {choices:[{message:{content:'unfinished'},finish_reason:'length'}]};}};assert.equal((await api('alice')).status,503);assert.equal(sql.prepare('SELECT COUNT(*) n FROM diary_translations').get().n,0);
sql.exec('DELETE FROM translation_usage');
// Use immediate provider for concurrent reservations; no more than ten are accepted per account.
env.AI={async run(){calls++;await new Promise(resolve=>setTimeout(resolve,30));return {response:'Hello.'};}};calls=0;
const burst=await Promise.all(Array.from({length:12},()=>api('alice')));assert.ok(calls<=10);assert.ok(burst.some(r=>r.status===429));
sql.exec('DELETE FROM diary_translations; DELETE FROM translation_usage');const day=new Date().toISOString().slice(0,10);sql.prepare('INSERT INTO translation_usage(key,count) VALUES(?,50)').run('global:'+day);assert.equal((await api('alice')).status,429);
delete env.AI;assert.equal((await api('alice')).status,503);
console.log('PASS: translation auth, origin, ownership, hidden entries, languages, caching, provider errors, truncation and concurrent quotas');
