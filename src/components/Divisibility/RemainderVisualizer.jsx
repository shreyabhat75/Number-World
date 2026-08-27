import { motion } from 'framer-motion';

export default function RemainderVisualizer({ number, divisor }) {
  if (divisor <= 0 || number <= 0) return null;
  const quotient = Math.floor(number / divisor);
  const remainder = number % divisor;
  const totalObjects = Math.min(number, 50);
  const groups = Math.floor(totalObjects / divisor);
  const leftOver = totalObjects % divisor;

  return (
    <div className="remainder-viz">
      <h4>{number} ÷ {divisor}</h4>
      <div className="remainder-groups">
        {Array.from({ length: groups }).map((_, gi) => (
          <motion.div
            key={gi}
            className="remainder-group"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: gi * 0.08 }}
          >
            <div className="group-items">
              {Array.from({ length: divisor }).map((_, oi) => (
                <span key={oi} className="group-item">🍎</span>
              ))}
            </div>
            <span className="group-label">Group {gi + 1}</span>
          </motion.div>
        ))}
        {leftOver > 0 && (
          <motion.div
            className="remainder-leftover"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: groups * 0.08 }}
          >
            <div className="group-items">
              {Array.from({ length: leftOver }).map((_, oi) => (
                <motion.span
                  key={oi}
                  className="group-item leftover"
                  animate={{ rotate: [-5, 5, -5] }}
                  transition={{ duration: 0.5, repeat: Infinity }}
                >
                  🍎
                </motion.span>
              ))}
            </div>
            <span className="group-label">Left over!</span>
          </motion.div>
        )}
      </div>
      <div className="remainder-equation">
        {number} ÷ {divisor} = {quotient} {remainder > 0 ? `remainder ${remainder}` : ''}
      </div>
      {remainder === 0 ? (
        <p className="remainder-divisible">✓ {number} IS divisible by {divisor}!</p>
      ) : (
        <p className="remainder-not-divisible">✗ {number} is NOT divisible by {divisor} (remainder {remainder}).</p>
      )}
    </div>
  );
}
