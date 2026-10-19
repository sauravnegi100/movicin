import type { Metadata } from "next";
import { connection } from "next/server";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getMovieDetails,
  isTmdbConfigured,
  mapTmdbDetailsToDomain,
} from "@/lib/providers/tmdb";
import { getBrandName, BRAND_CONFIG } from "@/config/brand";
import { TmdbMissingKeyAlert } from "@/components/movies/TmdbMissingKeyAlert";
import {
  Star,
  Clock,
  Calendar,
  ArrowLeft,
  Film,
  ExternalLink,
  ShieldCheck,
  User,
} from "lucide-react";

export const instant = false;

interface MovieDetailPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: MovieDetailPageProps): Promise<Metadata> {
  const { id: rawId } = await params;
  const movieId = parseInt(rawId, 10);
  const brandName = getBrandName();

  if (isNaN(movieId) || movieId <= 0 || !isTmdbConfigured()) {
    return {
      title: `Movie Details | ${brandName}`,
    };
  }

  const response = await getMovieDetails(movieId);
  if (!response.data) {
    return {
      title: `Movie Not Found | ${brandName}`,
    };
  }

  const movie = mapTmdbDetailsToDomain(response.data);
  const yearSuffix = movie.releaseYear ? ` (${movie.releaseYear})` : "";

  return {
    title: `${movie.title}${yearSuffix} | ${brandName}`,
    description: movie.overview.slice(0, 160),
    openGraph: {
      title: `${movie.title}${yearSuffix}`,
      description: movie.overview,
      images: movie.backdropUrl
        ? [{ url: movie.backdropUrl, width: 1280, height: 720, alt: movie.title }]
        : movie.posterUrl
        ? [{ url: movie.posterUrl, width: 780, height: 1170, alt: movie.title }]
        : [],
    },
  };
}

