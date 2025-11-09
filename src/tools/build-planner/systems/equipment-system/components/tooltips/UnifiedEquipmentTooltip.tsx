// Unified tooltip component for weapons, armor, and vehicles
import React from 'react';
import { 
  ConfiguredEquipment,
  ConfiguredWeapon, 
  ConfiguredArmor, 
  ConfiguredVehicle,
  isWeapon,
  isArmor,
  isVehicle
} from '../../types/base-equipment';
import { getStatInfo, formatStatValue } from '@/tools/build-planner/data/stats-config';
import { StatIcon } from '@/tools/build-planner/components/StatIcon';
import { getEpicOptionTextColor } from '../../utils/epic-option-colors';

// Weapon imports
import { getBaseUpgradeStats } from '../../data/weapons/weapons-data';
import { 
  getEpicOptionStatValue, 
  getWeaponSlotOptions,
  getWeaponMasterEpicOption,
  getWeaponMasterEpicOptionDefinition
} from '../../data/weapons/epic-options';
import { getExtremeUpgradeStats } from '../../data/weapons/extreme-upgrades';
import { getDivineUpgradeStats } from '../../data/weapons/divine-upgrades';

// Armor imports
import { getArmorExtremeUpgradeStats } from '../../data/armor/armor-extreme-upgrades';
import { getArmorDivineUpgradeStats } from '../../data/armor/armor-divine-upgrades';
import { getArmorBaseUpgradeStats, getArmorSlotOptions, getArmorById } from '../../data/armor/armors-data';
import { 
  getArmorEpicOptionStatValue,

  getArmorMasterEpicOption,
  getArmorMasterEpicOptionDefinition
} from '../../data/armor/armor-epic-options';
import { ArmorStatType } from '../../data/armor/armor-types';

// Vehicle imports
import { vehicleSlotOptions, enhancedVehicleSlotOptions, getVehicleEpicOptionStatValue, getVehicleBaseUpgradeStats, getVehicleSlotOptions } from '../../data/vehicles/vehicles-data';
import { getVehicleById } from '../../data/vehicles/vehicle-templates';
import { getVehicleExtremeUpgradeStats } from '../../data/vehicles/vehicle-extreme-upgrades';
import { getVehicleDivineUpgradeStats } from '../../data/vehicles/vehicle-divine-upgrades';

type EquipmentItem = ConfiguredEquipment;

interface UnifiedEquipmentTooltipProps {
  equipment: EquipmentItem;
  formatStatName: (stat: string) => string;
  formatStatValueWithSign: (statId: string, value: number | undefined) => string;
}

// Type guards are now imported from base-equipment.ts

