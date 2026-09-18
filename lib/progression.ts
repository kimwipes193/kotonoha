import { challenges, weekKey, type ProgressStats } from './rewards';
export async function syncProgress(database:D1Database,owner:string){
 const week=weekKey(new Date(Date.now()));
 const pets=await database.prepare('SELECT COUNT(*) AS pets, COALESCE(SUM(week=?),0) AS weeklyPets FROM pet_events WHERE owner=?').bind(week,owner).first<{pets:number;weeklyPets:number}>();
 const sent=await database.prepare('SELECT COUNT(*) AS n FROM entries WHERE owner=?').bind(owner).first<{n:number}>();
 const received=await database.prepare('SELECT COUNT(*) AS exchanges, COUNT(DISTINCT region) AS regions, COUNT(reaction) AS reactions FROM entries WHERE receiver=?').bind(owner).first<{exchanges:number;regions:number;reactions:number}>();
 const stats:ProgressStats={pets:pets?.pets??0,weeklyPets:pets?.weeklyPets??0,sent:sent?.n??0,exchanges:received?.exchanges??0,regions:received?.regions??0,reactions:received?.reactions??0,stickers:0};
 if(stats.weeklyPets>=100)await database.prepare("INSERT OR IGNORE INTO rewards(id,owner,day,kind,item) VALUES(?,?,?,'weekly-pats','🐾')").bind(crypto.randomUUID(),owner,week).run();
 for(let pass=0;pass<2;pass++){
  const collection=await database.prepare("SELECT COUNT(DISTINCT item) AS n FROM rewards WHERE owner=? AND kind<>'bonus' AND item NOT LIKE 'paper-%' AND item<>''").bind(owner).first<{n:number}>();stats.stickers=collection?.n??0;
  const awards=challenges.filter(c=>stats[c.stat]>=c.goal);
  if(awards.length)await database.batch(awards.flatMap(c=>{
   const statements=[database.prepare('INSERT OR IGNORE INTO titles(owner,title,earned) VALUES(?,?,?)').bind(owner,c.id,Date.now())];
   if('reward' in c)statements.push(database.prepare("INSERT OR IGNORE INTO rewards(id,owner,day,kind,item) VALUES(?,?,'once',?,?)").bind(crypto.randomUUID(),owner,'achievement:'+c.id,c.reward));return statements;
  }));
 }
 const titles=await database.prepare('SELECT title AS id,earned FROM titles WHERE owner=? ORDER BY earned').bind(owner).all<{id:string;earned:number}>();
 const claimed=await database.prepare("SELECT id FROM rewards WHERE owner=? AND day=? AND kind='weekly-pats'").bind(owner,week).first();
 return {stats,titles:titles.results.flatMap(t=>{const c=challenges.find(c=>c.id===t.id);return c?[{...t,name:c.name,icon:c.icon}]:[];}),week,weeklyClaimed:!!claimed};
}
