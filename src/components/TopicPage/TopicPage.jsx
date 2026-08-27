import { Suspense } from 'react';
import { motion } from 'framer-motion';

const DIFFICULTY_COLORS = {
  beginner: '#10b981',
  intermediate: '#f59e0b',
  advanced: '#ef4444',
};

const TYPE_LABELS = {
  interactive: '🎮 Interactive',
  learn: '📖 Learn',
  challenge: '🏆 Challenge',
};

export default function TopicPage({ topic, onBack, children }) {
  const diffColor = DIFFICULTY_COLORS[topic.difficulty] || '#6b7280';

  return (
    <motion.div
      className="topic-page"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="topic-page-header">
        <button className="back-button" onClick={() => onBack?.()} title="Go back">
          ← Back
        </button>
        <div className="topic-page-meta">
          <span className="topic-icon-large">{topic.icon}</span>
          <div className="topic-page-info">
            <h1 className="topic-page-title">{topic.title}</h1>
            <p className="topic-page-description">{topic.description}</p>
            <div className="topic-page-tags">
              {topic.difficulty && (
                <span className="topic-tag" style={{ backgroundColor: diffColor }}>
                  {topic.difficulty}
                </span>
              )}
              {topic.type && (
                <span className="topic-tag topic-tag-type">
                  {TYPE_LABELS[topic.type] || topic.type}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="topic-page-content">
        <Suspense
          fallback={
            <div className="topic-loading">
              <div className="loading-spinner" />
              <p>Loading topic...</p>
            </div>
          }
        >
          {children}
        </Suspense>
      </div>
    </motion.div>
  );
}
