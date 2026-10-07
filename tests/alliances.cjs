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
const lastAlly=new World(example,{seed:'last-ally'});lastAlly.die(lastAlly.units[2]);lastAlly.die(lastAlly.units[0]);lastAlly.step();assert(lastAlly.result.teamVictory);assert.equal(lastAlly.result.winners.length,1);assert.deepEqual(lastAlly.result.winningMembers.map(f=>f.name),['イトグチ','プラス+']);assert(!lastAlly.result.winningMembers[1].alive);
const support=new World('(オーガ、ドーマ、ベイン、ダイ)、プラス',{seed:'oga-support',suddenDeath:false});support.rng=()=>.5;const [oga,doma,bane,dead,foe]=support.units;
for(const f of support.units){f.x=400;f.y=400;}doma.x=719;bane.x=720;foe.x=450;support.die(dead);support.summon(bane,'golem',1,.45,.75);support.summon(bane,'machine',1,.4,.5);const golem=support.units.find(f=>f.kind==='golem'),turret=support.units.find(f=>f.kind==='machine');golem.x=450;golem.y=400;turret.x=460;turret.y=400;
support.cast(oga,oga.powers[0]);assert(!support.has(oga,'boost'));assert(support.has(doma,'boost'));assert(!support.has(bane,'boost'),'distance 320 is outside');assert(!support.has(foe,'boost'));assert(!support.has(dead,'boost'));assert(support.has(golem,'boost'));assert(support.has(turret,'boost'));assert.equal(doma.status.boost,4);
support.cast(doma,doma.powers[0]);assert.equal(support.shots[0].damage,doma.atk*4*1.6);let hp=foe.hp;support.contact(doma,foe);assert(Math.abs(hp-foe.hp-doma.atk*1.4)<1e-8);hp=foe.hp;support.contact(golem,foe);assert(Math.abs(hp-foe.hp-golem.atk*1.4)<1e-8);
let turretDamage;const fire=support.shot;support.shot=function(...args){if(args[0]===turret)turretDamage=args[2];return fire.apply(this,args);};support.step();assert(Math.abs(turretDamage-turret.atk*3*1.6)<1e-8);
support.time=2;doma.status.boost=0;support.cast(oga,oga.powers[0]);assert(!support.has(doma,'boost'),'3 second cooldown');support.time=3;support.cast(oga,oga.powers[0]);assert(support.has(doma,'boost'));assert.equal(doma.status.boost,7);support.time=7;assert(!support.has(doma,'boost'),'expires after 4 seconds');
const soloOga=new World('オーガ、プラス',{seed:'solo-oga'});soloOga.cast(soloOga.units[0],soloOga.units[0].powers[0]);assert(soloOga.units.every(f=>!soloOga.has(f,'boost')));
for(let seed=0;seed<8;seed++){const sim=new World(example,{seed});for(let tick=0;!sim.finished&&tick<11000;tick++)sim.step();assert(sim.finished);assert(!sim.result.timeout);}
console.log('PASS alliances: parser / separate teams / aliases and final modes / targeting / all damage types / summons / team victory / actual battles');
