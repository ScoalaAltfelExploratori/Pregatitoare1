const {test}=require('node:test');
const assert=require('node:assert/strict');
const E=require('../game-engine');
const C=require('../curriculum');

test('toate etapele sunt rezolvabile, iar primele exemple au cel mult șase pași',()=>{
 const expected=[[1,2],[2,3],[3,4],[4,12],[4,9],[3,6,6,3,7,8],[5,15]];
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
 assert.deepEqual(E.availableCommands(C.get(0)),['R']);
 assert.equal(E.step(C.get(0),[0,2],'U').reason,'command');
});

test('anticiparea simplă oferă două deplasări legale, fără obstacole',()=>{
 for(let seed=0;seed<100;seed++){
  const round=E.predictionRound(seed,3,2),result=E.evaluate(round.map,round.commands);
  assert.equal(round.commands.length,2);assert.equal(round.map.obstacles.length,0);
  assert.equal(result.trace.length,3);
 }
});
