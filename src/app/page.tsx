import Link from "next/link";
import { getBrandName } from "@/config/brand";
import { Compass, Star, BookOpen, ShieldCheck, ArrowRight, Film } from "lucide-react";

export default function HomePage() {
  const brandName = getBrandName();

  const corePillars = [
    {
      title: "What to Watch Next",
      description:
        "Explore curated collections, trending titles, and streaming releases organized for thoughtful discovery.",
      icon: Compass,
      accent: "text-[#06B6D4]",
    },
    {
      title: "Trustworthy 0–10 Ratings",
      description:
        "Independent community scoring with 0.5 increments, clearly distinguished from external aggregator scores.",
      icon: Star,
      accent: "text-[#FBBF24]",
    },
    {
      title: "Personal Viewing Diary",
      description:
        "Log viewing dates, record rewatches, maintain organized watchlists, and keep private viewing notes.",
      icon: BookOpen,
      accent: "text-[#F43F5E]",
    },
    {
      title: "Strict Spoiler Safety",
      description:
        "Layered spoiler protection concealing plot revelations, surprise guest cameos, and sensitive imagery.",
      icon: ShieldCheck,
      accent: "text-[#10B981]",
    },
  ];

  return (
    <div className="relative isolate overflow-hidden">
      {/* Ambient Theater Glow */}
      <div
        className="pointer-events-none absolute -top-40 left-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 rounded-full bg-gradient-to-b from-[#F43F5E]/15 to-transparent blur-3xl"
        aria-hidden="true"
      />

      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 sm:pt-28 sm:pb-20 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-[#232838] bg-[#12151F] px-3.5 py-1 text-xs font-medium text-[#9DA8B8]">
            <Film className="h-3.5 w-3.5 text-[#F43F5E]" aria-hidden="true" />
            <span>Phase 1 — Foundation Active</span>
          </div>

          <h1 className="mt-6 font-sans text-4xl font-extrabold tracking-tight text-[#F8FAFC] sm:text-6xl">
            Discover. Rate. Remember.
          </h1>

          <p className="mt-6 text-lg leading-8 text-[#9DA8B8]">
            Welcome to <span className="font-semibold text-[#F8FAFC]">{brandName}</span>, a refined cinematic platform designed for movie lovers to explore films, maintain a personal viewing diary, and share authentic ratings.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/discover"
              className="inline-flex items-center gap-2 rounded-full bg-[#F43F5E] px-6 py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-105 hover:bg-[#e11d48]"
            >
              <span>Explore Catalog</span>
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>

            <Link
              href="/login"
              className="inline-flex items-center rounded-full border border-[#232838] bg-[#12151F] px-6 py-3 text-sm font-semibold text-[#F8FAFC] transition-colors hover:border-[#697487] hover:bg-[#1A1E2B]"
            >
              Sign In / Register
            </Link>
          </div>
        </div>
      </section>

      {/* Value Pillars Section */}
      <section
        className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8"
        aria-labelledby="features-heading"
      >
        <div className="border-t border-[#232838] pt-16">
          <h2
            id="features-heading"
            className="text-center font-sans text-2xl font-bold tracking-tight text-[#F8FAFC] sm:text-3xl"
          >
            Built for Cinephiles & Casual Viewers
          </h2>
          <p className="mt-3 text-center text-sm text-[#697487]">
            Core pillars guiding the design and engineering of {brandName}.
          </p>

          <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {corePillars.map((pillar) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={pillar.title}
                  className="rounded-2xl border border-[#232838] bg-[#12151F] p-6 transition-colors hover:border-[#384158]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#1A1E2B]">
                    <Icon className={`h-5 w-5 ${pillar.accent}`} aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-base font-semibold text-[#F8FAFC]">
                    {pillar.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-[#9DA8B8]">
                    {pillar.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
