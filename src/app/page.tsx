import Link from 'next/link';
import RecentPatches from '@/components/ui/RecentPatches';

// ISR: Revalidate every 30 days
export const revalidate = 2592000;

export default function HomePage() {
  return (
    <div className="text-foreground relative">
      
      {/* Unified Hero + Tools Section */}
      <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 py-8 sm:py-12 relative z-10">
        <div className="glass-panel p-8 md:p-12">
        {/* Hero Header */}
        <div className="text-center mb-12">
          <h1 className="text-2xl md:text-3xl text-game-gold font-medium mb-4 tracking-wide">
            Tools & Calculators for Cabal Online
          </h1>
          <p className="text-sm text-foreground/70 max-w-2xl mx-auto leading-relaxed">
            A collection of helpful calculators, build planners, and reference guides for Cabal Online.
          </p>
        </div>

        {/* Recent Updates */}
        <div className="mb-12">
          <RecentPatches />
        </div>

        {/* Tools Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {/* Build Planner */}
            <Link href="/build-planner" prefetch={false} className="block h-full">
              <div className="glass-panel p-6 border-l-4 border-slate-500/30 hover:border-game-highlight/50 transition-all duration-300 hover:scale-105 cursor-pointer group h-full flex flex-col">
                <h3 className="text-lg font-medium text-game-gold mb-2 group-hover:text-game-highlight/80 tracking-wide">
                  Build Planner
                </h3>
                <p className="text-foreground/80 mb-4 text-sm leading-relaxed flex-grow">
                  Complete character optimization with 16+ game systems integration.
                </p>
                <div className="flex items-center gap-2 text-game-highlight font-normal opacity-70 group-hover:opacity-100 transition-opacity duration-300 mt-auto">
                  <span>Open</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </div>
            </Link>

            {/* Tier Lists */}
            <Link href="/tier-lists" prefetch={false} className="block h-full">
              <div className="glass-panel p-6 border-l-4 border-slate-500/30 hover:border-game-platinum/50 transition-all duration-300 hover:scale-105 cursor-pointer group h-full flex flex-col">
                <h3 className="text-lg font-medium text-game-highlight mb-2 group-hover:text-game-highlight/80 tracking-wide">
                  Tier Lists
                </h3>
                <p className="text-foreground/80 mb-4 text-sm leading-relaxed flex-grow">
                  Class rankings for PvP, PvE, and Nation War scenarios.
                </p>
                <div className="flex items-center gap-2 text-game-highlight font-normal opacity-70 group-hover:opacity-100 transition-opacity duration-300 mt-auto">
                  <span>Open</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </div>
            </Link>

            {/* Monster Database */}
            <Link href="/monster-database" prefetch={false} className="block h-full">
              <div className="glass-panel p-6 border-l-4 border-slate-500/30 hover:border-game-highlight/50 transition-all duration-300 hover:scale-105 cursor-pointer group h-full flex flex-col">
                <h3 className="text-lg font-medium text-game-highlight mb-2 group-hover:text-game-highlight/80 tracking-wide">
                  Monster Database
                </h3>
                <p className="text-foreground/80 mb-4 text-sm leading-relaxed flex-grow">
                  Stats of all monsters in the game.
                </p>
                <div className="flex items-center gap-2 text-game-highlight font-normal opacity-70 group-hover:opacity-100 transition-opacity duration-300 mt-auto">
                  <span>Open</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </div>
            </Link>

            {/* Collection Tracker */}
            <Link href="/collection-tracker" prefetch={false} className="block h-full">
              <div className="glass-panel p-6 border-l-4 border-slate-500/30 hover:border-game-highlight/50 transition-all duration-300 hover:scale-105 cursor-pointer group h-full flex flex-col">
                <h3 className="text-lg font-medium text-game-highlight mb-2 group-hover:text-game-highlight/80 tracking-wide">
                  Collection Tracker
                </h3>
                <p className="text-foreground/80 mb-4 text-sm leading-relaxed flex-grow">
                  Track your collection progress and completion milestones.
                </p>
                <div className="flex items-center gap-2 text-game-highlight font-normal opacity-70 group-hover:opacity-100 transition-opacity duration-300 mt-auto">
                  <span>Open</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </div>
            </Link>

            {/* Myth Level Data */}
            <Link href="/myth-level-data" prefetch={false} className="block h-full">
              <div className="glass-panel p-6 border-l-4 border-slate-500/30 hover:border-game-highlight/50 transition-all duration-300 hover:scale-105 cursor-pointer group h-full flex flex-col">
                <h3 className="text-lg font-medium text-game-highlight mb-2 group-hover:text-game-highlight/80 tracking-wide">
                  Myth Level Data
                </h3>
                <p className="text-foreground/80 mb-4 text-sm leading-relaxed flex-grow">
                  Complete myth level reference with stats, probabilities, and costs.
                </p>
                <div className="flex items-center gap-2 text-game-highlight font-normal opacity-70 group-hover:opacity-100 transition-opacity duration-300 mt-auto">
                  <span>Open</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </div>
            </Link>

            {/* Character EXP Calculator */}
            <Link href="/exp-calculator" prefetch={false} className="block h-full">
              <div className="glass-panel p-6 border-l-4 border-slate-500/30 hover:border-game-highlight/50 transition-all duration-300 hover:scale-105 cursor-pointer group h-full flex flex-col">
                <h3 className="text-lg font-medium text-game-highlight mb-2 group-hover:text-game-highlight/80 tracking-wide">
                  Character EXP
                </h3>
                <p className="text-foreground/80 mb-4 text-sm leading-relaxed flex-grow">
                  Calculate experience needed for character leveling.
                </p>
                <div className="flex items-center gap-2 text-game-highlight font-normal opacity-70 group-hover:opacity-100 transition-opacity duration-300 mt-auto">
                  <span>Open</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </div>
            </Link>

            {/* OXP Calculator */}
            <Link href="/oxp-calculator" prefetch={false} className="block h-full">
              <div className="glass-panel p-6 border-l-4 border-slate-500/30 hover:border-game-highlight/50 transition-all duration-300 hover:scale-105 cursor-pointer group h-full flex flex-col">
                <h3 className="text-lg font-medium text-game-highlight mb-2 group-hover:text-game-highlight/80 tracking-wide">
                  OXP Calculator
                </h3>
                <p className="text-foreground/80 mb-4 text-sm leading-relaxed flex-grow">
                  Calculate OXP experience and leveling requirements.
                </p>
                <div className="flex items-center gap-2 text-game-highlight font-normal opacity-70 group-hover:opacity-100 transition-opacity duration-300 mt-auto">
                  <span>Open</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </div>
            </Link>

            {/* Force Wing Calculator */}
            <Link href="/force-wing-calculator" prefetch={false} className="block h-full">
              <div className="glass-panel p-6 border-l-4 border-slate-500/30 hover:border-game-highlight/50 transition-all duration-300 hover:scale-105 cursor-pointer group h-full flex flex-col">
                <h3 className="text-lg font-medium text-game-highlight mb-2 group-hover:text-game-highlight/80 tracking-wide">
                  Force Wing EXP
                </h3>
                <p className="text-foreground/80 mb-4 text-sm leading-relaxed flex-grow">
                  Calculate Force Wing experience and upgrade costs.
                </p>
                <div className="flex items-center gap-2 text-game-highlight font-normal opacity-70 group-hover:opacity-100 transition-opacity duration-300 mt-auto">
                  <span>Open</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </div>
            </Link>

            {/* Chloe Craft Profit */}
            <Link href="/chloe-craft-profit-calculator" prefetch={false} className="block h-full">
              <div className="glass-panel p-6 border-l-4 border-slate-500/30 hover:border-game-highlight/50 transition-all duration-300 hover:scale-105 cursor-pointer group h-full flex flex-col">
                <h3 className="text-lg font-medium text-game-highlight mb-2 group-hover:text-game-highlight/80 tracking-wide">
                  Chloe Craft Profit
                </h3>
                <p className="text-foreground/80 mb-4 text-sm leading-relaxed flex-grow">
                  Calculate crafting profits and material costs.
                </p>
                <div className="flex items-center gap-2 text-game-highlight font-normal opacity-70 group-hover:opacity-100 transition-opacity duration-300 mt-auto">
                  <span>Open</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </div>
            </Link>

            {/* Devil Shop Calculator */}
            <Link href="/devils-shop-calculator" prefetch={false} className="block h-full">
              <div className="glass-panel p-6 border-l-4 border-slate-500/30 hover:border-game-highlight/50 transition-all duration-300 hover:scale-105 cursor-pointer group h-full flex flex-col">
                <h3 className="text-lg font-medium text-game-highlight mb-2 group-hover:text-game-highlight/80 tracking-wide">
                  Devil Shop
                </h3>
                <p className="text-foreground/80 mb-4 text-sm leading-relaxed flex-grow">
                  Calculate Devil Shop exchange rates and profits.
                </p>
                <div className="flex items-center gap-2 text-game-highlight font-normal opacity-70 group-hover:opacity-100 transition-opacity duration-300 mt-auto">
                  <span>Open</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </div>
            </Link>

            {/* Chloe Amity Calculator */}
            <Link href="/chloe-amity-calculator" prefetch={false} className="block h-full">
              <div className="glass-panel p-6 border-l-4 border-slate-500/30 hover:border-game-highlight/50 transition-all duration-300 hover:scale-105 cursor-pointer group h-full flex flex-col">
                <h3 className="text-lg font-medium text-game-highlight mb-2 group-hover:text-game-highlight/80 tracking-wide">
                  Chloe Amity
                </h3>
                <p className="text-foreground/80 mb-4 text-sm leading-relaxed flex-grow">
                  Calculate Chloe Amity costs and requirements.
                </p>
                <div className="flex items-center gap-2 text-game-highlight font-normal opacity-70 group-hover:opacity-100 transition-opacity duration-300 mt-auto">
                  <span>Open</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </div>
            </Link>

            {/* Extreme Upgrade Calculator */}
            <Link href="/extreme-upgrade-calculator" prefetch={false} className="block h-full">
              <div className="glass-panel p-6 border-l-4 border-slate-500/30 hover:border-game-highlight/50 transition-all duration-300 hover:scale-105 cursor-pointer group h-full flex flex-col">
                <h3 className="text-lg font-medium text-game-highlight mb-2 group-hover:text-game-highlight/80 tracking-wide">
                  Extreme Upgrade
                </h3>
                <p className="text-foreground/80 mb-4 text-sm leading-relaxed flex-grow">
                  Calculate extreme upgrade costs, success rates, and statistics.
                </p>
                <div className="flex items-center gap-2 text-game-highlight font-normal opacity-70 group-hover:opacity-100 transition-opacity duration-300 mt-auto">
                  <span>Open</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </div>
            </Link>

            {/* Stats Guide */}
            <Link href="/stats-wiki" prefetch={false} className="block h-full">
              <div className="glass-panel p-6 border-l-4 border-slate-500/30 hover:border-game-highlight/50 transition-all duration-300 hover:scale-105 cursor-pointer group h-full flex flex-col">
                <h3 className="text-lg font-medium text-game-highlight mb-2 group-hover:text-game-highlight/80 tracking-wide">
                  Stats Wiki
                </h3>
                <p className="text-foreground/80 mb-4 text-sm leading-relaxed flex-grow">
                  Complete game mechanics and stats reference guide.
                </p>
                <div className="flex items-center gap-2 text-game-highlight font-normal opacity-70 group-hover:opacity-100 transition-opacity duration-300 mt-auto">
                  <span>Open</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </div>
            </Link>

            {/* BM3 Damage Boost Overview */}
            <Link href="/bm3-target-damage-boost" prefetch={false} className="block h-full">
              <div className="glass-panel p-6 border-l-4 border-slate-500/30 hover:border-game-highlight/50 transition-all duration-300 hover:scale-105 cursor-pointer group h-full flex flex-col">
                <h3 className="text-lg font-medium text-game-highlight mb-2 group-hover:text-game-highlight/80 tracking-wide">
                  BM3 Damage Boost
                </h3>
                <p className="text-foreground/80 mb-4 text-sm leading-relaxed flex-grow">
                  Class damage modifiers based on target count in Battle Mode 3.
                </p>
                <div className="flex items-center gap-2 text-game-highlight font-normal opacity-70 group-hover:opacity-100 transition-opacity duration-300 mt-auto">
                  <span>Open</span>
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </div>
            </Link>
        </div>

        </div>
      </div>
    </div>
  );
}