export default function DiaryLoading() {
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

      {/* Filter Bar Skeleton */}
      <div className="mb-6 h-14 rounded-2xl border border-[#232838] bg-[#12151F] animate-pulse" />

      {/* Grid Skeleton */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="flex gap-3.5 rounded-2xl border border-[#232838] bg-[#12151F] p-3 animate-pulse"
          >
            <div className="h-28 w-20 shrink-0 rounded-xl bg-[#1A1E2B]" />
            <div className="flex-1 space-y-3 py-1">
              <div className="h-4 w-3/4 rounded bg-[#1A1E2B]" />
              <div className="h-3 w-1/2 rounded bg-[#1A1E2B]" />
              <div className="h-5 w-24 rounded bg-[#1A1E2B]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
