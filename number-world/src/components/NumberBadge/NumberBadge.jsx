import { motion } from 'framer-motion';

export default function NumberBadge({ label, icon, color, present = true, delay = 0 }) {
  return (
    <motion.div
      className={`number-badge ${present ? 'present' : 'absent'}`}
      style={{
        background: present ? color + '22' : '#f3f4f6',
        border: `2px solid ${present ? color : '#e5e7eb'}`,
        color: present ? color : '#9ca3af',
      }}
      initial={{ opacity: 0, scale: 0.5, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.3, type: 'spring', stiffness: 300 }}
    >
      <span className="badge-icon">{icon}</span>
      <span className="badge-label">{label}</span>
      {present ? (
        <span className="badge-check">✓</span>
      ) : (
        <span className="badge-x">✗</span>
      )}
    </motion.div>
  );
}
