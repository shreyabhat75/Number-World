import { useState } from 'react';
import { motion } from 'framer-motion';
import PrimeFactorTree from '../components/PrimeFactorTree/PrimeFactorTree';

export default function PrimeFactorTreePage() {
  const [number, setNumber] = useState(60);
  const [treeKey, setTreeKey] = useState(0);

  const startTree = () => {
    setTreeKey(prev => prev + 1);
  };

  return (
    <div className="factor-tree-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>🌳 Prime Factor Tree</h1>
        <p>Grow numbers into their prime factors!</p>
      </motion.div>

      <div className="tree-input-section">
        <label>Choose a number to factorize: </label>
        <div className="tree-input-row">
          <div className="number-stepper">
            <button onClick={() => setNumber(Math.max(4, number - 1))}>−</button>
            <motion.span
              key={number}
              className="stepper-value"
              initial={{ scale: 1.3 }}
              animate={{ scale: 1 }}
            >
              {number}
            </motion.span>
            <button onClick={() => setNumber(Math.min(1000, number + 1))}>+</button>
          </div>
          <button className="start-tree-btn" onClick={startTree}>
            Start Tree! 🌳
          </button>
        </div>
        <input
          type="range"
          min={4}
          max={200}
          value={number}
          onChange={e => setNumber(parseInt(e.target.value))}
        />
      </div>

      <div className="tree-info-box">
        <p>📖 <strong>Prime Factorization</strong> means writing a number as a product of prime numbers.</p>
        <p>Click <strong>"✂️ Split"</strong> on each number to choose factors. Keep going until all numbers at the bottom are prime!</p>
      </div>

      <div className="tree-workspace">
        <PrimeFactorTree
          key={treeKey}
          initialNumber={number}
        />
      </div>

      <div className="tree-examples">
        <h3>Try these numbers:</h3>
        <div className="example-buttons">
          {[12, 24, 36, 60, 100].map(n => (
            <motion.button
              key={n}
              className="example-btn"
              onClick={() => { setNumber(n); setTreeKey(prev => prev + 1); }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {n}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
}
