'use client';

import React, { useState, useMemo } from 'react';
import Link from 'next/link';
import { getStatInfo, statsConfig } from '../build-planner/data/stats-config';
import { StatIconClient } from './components/StatIconClient';
import { statIdToSlug, getTargetStatSlug } from '../../utils/stat-url-utils';
import { ChevronRight } from 'lucide-react';

type StatCategory = 'offensive' | 'defensive' | 'utility';

const CATEGORY_INFO = {
  offensive: {
    title: 'Attack Stats',
    description: 'These stats determine your offensive capabilities, affecting how much damage you deal to enemies and your effectiveness in combat.',
    color: 'text-stat-offensive',
    bgColor: 'bg-stat-offensive-bg',
    borderColor: 'border-stat-offensive'
  },
  defensive: {
    title: 'Defense Stats', 
    description: 'These stats determine your defensive capabilities, affecting how much damage you take from enemies and your survivability in combat.',
    color: 'text-stat-defensive',
    bgColor: 'bg-stat-defensive-bg',
    borderColor: 'border-stat-defensive'
  },
  utility: {
    title: 'Other Stats',
    description: 'These stats cover various utility and survival aspects, affecting your character\'s sustainability, mobility, and resistance to crowd control effects.',
    color: 'text-stat-utility',
    bgColor: 'bg-stat-utility-bg',
    borderColor: 'border-stat-utility'
  }
} as const;

// Custom function for Stats Wiki to order stats: base -> pvp -> pve
function getStatsByCategoryForWiki(category: 'offensive' | 'defensive' | 'utility'): string[] {
  const baseStats: string[] = [];
  const pvpStats: string[] = [];
  const pveStats: string[] = [];

  // Collect all base stats in this category
  for (const statId in statsConfig.stats) {
    if (statsConfig.stats[statId].category === category) {
      baseStats.push(statId);
      
      // Check for variants
      if (statsConfig.stats[statId].variants) {
        statsConfig.stats[statId].variants.forEach(variant => {
          const variantStatId = variant + statId.charAt(0).toUpperCase() + statId.slice(1);
          if (variant === 'pvp') {
            pvpStats.push(variantStatId);
          } else if (variant === 'pve') {
            pveStats.push(variantStatId);
          }
        });
      }
    }
  }

  // Return in order: base stats, then all pvp stats, then all pve stats
  return [...baseStats, ...pvpStats, ...pveStats];
}

