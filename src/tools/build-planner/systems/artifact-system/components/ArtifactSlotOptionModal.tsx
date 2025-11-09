/**
 * Artifact Slot Option Modal
 * Shows all available stat options for a specific slot
 */

import React from 'react';
import { ArtifactType, SlotType, ArtifactSlotOption } from '../types';
import { getArtifactDefinition } from '../data/artifacts-data';
import { getStatInfo, formatStatValue } from '@/tools/build-planner/data/stats-config';
import { StatIcon } from '@/tools/build-planner/components/StatIcon';
import { X } from 'lucide-react';

interface ArtifactSlotOptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  artifactType: ArtifactType;
  slotIndex: number;
  slotType: SlotType;
  onSelectOption: (statId: string) => void;
}

const ArtifactSlotOptionModal: React.FC<ArtifactSlotOptionModalProps> = ({
  isOpen,
  onClose,
  artifactType,
  slotIndex,
  slotType,
  onSelectOption,
}) => {
  if (!isOpen) return null;
  
  const artifactDef = getArtifactDefinition(artifactType);
  const slots = slotType === 'unique' ? artifactDef.uniqueSlots : artifactDef.assembledSlots;
  const slotDef = slots.find(s => s.slotIndex === slotIndex);
  
  if (!slotDef) {
    return null;
  }
  
  const handleSelect = (statId: string) => {
    onSelectOption(statId);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-theme-darker border border-game-gold rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-game-gold">
            Select Stat for {slotType === 'unique' ? 'Unique' : 'Assembled'} #{slotIndex}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        {/* Options List */}
        <div className="space-y-2">
          {slotDef.options.map((option, index) => {
            const statInfo = getStatInfo(option.statId);
            if (!statInfo) return null;
            
            const maxValue = option.values[option.values.length - 1];
            const formattedMaxValue = formatStatValue(option.statId, maxValue);
            
            return (
              <button
                key={option.statId}
                onClick={() => handleSelect(option.statId)}
                className="w-full p-3 rounded-lg border border-border-dark bg-theme-dark hover:bg-theme-darker hover:border-game-gold transition-all duration-200 text-left"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <StatIcon 
                      statId={option.statId}
                      width={32}
                      height={32}
                      alt={statInfo.name}
                    />
                    <div>
                      <div className="text-white font-medium">{statInfo.name}</div>
                      <div className="text-xs text-gray-400">
                        Chance: {option.chance.toFixed(2)}%
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="text-game-gold font-bold">
                      Max: {formattedMaxValue}
                    </div>
                    <div className="text-xs text-gray-400">
                      Levels: 1-{option.values.length}
                    </div>
                  </div>
                </div>
              </button>
            );
          })}
        </div>
        
        {/* Info */}
        <div className="mt-4 text-xs text-gray-400 text-center">
          Select a stat to configure this slot. You can adjust the level after selection.
        </div>
      </div>
    </div>
  );
};

export default ArtifactSlotOptionModal;

