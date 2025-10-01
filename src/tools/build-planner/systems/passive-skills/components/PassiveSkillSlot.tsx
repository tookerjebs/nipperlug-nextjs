// Individual passive skill slot component
import React from 'react';
import Image from 'next/image';
import { PassiveSkill } from '../types';
import { usePassiveSkillsStore } from '../stores/passiveSkillsStore';
import { cn } from '@/tools/build-planner/lib/utils';

interface PassiveSkillSlotProps {
  skill: PassiveSkill;
  className?: string;
}

export const PassiveSkillSlot: React.FC<PassiveSkillSlotProps> = ({ 
  skill, 
  className 
}) => {
  const { 
    selectSkill, 
    deselectSkill, 
    isSkillSelected, 
    getSkillLevel,
    canSelectMoreSkills 
  } = usePassiveSkillsStore();

  const isSelected = isSkillSelected(skill.id);
  const currentLevel = getSkillLevel(skill.id);
  const canSelect = canSelectMoreSkills();

  const handleClick = () => {
    if (isSelected) {
      deselectSkill(skill.id);
    } else if (canSelect) {
      selectSkill(skill.id);
    }
  };

  return (
    <div
      className={cn(
        "relative group cursor-pointer transition-all duration-200",
        "border rounded-lg p-3 hover:scale-105 game-slot",
        isSelected 
          ? "border-game-gold bg-gradient-to-br from-yellow-400/20 to-yellow-600/10 shadow-game glow-border" 
          : canSelect 
            ? "border-gray-600/60 glass-effect-light hover:border-gray-400/80 hover-glass-light" 
            : "border-gray-700/40 bg-gray-900/30 opacity-50 cursor-not-allowed",
        className
      )}
      onClick={handleClick}
      title={`${skill.name} - ${skill.description}${isSelected ? ` (Level ${currentLevel}/${skill.maxLevel})` : ''}`}
    >
      {/* Skill Icon */}
      <div className="relative w-12 h-12 mx-auto mb-2">
        <Image
          src={skill.icon}
          alt={skill.name}
          fill
          className={cn(
            "object-contain transition-all duration-200",
            !isSelected && !canSelect && "grayscale opacity-50",
            !isSelected && canSelect && "grayscale hover:grayscale-0"
          )}
        />
        
        {/* Level indicator */}
        {isSelected && (
          <div className="absolute -bottom-1 -right-1 bg-gradient-to-br from-yellow-400 to-yellow-600 text-black text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center shadow-game glow-text-sm">
            {currentLevel}
          </div>
        )}
      </div>

      {/* Skill Name */}
      <div className="text-center">
        <p className={cn(
          "text-xs font-medium truncate",
          isSelected ? "text-yellow-400 glow-text-sm" : "text-gray-300"
        )}>
          {skill.name}
        </p>
        
        {/* Max Level indicator */}
        <p className={cn(
          "text-xs mt-1",
          isSelected ? "text-yellow-300/80" : "text-gray-500"
        )}>
          Max: {skill.maxLevel}
        </p>
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute top-1 right-1 w-3 h-3 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full shadow-game glow-border"></div>
      )}

      {/* Hover tooltip */}
      <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 glass-panel text-gray-200 text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10 shadow-game-lg">
        {skill.description}
      </div>
    </div>
  );
};