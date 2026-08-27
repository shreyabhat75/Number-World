export const ACHIEVEMENTS = [
  {
    id: 'first_steps',
    title: 'First Steps',
    description: 'Explore 5 numbers',
    icon: '👣',
    requirement: { type: 'explore', count: 5 },
    xp: 50,
  },
  {
    id: 'number_explorer',
    title: 'Number Explorer',
    description: 'Explore 20 numbers',
    icon: '🔍',
    requirement: { type: 'explore', count: 20 },
    xp: 100,
  },
  {
    id: 'even_expert',
    title: 'Even Expert',
    description: 'Identify 10 even numbers',
    icon: '🟦',
    requirement: { type: 'even', count: 10 },
    xp: 75,
  },
  {
    id: 'odd_master',
    title: 'Odd Master',
    description: 'Identify 10 odd numbers',
    icon: '🟧',
    requirement: { type: 'odd', count: 10 },
    xp: 75,
  },
  {
    id: 'prime_finder',
    title: 'Prime Finder',
    description: 'Find 5 prime numbers',
    icon: '⭐',
    requirement: { type: 'prime', count: 5 },
    xp: 100,
  },
  {
    id: 'tree_builder',
    title: 'Tree Builder',
    description: 'Complete 3 prime factor trees',
    icon: '🌳',
    requirement: { type: 'trees', count: 3 },
    xp: 150,
  },
  {
    id: 'quiz_master',
    title: 'Quiz Master',
    description: 'Score 80% or higher',
    icon: '🎯',
    requirement: { type: 'quiz_score', percent: 80 },
    xp: 100,
  },
  {
    id: 'number_streak',
    title: 'Number Streak',
    description: 'Answer 5 questions correctly in a row',
    icon: '🔥',
    requirement: { type: 'streak', count: 5 },
    xp: 125,
  },
  {
    id: 'integer_explorer',
    title: 'Integer Explorer',
    description: 'Explore 5 negative numbers',
    icon: '➕➖',
    requirement: { type: 'negative', count: 5 },
    xp: 75,
  },
  {
    id: 'factor_master',
    title: 'Factor Master',
    description: 'Complete 5 prime factor trees',
    icon: '🧩',
    requirement: { type: 'trees', count: 5 },
    xp: 200,
  },
  {
    id: 'daily_warrior',
    title: 'Daily Warrior',
    description: 'Complete 3 daily challenges',
    icon: '📅',
    requirement: { type: 'daily', count: 3 },
    xp: 150,
  },
  {
    id: 'number_legend',
    title: 'Number Legend',
    description: 'Reach Level 5',
    icon: '👑',
    requirement: { type: 'level', count: 5 },
    xp: 250,
  },
  {
    id: 'divisibility_detective',
    title: 'Divisibility Detective',
    description: 'Explore 15 numbers in Divisibility Rules',
    icon: '🔢',
    requirement: { type: 'explore_div', count: 15 },
    xp: 150,
  },
];

export function checkAchievements(progress) {
  const unlocked = [...progress.achievements];
  const newlyUnlocked = [];
  
  ACHIEVEMENTS.forEach(achievement => {
    if (unlocked.includes(achievement.id)) return;
    
    const req = achievement.requirement;
    let earned = false;
    
    switch (req.type) {
      case 'explore':
        earned = (progress.numbersExplored || []).length >= req.count;
        break;
      case 'even':
        earned = (progress.numbersExplored || []).filter(n => n % 2 === 0).length >= req.count;
        break;
      case 'odd':
        earned = (progress.numbersExplored || []).filter(n => Math.abs(n) % 2 === 1).length >= req.count;
        break;
      case 'prime': {
        earned = (progress.numbersExplored || []).filter(n => {
          if (!Number.isInteger(n) || n <= 1) return false;
          if (n === 2) return true;
          if (n % 2 === 0) return false;
          for (let i = 3; i <= Math.sqrt(n); i += 2) {
            if (n % i === 0) return false;
          }
          return true;
        }).length >= req.count;
        break;
      }
      case 'trees':
        earned = (progress.treesCompleted || 0) >= req.count;
        break;
      case 'quiz_score':
        earned = progress.totalAnswered > 0 && (progress.totalCorrect / progress.totalAnswered * 100) >= req.percent;
        break;
      case 'streak':
        earned = (progress.bestStreak || 0) >= req.count;
        break;
      case 'negative':
        earned = (progress.numbersExplored || []).filter(n => n < 0).length >= req.count;
        break;
      case 'daily':
        earned = (progress.dailyChallenges || 0) >= req.count;
        break;
      case 'level':
        earned = (progress.level || 1) >= req.count;
        break;
      case 'explore_div':
        earned = (progress.numbersExplored || []).length >= req.count;
        break;
      default:
        break;
    }
    
    if (earned) {
      unlocked.push(achievement.id);
      newlyUnlocked.push(achievement);
    }
  });
  
  return { unlocked, newlyUnlocked };
}
