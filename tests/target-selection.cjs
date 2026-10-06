'use strict';
const assert=require('node:assert/strict'),{World,profiles,random}=require('../engine.js');
// Compare the nearest-pass implementation with the original stable sort, including ties and hidden foes.
const rng=random('target-selection-validation');
function reference(w,f){const reveal=['hoozuki','tsukichiyo','wan'].some(id=>w.power(f,id));return w.foes(f).filter(e=>!w.has(e,'hidden')||reveal||Math.hypot(e.x-f.x,e.y-f.y)<55).sort((a,b)=>Math.hypot(a.x-f.x,a.y-f.y)-Math.hypot(b.x-f.x,b.y-f.y))[0];}
for(let seed=0;seed<20;seed++){
 const w=new World(profiles.slice(0,60).map(p=>p.name),{seed});
 for(const u of w.units){u.x=Math.floor(rng()*8)*25;u.y=Math.floor(rng()*8)*25;u.alive=rng()>.2;if(rng()<.4)w.status(u,'hidden',10);if(rng()<.2)w.status(u,'seal',10);}
 for(const u of w.units)assert.equal(w.target(u),reference(w,u));
}
const w=new World(['プラス','ユージ','ランス']);const [a,b,c]=w.units;a.x=a.y=0;b.x=c.x=100;b.y=c.y=0;assert.equal(w.target(a),b,'equal distances preserve unit order');b.alive=c.alive=false;assert.equal(w.target(a),undefined);
const visible=new World(['プラス','ユージ'],{seed:'headless'}),headless=new World(['プラス','ユージ'],{seed:'headless'});headless.effect=()=>{};headless.event=()=>{};while(!visible.finished){visible.step();headless.step();}assert.deepEqual(headless.result,visible.result);assert.deepEqual(headless.units,visible.units);assert.equal(headless.rng(),visible.rng(),'presentation suppression preserves RNG');
console.log('PASS targeting: original stable-sort equivalence / hidden / seal / ties / dead / headless gameplay');
