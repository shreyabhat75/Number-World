import { isPrime, isEven, isOdd, isNaturalNumber, isWholeNumber, isComposite, isPositive, isNegative } from './numberUtils';

function getAllTypes(n) {
  const types = [];
  if (isNaturalNumber(n)) types.push('Natural');
  if (isWholeNumber(n)) types.push('Whole');
  if (isInteger(n)) types.push('Integer');
  if (isPositive(n)) types.push('Positive');
  if (isNegative(n)) types.push('Negative');
  if (isEven(n)) types.push('Even');
  if (isOdd(n)) types.push('Odd');
  if (isPrime(n)) types.push('Prime');
  if (isComposite(n)) types.push('Composite');
  return types;
}

function isInteger(n) {
  return Number.isInteger(n);
}

const ALL_TYPE_OPTIONS = ['Natural', 'Whole', 'Integer', 'Positive', 'Negative', 'Even', 'Odd', 'Prime', 'Composite'];

const QUESTIONS = [
  { type: 'identify', question: 'What types of number is {n}? (Select all that apply)', multi: true,
    getAllCorrect: (n) => getAllTypes(n),
  },
  { type: 'find_prime', question: 'Which number is prime?', multi: false, getCorrect: () => {
    const primes = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31];
    return primes[Math.floor(Math.random() * primes.length)];
  }, getOptions: (correct) => {
    const opts = [correct];
    while (opts.length < 4) {
      const candidate = correct + Math.floor(Math.random() * 10) - 3;
      if (candidate > 1 && !opts.includes(candidate) && !isPrime(candidate)) {
        opts.push(candidate);
      }
    }
    return opts.sort(() => Math.random() - 0.5);
  }},
  { type: 'find_even', question: 'Which number is even?', multi: false, getCorrect: () => {
    return [2, 4, 6, 8, 10, 12, 14, 16, 18, 20][Math.floor(Math.random() * 10)];
  }, getOptions: (correct) => {
    const opts = [correct];
    while (opts.length < 4) {
      const candidate = Math.floor(Math.random() * 20) + 1;
      if (!opts.includes(candidate) && isOdd(candidate)) {
        opts.push(candidate);
      }
    }
    return opts.sort(() => Math.random() - 0.5);
  }},
  { type: 'find_odd', question: 'Which number is odd?', multi: false, getCorrect: () => {
    return [1, 3, 5, 7, 9, 11, 13, 15, 17, 19][Math.floor(Math.random() * 10)];
  }, getOptions: (correct) => {
    const opts = [correct];
    while (opts.length < 4) {
      const candidate = Math.floor(Math.random() * 20) + 1;
      if (!opts.includes(candidate) && isEven(candidate)) {
        opts.push(candidate);
      }
    }
    return opts.sort(() => Math.random() - 0.5);
  }},
  { type: 'find_negative', question: 'Which number is negative?', multi: false, getCorrect: () => {
    return -(Math.floor(Math.random() * 20) + 1);
  }, getOptions: (correct) => {
    const opts = [correct];
    while (opts.length < 4) {
      const candidate = Math.floor(Math.random() * 20);
      if (!opts.includes(candidate) && candidate >= 0) {
        opts.push(candidate);
      }
    }
    return opts.sort(() => Math.random() - 0.5);
  }},
  { type: 'find_composite', question: 'Which number is composite?', multi: false, getCorrect: () => {
    const composites = [4, 6, 8, 9, 10, 12, 14, 15, 16, 18, 20, 21, 22, 24, 25, 26, 27, 28];
    return composites[Math.floor(Math.random() * composites.length)];
  }, getOptions: (correct) => {
    const opts = [correct];
    while (opts.length < 4) {
      const candidate = Math.floor(Math.random() * 30) + 1;
      if (!opts.includes(candidate) && isPrime(candidate)) {
        opts.push(candidate);
      }
    }
    return opts.sort(() => Math.random() - 0.5);
  }},
];

function getDifficultyNumbers(difficulty) {
  switch (difficulty) {
    case 1: return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    case 2: return [5, 8, 11, 13, 15, 17, 19, 20, 22, 25];
    case 3: return [17, 23, 29, 31, 37, 41, 43, 47, 50, 55];
    default: return [10, 25, 50, 100, 120, 200, 500, 1000];
  }
}

export function generateQuestion(difficulty = 1) {
  const template = QUESTIONS[Math.floor(Math.random() * QUESTIONS.length)];
  const numbers = getDifficultyNumbers(difficulty);
  const n = numbers[Math.floor(Math.random() * numbers.length)];
  
  if (template.type === 'identify') {
    const allCorrect = template.getAllCorrect(n);
    const wrongOptions = ALL_TYPE_OPTIONS.filter(o => !allCorrect.includes(o));
    const shuffledWrong = wrongOptions.sort(() => Math.random() - 0.5);
    const numWrong = Math.min(3, shuffledWrong.length);
    const options = [...allCorrect, ...shuffledWrong.slice(0, numWrong)].sort(() => Math.random() - 0.5);
    return {
      ...template,
      question: template.question.replace('{n}', n),
      options,
      correctAnswers: allCorrect,
      n,
    };
  }
  
  const correctAnswer = template.getCorrect();
  const options = template.getOptions(correctAnswer);
  return { ...template, options: options.map(String), correctAnswer: String(correctAnswer) };
}

export function generateDailyChallenge() {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const rng = (s) => {
    let x = Math.sin(s) * 10000;
    return x - Math.floor(x);
  };
  
  const questionTypes = ['identify', 'find_prime', 'find_even'];
  const qType = questionTypes[Math.floor(rng(seed) * questionTypes.length)];
  
  const numbers = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 4, 6, 8, 9, 10, 12, 14, 15, 16];
  const n = numbers[Math.floor(rng(seed + 1) * numbers.length)];
  
  if (qType === 'identify') {
    const allCorrect = getAllTypes(n);
    const wrongOptions = ALL_TYPE_OPTIONS.filter(o => !allCorrect.includes(o));
    const shuffledWrong = wrongOptions.sort((a, b) => rng(seed + a.charCodeAt(0)) - 0.5);
    const options = [...allCorrect, ...shuffledWrong.slice(0, 3)].sort(() => rng(seed + n) - 0.5);
    return {
      question: `What types of number is ${n}? (Select all that apply)`,
      multi: true,
      options,
      correctAnswers: allCorrect,
      n,
    };
  }
  
  if (qType === 'find_prime') {
    const prime = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29][Math.floor(rng(seed + 2) * 10)];
    const opts = [prime];
    while (opts.length < 4) {
      const c = prime + Math.floor(rng(seed + opts.length) * 10) - 3;
      if (c > 1 && !opts.includes(c) && !isPrime(c)) opts.push(c);
    }
    return { question: 'Which number is prime?', multi: false, options: opts.sort(() => rng(seed + 3) - 0.5).map(String), correctAnswer: String(prime) };
  }
  
  const even = [2, 4, 6, 8, 10, 12, 14, 16][Math.floor(rng(seed + 4) * 8)];
  const opts = [even];
  while (opts.length < 4) {
    const c = Math.floor(rng(seed + opts.length + 10) * 20) + 1;
    if (!opts.includes(c) && isOdd(c)) opts.push(c);
  }
  return { question: 'Which number is even?', multi: false, options: opts.sort(() => rng(seed + 5) - 0.5).map(String), correctAnswer: String(even) };
}
