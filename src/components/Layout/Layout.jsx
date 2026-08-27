import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import XPBar from '../XPBar/XPBar';

const NAV_ITEMS = [
  { key: 'home', icon: '🏠', label: 'Home' },
  { key: 'explorer', icon: '🔍', label: 'Number Explorer' },
  { key: 'natural', icon: '🌱', label: 'Natural & Whole' },
  { key: 'even-odd', icon: '🍎', label: 'Even & Odd' },
  { key: 'integers', icon: '➕➖', label: 'Integers' },
  { key: 'primes', icon: '⭐', label: 'Prime Numbers' },
  { key: 'divisibility', icon: '🔢', label: 'Divisibility Rules' },
  { key: 'factor-tree', icon: '🌳', label: 'Prime Factor Tree' },
  { key: 'quiz', icon: '🎮', label: 'Number Detective' },
  { key: 'achievements', icon: '🏆', label: 'Achievements' },
  { key: 'settings', icon: '⚙️', label: 'Settings' },
];

export default function Layout({ children, currentPage, onNavigate, xp, level, settings }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const prefersReduced = settings?.reducedMotion || false;

  return (
    <div className="app-layout">
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <span className="sidebar-logo">🌈</span>
          <span className="sidebar-title">Number World</span>
        </div>
        <nav className="sidebar-nav">
          {NAV_ITEMS.map(item => (
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
        {NAV_ITEMS.slice(0, 6).map(item => (
          <button
            key={item.key}
            className={`bottom-nav-item ${currentPage === item.key ? 'active' : ''}`}
            onClick={() => onNavigate(item.key)}
          >
            <span className="bottom-nav-icon">{item.icon}</span>
            <span className="bottom-nav-label">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
