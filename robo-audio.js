(function (root) {
  'use strict';
  let context, master, enabled = false;
  const voices = new Set();

  function stop() {
    for (const voice of voices) {
      try { voice.stop(); } catch {}
    }
    voices.clear();
  }

  async function toggle() {
    if (enabled) {
      enabled = false;
      stop();
      return false;
    }
    const AudioContext = root.AudioContext || root.webkitAudioContext;
    if (!AudioContext) throw new Error('Audio indisponibil');
    if (!context) {
      context = new AudioContext();
      master = context.createGain();
      master.gain.value = 0.09;
      master.connect(context.destination);
    }
    await context.resume();
    if (context.state !== 'running') throw new Error('Audio indisponibil');
    enabled = true;
    play('start');
    return true;
  }

  function play(kind) {
    if (!enabled || !context || context.state !== 'running') return;
    const notes = {
      start: [392, 523], step: [440], win: [523, 659, 784, 1047],
      retry: [330, 294], select: [587]
    }[kind] || [440];
    notes.forEach((frequency, i) => {
      const voice = context.createOscillator(), volume = context.createGain();
      const at = context.currentTime + i * 0.13;
      voice.type = 'sine';
      voice.frequency.value = frequency;
      volume.gain.setValueAtTime(0, at);
      volume.gain.linearRampToValueAtTime(1, at + 0.015);
      volume.gain.exponentialRampToValueAtTime(0.001, at + 0.16);
      voice.connect(volume);
      volume.connect(master);
      voices.add(voice);
      voice.onended = () => { voices.delete(voice); voice.disconnect(); volume.disconnect(); };
      voice.start(at);
      voice.stop(at + 0.18);
    });
  }

  root.RoboAudio = { toggle, play, stop };
})(window);
