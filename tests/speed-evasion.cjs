'use strict';
const assert=require('node:assert/strict'),{World}=require('../engine.js');
function trial(speed,rng,{type='spell',sealed=false,sudden=false,dash=false,powers=[]}={}){
 const w=new World(['プラス','ユージ'],{seed:'speed-evasion'}),[a,t]=w.units;
 a.powers=[];t.powers=powers.map(id=>({id,scale:1}));t.speed=speed;w.rng=()=>rng;w.sudden=sudden;
 if(sealed)w.status(t,'seal',10);if(dash)w.status(t,'dash',10);
 return w.hit(a,t,10,type);
}
assert.equal(trial(4,.019),0);assert.equal(trial(4,.021),10);
assert.equal(trial(8,.039),0);assert.equal(trial(8,.041),10);
assert.equal(trial(4,.03),10);assert.equal(trial(8,.03),0,'faster fighters evade more often');
assert.equal(trial(100,.049),0);assert.equal(trial(100,.051),10,'SPD bonus capped at five percentage points');
assert.equal(trial(0,0),10);assert.equal(trial(-1,0),10);
assert.equal(trial(6,.029,{sealed:true}),0,'physical SPD bonus survives ability sealing');
for(const type of ['contact','spell']){
 assert.equal(trial(6,.029,{type}),0);assert.equal(trial(6,.031,{type,sudden:true,dash:true}),10,'movement multipliers do not multiply evasion');
}
assert.equal(trial(100,0,{type:'erase',powers:['titan']}),10,'erasure bypasses both speed and skill evasion');
assert.equal(trial(6,.269,{powers:['titan']}),0);assert.equal(trial(6,.271,{powers:['titan']}),10,'speed adds to skill evasion');
assert.equal(trial(6,.04,{powers:['titan'],sealed:true}),10,'sealing removes skill evasion');
assert.equal(trial(100,.649,{powers:['titan','bonbori','muchiko'],dash:true,type:'contact'}),0);
assert.equal(trial(100,.651,{powers:['titan','bonbori','muchiko'],dash:true,type:'contact'}),10,'combined evasion remains capped at 65 percent');
console.log('PASS speed evasion: boundaries / monotonicity / caps / sealing / movement multipliers / erase / skill addition');
