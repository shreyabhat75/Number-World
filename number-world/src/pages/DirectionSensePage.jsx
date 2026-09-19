import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const DIRECTIONS = ['North', 'East', 'South', 'West'];
const DIR_ARROWS = { North: '↑', East: '→', South: '↓', West: '←' };
const DIR_DEGREES = { North: 0, East: 90, South: 180, West: 270 };

function getTurnResult(current, turn) {
  const idx = DIRECTIONS.indexOf(current);
  if (turn === 'left') return DIRECTIONS[(idx + 3) % 4];
  if (turn === 'right') return DIRECTIONS[(idx + 1) % 4];
  if (turn === 'back') return DIRECTIONS[(idx + 2) % 4];
  return current;
}

const QUIZ_QUESTIONS = [
  { q: 'Riya is facing North. She turns right. Which direction is she facing?', answer: 'East', options: ['East', 'West', 'North', 'South'] },
  { q: 'A boy is facing East. He turns left. Which direction is he facing?', answer: 'North', options: ['South', 'North', 'West', 'East'] },
  { q: 'A girl walks 5 steps North and then 5 steps South. Where is she?', answer: 'Same place', options: ['5 steps North', '5 steps South', 'Same place', '5 steps East'] },
  { q: 'Arun is facing South. He turns right. Which direction is he facing?', answer: 'West', options: ['East', 'West', 'North', 'South'] },
  { q: 'Meena walks East and then turns left. Which direction does she face?', answer: 'North', options: ['North', 'South', 'East', 'West'] },
  { q: 'A person facing West turns left. Which direction are they facing?', answer: 'South', options: ['North', 'East', 'South', 'West'] },
  { q: 'Kiran walks 3 steps North, then 4 steps East. Where is he from start?', answer: 'North-East', options: ['North-West', 'North-East', 'South-East', 'South-West'] },
  { q: 'A person faces North, turns right, then right again. Which direction?', answer: 'South', options: ['East', 'West', 'North', 'South'] },
  { q: 'A student walks West and then turns right. Which direction?', answer: 'North', options: ['North', 'South', 'East', 'West'] },
  { q: 'A person walks 2 steps South, then 2 steps East. Where from start?', answer: 'South-East', options: ['North-East', 'South-East', 'South-West', 'North-West'] },
  { q: 'Anu faces North and turns left twice. Which direction?', answer: 'South', options: ['East', 'West', 'North', 'South'] },
  { q: 'Raj walks East, then West same distance. Where is he?', answer: 'Starting point', options: ['East', 'West', 'Starting point', 'North'] },
  { q: 'If North is in front of you, which direction is on your right?', answer: 'East', options: ['East', 'West', 'North', 'South'] },
  { q: 'A car travels North, then turns right. Which direction next?', answer: 'East', options: ['East', 'West', 'North', 'South'] },
  { q: 'A person faces East and turns around. Which direction now?', answer: 'West', options: ['North', 'South', 'East', 'West'] },
  { q: 'A child walks 6m North and 2m East. Direction from start?', answer: 'North-East', options: ['North-West', 'North-East', 'South-East', 'South-West'] },
  { q: 'A person faces South and turns left. Which direction?', answer: 'East', options: ['East', 'West', 'North', 'South'] },
  { q: 'A person faces East and turns right. Which direction?', answer: 'South', options: ['North', 'South', 'East', 'West'] },
  { q: 'A person faces West and turns right. Which direction?', answer: 'North', options: ['North', 'South', 'East', 'West'] },
  { q: 'Facing North, turn right three times. Which direction?', answer: 'West', options: ['East', 'West', 'North', 'South'] },
];

function InteractiveCompass() {
  const [needleDir, setNeedleDir] = useState('North');

  return (
    <div className="ds-card">
      <h2>🧭 The Four Main Directions</h2>
      <p>Click a direction to move the compass needle and identify it.</p>
      <div className="ds-compass-wrapper">
        <div className="ds-compass">
          <span className="ds-compass-label ds-cn">N</span>
          <span className="ds-compass-label ds-ce">E</span>
          <span className="ds-compass-label ds-cs">S</span>
          <span className="ds-compass-label ds-cw">W</span>
          <div
            className="ds-needle"
            style={{ transform: `translate(-50%, -95%) rotate(${DIR_DEGREES[needleDir]}deg)` }}
          />
        </div>
        <div className="ds-direction-display">
          Needle: {needleDir} {DIR_ARROWS[needleDir]}
        </div>
      </div>
      <div className="ds-compass-controls">
        {DIRECTIONS.map(d => (
          <button key={d} className="ds-action-btn" onClick={() => setNeedleDir(d)}>
            {d[0]}
          </button>
        ))}
      </div>
      <p className="ds-small">Try moving the needle and ask: "Which direction is it pointing?"</p>
    </div>
  );
}

