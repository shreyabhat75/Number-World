import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { getNumberTypes, getNotTypes, getDidYouKnow } from '../utils/numberUtils';
import { addXP } from '../utils/storage';
import NumberBadge from '../components/NumberBadge/NumberBadge';

const SUGGESTED_NUMBERS = [0, 1, 2, 3, 5, 7, 8, 10, 11, 12, 13, 15, 17, 20, 25, 30, 42, 50, 100];

const TYPE_INFO = {
  natural: { label: 'Natural', icon: '🌱', color: '#4ade80' },
  whole: { label: 'Whole', icon: '0️⃣', color: '#60a5fa' },
  integer: { label: 'Integer', icon: '🔢', color: '#a78bfa' },
  positive: { label: 'Positive', icon: '➕', color: '#34d399' },
  negative: { label: 'Negative', icon: '➖', color: '#f87171' },
  even: { label: 'Even', icon: '🟦', color: '#60a5fa' },
  odd: { label: 'Odd', icon: '🟧', color: '#fb923c' },
  prime: { label: 'Prime', icon: '⭐', color: '#fbbf24' },
  composite: { label: 'Composite', icon: '🧩', color: '#c084fc' },
};

export default function NumberExplorer({ onExplore }) {
  const [number, setNumber] = useState(12);
  const [showDidYouKnow, setShowDidYouKnow] = useState(false);

  const types = getNumberTypes(number);
  const notTypes = getNotTypes(number);
  const didYouKnow = getDidYouKnow(number);

  const handleExplore = useCallback((n) => {
    setNumber(n);
    setShowDidYouKnow(false);
    onExplore?.(n);
  }, [onExplore]);

  return (
    <div className="explorer-page">
      <motion.div
        className="explorer-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>🔍 Number Explorer</h1>
        <p>Enter any number and discover all about it!</p>
      </motion.div>

      <div className="explorer-input-section">
        <div className="explorer-controls">
          <button className="explorer-btn minus" onClick={() => handleExplore(number - 1)}>−</button>
          <motion.input
            type="number"
            className="explorer-number-input"
            value={number}
            onChange={e => {
              const v = parseInt(e.target.value);
              if (!isNaN(v)) handleExplore(v);
            }}
            key={number}
            initial={{ scale: 1.2 }}
            animate={{ scale: 1 }}
          />
          <button className="explorer-btn plus" onClick={() => handleExplore(number + 1)}>+</button>
        </div>

        <input
          type="range"
          className="explorer-slider"
          min={-100}
          max={100}
          value={number}
          onChange={e => handleExplore(parseInt(e.target.value))}
        />
      </div>

      <motion.div
        className="explorer-big-number"
        key={number}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300 }}
      >
        {number}
      </motion.div>

      <div className="explorer-suggestions">
        <span className="suggestions-label">Try:</span>
        {SUGGESTED_NUMBERS.map(n => (
          <motion.button
            key={n}
            className={`suggestion-btn ${n === number ? 'active' : ''}`}
            onClick={() => handleExplore(n)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            {n}
          </motion.button>
        ))}
      </div>

      <div className="explorer-types">
        <h3 className="types-heading">Number Types</h3>
        <div className="types-grid">
          {types.map((type, i) => (
            <NumberBadge
              key={type.key}
              label={type.label}
              icon={type.icon}
              color={type.color}
              present={true}
              delay={i * 0.1}
            />
          ))}
          {notTypes.map((key, i) => {
            const info = TYPE_INFO[key];
            return (
              <NumberBadge
                key={key}
                label={info.label}
                icon={info.icon}
                color={info.color}
                present={false}
                delay={(types.length + i) * 0.1}
              />
            );
          })}
        </div>
      </div>

      <motion.div className="did-you-know-section">
        <button
          className="dyk-toggle"
          onClick={() => setShowDidYouKnow(!showDidYouKnow)}
        >
          💡 {showDidYouKnow ? 'Hide' : 'Show'} Did You Know?
        </button>
        {showDidYouKnow && (
          <motion.div
            className="did-you-know-box"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
          >
            <p>{didYouKnow}</p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
