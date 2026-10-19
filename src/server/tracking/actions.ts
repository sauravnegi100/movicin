"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type {
  WatchlistItem,
  WatchedMovie,
  UserMovieTrackingState,
} from "@/types/database";

export interface MovieActionPayload {
  tmdbId: number;
  title: string;
  posterPath: string | null;
  releaseDate: string | null;
  voteAverage: number | null;
}

export interface SetRatingPayload extends MovieActionPayload {
  rating: number | null; // 0.5 to 10.0, or null to remove rating
}

export interface TrackingActionResult {
  success: boolean;
  error?: string;
  inWatchlist?: boolean;
  isWatched?: boolean;
  userRating?: number | null;
}

/**
 * Checks if an error is due to missing tables in Supabase (PGRST205).
 */
function isTableMissingError(error: unknown): boolean {
  if (!error || typeof error !== "object") return false;
  const e = error as { code?: string; message?: string };
  return (
    e.code === "PGRST205" ||
    (typeof e.message === "string" && e.message.includes("Could not find the table"))
  );
}

/**
 * Retrieves the current user's personal tracking state for a given TMDB movie.
 * Safe for unauthenticated callers (returns default empty state).
 */
export async function getUserMovieTracking(
  tmdbId: number
): Promise<UserMovieTrackingState> {
  const defaultState: UserMovieTrackingState = {
    inWatchlist: false,
    isWatched: false,
    userRating: null,
    watchedAt: null,
  };

  if (!tmdbId || isNaN(tmdbId) || tmdbId <= 0) {
    return defaultState;
  }

  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return defaultState;
    }

    // Query watchlist, watched status, and rating in parallel
    const [watchlistRes, watchedRes, ratingRes] = await Promise.all([
      supabase
        .from("watchlist_items")
        .select("id")
        .eq("user_id", user.id)
        .eq("tmdb_id", tmdbId)
        .maybeSingle(),
      supabase
        .from("watched_movies")
        .select("id, watched_at")
        .eq("user_id", user.id)
        .eq("tmdb_id", tmdbId)
        .maybeSingle(),
      supabase
        .from("movie_ratings")
        .select("rating")
        .eq("user_id", user.id)
        .eq("tmdb_id", tmdbId)
        .maybeSingle(),
    ]);

    return {
      inWatchlist: Boolean(watchlistRes.data?.id),
      isWatched: Boolean(watchedRes.data?.id),
      watchedAt: watchedRes.data?.watched_at || null,
      userRating: ratingRes.data?.rating ?? null,
    };
  } catch {
    return defaultState;
  }
}

/**
 * Toggles a movie in the authenticated user's personal Watchlist.
 */
export async function toggleWatchlistAction(
  payload: MovieActionPayload
): Promise<TrackingActionResult> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "UNAUTHENTICATED" };
    }

    const { tmdbId, title, posterPath, releaseDate, voteAverage } = payload;
    if (!tmdbId || !title) {
      return { success: false, error: "Invalid movie payload." };
    }

    // 1. Check if currently in watchlist
    const { data: existing, error: checkError } = await supabase
      .from("watchlist_items")
      .select("id")
      .eq("user_id", user.id)
      .eq("tmdb_id", tmdbId)
      .maybeSingle();

    if (checkError) {
      if (isTableMissingError(checkError)) {
        return {
          success: false,
          error:
            "Database table missing. Please apply migration 20261020000001_movie_tracking.sql in Supabase.",
        };
      }
      return { success: false, error: checkError.message };
    }

    if (existing) {
      // Remove from watchlist
      const { error: deleteError } = await supabase
        .from("watchlist_items")
        .delete()
        .eq("id", existing.id)
        .eq("user_id", user.id);

      if (deleteError) {
        return { success: false, error: deleteError.message };
      }

      revalidatePath(`/movie/${tmdbId}`);
      revalidatePath("/me/watchlist");
      revalidatePath("/me");

      return { success: true, inWatchlist: false };
    } else {
      // Add to watchlist
      const { error: insertError } = await supabase
        .from("watchlist_items")
        .insert({
          user_id: user.id,
          tmdb_id: tmdbId,
          title,
          poster_path: posterPath,
          release_date: releaseDate,
          vote_average: voteAverage,
        });

      if (insertError) {
        return { success: false, error: insertError.message };
      }

      revalidatePath(`/movie/${tmdbId}`);
      revalidatePath("/me/watchlist");
      revalidatePath("/me");

      return { success: true, inWatchlist: true };
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error toggling watchlist.";
    return { success: false, error: message };
  }
}

