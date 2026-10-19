import { createBrowserClient } from "@supabase/ssr";

/**
 * Creates a Supabase client for use in Browser / Client Components.
 * Uses the current Supabase publishable-key convention:
 * NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (with legacy NEXT_PUBLIC_SUPABASE_ANON_KEY as fallback).
 */
export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !publishableKey) {
    throw new Error(
      "Missing Supabase environment variables: NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY"
    );
  }

  return createBrowserClient(supabaseUrl, publishableKey);
}
