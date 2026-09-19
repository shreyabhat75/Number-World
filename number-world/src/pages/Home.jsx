import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import Mascot from '../components/Mascot/Mascot';
import DailyChallenge from '../components/DailyChallenge/DailyChallenge';
import XPBar from '../components/XPBar/XPBar';
import { getAllTopics } from '../curriculum';
import { dailyQuestionPool } from '../data/questionBank';

const QUICK_ACTIONS = [
  { icon: '📖', label: 'Learn', desc: 'Explore concepts', route: 'natural' },
  { icon: '✏️', label: 'Practice', desc: 'Solve questions', route: 'primes' },
];

function getDailyQuestion() {
  const today = new Date();
  const dayOfYear = Math.floor((today - new Date(today.getFullYear(), 0, 0)) / 86400000);
  return dailyQuestionPool[dayOfYear % dailyQuestionPool.length];
}

function QuestionOfTheDay({ onNavigate }) {
  const dailyQ = useMemo(() => getDailyQuestion(), []);
  const [answered, setAnswered] = useState(false);
  const [selected, setSelected] = useState(null);

  if (!dailyQ) return null;

  const handleSubmit = () => {
    if (selected === null) return;
    setAnswered(true);
  };

  const isCorrect = selected === dailyQ.answer;

  return (
    <motion.div
      className="home-card home-daily-question"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 }}
    >
      <div className="home-card-header">
        <span className="home-card-icon">💡</span>
        <h3>Question of the Day</h3>
      </div>
      <p className="home-dq-question">{dailyQ.q}</p>
      <div className="home-dq-options">
        {dailyQ.options.map((opt, i) => (
          <button
            key={i}
            className={`home-dq-option ${selected === i ? 'selected' : ''} ${answered && i === dailyQ.answer ? 'correct' : ''} ${answered && selected === i && !isCorrect ? 'wrong' : ''}`}
            onClick={() => !answered && setSelected(i)}
            disabled={answered}
          >
            {opt}
          </button>
        ))}
      </div>
      {!answered ? (
        <button className="home-dq-submit" onClick={handleSubmit} disabled={selected === null}>
          Check Answer
        </button>
      ) : (
        <div className={`home-dq-result ${isCorrect ? 'correct' : 'wrong'}`}>
          {isCorrect ? '✓ Correct!' : `✗ Incorrect. ${dailyQ.explanation}`}
        </div>
      )}
      {dailyQ.topic && (
        <button className="home-dq-topic-link" onClick={() => onNavigate(dailyQ.topic)}>
          Explore this topic →
        </button>
      )}
    </motion.div>
  );
}

function ContinueLearning({ progress, onNavigate }) {
  const lastTopic = progress?.lastVisitedTopic;
  const totalCorrect = progress?.totalCorrect || 0;
  const totalAnswered = progress?.totalAnswered || 0;
  const numbersExplored = progress?.numbersExplored?.length || 0;

  if (!lastTopic && totalAnswered === 0 && numbersExplored === 0) return null;

  const allTopics = getAllTopics();
  const topic = lastTopic ? allTopics.find(t => t.route === lastTopic) : allTopics[0];

  if (!topic) return null;

  const accuracy = totalAnswered > 0 ? Math.round((totalCorrect / totalAnswered) * 100) : 0;

  return (
    <motion.div
      className="home-card home-continue"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <div className="home-card-header">
        <span className="home-card-icon">📚</span>
        <h3>Continue Learning</h3>
      </div>
      <div className="home-continue-info">
        <div className="home-continue-topic">
          <span className="home-continue-icon">{topic.icon}</span>
          <div>
            <strong>{topic.title}</strong>
            <span className="home-continue-desc">{topic.description}</span>
          </div>
        </div>
        {totalAnswered > 0 && (
          <div className="home-continue-stats">
            <div className="home-stat">
              <span className="home-stat-value">{numbersExplored}</span>
              <span className="home-stat-label">Explored</span>
            </div>
            <div className="home-stat">
              <span className="home-stat-value">{accuracy}%</span>
              <span className="home-stat-label">Accuracy</span>
            </div>
            <div className="home-stat">
              <span className="home-stat-value">{totalCorrect}</span>
              <span className="home-stat-label">Correct</span>
            </div>
          </div>
        )}
      </div>
      <button className="home-continue-btn" onClick={() => onNavigate(topic.route)}>
        Continue →
      </button>
    </motion.div>
  );
}

const TOPIC_CARDS = [
  { key: 'natural', icon: '🌱', title: 'Number Basics', desc: 'Natural numbers, whole numbers & types', color: '#4ade80' },
  { key: 'even-odd', icon: '🍎', title: 'Even & Odd', desc: 'Can you pair them all?', color: '#60a5fa' },
  { key: 'primes', icon: '⭐', title: 'Prime Numbers', desc: 'Meet the special numbers!', color: '#fbbf24' },
  { key: 'divisibility', icon: '✂️', title: 'Divisibility', desc: 'Quick tricks for 2-10', color: '#f472b6' },
  { key: 'factor-tree', icon: '🌳', title: 'Factor Tree', desc: 'Grow numbers into primes!', color: '#34d399' },
  { key: 'direction-sense', icon: '🧭', title: 'Direction Sense', desc: 'Navigate with logic!', color: '#e6b94f' },
];

const FLOATING_NUMBERS = ['1', '2', '3', '5', '7', '8', '11', '13', '17', '42', '100'];

export default function Home({ onNavigate, xp, level, onDailyComplete, dailyCompleted, progress }) {
  return (
    <div className="home-page">
      <div className="floating-background" style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, zIndex: 0, pointerEvents: 'none', overflow: 'hidden' }}>
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

      <section className="hero-section" style={{ position: 'relative', zIndex: 1 }}>
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
            🌈 APTIFY
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

      <div className="home-dashboard" style={{ position: 'relative', zIndex: 1 }}>
        <div className="home-dashboard-left">
          <QuestionOfTheDay onNavigate={onNavigate} />
          <ContinueLearning progress={progress} onNavigate={onNavigate} />
        </div>
        <div className="home-dashboard-right">
          <motion.div
            className="home-card home-quick-actions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15 }}
          >
            <div className="home-card-header">
              <span className="home-card-icon">⚡</span>
              <h3>Quick Actions</h3>
            </div>
            <div className="home-qa-grid">
              {QUICK_ACTIONS.map((action, i) => (
                <motion.button
                  key={i}
                  className="home-qa-btn"
                  onClick={() => onNavigate(action.route)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="home-qa-icon">{action.icon}</span>
                  <strong>{action.label}</strong>
                  <span className="home-qa-desc">{action.desc}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>

        </div>
      </div>

      <section className="topics-section" style={{ position: 'relative', zIndex: 1 }}>
        <h2 className="section-title">Explore Topics</h2>
        <div className="topics-grid">
          {TOPIC_CARDS.map((card, i) => (
            <motion.button
              key={card.key}
              className="topic-card"
              style={{ borderTopColor: card.color }}
              onClick={() => onNavigate(card.key)}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, type: 'spring', stiffness: 200 }}
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
