'use client';

import React from 'react';
import { FORCE_WING_CONFIG } from '../data/force-wing-data';

interface ForceWingLevelControlProps {
  level: number;
  onLevelChange: (level: number) => void;
  baseStats: Record<string, number>;
  availableTrainingPoints?: number;
}

export const ForceWingLevelControl: React.FC<ForceWingLevelControlProps> = ({
  level,
  onLevelChange,
  baseStats,
  availableTrainingPoints = 0
}) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newLevel = parseInt(e.target.value) || 1;
    onLevelChange(newLevel);
  };

  const handleLevelUp = () => {
    if (level < FORCE_WING_CONFIG.forceWingMaxLevel) {
      onLevelChange(level + 1);
    }
  };

  const handleLevelDown = () => {
    if (level > FORCE_WING_CONFIG.forceWingMinLevel) {
      onLevelChange(level - 1);
    }
  };

  // Calculate training points for display
  const calculateTrainingPointsForLevel = (currentLevel: number) => {
    let totalPoints = currentLevel * 2;
    
    if (currentLevel >= 101) {
      totalPoints += 20;
    }
    if (currentLevel >= 201) {
      totalPoints += 30;
    }
    if (currentLevel >= 301) {
      totalPoints += 40;
    }
    if (currentLevel >= 401) {
      totalPoints += 50;
    }
    
    return totalPoints;
  };

  return (
    <div className="glass-panel p-4">
      <div className="flex items-center justify-between mb-4">
        <h4 className="text-lg font-semibold text-gray-300">Force Wing Level</h4>
        <div className="flex items-center gap-3">
          <button
            onClick={handleLevelDown}
            disabled={level <= FORCE_WING_CONFIG.forceWingMinLevel}
            className={`w-8 h-8 rounded flex items-center justify-center font-bold transition-all duration-200 ${
              level > FORCE_WING_CONFIG.forceWingMinLevel
                ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 hover:border-gray-500'
                : 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed'
            }`}
          >
            −
          </button>
          
          <div className="flex flex-col items-center gap-1">
            <input
              type="number"
              min={FORCE_WING_CONFIG.forceWingMinLevel}
              max={FORCE_WING_CONFIG.forceWingMaxLevel}
              value={level}
              onChange={handleInputChange}
              className="w-16 h-8 bg-theme-darker border border-gray-600 rounded text-center text-white font-bold focus:border-game-gold focus:outline-none transition-colors"
            />
          </div>
          
          <button
            onClick={handleLevelUp}
            disabled={level >= FORCE_WING_CONFIG.forceWingMaxLevel}
            className={`w-8 h-8 rounded flex items-center justify-center font-bold transition-all duration-200 ${
              level < FORCE_WING_CONFIG.forceWingMaxLevel
                ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600 hover:border-gray-500'
                : 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed'
            }`}
          >
            +
          </button>
        </div>
      </div>
      
      {/* Base Stats Display */}
      <div className="grid grid-cols-3 gap-4 text-sm">
        <div className="text-center p-2 bg-theme-darker/50 rounded border border-gray-700">
          <div className="text-gray-400 mb-1">All Attack</div>
          <div className="text-game-gold font-bold">+{baseStats.allAttack || 0}</div>
        </div>
        <div className="text-center p-2 bg-theme-darker/50 rounded border border-gray-700">
          <div className="text-gray-400 mb-1">HP</div>
          <div className="text-game-gold font-bold">+{baseStats.hp || 0}</div>
        </div>
        <div className="text-center p-2 bg-theme-darker/50 rounded border border-gray-700">
          <div className="text-gray-400 mb-1">Defense</div>
          <div className="text-game-gold font-bold">+{baseStats.defense || 0}</div>
        </div>
      </div>
    </div>
  );
};