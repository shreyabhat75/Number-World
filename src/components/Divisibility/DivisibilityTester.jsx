import { motion } from 'framer-motion';
import { getDivisibilityResults } from '../../utils/divisibilityUtils';

export default function DivisibilityTester({ number }) {
  const results = getDivisibilityResults(number);
  const divisors = [2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="divisibility-tester">
      <h3>🔍 Divisibility Detective</h3>
      <p className="tester-subtitle">All the numbers that divide {number}:</p>
      <div className="tester-grid">
        {divisors.map((d, i) => {
          const r = results[d];
          return (
            <motion.div
              key={d}
              className={`tester-card ${r.divisible ? 'yes' : 'no'}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.06 }}
            >
              <span className="tester-divisor">÷{d}</span>
              <span className="tester-icon">{r.divisible ? '✓' : '✗'}</span>
              {r.divisible && (
                <span className="tester-quotient">{number} ÷ {d} = {r.quotient}</span>
              )}
              {!r.divisible && r.remainder > 0 && (
                <span className="tester-remainder">remainder {r.remainder}</span>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
