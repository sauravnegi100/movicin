import {
  type TmdbMovieListItem,
  type TmdbMovieDetails,
  type MovieCardData,
  type MovieDetailData,
} from "./types";

const TMDB_IMAGE_BASE = "https://image.tmdb.org/t/p";

/**
 * Generates an absolute TMDB image URL for posters, backdrops, or profiles.
 * Returns null if path is missing or null.
 */
export function getTmdbImageUrl(
  path: string | null | undefined,
  size: "w185" | "w342" | "w500" | "w780" | "w1280" | "original" = "w500"
): string | null {
  if (!path || typeof path !== "string") return null;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${TMDB_IMAGE_BASE}/${size}${cleanPath}`;
}

/**
 * Extracts 4-digit release year from YYYY-MM-DD or returns empty string.
 */
export function formatReleaseYear(dateStr?: string | null): string {
  if (!dateStr || typeof dateStr !== "string") return "";
  const match = dateStr.match(/^(\d{4})/);
  return match ? match[1] : "";
}

/**
 * Formats runtime minutes into readable string e.g. "2h 15m" or "45m".
 */
export function formatRuntime(minutes?: number | null): string {
  if (!minutes || minutes <= 0) return "Runtime unavailable";
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  if (hours > 0 && remainingMinutes > 0) {
    return `${hours}h ${remainingMinutes}m`;
  }
  if (hours > 0) {
    return `${hours}h`;
  }
  return `${remainingMinutes}m`;
}

/**
 * Formats vote average to 1 decimal place.
 */
export function formatRating(voteAverage?: number | null): string {
  if (voteAverage === undefined || voteAverage === null || isNaN(voteAverage)) {
    return "—";
  }
  return voteAverage.toFixed(1);
}

/**
 * Formats vote count for display (e.g. 1.2k, 15.4k).
 */
export function formatVoteCount(count?: number | null): string {
  if (!count || count <= 0) return "0";
  if (count >= 1000000) {
    return `${(count / 1000000).toFixed(1)}M`;
  }
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toLocaleString();
}

/**
 * Formats monetary amounts (e.g. budget, revenue) into USD currency string.
 * Returns null if amount is missing, 0, or invalid.
 */
export function formatCurrency(amount?: number | null): string | null {
  if (!amount || amount <= 0 || isNaN(amount)) return null;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Converts a TMDB API movie list item into Movicin's normalized MovieCardData.
 */
export function mapTmdbMovieToCard(item: TmdbMovieListItem): MovieCardData {
  return {
    id: item.id,
    title: item.title || item.original_title || "Untitled",
    releaseYear: formatReleaseYear(item.release_date),
    posterUrl: getTmdbImageUrl(item.poster_path, "w500"),
    backdropUrl: getTmdbImageUrl(item.backdrop_path, "w780"),
    tmdbRating: Math.round((item.vote_average || 0) * 10) / 10,
    tmdbVoteCount: item.vote_count || 0,
    overview: item.overview || "",
    genreIds: item.genre_ids || [],
  };
}

/**
 * Converts TMDB full movie details into Movicin's normalized MovieDetailData.
 */
export function mapTmdbDetailsToDomain(item: TmdbMovieDetails): MovieDetailData {
  // Extract director from crew
  const directorCrew = item.credits?.crew?.find(
    (c) => c.job?.toLowerCase() === "director"
  );

  // Extract writers / screenplay from crew
  const writerJobs = ["screenplay", "writer", "author", "novel", "story"];
  const writerCrew = (item.credits?.crew || [])
    .filter((c) => writerJobs.includes(c.job?.toLowerCase()))
    .map((c) => c.name);
  const writers = Array.from(new Set(writerCrew)).slice(0, 3);

  // Top 8 cast members with photos
  const topCast = (item.credits?.cast || []).slice(0, 8).map((actor) => ({
    id: actor.id,
    name: actor.name,
    character: actor.character,
    profileUrl: getTmdbImageUrl(actor.profile_path, "w185"),
  }));

  const spokenLanguages = (item.spoken_languages || []).map(
    (l) => l.english_name || l.name
  );

  // Extract official YouTube trailer
  const videos = item.videos?.results || [];
  const officialTrailer =
    videos.find(
      (v) =>
        v.site?.toLowerCase() === "youtube" &&
        v.type?.toLowerCase() === "trailer" &&
        v.official &&
        Boolean(v.key)
    ) ||
    videos.find(
      (v) =>
        v.site?.toLowerCase() === "youtube" &&
        v.type?.toLowerCase() === "trailer" &&
        Boolean(v.key)
    ) ||
    videos.find(
      (v) =>
        v.site?.toLowerCase() === "youtube" &&
        (v.type?.toLowerCase() === "teaser" || v.type?.toLowerCase() === "clip") &&
        Boolean(v.key)
    );

  const trailer = officialTrailer
    ? {
        key: officialTrailer.key,
        name: officialTrailer.name || "Official Trailer",
        site: officialTrailer.site,
        youtubeUrl: `https://www.youtube.com/watch?v=${officialTrailer.key}`,
      }
    : null;

  return {
    id: item.id,
    title: item.title || item.original_title || "Untitled",
    originalTitle: item.original_title || item.title || "Untitled",
    tagline: item.tagline || null,
    overview: item.overview || "No overview available for this title.",
    releaseDate: item.release_date || "Unknown",
    releaseYear: formatReleaseYear(item.release_date),
    runtimeFormatted: formatRuntime(item.runtime),
    runtimeMinutes: item.runtime || null,
    posterUrl: getTmdbImageUrl(item.poster_path, "w780"),
    backdropUrl: getTmdbImageUrl(item.backdrop_path, "w1280"),
    genres: (item.genres || []).map((g) => ({ id: g.id, name: g.name })),
    tmdbRating: Math.round((item.vote_average || 0) * 10) / 10,
    tmdbVoteCount: item.vote_count || 0,
    status: item.status || "Released",
    director: directorCrew ? directorCrew.name : null,
    writers,
    budgetFormatted: formatCurrency(item.budget),
    revenueFormatted: formatCurrency(item.revenue),
    topCast,
    spokenLanguages,
    imdbUrl: item.imdb_id ? `https://www.imdb.com/title/${item.imdb_id}` : null,
    trailer,
  };
}
