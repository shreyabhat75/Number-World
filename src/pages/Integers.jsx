import { useState } from 'react';
import { motion } from 'framer-motion';
import NumberLine from '../components/NumberLine/NumberLine';
import DownloadButtons from '../components/DownloadButtons/DownloadButtons';

export default function Integers() {
  const [number, setNumber] = useState(0);

  const getNumberInfo = (n) => {
    if (n === 0) {
      return {
        type: 'Zero',
        description: '0 is an integer, but it is neither positive nor negative!',
        color: '#6b7280',
        emoji: '⭕',
      };
    }
    if (n > 0) {
      return {
        type: 'Positive Integer',
        description: `+${n} is a positive integer.`,
        color: '#10b981',
        emoji: '⬆️',
      };
    }
    return {
      type: 'Negative Integer',
      description: `${n} is a negative integer.`,
      color: '#ef4444',
      emoji: '⬇️',
    };
  };

  const info = getNumberInfo(number);

  return (
    <div className="integers-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>➕➖ Integers</h1>
        <p>Explore both sides of zero!</p>
      </motion.div>

      <NumberLine value={number} onChange={setNumber} min={-20} max={20} />

      <motion.div
        className="integer-result"
        key={number}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ type: 'spring' }}
      >
        <motion.span
          className="integer-big-number"
          style={{ color: info.color }}
        >
          {number > 0 ? '+' : ''}{number}
        </motion.span>
        <div className="integer-info">
          <span className="integer-type-badge" style={{ background: info.color + '22', color: info.color, borderColor: info.color }}>
            {info.emoji} {info.type}
          </span>
          <p className="integer-description">{info.description}</p>
        </div>
      </motion.div>

      <div className="integer-categories">
        <h3>What categories does {number} belong to?</h3>
        <div className="category-chips">
          {[
            { label: 'Integer', check: true },
            { label: 'Positive', check: number > 0 },
            { label: 'Negative', check: number < 0 },
            { label: 'Natural', check: number >= 1 },
            { label: 'Whole', check: number >= 0 },
            { label: 'Even', check: number % 2 === 0 },
            { label: 'Odd', check: number !== 0 && number % 2 !== 0 },
          ].map((cat, i) => (
            <motion.div
              key={cat.label}
              className={`category-chip ${cat.check ? 'active' : ''}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
            >
              {cat.check ? '✅' : '❌'} {cat.label}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="integer-visual-section">
        <div className="number-line-legend">
          <div className="legend-item negative">
            <span className="legend-color" style={{ background: '#ef4444' }}></span>
            <span>Negative numbers</span>
          </div>
          <div className="legend-item zero">
            <span className="legend-color" style={{ background: '#6b7280' }}></span>
            <span>Zero</span>
          </div>
          <div className="legend-item positive">
            <span className="legend-color" style={{ background: '#10b981' }}></span>
            <span>Positive numbers</span>
          </div>
        </div>
      </div>

      <div className="integer-explanation">
        <div className="explanation-card">
          <h3>📐 Integers</h3>
          <p>Integers include all whole numbers and their negatives:</p>
          <p className="integer-sequence">..., -3, -2, -1, <strong>0</strong>, 1, 2, 3, ...</p>
        </div>
        <div className="explanation-card">
          <h3>🧭 Number Line</h3>
          <p>Negative numbers are to the <span style={{ color: '#ef4444' }}>left</span> of zero.</p>
          <p>Positive numbers are to the <span style={{ color: '#10b981' }}>right</span> of zero.</p>
          <p><strong>Zero</strong> is in the middle — neither positive nor negative!</p>
        </div>
      </div>

      <DownloadButtons topicSlug="integers" topicLabel="Integers" />
    </div>
  );
}
