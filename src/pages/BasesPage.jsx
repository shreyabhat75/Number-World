import { useState, useMemo, useCallback, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TABS = ['Converter', 'Binary Explorer', 'Learn', 'Hex Colors'];

const fadeIn = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } };

function toBase(num, base) {
  if (num === 0) return '0';
  const digits = '0123456789ABCDEF';
  let result = '';
  let n = num;
  while (n > 0) {
    result = digits[n % base] + result;
    n = Math.floor(n / base);
  }
  return result;
}

function toBinary8(num) {
  return num.toString(2).padStart(8, '0');
}

const BASE_COLORS = {
  2: { bg: '#eff6ff', border: '#93c5fd', text: '#1e40af', accent: '#3b82f6' },
  8: { bg: '#f5f3ff', border: '#c4b5fd', text: '#5b21b6', accent: '#8b5cf6' },
  10: { bg: '#f0fdf4', border: '#86efac', text: '#166534', accent: '#10b981' },
  16: { bg: '#fdf2f8', border: '#f9a8d4', text: '#9d174d', accent: '#ec4899' },
};

function showToast(msg, setToast) {
  setToast(msg);
  setTimeout(() => setToast(null), 1800);
}

function useCopyToast(setToast) {
  return useCallback((text) => {
    navigator.clipboard.writeText(text).then(() => {
      showToast(`Copied "${text}" to clipboard!`, setToast);
    }).catch(() => {});
  }, [setToast]);
}

export default function BasesPage() {
  const [tab, setTab] = useState(0);
  const [toast, setToast] = useState(null);

  return (
    <div style={{ maxWidth: 800, margin: '0 auto', padding: '24px 16px 64px' }}>
      <motion.div {...fadeIn} style={{ textAlign: 'center', marginBottom: 28 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>Number Bases</h1>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)' }}>Binary, octal, hexadecimal &mdash; how numbers work in different bases.</p>
      </motion.div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 28, background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: 4, border: '1px solid var(--border)', flexWrap: 'wrap' }}>
        {TABS.map((t, i) => (
          <motion.button key={t} onClick={() => setTab(i)} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
            style={{
              flex: 1, minWidth: 0, padding: '10px 4px', borderRadius: 'var(--radius-md)', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600, fontFamily: 'inherit',
              background: tab === i ? 'var(--purple)' : 'transparent',
              color: tab === i ? '#fff' : 'var(--text-secondary)',
              transition: 'background 0.2s, color 0.2s',
            }}>
            {t}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === 0 && <ConverterTab key="conv" toast={toast} setToast={setToast} />}
        {tab === 1 && <BinaryExplorerTab key="bin" toast={toast} setToast={setToast} />}
        {tab === 2 && <LearnTab key="learn" />}
        {tab === 3 && <HexColorsTab key="hex" toast={toast} setToast={setToast} />}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            style={{
              position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)',
              background: '#1e293b', color: '#fff', padding: '12px 24px',
              borderRadius: 'var(--radius-lg)', fontSize: 14, fontWeight: 700,
              boxShadow: '0 8px 30px rgba(0,0,0,0.25)', zIndex: 9999,
            }}>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ConverterTab({ toast, setToast }) {
  const [decimal, setDecimal] = useState(42);
  const copy = useCopyToast(setToast);

  const clamped = Math.max(0, Math.min(255, decimal));

  return (
    <motion.div {...fadeIn} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)' }}>Decimal number:</span>
        <input type="number" min="0" max="255" value={decimal}
          onChange={e => setDecimal(Math.max(0, Math.min(255, parseInt(e.target.value) || 0)))}
          style={{
            width: 110, height: 52, textAlign: 'center', fontSize: 28, fontWeight: 800,
            border: '3px solid var(--purple)', borderRadius: 'var(--radius-lg)',
            background: 'var(--surface)', color: 'var(--text-primary)', outline: 'none', fontFamily: 'inherit',
          }}
        />
      </div>

      <input type="range" min="0" max="255" value={clamped}
        onChange={e => setDecimal(parseInt(e.target.value))}
        style={{
          width: '100%', maxWidth: 400, height: 6, WebkitAppearance: 'none', appearance: 'none',
          background: 'linear-gradient(90deg, #c084fc, #8b5cf6, #6366f1)',
          borderRadius: 10, outline: 'none', cursor: 'pointer',
        }}
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, width: '100%', maxWidth: 600 }}>
        <ConverterCard
          label="Binary" base={2} value={toBase(clamped, 2)}
          onClick={() => copy(toBase(clamped, 2))}
          toast={toast}
        />
        <ConverterCard
          label="Octal" base={8} value={toBase(clamped, 8)}
          onClick={() => copy(toBase(clamped, 8))}
          toast={toast}
        />
        <ConverterCard
          label="Decimal" base={10} value={toBase(clamped, 10)}
          onClick={() => copy(toBase(clamped, 10))}
          toast={toast}
        />
        <ConverterCard
          label="Hexadecimal" base={16} value={toBase(clamped, 16)}
          onClick={() => copy(toBase(clamped, 16))}
          toast={toast}
          isHex
        />
      </div>
    </motion.div>
  );
}

