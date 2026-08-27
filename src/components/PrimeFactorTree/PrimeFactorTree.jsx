import { useState, useCallback, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { isPrime } from '../../utils/numberUtils';
import { getValidFactorPairs } from '../../utils/primeUtils';
import { computeLayout } from '../../utils/treeLayout';
import { getHint } from '../../utils/hints';

let nodeIdCounter = 0;
function makeNodeId() { return `node_${++nodeIdCounter}_${Date.now()}`; }

function createNode(value) {
  return { id: makeNodeId(), value, isPrime: isPrime(value), children: [], state: 'idle' };
}

function cloneTree(node) {
  return { ...node, children: node.children.map(cloneTree) };
}

function setNodeChildren(tree, targetId, left, right) {
  if (tree.id === targetId) {
    return { ...tree, children: [left, right], state: 'split' };
  }
  return { ...tree, children: tree.children.map(c => setNodeChildren(c, targetId, left, right)) };
}

function areAllLeavesPrime(node) {
  if (node.children.length === 0) return node.isPrime;
  return node.children.every(areAllLeavesPrime);
}

function collectLeaves(node) {
  if (node.children.length === 0) return [node.value];
  return node.children.flatMap(collectLeaves);
}

function countTotalNodes(node) {
  let count = 1;
  for (const child of node.children) count += countTotalNodes(child);
  return count;
}

function countLeaves(node) {
  if (node.children.length === 0) return 1;
  return node.children.reduce((sum, c) => sum + countLeaves(c), 0);
}

function countPrimes(node) {
  if (node.children.length === 0) return node.isPrime ? 1 : 0;
  return node.children.reduce((sum, c) => sum + countPrimes(c), 0);
}

function findNode(tree, id) {
  if (tree.id === id) return tree;
  for (const child of tree.children) {
    const found = findNode(child, id);
    if (found) return found;
  }
  return null;
}

export default function PrimeFactorTree({ initialNumber, onComplete, gameMode = false, onXP }) {
  const [tree, setTree] = useState(() => ({ ...createNode(initialNumber), state: 'active' }));
  const [selectedNode, setSelectedNode] = useState(null);
  const [animating, setAnimating] = useState(false);
  const [hintsUsed, setHintsUsed] = useState(0);
  const [currentHint, setCurrentHint] = useState(null);
  const [showHint, setShowHint] = useState(false);
  const [mistakes, setMistakes] = useState(0);
  const [startTime] = useState(Date.now());
  const [treeComplete, setTreeComplete] = useState(false);
  const [autoSolving, setAutoSolving] = useState(false);
  const containerRef = useRef(null);

  const isComplete = areAllLeavesPrime(tree);
  const leaves = collectLeaves(tree);
  const totalFactors = countLeaves(tree);
  const primesFound = countPrimes(tree);
  const onCompleteRef = useRef(onComplete);
  const onXPRef = useRef(onXP);
  onCompleteRef.current = onComplete;
  onXPRef.current = onXP;

  useEffect(() => {
    if (isComplete && !treeComplete) {
      setTreeComplete(true);
      const elapsed = Math.floor((Date.now() - startTime) / 1000);
      const xpEarned = Math.max(10, 30 - hintsUsed * 5 - mistakes * 3);
      if (onCompleteRef.current) onCompleteRef.current({
        number: initialNumber,
        factors: leaves.sort((a, b) => a - b),
        hintsUsed,
        mistakes,
        elapsed,
        xp: xpEarned,
      });
      if (onXPRef.current) onXPRef.current(xpEarned);
    }
  }, [isComplete, treeComplete, initialNumber, leaves, hintsUsed, mistakes]);

  const layout = computeLayout(tree);

  const handleSplit = useCallback((nodeId, a, b) => {
    if (animating) return;
    setAnimating(true);
    const left = createNode(a);
    const right = createNode(b);
    setTree(prev => setNodeChildren(prev, nodeId, left, right));
    setSelectedNode(null);
    setTimeout(() => setAnimating(false), 400);
  }, [animating]);

  const handleNodeClick = useCallback((node) => {
    if (animating || node.isPrime || node.children.length > 0) return;
    setSelectedNode(selectedNode === node.id ? null : node.id);
  }, [animating, selectedNode]);

  const handleUseHint = useCallback(() => {
    const nodeValue = selectedNode ? findNode(tree, selectedNode)?.value : findUnsplitComposite(tree)?.value;
    if (!nodeValue) return;
    const hint = getHint(nodeValue, hintsUsed);
    setCurrentHint(hint);
    setShowHint(true);
    setHintsUsed(prev => prev + 1);
  }, [selectedNode, tree, hintsUsed]);

  const handleAutoSolve = useCallback(() => {
    if (autoSolving || isComplete) return;
    setAutoSolving(true);

    let current = cloneTree(tree);
    const queue = [current];

    function step() {
      const node = queue.shift();
      if (!node || node.isPrime || node.children.length > 0) {
        if (queue.length > 0) {
          setTimeout(step, 500);
        } else {
          setTree(current);
          setAutoSolving(false);
        }
        return;
      }

      const pairs = getValidFactorPairs(node.value);
      if (pairs.length === 0) { setAutoSolving(false); return; }
      const [a, b] = pairs[0];
      const left = createNode(a);
      const right = createNode(b);

      function updateNode(n) {
        if (n.id === node.id) return { ...n, children: [left, right], state: 'split' };
        return { ...n, children: n.children.map(updateNode) };
      }
      current = updateNode(current);
      setTree(cloneTree(current));

      if (!isPrime(a)) queue.push(findNode(current, left.id));
      if (!isPrime(b)) queue.push(findNode(current, right.id));

      setTimeout(step, 600);
    }

    setTimeout(step, 300);
  }, [tree, autoSolving, isComplete]);

  const handleReset = useCallback(() => {
    nodeIdCounter = 0;
    setTree({ ...createNode(initialNumber), state: 'active' });
    setSelectedNode(null);
    setHintsUsed(0);
    setCurrentHint(null);
    setShowHint(false);
    setMistakes(0);
    setTreeComplete(false);
    setAutoSolving(false);
  }, [initialNumber]);

  useEffect(() => {
    nodeIdCounter = 0;
    setTree({ ...createNode(initialNumber), state: 'active' });
    setSelectedNode(null);
    setHintsUsed(0);
    setCurrentHint(null);
    setShowHint(false);
    setMistakes(0);
    setTreeComplete(false);
    setAutoSolving(false);
  }, [initialNumber]);

  const exponentForm = leaves.reduce((acc, f) => { acc[f] = (acc[f] || 0) + 1; return acc; }, {});
  const superscripts = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
  const expStr = Object.entries(exponentForm)
    .map(([base, exp]) => exp > 1 ? `${base}${String(exp).split('').map(d => superscripts[d]).join('')}` : base)
    .join(' × ');

  const svgWidth = Math.max(layout.width + 40, 300);
  const svgHeight = Math.max(layout.height + 20, 200);

  return (
    <div className="pft-container" ref={containerRef}>
      <div className="pft-progress-bar">
        <div className="pft-progress-label">
          🌱 Prime leaves: {primesFound} / {totalFactors}
        </div>
        <div className="pft-progress-track">
          <motion.div
            className="pft-progress-fill"
            animate={{ width: `${totalFactors > 0 ? (primesFound / totalFactors) * 100 : 0}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      <div className="pft-tree-viewport">
        <svg width={svgWidth} height={svgHeight} className="pft-svg">
          {layout.edges.map((edge, i) => (
            <motion.line
              key={i}
              x1={edge.from.x + 40}
              y1={edge.from.y}
              x2={edge.to.x + 40}
              y2={edge.to.y}
              stroke="#c4b5fd"
              strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
            />
          ))}
        </svg>

        <div className="pft-nodes-layer" style={{ width: svgWidth, height: svgHeight }}>
          {layout.nodes.map((pos) => {
            const nodeData = findNode(tree, pos.id);
            if (!nodeData) return null;
            const isSelected = selectedNode === pos.id;
            const isUnsplitComposite = !pos.isPrime && nodeData.children.length === 0;

            return (
              <motion.div
                key={pos.id}
                className={`pft-node ${pos.isPrime ? 'pft-prime' : 'pft-composite'} ${isSelected ? 'pft-selected' : ''} ${isUnsplitComposite ? 'pft-interactive' : ''} ${pos.state === 'split' ? 'pft-split' : ''}`}
                style={{ left: pos.x, top: pos.y }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20, delay: pos.depth * 0.1 }}
                onClick={() => handleNodeClick(nodeData)}
              >
                {pos.isPrime && (
                  <motion.div
                    className="pft-prime-glow"
                    animate={{ opacity: [0.4, 0.8, 0.4], scale: [1, 1.15, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                )}
                <span className="pft-node-value">{pos.value}</span>
                {pos.isPrime ? (
                  <span className="pft-node-badge pft-badge-prime">✓ PRIME</span>
                ) : nodeData.children.length === 0 ? (
                  <span className="pft-node-badge pft-badge-composite">↗ SPLIT</span>
                ) : (
                  <span className="pft-node-badge pft-badge-done">✓ Split</span>
                )}
                {pos.isPrime && (
                  <motion.span
                    className="pft-sparkle"
                    animate={{ opacity: [0, 1, 0], y: [0, -10] }}
                    transition={{ duration: 1.5, repeat: Infinity, delay: Math.random() * 2 }}
                  >✨</motion.span>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {selectedNode && !isComplete && !autoSolving && (() => {
          const nodeData = findNode(tree, selectedNode);
          if (!nodeData || nodeData.isPrime || nodeData.children.length > 0) return null;
          const pairs = getValidFactorPairs(nodeData.value);
          return (
            <motion.div
              className="pft-factor-selector"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <h3>Choose factors for <strong>{nodeData.value}</strong>:</h3>
              <div className="pft-factor-cards">
                {pairs.map(([a, b]) => (
                  <motion.button
                    key={`${a}-${b}`}
                    className="pft-factor-card"
                    onClick={() => handleSplit(selectedNode, a, b)}
                    whileHover={{ scale: 1.05, y: -3 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="pft-factor-a">{a}</span>
                    <span className="pft-factor-x">×</span>
                    <span className="pft-factor-b">{b}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          );
        })()}
      </AnimatePresence>

      {treeComplete && (
        <motion.div
          className="pft-complete"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <motion.span
            className="pft-complete-icon"
            animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.2, 1] }}
            transition={{ duration: 0.6 }}
          >🎉</motion.span>
          <h2>PRIME FACTORIZATION COMPLETE!</h2>
          <div className="pft-result-equation">
            {initialNumber} = {leaves.sort((a, b) => a - b).join(' × ')}
          </div>
          <div className="pft-result-exponent">{initialNumber} = {expStr}</div>
          <div className="pft-result-details">
            <div className="pft-result-item">
              <span className="pft-result-label">🌱 Prime leaves</span>
              <span className="pft-result-val">{primesFound}</span>
            </div>
            <div className="pft-result-item">
              <span className="pft-result-label">⭐ Unique primes</span>
              <span className="pft-result-val">{[...new Set(leaves)].sort((a, b) => a - b).join(', ')}</span>
            </div>
            <div className="pft-result-item">
              <span className="pft-result-label">💡 Hints used</span>
              <span className="pft-result-val">{hintsUsed}</span>
            </div>
            <div className="pft-result-item">
              <span className="pft-result-label">❌ Mistakes</span>
              <span className="pft-result-val">{mistakes}</span>
            </div>
          </div>
          <div className="pft-result-primes">
            {leaves.sort((a, b) => a - b).map((f, i) => (
              <motion.span
                key={i}
                className="pft-leaf-badge"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
              >🌱 {f}</motion.span>
            ))}
          </div>
        </motion.div>
      )}

      <div className="pft-controls">
        {!isComplete && !autoSolving && (
          <>
            <button className="pft-btn pft-btn-hint" onClick={handleUseHint}>
              💡 Hint {hintsUsed > 0 && `(${hintsUsed})`}
            </button>
            <button className="pft-btn pft-btn-auto" onClick={handleAutoSolve}>
              ✨ Show Me
            </button>
          </>
        )}
        <button className="pft-btn pft-btn-reset" onClick={handleReset}>
          🔄 Start Again
        </button>
      </div>

      <AnimatePresence>
        {showHint && currentHint && (
          <motion.div
            className="pft-hint-box"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
          >
            <span>💡</span>
            <p>{currentHint.text}</p>
            <button onClick={() => setShowHint(false)}>Got it!</button>
          </motion.div>
        )}
      </AnimatePresence>

      {!isComplete && !treeComplete && (
        <div className="pft-explanation">
          <h4>🌱 How the Prime Factor Tree Works</h4>
          <ol>
            <li>Start with a composite number.</li>
            <li>Split it into two factors.</li>
            <li>Check each factor — if composite, split again!</li>
            <li>Stop when every leaf is prime. 🌱</li>
            <li>Multiply all prime leaves for the factorization!</li>
          </ol>
        </div>
      )}
    </div>
  );
}

function findUnsplitComposite(node) {
  if (!node.isPrime && node.children.length === 0) return node;
  for (const child of node.children) {
    const found = findUnsplitComposite(child);
    if (found) return found;
  }
  return null;
}
