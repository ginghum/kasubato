'use strict';
const grade12Stats=require('../balance/grade12/after-stats.json');
const laterGrade5Stats=require('../balance/grade5-equal/after-stats.json');
const assert=require('node:assert/strict'),{roster,resolve}=require('../engine.js'),scope=require('../balance/grade4/scope.json'),stats=require('../balance/grade4/after-stats.json'),grade3Stats=require('../balance/grade3/after-stats.json');
assert.equal(Object.keys(stats).length,15);
assert(scope.beforeProfiles.length<=roster.length);
for(const before of scope.beforeProfiles){
 const current=roster.find(p=>p.id===before.id),expected=before.grade==='4'?{...before,stats:stats[before.name]}:before.grade==='3'?{...before,stats:grade3Stats[before.name]}:before;
 const latest=laterGrade5Stats[before.name]?{...expected,stats:laterGrade5Stats[before.name]}:expected;
 assert.deepEqual(current,grade12Stats[before.name]?{...latest,stats:grade12Stats[before.name]}:latest,before.id+' changed outside the approved stats');
 if(before.grade==='4'){
  assert.equal(current.stats.speed,before.stats.speed,'movement speed stays unchanged');
  assert.deepEqual(resolve(before.realName).stats,current.stats);
  for(const value of Object.values(current.stats))assert(Number.isFinite(value)&&value>0);
 }
}
console.log('PASS Grade 4: 15 stat-only adjustments / later Grade 3 stats recorded / later Grade 5 stats recorded / later Grade 1/2 stats recorded / ability metadata unchanged');
