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
      <h3 className="text-md font-semibold text-game-gold mb-3">
        Select Slot ({selectedSlot ? '1' : '0'}/{maxSlots})
      </h3>
      
      {/* Current slot with icon */}
      {selectedSlot && (
        <div>
          <div 
            className="flex items-center justify-between bg-theme-dark p-2 rounded"
            style={{ border: '1px solid rgba(255, 215, 0, 0.5)' }}
          >
            <div className="flex items-center space-x-2">
              <div className="inline-block">
                <StatIcon 
                  statId={selectedSlot.statId}
                  width={24}
                  height={24}
                  alt={getStatInfo(selectedSlot.statId)?.name || selectedSlot.statId}
                />
              </div>
              <span className="text-sm text-game-gold">
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
        <div className="grid grid-cols-1 gap-2">
          {slotOptions.map(option => (
            <div key={option.statId} className="flex items-center justify-between bg-theme-dark p-2 rounded">
              <span className="text-sm text-gray-300">{option.name}:</span>
              <button
                onClick={() => onSlotSelect(option.statId, option.value)}
                className="text-game-gold hover:text-game-gold/80 px-3 py-1 rounded text-xs font-medium transition-colors duration-200"
                style={{ border: '1px solid rgba(255, 215, 0, 0.3)' }}
                onMouseEnter={(e) => e.currentTarget.style.border = '1px solid rgba(255, 215, 0, 0.5)'}
                onMouseLeave={(e) => e.currentTarget.style.border = '1px solid rgba(255, 215, 0, 0.3)'}
              >
                +{option.value}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SlotConfiguration;