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
        </div>
        <PenetrationEffectivenessTable />
      </div>
    </div>
  );
}