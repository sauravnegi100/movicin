"use client";

import { useState, useEffect, useCallback } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Search, X, Loader2, Film, AlertCircle } from "lucide-react";
import { type MovieCardData } from "@/lib/providers/tmdb/types";
import { MovieGrid } from "./MovieGrid";
import { TmdbMissingKeyAlert } from "./TmdbMissingKeyAlert";

interface SearchClientProps {
  initialQuery?: string;
  initialResults?: MovieCardData[];
  initialTotalResults?: number;
  initialError?: string | null;
  isConfigured: boolean;
}

export function SearchClient({
  initialQuery = "",
  initialResults = [],
  initialTotalResults = 0,
  initialError = null,
  isConfigured,
}: SearchClientProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [query, setQuery] = useState(initialQuery);
  const [results, setResults] = useState<MovieCardData[]>(initialResults);
  const [totalResults, setTotalResults] = useState(initialTotalResults);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(initialError);
  const [hasSearched, setHasSearched] = useState(Boolean(initialQuery.trim()));

  const executeSearch = useCallback(
    async (searchQuery: string) => {
      const trimmed = searchQuery.trim();
      if (!trimmed) {
        setResults([]);
        setTotalResults(0);
        setError(null);
        setHasSearched(false);
        const params = new URLSearchParams(searchParams.toString());
        params.delete("q");
        router.replace(params.toString() ? `${pathname}?${params.toString()}` : pathname);
        return;
      }

      if (!isConfigured) {
        setHasSearched(true);
        return;
      }

      setIsLoading(true);
      setError(null);
      setHasSearched(true);

      // Update URL query string
      const params = new URLSearchParams(searchParams.toString());
      params.set("q", trimmed);
      router.replace(`${pathname}?${params.toString()}`);

      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(trimmed)}`);
        const data = await res.json();

        if (!res.ok || data.error) {
          setError(data.error || "Unable to complete search request.");
          setResults([]);
          setTotalResults(0);
        } else {
          setResults(data.results || []);
          setTotalResults(data.total_results || 0);
        }
      } catch {
        setError("Network error while searching. Please check your connection.");
        setResults([]);
        setTotalResults(0);
      } finally {
        setIsLoading(false);
      }
    },
    [isConfigured, pathname, router, searchParams]
  );

  // Debounced search handler (300ms debounce)
  useEffect(() => {
    // If query matches initialQuery, don't re-fetch
    if (query === initialQuery) return;

    const timer = setTimeout(() => {
      executeSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, initialQuery, executeSearch]);

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setTotalResults(0);
    setError(null);
    setHasSearched(false);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("q");
    router.replace(params.toString() ? `${pathname}?${params.toString()}` : pathname);
  };

  return (
    <div className="space-y-8">
      {/* Search Input Box */}
      <div className="relative mx-auto max-w-2xl">
        <div className="relative flex items-center">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4 text-[#9DA8B8]">
            {isLoading ? (
              <Loader2 className="h-5 w-5 animate-spin text-[#F43F5E]" aria-hidden="true" />
            ) : (
              <Search className="h-5 w-5" aria-hidden="true" />
            )}
          </div>

          <input
            type="text"
            role="searchbox"
            aria-label="Search movies by title"
            value={query}
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                executeSearch(query);
              } else if (e.key === "Escape") {
                handleClear();
              }
            }}
            placeholder="Search movies by title (e.g. Interstellar, Past Lives, Dune)..."
            className="w-full rounded-2xl border border-[#232838] bg-[#12151F] py-4 pl-12 pr-12 text-sm text-[#F8FAFC] shadow-lg shadow-black/40 placeholder-[#697487] transition-all focus:border-[#F43F5E] focus:outline-none focus:ring-2 focus:ring-[#F43F5E]/20"
          />

          {query && (
            <button
              type="button"
              onClick={handleClear}
              aria-label="Clear search input"
              className="absolute inset-y-0 right-0 flex items-center pr-4 text-[#9DA8B8] transition-colors hover:text-[#F8FAFC]"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </div>

        <div className="mt-2 flex items-center justify-between px-2 text-xs text-[#697487]">
          <span>Press Enter to search instantly or Escape to clear</span>
          {isConfigured && hasSearched && totalResults > 0 && (
            <span>{totalResults.toLocaleString()} titles found</span>
          )}
        </div>
      </div>

      {/* State: Missing TMDB Key */}
      {!isConfigured && (
        <div className="py-4">
          <TmdbMissingKeyAlert
            title="TMDB Metadata Required for Search"
            description="Live title search relies on The Movie Database API. Configure your TMDB_API_KEY in .env.local to enable catalog search."
          />
        </div>
      )}

      {/* State: Error */}
      {isConfigured && error && (
        <div
          role="alert"
          className="mx-auto max-w-xl rounded-xl border border-red-500/30 bg-[#12151F] p-4 text-center text-xs text-red-300 flex items-center justify-center gap-2"
        >
          <AlertCircle className="h-4 w-4 shrink-0 text-red-400" aria-hidden="true" />
          <span>{error}</span>
        </div>
      )}

      {/* State: Results Grid */}
      {isConfigured && hasSearched && !isLoading && results.length > 0 && (
        <div className="space-y-4">
          <h2 className="font-sans text-lg font-bold text-[#F8FAFC]">
            Results for <span className="text-[#F43F5E]">&ldquo;{query.trim()}&rdquo;</span>
          </h2>
          <MovieGrid movies={results} />
        </div>
      )}

      {/* State: No Results */}
      {isConfigured && hasSearched && !isLoading && !error && results.length === 0 && (
        <div className="mx-auto max-w-md rounded-2xl border border-dashed border-[#232838] bg-[#12151F]/40 p-12 text-center">
          <Film className="mx-auto h-10 w-10 text-[#384157] mb-3" aria-hidden="true" />
          <h3 className="font-sans text-base font-semibold text-[#F8FAFC]">
            No movies found
          </h3>
          <p className="mt-1 text-xs text-[#9DA8B8]">
            We couldn&apos;t find any titles matching &ldquo;{query.trim()}&rdquo;. Try checking for spelling or searching with alternative keywords.
          </p>
        </div>
      )}

      {/* State: Initial Empty Prompt */}
      {isConfigured && !hasSearched && (
        <div className="mx-auto max-w-md py-12 text-center text-[#697487]">
          <Film className="mx-auto h-12 w-12 text-[#232838] mb-3" aria-hidden="true" />
          <h3 className="text-sm font-medium text-[#9DA8B8]">Explore the Cinematic Catalog</h3>
          <p className="mt-1 text-xs">
            Search across millions of motion pictures, classic releases, and international cinema.
          </p>
        </div>
      )}
    </div>
  );
}
