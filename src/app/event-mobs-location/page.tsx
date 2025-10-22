import EventMobsLocation from '@/tools/event-mobs-location/EventMobsLocation';

// ISR: Revalidate every 30 days
export const revalidate = 2592000;

export const metadata = {
  title: 'Cabal Online Event Mobs Spawn Locations',
  description: 'Explore event mob spawn locations across Cabal Online maps. Lanterns, Cabal Rangers, Fortune Pigs, Snowmen, and more. Discover all spawn points and optimize your hunting routes.',
  keywords: 'Cabal Online event mobs, spawn locations, hunting routes, event mob map, cabal event, event farming',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'Cabal Online Event Mobs Spawn Locations',
    description: 'Find all event mob spawn locations on interactive maps. Perfect for optimizing hunting routes and farming strategies.',
    url: 'https://nipperlug.com/event-mobs-location/',
    type: 'website',
    siteName: 'Nipperlug - Cabal Online Tools',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Cabal Online Event Mobs Spawn Locations',
    description: 'Interactive map showing all event mob spawn points for efficient farming.',
  },
  alternates: {
    canonical: 'https://nipperlug.com/event-mobs-location/',
  },
};

export default function EventMobsLocationPage() {
  return <EventMobsLocation />;
}