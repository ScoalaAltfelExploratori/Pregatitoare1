(function(root){
 'use strict';
 const E=typeof module!=='undefined'&&module.exports?require('./game-engine.js'):root.RoboEngine;
 const lessons=[
  {group:'Bază',stages:[
   {id:'one',name:'O singură săgeată',brief:'Alege →. Pornește și observă: o săgeată mută Robo un pătrățel.',observe:'Copilul arată căsuța în care va ajunge Robo după o săgeată.',changes:{goal:[1,2],directions:['R']}},
   {id:'two',name:'Două săgeți',brief:'Arată drumul cu degetul. Punem două săgeți, apoi pornim.',observe:'Copilul leagă două săgeți de două deplasări.',changes:{directions:['R']}}
  ]},
  {group:'Bază',stages:[
   {id:'bend',name:'Schimbăm direcția',brief:'Întâi →, apoi ↑. Unde ajunge Robo? Arătăm înainte să pornim.',observe:'Copilul urmărește în ordine două direcții pe ecran; Robo nu se rotește.',changes:{goal:[1,1],directions:['R','U']}},
   {id:'three',name:'Trei săgeți',brief:'Arătăm drumul până la floare. Alegem trei săgeți, apoi verificăm.',observe:'Copilul poate arăta unde se oprește Robo după primele două săgeți.',changes:{directions:['R','U']}}
  ]},
  {group:'Bază',stages:[
   {id:'one-tree',name:'Un singur copac',brief:'Copacul blochează drumul. Îl ocolim cu săgețile pe care le știm.',observe:'Copilul explică de ce nu putem merge prin copac și arată un ocol.',changes:{size:3,start:[0,2],goal:[2,1],obstacles:['1,2'],directions:['R','U']}}
  ],challenge:{id:'challenge',name:'Provocare: doi copaci',observe:'Încercăm harta mai mare numai după ce copilul poate explica ocolul.'}},
  {group:'Continuare',stages:[
   {id:'nearby',name:'Cheia este aproape',brief:'Mergem → ↑ până la cheie. Ne oprim să observăm, apoi continuăm → ↓ la cufăr.',observe:'Copilul spune ce luăm întâi și observă că a doua pornire păstrează cheia.',changes:{size:3,start:[0,2],keyPosition:[1,1],goal:[2,2],obstacles:[],pauseAfterKey:true}}
  ],challenge:{id:'challenge',name:'Provocare: comoara îndepărtată',observe:'Construim traseul lung în bucăți; nu cerem memorarea celor 12 pași.'}},
  {group:'Continuare',stages:[
   {id:'nearby',name:'O acțiune schimbă harta',brief:'Mergem ↑ pe manetă și alegem ⚙ Activează. Observăm podul, apoi trecem → →.',observe:'Copilul deosebește deplasarea de acțiune: maneta funcționează când executăm ⚙.',changes:{size:3,start:[0,2],goal:[2,1],obstacles:[],lever:[0,1],bridge:[1,1],water:['1,0','1,1','1,2'],pauseAfterAction:true}}
  ],challenge:{id:'challenge',name:'Provocare: podul îndepărtat',observe:'Copilul planifică drumul până la manetă și apoi traversarea.'}},
  {group:'Continuare',stages:[
   {id:'water',name:'Udăm o floare',brief:'Mergem → pe floare, alegem 💧 Udă, apoi → spre căsuță.',observe:'Copilul observă că săgeata mută Robo, iar Udă schimbă floarea.',changes:{size:3,start:[0,2],goal:[2,2],obstacles:[],flowers:['1,2'],gate:null,allowRepeat:false,gardenStyle:null}},
   {id:'pattern',name:'Observăm ce se repetă',brief:'Udăm două flori cu → 💧 → 💧. Ce pereche apare de două ori? Apoi → ↑ prin poartă.',observe:'Copilul identifică perechea →, Udă înainte să îi arătăm blocul de repetiție.',changes:{size:4,start:[0,2],goal:[3,1],obstacles:['0,1','1,1','2,1'],flowers:['1,2','2,2'],gate:[3,2],allowRepeat:false,gardenStyle:null}},
   {id:'repeat',name:'Repetăm perechea',extension:true,brief:'Aceeași grădină. Grupăm → și 💧 Udă de 2 ori; adăugăm → ↑.',observe:'Copilul poate desfășura oral repetiția în →, Udă, →, Udă.',changes:{size:4,start:[0,2],goal:[3,1],obstacles:['0,1','1,1','2,1'],flowers:['1,2','2,2'],gate:[3,2],allowRepeat:true,repeatCount:2,gardenStyle:null}},
   {id:'decision',name:'Verificăm: este floare?',extension:true,brief:'Încercăm 🌱? pe locul gol. Apoi →, 🌱? pe floare și → la căsuță. Spunem NU sau DA.',observe:'Copilul explică DA pe floare și NU pe gol. Adultul apasă Verificăm când clasa este pregătită.',changes:{size:3,start:[0,2],goal:[2,2],obstacles:[],flowers:['1,2'],gate:null,actions:['F'],allowDecision:true,allowRepeat:false,gardenStyle:null}},
   {id:'combine',name:'Repetăm și verificăm',extension:true,scattered:true,brief:'Acum combinăm: repetăm de 3 ori → și 🌱?. Vedem DA, NU, DA; apoi → ↑ prin poartă.',observe:'Copilul anticipează ce face aceeași regulă pe floare și pe locul gol.',changes:{gardenStyle:null,repeatCount:3}}
  ],challenge:{id:'challenge',name:'Provocare: trei flori la rând',observe:'Putem relua modelul cunoscut cu trei repetări.'}},
  {group:'Extensie',stages:[
   {id:'one-row',name:'Un nume pentru pași cunoscuți',brief:'Rețeta „Udă un rând” înseamnă → 💧 → 💧. O folosim o dată, apoi ↑ spre carte.',observe:'Copilul arată cele patru comenzi ascunse în numele rețetei.',changes:{size:3,start:[0,2],goal:[2,1],obstacles:[],flowers:['1,2','2,2'],gate:null,rowStarts:[{position:[0,2],name:'A'}]}},
   {id:'two-rows',name:'Aceeași rețetă în două locuri',brief:'Folosim rețeta la A. Mergem ← ← ↑ ↑ ↑ până la B și o folosim din nou. La final → →.',observe:'Copilul recunoaște aceeași secvență refolosită din altă poziție; adultul ajută la traseul lung.'}
  ]}
 ];
 function choices(index){const l=lessons[index];if(!l)throw Error('Lecție necunoscută.');return [...l.stages,...(l.challenge?[l.challenge]:[])].map(s=>({id:s.id,name:s.name,extension:!!s.extension}));}
 function get(index,stageId){
  const lesson=lessons[index];if(!lesson)throw Error('Lecție necunoscută.');
  const stages=[...lesson.stages,...(lesson.challenge?[lesson.challenge]:[])];
  const stage=stages.find(s=>s.id===stageId)||lesson.stages[0],at=lesson.stages.indexOf(stage);
  const map=E.mission(index,{scattered:!!stage.scattered});
  Object.assign(map,JSON.parse(JSON.stringify(stage.changes||{})));
  if(stage.brief)map.brief=stage.brief;
  map.lesson={index,stage:stage.id,name:stage.name,group:stage.extension?'Extensie':lesson.group,number:at+1,count:lesson.stages.length,next:at>=0&&at<lesson.stages.length-1?lesson.stages[at+1].id:null,observe:stage.observe,challenge:at<0};
  map.label=map.lesson.group+' · '+(at<0?'Provocare':(at+1)+' / '+lesson.stages.length)+' · '+map.size+'×'+map.size;
  return map;
 }
 function readCheckpoints(raw){
  try{const parsed=JSON.parse(raw);if(!parsed||parsed.version!==1||!parsed.stages||typeof parsed.stages!=='object')return {};
   const result={};lessons.forEach((l,i)=>{if(l.stages.some(s=>s.id===parsed.stages[i]))result[i]=parsed.stages[i];});return result;
  }catch{return {};}
 }
 const API={get,choices,readCheckpoints,count:lessons.length};
 if(typeof module!=='undefined'&&module.exports)module.exports=API;else root.RoboLessons=API;
})(typeof window!=='undefined'?window:globalThis);