const UnifiedEquipmentTooltip: React.FC<UnifiedEquipmentTooltipProps> = ({ 
  equipment, 
  formatStatName, 
  formatStatValueWithSign 
}) => {
  // Generate display name with upgrade level
  const getDisplayName = (equipment: EquipmentItem) => {
    let displayName = equipment.name;
    
    if (equipment.baseUpgradeLevel > 0) {
      displayName = `${equipment.name} +${equipment.baseUpgradeLevel}`;
    }
    
    return displayName;
  };

  // Get the correct slot value based on equipment type and enhanced slots
  const getSlotStatValue = (equipment: EquipmentItem, statName: string) => {
    const hasSlotExtender = equipment.isExtended;
    
    if (isWeapon(equipment)) {
      // Use the new weapon slot options function that handles two-handed weapons properly
      const slotOptionsToUse = getWeaponSlotOptions(equipment.grade, hasSlotExtender, equipment.handType);
      return slotOptionsToUse[statName as keyof typeof slotOptionsToUse] || 0;
    } else if (isArmor(equipment)) {
      // Use the new armor-specific slot options based on armor subtype and grade
      const slotOptionsToUse = getArmorSlotOptions(equipment.subtype as ArmorStatType, hasSlotExtender, equipment.grade || 'highest');
      return slotOptionsToUse[statName as keyof typeof slotOptionsToUse] || 0;
    } else if (isVehicle(equipment)) {
      const slotOptionsToUse = getVehicleSlotOptions(equipment.grade, hasSlotExtender);
      return slotOptionsToUse[statName as keyof typeof slotOptionsToUse] || 0;
    }
    
    return 0;
  };

  // Calculate base stats only (base + base upgrades, excluding extreme/divine/epic/slots)
  const getBaseStatsOnly = (equipment: EquipmentItem) => {
    const baseStats: Record<string, number> = {};
    
    if (isWeapon(equipment)) {
      // Weapons have baseStats directly
      Object.assign(baseStats, equipment.baseStats);
      
      if (equipment.baseUpgradeLevel > 0) {
        const upgradeStats = getBaseUpgradeStats(equipment.grade, equipment.subtype, equipment.baseUpgradeLevel);
        Object.entries(upgradeStats).forEach(([stat, value]) => {
          baseStats[stat] = (baseStats[stat] || 0) + value;
        });
      }
    } else if (isArmor(equipment)) {
      // Get original armor template for clean base stats
      const originalArmor = getArmorById(equipment.id);
      if (originalArmor) {
        Object.entries(originalArmor.baseStats).forEach(([stat, value]) => {
          if (typeof value === 'number') {
            baseStats[stat] = value;
          }
        });
      }
      
      if (equipment.baseUpgradeLevel > 0) {
        const upgradeStats = getArmorBaseUpgradeStats(equipment.grade || 'normal', equipment.subtype as ArmorStatType, equipment.baseUpgradeLevel);
        Object.entries(upgradeStats).forEach(([stat, value]) => {
          baseStats[stat] = (baseStats[stat] || 0) + value;
        });
      }
    } else if (isVehicle(equipment)) {
      // Get original vehicle template for clean base stats
      const originalVehicle = getVehicleById(equipment.id);
      if (originalVehicle) {
        Object.entries(originalVehicle.baseStats).forEach(([stat, value]) => {
          if (typeof value === 'number') {
            baseStats[stat] = value;
          }
        });
      }
      
      if (equipment.baseUpgradeLevel > 0) {
        const upgradeStats = getVehicleBaseUpgradeStats(equipment.grade, equipment.subtype, equipment.baseUpgradeLevel);
        Object.entries(upgradeStats).forEach(([stat, value]) => {
          baseStats[stat] = (baseStats[stat] || 0) + value;
        });
      }
    }
    
    return baseStats;
  };

  // Get epic option value using centralized formatting
  const getEpicOptionDisplay = (equipment: EquipmentItem) => {
    if (!equipment.epicOptionStat) return null;
    
    let value = 0;
    
    if (isWeapon(equipment)) {
      value = getEpicOptionStatValue(equipment.epicOptionStat, equipment.grade, equipment.epicOptionLevel, equipment.handType);
    } else if (isArmor(equipment)) {
      value = getArmorEpicOptionStatValue(equipment.subtype as ArmorStatType, equipment.epicOptionStat, equipment.grade || 'highest', equipment.epicOptionLevel || 5);
    } else if (isVehicle(equipment)) {
      value = getVehicleEpicOptionStatValue(equipment.epicOptionStat, equipment.grade, equipment.epicOptionLevel);
    }
    
    // Use centralized formatting from stats-config (handles % automatically)
    const formattedValue = formatStatValue(equipment.epicOptionStat, value);
    return { value: `+ ${formattedValue}`, suffix: '' };
  };

  // Get Master epic option display (weapons and armor only - vehicles don't have multi-stat epic options)
  const getMasterEpicOptionDisplay = (equipment: EquipmentItem) => {
    // Vehicles don't have multi-stat epic options, so skip them
    if (isVehicle(equipment)) return null;
    
    const masterOption = (equipment as any).masterEpicOption;
    const masterLevel = (equipment as any).masterEpicOptionLevel || 1;
    
    if (!masterOption) return null;
    
    let definition = null;
    let statValues = {};
    
    if (isWeapon(equipment)) {
      definition = getWeaponMasterEpicOptionDefinition(equipment.handType, masterOption, equipment.grade);
      statValues = getWeaponMasterEpicOption(equipment.handType, masterOption, equipment.grade, masterLevel);
    } else if (isArmor(equipment)) {
      definition = getArmorMasterEpicOptionDefinition(
        equipment.subtype as ArmorStatType, 
        masterOption, 
        equipment.grade || 'highest'
      );
      statValues = getArmorMasterEpicOption(
        equipment.subtype as ArmorStatType, 
        masterOption, 
        equipment.grade || 'highest', 
        masterLevel
      );
    }
    
    return {
      name: definition?.name || masterOption.replace('_', ' '),
      stats: statValues,
      level: masterLevel
    };
  };

  // Get extreme upgrade stats based on equipment type
  const getExtremeStats = (equipment: EquipmentItem) => {
    if (equipment.extremeUpgradeLevel <= 0 || (equipment.maxExtremeLevel || 0) <= 0) return null;
    
    if (isWeapon(equipment)) {
      return getExtremeUpgradeStats(equipment.handType, equipment.extremeUpgradeLevel);
    } else if (isArmor(equipment)) {
      return getArmorExtremeUpgradeStats(equipment.subtype as 'body' | 'helmet' | 'gauntlet' | 'shoes', equipment.extremeUpgradeLevel);
    } else if (isVehicle(equipment)) {
      return getVehicleExtremeUpgradeStats(equipment.grade, equipment.extremeUpgradeLevel);
    }
    
    return null;
  };

  // Get divine upgrade stats based on equipment type
  const getDivineStats = (equipment: EquipmentItem) => {
    if (equipment.divineUpgradeLevel <= 0) return null;
    
    if (isWeapon(equipment)) {
      return getDivineUpgradeStats(equipment.grade || 'normal', equipment.divineUpgradeLevel, equipment.handType);
    } else if (isArmor(equipment)) {
      return getArmorDivineUpgradeStats(
        equipment.subtype as 'body' | 'helmet' | 'gauntlet' | 'shoes',
        equipment.grade || 'normal',
        equipment.divineUpgradeLevel
      );
    } else if (isVehicle(equipment)) {
      return getVehicleDivineUpgradeStats(equipment.grade || 'normal', equipment.divineUpgradeLevel);
    }
    
    return null;
  };

  // Get slot icons
  const getSlotIcons = (equipment: EquipmentItem) => {
    if (!equipment.slots) return null;
    
    const activeSlots = equipment.slots.filter(slot => slot.isActive && slot.selectedStat);
    const lastActiveSlotIndex = equipment.slots.map((slot, index) => slot.isActive && slot.selectedStat ? index : -1)
      .filter(index => index !== -1)
      .pop();
    
    return equipment.slots.map((slot, index) => {
      if (!slot.isActive || !slot.selectedStat) return null;
      
      const statInfo = getStatInfo(slot.selectedStat);
      const isLastActiveSlot = index === lastActiveSlotIndex;
      const showPlusIcon = equipment.isExtended && isLastActiveSlot;
      
      return (
        <div key={index} className="inline-block mr-1 relative">
          <StatIcon 
            statId={slot.selectedStat}
            width={32}
            height={32}
            alt={statInfo?.name || slot.selectedStat}
          />
          {showPlusIcon && (
            <div className="absolute -top-2 -right-2 flex items-center justify-center text-white text-2xl font-black" style={{textShadow: '1px 1px 0 #000, -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000'}}>
              +
            </div>
          )}
        </div>
      );
    });
  };

  const baseStats = getBaseStatsOnly(equipment);
  const epicOptionDisplay = getEpicOptionDisplay(equipment);
  const masterEpicOptionDisplay = getMasterEpicOptionDisplay(equipment);
  const extremeStats = getExtremeStats(equipment);
  const divineStats = getDivineStats(equipment);

  return (
    <>
      {/* Equipment Name */}
      <div className="text-center text-game-gold font-bold mb-2">{getDisplayName(equipment)}</div>
      
      {/* Divider after header */}
      <div className="w-full h-px bg-gray-600 bg-opacity-30 my-2"></div>
      
      {/* General Option (Base Upgrades) */}
      <div className="mb-2">
        <div className="text-white font-bold mb-1">[ General Option ]</div>
        {Object.entries(baseStats)
          .filter(([stat, value]) => {
            // For weapons, only show attack-related stats
            if (isWeapon(equipment)) {
              return ['attack', 'magicAttack', 'attackRate'].includes(stat) && value > 0;
            }
            // For armor and vehicles, show all positive stats
            return value > 0;
          })
          .map(([stat, value]) => (
            <div key={stat} className="text-white flex justify-between">
              <span>{formatStatName(stat)}</span>
              <span className="text-white">{formatStatValueWithSign(stat, value)}</span>
            </div>
          ))}
      </div>
      
      {/* Divider after General Option section */}
      <div className="w-full h-px bg-gray-600 bg-opacity-30 my-2"></div>
      
      {/* Epic Option - Single Stat */}
      {equipment.epicOptionStat && epicOptionDisplay && (
        <>
          <div className="mb-2">
            <div className={`${getEpicOptionTextColor(equipment.epicOptionLevel || 1, 'normal')} font-bold mb-1`}>[ Epic Option ]</div>
            <div className={`${getEpicOptionTextColor(equipment.epicOptionLevel || 1, 'normal')} flex justify-between`}>
              <span>{formatStatName(equipment.epicOptionStat)} {epicOptionDisplay.suffix}</span>
              <span>{epicOptionDisplay.value}</span>
            </div>
          </div>
          
          {/* Divider after Epic Option section */}
          <div className="w-full h-px bg-gray-600 bg-opacity-30 my-2"></div>
        </>
      )}

      {/* Epic Option - Master */}
      {masterEpicOptionDisplay && (
        <>
          <div className="mb-2">
            <div className={`${getEpicOptionTextColor(masterEpicOptionDisplay.level || 1, 'master')} font-bold mb-1`}>[ Epic Option - {masterEpicOptionDisplay.name} ]</div>
            {Object.entries(masterEpicOptionDisplay.stats).map(([stat, value]) => {
              // Format value based on equipment type
              const numericValue = typeof value === 'number' ? value : 0;
              // Use the centralized formatting function for all equipment types
              const valueDisplay = `+ ${formatStatValue(stat, numericValue)}`;
              
              return (
                <div key={stat} className={`${getEpicOptionTextColor(masterEpicOptionDisplay.level || 1, 'master')} flex justify-between`}>
                  <span>{formatStatName(stat)}</span>
                  <span>{valueDisplay}</span>
                </div>
              );
            })}
          </div>
          
          {/* Divider after Master Epic Option section */}
          <div className="w-full h-px bg-gray-600 bg-opacity-30 my-2"></div>
        </>
      )}
      
      {/* Option (Slots) */}
      {equipment.slots && equipment.slots.some(slot => slot.isActive && slot.selectedStat) && (
        <>
          <div className="mb-2">
            <div className="text-cyan-400 font-bold mb-1">[ Option ]</div>
            {(() => {
              // Group slots by stat and sum their values
              const groupedStats: Record<string, number> = {};
              equipment.slots
                .filter(slot => slot.isActive && slot.selectedStat)
                .forEach(slot => {
                  const statName = slot.selectedStat as string;
                  const statValue = getSlotStatValue(equipment, statName);
                  groupedStats[statName] = (groupedStats[statName] || 0) + statValue;
                });

              return Object.entries(groupedStats).map(([statName, totalValue]) => (
                <div key={statName} className="text-cyan-400 flex justify-between">
                  <span>{formatStatName(statName)}</span>
                  <span>{formatStatValueWithSign(statName, totalValue)}</span>
                </div>
              ));
            })()} 
            <div className="mt-1">{getSlotIcons(equipment)}</div>
          </div>
          
          {/* Divider after Option section */}
          <div className="w-full h-px bg-gray-600 bg-opacity-30 my-2"></div>
        </>
      )}
      
      {/* Extreme Upgrade */}
      {extremeStats && (
        <>
          <div className="mb-2">
            <div className="text-blue-400 font-bold mb-1">
              [ Extreme Upgrade ({equipment.extremeUpgradeLevel}/{equipment.maxExtremeLevel || 7}) ]
            </div>
            {Object.entries(extremeStats)
              .filter(([_, value]) => value !== undefined && value !== null)
              .map(([stat, value]) => (
                <div key={stat} className="text-blue-400 flex justify-between">
                  <span>{getStatInfo(stat)?.name || formatStatName(stat)}</span>
                  <span>
                    {typeof value === 'string' 
                      ? value 
                      : formatStatValueWithSign(stat, value)}
                  </span>
                </div>
              ))}
          </div>
          
          {/* Divider after Extreme Upgrade section */}
          <div className="w-full h-px bg-gray-600 bg-opacity-30 my-2"></div>
        </>
      )}
      
      {/* Divine Upgrade */}
      {divineStats && (
        <div>
          <div className="text-orange-400 font-bold mb-1">
            [ Upgrade Divine Level ({equipment.divineUpgradeLevel}/15) ]
          </div>
          {Object.entries(divineStats)
            .filter(([_, value]) => value !== undefined && value !== null)
            .map(([stat, value]) => (
              <div key={stat} className="text-orange-400 flex justify-between">
                <span>{getStatInfo(stat)?.name || formatStatName(stat)}</span>
                <span>{formatStatValueWithSign(stat, value)}</span>
              </div>
            ))}
        </div>
      )}
    </>
  );
};

export default UnifiedEquipmentTooltip;