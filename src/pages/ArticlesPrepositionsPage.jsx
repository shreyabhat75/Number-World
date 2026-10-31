import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const shuffle = (arr) => [...arr].sort(() => Math.random() - 0.5);

const PREREQS = [
  { icon: '🧩', title: 'Parts of speech', text: 'Nouns, pronouns, verbs, adjectives and adverbs.', eg: 'The young (adj) boy (noun) runs (verb) quickly (adv).' },
  { icon: '🏷️', title: 'Types of nouns', text: 'Common/proper, singular/plural, countable and uncountable.', eg: 'book / books, Bengaluru, water, rice, information' },
  { icon: '🏗️', title: 'Sentence structure', text: 'Subject, verb and object — how words relate.', eg: 'The girl placed the book on the table.' },
  { icon: '⏰', title: 'Time & location', text: 'When an event happens and where things are.', eg: 'at 5 PM, in a room, on a table, near the school' },
];

const ARTICLE_TYPES = [
  { key: 'A', cls: 'ap-t-a', title: 'Indefinite — A', rule: 'Before a consonant SOUND, with a singular countable noun. Something non-specific.', eg: ['a book', 'a university', 'a European country'] },
  { key: 'An', cls: 'ap-t-an', title: 'Indefinite — An', rule: 'Before a vowel SOUND. Again: sound, not spelling!', eg: ['an apple', 'an umbrella', 'an hour'] },
  { key: 'The', cls: 'ap-t-the', title: 'Definite — The', rule: 'When the noun is specific, already known, or unique.', eg: ['the book on the table', 'the sun', 'the tallest building', 'the first chapter'] },
  { key: '∅', cls: 'ap-t-zero', title: 'Zero article — ∅', rule: 'Sometimes no article at all: general plurals, uncountable nouns, languages, meals, names.', eg: ['Dogs are loyal', 'She speaks English', 'We had breakfast', 'Rahul lives in Bengaluru'] },
];

const SOUND_WORDS = [
  { w: 'apple', letter: 'vowel letter', sound: 'vowel sound /a/', art: 'an', note: 'Starts with a vowel letter and a vowel sound — easy!' },
  { w: 'umbrella', letter: 'vowel letter', sound: 'vowel sound /ʌ/', art: 'an', note: 'Also a clear vowel sound.' },
  { w: 'hour', letter: 'consonant letter h', sound: 'vowel sound /aʊ/ — the h is silent!', art: 'an', note: 'The h is silent, so the first sound is a vowel → an hour.' },
  { w: 'honest', letter: 'consonant letter h', sound: 'vowel sound /ɒ/ — h is silent', art: 'an', note: 'Silent h again → an honest person.' },
  { w: 'university', letter: 'vowel letter u', sound: 'consonant sound /juː/ (you)', art: 'a', note: 'It sounds like “yoo” → a university.' },
  { w: 'European', letter: 'vowel letter E', sound: 'consonant sound /jʊ/ (yu)', art: 'a', note: 'Starts with a “yu” sound → a European country.' },
  { w: 'one', letter: 'vowel letter o', sound: 'consonant sound /w/ (won)', art: 'a', note: 'Sounds like “won” → a one-rupee coin.' },
  { w: 'heir', letter: 'consonant letter h', sound: 'vowel sound /eə/ — h is silent', art: 'an', note: 'Silent h → an heir to the throne.' },
  { w: 'MBA', letter: 'consonant letter M', sound: 'vowel sound /em/', art: 'an', note: 'M is said “em” → an MBA degree.' },
  { w: 'monkey', letter: 'consonant letter m', sound: 'consonant sound /m/', art: 'a', note: 'Both letter and sound are consonants → a monkey.' },
];

