-- ==============================================================================
-- Movicin — Database Migration: Initial User Identity Foundation
-- Migration: 20261019000001_initial_user_profiles.sql
-- Description: Creates core identity tables (profiles, user_preferences, user_roles),
--              indexes, triggers, and Row Level Security (RLS) policies.
-- Security Standards:
--   1. auth.users is the sole source of authentication; zero passwords in app tables.
--   2. Explicit search_path = '' and schema qualification on all functions.
--   3. Strict RBAC: All new signups receive only 'member' role automatically.
--   4. Case-insensitive username uniqueness with collision resilience.
--   5. Immutability protection for user identity ID and creation timestamps.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. UTILITY & SECURITY FUNCTIONS
-- ------------------------------------------------------------------------------

-- Generic updated_at timestamp trigger function
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
BEGIN
  NEW.updated_at := timezone('utc'::text, now());
  RETURN NEW;
END;
$$;

-- Protect immutable profile fields (id and created_at cannot be mutated by user updates)
CREATE OR REPLACE FUNCTION public.protect_profile_immutable_fields()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
BEGIN
  -- Prevent altering the primary key user identity
  IF NEW.id <> OLD.id THEN
    RAISE EXCEPTION 'Cannot alter profile identity ID.';
  END IF;

  -- Preserve the original creation timestamp
  IF NEW.created_at <> OLD.created_at THEN
    NEW.created_at := OLD.created_at;
  END IF;

  -- Sanitize text fields
  NEW.username := TRIM(NEW.username);
  NEW.display_name := TRIM(NEW.display_name);
  IF NEW.bio IS NOT NULL THEN
    NEW.bio := TRIM(NEW.bio);
  END IF;

  RETURN NEW;
END;
$$;

-- Protect immutable user_preferences fields (user_id cannot be mutated)
CREATE OR REPLACE FUNCTION public.protect_user_preferences_immutable_fields()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = ''
AS $$
BEGIN
  IF NEW.user_id <> OLD.user_id THEN
    RAISE EXCEPTION 'Cannot alter user preferences user_id.';
  END IF;
  RETURN NEW;
END;
$$;

-- ------------------------------------------------------------------------------
-- 2. TABLE DEFINITIONS
-- ------------------------------------------------------------------------------

-- Table: public.profiles
-- Extends Supabase auth.users with public identity, display data, and preferences
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username TEXT NOT NULL,
  display_name TEXT NOT NULL,
  avatar_path TEXT,
  bio TEXT,
  preferred_locale TEXT NOT NULL DEFAULT 'en',
  theme_preference TEXT NOT NULL DEFAULT 'dark' CHECK (theme_preference IN ('dark', 'light', 'system')),
  profile_visibility TEXT NOT NULL DEFAULT 'public' CHECK (profile_visibility IN ('public', 'private')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT chk_profiles_username_format CHECK (username ~ '^[a-zA-Z0-9_]{3,30}$'),
  CONSTRAINT chk_profiles_display_name_length CHECK (char_length(trim(display_name)) >= 1 AND char_length(display_name) <= 100),
  CONSTRAINT chk_profiles_bio_length CHECK (bio IS NULL OR char_length(bio) <= 500)
);

-- Table: public.user_preferences
-- Stores personal preferences, spoiler shield controls, and recommendation opt-ins
CREATE TABLE IF NOT EXISTS public.user_preferences (
  user_id UUID PRIMARY KEY REFERENCES public.profiles(id) ON DELETE CASCADE,
  preferred_genres INT[] DEFAULT '{}',
  preferred_languages TEXT[] DEFAULT '{"en"}',
  strict_spoiler_free_mode BOOLEAN NOT NULL DEFAULT false,
  personalization_enabled BOOLEAN NOT NULL DEFAULT true,
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- Table: public.user_roles
-- Implements role-based access control (RBAC). Roles are never modifiable by ordinary members.
CREATE TABLE IF NOT EXISTS public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  role TEXT NOT NULL CHECK (role IN ('member', 'moderator', 'admin', 'superadmin')),
  granted_by UUID REFERENCES public.profiles(id),
  granted_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  revoked_at TIMESTAMPTZ,
  UNIQUE(user_id, role)
);

-- ------------------------------------------------------------------------------
-- 3. INDEXES
-- ------------------------------------------------------------------------------

-- Enforce case-insensitive unique usernames
CREATE UNIQUE INDEX IF NOT EXISTS idx_profiles_username_lower
  ON public.profiles (lower(username));

