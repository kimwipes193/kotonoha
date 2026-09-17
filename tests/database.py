import sqlite3, pathlib, re
root=pathlib.Path(__file__).resolve().parents[1]
sql=(root/'drizzle/0000_sturdy_nico_minoru.sql').read_text(encoding='utf-8-sig')
route=(root/'app/api/diary/route.ts').read_text(encoding='utf-8-sig')
match=re.search(r'prepare\(`(UPDATE entries SET receiver=.*?)`\)',route).group(1)
def fresh():
 d=sqlite3.connect(':memory:');d.executescript(sql);return d
def add(d,id,owner,created=1,flagged=0):
 d.execute('INSERT INTO entries(id,owner,day,slot,body,mood,region,paper,sticker,created,flagged) VALUES(?,?,?,0,?,?,?,?,?,?,?)',(id,owner,'2026-09-17','Test diary content','sun','Japan','plain','',created,flagged))
def exchange(d,owner,own):d.execute(match,(owner,own,owner,100,owner,owner,own))
d=fresh();add(d,'a','alice');add(d,'b','bob');exchange(d,'alice','a');exchange(d,'alice','a')
assert d.execute('SELECT COUNT(*) FROM entries WHERE receiver="alice"').fetchone()[0]==1
assert d.execute('SELECT receiver FROM entries WHERE id="a"').fetchone()[0] is None
exchange(d,'bob','b');assert d.execute('SELECT receiver FROM entries WHERE id="a"').fetchone()[0]=='bob'
try:add(d,'a2','alice');raise AssertionError('daily duplicate allowed')
except sqlite3.IntegrityError:pass
for mode in ['blocked','reverse','flagged','young']:
 d=fresh();add(d,'a','alice');add(d,'b','bob',created=200 if mode=='young' else 1,flagged=int(mode=='flagged'))
 if mode=='blocked':d.execute('INSERT INTO blocks VALUES("x","alice","bob")')
 if mode=='reverse':d.execute('INSERT INTO blocks VALUES("x","bob","alice")')
 exchange(d,'alice','a');assert d.execute('SELECT COUNT(*) FROM entries WHERE receiver IS NOT NULL').fetchone()[0]==0,mode
d=fresh();d.execute('INSERT INTO rewards VALUES("r","alice","2026-09-17","gacha","flower")')
try:d.execute('INSERT INTO rewards VALUES("s","alice","2026-09-17","gacha","cat")');raise AssertionError('duplicate gacha allowed')
except sqlite3.IntegrityError:pass
print('PASS: unique delivery, no self matching, daily limits, both block directions, moderation exclusion, delivery delay, daily gacha')
