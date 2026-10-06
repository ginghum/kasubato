'use strict';
const assert=require('node:assert/strict'),{World,profiles,resolve}=require('../engine.js');
const family=id=>{const p=profiles.find(p=>p.id===id);return p.baseId||p.id;};
const names=['エンプレス・メイジ',' Ｘ ','ヒカル＋','プラス・ゼロ','ウサギ・カポネ+'];
for(let seed=0;seed<40;seed++){
 const w=new World(names,{seed:'start:'+seed}),f=w.units[0],extras=f.powers.slice(1);
 assert.equal(f.powers.length,4);assert.equal(f.powers[0].id,'empress');assert.equal(new Set(extras.map(p=>family(p.id))).size,3);
 assert(extras.every(p=>p.id!=='empress'&&!['x','hikaru','plus','hattan'].includes(family(p.id))&&p.scale===.65));
 assert.deepEqual(new World(names,{seed:'start:'+seed}).units[0].powers,f.powers);
 assert(w.events.some(e=>e.time===0&&extras.every(p=>e.text.includes(profiles.find(q=>q.id===p.id).name))));
}
const builds=new Set(Array.from({length:30},(_,seed)=>JSON.stringify(new World(['エンプレス','プラス'],{seed}).units[0].powers)));assert(builds.size>20,'different seeds generate different random builds');
const sixty=['エンプレス',...profiles.filter(p=>!p.finalMode&&p.id!=='empress').slice(0,59).map(p=>p.name)];const big=new World(sixty,{seed:'sixty'}),present=new Set(sixty.map(n=>family(resolve(n).profile.id)));assert.equal(big.units[0].powers.length,4);assert(big.units[0].powers.slice(1).every(p=>!present.has(family(p.id))));
const overridden=new World(['プラス','ヒカル+','ユージ'],{seed:'override',overrides:{'プラス':{skill:'empress'},'ヒカル+':{skill:'empress'}}});for(const f of overridden.units.slice(0,2)){assert.equal(f.powers.length,4);assert(f.powers.slice(1).every(p=>!['plus','hikaru','yuji','empress'].includes(family(p.id))));}
assert.deepEqual(overridden.units[0].powers,overridden.units[1].powers,'a common capture skill uses the same starting build');assert.notEqual(overridden.units[0].powers[1],overridden.units[1].powers[1],'each bearer owns separate copy objects');
const w=new World(['エンプレス','ユージ'],{seed:'capture'}),[f,t]=w.units;assert(!f.powers.some(p=>p.id==='yuji'));f.hp=f.maxHp*.5;w.die(t,f);assert(f.powers.some(p=>p.id==='yuji'));assert.equal(f.powers.length,5);assert(Math.abs(f.hp-f.maxHp*.62)<1e-8);const copy=f.powers.find(p=>p.id==='yuji'),scale=copy.scale;t.baseAtk=999;assert.equal(copy.scale,scale);
const repeated=w.make('ユージ2','yuji',{atk:12,hp:10,speed:1},false);w.units.push(repeated);w.die(repeated,f);assert.equal(f.powers.filter(p=>p.id==='yuji').length,1);
const all=new World(profiles.map(p=>p.name),{seed:'exhausted'});assert.deepEqual(all.units.find(f=>f.skill==='empress').powers,[{id:'empress',scale:1}],'outside UI limits, an exhausted pool never borrows from participants');
console.log('PASS Empress start: capture + three unique absent characters / aliases and final families / 60 players / edited skills / seeds / log / continued capture and fixed copies');