function TurnSimulator() {
  const [facing, setFacing] = useState('North');
  const [lastTurn, setLastTurn] = useState(null);

  const handleTurn = useCallback((turn) => {
    const result = getTurnResult(facing, turn);
    setFacing(result);
    setLastTurn(turn);
  }, [facing]);

  return (
    <div className="ds-card">
      <h2>↩ Turns Made Easy</h2>
      <p>Currently facing: <strong>{facing} {DIR_ARROWS[facing]}</strong></p>
      <div className="ds-compass-controls">
        <button className="ds-action-btn" onClick={() => handleTurn('left')}>↩ Turn Left</button>
        <button className="ds-action-btn" onClick={() => handleTurn('right')}>↪ Turn Right</button>
        <button className="ds-action-btn" onClick={() => handleTurn('back')}>↻ Turn Around</button>
      </div>
      <AnimatePresence mode="wait">
        {lastTurn && (
          <motion.div
            key={facing}
            className="ds-turn-result"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            You turned {lastTurn} → Now facing: <strong>{facing} {DIR_ARROWS[facing]}</strong>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ShadowSimulator() {
  const [sunPos, setSunPos] = useState(50);

  const shadowLength = sunPos <= 50
    ? Math.max(10, 100 - sunPos * 1.6)
    : Math.max(10, (sunPos - 50) * 1.6 + 10);
  const shadowDir = sunPos <= 50 ? 'right' : 'left';
  const timeLabel = sunPos < 25 ? '🌅 Morning' : sunPos < 40 ? '☀️ Late Morning' : sunPos < 60 ? '🌞 Midday' : sunPos < 75 ? '☀️ Afternoon' : '🌇 Evening';

  return (
    <div className="ds-card">
      <h2>☀️ Shadows Tell a Story</h2>
      <p>Drag the sun to see how the shadow changes direction and length.</p>
      <div className="ds-shadow-scene">
        <svg viewBox="0 0 300 160" className="ds-shadow-svg">
          <defs>
            <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={sunPos < 20 || sunPos > 80 ? '#2d1b69' : '#87ceeb'} />
              <stop offset="100%" stopColor={sunPos < 20 || sunPos > 80 ? '#1a1040' : '#e0f0ff'} />
            </linearGradient>
          </defs>
          <rect width="300" height="160" fill="url(#skyGrad)" rx="12" />
          <rect y="120" width="300" height="40" fill="#8B7355" rx="0" />
          <line x1="0" y1="120" x2="300" y2="120" stroke="#6B5B3D" strokeWidth="2" />
          {/* Sun */}
          <circle
            cx={30 + (sunPos / 100) * 240}
            cy={110 - Math.sin((sunPos / 100) * Math.PI) * 80}
            r="18"
            fill="#FFD700"
            filter="url(#sunGlow)"
          />
          <defs>
            <filter id="sunGlow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Stick */}
          <rect x="147" y="60" width="6" height="60" rx="3" fill="#5D4037" />
          <circle cx="150" cy="55" r="8" fill="#8D6E63" />
          {/* Shadow */}
          <motion.rect
            y="120"
            height="6"
            rx="3"
            fill="rgba(0,0,0,0.35)"
            animate={{
              x: shadowDir === 'right' ? 153 : 153 - shadowLength,
              width: shadowLength,
            }}
            transition={{ type: 'spring', stiffness: 100, damping: 15 }}
          />
          <text x="150" y="145" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold">
            {timeLabel}
          </text>
        </svg>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={sunPos}
        onChange={e => setSunPos(parseInt(e.target.value))}
        className="ds-sun-slider"
      />
      <div className="ds-shadow-info">
        <div className="ds-shadow-stat">
          <span className="ds-shadow-label">Shadow Length:</span>
          <span className="ds-shadow-value">{shadowLength > 60 ? 'Long' : shadowLength > 30 ? 'Medium' : 'Short'}</span>
        </div>
        <div className="ds-shadow-stat">
          <span className="ds-shadow-label">Shadow Points:</span>
          <span className="ds-shadow-value">{shadowDir === 'right' ? 'East (→)' : 'West (←)'}</span>
        </div>
      </div>
      <p className="ds-small">In the morning, shadows are long and point West. At midday, they're short. In the evening, they're long and point East.</p>
    </div>
  );
}

function LatitudeLongitude() {
  const [lat, setLat] = useState(45);
  const [lon, setLon] = useState(78);

  const latDir = lat >= 0 ? 'N' : 'S';
  const lonDir = lon >= 0 ? 'E' : 'W';

  return (
    <div className="ds-card">
      <h2>🌍 Latitude & Longitude</h2>
      <p>Imagine Earth like a giant grid. Adjust the coordinates to locate a spot!</p>
      <div className="ds-latlon-scene">
        <svg viewBox="0 0 260 180" className="ds-latlon-svg">
          {/* Globe */}
          <ellipse cx="130" cy="90" rx="85" ry="75" fill="#e8f4f8" stroke="#2196F3" strokeWidth="2" />
          {/* Latitude lines */}
          {[-50, -25, 0, 25, 50].map(l => (
            <path
              key={l}
              d={`M 45 ${90 - l * 0.7} Q 130 ${90 - l * 0.7 - Math.abs(l) * 0.15} 215 ${90 - l * 0.7}`}
              fill="none"
              stroke="#90CAF9"
              strokeWidth="1"
              strokeDasharray="4 3"
            />
          ))}
          {/* Longitude lines */}
          {[-60, -30, 0, 30, 60].map(l => (
            <path
              key={l}
              d={`M ${130 + l} 15 Q ${130 + l + (l > 0 ? 5 : -5)} 90 ${130 + l} 165`}
              fill="none"
              stroke="#90CAF9"
              strokeWidth="1"
              strokeDasharray="4 3"
            />
          ))}
          {/* Equator */}
          <path d="M 45 90 Q 130 90 215 90" fill="none" stroke="#64B5F6" strokeWidth="2" />
          {/* Prime Meridian */}
          <path d="M 130 15 Q 130 90 130 165" fill="none" stroke="#64B5F6" strokeWidth="2" />
          {/* Point marker */}
          <motion.circle
            cx={130 + (lon / 180) * 80}
            cy={90 - (lat / 90) * 70}
            r="7"
            fill="#E53935"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <text x="130" y="178" textAnchor="middle" fill="#1565C0" fontSize="11" fontWeight="bold">
            🌍 Earth Grid
          </text>
        </svg>
      </div>
      <div className="ds-coord-display">
        <span className="ds-coord-value">{Math.abs(lat)}°{latDir}</span>
        <span className="ds-coord-sep">,</span>
        <span className="ds-coord-value">{Math.abs(lon)}°{lonDir}</span>
      </div>
      <div className="ds-sliders">
        <div className="ds-slider-row">
          <label>Latitude:</label>
          <input type="range" min="-90" max="90" value={lat} onChange={e => setLat(parseInt(e.target.value))} />
          <span>{Math.abs(lat)}°{latDir}</span>
        </div>
        <div className="ds-slider-row">
          <label>Longitude:</label>
          <input type="range" min="-180" max="180" value={lon} onChange={e => setLon(parseInt(e.target.value))} />
          <span>{Math.abs(lon)}°{lonDir}</span>
        </div>
      </div>
      <p className="ds-small"><strong>Latitude</strong> = how far North/South. <strong>Longitude</strong> = how far East/West. Together they point to any location on Earth!</p>
    </div>
  );
}

function MovementTracker() {
  const [moves, setMoves] = useState([]);
  const [facing, setFacing] = useState('North');
  const [inputSteps, setInputSteps] = useState(3);
  const GRID_SIZE = 7;
  const CENTER = Math.floor(GRID_SIZE / 2);

  const getGridPosition = useCallback(() => {
    let x = CENTER, y = CENTER;
    let currentDir = 'North';
    for (const move of moves) {
      const steps = move.steps;
      switch (currentDir) {
        case 'North': y -= steps; break;
        case 'South': y += steps; break;
        case 'East': x += steps; break;
        case 'West': x -= steps; break;
        default: break;
      }
      currentDir = move.faceAfter;
    }
    return { x: Math.max(0, Math.min(GRID_SIZE - 1, x)), y: Math.max(0, Math.min(GRID_SIZE - 1, y)) };
  }, [moves]);

  const getPathCells = useCallback(() => {
    const cells = [];
    let x = CENTER, y = CENTER;
    let currentDir = 'North';
    cells.push({ x, y, dir: currentDir });
    for (const move of moves) {
      for (let i = 0; i < move.steps; i++) {
        switch (currentDir) {
          case 'North': y--; break;
          case 'South': y++; break;
          case 'East': x++; break;
          case 'West': x--; break;
          default: break;
        }
        x = Math.max(0, Math.min(GRID_SIZE - 1, x));
        y = Math.max(0, Math.min(GRID_SIZE - 1, y));
        cells.push({ x, y, dir: currentDir });
      }
      currentDir = move.faceAfter;
    }
    return cells;
  }, [moves]);

  const addMove = useCallback((turn) => {
    const faceAfter = turn === 'none' ? facing : getTurnResult(facing, turn);
    setMoves(prev => [...prev, { steps: inputSteps, turn, faceAfter }]);
    setFacing(faceAfter);
  }, [facing, inputSteps]);

  const reset = useCallback(() => {
    setMoves([]);
    setFacing('North');
  }, []);

  const pos = getGridPosition();
  const pathCells = getPathCells();

  return (
    <div className="ds-card">
      <h2>🚶 Movement Tracker</h2>
      <p>Walk forward, then turn. Watch your path on the grid!</p>

      <div className="ds-movement-grid-wrapper">
        <div className="ds-movement-grid">
          {Array.from({ length: GRID_SIZE }).map((_, row) => (
            <div key={row} className="ds-grid-row">
              {Array.from({ length: GRID_SIZE }).map((_, col) => {
                const isStart = row === CENTER && col === CENTER;
                const isHere = row === pos.y && col === pos.x;
                const isPath = pathCells.some(c => c.x === col && c.y === row);
                return (
                  <div
                    key={col}
                    className={`ds-grid-cell ${isStart ? 'ds-cell-start' : ''} ${isHere ? 'ds-cell-here' : ''} ${isPath && !isHere ? 'ds-cell-path' : ''}`}
                  >
                    {isStart && '🏁'}
                    {isHere && !isStart && `🧑${DIR_ARROWS[facing]}`}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="ds-movement-info">
        <span>Current: <strong>{facing} {DIR_ARROWS[facing]}</strong></span>
        <span>Position: ({pos.x - CENTER}, {CENTER - pos.y})</span>
      </div>

      <div className="ds-movement-controls">
        <div className="ds-steps-input">
          <label>Steps:</label>
          <input
            type="number"
            min="1"
            max="6"
            value={inputSteps}
            onChange={e => setInputSteps(Math.max(1, Math.min(6, parseInt(e.target.value) || 1)))}
            className="ds-num-input"
          />
        </div>
        <div className="ds-move-btns">
          <button className="ds-action-btn ds-move-btn" onClick={() => addMove('none')}>
            ⬆️ Walk {inputSteps}
          </button>
          <button className="ds-action-btn ds-move-btn" onClick={() => addMove('left')}>
            ↩ Left + Walk
          </button>
          <button className="ds-action-btn ds-move-btn" onClick={() => addMove('right')}>
            ↪ Right + Walk
          </button>
        </div>
        <button className="ds-reset-btn" onClick={reset}>↻ Reset Path</button>
      </div>

      {moves.length > 0 && (
        <div className="ds-moves-log">
          <strong>Moves:</strong> {moves.map((m, i) => (
            <span key={i} className="ds-move-tag">
              {m.turn === 'none' ? `↑${m.steps}` : `${m.turn === 'left' ? '←' : '→'}${m.steps}`}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function DirectionQuiz() {
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState(Array(QUIZ_QUESTIONS.length).fill(false));
  const [feedback, setFeedback] = useState(Array(QUIZ_QUESTIONS.length).fill(null));

  const handleAnswer = useCallback((qi, option) => {
    if (answered[qi]) return;
    const newAnswered = [...answered];
    newAnswered[qi] = true;
    setAnswered(newAnswered);
    const isCorrect = option === QUIZ_QUESTIONS[qi].answer;
    const newFeedback = [...feedback];
    newFeedback[qi] = isCorrect ? 'correct' : 'wrong';
    setFeedback(newFeedback);
    if (isCorrect) setScore(s => s + 1);
  }, [answered, feedback]);

  const resetQuiz = useCallback(() => {
    setScore(0);
    setAnswered(Array(QUIZ_QUESTIONS.length).fill(false));
    setFeedback(Array(QUIZ_QUESTIONS.length).fill(null));
  }, []);

  return (
    <div className="ds-card">
      <h2>🎯 Practice Quiz — {QUIZ_QUESTIONS.length} Questions</h2>
      <div className="ds-quiz-score">Score: {score} / {QUIZ_QUESTIONS.length}</div>
      <button className="ds-reset-btn" onClick={resetQuiz}>↻ Reset Quiz</button>
      {QUIZ_QUESTIONS.map((q, qi) => (
        <div key={qi} className="ds-quiz-q">
          <p><strong>Q{qi + 1}.</strong> {q.q}</p>
          <div className="ds-quiz-options">
            {q.options.map(opt => {
              let cls = 'ds-quiz-option';
              if (answered[qi]) {
                if (opt === q.answer) cls += ' ds-correct';
                else if (feedback[qi] === 'wrong' && opt !== q.answer) cls += '';
              }
              return (
                <button key={opt} className={cls} onClick={() => handleAnswer(qi, opt)}>
                  {opt}
                </button>
              );
            })}
          </div>
          {feedback[qi] === 'correct' && <div className="ds-quiz-feedback ds-correct">✅ Correct!</div>}
          {feedback[qi] === 'wrong' && <div className="ds-quiz-feedback ds-wrong">❌ Answer: {q.answer}</div>}
        </div>
      ))}
    </div>
  );
}

export default function DirectionSensePage() {
  const [activeTab, setActiveTab] = useState('learn');

  return (
    <div className="ds-page">
      <div className="ds-header">
        <h1>🧭 Direction Sense</h1>
        <p>Learn directions, practise reasoning, and explore how directions work in real life.</p>
      </div>

      <div className="ds-tabs">
        {[
          { id: 'learn', icon: '📚', label: 'Learn' },
          { id: 'practice', icon: '🎯', label: 'Practice' },
          { id: 'activity', icon: '🚶', label: 'Activity' },
        ].map(tab => (
          <button
            key={tab.id}
            className={`ds-tab ${activeTab === tab.id ? 'ds-tab-active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'learn' && (
          <motion.div key="learn" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <InteractiveCompass />
            <TurnSimulator />
            <ShadowSimulator />
            <LatitudeLongitude />

            <div className="ds-card ds-fun-fact">
              <h3>💡 Fun Fact</h3>
              <p>Before modern clocks and GPS, people used the Sun, shadows, and other observations to help understand direction and estimate time!</p>
            </div>
          </motion.div>
        )}

        {activeTab === 'practice' && (
          <motion.div key="practice" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <MovementTracker />
            <DirectionQuiz />
          </motion.div>
        )}

        {activeTab === 'activity' && (
          <motion.div key="activity" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
            <div className="ds-card">
              <h2>🚶 Real-World Compass Activity</h2>
              <p>Use a physical compass or the compass app on a phone.</p>
              <ol className="ds-activity-list">
                <li>Ask students to stand and find <strong>North</strong>.</li>
                <li>Say "Turn right." Ask which direction they face.</li>
                <li>Try "Turn left twice" and "Turn around."</li>
                <li>Give movement challenges: <strong>"Walk 4 steps North, turn right, then walk 3 steps."</strong></li>
                <li>Ask where they are compared with their starting point.</li>
              </ol>
              <div className="ds-challenge-box">
                <strong>⭐ Group Challenge:</strong> One student is the navigator. They give 3–5 movement instructions while another student follows. Everyone checks the final direction together.
              </div>
            </div>

            <div className="ds-card">
              <h2>💡 Questions You Can Ask</h2>
              <ul className="ds-questions-list">
                <li>"If East is on your right, which way are you facing?"</li>
                <li>"You are facing South and turn left. Where are you facing?"</li>
                <li>"If you move North and then East, where are you compared with your starting point?"</li>
                <li>"Can you draw your movement instead of only imagining it?"</li>
              </ul>
            </div>

            <div className="ds-card ds-fun-fact">
              <h3>🧭 Why does a shadow change?</h3>
              <p>Imagine a stick standing in the ground. The Sun shines on it, and the stick blocks the light. The dark shape behind it is the <strong>shadow</strong>.</p>
              <p>In the morning, the Sun is in one part of the sky, so the shadow points in one direction. Around midday, the Sun is higher, so the shadow is usually shorter. Later in the day, the Sun moves lower again and the shadow becomes longer and points in another direction.</p>
              <p><strong>Try this:</strong> Ask students to place a bottle or stick in sunlight and check its shadow at different times. They can observe both the direction and length changing.</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
