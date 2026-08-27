import { motion } from 'framer-motion';

const PROPERTIES = [
  {
    name: 'Commutative Property',
    icon: '🔄',
    operations: ['Addition', 'Multiplication'],
    examples: [
      { expr: 'a + b = b + a', nums: '3 + 5 = 5 + 3' },
      { expr: 'a × b = b × a', nums: '4 × 7 = 7 × 4' },
    ],
    note: 'Does NOT work for subtraction or division.',
  },
  {
    name: 'Associative Property',
    icon: '🤝',
    operations: ['Addition', 'Multiplication'],
    examples: [
      { expr: '(a + b) + c = a + (b + c)', nums: '(2 + 3) + 4 = 2 + (3 + 4)' },
      { expr: '(a × b) × c = a × (b × c)', nums: '(2 × 3) × 4 = 2 × (3 × 4)' },
    ],
    note: 'Grouping doesn\'t matter for + and ×.',
  },
  {
    name: 'Distributive Property',
    icon: '📐',
    operations: ['Multiplication over Addition/Subtraction'],
    examples: [
      { expr: 'a × (b + c) = a×b + a×c', nums: '3 × (4 + 5) = 12 + 15 = 27' },
      { expr: 'a × (b − c) = a×b − a×c', nums: '6 × (10 − 3) = 60 − 18 = 42' },
    ],
    note: 'Very useful for simplifying expressions!',
  },
  {
    name: 'Identity Property',
    icon: '1️⃣',
    operations: ['Addition', 'Multiplication'],
    examples: [
      { expr: 'a + 0 = a', nums: '7 + 0 = 7' },
      { expr: 'a × 1 = a', nums: '7 × 1 = 7' },
    ],
    note: 'Zero is the additive identity, One is the multiplicative identity.',
  },
  {
    name: 'Inverse Property',
    icon: '↩️',
    operations: ['Addition', 'Multiplication'],
    examples: [
      { expr: 'a + (−a) = 0', nums: '5 + (−5) = 0' },
      { expr: 'a × (1/a) = 1', nums: '4 × (1/4) = 1' },
    ],
    note: 'Every number has an additive inverse and (except 0) a multiplicative inverse.',
  },
];

export default function PropertiesPage() {
  return (
    <div className="placeholder-page">
      <motion.div className="page-header" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1>📏 Properties of Numbers</h1>
        <p>Commutative, associative, distributive, and more.</p>
      </motion.div>

      <div className="placeholder-section">
        <h2>Number Properties</h2>
        {PROPERTIES.map((prop, i) => (
          <motion.div
            key={prop.name}
            className="property-card"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <div className="property-header">
              <span className="property-icon">{prop.icon}</span>
              <h3>{prop.name}</h3>
            </div>
            <div className="property-operations">
              <span className="op-tag">{prop.operations.join(' & ')}</span>
            </div>
            {prop.examples.map((ex, j) => (
              <div key={j} className="example-box">
                <p className="formula">{ex.expr}</p>
                <p className="nums">{ex.nums}</p>
              </div>
            ))}
            <p className="property-note">{prop.note}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
