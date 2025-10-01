/**
 * Charm Tooltip Component
 * Displays charm information in a tooltip format
 * Follows the same design pattern as other equipment tooltips
 */

import React from 'react';
import { ConfiguredCharm } from '../../data/charms/charms-data';
import { getStatInfo } from '@/tools/build-planner/data/stats-config';

interface CharmTooltipProps {
  charm: ConfiguredCharm;
  formatStatName: (stat: string) => string;
  formatStatValueWithSign: (statId: string, value: number | undefined) => string;
}

const CharmTooltip: React.FC<CharmTooltipProps> = ({ 
  charm, 
  formatStatName, 
  formatStatValueWithSign 
}) => {
  // Stats that should show total values in base stats section
  const totalStatsInBaseSection = ['defense', 'hp', 'ignorePenetration'];
  
  // Get stats to display in base stats section (total values for certain stats, base values for others)
  const getBaseStatsToDisplay = (charm: ConfiguredCharm) => {
    const statsToDisplay: Record<string, number> = {};
    
    // Add stats that should show total values
    totalStatsInBaseSection.forEach(stat => {
      const totalValue = charm.totalStats[stat];
      if (totalValue !== undefined && totalValue > 0) {
        statsToDisplay[stat] = totalValue;
      }
    });
    
    return statsToDisplay;
  };

  // Calculate upgrade stats only (stats that are gained from upgrades and not shown in base section)
  const getUpgradeStatsOnly = (charm: ConfiguredCharm) => {
    if (charm.currentLevel === 0) return {};
    
    const upgradeStats: Record<string, number> = {};
    const totalStats = charm.totalStats;
    
    Object.entries(totalStats).forEach(([stat, totalValue]) => {
      // Skip stats that are shown in base section
      if (totalStatsInBaseSection.includes(stat)) return;
      
      // Only show stats that don't exist in base stats (upgrade-only stats)
      const baseValue = charm.baseStats[stat as keyof typeof charm.baseStats] || 0;
      if (baseValue === 0 && (totalValue as number) > 0) {
        upgradeStats[stat] = totalValue as number;
      }
    });
    
    return upgradeStats;
  };

  return (
    <>
      {/* Charm Name with Level */}
      <div className="text-center text-game-gold font-bold mb-2">
        {charm.name}{charm.currentLevel > 0 ? ` +${charm.currentLevel}` : ''}
      </div>
      
      {/* Divider after header */}
      <div className="w-full h-px bg-gray-600 bg-opacity-30 my-2"></div>
      
      {/* Base Stats */}
      <div className="mb-2">
        <div className="text-white font-bold mb-1">[ Base Stats ]</div>
        {Object.entries(getBaseStatsToDisplay(charm))
          .filter(([_, value]) => value !== undefined && value !== null && (value as number) > 0)
          .map(([stat, value]) => (
            <div key={stat} className="text-white flex justify-between">
              <span>{formatStatName(stat)}</span>
              <span>{formatStatValueWithSign(stat, value as number)}</span>
            </div>
          ))
        }
      </div>
      
      {/* Upgrade Stats (only show if level > 0) */}
      {charm.currentLevel > 0 && (() => {
        const upgradeStats = getUpgradeStatsOnly(charm);
        return Object.keys(upgradeStats).length > 0 ? (
          <>
            {/* Divider before upgrade stats */}
            <div className="w-full h-px bg-gray-600 bg-opacity-30 my-2"></div>
            
            <div className="mb-2">
              <div className="text-orange-400 font-bold mb-1">[ Upgrade Stats ]</div>
              {Object.entries(upgradeStats)
                .filter(([_, value]) => value !== undefined && value !== null && (value as number) > 0)
                .map(([stat, value]) => (
                  <div key={stat} className="text-orange-400 flex justify-between">
                    <span>{formatStatName(stat)}</span>
                    <span>{formatStatValueWithSign(stat, value as number)}</span>
                  </div>
                ))
              }
            </div>
          </>
        ) : null;
      })()}
      

    </>
  );
};

export default CharmTooltip;