import { useState } from 'react';
import { motion } from 'framer-motion';

const BASES = [
  { name: 'Binary', base: 2, icon: '💻', color: '#3b82f6' },
  { name: 'Octal', base: 8, icon: '🐙', color: '#8b5cf6' },
  { name: 'Decimal', base: 10, icon: '🔟', color: '#10b981' },
  { name: 'Hexadecimal', base: 16, icon: '🔮', color: '#ec4899' },
];

function toBase(num, base) {
  if (num === 0) return '0';
  const digits = '0123456789ABCDEF';
  let result = '';
  let n = num;
  while (n > 0) {
    result = digits[n % base] + result;
    n = Math.floor(n / base);
  }
  return result;
}

export default function BasesPage() {
  const [decimal, setDecimal] = useState(42);

  return (
    <div className="placeholder-page">
      <motion.div className="page-header" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1>💻 Number Bases</h1>
        <p>Binary, octal, hexadecimal — how numbers work in different bases.</p>
      </motion.div>

      <div className="placeholder-section">
        <h2>Base Converter</h2>
        <div className="decimal-input-row">
          <label>
            Decimal number:
            <input type="number" min="0" max="10000" value={decimal} onChange={e => setDecimal(Math.max(0, parseInt(e.target.value) || 0))} className="decimal-input" />
          </label>
        </div>

        <div className="bases-grid">
          {BASES.map((b, i) => (
            <motion.div
              key={b.base}
              className="base-card"
              style={{ borderColor: b.color }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <div className="base-icon">{b.icon}</div>
              <div className="base-name">{b.name} (Base {b.base})</div>
              <div className="base-value">{toBase(decimal, b.base)}</div>
              <div className="base-digits">Digits: {Array.from({ length: b.base }, (_, i) => i < 10 ? i : 'ABCDEF'[i - 10]).join(' ')}</div>
            </motion.div>
          ))}
        </div>
      </div>

      <div className="placeholder-section">
        <h2>Why Different Bases?</h2>
        <div className="info-grid">
          <div className="info-card">
            <h4>Binary (Base 2)</h4>
            <p>Used by computers. Only 0 and 1. Every piece of data is ultimately binary.</p>
          </div>
          <div className="info-card">
            <h4>Octal (Base 8)</h4>
            <p>Used in Unix permissions and some programming contexts. Digits 0–7.</p>
          </div>
          <div className="info-card">
            <h4>Hexadecimal (Base 16)</h4>
            <p>Used in web colors, memory addresses. Digits 0–9 and A–F.</p>
          </div>
          <div className="info-card">
            <h4>Decimal (Base 10)</h4>
            <p>Our everyday number system. 10 digits: 0–9. Probably because we have 10 fingers!</p>
          </div>
        </div>
      </div>
    </div>
  );
}
