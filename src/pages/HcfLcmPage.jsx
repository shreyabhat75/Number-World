import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

function getFactors(n) {
  if (n < 1) return [];
  const factors = [];
  for (let i = 1; i <= n; i++) {
    if (n % i === 0) factors.push(i);
  }
  return factors;
}

function getPrimeFactors(n) {
  const factors = [];
  let d = 2;
  let temp = n;
  while (d * d <= temp) {
    while (temp % d === 0) {
      factors.push(d);
      temp /= d;
    }
    d++;
  }
  if (temp > 1) factors.push(temp);
  return factors;
}

function primeFactorization(n) {
  const pf = getPrimeFactors(n);
  const counts = {};
  pf.forEach(p => { counts[p] = (counts[p] || 0) + 1; });
  return counts;
}

function gcd(a, b) {
  while (b) { [a, b] = [b, a % b]; }
  return a;
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

const container = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.04 } },
};

const item = {
  hidden: { scale: 0, opacity: 0 },
  show: { scale: 1, opacity: 1, type: 'spring', stiffness: 300, damping: 20 },
};

export default function HcfLcmPage() {
  const [a, setA] = useState(12);
  const [b, setB] = useState(18);

  const clamp = (v) => Math.min(100, Math.max(1, v));

  const factorsA = useMemo(() => getFactors(a), [a]);
  const factorsB = useMemo(() => getFactors(b), [b]);
  const commonFactors = useMemo(() => factorsA.filter(f => factorsB.includes(f)), [factorsA, factorsB]);
  const hcfVal = useMemo(() => gcd(a, b), [a, b]);
  const lcmVal = useMemo(() => lcm(a, b), [a, b]);
  const product = a * b;

  const pfA = useMemo(() => primeFactorization(a), [a]);
  const pfB = useMemo(() => primeFactorization(b), [b]);
  const commonPrimes = useMemo(() => {
    const result = {};
    const allPrimes = new Set([...Object.keys(pfA), ...Object.keys(pfB)].map(Number));
    allPrimes.forEach(p => {
      const minExp = Math.min(pfA[p] || 0, pfB[p] || 0);
      if (minExp > 0) result[p] = minExp;
    });
    return result;
  }, [pfA, pfB]);
  const lcmPrimes = useMemo(() => {
    const result = {};
    const allPrimes = new Set([...Object.keys(pfA), ...Object.keys(pfB)].map(Number));
    allPrimes.forEach(p => {
      const maxExp = Math.max(pfA[p] || 0, pfB[p] || 0);
      if (maxExp > 0) result[p] = maxExp;
    });
    return result;
  }, [pfA, pfB]);

  const maxMultiples = Math.max(6, Math.ceil(lcmVal / a) + 1, Math.ceil(lcmVal / b) + 1);
  const multiplesA = useMemo(() => {
    const m = [];
    for (let i = 1; i <= maxMultiples; i++) m.push(a * i);
    return m;
  }, [a, maxMultiples]);
  const multiplesB = useMemo(() => {
    const m = [];
    for (let i = 1; i <= maxMultiples; i++) m.push(b * i);
    return m;
  }, [b, maxMultiples]);
  const commonMultiples = multiplesA.filter(m => multiplesB.includes(m));
  const lcmNum = commonMultiples[0] || lcmVal;

  const numberLineMax = lcmVal + Math.max(a, b);

  return (
    <div className="hcf-lcm-page">
      <motion.div className="page-header" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1>HCF & LCM Visualizer</h1>
        <p>Explore the Highest Common Factor and Least Common Multiple of two numbers!</p>
      </motion.div>

      <motion.div className="hcf-input-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <div className="hcf-input-row">
          <div className="hcf-number-group">
            <span className="hcf-number-label" style={{ color: 'var(--blue)' }}>Number A</span>
            <div className="hcf-stepper">
              <motion.button className="hcf-stepper-btn minus" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setA(clamp(a - 1))}>−</motion.button>
              <input type="number" className="hcf-number-input" value={a} onChange={e => { const v = parseInt(e.target.value); if (!isNaN(v)) setA(clamp(v)); }} min={1} max={100} />
              <motion.button className="hcf-stepper-btn plus" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setA(clamp(a + 1))}>+</motion.button>
            </div>
          </div>
          <div className="hcf-vs-badge">&</div>
          <div className="hcf-number-group">
            <span className="hcf-number-label" style={{ color: 'var(--purple)' }}>Number B</span>
            <div className="hcf-stepper">
              <motion.button className="hcf-stepper-btn minus" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setB(clamp(b - 1))}>−</motion.button>
              <input type="number" className="hcf-number-input" value={b} onChange={e => { const v = parseInt(e.target.value); if (!isNaN(v)) setB(clamp(v)); }} min={1} max={100} />
              <motion.button className="hcf-stepper-btn plus" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setB(clamp(b + 1))}>+</motion.button>
            </div>
          </div>
        </div>
        <div className="hcf-quick-nums">
          <span className="hcf-quick-label">Try:</span>
          {[{ a: 12, b: 18 }, { a: 24, b: 36 }, { a: 8, b: 12 }, { a: 15, b: 25 }, { a: 16, b: 24 }, { a: 20, b: 30 }].map((pair, i) => (
            <motion.button key={i} className={`hcf-quick-btn ${a === pair.a && b === pair.b ? 'active' : ''}`} onClick={() => { setA(pair.a); setB(pair.b); }} whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }}>{pair.a} & {pair.b}</motion.button>
          ))}
        </div>
      </motion.div>

      <motion.div className="hcf-venn-section" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <h2>Factor Venn Diagram</h2>
        <div className="hcf-venn-container">
          <div className="venn-diagram">
            <motion.div className="venn-circle venn-circle-a" layout>
              <div className="venn-label" style={{ color: 'var(--blue)' }}>{a}</div>
              <div className="venn-factors">
                <AnimatePresence mode="popLayout">
                  {factorsA.filter(f => !commonFactors.includes(f)).map(f => (
                    <motion.div key={`a-${f}-${a}-${b}`} className="venn-factor-chip" style={{ background: 'var(--blue)', color: 'white' }} variants={item} initial="hidden" animate="show" exit="hidden">{f}</motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>

            <div className="venn-overlap">
              <div className="venn-overlap-label" style={{ color: 'var(--green)' }}>Common</div>
              <motion.div className="venn-factors venn-common-factors" variants={container} initial="hidden" animate="show">
                <AnimatePresence mode="popLayout">
                  {commonFactors.map(f => (
                    <motion.div key={`c-${f}-${a}-${b}`} className="venn-factor-chip common" style={{ background: 'var(--green)', color: 'white' }} variants={item} initial="hidden" animate="show" exit="hidden">{f}</motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>

            <motion.div className="venn-circle venn-circle-b" layout>
              <div className="venn-label" style={{ color: 'var(--purple)' }}>{b}</div>
              <div className="venn-factors">
                <AnimatePresence mode="popLayout">
                  {factorsB.filter(f => !commonFactors.includes(f)).map(f => (
                    <motion.div key={`b-${f}-${a}-${b}`} className="venn-factor-chip" style={{ background: 'var(--purple)', color: 'white' }} variants={item} initial="hidden" animate="show" exit="hidden">{f}</motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>

        <div className="hcf-factor-summary">
          <motion.div className="hcf-summary-card" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3 }}>
            <div className="hcf-summary-label" style={{ color: 'var(--blue)' }}>Factors of {a}</div>
            <div className="hcf-summary-factors">{factorsA.join(', ')}</div>
            <div className="hcf-summary-count">{factorsA.length} factors</div>
          </motion.div>
          <motion.div className="hcf-summary-card" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.4 }}>
            <div className="hcf-summary-label" style={{ color: 'var(--green)' }}>Common Factors</div>
            <div className="hcf-summary-factors">{commonFactors.join(', ')}</div>
            <div className="hcf-summary-count">{commonFactors.length} factors</div>
          </motion.div>
          <motion.div className="hcf-summary-card" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.5 }}>
            <div className="hcf-summary-label" style={{ color: 'var(--purple)' }}>Factors of {b}</div>
            <div className="hcf-summary-factors">{factorsB.join(', ')}</div>
            <div className="hcf-summary-count">{factorsB.length} factors</div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div className="hcf-result-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <motion.div className="hcf-result-card hcf-main-result" key={hcfVal} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
          <div className="hcf-result-icon">GCD</div>
          <div className="hcf-result-value" style={{ color: 'var(--green)' }}>{hcfVal}</div>
          <div className="hcf-result-text">Highest Common Factor of {a} and {b}</div>
        </motion.div>
      </motion.div>

      <motion.div className="hcf-venn-factors-block" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h2>Factor Blocks</h2>
        <div className="hcf-blocks-container">
          <div className="hcf-block-group">
            <div className="hcf-block-header" style={{ background: 'var(--blue)' }}>Factors of {a}</div>
            <div className="hcf-factor-blocks">
              {factorsA.map((f, i) => {
                const isCommon = commonFactors.includes(f);
                return (
                  <motion.div key={`block-a-${f}-${a}-${b}`} className="hcf-factor-block" style={{ background: isCommon ? 'var(--green)' : 'var(--blue)', color: 'white' }} initial={{ scale: 0, rotate: -10 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: i * 0.05, type: 'spring', stiffness: 300 }}>
                    {f}
                  </motion.div>
                );
              })}
            </div>
          </div>
          <div className="hcf-block-group">
            <div className="hcf-block-header" style={{ background: 'var(--purple)' }}>Factors of {b}</div>
            <div className="hcf-factor-blocks">
              {factorsB.map((f, i) => {
                const isCommon = commonFactors.includes(f);
                return (
                  <motion.div key={`block-b-${f}-${a}-${b}`} className="hcf-factor-block" style={{ background: isCommon ? 'var(--green)' : 'var(--purple)', color: 'white' }} initial={{ scale: 0, rotate: 10 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: i * 0.05, type: 'spring', stiffness: 300 }}>
                    {f}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div className="hcf-lcm-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
        <h2>Least Common Multiple</h2>
        <motion.div className="hcf-result-card lcm-main-result" key={lcmVal} initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', stiffness: 300, damping: 15 }}>
          <div className="hcf-result-icon">LCM</div>
          <div className="hcf-result-value" style={{ color: 'var(--purple)' }}>{lcmVal}</div>
          <div className="hcf-result-text">Least Common Multiple of {a} and {b}</div>
        </motion.div>

        <div className="hcf-number-line-container">
          <h3>Number Line — Multiples</h3>
          <div className="hcf-number-line-legend">
            <span className="hcf-legend-item"><span className="hcf-legend-dot" style={{ background: 'var(--blue)' }}></span>Multiples of {a}</span>
            <span className="hcf-legend-item"><span className="hcf-legend-dot" style={{ background: 'var(--purple)' }}></span>Multiples of {b}</span>
            <span className="hcf-legend-item"><span className="hcf-legend-dot" style={{ background: 'var(--green)' }}></span>Common multiples</span>
          </div>
          <div className="hcf-number-line-scroll">
            <div className="hcf-number-line">
              {Array.from({ length: numberLineMax + 1 }, (_, i) => i).map(n => {
                const isMultA = multiplesA.includes(n);
                const isMultB = multiplesB.includes(n);
                const isCommon = isMultA && isMultB;
                return (
                  <motion.div key={n} className={`hcf-nl-tick ${n === 0 ? 'zero' : ''} ${isCommon ? 'common' : ''} ${isMultA && !isCommon ? 'mult-a' : ''} ${isMultB && !isCommon ? 'mult-b' : ''}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: n * 0.01 }}>
                    {n % Math.ceil(numberLineMax / 20) === 0 || isCommon && (
                      <span className="hcf-nl-label">{n}</span>
                    )}
                    <div className="hcf-nl-dot-container">
                      {isCommon && (
                        <motion.div className="hcf-nl-dot common" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, delay: n * 0.01 }}>
                          <span className="hcf-nl-val">{n}</span>
                        </motion.div>
                      )}
                      {isMultA && !isCommon && (
                        <motion.div className="hcf-nl-dot a" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, delay: n * 0.01 }} />
                      )}
                      {isMultB && !isCommon && (
                        <motion.div className="hcf-nl-dot b" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 400, delay: n * 0.01 }} />
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
          <div className="hcf-multiples-lists">
            <motion.div className="hcf-multiples-list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
              <div className="hcf-multiples-title" style={{ color: 'var(--blue)' }}>Multiples of {a}</div>
              <div className="hcf-multiples-chips">
                {multiplesA.slice(0, 8).map((m, i) => (
                  <motion.span key={i} className="hcf-mult-chip" style={{ background: commonMultiples.includes(m) ? 'var(--green)' : 'var(--blue)', color: 'white' }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 + i * 0.05 }}>{m}</motion.span>
                ))}
                <span className="hcf-mult-more">...</span>
              </div>
            </motion.div>
            <motion.div className="hcf-multiples-list" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <div className="hcf-multiples-title" style={{ color: 'var(--purple)' }}>Multiples of {b}</div>
              <div className="hcf-multiples-chips">
                {multiplesB.slice(0, 8).map((m, i) => (
                  <motion.span key={i} className="hcf-mult-chip" style={{ background: commonMultiples.includes(m) ? 'var(--green)' : 'var(--purple)', color: 'white' }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 + i * 0.05 }}>{m}</motion.span>
                ))}
                <span className="hcf-mult-more">...</span>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      <motion.div className="hcf-factorization-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
        <h2>Prime Factorization</h2>
        <div className="hcf-factorization-cards">
          <motion.div className="hcf-factorization-card" initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <div className="hcf-pf-header" style={{ background: 'var(--blue)', color: 'white' }}>{a}</div>
            <div className="hcf-pf-body">
              <div className="hcf-pf-equation">
                {Object.keys(pfA).sort((a, b) => a - b).map(p => (
                  <motion.span key={p} className="hcf-pf-term" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                    {pfA[p] > 1 ? <>{p}<sup>{pfA[p]}</sup></> : <>{p}</>}
                  </motion.span>
                )).reduce((acc, el, i, arr) => {
                  if (i === 0) return [el];
                  return [...acc, <span key={`mul-${i}`} className="hcf-pf-multiply">×</span>, el];
                }, [])}
              </div>
              <div className="hcf-pf-primes">
                {getPrimeFactors(a).map((p, i) => (
                  <motion.span key={i} className="hcf-pf-prime-chip" style={{ background: commonPrimes[p] ? 'var(--green)' : 'var(--blue)', color: 'white' }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 + i * 0.05 }}>{p}</motion.span>
                ))}
              </div>
            </div>
          </motion.div>

          <div className="hcf-pf-common-indicator">
            <div className="hcf-pf-common-label" style={{ color: 'var(--green)' }}>Common primes</div>
            <div className="hcf-pf-common-primes">
              {Object.keys(commonPrimes).length > 0 ? Object.entries(commonPrimes).map(([p, exp]) => (
                <motion.span key={p} className="hcf-pf-common-chip" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring' }}>
                  {exp > 1 ? <>{p}<sup>{exp}</sup></> : <>{p}</>}
                </motion.span>
              )) : <span className="hcf-pf-none">None</span>}
            </div>
          </div>

          <motion.div className="hcf-factorization-card" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            <div className="hcf-pf-header" style={{ background: 'var(--purple)', color: 'white' }}>{b}</div>
            <div className="hcf-pf-body">
              <div className="hcf-pf-equation">
                {Object.keys(pfB).sort((a, b) => a - b).map(p => (
                  <motion.span key={p} className="hcf-pf-term" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
                    {pfB[p] > 1 ? <>{p}<sup>{pfB[p]}</sup></> : <>{p}</>}
                  </motion.span>
                )).reduce((acc, el, i) => {
                  if (i === 0) return [el];
                  return [...acc, <span key={`mul-${i}`} className="hcf-pf-multiply">×</span>, el];
                }, [])}
              </div>
              <div className="hcf-pf-primes">
                {getPrimeFactors(b).map((p, i) => (
                  <motion.span key={i} className="hcf-pf-prime-chip" style={{ background: commonPrimes[p] ? 'var(--green)' : 'var(--purple)', color: 'white' }} initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.6 + i * 0.05 }}>{p}</motion.span>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div className="hcf-lcm-prime-breakdown" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
          <div className="hcf-breakdown-row">
            <span className="hcf-breakdown-label" style={{ color: 'var(--green)' }}>HCF = {Object.keys(commonPrimes).sort((a, b) => a - b).map(p => commonPrimes[p] > 1 ? `${p}^${commonPrimes[p]}` : p).join(' × ')}</span>
            <span className="hcf-breakdown-eq">= {hcfVal}</span>
          </div>
          <div className="hcf-breakdown-row">
            <span className="hcf-breakdown-label" style={{ color: 'var(--purple)' }}>LCM = {Object.keys(lcmPrimes).sort((a, b) => a - b).map(p => lcmPrimes[p] > 1 ? `${p}^${lcmPrimes[p]}` : p).join(' × ')}</span>
            <span className="hcf-breakdown-eq">= {lcmVal}</span>
          </div>
        </motion.div>
      </motion.div>

      <motion.div className="hcf-verification-section" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
        <h2>Verification</h2>
        <motion.div className="hcf-verification-card" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.7, type: 'spring' }}>
          <div className="hcf-verification-title">HCF × LCM = Product of Numbers</div>
          <div className="hcf-verification-equation">
            <motion.span className="hcf-ver-term hcf-ver-hcf" key={`hcf-${hcfVal}`} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} style={{ color: 'var(--green)' }}>{hcfVal}</motion.span>
            <span className="hcf-ver-op">×</span>
            <motion.span className="hcf-ver-term hcf-ver-lcm" key={`lcm-${lcmVal}`} initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.1 }} style={{ color: 'var(--purple)' }}>{lcmVal}</motion.span>
            <span className="hcf-ver-op">=</span>
            <motion.span className="hcf-ver-term hcf-ver-product" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 300 }}>{hcfVal * lcmVal}</motion.span>
          </div>
          <div className="hcf-verification-check">
            <span className="hcf-ver-sub">=</span>
            <span className="hcf-ver-num" style={{ color: 'var(--blue)' }}>{a}</span>
            <span className="hcf-ver-op">×</span>
            <span className="hcf-ver-num" style={{ color: 'var(--purple)' }}>{b}</span>
            <span className="hcf-ver-op">=</span>
            <span className="hcf-ver-num">{product}</span>
            <motion.span className="hcf-ver-check" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.4, type: 'spring', stiffness: 400 }}>✓</motion.span>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
