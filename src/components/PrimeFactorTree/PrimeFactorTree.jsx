import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isPrime } from '../../utils/numberUtils';
import { getValidFactorPairs } from '../../utils/primeUtils';

function TreeNode({ node, onSplit, depth = 0, animating }) {
  const [showChoices, setShowChoices] = useState(false);
  const pairs = getValidFactorPairs(node.value);
  
  const handleChoice = (a, b) => {
    onSplit(node, a, b);
    setShowChoices(false);
  };

  return (
    <div className="tree-node-wrapper">
      <motion.div
        className={`tree-node ${node.isPrime ? 'prime-node' : 'composite-node'}`}
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: depth * 0.15, type: 'spring', stiffness: 300 }}
      >
        {node.isPrime && (
          <motion.span
            className="prime-glow"
            animate={{ opacity: [0.3, 0.8, 0.3], scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        )}
        <span className="node-value">
          {node.isPrime && '⭐ '}{node.value}{node.isPrime && ' ⭐'}
        </span>
        {!node.isPrime && node.children.length === 0 && pairs.length > 0 && (
          <motion.button
            className="split-btn"
            onClick={() => setShowChoices(!showChoices)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={animating}
          >
            {showChoices ? 'Cancel' : '✂️ Split'}
          </motion.button>
        )}
        {node.isPrime && (
          <motion.span
            className="sparkle"
            animate={{ opacity: [0, 1, 0], y: [-5, -15] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: Math.random() }}
          >
            ✨
          </motion.span>
        )}
      </motion.div>

      <AnimatePresence>
        {showChoices && (
          <motion.div
            className="factor-choices"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <p className="choices-label">Choose factors to split {node.value}:</p>
            {pairs.map(([a, b]) => (
              <motion.button
                key={`${a}-${b}`}
                className="factor-choice-btn"
                onClick={() => handleChoice(a, b)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {a} × {b}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {node.children.length > 0 && (
        <div className="tree-children">
          <div className="tree-branch" />
          {node.children.map((child, i) => (
            <TreeNode
              key={`${child.value}-${i}-${depth}`}
              node={child}
              onSplit={onSplit}
              depth={depth + 1}
              animating={animating}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function cloneTree(node) {
  return {
    ...node,
    children: node.children.map(cloneTree),
  };
}

function setNodeChildren(tree, targetNode, left, right) {
  if (tree === targetNode) {
    return { ...tree, children: [left, right] };
  }
  return {
    ...tree,
    children: tree.children.map(c => setNodeChildren(c, targetNode, left, right)),
  };
}

function areAllLeavesPrime(node) {
  if (node.children.length === 0) return node.isPrime;
  return node.children.every(areAllLeavesPrime);
}

function collectLeaves(node) {
  if (node.children.length === 0) return [node.value];
  return node.children.flatMap(collectLeaves);
}

export default function PrimeFactorTree({ initialNumber, onComplete, gameMode = false }) {
  const [tree, setTree] = useState({ value: initialNumber, isPrime: isPrime(initialNumber), children: [] });
  const [animating, setAnimating] = useState(false);
  const [gameResult, setGameResult] = useState(null);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const isComplete = areAllLeavesPrime(tree);
  const leaves = collectLeaves(tree);

  const handleSplit = useCallback((node, a, b) => {
    setAnimating(true);
    const left = { value: a, isPrime: isPrime(a), children: [] };
    const right = { value: b, isPrime: isPrime(b), children: [] };
    setTree(prev => setNodeChildren(prev, node, left, right));
    setTimeout(() => setAnimating(false), 500);
  }, []);

  const resetTree = () => {
    setTree({ value: initialNumber, isPrime: isPrime(initialNumber), children: [] });
    setGameResult(null);
    setShowAdvanced(false);
  };

  const exponentForm = leaves.reduce((acc, f) => {
    acc[f] = (acc[f] || 0) + 1;
    return acc;
  }, {});

  const exponents = Object.entries(exponentForm)
    .map(([base, exp]) => {
      const superscripts = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
      if (exp > 1) {
        const sup = String(exp).split('').map(d => superscripts[d]).join('');
        return `${base}${sup}`;
      }
      return base;
    })
    .join(' × ');

  return (
    <div className="factor-tree-container">
      <div className="tree-display">
        <TreeNode
          node={tree}
          onSplit={handleSplit}
          depth={0}
          animating={animating}
        />
      </div>

      {isComplete && (
        <motion.div
          className="tree-complete"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <motion.span
            className="complete-icon"
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 0.5 }}
          >
            🎉
          </motion.span>
          <h3>TREE COMPLETE!</h3>
          <p className="factorization-result">
            {initialNumber} = {leaves.sort((a, b) => a - b).join(' × ')}
          </p>
          <div className="advanced-toggle">
            <button onClick={() => setShowAdvanced(!showAdvanced)}>
              {showAdvanced ? 'Hide' : 'Show advanced form'} 📐
            </button>
            {showAdvanced && (
              <motion.p
                className="exponent-form"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
              >
                {initialNumber} = {exponents}
              </motion.p>
            )}
          </div>
          <p className="prime-notice">All the leaves are prime! ⭐</p>
          <div className="prime-factors-list">
            {leaves.sort((a, b) => a - b).map((f, i) => (
              <motion.span
                key={i}
                className="prime-leaf"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                ⭐ {f}
              </motion.span>
            ))}
          </div>
        </motion.div>
      )}

      <div className="tree-controls">
        <button className="reset-tree-btn" onClick={resetTree}>
          Reset Tree 🔄
        </button>
      </div>
    </div>
  );
}
