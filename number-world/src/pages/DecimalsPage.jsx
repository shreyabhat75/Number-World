import { useState, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));

const TABS = ['Place Value', 'Number Line', 'Convert', 'Compare'];

const fadeIn = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } };

const PLACE_NAMES = {
  3: 'Thousands', 2: 'Hundreds', 1: 'Tens', 0: 'Ones',
  '-1': 'Tenths', '-2': 'Hundredths', '-3': 'Thousandths',
};

const DIGIT_COLORS = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#8b5cf6', '#ec4899', '#06b6d4'];

const DECIMAL_PLACE_COLORS = ['#ef4444', '#f97316', '#eab308'];

function parseDecimal(val) {
  const str = val.toString();
  if (str.includes('e')) return { integer: '0', decimal: '', full: str };
  const parts = str.split('.');
  return { integer: parts[0] || '0', decimal: parts[1] || '' };
}

function getExpandedTerms(val) {
  const { integer, decimal } = parseDecimal(val);
  const terms = [];
  const intDigits = integer.split('');
  for (let i = 0; i < intDigits.length; i++) {
    const d = parseInt(intDigits[i]);
    if (d === 0) continue;
    const power = intDigits.length - 1 - i;
    const multiplier = Math.pow(10, power);
    terms.push({ digit: d, multiplier, display: `${d} × ${multiplier}`, value: d * multiplier });
  }
  const decDigits = decimal.split('');
  for (let i = 0; i < decDigits.length; i++) {
    const d = parseInt(decDigits[i]);
    if (d === 0) continue;
    const divisor = Math.pow(10, i + 1);
    terms.push({ digit: d, multiplier: 1 / divisor, display: `${d} × 1/${divisor}`, value: d / divisor, isDecimal: true, decIndex: i });
  }
  return terms;
}

function simplifyFraction(num, den) {
  if (den === 0) return { num: 0, den: 1 };
  const g = gcd(Math.abs(num), Math.abs(den));
  let sn = num / g;
  let sd = den / g;
  if (sd < 0) { sn = -sn; sd = -sd; }
  return { num: sn, den: sd };
}

