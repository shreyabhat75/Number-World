import { motion } from 'framer-motion';
import { isDivisibleBy } from '../../utils/divisibilityUtils';

export default function DivisibilityMatrix({ numbers }) {
  const divisors = [2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="divisibility-matrix">
      <h3>📊 Divisibility Matrix</h3>
      <div className="matrix-scroll">
        <table className="matrix-table">
          <thead>
            <tr>
              <th>Number</th>
              {divisors.map(d => <th key={d}>{d}</th>)}
            </tr>
          </thead>
          <tbody>
            {numbers.map((n, ri) => (
              <motion.tr
                key={n}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: ri * 0.05 }}
              >
                <td className="matrix-number">{n}</td>
                {divisors.map(d => {
                  const ok = isDivisibleBy(n, d);
                  return (
                    <td key={d} className={`matrix-cell ${ok ? 'yes' : 'no'}`}>
                      {ok ? '✓' : '✗'}
                    </td>
                  );
                })}
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
