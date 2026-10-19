export default function MovieDetailLoading() {
  return (
    <div className="relative min-h-screen">
      {/* Ambient backdrop skeleton */}
      <div className="absolute inset-x-0 top-0 h-[480px] bg-[#12151F]/40 animate-pulse -z-10" />

      <div className="mx-auto max-w-7xl px-4 pt-6 pb-16 sm:px-6 lg:px-8 animate-pulse">
        {/* Breadcrumb skeleton */}
        <div className="mb-6 h-4 w-28 rounded bg-[#1A1E2B]" />

        {/* Main Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 lg:gap-12">
          {/* Left Column: Poster & Quick Info */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="aspect-[2/3] w-full rounded-2xl border border-[#232838] bg-[#12151F]" />
            <div className="mt-4 rounded-xl border border-[#232838] bg-[#12151F] p-4 space-y-3">
              <div className="h-3 w-3/4 rounded bg-[#1A1E2B]" />
              <div className="h-3 w-1/2 rounded bg-[#1A1E2B]" />
              <div className="h-3 w-2/3 rounded bg-[#1A1E2B]" />
              <div className="h-3 w-1/2 rounded bg-[#1A1E2B]" />
            </div>
          </div>

          {/* Right Column: Title Info, Ratings, Synopsis, Trailer & Cast */}
          <div className="space-y-6 md:col-span-8 lg:col-span-9">
            <div className="space-y-3">
              <div className="h-10 w-3/4 rounded-xl bg-[#12151F]" />
              <div className="h-4 w-1/3 rounded bg-[#1A1E2B]" />
              <div className="flex gap-2 pt-2">
                <div className="h-7 w-20 rounded-full bg-[#12151F]" />
                <div className="h-7 w-24 rounded-full bg-[#12151F]" />
                <div className="h-7 w-16 rounded-full bg-[#12151F]" />
              </div>
            </div>

            {/* Ratings Block skeleton */}
            <div className="h-24 w-full rounded-2xl border border-[#232838] bg-[#12151F]" />

            {/* Synopsis skeleton */}
            <div className="space-y-2">
              <div className="h-5 w-24 rounded bg-[#12151F]" />
              <div className="h-4 w-full rounded bg-[#1A1E2B]" />
              <div className="h-4 w-5/6 rounded bg-[#1A1E2B]" />
              <div className="h-4 w-4/6 rounded bg-[#1A1E2B]" />
            </div>

            {/* Trailer skeleton */}
            <div className="space-y-3 pt-4 border-t border-[#232838]">
              <div className="h-5 w-32 rounded bg-[#12151F]" />
              <div className="aspect-video w-full rounded-2xl border border-[#232838] bg-[#12151F]" />
            </div>

            {/* Cast skeleton */}
            <div className="space-y-3 pt-4 border-t border-[#232838]">
              <div className="h-5 w-24 rounded bg-[#12151F]" />
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 rounded-xl border border-[#232838] bg-[#12151F] p-2.5"
                  >
                    <div className="h-11 w-11 shrink-0 rounded-full bg-[#1A1E2B]" />
                    <div className="flex-1 space-y-1.5">
                      <div className="h-3 w-3/4 rounded bg-[#1A1E2B]" />
                      <div className="h-2 w-1/2 rounded bg-[#1A1E2B]" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