/**
 * Toggles a movie's Watched status in the user's personal Viewing Diary.
 */
export async function toggleWatchedAction(
  payload: MovieActionPayload
): Promise<TrackingActionResult> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "UNAUTHENTICATED" };
    }

    const { tmdbId, title, posterPath, releaseDate, voteAverage } = payload;
    if (!tmdbId || !title) {
      return { success: false, error: "Invalid movie payload." };
    }

    // 1. Check if currently marked as watched
    const { data: existing, error: checkError } = await supabase
      .from("watched_movies")
      .select("id")
      .eq("user_id", user.id)
      .eq("tmdb_id", tmdbId)
      .maybeSingle();

    if (checkError) {
      if (isTableMissingError(checkError)) {
        return {
          success: false,
          error:
            "Database table missing. Please apply migration 20261020000001_movie_tracking.sql in Supabase.",
        };
      }
      return { success: false, error: checkError.message };
    }

    if (existing) {
      // Unmark as watched
      const { error: deleteError } = await supabase
        .from("watched_movies")
        .delete()
        .eq("id", existing.id)
        .eq("user_id", user.id);

      if (deleteError) {
        return { success: false, error: deleteError.message };
      }

      revalidatePath(`/movie/${tmdbId}`);
      revalidatePath("/me/diary");
      revalidatePath("/me");

      return { success: true, isWatched: false };
    } else {
      // Mark as watched
      const { error: insertError } = await supabase
        .from("watched_movies")
        .insert({
          user_id: user.id,
          tmdb_id: tmdbId,
          title,
          poster_path: posterPath,
          release_date: releaseDate,
          vote_average: voteAverage,
          watched_at: new Date().toISOString(),
        });

      if (insertError) {
        return { success: false, error: insertError.message };
      }

      revalidatePath(`/movie/${tmdbId}`);
      revalidatePath("/me/diary");
      revalidatePath("/me");

      return { success: true, isWatched: true };
    }
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error toggling watched status.";
    return { success: false, error: message };
  }
}

/**
 * Saves or updates a personal rating for a movie.
 * Setting `rating: null` removes the personal rating.
 */
export async function setMovieRatingAction(
  payload: SetRatingPayload
): Promise<TrackingActionResult> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { success: false, error: "UNAUTHENTICATED" };
    }

    const { tmdbId, title, posterPath, releaseDate, voteAverage, rating } = payload;
    if (!tmdbId || !title) {
      return { success: false, error: "Invalid movie payload." };
    }

    if (rating === null) {
      // Delete personal rating
      const { error: deleteError } = await supabase
        .from("movie_ratings")
        .delete()
        .eq("user_id", user.id)
        .eq("tmdb_id", tmdbId);

      if (deleteError && !isTableMissingError(deleteError)) {
        return { success: false, error: deleteError.message };
      }

      revalidatePath(`/movie/${tmdbId}`);
      revalidatePath("/me/diary");
      revalidatePath("/me");

      return { success: true, userRating: null };
    }

    // Validate rating scale (0.5 to 10.0)
    if (typeof rating !== "number" || rating < 0.5 || rating > 10.0) {
      return {
        success: false,
        error: "Rating must be a score between 0.5 and 10.0.",
      };
    }

    // Upsert into movie_ratings
    const { error: ratingError } = await supabase
      .from("movie_ratings")
      .upsert(
        {
          user_id: user.id,
          tmdb_id: tmdbId,
          title,
          poster_path: posterPath,
          release_date: releaseDate,
          vote_average: voteAverage,
          rating,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id,tmdb_id" }
      );

    if (ratingError) {
      if (isTableMissingError(ratingError)) {
        return {
          success: false,
          error:
            "Database table missing. Please apply migration 20261020000001_movie_tracking.sql in Supabase.",
        };
      }
      return { success: false, error: ratingError.message };
    }

    // When a user rates a movie, also ensure it is recorded as watched if not already
    const { data: existingWatched } = await supabase
      .from("watched_movies")
      .select("id")
      .eq("user_id", user.id)
      .eq("tmdb_id", tmdbId)
      .maybeSingle();

    if (!existingWatched) {
      await supabase.from("watched_movies").insert({
        user_id: user.id,
        tmdb_id: tmdbId,
        title,
        poster_path: posterPath,
        release_date: releaseDate,
        vote_average: voteAverage,
        watched_at: new Date().toISOString(),
      });
    }

    revalidatePath(`/movie/${tmdbId}`);
    revalidatePath("/me/diary");
    revalidatePath("/me");

    return { success: true, userRating: rating, isWatched: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unexpected error saving rating.";
    return { success: false, error: message };
  }
}

