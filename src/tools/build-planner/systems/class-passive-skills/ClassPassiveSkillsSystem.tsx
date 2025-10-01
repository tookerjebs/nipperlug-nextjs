// Main component for Class Passive Skills System
import React from 'react';
import { useClassPassiveSkillsStore } from './stores';
import { useClassStore } from '../class/stores';
import { PassiveSkillsSection } from './components/PassiveSkillsSection';
import { ActionButtons } from '@/tools/build-planner/components/systems/ActionButtons';

export function ClassPassiveSkillsSystem() {
  const { selectedClass: classStoreSelectedClass } = useClassStore();
  const { 
    selectedClass: passiveSkillsSelectedClass, 
    setSelectedClass, 
    resetSystem,
    resetPassiveSkills,
    quickFillSystem
  } = useClassPassiveSkillsStore();

  // Sync with class store selection
  React.useEffect(() => {
    if (classStoreSelectedClass !== passiveSkillsSelectedClass) {
      setSelectedClass(classStoreSelectedClass);
    }
  }, [classStoreSelectedClass, passiveSkillsSelectedClass, setSelectedClass]);



  if (!passiveSkillsSelectedClass) {
    return (
      <div className="space-y-6">
        {/* Action Buttons */}
        <div className="flex justify-between items-center">
          <ActionButtons 
            onQuickFill={quickFillSystem}
            onReset={resetSystem}
          />
        </div>

        <div className="text-center py-12">
          <div className="bg-[#1e1e28b3] rounded-lg p-8 border border-[#2a2a3a] max-w-md mx-auto">
            <div className="text-orange-400 mb-4">
              <svg className="w-16 h-16 mx-auto" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-orange-400 mb-2">No Class Selected</h3>
            <p className="text-gray-400 text-sm">
              Please select a class from the Stat Distribution system to access class-specific passive skills.
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <ActionButtons 
          onQuickFill={quickFillSystem}
          onReset={resetPassiveSkills}
        />
      </div>

      {/* Passive Skills Section */}
      <PassiveSkillsSection />
    </div>
  );
}