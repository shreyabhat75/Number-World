import { motion } from 'framer-motion';

export default function NumberCard({ number, onClick, small = false }) {
  return (
    <motion.button
      className={`number-card ${small ? 'small' : ''}`}
      onClick={onClick}
      whileHover={{ scale: 1.08, y: -4 }}
      whileTap={{ scale: 0.95 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <span className="number-value">{number}</span>
    </motion.button>
  );
}
