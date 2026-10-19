import { redirect } from "next/navigation";
import { connection } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getBrandName } from "@/config/brand";
import { ProfileEditForm } from "@/components/profile/ProfileEditForm";
import type { Profile, UserPreferences } from "@/types/database";
import {
  User,
  Calendar,
  BookOpen,
  Star,
  Bookmark,
  LogOut,
  ShieldCheck,
  Settings,
  Eye,
  EyeOff,
} from "lucide-react";
import type { Metadata } from "next";

export const instant = false;

export const metadata: Metadata = {
  title: "My Profile & Settings",
  description: "Personal viewing profile, stats, and cinema discovery preferences.",
};

export default async function ProfilePage() {
  await connection();
  const supabase = await createClient();

  // 1. Authenticate user identity strictly server-side
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login?next=/me");
  }

  // 2. Fetch user's profile record from public.profiles
  const { data: profileData } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  // 3. Fetch user's preferences from public.user_preferences
  const { data: preferencesData } = await supabase
    .from("user_preferences")
    .select("*")
    .eq("user_id", user.id)
    .maybeSingle();

  // 4. Fetch user's active roles from public.user_roles
  const { data: rolesData } = await supabase
    .from("user_roles")
    .select("role")
    .eq("user_id", user.id)
    .is("revoked_at", null);

  const activeRoles: string[] = rolesData?.map((r) => r.role) || ["member"];

  // 5. Provide resilient fallbacks if profile or preferences are still syncing
  const profile: Profile = profileData || {
    id: user.id,
    username:
      user.email?.split("@")[0]?.replace(/[^a-zA-Z0-9_]/g, "").slice(0, 20) ||
      "cinephile",
    display_name: user.email?.split("@")[0] || "Cinephile",
    avatar_path: null,
    bio: null,
    preferred_locale: "en",
    theme_preference: "dark",
    profile_visibility: "public",
    created_at: user.created_at || new Date().toISOString(),
    updated_at: user.created_at || new Date().toISOString(),
  };

  const preferences: UserPreferences = preferencesData || {
    user_id: user.id,
    preferred_genres: [],
    preferred_languages: ["en"],
    strict_spoiler_free_mode: false,
    personalization_enabled: true,
    updated_at: new Date().toISOString(),
  };

  const brandName = getBrandName();
  const joinedDate = user.created_at
    ? new Date(user.created_at).toLocaleDateString("en-IN", {
        year: "numeric",
        month: "long",
        day: "numeric",
        timeZone: "Asia/Kolkata",
      })
    : "Recently";

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6 lg:px-8">
      {/* 1. Profile Hero & Identity Card */}
      <div className="flex flex-col gap-6 rounded-2xl border border-[#232838] bg-[#12151F] p-6 sm:p-8 md:flex-row md:items-center md:justify-between shadow-xl">
        <div className="flex items-center gap-5">
          {profile.avatar_path ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={profile.avatar_path}
              alt={profile.display_name}
              className="h-20 w-20 rounded-2xl border border-[#232838] object-cover shadow-inner"
            />
          ) : (
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#1A1E2B] text-[#F43F5E] shadow-inner">
              <User className="h-10 w-10" aria-hidden="true" />
            </div>
          )}

          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="font-sans text-2xl font-bold text-[#F8FAFC]">
                {profile.display_name}
              </h1>
              <span className="font-mono text-sm text-[#9DA8B8]">
                @{profile.username}
              </span>

              {/* Role Badges */}
              {activeRoles.map((role) => (
                <span
                  key={role}
                  className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium uppercase tracking-wider ${
                    role === "superadmin" || role === "admin"
                      ? "border border-amber-500/30 bg-amber-950/40 text-amber-400"
                      : role === "moderator"
                      ? "border border-purple-500/30 bg-purple-950/40 text-purple-400"
                      : "border border-emerald-500/30 bg-emerald-950/40 text-emerald-400"
                  }`}
                >
                  <ShieldCheck className="h-3 w-3" aria-hidden="true" />
                  {role}
                </span>
              ))}

              {/* Visibility Badge */}
              <span
                className={`inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[11px] font-medium ${
                  profile.profile_visibility === "public"
                    ? "border border-[#232838] bg-[#1A1E2B] text-[#9DA8B8]"
                    : "border border-amber-500/20 bg-amber-950/20 text-amber-300"
                }`}
              >
                {profile.profile_visibility === "public" ? (
                  <>
                    <Eye className="h-3 w-3 text-emerald-400" aria-hidden="true" />
                    Public Profile
                  </>
                ) : (
                  <>
                    <EyeOff className="h-3 w-3 text-amber-400" aria-hidden="true" />
                    Private Profile
                  </>
                )}
              </span>
            </div>

            {profile.bio && (
              <p className="mt-2 text-sm text-[#CAD3DF] max-w-xl">
                {profile.bio}
              </p>
            )}

            <div className="mt-2 flex flex-wrap items-center gap-4 text-xs text-[#697487]">
              <span className="font-mono">{user.email}</span>
              <span>•</span>
              <div className="flex items-center gap-1">
                <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Joined {joinedDate} on {brandName}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Sign Out Button */}
        <form action="/auth/signout" method="POST">
          <button
            type="submit"
            className="inline-flex items-center gap-2 rounded-xl border border-[#232838] bg-[#090A0E] px-4 py-2.5 text-sm font-medium text-[#9DA8B8] transition-colors hover:border-red-500/40 hover:bg-red-950/30 hover:text-red-300"
          >
            <LogOut className="h-4 w-4" aria-hidden="true" />
            <span>Sign Out</span>
          </button>
        </form>
      </div>

      {/* 2. Personal Viewing Stats Summary (Phase 4 Foundation) */}
      <div className="mt-8">
        <h2 className="font-sans text-lg font-semibold text-[#F8FAFC]">
          Personal Viewing Stats
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-[#232838] bg-[#12151F] p-5">
            <div className="flex items-center justify-between text-[#9DA8B8]">
              <span className="text-xs uppercase tracking-wider">Watched</span>
              <BookOpen className="h-4 w-4 text-[#F43F5E]" aria-hidden="true" />
            </div>
            <p className="mt-3 text-2xl font-bold text-[#F8FAFC]">0</p>
            <p className="mt-1 text-xs text-[#697487]">Films & series logged</p>
          </div>

          <div className="rounded-2xl border border-[#232838] bg-[#12151F] p-5">
            <div className="flex items-center justify-between text-[#9DA8B8]">
              <span className="text-xs uppercase tracking-wider">Ratings</span>
              <Star className="h-4 w-4 text-[#FBBF24]" aria-hidden="true" />
            </div>
            <p className="mt-3 text-2xl font-bold text-[#F8FAFC]">0</p>
            <p className="mt-1 text-xs text-[#697487]">Community scores submitted</p>
          </div>

          <div className="rounded-2xl border border-[#232838] bg-[#12151F] p-5">
            <div className="flex items-center justify-between text-[#9DA8B8]">
              <span className="text-xs uppercase tracking-wider">Watchlist</span>
              <Bookmark className="h-4 w-4 text-[#06B6D4]" aria-hidden="true" />
            </div>
            <p className="mt-3 text-2xl font-bold text-[#F8FAFC]">0</p>
            <p className="mt-1 text-xs text-[#697487]">Titles queued for viewing</p>
          </div>
        </div>
      </div>

      {/* 3. Profile & Preferences Editor */}
      <div className="mt-10">
        <div className="flex items-center gap-2 mb-4">
          <Settings className="h-5 w-5 text-[#F43F5E]" aria-hidden="true" />
          <h2 className="font-sans text-xl font-bold text-[#F8FAFC]">
            Edit Profile & Preferences
          </h2>
        </div>

        <ProfileEditForm
          initialProfile={profile}
          initialPreferences={preferences}
        />
      </div>

      {/* 4. Account Security & Session Overview */}
      <div className="mt-10 rounded-2xl border border-[#232838] bg-[#12151F] p-6">
        <h3 className="font-sans text-sm font-semibold uppercase tracking-wider text-[#9DA8B8]">
          Account Security & Session
        </h3>
        <div className="mt-4 space-y-3 text-sm">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 border-b border-[#232838]">
            <span className="text-[#9DA8B8]">Account Email</span>
            <span className="font-mono text-xs text-[#F8FAFC]">{user.email}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 border-b border-[#232838]">
            <span className="text-[#9DA8B8]">User ID</span>
            <span className="font-mono text-xs text-[#697487]">{user.id}</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2 border-b border-[#232838]">
            <span className="text-[#9DA8B8]">Authentication Provider</span>
            <span className="text-xs text-[#F8FAFC]">Supabase Auth (Email / Password)</span>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between py-2">
            <span className="text-[#9DA8B8]">Assigned Platform Roles</span>
            <div className="flex gap-1.5">
              {activeRoles.map((role) => (
                <span
                  key={role}
                  className="rounded bg-[#1A1E2B] px-2 py-0.5 font-mono text-xs text-[#9DA8B8]"
                >
                  {role}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
