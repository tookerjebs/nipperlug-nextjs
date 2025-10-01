// RingTooltip.tsx
// A specialized tooltip component for ring items

import React from 'react';
import { Ring } from '../../data/rings/rings-data';
import { getStatInfo, formatStatValue } from '@/tools/build-planner/data/stats-config';

interface RingTooltipProps {
  ring: Ring;
  // Utility functions can be passed in or defined locally
  formatStatName?: (stat: string) => string;
  formatStatValueWithSign?: (statId: string, value: number | undefined) => string;
}

export const RingTooltip: React.FC<RingTooltipProps> = ({ 
  ring,
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

  // Special case for Tempus Ring - we want to display penetration stat last with an icon
  const isTemplusRing = ring.id === 'tempus_ring';
  
  // Create a filtered and sorted entries array
  let statEntries = Object.entries(ring.baseStats || {})
    .filter(([_, value]) => value !== undefined && value > 0);
  
  // For Tempus Ring, remove penetration from the main list to display it separately at the end
  let penetrationStat: [string, number] | null = null;
  
  if (isTemplusRing) {
    penetrationStat = statEntries.find(([stat]) => stat === 'penetration') || null;
    statEntries = statEntries.filter(([stat]) => stat !== 'penetration');
  }
  
  return (
    <>
      {/* Ring Name */}
      <div className="text-white text-xs mb-2">{ring.name}</div>
      
      {/* Divider after header */}
      <div className="w-full h-px bg-gray-600 bg-opacity-30 my-2"></div>
      
      {/* Requirement */}
      <div className="text-white text-xs mb-1">
        [Requirement]
      </div>
      <div className="text-white text-xs mb-2">
        Level {(ring as any).requiredLevel || 155} or above
      </div>
      
      {/* Divider after requirement section */}
      <div className="w-full h-px bg-gray-600 bg-opacity-30 my-2"></div>

      {/* Ring Stats */}
      {ring.baseStats && Object.keys(ring.baseStats).length > 0 && (
        <div className="space-y-0 mb-2">
          {/* Regular stats */}
          {statEntries.map(([stat, value]) => (
            <div key={stat} className="text-white text-xs">
              {formatStatName(stat)} {formatStatValueWithSign(stat, value)}
            </div>
          ))}
          
          {/* Special case for Tempus Ring's penetration stat */}
          {isTemplusRing && penetrationStat && (
            <div className="text-white text-xs">
              {formatStatName(penetrationStat[0])} {formatStatValueWithSign(penetrationStat[0], penetrationStat[1])}
            </div>
          )}
        </div>
      )}
      
      {/* Divider after stats section */}
      <div className="w-full h-px bg-gray-600 bg-opacity-30 my-2"></div>
    </>
  );
};

export default RingTooltip;