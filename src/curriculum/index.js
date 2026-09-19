import { lazy } from 'react';

const NumberExplorer = lazy(() => import('../pages/NumberExplorer'));
const NaturalNumbers = lazy(() => import('../pages/NaturalNumbers'));
const EvenOdd = lazy(() => import('../pages/EvenOdd'));
const Integers = lazy(() => import('../pages/Integers'));
const PrimeNumbers = lazy(() => import('../pages/PrimeNumbers'));
const DivisibilityRules = lazy(() => import('../pages/DivisibilityRules'));
const PrimeFactorTreePage = lazy(() => import('../pages/PrimeFactorTreePage'));
const QuizPage = lazy(() => import('../pages/QuizPage'));
const HcfLcmPage = lazy(() => import('../pages/HcfLcmPage'));
const RemaindersPage = lazy(() => import('../pages/RemaindersPage'));
const UnitDigitPage = lazy(() => import('../pages/UnitDigitPage'));
const PropertiesPage = lazy(() => import('../pages/PropertiesPage'));
const FractionsPage = lazy(() => import('../pages/FractionsPage'));
const DecimalsPage = lazy(() => import('../pages/DecimalsPage'));
const BasesPage = lazy(() => import('../pages/BasesPage'));

export const curriculum = {
  id: 'aptify',
  title: 'Aptify',
  tagline: 'Learn. Visualize. Practice. Master.',
  subjects: [
    {
      id: 'aptitude',
      title: 'Aptitude',
      icon: '📐',
      color: '#8b5cf6',
      modules: [
        {
          id: 'number-system',
          title: 'Number System',
          icon: '🔢',
          color: '#3b82f6',
          description: 'Master the fundamentals of numbers.',
          topics: [
            {
              id: 'explorer',
              title: 'Number Explorer',
              icon: '🔍',
              order: 0,
              difficulty: 'beginner',
              description: 'Explore any number and discover its properties.',
              route: 'explorer',
              component: NumberExplorer,
              type: 'interactive',
            },
            {
              id: 'natural',
              title: 'Number Basics & Types',
              icon: '🌱',
              order: 1,
              difficulty: 'beginner',
              description: 'Natural numbers, whole numbers, integers, and more.',
              route: 'natural',
              component: NaturalNumbers,
              type: 'learn',
            },
            {
              id: 'even-odd',
              title: 'Even & Odd',
              icon: '🍎',
              order: 2,
              difficulty: 'beginner',
              description: 'Can you pair them all?',
              route: 'even-odd',
              component: EvenOdd,
              type: 'interactive',
            },
            {
              id: 'integers',
              title: 'Integers',
              icon: '➕➖',
              order: 3,
              difficulty: 'beginner',
              description: 'Explore both sides of zero!',
              route: 'integers',
              component: Integers,
              type: 'interactive',
            },
            {
              id: 'primes',
              title: 'Prime Numbers',
              icon: '⭐',
              order: 4,
              difficulty: 'intermediate',
              description: 'Meet the special numbers!',
              route: 'primes',
              component: PrimeNumbers,
              type: 'learn',
            },
            {
              id: 'divisibility',
              title: 'Divisibility Rules',
              icon: '✂️',
              order: 5,
              difficulty: 'intermediate',
              description: 'Quick tricks to check divisibility by 2–10.',
              route: 'divisibility',
              component: DivisibilityRules,
              type: 'interactive',
            },
            {
              id: 'factor-tree',
              title: 'Prime Factor Tree',
              icon: '🌳',
              order: 6,
              difficulty: 'intermediate',
              description: 'Grow numbers into their prime factors!',
              route: 'factor-tree',
              component: PrimeFactorTreePage,
              type: 'interactive',
            },
            {
              id: 'hcf-lcm',
              title: 'HCF & LCM',
              icon: '🤝',
              order: 7,
              difficulty: 'intermediate',
              description: 'Find the Highest Common Factor and Least Common Multiple.',
              route: 'hcf-lcm',
              component: HcfLcmPage,
              type: 'interactive',
            },
            {
              id: 'remainders',
              title: 'Remainders',
              icon: '➗',
              order: 8,
              difficulty: 'intermediate',
              description: 'Division, remainders, and the remainder formula.',
              route: 'remainders',
              component: RemaindersPage,
              type: 'interactive',
            },
            {
              id: 'unit-digit',
              title: 'Unit Digit',
              icon: '🎯',
              order: 9,
              difficulty: 'advanced',
              description: 'Patterns in the last digit of powers.',
              route: 'unit-digit',
              component: UnitDigitPage,
              type: 'interactive',
            },
            {
              id: 'properties',
              title: 'Properties of Numbers',
              icon: '📏',
              order: 10,
              difficulty: 'beginner',
              description: 'Commutative, associative, distributive, and more.',
              route: 'properties',
              component: PropertiesPage,
              type: 'learn',
            },
            {
              id: 'fractions',
              title: 'Fractions',
              icon: '🍕',
              order: 11,
              difficulty: 'intermediate',
              description: 'Parts of a whole — visual fraction models.',
              route: 'fractions',
              component: FractionsPage,
              type: 'interactive',
            },
            {
              id: 'decimals',
              title: 'Decimals',
              icon: '🔸',
              order: 12,
              difficulty: 'intermediate',
              description: 'Decimal place value, operations, and conversions.',
              route: 'decimals',
              component: DecimalsPage,
              type: 'interactive',
            },
            {
              id: 'bases',
              title: 'Number Bases',
              icon: '💻',
              order: 13,
              difficulty: 'advanced',
              description: 'Binary, octal, hexadecimal — how numbers work in different bases.',
              route: 'bases',
              component: BasesPage,
              type: 'interactive',
            },
          ],
        },
        {
          id: 'arithmetic',
          title: 'Arithmetic',
          icon: '🧮',
          color: '#10b981',
          description: 'Percentages, ratios, averages, and more.',
          topics: [],
          status: 'coming-soon',
        },
      ],
    },
    {
      id: 'reasoning',
      title: 'Reasoning',
      icon: '🧠',
      color: '#ec4899',
      modules: [
        {
          id: 'logical-reasoning',
          title: 'Logical Reasoning',
          icon: '🧩',
          color: '#f59e0b',
          description: 'Coding-decoding, series, analogies, and puzzles.',
          topics: [],
          status: 'coming-soon',
        },
      ],
    },
  ],
};

export function getAllTopics() {
  const topics = [];
  for (const subject of curriculum.subjects) {
    for (const mod of subject.modules) {
      for (const topic of mod.topics) {
        topics.push({ ...topic, subjectId: subject.id, moduleId: mod.id, subjectTitle: subject.title, moduleTitle: mod.title });
      }
    }
  }
  return topics;
}

export function getTopicByRoute(route) {
  return getAllTopics().find(t => t.route === route);
}

export function getModuleTopics(moduleId) {
  const topics = [];
  for (const subject of curriculum.subjects) {
    for (const mod of subject.modules) {
      if (mod.id === moduleId) {
        for (const topic of mod.topics) {
          topics.push({ ...topic, subjectId: subject.id, moduleId: mod.id });
        }
      }
    }
  }
  return topics;
}

export function getNavSections() {
  const sections = [];
  for (const subject of curriculum.subjects) {
    const modules = [];
    for (const mod of subject.modules) {
      if (mod.topics.length > 0) {
        modules.push(mod);
      } else if (mod.status === 'coming-soon') {
        modules.push(mod);
      }
    }
    sections.push({ ...subject, modules });
  }
  return sections;
}
