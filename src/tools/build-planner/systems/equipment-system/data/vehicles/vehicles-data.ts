/**
 * Vehicle data and utility functions
 * Contains vehicle data, epic options, slot options, and calculation functions
 */

import { Vehicle, VehicleStats, VehicleEpicOption, VehicleSlotOption } from './vehicle-types';
import { getVehicleById, getAllVehicles } from './vehicle-templates';
import { vehicleExtremeUpgrades, getVehicleExtremeUpgradeStats } from './vehicle-extreme-upgrades';
import { getVehicleDivineUpgradeStats } from './vehicle-divine-upgrades';

/**
 * Grade-based slot options for vehicles
 * Each grade has normal and enhanced values (enhanced when slot extender is used)
 */
export const vehicleSlotOptionsByGrade: Record<string, { normal: Record<string, number>; enhanced: Record<string, number> }> = {
  medium: {
    normal: {
      criticalDamage: 4,
      criticalRate: 3,
      attackRate: 3,
      hp: 180
    },
    enhanced: {
      criticalDamage: 6,
      criticalRate: 4,
      attackRate: 4,
      hp: 250
    }
  },
  high: {
    normal: {
      criticalDamage: 8,
      maxCriticalRate: 2,
      swordSkillAmp: 4,
      magicSkillAmp: 4,
      criticalRate: 4
    },
    enhanced: {
      criticalDamage: 10,
      maxCriticalRate: 2,
      swordSkillAmp: 5,
      magicSkillAmp: 5,
      criticalRate: 5
    }
  },
  highest: {
    normal: {
      maxCriticalRate: 2,
      penetration: 20,
      criticalRate: 4,
      swordSkillAmp: 4,
      magicSkillAmp: 4
    },
    enhanced: {
      maxCriticalRate: 2,
      penetration: 25,
      criticalRate: 5,
      swordSkillAmp: 5,
      magicSkillAmp: 5
    }
  },
  ultimate: {
    normal: {
      maxCriticalRate: 2,
      penetration: 20,
      criticalRate: 4,
      swordSkillAmp: 4,
      magicSkillAmp: 4
    },
    enhanced: {
      maxCriticalRate: 2,
      penetration: 25,
      criticalRate: 5,
      swordSkillAmp: 5,
      magicSkillAmp: 5
    }
  }
};

/**
 * Legacy slot options for backward compatibility
 * @deprecated Use vehicleSlotOptionsByGrade instead
 */
export const vehicleSlotOptions: Record<string, number> = {
  criticalDamage: 5,
  criticalRate: 3,
  attackRate: 3,
  hp: 200
};

/**
 * Legacy enhanced slot options for backward compatibility
 * @deprecated Use vehicleSlotOptionsByGrade instead
 */
export const enhancedVehicleSlotOptions: Record<string, number> = {
  criticalDamage: 8,
  criticalRate: 5,
  attackRate: 5,
  hp: 350
};

/**
 * Epic option stats by grade and level for vehicles
 * Different grades can have different numbers of levels
 * Level names: Very Low, Low, Medium Low, Medium High, High, Very High
 */
