import type { Metadata } from "next";
import PenetrationEffectivenessTable from '@/tools/penetration-effectiveness/PenetrationEffectivenessTable';

// ISR: Revalidate every 30 days
export const revalidate = 2592000;

export const metadata: Metadata = {
  title: "Cabal Online Penetration Effectiveness Table - Boss Defense Calculator - nipperlug",
  description: "Complete Cabal Online penetration effectiveness table showing damage reduction vs boss defense values. Essential penetration calculator for optimizing damage against bosses, dungeons, and PvP. Includes early game to endgame boss defense ranges.",
  keywords: "Cabal Online penetration, penetration effectiveness, boss defense calculator, damage reduction table, Cabal Online penetration guide, boss damage calculator, penetration vs defense, Cabal Online damage mechanics, boss penetration, dungeon penetration, PvP penetration",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Cabal Online Penetration Effectiveness Table - Boss Defense Calculator - nipperlug",
    description: "Complete Cabal Online penetration effectiveness table showing damage reduction vs boss defense values. Essential penetration calculator for optimizing damage against bosses, dungeons, and PvP. Includes early game to endgame boss defense ranges.",
    url: "https://nipperlug.com/penetration-effectiveness-table/",
    type: "website",
    siteName: "nipperlug",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cabal Online Penetration Effectiveness Table - Boss Defense Calculator - nipperlug",
    description: "Complete Cabal Online penetration effectiveness table showing damage reduction vs boss defense values. Essential penetration calculator for optimizing damage against bosses, dungeons, and PvP. Includes early game to endgame boss defense ranges.",
  },
  alternates: {
    canonical: "https://nipperlug.com/penetration-effectiveness-table/",
  },
};

export default function PenetrationEffectivenessTablePage() {
  return (
    <div className="min-h-screen text-foreground p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Penetration Effectiveness Table</h1>
          <p className="text-foreground/80 mb-4">
            Reference table showing how penetration reduces enemy damage reduction across defense values.
          </p>
          <div className="bg-blue-900/30 border border-blue-500/50 p-4 rounded-lg text-sm">
            <h3 className="font-semibold mb-2">📊 How to Read This Table</h3>
            <p className="text-foreground/80 mb-2">
              Find your target's <strong>boss defense</strong> (rows) and your <strong>penetration stat</strong> (columns). 
              The intersection shows the <strong>final damage reduction percentage</strong> you'll face.
            </p>
            <div className="flex flex-wrap gap-3 text-xs">
              <span className="bg-green-900/50 text-green-300 px-2 py-1 rounded">Green = Excellent (5-15% reduction)</span>
              <span className="bg-yellow-800/50 text-yellow-200 px-2 py-1 rounded">Yellow = Good (15-30% reduction)</span>
              <span className="bg-red-800/50 text-red-200 px-2 py-1 rounded">Red = Poor (50%+ reduction)</span>
            </div>
          </div>
        </div>
        
        <PenetrationEffectivenessTable />
      </div>
    </div>
  );
}