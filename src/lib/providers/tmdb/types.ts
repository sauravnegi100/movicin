/**
 * TMDB API Types & Domain Models for Movicin
 *
 * Strict, complete type definitions separating external provider contracts
 * from internal Movicin domain interfaces.
 */

export interface TmdbMovieListItem {
  id: number;
  title: string;
  original_title?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  genre_ids?: number[];
  vote_average: number;
  vote_count: number;
  popularity: number;
  adult?: boolean;
  video?: boolean;
}

export interface TmdbGenre {
  id: number;
  name: string;
}

export interface TmdbCastMember {
  id: number;
  name: string;
  character: string;
  profile_path: string | null;
  order: number;
}

export interface TmdbCrewMember {
  id: number;
  name: string;
  job: string;
  department: string;
  profile_path: string | null;
}

export interface TmdbCredits {
  cast: TmdbCastMember[];
  crew: TmdbCrewMember[];
}

export interface TmdbMovieDetails {
  id: number;
  title: string;
  original_title: string;
  tagline: string | null;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  runtime: number | null;
  genres: TmdbGenre[];
  vote_average: number;
  vote_count: number;
  popularity: number;
  status: string;
  budget: number;
  revenue: number;
  homepage: string | null;
  imdb_id: string | null;
  spoken_languages: Array<{
    english_name: string;
    iso_639_1: string;
    name: string;
  }>;
  production_countries: Array<{
    iso_3166_1: string;
    name: string;
  }>;
  credits?: TmdbCredits;
}

export interface TmdbPaginatedResponse<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

/**
 * Normalized Movie Card format used across Movicin UI components
 */
export interface MovieCardData {
  id: number;
  title: string;
  releaseYear: string;
  posterUrl: string | null;
  backdropUrl: string | null;
  tmdbRating: number;
  tmdbVoteCount: number;
  overview: string;
  genreIds: number[];
}

/**
 * Normalized Detailed Movie model for /movie/[id]
 */
export interface MovieDetailData {
  id: number;
  title: string;
  originalTitle: string;
  tagline: string | null;
  overview: string;
  releaseDate: string;
  releaseYear: string;
  runtimeFormatted: string;
  runtimeMinutes: number | null;
  posterUrl: string | null;
  backdropUrl: string | null;
  genres: Array<{ id: number; name: string }>;
  tmdbRating: number;
  tmdbVoteCount: number;
  status: string;
  director: string | null;
  topCast: Array<{ id: number; name: string; character: string; profileUrl: string | null }>;
  spokenLanguages: string[];
  imdbUrl: string | null;
}

export interface DiscoverOptions {
  category?: "popular" | "trending" | "upcoming" | "discover";
  genreId?: number;
  sortBy?:
    | "popularity.desc"
    | "popularity.asc"
    | "vote_average.desc"
    | "vote_average.asc"
    | "primary_release_date.desc"
    | "primary_release_date.asc";
  year?: number;
  page?: number;
}

export interface ProviderResult<T> {
  data?: T;
  error?: string;
  isConfigMissing?: boolean;
}
