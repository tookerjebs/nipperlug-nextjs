import React, { useState, useCallback } from 'react';
import { ClassPassiveSkill } from '../types';
import { cn } from '@/tools/build-planner/lib/utils';
import { PassiveSkillTooltip } from './PassiveSkillTooltip';

interface PassiveSkillSlotProps {
  skill: ClassPassiveSkill;
  currentLevel: number;
  onLevelChange: (skillId: string, level: number) => void;
}

export const PassiveSkillSlot: React.FC<PassiveSkillSlotProps> = ({
  skill,
  currentLevel,
  onLevelChange
}) => {
  const [imageError, setImageError] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const handleIncrement = useCallback(() => {
    if (currentLevel < skill.maxLevel) {
      onLevelChange(skill.id, currentLevel + 1);
    }
  }, [currentLevel, skill.maxLevel, skill.id, onLevelChange]);

  const handleDecrement = useCallback(() => {
    if (currentLevel > 0) {
      onLevelChange(skill.id, currentLevel - 1);
    }
  }, [currentLevel, skill.id, onLevelChange]);



  const handleMouseEnter = useCallback((e: React.MouseEvent) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY });
    setTooltipVisible(true);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setTooltipVisible(false);
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    setTooltipPosition({ x: e.clientX, y: e.clientY });
  }, []);

  const canLevelUp = currentLevel < skill.maxLevel;
  const canLevelDown = currentLevel > 0;

  return (
    <>
      <div 
        className="rune-slot-panel p-4 rounded-lg border border-border-dark hover:border-game-highlight transition-colors"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onMouseMove={handleMouseMove}
      >
        <div className="flex items-center justify-between">
          {/* Left side - skill info */}
          <div className="flex items-center space-x-3">
            {/* Skill icon */}
            <div className="w-10 h-10 bg-[#1a1a24] rounded border border-[#2a2a3a] flex items-center justify-center flex-shrink-0">
              {!imageError ? (
                <img
                  src={skill.icon}
                  alt={skill.name}
                  className="w-8 h-8 object-contain"
                  onError={() => setImageError(true)}
                />
              ) : (
                <svg 
                  className="w-6 h-6 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M13 10V3L4 14h7v7l9-11h-7z" 
                  />
                </svg>
              )}
            </div>
            
            {/* Skill name and level */}
            <div className="flex flex-col">
              <span className="text-white font-medium text-base">{skill.name}</span>
              <span className="text-sm text-gray-400">
                Level {currentLevel}/{skill.maxLevel}
              </span>
            </div>
          </div>

          {/* Right side - level controls */}
          <div className="flex items-center space-x-2">
            {/* Decrement button */}
            <button 
              className={cn(
                "w-8 h-8 rounded text-sm font-bold transition-colors",
                canLevelDown
                  ? "bg-red-600/20 border border-red-400/30 text-red-400 hover:bg-red-600/30"
                  : "bg-gray-600/20 border border-gray-400/30 text-gray-400 cursor-not-allowed"
              )}
              onClick={handleDecrement}
              disabled={!canLevelDown}
            >
              -
            </button>
            
            {/* Increment button */}
            <button 
              className={cn(
                "w-8 h-8 rounded text-sm font-bold transition-colors",
                canLevelUp
                  ? "bg-green-600/20 border border-green-400/30 text-green-400 hover:bg-green-600/30"
                  : "bg-gray-600/20 border border-gray-400/30 text-gray-400 cursor-not-allowed"
              )}
              onClick={handleIncrement}
              disabled={!canLevelUp}
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Tooltip */}
      <PassiveSkillTooltip
        skill={skill}
        currentLevel={currentLevel}
        position={tooltipPosition}
        isVisible={tooltipVisible}
      />
    </>
  );
};