(function(root){
 'use strict';
 const DIR={U:[0,-1],D:[0,1],L:[-1,0],R:[1,0]};
 const ARROW={U:'↑',D:'↓',L:'←',R:'→'};
 const NAME={U:'sus',D:'jos',L:'stânga',R:'dreapta'};
 const key=p=>p.join(',');
 const same=(a,b)=>a[0]===b[0]&&a[1]===b[1];
 function firstMap(){return {size:5,start:[0,4],goal:[4,0],obstacles:['1,0','1,1','1,2','3,2','3,3','4,3'],label:'Harta de început'};}
 function step(map,position,command){
  if(!Object.hasOwn(DIR,command))return {ok:false,reason:'command',position:[...position]};
  const delta=DIR[command],next=[position[0]+delta[0],position[1]+delta[1]];
  if(next.some(v=>v<0||v>=map.size))return {ok:false,reason:'edge',position:[...position]};
  if(map.obstacles.includes(key(next)))return {ok:false,reason:'tree',position:[...position]};
  return {ok:true,position:next,won:same(next,map.goal)};
 }
 function solve(map){
  const queue=[{p:map.start,path:[]}],seen=new Set([key(map.start)]);
  for(let i=0;i<queue.length;i++){
   const {p,path}=queue[i];if(same(p,map.goal))return path;
   for(const d of ['R','U','L','D']){const s=step(map,p,d);if(s.ok&&!seen.has(key(s.position))){seen.add(key(s.position));queue.push({p:s.position,path:[...path,d]});}}
  }
  return null;
 }
 function seeded(seed){let x=seed>>>0;return ()=>{x+=0x6D2B79F5;let t=x;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return ((t^t>>>14)>>>0)/4294967296;};}
 function generate(seed){
  const random=seeded(seed),size=5;
  const start=[Math.floor(random()*5),4],candidates=[];
  for(let y=0;y<3;y++)for(let x=0;x<5;x++)if(Math.abs(x-start[0])+Math.abs(y-start[1])>=5)candidates.push([x,y]);
  const goal=candidates[Math.floor(random()*candidates.length)];
  const map={size,start,goal,obstacles:[],label:'Hartă nouă'};
  const cells=[];for(let y=0;y<size;y++)for(let x=0;x<size;x++)if(!same([x,y],start)&&!same([x,y],goal))cells.push([x,y]);
  for(let i=cells.length-1;i>0;i--){const j=Math.floor(random()*(i+1));[cells[i],cells[j]]=[cells[j],cells[i]];}
  const wanted=6+Math.floor(random()*3);
  for(const c of cells){if(map.obstacles.length>=wanted)break;map.obstacles.push(key(c));const path=solve(map);if(!path||path.length>16)map.obstacles.pop();}
  return map;
 }
 function evaluate(map,commands){
  let p=[...map.start];const trace=[p];
  for(let i=0;i<commands.length;i++){const s=step(map,p,commands[i]);if(!s.ok)return {outcome:s.reason,index:i,position:p,trace};p=s.position;trace.push(p);if(s.won)return {outcome:'won',index:i,position:p,trace};}
  return {outcome:'incomplete',index:commands.length,position:p,trace};
 }
 const API={DIR,ARROW,NAME,key,same,firstMap,step,solve,generate,evaluate};
 if(typeof module!=='undefined'&&module.exports)module.exports=API;else root.RoboEngine=API;
})(typeof window!=='undefined'?window:globalThis);
