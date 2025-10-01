// Custom tooltip component for Platinum Merit System
'use client';

import React from 'react';
import { PlatinumMeritSlot } from '../types/index';
import { getStatInfo, formatStatValue } from '@/tools/build-planner/data/stats-config';

interface PlatinumMeritTooltipProps {
  slot: PlatinumMeritSlot;
  currentLevel: number;
  isUnlocked: boolean;
  position: { x: number; y: number };
  isVisible: boolean;
}

export const PlatinumMeritTooltip: React.FC<PlatinumMeritTooltipProps> = ({
  slot,
  currentLevel,
  isUnlocked,
  position,
  isVisible
}) => {
  if (!isVisible) return null;

  const statInfo = getStatInfo(slot.statType);
  
  // Get current value with proper null checking (only one stat type for platinum)
  const currentValue = currentLevel > 0 && slot.values && slot.values[currentLevel - 1] !== undefined 
    ? slot.values[currentLevel - 1] 
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
      <div className="font-bold text-game-platinum mb-2">
        {slot.name} ({currentLevel}/{slot.maxLevel})
      </div>
      
      {/* Current stat value (only one stat for platinum merit) */}
      {currentLevel > 0 && (
        <div className="mb-2">
          <span className="text-gray-300">Current: </span>
          <span className="text-white">
            {statInfo?.name || slot.statType} +{formatStatValue(slot.statType, currentValue)}
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