export const vehicleEpicOptionLevels: Record<string, Record<string, number[]>> = {
  medium: {
    // Blue bike epic options (4 levels only)
    criticalDamage: [4, 6, 8, 10],              // [Very Low, Low, Medium Low, Medium High]
    criticalRate: [2, 3, 4, 5],                 // [Very Low, Low, Medium Low, Medium High]
    allAttackUp: [20, 30, 40, 50],          // [Very Low, Low, Medium Low, Medium High]
    allSkillAmp: [2, 3, 4, 5],              // [Very Low, Low, Medium Low, Medium High]
    hp: [150, 200, 250, 300],               // [Very Low, Low, Medium Low, Medium High]
    resistCriticalRate: [2, 3, 5, 7],           // [Very Low, Low, Medium Low, Medium High]
    resistCriticalDamage: [10, 12, 16, 20],        // [Very Low, Low, Medium Low, Medium High]
    resistSkillAmp: [4, 5, 7, 9]            // [Very Low, Low, Medium Low, Medium High]
  },
  high: {
    criticalDamage: [7, 9, 12, 14, 16],         // [Very Low, Low, Medium Low, Medium High, High] - 5 levels
    criticalRate: [4, 5, 6, 7, 9],              // [Very Low, Low, Medium Low, Medium High, High] - 5 levels
    allAttackUp: [35, 45, 55, 65, 85],      // [Very Low, Low, Medium Low, Medium High, High] - 5 levels
    allSkillAmp: [4, 5, 6, 7, 9],           // [Very Low, Low, Medium Low, Medium High, High] - 5 levels
    hp: [200, 280, 360, 440, 520],          // [Very Low, Low, Medium Low, Medium High, High] - 5 levels
    resistCriticalRate: [3, 5, 7, 8, 10],       // [Very Low, Low, Medium Low, Medium High, High] - 5 levels
    resistCriticalDamage: [12, 16, 20, 22, 26],    // [Very Low, Low, Medium Low, Medium High, High] - 5 levels
    resistSkillAmp: [5, 7, 9, 10, 12]       // [Very Low, Low, Medium Low, Medium High, High] - 5 levels
  },
  highest: {
    criticalDamage: [10, 12, 14, 16, 18, 20],   // [Very Low, Low, Medium Low, Medium High, High, Very High]
    criticalRate: [6, 7, 8, 9, 10, 11],       // [Very Low, Low, Medium Low, Medium High, High, Very High]
    allSkillAmp: [6, 7, 8, 9, 10, 11],
    hp: [300, 400, 500, 600, 700,800],
    allAttackUp: [50,60,70,80,100,120],   // [Very Low, Low, Medium Low, Medium High, High] - 5 levels
    resistSkillAmp: [6, 8, 10, 12, 13, 14],
    penetration: [35,45,55,65,80,95],
    accuracy: [200,280,360,440,520,600]    // [Very Low, Low, Medium Low, Medium High, High, Very High]
  },
  ultimate: {
    criticalDamage: [12, 15, 17, 19, 20, 23],   // [Very Low, Low, Medium Low, Medium High, High, Very High]
    criticalRate: [8,9,10,11,12,13],
    allAttackUp: [110,125,140,165,190,220],    // [Very Low, Low, Medium Low, Medium High, High, Very High]
    allSkillAmp: [4, 5, 6, 7, 8, 9],
    accuracy: [300,400,500,600,700,800],
    penetration: [50,60,70,80,95,110],
    ignoreResistCriticalDamage: [16,20,24,28,32,38],
    ignoreResistSkillAmp: [7,9,11,13,15,18],
    hp: [400,520,640,760,880,1000],
    resistCriticalDamage: [20,24,28,32,36,42],
    resistSkillAmp: [9,11,13,15,17,20],
    ignorePenetration: [70,80,90,100,115,130]        // [Very Low, Low, Medium Low, Medium High, High, Very High]
  }
};

/**
 * Cumulative upgrade stats organized by vehicle type and grade (levels 0-20)
 * These are TOTAL BONUS stats added to base stats at each level
 * Based on official upgrade tables
 */
export const cumulativeVehicleUpgradeStats: Record<string, Record<string, Record<string, number[]>>> = {
  bike: {
    medium: {
      // Blue bike upgrade stats (levels 0-20) - cumulative
      defense: [0, 3, 6, 9, 14, 19, 24, 31, 38, 45, 54, 63, 72, 83, 94, 105, 116, 127, 138, 149, 160],
      defenseRate: [0, 20, 40, 60, 90, 120, 150, 190, 230, 270, 320, 370, 420, 480, 540, 600, 660, 720, 780, 840, 900],
      movementSpeed: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 150, 150, 150, 150, 150],
      penetration: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2, 3, 4, 5]
    },
    high: {
      // RW3 bike upgrade stats (levels 0-20) - cumulative
      defense: [0, 5, 10, 15, 23, 31, 39, 50, 61, 72, 86, 100, 114, 131, 148, 165, 187, 204, 221, 238, 255],
      defenseRate: [0, 30, 60, 90, 130, 170, 210, 270, 330, 390, 460, 530, 600, 680, 760, 840, 850, 920, 990, 1060, 1130],
      movementSpeed: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 150, 150, 150, 150, 150],
      penetration: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 6, 8, 10, 12]
    },
    highest: {
      // PW5 bike upgrade stats (levels 0-20) - cumulative
      defense: [0, 7, 14, 21, 32, 43, 54, 69, 84, 99, 118, 137, 156, 179, 202, 225, 259, 284, 310, 337, 365],
      defenseRate: [0, 40, 80, 120, 170, 220, 270, 330, 390, 450, 520, 590, 660, 740, 820, 900, 982, 1064, 1147, 1231, 1316],
      movementSpeed: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 150, 150, 150, 150, 150],
      penetration: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 9, 12, 15, 18]
    },
    ultimate: {
      // QW7 bike upgrade stats (levels 0-20) - cumulative
      defense: [0, 9, 18, 27, 41, 55, 69, 88, 107, 126, 150, 174, 198, 227, 256, 285, 333, 382, 422, 463, 505],
      defenseRate: [0, 50, 100, 150, 210, 270, 330, 400, 470, 540, 620, 700, 780, 870, 960, 1050, 1151, 1248, 1346, 1445, 1545],
      movementSpeed: [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 150, 150, 150, 150, 150],
      penetration: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 4, 8, 12, 16, 20, 24]
    }
  }
  // Hoverboards removed - will be added later as requested
};

