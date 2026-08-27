import { motion } from 'framer-motion';
import { ACHIEVEMENTS } from '../data/achievements';
import AchievementCard from '../components/Achievement/AchievementCard';

export default function Achievements({ unlockedAchievements }) {
  const unlockedCount = unlockedAchievements.length;
  const totalCount = ACHIEVEMENTS.length;
  const percent = Math.round((unlockedCount / totalCount) * 100);

  return (
    <div className="achievements-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>🏆 Achievements</h1>
        <p>Collect them all on your number adventure!</p>
      </motion.div>

      <div className="achievements-progress">
        <div className="achievements-progress-bar">
          <motion.div
            className="achievements-progress-fill"
            initial={{ width: 0 }}
            animate={{ width: `${percent}%` }}
            transition={{ duration: 1, ease: 'easeOut' }}
          />
        </div>
        <p className="achievements-count">
          {unlockedCount} / {totalCount} unlocked ({percent}%)
        </p>
      </div>

      <div className="achievements-grid">
        {ACHIEVEMENTS.map((achievement, i) => (
          <AchievementCard
            key={achievement.id}
            achievement={achievement}
            unlocked={unlockedAchievements.includes(achievement.id)}
            delay={i * 0.05}
          />
        ))}
      </div>
    </div>
  );
}
