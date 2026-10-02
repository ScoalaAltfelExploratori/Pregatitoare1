const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const { JSDOM } = require('jsdom');
const E = require('../game-engine.js');
const root = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const progressKey = 'robo-explorator-progress-v1';

function setup({ progress, blockedStorage = false } = {}) {
  const dom = new JSDOM(html, { url: 'http://robo.test/', runScripts: 'outside-only', pretendToBeVisual: true });
  const w = dom.window, document = w.document, timers = new Map(), sounds = [];
  let now = 0, timerId = 0, registeredTool;
  w.setTimeout = (callback, delay = 0) => { const id = ++timerId; timers.set(id, { callback, at: now + delay }); return id; };
  w.clearTimeout = id => timers.delete(id);
  w.RoboAudio = { play: kind => sounds.push(kind), stop() {}, async toggle() { return true; } };
  document.modelContext = { registerTool(tool) { registeredTool = tool; } };
  if (progress !== undefined) w.localStorage.setItem(progressKey, progress);
  if (blockedStorage) Object.defineProperty(w, 'localStorage', { get() { throw new Error('Storage denied'); } });
  w.eval(fs.readFileSync(path.join(root, 'game-engine.js'), 'utf8'));
  w.eval(fs.readFileSync(path.join(root, 'app.js'), 'utf8'));
  const get = id => document.getElementById(id);
  const click = id => get(id).click();
  const add = program => { for (const dir of program) document.querySelector('[data-dir="' + dir + '"]').click(); };
  async function advance(ms) {
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
  return { w, document, get, click, add, advance, sounds, tool: () => registeredTool, close: () => dom.window.close() };
}

test('aventura completă deblochează patru misiuni, salvează și permite rejucarea', async t => {
  const app = setup(); t.after(app.close);
  assert.equal(app.get('board').children.length, 9);
  assert.equal(app.get('mission-trail').querySelectorAll('button:enabled').length, 1);
  for (let i = 0; i < E.missionCount; i++) {
    app.add(E.solve(E.mission(i))); app.click('run');
    assert.equal(app.get('run').disabled, true);
    await app.advance(10000);
    assert.match(app.get('status').textContent, /Am ajuns la destinație|Am deschis comoara cu cheia/);
    assert.equal(app.get('completion').hidden, false);
    assert.equal(JSON.parse(app.w.localStorage.getItem(progressKey)).completed, i + 1);
    assert.equal(app.get('mission-trail').querySelectorAll('button:enabled').length, Math.min(i + 2, E.missionCount));
    if (i < E.missionCount - 1) app.click('next-mission');
  }
  assert.equal(app.get('next-mission').hidden, true);
  app.get('mission-trail').children[0].click();
  app.add(['R', 'R', 'D']); app.click('run'); await app.advance(5000);
  assert.match(app.get('status').textContent, /2 pași/);
  assert.equal(JSON.parse(app.w.localStorage.getItem(progressKey)).completed, 4);
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
  assert.equal(privateMode.get('game-title').textContent, 'Floarea de pe deal');
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
  assert.equal(app.get('game-title').textContent, 'Prima baterie');
  assert.equal(app.get('step-count').textContent, 'La start');
  assert.equal(app.get('queue').children.length, 0);
  assert.equal(app.get('completion').hidden, true);
});

test('anticiparea cere alegere, verifică răspunsuri și restaurează programul', async t => {
  const app = setup(); t.after(app.close);
  app.add(['R']); app.click('predict-mode');
  assert.equal(app.get('run').disabled, true);
  assert.equal(app.get('queue').querySelectorAll('button').length, 0);
  assert.equal(app.get('queue').children.length, 3);
  assert.throws(() => app.tool().execute({ commands: ['R'] }), /Revino la Programăm/);
  const board = app.get('board'), cells = [...board.children], size = 3;
  const at = index => [index % size, Math.floor(index / size)];
  const map = { size, start: at(cells.findIndex(c => c.classList.contains('robot'))), goal: at(cells.findIndex(c => c.classList.contains('goal'))), obstacles: [] };
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
  assert.equal(app.get('game-title').textContent, 'Prima baterie');
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
  assert.match(app.get('status').textContent, /Pasul 3: un copac/);
  assert.equal(app.get('board').querySelectorAll('.bump').length, 1);
  assert.equal(app.w.localStorage.getItem(progressKey), null);
  app.click('reset-adventure'); assert.equal(app.get('reset-confirmation').hidden, false);
  app.click('cancel-reset'); assert.equal(app.get('reset-confirmation').hidden, true);
  assert.match(app.get('map-label').textContent, /Harta de început/);
  app.click('confirm-reset'); assert.equal(app.get('game-title').textContent, 'Prima baterie');
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
  assert.match(app.get('print-area').textContent, /Ia mai întâi cheia/);
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
  assert.match(app.get('adventure-progress').textContent, /^3 din 4/);
  app.click('solution'); app.click('run'); await app.advance(10000);
  assert.match(app.get('status').textContent, /Am deschis comoara cu cheia/);
  assert.equal(app.get('key-objective').classList.contains('complete'), true);
  assert.equal(app.get('chest-objective').classList.contains('complete'), true);
  assert.equal(app.get('completion').hidden, false);
  assert.deepEqual(JSON.parse(app.w.localStorage.getItem(progressKey)), { version: 2, completed: 4 });
  const resumed = setup({ progress: app.w.localStorage.getItem(progressKey) }); t.after(resumed.close);
  assert.match(resumed.get('adventure-progress').textContent, /^4 din 4/);
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
  assert.equal(app.get('game-title').textContent, 'Prima baterie');
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
  assert.match(app.get('execution-note').textContent, /8 pași făcuți · 4 săgeți noi/);
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
      assert.deepEqual(JSON.parse(app.w.localStorage.getItem(progressKey)), { version: 2, completed: 4 });
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

test('detectivul păstrează pașii buni când este șters pasul blocat de copac', async t => {
  const app = setup(); t.after(app.close);
  app.click('bug-map'); app.click('run'); await app.advance(3000);
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
