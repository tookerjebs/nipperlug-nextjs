'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight, Calendar, ExternalLink } from 'lucide-react';
import Link from 'next/link';

interface PatchItem {
  id: string;
  date: string;
  type: 'feature' | 'fix' | 'improvement' | 'tool';
  title: string;
  description: string;
  category?: string;
}

const RECENT_PATCHES: PatchItem[] = [
  {
    id: '2025-10-07',
    date: '2025-10-07',
    type: 'improvement',
    title: 'Collection Tracker Enhanced',
    description: 'Added better item search bar, tracking with item summary banner.',
    category: 'Collection Tracker'
  },
  {
    id: '2025-09-28',
    date: '2025-09-28',
    type: 'feature',
    title: 'Passive Skills Added to Build Planner',
    description: 'Build planner now includes passive skill trees for all classes.',
    category: 'Build Planner'
  },
  {
    id: '2025-09-27',
    date: '2025-09-27',
    type: 'improvement',
    title: 'Monster Database Updated to EP39',
    description: 'Monster database now includes all monsters and bosses up to Episode 39.',
    category: 'Monster Database'
  },
  {
    id: '2025-09-26',
    date: '2025-09-26',
    type: 'tool',
    title: 'Myth Level Data Table',
    description: 'Myth level data reference table that shows holy power values, roll probability, stat values across all levels.',
    category: 'New Tool'
  },
  {
    id: '2025-09-24',
    date: '2025-09-24',
    type: 'tool',
    title: 'BM3 Damage Boost Overview',
    description: 'BM3 damage boost reference table showing how each class damage changes based on number of targets hit.',
    category: 'New Tool'
  },
  {
    id: '2025-08-21',
    date: '2025-08-21',
    type: 'tool',
    title: 'Collection Tracker',
    description: 'Track your collection progress across Dungeon, World, Special, and Boss collections. Monitor completion milestones and export/import your progress.',
    category: 'New Tool'
  },
  {
    id: '2025-08-11',
    date: '2025-08-11',
    type: 'tool',
    title: 'Extreme Upgrade Calculator',
    description: 'Advanced calculator for extreme upgrade planning with success rates, cost analysis, confidence intervals.',
    category: 'New Tool'
  },
  {
    id: '2025-07-12',
    date: '2025-07-12',
    type: 'tool',
    title: 'Penetration Effectiveness Table',
    description: 'Penetration effectiveness table showing damage reduction vs boss defense values. Credits to osaka',
    category: 'New Tool'
  },
  {
    id: '2025-07-18',
    date: '2025-07-18',
    type: 'tool',
    title: 'Game Stats Wiki',
    description: 'Stats wiki covering all game mechanics, damage formulas, and stat interactions with detailed explanations.',
    category: 'New Tool'
  },
  {
    id: '2024-11-30',
    date: '2024-11-30',
    type: 'feature',
    title: 'Manual Stats Override Mode',
    description: 'Added toggle to use only manual stats for calculations, ignoring all other systems.',
    category: 'Build Planner'
  },
  {
    id: '2024-11-29',
    date: '2024-11-29',
    type: 'feature',
    title: 'Damage Analysis System',
    description: 'New damage breakdown and analysis tool with detailed calculations.',
    category: 'Build Planner'
  },
  {
    id: '2024-11-28',
    date: '2024-11-28',
    type: 'improvement',
    title: 'Damage Calculator Improvements',
    description: 'Improved accuracy, removed PvP calculations, fixed variance minimum damage, and added monster selection.',
    category: 'Build Planner'
  },
  {
    id: '2024-11-27',
    date: '2024-11-27',
    type: 'feature',
    title: 'Force Wing System',
    description: 'New progression system added with stat bonuses and slot management.',
    category: 'Build Planner'
  },
  {
    id: '2024-11-26',
    date: '2024-11-26',
    type: 'improvement',
    title: 'Equipment System Overhaul',
    description: 'Unified upgrade modal layouts, improved UX, and fixed configuration isolation issues.',
    category: 'Build Planner'
  },
  {
    id: '2024-11-25',
    date: '2024-11-25',
    type: 'fix',
    title: 'Weapon System Fixes',
    description: 'Fixed 2-handed weapons tooltip, epic options not applying stats, and added missing Chakram materials.',
    category: 'Build Planner'
  },
  {
    id: '2024-11-24',
    date: '2024-11-24',
    type: 'tool',
    title: 'Build Planner Launch',
    description: 'Initial release of the character build planning tool with basic equipment and stats systems.',
    category: 'New Tool'
  },
  {
    id: '2024-11-20',
    date: '2024-11-20',
    type: 'tool',
    title: 'Monster Database',
    description: 'Complete monster stats database with advanced filtering and search capabilities for all Cabal Online monsters.',
    category: 'New Tool'
  },
  {
    id: '2024-11-18',
    date: '2024-11-18',
    type: 'tool',
    title: 'Tier Lists',
    description: 'Interactive class tier lists for PvP, PvE, and Nation War scenarios with detailed rankings and explanations.',
    category: 'New Tool'
  },
  {
    id: '2024-11-15',
    date: '2024-11-15',
    type: 'tool',
    title: 'Chloe Amity Calculator',
    description: 'Calculate Chloe Amity costs, requirements, and optimal strategies for amity progression.',
    category: 'New Tool'
  },
  {
    id: '2024-11-12',
    date: '2024-11-12',
    type: 'tool',
    title: 'Devil Shop Calculator',
    description: 'Calculate Devil Shop exchange rates, profits, and optimal trading strategies.',
    category: 'New Tool'
  },
  {
    id: '2024-11-10',
    date: '2024-11-10',
    type: 'tool',
    title: 'Chloe Craft Profit Calculator',
    description: 'Calculate crafting profits, material costs, and optimal crafting strategies for maximum profit.',
    category: 'New Tool'
  },
  {
    id: '2024-11-08',
    date: '2024-11-08',
    type: 'tool',
    title: 'Force Wing EXP Calculator',
    description: 'Calculate Force Wing experience requirements, upgrade costs, and progression planning.',
    category: 'New Tool'
  },
  {
    id: '2024-11-05',
    date: '2024-11-05',
    type: 'tool',
    title: 'OXP Calculator',
    description: 'Calculate OXP experience requirements and leveling strategies for optimal progression.',
    category: 'New Tool'
  },
  {
    id: '2024-11-01',
    date: '2024-11-01',
    type: 'tool',
    title: 'Character EXP Calculator',
    description: 'Calculate character experience requirements, leveling costs, and optimal grinding strategies.',
    category: 'New Tool'
  }
];

