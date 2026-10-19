import { createClient } from "@supabase/supabase-js";

/**
 * Creates a Supabase client with the secret / service-role key for privileged server-side operations.
 * Strictly server-only. NEVER expose this client, SUPABASE_SECRET_KEY, or SUPABASE_SERVICE_ROLE_KEY to the browser.
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const secretKey =
    process.env.SUPABASE_SECRET_KEY ||
    process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !secretKey) {
    throw new Error(
      "Missing Supabase admin environment variables: NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SECRET_KEY"
    );
  }

  return createClient(supabaseUrl, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}
