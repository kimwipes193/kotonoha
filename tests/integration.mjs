import assert from 'node:assert/strict';
import { DatabaseSync } from 'node:sqlite';
import { readFileSync } from 'node:fs';
import { transformSync } from 'esbuild';
const sql=new DatabaseSync(':memory:');
sql.exec(readFileSync('drizzle/0000_sturdy_nico_minoru.sql','utf8'));
function statement(query,args=[]){return {bind(...values){return statement(query,values)},async all(){return {results:sql.prepare(query).all(...args)}},async first(){return sql.prepare(query).get(...args)??null},async run(){return sql.prepare(query).run(...args)}};}
globalThis.__diaryTestEnv={DB:{prepare:statement,async batch(statements){sql.exec('BEGIN');try{const result=[];for(const s of statements)result.push(await s.run());sql.exec('COMMIT');return result;}catch(e){sql.exec('ROLLBACK');throw e;}}}};
const bundle={outputFiles:[{text:transformSync(readFileSync('lib/diary-rules.ts','utf8')+readFileSync('app/api/diary/route.ts','utf8').replace(/import \{ checkDiary, dayKey, items, moods, regions \} from '[^']+';/,''),{loader:'ts',format:'esm'}).code}]};
const source=bundle.outputFiles[0].text.replace(/import \{ env \} from "cloudflare:workers";/,'const env=globalThis.__diaryTestEnv;');
const {GET,POST}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
const base='http://localhost:5173';
async function api(owner,data,origin=base){const req=new Request(base+'/api/diary',{method:data?'POST':'GET',headers:{...(owner?{'oai-authenticated-user-id':owner}:{}),...(data?{'Content-Type':'application/json',Origin:origin}:{})},body:data?JSON.stringify(data):undefined});const r=await (data?POST(req):GET(req));return {status:r.status,data:await r.json()};}
assert.equal((await api(null)).status,401);
assert.equal((await api('alice',{action:'gacha'},'https://invalid.example')).status,403);
const diary={action:'send',body:'今日は公園を歩きました。風が気持ちよくて、小さな花も見つけました。',mood:'🌤️',region:'日本',paper:'plain',sticker:''};
assert.equal((await api('alice',{...diary,body:'私の連絡先は example@example.com です。'})).status,400);
assert.equal((await api('alice',diary)).status,200);
assert.equal((await api('alice',diary)).status,409);
assert.equal((await api('bob',{...diary,region:'フランス'})).status,200);
assert.equal((await api('alice')).data.received.length,0);
assert.equal((await api('alice',{action:'gacha'})).status,200);
assert.equal((await api('alice',{action:'gacha'})).status,409);
const realNow=Date.now;Date.now=()=>realNow()+31000;
const box=(await api('alice')).data;
assert.equal(box.received.length,1);assert.equal(box.today,1);assert.equal(box.collection.length,1);
assert.equal(box.received[0].region,'フランス');assert.equal(box.received[0].owner,undefined);
const id=box.received[0].id;
assert.equal((await api('bob',{action:'react',id,reaction:'🤍'})).status,404);
assert.equal((await api('alice',{action:'react',id,reaction:'🤍'})).status,200);
assert.equal((await api('alice')).data.received[0].reaction,'🤍');
assert.equal((await api('alice',{action:'report',id,reason:'その他'})).status,200);
assert.equal((await api('alice')).data.received.length,0);
Date.now=realNow;
console.log('PASS: route integration — authentication, origin, moderation, save, daily limits, gacha, delay, matching, ownership, reaction, reporting');

