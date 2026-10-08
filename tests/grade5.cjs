'use strict';
const expandedStats=require('../balance/grade5-expanded/after-stats.json');
const expanded=p=>expandedStats[p.name]?{...p,stats:expandedStats[p.name]}:p;
const grade12Stats=require('../balance/grade12/after-stats.json');
const laterGrade5Stats=require('../balance/grade5-equal/after-stats.json');
const assert=require('node:assert/strict'),{World,roster,resolve}=require('../engine.js'),policy=require('../balance/grade5/unchanged-profiles.json');
assert.equal(policy.targets.length,19);
// Preserve historical profiles, with explicitly recorded later Grade 3, Grade 4 and elite stat changes.
const grade4Stats=require('../balance/grade4/after-stats.json'),grade3Stats=require('../balance/grade3/after-stats.json');
for(const p of policy.beforeProfiles){const expected=p.grade==='3'?{...p,stats:grade3Stats[p.name]}:p.grade==='4'?{...p,stats:grade4Stats[p.name]}:p.id==='itoguchi'?{...p,stats:{...p.stats,atk:85}}:p.id==='empress'?{...p,stats:{...p.stats,hp:1600}}:p;const latest=laterGrade5Stats[p.name]?{...expected,stats:laterGrade5Stats[p.name]}:expected;assert.deepEqual(roster.find(r=>r.id===p.id),expanded(grade12Stats[p.name]?{...latest,stats:grade12Stats[p.name]}:latest),p.id+' was outside the balance scope');}
assert(!policy.targets.includes('empress'));assert(!policy.targets.includes('itoguchi'));
for(const id of policy.targets){const p=roster.find(r=>r.id===id);assert.equal(p.grade,'5');assert.deepEqual(resolve(p.name).stats,resolve(p.realName).stats);}
const w=new World(['ミカエル','デビル','プラス'],{seed:'balance-mechanics'});w.rng=()=>.99;const [m,d,p]=w.units;m.x=200;m.y=200;p.x=500;p.y=500;d.x=700;d.y=700;const hp=p.hp;w.cast(m,m.powers[0]);assert(p.hp<hp);assert(w.has(m,'guard'));assert.equal(w.zones.filter(z=>z.kind==='gate').length,2);w.cast(d,d.powers[0]);assert(w.units.some(f=>f.minion&&f.kind==='machine'&&f.team===d.team));
console.log('PASS balance scope: 19 Grade 5 targets / documented later Grade 3, Grade 4 and elite stats / later Grade 5 stats recorded / later Grade 1/2 stats recorded / teleport attack / arena machinery');
