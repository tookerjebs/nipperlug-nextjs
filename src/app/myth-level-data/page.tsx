import type { Metadata } from "next";
import { MythLevelDataViewer } from '@/tools/myth-level-data/MythLevelDataViewer';

// ISR: Revalidate every 30 days
export const revalidate = 2592000;

export const metadata: Metadata = {
  title: "Cabal Online Myth Level Data - Complete Stats & Probabilities | Nipperlug",
  description: "Complete Cabal Online myth level data with accurate probability calculations, stat values, holy power costs, and success chances for all 78 nodes. Essential reference for myth level planning.",
  keywords: "cabal online myth level data, myth level stats, myth level probabilities, myth level holy power, myth level success rates, cabal myth system, myth level reference, myth level guide",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: "Cabal Online Myth Level Data - Complete Stats & Probabilities",
    description: "Complete Cabal Online myth level data with accurate probability calculations, stat values, holy power costs, and success chances for all 78 nodes.",
    url: "https://nipperlug.com/myth-level-data/",
    type: "website",
    siteName: "nipperlug",
  },
  twitter: {
    card: "summary_large_image",
    title: "Cabal Online Myth Level Data - Complete Stats & Probabilities",
    description: "Complete Cabal Online myth level data with accurate probability calculations, stat values, holy power costs, and success chances for all 78 nodes.",
  },
  alternates: {
    canonical: "https://nipperlug.com/myth-level-data/",
  },
};

export default function MythLevelDataPage() {
  return (
    <div className="min-h-screen bg-theme-darkest">
      <div className="max-w-7xl mx-auto p-6">
        <MythLevelDataViewer />
      </div>
    </div>
  );
}
