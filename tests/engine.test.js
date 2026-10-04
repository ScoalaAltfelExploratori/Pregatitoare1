const { test } = require('node:test');
const assert = require('node:assert/strict');
const E = require('../game-engine.js');

test('decizia verifică locul curent, sare udarea pe gol și nu dublează florile', () => {
  const m = E.mission(5, { scattered: true }), initial = E.initialWorld();
  const no = E.step(m, [2, 3], 'F', false, initial);
  assert.equal(no.ok, true); assert.equal(no.decision.matched, false);
  assert.deepEqual(no.position, [2, 3]); assert.deepEqual(no.world.watered, []);
  const yes = E.step(m, [1, 3], 'F', false, initial);
  assert.equal(yes.decision.matched, true); assert.equal(yes.wateredFlower, true);
  assert.deepEqual(yes.position, [1, 3]); assert.deepEqual(yes.world.watered, ['1,3']);
  assert.deepEqual(initial.watered, []);
  const again = E.step(m, [1, 3], 'F', false, yes.world);
  assert.equal(again.decision.matched, true); assert.equal(again.decision.alreadyWatered, true);
  assert.equal(again.wateredFlower, false); assert.deepEqual(again.world.watered, ['1,3']);
  const program = [{ repeat: 3, commands: ['R', 'F'] }, 'R', 'U'];
  assert.equal(E.evaluate(m, program).outcome, 'won');
  assert.equal(E.evaluate(m, program).index, 7);
  assert.equal(E.evaluate(m, ['R', 'R', 'R', 'R']).outcome, 'gate');
  assert.deepEqual(E.solve(m, { position: [2, 3], world: yes.world }), ['R', 'W', 'R', 'U']);
  assert.equal(E.step(E.mission(5), [1, 3], 'F').reason, 'command');
});

test('decizia este un pas indivizibil inclusiv în repetiție', () => {
  assert.equal(E.expand(['R', 'F', 'R', 'F']).length, 4);
  assert.deepEqual(E.executedPrefix(['R', 'F', 'R', 'F'], 2), ['R', 'F']);
  assert.equal(E.expand(Array(32).fill('F')).length, 32);
  assert.throws(() => E.expand(Array(33).fill('F')), /cel mult 32/);
  const loop = [{ repeat: 3, commands: ['R', 'F'] }];
  assert.deepEqual(E.expand(loop).map(s => [s.command, s.iteration]), [['R', 0], ['F', 0], ['R', 1], ['F', 1], ['R', 2], ['F', 2]]);
  assert.deepEqual(E.executedPrefix(loop, 4), ['R', 'F', 'R', 'F']);
  assert.deepEqual(E.executedPrefix(loop, 6), loop);
  assert.throws(() => E.expand([{ repeat: 3, commands: ['R', loop[0]] }]), /Comandă necunoscută/);
});

test('florile răsfirate sunt o variantă izolată a aceleiași grădini', () => {
  const rows = E.mission(5), scattered = E.mission(5, { scattered: true });
  assert.equal(scattered.id, rows.id);
  assert.deepEqual(scattered.start, rows.start);
  assert.deepEqual(scattered.gate, rows.gate);
  assert.deepEqual(scattered.flowers, ['1,3', '3,3']);
  scattered.flowers.pop(); scattered.actions.pop();
  assert.deepEqual(E.mission(5).flowers, ['1,3', '2,3', '3,3']);
  assert.deepEqual(E.mission(5).actions, ['W']);
  assert.equal(E.mission(5, { scattered: true }).actions.includes('F'), true);
  assert.equal(E.readProgress('{"version":3,"completed":8}'), 7);
  assert.equal(E.readProgress('{"version":3,"completed":9}'), 0);
});

test('detectivul are trei cazuri scurte, fiecare reparabil cu o singură săgeată', () => {
  assert.equal(E.detectiveCount, 3);
  for (let i = 0; i < E.detectiveCount; i++) {
    const m = E.detectiveCase(i), d = m.detective;
    assert.equal(m.size, 3);
    assert.equal(d.commands.length, i + 2);
    assert.equal(d.choices.length, 2);
    assert.notEqual(E.evaluate(m, d.commands).outcome, 'won');
    const fixes = d.choices.filter(choice => {
      const repaired = [...d.commands]; repaired[d.repairIndex] = choice;
      const result = E.evaluate(m, repaired);
      return result.outcome === 'won' && result.index === repaired.length - 1;
    });
    assert.equal(fixes.length, 1);
    m.start[0] = 99; d.commands[0] = 'D'; d.choices.pop();
    assert.deepEqual(E.detectiveCase(i).start, [0, 2]);
    assert.equal(E.detectiveCase(i).detective.choices.length, 2);
  }
  assert.throws(() => E.detectiveCase(3), /Caz necunoscut/);
});

