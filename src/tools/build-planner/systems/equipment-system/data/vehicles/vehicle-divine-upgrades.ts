/**
 * Vehicle divine upgrade data
 * Contains upgrade levels and effects for vehicle divine upgrades
 */

import { VehicleDivineUpgradeLevel } from './vehicle-types';

// Define divine upgrade levels for vehicles based on grade
// Note: medium grade vehicles (like Blue Bike) do not have divine upgrades
export const vehicleDivineUpgrades: Record<string, Record<number, VehicleDivineUpgradeLevel>> = {
  high: {
    0: {},
    1: { hp: 40, defense: 4 },
    2: { hp: 50, defense: 10 },
    3: { hp: 60, defense: 16 },
    4: { hp: 70, defense: 22 },
    5: { hp: 80, defense: 28 },
    6: { hp: 90, defense: 34 },
    7: { hp: 100, defense: 40, allAttackUp: 10 },
    8: { hp: 110, defense: 46, allAttackUp: 15 },
    9: { hp: 120, defense: 52, allAttackUp: 20 },
    10: { hp: 130, defense: 58, allAttackUp: 25 },
    11: { hp: 140, defense: 64, allAttackUp: 30 },
    12: { hp: 150, defense: 70, allAttackUp: 35 },
    13: { hp: 160, defense: 76, allAttackUp: 40, criticalDamage: 1 },
    14: { hp: 170, defense: 82, allAttackUp: 45, criticalDamage: 2 },
    15: { hp: 180, defense: 88, allAttackUp: 50, criticalDamage: 3, penetration: 5 }
  },
  highest: {
    0: {},
    1: { hp: 60, defense: 14 },
    2: { hp: 70, defense: 20 },
    3: { hp: 80, defense: 26 },
    4: { hp: 90, defense: 32 },
    5: { hp: 100, defense: 38 },
    6: { hp: 110, defense: 44 },
    7: { hp: 120, defense: 50, allAttackUp: 15 },
    8: { hp: 130, defense: 56, allAttackUp: 20 },
    9: { hp: 140, defense: 62, allAttackUp: 25 },
    10: { hp: 150, defense: 68, allAttackUp: 30 },
    11: { hp: 160, defense: 74, allAttackUp: 35 },
    12: { hp: 170, defense: 80, allAttackUp: 40 },
    13: { hp: 180, defense: 86, allAttackUp: 45, criticalDamage: 2 },
    14: { hp: 190, defense: 92, allAttackUp: 50, criticalDamage: 3 },
    15: { hp: 200, defense: 98, allAttackUp: 55, criticalDamage: 4, penetration: 10 }
  },
  ultimate: {
    0: {},
    1: { hp: 80, defense: 24 },
    2: { hp: 90, defense: 30 },
    3: { hp: 100, defense: 36 },
    4: { hp: 110, defense: 42 },
    5: { hp: 120, defense: 48 },
    6: { hp: 130, defense: 54 },
    7: { hp: 140, defense: 60, allAttackUp: 20 },
    8: { hp: 150, defense: 66, allAttackUp: 25 },
    9: { hp: 160, defense: 72, allAttackUp: 30 },
    10: { hp: 170, defense: 78, allAttackUp: 35 },
    11: { hp: 180, defense: 84, allAttackUp: 40 },
    12: { hp: 190, defense: 90, allAttackUp: 45 },
    13: { hp: 200, defense: 96, allAttackUp: 50, criticalDamage: 3 },
    14: { hp: 210, defense: 102, allAttackUp: 55, criticalDamage: 4 },
    15: { hp: 220, defense: 108, allAttackUp: 60, criticalDamage: 5, penetration: 15 }
  }
};

// Helper function to get divine upgrade stats based on grade and level
export const getVehicleDivineUpgradeStats = (
  grade: string,
  level: number
): VehicleDivineUpgradeLevel => {
  if (!vehicleDivineUpgrades[grade] || !vehicleDivineUpgrades[grade][level]) {
    return {};
  }
  
  return vehicleDivineUpgrades[grade][level];
};