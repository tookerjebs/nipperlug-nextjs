'use client';

import React, { useEffect } from 'react';
import { useForceWingSystemStore, forceWingSystemConfig } from './stores/forceWingSystemStore';
import { ForceWingGrid } from './components/ForceWingGrid';
import { ForceWingLevelControl } from './components/ForceWingLevelControl';
import { ActionButtons } from '../../components/systems/ActionButtons';
import { TotalStatsButton } from '../../components/systems/TotalStatsButton';

// Export the force wing system config for build sharing
export { forceWingSystemConfig } from './stores/forceWingSystemStore';

export const ForceWingSystem: React.FC = () => {
  const {
    categories,
    selectedSlotId,
    totalStats,
    forceWingLevel,
    forceWingBaseStats,
    totalTrainingPoints,
    availableTrainingPoints,
    initializeCategories,
    resetSystem,
    quickFillSystem,
    setSelectedSlotId,
    handleStatSelect,
    getAvailableStats,
    levelUpStat,
    levelDownStat,
    canLevelUp,
    canLevelDown,
    setForceWingLevel,
    getRemainingTrainingPoints,
  } = useForceWingSystemStore();

  // Initialize the system only if categories are empty
  useEffect(() => {
    // Only initialize if categories are empty (not restored from build sharing)
    if (categories.length === 0) {
      initializeCategories();
    }
  }, [initializeCategories, categories.length]);

  // Get the main category (Force Wing has only one category with 12 slots)
  const forceWingCategory = categories[0];
  const slots = forceWingCategory?.slots || [];

  // Handle slot selection in the top section
  const handleSlotClick = (slotId: string, position: number) => {
    setSelectedSlotId(slotId);
  };

  // Handle stat selection in the middle section
  const handleStatOptionSelect = (statId: string) => {
    if (selectedSlotId) {
      const availableStats = getAvailableStats(selectedSlotId);
      const selectedStat = availableStats.find(stat => stat.id === statId);
      if (selectedStat) {
        handleStatSelect(selectedSlotId, selectedStat);
      }
    }
  };

  // Get available stats for the selected slot
  const availableStatsForSelectedSlot = selectedSlotId ? getAvailableStats(selectedSlotId) : [];

  // Handle level controls in the bottom section
  const handleLevelUp = () => {
    if (selectedSlotId) {
      levelUpStat(selectedSlotId);
    }
  };

  const handleLevelDown = () => {
    if (selectedSlotId) {
      levelDownStat(selectedSlotId);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-4">
          <div className="glass-panel px-3 py-1">
            <span className="text-xs text-gray-400">Training Points: </span>
            <span className="text-xs text-game-gold font-bold">{totalTrainingPoints} used</span>
            <span className="text-xs text-gray-400 mx-1">•</span>
            <span className="text-xs text-white font-bold">{getRemainingTrainingPoints()} available</span>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <TotalStatsButton
            totalStats={totalStats}
            systemName="Force Wing"
          />
          <ActionButtons
            onQuickFill={quickFillSystem}
            onReset={resetSystem}
          />
        </div>
      </div>

      {/* Force Wing Level Control */}
      <ForceWingLevelControl
        level={forceWingLevel}
        onLevelChange={setForceWingLevel}
        baseStats={forceWingBaseStats}
        availableTrainingPoints={availableTrainingPoints}
      />

      {/* Three-section layout */}
      <div className="space-y-6">
        {/* Section 1: Slot Selection (Top) - 2 rows of 6 slots */}
        <ForceWingGrid
          variant="selection"
          title="Force Wing Slots"
          slots={slots}
          selectedSlotId={selectedSlotId}
          onSlotClick={handleSlotClick}
        />

        {/* Section 2: Stat Options (Middle) - 2 rows of 3 slots */}
        <ForceWingGrid
          variant="options"
          title={selectedSlotId ? `Available Stats for Slot ${selectedSlotId.split('-').pop()}` : "Select a slot to view available stats"}
          slots={[]} // Not used for options
          selectedSlotId={selectedSlotId}
          onSlotClick={() => {}}
          statOptions={availableStatsForSelectedSlot}
          onStatSelect={handleStatOptionSelect}
        />

        {/* Section 3: Selected Stat with Level Controls (Bottom) */}
        <ForceWingGrid
          variant="selected"
          title="Selected Stat"
          slots={slots}
          selectedSlotId={selectedSlotId}
          onSlotClick={() => {}}
          onLevelUp={handleLevelUp}
          onLevelDown={handleLevelDown}
          canLevelUp={selectedSlotId ? canLevelUp(selectedSlotId) : false}
          canLevelDown={selectedSlotId ? canLevelDown(selectedSlotId) : false}
        />
      </div>


    </div>
  );
};