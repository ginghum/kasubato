'use strict';
const assert=require('node:assert/strict'),{World,profiles,overflows}=require('../engine.js');
const ids=['x','ashara','mu','ojo','titan','tsukichiyo','beret','minus','plus_final','gumon','judge','serena','hattan_final'];assert.deepEqual(Object.keys(overflows).sort(),[...ids].sort());assert.equal(new Set(Object.values(overflows).map(s=>s.title)).size,13);
function duel(id){const p=profiles.find(p=>p.id===id),w=new World([p.name,'プラス'],{seed:'overflow:'+id});w.rng=()=>.99;const [f,t]=w.units;f.x=380;f.y=400;t.x=410;t.y=400;f.hp=f.maxHp*.2;return [w,f,t];}
for(const id of ids){const [w,f]=duel(id);assert(w.tryOverflow(f),id);assert(f.overflowUsed);assert.equal(f.overflowAt,0);assert(w.events.some(e=>e.text.includes(overflows[id].title)));f.hp=f.maxHp*.1;w.time=10;assert(!w.tryOverflow(f));assert.equal(w.events.filter(e=>e.text.includes('オーバーフロー：')).length,1);assert(!new World([f.name,'プラス']).units[0].overflowUsed);}
{
 const w=new World(['X','プラス','ユージ','ランス','コンケ','ヒカル'],{seed:'six-boundary'}),f=w.units[0];f.hp=f.maxHp*.2;assert(!w.tryOverflow(f));w.die(w.units[5]);assert(w.tryOverflow(f),'6 to 5 surviving main bodies');
}
{
 const [w,f]=duel('gumon');f.hp=f.maxHp*(.2+.00001);assert(!w.tryOverflow(f));f.hp=f.maxHp*.2;w.status(f,'seal',1);assert(!w.tryOverflow(f));assert(!f.overflowUsed);w.time=1;assert(w.tryOverflow(f));
}
{
 const [w,f]=duel('gumon');for(let i=0;i<10;i++)w.units.push(w.make('分身'+i,'x',{atk:10,hp:100,speed:1},true,f.team));assert(w.tryOverflow(f));const m=w.units[2];m.hp=10;assert(!w.tryOverflow(m));w.die(f);assert(!w.tryOverflow(f));
}
{
 const [w,f,t]=duel('gumon');f.hp=f.maxHp*.25;w.hit(t,f,f.maxHp*.1);assert(f.overflowUsed,'damage crossing 20% activates immediately');assert(w.has(f,'invulnerable'));assert.equal(w.hit(t,f,100),0);w.time=6.01;assert(w.hit(t,f,1)>0);assert(f.overflowUsed);
 const [fatal,v,a]=duel('gumon');v.hp=v.maxHp*.3;fatal.hit(a,v,99999,'erase');assert(!v.alive);assert(!v.overflowUsed,'lethal hit does not revive a dead unit');
}
{
 const [w,f,t]=duel('x');const hp=t.hp;w.tryOverflow(f);assert(w.has(t,'stun'));assert(t.hp<hp);assert.equal(t.dots[0].type,'spell');assert.equal(t.dots[0].until,4);
}
{
 const [w,f]=duel('ashara');w.tryOverflow(f);assert.equal(w.shots.length,3);assert(w.shots.every(s=>s.homing&&s.targetId===w.units[1].id&&s.chain===1&&s.stun===.4));
}
{
 const [w,f]=duel('mu');w.tryOverflow(f);assert.equal(f.shield,f.maxHp*.45);assert.equal(w.units.filter(u=>u.minion&&u.kind==='diamond').length,3);assert.equal(w.shots.length,6);assert(w.shots.every(s=>s.pierce));
}
{
 const [w,f]=duel('ojo');w.tryOverflow(f);assert.equal(w.shots.length,5);assert(w.shots.every(s=>s.homing&&s.blast===135));
}
for(const id of ['titan','beret']){const [w,f,t]=duel(id);w.tryOverflow(f);w.rng=()=>.64;assert.equal(w.hit(t,f,50),0,'ultimate evasion');const hp=t.hp;w.contact(f,t);assert(Math.abs(hp-t.hp-f.atk*(.85+.64*.3)*2.5)<1e-6,'guaranteed critical');}
{
 const [w,f,t]=duel('tsukichiyo');w.tryOverflow(f);assert(w.has(f,'hidden'));assert.equal(t.status.blind,6);assert.equal(t.status.stun,.8);assert(t.hp<t.maxHp);
}
{
 const [w,f,t]=duel('minus');const x=t.x;w.tryOverflow(f);assert.equal(t.status.heavy,5);assert(t.x<x);assert(w.has(f,'dash'));assert(w.has(f,'guard'));
 const [a,p,e]=duel('plus_final');const old=e.x;a.tryOverflow(p);assert.equal(p.shield,p.maxHp*.4);assert(a.has(p,'strong')&&a.has(p,'guard')&&a.has(p,'dash'));assert(e.x>old);
}
{
 const [w,f,t]=duel('judge');t.shield=1000;const hp=t.hp;w.tryOverflow(f);assert(Math.abs(f.hp-f.maxHp*.65)<1e-6);assert.equal(f.shield,f.maxHp*.3);assert.equal(t.shield,0);assert(t.hp<hp);
}
{
 const [w,f,t]=duel('serena');w.status(f,'stun',5);w.status(f,'sleep',5);f.dots=[{owner:t,until:5,next:1,damage:1,type:'poison'}];w.tryOverflow(f);assert.equal(f.hp,f.maxHp);assert.equal(f.dots.length,0);assert(!w.has(f,'stun')&&!w.has(f,'sleep'));f.hp-=400;w.hit(f,t,200);assert.equal(f.hp,f.maxHp-300);w.time=6.01;w.hit(f,t,100);assert.equal(f.hp,f.maxHp-300,'lifesteal expires');
}
{
 const [w,f]=duel('hattan_final');for(let i=0;i<4;i++){w.cast(f,f.powers[0]);w.time+=3.5;}const originals=w.units.filter(u=>u.minion);assert.equal(originals.length,4);for(const m of originals)m.hp=1;w.tryOverflow(f);const clones=w.units.filter(u=>u.alive&&u.minion);assert.equal(clones.length,8);assert(clones.every(c=>c.hp===f.maxHp*.42&&c.atk===f.atk*.9&&c.expires===w.time+14));assert(originals.every(c=>c.hp>1));assert(w.has(f,'hidden'));w.die(f);assert(clones.every(c=>!c.alive));
}
{
 const [w,f]=duel('gumon');f.x=300;w.units[1].x=450;for(const u of w.units){u.powers=[];u.speed=0;}w.step();assert(f.overflowUsed,'normal frame loop activates it');
 const [a,p]=duel('plus_final');p.skill='hikaru_final';assert(!a.tryOverflow(p),'selected ability governs its ultimate');
 const emp=new World(['エンプレス','X']);emp.units[0].powers.push({id:'x',scale:1});emp.units[0].hp=1;assert(!emp.tryOverflow(emp.units[0]),'absorbed powers do not add extra personal ultimates');
}
console.log('PASS overflow: all 13 effects / 6-to-5 and 20% boundaries / immediate damage trigger / one use / seal / lethal hits / minions / reset / timer expiry / ability overrides');
