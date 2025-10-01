// Panel showing selected passive skills with level controls
import React from 'react';
import Image from 'next/image';
import { usePassiveSkillsStore } from '../stores/passiveSkillsStore';
import { PASSIVE_SKILLS_DATA } from '../data/passive-skills-data';
import { getStatInfo, formatStatValue } from '@/tools/build-planner/data/stats-config';
import { cn } from '@/tools/build-planner/lib/utils';
import { Minus, Plus, X } from 'lucide-react';

export const SelectedSkillsPanel: React.FC = () => {
  const { 
    selectedSkills, 
    levelUpSkill, 
    levelDownSkill, 
    deselectSkill,
    maxSelectedSkills 
  } = usePassiveSkillsStore();

  if (selectedSkills.length === 0) {
    return (
      <div className="system-info-panel">
        <h3 className="text-lg font-semibold text-yellow-400 mb-3">
          Selected Skills ({selectedSkills.length}/{maxSelectedSkills})
        </h3>
        <p className="text-gray-400 text-center py-8">
          No passive skills selected. Click on skills above to select them.
        </p>
      </div>
    );
  }

  return (
    <div className="system-info-panel">
      <h3 className="text-lg font-semibold text-yellow-400 mb-3">
        Selected Skills ({selectedSkills.length}/{maxSelectedSkills})
      </h3>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        {selectedSkills.map(selectedSkill => {
          const skillData = PASSIVE_SKILLS_DATA.find(s => s.id === selectedSkill.id);
          if (!skillData) return null;

          // Get current level stats
          const currentStats = skillData.stats.filter(stat => stat.level === selectedSkill.level);

          return (
            <div 
              key={selectedSkill.id}
              className="bg-gray-900/50 rounded-lg p-3 border border-gray-600"
            >
              <div className="flex items-center gap-3">
                {/* Skill Icon */}
                <div className="relative w-10 h-10 flex-shrink-0">
                  <Image
                    src={skillData.icon}
                    alt={skillData.name}
                    fill
                    className="object-contain"
                  />
                </div>

                {/* Skill Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-sm font-medium text-white truncate">
                      {skillData.name}
                    </h4>
                    <button
                      onClick={() => deselectSkill(selectedSkill.id)}
                      className="text-red-400 hover:text-red-300 transition-colors"
                      title="Remove skill"
                    >
                      <X size={14} />
                    </button>
                  </div>
                  
                  {/* Current Stats */}
                  <div className="text-xs text-gray-300 mb-2">
                    {currentStats.map((stat, index) => {
                      const statInfo = getStatInfo(stat.statId);
                      const formattedValue = formatStatValue(stat.statId, stat.value);
                      return (
                        <span key={stat.statId}>
                          {statInfo?.name || stat.statId}: +{formattedValue}
                          {index < currentStats.length - 1 && ', '}
                        </span>
                      );
                    })}
                  </div>
                </div>

                {/* Level Controls */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => levelDownSkill(selectedSkill.id)}
                    disabled={selectedSkill.level <= 1}
                    className={cn(
                      "w-6 h-6 rounded flex items-center justify-center transition-colors",
                      selectedSkill.level <= 1
                        ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                        : "bg-red-600 hover:bg-red-500 text-white"
                    )}
                    title="Level down"
                  >
                    <Minus size={12} />
                  </button>

                  <div className="text-center min-w-[3rem]">
                    <div className="text-sm font-bold text-yellow-400">
                      {selectedSkill.level}
                    </div>
                    <div className="text-xs text-gray-500">
                      / {skillData.maxLevel}
                    </div>
                  </div>

                  <button
                    onClick={() => levelUpSkill(selectedSkill.id)}
                    disabled={selectedSkill.level >= skillData.maxLevel}
                    className={cn(
                      "w-6 h-6 rounded flex items-center justify-center transition-colors",
                      selectedSkill.level >= skillData.maxLevel
                        ? "bg-gray-700 text-gray-500 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-500 text-white"
                    )}
                    title="Level up"
                  >
                    <Plus size={12} />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};