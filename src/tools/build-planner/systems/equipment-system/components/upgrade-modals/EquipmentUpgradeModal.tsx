/**
 * Unified Equipment Upgrade Modal
 * Handles weapon, armor and vehicle upgrade configurations in a single component
 * Provides a consistent upgrade experience across all equipment types
 */

import React, { useState, useEffect } from 'react';
import { 
  BaseEquipment, 
  Equipment, 
  ConfiguredEquipment,
  ConfiguredWeapon, 
  ConfiguredArmor, 
  ConfiguredVehicle,
  isWeapon,
  isArmor,
  isVehicle,
  supportsDivineUpgrades,
  supportsMasterEpicOptions
} from '../../types/base-equipment';
import { ArmorStatType, ArmorSlotOption } from '../../data/armor/armor-types';
import { getStatInfo, formatStatValue } from '@/tools/build-planner/data/stats-config';
import { StatIcon } from '@/tools/build-planner/components/StatIcon';

// Weapon-specific imports
import { 
  getUpgradeStatType, 
  getBaseUpgradeStats
} from '../../data/weapons/weapons-data';
import {
  getEpicOptionStatValue,
  getWeaponSlotOptions,
  getWeaponMasterEpicOption
} from '../../data/weapons/epic-options';
import { extremeUpgrades, getExtremeUpgradeStats } from '../../data/weapons/extreme-upgrades';
import { getDivineUpgradeStats } from '../../data/weapons/divine-upgrades';

// Armor-specific imports
import { 
  getArmorBaseUpgradeStats,
  getArmorSlotOptions,
  getAvailableArmorSlotStats,
  calculateArmorTotalStats
} from '../../data/armor/armors-data';
import {
  getArmorEpicOptionStatValue,
  getArmorMasterEpicOption
} from '../../data/armor/armor-epic-options';
import { getArmorExtremeUpgradeStats } from '../../data/armor/armor-extreme-upgrades';
import { getArmorDivineUpgradeStats } from '../../data/armor/armor-divine-upgrades';

// Vehicle-specific imports
import {
  getVehicleEpicOptionStatValue,
  calculateVehicleTotalStats,
  getVehicleSlotOptions
} from '../../data/vehicles/vehicles-data';
import { getVehicleExtremeUpgradeStats } from '../../data/vehicles/vehicle-extreme-upgrades';
import { getVehicleDivineUpgradeStats } from '../../data/vehicles/vehicle-divine-upgrades';

// Tooltip import
import UnifiedEquipmentTooltip from '../tooltips/UnifiedEquipmentTooltip';
import UpgradeModalLayout from './shared/UpgradeModalLayout';

// Strategy pattern import
import { calculateEquipmentStats, getEquipmentStrategy } from '../../strategies/equipment-strategy';

// Color utilities
import { getEpicOptionColors } from '../../utils/epic-option-colors';

// Shared components
import UpgradeSlider from './shared/UpgradeSlider';
import CascadingEpicDropdown from './shared/CascadingEpicDropdown';
import { 
  transformNormalEpicOptions, 
  transformMasterEpicOptions, 
  parseSelectedOption, 
  createOptionId 
} from './shared/epic-options-transformer';

// Union types for equipment (now using unified types)
type EquipmentUnion = Equipment;
type ConfiguredEquipmentUnion = ConfiguredEquipment;

// Helper function to get level display name
const getLevelDisplayName = (level: number): string => {
  return `Level ${level}`;
};

interface EquipmentUpgradeModalProps {
  isOpen: boolean;
  onClose: () => void;
  equipment: Equipment;
  configuredEquipment?: ConfiguredEquipment;
  onSaveConfiguration: (configuredEquipment: ConfiguredEquipment) => void;
}

interface SlotConfiguration {
  isActive: boolean;
  selectedStat: string | null;
}

// Type guards are now imported from base-equipment.ts
// hasDivineUpgrades is now supportsDivineUpgrades and imported

