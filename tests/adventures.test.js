const {test}=require('node:test');
const assert=require('node:assert/strict');
const E=require('../game-engine');
const P=require('../adventures');

test('every adventure is solvable, ends at a house or treasure and keeps all directions',()=>{
 for(const pack of Object.keys(P.packs))for(let i=0;i<P.packs[pack].maps.length;i++){
  const m=P.get(pack,i),solution=E.solve(m);assert.ok(solution,m.id);assert.ok(solution.length<=32,m.id);assert.equal(E.evaluate(m,solution).outcome,'won',m.id);
  assert.ok(['🏡','💎'].includes(m.goalIcon));assert.deepEqual(E.availableCommands(m).slice(0,4),['U','D','L','R']);
 }
 assert.equal(P.packs.home.maps.length,6);
});
test('energy costs only valid movement, not blocked moves or stationary actions',()=>{
 const m={...P.get('energy',0),obstacles:['0,1'],lever:[0,2],actions:['A']},world=E.initialWorld(m);
 for(const d of ['U','L','D']){const r=E.step(m,m.start,d,false,world);assert.equal(r.ok,false);assert.equal(r.world.energy,4);}
 const action=E.step(m,m.start,'A',false,world);assert.equal(action.world.energy,4);assert.equal(world.bridgeOpen,false);
 const moved=E.step(m,m.start,'R',false,world);assert.equal(moved.world.energy,3);assert.equal(world.energy,4);
});
test('last segment reaches charger or goal, but zero energy cannot move',()=>{
 const m=P.get('energy',1),world={...E.initialWorld(m),energy:1};
 const charge=E.step(m,[1,2],'R',false,world);assert.equal(charge.recharged,true);assert.equal(charge.world.energy,4);
 const win=E.step(m,[3,0],'R',false,world);assert.equal(win.won,true);assert.equal(win.world.energy,0);
 const zero=E.step(m,[1,2],'R',false,{...world,energy:0});assert.equal(zero.ok,false);assert.equal(zero.reason,'energy');assert.deepEqual(zero.position,[1,2]);
});
test('harder energy maps require recharging and solver includes remaining energy in its state',()=>{
 for(let i=1;i<4;i++){const m=P.get('energy',i);assert.ok(E.solve(m));assert.equal(E.solve({...m,energy:{capacity:4,chargers:[]}}),null);}
 const m=P.get('energy',1);assert.equal(E.solve(m,{position:[1,2],world:{...E.initialWorld(m),energy:0}}),null);
 assert.ok(E.solve(m,{position:[1,2],world:{...E.initialWorld(m),energy:1}}));
});
test('visiting a stop unlocks the house and survives copying and a multi-run route',()=>{
 const m=P.get('puzzles',0);assert.equal(E.evaluate(m,['R','R']).outcome,'stop');
 const path=E.solve(m),result=E.evaluate(m,path);assert.equal(result.outcome,'won');assert.deepEqual(result.world.stops,['1,0']);
 const copied=E.copyWorld(result.world);copied.stops.length=0;assert.deepEqual(result.world.stops,['1,0']);
});
test('simple repetitions expand to visible movement and both comparison routes are valid',()=>{
 assert.equal(E.evaluate(P.get('loops',0),[{repeat:3,commands:['R']}]).outcome,'won');
 assert.equal(E.evaluate(P.get('loops',1),[{repeat:2,commands:['R','U']}]).outcome,'won');
 const m=P.get('puzzles',2);assert.deepEqual(m.routes.map(r=>E.evaluate(m,r.commands).outcome),['won','won']);assert.deepEqual(m.routes.map(r=>r.commands.length),[3,5]);
});
test('progress rejects corrupt values and does not mix packs',()=>{
 for(const raw of ['broken','null','{"version":2,"done":[]}'])assert.deepEqual(P.readProgress(raw,'home'),{version:1,done:[],current:0});
 assert.deepEqual(P.readProgress('{"version":1,"done":["first","first","observe",null],"current":99}','home'),{version:1,done:['first'],current:0});
 assert.equal(P.next('home',{done:['first','turn']}),2);
});
