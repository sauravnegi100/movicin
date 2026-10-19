import { redirect } from "next/navigation";
import { connection } from "next/server";
import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getUserWatchlist } from "@/server/tracking/actions";
import { WatchlistManager } from "@/components/tracking/WatchlistManager";
import { Bookmark, Compass, ArrowLeft, AlertCircle } from "lucide-react";

export const instant = false;

export const metadata: Metadata = {
  title: "My Watchlist",
  description: "Personal movie watchlist queued for viewing.",
};

export default async function WatchlistPage() {
  await connection();
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/me/watchlist");
  }

  const { data: items, isTableMissing } = await getUserWatchlist();

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 min-h-[70vh]">
      {/* Top Header */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <Link
            href="/me"
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#9DA8B8] hover:text-[#F8FAFC] transition-colors mb-2"
          >
            <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Back to Profile</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 text-[#06B6D4]">
              <Bookmark className="h-5 w-5 fill-[#06B6D4]" aria-hidden="true" />
            </div>
            <div>
              <h1 className="font-sans text-2xl font-bold tracking-tight text-[#F8FAFC]">
                My Watchlist
              </h1>
              <p className="text-xs text-[#9DA8B8]">
                Titles queued for your upcoming movie nights.
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/discover"
          className="inline-flex items-center gap-2 rounded-xl border border-[#232838] bg-[#12151F] px-4 py-2 text-xs font-medium text-[#F8FAFC] transition-colors hover:border-[#06B6D4] hover:text-[#06B6D4]"
        >
          <Compass className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Explore Catalog</span>
        </Link>
      </div>

      {/* Migration Notice if table not yet run */}
      {isTableMissing && (
        <div className="mb-6 rounded-2xl border border-amber-500/30 bg-amber-950/20 p-5 text-xs text-amber-300">
          <div className="flex items-center gap-2 font-semibold">
            <AlertCircle className="h-4 w-4" aria-hidden="true" />
            <span>Database Setup Pending</span>
          </div>
          <p className="mt-1 text-amber-300/80">
            The tracking migration has not yet been executed in your Supabase project. Run migration{" "}
            <code className="font-mono bg-amber-950/50 px-1 py-0.5 rounded text-amber-200">
              20261020000001_movie_tracking.sql
            </code>{" "}
            in your Supabase SQL Editor to enable real-time cloud persistence.
          </p>
        </div>
      )}

      {/* Content: Empty State vs Watchlist Grid */}
      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-[#232838] bg-[#12151F] p-12 text-center shadow-xl">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#06B6D4]/10 border border-[#06B6D4]/20 text-[#06B6D4] mb-4">
            <Bookmark className="h-8 w-8" aria-hidden="true" />
          </div>
          <h2 className="font-sans text-lg font-bold text-[#F8FAFC]">
            Your Watchlist is Empty
          </h2>
          <p className="mt-2 max-w-sm text-xs text-[#9DA8B8] leading-relaxed">
            You haven&apos;t queued any movies yet. Find films you want to see and tap
            the bookmark icon to save them here.
          </p>
          <Link
            href="/discover"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#06B6D4] px-5 py-2.5 text-xs font-semibold text-black transition-opacity hover:opacity-90"
          >
            <Compass className="h-4 w-4" aria-hidden="true" />
            <span>Browse Trending Films</span>
          </Link>
        </div>
      ) : (
        <WatchlistManager initialItems={items} />
      )}
    </div>
  );
}
