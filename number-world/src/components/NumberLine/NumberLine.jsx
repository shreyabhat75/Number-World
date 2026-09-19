import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

export default function NumberLine({ value, onChange, min = -20, max = 20 }) {
  const trackRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const range = max - min;
  const percent = ((value - min) / range) * 100;

  const handleTrackClick = (e) => {
    if (!trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = x / rect.width;
    const num = Math.round(min + pct * range);
    onChange(Math.max(min, Math.min(max, num)));
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    handleTrackClick(e);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !trackRef.current) return;
    const rect = trackRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const pct = x / rect.width;
    const num = Math.round(min + pct * range);
    onChange(Math.max(min, Math.min(max, num)));
  };

  const handleMouseUp = () => setIsDragging(false);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging]);

  const numbers = [];
  for (let i = min; i <= max; i += (range > 20 ? 5 : 1)) {
    numbers.push(i);
  }

  return (
    <div className="number-line-container" role="slider" aria-label="Number line" aria-valuenow={value} aria-valuemin={min} aria-valuemax={max}>
      <div className="number-line-track-wrapper">
        <div className="number-line-labels">
          {numbers.map(n => (
            <span key={n} className={`number-line-label ${n === 0 ? 'zero' : ''} ${n < 0 ? 'negative' : ''} ${n > 0 ? 'positive' : ''}`}>
              {n}
            </span>
          ))}
        </div>
        <div
          className="number-line-track"
          ref={trackRef}
          onMouseDown={handleMouseDown}
        >
          <div className="number-line-negative" style={{ width: `${((0 - min) / range) * 100}%` }} />
          <div className="number-line-zero" style={{ left: `${((0 - min) / range) * 100}%` }} />
          <div className="number-line-positive" style={{ left: `${((0 - min) / range) * 100}%`, width: `${((max - 0) / range) * 100}%` }} />
          <motion.div
            className="number-line-thumb"
            style={{ left: `${percent}%` }}
            animate={{ left: `${percent}%` }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          >
            <span className="thumb-character">🧑‍🚀</span>
            <span className="thumb-value">{value}</span>
          </motion.div>
        </div>
      </div>
      <div className="number-line-controls">
        <button className="num-btn" onClick={() => onChange(Math.max(min, value - 1))}>−1</button>
        <button className="num-btn" onClick={() => onChange(Math.max(min, value - 5))}>−5</button>
        <input
          type="number"
          className="number-input"
          value={value}
          onChange={e => {
            const v = parseInt(e.target.value);
            if (!isNaN(v)) onChange(Math.max(min, Math.min(max, v)));
          }}
          min={min}
          max={max}
        />
        <button className="num-btn" onClick={() => onChange(Math.min(max, value + 5))}>+5</button>
        <button className="num-btn" onClick={() => onChange(Math.min(max, value + 1))}>+1</button>
      </div>
    </div>
  );
}
