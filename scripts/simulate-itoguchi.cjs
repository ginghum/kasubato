'use strict';
// Same 60 Hz step and participant order as the council preset, minus Empress.
const {World,roster}=require('../engine.js');
const names=roster.filter(p=>!['empress','milk'].includes(p.id)&&p.position.split(/[／・]/).some(role=>['生徒会長','生徒会副会長','生徒会役員'].includes(role))).map(p=>p.name);
const count=Number(process.argv[2]||1000),attack=Number(process.argv[3]||roster.find(p=>p.id==='itoguchi').stats.atk),prefix=process.argv[4]||'itoguchi-validation-v1',suddenDeath=process.argv[5]!=='off';
if(!Number.isInteger(count)||count<1||!Number.isFinite(attack)||attack<=0)throw new Error('count and attack must be positive');
const wins=Object.fromEntries(names.map(name=>[name,0]));let draws=0,timeouts=0;
for(let i=0;i<count;i++){
 const world=new World(names,{seed:prefix+':'+i,suddenDeath,overrides:{'イトグチ':{atk:attack}}});
 while(!world.finished)world.step(1/60);
 if(world.result.winner)wins[world.result.winner.name]++;else if(world.result.timeout)timeouts++;else draws++;
}
const rate=wins['イトグチ']/count,z=1.96,den=1+z*z/count,center=(rate+z*z/(2*count))/den,half=z*Math.sqrt(rate*(1-rate)/count+z*z/(4*count*count))/den;
console.log(JSON.stringify({count,attack,seedPrefix:prefix,suddenDeath,dt:1/60,names,wins,draws,timeouts,itoguchiWinRate:rate,wilson95:[center-half,center+half]},null,2));
