// TalismanTooltip.tsx
// A dedicated tooltip component for talisman items

import React from 'react';
import { Talisman } from '../../data/talismans/talismans-data';
import { getStatInfo, formatStatValue } from '@/tools/build-planner/data/stats-config';

// The item structure that GenericItemUpgradeModal provides
interface TalismanTooltipItem extends Talisman {
  currentLevel: number;
  totalStats: Record<string, number>;
}

interface TalismanTooltipProps {
  item: TalismanTooltipItem;
  // Utility functions can be passed in or defined locally
  formatStatName?: (stat: string) => string;
  formatStatValueWithSign?: (statId: string, value: number | undefined) => string;
}

const TalismanTooltip: React.FC<TalismanTooltipProps> = ({ 
  item,
  formatStatName: externalFormatStatName,
  formatStatValueWithSign: externalFormatStatValueWithSign
}) => {
  // Local utility functions if not provided externally
  const formatStatName = externalFormatStatName || ((stat: string) => {
    const statInfo = getStatInfo(stat);
    return statInfo?.name || stat;
  });

  const formatStatValueWithSign = externalFormatStatValueWithSign || ((statId: string, value: number | undefined) => {
    if (value === undefined) return '';
    const formattedValue = formatStatValue(statId, value);
    return value >= 0 ? `+ ${formattedValue}` : `- ${Math.abs(value)}${formattedValue.includes('%') ? '%' : ''}`;
  });

  // Get base stats to display (always show base stats values)
  const getBaseStatsToDisplay = (item: TalismanTooltipItem) => {
    const statsToDisplay: Record<string, number> = {};
    
    // Show all non-zero base stats
    Object.entries(item.baseStats).forEach(([stat, value]) => {
      if (value !== undefined && value > 0) {
        statsToDisplay[stat] = value;
      }
    });
    
    return statsToDisplay;
  };

  // Calculate upgrade stats only (stats gained from upgrades)
  const getUpgradeStatsOnly = (item: TalismanTooltipItem) => {
    if (!item.currentLevel || item.currentLevel === 0) return {};
    if (!item.totalStats) return {};
    
    const upgradeStats: Record<string, number> = {};
    
    Object.entries(item.totalStats).forEach(([stat, totalValue]) => {
      if (totalValue === undefined || totalValue <= 0) return;
      
      const baseValue = item.baseStats[stat as keyof typeof item.baseStats] || 0;
      const upgradeValue = totalValue - baseValue;
      
      // Only show if there's an actual upgrade value
      if (upgradeValue > 0) {
        upgradeStats[stat] = upgradeValue;
      }
    });
    
    return upgradeStats;
  };

  return (
    <>
      {/* Item Name */}
      <div className="text-center text-orange-600 text-sm mb-2">{item.name} + {item.currentLevel || 0}</div>
      
      {/* Divider after header */}
      <div className="w-full h-px bg-gray-600 bg-opacity-30 my-2"></div>
      
      {/* Requirement */}
      <div className="text-white text-sm mb-1">
        [Requirement]
      </div>
      <div className="text-white text-sm mb-2">
        Level 170 or above
      </div>
      
      {/* Divider after requirement section */}
      <div className="w-full h-px bg-gray-600 bg-opacity-30 my-2"></div>
      
      {/* Base Stats */}
      <div className="mb-2">
        {Object.entries(getBaseStatsToDisplay(item))
          .filter(([_, value]) => value !== undefined && value !== null && (value as number) > 0)
          .map(([stat, value]) => (
            <div key={stat} className="text-white text-sm mb-1 flex justify-between">
              <span>{formatStatName(stat)}</span>
              <span>{formatStatValueWithSign(stat, value as number)}</span>
            </div>
          ))
        }
      </div>
      
      {/* Upgrade Stats (only show if level > 0) */}
      {item.currentLevel && item.currentLevel > 0 && (() => {
        const upgradeStats = getUpgradeStatsOnly(item);
        return Object.keys(upgradeStats).length > 0 ? (
          <>
            {/* Divider before upgrade stats */}
            <div className="w-full h-px bg-gray-600 bg-opacity-30 my-2"></div>
            
            <div className="mb-2">
              {Object.entries(upgradeStats)
                .filter(([_, value]) => value !== undefined && value !== null && (value as number) > 0)
                .map(([stat, value]) => (
                  <div key={stat} className="text-orange-600 text-sm mb-1 flex justify-between">
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

export default TalismanTooltip;