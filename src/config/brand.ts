/**
 * Movicin Brand Configuration
 *
 * Central configuration for application branding, provisional names, and metadata.
 * Components must not hard-code brand names independently.
 */

export const BRAND_CONFIG = {
  // Provisional working name, configurable via NEXT_PUBLIC_APP_NAME
  name: process.env.NEXT_PUBLIC_APP_NAME || "Movicin",
  tagline: "Cinematic Movie Discovery & Viewing Diary",
  shortDescription:
    "A refined movie and TV discovery, personal viewing diary, community rating, and social platform.",
  attribution: {
    tmdbNotice:
      "This application uses TMDB and the TMDB APIs but is not endorsed, certified, or otherwise approved by TMDB.",
    tmdbUrl: "https://www.themoviedb.org",
  },
  navigation: [
    { label: "Home", href: "/" },
    { label: "Discover", href: "/discover" },
    { label: "Diary", href: "/me/diary" },
    { label: "Watchlist", href: "/me/watchlist" },
    { label: "Lists", href: "/me/lists" },
  ],
  footerLinks: [
    { label: "About & Principles", href: "/about" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Community Guidelines", href: "/community-guidelines" },
    { label: "Accessibility", href: "/accessibility" },
  ],
} as const;

export function getBrandName(): string {
  return BRAND_CONFIG.name;
}
