import Link from "next/link";
import { Home, Compass, Bookmark, BookOpen, User } from "lucide-react";

export function MobileNav() {
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
          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center gap-1 rounded-lg px-3 py-1.5 text-xs text-[#9DA8B8] transition-colors hover:text-[#F8FAFC]"
            >
              <Icon className="h-5 w-5" aria-hidden="true" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
