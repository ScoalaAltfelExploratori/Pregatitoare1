const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const E = require('../game-engine.js');
const C = require('../curriculum.js');
const classicStages = ['two', 'three', 'challenge', 'challenge', 'challenge', 'challenge', 'classic-two-rows'];
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const progressKey = 'robo-explorator-progress-v1';

function setup({ progress, blockedStorage = false, guided = false, checkpoint } = {}) {
  const dom = new JSDOM(html, { url: 'http://robo.test/', runScripts: 'outside-only', pretendToBeVisual: true });
  const w = dom.window, document = w.document, timers = new Map(), sounds = [];
  let now = 0, timerId = 0, registeredTool;
  w.setTimeout = (callback, delay = 0) => { const id = ++timerId; timers.set(id, { callback, at: now + delay }); return id; };
  w.clearTimeout = id => timers.delete(id);
  w.RoboAudio = { play: kind => sounds.push(kind), stop() {}, async toggle() { return true; } };
  document.modelContext = { registerTool(tool) { registeredTool = tool; } };
  if (progress !== undefined) w.localStorage.setItem(progressKey, progress);
  if (checkpoint) w.localStorage.setItem('robo-explorator-lessons-v1', checkpoint);
  if (blockedStorage) Object.defineProperty(w, 'localStorage', { get() { throw new Error('Storage denied'); } });
  w.eval(fs.readFileSync(path.join(root, 'game-engine.js'), 'utf8'));
  w.eval(fs.readFileSync(path.join(root, 'curriculum.js'), 'utf8'));
  w.eval(fs.readFileSync(path.join(root, 'app.js'), 'utf8'));
  const get = id => document.getElementById(id);
  const click = id => get(id).click();
  const stage = id => { get('lesson-stage').value = id; get('lesson-stage').dispatchEvent(new w.Event('change')); };
  if (!guided) { stage(classicStages[Math.min(E.readProgress(progress), 6)]); get('auto-decision').checked = true; }
  const add = program => { for (const dir of program) document.querySelector('[data-dir="' + dir + '"]').click(); };
  async function advance(ms) {
    await Promise.resolve(); await Promise.resolve();
    const end = now + ms;
    while (true) {
      const entry = [...timers.entries()].filter(([, value]) => value.at <= end).sort((a, b) => a[1].at - b[1].at)[0];
      if (!entry) break;
      const [id, value] = entry;
      now = value.at; timers.delete(id); value.callback();
      await Promise.resolve(); await Promise.resolve();
    }
    now = end;
  }
  return { w, document, get, click, add, advance, sounds, stage, tool: () => registeredTool, close: () => dom.window.close() };
}

const detectiveArrows = app => [...app.get('queue').children].map(b => b.textContent.slice(-1));
const chooseRepair = (app, direction) => app.get('detective-choices').querySelector('[data-repair="' + direction + '"]').click();

const decisionProgram = [{ repeat: 3, commands: ['R', 'F'] }, 'R', 'U'];
const decisionSetup = () => { const app = setup({ progress: '{"version":3,"completed":5}' }); app.click('garden-scattered'); return app; };
const stageDecision = app => app.tool().execute({ commands: decisionProgram });

test('decizia din buton așteaptă răspunsul clasei și arată DA, NU, DA pe traseu', async t => {
  const app = decisionSetup(); t.after(app.close);
  assert.equal(app.get('game-title').textContent, 'Grădina lui Robo');
  assert.equal(app.get('decision-editor').hidden, false);
  assert.equal(app.get('repeat-editor').hidden, false);
  assert.equal(app.get('recipe-editor').hidden, true);
  assert.equal(app.get('action-pad').hidden, false);
  app.add(['R', 'F']); app.click('make-repeat'); app.add(['R', 'U']);
  assert.equal(app.get('queue').querySelectorAll('.repeat-block').length, 1);
  app.click('run'); await app.advance(720);
  assert.deepEqual(robotPosition(app), [1, 3]);
  assert.equal(app.get('decision-feedback').dataset.result, 'question');
  assert.match(app.get('decision-answer').textContent, /Ne gândim/);
  await app.advance(1999);
  assert.equal(app.get('board').querySelectorAll('.watered').length, 0);
  await app.advance(1);
  assert.equal(app.get('decision-feedback').dataset.result, 'yes');
  assert.equal(app.get('board').querySelectorAll('.watered').length, 1);
  app.click('stop'); app.click('run'); await app.advance(2720);
  assert.equal(app.get('decision-feedback').dataset.result, 'no');
  assert.deepEqual(robotPosition(app), [2, 3]);
  assert.equal(app.get('board').querySelectorAll('.watered').length, 1);
  await app.advance(6000);
  assert.equal(app.get('board').querySelectorAll('.watered').length, 2);
  assert.match(app.get('status').textContent, /8 pași/);
  assert.deepEqual([...app.get('queue').querySelectorAll('.repeat-decision-result')].map(n => n.textContent.slice(0, 2)), ['DA', 'NU', 'DA']);
  assert.equal(app.get('queue').querySelectorAll('.repeat-expanded > .done').length, 3);
  assert.equal(app.get('queue').querySelectorAll('.repeat-block.complete').length, 1);
  assert.equal(JSON.parse(app.w.localStorage.getItem(progressKey)).completed, 6);
});

test('oprirea în 24 de momente ale deciziei păstrează răspunsul și nu repetă udarea', async () => {
  for (const at of [719,720,721,2719,2720,2721,3719,3720,3721,4439,4440,4441,6439,6440,6441,10159,10160,10161,11459,11460,11461,12179,12180,12181]) {
    const app = decisionSetup();
    try {
      stageDecision(app); app.click('run'); await app.advance(at); app.click('stop');
      const pos = robotPosition(app), flowers = app.get('board').querySelectorAll('.watered').length;
      const answers = app.get('queue').querySelectorAll('.decision-result, .repeat-decision-result').length;
      await app.advance(20000);
      assert.deepEqual(robotPosition(app), pos);
      assert.equal(app.get('board').querySelectorAll('.watered').length, flowers);
      assert.equal(app.get('queue').querySelectorAll('.decision-result, .repeat-decision-result').length, answers);
      app.click('run'); app.click('run'); await app.advance(20000);
      assert.deepEqual(robotPosition(app), [4, 2]);
      assert.equal(app.get('board').querySelectorAll('.watered').length, 2);
      assert.equal(app.get('queue').querySelectorAll('.decision-result, .repeat-decision-result').length, 3);
      assert.match(app.get('status').textContent, /8 pași/);
      assert.equal(app.sounds.filter(s => s === 'win').length, 1);
    } finally { app.close(); }
  }
});

test('deciziile făcute supraviețuiesc ștergerii, anticipării și detectivului, iar soluția continuă', async t => {
  const app = decisionSetup(); t.after(app.close);
  stageDecision(app); app.click('run'); await app.advance(6440); app.click('stop');
  const queue = app.get('queue').textContent;
  app.click('predict-mode'); assert.equal(app.get('decision-feedback').hidden, true);
  app.click('detective-mode'); app.click('program-mode');
  assert.equal(app.get('queue').textContent, queue);
  assert.equal(app.get('decision-feedback').dataset.result, 'no');
  assert.deepEqual(robotPosition(app), [2, 3]);
  assert.throws(() => app.tool().execute({ commands: ['R', 'F', 'R', 'R'] }), /Pașii deja executați/);
  app.click('clear');
  assert.equal(app.get('queue').children.length, 4);
  assert.equal(app.get('queue').querySelectorAll('.decision-result, .repeat-decision-result').length, 2);
  app.click('solution'); app.click('run'); await app.advance(6000);
  assert.match(app.get('status').textContent, /8 pași/);
  assert.equal(app.get('board').querySelectorAll('.watered').length, 2);
  app.click('restart');
  assert.equal(app.get('decision-feedback').dataset.result, 'ready');
  assert.equal(app.get('queue').querySelectorAll('.repeat-decision-result').length, 0);
  assert.equal(app.get('board').querySelectorAll('.watered').length, 0);
  assert.match(app.get('status').textContent, /poart/);
});

test('schimbarea activității în timpul întrebării nu udă în fundal; revenirea repetă întrebarea', async t => {
  const app = decisionSetup(); t.after(app.close);
  app.add(['R', 'F']); app.click('run'); await app.advance(1500); app.click('detective-mode');
  await app.advance(20000); app.click('program-mode');
  assert.deepEqual(robotPosition(app), [1, 3]);
  assert.equal(app.get('board').querySelectorAll('.watered').length, 0);
  assert.match(app.get('decision-answer').textContent, /oprit înainte/);
  app.click('run'); await app.advance(1999);
  assert.equal(app.get('board').querySelectorAll('.watered').length, 0);
  await app.advance(1001);
  assert.equal(app.get('board').querySelectorAll('.watered').length, 1);
  app.add(['F']); app.click('run'); await app.advance(3000);
  assert.equal(app.get('board').querySelectorAll('.watered').length, 1);
  assert.match(app.get('decision-answer').textContent, /DA.*deja udată/);
});

