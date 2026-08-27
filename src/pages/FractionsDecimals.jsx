import { useState } from 'react';
import { motion } from 'framer-motion';
import FractionVisualizer from '../components/Fractions/FractionVisualizer';
import DownloadButtons from '../components/DownloadButtons/DownloadButtons';
import {
  simplifyFraction, fractionToDecimal, fractionToPercent,
  getEquivalentFractions, getFractionType, toMixedNumber,
  compareFractions, formatDecimal,
} from '../utils/fractionUtils';

export default function FractionsDecimals({ onBuild }) {
  const [num, setNum] = useState(3);
  const [den, setDen] = useState(4);
  const [shape, setShape] = useState('pie');

  const changeNum = (updater) => { setNum(updater); onBuild?.(); };
  const changeDen = (updater) => { setDen(updater); onBuild?.(); };

  const [compareA, setCompareA] = useState({ num: 1, den: 2 });
  const [compareB, setCompareB] = useState({ num: 2, den: 3 });

  const simplified = simplifyFraction(num, den);
  const decimal = fractionToDecimal(num, den);
  const percent = fractionToPercent(num, den);
  const fractionType = getFractionType(num, den);
  const mixed = toMixedNumber(num, den);
  const equivalents = getEquivalentFractions(num, den, 3);

  const compareResult = compareFractions(compareA, compareB);

  return (
    <div className="fractions-page">
      <motion.div className="page-header" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1>🍕 Fractions &amp; Decimals</h1>
        <p>Slice it up, and see how fractions, decimals, and percents connect!</p>
      </motion.div>

      <section className="fraction-builder-section">
        <div className="fraction-controls">
          <div className="fraction-input-group">
            <label>Numerator</label>
            <div className="number-stepper">
              <button onClick={() => changeNum(n => Math.max(0, n - 1))}>−</button>
              <motion.span key={num} className="stepper-value" initial={{ scale: 1.3 }} animate={{ scale: 1 }}>{num}</motion.span>
              <button onClick={() => changeNum(n => n + 1)}>+</button>
            </div>
          </div>
          <span className="fraction-divider-line">/</span>
          <div className="fraction-input-group">
            <label>Denominator</label>
            <div className="number-stepper">
              <button onClick={() => changeDen(d => Math.max(1, d - 1))}>−</button>
              <motion.span key={den} className="stepper-value" initial={{ scale: 1.3 }} animate={{ scale: 1 }}>{den}</motion.span>
              <button onClick={() => changeDen(d => Math.min(12, d + 1))}>+</button>
            </div>
          </div>
          <div className="fraction-shape-toggle">
            <button className={shape === 'pie' ? 'active' : ''} onClick={() => setShape('pie')}>🥧 Pie</button>
            <button className={shape === 'bar' ? 'active' : ''} onClick={() => setShape('bar')}>▬ Bar</button>
          </div>
        </div>

        <div className="fraction-display-row">
          <FractionVisualizer num={num} den={den} shape={shape} />
          <div className="fraction-readout">
            <div className="fraction-big">
              <span className="fraction-num">{num}</span>
              <span className="fraction-line" />
              <span className="fraction-den">{den}</span>
            </div>
            <span className="fraction-type-badge">{fractionType}</span>
            {fractionType === 'Improper Fraction' && (
              <p className="fraction-mixed">= {mixed.whole} {mixed.num}/{mixed.den} (mixed number)</p>
            )}
          </div>
        </div>

        <div className="fraction-conversions">
          <div className="conversion-chip">
            <span className="conversion-label">Simplified</span>
            <span className="conversion-value">{simplified.num}/{simplified.den}</span>
          </div>
          <div className="conversion-chip">
            <span className="conversion-label">Decimal</span>
            <span className="conversion-value">{formatDecimal(decimal)}</span>
          </div>
          <div className="conversion-chip">
            <span className="conversion-label">Percent</span>
            <span className="conversion-value">{formatDecimal(percent, 2)}%</span>
          </div>
        </div>
      </section>

      <section className="fraction-equivalents-section">
        <h3>🔗 Equivalent Fractions</h3>
        <div className="equivalents-row">
          <div className="equivalent-chip base">{simplified.num}/{simplified.den}</div>
          {equivalents.map((eq, i) => (
            <motion.div
              key={i}
              className="equivalent-chip"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              {eq.num}/{eq.den}
            </motion.div>
          ))}
        </div>
        <p className="progress-detail">Multiply top and bottom by the same number to get an equivalent fraction!</p>
      </section>

      <section className="fraction-compare-section">
        <h3>⚖️ Compare Two Fractions</h3>
        <div className="compare-row">
          <div className="compare-fraction">
            <FractionVisualizer num={compareA.num} den={compareA.den} shape="bar" color="#60a5fa" />
            <div className="fraction-input-group">
              <div className="number-stepper small">
                <button onClick={() => setCompareA(f => ({ ...f, num: Math.max(0, f.num - 1) }))}>−</button>
                <span className="stepper-value">{compareA.num}</span>
                <button onClick={() => setCompareA(f => ({ ...f, num: f.num + 1 }))}>+</button>
              </div>
              <span>/</span>
              <div className="number-stepper small">
                <button onClick={() => setCompareA(f => ({ ...f, den: Math.max(1, f.den - 1) }))}>−</button>
                <span className="stepper-value">{compareA.den}</span>
                <button onClick={() => setCompareA(f => ({ ...f, den: Math.min(12, f.den + 1) }))}>+</button>
              </div>
            </div>
          </div>

          <div className="compare-symbol">
            {compareResult === 0 ? '=' : compareResult > 0 ? '>' : '<'}
          </div>

          <div className="compare-fraction">
            <FractionVisualizer num={compareB.num} den={compareB.den} shape="bar" color="#f472b6" />
            <div className="fraction-input-group">
              <div className="number-stepper small">
                <button onClick={() => setCompareB(f => ({ ...f, num: Math.max(0, f.num - 1) }))}>−</button>
                <span className="stepper-value">{compareB.num}</span>
                <button onClick={() => setCompareB(f => ({ ...f, num: f.num + 1 }))}>+</button>
              </div>
              <span>/</span>
              <div className="number-stepper small">
                <button onClick={() => setCompareB(f => ({ ...f, den: Math.max(1, f.den - 1) }))}>−</button>
                <span className="stepper-value">{compareB.den}</span>
                <button onClick={() => setCompareB(f => ({ ...f, den: Math.min(12, f.den + 1) }))}>+</button>
              </div>
            </div>
          </div>
        </div>
        <p className="progress-detail">
          {compareA.num}/{compareA.den} ({formatDecimal(fractionToDecimal(compareA.num, compareA.den))}) is{' '}
          {compareResult === 0 ? 'equal to' : compareResult > 0 ? 'greater than' : 'less than'}{' '}
          {compareB.num}/{compareB.den} ({formatDecimal(fractionToDecimal(compareB.num, compareB.den))})
        </p>
      </section>

      <div className="fraction-explanation">
        <div className="explanation-card">
          <h3>🍕 What is a fraction?</h3>
          <p>A fraction shows part of a whole. The <strong>numerator</strong> (top) tells how many parts you have, and the <strong>denominator</strong> (bottom) tells how many equal parts the whole is split into.</p>
        </div>
        <div className="explanation-card">
          <h3>🔢 Fraction → Decimal</h3>
          <p>Divide the numerator by the denominator: 3/4 = 3 ÷ 4 = 0.75</p>
        </div>
        <div className="explanation-card">
          <h3>💯 Decimal → Percent</h3>
          <p>Multiply the decimal by 100: 0.75 × 100 = 75%</p>
        </div>
      </div>

      <DownloadButtons topicSlug="fractions-decimals" topicLabel="Fractions & Decimals" />
    </div>
  );
}
