'use strict';
const fs=require('fs'),assert=require('node:assert/strict'),{JSDOM}=require('jsdom');
const dom=new JSDOM(fs.readFileSync('index.html','utf8'),{runScripts:'outside-only',url:'http://localhost/'}),w=dom.window,d=w.document;
let now=0,seq=0;const timers=new Map();w.Date.now=()=>now;w.setTimeout=(fn,ms)=>{const id=++seq;timers.set(id,{fn,due:now+ms});return id;};w.clearTimeout=id=>timers.delete(id);
const advance=ms=>{now+=ms;for(const [id,t] of [...timers])if(t.due<=now){timers.delete(id);t.fn();}};
w.Image=class{set src(v){}};w.HTMLCanvasElement.prototype.getContext=()=>new Proxy({},{get:()=>()=>{},set:()=>true});w.requestAnimationFrame=()=>1;w.cancelAnimationFrame=()=>{};w.HTMLDialogElement.prototype.showModal=function(){this.setAttribute('open','');};w.HTMLDialogElement.prototype.close=function(){this.removeAttribute('open');this.dispatchEvent(new w.Event('close'));};
for(const f of ['data.js','engine.js','icons.js','app.js'])w.eval(fs.readFileSync(f,'utf8')+(f==='app.js'?'\nwindow.inspect=()=>({world});':''));
const el=id=>d.getElementById(id),card=id=>d.querySelector('[data-id="'+id+'"]');
const names=value=>{el('names').value=value;el('names').dispatchEvent(new w.Event('input'));};
const pointer=(target,type,extra={})=>{const e=new w.MouseEvent(type,{bubbles:true,cancelable:true,button:0,clientX:20,clientY:20,...extra});Object.defineProperty(e,'pointerId',{value:1});Object.defineProperty(e,'isPrimary',{value:true});target.dispatchEvent(e);};
const click=(target,detail=1)=>target.dispatchEvent(new w.MouseEvent('click',{bubbles:true,cancelable:true,detail}));
const hold=id=>{pointer(card(id),'pointerdown');advance(599);assert(card(id),'not transformed before threshold');advance(1);};
el('grade-all-5').click();assert.equal(w.inspect().world.units.length,25);assert.equal(w.inspect().world.units.filter(f=>f.profile.finalMode).length,4);assert(!w.inspect().world.units.some(f=>f.profile.id==='empress'));
names('');el('roster-open').click();assert.equal(d.querySelectorAll('.catalog-card').length,93);
// A short tap still selects the original.
pointer(card('plus'),'pointerdown');advance(200);pointer(card('plus'),'pointerup');click(card('plus'));advance(700);assert.equal(el('names').value,'プラス');assert(card('plus'));
// A hold replaces a selected original and the native follow-up click does not deselect it.
hold('plus');assert.equal(el('names').value,'プラス+');assert(card('plus_final').textContent.includes('G 5'));pointer(card('plus_final'),'pointerup');click(card('plus_final'),0);assert.equal(el('names').value,'プラス+');
// Holding the same card again returns to the original, without growing the lineup.
hold('plus_final');assert.equal(el('names').value,'プラス');pointer(card('plus'),'pointerup');click(card('plus'));assert.equal(el('names').value,'プラス');
// Unselected originals can become final participants directly.
for(const id of ['hikaru','kobal','hattan']){hold(id);pointer(card(id+'_final'),'pointerup');click(card(id+'_final'));assert(w.inspect().world.units.some(f=>f.profile.id===id+'_final'));}
// Scrolling, pointer cancellation, searching and closing cancel a pending hold.
pointer(card('plus'),'pointerdown');pointer(card('plus'),'pointermove',{clientY:50});advance(700);assert(card('plus'));
pointer(card('plus'),'pointerdown');pointer(card('plus'),'pointercancel');advance(700);assert(card('plus'));
pointer(card('plus'),'pointerdown');el('search').value='プラス';el('search').dispatchEvent(new w.Event('input'));advance(700);assert(card('plus'));
pointer(card('plus'),'pointerdown');el('catalog').close();advance(700);assert.equal(el('names').value.split('、')[0],'プラス');
// At the limit, replacement remains possible and adding a new form is refused.
names(['プラス',...Array.from({length:59},(_,i)=>'参加者'+i)].join('、'));el('search').value='';el('roster-open').click();hold('plus');assert.equal(w.inspect().world.units.length,60);assert(w.inspect().world.units.some(f=>f.name==='プラス+'));pointer(card('plus_final'),'pointerup');click(card('plus_final'));hold('hikaru');assert.equal(w.inspect().world.units.length,60);assert(!w.inspect().world.units.some(f=>f.name==='ヒカル+'));assert(el('catalog-status').textContent.includes('最大60人'));
// Keyboard alternative supports the same transformation.
names('コバル');el('roster-open').click();card('kobal').dispatchEvent(new w.KeyboardEvent('keydown',{key:'Enter',shiftKey:true,bubbles:true,cancelable:true}));assert.equal(el('names').value,'コバル+');
console.log('PASS catalog hold: Grade 5 all 25 / short tap / long press and follow-up click / return / scrolling and cancellation / 60 limit / keyboard');dom.window.close();
