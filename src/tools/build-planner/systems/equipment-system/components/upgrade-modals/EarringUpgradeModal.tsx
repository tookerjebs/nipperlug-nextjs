'use client';

/**
 * EarringUpgradeModal Component
 * Modal for configuring earring items
 * Follows the same pattern as BeltUpgradeModal and ArcanaUpgradeModal
 */

import React, { useState, useEffect } from 'react';
import { Earring, EarringStats, getAllEarrings, createConfiguredEarring, calculateEarringStats, SelectedVaryingStat, SelectedSlot, createEarringWithVaryingStats } from '../../data/earrings/earrings-data';
import { getEarringChaosUpgradeStats, getMaxEarringChaosLevel, isValidEarringChaosLevel } from '../../data/earrings/earrings-chaos-upgrade';
import { getStatInfo, formatStatValue } from '@/tools/build-planner/data/stats-config';
import SlotConfiguration from './shared/SlotConfiguration';
import VaryingStatsConfiguration from './shared/VaryingStatsConfiguration';
import UpgradeSlider from './shared/UpgradeSlider';
import EarringTooltip from '../tooltips/EarringTooltip';
import UpgradeModalLayout from './shared/UpgradeModalLayout';
import ItemSelectionGrid from '../ItemSelectionGrid';

export interface ConfiguredEarring extends Earring {
  totalStats: EarringStats;
}

interface EarringUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectEarring: (earring: ConfiguredEarring) => void;
  onRemoveEarring: () => void;
  currentEarring?: Earring;
}

