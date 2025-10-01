// Main Passive Skills System Component
import React from 'react';
import { usePassiveSkillsStore } from './stores/passiveSkillsStore';
import { PassiveSkillSlot } from './components/PassiveSkillSlot';
import { SelectedSkillsPanel } from './components/SelectedSkillsPanel';
import { PASSIVE_SKILLS_DATA } from './data/passive-skills-data';
import { ActionButtons } from '@/tools/build-planner/components/systems/ActionButtons';

export const PassiveSkillsSystem: React.FC = () => {
  const { 
    selectedSkills, 
    maxSelectedSkills, 
    resetSystem, 
    quickFillSystem 
  } = usePassiveSkillsStore();

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex justify-between items-center">

        
        <ActionButtons 
          onQuickFill={quickFillSystem}
          onReset={resetSystem}
        />
      </div>

      {/* Available Skills Grid */}
      <div className="system-info-panel">
        <h3 className="text-lg font-semibold text-white mb-4">
          Available Passive Skills
        </h3>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {PASSIVE_SKILLS_DATA.map(skill => (
            <PassiveSkillSlot
              key={skill.id}
              skill={skill}
            />
          ))}
        </div>
        
        {/* Selection Status */}
        <div className="mt-4 text-center">
          <p className="text-sm text-gray-400">
            {selectedSkills.length} / {maxSelectedSkills} skills selected
          </p>
          {selectedSkills.length >= maxSelectedSkills && (
            <p className="text-xs text-orange-400 mt-1">
              Maximum skills selected. Remove a skill to select another.
            </p>
          )}
        </div>
      </div>

      {/* Selected Skills Panel */}
      <SelectedSkillsPanel />
    </div>
  );
};