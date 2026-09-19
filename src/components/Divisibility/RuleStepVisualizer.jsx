import { useState } from 'react';
import { motion } from 'framer-motion';
import { isDivisibleBy, getLastDigit, getLastTwoDigits, getLastThreeDigits, getDigitSum, getDigits, ruleOf7Steps } from '../../utils/divisibilityUtils';

function HighlightDigit({ digits, index, color }) {
  return (
    <span className="digit-row">
      {digits.map((d, i) => (
        <motion.span
          key={i}
          className={`rule-digit ${i === index ? 'highlighted' : ''}`}
          style={i === index ? { color, borderColor: color } : {}}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.05 }}
        >
          {d}
        </motion.span>
      ))}
    </span>
  );
}

function RuleOf2({ number }) {
  const last = getLastDigit(number);
  const ok = isDivisibleBy(number, 2);
  const digits = getDigits(number);
  return (
    <div className="rule-explanation">
      <p>Look at the last digit:</p>
      <HighlightDigit digits={digits} index={digits.length - 1} color="#3b82f6" />
      <motion.p className="rule-step-result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        Last digit = <strong>{last}</strong>. {last % 2 === 0 ? `${last} is even → ✓` : `${last} is odd → ✗`}
      </motion.p>
      {ok ? (
        <motion.p className="rule-success" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>🎉 {number} is divisible by 2! ({number} ÷ 2 = {number / 2})</motion.p>
      ) : (
        <motion.p className="rule-fail" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>✗ {number} is NOT divisible by 2.</motion.p>
      )}
    </div>
  );
}

function RuleOf3({ number }) {
  const digits = getDigits(number);
  const sum = getDigitSum(number);
  const ok = isDivisibleBy(number, 3);
  return (
    <div className="rule-explanation">
      <p>Add all the digits:</p>
      <div className="digit-sum-animation">
        {digits.map((d, i) => (
          <motion.span key={i} className="sum-digit" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
            {d}{i < digits.length - 1 ? ' + ' : ''}
          </motion.span>
        ))}
      </div>
      <motion.p className="rule-step-result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: digits.length * 0.1 }}>
        = <strong>{sum}</strong>
      </motion.p>
      <motion.p className="rule-step-result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
        {sum} ÷ 3 = {sum / 3} {sum % 3 === 0 ? '→ ✓' : '→ ✗'}
      </motion.p>
      {ok ? (
        <motion.p className="rule-success" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>🎉 {number} is divisible by 3! ({number} ÷ 3 = {number / 3})</motion.p>
      ) : (
        <motion.p className="rule-fail" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>✗ {number} is NOT divisible by 3.</motion.p>
      )}
    </div>
  );
}

function RuleOf4({ number }) {
  const last2 = getLastTwoDigits(number);
  const digits = getDigits(number);
  const ok = isDivisibleBy(number, 4);
  return (
    <div className="rule-explanation">
      <p>Look at the last two digits:</p>
      <HighlightDigit digits={digits} index={digits.length - 2} color="#8b5cf6" />
      <HighlightDigit digits={[last2]} index={0} color="#8b5cf6" />
      <motion.p className="rule-step-result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        Last two digits = <strong>{last2}</strong>. {last2} ÷ 4 = {last2 / 4} {last2 % 4 === 0 ? '→ ✓' : '→ ✗'}
      </motion.p>
      {ok ? (
        <motion.p className="rule-success" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>🎉 {number} is divisible by 4! ({number} ÷ 4 = {number / 4})</motion.p>
      ) : (
        <motion.p className="rule-fail" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>✗ {number} is NOT divisible by 4.</motion.p>
      )}
    </div>
  );
}

function RuleOf5({ number }) {
  const last = getLastDigit(number);
  const ok = isDivisibleBy(number, 5);
  const digits = getDigits(number);
  return (
    <div className="rule-explanation">
      <p>Look at the last digit:</p>
      <HighlightDigit digits={digits} index={digits.length - 1} color="#f59e0b" />
      <motion.p className="rule-step-result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        Last digit = <strong>{last}</strong>. {last === 0 || last === 5 ? `${last} → ✓` : `${last} → ✗`}
      </motion.p>
      {ok ? (
        <motion.p className="rule-success" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>🎉 {number} is divisible by 5! ({number} ÷ 5 = {number / 5})</motion.p>
      ) : (
        <motion.p className="rule-fail" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>✗ {number} is NOT divisible by 5.</motion.p>
      )}
    </div>
  );
}