-- RBAC lookup indexes
CREATE INDEX IF NOT EXISTS idx_user_roles_user_id
  ON public.user_roles (user_id);

CREATE INDEX IF NOT EXISTS idx_user_roles_active
  ON public.user_roles (user_id, role)
  WHERE revoked_at IS NULL;

-- ------------------------------------------------------------------------------
-- 4. ROLE CHECK HELPER FUNCTION
-- ------------------------------------------------------------------------------

-- Evaluates if a given user currently holds an active role (used for RLS policies)
CREATE OR REPLACE FUNCTION public.has_role(
  lookup_user_id UUID,
  required_role TEXT
)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = lookup_user_id
      AND role = required_role
      AND revoked_at IS NULL
  );
$$;

-- ------------------------------------------------------------------------------
-- 5. TRIGGERS
-- ------------------------------------------------------------------------------

-- Profiles triggers
DROP TRIGGER IF EXISTS trg_profiles_updated_at ON public.profiles;
CREATE TRIGGER trg_profiles_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_protect_profile_fields ON public.profiles;
CREATE TRIGGER trg_protect_profile_fields
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.protect_profile_immutable_fields();

-- User preferences triggers
DROP TRIGGER IF EXISTS trg_user_preferences_updated_at ON public.user_preferences;
CREATE TRIGGER trg_user_preferences_updated_at
  BEFORE UPDATE ON public.user_preferences
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

DROP TRIGGER IF EXISTS trg_protect_user_preferences_fields ON public.user_preferences;
CREATE TRIGGER trg_protect_user_preferences_fields
  BEFORE UPDATE ON public.user_preferences
  FOR EACH ROW
  EXECUTE FUNCTION public.protect_user_preferences_immutable_fields();

-- ------------------------------------------------------------------------------
-- 6. SECURE AUTOMATIC USER PROVISIONING TRIGGER (auth.users -> profiles)
-- ------------------------------------------------------------------------------

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = ''
AS $$
DECLARE
  v_raw_username TEXT;
  v_clean_username TEXT;
  v_final_username TEXT;
  v_display_name TEXT;
  v_avatar_url TEXT;
  v_suffix TEXT;
  v_iteration INT := 0;
BEGIN
  -- Extract raw metadata safely
  v_raw_username := NULLIF(TRIM(NEW.raw_user_meta_data->>'username'), '');
  v_display_name := NULLIF(TRIM(COALESCE(
    NEW.raw_user_meta_data->>'display_name',
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'name'
  )), '');
  v_avatar_url := NULLIF(TRIM(COALESCE(
    NEW.raw_user_meta_data->>'avatar_url',
    NEW.raw_user_meta_data->>'picture'
  )), '');

  -- Sanitize username candidate (alphanumeric and underscores only)
  IF v_raw_username IS NOT NULL THEN
    v_clean_username := regexp_replace(v_raw_username, '[^a-zA-Z0-9_]', '', 'g');
  END IF;

  -- If candidate is missing or too short, derive from email local-part
  IF v_clean_username IS NULL OR char_length(v_clean_username) < 3 THEN
    IF NEW.email IS NOT NULL AND position('@' in NEW.email) > 1 THEN
      v_clean_username := regexp_replace(split_part(NEW.email, '@', 1), '[^a-zA-Z0-9_]', '', 'g');
    END IF;
  END IF;

  -- Ensure fallback base username meets minimum 3 characters
  IF v_clean_username IS NULL OR char_length(v_clean_username) < 3 THEN
    v_clean_username := 'user';
  END IF;

  -- Truncate base username if long to leave room for collision resolution
  IF char_length(v_clean_username) > 20 THEN
    v_clean_username := substr(v_clean_username, 1, 20);
  END IF;

  -- Fallback display name
  IF v_display_name IS NULL OR char_length(v_display_name) = 0 THEN
    v_display_name := v_clean_username;
  END IF;
  IF char_length(v_display_name) > 100 THEN
    v_display_name := substr(v_display_name, 1, 100);
  END IF;

  v_final_username := v_clean_username;

  -- Collision avoidance loop against case-insensitive index
  WHILE EXISTS (
    SELECT 1 FROM public.profiles WHERE lower(username) = lower(v_final_username)
  ) AND v_iteration < 5 LOOP
    v_iteration := v_iteration + 1;
    v_suffix := substr(replace(NEW.id::text, '-', ''), v_iteration * 2, 4);
    v_final_username := substr(v_clean_username, 1, 25) || '_' || v_suffix;
  END LOOP;

  -- Deterministic fallback using user id slice if 5 attempts collided
  IF EXISTS (SELECT 1 FROM public.profiles WHERE lower(username) = lower(v_final_username)) THEN
    v_suffix := substr(replace(NEW.id::text, '-', ''), 1, 8);
    v_final_username := substr(v_clean_username, 1, 21) || '_' || v_suffix;
  END IF;

  -- 1. Insert Profile row (with unique collision exception protection)
  BEGIN
    INSERT INTO public.profiles (
      id,
      username,
      display_name,
      avatar_path,
      created_at,
      updated_at
    ) VALUES (
      NEW.id,
      v_final_username,
      v_display_name,
      v_avatar_url,
      timezone('utc'::text, now()),
      timezone('utc'::text, now())
    );
  EXCEPTION WHEN unique_violation THEN
    -- Ultimate fallback in concurrent race condition
    v_final_username := 'u_' || substr(replace(NEW.id::text, '-', ''), 1, 16);
    INSERT INTO public.profiles (
      id,
      username,
      display_name,
      avatar_path,
      created_at,
      updated_at
    ) VALUES (
      NEW.id,
      v_final_username,
      v_display_name,
      v_avatar_url,
      timezone('utc'::text, now()),
      timezone('utc'::text, now())
    ) ON CONFLICT (id) DO NOTHING;
  END;

  -- 2. Insert Default User Preferences
  INSERT INTO public.user_preferences (
    user_id,
    preferred_genres,
    preferred_languages,
    strict_spoiler_free_mode,
    personalization_enabled,
    updated_at
  ) VALUES (
    NEW.id,
    '{}',
    '{"en"}',
    false,
    true,
    timezone('utc'::text, now())
  ) ON CONFLICT (user_id) DO NOTHING;

  -- 3. Provision Basic 'member' Role
  -- CRITICAL SECURITY: Never assign moderator/admin/superadmin automatically.
  -- Any user-supplied role in raw_user_meta_data is strictly ignored.
  INSERT INTO public.user_roles (
    user_id,
    role,
    granted_by,
    granted_at
  ) VALUES (
    NEW.id,
    'member',
    NULL,
    timezone('utc'::text, now())
  ) ON CONFLICT (user_id, role) DO NOTHING;

  RETURN NEW;
