import { motion } from 'framer-motion';
import { curriculum } from '../../curriculum';

export default function ModulePage({ subjectId, moduleId, onNavigate }) {
  const subject = curriculum.subjects.find(s => s.id === subjectId);
  const mod = subject?.modules.find(m => m.id === moduleId);

  if (!mod) {
    return (
      <div className="module-page">
        <p>Module not found.</p>
      </div>
    );
  }

  const topics = mod.topics.filter(t => t.route);

  return (
    <motion.div
      className="module-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="module-page-header">
        <button className="back-button" onClick={() => onNavigate?.('home')} title="Back to Home">
          ← Home
        </button>
        <div className="module-page-info">
          <span className="module-icon-large">{mod.icon}</span>
          <div>
            <h1 className="module-page-title">{mod.title}</h1>
            <p className="module-page-description">{mod.description}</p>
            <span className="module-count">{topics.length} topics</span>
          </div>
        </div>
      </div>

      <div className="module-topics-grid">
        {topics.map((topic, i) => (
          <motion.button
            key={topic.id}
            className="module-topic-card"
            onClick={() => onNavigate?.(topic.route)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.02, y: -2 }}
          >
            <span className="topic-card-icon">{topic.icon}</span>
            <h3 className="topic-card-title">{topic.title}</h3>
            <p className="topic-card-desc">{topic.description}</p>
            <div className="topic-card-footer">
              {topic.difficulty && (
                <span className={`difficulty-badge difficulty-${topic.difficulty}`}>
                  {topic.difficulty}
                </span>
              )}
            </div>
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
}
