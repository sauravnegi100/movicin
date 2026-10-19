"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Star,
  Trash2,
  Calendar,
  Filter,
  Film,
  Search,
  X,
} from "lucide-react";
import {
  toggleWatchedAction,
  setMovieRatingAction,
} from "@/server/tracking/actions";
import type { WatchedMovie } from "@/types/database";

interface DiaryManagerProps {
  initialMovies: WatchedMovie[];
}

export function DiaryManager({ initialMovies }: DiaryManagerProps) {
  const [movies, setMovies] = useState<WatchedMovie[]>(initialMovies);
  const [activeTab, setActiveTab] = useState<"all" | "rated">("all");
  const [sortBy, setSortBy] = useState<"recent" | "rating" | "year">("recent");
  const [searchQuery, setSearchQuery] = useState("");
  const [, startTransition] = useTransition();

  const handleRemove = (movie: WatchedMovie) => {
    // Optimistic remove
    setMovies((prev) => prev.filter((m) => m.id !== movie.id));

    startTransition(async () => {
      const res = await toggleWatchedAction({
        tmdbId: movie.tmdb_id,
        title: movie.title,
        posterPath: movie.poster_path,
        releaseDate: movie.release_date,
        voteAverage: movie.vote_average,
      });

      if (!res.success) {
        // Rollback
        setMovies((prev) => [movie, ...prev]);
      }
    });
  };

  const handleUpdateRating = (movie: WatchedMovie, newRating: number | null) => {
    setMovies((prev) =>
      prev.map((m) => (m.id === movie.id ? { ...m, user_rating: newRating } : m))
    );

    startTransition(async () => {
      await setMovieRatingAction({
        tmdbId: movie.tmdb_id,
        title: movie.title,
        posterPath: movie.poster_path,
        releaseDate: movie.release_date,
        voteAverage: movie.vote_average,
        rating: newRating,
      });
    });
  };

  // 1. Filter by tab & search
  let filtered = movies.filter((m) => {
    if (activeTab === "rated" && (!m.user_rating || m.user_rating <= 0)) {
      return false;
    }
    if (searchQuery && !m.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    return true;
  });

  // 2. Sort
  filtered = [...filtered].sort((a, b) => {
    if (sortBy === "rating") {
      return (b.user_rating || 0) - (a.user_rating || 0);
    }
    if (sortBy === "year") {
      const yearA = a.release_date ? parseInt(a.release_date.slice(0, 4), 10) : 0;
      const yearB = b.release_date ? parseInt(b.release_date.slice(0, 4), 10) : 0;
      return yearB - yearA;
    }
    // Default: recent
    return new Date(b.watched_at).getTime() - new Date(a.watched_at).getTime();
  });

  const ratedCount = movies.filter((m) => m.user_rating && m.user_rating > 0).length;

  return (
    <div className="space-y-6">
      {/* Controls & Filter Bar */}
      <div className="flex flex-col gap-4 rounded-2xl border border-[#232838] bg-[#12151F] p-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Tabs */}
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("all")}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === "all"
                ? "border border-[#F43F5E]/30 bg-[#F43F5E]/15 text-[#F43F5E]"
                : "border border-transparent text-[#9DA8B8] hover:bg-[#1A1E2B] hover:text-[#F8FAFC]"
            }`}
          >
            All Watched ({movies.length})
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("rated")}
            className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-colors ${
              activeTab === "rated"
                ? "border border-[#FBBF24]/30 bg-[#FBBF24]/15 text-[#FBBF24]"
                : "border border-transparent text-[#9DA8B8] hover:bg-[#1A1E2B] hover:text-[#F8FAFC]"
            }`}
          >
            Rated ({ratedCount})
          </button>
        </div>

        {/* Sort & Search */}
        <div className="flex flex-wrap items-center gap-3">
          {movies.length > 3 && (
            <div className="relative min-w-[180px]">
              <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#697487]" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search diary..."
                className="w-full rounded-xl border border-[#232838] bg-[#090A0E] py-1.5 pl-8 pr-3 text-xs text-[#F8FAFC] placeholder-[#697487] focus:border-[#F43F5E] focus:outline-none"
              />
            </div>
          )}

          <div className="flex items-center gap-2 text-xs text-[#9DA8B8]">
            <Filter className="h-3.5 w-3.5 text-[#697487]" />
            <select
              value={sortBy}
              aria-label="Sort diary entries by"
              onChange={(e) => setSortBy(e.target.value as "recent" | "rating" | "year")}
              className="rounded-xl border border-[#232838] bg-[#090A0E] px-3 py-1.5 text-xs text-[#F8FAFC] focus:border-[#F43F5E] focus:outline-none"
            >
              <option value="recent">Recently Logged</option>
              <option value="rating">Highest Personal Rating</option>
              <option value="year">Release Year</option>
            </select>
          </div>
        </div>
      </div>

      {/* Diary Entries */}
      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-[#232838] bg-[#12151F] p-8 text-center text-[#9DA8B8]">
          <p className="text-sm">
            {searchQuery
              ? `No titles match "${searchQuery}"`
              : activeTab === "rated"
              ? "You haven't submitted any personal ratings yet."
              : "No diary entries found."}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((movie) => {
            const releaseYear = movie.release_date
              ? new Date(movie.release_date).getFullYear()
              : null;
            const watchedDate = new Date(movie.watched_at).toLocaleDateString("en-IN", {
              month: "short",
              day: "numeric",
              year: "numeric",
            });

            return (
              <article
                key={movie.id}
                className="group relative flex gap-3.5 rounded-2xl border border-[#232838] bg-[#12151F] p-3 transition-all hover:border-[#384157] hover:shadow-lg hover:shadow-black/50"
              >
                {/* Poster */}
                <Link
                  href={`/movie/${movie.tmdb_id}`}
                  className="relative h-28 w-20 shrink-0 overflow-hidden rounded-xl bg-[#1A1E2B] border border-[#232838]"
                >
                  {movie.poster_path ? (
                    <Image
                      src={
                        movie.poster_path.startsWith("http")
                          ? movie.poster_path
                          : `https://image.tmdb.org/t/p/w200${movie.poster_path}`
                      }
                      alt={movie.title}
                      fill
                      sizes="80px"
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center p-2 text-center text-[#697487]">
                      <Film className="h-6 w-6 text-[#384157]" />
                    </div>
                  )}
                </Link>

                {/* Details */}
                <div className="flex flex-1 flex-col justify-between min-w-0">
                  <div>
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-sans text-sm font-semibold text-[#F8FAFC] truncate group-hover:text-[#F43F5E] transition-colors">
                        <Link href={`/movie/${movie.tmdb_id}`}>
                          {movie.title}
                        </Link>
                      </h3>

                      <button
                        type="button"
                        onClick={() => handleRemove(movie)}
                        title="Remove from diary"
                        aria-label={`Remove ${movie.title} from diary`}
                        className="text-[#697487] hover:text-red-400 p-0.5 rounded transition-colors"
                      >
                        <Trash2 className="h-3.5 w-3.5" />
                      </button>
                    </div>

                    <div className="mt-1 flex items-center gap-2 text-xs text-[#697487]">
                      {releaseYear && <span>{releaseYear}</span>}
                      <span>•</span>
                      <div className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        <span>{watchedDate}</span>
                      </div>
                    </div>
                  </div>

                  {/* Rating comparison (Personal vs TMDB) */}
                  <div className="mt-2 flex flex-wrap items-center gap-2 pt-2 border-t border-[#232838]">
                    {/* Personal Rating */}
                    {movie.user_rating !== null && movie.user_rating !== undefined ? (
                      <div className="inline-flex items-center gap-1 rounded-md bg-[#FBBF24]/10 border border-[#FBBF24]/30 px-2 py-0.5 text-xs font-bold text-[#FBBF24]">
                        <Star className="h-3 w-3 fill-[#FBBF24]" />
                        <span>{movie.user_rating} / 10</span>
                        <span className="text-[9px] uppercase font-semibold text-[#FBBF24]/80 ml-0.5">
                          You
                        </span>
                        <button
                          type="button"
                          onClick={() => handleUpdateRating(movie, null)}
                          title="Remove rating"
                          className="ml-1 text-[#FBBF24]/60 hover:text-red-400 transition-colors"
                        >
                          <X className="h-2.5 w-2.5" />
                        </button>
                      </div>
                    ) : (
                      <Link
                        href={`/movie/${movie.tmdb_id}`}
                        className="inline-flex items-center gap-1 text-[11px] text-[#697487] hover:text-[#FBBF24] transition-colors"
                      >
                        <Star className="h-3 w-3" />
                        <span>Add Rating</span>
                      </Link>
                    )}

                    {/* TMDB External Score */}
                    {movie.vote_average !== null && movie.vote_average > 0 && (
                      <div className="inline-flex items-center gap-1 rounded bg-[#090A0E] px-1.5 py-0.5 text-[10px] text-[#9DA8B8] border border-[#232838]">
                        <span>TMDB {movie.vote_average.toFixed(1)}</span>
                      </div>
                    )}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </div>
  );
}
