import { Metadata } from 'next';
import { CollectionTracker } from '@/tools/collection-tracker/CollectionTracker';

export const metadata: Metadata = {
  title: 'Cabal Online Collection Tracker - Track Progress & Rewards | Nipperlug',
  description: 'Complete Cabal Online collection tracker for World, Dungeon, Special, and Boss collections. Track mission progress, required items, rewards, and unlock stat bonuses at 30%, 60%, and 100% completion milestones.',
  keywords: 'cabal online collection tracker, cabal collection missions, cabal collection rewards, cabal collection stats, cabal online progress tracker, collection bonuses, cabal collections guide',
  openGraph: {
    title: 'Cabal Online Collection Tracker - Track Progress & Rewards',
    description: 'Complete Cabal Online collection tracker for World, Dungeon, Special, and Boss collections. Track mission progress, required items, rewards, and unlock stat bonuses.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cabal Online Collection Tracker - Track Progress & Rewards',
    description: 'Complete Cabal Online collection tracker for World, Dungeon, Special, and Boss collections. Track mission progress, required items, rewards, and unlock stat bonuses.',
  },
};

// ISR: Revalidate every 30 days
export const revalidate = 2592000;

export default function CollectionTrackerPage() {
  return (
    <div className="min-h-screen bg-theme-darkest">
      <div className="max-w-7xl mx-auto p-6">
        <CollectionTracker />
      </div>
    </div>
  );
}