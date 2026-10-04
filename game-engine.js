(function(root){
 'use strict';
 const DIR={U:[0,-1],D:[0,1],L:[-1,0],R:[1,0]};
 const ARROW={U:'↑',D:'↓',L:'←',R:'→',A:'⚙',W:'💧',F:'🌱?'};
 const NAME={U:'sus',D:'jos',L:'stânga',R:'dreapta',A:'activează maneta',W:'udă floarea',F:'dacă este o floare aici, udă'};
 const key=p=>p.join(',');
 const same=(a,b)=>a[0]===b[0]&&a[1]===b[1];
 function firstMap(){return {size:5,start:[0,4],goal:[4,0],obstacles:['1,0','1,1','1,2','3,2','3,3','4,3'],label:'Harta de început'};}
 const MISSIONS=[
  {id:'battery',title:'Prima baterie',brief:'Două săgeți spre dreapta. Robo își găsește energia!',size:3,start:[0,2],goal:[2,2],obstacles:[],goalIcon:'🔋',goalName:'baterie'},
  {id:'flower',title:'Floarea de pe deal',brief:'Schimbăm direcția! Ajută-l pe Robo să găsească floarea.',size:3,start:[0,2],goal:[1,0],obstacles:[],goalIcon:'🌼',goalName:'floare'},
  {id:'bridge',title:'Ocolim copacul',brief:'Doi copaci sunt în drum. Pe unde îi putem ocoli?',size:4,start:[0,3],goal:[2,1],obstacles:['1,3','0,1'],goalIcon:'⭐',goalName:'stea'},
  {id:'key-treasure',title:'Cheia și comoara',brief:'Mai întâi luăm cheia. Apoi mergem la cufăr și deschidem comoara!',size:5,start:[0,4],keyPosition:[4,0],goal:[4,4],obstacles:['1,3','1,2','3,1','3,3'],goalIcon:'💎',goalName:'cufăr'},
  {id:'lever-bridge',title:'Podul și maneta',brief:'Mergi la manetă și adaugă „Activează”. Podul coboară! Traversează râul până la steag.',size:5,start:[0,4],goal:[4,2],obstacles:['3,2','4,4'],lever:[0,2],bridge:[2,3],water:['2,0','2,1','2,2','2,3','2,4'],goalIcon:'🏁',goalName:'steag',actions:['A']},
  {id:'flower-garden',title:'Grădina lui Robo',brief:'Udă cele trei flori ca să deschizi poarta. Încearcă să repeți „→, Udă” de 3 ori!',size:5,start:[0,3],goal:[4,2],obstacles:['0,2','1,2','2,2','3,2','4,4'],flowers:['1,3','2,3','3,3'],gate:[4,3],goalIcon:'🏡',goalName:'căsuța grădinarului',actions:['W'],allowRepeat:true,gardenStyle:'rows'},
  {id:'robo-recipe',title:'Rețeta lui Robo',brief:'O rețetă, două locuri! Folosește „Udă un rând” de la A, mergi la B și folosește aceeași rețetă din nou.',size:5,start:[0,4],goal:[4,1],obstacles:['1,2','2,2','3,2','4,2'],flowers:['1,4','2,4','1,1','2,1'],gate:[3,1],rowStarts:[{position:[0,4],name:'A'},{position:[0,1],name:'B'}],goalIcon:'📖',goalName:'cartea rețetelor',actions:['W'],recipes:{'water-row':{name:'Udă un rând',commands:['R','W','R','W']}}}
 ];
 function mission(index,{scattered=false}={}){
  const source=MISSIONS[index];
  if(!source)throw new RangeError('Misiune necunoscută.');
  const map={...JSON.parse(JSON.stringify(source)),label:'Misiunea '+(index+1)+' · '+source.size+'×'+source.size};
  if(index===5&&scattered){map.flowers=['1,3','3,3'];map.actions=['W','F'];map.allowDecision=true;map.gardenStyle='scattered';map.brief='Aceeași grădină, cu un loc gol. Repetăm „→, Dacă este floare → Udă”.';}
  return map;
 }
 const DETECTIVE_CASES=[
  {goal:[2,2],obstacles:[],goalIcon:'🔋',goalName:'baterie',commands:['R','U'],repairIndex:1,choices:['U','R']},
  {goal:[2,1],obstacles:['0,0'],goalIcon:'🌼',goalName:'floare',commands:['U','U','R'],repairIndex:1,choices:['R','U']},
  {goal:[2,0],obstacles:['1,1'],goalIcon:'⭐',goalName:'stea',commands:['R','R','D','U'],repairIndex:2,choices:['U','R']}
 ];
 function detectiveCase(index){
  const source=DETECTIVE_CASES[index];
  if(!source)throw new RangeError('Caz necunoscut.');
  const {commands,repairIndex,choices,...tiles}=JSON.parse(JSON.stringify(source));
  return {...tiles,size:3,start:[0,2],title:'Detectivul Robo',brief:'Îl ajutăm pe Robo să ajungă la '+source.goalName+'. Schimbăm o singură săgeată.',label:'Cazul '+(index+1)+' din '+DETECTIVE_CASES.length+' · 3×3',detective:{commands,repairIndex,choices}};
 }
 function readProgress(raw){
  try{
   const data=JSON.parse(raw);
   if(!data||!Number.isInteger(data.completed)||data.completed<0)return 0;
   // V1 had six missions. Only its first three are unchanged; the new finale must be played.
   if(data.version===1&&data.completed<=6)return Math.min(data.completed,3);
   if(data.version===2&&data.completed<=4)return data.completed;
   // The former eighth mission is now part of the garden; keep all seven existing completions.
   return data.version===3&&data.completed<=8?Math.min(data.completed,MISSIONS.length):0;
  }catch{return 0;}
 }
 function initialWorld(){return {bridgeOpen:false,watered:[]};}
 function copyWorld(world={}){return {bridgeOpen:Boolean(world.bridgeOpen),watered:[...(world.watered||[])]};}
 function gateOpen(map,world){return !map.flowers||map.flowers.every(p=>world.watered.includes(p));}
 function availableCommands(map){return [...(map.directions||Object.keys(DIR)),...(map.actions||[])];}
 // Repeats and named calls share an atomic cursor, so stopping never replays an action.
 function expand(program,maxSteps=32,recipes={}){
  if(!Array.isArray(program))throw Error('Program invalid.');
  if(program.length>maxSteps)throw Error('Sunt permise cel mult '+maxSteps+' comenzi executate, inclusiv repetițiile.');
  const plan=[];
  program.forEach((block,blockIndex)=>{
   const called=block&&typeof block==='object'&&Object.hasOwn(block,'call'),repeated=typeof block!=='string'&&!called;
   if(called&&(Object.keys(block).length!==1||typeof block.call!=='string'||!Object.hasOwn(recipes,block.call)))throw Error('Rețetă necunoscută pe această hartă.');
   if(repeated&&(!block||Object.keys(block).some(k=>!['repeat','commands'].includes(k))||![2,3].includes(block.repeat)||!Array.isArray(block.commands)||block.commands.length!==2))throw Error('Repetiția are două comenzi și se face de 2 sau 3 ori.');
   const body=called?recipes[block.call].commands:repeated?block.commands:[block],count=repeated?block.repeat:1;
   if(!Array.isArray(body)||!body.length||body.length>8)throw Error('Rețeta trebuie să conțină între 1 și 8 comenzi simple.');
   if(body.some(d=>typeof d!=='string'||!Object.hasOwn(ARROW,d)))throw Error('Comandă necunoscută.');
   if(plan.length+body.length*count>maxSteps)throw Error('Sunt permise cel mult '+maxSteps+' comenzi executate, inclusiv repetițiile.');
   for(let iteration=0;iteration<count;iteration++)body.forEach((command,bodyIndex)=>plan.push({command,blockIndex,iteration,count,bodyIndex,bodyLength:body.length,...(called?{call:block.call}:{})}));
  });
  return plan;
 }
 function cloneProgram(program){return program.map(b=>typeof b==='string'?b:Object.hasOwn(b,'call')?{call:b.call}:{repeat:b.repeat,commands:[...b.commands]});}
 function executedPrefix(program,executed,recipes={}){
  const result=[];let remaining=executed;
  for(const block of program){
   if(!remaining)break;
   const steps=expand([block],32,recipes);
   if(steps.length<=remaining){result.push(...cloneProgram([block]));remaining-=steps.length;}
   else{result.push(...steps.slice(0,remaining).map(s=>s.command));break;}
  }
  return result;
 }
 function step(map,position,command,hasKey=false,currentWorld=initialWorld()){
  const world=copyWorld(currentWorld);
  const fail=reason=>({ok:false,reason,position:[...position],hasKey,world});
  if(!availableCommands(map).includes(command))return fail('command');
  if(command==='F'){
   if(!map.allowDecision)return fail('command');
   const cell=key(position),matched=Boolean(map.flowers&&map.flowers.includes(cell)),alreadyWatered=matched&&world.watered.includes(cell);
   if(matched&&!alreadyWatered)world.watered.push(cell);
   return {ok:true,position:[...position],hasKey,world,decision:{matched,alreadyWatered},wateredFlower:matched&&!alreadyWatered,won:false};
  }
  if(command==='A'){
   if(!map.lever||!same(position,map.lever))return fail('lever');
   if(world.bridgeOpen)return fail('activated');
   world.bridgeOpen=true;
   return {ok:true,position:[...position],hasKey,world,activated:true,won:false};
  }
  if(command==='W'){
   const cell=key(position);
   if(!map.flowers||!map.flowers.includes(cell))return fail('flower');
   if(world.watered.includes(cell))return fail('watered');
   world.watered.push(cell);
   return {ok:true,position:[...position],hasKey,world,wateredFlower:true,won:false};
  }
  const delta=DIR[command],next=[position[0]+delta[0],position[1]+delta[1]];
  if(next.some(v=>v<0||v>=map.size))return fail('edge');
  if(map.obstacles.includes(key(next)))return fail('tree');
  if(map.water&&map.water.includes(key(next))&&!(map.bridge&&same(next,map.bridge)&&world.bridgeOpen))return fail(map.bridge&&same(next,map.bridge)?'bridge':'water');
  if(map.gate&&same(next,map.gate)&&!gateOpen(map,world))return fail('gate');
  const collectedKey=Boolean(map.keyPosition&&!hasKey&&same(next,map.keyPosition));
  const nextHasKey=hasKey||collectedKey;
  if(map.keyPosition&&same(next,map.goal)&&!nextHasKey)return fail('locked');
  if(same(next,map.goal)&&!gateOpen(map,world))return fail(map.gate?'gate':'flowers');
  return {ok:true,position:next,hasKey:nextHasKey,world,collectedKey,won:same(next,map.goal)};
 }
 function solve(map,state={}){
  const start=state.position||map.start;
  const initialKey=Boolean(state.hasKey||(map.keyPosition&&same(start,map.keyPosition)));
  const initial=copyWorld(state.world);
  const stateKey=(p,hasKey,world)=>key(p)+'|'+Number(hasKey)+'|'+Number(world.bridgeOpen)+'|'+[...world.watered].sort().join(';');
  const queue=[{p:start,path:[],hasKey:initialKey,world:initial}],seen=new Set([stateKey(start,initialKey,initial)]);
  for(let i=0;i<queue.length;i++){
   const {p,path,hasKey,world}=queue[i];if(same(p,map.goal)&&(!map.keyPosition||hasKey)&&gateOpen(map,world))return path;
   for(const d of ['R','U','L','D',...(map.actions||[])]){
    const s=step(map,p,d,hasKey,world);
    if(s.ok&&!seen.has(stateKey(s.position,s.hasKey,s.world))){seen.add(stateKey(s.position,s.hasKey,s.world));queue.push({p:s.position,path:[...path,d],hasKey:s.hasKey,world:s.world});}
   }
  }
  return null;
 }
 function seeded(seed){let x=seed>>>0;return ()=>{x+=0x6D2B79F5;let t=x;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;};}
 function generate(seed,options={}){
  const random=seeded(seed),size=[3,4,5].includes(options.size)?options.size:5;
  const minDistance=options.minDistance===3?3:size;
  const start=[Math.floor(random()*size),size-1],candidates=[];
  for(let y=0;y<size-2;y++)for(let x=0;x<size;x++)if(Math.abs(x-start[0])+Math.abs(y-start[1])>=minDistance)candidates.push([x,y]);
  const goal=candidates[Math.floor(random()*candidates.length)];
  const map={size,start,goal,obstacles:[],label:'Hartă nouă'};
  const cells=[];for(let y=0;y<size;y++)for(let x=0;x<size;x++)if(!same([x,y],start)&&!same([x,y],goal))cells.push([x,y]);
  for(let i=cells.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[cells[i],cells[j]]=[cells[j],cells[i]];}
  const wanted=size===3?0:size===4?2:6+Math.floor(random()*3);
  for(const c of cells){if(map.obstacles.length>=wanted)break;map.obstacles.push(key(c));const path=solve(map);if(!path||path.length>16)map.obstacles.pop();}
  return map;
 }
 function evaluate(map,commands){
  let p=[...map.start],hasKey=Boolean(map.keyPosition&&same(map.start,map.keyPosition)),world=initialWorld();const trace=[p],plan=expand(commands,32,map.recipes);
  for(let i=0;i<plan.length;i++){
   const s=step(map,p,plan[i].command,hasKey,world);
   if(!s.ok)return {outcome:s.reason,index:i,position:p,trace,hasKey,world};
   p=s.position;hasKey=s.hasKey;world=s.world;trace.push(p);
   if(s.won)return {outcome:'won',index:i,position:p,trace,hasKey,world};
  }
  return {outcome:'incomplete',index:plan.length,position:p,trace,hasKey,world};
 }
 function predictionRound(seed,size=3,length=3){
  const map=generate(seed,{size,minDistance:3});
  map.label='Oare unde se oprește?';
  return {map,commands:solve(map).slice(0,length===2?2:3)};
 }
 const API={DIR,ARROW,NAME,key,same,firstMap,step,solve,generate,evaluate,mission,missionCount:MISSIONS.length,detectiveCase,detectiveCount:DETECTIVE_CASES.length,readProgress,predictionRound,initialWorld,copyWorld,gateOpen,availableCommands,expand,cloneProgram,executedPrefix};
 if(typeof module!=='undefined'&&module.exports)module.exports=API;else root.RoboEngine=API;
})(typeof window!=='undefined'?window:globalThis);
