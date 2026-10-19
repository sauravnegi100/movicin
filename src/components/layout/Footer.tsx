import Link from "next/link";
import { getBrandName, BRAND_CONFIG } from "@/config/brand";

export function Footer() {
  const brandName = getBrandName();

  return (
    <footer className="mt-auto border-t border-[#232838] bg-[#090A0E] py-12 text-[#9DA8B8]">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          {/* Brand & Purpose */}
          <div className="text-center md:text-left">
            <span className="text-lg font-bold text-[#F8FAFC]">{brandName}</span>
            <p className="mt-1 text-sm text-[#697487]">
              {BRAND_CONFIG.tagline}
            </p>
          </div>

          {/* Links */}
          <nav
            className="flex flex-wrap justify-center gap-6 text-sm"
            aria-label="Footer Navigation"
          >
            {BRAND_CONFIG.footerLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-[#F8FAFC]"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Legal & Third-Party Attribution */}
        <div className="mt-8 border-t border-[#232838] pt-8 text-center text-xs text-[#697487]">
          <p>
            {BRAND_CONFIG.attribution.tmdbNotice}
          </p>
          <p className="mt-2">
            © 2026 {brandName}. Independent movie discovery and personal viewing diary.
          </p>
        </div>
      </div>
    </footer>
  );
}
