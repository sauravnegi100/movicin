"use server";

import { redirect, unstable_rethrow } from "next/navigation";
import { headers } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { validateEmail, validatePassword } from "@/lib/auth/validation";
import { getSafeRedirectUrl } from "@/lib/auth/redirect";

export interface AuthState {
  error?: string;
  success?: boolean;
  requiresEmailConfirmation?: boolean;
  email?: string;
}

/**
 * Server Action for User Login.
 */
export async function loginAction(
  prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const email = (formData.get("email") as string)?.trim() || "";
  const password = (formData.get("password") as string) || "";
  const next = formData.get("next") as string;

  if (!email || !password) {
    return { error: "Please provide both email and password." };
  }

  if (!validateEmail(email)) {
    return { error: "Please enter a valid email address." };
  }

  const supabase = await createClient();
  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    // Provide user-friendly, security-safe error message
    if (error.message.includes("Invalid login credentials")) {
      return { error: "Incorrect email or password. Please try again." };
    }
    if (error.message.includes("Email not confirmed")) {
      return {
        error: "Your email has not been verified yet. Please check your inbox for the confirmation link.",
      };
    }
    return { error: error.message || "Sign in failed. Please try again." };
  }

  // Safe redirect to target destination
  redirect(getSafeRedirectUrl(next, "/me"));
}

/**
 * Server Action for User Registration.
 */
export async function signupAction(
  prevState: AuthState | null,
  formData: FormData
): Promise<AuthState> {
  const email = (formData.get("email") as string)?.trim() || "";
  const password = (formData.get("password") as string) || "";
  const confirmPassword = (formData.get("confirmPassword") as string) || "";
  const next = formData.get("next") as string;

  if (!email || !password || !confirmPassword) {
    return { error: "All fields are required." };
  }

  if (!validateEmail(email)) {
    return { error: "Please enter a valid email address." };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  const passwordCheck = validatePassword(password);
  if (!passwordCheck.isValid) {
    return {
      error:
        "Password must be at least 8 characters long and contain both letters and numbers.",
    };
  }

  const headerList = await headers();
  const origin =
    headerList.get("origin") ||
    process.env.NEXT_PUBLIC_APP_URL ||
    "http://localhost:3000";

  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback?next=${encodeURIComponent(
          getSafeRedirectUrl(next, "/me")
        )}`,
      },
    });

    if (error) {
      return { error: error.message || "Registration failed. Please try again." };
    }

    if (!data?.user) {
      return { error: "Registration failed. Please try again." };
    }

    // Check if confirmation email was required
    // If session is null or identities array is empty, confirmation is required
    const session = data?.session;
    if (!session) {
      return {
        success: true,
        requiresEmailConfirmation: true,
        email,
      };
    }

    // If Supabase is configured to auto-confirm, redirect directly
    redirect(getSafeRedirectUrl(next, "/me"));
  } catch (err) {
    unstable_rethrow(err);
    return { error: "An unexpected error occurred during registration. Please try again." };
  }
}
