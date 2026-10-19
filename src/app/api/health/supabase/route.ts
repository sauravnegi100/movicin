import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Temporary Supabase health check endpoint.
 * Restricted strictly to local development (returns 404 in production).
 * Never leaks credentials, tokens, error stacks, or project IDs.
 */
export async function GET() {
  // Eliminate attack surface in production deployments
  if (process.env.NODE_ENV !== "development") {
    return new NextResponse(null, { status: 404 });
  }

  try {
    const supabase = await createClient();

    // 1. Safe read-only session check
    const { error: sessionError } = await supabase.auth.getSession();
    if (sessionError) {
      return NextResponse.json({ status: "failed" }, { status: 503 });
    }

    // 2. Network connectivity check to GoTrue
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const publishableKey =
      process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !publishableKey) {
      return NextResponse.json({ status: "failed" }, { status: 503 });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000);

    const response = await fetch(`${supabaseUrl}/auth/v1/health`, {
      headers: {
        apikey: publishableKey,
      },
      signal: controller.signal,
      cache: "no-store",
    });

    clearTimeout(timeout);

    if (!response.ok) {
      return NextResponse.json({ status: "failed" }, { status: 503 });
    }

    return NextResponse.json({ status: "connected" }, { status: 200 });
  } catch {
    return NextResponse.json({ status: "failed" }, { status: 503 });
  }
}
