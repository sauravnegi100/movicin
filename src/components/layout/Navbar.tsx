import Link from "next/link";
import { connection } from "next/server";
import { getBrandName } from "@/config/brand";
import { Film, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import {
  DesktopNav,
  NavSearchButton,
  NavUserButton,
  NavSignInButton,
} from "@/components/layout/DesktopNav";

export async function Navbar() {
  await connection();
  const brandName = getBrandName();
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#232838] bg-[#090A0E]/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Wordmark (Provisional Text Wordmark - No Logo Image) */}
        <div className="flex items-center gap-8">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-lg text-xl font-bold tracking-tight text-[#F8FAFC] transition-colors hover:text-[#F43F5E] focus-visible:outline-2 focus-visible:outline-[#F43F5E]"
            aria-label={`${brandName} Home`}
          >
            <Film className="h-6 w-6 text-[#F43F5E]" aria-hidden="true" />
            <span className="font-sans tracking-wide">{brandName}</span>
          </Link>

          {/* Desktop Navigation Links */}
          <DesktopNav />
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <NavSearchButton />

          {user ? (
            <div className="flex items-center gap-2">
              <NavUserButton email={user.email} />
              <form action="/auth/signout" method="POST">
                <button
                  type="submit"
                  aria-label="Sign Out"
                  className="inline-flex items-center justify-center rounded-full border border-[#232838] bg-[#12151F] p-2 text-[#9DA8B8] transition-colors hover:border-red-500/40 hover:text-red-300 focus-visible:outline-2 focus-visible:outline-[#F43F5E]"
                >
                  <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </form>
            </div>
          ) : (
            <NavSignInButton />
          )}
        </div>
      </div>
    </header>
  );
}
