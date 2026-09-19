import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const tabs = [
  { id: 'commutative', label: 'Commutative' },
  { id: 'associative', label: 'Associative' },
  { id: 'distributive', label: 'Distributive' },
  { id: 'identity', label: 'Identity & Inverse' },
]

const colors = ['#8b5cf6', '#3b82f6', '#10b981', '#ef4444', '#f97316', '#eab308', '#ec4899', '#06b6d4']

function NumberSlider({ value, onChange, min = 1, max = 20, label }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, alignItems: 'center' }}>
      {label && <span style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{label}</span>}
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: 120, accentColor: 'var(--purple)' }}
      />
      <motion.span
        key={value}
        initial={{ scale: 1.4, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)' }}
      >
        {value}
      </motion.span>
    </div>
  )
}

function AnimatedBar({ height, color, label, delay = 0 }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, flex: 1 }}>
      <div style={{ height: 180, width: '100%', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
        <motion.div
          initial={{ height: 0 }}
          animate={{ height: `${(height / 40) * 100}%` }}
          transition={{ type: 'spring', stiffness: 120, damping: 14, delay }}
          style={{
            width: 60,
            backgroundColor: color,
            borderRadius: 'var(--radius-md)',
            position: 'relative',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <motion.span
            key={height}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{ color: '#fff', fontWeight: 700, fontSize: 20 }}
          >
            {height}
          </motion.span>
        </motion.div>
      </div>
      <span style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{label}</span>
    </div>
  )
}

function Checkmark({ show }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 200, damping: 12 }}
          style={{ fontSize: 36 }}
        >
          ✓
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Block({ color, size = 28, delay = 0 }) {
  return (
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ type: 'spring', stiffness: 200, damping: 15, delay }}
      style={{
        width: size,
        height: size,
        backgroundColor: color,
        borderRadius: 4,
      }}
    />
  )
}

