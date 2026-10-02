(function(){
 'use strict';
 const E=window.RoboEngine,A=window.RoboAudio,$=id=>document.getElementById(id);
 const progressKey='robo-explorator-progress-v1';
 let completed=0;
 try{completed=E.readProgress(localStorage.getItem(progressKey));}catch{}
 let missionIndex=Math.min(completed,E.missionCount-1);
 let map=E.mission(missionIndex),commands=[],position=[...map.start],visited=[],active=-1,busy=false,runToken=0,view='game',sceneIndex=0,generated=0,won=false,bump=null;
 let mode='program',guess=null,predictionDone=false,savedProgram=null,boardSignature='',motionTimer,hasKey=false,executed=0;
 let sheetMap=E.mission(missionIndex);
 const scenes=[
  {title:'Salut! Eu sunt Robo.',kicker:'1 · FACEM CUNOȘTINȚĂ',line:'Mă ajuți să ajung la comoară?',time:'2 minute',visual:'intro',action:'Să vedem harta',target:'first',notes:'Spune-le că lucrezi cu programe și verifici dacă ele fac ceea ce trebuie. Prezintă-l pe Robo ca pe personajul jocului. Copiii vor fi echipa care îi scrie instrucțiunile.',question:'Întreabă: „Ce credeți că trebuie să știe Robo ca să ajungă la comoară?”'},
  {title:'Robo înțelege săgeți.',kicker:'2 · ÎNVĂȚĂM LIMBAJUL',line:'O săgeată înseamnă un pătrățel.',time:'3 minute',visual:'arrows',action:'Încercăm două comenzi',target:'directions',notes:'Arată sus, jos, stânga și dreapta pe tablă. Direcțiile sunt cele de pe ecran; Robo nu trebuie rotit. Copiii pot arăta direcția cu mâna. Adaugă două săgeți și rulează-le.',question:'Întreabă: „Dacă vrem trei pătrățele la dreapta, câte săgeți punem?”'},
  {title:'Întâi gândim drumul.',kicker:'3 · SCRIEM UN PROGRAM',line:'Alegem săgețile. Apoi apăsăm Pornește.',time:'6 minute',visual:'map',action:'Programăm împreună',target:'first',notes:'Cere idei de la mai mulți copii. Un copil poate veni la tablă să introducă săgețile. Nu porni după fiecare comandă: construiți mai întâi o secvență. Acceptă orice drum corect, nu doar cel mai scurt.',question:'Întreabă: „Unde credeți că va fi Robo după primele două comenzi?”'},
  {title:'O greșeală? O reparăm!',kicker:'4 · DETECTIVI DE GREȘELI',line:'Testăm, observăm și schimbăm o comandă.',time:'4 minute',visual:'bug',action:'Găsește greșeala',target:'bug',notes:'Butonul pregătește comenzile dreapta, sus, sus. La pasul 3, Robo întâlnește un copac. Cere copiilor să prezică rezultatul înainte de rulare. Explică faptul că și programatorii testează și repară.',question:'Întreabă: „La ce pas apare problema? Cum am putea ocoli copacul?”'},
  {title:'Cine construiește hărțile?',kicker:'5 · FABRICA DE HĂRȚI',line:'Scriem reguli o dată. Obținem multe hărți.',time:'4 minute',visual:'factory',action:'Inventăm o hartă',target:'generate',notes:'Apasă „Hartă nouă” de trei ori și cere copiilor să observe ce se schimbă. Spune că programul alege poziții după reguli și verifică dacă există un drum. Poți numi apoi ideea „generare procedurală”.',question:'Întreabă: „Ce s-a schimbat? Ce a rămas la fel?”'},
  {title:'Harta are nevoie de reguli.',kicker:'6 · COPIII ALEG REGULILE',line:'Un start, o comoară și un drum posibil.',time:'3 minute',visual:'rules',action:'Vedem regulile',target:'rules',notes:'Lasă copiii să propună reguli înainte de a deschide lista din joc. Ghidează-i spre trei reguli: start diferit de final, fără copaci peste ele și cel puțin un drum liber. Calculatorul respectă regulile pe care le programăm.',question:'Întreabă: „Dacă înconjurăm comoara cu copaci, mai putem termina misiunea?”'},
  {title:'Acum sunteți programatori!',kicker:'7 · MISIUNEA ÎN PERECHI',line:'Unul desenează săgețile. Celălalt mută pionul.',time:'8 minute',visual:'sheet',action:'Deschide fișa',target:'sheet',notes:'Oferă fiecărei perechi o fișă și un pion. Primul copil scrie întregul program, al doilea execută exact comenzile. Dacă întâlnesc un obstacol, se opresc și repară împreună. Apoi schimbă rolurile. Pentru o a doua încercare, tipărește altă hartă.',question:'Întreabă: „Pionul a urmat exact săgețile sau a ghicit ce voia colegul?”'},
  {title:'Am construit un mic joc.',kicker:'8 · CE LUĂM CU NOI',line:'Programarea ne ajută să dăm instrucțiuni și să inventăm lumi.',time:'2 minute',visual:'recap',action:'Încă o aventură',target:'generate',notes:'Recapitulează fără definiții de memorat: un program este o listă de instrucțiuni; îl verificăm și îl reparăm; putem scrie reguli care construiesc hărți. Felicită echipa pentru explicații și cooperare.',question:'Misiune pentru acasă: „Desenează o hartă nouă și roagă pe cineva să urmeze programul tău.”'}
 ];
 function goalHTML(m,opened=false){
  if(!m.keyPosition)return m.goalIcon||'💎';
  return '<svg class="chest-icon" viewBox="0 0 64 64" aria-hidden="true"><path d="'+(opened?'M8 25L13 6H51L56 25Z':'M8 29V22Q8 11 19 11H45Q56 11 56 22V29Z')+'" fill="#e6ad40" stroke="#805326" stroke-width="3"/><rect x="8" y="29" width="48" height="25" rx="4" fill="#b96b35" stroke="#805326" stroke-width="3"/><path d="M18 30V52M46 30V52" stroke="#ffda70" stroke-width="6"/><rect x="26" y="26" width="12" height="14" rx="3" fill="#ffda70"/><circle cx="32" cy="32" r="2.5" fill="#805326"/>'+(opened?'<path d="M24 23L32 15L40 23L32 30Z" fill="#55d5ed" stroke="#147c83" stroke-width="2"/>':'')+'</svg>';
 }
 function lockBadge(unlocked=false){return '<span class="lock-badge" aria-hidden="true">'+(unlocked?'🔓':'🔒')+'</span>';}
 function boardHTML(m,p=m.start,path=[],bad=null){
  const visitedSet=new Set(path.map(E.key));let html='';
  for(let y=0;y<m.size;y++)for(let x=0;x<m.size;x++){
   const cell=[x,y],key=E.key(cell),isRobot=E.same(cell,p),isTree=m.obstacles.includes(key),isGoal=E.same(cell,m.goal),isKey=m.keyPosition&&E.same(cell,m.keyPosition);
   const label=isRobot?'Robo':isTree?'copac':isKey?'cheie':isGoal?(m.keyPosition?'cufăr încuiat':m.goalName||'comoară'):'liber';
   const cls='tile'+(isTree?' tree':'')+(isGoal?' goal':'')+(isKey?' key-item':'')+(visitedSet.has(key)?' visited':'')+(isRobot?' robot':'')+(isRobot&&isGoal?' win':'')+(bad===key?' bump':'');
   html+='<div class="'+cls+'" aria-label="Rândul '+(y+1)+', coloana '+(x+1)+': '+label+'"><span aria-hidden="true">'+(isRobot?'🤖':isTree?'🌲':isKey?'🔑':isGoal?goalHTML(m):visitedSet.has(key)?'<span class="trace">•</span>':'')+'</span>'+(isGoal&&m.keyPosition?lockBadge():'')+(isGoal&&isRobot?'<span class="goal-star">★</span>':'')+'</div>';
  }return html;
 }
 function report(message,type=''){ $('status').textContent=message;$('status').className='status'+(type?' '+type:''); }
 function limit(){return missionIndex===null||mode==='predict'?32:map.size===3?8:map.size===4?16:32;}
 function seed(){generated++;const buf=new Uint32Array(1);if(window.crypto&&window.crypto.getRandomValues){window.crypto.getRandomValues(buf);return buf[0];}return (Date.now()+generated*977)>>>0;}
 function placeRobot(animate=false){
  const tile=$('board').children[position[1]*map.size+position[0]];
  if(!tile)return;
  const actor=$('robo-token');
  actor.classList.toggle('moving',animate);
  actor.style.width=tile.offsetWidth+'px';actor.style.height=tile.offsetHeight+'px';
  actor.style.transform='translate('+tile.offsetLeft+'px,'+tile.offsetTop+'px)';
 }
 function mood(name){
  clearTimeout(motionTimer);
  $('robo-token').dataset.mood=name;
  if(name)motionTimer=setTimeout(()=>{$('robo-token').dataset.mood='';},1800);
 }
 function drawObjectives(){
  const hasObjectives=Boolean(map.keyPosition);
  $('mission-objectives').hidden=!hasObjectives;
  $('key-legend').hidden=!hasObjectives;
  $('key-legend').textContent=hasKey?'🔑 Cheie găsită':'🔑 Cheie';
  $('goal-legend').textContent=hasObjectives?(won?'💎 Cufăr deschis':hasKey?'🔓 Cufăr de deschis':'🔒 Cufăr încuiat'):(map.goalIcon||'💎')+' '+(map.goalName||'Comoară');
  $('key-objective').textContent=hasKey?'✓ Cheie găsită':'1. 🔑 Ia cheia';
  $('chest-objective').textContent=won?'✓ Cufăr deschis':'2. '+(hasKey?'🔓':'🔒')+' Deschide cufărul';
  $('key-objective').classList.toggle('complete',hasKey);
  $('chest-objective').classList.toggle('complete',won);
 }
 function drawBoard(animate=false){
  const board=$('board'),signature=JSON.stringify([map,mode]);
  board.style.setProperty('--board-size',map.size);
  if(signature!==boardSignature){
   boardSignature=signature;board.replaceChildren();
   for(let y=0;y<map.size;y++)for(let x=0;x<map.size;x++){
    const cell=document.createElement(mode==='predict'?'button':'div');
    if(mode==='predict'){
     cell.type='button';cell.addEventListener('click',()=>selectGuess([x,y]));
    }
    board.append(cell);
   }
  }
  const path=new Set(visited.map(E.key));
  Array.from(board.children).forEach((cell,i)=>{
   const p=[i%map.size,Math.floor(i/map.size)],key=E.key(p),robot=E.same(p,position),tree=map.obstacles.includes(key),goal=E.same(p,map.goal),chosen=guess&&E.same(p,guess),isKey=map.keyPosition&&!hasKey&&E.same(p,map.keyPosition);
   cell.className='tile'+(tree?' tree':'')+(goal?' goal'+(map.keyPosition?' chest-goal':''):'')+(isKey?' key-item':'')+(path.has(key)?' visited':'')+(robot?' robot':'')+(won&&robot?' win':'')+(bump===key?' bump':'')+(chosen?' guessed':'')+(predictionDone&&robot?' answer':'');
   cell.innerHTML='<span aria-hidden="true">'+(tree?'🌲':isKey?'🔑':goal?goalHTML(map,won):path.has(key)?'<span class="trace">•</span>':'')+'</span>'+(goal&&map.keyPosition?lockBadge(hasKey):'')+(chosen?'<span class="guess-pin" aria-hidden="true">📍</span>':'');
   const goalLabel=map.keyPosition?(won?'cufăr deschis':hasKey?'cufăr descuiat':'cufăr încuiat'):map.goalName||'comoară';
   cell.setAttribute('aria-label','Rândul '+(p[1]+1)+', coloana '+(p[0]+1)+': '+(robot?'Robo'+(goal?', '+goalLabel:''):tree?'copac':isKey?'cheie':goal?goalLabel:'liber')+(chosen?', alegerea noastră':'')+(predictionDone&&robot?', aici s-a oprit':'') );
   if(mode==='predict'){cell.disabled=busy||predictionDone||tree;cell.setAttribute('aria-pressed',String(!!chosen));}
  });
  board.setAttribute('aria-label','Hartă cu '+map.size+' rânduri și '+map.size+' coloane. Robo: rândul '+(position[1]+1)+', coloana '+(position[0]+1)+'. Destinație: rândul '+(map.goal[1]+1)+', coloana '+(map.goal[0]+1)+'.'+(map.keyPosition?(hasKey?' Cheia a fost găsită.':' Cheie: rândul '+(map.keyPosition[1]+1)+', coloana '+(map.keyPosition[0]+1)+'.'):''));
  drawObjectives();placeRobot(animate);
 }
 function drawTrail(){
  const signature=completed+':'+missionIndex+':'+mode;
  if($('mission-trail').dataset.state===signature)return;
  $('mission-trail').dataset.state=signature;$('mission-trail').style.setProperty('--mission-count',E.missionCount);$('mission-trail').replaceChildren();
  for(let i=0;i<E.missionCount;i++){
   const m=E.mission(i),button=document.createElement('button');
   button.className='mission-stop'+(i<completed?' complete':'')+(mode==='program'&&i===missionIndex?' current':'');
   button.disabled=i>completed;
   button.setAttribute('aria-label','Misiunea '+(i+1)+': '+m.title+(i<completed?', terminată':i>completed?', blocată':''));
   button.setAttribute('aria-current',String(mode==='program'&&i===missionIndex));
   button.innerHTML='<span class="mission-icon" aria-hidden="true">'+(i>completed?'🔒':m.goalIcon)+'</span><span class="mission-name">'+(i+1)+'. '+m.title+'</span><span class="mission-size">'+(i<completed?'✓ Gata':m.size+' × '+m.size)+'</span>';
   button.addEventListener('click',()=>startMission(i));$('mission-trail').append(button);
  }
  $('adventure-progress').textContent=completed+' din '+E.missionCount+' misiuni terminate';
 }
 function draw(animate=false){
  const predicting=mode==='predict';
  drawBoard(animate);drawTrail();
  $('map-label').textContent=map.label;$('step-count').textContent=busy&&active>=0?'Pasul '+(active+1):executed?executed+(executed===1?' pas făcut':' pași făcuți'):'La start';
  $('game-title').textContent=predicting?'Unde se oprește Robo?':map.title||'Condu-l pe Robo la comoară.';
  $('activity-label').textContent=predicting?'GHICIM ȘI VERIFICĂM':missionIndex===null?'JOACĂ LIBERĂ':'MISIUNEA '+(missionIndex+1);
  $('mission-brief').textContent=predicting?'Gândim drumul împreună, apoi alegem o căsuță.':map.brief||'Alegem săgețile, încercăm și reparăm împreună.';
  $('guess-legend').hidden=!predicting;
  $('program-editor').hidden=predicting;$('prediction-instructions').hidden=!predicting;$('edit-actions').hidden=predicting;
  $('queue-title').textContent=predicting?'Programul lui Robo':'2. Programul nostru';
  $('queue-hint').textContent=predicting?'Urmărește săgețile în ordine. Poți schimba alegerea înainte de verificare.':executed?'✓ Pași făcuți. Ștergem doar săgețile noi; pentru a modifica pașii făcuți, apăsăm „La start”.':'Atinge o comandă nouă ca să o ștergi. „Pornește Robo” execută săgețile noi.';
  $('execution-note').hidden=predicting;
  const pending=commands.length-executed;
  $('execution-note').textContent=won?'Misiune terminată. „La start” pregătește o nouă încercare.':executed+(executed===1?' pas făcut · ':' pași făcuți · ')+pending+' '+(pending===1?'săgeată nouă':'săgeți noi');
  $('program-mode').classList.toggle('selected',!predicting);$('program-mode').setAttribute('aria-pressed',String(!predicting));
  $('predict-mode').classList.toggle('selected',predicting);$('predict-mode').setAttribute('aria-pressed',String(predicting));
  $('queue').replaceChildren();commands.forEach((d,i)=>{
   const done=i<executed;
   const b=document.createElement(predicting||done?'span':'button');b.className='command'+(done?' executed':'')+(busy&&i===active&&!done?' active':'');b.innerHTML='<small>'+(i+1)+'</small>'+E.ARROW[d]+(done?'<span class="done-mark" aria-hidden="true">✓</span>':'');
   b.setAttribute('aria-label',(done?'Pas executat ':predicting?'Pasul ':'Șterge pasul ')+(i+1)+': '+E.NAME[d]);
   if(!predicting&&!done){b.disabled=busy;b.addEventListener('click',()=>removePending(i));}
   $('queue').append(b);
  });
  $('command-count').textContent=predicting?'3 săgeți':commands.length+' / '+limit();
  document.querySelectorAll('[data-dir]').forEach(b=>b.disabled=busy||won||commands.length>=limit());
  for(const id of ['undo','clear','restart','solution','print-game'])$(id).disabled=busy||((id==='undo'||id==='clear')&&!pending)||(id==='solution'&&(predicting||won));
  $('clear').textContent=executed?'Șterge cele noi':'Șterge tot';
  $('run').textContent=predicting?'Verificăm împreună':'Pornește Robo';
  $('run').disabled=busy||(predicting?(!guess||predictionDone):(!pending||won));$('stop').hidden=!busy;
  $('restart').hidden=predicting;$('next-round').hidden=!predicting||busy;
  $('completion').hidden=!(won&&!predicting&&missionIndex!==null);
  $('completion-message').textContent=completed===E.missionCount?'Am explorat toate insulele! Putem rejuca orice misiune.':'Misiune reușită! Următoarea insulă ne așteaptă.';
  $('next-mission').hidden=missionIndex===E.missionCount-1;
 }
 function rewind(){position=[...map.start];visited=[];active=-1;executed=0;won=false;bump=null;hasKey=Boolean(map.keyPosition&&E.same(map.start,map.keyPosition));predictionDone=false;mood('');}
 function pendingEdited(){active=executed-1;bump=null;mood('');}
 function removePending(index){
  if(busy||mode!=='program'||index<executed||index>=commands.length)return;
  commands.splice(index,1);pendingEdited();draw();report('Am șters o săgeată nouă. Robo rămâne pe loc'+(hasKey?', cu cheia.':'.'));
 }
 function idleMessage(){
  if(won)return 'Misiune terminată! „La start” pregătește o nouă încercare.';
  if(commands.length>executed)return 'Apasă „Pornește Robo”: continuăm de aici cu săgețile noi'+(hasKey?', cu cheia la noi.':'.');
  return map.keyPosition?(hasKey?'Cheia este la noi! Adaugă săgețile până la cufăr și pornește din nou.':'Adaugă săgețile spre cheie. Robo va continua de aici.'):'Adaugă săgeți noi. Robo va continua din căsuța în care a ajuns.';
 }
 function cancelRun(){runToken++;busy=false;A.stop();mood('');}
 function stop(){if(!busy)return;cancelRun();draw();report(mode==='predict'?'Ne-am oprit. Putem schimba alegerea. Verificarea reia programul de la start.':'Ne-am oprit. '+idleMessage());}
 function loadMap(m,program=[]){cancelRun();map=m;commands=[...program];guess=null;rewind();draw();report(program.length?'Program pregătit. Unde credeți că va ajunge Robo?':'Alege săgețile. Robo le va urma în ordine.');}
 function loadFree(m,program=[]){mode='program';missionIndex=null;savedProgram=null;loadMap(m,program);}
 function startMission(index){
  if(index<0||index>=E.missionCount||index>completed)return;
  mode='program';missionIndex=index;savedProgram=null;$('reset-confirmation').hidden=true;loadMap(E.mission(index));
 }
 function freshMap(){let m=E.generate(seed());const fingerprint=x=>JSON.stringify([x.start,x.goal,x.obstacles]);if(fingerprint(m)===fingerprint(map))m=E.generate(seed());m.label='Hartă inventată · '+generated;loadFree(m);report('O hartă nouă, după aceleași reguli. Există un drum până la comoară.');}
 function add(d){if(mode==='predict'||busy||won||commands.length>=limit())return;commands.push(d);pendingEdited();draw();report(executed?idleMessage():'Programul are '+commands.length+(commands.length===1?' comandă.':' comenzi.')+' Îl testăm când e gata.');}
 function selectGuess(p){
  if(mode!=='predict'||busy||predictionDone||map.obstacles.includes(E.key(p)))return;
  guess=[...p];draw();A.play('select');report('Am ales rândul '+(p[1]+1)+', coloana '+(p[0]+1)+'. Apăsăm „Verificăm împreună”.');
 }
 function newPrediction(){
  if(mode!=='predict')savedProgram={map,commands:[...commands],missionIndex,position:[...position],visited:visited.map(p=>[...p]),executed,active,won,bump,hasKey};
  const size=savedProgram?savedProgram.map.size:3;
  const previous=JSON.stringify([map.start,map.goal,commands]);
  let round=E.predictionRound(seed(),size);
  for(let tries=0;tries<5&&JSON.stringify([round.map.start,round.map.goal,round.commands])===previous;tries++)round=E.predictionRound(seed(),size);
  mode='predict';loadMap(round.map,round.commands);report('Privește cele trei săgeți și alege o căsuță de pe hartă.');
 }
 function returnToProgram(){
  if(mode==='program')return;
  cancelRun();mode='program';const saved=savedProgram;savedProgram=null;
  if(saved){({map,commands,missionIndex,position,visited,executed,active,won,bump,hasKey}=saved);guess=null;predictionDone=false;draw();report(idleMessage(),won?'success':'');}else startMission(Math.min(completed,E.missionCount-1));
 }
 function finishPrediction(animate=false){
  busy=false;predictionDone=true;const correct=E.same(position,guess);draw(animate);mood(correct?'happy':'curious');A.play(correct?'win':'retry');
  report(correct?'Am ghicit! Robo s-a oprit chiar în căsuța aleasă.':'Bună încercare! Robo s-a oprit la rândul '+(position[1]+1)+', coloana '+(position[0]+1)+'. Urmărim urmele și încercăm altă rundă.',correct?'success':'');
 }
 function finishMission(animate=false){
  busy=false;won=true;let stored=true;
  if(missionIndex!==null&&missionIndex===completed){completed++;try{localStorage.setItem(progressKey,JSON.stringify({version:2,completed}));}catch{stored=false;}}
  draw(animate);mood('happy');A.play('win');
  report((map.keyPosition?'Am deschis comoara cu cheia!':'Am ajuns la destinație!')+' Am reușit în '+executed+' pași.'+(!stored?' Progresul rămâne doar până închidem pagina.':''),'success');
 }
 const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
 async function run(){
  if(busy||(mode==='predict'?(!guess||predictionDone):(won||executed>=commands.length)))return;
  if(mode==='predict')rewind();
  const token=++runToken;busy=true;bump=null;mood('');draw();A.play('start');report(executed?'Robo continuă cu săgețile noi…':'Robo urmează comenzile noastre…');
  for(let i=executed;i<commands.length;i++){
   if(token!==runToken)return;active=i;draw();await pause(300);if(token!==runToken)return;
   const result=E.step(map,position,commands[i],hasKey);
   if(!result.ok){
    busy=false;if(result.reason==='tree'||result.reason==='locked'){const delta=E.DIR[commands[i]];bump=E.key([position[0]+delta[0],position[1]+delta[1]]);}
    const problem=result.reason==='locked'?'cufărul este încuiat! Luăm mai întâi cheia.':(result.reason==='tree'?'un copac ne blochează!':'am ieși de pe hartă!')+' Ce comandă schimbăm?';
    draw();mood('curious');A.play('retry');report('Pasul '+(i+1)+': '+problem,'error');return;
   }
   // Commit movement, inventory and cursor together before any wait. A stop must never replay this step.
   visited.push([...position]);position=result.position;hasKey=result.hasKey;executed=i+1;
   // Victory belongs to the committed move, even if the view changes during its visual animation.
   if(result.won||(mode==='predict'&&executed===commands.length)){if(mode==='predict')finishPrediction(true);else finishMission(true);return;}
   draw(true);A.play(result.collectedKey?'select':'step');
   if(result.collectedKey)report('Am luat cheia! Acum putem merge la cufăr.','success');
   await pause(420);if(token!==runToken)return;
  }
  if(mode==='predict'){finishPrediction();return;}
  busy=false;draw();report(idleMessage());
 }
 function showView(next){if(busy)stop();A.stop();view=next;for(const name of ['game','story','sheet'])$(name+'-view').hidden=name!==next;document.querySelectorAll('[data-view]').forEach(b=>{b.classList.toggle('selected',b.dataset.view===next);b.setAttribute('aria-pressed',String(b.dataset.view===next));});if(next==='story')renderScene();if(next==='sheet')renderSheet();if(next==='game')placeRobot();}
 function worksheet(m){return '<article class="worksheet"><h2>Misiunea de explorator</h2><p>'+(m.keyPosition?'Ia mai întâi cheia 🔑, apoi deschide cufărul. Ocolește copacii.':'Condu robotul la destinație: '+(m.goalName||'comoară')+'. Ocolește copacii.')+'</p><div class="team">Echipa: ______________________________</div><div class="board" style="--board-size:'+m.size+'" role="img" aria-label="Hartă cu '+m.size+' rânduri și '+m.size+' coloane pentru fișa de explorator">'+boardHTML(m)+'</div><p class="roles">① Desenează săgețile. ② Colegul mută pionul. ③ Schimbați rolurile.</p><b>Programul nostru</b><div class="sheet-queue">'+Array.from({length:16},(_,i)=>'<span>'+(i+1)+'</span>').join('')+'</div><div class="check"><span>□ Am testat.</span><span>□ Am reparat.</span>'+(m.keyPosition?'<span>□ Am luat cheia.</span><span>□ Am deschis cufărul.</span>':'<span>□ Am ajuns!</span>')+'</div><p class="roles">Misiune bonus: inventează pe verso o hartă cu un drum posibil.</p></article>';}
 function renderSheet(){$('sheet-preview').innerHTML=worksheet(sheetMap);}
 function printMap(m){$('print-area').innerHTML=worksheet(m);$('print-area').setAttribute('aria-hidden','false');window.print();}
 function renderScene(){
  const s=scenes[sceneIndex];$('scene-counter').textContent='Scena '+(sceneIndex+1)+' din '+scenes.length;$('scene-time').textContent=s.time;$('scene-kicker').textContent=s.kicker;$('scene-title').textContent=s.title;$('scene-line').textContent=s.line;$('scene-action').textContent=s.action;$('scene-notes').textContent=s.notes;$('scene-question').textContent=s.question;
  let html='';const first=s.visual==='bug'?E.firstMap():E.mission(0);
  if(s.visual==='intro')html='<img src="assets/robot-treasure-island.png" alt="Un robot prietenos ține o hartă pe o insulă, lângă un cufăr cu comori." width="1536" height="1024">';
  else if(s.visual==='arrows')html='<div class="arrow-demo">'+['U','D','L','R'].map(d=>'<div><strong>'+E.ARROW[d]+'</strong>'+E.NAME[d]+'</div>').join('')+'</div>';
  else if(s.visual==='map'||s.visual==='bug'){const p=s.visual==='bug'?[1,3]:first.start;html='<div class="board" style="--board-size:'+first.size+'">'+boardHTML(first,p,[],s.visual==='bug'?'1,2':null)+'</div>';if(s.visual==='bug')html+='<div class="mini-program"><span>→</span><span>↑</span><span class="bad">↑</span></div>';}
  else if(s.visual==='factory')html='<div class="map-factory">'+[11,23,37,51].map(seed=>'<div class="board">'+boardHTML(E.generate(seed))+'</div>').join('')+'</div>';
  else if(s.visual==='rules')html='<div class="rule-cards"><div><b>1</b><span>Start și comoară în locuri diferite</span></div><div><b>2</b><span>Copaci doar pe locuri libere</span></div><div><b>3</b><span>Cel puțin un drum posibil</span></div></div>';
  else if(s.visual==='sheet')html='<div class="sheet-preview">'+worksheet(first)+'</div>';
  else html='<div class="recap"><div><span>🧭</span>Dăm instrucțiuni.</div><div><span>🔎</span>Testăm și reparăm.</div><div><span>🗺️</span>Inventăm hărți.</div></div>';
  $('scene-visual').innerHTML=html;$('previous').disabled=sceneIndex===0;$('next').disabled=sceneIndex===scenes.length-1;
  $('story-dots').replaceChildren();scenes.forEach((_,i)=>{const b=document.createElement('button');b.textContent=i+1;b.setAttribute('aria-label','Scena '+(i+1));b.setAttribute('aria-pressed',String(i===sceneIndex));b.className=i===sceneIndex?'active':'';b.addEventListener('click',()=>{sceneIndex=i;renderScene();});$('story-dots').append(b);});
 }
 function sceneAction(){const target=scenes[sceneIndex].target;if(target==='sheet'){sheetMap=mode==='program'?map:(savedProgram?savedProgram.map:E.mission(0));showView('sheet');return;}showView('game');if(target==='first')startMission(0);else if(target==='directions'){startMission(0);loadMap(E.mission(0),['R','R']);}else if(target==='bug')loadFree(E.firstMap(),['R','U','U']);else if(target==='generate')freshMap();else if(target==='rules'){$('teacher-tools').open=true;document.querySelector('.rules').open=true;}}
 document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>showView(b.dataset.view)));
 document.querySelector('.brand').addEventListener('click',e=>{e.preventDefault();showView('game');});
 document.querySelectorAll('[data-dir]').forEach(b=>b.addEventListener('click',()=>add(b.dataset.dir)));
 $('run').addEventListener('click',run);$('stop').addEventListener('click',stop);
 $('program-mode').addEventListener('click',returnToProgram);
 $('predict-mode').addEventListener('click',()=>{if(mode!=='predict')newPrediction();});
 $('next-round').addEventListener('click',newPrediction);
 $('next-mission').addEventListener('click',()=>startMission(missionIndex+1));
 $('reset-adventure').addEventListener('click',()=>{$('reset-confirmation').hidden=false;});
 $('cancel-reset').addEventListener('click',()=>{$('reset-confirmation').hidden=true;});
 $('confirm-reset').addEventListener('click',()=>{completed=0;try{localStorage.removeItem(progressKey);}catch{}startMission(0);});
 $('sound').addEventListener('click',async()=>{
  const button=$('sound');button.disabled=true;
  try{const enabled=await A.toggle();button.textContent=enabled?'♫ Sunet pornit':'♫ Sunet oprit';button.setAttribute('aria-pressed',String(enabled));}
  catch{button.textContent='♫ Sunet indisponibil';button.setAttribute('aria-pressed','false');if(view==='game')report('Sunetul nu este disponibil în acest browser. Putem continua jocul.');}
  finally{button.disabled=false;}
 });
 $('clear').addEventListener('click',()=>{if(busy||mode!=='program')return;commands=commands.slice(0,executed);pendingEdited();draw();report(executed?'Am șters săgețile noi. Robo rămâne pe loc'+(hasKey?', cu cheia.':'.'):'Un program nou. Ce săgeată alegem prima?');});
 $('undo').addEventListener('click',()=>removePending(commands.length-1));
 $('restart').addEventListener('click',()=>{if(busy||mode!=='program')return;cancelRun();rewind();draw();report('Robo este la start'+(map.keyPosition?', iar cheia este înapoi pe hartă.':'.')+' Programul a rămas pregătit.');});
 $('new-map').addEventListener('click',freshMap);$('bug-map').addEventListener('click',()=>{loadFree(E.firstMap(),['R','U','U']);report('Detectivi, găsiți greșeala înainte să porniți Robo!');});$('first-map').addEventListener('click',()=>loadFree(E.firstMap()));
 $('solution').addEventListener('click',()=>{
  if(busy||mode!=='program'||won)return;
  const remaining=E.solve(map,{position,hasKey});
  if(!remaining){report('Nu am găsit un drum din această căsuță. Putem reveni „La start”.');return;}
  if(executed+remaining.length>limit()){report('Drumul ar depăși limita de '+limit()+' săgeți. „La start” ne permite să pregătim un traseu nou.');return;}
  commands=[...commands.slice(0,executed),...remaining];pendingEdited();draw();report('Am pregătit un drum din poziția curentă'+(hasKey?', păstrând cheia.':'.'));
 });
 $('print-game').addEventListener('click',()=>printMap(map));$('print-sheet').addEventListener('click',()=>printMap(sheetMap));$('refresh-sheet').addEventListener('click',()=>{sheetMap=E.generate(seed(),{size:sheetMap.size});renderSheet();});
 $('previous').addEventListener('click',()=>{if(sceneIndex>0){sceneIndex--;renderScene();}});$('next').addEventListener('click',()=>{if(sceneIndex<scenes.length-1){sceneIndex++;renderScene();}});$('scene-action').addEventListener('click',sceneAction);
 $('fullscreen').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else throw Error('unavailable');}catch{if(view!=='game')showView('game');report('Pentru ecran complet poți folosi F11 în browser.');}});
 document.addEventListener('fullscreenchange',()=>{$('fullscreen').textContent=document.fullscreenElement?'Ieși din ecran complet':'Ecran complet';});
 document.addEventListener('keydown',e=>{if(/INPUT|TEXTAREA|SELECT|SUMMARY/.test(e.target.tagName)||e.ctrlKey||e.metaKey||e.altKey)return;const keys={ArrowUp:'U',ArrowDown:'D',ArrowLeft:'L',ArrowRight:'R'};if(view==='game'&&keys[e.key]&&mode==='program'){e.preventDefault();add(keys[e.key]);}else if(view==='game'&&keys[e.key]&&mode==='predict'&&e.target.parentElement===$('board')){e.preventDefault();const cells=Array.from($('board').children),index=cells.indexOf(e.target),d=E.DIR[keys[e.key]];let x=index%map.size+d[0],y=Math.floor(index/map.size)+d[1];while(x>=0&&x<map.size&&y>=0&&y<map.size){const cell=cells[y*map.size+x];if(!cell.disabled){cell.focus();break;}x+=d[0];y+=d[1];}}else if(view==='story'&&(e.key==='ArrowLeft'||e.key==='ArrowRight')){e.preventDefault();sceneIndex=Math.max(0,Math.min(scenes.length-1,sceneIndex+(e.key==='ArrowRight'?1:-1)));renderScene();}});
 window.addEventListener('afterprint',()=>{$('print-area').setAttribute('aria-hidden','true');});
 window.addEventListener('resize',()=>placeRobot());
 document.addEventListener('visibilitychange',()=>{if(document.hidden){if(busy)stop();A.stop();}});
 draw();renderSheet();
 const context=document.modelContext;
 if(context&&typeof context.registerTool==='function'){
  const lifecycle=new AbortController();window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
  const tool={name:'stage_robo_program',title:'Pregătește programul robotului',description:'Primește programul complet și înlocuiește numai săgețile neexecutate. Prefixul deja executat trebuie păstrat identic. Păstrează poziția și cheia, nu pornește animația și nu modifică rundele de anticipare.',inputSchema:{type:'object',properties:{commands:{type:'array',items:{type:'string',enum:['U','D','L','R']},maxItems:32}},required:['commands'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(input){
   if(busy)throw Error('Robotul este în mișcare.');
   if(mode==='predict')throw Error('Revino la Programăm pentru a schimba comenzile.');
   if(won)throw Error('Misiunea este terminată. Folosește „La start” pentru o nouă încercare.');
   if(!input||Object.keys(input).some(k=>k!=='commands')||!Array.isArray(input.commands)||input.commands.length>limit()||input.commands.some(d=>typeof d!=='string'||!Object.hasOwn(E.DIR,d)))throw Error('Sunt permise cel mult '+limit()+' comenzi U, D, L, R.');
   if(input.commands.length<executed||commands.slice(0,executed).some((d,i)=>d!==input.commands[i]))throw Error('Pașii deja executați trebuie păstrați. Folosește „La start” pentru a-i modifica.');
   commands=[...input.commands];pendingEdited();showView('game');draw();report('Săgețile noi sunt pregătite. Robo continuă din poziția curentă.');
   return {commands:[...commands],executed,prediction:E.evaluate(map,commands).outcome};
  }};
  try{Promise.resolve(context.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{});}catch{}
 }
})();
