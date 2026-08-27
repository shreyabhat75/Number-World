import { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { getLevelFromXP } from '../utils/storage';
import * as studentService from '../services/studentService';
import * as progressService from '../services/progressService';
import * as quizService from '../services/quizService';
import * as achievementService from '../services/achievementService';
import { completeDivisibilityRule as saveDivRule, recordPrimeTreeCompletion as saveTree, recordActivity as saveActivity } from '../services/divisibilityService';
import { isSupabaseConfigured } from '../lib/supabase';
import { checkAchievements } from '../data/achievements';

const StudentContext = createContext(null);

const MIGRATION_DONE_KEY = 'numberWorldMigratedToSupabase';

function getOldLocalStorageData() {
  const prefix = 'numberworld_';
  const data = {};
  const keys = Object.keys(localStorage).filter(k => k.startsWith(prefix));
  keys.forEach(k => {
    const key = k.replace(prefix, '');
    try {
      data[key] = JSON.parse(localStorage.getItem(k));
    } catch {
      data[key] = localStorage.getItem(k);
    }
  });
  return data;
}

async function migrateOldData(studentId) {
  if (localStorage.getItem(MIGRATION_DONE_KEY)) return;

  const oldData = getOldLocalStorageData();
  if (!oldData.xp && !oldData.level) return;

  const xp = oldData.xp || 0;
  const level = oldData.level || 1;
  const achievements = oldData.achievements || [];

  await studentService.updateStudent(studentId, { xp, level });

  if (oldData.numbersExplored?.length > 0) {
    await progressService.updateTopicProgress(studentId, 'explorer', oldData.numbersExplored.length, oldData.numbersExplored.length, xp);
  }

  if (oldData.totalCorrect || oldData.totalAnswered) {
    await quizService.recordQuizAnswer(studentId, oldData.totalCorrect > 0, 0);
  }

  if (oldData.achievements?.length > 0) {
    for (const achId of achievements) {
      await achievementService.unlockAchievement(studentId, achId);
    }
  }

  localStorage.setItem(MIGRATION_DONE_KEY, 'true');
}

export function StudentProvider({ children }) {
  const [currentStudent, setCurrentStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [studentAchievements, setStudentAchievements] = useState([]);
  const [quizProgress, setQuizProgress] = useState(null);
  const [divProgress, setDivProgress] = useState(null);
  const [treeProgress, setTreeProgress] = useState(null);
  const [topicProgressList, setTopicProgressList] = useState([]);

  const isOnline = isSupabaseConfigured();

  // Load student on mount
  useEffect(() => {
    async function init() {
      const savedId = localStorage.getItem('numberWorldCurrentStudentId');
      if (savedId && isOnline) {
        try {
          const student = await studentService.getStudentById(savedId);
          if (student) {
            await loadStudentData(student);
          } else {
            localStorage.removeItem('numberWorldCurrentStudentId');
          }
        } catch (e) {
          console.error('Init load error:', e);
        }
      }
      setLoading(false);
    }
    init();
  }, []);

  async function loadStudentData(student) {
    setCurrentStudent(student);
    localStorage.setItem('numberWorldCurrentStudentId', student.id);

    // Migrate old localStorage data if needed
    await migrateOldData(student.id);

    const [achievements, quiz, div, tree, topics] = await Promise.all([
      achievementService.getAchievements(student.id),
      quizService.getQuizProgress(student.id),
      divisibilityService.getDivisibilityProgress(student.id),
      divisibilityService.getPrimeTreeProgress(student.id),
      progressService.getStudentProgress(student.id),
    ]);

    setStudentAchievements(achievements.map(a => a.achievement_id));
    setQuizProgress(quiz);
    setDivProgress(div);
    setTreeProgress(tree);
    setTopicProgressList(topics);
  }

  const selectStudent = useCallback(async (name) => {
    if (!name || !name.trim()) {
      setError('Please enter your name!');
      return null;
    }
    setError(null);
    setLoading(true);

    try {
      if (isOnline) {
        let student = await studentService.getStudentByName(name);
        if (!student) {
          student = await studentService.createStudent(name);
          if (!student) {
            setError('Could not create student. Try again!');
            setLoading(false);
            return null;
          }
        }
        await loadStudentData(student);
        setLoading(false);
        return student;
      } else {
        // Offline fallback - use localStorage
        const offlineStudent = {
          id: 'offline-' + name.trim().toLowerCase(),
          name: name.trim(),
          avatar: '🧑‍🚀',
          xp: parseInt(localStorage.getItem('xp') || '0'),
          level: parseInt(localStorage.getItem('level') || '1'),
          streak: 0,
          best_streak: parseInt(localStorage.getItem('bestStreak') || '0'),
          overall_progress: 0,
        };
        setCurrentStudent(offlineStudent);
        localStorage.setItem('numberWorldCurrentStudentId', offlineStudent.id);
        setLoading(false);
        return offlineStudent;
      }
    } catch (e) {
      console.error('selectStudent error:', e);
      setError('Connection issue. Your progress will be saved locally.');
      setLoading(false);
      return null;
    }
  }, []);

  const switchStudent = useCallback(async (studentId) => {
    setLoading(true);
    try {
      const student = await studentService.getStudentById(studentId);
      if (student) await loadStudentData(student);
    } catch (e) {
      console.error('switchStudent error:', e);
    }
    setLoading(false);
  }, []);

  const addXP = useCallback(async (amount) => {
    if (!currentStudent) return;
    const newXP = currentStudent.xp + amount;
    const newLevel = getLevelFromXP(newXP);
    setCurrentStudent(prev => ({ ...prev, xp: newXP, level: newLevel }));

    if (isOnline) {
      await studentService.updateStudent(currentStudent.id, { xp: newXP, level: newLevel });
    }
  }, [currentStudent]);

  const updateStreak = useCallback(async (isCorrect) => {
    if (!currentStudent) return;
    const newStreak = isCorrect ? (currentStudent.streak || 0) + 1 : 0;
    const newBestStreak = Math.max(currentStudent.best_streak || 0, newStreak);
    setCurrentStudent(prev => ({ ...prev, streak: newStreak, best_streak: newBestStreak }));

    if (isOnline) {
      await studentService.updateStudent(currentStudent.id, { streak: newStreak, best_streak: newBestStreak });
    }
  }, [currentStudent]);

  const recordQuizResult = useCallback(async (isCorrect) => {
    if (!currentStudent) return;
    if (isOnline) {
      const result = await quizService.recordQuizAnswer(currentStudent.id, isCorrect, currentStudent.streak || 0);
      if (result) setQuizProgress(result);
    }
  }, [currentStudent]);

  const updateTopicProgress = useCallback(async (topic, completed, total, xpEarned) => {
    if (!currentStudent) return;
    if (isOnline) {
      await progressService.updateTopicProgress(currentStudent.id, topic, completed, total, xpEarned);
      const topics = await progressService.getStudentProgress(currentStudent.id);
      setTopicProgressList(topics);
    }
  }, [currentStudent]);

  const completeDivRule = useCallback(async (ruleNumber) => {
    if (!currentStudent) return;
    if (isOnline) {
      const result = await saveDivRule(currentStudent.id, ruleNumber);
      if (result) setDivProgress(result);
    } else {
      setDivProgress(prev => ({ ...prev, [`rule_${ruleNumber}`]: true }));
    }
  }, [currentStudent]);

  const completeTree = useCallback(async (number) => {
    if (!currentStudent) return;
    if (isOnline) {
      const result = await saveTree(currentStudent.id, number);
      if (result) setTreeProgress(result);
    }
  }, [currentStudent]);

  const unlockAchievement = useCallback(async (achievementId) => {
    if (!currentStudent) return;
    if (studentAchievements.includes(achievementId)) return;

    setStudentAchievements(prev => [...prev, achievementId]);

    if (isOnline) {
      await achievementService.unlockAchievement(currentStudent.id, achievementId);
    }
  }, [currentStudent, studentAchievements]);

  const checkAndUnlockAchievements = useCallback(async (progressData) => {
    if (!currentStudent) return [];
    const { unlocked, newlyUnlocked } = checkAchievements({
      ...progressData,
      achievements: studentAchievements,
      numbersExplored: progressData.numbersExplored || [],
      bestStreak: currentStudent.best_streak || 0,
      totalCorrect: quizProgress?.correct_answers || 0,
      totalAnswered: quizProgress?.questions_attempted || 0,
      treesCompleted: treeProgress?.trees_completed || 0,
      level: currentStudent.level || 1,
    });

    for (const a of newlyUnlocked) {
      await unlockAchievement(a.id);
    }
    return newlyUnlocked;
  }, [currentStudent, studentAchievements, quizProgress, treeProgress, unlockAchievement]);

  const recordAct = useCallback(async (type, id, score, xp, meta) => {
    if (!currentStudent) return;
    if (isOnline) {
      await saveActivity(currentStudent.id, type, id, score, xp, meta);
    }
    await studentService.updateStudent(currentStudent.id, {
      last_activity: { topic: type, activity: id, timestamp: new Date().toISOString() }
    });
  }, [currentStudent]);

  const resetProgress = useCallback(async () => {
    if (!currentStudent) return;
    if (isOnline) {
      await studentService.resetStudentProgress(currentStudent.id);
      const student = await studentService.getStudentById(currentStudent.id);
      if (student) setCurrentStudent(student);
    }
    setStudentAchievements([]);
    setQuizProgress(null);
    setDivProgress(null);
    setTreeProgress(null);
    setTopicProgressList([]);
  }, [currentStudent]);

  const deleteStudent = useCallback(async () => {
    if (!currentStudent) return;
    if (isOnline) {
      await studentService.deleteStudent(currentStudent.id);
    }
    setCurrentStudent(null);
    setStudentAchievements([]);
    setQuizProgress(null);
    setDivProgress(null);
    setTreeProgress(null);
    setTopicProgressList([]);
    localStorage.removeItem('numberWorldCurrentStudentId');
  }, [currentStudent]);

  const logout = useCallback(() => {
    setCurrentStudent(null);
    setStudentAchievements([]);
    setQuizProgress(null);
    setDivProgress(null);
    setTreeProgress(null);
    setTopicProgressList([]);
    localStorage.removeItem('numberWorldCurrentStudentId');
  }, []);

  const value = {
    currentStudent,
    loading,
    error,
    isOnline,
    studentAchievements,
    quizProgress,
    divProgress,
    treeProgress,
    topicProgressList,
    selectStudent,
    switchStudent,
    addXP,
    updateStreak,
    recordQuizResult,
    updateTopicProgress,
    completeDivRule,
    completeTree,
    unlockAchievement,
    checkAndUnlockAchievements,
    recordAct,
    resetProgress,
    deleteStudent,
    logout,
    setCurrentStudent,
  };

  return (
    <StudentContext.Provider value={value}>
      {children}
    </StudentContext.Provider>
  );
}

export function useStudent() {
  const ctx = useContext(StudentContext);
  if (!ctx) throw new Error('useStudent must be used within StudentProvider');
  return ctx;
}
