(function(){
 'use strict';
 const E=window.RoboEngine,$=id=>document.getElementById(id);
 let map=E.firstMap(),commands=[],position=[...map.start],visited=[],active=-1,busy=false,runToken=0,view='game',sceneIndex=0,generated=0,won=false,bump=null;
 let sheetMap=E.firstMap();
 const scenes=[
  {title:'Salut! Eu sunt Robo.',kicker:'1 · FACEM CUNOȘTINȚĂ',line:'Mă ajuți să ajung la comoară?',time:'2 minute',visual:'intro',action:'Să vedem harta',target:'first',notes:'Spune-le că lucrezi cu programe și verifici dacă ele fac ceea ce trebuie. Prezintă-l pe Robo ca pe personajul jocului. Copiii vor fi echipa care îi scrie instrucțiunile.',question:'Întreabă: „Ce credeți că trebuie să știe Robo ca să ajungă la comoară?”'},
  {title:'Robo înțelege săgeți.',kicker:'2 · ÎNVĂȚĂM LIMBAJUL',line:'O săgeată înseamnă un pătrățel.',time:'3 minute',visual:'arrows',action:'Încercăm două comenzi',target:'directions',notes:'Arată sus, jos, stânga și dreapta pe tablă. Direcțiile sunt cele de pe ecran; Robo nu trebuie rotit. Copiii pot arăta direcția cu mâna. Adaugă două săgeți și rulează-le.',question:'Întreabă: „Dacă vrem trei pătrățele la dreapta, câte săgeți punem?”'},
  {title:'Întâi gândim drumul.',kicker:'3 · SCRIEM UN PROGRAM',line:'Alegem săgețile. Apoi apăsăm Pornește.',time:'6 minute',visual:'map',action:'Programăm împreună',target:'first',notes:'Cere idei de la mai mulți copii. Un copil poate veni la tablă să introducă săgețile. Nu porni după fiecare comandă: construiți mai întâi o secvență. Acceptă orice drum corect, nu doar cel mai scurt.',question:'Întreabă: „Unde credeți că va fi Robo după primele trei comenzi?”'},
  {title:'O greșeală? O reparăm!',kicker:'4 · DETECTIVI DE GREȘELI',line:'Testăm, observăm și schimbăm o comandă.',time:'4 minute',visual:'bug',action:'Găsește greșeala',target:'bug',notes:'Butonul pregătește comenzile dreapta, sus, sus. La pasul 3, Robo întâlnește un copac. Cere copiilor să prezică rezultatul înainte de rulare. Explică faptul că și programatorii testează și repară.',question:'Întreabă: „La ce pas apare problema? Cum am putea ocoli copacul?”'},
  {title:'Cine construiește hărțile?',kicker:'5 · FABRICA DE HĂRȚI',line:'Scriem reguli o dată. Obținem multe hărți.',time:'4 minute',visual:'factory',action:'Inventăm o hartă',target:'generate',notes:'Apasă „Hartă nouă” de trei ori și cere copiilor să observe ce se schimbă. Spune că programul alege poziții după reguli și verifică dacă există un drum. Poți numi apoi ideea „generare procedurală”.',question:'Întreabă: „Ce s-a schimbat? Ce a rămas la fel?”'},
  {title:'Harta are nevoie de reguli.',kicker:'6 · COPIII ALEG REGULILE',line:'Un start, o comoară și un drum posibil.',time:'3 minute',visual:'rules',action:'Vedem regulile',target:'rules',notes:'Lasă copiii să propună reguli înainte de a deschide lista din joc. Ghidează-i spre trei reguli: start diferit de final, fără copaci peste ele și cel puțin un drum liber. Calculatorul respectă regulile pe care le programăm.',question:'Întreabă: „Dacă înconjurăm comoara cu copaci, mai putem termina misiunea?”'},
  {title:'Acum sunteți programatori!',kicker:'7 · MISIUNEA ÎN PERECHI',line:'Unul desenează săgețile. Celălalt mută pionul.',time:'8 minute',visual:'sheet',action:'Deschide fișa',target:'sheet',notes:'Oferă fiecărei perechi o fișă și un pion. Primul copil scrie întregul program, al doilea execută exact comenzile. Dacă întâlnesc un obstacol, se opresc și repară împreună. Apoi schimbă rolurile. Pentru o a doua încercare, tipărește altă hartă.',question:'Întreabă: „Pionul a urmat exact săgețile sau a ghicit ce voia colegul?”'},
  {title:'Am construit un mic joc.',kicker:'8 · CE LUĂM CU NOI',line:'Programarea ne ajută să dăm instrucțiuni și să inventăm lumi.',time:'2 minute',visual:'recap',action:'Încă o aventură',target:'generate',notes:'Recapitulează fără definiții de memorat: un program este o listă de instrucțiuni; îl verificăm și îl reparăm; putem scrie reguli care construiesc hărți. Felicită echipa pentru explicații și cooperare.',question:'Misiune pentru acasă: „Desenează o hartă nouă și roagă pe cineva să urmeze programul tău.”'}
 ];
 function boardHTML(m,p=m.start,path=[],bad=null){
  const visitedSet=new Set(path.map(E.key));let html='';
  for(let y=0;y<m.size;y++)for(let x=0;x<m.size;x++){
   const cell=[x,y],key=E.key(cell),isRobot=E.same(cell,p),isTree=m.obstacles.includes(key),isGoal=E.same(cell,m.goal);
   const label=isRobot?'Robo':isTree?'copac':isGoal?'comoară':'liber';
   const cls='tile'+(isTree?' tree':'')+(isGoal?' goal':'')+(visitedSet.has(key)?' visited':'')+(isRobot?' robot':'')+(isRobot&&isGoal?' win':'')+(bad===key?' bump':'');
   html+='<div class="'+cls+'" aria-label="Rândul '+(y+1)+', coloana '+(x+1)+': '+label+'"><span aria-hidden="true">'+(isRobot?'🤖':isTree?'🌲':isGoal?'💎':visitedSet.has(key)?'<span class="trace">•</span>':'')+'</span>'+(isGoal&&isRobot?'<span class="goal-star">★</span>':'')+'</div>';
  }return html;
 }
 function report(message,type=''){ $('status').textContent=message;$('status').className='status'+(type?' '+type:''); }
 function draw(){
  $('board').innerHTML=boardHTML(map,position,visited,bump);
  $('board').setAttribute('aria-label','Hartă cu 5 rânduri și 5 coloane. Robo: rândul '+(position[1]+1)+', coloana '+(position[0]+1)+'. Comoară: rândul '+(map.goal[1]+1)+', coloana '+(map.goal[0]+1)+'.');
  $('map-label').textContent=map.label;$('step-count').textContent=active>=0?'Pasul '+(active+1):'La start';
  $('queue').replaceChildren();commands.forEach((d,i)=>{const b=document.createElement('button');b.className=i===active?'active':'';b.innerHTML='<small>'+(i+1)+'</small>'+E.ARROW[d];b.setAttribute('aria-label','Șterge pasul '+(i+1)+': '+E.NAME[d]);b.disabled=busy;b.addEventListener('click',()=>{commands.splice(i,1);rewind();draw();report('Am șters o comandă. Putem testa din nou.');});$('queue').append(b);});
  $('command-count').textContent=commands.length+' / 32';
  document.querySelectorAll('[data-dir]').forEach(b=>b.disabled=busy||commands.length>=32);
  for(const id of ['undo','clear','restart','new-map','bug-map','first-map','solution','print-game'])$(id).disabled=busy||((id==='undo'||id==='clear')&&!commands.length);
  $('run').disabled=busy||!commands.length;$('stop').hidden=!busy;
 }
 function rewind(){position=[...map.start];visited=[];active=-1;won=false;bump=null;}
 function stop(){runToken++;busy=false;draw();report('Ne-am oprit. „Pornește Robo” reia programul de la start.');}
 function loadMap(m,program=[]){runToken++;busy=false;map=m;commands=[...program];rewind();draw();report(program.length?'Program pregătit. Unde credeți că va ajunge Robo?':'Alege săgețile. Robo le va urma în ordine.');}
 function freshMap(){generated++;let seed;const buf=new Uint32Array(1);if(window.crypto&&window.crypto.getRandomValues){crypto.getRandomValues(buf);seed=buf[0];}else seed=(Date.now()+generated*977)>>>0;let m=E.generate(seed);const fingerprint=x=>JSON.stringify([x.start,x.goal,x.obstacles]);if(fingerprint(m)===fingerprint(map))m=E.generate((seed+1)>>>0);m.label='Hartă inventată · '+generated;loadMap(m);report('O hartă nouă, după aceleași reguli. Există un drum până la comoară.');}
 function add(d){if(busy||commands.length>=32)return;commands.push(d);rewind();draw();report('Programul are '+commands.length+(commands.length===1?' comandă.':' comenzi.')+' Îl testăm când e gata.');}
 async function run(){
  if(busy||!commands.length)return;const token=++runToken;busy=true;rewind();draw();report('Robo urmează comenzile noastre…');
  for(let i=0;i<commands.length;i++){
   if(token!==runToken)return;active=i;draw();await new Promise(r=>setTimeout(r,600));if(token!==runToken)return;
   const result=E.step(map,position,commands[i]);
   if(!result.ok){busy=false;if(result.reason==='tree'){const delta=E.DIR[commands[i]];bump=E.key([position[0]+delta[0],position[1]+delta[1]]);}draw();report('Pasul '+(i+1)+': '+(result.reason==='tree'?'un copac ne blochează!':'am ieși de pe hartă!')+' Ce comandă schimbăm?','error');return;}
   visited.push([...position]);position=result.position;
   if(result.won){won=true;busy=false;draw();report('Comoara e a noastră! Am reușit în '+(i+1)+' pași.','success');return;}
   draw();
  }
  busy=false;draw();report('Comenzile s-au terminat. Ce săgeți mai adăugăm până la comoară?');
 }
 function showView(next){if(busy)stop();view=next;for(const name of ['game','story','sheet'])$(name+'-view').hidden=name!==next;document.querySelectorAll('[data-view]').forEach(b=>{b.classList.toggle('selected',b.dataset.view===next);b.setAttribute('aria-pressed',String(b.dataset.view===next));});if(next==='story')renderScene();if(next==='sheet')renderSheet();}
 function worksheet(m){return '<article class="worksheet"><h2>Misiunea de explorator</h2><p>Condu robotul până la comoară. Ocolește copacii.</p><div class="team">Echipa: ______________________________</div><div class="board" role="img" aria-label="Hartă pentru fișa de explorator">'+boardHTML(m)+'</div><p class="roles">① Desenează săgețile. ② Colegul mută pionul. ③ Schimbați rolurile.</p><b>Programul nostru</b><div class="sheet-queue">'+Array.from({length:16},(_,i)=>'<span>'+(i+1)+'</span>').join('')+'</div><div class="check"><span>□ Am testat.</span><span>□ Am reparat.</span><span>□ Am ajuns!</span></div><p class="roles">Misiune bonus: inventează pe verso o hartă cu un drum posibil.</p></article>';}
 function renderSheet(){$('sheet-preview').innerHTML=worksheet(sheetMap);}
 function printMap(m){$('print-area').innerHTML=worksheet(m);$('print-area').setAttribute('aria-hidden','false');window.print();}
 function renderScene(){
  const s=scenes[sceneIndex];$('scene-counter').textContent='Scena '+(sceneIndex+1)+' din '+scenes.length;$('scene-time').textContent=s.time;$('scene-kicker').textContent=s.kicker;$('scene-title').textContent=s.title;$('scene-line').textContent=s.line;$('scene-action').textContent=s.action;$('scene-notes').textContent=s.notes;$('scene-question').textContent=s.question;
  let html='';const first=E.firstMap();
  if(s.visual==='intro')html='<img src="assets/robot-treasure-island.png" alt="Un robot prietenos ține o hartă pe o insulă, lângă un cufăr cu comori." width="1536" height="1024">';
  else if(s.visual==='arrows')html='<div class="arrow-demo">'+['U','D','L','R'].map(d=>'<div><strong>'+E.ARROW[d]+'</strong>'+E.NAME[d]+'</div>').join('')+'</div>';
  else if(s.visual==='map'||s.visual==='bug'){const p=s.visual==='bug'?[1,3]:first.start;html='<div class="board">'+boardHTML(first,p,[],s.visual==='bug'?'1,2':null)+'</div>';if(s.visual==='bug')html+='<div class="mini-program"><span>→</span><span>↑</span><span class="bad">↑</span></div>';}
  else if(s.visual==='factory')html='<div class="map-factory">'+[11,23,37,51].map(seed=>'<div class="board">'+boardHTML(E.generate(seed))+'</div>').join('')+'</div>';
  else if(s.visual==='rules')html='<div class="rule-cards"><div><b>1</b><span>Start și comoară în locuri diferite</span></div><div><b>2</b><span>Copaci doar pe locuri libere</span></div><div><b>3</b><span>Cel puțin un drum posibil</span></div></div>';
  else if(s.visual==='sheet')html='<div class="sheet-preview">'+worksheet(first)+'</div>';
  else html='<div class="recap"><div><span>🧭</span>Dăm instrucțiuni.</div><div><span>🔎</span>Testăm și reparăm.</div><div><span>🗺️</span>Inventăm hărți.</div></div>';
  $('scene-visual').innerHTML=html;$('previous').disabled=sceneIndex===0;$('next').disabled=sceneIndex===scenes.length-1;
  $('story-dots').replaceChildren();scenes.forEach((_,i)=>{const b=document.createElement('button');b.textContent=i+1;b.setAttribute('aria-label','Scena '+(i+1));b.setAttribute('aria-pressed',String(i===sceneIndex));b.className=i===sceneIndex?'active':'';b.addEventListener('click',()=>{sceneIndex=i;renderScene();});$('story-dots').append(b);});
 }
 function sceneAction(){const target=scenes[sceneIndex].target;if(target==='sheet'){sheetMap=E.firstMap();showView('sheet');return;}showView('game');if(target==='first')loadMap(E.firstMap());else if(target==='directions')loadMap(E.firstMap(),['R','R']);else if(target==='bug')loadMap(E.firstMap(),['R','U','U']);else if(target==='generate')freshMap();else if(target==='rules')document.querySelector('.rules').open=true;}
 document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>showView(b.dataset.view)));
 document.querySelector('.brand').addEventListener('click',e=>{e.preventDefault();showView('game');});
 document.querySelectorAll('[data-dir]').forEach(b=>b.addEventListener('click',()=>add(b.dataset.dir)));
 $('run').addEventListener('click',run);$('stop').addEventListener('click',stop);
 $('clear').addEventListener('click',()=>{commands=[];rewind();draw();report('Un program nou. Ce săgeată alegem prima?');});
 $('undo').addEventListener('click',()=>{commands.pop();rewind();draw();report('Am scos ultima comandă.');});
 $('restart').addEventListener('click',()=>{rewind();draw();report('Robo este la start. Programul a rămas pregătit.');});
 $('new-map').addEventListener('click',freshMap);$('bug-map').addEventListener('click',()=>{loadMap(E.firstMap(),['R','U','U']);report('Detectivi, găsiți greșeala înainte să porniți Robo!');});$('first-map').addEventListener('click',()=>loadMap(E.firstMap()));
 $('solution').addEventListener('click',()=>{commands=E.solve(map)||[];rewind();draw();report('Acesta este un drum posibil. Îl putem urmări pas cu pas.');});
 $('print-game').addEventListener('click',()=>printMap(map));$('print-sheet').addEventListener('click',()=>printMap(sheetMap));$('refresh-sheet').addEventListener('click',()=>{sheetMap=E.generate((Date.now()+generated++)>>>0);renderSheet();});
 $('previous').addEventListener('click',()=>{if(sceneIndex>0){sceneIndex--;renderScene();}});$('next').addEventListener('click',()=>{if(sceneIndex<scenes.length-1){sceneIndex++;renderScene();}});$('scene-action').addEventListener('click',sceneAction);
 $('fullscreen').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else throw Error('unavailable');}catch{if(view!=='game')showView('game');report('Pentru ecran complet poți folosi F11 în browser.');}});
 document.addEventListener('fullscreenchange',()=>{$('fullscreen').textContent=document.fullscreenElement?'Ieși din ecran complet':'Ecran complet';});
 document.addEventListener('keydown',e=>{if(/INPUT|TEXTAREA|SELECT/.test(e.target.tagName)||e.ctrlKey||e.metaKey||e.altKey)return;const keys={ArrowUp:'U',ArrowDown:'D',ArrowLeft:'L',ArrowRight:'R'};if(view==='game'&&keys[e.key]){e.preventDefault();add(keys[e.key]);}else if(view==='story'&&(e.key==='ArrowLeft'||e.key==='ArrowRight')){e.preventDefault();sceneIndex=Math.max(0,Math.min(7,sceneIndex+(e.key==='ArrowRight'?1:-1)));renderScene();}});
 window.addEventListener('afterprint',()=>{$('print-area').setAttribute('aria-hidden','true');});
 draw();renderSheet();
 const context=document.modelContext;
 if(context&&typeof context.registerTool==='function'){
  const lifecycle=new AbortController();window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
  const tool={name:'stage_robo_program',title:'Pregătește programul robotului',description:'Înlocuiește comenzile vizibile ale robotului. Nu pornește animația.',inputSchema:{type:'object',properties:{commands:{type:'array',items:{type:'string',enum:['U','D','L','R']},maxItems:32}},required:['commands'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(input){if(busy)throw Error('Robotul este în mișcare.');if(!input||Object.keys(input).some(k=>k!=='commands')||!Array.isArray(input.commands)||input.commands.length>32||input.commands.some(d=>typeof d!=='string'||!Object.hasOwn(E.DIR,d)))throw Error('Sunt permise cel mult 32 de comenzi U, D, L, R.');commands=[...input.commands];rewind();showView('game');draw();report('Program pregătit. Apasă Pornește Robo pentru test.');return {commands:[...commands],prediction:E.evaluate(map,commands).outcome};}};
  try{Promise.resolve(context.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{});}catch{}
 }
})();
