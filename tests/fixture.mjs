import { readFileSync, readdirSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { transformSync } from 'esbuild';
export function createFixture(){
 const sql=new DatabaseSync(':memory:');
 for(const migration of readdirSync('drizzle').filter(f=>f.endsWith('.sql')).sort())sql.exec(readFileSync('drizzle/'+migration,'utf8'));
 function statement(query,args=[]){return {bind(...values){return statement(query,values)},async all(){return {results:sql.prepare(query).all(...args)}},async first(){return sql.prepare(query).get(...args)??null},async run(){return sql.prepare(query).run(...args)}};}
 const env={DB:{prepare:statement,async batch(statements){sql.exec('BEGIN');try{const result=[];for(const s of statements)result.push(await s.run());sql.exec('COMMIT');return result;}catch(e){sql.exec('ROLLBACK');throw e;}}},APP_ORIGIN:'https://diary.example',GOOGLE_CLIENT_ID:'test-client.apps.googleusercontent.com',GOOGLE_CLIENT_SECRET:'test-only-not-a-real-secret'};
 globalThis.__diaryTestEnv=env;
 return {sql,env};
}
export async function loadModules(includeDiary=false){
 let source=readFileSync('lib/auth.ts','utf8');
 if(includeDiary)source+=['lib/sticker-layout.ts','lib/country.ts','lib/diary-rules.ts','lib/rewards.ts','lib/progression.ts','app/api/diary/route.ts'].map(p=>readFileSync(p,'utf8').replace(/^import .* from ['"][^'"]+['"];$/gm,'')).join('\n');
 source=source.replace("import { env } from 'cloudflare:workers';",'const env=globalThis.__diaryTestEnv;');
 source=source.replace("from 'jose'",'from '+JSON.stringify(pathToFileURL(resolve('node_modules/jose/dist/webapi/index.js')).href));
 return import('data:text/javascript;base64,'+Buffer.from(transformSync(source,{loader:'ts',format:'esm'}).code).toString('base64'));
}
