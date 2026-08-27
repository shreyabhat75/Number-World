import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DIGIT_CYCLES = {
  0: [0],
  1: [1],
  2: [2, 4, 8, 6],
  3: [3, 9, 7, 1],
  4: [4, 6],
  5: [5],
  6: [6],
  7: [7, 9, 3, 1],
  8: [8, 4, 2, 6],
  9: [9, 1],
};

const DIGIT_COLORS = {
  0: '#94a3b8',
  1: '#8b5cf6',
  2: '#3b82f6',
  3: '#10b981',
  4: '#ef4444',
  5: '#f97316',
  6: '#06b6d4',
  7: '#ec4899',
  8: '#f59e0b',
  9: '#a855f7',
};

const QUICK_EXAMPLES = [
  { base: 7, exp: 23 },
  { base: 3, exp: 100 },
  { base: 8, exp: 45 },
  { base: 2, exp: 37 },
  { base: 9, exp: 52 },
  { base: 4, exp: 61 },
  { base: 6, exp: 18 },
  { base: 5, exp: 99 },
];

function computeUnitDigit(base, exponent) {
  const lastDigit = Math.abs(base) % 10;
  const cycle = DIGIT_CYCLES[lastDigit];
  const cycleLen = cycle.length;
  const idx = (exponent - 1) % cycleLen;
  return cycle[idx];
}

function getCalculation(base, exponent) {
  const lastDigit = Math.abs(base) % 10;
  const cycle = DIGIT_CYCLES[lastDigit];
  const cycleLen = cycle.length;
  const quotient = Math.floor(exponent / cycleLen);
  const remainder = exponent % cycleLen;
  const position = remainder === 0 ? cycleLen : remainder;
  const unitDigit = cycle[position - 1];
  return { lastDigit, cycle, cycleLen, quotient, remainder, position, unitDigit };
}

