import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { generateDailyChallenge } from '../../utils/quizUtils';

function getHint(challenge, selectedArr) {
  const n = challenge.n;
  if (challenge.multi) {
    const correct = challenge.correctAnswers;
    const missed = correct.filter(c => !selectedArr.includes(c));
    const wrongPick = selectedArr.filter(s => !correct.includes(s));
    let parts = [];
    if (missed.length > 0) parts.push(`You missed: ${missed.join(', ')}`);
    if (wrongPick.length > 0) parts.push(`Wrong picks: ${wrongPick.join(', ')}`);
    parts.push(`${n} is: ${correct.join(', ')}`);
    return parts.join('. ');
  }
  if (challenge.type === 'find_prime') {
    return `A prime has exactly 2 factors. ${challenge.correctAnswer} can only be divided by 1 and ${challenge.correctAnswer}.`;
  }
  if (challenge.type === 'find_even') {
    return `${challenge.correctAnswer} is divisible by 2 (${challenge.correctAnswer} ÷ 2 = ${Number(challenge.correctAnswer) / 2}).`;
  }
  return `The correct answer is ${challenge.correctAnswer}.`;
}

export default function DailyChallenge({ onComplete, dailyCompleted }) {
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState([]);
  const [submitted, setSubmitted] = useState(false);
  const [finished, setFinished] = useState(false);

  const challenges = useMemo(() => {
    return Array.from({ length: 5 }, () => generateDailyChallenge());
  }, []);

  const challenge = challenges[questionIndex];
  const isMulti = challenge?.multi;

  const isFullyCorrect = submitted && (() => {
    if (isMulti) {
      const correctSet = new Set(challenge.correctAnswers);
      const selectedSet = new Set(selected);
      return correctSet.size === selectedSet.size && [...correctSet].every(c => selectedSet.has(c));
    }
    return selected[0] === challenge.correctAnswer;
  })();

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

    if (isFullyCorrect) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (questionIndex + 1 >= challenges.length) {
      setFinished(true);
      if (score + (isFullyCorrect ? 1 : 0) >= 3) {
        onComplete?.();
      }
      return;
    }
    setQuestionIndex(prev => prev + 1);
    setSelected([]);
    setSubmitted(false);
  };

  if (dailyCompleted || finished) {
    return (
      <div className="daily-challenge completed">
        <div className="daily-challenge-header">
          <span className="daily-icon">🎯</span>
          <h3>Daily Challenge</h3>
        </div>
        <p className="daily-completed-text">
          {finished ? `You scored ${score}/${challenges.length}!` : "You've completed today's challenge!"}
        </p>
        <p className="daily-come-back">
          {finished ? (score >= 3 ? '🎉 Great job!' : 'Keep practicing!') : 'Come back tomorrow for a new challenge.'}
        </p>
      </div>
    );
  }

  if (!challenge) return null;

  const getOptionState = (option) => {
    if (!submitted) {
      return selected.includes(option) ? 'selected' : '';
    }
    if (isMulti) {
      const isCorrect = challenge.correctAnswers.includes(option);
      const wasSelected = selected.includes(option);
      if (isCorrect && wasSelected) return 'correct';
      if (isCorrect && !wasSelected) return 'missed';
      if (!isCorrect && wasSelected) return 'wrong';
      return 'dimmed';
    }
    if (option === challenge.correctAnswer) return 'correct';
    if (option === selected[0]) return 'wrong';
    return 'dimmed';
  };

  const hint = submitted && !isFullyCorrect ? getHint(challenge, selected) : null;

  return (
    <div className="daily-challenge">
      <div className="daily-challenge-header">
        <span className="daily-icon">🎯</span>
        <h3>Daily Challenge</h3>
        <span className="daily-progress">{questionIndex + 1}/{challenges.length}</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={questionIndex}
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
        >
          <p className="daily-question">{challenge.question}</p>

          {challenge.n !== undefined && (
            <div className="daily-big-number">{challenge.n}</div>
          )}

          {isMulti && !submitted && (
            <p className="daily-hint-text">Select all that apply</p>
          )}

          <div className={`daily-options ${isMulti ? 'multi' : ''}`}>
            {challenge.options.map((option, i) => (
              <motion.button
                key={`${questionIndex}-${i}`}
                className={`daily-option ${getOptionState(option)}`}
                onClick={() => toggleOption(option)}
                whileHover={!submitted ? { scale: 1.05 } : {}}
                whileTap={!submitted ? { scale: 0.95 } : {}}
                disabled={submitted}
              >
                {isMulti && <span className="checkbox">{selected.includes(option) ? '☑' : '☐'}</span>}
                {option}
              </motion.button>
            ))}
          </div>

          {!submitted && (
            <motion.button
              className="daily-submit-btn"
              onClick={handleSubmit}
              disabled={selected.length === 0}
              style={{ opacity: selected.length === 0 ? 0.5 : 1 }}
            >
              {isMulti ? `Submit (${selected.length})` : 'Submit'}
            </motion.button>
          )}

          {submitted && isFullyCorrect && (
            <motion.div
              className="daily-result correct"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              🎉 Correct! +10 XP
            </motion.div>
          )}

          {submitted && !isFullyCorrect && (
            <motion.div
              className="daily-result wrong"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              {isMulti
                ? `Not quite! Correct: ${challenge.correctAnswers.join(', ')}`
                : `Not quite! Answer: ${challenge.correctAnswer}`}
            </motion.div>
          )}

          {hint && (
            <motion.div
              className="daily-hint-box"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
            >
              💡 {hint}
            </motion.div>
          )}

          {submitted && (
            <motion.button
              className="daily-next-btn"
              onClick={handleNext}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              whileHover={{ scale: 1.05 }}
            >
              {questionIndex + 1 >= challenges.length ? 'See Results' : 'Next →'}
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