const FILL_BLANKS = [
  { s: 'I need ___ umbrella to walk in the rain.', a: 'an', why: '“Umbrella” begins with a vowel sound.' },
  { s: '___ moon goes around the Earth.', a: 'the', why: 'There is only one moon — it is unique.' },
  { s: 'She is ___ best singer in the class.', a: 'the', why: 'Superlatives take “the”.' },
  { s: '___ honesty is the best policy.', a: '∅', why: 'Uncountable/abstract nouns used generally take no article.' },
  { s: 'He is ___ European by birth.', a: 'a', why: 'European starts with a “yu” sound — a consonant sound.' },
  { s: 'It was ___ hour before the gates closed.', a: 'an', why: 'The h in “hour” is silent, so the first sound is a vowel.' },
  { s: '___ dogs need regular exercise.', a: '∅', why: 'Plural nouns in a general sense take no article.' },
  { s: 'I saw a cat. ___ cat was black and white.', a: 'the', why: 'Second mention — the listener now knows which cat.' },
  { s: 'She studies ___ mathematics at college.', a: '∅', why: 'School subjects take no article.' },
  { s: 'We had ___ wonderful lunch yesterday.', a: 'a', why: 'A particular meal instance is countable → a wonderful lunch.' },
  { s: '___ first chapter is the shortest.', a: 'the', why: 'Ordinal numbers take “the”.' },
  { s: 'Ravi lives in ___ Mysuru.', a: '∅', why: 'Names of cities normally take no article.' },
];

const FILL_OPTIONS = ['a', 'an', 'the', '∅'];

const ZERO_PAIRS = [
  { no: 'She goes to school every day.', yes: 'She went to the school to meet the principal.', noMeaning: 'She is a student there — the activity of studying.', yesMeaning: 'The building itself — she visited the physical place.' },
  { no: 'He went to bed at 10 PM.', yes: 'He went to the bed to pick up the blanket.', noMeaning: 'He went to sleep.', yesMeaning: 'The piece of furniture.' },
  { no: 'He is in prison.', yes: 'He visited the prison last Sunday.', noMeaning: 'He is serving a sentence as a prisoner.', yesMeaning: 'He went to the building as a visitor.' },
  { no: 'We travel by bus.', yes: 'We travelled by the bus that was parked outside.', noMeaning: 'By bus = the normal way of travelling (no article with “by”).', yesMeaning: 'A particular, known bus.' },
];

const TIME_PHRASES = [
  { p: '5 PM', ans: 'at', rule: 'Clock times take AT.', eg: 'at 6 o’clock, at noon, at midnight, at night' },
  { p: 'Monday', ans: 'on', rule: 'Days and dates take ON.', eg: 'on Friday, on my birthday, on 5 May, on Monday morning' },
  { p: 'January', ans: 'in', rule: 'Months, years and seasons take IN.', eg: 'in 2026, in winter, in the morning' },
  { p: 'night', ans: 'at', rule: 'AT night is fixed — but IN the morning/afternoon/evening.', eg: 'at night ✅ | in the night ❌' },
  { p: 'my birthday', ans: 'on', rule: 'Named days and personal dates take ON.', eg: 'on Diwali, on Independence Day' },
  { p: '2026', ans: 'in', rule: 'Years and months take IN.', eg: 'in July, in the 21st century' },
  { p: 'the morning', ans: 'in', rule: 'Parts of the day take IN…', eg: 'in the morning, in the afternoon, in the evening' },
  { p: 'noon', ans: 'at', rule: 'Fixed points of the day take AT.', eg: 'at noon, at midnight, at sunrise' },
  { p: 'winter', ans: 'in', rule: 'Seasons take IN.', eg: 'in summer, in the rainy season' },
  { p: 'Sunday', ans: 'on', rule: 'Days take ON.', eg: 'on Sunday, on weekdays' },
  { p: '10:30', ans: 'at', rule: 'Exact clock time → AT.', eg: 'at 10:30 AM' },
  { p: 'the evening', ans: 'in', rule: 'IN the evening (but AT night).', eg: 'in the evening ✅ | at the evening ❌' },
];

