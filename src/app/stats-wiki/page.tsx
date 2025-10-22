import type { Metadata } from "next";
import StatsWiki from '../../tools/stats-wiki/StatsWiki';

export const metadata: Metadata = {
  title: "All Cabal Online Stats Explained with Formulas - nipperlug",
  description: "Covering all stats and damage formulas, and stat interactions. Optimize your character build with detailed explanations of every game statistic",
  keywords: "Cabal Online stats, damage formulas, stat calculations, character optimization, game mechanics, stat interactions, build optimization, Cabal Online guide",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "All Cabal Online Stats Explained with Formulas - nipperlug",
    description: "Covering all stats and damage formulas, and stat interactions. Optimize your character build with detailed explanations of every game statistic",
    url: "https://nipperlug.com/stats-wiki/",
    type: "website",
    siteName: "nipperlug",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Cabal Online Stats Explained with Formulas - nipperlug",
    description: "Covering all stats and damage formulas, and stat interactions. Optimize your character build with detailed explanations of every game statistic",
  },
  alternates: {
    canonical: "https://nipperlug.com/stats-wiki/",
  },
};

// ISR: Revalidate every 30 days
export const revalidate = 2592000;

export default function StatsWikiPage() {
  return <StatsWiki />;
}
