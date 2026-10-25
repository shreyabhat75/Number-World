import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const isPrime = (n) => {
  if (n < 2) return false;
  for (let i = 2; i * i <= n; i++) if (n % i === 0) return false;
  return true;
};
const isSquare = (n) => { const r = Math.round(Math.sqrt(n)); return r * r === n; };
const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const ITEM_EMOJI = {
  Apple: '🍎', Mango: '🥭', Banana: '🍌', Carrot: '🥕',
  Spoon: '🥄', Fork: '🍴', Knife: '🔪', Cup: '☕',
  MOM: '👄', DAD: '👨', POP: '🥤', DOG: '🐶',
  Rose: '🌹', Lily: '🌸', Tulip: '🌷', Lotus: '🪷',
  Cube: '🧊', Sphere: '⚽', Cylinder: '🥫', Square: '🟦',
  A: '🔤', E: '🔤', I: '🔤', O: '🔤', B: '🔤',
};

const STEPS = [
  { n: 1, icon: '👀', title: 'Observe', text: 'Look at every item carefully — the words, the digits, the shapes.' },
  { n: 2, icon: '🔎', title: 'Find the common rule', text: 'Ask: what property do most of the items share?' },
  { n: 3, icon: '🙅', title: 'Spot the stranger', text: 'Pick the one item that breaks that common rule.' },
  { n: 4, icon: '💬', title: 'Explain why', text: 'Say the reason out loud. A rule you can explain is a rule you truly found!' },
];

const PREREQS = [
  { icon: '🗂️', label: 'Classification' },
  { icon: '⚖️', label: 'Similarities & differences' },
  { icon: '🔢', label: 'Number properties' },
  { icon: '🔤', label: 'Alphabetical order' },
  { icon: '👁️', label: 'Basic observation skills' },
];

