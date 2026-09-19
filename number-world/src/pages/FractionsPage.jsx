import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const gcd = (a, b) => (b === 0 ? Math.abs(a) : gcd(b, a % b));

function PieChart({ num, den, size = 120, delay = 0, label, color = 'var(--purple)' }) {
  const r = size / 2 - 2;
  const cx = size / 2;
  const cy = size / 2;
  const clampedNum = Math.min(Math.max(0, num), den);
  const angleStep = 360 / den;

  const slices = useMemo(() => {
    return Array.from({ length: den }, (_, i) => {
      const startAngle = (i * angleStep - 90) * (Math.PI / 180);
      const endAngle = ((i + 1) * angleStep - 90) * (Math.PI / 180);
      const x1 = cx + r * Math.cos(startAngle);
      const y1 = cy + r * Math.sin(startAngle);
      const x2 = cx + r * Math.cos(endAngle);
      const y2 = cy + r * Math.sin(endAngle);
      const largeArc = angleStep > 180 ? 1 : 0;
      const d = `M ${cx} ${cy} L ${x1} ${y1} A ${r} ${r} 0 ${largeArc} 1 ${x2} ${y2} Z`;
      return { d, filled: i < clampedNum };
    });
  }, [num, den, size]);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        <circle cx={cx} cy={cy} r={r} fill="var(--border)" stroke="var(--text-secondary)" strokeWidth="1" />
        {slices.map((s, i) => (
          <motion.path
            key={i}
            d={s.d}
            fill={s.filled ? color : 'var(--surface)'}
            stroke="var(--text-secondary)"
            strokeWidth="0.5"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: delay + i * 0.04, type: 'spring', stiffness: 300, damping: 20 }}
            style={{ transformOrigin: `${cx}px ${cy}px` }}
          />
        ))}
      </svg>
      {label && <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600 }}>{label}</span>}
    </div>
  );
}

function BarModel({ num, den, height = 32, color = 'var(--purple)', delay = 0 }) {
  const clampedNum = Math.min(Math.max(0, num), den);
  return (
    <div style={{ display: 'flex', width: '100%', height, borderRadius: 'var(--radius-md)', overflow: 'hidden', border: '1px solid var(--border)' }}>
      {Array.from({ length: den }, (_, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ delay: delay + i * 0.03, type: 'spring', stiffness: 300, damping: 20 }}
          style={{ flex: 1, background: i < clampedNum ? color : 'var(--surface)', borderRight: i < den - 1 ? '1px solid var(--border)' : 'none', transformOrigin: 'bottom' }}
        />
      ))}
    </div>
  );
}

function FractionInput({ num, den, onNumChange, onDenChange, numLabel = 'Numerator', denLabel = 'Denominator' }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input
          type="number" min={0} max={20} value={num}
          onChange={e => onNumChange(Math.min(20, Math.max(0, parseInt(e.target.value) || 0)))}
          style={{ width: 64, height: 44, textAlign: 'center', fontSize: 20, fontWeight: 700, border: '2px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--surface)', color: 'var(--text-primary)', outline: 'none' }}
        />
        <span style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>{numLabel}</span>
      </div>
      <span style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-secondary)', lineHeight: 1 }}>/</span>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <input
          type="number" min={1} max={20} value={den}
          onChange={e => onDenChange(Math.min(20, Math.max(1, parseInt(e.target.value) || 1)))}
          style={{ width: 64, height: 44, textAlign: 'center', fontSize: 20, fontWeight: 700, border: '2px solid var(--border)', borderRadius: 'var(--radius-md)', background: 'var(--surface)', color: 'var(--text-primary)', outline: 'none' }}
        />
        <span style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>{denLabel}</span>
      </div>
    </div>
  );
}

const TABS = ['Visual Builder', 'Compare', 'Add / Subtract', 'Equivalents'];

const fadeIn = { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 } };

