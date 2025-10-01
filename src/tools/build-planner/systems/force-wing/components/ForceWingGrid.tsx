'use client';

import React from 'react';
import { ForceWingSlot } from './ForceWingSlot';
import { useForceWingSystemStore } from '../stores/forceWingSystemStore';
import { StatOption } from '@/tools/build-planner/types/systems';



interface ForceWingGridProps {
  variant: 'selection' | 'options' | 'selected';
  title: string;
  slots: Array<{
    id: string;
    position: number;
    isOccupied: boolean;
    selectedStat?: {
      id: string;
      name: string;
      value: number;
      level: number;
    };
  }>;
  selectedSlotId?: string | null;
  onSlotClick: (slotId: string, position: number) => void;
  statOptions?: StatOption[];
  onStatSelect?: (statId: string) => void;
  onLevelUp?: () => void;
  onLevelDown?: () => void;
  canLevelUp?: boolean;
  canLevelDown?: boolean;
}

export const ForceWingGrid: React.FC<ForceWingGridProps> = ({
  variant,
  title,
  slots,
  selectedSlotId,
  onSlotClick,
  statOptions = [],
  onStatSelect,
  onLevelUp,
  onLevelDown,
  canLevelUp = false,
  canLevelDown = false
}) => {
  const getGridClass = () => {
    if (variant === 'selection') {
      // Top section: 2 rows of 6 slots each with reduced column spacing
      return 'grid grid-cols-6 gap-x-1 gap-y-6';
    } else if (variant === 'options') {
      // Middle section: 2 rows of 3 slots each
      return 'grid grid-cols-3 gap-4';
    } else {
      // Bottom section: single slot with controls
      return 'flex flex-col items-center gap-4';
    }
  };

  // Helper function to determine slot offset type
  const getSlotOffsetType = (position: number) => {
    // For a 6x2 grid (positions 0-11):
    // Row 1: positions 0-5 (first=0, last=5)
    // Row 2: positions 6-11 (first=6, last=11)
    
    // Full offset (double): first and last of each row
    const isFirstOrLastInRow1 = position === 0 || position === 5;
    const isFirstOrLastInRow2 = position === 6 || position === 11;
    if (isFirstOrLastInRow1 || isFirstOrLastInRow2) {
      return 'full';
    }
    
    // Half offset: second and second-to-last of each row
    const isSecondOrSecondLastInRow1 = position === 1 || position === 4;
    const isSecondOrSecondLastInRow2 = position === 7 || position === 10;
    if (isSecondOrSecondLastInRow1 || isSecondOrSecondLastInRow2) {
      return 'half';
    }
    
    return 'none';
  };

  const renderSelectionGrid = () => (
    <div className="pt-20"> {/* Add top padding to accommodate the highest offset */}
      <div className={getGridClass()}>
        {slots.map((slot) => (
          <ForceWingSlot
            key={slot.id}
            slotId={slot.id}
            position={slot.position}
            isOccupied={slot.isOccupied}
            selectedStat={slot.selectedStat}
            isSelected={selectedSlotId === slot.id}
            onClick={() => onSlotClick(slot.id, slot.position)}
            variant="selection"
            offsetType={getSlotOffsetType(slot.position)}
          />
        ))}
      </div>
    </div>
  );

  const renderOptionsGrid = () => (
    <div className={getGridClass()}>
      {statOptions.map((statOption, index) => (
        <ForceWingSlot
          key={`${statOption.id}-${index}`}
          slotId={`option-${index}`}
          position={index}
          isOccupied={true}
          onClick={() => onStatSelect?.(statOption.id)}
          variant="option"
          statOption={statOption}
        />
      ))}
      {/* Fill empty slots if less than 6 options */}
      {Array.from({ length: Math.max(0, 6 - statOptions.length) }).map((_, index) => (
        <ForceWingSlot
          key={`empty-${index}`}
          slotId={`empty-${index}`}
          position={statOptions.length + index}
          isOccupied={false}
          onClick={() => {}}
          variant="option"
        />
      ))}
    </div>
  );

  const renderSelectedGrid = () => {
    const selectedSlot = slots.find(slot => slot.id === selectedSlotId);
    const { getTrainingPointCost, getStatMaxLevel } = useForceWingSystemStore();
    
    return (
      <div className={getGridClass()}>
        {selectedSlot?.isOccupied && selectedSlot.selectedStat ? (
          <div className="flex items-center gap-6">
            {/* Stat Icon */}
            <ForceWingSlot
              slotId={selectedSlot.id}
              position={0}
              isOccupied={selectedSlot.isOccupied}
              selectedStat={selectedSlot.selectedStat}
              onClick={() => {}}
              variant="selected"
            />
            
            {/* Stat Info and Controls */}
            <div className="flex flex-col gap-3">
              {/* Stat Name and Value */}
              <div className="text-center">
                <div className="text-lg font-semibold text-gray-300">{selectedSlot.selectedStat.name}</div>
                <div className="text-xl font-bold text-game-gold">+{selectedSlot.selectedStat.value}</div>
              </div>
              
              {/* Level and Controls */}
              <div className="flex items-center gap-3">
                <button
                  onClick={onLevelDown}
                  disabled={!canLevelDown}
                  className={`w-8 h-8 rounded flex items-center justify-center font-bold ${
                    canLevelDown
                      ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600'
                      : 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed'
                  }`}
                >
                  −
                </button>
                
                <div className="text-center min-w-[60px]">
                  <div className="text-sm text-gray-400">Level</div>
                  <div className="text-lg font-bold text-white">
                    {selectedSlot.selectedStat.level}/{getStatMaxLevel(selectedSlot.selectedStat.id)}
                  </div>
                </div>
                
                <button
                  onClick={onLevelUp}
                  disabled={!canLevelUp}
                  className={`w-8 h-8 rounded flex items-center justify-center font-bold ${
                    canLevelUp
                      ? 'bg-gray-700 hover:bg-gray-600 text-white border border-gray-600'
                      : 'bg-gray-800 text-gray-500 border border-gray-700 cursor-not-allowed'
                  }`}
                >
                  +
                </button>
                
                {/* Training Point Cost */}
                {canLevelUp && (
                  <div className="text-sm text-gray-400 ml-2">
                    Cost: <span className="text-game-gold font-bold">
                      {getTrainingPointCost(selectedSlot.selectedStat.id, selectedSlot.selectedStat.level + 1)}
                    </span> TP
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-4 py-8">
            <ForceWingSlot
              slotId="empty-selected"
              position={0}
              isOccupied={false}
              onClick={() => {}}
              variant="selected"
            />
            <div className="text-sm text-gray-500">
              {selectedSlotId ? 'No stat assigned to this slot' : 'Select a slot to manage its stats'}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="glass-panel p-6 space-y-4">
      {/* Section Title */}
      <div className="flex items-center justify-between">
        <h4 className="text-lg font-semibold text-gray-300">{title}</h4>
        {variant === 'selection' && selectedSlotId && (
          <div className="text-sm text-gray-400">
            Selected Slot: {(() => {
              const slot = slots.find(s => s.id === selectedSlotId);
              return slot ? slot.position + 1 : 'None';
            })()}
          </div>
        )}
      </div>
      
      {/* Grid Content */}
      <div className={`flex justify-center ${variant === 'selection' ? 'min-h-[200px]' : ''}`}>
        {variant === 'selection' && renderSelectionGrid()}
        {variant === 'options' && renderOptionsGrid()}
        {variant === 'selected' && renderSelectedGrid()}
      </div>
      
      {/* Helper Text */}
      <div className="text-center text-sm text-gray-500">
        {variant === 'selection' && 'Click on a slot to select stats for it'}
        {variant === 'options' && (selectedSlotId ? 'Choose a stat to assign to the selected slot' : 'Select a slot above to choose stats')}
        {variant === 'selected' && (selectedSlotId ? 'Use level controls to adjust the selected stat' : 'Select a slot with stats to manage levels')}
      </div>
    </div>
  );
};