test('șapte misiuni: trasee, cheie, acțiuni, repetiție, rețetă și decizie', () => {
  const lengths = [];
  assert.equal(E.missionCount, 7);
  for (let i = 0; i < E.missionCount; i++) {
    const map = E.mission(i), solution = E.solve(map);
    assert.equal(map.size, [3, 3, 4, 5, 5, 5, 5][i]);
    assert.equal(E.evaluate(map, solution).outcome, 'won');
    lengths.push(solution.length);
    assert.ok(!map.obstacles.includes(E.key(map.start)));
    assert.ok(!map.obstacles.includes(E.key(map.goal)));
  }
  assert.deepEqual(lengths, [2, 3, 4, 12, 9, 8, 15]);
  assert.deepEqual(E.mission(2).obstacles, ['1,3', '0,1']);
  const changed = E.mission(0);
  changed.start[0] = 99;
  changed.obstacles.push('0,0');
  assert.deepEqual(E.mission(0).start, [0, 2]);
  assert.deepEqual(E.mission(0).obstacles, []);
  const finale = E.mission(3);
  finale.keyPosition[0] = 99;
  assert.deepEqual(E.mission(3).keyPosition, [4, 0]);
});

test('cufărul blochează accesul fără cheie și se deschide numai după colectare', () => {
  const map = E.mission(3);
  const direct = E.evaluate(map, ['R', 'R', 'R', 'R']);
  assert.equal(direct.outcome, 'locked');
  assert.equal(direct.index, 3);
  assert.equal(direct.hasKey, false);
  assert.deepEqual(direct.position, [3, 4]);
  const path = E.solve(map);
  const reachedKey = E.evaluate(map, path.slice(0, 8));
  assert.equal(reachedKey.outcome, 'incomplete');
  assert.equal(reachedKey.hasKey, true);
  assert.deepEqual(reachedKey.position, map.keyPosition);
  const won = E.evaluate(map, [...path, 'R']);
  assert.equal(won.outcome, 'won');
  assert.equal(won.index, 11);
  assert.equal(won.hasKey, true);
  assert.deepEqual(won.position, map.goal);
  // Every evaluation is a new run, with no key carried over from the previous one.
  assert.equal(E.evaluate(map, ['R', 'R', 'R', 'R']).outcome, 'locked');
});

test('căutarea drumului permite revenirea prin aceleași căsuțe după colectarea cheii', () => {
  const map = { size: 3, start: [0, 2], keyPosition: [0, 0], goal: [2, 2], obstacles: ['1,0', '1,1'] };
  const solution = E.solve(map), result = E.evaluate(map, solution);
  assert.equal(solution.length, 6);
  assert.equal(result.outcome, 'won');
  assert.equal(result.trace.filter(p => E.same(p, map.start)).length, 2);
  assert.equal(E.solve({ ...map, obstacles: [...map.obstacles, '0,1'] }), null);
  const pickup = E.step(map, [0, 1], 'U');
  assert.equal(pickup.collectedKey, true);
  assert.equal(E.step(map, [0, 1], 'U', true).collectedKey, false);
});

test('soluția poate începe din poziția curentă și păstrează cheia primită', () => {
  const map = E.mission(3), state = { position: [4, 0], hasKey: true };
  assert.deepEqual(E.solve(map, state), ['D', 'D', 'D', 'D']);
  assert.deepEqual(state, { position: [4, 0], hasKey: true });
  const approach = { position: [3, 4], hasKey: false };
  const remaining = E.solve(map, approach);
  assert.ok(remaining.length > 1);
  let position = approach.position, hasKey = approach.hasKey, result;
  for (const command of remaining) {
    result = E.step(map, position, command, hasKey);
    assert.equal(result.ok, true);
    position = result.position; hasKey = result.hasKey;
  }
  assert.equal(result.won, true);
  assert.equal(hasKey, true);
});

test('3.000 de hărți generate au drum executabil și cel mult 16 pași', () => {
  for (const size of [3, 4, 5]) for (let seed = 0; seed < 1000; seed++) {
    const map = E.generate(seed, { size }), solution = E.solve(map);
    assert.equal(map.size, size);
    assert.ok(solution && solution.length <= 16);
    assert.equal(E.evaluate(map, solution).outcome, 'won');
    assert.equal(new Set(map.obstacles).size, map.obstacles.length);
    assert.ok(!map.obstacles.includes(E.key(map.start)));
    assert.ok(!map.obstacles.includes(E.key(map.goal)));
    assert.ok(!E.same(map.start, map.goal));
    assert.deepEqual(map, E.generate(seed, { size }));
  }
});

