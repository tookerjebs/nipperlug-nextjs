import React from 'react';
import { ClassPassiveSkill } from '../types';
import { getStatInfo, formatStatValue } from '@/tools/build-planner/data/stats-config';

interface PassiveSkillTooltipProps {
  skill: ClassPassiveSkill;
  currentLevel: number;
  position: { x: number; y: number };
  isVisible: boolean;
}

export const PassiveSkillTooltip: React.FC<PassiveSkillTooltipProps> = ({
  skill,
  currentLevel,
  position,
  isVisible
}) => {
  if (!isVisible) return null;

  // Get current level stats
  const getCurrentStats = () => {
    if (currentLevel <= 0 || !skill.levelStats) return {};
    
    const stats: Record<string, number> = {};
    Object.entries(skill.levelStats).forEach(([statId, values]) => {
      if (values[currentLevel - 1] !== undefined) {
        stats[statId] = values[currentLevel - 1];
      }
    });
    return stats;
  };

  // Get max level stats for comparison
  const getMaxStats = () => {
    if (!skill.levelStats) return {};
    
    const stats: Record<string, number> = {};
    Object.entries(skill.levelStats).forEach(([statId, values]) => {
      if (values[skill.maxLevel - 1] !== undefined) {
        stats[statId] = values[skill.maxLevel - 1];
      }
    });
    return stats;
  };

  const currentStats = getCurrentStats();
  const maxStats = getMaxStats();
  const hasStats = Object.keys(currentStats).length > 0 || Object.keys(maxStats).length > 0;

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
      className="bg-black/90 border-0 p-3 text-sm text-white shadow-lg max-w-xs"
    >
      {/* Header with skill name and level - centered, normal color */}
      <div className="text-white mb-2 text-center">
        {skill.name} ({currentLevel}/{skill.maxLevel})
      </div>
      
      {/* Separator after header */}
      <div className="border-t border-gray-700 mb-2"></div>
      
      {/* Description */}
      {skill.description && (
        <>
          <div className="text-gray-400 text-sm mb-2">
            {skill.description}
          </div>
          {/* Separator after description */}
          <div className="border-t border-gray-700 mb-2"></div>
        </>
      )}
      
      {/* Current stats */}
      {hasStats && (
        <div className="space-y-2">
          {currentLevel > 0 && Object.keys(currentStats).length > 0 && (
            <div>
              <div className="text-gray-200 text-sm mb-1">Current Effects:</div>
              {Object.entries(currentStats).map(([statId, value]) => {
                const statInfo = getStatInfo(statId);
                // Custom display names for non-standard stats
                let displayName = statInfo?.name || statId;
                let formattedValue = formatStatValue(statId, value);
                
                // Handle custom stats
                if (statId === 'range') {
                  displayName = 'Attack Range';
                  formattedValue = value.toString();
                } else if (statId === 'knockBack') {
                  displayName = 'Knock Back';
                  formattedValue = value + '%';
                } else if (statId === 'increasedHeal') {
                  displayName = 'Increased Heal';
                  formattedValue = value + '%';
                }
                
                return (
                  <div key={statId} className="text-sm py-0.5">
                    <span className="text-gray-300">{displayName}: </span>
                    <span className="text-gray-100">+ {formattedValue}</span>
                  </div>
                );
              })}
            </div>
          )}
          
          {/* Max level stats (if not at max level) */}
          {currentLevel < skill.maxLevel && Object.keys(maxStats).length > 0 && (
            <div>
              <div className="text-gray-200 text-sm mb-1">At Max Level:</div>
              {Object.entries(maxStats).map(([statId, value]) => {
                const statInfo = getStatInfo(statId);
                // Custom display names for non-standard stats
                let displayName = statInfo?.name || statId;
                let formattedValue = formatStatValue(statId, value);
                
                // Handle custom stats
                if (statId === 'range') {
                  displayName = 'Attack Range';
                  formattedValue = value.toString();
                } else if (statId === 'knockBack') {
                  displayName = 'Knock Back';
                  formattedValue = value + '%';
                } else if (statId === 'increasedHeal') {
                  displayName = 'Increased Heal';
                  formattedValue = value + '%';
                }
                
                return (
                  <div key={statId} className="text-sm py-0.5">
                    <span className="text-gray-300">{displayName}: </span>
                    <span className="text-gray-100">+ {formattedValue}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}
      
      {/* Level info */}
      <div className="text-gray-500 text-sm border-t border-gray-700 pt-2 mt-2">
        {currentLevel === 0 ? (
          <span>Click + to start leveling this skill</span>
        ) : currentLevel === skill.maxLevel ? (
          <span>Maximum level reached</span>
        ) : (
          <span>Level {currentLevel} of {skill.maxLevel}</span>
        )}
      </div>
    </div>
  );
};