test('decizia goală poate fi ștearsă, iar WebMCP și limita resping combinațiile indisponibile', async t => {
  const app = decisionSetup(); t.after(app.close);
  app.add(['F']); app.get('queue').querySelector('button').click();
  assert.equal(app.get('queue').children.length, 0);
  app.tool().execute({ commands: ['F'] }); app.click('run'); await app.advance(3000);
  assert.deepEqual(robotPosition(app), [0, 3]);
  assert.equal(app.get('decision-feedback').dataset.result, 'no');
  assert.match(app.get('execution-note').textContent, /1 pas făcut/);
  assert.throws(() => app.tool().execute({ commands: ['F', 'A'] }), /indisponibilă/);
  app.tool().execute({ commands: ['F', { repeat: 2, commands: ['R', 'F'] }] });
  assert.equal(app.get('queue').querySelectorAll('.repeat-block').length, 1);
  assert.throws(() => app.tool().execute({ commands: [{ call: 'water-row' }] }), /Rețetă necunoscută/);
  app.click('restart'); app.click('clear'); app.add(Array(33).fill('F'));
  assert.equal(app.get('queue').children.length, 32);
  assert.equal(app.get('if-flower').disabled, true);
  assert.throws(() => app.tool().execute({ commands: Array(33).fill('F') }), /cel mult 32/);
  app.get('mission-trail').children[0].click();
  assert.equal(app.get('decision-editor').hidden, true);
  assert.throws(() => app.tool().execute({ commands: ['F'] }), /indisponibilă/);
});

test('misiunea cu decizii cere florile înainte de căsuță și are fișă cu DA și NU', async t => {
  const app = decisionSetup(); t.after(app.close);
  app.add(['R', 'R', 'R', 'R']); app.click('run'); await app.advance(3000);
  assert.match(app.get('status').textContent, /poarta/);
  assert.equal(app.get('completion').hidden, true);
  assert.equal(JSON.parse(app.w.localStorage.getItem(progressKey)).completed, 5);
  app.w.print = () => {}; app.click('print-game');
  assert.match(app.get('print-area').textContent, /Dacă este o floare aici → Udă/);
  assert.match(app.get('print-area').textContent, /DA\/NU/);
  assert.match(app.get('print-area').textContent, /poart/);
});


test('variantele grădinii reiau explicit încercarea și au același progres', async t => {
  const app = decisionSetup(); t.after(app.close);
  app.add(['R', 'F']); app.click('run'); await app.advance(300);
  assert.equal(app.get('garden-rows').disabled, true);
  app.click('garden-rows'); assert.equal(app.get('decision-editor').hidden, false);
  await app.advance(3420);
  app.click('garden-scattered'); // Selecting the current variant is not a reset.
  assert.deepEqual(robotPosition(app), [1, 3]);
  assert.equal(app.get('board').querySelectorAll('.watered').length, 1);
  app.click('garden-rows');
  assert.deepEqual(robotPosition(app), [0, 3]);
  assert.equal(app.get('queue').children.length, 0);
  assert.equal(app.get('board').querySelectorAll('.watered').length, 0);
  assert.equal(app.get('decision-editor').hidden, true);
  assert.equal(app.get('repeat-editor').hidden, false);
  assert.throws(() => app.tool().execute({ commands: [{ repeat: 3, commands: ['R', 'F'] }] }), /indisponibilă/);
  app.add(E.solve(E.mission(5))); app.click('run'); await app.advance(6000);
  assert.equal(JSON.parse(app.w.localStorage.getItem(progressKey)).completed, 6);
  app.click('garden-scattered'); stageDecision(app); app.click('run'); await app.advance(14000);
  assert.equal(JSON.parse(app.w.localStorage.getItem(progressKey)).completed, 6);
  assert.equal(app.get('completion').hidden, false);
  assert.equal(app.get('mission-trail').children.length, 7);
});

test('salvarea veche cu opt misiuni păstrează cele șapte misiuni terminate', t => {
  for (const completed of [7, 8]) {
    const app = setup({ progress: JSON.stringify({ version: 3, completed }) }); t.after(app.close);
    assert.equal(app.get('game-title').textContent, 'Rețeta lui Robo');
    assert.match(app.get('adventure-progress').textContent, /^3 din 3/);
    assert.equal(app.get('mission-trail').querySelectorAll('button:enabled').length, 7);
  }
});

test('detectivul se joacă din butoane: trei cazuri, două alegeri, ajutor și reluare fără punctaj', async t => {
  const app = setup(); t.after(app.close);
  app.add(['R']); app.click('detective-mode');
  assert.equal(app.get('mission-trail').hidden, true);
  assert.equal(app.get('program-editor').hidden, true);
  assert.equal(app.get('edit-actions').hidden, true);
  assert.equal(app.get('queue').children[1].getAttribute('aria-pressed'), 'true');
  assert.equal(app.get('detective-choices').children.length, 2);
  assert.equal(app.get('program-mode').getAttribute('aria-pressed'), 'false');
  assert.throws(() => app.tool().execute({ commands: ['R', 'R'] }), /Revino la Programăm/);
  for (let i = 0; i < E.detectiveCount; i++) {
    const m = E.detectiveCase(i);
    if (i > 0) assert.equal(app.get('detective-repair').hidden, true);
    app.click('run'); await app.advance(3500);
    assert.equal(app.get('detective-completion').hidden, true);
    assert.equal(app.get('status').classList.contains('error'), false);
    app.click('detective-hint');
    assert.equal(app.get('queue').children[m.detective.repairIndex].getAttribute('aria-pressed'), 'true');
    const fix = m.detective.choices.find(d => { const p = [...m.detective.commands]; p[m.detective.repairIndex] = d; return E.evaluate(m, p).outcome === 'won'; });
    chooseRepair(app, fix);
    assert.deepEqual(robotPosition(app), m.start);
    app.click('run'); await app.advance(3500);
    assert.deepEqual(robotPosition(app), m.goal);
    assert.equal(app.get('detective-completion').hidden, false);
    assert.equal(app.get('completion').hidden, true);
    assert.equal(app.w.localStorage.getItem(progressKey), null);
    app.click('next-case');
  }
  assert.match(app.get('map-label').textContent, /Cazul 1 din 3/);
  app.click('program-mode');
  assert.equal(app.get('mission-trail').hidden, false);
  assert.equal(app.get('detective-tools').hidden, true);
  assert.equal(app.get('queue').children[0].textContent, '1→');
});

test('detectivul schimbă cel mult o săgeată și acceptă și un alt drum corect', async t => {
  const app = setup(); t.after(app.close); app.click('detective-mode');
  app.get('queue').children[0].click(); chooseRepair(app, 'U');
  assert.deepEqual(detectiveArrows(app), ['↑', '↑']);
  app.click('run'); await app.advance(2000);
  assert.equal(app.get('detective-completion').hidden, true);
  app.get('queue').children[1].click(); chooseRepair(app, 'R');
  assert.deepEqual(detectiveArrows(app), ['→', '→']);
  assert.equal(app.get('queue').querySelectorAll('.changed').length, 1);
  app.add(['U']); app.click('clear'); app.click('undo'); app.click('solution');
  app.document.dispatchEvent(new app.w.KeyboardEvent('keydown', { key: 'ArrowUp', bubbles: true }));
  assert.deepEqual(detectiveArrows(app), ['→', '→']);
  app.click('run'); await app.advance(2000); app.click('next-case');
  app.get('queue').children[0].click(); chooseRepair(app, 'R'); // R U R also avoids the tree.
  app.click('run'); await app.advance(3000);
  assert.deepEqual(robotPosition(app), [2, 1]);
  assert.equal(app.get('detective-completion').hidden, false);
});

test('oprirea detectivului continuă pașii, iar schimbarea săgeții reia explicit încercarea', async t => {
  for (const at of [0, 299, 300, 301, 719, 720, 1019, 1020, 1021]) {
    const app = setup(); t.after(app.close); app.click('detective-mode'); chooseRepair(app, 'R');
    app.click('run'); await app.advance(at); app.click('stop');
    const stopped = robotPosition(app); await app.advance(3000);
    assert.deepEqual(robotPosition(app), stopped);
    app.click('run'); await app.advance(3000);
    assert.deepEqual(robotPosition(app), [2, 2]);
    assert.equal(app.sounds.filter(s => s === 'win').length, 1);
  }
  const app = setup(); t.after(app.close); app.click('detective-mode');
  app.click('run'); await app.advance(350); app.click('stop');
  assert.deepEqual(robotPosition(app), [1, 2]);
  chooseRepair(app, 'U'); // Selecting the existing arrow is not an edit or reset.
  assert.deepEqual(robotPosition(app), [1, 2]);
  chooseRepair(app, 'R');
  assert.deepEqual(robotPosition(app), [0, 2]);
  app.click('run'); await app.advance(2000);
  assert.equal(app.get('detective-completion').hidden, false);
});

