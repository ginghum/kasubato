'use strict';
const assert=require('node:assert/strict'),{roster,resolve}=require('../engine.js'),scope=require('../balance/grade3/scope.json'),stats=require('../balance/grade3/after-stats.json');
assert.equal(Object.keys(stats).length,19);
assert.equal(scope.beforeProfiles.length,roster.length);
for(const before of scope.beforeProfiles){
 const current=roster.find(p=>p.id===before.id),expected=before.grade==='3'?{...before,stats:stats[before.name]}:before;
 assert.deepEqual(current,expected,before.id+' changed outside the approved stats');
 if(before.grade==='3'){
  assert.equal(current.stats.speed,before.stats.speed,'movement speed stays unchanged');
  assert.deepEqual(resolve(before.realName).stats,current.stats);
  for(const value of Object.values(current.stats))assert(Number.isFinite(value)&&value>0);
 }
}
console.log('PASS Grade 3: 19 stat-only adjustments / 74 other profiles and ability metadata unchanged');
