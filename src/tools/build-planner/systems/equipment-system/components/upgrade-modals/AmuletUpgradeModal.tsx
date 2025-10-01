'use client';

/**
 * AmuletUpgradeModal Component
 * Modal for configuring amulet items
 * Follows the same pattern as EarringUpgradeModal
 */

import React, { useState, useEffect } from 'react';
import { Amulet, AmuletStats, getAllAmulets, createConfiguredAmulet, calculateAmuletStats, SelectedVaryingStat, SelectedSlot, createAmuletWithVaryingStats } from '../../data/amulets/amulets-data';
import { getAmuletChaosUpgradeStats, getMaxAmuletChaosLevel, isValidAmuletChaosLevel } from '../../data/amulets/amulets-chaos-upgrade';
import { getStatInfo, formatStatValue } from '@/tools/build-planner/data/stats-config';
import SlotConfiguration from './shared/SlotConfiguration';
import VaryingStatsConfiguration from './shared/VaryingStatsConfiguration';
import UpgradeSlider from './shared/UpgradeSlider';
import AmuletTooltip from '../tooltips/AmuletTooltip';
import UpgradeModalLayout from './shared/UpgradeModalLayout';
import ItemSelectionGrid from '../ItemSelectionGrid';

export interface ConfiguredAmulet extends Amulet {
  totalStats: AmuletStats;
}

interface AmuletUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectAmulet: (amulet: ConfiguredAmulet) => void;
  onRemoveAmulet: () => void;
  currentAmulet?: Amulet;
}