test('detectiv și anticipare păstrează aventura, cheia și cursorul inclusiv la schimbarea în mers', async t => {
  const app = setup({ progress: '{"version":3,"completed":3}' }); t.after(app.close);
  app.add(E.solve(E.mission(3)).slice(0, 8)); app.click('run'); await app.advance(6000);
  app.add(['D', 'D', 'D', 'D']); app.click('run'); await app.advance(350);
  const position = robotPosition(app), queue = app.get('queue').textContent;
  app.click('detective-mode'); app.click('run'); await app.advance(350);
  app.click('predict-mode'); await app.advance(5000); app.click('detective-mode');
  assert.match(app.get('map-label').textContent, /Cazul 1/);
  app.click('program-mode');
  assert.deepEqual(robotPosition(app), position);
  assert.equal(app.get('queue').textContent, queue);
  assert.equal(app.get('key-objective').textContent, '✓ Cheie găsită');
  app.click('run'); await app.advance(3000);
  assert.match(app.get('status').textContent, /comoara cu cheia.*12 pași/);
  assert.equal(JSON.parse(app.w.localStorage.getItem(progressKey)).completed, 4);
});

test('povestea deschide cazul simplu, iar fișa de detectiv include săgețile și variantele', async t => {
  const app = setup(); t.after(app.close);
  app.document.querySelector('[data-view="story"]').click();
  app.get('story-dots').children[3].click();
  assert.equal(app.get('scene-visual').querySelectorAll('.tile').length, 9);
  assert.equal(app.get('scene-visual').querySelectorAll('.mini-program span').length, 2);
  app.click('scene-action');
  assert.equal(app.get('game-title').textContent, 'Detectivul Robo');
  app.w.print = () => {}; app.click('print-game');
  assert.equal(app.get('print-area').querySelectorAll('.tile').length, 9);
  assert.equal(app.get('print-area').querySelectorAll('.detective-sheet-program span').length, 2);
  assert.match(app.get('print-area').textContent, /Alegem dintre ↑ și →/);
  app.click('run'); await app.advance(350); app.document.querySelector('[data-view="story"]').click();
  await app.advance(5000); app.document.querySelector('[data-view="game"]').click();
  assert.deepEqual(robotPosition(app), [1, 2]);
  app.click('program-mode'); assert.equal(app.get('game-title').textContent, 'Prima comoară');
});

test('aventura completă deblochează șapte misiuni, salvează și permite rejucarea', async t => {
  const app = setup(); t.after(app.close);
  assert.equal(app.get('board').children.length, 9);
  assert.equal(app.get('mission-trail').querySelectorAll('button:enabled').length, 1);
  for (let i = 0; i < E.missionCount; i++) {
    app.stage(classicStages[i]); app.add(E.solve(E.mission(i))); app.click('run');
    assert.equal(app.get('run').disabled, true);
    await app.advance(E.solve(E.mission(i)).reduce((ms, d) => ms + (d === 'F' ? 3000 : 720), 100));
    assert.match(app.get('status').textContent, /Am ajuns la destinație|Am deschis comoara cu cheia/);
    assert.equal(app.get('completion').hidden, false);
    assert.equal(JSON.parse(app.w.localStorage.getItem(progressKey)).completed, i + 1);
    assert.equal(app.get('mission-trail').querySelectorAll('button:enabled').length, Math.min(i + 2, E.missionCount));
    if (i < E.missionCount - 1) app.click('next-mission');
  }
  assert.equal(app.get('next-mission').hidden, true);
  app.get('mission-trail').children[0].click(); app.stage('two');
  app.add(['R', 'R', 'D']); app.click('run'); await app.advance(5000);
  assert.match(app.get('status').textContent, /2 pași/);
  assert.equal(JSON.parse(app.w.localStorage.getItem(progressKey)).completed, 7);
});

test('reîncărcarea reia următoarea misiune; stocarea refuzată permite totuși progresul', async t => {
  const resumed = setup({ progress: '{"version":1,"completed":3}' }); t.after(resumed.close);
  assert.equal(resumed.get('game-title').textContent, 'Cheia și comoara');
  assert.equal(resumed.get('board').children.length, 25);
  assert.match(resumed.get('board').getAttribute('aria-label'), /5 rânduri și 5 coloane/);
  const privateMode = setup({ blockedStorage: true }); t.after(privateMode.close);
  privateMode.add(['R', 'R']); privateMode.click('run'); await privateMode.advance(2000);
  assert.match(privateMode.get('status').textContent, /doar până închidem pagina/);
  privateMode.click('next-mission');
  assert.equal(privateMode.get('game-title').textContent, 'Drumul spre căsuță');
});

test('oprirea și schimbarea misiunii anulează rularea în curs', async t => {
  const app = setup({ progress: '{"version":1,"completed":1}' }); t.after(app.close);
  app.add(['R', 'U', 'U']); app.click('run'); await app.advance(350);
  app.click('stop');
  const stopped = app.get('board').getAttribute('aria-label');
  await app.advance(10000);
  assert.equal(app.get('board').getAttribute('aria-label'), stopped);
  assert.equal(JSON.parse(app.w.localStorage.getItem(progressKey)).completed, 1);
  app.click('run'); await app.advance(350);
  app.get('mission-trail').children[0].click(); await app.advance(10000);
  assert.equal(app.get('game-title').textContent, 'Prima comoară');
  assert.equal(app.get('step-count').textContent, 'La start');
  assert.equal(app.get('queue').children.length, 0);
  assert.equal(app.get('completion').hidden, true);
});

test('anticiparea cere alegere, verifică răspunsuri și restaurează programul', async t => {
  const app = setup(); t.after(app.close);
  app.add(['R']); app.click('predict-mode');
  assert.equal(app.get('run').disabled, true);
  assert.equal(app.get('queue').querySelectorAll('button').length, 0);
  assert.equal(app.get('queue').children.length, 2);
  assert.throws(() => app.tool().execute({ commands: ['R'] }), /Revino la Programăm/);
  const board = app.get('board'), cells = [...board.children], size = 3;
  const at = index => [index % size, Math.floor(index / size)];
  const map = { size, start: at(cells.findIndex(c => c.classList.contains('robot'))), goal: [-1,-1], obstacles: [] };
  const arrows = { '↑': 'U', '↓': 'D', '←': 'L', '→': 'R' };
  const program = [...app.get('queue').children].map(c => arrows[c.textContent.slice(-1)]);
  const end = E.evaluate(map, program).position;
  cells[end[1] * size + end[0]].click();
  assert.equal(app.get('run').disabled, false);
  app.click('run'); await app.advance(3000);
  assert.match(app.get('status').textContent, /Am ghicit!/);
  assert.equal(board.querySelectorAll('.answer').length, 1);
  assert.equal(app.get('run').disabled, true);
  assert.equal(app.w.localStorage.getItem(progressKey), null);
  app.click('next-round');
  app.get('board').querySelector('.robot').click(); app.click('run'); await app.advance(3000);
  assert.match(app.get('status').textContent, /Bună încercare!/);
  app.click('program-mode');
  assert.equal(app.get('game-title').textContent, 'Prima comoară');
  assert.equal(app.get('queue').children.length, 1);
  assert.equal(app.get('queue').children[0].textContent, '1→');
});

test('trecerea la anticipare sau poveste în timpul rulării nu termină misiunea veche', async t => {
  const app = setup(); t.after(app.close);
  app.add(['R', 'R']); app.click('run'); await app.advance(350); app.click('predict-mode');
  await app.advance(5000);
  assert.equal(app.get('game-title').textContent, 'Unde se oprește Robo?');
  assert.equal(app.get('step-count').textContent, 'La start');
  assert.equal(app.w.localStorage.getItem(progressKey), null);
  app.click('program-mode'); app.click('run'); await app.advance(200);
  app.document.querySelector('[data-view="story"]').click(); await app.advance(5000);
  assert.equal(app.get('story-view').hidden, false);
  assert.equal(app.w.localStorage.getItem(progressKey), null);
});

test('detectivul, limita de comenzi, resetarea și fișa respectă starea activă', async t => {
  const app = setup(); t.after(app.close);
  app.add(Array(12).fill('R'));
  assert.equal(app.get('queue').children.length, 8);
  assert.throws(() => app.tool().execute({ commands: Array(9).fill('R') }), /cel mult 8/);
  app.w.print = () => {};
  app.click('print-game');
  assert.equal(app.get('print-area').querySelectorAll('.tile').length, 9);
  assert.equal(app.get('print-area').querySelector('.board').style.getPropertyValue('--board-size'), '3');
  app.click('bug-map'); app.click('run'); await app.advance(3000);
  assert.match(app.get('status').textContent, /Schimbăm o săgeată/);
  assert.equal(app.get('board').children.length, 9);
  assert.equal(app.w.localStorage.getItem(progressKey), null);
  app.click('reset-adventure'); assert.equal(app.get('reset-confirmation').hidden, false);
  app.click('cancel-reset'); assert.equal(app.get('reset-confirmation').hidden, true);
  assert.match(app.get('map-label').textContent, /Cazul 1 din 3/);
  app.click('confirm-reset'); assert.equal(app.get('game-title').textContent, 'Prima comoară');
});

