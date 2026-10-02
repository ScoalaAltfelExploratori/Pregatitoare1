const { test } = require('node:test');
const assert = require('node:assert/strict');
const vm = require('node:vm');
const fs = require('node:fs');
const path = require('node:path');
const source = fs.readFileSync(path.join(__dirname, '../robo-audio.js'), 'utf8');

test('audio pornește doar la cerere, iar oprirea anulează sunetele programate', async () => {
  let contexts = 0, stopped = 0, started = 0;
  class AudioContext {
    constructor() { contexts++; this.currentTime = 0; this.state = 'suspended'; this.destination = {}; }
    async resume() { this.state = 'running'; }
    createGain() { return { gain: { value: 0, setValueAtTime() {}, linearRampToValueAtTime() {}, exponentialRampToValueAtTime() {} }, connect() {}, disconnect() {} }; }
    createOscillator() { return { frequency: { value: 0 }, connect() {}, disconnect() {}, start() { started++; }, stop(at) { if (at === undefined) stopped++; } }; }
  }
  const window = { AudioContext };
  vm.runInNewContext(source, { window });
  window.RoboAudio.play('win');
  assert.equal(contexts, 0);
  assert.equal(await window.RoboAudio.toggle(), true);
  assert.equal(contexts, 1);
  window.RoboAudio.play('win');
  assert.equal(started, 6);
  assert.equal(await window.RoboAudio.toggle(), false);
  assert.equal(stopped, 6);
  window.RoboAudio.play('step');
  assert.equal(started, 6);
});

test('lipsa suportului audio lasă feedbackul sonor inactiv', async () => {
  const window = {};
  vm.runInNewContext(source, { window });
  assert.doesNotThrow(() => window.RoboAudio.play('step'));
  await assert.rejects(window.RoboAudio.toggle(), /Audio indisponibil/);
  assert.doesNotThrow(() => window.RoboAudio.stop());
});
