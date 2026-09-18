import assert from 'node:assert/strict';
import {createFixture,loadModules} from './fixture.mjs';
const {sql}=createFixture();
const {GET,newSession,authCookie,SESSION_SECONDS,dayKey}=await loadModules(true);
const base='https://diary.example';
const cookie=authCookie(new Request(base),'session',await newSession('google:alice'),SESSION_SECONDS).split(';')[0];
async function inbox(){const r=await GET(new Request(base+'/api/diary',{headers:{cookie}}));assert.equal(r.status,200);return (await r.json()).received;}
function entry(id,owner,created){sql.prepare('INSERT INTO entries(id,owner,day,slot,body,mood,region,paper,sticker,created) VALUES(?,?,?,?,?,?,?,?,?,?)').run(id,owner,dayKey(new Date(created)),0,'日記です','🌤️','日本','plain','',created);}
const midnight=Date.parse('2026-09-20T15:00:00Z');
const realNow=Date.now;Date.now=()=>midnight+60000;
try{
 entry('yesterday','google:bob',midnight-1);
 entry('today','google:alice',midnight);
 assert.equal((await inbox()).length,0,'adjacent timestamps across Japan midnight must not match');
 entry('today-bob','google:bob',midnight+1000);
 assert.deepEqual((await inbox()).map(e=>e.id),['today-bob']);
 assert.equal(sql.prepare("SELECT receiver FROM entries WHERE id='yesterday'").get().receiver,null);
 // Old unmatched posts must not prevent a newer same-day match.
 for(let i=1;i<=25;i++)entry('old'+i,'google:alice',midnight-i*86400000);
 entry('tomorrow','google:alice',midnight+86400000);
 entry('tomorrow-bob','google:bob',midnight+86400000+1000);
 Date.now=()=>midnight+86400000+60000;
 const received=await inbox();
 assert.ok(received.some(e=>e.id==='tomorrow-bob'));
 assert.ok(received.some(e=>e.id==='today-bob'),'previously received diaries remain visible');
 const mismatches=sql.prepare('SELECT e.id FROM entries e JOIN entries own ON own.id=e.received_for WHERE e.day<>own.day').all();
 assert.equal(mismatches.length,0);
 assert.equal((await inbox()).length,received.length,'repeated reads do not grant extra diaries');
}finally{Date.now=realNow;}
console.log('PASS: same posting day, Japan midnight boundary, backlog, history, no duplicate matching');
