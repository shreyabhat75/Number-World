import { motion } from 'framer-motion';

const HCF_METHODS = [
  {
    title: 'Listing Factors',
    description: 'List all factors of each number, then find the largest common one.',
    example: { numbers: [12, 18], factors: { 12: [1, 2, 3, 4, 6, 12], 18: [1, 2, 3, 6, 9, 18] }, common: [1, 2, 3, 6], hcf: 6 },
  },
  {
    title: 'Prime Factorization',
    description: 'Break each number into primes, then multiply common primes.',
    example: { numbers: [12, 18], primeFactors: { 12: [2, 2, 3], 18: [2, 3, 3] }, common: [2, 3], hcf: 6 },
  },
];

const LCM_METHODS = [
  {
    title: 'Listing Multiples',
    description: 'List multiples of each number until you find a match.',
    example: { numbers: [4, 6], multiples: { 4: [4, 8, 12, 16, 20, 24], 6: [6, 12, 18, 24] }, lcm: 12 },
  },
  {
    title: 'Prime Factorization',
    description: 'Break each number into primes, then take the highest power of each.',
    example: { numbers: [4, 6], primeFactors: { 4: [2, 2], 6: [2, 3] }, lcm: 12 },
  },
];

export default function HcfLcmPage() {
  return (
    <div className="placeholder-page">
      <motion.div className="page-header" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1>🤝 HCF & LCM</h1>
        <p>Find the Highest Common Factor and Least Common Multiple.</p>
      </motion.div>

      <div className="placeholder-section">
        <h2>HCF — Highest Common Factor</h2>
        <p>The HCF is the largest number that divides two or more numbers exactly.</p>

        {HCF_METHODS.map((method, i) => (
          <motion.div key={i} className="method-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <h3>{method.title}</h3>
            <p>{method.description}</p>
            <div className="example-box">
              <p>HCF({method.example.numbers.join(', ')}) = {method.example.hcf}</p>
              <p className="example-detail">
                Common factors: {method.example.common.join(', ')}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="placeholder-section">
        <h2>LCM — Least Common Multiple</h2>
        <p>The LCM is the smallest number that is a multiple of two or more numbers.</p>

        {LCM_METHODS.map((method, i) => (
          <motion.div key={i} className="method-card" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}>
            <h3>{method.title}</h3>
            <p>{method.description}</p>
            <div className="example-box">
              <p>LCM({method.example.numbers.join(', ')}) = {method.example.lcm}</p>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="placeholder-section">
        <h2>📐 The Relationship</h2>
        <div className="formula-box">
          <p><strong>HCF × LCM = Product of the two numbers</strong></p>
          <p>For example: HCF(12, 18) × LCM(12, 18) = 6 × 36 = 216 = 12 × 18</p>
        </div>
      </div>
    </div>
  );
}
