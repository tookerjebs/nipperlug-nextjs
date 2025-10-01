import React from 'react';
import { useBattleConfigurationStore } from '../stores/battleConfigurationStore';
import { getAttackSkillsForClass } from '../data/attackSkills';
import { useClassStore } from '../../class/stores';
import { formatStatValue, getStatInfo } from '@/tools/build-planner/data/stats-config';

const AttackSkillSelector: React.FC = () => {
  const { selectedClass } = useClassStore();
  const { selectedAttackSkill, selectAttackSkill } = useBattleConfigurationStore();

  // Get available skills for the selected class
  const availableSkills = selectedClass ? getAttackSkillsForClass(selectedClass) : [];

  if (!selectedClass) {
    return (
      <div className="text-center text-gray-400 py-8">
        <p>Select a class first to see available attack skills</p>
      </div>
    );
  }

  if (availableSkills.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        <p>No attack skills available for {selectedClass}</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Attack Skills</h3>
      <div className="grid grid-cols-4 gap-3">
        {availableSkills.map((skill) => {
          const isSelected = selectedAttackSkill === skill.id;
          
          // Get stats for tooltip display
          const statEntries = Object.entries(skill.stats).map(([statId, value]) => {
            const statInfo = getStatInfo(statId);
            return {
              id: statId,
              name: statInfo?.name || statId,
              value,
              category: statInfo?.category || 'utility'
            };
          });

          return (
            <div key={skill.id} className="relative group">
              <div 
                className={`game-slot rounded p-1 relative cursor-pointer transition-all duration-200 ${
                  isSelected 
                    ? 'border-game-gold shadow-glow' 
                    : 'border-border-dark opacity-70 hover:opacity-100 hover:border-border-light'
                }`}
                onClick={() => {
                  // Toggle selection - if already selected, deselect it
                  const newSelection = selectedAttackSkill === skill.id ? null : skill.id;
                  selectAttackSkill(newSelection);
                }}
              >
                <div className="flex flex-col items-center justify-center h-full">
                  <div className="text-2xl mb-2">⚔️</div>
                  <div className="text-xs text-center mt-1 truncate w-full">
                    {skill.name}
                  </div>
                </div>
                
                {/* Active indicator */}
                {isSelected && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-game-gold rounded-full"></div>
                )}
              </div>

              {/* Tooltip with skill info */}
              <div className="absolute left-0 bottom-full mb-2 w-64 bg-component-card glass-panel p-3 rounded shadow-lg z-10 opacity-0 group-hover:opacity-100 pointer-events-none">
                <div className="font-bold text-game-gold">{skill.name}</div>
                <div className="text-sm mb-2">{skill.description}</div>
                
                {statEntries.length > 0 && (
                  <div className="text-sm">
                    <div className="font-semibold mb-1">Stats:</div>
                    <ul className="space-y-1">
                      {statEntries.map((stat) => (
                        <li 
                          key={stat.id} 
                          className={`
                            ${stat.category === 'offensive' ? 'text-stat-offensive' : 
                              stat.category === 'defensive' ? 'text-stat-defensive' : 
                              'text-stat-utility'}
                          `}
                        >
                          {stat.name}: +{formatStatValue(stat.id, stat.value)}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttackSkillSelector;