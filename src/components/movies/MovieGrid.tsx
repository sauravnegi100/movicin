import { MovieCard } from "./MovieCard";
import { type MovieCardData } from "@/lib/providers/tmdb/types";

interface MovieGridProps {
  movies: MovieCardData[];
  emptyMessage?: string;
  priorityCount?: number;
}

export function MovieGrid({
  movies,
  emptyMessage = "No titles found matching the selected criteria.",
  priorityCount = 4,
}: MovieGridProps) {
  if (!movies || movies.length === 0) {
    return (
      <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-dashed border-[#232838] bg-[#12151F]/40 p-8 text-center">
        <p className="text-sm font-medium text-[#9DA8B8]">{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 sm:gap-6">
      {movies.map((movie, index) => (
        <MovieCard
          key={movie.id}
          movie={movie}
          priority={index < priorityCount}
        />
      ))}
    </div>
  );
}
