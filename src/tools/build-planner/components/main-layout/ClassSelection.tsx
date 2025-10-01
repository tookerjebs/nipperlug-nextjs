'use client';

import React from 'react';
import { useClassStore } from '../../systems/class/stores';
import { CLASS_LIST } from '../../systems/class/data';
import type { CharacterClass } from '../../systems/class/types';
import { ClassIcon } from '../../../../components/ui/ClassIcon';

export default function ClassSelection() {
  const { selectedClass, setSelectedClass } = useClassStore();

  const handleClassHover = (classId: CharacterClass) => {
    // Future: Add hover effects or preview functionality
  };

  return (
    <div className="flex justify-center">
      <div className="flex flex-wrap justify-center gap-2 max-w-3xl">
        {CLASS_LIST.map((classInfo) => (
          <div
            key={classInfo.id}
            className={`group relative glass-panel transition-all duration-300 cursor-pointer w-16 h-16 flex flex-col items-center justify-center transform hover:scale-105 ${
              selectedClass === classInfo.id
                ? 'ring-2 ring-game-gold shadow-lg shadow-game-gold/25'
                : 'hover:ring-1 hover:ring-game-gold/60'
            }`}
            onMouseEnter={() => handleClassHover(classInfo.id)}
            onClick={() => setSelectedClass(classInfo.id)}
          >
            {/* Class Icon */}
            <ClassIcon
              iconPath={classInfo.icon}
              width={32}
              height={32}
              alt={classInfo.name}
              className={`transition-all duration-300 mb-0.5 ${
                selectedClass === classInfo.id 
                  ? 'drop-shadow-lg' 
                  : 'group-hover:scale-110 group-hover:drop-shadow-md'
              }`}
            />
            
            {/* Class Name - Compact */}
            <span className={`text-center font-medium text-[10px] leading-tight transition-colors duration-300 px-1 ${
              selectedClass === classInfo.id
                ? 'text-game-gold font-semibold'
                : 'text-gray-300 group-hover:text-game-gold'
            }`}>
              {{ blader: 'BL', wizard: 'WI', warrior: 'WA', gladiator: 'GL', dark_mage: 'DM', force_archer: 'FA', force_gunner: 'FG', force_blader: 'FB', force_shielder: 'FS' }[classInfo.id]}
            </span>
            
            {/* Selection pulse effect */}
            {selectedClass === classInfo.id && (
              <div className="absolute inset-0 border-2 border-game-gold rounded-lg animate-pulse"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}