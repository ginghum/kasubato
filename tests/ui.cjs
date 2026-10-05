'use strict';
const assert=require('node:assert/strict'),fs=require('node:fs'),path=require('node:path');
const {JSDOM}=require('jsdom');
const base=path.join(__dirname,'..');const html=fs.readFileSync(path.join(base,'index.html'),'utf8');
const dom=new JSDOM(html,{url:'http://localhost/',runScripts:'outside-only',pretendToBeVisual:true});const w=dom.window,d=w.document;let frames=new Map(),counter=0;
w.HTMLCanvasElement.prototype.getContext=()=>new Proxy({},{get:()=>()=>{},set:()=>true});w.HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','');};w.HTMLDialogElement.prototype.close=function(){this.removeAttribute('open');};w.requestAnimationFrame=fn=>{frames.set(++counter,fn);return counter;};w.cancelAnimationFrame=id=>frames.delete(id);
for(const f of ['data.js','engine.js','app.js'])w.eval(fs.readFileSync(path.join(base,f),'utf8')+(f==='app.js'?'\nwindow.inspect=()=>({world,overrides});':''));
const el=id=>d.getElementById(id),click=id=>el(id).click();const fill=(id,value)=>{el(id).value=value;el(id).dispatchEvent(new w.Event('input'));};
assert.equal(d.querySelectorAll('.participant').length,8);click('random');assert.equal(d.querySelectorAll('.participant').length,20);
click('council');assert(d.querySelectorAll('.participant').length>=13);click('roster-open');assert.equal(d.querySelectorAll('.catalog-card').length,93);fill('search','雷を操る');assert.equal(d.querySelectorAll('.catalog-card').length,1);d.querySelector('[data-close="catalog"]').click();
fill('names','プラス・ゼロ、ユージ、__proto__、<img src=x onerror=alert(1)>');assert.equal(d.querySelectorAll('.participant').length,4);assert(!d.querySelector('[onerror]'));
d.querySelector('[data-name="__proto__"]').click();fill('atk','24');el('edit-form').dispatchEvent(new w.Event('submit',{cancelable:true}));assert.equal(w.inspect().overrides['__proto__'].atk,24);click('reset');assert.equal(Object.keys(w.inspect().overrides).length,0);
fill('names','プラス、ユージ');d.querySelector('[data-name="プラス"]').click();el('skill').value='yuji';el('skill').dispatchEvent(new w.Event('change'));el('edit-form').dispatchEvent(new w.Event('submit',{cancelable:true}));d.querySelector('[data-name="プラス"]').click();assert.equal(el('detail-ability').textContent,'空中の弾き');d.querySelector('[data-close="detail"]').click();click('reset');
fill('names',Array.from({length:61},(_,i)=>'参加者'+i).join(','));assert(el('start').disabled);fill('names',Array.from({length:60},(_,i)=>'参加者'+i).join(','));assert(!el('start').disabled);fill('seed','ui-repeat');el('speed').value='8';click('start');assert.equal(frames.size,1);
function tick(ts){const f=[...frames.values()];frames.clear();for(const fn of f)fn(ts);}
let now=0;for(let i=0;i<10;i++)tick(now+=16.67);click('pause');const paused=w.inspect().world.time;tick(now+=1000);assert.equal(w.inspect().world.time,paused);assert.equal(frames.size,0);click('pause');assert.equal(frames.size,1);click('stop');assert.equal(frames.size,0);assert(!el('setup').classList.contains('hidden'));
for(let match=0;match<3;match++){click('random');click('start');for(let i=0;i<1500&&!w.inspect().world.finished;i++)tick(now+=100);assert(w.inspect().world.finished);assert.equal(frames.size,0);assert(!el('result').classList.contains('hidden'));assert.equal(w.inspect().world.effects.length,0);click('again');assert(!el('setup').classList.contains('hidden'));}
console.log('PASS UI (jsdom): presets / search / free names / edit / 60 limit / pause / 8× / three rematches / effects cleanup');dom.window.close();
