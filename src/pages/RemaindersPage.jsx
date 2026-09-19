import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const styles = {
  container: {
    padding: '24px',
    minHeight: '100vh',
    background: 'var(--surface)',
  },
  header: {
    textAlign: 'center',
    marginBottom: '32px',
  },
  title: {
    fontSize: '2.5rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
    marginBottom: '8px',
    background: 'linear-gradient(135deg, var(--purple), var(--blue))',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
  },
  subtitle: {
    fontSize: '1.1rem',
    color: 'var(--text-secondary)',
  },
  mainGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '24px',
    maxWidth: '1200px',
    margin: '0 auto',
  },
  card: {
    background: 'white',
    borderRadius: 'var(--radius-lg)',
    padding: '24px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
    border: '1px solid var(--border)',
  },
  cardTitle: {
    fontSize: '1.3rem',
    fontWeight: '700',
    color: 'var(--text-primary)',
    marginBottom: '16px',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  inputGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '12px',
    marginBottom: '16px',
  },
  label: {
    fontSize: '0.95rem',
    fontWeight: '600',
    color: 'var(--text-secondary)',
    minWidth: '70px',
  },
  btnGroup: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
  },
  btn: {
    width: '40px',
    height: '40px',
    borderRadius: 'var(--radius-md)',
    border: '2px solid var(--border)',
    background: 'white',
    fontSize: '1.3rem',
    fontWeight: '700',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.2s',
    color: 'var(--text-primary)',
  },
  btnHover: {
    background: 'var(--purple)',
    color: 'white',
    borderColor: 'var(--purple)',
  },
  valueDisplay: {
    fontSize: '1.8rem',
    fontWeight: '800',
    color: 'var(--purple)',
    minWidth: '60px',
    textAlign: 'center',
  },
  blocksContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    gap: '6px',
    padding: '16px',
    minHeight: '120px',
    background: '#f8f9fa',
    borderRadius: 'var(--radius-md)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  block: {
    width: '28px',
    height: '28px',
    borderRadius: '6px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.7rem',
    fontWeight: '700',
    color: 'white',
  },
  groupContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
    padding: '16px',
    background: '#f8f9fa',
    borderRadius: 'var(--radius-md)',
    minHeight: '120px',
  },
  groupRow: {
    display: 'flex',
    gap: '4px',
    alignItems: 'center',
  },
  groupLabel: {
    fontSize: '0.75rem',
    color: 'var(--text-secondary)',
    fontWeight: '600',
    marginRight: '8px',
    minWidth: '50px',
  },
  formulaBox: {
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    borderRadius: 'var(--radius-lg)',
    padding: '20px',
    textAlign: 'center',
    color: 'white',
    marginTop: '16px',
  },
  formulaText: {
    fontSize: '1.4rem',
    fontWeight: '700',
    letterSpacing: '1px',
  },
  patternScroll: {
    display: 'flex',
    gap: '16px',
    overflowX: 'auto',
    padding: '16px 8px',
    background: '#f8f9fa',
    borderRadius: 'var(--radius-md)',
  },
  patternItem: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '4px',
    minWidth: '80px',
  },
  patternBlocks: {
    display: 'flex',
    gap: '3px',
    flexWrap: 'wrap',
    justifyContent: 'center',
    maxWidth: '70px',
  },
  patternLabel: {
    fontSize: '0.8rem',
    fontWeight: '600',
    color: 'var(--text-secondary)',
  },
  patternRemainder: {
    fontSize: '0.75rem',
    fontWeight: '700',
    padding: '2px 8px',
    borderRadius: '10px',
  },
  challengeBox: {
    textAlign: 'center',
  },
  questionText: {
    fontSize: '2rem',
    fontWeight: '800',
    color: 'var(--text-primary)',
    marginBottom: '24px',
  },
  choicesGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginBottom: '20px',
  },
  choiceBtn: {
    padding: '16px',
    borderRadius: 'var(--radius-md)',
    border: '2px solid var(--border)',
    background: 'white',
    fontSize: '1.3rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.2s',
    color: 'var(--text-primary)',
  },
  scoreBar: {
    display: 'flex',
    justifyContent: 'center',
    gap: '24px',
    marginBottom: '16px',
  },
  scoreItem: {
    fontSize: '1rem',
    fontWeight: '700',
    padding: '8px 16px',
    borderRadius: 'var(--radius-md)',
  },
  feedback: {
    fontSize: '1.2rem',
    fontWeight: '700',
    padding: '12px',
    borderRadius: 'var(--radius-md)',
    marginTop: '12px',
  },
  tabContainer: {
    display: 'flex',
    gap: '8px',
    marginBottom: '20px',
  },
  tab: {
    padding: '10px 20px',
    borderRadius: 'var(--radius-md)',
    border: '2px solid var(--border)',
    background: 'white',
    fontSize: '0.95rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.2s',
    color: 'var(--text-secondary)',
  },
  activeTab: {
    background: 'var(--purple)',
    color: 'white',
    borderColor: 'var(--purple)',
  },
  fullWidth: {
    gridColumn: '1 / -1',
  },
  divisorInfo: {
    fontSize: '0.9rem',
    color: 'var(--text-secondary)',
    marginBottom: '12px',
    fontWeight: '500',
  },
  resetBtn: {
    padding: '10px 24px',
    borderRadius: 'var(--radius-md)',
    border: 'none',
    background: 'var(--green)',
    color: 'white',
    fontSize: '1rem',
    fontWeight: '700',
    cursor: 'pointer',
    transition: 'all 0.2s',
  },
  centeredContent: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '100px',
  },
  emptyText: {
    color: 'var(--text-secondary)',
    fontStyle: 'italic',
  },
};

