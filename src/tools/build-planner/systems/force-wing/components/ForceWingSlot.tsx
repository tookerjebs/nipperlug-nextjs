'use client';

import React from 'react';
import { StatIcon } from '@/tools/build-planner/components/StatIcon';
import { getStatInfo } from '@/tools/build-planner/data/stats-config';
import { useForceWingSystemStore } from '../stores/forceWingSystemStore';
import { StatOption } from '@/tools/build-planner/types/systems';

interface ForceWingSlotProps {
  slotId: string;
  position: number;
  isOccupied: boolean;
  selectedStat?: {
    id: string;
    name: string;
    value: number;
    level: number;
  };
  isSelected?: boolean;
  onClick: () => void;
  variant?: 'selection' | 'option' | 'selected';
  statOption?: StatOption;
  offsetType?: 'none' | 'half' | 'full';
}

export const ForceWingSlot: React.FC<ForceWingSlotProps> = ({
  slotId,
  position,
  isOccupied,
  selectedStat,
  isSelected = false,
  onClick,
  variant = 'selection',
  statOption,
  offsetType = 'none'
}) => {
  const { getStatOptionByCompositeId } = useForceWingSystemStore();
  // Get hexagon styling based on variant and state
  const getHexagonStyles = () => {
    const colors = getHexagonColors();
    
    // Extract color values for SVG
    const extractColor = (className: string, type: 'stroke' | 'fill') => {
      if (type === 'stroke') {
        if (className.includes('border-game-highlight')) return '#ffd700';
        if (className.includes('border-game-gold')) return '#ffd700';
        if (className.includes('border-gray-400')) return '#9ca3af';
        if (className.includes('border-gray-500')) return '#6b7280';
        if (className.includes('border-gray-600')) return '#6b7280';
        return '#6b7280';
      } else {
        if (className.includes('bg-game-highlight/10')) return 'rgba(255, 215, 0, 0.1)';
        if (className.includes('bg-game-gold/20')) return 'rgba(255, 215, 0, 0.2)';
        if (className.includes('bg-gray-900/40')) return 'rgba(17, 24, 39, 0.4)';
        if (className.includes('bg-gray-900/30')) return 'rgba(17, 24, 39, 0.3)';
        if (className.includes('bg-gray-800/50')) return 'rgba(31, 41, 55, 0.5)';
        return 'rgba(17, 24, 39, 0.4)';
      }
    };
    
    return {
      stroke: extractColor(colors.hexagon, 'stroke'),
      fill: extractColor(colors.hexagon, 'fill'),
      className: colors.circle
    };
  };

  const getHexagonColors = () => {
    if (variant === 'selection') {
      // Top section slots - for user selection
      if (isSelected) {
        return {
          hexagon: 'border-game-highlight shadow-lg shadow-game-highlight/50 bg-game-highlight/10',
          circle: 'bg-theme-light border-game-highlight'
        };
      } else {
        return {
          hexagon: 'border-gray-500 hover:border-gray-400 bg-gray-900/40 hover:bg-gray-800/50',
          circle: 'bg-theme-darker border-gray-600 hover:border-gray-500'
        };
      }
    } else if (variant === 'option') {
      // Middle section slots - stat options
      if (statOption) {
        return {
          hexagon: 'border-gray-500 hover:border-gray-400 bg-gray-900/40 hover:bg-gray-800/50',
          circle: 'bg-theme-darker border-gray-600 hover:border-gray-500'
        };
      } else {
        return {
          hexagon: 'border-gray-600 opacity-50 bg-gray-900/30',
          circle: 'bg-theme-darker border-gray-600 opacity-50'
        };
      }
    } else if (variant === 'selected') {
      // Bottom section slot - selected stat with level controls
      if (isOccupied && selectedStat) {
        return {
          hexagon: 'border-game-gold shadow-lg shadow-game-gold/40 bg-game-gold/20',
          circle: 'bg-theme-light border-game-gold'
        };
      } else {
        return {
          hexagon: 'border-gray-600 opacity-50 bg-gray-900/30',
          circle: 'bg-theme-darker border-gray-600 opacity-50'
        };
      }
    }
    
    return {
      hexagon: 'border-gray-500 bg-gray-900/40',
      circle: 'bg-theme-darker border-gray-600'
    };
  };

  // Get the stat to display
  const displayStat = selectedStat || (statOption ? {
    id: statOption.id,
    name: statOption.name,
    value: statOption.value,
    level: 1
  } : null);

  // Get the original stat ID for icon rendering (handles composite IDs)
  const getOriginalStatId = (statId: string) => {
    // First check if we have a statOption prop (for variant="option")
    if (statOption?.originalStatId) {
      return statOption.originalStatId;
    }
    
    // Then check if we have a selectedStat (for other variants)
    if (selectedStat && slotId) {
      const foundStatOption = getStatOptionByCompositeId(statId, slotId);
      return foundStatOption?.originalStatId || statId;
    }
    
    // Fallback: return the original ID
    return statId;
  };

  const iconStatId = displayStat ? getOriginalStatId(displayStat.id) : null;
  const statInfo = displayStat ? getStatInfo(iconStatId || displayStat.id) : null;
  const hexagonStyles = getHexagonStyles();

  // Get offset class based on offsetType
  const getOffsetClass = () => {
    switch (offsetType) {
      case 'full':
        return '-mt-20'; // Double the original offset
      case 'half':
        return '-mt-10'; // Half of the full offset (original offset)
      case 'none':
      default:
        return '';
    }
  };

  return (
    <div className={`flex flex-col items-center gap-1 ${getOffsetClass()}`}>
      {/* Hexagon Container */}
      <div 
        className="relative cursor-pointer transition-all duration-200 p-1"
        onClick={onClick}
      >
        {/* Hexagon Shape */}
        <div className={`relative w-20 h-20 transition-all duration-200`}>
          {/* SVG Hexagon with consistent borders */}
          <svg 
            className="absolute inset-0 w-full h-full transition-all duration-200" 
            viewBox="0 0 80 80"
          >
            <polygon 
              points="40,4 72,20 72,60 40,76 8,60 8,20" 
              fill={hexagonStyles.fill}
              stroke={hexagonStyles.stroke}
              strokeWidth="3"
              className="transition-all duration-200"
            />
          </svg>
          
          {/* Inner Circle */}
          <div className={`absolute inset-[9px] rounded-full border-[3px] transition-all duration-200 ${hexagonStyles.className}`}>
            {displayStat ? (
              <>
                {/* Stat Icon - Circular with adaptive scaling for different sprite sizes */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <StatIcon
                    statId={iconStatId || displayStat.id}
                    width={56}
                    height={56}
                    className=""
                    fill={false}
                    circular={true}
                  />
                </div>
                
                {/* Level Display for selection slots */}
                {variant === 'selection' && selectedStat && (
                  <div className="absolute -top-2 -right-2 bg-black/90 text-xs font-bold px-1.5 py-0.5 rounded-full text-game-gold min-w-[20px] text-center border border-game-gold z-10">
                    {selectedStat.level}
                  </div>
                )}
              </>
            ) : (
              /* Slot Number for Empty Slots */
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-lg font-bold text-gray-400">
                  {position}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Stat Value Display */}
      {displayStat && variant !== 'option' && (
        <div className="text-xs font-bold text-center min-h-[14px] text-game-gold">
          +{statInfo?.isPercentage ? `${displayStat.value}%` : displayStat.value}
        </div>
      )}
      
      {/* Stat Name for option slots */}
      {statOption && variant === 'option' && (
        <div className="text-xs text-center text-gray-300 max-w-16 truncate">
          {statOption.name}
        </div>
      )}
    </div>
  );
};