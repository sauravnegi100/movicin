import { redirect } from "next/navigation";
import { connection } from "next/server";
import Link from "next/link";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { getUserDiary } from "@/server/tracking/actions";
import { DiaryManager } from "@/components/tracking/DiaryManager";
import { BookOpen, Compass, ArrowLeft, AlertCircle } from "lucide-react";

export const instant = false;

export const metadata: Metadata = {
  title: "My Viewing Diary",
  description: "Personal chronological movie diary and rating archive.",
};

export default async function DiaryPage() {
  await connection();
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/me/diary");
  }

  const { data: movies, isTableMissing } = await getUserDiary();

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
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#F43F5E]/10 border border-[#F43F5E]/20 text-[#F43F5E]">
              <BookOpen className="h-5 w-5" aria-hidden="true" />
            </div>
            <div>
              <h1 className="font-sans text-2xl font-bold tracking-tight text-[#F8FAFC]">
                Viewing Diary
              </h1>
              <p className="text-xs text-[#9DA8B8]">
                Chronological log of watched movies with your personal ratings.
              </p>
            </div>
          </div>
        </div>

        <Link
          href="/discover"
          className="inline-flex items-center gap-2 rounded-xl border border-[#232838] bg-[#12151F] px-4 py-2 text-xs font-medium text-[#F8FAFC] transition-colors hover:border-[#F43F5E] hover:text-[#F43F5E]"
        >
          <Compass className="h-3.5 w-3.5" aria-hidden="true" />
          <span>Discover More Films</span>
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

      {/* Content: Empty State vs Diary List */}
      {movies.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-3xl border border-[#232838] bg-[#12151F] p-12 text-center shadow-xl">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-[#F43F5E]/10 border border-[#F43F5E]/20 text-[#F43F5E] mb-4">
            <BookOpen className="h-8 w-8" aria-hidden="true" />
          </div>
          <h2 className="font-sans text-lg font-bold text-[#F8FAFC]">
            No Films Logged in Your Diary
          </h2>
          <p className="mt-2 max-w-sm text-xs text-[#9DA8B8] leading-relaxed">
            Record the movies you watch, track viewing dates, and submit your personal
            scores to build your personal cinema timeline.
          </p>
          <Link
            href="/discover"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#F43F5E] px-5 py-2.5 text-xs font-semibold text-white transition-opacity hover:opacity-90"
          >
            <Compass className="h-4 w-4" aria-hidden="true" />
            <span>Explore Movies to Log</span>
          </Link>
        </div>
      ) : (
        <DiaryManager initialMovies={movies} />
      )}
    </div>
  );
}
