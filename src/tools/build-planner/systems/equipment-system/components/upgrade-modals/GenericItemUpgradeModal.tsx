// This file defines the GenericItemUpgradeModal component, which allows users to select and configure items.

import React, { useState, useEffect } from 'react';
import { getStatInfo, formatStatValue } from '@/tools/build-planner/data/stats-config';
import UpgradeSlider from './shared/UpgradeSlider';
import UpgradeModalLayout from './shared/UpgradeModalLayout';
import ItemSelectionGrid from '../ItemSelectionGrid';

export interface BaseItem {
  id: string;
  name: string;
  imagePath: string;
  grade: string;
  maxBaseLevel: number;
  currentLevel?: number;
  baseStats: any; // Add baseStats to match BaseEquipmentItem
}

export interface ConfiguredItem extends BaseItem {
  totalStats: Record<string, number>;
}

interface GenericItemUpgradeModalProps {
  itemType: string;
  getAllItems: () => BaseItem[];
  createConfiguredItem: (itemId: string, level: number) => ConfiguredItem | undefined;
  calculateItemStats: (item: BaseItem, level: number) => Record<string, number>;
  onSelectItem: (item: ConfiguredItem) => void;
  onRemoveItem: () => void;
  currentSelectedItem?: BaseItem;
  isOpen: boolean;
  onClose: () => void;
  tooltipComponent?: React.ComponentType<{ item: any }>;
}

const GenericItemUpgradeModal: React.FC<GenericItemUpgradeModalProps> = ({
  itemType,
  getAllItems,
  createConfiguredItem,
  calculateItemStats,
  onSelectItem,
  onRemoveItem,
  currentSelectedItem,
  isOpen,
  onClose,
  tooltipComponent: TooltipComponent,
}) => {
  const [selectedItemId, setSelectedItemId] = useState<string>(currentSelectedItem?.id || '');
  const [upgradeLevel, setUpgradeLevel] = useState<number>(currentSelectedItem?.currentLevel || 0);
  const allItems = getAllItems();

  // Update state when currentSelectedItem changes
  useEffect(() => {
    if (currentSelectedItem) {
      setSelectedItemId(currentSelectedItem.id);
      setUpgradeLevel(currentSelectedItem.currentLevel || 0);
    }
  }, [currentSelectedItem]);

  // Find the currently selected item - prioritize currentSelectedItem from props
  const selectedItem = currentSelectedItem || (selectedItemId ? allItems.find(item => item.id === selectedItemId) : undefined);

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

  // Handle item selection
  const handleItemSelect = (itemId: string) => {
    setSelectedItemId(itemId);
    setUpgradeLevel(0); // Reset upgrade level when changing items
  };

  // Handle level change
  const handleLevelChange = (level: number) => {
    setUpgradeLevel(level);
  };

  // Handle apply button click
  const handleApply = () => {
    if (selectedItem) {
      const configuredItem = createConfiguredItem(selectedItem.id, upgradeLevel);
      if (configuredItem) {
        onSelectItem(configuredItem as ConfiguredItem);
        onClose();
      }
    }
  };

  // Handle remove button click
  const handleRemove = () => {
    onRemoveItem();
    onClose();
  };

  if (!isOpen) return null;

  // Left content - Configuration controls
  const leftContent = (
    <>
            {/* Only show item selection if there is no item selected */}
            {!selectedItem && (
              <ItemSelectionGrid
                items={allItems}
                selectedItemId={selectedItemId}
                onItemSelect={(item) => handleItemSelect(item.id)}
                title={`Select ${itemType}`}
                showSearch={false}
                gridCols="grid-cols-2 sm:grid-cols-3"
                itemSize="w-12 h-12"
              />
            )}
            
            {/* Upgrade Level */}
            {selectedItem && (
              <div className="mb-6 bg-theme-darker p-5 rounded-md border border-border-dark">
                <h3 className="text-md font-semibold text-game-gold mb-3">Upgrade Level</h3>
                <UpgradeSlider
                  label="Level"
                  value={upgradeLevel}
                  maxValue={selectedItem.maxBaseLevel}
                  onChange={handleLevelChange}
                />
              </div>
            )}

            {/* Item Info */}
            {selectedItem && (
              <div className="flex items-center mb-6 bg-theme-darker p-4 rounded-md border border-border-dark">
                <img
                  src={selectedItem.imagePath}
                  alt={selectedItem.name}
                  className="w-16 h-16 object-contain mr-4"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
                <div>
                  <h3 className="text-lg font-semibold text-game-gold">{selectedItem.name}</h3>
                  <p className="text-xs text-gray-400 mt-1">Grade: {selectedItem.grade.charAt(0).toUpperCase() + selectedItem.grade.slice(1)}</p>
                </div>
              </div>
            )}
    </>
  );

  // Right content - Tooltip preview
  const rightContent = (
    <>
      {selectedItem && TooltipComponent && (
        <div className="bg-theme-darker p-5 rounded-md border border-border-dark">
          <h3 className="text-md font-semibold text-game-gold mb-3">Stats Preview</h3>
          <TooltipComponent 
            item={{
              ...selectedItem,
              currentLevel: upgradeLevel,
              totalStats: calculateItemStats(selectedItem, upgradeLevel)
            }}
          />
        </div>
      )}
    </>
  );

  return (
    <UpgradeModalLayout
      isOpen={isOpen}
      title={selectedItem ? `Configure ${selectedItem.name}` : `Configure ${itemType}`}
      onClose={onClose}
      onApply={handleApply}
      onRemove={currentSelectedItem ? handleRemove : undefined}
      removeButtonText="Remove"
      isApplyDisabled={!selectedItem}
      leftContent={leftContent}
      rightContent={rightContent}

      zIndex="z-[60]"
    />
  );
};

export default GenericItemUpgradeModal;