function CommutativeDemo() {
  const [a, setA] = useState(3)
  const [b, setB] = useState(5)
  const [op, setOp] = useState('+')
  const left = op === '+' ? a + b : a * b
  const right = op === '+' ? b + a : b * a
  const opSymbol = op === '+' ? '+' : '×'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: 40, alignItems: 'flex-end' }}>
        <NumberSlider value={a} onChange={setA} label="a" />
        <div style={{ display: 'flex', gap: 8, marginBottom: 32 }}>
          {['+', '×'].map((s) => (
            <motion.button
              key={s}
              whileTap={{ scale: 0.92 }}
              onClick={() => setOp(s)}
              style={{
                width: 44,
                height: 44,
                borderRadius: 'var(--radius-md)',
                border: `2px solid ${op === s ? 'var(--purple)' : 'var(--border)'}`,
                background: op === s ? 'var(--purple)' : 'var(--surface)',
                color: op === s ? '#fff' : 'var(--text-primary)',
                fontSize: 20,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {s}
            </motion.button>
          ))}
        </div>
        <NumberSlider value={b} onChange={setB} label="b" />
      </div>

      <div style={{ display: 'flex', gap: 32, alignItems: 'flex-end' }}>
        <AnimatedBar height={left} color="var(--purple)" label={`a ${opSymbol} b`} />
        <Checkmark show={left === right} />
        <AnimatedBar height={right} color="var(--blue)" label={`b ${opSymbol} a`} delay={0.15} />
      </div>

      <motion.div
        key={`${a}${b}${op}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          fontSize: 26,
          fontWeight: 700,
          color: 'var(--text-primary)',
          background: 'var(--surface)',
          padding: '14px 28px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
          display: 'flex',
          alignItems: 'center',
          gap: 12,
        }}
      >
        <span>{a} {opSymbol} {b} = {left}</span>
        <span style={{ color: 'var(--text-secondary)' }}>|</span>
        <span>{b} {opSymbol} {a} = {right}</span>
      </motion.div>
    </div>
  )
}

function AssociativeDemo() {
  const [a, setA] = useState(2)
  const [b, setB] = useState(3)
  const [c, setC] = useState(4)
  const total = a + b + c

  const leftGrouped = (a + b) + c
  const rightGrouped = a + (b + c)

  const blockColors = [
    ...Array(a).fill(colors[0]),
    ...Array(b).fill(colors[1]),
    ...Array(c).fill(colors[2]),
  ]

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: 28, alignItems: 'flex-end' }}>
        <NumberSlider value={a} onChange={setA} label="a" />
        <NumberSlider value={b} onChange={setB} label="b" />
        <NumberSlider value={c} onChange={setC} label="c" />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, width: '100%', maxWidth: 560 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', textAlign: 'center' }}>
          (a + b) + c
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'flex-end' }}>
          <motion.div
            layout
            style={{
              display: 'flex',
              gap: 4,
              padding: '10px 12px',
              border: '2px solid var(--purple)',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(139,92,246,0.08)',
            }}
          >
            {blockColors.slice(0, a + b).map((c, i) => (
              <Block key={`l1-${i}`} color={c} delay={i * 0.03} />
            ))}
          </motion.div>
          <span style={{ fontSize: 22, fontWeight: 700, alignSelf: 'center', color: 'var(--text-primary)' }}>+</span>
          <motion.div
            layout
            style={{
              display: 'flex',
              gap: 4,
              padding: '10px 12px',
              border: '2px solid var(--green)',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(16,185,129,0.08)',
            }}
          >
            {blockColors.slice(a + b).map((c, i) => (
              <Block key={`l2-${i}`} color={c} delay={(a + b + i) * 0.03} />
            ))}
          </motion.div>
          <span style={{ fontSize: 20, fontWeight: 700, alignSelf: 'center', color: 'var(--green)' }}>= {leftGrouped}</span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Checkmark show={leftGrouped === rightGrouped} />
        </div>

        <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)', textAlign: 'center' }}>
          a + (b + c)
        </div>
        <div style={{ display: 'flex', gap: 8, justifyContent: 'center', alignItems: 'flex-end' }}>
          <motion.div
            layout
            style={{
              display: 'flex',
              gap: 4,
              padding: '10px 12px',
              border: '2px solid var(--purple)',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(139,92,246,0.08)',
            }}
          >
            {blockColors.slice(0, a).map((c, i) => (
              <Block key={`r1-${i}`} color={c} delay={i * 0.03} />
            ))}
          </motion.div>
          <span style={{ fontSize: 22, fontWeight: 700, alignSelf: 'center', color: 'var(--text-primary)' }}>+</span>
          <motion.div
            layout
            style={{
              display: 'flex',
              gap: 4,
              padding: '10px 12px',
              border: '2px solid var(--blue)',
              borderRadius: 'var(--radius-md)',
              background: 'rgba(59,130,246,0.08)',
            }}
          >
            {blockColors.slice(a).map((c, i) => (
              <Block key={`r2-${i}`} color={c} delay={(a + i) * 0.03} />
            ))}
          </motion.div>
          <span style={{ fontSize: 20, fontWeight: 700, alignSelf: 'center', color: 'var(--blue)' }}>= {rightGrouped}</span>
        </div>
      </div>

      <motion.div
        key={`${a}${b}${c}`}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          fontSize: 22,
          fontWeight: 700,
          color: 'var(--text-primary)',
          background: 'var(--surface)',
          padding: '14px 28px',
          borderRadius: 'var(--radius-lg)',
          border: '1px solid var(--border)',
        }}
      >
        ({a} + {b}) + {c} = {leftGrouped} | {a} + ({b} + {c}) = {rightGrouped}
      </motion.div>
    </div>
  )
}

function DistributiveDemo() {
  const [a, setA] = useState(2)
  const [b, setB] = useState(3)
  const [c, setC] = useState(2)
  const bPlusC = b + c
  const total = a * bPlusC
  const ab = a * b
  const ac = a * c
  const [split, setSplit] = useState(false)

  const gridBlocks = []
  for (let r = 0; r < a; r++) {
    for (let col = 0; col < bPlusC; col++) {
      const isLeft = col < b
      gridBlocks.push({ r, col, isLeft, color: isLeft ? colors[0] : colors[3] })
    }
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 28, alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: 28, alignItems: 'flex-end' }}>
        <NumberSlider value={a} onChange={setA} label="a" min={1} max={8} />
        <NumberSlider value={b} onChange={setB} label="b" min={1} max={8} />
        <NumberSlider value={c} onChange={setC} label="c" min={1} max={8} />
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setSplit(!split)}
        style={{
          padding: '10px 24px',
          borderRadius: 'var(--radius-md)',
          border: '2px solid var(--purple)',
          background: split ? 'var(--purple)' : 'transparent',
          color: split ? '#fff' : 'var(--purple)',
          fontWeight: 700,
          fontSize: 15,
          cursor: 'pointer',
        }}
      >
        {split ? 'Show Combined' : 'Split Grid'}
      </motion.button>

      <div style={{ display: 'flex', gap: 32, justifyContent: 'center', flexWrap: 'wrap' }}>
        <AnimatePresence mode="wait">
          {!split ? (
            <motion.div
              key="combined"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}
            >
              <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)' }}>
                a × (b + c)
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                {Array.from({ length: a }).map((_, r) => (
                  <div key={r} style={{ display: 'flex', gap: 4 }}>
                    {Array.from({ length: bPlusC }).map((_, col) => (
                      <motion.div
                        key={`${r}-${col}`}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 200, damping: 15, delay: (r * bPlusC + col) * 0.02 }}
                        style={{
                          width: 32,
                          height: 32,
                          backgroundColor: colors[(r + col) % colors.length],
                          borderRadius: 4,
                        }}
                      />
                    ))}
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)', marginTop: 4 }}>
                {a} × {bPlusC} = <span style={{ color: 'var(--purple)' }}>{total}</span>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="split"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              style={{ display: 'flex', gap: 28, alignItems: 'flex-end', flexWrap: 'wrap', justifyContent: 'center' }}
            >
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)' }}>
                  a × b
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {Array.from({ length: a }).map((_, r) => (
                    <div key={r} style={{ display: 'flex', gap: 4 }}>
                      {Array.from({ length: b }).map((_, col) => (
                        <motion.div
                          key={`${r}-${col}`}
                          initial={{ scale: 0, x: 20 }}
                          animate={{ scale: 1, x: 0 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: (r * b + col) * 0.03 }}
                          style={{
                            width: 32,
                            height: 32,
                            backgroundColor: colors[0],
                            borderRadius: 4,
                          }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--purple)' }}>
                  {a} × {b} = {ab}
                </div>
              </div>

              <span style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)', alignSelf: 'center' }}>+</span>

              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-secondary)' }}>
                  a × c
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  {Array.from({ length: a }).map((_, r) => (
                    <div key={r} style={{ display: 'flex', gap: 4 }}>
                      {Array.from({ length: c }).map((_, col) => (
                        <motion.div
                          key={`${r}-${col}`}
                          initial={{ scale: 0, x: -20 }}
                          animate={{ scale: 1, x: 0 }}
                          transition={{ type: 'spring', stiffness: 200, damping: 15, delay: (r * c + col) * 0.03 }}
                          style={{
                            width: 32,
                            height: 32,
                            backgroundColor: colors[3],
                            borderRadius: 4,
                          }}
                        />
                      ))}
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--red)' }}>
                  {a} × {c} = {ac}
                </div>
              </div>

              <span style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)', alignSelf: 'center' }}>=</span>

              <div style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)', alignSelf: 'center' }}>
                <span style={{ color: 'var(--purple)' }}>{ab}</span> + <span style={{ color: 'var(--red)' }}>{ac}</span> = <span style={{ color: 'var(--green)' }}>{ab + ac}</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}

function IdentityInverseDemo() {
  const [num, setNum] = useState(5)
  const [showInverse, setShowInverse] = useState(false)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32, alignItems: 'center', width: '100%' }}>
      <NumberSlider value={num} onChange={setNum} label="Number" min={1} max={20} />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, width: '100%', maxWidth: 600 }}>
        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 14,
        }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Additive Identity</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <motion.div
              key={`id-add-${num}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}
            >
              {Array.from({ length: num }).map((_, i) => (
                <Block key={i} color={colors[0]} size={22} delay={i * 0.04} />
              ))}
            </motion.div>
            <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)' }}>+</span>
            <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-secondary)' }}>0</span>
          </div>
          <motion.div
            key={`id-add-eq-${num}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ fontSize: 20, fontWeight: 700, color: 'var(--green)' }}
          >
            = {num}
          </motion.div>
        </div>

        <div style={{
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          borderRadius: 'var(--radius-lg)',
          padding: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 14,
        }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Multiplicative Identity</div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <motion.div
              key={`id-mul-${num}`}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}
            >
              {Array.from({ length: Math.min(num, 10) }).map((_, i) => (
                <Block key={i} color={colors[1]} size={22} delay={i * 0.04} />
              ))}
            </motion.div>
            <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)' }}>×</span>
            <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-secondary)' }}>1</span>
          </div>
          <motion.div
            key={`id-mul-eq-${num}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ fontSize: 20, fontWeight: 700, color: 'var(--green)' }}
          >
            = {num}
          </motion.div>
        </div>
      </div>

      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: 24,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 16,
        width: '100%',
        maxWidth: 500,
      }}>
        <div style={{ fontSize: 13, fontWeight: 600, color: 'var(--text-secondary)' }}>Additive Inverse</div>
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowInverse(!showInverse)}
          style={{
            padding: '8px 20px',
            borderRadius: 'var(--radius-md)',
            border: '2px solid var(--red)',
            background: showInverse ? 'var(--red)' : 'transparent',
            color: showInverse ? '#fff' : 'var(--red)',
            fontWeight: 700,
            fontSize: 14,
            cursor: 'pointer',
          }}
        >
          {showInverse ? 'Reset' : 'Cancel Out'}
        </motion.button>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap', justifyContent: 'center' }}>
          <motion.div
            key={`inv-pos-${num}-${showInverse}`}
            initial={{ x: 0 }}
            animate={{ x: showInverse ? 20 : 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            style={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}
          >
            {Array.from({ length: num }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: showInverse ? 0.2 : 1,
                  scale: showInverse ? 0.7 : 1,
                }}
                transition={{ delay: showInverse ? i * 0.05 : 0 }}
              >
                <Block color={colors[4]} size={24} delay={i * 0.03} />
              </motion.div>
            ))}
          </motion.div>

          <span style={{ fontSize: 22, fontWeight: 700, color: 'var(--text-primary)' }}>+</span>

          <motion.div
            key={`inv-neg-${num}-${showInverse}`}
            initial={{ x: 0 }}
            animate={{ x: showInverse ? -20 : 0 }}
            transition={{ type: 'spring', stiffness: 120, damping: 14 }}
            style={{ display: 'flex', gap: 3, flexWrap: 'wrap', justifyContent: 'center' }}
          >
            {Array.from({ length: num }).map((_, i) => (
              <motion.div
                key={i}
                animate={{
                  opacity: showInverse ? 0.2 : 1,
                  scale: showInverse ? 0.7 : 1,
                }}
                transition={{ delay: showInverse ? i * 0.05 : 0 }}
              >
                <Block color={colors[5]} size={24} delay={i * 0.03} />
              </motion.div>
            ))}
          </motion.div>
        </div>

        <AnimatePresence>
          {showInverse && (
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              style={{ fontSize: 22, fontWeight: 700, color: 'var(--red)' }}
            >
              = 0
            </motion.div>
          )}
        </AnimatePresence>

        <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--text-primary)' }}>
          {num} + ({-num}) = 0
        </div>
      </div>
    </div>
  )
}

