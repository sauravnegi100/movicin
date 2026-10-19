/**
 * Database Types for Movicin.
 * Corresponds to PostgreSQL schema defined in supabase/migrations/20261019000001_initial_user_profiles.sql.
 */

export type ThemePreference = "dark" | "light" | "system";
export type ProfileVisibility = "public" | "private";
export type UserRoleType = "member" | "moderator" | "admin" | "superadmin";

export interface Profile {
  id: string;
  username: string;
  display_name: string;
  avatar_path: string | null;
  bio: string | null;
  preferred_locale: string;
  theme_preference: ThemePreference;
  profile_visibility: ProfileVisibility;
  created_at: string;
  updated_at: string;
}

export interface UserPreferences {
  user_id: string;
  preferred_genres: number[];
  preferred_languages: string[];
  strict_spoiler_free_mode: boolean;
  personalization_enabled: boolean;
  updated_at: string;
}

export interface UserRole {
  id: string;
  user_id: string;
  role: UserRoleType;
  granted_by: string | null;
  granted_at: string;
  revoked_at: string | null;
}

/**
 * Standard TMDB movie genre mappings for user preference selection.
 */
export const AVAILABLE_GENRES: { id: number; name: string }[] = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Sci-Fi" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

/**
 * Common languages for cinema discovery preference.
 */
export const AVAILABLE_LANGUAGES: { code: string; label: string }[] = [
  { code: "en", label: "English" },
  { code: "hi", label: "Hindi" },
  { code: "es", label: "Spanish" },
  { code: "fr", label: "French" },
  { code: "ja", label: "Japanese" },
  { code: "ko", label: "Korean" },
  { code: "de", label: "German" },
  { code: "it", label: "Italian" },
];