test('finala refuză cufărul fără cheie și nu acordă progres pentru simpla colectare', async t => {
  const app = setup({ progress: '{"version":2,"completed":3}' }); t.after(app.close);
  assert.equal(app.get('mission-objectives').hidden, false);
  assert.equal(app.get('board').querySelectorAll('.key-item').length, 1);
  app.add(['R', 'R', 'R', 'R']); app.click('run'); await app.advance(4000);
  assert.match(app.get('status').textContent, /cufărul este încuiat/);
  assert.equal(app.get('board').querySelector('.goal').classList.contains('bump'), true);
  assert.equal(app.get('completion').hidden, true);
  app.click('restart'); app.click('clear');
  app.add(E.solve(E.mission(3)).slice(0, 8)); app.click('run'); await app.advance(6000);
  assert.equal(app.get('key-objective').textContent, '✓ Cheie găsită');
  assert.equal(app.get('chest-objective').classList.contains('complete'), false);
  assert.equal(app.get('board').querySelectorAll('.key-item').length, 0);
  assert.match(app.get('board').querySelector('.goal').getAttribute('aria-label'), /descuiat/);
  assert.equal(app.get('completion').hidden, true);
  assert.equal(JSON.parse(app.w.localStorage.getItem(progressKey)).completed, 3);
  app.w.print = () => {};
  app.click('print-game');
  assert.match(app.get('print-area').textContent, /Mai întâi luăm cheia/);
  assert.equal(app.get('print-area').querySelectorAll('.key-item').length, 1);
  assert.equal(app.get('print-area').querySelectorAll('.chest-icon').length, 1);
  app.click('restart');
  assert.equal(app.get('key-objective').classList.contains('complete'), false);
  assert.equal(app.get('board').querySelectorAll('.key-item').length, 1);
  assert.equal(app.get('queue').children.length, 8);
});

test('migrarea unei aventuri vechi terminate cere rezolvarea noii finale și salvează versiunea nouă', async t => {
  const app = setup({ progress: '{"version":1,"completed":6}' }); t.after(app.close);
  assert.equal(app.get('game-title').textContent, 'Cheia și comoara');
  assert.match(app.get('adventure-progress').textContent, /^3 din 3/);
  app.click('solution'); app.click('run'); await app.advance(10000);
  assert.match(app.get('status').textContent, /Am deschis comoara cu cheia/);
  assert.equal(app.get('key-objective').classList.contains('complete'), true);
  assert.equal(app.get('chest-objective').classList.contains('complete'), true);
  assert.equal(app.get('completion').hidden, false);
  assert.deepEqual(JSON.parse(app.w.localStorage.getItem(progressKey)), { version: 3, completed: 4 });
  const resumed = setup({ progress: app.w.localStorage.getItem(progressKey) }); t.after(resumed.close);
  assert.match(resumed.get('adventure-progress').textContent, /^3 din 3/);
});

test('comenzile noi și revenirea din anticipare păstrează cheia și poziția curentă', async t => {
  const app = setup({ progress: '{"version":2,"completed":3}' }); t.after(app.close);
  app.add(E.solve(E.mission(3)).slice(0, 8)); app.click('run'); await app.advance(6000);
  app.click('predict-mode');
  assert.equal(app.get('mission-objectives').hidden, true);
  assert.equal(app.get('key-legend').hidden, true);
  app.click('program-mode');
  assert.equal(app.get('mission-objectives').hidden, false);
  assert.equal(app.get('board').querySelectorAll('.key-item').length, 0);
  assert.equal(app.get('queue').children.length, 8);
  assert.equal(app.get('run').disabled, true);
  app.add(['D']);
  assert.equal(app.get('key-objective').classList.contains('complete'), true);
  assert.equal(app.get('board').querySelectorAll('.key-item').length, 0);
  app.click('run'); await app.advance(1000);
  assert.deepEqual(robotPosition(app), [4, 1]);
  assert.equal(app.get('queue').querySelectorAll('.executed').length, 9);
});

test('schimbarea misiunii după colectarea cheii anulează finalizarea întârziată', async t => {
  const app = setup({ progress: '{"version":2,"completed":3}' }); t.after(app.close);
  app.add(E.solve(E.mission(3))); app.click('run'); await app.advance(6000);
  assert.equal(app.get('key-objective').classList.contains('complete'), true);
  app.get('mission-trail').children[0].click(); await app.advance(10000);
  assert.equal(app.get('game-title').textContent, 'Prima comoară');
  assert.equal(app.get('mission-objectives').hidden, true);
  assert.equal(app.get('completion').hidden, true);
  assert.equal(JSON.parse(app.w.localStorage.getItem(progressKey)).completed, 3);
});

function robotPosition(app) {
  const cells = [...app.get('board').children], size = Math.sqrt(cells.length);
  const index = cells.findIndex(cell => cell.classList.contains('robot'));
  return [index % size, Math.floor(index / size)];
}

test('două porniri: opt comenzi până la cheie, apoi doar patru comenzi noi până la cufăr', async t => {
  const app = setup({ progress: '{"version":2,"completed":3}' }); t.after(app.close);
  const path = E.solve(E.mission(3));
  app.add(path.slice(0, 8)); app.click('run'); await app.advance(6000);
  assert.deepEqual(robotPosition(app), [4, 0]);
  assert.equal(app.get('key-objective').classList.contains('complete'), true);
  assert.equal(app.get('run').disabled, true);
  const before = app.get('board').getAttribute('aria-label');
  app.get('run').dispatchEvent(new app.w.Event('click')); await app.advance(1000);
  assert.equal(app.get('board').getAttribute('aria-label'), before);
  app.add(path.slice(8));
  assert.deepEqual(robotPosition(app), [4, 0]);
  assert.equal(app.get('queue').querySelectorAll('.executed').length, 8);
  assert.equal(app.get('queue').querySelectorAll('button').length, 4);
  assert.match(app.get('execution-note').textContent, /8 pași făcuți · 4 comenzi noi/);
  app.click('run');
  app.get('run').dispatchEvent(new app.w.Event('click'));
  await app.advance(4000);
  assert.deepEqual(robotPosition(app), [4, 4]);
  assert.match(app.get('status').textContent, /comoara cu cheia.*12 pași/);
  assert.equal(app.sounds.filter(kind => kind === 'win').length, 1);
  app.get('run').dispatchEvent(new app.w.Event('click')); await app.advance(1000);
  assert.equal(app.sounds.filter(kind => kind === 'win').length, 1);
});

test('oprirea înainte sau după mutare nu pierde și nu repetă niciun pas, inclusiv la cheie și la victorie', async () => {
  for (const at of [0, 299, 300, 350, 719, 720, 1019, 1020, 5339, 5340, 5759, 5760, 8219, 8220, 8400]) {
    const app = setup({ progress: '{"version":2,"completed":3}' });
    try {
      app.add(E.solve(E.mission(3))); app.click('run'); await app.advance(at); app.click('stop');
      const position = robotPosition(app), done = app.get('queue').querySelectorAll('.executed').length;
      const hasKey = app.get('key-objective').classList.contains('complete');
      await app.advance(12000);
      assert.deepEqual(robotPosition(app), position, 'poziție stabilă după oprire la ' + at);
      assert.equal(app.get('queue').querySelectorAll('.executed').length, done);
      assert.equal(app.get('key-objective').classList.contains('complete'), hasKey);
      app.click('run'); await app.advance(12000);
      assert.deepEqual(robotPosition(app), [4, 4], 'reluare corectă după oprire la ' + at);
      assert.match(app.get('status').textContent, /comoara cu cheia.*12 pași/);
      assert.equal(app.get('queue').querySelectorAll('.executed').length, 12);
      assert.equal(app.sounds.filter(kind => kind === 'win').length, 1);
      assert.deepEqual(JSON.parse(app.w.localStorage.getItem(progressKey)), { version: 3, completed: 4 });
    } finally { app.close(); }
  }
});

test('editarea, anularea și ștergerea ating doar comenzile noi, fără pierderea cheii', async t => {
  const app = setup({ progress: '{"version":2,"completed":3}' }); t.after(app.close);
  app.add(E.solve(E.mission(3)).slice(0, 8)); app.click('run'); await app.advance(6000);
  app.add(['L', 'D', 'D']);
  const done = app.get('queue').querySelector('.executed');
  assert.equal(done.tagName, 'SPAN'); done.click();
  assert.equal(app.get('queue').children.length, 11);
  app.get('queue').querySelector('button').click(); // Remove the pending L.
  app.click('undo');
  assert.equal(app.get('queue').children.length, 9);
  app.click('clear');
  assert.equal(app.get('queue').children.length, 8);
  assert.equal(app.get('undo').disabled, true);
  assert.equal(app.get('clear').disabled, true);
  assert.equal(app.get('clear').textContent, 'Șterge cele noi');
  assert.deepEqual(robotPosition(app), [4, 0]);
  assert.equal(app.get('key-objective').classList.contains('complete'), true);
  app.click('restart');
  assert.deepEqual(robotPosition(app), [0, 4]);
  assert.equal(app.get('key-objective').classList.contains('complete'), false);
  assert.equal(app.get('queue').querySelectorAll('.executed').length, 0);
  assert.equal(app.get('queue').querySelectorAll('button').length, 8);
  app.click('clear');
  assert.equal(app.get('queue').children.length, 0);
});

