import { motion } from 'framer-motion';

const CYCLES = [
  { base: 2, powers: [2, 4, 8, 6], cycle: '2 → 4 → 8 → 6', length: 4 },
  { base: 3, powers: [3, 9, 7, 1], cycle: '3 → 9 → 7 → 1', length: 4 },
  { base: 4, powers: [4, 6], cycle: '4 → 6', length: 2 },
  { base: 5, powers: [5], cycle: '5', length: 1 },
  { base: 6, powers: [6], cycle: '6', length: 1 },
  { base: 7, powers: [7, 9, 3, 1], cycle: '7 → 9 → 3 → 1', length: 4 },
  { base: 8, powers: [8, 4, 2, 6], cycle: '8 → 4 → 2 → 6', length: 4 },
  { base: 9, powers: [9, 1], cycle: '9 → 1', length: 2 },
];

function getUnitDigit(base, exponent) {
  if (exponent === 0) return 1;
  const cycle = CYCLES.find(c => c.base === base % 10)?.powers || [base % 10];
  const idx = (exponent - 1) % cycle.length;
  return cycle[idx];
}

export default function UnitDigitPage() {
  return (
    <div className="placeholder-page">
      <motion.div className="page-header" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1>🎯 Unit Digit</h1>
        <p>Patterns in the last digit of powers.</p>
      </motion.div>

      <div className="placeholder-section">
        <h2>Power Cycles (Unit Digits)</h2>
        <p>The unit digit of a number raised to a power follows a repeating pattern.</p>

        <div className="cycle-grid">
          {CYCLES.map((c, i) => (
            <motion.div
              key={c.base}
              className="cycle-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="cycle-base">{c.base}ⁿ</div>
              <div className="cycle-pattern">{c.cycle}</div>
              <div className="cycle-length">Cycle length: {c.length}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="placeholder-section">
        <h2>How to Find the Unit Digit</h2>
        <div className="step-list">
          <div className="step">
            <span className="step-num">1</span>
            <p>Find the unit digit of the base number.</p>
          </div>
          <div className="step">
            <span className="step-num">2</span>
            <p>Find the cycle length for that digit.</p>
          </div>
          <div className="step">
            <span className="step-num">3</span>
            <p>Divide the exponent by the cycle length, find the remainder.</p>
          </div>
          <div className="step">
            <span className="step-num">4</span>
            <p>Use the remainder to find the position in the cycle.</p>
          </div>
        </div>

        <div className="example-box">
          <p><strong>Example:</strong> 7¹²³</p>
          <p>Unit digit of 7: cycle is 7 → 9 → 3 → 1 (length 4)</p>
          <p>123 ÷ 4 = 30 remainder <strong>3</strong></p>
          <p>3rd position in cycle: 7 → 9 → <strong>3</strong></p>
          <p>Unit digit of 7¹²³ = <strong>3</strong></p>
        </div>
      </div>
    </div>
  );
}
