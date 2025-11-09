/**
 * Equipment Strategy Pattern
 * Provides equipment-specific logic for calculations, epic options, and slot options
 * while maintaining a unified interface for all equipment types.
 */

import { 
  BaseEquipment, 
  Equipment, 
  WeaponEquipment,
  ArmorEquipment,
  VehicleEquipment,
  SlotConfiguration,
  isWeapon,
  isArmor,
  isVehicle
} from '../types/base-equipment';

// Weapon-specific imports
import { 
  getBaseUpgradeStats as getWeaponBaseUpgradeStats
} from '../data/weapons/weapons-data';
import {
  getEpicOptionStatValue as getWeaponEpicOptionStatValue,
  getWeaponMasterEpicOption,
  getWeaponMasterEpicOptionDefinition,
  getAvailableEpicStats as getAvailableWeaponEpicStats,
  getAvailableWeaponMasterEpicOptions,
  getWeaponMasterEpicOptionMaxLevel,
  getWeaponSlotOptions
} from '../data/weapons/epic-options';
import { getExtremeUpgradeStats as getWeaponExtremeUpgradeStats } from '../data/weapons/extreme-upgrades';
import { getDivineUpgradeStats as getWeaponDivineUpgradeStats } from '../data/weapons/divine-upgrades';

// Armor-specific imports
import { 
  getArmorSlotOptions,
  calculateArmorTotalStats
} from '../data/armor/armors-data';
import {
  getArmorEpicOptionStatValue,
  getArmorEpicOptionMaxLevel,
  getArmorMasterEpicOption,
  getArmorMasterEpicOptionDefinition,
  getAvailableArmorEpicStats,
  getAvailableArmorMasterEpicOptions,
  getArmorMasterEpicOptionMaxLevel
} from '../data/armor/armor-epic-options';
import { ArmorStatType } from '../data/armor/armor-types';

// Vehicle-specific imports
import {
  getVehicleEpicOptionStatValue,
  calculateVehicleTotalStats,
  getVehicleSlotOptions,
  getVehicleEpicOptionMaxLevel,
  getAvailableVehicleEpicStats
} from '../data/vehicles/vehicles-data';

/**
 * Base strategy interface for equipment operations
 */
export interface EquipmentStrategy<T extends BaseEquipment> {
  calculateTotalStats(
    equipment: T,
    baseUpgradeLevel: number,
    extremeUpgradeLevel: number,
    divineUpgradeLevel: number,
    epicOptionStat: string | null,
    epicOptionLevel: number,
    masterEpicOption: string | null,
    masterEpicOptionLevel: number,
    epicOptionType: 'none' | 'normal' | 'master' | null,
    slots: SlotConfiguration[],
    isExtended: boolean
  ): Record<string, number>;

  getEpicOptionStatValue(stat: string, level: number): number;
  getEpicOptionMaxLevel(stat: string): number;
  getMasterEpicOptionValues(optionName: string, level: number): Record<string, number>;
  getSlotOptions(isExtended: boolean): Record<string, number>;
  getAvailableEpicStats(): string[];
  getAvailableMasterEpicOptions(): string[];
  getMasterEpicOptionDefinition(optionName: string): unknown;
  getMasterEpicOptionMaxLevel(optionName: string): number;
}

/**
 * Weapon strategy implementation
 */
export class WeaponStrategy implements EquipmentStrategy<WeaponEquipment> {
  constructor(private equipment: WeaponEquipment) {}

  calculateTotalStats(
    equipment: WeaponEquipment,
    baseUpgradeLevel: number,
    extremeUpgradeLevel: number,
    divineUpgradeLevel: number,
    epicOptionStat: string | null,
    epicOptionLevel: number,
    masterEpicOption: string | null,
    masterEpicOptionLevel: number,
    epicOptionType: 'none' | 'normal' | 'master' | null,
    slots: SlotConfiguration[],
    isExtended: boolean
  ): Record<string, number> {
    const stats: Record<string, number> = { ...equipment.baseStats };
    
    // Add base upgrade stats
    if (baseUpgradeLevel > 0) {
      const baseStats = getWeaponBaseUpgradeStats(equipment.grade, equipment.subtype, baseUpgradeLevel);
      Object.entries(baseStats).forEach(([stat, value]) => {
        stats[stat] = (stats[stat] || 0) + value;
      });
    }
    
    // Add extreme upgrade stats
    if (extremeUpgradeLevel > 0) {
      const extremeStats = getWeaponExtremeUpgradeStats(equipment.handType, extremeUpgradeLevel);
      if (extremeStats) {
        Object.entries(extremeStats).forEach(([stat, value]) => {
          if (value !== undefined) {
            stats[stat] = (stats[stat] || 0) + value;
          }
        });
      }
    }
    
    // Add divine upgrade stats
    if (divineUpgradeLevel > 0) {
      const divineStats = getWeaponDivineUpgradeStats(equipment.grade, divineUpgradeLevel, equipment.handType);
      if (divineStats) {
        Object.entries(divineStats).forEach(([stat, value]) => {
          if (value !== undefined) {
            stats[stat] = (stats[stat] || 0) + value;
          }
        });
      }
    }
    
    // Add epic option stats
    if (epicOptionStat && epicOptionType === 'normal') {
      const statValue = this.getEpicOptionStatValue(epicOptionStat, epicOptionLevel);
      if (statValue > 0) {
        stats[epicOptionStat] = (stats[epicOptionStat] || 0) + statValue;
      }
    }

    // Add Master epic option stats
    if (masterEpicOption && epicOptionType === 'master') {
      const masterStatValues = this.getMasterEpicOptionValues(masterEpicOption, masterEpicOptionLevel);
      Object.entries(masterStatValues).forEach(([stat, value]) => {
        if (value > 0) {
          stats[stat] = (stats[stat] || 0) + value;
        }
      });
    }
    
    // Add slot stats
    const slotOptions = this.getSlotOptions(isExtended);
    slots.forEach(slot => {
      if (slot.selectedStat) {
        const statValue = slotOptions[slot.selectedStat];
        if (statValue) {
          stats[slot.selectedStat] = (stats[slot.selectedStat] || 0) + statValue;
        }
      }
    });
    
    return stats;
  }

