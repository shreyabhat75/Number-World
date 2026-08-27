import { useState, useCallback } from 'react';
import Layout from './components/Layout/Layout';
import StudentLogin from './pages/StudentLogin';
import Home from './pages/Home';
import NumberExplorer from './pages/NumberExplorer';
import NaturalNumbers from './pages/NaturalNumbers';
import EvenOdd from './pages/EvenOdd';
import Integers from './pages/Integers';
import PrimeNumbers from './pages/PrimeNumbers';
import PrimeFactorTreePage from './pages/PrimeFactorTreePage';
import FractionsDecimals from './pages/FractionsDecimals';
import DivisibilityRules from './pages/DivisibilityRules';
import QuizPage from './pages/QuizPage';
import Achievements from './pages/Achievements';
import Settings from './pages/Settings';
import MyProgress from './pages/MyProgress';
import ClassProgress from './pages/ClassProgress';
import Confetti from './components/Confetti/Confetti';
import { StudentProvider, useStudent } from './context/StudentContext';
import { ACHIEVEMENTS } from './data/achievements';
import { playCorrectSound, playWrongSound, playAchievementSound } from './utils/sound';

const SETTINGS_KEY = 'numberWorldSettings';
const DEFAULT_SETTINGS = { soundEffects: true, animations: true, reducedMotion: false };

function loadSettings() {
  try {
    const saved = JSON.parse(localStorage.getItem(SETTINGS_KEY));
    return saved ? { ...DEFAULT_SETTINGS, ...saved } : DEFAULT_SETTINGS;
  } catch {
    return DEFAULT_SETTINGS;
  }
}

