'use strict';
const assert=require('node:assert/strict'),{World,roster,finalModes,profiles,find,resolve}=require('../engine.js');
assert.equal(roster.length,93);assert.equal(finalModes.length,3);assert.equal(profiles.length,96);
for(const p of finalModes){
 const base=roster.find(b=>b.id===p.baseId);assert.equal(p.grade,'5');assert.equal(p.name,base.name+'+');assert(p.stats.atk>base.stats.atk&&p.stats.hp>base.stats.hp&&p.stats.speed>base.stats.speed);
 for(const alias of base.aliases){assert.equal(find(alias+'+').id,p.id);assert.equal(find(alias+'＋').id,p.id);assert.equal(find(alias).id,base.id);}
 assert.equal(find(' '+base.name+' ＋ ').id,p.id);assert.equal(resolve(p.name).skill,p.id);assert(!find(base.name+'++'));assert(!find('ユージ+'));
 const w=new World([base.name,p.name],{seed:'form-coexist'});assert.equal(w.units[0].skill,base.id);assert.equal(w.units[1].skill,p.id);assert.notEqual(w.units[0].team,w.units[1].team);
}
function setup(name){const w=new World([name,'プラス'],{seed:'final-mechanics'});w.rng=()=>.99;const [a,b]=w.units;a.x=400;a.y=400;b.x=420;b.y=400;return [w,a,b];}
{
 const [w,a,b]=setup('プラス+');w.cast(a,a.powers[0]);assert(w.has(a,'strong'));assert(w.has(a,'guard'));assert(b.hp<b.maxHp);assert.equal(a.form,1);w.time=2.4;w.cast(a,a.powers[0]);assert(w.has(a,'dash'));assert.equal(a.form,0);
}
{
 const [w,a,b]=setup('ヒカル+');b.shield=1000;w.cast(a,a.powers[0]);assert.equal(b.shield,150);assert.equal(w.shots.length,4);assert(w.shots.every(s=>s.pierce&&s.damage===a.atk*2));
}
{
 const [w,a,b]=setup('コバル+');w.cast(a,a.powers[0]);assert(w.has(a,'thinking'));assert(w.has(a,'guard'));assert(!a.ready);w.time=1;w.cast(a,a.powers[0]);assert(a.ready);const hp=b.hp;w.contact(a,b);assert(Math.abs((hp-b.hp)-a.atk*(.85+.99*.3)*8)<1e-6);assert(!a.ready);
}
{
 const w=new World(['エンプレス','ヒカル+'],{seed:'final-copy'});w.rng=()=>.99;const [a,b]=w.units;w.hit(a,b,99999,'erase');assert(a.powers.some(p=>p.id==='hikaru_final'));const target=w.make('敵','basic',{atk:10,hp:1000,speed:1},false);target.x=a.x+10;target.y=a.y;w.units.push(target);w.cast(a,a.powers.find(p=>p.id==='hikaru_final'));assert(w.shots.some(s=>s.pierce));
}
console.log('PASS final modes: aliases / separate originals / Grade 5 stats / mass shockwave / piercing blades / charged hit / copied ability');