const EquipmentUpgradeModal: React.FC<EquipmentUpgradeModalProps> = ({ 
  isOpen, 
  onClose, 
  equipment,
  configuredEquipment,
  onSaveConfiguration 
}) => {
  // Helper function to check if configuredEquipment matches the selected equipment
  const isMatchingConfiguration = () => {
    return configuredEquipment && equipment && configuredEquipment.id === equipment.id;
  };

  // State for upgrade levels - only use configured values if they match the selected equipment
  const [baseUpgradeLevel, setBaseUpgradeLevel] = useState(
    isMatchingConfiguration() ? configuredEquipment!.baseUpgradeLevel || 0 : 0
  );
  const [extremeUpgradeLevel, setExtremeUpgradeLevel] = useState(
    isMatchingConfiguration() ? configuredEquipment!.extremeUpgradeLevel || 0 : 0
  );
  const [divineUpgradeLevel, setDivineUpgradeLevel] = useState(
    isMatchingConfiguration() ? configuredEquipment!.divineUpgradeLevel || 0 : 0
  );
  // Unified epic option state - stores the selected option ID (e.g., "criticalDamage_6" or "hp_def_2")
  const [selectedEpicOption, setSelectedEpicOption] = useState<string | null>(() => {
    if (!isMatchingConfiguration()) return null;
    
    const config = configuredEquipment as any;
    
    // Handle master epic options
    if (config?.masterEpicOption) {
      const masterOption = config.masterEpicOption;
      const masterLevel = config.masterEpicOptionLevel || 1;
      return createOptionId(masterOption, masterLevel);
    }
    
    // Handle legacy normal epic options
    if (config?.epicOptionStat && config?.epicOptionLevel) {
      return createOptionId(config.epicOptionStat, config.epicOptionLevel);
    }
    
    return null;
  });
  const [slots, setSlots] = useState<SlotConfiguration[]>(
    isMatchingConfiguration() ? configuredEquipment!.slots || Array(equipment.maxSlots).fill({ isActive: false, selectedStat: null }) : Array(equipment.maxSlots).fill({ isActive: false, selectedStat: null })
  );
  const [isExtended, setIsExtended] = useState<boolean>(
    isMatchingConfiguration() ? configuredEquipment!.isExtended || false : false
  );
  
  // State for calculated total stats
  const [totalStats, setTotalStats] = useState<Record<string, number>>({});
  
  // State for slot selection modal
  const [slotSelectionModal, setSlotSelectionModal] = useState<{
    isOpen: boolean;
    slotIndex: number;
  }>({ isOpen: false, slotIndex: -1 });
  
  // Reset state when equipment changes or when configuration doesn't match
  useEffect(() => {
    if (equipment) {
      if (isMatchingConfiguration()) {
        // Load configuration from matching equipment
        setBaseUpgradeLevel(configuredEquipment!.baseUpgradeLevel || 0);
        setExtremeUpgradeLevel(configuredEquipment!.extremeUpgradeLevel || 0);
        setDivineUpgradeLevel(configuredEquipment!.divineUpgradeLevel || 0);
        
        // Handle master epic options
        const config = configuredEquipment as any;
        if (config?.masterEpicOption) {
          const masterOption = config.masterEpicOption;
          const masterLevel = config.masterEpicOptionLevel || 1;
          setSelectedEpicOption(createOptionId(masterOption, masterLevel));
        } else if (config?.epicOptionStat && config?.epicOptionLevel) {
          setSelectedEpicOption(createOptionId(config.epicOptionStat, config.epicOptionLevel));
        } else {
          setSelectedEpicOption(null);
        }
        
        setSlots(configuredEquipment!.slots || Array(equipment.maxSlots).fill({ isActive: false, selectedStat: null }));
        setIsExtended(configuredEquipment!.isExtended || false);
      } else {
        // Reset to default values for new/different equipment
        setBaseUpgradeLevel(0);
        setExtremeUpgradeLevel(0);
        setDivineUpgradeLevel(0);
        setSelectedEpicOption(null);
        setSlots(Array(equipment.maxSlots).fill({ isActive: false, selectedStat: null }));
        setIsExtended(false);
      }
    }
    calculateTotalStats();
  }, [equipment, configuredEquipment]);
  
  // Reset divine upgrade level if equipment doesn't support divine upgrades
  useEffect(() => {
    if (equipment && !supportsDivineUpgrades(equipment) && divineUpgradeLevel > 0) {
      setDivineUpgradeLevel(0);
    }
  }, [equipment, divineUpgradeLevel]);
  
  // Calculate total stats whenever any upgrade level changes
  useEffect(() => {
    calculateTotalStats();
  }, [baseUpgradeLevel, extremeUpgradeLevel, divineUpgradeLevel, selectedEpicOption, slots, isExtended]);
  
  // Auto-apply slot extender when slots are loaded from configuration
  useEffect(() => {
    const activeSlots = slots.filter(slot => slot.isActive).length;
    if (activeSlots === 3 && !isExtended) {
      setIsExtended(true);
    }
  }, [slots]);
  
  // Calculate total stats based on all upgrades using unified strategy
  const calculateTotalStats = () => {
    if (!equipment) return;
    
    // Parse selected epic option
    const epicOptionData = parseSelectedOption(selectedEpicOption);
    const epicOptionStat = epicOptionData?.stat || null;
    const epicOptionLevel = epicOptionData?.level || 1;
    const epicOptionType = epicOptionData?.type || null;
    const masterEpicOption = epicOptionType === 'master' ? epicOptionStat : null;
    const masterEpicOptionLevel = epicOptionType === 'master' ? epicOptionLevel : 1;
    
    // Use unified calculation strategy
    const calculatedStats = calculateEquipmentStats(
      equipment,
      baseUpgradeLevel,
      extremeUpgradeLevel,
      divineUpgradeLevel,
      epicOptionType === 'normal' ? epicOptionStat : null,
      epicOptionLevel,
      masterEpicOption,
      masterEpicOptionLevel,
      epicOptionType,
      slots,
      isExtended
    );
    
    setTotalStats(calculatedStats);
  };
  
  // Handle slot stat selection
  const handleSlotStatChange = (index: number, stat: string | null) => {
    const newSlots = [...slots];
    newSlots[index] = { 
      ...newSlots[index], 
      selectedStat: stat,
      isActive: stat !== null
    };
    setSlots(newSlots);
    
    // Auto-apply slot extender if 3 slots are selected
    // Since items can only drop with max 2 slots, having 3 slots means slot extender was used
    const activeSlots = newSlots.filter(slot => slot.isActive).length;
    if (activeSlots === 3 && !isExtended) {
      setIsExtended(true);
    }
  };

  // Handle opening slot selection modal
  const handleSlotClick = (index: number) => {
    setSlotSelectionModal({ isOpen: true, slotIndex: index });
  };

  // Handle closing slot selection modal
  const handleSlotSelectionClose = () => {
    setSlotSelectionModal({ isOpen: false, slotIndex: -1 });
  };

  // Handle slot stat selection from modal
  const handleSlotStatSelect = (stat: string | null) => {
    if (slotSelectionModal.slotIndex >= 0) {
      handleSlotStatChange(slotSelectionModal.slotIndex, stat);
    }
    handleSlotSelectionClose();
  };
  
  // Save the configured equipment
  const handleSaveConfiguration = () => {
    if (!equipment) return;
    
    // Parse selected epic option for backward compatibility
    const epicOptionData = parseSelectedOption(selectedEpicOption);
    const epicOptionStat = epicOptionData?.stat || null;
    const epicOptionLevel = epicOptionData?.level || 1;
    const epicOptionType = epicOptionData?.type || null;
    const masterEpicOption = epicOptionType === 'master' ? epicOptionStat : null;
    const masterEpicOptionLevel = epicOptionType === 'master' ? epicOptionLevel : 1;
    
    const configuredEquipment: ConfiguredEquipment = {
      ...equipment,
      baseUpgradeLevel,
      extremeUpgradeLevel,
      divineUpgradeLevel,
      epicOptionStat: epicOptionType === 'normal' ? epicOptionStat : null,
      epicOptionLevel,
      masterEpicOption,
      masterEpicOptionLevel,
      epicOptionType,
      slots,
      isExtended,
      totalStats
    } as ConfiguredEquipment;
    
    onSaveConfiguration(configuredEquipment);
    onClose();
  };
  
  // Get equipment-specific epic option data for cascading dropdown
  const getEpicOptionCategories = () => {
    const normalCategories = transformNormalEpicOptions(equipment);
    const masterCategories = transformMasterEpicOptions(equipment);
    return [...normalCategories, ...masterCategories];
  };

  // Helper functions using cached strategy pattern
  const getEpicOptionStatValueForEquipment = (stat: string, level: number) => {
    if (!equipment) return 0;
    const strategy = getEquipmentStrategy(equipment);
    return strategy.getEpicOptionStatValue(stat, level);
  };

  const getMasterEpicOptionValuesForEquipment = (optionName: string, level: number) => {
    if (!equipment) return {};
    const strategy = getEquipmentStrategy(equipment);
    return strategy.getMasterEpicOptionValues(optionName, level);
  };
  

  const getSlotOptionsForEquipment = () => {
    if (!equipment) return {};
    const strategy = getEquipmentStrategy(equipment);
    return strategy.getSlotOptions(isExtended);
  };

  // Helper functions for tooltip
  const formatStatValueWithSign = (statId: string, value: number | undefined) => {
    if (value === undefined) return '';
    const formattedValue = formatStatValue(statId, value);
    return value >= 0 ? `+${formattedValue}` : `-${Math.abs(value)}${formattedValue.includes('%') ? '%' : ''}`;
  };

  const formatStatName = (stat: string) => {
    const statInfo = getStatInfo(stat);
    return statInfo?.name || stat;
  };
  
  if (!isOpen || !equipment) {
    return null;
  }

  // Left content - Configuration controls
  const leftContent = (
    <>
            {/* Equipment info */}
            <div className="flex items-center mb-6 bg-theme-darker p-4 rounded-md border border-border-dark">
              <img 
                src={equipment.imagePath} 
                alt={equipment.name}
                className="w-16 h-16 object-contain mr-4"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div>
                <h3 className="text-lg font-semibold text-game-gold">{equipment.name}</h3>
                <p className="text-xs text-gray-400 mt-1">Grade: {equipment.grade.charAt(0).toUpperCase() + equipment.grade.slice(1)}</p>
              </div>
            </div>
            
            {/* Upgrades - Compact */}
            <div className="mb-6 bg-theme-darker p-4 rounded-md border border-border-dark">
              <h3 className="text-md font-semibold text-game-gold mb-4">Upgrades</h3>
              
              <div className="space-y-3">
                {/* Base Upgrade */}
                <UpgradeSlider
                  label="Base"
                  value={baseUpgradeLevel}
                  maxValue={20}
                  onChange={setBaseUpgradeLevel}
                />

                {/* Extreme Upgrade - Only show for equipment that supports it */}
                {equipment.maxExtremeLevel > 0 && (
                  <UpgradeSlider
                    label="Extreme"
                    value={extremeUpgradeLevel}
                    maxValue={equipment.maxExtremeLevel}
                    onChange={setExtremeUpgradeLevel}
                  />
                )}

                {/* Divine Upgrade - Only show for equipment that supports it */}
                {supportsDivineUpgrades(equipment) && (
                  <UpgradeSlider
                    label="Divine"
                    value={divineUpgradeLevel}
                    maxValue={15}
                    onChange={setDivineUpgradeLevel}
                  />
                )}
              </div>
            </div>
            
            {/* Epic Options */}
            <div className="mb-6 bg-theme-darker p-5 rounded-md border border-border-dark">
              <h3 className="text-md font-semibold text-game-gold mb-4">Epic Options</h3>
              
              <CascadingEpicDropdown
                categories={getEpicOptionCategories()}
                selectedOption={selectedEpicOption}
                onSelect={setSelectedEpicOption}
                placeholder="Select Epic Option"
                className="w-full"
              />
            </div>

            {/* Slots */}
            <div className="mb-6 bg-theme-darker p-5 rounded-md border border-border-dark">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-md font-semibold text-game-gold">
                  Slots (0-{equipment.maxSlots})
                </h3>
                <div className="flex items-center">
                  <label className="text-sm font-medium text-gray-300 mr-3">
                    Slot Extender
                  </label>
                  {isExtended && (
                    <span className="text-xs text-purple-400 bg-purple-900/30 px-2 py-1 rounded mr-3">
                      ✨ Enhanced
                    </span>
                  )}
                  <label className={`relative inline-flex items-center ${
                    slots.filter(slot => slot.isActive).length === 3 ? 'cursor-not-allowed opacity-75' : 'cursor-pointer'
                  }`}>
                    <input
                      type="checkbox"
                      className="sr-only"
                      checked={isExtended}
                      disabled={slots.filter(slot => slot.isActive).length === 3}
                      onChange={(e) => setIsExtended(e.target.checked)}
                    />
                    <div className={`w-11 h-6 rounded-full transition-colors ${
                      isExtended ? 'bg-purple-600' : 'bg-gray-600'
                    }`}>
                      <div className={`w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
                        isExtended ? 'translate-x-5' : 'translate-x-0'
                      } mt-0.5 ml-0.5`}></div>
                    </div>
                  </label>
                </div>
              </div>
              
              <div className="mb-3">
                <p className="text-xs text-gray-400">
                  {isExtended ? 'Enhanced slot values active' : 'Enable to boost slot values'}
                </p>
              </div>

              
              {/* Visual Slot Interface */}
              <div className="flex justify-center gap-3">
                {Array.from({ length: equipment.maxSlots }).map((_, index) => {
                  const slot = slots[index];
                  const isActive = slot.isActive;
                  const selectedStat = slot.selectedStat;
                  
                  // Get stat info for display
                  let statDisplay = '';
                  let statValue = '';
                  if (selectedStat) {
                    const statInfo = getStatInfo(selectedStat);
                    statDisplay = statInfo?.name || selectedStat.replace('_', ' ');
                    const slotOptions = getSlotOptionsForEquipment();
                    const value = (slotOptions as Record<string, number>)[selectedStat];
                    if (value !== undefined) {
                      statValue = formatStatValue(selectedStat, value as number);
                    }
                  }
                  
                  return (
                    <div key={index} className="flex flex-col items-center">
                      <div className="mb-2">
                        <span className="text-xs font-medium text-gray-400">Slot {index + 1}</span>
                      </div>
                      
                      {/* Visual Slot */}
                      <button
                        onClick={() => handleSlotClick(index)}
                        className={`
                          relative w-16 h-16 rounded-lg border-2 transition-all duration-200 
                          flex flex-col items-center justify-center p-1 group
                          ${isActive 
                            ? 'border-game-gold bg-game-gold/10 hover:bg-game-gold/20' 
                            : 'border-gray-600 bg-gray-800/50 hover:border-gray-500 hover:bg-gray-700/50'
                          }
                        `}
                        title={isActive ? `${statDisplay}: +${statValue}` : 'Click to select stat'}
                      >
                        {isActive ? (
                          <>
                            {/* Stat Icon */}
                            <div className="flex items-center justify-center mb-1">
                              <StatIcon statId={selectedStat!} className="w-4 h-4 text-game-gold" />
                            </div>
                            {/* Stat Value */}
                            <div className="text-xs font-semibold text-game-gold leading-none">
                              +{statValue}
                            </div>
                          </>
                        ) : (
                          <>
                            {/* Empty Slot Icon */}
                            <div className="text-gray-500 group-hover:text-gray-400 transition-colors">
                              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                              </svg>
                            </div>
                            <div className="text-xs text-gray-500 group-hover:text-gray-400 mt-1">
                              Empty
                            </div>
                          </>
                        )}

                      </button>
                      
                      {/* Stat Name (if selected) */}
                      {isActive && (
                        <div className="mt-2 text-xs text-center text-gray-300 max-w-20 truncate" title={statDisplay}>
                          {statDisplay}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
    </>
  );

  // Right content - Tooltip preview
  const rightContent = (
    <>
      <div className="bg-theme-darker p-5 rounded-md border border-border-dark">
        <h3 className="text-md font-semibold text-game-gold mb-3">Equipment Preview</h3>
        <UnifiedEquipmentTooltip 
          equipment={(() => {
            const epicOptionData = parseSelectedOption(selectedEpicOption);
            return {
              ...equipment,
              baseUpgradeLevel,
              extremeUpgradeLevel,
              divineUpgradeLevel,
              epicOptionStat: epicOptionData?.type === 'normal' ? epicOptionData.stat : null,
              epicOptionLevel: epicOptionData?.type === 'normal' ? epicOptionData.level : 1,
              masterEpicOption: epicOptionData?.type === 'master' ? epicOptionData.stat : null,
              masterEpicOptionLevel: epicOptionData?.type === 'master' ? epicOptionData.level : 1,
              epicOptionType: epicOptionData?.type || null,
              slots,
              isExtended,
              totalStats
            } as ConfiguredEquipment;
          })()}
          formatStatName={formatStatName}
          formatStatValueWithSign={formatStatValueWithSign}
        />
      </div>
    </>
  );

  return (
    <>
      <UpgradeModalLayout
        isOpen={isOpen}
        title={`Configure ${equipment.name}`}
        onClose={onClose}
        onApply={handleSaveConfiguration}
        applyButtonText="Save Configuration"
        isApplyDisabled={false}
        leftContent={leftContent}
        rightContent={rightContent}

        zIndex="z-[70]"
      />
      
      {/* Slot Selection Modal */}
      {slotSelectionModal.isOpen && (
        <div className="fixed inset-0 flex items-center justify-center z-[80] bg-black bg-opacity-50">
          <div className="glass-panel-dark w-full max-w-md max-h-[80vh] relative m-4 flex flex-col">
            {/* Header */}
            <div className="pb-3 mb-4 border-b border-game-gold flex justify-between items-center px-6 pt-6">
              <h3 className="text-lg font-bold text-game-gold glow-text-sm">
                Select Slot {slotSelectionModal.slotIndex + 1} Stat
              </h3>
              <button 
                onClick={handleSlotSelectionClose}
                className="text-gray-400 hover:text-white focus:outline-none"
                aria-label="Close"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
            
            {/* Content */}
            <div className="flex-1 overflow-y-auto dark-scrollbar px-6 pb-4">
              {/* Current Selection */}
              {slots[slotSelectionModal.slotIndex]?.selectedStat && (
                <div className="mb-4 p-3 bg-theme-darker rounded border border-border-dark">
                  <div className="text-sm text-gray-300 mb-2">Current Selection:</div>
                  <div className="flex items-center justify-between">
                    <span className="text-game-gold font-medium">
                      {(() => {
                        const currentStat = slots[slotSelectionModal.slotIndex].selectedStat!;
                        const statInfo = getStatInfo(currentStat);
                        return statInfo?.name || currentStat.replace('_', ' ');
                      })()}
                    </span>
                    <span className="text-game-highlight">
                      +{(() => {
                        const currentStat = slots[slotSelectionModal.slotIndex].selectedStat!;
                        const slotOptions = getSlotOptionsForEquipment();
                        const value = (slotOptions as Record<string, number>)[currentStat];
                        return value !== undefined ? formatStatValue(currentStat, value as number) : '0';
                      })()}
                    </span>
                  </div>
                </div>
              )}
              
              {/* Remove Selection Option */}
              <button
                onClick={() => handleSlotStatSelect(null)}
                className="w-full mb-4 p-3 bg-red-900/30 border border-red-700/50 rounded hover:bg-red-900/50 transition-colors text-left"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded bg-red-800/50 flex items-center justify-center mr-3">
                    <svg className="w-4 h-4 text-red-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </div>
                  <div>
                    <div className="text-red-400 font-medium">Remove Stat</div>
                    <div className="text-xs text-red-300">Clear this slot</div>
                  </div>
                </div>
              </button>
              
              {/* Available Stats */}
              <div className="space-y-2">
                <div className="text-sm font-medium text-gray-300 mb-3">Available Stats:</div>
                {Object.entries(getSlotOptionsForEquipment()).map(([stat, value]) => {
                  const statInfo = getStatInfo(stat);
                  const isCurrentlySelected = slots[slotSelectionModal.slotIndex]?.selectedStat === stat;
                  
                  // Get standard (non-extended) value for comparison
                  let standardValue: number | undefined;
                  if (isWeapon(equipment)) {
                    const standardOptions = getWeaponSlotOptions(equipment.grade, false, equipment.handType);
                    standardValue = (standardOptions as any)[stat];
                  } else if (isArmor(equipment)) {
                    const standardOptions = getArmorSlotOptions(equipment.subtype as ArmorStatType, false);
                    standardValue = (standardOptions as any)[stat];
                  } else if (isVehicle(equipment)) {
                    const standardOptions = getVehicleSlotOptions(equipment.grade, false);
                    standardValue = (standardOptions as any)[stat];
                  }
                  
                  // Format display value
                  let displayValue = formatStatValue(stat, value as number);
                  let enhancementNote = '';
                  
                  // If slot extender is active, show the enhanced value with the standard value for comparison
                  if (isExtended && standardValue !== undefined) {
                    const standardDisplay = formatStatValue(stat, standardValue as number);
                    enhancementNote = ` (enhanced from ${standardDisplay})`;
                  }
                  
                  return (
                    <button
                      key={stat}
                      onClick={() => handleSlotStatSelect(stat)}
                      disabled={isCurrentlySelected}
                      className={`
                        w-full p-3 rounded border transition-colors text-left
                        ${isCurrentlySelected 
                          ? 'bg-game-gold/20 border-game-gold/50 cursor-not-allowed opacity-75' 
                          : 'bg-theme-darker border-border-dark hover:border-game-highlight hover:bg-theme-dark'
                        }
                      `}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <div className="w-8 h-8 rounded bg-theme-dark flex items-center justify-center mr-3">
                            <StatIcon statId={stat} className="w-4 h-4 text-game-gold" />
                          </div>
                          <div>
                            <div className={`font-medium ${isCurrentlySelected ? 'text-game-gold' : 'text-gray-200'}`}>
                              {statInfo?.name || stat.replace('_', ' ')}
                            </div>
                            {enhancementNote && (
                              <div className="text-xs text-purple-400">
                                {enhancementNote}
                              </div>
                            )}
                          </div>
                        </div>
                        <div className={`font-semibold ${isCurrentlySelected ? 'text-game-gold' : 'text-game-highlight'}`}>
                          +{displayValue}
                          {isExtended && (
                            <span className="ml-1 text-purple-400">✨</span>
                          )}
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
            
            {/* Footer */}
            <div className="flex justify-end px-6 pb-6 pt-4 border-t border-border-dark">
              <button 
                onClick={handleSlotSelectionClose}
                className="game-button-secondary px-4 py-2 rounded-md text-sm font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EquipmentUpgradeModal;
export type { Equipment, ConfiguredEquipment };