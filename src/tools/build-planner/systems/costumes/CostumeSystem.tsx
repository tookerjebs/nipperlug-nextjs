'use client';

import React from 'react';
import { useCostumeStore } from './stores/costumeStore';
import { getCostumeStats, getEpicCraftOptions } from './data/costumeData';
import SystemSlotGrid from '../../components/systems/SystemSlotGrid';
import StatSelectionModal from '../../components/systems/stat-selection/StatSelectionModal';
import { StatOption, SystemSlot } from '../../types/systems';
import { ActionButtons } from '../../components/systems/ActionButtons';

export const CostumeSystem: React.FC = () => {
  const {
    categories,
    selectedSlotId,
    isModalOpen,
    handleSlotClick,
    handleStatSelect,
    handleStatRemove,
    initializeCategories,
    setIsModalOpen,
    setSelectedSlotId,
    resetSystem
  } = useCostumeStore();

  // Initialize on mount
  React.useEffect(() => {
    if (categories.length === 0) {
      initializeCategories();
    }
  }, [categories.length, initializeCategories]);

  const selectedSlot = selectedSlotId 
    ? categories.flatMap(cat => cat.slots).find(slot => slot.id === selectedSlotId)
    : null;

  // Get available stats based on slot type
  const availableStats: StatOption[] = selectedSlot 
    ? selectedSlot.slotType === 'epic'
      ? getEpicCraftOptions(selectedSlot.category)
      : getCostumeStats(selectedSlot.category)
    : [];

  // Simplified modal close handler
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedSlotId(null);
  };

  // Simplified slot click handler
  const onSlotClick = (slot: SystemSlot) => {
    handleSlotClick(slot.category, slot.id);
  };

  // Simplified stat select handler
  const onStatSelect = (slot: SystemSlot, stat: StatOption) => {
    handleStatSelect(stat);
  };

  // Simplified stat remove handler
  const onStatRemove = (slot: SystemSlot) => {
    handleStatRemove(slot.category, slot.id);
  };

  return (
    <div className="space-y-6">
      <div className="bg-card rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <ActionButtons 
            onQuickFill={() => {/* Quick fill not implemented */}}
            onReset={() => resetSystem()}
          />
        </div>
        
        <SystemSlotGrid
          categories={categories as any}
          selectedSlotId={selectedSlotId}
          onSlotClick={onSlotClick}
          slotSize="lg"
          gridCols={4}
        />
      </div>

      {selectedSlot && (
        <StatSelectionModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          slot={selectedSlot as any}
          availableStats={availableStats}
          onStatSelect={onStatSelect}
          onRemoveStat={onStatRemove}
        />
      )}
    </div>
  );
};