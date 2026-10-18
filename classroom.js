(function(root){
 'use strict';
 const lesson=(title,index,stage)=>({title,type:'curriculum',index,stage});
 const pack=(title,name,index)=>({title,type:'pack',pack:name,index});
 const activities=[
  {id:'1',title:'Facem cunoștință cu Robo',minutes:7,icon:'🤖',notes:'Arătăm cele patru direcții cu mâna. Un copil alege săgeata, toți anticipăm, apoi pornim. Schimbăm copilul la fiecare încercare.',variants:[lesson('Un pas',0,'one'),lesson('Doi pași',0,'two')]},
  {id:'2',title:'Săgețile în ordine',minutes:7,icon:'↗',notes:'Un copil propune prima săgeată, altul pe următoarea. Clasa arată destinația înainte să testăm. Nu cerem viteză.',variants:[lesson('O schimbare de direcție',1,'bend'),lesson('Trei săgeți',1,'three')]},
  {id:'3',title:'Unde ajunge Robo?',minutes:6,icon:'🔎',notes:'Citirea programului: copiii urmăresc cu degetul două săgeți. Un copil atinge destinația. Încercăm câteva runde cu alți copii.',variants:[{title:'Anticipăm două săgeți',type:'predict'}]},
  {id:'4',title:'Detectivul Robo',minutes:8,icon:'🛠',notes:'Testăm greșeala fără grabă. Un copil arată săgeata, altul o înlocuiește. Explicăm reparația; celelalte cazuri sunt opționale.',variants:[0,1,2].map(index=>({title:'Cazul '+(index+1),type:'detective',index}))},
  {id:'5',title:'Ocolim copacul',minutes:7,icon:'🌲',notes:'Copiii arată două drumuri posibile. Construim un ocol, testăm, apoi alt copil poate propune altă soluție.',variants:[lesson('Un copac · 3×3',2,'one-tree'),lesson('Doi copaci · 4×4',2,'challenge')]},
  {id:'6',title:'Cheia, apoi comoara',minutes:8,icon:'🔑',notes:'Primul copil conduce până la cheie. Următorul continuă de acolo spre comoară. Pornește Robo execută doar comenzile noi.',variants:[lesson('Două etape scurte · 3×3',3,'nearby'),lesson('Un drum mai lung · 5×5',3,'challenge')]},
  {id:'7',title:'Coborâm podul',minutes:8,icon:'🌉',notes:'Mergem pe manetă, adăugăm Activează, apoi traversăm. Trei copii pot construi cele trei etape. Unde trebuie să fie Robo când activează?',variants:[lesson('Descoperim acțiunea · 3×3',4,'nearby'),lesson('Traversăm insula · 5×5',4,'challenge')]},
  {id:'8',title:'Pauză: noi suntem roboții!',minutes:5,icon:'🙌',notes:'Ne ridicăm. În perechi, unul arată o direcție, celălalt face un singur pas pe loc sau mimează. Schimbăm rolurile. Păstrăm spațiu între copii.',variants:[{title:'Mișcare în perechi',type:'break'}]},
  {id:'9',title:'Energia lui Robo',minutes:10,icon:'⚡',notes:'Numărăm liniuțele, facem un pas și observăm bateria. După demonstrația scurtă, alegem harta 5×5: planificăm drumul până la stație, apoi până acasă.',variants:[pack('Observăm bateria · 3×3','energy',0),pack('O oprire necesară · 5×5','energy',1),pack('Alegem stațiile · 5×5','energy',2),pack('Mai multe opriri · 5×5','energy',3)]},
  {id:'10',title:'Două drumuri, aceeași căsuță',minutes:7,icon:'🧩',notes:'Doi copii testează drumurile A și B. Numărăm săgețile împreună: ambele funcționează! Dacă preferăm, completăm o săgeată lipsă.',variants:[pack('Comparăm A și B','puzzles',2),pack('Completăm săgeata lipsă','puzzles',1),pack('Întâi vizităm steaua','puzzles',0)]},
  {id:'11',title:'Îngrijim o floare',minutes:8,icon:'🌱',notes:'Întâi mergem pe floare și udăm. Doar dacă mai avem atenție, alegem varianta DACĂ: clasa spune DA sau NU, apoi adultul apasă Verificăm răspunsul.',variants:[lesson('Mergem și udăm',5,'water'),lesson('DACĂ este o floare · opțional',5,'decision')]},
  {id:'12',title:'Misiunea echipei',minutes:9,icon:'🏡',notes:'Construim drumul pe bucăți, cu mai mulți copii. Toate cele patru direcții au un rol. Păstrăm ultimele 3 minute pentru „Ce am încercat? Ce am reparat?” și arătăm linkul pentru acasă.',variants:[lesson('Toate direcțiile · 5×5',2,'four-directions'),lesson('Spirala · 5×5',2,'spiral')]},
  {id:'loops',title:'Pași care se repetă',icon:'🔁',notes:'Extensie, numai dacă grupa este pregătită. Întâi urmărim săgețile simple, apoi observăm ce se repetă. Nu este necesară pentru sesiunea de 90 de minute.',variants:[pack('O săgeată de trei ori','loops',0),pack('O pereche de două ori','loops',1)]},
  {id:'garden',title:'Mai multe flori',icon:'🌷',notes:'Extensie. Alegem o singură dificultate nouă: un tipar, repetiția sau o condiție. Nu este necesar să parcurgem toate variantele.',variants:[lesson('Tiparul → Udă',5,'pattern'),lesson('Grupăm tiparul',5,'repeat'),lesson('Repetiție și condiție',5,'combine'),lesson('Grădina mare',5,'challenge')]},
  {id:'recipe',title:'O rețetă pentru mai multe rânduri',icon:'📖',notes:'Demonstrație opțională: același nume pornește aceleași patru comenzi. Observăm întâi un rând, apoi refolosim rețeta pe harta mare.',variants:[lesson('Un rând · 3×3',6,'one-row'),lesson('Trei rânduri · 5×5',6,'two-rows'),lesson('Două rânduri îndepărtate',6,'classic-two-rows')]},
  {id:'presentation',title:'Povestea ilustrată',icon:'🖼',notes:'Prezentarea existentă, pentru introducere sau recapitulare. Folosim selectorul de sus pentru a reveni la orice activitate.',variants:[{title:'Povestea lui Robo',type:'story'}]},
  {id:'sheet',title:'Fișa de explorator',icon:'✏',notes:'Un copil programează, celălalt urmărește cu un pion. Putem tipări fișa și schimba rolurile.',variants:[{title:'Lucrăm în perechi',type:'sheet'}]},
  {id:'free',title:'Fabrica de hărți',icon:'✨',notes:'O nouă hartă cu un drum verificat. Copiii propun un traseu împreună.',variants:[{title:'Hartă nouă',type:'free'},{title:'Harta originală',type:'original'}]}
 ];
 const questions={
  '1':'Arătați cu mâna: încotro este comoara?',
  '2':'Unde ajunge Robo dacă urmează săgețile în ordine?',
  '3':'Unde se oprește Robo? Arătați înainte să pornim.',
  '4':'Ce săgeată schimbăm ca să reparăm drumul?',
  '5':'Pe unde putem ocoli copacii?',
  '6':'Ce luăm înainte să deschidem comoara?',
  '7':'Unde trebuie să fie Robo când coborâm podul?',
  '8':'Poți urma o săgeată cu un singur pas?',
  '9':'Câte liniuțe rămân după un pas?',
  '10':'Ambele drumuri ajung acasă. Care are mai puține săgeți?',
  '11':'Unde trebuie să fie Robo ca să ude floarea?',
  '12':'Facem câțiva pași. Cum continuăm de aici?',
  loops:'Batem din palme de trei ori. Ce mișcare am repetat?',
  garden:'Ce comenzi se potrivesc aici? Le încercăm pe rând.',
  recipe:'Ce face Robo când îi cerem „Udă un rând”?',
  presentation:'Cum îl putem ajuta pe Robo?',
  sheet:'Pionul a urmat săgețile exact în ordinea aleasă?',
  free:'Arătăm drumul cu degetul. Care este primul pas?'
 };
 function find(id){return activities.find(a=>a.id===String(id));}
 function resolve(id,variant=0){const activity=find(id)||activities[0];const index=Number.isInteger(variant)&&variant>=0&&variant<activity.variants.length?variant:0;return {activity,index,variant:activity.variants[index]};}
 function question(id,variant=0){
  if(id==='9'&&variant>0)return 'Ne ajung liniuțele până la următoarea stație?';
  if(id==='10'&&variant===1)return 'Ce săgeată lipsește dintre cele două săgeți?';
  if(id==='10'&&variant===2)return 'Unde ne oprim înainte să mergem acasă?';
  if(id==='11'&&variant===1)return 'Aici este o floare? Spunem DA sau NU înainte să verificăm.';
  return questions[id]||'Unde credeți că va ajunge Robo?';
 }
 const api={activities,find,resolve,question};
 if(typeof module!=='undefined'&&module.exports)module.exports=api;else root.RoboClassroom=api;
})(typeof window!=='undefined'?window:globalThis);
