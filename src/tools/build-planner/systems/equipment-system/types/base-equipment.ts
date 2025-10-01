/**
 * Unified Base Equipment Types
 * This file contains the unified interface system that replaces the separate
 * Weapon, Armor, and Vehicle interfaces with a single, extensible base.
 */

// Base equipment interface that all equipment types extend
export interface BaseEquipment {
  id: string;
  name: string;
  type: string; // Can be 'orb', 'blade', 'armor', 'vehicle', etc.
  subtype: string;
  material: string; // 'weapon', 'armor', 'vehicle' - this determines the equipment category
  class: string;
  grade: string;
  imagePath: string;
  baseStats: Record<string, number>; // Generic stats object
  maxSlots: number;
  maxExtremeLevel: number;
  
  // Optional equipment-specific properties
  handType?: 'oneHanded' | 'twoHanded'; // Weapons only
  weight?: 'light' | 'medium' | 'heavy'; // Body armor only
  description?: string; // Armor and some other items
  
  // Feature flags for equipment capabilities
  supportsDivineUpgrades?: boolean;
  supportsMasterEpicOptions?: boolean;
}

// Equipment-specific extensions
export interface WeaponEquipment extends BaseEquipment {
  material: 'weapon'; // Weapons have material = 'weapon'
  handType: 'oneHanded' | 'twoHanded';
  supportsDivineUpgrades: true;
  supportsMasterEpicOptions: true;
}

export interface ArmorEquipment extends BaseEquipment {
  material: 'armor'; // Armor has material = 'armor'
  type: 'armor';
  subtype: 'body' | 'helmet' | 'gauntlet' | 'shoes';
  weight?: 'light' | 'medium' | 'heavy'; // Only for body armor
  description?: string;
  supportsDivineUpgrades?: boolean; // Depends on grade
  supportsMasterEpicOptions: true;
}

export interface VehicleEquipment extends BaseEquipment {
  material: 'vehicle'; // Vehicles have material = 'vehicle'
  type: 'vehicle';
  subtype: 'bike' | 'board';
  supportsDivineUpgrades?: boolean; // Medium grade vehicles don't support divine
  supportsMasterEpicOptions: false; // Vehicles don't support master epic options
}

// Union type for all equipment
export type Equipment = WeaponEquipment | ArmorEquipment | VehicleEquipment;

// Generic slot configuration interface
export interface SlotConfiguration {
  isActive: boolean;
  selectedStat: string | null;
}

// Configuration interface for equipment upgrades
export interface EquipmentConfiguration {
  baseUpgradeLevel: number;
  extremeUpgradeLevel: number;
  divineUpgradeLevel: number;
  
  // Epic option configuration
  epicOptionStat: string | null;
  epicOptionLevel: number;
  masterEpicOption?: string | null; // Only for weapons/armor
  masterEpicOptionLevel?: number;
  epicOptionType: 'none' | 'normal' | 'master' | null;
  
  // Slot configuration
  slots: SlotConfiguration[];
  isExtended: boolean;
  
  // Calculated stats
  totalStats: Record<string, number>;
}

// Generic configured equipment type using intersection
export type ConfiguredEquipment<T extends BaseEquipment = BaseEquipment> = T & EquipmentConfiguration;

// Specific configured equipment types
export type ConfiguredWeapon = ConfiguredEquipment<WeaponEquipment>;
export type ConfiguredArmor = ConfiguredEquipment<ArmorEquipment>;
export type ConfiguredVehicle = ConfiguredEquipment<VehicleEquipment>;

// Type guards for equipment identification (based on material, not type)
export const isWeapon = (equipment: BaseEquipment): equipment is WeaponEquipment => {
  return equipment.material === 'weapon';
};

export const isArmor = (equipment: BaseEquipment): equipment is ArmorEquipment => {
  return equipment.material === 'armor';
};

export const isVehicle = (equipment: BaseEquipment): equipment is VehicleEquipment => {
  return equipment.material === 'vehicle';
};

// Helper functions for equipment capabilities
export const supportsDivineUpgrades = (equipment: BaseEquipment): boolean => {
  // Medium grade vehicles don't support divine upgrades
  if (isVehicle(equipment) && equipment.grade === 'medium') {
    return false;
  }
  
  // Low and medium grade armors don't support divine upgrades
  if (isArmor(equipment) && (equipment.grade === 'low' || equipment.grade === 'medium')) {
    return false;
  }
  
  return true;
};

export const supportsMasterEpicOptions = (equipment: BaseEquipment): boolean => {
  // Vehicles don't support master epic options
  return !isVehicle(equipment);
};

// Legacy type aliases for backward compatibility
export type Weapon = WeaponEquipment;
export type Armor = ArmorEquipment;
export type Vehicle = VehicleEquipment;