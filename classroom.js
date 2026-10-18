(function(root){
 'use strict';
 const lesson=(title,index,stage)=>({title,type:'curriculum',index,stage});
 const pack=(title,name,index)=>({title,type:'pack',pack:name,index});
 const activities=[
  {id:'1',title:'Facem cunoștință cu Robo',icon:'🤖',notes:'O săgeată, un pas. Încercăm pe rând, apoi adăugăm încă o săgeată.',variants:[lesson('Un pas',0,'one'),lesson('Doi pași',0,'two')]},
  {id:'2',title:'Săgețile în ordine',icon:'↗',notes:'Alegem două săgeți. Unde ajunge Robo dacă le schimbăm ordinea?',variants:[lesson('O schimbare de direcție',1,'bend'),lesson('Trei săgeți',1,'three')]},
  {id:'3',title:'Unde ajunge Robo?',icon:'🔎',notes:'Urmărim săgețile și alegem locul unde credem că se va opri Robo.',variants:[{title:'Două săgeți',type:'predict'}]},
  {id:'4',title:'Detectivul Robo',icon:'🛠',notes:'O săgeată este greșită. O găsim, o schimbăm și încercăm din nou.',variants:[0,1,2].map(index=>({title:'Cazul '+(index+1),type:'detective',index}))},
  {id:'5',title:'Ocolim copacul',icon:'🌲',notes:'Copacul ne stă în cale. Pe unde putem trece?',variants:[lesson('Un copac · 3×3',2,'one-tree'),lesson('Doi copaci · 4×4',2,'challenge')]},
  {id:'6',title:'Cheia, apoi comoara',icon:'🔑',notes:'Mergem întâi la cheie. Alt copil poate continua de acolo până la comoară.',variants:[lesson('Cheia e aproape · 3×3',3,'nearby'),lesson('Un drum mai lung · 5×5',3,'challenge')]},
  {id:'7',title:'Coborâm podul',icon:'🌉',notes:'Ajungem la manetă și apăsăm Activează. Acum putem traversa râul.',variants:[lesson('Primul pod · 3×3',4,'nearby'),lesson('Traversăm insula · 5×5',4,'challenge')]},
  {id:'8',title:'Noi suntem roboții!',icon:'🙌',notes:'Facem o pauză. Un copil arată o direcție, celălalt face un pas. Apoi schimbăm rolurile.',variants:[{title:'Mișcare în perechi',type:'break'}]},
  {id:'9',title:'Două drumuri spre casă',icon:'🧩',notes:'Încercăm ambele drumuri și numărăm pașii. Care este mai scurt?',variants:[pack('Drumul A și drumul B','puzzles',2),pack('Săgeata lipsă','puzzles',1),pack('O oprire la stea','puzzles',0)]},
  {id:'10',title:'Udăm o floare',icon:'🌱',notes:'Mergem pe floare, o udăm, apoi continuăm spre căsuță.',variants:[lesson('Prima floare',5,'water')]},
  {id:'11',title:'Pași care se repetă',icon:'🔁',notes:'Robo face același lucru de mai multe ori. Încercăm întâi cu săgeți, apoi cu Repetă.',variants:[pack('O săgeată de trei ori','loops',0),pack('Două săgeți, de două ori','loops',1)]},
  {id:'12',title:'Mai multe flori',icon:'🌷',notes:'Mergem, udăm, mergem, udăm. Putem repeta aceste două comenzi?',variants:[lesson('Udăm pe rând',5,'pattern'),lesson('Repetăm → și Udă',5,'repeat'),lesson('Trei flori',5,'challenge')]},
  {id:'13',title:'Udă un rând',icon:'📖',notes:'Punem un nume celor patru comenzi: →, Udă, →, Udă. Un singur buton le adaugă pe toate.',variants:[lesson('Un rând · 3×3',6,'one-row')]},
  {id:'14',title:'Rândurile A, B și C',icon:'🌼',notes:'Folosim Udă un rând la A, apoi la B și la C. După ce udăm toate florile, mergem acasă.',variants:[lesson('Trei rânduri · 5×5',6,'two-rows'),lesson('Două rânduri îndepărtate',6,'classic-two-rows')]},
  {id:'15',title:'Dacă este o floare',icon:'🌱',notes:'Robo verifică locul pe care se află. Dacă vede o floare, o udă. Dacă nu, urmează comanda următoare.',variants:[lesson('Este floare aici?',5,'decision'),lesson('Repetăm și verificăm',5,'combine')]},
  {id:'16',title:'Drumul spre casă',icon:'🏡',notes:'Folosim toate direcțiile. Fiecare copil poate adăuga o bucată din drum.',variants:[lesson('Toate direcțiile · 5×5',2,'four-directions'),lesson('Comoara din mijloc · 5×5',2,'spiral')]}
 ];
 const questions={
  '1':'Încotro este comoara?',
  '2':'Unde ajunge Robo dacă urmează aceste săgeți?',
  '3':'Unde se oprește Robo? Arătați înainte să pornim.',
  '4':'Ce săgeată trebuie schimbată?',
  '5':'Pe unde putem ocoli copacul?',
  '6':'Ce ne trebuie ca să deschidem comoara?',
  '7':'Unde trebuie să ajungem ca să coborâm podul?',
  '8':'Poți urma o săgeată cu un singur pas?',
  '9':'Care drum are mai puțini pași?',
  '10':'Unde trebuie să fie Robo ca să ude floarea?',
  '11':'Ce pas se repetă?',
  '12':'Ce două comenzi folosim pentru fiecare floare?',
  '13':'Ce face Robo când apăsăm „Udă un rând”?',
  '14':'Am udat rândul A. Cum ajungem la B?',
  '15':'Este o floare aici? Ce va face Robo?',
  '16':'Am ajuns până aici. Cum continuăm?'
 };
 function find(id){return activities.find(a=>a.id===String(id));}
 function resolve(id,variant=0){const activity=find(id)||activities[0];const index=Number.isInteger(variant)&&variant>=0&&variant<activity.variants.length?variant:0;return {activity,index,variant:activity.variants[index]};}
 function question(id,variant=0){
  if(String(id)==='9'&&variant===1)return 'Ce săgeată lipsește?';
  if(String(id)==='9'&&variant===2)return 'Unde ne oprim înainte să mergem acasă?';
  return questions[id]||'Unde credeți că va ajunge Robo?';
 }
 const api={activities,find,resolve,question};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.RoboClassroom=api;
})(typeof window!=='undefined'?window:globalThis);
