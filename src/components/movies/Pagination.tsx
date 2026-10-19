"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // TMDB caps maximum pages to 500
  const maxSafePages = Math.min(totalPages, 500);

  if (maxSafePages <= 1) return null;

  const navigateToPage = (page: number) => {
    if (page < 1 || page > maxSafePages || page === currentPage) return;
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <nav
      role="navigation"
      aria-label="Pagination Navigation"
      className="mt-12 flex items-center justify-center gap-2"
    >
      {/* Previous Page Button */}
      <button
        type="button"
        onClick={() => navigateToPage(currentPage - 1)}
        disabled={currentPage <= 1}
        aria-label="Go to previous page"
        className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-[#232838] bg-[#12151F] px-3 text-xs font-medium text-[#9DA8B8] transition-colors hover:border-[#384157] hover:text-[#F8FAFC] disabled:pointer-events-none disabled:opacity-40"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page Info Pill */}
      <div className="flex items-center gap-1 rounded-lg border border-[#232838] bg-[#090A0E] px-3.5 py-1.5 text-xs font-medium text-[#F8FAFC]">
        <span>Page</span>
        <span className="font-bold text-[#F43F5E]">{currentPage}</span>
        <span className="text-[#697487]">of</span>
        <span className="text-[#9DA8B8]">{maxSafePages}</span>
      </div>

      {/* Next Page Button */}
      <button
        type="button"
        onClick={() => navigateToPage(currentPage + 1)}
        disabled={currentPage >= maxSafePages}
        aria-label="Go to next page"
        className="inline-flex h-9 items-center justify-center gap-1.5 rounded-lg border border-[#232838] bg-[#12151F] px-3 text-xs font-medium text-[#9DA8B8] transition-colors hover:border-[#384157] hover:text-[#F8FAFC] disabled:pointer-events-none disabled:opacity-40"
      >
        <span className="hidden sm:inline">Next</span>
        <ChevronRight className="h-4 w-4" aria-hidden="true" />
      </button>
    </nav>
  );
}
