import { supabase, isSupabaseConfigured } from '../lib/supabase';

export async function getQuizProgress(studentId) {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase
    .from('quiz_progress')
    .select('*')
    .eq('student_id', studentId)
    .single();
  if (error && error.code !== 'PGRST116') console.error('getQuizProgress:', error);
  return data;
}

export async function recordQuizAnswer(studentId, isCorrect, currentStreak) {
  if (!isSupabaseConfigured()) return null;
  const existing = await getQuizProgress(studentId);
  if (!existing) return null;

  const updates = {
    questions_attempted: existing.questions_attempted + 1,
    correct_answers: existing.correct_answers + (isCorrect ? 1 : 0),
    incorrect_answers: existing.incorrect_answers + (isCorrect ? 0 : 1),
    best_streak: Math.max(existing.best_streak, currentStreak),
  };

  if (isCorrect) {
    const newScore = existing.correct_answers + 1;
    const newTotal = existing.questions_attempted + 1;
    const accuracy = Math.round((newScore / newTotal) * 100);
    if (accuracy > existing.best_score) {
      updates.best_score = accuracy;
    }
  }

  const { data, error } = await supabase
    .from('quiz_progress')
    .update(updates)
    .eq('student_id', studentId)
    .select()
    .single();
  if (error) console.error('recordQuizAnswer:', error);
  return data;
}
