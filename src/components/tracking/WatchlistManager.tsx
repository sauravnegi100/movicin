"use client";

import { useState, useTransition } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Trash2,
  Check,
  Star,
  Search,
  ExternalLink,
  Film,
} from "lucide-react";
import {
  toggleWatchlistAction,
  toggleWatchedAction,
} from "@/server/tracking/actions";
import type { WatchlistItem } from "@/types/database";

interface WatchlistManagerProps {
  initialItems: WatchlistItem[];
}

export function WatchlistManager({ initialItems }: WatchlistManagerProps) {
  const [items, setItems] = useState<WatchlistItem[]>(initialItems);
  const [searchQuery, setSearchQuery] = useState("");
  const [watchedMap, setWatchedMap] = useState<Record<number, boolean>>({});
  const [, startTransition] = useTransition();

  const handleRemove = (item: WatchlistItem) => {
    // Optimistic remove
    setItems((prev) => prev.filter((i) => i.id !== item.id));

    startTransition(async () => {
      const res = await toggleWatchlistAction({
        tmdbId: item.tmdb_id,
        title: item.title,
        posterPath: item.poster_path,
        releaseDate: item.release_date,
        voteAverage: item.vote_average,
      });

      if (!res.success) {
        // Rollback
        setItems((prev) => [item, ...prev]);
      }
    });
  };

  const handleMarkWatched = (item: WatchlistItem) => {
    const isAlreadyWatched = watchedMap[item.tmdb_id];
    setWatchedMap((prev) => ({ ...prev, [item.tmdb_id]: !isAlreadyWatched }));

    startTransition(async () => {
      await toggleWatchedAction({
        tmdbId: item.tmdb_id,
        title: item.title,
        posterPath: item.poster_path,
        releaseDate: item.release_date,
        voteAverage: item.vote_average,
      });
    });
  };

  const filteredItems = items.filter((item) =>
    item.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Search & Counter Toolbar */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-2">
          <span className="font-sans text-sm font-semibold text-[#F8FAFC]">
            {items.length} {items.length === 1 ? "Title" : "Titles"}
          </span>
          <span className="text-xs text-[#697487]">• Queue</span>
        </div>

        {items.length > 3 && (
          <div className="relative max-w-xs w-full">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#697487]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter your watchlist..."
              className="w-full rounded-xl border border-[#232838] bg-[#12151F] py-1.5 pl-8 pr-3 text-xs text-[#F8FAFC] placeholder-[#697487] focus:border-[#06B6D4] focus:outline-none"
            />
          </div>
        )}
      </div>

      {filteredItems.length === 0 && searchQuery ? (
        <div className="rounded-2xl border border-[#232838] bg-[#12151F] p-8 text-center text-[#9DA8B8]">
          <p className="text-sm">No titles match &ldquo;{searchQuery}&rdquo;</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {filteredItems.map((item) => {
            const isWatched = watchedMap[item.tmdb_id];
            const releaseYear = item.release_date
              ? new Date(item.release_date).getFullYear()
              : null;

            return (
              <article
                key={item.id}
                className="group relative flex flex-col overflow-hidden rounded-xl border border-[#232838] bg-[#12151F] transition-all hover:border-[#384157] hover:shadow-xl hover:shadow-black/60"
              >
                {/* Poster container */}
                <div className="relative aspect-[2/3] w-full overflow-hidden bg-[#1A1E2B]">
                  {item.poster_path ? (
                    <Image
                      src={
                        item.poster_path.startsWith("http")
                          ? item.poster_path
                          : `https://image.tmdb.org/t/p/w500${item.poster_path}`
                      }
                      alt={item.title}
                      fill
                      sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw"
                      className="object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full flex-col items-center justify-center p-4 text-center text-[#697487]">
                      <Film className="h-8 w-8 mb-2 text-[#384157]" aria-hidden="true" />
                      <span className="text-xs font-semibold text-[#9DA8B8] line-clamp-2">
                        {item.title}
                      </span>
                    </div>
                  )}

                  {/* Gradient Overlay */}
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-[#12151F] to-transparent opacity-80" />

                  {/* Top-Right: TMDB Score */}
                  {item.vote_average !== null && item.vote_average > 0 && (
                    <div className="absolute top-2 right-2 inline-flex items-center gap-1 rounded bg-[#090A0E]/85 px-1.5 py-0.5 text-[10px] font-semibold text-[#F8FAFC] backdrop-blur-sm border border-white/10">
                      <Star className="h-2.5 w-2.5 fill-[#FBBF24] text-[#FBBF24]" />
                      <span>{item.vote_average.toFixed(1)}</span>
                    </div>
                  )}

                  {/* Action Bar Overlay on Poster */}
                  <div className="absolute top-2 left-2 flex items-center gap-1.5 z-10">
                    {/* Mark Watched Button */}
                    <button
                      type="button"
                      onClick={() => handleMarkWatched(item)}
                      aria-label={`Mark ${item.title} as watched`}
                      title={isWatched ? "Marked Watched" : "Mark Watched"}
                      className={`flex h-7 w-7 items-center justify-center rounded-full backdrop-blur-sm border transition-all ${
                        isWatched
                          ? "border-[#F43F5E] bg-[#F43F5E] text-white"
                          : "border-white/10 bg-[#090A0E]/80 text-[#9DA8B8] hover:border-[#F43F5E] hover:text-[#F43F5E]"
                      }`}
                    >
                      <Check className="h-3.5 w-3.5" />
                    </button>

                    {/* Remove from Watchlist Button */}
                    <button
                      type="button"
                      onClick={() => handleRemove(item)}
                      aria-label={`Remove ${item.title} from watchlist`}
                      title="Remove from Watchlist"
                      className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-[#090A0E]/80 text-[#9DA8B8] backdrop-blur-sm transition-all hover:border-red-500/50 hover:bg-red-950/40 hover:text-red-300"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Details */}
                <div className="flex flex-1 flex-col justify-between p-3">
                  <div>
                    <h3 className="font-sans text-xs font-semibold text-[#F8FAFC] line-clamp-1 group-hover:text-[#06B6D4] transition-colors">
                      <Link href={`/movie/${item.tmdb_id}`}>
                        {item.title}
                      </Link>
                    </h3>
                    <div className="mt-1 flex items-center justify-between text-[11px] text-[#697487]">
                      <span>{releaseYear || "TBA"}</span>
                      <Link
                        href={`/movie/${item.tmdb_id}`}
                        className="inline-flex items-center gap-1 text-[#06B6D4] hover:underline"
                        aria-label={`View details for ${item.title}`}
                      >
                        <span>View</span>
                        <ExternalLink className="h-2.5 w-2.5" />
                      </Link>
                    </div>
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
