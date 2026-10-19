"use client";

import { useState, useTransition, useRef, useEffect } from "react";
import { updateProfileAction } from "@/server/profile/actions";
import {
  AVAILABLE_GENRES,
  AVAILABLE_LANGUAGES,
  type Profile,
  type UserPreferences,
} from "@/types/database";
import {
  User,
  Shield,
  Sparkles,
  Palette,
  Globe,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Save,
  Check,
} from "lucide-react";

interface ProfileEditFormProps {
  initialProfile: Profile;
  initialPreferences: UserPreferences;
}

export function ProfileEditForm({
  initialProfile,
  initialPreferences,
}: ProfileEditFormProps) {
  const [isPending, startTransition] = useTransition();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Controlled states for preference toggles
  const [strictSpoiler, setStrictSpoiler] = useState<boolean>(
    Boolean(initialPreferences.strict_spoiler_free_mode)
  );
  const [personalization, setPersonalization] = useState<boolean>(
    initialPreferences.personalization_enabled !== false
  );

  // Controlled states for genres and languages selections
  const [selectedGenres, setSelectedGenres] = useState<number[]>(
    initialPreferences.preferred_genres || []
  );
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(
    initialPreferences.preferred_languages || ["en"]
  );
  const [bioCharCount, setBioCharCount] = useState<number>(
    initialProfile.bio?.length || 0
  );

  // Dedicated save-success button animation state (stable 2.6s timer)
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [showInlineSuccess, setShowInlineSuccess] = useState<boolean>(false);

  const savedTimerRef = useRef<NodeJS.Timeout | null>(null);
  const inlineSuccessTimerRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    return () => {
      if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
      if (inlineSuccessTimerRef.current) clearTimeout(inlineSuccessTimerRef.current);
    };
  }, []);

  const handleSubmit = (formData: FormData) => {
    if (savedTimerRef.current) clearTimeout(savedTimerRef.current);
    if (inlineSuccessTimerRef.current) clearTimeout(inlineSuccessTimerRef.current);

    setErrorMessage(null);
    setIsSaved(false);
    setShowInlineSuccess(false);

    startTransition(async () => {
      const result = await updateProfileAction(null, formData);
      if (result.success) {
        setIsSaved(true);
        setShowInlineSuccess(true);

        savedTimerRef.current = setTimeout(() => {
          setIsSaved(false);
        }, 2600);

        inlineSuccessTimerRef.current = setTimeout(() => {
          setShowInlineSuccess(false);
        }, 5000);
      } else if (result.error) {
        setErrorMessage(result.error);
        setIsSaved(false);
        setShowInlineSuccess(false);
      }
    });
  };

  const toggleGenre = (genreId: number) => {
    setSelectedGenres((prev) =>
      prev.includes(genreId) ? prev.filter((id) => id !== genreId) : [...prev, genreId]
    );
  };

  const toggleLanguage = (code: string) => {
    setSelectedLanguages((prev) => {
      if (prev.includes(code)) {
        if (prev.length === 1) return prev; // Keep at least one language
        return prev.filter((c) => c !== code);
      }
      return [...prev, code];
    });
  };

  return (
    <form action={handleSubmit} className="space-y-8">
      {/* Top Level Error Alert */}
      {errorMessage && (
        <div
          role="alert"
          aria-live="assertive"
          className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-950/40 p-4 text-sm text-red-200 shadow-md"
        >
          <AlertCircle className="h-5 w-5 shrink-0 text-red-400 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-semibold text-red-300">Unable to complete save</p>
            <p className="mt-0.5 text-xs text-red-200/90">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Top Level Success Notice */}
      {showInlineSuccess && (
        <div
          role="status"
          aria-live="polite"
          className="flex items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-950/40 p-4 text-sm text-emerald-200 shadow-md"
        >
          <CheckCircle2 className="h-5 w-5 shrink-0 text-emerald-400" aria-hidden="true" />
          <p className="text-xs sm:text-sm font-medium">Profile and preferences saved successfully.</p>
        </div>
      )}

      {/* 1. Public Identity Section */}
      <div className="rounded-2xl border border-[#232838] bg-[#12151F] p-6 sm:p-8">
        <div className="flex items-center gap-2.5 pb-4 border-b border-[#232838]">
          <User className="h-5 w-5 text-[#F43F5E]" aria-hidden="true" />
          <h3 className="font-sans text-base font-semibold text-[#F8FAFC]">
            Public Identity
          </h3>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Username */}
          <div>
            <label
              htmlFor="username"
              className="block text-xs font-semibold uppercase tracking-wider text-[#9DA8B8]"
            >
              Username
            </label>
            <div className="mt-2 relative">
              <span className="absolute inset-y-0 left-0 flex items-center pl-3.5 text-sm text-[#697487]">
                @
              </span>
              <input
                id="username"
                name="username"
                type="text"
                required
                defaultValue={initialProfile.username}
                placeholder="cinephile"
                className="w-full rounded-xl border border-[#232838] bg-[#090A0E] py-2.5 pl-8 pr-4 text-sm text-[#F8FAFC] placeholder-[#697487] transition-colors focus:border-[#F43F5E] focus:outline-none focus:ring-1 focus:ring-[#F43F5E]"
              />
            </div>
            <p className="mt-1 text-xs text-[#697487]">
              Unique, 3–30 characters (letters, numbers, underscores).
            </p>
          </div>

          {/* Display Name */}
          <div>
            <label
              htmlFor="displayName"
              className="block text-xs font-semibold uppercase tracking-wider text-[#9DA8B8]"
            >
              Display Name
            </label>
            <div className="mt-2">
              <input
                id="displayName"
                name="displayName"
                type="text"
                required
                defaultValue={initialProfile.display_name}
                placeholder="Your Name"
                className="w-full rounded-xl border border-[#232838] bg-[#090A0E] px-4 py-2.5 text-sm text-[#F8FAFC] placeholder-[#697487] transition-colors focus:border-[#F43F5E] focus:outline-none focus:ring-1 focus:ring-[#F43F5E]"
              />
            </div>
            <p className="mt-1 text-xs text-[#697487]">
              Shown on your reviews, lists, and public profile.
            </p>
          </div>

          {/* Bio */}
          <div className="sm:col-span-2">
            <div className="flex items-center justify-between">
              <label
                htmlFor="bio"
                className="block text-xs font-semibold uppercase tracking-wider text-[#9DA8B8]"
              >
                Bio
              </label>
              <span className="text-xs text-[#697487]">
                {bioCharCount}/500
              </span>
            </div>
            <div className="mt-2">
              <textarea
                id="bio"
                name="bio"
                rows={3}
                maxLength={500}
                defaultValue={initialProfile.bio || ""}
                onChange={(e) => setBioCharCount(e.target.value.length)}
                placeholder="Share your cinema interests, favorite filmmakers, or favorite eras..."
                className="w-full rounded-xl border border-[#232838] bg-[#090A0E] p-3 text-sm text-[#F8FAFC] placeholder-[#697487] transition-colors focus:border-[#F43F5E] focus:outline-none focus:ring-1 focus:ring-[#F43F5E]"
              />
            </div>
          </div>

          {/* Avatar Path / URL */}
          <div>
            <label
              htmlFor="avatarPath"
              className="block text-xs font-semibold uppercase tracking-wider text-[#9DA8B8]"
            >
              Avatar Image Path / URL
            </label>
            <div className="mt-2">
              <input
                id="avatarPath"
                name="avatarPath"
                type="text"
                defaultValue={initialProfile.avatar_path || ""}
                placeholder="https://example.com/avatar.jpg"
                className="w-full rounded-xl border border-[#232838] bg-[#090A0E] px-4 py-2.5 text-sm text-[#F8FAFC] placeholder-[#697487] transition-colors focus:border-[#F43F5E] focus:outline-none focus:ring-1 focus:ring-[#F43F5E]"
              />
            </div>
            <p className="mt-1 text-xs text-[#697487]">
              Direct image URL or path. Storage uploads will arrive in a future update.
            </p>
          </div>

          {/* Profile Visibility */}
          <div>
            <label
              htmlFor="profileVisibility"
              className="block text-xs font-semibold uppercase tracking-wider text-[#9DA8B8]"
            >
              Profile Visibility
            </label>
            <div className="mt-2">
              <select
                id="profileVisibility"
                name="profileVisibility"
                defaultValue={initialProfile.profile_visibility}
                className="w-full rounded-xl border border-[#232838] bg-[#090A0E] px-4 py-2.5 text-sm text-[#F8FAFC] transition-colors focus:border-[#F43F5E] focus:outline-none focus:ring-1 focus:ring-[#F43F5E]"
              >
                <option value="public">Public (Visible to community)</option>
                <option value="private">Private (Only visible to you)</option>
              </select>
            </div>
            <p className="mt-1 text-xs text-[#697487]">
              Controls whether other members can view your profile page.
            </p>
          </div>
        </div>
      </div>

      {/* 2. Interface & Regional Preferences */}
      <div className="rounded-2xl border border-[#232838] bg-[#12151F] p-6 sm:p-8">
        <div className="flex items-center gap-2.5 pb-4 border-b border-[#232838]">
          <Palette className="h-5 w-5 text-[#FBBF24]" aria-hidden="true" />
          <h3 className="font-sans text-base font-semibold text-[#F8FAFC]">
            Interface & Regional
          </h3>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Theme Preference */}
          <div>
            <label
              htmlFor="themePreference"
              className="block text-xs font-semibold uppercase tracking-wider text-[#9DA8B8]"
            >
              Color Theme
            </label>
            <div className="mt-2">
              <select
                id="themePreference"
                name="themePreference"
                defaultValue={initialProfile.theme_preference}
                className="w-full rounded-xl border border-[#232838] bg-[#090A0E] px-4 py-2.5 text-sm text-[#F8FAFC] transition-colors focus:border-[#FBBF24] focus:outline-none focus:ring-1 focus:ring-[#FBBF24]"
              >
                <option value="dark">Cinematic Dark (Default)</option>
                <option value="light">Light Mode</option>
                <option value="system">System Synchronized</option>
              </select>
            </div>
            <p className="mt-1 text-xs text-[#697487]">
              Visual surface styling for theater-like immersion.
            </p>
          </div>

          {/* Preferred Locale */}
          <div>
            <label
              htmlFor="preferredLocale"
              className="block text-xs font-semibold uppercase tracking-wider text-[#9DA8B8]"
            >
              Interface Language
            </label>
            <div className="mt-2">
              <select
                id="preferredLocale"
                name="preferredLocale"
                defaultValue={initialProfile.preferred_locale}
                className="w-full rounded-xl border border-[#232838] bg-[#090A0E] px-4 py-2.5 text-sm text-[#F8FAFC] transition-colors focus:border-[#FBBF24] focus:outline-none focus:ring-1 focus:ring-[#FBBF24]"
              >
                <option value="en">English (US/UK)</option>
                <option value="hi">Hindi (हिन्दी)</option>
                <option value="es">Spanish (Español)</option>
                <option value="fr">French (Français)</option>
                <option value="de">German (Deutsch)</option>
                <option value="ja">Japanese (日本語)</option>
              </select>
            </div>
            <p className="mt-1 text-xs text-[#697487]">
              Preferred language for navigation and platform copy.
            </p>
          </div>
        </div>
      </div>

      {/* 3. Viewing & Content Preferences */}
      <div className="rounded-2xl border border-[#232838] bg-[#12151F] p-6 sm:p-8">
        <div className="flex items-center gap-2.5 pb-4 border-b border-[#232838]">
          <Shield className="h-5 w-5 text-[#06B6D4]" aria-hidden="true" />
          <h3 className="font-sans text-base font-semibold text-[#F8FAFC]">
            Viewing & Discovery Preferences
          </h3>
        </div>

        <div className="mt-6 space-y-6">
          {/* Strict Spoiler Free Mode Toggle (Controlled, Accessible, Smooth Animation) */}
          <div className="flex items-start justify-between gap-4 rounded-xl border border-[#232838] bg-[#090A0E] p-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span id="strictSpoiler-label" className="font-sans text-sm font-semibold text-[#F8FAFC]">
                  Strict Spoiler-Free Mode
                </span>
                <span className="rounded-full border border-cyan-500/30 bg-cyan-950/40 px-2 py-0.5 text-[10px] font-medium text-cyan-400">
                  Protection Shield
                </span>
              </div>
              <p className="text-xs text-[#9DA8B8]">
                Conceals spoiler-tagged reviews, surprise cameo credits, and plot twists across the app until explicitly revealed.
              </p>
            </div>

            <button
              type="button"
              role="switch"
              id="strictSpoiler-switch"
              aria-checked={strictSpoiler}
              aria-labelledby="strictSpoiler-label"
              onClick={() => setStrictSpoiler((prev) => !prev)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border border-[#232838] p-[2px] transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#06B6D4] focus:ring-offset-2 focus:ring-offset-[#090A0E] motion-reduce:transition-none ${
                strictSpoiler ? "bg-[#06B6D4]" : "bg-[#1A1E2B]"
              }`}
            >
              <span className="sr-only">Toggle Strict Spoiler-Free Mode</span>
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow-md ring-0 transition-transform duration-200 ease-in-out motion-reduce:transition-none ${
                  strictSpoiler ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <input
              type="hidden"
              name="strictSpoilerFreeMode"
              value={strictSpoiler ? "on" : "off"}
            />
          </div>

          {/* Personalization Toggle (Controlled, Accessible, Smooth Animation) */}
          <div className="flex items-start justify-between gap-4 rounded-xl border border-[#232838] bg-[#090A0E] p-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span id="personalization-label" className="font-sans text-sm font-semibold text-[#F8FAFC]">
                  Personalized Recommendations
                </span>
                <Sparkles className="h-3.5 w-3.5 text-[#FBBF24]" aria-hidden="true" />
              </div>
              <p className="text-xs text-[#9DA8B8]">
                Use your ratings, watchlist, and diary entries to tailor homepage shelves and recommendation carousels.
              </p>
            </div>

            <button
              type="button"
              role="switch"
              id="personalization-switch"
              aria-checked={personalization}
              aria-labelledby="personalization-label"
              onClick={() => setPersonalization((prev) => !prev)}
              className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border border-[#232838] p-[2px] transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-[#F43F5E] focus:ring-offset-2 focus:ring-offset-[#090A0E] motion-reduce:transition-none ${
                personalization ? "bg-[#F43F5E]" : "bg-[#1A1E2B]"
              }`}
            >
              <span className="sr-only">Toggle Personalized Recommendations</span>
              <span
                aria-hidden="true"
                className={`pointer-events-none inline-block h-[18px] w-[18px] transform rounded-full bg-white shadow-md ring-0 transition-transform duration-200 ease-in-out motion-reduce:transition-none ${
                  personalization ? "translate-x-5" : "translate-x-0"
                }`}
              />
            </button>
            <input
              type="hidden"
              name="personalizationEnabled"
              value={personalization ? "on" : "off"}
            />
          </div>

          {/* Preferred Genres Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#9DA8B8]">
              Preferred Film Genres
            </label>
            <p className="mt-1 text-xs text-[#697487]">
              Select the genres you frequently watch to help tune discovery feeds.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {AVAILABLE_GENRES.map((genre) => {
                const isSelected = selectedGenres.includes(genre.id);
                return (
                  <button
                    key={genre.id}
                    type="button"
                    onClick={() => toggleGenre(genre.id)}
                    className={`inline-flex items-center rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                      isSelected
                        ? "border-[#F43F5E] bg-[#F43F5E]/15 text-[#F8FAFC] shadow-sm shadow-[#F43F5E]/20"
                        : "border-[#232838] bg-[#090A0E] text-[#9DA8B8] hover:border-[#384157] hover:text-[#F8FAFC]"
                    }`}
                  >
                    {genre.name}
                  </button>
                );
              })}
            </div>
            {selectedGenres.map((id) => (
              <input key={id} type="hidden" name="preferredGenres" value={id} />
            ))}
          </div>

          {/* Preferred Languages Selector */}
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#9DA8B8]">
              Preferred Discovery Languages
            </label>
            <p className="mt-1 text-xs text-[#697487]">
              Highlight titles originally filmed or subtitled in these languages.
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {AVAILABLE_LANGUAGES.map((lang) => {
                const isSelected = selectedLanguages.includes(lang.code);
                return (
                  <button
                    key={lang.code}
                    type="button"
                    onClick={() => toggleLanguage(lang.code)}
                    className={`inline-flex items-center rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                      isSelected
                        ? "border-[#06B6D4] bg-[#06B6D4]/15 text-[#F8FAFC] shadow-sm shadow-[#06B6D4]/20"
                        : "border-[#232838] bg-[#090A0E] text-[#9DA8B8] hover:border-[#384157] hover:text-[#F8FAFC]"
                    }`}
                  >
                    <Globe className="mr-1.5 h-3 w-3" aria-hidden="true" />
                    {lang.label}
                  </button>
                );
              })}
            </div>
            {selectedLanguages.map((code) => (
              <input key={code} type="hidden" name="preferredLanguages" value={code} />
            ))}
          </div>
        </div>
      </div>

      {/* Save Button with Integrated Animated Feedback */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        {/* Inline status indicator for accessibility and reassurance */}
        <div className="flex-1 w-full sm:w-auto">
          {showInlineSuccess && (
            <div
              role="status"
              aria-live="polite"
              className="flex items-center gap-2 text-xs font-medium text-emerald-400"
            >
              <CheckCircle2 className="h-4 w-4 shrink-0 text-emerald-400" aria-hidden="true" />
              <span>Profile and preferences saved successfully.</span>
            </div>
          )}
          {errorMessage && (
            <div
              role="alert"
              aria-live="assertive"
              className="flex items-center gap-2 text-xs font-medium text-red-400"
            >
              <AlertCircle className="h-4 w-4 shrink-0 text-red-400" aria-hidden="true" />
              <span>{errorMessage}</span>
            </div>
          )}
        </div>

        {/* Stable Animated Action Button */}
        <button
          type="submit"
          disabled={isPending || isSaved}
          className={`inline-flex items-center justify-center gap-2.5 h-11 min-w-[250px] rounded-xl px-6 py-2.5 font-sans text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#090A0E] disabled:cursor-not-allowed ${
            isSaved
              ? "bg-emerald-600 border border-emerald-500 text-white shadow-lg shadow-emerald-950/40"
              : isPending
              ? "bg-[#F43F5E]/80 border border-[#F43F5E]/80 text-white opacity-85"
              : "bg-[#F43F5E] hover:bg-[#E11D48] text-white shadow-lg shadow-[#F43F5E]/20 border border-[#F43F5E] focus:ring-[#F43F5E]"
          }`}
        >
          {isSaved ? (
            <>
              <div className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-white/20 animate-checkmark-pop">
                <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden="true" />
              </div>
              <span className="font-semibold tracking-wide">Saved!</span>
            </>
          ) : isPending ? (
            <>
              <Loader2 className="h-4 w-4 shrink-0 animate-spin" aria-hidden="true" />
              <span>Saving...</span>
            </>
          ) : (
            <>
              <Save className="h-4 w-4 shrink-0" aria-hidden="true" />
              <span>Save Profile & Preferences</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
