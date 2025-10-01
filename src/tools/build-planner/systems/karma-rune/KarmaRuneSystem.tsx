/**
 * KarmaRuneSystem - Main component for the Karma Rune system
 * Provides a UI for managing karma rune slots and selections
 */

'use client';

import React, { useCallback, useMemo } from 'react';
import KarmaRuneSlot from './KarmaRuneSlot';
import RuneSelectionModal from './components/RuneSelectionModal';
import { ActionButtons } from '../../components/systems/ActionButtons';
import { TotalStatsButton } from '../../components/systems/TotalStatsButton';
import { KarmaRune, karmaRunes } from './data/karmaRuneData';
import { useKarmaRuneStore, karmaRuneSystemConfig } from './stores/karmaRuneStore';

// Export the system config for build sharing
export { karmaRuneSystemConfig } from './stores/karmaRuneStore';

export default function KarmaRuneSystem() {
  const {
    equippedRunes,
    selectedSlot,
    isModalOpen,
    totalStats,
    setSelectedSlot,
    setIsModalOpen,
    equipRune,
    removeRune,
    levelUpRune,
    resetSystem,
    quickFillSystem,
    getUsedSlots,
    getTotalSlots
  } = useKarmaRuneStore();

  // Memoize slot calculations to prevent unnecessary recalculations
  const totalSlots = useMemo(() => getTotalSlots(), [getTotalSlots]);
  const usedSlots = useMemo(() => getUsedSlots(), [getUsedSlots]);

  // Memoize event handlers to prevent unnecessary re-renders of child components
  const handleSlotClick = useCallback((slotNumber: number) => {
    setSelectedSlot(slotNumber);
    setIsModalOpen(true);
  }, [setSelectedSlot, setIsModalOpen]);

  const handleRuneSelect = useCallback((rune: KarmaRune) => {
    if (selectedSlot !== null) {
      equipRune(selectedSlot, rune);
    }
  }, [equipRune, selectedSlot]);

  const handleRuneRemove = useCallback((slotNumber: number) => {
    removeRune(slotNumber);
  }, [removeRune]);

  const handleRuneLevelUp = useCallback((slotNumber: number) => {
    levelUpRune(slotNumber);
  }, [levelUpRune]);

  const handleModalClose = useCallback(() => {
    setIsModalOpen(false);
    setSelectedSlot(null);
  }, [setIsModalOpen, setSelectedSlot]);

  // Memoize available runes - exclude already equipped runes
  const availableRunesForModal = useMemo(() => {
    const equippedRuneIds = new Set(
      equippedRunes
        .map(rune => rune?.id)
        .filter(Boolean)
    );
    // If a slot is selected, the rune in that slot should still be available for re-selection or viewing
    // However, the current modal doesn't show the current rune, so we filter all equipped.
    return karmaRunes.filter(rune => !equippedRuneIds.has(rune.id));
  }, [equippedRunes]);

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Header */}
      <div className="rune-system-panel p-4 mb-4">
        <div className="flex items-center justify-end gap-4 mb-2">
          <ActionButtons 
            onQuickFill={quickFillSystem}
            onReset={resetSystem}
          />
          <TotalStatsButton
            totalStats={totalStats}
            systemName="Karma Rune"
          />
        </div>
        
        {/* Slots container with scroll - increased height */}
        <div className="max-h-[700px] overflow-y-auto space-y-1 mb-4 dark-scrollbar">
              {Array.from({ length: 55 }, (_, index) => (
              <KarmaRuneSlot
                key={index}
                slotIndex={index}
                equippedRune={equippedRunes[index]}
                onClick={() => handleSlotClick(index + 1)} // Pass 1-indexed slot number
                onLevelUp={() => handleRuneLevelUp(index + 1)} // Pass 1-indexed slot number
                onRemove={() => handleRuneRemove(index + 1)} // Pass 1-indexed slot number
              />
            ))}
        </div>

        {/* Slot counter */}
        <div className="text-center text-sm text-gray-400 mb-3">
          Karma Slot (In Use/Total): {usedSlots}/{totalSlots}
        </div>
      </div>

      {/* Rune Selection Modal */}
        <RuneSelectionModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          availableRunes={availableRunesForModal} // Use memoized available runes
          onRuneSelect={handleRuneSelect} // handleRuneSelect now matches modal's onRuneSelect signature
        />
    </div>
  );
};