/**
 * Shared vehicle types and interfaces
 * Contains all vehicle-related type definitions used across files
 */

export interface VehicleStats {
  // Base stats for vehicles
  movementSpeed?: number;
  hp?: number;
  attack?: number;
  magicAttack?: number;
  defense?: number;
  attackRate?: number;
  criticalRate?: number;
  criticalDamage?: number;
  penetration?: number;
  allAttackUp?: number;
  defenseRate?: number;
}

export interface VehicleExtremeUpgradeLevel {
  // Stats for extreme upgrades
  movementSpeed?: number;
  hp?: number;
  attackRate?: number;
  criticalRate?: number;
  criticalDamage?: number;
  penetration?: number;
  allAttackUp?: number;
  defense?: number;
  defenseRate?: number;
  accuracy?: number;
  allSkillAmp?: number;
  ignorePenetration?: number;
}

export interface VehicleDivineUpgradeLevel {
  // Stats for divine upgrades
  movementSpeed?: number;
  hp?: number;
  attackRate?: number;
  criticalRate?: number;
  criticalDamage?: number;
  allAttackUp?: number;
  defense?: number;
  penetration?: number;
  allSkillAmp?: number;
}

export interface VehicleEpicOption {
  // Epic option stats
  criticalDamage: number;
  criticalRate: number;
  movementSpeed: number;
  allSkillAmp: number;
}

export interface VehicleSlotOption {
  // Slot option stats
  movementSpeed: number;
  criticalDamage: number;
  criticalRate: number;
  attackRate: number;
  hp: number;
}

export interface VehicleGradeData {
  baseStats: VehicleStats;
  maxExtremeLevel: number;
  imagePath: string; 
}

export interface VehicleTemplate {
  type: string; // 'vehicle'
  subtype: string; // e.g., 'bike', 'hoverboard', etc.
  material: string; // 'vehicle'
  class: string; // character class compatibility
  maxSlots: number; 
  grades: Record<string, VehicleGradeData>;
}

export interface Vehicle {
  id: string;
  name: string;
  type: string; // 'vehicle'
  subtype: string; // e.g., 'bike', 'hoverboard', etc.
  material: string; // 'vehicle'
  class: string; // character class compatibility
  grade: string; // 'high', 'highest', 'ultimate'
  imagePath: string;
  baseStats: VehicleStats;
  maxSlots: number;
  maxExtremeLevel: number;
}

// Type guard to check if an item is a vehicle
export const isVehicle = (item: any): item is Vehicle => {
  return item && item.type === 'vehicle' && item.material === 'vehicle';
};