test('1.500 de runde de anticipare au exact trei pași legali', () => {
  for (const size of [3, 4, 5]) for (let seed = 0; seed < 500; seed++) {
    const round = E.predictionRound(seed, size), result = E.evaluate(round.map, round.commands);
    assert.equal(round.commands.length, 3);
    assert.equal(result.trace.length, 4);
    assert.ok(['won', 'incomplete'].includes(result.outcome));
    assert.ok(!round.map.obstacles.includes(E.key(result.position)));
  }
});

test('evaluarea se oprește la copac, margine sau destinație', () => {
  const bug = E.evaluate(E.firstMap(), ['R', 'U', 'U']);
  assert.equal(bug.outcome, 'tree');
  assert.equal(bug.index, 2);
  assert.deepEqual(bug.position, [1, 3]);
  assert.equal(E.evaluate(E.mission(0), ['D']).outcome, 'edge');
  const reached = E.evaluate(E.mission(0), ['R', 'R', 'D']);
  assert.equal(reached.outcome, 'won');
  assert.equal(reached.index, 1);
});

test('progresul invalid sau din altă versiune nu blochează aventura', () => {
  for (let completed = 0; completed <= E.missionCount; completed++) {
    assert.equal(E.readProgress(JSON.stringify({ version: 3, completed })), completed);
  }
  for (const raw of [null, '', 'broken', 'null', '[]', '{}', '{"version":4,"completed":3}', '{"version":2,"completed":5}', '{"version":1,"completed":99}', '{"version":1,"completed":-1}', '{"version":1,"completed":2.5}', '{"version":1,"completed":"3"}']) {
    assert.equal(E.readProgress(raw), 0);
  }
});

test('migrarea păstrează primele trei misiuni, fără să marcheze finala nouă ca terminată', () => {
  for (let completed = 0; completed <= 6; completed++) {
    assert.equal(E.readProgress(JSON.stringify({ version: 1, completed })), Math.min(completed, 3));
  }
});

test('salvările cu patru misiuni păstrează progresul și deblochează podul, nu grădina', () => {
  for (let completed = 0; completed <= 4; completed++) assert.equal(E.readProgress(JSON.stringify({ version: 2, completed })), completed);
  assert.equal(E.readProgress('{"version":2,"completed":5}'), 0);
  assert.equal(E.mission(E.readProgress('{"version":2,"completed":4}')).id, 'lever-bridge');
});

test('maneta trebuie activată explicit în locul corect; râul permite doar podul deschis', () => {
  const map = E.mission(4), original = JSON.stringify(map), world = E.initialWorld();
  assert.equal(E.step(map, map.start, 'A', false, world).reason, 'lever');
  assert.equal(E.step(map, [1, 3], 'R', false, world).reason, 'bridge');
  const atLever = E.evaluate(map, ['U', 'U']);
  assert.equal(atLever.world.bridgeOpen, false);
  const activated = E.step(map, map.lever, 'A', false, world);
  assert.equal(activated.world.bridgeOpen, true);
  assert.deepEqual(activated.position, map.lever);
  assert.equal(E.step(map, [1, 3], 'R', false, activated.world).ok, true);
  assert.equal(E.step(map, [1, 2], 'R', false, activated.world).reason, 'water');
  assert.equal(E.step(map, map.lever, 'A', false, activated.world).reason, 'activated');
  assert.equal(world.bridgeOpen, false);
  assert.equal(JSON.stringify(map), original);
  const remaining = E.solve(map, { position: map.lever, world: activated.world });
  assert.ok(!remaining.includes('A'));
  const nextMap = E.mission(4); nextMap.water.pop(); nextMap.lever[0] = 9;
  assert.equal(E.mission(4).water.length, 5);
  assert.deepEqual(E.mission(4).lever, [0, 2]);
});

test('florile se udă o singură dată; poarta cere toate florile, iar repetiția rezolvă grădina', () => {
  const map = E.mission(5), world = E.initialWorld();
  assert.equal(E.step(map, map.start, 'W', false, world).reason, 'flower');
  assert.equal(E.step(map, [3, 3], 'R', false, world).reason, 'gate');
  assert.equal(E.evaluate(map, ['R', 'R', 'R', 'R']).outcome, 'gate');
  const first = E.evaluate(map, ['R', 'W']);
  assert.deepEqual(first.world.watered, ['1,3']);
  assert.equal(E.step(map, [1, 3], 'W', false, first.world).reason, 'watered');
  assert.deepEqual(world.watered, []);
  const loop = [{ repeat: 3, commands: ['R', 'W'] }];
  const garden = E.evaluate(map, loop);
  assert.equal(garden.outcome, 'incomplete');
  assert.equal(E.gateOpen(map, garden.world), true);
  assert.deepEqual(garden.world.watered, map.flowers);
  assert.deepEqual(E.solve(map, { position: garden.position, world: garden.world }), ['R', 'U']);
  assert.equal(E.evaluate(map, [...loop, 'R', 'U']).outcome, 'won');
  assert.equal(E.evaluate(E.mission(0), ['W']).outcome, 'command');
});

