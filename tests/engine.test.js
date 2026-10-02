const { test } = require('node:test');
const assert = require('node:assert/strict');
const E = require('../game-engine.js');

test('patru misiuni distincte culminează cu un traseu de 12 pași prin cheie', () => {
  const lengths = [];
  assert.equal(E.missionCount, 4);
  for (let i = 0; i < E.missionCount; i++) {
    const map = E.mission(i), solution = E.solve(map);
    assert.equal(map.size, [3, 3, 4, 5][i]);
    assert.equal(E.evaluate(map, solution).outcome, 'won');
    lengths.push(solution.length);
    assert.ok(!map.obstacles.includes(E.key(map.start)));
    assert.ok(!map.obstacles.includes(E.key(map.goal)));
  }
  assert.deepEqual(lengths, [2, 3, 4, 12]);
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
    assert.equal(E.readProgress(JSON.stringify({ version: 2, completed })), completed);
  }
  for (const raw of [null, '', 'broken', 'null', '[]', '{}', '{"version":3,"completed":3}', '{"version":2,"completed":5}', '{"version":1,"completed":99}', '{"version":1,"completed":-1}', '{"version":1,"completed":2.5}', '{"version":1,"completed":"3"}']) {
    assert.equal(E.readProgress(raw), 0);
  }
});

test('migrarea păstrează primele trei misiuni, fără să marcheze finala nouă ca terminată', () => {
  for (let completed = 0; completed <= 6; completed++) {
    assert.equal(E.readProgress(JSON.stringify({ version: 1, completed })), Math.min(completed, 3));
  }
});
