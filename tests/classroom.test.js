const {test}=require('node:test');
const assert=require('node:assert/strict');
const T=require('../classroom');
const C=require('../curriculum');
const P=require('../adventures');
const E=require('../game-engine');

test('classroom lessons include the gardens in order and omit removed activities',()=>{
 assert.deepEqual(T.activities.map(a=>a.id),Array.from({length:16},(_,i)=>String(i+1)));
 assert.equal(T.find('9').variants[0].pack,'puzzles');
 assert.equal(T.findByType('break'),undefined);
 assert.equal(T.find('8').variants[0].index,4);
 const stages=T.activities.flatMap(a=>a.variants.filter(v=>v.type==='curriculum').map(v=>v.stage));
 for(const [first,next] of [['water','pattern'],['pattern','repeat'],['repeat','one-row'],['one-row','two-rows'],['decision','combine']])assert.ok(stages.indexOf(first)<stages.indexOf(next));
 assert.equal(T.find('13').variants[0].stage,'one-row');
 const garden=C.get(T.find('14').variants[0].index,T.find('14').variants[0].stage);
 assert.deepEqual(garden.rowStarts.map(row=>row.name),['A','B','C']);
 assert.equal(garden.flowers.length,6);assert.equal(garden.size,5);
 for(const a of T.activities){
  assert.equal(a.minutes,undefined);
  for(const v of a.variants){assert.ok(!['story','sheet','free','original'].includes(v.type));}
 }
});

test('every classroom map points at an existing solvable activity and all curriculum stages are accessible',()=>{
 const stages=new Set();
 for(const a of T.activities)for(const v of a.variants){
  let m;
  if(v.type==='curriculum'){
   assert.ok(C.choices(v.index).some(s=>s.id===v.stage),a.id+': '+v.stage);
   stages.add(v.index+':'+v.stage);m=C.get(v.index,v.stage);
  }else if(v.type==='pack')m=P.get(v.pack,v.index);
  else if(v.type==='repair'||v.type==='predict')m=v.map;
  if(m){const solution=E.solve(m);assert.ok(solution,a.title);assert.equal(E.evaluate(m,solution).outcome,'won');}
 }
 for(let i=0;i<C.count;i++)for(const stage of C.choices(i))assert.ok(stages.has(i+':'+stage.id),stage.id);
});

test('invalid lesson links safely resolve to the first activity or first variant',()=>{
 for(const id of ['999','<script>','',null])assert.equal(T.resolve(id).activity.id,'1');
 for(const v of [-1,999,NaN,1.5])assert.equal(T.resolve('9',v).index,0);
 assert.equal(T.resolve('9',1).variant.index,1);
});

test('the repair lesson stops after one good step and has a one-arrow continuation',()=>{
 const v=T.find('2').variants[0];assert.equal(v.type,'repair');
 const result=E.evaluate(v.map,v.program);
 assert.equal(result.outcome,'edge');assert.equal(result.index,1);assert.deepEqual(result.position,[1,2]);
 assert.deepEqual(E.solve(v.map,{position:result.position}),['R']);
 assert.equal(T.findByType('predict').id,'3');assert.equal(T.findByType('detective'),undefined);
});

test('the final 4×4 lesson has several physical routes but only one viable energy route',()=>{
 const activity=T.activities.at(-1),v=activity.variants[0],map=P.get(v.pack,v.index);
 assert.equal(activity.id,'16');assert.equal(map.size,4);
 assert.deepEqual(map.start,[0,3]);assert.deepEqual(map.goal,[3,0]);
 assert.deepEqual(map.energy,{capacity:4,chargers:['1,1']});
 // Enumerate every geometric route without revisiting a cell, ignoring battery limits.
 const routes=[];
 function visit(position,path,seen){
  if(E.same(position,map.goal)){routes.push(path);return;}
  for(const [direction,[dx,dy]] of Object.entries(E.DIR)){
   const next=[position[0]+dx,position[1]+dy],cell=E.key(next);
   if(next.some(n=>n<0||n>=map.size)||map.obstacles.includes(cell)||seen.has(cell))continue;
   visit(next,[...path,direction],new Set([...seen,cell]));
  }
 }
 visit(map.start,[],new Set([E.key(map.start)]));
 assert.ok(routes.length>1);
 const viable=routes.filter(route=>E.evaluate(map,route).outcome==='won');
 assert.deepEqual(viable,[['R','U','U','U','R','R']]);
 assert.ok(routes.some(route=>E.evaluate(map,route).outcome==='energy'));
 assert.equal(E.solve({...map,energy:{...map.energy,chargers:[]}}),null);
 assert.equal(P.get('home',4).size,5);
});

test('prediction comes before the top-right house, followed by the trees',()=>{
 assert.equal(T.find('3').variants[0].type,'predict');
 const prediction=T.find('3').variants[0];
 assert.deepEqual(prediction.program,['U','U','R']);
 assert.equal(E.evaluate(prediction.map,prediction.program).outcome,'won');
 const v=T.find('4').variants[0],map=C.get(v.index,v.stage);
 assert.equal(map.size,3);assert.equal(map.goalIcon,'🏡');
 assert.deepEqual(map.start,[0,2]);assert.deepEqual(map.goal,[2,0]);
 assert.equal(E.solve(map).length,4);
 assert.equal(T.find('5').variants[0].stage,'one-tree');
 assert.equal(T.activities.some(a=>a.variants.some(v=>v.type==='detective')),false);
});