test('repetițiile au cursor pentru fiecare pas și limite pentru număr, corp și total', () => {
  const program = ['U', { repeat: 3, commands: ['R', 'W'] }, 'D'], before = JSON.stringify(program);
  const steps = E.expand(program);
  assert.deepEqual(steps.map(s => s.command), ['U', 'R', 'W', 'R', 'W', 'R', 'W', 'D']);
  assert.deepEqual(steps.slice(1, 7).map(s => [s.iteration, s.bodyIndex]), [[0, 0], [0, 1], [1, 0], [1, 1], [2, 0], [2, 1]]);
  assert.deepEqual(E.executedPrefix(program, 4), ['U', 'R', 'W', 'R']);
  assert.deepEqual(E.executedPrefix(program, 7), program.slice(0, 2));
  const copied = E.cloneProgram(program); copied[1].commands[0] = 'L';
  assert.equal(JSON.stringify(program), before);
  for (const bad of [null, [null], [{ repeat: 0, commands: ['R', 'W'] }], [{ repeat: 1000000, commands: ['R', 'W'] }], [{ repeat: 3, commands: [] }], [{ repeat: 3, commands: [{ repeat: 2, commands: ['R', 'W'] }, 'W'] }], ['X']]) assert.throws(() => E.expand(bad));
  assert.throws(() => E.expand(Array(6).fill({ repeat: 3, commands: ['R', 'W'] })), /cel mult 32/);
});

test('o singură definiție este apelată din două poziții diferite și udă ambele rânduri', () => {
  const m = E.mission(6), call = { call: 'water-row' };
  assert.equal(E.mission(E.readProgress('{"version":3,"completed":6}')).id, 'robo-recipe');
  const program = [call, 'L', 'L', 'U', 'U', 'U', call, 'R', 'R'];
  const plan = E.expand(program, 32, m.recipes);
  assert.equal(plan.length, 15);
  assert.deepEqual(plan.filter(s => s.call).map(s => s.bodyIndex), [0, 1, 2, 3, 0, 1, 2, 3]);
  const first = E.evaluate(m, [call]);
  assert.deepEqual(first.position, [2, 4]);
  assert.deepEqual(first.world.watered, ['1,4', '2,4']);
  assert.equal(E.gateOpen(m, first.world), false);
  const done = E.evaluate(m, program);
  assert.equal(done.outcome, 'won');
  assert.deepEqual(done.world.watered, m.flowers);
  assert.deepEqual(done.position, m.goal);
  assert.equal(E.evaluate(m, [call, call]).outcome, 'flower');
  const copy = E.cloneProgram(program); copy[0].call = 'changed';
  assert.equal(program[0].call, 'water-row');
  assert.deepEqual(E.executedPrefix(program, 2, m.recipes), ['R', 'W']);
  assert.deepEqual(E.executedPrefix(program, 4, m.recipes), [call]);
  assert.deepEqual(E.executedPrefix(program, 11, m.recipes), [call, 'L', 'L', 'U', 'U', 'U', 'R', 'W']);
  m.recipes['water-row'].commands[0] = 'L';
  assert.equal(E.mission(6).recipes['water-row'].commands[0], 'R');
});

test('apelurile validează numele, definiția simplă și limita după desfășurare', () => {
  const m = E.mission(6), call = { call: 'water-row' };
  for (const bad of [{ call: 'missing' }, { call: 'toString' }, { call: 'water-row', repeat: 3 }, { call: ['water-row'] }]) assert.throws(() => E.expand([bad], 32, m.recipes), /Rețetă necunoscută/);
  assert.throws(() => E.expand([call]), /Rețetă necunoscută/);
  assert.throws(() => E.expand([{ repeat: 2, commands: [call, 'R'] }], 32, m.recipes), /Comandă necunoscută/);
  assert.throws(() => E.expand([call], 32, { 'water-row': { commands: [call] } }), /Comandă necunoscută/);
  assert.throws(() => E.expand(Array(9).fill(call), 32, m.recipes), /cel mult 32/);
  assert.equal(E.expand(Array(8).fill(call), 32, m.recipes).length, 32);
});
