// EpauletTooltip.tsx
// A specialized tooltip component for epaulet items

import React from 'react';
import { Epaulet } from '../../data/epaulets/epaulets-data';
import { getStatInfo, formatStatValue } from '@/tools/build-planner/data/stats-config';

interface EpauletTooltipProps {
  epaulet: Epaulet;
  // Utility functions can be passed in or defined locally
  formatStatName?: (stat: string) => string;
  formatStatValueWithSign?: (statId: string, value: number | undefined) => string;
}

const EpauletTooltip: React.FC<EpauletTooltipProps> = ({ 
  epaulet,
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

  return (
    <>
      {/* Epaulet Name */}
      <div className="text-white text-xs mb-2">{epaulet.name}</div>
      
      {/* Divider after header */}
      <div className="w-full h-px bg-gray-600 bg-opacity-30 my-2"></div>
      
      {/* Requirement */}
      <div className="text-white text-xs mb-1">
        [Requirement]
      </div>
      <div className="text-white text-xs mb-2">
        Level {(epaulet as any).requiredLevel || 155} or above
      </div>
      
      {/* Divider after requirement section */}
      <div className="w-full h-px bg-gray-600 bg-opacity-30 my-2"></div>

      {/* Epaulet Stats */}
      {epaulet.baseStats && Object.keys(epaulet.baseStats).length > 0 && (
        <div className="space-y-0 mb-2">
          {Object.entries(epaulet.baseStats)
            .filter(([_, value]) => value !== undefined && value > 0)
            .map(([stat, value]) => {
              const statInfo = getStatInfo(stat);
              return (
                <div key={stat} className="text-white text-xs">
                  {statInfo?.name || formatStatName(stat)} {formatStatValueWithSign(stat, value)}
                </div>
              );
            })
          }
        </div>
      )}
      
      {/* Divider after stats section */}
      <div className="w-full h-px bg-gray-600 bg-opacity-30 my-2"></div>
    </>
  );
};

export default EpauletTooltip;