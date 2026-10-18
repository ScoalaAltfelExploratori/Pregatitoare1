(function(root){
 'use strict';
 const lesson=(title,index,stage)=>({title,type:'curriculum',index,stage});
 const pack=(title,name,index)=>({title,type:'pack',pack:name,index});
 const activities=[
  {id:'1',title:'Facem cunoștință cu Robo',icon:'🤖',notes:'O săgeată, un pas. Încercăm pe rând, apoi adăugăm încă o săgeată.',variants:[lesson('Un pas',0,'one'),lesson('Doi pași',0,'two')]},
  {id:'2',title:'Încercăm și reparăm',icon:'↶',notes:'Testăm → ↓. Robo face primul pas, apoi se oprește la margine. Atingem ↓ ca s-o ștergem, adăugăm → și continuăm din locul în care a ajuns.',variants:[{title:'Robo rămâne pe hartă',type:'repair',program:['R','D'],map:{size:3,start:[0,2],goal:[2,2],obstacles:[],goalIcon:'💎',goalName:'comoară',repairIntro:true,brief:'Robo merge →, apoi ↓. Are loc pentru al doilea pas?'}}]},
  {id:'3',title:'Unde ajunge Robo?',icon:'🔎',notes:'Urmărim săgețile și alegem locul unde credem că se va opri Robo.',variants:[{title:'Sus, sus, dreapta',type:'predict',program:['U','U','R'],map:{size:3,start:[0,2],goal:[1,0],obstacles:[],goalIcon:'💎',goalName:'comoară',label:'Oare unde se oprește?'}}]},
  {id:'4',title:'Săgețile în ordine',icon:'↗',notes:'Căsuța este în colțul din dreapta sus. Arătăm drumul, alegem patru săgeți și încercăm.',variants:[lesson('Spre colțul de sus · 3×3',1,'bend')]},
  {id:'5',title:'Ocolim copacul',icon:'🌲',notes:'Un copac este în mijloc, iar altul blochează drumul de jos. Pe unde putem trece?',variants:[lesson('Doi copaci · 3×3',2,'one-tree'),lesson('Doi copaci · 4×4',2,'challenge')]},
  {id:'6',title:'Drumul spre casă',icon:'🏡',notes:'Folosim toate direcțiile. Fiecare copil poate adăuga o bucată din drum.',variants:[lesson('Toate direcțiile · 5×5',2,'four-directions'),lesson('Comoara din mijloc · 5×5',2,'spiral')]},
  {id:'7',title:'Cheia, apoi comoara',icon:'🔑',notes:'Mergem întâi la cheie. Alt copil poate continua de acolo până la comoară.',variants:[lesson('Cheia e aproape · 3×3',3,'nearby'),lesson('Un drum mai lung · 5×5',3,'challenge')]},
  {id:'8',title:'Coborâm podul',icon:'🌉',notes:'Ajungem la manetă și apăsăm Activează. Acum putem traversa râul.',variants:[lesson('Primul pod · 3×3',4,'nearby'),lesson('Traversăm insula · 5×5',4,'challenge')]},
  {id:'9',title:'Două drumuri spre casă',icon:'🧩',notes:'Încercăm ambele drumuri și numărăm pașii. Care este mai scurt?',variants:[pack('Drumul A și drumul B','puzzles',2),pack('Săgeata lipsă','puzzles',1),pack('O oprire la stea','puzzles',0)]},
  {id:'10',title:'Udăm o floare',icon:'🌱',notes:'Mergem pe floare, o udăm, apoi continuăm spre căsuță.',variants:[lesson('Prima floare',5,'water')]},
  {id:'11',title:'Pași care se repetă',icon:'🔁',notes:'Robo face același lucru de mai multe ori. Încercăm întâi cu săgeți, apoi cu Repetă.',variants:[pack('O săgeată de trei ori','loops',0),pack('Două săgeți, de două ori','loops',1)]},
  {id:'12',title:'Mai multe flori',icon:'🌷',notes:'Mergem, udăm, mergem, udăm. Putem repeta aceste două comenzi?',variants:[lesson('Udăm pe rând',5,'pattern'),lesson('Repetăm → și Udă',5,'repeat'),lesson('Trei flori',5,'challenge')]},
  {id:'13',title:'Udă un rând',icon:'📖',notes:'Punem un nume celor patru comenzi: →, Udă, →, Udă. Un singur buton le adaugă pe toate.',variants:[lesson('Un rând · 3×3',6,'one-row')]},
  {id:'14',title:'Rândurile A, B și C',icon:'🌼',notes:'Folosim Udă un rând la A, apoi la B și la C. După ce udăm toate florile, mergem acasă.',variants:[lesson('Trei rânduri · 5×5',6,'two-rows'),lesson('Două rânduri îndepărtate',6,'classic-two-rows')]},
  {id:'15',title:'Dacă este o floare',icon:'🌱',notes:'Robo verifică locul pe care se află. Dacă vede o floare, o udă. Dacă nu, urmează comanda următoare.',variants:[lesson('Este floare aici?',5,'decision'),lesson('Repetăm și verificăm',5,'combine')]},
  {id:'16',title:'Oprire la stația de energie',icon:'⚡',notes:'Fiecare pas consumă o liniuță. Ajungem la stație, umplem bateria și continuăm spre căsuță.',variants:[pack('Drumul cu stație · 4×4','energy',1)]}
 ];
 const questions={
  '1':'Încotro este comoara?',
  '2':'Robo merge la dreapta, apoi în jos. Are unde să pășească?',
  '3':'Unde se oprește Robo? Arătați înainte să pornim.',
  '4':'Unde ajunge Robo dacă urmează aceste săgeți?',
  '5':'Pe unde putem ocoli copacii?',
  '6':'Am ajuns până aici. Cum continuăm?',
  '7':'Ce ne trebuie ca să deschidem comoara?',
  '8':'Unde trebuie să ajungem ca să coborâm podul?',
  '9':'Care drum are mai puțini pași?',
  '10':'Unde trebuie să fie Robo ca să ude floarea?',
  '11':'Ce pas se repetă?',
  '12':'Ce două comenzi folosim pentru fiecare floare?',
  '13':'Ce face Robo când apăsăm „Udă un rând”?',
  '14':'Am udat rândul A. Cum ajungem la B?',
  '15':'Este o floare aici? Ce va face Robo?',
  '16':'Ne ajunge bateria până acasă? Unde ne putem încărca?'
 };
 function find(id){return activities.find(a=>a.id===String(id));}
 function findByType(type){return activities.find(a=>a.variants.some(v=>v.type===type));}
 function title(activity){return activity.id+'. '+activity.title;}
 function variantTitle(activity,index){return activity.id+'.'+(index+1)+'. '+activity.variants[index].title;}
 function curriculumTitle(index,stage){
  for(const activity of activities){
   const variant=activity.variants.findIndex(v=>v.type==='curriculum'&&v.index===index&&v.stage===stage);
   if(variant>=0)return activity.variants.length>1?variantTitle(activity,variant):title(activity);
  }
  return '';
 }
 function resolve(id,variant=0){const activity=find(id)||activities[0];const index=Number.isInteger(variant)&&variant>=0&&variant<activity.variants.length?variant:0;return {activity,index,variant:activity.variants[index]};}
 function question(id,variant=0){
  if(String(id)==='9'&&variant===1)return 'Ce săgeată lipsește?';
  if(String(id)==='9'&&variant===2)return 'Unde ne oprim înainte să mergem acasă?';
  return questions[id]||'Unde credeți că va ajunge Robo?';
 }
 const api={activities,find,findByType,resolve,question,title,variantTitle,curriculumTitle};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.RoboClassroom=api;
})(typeof window!=='undefined'?window:globalThis);
