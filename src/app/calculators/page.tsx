import Link from 'next/link';

export default function CalculatorsPage() {
  return (
    <div className="min-h-screen text-foreground p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">Calculators</h1>
          <p className="text-foreground/80">
            Comprehensive collection of calculators for Cabal Online progression, crafting, and trading.
          </p>
        </div>
        
        {/* Crafting & Trading Calculators */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Crafting & Trading</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Chloe Craft */}
            <div className="bg-component-card border border-border-dark p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Chloe Craft</h3>
              <p className="text-foreground/80 mb-4 text-sm">
                Calculate profit margins for Chloe crafting recipes and materials.
              </p>
              <Link 
                href="/chloe-craft-profit-calculator" 
                className="inline-block bg-pink-600 hover:bg-pink-700 px-4 py-2 rounded transition-colors text-sm"
              >
                Open
              </Link>
            </div>

            {/* Devil Shop */}
            <div className="bg-component-card border border-border-dark p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Devil Shop</h3>
              <p className="text-foreground/80 mb-4 text-sm">
                Calculate profit margins for Devil Shop items and trading.
              </p>
              <Link 
                href="/devils-shop-calculator" 
                className="inline-block bg-red-600 hover:bg-red-700 px-4 py-2 rounded transition-colors text-sm"
              >
                Open
              </Link>
            </div>

            {/* Amity Craft */}
            <div className="bg-component-card border border-border-dark p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Amity Craft</h3>
              <p className="text-foreground/80 mb-4 text-sm">
                Calculate profit margins for Amity crafting and materials.
              </p>
              <Link 
                href="/chloe-amity-calculator" 
                className="inline-block bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition-colors text-sm"
              >
                Open
              </Link>
            </div>
          </div>
        </div>

        {/* Experience Calculators */}
        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-6">Experience & Progression</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Character EXP */}
            <div className="bg-component-card border border-border-dark p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Character EXP</h3>
              <p className="text-foreground/80 mb-4 text-sm">
                Calculate experience needed to reach your target character level.
              </p>
              <Link 
                href="/exp-calculator" 
                className="inline-block bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors text-sm"
              >
                Open
              </Link>
            </div>

            {/* Force Wing EXP */}
            <div className="bg-component-card border border-border-dark p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Force Wing EXP</h3>
              <p className="text-foreground/80 mb-4 text-sm">
                Calculate experience needed for force wing upgrades and levels.
              </p>
              <Link 
                href="/force-wing-calculator" 
                className="inline-block bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded transition-colors text-sm"
              >
                Open
              </Link>
            </div>

            {/* OXP Calculator */}
            <div className="bg-component-card border border-border-dark p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">OXP Calculator</h3>
              <p className="text-foreground/80 mb-4 text-sm">
                Calculate OXP (Overlord Experience Points) requirements.
              </p>
              <Link 
                href="/oxp-calculator" 
                className="inline-block bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded transition-colors text-sm"
              >
                Open
              </Link>
            </div>

            {/* Extreme Upgrade Calculator */}
            <div className="bg-component-card border border-border-dark p-6 rounded-lg">
              <h3 className="text-xl font-semibold mb-3">Extreme Upgrade</h3>
              <p className="text-foreground/80 mb-4 text-sm">
                Calculate success rates, costs, and materials for extreme upgrades.
              </p>
              <Link 
                href="/extreme-upgrade-calculator" 
                className="inline-block bg-yellow-600 hover:bg-yellow-700 px-4 py-2 rounded transition-colors text-sm"
              >
                Open
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const metadata = {
  title: 'Calculators - Cabal Online Tools',
  description: 'Comprehensive collection of calculators for Cabal Online progression, crafting, and trading systems.',
};