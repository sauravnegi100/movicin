/**
 * Navigation utility functions for Movicin.
 * Determines active state for routes across desktop and mobile navigation.
 */

/**
 * Checks whether a navigation item with target `href` should be highlighted as active
 * for the current `pathname`.
 *
 * Route Matching Rules:
 * 1. Root route ("/") is strictly active only when `pathname === "/"`.
 *    This ensures detail pages (like `/movie/[id]`), `/search`, `/discover`, etc.,
 *    never erroneously activate the Home link.
 * 2. Dedicated profile sub-sections (`/me/diary`, `/me/watchlist`, `/me/lists`)
 *    must match their specific route and must not activate the root `/me` link.
 * 3. Section routes (e.g., `/discover`, `/search`) activate on exact matches or sub-paths
 *    (e.g., `/discover/trending` activates `/discover`).
 * 4. Standalone detail pages (e.g., `/movie/[id]`) do not activate Home or unrelated parent routes.
 */
export function isNavItemActive(pathname: string | null | undefined, href: string): boolean {
  if (!pathname || !href) {
    return false;
  }

  // Exact match always activates
  if (pathname === href) {
    return true;
  }

  // Home route must strictly match only "/"
  if (href === "/") {
    return false;
  }

  // Disambiguate /me (Profile) from dedicated sibling sub-sections
  if (href === "/me") {
    const isDedicatedSubSection =
      pathname.startsWith("/me/diary") ||
      pathname.startsWith("/me/watchlist") ||
      pathname.startsWith("/me/lists");
    return !isDedicatedSubSection && pathname.startsWith("/me/");
  }

  // Section match: matches "/section/..." (must have trailing slash to avoid prefix collision)
  return pathname.startsWith(`${href}/`);
}
