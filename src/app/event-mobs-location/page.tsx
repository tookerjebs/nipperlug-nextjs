import EventMobsLocation from '@/tools/event-mobs-location/EventMobsLocation';

export const metadata = {
  title: 'Cabal Online Event Mobs Spawn Locations - Interactive Map & Hunting Routes',
  description: 'Explore event mob spawn locations across Cabal Online maps. Select a mob type to discover all spawn points and optimize your hunting routes. Interactive map with coordinate display.',
  keywords: 'Cabal Online event mobs, spawn locations, hunting routes, event mob map, mob spawners, event farming',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'Cabal Online Event Mobs Spawn Locations - Interactive Map',
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