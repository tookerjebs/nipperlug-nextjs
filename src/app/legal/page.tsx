import LegalPage from './LegalPage';

// ISR: Revalidate every 30 days
export const revalidate = 2592000;

export const metadata = {
  title: 'Legal - Nipperlug',
  description: 'Legal information, privacy policy, terms of use, and GDPR compliance for Nipperlug Cabal Online tools and resources.',
};

export default function Legal() {
  return <LegalPage />;
}