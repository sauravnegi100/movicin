"use server";

import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import type { ThemePreference, ProfileVisibility } from "@/types/database";

export interface ProfileActionState {
  success?: boolean;
  error?: string;
  message?: string;
}

const USERNAME_REGEX = /^[a-zA-Z0-9_]{3,30}$/;

/**
 * Server action to update the authenticated user's profile and preferences.
 * Adheres strictly to least privilege, RLS, and column-level grants.
 */
export async function updateProfileAction(
  prevState: ProfileActionState | null,
  formData: FormData
): Promise<ProfileActionState> {
  const supabase = await createClient();

  // 1. Verify caller identity via server-side session token
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return { error: "Authentication session expired. Please sign in again." };
  }

  // 2. Extract and sanitize profile inputs
  const username = (formData.get("username") as string)?.trim() || "";
  const displayName = (formData.get("displayName") as string)?.trim() || "";
  const bio = (formData.get("bio") as string)?.trim() || null;
  const avatarPath = (formData.get("avatarPath") as string)?.trim() || null;
  const preferredLocale = ((formData.get("preferredLocale") as string)?.trim() || "en").slice(0, 10);
  const themePreference = (formData.get("themePreference") as ThemePreference) || "dark";
  const profileVisibility = (formData.get("profileVisibility") as ProfileVisibility) || "public";

  // 3. Extract and parse preferences inputs
  const strictSpoilerFreeMode = formData.get("strictSpoilerFreeMode") === "on";
  const personalizationEnabled = formData.get("personalizationEnabled") === "on";

  // Parse preferred genres (array of numbers)
  const rawGenres = formData.getAll("preferredGenres") as string[];
  const preferredGenres: number[] = rawGenres
    .map((g) => parseInt(g, 10))
    .filter((id) => !isNaN(id) && id > 0);

  // Parse preferred languages (array of strings)
  const rawLanguages = formData.getAll("preferredLanguages") as string[];
  const preferredLanguages: string[] = rawLanguages
    .map((l) => l.trim().toLowerCase())
    .filter((code) => code.length >= 2 && code.length <= 5);

  // 4. Validate profile constraints matching DB checks
  if (!username || !USERNAME_REGEX.test(username)) {
    return {
      error:
        "Username must be between 3 and 30 characters and contain only letters, numbers, and underscores.",
    };
  }

  if (!displayName || displayName.length < 1 || displayName.length > 100) {
    return {
      error: "Display name is required and must be between 1 and 100 characters.",
    };
  }

  if (bio && bio.length > 500) {
    return {
      error: "Bio cannot exceed 500 characters.",
    };
  }

  if (avatarPath && avatarPath.length > 500) {
    return {
      error: "Avatar path cannot exceed 500 characters.",
    };
  }

  if (!["dark", "light", "system"].includes(themePreference)) {
    return { error: "Invalid theme preference selected." };
  }

  if (!["public", "private"].includes(profileVisibility)) {
    return { error: "Invalid profile visibility selected." };
  }

  // 5. Execute Profile Update using authenticated user ID
  // Note: Only columns granted to authenticated role are updated (no id, created_at, or roles).
  const { error: profileError } = await supabase
    .from("profiles")
    .update({
      username,
      display_name: displayName,
      bio,
      avatar_path: avatarPath,
      preferred_locale: preferredLocale,
      theme_preference: themePreference,
      profile_visibility: profileVisibility,
    })
    .eq("id", user.id);

  if (profileError) {
    console.error("[updateProfileAction] Profile update error:", profileError.message);
    // Handle unique username collision (PostgreSQL error 23505)
    if (
      profileError.code === "23505" ||
      profileError.message?.toLowerCase().includes("unique") ||
      profileError.message?.toLowerCase().includes("username")
    ) {
      return {
        error: "This username is already taken. Please choose a different one.",
      };
    }
    return {
      error: "Failed to update profile details. Please check your inputs and try again.",
    };
  }

  // 6. Execute Preferences Update using authenticated user ID
  // Use UPDATE first (conforms to existing FOR UPDATE policy without triggering POST insert RLS check)
  const { data: updatedPrefs, error: prefUpdateError } = await supabase
    .from("user_preferences")
    .update({
      preferred_genres: preferredGenres,
      preferred_languages: preferredLanguages.length > 0 ? preferredLanguages : ["en"],
      strict_spoiler_free_mode: strictSpoilerFreeMode,
      personalization_enabled: personalizationEnabled,
    })
    .eq("user_id", user.id)
    .select("user_id");

  if (prefUpdateError) {
    console.error("[updateProfileAction] Preferences update error:", prefUpdateError.message);
    revalidatePath("/me");
    return {
      error:
        "Your profile details were updated, but viewing preferences could not be saved. Please try again.",
    };
  }

  // If no existing row was updated (row missing in user_preferences), attempt insert
  if (!updatedPrefs || updatedPrefs.length === 0) {
    const { error: prefInsertError } = await supabase
      .from("user_preferences")
      .insert({
        user_id: user.id,
        preferred_genres: preferredGenres,
        preferred_languages: preferredLanguages.length > 0 ? preferredLanguages : ["en"],
        strict_spoiler_free_mode: strictSpoilerFreeMode,
        personalization_enabled: personalizationEnabled,
      });

    if (prefInsertError) {
      console.error("[updateProfileAction] Preferences insert error:", prefInsertError.message);
      revalidatePath("/me");
      return {
        error:
          "Your profile details were updated, but viewing preferences could not be saved. Please apply the corrective database migration.",
      };
    }
  }

  // 7. Refresh server component data
  revalidatePath("/me");

  return {
    success: true,
    message: "Profile and preferences updated successfully.",
  };
}
