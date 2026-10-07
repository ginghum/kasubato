'use strict';
const grade12Stats=require('../balance/grade12/after-stats.json');
const assert=require('node:assert/strict'),{profiles,resolve}=require('../engine.js'),scope=require('../balance/grade5-equal/scope.json'),after=require('../balance/grade5-equal/after-stats.json');
assert.equal(scope.targets.length,25);assert.equal(Object.keys(after).length,25);
for(const before of scope.beforeProfiles){
 const current=profiles.find(p=>p.id===before.id),stats=after[before.name];
 assert.equal(Boolean(stats),scope.targets.includes(before.id));
 const expected=stats?{...before,stats}:before;assert.deepEqual(current,grade12Stats[before.name]?{...expected,stats:grade12Stats[before.name]}:expected,'only recorded ATK/HP changes: '+before.id);
 if(stats){assert.equal(current.grade,'5');assert.equal(current.stats.speed,before.stats.speed);assert(current.id!=='empress');assert.deepEqual(resolve(current.realName).stats,stats);for(const value of Object.values(stats))assert(Number.isFinite(value)&&value>0);}
}
const before=scope.beforeProfiles.find(p=>p.id==='itoguchi'),now=profiles.find(p=>p.id==='itoguchi');assert(now.stats.atk>=before.stats.atk&&now.stats.hp>=before.stats.hp,'Itoguchi is strengthened');
assert.equal(profiles.filter(p=>p.grade==='5'&&!['empress','itoguchi'].includes(p.id)).length,24);
console.log('PASS Grade 5 equalization scope: 24 peers + Itoguchi / recorded ATK and HP / unchanged SPD and abilities / later Grade 1/2 stats recorded / Empress preserved');

{const w=new (require('../engine.js').World)(['ミュー','プラス'],{seed:'mu-balance'});w.rng=()=>.99;const [f,t]=w.units;w.cast(f,f.powers[0]);assert(Math.abs(f.shield-f.maxHp*.11)<1e-8);assert.equal(w.shots.length,3);assert(w.units.some(u=>u.minion&&u.kind==='diamond'));}
{const w=new (require('../engine.js').World)(['クラリーヌ','プラス'],{seed:'clarine-balance'});w.rng=()=>.99;const [f,t]=w.units;f.x=400;f.y=400;t.x=420;t.y=400;w.cast(f,f.powers[0]);assert.equal(t.status.stun,1.0);assert.equal(t.status.stone,1.0);assert(t.hp<t.maxHp);}