// Base upgrade stats calculation using cumulative arrays
export const getVehicleBaseUpgradeStats = (
  grade: string,
  subtype: string,
  level: number
): VehicleStats => {
  const stats: VehicleStats = {};
  
  // Check if we have data for this vehicle type and grade
  const vehicleData = cumulativeVehicleUpgradeStats[subtype];
  if (!vehicleData) {
    console.warn(`No base upgrade data found for vehicle type: ${subtype}`);
    return stats;
  }
  
  const gradeData = vehicleData[grade];
  if (!gradeData) {
    console.warn(`No base upgrade data found for vehicle type: ${subtype}, grade: ${grade}`);
    return stats;
  }
  
  // Apply stats from the cumulative arrays
  Object.entries(gradeData).forEach(([stat, values]) => {
    const validLevel = Math.min(Math.max(0, level), values.length - 1);
    stats[stat as keyof VehicleStats] = values[validLevel] || 0;
  });
  
  return stats;
};

// Get available epic stats for a specific grade
export const getAvailableVehicleEpicStats = (grade?: string): string[] => {
  if (!grade) {
    // Return all possible epic stats across all grades
    const allStats = new Set<string>();
    Object.values(vehicleEpicOptionLevels).forEach(gradeData => {
      Object.keys(gradeData).forEach(stat => allStats.add(stat));
    });
    return Array.from(allStats);
  }
  
  // Return stats available for specific grade
  const gradeData = vehicleEpicOptionLevels[grade];
  return gradeData ? Object.keys(gradeData) : [];
};

/**
 * Get epic option stat value for a specific stat, grade and level
 * @param stat The stat type (criticalDamage, criticalRate, allAttackUp, allSkillAmp, hp, resistCriticalRate, resistCriticalDamage, resistSkillAmp, movementSpeed)
 * @param grade The equipment grade (medium, high, highest, ultimate)
 * @param level The epic option level (1=Very Low, 2=Low, 3=Medium Low, 4=Medium High, 5=High, 6=Very High)
 * @returns The stat value for the specified parameters
 */
export const getVehicleEpicOptionStatValue = (
  stat: string,
  grade: string,
  level: number = 1
): number => {
  // Default to highest grade if the grade doesn't exist
  const gradeData = vehicleEpicOptionLevels[grade] || vehicleEpicOptionLevels.highest;
  // Get the levels array for this stat
  const levels = gradeData[stat];
  
  if (!levels) return 0;
  
  // Ensure level is within the available range for this grade/stat combination
  const maxLevel = levels.length;
  const validLevel = Math.min(Math.max(1, level), maxLevel);
  // Arrays are 0-indexed, so subtract 1 from level
  return levels[validLevel - 1] || 0;
};

// Get epic option suffix
export const getVehicleEpicOptionSuffix = (stat: string): string => {
  const suffixes: Record<string, string> = {
    criticalDamage: '%',
    criticalRate: '%',
    movementSpeed: '%',
    allSkillAmp: '%',
    allAttackUp: '',
    hp: '',
    resistCriticalRate: '%',
    resistCriticalDamage: '%',
    resistSkillAmp: '%'
  };

  return suffixes[stat] || '';
};

/**
 * Get the maximum level available for a specific stat and grade combination
 * @param stat The stat type
 * @param grade The equipment grade
 * @returns The maximum level available (number of levels in the array)
 */
export const getVehicleEpicOptionMaxLevel = (stat: string, grade: string): number => {
  const gradeData = vehicleEpicOptionLevels[grade];
  if (!gradeData || !gradeData[stat]) return 0;
  
  return gradeData[stat].length;
};

