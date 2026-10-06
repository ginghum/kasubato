'use strict';
const assert=require('node:assert/strict'),{World,roster,finalModes,random,overflows}=require('../engine.js');
const count=Number(process.argv[2]||100),mode=process.argv[3]||'five',prefix=process.argv[4]||'overflow-validation-v1';
if(!Number.isInteger(count)||count<1||!['five','all'].includes(mode))throw Error('positive count / five or all');
const pool=[...roster.filter(p=>p.grade==='5'&&p.id!=='empress'),...finalModes],rows=Object.fromEntries(pool.map(p=>[p.name,{played:0,wins:0,activated:0}]));let draws=0,timeouts=0,maxUnits=0,totalSeconds=0;
for(let i=0;i<count;i++){
 const rng=random(prefix+':lineup:'+i),list=[...pool];for(let j=list.length-1;j>0;j--){const k=Math.floor(rng()*(j+1));[list[j],list[k]]=[list[k],list[j]];}
 const names=(mode==='five'?list.slice(0,5):list).map(p=>p.name),w=new World(names,{seed:prefix+':battle:'+i});for(const n of names)rows[n].played++;
 while(!w.finished){w.step();maxUnits=Math.max(maxUnits,w.units.length);assert(w.effects.length<=220&&w.zones.length<=150);for(const f of w.units){assert([f.hp,f.atk,f.x,f.y,f.maxHp].every(Number.isFinite));if(f.minion)assert(!f.overflowUsed);}}
 for(const f of w.units.filter(f=>!f.minion)){if(f.overflowUsed){assert(overflows[f.skill]);rows[f.name].activated++;}assert(w.events.filter(e=>e.text.startsWith(f.name+' オーバーフロー：')).length<=1);}
 if(w.result.winner)rows[w.result.winner.name].wins++;else if(w.result.timeout)timeouts++;else draws++;totalSeconds+=w.time;
 assert.equal(w.effects.length,0);assert.equal(w.shots.length,0);assert.equal(w.zones.length,0);
}
console.log(JSON.stringify({count,mode,prefix,suddenDeath:true,players:pool.length,dt:1/60,rows,draws,timeouts,maxUnits,meanSeconds:totalSeconds/count},null,2));
