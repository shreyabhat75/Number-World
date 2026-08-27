import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { getAllStudents } from '../services/studentService';
import { getLevelTitle } from '../utils/storage';
import { isSupabaseConfigured } from '../lib/supabase';

export default function ClassProgress() {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('xp');
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    async function load() {
      if (!isSupabaseConfigured()) {
        setLoading(false);
        return;
      }
      const data = await getAllStudents();
      setStudents(data);
      setLoading(false);
    }
    load();
  }, []);

  const sorted = [...students].sort((a, b) => {
    if (sortBy === 'name') return a.name.localeCompare(b.name);
    if (sortBy === 'level') return (b.level || 0) - (a.level || 0);
    return (b.xp || 0) - (a.xp || 0);
  });

  const totalXP = students.reduce((sum, s) => sum + (s.xp || 0), 0);
  const avgLevel = students.length > 0 ? Math.round(students.reduce((sum, s) => sum + (s.level || 1), 0) / students.length) : 0;

  if (loading) {
    return (
      <div className="progress-page">
        <div className="loading-state">
          <motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity }}>🔄</motion.span>
          <p>Loading the class...</p>
        </div>
      </div>
    );
  }

  if (!isSupabaseConfigured()) {
    return (
      <div className="progress-page">
        <motion.div className="page-header" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
          <h1>📊 Class Progress</h1>
        </motion.div>
        <div className="offline-notice">
          <p>Connect to Supabase to view class progress across devices.</p>
          <p className="small">Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your .env file.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="progress-page">
      <motion.div className="page-header" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1>📊 Class Progress</h1>
        <p>See how everyone is doing!</p>
      </motion.div>

      <div className="class-stats-row">
        <div className="class-stat">
          <span className="class-stat-icon">👥</span>
          <span className="class-stat-val">{students.length}</span>
          <span className="class-stat-label">Students</span>
        </div>
        <div className="class-stat">
          <span className="class-stat-icon">⭐</span>
          <span className="class-stat-val">{totalXP.toLocaleString()}</span>
          <span className="class-stat-label">Total XP</span>
        </div>
        <div className="class-stat">
          <span className="class-stat-icon">📈</span>
          <span className="class-stat-val">Level {avgLevel}</span>
          <span className="class-stat-label">Avg Level</span>
        </div>
      </div>

      <div className="sort-controls">
        <span>Sort by:</span>
        {['xp', 'name', 'level'].map(s => (
          <button key={s} className={`sort-btn ${sortBy === s ? 'active' : ''}`} onClick={() => setSortBy(s)}>
            {s === 'xp' ? '⭐ XP' : s === 'name' ? '🔤 Name' : '📊 Level'}
          </button>
        ))}
      </div>

      <div className="class-student-list">
        {sorted.map((s, i) => (
          <motion.div
            key={s.id}
            className={`class-student-card ${selectedStudent === s.id ? 'expanded' : ''}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.04 }}
            onClick={() => setSelectedStudent(selectedStudent === s.id ? null : s.id)}
          >
            <div className="student-row">
              <span className="student-avatar">{s.avatar}</span>
              <span className="student-name">{s.name}</span>
              <span className="student-level">Lv.{s.level || 1}</span>
              <span className="student-xp">⭐ {s.xp || 0}</span>
              <span className="student-title">{getLevelTitle(s.level || 1)}</span>
            </div>
            {selectedStudent === s.id && (
              <motion.div
                className="student-detail"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
              >
                <p>🔥 Streak: {s.streak || 0} (Best: {s.best_streak || 0})</p>
                {s.last_activity?.topic && (
                  <p>📚 Last activity: {s.last_activity.topic} — {s.last_activity.activity || ''}</p>
                )}
                <p>📅 Joined: {new Date(s.created_at).toLocaleDateString()}</p>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>

      {students.length === 0 && (
        <div className="empty-state">
          <p>No students yet. Be the first to start learning!</p>
        </div>
      )}
    </div>
  );
}
