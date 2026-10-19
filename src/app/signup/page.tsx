import { Suspense } from "react";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { SignupForm } from "@/components/auth/SignupForm";
import { getBrandName } from "@/config/brand";
import { getSafeRedirectUrl } from "@/lib/auth/redirect";
import { Film } from "lucide-react";
import type { Metadata } from "next";

export const instant = false;

export const metadata: Metadata = {
  title: "Create Account",
  description: "Create an account on Movicin to begin your personal movie and TV viewing diary.",
};

export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If already authenticated, redirect to destination
  if (user) {
    const params = await searchParams;
    const destination = getSafeRedirectUrl(params.next, "/me");
    redirect(destination === "/login" || destination === "/signup" ? "/me" : destination);
  }

  const brandName = getBrandName();

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        {/* Card Header */}
        <div className="text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#1A1E2B] text-[#F43F5E] shadow-inner">
            <Film className="h-6 w-6" aria-hidden="true" />
          </div>
          <h1 className="mt-4 font-sans text-2xl font-bold tracking-tight text-[#F8FAFC] sm:text-3xl">
            Join {brandName}
          </h1>
          <p className="mt-2 text-sm text-[#9DA8B8]">
            Start tracking what you watch and building your personal diary.
          </p>
        </div>

        {/* Card Container */}
        <div className="mt-8 rounded-2xl border border-[#232838] bg-[#12151F] p-6 sm:p-8 shadow-2xl">
          <Suspense fallback={<div className="h-48 animate-pulse rounded-xl bg-[#1A1E2B]" />}>
            <SignupForm />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
