import type { Metadata } from "next";
import BM3TargetDamageTable from '@/tools/bm3-target-damage/BM3TargetDamageTable';

export const metadata: Metadata = {
  title: "Cabal Online BM3 Damage Boost Overview - Class Damage by Target Count - nipperlug",
  description: "Complete BM3 damage boost overview for Cabal Online. Learn how each class damage changes based on number of targets hit. Essential for optimizing damage output in BM3 battles.",
  keywords: "Cabal Online BM3, BM3 damage boost, BM3 target damage, Cabal Online target count damage, BM3 class damage, Cabal Online damage mechanics, BM3 optimization, target damage modifiers, Battle Mode 3",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Cabal Online BM3 Damage Boost Overview - Class Damage by Target Count - nipperlug",
    description: "Complete BM3 damage boost overview for Cabal Online. Learn how each class damage changes based on number of targets hit. Essential for optimizing damage output in BM3 battles.",
    url: "https://nipperlug.com/bm3-target-damage-boost/",
    type: "website",
    siteName: "nipperlug",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cabal Online BM3 Damage Boost Overview - Class Damage by Target Count - nipperlug",
    description: "Complete BM3 damage boost overview for Cabal Online. Learn how each class damage changes based on number of targets hit. Essential for optimizing damage output in BM3 battles.",
  },
  alternates: {
    canonical: "https://nipperlug.com/bm3-target-damage-boost/",
  },
};

export default function BM3TargetDamageBoostPage() {
  return (
    <div className="min-h-screen bg-theme-darkest">
      <div className="max-w-7xl mx-auto p-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">BM3 Damage Boost Overview</h1>
          <p className="text-foreground/80 mb-4">
            In Cabal Online each class has different damage output depending on how many targets they hit with their BM3 attacks. 
            Some classes deal significantly more damage when hitting fewer targets, while others maintain consistent damage regardless of target count. 
            This table shows the exact damage modifiers for each class based on the number of enemies hit.
          </p>
        </div>
        
        <BM3TargetDamageTable />
      </div>
    </div>
  );
}