import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import DownloadButtons from '../components/DownloadButtons/DownloadButtons';

export default function NaturalNumbers() {
  const [mode, setMode] = useState('natural');
  const [count, setCount] = useState(10);
  
  const start = mode === 'natural' ? 1 : 0;
  const numbers = Array.from({ length: count }, (_, i) => start + i);

  return (
    <div className="natural-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>🌱 Natural & Whole Numbers</h1>
        <p>Watch numbers grow like a beautiful garden!</p>
      </motion.div>

      <div className="mode-toggle">
        <button
          className={`mode-btn ${mode === 'natural' ? 'active' : ''}`}
          onClick={() => setMode('natural')}
        >
          🌱 Natural Numbers
        </button>
        <button
          className={`mode-btn ${mode === 'whole' ? 'active' : ''}`}
          onClick={() => setMode('whole')}
        >
          0️⃣ Whole Numbers
        </button>
      </div>

      <div className="explanation-box">
        {mode === 'natural' ? (
          <p>Natural numbers are counting numbers starting from <strong>1</strong>: 1, 2, 3, 4, 5...</p>
        ) : (
          <p>Whole numbers include <strong>0</strong> plus all natural numbers: 0, 1, 2, 3, 4, 5...</p>
        )}
      </div>

      <div className="count-control">
        <label>How many numbers? </label>
        <input
          type="range"
          min={1}
          max={30}
          value={count}
          onChange={e => setCount(parseInt(e.target.value))}
        />
        <span className="count-value">{count}</span>
      </div>

      <div className="garden-container">
        <AnimatePresence>
          {numbers.map((n, i) => (
            <motion.div
              key={`${mode}-${n}`}
              className="garden-item"
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0 }}
              transition={{ delay: i * 0.08, type: 'spring', stiffness: 300 }}
            >
              <motion.div
                className="plant"
                animate={{ y: [0, -3, 0] }}
                transition={{ duration: 2, repeat: Infinity, delay: i * 0.2 }}
              >
                {n === 0 ? '🪨' : '🌱'}
              </motion.div>
              <span className="garden-number">{n}</span>
              <div className="growth-bars">
                {Array.from({ length: Math.min(n + (mode === 'whole' && n === 0 ? 1 : 0), 5) }).map((_, j) => (
                  <motion.div
                    key={j}
                    className="growth-bar"
                    style={{
                      height: `${(j + 1) * 4}px`,
                      background: `hsl(${120 + j * 15}, 60%, ${50 + j * 5}%)`,
                    }}
                    initial={{ height: 0 }}
                    animate={{ height: `${(j + 1) * 4}px` }}
                    transition={{ delay: i * 0.08 + j * 0.05 }}
                  />
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="natural-summary">
        <div className="summary-card">
          <h3>🌱 Natural Numbers</h3>
          <p>1, 2, 3, 4, 5, ...</p>
          <p className="small">Used for counting objects. Starting from 1.</p>
        </div>
        <div className="summary-card">
          <h3>0️⃣ Whole Numbers</h3>
          <p>0, 1, 2, 3, 4, 5, ...</p>
          <p className="small">Natural numbers plus zero.</p>
        </div>
      </div>

      <DownloadButtons topicSlug="natural-numbers" topicLabel="Natural & Whole Numbers" />
    </div>
  );
}
