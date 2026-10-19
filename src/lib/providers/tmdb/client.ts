import "server-only";

import {
  type TmdbMovieListItem,
  type TmdbMovieDetails,
  type TmdbPaginatedResponse,
  type TmdbGenre,
  type ProviderResult,
  type DiscoverOptions,
} from "./types";

const TMDB_BASE_URL = "https://api.themoviedb.org/3";

/**
 * Validates whether TMDB_API_KEY is configured in the environment with a real value.
 */
export function isTmdbConfigured(): boolean {
  const key = process.env.TMDB_API_KEY?.trim();
  if (!key) return false;
  if (
    key.toLowerCase().includes("your-tmdb") ||
    key.toLowerCase().includes("placeholder") ||
    key === ""
  ) {
    return false;
  }
  return true;
}

/**
 * Internal secure fetch helper for TMDB API calls.
 * Never leaks the API key into logs, client responses, or error messages.
 */
async function tmdbFetch<T>(
  endpoint: string,
  searchParams: Record<string, string | number | undefined> = {},
  revalidateSeconds: number = 3600
): Promise<ProviderResult<T>> {
  if (!isTmdbConfigured()) {
    return {
      isConfigMissing: true,
      error:
        "TMDB_API_KEY is not configured. Please add your TMDB API key to .env.local to access live movie catalog data.",
    };
  }

  const apiKey = process.env.TMDB_API_KEY!.trim();
  const isBearer = apiKey.startsWith("eyJ") || apiKey.length > 50;

  // Build target URL
  const url = new URL(`${TMDB_BASE_URL}${endpoint}`);
  for (const [k, v] of Object.entries(searchParams)) {
    if (v !== undefined && v !== null && v !== "") {
      url.searchParams.set(k, String(v));
    }
  }

  if (!isBearer) {
    url.searchParams.set("api_key", apiKey);
  }

  const headers: HeadersInit = {
    Accept: "application/json",
  };

  if (isBearer) {
    headers["Authorization"] = `Bearer ${apiKey}`;
  }

  try {
    const res = await fetch(url.toString(), {
      headers,
      next: { revalidate: revalidateSeconds },
      signal: AbortSignal.timeout(8000), // 8-second timeout guard
    });

    if (res.status === 404) {
      return { error: "The requested movie or catalog resource was not found." };
    }

    if (res.status === 429) {
      return {
        error:
          "The metadata service is experiencing high request volume. Please try again in a few moments.",
      };
    }

    if (res.status === 401) {
      console.error("[TMDB Provider] Authentication rejected: Invalid TMDB_API_KEY.");
      return {
        isConfigMissing: true,
        error: "Invalid TMDB API credentials. Please verify your TMDB_API_KEY in .env.local.",
      };
    }

    if (!res.ok) {
      console.error(`[TMDB Provider] Request to ${endpoint} failed with status ${res.status}.`);
      return {
        error: "Unable to retrieve movie information at this time. Please try again later.",
      };
    }

    const data: T = await res.json();
    return { data };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    if (errorMsg.includes("timeout") || errorMsg.includes("abort")) {
      return {
        error: "The movie metadata service timed out. Please check your network connection.",
      };
    }
    console.error(`[TMDB Provider] Network error querying ${endpoint}:`, errorMsg);
    return {
      error: "Unable to reach the movie metadata service. Please verify network connectivity.",
    };
  }
}

/**
 * Fetch popular movies.
 */
export async function getPopularMovies(
  page: number = 1
): Promise<ProviderResult<TmdbPaginatedResponse<TmdbMovieListItem>>> {
  return tmdbFetch<TmdbPaginatedResponse<TmdbMovieListItem>>(
    "/movie/popular",
    { page, language: "en-US" },
    3600 // 1 hour cache
  );
}

/**
 * Fetch trending movies of the week or day.
 */
export async function getTrendingMovies(
  timeWindow: "day" | "week" = "week",
  page: number = 1
): Promise<ProviderResult<TmdbPaginatedResponse<TmdbMovieListItem>>> {
  return tmdbFetch<TmdbPaginatedResponse<TmdbMovieListItem>>(
    `/trending/movie/${timeWindow}`,
    { page, language: "en-US" },
    3600 // 1 hour cache
  );
}

/**
 * Fetch upcoming theatrical and digital releases.
 */
export async function getUpcomingMovies(
  page: number = 1
): Promise<ProviderResult<TmdbPaginatedResponse<TmdbMovieListItem>>> {
  return tmdbFetch<TmdbPaginatedResponse<TmdbMovieListItem>>(
    "/movie/upcoming",
    { page, language: "en-US" },
    3600 // 1 hour cache
  );
}

/**
 * Discover movies with filtering, sorting, and pagination.
 */
export async function discoverMovies(
  options: DiscoverOptions = {}
): Promise<ProviderResult<TmdbPaginatedResponse<TmdbMovieListItem>>> {
  const { category, genreId, sortBy = "popularity.desc", year, page = 1 } = options;

  if (category === "popular") {
    return getPopularMovies(page);
  }
  if (category === "trending") {
    return getTrendingMovies("week", page);
  }
  if (category === "upcoming") {
    return getUpcomingMovies(page);
  }

  const params: Record<string, string | number | undefined> = {
    page,
    sort_by: sortBy,
    include_adult: "false",
    include_video: "false",
    language: "en-US",
  };

  if (genreId && genreId > 0) {
    params["with_genres"] = genreId;
  }

  if (year && year >= 1880 && year <= 2035) {
    params["primary_release_year"] = year;
  }

  // To prevent single-vote 10.0 anomalies when sorting by score
  if (sortBy.startsWith("vote_average")) {
    params["vote_count.gte"] = 50;
  }

  return tmdbFetch<TmdbPaginatedResponse<TmdbMovieListItem>>(
    "/discover/movie",
    params,
    3600
  );
}

/**
 * Search movies by query with pagination.
 */
export async function searchMovies(
  query: string,
  page: number = 1
): Promise<ProviderResult<TmdbPaginatedResponse<TmdbMovieListItem>>> {
  const trimmed = query.trim();
  if (!trimmed) {
    return {
      data: {
        page: 1,
        results: [],
        total_pages: 0,
        total_results: 0,
      },
    };
  }

  return tmdbFetch<TmdbPaginatedResponse<TmdbMovieListItem>>(
    "/search/movie",
    {
      query: trimmed,
      page,
      include_adult: "false",
      language: "en-US",
    },
    1800 // 30 minutes cache for search
  );
}

/**
 * Fetch full movie details by TMDB movie ID, including credits.
 */
export async function getMovieDetails(
  id: number
): Promise<ProviderResult<TmdbMovieDetails>> {
  if (!id || isNaN(id) || id <= 0) {
    return { error: "Invalid movie ID specified." };
  }

  return tmdbFetch<TmdbMovieDetails>(
    `/movie/${id}`,
    {
      append_to_response: "credits,videos",
      language: "en-US",
    },
    86400 // 24 hours cache for historical details
  );
}

/**
 * Fetch official TMDB genre list.
 */
export async function getMovieGenres(): Promise<ProviderResult<TmdbGenre[]>> {
  const res = await tmdbFetch<{ genres: TmdbGenre[] }>(
    "/genre/movie/list",
    { language: "en-US" },
    604800 // 7 days cache for genre list
  );

  if (res.error) {
    return { error: res.error, isConfigMissing: res.isConfigMissing };
  }

  return { data: res.data?.genres || [] };
}
