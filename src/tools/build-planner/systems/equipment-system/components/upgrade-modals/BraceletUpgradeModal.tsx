'use client';

/**
 * BraceletUpgradeModal Component
 * Modal for configuring bracelet items
 * Follows the same pattern as EarringUpgradeModal
 */

import React, { useState, useEffect } from 'react';
import { Bracelet, BraceletStats, getAllBracelets, createConfiguredBracelet, calculateBraceletStats, SelectedVaryingStat, SelectedSlot, createBraceletWithVaryingStats } from '../../data/bracelets/bracelets-data';
import { getBraceletChaosUpgradeStats, getMaxBraceletChaosLevel, isValidBraceletChaosLevel } from '../../data/bracelets/bracelets-chaos-upgrade';
import { getStatInfo, formatStatValue } from '@/tools/build-planner/data/stats-config';
import SlotConfiguration from './shared/SlotConfiguration';
import VaryingStatsConfiguration from './shared/VaryingStatsConfiguration';
import UpgradeSlider from './shared/UpgradeSlider';
import BraceletTooltip from '../tooltips/BraceletTooltip';
import UpgradeModalLayout from './shared/UpgradeModalLayout';
import ItemSelectionGrid from '../ItemSelectionGrid';

export interface ConfiguredBracelet extends Bracelet {
  totalStats: BraceletStats;
}

interface BraceletUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBracelet: (bracelet: ConfiguredBracelet) => void;
  onRemoveBracelet: () => void;
  currentBracelet?: Bracelet;
}

