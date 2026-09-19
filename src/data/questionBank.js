export const questionBank = {
  natural: {
    practice: [
      { q: 'Which of the following is a natural number?', options: ['0', '-3', '5', '0.5'], answer: 2, explanation: 'Natural numbers are counting numbers starting from 1. So 5 is a natural number.' },
      { q: 'What is the smallest natural number?', options: ['0', '1', '-1', '2'], answer: 1, explanation: 'The smallest natural number is 1. Natural numbers start from 1.' },
      { q: 'Which number is NOT a natural number?', options: ['1', '2', '0', '3'], answer: 2, explanation: '0 is not a natural number. Natural numbers are the counting numbers: 1, 2, 3, 4, ...' },
      { q: 'How many natural numbers are there from 1 to 10 (inclusive)?', options: ['8', '9', '10', '11'], answer: 2, explanation: 'Natural numbers from 1 to 10 are: 1, 2, 3, 4, 5, 6, 7, 8, 9, 10 - that is 10 numbers.' },
      { q: 'Which set contains only natural numbers?', options: ['{1, 2, 3, 4}', '{0, 1, 2, 3}', '{-1, 0, 1}', '{0.5, 1.5, 2.5}'], answer: 0, explanation: 'Only {1, 2, 3, 4} contains exclusively natural numbers.' },
      { q: 'The successor of 15 is:', options: ['14', '16', '15', '30'], answer: 1, explanation: 'The successor of a number is the number that comes just after it. 15 + 1 = 16.' },
      { q: 'Natural numbers are also known as:', options: ['Counting numbers', 'Decimal numbers', 'Negative numbers', 'Rational numbers'], answer: 0, explanation: 'Natural numbers are also called counting numbers.' },
      { q: 'What comes after 99 in the natural number system?', options: ['98', '99', '100', '101'], answer: 2, explanation: 'After 99, the next natural number is 100.' }
    ],
    quiz: [
      { q: 'Which of these is a natural number?', options: ['-5', '0', '3', '2.5'], answer: 2, explanation: 'Natural numbers are positive counting numbers (1, 2, 3, ...). 3 is the only natural number here.' },
      { q: 'What is the predecessor of 1?', options: ['2', '0', '-1', '1'], answer: 1, explanation: 'The predecessor of 1 is 0, since 1 - 1 = 0.' },
      { q: 'Which number is the smallest whole number but NOT a natural number?', options: ['1', '0', '-1', '2'], answer: 1, explanation: '0 is the smallest whole number. Whole numbers include 0, 1, 2, 3, ... while natural numbers start from 1.' },
      { q: 'Natural numbers include:', options: ['Only positive numbers', 'Positive numbers and zero', 'All integers', 'All rational numbers'], answer: 0, explanation: 'Natural numbers are the set of positive counting numbers: {1, 2, 3, 4, ...}.' },
      { q: 'How many natural numbers less than 5 are there?', options: ['3', '4', '5', '6'], answer: 1, explanation: 'Natural numbers less than 5 are 1, 2, 3, and 4 - that is 4 numbers.' }
    ]
  },

  'even-odd': {
    practice: [
      { q: 'Which of the following is an even number?', options: ['3', '7', '12', '9'], answer: 2, explanation: 'An even number is divisible by 2 with no remainder. 12 / 2 = 6, so 12 is even.' },
      { q: 'Which of the following is an odd number?', options: ['8', '14', '21', '36'], answer: 2, explanation: 'An odd number leaves a remainder of 1 when divided by 2. 21 / 2 = 10 remainder 1.' },
      { q: 'The sum of two even numbers is always:', options: ['Odd', 'Even', 'Prime', 'Can be either'], answer: 1, explanation: 'The sum of two even numbers is always even. For example: 4 + 6 = 10 (even).' },
      { q: 'What is the smallest even natural number?', options: ['0', '1', '2', '4'], answer: 2, explanation: 'The smallest even natural number is 2.' },
      { q: 'Which of these numbers is NOT even?', options: ['24', '38', '45', '100'], answer: 2, explanation: '45 is odd because it leaves a remainder of 1 when divided by 2.' },
      { q: 'The sum of an even number and an odd number is always:', options: ['Even', 'Odd', 'Prime', 'Zero'], answer: 1, explanation: 'Adding an even and an odd number always gives an odd result. Example: 4 + 3 = 7.' },
      { q: 'Which number is even?', options: ['1001', '2345', '6780', '9999'], answer: 2, explanation: 'A number is even if its last digit is 0, 2, 4, 6, or 8. 6780 ends in 0.' },
      { q: 'The product of two odd numbers is always:', options: ['Even', 'Odd', 'Divisible by 4', 'Zero'], answer: 1, explanation: 'The product of two odd numbers is always odd. Example: 3 x 5 = 15.' }
    ],
    quiz: [
      { q: 'Which of these is an even number?', options: ['13', '27', '42', '55'], answer: 2, explanation: '42 is even because 42 / 2 = 21 with no remainder.' },
      { q: 'What is the sum of the first 3 odd natural numbers (1 + 3 + 5)?', options: ['7', '9', '11', '15'], answer: 1, explanation: '1 + 3 + 5 = 9. The sum of the first n odd numbers equals n squared. 3 squared = 9.' },
      { q: 'Which of these is an odd number?', options: ['100', '234', '567', '888'], answer: 2, explanation: '567 is odd because its last digit is 7, which is not divisible by 2.' },
      { q: 'If n is an even number, then n + 1 is always:', options: ['Even', 'Odd', 'Divisible by 4', 'Prime'], answer: 1, explanation: 'If n is even, then n + 1 is always odd. For example: 6 + 1 = 7.' },
      { q: 'The difference between two even numbers is always:', options: ['Odd', 'Even', 'Prime', 'Can be either'], answer: 1, explanation: 'The difference between two even numbers is always even. Example: 10 - 4 = 6.' }
    ]
  },

  integers: {
    practice: [
      { q: 'Which of the following is an integer?', options: ['2.5', '-3', '1/2', 'sqrt(2)'], answer: 1, explanation: 'Integers are whole numbers that can be positive, negative, or zero.' },
      { q: 'What is the opposite of -7?', options: ['7', '-7', '0', '1/7'], answer: 0, explanation: 'The opposite (additive inverse) of -7 is 7, because -7 + 7 = 0.' },
      { q: 'On a number line, which number is to the left of -2?', options: ['-1', '0', '-3', '1'], answer: 2, explanation: 'On a number line, numbers decrease as you move left. -3 is to the left of -2.' },
      { q: 'What is (-5) + 3?', options: ['8', '-8', '2', '-2'], answer: 3, explanation: '(-5) + 3 = -2. When adding a positive to a negative, subtract and keep the sign of the larger absolute value.' },
      { q: 'What is 10 - 15?', options: ['5', '-5', '25', '-25'], answer: 1, explanation: '10 - 15 = -5. When subtracting a larger number from a smaller one, the result is negative.' },
      { q: 'Which is the largest negative integer?', options: ['-10', '-1', '-5', '-100'], answer: 1, explanation: '-1 is the largest negative integer. It is closest to zero among all negative integers.' },
      { q: 'What is (-4) x (-3)?', options: ['-12', '12', '7', '-7'], answer: 1, explanation: 'Multiplying two negative numbers gives a positive result. (-4) x (-3) = 12.' },
      { q: 'The additive identity for integers is:', options: ['1', '-1', '0', 'It does not exist'], answer: 2, explanation: 'The additive identity is 0, because any integer + 0 = that integer.' }
    ],
    quiz: [
      { q: 'Which of these is NOT an integer?', options: ['-5', '0', '3.7', '12'], answer: 2, explanation: '3.7 is not an integer because it has a decimal part. Integers are whole numbers only.' },
      { q: 'What is (-8) + 5?', options: ['-13', '13', '-3', '3'], answer: 2, explanation: '(-8) + 5 = -3. Start at -8 on the number line and move 5 steps to the right.' },
      { q: 'What is the value of -(-9)?', options: ['-9', '9', '0', '-1'], answer: 1, explanation: 'The negative of a negative is positive. -(-9) = 9.' },
      { q: 'On a number line, integers to the right of 0 are:', options: ['Negative', 'Positive', 'Zero', 'Fractions'], answer: 1, explanation: 'Positive integers are to the right of 0 and negative integers are to the left.' },
      { q: 'Which of these is the smallest integer among the choices?', options: ['-3', '-1', '0', '2'], answer: 0, explanation: '-3 is the smallest because it is furthest to the left on the number line.' }
    ]
  },

  primes: {
    practice: [
      { q: 'Which of the following is a prime number?', options: ['1', '2', '4', '9'], answer: 1, explanation: '2 is a prime number because its only factors are 1 and itself.' },
      { q: 'How many factors does a prime number have?', options: ['1', '2', '3', 'It depends'], answer: 1, explanation: 'A prime number has exactly two factors: 1 and itself.' },
      { q: 'Is 1 a prime number?', options: ['Yes', 'No', 'Sometimes', 'Only in certain systems'], answer: 1, explanation: '1 is NOT a prime number. A prime number must have exactly two distinct factors: 1 and itself.' },
      { q: 'What is the only even prime number?', options: ['4', '2', '6', '8'], answer: 1, explanation: '2 is the only even prime number. All other even numbers are divisible by 2.' },
      { q: 'Which of these is NOT a prime number?', options: ['7', '11', '15', '13'], answer: 2, explanation: '15 is not prime because 15 = 3 x 5. It has factors other than 1 and itself.' },
      { q: 'What is the smallest prime number?', options: ['0', '1', '2', '3'], answer: 2, explanation: 'The smallest prime number is 2. It is also the only even prime.' },
      { q: 'Which of these numbers is prime?', options: ['21', '29', '33', '35'], answer: 1, explanation: '29 is prime because it is only divisible by 1 and 29. 21=3x7, 33=3x11, 35=5x7.' },
      { q: 'The number 23 is:', options: ['Composite', 'Prime', 'Neither', 'Even'], answer: 1, explanation: '23 is prime. It has exactly two factors: 1 and 23.' }
    ],
    quiz: [
      { q: 'Which of the following is a prime number?', options: ['9', '15', '17', '21'], answer: 2, explanation: '17 is prime because it has exactly two factors: 1 and 17.' },
      { q: 'How many prime numbers are there between 1 and 10?', options: ['2', '3', '4', '5'], answer: 2, explanation: 'The primes between 1 and 10 are: 2, 3, 5, 7. That is 4 prime numbers.' },
      { q: 'Which of these is NOT a prime number?', options: ['2', '3', '4', '5'], answer: 2, explanation: '4 is not prime because 4 = 2 x 2. It has three factors: 1, 2, and 4.' },
      { q: 'A prime number has:', options: ['Exactly one factor', 'Exactly two factors', 'Exactly three factors', 'No factors'], answer: 1, explanation: 'A prime number has exactly two factors: 1 and itself.' },
      { q: 'What is the largest prime less than 20?', options: ['17', '19', '15', '13'], answer: 1, explanation: '19 is the largest prime less than 20. 19 is only divisible by 1 and 19.' }
    ]
  },

  divisibility: {
    practice: [
      { q: 'Is 234 divisible by 2?', options: ['Yes', 'No', 'Cannot determine', 'Only if multiplied'], answer: 0, explanation: 'A number is divisible by 2 if its last digit is even. 234 ends in 4, so it is divisible by 2.' },
      { q: 'Is 456 divisible by 3?', options: ['Yes', 'No', 'Only by 6', 'Cannot determine'], answer: 0, explanation: 'Sum of digits: 4 + 5 + 6 = 15. Since 15 is divisible by 3, 456 is also divisible by 3.' },
      { q: 'Is 735 divisible by 5?', options: ['Yes', 'No', 'Only by 3', 'Cannot determine'], answer: 0, explanation: 'A number is divisible by 5 if it ends in 0 or 5. 735 ends in 5, so it is divisible by 5.' },
      { q: 'Is 108 divisible by 4?', options: ['Yes', 'No', 'Only by 2', 'Cannot determine'], answer: 0, explanation: 'A number is divisible by 4 if its last two digits are divisible by 4. 08 is divisible by 4.' },
      { q: 'Is 4560 divisible by 10?', options: ['Yes', 'No', 'Only by 5', 'Cannot determine'], answer: 0, explanation: 'A number is divisible by 10 if it ends in 0. 4560 ends in 0.' },
      { q: 'Is 516 divisible by 6?', options: ['Yes', 'No', 'Only by 2', 'Only by 3'], answer: 0, explanation: 'Divisible by 6 if divisible by both 2 and 3. 516 is even and 5+1+6=12 (div by 3).' },
      { q: 'The digit sum rule helps check divisibility by:', options: ['2 only', '3 and 9 only', '5 only', 'All numbers'], answer: 1, explanation: 'The digit sum rule works for divisibility by 3 and 9.' },
      { q: 'Is 2457 divisible by 9?', options: ['Yes', 'No', 'Only by 3', 'Cannot determine'], answer: 0, explanation: 'Digit sum: 2 + 4 + 5 + 7 = 18. Since 18 is divisible by 9, 2457 is divisible by 9.' }
    ],
    quiz: [
      { q: 'A number is divisible by 4 if:', options: ['Its last digit is 4', 'Its last two digits form a number divisible by 4', 'Its digit sum is divisible by 4', 'It is even'], answer: 1, explanation: 'The divisibility rule for 4: if the last two digits form a number divisible by 4, the whole number is divisible by 4.' },
      { q: 'Is 2456 divisible by 8?', options: ['Yes', 'No', 'Only by 4', 'Cannot determine'], answer: 0, explanation: 'For divisibility by 8, check the last three digits: 456 / 8 = 57. So 2456 is divisible by 8.' },
      { q: 'Which number is divisible by both 2 and 5?', options: ['234', '345', '560', '671'], answer: 2, explanation: 'A number divisible by both 2 and 5 must end in 0. 560 ends in 0.' },
      { q: 'Is 1234 divisible by 3?', options: ['Yes', 'No', 'Only by 2', 'Cannot determine'], answer: 1, explanation: 'Digit sum: 1 + 2 + 3 + 4 = 10. Since 10 is not divisible by 3, 1234 is not divisible by 3.' },
      { q: 'Is 999 divisible by 9?', options: ['Yes', 'No', 'Only by 3', 'Cannot determine'], answer: 0, explanation: 'Digit sum: 9 + 9 + 9 = 27. Since 27 is divisible by 9, 999 is also divisible by 9.' }
    ]
  },

  'factor-tree': {
    practice: [
      { q: 'What are the prime factors of 12?', options: ['2 x 6', '3 x 4', '2 x 2 x 3', '2 x 3 x 4'], answer: 2, explanation: '12 = 2 x 6 = 2 x 2 x 3. The prime factorization of 12 is 2 x 2 x 3.' },
      { q: 'The prime factorization of 30 is:', options: ['2 x 15', '3 x 10', '5 x 6', '2 x 3 x 5'], answer: 3, explanation: '30 = 2 x 15 = 2 x 3 x 5. The prime factorization is 2 x 3 x 5.' },
      { q: 'What is 2 x 2 x 2 x 3 written in exponent form?', options: ['2 x 3', '2 cubed x 3', '2 x 3 cubed', '6 cubed'], answer: 1, explanation: '2 x 2 x 2 = 2 cubed (or 8). So 2 x 2 x 2 x 3 = 2 cubed x 3 = 24.' },
      { q: 'Which of these is the prime factorization of 100?', options: ['2 x 50', '4 x 25', '2 x 2 x 5 x 5', '10 x 10'], answer: 2, explanation: '100 = 2 x 50 = 2 x 2 x 25 = 2 x 2 x 5 x 5.' },
      { q: 'The prime factorization of 7 is:', options: ['1 x 7', '7', '7 is not factorable', 'It has no factors'], answer: 1, explanation: '7 is itself a prime number, so its prime factorization is just 7.' },
      { q: 'What are the prime factors of 48?', options: ['2 x 24', '3 x 16', '2 x 2 x 2 x 2 x 3', '4 x 12'], answer: 2, explanation: '48 = 2 x 2 x 2 x 2 x 3. That is 2 to the power of 4 times 3.' },
      { q: 'In a factor tree, the leaves are always:', options: ['Composite numbers', 'Prime numbers', 'Even numbers', 'Odd numbers'], answer: 1, explanation: 'In a factor tree, you keep breaking down numbers until all leaves are prime numbers.' },
      { q: 'The prime factorization of 25 is:', options: ['5 x 5', '1 x 25', '5 squared', 'All of the above are valid'], answer: 0, explanation: '25 = 5 x 5. The prime factorization is 5 x 5 or 5 squared.' }
    ],
    quiz: [
      { q: 'What is the prime factorization of 60?', options: ['2 x 30', '3 x 20', '2 x 2 x 3 x 5', '4 x 15'], answer: 2, explanation: '60 = 2 x 30 = 2 x 2 x 15 = 2 x 2 x 3 x 5.' },
      { q: 'Which number has the prime factorization 2 x 3 x 7?', options: ['21', '42', '54', '63'], answer: 1, explanation: '2 x 3 x 7 = 42. You can verify: 2 x 3 = 6, and 6 x 7 = 42.' },
      { q: 'The prime factorization of 18 is:', options: ['2 x 9', '3 x 6', '2 x 3 x 3', '2 x 3'], answer: 2, explanation: '18 = 2 x 9 = 2 x 3 x 3. The prime factorization is 2 x 3 squared.' },
      { q: 'Which number has the most prime factors (counting repetition)?', options: ['12', '15', '16', '18'], answer: 2, explanation: '16 = 2x2x2x2 (4 prime factors). 12=2x2x3 (3), 15=3x5 (2), 18=2x3x3 (3).' },
      { q: 'The prime factorization of 1 is:', options: ['1', '1 is prime', '1 has no prime factors', 'Cannot be determined'], answer: 2, explanation: '1 is neither prime nor composite. It has no prime factorization.' }
    ]
  },

  'hcf-lcm': {
    practice: [
      { q: 'What is the HCF of 12 and 18?', options: ['3', '6', '12', '36'], answer: 1, explanation: 'Factors of 12: 1,2,3,4,6,12. Factors of 18: 1,2,3,6,9,18. The highest common factor is 6.' },
      { q: 'What is the LCM of 4 and 6?', options: ['10', '12', '24', '2'], answer: 1, explanation: 'Multiples of 4: 4,8,12,16,... Multiples of 6: 6,12,18,... The smallest common multiple is 12.' },
      { q: 'The HCF of two different prime numbers is always:', options: ['The larger prime', 'The smaller prime', '1', 'Their product'], answer: 2, explanation: 'Two different prime numbers share no common factors other than 1, so their HCF is always 1.' },
      { q: 'The LCM of two consecutive natural numbers is:', options: ['Their sum', 'Their product', 'Their difference', 'Always even'], answer: 1, explanation: 'Two consecutive natural numbers are coprime, so their LCM is their product.' },
      { q: 'What is the HCF of 8 and 12?', options: ['2', '4', '8', '24'], answer: 1, explanation: 'Factors of 8: 1,2,4,8. Factors of 12: 1,2,3,4,6,12. The highest common factor is 4.' },
      { q: 'What is the LCM of 5 and 7?', options: ['12', '35', '70', '1'], answer: 1, explanation: '5 and 7 are both prime and coprime. Their LCM = 5 x 7 = 35.' },
      { q: 'For any two numbers a and b, HCF x LCM equals:', options: ['a + b', 'a x b', 'a - b', 'a / b'], answer: 1, explanation: 'For any two positive integers a and b: HCF(a,b) x LCM(a,b) = a x b.' },
      { q: 'Riya cycles every 12 min and Ravi every 18 min. After how many minutes will they meet again if they start together?', options: ['6', '24', '36', '72'], answer: 2, explanation: 'They meet again at LCM(12, 18) = 36 minutes.' }
    ],
    quiz: [
      { q: 'What is the HCF of 24 and 36?', options: ['6', '12', '24', '72'], answer: 1, explanation: 'Factors of 24: 1,2,3,4,6,8,12,24. Factors of 36: 1,2,3,4,6,9,12,18,36. HCF is 12.' },
      { q: 'What is the LCM of 8 and 10?', options: ['2', '18', '40', '80'], answer: 2, explanation: 'Multiples of 8: 8,16,24,32,40,... Multiples of 10: 10,20,30,40,... LCM is 40.' },
      { q: 'The LCM of 3 and 5 is:', options: ['8', '15', '30', '1'], answer: 1, explanation: '3 and 5 are coprime primes. LCM = 3 x 5 = 15.' },
      { q: 'HCF(14, 21) = ?', options: ['7', '14', '21', '3'], answer: 0, explanation: 'Factors of 14: 1,2,7,14. Factors of 21: 1,3,7,21. HCF is 7.' },
      { q: 'If HCF(a, b) = 1, then a and b are called:', options: ['Composite', 'Coprime', 'Prime', 'Twin primes'], answer: 1, explanation: 'When the HCF of two numbers is 1, they are called coprime (or relatively prime).' }
    ]
  },

  remainders: {
    practice: [
      { q: 'What is the remainder when 17 is divided by 5?', options: ['1', '2', '3', '4'], answer: 1, explanation: '17 = 5 x 3 + 2. The remainder is 2.' },
      { q: 'What is 23 mod 7?', options: ['1', '2', '3', '4'], answer: 1, explanation: '23 = 7 x 3 + 2. So 23 mod 7 = 2.' },
      { q: 'When 100 is divided by 7, what is the remainder?', options: ['1', '2', '3', '4'], answer: 1, explanation: '100 = 7 x 14 + 2. The remainder is 2.' },
      { q: 'What is the remainder when 25 is divided by 4?', options: ['0', '1', '2', '3'], answer: 1, explanation: '25 = 4 x 6 + 1. The remainder is 1.' },
      { q: 'A number leaves remainder 3 when divided by 5. What could be its remainder when divided by 10?', options: ['Always 3', 'Always 8', 'Could be 3 or 8', 'Cannot determine'], answer: 2, explanation: 'The number could be 3, 8, 13, 18... When divided by 10 the remainder could be 3 or 8.' },
      { q: 'What is 0 divided by 5?', options: ['0', '1', '5', 'Undefined'], answer: 0, explanation: '0 divided by any non-zero number is 0 with remainder 0.' },
      { q: 'What is 15 mod 4?', options: ['1', '2', '3', '0'], answer: 2, explanation: '15 = 4 x 3 + 3. So 15 mod 4 = 3.' },
      { q: 'When 50 is divided by 6, the remainder is:', options: ['0', '1', '2', '3'], answer: 2, explanation: '50 = 6 x 8 + 2. The remainder is 2.' }
    ],
    quiz: [
      { q: 'What is the remainder when 97 is divided by 8?', options: ['0', '1', '2', '3'], answer: 1, explanation: '97 = 8 x 12 + 1. The remainder is 1.' },
      { q: 'What is 45 mod 6?', options: ['0', '1', '2', '3'], answer: 3, explanation: '45 = 6 x 7 + 3. The remainder is 3.' },
      { q: 'If x mod 3 = 2, which of these could be x?', options: ['5', '6', '9', '12'], answer: 0, explanation: '5 mod 3 = 2 (since 5 = 3 x 1 + 2). The others are all divisible by 3.' },
      { q: 'What is the remainder when 1000 is divided by 9?', options: ['0', '1', '8', '9'], answer: 1, explanation: 'Sum of digits of 1000 is 1. Since 1 mod 9 = 1, the remainder is 1.' },
      { q: 'What is 7 mod 7?', options: ['0', '1', '7', 'Undefined'], answer: 0, explanation: '7 = 7 x 1 + 0. The remainder is 0.' }
    ]
  },

  'unit-digit': {
    practice: [
      { q: 'What is the unit digit of 17 x 13?', options: ['1', '7', '9', '3'], answer: 0, explanation: 'Unit digit of 7 x 3 = 21, so unit digit is 1.' },
      { q: 'What is the unit digit of 25 squared?', options: ['5', '25', '0', '1'], answer: 0, explanation: '25 x 25 = 625. The unit digit is 5.' },
      { q: 'What is the unit digit of 3 to the power of 4?', options: ['3', '9', '7', '1'], answer: 3, explanation: '3^1=3, 3^2=9, 3^3=27(7), 3^4=81(1). Cycle: 3,9,7,1. Answer is 1.' },
      { q: 'What is the unit digit of 7 x 8 x 3?', options: ['6', '8', '4', '2'], answer: 1, explanation: 'Unit digit: 7x8=56 (unit 6), then 6x3=18 (unit 8). The unit digit is 8.' },
      { q: 'What is the unit digit of 123 + 456?', options: ['9', '8', '7', '6'], answer: 0, explanation: 'Unit digit of 3 + 6 = 9.' },
      { q: 'What is the unit digit of 99 x 99?', options: ['1', '9', '8', '2'], answer: 0, explanation: 'Unit digit of 9 x 9 = 81, so unit digit is 1.' },
      { q: 'What is the unit digit of 2 to the power of 10?', options: ['2', '4', '8', '6'], answer: 1, explanation: 'Powers of 2 cycle: 2,4,8,6. 10 mod 4 = 2. The 2nd in the cycle is 4.' },
      { q: 'What is the unit digit of 15 x 16?', options: ['0', '5', '6', '1'], answer: 0, explanation: '5 x 6 = 30, so unit digit is 0.' }
    ],
    quiz: [
      { q: 'What is the unit digit of 13 squared?', options: ['3', '9', '6', '1'], answer: 1, explanation: '13 x 13 = 169. The unit digit is 9.' },
      { q: 'What is the unit digit of 3 to the power of 100?', options: ['3', '9', '7', '1'], answer: 3, explanation: 'Cycle of 3: 3,9,7,1 (length 4). 100 mod 4 = 0, so position 4 = 1.' },
      { q: 'What is the unit digit of 1234 x 5678?', options: ['2', '4', '6', '8'], answer: 0, explanation: 'Unit digit of 4 x 8 = 32, so unit digit is 2.' },
      { q: 'What is the unit digit of 7 squared?', options: ['7', '9', '3', '1'], answer: 1, explanation: '7 x 7 = 49. The unit digit is 9.' },
      { q: 'What is the unit digit of 6 to any positive power?', options: ['6', '1', '0', 'Varies'], answer: 0, explanation: 'Any positive power of a number ending in 6 always ends in 6.' }
    ]
  },

  properties: {
    practice: [
      { q: 'Which property states that a + b = b + a?', options: ['Associative', 'Commutative', 'Distributive', 'Identity'], answer: 1, explanation: 'The commutative property states that the order of addition (or multiplication) does not change the result.' },
      { q: 'Which property states that (a + b) + c = a + (b + c)?', options: ['Commutative', 'Associative', 'Distributive', 'Closure'], answer: 1, explanation: 'The associative property states that the way numbers are grouped in addition (or multiplication) does not change the result.' },
      { q: 'What is the distributive property?', options: ['a + b = b + a', 'a x (b + c) = a x b + a x c', '(a + b) + c = a + (b + c)', 'a x 1 = a'], answer: 1, explanation: 'The distributive property: a x (b + c) = a x b + a x c. Multiplication distributes over addition.' },
      { q: 'The additive identity is:', options: ['1', '0', '-1', 'It does not exist'], answer: 1, explanation: 'The additive identity is 0 because a + 0 = a for any number a.' },
      { q: 'The multiplicative identity is:', options: ['0', '1', '-1', '10'], answer: 1, explanation: 'The multiplicative identity is 1 because a x 1 = a for any number a.' },
      { q: 'Which property states that a x (b + c) = a x b + a x c?', options: ['Commutative', 'Associative', 'Distributive', 'Inverse'], answer: 2, explanation: 'The distributive property of multiplication over addition: a x (b + c) = a x b + a x c.' },
      { q: 'What is the additive inverse of 5?', options: ['5', '-5', '0', '1/5'], answer: 1, explanation: 'The additive inverse of 5 is -5, because 5 + (-5) = 0.' },
      { q: 'Which property states that a + 0 = a?', options: ['Commutative', 'Associative', 'Identity', 'Closure'], answer: 2, explanation: 'This is the additive identity property: adding 0 to any number gives the same number.' }
    ],
    quiz: [
      { q: '3 + 5 = 5 + 3 is an example of which property?', options: ['Associative', 'Commutative', 'Distributive', 'Identity'], answer: 1, explanation: 'This demonstrates the commutative property of addition: changing the order does not change the sum.' },
      { q: '2 x (3 + 4) = 2 x 3 + 2 x 4 is which property?', options: ['Commutative', 'Associative', 'Distributive', 'Closure'], answer: 2, explanation: 'This is the distributive property: multiplication distributes over addition.' },
      { q: 'What is the multiplicative inverse of 4?', options: ['4', '-4', '1/4', '0'], answer: 2, explanation: 'The multiplicative inverse of 4 is 1/4, because 4 x 1/4 = 1.' },
      { q: '(2 + 3) + 4 = 2 + (3 + 4) demonstrates which property?', options: ['Commutative', 'Associative', 'Distributive', 'Identity'], answer: 1, explanation: 'This is the associative property: regrouping the numbers does not change the sum.' },
      { q: 'a x 0 = 0 is an example of which property?', options: ['Identity', 'Zero property', 'Distributive', 'Closure'], answer: 1, explanation: 'Any number multiplied by 0 equals 0. This is known as the zero property of multiplication.' }
    ]
  },

  fractions: {
    practice: [
      { q: 'Which fraction is larger: 1/2 or 1/3?', options: ['1/2', '1/3', 'They are equal', 'Cannot compare'], answer: 0, explanation: '1/2 = 0.5 and 1/3 = 0.333... So 1/2 is larger. When numerators are the same, the fraction with the smaller denominator is larger.' },
      { q: 'What is 1/3 + 1/6?', options: ['2/9', '1/2', '2/6', '1/18'], answer: 1, explanation: '1/3 = 2/6. So 2/6 + 1/6 = 3/6 = 1/2.' },
      { q: 'What is 3/4 - 1/4?', options: ['2/4', '1/2', 'Both A and B', '2/0'], answer: 2, explanation: '3/4 - 1/4 = 2/4 = 1/2. Both 2/4 and 1/2 are correct (1/2 is simplified).' },
      { q: 'What is 2/3 x 3/4?', options: ['6/12', '1/2', 'Both are correct', '5/7'], answer: 2, explanation: '2/3 x 3/4 = 6/12 = 1/2. Both answers are correct.' },
      { q: 'Simplify 8/12:', options: ['2/3', '4/6', 'Both are correct', '1/2'], answer: 0, explanation: '8/12 = (8/4)/(12/4) = 2/3. Both 2/3 and 4/6 are equivalent, but 2/3 is fully simplified.' },
      { q: 'What is an improper fraction?', options: ['Numerator > Denominator', 'Denominator > Numerator', 'Both equal', 'Cannot be simplified'], answer: 0, explanation: 'An improper fraction has a numerator greater than or equal to the denominator, like 7/4.' },
      { q: 'Convert 3/5 to a decimal:', options: ['0.3', '0.6', '0.35', '0.53'], answer: 1, explanation: '3/5 = 3 / 5 = 0.6.' },
      { q: 'Which is equivalent to 2/5?', options: ['4/10', '6/15', 'Both A and B', '8/20'], answer: 2, explanation: '2/5 = 4/10 = 6/15 = 8/20. All are equivalent fractions.' }
    ],
    quiz: [
      { q: 'What is 2/5 + 1/5?', options: ['3/10', '3/5', '2/25', '1/5'], answer: 1, explanation: 'When denominators are the same, add the numerators: 2/5 + 1/5 = 3/5.' },
      { q: 'What is 3/4 x 2/3?', options: ['6/12', '1/2', 'Both are correct', '5/7'], answer: 2, explanation: '3/4 x 2/3 = 6/12 = 1/2. Both are correct (1/2 is simplified).' },
      { q: 'Which fraction is smaller: 3/8 or 1/3?', options: ['3/8', '1/3', 'They are equal', 'Cannot determine'], answer: 1, explanation: '3/8 = 0.375, 1/3 = 0.333... So 1/3 is smaller.' },
      { q: 'What is 5/6 - 1/3?', options: ['4/3', '1/2', '3/6', '4/6'], answer: 1, explanation: '1/3 = 2/6. So 5/6 - 2/6 = 3/6 = 1/2.' },
      { q: 'Convert 7/4 to a mixed number:', options: ['1 3/4', '1 1/4', '1 2/4', '2 1/4'], answer: 0, explanation: '7 / 4 = 1 remainder 3, so 7/4 = 1 and 3/4.' }
    ]
  },

  decimals: {
    practice: [
      { q: 'In the number 0.456, which digit is in the tenths place?', options: ['4', '5', '6', '0'], answer: 0, explanation: 'In 0.456: 4 is in the tenths place, 5 is in the hundredths place, 6 is in the thousandths place.' },
      { q: 'Which is larger: 0.7 or 0.72?', options: ['0.7', '0.72', 'They are equal', 'Cannot compare'], answer: 1, explanation: '0.72 is larger than 0.7. Adding a zero to 0.7 gives 0.70, and 0.72 > 0.70.' },
      { q: 'What is 0.5 as a fraction?', options: ['1/3', '1/2', '1/4', '2/3'], answer: 1, explanation: '0.5 = 5/10 = 1/2.' },
      { q: 'What is 3.14 rounded to the nearest whole number?', options: ['3', '4', '3.1', '3.2'], answer: 0, explanation: '3.14 rounded to the nearest whole number is 3. The digit after the decimal (1) is less than 5.' },
      { q: 'What is 0.25 + 0.75?', options: ['1.0', '0.100', '0.50', '1.50'], answer: 0, explanation: '0.25 + 0.75 = 1.00 = 1.' },
      { q: 'Which decimal equals 3/4?', options: ['0.25', '0.5', '0.75', '0.34'], answer: 2, explanation: '3/4 = 3 / 4 = 0.75.' },
      { q: 'What is 1.5 x 2?', options: ['1.7', '2.5', '3.0', '3.5'], answer: 2, explanation: '1.5 x 2 = 3.0.' },
      { q: 'Round 2.678 to one decimal place:', options: ['2.6', '2.7', '2.68', '3.0'], answer: 1, explanation: '2.678 rounded to one decimal place is 2.7. The second decimal (7) is >= 5, so we round up.' }
    ],
    quiz: [
      { q: 'What is the place value of 5 in 2.351?', options: ['Units', 'Tenths', 'Hundredths', 'Thousandths'], answer: 2, explanation: 'In 2.351: 2 is units, 3 is tenths, 5 is hundredths, 1 is thousandths.' },
      { q: 'Which is the smallest: 0.5, 0.05, 0.55, 0.005?', options: ['0.5', '0.05', '0.55', '0.005'], answer: 3, explanation: '0.005 is the smallest. It has zeros in the tenths and hundredths places.' },
      { q: 'What is 0.9 + 0.09?', options: ['0.99', '0.18', '0.099', '1.8'], answer: 0, explanation: '0.9 + 0.09 = 0.99.' },
      { q: 'Convert 7/8 to a decimal:', options: ['0.75', '0.875', '0.7', '0.8'], answer: 1, explanation: '7/8 = 7 / 8 = 0.875.' },
      { q: 'What is 2.5 - 1.3?', options: ['1.2', '3.8', '1.8', '1.3'], answer: 0, explanation: '2.5 - 1.3 = 1.2.' }
    ]
  },

  bases: {
    practice: [
      { q: 'What is 10 in binary?', options: ['1010', '1100', '1001', '1110'], answer: 0, explanation: '10 = 8 + 2 = 1010 in binary (8 + 0 + 2 + 0).' },
      { q: 'What is 5 in binary?', options: ['101', '110', '111', '100'], answer: 0, explanation: '5 = 4 + 1 = 101 in binary (4 + 0 + 1).' },
      { q: 'What decimal number is 111 in binary?', options: ['5', '6', '7', '8'], answer: 2, explanation: '111 in binary = 1x4 + 1x2 + 1x1 = 4 + 2 + 1 = 7.' },
      { q: 'What is 15 in hexadecimal?', options: ['A', 'B', 'F', 'E'], answer: 2, explanation: 'In hex: 0-9 then A=10, B=11, C=12, D=13, E=14, F=15. So 15 = F.' },
      { q: 'What decimal number is A in hexadecimal?', options: ['9', '10', '11', '12'], answer: 1, explanation: 'In hexadecimal, A = 10 in decimal.' },
      { q: 'What is 255 in hexadecimal?', options: ['FF', 'FE', 'EF', '100'], answer: 0, explanation: '255 = 16 x 15 + 15 = FF in hexadecimal.' },
      { q: 'How many digits does the binary system use?', options: ['2', '8', '10', '16'], answer: 0, explanation: 'The binary system uses only two digits: 0 and 1.' },
      { q: 'What is 10 in base 10?', options: ['10', '12', '8', '2'], answer: 0, explanation: '10 in base 10 is simply 10. Base 10 is our standard decimal system.' }
    ],
    quiz: [
      { q: 'What is 13 in binary?', options: ['1011', '1101', '1110', '1010'], answer: 1, explanation: '13 = 8 + 4 + 1 = 1101 in binary.' },
      { q: 'What decimal number is 10110 in binary?', options: ['20', '22', '24', '26'], answer: 1, explanation: '10110 = 1x16 + 0x8 + 1x4 + 1x2 + 0x1 = 16 + 4 + 2 = 22.' },
      { q: 'What is 20 in hexadecimal?', options: ['14', '1E', '2A', '10'], answer: 0, explanation: '20 = 1x16 + 4 = 14 in hexadecimal.' },
      { q: 'Which base does the hexadecimal system use?', options: ['2', '8', '10', '16'], answer: 3, explanation: 'Hexadecimal uses base 16, with digits 0-9 and letters A-F.' },
      { q: 'What is 100 in binary in decimal?', options: ['4', '8', '100', '2'], answer: 0, explanation: '100 in binary = 1x4 + 0x2 + 0x1 = 4 in decimal.' }
    ]
  },

  explorer: {
    practice: [
      { q: 'The number 15 is:', options: ['Only odd', 'Only composite', 'Both odd and composite', 'Prime'], answer: 2, explanation: '15 is odd (not divisible by 2) and composite (15 = 3 x 5, has more than 2 factors).' },
      { q: 'Which number is both even and prime?', options: ['4', '2', '6', '8'], answer: 1, explanation: '2 is the only number that is both even and prime.' },
      { q: 'The number 1 is:', options: ['Prime', 'Composite', 'Neither prime nor composite', 'Even'], answer: 2, explanation: '1 is neither prime nor composite. It has only one factor (itself).' },
      { q: 'Which of these is a rational number?', options: ['sqrt(2)', 'pi', '1/2', 'infinity'], answer: 2, explanation: 'A rational number can be expressed as p/q where p and q are integers and q is not zero. 1/2 is rational.' },
      { q: 'The number 0 is:', options: ['Natural', 'Whole', 'Integer but not whole', 'Neither whole nor integer'], answer: 1, explanation: '0 is a whole number, an integer, and a rational number, but it is NOT a natural number.' },
      { q: 'Which set does -3 belong to?', options: ['Natural only', 'Whole only', 'Integer', 'Not a number'], answer: 2, explanation: '-3 is an integer. It is negative, so it is not a natural or whole number.' },
      { q: 'All natural numbers are also:', options: ['Integers', 'Fractions', 'Decimals', 'Irrational'], answer: 0, explanation: 'All natural numbers (1, 2, 3, ...) are also integers (which include negatives and zero).' },
      { q: 'Which number is irrational?', options: ['1/3', '0.75', 'sqrt(2)', '22/7'], answer: 2, explanation: 'sqrt(2) is irrational because it cannot be expressed as a fraction of two integers. Its decimal goes on forever without repeating.' }
    ],
    quiz: [
      { q: 'The number 17 is:', options: ['Composite and odd', 'Prime and odd', 'Composite and even', 'Prime and even'], answer: 1, explanation: '17 is prime (only factors are 1 and 17) and odd (not divisible by 2).' },
      { q: 'Which number is a whole number but NOT a natural number?', options: ['1', '0', '-1', '2.5'], answer: 1, explanation: '0 is a whole number but not a natural number. Natural numbers start from 1.' },
      { q: 'Pi is an example of:', options: ['Rational number', 'Irrational number', 'Integer', 'Natural number'], answer: 1, explanation: 'Pi (3.14159...) is irrational. Its decimal expansion is non-terminating and non-repeating.' },
      { q: 'All integers are also:', options: ['Natural numbers', 'Rational numbers', 'Prime numbers', 'Whole numbers'], answer: 1, explanation: 'All integers are rational numbers because any integer n can be written as n/1.' },
      { q: 'Which classification does NOT apply to 0?', options: ['Integer', 'Whole number', 'Natural number', 'Rational number'], answer: 2, explanation: '0 is NOT a natural number. It is an integer, a whole number, and a rational number.' }
    ]
  },

  'direction-sense': {
    practice: [
      { q: 'Which direction is opposite to North?', options: ['East', 'West', 'South', 'North'], answer: 2, explanation: 'North and South are opposite directions on a compass.' },
      { q: 'Which direction is opposite to East?', options: ['North', 'South', 'West', 'East'], answer: 2, explanation: 'East and West are opposite directions on a compass.' },
      { q: 'If you face North and turn 90 degrees clockwise, which direction do you face?', options: ['South', 'East', 'West', 'North'], answer: 1, explanation: 'Clockwise from North: North -> East. A 90-degree clockwise turn from North faces East.' },
      { q: 'If you face East and turn 90 degrees clockwise, which direction do you face?', options: ['North', 'South', 'East', 'West'], answer: 1, explanation: 'Clockwise from East: East -> South. A 90-degree clockwise turn from East faces South.' },
      { q: 'A person walks 5 km North, then 3 km East, then 5 km South. Which direction is he from the start?', options: ['North', 'South', 'West', 'East'], answer: 3, explanation: '5 km North + 5 km South cancels out. He is 3 km East of the starting point.' },
      { q: 'In the morning, where does a shadow point?', options: ['East', 'West', 'North', 'South'], answer: 1, explanation: 'In the morning, the sun is in the east, so shadows fall towards the west.' },
      { q: 'A person walks 3 km North then 4 km East. How far is he from the starting point?', options: ['7 km', '5 km', '1 km', '12 km'], answer: 1, explanation: 'This forms a right triangle with legs 3 and 4. By Pythagoras: sqrt(9+16) = sqrt(25) = 5 km.' },
      { q: 'A person walks 6 km North then 8 km East. How far is he from the starting point?', options: ['14 km', '2 km', '10 km', '48 km'], answer: 2, explanation: 'By Pythagoras: sqrt(36+64) = sqrt(100) = 10 km.' }
    ],
    quiz: [
      { q: 'If you face North and turn 270 degrees clockwise, which direction do you face?', options: ['East', 'South', 'West', 'North'], answer: 2, explanation: '270 degrees clockwise from North: N->E(90)->S(180)->W(270). You face West.' },
      { q: 'A person walks 3 km North, then 4 km East. How far is he from the starting point in a straight line?', options: ['5 km', '7 km', '1 km', '12 km'], answer: 0, explanation: 'This forms a right triangle with legs 3 and 4. By Pythagoras: sqrt(9+16) = sqrt(25) = 5 km.' },
      { q: 'South-East is between which two directions?', options: ['South and West', 'South and East', 'North and East', 'East and West'], answer: 1, explanation: 'South-East is exactly between South and East, at 45 degrees from each.' },
      { q: 'If you face East and turn 90 degrees clockwise, you face:', options: ['North', 'South', 'East', 'West'], answer: 1, explanation: 'Clockwise from East: East -> South. A 90-degree clockwise turn from East faces South.' },
      { q: 'In the evening, shadows fall towards the:', options: ['East', 'West', 'North', 'South'], answer: 0, explanation: 'In the evening, the sun is in the west, so shadows fall towards the east.' },
      { q: 'If you face South and turn 90 degrees anticlockwise, which direction do you face?', options: ['East', 'West', 'North', 'South'], answer: 0, explanation: 'Anticlockwise from South: South -> East. A 90-degree anticlockwise turn from South faces East.' },
      { q: 'North-West is between which two directions?', options: ['North and South', 'North and West', 'East and West', 'South and West'], answer: 1, explanation: 'North-West is exactly between North and West, at 45 degrees from each.' },
      { q: 'If you walk 6 km South and then 6 km North, where are you?', options: ['6 km South', '6 km North', '12 km North', 'At the starting point'], answer: 3, explanation: 'Walking equal distances in opposite directions brings you back to the starting point.' },
      { q: 'A person walks 3 km North then 4 km East. What is the shortest distance back to the starting point?', options: ['7 km', '5 km', '3 km', '4 km'], answer: 1, explanation: 'The shortest distance is the hypotenuse of a right triangle with sides 3 and 4. By Pythagoras: sqrt(9+16) = 5 km.' },
      { q: 'If you face West and turn 180 degrees, which direction do you face?', options: ['West', 'North', 'East', 'South'], answer: 2, explanation: 'A 180-degree turn always faces the opposite direction. West becomes East.' },
      { q: 'At sunset, a tree\'s shadow points towards the:', options: ['East', 'West', 'North', 'South'], answer: 0, explanation: 'At sunset the sun is in the west, so shadows point towards the east.' },
      { q: 'If you face North-East and turn 45 degrees clockwise, which direction do you face?', options: ['North', 'East', 'South-East', 'North-West'], answer: 1, explanation: 'North-East is 45 degrees from both North and East. Turning 45 degrees clockwise from NE faces East.' },
      { q: 'A man walks 5 km East, then 5 km South, then 5 km West, then 5 km North. Where is he?', options: ['At the starting point', '5 km East of start', '5 km North of start', '10 km from start'], answer: 0, explanation: '5 km East + 5 km West cancels horizontally. 5 km South + 5 km North cancels vertically. He is back at the start.' },
      { q: 'If you face South and turn 270 degrees anticlockwise, which direction do you face?', options: ['East', 'West', 'North', 'South'], answer: 1, explanation: 'South is 180 degrees. Going 270 anticlockwise: 180-270 = -90 = 270 degrees = West.' },
      { q: 'South-West is between which two directions?', options: ['South and East', 'North and West', 'South and West', 'East and North'], answer: 2, explanation: 'South-West is exactly between South and West, at 45 degrees from each.' },
      { q: 'If you walk 10 km North and then 10 km South, how far are you from your starting point?', options: ['20 km', '10 km', '0 km', '5 km'], answer: 2, explanation: 'Walking equal distances in opposite directions brings you back to the starting point.' },
      { q: 'If you face North-East and turn 90 degrees anticlockwise, you face:', options: ['North-West', 'South-East', 'North', 'West'], answer: 0, explanation: 'North-East is at 45 degrees. Going 90 anticlockwise: 45-90 = -45 = 315 degrees = North-West.' },
      { q: 'At noon in the Northern Hemisphere, a vertical pole\'s shadow falls towards the:', options: ['South', 'North', 'East', 'West'], answer: 1, explanation: 'At noon in the Northern Hemisphere, the sun is due south, so shadows fall towards the north.' },
      { q: 'If you face West and turn 90 degrees clockwise, you face:', options: ['North', 'East', 'South', 'West'], answer: 0, explanation: 'West is 270 degrees. Going 90 clockwise: 270+90 = 360 = 0 degrees = North.' },
      { q: 'Riya walks 4 km East, then 3 km North. What is her straight-line distance from the start?', options: ['7 km', '1 km', '5 km', '4 km'], answer: 2, explanation: 'This forms a right triangle with sides 3 and 4. By Pythagoras: sqrt(9+16) = 5 km.' },
      { q: 'If you face South-East and turn 90 degrees clockwise, which direction do you face?', options: ['South-West', 'North-East', 'South', 'West'], answer: 0, explanation: 'South-East is at 135 degrees. Going 90 clockwise: 135+90 = 225 degrees = South-West.' },
      { q: 'A compass always points towards:', options: ['East', 'West', 'Magnetic North', 'Magnetic South'], answer: 2, explanation: 'A compass needle always points towards the magnetic North Pole.' },
      { q: 'If you walk 3 km East then 4 km South then 3 km West, how far are you from your starting point?', options: ['3 km', '4 km', '7 km', '0 km'], answer: 1, explanation: '3 km East + 3 km West cancels horizontally. You are 4 km South of the starting point.' },
      { q: 'If you face North-West and turn 45 degrees anticlockwise, you face:', options: ['West', 'North', 'South-West', 'North-East'], answer: 0, explanation: 'North-West is at 315 degrees. Going 45 anticlockwise: 315-45 = 270 degrees = West.' },
      { q: 'In the early morning, shadows are:', options: ['Short and point west', 'Long and point west', 'Short and point east', 'Long and point east'], answer: 1, explanation: 'In the early morning the sun is low in the east, so shadows are long and point towards the west.' },
      { q: 'If you face East and turn 270 degrees anticlockwise, which direction do you face?', options: ['North', 'South', 'East', 'West'], answer: 1, explanation: 'East is 90 degrees. Going 270 anticlockwise: 90-270 = -180 = 180 degrees = South.' },
      { q: 'A person walks 6 km North then 8 km East. How far is he from the starting point?', options: ['14 km', '2 km', '10 km', '48 km'], answer: 2, explanation: 'By Pythagoras: sqrt(36+64) = sqrt(100) = 10 km.' },
      { q: 'If you face North and turn 45 degrees clockwise, you face:', options: ['North-East', 'North-West', 'East', 'South-East'], answer: 0, explanation: 'Turning 45 degrees clockwise from North faces North-East.' },
      { q: 'If you face South and turn to face East, you make a turn to the:', options: ['Left', 'Right', 'Back', 'No turn'], answer: 0, explanation: 'When facing South, East is to your left. So you turn left.' },
      { q: 'If you face West and turn 135 degrees clockwise, which direction do you face?', options: ['North-East', 'South-East', 'North-West', 'South-West'], answer: 0, explanation: 'West is 270 degrees. Going 135 clockwise: 270+135 = 405 = 45 degrees = North-East.' }
    ]
  }
};

