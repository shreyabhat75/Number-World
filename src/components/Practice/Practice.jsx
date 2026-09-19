import { useState, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { loadState, saveState } from '../../utils/storage';

export default function Practice({ questions = [], topicId }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const completedKey = topicId ? `practice_done_${topicId}` : null;

  const completedSet = useMemo(() => {
    if (!completedKey) return new Set();
    const stored = loadState('completedQuestions', {});
    return new Set(stored[completedKey] || []);
  }, [completedKey]);

  const filteredQuestions = useMemo(() => {
    if (!completedSet.size) return questions;
    return questions.filter((_, index) => !completedSet.has(index));
  }, [questions, completedSet]);

  const markCompleted = useCallback((index) => {
    if (!completedKey) return;
    const stored = loadState('completedQuestions', {});
    const existing = stored[completedKey] || [];
    if (!existing.includes(index)) {
      stored[completedKey] = [...existing, index];
      saveState('completedQuestions', stored);
    }
  }, [completedKey]);

  const currentQuestion = filteredQuestions[currentIndex];
  const isFinished = currentIndex >= filteredQuestions.length;

  const handleSubmit = useCallback(() => {
    if (selectedOption === null || submitted) return;
    setSubmitted(true);
    if (selectedOption === currentQuestion.answer) {
      setScore(prev => prev + 1);
      const originalIndex = questions.indexOf(currentQuestion);
      if (originalIndex !== -1) markCompleted(originalIndex);
    }
  }, [selectedOption, submitted, currentQuestion, questions, markCompleted]);

  const handleNext = useCallback(() => {
    setSelectedOption(null);
    setSubmitted(false);
    setCurrentIndex(prev => prev + 1);
  }, []);

  const handleRestart = useCallback(() => {
    setCurrentIndex(0);
    setSelectedOption(null);
    setSubmitted(false);
    setScore(0);
  }, []);

  if (filteredQuestions.length === 0) {
    return (
      <div className="practice-container">
        <div className="practice-question">
          <p>No questions available.</p>
        </div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="practice-container">
        <motion.div
          className="practice-result"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h2>Practice Complete!</h2>
          <div className="practice-score">
            <span className="score-value">{score}</span>
            <span className="score-divider">/</span>
            <span className="score-total">{filteredQuestions.length}</span>
          </div>
          <p className="score-message">
            {score === filteredQuestions.length
              ? "Perfect score! Excellent work!"
              : score >= filteredQuestions.length * 0.7
              ? "Great job! Keep practicing!"
              : "Good effort! Try again to improve."}
          </p>
          <motion.button
            className="practice-restart"
            onClick={handleRestart}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Restart Practice
          </motion.button>
        </motion.div>
      </div>
    );
  }

  const getOptionClass = (index) => {
    const classes = ['practice-option'];
    if (index === selectedOption) classes.push('selected');
    if (submitted) {
      if (index === currentQuestion.answer) {
        classes.push('correct');
      } else if (index === selectedOption && selectedOption !== currentQuestion.answer) {
        classes.push('wrong');
      } else {
        classes.push('dimmed');
      }
    }
    return classes.join(' ');
  };

  return (
    <div className="practice-container">
      <div className="practice-header">
        <span className="question-counter">
          Question {currentIndex + 1} of {filteredQuestions.length}
        </span>
        <span className="current-score">Score: {score}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="practice-question"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <h3>{currentQuestion.q}</h3>

          <div className="practice-options">
            {currentQuestion.options.map((option, index) => (
              <motion.button
                key={index}
                className={getOptionClass(index)}
                onClick={() => !submitted && setSelectedOption(index)}
                whileHover={!submitted ? { scale: 1.02 } : {}}
                whileTap={!submitted ? { scale: 0.98 } : {}}
                disabled={submitted}
              >
                {option}
              </motion.button>
            ))}
          </div>

          {!submitted && (
            <motion.button
              className="practice-submit"
              onClick={handleSubmit}
              disabled={selectedOption === null}
              whileHover={selectedOption !== null ? { scale: 1.05 } : {}}
              whileTap={selectedOption !== null ? { scale: 0.95 } : {}}
              style={{ opacity: selectedOption === null ? 0.5 : 1 }}
            >
              Submit Answer
            </motion.button>
          )}

          <AnimatePresence>
            {submitted && (
              <motion.div
                className="practice-explanation"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
              >
                <p>
                  {selectedOption === currentQuestion.answer
                    ? "✓ Correct!"
                    : `✗ Incorrect. The answer is: ${currentQuestion.options[currentQuestion.answer]}`}
                </p>
                <p className="explanation-text">{currentQuestion.explanation}</p>
              </motion.div>
            )}
          </AnimatePresence>

          {submitted && (
            <motion.button
              className="practice-next"
              onClick={handleNext}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentIndex === filteredQuestions.length - 1 ? "See Results" : "Next Question"}
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
