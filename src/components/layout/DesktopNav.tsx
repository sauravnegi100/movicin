"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, User } from "lucide-react";
import { BRAND_CONFIG } from "@/config/brand";
import { isNavItemActive } from "@/lib/navigation";

export function DesktopNav() {
  const pathname = usePathname();

  return (
    <nav
      className="hidden md:flex items-center gap-1"
      aria-label="Main Navigation"
    >
      {BRAND_CONFIG.navigation.map((item) => {
        const isActive = isNavItemActive(pathname, item.href);

        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? "page" : undefined}
            className={`rounded-full px-4 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-[#F43F5E] ${
              isActive
                ? "border border-[#F43F5E]/30 bg-[#F43F5E]/10 font-semibold text-[#F43F5E] shadow-sm hover:bg-[#F43F5E]/15"
                : "border border-transparent font-medium text-[#9DA8B8] hover:bg-[#1A1E2B] hover:text-[#F8FAFC]"
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}

export function NavSearchButton() {
  const pathname = usePathname();
  const isActive = isNavItemActive(pathname, "/search");

  return (
    <Link
      href="/search"
      aria-current={isActive ? "page" : undefined}
      className={`flex items-center gap-2 rounded-full px-3.5 py-1.5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-[#F43F5E] ${
        isActive
          ? "border border-[#F43F5E]/40 bg-[#1A1E2B] font-medium text-[#F8FAFC] shadow-sm"
          : "border border-[#232838] bg-[#12151F] text-[#9DA8B8] hover:border-[#697487] hover:text-[#F8FAFC]"
      }`}
      aria-label="Search movies and TV shows"
    >
      <Search
        className={`h-4 w-4 transition-colors ${
          isActive ? "text-[#F43F5E]" : "text-[#9DA8B8]"
        }`}
        aria-hidden="true"
      />
      <span className="hidden sm:inline">Search catalog...</span>
    </Link>
  );
}

export function NavUserButton({ email }: { email?: string }) {
  const pathname = usePathname();
  const isActive = isNavItemActive(pathname, "/me");
  const displayName = email?.split("@")[0] || "Profile";

  return (
    <Link
      href="/me"
      aria-current={isActive ? "page" : undefined}
      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[#F43F5E] ${
        isActive
          ? "border border-[#F43F5E] bg-[#1A1E2B] text-[#F8FAFC] shadow-sm shadow-[#F43F5E]/15"
          : "border border-[#232838] bg-[#12151F] text-[#F8FAFC] hover:border-[#F43F5E]"
      }`}
    >
      <User className="h-3.5 w-3.5 text-[#F43F5E]" aria-hidden="true" />
      <span className="max-w-[120px] truncate">{displayName}</span>
    </Link>
  );
}

export function NavSignInButton() {
  const pathname = usePathname();
  const isActive = isNavItemActive(pathname, "/login");

  return (
    <Link
      href="/login"
      aria-current={isActive ? "page" : undefined}
      className={`hidden sm:inline-flex items-center justify-center rounded-full bg-[#F43F5E] px-4 py-1.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-[#F43F5E] ${
        isActive
          ? "ring-2 ring-[#F43F5E] ring-offset-2 ring-offset-[#090A0E] opacity-100"
          : ""
      }`}
    >
      Sign In
    </Link>
  );
}
