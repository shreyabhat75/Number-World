import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function TopicQuiz({ questions = [], onCorrect, onWrong }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [maxStreak, setMaxStreak] = useState(0);

  const currentQuestion = questions[currentIndex];
  const isFinished = currentIndex >= questions.length;
  const accuracy = questions.length > 0 ? Math.round((score / questions.length) * 100) : 0;

  const handleSubmit = useCallback(() => {
    if (selectedOption === null || submitted) return;
    setSubmitted(true);

    const isCorrect = selectedOption === currentQuestion.answer;

    if (isCorrect) {
      setScore(prev => prev + 1);
      setStreak(prev => {
        const newStreak = prev + 1;
        setMaxStreak(max => Math.max(max, newStreak));
        return newStreak;
      });
      onCorrect?.();
    } else {
      setStreak(0);
      onWrong?.();
    }
  }, [selectedOption, submitted, currentQuestion, onCorrect, onWrong]);

  const handleNext = useCallback(() => {
    setSelectedOption(null);
    setSubmitted(false);
    setCurrentIndex(prev => prev + 1);
  }, []);

  if (questions.length === 0) {
    return (
      <div className="quiz-container">
        <div className="quiz-question-area">
          <p>No questions available.</p>
        </div>
      </div>
    );
  }

  if (isFinished) {
    return (
      <div className="quiz-container">
        <motion.div
          className="quiz-summary"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
        >
          <h2>Quiz Complete!</h2>
          <div className="quiz-score">
            <span className="score-value">{score}</span>
            <span className="score-divider">/</span>
            <span className="score-total">{questions.length}</span>
          </div>
          <div className="accuracy-display">
            <span className="accuracy-value">{accuracy}%</span>
            <span className="accuracy-label">Accuracy</span>
          </div>
          {maxStreak > 1 && (
            <div className="best-streak">
              Best Streak: 🔥 {maxStreak}
            </div>
          )}
          <p className="summary-message">
            {accuracy === 100
              ? "Perfect score! You're a master!"
              : accuracy >= 80
              ? "Excellent work! Keep it up!"
              : accuracy >= 60
              ? "Good job! Practice makes perfect!"
              : "Keep learning and try again!"}
          </p>
        </motion.div>
      </div>
    );
  }

  const getOptionClass = (index) => {
    const classes = ['quiz-option'];
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
        <div className="quiz-count">
          {currentIndex + 1} / {questions.length}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          className="quiz-question-area"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.3 }}
        >
          <h3 className="quiz-question">{currentQuestion.q}</h3>

          <div className="quiz-options">
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
              className="submit-btn"
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
                className={`quiz-result ${selectedOption === currentQuestion.answer ? 'correct' : 'wrong'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
              >
                {selectedOption === currentQuestion.answer ? (
                  <>
                    <span className="result-emoji">✓</span>
                    <span>Correct!</span>
                  </>
                ) : (
                  <>
                    <span className="result-emoji">✗</span>
                    <span>
                      Incorrect! The answer is: {currentQuestion.options[currentQuestion.answer]}
                    </span>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {submitted && currentQuestion.explanation && (
            <motion.div
              className="quiz-explanation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
            >
              <p>{currentQuestion.explanation}</p>
            </motion.div>
          )}

          {submitted && (
            <motion.button
              className="next-btn"
              onClick={handleNext}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {currentIndex === questions.length - 1 ? "See Results" : "Next Question →"}
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
