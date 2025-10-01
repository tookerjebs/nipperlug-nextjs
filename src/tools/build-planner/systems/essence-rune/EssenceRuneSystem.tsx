/**
 * EssenceRuneSystem - Main component for the Essence Rune system
 * Provides a UI for managing essence rune slots and selections
 */

'use client';

import React, { useCallback, useMemo } from 'react';
import EssenceRuneSlot from './EssenceRuneSlot';
import RuneSelectionModal from './components/RuneSelectionModal';
import { ActionButtons } from '../../components/systems/ActionButtons';
import { TotalStatsButton } from '../../components/systems/TotalStatsButton';
import { EssenceRune, essenceRunes } from './data/essenceRuneData';
import { useEssenceRuneStore, essenceRuneSystemConfig } from './stores/essenceRuneStore';

// Export the system config for build sharing
export { essenceRuneSystemConfig } from './stores/essenceRuneStore';

const EssenceRuneSystem: React.FC = () => {
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
    getUsedSlots,
    getTotalSlots,
    resetSystem,
    quickFillSystem
  } = useEssenceRuneStore();

  // Memoize slot calculations to prevent unnecessary recalculations
  const totalSlots = useMemo(() => getTotalSlots(), [getTotalSlots]);
  const usedSlots = useMemo(() => getUsedSlots(), [getUsedSlots]);

  // Memoize event handlers to prevent unnecessary re-renders of child components
  const handleSlotClick = useCallback((slotNumber: number) => {
    setSelectedSlot(slotNumber);
    setIsModalOpen(true);
  }, [setSelectedSlot, setIsModalOpen]);

  const handleRuneSelect = useCallback((slotNumber: number, rune: EssenceRune) => {
    equipRune(slotNumber, rune);
  }, [equipRune]);

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

  // Memoize current rune lookup for modal
  const currentRune = useMemo(() => {
    if (!selectedSlot) return null;
    const equippedRune = equippedRunes[selectedSlot - 1];
    return equippedRune ? essenceRunes.find(r => r.id === equippedRune.id) ?? null : null;
  }, [selectedSlot, equippedRunes]);

  // Memoize available runes - exclude already equipped runes (except current slot)
  const availableRunes = useMemo(() => {
    const equippedRuneIds = new Set(
      equippedRunes
        .map((rune, index) => {
          // Allow re-selecting the same rune for the current slot
          if (selectedSlot && index === selectedSlot - 1) return null;
          return rune?.id;
        })
        .filter(Boolean)
    );
    
    return essenceRunes.filter(rune => !equippedRuneIds.has(rune.id));
  }, [equippedRunes, selectedSlot]);

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
            systemName="Essence Rune"
          />
        </div>
        
        {/* Slots container with scroll - increased height */}
        <div className="max-h-[700px] overflow-y-auto space-y-1 mb-4 dark-scrollbar">
          {equippedRunes.map((rune, index) => {
            // Memoize rune data lookup per slot to prevent repeated searches
            const runeData = rune ? essenceRunes.find(r => r.id === rune.id) ?? null : null;
            
            return (
              <EssenceRuneSlot
                key={index}
                slotNumber={index + 1}
                rune={rune}
                runeData={runeData}
                onClick={() => handleSlotClick(index + 1)}
                onLevelUp={() => handleRuneLevelUp(index + 1)}
                onRemove={() => handleRuneRemove(index + 1)}
              />
            );
          })}
        </div>

        {/* Slot counter */}
        <div className="text-center text-sm text-gray-400 mb-3">
          Essence Slot (In Use/Total): {usedSlots}/{totalSlots}
        </div>
      </div>

      {/* Rune Selection Modal */}
      <RuneSelectionModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        slotNumber={selectedSlot || 1}
        availableRunes={availableRunes}
        onRuneSelect={handleRuneSelect}
        onRemoveRune={handleRuneRemove}
        currentRune={currentRune}
      />
    </div>
  );
};

export default EssenceRuneSystem;