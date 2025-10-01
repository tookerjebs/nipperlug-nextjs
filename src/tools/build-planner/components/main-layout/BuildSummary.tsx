'use client';

import React from 'react';
import { useState } from 'react';
import { statsConfig, getStatInfo, formatStatValue, getStatsByCategory } from '@/tools/build-planner/data/stats-config';
import { useBuildPlannerStore, type BuildStats } from '@/tools/build-planner/stores/buildPlannerStore';
import { useStatRegistryStore } from '@/tools/build-planner/stores/statRegistryStore';

interface BuildSummaryProps {
  className?: string;
}

export default function BuildSummary({ className = '' }: BuildSummaryProps) {
  // Use displayStats from statRegistryStore for showing pseudo-stats
  const displayStats = useStatRegistryStore((state) => state.displayStats);
  // Keep buildStats for any stats not in displayStats
  const buildStats = useBuildPlannerStore((state) => state.buildStats);
  const [activeTab, setActiveTab] = useState<'offensive' | 'defensive' | 'utility'>('offensive');

  // Initialize stats with base values, properly combining base stats with system contributions
  const getStatValue = (statId: string): number => {
    // For stats with base values, we need to add the base to any system contributions
    const getBaseValue = (statId: string): number => {
      if (statId === 'criticalRate') return statsConfig.baseStats.criticalRate;
      if (statId === 'maxCriticalRate') return statsConfig.baseStats.maxCriticalRate;
      if (statId === 'criticalDamage') return statsConfig.baseStats.criticalDamage;
      return 0;
    };
    
    const baseValue = getBaseValue(statId);
    
    // buildStats contains the final processed stats (including STR/INT/DEX conversions)
    // This should be our primary source as it includes all processed contributions
    if (buildStats[statId] !== undefined) {
      return buildStats[statId];
    }
    
    // If not in buildStats, check displayStats for system contributions
    if (displayStats[statId] !== undefined) {
      return baseValue + displayStats[statId];
    }
    
    // Return just the base value if no contributions exist
    return baseValue;
  };

  // Reusable component for rendering individual stat items
  const StatItem = ({ statId, colorClass }: { statId: string; colorClass: string }) => {
    const statInfo = getStatInfo(statId);
    if (!statInfo) return null;
    
    const value = getStatValue(statId);
    return (
      <div key={statId} className="flex justify-between">
        <span className="text-gray-300">{statInfo.name}:</span>
        <span className={`${colorClass} font-medium`}>{formatStatValue(statId, value)}</span>
      </div>
    );
  };

  // Reusable component for rendering stat columns
  const StatColumn = ({ 
    title, 
    stats, 
    borderClass, 
    textClass 
  }: { 
    title: string; 
    stats: string[]; 
    borderClass: string; 
    textClass: string; 
  }) => (
    <div className={`glass-panel-light border-l-2 ${borderClass} p-3 sm:p-4`}>
      <h4 className={`text-sm font-medium mb-3 ${textClass} uppercase tracking-wide`}>{title}</h4>
      <div className="space-y-2 text-sm">
        {stats.map(statId => (
          <StatItem key={statId} statId={statId} colorClass={textClass} />
        ))}
      </div>
    </div>
  );

  // Configuration for different stat categories
  const categoryConfig = {
    offensive: {
      borderClass: 'border-stat-offensive',
      textClass: 'text-stat-offensive'
    },
    defensive: {
      borderClass: 'border-stat-defensive',
      textClass: 'text-stat-defensive'
    },
    utility: {
      borderClass: 'border-stat-utility',
      textClass: 'text-stat-utility'
    }
  };

  // Generic renderer for offensive and defensive stats (responsive column layout)
  const renderThreeColumnStats = (category: 'offensive' | 'defensive') => {
    const stats = getStatsByCategory(category);
    const config = categoryConfig[category];
    
    // Filter stats into base, pvp, and pve categories
    const baseStats = stats.filter(stat => !stat.startsWith('pvp') && !stat.startsWith('pve'));
    const pvpStats = stats.filter(stat => stat.startsWith('pvp'));
    const pveStats = stats.filter(stat => stat.startsWith('pve'));

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        <StatColumn 
          title="Base Stats" 
          stats={baseStats} 
          borderClass={config.borderClass} 
          textClass={config.textClass} 
        />
        <StatColumn 
          title="PvP Stats" 
          stats={pvpStats} 
          borderClass={config.borderClass} 
          textClass={config.textClass} 
        />
        <StatColumn 
          title="PvE Stats" 
          stats={pveStats} 
          borderClass={config.borderClass} 
          textClass={config.textClass} 
        />
      </div>
    );
  };

  const renderOffensiveStats = () => renderThreeColumnStats('offensive');
  const renderDefensiveStats = () => renderThreeColumnStats('defensive');

  const renderUtilityStats = () => {
    const utilityStats = getStatsByCategory('utility');
    const config = categoryConfig.utility;
    
    // Determine if we should use a single column or multi-column layout
    const useMultiColumn = utilityStats.length > 6;
    
    return (
      <div className={`${useMultiColumn ? 'grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6' : ''}` }>
        <StatColumn 
          title="Utility Stats" 
          stats={utilityStats.slice(0, useMultiColumn ? Math.ceil(utilityStats.length / 2) : utilityStats.length)} 
          borderClass={config.borderClass} 
          textClass={config.textClass} 
        />

        {useMultiColumn && (
          <div className={`glass-panel-light border-l-2 ${config.borderClass} p-3 sm:p-4`}>
            <h4 className={`text-sm font-medium mb-3 ${config.textClass} uppercase tracking-wide`}>&nbsp;</h4>
            <div className="space-y-2 text-sm">
              {utilityStats.slice(Math.ceil(utilityStats.length / 2)).map(statId => (
                <StatItem key={statId} statId={statId} colorClass={config.textClass} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const tabs = [
    { id: 'offensive' as const, name: 'Offensive', color: 'text-stat-offensive', bgColor: 'glass-button-offensive' },
    { id: 'defensive' as const, name: 'Defensive', color: 'text-stat-defensive', bgColor: 'glass-button-defensive' },
    { id: 'utility' as const, name: 'Utility', color: 'text-stat-utility', bgColor: 'glass-button-utility' }
  ];

  return (
    <div className="component-bg p-3 sm:p-4 lg:p-6 rounded-lg">
      <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-game-gold glow-text-sm">Build Summary</h2>
      
      {/* Tab Navigation */}
      <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-1 mb-4 sm:mb-6 glass-button-group p-1 rounded-lg">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-3 sm:px-4 rounded-md text-sm font-medium transition-all duration-200 border ${
              activeTab === tab.id
                ? `${tab.bgColor} text-white border-2 glow-border shadow-lg`
                : `${tab.color} border-transparent hover:text-white hover:glass-button-hover hover:border-border-light`
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-64 sm:min-h-80 lg:min-h-96">
        {activeTab === 'offensive' && renderOffensiveStats()}
        {activeTab === 'defensive' && renderDefensiveStats()}
        {activeTab === 'utility' && renderUtilityStats()}
      </div>
    </div>
  );
}