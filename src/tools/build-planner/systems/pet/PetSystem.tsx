'use client';

import React, { useEffect } from 'react';
import { SystemSlotGrid, StatSelectionModal } from '@/tools/build-planner/components/systems';
import { ActionButtons } from '@/tools/build-planner/components/systems/ActionButtons';
import { TotalStatsButton } from '@/tools/build-planner/components/systems/TotalStatsButton';
import { SystemSlot, StatOption } from './types/pet';
import { usePetSystemStore, petSystemConfig } from './stores/petSystemStore';

// Export the pet system config for build sharing
export { petSystemConfig } from './stores/petSystemStore';

export const PetSystem: React.FC = () => {
  const {
    categories,
    selectedSlotId,
    isModalOpen,
    totalStats,
    handleSlotClick,
    handleStatSelect,
    handleStatRemove,
    getSlotById,
    getAvailableStats,
    initializeCategories,
    resetSystem,
    quickFillSystem,
    setIsModalOpen,
    setSelectedSlotId,
    // loadFromUrl removed as part of sharing cleanup
  } = usePetSystemStore();

  // Create clean handler functions
  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedSlotId(null);
  };

  const handleQuickFill = () => {
    quickFillSystem();
  };

  const handleReset = () => {
    resetSystem();
  };

  // Initialize categories and slots only once
  useEffect(() => {
    // Only initalize if categories are empty
    if (categories.length == 0) {
      initializeCategories();
    }
  }, [initializeCategories, categories.length]);
  
  // URL sharing functionality removed as part of cleanup
  // Will be replaced with universal build sharing approach

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <ActionButtons 
            onQuickFill={handleQuickFill} 
            onReset={handleReset}
          />
          <TotalStatsButton
            totalStats={totalStats}
            systemName="Pet System"
          />
        </div>
      </div>

      <SystemSlotGrid
        categories={categories}
        selectedSlotId={selectedSlotId}
        onSlotClick={handleSlotClick}
        slotSize="md"
        gridCols={10}
      />

      {selectedSlotId && (
        <StatSelectionModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          slot={getSlotById(selectedSlotId)}
          availableStats={getAvailableStats(selectedSlotId)}
          onStatSelect={handleStatSelect}
          onRemoveStat={handleStatRemove}
        />
      )}
    </div>
  );
}