test('o comandă greșită rămâne neexecutată și poate fi reparată fără a relua pașii buni', async t => {
  const app = setup({ progress: '{"version":2,"completed":3}' }); t.after(app.close);
  app.add(E.solve(E.mission(3)).slice(0, 8)); app.click('run'); await app.advance(6000);
  app.add(['R']); app.click('run'); await app.advance(1000); // Outside the map, after getting the key.
  assert.match(app.get('status').textContent, /Pasul 9: am ieși/);
  assert.equal(app.get('queue').querySelectorAll('.executed').length, 8);
  assert.deepEqual(robotPosition(app), [4, 0]);
  app.get('queue').querySelector('button').click();
  app.add(['D', 'D', 'D', 'D']); app.click('run'); await app.advance(4000);
  assert.match(app.get('status').textContent, /comoara cu cheia.*12 pași/);
});

test('jocul liber păstrează pașii buni când este șters pasul blocat de copac', async t => {
  const app = setup(); t.after(app.close);
  app.click('first-map'); app.add(['R', 'U', 'U']); app.click('run'); await app.advance(3000);
  assert.deepEqual(robotPosition(app), [1, 3]);
  assert.equal(app.get('queue').querySelectorAll('.executed').length, 2);
  app.get('queue').querySelector('button').click();
  app.add(['R']); app.click('run'); await app.advance(1000);
  assert.deepEqual(robotPosition(app), [2, 3]);
  assert.equal(app.get('queue').querySelectorAll('.executed').length, 3);
});

test('soluția continuă din poziția curentă cu cheia deja colectată', async t => {
  const app = setup({ progress: '{"version":2,"completed":3}' }); t.after(app.close);
  app.add(E.solve(E.mission(3)).slice(0, 8)); app.click('run'); await app.advance(6000);
  app.click('solution');
  assert.deepEqual(robotPosition(app), [4, 0]);
  assert.equal(app.get('queue').children.length, 12);
  assert.equal(app.get('queue').querySelectorAll('.executed').length, 8);
  assert.equal(app.get('key-objective').classList.contains('complete'), true);
  app.click('run'); await app.advance(4000);
  assert.match(app.get('status').textContent, /comoara cu cheia.*12 pași/);
});

test('WebMCP protejează istoricul executat și poate pregăti o continuare fără resetare', async t => {
  const app = setup({ progress: '{"version":2,"completed":3}' }); t.after(app.close);
  const path = E.solve(E.mission(3));
  app.add(path.slice(0, 8)); app.click('run'); await app.advance(6000);
  assert.throws(() => app.tool().execute({ commands: ['D', 'D', 'D', 'D'] }), /Pașii deja executați/);
  assert.throws(() => app.tool().execute({ commands: ['L', ...path.slice(1)] }), /Pașii deja executați/);
  assert.deepEqual(robotPosition(app), [4, 0]);
  const staged = app.tool().execute({ commands: path });
  assert.equal(staged.executed, 8);
  assert.equal(staged.prediction, 'won');
  assert.equal(app.get('key-objective').classList.contains('complete'), true);
  app.click('run'); await app.advance(4000);
  assert.match(app.get('status').textContent, /comoara cu cheia.*12 pași/);
});

test('ascunderea paginii în timpul animației păstrează pasul deja făcut pentru continuare', async t => {
  const app = setup({ progress: '{"version":2,"completed":3}' }); t.after(app.close);
  app.add(E.solve(E.mission(3))); app.click('run'); await app.advance(5350);
  Object.defineProperty(app.document, 'hidden', { configurable: true, value: true });
  app.document.dispatchEvent(new app.w.Event('visibilitychange')); await app.advance(10000);
  assert.deepEqual(robotPosition(app), [4, 0]);
  assert.equal(app.get('key-objective').classList.contains('complete'), true);
  Object.defineProperty(app.document, 'hidden', { configurable: true, value: false });
  app.document.dispatchEvent(new app.w.Event('visibilitychange'));
  app.click('run'); await app.advance(4000);
  assert.match(app.get('status').textContent, /comoara cu cheia.*12 pași/);
});

test('podul blochează trecerea, iar activarea și continuarea supraviețuiesc schimbării activității', async t => {
  const app = setup({ progress: '{"version":2,"completed":4}' }); t.after(app.close);
  assert.equal(app.get('game-title').textContent, 'Podul și maneta');
  assert.equal(app.get('activate').hidden, false);
  assert.equal(app.get('water').hidden, true);
  assert.equal(app.get('repeat-editor').hidden, true);
  assert.equal(app.get('mission-trail').children[5].disabled, true);
  app.add(['U', 'R', 'R']); app.click('run'); await app.advance(2500);
  assert.match(app.get('status').textContent, /podul este ridicat/);
  assert.deepEqual(robotPosition(app), [1, 3]);
  app.get('queue').querySelector('button').click();
  app.add(['U', 'L', 'A']);
  assert.equal(app.get('board').querySelectorAll('.bridge-open').length, 0);
  app.click('run'); await app.advance(3000);
  assert.equal(app.get('board').querySelectorAll('.bridge-open').length, 1);
  assert.deepEqual(robotPosition(app), [0, 2]);
  app.click('predict-mode'); app.click('program-mode');
  assert.equal(app.get('board').querySelectorAll('.bridge-open').length, 1);
  app.click('solution'); app.click('run'); await app.advance(10000);
  assert.equal(app.get('completion').hidden, false);
  assert.equal(JSON.parse(app.w.localStorage.getItem(progressKey)).completed, 5);
  app.click('restart');
  assert.equal(app.get('board').querySelectorAll('.bridge-open').length, 0);
  app.w.print = () => {}; app.click('print-game');
  assert.equal(app.get('print-area').querySelectorAll('.river').length, 5);
  assert.match(app.get('print-area').textContent, /Activează/);
});

function gardenLoop(app, count = 3) {
  app.add(['R', 'W']); app.get('repeat-count').value = String(count);
  app.get('repeat-count').dispatchEvent(new app.w.Event('change'));
  assert.equal(app.get('make-repeat').disabled, false); app.click('make-repeat');
}

test('grădina grupează două comenzi, arată repetiția și permite finalizarea în două porniri', async t => {
  const app = setup({ progress: '{"version":3,"completed":5}' }); t.after(app.close);
  assert.equal(app.get('water').hidden, false); assert.equal(app.get('activate').hidden, true);
  assert.equal(app.get('make-repeat').disabled, true);
  gardenLoop(app);
  assert.equal(app.get('queue').querySelectorAll('.repeat-block').length, 1);
  assert.match(app.get('command-count').textContent, /6 \/ 32/);
  app.click('run'); await app.advance(1800);
  assert.match(app.get('repeat-progress').textContent, /Repetiția 2 din 3/);
  await app.advance(3000);
  assert.equal(app.get('board').querySelectorAll('.watered').length, 3);
  assert.equal(app.get('board').querySelectorAll('.gate-open').length, 1);
  assert.equal(app.get('completion').hidden, true);
  assert.equal(app.get('run').disabled, true);
  app.add(['R', 'U']); app.click('run'); await app.advance(2000);
  assert.match(app.get('status').textContent, /8 pași/);
  assert.deepEqual(robotPosition(app), [4, 2]);
  assert.deepEqual(JSON.parse(app.w.localStorage.getItem(progressKey)), { version: 3, completed: 6 });
  assert.equal(app.sounds.filter(s => s === 'win').length, 1);
  app.click('restart');
  assert.equal(app.get('board').querySelectorAll('.watered,.gate-open').length, 0);
  assert.equal(app.get('queue').querySelectorAll('.repeat-block').length, 1);
  app.w.print = () => {}; app.click('print-game');
  assert.match(app.get('print-area').textContent, /Repetă de/);
  assert.equal(app.get('print-area').querySelectorAll('.flower-tile').length, 3);
});

test('oprirea la fiecare mutare și udare din repetiție păstrează exact cursorul și florile', async () => {
  for (let step = 0; step < 8; step++) for (const offset of [-1, 0, 50]) {
    const app = setup({ progress: '{"version":3,"completed":5}' });
    try {
      gardenLoop(app); app.add(['R', 'U']); app.click('run');
      await app.advance(300 + step * 720 + offset); app.click('stop');
      const pos = robotPosition(app), watered = app.get('board').querySelectorAll('.watered').length;
      await app.advance(10000);
      assert.deepEqual(robotPosition(app), pos);
      assert.equal(app.get('board').querySelectorAll('.watered').length, watered);
      app.click('run'); await app.advance(10000);
      assert.deepEqual(robotPosition(app), [4, 2]);
      assert.equal(app.get('board').querySelectorAll('.watered').length, 3);
      assert.match(app.get('status').textContent, /8 pași/);
      assert.equal(app.sounds.filter(s => s === 'win').length, 1);
    } finally { app.close(); }
  }
});

