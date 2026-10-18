(function(root){
 'use strict';
 const base={size:3,start:[0,2],goal:[2,2],obstacles:[],goalIcon:'🏡',goalName:'căsuță'};
 const battery=(chargers)=>({capacity:4,chargers});
 const packs={
  home:{title:'Acasă cu Robo',icon:'🏡',description:'Șase misiuni scurte, împreună cu un adult.',maps:[
   {id:'turn',title:'Schimbăm direcția',goal:[1,1],brief:'Un pas la dreapta, un pas în sus.'},
   {id:'missing',title:'Ce săgeată lipsește?',goal:[2,1],missing:{index:1,program:['R','R','R']},brief:'→ ? →. Alege săgeata din mijloc, apoi testăm.'},
   {id:'key',title:'Cheia și comoara',keyPosition:[1,1],goalIcon:'💎',goalName:'comoară',pauseAfterKey:true,brief:'Luăm cheia, apoi deschidem comoara.'},
   {id:'bridge',title:'Coborâm podul',goal:[2,1],lever:[0,1],bridge:[1,1],water:['1,0','1,1','1,2'],actions:['A'],pauseAfterAction:true,brief:'Mergem la manetă. Activăm. Trecem podul.'},
   {id:'charge',title:'Oprire la stația de energie',size:5,start:[0,4],goal:[4,0],energy:battery(['2,2']),brief:'Patru liniuțe până la stație. Ne încărcăm și continuăm acasă.'},
   {id:'home',title:'Ultima oprire, apoi acasă',stops:['1,0'],brief:'Vizităm steaua, apoi ajungem la căsuță.'}
  ]},
  energy:{title:'Energia lui Robo',icon:'⚡',description:'Observăm bateria, apoi alegem unde ne încărcăm.',maps:[
   {id:'observe',title:'Bateria lui Robo',goal:[2,1],energy:battery(['2,2']),pauseAfterCharge:true,brief:'Un pas folosește o liniuță. La stație umplem bateria.'},
   {id:'recharge',title:'O oprire pentru energie',size:4,start:[0,3],goal:[3,0],obstacles:['0,2','2,1'],energy:battery(['1,1']),brief:'Sunt mai multe drumuri spre casă. Pe care ne ajunge bateria?'},
   {id:'choose',title:'La ce stație mergem?',size:5,start:[0,4],goal:[4,0],energy:battery(['0,2','2,2','4,2']),brief:'Alege stațiile. Ne ajung liniuțele până la următoarea?'},
   {id:'journey',title:'Călătoria cu mai multe opriri',size:5,start:[0,4],goal:[4,0],obstacles:['0,3','1,3','2,3','3,3','1,1','2,1','3,1','4,1'],energy:battery(['4,4','4,2','0,2','0,0']),brief:'Urmăm drumul. Ne încărcăm înainte să continuăm.'}
  ]},
  loops:{title:'Pași care se repetă',icon:'🔁',description:'Întâi o săgeată, apoi o pereche.',maps:[
   {id:'arrow',title:'De trei ori la dreapta',size:4,start:[0,3],goal:[3,3],allowRepeat:true,repeatBodyLength:1,repeatCount:3,brief:'Punem →. O repetăm de 3 ori: → → →.'},
   {id:'stairs',title:'Urcăm treptele',start:[0,2],goal:[2,0],obstacles:['0,0','0,1','2,2'],allowRepeat:true,repeatBodyLength:2,repeatCount:2,brief:'Punem → ↑. Repetăm perechea de 2 ori.'}
  ]},
  puzzles:{title:'Mici descoperiri',icon:'🧩',description:'O oprire, o săgeată lipsă și două drumuri.',maps:[
   {id:'visit',title:'Întâi la stea',stops:['1,0'],brief:'Vizităm steaua, apoi ajungem la căsuță.'},
   {id:'missing',title:'Ce săgeată lipsește?',goal:[2,1],missing:{index:1,program:['R','R','R']},brief:'→ ? →. Alege săgeata din mijloc, apoi testăm.'},
   {id:'compare',title:'Două drumuri spre casă',goal:[2,1],routes:[{name:'A',commands:['U','R','R']},{name:'B',commands:['U','U','R','R','D']}],brief:'Testăm ambele drumuri. Care are mai puțini pași?'}
  ]}
 };
 function get(pack,index){
  if(!packs[pack]||!packs[pack].maps[index])throw Error('Aventură necunoscută.');
  const m=JSON.parse(JSON.stringify({...base,...packs[pack].maps[index]}));
  m.label=packs[pack].title+' · '+(index+1)+' din '+packs[pack].maps.length+' · '+m.size+'×'+m.size;
  return m;
 }
 function readProgress(raw,pack){
  const fallback={version:1,done:[],current:0};
  try{const p=JSON.parse(raw),ids=packs[pack].maps.map(m=>m.id);if(!p||p.version!==1||!Array.isArray(p.done))return fallback;
   const done=[...new Set(p.done.filter(id=>ids.includes(id)))];
   return {version:1,done,current:Number.isInteger(p.current)&&p.current>=0&&p.current<ids.length?p.current:0};
  }catch{return fallback;}
 }
 function next(pack,progress){const index=packs[pack].maps.findIndex(m=>!progress.done.includes(m.id));return index<0?0:index;}
 const api={packs,get,readProgress,next};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.RoboAdventures=api;
})(typeof window!=='undefined'?window:globalThis);