const POSITIONS = [
  { id: 'on', label: 'on', style: { top: 18, left: '50%', marginLeft: -24, zIndex: 4 } },
  { id: 'in', label: 'in', style: { top: 92, left: '50%', marginLeft: -24, zIndex: 1 } },
  { id: 'under', label: 'under', style: { top: 178, left: '50%', marginLeft: -24, zIndex: 4 } },
  { id: 'behind', label: 'behind', style: { top: 66, left: '50%', marginLeft: 6, zIndex: 1 } },
  { id: 'in front of', label: 'in front of', style: { top: 128, left: '50%', marginLeft: -66, zIndex: 5 } },
  { id: 'beside', label: 'beside', style: { top: 112, left: 'calc(50% + 96px)', zIndex: 4 } },
];

const SORT_CARDS = [
  { t: 'at night', c: 'time' }, { t: 'on Monday', c: 'time' }, { t: 'in January', c: 'time' },
  { t: 'in the morning', c: 'time' }, { t: 'at 5 PM', c: 'time' }, { t: 'on my birthday', c: 'time' },
  { t: 'in the box', c: 'place' }, { t: 'on the table', c: 'place' }, { t: 'under the bed', c: 'place' },
  { t: 'at the door', c: 'place' }, { t: 'beside the tree', c: 'place' }, { t: 'between the two books', c: 'place' },
  { t: 'to school', c: 'direction' }, { t: 'across the road', c: 'direction' }, { t: 'through the gate', c: 'direction' },
  { t: 'into the room', c: 'direction' }, { t: 'towards the park', c: 'direction' }, { t: 'along the river', c: 'direction' },
];

