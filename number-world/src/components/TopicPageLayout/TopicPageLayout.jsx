import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import TopicPage from '../TopicPage/TopicPage';

const TABS = [
  { id: 'learn', icon: '📖', label: 'Learn' },
  { id: 'practice', icon: '✏️', label: 'Practice' },
  { id: 'quiz', icon: '🎯', label: 'Quiz' },
];

export default function TopicPageLayout({ topic, onBack, children, practiceContent, quizContent }) {
  const [activeTab, setActiveTab] = useState('learn');

  return (
    <TopicPage topic={topic} onBack={onBack}>
      <div className="tpl-tabs">
        {TABS.map(tab => (
          <button
            key={tab.id}
            className={`tpl-tab ${activeTab === tab.id ? 'tpl-tab-active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
          >
            {tab.icon} {tab.label}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === 'learn' && (
          <motion.div
            key="learn"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {children}
          </motion.div>
        )}
        {activeTab === 'practice' && (
          <motion.div
            key="practice"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {practiceContent}
          </motion.div>
        )}
        {activeTab === 'quiz' && (
          <motion.div
            key="quiz"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
          >
            {quizContent}
          </motion.div>
        )}
      </AnimatePresence>
    </TopicPage>
  );
}
