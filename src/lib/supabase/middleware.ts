import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

/**
 * Refreshes auth tokens stored in cookies on incoming requests.
 * Used by Next.js proxy/middleware to keep sessions alive across requests.
 * Uses the current Supabase publishable-key convention:
 * NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (with legacy NEXT_PUBLIC_SUPABASE_ANON_KEY as fallback).
 */
export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request,
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const publishableKey =
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !publishableKey) {
    // If environment variables are not yet configured, pass request through
    return supabaseResponse;
  }

  const supabase = createServerClient(supabaseUrl, publishableKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        supabaseResponse = NextResponse.next({
          request,
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  // IMPORTANT: auth.getUser() refreshes expired tokens safely server-side.
  await supabase.auth.getUser();

  return supabaseResponse;
}
