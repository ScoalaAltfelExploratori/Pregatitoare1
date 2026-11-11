(function(){
  'use strict';
  const E=window.CodingEngine,scenes=window.LESSON_ZERO,$=id=>document.getElementById(id);
  const names={flag:'Steag verde',tap:'La apăsare',message:'La mesaj',bump:'La atingere'};
  const models=new Map(),pending=new Map(),sounds=new Set();
  let index=Math.max(0,scenes.findIndex(s=>s.id===new URLSearchParams(location.search).get('scena'))),project,state,selected=null,insertion={parent:'',index:0},serial=10000,busy=false,armed=false,passed=false,epoch=0,muted=false,drag=null,lastDrag=0;
  const scene=()=>scenes[index],body=()=>project.programs[project.actor][project.script].body;
  const hasCode=()=>Object.values(project.programs).some(ss=>ss.some(s=>s.body.length));
  function say(text){$('feedback').textContent=text;}
  function stop(){epoch++;for(const [id,resolve] of pending){clearTimeout(id);resolve(false);}pending.clear();for(const a of sounds){a.pause();a.currentTime=0;}sounds.clear();busy=false;armed=false;if(state)Object.values(state.actors).forEach(a=>{a.dancing=false;a.jump=0;});clearDrag();}
  function wait(ms,token){return new Promise(resolve=>{if(token!==epoch)return resolve(false);const id=setTimeout(()=>{pending.delete(id);resolve(token===epoch);},ms);pending.set(id,resolve);});}
  function locate(id,list=body(),parent=''){for(let i=0;i<list.length;i++){if(list[i].id===id)return{block:list[i],list,index:i,parent};if(list[i].children){const found=locate(id,list[i].children,list[i].id);if(found)return found;}}return null;}
  function sequence(parent){return parent?locate(parent)?.block.children:body();}
  function count(list){return list.reduce((n,b)=>n+1+(b.children?count(b.children):0),0);}
  function controls(){
    const editable=!!scene().actors;
    $('previous').disabled=index===0;
    $('next').disabled=index===scenes.length-1||(editable&&!passed);
    $('next').textContent=scene().mode==='closing'?'Rezerve →':index===scenes.length-1?'Am terminat!':'Mai departe →';
    $('run').disabled=!editable||busy||$('prediction').value===''||!hasCode();
    $('stop').disabled=!editable||(!busy&&!armed&&!Object.values(state.actors).some(a=>a.dancing));
    $('hint').disabled=!scene().hint;
    $('reset').disabled=!editable;
    for(const id of ['actor','script','trigger','channel','prediction','clear'])$(id).disabled=busy||!editable;
    $('add-script').disabled=!editable||busy||(project.programs[project.actor]?.length||0)>=3;
    $('undo').disabled=!editable||busy||!project.undo.length;
    $('example').disabled=!editable;$('restart').disabled=!editable;
    document.querySelectorAll('.palette-block,.block-handle,.block-value,.drop-slot').forEach(el=>el.disabled=busy);
    const found=editable&&selected?locate(selected):null;
    $('delete').disabled=busy||!found;$('move-left').disabled=busy||!found||found.index===0;$('move-right').disabled=busy||!found||found.index===found.list.length-1;
    document.querySelectorAll('.stage-actor').forEach(el=>{el.disabled=busy||(armed&&!project.programs[el.dataset.actor].some(s=>s.trigger==='tap'));});
  }
  function invalidate(){stop();passed=false;$('prediction').value='';state=E.initial(scene());drawStage();renderEditor();controls();}
  function mutate(fn,message='Cod schimbat. Prezicem din nou, apoi rulăm.'){
    if(busy)return;
    const before=E.clone(project.programs);if(fn()===false)return;
    project.undo.push(before);if(project.undo.length>30)project.undo.shift();invalidate();say(message);
  }
  function add(type,parent=insertion.parent,at=insertion.index){
    const list=sequence(parent);if(!list)return;
    if(count(body())>=8){say('Folosim cel mult 8 blocuri în acest program. Poți folosi o repetiție.');return;}
    if(type==='repeat'&&parent){say('Pune repetiția în programul principal.');return;}
    const def=E.BLOCKS[type],block={id:`b${++serial}`,type,...(def.value!==undefined?{value:def.value}:{}),...(type==='repeat'?{children:[]}: {})};
    mutate(()=>{list.splice(Math.min(at,list.length),0,block);selected=block.id;insertion=type==='repeat'?{parent:block.id,index:0}:{parent,index:Math.min(at,list.length-1)+1};},type==='repeat'?'Acum trage o acțiune în interiorul repetiției.':'Bloc adăugat. Poți schimba numărul sau ordinea.');
  }
  function move(id,parent,at){
    const found=locate(id),target=sequence(parent);if(!found||!target)return;
    if(parent===id||(found.block.children&&parent)){say('Repetiția rămâne în programul principal.');return;}
    if(found.list===target&&found.index<at)at--;
    if(found.list===target&&found.index===at)return;
    mutate(()=>{found.list.splice(found.index,1);target.splice(Math.min(at,target.length),0,found.block);selected=id;insertion={parent,index:at+1};},'Ordinea s-a schimbat. Ce va face acum programul?');
  }
  function remove(){const found=selected&&locate(selected);if(found)mutate(()=>{found.list.splice(found.index,1);selected=null;insertion={parent:'',index:body().length};},'Bloc șters. Poți reveni cu „Înapoi”.');}
  function slot(parent,at,empty){const el=document.createElement('button');el.className='drop-slot';el.dataset.parent=parent;el.dataset.at=at;el.setAttribute('aria-label',`Inserează ${parent?'în repetiție':'în program'} la locul ${at+1}`);el.textContent=empty?(parent?'Trage aici acțiunea':'Trage primul bloc aici'):'+';if(insertion.parent===parent&&insertion.index===at)el.classList.add('insert-here');el.onclick=()=>{insertion={parent,index:at};renderEditor();say('Loc ales. Apasă un bloc din paletă sau trage-l aici.');};return el;}
  function renderSequence(list,parent=''){
    const el=document.createElement('div');el.className='sequence';el.dataset.parent=parent;
    list.forEach((b,i)=>{el.append(slot(parent,i,false));const def=E.BLOCKS[b.type],block=document.createElement('div');block.className=`code-block ${def.color}${b.children?' repeat-block':''}${selected===b.id?' selected':''}`;block.dataset.block=b.id;
      const head=document.createElement('div');head.className=b.children?'repeat-head':'block-head';
      const handle=document.createElement('button');handle.className='block-handle';handle.dataset.block=b.id;handle.textContent=`${def.icon} ${def.label}`;handle.setAttribute('aria-label',`Selectează sau trage ${def.label}`);handle.onclick=()=>{if(Date.now()-lastDrag<300)return;selected=b.id;renderEditor();};head.append(handle);
      if(def.value!==undefined){const value=document.createElement('select');value.className='block-value';value.setAttribute('aria-label',`Valoare ${def.label}`);const options=def.options?Object.entries(def.options):Array.from({length:def.max-def.min+1},(_,i)=>[def.min+i,String(def.min+i)]);for(const [val,label]of options)value.add(new Option(label,val));value.value=String(b.value);value.onchange=()=>mutate(()=>{b.value=def.options?value.value:Number(value.value);selected=b.id;});head.append(value);}
      block.append(head);if(b.children)block.append(renderSequence(b.children,b.id));el.append(block);
    });el.append(slot(parent,list.length,!list.length));return el;
  }
  function renderEditor(){
    if(!scene().actors)return;
    $('actor').replaceChildren();scene().actors.forEach(a=>$('actor').add(new Option(a.name,a.id)));$('actor').value=project.actor;
    $('script').replaceChildren();project.programs[project.actor].forEach((s,i)=>$('script').add(new Option(`${i+1} · ${names[s.trigger]}`,i)));$('script').value=project.script;
    const current=project.programs[project.actor][project.script];$('trigger').value=current.trigger;$('channel').value=current.color;$('channel').hidden=current.trigger!=='message';
    $('workspace').replaceChildren(renderSequence(body()));
    const found=selected&&locate(selected);$('selection-label').textContent=found?`${E.BLOCKS[found.block.type].label} selectat · poți muta sau șterge`:'Trage blocuri. Schimbă valorile. Prezice rezultatul.';
    controls();
  }
  function setupStage(){
    const s=scene();$('stage').replaceChildren();
    if(!s.actors){$('stage').innerHTML=`<div class="stage-welcome"><img src="assets/Rabbit.svg" alt=""><strong>${s.mode==='intro'?'Personajele urmează codul nostru.':s.mode==='break'?'👏 👏 → un salt → statuie!':'O idee. Un program. O surpriză.'}<small>${s.mode==='intro'?'Tu alegi blocurile. Noi prezicem împreună.':s.mode==='break'?'Schimbăm ordinea și încercăm din nou.':'Ce ai vrea să construiești în ScratchJr?'}</small></strong><img src="assets/Dog.svg" alt=""></div>`;return;}
    const status=document.createElement('div');status.id='stage-status';$('stage').append(status);
    if(s.mode==='track'){const track=document.createElement('div');track.className='number-track';track.innerHTML=Array.from({length:11},(_,i)=>`<span data-number="${i}">${i}</span>`).join('');$('stage').append(track);}
    if(s.mode==='rhythm'){const beats=document.createElement('div');beats.className='beats';beats.id='beats';$('stage').append(beats);}
    s.actors.forEach((a,i)=>{const el=document.createElement('button');el.className='stage-actor';el.dataset.actor=a.id;el.setAttribute('aria-label',a.name);el.innerHTML=`<img src="assets/${a.asset}.svg" alt="" draggable="false"><span>${a.name}</span>`;
      if(a.group==='balls'&&s.mode==='track')el.classList.add('small');
      if(a.group==='controls'&&['dance','final'].includes(s.mode))el.classList.add('control');
      if(s.mode==='objects'){el.style.left=`${16+(i%5)*17}%`;el.style.top=`${i<5?40:150}px`;el.style.height='105px';el.querySelector('img').style.height='74px';}
      el.onclick=()=>{if(busy)return;if(armed)execute({type:'tap',actor:a.id});else{project.actor=a.id;project.script=0;selected=null;insertion={parent:'',index:body().length};renderEditor();drawStage();}};
      $('stage').append(el);
    });drawStage();
  }
  function drawStage(active=[]){
    const s=scene();$('stage').className=state.page==='park'?'':state.page;
    if(!s.actors)return;
    for(const el of $('stage').querySelectorAll('.stage-actor')){
      const a=state.actors[el.dataset.actor];el.hidden=!a.visible||a.page!==state.page;
      if(s.mode!=='objects')el.style.left=`${8+a.x*8.4}%`;
      el.querySelector('img').style.transform=`translateY(${-a.jump*18}px) scale(${a.scale})`;
      el.classList.toggle('dancing',a.dancing&&!busy);el.classList.toggle('executing',active.some(step=>step.actor===a.id));el.setAttribute('aria-pressed',String(a.id===project.actor&&!armed));
    }
    const canTap=Object.values(state.actors).some(a=>a.visible&&a.page===state.page&&project.programs[a.id].some(p=>p.trigger==='tap'));
    $('stage-status').textContent=`${{park:'Parc',beach:'Plajă',night:'Noapte'}[state.page]} · ${busy?'Rulăm codul…':armed?(canTap?'Cod pornit · apasă personajele':'Programul a rulat'):'Alege un personaj pentru codul lui'}`;
    $('stage').querySelectorAll('[data-number]').forEach(el=>el.classList.toggle('lit',Number(el.dataset.number)===state.actors.rabbit?.x));
    if($('beats')&&$('beats').children.length!==Math.min(state.sounds,10))$('beats').innerHTML=Array.from({length:Math.min(state.sounds,10)},(_,i)=>`<span class="beat${i===state.sounds-1?' flash':''}">♪</span>`).join('');
    document.querySelectorAll('.code-block').forEach(el=>el.classList.toggle('executing',active.some(a=>a.actor===project.actor&&a.script===project.script&&(a.block===el.dataset.block||a.repeat===el.dataset.block))));
  }
  function pop(){if(muted)return;const a=new Audio('assets/pop.mp3');sounds.add(a);a.addEventListener('ended',()=>sounds.delete(a),{once:true});try{a.play()?.catch(()=>{sounds.delete(a);$('sound').title='Sunetul nu a pornit; urmărim cercurile.';});}catch(_){sounds.delete(a);}}
  function resultLabel(value){return scene().choices?.find(([v])=>String(v)===String(value))?.[1]??String(value);}
  async function execute(event={type:'flag'}){
    if(busy||!scene().actors||$('prediction').value==='')return;
    if(event.type==='flag'){stop();state=E.initial(scene());passed=false;}
    const token=epoch,answer=$('prediction').value;armed=true;busy=true;controls();
    const result=E.simulate(scene(),project.programs,state,event);let tick=state.tick;
    if(result.error&&!result.frames.length){busy=false;armed=false;say(result.error);controls();return;}
    say('Urmărim blocurile și ce fac personajele…');
    for(const frame of result.frames){if(!await wait(Math.max(80,(frame.tick-tick)*100),token))return;tick=frame.tick;state=E.clone(frame.state);drawStage(frame.active);for(let n=0;n<frame.pops;n++)pop();}
    if(!await wait(350,token))return;
    state=result.state;busy=false;passed=!!result.achieved;drawStage();controls();
    if(result.error){say(result.error);return;}
    const actual=E.measure(scene(),state),right=String(actual)===answer;
    if(scene().id==='lant'&&!passed){say('Jocul este pornit. Apasă un personaj vizibil sau oprește și schimbă codul.');return;}
    const prediction=right?'Predicția se potrivește.':`Am prezis ${resultLabel(answer)}; codul a produs ${resultLabel(actual)}.`;
    say(`${passed?'Ținta reușită!':'Mai ajustăm codul.'} Rezultat: ${resultLabel(actual)}. ${prediction}`);
  }
  function render(){
    stop();const s=scene();if(!models.has(s.id))models.set(s.id,{programs:E.clone(s.starter),actor:s.focus,script:0,undo:[]});project=models.get(s.id);state=E.initial(s);passed=false;selected=null;insertion={parent:'',index:s.actors?body().length:0};
    $('presentation').classList.toggle('no-code',!s.actors);$('topic').textContent=s.topic;$('title').textContent=s.title;$('goal').textContent=s.goal||s.question;$('question').textContent=s.question;$('equation').textContent=s.math||'';$('intro-message').textContent=s.actors?'':s.mode==='intro'?'Tu construiești, copiii prezic. Un voluntar vine la laptop.':'Profesorul alege când continuăm.';
    $('prediction').replaceChildren(new Option('Ce credeți?',''));for(const [value,label]of s.choices||Array.from({length:11},(_,i)=>[i,String(i)]))$('prediction').add(new Option(label,value));
    $('progress').textContent=s.number?`Oprirea ${s.number} / 10`:s.id.startsWith('rezerva')?'Rezervă':s.mode==='intro'?'Începem':s.mode==='break'?'Ne dezmorțim':'Bravo, creatori!';
    $('teacher-notes').textContent=s.note;$('scene-list').querySelectorAll('button').forEach((b,i)=>{if(i===index)b.setAttribute('aria-current','step');else b.removeAttribute('aria-current');});
    $('palette').replaceChildren();for(const type of s.palette||[]){const d=E.BLOCKS[type],el=document.createElement('button');el.className=`palette-block ${d.color}`;el.dataset.type=type;el.innerHTML=`<span class="icon">${d.icon}</span>${d.label}`;el.setAttribute('aria-label',`Adaugă ${d.label}`);el.onclick=()=>{if(Date.now()-lastDrag>300)add(type);};$('palette').append(el);}
    setupStage();if(s.actors)renderEditor();else $('workspace').innerHTML='<span class="workflow-step">1. Construim</span><span class="workflow-step">2. Prezicem</span><span class="workflow-step">3. Rulăm</span>';
    say(s.actors?'Construiește codul, alege o predicție și apasă Rulează.':'Profesorul conduce; copiii vin pe rând să creeze.');controls();
    try{const url=new URL(location.href);url.searchParams.set('scena',s.id);history.replaceState(null,'',url);}catch(_){}
  }
  function go(n){if(n<0||n>=scenes.length)return;index=n;render();}
  function closeMenu(){$('menu').close();$('contents').focus();}
  function clearDrag(){document.querySelectorAll('.drop-over').forEach(el=>el.classList.remove('drop-over'));document.querySelector('.drag-ghost')?.remove();drag=null;}
  function targetAt(x,y){
    const el=document.elementFromPoint(x,y);if(!el)return null;
    if(el.closest('.trash'))return{trash:true,el:el.closest('.trash')};
    const slot=el.closest('.drop-slot');if(slot)return{parent:slot.dataset.parent,index:Number(slot.dataset.at),el:slot};
    const seq=el.closest('.sequence')||(el.closest('#workspace')?$('workspace').querySelector('.sequence'):null);if(!seq)return null;
    const children=[...seq.children].filter(e=>e.classList.contains('code-block'));let at=children.findIndex(e=>x<e.getBoundingClientRect().left+e.getBoundingClientRect().width/2);if(at<0)at=children.length;
    return{parent:seq.dataset.parent,index:at,el:seq.querySelector(`:scope > .drop-slot[data-at="${at}"]`)};
  }
  document.addEventListener('pointerdown',e=>{
    if(busy||e.button!==0)return;const source=e.target.closest('.palette-block,.block-handle');if(!source)return;
    drag={pointer:e.pointerId,x:e.clientX,y:e.clientY,source,type:source.dataset.type,id:source.dataset.block,started:false};source.setPointerCapture?.(e.pointerId);
  });
  document.addEventListener('pointermove',e=>{
    if(!drag||drag.pointer!==e.pointerId)return;
    if(!drag.started&&Math.hypot(e.clientX-drag.x,e.clientY-drag.y)<7)return;
    e.preventDefault();if(!drag.started){drag.started=true;const ghost=document.createElement('div');ghost.className=`drag-ghost ${E.BLOCKS[drag.type||locate(drag.id).block.type].color}`;ghost.textContent=E.BLOCKS[drag.type||locate(drag.id).block.type].label;document.body.append(ghost);}
    const ghost=document.querySelector('.drag-ghost');ghost.style.left=`${e.clientX+12}px`;ghost.style.top=`${e.clientY-20}px`;
    document.querySelectorAll('.drop-over').forEach(el=>el.classList.remove('drop-over'));targetAt(e.clientX,e.clientY)?.el?.classList.add('drop-over');
  },{passive:false});
  document.addEventListener('pointerup',e=>{
    if(!drag||drag.pointer!==e.pointerId)return;const current=drag,target=targetAt(e.clientX,e.clientY);if(current.started)lastDrag=Date.now();clearDrag();
    if(!current.started)return;e.preventDefault();
    if(target?.trash&&current.id){selected=current.id;remove();}else if(target&&!target.trash){if(current.type)add(current.type,target.parent,target.index);else move(current.id,target.parent,target.index);}else say('Blocul nu a fost schimbat. Trage-l în zona programului.');
  });
  document.addEventListener('pointercancel',clearDrag);
  $('actor').onchange=()=>{project.actor=$('actor').value;project.script=0;selected=null;insertion={parent:'',index:body().length};renderEditor();drawStage();};
  $('script').onchange=()=>{project.script=Number($('script').value);selected=null;insertion={parent:'',index:body().length};renderEditor();};
  $('trigger').onchange=()=>mutate(()=>{project.programs[project.actor][project.script].trigger=$('trigger').value;});
  $('channel').onchange=()=>mutate(()=>{project.programs[project.actor][project.script].color=$('channel').value;});
  $('add-script').onclick=()=>mutate(()=>{project.programs[project.actor].push({trigger:'tap',color:'orange',body:[]});project.script=project.programs[project.actor].length-1;selected=null;insertion={parent:'',index:0};});
  $('clear').onclick=()=>{if(body().length)mutate(()=>{body().length=0;selected=null;insertion={parent:'',index:0};});};
  $('undo').onclick=()=>{if(busy||!project.undo.length)return;project.programs=project.undo.pop();project.script=Math.min(project.script,project.programs[project.actor].length-1);selected=null;insertion={parent:'',index:body().length};invalidate();say('Am revenit la codul anterior.');};
  $('move-left').onclick=()=>{const f=locate(selected);move(selected,f.parent,f.index-1);};$('move-right').onclick=()=>{const f=locate(selected);move(selected,f.parent,f.index+2);};$('delete').onclick=remove;
  $('prediction').onchange=controls;$('run').onclick=()=>execute();$('stop').onclick=()=>{stop();drawStage();controls();say('Oprit. Codul se păstrează; poți modifica și rula din nou.');};
  $('reset').onclick=()=>{stop();passed=false;state=E.initial(scene());drawStage();controls();say('Scena este la început. Codul tău s-a păstrat.');};
  $('hint').onclick=()=>say(scene().hint);$('sound').onclick=()=>{muted=!muted;$('sound').setAttribute('aria-pressed',String(!muted));$('sound').setAttribute('aria-label',muted?'Sunet oprit':'Sunet activ');$('sound').textContent=muted?'♫̸':'♫';};
  $('previous').onclick=()=>go(index-1);$('next').onclick=()=>{if(!$('next').disabled)go(index+1);};
  $('contents').onclick=()=>$('menu').showModal();$('close-menu').onclick=closeMenu;
  scenes.forEach((s,i)=>{const el=document.createElement('button');el.textContent=`${s.number?String(s.number).padStart(2,'0')+' · ':''}${s.title}`;el.onclick=()=>{go(i);closeMenu();};$('scene-list').append(el);});
  $('example').onclick=()=>{stop();mutate(()=>{project.programs=E.clone(scene().solution);project.actor=scene().focus;project.script=0;selected=null;insertion={parent:'',index:body().length};},'Exemplul este editabil. Schimbă un bloc și compară rezultatul.');closeMenu();};
  $('restart').onclick=()=>{stop();mutate(()=>{project.programs=E.clone(scene().starter);project.actor=scene().focus;project.script=0;selected=null;insertion={parent:'',index:body().length};});closeMenu();};$('skip').onclick=()=>{go(Math.min(index+1,scenes.length-1));closeMenu();};
  async function fullscreen(){try{if(document.fullscreenElement)await document.exitFullscreen();else if(document.documentElement.requestFullscreen)await document.documentElement.requestFullscreen();else say('Folosește F11 pentru ecran complet.');}catch(_){say('Folosește F11 pentru ecran complet.');}}
  $('fullscreen').onclick=fullscreen;
  document.addEventListener('keydown',e=>{
    if($('menu').open||e.altKey||e.ctrlKey||e.metaKey||['SELECT','INPUT','TEXTAREA'].includes(e.target.tagName))return;
    if(e.key==='Escape'){stop();drawStage();controls();say('Oprit.');}
    else if(e.key.toLowerCase()==='r'&&!$('reset').disabled)$('reset').click();
    else if(e.key.toLowerCase()==='f')fullscreen();
    else if(e.key==='Delete'&&!busy&&selected)remove();
    else if(e.key===' '&&e.target.tagName!=='BUTTON'&&!$('run').disabled){e.preventDefault();execute();}
    else if(e.key==='ArrowRight'&&e.target.tagName!=='BUTTON'&&!$('next').disabled)go(index+1);
    else if(e.key==='ArrowLeft'&&e.target.tagName!=='BUTTON')go(index-1);
  });
  function fit(){$('presentation').style.transform=`scale(${Math.min(innerWidth/1440,innerHeight/810)})`;}
  addEventListener('resize',fit);addEventListener('pagehide',stop);fit();render();
}());
