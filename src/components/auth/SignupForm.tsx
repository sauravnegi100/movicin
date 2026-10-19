"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { signupAction, type AuthState } from "@/server/auth/actions";
import { validatePassword } from "@/lib/auth/validation";
import { getSafeRedirectUrl } from "@/lib/auth/redirect";
import {
  Eye,
  EyeOff,
  Loader2,
  AlertCircle,
  CheckCircle2,
  XCircle,
  MailCheck,
} from "lucide-react";

export function SignupForm() {
  const searchParams = useSearchParams();
  const next = getSafeRedirectUrl(searchParams.get("next"), "/me");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [state, formAction, isPending] = useActionState<AuthState, FormData>(
    signupAction,
    {}
  );

  const passwordChecks = validatePassword(password);
  const passwordsMatch =
    confirmPassword.length > 0 && password === confirmPassword;

  // Render Confirmation Message if Email Verification is required
  if (state?.requiresEmailConfirmation) {
    return (
      <div className="py-4 text-center">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-950/60 text-emerald-400">
          <MailCheck className="h-7 w-7" aria-hidden="true" />
        </div>
        <h2 className="mt-4 font-sans text-xl font-bold text-[#F8FAFC]">
          Check your email
        </h2>
        <p className="mt-2 text-sm text-[#9DA8B8]">
          We have dispatched a verification link to{" "}
          <span className="font-semibold text-[#F8FAFC]">
            {state.email || "your email address"}
          </span>
          .
        </p>
        <p className="mt-2 text-xs text-[#697487]">
          Please click the link in your email to confirm your account and begin your viewing diary.
        </p>
        <div className="mt-6">
          <Link
            href="/login"
            className="inline-flex items-center justify-center rounded-xl bg-[#F43F5E] px-6 py-2.5 text-sm font-semibold text-white shadow transition-transform hover:scale-105 hover:bg-[#e11d48]"
          >
            Return to Sign In
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form action={formAction} className="space-y-5">
      <input type="hidden" name="next" value={next} />

      {/* Error Callout */}
      {state?.error && (
        <div
          role="alert"
          aria-live="polite"
          className="flex items-start gap-3 rounded-xl border border-red-500/30 bg-red-950/40 p-3.5 text-sm text-red-200"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-red-400" aria-hidden="true" />
          <span>{state.error}</span>
        </div>
      )}

      {/* Email Input */}
      <div>
        <label
          htmlFor="email"
          className="block text-xs font-semibold uppercase tracking-wider text-[#9DA8B8]"
        >
          Email Address
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          disabled={isPending}
          placeholder="cinephile@example.com"
          className="mt-1.5 w-full rounded-xl border border-[#232838] bg-[#090A0E] px-4 py-3 text-sm text-[#F8FAFC] placeholder-[#697487] transition-colors focus:border-[#F43F5E] focus:outline-none focus:ring-1 focus:ring-[#F43F5E] disabled:opacity-50"
        />
      </div>

      {/* Password Input */}
      <div>
        <label
          htmlFor="password"
          className="block text-xs font-semibold uppercase tracking-wider text-[#9DA8B8]"
        >
          Password
        </label>
        <div className="relative mt-1.5">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            disabled={isPending}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-xl border border-[#232838] bg-[#090A0E] px-4 py-3 pr-12 text-sm text-[#F8FAFC] placeholder-[#697487] transition-colors focus:border-[#F43F5E] focus:outline-none focus:ring-1 focus:ring-[#F43F5E] disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#697487] transition-colors hover:text-[#F8FAFC]"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Eye className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>

        {/* Real-time Password Checklist */}
        {password.length > 0 && (
          <div className="mt-2.5 space-y-1 text-xs" aria-live="polite">
            <div
              className={`flex items-center gap-1.5 ${
                passwordChecks.hasMinLength ? "text-emerald-400" : "text-[#697487]"
              }`}
            >
              {passwordChecks.hasMinLength ? (
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              <span>At least 8 characters</span>
            </div>
            <div
              className={`flex items-center gap-1.5 ${
                passwordChecks.hasLetter ? "text-emerald-400" : "text-[#697487]"
              }`}
            >
              {passwordChecks.hasLetter ? (
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              <span>At least one letter</span>
            </div>
            <div
              className={`flex items-center gap-1.5 ${
                passwordChecks.hasNumber ? "text-emerald-400" : "text-[#697487]"
              }`}
            >
              {passwordChecks.hasNumber ? (
                <CheckCircle2 className="h-3.5 w-3.5" aria-hidden="true" />
              ) : (
                <XCircle className="h-3.5 w-3.5" aria-hidden="true" />
              )}
              <span>At least one number</span>
            </div>
          </div>
        )}
      </div>

      {/* Confirm Password Input */}
      <div>
        <label
          htmlFor="confirmPassword"
          className="block text-xs font-semibold uppercase tracking-wider text-[#9DA8B8]"
        >
          Confirm Password
        </label>
        <div className="relative mt-1.5">
          <input
            id="confirmPassword"
            name="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            disabled={isPending}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-xl border border-[#232838] bg-[#090A0E] px-4 py-3 pr-12 text-sm text-[#F8FAFC] placeholder-[#697487] transition-colors focus:border-[#F43F5E] focus:outline-none focus:ring-1 focus:ring-[#F43F5E] disabled:opacity-50"
          />
          <button
            type="button"
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#697487] transition-colors hover:text-[#F8FAFC]"
            aria-label={
              showConfirmPassword
                ? "Hide confirmation password"
                : "Show confirmation password"
            }
          >
            {showConfirmPassword ? (
              <EyeOff className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Eye className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        </div>

        {confirmPassword.length > 0 && (
          <p
            className={`mt-1.5 text-xs ${
              passwordsMatch ? "text-emerald-400" : "text-amber-400"
            }`}
          >
            {passwordsMatch ? "Passwords match" : "Passwords do not match yet"}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending || !passwordChecks.isValid}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F43F5E] py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.01] hover:bg-[#e11d48] focus:outline-none focus:ring-2 focus:ring-[#F43F5E] focus:ring-offset-2 focus:ring-offset-[#12151F] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            <span>Creating account...</span>
          </>
        ) : (
          <span>Create Account</span>
        )}
      </button>

      {/* Navigation Link */}
      <p className="text-center text-xs text-[#9DA8B8]">
        Already have an account?{" "}
        <Link
          href={`/login${next ? `?next=${encodeURIComponent(next)}` : ""}`}
          className="font-medium text-[#F43F5E] transition-colors hover:underline"
        >
          Sign in instead
        </Link>
      </p>
    </form>
  );
}
