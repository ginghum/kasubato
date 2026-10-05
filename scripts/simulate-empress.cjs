'use strict';
const {World,roster}=require('../engine.js');
const count=Number(process.argv[2]||1000),seedPrefix=process.argv[3]||'empress-confirm-v1',hp=Number(process.argv[4]||roster.find(p=>p.id==='empress').stats.hp);
if(!Number.isInteger(count)||count<1||!Number.isFinite(hp)||hp<=0)throw new Error('count and HP must be positive');
const names=roster.filter(p=>p.grade==='5').map(p=>p.name),wins=Object.fromEntries(names.map(name=>[name,0]));let draws=0,timeouts=0,totalTime=0;
for(let i=0;i<count;i++){
 const world=new World(names,{seed:seedPrefix+':'+i,suddenDeath:true,overrides:{'エンプレス':{hp}}});
 while(!world.finished)world.step(1/60);
 if(world.result.winner)wins[world.result.winner.name]++;else if(world.result.timeout)timeouts++;else draws++;
 totalTime+=world.time;
 if((i+1)%250===0)console.error('completed',i+1);
}
const rate=wins['エンプレス']/count,z=1.96,den=1+z*z/count,center=(rate+z*z/(2*count))/den,half=z*Math.sqrt(rate*(1-rate)/count+z*z/(4*count*count))/den;
console.log(JSON.stringify({count,hp,seedPrefix,suddenDeath:true,dt:1/60,names,wins,draws,timeouts,meanSeconds:totalTime/count,empressWinRate:rate,wilson95:[center-half,center+half]},null,2));
