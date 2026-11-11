(function () {
  'use strict';
  const scenes = window.LESSON_ZERO;
  const $ = id => document.getElementById(id);
  const assets = name => `assets/${name}.svg`;
  const picture = (name, cls = 'sprite', alt = '') => `<img class="${cls}" src="${assets(name)}" alt="${alt}" draggable="false">`;
  let index = Math.max(0, scenes.findIndex(s => s.id === new URLSearchParams(location.search).get('scena')));
  let solved = false, played = false, busy = false, epoch = 0, chainStep = 0;
  const timers = new Map(), sounds = new Set();
  function cancel() {
    epoch++;
    for (const [id, resolve] of timers) { clearTimeout(id); resolve(false); }
    timers.clear();
    for (const audio of sounds) { audio.pause(); audio.currentTime = 0; }
    sounds.clear();
    busy = false;
  }
  function wait(ms, token) {
    return new Promise(resolve => {
      if (token !== epoch) return resolve(false);
      const id = setTimeout(() => { timers.delete(id); resolve(token === epoch); }, ms);
      timers.set(id, resolve);
    });
  }
  function feedback(text) { $('feedback').textContent = text; }
  function controls() {
    const s = scenes[index];
    $('previous').disabled = index === 0;
    $('next').disabled = index === scenes.length - 1 || !!s.choices && !played;
    $('next').textContent = s.mode === 'closing' ? 'Rezerve →' : index === scenes.length - 1 ? 'Am terminat!' : 'Mai departe →';
    $('demo').disabled = !s.choices || !solved || busy;
    $('demo').textContent = played ? '▶ Încă o dată' : '▶ Arată';
    $('hint').disabled = !s.hint || busy;
    const listen = $('listen');
    if (listen) listen.disabled = busy;
  }
  function grid(count, marked = 0, missing = false) {
    return `<div class="object-grid">${Array.from({length: count}, (_,i) => `<div class="object${i < marked ? ' marked' : ''}${missing && i >= 6 ? ' empty' : ''}" data-object="${i}">${missing && i >= 6 ? '' : picture('Ball','','Minge')}</div>`).join('')}</div>`;
  }
  function renderStage(s) {
    $('stage').className = '';
    switch(s.mode) {
      case 'intro':
        $('stage').innerHTML = `<div class="stage-content">${picture('Rabbit','sprite hero-sprite')}<div class="welcome-sign">10 opriri. O mulțime de surprize.<small>Tu alegi. Personajele prind viață.</small></div>${picture('Dog','sprite hero-sprite')}</div>`; break;
      case 'steps': case 'repeat':
        $('stage').innerHTML = `<div class="number-track">${Array.from({length:11},(_,i)=>`<span data-number="${i}">${i}</span>`).join('')}</div><div class="runner">${picture('Rabbit')}</div>${s.mode === 'repeat' ? '<div class="groups"><span class="group">2 pași</span><span class="group">2 pași</span><span class="group">2 pași</span></div>' : ''}`;
        moveRunner(s.mode === 'steps' ? 3 : 0); break;
      case 'hide': case 'collect':
        $('stage').innerHTML = grid(s.count, s.remove) + (s.mode === 'collect' ? picture('Rabbit','collector') : '') + '<div class="stage-label">Privește personajele marcate cu cerc mov.</div>'; break;
      case 'missing': $('stage').innerHTML = grid(10,0,true); break;
      case 'message':
        $('stage').innerHTML = `<div class="stage-content"><div class="message-character">Fluturele${picture('Butterfly')}<span class="envelope orange">✉ →</span></div><div class="message-character">Iepurașul${picture('Rabbit')}<span class="envelope blue">✉ ALBASTRU</span></div><div class="message-character">Cățelul${picture('Dog')}<span class="envelope orange">✉ PORTOCALIU</span></div></div>`; break;
      case 'rhythm':
        $('stage').innerHTML = '<div class="stage-content rhythm-stage"><div class="beats"><span class="beat">♪</span><span class="beat">♪</span><span class="rest">pauză</span><span class="beat">♪</span></div><button id="listen">♫ Ascultă / privește</button></div>';
        $('listen').addEventListener('click', () => rhythm(false)); break;
      case 'break':
        $('stage').innerHTML = '<div class="stage-content idea-cards"><div class="idea-card"><div class="break-icon">👏</div>Două bătăi</div><div class="idea-card"><div class="break-icon">↑</div>Un salt mic</div><div class="idea-card"><div class="break-icon">✋</div>Statuie!</div></div>'; break;
      case 'page':
        $('stage').innerHTML = '<div class="stage-content doors"><div class="door">6</div><div class="door">7</div><div class="door">8</div></div>'; break;
      case 'freeze':
        $('stage').innerHTML = `<div class="stage-content dancers">${Array.from({length:6},(_,i)=>`<div class="dancer dancing${i<4?' marked':''}">${picture(i%2 ? 'Dog':'Rabbit')}</div>`).join('')}</div>`; break;
      case 'chain':
        chainStep = 0;
        $('stage').innerHTML = `<div class="stage-content">${['Butterfly','Dog','Ball'].map((a,i)=>`<button class="chain-button${i?' hidden-target':''}" id="chain-${i}" disabled aria-label="${['Fluturele','Cățelul','Mingea'][i]}">${picture(a)}</button>`).join('')}</div><div class="stage-label">Unele surprize încă se ascund.</div>`;
        [0,1,2].forEach(i=>$(`chain-${i}`).addEventListener('click',()=>chain(i))); break;
      case 'final':
        $('stage').innerHTML = `<div class="stage-content final-animals">${Array.from({length:7},(_,i)=>picture(i<4?'Rabbit':'Dog',`sprite${i>=4?' waiting':''}`)).join('')}</div><div class="stage-label">Pe scenă sunt patru iepurași. Trei căței așteaptă să intre.</div>`; break;
      case 'closing':
        $('stage').innerHTML = `<div class="stage-content idea-cards"><div class="idea-card">${picture('Rabbit')}Alegem personaje</div><div class="idea-card">${picture('Butterfly')}Le dăm idei</div><div class="idea-card">${picture('Dog')}Încercăm împreună</div></div>`; break;
    }
  }
  function moveRunner(n) {
    const cell = $('stage').querySelector(`[data-number="${n}"]`);
    $('stage').querySelector('.runner').style.left = `${75 + cell.offsetLeft}px`;
    $('stage').querySelectorAll('[data-number]').forEach(el => el.classList.toggle('lit', Number(el.dataset.number) === n));
  }
  function render() {
    cancel(); solved = false; played = false;
    const s = scenes[index];
    $('topic').textContent = s.topic; $('title').textContent = s.title;
    $('question').textContent = s.question; $('equation').textContent = s.expression || '';
    $('program').innerHTML = s.program.map(p=>{const [cls,label]=p.split('|');return `<span class="chip ${cls}">${label}</span>`;}).join('');
    $('answers').replaceChildren();
    if(s.choices) {
      for(const answer of s.choices) {
        const button = document.createElement('button');
        button.textContent = String(answer);
        button.className = typeof answer === 'string' ? 'word-answer' : '';
        button.addEventListener('click',()=>choose(answer,button));
        $('answers').append(button);
      }
    } else {
      $('answers').innerHTML = s.mode === 'closing' ? '<div class="intro-action"><a href="../../materiale/Lectia_01_ScratchJr/index.html">La următoarea întâlnire: construim în ScratchJr →</a></div>' : `<div class="intro-action">${s.mode === 'intro' ? 'Răspundem cu voce tare. Uneori, venim la laptop!' : 'Lângă scaun, cu loc pentru fiecare.'}</div>`;
    }
    $('progress').textContent = s.number ? `Oprirea ${s.number} / 10` : s.id.startsWith('rezerva') ? 'Extra · opțional' : s.mode === 'intro' ? 'Pornim împreună' : s.mode === 'break' ? 'Ne dezmorțim' : 'Bravo, creatori!';
    $('teacher-notes').textContent = `${s.note}${s.answer !== undefined ? ` Răspuns: ${s.answer}.` : ''}`;
    $('scene-list').querySelectorAll('button').forEach((b,i)=>{ if(i === index) b.setAttribute('aria-current','step'); else b.removeAttribute('aria-current'); });
    renderStage(s);
    feedback(s.choices ? 'Mai întâi, spunem ce credem. Apoi alegem un răspuns.' : 'Profesorul alege când mergem mai departe.');
    controls();
    try { const url = new URL(location.href); url.searchParams.set('scena',s.id); history.replaceState(null,'',url); } catch (_) { /* Local files can restrict history. */ }
  }
  function choose(answer, button) {
    if (busy || solved) return;
    const s = scenes[index];
    $('answers').querySelectorAll('button').forEach(b=>b.classList.remove('try-again'));
    if (answer !== s.answer) {
      button.classList.add('try-again'); feedback('Mai privim o dată. Numărăm și încercăm din nou.'); return;
    }
    solved = true; button.classList.add('correct');
    $('answers').querySelectorAll('button').forEach(b=>b.disabled = true);
    feedback('Da! Acum apăsăm „Arată” și verificăm împreună.'); controls();
  }
  function complete(text) {
    busy = false; played = true; feedback(text || 'Am verificat! Putem încerca din nou sau mergem mai departe.'); controls();
  }
  function pop() {
    const audio = new Audio('assets/pop.mp3'); sounds.add(audio);
    audio.addEventListener('ended',()=>sounds.delete(audio), {once:true});
    try { const result = audio.play(); if(result) result.catch(()=>sounds.delete(audio)); } catch (_) { sounds.delete(audio); }
  }
  async function rhythm(finish) {
    if(busy) return;
    const token = epoch; busy = true; controls();
    const beats = [...$('stage').querySelectorAll('.beat')];
    for(let i=0;i<beats.length;i++) {
      beats[i].classList.add('flash'); pop();
      if(!await wait(350,token)) return;
      beats[i].classList.remove('flash');
      if(!await wait(i===1?1000:300,token)) return;
    }
    if(finish) complete('Trei sunete. Pauza ne ajută să auzim ritmul.');
    else { busy = false; feedback('Câte sunete ai auzit sau văzut? Alege răspunsul.'); controls(); }
  }
  function chain(i) {
    if(!busy || i!==chainStep || scenes[index].mode!=='chain') return;
    $(`chain-${i}`).disabled = true; chainStep++;
    if(i<2) {
      const next = $(`chain-${i+1}`); next.classList.remove('hidden-target'); next.disabled = false;
      feedback(i===0 ? 'A apărut cățelul! Atinge-l.' : 'A apărut mingea! Atinge-o.'); next.focus();
    } else {
      $('stage').className = 'night';
      $('stage').innerHTML = `<div class="stage-content">${picture('Rabbit','sprite hero-sprite')}<div class="welcome-sign">Ai descoperit finalul!</div></div>`;
      complete('Fluture → cățel → minge → o pagină nouă.'); $('next').focus();
    }
  }
  async function demo() {
    if(!solved || busy) return;
    const s=scenes[index];
    if(s.mode === 'rhythm') { renderStage(s); await rhythm(true); return; }
    cancel(); const token = epoch; renderStage(s); busy = true; played = false; controls();
    feedback('Privim cu atenție…');
    switch(s.mode) {
      case 'steps': case 'repeat': {
        let start = s.mode==='steps'?3:0, end = s.answer;
        for(let n=start+1;n<=end;n++) {
          if(!await wait(650,token)) return;
          if(s.mode==='repeat') $('stage').querySelectorAll('.group').forEach((g,i)=>g.classList.toggle('active',i===Math.floor((n-1)/2)));
          moveRunner(n);
        }
        if(!await wait(650,token)) return;
        break;
      }
      case 'hide': case 'collect': {
        const objects=[...$('stage').querySelectorAll('.object')];
        for(let i=0;i<s.remove;i++) {
          if(s.mode === 'collect') {
            const gridEl = objects[i].parentElement, runner=$('stage').querySelector('.collector');
            runner.style.left = `${gridEl.offsetLeft + objects[i].offsetLeft - 10}px`;
            runner.style.top = `${gridEl.offsetTop + objects[i].offsetTop - 5}px`;
          }
          if(!await wait(700,token)) return;
          objects[i].classList.add('gone');
        }
        if(s.mode==='collect') { $('stage').querySelector('.collector').style.left='24px'; $('stage').querySelector('.collector').style.top='90px'; }
        if(!await wait(600,token)) return;
        $('stage').querySelector('.stage-label').textContent = `${s.answer} ${s.answer===0 ? 'mingi vizibile. Nimic nu se mai vede!' : 'mingi rămân vizibile.'}`;
        break;
      }
      case 'missing': {
        for(const object of $('stage').querySelectorAll('.empty')) {
          if(!await wait(650,token)) return;
          object.innerHTML=picture('Ball','','Minge'); object.classList.remove('empty');
        }
        break;
      }
      case 'message':
        if(!await wait(700,token)) return;
        $('stage').querySelectorAll('.orange').forEach(el=>el.classList.add('grow'));
        if(!await wait(700,token)) return;
        $('stage').querySelectorAll('.sprite')[2].classList.add('grow');
        if(!await wait(700,token)) return;
        break;
      case 'page':
        $('stage').querySelectorAll('.door')[1].classList.add('chosen');
        if(!await wait(1000,token)) return;
        $('stage').className='beach';
        $('stage').innerHTML=`<div class="stage-content">${picture('Rabbit','sprite hero-sprite')}${picture('Dog','sprite hero-sprite')}<div class="welcome-sign">Bine ai venit pe plajă!<small>O altă pagină, o altă aventură.</small></div></div>`;
        break;
      case 'freeze':
        if(!await wait(1400,token)) return;
        $('stage').querySelectorAll('.marked').forEach(el=>el.classList.remove('dancing'));
        if(!await wait(700,token)) return;
        break;
      case 'chain':
        $('chain-0').disabled=false; $('chain-0').focus();
        feedback('Vino la laptop: atinge fluturele și descoperă ce urmează.'); return;
      case 'final': {
        if(!await wait(850,token)) return;
        $('stage').querySelectorAll('.waiting').forEach(el=>el.classList.remove('waiting'));
        $('stage').querySelector('.stage-label').textContent='4 + 3 = 7 animale pe scenă.';
        if(!await wait(2000,token)) return;
        [...$('stage').querySelectorAll('.sprite')].slice(0,2).forEach(el=>el.classList.add('leaving'));
        $('stage').querySelector('.stage-label').textContent='7 − 2 = 5 animale rămân.';
        if(!await wait(1000,token)) return;
        const back=document.createElement('button'); back.id='return-show'; back.textContent='↻ Înapoi la început'; back.addEventListener('click',render); $('stage').append(back);
        break;
      }
    }
    if(token === epoch) complete();
  }
  function go(next) { if(next<0 || next>=scenes.length) return; index=next; render(); }
  function closeMenu() { $('menu').close(); $('contents').focus(); }
  scenes.forEach((s,i)=>{
    const button=document.createElement('button'); button.textContent = `${s.number ? String(s.number).padStart(2,'0')+' · ' : ''}${s.title}`;
    button.addEventListener('click',()=>{ go(i); closeMenu(); }); $('scene-list').append(button);
  });
  $('previous').addEventListener('click',()=>go(index-1));
  $('next').addEventListener('click',()=>{if(!$('next').disabled)go(index+1);});
  $('reset').addEventListener('click',render);
  $('demo').addEventListener('click',demo);
  $('hint').addEventListener('click',()=>feedback(scenes[index].hint));
  $('contents').addEventListener('click',()=>$('menu').showModal());
  $('close-menu').addEventListener('click',closeMenu);
  $('skip').addEventListener('click',()=>{go(Math.min(index+1,scenes.length-1));closeMenu();});
  async function fullscreen() {
    try {
      if(document.fullscreenElement) await document.exitFullscreen();
      else if(document.documentElement.requestFullscreen) await document.documentElement.requestFullscreen();
      else feedback('Pentru ecran complet, folosește F11 în browser.');
    } catch (_) { feedback('Pentru ecran complet, folosește F11 în browser.'); }
  }
  $('fullscreen').addEventListener('click',fullscreen);
  document.addEventListener('keydown',e=>{
    if($('menu').open || e.altKey || e.ctrlKey || e.metaKey) return;
    if(e.key==='ArrowRight') {e.preventDefault();if(!$('next').disabled)go(index+1);}
    else if(e.key==='ArrowLeft') {e.preventDefault();go(index-1);}
    else if(e.key.toLowerCase()==='r') render();
    else if(e.key.toLowerCase()==='f') fullscreen();
    else if((e.key===' ' || e.key==='Enter') && e.target===document.body && !$('demo').disabled) {e.preventDefault();demo();}
  });
  function fit() { $('presentation').style.transform=`scale(${Math.min(innerWidth/1440,innerHeight/810)})`; }
  addEventListener('resize',fit); addEventListener('pagehide',cancel);
  fit(); render();
}());
