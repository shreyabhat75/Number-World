import { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { generateDailyChallenge } from '../../utils/quizUtils';

export default function DailyChallenge({ onComplete, dailyCompleted }) {
  const challenge = useMemo(() => generateDailyChallenge(), []);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const isCorrect = selected === challenge.correctAnswer;

  if (dailyCompleted) {
    return (
      <div className="daily-challenge completed">
        <div className="daily-challenge-header">
          <span className="daily-icon">🎯</span>
          <h3>Daily Challenge</h3>
        </div>
        <p className="daily-completed-text">✅ You've completed today's challenge!</p>
        <p className="daily-come-back">Come back tomorrow for a new challenge.</p>
      </div>
    );
  }

  return (
    <div className="daily-challenge">
      <div className="daily-challenge-header">
        <span className="daily-icon">🎯</span>
        <h3>Daily Challenge</h3>
      </div>
      <p className="daily-question">{challenge.question}</p>
      <div className="daily-options">
        {challenge.options.map((option, i) => (
          <motion.button
            key={i}
            className={`daily-option ${selected === option ? (isCorrect ? 'correct' : 'wrong') : ''} ${
              showResult && option === challenge.correctAnswer ? 'correct' : ''
            }`}
            onClick={() => {
              setSelected(option);
              setShowResult(true);
              if (option === challenge.correctAnswer) {
                onComplete?.();
              }
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            disabled={showResult && isCorrect}
          >
            {option}
          </motion.button>
        ))}
      </div>
      {showResult && (
        <motion.div
          className={`daily-result ${isCorrect ? 'correct' : 'wrong'}`}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {isCorrect ? '🎉 Correct! +25 XP' : 'Not quite! The answer was ' + challenge.correctAnswer}
        </motion.div>
      )}
    </div>
  );
}
