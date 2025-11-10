import type { Metadata } from "next";
import MythExpCalculator from '@/tools/exp-calculators/MythExpCalculator';

// Force static generation - no server-side rendering needed
export const dynamic = 'force-static';

// ISR: Revalidate every 30 days
export const revalidate = 2592000;

export const metadata: Metadata = {
  title: "Cabal Online Myth EXP Calculator - nipperlug",
  description: "Myth Level EXP Calculator for Cabal Online. Calculate Myth EXP (MXP) requirements with accurate calculations accounting for rebirth multipliers. Plan your Myth progression efficiently.",
  keywords: "Myth Level EXP Calculator Cabal Online, Cabal Online Myth EXP, Myth EXP calculator, Myth experience, Myth levels, Myth rebirth, Myth reset, Cabal Online Myth progression, Myth EXP calculator Cabal Online",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Cabal Online Myth EXP Calculator - nipperlug",
    description: "Myth Level EXP Calculator for Cabal Online. Calculate Myth EXP requirements and plan your Myth progression.",
    url: "https://nipperlug.com/myth-exp-calculator/",
    type: "website",
    siteName: "nipperlug",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cabal Online Myth EXP Calculator - nipperlug",
    description: "Myth Level EXP Calculator for Cabal Online. Calculate Myth EXP requirements and plan your Myth progression.",
  },
  alternates: {
    canonical: "https://nipperlug.com/myth-exp-calculator/",
  },
};

export default function MythExpCalculatorPage() {
  return (
    <div className="min-h-screen bg-theme-darkest">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Calculator Content - Contained in smaller wrapper */}
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <div className="glass-panel">
              {/* Page Header */}
              <div className="glass-panel-dark p-6 sm:p-8 text-center">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-game-gold">Myth Level EXP Calculator for Cabal Online</h1>
                <p className="text-foreground/80 max-w-2xl mx-auto">
                  Calculate Myth EXP (MXP) requirements for Cabal Online. Plan your Myth progression with accurate calculations accounting for rebirth multipliers.
                </p>
              </div>
              
              <MythExpCalculator />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