END;
$$;

-- Attach trigger to auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- ------------------------------------------------------------------------------
-- 7. ROW LEVEL SECURITY (RLS) POLICIES
-- ------------------------------------------------------------------------------

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Profiles Policies
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
CREATE POLICY "Public profiles are viewable by everyone"
  ON public.profiles
  FOR SELECT
  TO anon, authenticated
  USING (profile_visibility = 'public' OR auth.uid() = id);

DROP POLICY IF EXISTS "Users can update their own profile" ON public.profiles;
CREATE POLICY "Users can update their own profile"
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- User Preferences Policies
DROP POLICY IF EXISTS "Users can view their own preferences" ON public.user_preferences;
CREATE POLICY "Users can view their own preferences"
  ON public.user_preferences
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own preferences" ON public.user_preferences;
CREATE POLICY "Users can update their own preferences"
  ON public.user_preferences
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

-- User Roles Policies
DROP POLICY IF EXISTS "Users can view their own roles" ON public.user_roles;
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Superadmins can view all roles" ON public.user_roles;
CREATE POLICY "Superadmins can view all roles"
  ON public.user_roles
  FOR SELECT
  TO authenticated
  USING (public.has_role(auth.uid(), 'superadmin'));

DROP POLICY IF EXISTS "Only superadmins can insert roles" ON public.user_roles;
CREATE POLICY "Only superadmins can insert roles"
  ON public.user_roles
  FOR INSERT
  TO authenticated
  WITH CHECK (public.has_role(auth.uid(), 'superadmin'));

DROP POLICY IF EXISTS "Only superadmins can update or revoke roles" ON public.user_roles;
CREATE POLICY "Only superadmins can update or revoke roles"
  ON public.user_roles
  FOR UPDATE
  TO authenticated
  USING (public.has_role(auth.uid(), 'superadmin'))
  WITH CHECK (public.has_role(auth.uid(), 'superadmin'));

DROP POLICY IF EXISTS "Roles cannot be deleted directly" ON public.user_roles;
CREATE POLICY "Roles cannot be deleted directly"
  ON public.user_roles
  FOR DELETE
  TO authenticated
  USING (false);

-- ------------------------------------------------------------------------------
-- 8. PERMISSIONS & LEAST-PRIVILEGE GRANTS
-- ------------------------------------------------------------------------------

