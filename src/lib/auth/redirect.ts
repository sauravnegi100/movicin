/**
 * Safe redirect validator to prevent Open Redirect attacks.
 * Validates that redirect paths are strictly local relative paths.
 */
export function getSafeRedirectUrl(target: string | null | undefined, defaultUrl = "/me"): string {
  if (!target) {
    return defaultUrl;
  }

  // Must start with a single slash, not double slash (//evil.com)
  // Must not contain backslashes or protocol specifiers
  if (
    target.startsWith("/") &&
    !target.startsWith("//") &&
    !target.startsWith("/\\") &&
    !target.includes("://")
  ) {
    return target;
  }

  return defaultUrl;
}
