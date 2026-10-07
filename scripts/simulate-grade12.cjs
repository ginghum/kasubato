'use strict';
const fs=require('node:fs'),{World,roster,random}=require('../engine.js');
const grade=process.argv[2]||'1',count=Number(process.argv[3]||1000),prefix=process.argv[4]||'grade12-validation-v1',mode=process.argv[5]||'all',statFile=process.argv[6];
if(!['1','2'].includes(grade))throw Error('Grade must be 1 or 2');
if(!Number.isInteger(count)||count<1||!['all','ordered','five'].includes(mode))throw new Error('Use a positive count and mode all, ordered or five');
const pool=roster.filter(p=>p.grade===grade),input=statFile?JSON.parse(fs.readFileSync(statFile,'utf8')):null,stats=Object.fromEntries(pool.map(p=>[p.name,input?.[p.name]||p.stats]));
const rows=Object.fromEntries(pool.map(p=>[p.name,{id:p.id,played:0,wins:0}]));let draws=0,timeouts=0,totalTime=0;
for(let i=0;i<count;i++){
 const rng=random(prefix+':lineup:'+i),list=[...pool];for(let j=mode==='ordered'?0:list.length-1;j>0;j--){const k=Math.floor(rng()*(j+1));[list[j],list[k]]=[list[k],list[j]];}
 const names=(mode==='five'?list.slice(0,5):list).map(p=>p.name);for(const name of names)rows[name].played++;
 const w=new World(names,{seed:prefix+':battle:'+i,suddenDeath:true,overrides:stats});while(!w.finished)w.step(1/60);
 if(w.result.winner)rows[w.result.winner.name].wins++;else if(w.result.timeout)timeouts++;else draws++;totalTime+=w.time;
}
for(const row of Object.values(rows))row.winRate=row.wins/row.played;
console.log(JSON.stringify({grade,count,prefix,mode,suddenDeath:true,dt:1/60,stats,rows,draws,timeouts,meanSeconds:totalTime/count},null,2));
