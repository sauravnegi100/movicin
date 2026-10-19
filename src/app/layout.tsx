import { Suspense } from "react";
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { MobileNav } from "@/components/layout/MobileNav";
import { Footer } from "@/components/layout/Footer";
import { BRAND_CONFIG, getBrandName } from "@/config/brand";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${getBrandName()} — ${BRAND_CONFIG.tagline}`,
    template: `%s | ${getBrandName()}`,
  },
  description: BRAND_CONFIG.shortDescription,
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${montserrat.variable} h-full antialiased`}
    >
      <body className="flex min-h-screen flex-col bg-[#090A0E] text-[#F8FAFC]">
        <Suspense fallback={<div className="h-16 w-full border-b border-[#232838] bg-[#090A0E]" />}>
          <Navbar />
        </Suspense>
        <main className="flex-1 pb-16 md:pb-0">{children}</main>
        <MobileNav />
        <Footer />
      </body>
    </html>
  );
}