function ConverterCard({ label, base, value, onClick, toast, isHex }) {
  const c = BASE_COLORS[base];
  const [justCopied, setJustCopied] = useState(false);

  useEffect(() => {
    if (justCopied) {
      const t = setTimeout(() => setJustCopied(false), 600);
      return () => clearTimeout(t);
    }
  }, [justCopied]);

  return (
    <motion.div
      whileHover={{ scale: 1.03, y: -3 }}
      whileTap={{ scale: 0.97 }}
      onClick={() => { onClick(); setJustCopied(true); }}
      style={{
        background: c.bg, border: `2px solid ${c.border}`, borderRadius: 'var(--radius-lg)',
        padding: '20px 16px', cursor: 'pointer', userSelect: 'none', position: 'relative', overflow: 'hidden',
      }}>
      <div style={{ fontSize: 12, fontWeight: 700, color: c.accent, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: 8 }}>
        {label} (Base {base})
      </div>

      {isHex ? (
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', minHeight: 44, alignItems: 'center' }}>
          {value.split('').map((ch, i) => (
            <motion.span key={`${ch}-${i}`}
              initial={{ scale: 0 }} animate={{ scale: 1 }}
              transition={{ delay: i * 0.06, type: 'spring', stiffness: 400, damping: 15 }}
              style={{
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                width: 36, height: 40, borderRadius: 10, fontSize: 22, fontWeight: 800,
                background: ch >= 'A' ? `${c.accent}20` : `${c.text}10`,
                color: ch >= 'A' ? c.accent : c.text,
                border: `2px solid ${ch >= 'A' ? c.accent : c.text}40`,
              }}>
              {ch}
            </motion.span>
          ))}
        </div>
      ) : (
        <motion.div key={value}
          initial={{ scale: 0.85, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          style={{ fontSize: base === 2 ? 24 : 36, fontWeight: 900, color: c.text, minHeight: 44, display: 'flex', alignItems: 'center', wordBreak: 'break-all', lineHeight: 1.2 }}>
          {base === 2 ? (
            <div style={{ display: 'flex', gap: 3 }}>
              {value.split('').map((bit, i) => (
                <motion.span key={`${bit}-${i}`}
                  initial={{ rotateX: 90, opacity: 0 }} animate={{ rotateX: 0, opacity: 1 }}
                  transition={{ delay: i * 0.04, type: 'spring', stiffness: 500, damping: 20 }}
                  style={{
                    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                    width: 28, height: 36, borderRadius: 8,
                    background: bit === '1' ? `${c.accent}` : `${c.text}10`,
                    color: bit === '1' ? '#fff' : c.text,
                    fontSize: 18, fontWeight: 800,
                    boxShadow: bit === '1' ? `0 2px 10px ${c.accent}60` : 'none',
                  }}>
                  {bit}
                </motion.span>
              ))}
            </div>
          ) : value}
        </motion.div>
      )}

      <div style={{
        position: 'absolute', top: 8, right: 10, fontSize: 10, fontWeight: 700, color: justCopied ? 'var(--green)' : c.text,
        opacity: justCopied ? 1 : 0.5, transition: 'all 0.2s',
      }}>
        {justCopied ? 'Copied!' : 'Click to copy'}
      </div>
    </motion.div>
  );
}

function BinaryExplorerTab({ toast, setToast }) {
  const [bits, setBits] = useState(() => toBinary8(42).split('').map(Number));
  const copy = useCopyToast(setToast);

  const decimal = useMemo(() => parseInt(bits.join(''), 2), [bits]);
  const binStr = bits.join('');

  const toggleBit = (idx) => {
    setBits(prev => {
      const next = [...prev];
      next[idx] = next[idx] ? 0 : 1;
      return next;
    });
  };

  const powers = [128, 64, 32, 16, 8, 4, 2, 1];

  return (
    <motion.div {...fadeIn} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)' }}>Enter decimal:</span>
        <input type="number" min="0" max="255" value={decimal}
          onChange={e => {
            const v = Math.max(0, Math.min(255, parseInt(e.target.value) || 0));
            setBits(toBinary8(v).split('').map(Number));
          }}
          style={{
            width: 110, height: 52, textAlign: 'center', fontSize: 28, fontWeight: 800,
            border: '3px solid var(--blue)', borderRadius: 'var(--radius-lg)',
            background: 'var(--surface)', color: 'var(--text-primary)', outline: 'none', fontFamily: 'inherit',
          }}
        />
        <span style={{ fontSize: 20, fontWeight: 700, color: 'var(--text-secondary)' }}>=</span>
        <motion.span key={decimal}
          initial={{ scale: 0.7, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          style={{ fontSize: 36, fontWeight: 900, color: 'var(--blue)', minWidth: 60, textAlign: 'center' }}>
          {decimal}
        </motion.span>
      </div>

      <div style={{
        width: '100%', background: 'var(--surface)', borderRadius: 'var(--radius-lg)',
        padding: '28px 20px', border: '2px solid var(--border)', boxShadow: 'var(--shadow-md)',
      }}>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', flexWrap: 'wrap' }}>
          {bits.map((bit, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--text-tertiary)', marginBottom: 2 }}>
                2<sup style={{ fontSize: 8 }}>{7 - i}</sup>
              </div>
              <motion.button
                onClick={() => toggleBit(i)}
                whileTap={{ scale: 0.85 }}
                animate={{
                  scale: [1, 1.15, 1],
                  boxShadow: bit ? ['0 2px 8px rgba(59,130,246,0.3)', '0 4px 20px rgba(59,130,246,0.6)', '0 2px 8px rgba(59,130,246,0.3)'] : '0 1px 4px rgba(0,0,0,0.1)',
                }}
                transition={{ type: 'spring', stiffness: 500, damping: 15 }}
                style={{
                  width: 56, height: 64, borderRadius: 'var(--radius-md)',
                  border: `3px solid ${bit ? 'var(--blue)' : 'var(--border)'}`,
                  background: bit ? 'linear-gradient(135deg, #60a5fa, #3b82f6)' : '#f8fafc',
                  color: bit ? '#fff' : 'var(--text-secondary)',
                  fontSize: 24, fontWeight: 900, cursor: 'pointer', fontFamily: 'inherit',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  boxShadow: bit ? '0 4px 15px rgba(59,130,246,0.4)' : 'var(--shadow-sm)',
                }}>
                {bit}
              </motion.button>

              <div style={{ fontSize: 12, fontWeight: 800, color: bit ? 'var(--blue)' : 'var(--text-tertiary)' }}>
                {powers[i]}
              </div>

              <div style={{ width: 48, height: 6, borderRadius: 3, background: '#e5e7eb', overflow: 'hidden' }}>
                <motion.div
                  animate={{ width: bit ? '100%' : '0%' }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  style={{ height: '100%', borderRadius: 3, background: 'linear-gradient(90deg, #60a5fa, #3b82f6)' }}
                />
              </div>
            </div>
          ))}
        </div>

        <div style={{
          marginTop: 20, padding: '12px 16px', borderRadius: 'var(--radius-md)',
          background: '#eff6ff', border: '2px solid #93c5fd', textAlign: 'center',
          display: 'flex', flexWrap: 'wrap', gap: 4, justifyContent: 'center', alignItems: 'center',
          cursor: 'pointer',
        }} onClick={() => copy(binStr)}>
          <span style={{ fontSize: 13, fontWeight: 700, color: '#3b82f6' }}>
            Binary: {binStr} &nbsp;=&nbsp; {bits.map((b, i) => b ? `${b}×${powers[i]}` : null).filter(Boolean).join(' + ')} = <strong>{decimal}</strong>
          </span>
          <span style={{ fontSize: 11, color: '#93c5fd', marginLeft: 4 }}>&#128203;</span>
        </div>
      </div>
    </motion.div>
  );
}

const LEARN_EXAMPLES = [
  { num: 42, label: '42' },
  { num: 15, label: '15' },
  { num: 100, label: '100' },
  { num: 255, label: '255' },
];

function LearnTab() {
  const [exampleIdx, setExampleIdx] = useState(0);
  const [stepIdx, setStepIdx] = useState(0);

  const num = LEARN_EXAMPLES[exampleIdx].num;

  const steps = useMemo(() => {
    const result = [];
    let n = num;
    const divSteps = [];
    while (n > 0) {
      const q = Math.floor(n / 2);
      const r = n % 2;
      divSteps.push({ n, q, r });
      n = q;
    }
    const binaryStr = [...divSteps].reverse().map(s => s.r).join('');
    divSteps.forEach((s, i) => {
      result.push({
        label: `Divide ${s.n} by 2`,
        detail: `${s.n} ÷ 2 = ${s.q} remainder ${s.r}`,
        remainder: s.r,
      });
    });
    result.push({
      label: 'Read remainders bottom to top',
      detail: binaryStr,
      isFinal: true,
      binaryStr,
    });
    return result;
  }, [num]);

  return (
    <motion.div {...fadeIn} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
        {LEARN_EXAMPLES.map((ex, i) => (
          <motion.button key={ex.num} onClick={() => { setExampleIdx(i); setStepIdx(0); }}
            whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}
            style={{
              padding: '10px 20px', borderRadius: 'var(--radius-md)', border: '2px solid',
              borderColor: i === exampleIdx ? 'var(--green)' : 'var(--border)',
              background: i === exampleIdx ? '#dcfce7' : 'var(--surface)',
              color: i === exampleIdx ? '#166534' : 'var(--text-secondary)',
              fontSize: 15, fontWeight: 700, cursor: 'pointer', fontFamily: 'inherit',
            }}>
            Convert {ex.label}
          </motion.button>
        ))}
      </div>

      <div style={{
        width: '100%', background: 'var(--surface)', borderRadius: 'var(--radius-lg)',
        padding: '28px 24px', border: '2px solid var(--border)', boxShadow: 'var(--shadow-md)',
      }}>
        <div style={{ textAlign: 'center', marginBottom: 20 }}>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-secondary)' }}>Convert </span>
          <span style={{ fontSize: 28, fontWeight: 900, color: 'var(--green)' }}>{num}</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--text-secondary)' }}> to binary</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {steps.map((step, i) => {
            const isActive = i <= stepIdx;
            const isCurrent = i === stepIdx;
            const colors = ['var(--blue)', 'var(--purple)', 'var(--green)', 'var(--orange)'];
            const color = step.isFinal ? 'var(--green)' : colors[i % colors.length];
            return (
              <motion.div key={i}
                initial={{ opacity: 0, x: -20 }} animate={{ opacity: isActive ? 1 : 0.3, x: 0 }}
                transition={{ delay: i * 0.1 }}
                style={{
                  padding: '14px 18px', borderRadius: 'var(--radius-md)',
                  background: isCurrent ? `${color}15` : 'var(--surface)',
                  border: `2px solid ${isCurrent ? color : 'var(--border)'}`,
                  transition: 'all 0.3s',
                }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div style={{
                    width: 28, height: 28, borderRadius: '50%', background: isActive ? color : 'var(--border)',
                    color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
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
                    style={{ paddingLeft: 38, fontSize: step.isFinal ? 22 : 18, fontWeight: 800, color: color, lineHeight: 1.6, marginTop: 4 }}>
                    {step.detail}
                  </motion.div>
                )}
              </motion.div>
            );
          })}
        </div>

        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 20 }}>
          <motion.button onClick={() => setStepIdx(Math.max(0, stepIdx - 1))} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            disabled={stepIdx === 0}
            style={{
              padding: '10px 20px', borderRadius: 'var(--radius-md)', border: '2px solid var(--border)',
              background: 'var(--surface)', fontSize: 14, fontWeight: 700,
              cursor: stepIdx === 0 ? 'default' : 'pointer',
              opacity: stepIdx === 0 ? 0.4 : 1, fontFamily: 'inherit', color: 'var(--text-primary)',
            }}>
            ← Back
          </motion.button>
          <motion.button onClick={() => setStepIdx(Math.min(steps.length - 1, stepIdx + 1))} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            disabled={stepIdx >= steps.length - 1}
            style={{
              padding: '10px 20px', borderRadius: 'var(--radius-md)', border: 'none',
              background: stepIdx >= steps.length - 1 ? 'var(--border)' : 'var(--green)',
              color: stepIdx >= steps.length - 1 ? 'var(--text-secondary)' : '#fff',
              fontSize: 14, fontWeight: 700,
              cursor: stepIdx >= steps.length - 1 ? 'default' : 'pointer',
              fontFamily: 'inherit',
            }}>
            Next Step →
          </motion.button>
        </div>
      </div>

      {stepIdx >= steps.length - 1 && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 15 }}
          style={{
            padding: '16px 24px', borderRadius: 'var(--radius-lg)',
            background: '#dcfce7', border: '2px solid #86efac', textAlign: 'center',
          }}>
          <div style={{ fontSize: 14, fontWeight: 700, color: '#166534', marginBottom: 6 }}>
            Result: {num} in binary is
          </div>
          <div style={{ fontSize: 28, fontWeight: 900, color: '#166534' }}>
            {steps[steps.length - 1].binaryStr}
          </div>
          <div style={{ fontSize: 12, color: '#166534', marginTop: 4, fontWeight: 600 }}>
            Reading remainders from bottom to top gives us the binary representation!
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}

