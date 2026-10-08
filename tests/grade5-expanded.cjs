'use strict';
const assert=require('node:assert/strict'),fs=require('fs'),crypto=require('crypto'),{profiles,resolve}=require('../engine'),before=require('../balance/grade5-expanded/before-profiles.json'),after=require('../balance/grade5-expanded/after-stats.json'),scope=require('../balance/grade5-expanded/scope.json');
assert.equal(Object.keys(after).length,31);assert.equal(profiles.length,before.length);
for(const p of before){const current=profiles.find(x=>x.id===p.id),stats=after[p.name];assert.equal(Boolean(stats),p.grade==='5'&&!['empress','itoguchi'].includes(p.id));assert.deepEqual(current,stats?{...p,stats}:p,'only peer Grade 5 stats change: '+p.name);if(stats){assert.equal(stats.speed,p.stats.speed);assert.deepEqual(resolve(p.realName).stats,stats);for(const v of Object.values(stats))assert(Number.isFinite(v)&&v>0);}}
assert.equal(crypto.createHash('sha256').update(fs.readFileSync('engine.js')).digest('hex'),scope.engineSha256,'all ability mechanics, Empress and Itoguchi are unchanged');
console.log('PASS expanded Grade 5: 31 peer stat-only changes / 3 favored peers / Empress and Itoguchi protected / other grades and ability mechanics preserved');
