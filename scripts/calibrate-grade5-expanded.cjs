'use strict';
// Reproducible iterative stat-only calibration; the validation seeds are separate.
const fs=require('fs'),path=require('path'),{spawnSync}=require('child_process'),{profiles}=require('../engine');
const rounds=Number(process.argv[2]||8),count=Number(process.argv[3]||800),start=Number(process.argv[4]||1),config=process.argv[5]||'/tmp/g5-candidate.json';
const folder='balance/grade5-expanded',favored=new Set(['プラス+','マイナス','ダークネス']);if(!fs.existsSync(config))fs.copyFileSync(path.join(folder,'calibration-1-stats.json'),config);let stats=JSON.parse(fs.readFileSync(config,'utf8'));
for(let i=start;i<start+rounds;i++){
 const input=path.join(folder,`calibration-${i}-stats.json`),output=path.join(folder,`calibration-${i}.json`);fs.writeFileSync(input,JSON.stringify(stats,null,2)+'\n');
 const result=spawnSync(process.execPath,['scripts/simulate-grade5-expanded.cjs',String(count),'expanded-calibration-'+i,input,output,'plain'],{stdio:['ignore','ignore','inherit']});if(result.status)process.exit(result.status);
 const cohort=JSON.parse(fs.readFileSync(output,'utf8')).cohorts[0];console.log('Round',i,cohort.rows.map(r=>`${r.name}:${(r.winRate*100).toFixed(1)}`).join(' '));
 for(const r of cohort.rows){const target=favored.has(r.name)?1.5/32.5:1/32.5,observed=(r.wins+1)/(count+31),factor=Math.max(.82,Math.min(1.18,Math.pow(target/observed,.075)));const s=stats[r.name],p=profiles.find(p=>p.name===r.name),base=p.finalMode&&profiles.find(b=>b.id===p.baseId);s.atk=Math.max(base?base.stats.atk+.1:10,Math.round(s.atk*factor*10)/10);s.hp=Math.max(base?base.stats.hp+1:700,Math.round(s.hp*factor));}
 fs.writeFileSync(config,JSON.stringify(stats,null,2)+'\n');
}
