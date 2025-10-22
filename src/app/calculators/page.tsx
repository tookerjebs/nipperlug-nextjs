import type { Metadata } from "next";
import Link from 'next/link';

// ISR: Revalidate every 30 days
export const revalidate = 2592000;

export const metadata: Metadata = {
  title: "Cabal Online Calculators - EXP, Crafting & Upgrade Tools - nipperlug",
  description: "Comprehensive collection of Cabal Online calculators including EXP, Force Wing, OXP, Chloe Craft, Devil Shop, Amity, and Extreme Upgrade calculators for optimal progression and profit.",
  keywords: "Cabal Online calculators, EXP calculator, Force Wing calculator, OXP calculator, Chloe Craft calculator, Devil Shop calculator, Amity calculator, Extreme Upgrade calculator, crafting profit, progression tools",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Cabal Online Calculators - EXP, Crafting & Upgrade Tools - nipperlug",
    description: "Comprehensive collection of Cabal Online calculators including EXP, Force Wing, OXP, Chloe Craft, Devil Shop, Amity, and Extreme Upgrade calculators for optimal progression and profit.",
    url: "https://nipperlug.com/calculators/",
    type: "website",
    siteName: "nipperlug",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cabal Online Calculators - EXP, Crafting & Upgrade Tools - nipperlug",
    description: "Comprehensive collection of Cabal Online calculators including EXP, Force Wing, OXP, Chloe Craft, Devil Shop, Amity, and Extreme Upgrade calculators for optimal progression and profit.",
  },
  alternates: {
    canonical: "https://nipperlug.com/calculators/",
  },
};

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen text-foreground p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Calculators
          </h1>
          <p className="text-foreground/80 text-lg mb-6">
            Comprehensive collection of calculators for Cabal Online progression, crafting, and trading.
            Optimize your gameplay with accurate calculations for experience, upgrades, and profit margins.
          </p>
        </div>

        {/* All Calculators */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Character EXP */}
          <div className="bg-component-card border border-border-dark p-6 rounded-lg hover:border-blue-500/30 transition-colors">
            <h3 className="text-xl font-semibold mb-3">Character EXP</h3>
            <p className="text-foreground/70 mb-4 text-sm leading-relaxed">
              Calculate experience needed to reach your target character level.
              Plan your leveling journey with accurate EXP requirements.
            </p>
            <Link 
              href="/exp-calculator" 
              className="inline-block bg-game-highlight hover:bg-game-highlight/80 px-4 py-2 rounded transition-colors text-sm font-medium text-theme-darkest"
            >
              Calculate EXP
            </Link>
          </div>

          {/* Force Wing EXP */}
          <div className="bg-component-card border border-border-dark p-6 rounded-lg hover:border-blue-500/30 transition-colors">
            <h3 className="text-xl font-semibold mb-3">Force Wing EXP</h3>
            <p className="text-foreground/70 mb-4 text-sm leading-relaxed">
              Calculate experience needed for force wing upgrades and levels.
              Track your progress toward higher force wing tiers.
            </p>
            <Link 
              href="/force-wing-calculator" 
              className="inline-block bg-game-highlight hover:bg-game-highlight/80 px-4 py-2 rounded transition-colors text-sm font-medium text-theme-darkest"
            >
              Calculate EXP
            </Link>
          </div>

          {/* OXP Calculator */}
          <div className="bg-component-card border border-border-dark p-6 rounded-lg hover:border-blue-500/30 transition-colors">
            <h3 className="text-xl font-semibold mb-3">OXP Calculator</h3>
            <p className="text-foreground/70 mb-4 text-sm leading-relaxed">
              Calculate OXP (Overlord Experience Points) requirements.
              Plan your Overlord progression with accurate calculations.
            </p>
            <Link 
              href="/oxp-calculator" 
              className="inline-block bg-game-highlight hover:bg-game-highlight/80 px-4 py-2 rounded transition-colors text-sm font-medium text-theme-darkest"
            >
              Calculate OXP
            </Link>
          </div>

          {/* Chloe Craft */}
          <div className="bg-component-card border border-border-dark p-6 rounded-lg hover:border-blue-500/30 transition-colors">
            <h3 className="text-xl font-semibold mb-3">Chloe Craft</h3>
            <p className="text-foreground/70 mb-4 text-sm leading-relaxed">
              Calculate profit margins for Chloe crafting recipes and materials.
              Optimize your crafting strategy for maximum profit.
            </p>
            <Link 
              href="/chloe-craft-profit-calculator" 
              className="inline-block bg-game-highlight hover:bg-game-highlight/80 px-4 py-2 rounded transition-colors text-sm font-medium text-theme-darkest"
            >
              Calculate Profit
            </Link>
          </div>

          {/* Devil Shop */}
          <div className="bg-component-card border border-border-dark p-6 rounded-lg hover:border-blue-500/30 transition-colors">
            <h3 className="text-xl font-semibold mb-3">Devil Shop</h3>
            <p className="text-foreground/70 mb-4 text-sm leading-relaxed">
              Calculate profit margins for Devil Shop items and trading.
              Maximize your returns on Devil Shop investments.
            </p>
            <Link 
              href="/devils-shop-calculator" 
              className="inline-block bg-game-highlight hover:bg-game-highlight/80 px-4 py-2 rounded transition-colors text-sm font-medium text-theme-darkest"
            >
              Calculate Profit
            </Link>
          </div>

          {/* Amity Craft */}
          <div className="bg-component-card border border-border-dark p-6 rounded-lg hover:border-blue-500/30 transition-colors">
            <h3 className="text-xl font-semibold mb-3">Amity Craft</h3>
            <p className="text-foreground/70 mb-4 text-sm leading-relaxed">
              Calculate profit margins for Amity crafting and materials.
              Find the most profitable Amity crafting opportunities.
            </p>
            <Link 
              href="/chloe-amity-calculator" 
              className="inline-block bg-game-highlight hover:bg-game-highlight/80 px-4 py-2 rounded transition-colors text-sm font-medium text-theme-darkest"
            >
              Calculate Profit
            </Link>
          </div>

          {/* Extreme Upgrade Calculator */}
          <div className="bg-component-card border border-border-dark p-6 rounded-lg hover:border-blue-500/30 transition-colors">
            <h3 className="text-xl font-semibold mb-3">Extreme Upgrade</h3>
            <p className="text-foreground/70 mb-4 text-sm leading-relaxed">
              Calculate success rates, costs, and materials for extreme upgrades.
              Plan your upgrade path with accurate probability calculations.
            </p>
            <Link 
              href="/extreme-upgrade-calculator" 
              className="inline-block bg-game-highlight hover:bg-game-highlight/80 px-4 py-2 rounded transition-colors text-sm font-medium text-theme-darkest"
            >
              Calculate Upgrades
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}