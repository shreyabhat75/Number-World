export function isDivisibleBy(n, d) {
  if (d === 0) return false;
  return n % d === 0;
}

export function isDivisibleBy2(n) { return isDivisibleBy(n, 2); }
export function isDivisibleBy3(n) { return isDivisibleBy(n, 3); }
export function isDivisibleBy4(n) { return isDivisibleBy(n, 4); }
export function isDivisibleBy5(n) { return isDivisibleBy(n, 5); }
export function isDivisibleBy6(n) { return isDivisibleBy(n, 6); }
export function isDivisibleBy7(n) { return isDivisibleBy(n, 7); }
export function isDivisibleBy8(n) { return isDivisibleBy(n, 8); }
export function isDivisibleBy9(n) { return isDivisibleBy(n, 9); }
export function isDivisibleBy10(n) { return isDivisibleBy(n, 10); }

export function getDivisibilityResults(n) {
  const divisors = [2, 3, 4, 5, 6, 7, 8, 9, 10];
  const results = {};
  divisors.forEach(d => {
    results[d] = { divisible: isDivisibleBy(n, d), quotient: Math.floor(n / d), remainder: ((n % d) + d) % d };
  });
  return results;
}

export function getLastDigit(n) {
  return Math.abs(n) % 10;
}

export function getLastTwoDigits(n) {
  return Math.abs(n) % 100;
}

export function getLastThreeDigits(n) {
  return Math.abs(n) % 1000;
}

export function getDigitSum(n) {
  return Math.abs(n).toString().split('').reduce((sum, d) => sum + parseInt(d), 0);
}

export function getDigits(n) {
  return Math.abs(n).toString().split('').map(Number);
}

export function ruleOf7Steps(n) {
  const abs = Math.abs(n);
  const lastDigit = abs % 10;
  const remaining = Math.floor(abs / 10);
  const doubled = lastDigit * 2;
  const result = remaining - doubled;
  return { lastDigit, remaining, doubled, result, divisible: result % 7 === 0 || abs % 7 === 0 };
}