const EXAMPLES = [
  {
    id: 'ex-fruit', tag: 'Classification', icon: '🍎', title: 'Fruits or vegetable?',
    items: ['Apple', 'Mango', 'Banana', 'Carrot'], answer: 3,
    rule: 'Kind of food',
    explanation: 'Apple, mango and banana are all fruits. Carrot grows under the ground and is a vegetable, so it does not belong.',
  },
  {
    id: 'ex-div6', tag: 'Number Properties', icon: '🔢', title: 'Divisible by 6?',
    items: ['12', '18', '24', '31', '36'], answer: 3,
    rule: 'Divisible by 6',
    explanation: '12, 18, 24 and 36 are even and divisible by 6. 31 is odd — it is not divisible by 2, so it cannot be divisible by 6.',
  },
  {
    id: 'ex-prime', tag: 'Prime Numbers', icon: '⭐', title: 'Who is not prime?',
    items: ['3', '5', '7', '9', '11'], answer: 3,
    rule: 'Prime numbers',
    explanation: '3, 5, 7 and 11 have exactly two factors. 9 = 3 × 3, so it has factors 1, 3 and 9 — it is composite.',
  },
  {
    id: 'ex-alpha', tag: 'Alphabet Pattern', icon: '🔤', title: 'Letter jumps',
    items: ['ACE', 'BDF', 'CEG', 'DHL'], answer: 3,
    rule: 'Skip exactly one letter',
    explanation: 'In ACE, BDF and CEG every next letter skips just 1 letter (A→C→E). D→H skips three letters, so DHL breaks the rule.',
  },
  {
    id: 'ex-shape', tag: 'Shapes', icon: '🔷', title: 'Flat or solid?',
    items: ['Square', 'Rectangle', 'Triangle', 'Sphere'], answer: 3,
    rule: '2D shapes',
    explanation: 'Square, rectangle and triangle are flat 2-dimensional shapes drawn on paper. A sphere is a solid 3-dimensional ball.',
  },
  {
    id: 'ex-square', tag: 'Perfect Squares', icon: '✨', title: 'Square numbers',
    items: ['16', '25', '36', '48', '49'], answer: 3,
    rule: 'Perfect squares',
    explanation: '16 = 4², 25 = 5², 36 = 6² and 49 = 7². There is no whole number that multiplied by itself gives 48.',
  },
  {
    id: 'ex-spoon', tag: 'Classification', icon: '🍽️', title: 'On the table',
    items: ['Spoon', 'Fork', 'Knife', 'Cup'], answer: 3,
    rule: 'Cutlery',
    explanation: 'Spoon, fork and knife are used to eat — they are cutlery. A cup is a vessel used for drinking.',
  },
  {
    id: 'ex-palindrome', tag: 'Word Pattern', icon: '🪞', title: 'Read it backwards',
    items: ['MOM', 'DAD', 'POP', 'DOG'], answer: 3,
    rule: 'Palindromes',
    explanation: 'MOM, DAD and POP read the same forwards and backwards — they are palindromes. DOG becomes GOD when reversed.',
  },
  {
    id: 'ex-mult5', tag: 'Multiples', icon: '✖️', title: 'Tables of 5',
    items: ['15', '20', '25', '30', '36'], answer: 4,
    rule: 'Multiples of 5',
    explanation: '15, 20, 25 and 30 live in the 5 times table (they end in 0 or 5). 36 does not end in 0 or 5, so it is out.',
  },
  {
    id: 'ex-plus3', tag: 'Number Pattern', icon: '🪜', title: 'Climbing by 3',
    items: ['4', '7', '10', '13', '15'], answer: 4,
    rule: 'Add 3 each time',
    explanation: '4 → 7 → 10 → 13 keeps adding 3. After 13 we expect 16, but the set gives 15 — that breaks the ladder.',
  },
  {
    id: 'ex-double', tag: 'Number Pattern', icon: '🎏', title: 'Twin digits',
    items: ['11', '22', '33', '44', '45'], answer: 4,
    rule: 'Both digits same',
    explanation: 'In 11, 22, 33 and 44 the two digits are twins. In 45 the digits are 4 and 5 — different from each other.',
  },
  {
    id: 'ex-vowel', tag: 'Alphabet', icon: '🅰️', title: 'Vowels only',
    items: ['A', 'E', 'I', 'O', 'B'], answer: 4,
    rule: 'Vowels',
    explanation: 'A, E, I and O are vowels. B is a consonant, so it is the odd one out.',
  },
  {
    id: 'ex-flower', tag: 'Classification', icon: '💐', title: 'Flower bed',
    items: ['Rose', 'Lily', 'Tulip', 'Lotus', 'Mango'], answer: 4,
    rule: 'Flowers',
    explanation: 'Rose, lily, tulip and lotus are flowers. Mango is a fruit — it grows on a tree instead.',
  },
  {
    id: 'ex-frac', tag: 'Fractions', icon: '🍕', title: 'Same value?',
    items: ['1/2', '2/4', '3/6', '4/8', '2/3'], answer: 4,
    rule: 'Equal to 1/2',
    explanation: '2/4 = 1/2, 3/6 = 1/2 and 4/8 = 1/2. But 2/3 is bigger than 1/2, so it does not match the others.',
  },
  {
    id: 'ex-3d', tag: 'Shapes', icon: '📦', title: 'Solid shapes',
    items: ['Cube', 'Sphere', 'Cylinder', 'Square'], answer: 3,
    rule: '3D solids',
    explanation: 'Cube, sphere and cylinder occupy space — you can hold them. A square is flat and only exists on paper.',
  },
];

