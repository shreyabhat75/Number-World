import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import XPBar from '../XPBar/XPBar';
import { getNavSections } from '../../curriculum';

const NAV_SECTIONS = getNavSections();

const TOP_NAV = [
  { key: 'home', icon: '🏠', label: 'Home' },
];

const BOTTOM_NAV = [
  { key: 'quiz', icon: '🎮', label: 'Number Detective' },
  { key: 'achievements', icon: '🏆', label: 'Achievements' },
  { key: 'settings', icon: '⚙️', label: 'Settings' },
];

function isActiveRoute(currentPage, route) {
  return currentPage === route;
}

export default function Layout({ children, currentPage, onNavigate, xp, level, settings }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const prefersReduced = settings?.reducedMotion || false;

  return (
    <div className="app-layout">
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span className="sidebar-logo">🌈</span>
          <span className="sidebar-title">APTIFY</span>
        </div>

        <nav className="sidebar-nav">
          {TOP_NAV.map(item => (
            <button
              key={item.key}
              className={`nav-item ${currentPage === item.key ? 'active' : ''}`}
              onClick={() => { onNavigate(item.key); setSidebarOpen(false); }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {currentPage === item.key && (
                <motion.div className="nav-indicator" layoutId="navIndicator" />
              )}
            </button>
          ))}

          {NAV_SECTIONS.map(subject => (
            <div key={subject.id} className="nav-section">
              <div className="nav-section-title">{subject.title}</div>
              {subject.modules.map(mod => (
                <div key={mod.id} className="nav-module">
                  {mod.topics.length > 0 ? (
                    mod.topics
                      .filter(t => t.route)
                      .sort((a, b) => (a.order || 0) - (b.order || 0))
                      .map(topic => (
                        <button
                          key={topic.id}
                          className={`nav-item nav-item-topic ${isActiveRoute(currentPage, topic.route) ? 'active' : ''}`}
                          onClick={() => { onNavigate(topic.route); setSidebarOpen(false); }}
                        >
                          <span className="nav-icon">{topic.icon}</span>
                          <span className="nav-label">{topic.title}</span>
                          {isActiveRoute(currentPage, topic.route) && (
                            <motion.div className="nav-indicator" layoutId="navIndicator" />
                          )}
                        </button>
                      ))
                  ) : (
                    <div className="nav-item nav-item-coming-soon">
                      <span className="nav-icon">{mod.icon}</span>
                      <span className="nav-label">{mod.title}</span>
                      <span className="coming-soon-badge">Soon</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ))}

          <div className="nav-divider" />

          {BOTTOM_NAV.map(item => (
            <button
              key={item.key}
              className={`nav-item ${currentPage === item.key ? 'active' : ''}`}
              onClick={() => { onNavigate(item.key); setSidebarOpen(false); }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {currentPage === item.key && (
                <motion.div className="nav-indicator" layoutId="navIndicator" />
              )}
            </button>
          ))}
        </nav>

        <div className="sidebar-footer">
          <XPBar xp={xp} level={level} />
        </div>
      </aside>

      <button className="mobile-menu-btn" onClick={() => setSidebarOpen(!sidebarOpen)}>
        {sidebarOpen ? '✕' : '☰'}
      </button>

      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="sidebar-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <main className="main-content">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={prefersReduced ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={prefersReduced ? { opacity: 1 } : { opacity: 0, y: -12 }}
            transition={{ duration: prefersReduced ? 0 : 0.25 }}
            className="page-content"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>

      <nav className="bottom-nav">
        {[TOP_NAV[0], ...NAV_SECTIONS.flatMap(s => s.modules.flatMap(m => m.topics.filter(t => t.route).sort((a, b) => (a.order || 0) - (b.order || 0)).slice(0, 2))), BOTTOM_NAV[0]].slice(0, 6).map(item => (
          <button
            key={item.key || item.route}
            className={`bottom-nav-item ${currentPage === (item.key || item.route) ? 'active' : ''}`}
            onClick={() => onNavigate(item.key || item.route)}
          >
            <span className="bottom-nav-icon">{item.icon}</span>
            <span className="bottom-nav-label">{item.label || item.title}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
