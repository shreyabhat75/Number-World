import { supabase, isSupabaseConfigured } from '../lib/supabase';

export async function getStudentProgress(studentId) {
  if (!isSupabaseConfigured()) return [];
  const { data, error } = await supabase
    .from('student_progress')
    .select('*')
    .eq('student_id', studentId);
  if (error) console.error('getStudentProgress:', error);
  return data || [];
}

export async function updateTopicProgress(studentId, topic, completed, total, xpEarned) {
  if (!isSupabaseConfigured()) return null;
  const progress = total > 0 ? Math.round((completed / total) * 100) : 0;
  const { data, error } = await supabase
    .from('student_progress')
    .upsert({
      student_id: studentId,
      topic,
      completed,
      total,
      progress,
      xp_earned: xpEarned,
    }, { onConflict: 'student_id,topic' })
    .select()
    .single();
  if (error) console.error('updateTopicProgress:', error);
  return data;
}

export async function calculateOverallProgress(studentId) {
  if (!isSupabaseConfigured()) return 0;
  const progress = await getStudentProgress(studentId);
  if (progress.length === 0) return 0;
  const totalProgress = progress.reduce((sum, p) => sum + (p.progress || 0), 0);
  return Math.round(totalProgress / progress.length);
}