const BraceletUpgradeModal: React.FC<BraceletUpgradeModalProps> = ({ 
  isOpen, 
  onClose, 
  onSelectBracelet, 
  onRemoveBracelet, 
  currentBracelet 
}) => {
  const [selectedBraceletId, setSelectedBraceletId] = useState<string>(currentBracelet?.id || '');
  const [varyingStats, setVaryingStats] = useState<SelectedVaryingStat[]>(currentBracelet?.selectedVaryingStats || []);
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | undefined>(currentBracelet?.selectedSlot);
  const [chaosUpgradeLevel, setChaosUpgradeLevel] = useState<number>(currentBracelet?.chaosUpgradeLevel || 0);
  const allBracelets = getAllBracelets();

  // Update state when currentBracelet changes
  useEffect(() => {
    if (currentBracelet) {
      setSelectedBraceletId(currentBracelet.id);
      setVaryingStats(currentBracelet.selectedVaryingStats || []);
      setSelectedSlot(currentBracelet.selectedSlot);
      setChaosUpgradeLevel(currentBracelet.chaosUpgradeLevel || 0);
    }
  }, [currentBracelet]);

  // Find the currently selected bracelet - prioritize currentBracelet from props
  const baseBracelet = currentBracelet || (selectedBraceletId ? allBracelets.find(bracelet => bracelet.id === selectedBraceletId) : undefined);
  const selectedBracelet = baseBracelet ? {
    ...createBraceletWithVaryingStats(baseBracelet, varyingStats, selectedSlot),
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

  // Create configured bracelet for tooltip
  const configuredBraceletForTooltip: ConfiguredBracelet | undefined = selectedBracelet ? {
    ...selectedBracelet,
    totalStats: calculateBraceletStats(selectedBracelet)
  } : undefined;

  // Handle bracelet selection
  const handleBraceletSelect = (braceletId: string) => {
    setSelectedBraceletId(braceletId);
    // Reset varying stats, slot, and chaos upgrade level when selecting a new bracelet
    setVaryingStats([]);
    setSelectedSlot(undefined);
    setChaosUpgradeLevel(0);
  };

  // Handle slot selection
  const handleSlotSelect = (statId: string, value: number) => {
    if (!selectedBracelet || !selectedBracelet.hasSlot) return;
    
    const newSlot: SelectedSlot = { statId: statId as keyof typeof selectedBracelet.baseStats, value };
    setSelectedSlot(newSlot);
  };

  // Handle slot removal
  const handleSlotRemove = () => {
    setSelectedSlot(undefined);
  };

  // Handle adding a varying stat
  const handleAddVaryingStat = (statId: string, value: number) => {
    if (!selectedBracelet || !selectedBracelet.isUnique) return;
    
    const maxStats = selectedBracelet.maxVaryingStats || 0;
    if (varyingStats.length >= maxStats) return;

    const newVaryingStat: SelectedVaryingStat = { statId: statId as keyof typeof selectedBracelet.baseStats, value };
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

  // Handle apply button click
  const handleApply = () => {
    if (selectedBracelet) {
      const totalStats = calculateBraceletStats(selectedBracelet);
      const configuredBracelet: ConfiguredBracelet = {
        ...selectedBracelet,
        totalStats
      };
      onSelectBracelet(configuredBracelet);
      onClose();
    }
  };

  // Handle remove button click
  const handleRemove = () => {
    onRemoveBracelet();
    onClose();
  };

  if (!isOpen) return null;

  // Left content - Configuration controls
  const leftContent = (
    <>
            {/* Only show bracelet selection if there is no bracelet selected */}
            {!selectedBracelet && (
              <ItemSelectionGrid
                items={allBracelets}
                selectedItemId={selectedBraceletId}
                onItemSelect={(bracelet) => handleBraceletSelect(bracelet.id)}
                title="Select Bracelet"
                showSearch={false}
                gridCols="grid-cols-2 sm:grid-cols-3"
                itemSize="w-12 h-12"
              />
            )}

            {/* Bracelet Info */}
            {selectedBracelet && (
              <div className="flex items-center mb-6 bg-theme-darker p-4 rounded-md border border-border-dark">
                <img 
                  src={selectedBracelet.imagePath} 
                  alt={selectedBracelet.name}
                  className="w-16 h-16 object-contain mr-4"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <div>
                  <h3 className="text-lg font-semibold text-game-gold">{selectedBracelet.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">Grade: {selectedBracelet.grade.charAt(0).toUpperCase() + selectedBracelet.grade.slice(1)}</p>

                </div>
              </div>
            )}

            {/* Slot Configuration for Unique Bracelets */}
            {selectedBracelet && selectedBracelet.hasSlot && selectedBracelet.slotOptions && (
              <SlotConfiguration
                selectedSlot={selectedSlot}
                slotOptions={selectedBracelet.slotOptions}
                maxSlots={selectedBracelet.maxSlots || 0}
                onSlotSelect={handleSlotSelect}
                onSlotRemove={handleSlotRemove}
              />
            )}

            {/* Varying Stats Configuration for Unique Bracelets */}
            {selectedBracelet && selectedBracelet.isUnique && selectedBracelet.varyingStatOptions && (
              <VaryingStatsConfiguration
                varyingStats={varyingStats}
                varyingStatOptions={selectedBracelet.varyingStatOptions}
                maxVaryingStats={selectedBracelet.maxVaryingStats || 0}
                onAddVaryingStat={handleAddVaryingStat}
                onRemoveVaryingStat={handleRemoveVaryingStat}
                onChangeVaryingStat={handleChangeVaryingStat}
              />
            )}

            {/* Chaos Upgrade Configuration */}
            {selectedBracelet && selectedBracelet.hasChaosUpgrade && (
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
      {configuredBraceletForTooltip && (
        <div className="bg-theme-darker p-5 rounded-md border border-border-dark">
          <h3 className="text-md font-semibold text-game-gold mb-3">Stats Preview</h3>
          <BraceletTooltip bracelet={configuredBraceletForTooltip} />
        </div>
      )}
    </>
  );

  return (
    <UpgradeModalLayout
      isOpen={isOpen}
      title={selectedBracelet ? `Configure ${selectedBracelet.name}` : 'Configure Bracelet'}
      onClose={onClose}
      onApply={handleApply}
      onRemove={currentBracelet ? handleRemove : undefined}
      removeButtonText="Remove Bracelet"
      isApplyDisabled={!selectedBracelet}
      leftContent={leftContent}
      rightContent={rightContent}
    />
  );
};

export default BraceletUpgradeModal;