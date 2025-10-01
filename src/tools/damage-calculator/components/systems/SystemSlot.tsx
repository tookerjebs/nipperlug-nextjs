'use client';

import { useCallback, memo } from 'react';
import { SystemSlot as SystemSlotType } from '../../types/systems';
import { cn } from '../../lib/utils';
import { getStatInfo } from '../../data/stats-config';
import { StatIcon } from '../StatIcon';

interface SystemSlotProps {
  slot: SystemSlotType;
  isSelected?: boolean;
  onClick?: (slot: SystemSlotType) => void;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  useDynamicSizing?: boolean;
}

// Simplified size classes - no responsive breakpoints to avoid conflicts
const fixedSizeClasses = {
  sm: 'w-10 h-10',
  md: 'w-12 h-12',
  lg: 'w-16 h-16'
};

// Dynamic size classes for grid layouts
const dynamicSizeClasses = {
  sm: 'min-w-10 min-h-10',
  md: 'min-w-12 min-h-12', 
  lg: 'min-w-16 min-h-16'
};

function SystemSlot({
  slot,
  isSelected = false,
  onClick,
  className = '',
  size = 'md',
  useDynamicSizing = false
}: SystemSlotProps) {
  
  // Use CSS hover instead of React state for hover effects
  const sizeClasses = useDynamicSizing ? dynamicSizeClasses[size] : fixedSizeClasses[size];

  // Memoize the click handler to prevent recreation on each render
  const handleClick = useCallback(() => {
    if (onClick) {
      onClick(slot);
    }
  }, [onClick, slot]);

  // Get the first stat for display (in case multiple stats)
  const firstStatId = Object.keys(slot.contributedStats)[0];
  const statValue = firstStatId ? slot.contributedStats[firstStatId] : null;
  const statInfo = firstStatId ? getStatInfo(firstStatId) : null;

  return (
    <div className="flex flex-col items-center">
      <div
        className={cn(
          // Base layout and interaction
          'relative flex items-center justify-center cursor-pointer',
          'rounded-lg border-2 aspect-square',
          'transition-all duration-200 ease-in-out',
          // Size classes
          sizeClasses,
          // Base styling
          'game-slot',
          // State-based styling
          isSelected 
            ? 'border-game-gold bg-theme-darker ring-2 ring-game-gold/50' 
            : 'border-border-dark',
          // Slot type styling
          slot.slotType === 'epic' && 'border-purple-500 bg-purple-900/20 rounded-xl',
          // Occupied state
          slot.isOccupied && 'border-green-500 bg-theme-darker',
          // Hover effects - simplified
          'hover:scale-105 hover:border-stat-defensive hover:bg-theme-darker',
          // Empty state hover
          !slot.isOccupied && 'hover:bg-stat-defensive-bg',
          className
        )}
        onClick={handleClick}
        role="button"
        tabIndex={0}
        aria-label={`Slot ${slot.position} in ${slot.category} category${slot.isOccupied ? ' (occupied)' : ' (empty)'}`}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        {/* Epic Badge - Shows on top corner for epic slots */}
        {slot.slotType === 'epic' && (
          <div className="absolute -top-2 -right-2 bg-purple-600 text-white text-xs font-bold px-1.5 py-0.5 rounded-full z-10 shadow-md">
            EPIC
          </div>
        )}
        
        {/* Slot Content */}
        {slot.isOccupied ? (
          <div className="flex items-center justify-center w-full h-full p-1">
            {/* Check if we have stats assigned */}
            {firstStatId ? (
              <div className="w-full h-full flex items-center justify-center">
                <StatIcon 
                  statId={firstStatId}
                  width={size === 'sm' ? 32 : size === 'md' ? 40 : 56}
                  height={size === 'sm' ? 32 : size === 'md' ? 40 : 56}
                  className="object-contain"
                  fill={true}
                />
              </div>
            ) : (
              <div className="w-full h-full bg-green-500/20 rounded flex items-center justify-center">
                <span className="text-xs font-bold text-green-400">USED</span>
              </div>
            )}
          </div>
        ) : (
          <div className={`${slot.slotType === 'epic' ? 'text-purple-300' : 'text-gray-500 text-opacity-50'}`}>
            {slot.slotType === 'epic' ? '⚡' : '+'}
          </div>
        )}
      </div>
      
      {/* Stat Value - Displayed below the slot */}
      {slot.isOccupied && statValue && (
        <div className="mt-1 text-center">
          <span className="text-xs font-bold px-2 py-0.5 rounded bg-theme-darker text-game-gold">
            +{statValue}{statInfo?.isPercentage ? '%' : ''}
          </span>
        </div>
      )}
    </div>
  );
}

// Wrap with React.memo to prevent unnecessary re-renders
export default memo(SystemSlot);