  getEpicOptionStatValue(stat: string, level: number): number {
    return getWeaponEpicOptionStatValue(stat, this.equipment.grade, level, this.equipment.handType);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getEpicOptionMaxLevel(_stat: string): number {
    return 6; // Weapons have max level 6 for all epic options
  }

  getMasterEpicOptionValues(optionName: string, level: number): Record<string, number> {
    return getWeaponMasterEpicOption(this.equipment.handType, optionName, this.equipment.grade, level);
  }

  getSlotOptions(isExtended: boolean): Record<string, number> {
    const slotOptions = getWeaponSlotOptions(this.equipment.grade, isExtended, this.equipment.handType);
    return slotOptions as unknown as Record<string, number>;
  }

  getAvailableEpicStats(): string[] {
    return getAvailableWeaponEpicStats();
  }

  getAvailableMasterEpicOptions(): string[] {
    return getAvailableWeaponMasterEpicOptions(this.equipment.handType, this.equipment.grade);
  }

  getMasterEpicOptionDefinition(optionName: string): unknown {
    return getWeaponMasterEpicOptionDefinition(this.equipment.handType, optionName, this.equipment.grade);
  }

  getMasterEpicOptionMaxLevel(optionName: string): number {
    return getWeaponMasterEpicOptionMaxLevel(this.equipment.handType, optionName, this.equipment.grade);
  }
}

/**
 * Armor strategy implementation
 */
export class ArmorStrategy implements EquipmentStrategy<ArmorEquipment> {
  constructor(private equipment: ArmorEquipment) {}

  calculateTotalStats(
    equipment: ArmorEquipment,
    baseUpgradeLevel: number,
    extremeUpgradeLevel: number,
    divineUpgradeLevel: number,
    epicOptionStat: string | null,
    epicOptionLevel: number,
    masterEpicOption: string | null,
    masterEpicOptionLevel: number,
    epicOptionType: 'none' | 'normal' | 'master' | null,
    slots: SlotConfiguration[],
    isExtended: boolean
  ): Record<string, number> {
    // Use existing armor calculation function
    // Note: calculateArmorTotalStats expects legacy types, so we cast for compatibility
    return calculateArmorTotalStats(
      equipment as unknown as Parameters<typeof calculateArmorTotalStats>[0],
      baseUpgradeLevel,
      extremeUpgradeLevel,
      divineUpgradeLevel,
      epicOptionType === 'normal' ? epicOptionStat : null,
      slots as unknown as Parameters<typeof calculateArmorTotalStats>[5],
      epicOptionLevel,
      isExtended,
      epicOptionType,
      masterEpicOption,
      masterEpicOptionLevel
    ) as Record<string, number>;
  }

  getEpicOptionStatValue(stat: string, level: number): number {
    return getArmorEpicOptionStatValue(this.equipment.subtype as ArmorStatType, stat, this.equipment.grade || 'highest', level);
  }

  getEpicOptionMaxLevel(stat: string): number {
    return getArmorEpicOptionMaxLevel(this.equipment.subtype as ArmorStatType, stat, this.equipment.grade || 'highest');
  }

  getMasterEpicOptionValues(optionName: string, level: number): Record<string, number> {
    return getArmorMasterEpicOption(this.equipment.subtype as ArmorStatType, optionName, this.equipment.grade || 'highest', level);
  }

  getSlotOptions(isExtended: boolean): Record<string, number> {
    return getArmorSlotOptions(this.equipment.subtype as ArmorStatType, isExtended, this.equipment.grade || 'highest') as unknown as Record<string, number>;
  }

  getAvailableEpicStats(): string[] {
    return getAvailableArmorEpicStats(this.equipment.subtype as ArmorStatType, this.equipment.grade || 'highest');
  }

  getAvailableMasterEpicOptions(): string[] {
    return getAvailableArmorMasterEpicOptions(this.equipment.subtype as ArmorStatType, this.equipment.grade || 'highest');
  }

