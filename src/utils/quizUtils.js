import { isPrime, isEven, isOdd, isNaturalNumber, isWholeNumber, isComposite, isPositive, isNegative } from './numberUtils';

const QUESTIONS = [
  { type: 'identify', question: 'What type of number is {n}?', options: ['Natural', 'Whole', 'Even', 'Odd', 'Prime', 'Composite'], getCorrect: (n) => {
    const types = [];
    if (isNaturalNumber(n)) types.push('Natural');
    if (isWholeNumber(n)) types.push('Whole');
    if (isEven(n)) types.push('Even');
    if (isOdd(n)) types.push('Odd');
    if (isPrime(n)) types.push('Prime');
    if (isComposite(n)) types.push('Composite');
    return types.length > 0 ? types[0] : 'Whole';
  }},
  { type: 'find_prime', question: 'Which number is prime?', getCorrect: () => {
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
  { type: 'find_even', question: 'Which number is even?', getCorrect: () => {
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
  { type: 'find_odd', question: 'Which number is odd?', getCorrect: () => {
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
  { type: 'find_negative', question: 'Which number is negative?', getCorrect: () => {
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
  { type: 'find_composite', question: 'Which number is composite?', getCorrect: () => {
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
  
  let options;
  let correctAnswer;
  
  if (template.type === 'identify') {
    correctAnswer = template.getCorrect(n);
    const otherOptions = template.options.filter(o => o !== correctAnswer);
    const shuffled = otherOptions.sort(() => Math.random() - 0.5).slice(0, 3);
    options = [correctAnswer, ...shuffled].sort(() => Math.random() - 0.5);
    return { ...template, question: template.question.replace('{n}', n), options, correctAnswer, n };
  }
  
  correctAnswer = template.getCorrect();
  options = template.getOptions(correctAnswer);
  
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
    const correctAnswer = isPrime(n) ? 'Prime' : isEven(n) ? 'Even' : isOdd(n) ? 'Odd' : 'Whole';
    const allOptions = ['Natural', 'Whole', 'Even', 'Odd', 'Prime', 'Composite'];
    const otherOptions = allOptions.filter(o => o !== correctAnswer);
    const shuffled = otherOptions.sort((a, b) => rng(seed + a.charCodeAt(0)) - 0.5).slice(0, 3);
    return {
      question: `What type of number is ${n}?`,
      options: [correctAnswer, ...shuffled].sort(() => rng(seed + n) - 0.5),
      correctAnswer,
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
    return { question: 'Which number is prime?', options: opts.sort(() => rng(seed + 3) - 0.5).map(String), correctAnswer: String(prime) };
  }
  
  const even = [2, 4, 6, 8, 10, 12, 14, 16][Math.floor(rng(seed + 4) * 8)];
  const opts = [even];
  while (opts.length < 4) {
    const c = Math.floor(rng(seed + opts.length + 10) * 20) + 1;
    if (!opts.includes(c) && isOdd(c)) opts.push(c);
  }
  return { question: 'Which number is even?', options: opts.sort(() => rng(seed + 5) - 0.5).map(String), correctAnswer: String(even) };
}