-- Revoke default public execution privileges on internal functions
REVOKE ALL ON FUNCTION public.handle_updated_at() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.protect_profile_immutable_fields() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.protect_user_preferences_immutable_fields() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.handle_new_user() FROM PUBLIC;
REVOKE ALL ON FUNCTION public.has_role(UUID, TEXT) FROM PUBLIC;

-- Allow authenticated clients to call role verification function
GRANT EXECUTE ON FUNCTION public.has_role(UUID, TEXT) TO authenticated;

-- Revoke all table privileges from public
REVOKE ALL ON TABLE public.profiles FROM PUBLIC;
REVOKE ALL ON TABLE public.user_preferences FROM PUBLIC;
REVOKE ALL ON TABLE public.user_roles FROM PUBLIC;

-- Table grants for profiles
GRANT SELECT ON TABLE public.profiles TO anon, authenticated;
GRANT UPDATE (username, display_name, avatar_path, bio, preferred_locale, theme_preference, profile_visibility)
  ON TABLE public.profiles TO authenticated;

-- Table grants for user_preferences
GRANT SELECT, UPDATE ON TABLE public.user_preferences TO authenticated;

-- Table grants for user_roles (read-only for authenticated members)
GRANT SELECT ON TABLE public.user_roles TO authenticated;

-- ------------------------------------------------------------------------------
-- 9. SAFE BACKFILL FOR EXISTING AUTH USERS
-- ------------------------------------------------------------------------------
-- Provisions profile, preferences, and member role for any pre-existing auth users
DO $$
DECLARE
  v_user RECORD;
  v_username TEXT;
  v_display_name TEXT;
  v_avatar_url TEXT;
BEGIN
  FOR v_user IN (
    SELECT
      u.id,
      u.email,
      u.created_at,
      u.raw_user_meta_data
    FROM auth.users u
    LEFT JOIN public.profiles p ON p.id = u.id
    WHERE p.id IS NULL
  ) LOOP
    -- Derive username
    v_username := NULLIF(TRIM(v_user.raw_user_meta_data->>'username'), '');
    IF v_username IS NOT NULL THEN
      v_username := regexp_replace(v_username, '[^a-zA-Z0-9_]', '', 'g');
    END IF;
    IF v_username IS NULL OR char_length(v_username) < 3 THEN
      IF v_user.email IS NOT NULL AND position('@' in v_user.email) > 1 THEN
        v_username := regexp_replace(split_part(v_user.email, '@', 1), '[^a-zA-Z0-9_]', '', 'g');
      END IF;
    END IF;
    IF v_username IS NULL OR char_length(v_username) < 3 THEN
      v_username := 'user';
    END IF;
    IF char_length(v_username) > 20 THEN
      v_username := substr(v_username, 1, 20);
    END IF;

    -- Avoid collision
    IF EXISTS (SELECT 1 FROM public.profiles WHERE lower(username) = lower(v_username)) THEN
      v_username := substr(v_username, 1, 21) || '_' || substr(replace(v_user.id::text, '-', ''), 1, 8);
    END IF;

    -- Derive display name
    v_display_name := NULLIF(TRIM(COALESCE(
      v_user.raw_user_meta_data->>'display_name',
      v_user.raw_user_meta_data->>'full_name',
      v_username
    )), '');
    IF v_display_name IS NULL THEN
      v_display_name := v_username;
    END IF;

    -- Derive avatar URL
    v_avatar_url := NULLIF(TRIM(COALESCE(
      v_user.raw_user_meta_data->>'avatar_url',
      v_user.raw_user_meta_data->>'picture'
    )), '');

    -- Insert profile
    INSERT INTO public.profiles (
      id,
      username,
      display_name,
      avatar_path,
      created_at,
      updated_at
    ) VALUES (
      v_user.id,
      v_username,
      v_display_name,
      v_avatar_url,
      COALESCE(v_user.created_at, timezone('utc'::text, now())),
      timezone('utc'::text, now())
    ) ON CONFLICT (id) DO NOTHING;

    -- Insert preferences
    INSERT INTO public.user_preferences (
      user_id,
      updated_at
    ) VALUES (
      v_user.id,
      timezone('utc'::text, now())
    ) ON CONFLICT (user_id) DO NOTHING;

    -- Insert basic member role
    INSERT INTO public.user_roles (
      user_id,
      role,
      granted_at
    ) VALUES (
      v_user.id,
      'member',
      timezone('utc'::text, now())
    ) ON CONFLICT (user_id, role) DO NOTHING;
  END LOOP;
END;
$$;
