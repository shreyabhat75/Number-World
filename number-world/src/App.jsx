import { useState, useCallback, Suspense, lazy, useMemo } from 'react';
import Layout from './components/Layout/Layout';
import TopicPageLayout from './components/TopicPageLayout/TopicPageLayout';
import Home from './pages/Home';
import Achievements from './pages/Achievements';
import Settings from './pages/Settings';
import Confetti from './components/Confetti/Confetti';
import Practice from './components/Practice/Practice';
import TopicQuiz from './components/TopicQuiz/TopicQuiz';
import { getProgress, saveState, addXP, clearAllState, loadState } from './utils/storage';
import { checkAchievements } from './data/achievements';
import { getTopicByRoute } from './curriculum';
import { questionBank } from './data/questionBank';

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
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
  }, [persistProgress]);

  const handleDailyComplete = useCallback(() => {
    const newXP = addXP(25);
    const newCount = (progress.dailyChallenges || 0) + 1;
    persistProgress({
      xp: newXP.xp,
      level: newXP.level,
      dailyChallenges: newCount,
    });
    setConfettiActive(true);
    const { newlyUnlocked } = checkAchievements({ ...progress, dailyChallenges: newCount, xp: newXP.xp, level: newXP.level });
    if (newlyUnlocked.length > 0) {
      setNewAchievements(prev => [...prev, ...newlyUnlocked]);
      const achievementXP = newlyUnlocked.reduce((sum, a) => sum + a.xp, 0);
      const finalXP = addXP(achievementXP);
      persistProgress({ xp: finalXP.xp, level: finalXP.level, achievements: [...(progress.achievements || []), ...newlyUnlocked.map(a => a.id)] });
    }
  }, [progress, persistProgress]);

  const handleSettingsChange = useCallback((newSettings) => {
    persistProgress({ settings: newSettings });
  }, [persistProgress]);

  const handleResetProgress = useCallback(() => {
    clearAllState();
    setProgress(getProgress());
  }, []);

  const handleDarkModeToggle = useCallback(() => {
    const newValue = !progress.darkMode;
    persistProgress({ darkMode: newValue });
  }, [progress.darkMode, persistProgress]);

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
        return <Home onNavigate={handleNavigate} xp={progress.xp} level={progress.level} onDailyComplete={handleDailyComplete} dailyCompleted={false} progress={progress} />;
      case 'achievements':
        return <Achievements unlockedAchievements={progress.achievements || []} />;
      case 'settings':
        return <Settings settings={progress.settings || { soundEffects: true, animations: true, reducedMotion: false }} onSettingsChange={handleSettingsChange} onResetProgress={handleResetProgress} darkMode={progress.darkMode || false} onDarkModeToggle={handleDarkModeToggle} />;
      default: {
        const topic = getTopicByRoute(currentPage);
        if (topic && topic.component) {
          const Component = topic.component;
          const bankKey = topic.questionBankKey;
          const bankData = bankKey ? questionBank[bankKey] : null;
          const extraProps = {};
          if (currentPage === 'explorer') extraProps.onExplore = handleExplore;
          if (currentPage === 'divisibility') extraProps.onExplore = handleExplore;
          if (currentPage === 'factor-tree') {
            extraProps.onTreeComplete = handleTreeComplete;
            extraProps.onXP = (xp) => {
              const newXP = addXP(xp);
              persistProgress({ xp: newXP.xp, level: newXP.level });
            };
          }
          return (
            <TopicPageLayout
              topic={topic}
              onBack={() => handleNavigate('home')}
              practiceContent={
                bankData && bankData.practice
                  ? <Practice questions={bankData.practice} topicId={topic.id} />
                  : <div className="topic-loading"><p>Practice questions coming soon!</p></div>
              }
              quizContent={
                bankData && bankData.quiz
                  ? <TopicQuiz questions={bankData.quiz} onCorrect={handleQuizCorrect} onWrong={handleQuizWrong} topicId={topic.id} />
                  : <div className="topic-loading"><p>Quiz questions coming soon!</p></div>
              }
            >
              <Component {...extraProps} />
            </TopicPageLayout>
          );
        }
        return <Home onNavigate={handleNavigate} xp={progress.xp} level={progress.level} onDailyComplete={handleDailyComplete} dailyCompleted={false} progress={progress} />;
      }
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
        darkMode={progress.darkMode || false}
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
