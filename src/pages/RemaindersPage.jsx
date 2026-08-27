import { motion } from 'framer-motion';

const EXAMPLES = [
  { dividend: 17, divisor: 5, quotient: 3, remainder: 2, formula: '17 = 5 × 3 + 2' },
  { dividend: 23, divisor: 7, quotient: 3, remainder: 2, formula: '23 = 7 × 3 + 2' },
  { dividend: 100, divisor: 7, quotient: 14, remainder: 2, formula: '100 = 7 × 14 + 2' },
  { dividend: 50, divisor: 8, quotient: 6, remainder: 2, formula: '50 = 8 × 6 + 2' },
];

export default function RemaindersPage() {
  return (
    <div className="placeholder-page">
      <motion.div className="page-header" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1>➗ Remainders</h1>
        <p>Division, remainders, and the remainder formula.</p>
      </motion.div>

      <div className="placeholder-section">
        <h2>The Division Formula</h2>
        <div className="formula-box">
          <p><strong>Dividend = Divisor × Quotient + Remainder</strong></p>
          <p>Where: 0 ≤ Remainder {'<'} Divisor</p>
        </div>
      </div>

      <div className="placeholder-section">
        <h2>Examples</h2>
        {EXAMPLES.map((ex, i) => (
          <motion.div
            key={i}
            className="remainder-example"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="remainder-visual">
              <span className="r-dividend">{ex.dividend}</span>
              <span className="r-op">÷</span>
              <span className="r-divisor">{ex.divisor}</span>
              <span className="r-op">=</span>
              <span className="r-quotient">{ex.quotient}</span>
              <span className="r-remainder-label">remainder</span>
              <span className="r-remainder">{ex.remainder}</span>
            </div>
            <p className="r-formula">{ex.formula}</p>
          </motion.div>
        ))}
      </div>

      <div className="placeholder-section">
        <h2>💡 Key Facts</h2>
        <ul className="fact-list">
          <li>The remainder is always less than the divisor.</li>
          <li>If remainder = 0, the divisor divides the dividend exactly.</li>
          <li>Remainders follow patterns — they cycle!</li>
          <li>The remainder of (a × b) ÷ n = (remainder of a ÷ n) × (remainder of b ÷ n) mod n</li>
        </ul>
      </div>
    </div>
  );
}
