import Link from 'next/link';

export default function ExpCalculatorsPage() {
  return (
    <div className="min-h-screen text-foreground p-8">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-4">EXP Calculators</h1>
          <p className="text-foreground/80">
            Calculate experience requirements for different progression systems.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Character EXP */}
          <div className="bg-component-card border border-border-dark p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Character EXP</h2>
            <p className="text-foreground/80 mb-4 text-sm">
              Calculate experience needed to reach your target character level.
            </p>
            <Link 
              href="/exp-calculator" 
              className="inline-block bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded transition-colors text-sm"
            >
              Open Calculator
            </Link>
          </div>

          {/* Force Wing EXP */}
          <div className="bg-component-card border border-border-dark p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Force Wing EXP</h2>
            <p className="text-foreground/80 mb-4 text-sm">
              Calculate experience needed for force wing upgrades and levels.
            </p>
            <Link 
              href="/force-wing-calculator" 
              className="inline-block bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded transition-colors text-sm"
            >
              Open Calculator
            </Link>
          </div>

          {/* OXP Calculator */}
          <div className="bg-component-card border border-border-dark p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">OXP Calculator</h2>
            <p className="text-foreground/80 mb-4 text-sm">
              Calculate OXP (Overlord Experience Points) requirements.
            </p>
            <Link 
              href="/oxp-calculator" 
              className="inline-block bg-orange-600 hover:bg-orange-700 px-4 py-2 rounded transition-colors text-sm"
            >
              Open Calculator
            </Link>
          </div>

          {/* Myth EXP Calculator */}
          <div className="bg-component-card border border-border-dark p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-3">Myth EXP Calculator</h2>
            <p className="text-foreground/80 mb-4 text-sm">
              Calculate Myth EXP requirements with rebirth multipliers and reset penalties.
            </p>
            <Link 
              href="/myth-exp-calculator" 
              className="inline-block bg-green-600 hover:bg-green-700 px-4 py-2 rounded transition-colors text-sm"
            >
              Open Calculator
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}