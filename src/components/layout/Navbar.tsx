import Link from "next/link";
import { connection } from "next/server";
import { getBrandName, BRAND_CONFIG } from "@/config/brand";
import { Search, Film, User, LogOut } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

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
            className="flex items-center gap-2 text-xl font-bold tracking-tight text-[#F8FAFC] transition-colors hover:text-[#F43F5E]"
            aria-label={`${brandName} Home`}
          >
            <Film className="h-6 w-6 text-[#F43F5E]" aria-hidden="true" />
            <span className="font-sans tracking-wide">{brandName}</span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-1"
            aria-label="Main Navigation"
          >
            {BRAND_CONFIG.navigation.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-1.5 text-sm font-medium text-[#9DA8B8] transition-colors hover:bg-[#1A1E2B] hover:text-[#F8FAFC]"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3">
          <Link
            href="/search"
            className="flex items-center gap-2 rounded-full border border-[#232838] bg-[#12151F] px-3.5 py-1.5 text-sm text-[#9DA8B8] transition-colors hover:border-[#697487] hover:text-[#F8FAFC]"
            aria-label="Search movies and TV shows"
          >
            <Search className="h-4 w-4 text-[#9DA8B8]" aria-hidden="true" />
            <span className="hidden sm:inline">Search catalog...</span>
          </Link>

          {user ? (
            <div className="flex items-center gap-2">
              <Link
                href="/me"
                className="inline-flex items-center gap-2 rounded-full border border-[#232838] bg-[#12151F] px-3.5 py-1.5 text-xs font-medium text-[#F8FAFC] transition-colors hover:border-[#F43F5E]"
              >
                <User className="h-3.5 w-3.5 text-[#F43F5E]" aria-hidden="true" />
                <span className="max-w-[120px] truncate">{user.email?.split("@")[0]}</span>
              </Link>
              <form action="/auth/signout" method="POST">
                <button
                  type="submit"
                  aria-label="Sign Out"
                  className="inline-flex items-center justify-center rounded-full border border-[#232838] bg-[#12151F] p-2 text-[#9DA8B8] transition-colors hover:border-red-500/40 hover:text-red-300"
                >
                  <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
                </button>
              </form>
            </div>
          ) : (
            <Link
              href="/login"
              className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#F43F5E] px-4 py-1.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
