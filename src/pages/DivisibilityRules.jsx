import { useState } from 'react';
import { motion } from 'framer-motion';
import { DIVISIBILITY_RULES } from '../data/divisibilityRules';
import { getDivisibilityResults } from '../utils/divisibilityUtils';
import DivisibilityRuleCard from '../components/Divisibility/DivisibilityRuleCard';
import DivisibilityTester from '../components/Divisibility/DivisibilityTester';
import DivisibilityMatrix from '../components/Divisibility/DivisibilityMatrix';
import RemainderVisualizer from '../components/Divisibility/RemainderVisualizer';
import DivisibilityChallenge from '../components/Divisibility/DivisibilityChallenge';
import Mascot from '../components/Mascot/Mascot';
import DownloadButtons from '../components/DownloadButtons/DownloadButtons';

const QUICK_NUMBERS = [12, 24, 50, 72, 100, 120, 360, 1000];
const MATRIX_NUMBERS = [12, 24, 35, 72, 100, 360];

export default function DivisibilityRules({ onExplore }) {
  const [number, setNumber] = useState(360);
  const [remainderDivisor, setRemainderDivisor] = useState(5);

  const results = getDivisibilityResults(number);
  const divisibleCount = Object.values(results).filter(r => r.divisible).length;

  return (
    <div className="divisibility-page">
      <div className="floating-background">
        {['2', '3', '4', '5', '6', '7', '8', '9', '10'].map((num, i) => (
          <motion.span
            key={i}
            className="floating-number"
            style={{ left: `${8 + (i * 10) % 80}%`, top: `${5 + (i * 15) % 50}%` }}
            animate={{ y: [0, -12, 0], opacity: [0.1, 0.2, 0.1] }}
            transition={{ duration: 4 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
          >
            {num}
          </motion.span>
        ))}
      </div>

      <motion.div className="page-header" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1>🔢 Divisibility Rules</h1>
        <p>Learn the secret tricks numbers use to divide perfectly!</p>
        <p className="header-sub">Can you figure out which numbers divide a number without leaving a remainder?</p>
      </motion.div>

      <div className="divisibility-mascot-row">
        <Mascot mood="thinking" message="Let's discover the secret rules of numbers! 🕵️‍♂️" size={56} />
      </div>

      <div className="div-number-input-section">
        <h3>Test a Number</h3>
        <div className="div-controls">
          <button className="div-btn minus" onClick={() => setNumber(Math.max(0, number - 1))}>−</button>
          <input
            type="number"
            className="div-number-input"
            value={number}
            onChange={e => { const v = parseInt(e.target.value); if (!isNaN(v)) setNumber(v); }}
            min={0}
          />
          <button className="div-btn plus" onClick={() => setNumber(number + 1)}>+</button>
        </div>
        <input
          type="range"
          className="div-slider"
          min={0}
          max={1000}
          value={number}
          onChange={e => setNumber(parseInt(e.target.value))}
        />
        <div className="div-quick-nums">
          <span>Try: </span>
          {QUICK_NUMBERS.map(n => (
            <motion.button
              key={n}
              className={`quick-num ${n === number ? 'active' : ''}`}
              onClick={() => setNumber(n)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              {n}
            </motion.button>
          ))}
        </div>
      </div>

      <div className="divisibility-summary">
        <motion.div className="summary-big" key={number} initial={{ scale: 0.8 }} animate={{ scale: 1 }}>
          <span className="summary-num">{number}</span>
          <span className="summary-text">is divisible by <strong>{divisibleCount}</strong> of 9 rules</span>
        </motion.div>
      </div>

      <section className="divisibility-rules-section">
        <h2>📐 The Rules</h2>
        <div className="rules-grid">
          {DIVISIBILITY_RULES.map((rule, i) => (
            <DivisibilityRuleCard key={rule.divisor} rule={rule} number={number} onExplore={(n) => { setNumber(n); onExplore?.(n); }} />
          ))}
        </div>
      </section>

      <section className="divisibility-tester-section">
        <DivisibilityTester number={number} />
      </section>

      <section className="divisibility-remainder-section">
        <h3>🍎 What happens with remainders?</h3>
        <p className="remainder-desc">Try dividing by a number:</p>
        <div className="remainder-controls">
          {[2, 3, 4, 5, 6, 7, 8, 9, 10].map(d => (
            <motion.button
              key={d}
              className={`remainder-btn ${d === remainderDivisor ? 'active' : ''}`}
              onClick={() => setRemainderDivisor(d)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              ÷{d}
            </motion.button>
          ))}
        </div>
        <RemainderVisualizer number={number} divisor={remainderDivisor} />
      </section>

      <section className="divisibility-matrix-section">
        <DivisibilityMatrix numbers={MATRIX_NUMBERS} />
      </section>

      <section className="divisibility-challenge-section">
        <DivisibilityChallenge onCorrect={onExplore} />
      </section>

      <section className="divisibility-cheatsheet">
        <h3>📚 Divisibility Cheat Sheet</h3>
        <div className="cheat-grid">
          {DIVISIBILITY_RULES.map(rule => (
            <div key={rule.divisor} className="cheat-card" style={{ borderLeftColor: rule.color }}>
              <span className="cheat-num" style={{ color: rule.color }}>{rule.divisor}</span>
              <span className="cheat-rule">{rule.shortRule}</span>
            </div>
          ))}
        </div>
      </section>

      <DownloadButtons topicSlug="divisibility-rules" topicLabel="Divisibility Rules" />
    </div>
  );
}
