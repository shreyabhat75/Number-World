import { motion } from 'framer-motion';
import Mascot from '../components/Mascot/Mascot';
import DailyChallenge from '../components/DailyChallenge/DailyChallenge';
import XPBar from '../components/XPBar/XPBar';

const TOPIC_CARDS = [
  { key: 'natural', icon: '🌱', title: 'Natural Numbers', desc: 'Counting starts here!', color: '#4ade80', gradient: 'linear-gradient(135deg, #4ade80, #22c55e)' },
  { key: 'even-odd', icon: '🍎', title: 'Even & Odd', desc: 'Can you pair them all?', color: '#60a5fa', gradient: 'linear-gradient(135deg, #60a5fa, #3b82f6)' },
  { key: 'integers', icon: '➕➖', title: 'Integers', desc: 'Explore both sides of zero!', color: '#a78bfa', gradient: 'linear-gradient(135deg, #a78bfa, #8b5cf6)' },
  { key: 'primes', icon: '⭐', title: 'Prime Numbers', desc: 'Meet the special numbers!', color: '#fbbf24', gradient: 'linear-gradient(135deg, #fbbf24, #f59e0b)' },
  { key: 'fractions', icon: '🍕', title: 'Fractions & Decimals', desc: 'Slice, convert, compare!', color: '#fb7185', gradient: 'linear-gradient(135deg, #fb7185, #e11d48)' },
  { key: 'factor-tree', icon: '🌳', title: 'Prime Factor Tree', desc: 'Grow numbers into primes!', color: '#34d399', gradient: 'linear-gradient(135deg, #34d399, #10b981)' },
  { key: 'quiz', icon: '🎮', title: 'Quiz Time', desc: 'Test your number skills!', color: '#f472b6', gradient: 'linear-gradient(135deg, #f472b6, #ec4899)' },
];

const FLOATING_NUMBERS = ['1', '2', '3', '5', '7', '8', '11', '13', '17', '42', '100'];

export default function Home({ onNavigate, xp, level, onDailyComplete, dailyCompleted }) {
  return (
    <div className="home-page">
      <div className="floating-background">
        {FLOATING_NUMBERS.map((num, i) => (
          <motion.span
            key={i}
            className="floating-number"
            style={{
              left: `${10 + (i * 8) % 80}%`,
              top: `${5 + (i * 13) % 60}%`,
            }}
            animate={{
              y: [0, -15, 0],
              opacity: [0.15, 0.25, 0.15],
              rotate: [0, 10, -10, 0],
            }}
            transition={{
              duration: 4 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.3,
            }}
          >
            {num}
          </motion.span>
        ))}
      </div>

      <section className="hero-section">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.h1
            className="hero-title"
            animate={{ scale: [1, 1.02, 1] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            🌈 NUMBER WORLD
          </motion.h1>
          <p className="hero-subtitle">Explore numbers. Discover patterns. Become a Number Detective!</p>
          
          <div className="hero-mascot-row">
            <Mascot mood="happy" message="Hi, Young Explorer! 👋" size={70} />
          </div>
          
          <div className="hero-xp-section">
            <XPBar xp={xp} level={level} />
          </div>
        </motion.div>
      </section>

      <section className="daily-section">
        <DailyChallenge onComplete={onDailyComplete} dailyCompleted={dailyCompleted} />
      </section>

      <section className="topics-section">
        <h2 className="section-title">Let's discover the magic of numbers together!</h2>
        <div className="topics-grid">
          {TOPIC_CARDS.map((card, i) => (
            <motion.button
              key={card.key}
              className="topic-card"
              style={{ borderTopColor: card.color }}
              onClick={() => onNavigate(card.key)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
              whileHover={{ y: -8, scale: 1.02, boxShadow: `0 12px 30px ${card.color}33` }}
              whileTap={{ scale: 0.97 }}
            >
              <motion.span
                className="topic-icon"
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              >
                {card.icon}
              </motion.span>
              <h3 className="topic-title">{card.title}</h3>
              <p className="topic-desc">{card.desc}</p>
              <span className="topic-arrow">→</span>
            </motion.button>
          ))}
        </div>
      </section>
    </div>
  );
}
