import { AmityCalculator } from '@/tools/amity-calculator';
import type { Metadata } from "next";

// Force static generation - no server-side rendering needed
export const dynamic = 'force-static';

// ISR: Revalidate every 30 days
export const revalidate = 2592000;

export const metadata: Metadata = {
  title: "Chloe Amity Calculator - nipperlug",
  description: "Calculate optimal amity paths for Chloe crafting in Cabal Online. Find the most cost-effective way to reach your target amity level.",
  keywords: "Cabal Online Chloe amity, amity calculator, Chloe crafting, amity optimization, crafting calculator, Cabal Online crafting",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Chloe Amity Calculator - nipperlug",
    description: "Calculate optimal amity paths for Chloe crafting in Cabal Online. Find the most cost-effective way to reach your target amity level.",
    url: "https://nipperlug.com/chloe-amity-calculator/",
    type: "website",
    siteName: "nipperlug",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chloe Amity Calculator - nipperlug",
    description: "Calculate optimal amity paths for Chloe crafting in Cabal Online. Find the most cost-effective way to reach your target amity level.",
  },
  alternates: {
    canonical: "https://nipperlug.com/chloe-amity-calculator/",
  },
};

export default function AmityCraftCalculatorPage() {
  return (
    <div className="min-h-screen bg-theme-darkest">
      <div className="max-w-7xl mx-auto p-6">
        <AmityCalculator />
      </div>
    </div>
  );
}