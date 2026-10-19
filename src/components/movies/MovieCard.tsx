import Image from "next/image";
import Link from "next/link";
import { Film, Star } from "lucide-react";
import { type MovieCardData } from "@/lib/providers/tmdb/types";
import { formatRating } from "@/lib/providers/tmdb/utils";
import { QuickWatchlistButton } from "@/components/movies/QuickWatchlistButton";

interface MovieCardProps {
  movie: MovieCardData;
  priority?: boolean;
  initialInWatchlist?: boolean;
}

export function MovieCard({
  movie,
  priority = false,
  initialInWatchlist = false,
}: MovieCardProps) {
  const ratingText = formatRating(movie.tmdbRating);
  const hasRating = movie.tmdbRating > 0 && movie.tmdbVoteCount > 0;

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-xl border border-[#232838] bg-[#12151F] transition-all duration-300 hover:-translate-y-1 hover:border-[#384157] hover:shadow-xl hover:shadow-black/50 motion-reduce:transform-none motion-reduce:transition-none focus-within:ring-2 focus-within:ring-[#F43F5E] focus-within:ring-offset-2 focus-within:ring-offset-[#090A0E]">
      {/* Poster Media Container (Stable 2:3 aspect ratio prevents layout shifts) */}
      <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#1A1E2B]">
        {movie.posterUrl ? (
          <Image
            src={movie.posterUrl}
            alt={`${movie.title} poster`}
            fill
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
            priority={priority}
            className="object-cover transition-transform duration-300 group-hover:scale-105 motion-reduce:transform-none"
          />
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center text-[#697487]">
            <Film className="h-10 w-10 mb-2 text-[#384157]" aria-hidden="true" />
            <span className="text-xs font-medium text-[#9DA8B8] line-clamp-3">
              {movie.title}
            </span>
            <span className="text-[10px] text-[#697487] mt-1">No Poster Available</span>
          </div>
        )}

        {/* Ambient Dark Gradient on Poster Bottom */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#12151F] to-transparent opacity-80"
          aria-hidden="true"
        />

        {/* Quick Watchlist Action */}
        <div className="absolute top-2.5 left-2.5 z-20">
          <QuickWatchlistButton
            movie={{
              tmdbId: movie.id,
              title: movie.title,
              posterPath: movie.posterUrl,
              releaseDate: movie.releaseYear ? `${movie.releaseYear}-01-01` : null,
              voteAverage: movie.tmdbRating,
            }}
            initialInWatchlist={initialInWatchlist}
          />
        </div>

        {/* TMDB External Score Pill */}
        {hasRating && (
          <div className="absolute top-2.5 right-2.5 inline-flex items-center gap-1 rounded-md bg-[#090A0E]/85 px-2 py-0.5 text-[11px] font-semibold text-[#F8FAFC] backdrop-blur-sm border border-white/10 shadow-sm">
            <Star className="h-3 w-3 fill-[#FBBF24] text-[#FBBF24]" aria-hidden="true" />
            <span>{ratingText}</span>
            <span className="text-[9px] font-normal text-[#9DA8B8] ml-0.5">TMDB</span>
          </div>
        )}
      </div>

      {/* Card Details */}
      <div className="flex flex-1 flex-col justify-between p-3.5">
        <div>
          <h3 className="font-sans text-sm font-semibold text-[#F8FAFC] line-clamp-1 group-hover:text-[#F43F5E] transition-colors">
            <Link
              href={`/movie/${movie.id}`}
              className="focus:outline-none"
              aria-label={`${movie.title} (${movie.releaseYear || "Unknown Year"})`}
            >
              <span className="absolute inset-0" aria-hidden="true" />
              {movie.title}
            </Link>
          </h3>

          <div className="mt-1 flex items-center justify-between text-xs text-[#9DA8B8]">
            <span>{movie.releaseYear || "TBA"}</span>
            {movie.tmdbVoteCount > 0 && (
              <span className="text-[11px] text-[#697487]">
                {movie.tmdbVoteCount.toLocaleString()} votes
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
