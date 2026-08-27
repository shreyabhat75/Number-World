-- Number World Supabase Schema
-- Run this in Supabase Dashboard → SQL Editor

-- Students table
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  avatar TEXT NOT NULL DEFAULT '🧑‍🚀',
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  streak INTEGER DEFAULT 0,
  best_streak INTEGER DEFAULT 0,
  overall_progress NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now(),
  last_activity JSONB DEFAULT '{}'::jsonb
);

-- Student progress per topic
CREATE TABLE IF NOT EXISTS student_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  topic TEXT NOT NULL,
  completed INTEGER DEFAULT 0,
  total INTEGER DEFAULT 0,
  progress NUMERIC DEFAULT 0,
  xp_earned INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(student_id, topic)
);

-- Quiz progress
CREATE TABLE IF NOT EXISTS quiz_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE UNIQUE,
  questions_attempted INTEGER DEFAULT 0,
  correct_answers INTEGER DEFAULT 0,
  incorrect_answers INTEGER DEFAULT 0,
  best_score INTEGER DEFAULT 0,
  best_streak INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Divisibility rules progress
CREATE TABLE IF NOT EXISTS divisibility_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE UNIQUE,
  rule_2 BOOLEAN DEFAULT false,
  rule_3 BOOLEAN DEFAULT false,
  rule_4 BOOLEAN DEFAULT false,
  rule_5 BOOLEAN DEFAULT false,
  rule_6 BOOLEAN DEFAULT false,
  rule_7 BOOLEAN DEFAULT false,
  rule_8 BOOLEAN DEFAULT false,
  rule_9 BOOLEAN DEFAULT false,
  rule_10 BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Prime factor tree progress
CREATE TABLE IF NOT EXISTS prime_tree_progress (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE UNIQUE,
  trees_completed INTEGER DEFAULT 0,
  best_streak INTEGER DEFAULT 0,
  numbers_mastered JSONB DEFAULT '[]'::jsonb,
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Student achievements
CREATE TABLE IF NOT EXISTS student_achievements (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  achievement_id TEXT NOT NULL,
  unlocked_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(student_id, achievement_id)
);

-- Student activities log
CREATE TABLE IF NOT EXISTS student_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  student_id UUID REFERENCES students(id) ON DELETE CASCADE,
  activity_type TEXT NOT NULL,
  activity_id TEXT,
  completed BOOLEAN DEFAULT false,
  score INTEGER DEFAULT 0,
  xp_earned INTEGER DEFAULT 0,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_student_progress_student ON student_progress(student_id);
CREATE INDEX IF NOT EXISTS idx_quiz_progress_student ON quiz_progress(student_id);
CREATE INDEX IF NOT EXISTS idx_divisibility_progress_student ON divisibility_progress(student_id);
CREATE INDEX IF NOT EXISTS idx_prime_tree_progress_student ON prime_tree_progress(student_id);
CREATE INDEX IF NOT EXISTS idx_student_achievements_student ON student_achievements(student_id);
CREATE INDEX IF NOT EXISTS idx_student_activities_student ON student_activities(student_id);

-- Updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_students_updated_at
  BEFORE UPDATE ON students
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_student_progress_updated_at
  BEFORE UPDATE ON student_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_quiz_progress_updated_at
  BEFORE UPDATE ON quiz_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_divisibility_progress_updated_at
  BEFORE UPDATE ON divisibility_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trigger_prime_tree_progress_updated_at
  BEFORE UPDATE ON prime_tree_progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- RLS Policies
-- SECURITY NOTE: This uses permissive policies for a classroom app.
-- For production with real auth, restrict to authenticated users.
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE quiz_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE divisibility_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE prime_tree_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_activities ENABLE ROW LEVEL SECURITY;

-- Allow all operations for anon key (classroom app without auth)
-- In production, add Supabase Auth and restrict these policies
CREATE POLICY "Allow all student operations" ON students FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all progress operations" ON student_progress FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all quiz operations" ON quiz_progress FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all divisibility operations" ON divisibility_progress FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all prime tree operations" ON prime_tree_progress FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all achievement operations" ON student_achievements FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Allow all activity operations" ON student_activities FOR ALL USING (true) WITH CHECK (true);
