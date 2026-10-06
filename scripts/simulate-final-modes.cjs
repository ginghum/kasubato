'use strict';
const {World,roster,finalModes,random}=require('../engine.js');
const count=Number(process.argv[2]||500),mode=process.argv[3]||'five',prefix=process.argv[4]||'final-modes-v1';
if(!Number.isInteger(count)||count<1||!['five','all','duel'].includes(mode))throw Error('positive count / five, all or duel');
if(mode==='duel'){
 const rows=finalModes.map(p=>{const base=roster.find(b=>b.id===p.baseId);let wins=0,draws=0,timeouts=0;for(let i=0;i<count;i++){const names=i%2?[p.name,base.name]:[base.name,p.name];const w=new World(names,{seed:prefix+':'+p.id+':'+i});while(!w.finished)w.step();if(w.result.winner?.name===p.name)wins++;else if(w.result.draw)draws++;else if(w.result.timeout)timeouts++;}return {name:p.name,opponent:base.name,played:count,wins,winRate:wins/count,draws,timeouts};});
 console.log(JSON.stringify({count,mode,prefix,suddenDeath:true,rows},null,2));process.exit(0);
}
const pool=[...roster.filter(p=>p.grade==='5'&&!['empress','itoguchi'].includes(p.id)),...finalModes];
const rows=Object.fromEntries(pool.map(p=>[p.name,{played:0,wins:0}]));let draws=0,timeouts=0;
for(let i=0;i<count;i++){
 const rng=random(prefix+':lineup:'+i),list=[...pool];for(let j=list.length-1;j>0;j--){const k=Math.floor(rng()*(j+1));[list[j],list[k]]=[list[k],list[j]];}
 const names=(mode==='five'?list.slice(0,5):list).map(p=>p.name);for(const n of names)rows[n].played++;
 const w=new World(names,{seed:prefix+':battle:'+i});while(!w.finished)w.step();
 if(w.result.winner)rows[w.result.winner.name].wins++;else if(w.result.timeout)timeouts++;else draws++;
}
for(const row of Object.values(rows))row.winRate=row.wins/row.played;
console.log(JSON.stringify({count,mode,prefix,suddenDeath:true,pool:pool.map(p=>p.id),stats:finalModes.map(p=>({name:p.name,...p.stats})),rows,draws,timeouts},null,2));
