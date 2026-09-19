const STORAGE_PREFIX = 'aptify_';

function getKey(key) {
  return STORAGE_PREFIX + key;
}

export function loadState(key, defaultValue) {
  try {
    const raw = localStorage.getItem(getKey(key));
    if (raw === null) return defaultValue;
    return JSON.parse(raw);
  } catch {
    return defaultValue;
  }
}

export function saveState(key, value) {
  try {
    localStorage.setItem(getKey(key), JSON.stringify(value));
  } catch {
    // silently fail
  }
}

export function removeState(key) {
  try {
    localStorage.removeItem(getKey(key));
  } catch {
    // silently fail
  }
}

export function clearAllState() {
  const keys = Object.keys(localStorage).filter(k => k.startsWith(STORAGE_PREFIX));
  keys.forEach(k => localStorage.removeItem(k));
}

export function getProgress() {
  return {
    xp: loadState('xp', 0),
    level: loadState('level', 1),
    achievements: loadState('achievements', []),
    numbersExplored: loadState('numbersExplored', []),
    treesCompleted: loadState('treesCompleted', 0),
    quizzesTaken: loadState('quizzesTaken', 0),
    bestStreak: loadState('bestStreak', 0),
    totalCorrect: loadState('totalCorrect', 0),
    totalAnswered: loadState('totalAnswered', 0),
    settings: loadState('settings', {
      soundEffects: true,
      animations: true,
      reducedMotion: false,
    }),
  };
}

export function saveProgress(progress) {
  Object.entries(progress).forEach(([key, value]) => {
    saveState(key, value);
  });
}

export function addXP(amount) {
  const xp = loadState('xp', 0) + amount;
  const level = getLevelFromXP(xp);
  saveState('xp', xp);
  saveState('level', level);
  return { xp, level };
}

export function getLevelFromXP(xp) {
  const levels = [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500];
  let level = 1;
  for (let i = 1; i < levels.length; i++) {
    if (xp >= levels[i]) level = i + 1;
    else break;
  }
  return Math.min(level, levels.length);
}

export function getXPForLevel(level) {
  const levels = [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500];
  return levels[Math.min(level - 1, levels.length - 1)] || 0;
}

export function getXPToNextLevel(xp, level) {
  const levels = [0, 100, 300, 600, 1000, 1500, 2100, 2800, 3600, 4500];
  const currentLevelXP = levels[Math.min(level - 1, levels.length - 1)] || 0;
  const nextLevelXP = levels[Math.min(level, levels.length - 1)] || levels[levels.length - 1];
  return { current: xp - currentLevelXP, needed: nextLevelXP - currentLevelXP };
}

export function getLevelTitle(level) {
  const titles = [
    'Number Rookie',
    'Number Explorer',
    'Number Adventurer',
    'Prime Detective',
    'Number Master',
    'Number Wizard',
    'Math Genius',
    'Number Champion',
    'Grand Number Sage',
    'Infinity Keeper',
  ];
  return titles[Math.min(level - 1, titles.length - 1)];
}
