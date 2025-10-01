'use client';

/**
 * SlotConfiguration Component
 * Unified slot configuration component for unique equipment items
 * Uses StatIcon approach with consistent styling
 */

import React from 'react';
import { getStatInfo } from '@/tools/build-planner/data/stats-config';
import { StatIcon } from '@/tools/build-planner/components/StatIcon';

export interface SlotOption {
  statId: string;
  name: string;
  value: number;
}

export interface SelectedSlot {
  statId: string;
  value: number;
}

interface SlotConfigurationProps {
  selectedSlot?: SelectedSlot;
  slotOptions: SlotOption[];
  maxSlots: number;
  onSlotSelect: (statId: string, value: number) => void;
  onSlotRemove: () => void;
}

const SlotConfiguration: React.FC<SlotConfigurationProps> = ({
  selectedSlot,
  slotOptions,
  maxSlots,
  onSlotSelect,
  onSlotRemove
}) => {
  return (
    <div className="mb-6 bg-theme-darker p-5 rounded-md border border-border-dark">
      <h3 className="text-md font-semibold text-blue-400 mb-3">
        Slot Configuration ({selectedSlot ? '1' : '0'}/{maxSlots})
      </h3>
      
      {/* Current slot with icon */}
      {selectedSlot && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Selected Slot:</h4>
          <div className="flex items-center justify-between bg-theme-dark p-2 rounded border border-blue-500">
            <div className="flex items-center space-x-2">
              <div className="inline-block">
                <StatIcon 
                  statId={selectedSlot.statId}
                  width={24}
                  height={24}
                  alt={getStatInfo(selectedSlot.statId)?.name || selectedSlot.statId}
                />
              </div>
              <span className="text-sm text-blue-400">
                {slotOptions.find(opt => opt.statId === selectedSlot.statId)?.name || selectedSlot.statId}: +{selectedSlot.value}
              </span>
            </div>
            <button
              onClick={onSlotRemove}
              className="text-red-400 hover:text-red-300 text-sm"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      {/* Add slot */}
      {!selectedSlot && (
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-2">Select Slot:</h4>
          <div className="grid grid-cols-1 gap-2">
            {slotOptions.map(option => (
              <div key={option.statId} className="flex items-center justify-between bg-theme-dark p-2 rounded">
                <span className="text-sm text-gray-300">{option.name}:</span>
                <button
                  onClick={() => onSlotSelect(option.statId, option.value)}
                  className="bg-blue-600 hover:bg-blue-500 text-white px-3 py-1 rounded text-xs font-medium"
                >
                  +{option.value}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default SlotConfiguration;