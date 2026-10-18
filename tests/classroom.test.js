const {test}=require('node:test');
const assert=require('node:assert/strict');
const T=require('../classroom');
const C=require('../curriculum');
const P=require('../adventures');
const E=require('../game-engine');

test('classroom plan totals 90 minutes including a movement break, with complex loops optional',()=>{
 const core=T.activities.filter(a=>a.minutes);
 assert.equal(core.length,12);
 assert.equal(core.reduce((sum,a)=>sum+a.minutes,0),90);
 assert.equal(T.find('8').variants[0].type,'break');
 assert.equal(T.find('7').variants[0].index,4);
 assert.equal(T.find('loops').minutes,undefined);
 assert.equal(T.find('recipe').minutes,undefined);
 for(const a of core)for(const v of a.variants){if(v.type==='curriculum')assert.equal(Boolean(C.get(v.index,v.stage).allowRepeat),false);}
});

test('every classroom map points at an existing solvable activity and all curriculum stages are accessible',()=>{
 const stages=new Set();
 for(const a of T.activities)for(const v of a.variants){
  let m;
  if(v.type==='curriculum'){
   assert.ok(C.choices(v.index).some(s=>s.id===v.stage),a.id+': '+v.stage);
   stages.add(v.index+':'+v.stage);m=C.get(v.index,v.stage);
  }else if(v.type==='pack')m=P.get(v.pack,v.index);
  else if(v.type==='detective')m=E.detectiveCase(v.index);
  if(m){const solution=E.solve(m);assert.ok(solution,a.title);assert.equal(E.evaluate(m,solution).outcome,'won');}
 }
 for(let i=0;i<C.count;i++)for(const stage of C.choices(i))assert.ok(stages.has(i+':'+stage.id),stage.id);
});

test('invalid lesson links safely resolve to the first activity or first variant',()=>{
 for(const id of ['999','<script>','',null])assert.equal(T.resolve(id).activity.id,'1');
 for(const v of [-1,999,NaN,1.5])assert.equal(T.resolve('9',v).index,0);
 assert.equal(T.resolve('9',1).variant.index,1);
});
