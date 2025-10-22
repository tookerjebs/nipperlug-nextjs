import type { Metadata } from "next";
import { DevilShopCalculator } from '@/tools/devil-shop-calculator';

// Force static generation - no server-side rendering needed
export const dynamic = 'force-static';

// ISR: Revalidate every 30 days
export const revalidate = 2592000;

export const metadata: Metadata = {
  title: "Devil Shop Profit Calculator - nipperlug",
  description: "Calculate profits from Devil Shop items in Cabal Online. Compare token costs vs market prices to maximize your Devil Shop investments.",
  keywords: "Cabal Online Devil Shop, Devil Shop calculator, token profit, Devil Shop items, profit calculator, token investment, Cabal Online tokens",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Devil Shop Profit Calculator - nipperlug",
    description: "Calculate profits from Devil Shop items in Cabal Online. Compare token costs vs market prices to maximize your Devil Shop investments.",
    url: "https://nipperlug.com/devils-shop-calculator/",
    type: "website",
    siteName: "nipperlug",
  },
  twitter: {
    card: "summary_large_image",
    title: "Devil Shop Profit Calculator - nipperlug",
    description: "Calculate profits from Devil Shop items in Cabal Online. Compare token costs vs market prices to maximize your Devil Shop investments.",
  },
  alternates: {
    canonical: "https://nipperlug.com/devils-shop-calculator/",
  },
};

export default function DevilShopCalculatorPage() {
  return (
    <div className="min-h-screen bg-theme-darkest">
      <div className="max-w-7xl mx-auto p-6">
        <DevilShopCalculator />
      </div>
    </div>
  );
}