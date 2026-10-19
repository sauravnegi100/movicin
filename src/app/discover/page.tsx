import type { Metadata } from "next";
import { connection } from "next/server";
import {
  discoverMovies,
  isTmdbConfigured,
  mapTmdbMovieToCard,
  type DiscoverOptions,
} from "@/lib/providers/tmdb";
import { DiscoverFilters } from "@/components/movies/DiscoverFilters";
import { MovieGrid } from "@/components/movies/MovieGrid";
import { Pagination } from "@/components/movies/Pagination";
import { TmdbMissingKeyAlert } from "@/components/movies/TmdbMissingKeyAlert";
import { Compass, AlertTriangle } from "lucide-react";

export const instant = false;

export const metadata: Metadata = {
  title: "Discover Movies | Movicin",
  description:
    "Explore trending cinema, popular titles, upcoming releases, and curated genres on Movicin.",
};

interface DiscoverPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function DiscoverPage({ searchParams }: DiscoverPageProps) {
  await connection();
  const params = await searchParams;

  const category = (params.category as "trending" | "popular" | "upcoming" | "discover") || "trending";
  const genreId = params.genre ? parseInt(params.genre as string, 10) : undefined;
  const sortBy = (params.sort as DiscoverOptions["sortBy"]) || "popularity.desc";
  const year = params.year ? parseInt(params.year as string, 10) : undefined;
  const page = params.page ? parseInt(params.page as string, 10) : 1;

  const isConfigured = isTmdbConfigured();

  let moviesData = null;
  let errorMessage: string | null = null;

  if (isConfigured) {
    const response = await discoverMovies({
      category: genreId || year || sortBy !== "popularity.desc" ? "discover" : category,
      genreId,
      sortBy,
      year,
      page,
    });

    if (response.error) {
      errorMessage = response.error;
    } else if (response.data) {
      moviesData = {
        page: response.data.page,
        totalPages: response.data.total_pages,
        totalResults: response.data.total_results,
        movies: response.data.results.map(mapTmdbMovieToCard),
      };
    }
  }

  const categoryTitles: Record<string, { title: string; subtitle: string }> = {
    trending: {
      title: "Trending Movies This Week",
      subtitle: "The most watched and actively discussed motion pictures globally.",
    },
    popular: {
      title: "Popular Releases",
      subtitle: "Current crowd favorites and box office champions across theaters and streaming.",
    },
    upcoming: {
      title: "Upcoming Theatrical & Streaming",
      subtitle: "Highly anticipated titles premiering in theaters and digital platforms soon.",
    },
    discover: {
      title: "Custom Movie Exploration",
      subtitle: "Filtered catalog discovery tailored by genre, release year, and provider ratings.",
    },
  };

  const currentHeader =
    genreId || year || sortBy !== "popularity.desc"
      ? categoryTitles.discover
      : categoryTitles[category] || categoryTitles.trending;

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Banner */}
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F43F5E]">
          <Compass className="h-4 w-4 text-[#F43F5E]" aria-hidden="true" />
          <span>Movie Catalog Discovery</span>
        </div>
        <h1 className="mt-2 font-sans text-3xl font-extrabold tracking-tight text-[#F8FAFC] sm:text-4xl">
          {currentHeader.title}
        </h1>
        <p className="mt-2 text-sm text-[#9DA8B8] max-w-3xl">
          {currentHeader.subtitle}
        </p>
      </div>

      {/* Filter and Category Controls */}
      <div className="mb-8">
        <DiscoverFilters
          currentCategory={category}
          currentGenre={genreId}
          currentSort={sortBy}
          currentYear={year}
        />
      </div>

      {/* Content State: Missing TMDB Key */}
      {!isConfigured && (
        <div className="py-6">
          <TmdbMissingKeyAlert
            title="TMDB Metadata Required for Live Catalog"
            description="Movicin uses official The Movie Database (TMDB) metadata to provide real film posters, synopses, release dates, and scores. Set your TMDB_API_KEY in .env.local to view live catalog data."
          />
        </div>
      )}

      {/* Content State: Provider Error */}
      {isConfigured && errorMessage && (
        <div
          role="alert"
          className="mx-auto my-8 max-w-2xl rounded-2xl border border-red-500/30 bg-[#12151F] p-6 text-center text-[#F8FAFC]"
        >
          <AlertTriangle className="mx-auto h-8 w-8 text-red-400 mb-2" aria-hidden="true" />
          <h2 className="text-base font-semibold">Unable to Load Catalog</h2>
          <p className="mt-1 text-xs text-[#9DA8B8]">{errorMessage}</p>
        </div>
      )}

      {/* Content State: Movie Grid & Pagination */}
      {isConfigured && moviesData && (
        <div>
          <div className="mb-4 flex items-center justify-between text-xs text-[#697487]">
            <span>
              Showing {moviesData.movies.length} titles
              {moviesData.totalResults > 0 && ` (${moviesData.totalResults.toLocaleString()} found)`}
            </span>
            <span className="text-[11px] text-[#697487]">
              Ratings sourced from TMDB public community
            </span>
          </div>

          <MovieGrid
            movies={moviesData.movies}
            emptyMessage="No movies match your current combination of genre, year, and category filters."
          />

          <Pagination
            currentPage={moviesData.page}
            totalPages={moviesData.totalPages}
          />
        </div>
      )}
    </div>
  );
}
