-- ==============================================================================
-- Movicin — Database Migration: Personal Movie Tracking
-- Migration: 20261020000001_movie_tracking.sql
-- Description: Creates personal tracking tables for Watchlist, Watched Movies (Diary),
--              and Personal Ratings with strict Row Level Security (RLS) policies.
-- Security Standards:
--   1. Scoped strictly to authenticated users (auth.uid() = user_id).
--   2. RLS enabled on all tracking tables; zero access without valid session.
--   3. Foreign key constraints reference public.profiles(id) ON DELETE CASCADE.
--   4. Idempotent triggers for updated_at timestamps.
--   5. TMDB IDs used as stable external identifiers with minimal necessary metadata.
-- ==============================================================================

-- ------------------------------------------------------------------------------
-- 1. WATCHLIST ITEMS
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.watchlist_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  tmdb_id INT NOT NULL,
  title TEXT NOT NULL,
  poster_path TEXT,
  release_date TEXT,
  vote_average NUMERIC(3, 1),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT uq_watchlist_items_user_movie UNIQUE (user_id, tmdb_id)
);

-- Indexes for fast lookups
CREATE INDEX IF NOT EXISTS idx_watchlist_items_user_id
  ON public.watchlist_items (user_id);

CREATE INDEX IF NOT EXISTS idx_watchlist_items_user_tmdb
  ON public.watchlist_items (user_id, tmdb_id);

CREATE INDEX IF NOT EXISTS idx_watchlist_items_created_at
  ON public.watchlist_items (user_id, created_at DESC);

-- Grants
GRANT SELECT, INSERT, DELETE ON TABLE public.watchlist_items TO authenticated;

-- Row Level Security
ALTER TABLE public.watchlist_items ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own watchlist or public profiles" ON public.watchlist_items;
CREATE POLICY "Users can view their own watchlist or public profiles"
  ON public.watchlist_items
  FOR SELECT
  TO authenticated, anon
  USING (
    (auth.uid() = user_id) OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = watchlist_items.user_id
        AND profiles.profile_visibility = 'public'
    )
  );

DROP POLICY IF EXISTS "Users can insert their own watchlist items" ON public.watchlist_items;
CREATE POLICY "Users can insert their own watchlist items"
  ON public.watchlist_items
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own watchlist items" ON public.watchlist_items;
CREATE POLICY "Users can delete their own watchlist items"
  ON public.watchlist_items
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- ------------------------------------------------------------------------------
-- 2. WATCHED MOVIES (VIEWING DIARY)
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.watched_movies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  tmdb_id INT NOT NULL,
  title TEXT NOT NULL,
  poster_path TEXT,
  release_date TEXT,
  vote_average NUMERIC(3, 1),
  watched_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT uq_watched_movies_user_movie UNIQUE (user_id, tmdb_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_watched_movies_user_id
  ON public.watched_movies (user_id);

CREATE INDEX IF NOT EXISTS idx_watched_movies_user_tmdb
  ON public.watched_movies (user_id, tmdb_id);

CREATE INDEX IF NOT EXISTS idx_watched_movies_watched_at
  ON public.watched_movies (user_id, watched_at DESC);

-- Grants
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.watched_movies TO authenticated;

-- Row Level Security
ALTER TABLE public.watched_movies ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own watched movies or public profiles" ON public.watched_movies;
CREATE POLICY "Users can view their own watched movies or public profiles"
  ON public.watched_movies
  FOR SELECT
  TO authenticated, anon
  USING (
    (auth.uid() = user_id) OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = watched_movies.user_id
        AND profiles.profile_visibility = 'public'
    )
  );

DROP POLICY IF EXISTS "Users can insert their own watched movies" ON public.watched_movies;
CREATE POLICY "Users can insert their own watched movies"
  ON public.watched_movies
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own watched movies" ON public.watched_movies;
CREATE POLICY "Users can update their own watched movies"
  ON public.watched_movies
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own watched movies" ON public.watched_movies;
CREATE POLICY "Users can delete their own watched movies"
  ON public.watched_movies
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Updated_at trigger
DROP TRIGGER IF EXISTS trg_watched_movies_updated_at ON public.watched_movies;
CREATE TRIGGER trg_watched_movies_updated_at
  BEFORE UPDATE ON public.watched_movies
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- ------------------------------------------------------------------------------
-- 3. PERSONAL MOVIE RATINGS
-- ------------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS public.movie_ratings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  tmdb_id INT NOT NULL,
  title TEXT NOT NULL,
  poster_path TEXT,
  release_date TEXT,
  vote_average NUMERIC(3, 1),
  rating NUMERIC(3, 1) NOT NULL CHECK (rating >= 0.5 AND rating <= 10.0),
  created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
  CONSTRAINT uq_movie_ratings_user_movie UNIQUE (user_id, tmdb_id)
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_movie_ratings_user_id
  ON public.movie_ratings (user_id);

CREATE INDEX IF NOT EXISTS idx_movie_ratings_user_tmdb
  ON public.movie_ratings (user_id, tmdb_id);

CREATE INDEX IF NOT EXISTS idx_movie_ratings_created_at
  ON public.movie_ratings (user_id, created_at DESC);

-- Grants
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLE public.movie_ratings TO authenticated;

-- Row Level Security
ALTER TABLE public.movie_ratings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Users can view their own ratings or public profiles" ON public.movie_ratings;
CREATE POLICY "Users can view their own ratings or public profiles"
  ON public.movie_ratings
  FOR SELECT
  TO authenticated, anon
  USING (
    (auth.uid() = user_id) OR
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = movie_ratings.user_id
        AND profiles.profile_visibility = 'public'
    )
  );

DROP POLICY IF EXISTS "Users can insert their own movie ratings" ON public.movie_ratings;
CREATE POLICY "Users can insert their own movie ratings"
  ON public.movie_ratings
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can update their own movie ratings" ON public.movie_ratings;
CREATE POLICY "Users can update their own movie ratings"
  ON public.movie_ratings
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

DROP POLICY IF EXISTS "Users can delete their own movie ratings" ON public.movie_ratings;
CREATE POLICY "Users can delete their own movie ratings"
  ON public.movie_ratings
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

-- Updated_at trigger
DROP TRIGGER IF EXISTS trg_movie_ratings_updated_at ON public.movie_ratings;
CREATE TRIGGER trg_movie_ratings_updated_at
  BEFORE UPDATE ON public.movie_ratings
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();
