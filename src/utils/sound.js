let audioCtx = null;

function getContext() {
  if (!audioCtx) {
    const Ctx = window.AudioContext || window.webkitAudioContext;
    if (!Ctx) return null;
    audioCtx = new Ctx();
  }
  return audioCtx;
}

function beep(frequency, duration, delay = 0, type = 'sine', volume = 0.15) {
  const ctx = getContext();
  if (!ctx) return;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = type;
  osc.frequency.value = frequency;
  gain.gain.value = volume;
  osc.connect(gain);
  gain.connect(ctx.destination);
  const startTime = ctx.currentTime + delay;
  osc.start(startTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  osc.stop(startTime + duration);
}

export function playCorrectSound() {
  beep(523.25, 0.12, 0, 'sine');
  beep(783.99, 0.18, 0.1, 'sine');
}

export function playWrongSound() {
  beep(220, 0.25, 0, 'sawtooth', 0.1);
}

export function playAchievementSound() {
  beep(523.25, 0.1, 0);
  beep(659.25, 0.1, 0.1);
  beep(783.99, 0.2, 0.2);
}
