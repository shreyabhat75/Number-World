import { useState } from 'react';
import { motion } from 'framer-motion';
import Quiz from '../components/Quiz/Quiz';

const DIFFICULTIES = [
  { level: 1, label: '🌱 Beginner', description: 'Numbers 1-10' },
  { level: 2, label: '⭐ Explorer', description: 'Numbers 1-25' },
  { level: 3, label: '🚀 Challenger', description: 'Numbers 1-50' },
  { level: 4, label: '👑 Number Master', description: 'Numbers up to 1000' },
];

export default function QuizPage({ onCorrect, onWrong }) {
  const [difficulty, setDifficulty] = useState(1);
  const [quizKey, setQuizKey] = useState(0);

  return (
    <div className="quiz-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>🎮 Number Detective</h1>
        <p>Test your number skills and become a math champion!</p>
      </motion.div>

      <div className="difficulty-selector">
        {DIFFICULTIES.map(d => (
          <motion.button
            key={d.level}
            className={`difficulty-btn ${difficulty === d.level ? 'active' : ''}`}
            onClick={() => { setDifficulty(d.level); setQuizKey(prev => prev + 1); }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="diff-label">{d.label}</span>
            <span className="diff-desc">{d.description}</span>
          </motion.button>
        ))}
      </div>

      <Quiz
        key={quizKey}
        difficulty={difficulty}
        onCorrect={onCorrect}
        onWrong={onWrong}
      />
    </div>
  );
}
