import { useState } from 'react';
import { motion } from 'framer-motion';
import PrimeVisualizer from '../components/PrimeVisualizer/PrimeVisualizer';

const PRIMES_UNDER_50 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47];

export default function PrimeNumbers() {
  const [number, setNumber] = useState(17);

  return (
    <div className="primes-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>⭐ Prime Numbers</h1>
        <p>Meet the special numbers that can only be divided by 1 and themselves!</p>
      </motion.div>

      <div className="prime-explanation-box">
        <div className="explanation-icon">📖</div>
        <div className="explanation-text">
          <p>A <strong>prime number</strong> has exactly <strong>TWO</strong> positive factors: 1 and itself.</p>
          <p className="small">Prime numbers are greater than 1.</p>
        </div>
      </div>

      <div className="prime-input-section">
        <label>Test a number: </label>
        <div className="number-stepper">
          <button onClick={() => setNumber(Math.max(2, number - 1))}>−</button>
          <motion.span
            key={number}
            className="stepper-value"
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
          >
            {number}
          </motion.span>
          <button onClick={() => setNumber(Math.min(100, number + 1))}>+</button>
        </div>
      </div>

      <PrimeVisualizer number={number} />

      <div className="primes-grid-section">
        <h3>Prime numbers under 50</h3>
        <div className="primes-grid">
          {PRIMES_UNDER_50.map((p, i) => (
            <motion.button
              key={p}
              className={`prime-chip ${p === number ? 'active' : ''}`}
              onClick={() => setNumber(p)}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05, type: 'spring' }}
              whileHover={{ scale: 1.15, y: -3 }}
              whileTap={{ scale: 0.9 }}
            >
              ⭐ {p}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="prime-comparison">
        <div className="comparison-card prime-card">
          <h3>⭐ Prime</h3>
          <p>Exactly 2 factors</p>
          <div className="comparison-examples">
            {[2, 3, 5, 7, 11].map(n => (
              <span key={n} className="example-chip prime-chip-sm">⭐ {n}</span>
            ))}
          </div>
        </div>
        <div className="comparison-card composite-card">
          <h3>🧩 Composite</h3>
          <p>More than 2 factors</p>
          <div className="comparison-examples">
            {[4, 6, 8, 9, 10].map(n => (
              <span key={n} className="example-chip composite-chip-sm">🧩 {n}</span>
            ))}
          </div>
        </div>
        <div className="comparison-card special-card">
          <h3>⚠️ Special</h3>
          <p>Neither prime nor composite</p>
          <div className="comparison-examples">
            {[0, 1].map(n => (
              <span key={n} className="example-chip special-chip-sm">❌ {n}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