export default function FractionsPage() {
  const [tab, setTab] = useState(0);

  return (
    <div style={{ maxWidth: 720, margin: '0 auto', padding: '24px 16px 64px' }}>
      <motion.div {...fadeIn} style={{ textAlign: 'center', marginBottom: 28 }}>
        <h1 style={{ fontSize: 32, fontWeight: 800, color: 'var(--text-primary)', marginBottom: 4 }}>Fractions</h1>
        <p style={{ fontSize: 15, color: 'var(--text-secondary)' }}>Parts of a whole — visual fraction models</p>
      </motion.div>

      <div style={{ display: 'flex', gap: 6, marginBottom: 28, background: 'var(--surface)', borderRadius: 'var(--radius-lg)', padding: 4, border: '1px solid var(--border)' }}>
        {TABS.map((t, i) => (
          <motion.button
            key={t}
            onClick={() => setTab(i)}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            style={{
              flex: 1, padding: '10px 4px', borderRadius: 'var(--radius-md)', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600,
              background: tab === i ? 'var(--purple)' : 'transparent',
              color: tab === i ? '#fff' : 'var(--text-secondary)',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            {t}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === 0 && <VisualBuilder key="vb" />}
        {tab === 1 && <CompareMode key="cm" />}
        {tab === 2 && <AddSubtractMode key="as" />}
        {tab === 3 && <EquivalentsWall key="ew" />}
      </AnimatePresence>
    </div>
  );
}

function VisualBuilder() {
  const [num, setNum] = useState(3);
  const [den, setDen] = useState(4);
  const simplified = useMemo(() => {
    const g = gcd(num, den);
    return { num: num / g, den: den / g };
  }, [num, den]);
  const isSimplified = simplified.num === num && simplified.den === den;

  return (
    <motion.div {...fadeIn} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 28 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
        <FractionInput num={num} den={den} onNumChange={setNum} onDenChange={setDen} />
      </div>

      <PieChart num={num} den={den} size={180} />

      <div style={{ width: '100%' }}>
        <BarModel num={num} den={den} />
      </div>

      <motion.div
        key={`${num}-${den}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ textAlign: 'center', padding: '12px 20px', borderRadius: 'var(--radius-md)', background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--purple)' }}>{num} / {den}</span>
        {!isSimplified && (
          <span style={{ fontSize: 15, color: 'var(--text-secondary)', marginLeft: 12 }}>
            = <strong style={{ color: 'var(--green)' }}>{simplified.num} / {simplified.den}</strong> (simplified)
          </span>
        )}
        {isSimplified && <span style={{ fontSize: 13, color: 'var(--text-secondary)', marginLeft: 12 }}>already simplified</span>}
      </motion.div>
    </motion.div>
  );
}

function CompareMode() {
  const [a, setA] = useState(2);
  const [bD, setBD] = useState(3);
  const [c, setC] = useState(3);
  const [dD, setDD] = useState(4);

  const left = a * dD;
  const right = c * bD;
  const cmp = left > right ? '>' : left < right ? '<' : '=';

  return (
    <motion.div {...fadeIn} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>Fraction A</span>
          <FractionInput num={a} den={bD} onNumChange={setA} onDenChange={setBD} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>Fraction B</span>
          <FractionInput num={c} den={dD} onNumChange={setC} onDenChange={setDD} />
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 20, flexWrap: 'wrap', justifyContent: 'center' }}>
        <PieChart num={a} den={bD} size={130} color="var(--blue)" label={`${a}/${bD}`} />
        <motion.span
          key={cmp}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 400, damping: 15 }}
          style={{ fontSize: 40, fontWeight: 900, color: cmp === '>' ? 'var(--green)' : cmp === '<' ? 'var(--red)' : 'var(--text-secondary)' }}
        >
          {cmp}
        </motion.span>
        <PieChart num={c} den={dD} size={130} color="var(--purple)" label={`${c}/${dD}`} />
      </div>

      <motion.div
        key={`${a}-${bD}-${c}-${dD}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{ padding: '12px 20px', borderRadius: 'var(--radius-md)', background: 'var(--surface)', border: '1px solid var(--border)', textAlign: 'center' }}
      >
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 4 }}>Cross multiplication</div>
        <div style={{ fontSize: 18, fontWeight: 700 }}>
          <span style={{ color: 'var(--blue)' }}>{a}</span> × <span style={{ color: 'var(--purple)' }}>{dD}</span> = <strong>{left}</strong>
          <span style={{ margin: '0 10px', color: 'var(--text-secondary)' }}>{cmp}</span>
          <span style={{ color: 'var(--purple)' }}>{c}</span> × <span style={{ color: 'var(--blue)' }}>{bD}</span> = <strong>{right}</strong>
        </div>
      </motion.div>
    </motion.div>
  );
}

function AddSubtractMode() {
  const [a, setA] = useState(1);
  const [bD, setBD] = useState(4);
  const [c, setC] = useState(1);
  const [dD, setDD] = useState(3);
  const [op, setOp] = useState('+');

  const commonD = bD * dD;
  const numA = a * dD;
  const numC = c * bD;
  const resultNum = op === '+' ? numA + numC : numA - numC;
  const resultGcd = gcd(Math.abs(resultNum), commonD);
  const simpNum = resultNum / resultGcd;
  const simpDen = commonD / resultGcd;

  return (
    <motion.div {...fadeIn} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
      <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>Fraction A</span>
          <FractionInput num={a} den={bD} onNumChange={setA} onDenChange={setBD} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)', textAlign: 'center' }}>Operation</span>
          <div style={{ display: 'flex', border: '2px solid var(--border)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
            {['+', '-'].map(o => (
              <motion.button
                key={o}
                onClick={() => setOp(o)}
                whileTap={{ scale: 0.9 }}
                style={{
                  width: 44, height: 44, fontSize: 22, fontWeight: 800, border: 'none', cursor: 'pointer',
                  background: op === o ? 'var(--purple)' : 'var(--surface)',
                  color: op === o ? '#fff' : 'var(--text-secondary)',
                }}
              >
                {o}
              </motion.button>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
          <span style={{ fontSize: 12, fontWeight: 600, color: 'var(--text-secondary)' }}>Fraction B</span>
          <FractionInput num={c} den={dD} onNumChange={setC} onDenChange={setDD} />
        </div>
      </div>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)', textAlign: 'center' }}>Step-by-step</div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--blue)' }}>{a}/{bD}</span>
            <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>× {dD}/{dD}</span>
          </div>
          <span style={{ fontSize: 16, color: 'var(--text-secondary)', fontWeight: 700 }}>{op}</span>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--purple)' }}>{c}/{dD}</span>
            <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>× {bD}/{bD}</span>
          </div>
          <span style={{ fontSize: 16, color: 'var(--text-secondary)', fontWeight: 700 }}>=</span>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <span style={{ fontSize: 16, fontWeight: 700, color: 'var(--green)' }}>{numA}/{commonD} {op} {numC}/{commonD}</span>
            <span style={{ fontSize: 11, color: 'var(--text-secondary)' }}>common denominator: {commonD}</span>
          </div>
        </div>
      </div>

      <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <BarModel num={a} den={bD} color="var(--blue)" delay={0} />
        <BarModel num={c} den={dD} color="var(--purple)" delay={0.1} />
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
          <span style={{ fontSize: 18, color: 'var(--text-secondary)' }}>{op}</span>
        </div>
        <BarModel num={Math.abs(resultNum)} den={commonD} color="var(--green)" delay={0.2} />
      </div>

      <motion.div
        key={`${a}-${bD}-${c}-${dD}-${op}`}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        style={{ textAlign: 'center', padding: '12px 20px', borderRadius: 'var(--radius-md)', background: 'var(--surface)', border: '1px solid var(--border)' }}
      >
        <span style={{ fontSize: 22, fontWeight: 800, color: 'var(--green)' }}>{a}/{bD} {op} {c}/{dD} = {resultNum}/{commonD}</span>
        {simpDen !== commonD && (
          <div style={{ fontSize: 15, color: 'var(--text-secondary)', marginTop: 4 }}>
            = <strong style={{ color: 'var(--green)' }}>{simpNum}/{simpDen}</strong> (simplified)
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}

function EquivalentsWall() {
  const [num, setNum] = useState(3);
  const [den, setDen] = useState(4);

  const equivalents = useMemo(() => {
    const g = gcd(num, den);
    const baseNum = num / g;
    const baseDen = den / g;
    const results = [];
    for (let i = 1; i <= 10; i++) {
      const n = baseNum * i;
      const d = baseDen * i;
      if (d <= 20 && n <= 20) {
        results.push({ num: n, den: d });
      }
    }
    return results;
  }, [num, den]);

  return (
    <motion.div {...fadeIn} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 24 }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4 }}>
        <span style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Enter a fraction</span>
        <FractionInput num={num} den={den} onNumChange={setNum} onDenChange={setDen} />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))', gap: 16, width: '100%' }}>
        <AnimatePresence>
          {equivalents.map((eq, i) => (
            <motion.div
              key={`${eq.num}-${eq.den}`}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ delay: i * 0.06, type: 'spring', stiffness: 300, damping: 20 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 4, padding: 12, borderRadius: 'var(--radius-md)', background: 'var(--surface)', border: '1px solid var(--border)' }}
            >
              <PieChart num={eq.num} den={eq.den} size={72} delay={i * 0.06} />
              <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--purple)' }}>{eq.num}/{eq.den}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {equivalents.length === 0 && (
        <div style={{ padding: 20, color: 'var(--text-secondary)', fontSize: 14 }}>No equivalent fractions within range (max 20)</div>
      )}
    </motion.div>
  );
}
