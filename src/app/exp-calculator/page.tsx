import type { Metadata } from "next";
import CharacterExpCalculator from '@/tools/exp-calculators/CharacterExpCalculator';

// Force static generation - no server-side rendering needed
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Cabal Online Character EXP Calculator - nipperlug",
  description: "Calculate experience points needed to reach your target character level in Cabal Online. Plan your leveling efficiently with accurate EXP calculations.",
  keywords: "Cabal Online EXP calculator, character level calculator, experience calculator, leveling guide, EXP table, character progression, Cabal Online leveling",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Cabal Online Character EXP Calculator - nipperlug",
    description: "Calculate experience points needed to reach your target character level in Cabal Online. Plan your leveling efficiently with accurate EXP calculations.",
    url: "https://nipperlug.com/exp-calculator/",
    type: "website",
    siteName: "nipperlug",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cabal Online Character EXP Calculator - nipperlug",
    description: "Calculate experience points needed to reach your target character level in Cabal Online. Plan your leveling efficiently with accurate EXP calculations.",
  },
  alternates: {
    canonical: "https://nipperlug.com/exp-calculator/",
  },
};

export default function CharacterExpCalculatorPage() {
  return (
    <div className="min-h-screen bg-theme-darkest">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Calculator Content - Contained in smaller wrapper */}
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <div className="glass-panel">
              {/* Page Header */}
              <div className="glass-panel-dark p-6 sm:p-8 text-center">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-game-gold">Character EXP Calculator</h1>
                <p className="text-foreground/80 max-w-2xl mx-auto">
                  Calculate experience needed to reach your target character level. Plan your leveling efficiently with accurate EXP calculations.
                </p>
              </div>
              
              <CharacterExpCalculator />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}