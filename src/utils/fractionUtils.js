export function gcd(a, b) {
  a = Math.abs(a);
  b = Math.abs(b);
  while (b) {
    [a, b] = [b, a % b];
  }
  return a || 1;
}

export function simplifyFraction(num, den) {
  if (den === 0) return { num, den };
  const sign = den < 0 ? -1 : 1;
  num *= sign;
  den *= sign;
  const g = gcd(num, den);
  return { num: num / g, den: den / g };
}

export function fractionToDecimal(num, den) {
  if (den === 0) return 0;
  return num / den;
}

export function fractionToPercent(num, den) {
  return fractionToDecimal(num, den) * 100;
}

export function decimalToFraction(decimal, maxDen = 1000) {
  const sign = decimal < 0 ? -1 : 1;
  decimal = Math.abs(decimal);
  const whole = Math.floor(decimal);
  const frac = decimal - whole;
  if (frac === 0) return { num: sign * whole, den: 1 };

  let bestNum = 0, bestDen = 1, bestErr = Infinity;
  for (let den = 1; den <= maxDen; den++) {
    const num = Math.round(frac * den);
    const err = Math.abs(frac - num / den);
    if (err < bestErr) {
      bestErr = err;
      bestNum = num;
      bestDen = den;
      if (err < 1e-9) break;
    }
  }
  const simplified = simplifyFraction(bestNum, bestDen);
  return { num: sign * (whole * simplified.den + simplified.num), den: simplified.den };
}

export function compareFractions(a, b) {
  const left = a.num * b.den;
  const right = b.num * a.den;
  if (left === right) return 0;
  return left > right ? 1 : -1;
}

export function getEquivalentFractions(num, den, count = 3) {
  const simplified = simplifyFraction(num, den);
  const equivalents = [];
  for (let i = 2; equivalents.length < count; i++) {
    equivalents.push({ num: simplified.num * i, den: simplified.den * i });
  }
  return equivalents;
}

export function getFractionType(num, den) {
  if (den === 0) return 'Invalid';
  const abs = Math.abs(num);
  const absDen = Math.abs(den);
  if (abs === 0) return 'Zero';
  if (abs < absDen) return 'Proper Fraction';
  if (abs === absDen) return 'Equal to 1';
  return 'Improper Fraction';
}

export function toMixedNumber(num, den) {
  if (den === 0) return { whole: 0, num: 0, den: 1 };
  const sign = num < 0 ? -1 : 1;
  const absNum = Math.abs(num);
  const whole = Math.floor(absNum / den);
  const remainder = absNum % den;
  return { whole: sign * whole, num: remainder, den };
}

export function formatDecimal(value, places = 4) {
  const rounded = Math.round(value * 10 ** places) / 10 ** places;
  return rounded.toString();
}