export const dailyQuestionPool = [
  { q: 'What is the smallest natural number?', options: ['0', '1', '-1', '2'], answer: 1, explanation: 'The smallest natural number is 1.', topic: 'natural' },
  { q: 'Which number is even?', options: ['13', '27', '42', '55'], answer: 2, explanation: '42 is even because it is divisible by 2.', topic: 'even-odd' },
  { q: 'What is (-3) + 7?', options: ['4', '-4', '10', '-10'], answer: 0, explanation: '(-3) + 7 = 4.', topic: 'integers' },
  { q: 'Which of these is a prime number?', options: ['9', '15', '17', '21'], answer: 2, explanation: '17 is prime because it has exactly two factors: 1 and 17.', topic: 'primes' },
  { q: 'Is 345 divisible by 5?', options: ['Yes', 'No', 'Cannot determine', 'Only by 3'], answer: 0, explanation: '345 ends in 5, so it is divisible by 5.', topic: 'divisibility' },
  { q: 'What is the prime factorization of 36?', options: ['2 x 18', '3 x 12', '2 x 2 x 3 x 3', '4 x 9'], answer: 2, explanation: '36 = 2 x 2 x 3 x 3 = 2 squared x 3 squared.', topic: 'factor-tree' },
  { q: 'What is the HCF of 8 and 12?', options: ['2', '4', '8', '24'], answer: 1, explanation: 'Factors of 8: 1,2,4,8. Factors of 12: 1,2,3,4,6,12. HCF is 4.', topic: 'hcf-lcm' },
  { q: 'What is 23 mod 5?', options: ['1', '2', '3', '4'], answer: 2, explanation: '23 = 5 x 4 + 3. The remainder is 3.', topic: 'remainders' },
  { q: 'What is the unit digit of 7 x 8 x 3?', options: ['6', '8', '4', '2'], answer: 1, explanation: '7 x 8 = 56 (unit 6), 6 x 3 = 18 (unit 8). Unit digit is 8.', topic: 'unit-digit' },
  { q: 'a + b = b + a demonstrates which property?', options: ['Associative', 'Commutative', 'Distributive', 'Identity'], answer: 1, explanation: 'This is the commutative property of addition.', topic: 'properties' },
  { q: 'What is 1/4 + 3/4?', options: ['4/8', '1', '2/4', '3/16'], answer: 1, explanation: '1/4 + 3/4 = 4/4 = 1.', topic: 'fractions' },
  { q: 'What is 0.5 as a fraction?', options: ['1/3', '1/2', '1/4', '2/3'], answer: 1, explanation: '0.5 = 5/10 = 1/2.', topic: 'decimals' },
  { q: 'What is 7 in binary?', options: ['101', '110', '111', '1000'], answer: 2, explanation: '7 = 4 + 2 + 1 = 111 in binary.', topic: 'bases' },
  { q: 'The number 1 is:', options: ['Prime', 'Composite', 'Neither prime nor composite', 'Even'], answer: 2, explanation: '1 is neither prime nor composite.', topic: 'explorer' },
  { q: 'Facing North, a 90 degree clockwise turn faces:', options: ['South', 'East', 'West', 'North'], answer: 1, explanation: 'Clockwise from North goes to East.', topic: 'direction-sense' },
  { q: 'What is the smallest prime number?', options: ['0', '1', '2', '3'], answer: 2, explanation: 'The smallest prime number is 2.', topic: 'primes' },
  { q: 'What is 15 - 23?', options: ['8', '-8', '38', '-38'], answer: 1, explanation: '15 - 23 = -8.', topic: 'integers' },
  { q: 'The sum of two odd numbers is always:', options: ['Odd', 'Even', 'Prime', 'Can be either'], answer: 1, explanation: 'Odd + Odd = Even. Example: 3 + 5 = 8.', topic: 'even-odd' },
  { q: 'What is the LCM of 4 and 6?', options: ['10', '12', '24', '2'], answer: 1, explanation: 'LCM(4,6) = 12.', topic: 'hcf-lcm' },
  { q: 'Which number is divisible by 9?', options: ['123', '234', '369', '456'], answer: 2, explanation: '3+6+9=18, which is divisible by 9, so 369 is divisible by 9.', topic: 'divisibility' },
  { q: 'What is 3/5 as a decimal?', options: ['0.3', '0.6', '0.35', '0.53'], answer: 1, explanation: '3/5 = 0.6.', topic: 'decimals' },
  { q: 'What is 100 in hexadecimal?', options: ['64', '100', 'FF', 'A0'], answer: 0, explanation: '100 = 6 x 16 + 4 = 64 in hexadecimal.', topic: 'bases' },
  { q: 'The additive identity is:', options: ['1', '0', '-1', 'It does not exist'], answer: 1, explanation: 'The additive identity is 0 because a + 0 = a.', topic: 'properties' },
  { q: 'What is the remainder when 29 is divided by 6?', options: ['0', '1', '2', '5'], answer: 3, explanation: '29 = 6 x 4 + 5. The remainder is 5.', topic: 'remainders' },
  { q: 'What is the unit digit of 9 squared?', options: ['9', '81', '1', '18'], answer: 2, explanation: '9 x 9 = 81. The unit digit is 1.', topic: 'unit-digit' },
  { q: 'Which of these is irrational?', options: ['1/2', '0.333...', 'sqrt(3)', '22/7'], answer: 2, explanation: 'sqrt(3) cannot be expressed as a fraction of two integers.', topic: 'explorer' },
  { q: 'Morning shadows fall towards the:', options: ['East', 'West', 'North', 'South'], answer: 1, explanation: 'In the morning, the sun is in the east, so shadows fall towards the west.', topic: 'direction-sense' },
  { q: 'What is 2 to the power of 5?', options: ['16', '32', '64', '128'], answer: 1, explanation: '2^5 = 2 x 2 x 2 x 2 x 2 = 32.', topic: 'natural' },
  { q: 'What is 5/6 - 1/6?', options: ['4/6', '2/3', 'Both are correct', '4/12'], answer: 2, explanation: '5/6 - 1/6 = 4/6 = 2/3. Both are correct.', topic: 'fractions' },
  { q: 'A number divisible by both 2 and 3 must be divisible by:', options: ['5', '6', '12', '8'], answer: 1, explanation: 'If divisible by 2 and 3, the number is divisible by 6.', topic: 'divisibility' }
];