test('ștergerea unei repetiții începute păstrează pașii făcuți și soluția continuă udarea', async t => {
  const app = setup({ progress: '{"version":3,"completed":5}' }); t.after(app.close);
  gardenLoop(app); app.click('run'); await app.advance(1750); app.click('stop');
  assert.deepEqual(robotPosition(app), [2, 3]);
  assert.equal(app.get('board').querySelectorAll('.watered').length, 1);
  app.click('clear');
  assert.equal(app.get('queue').querySelectorAll('.executed').length, 3);
  assert.equal(app.get('run').disabled, true);
  app.click('predict-mode'); app.click('program-mode');
  assert.deepEqual(robotPosition(app), [2, 3]);
  assert.equal(app.get('board').querySelectorAll('.watered').length, 1);
  app.click('solution'); app.click('run'); await app.advance(6000);
  assert.match(app.get('status').textContent, /8 pași/);
});

test('repetiția greșită se desface și se repară fără repetarea pașilor făcuți', async t => {
  const app = setup({ progress: '{"version":3,"completed":5}' }); t.after(app.close);
  app.add(['R', 'R']); app.click('make-repeat'); app.click('run'); await app.advance(3000);
  assert.match(app.get('status').textContent, /poarta este închisă.*Desfă în comenzi/);
  assert.deepEqual(robotPosition(app), [3, 3]);
  app.get('queue').querySelector('.repeat-edit').click();
  assert.equal(app.get('queue').querySelectorAll('.executed').length, 3);
  app.click('clear'); app.click('solution'); app.click('run'); await app.advance(10000);
  assert.equal(app.get('completion').hidden, false);
  assert.equal(app.get('board').querySelectorAll('.watered').length, 3);
});

test('limitele numără pașii repetați, iar WebMCP validează acțiunile și păstrează istoricul', async t => {
  const app = setup({ progress: '{"version":3,"completed":5}' }); t.after(app.close);
  assert.throws(() => app.tool().execute({ commands: ['A'] }), /indisponibilă/);
  assert.throws(() => app.tool().execute({ commands: Array(6).fill({ repeat: 3, commands: ['R', 'W'] }) }), /cel mult 32/);
  const path = [{ repeat: 3, commands: ['R', 'W'] }, 'R', 'U'];
  assert.equal(app.tool().execute({ commands: path }).prediction, 'won');
  app.click('run'); await app.advance(1050); app.click('stop');
  assert.throws(() => app.tool().execute({ commands: [{ repeat: 3, commands: ['R', 'R'] }] }), /Pașii deja executați/);
  assert.equal(app.tool().execute({ commands: path }).executed, 2);
  path[0].commands[1] = 'L'; // The tool must not retain a mutable caller reference.
  app.click('run'); await app.advance(6000);
  assert.match(app.get('status').textContent, /8 pași/);
  app.click('restart'); app.click('clear'); app.add(Array(30).fill('R'));
  app.click('make-repeat'); assert.equal(app.get('make-repeat').disabled, true);
  assert.match(app.get('command-count').textContent, /30 \/ 32/);
  app.get('repeat-count').value = '2'; app.get('repeat-count').dispatchEvent(new app.w.Event('change')); app.click('make-repeat');
  assert.match(app.get('command-count').textContent, /32 \/ 32/);
  assert.equal(app.get('water').disabled, true);
});

const recipeProgram = () => [{ call: 'water-row' }, 'L', 'L', 'U', 'U', 'U', { call: 'water-row' }, 'R', 'R'];

test('rețeta se folosește la A și la B, din butoane, fără a reseta florile', async t => {
  const app = setup({ progress: '{"version":3,"completed":6}' }); t.after(app.close);
  assert.equal(app.get('game-title').textContent, 'Rețeta lui Robo');
  assert.equal(app.get('recipe-editor').hidden, false);
  assert.equal(app.get('repeat-editor').hidden, true);
  assert.equal(app.get('recipe-definition').children.length, 4);
  assert.equal(app.get('board').querySelectorAll('.row-start').length, 2);
  app.click('call-recipe'); app.click('run'); await app.advance(3000);
  assert.deepEqual(robotPosition(app), [2, 4]);
  assert.equal(app.get('board').querySelectorAll('.watered').length, 2);
  assert.match(app.get('status').textContent, /Rândul A este udat/);
  app.add(['L', 'L', 'U', 'U', 'U']); app.click('run'); await app.advance(4000);
  assert.deepEqual(robotPosition(app), [0, 1]);
  app.click('call-recipe'); app.add(['R', 'R']);
  assert.equal(app.get('queue').querySelectorAll('.recipe-call').length, 2);
  app.click('run'); await app.advance(5000);
  assert.match(app.get('status').textContent, /15 pași/);
  assert.equal(app.get('board').querySelectorAll('.watered').length, 4);
  assert.equal(app.get('board').querySelectorAll('.gate-open').length, 1);
  assert.deepEqual(JSON.parse(app.w.localStorage.getItem(progressKey)), { version: 3, completed: 7 });
  app.w.print = () => {}; app.click('print-game');
  assert.equal(app.get('print-area').querySelectorAll('.row-start').length, 2);
  assert.match(app.get('print-area').textContent, /Udă un rând = → 💧 → 💧/);
  assert.match(app.get('print-area').textContent, /Am udat 4 flori/);
  app.click('restart');
  assert.equal(app.get('board').querySelectorAll('.watered').length, 0);
  assert.equal(app.get('queue').querySelectorAll('.recipe-call').length, 2);
});

test('reluarea în fiecare pas al celor două apeluri nu repetă acțiunile sau victoria', async () => {
  for (const step of [0, 1, 2, 3, 4, 8, 9, 10, 11, 12, 14]) for (const offset of [-1, 0, 50]) {
    const app = setup({ progress: '{"version":3,"completed":6}' });
    try {
      app.tool().execute({ commands: recipeProgram() }); app.click('run');
      await app.advance(300 + step * 720 + offset); app.click('stop');
      const pos = robotPosition(app), flowers = app.get('board').querySelectorAll('.watered').length;
      await app.advance(20000);
      assert.deepEqual(robotPosition(app), pos);
      assert.equal(app.get('board').querySelectorAll('.watered').length, flowers);
      app.click('run'); await app.advance(15000);
      assert.match(app.get('status').textContent, /15 pași/);
      assert.equal(app.get('board').querySelectorAll('.watered').length, 4);
      assert.equal(app.sounds.filter(s => s === 'win').length, 1);
    } finally { app.close(); }
  }
});

test('anticiparea, desfacerea și ștergerea păstrează apelul executat parțial', async t => {
  const app = setup({ progress: '{"version":3,"completed":6}' }); t.after(app.close);
  app.tool().execute({ commands: recipeProgram() }); app.click('run'); await app.advance(1050); app.click('stop');
  assert.match(app.get('repeat-progress').textContent, /Udă un rând · Pasul 3 din 4/);
  app.click('predict-mode'); assert.equal(app.get('recipe-editor').hidden, true);
  app.click('program-mode');
  assert.deepEqual(robotPosition(app), [1, 4]);
  assert.equal(app.get('board').querySelectorAll('.watered').length, 1);
  app.get('queue').querySelector('.recipe-call .repeat-edit').click();
  assert.equal(app.get('queue').querySelectorAll('.recipe-call').length, 1);
  assert.equal(app.get('queue').querySelectorAll('.executed').length, 2);
  assert.equal(app.get('recipe-definition').children.length, 4);
  app.click('clear'); app.click('solution'); app.click('run'); await app.advance(15000);
  assert.match(app.get('status').textContent, /15 pași/);
});

test('ștergerea directă a restului unui apel păstrează efectele, iar apelul greșit se poate repara', async t => {
  const app = setup({ progress: '{"version":3,"completed":6}' }); t.after(app.close);
  app.click('call-recipe'); app.click('run'); await app.advance(1750); app.click('stop');
  app.click('clear');
  assert.deepEqual(robotPosition(app), [2, 4]);
  assert.equal(app.get('queue').querySelectorAll('.executed').length, 3);
  assert.equal(app.get('board').querySelectorAll('.watered').length, 1);
  app.click('solution'); app.click('run'); await app.advance(15000);
  assert.match(app.get('status').textContent, /15 pași/);
  app.click('restart'); app.click('clear');
  app.add(['U']); app.click('call-recipe'); app.click('run'); await app.advance(3000);
  assert.match(app.get('status').textContent, /Udă.*floare.*Desfă în comenzi/);
  assert.deepEqual(robotPosition(app), [1, 3]);
  app.click('clear'); app.click('solution'); app.click('run'); await app.advance(15000);
  assert.equal(app.get('completion').hidden, false);
});