function RuleOf6({ number }) {
  const d2 = isDivisibleBy(number, 2);
  const d3 = isDivisibleBy(number, 3);
  const ok = isDivisibleBy(number, 6);
  return (
    <div className="rule-explanation">
      <p>6 = 2 × 3 — check BOTH:</p>
      <div className="combined-checks">
        <motion.div className={`check-item ${d2 ? 'pass' : 'fail'}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1 }}>
          <span>Divisible by 2? {d2 ? '✓ YES' : '✗ NO'}</span>
        </motion.div>
        <motion.div className={`check-item ${d3 ? 'pass' : 'fail'}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
          <span>Divisible by 3? {d3 ? '✓ YES' : '✗ NO'}</span>
        </motion.div>
      </div>
      <motion.p className="rule-step-result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
        Both must be YES → {ok ? '✓ YES' : '✗ NO'}
      </motion.p>
      {ok ? (
        <motion.p className="rule-success" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>🎉 {number} is divisible by 6! ({number} ÷ 6 = {number / 6})</motion.p>
      ) : (
        <motion.p className="rule-fail" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>✗ {number} is NOT divisible by 6.</motion.p>
      )}
    </div>
  );
}

function RuleOf7({ number }) {
  const steps = ruleOf7Steps(number);
  const ok = isDivisibleBy(number, 7);
  return (
    <div className="rule-explanation rule-of-seven">
      <p className="challenge-label">🧠 CHALLENGE RULE</p>
      <div className="seven-steps">
        <motion.div className="seven-step" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0 }}>
          <span className="step-label">Start</span><span className="step-value">{Math.abs(number)}</span>
        </motion.div>
        <motion.div className="seven-step" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
          <span className="step-label">Last digit</span><span className="step-value">{steps.lastDigit}</span>
        </motion.div>
        <motion.div className="seven-step" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <span className="step-label">Double it</span><span className="step-value">{steps.lastDigit} × 2 = {steps.doubled}</span>
        </motion.div>
        <motion.div className="seven-step" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45 }}>
          <span className="step-label">Subtract</span><span className="step-value">{steps.remaining} − {steps.doubled} = {steps.result}</span>
        </motion.div>
        <motion.div className="seven-step" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <span className="step-label">Check</span><span className="step-value">{steps.result} ÷ 7 = {steps.result / 7} {steps.result % 7 === 0 ? '→ ✓' : '→ try again'}</span>
        </motion.div>
      </div>
      {ok ? (
        <motion.p className="rule-success" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>🎉 {number} is divisible by 7! ({number} ÷ 7 = {number / 7})</motion.p>
      ) : (
        <motion.p className="rule-fail" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>✗ {number} is NOT divisible by 7.</motion.p>
      )}
    </div>
  );
}

function RuleOf8({ number }) {
  const last3 = getLastThreeDigits(number);
  const digits = getDigits(number);
  const ok = isDivisibleBy(number, 8);
  return (
    <div className="rule-explanation">
      <p>Look at the last three digits:</p>
      <HighlightDigit digits={digits} index={digits.length - 3} color="#06b6d4" />
      <motion.p className="rule-step-result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        Last three digits = <strong>{last3}</strong>. {last3} ÷ 8 = {last3 / 8} {last3 % 8 === 0 ? '→ ✓' : '→ ✗'}
      </motion.p>
      {ok ? (
        <motion.p className="rule-success" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>🎉 {number} is divisible by 8! ({number} ÷ 8 = {number / 8})</motion.p>
      ) : (
        <motion.p className="rule-fail" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>✗ {number} is NOT divisible by 8.</motion.p>
      )}
    </div>
  );
}

function RuleOf9({ number }) {
  const digits = getDigits(number);
  const sum = getDigitSum(number);
  const ok = isDivisibleBy(number, 9);
  return (
    <div className="rule-explanation">
      <p>Add all the digits:</p>
      <div className="digit-sum-animation">
        {digits.map((d, i) => (
          <motion.span key={i} className="sum-digit" initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}>
            {d}{i < digits.length - 1 ? ' + ' : ''}
          </motion.span>
        ))}
      </div>
      <motion.p className="rule-step-result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: digits.length * 0.1 }}>
        = <strong>{sum}</strong>. {sum} ÷ 9 = {sum / 9} {sum % 9 === 0 ? '→ ✓' : '→ ✗'}
      </motion.p>
      {ok ? (
        <motion.p className="rule-success" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>🎉 {number} is divisible by 9! ({number} ÷ 9 = {number / 9})</motion.p>
      ) : (
        <motion.p className="rule-fail" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>✗ {number} is NOT divisible by 9.</motion.p>
      )}
    </div>
  );
}

function RuleOf10({ number }) {
  const last = getLastDigit(number);
  const ok = isDivisibleBy(number, 10);
  const digits = getDigits(number);
  return (
    <div className="rule-explanation">
      <p>Look at the last digit:</p>
      <HighlightDigit digits={digits} index={digits.length - 1} color="#64748b" />
      <motion.p className="rule-step-result" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
        Last digit = <strong>{last}</strong>. {last === 0 ? '0 → ✓' : `${last} → ✗`}
      </motion.p>
      {ok ? (
        <motion.p className="rule-success" initial={{ scale: 0.8 }} animate={{ scale: 1 }}>🎉 {number} is divisible by 10! ({number} ÷ 10 = {number / 10})</motion.p>
      ) : (
        <motion.p className="rule-fail" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>✗ {number} is NOT divisible by 10.</motion.p>
      )}
    </div>
  );
}

const RULE_COMPONENTS = {
  2: RuleOf2, 3: RuleOf3, 4: RuleOf4, 5: RuleOf5, 6: RuleOf6,
  7: RuleOf7, 8: RuleOf8, 9: RuleOf9, 10: RuleOf10,
};

export default function RuleStepVisualizer({ divisor, number }) {
  const Comp = RULE_COMPONENTS[divisor];
  if (!Comp) return null;
  return <Comp number={number} />;
}
