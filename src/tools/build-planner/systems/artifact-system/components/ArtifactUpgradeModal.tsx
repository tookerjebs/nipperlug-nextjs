/**
 * Artifact Upgrade Modal
 * Main configuration modal for artifacts with slot configuration
 */

import React, { useState } from 'react';
import { ArtifactType, SlotType } from '../types';
import { useArtifactSystemStore } from '../stores/artifactSystemStore';
import { getArtifactDefinition, getSlotValue } from '../data/artifacts-data';
import { getStatInfo, formatStatValue } from '@/tools/build-planner/data/stats-config';
import { StatIcon } from '@/tools/build-planner/components/StatIcon';
import ArtifactTooltip from './ArtifactTooltip';
import ArtifactSlotOptionModal from './ArtifactSlotOptionModal';
import UpgradeModalLayout from '../../equipment-system/components/upgrade-modals/shared/UpgradeModalLayout';
import UpgradeSlider from '../../equipment-system/components/upgrade-modals/shared/UpgradeSlider';

interface ArtifactUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  artifactType: ArtifactType;
}

const ArtifactUpgradeModal: React.FC<ArtifactUpgradeModalProps> = ({
  isOpen,
  onClose,
  artifactType,
}) => {
  const {
    getConfiguredArtifact,
    configureSlot,
    setSlotLevel,
    removeSlot,
    removeArtifact,
  } = useArtifactSystemStore();
  
  const artifact = getConfiguredArtifact(artifactType);
  const artifactDef = getArtifactDefinition(artifactType);
  
  const [selectedSlotIndex, setSelectedSlotIndex] = useState<number | null>(null);
  const [selectedSlotType, setSelectedSlotType] = useState<SlotType | null>(null);
  const [isSlotOptionModalOpen, setIsSlotOptionModalOpen] = useState(false);
  
  if (!artifact) {
    return null;
  }
  
  const handleSlotClick = (slotIndex: number, slotType: SlotType) => {
    setSelectedSlotIndex(slotIndex);
    setSelectedSlotType(slotType);
    setIsSlotOptionModalOpen(true);
  };
  
  const handleSelectOption = (statId: string) => {
    if (selectedSlotIndex !== null && selectedSlotType !== null) {
      configureSlot(artifactType, selectedSlotIndex, selectedSlotType, statId);
    }
    setIsSlotOptionModalOpen(false);
    setSelectedSlotIndex(null);
    setSelectedSlotType(null);
  };
  
  const handleLevelChange = (slotIndex: number, slotType: SlotType, level: number) => {
    setSlotLevel(artifactType, slotIndex, slotType, level);
  };
  
  const handleRemoveSlot = (slotIndex: number, slotType: SlotType) => {
    removeSlot(artifactType, slotIndex, slotType);
  };
  
  const handleApply = () => {
    onClose();
  };
  
  const handleRemove = () => {
    removeArtifact(artifactType);
    onClose();
  };
  
  // Render a slot row
  const renderSlotRow = (slot: typeof artifact.slots[0]) => {
    const statInfo = slot.statId ? getStatInfo(slot.statId) : null;
    const value = slot.statId 
      ? getSlotValue(artifactType, slot.slotIndex, slot.slotType, slot.statId, slot.level)
      : 0;
    
    return (
      <div
        key={`${slot.slotType}-${slot.slotIndex}`}
        className="mb-3 bg-theme-darker p-3 rounded-md border border-border-dark"
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center space-x-2">
            <span className="text-sm font-semibold text-game-gold">
              {slot.slotType === 'unique' ? 'Unique' : 'Assembled'} #{slot.slotIndex}
            </span>
          </div>
          {slot.statId && (
            <button
              onClick={() => handleRemoveSlot(slot.slotIndex, slot.slotType)}
              className="text-red-400 hover:text-red-300 text-xs"
            >
              Remove
            </button>
          )}
        </div>
        
        {slot.statId && statInfo ? (
          <div className="space-y-3">
            {/* Stat display with icon */}
            <div className="flex items-center space-x-3">
              <StatIcon 
                statId={slot.statId}
                width={32}
                height={32}
                alt={statInfo.name}
              />
              <div className="flex-1">
                <div className="text-white font-medium">{statInfo.name}</div>
                <div className="text-game-gold text-sm">
                  +{formatStatValue(slot.statId, value)}
                </div>
              </div>
            </div>
            
            {/* Level slider */}
            <UpgradeSlider
              label="Level"
              value={slot.level}
              minValue={1}
              maxValue={slot.maxLevel}
              onChange={(level) => handleLevelChange(slot.slotIndex, slot.slotType, level)}
            />
          </div>
        ) : (
          <button
            onClick={() => handleSlotClick(slot.slotIndex, slot.slotType)}
            className="w-full p-3 border-2 border-dashed border-gray-600 rounded-lg hover:border-game-gold transition-colors text-gray-400 hover:text-game-gold"
          >
            <div className="text-center">
              <div className="text-lg mb-1">+</div>
              <div className="text-sm">Click to select stat</div>
            </div>
          </button>
        )}
      </div>
    );
  };
  
  // Separate unique and assembled slots
  const uniqueSlots = artifact.slots.filter(s => s.slotType === 'unique');
  const assembledSlots = artifact.slots.filter(s => s.slotType === 'assembled');
  
  // Calculate current and max levels for Unique Parts
  const uniqueCurrentLevels = uniqueSlots
    .filter(slot => slot.statId !== null)
    .reduce((sum, slot) => sum + slot.level, 0);
  const uniqueMaxLevels = uniqueSlots.reduce((sum, slot) => sum + slot.maxLevel, 0);
  
  // Calculate current and max levels for Assembled Parts
  const assembledCurrentLevels = assembledSlots
    .filter(slot => slot.statId !== null)
    .reduce((sum, slot) => sum + slot.level, 0);
  const assembledMaxLevels = assembledSlots.reduce((sum, slot) => sum + slot.maxLevel, 0);
  
  // Left content - Configuration
  const leftContent = (
    <div>
      {/* Artifact Info */}
      <div className="mb-6 bg-theme-darker p-5 rounded-md border border-border-dark">
        <h3 className="text-lg font-semibold text-game-gold mb-2">{artifactDef.name}</h3>
        <div className="text-sm text-gray-400">
          Max Level: {artifactDef.maxLevel}
        </div>
      </div>
      
      {/* Unique Slots */}
      {uniqueSlots.length > 0 && (
        <div className="mb-6">
          <h3 className="text-md font-semibold text-game-gold mb-3">
            Unique Parts ({uniqueCurrentLevels}/{uniqueMaxLevels})
          </h3>
          {uniqueSlots.map(slot => renderSlotRow(slot))}
        </div>
      )}
      
      {/* Assembled Slots */}
      {assembledSlots.length > 0 && (
        <div className="mb-6">
          <h3 className="text-md font-semibold text-game-gold mb-3">
            Assembled Parts ({assembledCurrentLevels}/{assembledMaxLevels})
          </h3>
          {assembledSlots.map(slot => renderSlotRow(slot))}
        </div>
      )}
    </div>
  );
  
  // Right content - Tooltip preview
  const rightContent = (
    <div>
      <div className="bg-theme-darker p-5 rounded-md border border-border-dark">
        <h3 className="text-md font-semibold text-game-gold mb-3">Artifact Preview</h3>
        <ArtifactTooltip artifact={artifact} />
      </div>
    </div>
  );
  
  return (
    <>
      <UpgradeModalLayout
        isOpen={isOpen}
        title={artifactDef.name}
        onClose={onClose}
        onApply={handleApply}
        onRemove={handleRemove}
        removeButtonText="Remove Artifact"
        applyButtonText="Apply"
        leftContent={leftContent}
        rightContent={rightContent}
      />
      
      {/* Slot Option Selection Modal */}
      {selectedSlotIndex !== null && selectedSlotType !== null && (
        <ArtifactSlotOptionModal
          isOpen={isSlotOptionModalOpen}
          onClose={() => {
            setIsSlotOptionModalOpen(false);
            setSelectedSlotIndex(null);
            setSelectedSlotType(null);
          }}
          artifactType={artifactType}
          slotIndex={selectedSlotIndex}
          slotType={selectedSlotType}
          onSelectOption={handleSelectOption}
        />
      )}
    </>
  );
};

export default ArtifactUpgradeModal;

