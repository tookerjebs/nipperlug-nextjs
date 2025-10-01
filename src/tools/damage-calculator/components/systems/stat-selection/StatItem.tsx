'use client';

import React from 'react';
import { StatOption } from '../../../types/systems';
import { getStatInfo } from '../../../data/stats-config';
import { StatIcon } from '../../StatIcon';

interface StatItemProps {
  stat: StatOption;
  onSelect: (stat: StatOption) => void;
}

const StatItem: React.FC<StatItemProps> = ({ stat, onSelect }) => {
  // Check if this is an epic craft option
  const isEpicCraft = stat.id.includes('_grade_');
  const epicStat = isEpicCraft ? stat as StatOption & { grade: number; chance: number } : null;
  

  
  // Get the base stat ID for different stat types
  let baseStatId = stat.id;
  if (isEpicCraft) {
    baseStatId = stat.id.split('_grade_')[0];
  } else if (stat.originalStatId) {
    // For Force Wing composite IDs, use the original stat ID
    baseStatId = stat.originalStatId;
  } else if (stat.id.includes('_weak') || stat.id.includes('_strong')) {
    // Fallback: extract base ID from composite ID pattern
    baseStatId = stat.id.replace(/_weak$|_strong$/, '');
  }
  
  // Extract range from stat name if it exists (e.g., "HP (6-60)" -> "(6-60)")
  const rangeMatch = stat.name.match(/\((\d+%?-\d+%?)\)/);
  const range = rangeMatch ? rangeMatch[1] : null;
  const displayName = range ? stat.name.replace(/\s*\([^)]+\)/, '') : stat.name;
  
  // Get stat info for icon and additional details using base stat ID
  const statInfo = getStatInfo(baseStatId);
  
  return (
    <button
      onClick={() => onSelect(stat)}
      className="flex items-center justify-between p-3 bg-theme-light hover:bg-theme-lighter rounded-lg transition-colors text-left"
    >
      <div className="flex items-center space-x-3">
        {baseStatId && (
          <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
            <StatIcon
              statId={baseStatId}
              width={32}
              height={32}
              className="object-contain"
              alt={stat.name}
            />
          </div>
        )}
        <div className="flex flex-col">
          <span className="text-white font-medium">{displayName}</span>
          {isEpicCraft && epicStat && (
            <span className="text-xs text-gray-400">
              {epicStat.chance}% chance
            </span>
          )}
        </div>
      </div>
      <div className="text-right">
        {range ? (
          <span className="text-gray-300 font-medium">
            ({range})
          </span>
        ) : (
          <span className="text-green-400 font-bold">
            +{stat.value}{stat.isPercentage ? '%' : ''}
          </span>
        )}
        {isEpicCraft && epicStat && (
          <div className="text-xs text-game-gold mt-1">
            Grade {epicStat.grade}
          </div>
        )}
      </div>
    </button>
  );
};

// Use React.memo to prevent unnecessary re-renders
export default React.memo(StatItem);