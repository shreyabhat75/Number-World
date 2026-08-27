import { motion } from 'framer-motion';

export default function AchievementCard({ achievement, unlocked, delay = 0 }) {
  return (
    <motion.div
      className={`achievement-card ${unlocked ? 'unlocked' : 'locked'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.3 }}
      whileHover={unlocked ? { scale: 1.03, y: -4 } : {}}
    >
      <div className="achievement-icon">
        {unlocked ? achievement.icon : '🔒'}
      </div>
      <div className="achievement-info">
        <h4 className="achievement-title">{achievement.title}</h4>
        <p className="achievement-desc">{achievement.description}</p>
        {unlocked && (
          <span className="achievement-xp">+{achievement.xp} XP</span>
        )}
      </div>
      {unlocked && (
        <motion.div
          className="achievement-glow"
          animate={{ opacity: [0.3, 0.6, 0.3] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.div>
  );
}
