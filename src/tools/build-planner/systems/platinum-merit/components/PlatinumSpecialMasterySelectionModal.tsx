'use client';

import React, { useState } from 'react';
import { StatIcon } from '@/tools/build-planner/components/StatIcon';
import { getStatInfo, formatStatValue } from '@/tools/build-planner/data/stats-config';
import { usePlatinumMeritStore } from '../stores/platinumMeritStore';
import type { SpecialMasteryStatOption, SpecialMasterySlotState } from '../types/index';

interface PlatinumSpecialMasterySelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  categoryId: string;
  slotIndex: 0 | 1;
  statOptions: SpecialMasteryStatOption[];
  currentSelection: SpecialMasterySlotState | undefined;
}

export const PlatinumSpecialMasterySelectionModal: React.FC<PlatinumSpecialMasterySelectionModalProps> = ({
  isOpen,
  onClose,
  categoryId,
  slotIndex,
  statOptions,
  currentSelection
}) => {
  const { selectSpecialMasteryStat } = usePlatinumMeritStore();
  const [selectedStatIndex, setSelectedStatIndex] = useState<number | null>(
    currentSelection?.selectedStatIndex ?? null
  );
  const [selectedGrade, setSelectedGrade] = useState<number | null>(
    currentSelection?.selectedGrade ?? null
  );
  
  if (!isOpen) return null;
  
  const handleStatSelect = (statIndex: number) => {
    setSelectedStatIndex(statIndex);
    // Auto-select first available grade
    const statOption = statOptions[statIndex];
    if (statOption && statOption.grades.length > 0) {
      setSelectedGrade(statOption.grades[0].grade);
    } else {
      setSelectedGrade(null);
    }
  };
  
  const handleGradeSelect = (grade: number) => {
    setSelectedGrade(grade);
  };
  
  const handleConfirm = () => {
    if (selectedStatIndex !== null && selectedGrade !== null) {
      selectSpecialMasteryStat(categoryId, slotIndex, selectedStatIndex, selectedGrade);
      onClose();
    }
  };
  
  const handleClear = () => {
    setSelectedStatIndex(null);
    setSelectedGrade(null);
  };
  
  const selectedStatOption = selectedStatIndex !== null ? statOptions[selectedStatIndex] : null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70" onClick={onClose}>
      <div 
        className="bg-theme-dark border border-transparent p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-game-platinum">
            Select Special Mastery - Slot {slotIndex + 1}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Stat Options */}
          <div>
            <h3 className="text-lg font-semibold text-game-platinum mb-3">Select Stat</h3>
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {statOptions.map((statOption, index) => {
                const statInfo = getStatInfo(statOption.statType);
                const isSelected = selectedStatIndex === index;
                
                return (
                  <button
                    key={statOption.specialMasteryIndex}
                    onClick={() => handleStatSelect(index)}
                    className={`w-full p-3 rounded-lg border transition-all duration-200 text-left ${
                      isSelected
                        ? 'border-game-platinum bg-theme-darker'
                        : 'border-border-dark bg-theme-dark hover:bg-theme-darker hover:border-gray-600'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <StatIcon
                        statId={statOption.statType}
                        width={32}
                        height={32}
                        alt={statInfo?.name || statOption.statName}
                      />
                      <div className="flex-1">
                        <div className="text-white font-medium">{statOption.statName}</div>
                        <div className="text-xs text-gray-400">
                          {statOption.grades.length} grades available
                        </div>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
          
          {/* Grade Selection */}
          <div>
            <h3 className="text-lg font-semibold text-game-platinum mb-3">Select Grade</h3>
            {selectedStatOption ? (
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {selectedStatOption.grades.map((grade) => {
                  const isSelected = selectedGrade === grade.grade;
                  const statInfo = getStatInfo(selectedStatOption.statType);
                  const formattedValue = formatStatValue(selectedStatOption.statType, grade.value);
                  
                  return (
                    <button
                      key={grade.grade}
                      onClick={() => handleGradeSelect(grade.grade)}
                      className={`w-full p-3 rounded-lg border transition-all duration-200 text-left ${
                        isSelected
                          ? 'border-game-platinum bg-theme-darker'
                          : 'border-border-dark bg-theme-dark hover:bg-theme-darker hover:border-gray-600'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-white font-medium">
                            Grade {grade.grade}
                          </div>
                          <div className="text-game-platinum font-bold text-sm">
                            +{formattedValue}
                          </div>
                        </div>
                        {grade.ratio !== null && (
                          <div className="text-xs text-gray-400 text-right">
                            <div>Chance: {grade.ratio.toFixed(2)}%</div>
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            ) : (
              <div className="text-gray-400 text-center py-8">
                Select a stat first
              </div>
            )}
          </div>
        </div>
        
        {/* Actions */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t border-border-dark">
          <button
            onClick={handleClear}
            className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
          >
            Clear Selection
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm border border-border-dark rounded hover:bg-theme-darker transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={selectedStatIndex === null || selectedGrade === null}
              className="px-4 py-2 text-sm bg-game-platinum text-black rounded hover:bg-game-highlight transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Confirm
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

