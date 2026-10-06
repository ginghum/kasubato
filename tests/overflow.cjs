'use strict';
const assert=require('node:assert/strict'),api=require('../engine.js'),{World,profiles}=api;
assert.equal(api.overflows,undefined);assert.equal(World.prototype.tryOverflow,undefined);
for(const id of ['x','ashara','mu','ojo','titan','tsukichiyo','beret','minus','plus_final','gumon','judge','serena','hattan_final']){
 const p=profiles.find(p=>p.id===id),w=new World([p.name,'プラス'],{seed:'no-overflow:'+id});w.rng=()=>.99;const [f,t]=w.units;
 for(const u of w.units){u.powers=[];u.speed=0;}f.x=300;t.x=450;f.y=t.y=400;f.hp=f.maxHp*.2;
 w.step();assert.equal(f.hp,f.maxHp*.2);assert(!Object.hasOwn(f,'overflowUsed'));assert(!Object.hasOwn(f,'overflowAt'));assert(!w.events.some(e=>e.text.includes('オーバーフロー')));assert.equal(w.units.length,2);assert.equal(w.shots.length,0);
 w.hit(t,f,f.maxHp*.01);assert(Math.abs(f.hp-f.maxHp*.19)<1e-6,'damage below 20% does not trigger an ultimate');
}
const f=profiles.find(p=>p.id==='hattan_final');assert.equal(f.grade,'5');const w=new World([f.name,'プラス']);for(let i=0;i<5;i++){w.cast(w.units[0],w.units[0].powers[0]);w.time+=3.5;}assert.equal(w.units.filter(u=>u.minion).length,4,'Hattan final retains its normal four clones');
console.log('PASS removed overflow: no activation below 20% / no API or state / no ultimate effects / Hattan+ preserved');
