import Link from "next/link";
import { KeyRound, ExternalLink, ShieldAlert } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";

interface TmdbMissingKeyAlertProps {
  title?: string;
  description?: string;
}

export function TmdbMissingKeyAlert({
  title = "TMDB API Key Required",
  description = "To stream live movie metadata, posters, and credits from The Movie Database, configure your TMDB_API_KEY in .env.local.",
}: TmdbMissingKeyAlertProps) {
  return (
    <div
      role="region"
      aria-label="TMDB Configuration Notice"
      className="mx-auto max-w-3xl rounded-2xl border border-amber-500/30 bg-[#12151F] p-6 sm:p-8 text-[#F8FAFC] shadow-2xl"
    >
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
          <KeyRound className="h-6 w-6" aria-hidden="true" />
        </div>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <h3 className="font-sans text-lg font-bold text-[#F8FAFC]">{title}</h3>
            <span className="rounded-full bg-amber-500/20 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-300">
              Provider Setup
            </span>
          </div>
          <p className="text-sm leading-relaxed text-[#9DA8B8]">{description}</p>

          <div className="rounded-xl border border-[#232838] bg-[#090A0E] p-4 text-xs font-mono text-[#9DA8B8]">
            <p className="text-[#697487] mb-1"># In your .env.local file:</p>
            <p className="text-[#F8FAFC]">
              TMDB_API_KEY=<span className="text-amber-400">your_tmdb_api_key_or_bearer_token</span>
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-1">
            <a
              href="https://developer.themoviedb.org/docs/getting-started"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-amber-500/30 bg-amber-500/10 px-3.5 py-1.5 text-xs font-medium text-amber-300 transition-colors hover:bg-amber-500/20"
            >
              <span>Get Free API Key on TMDB</span>
              <ExternalLink className="h-3 w-3" aria-hidden="true" />
            </a>

            <Link
              href="/"
              className="inline-flex items-center gap-1.5 rounded-lg border border-[#232838] bg-[#1A1E2B] px-3.5 py-1.5 text-xs font-medium text-[#9DA8B8] transition-colors hover:text-[#F8FAFC]"
            >
              Return Home
            </Link>
          </div>

          <div className="border-t border-[#232838] pt-3 text-[11px] text-[#697487]">
            <div className="flex items-center gap-1.5 mb-1">
              <ShieldAlert className="h-3.5 w-3.5 text-[#697487]" aria-hidden="true" />
              <span className="font-semibold text-[#9DA8B8]">Data Attribution & Terms</span>
            </div>
            <p>{BRAND_CONFIG.attribution.tmdbNotice}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