const getTypeColor = (type: PatchItem['type']) => {
  switch (type) {
    case 'feature':
      return 'bg-green-500/10 text-green-400 border-green-500/20';
    case 'fix':
      return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
    case 'improvement':
      return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
    case 'tool':
      return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
    default:
      return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
  }
};

const getToolRoute = (title: string): string | null => {
  const routeMap: Record<string, string> = {
    'Myth Level Data Table': '/myth-level-data',
    'BM3 Damage Boost Overview': '/bm3-target-damage-boost',
    'Collection Tracker Enhanced': '/collection-tracker',
    'Collection Tracker': '/collection-tracker',
    'Extreme Upgrade Calculator': '/extreme-upgrade-calculator',
    'Penetration Effectiveness Table': '/penetration-effectiveness-table',
    'Game Stats Wiki': '/stats-wiki',
    'Build Planner Launch': '/build-planner',
    'Passive Skills Added to Build Planner': '/build-planner',
    'Monster Database': '/monster-database',
    'Monster Database Updated to EP39': '/monster-database',
    'Tier Lists': '/tier-lists',
    'Chloe Amity Calculator': '/chloe-amity-calculator',
    'Devil Shop Calculator': '/devils-shop-calculator',
    'Chloe Craft Profit Calculator': '/chloe-craft-profit-calculator',
    'Force Wing EXP Calculator': '/force-wing-calculator',
    'OXP Calculator': '/oxp-calculator',
    'Character EXP Calculator': '/exp-calculator'
  };
  
  return routeMap[title] || null;
};

