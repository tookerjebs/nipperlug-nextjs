'use client';

import React from 'react';
import { usePlatinumMeritStore } from '../stores/platinumMeritStore';

export const PlatinumMeritCostsDisplay: React.FC = () => {
  const { calculateTotalUnlockCosts, calculateTotalUnlockTime, formatUnlockTime } = usePlatinumMeritStore();
  
  const costs = calculateTotalUnlockCosts();
  const totalTime = calculateTotalUnlockTime();
  const formattedTime = formatUnlockTime(totalTime);
  
  // Only show if there are any costs or time
  if (costs.divineCore === 0 && costs.chaosCore === 0 && totalTime === 0) {
    return null;
  }
  
  return (
    <>
      {/* Separator */}
      <div className="mt-8 pt-6 border-t border-gray-700"></div>
      
      <div className="mt-4 p-4 bg-theme-darker rounded-lg border border-border-dark">
        <h4 className="text-sm font-semibold text-game-platinum mb-3 text-center">Unlock Requirements</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="flex flex-col items-center text-center">
            <span className="text-xs text-gray-400 mb-1">Divine Core</span>
            <span className="text-lg font-bold text-game-platinum">{costs.divineCore.toLocaleString()}</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-xs text-gray-400 mb-1">Chaos Core</span>
            <span className="text-lg font-bold text-game-platinum">{costs.chaosCore.toLocaleString()}</span>
          </div>
          <div className="flex flex-col items-center text-center">
            <span className="text-xs text-gray-400 mb-1">Unlock Time</span>
            <span className="text-lg font-bold text-game-platinum">{formattedTime}</span>
          </div>
        </div>
      </div>
    </>
  );
};

