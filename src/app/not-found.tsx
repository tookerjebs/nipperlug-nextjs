import Link from 'next/link';
import { HomeIcon, CalculatorIcon, ChartBarIcon, TableCellsIcon } from '@heroicons/react/24/outline';

export default function NotFound() {
  return (
    <div className="text-gray-200">
      <div className="container mx-auto max-w-6xl p-2 sm:p-4 md:p-5 lg:p-6">
        {/* Header Section */}
        <div className="component-bg-dark mb-3 sm:mb-4 lg:mb-6">
          <div className="text-center">
            <h1 className="text-6xl sm:text-8xl lg:text-9xl font-bold text-game-gold mb-4">
              404
            </h1>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-game-gold mb-4">
              Page Not Found
            </h2>
            <p className="text-foreground/80 leading-relaxed text-lg">
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="space-y-6">
          {/* Popular Tools */}
          <section className="glass-panel-dark p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-game-gold mb-4">
              Popular Tools
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Link 
                href="/build-planner" 
                className="glass-panel p-4 border-l-4 border-game-gold hover:bg-component-panel transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <HomeIcon className="h-8 w-8 text-game-gold" />
                  <div>
                    <h4 className="text-foreground font-semibold mb-1">Build Planner</h4>
                    <p className="text-foreground/80 text-sm">Optimize your character builds</p>
                  </div>
                </div>
              </Link>

              <Link 
                href="/chloe-craft-profit-calculator" 
                className="glass-panel p-4 border-l-4 border-stat-utility hover:bg-component-panel transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <CalculatorIcon className="h-8 w-8 text-stat-utility" />
                  <div>
                    <h4 className="text-foreground font-semibold mb-1">Chloe Calculator</h4>
                    <p className="text-foreground/80 text-sm">Calculate craft profits</p>
                  </div>
                </div>
              </Link>

              <Link 
                href="/tier-lists" 
                className="glass-panel p-4 border-l-4 border-game-platinum hover:bg-component-panel transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <ChartBarIcon className="h-8 w-8 text-game-platinum" />
                  <div>
                    <h4 className="text-foreground font-semibold mb-1">Tier Lists</h4>
                    <p className="text-foreground/80 text-sm">Class rankings and guides</p>
                  </div>
                </div>
              </Link>

              <Link 
                href="/monster-database" 
                className="glass-panel p-4 border-l-4 border-stat-offensive hover:bg-component-panel transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <TableCellsIcon className="h-8 w-8 text-stat-offensive" />
                  <div>
                    <h4 className="text-foreground font-semibold mb-1">Monster Database</h4>
                    <p className="text-foreground/80 text-sm">Complete monster stats</p>
                  </div>
                </div>
              </Link>
            </div>
          </section>

          {/* All Tools */}
          <section className="glass-panel-dark p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-game-gold mb-4">
              All Tools
            </h2>
            
            <div className="glass-panel p-4 border-l-4 border-stat-defensive">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3 text-sm">
                <Link href="/calculators" className="text-stat-defensive hover:text-game-gold transition-colors">
                  Calculators
                </Link>
                <Link href="/exp-calculator" className="text-stat-defensive hover:text-game-gold transition-colors">
                  EXP Calculator
                </Link>
                <Link href="/force-wing-calculator" className="text-stat-defensive hover:text-game-gold transition-colors">
                  Force Wing Calculator
                </Link>
                <Link href="/oxp-calculator" className="text-stat-defensive hover:text-game-gold transition-colors">
                  OXP Calculator
                </Link>
                <Link href="/devils-shop-calculator" className="text-stat-defensive hover:text-game-gold transition-colors">
                  Devil Shop Calculator
                </Link>
                <Link href="/chloe-amity-calculator" className="text-stat-defensive hover:text-game-gold transition-colors">
                  Amity Calculator
                </Link>
                <Link href="/extreme-upgrade-calculator" className="text-stat-defensive hover:text-game-gold transition-colors">
                  Extreme Upgrade Calculator
                </Link>
                <Link href="/stats-wiki" className="text-stat-defensive hover:text-game-gold transition-colors">
                  Stats Guide
                </Link>
                <Link href="/penetration-effectiveness-table" className="text-stat-defensive hover:text-game-gold transition-colors">
                  Penetration Table
                </Link>
              </div>
            </div>
          </section>

          {/* Back to Home */}
          <section className="glass-panel-dark p-4 sm:p-6 text-center">
            <Link 
              href="/" 
              className="inline-flex items-center gap-2 bg-game-gold hover:bg-game-gold/80 text-theme-darkest px-6 py-3 rounded-lg transition-all duration-200 font-semibold hover:scale-105"
            >
              <HomeIcon className="h-5 w-5" />
              Back to Home
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}