/**
 * Vehicle extreme upgrade data
 * Contains upgrade levels and effects for vehicle extreme upgrades
 */

import { VehicleExtremeUpgradeLevel } from './vehicle-types';

// Define extreme upgrade levels for vehicles based on the bike upgrade table
export const vehicleExtremeUpgrades: Record<number, VehicleExtremeUpgradeLevel> = {
  0: {},
  1: {
    defense: 30,
    defenseRate: 40,
  },
  2: {
    defense: 80,
    defenseRate: 100,
    accuracy: 120,
  },
  3: {
    defense: 120,
    defenseRate: 160,
    accuracy: 240,
    allSkillAmp: 4,
  },
  4: {
    defense: 160,
    defenseRate: 220,
    accuracy: 360,
    allSkillAmp: 7,
    penetration: 50,
  },
  5: {
    defense: 200,
    defenseRate: 280,
    accuracy: 480,
    allSkillAmp: 10,
    penetration: 100,
    ignorePenetration: 60,
  },
  6: {
    defense: 250,
    defenseRate: 350,
    accuracy: 600,
    allSkillAmp: 13,
    penetration: 150,
    ignorePenetration: 90,
  },
};

// Helper function to get extreme upgrade stats based on grade and level
export const getVehicleExtremeUpgradeStats = (
  grade: string,
  level: number
): VehicleExtremeUpgradeLevel => {
  // Currently returning the same stats regardless of grade
  // This can be expanded later to have grade-specific modifiers
  return vehicleExtremeUpgrades[level] || {};
};