export default function RecentPatches() {
  const [currentPage, setCurrentPage] = useState(0);
  const itemsPerPage = 5;
  
  const totalPages = Math.ceil(RECENT_PATCHES.length / itemsPerPage);
  const startIndex = currentPage * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPatches = RECENT_PATCHES.slice(startIndex, endIndex);

  const goToNextPage = () => {
    setCurrentPage((prev) => (prev + 1) % totalPages);
  };

  const goToPrevPage = () => {
    setCurrentPage((prev) => (prev - 1 + totalPages) % totalPages);
  };

  const goToPage = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="glass-panel p-6 rounded-lg">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-2">
          <Calendar className="w-5 h-5 text-game-gold" />
          <h2 className="text-xl font-medium text-game-gold">Recent Updates</h2>
        </div>
        <div className="text-sm text-foreground/60">
          {RECENT_PATCHES.length} total updates
        </div>
      </div>

      {/* Updates List */}
      <div className="space-y-3 mb-6">
        {currentPatches.map((patch) => {
          const isNewTool = patch.category === 'New Tool';
          const toolRoute = getToolRoute(patch.title);
          const isLinkable = toolRoute !== null;
          
          const content = (
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="font-medium text-game-platinum group-hover:text-game-highlight">
                    {patch.title}
                  </h3>
                  {patch.category && (
                    <span className={`px-2 py-1 text-xs rounded-full border ${getTypeColor(patch.type)}`}>
                      {patch.category}
                    </span>
                  )}
                  {isLinkable && (
                    <ExternalLink className="w-4 h-4 text-game-gold/60 group-hover:text-game-highlight transition-colors" />
                  )}
                </div>
                <p className="text-foreground/80 leading-relaxed text-sm">{patch.description}</p>
              </div>
              <div className="text-right flex-shrink-0">
                <span className="text-xs text-foreground/50">
                  {new Date(patch.date).toLocaleDateString()}
                </span>
              </div>
            </div>
          );

          if (isLinkable) {
            return (
              <Link key={patch.id} href={toolRoute} className="block group">
                <div className="glass-panel-light border border-border-light/30 rounded-lg p-4 hover:glass-panel transition-all duration-200 hover:border-border-light/50 hover:border-game-gold/30 cursor-pointer">
                  {content}
                </div>
              </Link>
            );
          }

          return (
            <div key={patch.id} className="glass-panel-light border border-border-light/30 rounded-lg p-4 hover:glass-panel transition-all duration-200 hover:border-border-light/50">
              {content}
            </div>
          );
        })}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <button
            onClick={goToPrevPage}
            disabled={currentPage === 0}
            className="flex items-center gap-2 px-3 py-2 text-sm glass-panel-light hover:glass-panel disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all duration-200"
          >
            <ChevronLeft className="w-4 h-4" />
            Previous
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => goToPage(i)}
                className={`w-8 h-8 text-sm rounded-lg transition-all duration-200 ${
                  currentPage === i
                    ? 'bg-game-highlight text-theme-darkest font-semibold'
                    : 'glass-panel-light hover:glass-panel text-foreground/80'
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages - 1}
            className="flex items-center gap-2 px-3 py-2 text-sm glass-panel-light hover:glass-panel disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-all duration-200"
          >
            Next
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Page Info */}
      <div className="text-center mt-4 text-xs text-foreground/50">
        Showing {startIndex + 1}-{Math.min(endIndex, RECENT_PATCHES.length)} of {RECENT_PATCHES.length} updates
      </div>
    </div>
  );
}