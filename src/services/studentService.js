import { supabase, isSupabaseConfigured } from '../lib/supabase';

const AVATARS = ['🧑‍🚀', '🧙‍♂️', '🦸‍♀️', '🧑‍🎓', '👨‍🔬', '👩‍🎨', '🧑‍💻', '🦸‍♂️', '🧑‍🍳', '👩‍🚀', '🧙‍♀️', '🧑‍🎤'];

function pickAvatar(name) {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  return AVATARS[Math.abs(hash) % AVATARS.length];
}

export async function getStudentByName(name) {
  if (!isSupabaseConfigured()) return null;
  const trimmed = name.trim();
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .ilike('name', trimmed)
    .single();
  if (error && error.code !== 'PGRST116') console.error('getStudentByName:', error);
  return data || null;
}

export async function getStudentById(id) {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .eq('id', id)
    .single();
  if (error && error.code !== 'PGRST116') console.error('getStudentById:', error);
  return data || null;
}

export async function createStudent(name) {
  if (!isSupabaseConfigured()) return null;
  const trimmed = name.trim();
  const avatar = pickAvatar(trimmed);
  const { data, error } = await supabase
    .from('students')
    .insert({ name: trimmed, avatar })
    .select()
    .single();
  if (error) { console.error('createStudent:', error); return null; }

  // Create initial related records
  await Promise.all([
    supabase.from('quiz_progress').insert({ student_id: data.id }),
    supabase.from('divisibility_progress').insert({ student_id: data.id }),
    supabase.from('prime_tree_progress').insert({ student_id: data.id }),
  ]);

  return data;
}

export async function updateStudent(id, updates) {
  if (!isSupabaseConfigured()) return null;
  const { data, error } = await supabase
    .from('students')
    .update(updates)
    .eq('id', id)
    .select()
    .single();
  if (error) console.error('updateStudent:', error);
  return data;
}

export async function getAllStudents() {
  if (!isSupabaseConfigured()) return [];
  const { data, error } = await supabase
    .from('students')
    .select('*')
    .order('xp', { ascending: false });
  if (error) { console.error('getAllStudents:', error); return []; }
  return data || [];
}

export async function deleteStudent(id) {
  if (!isSupabaseConfigured()) return false;
  const { error } = await supabase.from('students').delete().eq('id', id);
  if (error) { console.error('deleteStudent:', error); return false; }
  return true;
}

export async function resetStudentProgress(studentId) {
  if (!isSupabaseConfigured()) return false;
  await Promise.all([
    supabase.from('students').update({ xp: 0, level: 1, streak: 0, best_streak: 0, overall_progress: 0, last_activity: {} }).eq('id', studentId),
    supabase.from('student_progress').delete().eq('student_id', studentId),
    supabase.from('quiz_progress').update({ questions_attempted: 0, correct_answers: 0, incorrect_answers: 0, best_score: 0, best_streak: 0 }).eq('student_id', studentId),
    supabase.from('divisibility_progress').update({ rule_2: false, rule_3: false, rule_4: false, rule_5: false, rule_6: false, rule_7: false, rule_8: false, rule_9: false, rule_10: false }).eq('student_id', studentId),
    supabase.from('prime_tree_progress').update({ trees_completed: 0, best_streak: 0, numbers_mastered: [] }).eq('student_id', studentId),
    supabase.from('student_achievements').delete().eq('student_id', studentId),
    supabase.from('student_activities').delete().eq('student_id', studentId),
  ]);
  return true;
}