function HexColorsTab({ toast, setToast }) {
  const [hexInput, setHexInput] = useState('#2A6BEF');
  const [mode, setMode] = useState('input');
  const [rgb, setRgb] = useState({ r: 42, g: 107, b: 239 });
  const copy = useCopyToast(setToast);

  const parseHex = (hex) => {
    const cleaned = hex.replace('#', '');
    if (cleaned.length !== 6) return null;
    const r = parseInt(cleaned.slice(0, 2), 16);
    const g = parseInt(cleaned.slice(2, 4), 16);
    const b = parseInt(cleaned.slice(4, 6), 16);
    if (isNaN(r) || isNaN(g) || isNaN(b)) return null;
    return { r, g, b };
  };

  const fromInputRgb = useMemo(() => parseHex(hexInput), [hexInput]);

  useEffect(() => {
    if (mode === 'input' && fromInputRgb) {
      setRgb(fromInputRgb);
    }
  }, [fromInputRgb, mode]);

  const currentRgb = fromInputRgb || { r: 0, g: 0, b: 0 };
  const currentHex = `#${currentRgb.r.toString(16).padStart(2, '0')}${currentRgb.g.toString(16).padStart(2, '0')}${currentRgb.b.toString(16).padStart(2, '0')}`.toUpperCase();

  const channelColors = [
    { label: 'R', key: 'r', color: '#ef4444', bg: '#fef2f2' },
    { label: 'G', key: 'g', color: '#22c55e', bg: '#f0fdf4' },
    { label: 'B', key: 'b', color: '#3b82f6', bg: '#eff6ff' },
  ];

  const updateChannel = (key, val) => {
    setRgb(prev => ({ ...prev, [key]: val }));
  };

  return (
    <motion.div {...fadeIn} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
      <div style={{ display: 'flex', border: '2px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
        {[{ key: 'input', label: 'Hex Input' }, { key: 'sliders', label: 'RGB Sliders' }].map(opt => (
          <motion.button key={opt.key} onClick={() => setMode(opt.key)} whileTap={{ scale: 0.95 }}
            style={{
              padding: '10px 20px', fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer', fontFamily: 'inherit',
              background: mode === opt.key ? 'var(--purple)' : 'var(--surface)',
              color: mode === opt.key ? '#fff' : 'var(--text-secondary)',
            }}>
            {opt.label}
          </motion.button>
        ))}
      </div>

      {mode === 'input' && (
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)' }}>Hex color:</span>
          <input type="text" maxLength={7} value={hexInput}
            onChange={e => {
              const v = e.target.value;
              if (/^#?[0-9A-Fa-f]{0,6}$/.test(v)) setHexInput(v.startsWith('#') ? v : `#${v}`);
            }}
            style={{
              width: 140, height: 52, textAlign: 'center', fontSize: 24, fontWeight: 800,
              border: '3px solid var(--purple)', borderRadius: 'var(--radius-lg)',
              background: 'var(--surface)', color: 'var(--text-primary)', outline: 'none', fontFamily: 'monospace',
            }}
          />
        </div>
      )}

      <div style={{
        width: '100%', maxWidth: 500, aspectRatio: '2 / 1', borderRadius: 'var(--radius-lg)',
        background: currentHex, border: '3px solid var(--border)',
        boxShadow: `0 8px 30px ${currentHex}40`, transition: 'background 0.2s',
        cursor: 'pointer', display: 'flex', alignItems: 'flex-end', justifyContent: 'center', padding: 12,
      }} onClick={() => copy(currentHex)}>
        <div style={{
          background: 'rgba(0,0,0,0.55)', color: '#fff', padding: '6px 16px',
          borderRadius: 'var(--radius-md)', fontSize: 16, fontWeight: 800, letterSpacing: '1px',
        }}>
          {currentHex} &#128203;
        </div>
      </div>

      {mode === 'sliders' && (
        <div style={{ width: '100%', maxWidth: 500, display: 'flex', flexDirection: 'column', gap: 16 }}>
          {channelColors.map(ch => (
            <div key={ch.key} style={{
              background: ch.bg, border: `2px solid ${ch.color}40`, borderRadius: 'var(--radius-md)', padding: '14px 18px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
                <div style={{
                  width: 28, height: 28, borderRadius: '50%', background: ch.color,
                  color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 14, fontWeight: 900,
                }}>
                  {ch.label}
                </div>
                <span style={{ fontSize: 20, fontWeight: 800, color: ch.color, minWidth: 40 }}>
                  {rgb[ch.key]}
                </span>
                <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--text-tertiary)', marginLeft: 'auto' }}>
                  {toBase(rgb[ch.key], 2).padStart(8, '0')}
                </span>
              </div>
              <input type="range" min="0" max="255" value={rgb[ch.key]}
                onChange={e => updateChannel(ch.key, parseInt(e.target.value))}
                style={{
                  width: '100%', height: 8, WebkitAppearance: 'none', appearance: 'none',
                  background: `linear-gradient(90deg, #000, ${ch.color})`,
                  borderRadius: 10, outline: 'none', cursor: 'pointer',
                }}
              />
            </div>
          ))}
        </div>
      )}

      <div style={{
        display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 10, width: '100%', maxWidth: 500,
      }}>
        {channelColors.map(ch => (
          <motion.div key={ch.key} whileHover={{ scale: 1.04 }}
            onClick={() => copy(`${ch.label}: ${rgb[ch.key]}`)}
            style={{
              background: 'var(--surface)', border: '2px solid var(--border)',
              borderRadius: 'var(--radius-md)', padding: '12px 10px', textAlign: 'center', cursor: 'pointer',
            }}>
            <div style={{ width: 12, height: 12, borderRadius: '50%', background: ch.color, margin: '0 auto 6px' }} />
            <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>
              {ch.label}
            </div>
            <div style={{ fontSize: 18, fontWeight: 900, color: ch.color }}>
              {rgb[ch.key]}
            </div>
            <div style={{ fontSize: 10, fontWeight: 600, color: 'var(--text-tertiary)', fontFamily: 'monospace' }}>
              {toBase(rgb[ch.key], 2).padStart(8, '0')}
            </div>
          </motion.div>
        ))}
      </div>

      <div style={{
        width: '100%', maxWidth: 500, background: 'var(--surface)', borderRadius: 'var(--radius-md)',
        padding: '12px 16px', border: '1px solid var(--border)', textAlign: 'center',
        fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)', fontFamily: 'monospace',
      }}>
        {currentHex} &nbsp;|&nbsp; rgb({rgb.r}, {rgb.g}, {rgb.b}) &nbsp;|&nbsp;
        {rgb.r.toString(2).padStart(8, '0')} {rgb.g.toString(2).padStart(8, '0')} {rgb.b.toString(2).padStart(8, '0')}
      </div>
    </motion.div>
  );
}
