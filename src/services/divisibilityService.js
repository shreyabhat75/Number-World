import { supabase, isSupabaseConfigured } from '../lib/supabase';

export async function getDivisibilityProgress(studentId) {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase
    .from('divisibility_progress')
    .select('*')
    .eq('student_id', studentId)
    .single();
  if (error && error.code !== 'PGRST116') console.error('getDivisibilityProgress:', error);
  return data;
}

export async function completeDivisibilityRule(studentId, ruleNumber) {
  if (!isSupabaseConfigured()) return null;
  const column = `rule_${ruleNumber}`;
  const { data, error } = await supabase
    .from('divisibility_progress')
    .update({ [column]: true })
    .eq('student_id', studentId)
    .select()
    .single();
  if (error) console.error('completeDivisibilityRule:', error);
  return data;
}

export async function getPrimeTreeProgress(studentId) {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase
    .from('prime_tree_progress')
    .select('*')
    .eq('student_id', studentId)
    .single();
  if (error && error.code !== 'PGRST116') console.error('getPrimeTreeProgress:', error);
  return data;
}

export async function recordPrimeTreeCompletion(studentId, number) {
  if (!isSupabaseConfigured()) return null;
  const existing = await getPrimeTreeProgress(studentId);
  const mastered = existing?.numbers_mastered || [];
  const newMastered = mastered.includes(number) ? mastered : [...mastered, number];

  const { data, error } = await supabase
    .from('prime_tree_progress')
    .update({
      trees_completed: (existing?.trees_completed || 0) + 1,
      numbers_mastered: newMastered,
    })
    .eq('student_id', studentId)
    .select()
    .single();
  if (error) console.error('recordPrimeTreeCompletion:', error);
  return data;
}

export async function recordActivity(studentId, activityType, activityId, score, xpEarned, metadata = {}) {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase
    .from('student_activities')
    .insert({
      student_id: studentId,
      activity_type: activityType,
      activity_id: activityId,
      completed: true,
      score,
      xp_earned: xpEarned,
      metadata,
    })
    .select()
    .single();
  if (error) console.error('recordActivity:', error);
  return data;
}

export async function getRecentActivityDates(studentId, days = 30) {
  if (!isSupabaseConfigured()) return [];
  const since = new Date();
  since.setDate(since.getDate() - days);
  const { data, error } = await supabase
    .from('student_activities')
    .select('created_at')
    .eq('student_id', studentId)
    .gte('created_at', since.toISOString());
  if (error) {
    console.error('getRecentActivityDates:', error);
    return [];
  }
  const days_set = new Set((data || []).map(row => row.created_at.slice(0, 10)));
  return Array.from(days_set);
}
