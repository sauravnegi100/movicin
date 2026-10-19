"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Bookmark, Check, Star, X, Loader2, Sparkles, LogIn } from "lucide-react";
import {
  toggleWatchlistAction,
  toggleWatchedAction,
  setMovieRatingAction,
} from "@/server/tracking/actions";
import type { UserMovieTrackingState } from "@/types/database";

interface MovieTrackingActionsProps {
  movie: {
    id: number;
    title: string;
    posterPath: string | null;
    releaseDate: string | null;
    voteAverage: number;
  };
  initialTracking: UserMovieTrackingState;
  isAuthenticated: boolean;
}

export function MovieTrackingActions({
  movie,
  initialTracking,
  isAuthenticated,
}: MovieTrackingActionsProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const [inWatchlist, setInWatchlist] = useState(initialTracking.inWatchlist);
  const [isWatched, setIsWatched] = useState(initialTracking.isWatched);
  const [userRating, setUserRating] = useState<number | null>(
    initialTracking.userRating
  );
  const [hoverRating, setHoverRating] = useState<number | null>(null);
  const [feedbackError, setFeedbackError] = useState<string | null>(null);

  // Payload for tracking actions
  const actionPayload = {
    tmdbId: movie.id,
    title: movie.title,
    posterPath: movie.posterPath,
    releaseDate: movie.releaseDate,
    voteAverage: movie.voteAverage,
  };

  const handleAuthRedirect = () => {
    const nextUrl = `/movie/${movie.id}`;
    router.push(`/login?next=${encodeURIComponent(nextUrl)}`);
  };

  const handleToggleWatchlist = () => {
    if (!isAuthenticated) {
      handleAuthRedirect();
      return;
    }

    setFeedbackError(null);
    const nextState = !inWatchlist;
    setInWatchlist(nextState); // Optimistic

    startTransition(async () => {
      const res = await toggleWatchlistAction(actionPayload);
      if (!res.success) {
        setInWatchlist(!nextState); // Rollback
        setFeedbackError(res.error || "Failed to update Watchlist.");
      } else if (typeof res.inWatchlist === "boolean") {
        setInWatchlist(res.inWatchlist);
      }
    });
  };

  const handleToggleWatched = () => {
    if (!isAuthenticated) {
      handleAuthRedirect();
      return;
    }

    setFeedbackError(null);
    const nextState = !isWatched;
    setIsWatched(nextState); // Optimistic

    startTransition(async () => {
      const res = await toggleWatchedAction(actionPayload);
      if (!res.success) {
        setIsWatched(!nextState); // Rollback
        setFeedbackError(res.error || "Failed to update Watched status.");
      } else if (typeof res.isWatched === "boolean") {
        setIsWatched(res.isWatched);
      }
    });
  };

  const handleSetRating = (score: number | null) => {
    if (!isAuthenticated) {
      handleAuthRedirect();
      return;
    }

    setFeedbackError(null);
    const prevRating = userRating;
    const prevWatched = isWatched;

    setUserRating(score); // Optimistic
    if (score !== null) {
      setIsWatched(true);
    }

    startTransition(async () => {
      const res = await setMovieRatingAction({
        ...actionPayload,
        rating: score,
      });

      if (!res.success) {
        setUserRating(prevRating); // Rollback
        setIsWatched(prevWatched);
        setFeedbackError(res.error || "Failed to save rating.");
      } else {
        setUserRating(res.userRating ?? null);
        if (res.isWatched) {
          setIsWatched(true);
        }
      }
    });
  };

  return (
    <div className="space-y-4 rounded-2xl border border-[#232838] bg-[#12151F] p-5 shadow-lg">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#232838] pb-4">
        <div>
          <h2 className="font-sans text-sm font-semibold uppercase tracking-wider text-[#9DA8B8]">
            Personal Tracking & Log
          </h2>
          <p className="text-xs text-[#697487]">
            Log your viewing status and score independent of TMDB community ratings.
          </p>
        </div>

        {!isAuthenticated && (
          <button
            type="button"
            onClick={handleAuthRedirect}
            className="inline-flex items-center gap-1.5 rounded-full border border-[#F43F5E]/30 bg-[#F43F5E]/10 px-3 py-1 text-xs font-semibold text-[#F43F5E] transition-colors hover:bg-[#F43F5E]/20"
          >
            <LogIn className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Sign in to track</span>
          </button>
        )}
      </div>

      {feedbackError && (
        <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-3 text-xs text-red-300">
          <p className="font-semibold">Tracking Sync Notice:</p>
          <p className="mt-0.5 text-red-300/90">{feedbackError}</p>
        </div>
      )}

      {/* Action Buttons Row */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {/* Watchlist Toggle Button */}
        <button
          type="button"
          onClick={handleToggleWatchlist}
          disabled={isPending}
          aria-pressed={inWatchlist}
          className={`flex items-center justify-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-semibold transition-all focus-visible:outline-2 focus-visible:outline-[#06B6D4] ${
            inWatchlist
              ? "border-[#06B6D4] bg-[#06B6D4]/15 text-[#06B6D4] shadow-sm shadow-[#06B6D4]/20"
              : "border-[#232838] bg-[#090A0E] text-[#9DA8B8] hover:border-[#06B6D4]/50 hover:bg-[#1A1E2B] hover:text-[#F8FAFC]"
          }`}
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin text-[#06B6D4]" aria-hidden="true" />
          ) : (
            <Bookmark
              className={`h-4 w-4 transition-transform ${
                inWatchlist ? "fill-[#06B6D4] text-[#06B6D4] scale-110" : ""
              }`}
              aria-hidden="true"
            />
          )}
          <span>{inWatchlist ? "In Watchlist" : "Add to Watchlist"}</span>
        </button>

        {/* Watched Toggle Button */}
        <button
          type="button"
          onClick={handleToggleWatched}
          disabled={isPending}
          aria-pressed={isWatched}
          className={`flex items-center justify-center gap-2.5 rounded-xl border px-4 py-3 text-sm font-semibold transition-all focus-visible:outline-2 focus-visible:outline-[#F43F5E] ${
            isWatched
              ? "border-[#F43F5E] bg-[#F43F5E]/15 text-[#F43F5E] shadow-sm shadow-[#F43F5E]/20"
              : "border-[#232838] bg-[#090A0E] text-[#9DA8B8] hover:border-[#F43F5E]/50 hover:bg-[#1A1E2B] hover:text-[#F8FAFC]"
          }`}
        >
          {isPending ? (
            <Loader2 className="h-4 w-4 animate-spin text-[#F43F5E]" aria-hidden="true" />
          ) : (
            <Check
              className={`h-4 w-4 transition-transform ${
                isWatched ? "text-[#F43F5E] stroke-[3] scale-110" : ""
              }`}
              aria-hidden="true"
            />
          )}
          <span>{isWatched ? "Watched" : "Mark as Watched"}</span>
        </button>
      </div>

      {/* Personal Rating Scale (1 to 10) */}
      <div className="rounded-xl border border-[#232838] bg-[#090A0E] p-4">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <Star
              className={`h-4 w-4 ${
                userRating !== null ? "fill-[#FBBF24] text-[#FBBF24]" : "text-[#697487]"
              }`}
              aria-hidden="true"
            />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#9DA8B8]">
              Your Personal Rating
            </span>
          </div>

          <div className="flex items-center gap-2">
            {userRating !== null ? (
              <>
                <span className="font-mono text-xs font-bold text-[#FBBF24]">
                  {userRating} / 10
                </span>
                <button
                  type="button"
                  onClick={() => handleSetRating(null)}
                  disabled={isPending}
                  className="inline-flex items-center gap-1 rounded px-1.5 py-0.5 text-[11px] text-[#697487] hover:bg-[#1A1E2B] hover:text-red-400 transition-colors"
                  aria-label="Clear personal rating"
                  title="Remove your rating"
                >
                  <X className="h-3 w-3" aria-hidden="true" />
                  <span>Clear</span>
                </button>
              </>
            ) : (
              <span className="text-xs text-[#697487]">
                {hoverRating !== null ? `${hoverRating} / 10` : "Not rated yet"}
              </span>
            )}
          </div>
        </div>

        {/* 10-Star Interactive Scale */}
        <div
          className="flex items-center justify-between gap-1 sm:gap-2 px-1"
          role="radiogroup"
          aria-label="Rate this movie from 1 to 10"
          onMouseLeave={() => setHoverRating(null)}
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((score) => {
            const isFilled =
              hoverRating !== null ? score <= hoverRating : userRating !== null && score <= userRating;
            const isExact = userRating === score;

            return (
              <button
                key={score}
                type="button"
                role="radio"
                aria-checked={isExact}
                aria-label={`Rate ${score} out of 10`}
                disabled={isPending}
                onMouseEnter={() => setHoverRating(score)}
                onClick={() => handleSetRating(score)}
                className="group relative flex flex-1 flex-col items-center py-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FBBF24] rounded-lg transition-transform hover:scale-110 active:scale-95"
              >
                <Star
                  className={`h-5 w-5 sm:h-6 sm:w-6 transition-colors ${
                    isFilled
                      ? "fill-[#FBBF24] text-[#FBBF24] drop-shadow-[0_0_4px_rgba(251,191,36,0.5)]"
                      : "text-[#384157] group-hover:text-[#697487]"
                  }`}
                  aria-hidden="true"
                />
                <span
                  className={`mt-1 font-mono text-[10px] transition-colors ${
                    isFilled
                      ? "font-bold text-[#FBBF24]"
                      : "text-[#697487] group-hover:text-[#9DA8B8]"
                  }`}
                >
                  {score}
                </span>
              </button>
            );
          })}
        </div>

        {userRating !== null && (
          <div className="mt-3 flex items-center gap-1.5 pt-2 border-t border-[#232838]/60 text-[11px] text-[#9DA8B8]">
            <Sparkles className="h-3 w-3 text-[#FBBF24]" aria-hidden="true" />
            <span>
              Your rating of <strong className="text-[#FBBF24]">{userRating}/10</strong> is saved to your personal Viewing Diary.
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