test('WebMCP protejează apelurile, iar limita numără comenzile din rețetă', async t => {
  const app = setup({ progress: '{"version":3,"completed":6}' }); t.after(app.close);
  assert.throws(() => app.tool().execute({ commands: [{ call: 'unknown' }] }), /Rețetă necunoscută/);
  assert.throws(() => app.tool().execute({ commands: [{ repeat: 3, commands: ['R', 'W'] }] }), /indisponibilă/);
  const staged = recipeProgram(); app.tool().execute({ commands: staged }); staged[0].call = 'changed';
  app.click('run'); await app.advance(1050); app.click('stop');
  assert.throws(() => app.tool().execute({ commands: ['R', 'L', { call: 'water-row' }] }), /Pașii deja executați/);
  app.tool().execute({ commands: recipeProgram() }); app.click('run'); await app.advance(15000);
  assert.match(app.get('status').textContent, /15 pași/);
  app.click('restart'); app.click('clear');
  for (let i = 0; i < 9; i++) app.click('call-recipe');
  assert.equal(app.get('queue').querySelectorAll('.recipe-call').length, 8);
  assert.equal(app.get('call-recipe').disabled, true);
  assert.match(app.get('command-count').textContent, /32 \/ 32/);
  app.click('clear'); app.get('mission-trail').children[0].click();
  assert.equal(app.get('recipe-editor').hidden, true);
  assert.throws(() => app.tool().execute({ commands: [{ call: 'water-row' }] }), /Rețetă necunoscută/);
});


test('parcursul de bază introduce 1, 2, apoi 3 comenzi, Detectivul și un singur copac', async t => {
  const app = setup({ guided: true }); t.after(app.close);
  assert.equal(app.get('lesson-stage').value, 'one');
  for (const d of ['U','D','L','R']) assert.equal(app.document.querySelector('[data-dir="'+d+'"]').hidden, false);
  app.tool().execute({ commands: ['U'] }); app.click('clear');
  app.add(['R']); app.click('run'); await app.advance(1000);
  assert.match(app.get('status').textContent, /1 pas\./);
  assert.equal(JSON.parse(app.w.localStorage.getItem(progressKey)).completed, 0);
  const checkpoint = app.w.localStorage.getItem('robo-explorator-lessons-v1');
  const resumed = setup({ guided: true, progress: app.w.localStorage.getItem(progressKey), checkpoint }); t.after(resumed.close);
  assert.equal(resumed.get('lesson-stage').value, 'two');
  app.click('next-mission'); app.add(['R','R']); app.click('run'); await app.advance(2000);
  assert.equal(JSON.parse(app.w.localStorage.getItem(progressKey)).completed, 1);
  app.click('next-mission');
  assert.equal(app.get('lesson-stage').value, 'bend');
  app.add(['R','U']); app.click('run'); await app.advance(2000); app.click('next-mission');
  assert.equal(app.get('lesson-stage').value, 'three');
  app.add(['R','U','U']); app.click('run'); await app.advance(3000);
  assert.equal(app.get('practice-detective').hidden, false);
  assert.equal(JSON.parse(app.w.localStorage.getItem(progressKey)).completed, 2);
  app.click('practice-detective'); chooseRepair(app,'R'); app.click('run'); await app.advance(2000);
  assert.equal(app.get('detective-continue').hidden, false);
  app.click('detective-continue');
  assert.equal(app.get('board').children.length, 9);
  assert.equal(app.get('board').querySelectorAll('.tree').length, 1);
  app.add(['U','R','R']); app.click('run'); await app.advance(3000);
  assert.equal(JSON.parse(app.w.localStorage.getItem(progressKey)).completed, 3);
  assert.match(app.get('completion-message').textContent, /încheia aici/);
  assert.match(app.get('next-mission').textContent, /Opțional/);
  app.click('next-mission');
  assert.equal(app.get('lesson-stage').value,'four-directions');
  app.add(E.solve(C.get(2,'four-directions')));app.click('run');await app.advance(12000);
  app.click('next-mission');assert.equal(app.get('lesson-stage').value,'spiral');
  app.add(E.solve(C.get(2,'spiral')));app.click('run');await app.advance(14000);
  assert.equal(app.get('completion').hidden,false);
  app.click('next-mission');assert.equal(app.get('teacher-lesson').value,'3');
});

test('cheia și maneta scurte se opresc pentru observație, apoi continuă fără resetare', async t => {
  for (const index of [3,4]) {
    const app = setup({ guided:true, progress:JSON.stringify({version:3,completed:index}) }); t.after(app.close);
    app.add(E.solve(C.get(index))); app.click('run'); await app.advance(10000);
    assert.equal(app.get('completion').hidden,true);
    assert.equal(app.get('run').disabled,false);
    assert.equal(app.get('queue').querySelectorAll('.executed').length,2);
    assert.deepEqual(robotPosition(app),index===3?[1,1]:[0,1]);
    app.click('predict-mode'); app.click('program-mode'); app.click('run'); await app.advance(2000);
    assert.equal(app.get('completion').hidden,false);
    assert.match(app.get('status').textContent,/4 pași/);
    assert.equal(app.sounds.filter(s=>s==='win').length,1);
  }
});

test('grădina introduce udarea, modelul manual și apoi repetiția pe aceeași hartă', async t => {
  const app=setup({guided:true,progress:'{"version":3,"completed":5}'}); t.after(app.close);
  assert.equal(app.get('lesson-stage').value,'water');
  assert.equal(app.get('repeat-editor').hidden,true); assert.equal(app.get('decision-editor').hidden,true);
  assert.equal(app.get('board').querySelectorAll('.flower-tile').length,1);
  app.add(['R','W','R']);app.click('run');await app.advance(3000);app.click('next-mission');
  assert.equal(app.get('lesson-stage').value,'pattern'); assert.equal(app.get('repeat-editor').hidden,true);
  assert.throws(()=>app.tool().execute({commands:[{repeat:2,commands:['R','W']}]}),/indisponibilă/);
  const board=app.get('board').getAttribute('aria-label');
  app.add(['R','W','R','W','R','U']);app.click('run');await app.advance(5000);
  assert.match(app.get('next-mission').textContent,/Opțional/);app.click('next-mission');
  assert.equal(app.get('lesson-stage').value,'repeat');assert.equal(app.get('board').getAttribute('aria-label'),board);
  assert.equal(app.get('repeat-editor').hidden,false);assert.equal(app.get('repeat-count').value,'2');
  gardenLoop(app,2);app.add(['R','U']);app.click('run');await app.advance(5000);app.click('next-mission');
  assert.equal(app.get('lesson-stage').value,'decision');
  assert.equal(app.get('decision-editor').hidden,false);assert.equal(app.get('repeat-editor').hidden,true);
  assert.equal(app.get('water').hidden,true);
  assert.throws(()=>app.tool().execute({commands:[{repeat:2,commands:['R','F']}]}),/indisponibilă/);
});

test('întrebarea așteaptă adultul fără termen și oprirea nu aplică răspunsuri întârziate', async t => {
  const app=setup({guided:true,progress:'{"version":3,"completed":5}'});t.after(app.close);app.stage('decision');
  app.add(['F','R','F','R']);app.click('run');await app.advance(60000);
  assert.deepEqual(robotPosition(app),[0,2]);assert.equal(app.get('check-decision').hidden,false);
  assert.equal(app.get('board').querySelectorAll('.watered').length,0);
  app.click('check-decision');await app.advance(1720);
  assert.deepEqual(robotPosition(app),[1,2]);assert.equal(app.get('check-decision').hidden,false);
  assert.equal(app.get('board').querySelectorAll('.watered').length,0);
  app.click('stop');app.click('check-decision');await app.advance(60000);
  assert.equal(app.get('board').querySelectorAll('.watered').length,0);
  app.click('run');app.click('check-decision');app.click('check-decision');await app.advance(2500);
  assert.equal(app.get('board').querySelectorAll('.watered').length,1);
  assert.match(app.get('status').textContent,/4 pași/);
  assert.deepEqual([...app.get('queue').querySelectorAll('.decision-result')].map(x=>x.textContent.slice(2,4)),['NU','DA']);
  assert.equal(app.sounds.filter(s=>s==='win').length,1);
});