const EarringUpgradeModal: React.FC<EarringUpgradeModalProps> = ({ 
  isOpen, 
  onClose, 
  onSelectEarring, 
  onRemoveEarring, 
  currentEarring 
}) => {
  const [selectedEarringId, setSelectedEarringId] = useState<string>(currentEarring?.id || '');
  const [varyingStats, setVaryingStats] = useState<SelectedVaryingStat[]>(currentEarring?.selectedVaryingStats || []);
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | undefined>(currentEarring?.selectedSlot);
  const [chaosUpgradeLevel, setChaosUpgradeLevel] = useState<number>(currentEarring?.chaosUpgradeLevel || 0);
  const allEarrings = getAllEarrings();

  // Update state when currentEarring changes
  useEffect(() => {
    if (currentEarring) {
      setSelectedEarringId(currentEarring.id);
      setVaryingStats(currentEarring.selectedVaryingStats || []);
      setSelectedSlot(currentEarring.selectedSlot);
      setChaosUpgradeLevel(currentEarring.chaosUpgradeLevel || 0);
    }
  }, [currentEarring]);

  // Find the currently selected earring - prioritize currentEarring from props
  const baseEarring = currentEarring || (selectedEarringId ? allEarrings.find(earring => earring.id === selectedEarringId) : undefined);
  const selectedEarring = baseEarring ? {
    ...createEarringWithVaryingStats(baseEarring, varyingStats, selectedSlot),
    chaosUpgradeLevel
  } : undefined;

  // Format stat value with + sign for positive values and % for percentage stats
  const formatStatValueWithSign = (statId: string, value: number | undefined) => {
    if (value === undefined) return '';
    const formattedValue = formatStatValue(statId, value);
    return value >= 0 ? `+${formattedValue}` : `-${Math.abs(value)}${formattedValue.includes('%') ? '%' : ''}`;
  };

  // Format stat name for display
  const formatStatName = (stat: string) => {
    const statInfo = getStatInfo(stat);
    return statInfo?.name || stat;
  };

  // Create configured earring for tooltip
  const configuredEarringForTooltip: ConfiguredEarring | undefined = selectedEarring ? {
    ...selectedEarring,
    totalStats: calculateEarringStats(selectedEarring)
  } : undefined;

  // Handle earring selection
  const handleEarringSelect = (earringId: string) => {
    setSelectedEarringId(earringId);
    // Reset varying stats, slot, and chaos upgrade level when selecting a new earring
    setVaryingStats([]);
    setSelectedSlot(undefined);
    setChaosUpgradeLevel(0);
  };

  // Handle adding a varying stat
  const handleAddVaryingStat = (statId: string, value: number) => {
    if (!selectedEarring || !selectedEarring.isUnique) return;
    
    const maxStats = selectedEarring.maxVaryingStats || 0;
    if (varyingStats.length >= maxStats) return;

    const newVaryingStat: SelectedVaryingStat = { statId: statId as keyof typeof selectedEarring.baseStats, value };
    setVaryingStats([...varyingStats, newVaryingStat]);
  };

  // Handle removing a varying stat
  const handleRemoveVaryingStat = (index: number) => {
    const newVaryingStats = varyingStats.filter((_, i) => i !== index);
    setVaryingStats(newVaryingStats);
  };

  // Handle changing a varying stat value
  const handleChangeVaryingStat = (index: number, newValue: number) => {
    const newVaryingStats = [...varyingStats];
    newVaryingStats[index].value = newValue;
    setVaryingStats(newVaryingStats);
  };

  // Handle slot selection
  const handleSlotSelect = (statId: string, value: number) => {
    if (!selectedEarring || !selectedEarring.hasSlot) return;
    
    const newSlot: SelectedSlot = { statId: statId as keyof typeof selectedEarring.baseStats, value };
    setSelectedSlot(newSlot);
  };

  // Handle slot removal
  const handleSlotRemove = () => {
    setSelectedSlot(undefined);
  };

  // Handle apply button click
  const handleApply = () => {
    if (selectedEarring) {
      const totalStats = calculateEarringStats(selectedEarring);
      const configuredEarring: ConfiguredEarring = {
        ...selectedEarring,
        totalStats
      };
      onSelectEarring(configuredEarring);
      onClose();
    }
  };

  // Handle remove button click
  const handleRemove = () => {
    onRemoveEarring();
    onClose();
  };

  if (!isOpen) return null;

  // Left content - Configuration controls
  const leftContent = (
    <>
            {/* Only show earring selection if there is no earring selected */}
            {!selectedEarring && (
              <ItemSelectionGrid
                items={allEarrings}
                selectedItemId={selectedEarringId}
                onItemSelect={(earring) => handleEarringSelect(earring.id)}
                title="Select Earring"
                showSearch={false}
                gridCols="grid-cols-2 sm:grid-cols-3"
                itemSize="w-12 h-12"
              />
            )}

            {/* Earring Info */}
            {selectedEarring && (
              <div className="flex items-center mb-6 bg-theme-darker p-4 rounded-md border border-border-dark">
                <img 
                  src={selectedEarring.imagePath} 
                  alt={selectedEarring.name}
                  className="w-16 h-16 object-contain mr-4"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <div>
                  <h3 className="text-lg font-semibold text-game-gold">{selectedEarring.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">Grade: {selectedEarring.grade.charAt(0).toUpperCase() + selectedEarring.grade.slice(1)}</p>

                </div>
              </div>
            )}

            {/* Slot Configuration for Unique Earrings */}
            {selectedEarring && selectedEarring.hasSlot && selectedEarring.slotOptions && (
              <SlotConfiguration
                selectedSlot={selectedSlot}
                slotOptions={selectedEarring.slotOptions}
                maxSlots={selectedEarring.maxSlots || 0}
                onSlotSelect={handleSlotSelect}
                onSlotRemove={handleSlotRemove}
              />
            )}

            {/* Varying Stats Configuration for Unique Earrings */}
            {selectedEarring && selectedEarring.isUnique && selectedEarring.varyingStatOptions && (
              <VaryingStatsConfiguration
                varyingStats={varyingStats}
                varyingStatOptions={selectedEarring.varyingStatOptions}
                maxVaryingStats={selectedEarring.maxVaryingStats || 0}
                onAddVaryingStat={handleAddVaryingStat}
                onRemoveVaryingStat={handleRemoveVaryingStat}
                onChangeVaryingStat={handleChangeVaryingStat}
              />
            )}

            {/* Chaos Upgrade Configuration */}
            {selectedEarring && selectedEarring.hasChaosUpgrade && (
              <div className="mb-6 bg-theme-darker p-5 rounded-md border border-border-dark">
                <h3 className="text-md font-semibold text-orange-500 mb-3">Chaos Upgrade</h3>
                
                <UpgradeSlider
                  label="Chaos"
                  value={chaosUpgradeLevel}
                  maxValue={15}
                  onChange={setChaosUpgradeLevel}
                />
              </div>
            )}
    </>
  );

  // Right content - Tooltip preview
  const rightContent = (
    <>
      {configuredEarringForTooltip && (
        <div className="bg-theme-darker p-5 rounded-md border border-border-dark">
          <h3 className="text-md font-semibold text-game-gold mb-3">Stats Preview</h3>
          <EarringTooltip earring={configuredEarringForTooltip} />
        </div>
      )}
    </>
  );

  return (
    <UpgradeModalLayout
      isOpen={isOpen}
      title={selectedEarring ? `Configure ${selectedEarring.name}` : 'Configure Earring'}
      onClose={onClose}
      onApply={handleApply}
      onRemove={currentEarring ? handleRemove : undefined}
      removeButtonText="Remove Earring"
      isApplyDisabled={!selectedEarring}
      leftContent={leftContent}
      rightContent={rightContent}
    />
  );
};

export default EarringUpgradeModal;