export default function DecimalsPage() {
  const [tab, setTab] = useState(0);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px 16px 64px' }}>
      <motion.div {...fadeIn} style={{ textAlign: 'center', marginBottom: 28 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>Decimals</h1>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)' }}>Place value, number lines, conversions, and comparisons</p>
      </motion.div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 28, background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: 4, border: '1px solid var(--border)' }}>
        {TABS.map((t, i) => (
          <motion.button key={t} onClick={() => setTab(i)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            style={{
              flex: 1, padding: '10px 4px', borderRadius: 'var(--radius-md)', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
              background: tab === i ? 'var(--purple)' : 'transparent',
              color: tab === i ? '#fff' : 'var(--text-secondary)',
              transition: 'background 0.2s, color 0.2s',
            }}>
            {t}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === 0 && <PlaceValueTab key="pv" />}
        {tab === 1 && <NumberLineTab key="nl" />}
        {tab === 2 && <ConvertTab key="cv" />}
        {tab === 3 && <CompareTab key="cp" />}
      </AnimatePresence>
    </div>
  );
}

function PlaceValueTab() {
  const [value, setValue] = useState(3.75);
  const [hoveredTerm, setHoveredTerm] = useState(null);
  const { integer, decimal } = parseDecimal(value);
  const terms = useMemo(() => getExpandedTerms(value), [value]);

  const allDigits = useMemo(() => {
    const result = [];
    const intDigits = integer.split('');
    for (let i = 0; i < intDigits.length; i++) {
      const power = intDigits.length - 1 - i;
      result.push({ digit: intDigits[i], placeKey: power.toString(), isDecimal: false, index: i });
    }
    result.push({ digit: '.', placeKey: 'dot', isDecimal: false, index: -1 });
    const decDigits = decimal.split('');
    for (let i = 0; i < decDigits.length; i++) {
      result.push({ digit: decDigits[i], placeKey: `-${i + 1}`, isDecimal: true, index: i });
    }
    return result;
  }, [integer, decimal]);

  const hoveredTermData = hoveredTerm !== null ? terms[hoveredTerm] : null;

  return (
    <motion.div {...fadeIn} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)' }}>Enter decimal:</span>
        <input type="number" step="0.001" min="0" max="99.999" value={value}
          onChange={e => {
            const v = parseFloat(e.target.value);
            if (!isNaN(v) && v >= 0 && v <= 99.999) setValue(v);
          }}
          style={{
            width: 120, height: 48, textAlign: 'center', fontSize: 24, fontWeight: 800,
            border: '3px solid var(--purple)', borderRadius: 'var(--radius-lg)', background: 'var(--surface)',
            color: 'var(--text-primary)', outline: 'none', fontFamily: 'inherit',
          }}
        />
      </div>

      <div style={{
        display: 'flex', gap: 8, alignItems: 'flex-end', justifyContent: 'center', flexWrap: 'wrap',
        background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: '32px 24px',
        border: '2px solid var(--border)', boxShadow: 'var(--shadow-md)', width: '100%', maxWidth: 600,
      }}>
        {allDigits.map((item, i) => {
          if (item.digit === '.') {
            return (
              <motion.div key="dot"
                initial={{ scale: 0 }} animate={{ scale: 1 }}
                transition={{ delay: i * 0.07, type: 'spring', stiffness: 400, damping: 15 }}
                style={{ fontSize: 40, fontWeight: 900, color: 'var(--text-primary)', paddingBottom: 4, userSelect: 'none' }}>
                .
              </motion.div>
            );
          }
          const placeName = PLACE_NAMES[item.placeKey] || '';
          const color = item.isDecimal ? DECIMAL_PLACE_COLORS[Math.abs(parseInt(item.placeKey)) - 1] : DIGIT_COLORS[DIGIT_COLORS.length - 1 - parseInt(item.placeKey)];
          const isHovered = hoveredTermData && !hoveredTermData.isDecimal && parseInt(item.placeKey) === Math.floor(Math.log10(hoveredTermData.value));
          return (
            <motion.div key={`${item.placeKey}-${item.index}`}
              initial={{ scale: 0, y: 30 }} animate={{ scale: 1, y: 0 }}
              transition={{ delay: i * 0.07, type: 'spring', stiffness: 400, damping: 15 }}
              style={{
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              }}>
              <div style={{
                width: 72, height: 80, borderRadius: 'var(--radius-md)',
                background: `linear-gradient(135deg, ${color}15, ${color}30)`,
                border: `3px solid ${isHovered ? color : `${color}40`}`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: 40, fontWeight: 900, color: color,
                transition: 'border-color 0.2s, transform 0.2s',
                transform: isHovered ? 'scale(1.1)' : 'scale(1)',
                boxShadow: isHovered ? `0 4px 20px ${color}40` : 'none',
              }}>
                {item.digit}
              </div>
              <div style={{
                fontSize: 10, fontWeight: 700, color: color,
                letterSpacing: '0.5px', textTransform: 'uppercase',
              }}>
                {placeName}
              </div>
            </motion.div>
          );
        })}
      </div>

      <div style={{
        width: '100%', background: 'var(--surface)', borderRadius: 'var(--radius-lg)',
        padding: '20px 24px', border: '1px solid var(--border)', boxShadow: 'var(--shadow-sm)',
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 12, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Expanded Form
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, justifyContent: 'center', alignItems: 'center' }}>
          {terms.map((term, i) => {
            const color = term.isDecimal ? DECIMAL_PLACE_COLORS[term.decIndex] : DIGIT_COLORS[Math.floor(Math.log10(term.value))];
            return (
              <motion.div key={i}
                onMouseEnter={() => setHoveredTerm(i)}
                onMouseLeave={() => setHoveredTerm(null)}
                initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.05 }}
                whileHover={{ scale: 1.08, y: -2 }}
                style={{
                  display: 'inline-flex', alignItems: 'center', gap: 4,
                  padding: '8px 14px', borderRadius: 'var(--radius-md)',
                  background: hoveredTerm === i ? `${color}20` : 'transparent',
                  border: `2px solid ${hoveredTerm === i ? color : 'var(--border)'}`,
                  cursor: 'pointer', transition: 'all 0.2s',
                }}>
                <span style={{ fontSize: 20, fontWeight: 800, color }}>{term.display}</span>
              </motion.div>
            );
          })}
          {terms.length === 0 && (
            <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-secondary)' }}>0</span>
          )}
        </div>
        <div style={{ marginTop: 16, textAlign: 'center', padding: '10px 16px', background: '#f8fafc', borderRadius: 'var(--radius-md)' }}>
          <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600 }}>
            = {terms.map(t => t.value).join(' + ')} = <strong style={{ color: 'var(--purple)' }}>{value}</strong>
          </span>
        </div>
      </div>
    </motion.div>
  );
}

