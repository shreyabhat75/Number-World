import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStudent } from '../context/StudentContext';
import * as studentService from '../services/studentService';
import { isSupabaseConfigured } from '../lib/supabase';

export default function StudentLogin() {
  const { selectStudent, loading, error, isOnline } = useStudent();
  const [name, setName] = useState('');
  const [existingStudents, setExistingStudents] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOnline) {
      studentService.getAllStudents().then(setExistingStudents).catch(() => {});
    }
  }, [isOnline]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim() || submitting) return;
    setSubmitting(true);
    await selectStudent(name);
    setSubmitting(false);
  };

  const handleQuickSelect = async (studentName) => {
    setSubmitting(true);
    await selectStudent(studentName);
    setSubmitting(false);
  };

  return (
    <div className="student-login-page">
      <div className="login-background">
        {['1', '2', '3', '5', '7', '8', '11', '13'].map((n, i) => (
          <motion.span
            key={i}
            className="floating-number"
            style={{ left: `${8 + (i * 11) % 80}%`, top: `${5 + (i * 14) % 55}%` }}
            animate={{ y: [0, -15, 0], opacity: [0.08, 0.15, 0.08], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 4 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
          >
            {n}
          </motion.span>
        ))}
      </div>

      <motion.div
        className="login-card"
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <motion.div
          className="login-logo"
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          🌈
        </motion.div>
        <h1 className="login-title">NUMBER WORLD</h1>
        <p className="login-subtitle">Your numbers. Your adventure. Your progress. 🚀</p>

        <div className="login-mascot-row">
          <motion.span
            className="login-mascot"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            👋
          </motion.span>
          <span className="login-greeting">Who's learning today?</span>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <input
            type="text"
            className="login-input"
            placeholder="Enter your name"
            value={name}
            onChange={e => setName(e.target.value)}
            autoFocus
            disabled={submitting}
          />
          <motion.button
            type="submit"
            className="login-btn"
            disabled={!name.trim() || submitting}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {submitting ? '🔄 Loading...' : "Let's Go 🚀"}
          </motion.button>
        </form>

        {error && (
          <motion.p className="login-error" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            {error}
          </motion.p>
        )}

        {!isOnline && (
          <motion.p className="login-offline" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            ⚡ Offline mode — progress saves locally
          </motion.p>
        )}

        {existingStudents.length > 0 && (
          <div className="login-existing">
            <p className="existing-label">Or pick your profile:</p>
            <div className="existing-grid">
              {existingStudents.slice(0, 8).map(s => (
                <motion.button
                  key={s.id}
                  className="existing-student-btn"
                  onClick={() => handleQuickSelect(s.name)}
                  whileHover={{ scale: 1.05, y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  disabled={submitting}
                >
                  <span className="existing-avatar">{s.avatar}</span>
                  <span className="existing-name">{s.name}</span>
                  <span className="existing-xp">⭐ {s.xp} XP</span>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );
}
