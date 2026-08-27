import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { getRecentActivityDates } from '../../services/divisibilityService';

const DAY_MS = 24 * 60 * 60 * 1000;

function toDateKey(date) {
  return date.toISOString().slice(0, 10);
}

function buildLastNDays(n) {
  const days = [];
  const today = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const d = new Date(today.getTime() - i * DAY_MS);
    days.push(d);
  }
  return days;
}

export default function StreakCalendar({ studentId, isOnline, currentStreak = 0, bestStreak = 0 }) {
  const [activeDates, setActiveDates] = useState(new Set());
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      if (!isOnline || !studentId) {
        setLoading(false);
        return;
      }
      const dates = await getRecentActivityDates(studentId, 30);
      if (!cancelled) {
        setActiveDates(new Set(dates));
        setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [studentId, isOnline]);

  const days = buildLastNDays(30);
  const todayKey = toDateKey(new Date());

  return (
    <section className="progress-section streak-calendar-section">
      <h3>🔥 Activity Streak</h3>
      <div className="streak-stats-row">
        <div className="streak-stat">
          <span className="streak-stat-value">{currentStreak}</span>
          <span className="streak-stat-label">Current Streak</span>
        </div>
        <div className="streak-stat">
          <span className="streak-stat-value">{bestStreak}</span>
          <span className="streak-stat-label">Best Streak</span>
        </div>
      </div>

      {!isOnline ? (
        <p className="progress-detail">Connect to save daily activity history and track your streak calendar.</p>
      ) : loading ? (
        <p className="progress-detail">Loading activity history...</p>
      ) : (
        <div className="streak-calendar-grid">
          {days.map((d, i) => {
            const key = toDateKey(d);
            const isActive = activeDates.has(key);
            const isToday = key === todayKey;
            return (
              <motion.div
                key={key}
                className={`streak-day ${isActive ? 'active' : ''} ${isToday ? 'today' : ''}`}
                title={d.toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.01 }}
              >
                {isActive ? '🔥' : d.getDate()}
              </motion.div>
            );
          })}
        </div>
      )}
    </section>
  );
}
