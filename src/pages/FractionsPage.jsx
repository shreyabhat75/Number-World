import { useState } from 'react';
import { motion } from 'framer-motion';

const FRACTION_EXAMPLES = [
  { num: 1, den: 2, label: 'Half', visual: '🟦⬜' },
  { num: 1, den: 3, label: 'Third', visual: '🟦⬜⬜' },
  { num: 2, den: 3, label: 'Two thirds', visual: '🟦🟦⬜' },
  { num: 1, den: 4, label: 'Quarter', visual: '🟦⬜⬜⬜' },
  { num: 3, den: 4, label: 'Three quarters', visual: '🟦🟦🟦⬜' },
  { num: 2, den: 5, label: 'Two fifths', visual: '🟦🟦⬜⬜⬜' },
];

export default function FractionsPage() {
  const [num, setNum] = useState(1);
  const [den, setDen] = useState(2);

  const simplified = (() => {
    const g = (a, b) => (b === 0 ? a : g(b, a % b));
    const gcd = g(Math.abs(num), Math.abs(den));
    return { num: num / gcd, den: den / gcd };
  })();

  return (
    <div className="placeholder-page">
      <motion.div className="page-header" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1>🍕 Fractions</h1>
        <p>Parts of a whole — visual fraction models.</p>
      </motion.div>

      <div className="placeholder-section">
        <h2>Interactive Fraction Builder</h2>
        <div className="fraction-builder">
          <div className="fraction-input-row">
            <label>
              Numerator
              <input type="number" min="0" max="20" value={num} onChange={e => setNum(parseInt(e.target.value) || 0)} className="fraction-input" />
            </label>
            <span className="fraction-divider">/</span>
            <label>
              Denominator
              <input type="number" min="1" max="20" value={den} onChange={e => setDen(Math.max(1, parseInt(e.target.value) || 1))} className="fraction-input" />
            </label>
          </div>

          <div className="fraction-visual-row">
            {Array.from({ length: den }).map((_, i) => (
              <motion.div
                key={i}
                className={`fraction-block ${i < num ? 'filled' : ''}`}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: i * 0.05 }}
              />
            ))}
          </div>

          <p className="fraction-result">
            {num}/{den}
            {simplified.num !== num || simplified.den !== den
              ? ` = ${simplified.num}/${simplified.den} (simplified)`
              : ' (already simplified)'}
          </p>
        </div>
      </div>

      <div className="placeholder-section">
        <h2>Common Fractions</h2>
        <div className="fraction-grid">
          {FRACTION_EXAMPLES.map((f, i) => (
            <motion.div
              key={i}
              className="fraction-card"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <div className="fraction-label">{f.label}</div>
              <div className="fraction-value">{f.num}/{f.den}</div>
              <div className="fraction-visual-small">
                {Array.from({ length: f.den }).map((_, i) => (
                  <span key={i} className={i < f.num ? 'filled-block' : 'empty-block'}>
                    {i < f.num ? '🟦' : '⬜'}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
