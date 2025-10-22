import type { Metadata } from "next";
import ExtremeUpgradeCalculator from '@/tools/extreme-upgrade-calculator/ExtremeUpgradeCalculator';

// Force static generation - no server-side rendering needed
export const dynamic = 'force-static';

// ISR: Revalidate every 30 days
export const revalidate = 2592000;

export const metadata: Metadata = {
  title: "Cabal Online Extreme Upgrade Calculator - nipperlug",
  description: "Calculate success rates, costs, and materials needed for extreme upgrades in Cabal Online. Plan your equipment upgrades with accurate probability calculations and cost analysis.",
  keywords: "Cabal Online extreme upgrade, upgrade calculator, success rate calculator, equipment upgrade, upgrade costs, upgrade materials, extreme upgrade guide, Cabal Online upgrades",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Cabal Online Extreme Upgrade Calculator - nipperlug",
    description: "Calculate success rates, costs, and materials needed for extreme upgrades in Cabal Online. Plan your equipment upgrades with accurate probability calculations and cost analysis.",
    url: "https://nipperlug.com/extreme-upgrade-calculator/",
    type: "website",
    siteName: "nipperlug",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cabal Online Extreme Upgrade Calculator - nipperlug",
    description: "Calculate success rates, costs, and materials needed for extreme upgrades in Cabal Online. Plan your equipment upgrades with accurate probability calculations and cost analysis.",
  },
  alternates: {
    canonical: "https://nipperlug.com/extreme-upgrade-calculator/",
  },
};

export default function ExtremeUpgradeCalculatorPage() {
  return (
    <div className="min-h-screen text-foreground p-8">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Extreme Upgrade Calculator</h1>
          <p className="text-foreground/80 mb-6">
            Extreme Upgrade Calculator and budget planner for Cabal Online.
          </p>
          
          <div className="mb-4">
            <div className="font-semibold mb-2">How to Use This Calculator:</div>
            <ul className="list-disc list-inside space-y-1 text-sm text-foreground/80">
              <li>Select your server type</li>
              <li>Choose your equipment type (1H/2H weapons, armor, or bike)</li>
              <li>Set your current extreme level and target level</li>
              <li>Configure core prices (optional) for accurate cost calculations</li>
              <li>Select cores for each upgrade level to see success rates and costs</li>
            </ul>
          </div>
        </div>
        
        <ExtremeUpgradeCalculator />
      </div>
    </div>
  );
}