export default function RemaindersPage() {
  const [dividend, setDividend] = useState(17);
  const [divisor, setDivisor] = useState(5);
  const [activeTab, setActiveTab] = useState('visualize');
  const [challengeDividend, setChallengeDividend] = useState(0);
  const [challengeDivisor, setChallengeDivisor] = useState(0);
  const [choices, setChoices] = useState([]);
  const [score, setScore] = useState({ correct: 0, total: 0 });
  const [feedback, setFeedback] = useState(null);
  const [selectedChoice, setSelectedChoice] = useState(null);
  const [animating, setAnimating] = useState(false);

  const quotient = Math.floor(dividend / divisor);
  const remainder = dividend % divisor;

  const adjustValue = useCallback((setter, value, min, max, delta) => {
    setter(Math.min(max, Math.max(min, value + delta)));
  }, []);

  const generateChallenge = useCallback(() => {
    const newDivisor = Math.floor(Math.random() * 9) + 2;
    const maxDividend = Math.min(200, newDivisor * 10 + newDivisor - 1);
    const newDividend = Math.floor(Math.random() * (maxDividend - newDivisor)) + newDivisor;
    const correctQuotient = Math.floor(newDividend / newDivisor);
    const correctRemainder = newDividend % newDivisor;

    const choiceSet = new Set();
    choiceSet.add(`${correctQuotient} R${correctRemainder}`);

    while (choiceSet.size < 4) {
      const wrongQ = correctQuotient + Math.floor(Math.random() * 5) - 2;
      const wrongR = Math.floor(Math.random() * newDivisor);
      if (wrongQ >= 0 && `${wrongQ} R${wrongR}` !== `${correctQuotient} R${correctRemainder}`) {
        choiceSet.add(`${wrongQ} R${wrongR}`);
      }
    }

    const shuffled = Array.from(choiceSet).sort(() => Math.random() - 0.5);
    setChallengeDividend(newDividend);
    setChallengeDivisor(newDivisor);
    setChoices(shuffled);
    setFeedback(null);
    setSelectedChoice(null);
  }, []);

  useEffect(() => {
    if (activeTab === 'challenge') {
      generateChallenge();
    }
  }, [activeTab, generateChallenge]);

  const handleChoice = (choice) => {
    if (feedback) return;
    setSelectedChoice(choice);
    const correctAnswer = `${Math.floor(challengeDividend / challengeDivisor)} R${challengeDividend % challengeDivisor}`;
    const isCorrect = choice === correctAnswer;
    setFeedback({ correct: isCorrect, message: isCorrect ? 'Correct! 🎉' : `Not quite! Answer: ${correctAnswer}` });
    setScore(prev => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));
  };

  const renderBlocks = (count, color, size = 28) => {
    return Array.from({ length: count }, (_, i) => (
      <motion.div
        key={i}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: i * 0.02, type: 'spring', stiffness: 300, damping: 20 }}
        style={{
          ...styles.block,
          width: `${size}px`,
          height: `${size}px`,
          background: color,
        }}
      />
    ));
  };

  const renderGroupedVisualization = () => {
    if (dividend === 0 || divisor === 0) {
      return (
        <div style={styles.centeredContent}>
          <span style={styles.emptyText}>Enter values to see the visualization</span>
        </div>
      );
    }

    const groups = [];
    for (let i = 0; i < quotient; i++) {
      groups.push(
        <motion.div
          key={`group-${i}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + i * 0.1, type: 'spring', stiffness: 200 }}
          style={styles.groupRow}
        >
          <span style={styles.groupLabel}>Group {i + 1}</span>
          {Array.from({ length: divisor }, (_, j) => (
            <motion.div
              key={j}
              initial={{ scale: 0, x: -50, y: -50 }}
              animate={{ scale: 1, x: 0, y: 0 }}
              transition={{
                delay: 0.5 + i * 0.15 + j * 0.05,
                type: 'spring',
                stiffness: 300,
                damping: 15,
              }}
              style={{
                ...styles.block,
                background: 'var(--blue)',
                boxShadow: '0 2px 8px rgba(59,130,246,0.3)',
              }}
            />
          ))}
        </motion.div>
      );
    }

    if (remainder > 0) {
      groups.push(
        <motion.div
          key="remainder-group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 + quotient * 0.1 + 0.2, type: 'spring', stiffness: 200 }}
          style={styles.groupRow}
        >
          <span style={{ ...styles.groupLabel, color: 'var(--red)' }}>Leftover</span>
          {Array.from({ length: remainder }, (_, j) => (
            <motion.div
              key={j}
              initial={{ scale: 0, x: 50, y: -50 }}
              animate={{ scale: 1, x: 0, y: 0 }}
              transition={{
                delay: 0.5 + quotient * 0.15 + j * 0.08,
                type: 'spring',
                stiffness: 300,
                damping: 15,
              }}
              style={{
                ...styles.block,
                background: 'var(--red)',
                boxShadow: '0 2px 8px rgba(239,68,68,0.3)',
              }}
            />
          ))}
        </motion.div>
      );
    }

    return (
      <div style={styles.groupContainer}>
        <AnimatePresence>
          {groups}
        </AnimatePresence>
      </div>
    );
  };

  const renderPatternExplorer = () => {
    const patterns = [];
    const maxItems = 15;
    for (let i = 1; i <= maxItems; i++) {
      const q = Math.floor(i / divisor);
      const r = i % divisor;
      patterns.push({ value: i, quotient: q, remainder: r });
    }

    return (
      <div>
        <div style={styles.divisorInfo}>
          Showing pattern for dividing by <strong>{divisor}</strong>:
        </div>
        <div style={styles.patternScroll}>
          {patterns.map((p, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05, type: 'spring', stiffness: 200 }}
              style={styles.patternItem}
            >
              <div style={styles.patternBlocks}>
                {Array.from({ length: p.value }, (_, i) => (
                  <motion.div
                    key={i}
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: idx * 0.05 + i * 0.02, type: 'spring', stiffness: 400 }}
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '3px',
                      background: i < p.quotient * divisor ? 'var(--blue)' : 'var(--red)',
                    }}
                  />
                ))}
              </div>
              <span style={styles.patternLabel}>{p.value} ÷ {divisor}</span>
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: idx * 0.05 + 0.3, type: 'spring' }}
                style={{
                  ...styles.patternRemainder,
                  background: p.remainder === 0 ? 'var(--green)' : 'var(--orange)',
                  color: 'white',
                }}
              >
                R{p.remainder}
              </motion.div>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          style={{
            marginTop: '12px',
            padding: '12px',
            background: '#e8f5e9',
            borderRadius: 'var(--radius-md)',
            textAlign: 'center',
            fontWeight: '600',
            color: 'var(--green)',
          }}
        >
          Pattern repeats every {divisor} numbers: R1, R2, ... R{divisor - 1}, R0
        </motion.div>
      </div>
    );
  };

  const renderChallengeMode = () => {
    return (
      <div style={styles.challengeBox}>
        <div style={styles.scoreBar}>
          <div style={{ ...styles.scoreItem, background: '#e8f5e9', color: 'var(--green)' }}>
            ✅ {score.correct}
          </div>
          <div style={{ ...styles.scoreItem, background: '#fff3e0', color: 'var(--orange)' }}>
            📊 {score.total}
          </div>
          <div style={{ ...styles.scoreItem, background: '#e3f2fd', color: 'var(--blue)' }}>
            ⭐ {score.total > 0 ? Math.round((score.correct / score.total) * 100) : 0}%
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={challengeDividend + challengeDivisor}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ type: 'spring', stiffness: 200, damping: 15 }}
          >
            <div style={styles.questionText}>
              What is {challengeDividend} ÷ {challengeDivisor}?
            </div>

            <div style={styles.choicesGrid}>
              {choices.map((choice, idx) => (
                <motion.button
                  key={choice}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1, type: 'spring', stiffness: 200 }}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleChoice(choice)}
                  style={{
                    ...styles.choiceBtn,
                    background: selectedChoice === choice
                      ? (feedback?.correct ? '#e8f5e9' : '#ffebee')
                      : 'white',
                    borderColor: selectedChoice === choice
                      ? (feedback?.correct ? 'var(--green)' : 'var(--red)')
                      : 'var(--border)',
                  }}
                >
                  {choice}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>

        <AnimatePresence>
          {feedback && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              style={{
                ...styles.feedback,
                background: feedback.correct ? '#e8f5e9' : '#ffebee',
                color: feedback.correct ? 'var(--green)' : 'var(--red)',
              }}
            >
              {feedback.message}
            </motion.div>
          )}
        </AnimatePresence>

        {feedback && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={generateChallenge}
            style={{
              ...styles.resetBtn,
              marginTop: '16px',
            }}
          >
            Next Question →
          </motion.button>
        )}
      </div>
    );
  };

  return (
    <div style={styles.container}>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
        style={styles.header}
      >
        <h1 style={styles.title}>Remainders Explorer</h1>
        <p style={styles.subtitle}>Discover what happens when numbers don't divide evenly!</p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        style={styles.mainGrid}
      >
        <div style={{ ...styles.card, ...styles.fullWidth }}>
          <div style={styles.tabContainer}>
            {['visualize', 'pattern', 'challenge'].map((tab) => (
              <motion.button
                key={tab}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveTab(tab)}
                style={{
                  ...styles.tab,
                  ...(activeTab === tab ? styles.activeTab : {}),
                }}
              >
                {tab === 'visualize' && '🔢 Visualize'}
                {tab === 'pattern' && '🔄 Pattern Explorer'}
                {tab === 'challenge' && '🎯 Challenge Mode'}
              </motion.button>
            ))}
          </div>

          {activeTab === 'visualize' && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
              <div>
                <div style={styles.cardTitle}>
                  <span style={{ color: 'var(--purple)' }}>📐</span> Set Your Numbers
                </div>

                <div style={styles.inputGroup}>
                  <span style={styles.label}>Dividend:</span>
                  <div style={styles.btnGroup}>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => adjustValue(setDividend, dividend, 1, 200, -1)}
                      style={styles.btn}
                    >
                      −
                    </motion.button>
                    <motion.span
                      key={dividend}
                      initial={{ scale: 1.3, color: 'var(--purple)' }}
                      animate={{ scale: 1, color: 'var(--text-primary)' }}
                      style={styles.valueDisplay}
                    >
                      {dividend}
                    </motion.span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => adjustValue(setDividend, dividend, 1, 200, 1)}
                      style={styles.btn}
                    >
                      +
                    </motion.button>
                  </div>
                </div>

                <div style={styles.inputGroup}>
                  <span style={styles.label}>Divisor:</span>
                  <div style={styles.btnGroup}>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => adjustValue(setDivisor, divisor, 2, 20, -1)}
                      style={styles.btn}
                    >
                      −
                    </motion.button>
                    <motion.span
                      key={divisor}
                      initial={{ scale: 1.3, color: 'var(--purple)' }}
                      animate={{ scale: 1, color: 'var(--text-primary)' }}
                      style={styles.valueDisplay}
                    >
                      {divisor}
                    </motion.span>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      onClick={() => adjustValue(setDivisor, divisor, 2, 20, 1)}
                      style={styles.btn}
                    >
                      +
                    </motion.button>
                  </div>
                </div>

                <motion.div
                  style={styles.formulaBox}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <div style={styles.formulaText}>
                    {dividend} = {divisor} × {quotient} + {remainder}
                  </div>
                </motion.div>

                <motion.div
                  style={{
                    marginTop: '16px',
                    padding: '16px',
                    background: '#f8f9fa',
                    borderRadius: 'var(--radius-md)',
                    textAlign: 'center',
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                >
                  <div style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    When you divide {dividend} by {divisor}:
                  </div>
                  <div style={{ fontSize: '1.2rem', fontWeight: '700', color: 'var(--text-primary)' }}>
                    You get <span style={{ color: 'var(--blue)' }}>{quotient} groups</span>
                    {remainder > 0 && (
                      <> with <span style={{ color: 'var(--red)' }}>{remainder} leftover</span></>
                    )}
                    {remainder === 0 && (
                      <span style={{ color: 'var(--green)' }}> with no remainder!</span>
                    )}
                  </div>
                </motion.div>
              </div>

              <div>
                <div style={styles.cardTitle}>
                  <span style={{ color: 'var(--blue)' }}>📦</span> Grouped Blocks
                </div>
                {renderGroupedVisualization()}
              </div>
            </div>
          )}

          {activeTab === 'pattern' && renderPatternExplorer()}
          {activeTab === 'challenge' && renderChallengeMode()}
        </div>
      </motion.div>
    </div>
  );
}