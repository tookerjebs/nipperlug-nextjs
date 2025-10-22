import type { Metadata } from "next";
import ForceWingCalculator from '@/tools/exp-calculators/ForceWingCalculator';

// Force static generation - no server-side rendering needed
export const dynamic = 'force-static';

// ISR: Revalidate every 30 days
export const revalidate = 2592000;

export const metadata: Metadata = {
  title: "Cabal Online Force Wing EXP Calculator - nipperlug",
  description: "Calculate experience points needed for Force Wing upgrades and levels in Cabal Online. Plan your Force Wing progression with accurate EXP requirements.",
  keywords: "Cabal Online Force Wing, Force Wing calculator, Force Wing EXP, Force Wing levels, Force Wing upgrade, wing progression, Cabal Online wings",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Cabal Online Force Wing EXP Calculator - nipperlug",
    description: "Calculate experience points needed for Force Wing upgrades and levels in Cabal Online. Plan your Force Wing progression with accurate EXP requirements.",
    url: "https://nipperlug.com/force-wing-calculator/",
    type: "website",
    siteName: "nipperlug",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cabal Online Force Wing EXP Calculator - nipperlug",
    description: "Calculate experience points needed for Force Wing upgrades and levels in Cabal Online. Plan your Force Wing progression with accurate EXP requirements.",
  },
  alternates: {
    canonical: "https://nipperlug.com/force-wing-calculator/",
  },
};

export default function ForceWingExpCalculatorPage() {
  return (
    <div className="min-h-screen bg-theme-darkest">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Calculator Content - Contained in smaller wrapper */}
        <div className="flex justify-center">
          <div className="w-full max-w-4xl">
            <div className="glass-panel">
              {/* Page Header */}
              <div className="glass-panel-dark p-6 sm:p-8 text-center">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-game-gold">Force Wing EXP Calculator</h1>
                <p className="text-foreground/80 max-w-2xl mx-auto">
                  Calculate experience needed for Force Wing upgrades and levels. Plan your Force Wing progression with accurate EXP requirements and material costs.
                </p>
              </div>
              
              <ForceWingCalculator />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}