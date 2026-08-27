import { useState } from 'react';
import { motion } from 'framer-motion';
import EvenOddVisualizer from '../components/EvenOddVisualizer/EvenOddVisualizer';
import DownloadButtons from '../components/DownloadButtons/DownloadButtons';

export default function EvenOdd() {
  const [number, setNumber] = useState(7);
  const [showPairing, setShowPairing] = useState(false);

  return (
    <div className="even-odd-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>🍎 Even & Odd Numbers</h1>
        <p>Can you pair them all? Let's find out!</p>
      </motion.div>

      <div className="even-odd-input-section">
        <label>Choose a number: </label>
        <div className="number-stepper">
          <button onClick={() => { setNumber(Math.max(1, number - 1)); setShowPairing(false); }}>−</button>
          <motion.span
            key={number}
            className="stepper-value"
            initial={{ scale: 1.3 }}
            animate={{ scale: 1 }}
          >
            {number}
          </motion.span>
          <button onClick={() => { setNumber(Math.min(50, number + 1)); setShowPairing(false); }}>+</button>
        </div>
        <input
          type="range"
          min={1}
          max={50}
          value={number}
          onChange={e => { setNumber(parseInt(e.target.value)); setShowPairing(false); }}
        />
      </div>

      <div className="even-odd-result-quick">
        <motion.div
          className={`quick-result ${number % 2 === 0 ? 'even' : 'odd'}`}
          key={number}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
        >
          <span className="quick-number">{number}</span>
          <span className="quick-type">{number % 2 === 0 ? '🟦 EVEN' : '🟧 ODD'}</span>
        </motion.div>
      </div>

      <EvenOddVisualizer
        number={number}
        showPairing={showPairing}
      />

      {!showPairing && (
        <motion.button
          className="show-pairing-btn"
          onClick={() => setShowPairing(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Show me how! 🤔
        </motion.button>
      )}

      <div className="even-odd-info-cards">
        <motion.div
          className="info-card even-card"
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h3>🟦 Even Numbers</h3>
          <p>Everyone has a partner!</p>
          <div className="info-examples">
            {[2, 4, 6, 8, 10].map(n => (
              <span key={n} className="example-chip even-chip">{n}</span>
            ))}
          </div>
        </motion.div>
        <motion.div
          className="info-card odd-card"
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3>🟧 Odd Numbers</h3>
          <p>One is left over!</p>
          <div className="info-examples">
            {[1, 3, 5, 7, 9].map(n => (
              <span key={n} className="example-chip odd-chip">{n}</span>
            ))}
          </div>
        </motion.div>
      </div>

      <DownloadButtons topicSlug="even-odd" topicLabel="Even & Odd Numbers" />
    </div>
  );
}
