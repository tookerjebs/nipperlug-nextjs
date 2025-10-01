import type { Metadata } from "next";
import ChloeCalculator from '@/tools/chloe-calculator/components/ChloeCalculator';

// Force static generation - no server-side rendering needed
export const dynamic = 'force-static';

export const metadata: Metadata = {
  title: "Chloe Craft Profit Calculator - nipperlug",
  description: "CABAL Online Profit Calculator for Chloe Crafting. Helps you determine which items will yield the most profit.",
  keywords: "Cabal Online Chloe craft, profit calculator, Chloe crafting, item profit, crafting calculator, Cabal Online crafting, profit analysis",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Chloe Craft Profit Calculator - nipperlug",
    description: "CABAL Online Profit Calculator for Chloe Crafting. Helps you determine which items will yield the most profit.",
    url: "https://nipperlug.com/chloe-craft-profit-calculator/",
    type: "website",
    siteName: "nipperlug",
  },
  twitter: {
    card: "summary_large_image",
    title: "Chloe Craft Profit Calculator - nipperlug",
    description: "CABAL Online Profit Calculator for Chloe Crafting. Helps you determine which items will yield the most profit.",
  },
  alternates: {
    canonical: "https://nipperlug.com/chloe-craft-profit-calculator/",
  },
};

export default function ChloeCraftCalculatorPage() {
  return (
    <div className="min-h-screen bg-theme-darkest">
      <div className="max-w-7xl mx-auto p-6">
        <ChloeCalculator />
      </div>
    </div>
  );
}