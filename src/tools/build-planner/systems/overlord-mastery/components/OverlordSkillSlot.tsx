'use client';

import React from 'react';
import { StatIcon } from '@/tools/build-planner/components/StatIcon';
import { OverlordSkillSlotProps } from '../types';
import { useOverlordMasteryStore } from '../stores/overlordMasteryStore';
import { getStatInfo, formatStatValue } from '@/tools/build-planner/data/stats-config';

export const OverlordSkillSlot: React.FC<OverlordSkillSlotProps> = ({ skill }) => {
  const {
    getSkillState,
    upgradeSkill,
    downgradeSkill,
    canUpgradeSkill,
    canDowngradeSkill
  } = useOverlordMasteryStore();

  const skillState = getSkillState(skill.id);
  const canUpgrade = canUpgradeSkill(skill.id);
  const canDowngrade = canDowngradeSkill(skill.id);
  const statInfo = getStatInfo(skill.statType);

  if (!skillState) return null;

  const currentValue = skillState.currentLevel > 0 ? skill.values[skillState.currentLevel - 1] : 0;
  const hasSelection = skillState.currentLevel > 0;
  const isMaxed = skillState.currentLevel >= skill.maxLevel;

  const handleLeftClick = () => {
    if (canUpgrade) {
      upgradeSkill(skill.id);
    }
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (canDowngrade) {
      downgradeSkill(skill.id);
    }
  };

  // Get slot styling based on state using established theme colors
  const getSlotClass = () => {
    let baseClass = 'relative w-12 h-12 game-slot transition-all duration-200 cursor-pointer';
    
    // Empty slots (no skill points) - greyed out like in games
    if (!hasSelection) {
      baseClass = 'relative w-12 h-12 border border-gray-600/50 rounded bg-gray-800/20 transition-all duration-200 cursor-pointer hover:border-gray-500/70 opacity-60';
    }
    
    // Slots with skill points - active appearance
    if (hasSelection && !isMaxed) {
      baseClass = 'relative w-12 h-12 border border-stat-offensive rounded bg-stat-offensive-bg transition-all duration-200 cursor-pointer hover:border-stat-offensive opacity-100';
    }
    
    // Maxed slots - gold appearance
    if (isMaxed) {
      baseClass = 'relative w-12 h-12 border border-game-gold rounded bg-theme-darker transition-all duration-200 cursor-pointer hover:border-game-highlight opacity-100';
    }
    
    return baseClass;
  };

  // Format value using the stats-config utility
  const displayValue = currentValue > 0 ? `+${formatStatValue(skill.statType, currentValue)}` : formatStatValue(skill.statType, 0);

  return (
    <div className="flex flex-col items-center gap-1 relative z-10">
      {/* Skill Slot */}
      <div
        className={getSlotClass()}
        onClick={handleLeftClick}
        onContextMenu={handleRightClick}
        title={`${skill.name}: 0-${formatStatValue(skill.statType, skill.values[skill.maxLevel - 1] || 0)} (Level ${skillState.currentLevel}/${skill.maxLevel})`}
      >
        {/* Stat Icon */}
        <div className="relative w-full h-full p-1">
          <div className={`w-full h-full flex items-center justify-center ${!hasSelection ? 'grayscale opacity-50' : ''}`}>
            <StatIcon
              statId={skill.statType}
              width={40}
              height={40}
              className="object-contain"
              fill={true}
            />
          </div>
          
          {/* Level Display */}
          <div className={`absolute top-0 right-0 bg-black/70 text-xs font-bold px-1 rounded-bl ${!hasSelection ? 'text-gray-500' : 'text-game-gold'}`}>
            {skillState.currentLevel}/{skill.maxLevel}
          </div>
        </div>
      </div>
      
      {/* Stat Value */}
      <div className={`text-xs font-bold text-center min-h-[14px] ${!hasSelection ? 'text-gray-500' : 'text-game-gold'}`}>
        {displayValue}
      </div>
      
      {/* Skill Name */}
      <div className={`text-xs text-center max-w-[60px] leading-tight ${!hasSelection ? 'text-gray-500' : 'text-gray-300'}`}>
        {skill.name}
      </div>
    </div>
  );
};