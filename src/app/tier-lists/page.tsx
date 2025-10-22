import type { Metadata } from "next";
import TierLists from '../../tools/tier-lists/TierLists';

export const metadata: Metadata = {
  title: "Cabal Online Class Tier List 2025 - nipperlug",
  description: "Tier Lists for Cabal Online for 2025. All 9 Classes ranked based on their current performance in PvE, PvP and more.",
  keywords: "Cabal Online tier list, class tier list, Cabal Online classes 2025, PvE tier list, PvP tier list, best Cabal Online class, class rankings, Cabal Online guide",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Cabal Online Class Tier List 2025 - nipperlug",
    description: "Tier Lists for Cabal Online for 2025. All 9 Classes ranked based on their current performance in PvE, PvP and more.",
    url: "https://nipperlug.com/tier-lists/",
    type: "website",
    siteName: "nipperlug",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cabal Online Class Tier List 2025 - nipperlug",
    description: "Tier Lists for Cabal Online for 2025. All 9 Classes ranked based on their current performance in PvE, PvP and more.",
  },
  alternates: {
    canonical: "https://nipperlug.com/tier-lists/",
  },
};

// ISR: Revalidate every 30 days
export const revalidate = 2592000;

export default function TierListsPage() {
  return (
    <div>
      {/* Main Tier Lists Component */}
      <TierLists />
    </div>
  );
}