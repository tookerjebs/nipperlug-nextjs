import CreditsPage from './CreditsPage';

// ISR: Revalidate every 30 days
export const revalidate = 2592000;

export const metadata = {
  title: 'About & Credits - Nipperlug',
  description: 'About this project, contributors, data sources, technical information, and acknowledgments for Nipperlug Cabal Online resources.',
};

export default function Credits() {
  return <CreditsPage />;
}
