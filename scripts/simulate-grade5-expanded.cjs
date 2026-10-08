'use strict';
// Both full Grade 5 cohorts, fixed 60 Hz gameplay, shuffled participants and reproducible seeds.
const fs=require('node:fs'),path=require('node:path'),{Worker,isMainThread,workerData,parentPort}=require('node:worker_threads');
const {World,profiles,random}=require('../engine.js');
const pool=profiles.filter(p=>p.grade==='5'&&!['empress','itoguchi'].includes(p.id));
if(!isMainThread){
 const {overrides,count,prefix,elite,start,end,order}=workerData;
 // Presentation hooks do not change combat, cooldowns, state or RNG.
 World.prototype.effect=function(){};World.prototype.event=function(){};
 const lineup=elite==='royal'?[...pool,profiles.find(p=>p.id==='itoguchi'),profiles.find(p=>p.id==='empress')]:elite?[...pool,profiles.find(p=>p.id==='itoguchi')]:pool;
 const wins=Object.fromEntries(lineup.map(p=>[p.name,0]));let draws=0,timeouts=0;
 for(let i=start;i<end;i++){
  const rng=random(prefix+':'+elite+':lineup:'+i),list=[...lineup];
  for(let j=order==='catalog'?0:list.length-1;j>0;j--){const k=Math.floor(rng()*(j+1));[list[j],list[k]]=[list[k],list[j]];}
  const w=new World(list.map(p=>p.name),{seed:prefix+':'+elite+':battle:'+i,overrides});while(!w.finished)w.step();
  if(w.result.winner)wins[w.result.winner.name]++;else if(w.result.timeout)timeouts++;else draws++;
  if((i-start+1)%25===0)parentPort.postMessage({progress:25});
 }
 parentPort.postMessage({elite,count,wins,draws,timeouts});
}else{
 const count=Number(process.argv[2]||1000),prefix=process.argv[3]||'grade5-equal-validation-v1',config=process.argv[4],out=process.argv[5],mode=process.argv[6]||'both',order=process.argv[7]||'shuffle';
 if(!Number.isInteger(count)||count<1||!['both','plain','elite','royal'].includes(mode)||!['shuffle','catalog'].includes(order))throw Error('positive count / both, plain, elite or royal');
 const overrides=config&&config!=='-'?JSON.parse(fs.readFileSync(path.resolve(config),'utf8')):{};
 const tasks=[];let done=0,next=250;const modes=mode==='both'?[false,true]:[mode==='royal'?'royal':mode==='elite'];
 for(const elite of modes)for(let k=0;k<4;k++){
  const start=Math.floor(count*k/4),end=Math.floor(count*(k+1)/4);if(start===end)continue;
  tasks.push(new Promise((resolve,reject)=>{const worker=new Worker(__filename,{workerData:{count,prefix,overrides,elite,start,end,order}});
   worker.on('message',m=>{if(m.progress){done+=m.progress;if(done>=next){console.error('Completed '+done+'/'+count*modes.length);next+=250;}}else resolve(m);});worker.on('error',reject);worker.on('exit',code=>{if(code)reject(Error('worker exit '+code));});
  }));
 }
 Promise.all(tasks).then(results=>{
  const cohorts=modes.map(elite=>{const parts=results.filter(r=>r.elite===elite),wins={...parts[0].wins};for(const key of Object.keys(wins))wins[key]=parts.reduce((n,r)=>n+r.wins[key],0);const rows=Object.entries(wins).map(([name,wins])=>({name,played:count,wins,winRate:wins/count})).sort((a,b)=>b.wins-a.wins);
   return {elite,participants:rows.length,count,draws:parts.reduce((n,r)=>n+r.draws,0),timeouts:parts.reduce((n,r)=>n+r.timeouts,0),rows};});
  const result={count,prefix,order,suddenDeath:true,dt:1/60,overrides,cohorts};const json=JSON.stringify(result,null,2);if(out)fs.writeFileSync(path.resolve(out),json+'\n');console.log(json);
 }).catch(e=>{console.error(e);process.exitCode=1;});
}