export default function PropertiesPage() {
  const [activeTab, setActiveTab] = useState('commutative')

  return (
    <div style={{ padding: 24, maxWidth: 900, margin: '0 auto' }}>
      <motion.h1
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          fontSize: 32,
          fontWeight: 800,
          color: 'var(--text-primary)',
          textAlign: 'center',
          marginBottom: 8,
        }}
      >
        Properties of Numbers
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.1 }}
        style={{
          fontSize: 16,
          color: 'var(--text-secondary)',
          textAlign: 'center',
          marginBottom: 32,
        }}
      >
        Explore how numbers work together
      </motion.p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 36, justifyContent: 'center', flexWrap: 'wrap' }}>
        {tabs.map((tab) => (
          <motion.button
            key={tab.id}
            whileTap={{ scale: 0.95 }}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-md)',
              border: `2px solid ${activeTab === tab.id ? 'var(--purple)' : 'var(--border)'}`,
              background: activeTab === tab.id ? 'var(--purple)' : 'var(--surface)',
              color: activeTab === tab.id ? '#fff' : 'var(--text-primary)',
              fontWeight: 600,
              fontSize: 14,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>

      <div style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--radius-lg)',
        padding: 32,
        minHeight: 400,
      }}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
          >
            {activeTab === 'commutative' && <CommutativeDemo />}
            {activeTab === 'associative' && <AssociativeDemo />}
            {activeTab === 'distributive' && <DistributiveDemo />}
            {activeTab === 'identity' && <IdentityInverseDemo />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
