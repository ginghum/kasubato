/* Circle movement / contact combat adapted from ginghum/battle. School abilities are new. */
(function(root){
'use strict';
const roster=typeof module!=='undefined'?require('./data.js'):root.KASU_ROSTER;
const finalModes=roster.finalModes||[],profiles=[...roster,...finalModes];
const norm=s=>String(s).normalize('NFKC').toLowerCase().replace(/[\s・･]/g,'');
const passivePowers=new Set(['basic','bonbori','hoozuki','hime','oriha','oga','sakuo','titan','tsukuyomi','vine','wan','yayoi','soi','kagachi']);
const aliases=new Map();for(const p of profiles)for(const n of p.aliases.filter(Boolean))aliases.set(norm(n),p);
function hash(s){let h=2166136261;for(const c of s){h^=c.codePointAt(0);h=Math.imul(h,16777619);}return h>>>0;}
function random(seed){let a=hash(String(seed));return()=>{a+=0x6D2B79F5;let t=a;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;};}
const find=s=>aliases.get(norm(s))||null;
const distance=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
const clamp=(x,a,b)=>Math.max(a,Math.min(b,x));
function resolve(name){const p=find(name);return p?{profile:p,skill:p.id,stats:{...p.stats}}:{profile:null,skill:roster[hash(norm(name))%roster.length].id,stats:{atk:18,hp:1250,speed:5.5}};}
// Each parenthesized group is a separate alliance; names retain their original spelling.
function parseEntries(input){
 const entries=[],seen=new Set();let text='',depth=0,literalDepth=0,group=null,seq=0;
 const flush=()=>{const name=text.trim();text='';if(name&&!seen.has(name)){seen.add(name);entries.push({name,team:group});}};
 const source=String(input).replace(/（/g,'(').replace(/）/g,')');
 for(let i=0;i<source.length;i++){const c=source[i];
  if(c==='('){if(text.trim()||literalDepth){text+=c;literalDepth++;}else{flush();if(depth===0&&source.indexOf(')',i+1)!==-1)group='alliance:'+ ++seq;depth++;}}
  else if(c===')'){if(literalDepth){text+=c;literalDepth--;}else if(depth){flush();depth--;if(!depth)group=null;}else text+=c;}
  else if(/[,，、\n\r]/.test(c))flush();else text+=c;
 }flush();return entries;
}
function formatEntries(entries){
 const parts=[],groups=new Map();for(const e of entries){if(e.team==null){parts.push(e.name);continue;}if(!groups.has(e.team)){const group=[];groups.set(e.team,group);parts.push(group);}groups.get(e.team).push(e.name);}
 return parts.map(p=>Array.isArray(p)?'('+p.join('、')+')':p).join('、');
}
class World {
 constructor(names,options={}){
  const entries=typeof names==='string'?parseEntries(names):names.map(name=>({name,team:options.teams?.[name]??null}));names=entries.map(e=>e.name);const teams=new Map(entries.map(e=>[e.name,e.team]));
  this.rng=random(options.seed??Date.now());this.seed=String(options.seed??'');this.time=0;this.smallMode=names.length<=5;this.mediumMode=names.length>=6&&names.length<=20;this.mode=this.smallMode?'small':this.mediumMode?'medium':'normal';this.viewScale=this.smallMode?2:this.mediumMode?1.5:1;this.baseRadius=this.smallMode?185:this.mediumMode?250:385;this.radius=this.baseRadius;this.suddenDeath=options.suddenDeath!==false;this.units=[];this.shots=[];this.zones=[];this.effects=[];this.events=[];this.seq=0;this.finished=false;this.sudden=false;this.result=null;this.initialCount=names.length;this.tickCount=0;
  this.participantFamilies=new Set(names.map(find).filter(Boolean).map(p=>p.baseId||p.id));
  // Full Grade 1/2 cohorts use a seeded turn order, avoiding fixed catalog-order advantages.
  const entrants=names.map(name=>({name,profile:find(name)})),grade=entrants[0]?.profile?.grade;
  if(['1','2'].includes(grade)&&entrants.every(e=>e.profile?.grade===grade)&&new Set(entrants.map(e=>e.profile.id)).size===names.length&&names.length===roster.filter(p=>p.grade===grade).length){
   names=entrants.sort((a,b)=>a.profile.id<b.profile.id?-1:a.profile.id>b.profile.id?1:0).map(e=>e.name);
   for(let i=names.length-1;i>0;i--){const j=Math.floor(this.rng()*(i+1));[names[i],names[j]]=[names[j],names[i]];}
  }
  for(const name of names){const r=resolve(name),saved=Object.hasOwn(options.overrides||{},name)?options.overrides[name]:null;const s=saved?{...r.stats,...saved}:r.stats;const f=this.make(name,saved?.skill||r.skill,s,false,teams.get(name));f.profile=r.profile;this.units.push(f);}
 }
 make(name,skill,stats,minion,team){const angle=this.rng()*Math.PI*2,r=(80+this.rng()*210)*(this.baseRadius/385);const f={id:++this.seq,name,skill,profile:null,team:team||this.seq,minion,kind:'person',x:400+Math.cos(angle)*r,y:400+Math.sin(angle)*r,angle:this.rng()*Math.PI*2,radius:15,atk:stats.atk,maxHp:stats.hp,hp:stats.hp,speed:stats.speed,baseAtk:stats.atk,alive:true,shield:0,status:{},cool:{},powers:[{id:skill,scale:1}],dots:[],history:[],kills:0,damage:0,healing:0,revived:false,form:0,luck:0,poison:0,ready:false,expires:Infinity,deathTime:null};
  if(skill==='empress'){f.powers.push(...this.startingPredationPowers());this.event(name+'の開始能力：'+f.powers.slice(1).map(p=>profiles.find(q=>q.id===p.id).name).join('、'));}
  if(skill==='kagachi')f.radius=32;if(skill==='paster')f.radius=24;return f;
 }
 startingPredationPowers(){
  if(this.predationStart)return this.predationStart.map(p=>({...p}));
  const groups=new Map();for(const p of profiles){const family=p.baseId||p.id;if(p.id==='empress'||this.participantFamilies.has(family))continue;if(!groups.has(family))groups.set(family,[]);groups.get(family).push(p);}
  const pool=[...groups.values()],powers=[];for(let i=0;i<10&&pool.length;i++){const choices=pool.splice(Math.floor(this.rng()*pool.length),1)[0],p=choices[choices.length===1?0:Math.floor(this.rng()*choices.length)];powers.push({id:p.id,scale:.65});}this.predationStart=powers;return powers.map(p=>({...p}));
 }
 enabled(f){return !this.has(f,'seal');}
 power(f,id){return this.enabled(f)&&f.powers.some(p=>p.id===id);}
 has(f,s){return (f.status[s]||0)>this.time;}
 status(f,s,seconds){if(f.alive)f.status[s]=Math.max(f.status[s]||0,this.time+seconds);}
 cd(f,key,seconds){if((f.cool[key]??0)>this.time)return false;f.cool[key]=this.time+seconds;return true;}
 foes(f){return this.units.filter(e=>e.alive&&e.team!==f.team);}
 target(f){const reveal=['hoozuki','tsukichiyo','wan'].some(id=>this.power(f,id));let closest,best=Infinity;for(const e of this.units){if(!e.alive||e.team===f.team)continue;const d=distance(e,f);if(this.has(e,'hidden')&&!reveal&&d>=55)continue;if(d<best){best=d;closest=e;}}return closest;}
 nearby(f,r){return this.foes(f).filter(e=>distance(e,f)<r);}
 effect(f,text,color='#eab963'){this.effects.push({x:f.x,y:f.y,text,color,end:this.time+.8});if(this.effects.length>220)this.effects.shift();}
 event(text){this.events.push({time:this.time,text});if(this.events.length>100)this.events.shift();}
 heal(f,n){if(!f.alive)return;const amount=Math.max(0,Math.min(n,f.maxHp-f.hp));f.hp+=amount;f.healing+=amount;if(amount>5)this.effect(f,'+'+Math.round(amount),'#9addb1');}
 push(f,t,force){t.angle=Math.atan2(t.y-f.y,t.x-f.x);t.x+=Math.cos(t.angle)*force;t.y+=Math.sin(t.angle)*force;}
 hit(a,t,amount,type='spell',reflect=false){
  if(!t?.alive||amount<=0||(a&&a.team===t.team))return 0;
  if((this.has(t,'air')&&type==='contact')||(this.has(t,'invulnerable')&&this.enabled(t)&&type!=='erase'))return 0;
  // Base SPD adds at most 5 percentage points, independent of movement buffs and ability sealing.
  const enabled=this.enabled(t);let evasion=Math.min(.05,Math.max(0,t.speed)*.005);
  if(enabled){if(this.power(t,'beret'))evasion+=Math.min(.48,.1+t.luck*.04);if(this.power(t,'titan'))evasion+=.24;
   if(type==='contact'&&['bonbori','vine','tsukuyomi'].some(id=>this.power(t,id)))evasion+=.22;
   if(this.power(t,'muchiko')&&this.has(t,'dash'))evasion+=.30;
   if(this.has(t,'hidden'))evasion+=.4;
  }
  if(type!=='erase'&&this.rng()<Math.min(.65,evasion)){this.effect(t,'回避','#bec8ed');return 0;}
  if(a&&type!=='erase'&&(this.has(a,'blind')||this.has(a,'drunk')||this.has(a,'unlucky'))&&this.rng()<.35)return 0;
  if(type!=='erase'){
   if(this.power(t,'oriha'))amount*=.5;
   if(this.power(t,'dancho')&&type==='contact')amount*=.35;
   if(this.power(t,'hime')&&type==='contact'&&!this.has(t,'air'))amount*=.45;
   if(this.power(t,'yayoi')&&type==='contact')amount*=.6;
   if(this.has(t,'guard'))amount*=.65;if(this.has(t,'stone'))amount*=a?.id===t.stoneOwner?1.3:.6;
   const absorbed=Math.min(t.shield,amount);t.shield-=absorbed;amount-=absorbed;
   if(absorbed>0&&type==='spell'&&this.power(t,'torie')&&a?.alive&&!reflect)this.hit(t,a,absorbed*.5,'spell',true);
  }
  if(type==='poison'&&this.power(t,'an')){t.poison=Math.min(6,t.poison+1);return 0;}
  const actual=Math.min(t.hp,amount);t.hp-=amount;if(a)a.damage+=actual;delete t.status.sleep;
  if(actual>0&&this.cd(t,'hitText',.3))this.effect(t,'−'+Math.round(actual),'#f4a29b');
  if(t.hp<=0){
   if(this.power(t,'soi')&&!t.revived){t.revived=true;t.hp=t.maxHp;this.event(t.name+'が一度限りの不死身で生還');this.effect(t,'不死身');}
   else this.die(t,a);
  }
  return actual;
 }
 die(t,a){t.alive=false;t.hp=0;t.deathTime=this.time;this.event(t.name+' 脱落'+(a?' ← '+a.name:''));
  if(a?.alive&&!t.minion){a.kills++;if(this.power(a,'empress')){
   for(const p of t.powers)if(p.id!=='empress'&&!a.powers.some(q=>q.id===p.id)){a.powers.push({id:p.id,scale:p.scale*t.baseAtk/a.baseAtk});this.event(a.name+'が'+(profiles.find(q=>q.id===p.id)?.title||p.id)+'を獲得');}
   this.heal(a,a.maxHp*.12);
  }}
  if(!t.minion)for(const m of this.units)if(m.minion&&(m.summonerId??m.team)===t.id&&m.team===t.team){m.alive=false;m.hp=0;}
 }
 dot(f,t,seconds,damage,type='poison'){if(f.team===t.team)return;t.dots.push({owner:f,until:this.time+seconds,next:this.time+.5,damage,type});if(t.dots.length>12)t.dots.shift();}
 shield(f,amount){f.shield=Math.min(f.maxHp*.65,f.shield+amount);}
 shot(f,t,damage,icon='✦',extra={}){if(!t)return;const angle=Math.atan2(t.y-f.y,t.x-f.x)+(extra.spread||0);this.shots.push({owner:f,x:f.x,y:f.y,vx:Math.cos(angle)*450,vy:Math.sin(angle)*450,damage,icon,end:this.time+2.5,hit:new Set(),...extra});}
 volley(f,t,n,damage,icon,extra={}){for(let i=0;i<n;i++)this.shot(f,t,damage,icon,{...extra,spread:(i-(n-1)/2)*.13});}
 zone(f,x,y,r,seconds,kind,power){this.zones.push({owner:f,x,y,r,end:this.time+seconds,next:this.time+.2,kind,power});if(this.zones.length>150)this.zones.shift();}
 summon(f,kind,count,hp,atk){const alive=this.units.filter(m=>m.alive&&m.minion&&m.summonerId===f.id&&m.team===f.team&&m.kind===kind);if(alive.length>=count)return;
  const m=this.make(f.name+'の'+({golem:'ゴーレム',clone:'分身',animal:'友達',machine:'砲台',diamond:'ダイヤ兵'}[kind]||kind),'basic',{atk:f.atk*atk,hp:f.maxHp*hp,speed:kind==='machine'?0:4.2},true,f.team);m.summonerId=f.id;m.kind=kind;m.x=f.x+20;m.y=f.y+20;m.radius=kind==='golem'?19:11;m.expires=this.time+(kind==='clone'?12:18);this.units.push(m);this.effect(f,'支援 '+kind);
 }
 cast(f,p){
  const id=p.id,t=passivePowers.has(id)?null:this.target(f),b=f.atk*p.scale*(this.has(f,'boost')?1.4:1),near=r=>this.nearby(f,r),cd=s=>this.cd(f,'cast:'+id,s),label=()=>this.effect(f,profiles.find(q=>q.id===id)?.title||id);
  switch(id){
   case 'an':if(cd(3)){for(const e of near(155))this.dot(f,e,4,b*(.45+f.poison*.15));f.poison=Math.min(6,f.poison+1);label();}break;
   case 'ashara':if(t&&cd(1.7))this.shot(f,t,b*6,'⚡',{chain:2,stun:.25,homing:true});break;
   case 'balalaika':if(t&&cd(2))this.volley(f,t,5,b*1.4,'•',{mechanical:true});break;
   case 'bane':if(cd(5))this.summon(f,'golem',2,.45,.75);break;
   case 'baroo':if(t&&cd(3.5)){const e=this.foes(f).find(e=>e!==t);if(e){const mx=(t.x+e.x)/2,my=(t.y+e.y)/2;t.x+=(mx-t.x)*.45;t.y+=(my-t.y)*.45;e.x+=(mx-e.x)*.45;e.y+=(my-e.y)*.45;this.hit(f,t,b*2);this.hit(f,e,b*2);}label();}break;
   case 'bell':if(cd(8))this.summon(f,'machine',1,.4,.5);break;
   case 'beret':if(t&&cd(2)){f.luck=Math.min(9,f.luck+1);this.status(t,'unlucky',3);label();}break;
   case 'bonbori':case 'hoozuki':case 'hime':case 'oriha':case 'oga':case 'sakuo':case 'titan':case 'tsukuyomi':case 'vine':case 'wan':case 'yayoi':case 'soi':case 'kagachi':break;
   case 'bug':if(t&&cd(3))this.shot(f,t,b*1.5,'🕸',{stun:1.1});break;
   case 'bunbu':if(cd(4)){this.status(f,'dash',1.8);this.status(f,'guard',1.8);f.form=1;if(t)f.angle=Math.atan2(t.y-f.y,t.x-f.x);label();}break;
   case 'chaka':if(cd(5)){this.status(f,'thinking',2);f.cool['charge:chaka']=this.time+2;label();}break;
   case 'chick':if(cd(7)){const h=f.history.find(h=>h.time>=this.time-3);if(h){f.x=h.x;f.y=h.y;this.heal(f,Math.max(0,h.hp-f.hp));label();}}break;
   case 'chuba':if(t&&cd(2.8))this.volley(f,t,3,b*2.2,'♪');break;
   case 'clarine':if(t&&distance(f,t)<245&&cd(3.5)){t.stoneOwner=f.id;this.status(t,'stone',1.0);this.status(t,'stun',1.0);this.hit(f,t,b*3.2);label();}break;
   case 'dai':if(f.hp<f.maxHp*.65&&cd(5)){f.x=f.home?.x||400;f.y=f.home?.y||400;this.status(f,'hidden',.8);label();}break;
   case 'dancho':if(cd(6))this.status(f,'invulnerable',1);break;
   case 'dankachi':if(cd(4)){f.form=1-f.form;if(f.form)this.status(f,'guard',3);else this.status(f,'strong',3);label();}break;
   case 'deji':if(t&&cd(4)){this.shield(f,f.maxHp*.15);this.zone(f,t.x,t.y,65,3,'bind',b*.4);}break;
   case 'devil':if(this.cd(f,'arenaTurret',7))this.summon(f,'machine',1,.4,1);if(cd(2)){for(const e of near(280))if(e.minion&&e.kind==='machine'){e.team=f.team;e.summonerId=f.id;this.event(f.name+'が砲台を掌握');}label();}break;
   case 'doma':if(t&&cd(3))this.shot(f,t,b*4,'━',{pierce:true});break;
   case 'don':if(cd(6)){this.status(f,'hidden',3);label();}break;
   case 'doppel':if(cd(6)){f.form=1-f.form;for(const e of near(150))this.status(e,'blind',1);label();}break;
   case 'empress':if(t&&distance(f,t)<190&&cd(3)){this.hit(f,t,b*6);label();}break;
   case 'eris':if(t&&cd(2.8))this.shot(f,t,b*3,'〰',{push:60});break;
   case 'grav':if(t&&cd(4))this.zone(f,t.x,t.y,115,3,'gravity',b*.7);break;
   case 'guardian':if(cd(5)){this.shield(f,f.maxHp*.22);label();}break;
   case 'gumon':if(cd(6)){this.status(f,'invulnerable',1.7);label();}break;
   case 'hat':if(cd(5)){this.status(f,'dash',2.5);for(const e of near(180))this.status(e,'slow',2.5);label();}break;
   case 'hattan':if(cd(4))this.summon(f,'clone',3,.28,.65);break;
   case 'helios':if(cd(6))this.summon(f,'animal',2,.22,.4);break;
   case 'hikaru':if(t&&cd(3.5)){t.shield*=.35;this.volley(f,t,3,b*2,'◆');label();}break;
   case 'himeyuri':if(t&&cd(4)){this.status(t,'weak',3);label();}break;
   case 'hiyoko':if(t&&cd(4)){this.shield(f,140*p.scale);this.hit(f,t,b*2);this.status(t,'slow',1);}break;
   case 'itoguchi':if(t&&cd(3.2)){t.shield=0;for(const k of ['invulnerable','guard','dash','strong','hidden','air'])delete t.status[k];this.status(t,'seal',1.6);this.hit(f,t,b*7,'erase');label();}break;
   case 'jend':if(t&&cd(4)){t.shield=0;for(const e of this.units)if(e.alive&&e.minion&&e.team===t.team&&distance(f,e)<250)this.die(e,f);this.hit(f,t,b*5,'erase');label();}break;
   case 'judge':if(cd(3.5)){f.form=(f.form+1)%3;if(f.form===0)this.shield(f,f.maxHp*.2);if(f.form===1)this.heal(f,f.maxHp*.12);if(f.form===2&&t)this.hit(f,t,b*5,'erase');label();}break;
   case 'junko':if(t&&cd(2.4))this.volley(f,t,3,b*1.7,'│');break;
   case 'kamatsuka':if(t&&cd(4)){this.shield(f,160*p.scale);this.status(t,'stun',.8);label();}break;
   case 'kirara':break;
   case 'kobal':if(cd(5)){this.status(f,'thinking',2);f.cool['charge:kobal']=this.time+2;label();}break;
   case 'konke':if(t&&cd(2.8))this.shot(f,t,b*2,'☠',{poison:b*.5});break;
   case 'lance':if(t&&cd(2.5))this.volley(f,t,2,b*2.2,'⚔');break;
   case 'leorka':if(t&&cd(4))this.zone(f,t.x,t.y,90,1.2,'bomb',b*7);break;
   case 'lusai':if(cd(5)){this.status(f,'hidden',2.8);label();}break;
   case 'machio':case 'rindou':if(t&&distance(f,t)<180&&cd(id==='machio'?4:3.5)){this.status(t,'stun',id==='machio'?1.2:.8);label();}break;
   case 'makura':if(t&&cd(4)){this.status(t,'weak',3);this.status(t,'slow',2);label();}break;
   case 'mane':if(cd(3.6)){for(const e of near(170)){this.hit(f,e,b*2.6);this.push(f,e,65);this.status(e,'slow',1);}label();}break;
   case 'masa':f.atk=f.baseAtk*(1+Math.min(.8,this.time*.012))*(this.sudden?10:1);break;
   case 'meimei':if(t&&cd(3.5))this.shot(f,t,b*2,'➰',{stun:.8,pull:65});break;
   case 'mikael':if(cd(6)){if(t){const a=Math.atan2(f.y-t.y,f.x-t.x);f.x=t.x+Math.cos(a)*30;f.y=t.y+Math.sin(a)*30;this.hit(f,t,b*6,'contact');this.status(f,'guard',1.5);}const a={x:f.x,y:f.y},ang=this.rng()*Math.PI*2;const z=this.radius*.75;this.zones.push({owner:f,x:a.x,y:a.y,r:24,end:this.time+6,kind:'gate',to:{x:400+Math.cos(ang)*z,y:400+Math.sin(ang)*z}});this.zones.push({owner:f,x:400+Math.cos(ang)*z,y:400+Math.sin(ang)*z,r:24,end:this.time+6,kind:'gate',to:a});label();}break;
   case 'milk':if(cd(3)){this.heal(f,f.maxHp*.09*p.scale);for(const a of this.units)if(a.alive&&a!==f&&a.team===f.team&&distance(f,a)<150)this.heal(a,a.maxHp*.1*p.scale);label();}break;
   case 'mimari':if(t&&cd(5)){const pet=this.foes(f).find(e=>e.minion&&distance(f,e)<220);if(pet){pet.team=f.team;pet.summonerId=f.id;this.event(f.name+'が支援者を洗脳');}this.status(t,'drunk',2.2);label();}break;
   case 'minus':if(t&&cd(3)){this.status(t,'heavy',2.3);this.status(f,'dash',1.3);this.hit(f,t,b*5.5);for(const e of near(175))if(e!==t){this.status(e,'slow',1.5);this.hit(f,e,b*2.4);}label();}break;
   case 'morpheus':{const sleeper=this.foes(f).find(e=>this.has(e,'sleep')&&distance(f,e)<240);if(sleeper&&cd(4.5)){this.status(sleeper,'sleep',2.5);label();}}break;
   case 'mu':if(this.cd(f,'diamondSoldier',6))this.summon(f,'diamond',1,.24,.5);if(t&&cd(3)){this.shield(f,f.maxHp*.11);this.volley(f,t,3,b*2.4,'◆');}break;
   case 'muchiko':if(cd(3)){this.status(f,'dash',1);if(t)f.angle=Math.atan2(t.y-f.y,t.x-f.x);label();}break;
   case 'natori':if(t&&cd(3.5))this.zone(f,t.x,t.y,75,3,'bind',b*.35);break;
   case 'ojo':if(t&&cd(2.5))this.shot(f,t,b*6.5,'●',{homing:true,blast:100});break;
   case 'paster':if(cd(6)){this.status(f,'strong',4);this.status(f,'guard',4);this.status(f,'dash',2);label();}break;
   case 'plus_final':if(cd(2.4)){f.form=1-f.form;if(f.form){this.status(f,'strong',2.2);this.status(f,'guard',2.2);for(const e of near(130)){this.hit(f,e,b*2.2);if(e.alive)this.push(f,e,40);}}else this.status(f,'dash',2.2);label();}break;
   case 'hattan_final':if(cd(3.5))this.summon(f,'clone',4,.3,.7);break;
   case 'hikaru_final':if(t&&cd(2.7)){t.shield*=.15;this.volley(f,t,4,b*2,'◆',{pierce:true});label();}break;
   case 'kobal_final':if(!f.ready&&!f.cool['charge:'+id]&&cd(3.8)){this.status(f,'thinking',1);this.status(f,'guard',1.5);f.cool['charge:'+id]=this.time+1;label();}break;
   case 'plus':if(cd(3)){f.form=1-f.form;this.status(f,f.form?'strong':'dash',2.8);label();}break;
   case 'rokka':if(t&&cd(4))this.zone(f,t.x,t.y,110,3,'snow',0);break;
   case 'romanchi':if(cd(4)){f.form=(f.form+1)%3;if(f.form===0)this.heal(f,150*p.scale);if(f.form===1)this.shield(f,170*p.scale);if(f.form===2&&t)this.volley(f,t,3,b*2,'✧');label();}break;
   case 'ruto':if(t&&distance(f,t)<105&&cd(3.5)){this.status(t,'seal',2.5);label();}break;
   case 'serena':if(cd(4.5)){this.heal(f,f.maxHp*.1*p.scale);f.dots=[];label();}break;
   case 'shiika':if(t&&cd(4.5))this.zone(f,t.x,t.y,110,3,'rain',0);break;
   case 'sigma':if(t&&cd(4)){this.status(t,'drunk',3);label();}break;
   case 'sunny':if(t&&cd(3)){this.shield(f,100*p.scale);this.volley(f,t,4,b*1.5,'◇');}break;
   case 'tanaka':if(f.hp<f.maxHp*.55&&this.cd(f,'normal',10)){this.heal(f,f.maxHp);f.status={};f.dots=[];label();}break;
   case 'torie':if(cd(5)){this.shield(f,f.maxHp*.3*p.scale);label();}break;
   case 'tsukichiyo':if(cd(3.5)){for(const e of near(210))this.status(e,'blind',2.4);if(t&&distance(f,t)<150)this.hit(f,t,b*4,'contact');label();}break;
   case 'tsukuri':if(cd(8)){this.shield(f,240*p.scale);label();}break;
   case 'van':if(cd(4.5)){f.form=1-f.form;for(const e of near(185)){if(f.form)this.status(e,'stun',1.1);else{this.hit(f,e,b*2);this.push(f,e,65);}}label();}break;
   case 'will':if(t&&cd(4))this.zone(f,t.x,t.y,50,3,'pit',b*2);break;
   case 'x':if(cd(2.7)){f.form=1-f.form;for(const e of near(245)){if(f.form){this.hit(f,e,b*4);this.dot(f,e,2,b*.7,'spell');}else{this.status(e,'stun',1.2);this.hit(f,e,b*1.8);}}label();}break;
   case 'yaoi':if(cd(4.5)){this.status(f,'invulnerable',1.5);for(const e of near(180)){this.hit(f,e,b*4);this.status(e,'slow',1);}label();}break;
   case 'yuhi':if(cd(6)){this.status(f,'air',3);label();}break;
   case 'yuji':if(cd(3.5)){for(const e of near(110))this.push(f,e,60);label();}break;
   case 'yukimero':if(t&&cd(4)){this.shield(f,f.maxHp*.16);this.zone(f,t.x,t.y,90,3,'cotton',0);}break;
   case 'zenomura':if(t&&cd(4)){this.status(t,'blind',2.5);this.status(t,'drunk',2.5);label();}break;
   case 'zeta':if(cd(4)){f.form=1-f.form;this.status(f,f.form?'dash':'guard',3.5);label();}break;
   case 'basic':break;
   default:throw Error('Unimplemented ability: '+id);
  }
  if(['chaka','kobal','kobal_final'].includes(id)&&f.cool['charge:'+id]&&f.cool['charge:'+id]<=this.time){f.ready=true;delete f.cool['charge:'+id];}
  if(id==='oga'&&cd(3))for(const a of this.units)if(a.alive&&a.team===f.team&&a!==f&&distance(f,a)<200)this.status(a,'boost',3.5);
 }
 contact(f,t){if(!f.alive||!t.alive||f.team===t.team||this.has(f,'stun')||this.has(f,'sleep')||!this.cd(f,'contact:'+t.id,this.power(f,'sakuo')?.22:.4))return;
  let b=f.atk*(.85+this.rng()*.3);if(this.has(f,'strong'))b*=1.7;if(this.has(f,'weak'))b*=.6;
  if(this.power(f,'lance'))b*=1.45;if(this.power(f,'kagachi'))b*=1.6;
  if(this.power(f,'kirara'))b*=1+(1-t.hp/t.maxHp)*2;
  if((this.power(f,'beret')&&this.rng()<Math.min(.6,.12+f.luck*.04))||(this.power(f,'titan')&&this.rng()<.28))b*=2.5;
  if(f.ready){b*=this.power(f,'kobal_final')?8:this.power(f,'kobal')?7:3;f.ready=false;this.effect(f,'会心');}
  this.hit(f,t,b,'contact');if(this.power(f,'kirara')&&t.alive)this.dot(f,t,2,b*.2,'spell');
  if(this.power(f,'yayoi')||this.power(f,'bunbu'))this.push(f,t,35);delete f.status.hidden;
 }
 step(dt=1/60){
  if(this.finished)return;this.time+=dt;this.tickCount++;const mains=this.units.filter(f=>f.alive&&!f.minion);
  if(this.suddenDeath&&this.time>=50&&!this.sudden){this.sudden=true;for(const f of this.units)f.atk*=10;this.event('サドンデス：攻撃10倍・移動速度3倍');}
  this.radius=Math.max(95*(this.baseRadius/385),Math.min(this.baseRadius*Math.sqrt(mains.length/this.initialCount),this.baseRadius-this.time*4*(this.baseRadius/385)));
  for(const f of this.units){if(!f.alive)continue;if(f.minion&&f.expires<=this.time){this.die(f);continue;}
   f.home??={x:f.x,y:f.y};if(this.tickCount%15===0){f.history.push({time:this.time,x:f.x,y:f.y,hp:f.hp});f.history=f.history.filter(h=>h.time>=this.time-4);}
   for(const d of f.dots)if(d.until>this.time&&d.next<=this.time){d.next+=.5;this.hit(d.owner,f,d.damage,d.type);}f.dots=f.dots.filter(d=>d.until>this.time);
   if(!f.alive)continue;
   if(f.hp<f.maxHp*.25&&!this.has(f,'sleep')&&this.cd(f,'rest',12)){this.status(f,'sleep',1.2);this.effect(f,'休息');}
   if(this.enabled(f)&&!this.has(f,'stun')&&!this.has(f,'sleep'))for(const p of [...f.powers])this.cast(f,p);
   if(f.kind==='machine'){const t=this.target(f);if(t&&this.cd(f,'turret',1.2))this.shot(f,t,f.atk*3,'•',{mechanical:true});}
   if(this.has(f,'drunk')&&this.cd(f,'drunkAngle',.3))f.angle+=(this.rng()-.5)*2;
   if(this.enabled(f)&&['hoozuki','wan','tsukichiyo'].some(id=>this.power(f,id))&&this.cd(f,'aim',1)){const t=this.target(f);if(t)f.angle=Math.atan2(t.y-f.y,t.x-f.x);}
   let speed=f.speed*60*(this.sudden?3:1);if(this.has(f,'dash')&&this.enabled(f))speed*=1.8;if(this.has(f,'heavy'))speed*=.2;if(this.has(f,'slow'))speed*=.55;if(this.has(f,'thinking'))speed*=.4;if(this.has(f,'stun')||this.has(f,'sleep'))speed=0;
   f.x+=Math.cos(f.angle)*speed*dt;f.y+=Math.sin(f.angle)*speed*dt;
   const dx=f.x-400,dy=f.y-400,d=Math.hypot(dx,dy),r=this.radius-f.radius;
   if(d>r){const nx=dx/d,ny=dy/d;f.x=400+nx*r;f.y=400+ny*r;const vx=Math.cos(f.angle),vy=Math.sin(f.angle),dot=vx*nx+vy*ny;f.angle=Math.atan2(vy-2*dot*ny,vx-2*dot*nx);}
  }
  const live=this.units.filter(f=>f.alive);
  for(let i=0;i<live.length;i++)for(let j=i+1;j<live.length;j++){const a=live[i],b=live[j];if(this.has(a,'air')||this.has(b,'air'))continue;const d=distance(a,b),r=a.radius+b.radius;if(d<r){const nx=d?(b.x-a.x)/d:1,ny=d?(b.y-a.y)/d:0,over=(r-d)/2;a.x-=nx*over;a.y-=ny*over;b.x+=nx*over;b.y+=ny*over;a.angle=Math.atan2(-ny,-nx);b.angle=Math.atan2(ny,nx);if(a.team!==b.team){this.contact(a,b);this.contact(b,a);}}}
  this.updateShots(dt);this.updateZones();this.units=this.units.filter(f=>!f.minion||f.alive);this.effects=this.effects.filter(e=>e.end>this.time);this.shots=this.shots.filter(s=>s.end>this.time);
  const remaining=this.units.filter(f=>f.alive&&!f.minion);
  const teamsLeft=new Set(remaining.map(f=>f.team)).size;
  if(teamsLeft<=1||this.time>=180){this.finished=true;this.result={winner:remaining.length===1?remaining[0]:null,winners:teamsLeft===1?remaining:[],teamVictory:teamsLeft===1&&remaining.length>1,draw:remaining.length===0,timeout:teamsLeft>1,time:this.time,ranking:this.units.filter(f=>!f.minion).sort((a,b)=>(b.alive-a.alive)||((b.deathTime||Infinity)-(a.deathTime||Infinity))||b.kills-a.kills)};this.shots=[];this.zones=[];this.effects=[];}
 }
 updateShots(dt){for(const s of this.shots){if(s.end<=this.time)continue;
  if(s.homing){const t=this.target(s.owner);if(t){const a=Math.atan2(t.y-s.y,t.x-s.x);s.vx=Math.cos(a)*400;s.vy=Math.sin(a)*400;}}
  s.x+=s.vx*dt;s.y+=s.vy*dt;
  if(Math.hypot(s.x-400,s.y-400)>this.radius+20){s.end=0;continue;}
  for(const t of this.units){if(!t.alive||t.team===s.owner.team||s.hit.has(t.id)||distance(s,t)>t.radius+9)continue;
   if(this.power(t,'devil')&&s.mechanical){s.end=0;break;}
   if(this.power(t,'yuji')&&this.cd(t,'reflectShot',.35)&&!s.reflected){s.owner=t;s.vx*=-1;s.vy*=-1;s.reflected=true;s.homing=false;s.hit.add(t.id);this.effect(t,'弾き');break;}
   s.hit.add(t.id);const actual=this.hit(s.owner,t,s.damage);if(actual>0){if(s.stun)this.status(t,'stun',s.stun);if(s.poison)this.dot(s.owner,t,4,s.poison);if(s.push)this.push(s.owner,t,s.push);if(s.pull)this.push(s.owner,t,-s.pull);}
   if(s.blast)for(const e of this.foes(s.owner))if(e!==t&&distance(e,t)<s.blast)this.hit(s.owner,e,s.damage*.55);
   if(s.chain){const es=this.foes(s.owner).filter(e=>e!==t&&distance(e,t)<140).slice(0,s.chain);for(const e of es){this.hit(s.owner,e,s.damage*.6);this.status(e,'stun',.2);}}
   if(!s.pierce){s.end=0;break;}
  }
 }}
 updateZones(){for(const z of this.zones){if(z.kind==='bomb'&&z.end<=this.time){for(const e of this.foes(z.owner))if(distance(e,z)<z.r)this.hit(z.owner,e,z.power);this.effect(z,'💥');z.exploded=true;continue;}
  if(z.end<=this.time)continue;
  if(z.kind==='gate'){for(const f of this.units)if(f.alive&&distance(f,z)<z.r&&this.cd(f,'gate',1)){f.x=z.to.x;f.y=z.to.y;this.effect(f,'転移');}continue;}
  if((z.next||0)>this.time)continue;z.next=this.time+.25;
  for(const f of this.foes(z.owner)){if(distance(f,z)>z.r||this.has(f,'air'))continue;
   if(z.kind==='pit'){this.hit(z.owner,f,z.power);this.status(f,'stun',1.2);z.end=0;break;}
   if(['bind','snow','cotton','gravity'].includes(z.kind))this.status(f,'slow',.35);
   if(z.kind==='rain')f.angle+=(this.rng()-.5);
   if(z.kind==='gravity'){f.x+=(z.x-f.x)*.12;f.y+=(z.y-f.y)*.12;}
   if(z.power&&z.kind!=='bomb')this.hit(z.owner,f,z.power*.25);
  }
 }this.zones=this.zones.filter(z=>z.end>this.time&&!z.exploded);}
}
const api={World,roster,finalModes,profiles,find,resolve,norm,hash,random,parseEntries,formatEntries};if(typeof module!=='undefined')module.exports=api;else root.KasuBattle=api;
})(typeof globalThis!=='undefined'?globalThis:this);
