import { motion } from 'framer-motion';
import { getXPToNextLevel, getLevelTitle } from '../../utils/storage';

export default function XPBar({ xp, level }) {
  const { current, needed } = getXPToNextLevel(xp, level);
  const percent = needed > 0 ? Math.min((current / needed) * 100, 100) : 100;
  const title = getLevelTitle(level);
  
  return (
    <div className="xp-bar-container">
      <div className="xp-bar-header">
        <span className="xp-level-badge">Level {level}</span>
        <span className="xp-level-title">{title}</span>
      </div>
      <div className="xp-bar-track">
        <motion.div
          className="xp-bar-fill"
          initial={{ width: 0 }}
          animate={{ width: `${percent}%` }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        />
      </div>
      <div className="xp-bar-text">
        {current} / {needed} XP
      </div>
    </div>
  );
}
