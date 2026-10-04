const {test}=require('node:test');
const assert=require('node:assert/strict');
const E=require('../game-engine');
const C=require('../curriculum');

test('toate etapele sunt rezolvabile, iar primele exemple au cel mult șase pași',()=>{
 const expected=[[1,2],[2,3],[3,4,12,16],[4,12],[4,9],[3,6,6,3,7,8],[5,22,15]];
 for(let i=0;i<C.count;i++){
  const lengths=C.choices(i).map(choice=>{
   const m=C.get(i,choice.id),path=E.solve(m);
   assert.ok(path);assert.equal(E.evaluate(m,path).outcome,'won');
   assert.ok(path.every(c=>E.availableCommands(m).includes(c)));
   assert.equal(m.lesson.stage,choice.id);
   assert.ok(m.lesson.observe.length>20);
   return path.length;
  });
  assert.deepEqual(lengths,expected[i]);
 }
 assert.deepEqual(C.get(2,'challenge').obstacles,['1,3','0,1']);
 assert.equal(C.get(5,'water').allowRepeat,false);
 assert.equal(C.get(5,'decision').allowRepeat,false);
 assert.equal(C.get(5,'combine').allowRepeat,true);
 assert.equal(C.get(5,'combine').allowDecision,true);
});

test('etapele sunt independente, iar checkpointurile acceptă numai etape cunoscute',()=>{
 const changed=C.get(5,'pattern');changed.flowers.pop();changed.lesson.name='alt';
 assert.equal(C.get(5,'pattern').flowers.length,2);
 assert.notEqual(C.get(5,'pattern').lesson.name,'alt');
 assert.deepEqual(C.readCheckpoints('{"version":1,"stages":{"0":"two","5":"decision","3":"challenge","6":"unknown"}}'),{0:'two',5:'decision'});
 for(const raw of ['',null,'null','{}','{"version":2,"stages":{"0":"two"}}'])assert.deepEqual(C.readCheckpoints(raw),{});
 assert.equal(C.get(0,'inexistent').lesson.stage,'one');
 assert.deepEqual(E.availableCommands(C.get(0)),Object.keys(E.DIR));
 assert.equal(E.step(C.get(0),[0,2],'U').ok,true);
});

test('anticiparea simplă oferă două deplasări legale, fără obstacole',()=>{
 for(let seed=0;seed<100;seed++){
  const round=E.predictionRound(seed,3,2),result=E.evaluate(round.map,round.commands);
  assert.equal(round.commands.length,2);assert.equal(round.map.obstacles.length,0);
  assert.equal(result.trace.length,3);
  assert.equal(result.outcome,'won');
 }
});

test('ambele poteci 5×5 cer toate direcțiile, nu doar le permit',()=>{
 for(const id of ['four-directions','spiral']){
  const m=C.get(2,id);
  assert.equal(m.size,5);
  assert.deepEqual(new Set(E.solve(m)),new Set(Object.keys(E.DIR)));
  for(const omitted of Object.keys(E.DIR)){
   const queue=[m.start],seen=new Set([E.key(m.start)]);
   for(let i=0;i<queue.length;i++)for(const d of Object.keys(E.DIR).filter(d=>d!==omitted)){
    const result=E.step(m,queue[i],d);
    if(result.ok&&!seen.has(E.key(result.position))){seen.add(E.key(result.position));queue.push(result.position);}
   }
   assert.equal(seen.has(E.key(m.goal)),false,id+' fără '+omitted);
  }
 }
});

test('lecțiile, detectivul și jocul liber au comoară sau căsuță și toate direcțiile',()=>{
 const maps=[E.firstMap(),E.generate(42),...Array.from({length:E.detectiveCount},(_,i)=>E.detectiveCase(i)),...Array.from({length:C.count},(_,i)=>C.choices(i).map(c=>C.get(i,c.id))).flat()];
 for(const m of maps){
  assert.ok(['💎','🏡'].includes(m.goalIcon),m.title);
  assert.deepEqual(E.availableCommands(m).filter(d=>E.DIR[d]),Object.keys(E.DIR));
 }
});
