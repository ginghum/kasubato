'use strict';
const assert=require('node:assert/strict');
const {World,roster,find,resolve}=require('../engine.js');
assert.equal(roster.length,93);
for(const p of roster){for(const n of p.aliases)if(n)assert.equal(find(n)?.id,p.id);assert.deepEqual(resolve(p.name).stats,resolve(p.realName).stats);}
assert.equal(find(' Ｘ ')?.id,'x');assert.equal(find('エックス')?.id,'x');assert.equal(find('プラスチック'),null);
for(const n of ['自由な参加者','__proto__','constructor','<img src=x onerror=alert(1)>']){const w=new World([n,'プラス'],{seed:1});assert.deepEqual({atk:w.units[0].atk,hp:w.units[0].maxHp,speed:w.units[0].speed},{atk:18,hp:1250,speed:5.5});assert.equal(resolve(n).skill,resolve(n).skill);}
function duel(a,b){const w=new World([a,b],{seed:'mechanics'});w.rng=()=>.99;return [w,...w.units];}
{
 const [w,a,b]=duel('プラス','ヒメ');let hp=b.hp;w.hit(a,b,100,'contact');assert.equal(hp-b.hp,45);hp=b.hp;w.hit(a,b,100,'spell');assert.equal(hp-b.hp,100);w.status(b,'air',1);hp=b.hp;w.hit(a,b,100,'contact');assert.equal(hp,b.hp);
}
{
 const [w,a,b]=duel('イトグチ','グモン');w.status(b,'invulnerable',10);w.hit(a,b,100);assert.equal(b.hp,b.maxHp);w.hit(a,b,100,'erase');assert.equal(b.hp,b.maxHp-100);w.status(b,'seal',2);w.hit(a,b,100);assert.equal(b.hp,b.maxHp-200);
}
{
 const [w,a,b]=duel('プラス','ソイ');w.hit(a,b,99999,'erase');assert.equal(b.alive,true);assert.equal(b.hp,b.maxHp);w.hit(a,b,99999,'erase');assert.equal(b.alive,false);
}
{
 const [w,a,b]=duel('プラス','タナカ');w.hit(a,b,b.maxHp*.5);w.cast(b,b.powers[0]);assert.equal(b.alive,true);assert.equal(b.hp,b.maxHp);w.hit(a,b,99999);assert.equal(b.alive,false);
}
{
 const [w,a,b]=duel('エンプレス','コンケ');w.hit(a,b,99999,'erase');assert(a.powers.some(p=>p.id==='konke'));const count=a.powers.length;const c=w.make('コンケ2','konke',{atk:26,hp:1,speed:5},false);w.units.push(c);w.hit(a,c,99999,'erase');assert.equal(a.powers.length,count);const copied=a.powers.find(p=>p.id==='konke').scale;c.baseAtk=1000;assert.equal(a.powers.find(p=>p.id==='konke').scale,copied);
}
{
 const [w,a,b]=duel('オーガ','プラス');w.cast(a,a.powers[0]);assert(!w.has(b,'boost'));assert(!w.has(a,'boost'));const m=w.make('仲間','basic',{atk:10,hp:100,speed:1},true,a.team);m.x=a.x;m.y=a.y;w.units.push(m);w.time=4;w.cast(a,a.powers[0]);assert(w.has(m,'boost'));
}
{
 const [w,a,b]=duel('デビル','ベル');const m=w.make('機械','basic',{atk:10,hp:100,speed:1},true,b.team);m.kind='machine';m.x=a.x;m.y=a.y;w.units.push(m);w.cast(a,a.powers[0]);assert.equal(m.team,a.team);w.die(b);assert(m.alive);w.die(a);assert(!m.alive);
}
{
 const [w,a,b]=duel('ユージ','ドーマ');a.x=400;a.y=400;b.x=420;b.y=400;w.shot(b,a,100);w.updateShots(1/60);assert.equal(w.shots[0].owner,a);assert.equal(a.hp,a.maxHp);
}
{
 const [w,a,b]=duel('チック','プラス');w.time=8;a.history=[{time:5,x:300,y:300,hp:a.maxHp}];a.hp=100;w.cast(a,a.powers[0]);assert.equal(a.hp,a.maxHp);assert.equal(a.x,300);
}
{
 const [w,a,b]=duel('モルペウス','プラス');a.x=400;a.y=400;b.x=410;b.y=400;w.cast(a,a.powers[0]);assert(!w.has(b,'sleep'));w.status(b,'sleep',1);w.cast(a,a.powers[0]);assert(b.status.sleep>=w.time+2.5);
}
{
 const [w,a,b]=duel('ミュー','プラス');w.cast(a,a.powers[0]);assert(w.units.some(f=>f.minion&&f.kind==='diamond'&&f.team===a.team));
}
{
 const [w,a,b]=duel('プラス','タナカ');b.hp=b.maxHp*.5;w.cast(b,b.powers[0]);assert.equal(b.hp,b.maxHp);w.hit(a,b,99999);assert.equal(b.alive,false,'回復後でもHP0なら脱落');
}

{
 const five=new World(roster.slice(0,5).map(p=>p.name),{seed:'small-mode'}),six=new World(roster.slice(0,6).map(p=>p.name),{seed:'small-mode'});
 assert(five.smallMode);assert(!six.smallMode);assert(five.radius<six.radius);
 for(const f of five.units)assert(Math.hypot(f.x-400,f.y-400)+f.radius<five.radius,'少人数の初期配置が会場内');
 six.die(six.units[0]);six.step();assert(!six.smallMode,'途中で5人になっても開始モードを維持');
}
{
 for(const suddenDeath of [true,false]){
  const w=new World(['プラス','ヒヨコ'],{seed:'sudden-switch',suddenDeath});for(const f of w.units){f.powers=[];f.speed=0;}
  w.contact=()=>{};const before=w.units.map(f=>f.atk);w.time=49.99;w.step();assert.equal(w.sudden,suddenDeath);assert.deepEqual(w.units.map(f=>f.atk),before.map(a=>a*(suddenDeath?10:1)));
  w.step();assert.deepEqual(w.units.map(f=>f.atk),before.map(a=>a*(suddenDeath?10:1)),'強化は1回だけ');
  if(!suddenDeath){w.time=179.99;w.step();assert(w.finished);assert(w.result.timeout);assert(!w.sudden);}
 }
}

const summaries=[];
for(let i=0;i<roster.length;i+=20){const ns=roster.slice(i,i+20).map(p=>p.name);const w=new World(ns,{seed:'coverage:'+i});while(!w.finished){w.step();for(const f of w.units)assert([f.hp,f.x,f.y,f.atk].every(Number.isFinite));assert(w.effects.length<=220);assert(w.zones.length<=150);}assert(!w.result.timeout);assert.equal(w.effects.length,0);assert.equal(w.shots.length,0);summaries.push({players:ns.length,seconds:Math.round(w.time),winner:w.result.winner?.name});}
const ns=roster.slice(0,60).map(p=>p.name);function simulate(seed){const w=new World(ns,{seed});while(!w.finished)w.step();return [w.result.winner?.name,w.tickCount,w.result.ranking.map(f=>[f.name,f.kills,Math.round(f.damage)])];}assert.deepEqual(simulate('repro'),simulate('repro'));
console.log('PASS: 93キャラ・全別名・固有能力・60人試合・シード再現・エフェクト上限');console.log(JSON.stringify(summaries,null,2));
