import { useState, useCallback } from 'react';
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import NumberExplorer from './pages/NumberExplorer';
import NaturalNumbers from './pages/NaturalNumbers';
import EvenOdd from './pages/EvenOdd';
import Integers from './pages/Integers';
import PrimeNumbers from './pages/PrimeNumbers';
import PrimeFactorTreePage from './pages/PrimeFactorTreePage';
import DivisibilityRules from './pages/DivisibilityRules';
import QuizPage from './pages/QuizPage';
import Achievements from './pages/Achievements';
import Settings from './pages/Settings';
import Confetti from './components/Confetti/Confetti';
import { getProgress, saveState, addXP, clearAllState } from './utils/storage';
import { checkAchievements } from './data/achievements';

export default function App() {
  const [progress, setProgress] = useState(() => getProgress());
  const [currentPage, setCurrentPage] = useState('home');
  const [confettiActive, setConfettiActive] = useState(false);
  const [newAchievements, setNewAchievements] = useState([]);

  const persistProgress = useCallback((updates) => {
    setProgress(prev => {
      const next = { ...prev, ...updates };
      Object.entries(updates).forEach(([key, value]) => {
        saveState(key, value);
      });
      return next;
    });
  }, []);

  const handleNavigate = useCallback((page) => {
    setCurrentPage(page);
  }, []);

  const handleExplore = useCallback((n) => {
    const explored = progress.numbersExplored || [];
    if (!explored.includes(n)) {
      const newExplored = [...explored, n];
      const newXP = addXP(5);
      persistProgress({
        numbersExplored: newExplored,
        xp: newXP.xp,
        level: newXP.level,
      });
      const { newlyUnlocked } = checkAchievements({ ...progress, numbersExplored: newExplored, xp: newXP.xp, level: newXP.level });
      if (newlyUnlocked.length > 0) {
        setNewAchievements(prev => [...prev, ...newlyUnlocked]);
        setConfettiActive(true);
        const achievementXP = newlyUnlocked.reduce((sum, a) => sum + a.xp, 0);
        const finalXP = addXP(achievementXP);
        persistProgress({ xp: finalXP.xp, level: finalXP.level, achievements: [...(progress.achievements || []), ...newlyUnlocked.map(a => a.id)] });
      }
    }
  }, [progress, persistProgress]);

  const handleQuizCorrect = useCallback(() => {
    const newXP = addXP(10);
    const newStreak = (progress.bestStreak || 0) + 1;
    const newTotalCorrect = (progress.totalCorrect || 0) + 1;
    const newTotalAnswered = (progress.totalAnswered || 0) + 1;
    persistProgress({
      xp: newXP.xp,
      level: newXP.level,
      bestStreak: Math.max(progress.bestStreak || 0, newStreak),
      totalCorrect: newTotalCorrect,
      totalAnswered: newTotalAnswered,
    });
    setConfettiActive(true);
    const { newlyUnlocked } = checkAchievements({ ...progress, bestStreak: newStreak, totalCorrect: newTotalCorrect, totalAnswered: newTotalAnswered, xp: newXP.xp, level: newXP.level });
    if (newlyUnlocked.length > 0) {
      setNewAchievements(prev => [...prev, ...newlyUnlocked]);
      const achievementXP = newlyUnlocked.reduce((sum, a) => sum + a.xp, 0);
      const finalXP = addXP(achievementXP);
      persistProgress({ xp: finalXP.xp, level: finalXP.level, achievements: [...(progress.achievements || []), ...newlyUnlocked.map(a => a.id)] });
    }
  }, [progress, persistProgress]);

  const handleQuizWrong = useCallback(() => {
    persistProgress({
      totalAnswered: (progress.totalAnswered || 0) + 1,
    });
  }, [progress, persistProgress]);

  const handleDailyComplete = useCallback(() => {
    const newXP = addXP(25);
    persistProgress({
      xp: newXP.xp,
      level: newXP.level,
      dailyChallenges: (progress.dailyChallenges || 0) + 1,
    });
    setConfettiActive(true);
  }, [progress, persistProgress]);

  const handleSettingsChange = useCallback((newSettings) => {
    persistProgress({ settings: newSettings });
  }, [persistProgress]);

  const handleResetProgress = useCallback(() => {
    clearAllState();
    setProgress(getProgress());
  }, []);

  const handleTreeComplete = useCallback((result) => {
    const xp = result.xp || 25;
    const newXP = addXP(xp);
    persistProgress({ xp: newXP.xp, level: newXP.level, treesCompleted: (progress.treesCompleted || 0) + 1 });
    setConfettiActive(true);
    const { newlyUnlocked } = checkAchievements({ ...progress, treesCompleted: (progress.treesCompleted || 0) + 1, xp: newXP.xp, level: newXP.level });
    if (newlyUnlocked.length > 0) {
      setNewAchievements(prev => [...prev, ...newlyUnlocked]);
      const achievementXP = newlyUnlocked.reduce((sum, a) => sum + a.xp, 0);
      const finalXP = addXP(achievementXP);
      persistProgress({ xp: finalXP.xp, level: finalXP.level, achievements: [...(progress.achievements || []), ...newlyUnlocked.map(a => a.id)] });
    }
  }, [progress, persistProgress]);

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} xp={progress.xp} level={progress.level} onDailyComplete={handleDailyComplete} dailyCompleted={false} />;
      case 'explorer':
        return <NumberExplorer onExplore={handleExplore} />;
      case 'natural':
        return <NaturalNumbers />;
      case 'even-odd':
        return <EvenOdd />;
      case 'integers':
        return <Integers />;
      case 'primes':
        return <PrimeNumbers />;
      case 'divisibility':
        return <DivisibilityRules onExplore={handleExplore} />;
      case 'factor-tree':
        return <PrimeFactorTreePage onTreeComplete={handleTreeComplete} />;
      case 'quiz':
        return <QuizPage onCorrect={handleQuizCorrect} onWrong={handleQuizWrong} />;
      case 'achievements':
        return <Achievements unlockedAchievements={progress.achievements || []} />;
      case 'settings':
        return <Settings settings={progress.settings || { soundEffects: true, animations: true, reducedMotion: false }} onSettingsChange={handleSettingsChange} onResetProgress={handleResetProgress} />;
      default:
        return <Home onNavigate={handleNavigate} xp={progress.xp} level={progress.level} onDailyComplete={handleDailyComplete} dailyCompleted={false} />;
    }
  };

  return (
    <>
      <Layout
        currentPage={currentPage}
        onNavigate={handleNavigate}
        xp={progress.xp}
        level={progress.level}
        settings={progress.settings}
      >
        {renderPage()}
      </Layout>
      <Confetti active={confettiActive} onComplete={() => setConfettiActive(false)} />
      {newAchievements.length > 0 && (
        <div className="achievement-notification">
          {newAchievements.map((a, i) => (
            <div key={a.id} className="achievement-toast" style={{ animationDelay: `${i * 0.3}s` }}>
              <span className="toast-icon">{a.icon}</span>
              <div className="toast-text">
                <strong>Achievement Unlocked!</strong>
                <span>{a.title}</span>
              </div>
              <span className="toast-xp">+{a.xp} XP</span>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
