import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateQuestion } from '../../utils/quizUtils';

export default function Quiz({ difficulty = 1, onComplete, onCorrect, onWrong }) {
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [total, setTotal] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    setQuestion(generateQuestion(difficulty));
  }, [difficulty]);

  const handleSelect = (option) => {
    if (showResult) return;
    setSelected(option);
    setShowResult(true);
    setTotal(prev => prev + 1);
    
    const isCorrect = String(option) === String(question.correctAnswer);
    if (isCorrect) {
      setScore(prev => prev + 10);
      setStreak(prev => prev + 1);
      setCorrectCount(prev => prev + 1);
      onCorrect?.();
    } else {
      setStreak(0);
      onWrong?.();
    }
  };

  const nextQuestion = () => {
    setSelected(null);
    setShowResult(false);
    setQuestion(generateQuestion(difficulty));
  };

  if (!question) return null;

  const isCorrect = String(selected) === String(question.correctAnswer);

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="quiz-score">
          <span className="score-label">Score</span>
          <motion.span
            className="score-value"
            key={score}
            animate={{ scale: [1.2, 1] }}
          >
            {score}
          </motion.span>
        </div>
        <div className="quiz-streak">
          {streak > 0 && (
            <motion.span
              className="streak-badge"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              🔥 {streak}
            </motion.span>
          )}
        </div>
        <div className="quiz-count">
          {total} questions
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={question.question}
          className="quiz-question-area"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
        >
          <h3 className="quiz-question">{question.question}</h3>
          
          {question.n !== undefined && (
            <div className="quiz-number-display">
              <motion.span
                className="quiz-big-number"
                key={question.n}
                initial={{ scale: 0.5, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring' }}
              >
                {question.n}
              </motion.span>
            </div>
          )}

          <div className="quiz-options">
            {question.options.map((option, i) => (
              <motion.button
                key={`${option}-${i}`}
                className={`quiz-option ${showResult ? (
                  String(option) === String(question.correctAnswer) ? 'correct' : 
                  String(option) === String(selected) ? 'wrong' : 'dimmed'
                ) : ''}`}
                onClick={() => handleSelect(option)}
                whileHover={!showResult ? { scale: 1.05, y: -2 } : {}}
                whileTap={!showResult ? { scale: 0.95 } : {}}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                disabled={showResult}
              >
                {option}
              </motion.button>
            ))}
          </div>

          <AnimatePresence>
            {showResult && (
              <motion.div
                className={`quiz-result ${isCorrect ? 'correct' : 'wrong'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {isCorrect ? (
                  <>
                    <span className="result-emoji">🎉</span>
                    <span>Correct! +10 XP</span>
                  </>
                ) : (
                  <>
                    <span className="result-emoji">🤔</span>
                    <span>Not quite! The answer is {question.correctAnswer}. Try the next one!</span>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {showResult && (
            <motion.button
              className="next-btn"
              onClick={nextQuestion}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Next Question →
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>

      {total >= 5 && (
        <div className="quiz-summary">
          <p>Accuracy: {total > 0 ? Math.round((correctCount / total) * 100) : 0}%</p>
        </div>
      )}
    </div>
  );
}