function ExampleExplorer() {
  const [state, setState] = useState({});
  const solvedCount = EXAMPLES.filter(e => state[e.id]?.solved).length;

  const pick = (ex, i) => {
    setState(prev => {
      const cur = state[ex.id] || {};
      if (cur.solved) return prev;
      if (i === ex.answer) return { ...prev, [ex.id]: { ...cur, picked: i, solved: true, wrong: null } };
      return { ...prev, [ex.id]: { ...cur, wrong: i, wrongCount: (cur.wrongCount || 0) + 1 } };
    });
  };

  const reveal = (ex) => setState(prev => ({ ...prev, [ex.id]: { ...(prev[ex.id] || {}), revealed: true } }));

  return (
    <section className="oo-card">
      <div className="oo-card-head">
        <h2>🕵️ Example Lab</h2>
        <div className="oo-progress">
          <div className="oo-progress-bar"><span style={{ width: `${(solvedCount / EXAMPLES.length) * 100}%` }} /></div>
          <span>{solvedCount}/{EXAMPLES.length} cracked</span>
        </div>
      </div>
      <p>Click the item you think is the odd one out. If you miss, the card will nudge you to look again.</p>

      <div className="oo-examples">
        {EXAMPLES.map((ex, exIdx) => {
          const s = state[ex.id] || {};
          const open = s.solved || s.revealed;
          return (
            <article key={ex.id} className={`oo-ex ${s.solved ? 'oo-ex-solved' : ''}`}>
              <div className="oo-ex-top">
                <span className="oo-ex-tag">{ex.icon} {ex.tag}</span>
                <span className="oo-ex-count">#{exIdx + 1}</span>
              </div>
              <h3>{ex.title}</h3>
              <div className="oo-items">
                {ex.items.map((item, i) => {
                  const isRight = s.solved && i === ex.answer;
                  const isWrong = s.wrong === i && !s.solved;
                  return (
                    <motion.button
                      key={`${i}-${isWrong ? s.wrongCount : 0}`}
                      className={`oo-item ${isRight ? 'oo-item-right' : ''} ${isWrong ? 'oo-item-wrong oo-shake' : ''}`}
                      onClick={() => pick(ex, i)}
                      whileTap={{ scale: 0.95 }}
                      disabled={s.solved}
                    >
                      {ITEM_EMOJI[item] && <span className="oo-item-emoji">{ITEM_EMOJI[item]}</span>}
                      <span className="oo-item-text">{item}</span>
                    </motion.button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                {open ? (
                  <motion.div
                    key="explain"
                    className={`oo-explain ${s.solved ? 'oo-explain-good' : 'oo-explain-plain'}`}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                  >
                    <div className="oo-explain-rule">
                      {s.solved ? '🎉 Correct! ' : '💡 The answer: '}
                      <strong>{ex.items[ex.answer]}</strong>
                      <span className="oo-rule-chip">Rule: {ex.rule}</span>
                    </div>
                    <p>{ex.explanation}</p>
                  </motion.div>
                ) : (
                  <motion.div key="hint" className="oo-ex-hint">
                    <span>
                      {s.wrong != null
                        ? '🤔 Not that one. Check the shared rule again!'
                        : 'Which one does not follow the rule?'}
                    </span>
                    <button className="oo-ghost-btn" onClick={() => reveal(ex)}>💡 Reveal</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </article>
          );
        })}
      </div>
    </section>
  );
}

const SHAPE_DATA = {
  square: { name: 'Square', sides: 4, corners: 4, curved: 'No', dims: '2D', fill: '#60a5fa' },
  rectangle: { name: 'Rectangle', sides: 4, corners: 4, curved: 'No', dims: '2D', fill: '#34d399' },
  triangle: { name: 'Triangle', sides: 3, corners: 3, curved: 'No', dims: '2D', fill: '#fbbf24' },
  circle: { name: 'Circle', sides: 0, corners: 0, curved: 'Yes', dims: '2D', fill: '#f472b6' },
  rhombus: { name: 'Rhombus', sides: 4, corners: 4, curved: 'No', dims: '2D', fill: '#a78bfa' },
  pentagon: { name: 'Pentagon', sides: 5, corners: 5, curved: 'No', dims: '2D', fill: '#fb923c' },
  sphere: { name: 'Sphere', sides: 0, corners: 0, curved: 'Yes', dims: '3D', fill: '#38bdf8' },
  cube: { name: 'Cube', sides: 12, corners: 8, curved: 'No', dims: '3D', fill: '#818cf8' },
  cylinder: { name: 'Cylinder', sides: 2, corners: 0, curved: 'Yes', dims: '3D', fill: '#2dd4bf' },
};

function ShapeSvg({ id, size = 92 }) {
  const c = SHAPE_DATA[id].fill;
  const common = { viewBox: '0 0 100 100', width: size, height: size, className: 'oo-shape-svg' };
  switch (id) {
    case 'square': return <svg {...common}><rect x="16" y="16" width="68" height="68" rx="6" fill={c} /></svg>;
    case 'rectangle': return <svg {...common}><rect x="8" y="27" width="84" height="46" rx="6" fill={c} /></svg>;
    case 'triangle': return <svg {...common}><polygon points="50,14 88,86 12,86" fill={c} strokeLinejoin="round" strokeWidth="4" stroke={c} /></svg>;
    case 'circle': return <svg {...common}><circle cx="50" cy="50" r="35" fill={c} /></svg>;
    case 'rhombus': return <svg {...common}><polygon points="50,10 90,50 50,90 10,50" fill={c} /></svg>;
    case 'pentagon': return <svg {...common}><polygon points="50,14 84.2,38.9 71.2,79.1 28.8,79.1 15.8,38.9" fill={c} /></svg>;
    case 'sphere': return (
      <svg {...common}>
        <defs>
          <radialGradient id="oo-sphere-g" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
            <stop offset="45%" stopColor={c} />
            <stop offset="100%" stopColor="#0369a1" />
          </radialGradient>
        </defs>
        <circle cx="50" cy="50" r="36" fill="url(#oo-sphere-g)" />
        <ellipse cx="38" cy="34" rx="9" ry="6" fill="#ffffff" opacity="0.75" transform="rotate(-30 38 34)" />
      </svg>
    );
    case 'cube': return (
      <svg {...common}>
        <polygon points="50,10 86,31 86,69 50,90 14,69 14,31" fill={c} />
        <polygon points="50,10 86,31 50,52 14,31" fill="#ffffff" opacity="0.35" />
        <polygon points="50,52 86,31 86,69 50,90" fill="#000000" opacity="0.18" />
        <path d="M50 52 L50 90 M50 52 L14 31 M50 52 L86 31" stroke="#0f172a" strokeWidth="2.5" fill="none" />
      </svg>
    );
    case 'cylinder': return (
      <svg {...common}>
        <rect x="20" y="22" width="60" height="56" fill={c} />
        <ellipse cx="50" cy="78" rx="30" ry="11" fill={c} />
        <ellipse cx="50" cy="78" rx="30" ry="11" fill="#000000" opacity="0.15" />
        <ellipse cx="50" cy="22" rx="30" ry="11" fill="#ffffff" opacity="0.6" />
        <ellipse cx="50" cy="22" rx="30" ry="11" fill="none" stroke={c} strokeWidth="2" />
      </svg>
    );
    default: return null;
  }
}

const SHAPE_SETS = [
  { items: ['square', 'rectangle', 'triangle', 'sphere'], answer: 3, hi: 3, rule: '2D vs 3D', why: 'Square, rectangle and triangle are flat 2D shapes. A sphere is a solid 3D ball — that is the stranger.' },
  { items: ['circle', 'square', 'triangle', 'rectangle'], answer: 0, hi: 1, rule: 'Corners', why: 'A circle has no straight sides and no corners at all. The other three have corners.' },
  { items: ['square', 'rectangle', 'rhombus', 'triangle'], answer: 3, hi: 0, rule: 'Number of sides', why: 'Square, rectangle and rhombus all have 4 sides. A triangle has only 3 sides.' },
  { items: ['cube', 'sphere', 'cylinder', 'square'], answer: 3, hi: 3, rule: '2D vs 3D', why: 'Cube, sphere and cylinder are solids you can hold. A square is flat and 2D.' },
  { items: ['pentagon', 'square', 'rectangle', 'circle'], answer: 3, hi: 0, rule: 'Straight sides', why: 'Pentagon, square and rectangle are made of straight sides. A circle is one continuous curve.' },
];

function ShapeDetective() {
  const [setIdx, setSetIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const set = SHAPE_SETS[setIdx];
  const solved = picked === set.answer;

  const choose = (i) => { if (picked == null) setPicked(i); };

  const next = () => { setSetIdx((setIdx + 1) % SHAPE_SETS.length); setPicked(null); };

  const cols = ['Sides / Edges', 'Corners', 'Curved?', 'Dimension'];
  const diffCol = set.hi;

  return (
    <section className="oo-card">
      <div className="oo-card-head">
        <h2>🔷 Shape Detective</h2>
        <span className="oo-set-chip">Set {setIdx + 1} of {SHAPE_SETS.length}</span>
      </div>
      <p>Look at the four shapes, then click the one that does not belong. The property table opens after your first guess.</p>

      <div className="oo-shapes">
        {set.items.map((id, i) => (
          <motion.button
            key={`${setIdx}-${id}`}
            className={`oo-shape-btn ${picked === i ? (solved ? 'oo-shape-right' : 'oo-shape-wrong') : ''} ${picked != null && i === set.answer ? 'oo-shape-answer' : ''}`}
            onClick={() => choose(i)}
            whileHover={picked == null ? { scale: 1.05, y: -4 } : {}}
            animate={picked === i && !solved ? { x: [0, -8, 8, -6, 6, 0] } : {}}
            transition={{ duration: 0.4 }}
          >
            <ShapeSvg id={id} />
            <span>{SHAPE_DATA[id].name}</span>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {picked != null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <div className={`oo-verdict ${solved ? 'oo-verdict-good' : 'oo-verdict-warn'}`}>
              {solved
                ? `🎉 Yes! The rule is “${set.rule}”. ${set.why}`
                : '🕵️ Have a closer look at the property table below — one row tells a different story.'}
            </div>
            <div className="oo-table-wrap">
              <table className="oo-table">
                <thead>
                  <tr>
                    <th>Shape</th>
                    {cols.map((c, k) => <th key={c} className={diffCol === k ? 'oo-col-hi' : ''}>{c}</th>)}
                  </tr>
                </thead>
                <tbody>
                  {set.items.map((id, i) => {
                    const s = SHAPE_DATA[id];
                    return (
                      <tr key={id} className={i === set.answer ? 'oo-row-hi' : ''}>
                        <td><span className="oo-tmini"><ShapeSvg id={id} size={26} /></span> {s.name}</td>
                        <td className={diffCol === 0 ? 'oo-col-hi' : ''}>{s.sides}</td>
                        <td className={diffCol === 1 ? 'oo-col-hi' : ''}>{s.corners}</td>
                        <td className={diffCol === 2 ? 'oo-col-hi' : ''}>{s.curved}</td>
                        <td className={diffCol === 3 ? 'oo-col-hi' : ''}>{s.dims}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
            <button className="oo-action-btn" onClick={next}>➡️ Next shape set</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

const RULES = [
  { id: 'even', label: 'Even', test: n => n % 2 === 0 },
  { id: 'odd', label: 'Odd', test: n => n % 2 !== 0 },
  { id: 'prime', label: 'Prime', test: isPrime },
  { id: 'square', label: 'Perfect square', test: isSquare },
  { id: 'div3', label: 'Divisible by 3', test: n => n % 3 === 0 },
  { id: 'div6', label: 'Divisible by 6', test: n => n % 6 === 0 },
  { id: 'mult5', label: 'Multiple of 5', test: n => n % 5 === 0 },
  { id: 'mult11', label: 'Multiple of 11', test: n => n % 11 === 0 },
];

const NUMBER_SETS = [
  { label: 'Set A', numbers: [12, 18, 24, 31, 36], tip: 'Try “Divisible by 6”.' },
  { label: 'Set B', numbers: [3, 5, 7, 9, 11], tip: 'Try “Prime”.' },
  { label: 'Set C', numbers: [16, 25, 36, 48, 49], tip: 'Try “Perfect square”.' },
  { label: 'Set D', numbers: [15, 20, 25, 30, 36], tip: 'Try “Multiple of 5”.' },
  { label: 'Set E', numbers: [81, 64, 49, 45, 36], tip: 'Try “Perfect square” again.' },
  { label: 'Set F', numbers: [22, 44, 63, 88, 110], tip: 'Try “Multiple of 11”.' },
];

function NumberXRay() {
  const [setIdx, setSetIdx] = useState(0);
  const [active, setActive] = useState([]);
  const set = NUMBER_SETS[setIdx];

  const toggle = (id) => setActive(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);

  const activeRules = RULES.filter(r => active.includes(r.id));
  const verdicts = activeRules.map(r => {
    const fails = set.numbers.filter(n => !r.test(n));
    return { rule: r, fails, works: fails.length === 1 };
  });
  const cracked = verdicts.find(v => v.works);
  const failingIdx = new Set();
  activeRules.forEach(r => set.numbers.forEach((n, i) => { if (!r.test(n)) failingIdx.add(i); }));

  return (
    <section className="oo-card">
      <div className="oo-card-head">
        <h2>🔬 Number X-Ray</h2>
        <div className="oo-set-switch">
          {NUMBER_SETS.map((s, i) => (
            <button key={s.label} className={`oo-chip-btn ${i === setIdx ? 'oo-chip-on' : ''}`} onClick={() => { setSetIdx(i); setActive([]); }}>
              {s.label}
            </button>
          ))}
        </div>
      </div>
      <p>Switch on a rule to scan the numbers. A good rule leaves <strong>exactly one</strong> number failing it — that number is the odd one out.</p>

      <div className="oo-numbers">
        {set.numbers.map((n, i) => (
          <motion.div
            key={`${setIdx}-${n}`}
            className={`oo-num ${failingIdx.has(i) ? 'oo-num-fail' : ''} ${cracked && cracked.fails[0] === n ? 'oo-num-odd' : ''}`}
            animate={cracked && cracked.fails[0] === n ? { scale: [1, 1.12, 1] } : {}}
            transition={{ duration: 0.8, repeat: cracked && cracked.fails[0] === n ? Infinity : 0, repeatDelay: 1 }}
          >
            <span className="oo-num-value">{n}</span>
            <span className="oo-num-badges">
              {activeRules.map(r => (
                <span key={r.id} className={`oo-badge ${r.test(n) ? 'oo-badge-ok' : 'oo-badge-no'}`}>
                  {r.label} {r.test(n) ? '✓' : '✗'}
                </span>
              ))}
            </span>
          </motion.div>
        ))}
      </div>

      <div className="oo-rules">
        <span className="oo-rules-label">Rule scanner:</span>
        {RULES.map(r => (
          <button
            key={r.id}
            className={`oo-rule ${active.includes(r.id) ? 'oo-rule-on' : ''}`}
            onClick={() => toggle(r.id)}
          >
            {active.includes(r.id) ? '● ' : '○ '}{r.label}
          </button>
        ))}
        {active.length > 0 && <button className="oo-ghost-btn" onClick={() => setActive([])}>Clear</button>}
      </div>

      <AnimatePresence mode="wait">
        {cracked ? (
          <motion.div key="cracked" className="oo-verdict oo-verdict-good" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            🎯 Rule found! <strong>{cracked.rule.label}</strong> holds for every number except <strong>{cracked.fails[0]}</strong>. That is the odd one out.
          </motion.div>
        ) : activeRules.length > 0 ? (
          <motion.div key="nope" className="oo-verdict oo-verdict-warn" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {verdicts.map(v => (
              <div key={v.rule.id} className="oo-rule-line">
                <strong>{v.rule.label}:</strong> {v.fails.length === 0
                  ? 'every number passes — this rule cannot separate anyone.'
                  : v.fails.length === 1
                    ? `works! ${v.fails[0]} fails.`
                    : `${v.fails.length} numbers fail (${v.fails.join(', ')}) — too many.`}
              </div>
            ))}
          </motion.div>
        ) : (
          <motion.div key="idle" className="oo-verdict oo-verdict-idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            💡 Hint: {set.tip} Then count how many numbers break it.
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

const LETTER_ROUNDS = [
  { groups: ['ACE', 'BDF', 'CEG', 'DHL'], answer: 3 },
  { groups: ['ACE', 'BDF', 'FHK', 'CEG'], answer: 2 },
  { groups: ['MOQ', 'PRT', 'UWY', 'CEH'], answer: 3 },
  { groups: ['BD', 'DF', 'FH', 'CJ'], answer: 3 },
];

const ALPHA = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const pos = (ch) => ALPHA.indexOf(ch) + 1;
const skipsOf = (g) => g.split('').slice(1).map((ch, i) => pos(ch) - pos(g[i]) - 1);

function AlphabetBridge() {
  const [roundIdx, setRoundIdx] = useState(0);
  const [picked, setPicked] = useState(null);
  const [showGaps, setShowGaps] = useState(false);
  const round = LETTER_ROUNDS[roundIdx];
  const solved = picked === round.answer;
  const activeGroup = picked != null ? round.groups[picked] : null;
  const letters = activeGroup ? activeGroup.split('') : [];

  const next = () => { setRoundIdx((roundIdx + 1) % LETTER_ROUNDS.length); setPicked(null); };

  return (
    <section className="oo-card">
      <div className="oo-card-head">
        <h2>🔤 Alphabet Bridge</h2>
        <button className={`oo-toggle ${showGaps ? 'oo-toggle-on' : ''}`} onClick={() => setShowGaps(v => !v)}>
          {showGaps ? '👀 Gaps visible' : '🙈 Hide gaps'}
        </button>
      </div>
      <p>Each group is a set of letters. Inside a group, letters jump over the same number of letters. Which group jumps differently?</p>

      <div className="oo-ruler">
        {ALPHA.map((ch, i) => (
          <span key={ch} className={`oo-ruler-chip ${letters.includes(ch) ? 'oo-ruler-on' : ''}`}>
            <b>{ch}</b>
            <i>{i + 1}</i>
          </span>
        ))}
      </div>

      <div className="oo-groups">
        {round.groups.map((g, i) => {
          const sk = skipsOf(g);
          const odd = sk.some(s => s !== sk[0]);
          return (
            <motion.button
              key={`${roundIdx}-${g}`}
              className={`oo-group ${picked === i ? (solved ? 'oo-group-right' : 'oo-group-wrong') : ''} ${picked != null && i === round.answer ? 'oo-group-answer' : ''}`}
              onClick={() => picked == null && setPicked(i)}
              animate={picked === i && !solved ? { x: [0, -8, 8, -6, 6, 0] } : {}}
              transition={{ duration: 0.4 }}
            >
              <span className="oo-group-word">{g.split('').map(c => <b key={c}>{c}</b>)}</span>
              {showGaps && (
                <span className="oo-group-gaps">
                  {sk.map((s, k) => (
                    <em key={k} className={odd ? 'oo-gap-bad' : ''}>jump +{s + 1} (skip {s})</em>
                  ))}
                </span>
              )}
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {picked != null && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className={`oo-verdict ${solved ? 'oo-verdict-good' : 'oo-verdict-warn'}`}>
            {solved
              ? `🎉 ${round.groups[round.answer]} is the odd one out — its jumps are not the same as the other groups.`
              : `🕵️ ${round.groups[picked]} follows the common jump. Keep comparing the gaps!`}
            <button className="oo-action-btn" onClick={next}>➡️ Next group set</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function SpeedChallenge() {
  const TOTAL = 6;
  const [deck, setDeck] = useState(() => shuffle(EXAMPLES).slice(0, TOTAL));
  const [round, setRound] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [best, setBest] = useState(0);
  const [picked, setPicked] = useState(null);

  const done = round >= TOTAL;
  const current = deck[round];

  const choose = (i) => {
    if (picked != null || !current) return;
    setPicked(i);
    if (i === current.answer) {
      setScore(s => s + 1);
      setStreak(s => { const n = s + 1; setBest(b => Math.max(b, n)); return n; });
    } else {
      setStreak(0);
    }
  };

  const next = () => {
    if (round + 1 >= TOTAL) { setRound(TOTAL); return; }
    setRound(r => r + 1);
    setPicked(null);
  };

  const restart = () => {
    setDeck(shuffle(EXAMPLES).slice(0, TOTAL));
    setRound(0); setScore(0); setStreak(0); setPicked(null);
  };

  if (done) {
    const pct = Math.round((score / TOTAL) * 100);
    return (
      <section className="oo-card">
        <h2>🏁 Speed Round</h2>
        <div className="oo-final">
          <div className="oo-final-score">{score}/{TOTAL}</div>
          <div className="oo-final-msg">
            {pct === 100 ? '🏆 Perfect! You are an Odd One Out master!' : pct >= 66 ? '🌟 Great spotting — nearly perfect!' : '💪 Good try! Revisit the Example Lab and come back.'}
          </div>
          <div className="oo-final-stats">
            <span>Accuracy <b>{pct}%</b></span>
            <span>Best streak <b>{best}</b></span>
          </div>
          <button className="oo-action-btn" onClick={restart}>🔁 Play again</button>
        </div>
      </section>
    );
  }

  return (
    <section className="oo-card">
      <div className="oo-card-head">
        <h2>⚡ Speed Round</h2>
        <div className="oo-score">
          <span>Score <b>{score}</b></span>
          <span>Streak 🔥 <b>{streak}</b></span>
          <span>{round + 1}/{TOTAL}</span>
        </div>
      </div>
      <div className="oo-dots">
        {Array.from({ length: TOTAL }).map((_, i) => (
          <span key={i} className={`oo-dot ${i < round ? (i < score ? 'oo-dot-ok' : 'oo-dot-miss') : 'oo-dot-todo'}`} />
        ))}
      </div>
      <p className="oo-challenge-tag">{current.icon} {current.tag} — {current.title}</p>

      <div className="oo-items oo-items-lg">
        {current.items.map((item, i) => {
          const ok = picked != null && i === current.answer;
          const bad = picked === i && i !== current.answer;
          return (
            <motion.button
              key={`${round}-${i}`}
              className={`oo-item ${ok ? 'oo-item-right' : ''} ${bad ? 'oo-item-wrong oo-shake' : ''}`}
              onClick={() => choose(i)}
              whileTap={{ scale: 0.95 }}
              disabled={picked != null}
            >
              {ITEM_EMOJI[item] && <span className="oo-item-emoji">{ITEM_EMOJI[item]}</span>}
              <span className="oo-item-text">{item}</span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence>
        {picked != null && (
          <motion.div
            className={`oo-explain ${picked === current.answer ? 'oo-explain-good' : 'oo-explain-plain'}`}
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
          >
            <div className="oo-explain-rule">
              {picked === current.answer ? '🎉 Correct! ' : '💡 Answer: '}
              <strong>{current.items[current.answer]}</strong>
              <span className="oo-rule-chip">Rule: {current.rule}</span>
            </div>
            <p>{current.explanation}</p>
            <button className="oo-action-btn" onClick={next}>{round + 1 >= TOTAL ? 'See results ➜' : 'Next question ➜'}</button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default function OddOneOutPage() {
  return (
    <div className="oo-page">
      <div className="oo-header">
        <h1>🎯 Odd One Out</h1>
        <p>Four items agree on a rule. One of them rebels. Find the rebel — and say why.</p>
      </div>

      <section className="oo-card oo-hero">
        <h2>🧭 Before you start</h2>
        <p>Odd One Out becomes easy once these ideas are in your toolkit:</p>
        <div className="oo-prereq">
          {PREREQS.map(p => (
            <span key={p.label} className="oo-prereq-chip">{p.icon} {p.label}</span>
          ))}
        </div>
      </section>

      <section className="oo-card">
        <h2>🧰 4 Steps to Solve</h2>
        <div className="oo-steps">
          {STEPS.map(s => (
            <motion.div key={s.n} className="oo-step" whileHover={{ y: -5 }}>
              <span className="oo-step-num">{s.n}</span>
              <span className="oo-step-icon">{s.icon}</span>
              <div>
                <strong>{s.title}</strong>
                <p>{s.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
        <p className="oo-tip">🧠 Always ask: <em>“What is true for every item except one?”</em> If you can name the rule, you have found the answer.</p>
      </section>

      <ExampleExplorer />
      <ShapeDetective />
      <NumberXRay />
      <AlphabetBridge />
      <SpeedChallenge />

      <section className="oo-card oo-fun">
        <h3>💡 Did you know?</h3>
        <p>Odd One Out puzzles are built on <strong>rules</strong>, and a good puzzle can have more than one right rule! For 12, 18, 24, 31, 36 you could say “31 is the only odd number” <em>or</em> “31 is not divisible by 6”. Both explain the same choice. In exams, always pick the explanation your teacher expects — and remember to say it out loud!</p>
      </section>
    </div>
  );
}
