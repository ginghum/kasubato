'use strict';
const assert=require('node:assert/strict'),{profiles,resolve}=require('../engine.js'),scope=require('../balance/grade12/scope.json'),after=require('../balance/grade12/after-stats.json');
assert.equal(scope.targets.length,36);assert.equal(Object.keys(after).length,36);
for(const before of scope.beforeProfiles){
 const current=profiles.find(p=>p.id===before.id),stats=after[before.name];
 assert.equal(Boolean(stats),scope.targets.includes(before.id));
 assert.deepEqual(current,stats?{...before,stats}:before,'only Grade 1/2 ATK and HP change: '+before.id);
 if(stats){assert(['1','2'].includes(current.grade));assert.equal(stats.speed,before.stats.speed);assert.deepEqual(resolve(current.realName).stats,stats);for(const v of Object.values(stats))assert(Number.isFinite(v)&&v>0);}
}
const {World,roster}=require('../engine.js');
for(const grade of ['1','2']){
 const pool=roster.filter(p=>p.grade===grade),names=pool.map(p=>p.name),original=[...names];
 const snapshot=w=>w.units.map(f=>[f.profile.id,f.x,f.y,f.angle,f.baseAtk,f.maxHp]);
 const a=new World(names,{seed:'low-grade-order'}),b=new World([...names].reverse(),{seed:'low-grade-order'}),c=new World(pool.map(p=>p.realName),{seed:'low-grade-order'});
 assert.deepEqual(names,original,'caller lineup is not mutated');assert.deepEqual(snapshot(a),snapshot(b),'input order cannot bias the full cohort');assert.deepEqual(snapshot(a),snapshot(c),'real names preserve seeded order');
 assert.deepEqual(a.units.map(f=>f.profile.id).sort(),pool.map(p=>p.id).sort());assert.notDeepEqual(a.units.map(f=>f.profile.id),new World(names,{seed:'another-order'}).units.map(f=>f.profile.id));
 const subset=names.slice(0,5);assert.deepEqual(new World(subset,{seed:'subset'}).units.map(f=>f.name),subset);
}
for(const grade of ['3','4','5']){const names=roster.filter(p=>p.grade===grade).map(p=>p.name);assert.deepEqual(new World(names,{seed:'other-grade'}).units.map(f=>f.name),names);}
console.log('PASS Grade 1/2: 36 recorded stat adjustments / unchanged speed and abilities / full-cohort seeded order independent of input order and aliases / other cohorts preserved');
