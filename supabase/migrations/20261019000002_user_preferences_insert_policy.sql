-- ==============================================================================
-- Movicin — Corrective Migration: User Preferences INSERT Policy & Grant
-- Migration: 20261019000002_user_preferences_insert_policy.sql
-- Description:
--   1. Adds missing INSERT RLS policy and table grant for public.user_preferences,
--      allowing authenticated users to provision/insert their own preferences.
--   2. Ensures strict least privilege: WITH CHECK (auth.uid() = user_id).
--   3. Backfills any profiles that may be missing a user_preferences row.
-- ==============================================================================

-- 1. Grant INSERT on user_preferences to authenticated users
GRANT INSERT ON TABLE public.user_preferences TO authenticated;

-- 2. Create INSERT policy on public.user_preferences (strictly caller's own user_id)
DROP POLICY IF EXISTS "Users can insert their own preferences" ON public.user_preferences;
CREATE POLICY "Users can insert their own preferences"
  ON public.user_preferences
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- 3. Idempotent backfill: ensure all existing profiles have a user_preferences record
INSERT INTO public.user_preferences (
  user_id,
  preferred_genres,
  preferred_languages,
  strict_spoiler_free_mode,
  personalization_enabled,
  updated_at
)
SELECT
  p.id,
  '{}'::INT[],
  '{"en"}'::TEXT[],
  false,
  true,
  timezone('utc'::text, now())
FROM public.profiles p
WHERE NOT EXISTS (
  SELECT 1 FROM public.user_preferences up WHERE up.user_id = p.id
)
ON CONFLICT (user_id) DO NOTHING;
