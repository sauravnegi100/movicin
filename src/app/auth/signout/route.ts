import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Sign Out Route Handler.
 * Clears session cookies via Supabase Auth and redirects to login.
 */
export async function POST(request: Request) {
  const supabase = await createClient();
  await supabase.auth.signOut();

  const { origin } = new URL(request.url);
  return NextResponse.redirect(`${origin}/login`, {
    status: 303, // 303 See Other ensures browser follows with a GET request
  });
}
