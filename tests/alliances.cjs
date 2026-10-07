'use strict';
const assert=require('node:assert/strict');
const {World,parseEntries,formatEntries}=require('../engine.js');
const example='エンプレス、(イトグチ、プラス+)';
assert.deepEqual(parseEntries(example),[{name:'エンプレス',team:null},{name:'イトグチ',team:'alliance:1'},{name:'プラス+',team:'alliance:1'}]);
assert.equal(formatEntries(parseEntries(example)),example);
assert.deepEqual(parseEntries('エンプレス， （イトグチ\nプラス+）'),parseEntries(example));
assert.equal(parseEntries('A、(B、C)、(D、E)、A').length,5);
const groups=new World('(プラス、ユージ)、(ランス、コンケ)',{seed:'groups'});
assert.equal(groups.units[0].team,groups.units[1].team);assert.notEqual(groups.units[0].team,groups.units[2].team);
const w=new World(example,{seed:'allies'}),[enemy,a,b]=w.units;
assert.equal(a.skill,'itoguchi');assert.equal(b.skill,'plus_final');assert.notEqual(enemy.team,a.team);
assert.equal(w.target(a),enemy);assert(!w.foes(a).includes(b));
for(const type of ['contact','spell','poison','erase']){const hp=b.hp;b.shield=100;assert.equal(w.hit(a,b,9999,type),0);assert.equal(b.hp,hp);assert.equal(b.shield,100);}
w.dot(a,b,4,999);assert.equal(b.dots.length,0);w.contact(a,b);assert.equal(b.hp,b.maxHp);
// Projectiles and area explosions also skip allied people and summons.
a.x=400;a.y=400;b.x=410;b.y=400;enemy.x=490;enemy.y=400;w.shot(a,enemy,100,'*',{pierce:true,blast:150,chain:2});w.updateShots(0);assert.equal(b.hp,b.maxHp);
w.zone(a,b.x,b.y,200,0,'bomb',100);w.updateZones();assert.equal(b.hp,b.maxHp);
w.summon(a,'clone',1,.2,.5);w.summon(b,'clone',1,.2,.5);const minions=w.units.filter(f=>f.minion);assert.equal(minions.length,2);assert.equal(w.hit(minions[0],b,100,'erase'),0);
w.die(a);assert(!minions[0].alive);assert(minions[1].alive);
const victory=new World(example,{seed:'victory'});victory.die(victory.units[0]);victory.step();assert(victory.finished);assert(victory.result.teamVictory);assert.equal(victory.result.timeout,false);assert.equal(victory.result.winners.length,2);
const solo=new World('プラス、ユージ',{seed:'solo'});solo.die(solo.units[0]);solo.step();assert.equal(solo.result.winner.name,'ユージ');assert(!solo.result.teamVictory);
for(let seed=0;seed<8;seed++){const sim=new World(example,{seed});for(let tick=0;!sim.finished&&tick<11000;tick++)sim.step();assert(sim.finished);assert(!sim.result.timeout);}
console.log('PASS alliances: parser / separate teams / aliases and final modes / targeting / all damage types / summons / team victory / actual battles');
