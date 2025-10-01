// Custom tooltip component for Gold Merit System
'use client';

import React from 'react';
import { GoldMeritSlot } from '../types/index';
import { getStatInfo, formatStatValue } from '@/tools/build-planner/data/stats-config';

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
  if (!isVisible) return null;

  const statInfo = getStatInfo(slot.statType);
  
  // Get current values with proper null checking
  const currentBaseValue = currentLevel > 0 && slot.values && slot.values[currentLevel - 1] !== undefined 
    ? slot.values[currentLevel - 1] 
    : 0;
  const currentBonusValue = currentLevel > 0 && slot.bonusValues && slot.bonusValues[currentLevel - 1] !== undefined 
    ? slot.bonusValues[currentLevel - 1] 
    : 0;

  // Calculate tooltip position to avoid going off screen
  const tooltipStyle: React.CSSProperties = {
    position: 'fixed',
    left: position.x + 10,
    top: position.y - 10,
    zIndex: 1000,
    pointerEvents: 'none',
    transform: 'translateY(-100%)', // Position above cursor
  };

  return (
    <div
      style={tooltipStyle}
      className="bg-black/90 border border-gray-600 rounded-lg p-3 text-sm text-white shadow-lg max-w-xs"
    >
      {/* Header with slot name and level */}
      <div className="font-bold text-game-gold mb-2">
        {slot.name} ({currentLevel}/{slot.maxLevel})
      </div>
      
      {/* Base stats */}
      {currentLevel > 0 && (
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
      
      {/* Description */}
      <div className="text-gray-400 text-xs mb-2">
        {slot.description}
      </div>
      
      {/* Prerequisites warning */}
      {!isUnlocked && (
        <div className="text-red-400 text-xs">
          🔒 Prerequisites not met
        </div>
      )}
      
      {/* Level info */}
      <div className="text-gray-500 text-xs border-t border-gray-700 pt-2">
        {slot.pointsRequired > 1 ? (
          <span>{slot.pointsRequired} points per level</span>
        ) : (
          <span>{slot.pointsRequired} point per level</span>
        )}
      </div>
    </div>
  );
};