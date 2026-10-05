'use strict';
const assert=require('node:assert/strict'),{World,roster,resolve}=require('../engine.js'),policy=require('../balance/grade5/unchanged-profiles.json');
assert.equal(policy.targets.length,19);
// Keep the historical fixture intact; the later council balance changes only Itoguchi's ATK.
for(const p of policy.beforeProfiles){const expected=p.id==='itoguchi'?{...p,stats:{...p.stats,atk:85}}:p;assert.deepEqual(roster.find(r=>r.id===p.id),expected,p.id+' was outside the balance scope');}
assert(!policy.targets.includes('empress'));assert(!policy.targets.includes('itoguchi'));
for(const id of policy.targets){const p=roster.find(r=>r.id===id);assert.equal(p.grade,'5');assert.deepEqual(resolve(p.name).stats,resolve(p.realName).stats);}
const w=new World(['ミカエル','デビル','プラス'],{seed:'balance-mechanics'});w.rng=()=>.99;const [m,d,p]=w.units;m.x=200;m.y=200;p.x=500;p.y=500;d.x=700;d.y=700;const hp=p.hp;w.cast(m,m.powers[0]);assert(p.hp<hp);assert(w.has(m,'guard'));assert.equal(w.zones.filter(z=>z.kind==='gate').length,2);w.cast(d,d.powers[0]);assert(w.units.some(f=>f.minion&&f.kind==='machine'&&f.team===d.team));
console.log('PASS balance scope: 19 Grade 5 targets / later Itoguchi ATK-only buff / other profiles unchanged / teleport attack / arena machinery');
