import { isPrime } from './numberUtils';

export function getPrimeFactors(n) {
  if (!Number.isInteger(n) || n <= 1) return [];
  const factors = [];
  let remaining = n;
  for (let i = 2; i <= remaining; i++) {
    while (remaining % i === 0) {
      factors.push(i);
      remaining /= i;
    }
  }
  return factors;
}

export function buildFactorTree(n) {
  if (!Number.isInteger(n) || n <= 1) return null;
  
  const tree = { value: n, isPrime: isPrime(n), children: [] };
  
  if (isPrime(n)) return tree;
  
  for (let i = 2; i <= Math.sqrt(n); i++) {
    if (n % i === 0) {
      tree.children = [
        buildFactorTree(i),
        buildFactorTree(n / i)
      ];
      break;
    }
  }
  
  return tree;
}

export function getExponentForm(factors) {
  if (!factors || factors.length === 0) return '';
  if (factors.length === 1) return String(factors[0]);
  
  const counts = {};
  factors.forEach(f => { counts[f] = (counts[f] || 0) + 1; });
  
  return Object.entries(counts)
    .map(([base, exp]) => exp > 1 ? `${base}^${exp}` : base)
    .join(' × ');
}

export function getFormattedExponentForm(factors) {
  if (!factors || factors.length === 0) return '';
  if (factors.length === 1) return String(factors[0]);
  
  const counts = {};
  factors.forEach(f => { counts[f] = (counts[f] || 0) + 1; });
  
  return Object.entries(counts)
    .map(([base, exp]) => {
      if (exp > 1) {
        const superscripts = { '0': '⁰', '1': '¹', '2': '²', '3': '³', '4': '⁴', '5': '⁵', '6': '⁶', '7': '⁷', '8': '⁸', '9': '⁹' };
        const sup = String(exp).split('').map(d => superscripts[d]).join('');
        return `${base}${sup}`;
      }
      return base;
    })
    .join(' × ');
}

export function canSplit(value, factor1, factor2) {
  return Number.isInteger(factor1) && Number.isInteger(factor2) && factor1 * factor2 === value && factor1 >= 2 && factor2 >= 2;
}

export function getValidFactorPairs(n) {
  if (!Number.isInteger(n) || n <= 3) return [];
  const pairs = [];
  for (let i = 2; i <= Math.floor(Math.sqrt(n)); i++) {
    if (n % i === 0) {
      pairs.push([i, n / i]);
    }
  }
  return pairs;
}