const AmuletUpgradeModal: React.FC<AmuletUpgradeModalProps> = ({ 
  isOpen, 
  onClose, 
  onSelectAmulet, 
  onRemoveAmulet, 
  currentAmulet 
}) => {
  const [selectedAmuletId, setSelectedAmuletId] = useState<string>(currentAmulet?.id || '');
  const [varyingStats, setVaryingStats] = useState<SelectedVaryingStat[]>(currentAmulet?.selectedVaryingStats || []);
  const [selectedSlot, setSelectedSlot] = useState<SelectedSlot | undefined>(currentAmulet?.selectedSlot);
  const [chaosUpgradeLevel, setChaosUpgradeLevel] = useState<number>(currentAmulet?.chaosUpgradeLevel || 0);
  const allAmulets = getAllAmulets();

  // Update state when currentAmulet changes
  useEffect(() => {
    if (currentAmulet) {
      setSelectedAmuletId(currentAmulet.id);
      setVaryingStats(currentAmulet.selectedVaryingStats || []);
      setSelectedSlot(currentAmulet.selectedSlot);
      setChaosUpgradeLevel(currentAmulet.chaosUpgradeLevel || 0);
    }
  }, [currentAmulet]);

  // Find the currently selected amulet - prioritize currentAmulet from props
  const baseAmulet = currentAmulet || (selectedAmuletId ? allAmulets.find(amulet => amulet.id === selectedAmuletId) : undefined);
  const selectedAmulet = baseAmulet ? {
    ...createAmuletWithVaryingStats(baseAmulet, varyingStats, selectedSlot),
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

  // Create configured amulet for tooltip
  const configuredAmuletForTooltip: ConfiguredAmulet | undefined = selectedAmulet ? {
    ...selectedAmulet,
    totalStats: calculateAmuletStats(selectedAmulet)
  } : undefined;

  // Handle amulet selection
  const handleAmuletSelect = (amuletId: string) => {
    setSelectedAmuletId(amuletId);
    // Reset varying stats, slot, and chaos upgrade level when selecting a new amulet
    setVaryingStats([]);
    setSelectedSlot(undefined);
    setChaosUpgradeLevel(0);
  };

  // Handle slot selection
  const handleSlotSelect = (statId: string, value: number) => {
    if (!selectedAmulet || !selectedAmulet.hasSlot) return;
    
    const newSlot: SelectedSlot = { statId: statId as keyof typeof selectedAmulet.baseStats, value };
    setSelectedSlot(newSlot);
  };

  // Handle slot removal
  const handleSlotRemove = () => {
    setSelectedSlot(undefined);
  };

  // Handle adding a varying stat
  const handleAddVaryingStat = (statId: string, value: number) => {
    if (!selectedAmulet || !selectedAmulet.isUnique) return;
    
    const maxStats = selectedAmulet.maxVaryingStats || 0;
    if (varyingStats.length >= maxStats) return;

    const newVaryingStat: SelectedVaryingStat = { statId: statId as keyof typeof selectedAmulet.baseStats, value };
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
    if (selectedAmulet) {
      const totalStats = calculateAmuletStats(selectedAmulet);
      const configuredAmulet: ConfiguredAmulet = {
        ...selectedAmulet,
        totalStats
      };
      onSelectAmulet(configuredAmulet);
      onClose();
    }
  };

  // Handle remove button click
  const handleRemove = () => {
    onRemoveAmulet();
    onClose();
  };

  if (!isOpen) return null;

  // Left content - Configuration controls
  const leftContent = (
    <>
            {/* Only show amulet selection if there is no amulet selected */}
            {!selectedAmulet && (
              <ItemSelectionGrid
                items={allAmulets}
                selectedItemId={selectedAmuletId}
                onItemSelect={(amulet) => handleAmuletSelect(amulet.id)}
                title="Select Amulet"
                showSearch={false}
                gridCols="grid-cols-2 sm:grid-cols-3"
                itemSize="w-12 h-12"
              />
            )}

            {/* Amulet Info */}
            {selectedAmulet && (
              <div className="flex items-center mb-6 bg-theme-darker p-4 rounded-md border border-border-dark">
                <img 
                  src={selectedAmulet.imagePath} 
                  alt={selectedAmulet.name}
                  className="w-16 h-16 object-contain mr-4"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <div>
                  <h3 className="text-lg font-semibold text-game-gold">{selectedAmulet.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">Grade: {selectedAmulet.grade.charAt(0).toUpperCase() + selectedAmulet.grade.slice(1)}</p>

                </div>
              </div>
            )}

            {/* Slot Configuration for Unique Amulets */}
            {selectedAmulet && selectedAmulet.hasSlot && selectedAmulet.slotOptions && (
              <SlotConfiguration
                selectedSlot={selectedSlot}
                slotOptions={selectedAmulet.slotOptions}
                maxSlots={selectedAmulet.maxSlots || 0}
                onSlotSelect={handleSlotSelect}
                onSlotRemove={handleSlotRemove}
              />
            )}

            {/* Varying Stats Configuration for Unique Amulets */}
            {selectedAmulet && selectedAmulet.isUnique && selectedAmulet.varyingStatOptions && (
              <VaryingStatsConfiguration
                varyingStats={varyingStats}
                varyingStatOptions={selectedAmulet.varyingStatOptions}
                maxVaryingStats={selectedAmulet.maxVaryingStats || 0}
                onAddVaryingStat={handleAddVaryingStat}
                onRemoveVaryingStat={handleRemoveVaryingStat}
                onChangeVaryingStat={handleChangeVaryingStat}
              />
            )}

            {/* Chaos Upgrade Configuration */}
            {selectedAmulet && selectedAmulet.hasChaosUpgrade && (
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
      {configuredAmuletForTooltip && (
        <div className="bg-theme-darker p-5 rounded-md border border-border-dark">
          <h3 className="text-md font-semibold text-game-gold mb-3">Stats Preview</h3>
          <AmuletTooltip amulet={configuredAmuletForTooltip} />
        </div>
      )}
    </>
  );

  return (
    <UpgradeModalLayout
      isOpen={isOpen}
      title={selectedAmulet ? `Configure ${selectedAmulet.name}` : 'Configure Amulet'}
      onClose={onClose}
      onApply={handleApply}
      onRemove={currentAmulet ? handleRemove : undefined}
      removeButtonText="Remove Amulet"
      isApplyDisabled={!selectedAmulet}
      leftContent={leftContent}
      rightContent={rightContent}
    />
  );
};

export default AmuletUpgradeModal;