import type { Metadata } from "next";
import Link from 'next/link';

export const metadata: Metadata = {
  title: "Cabal Online Resources - Tier Lists, Collection Tracker & Charts - nipperlug",
  description: "Essential Cabal Online resources including tier lists, collection tracker, BM3 damage boost, and effectiveness charts for optimal gameplay and progress tracking.",
  keywords: "Cabal Online resources, tier lists, collection tracker, penetration effectiveness, BM3 damage boost, reference guides, game charts, class rankings, progress tracking",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Cabal Online Resources - Tier Lists, Collection Tracker & Charts - nipperlug",
    description: "Essential Cabal Online resources including tier lists, collection tracker, BM3 damage boost, and effectiveness charts for optimal gameplay and progress tracking.",
    url: "https://nipperlug.com/resources/",
    type: "website",
    siteName: "nipperlug",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cabal Online Resources - Tier Lists, Collection Tracker & Charts - nipperlug",
    description: "Essential Cabal Online resources including tier lists, collection tracker, BM3 damage boost, and effectiveness charts for optimal gameplay and progress tracking.",
  },
  alternates: {
    canonical: "https://nipperlug.com/resources/",
  },
};

export default function ResourcesPage() {
  return (
    <div className="min-h-screen text-foreground p-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Resources
          </h1>
          <p className="text-foreground/80 text-lg mb-6">
            Essential resources and tools to help you master Cabal Online. 
            From tier lists and collection tracking to effectiveness tables and quick references.
          </p>
        </div>

        {/* All Resources */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* Collection Tracker */}
          <div className="bg-component-card border border-border-dark p-6 rounded-lg hover:border-blue-500/30 transition-colors">
            <h3 className="text-xl font-semibold mb-3">Collection Tracker</h3>
            <p className="text-foreground/70 mb-4 text-sm leading-relaxed">
              Track your collection progress across Dungeon, World, Special, and Boss collections. 
              Monitor completion milestones and export/import your progress.
            </p>
            <Link 
              href="/collection-tracker" 
              className="inline-block bg-game-highlight hover:bg-game-highlight/80 px-4 py-2 rounded transition-colors text-sm font-medium text-theme-darkest"
            >
              Track Progress
            </Link>
          </div>

          {/* Tier Lists */}
          <div className="bg-component-card border border-border-dark p-6 rounded-lg hover:border-blue-500/30 transition-colors">
            <h3 className="text-xl font-semibold mb-3">Tier Lists</h3>
            <p className="text-foreground/70 mb-4 text-sm leading-relaxed">
              Comprehensive rankings of all Cabal Online classes across different game modes and scenarios.
              Updated rankings based on current meta and balance changes.
            </p>
            <Link
              href="/tier-lists"
              className="inline-block bg-game-highlight hover:bg-game-highlight/80 px-4 py-2 rounded transition-colors text-sm font-medium text-theme-darkest"
            >
              View Rankings
            </Link>
          </div>

          {/* Myth Level Data */}
          <div className="bg-component-card border border-border-dark p-6 rounded-lg hover:border-blue-500/30 transition-colors">
            <h3 className="text-xl font-semibold mb-3">Myth Level Data</h3>
            <p className="text-foreground/70 mb-4 text-sm leading-relaxed">
              Complete myth level data with accurate probability calculations for all 78 nodes.
              View stat selection chances, level probabilities, holy power costs, and stat values.
            </p>
            <Link
              href="/myth-level-data"
              className="inline-block bg-game-highlight hover:bg-game-highlight/80 px-4 py-2 rounded transition-colors text-sm font-medium text-theme-darkest"
            >
              View Data
            </Link>
          </div>



          {/* Penetration Effectiveness */}
          <div className="bg-component-card border border-border-dark p-6 rounded-lg hover:border-blue-500/30 transition-colors">
            <h3 className="text-xl font-semibold mb-3">Penetration Effectiveness</h3>
            <p className="text-foreground/70 mb-4 text-sm leading-relaxed">
              Comprehensive table showing penetration effectiveness percentages against various defense values. 
              Essential for understanding damage reduction mechanics.
            </p>
            <Link 
              href="/penetration-effectiveness-table" 
              className="inline-block bg-game-highlight hover:bg-game-highlight/80 px-4 py-2 rounded transition-colors text-sm font-medium text-theme-darkest"
            >
              View Table
            </Link>
          </div>

          {/* BM3 Target Damage Boost */}
          <div className="bg-component-card border border-border-dark p-6 rounded-lg hover:border-blue-500/30 transition-colors">
            <h3 className="text-xl font-semibold mb-3">BM3 Target Damage Boost</h3>
            <p className="text-foreground/70 mb-4 text-sm leading-relaxed">
              Complete BM3 damage boost overview showing how each class damage changes based on number of targets hit.
              Essential for optimizing damage output in Battle Mode 3.
            </p>
            <Link 
              href="/bm3-target-damage-boost" 
              className="inline-block bg-game-highlight hover:bg-game-highlight/80 px-4 py-2 rounded transition-colors text-sm font-medium text-theme-darkest"
            >
              View Overview
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}