function NumberLineTab() {
  const [a, setA] = useState(1.25);
  const [b, setB] = useState(4.75);

  const minVal = Math.min(a, b);
  const maxVal = Math.max(a, b);
  const diff = Math.abs(b - a);

  const padding = Math.max((maxVal - minVal) * 0.2, 0.5);
  const lineMin = Math.max(0, Math.floor((minVal - padding) * 10) / 10);
  const lineMax = Math.ceil((maxVal + padding) * 10) / 10;
  const range = lineMax - lineMin || 1;

  const posA = ((a - lineMin) / range) * 100;
  const posB = ((b - lineMin) / range) * 100;

  const tickCount = Math.min(Math.max(Math.ceil(range / 0.5), 5), 20);
  const tickStep = range / tickCount;
  const ticks = [];
  for (let i = 0; i <= tickCount; i++) {
    ticks.push(lineMin + i * tickStep);
  }

  return (
    <motion.div {...fadeIn} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>Number A</span>
          <input type="number" step="0.25" min="0" max="99.999" value={a}
            onChange={e => { const v = parseFloat(e.target.value); if (!isNaN(v) && v >= 0) setA(v); }}
            style={{
              width: 100, height: 48, textAlign: 'center', fontSize: 22, fontWeight: 800,
              border: '3px solid var(--blue)', borderRadius: 'var(--radius-md)',
              background: 'var(--surface)', color: 'var(--text-primary)', outline: 'none', fontFamily: 'inherit',
            }}
          />
        </div>
        <span style={{ fontSize: 24, fontWeight: 700, color: 'var(--text-secondary)' }}>—</span>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>Number B</span>
          <input type="number" step="0.25" min="0" max="99.999" value={b}
            onChange={e => { const v = parseFloat(e.target.value); if (!isNaN(v) && v >= 0) setB(v); }}
            style={{
              width: 100, height: 48, textAlign: 'center', fontSize: 22, fontWeight: 800,
              border: '3px solid var(--purple)', borderRadius: 'var(--radius-md)',
              background: 'var(--surface)', color: 'var(--text-primary)', outline: 'none', fontFamily: 'inherit',
            }}
          />
        </div>
      </div>

      <div style={{
        width: '100%', background: 'var(--surface)', borderRadius: 'var(--radius-lg)',
        padding: '28px 24px 20px', border: '2px solid var(--border)', boxShadow: 'var(--shadow-md)',
      }}>
        <div style={{ position: 'relative', paddingTop: 40, paddingBottom: 32 }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, display: 'flex', justifyContent: 'space-between', padding: '0 4px' }}>
            {ticks.map((tick, i) => (
              <div key={i} style={{ textAlign: 'center', width: 0 }}>
                <div style={{ width: 2, height: 8, background: 'var(--text-tertiary)', margin: '0 auto 4px' }} />
                <span style={{ fontSize: 9, fontWeight: 600, color: 'var(--text-tertiary)', whiteSpace: 'nowrap', transform: 'translateX(-50%)', display: 'inline-block' }}>
                  {tick.toFixed(1)}
                </span>
              </div>
            ))}
          </div>

          <div style={{
            height: 10, background: 'linear-gradient(90deg, #dcfce7, #d1fae5)', borderRadius: 8,
            position: 'relative', marginTop: 20,
          }}>
            <motion.div
              initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
              transition={{ delay: 0.3, duration: 0.5, ease: 'easeOut' }}
              style={{
                position: 'absolute', top: 0, height: '100%',
                left: `${Math.min(posA, posB)}%`, width: `${Math.abs(posB - posA)}%`,
                background: 'linear-gradient(90deg, var(--blue), var(--purple))',
                borderRadius: 8, transformOrigin: 'left',
              }}
            />

            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring', stiffness: 500, damping: 15 }}
              style={{
                position: 'absolute', top: '50%', left: `${posA}%`, transform: 'translate(-50%, -50%)',
                width: 36, height: 36, borderRadius: '50%', background: 'var(--blue)',
                border: '3px solid white', boxShadow: '0 2px 10px rgba(59,130,246,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 2, cursor: 'grab',
              }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: 'white' }}>A</span>
            </motion.div>

            <motion.div
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: 0.35, type: 'spring', stiffness: 500, damping: 15 }}
              style={{
                position: 'absolute', top: '50%', left: `${posB}%`, transform: 'translate(-50%, -50%)',
                width: 36, height: 36, borderRadius: '50%', background: 'var(--purple)',
                border: '3px solid white', boxShadow: '0 2px 10px rgba(139,92,246,0.4)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                zIndex: 2, cursor: 'grab',
              }}>
              <span style={{ fontSize: 11, fontWeight: 800, color: 'white' }}>B</span>
            </motion.div>
          </div>
        </div>
      </div>

      <motion.div key={`dist-${a}-${b}`}
        initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
        style={{
          display: 'flex', gap: 20, flexWrap: 'wrap', justifyContent: 'center',
        }}>
        <div style={{
          padding: '14px 20px', borderRadius: 'var(--radius-md)',
          background: '#eff6ff', border: '2px solid #93c5fd',
          textAlign: 'center', minWidth: 140,
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#3b82f6', marginBottom: 4 }}>Distance</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#1e40af' }}>{diff.toFixed(3).replace(/0+$/, '').replace(/\.$/, '')}</div>
        </div>
        <div style={{
          padding: '14px 20px', borderRadius: 'var(--radius-md)',
          background: '#f0fdf4', border: '2px solid #86efac',
          textAlign: 'center', minWidth: 140,
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#16a34a', marginBottom: 4 }}>Midpoint</div>
          <div style={{ fontSize: 24, fontWeight: 800, color: '#166534' }}>{((a + b) / 2).toFixed(3).replace(/0+$/, '').replace(/\.$/, '')}</div>
        </div>
      </motion.div>
    </motion.div>
  );
}

function ConvertTab() {
  const [direction, setDirection] = useState('dtof');
  const [decVal, setDecVal] = useState(0.75);
  const [fracNum, setFracNum] = useState(3);
  const [fracDen, setFracDen] = useState(4);
  const [stepIndex, setStepIndex] = useState(0);

  const dtofSteps = useMemo(() => {
    const str = decVal.toString();
    if (str.includes('e')) return [];
    const parts = str.split('.');
    const decPart = parts[1] || '';
    const places = decPart.length;
    if (places === 0) return [{ label: 'This is a whole number!', detail: `${decVal} = ${decVal}/1` }];
    const num = parseInt(parts[0] + decPart) || 0;
    const den = Math.pow(10, places);
    const g = gcd(Math.abs(num), den);
    const simpNum = num / g;
    const simpDen = den / g;

    return [
      { label: 'Count decimal places', detail: `There are ${places} digit${places > 1 ? 's' : ''} after the decimal point: ${decPart}` },
      { label: 'Write as fraction over power of 10', detail: `${num} / ${den}` },
      ...(g > 1 ? [
        { label: `Divide both by GCD (${g})`, detail: `${num} ÷ ${g} = ${simpNum},  ${den} ÷ ${g} = ${simpDen}` },
        { label: 'Simplified fraction', detail: `${simpNum} / ${simpDen}` },
      ] : [
        { label: 'Already simplified', detail: `${num} / ${den}` },
      ]),
    ];
  }, [decVal]);

  const ftodSteps = useMemo(() => {
    if (fracDen === 0) return [];
    const s = simplifyFraction(fracNum, fracDen);
    const g = gcd(Math.abs(s.num), s.den);
    const dividend = Math.abs(s.num);
    const divisor = s.den;
    const neg = s.num < 0;

    const longDivSteps = [];
    let quotient = Math.floor(dividend / divisor);
    let remainder = dividend % divisor;
    let decimals = [];
    let seenRemainders = new Map();
    let isRepeating = false;
    let repeatStart = -1;
    let count = 0;
    while (remainder !== 0 && count < 10) {
      if (seenRemainders.has(remainder)) {
        isRepeating = true;
        repeatStart = seenRemainders.get(remainder);
        break;
      }
      seenRemainders.set(remainder, count);
      remainder *= 10;
      const q = Math.floor(remainder / divisor);
      decimals.push(q);
      remainder = remainder % divisor;
      count++;
    }

    let decimalStr = decimals.join('');
    if (isRepeating && repeatStart !== undefined) {
      const nonRep = decimalStr.slice(0, repeatStart);
      const rep = decimalStr.slice(repeatStart);
      decimalStr = `${nonRep}(${rep})`;
    }

    const result = parseFloat(`0.${decimals.join('')}`);

    return [
      { label: 'Simplify fraction', detail: g > 1 ? `${fracNum}/${fracDen} = ${s.num}/${s.den}` : `${fracNum}/${fracDen} is already simplified`, numerator: s.num, denominator: s.den },
      { label: 'Perform long division', detail: `${Math.abs(s.num)} ÷ ${s.den}` },
      { label: 'Result', detail: `${neg ? '-' : ''}${quotient}.${decimals.join('')}${isRepeating ? ' (repeating)' : ''}`, isFinal: true },
    ];
  }, [fracNum, fracDen]);

  const steps = direction === 'dtof' ? dtofSteps : ftodSteps;

  return (
    <motion.div {...fadeIn} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
      <div style={{ display: 'flex', border: '2px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
        {[{ key: 'dtof', label: 'Decimal → Fraction' }, { key: 'ftod', label: 'Fraction → Decimal' }].map(opt => (
          <motion.button key={opt.key} onClick={() => { setDirection(opt.key); setStepIndex(0); }}
            whileTap={{ scale: 0.95 }}
            style={{
              padding: '10px 18px', fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              background: direction === opt.key ? 'var(--purple)' : 'var(--surface)',
              color: direction === opt.key ? '#fff' : 'var(--text-secondary)',
            }}>
            {opt.label}
          </motion.button>
        ))}
      </div>

      {direction === 'dtof' ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)' }}>Decimal:</span>
          <input type="number" step="0.01" min="0" max="99.999" value={decVal}
            onChange={e => { const v = parseFloat(e.target.value); if (!isNaN(v) && v >= 0 && v <= 99.999) { setDecVal(v); setStepIndex(0); } }}
            style={{
              width: 120, height: 48, textAlign: 'center', fontSize: 22, fontWeight: 800,
              border: '3px solid var(--purple)', borderRadius: 'var(--radius-lg)',
              background: 'var(--surface)', color: 'var(--text-primary)', outline: 'none', fontFamily: 'inherit',
            }}
          />
        </div>
      ) : (
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <input type="number" min="0" max="100" value={fracNum}
            onChange={e => { setFracNum(Math.max(0, parseInt(e.target.value) || 0)); setStepIndex(0); }}
            style={{ width: 72, height: 48, textAlign: 'center', fontSize: 22, fontWeight: 800, border: '3px solid var(--blue)', borderRadius: 'var(--radius-md)', background: 'var(--surface)', color: 'var(--text-primary)', outline: 'none', fontFamily: 'inherit' }}
          />
          <span style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-secondary)' }}>/</span>
          <input type="number" min="1" max="100" value={fracDen}
            onChange={e => { setFracDen(Math.max(1, parseInt(e.target.value) || 1)); setStepIndex(0); }}
            style={{ width: 72, height: 48, textAlign: 'center', fontSize: 22, fontWeight: 800, border: '3px solid var(--purple)', borderRadius: 'var(--radius-md)', background: 'var(--surface)', color: 'var(--text-primary)', outline: 'none', fontFamily: 'inherit' }}
          />
        </div>
      )}

      <div style={{
        width: '100%', background: 'var(--surface)', borderRadius: 'var(--radius-lg)',
        padding: '24px', border: '2px solid var(--border)', boxShadow: 'var(--shadow-md)',
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 16, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Step-by-Step Conversion
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {steps.map((step, i) => {
            const isActive = i <= stepIndex;
            const isCurrent = i === stepIndex;
            const colors = ['var(--blue)', 'var(--purple)', 'var(--green)', 'var(--orange)'];
            const color = colors[i % colors.length];
            return (
              <motion.div key={i}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: isActive ? 1 : 0.3, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onClick={() => { if (i <= stepIndex) setStepIndex(i); }}
                style={{
                  padding: '14px 18px', borderRadius: 'var(--radius-md)',
                  background: isCurrent ? `${color}15` : 'var(--surface)',
                  border: `2px solid ${isCurrent ? color : 'var(--border)'}`,
                  cursor: i <= stepIndex ? 'pointer' : 'default',
                  transition: 'all 0.2s',
                }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 4 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', background: isActive ? color : 'var(--border)',
                    color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 800, flexShrink: 0,
                  }}>
                    {i + 1}
                  </div>
                  <span style={{ fontSize: 14, fontWeight: 700, color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)' }}>
                    {step.label}
                  </span>
                </div>
                {isActive && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                    style={{ paddingLeft: 38, fontSize: 18, fontWeight: 800, color: step.isFinal ? 'var(--green)' : color, lineHeight: 1.6 }}>
                    {step.detail}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 20 }}>
          <motion.button onClick={() => setStepIndex(Math.max(0, stepIndex - 1))} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            disabled={stepIndex === 0}
            style={{
              padding: '10px 20px', borderRadius: 'var(--radius-md)', border: '2px solid var(--border)',
              background: 'var(--surface)', fontSize: 14, fontWeight: 700, cursor: stepIndex === 0 ? 'default' : 'pointer',
              opacity: stepIndex === 0 ? 0.4 : 1, fontFamily: 'inherit', color: 'var(--text-primary)',
            }}>
            ← Back
          </motion.button>
          <motion.button onClick={() => setStepIndex(Math.min(steps.length - 1, stepIndex + 1))} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            disabled={stepIndex >= steps.length - 1}
            style={{
              padding: '10px 20px', borderRadius: 'var(--radius-md)', border: 'none',
              background: stepIndex >= steps.length - 1 ? 'var(--border)' : 'var(--purple)',
              color: stepIndex >= steps.length - 1 ? 'var(--text-secondary)' : 'white',
              fontSize: 14, fontWeight: 700, cursor: stepIndex >= steps.length - 1 ? 'default' : 'pointer',
              fontFamily: 'inherit',
            }}>
            Next →
          </motion.button>
        </div>
      </div>

      {direction === 'dtof' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, width: '100%' }}>
          <div style={{
            padding: '16px', borderRadius: 'var(--radius-md)', background: '#eff6ff',
            border: '2px solid #93c5fd', textAlign: 'center',
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#3b82f6', marginBottom: 4 }}>As Fraction</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#1e40af' }}>
              {(() => {
                const str = decVal.toString();
                const parts = str.split('.');
                const decPart = parts[1] || '';
                const num = parseInt(parts[0] + decPart) || 0;
                const den = Math.pow(10, decPart.length);
                const s = simplifyFraction(num, den);
                return `${s.num} / ${s.den}`;
              })()}
            </div>
          </div>
          <div style={{
            padding: '16px', borderRadius: 'var(--radius-md)', background: '#f0fdf4',
            border: '2px solid #86efac', textAlign: 'center',
          }}>
            <div style={{ fontSize: 11, fontWeight: 600, color: '#16a34a', marginBottom: 4 }}>As Percent</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: '#166534' }}>{(decVal * 100).toFixed(1)}%</div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

function CompareTab() {
  const [a, setA] = useState(3.75);
  const [b, setB] = useState(2.5);

  const cmp = a > b ? '>' : a < b ? '<' : '=';
  const maxVal = Math.max(a, b, 0.01);
  const barA = (a / maxVal) * 100;
  const barB = (b / maxVal) * 100;

  const barColors = { a: 'var(--blue)', b: 'var(--purple)' };

  return (
    <motion.div {...fadeIn} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
      <div style={{ display: 'flex', gap: 20, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>Number A</span>
          <input type="number" step="0.25" min="0" max="99.999" value={a}
            onChange={e => { const v = parseFloat(e.target.value); if (!isNaN(v) && v >= 0) setA(v); }}
            style={{
              width: 110, height: 52, textAlign: 'center', fontSize: 24, fontWeight: 800,
              border: '3px solid var(--blue)', borderRadius: 'var(--radius-lg)',
              background: 'var(--surface)', color: 'var(--text-primary)', outline: 'none', fontFamily: 'inherit',
            }}
          />
        </div>

        <motion.div key={cmp}
          initial={{ scale: 0, rotate: -180 }} animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 12 }}
          style={{
            width: 64, height: 64, borderRadius: '50%',
            background: cmp === '>' ? '#dcfce7' : cmp === '<' ? '#fef2f2' : '#f1f5f9',
            border: `3px solid ${cmp === '>' ? 'var(--green)' : cmp === '<' ? 'var(--red)' : 'var(--text-secondary)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 32, fontWeight: 900,
            color: cmp === '>' ? 'var(--green)' : cmp === '<' ? 'var(--red)' : 'var(--text-secondary)',
          }}>
          {cmp}
        </motion.div>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>Number B</span>
          <input type="number" step="0.25" min="0" max="99.999" value={b}
            onChange={e => { const v = parseFloat(e.target.value); if (!isNaN(v) && v >= 0) setB(v); }}
            style={{
              width: 110, height: 52, textAlign: 'center', fontSize: 24, fontWeight: 800,
              border: '3px solid var(--purple)', borderRadius: 'var(--radius-lg)',
              background: 'var(--surface)', color: 'var(--text-primary)', outline: 'none', fontFamily: 'inherit',
            }}
          />
        </div>
      </div>

      <div style={{
        width: '100%', background: 'var(--surface)', borderRadius: 'var(--radius-lg)',
        padding: '28px 24px', border: '2px solid var(--border)', boxShadow: 'var(--shadow-md)',
      }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', marginBottom: 20, textAlign: 'center', textTransform: 'uppercase', letterSpacing: '1px' }}>
          Magnitude Comparison
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: barColors.a, minWidth: 60, textAlign: 'right' }}>A = {a}</span>
            <div style={{ flex: 1, height: 36, background: '#eff6ff', borderRadius: 'var(--radius-md)', overflow: 'hidden', position: 'relative' }}>
              <motion.div
                initial={{ width: 0 }} animate={{ width: `${barA}%` }}
                transition={{ delay: 0.2, duration: 0.6, ease: 'easeOut' }}
                style={{
                  height: '100%', background: 'linear-gradient(90deg, #60a5fa, #3b82f6)',
                  borderRadius: 'var(--radius-md)',
                }}
              />
              <div style={{
                position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                fontSize: 14, fontWeight: 800, color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.2)',
              }}>
                {a}
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: barColors.b, minWidth: 60, textAlign: 'right' }}>B = {b}</span>
            <div style={{ flex: 1, height: 36, background: '#f3e8ff', borderRadius: 'var(--radius-md)', overflow: 'hidden', position: 'relative' }}>
              <motion.div
                initial={{ width: 0 }} animate={{ width: `${barB}%` }}
                transition={{ delay: 0.35, duration: 0.6, ease: 'easeOut' }}
                style={{
                  height: '100%', background: 'linear-gradient(90deg, #c084fc, #8b5cf6)',
                  borderRadius: 'var(--radius-md)',
                }}
              />
              <div style={{
                position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                fontSize: 14, fontWeight: 800, color: 'white', textShadow: '0 1px 3px rgba(0,0,0,0.2)',
              }}>
                {b}
              </div>
            </div>
          </div>
        </div>
      </div>

      <motion.div key={`result-${a}-${b}-${cmp}`}
        initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 15 }}
        style={{
          padding: '16px 28px', borderRadius: 'var(--radius-lg)',
          background: cmp === '=' ? '#f1f5f9' : cmp === '>' ? '#f0fdf4' : '#fef2f2',
          border: `2px solid ${cmp === '=' ? 'var(--border)' : cmp === '>' ? 'var(--green)' : 'var(--red)'}`,
          textAlign: 'center',
        }}>
        <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 4, fontWeight: 600 }}>Result</div>
        <div style={{ fontSize: 28, fontWeight: 900, color: 'var(--text-primary)' }}>
          {a} <span style={{
            fontSize: 32,
            color: cmp === '>' ? 'var(--green)' : cmp === '<' ? 'var(--red)' : 'var(--text-secondary)',
          }}>{cmp}</span> {b}
        </div>
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 4, fontWeight: 600 }}>
          {cmp === '=' ? 'Both numbers are equal' : cmp === '>' ? `A is ${(a - b).toFixed(3).replace(/0+$/, '').replace(/\.$/, '')} more than B` : `B is ${(b - a).toFixed(3).replace(/0+$/, '').replace(/\.$/, '')} more than A`}
        </div>
      </motion.div>

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, width: '100%',
      }}>
        <div style={{
          padding: '16px', borderRadius: 'var(--radius-md)', background: '#eff6ff',
          border: '2px solid #93c5fd', textAlign: 'center',
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#3b82f6', marginBottom: 4 }}>Sum</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#1e40af' }}>{(a + b).toFixed(3).replace(/0+$/, '').replace(/\.$/, '')}</div>
        </div>
        <div style={{
          padding: '16px', borderRadius: 'var(--radius-md)', background: '#f0fdf4',
          border: '2px solid #86efac', textAlign: 'center',
        }}>
          <div style={{ fontSize: 11, fontWeight: 600, color: '#16a34a', marginBottom: 4 }}>Difference</div>
          <div style={{ fontSize: 20, fontWeight: 800, color: '#166534' }}>{Math.abs(a - b).toFixed(3).replace(/0+$/, '').replace(/\.$/, '')}</div>
        </div>
      </div>
    </motion.div>
  );
}
