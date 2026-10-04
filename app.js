(function(){
 'use strict';
 const E=window.RoboEngine,C=window.RoboLessons,A=window.RoboAudio,$=id=>document.getElementById(id);
 const progressKey='robo-explorator-progress-v1';
 let completed=0;
 try{completed=E.readProgress(localStorage.getItem(progressKey));}catch{}
 const checkpointKey='robo-explorator-lessons-v1';
 let checkpoints={};try{checkpoints=C.readCheckpoints(localStorage.getItem(checkpointKey));}catch{}
 let missionIndex=Math.min(completed,E.missionCount-1);
 let map=C.get(missionIndex,checkpoints[missionIndex]),commands=[],position=[...map.start],visited=[],active=-1,busy=false,runToken=0,view='game',sceneIndex=0,generated=0,won=false,bump=null;
 let mode='program',guess=null,predictionDone=false,savedProgram=null,boardSignature='',motionTimer,hasKey=false,executed=0;
 let world=E.initialWorld();
 let decisions={};
 let decisionPending=null,predictionLength=2,guidedDetective=false;
 let detectiveIndex=0,detectiveSelected=-1;
 let sheetMap=C.get(0);
 const scenes=[
  {title:'Salut! Eu sunt Robo.',kicker:'1 · FACEM CUNOȘTINȚĂ',line:'Mă ajuți să găsesc bateria?',time:'2 minute',visual:'intro',action:'Începem cu un pas',target:'first',notes:'Arată robotul și bateria. Copiii arată direcția cu mâna. Adultul citește; nu este nevoie ca elevii să citească textele.',question:'„Unde vrem să ajungă Robo?”'},
  {title:'O săgeată, un pătrățel.',kicker:'2 · OBSERVĂM UN EFECT',line:'Alegem →. Pornim. Ce s-a schimbat?',time:'3 minute',visual:'arrows',action:'Încercăm o comandă',target:'directions',notes:'Arată numai săgeata spre dreapta. Lăsați copiii să indice căsuța următoare înainte de pornire. Direcțiile sunt pe ecran; robotul nu se rotește.',question:'„O săgeată l-a mutat un pătrățel sau două?”'},
  {title:'Punem săgețile în ordine.',kicker:'3 · ANTICIPĂM ȘI TESTĂM',line:'Arătăm drumul cu degetul. Apoi alegem săgețile.',time:'6 minute',visual:'map',action:'Încercăm două săgeți',target:'sequence',notes:'Două săgeți identice, apoi o schimbare de direcție. Folosește lecția Floarea de pe deal când clasa urmărește ușor două comenzi. În Unde crezi că ajunge? începe cu două săgeți; trei sunt o opțiune.',question:'„Unde se oprește Robo după aceste două săgeți?”'},
  {title:'O greșeală? O reparăm!',kicker:'4 · DETECTIVUL ROBO',line:'Testăm și schimbăm o singură săgeată.',time:'4 minute',visual:'bug',action:'Detectivul Robo',target:'bug',notes:'Începeți cu primul caz: două săgeți și două variante. Copiii explică schimbarea. Celelalte cazuri sunt opționale; reveniți la primul dacă clasa are nevoie de exersare.',question:'„Ce săgeată îl duce la baterie?”'},
  {title:'Un copac în drum.',kicker:'5 · OCOLIM UN OBSTACOL',line:'Pe unde poate trece Robo?',time:'4 minute',visual:'obstacle',action:'Ocolim un copac',target:'obstacle',notes:'Păstrează harta 3×3. Cere copiilor să arate un ocol, apoi să îl construiască. Nu deschide încă provocarea cu doi copaci dacă primul ocol cere mult ajutor.',question:'„De ce nu alegem săgeata spre copac?”'},
  {title:'Tu alegi. Eu urmez.',kicker:'6 · LUCRĂM ÎN PERECHI',line:'Unul arată săgețile. Celălalt mută pionul.',time:'8 minute',visual:'sheet',action:'Deschide fișa simplă',target:'sheet',notes:'Fișa are două comenzi și o hartă simplă. Copiii pot arăta sau desena săgețile. Partenerul mută pionul exact după ele. Schimbați rolurile; nu cereți scrierea unui program lung.',question:'„Pionul a urmat săgețile în ordine?”'},
  {title:'Ce știe acum echipa?',kicker:'7 · EXPLICĂM ȘI ÎNCHEIEM',line:'Dăm comenzi. Ghicim drumul. Testăm și reparăm.',time:'3 minute',visual:'recap',action:'Mai exersăm două săgeți',target:'sequence',notes:'Aici se poate încheia prima întâlnire. Invită câțiva copii să arate efectul unei săgeți și să explice o reparație. Continuările nu sunt obligatorii și pot fi explorate în altă zi.',question:'„Cum ne dăm seama ce săgeată trebuie schimbată?”'},
  {title:'Alte aventuri, când suntem pregătiți.',kicker:'8 · OPȚIONAL, CU ADULTUL',line:'O cheie, o manetă sau o floare pot începe o nouă aventură.',time:'În altă rundă',visual:'extensions',action:'Descoperim cheia',target:'key',notes:'Alege o singură continuare. Cheia are două etape scurte; maneta introduce o acțiune. În grădină, udarea precedă repetiția, iar condiția se exersează separat înainte de combinare. Rețeta și fabrica de hărți rămân demonstrații opționale din instrumentele adultului.',question:'„Putem explica deja ce face fiecare comandă cunoscută?”'}
 ];

 function goalHTML(m,opened=false){
  if(!m.keyPosition)return m.goalIcon||'💎';
  return '<svg class="chest-icon" viewBox="0 0 64 64" aria-hidden="true"><path d="'+(opened?'M8 25L13 6H51L56 25Z':'M8 29V22Q8 11 19 11H45Q56 11 56 22V29Z')+'" fill="#e6ad40" stroke="#805326" stroke-width="3"/><rect x="8" y="29" width="48" height="25" rx="4" fill="#b96b35" stroke="#805326" stroke-width="3"/><path d="M18 30V52M46 30V52" stroke="#ffda70" stroke-width="6"/><rect x="26" y="26" width="12" height="14" rx="3" fill="#ffda70"/><circle cx="32" cy="32" r="2.5" fill="#805326"/>'+(opened?'<path d="M24 23L32 15L40 23L32 30Z" fill="#55d5ed" stroke="#147c83" stroke-width="2"/>':'')+'</svg>';
 }
 function lockBadge(unlocked=false){return '<span class="lock-badge" aria-hidden="true">'+(unlocked?'🔓':'🔒')+'</span>';}
 function specialTile(m,p,state=E.initialWorld()){
  const k=E.key(p);
  if(m.bridge&&E.same(p,m.bridge))return {type:'river bridge-tile'+(state.bridgeOpen?' bridge-open':''),label:state.bridgeOpen?'pod coborât, putem traversa':'pod ridicat',html:'<svg class="bridge-icon" viewBox="0 0 64 64" aria-hidden="true"><path d="M4 13Q12 7 20 13T36 13T52 13T68 13M4 51Q12 45 20 51T36 51T52 51T68 51" fill="none" stroke="#309dbd" stroke-width="3"/><g class="bridge-deck"><path d="M5 22H59V42H5Z" fill="#d9a454" stroke="#805326" stroke-width="3"/><path d="M16 23V41M27 23V41M38 23V41M49 23V41" stroke="#805326" stroke-width="2"/></g></svg>'+lockBadge(state.bridgeOpen)};
  if(m.water&&m.water.includes(k))return {type:'river',label:'râu',html:'<span class="waves">≈</span>'};
  if(m.lever&&E.same(p,m.lever))return {type:'lever-tile'+(state.bridgeOpen?' activated':''),label:state.bridgeOpen?'manetă activată':'manetă, folosește Activează',html:'<svg class="lever-icon" viewBox="0 0 64 64" aria-hidden="true"><rect x="10" y="43" width="44" height="12" rx="5" fill="#809ba7"/><path d="'+(state.bridgeOpen?'M32 44L49 20':'M32 44L18 17')+'" stroke="#335b68" stroke-width="7" stroke-linecap="round"/><circle cx="'+(state.bridgeOpen?'49':'18')+'" cy="'+(state.bridgeOpen?'20':'17')+'" r="9" fill="'+(state.bridgeOpen?'#35a078':'#ee9a3f')+'"/></svg>'+(state.bridgeOpen?'<span class="world-badge">✓</span>':'')};
  if(m.flowers&&m.flowers.includes(k)){const watered=state.watered.includes(k);return {type:'flower-tile'+(watered?' watered':''),label:'floarea '+(m.flowers.indexOf(k)+1)+(watered?', udată':', are nevoie de apă'),html:(watered?'🌸':'🌱')+'<span class="world-badge">'+(watered?'✓':m.flowers.indexOf(k)+1)+'</span>'};}
  if(m.gate&&E.same(p,m.gate)){const open=E.gateOpen(m,state);return {type:'gate-tile'+(open?' gate-open':''),label:open?'poartă deschisă':'poartă închisă, udă toate florile',html:'🚪'+lockBadge(open)};}
  const row=(m.rowStarts||[]).find(row=>E.same(p,row.position));
  if(row)return {type:'row-start',label:'începutul rândului '+row.name,html:'<span class="row-letter">'+row.name+'</span><span class="row-arrow">→</span>'};
  return null;
 }
 function boardHTML(m,p=m.start,path=[],bad=null){
  const visitedSet=new Set(path.map(E.key));let html='';
  for(let y=0;y<m.size;y++)for(let x=0;x<m.size;x++){
   const cell=[x,y],key=E.key(cell),isRobot=E.same(cell,p),isTree=m.obstacles.includes(key),isGoal=E.same(cell,m.goal),isKey=m.keyPosition&&E.same(cell,m.keyPosition);
   const special=specialTile(m,cell),label=isRobot?'Robo':isTree?'copac':isKey?'cheie':special?special.label:isGoal?(m.keyPosition?'cufăr încuiat':m.goalName||'comoară'):'liber';
   const cls='tile'+(special?' '+special.type:'')+(isTree?' tree':'')+(isGoal?' goal':'')+(isKey?' key-item':'')+(visitedSet.has(key)?' visited':'')+(isRobot?' robot':'')+(isRobot&&isGoal?' win':'')+(bad===key?' bump':'');
   html+='<div class="'+cls+'" aria-label="Rândul '+(y+1)+', coloana '+(x+1)+': '+label+'"><span aria-hidden="true">'+(isRobot?'🤖':isTree?'🌲':isKey?'🔑':special?special.html:isGoal?goalHTML(m):visitedSet.has(key)?'<span class="trace">•</span>':'')+'</span>'+(isGoal&&m.keyPosition?lockBadge():'')+(isGoal&&isRobot?'<span class="goal-star">★</span>':'')+'</div>';
  }return html;
 }
 function report(message,type=''){ $('status').textContent=message;$('status').className='status'+(type?' '+type:''); }
 function limit(){return missionIndex===null||mode==='predict'?32:map.size===3?8:map.size===4?16:32;}
 function plan(){return E.expand(commands,limit(),map.recipes);}
 function seed(){generated++;const buf=new Uint32Array(1);if(window.crypto&&window.crypto.getRandomValues){window.crypto.getRandomValues(buf);return buf[0];}return (Date.now()+generated*977)>>>0;}
 function placeRobot(animate=false){
  const tile=$('board').children[position[1]*map.size+position[0]];
  if(!tile)return;
  const actor=$('robo-token');
  actor.classList.toggle('moving',animate);
  actor.style.width=tile.offsetWidth+'px';actor.style.height=tile.offsetHeight+'px';
  actor.style.transform='translate('+tile.offsetLeft+'px,'+tile.offsetTop+'px)';
 }
 function fitBoard(){
  const frame=$('board-frame'),stage=$('board-stage');
  if(view==='game'&&window.innerWidth>=960&&window.innerHeight>=720){
   const side=Math.floor(Math.min(frame.clientWidth,frame.clientHeight,460));
   if(side>0)stage.style.width=side+'px';
  }else stage.style.removeProperty('width');
  placeRobot();
 }
 function mood(name){
  clearTimeout(motionTimer);
  $('robo-token').dataset.mood=name;
  if(name)motionTimer=setTimeout(()=>{$('robo-token').dataset.mood='';},1800);
 }
 function drawObjectives(){
  const hasObjectives=Boolean(map.keyPosition||map.lever||map.flowers);
  $('mission-objectives').hidden=!hasObjectives;
  $('key-legend').hidden=!hasObjectives;
  $('key-legend').textContent=map.lever?'⚙ Manetă · ≈ Râu':map.flowers?'🌱 De udat · 🌸 Udată':hasKey?'🔑 Cheie găsită':'🔑 Cheie';
  $('goal-legend').textContent=map.keyPosition?(won?'💎 Cufăr deschis':hasKey?'🔓 Cufăr de deschis':'🔒 Cufăr încuiat'):(map.goalIcon||'💎')+' '+(map.goalName||'Comoară');
  if(map.lever||map.flowers){
   const ready=map.lever?world.bridgeOpen:E.gateOpen(map,world);
   $('key-objective').textContent=map.lever?(ready?'✓ Manetă activată':'1. ⚙ Activează maneta'):'💧 '+world.watered.length+' din '+map.flowers.length+(map.flowers.length===1?' floare udată':' flori udate');
   $('chest-objective').textContent=won?'✓ Am ajuns!':map.lever?(ready?'2. Traversează podul':'2. Podul este ridicat'):(map.gate?(ready?'2. Poarta este deschisă':'2. Deschide poarta'):'2. Mergi la destinație');
   $('key-objective').classList.toggle('complete',ready);$('chest-objective').classList.toggle('complete',won);return;
  }
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
   const special=specialTile(map,p,world);
   cell.className='tile'+(special?' '+special.type:'')+(tree?' tree':'')+(goal?' goal'+(map.keyPosition?' chest-goal':''):'')+(isKey?' key-item':'')+(path.has(key)?' visited':'')+(robot?' robot':'')+(won&&robot?' win':'')+(bump===key?' bump':'')+(chosen?' guessed':'')+(predictionDone&&robot?' answer':'');
   cell.innerHTML='<span aria-hidden="true">'+(tree?'🌲':isKey?'🔑':special?special.html:goal?goalHTML(map,won):path.has(key)?'<span class="trace">•</span>':'')+'</span>'+(goal&&map.keyPosition?lockBadge(hasKey):'')+(chosen?'<span class="guess-pin" aria-hidden="true">📍</span>':'');
   const goalLabel=map.keyPosition?(won?'cufăr deschis':hasKey?'cufăr descuiat':'cufăr încuiat'):map.goalName||'comoară';
   cell.setAttribute('aria-label','Rândul '+(p[1]+1)+', coloana '+(p[0]+1)+': '+(robot?'Robo'+(special?', '+special.label:goal?', '+goalLabel:''):tree?'copac':isKey?'cheie':special?special.label:goal?goalLabel:'liber')+(chosen?', alegerea noastră':'')+(predictionDone&&robot?', aici s-a oprit':'') );
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
   const m=C.get(i),button=document.createElement('button');
   button.className='mission-stop'+(i<completed?' complete':'')+(mode==='program'&&i===missionIndex?' current':'');
   button.disabled=i>completed;
   button.setAttribute('aria-label','Misiunea '+(i+1)+': '+m.title+(i<completed?', terminată':i>completed?', blocată':''));
   button.setAttribute('aria-current',String(mode==='program'&&i===missionIndex));
   button.innerHTML='<span class="mission-icon" aria-hidden="true">'+(i>completed?'🔒':m.goalIcon)+'</span><span class="mission-name">'+(i+1)+'. '+m.title+'</span><span class="mission-size">'+(i<completed?'✓ Gata · ':'')+m.lesson.group+'</span>';
   button.addEventListener('click',()=>startMission(i));$('mission-trail').append(button);
  }
  $('adventure-progress').textContent=Math.min(completed,3)+' din 3 lecții de bază';
 }
 function commandTile(d,i,predicting=false){
  if(d==='F'){
   const done=i<executed,b=document.createElement(done?'div':'button'),answer=decisions[i];
   b.className='decision-block'+(done?' executed':'')+(busy&&i===active?' active':'');
   b.innerHTML='<b><small>'+(i+1)+'.</small> 🌱 DACĂ este o floare aici</b><span class="decision-then'+(answer&&!answer.matched?' skipped':'')+'">ATUNCI 💧 Udă</span><span class="decision-result">'+(answer?'✓ '+decisionAnswer(answer):busy&&i===active?'Ne gândim: DA sau NU?':'Verificăm când ajungem aici.')+'</span>';
   b.setAttribute('aria-label',(done?'Pas executat ':'Șterge pasul ')+(i+1)+': '+E.NAME.F+(answer?'. '+decisionAnswer(answer):''));
   if(!done){b.type='button';b.disabled=busy;b.addEventListener('click',()=>removePending(i));}
   return b;
  }
  if(mode==='detective'){
   const b=document.createElement('button');b.type='button';
   b.className='command detective-command'+(detectiveSelected===i?' chosen':'')+(commands[i]!==map.detective.commands[i]?' changed':'')+(i<executed?' executed':'')+(busy&&i===active?' active':'');
   b.innerHTML='<small>'+(i+1)+'</small>'+E.ARROW[d];b.disabled=busy||won;
   b.setAttribute('aria-label','Schimbă săgeata '+(i+1)+': '+E.NAME[d]);b.setAttribute('aria-pressed',String(detectiveSelected===i));
   b.addEventListener('click',()=>selectDetectiveArrow(i));return b;
  }
  const done=i<executed,b=document.createElement(predicting||done?'span':'button');
  b.className='command'+(done?' executed':'')+(busy&&i===active&&!done?' active':'');b.innerHTML='<small>'+(i+1)+'</small>'+E.ARROW[d]+(done?'<span class="done-mark" aria-hidden="true">✓</span>':'');
  b.setAttribute('aria-label',(done?'Pas executat ':predicting?'Pasul ':'Șterge pasul ')+(i+1)+': '+E.NAME[d]);
  if(!predicting&&!done){b.disabled=busy;b.addEventListener('click',()=>removePending(i));}
  return b;
 }
 function drawQueue(predicting,steps){
  const scrollTop=$('queue').scrollTop;
  $('queue').replaceChildren();
  commands.forEach((block,index)=>{
   const start=steps.findIndex(s=>s.blockIndex===index);
   if(typeof block==='string'){$('queue').append(commandTile(block,start,predicting));return;}
   const called=Object.hasOwn(block,'call'),blockSteps=E.expand([block],limit(),map.recipes),length=blockSteps.length,done=executed>=start+length,started=executed>start;
   const group=document.createElement('div');group.className='repeat-block'+(called?' recipe-call':'')+(done?' complete':'');
   const at=Math.max(0,Math.min(length-1,(busy?active:executed)-start)),iteration=called?0:Math.floor(at/block.commands.length);
   const runningHere=busy&&active>=start&&active<start+length;
   if(called){
    group.innerHTML='<div class="repeat-heading"><b>📖 '+map.recipes[block.call].name+'</b><span>'+(done?'✓ Gata':started||runningHere?'Pasul '+(at+1)+' din '+length:'Pașii '+(start+1)+'–'+(start+length))+'</span></div><div class="recipe-steps">'+blockSteps.map((s,j)=>'<span class="recipe-step'+(start+j<executed?' done':'')+(runningHere&&j===at?' active':'')+'" aria-label="'+(start+j<executed?'Făcut: ':'')+E.NAME[s.command]+'">'+E.ARROW[s.command]+(start+j<executed?'<small>✓</small>':'')+'</span>').join('')+'</div>';
   }else group.innerHTML='<div class="repeat-heading"><b>🔁 Repetă de '+block.repeat+' ori</b><span>'+(done?'✓ Gata':started||runningHere?'Repetiția '+(iteration+1)+' din '+block.repeat:'Pașii '+(start+1)+'–'+(start+length))+'</span></div><div class="repeat-body">'+block.commands.map((d,j)=>'<span class="repeat-command'+(runningHere&&j===at%block.commands.length?' active':'')+'">'+E.ARROW[d]+'<small>'+E.NAME[d]+'</small></span>').join('')+'</div><div class="repeat-expanded">'+Array.from({length:block.repeat},(_,n)=>'<span class="'+(executed>=start+(n+1)*block.commands.length?'done':'')+'">'+(n+1)+'. '+block.commands.map(d=>E.ARROW[d]).join(' ')+block.commands.map((d,j)=>{const answer=decisions[start+n*block.commands.length+j];return d==='F'&&answer?'<small class="repeat-decision-result" title="'+decisionAnswer(answer)+'">'+(answer.matched?(answer.alreadyWatered?'DA · deja udată':'DA · Udăm'):'NU · Continuăm')+'</small>':'';}).join('')+'</span>').join('')+'</div>';
   const unfold=document.createElement('button');unfold.className='repeat-edit';unfold.textContent='Desfă în comenzi';unfold.disabled=busy;
   unfold.addEventListener('click',()=>{if(busy)return;commands.splice(index,1,...blockSteps.map(s=>s.command));pendingEdited();draw();report('Am desfăcut '+(called?'această folosire a rețetei':'repetiția')+'. Pașii bifați rămân făcuți; putem schimba comenzile noi.');});group.append(unfold);
   if(!started){const remove=document.createElement('button');remove.className='repeat-edit';remove.textContent=called?'Șterge folosirea':'Șterge repetiția';remove.disabled=busy;remove.addEventListener('click',()=>{if(busy)return;commands.splice(index,1);pendingEdited();draw();report('Am șters blocul neînceput. Robo rămâne pe loc.');});group.append(remove);}
   $('queue').append(group);
  });
  $('queue').scrollTop=scrollTop;
 }
 function repeatCandidate(){
  const n=Number($('repeat-count').value),tail=commands.slice(-2),steps=plan();
  if(!map.allowRepeat||mode!=='program'||tail.length!==2||tail.some(d=>typeof d!=='string')||steps.length-2<executed)return null;
  const candidate=[...commands.slice(0,-2),{repeat:n,commands:tail}];
  try{E.expand(candidate,limit(),map.recipes);return candidate;}catch{return null;}
 }
 function draw(animate=false){
  const predicting=mode==='predict',detecting=mode==='detective';
  $('game-view').dataset.mode=mode;
  drawBoard(animate);drawTrail();
  $('mission-picker').hidden=detecting;
  $('adventure-heading').hidden=detecting;$('mission-trail').hidden=detecting;
  $('map-label').textContent=map.label;$('step-count').textContent=busy&&active>=0?'Pasul '+(active+1):executed?executed+(executed===1?' pas făcut':' pași făcuți'):'La start';
  $('game-title').textContent=predicting?'Unde se oprește Robo?':map.title||'Condu-l pe Robo la comoară.';
  $('activity-label').textContent=detecting?'REPARĂM ÎMPREUNĂ':predicting?'GHICIM ȘI VERIFICĂM':map.lesson?map.lesson.group.toUpperCase()+' · '+map.lesson.name:'JOACĂ LIBERĂ';
  $('mission-brief').textContent=predicting?'Gândim drumul împreună, apoi alegem o căsuță.':map.brief||'Alegem săgețile, încercăm și reparăm împreună.';
  $('guess-legend').hidden=!predicting;
  $('program-editor').hidden=mode!=='program';$('prediction-instructions').hidden=!predicting;$('edit-actions').hidden=mode!=='program';
  $('queue-title').textContent=detecting?(won?'Drumul reparat':'1. Ce săgeată schimbăm?'):predicting?'Programul lui Robo':'2. Programul nostru';
  $('queue-hint').textContent=detecting?(won?'O săgeată schimbată. Am găsit drumul!':detectiveSelected<0?'Atinge o săgeată ca să o schimbi.':'Săgeata '+(detectiveSelected+1)+' este aleasă. Ce punem în loc?'):predicting?'Urmărește săgețile în ordine. Poți schimba alegerea înainte de verificare.':executed?'✓ Pași făcuți. Ștergem doar comenzile noi; pentru a modifica pașii făcuți, apăsăm „La start”.':'Atinge o comandă nouă ca să o ștergi. „Pornește Robo” execută comenzile noi.';
  $('execution-note').hidden=mode!=='program';
  const steps=plan(),pending=steps.length-executed;
  $('execution-note').textContent=won?'Misiune terminată. „La start” pregătește o nouă încercare.':executed+(executed===1?' pas făcut · ':' pași făcuți · ')+pending+' '+(pending===1?'comandă nouă':'comenzi noi');
  $('program-mode').classList.toggle('selected',mode==='program');$('program-mode').setAttribute('aria-pressed',String(mode==='program'));
  $('predict-mode').classList.toggle('selected',predicting);$('predict-mode').setAttribute('aria-pressed',String(predicting));
  $('detective-mode').classList.toggle('selected',detecting);$('detective-mode').setAttribute('aria-pressed',String(detecting));
  $('queue').classList.toggle('detective-queue',detecting);
  drawQueue(predicting,steps);
  drawDetective();
  drawDecision(steps);
  $('garden-options').hidden=!map.gardenStyle||mode!=='program';
  for(const [id,style] of [['garden-rows','rows'],['garden-scattered','scattered']]){$(id).disabled=busy;$(id).setAttribute('aria-pressed',String(map.gardenStyle===style));}
  $('command-count').textContent=detecting||predicting?steps.length+' săgeți':steps.length+' / '+limit()+' pași';
  document.querySelectorAll('[data-dir]').forEach(b=>{b.disabled=busy||won||steps.length>=limit();if(E.DIR[b.dataset.dir])b.hidden=!E.availableCommands(map).includes(b.dataset.dir);});
  $('editor-title').textContent=map.actions?'1. Alege comenzile':'1. Alege săgețile';
  $('action-pad').hidden=!(map.actions||[]).some(d=>d==='A'||d==='W');
  $('decision-editor').hidden=!map.allowDecision||mode!=='program';
  $('activate').hidden=!(map.actions||[]).includes('A');$('water').hidden=!(map.actions||[]).includes('W');
  $('action-hint').textContent=map.lever?'⚙ se adaugă în program. Funcționează când Robo este pe manetă.':'💧 se adaugă în program. Funcționează când Robo este pe o floare.';
  $('repeat-editor').hidden=!map.allowRepeat||predicting;
  $('repeat-count').disabled=busy||won;$('make-repeat').disabled=busy||won||!repeatCandidate();
  $('repeat-hint').textContent=repeatCandidate()?'Ultimele două comenzi vor fi executate de '+$('repeat-count').value+' ori.':'Ai nevoie de două comenzi noi la sfârșit și de loc în limita de '+limit()+' pași.';
  const recipe=map.recipes&&map.recipes['water-row'];
  $('recipe-editor').hidden=!recipe||predicting;
  $('call-recipe').disabled=busy||won||predicting||!recipe||steps.length+(recipe?recipe.commands.length:0)>limit();
  if(recipe)$('recipe-definition').innerHTML=recipe.commands.map(d=>'<span class="recipe-step" aria-label="'+E.NAME[d]+'">'+E.ARROW[d]+'</span>').join('');
  $('recipe-description').textContent=(map.rowStarts||[]).length===1?'Un nume pentru patru comenzi cunoscute. Îl folosim la A.':'Aceeași rețetă, la A și la B.';
  const current=steps[busy?active:executed],loop=current&&current.count>1;
  const call=current&&current.call;
  $('repeat-progress').hidden=predicting||won||(!loop&&!call);
  $('repeat-progress').classList.toggle('recipe-progress',Boolean(call));
  $('repeat-progress').textContent=call?'📖 '+map.recipes[call].name+' · Pasul '+(current.bodyIndex+1)+' din '+current.bodyLength+' · '+E.NAME[current.command]:loop?'🔁 Repetiția '+(current.iteration+1)+' din '+current.count+' · '+(busy?'Acum: ':'Următoarea comandă: ')+E.NAME[current.command]:'';
  for(const id of ['undo','clear','restart','solution','print-game'])$(id).disabled=busy||((id==='undo'||id==='clear')&&!pending)||(id==='solution'&&(mode!=='program'||won));
  $('clear').textContent=executed?'Șterge cele noi':'Șterge tot';
  $('run').textContent=detecting?'Testăm drumul':predicting?'Verificăm împreună':'Pornește Robo';
  $('run').disabled=busy||(predicting?(!guess||predictionDone):(!pending||won));$('stop').hidden=!busy;
  $('restart').hidden=predicting;$('next-round').hidden=!predicting||busy;
  $('completion').hidden=!(won&&!predicting&&missionIndex!==null);
  const nextStage=map.lesson&&map.lesson.next;
  $('completion-message').textContent=nextStage?'Am reușit! Arătăm drumul și explicăm comenzile.':missionIndex===2?'Am exersat și ocolul! Putem încheia aici sau continua în altă zi.':'Am reușit! Putem explica drumul și îl putem încerca din nou.';
  $('next-mission').hidden=missionIndex===E.missionCount-1&&!nextStage;
  $('next-mission').textContent=nextStage?(C.choices(missionIndex).find(s=>s.id===nextStage).extension?'Opțional: ':'Mai departe: ')+C.choices(missionIndex).find(s=>s.id===nextStage).name:missionIndex===2?'Opțional: cheia și comoara →':'Următoarea lecție →';
  $('practice-detective').hidden=!(won&&mode==='program'&&missionIndex===1&&!nextStage);
  $('detective-continue').hidden=!(mode==='detective'&&won&&guidedDetective);
  $('prediction-title').textContent='Privește cele '+predictionLength+' săgeți';
  $('prediction-count').disabled=busy;
  drawLessonTools();
  // Scroll only the program pane; the map and playback controls stay in place.
  const queue=$('queue'),currentTile=queue.querySelector('.active');
  if(busy&&currentTile&&queue.clientHeight){const pane=queue.getBoundingClientRect(),tile=currentTile.getBoundingClientRect();if(tile.top<pane.top)queue.scrollTop+=tile.top-pane.top-8;else if(tile.bottom>pane.bottom)queue.scrollTop+=tile.bottom-pane.bottom+8;}
 }
 function drawLessonTools(){
  $('auto-decision').disabled=busy;
  $('teacher-lesson').disabled=busy;
  $('lesson-stage').disabled=busy||mode!=='program'||!map.lesson;
  if(!map.lesson||mode!=='program'){$('lesson-observe').textContent=mode==='detective'?'Copilul arată o săgeată de schimbat și explică unde îl va duce.':'Copilul arată căsuța înainte de verificare.';return;}
  $('teacher-lesson').value=String(missionIndex);
  if($('lesson-stage').dataset.lesson!==String(missionIndex)){
   $('lesson-stage').replaceChildren();C.choices(missionIndex).forEach(stage=>{const option=document.createElement('option');option.value=stage.id;option.textContent=(stage.extension?'Extensie: ':'')+stage.name;$('lesson-stage').append(option);});$('lesson-stage').dataset.lesson=String(missionIndex);
  }
  $('lesson-stage').value=map.lesson.stage;$('lesson-observe').textContent='Observăm: '+map.lesson.observe;
 }
 function decisionAnswer(answer){return answer.matched?(answer.alreadyWatered?'DA · Floarea este deja udată.':'DA → 💧 Udăm floarea.'):'NU → Nu udăm. Urmează comanda următoare.';}
 function drawDecision(steps){
  $('check-decision').hidden=!decisionPending;
  const visible=mode==='program'&&map.allowDecision;
  $('decision-feedback').hidden=!visible;
  if(!visible)return;
  if(active<0||!steps[active]||steps[active].command!=='F'){$('decision-feedback').dataset.result='ready';$('decision-question').textContent='🌱 Dacă este floare → Udă';$('decision-answer').textContent='DA: udăm. NU: continuăm programul.';return;}
  const answer=decisions[active];
  $('decision-feedback').dataset.result=answer?(answer.matched?'yes':'no'):'question';
  $('decision-question').textContent='Pasul '+(active+1)+' · 🌱 Este o floare aici?';
  $('decision-answer').textContent=answer?decisionAnswer(answer):busy?(decisionPending?'Spunem DA sau NU. Adultul apasă „Verificăm”.':'Ne gândim împreună: DA sau NU?'):'Am oprit înainte de răspuns. Continuăm cu „Pornește Robo”.';
 }
 function drawDetective(){
  const detecting=mode==='detective';
  $('detective-tools').hidden=!detecting||won;$('detective-completion').hidden=!detecting||!won;
  if(!detecting)return;
  $('detective-hint').disabled=busy;$('detective-repair').hidden=detectiveSelected<0;
  // Keep the choice buttons mounted while running, so keyboard focus is not discarded by each frame.
  if($('detective-choices').dataset.case!==String(detectiveIndex)){
   $('detective-choices').dataset.case=String(detectiveIndex);$('detective-choices').replaceChildren();
   map.detective.choices.forEach(d=>{const b=document.createElement('button');b.type='button';b.dataset.repair=d;b.innerHTML='<strong aria-hidden="true">'+E.ARROW[d]+'</strong><span>'+E.NAME[d][0].toUpperCase()+E.NAME[d].slice(1)+'</span>';b.addEventListener('click',()=>repairDetective(d));$('detective-choices').append(b);});
  }
  $('detective-choices').querySelectorAll('button').forEach(b=>{b.disabled=busy||won||detectiveSelected<0;b.setAttribute('aria-pressed',String(detectiveSelected>=0&&commands[detectiveSelected]!==map.detective.commands[detectiveSelected]&&commands[detectiveSelected]===b.dataset.repair));});
  $('detective-completion-message').textContent=detectiveIndex===E.detectiveCount-1?'Am rezolvat cele trei cazuri împreună!':'Am reparat drumul împreună!';
  $('next-case').textContent=detectiveIndex===E.detectiveCount-1?'Reluăm cele 3 cazuri ↻':'Următorul caz →';
 }
 function selectDetectiveArrow(index){
  if(mode!=='detective'||busy||won||index<0||index>=commands.length)return;
  detectiveSelected=index;draw();report('Schimbăm săgeata '+(index+1)+'. Alege una dintre cele două variante.');
  $('detective-choices').querySelector('button').focus();
 }
 function repairDetective(direction){
  if(mode!=='detective'||busy||won||detectiveSelected<0||!map.detective.choices.includes(direction))return;
  // Every attempt differs from the original by at most one arrow.
  const next=[...map.detective.commands];next[detectiveSelected]=direction;
  if(next.every((d,i)=>d===commands[i])){report('Această săgeată este deja aici. Putem testa sau alege cealaltă variantă.');return;}
  commands=next;cancelRun();rewind();draw();A.play('select');report('Am schimbat o săgeată. Robo este la start. Testăm drumul!');
 }
 function saveProgram(){
  if(mode==='program')savedProgram={map,commands:E.cloneProgram(commands),missionIndex,position:[...position],visited:visited.map(p=>[...p]),executed,active,won,bump,hasKey,world:E.copyWorld(world),decisions:{...decisions}};
 }
 function startDetective(index=0){
  saveProgram();detectiveIndex=index;const round=E.detectiveCase(index);detectiveSelected=index===0?round.detective.repairIndex:-1;
  mode='detective';missionIndex=null;loadMap(round,round.detective.commands);
  report(index===0?'Săgeata 2 este aleasă. O schimbăm ca să ajungem la baterie.':'Privim săgețile. Putem testa drumul, apoi schimbăm o singură săgeată.');
 }
 function rewind(){position=[...map.start];visited=[];active=-1;executed=0;won=false;bump=null;hasKey=Boolean(map.keyPosition&&E.same(map.start,map.keyPosition));world=E.initialWorld();decisions={};predictionDone=false;mood('');}
 function pendingEdited(){active=executed-1;bump=null;mood('');}
 function removePending(index){
  const steps=plan();if(busy||mode!=='program'||index<executed||index>=steps.length)return;
  const blockIndex=steps[index].blockIndex;
  if(typeof commands[blockIndex]!=='string'){const start=steps.findIndex(s=>s.blockIndex===blockIndex),body=E.expand([commands[blockIndex]],limit(),map.recipes).map(s=>s.command);body.splice(index-start,1);commands.splice(blockIndex,1,...body);}else commands.splice(blockIndex,1);
  pendingEdited();draw();report('Am șters o comandă nouă. Robo rămâne pe loc'+(hasKey?', cu cheia.':'.'));
 }
 function idleMessage(){
  if(mode==='detective')return won?'Am reparat drumul împreună!':executed<commands.length?'Testăm drumul de unde s-a oprit Robo.':'Robo s-a oprit aici. Schimbăm o săgeată și încercăm din nou.';
  if(won)return 'Misiune terminată! „La start” pregătește o nouă încercare.';
  if(plan().length>executed)return 'Apasă „Pornește Robo”: continuăm de aici cu comenzile noi'+(hasKey?', cu cheia la noi.':'.');
  if(map.lever)return world.bridgeOpen?'Podul a coborât! Adaugă drumul peste râu până la steag.':'Mergi pe manetă, apoi adaugă „Activează” în program.';
  if(map.allowDecision)return E.gateOpen(map,world)?'Am îngrijit florile! '+(map.gate?'Poarta s-a deschis. ':'')+'Mergem la căsuță.':map.allowRepeat?'Poți repeta → și „Dacă este o floare aici → Udă”. Pe locul gol, Robo nu udă.':'Încercăm 🌱? pe gol și pe floare. Spunem NU sau DA înainte să verificăm.';
  if(map.recipes){
   if(E.gateOpen(map,world))return 'Florile sunt udate! '+(map.gate?'Poarta este deschisă. ':'')+'Mergem la cartea rețetelor.';
   if((map.rowStarts||[]).length===1)return 'Folosim rețeta la A: →, Udă, →, Udă. Apoi mergem la carte.';
   if(map.flowers.slice(0,2).every(p=>world.watered.includes(p)))return 'Rândul A este udat! Mergi la B și folosește din nou „Udă un rând”.';
   return 'La A și la B putem folosi aceeași rețetă: „Udă un rând”.';
  }
  if(map.flowers)return E.gateOpen(map,world)?'Toate florile au înflorit! Adaugă drumul '+(map.gate?'prin poartă ':'')+'până la căsuță.':'Am udat '+world.watered.length+' din '+map.flowers.length+' flori. Continuăm cu → și 💧 Udă.';
  return map.keyPosition?(hasKey?'Cheia este la noi! Adaugă săgețile până la cufăr și pornește din nou.':'Adaugă săgețile spre cheie. Robo va continua de aici.'):'Adaugă săgeți noi. Robo va continua din căsuța în care a ajuns.';
 }
 function cancelRun(){runToken++;if(decisionPending){const pending=decisionPending;decisionPending=null;pending.resolve();}busy=false;A.stop();mood('');}
 function stop(){if(!busy)return;cancelRun();draw();report(mode==='predict'?'Ne-am oprit. Putem schimba alegerea. Verificarea reia programul de la start.':'Ne-am oprit. '+idleMessage());}
 function loadMap(m,program=[]){cancelRun();map=m;commands=E.cloneProgram(program);guess=null;$('repeat-count').value=String(m.repeatCount||3);$('repeat-editor').open=false;rewind();draw();report(program.length?'Program pregătit. Unde credeți că va ajunge Robo?':'Alege comenzile. Robo le va urma în ordine.');}
 function loadFree(m,program=[]){mode='program';missionIndex=null;savedProgram=null;loadMap(m,program);}
 function startMission(index,options={}){
  if(index<0||index>=E.missionCount||(index>completed&&!options.preview))return;
  mode='program';missionIndex=index;savedProgram=null;$('reset-confirmation').hidden=true;$('mission-picker').open=false;const chosen=options.stage||(index>=completed?checkpoints[index]:null);const lessonMap=C.get(index,chosen);if(options.scattered!==undefined){Object.assign(lessonMap,E.mission(index,{scattered:options.scattered}));lessonMap.lesson.next=null;}loadMap(lessonMap);
 }
 function freshMap(){let m=E.generate(seed());const fingerprint=x=>JSON.stringify([x.start,x.goal,x.obstacles]);if(fingerprint(m)===fingerprint(map))m=E.generate(seed());m.label='Hartă inventată · '+generated;loadFree(m);report('O hartă nouă, după aceleași reguli. Există un drum până la comoară.');}
 function add(d){if(mode!=='program'||busy||won||plan().length>=limit()||!E.availableCommands(map).includes(d))return;commands.push(d);pendingEdited();draw();report(executed?idleMessage():'Programul are '+plan().length+(plan().length===1?' comandă.':' comenzi.')+' Îl testăm când e gata.');}
 function selectGuess(p){
  if(mode!=='predict'||busy||predictionDone||map.obstacles.includes(E.key(p)))return;
  guess=[...p];draw();A.play('select');report('Am ales rândul '+(p[1]+1)+', coloana '+(p[0]+1)+'. Apăsăm „Verificăm împreună”.');
 }
 function newPrediction(){
  saveProgram();
  const size=3;
  const previous=JSON.stringify([map.start,map.goal,commands]);
  let round=E.predictionRound(seed(),size,predictionLength);
  for(let tries=0;tries<5&&JSON.stringify([round.map.start,round.map.goal,round.commands])===previous;tries++)round=E.predictionRound(seed(),size,predictionLength);
  mode='predict';loadMap(round.map,round.commands);report('Privește cele '+predictionLength+' săgeți și alege o căsuță de pe hartă.');
 }
 function returnToProgram(){
  if(mode==='program')return;
  cancelRun();mode='program';const saved=savedProgram;savedProgram=null;
  if(saved){({map,commands,missionIndex,position,visited,executed,active,won,bump,hasKey,world,decisions}=saved);guess=null;predictionDone=false;draw();report(idleMessage(),won?'success':'');}else startMission(Math.min(completed,E.missionCount-1));
 }
 function finishPrediction(animate=false){
  busy=false;predictionDone=true;const correct=E.same(position,guess);draw(animate);mood(correct?'happy':'curious');A.play(correct?'win':'retry');
  report(correct?'Am ghicit! Robo s-a oprit chiar în căsuța aleasă.':'Bună încercare! Robo s-a oprit la rândul '+(position[1]+1)+', coloana '+(position[0]+1)+'. Urmărim urmele și încercăm altă rundă.',correct?'success':'');
 }
 function finishMission(animate=false){
  busy=false;won=true;let stored=true;
  if(mode==='detective'){draw(animate);mood('happy');A.play('win');report('Am reparat drumul! Robo a ajuns la '+map.goalName+'.','success');return;}
  if(missionIndex!==null){
   if(map.lesson&&map.lesson.next)checkpoints[missionIndex]=map.lesson.next;
   else if(missionIndex===completed){completed++;delete checkpoints[missionIndex];}
   try{localStorage.setItem(progressKey,JSON.stringify({version:3,completed}));localStorage.setItem(checkpointKey,JSON.stringify({version:1,stages:checkpoints}));}catch{stored=false;}
  }
  draw(animate);mood('happy');A.play('win');
  report((map.keyPosition?'Am deschis comoara cu cheia!':'Am ajuns la destinație!')+' Am reușit în '+executed+(executed===1?' pas.':' pași.')+(!stored?' Progresul rămâne doar până închidem pagina.':''),'success');
 }
 const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
 async function run(){
  const steps=plan();
  if(busy||(mode==='predict'?(!guess||predictionDone):(won||executed>=steps.length)))return;
  if(mode==='predict')rewind();
  const token=++runToken;busy=true;$('repeat-editor').open=false;bump=null;mood('');draw();A.play('start');report(executed?'Robo continuă cu comenzile noi…':'Robo urmează comenzile noastre…');
  for(let i=executed;i<steps.length;i++){
   if(token!==runToken)return;active=i;const command=steps[i].command;draw();
   if(command==='F')report('Robo privește căsuța. Spunem împreună: DA sau NU?');
   if(command==='F'&&!$('auto-decision').checked){await new Promise(resolve=>{decisionPending={resolve,token};draw();});}
   else await pause(command==='F'?2000:300);
   if(token!==runToken)return;
   const result=E.step(map,position,command,hasKey,world);
   if(!result.ok){
    busy=false;const delta=E.DIR[command];bump=delta?E.key([position[0]+delta[0],position[1]+delta[1]]):E.key(position);
    const problems={locked:'cufărul este încuiat! Luăm mai întâi cheia.',tree:'un copac ne blochează! Ce comandă schimbăm?',edge:'am ieși de pe hartă! Ce comandă schimbăm?',bridge:'podul este ridicat. Mergem la manetă și folosim „Activează”.',water:'aici este râul! Traversăm doar pe pod.',gate:'poarta este închisă. Udăm mai întâi toate florile.',lever:'„Activează” funcționează pe căsuța cu maneta.',activated:'maneta este deja activată. Putem șterge această comandă.',flower:'„Udă” funcționează pe căsuța cu o floare.',watered:'floarea este deja udată. Mergem la următoarea!',command:'această comandă nu este disponibilă pe hartă.'};
    const problem=(result.reason==='flowers'?'mai avem flori de îngrijit înainte să ajungem la căsuță.':problems[result.reason]||problems.command)+(steps[i].call?' Folosește „Desfă în comenzi” ca să repari această folosire a rețetei.':steps[i].count>1?' Folosește „Desfă în comenzi” ca să repari repetiția.':'');
    draw();mood('curious');A.play('retry');report(mode==='detective'?(result.reason==='tree'?'Un copac este în drum.':'Robo ar ieși de pe hartă.')+' Schimbăm o săgeată și încercăm din nou.':'Pasul '+(i+1)+': '+problem,mode==='detective'?'':'error');return;
   }
   // Commit movement, inventory and cursor together before any wait. A stop must never replay this step.
   if(!E.same(position,result.position))visited.push([...position]);position=result.position;hasKey=result.hasKey;world=result.world;executed=i+1;
   if(result.decision)decisions[i]=result.decision;
   // Victory belongs to the committed move, even if the view changes during its visual animation.
   if(result.won||(mode==='predict'&&executed===steps.length)){if(mode==='predict')finishPrediction(true);else finishMission(true);return;}
   draw(Boolean(E.DIR[command]));A.play(result.collectedKey||result.activated||result.wateredFlower?'select':'step');
   if(result.collectedKey)report('Am luat cheia! Acum putem merge la cufăr.','success');
   if(result.activated){mood('happy');report('Maneta a coborât podul! Acum putem traversa râul.','success');}
   if(result.wateredFlower&&!result.decision){mood('happy');report(E.gateOpen(map,world)?(map.gate?'Toate florile au înflorit! Poarta s-a deschis.':'Florile au înflorit! Mergem la destinație.'):'Floarea a înflorit! Am udat '+world.watered.length+' din '+map.flowers.length+' flori.','success');}
   if(result.decision){if(result.wateredFlower)mood('happy');report(decisionAnswer(result.decision),result.decision.matched?'success':'');}
   await pause(command==='F'?1000:420);if(token!==runToken)return;
   if((result.collectedKey&&map.pauseAfterKey)||(result.activated&&map.pauseAfterAction)){busy=false;draw();report(result.collectedKey?'Am luat cheia. Observăm: ea rămâne la Robo. Adăugăm drumul spre cufăr sau apăsăm Pornește pentru comenzile rămase.':'Maneta a coborât podul. Observăm schimbarea, apoi continuăm cu Pornește Robo.','success');return;}
  }
  if(mode==='predict'){finishPrediction();return;}
  busy=false;draw();report(idleMessage());
 }
 function showView(next){if(busy)stop();A.stop();view=next;document.body.classList.toggle('game-screen',next==='game');for(const name of ['game','story','sheet'])$(name+'-view').hidden=name!==next;document.querySelectorAll('[data-view]').forEach(b=>{b.classList.toggle('selected',b.dataset.view===next);b.setAttribute('aria-pressed',String(b.dataset.view===next));});if(next==='story')renderScene();if(next==='sheet')renderSheet();if(next==='game')fitBoard();}
 function worksheet(m){
  if(m.detective)return '<article class="worksheet"><h2>Detectivul Robo</h2><p>Îl ajutăm pe Robo să ajungă la '+m.goalName+'.</p><div class="team">Echipa: ______________________________</div><div class="board" style="--board-size:3" role="img" aria-label="Hartă cu 3 rânduri și 3 coloane pentru detectivi">'+boardHTML(m)+'</div><p>① Urmărim săgețile. ② Încercuim una de schimbat.</p><div class="detective-sheet-program">'+m.detective.commands.map(d=>'<span>'+E.ARROW[d]+'</span>').join(' ')+'</div><p>③ Desenăm drumul reparat. ④ Testăm cu un pion.</p><div class="sheet-queue" style="grid-template-columns:repeat('+m.detective.commands.length+',1fr)">'+m.detective.commands.map((_,i)=>'<span>'+(i+1)+'</span>').join('')+'</div><p class="roles">Alegem dintre '+m.detective.choices.map(d=>E.ARROW[d]).join(' și ')+'. Schimbăm o singură săgeată. Încercăm de câte ori avem nevoie.</p><div class="check"><span>□ Am testat.</span><span>□ Am reparat împreună.</span></div></article>';
  const instructions=m.lesson?m.brief:m.allowDecision?'În grădină, repetă de trei ori: → și 🌱? (Dacă este o floare aici → Udă). Pe locul gol nu udăm. După toate florile, treci prin poartă la căsuță.':m.recipes?'Folosește rețeta „Udă un rând” la A, mergi la B și folosește-o din nou. După patru flori udate, mergi prin poartă la carte.':m.lever?'Mergi la manetă și scrie ⚙ Activează. Apoi traversează podul până la steag.':m.flowers?'Udă fiecare floare cu 💧. Poarta se deschide după trei flori udate. Ajungi la căsuță.':m.keyPosition?'Ia mai întâi cheia 🔑, apoi deschide cufărul. Ocolește copacii.':'Condu robotul la destinație: '+(m.goalName||'comoară')+'. Ocolește copacii.';
  const checks=m.allowDecision?'<span>□ Am verificat DA/NU.</span><span>□ Am explicat răspunsul.</span>':m.lever?'<span>□ Am activat maneta.</span><span>□ Am traversat podul.</span>':m.flowers?'<span>□ Am udat '+m.flowers.length+(m.flowers.length===1?' floare.':' flori.')+'</span><span>□ Am ajuns'+(m.gate?' prin poartă':'')+'.</span>':m.keyPosition?'<span>□ Am luat cheia.</span><span>□ Am deschis cufărul.</span>':'<span>□ Am ajuns!</span>';
  const slots=m.lesson?Math.min(16,Math.max(2,(E.solve(m)||[]).length+(m.allowDecision?1:0))):16;
  return '<article class="worksheet"><h2>Misiunea de explorator</h2><p>'+instructions+(m.allowDecision?' 🌱? înseamnă: Dacă este o floare aici → Udă. DA: udăm. NU: continuăm fără udare.'+(m.gate?' După toate florile, trecem prin poartă.':''):'')+'</p><div class="team">Echipa: ______________________________</div><div class="board" style="--board-size:'+m.size+'" role="img" aria-label="Hartă cu '+m.size+' rânduri și '+m.size+' coloane pentru fișa de explorator">'+boardHTML(m)+'</div><p class="roles">① Desenează comenzile. ② Colegul mută pionul și execută acțiunile. ③ Schimbați rolurile.</p><b>Programul nostru</b><div class="sheet-queue" style="grid-template-columns:repeat('+Math.min(slots,8)+',1fr)">'+Array.from({length:slots},(_,i)=>'<span>'+(i+1)+'</span>').join('')+'</div>'+(m.recipes?'<p class="roles">📖 Udă un rând = → 💧 → 💧. Folosește rețeta la locul marcat.</p>':'')+(m.allowRepeat?'<p class="roles">🔁 Repetă de ___ ori: [ ______ ] [ ______ ]. Desenează câte o floare după fiecare udare.</p>':'')+'<div class="check"><span>□ Am testat.</span><span>□ Am reparat.</span>'+checks+'</div><p class="roles">Arată o săgeată și explică unde îl duce pe Robo.</p></article>';
 }

 function renderSheet(){$('sheet-preview').innerHTML=worksheet(sheetMap);}
 function printMap(m){$('print-area').innerHTML=worksheet(m);$('print-area').setAttribute('aria-hidden','false');window.print();}
 function renderScene(){
  const s=scenes[sceneIndex];$('scene-counter').textContent='Scena '+(sceneIndex+1)+' din '+scenes.length;$('scene-time').textContent=s.time;$('scene-kicker').textContent=s.kicker;$('scene-title').textContent=s.title;$('scene-line').textContent=s.line;$('scene-action').textContent=s.action;$('scene-notes').textContent=s.notes;$('scene-question').textContent=s.question;
  let html='';const first=s.visual==='bug'?E.detectiveCase(0):s.visual==='obstacle'?C.get(2):C.get(0,s.visual==='intro'?'one':'two');
  if(s.visual==='intro')html='<img src="assets/robot-treasure-island.png" alt="Un robot prietenos ține o hartă pe o insulă, lângă un cufăr cu comori." width="1536" height="1024">';
  else if(s.visual==='arrows')html='<div class="arrow-demo">'+['R'].map(d=>'<div><strong>'+E.ARROW[d]+'</strong>'+E.NAME[d]+'</div>').join('')+'</div>';
  else if(s.visual==='map'||s.visual==='bug'||s.visual==='obstacle'){html='<div class="board" style="--board-size:'+first.size+'">'+boardHTML(first)+'</div>';if(s.visual==='bug')html+='<div class="mini-program"><span>→</span><span class="bad">↑</span></div>';}
  else if(s.visual==='factory')html='<div class="map-factory">'+[11,23,37,51].map(seed=>'<div class="board">'+boardHTML(E.generate(seed))+'</div>').join('')+'</div>';
  else if(s.visual==='rules')html='<div class="rule-cards"><div><b>1</b><span>Start și comoară în locuri diferite</span></div><div><b>2</b><span>Copaci doar pe locuri libere</span></div><div><b>3</b><span>Cel puțin un drum posibil</span></div></div>';
  else if(s.visual==='extensions')html='<div class="rule-cards"><div><b>🔑</b><span>Întâi cheia, apoi cufărul</span></div><div><b>⚙</b><span>O acțiune coboară podul</span></div><div><b>🌱</b><span>Îngrijim o floare</span></div></div>';
  else if(s.visual==='sheet')html='<div class="sheet-preview">'+worksheet(first)+'</div>';
  else html='<div class="recap"><div><span>🧭</span>Dăm instrucțiuni.</div><div><span>🔎</span>Testăm și reparăm.</div><div><span>🗺️</span>Explicăm drumul.</div></div>';
  $('scene-visual').innerHTML=html;$('previous').disabled=sceneIndex===0;$('next').disabled=sceneIndex===scenes.length-1;
  $('story-dots').replaceChildren();scenes.forEach((_,i)=>{const b=document.createElement('button');b.textContent=i+1;b.setAttribute('aria-label','Scena '+(i+1));b.setAttribute('aria-pressed',String(i===sceneIndex));b.className=i===sceneIndex?'active':'';b.addEventListener('click',()=>{sceneIndex=i;renderScene();});$('story-dots').append(b);});
 }
 function sceneAction(){
  const target=scenes[sceneIndex].target;
  if(target==='sheet'){sheetMap=C.get(0,'two');showView('sheet');return;}
  showView('game');
  if(target==='first'||target==='directions'){startMission(0,{stage:'one',preview:true});if(target==='directions')loadMap(C.get(0,'one'),['R']);}
  else if(target==='sequence')startMission(0,{stage:'two',preview:true});
  else if(target==='bug'){guidedDetective=true;startDetective();}
  else if(target==='obstacle')startMission(2,{stage:'one-tree',preview:true});
  else if(target==='key')startMission(3,{stage:'nearby',preview:true});
 }

 document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>showView(b.dataset.view)));
 document.querySelector('.brand').addEventListener('click',e=>{e.preventDefault();showView('game');});
 document.querySelectorAll('[data-dir]').forEach(b=>b.addEventListener('click',()=>add(b.dataset.dir)));
 $('make-repeat').addEventListener('click',()=>{if(busy||won)return;const next=repeatCandidate();if(!next)return;commands=next;$('repeat-editor').open=false;pendingEdited();draw();report('Am grupat cele două comenzi. Robo le va repeta de '+$('repeat-count').value+' ori.');});
 $('repeat-count').addEventListener('change',()=>draw());
 for(const [id,scattered] of [['garden-rows',false],['garden-scattered',true]])$(id).addEventListener('click',()=>{if(busy||mode!=='program'||!map.gardenStyle||Boolean(map.allowDecision)===scattered)return;startMission(5,{scattered});report(scattered?'Aceeași grădină, altă încercare: putem repeta → și „Dacă este floare → Udă”.':'Florile sunt la rând. Putem repeta → și Udă.');});
 $('call-recipe').addEventListener('click',()=>{
  const recipe=map.recipes&&map.recipes['water-row'];
  if(busy||won||mode!=='program'||!recipe||plan().length+recipe.commands.length>limit())return;
  commands.push({call:'water-row'});pendingEdited();draw();report('Am adăugat „Udă un rând”. Robo va urma cei patru pași ai rețetei din poziția în care se află.');
 });
 $('run').addEventListener('click',run);$('stop').addEventListener('click',stop);
 $('program-mode').addEventListener('click',returnToProgram);
 $('predict-mode').addEventListener('click',()=>{if(mode!=='predict')newPrediction();});
 $('detective-mode').addEventListener('click',()=>{if(mode!=='detective')startDetective();});
 $('detective-hint').addEventListener('click',()=>{if(mode==='detective')selectDetectiveArrow(map.detective.repairIndex);});
 $('next-case').addEventListener('click',()=>{if(mode==='detective'&&won)startDetective((detectiveIndex+1)%E.detectiveCount);});
 $('next-round').addEventListener('click',newPrediction);
 $('next-mission').addEventListener('click',()=>{if(!won||mode!=='program')return;if(map.lesson&&map.lesson.next)startMission(missionIndex,{stage:map.lesson.next,preview:true});else startMission(missionIndex+1,{preview:true});});
 $('practice-detective').addEventListener('click',()=>{guidedDetective=true;startDetective();});
 $('detective-continue').addEventListener('click',()=>{if(mode==='detective'&&won&&guidedDetective){guidedDetective=false;startMission(2,{preview:true});}});
 $('check-decision').addEventListener('click',()=>{if(!busy||!decisionPending||decisionPending.token!==runToken)return;const pending=decisionPending;decisionPending=null;$('check-decision').hidden=true;pending.resolve();});
 $('prediction-count').addEventListener('change',()=>{if(busy)return;predictionLength=Number($('prediction-count').value)===3?3:2;if(mode==='predict')newPrediction();});
 for(let i=0;i<C.count;i++){const m=C.get(i),o=document.createElement('option');o.value=String(i);o.textContent=m.lesson.group+' · '+(i+1)+'. '+m.title;$('teacher-lesson').append(o);}
 $('teacher-lesson').addEventListener('change',()=>{if(!busy)startMission(Number($('teacher-lesson').value),{preview:true});});
 $('lesson-stage').addEventListener('change',()=>{if(!busy&&mode==='program'&&map.lesson)startMission(missionIndex,{stage:$('lesson-stage').value,preview:true});});
 $('reset-adventure').addEventListener('click',()=>{$('reset-confirmation').hidden=false;});
 $('cancel-reset').addEventListener('click',()=>{$('reset-confirmation').hidden=true;});
 $('confirm-reset').addEventListener('click',()=>{completed=0;checkpoints={};guidedDetective=false;try{localStorage.removeItem(progressKey);localStorage.removeItem(checkpointKey);}catch{}startMission(0);});
 $('sound').addEventListener('click',async()=>{
  const button=$('sound');button.disabled=true;
  try{const enabled=await A.toggle();button.textContent=enabled?'♫ Sunet pornit':'♫ Sunet oprit';button.setAttribute('aria-pressed',String(enabled));}
  catch{button.textContent='♫ Sunet indisponibil';button.setAttribute('aria-pressed','false');if(view==='game')report('Sunetul nu este disponibil în acest browser. Putem continua jocul.');}
  finally{button.disabled=false;}
 });
 $('clear').addEventListener('click',()=>{if(busy||mode!=='program')return;commands=E.executedPrefix(commands,executed,map.recipes);pendingEdited();draw();report(executed?'Am șters comenzile noi. Robo și harta păstrează tot ce am făcut'+(hasKey?', inclusiv cheia.':'.'):'Un program nou. Ce comandă alegem prima?');});
 $('undo').addEventListener('click',()=>removePending(plan().length-1));
 $('restart').addEventListener('click',()=>{if(busy||mode==='predict')return;cancelRun();rewind();draw();report('Robo este la start'+(map.keyPosition?', iar cheia este înapoi pe hartă.':map.lever?', iar podul este din nou ridicat.':map.flowers?', iar florile așteaptă apă'+(map.gate?' și poarta este închisă.':'.'):'.')+' Programul a rămas pregătit.');});
 $('new-map').addEventListener('click',freshMap);$('bug-map').addEventListener('click',()=>startDetective());$('first-map').addEventListener('click',()=>loadFree(E.firstMap()));
 $('solution').addEventListener('click',()=>{
  if(busy||mode!=='program'||won)return;
  const remaining=E.solve(map,{position,hasKey,world});
  if(!remaining){report('Nu am găsit un drum din această căsuță. Putem reveni „La start”.');return;}
  if(executed+remaining.length>limit()){report('Drumul ar depăși limita de '+limit()+' pași. „La start” ne permite să pregătim un traseu nou.');return;}
  commands=[...E.executedPrefix(commands,executed,map.recipes),...remaining];pendingEdited();draw();report('Am pregătit un drum din poziția curentă'+(hasKey?', păstrând cheia.':', păstrând acțiunile deja făcute.'));
 });
 $('print-game').addEventListener('click',()=>printMap(map));$('print-sheet').addEventListener('click',()=>printMap(sheetMap));$('refresh-sheet').addEventListener('click',()=>{sheetMap=E.generate(seed(),{size:sheetMap.size});renderSheet();});
 $('previous').addEventListener('click',()=>{if(sceneIndex>0){sceneIndex--;renderScene();}});$('next').addEventListener('click',()=>{if(sceneIndex<scenes.length-1){sceneIndex++;renderScene();}});$('scene-action').addEventListener('click',sceneAction);
 $('fullscreen').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else throw Error('unavailable');}catch{if(view!=='game')showView('game');report('Pentru ecran complet poți folosi F11 în browser.');}});
 document.addEventListener('fullscreenchange',()=>{$('fullscreen').textContent=document.fullscreenElement?'Ieși din ecran complet':'Ecran complet';});
 document.addEventListener('keydown',e=>{if(/INPUT|TEXTAREA|SELECT|SUMMARY/.test(e.target.tagName)||e.ctrlKey||e.metaKey||e.altKey)return;const keys={ArrowUp:'U',ArrowDown:'D',ArrowLeft:'L',ArrowRight:'R'};if(view==='game'&&keys[e.key]&&mode==='program'){e.preventDefault();add(keys[e.key]);}else if(view==='game'&&keys[e.key]&&mode==='predict'&&e.target.parentElement===$('board')){e.preventDefault();const cells=Array.from($('board').children),index=cells.indexOf(e.target),d=E.DIR[keys[e.key]];let x=index%map.size+d[0],y=Math.floor(index/map.size)+d[1];while(x>=0&&x<map.size&&y>=0&&y<map.size){const cell=cells[y*map.size+x];if(!cell.disabled){cell.focus();break;}x+=d[0];y+=d[1];}}else if(view==='story'&&(e.key==='ArrowLeft'||e.key==='ArrowRight')){e.preventDefault();sceneIndex=Math.max(0,Math.min(scenes.length-1,sceneIndex+(e.key==='ArrowRight'?1:-1)));renderScene();}});
 window.addEventListener('afterprint',()=>{$('print-area').setAttribute('aria-hidden','true');});
 window.addEventListener('resize',fitBoard);
 if(window.ResizeObserver)new ResizeObserver(fitBoard).observe($('board-frame'));
 document.addEventListener('visibilitychange',()=>{if(document.hidden){if(busy)stop();A.stop();}});
 draw();renderSheet();report(map.brief);
 const context=document.modelContext;
 if(context&&typeof context.registerTool==='function'){
  const lifecycle=new AbortController();window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
  const primitive={type:'string',enum:['U','D','L','R','A','W','F']},commandSchema=primitive;
  const tool={name:'stage_robo_program',title:'Pregătește programul robotului',description:'Primește programul complet. U/D/L/R sunt direcții; A activează maneta în misiunea 5; W udă o floare în misiunile 6 și 7. F este disponibil numai în etapele cu decizie ale grădinii: dacă Robo este pe o floare, o udă; altfel nu udă și continuă cu următoarea comandă. F se poate combina cu o săgeată într-o repetiție numai în etapa de combinare. Verificarea așteaptă implicit apăsarea adultului. În misiunea 7, {call:water-row} folosește rețeta Udă un rând (R,W,R,W). În etapele cu repetiție ale misiunii 6 se pot grupa exact două comenzi în {repeat:2 sau 3,commands:[...]}. Prefixul pașilor executați, după desfășurarea repetițiilor, trebuie păstrat identic. Păstrează poziția și starea hărții; nu pornește robotul.',inputSchema:{type:'object',properties:{commands:{type:'array',items:{anyOf:[commandSchema,{type:'object',properties:{repeat:{type:'integer',enum:[2,3]},commands:{type:'array',items:primitive,minItems:2,maxItems:2}},required:['repeat','commands'],additionalProperties:false},{type:'object',properties:{call:{type:'string',enum:['water-row']}},required:['call'],additionalProperties:false}]},maxItems:32}},required:['commands'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(input){
   if(busy)throw Error('Robotul este în mișcare.');
   if(mode!=='program')throw Error('Revino la Programăm pentru a schimba comenzile.');
   if(won)throw Error('Misiunea este terminată. Folosește „La start” pentru o nouă încercare.');
   if(!input||Object.keys(input).some(k=>k!=='commands')||!Array.isArray(input.commands))throw Error('Program invalid.');
   const next=E.expand(input.commands,limit(),map.recipes);
   if(next.some(s=>!E.availableCommands(map).includes(s.command))||(!map.allowRepeat&&input.commands.some(b=>typeof b!=='string'&&!Object.hasOwn(b,'call'))))throw Error('Acțiune sau repetiție indisponibilă pe această hartă.');
   if(next.length<executed||plan().slice(0,executed).some((s,i)=>s.command!==next[i].command))throw Error('Pașii deja executați trebuie păstrați. Folosește „La start” pentru a-i modifica.');
   commands=E.cloneProgram(input.commands);pendingEdited();showView('game');draw();report('Comenzile noi sunt pregătite. Robo continuă din poziția curentă.');
   return {commands:E.cloneProgram(commands),executed,prediction:E.evaluate(map,commands).outcome};
  }};
  try{Promise.resolve(context.registerTool(tool,{signal:lifecycle.signal})).catch(()=>{});}catch{}
 }
})();
