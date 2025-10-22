import type { Metadata } from "next";
import OxpCalculator from '@/tools/exp-calculators/OxpCalculator';

// Force static generation - no server-side rendering needed
export const dynamic = 'force-static';

// ISR: Revalidate every 30 days
export const revalidate = 2592000;

export const metadata: Metadata = {
  title: "Cabal Online OXP Calculator - nipperlug",
  description: "Calculate OXP (Overlord Experience Points) requirements in Cabal Online. Plan your Overlord progression with accurate OXP calculations and level requirements.",
  keywords: "Cabal Online OXP, OXP calculator, Overlord experience, Overlord levels, OXP requirements, Overlord progression, Cabal Online Overlord",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Cabal Online OXP Calculator - nipperlug",
    description: "Calculate OXP (Overlord Experience Points) requirements in Cabal Online. Plan your Overlord progression with accurate OXP calculations and level requirements.",
    url: "https://nipperlug.com/oxp-calculator/",
    type: "website",
    siteName: "nipperlug",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cabal Online OXP Calculator - nipperlug",
    description: "Calculate OXP (Overlord Experience Points) requirements in Cabal Online. Plan your Overlord progression with accurate OXP calculations and level requirements.",
  },
  alternates: {
    canonical: "https://nipperlug.com/oxp-calculator/",
  },
};

export default function OxpCalculatorPage() {
  return (
    <div className="min-h-screen bg-theme-darkest">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Calculator Content - Contained in smaller wrapper */}
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <div className="glass-panel">
              {/* Page Header */}
              <div className="glass-panel-dark p-6 sm:p-8 text-center">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-game-gold">OXP Calculator</h1>
                <p className="text-foreground/80 max-w-2xl mx-auto">
                  Calculate OXP (Overlord Experience Points) requirements. Plan your Overlord progression with accurate OXP calculations and level requirements.
                </p>
              </div>
              
              <OxpCalculator />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}