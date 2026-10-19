"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { SlidersHorizontal, RotateCcw } from "lucide-react";
import { AVAILABLE_GENRES } from "@/types/database";

interface DiscoverFiltersProps {
  currentCategory: string;
  currentGenre?: number;
  currentSort: string;
  currentYear?: number;
}

const CATEGORIES = [
  { id: "trending", label: "Trending" },
  { id: "popular", label: "Popular" },
  { id: "upcoming", label: "Upcoming" },
  { id: "discover", label: "All Catalog" },
];

const SORT_OPTIONS = [
  { id: "popularity.desc", label: "Most Popular" },
  { id: "vote_average.desc", label: "Highest Rated (TMDB)" },
  { id: "primary_release_date.desc", label: "Newest Release" },
];

export function DiscoverFilters({
  currentCategory,
  currentGenre,
  currentSort,
  currentYear,
}: DiscoverFiltersProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === null || value === "") {
      params.delete(key);
    } else {
      params.set(key, value);
    }
    // Always reset to page 1 when changing filters
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  const resetFilters = () => {
    router.push(pathname);
  };

  const hasActiveFilters = Boolean(
    (currentCategory && currentCategory !== "trending") ||
      currentGenre ||
      (currentSort && currentSort !== "popularity.desc") ||
      currentYear
  );

  return (
    <div className="space-y-4 rounded-2xl border border-[#232838] bg-[#12151F] p-4 sm:p-5">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-[#232838] pb-4">
        <div className="flex flex-wrap items-center gap-1.5" role="tablist" aria-label="Catalog Categories">
          {CATEGORIES.map((cat) => {
            const isActive = currentCategory === cat.id;
            return (
              <button
                key={cat.id}
                role="tab"
                aria-selected={isActive}
                type="button"
                onClick={() => updateParam("category", cat.id)}
                className={`rounded-full px-4 py-1.5 text-xs font-semibold transition-all ${
                  isActive
                    ? "bg-[#F43F5E] text-white shadow-md shadow-[#F43F5E]/20"
                    : "bg-[#1A1E2B] text-[#9DA8B8] hover:bg-[#232838] hover:text-[#F8FAFC]"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {hasActiveFilters && (
          <button
            type="button"
            onClick={resetFilters}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-[#9DA8B8] transition-colors hover:text-[#F43F5E]"
          >
            <RotateCcw className="h-3.5 w-3.5" aria-hidden="true" />
            <span>Reset filters</span>
          </button>
        )}
      </div>

      {/* Filter Controls Row */}
      <div className="flex flex-wrap items-center gap-3">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#9DA8B8] mr-1">
          <SlidersHorizontal className="h-3.5 w-3.5 text-[#F43F5E]" aria-hidden="true" />
          <span>Filters:</span>
        </div>

        {/* Genre Selector */}
        <div className="flex-1 min-w-[140px] max-w-[200px]">
          <label htmlFor="filter-genre" className="sr-only">
            Filter by Genre
          </label>
          <select
            id="filter-genre"
            value={currentGenre ? String(currentGenre) : ""}
            onChange={(e) => updateParam("genre", e.target.value || null)}
            className="w-full rounded-xl border border-[#232838] bg-[#090A0E] px-3 py-1.5 text-xs font-medium text-[#F8FAFC] transition-colors focus:border-[#F43F5E] focus:outline-none"
          >
            <option value="">All Genres</option>
            {AVAILABLE_GENRES.map((g) => (
              <option key={g.id} value={g.id}>
                {g.name}
              </option>
            ))}
          </select>
        </div>

        {/* Sort Selector */}
        <div className="flex-1 min-w-[160px] max-w-[220px]">
          <label htmlFor="filter-sort" className="sr-only">
            Sort Order
          </label>
          <select
            id="filter-sort"
            value={currentSort || "popularity.desc"}
            onChange={(e) => updateParam("sort", e.target.value || null)}
            className="w-full rounded-xl border border-[#232838] bg-[#090A0E] px-3 py-1.5 text-xs font-medium text-[#F8FAFC] transition-colors focus:border-[#F43F5E] focus:outline-none"
          >
            {SORT_OPTIONS.map((opt) => (
              <option key={opt.id} value={opt.id}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>

        {/* Release Year Selector */}
        <div className="flex-1 min-w-[120px] max-w-[160px]">
          <label htmlFor="filter-year" className="sr-only">
            Release Year
          </label>
          <select
            id="filter-year"
            value={currentYear ? String(currentYear) : ""}
            onChange={(e) => updateParam("year", e.target.value || null)}
            className="w-full rounded-xl border border-[#232838] bg-[#090A0E] px-3 py-1.5 text-xs font-medium text-[#F8FAFC] transition-colors focus:border-[#F43F5E] focus:outline-none"
          >
            <option value="">Any Year</option>
            {[2026, 2025, 2024, 2023, 2022, 2021, 2020, 2019, 2015, 2010, 2000, 1990].map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
