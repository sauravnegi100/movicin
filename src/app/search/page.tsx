import type { Metadata } from "next";
import { connection } from "next/server";
import { SearchClient } from "@/components/movies/SearchClient";
import {
  searchMovies,
  isTmdbConfigured,
  mapTmdbMovieToCard,
} from "@/lib/providers/tmdb";
import { Search as SearchIcon } from "lucide-react";

export const instant = false;

export const metadata: Metadata = {
  title: "Search Movies | Movicin",
  description: "Search for movies across millions of titles, directors, and genres on Movicin.",
};

interface SearchPageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  await connection();
  const params = await searchParams;
  const rawQuery = (params.q as string)?.trim() || "";
  const isConfigured = isTmdbConfigured();

  let initialResults: ReturnType<typeof mapTmdbMovieToCard>[] = [];
  let initialTotalResults = 0;
  let initialError: string | null = null;

  if (isConfigured && rawQuery) {
    const response = await searchMovies(rawQuery, 1);
    if (response.error) {
      initialError = response.error;
    } else if (response.data) {
      initialResults = response.data.results.map(mapTmdbMovieToCard);
      initialTotalResults = response.data.total_results;
    }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Search Header */}
      <div className="mb-8 text-center">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#F43F5E]">
          <SearchIcon className="h-4 w-4 text-[#F43F5E]" aria-hidden="true" />
          <span>Catalog Search</span>
        </div>
        <h1 className="mt-2 font-sans text-3xl font-extrabold tracking-tight text-[#F8FAFC] sm:text-4xl">
          Find Any Film
        </h1>
        <p className="mt-2 text-sm text-[#9DA8B8]">
          Instant search across global cinema, indie masterpieces, and blockbusters.
        </p>
      </div>

      <SearchClient
        key={rawQuery}
        initialQuery={rawQuery}
        initialResults={initialResults}
        initialTotalResults={initialTotalResults}
        initialError={initialError}
        isConfigured={isConfigured}
      />
    </div>
  );
}