export default function StatsWiki() {
  const [searchTerm, setSearchTerm] = useState('');

  // Get stats organized by category
  const statsByCategory = useMemo(() => {
    const categories: Record<StatCategory, Array<{ id: string; info: any }>> = {
      offensive: [],
      defensive: [],
      utility: []
    };
    
    (['offensive', 'defensive', 'utility'] as StatCategory[]).forEach(category => {
      const statIds = getStatsByCategoryForWiki(category);
      statIds.forEach(statId => {
        const info = getStatInfo(statId);
        if (info) {
          categories[category].push({ id: statId, info });
        }
      });
    });
    
    return categories;
  }, []);

  // Get all stats for search
  const allStats = useMemo(() => {
    const stats: Array<{ id: string; info: any; category: StatCategory }> = [];
    
    Object.entries(statsByCategory).forEach(([category, categoryStats]) => {
      categoryStats.forEach(stat => {
        stats.push({ ...stat, category: category as StatCategory });
      });
    });
    
    return stats;
  }, [statsByCategory]);

  // Filter stats based on search term
  const filteredStats = useMemo(() => {
    if (!searchTerm) return null;
    
    const term = searchTerm.toLowerCase();
    return allStats.filter(stat => 
      stat.info.name.toLowerCase().includes(term) ||
      stat.info.description.toLowerCase().includes(term)
    );
  }, [allStats, searchTerm]);

  return (
    <div className="min-h-screen text-foreground p-3 sm:p-4 md:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="bg-component-card border border-border-dark rounded-xl p-6 mb-8 shadow-lg">
          <h1 className="text-4xl font-bold text-foreground mb-3">Cabal Online Stats Wiki</h1>
          <p className="text-foreground/80 mb-6 leading-relaxed">
            Complete reference for all game stats avilable in Cabal Online with formulas and detailed explanations. 
            This page contains {allStats.length} stats across {Object.keys(statsByCategory).length} categories.
            Each stat page includes detailed formulas, examples, typical values, and optimization tips for character builds.
          </p>
          
          {/* Search Bar */}
          <input
            type="search"
            placeholder="Search stats by name or description..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-lg px-4 py-3 bg-theme-dark border-2 border-border-dark rounded-lg text-foreground placeholder-foreground/60 focus:outline-none focus:border-game-gold focus:ring-2 focus:ring-game-gold/20 transition-all duration-200 text-base"
          />
        </div>

        {/* Search Results */}
        {filteredStats && (
          <div className="mb-6">
            {filteredStats.length > 0 ? (
              <div>
                <h2 className="text-xl font-semibold text-game-gold mb-3">Search Results ({filteredStats.length})</h2>
                <ul className="space-y-2">
                  {filteredStats.map((stat) => (
                    <li key={stat.id}>
                      <Link
                        href={`/stats/${statIdToSlug(stat.id)}`}
                        prefetch={false}
                        className="flex items-start gap-3 hover:underline group"
                      >
                        <StatIconClient 
                          statId={stat.id} 
                          width={28} 
                          height={28} 
                          className="flex-shrink-0 mt-1"
                        />
                        <div className="flex-1">
                          <span className={`font-medium text-sm ${CATEGORY_INFO[stat.category].color} group-hover:opacity-80`}>{stat.info.name}</span>
                          <div className="text-foreground/40 text-xs mt-0.5 leading-relaxed">
                            {stat.info.description}
                          </div>
                        </div>
                        <ChevronRight className="w-4 h-4 text-foreground/30 group-hover:text-foreground/50 transition-colors flex-shrink-0 mt-1" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <div className="text-foreground/60">
                No stats found matching "{searchTerm}". 
                <button
                  onClick={() => setSearchTerm('')}
                  className="text-game-gold hover:text-game-gold/80 ml-1"
                >
                  Clear search
                </button>
              </div>
            )}
          </div>
        )}

        {/* Categories in Columns - Only show when not searching */}
        {!searchTerm && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
            {(['offensive', 'defensive', 'utility'] as StatCategory[]).map(category => {
              const categoryStats = statsByCategory[category];
              const categoryInfo = CATEGORY_INFO[category];
              
              return (
                <div key={category} className="bg-component-card border border-border-dark rounded-xl p-6 shadow-lg">
                  <h2 className={`text-xl font-bold mb-3 ${categoryInfo.color}`}>
                    {categoryInfo.title}
                  </h2>
                  <p className="text-foreground/60 text-sm mb-4 leading-relaxed">
                    {categoryInfo.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {categoryStats.map((stat) => (
                      <li key={stat.id}>
                        <Link
                          href={`/stats/${getTargetStatSlug(stat.id)}`}
                          prefetch={false}
                          className="flex items-start gap-3 hover:underline group p-2 rounded-lg hover:bg-theme-dark/20 transition-all duration-200"
                        >
                          <StatIconClient 
                            statId={stat.id} 
                            width={28} 
                            height={28} 
                            className="flex-shrink-0 mt-1"
                          />
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              <span className={`font-medium text-sm ${categoryInfo.color} group-hover:opacity-80`}>{stat.info.name}</span>
                              {/* Only show variants for actual variant stats (pvpAttack, pveAttack), not base stats */}
                              {(stat.id.startsWith('pvp') || stat.id.startsWith('pve')) && (
                                <span className="text-foreground/40 text-xs">
                                  ({stat.id.startsWith('pvp') ? 'PvP' : 'PvE'} variant)
                                </span>
                              )}
                            </div>
                            <div className="text-foreground/40 text-xs mt-0.5 leading-relaxed">
                              {stat.info.description}
                            </div>
                          </div>
                          <ChevronRight className="w-4 h-4 text-foreground/30 group-hover:text-foreground/50 transition-colors flex-shrink-0 mt-1" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-border-dark text-foreground/50 text-sm">
        </div>
      </div>
    </div>
  );
}