// Helper function to calculate total stats for a vehicle
export const calculateVehicleTotalStats = (
  vehicle: Vehicle,
  baseUpgradeLevel: number = 0,
  extremeUpgradeLevel: number = 0,
  divineUpgradeLevel: number = 0,
  epicOptionStat: string | null = null,
  slots: Array<{ isActive: boolean; selectedStat: string | null }> = [],
  epicOptionLevel: number = 1,
  isExtended: boolean = false
): Record<string, number> => {
  // Start with base stats
  const stats: Record<string, number> = { ...vehicle.baseStats } as Record<string, number>;
  
  // Add base upgrade stats
  if (baseUpgradeLevel > 0) {
    const baseStats = getVehicleBaseUpgradeStats(vehicle.grade, vehicle.subtype, baseUpgradeLevel);
    Object.entries(baseStats).forEach(([stat, value]) => {
      if (value !== undefined) {
        stats[stat] = (stats[stat] || 0) + value;
      }
    });
  }
  
  // Add extreme upgrade stats
  if (extremeUpgradeLevel > 0) {
    const extremeStats = getVehicleExtremeUpgradeStats(vehicle.grade, extremeUpgradeLevel);
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
    const divineStats = getVehicleDivineUpgradeStats(vehicle.grade, divineUpgradeLevel);
    if (divineStats) {
      Object.entries(divineStats).forEach(([stat, value]) => {
        if (value !== undefined) {
          stats[stat] = (stats[stat] || 0) + value;
        }
      });
    }
  }
  
  // Add epic option stats
  if (epicOptionStat) {
    // Get value directly for the specified level
    const statValue = getVehicleEpicOptionStatValue(epicOptionStat, vehicle.grade, epicOptionLevel);
    
    if (statValue > 0) {
      stats[epicOptionStat] = (stats[epicOptionStat] || 0) + statValue;
    }
  }
  
  // Add slot stats using the extension-aware system
  const slotOptionsToUse = getVehicleSlotOptions(vehicle.grade, isExtended);
  
  slots.forEach(slot => {
    if (slot.isActive && slot.selectedStat) {
      const statValue = slotOptionsToUse[slot.selectedStat] || 0;
      stats[slot.selectedStat] = (stats[slot.selectedStat] || 0) + statValue;
    }
  });
  
  return stats;
};

/**
 * Get slot options for a vehicle based on grade and extension status
 * @param vehicleGrade The vehicle grade (low, medium, high, highest, ultimate)
 * @param isExtended Whether the vehicle has been extended with a slot extender
 * @returns The appropriate slot options for the vehicle
 */
export function getVehicleSlotOptions(vehicleGrade: string, isExtended: boolean = false): Record<string, number> {
  const gradeOptions = vehicleSlotOptionsByGrade[vehicleGrade];
  if (!gradeOptions) {
    // Fallback to highest grade if grade not found
    return isExtended ? vehicleSlotOptionsByGrade.highest.enhanced : vehicleSlotOptionsByGrade.highest.normal;
  }
  
  return isExtended ? gradeOptions.enhanced : gradeOptions.normal;
}

/**
 * Get available vehicle slot stats
 * @returns Array of available slot stat names for vehicles
 */
export function getAvailableVehicleSlotStats(): string[] {
  const slotOptions = getVehicleSlotOptions('highest', false); // Use highest normal to get all available stats
  return Object.keys(slotOptions).filter(key => slotOptions[key] !== undefined);
}

/**
 * Get vehicle slot stat value for a specific stat
 * @param vehicleGrade The vehicle grade
 * @param statName The stat name (criticalDamage, criticalRate, attackRate, hp)
 * @param isExtended Whether the vehicle has been extended with a slot extender
 * @returns The stat value, or 0 if the stat is not available
 */
export function getVehicleSlotStatValue(vehicleGrade: string, statName: string, isExtended: boolean = false): number {
  const slotOptions = getVehicleSlotOptions(vehicleGrade, isExtended);
  return slotOptions[statName] || 0;
}

/**
 * Check if a specific stat is available for vehicles
 * @param statName The stat name to check
 * @returns True if the stat is available for vehicles
 */
export function isVehicleSlotStatAvailable(statName: string): boolean {
  const availableStats = getAvailableVehicleSlotStats();
  return availableStats.includes(statName);
}

// Export all vehicles for use in the UI
export const vehicles: Vehicle[] = getAllVehicles();