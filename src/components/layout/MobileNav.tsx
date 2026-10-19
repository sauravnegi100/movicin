"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Compass, Bookmark, BookOpen, User } from "lucide-react";
import { isNavItemActive } from "@/lib/navigation";

export function MobileNav() {
  const pathname = usePathname();

  const navItems = [
    { label: "Home", href: "/", icon: Home },
    { label: "Discover", href: "/discover", icon: Compass },
    { label: "Diary", href: "/me/diary", icon: BookOpen },
    { label: "Watchlist", href: "/me/watchlist", icon: Bookmark },
    { label: "Profile", href: "/me", icon: User },
  ];

  return (
    <nav
      className="fixed bottom-0 left-0 z-50 w-full border-t border-[#232838] bg-[#090A0E]/95 backdrop-blur-lg md:hidden"
      style={{ paddingBottom: "env(safe-area-inset-bottom, 0px)" }}
      aria-label="Mobile Navigation"
    >
      <div className="flex h-16 items-center justify-around px-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = isNavItemActive(pathname, item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`flex flex-col items-center justify-center gap-1 rounded-xl px-2.5 py-1 text-[11px] transition-colors focus-visible:outline-2 focus-visible:outline-[#F43F5E] ${
                isActive
                  ? "border border-[#F43F5E]/30 bg-[#F43F5E]/10 font-semibold text-[#F43F5E] shadow-sm"
                  : "border border-transparent font-medium text-[#9DA8B8] hover:text-[#F8FAFC] hover:bg-[#1A1E2B]/50"
              }`}
            >
              <Icon
                className={`h-5 w-5 transition-colors ${
                  isActive ? "text-[#F43F5E]" : "text-[#9DA8B8]"
                }`}
                aria-hidden="true"
              />
              <span className={isActive ? "text-[#F43F5E]" : "text-[#9DA8B8]"}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}

