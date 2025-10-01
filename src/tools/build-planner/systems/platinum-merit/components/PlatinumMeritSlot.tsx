// Individual slot component for Platinum Merit System
'use client';

import React, { useState } from 'react';
import { StatIcon } from '@/tools/build-planner/components/StatIcon';
import { PlatinumMeritSlotProps } from '../types/index';
import { usePlatinumMeritStore } from '../stores/platinumMeritStore';
import { getStatInfo, formatStatValue } from '@/tools/build-planner/data/stats-config';
import { PlatinumMeritTooltip } from './PlatinumMeritTooltip';

export const PlatinumMeritSlot: React.FC<PlatinumMeritSlotProps> = ({ slot }) => {
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  
  const {
    getSlotState,
    getSlotById,
    canUpgradeSlot,
    canDowngradeSlot,
    upgradeSlot,
    downgradeSlot
  } = usePlatinumMeritStore();

  const slotState = getSlotState(slot.id);
  const canUpgrade = canUpgradeSlot(slot.id);
  const canDowngrade = canDowngradeSlot(slot.id);
  const statInfo = getStatInfo(slot.statType);

  if (!slotState) return null;

  // Calculate current value - for expansion slots, show the base slot's value
  let currentValue = 0;
  let maxValue = 0;
  
  if (slot.isExpansion && slot.expandsSlot) {
    // For expansion slots, show the value from the base slot
    const baseSlot = getSlotById(slot.expandsSlot);
    const baseSlotState = getSlotState(slot.expandsSlot);
    
    if (baseSlot && baseSlotState && slotState.currentLevel > 0 && baseSlotState.currentLevel > 0) {
      currentValue = baseSlot.values[baseSlotState.currentLevel - 1] || 0;
    }
    if (baseSlot) {
      maxValue = baseSlot.values[baseSlot.maxLevel - 1] || 0;
    }
  } else {
    // Regular slot - use its own values (only one stat type for platinum)
    currentValue = slotState.currentLevel > 0 ? slot.values[slotState.currentLevel - 1] : 0;
    maxValue = slot.values[slot.maxLevel - 1] || 0;
  }

  const hasSelection = slotState.currentLevel > 0;
  const isMaxed = slotState.currentLevel >= slot.maxLevel;
  // Use the slotState.isUnlocked which should already reflect prerequisite status
  const isUnlocked = slotState.isUnlocked;

  const handleLeftClick = () => {
    if (canUpgrade && isUnlocked) {
      upgradeSlot(slot.id);
    }
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (canDowngrade && isUnlocked) {
      downgradeSlot(slot.id);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY });
    setTooltipVisible(true);
  };

  const handleMouseLeave = () => {
    setTooltipVisible(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  };

  // Get slot styling based on state using platinum theme colors
  const getSlotClass = () => {
    let baseClass = 'relative w-16 h-16 transition-all duration-200 cursor-pointer';
    
    // Locked slots - very greyed out
    if (!isUnlocked) {
      baseClass = 'relative w-16 h-16 border border-gray-700/50 rounded bg-gray-900/30 transition-all duration-200 cursor-not-allowed opacity-40';
    }
    // Empty slots (no skill points) - greyed out like in games
    else if (!hasSelection) {
      baseClass = 'relative w-16 h-16 border border-gray-600/50 rounded bg-gray-800/20 transition-all duration-200 cursor-pointer hover:border-gray-500/70 opacity-60';
    }
    // Slots with skill points - active appearance with platinum theme
    else if (hasSelection && !isMaxed) {
      baseClass = 'relative w-16 h-16 border border-stat-offensive rounded bg-stat-offensive-bg transition-all duration-200 cursor-pointer hover:border-stat-offensive opacity-100';
    }
    // Maxed slots - platinum appearance
    else if (isMaxed) {
      baseClass = 'relative w-16 h-16 border border-game-platinum rounded bg-theme-darker transition-all duration-200 cursor-pointer hover:border-game-highlight opacity-100';
    }
    
    return baseClass;
  };

  // Format value with + prefix if greater than 0, using stats-config to determine percentage
  const isPercentage = statInfo?.isPercentage || false;
  const displayValue = currentValue > 0 ?
    `+${isPercentage ? currentValue + '%' : currentValue}` :
    (isPercentage ? '0%' : '0');

  return (
    <div className="flex flex-col items-center gap-0 relative z-10">
      {/* Merit Slot */}
      <div
        className={getSlotClass()}
        onClick={handleLeftClick}
        onContextMenu={handleRightClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        {/* Stat Icon */}
        <div className="relative w-full h-full p-1">
          <div className={`w-full h-full flex items-center justify-center ${!hasSelection || !isUnlocked ? 'grayscale opacity-50' : ''}`}>
            <StatIcon
              statId={slot.statType}
              width={56}
              height={56}
              className="object-contain"
              fill={true}
            />
          </div>
          
          {/* Level Display */}
          <div className={`absolute top-0 right-0 bg-black/70 text-xs font-bold px-1 rounded-bl ${
            !isUnlocked ? 'text-gray-600' : 
            !hasSelection ? 'text-gray-500' : 
            'text-game-platinum'
          }`}>
            {slotState.currentLevel}/{slot.maxLevel}
          </div>

          {/* Locked Overlay */}
          {!isUnlocked && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/60 rounded">
              <span className="text-red-400 text-lg">🔒</span>
            </div>
          )}
        </div>
      </div>
      
      {/* Stat Value */}
      <div className={`text-xs font-bold text-center min-h-[14px] ${
        !isUnlocked ? 'text-gray-600' :
        !hasSelection ? 'text-gray-500' : 
        'text-game-platinum'
      }`}>
        {displayValue}
      </div>
      
      {/* Custom Tooltip */}
      <PlatinumMeritTooltip
        slot={slot}
        currentLevel={slotState.currentLevel}
        isUnlocked={isUnlocked}
        position={tooltipPosition}
        isVisible={tooltipVisible}
      />
    </div>
  );
};