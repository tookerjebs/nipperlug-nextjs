'use client';

import React, { useState } from 'react';
import { StatIcon } from '@/tools/build-planner/components/StatIcon';
import { getStatInfo, formatStatValue } from '@/tools/build-planner/data/stats-config';
import { usePlatinumMeritStore } from '../stores/platinumMeritStore';
import type { SpecialMasteryStatOption } from '../types/index';
import { PlatinumSpecialMasterySelectionModal } from './PlatinumSpecialMasterySelectionModal';

interface PlatinumSpecialMasterySlotProps {
  categoryId: string;
  slotIndex: 0 | 1;
  statOptions: SpecialMasteryStatOption[] | null;
}

export const PlatinumSpecialMasterySlot: React.FC<PlatinumSpecialMasterySlotProps> = ({
  categoryId,
  slotIndex,
  statOptions
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { getSpecialMasterySlotState, clearSpecialMasterySlot } = usePlatinumMeritStore();
  
  const slotState = getSpecialMasterySlotState(categoryId, slotIndex);
  const hasSelection = slotState && slotState.selectedStatIndex !== null && slotState.selectedGrade !== null;
  
  // Get selected stat info if available
  let selectedStatOption: SpecialMasteryStatOption | null = null;
  let selectedGrade = null;
  
  if (hasSelection && statOptions && slotState) {
    selectedStatOption = statOptions[slotState.selectedStatIndex!];
    selectedGrade = selectedStatOption.grades.find(g => g.grade === slotState.selectedGrade);
  }
  
  const handleClick = () => {
    setIsModalOpen(true);
  };
  
  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (hasSelection) {
      clearSpecialMasterySlot(categoryId, slotIndex);
    }
  };
  
  const getSlotClass = () => {
    let baseClass = 'relative w-16 h-16 transition-all duration-200 cursor-pointer';
    
    if (!hasSelection) {
      baseClass = 'relative w-16 h-16 border border-gray-600/50 rounded bg-gray-800/20 transition-all duration-200 cursor-pointer hover:border-gray-500/70 opacity-60';
    } else {
      baseClass = 'relative w-16 h-16 border border-game-platinum rounded bg-theme-darker transition-all duration-200 cursor-pointer hover:border-game-highlight opacity-100';
    }
    
    return baseClass;
  };
  
  const statInfo = selectedStatOption ? getStatInfo(selectedStatOption.statType) : null;
  const displayValue = selectedGrade ? formatStatValue(selectedStatOption!.statType, selectedGrade.value) : '';
  
  return (
    <>
      <div className="flex flex-col items-center gap-1 relative z-10">
        {/* Special Mastery Slot */}
        <div
          className={getSlotClass()}
          onClick={handleClick}
          onContextMenu={handleRightClick}
        >
          {/* Stat Icon or Empty State */}
          <div className="relative w-full h-full p-1">
            <div className={`w-full h-full flex items-center justify-center ${!hasSelection ? 'grayscale opacity-50' : ''}`}>
              {hasSelection && statInfo ? (
                <StatIcon
                  statId={selectedStatOption!.statType}
                  width={56}
                  height={56}
                  alt={statInfo.name}
                />
              ) : (
                <div className="text-gray-500 text-xs">?</div>
              )}
            </div>
          </div>
        </div>
        
        {/* Value Display */}
        {hasSelection && (
          <div className="text-xs text-center text-gray-300 mt-0.5">
            {displayValue}
          </div>
        )}
      </div>
      
      {/* Selection Modal */}
      {isModalOpen && statOptions && (
        <PlatinumSpecialMasterySelectionModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          categoryId={categoryId}
          slotIndex={slotIndex}
          statOptions={statOptions}
          currentSelection={slotState}
        />
      )}
    </>
  );
};

