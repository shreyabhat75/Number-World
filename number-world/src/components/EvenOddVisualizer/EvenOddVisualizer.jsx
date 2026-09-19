import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OBJECTS = [
  { emoji: '🍎', name: 'Apples' },
  { emoji: '⭐', name: 'Stars' },
  { emoji: '🐟', name: 'Fish' },
  { emoji: '🧸', name: 'Teddy Bears' },
  { emoji: '🌸', name: 'Flowers' },
  { emoji: '🎈', name: 'Balloons' },
];

export default function EvenOddVisualizer({ number, showPairing }) {
  const [selectedObject, setSelectedObject] = useState(OBJECTS[0]);
  const [pairingDone, setPairingDone] = useState(false);
  
  useEffect(() => {
    setPairingDone(false);
  }, [number]);

  const abs = Math.abs(number);
  if (abs === 0 || abs > 50) {
    return (
      <div className="even-odd-viz">
        <p className="viz-note">
          {abs === 0 ? "0 is even! But let's try a number greater than 0 to see pairing." : "Let's use a smaller number to see the pairing clearly!"}
        </p>
      </div>
    );
  }

  const isEven = abs % 2 === 0;
  const pairs = Math.floor(abs / 2);
  const leftover = abs % 2;

  return (
    <div className="even-odd-viz">
      <div className="object-selector">
        {OBJECTS.map(obj => (
          <button
            key={obj.name}
            className={`object-btn ${selectedObject.name === obj.name ? 'selected' : ''}`}
            onClick={() => setSelectedObject(obj)}
            title={obj.name}
          >
            {obj.emoji}
          </button>
        ))}
      </div>
      
      <div className={`objects-container ${pairingDone ? 'paired' : ''}`}>
        <AnimatePresence>
          {Array.from({ length: abs }).map((_, i) => {
            const pairIndex = Math.floor(i / 2);
            const isLeftover = pairingDone && i === abs - 1 && leftover === 1;
            const row = Math.floor(i / 2);
            
            return (
              <motion.div
                key={i}
                className={`object-item ${isLeftover ? 'leftover' : ''}`}
                initial={{ opacity: 0, scale: 0, y: 20 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1, 
                  y: 0,
                }}
                transition={{ 
                  delay: i * 0.05,
                  type: 'spring',
                  stiffness: 300,
                }}
              >
                <motion.span
                  className="object-emoji"
                  animate={isLeftover ? { 
                    rotate: [-5, 5, -5],
                    scale: [1, 1.2, 1],
                  } : {}}
                  transition={{ duration: 0.5, repeat: isLeftover ? Infinity : 0 }}
                >
                  {selectedObject.emoji}
                </motion.span>
                {pairingDone && i % 2 === 0 && i < abs - 1 && (
                  <span className="pair-bracket">⟨</span>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {showPairing && (
        <motion.div
          className="pairing-display"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="pairs-grid">
            {Array.from({ length: pairs }).map((_, i) => (
              <motion.div
                key={i}
                className="pair-card"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 }}
              >
                <span>{selectedObject.emoji}</span>
                <span>{selectedObject.emoji}</span>
                <span className="pair-label">Pair {i + 1}</span>
              </motion.div>
            ))}
            {leftover === 1 && (
              <motion.div
                className="pair-card leftover-card"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: pairs * 0.1 }}
              >
                <motion.span
                  className="leftover-emoji"
                  animate={{ rotate: [-5, 5, -5] }}
                  transition={{ duration: 0.3, repeat: Infinity }}
                >
                  {selectedObject.emoji}
                </motion.span>
                <span className="pair-label">Left over!</span>
              </motion.div>
            )}
          </div>
          
          <motion.div
            className={`pairing-result ${isEven ? 'even-result' : 'odd-result'}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: pairs * 0.1 + 0.3 }}
          >
            {isEven ? (
              <>
                <span className="result-emoji">🎉</span>
                <span className="result-text">Everyone has a partner! <strong>{abs} is EVEN!</strong></span>
              </>
            ) : (
              <>
                <span className="result-emoji">☝️</span>
                <span className="result-text">One is left over! <strong>{abs} is ODD!</strong></span>
              </>
            )}
          </motion.div>
        </motion.div>
      )}

      {!showPairing && (
        <button
          className="show-pairing-btn"
          onClick={() => setPairingDone(true)}
        >
          Show me how! 🤔
        </button>
      )}
    </div>
  );
}
