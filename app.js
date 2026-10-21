(function(){
 'use strict';
 const E=window.RoboEngine,C=window.RoboLessons,A=window.RoboAudio,P=window.RoboAdventures,T=window.RoboClassroom,$=id=>document.getElementById(id);
 let classLesson=null,classVariant=0,homeMode=false,classReturnView='game';
 const packProgress={};let activePack=null,packIndex=0,energyCheckpoint=null,missingChosen=false,routeResults={},selectedRoute=null,storageAvailable=true;
 for(const pack of Object.keys(P.packs)){try{packProgress[pack]=P.readProgress(localStorage.getItem('robo-adventure-'+pack+'-v1'),pack);}catch{packProgress[pack]=P.readProgress(null,pack);storageAvailable=false;}}
 const progressKey='robo-explorator-progress-v1';
 let completed=0;
 try{completed=E.readProgress(localStorage.getItem(progressKey));}catch{}
 const checkpointKey='robo-explorator-lessons-v1';
 let checkpoints={};try{checkpoints=C.readCheckpoints(localStorage.getItem(checkpointKey));}catch{}
 let missionIndex=Math.min(completed,E.missionCount-1);
 let map=C.get(missionIndex,checkpoints[missionIndex]),commands=[],position=[...map.start],visited=[],active=-1,busy=false,runToken=0,view='game',generated=0,won=false,bump=null;
 let mode='program',guess=null,predictionDone=false,savedProgram=null,boardSignature='',motionTimer,hasKey=false,executed=0;
 let world=E.initialWorld();
 let decisions={};
 let decisionPending=null;
 function goalHTML(m,opened=false){
  if(m.goalIcon==='🏡')return '🏡';
  return '<svg class="chest-icon" viewBox="0 0 64 64" aria-hidden="true"><path d="'+(opened?'M8 25L13 6H51L56 25Z':'M8 29V22Q8 11 19 11H45Q56 11 56 22V29Z')+'" fill="#e6ad40" stroke="#805326" stroke-width="3"/><rect x="8" y="29" width="48" height="25" rx="4" fill="#b96b35" stroke="#805326" stroke-width="3"/><path d="M18 30V52M46 30V52" stroke="#ffda70" stroke-width="6"/><rect x="26" y="26" width="12" height="14" rx="3" fill="#ffda70"/><circle cx="32" cy="32" r="2.5" fill="#805326"/>'+(opened?'<path d="M24 23L32 15L40 23L32 30Z" fill="#55d5ed" stroke="#147c83" stroke-width="2"/>':'')+'</svg>';
 }
 function lockBadge(unlocked=false){return '<span class="lock-badge" aria-hidden="true">'+(unlocked?'🔓':'🔒')+'</span>';}
 function riverHTML(bridge=false){
  const water='<rect width="100" height="100" fill="#9ddced"/><path d="M-10 14Q0 6 10 14T30 14T50 14T70 14T90 14T110 14M-10 50Q0 42 10 50T30 50T50 50T70 50T90 50T110 50M-10 86Q0 78 10 86T30 86T50 86T70 86T90 86T110 86" fill="none" stroke="#399bbf" stroke-width="3"/>';
  const leaf='<rect x="0" y="28" width="50" height="44" rx="2" fill="#dca957" stroke="#714722" stroke-width="3"/><path d="M10 30V70M21 30V70M32 30V70M43 30V70" stroke="#99612c" stroke-width="2"/><path d="M0 32H50M0 68H50" stroke="#ffe0a1" stroke-width="4"/>';
  return '<svg class="'+(bridge?'bridge-icon':'river-surface')+'" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">'+water+(bridge?'<g class="bridge-leaf-left">'+leaf+'</g><g class="bridge-leaf-right"><g transform="translate(100 0) scale(-1 1)">'+leaf+'</g></g><path d="M3 25V75M97 25V75" stroke="#714722" stroke-width="6" stroke-linecap="round"/>':'')+'</svg>';
 }
 function specialTile(m,p,state=E.initialWorld()){
  const k=E.key(p);
  if(m.energy&&m.energy.chargers.includes(k))return {type:'charger-tile',label:'stație de încărcare, bateria se umple automat',html:'<svg viewBox="0 0 80 80" class="charger-icon" aria-hidden="true"><rect x="16" y="8" width="42" height="62" rx="8" fill="#fff" stroke="#147c83" stroke-width="5"/><path d="M41 16L26 39H38L32 58L50 32H38Z" fill="#f8bd29" stroke="#9b6505" stroke-width="2"/><path d="M59 27Q73 27 70 49V57" fill="none" stroke="#147c83" stroke-width="5"/><path d="M10 72H65" stroke="#147c83" stroke-width="6"/></svg>'};
  if(m.stops&&m.stops.includes(k)){const done=(state.stops||[]).includes(k);return {type:'stop-tile'+(done?' stop-visited':''),label:done?'stea vizitată':'stea de vizitat înainte de căsuță',html:'⭐'+(done?'<span class="world-badge">✓</span>':'')};}
  if(m.bridge&&E.same(p,m.bridge))return {type:'river bridge-tile'+(state.bridgeOpen?' bridge-open':''),label:state.bridgeOpen?'pod coborât, putem traversa':'pod ridicat',html:riverHTML(true)+lockBadge(state.bridgeOpen)};
  if(m.water&&m.water.includes(k))return {type:'river',label:'râu',html:riverHTML()};
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
   const side=Math.floor(Math.min(frame.clientWidth,frame.clientHeight,520));
   if(side>0)stage.style.width=side+'px';
  }else stage.style.removeProperty('width');
  const board=$('board');if(board.clientWidth)board.style.setProperty('--board-width',board.clientWidth+'px');
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
 function blockedRepairDirection(){return map.repairIntro&&mode==='program'&&!busy&&bump?plan()[executed]?.command:null;}
 function repairPrompt(){
  if(won)return 'Am schimbat programul și am ajuns la comoară!';
  if(busy)return 'Urmărim săgețile. Unde se oprește Robo?';
  if(bump)return 'Robo rămâne pe hartă. Putem schimba săgeata.';
  if(executed)return plan().length===executed?'Ce săgeată îl duce acum la comoară?':'Continuăm de unde s-a oprit Robo.';
  if(commands.length===2&&commands[0]==='R'&&commands[1]==='D')return map.brief;
  return commands.length?'Ce va face Robo cu săgețile pe care le-am ales?':'Alege săgeți. Robo rămâne pe hartă.';
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
  const path=new Set(visited.map(E.key)),blockedDirection=blockedRepairDirection();
  Array.from(board.children).forEach((cell,i)=>{
   const p=[i%map.size,Math.floor(i/map.size)],key=E.key(p),robot=E.same(p,position),tree=map.obstacles.includes(key),goal=(mode!=='predict'||predictionDone)&&E.same(p,map.goal),chosen=guess&&E.same(p,guess),isKey=map.keyPosition&&!hasKey&&E.same(p,map.keyPosition);
   const special=specialTile(map,p,world);
   if(robot&&blockedDirection)cell.dataset.blockedEdge=blockedDirection;else delete cell.dataset.blockedEdge;
   cell.className='tile'+(special?' '+special.type:'')+(tree?' tree':'')+(goal?' goal'+(map.keyPosition?' chest-goal':''):'')+(isKey?' key-item':'')+(path.has(key)?' visited':'')+(robot?' robot':'')+(won&&robot?' win':'')+(bump===key?' bump':'')+(chosen?' guessed':'')+(predictionDone&&robot?' answer':'');
   cell.innerHTML='<span aria-hidden="true">'+(tree?'🌲':isKey?'🔑':special?special.html:goal?goalHTML(map,won):path.has(key)?'<span class="trace">•</span>':'')+'</span>'+(goal&&map.keyPosition?lockBadge(hasKey):'')+(chosen?'<span class="guess-pin" aria-hidden="true">📍</span>':'');
   const goalLabel=map.keyPosition?(won?'cufăr deschis':hasKey?'cufăr descuiat':'cufăr încuiat'):map.goalName||'comoară';
   cell.setAttribute('aria-label','Rândul '+(p[1]+1)+', coloana '+(p[0]+1)+': '+(robot?'Robo'+(special?', '+special.label:goal?', '+goalLabel:''):tree?'copac':isKey?'cheie':special?special.label:goal?goalLabel:'liber')+(chosen?', alegerea noastră':'')+(predictionDone&&robot?', aici s-a oprit':'') );
   if(mode==='predict'){cell.disabled=busy||predictionDone||tree;cell.setAttribute('aria-pressed',String(!!chosen));}
  });
  board.setAttribute('aria-label','Hartă cu '+map.size+' rânduri și '+map.size+' coloane. Robo: rândul '+(position[1]+1)+', coloana '+(position[0]+1)+'.'+(mode==='predict'&&!predictionDone?'':' Destinație: rândul '+(map.goal[1]+1)+', coloana '+(map.goal[0]+1)+'.')+(map.keyPosition?(hasKey?' Cheia a fost găsită.':' Cheie: rândul '+(map.keyPosition[1]+1)+', coloana '+(map.keyPosition[0]+1)+'.'):''));
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
   button.setAttribute('aria-label',T.curriculumTitle(i,m.lesson.stage)+(i<completed?', terminată':i>completed?', blocată':''));
   button.setAttribute('aria-current',String(mode==='program'&&i===missionIndex));
   button.innerHTML='<span class="mission-icon" aria-hidden="true">'+(i>completed?'🔒':m.goalIcon)+'</span><span class="mission-name">'+T.curriculumTitle(i,m.lesson.stage)+'</span><span class="mission-size">'+(i<completed?'✓ Gata':'')+'</span>';
   button.addEventListener('click',()=>startMission(i));$('mission-trail').append(button);
  }
  $('adventure-progress').textContent=completed+' din '+E.missionCount+' grupuri terminate';
 }
 function commandTile(d,i,predicting=false){
  if(map.missing||map.routes){
   const gap=map.missing&&i===map.missing.index,b=document.createElement(gap?'button':'span');b.className='command'+(gap?' missing-command':'')+(i<executed?' executed':'')+(busy&&i===active?' active':'');
   b.textContent=gap&&!missingChosen?'?':E.ARROW[d];b.setAttribute('aria-label',gap?'Săgeata de completat: '+(missingChosen?E.NAME[d]:'lipsește'):'Pasul '+(i+1)+': '+E.NAME[d]);
   if(gap){b.disabled=busy||won;b.addEventListener('click',()=>{cancelRun();rewind();missingChosen=false;draw();report('Alege o săgeată pentru locul cu semnul întrebării.');});}return b;
  }
  if(d==='F'){
   const done=i<executed,b=document.createElement(done?'div':'button'),answer=decisions[i];
   b.className='decision-block'+(done?' executed':'')+(busy&&i===active?' active':'');
   b.innerHTML='<b><small>'+(i+1)+'.</small> 🌱 DACĂ este o floare aici</b><span class="decision-then'+(answer&&!answer.matched?' skipped':'')+'">ATUNCI 💧 Udă</span><span class="decision-result">'+(answer?'✓ '+decisionAnswer(answer):busy&&i===active?'Ne gândim: DA sau NU?':'Verificăm când ajungem aici.')+'</span>';
   b.setAttribute('aria-label',(done?'Pas executat ':'Șterge pasul ')+(i+1)+': '+E.NAME.F+(answer?'. '+decisionAnswer(answer):''));
   if(!done){b.type='button';b.disabled=busy;b.addEventListener('click',()=>removePending(i));}
   return b;
  }
  const done=i<executed,b=document.createElement(predicting||done?'span':'button');
  const blocked=blockedRepairDirection()&&i===executed;
  b.className='command'+(done?' executed':'')+(busy&&i===active?' active':'')+(blocked?' repair-blocked':'');b.innerHTML='<small>'+(i+1)+'</small>'+E.ARROW[d]+(done?'<span class="done-mark" aria-hidden="true">✓</span>':blocked?'<span class="repair-remove" aria-hidden="true">×</span>':'');
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
  const length=map.repeatBodyLength||2,n=Number($('repeat-count').value),tail=commands.slice(-length),steps=plan();
  if(!map.allowRepeat||mode!=='program'||tail.length!==length||tail.some(d=>typeof d!=='string')||steps.length-length<executed)return null;
  const candidate=[...commands.slice(0,-length),{repeat:n,commands:tail}];
  try{E.expand(candidate,limit(),map.recipes);return candidate;}catch{return null;}
 }
 function draw(animate=false){
  const predicting=mode==='predict';
  $('game-view').dataset.mode=mode;
  $('game-view').dataset.state=won?'won':busy?'running':commands.length?'ready':'empty';
  drawBoard(animate);drawTrail();
  $('map-label').textContent=map.label;$('step-count').textContent=busy&&active>=0?'Pasul '+(active+1):executed?executed+(executed===1?' pas făcut':' pași făcuți'):'La start';
  const lessonNumber=predicting?T.findByType('predict').id:map.lesson?T.curriculumTitle(missionIndex,map.gardenStyle?(map.allowDecision?'combine':'challenge'):map.lesson.stage).split('.')[0]:null;
  $('game-title').textContent=(lessonNumber?lessonNumber+'. ':'')+(predicting?'Unde se oprește Robo?':map.title||'Condu-l pe Robo la comoară.');
  $('activity-label').textContent=predicting?'GHICIM ȘI VERIFICĂM':map.lesson?T.curriculumTitle(missionIndex,map.lesson.stage):'JOACĂ LIBERĂ';
  $('teacher-guidance').textContent=map.brief||'Alegem săgețile, încercăm și reparăm împreună.';
  $('mission-brief').textContent=predicting?'Arată unde se oprește Robo.':map.repairIntro?repairPrompt():map.keyPosition?(hasKey?'Avem cheia! Mergem la comoară.':'Luăm cheia, apoi deschidem comoara.'):map.lever?'Coborâm podul și ajungem la căsuță.':map.flowers?'Udăm florile, apoi mergem la căsuță.':'Îl ajutăm pe Robo să ajungă la '+(map.goalName||'comoară')+'.';
  $('obstacle-legend').hidden=!map.obstacles.length;
  $('guess-legend').hidden=!predicting;$('goal-legend').hidden=predicting&&!predictionDone;
  $('program-editor').hidden=mode!=='program';$('prediction-instructions').hidden=!predicting;$('edit-actions').hidden=mode!=='program';
  $('queue-title').textContent=predicting?'Programul lui Robo':won?'Drumul reușit':busy?'Urmărim programul':'2. Programul nostru';
  $('queue-hint').textContent=predicting?'Urmărește săgețile în ordine. Poți schimba alegerea înainte de verificare.':executed?'✓ Pași făcuți. Ștergem doar comenzile noi; pentru a modifica pașii făcuți, apăsăm „La start”.':'Atinge o comandă nouă ca să o ștergi. „Pornește Robo” execută comenzile noi.';
  $('execution-note').hidden=mode!=='program';
  const steps=plan(),pending=steps.length-executed;
  $('edit-actions').hidden=mode!=='program'||!pending||busy;
  $('execution-note').textContent=won?'Misiune terminată. „La start” pregătește o nouă încercare.':executed+(executed===1?' pas făcut · ':' pași făcuți · ')+pending+' '+(pending===1?'comandă nouă':'comenzi noi');
  $('program-mode').classList.toggle('selected',mode==='program');$('program-mode').setAttribute('aria-pressed',String(mode==='program'));
  $('predict-mode').classList.toggle('selected',predicting);$('predict-mode').setAttribute('aria-pressed',String(predicting));
  drawQueue(predicting,steps);
  drawDecision(steps);
  $('garden-options').hidden=!map.gardenStyle||mode!=='program';
  for(const [id,style] of [['garden-rows','rows'],['garden-scattered','scattered']]){$(id).disabled=busy;$(id).setAttribute('aria-pressed',String(map.gardenStyle===style));}
  $('command-count').textContent=predicting?steps.length+' săgeți':steps.length+' / '+limit()+' pași';
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
  $('recipe-description').textContent=(map.rowStarts||[]).length===1?'La A, butonul adaugă cele patru comenzi de mai sus.':'Aceeași rețetă la rândurile '+(map.rowStarts||[]).map(row=>row.name).join(', ')+'.';
  const current=steps[busy?active:executed],loop=current&&current.count>1;
  const call=current&&current.call;
  $('repeat-progress').hidden=predicting||won||(!loop&&!call);
  $('repeat-progress').classList.toggle('recipe-progress',Boolean(call));
  $('repeat-progress').textContent=call?'📖 '+map.recipes[call].name+' · Pasul '+(current.bodyIndex+1)+' din '+current.bodyLength+' · '+E.NAME[current.command]:loop?'🔁 Repetiția '+(current.iteration+1)+' din '+current.count+' · '+(busy?'Acum: ':'Următoarea comandă: ')+E.NAME[current.command]:'';
  for(const id of ['undo','clear','restart','solution'])$(id).disabled=busy||((id==='undo'||id==='clear')&&!pending)||(id==='solution'&&(mode!=='program'||won));
  $('clear').textContent=executed?'Șterge cele noi':'Șterge tot';
  $('run').textContent=predicting?'Verificăm împreună':'Pornește Robo';
  $('run').disabled=busy||(predicting?(!guess||predictionDone):(!pending||won));$('stop').hidden=!busy;
  $('restart').hidden=predicting||(!executed&&!bump&&!won);$('next-round').hidden=!predicting||busy;
  $('completion').hidden=!(won&&!predicting&&missionIndex!==null);
  const nextStage=map.lesson&&(map.lesson.next||map.lesson.suggested),nextChoice=nextStage&&C.choices(missionIndex).find(s=>s.id===nextStage);
  $('completion-message').textContent=map.lesson&&map.lesson.next?'Am reușit! Arătăm drumul și explicăm comenzile.':missionIndex===2?'Am exersat și ocolul! Putem încheia aici sau continua în altă zi.':'Am reușit! Putem explica drumul și îl putem încerca din nou.';
  $('next-mission').hidden=missionIndex===E.missionCount-1&&!nextStage;
  $('next-mission').textContent=nextChoice?'Mai departe: '+T.curriculumTitle(missionIndex,nextChoice.id):missionIndex===2?T.curriculumTitle(3,'nearby')+' →':'Următoarea lecție →';
  $('prediction-title').textContent='Privește cele 3 săgeți';
  drawLessonTools();drawAdventure();drawClassroom();
  // Scroll only the program pane; the map and playback controls stay in place.
  const queue=$('queue'),currentTile=queue.querySelector('.active');
  if(busy&&currentTile&&queue.clientHeight){const pane=queue.getBoundingClientRect(),tile=currentTile.getBoundingClientRect();if(tile.top<pane.top)queue.scrollTop+=tile.top-pane.top-8;else if(tile.bottom>pane.bottom)queue.scrollTop+=tile.bottom-pane.bottom+8;}
  const focused=document.activeElement;
  if(busy&&(focused===$('run')||(focused===$('check-decision')&&$('check-decision').hidden)))$('stop').focus({preventScroll:true});
  else if(!busy&&(focused===$('stop')||focused===$('check-decision')))(won?$('restart'):$('run')).focus({preventScroll:true});
 }
 function drawLessonTools(){
  $('auto-decision').disabled=busy;
  $('teacher-lesson').disabled=busy;
  $('lesson-stage').disabled=busy||mode!=='program'||!map.lesson;
  if(!map.lesson||mode!=='program'){$('lesson-observe').textContent='Arătăm căsuța înainte să pornim.';return;}
  $('teacher-lesson').value=String(missionIndex);
  if($('lesson-stage').dataset.lesson!==String(missionIndex)){
   $('lesson-stage').replaceChildren();C.choices(missionIndex).forEach(stage=>{const option=document.createElement('option');option.value=stage.id;option.textContent=T.curriculumTitle(missionIndex,stage.id);$('lesson-stage').append(option);});$('lesson-stage').dataset.lesson=String(missionIndex);
  }
  $('lesson-stage').value=map.lesson.stage;$('lesson-observe').textContent=map.lesson.observe;
 }
 function decisionAnswer(answer){return answer.matched?(answer.alreadyWatered?'DA · Floarea este deja udată.':'DA → 💧 Udăm floarea.'):'NU → Nu udăm. Urmează comanda următoare.';}
 function drawDecision(steps){
  $('check-decision').hidden=!decisionPending;
  const onDecision=mode==='program'&&map.allowDecision&&active>=0&&steps[active]&&steps[active].command==='F';
  const visible=busy&&onDecision;
  $('decision-feedback').hidden=!visible;
  $('status').hidden=!!visible;
  if(!onDecision){$('decision-feedback').dataset.result='ready';return;}
  const answer=decisions[active];
  $('decision-feedback').dataset.result=answer?(answer.matched?'yes':'no'):'question';
  $('decision-question').textContent='Pasul '+(active+1)+' · 🌱 Este o floare aici?';
  $('decision-answer').textContent=answer?decisionAnswer(answer):busy?(decisionPending?'Spunem DA sau NU. Adultul apasă „Verificăm”.':'Ne gândim împreună: DA sau NU?'):'Am oprit înainte de răspuns. Continuăm cu „Pornește Robo”.';
 }
 function saveProgram(){
  if(mode==='program')savedProgram={map,commands:E.cloneProgram(commands),missionIndex,position:[...position],visited:visited.map(p=>[...p]),executed,active,won,bump,hasKey,world:E.copyWorld(world),decisions:{...decisions},activePack,packIndex,energyCheckpoint,missingChosen,routeResults:{...routeResults},selectedRoute,classLesson,classVariant,homeMode};
 }
 function rewind(){position=[...map.start];visited=[];active=-1;executed=0;won=false;bump=null;hasKey=Boolean(map.keyPosition&&E.same(map.start,map.keyPosition));world=E.initialWorld(map);decisions={};predictionDone=false;energyCheckpoint=map.energy?captureCheckpoint():null;mood('');}
 function pendingEdited(){active=executed-1;bump=null;mood('');}
 function removePending(index){
  if(map.missing||map.routes)return;
  const steps=plan();if(busy||mode!=='program'||index<executed||index>=steps.length)return;
  const blockIndex=steps[index].blockIndex;
  if(typeof commands[blockIndex]!=='string'){const start=steps.findIndex(s=>s.blockIndex===blockIndex),body=E.expand([commands[blockIndex]],limit(),map.recipes).map(s=>s.command);body.splice(index-start,1);commands.splice(blockIndex,1,...body);}else commands.splice(blockIndex,1);
  pendingEdited();draw();report(map.repairIntro?'Am șters săgeata. Alege una nouă; Robo continuă de aici.':'Am șters o comandă nouă. Robo rămâne pe loc'+(hasKey?', cu cheia.':'.'));
 }
 function idleMessage(){
  if(won)return 'Misiune terminată! „La start” pregătește o nouă încercare.';
  if(map.energy&&world.energy===0)return 'Bateria este goală. Încercăm din nou de la ultima stație, cu bateria plină.';
  if(map.energy)return 'Mai avem '+world.energy+' liniuțe. O săgeată folosește una; la stație bateria se umple.';
  if(map.stops)return map.stops.every(p=>(world.stops||[]).includes(p))?'Am vizitat '+(map.stops.length>1?'toate stelele':'steaua')+'! Continuăm spre căsuță.':map.stops.length>1?'Mai avem stele de vizitat înainte să mergem acasă.':'Vizităm steaua, apoi continuăm spre căsuță.';
  if(plan().length>executed)return 'Apasă „Pornește Robo”: continuăm de aici cu comenzile noi'+(hasKey?', cu cheia la noi.':'.');
  if(map.lever)return world.bridgeOpen?'Podul a coborât! Adaugă drumul peste râu până la căsuță.':'Mergi pe manetă, apoi adaugă „Activează” în program.';
  if(map.allowDecision)return E.gateOpen(map,world)?'Am îngrijit florile! '+(map.gate?'Poarta s-a deschis. ':'')+'Mergem la căsuță.':map.allowRepeat?'Poți repeta → și „Dacă este o floare aici → Udă”. Pe locul gol, Robo nu udă.':'Încercăm 🌱? pe gol și pe floare. Spunem NU sau DA înainte să verificăm.';
  if(map.recipes){
   if(E.gateOpen(map,world))return 'Florile sunt udate! '+(map.gate?'Poarta este deschisă. ':'')+'Mergem la căsuță.';
   if((map.rowStarts||[]).length===1)return 'Folosim rețeta la A: →, Udă, →, Udă. Apoi mergem la căsuță.';
   const rows=map.rowStarts||[],next=rows.findIndex(row=>map.flowers.some(p=>Number(p.split(',')[1])===row.position[1]&&!world.watered.includes(p)));
   if(next>0)return 'Rândul '+rows[next-1].name+' este udat! Mergi la '+rows[next].name+' și folosește din nou „Udă un rând”.';
   return 'La rândurile '+rows.map(row=>row.name).join(', ')+' putem folosi aceeași rețetă: „Udă un rând”.';
  }
  if(map.flowers)return E.gateOpen(map,world)?'Toate florile au înflorit! Adaugă drumul '+(map.gate?'prin poartă ':'')+'până la căsuță.':'Am udat '+world.watered.length+' din '+map.flowers.length+' flori. Continuăm cu → și 💧 Udă.';
  return map.keyPosition?(hasKey?'Cheia este la noi! Adaugă săgețile până la cufăr și pornește din nou.':'Adaugă săgețile spre cheie. Robo va continua de aici.'):'Adaugă săgeți noi. Robo va continua din căsuța în care a ajuns.';
 }
 function cancelRun(){runToken++;if(decisionPending){const pending=decisionPending;decisionPending=null;pending.resolve();}busy=false;A.stop();mood('');}
 function stop(){if(!busy)return;cancelRun();draw();report(mode==='predict'?'Ne-am oprit. Putem schimba alegerea. Verificarea reia programul de la start.':'Ne-am oprit. '+idleMessage());}
 function loadMap(m,program=[]){cancelRun();map=m;commands=E.cloneProgram(program);guess=null;$('repeat-count').value=String(m.repeatCount||3);$('repeat-editor').open=false;rewind();draw();if(view==='game')window.scrollTo(0,0);report(program.length?'Program pregătit. Unde credeți că va ajunge Robo?':'Alege comenzile. Robo le va urma în ordine.');}
 function loadFree(m,program=[]){classLesson=null;homeMode=false;setAdventureURL(false);mode='program';missionIndex=null;activePack=null;savedProgram=null;loadMap(m,program);}
 function startMission(index,options={}){
  if(index<0||index>=E.missionCount||(index>completed&&!options.preview))return;
  classLesson=null;homeMode=false;activePack=null;setAdventureURL(false);
  mode='program';missionIndex=index;savedProgram=null;$('reset-confirmation').hidden=true;$('mission-picker').open=false;const chosen=options.stage||(index>=completed?checkpoints[index]:null);const lessonMap=C.get(index,chosen);if(options.scattered!==undefined){Object.assign(lessonMap,E.mission(index,{scattered:options.scattered}));lessonMap.lesson.next=null;}loadMap(lessonMap);
 }
 function add(d){if(mode!=='program'||busy||won||map.routes||plan().length>=limit()||!E.availableCommands(map).includes(d))return;if(map.missing){cancelRun();rewind();commands=[...map.missing.program];commands[map.missing.index]=d;missingChosen=true;draw();report('Am completat săgeata. Testăm drumul!');return;}commands.push(d);pendingEdited();draw();report(executed?idleMessage():'Programul are '+plan().length+(plan().length===1?' comandă.':' comenzi.')+' Îl testăm când e gata.');}
 function selectGuess(p){
  if(mode!=='predict'||busy||predictionDone||map.obstacles.includes(E.key(p)))return;
  guess=[...p];draw();A.play('select');report('Am ales rândul '+(p[1]+1)+', coloana '+(p[0]+1)+'. Apăsăm „Verificăm împreună”.');
 }
 function newPrediction(initialRound){
  saveProgram();
  if(classLesson!==T.findByType('predict').id)classLesson=null;
  const size=3;
  const previous=JSON.stringify([map.start,map.goal,commands]);
  let round=initialRound||E.predictionRound(seed(),size);
  for(let tries=0;!initialRound&&tries<5&&JSON.stringify([round.map.start,round.map.goal,round.commands])===previous;tries++)round=E.predictionRound(seed(),size);
  mode='predict';activePack=null;loadMap(round.map,round.commands);report('Privește cele 3 săgeți și alege o căsuță de pe hartă.');
 }
 function returnToProgram(){
  if(mode==='program')return;
  cancelRun();mode='program';const saved=savedProgram;savedProgram=null;
  if(saved){({map,commands,missionIndex,position,visited,executed,active,won,bump,hasKey,world,decisions,activePack,packIndex,energyCheckpoint,missingChosen,routeResults,selectedRoute,classLesson,classVariant,homeMode}=saved);guess=null;predictionDone=false;if(classLesson)setClassURL();else setAdventureURL(homeMode);draw();report(idleMessage(),won?'success':'');}else startMission(Math.min(completed,E.missionCount-1));
 }
 function finishPrediction(animate=false){
  busy=false;predictionDone=true;const correct=E.same(position,guess);draw(animate);mood(correct?'happy':'curious');A.play(correct?'win':'retry');
  report(correct?'Am ghicit! Robo s-a oprit chiar în căsuța aleasă.':'Bună încercare! Robo s-a oprit la rândul '+(position[1]+1)+', coloana '+(position[0]+1)+'. Urmărim urmele și încercăm altă rundă.',correct?'success':'');
 }
 function finishMission(animate=false){
  busy=false;won=true;let stored=true;
  if(map.routes)routeResults[selectedRoute]=executed;
  if(activePack){if(!map.routes||Object.keys(routeResults).length===map.routes.length){const progress=packProgress[activePack];if(!progress.done.includes(map.id))progress.done.push(map.id);progress.current=Math.min(packIndex+1,P.packs[activePack].maps.length-1);storePack(activePack);}}
  if(missionIndex!==null){
   if(map.lesson&&map.lesson.next)checkpoints[missionIndex]=map.lesson.next;
   else if(missionIndex===completed){completed++;delete checkpoints[missionIndex];}
   try{localStorage.setItem(progressKey,JSON.stringify({version:3,completed}));localStorage.setItem(checkpointKey,JSON.stringify({version:1,stages:checkpoints}));}catch{stored=false;}
  }
  draw(animate);mood('happy');A.play('win');
  report((map.keyPosition?'Am deschis comoara cu cheia!':'Am ajuns la destinație!')+' Am reușit în '+executed+(executed===1?' pas.':' pași.')+(!stored?' Progresul rămâne doar până închidem pagina.':''),'success');
 }
 const pause=ms=>new Promise(resolve=>setTimeout(resolve,ms));
 function closeAdult(focus=true){$('adult-menu').open=false;if(focus)$('adult-menu').querySelector('summary').focus();}
 async function run(){
  const steps=plan();
  if((map.missing&&!missingChosen)||(map.routes&&selectedRoute===null))return;
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
    if(map.repairIntro&&result.reason==='edge'){
     draw();mood('curious');A.play('retry');report('Robo rămâne pe hartă. Atinge săgeata '+E.ARROW[command]+' din program ca să o ștergi.','error');return;
    }
    const problems={locked:'cufărul este încuiat! Luăm mai întâi cheia.',tree:'un copac ne blochează! Ce comandă schimbăm?',edge:'am ieși de pe hartă! Ce comandă schimbăm?',bridge:'podul este ridicat. Mergem la manetă și folosim „Activează”.',water:'aici este râul! Traversăm doar pe pod.',gate:'poarta este închisă. Udăm mai întâi toate florile.',lever:'„Activează” funcționează pe căsuța cu maneta.',activated:'maneta este deja activată. Putem șterge această comandă.',flower:'„Udă” funcționează pe căsuța cu o floare.',watered:'floarea este deja udată. Mergem la următoarea!',command:'această comandă nu este disponibilă pe hartă.'};
    problems.energy='bateria este goală. Încercăm din nou de la ultima stație, cu bateria plină.';problems.stop=map.stops&&map.stops.length>1?'mai întâi vizităm toate stelele, apoi ajungem acasă.':'mai întâi vizităm steaua, apoi ajungem acasă.';
    const problem=(result.reason==='flowers'?'mai avem flori de îngrijit înainte să ajungem la căsuță.':problems[result.reason]||problems.command)+(steps[i].call?' Folosește „Desfă în comenzi” ca să repari această folosire a rețetei.':steps[i].count>1?' Folosește „Desfă în comenzi” ca să repari repetiția.':'');
    draw();mood('curious');A.play('retry');report('Pasul '+(i+1)+': '+problem,'error');return;
   }
   // Commit movement, inventory and cursor together before any wait. A stop must never replay this step.
   if(!E.same(position,result.position))visited.push([...position]);position=result.position;hasKey=result.hasKey;world=result.world;executed=i+1;
   if(result.decision)decisions[i]=result.decision;
   if(result.recharged)energyCheckpoint=captureCheckpoint();
   // Victory belongs to the committed move, even if the view changes during its visual animation.
   if(result.won||(mode==='predict'&&executed===steps.length)){if(mode==='predict')finishPrediction(true);else finishMission(true);return;}
   draw(Boolean(E.DIR[command]));A.play(result.collectedKey||result.activated||result.wateredFlower?'select':'step');
   if(result.collectedKey)report('Am luat cheia! Acum putem merge la cufăr.','success');
   if(result.recharged){mood('happy');report('Bateria este plină! Avem din nou '+world.energy+' liniuțe.','success');}
   if(result.visitedStop)report(map.stops.every(p=>world.stops.includes(p))?'Am vizitat '+(map.stops.length>1?'toate stelele':'steaua')+'! Acum mergem la căsuță.':'Am vizitat o stea! Mai avem '+(map.stops.length-world.stops.length)+' de găsit.','success');
   if(result.activated){mood('happy');report('Maneta a coborât podul! Acum putem traversa râul.','success');}
   if(result.wateredFlower&&!result.decision){mood('happy');report(E.gateOpen(map,world)?(map.gate?'Toate florile au înflorit! Poarta s-a deschis.':'Florile au înflorit! Mergem la destinație.'):'Floarea a înflorit! Am udat '+world.watered.length+' din '+map.flowers.length+' flori.','success');}
   if(result.decision){if(result.wateredFlower)mood('happy');report(decisionAnswer(result.decision),result.decision.matched?'success':'');}
   await pause(command==='F'?1000:420);if(token!==runToken)return;
   if(map.energy&&world.energy===0){busy=false;draw();report(idleMessage());return;}
   if(result.recharged&&map.pauseAfterCharge){busy=false;draw();report('Stația a umplut bateria. Privim cele 4 liniuțe, apoi continuăm cu Pornește Robo.','success');return;}
   if((result.collectedKey&&map.pauseAfterKey)||(result.activated&&map.pauseAfterAction)){busy=false;draw();report(result.collectedKey?'Am luat cheia. Observăm: ea rămâne la Robo. Adăugăm drumul spre cufăr sau apăsăm Pornește pentru comenzile rămase.':'Maneta a coborât podul. Observăm schimbarea, apoi continuăm cu Pornește Robo.','success');return;}
  }
  if(mode==='predict'){finishPrediction();return;}
  busy=false;draw();report(idleMessage());
 }
 function showView(next){const changed=view!==next;if(busy)stop();closeAdult(false);A.stop();view=next;document.body.classList.toggle('game-screen',next==='game');for(const name of ['game','home','diploma','class-plan'])$(name+'-view').hidden=name!==next;if(next==='home')drawHome();drawClassroom();if(next==='game')fitBoard();if(changed)window.scrollTo(0,0);}
 function setClassURL(){
  const url=adventureURL(false);if(classLesson){url.searchParams.set('lesson',classLesson);if(classVariant)url.searchParams.set('variant',String(classVariant+1));}
  try{history.replaceState(null,'',url);}catch{}
 }
 function startClass(id,variant=0){
  const resolved=T.resolve(id,variant),activity=resolved.activity,item=resolved.variant;
  cancelRun();classLesson=null;classVariant=resolved.index;homeMode=false;activePack=null;savedProgram=null;missingChosen=false;routeResults={};selectedRoute=null;
  if(item.type==='curriculum')startMission(item.index,{stage:item.stage,preview:true});
  else if(item.type==='repair')loadFree(item.map,item.program);
  else if(item.type==='predict')newPrediction({map:{...item.map},commands:[...item.program]});
  else if(item.type==='pack'){const m=P.get(item.pack,item.index);loadFree(m,m.missing?m.missing.program:[]);}
  else if(item.type==='map')loadFree(JSON.parse(JSON.stringify(item.map)));
  // Each classroom activity is independent of home awards and can be opened directly.
  activePack=null;savedProgram=null;classLesson=activity.id;classVariant=resolved.index;classReturnView='game';setClassURL();showView('game');draw();
  if(item.type==='pack'||item.type==='map')report(map.brief);
  if(item.type==='repair')report('Apasă „Pornește Robo” și privim cele două săgeți.');
 }
 function nextClass(){const i=T.activities.findIndex(a=>a.id===classLesson);if(i>=0&&i<T.activities.length-1)startClass(T.activities[i+1].id);else openClassPlan();}
 function continueClass(){nextClass();}
 function openClassPlan(){if(view!=='class-plan')classReturnView=view;showView('class-plan');}
 function drawClassroom(){
  document.body.classList.toggle('home-context',homeMode);
  $('classroom-toolbar').hidden=homeMode;
  $('open-classroom').setAttribute('aria-pressed',String(!homeMode));$('open-adventures').setAttribute('aria-pressed',String(homeMode));
  const activity=T.find(classLesson);
  document.body.classList.toggle('class-session',Boolean(activity&&!homeMode));
  $('presenter-guide').hidden=homeMode||!activity;
  if(activity){$('presenter-activity').textContent=T.title(activity);$('presenter-question').textContent='„'+T.question(activity.id,classVariant)+'”';$('presenter-participation').textContent=activity.notes;}
  $('class-lesson').value=activity?activity.id:'';
  if($('class-variant').dataset.activity!==(activity?activity.id:'')){
   $('class-variant').replaceChildren();
   if(activity)activity.variants.forEach((v,i)=>{const option=document.createElement('option');option.value=String(i);option.textContent=T.variantTitle(activity,i);$('class-variant').append(option);});
   $('class-variant').dataset.activity=activity?activity.id:'';
  }
  $('class-variant').value=String(classVariant);$('class-variant').disabled=!activity||activity.variants.length===1;
  $('class-variant-label').hidden=!activity||activity.variants.length===1;
  const index=T.activities.findIndex(a=>a.id===classLesson);
  $('class-previous').disabled=index<=0;$('class-next').disabled=index<0||index>=T.activities.length-1;
  $('class-plan').setAttribute('aria-pressed',String(view==='class-plan'));
  const complete=won||mode==='predict'&&predictionDone;
  const retryDescription=map.repairIntro?'Reia încercarea cu săgețile → ↓':'Reia aceeași provocare cu un program gol';
  $('class-retry').title=retryDescription;$('class-retry').setAttribute('aria-label','Alt copil: '+retryDescription.toLowerCase());
  $('class-completion').hidden=homeMode||!activity||!complete||view!=='game';
  if(activity&&!homeMode){
   $('completion').hidden=true;
   $('game-title').textContent=activity.variants[classVariant].type==='pack'?activity.id+'. '+map.title:T.title(activity);$('activity-label').textContent=T.title(activity);$('map-label').textContent=T.variantTitle(activity,classVariant);
   if(['pack','map'].includes(activity.variants[classVariant].type))$('mission-brief').textContent=map.brief;
   const both=!map.routes||Object.keys(routeResults).length===map.routes.length;
   $('class-completion-message').textContent=!both?'Am testat un drum. Îl încercăm și pe celălalt!':mode==='predict'?'Am urmărit săgețile. Explicăm ce am observat.':'Am reușit împreună! Schimbăm copilul sau mergem mai departe.';
   $('class-completion-message').hidden=both;
   $('class-continue').hidden=!both;
   $('class-continue').textContent=index===T.activities.length-1?'Toate lecțiile':'Următoarea lecție →';
  }
 }
 function prepareClassroom(){
  const group=document.createElement('optgroup');group.label='Lecțiile lui Robo';
  T.activities.forEach(activity=>{
   const option=document.createElement('option');option.value=activity.id;option.textContent=T.title(activity);group.append(option);
   const button=document.createElement('button');button.addEventListener('click',()=>startClass(activity.id));
   button.innerHTML='<span class="plan-icon" aria-hidden="true">'+activity.icon+'</span><span><b>'+T.title(activity)+'</b><small>'+activity.notes+'</small></span><span aria-hidden="true">→</span>';
   $('class-plan-list').append(button);
  });
  $('class-lesson').append(group);const link=adventureURL(true);$('class-home-link').href=link.href;$('class-home-link').textContent=link.href;
 }
 function captureCheckpoint(){return {position:[...position],visited:visited.map(p=>[...p]),hasKey,world:E.copyWorld(world),decisions:{...decisions},executed,commands:E.executedPrefix(commands,executed,map.recipes)};}
 function retryEnergy(){
  if(busy||!map.energy||!energyCheckpoint)return;
  cancelRun();const s=energyCheckpoint;position=[...s.position];visited=s.visited.map(p=>[...p]);hasKey=s.hasKey;world=E.copyWorld(s.world);decisions={...s.decisions};executed=s.executed;commands=E.cloneProgram(s.commands);won=false;active=executed-1;bump=null;draw();report('Bateria este plină. Alegem alt drum de aici!');
 }
 function storePack(pack){try{localStorage.setItem('robo-adventure-'+pack+'-v1',JSON.stringify(packProgress[pack]));}catch{storageAvailable=false;}}
 function diplomaReady(){return P.packs.home.maps.every(m=>packProgress.home.done.includes(m.id));}
 function adventureURL(home){const url=new URL(location.href);url.searchParams.delete('lesson');url.searchParams.delete('variant');if(home)url.searchParams.set('adventure','home');else url.searchParams.delete('adventure');url.hash='';return url;}
 function setAdventureURL(home){try{history.replaceState(null,'',adventureURL(home));}catch{}}
 function openHome(){homeMode=true;setAdventureURL(true);showView('home');$('home-title').focus({preventScroll:true});}
 function startPack(pack,index){
  if(!P.packs[pack]||!P.packs[pack].maps[index])return;
  if(pack==='home'&&!homeUnlocked(index))return;
  classLesson=null;homeMode=true;activePack=pack;packIndex=index;mode='program';missionIndex=null;savedProgram=null;missingChosen=false;routeResults={};selectedRoute=null;packProgress[pack].current=index;storePack(pack);
  const m=P.get(pack,index);loadMap(m,m.missing?m.missing.program:[]);setAdventureURL(true);showView('game');report(m.brief);
 }
 function drawHome(){
  const done=packProgress.home.done.length,ready=diplomaReady();
  $('home-progress-label').textContent=done+' din 6 misiuni terminate';$('home-stars').textContent='★'.repeat(done)+'☆'.repeat(6-done);
  $('home-continue').textContent=ready?'Ne jucăm din nou →':done?'Continuăm aventura →':'Începem aventura →';$('home-diploma').hidden=!ready;
  $('resume-play').hidden=!activePack;$('home-missions').replaceChildren();
  P.packs.home.maps.forEach((m,i)=>{const finished=packProgress.home.done.includes(m.id),unlocked=homeUnlocked(i),b=document.createElement('button');b.className='adventure-card'+(finished?' finished':'');b.disabled=!unlocked;b.innerHTML='<span class="card-number" aria-hidden="true">'+(finished?'✓':unlocked?i+1:'🔒')+'</span><b>'+m.title+'</b><small>'+(!unlocked?'După misiunile anterioare':finished?'Mai jucăm o dată':'Pornim împreună')+'</small>';b.addEventListener('click',()=>startPack('home',i));$('home-missions').append(b);});
  $('home-link').value=adventureURL(true).href;$('home-storage-note').textContent=storageAvailable?'Progresul de acasă este separat de lecțiile clasei.':'Acest browser nu poate salva progresul. Păstrați pagina deschisă până descărcați diploma.';
  $('optional-packs').replaceChildren();
  for(const pack of ['energy','loops','puzzles']){const data=P.packs[pack],section=document.createElement('section'),heading=document.createElement('h2'),description=document.createElement('p'),list=document.createElement('div');heading.textContent=data.icon+' '+data.title;description.textContent=data.description;list.className='optional-missions';data.maps.forEach((m,i)=>{const b=document.createElement('button');b.textContent=(packProgress[pack].done.includes(m.id)?'✓ ':'')+(i+1)+'. '+m.title;b.addEventListener('click',()=>startPack(pack,i));list.append(b);});section.append(heading,description,list);$('optional-packs').append(section);}
 }
 function homeUnlocked(index){return P.packs.home.maps.slice(0,index).every(m=>packProgress.home.done.includes(m.id));}
 function drawAdventure(){
  const energy=Boolean(map.energy),fixed=Boolean(map.missing||map.routes);
  $('energy-panel').hidden=!energy;$('retry-energy').hidden=!energy||busy||won||(!executed&&!bump);
  if(energy){$('key-legend').hidden=false;$('key-legend').textContent=map.lever?'⚙ Manetă · ≈ Râu · ⚡ Stație':'⚡ Stație de încărcare';$('energy-count').textContent=world.energy+' / '+map.energy.capacity;$('energy-drawing').innerHTML=Array.from({length:map.energy.capacity},(_,i)=>'<span class="'+(i<world.energy?'charged':'')+'"></span>').join('');$('energy-drawing').setAttribute('aria-label','Baterie: '+world.energy+' din '+map.energy.capacity+' liniuțe');$('energy-panel').classList.toggle('empty',world.energy===0);$('retry-energy').textContent=energyCheckpoint&&energyCheckpoint.executed?'↶ Încercăm din nou de la stație':'↶ Încercăm din nou de la start';}
  if(map.stops){const visited=(world.stops||[]).length,ready=map.stops.every(p=>(world.stops||[]).includes(p));$('mission-objectives').hidden=false;$('key-objective').textContent=map.stops.length>1?'⭐ '+visited+' din '+map.stops.length+' stele vizitate':ready?'✓ Stea vizitată':'1. ⭐ Vizităm steaua';$('chest-objective').textContent=won?'✓ Am ajuns acasă':'2. 🏡 Mergem acasă';$('key-objective').classList.toggle('complete',ready);$('chest-objective').classList.toggle('complete',won);}
  if(activePack){$('mission-brief').textContent=map.brief;$('activity-label').textContent=P.packs[activePack].title+' · '+(packIndex+1)+' din '+P.packs[activePack].maps.length;$('completion').hidden=true;}
  $('pack-completion').hidden=!activePack||!won;
  if(activePack&&won){const both=!map.routes||Object.keys(routeResults).length===map.routes.length,last=packIndex===P.packs[activePack].maps.length-1;$('pack-completion-message').textContent=!both?'Am testat un drum. Îl încercăm și pe celălalt!':activePack==='home'&&last&&diplomaReady()?'Am terminat cele șase misiuni. Diploma ne așteaptă!':'Am reușit! Putem explica drumul și încerca din nou.';$('pack-next').hidden=!both;$('pack-next').textContent=activePack==='home'&&last&&diplomaReady()?'🏅 Diploma mea':last?'Înapoi la aventuri':'Următoarea misiune →';}
  if(map.allowRepeat){const single=map.repeatBodyLength===1,text=single?'Repetă ultima săgeată':'Repetă ultimele 2 comenzi';$('repeat-editor').querySelector('summary').textContent='🔁 '+text;$('make-repeat').textContent=text;$('repeat-editor').querySelector('.repeat-popover>p').textContent=single?'Pune o săgeată, de exemplu →. O grupăm de 3 ori: → → →.':map.repeatBodyLength?'Pune perechea → ↑. O grupăm de 2 ori: → ↑ → ↑.':'Scrie două comenzi, de exemplu → și 💧 Udă. Apoi grupează-le:';$('repeat-hint').textContent=repeatCandidate()?'Vom urma '+(single?'săgeata':'comenzile')+' de '+$('repeat-count').value+' ori.':'Adaugă '+(single?'o săgeată nouă':'două comenzi noi')+' la sfârșit. Poți folosi și săgeți simple.';}
  // Show exactly which expanded arrow is running, including single-arrow repeats.
  const steps=plan();$('queue').querySelectorAll('.repeat-block:not(.recipe-call)').forEach(group=>{const index=[...$('queue').children].indexOf(group),start=steps.findIndex(s=>s.blockIndex===index),block=commands[index];if(!block||!block.commands)return;group.querySelectorAll('.repeat-expanded>span').forEach((span,i)=>span.classList.toggle('active',busy&&active>=start+i*block.commands.length&&active<start+(i+1)*block.commands.length));});
  $('route-choices').hidden=!map.routes;
  if(fixed){$('edit-actions').hidden=true;$('clear').disabled=true;$('solution').disabled=true;}
  if(map.missing){$('editor-title').textContent='Alege săgeata lipsă';$('queue-title').textContent='Completăm locul cu ?';$('run').disabled=busy||won||!missingChosen||executed>=steps.length;}
  if(map.routes){document.querySelectorAll('.direction-pad button').forEach(b=>b.disabled=true);$('editor-title').textContent='Testăm drumurile A și B';$('queue-title').textContent=selectedRoute===null?'Alege un drum':'Drumul '+map.routes[selectedRoute].name;for(const [i,id] of ['route-a','route-b'].entries()){$(id).disabled=busy;$(id).textContent='Drumul '+map.routes[i].name+(routeResults[i]?' · '+routeResults[i]+' pași ✓':'');$(id).setAttribute('aria-pressed',String(selectedRoute===i));}const both=Object.keys(routeResults).length===2;$('route-result').textContent=both?'A: '+routeResults[0]+' pași · B: '+routeResults[1]+' pași. '+(routeResults[0]===routeResults[1]?'Sunt la fel de lungi!':'Drumul '+(routeResults[0]<routeResults[1]?'A':'B')+' are mai puțini pași.'):'Ambele duc acasă. Le testăm pe rând.';}
 }
 function chooseRoute(i){if(busy||!map.routes)return;selectedRoute=i;commands=[...map.routes[i].commands];cancelRun();rewind();draw();report('Testăm drumul '+map.routes[i].name+'. Numărăm săgețile împreună.');}
 let previewRevision=0;
 async function updateDiplomaPreview(){
  const revision=++previewRevision;$('download-diploma').disabled=true;
  try{const canvas=document.createElement('canvas');await window.RoboDiploma.paint(canvas,$('diploma-name').value,$('diploma-date').value);if(revision!==previewRevision)return;const preview=$('diploma-preview');preview.width=canvas.width;preview.height=canvas.height;preview.getContext('2d').drawImage(canvas,0,0);preview.setAttribute('aria-label',canvas.getAttribute('aria-label'));$('diploma-status').textContent='PDF A4, pe orizontală. Poate fi tipărit sau păstrat.';$('download-diploma').disabled=false;}catch{$('diploma-status').textContent='Diploma nu s-a încărcat. Apasă din nou „Diploma mea” pentru a reîncerca.';}
 }
 function openDiploma(){if(!homeMode||!diplomaReady())return;showView('diploma');if(!$('diploma-date').value){const date=new Date();$('diploma-date').value=[date.getFullYear(),String(date.getMonth()+1).padStart(2,'0'),String(date.getDate()).padStart(2,'0')].join('-');}updateDiplomaPreview();}
 $('open-classroom').addEventListener('click',()=>startClass(classLesson||'1',classVariant));
 $('class-lesson').addEventListener('change',()=>{if($('class-lesson').value)startClass($('class-lesson').value);});
 $('class-variant').addEventListener('change',()=>startClass(classLesson,Number($('class-variant').value)));
 $('class-previous').addEventListener('click',()=>{const index=T.activities.findIndex(a=>a.id===classLesson);if(index>0)startClass(T.activities[index-1].id);});
 $('class-next').addEventListener('click',nextClass);$('class-continue').addEventListener('click',continueClass);
 $('class-plan').addEventListener('click',openClassPlan);
 $('class-resume').addEventListener('click',()=>showView(classReturnView));
 $('class-retry').addEventListener('click',()=>startClass(classLesson,classVariant));
 $('home-name').addEventListener('input',()=>{$('diploma-name').value=$('home-name').value;});
 $('open-adventures').addEventListener('click',openHome);$('pack-home').addEventListener('click',openHome);$('diploma-back').addEventListener('click',openHome);
 $('home-continue').addEventListener('click',()=>startPack('home',P.next('home',packProgress.home)));
 $('resume-play').addEventListener('click',()=>showView('game'));
 $('classroom-return').addEventListener('click',()=>startClass('1'));
 $('pack-next').addEventListener('click',()=>{if(!activePack||!won)return;if(activePack==='home'&&packIndex===P.packs.home.maps.length-1&&diplomaReady()){openDiploma();return;}if(packIndex+1<P.packs[activePack].maps.length)startPack(activePack,packIndex+1);else openHome();});
 $('retry-energy').addEventListener('click',retryEnergy);$('route-a').addEventListener('click',()=>chooseRoute(0));$('route-b').addEventListener('click',()=>chooseRoute(1));
 $('home-diploma').addEventListener('click',openDiploma);
 $('diploma-name').addEventListener('input',()=>{$('home-name').value=$('diploma-name').value;updateDiplomaPreview();});$('diploma-date').addEventListener('input',updateDiplomaPreview);
 $('download-diploma').addEventListener('click',async()=>{if(!diplomaReady())return;const button=$('download-diploma');button.disabled=true;$('diploma-status').textContent='Pregătim diploma…';try{const doc=await window.RoboDiploma.create($('diploma-name').value,$('diploma-date').value);doc.save('Diploma-Robo-Explorator.pdf');$('diploma-status').textContent='Diploma este pregătită. O găsești în descărcările browserului.';}catch{$('diploma-status').textContent='Nu am putut descărca diploma. Poți încerca din nou.';}finally{button.disabled=false;}});
 document.querySelector('.brand').addEventListener('click',e=>{e.preventDefault();if(new URL(location.href).searchParams.get('adventure')==='home')openHome();else showView('game');});
 document.querySelectorAll('[data-dir]').forEach(b=>b.addEventListener('click',()=>add(b.dataset.dir)));
 $('make-repeat').addEventListener('click',()=>{if(busy||won)return;const next=repeatCandidate();if(!next)return;commands=next;$('repeat-editor').open=false;pendingEdited();draw();report('Am grupat '+(map.repeatBodyLength===1?'săgeata':'cele două comenzi')+'. Robo va repeta de '+$('repeat-count').value+' ori.');});
 $('repeat-count').addEventListener('change',()=>draw());
 for(const [id,scattered] of [['garden-rows',false],['garden-scattered',true]])$(id).addEventListener('click',()=>{if(busy||mode!=='program'||!map.gardenStyle||Boolean(map.allowDecision)===scattered)return;startMission(5,{scattered});report(scattered?'Aceeași grădină, altă încercare: putem repeta → și „Dacă este floare → Udă”.':'Florile sunt la rând. Putem repeta → și Udă.');});
 $('call-recipe').addEventListener('click',()=>{
  const recipe=map.recipes&&map.recipes['water-row'];
  if(busy||won||mode!=='program'||!recipe||plan().length+recipe.commands.length>limit())return;
  commands.push({call:'water-row'});pendingEdited();draw();report('Am adăugat „Udă un rând”. Robo va urma cei patru pași ai rețetei din poziția în care se află.');
 });
 $('run').addEventListener('click',run);$('stop').addEventListener('click',stop);
 $('program-mode').addEventListener('click',()=>{returnToProgram();closeAdult();});
 $('predict-mode').addEventListener('click',()=>{if(mode!=='predict')newPrediction();closeAdult();});
 $('close-adult').addEventListener('click',()=>closeAdult());
 $('adult-menu').addEventListener('toggle',()=>{if($('adult-menu').open&&busy)stop();});
 document.addEventListener('click',e=>{if($('adult-menu').open&&!$('adult-menu').contains(e.target))closeAdult(false);});
 document.addEventListener('keydown',e=>{if(e.key==='Escape'&&$('adult-menu').open){e.preventDefault();closeAdult();}});
 $('next-round').addEventListener('click',()=>newPrediction());
 $('next-mission').addEventListener('click',()=>{if(!won||mode!=='program')return;const next=map.lesson&&(map.lesson.next||map.lesson.suggested);if(next)startMission(missionIndex,{stage:next,preview:true});else startMission(missionIndex+1,{preview:true});});
 $('check-decision').addEventListener('click',()=>{if(!busy||!decisionPending||decisionPending.token!==runToken)return;const pending=decisionPending;decisionPending=null;$('check-decision').hidden=true;pending.resolve();});
 for(let i=0;i<C.count;i++){const m=C.get(i),o=document.createElement('option');o.value=String(i);o.textContent=m.title;$('teacher-lesson').append(o);}
 $('teacher-lesson').addEventListener('change',()=>{if(!busy)startMission(Number($('teacher-lesson').value),{preview:true});});
 $('lesson-stage').addEventListener('change',()=>{if(!busy&&mode==='program'&&map.lesson)startMission(missionIndex,{stage:$('lesson-stage').value,preview:true});});
 $('reset-adventure').addEventListener('click',()=>{$('reset-confirmation').hidden=false;});
 $('cancel-reset').addEventListener('click',()=>{$('reset-confirmation').hidden=true;});
 $('confirm-reset').addEventListener('click',()=>{completed=0;checkpoints={};try{localStorage.removeItem(progressKey);localStorage.removeItem(checkpointKey);}catch{}startMission(0);});
 $('sound').addEventListener('click',async()=>{
  const button=$('sound');button.disabled=true;
  try{const enabled=await A.toggle();button.textContent=enabled?'♫ Sunet pornit':'♫ Sunet oprit';button.setAttribute('aria-pressed',String(enabled));}
  catch{button.textContent='♫ Sunet indisponibil';button.setAttribute('aria-pressed','false');if(view==='game')report('Sunetul nu este disponibil în acest browser. Putem continua jocul.');}
  finally{button.disabled=false;}
 });
 $('clear').addEventListener('click',()=>{if(busy||mode!=='program'||map.missing||map.routes)return;commands=E.executedPrefix(commands,executed,map.recipes);pendingEdited();draw();report(executed?'Am șters comenzile noi. Robo și harta păstrează tot ce am făcut'+(hasKey?', inclusiv cheia.':'.'):'Un program nou. Ce comandă alegem prima?');});
 $('undo').addEventListener('click',()=>removePending(plan().length-1));
 $('restart').addEventListener('click',()=>{if(busy||mode==='predict')return;cancelRun();rewind();draw();report('Robo este la start'+(map.keyPosition?', iar cheia este înapoi pe hartă.':map.lever?', iar podul este din nou ridicat.':map.flowers?', iar florile așteaptă apă'+(map.gate?' și poarta este închisă.':'.'):'.')+' Programul a rămas pregătit.');});
 $('solution').addEventListener('click',()=>{
  if(busy||mode!=='program'||won)return;
  const remaining=E.solve(map,{position,hasKey,world});
  if(!remaining){report('Nu am găsit un drum din această căsuță. Putem reveni „La start”.');return;}
  if(executed+remaining.length>limit()){report('Drumul ar depăși limita de '+limit()+' pași. „La start” ne permite să pregătim un traseu nou.');return;}
  commands=[...E.executedPrefix(commands,executed,map.recipes),...remaining];pendingEdited();draw();report('Am pregătit un drum din poziția curentă'+(hasKey?', păstrând cheia.':', păstrând acțiunile deja făcute.'));
 });
 $('fullscreen').addEventListener('click',async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else throw Error('unavailable');}catch{if(view!=='game')showView('game');report('Pentru ecran complet poți folosi F11 în browser.');}});
 document.addEventListener('fullscreenchange',()=>{$('fullscreen').textContent=document.fullscreenElement?'Ieși din ecran complet':'Ecran complet';});
 document.addEventListener('keydown',e=>{if($('adult-menu').open||/INPUT|TEXTAREA|SELECT|SUMMARY/.test(e.target.tagName)||e.ctrlKey||e.metaKey||e.altKey)return;const keys={ArrowUp:'U',ArrowDown:'D',ArrowLeft:'L',ArrowRight:'R'};if(view==='game'&&keys[e.key]&&mode==='program'){e.preventDefault();add(keys[e.key]);}else if(view==='game'&&keys[e.key]&&mode==='predict'&&e.target.parentElement===$('board')){e.preventDefault();const cells=Array.from($('board').children),index=cells.indexOf(e.target),d=E.DIR[keys[e.key]];let x=index%map.size+d[0],y=Math.floor(index/map.size)+d[1];while(x>=0&&x<map.size&&y>=0&&y<map.size){const cell=cells[y*map.size+x];if(!cell.disabled){cell.focus();break;}x+=d[0];y+=d[1];}}});
 window.addEventListener('resize',fitBoard);
 if(window.ResizeObserver)new ResizeObserver(fitBoard).observe($('board-frame'));
 document.addEventListener('visibilitychange',()=>{if(document.hidden){if(busy)stop();A.stop();}});
 prepareClassroom();draw();report('Alege o săgeată. Robo o va urma.');
 const initialURL=new URL(location.href);
 if(initialURL.searchParams.get('adventure')==='home')openHome();
 else startClass(initialURL.searchParams.get('lesson')||'1',Number(initialURL.searchParams.get('variant')||1)-1);
 const context=document.modelContext;
 if(context&&typeof context.registerTool==='function'){
  const lifecycle=new AbortController();window.addEventListener('pagehide',()=>lifecycle.abort(),{once:true});
  const primitive={type:'string',enum:['U','D','L','R','A','W','F']},commandSchema=primitive;
  const tool={name:'stage_robo_program',title:'Pregătește programul robotului',description:'Primește programul complet. U/D/L/R sunt direcții; A activează maneta pe hărțile cu pod; W udă o floare pe hărțile cu grădină. F este disponibil numai în etapele cu decizie ale grădinii: dacă Robo este pe o floare, o udă; altfel nu udă și continuă cu următoarea comandă. F se poate combina cu o săgeată într-o repetiție numai în etapa de combinare. Verificarea așteaptă implicit apăsarea adultului. Pe hărțile cu rețeta, {call:water-row} folosește rețeta Udă un rând (R,W,R,W). În etapele cu repetiție se pot grupa una sau două comenzi în {repeat:2 sau 3,commands:[...]}. Prefixul pașilor executați, după desfășurarea repetițiilor, trebuie păstrat identic. Păstrează poziția și starea hărții; nu pornește robotul.',inputSchema:{type:'object',properties:{commands:{type:'array',items:{anyOf:[commandSchema,{type:'object',properties:{repeat:{type:'integer',enum:[2,3]},commands:{type:'array',items:primitive,minItems:1,maxItems:2}},required:['repeat','commands'],additionalProperties:false},{type:'object',properties:{call:{type:'string',enum:['water-row']}},required:['call'],additionalProperties:false}]},maxItems:32}},required:['commands'],additionalProperties:false},annotations:{readOnlyHint:false,untrustedContentHint:false},execute(input){
   if(busy)throw Error('Robotul este în mișcare.');
   if(mode!=='program')throw Error('Revino la Programăm pentru a schimba comenzile.');
   if(map.missing||map.routes)throw Error('Această activitate folosește săgeata lipsă sau drumurile pregătite.');
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
