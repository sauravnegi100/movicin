export default function MovieDetailLoading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 animate-pulse">
      {/* Backdrop skeleton */}
      <div className="relative mb-8 h-64 sm:h-96 w-full rounded-3xl bg-[#12151F] border border-[#232838]" />

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 lg:grid-cols-4">
        {/* Poster skeleton */}
        <div className="aspect-[2/3] w-full rounded-2xl bg-[#12151F] border border-[#232838]" />

        {/* Details skeleton */}
        <div className="space-y-4 md:col-span-2 lg:col-span-3">
          <div className="h-8 w-3/4 rounded-lg bg-[#12151F]" />
          <div className="h-4 w-1/2 rounded bg-[#12151F]" />
          <div className="h-24 w-full rounded-xl bg-[#12151F]" />
          <div className="flex gap-2">
            <div className="h-8 w-20 rounded-full bg-[#12151F]" />
            <div className="h-8 w-24 rounded-full bg-[#12151F]" />
            <div className="h-8 w-20 rounded-full bg-[#12151F]" />
          </div>
        </div>
      </div>
    </div>
  );
}
