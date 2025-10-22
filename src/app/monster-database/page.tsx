import type { Metadata } from "next";
import { MobTable } from '../../tools/mob-table/MobTable';

export const metadata: Metadata = {
  title: "Cabal Online Monster Database - nipperlug",
  description: "Complete List of All Monsters and Bosses in Cabal Online – Stats, Levels, Locations, and much more.",
  keywords: "Cabal Online monsters, monster database, boss stats, mob table, monster levels, monster locations, Cabal Online mobs, creature stats",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Cabal Online Monster Database - nipperlug",
    description: "Complete List of All Monsters and Bosses in Cabal Online – Stats, Levels, Locations, and much more.",
    url: "https://nipperlug.com/monster-database/",
    type: "website",
    siteName: "nipperlug",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cabal Online Monster Database - nipperlug",
    description: "Complete List of All Monsters and Bosses in Cabal Online – Stats, Levels, Locations, and much more.",
  },
  alternates: {
    canonical: "https://nipperlug.com/monster-database/",
  },
};

// ISR: Revalidate every 30 days
export const revalidate = 2592000;

export default function MobTablePage() {
  return <MobTable />;
}