  getMasterEpicOptionDefinition(optionName: string): unknown {
    return getArmorMasterEpicOptionDefinition(this.equipment.subtype as ArmorStatType, optionName, this.equipment.grade || 'highest');
  }

  getMasterEpicOptionMaxLevel(optionName: string): number {
    return getArmorMasterEpicOptionMaxLevel(this.equipment.subtype as ArmorStatType, optionName, this.equipment.grade || 'highest');
  }
}

/**
 * Vehicle strategy implementation
 */
export class VehicleStrategy implements EquipmentStrategy<VehicleEquipment> {
  constructor(private equipment: VehicleEquipment) {}

  calculateTotalStats(
    equipment: VehicleEquipment,
    baseUpgradeLevel: number,
    extremeUpgradeLevel: number,
    divineUpgradeLevel: number,
    epicOptionStat: string | null,
    epicOptionLevel: number,
    _masterEpicOption: string | null,
    _masterEpicOptionLevel: number,
    epicOptionType: 'none' | 'normal' | 'master' | null,
    slots: SlotConfiguration[],
    isExtended: boolean
  ): Record<string, number> {
    // Use existing vehicle calculation function
    // Note: calculateVehicleTotalStats expects legacy types, so we cast for compatibility
    return calculateVehicleTotalStats(
      equipment as unknown as Parameters<typeof calculateVehicleTotalStats>[0],
      baseUpgradeLevel,
      extremeUpgradeLevel,
      divineUpgradeLevel,
      epicOptionType === 'normal' ? epicOptionStat : null,
      slots as unknown as Parameters<typeof calculateVehicleTotalStats>[5],
      epicOptionLevel,
      isExtended
    ) as Record<string, number>;
  }

  getEpicOptionStatValue(stat: string, level: number): number {
    return getVehicleEpicOptionStatValue(stat, this.equipment.grade, level);
  }

  getEpicOptionMaxLevel(stat: string): number {
    return getVehicleEpicOptionMaxLevel(stat, this.equipment.grade);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getMasterEpicOptionValues(_optionName: string, _level: number): Record<string, number> {
    return {}; // Vehicles don't support master epic options
  }

  getSlotOptions(isExtended: boolean): Record<string, number> {
    return getVehicleSlotOptions(this.equipment.grade, isExtended);
  }

  getAvailableEpicStats(): string[] {
    return getAvailableVehicleEpicStats();
  }

  getAvailableMasterEpicOptions(): string[] {
    return []; // Vehicles don't support master epic options
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getMasterEpicOptionDefinition(_optionName: string): unknown {
    return null; // Vehicles don't support master epic options
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getMasterEpicOptionMaxLevel(_optionName: string): number {
    return 0; // Vehicles don't support master epic options
  }
}

// Strategy cache for performance optimization
const strategyCache = new WeakMap<Equipment, EquipmentStrategy<BaseEquipment>>();

/**
 * Factory function to create the appropriate strategy for equipment
 */
export function createEquipmentStrategy(equipment: Equipment): EquipmentStrategy<BaseEquipment> {
  if (isWeapon(equipment)) {
    return new WeaponStrategy(equipment);
  } else if (isArmor(equipment)) {
    return new ArmorStrategy(equipment);
  } else if (isVehicle(equipment)) {
    return new VehicleStrategy(equipment);
  } else {
    // This should never happen due to type guards, but TypeScript needs this for exhaustiveness
    const unknownEquipment = equipment as { material?: string; type?: string };
    throw new Error(`Unknown equipment material: ${unknownEquipment.material ?? 'unknown'} (type: ${unknownEquipment.type ?? 'unknown'})`);
  }
}

/**
 * Get cached strategy for equipment (performance optimized)
 */
export function getEquipmentStrategy(equipment: Equipment): EquipmentStrategy<BaseEquipment> {
  if (!strategyCache.has(equipment)) {
    strategyCache.set(equipment, createEquipmentStrategy(equipment));
  }
  return strategyCache.get(equipment)!;
}

/**
 * Unified calculation function that uses the strategy pattern
 */
export function calculateEquipmentStats<T extends BaseEquipment>(
  equipment: T,
  baseUpgradeLevel: number,
  extremeUpgradeLevel: number,
  divineUpgradeLevel: number,
  epicOptionStat: string | null,
  epicOptionLevel: number,
  masterEpicOption: string | null,
  masterEpicOptionLevel: number,
  epicOptionType: 'none' | 'normal' | 'master' | null,
  slots: SlotConfiguration[],
  isExtended: boolean
): Record<string, number> {
  const strategy = getEquipmentStrategy(equipment as Equipment);
  return strategy.calculateTotalStats(
    equipment,
    baseUpgradeLevel,
    extremeUpgradeLevel,
    divineUpgradeLevel,
    epicOptionStat,
    epicOptionLevel,
    masterEpicOption,
    masterEpicOptionLevel,
    epicOptionType,
    slots,
    isExtended
  );
}