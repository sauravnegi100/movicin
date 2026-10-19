import Link from "next/link";
import { Film, ArrowLeft, Search } from "lucide-react";

export default function MovieNotFound() {
  return (
    <div className="mx-auto flex min-h-[60vh] max-w-xl flex-col items-center justify-center px-4 py-16 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-[#232838] bg-[#12151F] text-[#F43F5E] mb-6 shadow-xl">
        <Film className="h-8 w-8" aria-hidden="true" />
      </div>

      <h1 className="font-sans text-2xl font-bold tracking-tight text-[#F8FAFC] sm:text-3xl">
        Movie Not Found
      </h1>

      <p className="mt-3 text-sm leading-relaxed text-[#9DA8B8]">
        The motion picture you requested could not be located in the catalog. The title ID may be invalid or it may have been removed from the provider&apos;s database.
      </p>

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/discover"
          className="inline-flex items-center gap-2 rounded-xl bg-[#F43F5E] px-5 py-2.5 text-xs font-semibold text-white shadow-lg transition-colors hover:bg-[#e11d48]"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back to Discover</span>
        </Link>

        <Link
          href="/search"
          className="inline-flex items-center gap-2 rounded-xl border border-[#232838] bg-[#12151F] px-5 py-2.5 text-xs font-semibold text-[#F8FAFC] transition-colors hover:border-[#384157]"
        >
          <Search className="h-4 w-4" aria-hidden="true" />
          <span>Search Catalog</span>
        </Link>
      </div>
    </div>
  );
}