export default async function MovieDetailPage({ params }: MovieDetailPageProps) {
  await connection();
  const { id: rawId } = await params;
  const movieId = parseInt(rawId, 10);
  const brandName = getBrandName();

  if (isNaN(movieId) || movieId <= 0) {
    notFound();
  }

  const isConfigured = isTmdbConfigured();

  if (!isConfigured) {
    return (
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <Link
          href="/discover"
          className="inline-flex items-center gap-2 text-xs font-medium text-[#9DA8B8] hover:text-[#F8FAFC] transition-colors mb-6"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Back to Discover</span>
        </Link>
        <TmdbMissingKeyAlert
          title="TMDB Metadata Required to View Movie"
          description="Live title details, backdrop artwork, and cast credits are streamed via TMDB. Set your TMDB_API_KEY in .env.local to access title details."
        />
      </div>
    );
  }

  const response = await getMovieDetails(movieId);

  if (response.error?.includes("not found") || !response.data) {
    notFound();
  }

  if (response.error) {
    return (
      <div className="mx-auto max-w-2xl px-4 py-16 text-center text-[#F8FAFC]">
        <h1 className="font-sans text-2xl font-bold">Unable to Load Movie</h1>
        <p className="mt-2 text-sm text-[#9DA8B8]">{response.error}</p>
        <Link
          href="/discover"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#F43F5E] px-4 py-2 text-xs font-semibold text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          <span>Return to Catalog</span>
        </Link>
      </div>
    );
  }

  const movie = mapTmdbDetailsToDomain(response.data);

  return (
    <article className="relative min-h-screen">
      {/* Ambient Backdrop Header */}
      {movie.backdropUrl && (
        <div className="absolute inset-x-0 top-0 h-[480px] overflow-hidden -z-10">
          <Image
            src={movie.backdropUrl}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-top opacity-25 filter blur-[1px]"
          />
          <div
            className="absolute inset-0 bg-gradient-to-b from-[#090A0E]/60 via-[#090A0E]/80 to-[#090A0E]"
            aria-hidden="true"
          />
        </div>
      )}

      <div className="mx-auto max-w-7xl px-4 pt-6 pb-16 sm:px-6 lg:px-8">
        {/* Navigation Breadcrumb */}
        <div className="mb-6">
          <Link
            href="/discover"
            className="inline-flex items-center gap-2 text-xs font-medium text-[#9DA8B8] hover:text-[#F8FAFC] transition-colors"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
            <span>Back to Catalog</span>
          </Link>
        </div>

        {/* Main Title Section */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 lg:gap-12">
          {/* Left Column: Poster Card */}
          <div className="md:col-span-4 lg:col-span-3">
            <div className="relative aspect-[2/3] w-full overflow-hidden rounded-2xl border border-[#232838] bg-[#12151F] shadow-2xl">
              {movie.posterUrl ? (
                <Image
                  src={movie.posterUrl}
                  alt={`${movie.title} poster`}
                  fill
                  priority
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full w-full flex-col items-center justify-center p-6 text-center text-[#697487]">
                  <Film className="h-12 w-12 mb-3 text-[#384157]" aria-hidden="true" />
                  <span className="text-sm font-semibold text-[#9DA8B8]">{movie.title}</span>
                  <span className="text-xs text-[#697487] mt-1">No Poster Available</span>
                </div>
              )}
            </div>

            {/* Quick Metadata Card */}
            <div className="mt-4 rounded-xl border border-[#232838] bg-[#12151F] p-4 text-xs space-y-2.5">
              <div className="flex items-center justify-between text-[#9DA8B8]">
                <span>Status</span>
                <span className="font-medium text-[#F8FAFC]">{movie.status}</span>
              </div>
              {movie.director && (
                <div className="flex items-center justify-between text-[#9DA8B8]">
                  <span>Director</span>
                  <span className="font-medium text-[#F8FAFC] text-right">{movie.director}</span>
                </div>
              )}
              {movie.spokenLanguages.length > 0 && (
                <div className="flex items-center justify-between text-[#9DA8B8]">
                  <span>Languages</span>
                  <span className="font-medium text-[#F8FAFC] text-right">
                    {movie.spokenLanguages.slice(0, 2).join(", ")}
                  </span>
                </div>
              )}
              {movie.imdbUrl && (
                <div className="pt-2 border-t border-[#232838] flex items-center justify-between">
                  <span className="text-[#697487]">External Reference</span>
                  <a
                    href={movie.imdbUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-xs text-[#FBBF24] hover:underline"
                  >
                    <span>IMDb Page</span>
                    <ExternalLink className="h-3 w-3" aria-hidden="true" />
                  </a>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Title Info & Details */}
          <div className="space-y-6 md:col-span-8 lg:col-span-9">
            {/* Header Titles */}
            <div>
              <h1 className="font-sans text-3xl font-extrabold tracking-tight text-[#F8FAFC] sm:text-4xl lg:text-5xl">
                {movie.title}
              </h1>

              {movie.originalTitle && movie.originalTitle !== movie.title && (
                <p className="mt-1 text-sm text-[#9DA8B8] italic">
                  Original Title: {movie.originalTitle}
                </p>
              )}

              {movie.tagline && (
                <p className="mt-2 text-base font-medium italic text-[#F43F5E]">
                  &ldquo;{movie.tagline}&rdquo;
                </p>
              )}

              {/* Meta Tags Row */}
              <div className="mt-4 flex flex-wrap items-center gap-4 text-xs text-[#9DA8B8]">
                {movie.releaseYear && (
                  <div className="flex items-center gap-1.5">
                    <Calendar className="h-3.5 w-3.5 text-[#F43F5E]" aria-hidden="true" />
                    <span>{movie.releaseDate}</span>
                  </div>
                )}
                <div className="flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5 text-[#06B6D4]" aria-hidden="true" />
                  <span>{movie.runtimeFormatted}</span>
                </div>
              </div>

              {/* Genres Pills */}
              {movie.genres.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {movie.genres.map((g) => (
                    <Link
                      key={g.id}
                      href={`/discover?genre=${g.id}`}
                      className="rounded-full border border-[#232838] bg-[#12151F] px-3 py-1 text-xs font-medium text-[#F8FAFC] transition-colors hover:border-[#F43F5E] hover:text-[#F43F5E]"
                    >
                      {g.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Ratings Breakdown Block */}
            <div className="rounded-2xl border border-[#232838] bg-[#12151F] p-5">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-[#FBBF24]/10 border border-[#FBBF24]/20 text-[#FBBF24]">
                    <Star className="h-6 w-6 fill-[#FBBF24]" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="flex items-baseline gap-1.5">
                      <span className="font-sans text-2xl font-bold text-[#F8FAFC]">
                        {movie.tmdbRating > 0 ? movie.tmdbRating.toFixed(1) : "—"}
                      </span>
                      <span className="text-xs text-[#697487]">/ 10</span>
                      <span className="rounded bg-[#1A1E2B] px-1.5 py-0.5 text-[10px] font-semibold uppercase text-[#9DA8B8]">
                        TMDB Score
                      </span>
                    </div>
                    <p className="text-xs text-[#697487]">
                      Based on {movie.tmdbVoteCount.toLocaleString()} votes from The Movie Database
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-dashed border-[#232838] bg-[#090A0E] px-4 py-2.5 text-xs text-[#9DA8B8] max-w-xs">
                  <div className="flex items-center gap-1.5 font-semibold text-[#F8FAFC] mb-0.5">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#06B6D4]" aria-hidden="true" />
                    <span>Independent Scoring</span>
                  </div>
                  <p className="text-[11px] text-[#697487]">
                    External provider rating. {brandName} community rating unlocks in the personal diary milestone.
                  </p>
                </div>
              </div>
            </div>

            {/* Overview / Synopsis Section */}
            <div className="space-y-2">
              <h2 className="font-sans text-lg font-bold text-[#F8FAFC]">Synopsis</h2>
              <p className="text-sm leading-relaxed text-[#9DA8B8] sm:text-base">
                {movie.overview}
              </p>
            </div>

            {/* Top Cast Section */}
            {movie.topCast.length > 0 && (
              <div className="space-y-3 pt-4 border-t border-[#232838]">
                <h2 className="font-sans text-lg font-bold text-[#F8FAFC]">Top Cast</h2>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {movie.topCast.map((actor) => (
                    <div
                      key={actor.id}
                      className="flex items-center gap-3 rounded-xl border border-[#232838] bg-[#12151F] p-2.5"
                    >
                      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full bg-[#1A1E2B]">
                        {actor.profileUrl ? (
                          <Image
                            src={actor.profileUrl}
                            alt={actor.name}
                            fill
                            sizes="44px"
                            className="object-cover"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center text-[#697487]">
                            <User className="h-5 w-5" aria-hidden="true" />
                          </div>
                        )}
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="text-xs font-semibold text-[#F8FAFC] truncate">
                          {actor.name}
                        </p>
                        <p className="text-[11px] text-[#697487] truncate">
                          {actor.character}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* TMDB Mandatory Notice */}
            <div className="pt-6 border-t border-[#232838] text-xs text-[#697487]">
              <p>{BRAND_CONFIG.attribution.tmdbNotice}</p>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
