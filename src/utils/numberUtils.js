export function isNaturalNumber(n) {
  return Number.isInteger(n) && n >= 1;
}

export function isWholeNumber(n) {
  return Number.isInteger(n) && n >= 0;
}

export function isInteger(n) {
  return Number.isInteger(n);
}

export function isPositive(n) {
  return typeof n === 'number' && n > 0;
}

export function isNegative(n) {
  return typeof n === 'number' && n < 0;
}

export function isEven(n) {
  return Number.isInteger(n) && n % 2 === 0;
}

export function isOdd(n) {
  return Number.isInteger(n) && Math.abs(n) % 2 === 1;
}

export function isPrime(n) {
  if (!Number.isInteger(n) || n <= 1) return false;
  if (n === 2) return true;
  if (n % 2 === 0) return false;
  for (let i = 3; i <= Math.sqrt(n); i += 2) {
    if (n % i === 0) return false;
  }
  return true;
}

export function isComposite(n) {
  return Number.isInteger(n) && n > 1 && !isPrime(n);
}

export function getNumberTypes(n) {
  const types = [];
  if (isNaturalNumber(n)) types.push({ key: 'natural', label: 'Natural', icon: '🌱', color: '#4ade80' });
  if (isWholeNumber(n)) types.push({ key: 'whole', label: 'Whole', icon: '0️⃣', color: '#60a5fa' });
  if (isInteger(n)) types.push({ key: 'integer', label: 'Integer', icon: '🔢', color: '#a78bfa' });
  if (isPositive(n)) types.push({ key: 'positive', label: 'Positive', icon: '➕', color: '#34d399' });
  if (isNegative(n)) types.push({ key: 'negative', label: 'Negative', icon: '➖', color: '#f87171' });
  if (isEven(n)) types.push({ key: 'even', label: 'Even', icon: '🟦', color: '#60a5fa' });
  if (isOdd(n)) types.push({ key: 'odd', label: 'Odd', icon: '🟧', color: '#fb923c' });
  if (isPrime(n)) types.push({ key: 'prime', label: 'Prime', icon: '⭐', color: '#fbbf24' });
  if (isComposite(n)) types.push({ key: 'composite', label: 'Composite', icon: '🧩', color: '#c084fc' });
  return types;
}

export function getNotTypes(n) {
  const allKeys = ['natural', 'whole', 'integer', 'positive', 'negative', 'even', 'odd', 'prime', 'composite'];
  const present = getNumberTypes(n).map(t => t.key);
  return allKeys.filter(k => !present.includes(k));
}

export function getDidYouKnow(n) {
  if (n === 0) return "0 is the only number that is both even and neither positive nor negative!";
  if (n === 1) return "1 is special — it's a natural number, but NOT prime and NOT composite!";
  if (n === 2) return "2 is the smallest and only even prime number!";
  if (isPrime(n)) return `${n} can only be divided evenly by 1 and itself — that makes it prime!`;
  if (isComposite(n)) {
    const factors = getFactors(n);
    const example = factors.find(f => f !== 1 && f !== n);
    return `${n} can be split into ${example} × ${n / example}, so it is composite!`;
  }
  if (n < 0) return `${n} is negative. Negative numbers are below zero on the number line.`;
  return `${n} is a wonderful number with its own special properties!`;
}

export function getFactors(n) {
  if (!Number.isInteger(n) || n === 0) return [];
  const abs = Math.abs(n);
  const factors = [];
  for (let i = 1; i <= abs; i++) {
    if (abs % i === 0) factors.push(i);
  }
  return factors;
}

export function getFactorPairs(n) {
  if (!Number.isInteger(n) || n <= 1) return [];
  const pairs = [];
  const abs = Math.abs(n);
  for (let i = 2; i <= Math.sqrt(abs); i++) {
    if (abs % i === 0) {
      pairs.push([i, abs / i]);
    }
  }
  return pairs;
}
