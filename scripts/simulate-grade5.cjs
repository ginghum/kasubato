'use strict';
const fs=require('node:fs'),path=require('node:path'),{Worker,isMainThread,parentPort,workerData}=require('node:worker_threads');
const ids=['x','ashara','tanaka','titan','judge','serena','beret','mu','tsukichiyo','clarine','yaoi','ojo','mikael','kagachi','devil','gumon','minus','paster','dancho'];
if(!isMainThread){
 const engine=require(workerData.engine),{World,roster,random}=engine;const selected=roster.filter(p=>ids.includes(p.id)),others=roster.filter(p=>!ids.includes(p.id)&&!['empress','itoguchi'].includes(p.id));
 const stats=Object.fromEntries(ids.map(id=>[id,{games:0,wins:0,rankSum:0,damage:0}]));let draws=0,timeouts=0,totalTime=0;
 const shuffle=(xs,rng)=>{const a=[...xs];for(let i=a.length-1;i>0;i--){const j=Math.floor(rng()*(i+1));[a[i],a[j]]=[a[j],a[i]];}return a;};
 for(let i=workerData.from;i<workerData.to;i++){
  const seed=workerData.prefix+':'+i,rng=random(seed+':lineup');let lineup;
  if(workerData.mode==='mixed')lineup=shuffle([...selected,...others],rng).slice(0,20);
  else if(workerData.mode==='subset')lineup=shuffle(selected,rng).slice(0,10);
  else lineup=shuffle(selected,rng);
  const w=new World(lineup.map(p=>p.name),{seed,overrides:workerData.overrides});w.effect=()=>{};w.event=()=>{};
  while(!w.finished)w.step();totalTime+=w.time;draws+=Number(w.result.draw);timeouts+=Number(w.result.timeout);
  for(const [rank,f] of w.result.ranking.entries()){if(!stats[f.skill])continue;const s=stats[f.skill];s.games++;s.wins+=Number(w.result.winner?.id===f.id);s.rankSum+=rank+1;s.damage+=f.damage;}
 }
 parentPort.postMessage({stats,draws,timeouts,totalTime});
}else{
 const args=process.argv.slice(2),get=(s,f)=>{const i=args.indexOf(s);return i<0?f:args[i+1];};const n=Number(get('--matches','400')),mode=get('--mode','group'),prefix=get('--prefix','grade5-calibrate'),engine=path.resolve(get('--engine',path.join(__dirname,'../engine.js'))),out=get('--out','');const lanes=Number(get('--workers','4'));const start=Date.now(), overridePath=get('--overrides',''),overrides=overridePath?JSON.parse(fs.readFileSync(overridePath,'utf8')):null;
 Promise.all(Array.from({length:lanes},(_,i)=>new Promise((resolve,reject)=>{const w=new Worker(__filename,{workerData:{engine,mode,prefix,overrides,from:Math.floor(i*n/lanes),to:Math.floor((i+1)*n/lanes)}});w.once('message',resolve);w.once('error',reject);}))).then(rs=>{
  const stats=Object.fromEntries(ids.map(id=>[id,{games:0,wins:0,rankSum:0,damage:0}]));for(const r of rs)for(const id of ids)for(const k of Object.keys(stats[id]))stats[id][k]+=r.stats[id][k];const roster=require(engine).roster;
  const summary={mode,matches:n,prefix,overrides,draws:rs.reduce((s,r)=>s+r.draws,0),timeouts:rs.reduce((s,r)=>s+r.timeouts,0),meanSeconds:rs.reduce((s,r)=>s+r.totalTime,0)/n,runtimeSeconds:(Date.now()-start)/1000,characters:ids.map(id=>{const s=stats[id];return {id,name:roster.find(p=>p.id===id).name,stats:{...roster.find(p=>p.id===id).stats},...s,winRate:s.wins/s.games,meanRank:s.rankSum/s.games};})};if(out)fs.writeFileSync(out,JSON.stringify(summary,null,2)+'\n');console.log(JSON.stringify({mode,n,runtime:summary.runtimeSeconds,timeouts:summary.timeouts,rates:summary.characters.map(p=>`${p.name} ${(100*p.winRate).toFixed(1)}% (${p.wins}/${p.games}) rank${p.meanRank.toFixed(1)}`)},null,2));
 }).catch(e=>{console.error(e);process.exitCode=1;});
}
