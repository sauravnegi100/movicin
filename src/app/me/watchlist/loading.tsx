export default function WatchlistLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      {/* Header Skeleton */}
      <div className="mb-8 flex items-center justify-between">
        <div className="space-y-2">
          <div className="h-4 w-24 rounded bg-[#1A1E2B] animate-pulse" />
          <div className="h-8 w-48 rounded-xl bg-[#1A1E2B] animate-pulse" />
        </div>
        <div className="h-9 w-32 rounded-xl bg-[#1A1E2B] animate-pulse" />
      </div>

      {/* Grid Skeleton */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="flex flex-col overflow-hidden rounded-xl border border-[#232838] bg-[#12151F] animate-pulse"
          >
            <div className="aspect-[2/3] w-full bg-[#1A1E2B]" />
            <div className="p-3 space-y-2">
              <div className="h-4 w-3/4 rounded bg-[#1A1E2B]" />
              <div className="h-3 w-1/2 rounded bg-[#1A1E2B]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
