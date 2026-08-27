import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateQuestion } from '../../utils/quizUtils';

function getExplanation(question, selectedArr, isCorrect) {
  if (isCorrect) return null;
  const n = question.n;
  if (question.type === 'identify') {
    const correct = question.correctAnswers;
    const missed = correct.filter(c => !selectedArr.includes(c));
    const wrongPick = selectedArr.filter(s => !correct.includes(s));
    let parts = [];
    if (missed.length > 0) parts.push(`You missed: ${missed.join(', ')}`);
    if (wrongPick.length > 0) parts.push(`Incorrect picks: ${wrongPick.join(', ')}`);
    parts.push(`${n} is: ${correct.join(', ')}`);
    return parts.join('. ');
  }
  if (question.type === 'find_prime') {
    return `A prime number has exactly 2 factors (1 and itself). ${question.correctAnswer} is prime because it can only be divided evenly by 1 and ${question.correctAnswer}.`;
  }
  if (question.type === 'find_composite') {
    return `A composite number has more than 2 factors. ${question.correctAnswer} is composite because it can be divided by other numbers besides 1 and itself.`;
  }
  if (question.type === 'find_even') {
    return `Even numbers are divisible by 2 with no remainder. ${question.correctAnswer} ÷ 2 = ${Number(question.correctAnswer) / 2}.`;
  }
  if (question.type === 'find_odd') {
    return `Odd numbers leave a remainder of 1 when divided by 2. ${question.correctAnswer} ÷ 2 = ${Math.floor(Number(question.correctAnswer) / 2)} remainder 1.`;
  }
  if (question.type === 'find_negative') {
    return `Negative numbers are less than 0. ${question.correctAnswer} is below zero on the number line.`;
  }
  if (question.type === 'simplify_fraction') {
    return `Divide the top and bottom by their greatest common factor to get ${question.correctAnswer}.`;
  }
  if (question.type === 'fraction_decimal') {
    return `Divide the numerator by the denominator: ${n} = ${question.correctAnswer}.`;
  }
  return '';
}

export default function Quiz({ difficulty = 1, onComplete, onCorrect, onWrong }) {
  const [question, setQuestion] = useState(null);
  const [selected, setSelected] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [total, setTotal] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);

  const loadNext = useCallback(() => {
    setSelected([]);
    setSubmitted(false);
    setQuestion(generateQuestion(difficulty));
  }, [difficulty]);

  useEffect(() => {
    loadNext();
  }, [loadNext]);

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

  const isFullyCorrect = submitted && (() => {
    if (isMulti) {
      const correctSet = new Set(question.correctAnswers);
      const selectedSet = new Set(selected);
      return correctSet.size === selectedSet.size && [...correctSet].every(c => selectedSet.has(c));
    }
    return selected[0] === question.correctAnswer;
  })();

  const explanation = submitted ? getExplanation(question, selected, isFullyCorrect) : null;

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

  if (!question) return null;

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
          key={total}
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
            <p className="quiz-hint">Tap to select, then press Submit</p>
          )}

          <div className={`quiz-options ${isMulti ? 'multi' : ''}`}>
            {question.options.map((option, i) => {
              const state = getOptionState(option);
              return (
                <motion.button
                  key={`${total}-${option}-${i}`}
                  className={`quiz-option ${state}`}
                  onClick={() => toggleOption(option)}
                  whileHover={!submitted ? { scale: 1.03 } : {}}
                  whileTap={!submitted ? { scale: 0.97 } : {}}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 }}
                  disabled={submitted}
                >
                  {isMulti && (
                    <span className="checkbox">{selected.includes(option) ? '☑' : '☐'}</span>
                  )}
                  {option}
                </motion.button>
              );
            })}
          </div>

          {!submitted && (
            <motion.button
              className="submit-btn"
              onClick={handleSubmit}
              disabled={selected.length === 0}
              style={{ opacity: selected.length === 0 ? 0.5 : 1 }}
              whileHover={selected.length > 0 ? { scale: 1.05 } : {}}
              whileTap={selected.length > 0 ? { scale: 0.95 } : {}}
            >
              {isMulti ? `Submit (${selected.length} selected)` : 'Submit'}
            </motion.button>
          )}

          <AnimatePresence>
            {submitted && (
              <motion.div
                className={`quiz-result ${isFullyCorrect ? 'correct' : 'wrong'}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
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
                        ? `Not quite! Correct answers: ${question.correctAnswers.join(', ')}`
                        : `Not quite! The answer is ${question.correctAnswer}.`}
                    </span>
                  </>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {submitted && explanation && (
            <motion.div
              className="quiz-explanation"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              <p>💡 {explanation}</p>
            </motion.div>
          )}

          {submitted && (
            <motion.button
              className="next-btn"
              onClick={loadNext}
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