const S = {
  page: {
    padding: '24px 0',
    maxWidth: 900,
    margin: '0 auto',
  },
  header: {
    textAlign: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: 900,
    background: 'linear-gradient(135deg, var(--purple), var(--blue))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    backgroundClip: 'text',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: '1.05rem',
    color: 'var(--text-secondary)',
    fontWeight: 600,
  },
  card: {
    background: 'white',
    borderRadius: 'var(--radius-lg)',
    padding: 24,
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    border: '1px solid var(--border)',
    marginBottom: 24,
  },
  sectionLabel: {
    fontSize: '1.1rem',
    fontWeight: 800,
    color: 'var(--text-primary)',
    marginBottom: 16,
    display: 'flex',
    alignItems: 'center',
    gap: 8,
  },
  inputRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 24,
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 6,
  },
  inputLabel: {
    fontSize: '0.85rem',
    fontWeight: 700,
    color: 'var(--text-secondary)',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
  },
  stepper: {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
  },
  stepBtn: {
    width: 44,
    height: 44,
    borderRadius: 'var(--radius-md)',
    border: '2px solid var(--border)',
    background: 'white',
    fontSize: '1.3rem',
    fontWeight: 700,
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.15s',
    color: 'var(--text-primary)',
  },
  value: {
    fontSize: '2rem',
    fontWeight: 900,
    minWidth: 64,
    textAlign: 'center',
    color: 'var(--purple)',
  },
  arrow: {
    fontSize: '2rem',
    fontWeight: 900,
    color: 'var(--text-tertiary)',
    margin: '0 4px',
  },
  calcBox: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: 'var(--radius-lg)',
    padding: '20px 24px',
    textAlign: 'center',
    color: 'white',
    marginTop: 20,
  },
  calcText: {
    fontSize: '1.15rem',
    fontWeight: 700,
    lineHeight: 1.8,
  },
  cycleRow: {
    display: 'flex',
    justifyContent: 'center',
    gap: 10,
    flexWrap: 'wrap',
    margin: '20px 0 8px',
  },
  cycleDot: (color, size = 56) => ({
    width: size,
    height: size,
    borderRadius: 'var(--radius-full)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: size > 50 ? '1.3rem' : '1rem',
    fontWeight: 900,
    background: '#f1f5f9',
    border: '3px solid #e2e8f0',
    color: '#64748b',
  }),
  cycleDotActive: (color) => ({
    width: 64,
    height: 64,
    borderRadius: 'var(--radius-full)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    fontWeight: 900,
    background: color,
    color: 'white',
    boxShadow: `0 0 24px ${color}88, 0 0 48px ${color}44`,
    border: `3px solid ${color}`,
  }),
  answerSection: {
    textAlign: 'center',
    margin: '24px 0 8px',
  },
  answerLabel: {
    fontSize: '1rem',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    marginBottom: 8,
  },
  answerDigit: (color) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 88,
    height: 88,
    borderRadius: 'var(--radius-full)',
    fontSize: '2.8rem',
    fontWeight: 900,
    background: color,
    color: 'white',
    boxShadow: `0 0 30px ${color}88, 0 0 60px ${color}44, 0 0 90px ${color}22`,
    border: `4px solid ${color}`,
    position: 'relative',
  }),
  powerExpr: {
    fontSize: '1.2rem',
    fontWeight: 700,
    color: 'var(--text-primary)',
    marginBottom: 4,
  },
  powerSup: {
    fontSize: '0.75em',
    verticalAlign: 'super',
  },
  examplesRow: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 10,
    justifyContent: 'center',
    marginTop: 8,
  },
  exBtn: (color) => ({
    padding: '10px 18px',
    borderRadius: 20,
    border: `2px solid ${color}44`,
    background: `${color}11`,
    fontSize: '0.95rem',
    fontWeight: 700,
    fontFamily: 'inherit',
    cursor: 'pointer',
    transition: 'all 0.2s',
    color: color,
  }),
  wallContainer: {
    marginTop: 8,
  },
  wallRow: (color, isActive) => ({
    display: 'flex',
    alignItems: 'center',
    gap: 16,
    padding: '12px 16px',
    borderRadius: 'var(--radius-md)',
    marginBottom: 8,
    background: isActive ? `${color}18` : '#f8fafc',
    border: `2px solid ${isActive ? color : 'transparent'}`,
    cursor: 'pointer',
    transition: 'all 0.2s',
  }),
  wallDigit: (color) => ({
    width: 44,
    height: 44,
    borderRadius: 'var(--radius-full)',
    background: color,
    color: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.2rem',
    fontWeight: 900,
    flexShrink: 0,
  }),
  wallCycle: {
    display: 'flex',
    gap: 8,
    flexWrap: 'wrap',
    flex: 1,
  },
  wallDot: (color, isActive) => ({
    width: 36,
    height: 36,
    borderRadius: 'var(--radius-full)',
    background: isActive ? color : '#e2e8f0',
    color: isActive ? 'white' : '#64748b',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.85rem',
    fontWeight: 800,
    transition: 'all 0.2s',
  }),
  wallMeta: {
    fontSize: '0.8rem',
    fontWeight: 600,
    color: 'var(--text-tertiary)',
    minWidth: 60,
    textAlign: 'right',
    flexShrink: 0,
  },
  wallDetail: (color) => ({
    marginTop: 12,
    padding: 16,
    borderRadius: 'var(--radius-md)',
    background: `${color}10`,
    border: `2px solid ${color}33`,
  }),
  wallDetailTitle: (color) => ({
    fontSize: '1rem',
    fontWeight: 800,
    color: color,
    marginBottom: 8,
  }),
  wallDetailPowers: {
    fontSize: '0.9rem',
    fontWeight: 600,
    color: 'var(--text-secondary)',
    lineHeight: 1.8,
  },
  formulaInline: {
    fontWeight: 900,
    color: 'white',
  },
};

const staggerItem = {
  hidden: { opacity: 0, scale: 0.8 },
  show: (i) => ({
    opacity: 1,
    scale: 1,
    transition: { delay: i * 0.08, type: 'spring', stiffness: 300, damping: 20 },
  }),
};