function PrereqCard() {
  const [open, setOpen] = useState(0);
  return (
    <section className="ap-card ap-hero">
      <h2>🧭 1. Before you start</h2>
      <p>Articles and prepositions become easy once these four ideas are clear:</p>
      <div className="ap-prereq">
        {PREREQS.map((p, i) => (
          <button key={p.title} className={`ap-prereq-item ${open === i ? 'ap-prereq-open' : ''}`} onClick={() => setOpen(open === i ? -1 : i)}>
            <span className="ap-prereq-head"><b>{p.icon}</b> {i + 1}. {p.title}</span>
            <AnimatePresence>
              {open === i && (
                <motion.span className="ap-prereq-body" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}>
                  <em>{p.text}</em>
                  <i>Example: {p.eg}</i>
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        ))}
      </div>
    </section>
  );
}

function ArticleTypes() {
  return (
    <section className="ap-card">
      <h2>🔤 2. The four article choices</h2>
      <p>Articles go <strong>before a noun</strong> and tell the listener whether we mean “any one” or “that exact one”.</p>
      <div className="ap-types">
        {ARTICLE_TYPES.map(t => (
          <div key={t.key} className={`ap-type ${t.cls}`}>
            <span className="ap-type-key">{t.key}</span>
            <strong>{t.title}</strong>
            <p>{t.rule}</p>
            <div className="ap-type-egs">{t.eg.map(e => <span key={e}>{e}</span>)}</div>
          </div>
        ))}
      </div>
      <div className="ap-tip">🔔 Remember: <strong>A / An depends on the SOUND, not the spelling.</strong> a university (yoo) · an hour (silent h).</div>
    </section>
  );
}

function SoundChecker() {
  const [sel, setSel] = useState(SOUND_WORDS[3]);
  return (
    <section className="ap-card">
      <h2>🎧 3. Sound Checker: A or An?</h2>
      <p>Tap a word. The first letter can trick you — the first <em>sound</em> decides.</p>
      <div className="ap-words">
        {SOUND_WORDS.map(w => (
          <button key={w.w} className={`ap-word ${sel.w === w.w ? 'ap-word-on' : ''} ${sel.w === w.w ? (w.art === 'an' ? 'ap-word-an' : 'ap-word-a') : ''}`} onClick={() => setSel(w)}>
            {w.w}
          </button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={sel.w} className="ap-word-detail" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
          <div className="ap-word-answer">
            Use <b>{sel.art}</b> {sel.w}
          </div>
          <div className="ap-word-rows">
            <div><span>First letter</span><b>{sel.letter}</b></div>
            <div><span>First sound</span><b>{sel.sound}</b></div>
          </div>
          <p>{sel.note}</p>
        </motion.div>
      </AnimatePresence>
    </section>
  );
}

function FillBlankArena() {
  const [state, setState] = useState({});
  const solved = FILL_BLANKS.filter((f, i) => state[i]?.ok).length;

  const pick = (i, opt) => {
    setState(prev => {
      if (prev[i]?.ok) return prev;
      if (opt === FILL_BLANKS[i].a) return { ...prev, [i]: { ok: true, wrong: null, n: 0 } };
      return { ...prev, [i]: { ...prev[i], wrong: opt, n: (prev[i]?.n || 0) + 1 } };
    });
  };

  return (
    <section className="ap-card">
      <div className="ap-card-head">
        <h2>✏️ 4. Fill the Blank Arena</h2>
        <div className="ap-progress">
          <div className="ap-progress-bar"><span style={{ width: `${(solved / FILL_BLANKS.length) * 100}%` }} /></div>
          <span>{solved}/{FILL_BLANKS.length}</span>
        </div>
      </div>
      <p>Pick <strong>a</strong>, <strong>an</strong>, <strong>the</strong> or <strong>∅ (no article)</strong>.</p>
      <div className="ap-fills">
        {FILL_BLANKS.map((f, i) => {
          const s = state[i] || {};
          const parts = f.s.split('___');
          return (
            <div key={i} className={`ap-fill ${s.ok ? 'ap-fill-ok' : ''}`}>
              <div className="ap-fill-sentence">
                {parts[0]}
                <span className={`ap-blank ${s.ok ? 'ap-blank-ok' : s.wrong ? 'ap-blank-bad' : ''}`}>{s.ok ? f.a : s.wrong || ''}</span>
                {parts[1]}
              </div>
              {!s.ok && (
                <div className="ap-fill-opts">
                  {FILL_OPTIONS.map(opt => (
                    <motion.button
                      key={`${opt}-${s.wrong === opt ? s.n : 0}`}
                      className={`ap-opt ${s.wrong === opt ? 'ap-opt-wrong ap-shake' : ''}`}
                      onClick={() => pick(i, opt)}
                      whileTap={{ scale: 0.94 }}
                    >
                      {opt === '∅' ? '∅ none' : opt}
                    </motion.button>
                  ))}
                </div>
              )}
              {s.ok && <div className="ap-why">✅ {f.why}</div>}
            </div>
          );
        })}
      </div>
    </section>
  );
}

function SpecificitySwitch() {
  const [specific, setSpecific] = useState(false);
  const rows = [
    { gen: 'I saw a bird outside the window.', spec: 'The bird outside the window was injured.', lab: 'A → The' },
    { gen: 'She is reading a novel.', spec: 'The novel she is reading won a prize.', lab: 'a → the' },
    { gen: 'He bought a car last month.', spec: 'The car he bought is red.', lab: 'a → the' },
  ];
  return (
    <section className="ap-card">
      <h2>🎛️ 5. Specificity Switch: a ↔ the</h2>
      <p>Flip the switch to make the noun <strong>specific</strong>. Watch “a” turn into “the”.</p>
      <button className={`ap-switch ${specific ? 'ap-switch-on' : ''}`} onClick={() => setSpecific(v => !v)}>
        <span className="ap-switch-knob" />
        <span className="ap-switch-label">{specific ? '🔴 Specific — “the”' : '🟡 General — “a”'}</span>
      </button>
      <div className="ap-scenes">
        {rows.map((r, i) => (
          <motion.div key={i} className="ap-scene" layout>
            <span className="ap-scene-tag">{r.lab}</span>
            <AnimatePresence mode="wait">
              <motion.p key={String(specific)} initial={{ opacity: 0, x: 12 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -12 }}>
                {specific ? r.spec : r.gen}
              </motion.p>
            </AnimatePresence>
            <small>{specific ? 'Specific → use THE' : 'First/general mention → use A'}</small>
          </motion.div>
        ))}
      </div>
      <div className="ap-tip">👁️ Rule of thumb: first mention → <strong>a/an</strong>. Same thing again (now known) → <strong>the</strong>.</div>
    </section>
  );
}

function ZeroArticleLab() {
  const [open, setOpen] = useState(null);
  return (
    <section className="ap-card">
      <h2>🚫 6. Zero-Article Switch</h2>
      <p>Remove “the” and the meaning changes! Tap a pair to see why.</p>
      <div className="ap-zero">
        {ZERO_PAIRS.map((z, i) => (
          <div key={i} className="ap-zero-pair" onClick={() => setOpen(open === i ? null : i)}>
            <div className="ap-zero-col ap-zero-nogood">
              <span className="ap-zero-badge">∅ no article</span>
              <p>{z.no}</p>
              {open === i && <motion.small initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>{z.noMeaning}</motion.small>}
            </div>
            <div className="ap-zero-col ap-zero-with">
              <span className="ap-zero-badge">＋ the</span>
              <p>{z.yes}</p>
              {open === i && <motion.small initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}>{z.yesMeaning}</motion.small>}
            </div>
          </div>
        ))}
      </div>
      <div className="ap-tip">📌 Also zero article with: languages (<em>She speaks English</em>), meals (<em>we had breakfast</em>), cities (<em>Rahul lives in Bengaluru</em>), and phrases like <em>go to school, go to bed, travel by bus</em>.</div>
    </section>
  );
}

function PrepositionTypes() {
  const groups = [
    { icon: '⏰', title: 'Prepositions of TIME', color: '#f59e0b', items: ['at', 'on', 'in', 'since', 'for', 'until', 'by'], eg: 'at 5 PM · on Monday · in July · since 2019 · for two hours' },
    { icon: '📍', title: 'Prepositions of PLACE', color: '#3b82f6', items: ['in', 'on', 'at', 'under', 'behind', 'between', 'near', 'beside'], eg: 'in the box · on the table · at the door · between the books' },
    { icon: '🧭', title: 'Prepositions of DIRECTION', color: '#10b981', items: ['to', 'into', 'onto', 'across', 'through', 'along', 'towards', 'past'], eg: 'to school · across the road · through the gate · into the room' },
  ];
  return (
    <section className="ap-card">
      <h2>📚 7. What does a preposition do?</h2>
      <p>A preposition shows how a noun or pronoun relates to the rest of the sentence — it can describe <strong>time</strong>, <strong>place</strong> or <strong>direction</strong>.</p>
      <div className="ap-pre-groups">
        {groups.map(g => (
          <div key={g.title} className="ap-pre-group" style={{ borderColor: g.color }}>
            <h3>{g.icon} {g.title}</h3>
            <div className="ap-pre-chips">{g.items.map(i => <span key={i}>{i}</span>)}</div>
            <p>{g.eg}</p>
          </div>
        ))}
      </div>
      <div className="ap-tip">🔎 A quick test: if you can swap the phrase for <strong>“where?”</strong>, <strong>“when?”</strong> or <strong>“which way?”</strong>, you are using a preposition.</div>
    </section>
  );
}

function TimeMachine() {
  const [idx, setIdx] = useState(0);
  const [wrong, setWrong] = useState(null);
  const [n, setN] = useState(0);
  const phrase = TIME_PHRASES[idx];
  const [solvedMap, setSolvedMap] = useState({});

  const choose = (opt) => {
    if (solvedMap[idx]) return;
    if (opt === phrase.ans) {
      setSolvedMap(m => ({ ...m, [idx]: true }));
      setWrong(null);
    } else {
      setWrong(opt);
      setN(x => x + 1);
    }
  };

  const next = () => { setIdx((idx + 1) % TIME_PHRASES.length); setWrong(null); };

  const cols = [
    { k: 'at', rule: 'Clock time · night · noon · midpoint', eg: 'at 5 PM, at night, at noon' },
    { k: 'on', rule: 'Days · dates · named days', eg: 'on Monday, on 5 May, on my birthday' },
    { k: 'in', rule: 'Months · years · seasons · parts of day', eg: 'in July, in 2026, in the morning' },
  ];

  return (
    <section className="ap-card">
      <div className="ap-card-head">
        <h2>⏰ 8. Time Preposition Machine</h2>
        <span className="ap-set-chip">{idx + 1} / {TIME_PHRASES.length}</span>
      </div>
      <p>The meeting is fixed <strong>___ {phrase.p}</strong>. Which word fits?</p>

      <div className="ap-time-cols">
        {cols.map(c => (
          <motion.button
            key={c.k}
            className={`ap-time-col ${wrong === c.k ? 'ap-time-wrong ap-shake' : ''} ${solvedMap[idx] && c.k === phrase.ans ? 'ap-time-right' : ''}`}
            onClick={() => choose(c.k)}
            whileHover={{ y: -4 }}
            animate={wrong === c.k ? { x: [0, -7, 7, -5, 5, 0] } : {}}
          >
            <span className="ap-time-key">{c.k}</span>
            <strong>{c.rule}</strong>
            <small>{c.eg}</small>
          </motion.button>
        ))}
      </div>

      <div className="ap-clock-row">
        <svg viewBox="0 0 120 120" className="ap-clock">
          <circle cx="60" cy="60" r="54" fill="#fffdf8" stroke="#24312b" strokeWidth="5" />
          {Array.from({ length: 12 }).map((_, i) => (
            <circle key={i} cx={60 + 44 * Math.sin((i * 30 * Math.PI) / 180)} cy={60 - 44 * Math.cos((i * 30 * Math.PI) / 180)} r={i % 3 === 0 ? 3.4 : 2} fill="#24312b" />
          ))}
          <line x1="60" y1="60" x2="60" y2="26" stroke="#d65b4b" strokeWidth="4.5" strokeLinecap="round" />
          <line x1="60" y1="60" x2="86" y2="70" stroke="#24312b" strokeWidth="3.5" strokeLinecap="round" />
          <circle cx="60" cy="60" r="4" fill="#e6b94f" />
        </svg>
        <AnimatePresence mode="wait">
          <motion.div key={String(solvedMap[idx]) + idx} className={`ap-time-msg ${solvedMap[idx] ? 'ap-time-good' : 'ap-time-idle'}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            {solvedMap[idx]
              ? <>✅ <strong>___ {phrase.p}</strong> → <b>{phrase.ans}</b>. {phrase.rule}<br /><small>{phrase.eg}</small></>
              : wrong ? '🤔 Try another one — think: is it a clock time, a day, or a month?' : '💡 Pick AT, ON or IN.'}
          </motion.div>
        </AnimatePresence>
        <button className="ap-action-btn" onClick={next}>➡️ Next</button>
      </div>
    </section>
  );
}

function PositionLab() {
  const [mode, setMode] = useState('explore');
  const [pos, setPos] = useState(POSITIONS[0]);
  const [wrong, setWrong] = useState(null);
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);

  const explore = (p) => { setPos(p); setWrong(null); };

  const challenge = (p) => {
    if (p.id === pos.id) {
      setScore(s => s + 1);
      setAttempts(a => a + 1);
      setWrong(null);
      setTimeout(() => setPos(POSITIONS[Math.floor(Math.random() * POSITIONS.length)]), 550);
    } else {
      setWrong(p.id);
      setAttempts(a => a + 1);
    }
  };

  const click = (p) => (mode === 'explore' ? explore(p) : challenge(p));

  return (
    <section className="ap-card">
      <div className="ap-card-head">
        <h2>🐱 9. Position Lab (place prepositions)</h2>
        <div className="ap-mode">
          <button className={`ap-mode-btn ${mode === 'explore' ? 'ap-mode-on' : ''}`} onClick={() => { setMode('explore'); setWrong(null); }}>🔍 Explore</button>
          <button className={`ap-mode-btn ${mode === 'challenge' ? 'ap-mode-on' : ''}`} onClick={() => { setMode('challenge'); setPos(POSITIONS[Math.floor(Math.random() * POSITIONS.length)]); setWrong(null); }}>🎯 Challenge</button>
        </div>
      </div>
      <p>{mode === 'explore' ? 'Tap a preposition and watch the cat move — that is what the word means!' : 'Look at where the cat is, then pick the preposition that describes it.'}</p>

      <div className="ap-stage">
        <div className="ap-crate">
          <span className="ap-crate-label">crate</span>
        </div>
        <motion.div className="ap-cat" style={{ top: pos.style.top, left: pos.style.left, marginLeft: pos.style.marginLeft, zIndex: pos.style.zIndex }} animate={{ scale: [1, 1.06, 1] }} transition={{ duration: 0.35 }}>
          🐱
        </motion.div>
        <div className="ap-ground" />
      </div>

      <div className="ap-sentence">
        The cat is <span className="ap-blank ap-blank-ok">{mode === 'explore' ? pos.label : (wrong ? wrong : '_____')}</span> the crate.
      </div>

      <div className="ap-pos-btns">
        {POSITIONS.map(p => (
          <motion.button
            key={p.id}
            className={`ap-pos ${pos.id === p.id && mode === 'explore' ? 'ap-pos-on' : ''} ${wrong === p.id ? 'ap-pos-wrong ap-shake' : ''}`}
            onClick={() => click(p)}
            whileTap={{ scale: 0.94 }}
          >
            {p.id}
          </motion.button>
        ))}
      </div>

      {mode === 'challenge' && (
        <div className="ap-score-row">
          <span>Correct <b>{score}</b></span>
          <span>Tries <b>{attempts}</b></span>
          <span>Accuracy <b>{attempts ? Math.round((score / attempts) * 100) : 0}%</b></span>
        </div>
      )}
      <div className="ap-tip">🧩 Also try: <strong>over / above</strong> (higher), <strong>below</strong> (lower), <strong>next to</strong> (= beside), <strong>in front of</strong> (facing side).</div>
    </section>
  );
}

function Sorter() {
  const [cards, setCards] = useState(() => shuffle(SORT_CARDS));
  const [status, setStatus] = useState({});
  const [wrong, setWrong] = useState(null);
  const done = Object.values(status).filter(Boolean).length;

  const assign = (card, cat) => {
    if (status[card.t]) return;
    if (cat === card.c) {
      setStatus(s => ({ ...s, [card.t]: true }));
      setWrong(null);
    } else {
      setWrong(card.t + cat);
    }
  };

  return (
    <section className="ap-card">
      <div className="ap-card-head">
        <h2>🗂️ 10. Sort the Preposition</h2>
        <div className="ap-progress">
          <div className="ap-progress-bar"><span style={{ width: `${(done / cards.length) * 100}%` }} /></div>
          <span>{done}/{cards.length}</span>
        </div>
      </div>
      <p>Each phrase must go into <strong>Time</strong>, <strong>Place</strong> or <strong>Direction</strong>. Tap the right bucket.</p>
      <div className="ap-sort">
        {cards.map(c => (
          <div key={c.t} className={`ap-sort-card ${status[c.t] ? 'ap-sort-done' : ''} ${wrong === c.t + 'time' || wrong === c.t + 'place' || wrong === c.t + 'direction' ? 'ap-shake' : ''}`}>
            <span className="ap-sort-text">{status[c.t] ? '✅ ' : ''}{c.t}</span>
            {!status[c.t] && (
              <div className="ap-sort-btns">
                <button onClick={() => assign(c, 'time')}>⏰ time</button>
                <button onClick={() => assign(c, 'place')}>📍 place</button>
                <button onClick={() => assign(c, 'direction')}>🧭 dir</button>
              </div>
            )}
          </div>
        ))}
      </div>
      <AnimatePresence>
        {done === cards.length && (
          <motion.div className="ap-verdict ap-verdict-good" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
            🎉 Perfect sorting! You can now tell time, place and direction prepositions apart.
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ReferenceTable() {
  const rows = [
    ['Time', 'at', 'a fixed point', 'at 6 PM, at night, at noon'],
    ['Time', 'on', 'days & dates', 'on Monday, on 5 May'],
    ['Time', 'in', 'months, years, seasons, parts of day', 'in July, in 2026, in the morning'],
    ['Time', 'since / for', 'starting point / duration', 'since 2019 · for two hours'],
    ['Place', 'in', 'inside something', 'in the box, in Bengaluru'],
    ['Place', 'on', 'touching a surface', 'on the table, on the wall'],
    ['Place', 'at', 'a point / specific place', 'at the door, at school'],
    ['Place', 'between / among', 'two things / more than two', 'between A and B · among friends'],
    ['Direction', 'to / into', 'towards / inside', 'to school, into the room'],
    ['Direction', 'across / through', 'from side to side / inside and out', 'across the road, through the gate'],
    ['Direction', 'along / towards', 'following a line / in the direction of', 'along the river, towards the park'],
  ];
  return (
    <section className="ap-card">
      <h2>📖 11. Cheat sheet</h2>
      <div className="ap-table-wrap">
        <table className="ap-table">
          <thead><tr><th>Type</th><th>Preposition</th><th>Use</th><th>Examples</th></tr></thead>
          <tbody>
            {rows.map((r, i) => (
              <tr key={i}><td><b>{r[0]}</b></td><td><span className="ap-pill">{r[1]}</span></td><td>{r[2]}</td><td>{r[3]}</td></tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="ap-tip">⚠️ Common traps: <strong>on time</strong> (not late) vs <strong>in time</strong> (early enough) · <strong>at school</strong> (studying) vs <strong>at the school</strong> (at the building) · <strong>good at</strong>, <strong>proud of</strong>, <strong>married to</strong>, <strong>interested in</strong>.</div>
    </section>
  );
}

export default function ArticlesPrepositionsPage() {
  return (
    <div className="ap-page">
      <div className="ap-header">
        <h1>📝 Articles &amp; Prepositions</h1>
        <p>Small words, big meaning — learn when to use <em>a, an, the, ∅</em> and how prepositions link nouns to time, place and direction.</p>
      </div>

      <PrereqCard />
      <ArticleTypes />
      <SoundChecker />
      <FillBlankArena />
      <SpecificitySwitch />
      <ZeroArticleLab />
      <PrepositionTypes />
      <TimeMachine />
      <PositionLab />
      <Sorter />
      <ReferenceTable />

      <section className="ap-card ap-fun">
        <h3>💡 Did you know?</h3>
        <p>English is one of the few languages with articles at all — and just two letters (<strong>a</strong> and <strong>the</strong>) can change a sentence completely: <em>“She goes to school”</em> makes her a student, while <em>“She goes to the school”</em> only says she walks into a building. Master these tiny words and your writing instantly sounds clearer and more natural.</p>
      </section>
    </div>
  );
}
