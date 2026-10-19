"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { loginAction, type AuthState } from "@/server/auth/actions";
import { Eye, EyeOff, Loader2, AlertCircle } from "lucide-react";

export function LoginForm() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/me";
  const callbackError = searchParams.get("error");

  const [showPassword, setShowPassword] = useState(false);
  const [state, formAction, isPending] = useActionState<AuthState, FormData>(
    loginAction,
    callbackError === "auth_callback_failed"
      ? { error: "Authentication verification failed or link expired. Please sign in again." }
      : {}
  );

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
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="block text-xs font-semibold uppercase tracking-wider text-[#9DA8B8]"
          >
            Password
          </label>
        </div>
        <div className="relative mt-1.5">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            disabled={isPending}
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
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isPending}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-[#F43F5E] py-3 text-sm font-semibold text-white shadow-lg transition-transform hover:scale-[1.01] hover:bg-[#e11d48] focus:outline-none focus:ring-2 focus:ring-[#F43F5E] focus:ring-offset-2 focus:ring-offset-[#12151F] disabled:cursor-not-allowed disabled:opacity-60 disabled:hover:scale-100"
      >
        {isPending ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            <span>Signing in...</span>
          </>
        ) : (
          <span>Sign In</span>
        )}
      </button>

      {/* Navigation Link */}
      <p className="text-center text-xs text-[#9DA8B8]">
        Don&apos;t have an account yet?{" "}
        <Link
          href={`/signup${next ? `?next=${encodeURIComponent(next)}` : ""}`}
          className="font-medium text-[#F43F5E] transition-colors hover:underline"
        >
          Create an account
        </Link>
      </p>
    </form>
  );
}
