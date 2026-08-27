import { useState } from 'react';
import { motion } from 'framer-motion';

export default function DecimalsPage() {
  const [value, setValue] = useState(0.75);
  const str = value.toString();
  const parts = str.split('.');
  const integerPart = parts[0];
  const decimalPart = parts[1] || '';

  return (
    <div className="placeholder-page">
      <motion.div className="page-header" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1>🔸 Decimals</h1>
        <p>Decimal place value, operations, and conversions.</p>
      </motion.div>

      <div className="placeholder-section">
        <h2>Place Value Explorer</h2>
        <div className="decimal-input-row">
          <label>
            Enter a decimal number:
            <input
              type="number"
              step="0.01"
              min="0"
              max="99.99"
              value={value}
              onChange={e => setValue(parseFloat(e.target.value) || 0)}
              className="decimal-input"
            />
          </label>
        </div>

        <div className="place-value-row">
          {integerPart.split('').map((d, i) => (
            <motion.div key={`int-${i}`} className="pv-block" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: i * 0.05 }}>
              <div className="pv-digit">{d}</div>
              <div className="pv-label">{['Ones', 'Tens', 'Hundreds', 'Thousands'][integerPart.length - 1 - i]}</div>
            </motion.div>
          ))}
          <div className="pv-decimal-point">.</div>
          {decimalPart.split('').map((d, i) => (
            <motion.div key={`dec-${i}`} className="pv-block decimal" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: (integerPart.length + i) * 0.05 }}>
              <div className="pv-digit">{d}</div>
              <div className="pv-label">{['Tenths', 'Hundredths', 'Thousandths'][i]}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="placeholder-section">
        <h2>Conversions</h2>
        <div className="conversion-grid">
          <div className="conversion-card">
            <h4>As a fraction</h4>
            <p>{value} = {Math.round(value * Math.pow(10, decimalPart.length))} / {Math.pow(10, decimalPart.length)}</p>
          </div>
          <div className="conversion-card">
            <h4>Percentage</h4>
            <p>{value} = {(value * 100).toFixed(1)}%</p>
          </div>
          <div className="conversion-card">
            <h4>In words</h4>
            <p>{integerPart} point {decimalPart.split('').map(d => ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'][parseInt(d)]).join(' ')}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
