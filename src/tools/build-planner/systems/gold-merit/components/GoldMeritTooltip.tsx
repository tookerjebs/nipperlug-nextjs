// Custom tooltip component for Gold Merit System
'use client';

import React from 'react';
import { createPortal } from 'react-dom';
import { GoldMeritSlot } from '../types/index';
import { getStatInfo, formatStatValue } from '@/tools/build-planner/data/stats-config';
import { getPointCostForLevel } from '../data/gold-merit-data-loader';
import { GoldMeritSlotMapping } from '../data/gold-merit-config';
import { useGoldMeritStore } from '../stores/goldMeritStore';

interface GoldMeritTooltipProps {
  slot: GoldMeritSlot;
  currentLevel: number;
  isUnlocked: boolean;
  position: { x: number; y: number };
  isVisible: boolean;
}

export const GoldMeritTooltip: React.FC<GoldMeritTooltipProps> = ({
  slot,
  currentLevel,
  isUnlocked,
  position,
  isVisible
}) => {
  // Hooks must be called unconditionally at the top level
  const { getSlotById } = useGoldMeritStore();
  const statInfo = getStatInfo(slot.statType);
  
  if (!isVisible) return null;
  
  // Get current values with proper null checking
  const currentBaseValue = currentLevel > 0 && slot.values && slot.values[currentLevel - 1] !== undefined 
    ? slot.values[currentLevel - 1] 
    : 0;
  const currentBonusValue = currentLevel > 0 && slot.bonusValues && slot.bonusValues[currentLevel - 1] !== undefined 
    ? slot.bonusValues[currentLevel - 1] 
    : 0;

  // Get actual point cost for next level (or unlock if level 0)
  const masteryIndex = GoldMeritSlotMapping[slot.id];
  const nextLevel = currentLevel + 1;
  const pointCost = masteryIndex && nextLevel <= slot.maxLevel 
    ? getPointCostForLevel(masteryIndex, nextLevel)
    : 0;

  // For expansion slots, get the expanded slot info to show proper message
  let expansionMessage: string | null = null;
  if (slot.isExpansion && slot.expandsSlot) {
    const expandedSlot = getSlotById(slot.expandsSlot);
    if (expandedSlot) {
      // Extract tier from expanded slot ID (e.g., "attack-rate-tier-1" -> "I")
      const tierMatch = slot.expandsSlot.match(/tier-(\d+)/);
      if (tierMatch) {
        const tierNum = parseInt(tierMatch[1]);
        const tierRoman = tierNum === 1 ? 'I' : tierNum === 2 ? 'II' : 'III';
        const statName = statInfo?.name || slot.statType;
        expansionMessage = `Applies ${statName} ${tierRoman} on Dungeons and Field also.`;
      }
    }
  }

  // Calculate tooltip position to avoid going off screen
  const tooltipStyle: React.CSSProperties = {
    position: 'fixed',
    left: position.x + 10,
    top: position.y - 10,
    zIndex: 99999,
    pointerEvents: 'none',
    transform: 'translateY(-100%)', // Position above cursor
    isolation: 'isolate',
  };

  const tooltipContent = (
    <div
      style={tooltipStyle}
      className="bg-black/90 border border-gray-600 p-3 text-sm text-white shadow-lg max-w-xs"
    >
      {/* Header with slot name and level */}
      <div className="font-bold mb-2" style={{ color: '#00FFCC' }}>
        {slot.name} ({currentLevel}/{slot.maxLevel})
      </div>
      
      {/* Base stats - hide for expansion slots */}
      {currentLevel > 0 && !slot.isExpansion && (
        <div className="mb-1">
          <span className="text-gray-300">Acq. Stats: </span>
          <span className="text-white">
            {statInfo?.name || slot.statType} +{formatStatValue(slot.statType, currentBaseValue)}
          </span>
        </div>
      )}
      
      {/* Bonus stats (only show if slot has bonus values and current level > 0) */}
      {currentLevel > 0 && slot.bonusValues && currentBonusValue > 0 && (
        <div className="mb-2">
          <span className="text-gray-300">Additional Stats: </span>
          <span className="text-white">
            {statInfo?.name || slot.statType} +{formatStatValue(slot.statType, currentBonusValue)}
          </span>
        </div>
      )}
      
      {/* Description - show expansion message for expansion slots, otherwise show regular description */}
      <div className="text-gray-400 text-xs mb-2">
        {expansionMessage || slot.description}
      </div>
      
      {/* Prerequisites warning */}
      {!isUnlocked && (
        <div className="text-red-400 text-xs">
          🔒 Prerequisites not met
        </div>
      )}
      
      {/* Point cost info - show actual cost to unlock/upgrade */}
      {pointCost > 0 && (
        <div className="text-gray-500 text-xs border-t border-gray-700 pt-2">
          {currentLevel === 0 ? (
            <span>Cost to unlock: {pointCost} point{pointCost !== 1 ? 's' : ''}</span>
          ) : (
            <span>Cost to upgrade: {pointCost} point{pointCost !== 1 ? 's' : ''}</span>
          )}
        </div>
      )}
    </div>
  );

  // Render tooltip in a portal at document body level to ensure it's above everything
  if (typeof window !== 'undefined') {
    return createPortal(tooltipContent, document.body);
  }
  
  return null;
};