/**
 * Retrieves the current user's Watchlist items.
 */
export async function getUserWatchlist(): Promise<{
  data: WatchlistItem[];
  error?: string;
  isTableMissing?: boolean;
}> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { data: [], error: "UNAUTHENTICATED" };
    }

    const { data, error } = await supabase
      .from("watchlist_items")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      if (isTableMissingError(error)) {
        return {
          data: [],
          isTableMissing: true,
          error:
            "Watchlist table not yet created in Supabase. Apply migration 20261020000001_movie_tracking.sql.",
        };
      }
      return { data: [], error: error.message };
    }

    return { data: data || [] };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error fetching watchlist.";
    return { data: [], error: message };
  }
}

/**
 * Retrieves the current user's Viewing Diary (Watched movies) with their personal ratings.
 */
export async function getUserDiary(): Promise<{
  data: WatchedMovie[];
  error?: string;
  isTableMissing?: boolean;
}> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError || !user) {
      return { data: [], error: "UNAUTHENTICATED" };
    }

    // Fetch watched movies and ratings in parallel
    const [watchedRes, ratingsRes] = await Promise.all([
      supabase
        .from("watched_movies")
        .select("*")
        .eq("user_id", user.id)
        .order("watched_at", { ascending: false }),
      supabase
        .from("movie_ratings")
        .select("tmdb_id, rating")
        .eq("user_id", user.id),
    ]);

    if (watchedRes.error) {
      if (isTableMissingError(watchedRes.error)) {
        return {
          data: [],
          isTableMissing: true,
          error:
            "Watched movies table not yet created in Supabase. Apply migration 20261020000001_movie_tracking.sql.",
        };
      }
      return { data: [], error: watchedRes.error.message };
    }

    // Build rating lookup map by tmdb_id
    const ratingMap = new Map<number, number>();
    if (ratingsRes.data) {
      for (const r of ratingsRes.data) {
        ratingMap.set(r.tmdb_id, r.rating);
      }
    }

    const movies: WatchedMovie[] = (watchedRes.data || []).map((m) => ({
      ...m,
      user_rating: ratingMap.get(m.tmdb_id) ?? null,
    }));

    return { data: movies };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Error fetching viewing diary.";
    return { data: [], error: message };
  }
}

/**
 * Retrieves counts for watched movies, personal ratings, and watchlist items.
 */
export async function getUserTrackingCounts(): Promise<{
  watchedCount: number;
  ratingsCount: number;
  watchlistCount: number;
}> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return { watchedCount: 0, ratingsCount: 0, watchlistCount: 0 };
    }

    const [watchedRes, ratingsRes, watchlistRes] = await Promise.all([
      supabase
        .from("watched_movies")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id),
      supabase
        .from("movie_ratings")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id),
      supabase
        .from("watchlist_items")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.id),
    ]);

    return {
      watchedCount: watchedRes.count ?? 0,
      ratingsCount: ratingsRes.count ?? 0,
      watchlistCount: watchlistRes.count ?? 0,
    };
  } catch {
    return { watchedCount: 0, ratingsCount: 0, watchlistCount: 0 };
  }
}
