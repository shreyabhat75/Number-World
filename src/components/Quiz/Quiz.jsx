import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateQuestion } from '../../utils/quizUtils';

export default function Quiz({ difficulty = 1, onComplete, onCorrect, onWrong }) {
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [total, setTotal] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    setQuestion(generateQuestion(difficulty));
  }, [difficulty]);

  const isMulti = question?.multi;

  const toggleOption = (option) => {
    if (submitted) return;
    if (isMulti) {
      setSelected(prev =>
        prev.includes(option) ? prev.filter(o => o !== option) : [...prev, option]
      );
    } else {
      setSelected([option]);
    }
  };

  const handleSubmit = () => {
    if (selected.length === 0 || submitted) return;
    setSubmitted(true);
    setTotal(prev => prev + 1);

    let isCorrect = false;
    if (isMulti) {
      const correctSet = new Set(question.correctAnswers);
      const selectedSet = new Set(selected);
      isCorrect = correctSet.size === selectedSet.size && [...correctSet].every(c => selectedSet.has(c));
    } else {
      isCorrect = selected[0] === question.correctAnswer;
    }

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
    setSelected([]);
    setSubmitted(false);
    setQuestion(generateQuestion(difficulty));
  };

  if (!question) return null;

  const getOptionState = (option) => {
    if (!submitted) {
      return selected.includes(option) ? 'selected' : '';
    }
    if (isMulti) {
      const isCorrect = question.correctAnswers.includes(option);
      const wasSelected = selected.includes(option);
      if (isCorrect && wasSelected) return 'correct';
      if (isCorrect && !wasSelected) return 'missed';
      if (!isCorrect && wasSelected) return 'wrong';
      return 'dimmed';
    }
    if (option === question.correctAnswer) return 'correct';
    if (option === selected[0]) return 'wrong';
    return 'dimmed';
  };

  const isFullyCorrect = submitted && (() => {
    if (isMulti) {
      const correctSet = new Set(question.correctAnswers);
      const selectedSet = new Set(selected);
      return correctSet.size === selectedSet.size && [...correctSet].every(c => selectedSet.has(c));
    }
    return selected[0] === question.correctAnswer;
  })();

  return (
    <div className="quiz-container">
      <div className="quiz-header">
        <div className="quiz-score">
          <span className="score-label">Score</span>
          <motion.span className="score-value" key={score} animate={{ scale: [1.2, 1] }}>
            {score}
          </motion.span>
        </div>
        <div className="quiz-streak">
          {streak > 0 && (
            <motion.span className="streak-badge" initial={{ scale: 0 }} animate={{ scale: 1 }}>
              🔥 {streak}
            </motion.span>
          )}
        </div>
        <div className="quiz-count">{total} questions</div>
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

          {isMulti && !submitted && (
            <p className="quiz-hint">Select all that apply, then press Submit</p>
          )}

          <div className={`quiz-options ${isMulti ? 'multi' : ''}`}>
            {question.options.map((option, i) => {
              const state = getOptionState(option);
              return (
                <motion.button
                  key={`${option}-${i}`}
                  className={`quiz-option ${state}`}
                  onClick={() => toggleOption(option)}
                  whileHover={!submitted ? { scale: 1.05, y: -2 } : {}}
                  whileTap={!submitted ? { scale: 0.95 } : {}}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  disabled={submitted}
                >
                  {isMulti && !submitted && (
                    <span className="checkbox">{selected.includes(option) ? '☑' : '☐'}</span>
                  )}
                  {isMulti && submitted && question.correctAnswers.includes(option) && (
                    <span className="checkbox">☑</span>
                  )}
                  {option}
                </motion.button>
              );
            })}
          </div>

          {isMulti && !submitted && selected.length > 0 && (
            <motion.button
              className="submit-btn"
              onClick={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit ({selected.length} selected)
            </motion.button>
          )}

          {!isMulti && !submitted && selected.length > 0 && (
            <motion.button
              className="submit-btn"
              onClick={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Submit
            </motion.button>
          )}

          <AnimatePresence>
            {submitted && (
              <motion.div
                className={`quiz-result ${isFullyCorrect ? 'correct' : 'wrong'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {isFullyCorrect ? (
                  <>
                    <span className="result-emoji">🎉</span>
                    <span>Correct! +10 XP</span>
                  </>
                ) : (
                  <>
                    <span className="result-emoji">🤔</span>
                    <span>
                      {isMulti
                        ? `Not quite! The correct answers are: ${question.correctAnswers.join(', ')}`
                        : `Not quite! The answer is ${question.correctAnswer}.`}
                      {' '}Try the next one!
                    </span>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {submitted && (
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
