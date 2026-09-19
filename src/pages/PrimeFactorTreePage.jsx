import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import PrimeFactorTree from '../components/PrimeFactorTree/PrimeFactorTree';
import { isPrime } from '../utils/numberUtils';
import { getChallengeNumber } from '../utils/hints';

const PRESET_NUMBERS = [12, 18, 24, 36, 48, 60, 72, 84, 100];

export default function PrimeFactorTreePage({ onTreeComplete }) {
  const [mode, setMode] = useState(null);
  const [inputNumber, setInputNumber] = useState(36);
  const [treeKey, setTreeKey] = useState(0);
  const [challengeDifficulty, setChallengeDifficulty] = useState('easy');
  const [challengeResult, setChallengeResult] = useState(null);
  const [totalXP, setTotalXP] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);

  const handlePreset = (n) => {
    setInputNumber(n);
    setTreeKey(prev => prev + 1);
    setChallengeResult(null);
  };

  const handleCustomStart = () => {
    const n = parseInt(inputNumber);
    if (!n || n < 2 || n > 1000 || isPrime(n)) return;
    setTreeKey(prev => prev + 1);
    setChallengeResult(null);
  };

  const handleChallengeStart = () => {
    const n = getChallengeNumber(challengeDifficulty);
    setInputNumber(n);
    setTreeKey(prev => prev + 1);
    setChallengeResult(null);
  };

  const handleComplete = useCallback((result) => {
    setChallengeResult(result);
    setTotalXP(prev => prev + result.xp);
    setCompletedCount(prev => prev + 1);
    if (onTreeComplete) onTreeComplete(result);
  }, [onTreeComplete]);

  const handleXP = useCallback((xp) => {}, []);

  return (
    <div className="pft-page">
      <motion.div
        className="page-header"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1>🌳 Prime Factor Tree</h1>
        <p>Grow numbers into their prime factors!</p>
      </motion.div>

      {!mode && (
        <motion.div
          className="pft-mode-select"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h2>How would you like to learn?</h2>
          <div className="pft-mode-cards">
            <motion.button
              className="pft-mode-card pft-mode-learn"
              onClick={() => setMode('learn')}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="pft-mode-icon">📚</span>
              <h3>LEARN</h3>
              <p>Guided practice with hints. Pick any number and build the tree at your own pace.</p>
            </motion.button>
            <motion.button
              className="pft-mode-card pft-mode-challenge"
              onClick={() => setMode('challenge')}
              whileHover={{ scale: 1.03, y: -5 }}
              whileTap={{ scale: 0.97 }}
            >
              <span className="pft-mode-icon">🎯</span>
              <h3>CHALLENGE</h3>
              <p>Random numbers, timer, XP, and achievements! Test your skills.</p>
            </motion.button>
          </div>
        </motion.div>
      )}

      {mode === 'learn' && (
        <motion.div
          className="pft-learn-mode"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="pft-input-section">
            <h3>Enter a number (2–1000):</h3>
            <div className="pft-input-row">
              <input
                type="number"
                className="pft-number-input"
                value={inputNumber}
                onChange={e => {
                  const v = parseInt(e.target.value);
                  if (!isNaN(v)) setInputNumber(v);
                }}
                min={2}
                max={1000}
              />
              <motion.button
                className="pft-start-btn"
                onClick={handleCustomStart}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Start Tree 🌳
              </motion.button>
            </div>
            {inputNumber && (inputNumber < 2 || inputNumber > 1000 || isPrime(inputNumber)) && (
              <p className="pft-input-error">
                {isPrime(inputNumber) ? `${inputNumber} is prime! Pick a composite number. 😊` : 'Please enter a whole number between 2 and 1000! 😊'}
              </p>
            )}
          </div>

          <div className="pft-presets">
            <h3>Try These!</h3>
            <div className="pft-preset-grid">
              {PRESET_NUMBERS.map(n => (
                <motion.button
                  key={n}
                  className={`pft-preset-btn ${inputNumber === n ? 'active' : ''}`}
                  onClick={() => handlePreset(n)}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.92 }}
                >
                  {n}
                </motion.button>
              ))}
            </div>
          </div>

          <div className="pft-tree-workspace">
            <PrimeFactorTree
              key={treeKey}
              initialNumber={inputNumber}
              onComplete={handleComplete}
              onXP={handleXP}
            />
          </div>

          {challengeResult && (
            <motion.div
              className="pft-result-banner"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
            >
              <span>🎉</span>
              <div>
                <strong>Amazing!</strong> {challengeResult.number} = {challengeResult.factors.join(' × ')}
                <br />⭐ +{challengeResult.xp} XP
              </div>
            </motion.div>
          )}

          <button className="pft-back-btn" onClick={() => { setMode(null); setTreeKey(prev => prev + 1); }}>
            ← Back to Menu
          </button>
        </motion.div>
      )}

      {mode === 'challenge' && (
        <motion.div
          className="pft-challenge-mode"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="pft-challenge-header">
            <div className="pft-challenge-stats">
              <span className="pft-stat">⭐ {totalXP} XP</span>
              <span className="pft-stat">🌳 {completedCount} completed</span>
            </div>
          </div>

          <div className="pft-difficulty-select">
            <h3>Choose difficulty:</h3>
            <div className="pft-difficulty-btns">
              {[
                { key: 'easy', label: '🌱 Easy', desc: 'Numbers 4–30' },
                { key: 'medium', label: '⭐ Medium', desc: 'Numbers 30–100' },
                { key: 'hard', label: '🚀 Hard', desc: 'Numbers 100–500' },
              ].map(d => (
                <motion.button
                  key={d.key}
                  className={`pft-diff-btn ${challengeDifficulty === d.key ? 'active' : ''}`}
                  onClick={() => setChallengeDifficulty(d.key)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span>{d.label}</span>
                  <small>{d.desc}</small>
                </motion.button>
              ))}
            </div>
          </div>

          <div className="pft-challenge-action">
            <motion.button
              className="pft-challenge-start-btn"
              onClick={handleChallengeStart}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              🎯 Challenge Me!
            </motion.button>
          </div>

          {inputNumber && treeKey > 0 && (
            <div className="pft-tree-workspace">
              <PrimeFactorTree
                key={treeKey}
                initialNumber={inputNumber}
                onComplete={handleComplete}
                onXP={handleXP}
                gameMode
              />
            </div>
          )}

          {challengeResult && (
            <motion.div
              className="pft-final-screen"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ type: 'spring', stiffness: 200 }}
            >
              <motion.span
                className="pft-final-icon"
                animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5 }}
              >🎉</motion.span>
              <h2>AMAZING!</h2>
              <p>You built the tree!</p>
              <div className="pft-final-equation">
                {challengeResult.number} = {challengeResult.factors.join(' × ')}
              </div>
              <div className="pft-final-stats">
                <span>🌱 Prime leaves: {challengeResult.factors.length}</span>
                <span>⭐ XP earned: +{challengeResult.xp}</span>
                <span>⏱ Time: {challengeResult.elapsed}s</span>
                {challengeResult.hintsUsed > 0 && <span>💡 Hints: {challengeResult.hintsUsed}</span>}
                {challengeResult.mistakes > 0 && <span>❌ Mistakes: {challengeResult.mistakes}</span>}
              </div>
              <div className="pft-final-actions">
                <motion.button
                  className="pft-btn pft-btn-primary"
                  onClick={handleChallengeStart}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >🎯 Challenge Me Again</motion.button>
                <motion.button
                  className="pft-btn pft-btn-secondary"
                  onClick={() => { setMode('learn'); setTreeKey(prev => prev + 1); }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >📚 Back to Learn</motion.button>
              </div>
            </motion.div>
          )}

          <button className="pft-back-btn" onClick={() => { setMode(null); setTreeKey(prev => prev + 1); }}>
            ← Back to Menu
          </button>
        </motion.div>
      )}
    </div>
  );
}
