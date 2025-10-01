'use client';

/**
 * BroochUpgradeModal Component
 * Modal for configuring brooch items
 * Follows the same pattern as BraceletUpgradeModal
 */

import React, { useState, useEffect } from 'react';
import { Brooch, BroochStats, getAllBrooches, createConfiguredBrooch, calculateBroochStats, SelectedVaryingStat, SelectedSlot, createBroochWithVaryingStats } from '../../data/brooches/brooches-data';
import { getStatInfo, formatStatValue } from '@/tools/build-planner/data/stats-config';
import { StatIcon } from '@/tools/build-planner/components/StatIcon';
import SlotConfiguration from './shared/SlotConfiguration';
import VaryingStatsConfiguration from './shared/VaryingStatsConfiguration';
import BroochTooltip from '../tooltips/BroochTooltip';
import UpgradeModalLayout from './shared/UpgradeModalLayout';
import ItemSelectionGrid from '../ItemSelectionGrid';

export interface ConfiguredBrooch extends Brooch {
  totalStats: BroochStats;
}

interface BroochUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectBrooch: (brooch: ConfiguredBrooch) => void;
  onRemoveBrooch: () => void;
  currentBrooch?: Brooch;
}

const BroochUpgradeModal: React.FC<BroochUpgradeModalProps> = ({ 
  isOpen, 
  onClose, 
  onSelectBrooch, 
  onRemoveBrooch, 
  currentBrooch 
}) => {
  const [selectedBroochId, setSelectedBroochId] = useState<string>(currentBrooch?.id || '');
  const [varyingStats, setVaryingStats] = useState<SelectedVaryingStat[]>(currentBrooch?.selectedVaryingStats || []);
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | undefined>(currentBrooch?.selectedSlot);

  const allBrooches = getAllBrooches();

  // Update state when currentBrooch changes
  useEffect(() => {
    if (currentBrooch) {
      setSelectedBroochId(currentBrooch.id);
      setVaryingStats(currentBrooch.selectedVaryingStats || []);
      setSelectedSlot(currentBrooch.selectedSlot);
    }
  }, [currentBrooch]);

  // Find the currently selected brooch - prioritize currentBrooch from props
  const baseBrooch = currentBrooch || (selectedBroochId ? allBrooches.find(brooch => brooch.id === selectedBroochId) : undefined);
  const selectedBrooch = baseBrooch ? {
    ...createBroochWithVaryingStats(baseBrooch, varyingStats, selectedSlot)
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

  // Create configured brooch for tooltip
  const configuredBroochForTooltip: ConfiguredBrooch | undefined = selectedBrooch ? {
    ...selectedBrooch,
    totalStats: calculateBroochStats(selectedBrooch)
  } : undefined;

  if (!isOpen) return null;

  // Handle brooch selection
  const handleBroochSelect = (broochId: string) => {
    setSelectedBroochId(broochId);
    // Reset varying stats and slot when selecting a new brooch
    setVaryingStats([]);
    setSelectedSlot(undefined);
  };

  // Handle slot selection
  const handleSlotSelect = (statId: string, value: number) => {
    if (!selectedBrooch || !selectedBrooch.hasSlot) return;
    
    const newSlot: SelectedSlot = { statId: statId as keyof typeof selectedBrooch.baseStats, value };
    setSelectedSlot(newSlot);
  };

  // Handle slot removal
  const handleSlotRemove = () => {
    setSelectedSlot(undefined);
  };

  // Handle adding a varying stat
  const handleAddVaryingStat = (statId: string, value: number) => {
    if (!selectedBrooch || !selectedBrooch.isUnique) return;
    
    const maxStats = selectedBrooch.maxVaryingStats || 0;
    if (varyingStats.length >= maxStats) return;

    const newVaryingStat: SelectedVaryingStat = { statId: statId as keyof typeof selectedBrooch.baseStats, value };
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
    if (selectedBrooch) {
      const totalStats = calculateBroochStats(selectedBrooch);
      const configuredBrooch: ConfiguredBrooch = {
        ...selectedBrooch,
        totalStats
      };
      onSelectBrooch(configuredBrooch);
      onClose();
    }
  };

  // Handle remove button click
  const handleRemove = () => {
    onRemoveBrooch();
    onClose();
  };

  // Left content - Configuration controls
  const leftContent = (
    <>
            {/* Only show brooch selection if there is no brooch selected */}
            {!selectedBrooch && (
              <ItemSelectionGrid
                items={allBrooches}
                selectedItemId={selectedBroochId}
                onItemSelect={(brooch) => handleBroochSelect(brooch.id)}
                title="Select Brooch"
                showSearch={false}
                gridCols="grid-cols-2 sm:grid-cols-3"
                itemSize="w-12 h-12"
              />
            )}

            {/* Brooch Info */}
            {selectedBrooch && (
              <div className="flex items-center mb-6 bg-theme-darker p-4 rounded-md border border-border-dark">
                <img 
                  src={selectedBrooch.imagePath} 
                  alt={selectedBrooch.name}
                  className="w-16 h-16 object-contain mr-4"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <div>
                  <h3 className="text-lg font-semibold text-game-gold">{selectedBrooch.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">Grade: {selectedBrooch.grade.charAt(0).toUpperCase() + selectedBrooch.grade.slice(1)}</p>

                </div>
              </div>
            )}

            {/* Slot Configuration for Unique Brooches */}
            {selectedBrooch && selectedBrooch.hasSlot && selectedBrooch.slotOptions && (
              <SlotConfiguration
                selectedSlot={selectedSlot}
                slotOptions={selectedBrooch.slotOptions}
                maxSlots={selectedBrooch.maxSlots || 0}
                onSlotSelect={handleSlotSelect}
                onSlotRemove={handleSlotRemove}
              />
            )}

            {/* Varying Stats Configuration for Unique Brooches */}
            {selectedBrooch && selectedBrooch.isUnique && selectedBrooch.varyingStatOptions && (
              <VaryingStatsConfiguration
                varyingStats={varyingStats}
                varyingStatOptions={selectedBrooch.varyingStatOptions}
                maxVaryingStats={selectedBrooch.maxVaryingStats || 0}
                onAddVaryingStat={handleAddVaryingStat}
                onRemoveVaryingStat={handleRemoveVaryingStat}
                onChangeVaryingStat={handleChangeVaryingStat}
              />
            )}
    </>
  );

  // Right content - Tooltip preview
  const rightContent = (
    <>
      {configuredBroochForTooltip && (
        <div className="bg-theme-darker p-5 rounded-md border border-border-dark">
          <h3 className="text-md font-semibold text-game-gold mb-3">Stats Preview</h3>
          <BroochTooltip 
            brooch={configuredBroochForTooltip}
            formatStatName={formatStatName}
            formatStatValueWithSign={formatStatValueWithSign}
          />
        </div>
      )}
    </>
  );

  return (
    <UpgradeModalLayout
      isOpen={isOpen}
      title={selectedBrooch ? `Configure ${selectedBrooch.name}` : 'Configure Brooch'}
      onClose={onClose}
      onApply={handleApply}
      onRemove={handleRemove}
      removeButtonText="Remove Brooch"
      applyButtonText="Apply"
      isApplyDisabled={!selectedBrooch}
      leftContent={leftContent}
      rightContent={rightContent}
    />
  );
};

export default BroochUpgradeModal;