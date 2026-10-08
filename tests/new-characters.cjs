'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),{World,roster,profiles,find}=require('../engine.js');
const sources=require('../new-character-sources.json').profiles;
assert.equal(sources.length,15);
for(const source of sources){const p=find(source.name);assert.equal(p.id,source.id);assert.equal(find(source.realName).id,p.id);assert.equal(p.realName,source.realName);const facts=Object.fromEntries(source.facts.map(f=>[f.label,f.value]));assert.equal(p.grade,source.kicker.match(/GRADE (\d)/)[1]);assert.equal(p.sourceAbility,facts['能力']);}
assert.equal(find('メノウ').grade,'4');assert.equal(find('メノウ＋').grade,'5');assert.equal(find('蛍火瑪瑙＋').id,'menou_final');
function setup(names){const w=new World(names,{seed:'new-mechanics',suddenDeath:false});w.rng=()=>.99;w.units.forEach((f,i)=>{f.x=400+i*20;f.y=400;});return [w,...w.units];}
for(const p of sources){const [w,a,b]=setup([p.name,'ユージ']);const before=JSON.stringify([a.status,a.shield,b.hp,b.dots,w.shots,w.zones,w.units.length]);w.cast(a,a.powers[0]);assert.notEqual(JSON.stringify([a.status,a.shield,b.hp,b.dots,w.shots,w.zones,w.units.length]),before,p.name+' has an implemented ability');}
for(const name of ['メノウ','メノウ+']){const [w,a,b,c]=setup([name,'ユージ','ランス']);const oldTeams=w.units.map(f=>f.team);w.cast(a,a.powers[0]);assert(w.controlled(b));assert.equal(w.controlled(c),name.endsWith('+'));assert.deepEqual(w.units.map(f=>f.team),oldTeams);const hp=c.hp;w.command(b);assert(c.hp<hp,'controlled attack hits another enemy');assert(a.damage>0);w.status(a,'seal',1);assert(!w.controlled(b));w.time=1.1;assert(w.controlled(b));w.time=4;assert(!w.controlled(b));}
{const [w,a,b]=setup(['メノウ','ユージ']);w.cast(a,a.powers[0]);w.step();assert(!w.finished,'temporary control must not cause team victory');w.die(a,b);assert(!w.controlled(b));}
{const [w,a,b]=setup(['ナイン','タイタン']);w.rng=()=>0;w.status(a,'blind',5);w.status(b,'hidden',5);b.shield=100;assert.equal(w.hit(a,b,150),50);w.status(b,'invulnerable',5);assert.equal(w.hit(a,b,150),0);w.status(a,'seal',5);delete b.status.invulnerable;assert.equal(w.hit(a,b,150),0);}
{const [w,a,b]=setup(['ダークネス','ユージ']);w.cast(a,a.powers[0]);assert(w.units.some(f=>f.kind==='life'&&f.summonerId===a.id));w.hit(b,a,99999,'erase');assert(a.alive&&a.revived);assert.equal(a.hp,a.maxHp*.4);w.hit(b,a,99999,'erase');assert(!a.alive);assert(!w.units.some(f=>f.minion&&f.alive));}
{const [w,a,b]=setup(['ダークネス','ユージ']);w.status(a,'seal',5);w.hit(b,a,99999,'erase');assert(!a.alive);}
{const [w,a,b]=setup(['ルカ','ユージ']);a.hp-=200;b.shield=50;const hp=a.hp;assert.equal(w.hit(a,b,150),100);assert.equal(a.hp,hp+12);}
// Exact original JPEGs; paths cover all roster faces and variants inherit their base.
const icons=require('../icons.js');assert.equal(Object.keys(icons.characters).length,108);for(const p of profiles){const face=icons.characters[p.baseId||p.id];assert(face?.clip);if(face.sheet){const meta=icons.sheets[face.sheet],[x,y,width,height]=face.rect;assert(x>=0&&y>=0&&x+width<=meta.width&&y+height<=meta.height);assert(fs.existsSync(meta.src));}}
for(let i=0;i<3;i++){const names=sources.map(p=>p.name).concat('メノウ+','プラス+');const w=new World(names,{seed:'new-trial-'+i});while(!w.finished)w.step();assert(w.time<=180.1);assert(w.units.every(f=>Number.isFinite(f.hp)&&Number.isFinite(f.x)&&Number.isFinite(f.y)));}
console.log('PASS new 15 characters: official metadata / aliases / abilities / control recovery and original teams / Nine accuracy / Darkness revive / Luka healing / face atlas / complete matches');
