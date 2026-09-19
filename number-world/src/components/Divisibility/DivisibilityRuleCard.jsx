import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isDivisibleBy } from '../../utils/divisibilityUtils';
import RuleStepVisualizer from './RuleStepVisualizer';

export default function DivisibilityRuleCard({ rule, number, onExplore }) {
  const [expanded, setExpanded] = useState(false);
  const ok = isDivisibleBy(number, rule.divisor);

  return (
    <motion.div
      className={`divisibility-card ${ok ? 'divisible' : 'not-divisible'}`}
      style={{ borderTopColor: rule.color }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: `0 8px 24px ${rule.color}22` }}
      layout
    >
      <div className="div-card-header" onClick={() => setExpanded(!expanded)}>
        <div className="div-card-number" style={{ background: rule.color }}>
          {rule.icon} {rule.divisor}
        </div>
        <div className="div-card-info">
          <h4>{rule.title}</h4>
          <p>{rule.shortRule}</p>
        </div>
        <div className={`div-card-result ${ok ? 'yes' : 'no'}`}>
          {ok ? '✓ YES' : '✗ NO'}
        </div>
      </div>

      <AnimatePresence>
        {expanded && (
          <motion.div
            className="div-card-expanded"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
          >
            <div className="div-card-mascot">{rule.mascotLine}</div>
            <RuleStepVisualizer divisor={rule.divisor} number={number} />
            <div className="div-card-examples">
              <span>Try: </span>
              {rule.examples.map(ex => (
                <button key={ex} className="example-num" onClick={(e) => { e.stopPropagation(); onExplore?.(ex); }}>
                  {ex}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