function AppInner() {
  const {
    currentStudent, loading, error, isOnline,
    studentAchievements, quizProgress, divProgress, treeProgress, topicProgressList,
    addXP, updateStreak, recordQuizResult, updateTopicProgress,
    completeDivRule, completeTree, unlockAchievement, checkAndUnlockAchievements,
    recordAct, resetProgress, deleteStudent, logout,
  } = useStudent();

  const [currentPage, setCurrentPage] = useState('home');
  const [confettiActive, setConfettiActive] = useState(false);
  const [newAchievements, setNewAchievements] = useState([]);
  const [fractionsBuilt, setFractionsBuilt] = useState(0);
  const [settings, setSettings] = useState(loadSettings);

  const handleNavigate = useCallback((page) => setCurrentPage(page), []);

  const handleExplore = useCallback(async (n) => {
    if (!currentStudent) return;
    if (isOnline) {
      await updateTopicProgress('explorer', true, 1, 5);
    }
    await addXP(5);
    const achievementXP = 0;
    const newlyUnlocked = await checkAndUnlockAchievements({
      numbersExplored: [n],
    });
    if (newlyUnlocked.length > 0) {
      setNewAchievements(prev => [...prev, ...newlyUnlocked]);
      setConfettiActive(true);
      for (const a of newlyUnlocked) await addXP(a.xp);
    }
  }, [currentStudent, isOnline, addXP, updateTopicProgress, checkAndUnlockAchievements]);

  const handleFractionBuild = useCallback(async () => {
    if (!currentStudent) return;
    const newCount = fractionsBuilt + 1;
    setFractionsBuilt(newCount);
    if (newCount % 5 === 0) {
      await addXP(3);
      const newlyUnlocked = await checkAndUnlockAchievements({ fractionsBuilt: newCount });
      if (newlyUnlocked.length > 0) {
        setNewAchievements(prev => [...prev, ...newlyUnlocked]);
        setConfettiActive(true);
        for (const a of newlyUnlocked) await addXP(a.xp);
      }
    }
  }, [currentStudent, fractionsBuilt, addXP, checkAndUnlockAchievements]);

  const handleTreeComplete = useCallback(async (result) => {
    if (!currentStudent) return;
    await addXP(result.xp || 25);
    await completeTree(result.number);
    setConfettiActive(true);
    const newlyUnlocked = await checkAndUnlockAchievements({
      treesCompleted: (treeProgress?.trees_completed || 0) + 1,
    });
    if (newlyUnlocked.length > 0) {
      setNewAchievements(prev => [...prev, ...newlyUnlocked]);
      for (const a of newlyUnlocked) await addXP(a.xp);
    }
  }, [currentStudent, addXP, completeTree, checkAndUnlockAchievements, treeProgress]);

  const handleQuizCorrect = useCallback(async () => {
    if (!currentStudent) return;
    if (settings.soundEffects) playCorrectSound();
    await addXP(10);
    await updateStreak(true);
    await recordQuizResult(true);
    setConfettiActive(true);
    const newlyUnlocked = await checkAndUnlockAchievements({
      bestStreak: (currentStudent.best_streak || 0) + 1,
      totalCorrect: (quizProgress?.correct_answers || 0) + 1,
      totalAnswered: (quizProgress?.questions_attempted || 0) + 1,
    });
    if (newlyUnlocked.length > 0) {
      if (settings.soundEffects) playAchievementSound();
      setNewAchievements(prev => [...prev, ...newlyUnlocked]);
      for (const a of newlyUnlocked) await addXP(a.xp);
    }
  }, [currentStudent, addXP, updateStreak, recordQuizResult, checkAndUnlockAchievements, quizProgress, settings.soundEffects]);

  const handleQuizWrong = useCallback(async () => {
    if (!currentStudent) return;
    if (settings.soundEffects) playWrongSound();
    await updateStreak(false);
    await recordQuizResult(false);
  }, [currentStudent, updateStreak, recordQuizResult, settings.soundEffects]);

  const handleDailyComplete = useCallback(async () => {
    if (!currentStudent) return;
    await addXP(25);
    setConfettiActive(true);
    if (isOnline) {
      await recordAct('quiz', 'daily-challenge', 100, 25, { date: new Date().toISOString() });
    }
  }, [currentStudent, addXP, isOnline, recordAct]);

  const handleSettingsChange = useCallback(async (newSettings) => {
    setSettings(newSettings);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
    if (isOnline && currentStudent) {
      await recordAct('settings', 'change', 100, 0, newSettings);
    }
  }, [isOnline, currentStudent, recordAct]);

  const handleResetProgress = useCallback(async () => {
    await resetProgress();
  }, [resetProgress]);

  const handleLogout = useCallback(() => {
    logout();
    setCurrentPage('home');
  }, [logout]);

  if (loading) {
    return (
      <div className="app-loading">
        <div className="loading-spinner" />
        <p>Loading Number World...</p>
      </div>
    );
  }

  if (!currentStudent) {
    return <StudentLogin />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <Home onNavigate={handleNavigate} xp={currentStudent.xp} level={currentStudent.level} onDailyComplete={handleDailyComplete} dailyCompleted={false} />;
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
      case 'fractions':
        return <FractionsDecimals onBuild={handleFractionBuild} />;
      case 'divisibility':
        return <DivisibilityRules onExplore={handleExplore} />;
      case 'factor-tree':
        return <PrimeFactorTreePage onTreeComplete={handleTreeComplete} />;
      case 'quiz':
        return <QuizPage onCorrect={handleQuizCorrect} onWrong={handleQuizWrong} />;
      case 'achievements':
        return <Achievements unlockedAchievements={studentAchievements} />;
      case 'my-progress':
        return <MyProgress />;
      case 'class-progress':
        return <ClassProgress />;
      case 'settings':
        return <Settings settings={settings} onSettingsChange={handleSettingsChange} onResetProgress={handleResetProgress} onLogout={handleLogout} />;
      default:
        return <Home onNavigate={handleNavigate} xp={currentStudent.xp} level={currentStudent.level} onDailyComplete={handleDailyComplete} dailyCompleted={false} />;
    }
  };

  return (
    <>
      <Layout
        currentPage={currentPage}
        onNavigate={handleNavigate}
        xp={currentStudent.xp}
        level={currentStudent.level}
        settings={settings}
        student={currentStudent}
        onLogout={handleLogout}
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

export default function App() {
  return (
    <StudentProvider>
      <AppInner />
    </StudentProvider>
  );
}
