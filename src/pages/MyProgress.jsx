import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useStudent } from '../context/StudentContext';
import { getLevelTitle, getXPToNextLevel } from '../utils/storage';
import { ACHIEVEMENTS } from '../data/achievements';
import { getAllStudents } from '../services/studentService';
import { isSupabaseConfigured } from '../lib/supabase';

export default function MyProgress() {
  const { currentStudent, quizProgress, divProgress, treeProgress, topicProgressList, studentAchievements } = useStudent();

  if (!currentStudent) return null;

  const level = currentStudent.level || 1;
  const xp = currentStudent.xp || 0;
  const title = getLevelTitle(level);
  const { current, needed } = getXPToNextLevel(xp, level);
  const xpPercent = needed > 0 ? Math.min((current / needed) * 100, 100) : 100;

  const accuracy = quizProgress && quizProgress.questions_attempted > 0
    ? Math.round((quizProgress.correct_answers / quizProgress.questions_attempted) * 100)
    : 0;

  const divMastered = divProgress
    ? [2, 3, 4, 5, 6, 7, 8, 9, 10].filter(d => divProgress[`rule_${d}`]).length
    : 0;

  const unlockedCount = studentAchievements.length;

  const topicNames = {
    natural: 'Natural Numbers', even_odd: 'Even & Odd', integers: 'Integers',
    primes: 'Prime Numbers', divisibility: 'Divisibility', quiz: 'Quizzes',
  };

  return (
    <div className="progress-page">
      <motion.div className="page-header" initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}>
        <h1>📊 My Progress</h1>
        <p>Track your Number World adventure!</p>
      </motion.div>

      <div className="progress-profile">
        <motion.div className="profile-avatar" animate={{ y: [0, -4, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          {currentStudent.avatar}
        </motion.div>
        <h2>{currentStudent.name}</h2>
        <p className="profile-level">Level {level} — {title}</p>
      </div>

      <div className="progress-stats-grid">
        <div className="stat-card">
          <span className="stat-icon">⭐</span>
          <span className="stat-value">{xp}</span>
          <span className="stat-label">Total XP</span>
          <div className="stat-bar"><div className="stat-bar-fill" style={{ width: `${xpPercent}%` }} /></div>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🔥</span>
          <span className="stat-value">{currentStudent.streak || 0}</span>
          <span className="stat-label">Current Streak</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🎯</span>
          <span className="stat-value">{accuracy}%</span>
          <span className="stat-label">Quiz Accuracy</span>
        </div>
        <div className="stat-card">
          <span className="stat-icon">🏆</span>
          <span className="stat-value">{unlockedCount}/{ACHIEVEMENTS.length}</span>
          <span className="stat-label">Achievements</span>
        </div>
      </div>

      <section className="progress-section">
        <h3>📐 Divisibility Rules</h3>
        <div className="div-progress-grid">
          {[2, 3, 4, 5, 6, 7, 8, 9, 10].map(d => {
            const done = divProgress?.[`rule_${d}`] || false;
            return (
              <div key={d} className={`div-rule-badge ${done ? 'mastered' : ''}`}>
                {done ? '✓' : '○'} ÷{d}
              </div>
            );
          })}
        </div>
        <p className="progress-detail">{divMastered}/9 rules mastered</p>
      </section>

      <section className="progress-section">
        <h3>🌳 Prime Factor Trees</h3>
        <div className="progress-detail">
          Trees completed: <strong>{treeProgress?.trees_completed || 0}</strong>
        </div>
        {treeProgress?.numbers_mastered?.length > 0 && (
          <div className="mastered-numbers">
            Numbers mastered: {treeProgress.numbers_mastered.join(', ')}
          </div>
        )}
      </section>

      <section className="progress-section">
        <h3>📝 Quiz Statistics</h3>
        <div className="quiz-stats-row">
          <div className="quiz-stat">
            <span>{quizProgress?.questions_attempted || 0}</span>
            <label>Attempted</label>
          </div>
          <div className="quiz-stat">
            <span>{quizProgress?.correct_answers || 0}</span>
            <label>Correct</label>
          </div>
          <div className="quiz-stat">
            <span>{quizProgress?.best_streak || 0}</span>
            <label>Best Streak</label>
          </div>
          <div className="quiz-stat">
            <span>{accuracy}%</span>
            <label>Accuracy</label>
          </div>
        </div>
      </section>

      <section className="progress-section">
        <h3>🏅 Achievements</h3>
        <div className="achievements-mini-grid">
          {ACHIEVEMENTS.map(a => (
            <div key={a.id} className={`achievement-mini ${studentAchievements.includes(a.id) ? 'unlocked' : ''}`}>
              <span>{studentAchievements.includes(a.id) ? a.icon : '🔒'}</span>
              <span className="ach-mini-title">{a.title}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
