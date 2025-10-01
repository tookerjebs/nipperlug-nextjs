import React from 'react';
import { useClassPassiveSkillsStore } from '../stores';
import { getPassiveSkillsForClass } from '../data/classPassiveSkills';
import { PassiveSkillSlot } from './PassiveSkillSlot';

export const PassiveSkillsSection: React.FC = () => {
  const { selectedClass, passiveSkills, setPassiveSkillLevel } = useClassPassiveSkillsStore();

  if (!selectedClass) {
    return null;
  }

  const availableSkills = getPassiveSkillsForClass(selectedClass);

  if (availableSkills.length === 0) {
    return (
      <div className="bg-[#1e1e28b3] rounded-lg p-4 border border-[#2a2a3a] max-w-lg mx-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-game-gold">Class Passive Skills</h3>
        </div>
        <div className="text-center text-gray-400 py-8">
          <p>No passive skills available for this class yet.</p>
          <p className="text-sm mt-2">Passive skills will be added in future updates.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-lg mx-auto">
      {/* Header */}
      <div className="rune-system-panel p-4 mb-4">
        
        {/* Skills container with scroll */}
        <div className="max-h-[600px] overflow-y-auto space-y-1 mb-4 dark-scrollbar">
          {availableSkills.map((skill) => (
            <PassiveSkillSlot
              key={skill.id}
              skill={skill}
              currentLevel={passiveSkills[skill.id] || 0}
              onLevelChange={setPassiveSkillLevel}
            />
          ))}
        </div>

        {/* Info Text */}
        <div className="text-xs text-gray-500 bg-[#1a1a24] rounded p-3">
          <p>
            <strong>Tip:</strong> Hover over any skill to see detailed stat information. 
            Class passive skills provide permanent bonuses that are automatically included in your total stats.
          </p>
        </div>
      </div>
    </div>
  );
};