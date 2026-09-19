import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isPrime, getFactors } from '../../utils/numberUtils';

export default function PrimeVisualizer({ number }) {
  const [testedDivisors, setTestedDivisors] = useState([]);
  const [showAllFactors, setShowAllFactors] = useState(false);
  
  const prime = isPrime(number);
  const factors = getFactors(number);
  
  const testDivisor = (d) => {
    if (!testedDivisors.includes(d)) {
      setTestedDivisors([...testedDivisors, d]);
    }
  };
  
  const resetTests = () => {
    setTestedDivisors([]);
    setShowAllFactors(false);
  };
  
  const possibleDivisors = [];
  for (let i = 2; i <= Math.min(number, 20); i++) {
    possibleDivisors.push(i);
  }

  return (
    <div className="prime-viz">
      <div className="prime-number-display">
        <motion.span
          className={`big-number ${prime ? 'is-prime' : 'not-prime'}`}
          key={number}
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300 }}
        >
          {number}
        </motion.span>
        {prime && (
          <motion.span
            className="prime-star"
            animate={{ rotate: [0, 360], scale: [1, 1.2, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ⭐
          </motion.span>
        )}
      </div>
      
      <p className="prime-question">
        Can you split {number} into equal groups?
      </p>
      
      <div className="divisor-buttons">
        {possibleDivisors.map(d => {
          const tested = testedDivisors.includes(d);
          const works = number % d === 0;
          return (
            <motion.button
              key={d}
              className={`divisor-btn ${tested ? (works ? 'works' : 'no-work') : ''}`}
              onClick={() => testDivisor(d)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              disabled={tested}
            >
              {d}
              {tested && (works ? ' ✓' : ' ✗')}
            </motion.button>
          );
        })}
      </div>
      
      <AnimatePresence>
        {testedDivisors.length > 0 && (
          <motion.div
            className="tested-results"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            {testedDivisors.map(d => {
              const works = number % d === 0;
              return (
                <motion.div
                  key={d}
                  className={`test-result ${works ? 'success' : 'fail'}`}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  {works ? (
                    <span>✅ {d} × {number / d} = {number}</span>
                  ) : (
                    <span>❌ {number} ÷ {d} = {(number / d).toFixed(2)} (not exact!)</span>
                  )}
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
      
      {testedDivisors.length > 0 && (
        <motion.button
          className="reset-btn"
          onClick={resetTests}
          whileHover={{ scale: 1.05 }}
        >
          Try different divisors 🔄
        </motion.button>
      )}

      <button
        className="show-factors-btn"
        onClick={() => setShowAllFactors(!showAllFactors)}
      >
        {showAllFactors ? 'Hide' : 'Show all factors'} 📋
      </button>
      
      <AnimatePresence>
        {showAllFactors && (
          <motion.div
            className="factors-list"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
          >
            <h4>Factors of {number}:</h4>
            <div className="factor-chips">
              {factors.map((f, i) => (
                <motion.span
                  key={f}
                  className={`factor-chip ${f === 1 || f === number ? 'boundary' : 'inner'}`}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                >
                  {f}
                </motion.span>
              ))}
            </div>
            <p className="factors-count">Total factors: {factors.length}</p>
            
            <motion.div
              className={`prime-conclusion ${prime ? 'is-prime' : 'not-prime'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {prime ? (
                <>
                  <span className="conclusion-icon">⭐</span>
                  <span>{number} has exactly 2 factors (1 and {number}). It is <strong>PRIME!</strong></span>
                </>
              ) : (
                <>
                  <span className="conclusion-icon">🧩</span>
                  <span>{number} has {factors.length} factors. It is <strong>COMPOSITE!</strong></span>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