const rowVariant = {
  hidden: { opacity: 0, x: -30 },
  show: (i) => ({
    opacity: 1,
    x: 0,
    transition: { delay: i * 0.06, type: 'spring', stiffness: 200, damping: 20 },
  }),
};

export default function UnitDigitPage() {
  const [base, setBase] = useState(7);
  const [exponent, setExponent] = useState(23);
  const [animKey, setAnimKey] = useState(0);
  const [activeWallDigit, setActiveWallDigit] = useState(null);

  const calc = getCalculation(base, exponent);
  const { lastDigit, cycle, cycleLen, quotient, remainder, position, unitDigit } = calc;
  const digitColor = DIGIT_COLORS[lastDigit];

  useEffect(() => {
    setAnimKey((k) => k + 1);
  }, [base, exponent]);

  const handleBase = (delta) => {
    const next = base + delta;
    if (next >= 2 && next <= 99) setBase(next);
  };

  const handleExp = (delta) => {
    const next = exponent + delta;
    if (next >= 1 && next <= 200) setExponent(next);
  };

  const applyExample = (b, e) => {
    setBase(b);
    setExponent(e);
  };

  return (
    <div style={S.page}>
      <motion.div
        style={S.header}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 style={S.title}>🎯 Unit Digit Power Cycles</h1>
        <p style={S.subtitle}>Every number's unit digit follows a repeating pattern when raised to powers!</p>
      </motion.div>

      <motion.div
        style={S.card}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div style={S.sectionLabel}>🔢 Choose Your Power</div>

        <div style={S.inputRow}>
          <div style={S.inputGroup}>
            <span style={S.inputLabel}>Base</span>
            <div style={S.stepper}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleBase(-1)}
                style={{ ...S.stepBtn, background: '#fecaca', color: '#991b1b', borderColor: '#fca5a5' }}
              >
                −
              </motion.button>
              <motion.span
                key={base}
                initial={{ scale: 1.3, color: digitColor }}
                animate={{ scale: 1, color: 'var(--purple)' }}
                style={S.value}
              >
                {base}
              </motion.span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleBase(1)}
                style={{ ...S.stepBtn, background: '#bbf7d0', color: '#166534', borderColor: '#86efac' }}
              >
                +
              </motion.button>
            </div>
          </div>

          <motion.span
            style={S.arrow}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ^
          </motion.span>

          <div style={S.inputGroup}>
            <span style={S.inputLabel}>Exponent</span>
            <div style={S.stepper}>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleExp(-1)}
                style={{ ...S.stepBtn, background: '#fecaca', color: '#991b1b', borderColor: '#fca5a5' }}
              >
                −
              </motion.button>
              <motion.span
                key={exponent}
                initial={{ scale: 1.3, color: digitColor }}
                animate={{ scale: 1, color: 'var(--purple)' }}
                style={S.value}
              >
                {exponent}
              </motion.span>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleExp(1)}
                style={{ ...S.stepBtn, background: '#bbf7d0', color: '#166534', borderColor: '#86efac' }}
              >
                +
              </motion.button>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        style={S.card}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div style={S.sectionLabel}>🔄 Power Cycle for {lastDigit}</div>

        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <span style={S.powerExpr}>
            {base}<span style={S.powerSup}>^{exponent}</span> → unit digit of {lastDigit}<span style={S.powerSup}>^{exponent}</span>
          </span>
        </div>

        <div style={S.cycleRow} key={`cycle-${lastDigit}-${animKey}`}>
          {cycle.map((digit, i) => {
            const isActive = (i + 1) === position;
            return (
              <motion.div
                key={`${lastDigit}-${i}-${animKey}`}
                custom={i}
                variants={staggerItem}
                initial="hidden"
                animate="show"
                style={isActive ? S.cycleDotActive(digitColor) : S.cycleDot(digitColor)}
              >
                {digit}
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={`calc-${animKey}`}
            style={S.calcBox}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 200, damping: 18 }}
          >
            <div style={S.calcText}>
              {exponent} ÷ {cycleLen} = {quotient} remainder {remainder === 0 ? cycleLen : remainder}
              <br />
              → Position {position} in cycle → Unit Digit ={' '}
              <span style={{ ...S.formulaInline, fontSize: '1.4rem' }}>{unitDigit}</span>
            </div>
          </motion.div>
        </AnimatePresence>

        <div style={S.answerSection}>
          <div style={S.answerLabel}>Unit Digit of {base}^{exponent}</div>
          <AnimatePresence mode="wait">
            <motion.div
              key={`ans-${unitDigit}-${animKey}`}
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ type: 'spring', stiffness: 260, damping: 18 }}
              style={S.answerDigit(digitColor)}
            >
              {unitDigit}
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>

      <motion.div
        style={S.card}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div style={S.sectionLabel}>⚡ Quick Examples</div>
        <div style={S.examplesRow}>
          {QUICK_EXAMPLES.map((ex, i) => {
            const c = getCalculation(ex.base, ex.exp);
            const col = DIGIT_COLORS[Math.abs(ex.base) % 10];
            return (
              <motion.button
                key={`${ex.base}-${ex.exp}`}
                custom={i}
                variants={staggerItem}
                initial="hidden"
                animate="show"
                whileHover={{ scale: 1.08, y: -2 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => applyExample(ex.base, ex.exp)}
                style={S.exBtn(col)}
              >
                {ex.base}^{ex.exp} = {c.unitDigit}
              </motion.button>
            );
          })}
        </div>
      </motion.div>

      <motion.div
        style={S.card}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div style={S.sectionLabel}>🧱 Pattern Wall — All Unit Digit Cycles</div>
        <div style={S.wallContainer}>
          {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((d, i) => {
            const color = DIGIT_COLORS[d];
            const cycle = DIGIT_CYCLES[d];
            const isActive = activeWallDigit === d;
            const isSelectedRow = d === lastDigit;
            return (
              <div key={d}>
                <motion.div
                  custom={i}
                  variants={rowVariant}
                  initial="hidden"
                  animate="show"
                  whileHover={{ x: 4 }}
                  onClick={() => setActiveWallDigit(isActive ? null : d)}
                  style={S.wallRow(color, isActive || isSelectedRow)}
                >
                  <motion.div
                    style={S.wallDigit(color)}
                    animate={isSelectedRow ? { scale: [1, 1.15, 1] } : {}}
                    transition={{ duration: 0.4 }}
                  >
                    {d}
                  </motion.div>
                  <div style={S.wallCycle}>
                    {cycle.map((val, j) => (
                      <motion.div
                        key={`${d}-${j}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: i * 0.05 + j * 0.06, type: 'spring', stiffness: 400 }}
                        style={S.wallDot(color, isActive || isSelectedRow)}
                      >
                        {val}
                      </motion.div>
                    ))}
                  </div>
                  <div style={S.wallMeta}>
                    len {cycle.length}
                  </div>
                </motion.div>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 22 }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div style={S.wallDetail(color)}>
                        <div style={S.wallDetailTitle(color)}>
                          {d}ⁿ — Cycle: [{cycle.join(', ')}]
                        </div>
                        <div style={S.wallDetailPowers}>
                          {d}^1 = {cycle[0]} &nbsp;|&nbsp;{' '}
                          {d}^2 = {cycle[Math.min(1, cycle.length - 1)]} &nbsp;|&nbsp;{' '}
                          {d}^3 = {cycle[Math.min(2, cycle.length - 1)]} &nbsp;|&nbsp;{' '}
                          {d}^4 = {cycle[Math.min(3, cycle.length - 1)]}
                          {cycle.length > 1 && (
                            <>
                              &nbsp;→ repeats every <strong>{cycle.length}</strong> powers
                            </>
                          )}
                          {cycle.length === 1 && (
                            <>&nbsp;→ always {cycle[0]}</>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
