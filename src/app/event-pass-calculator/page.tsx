import type { Metadata } from "next";
import EventPassCalculator from '@/tools/event-pass-calculator/EventPassCalculator';

// Force static generation - no server-side rendering needed
export const dynamic = 'force-static';

// ISR: Revalidate every 30 days
export const revalidate = 2592000;

export const metadata: Metadata = {
  title: "Cabal Online Event Pass Calculator - nipperlug",
  description: "Calculate Event Pass mission requirements in Cabal Online. Plan your Event Pass progression to reach level 50 with accurate daily and weekly mission calculations.",
  keywords: "Cabal Online Event Pass, Event Pass calculator, Event Pass missions, daily missions, weekly missions, Event Pass level 50, Cabal Online events",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Cabal Online Event Pass Calculator - nipperlug",
    description: "Calculate Event Pass mission requirements in Cabal Online. Plan your Event Pass progression to reach level 50 with accurate daily and weekly mission calculations.",
    url: "https://nipperlug.com/event-pass-calculator/",
    type: "website",
    siteName: "nipperlug",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cabal Online Event Pass Calculator - nipperlug",
    description: "Calculate Event Pass mission requirements in Cabal Online. Plan your Event Pass progression to reach level 50 with accurate daily and weekly mission calculations.",
  },
  alternates: {
    canonical: "https://nipperlug.com/event-pass-calculator/",
  },
};

export default function EventPassCalculatorPage() {
  return (
    <div className="min-h-screen bg-theme-darkest">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Calculator Content - Contained in smaller wrapper */}
        <div className="flex justify-center">
          <div className="w-full max-w-2xl">
            <div className="glass-panel">
              {/* Page Header */}
              <div className="glass-panel-dark p-6 sm:p-8 text-center">
                <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-game-gold">Event Pass Calculator</h1>
                <p className="text-foreground/80 max-w-2xl mx-auto">
                  Calculate how many daily and weekly missions you need to complete to reach Event Pass level 50. Enter your current points and remaining days to see your mission requirements.
                </p>
              </div>
              
              <EventPassCalculator />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

