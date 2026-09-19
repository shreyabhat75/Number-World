import { useState, useCallback, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isDivisibleBy, getDigitSum, getDigits } from '../../utils/divisibilityUtils';

function generateQuestion() {
  const types = ['yesNo', 'multiChoice', 'ruleMatch'];
  const type = types[Math.floor(Math.random() * types.length)];
  const divisors = [2, 3, 4, 5, 6, 7, 8, 9, 10];
  const divisor = divisors[Math.floor(Math.random() * divisors.length)];

  if (type === 'yesNo') {
    const n = Math.floor(Math.random() * 200) + 2;
    return { type, question: `Is ${n} divisible by ${divisor}?`, number: n, divisor, correctAnswer: isDivisibleBy(n, divisor) };
  }

  if (type === 'multiChoice') {
    const correct = Math.floor(Math.random() * 50) + 2;
    const wrong1 = correct + 1;
    const wrong2 = correct + (Math.floor(Math.random() * 5) + 2);
    const wrong3 = correct - 1 < 2 ? correct + 10 : correct - 1;
    const options = [correct, wrong1, wrong2, wrong3].sort(() => Math.random() - 0.5);
    return { type, question: `Which number is divisible by ${divisor}?`, divisor, options, correctAnswer: correct };
  }

  const RULES = {
    2: 'Last digit is even', 3: 'Sum of digits divisible by 3', 4: 'Last 2 digits divisible by 4',
    5: 'Ends in 0 or 5', 6: 'Divisible by 2 AND 3', 7: 'Double last digit and subtract from rest',
    8: 'Last 3 digits divisible by 8', 9: 'Sum of digits divisible by 9', 10: 'Ends in 0',
  };
  const wrongDivisors = divisors.filter(d => d !== divisor).sort(() => Math.random() - 0.5).slice(0, 3);
  const options = [divisor, ...wrongDivisors].sort(() => Math.random() - 0.5);
  return {
    type: 'ruleMatch',
    question: `Which rule describes divisibility by ${divisor}?`,
    options: options.map(d => ({ divisor: d, rule: RULES[d] })),
    correctAnswer: divisor,
  };
}

export default function DivisibilityChallenge({ onCorrect }) {
  const [q, setQ] = useState(() => generateQuestion());
  const [selected, setSelected] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);

  const next = useCallback(() => {
    setSelected(null);
    setShowResult(false);
    setQ(generateQuestion());
  }, []);

  const handleSelect = (ans) => {
    if (showResult) return;
    setSelected(ans);
    setShowResult(true);
    const correct = String(ans) === String(q.correctAnswer);
    if (correct) {
      setScore(prev => prev + 10);
      setStreak(prev => prev + 1);
      onCorrect?.();
    } else {
      setStreak(0);
    }
  };

  return (
    <div className="div-challenge">
      <div className="div-challenge-header">
        <h3>🎮 Divisibility Challenge</h3>
        <div className="div-challenge-score">
          <span>Score: <strong>{score}</strong></span>
          {streak > 1 && <span className="streak-badge">🔥 {streak}</span>}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={q.question}
          className="div-challenge-question"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -30 }}
        >
          <h4>{q.question}</h4>

          {q.type === 'yesNo' && (
            <div className="div-challenge-options">
              <motion.button
                className={`div-opt ${showResult && q.correctAnswer === true ? 'correct' : ''} ${selected === true && !q.correctAnswer ? 'wrong' : ''}`}
                onClick={() => handleSelect(true)}
                whileHover={!showResult ? { scale: 1.05 } : {}}
                disabled={showResult}
              >
                ✓ YES
              </motion.button>
              <motion.button
                className={`div-opt ${showResult && q.correctAnswer === false ? 'correct' : ''} ${selected === false && q.correctAnswer !== false ? 'wrong' : ''}`}
                onClick={() => handleSelect(false)}
                whileHover={!showResult ? { scale: 1.05 } : {}}
                disabled={showResult}
              >
                ✗ NO
              </motion.button>
            </div>
          )}

          {q.type === 'multiChoice' && (
            <div className="div-challenge-options">
              {q.options.map((opt, i) => (
                <motion.button
                  key={i}
                  className={`div-opt ${showResult && opt === q.correctAnswer ? 'correct' : ''} ${selected === opt && opt !== q.correctAnswer ? 'wrong' : ''}`}
                  onClick={() => handleSelect(opt)}
                  whileHover={!showResult ? { scale: 1.05 } : {}}
                  disabled={showResult}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  {opt}
                </motion.button>
              ))}
            </div>
          )}

          {q.type === 'ruleMatch' && (
            <div className="div-challenge-options rule-match">
              {q.options.map((opt, i) => (
                <motion.button
                  key={i}
                  className={`div-opt rule-opt ${showResult && opt.divisor === q.correctAnswer ? 'correct' : ''} ${selected === opt.divisor && opt.divisor !== q.correctAnswer ? 'wrong' : ''}`}
                  onClick={() => handleSelect(opt.divisor)}
                  whileHover={!showResult ? { scale: 1.03 } : {}}
                  disabled={showResult}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.08 }}
                >
                  <strong>÷{opt.divisor}</strong> — {opt.rule}
                </motion.button>
              ))}
            </div>
          )}

          {showResult && (
            <motion.div
              className={`div-challenge-result ${selected === q.correctAnswer || (q.type === 'yesNo' && selected === q.correctAnswer) ? 'correct' : 'wrong'}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {selected === q.correctAnswer || (q.type === 'yesNo' && selected === q.correctAnswer) ? (
                <>🎉 Correct! +10 XP</>
              ) : (
                <>🤔 Not quite! {q.type === 'yesNo' ? (q.correctAnswer ? 'YES' : 'NO') : q.type === 'multiChoice' ? `Answer: ${q.correctAnswer}` : `Rule for ÷${q.correctAnswer}`}</>
              )}
            </motion.div>
          )}

          {showResult && (
            <motion.button className="next-btn" onClick={next} whileHover={{ scale: 1.05 }}>
              Next →
            </motion.button>
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
