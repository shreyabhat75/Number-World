import { supabase, isSupabaseConfigured } from '../lib/supabase';

export async function getAchievements(studentId) {
  if (!isSupabaseConfigured()) return [];
  const { data, error } = await supabase
    .from('student_achievements')
    .select('achievement_id, unlocked_at')
    .eq('student_id', studentId);
  if (error) console.error('getAchievements:', error);
  return data || [];
}

export async function unlockAchievement(studentId, achievementId) {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase
    .from('student_achievements')
    .upsert({
      student_id: studentId,
      achievement_id: achievementId,
    }, { onConflict: 'student_id,achievement_id', ignoreDuplicates: true })
    .select()
    .single();
  if (error && error.code !== '23505') console.error('unlockAchievement:', error);
  return data;
}

export async function hasAchievement(studentId, achievementId) {
  if (!isSupabaseConfigured()) return false;
  const { data, error } = await supabase
    .from('student_achievements')
    .select('id')
    .eq('student_id', studentId)
    .eq('achievement_id', achievementId)
    .maybeSingle();
  return !!data;
}
