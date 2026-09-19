import { motion } from 'framer-motion';

const mascotFaces = {
  idle: '😊',
  happy: '😄',
  thinking: '🤔',
  celebrating: '🎉',
  oops: '😅',
  wink: '😉',
  cool: '😎',
  love: '🥰',
};

export default function Mascot({ mood = 'idle', message = '', size = 60 }) {
  const face = mascotFaces[mood] || mascotFaces.idle;
  
  return (
    <motion.div
      className="mascot-container"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      <motion.div
        className="mascot-body"
        style={{ width: size, height: size, fontSize: size * 0.6 }}
        animate={
          mood === 'celebrating'
            ? { y: [0, -10, 0], rotate: [0, -5, 5, 0] }
            : mood === 'thinking'
            ? { rotate: [0, -3, 3, 0] }
            : { y: [0, -3, 0] }
        }
        transition={{
          duration: mood === 'celebrating' ? 0.6 : 2,
          repeat: Infinity,
          repeatType: 'loop',
          ease: 'easeInOut',
        }}
      >
        {face}
      </motion.div>
      {message && (
        <motion.div
          className="mascot-speech"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
        >
          {message}
        </motion.div>
      )}
    </motion.div>
  );
}
