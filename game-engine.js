(function(root){
 'use strict';
 const DIR={U:[0,-1],D:[0,1],L:[-1,0],R:[1,0]};
 const ARROW={U:'↑',D:'↓',L:'←',R:'→'};
 const NAME={U:'sus',D:'jos',L:'stânga',R:'dreapta'};
 const key=p=>p.join(',');
 const same=(a,b)=>a[0]===b[0]&&a[1]===b[1];
 function firstMap(){return {size:5,start:[0,4],goal:[4,0],obstacles:['1,0','1,1','1,2','3,2','3,3','4,3'],label:'Harta de început'};}
 const MISSIONS=[
  {id:'battery',title:'Prima baterie',brief:'Două săgeți spre dreapta. Robo își găsește energia!',size:3,start:[0,2],goal:[2,2],obstacles:[],goalIcon:'🔋',goalName:'baterie'},
  {id:'flower',title:'Floarea de pe deal',brief:'Schimbăm direcția! Ajută-l pe Robo să găsească floarea.',size:3,start:[0,2],goal:[1,0],obstacles:[],goalIcon:'🌼',goalName:'floare'},
  {id:'bridge',title:'Ocolim copacul',brief:'Doi copaci sunt în drum. Pe unde îi putem ocoli?',size:4,start:[0,3],goal:[2,1],obstacles:['1,3','0,1'],goalIcon:'⭐',goalName:'stea'},
  {id:'key-treasure',title:'Cheia și comoara',brief:'Mai întâi luăm cheia. Apoi mergem la cufăr și deschidem comoara!',size:5,start:[0,4],keyPosition:[4,0],goal:[4,4],obstacles:['1,3','1,2','3,1','3,3'],goalIcon:'💎',goalName:'cufăr'}
 ];
 function mission(index){
  const source=MISSIONS[index];
  if(!source)throw new RangeError('Misiune necunoscută.');
  return {...source,start:[...source.start],goal:[...source.goal],...(source.keyPosition?{keyPosition:[...source.keyPosition]}:{}),obstacles:[...source.obstacles],label:'Misiunea '+(index+1)+' · '+source.size+'×'+source.size};
 }
 function readProgress(raw){
  try{
   const data=JSON.parse(raw);
   if(!data||!Number.isInteger(data.completed)||data.completed<0)return 0;
   // V1 had six missions. Only its first three are unchanged; the new finale must be played.
   if(data.version===1&&data.completed<=6)return Math.min(data.completed,3);
   return data.version===2&&data.completed<=MISSIONS.length?data.completed:0;
  }catch{return 0;}
 }
 function step(map,position,command,hasKey=false){
  if(!Object.hasOwn(DIR,command))return {ok:false,reason:'command',position:[...position],hasKey};
  const delta=DIR[command],next=[position[0]+delta[0],position[1]+delta[1]];
  if(next.some(v=>v<0||v>=map.size))return {ok:false,reason:'edge',position:[...position],hasKey};
  if(map.obstacles.includes(key(next)))return {ok:false,reason:'tree',position:[...position],hasKey};
  const collectedKey=Boolean(map.keyPosition&&!hasKey&&same(next,map.keyPosition));
  const nextHasKey=hasKey||collectedKey;
  if(map.keyPosition&&same(next,map.goal)&&!nextHasKey)return {ok:false,reason:'locked',position:[...position],hasKey};
  return {ok:true,position:next,hasKey:nextHasKey,collectedKey,won:same(next,map.goal)};
 }
 function solve(map,state={}){
  const start=state.position||map.start;
  const initialKey=Boolean(state.hasKey||(map.keyPosition&&same(start,map.keyPosition)));
  const stateKey=(p,hasKey)=>key(p)+'|'+Number(hasKey);
  const queue=[{p:start,path:[],hasKey:initialKey}],seen=new Set([stateKey(start,initialKey)]);
  for(let i=0;i<queue.length;i++){
   const {p,path,hasKey}=queue[i];if(same(p,map.goal)&&(!map.keyPosition||hasKey))return path;
   for(const d of ['R','U','L','D']){
    const s=step(map,p,d,hasKey);
    if(s.ok&&!seen.has(stateKey(s.position,s.hasKey))){seen.add(stateKey(s.position,s.hasKey));queue.push({p:s.position,path:[...path,d],hasKey:s.hasKey});}
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
  let p=[...map.start],hasKey=Boolean(map.keyPosition&&same(map.start,map.keyPosition));const trace=[p];
  for(let i=0;i<commands.length;i++){
   const s=step(map,p,commands[i],hasKey);
   if(!s.ok)return {outcome:s.reason,index:i,position:p,trace,hasKey};
   p=s.position;hasKey=s.hasKey;trace.push(p);
   if(s.won)return {outcome:'won',index:i,position:p,trace,hasKey};
  }
  return {outcome:'incomplete',index:commands.length,position:p,trace,hasKey};
 }
 function predictionRound(seed,size=3){
  const map=generate(seed,{size,minDistance:3});
  map.label='Oare unde se oprește?';
  return {map,commands:solve(map).slice(0,3)};
 }
 const API={DIR,ARROW,NAME,key,same,firstMap,step,solve,generate,evaluate,mission,missionCount:MISSIONS.length,readProgress,predictionRound};
 if(typeof module!=='undefined'&&module.exports)module.exports=API;else root.RoboEngine=API;
})(typeof window!=='undefined'?window:globalThis);
