import { isPrime } from './numberUtils';
import { getValidFactorPairs } from './primeUtils';

export function getHint(number, hintsUsed) {
  if (isPrime(number)) {
    return { text: `${number} is already a prime number! No splitting needed.`, level: 0 };
  }

  const pairs = getValidFactorPairs(number);
  if (pairs.length === 0) {
    return { text: `${number} cannot be split further.`, level: 0 };
  }

  const [a, b] = pairs[0];

  if (hintsUsed === 0) {
    return { text: `Try dividing ${number} by a small number like 2 or 3.`, level: 1 };
  }
  if (hintsUsed === 1) {
    return { text: `${number} ÷ ${a} = ${b}. So ${a} × ${b} = ${number}!`, level: 2 };
  }
  return { text: `One valid factor pair is ${a} × ${b}.`, level: 3 };
}

export function getChallengeNumber(difficulty) {
  const ranges = {
    easy: [4, 30],
    medium: [30, 100],
    hard: [100, 500],
  };
  const [min, max] = ranges[difficulty] || ranges.easy;

  let n;
  do {
    n = Math.floor(Math.random() * (max - min + 1)) + min;
  } while (isPrime(n));

  return n;
}