test('schimbarea activității sau lecției nu lasă o întrebare să ude în fundal', async t => {
  for(const activity of ['predict-mode','detective-mode']) {
    const app=setup({guided:true,progress:'{"version":3,"completed":5}'});t.after(app.close);app.stage('decision');
    app.add(['R','F']);app.click('run');await app.advance(720);app.click(activity);await app.advance(60000);
    assert.equal(app.get('check-decision').hidden,true);app.click('program-mode');
    assert.deepEqual(robotPosition(app),[1,2]);assert.equal(app.get('board').querySelectorAll('.watered').length,0);
    app.click('run');app.click('check-decision');await app.advance(1000);
    assert.equal(app.get('board').querySelectorAll('.watered').length,1);
  }
  const app=setup({guided:true,progress:'{"version":3,"completed":5}'});t.after(app.close);app.stage('decision');
  app.add(['R','F']);app.click('run');await app.advance(720);
  app.get('mission-trail').children[0].click();app.click('check-decision');await app.advance(60000);
  assert.equal(app.get('lesson-stage').value,'one');assert.equal(app.get('check-decision').hidden,true);
  assert.deepEqual(robotPosition(app),[0,2]);assert.equal(app.get('queue').children.length,0);
  assert.equal(app.get('board').querySelectorAll('.watered').length,0);
});

test('repetiția combinată așteaptă adultul la fiecare DA/NU și păstrează răspunsurile', async t => {
  const app=setup({guided:true,progress:'{"version":3,"completed":5}'});t.after(app.close);app.stage('combine');
  stageDecision(app);app.click('run');
  for(const count of [1,1,2]) {
    await app.advance(720);assert.equal(app.get('check-decision').hidden,false);
    await app.advance(30000);app.click('check-decision');await app.advance(1000);
    assert.equal(app.get('board').querySelectorAll('.watered').length,count);
  }
  await app.advance(1500);
  assert.match(app.get('status').textContent,/8 pași/);
  assert.deepEqual([...app.get('queue').querySelectorAll('.repeat-decision-result')].map(n=>n.textContent.slice(0,2)),['DA','NU','DA']);
  assert.equal(app.get('completion').hidden,false);
});

test('anticiparea începe cu două săgeți și trei rămân o alegere pe harta simplă', async t => {
  const app=setup({guided:true,progress:'{"version":3,"completed":6}'});t.after(app.close);
  app.click('predict-mode');assert.equal(app.get('board').children.length,9);assert.equal(app.get('queue').children.length,2);
  assert.equal(app.get('board').querySelectorAll('.tree').length,0);
  assert.equal(app.get('board').querySelectorAll('.goal').length,0);
  assert.equal(app.get('goal-legend').hidden,true);
  assert.doesNotMatch(app.get('board').getAttribute('aria-label'),/Destinație/);
  app.get('prediction-count').value='3';app.get('prediction-count').dispatchEvent(new app.w.Event('change'));
  assert.equal(app.get('queue').children.length,3);assert.match(app.get('prediction-title').textContent,/3 săgeți/);
  app.click('program-mode');assert.equal(app.get('lesson-stage').value,'one-row');
});

test('rețeta începe cu o folosire, iar fișele și povestea urmează etapele simple', async t => {
  const app=setup({guided:true,progress:'{"version":3,"completed":6}'});t.after(app.close);
  app.click('call-recipe');app.add(['U']);app.click('run');await app.advance(4500);
  assert.match(app.get('status').textContent,/5 pași/);app.click('next-mission');
  assert.equal(app.get('lesson-stage').value,'two-rows');assert.equal(app.get('board').children.length,25);
  app.document.querySelector('[data-view="story"]').click();app.get('story-dots').children[4].click();
  assert.equal(app.get('scene-visual').querySelectorAll('.tile').length,9);
  assert.equal(app.get('scene-visual').querySelectorAll('.tree').length,1);
  app.get('story-dots').children[5].click();app.click('scene-action');
  assert.equal(app.get('sheet-preview').querySelectorAll('.sheet-queue>span').length,2);
  app.document.querySelector('[data-view="game"]').click();app.stage('one-row');
  app.w.print=()=>{};app.click('print-game');
  assert.equal(app.get('print-area').querySelectorAll('.sheet-queue>span').length,5);
  assert.doesNotMatch(app.get('print-area').textContent,/poartă|două locuri/);
});

test('grădina 5×5 refolosește rețeta pe trei rânduri și continuă fără resetare', async t => {
  const app=setup({guided:true,progress:'{"version":3,"completed":6}'});t.after(app.close);
  app.click('call-recipe');app.add(['U']);app.click('run');await app.advance(4500);app.click('next-mission');
  assert.equal(app.get('board').children.length,25);
  assert.equal(app.get('board').querySelectorAll('.flower-tile').length,6);
  app.click('call-recipe');app.click('run');await app.advance(4000);
  assert.match(app.get('status').textContent,/Rândul A este udat.*la B/);
  assert.equal(app.get('board').querySelectorAll('.watered').length,2);
  app.add(['L','L','U','U']);app.click('call-recipe');app.click('run');await app.advance(4100);app.click('stop');
  const pos=robotPosition(app),watered=app.get('board').querySelectorAll('.watered').length;
  await app.advance(10000);assert.deepEqual(robotPosition(app),pos);
  assert.equal(app.get('board').querySelectorAll('.watered').length,watered);
  app.click('run');await app.advance(5000);
  assert.equal(app.get('board').querySelectorAll('.watered').length,4);
  assert.equal(app.get('board').querySelectorAll('.gate-open').length,0);
  assert.match(app.get('status').textContent,/Rândul B este udat.*la C/);
  app.add(['L','L','U','U']);app.click('call-recipe');app.add(['R','R']);app.click('run');await app.advance(9000);
  assert.equal(app.get('board').querySelectorAll('.watered').length,6);
  assert.equal(app.get('board').querySelectorAll('.gate-open').length,1);
  assert.deepEqual(robotPosition(app),[4,0]);assert.match(app.get('status').textContent,/22 pași/);
  assert.equal(app.sounds.filter(s=>s==='win').length,2);
  app.w.print=()=>{};app.click('print-game');
  assert.equal(app.get('print-area').querySelectorAll('.sheet-queue>span').length,22);
  app.click('restart');assert.equal(app.get('board').querySelectorAll('.watered').length,0);
  assert.deepEqual(robotPosition(app),[0,4]);
});

test('comoara anticipării se dezvăluie la destinație după verificare', async t => {
  const app=setup({guided:true});t.after(app.close);app.click('predict-mode');
  let p=robotPosition(app);
  for(const card of app.get('queue').children){
    const d=Object.keys(E.DIR).find(d=>card.textContent.includes(E.ARROW[d]));
    p=[p[0]+E.DIR[d][0],p[1]+E.DIR[d][1]];
  }
  assert.equal(app.get('board').querySelectorAll('.goal').length,0);
  app.get('board').children[p[1]*3+p[0]].click();app.click('run');await app.advance(3000);
  assert.deepEqual(robotPosition(app),p);
  assert.equal(app.get('board').querySelectorAll('.goal .chest-icon').length,1);
  assert.equal(app.get('goal-legend').hidden,false);
});

test('meniul adultului oprește întrebarea fără udare și revenirea păstrează programul', async t => {
  const app=setup({guided:true,progress:'{"version":3,"completed":5}'});t.after(app.close);app.stage('decision');
  app.add(['R','F','R']);app.click('run');await app.advance(720);
  const menu=app.get('adult-menu');menu.open=true;menu.dispatchEvent(new app.w.Event('toggle'));
  assert.equal(app.get('stop').hidden,true);assert.equal(app.get('check-decision').hidden,true);
  assert.equal(app.get('decision-feedback').hidden,true);assert.equal(app.get('status').hidden,false);
  await app.advance(60000);
  assert.deepEqual(robotPosition(app),[1,2]);assert.equal(app.get('board').querySelectorAll('.watered').length,0);
  const count=app.get('queue').children.length;
  menu.querySelector('summary').dispatchEvent(new app.w.KeyboardEvent('keydown',{key:'ArrowRight',bubbles:true}));
  assert.equal(app.get('queue').children.length,count);
  menu.querySelector('summary').dispatchEvent(new app.w.KeyboardEvent('keydown',{key:'Escape',bubbles:true}));
  assert.equal(menu.open,false);assert.equal(app.document.activeElement,menu.querySelector('summary'));
  app.click('run');app.click('check-decision');await app.advance(2000);
  assert.match(app.get('status').textContent,/3 pași/);assert.equal(app.get('board').querySelectorAll('.watered').length,1);
});

test('săgeata rămâne evidențiată pe durata mutării, iar oprirea păstrează pasul făcut', async t => {
  const app=setup({guided:true});t.after(app.close);app.stage('two');app.add(['R','R']);
  app.get('run').focus();app.click('run');
  assert.equal(app.document.activeElement,app.get('stop'));
  await app.advance(300);
  assert.deepEqual(robotPosition(app),[1,2]);
  assert.equal(app.get('queue').querySelector('.active').getAttribute('aria-label'),'Pas executat 1: dreapta');
  app.click('stop');
  assert.equal(app.get('queue').querySelectorAll('.active').length,0);
  assert.equal(app.get('queue').querySelectorAll('.executed').length,1);
  assert.equal(app.document.activeElement,app.get('run'));
  app.click('run');await app.advance(1000);
  assert.match(app.get('status').textContent,/2 pași/);
  assert.equal(app.document.activeElement,app.get('restart'));
});
