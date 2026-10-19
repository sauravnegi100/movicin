"use client";

import { useState, useTransition } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Bookmark, Loader2 } from "lucide-react";
import { toggleWatchlistAction } from "@/server/tracking/actions";

interface QuickWatchlistButtonProps {
  movie: {
    tmdbId: number;
    title: string;
    posterPath: string | null;
    releaseDate: string | null;
    voteAverage: number | null;
  };
  initialInWatchlist?: boolean;
}

export function QuickWatchlistButton({
  movie,
  initialInWatchlist = false,
}: QuickWatchlistButtonProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();
  const [inWatchlist, setInWatchlist] = useState(initialInWatchlist);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    const nextState = !inWatchlist;
    setInWatchlist(nextState); // Optimistic update

    startTransition(async () => {
      const res = await toggleWatchlistAction(movie);
      if (!res.success) {
        if (res.error === "UNAUTHENTICATED") {
          setInWatchlist(initialInWatchlist);
          const nextUrl = pathname || `/movie/${movie.tmdbId}`;
          router.push(`/login?next=${encodeURIComponent(nextUrl)}`);
          return;
        }
        // Rollback on other error
        setInWatchlist(!nextState);
      } else if (typeof res.inWatchlist === "boolean") {
        setInWatchlist(res.inWatchlist);
      }
    });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={isPending}
      aria-label={
        inWatchlist
          ? `Remove ${movie.title} from watchlist`
          : `Add ${movie.title} to watchlist`
      }
      title={inWatchlist ? "In Watchlist" : "Add to Watchlist"}
      className={`relative z-20 flex h-7 w-7 items-center justify-center rounded-full backdrop-blur-sm transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#06B6D4] ${
        inWatchlist
          ? "border border-[#06B6D4]/50 bg-[#06B6D4]/25 text-[#06B6D4] shadow-sm shadow-[#06B6D4]/30"
          : "border border-white/10 bg-[#090A0E]/80 text-[#9DA8B8] hover:border-[#06B6D4]/40 hover:bg-[#1A1E2B] hover:text-[#06B6D4] hover:scale-110 opacity-80 group-hover:opacity-100"
      }`}
    >
      {isPending ? (
        <Loader2 className="h-3.5 w-3.5 animate-spin text-[#06B6D4]" aria-hidden="true" />
      ) : (
        <Bookmark
          className={`h-3.5 w-3.5 transition-transform ${
            inWatchlist ? "fill-[#06B6D4]" : ""
          }`}
          aria-hidden="true"
        />
      )}
    </button>
  );
}
