/**
 * Epic Options Data for Equipment System
 * Contains definitions for epic option stats, suffixes, slot options, and Master epic options
 */

import { EpicOption, SlotOption, WeaponStatType } from './types';

/**
 * Interface for multi-stat Master epic options
 */
export interface WeaponMasterEpicOption {
  [statName: string]: number;
}

/**
 * Interface for Master epic option definitions
 */
export interface WeaponMasterEpicOptionDefinition {
  name: string;
  description?: string;
  levels: WeaponMasterEpicOption[];
}

/**
 * Epic option stat to suffix mapping
 */
export const epicOptionSuffixes: Record<string, string> = {
  allSkillAmp: 'of Outrageous',
  criticalDamage: 'of Fatal',
  criticalRate: 'of Fatal'
};

/**
 * Epic option stats by grade and level
 * Levels 1-6: Very Low, Low, Medium Low, Medium High, High, Very High
 */
export const epicOptionLevels: Record<string, Record<string, number[]>> = {
  low: {
    allSkillAmp: [2, 3, 4, 5, 6, 7],      // [Very Low, Low, Medium Low, Medium High, High, Very High]
    criticalDamage: [4, 5, 7, 12, 14, 16],   // [Very Low, Low, Medium Low, Medium High, High, Very High]
    criticalRate: [2, 3, 4, 6, 7, 8]         // [Very Low, Low, Medium Low, Medium High, High, Very High]
  },
  medium: {
    allSkillAmp: [2, 3, 4, 6, 7, 8],      // [Very Low, Low, Medium Low, Medium High, High, Very High]
    criticalDamage: [5, 6, 8, 14, 16, 18],   // [Very Low, Low, Medium Low, Medium High, High, Very High]
    criticalRate: [2, 3, 4, 7, 8, 9]         // [Very Low, Low, Medium Low, Medium High, High, Very High]
  },
  high: {
    allSkillAmp: [3, 4, 5, 7, 8, 10],     // [Very Low, Low, Medium Low, Medium High, High, Very High]
    criticalDamage: [6, 7, 10, 16, 18, 20],  // [Very Low, Low, Medium Low, Medium High, High, Very High]
    criticalRate: [3, 4, 5, 8, 9, 10]        // [Very Low, Low, Medium Low, Medium High, High, Very High]
  },
  highest: {
    allSkillAmp: [3, 4, 5, 7, 8, 10],     // [Very Low, Low, Medium Low, Medium High, High, Very High]
    criticalDamage: [6, 7, 10, 16, 18, 20],  // [Very Low, Low, Medium Low, Medium High, High, Very High]
    criticalRate: [3, 4, 5, 8, 9, 10]        // [Very Low, Low, Medium Low, Medium High, High, Very High]
  },
  ultimate: {
    allSkillAmp: [4, 5, 6, 8, 9, 11],     // [Very Low, Low, Medium Low, Medium High, High, Very High]
    criticalDamage: [9, 11, 13, 19, 23, 27],  // [Very Low, Low, Medium Low, Medium High, High, Very High]
    criticalRate: [4, 5, 6, 9, 10, 11]       // [Very Low, Low, Medium Low, Medium High, High, Very High]
  }
};

/**
 * Master epic options organized by grade and hand type
 * Structure: Grade → HandType → OptionName → WeaponMasterEpicOptionDefinition
 * Each option provides multiple stats with scaling values across 3 levels
 * One-handed and two-handed weapons have separate entries for different stat values
 */
export const weaponMasterEpicOptions: Record<string, Record<WeaponStatType, Record<string, WeaponMasterEpicOptionDefinition>>> = {
  highest: {
    oneHanded: {
      "combat_mastery": {
        name: "Master",
        description: "Balanced combat enhancement",
        levels: [
          { criticalDamage: 18, allAttackUp: 40, allSkillAmp: 3 },
          { criticalDamage: 20, allAttackUp: 40, allSkillAmp: 3 },
          { criticalDamage: 22, allAttackUp: 40, allSkillAmp: 3 }
        ]
      }
    },
    twoHanded: {
      "combat_mastery": {
        name: "Master",
        description: "Balanced combat enhancement",
        levels: [
          { criticalDamage: 36, allAttackUp: 80, allSkillAmp: 6 },
          { criticalDamage: 40, allAttackUp: 80, allSkillAmp: 6 },
          { criticalDamage: 44, allAttackUp: 80, allSkillAmp: 6 }
        ]
      }
    }
  }
};

/**
 * Grade-based slot options for weapons
 * Each grade has normal and enhanced values (enhanced when slot extender is used)
 */
export const weaponSlotOptionsByGrade: Record<string, { normal: SlotOption; enhanced: SlotOption }> = {
  low: {
    normal: {
      criticalDamage: 8,
      criticalRate: 4,
      swordSkillAmp: 6,
      magicSkillAmp: 6
    },
    enhanced: {
      criticalDamage: 10,
      criticalRate: 5,
      swordSkillAmp: 7,
      magicSkillAmp: 7
    }
  },
  medium: {
    normal: {
      criticalDamage: 9,
      criticalRate: 4,
      swordSkillAmp: 7,
      magicSkillAmp: 7
    },
    enhanced: {
      criticalDamage: 11,
      criticalRate: 6,
      swordSkillAmp: 8,
      magicSkillAmp: 8
    }
  },
  high: {
    normal: {
      criticalDamage: 10,
      criticalRate: 5,
      swordSkillAmp: 7,
      magicSkillAmp: 7
    },
    enhanced: {
      criticalDamage: 12,
      criticalRate: 8,
      swordSkillAmp: 10,
      magicSkillAmp: 10
    }
  },
  highest: {
    normal: {
      criticalDamage: 10,
      criticalRate: 5,
      swordSkillAmp: 7,
      magicSkillAmp: 7
    },
    enhanced: {
      criticalDamage: 12,
      criticalRate: 8,
      swordSkillAmp: 10,
      magicSkillAmp: 10
    }
  },
  ultimate: {
    normal: {
      criticalDamage: 12,
      criticalRate: 6,
      swordSkillAmp: 8,
      magicSkillAmp: 8
    },
    enhanced: {
      criticalDamage: 18,
      criticalRate: 8,
      swordSkillAmp: 11,
      magicSkillAmp: 11
    }
  }
};

/**
 * Legacy slot options for backward compatibility
 * @deprecated Use weaponSlotOptionsByGrade instead
 */
export const slotOptions: SlotOption = {
  criticalDamage: 10,
  criticalRate: 5,
  swordSkillAmp: 7,
  magicSkillAmp: 7
};

/**
 * Legacy enhanced slot options for backward compatibility
 * @deprecated Use weaponSlotOptionsByGrade instead
 */
export const enhancedSlotOptions: SlotOption = {
  criticalDamage: 12,
  criticalRate: 8,
  swordSkillAmp: 10,
  magicSkillAmp: 10
};

/**
 * Get epic option stat value for a specific stat, grade and level
 * @param stat The stat type (criticalDamage, criticalRate, allSkillAmp, etc.)
 * @param grade The equipment grade (low, medium, high, highest, ultimate)
 * @param level The epic option level (1=Very Low, 2=Low, 3=Medium Low, 4=Medium High, 5=High, 6=Very High)
 * @param handType Optional weapon hand type - two-handed weapons get double the stats
 * @returns The stat value for the specified parameters
 */
export function getEpicOptionStatValue(stat: string, grade: string, level: number = 5, handType?: WeaponStatType): number {
  // Default to highest grade if the grade doesn't exist
  const gradeData = epicOptionLevels[grade] || epicOptionLevels.highest;
  // Get the levels array for this stat
  const levels = gradeData[stat];
  
  if (!levels) return 0;
  
  // Ensure level is between 1-6
  const validLevel = Math.min(Math.max(1, level), 6);
  // Arrays are 0-indexed, so subtract 1 from level
  const baseValue = levels[validLevel - 1] || 0;
  
  // Double the value for two-handed weapons
  return handType === 'twoHanded' ? baseValue * 2 : baseValue;
}

/**
 * Get epic option suffix for a stat
 */
export function getEpicOptionSuffix(stat: string): string {
  return epicOptionSuffixes[stat] || '';
}

/**
 * Get available epic option stats
 */
export function getAvailableEpicStats(): string[] {
  return Object.keys(epicOptionSuffixes);
}

/**
 * Get slot options for a weapon based on grade and extension status
 * @param weaponGrade The weapon grade (low, medium, high, highest, ultimate)
 * @param isExtended Whether the weapon has been extended with a slot extender
 * @param handType Optional weapon hand type - two-handed weapons get double the stats
 * @returns The appropriate slot options for the weapon
 */
export function getWeaponSlotOptions(weaponGrade: string, isExtended: boolean = false, handType?: WeaponStatType): SlotOption {
  const gradeOptions = weaponSlotOptionsByGrade[weaponGrade];
  if (!gradeOptions) {
    // Fallback to highest grade if grade not found
    const fallbackOptions = isExtended ? weaponSlotOptionsByGrade.highest.enhanced : weaponSlotOptionsByGrade.highest.normal;
    return handType === 'twoHanded' ? doubleSlotOptions(fallbackOptions) : fallbackOptions;
  }
  
  const baseOptions = isExtended ? gradeOptions.enhanced : gradeOptions.normal;
  return handType === 'twoHanded' ? doubleSlotOptions(baseOptions) : baseOptions;
}

/**
 * Helper function to double all slot option values for two-handed weapons
 * @param options The base slot options
 * @returns Slot options with all values doubled
 */
function doubleSlotOptions(options: SlotOption): SlotOption {
  const doubled: Partial<SlotOption> = {};
  Object.entries(options).forEach(([key, value]) => {
    doubled[key as keyof SlotOption] = value * 2;
  });
  return doubled as SlotOption;
}

/**
 * Get available weapon slot stats
 * @returns Array of available slot stat names for weapons
 */
export function getAvailableWeaponSlotStats(): string[] {
  const slotOptions = getWeaponSlotOptions('highest', false, 'oneHanded'); // Use highest normal to get all available stats
  return Object.keys(slotOptions).filter(key => slotOptions[key as keyof SlotOption] !== undefined);
}

/**
 * Get weapon slot stat value for a specific stat
 * @param weaponGrade The weapon grade
 * @param statName The stat name (criticalDamage, criticalRate, swordSkillAmp, magicSkillAmp)
 * @param isExtended Whether the weapon has been extended with a slot extender
 * @param handType Optional weapon hand type - two-handed weapons get double the stats
 * @returns The stat value, or 0 if the stat is not available
 */
export function getWeaponSlotStatValue(weaponGrade: string, statName: string, isExtended: boolean = false, handType?: WeaponStatType): number {
  const slotOptions = getWeaponSlotOptions(weaponGrade, isExtended, handType);
  return slotOptions[statName as keyof SlotOption] || 0;
}

/**
 * Check if a specific stat is available for weapons
 * @param statName The stat name to check
 * @returns True if the stat is available for weapons
 */
export function isWeaponSlotStatAvailable(statName: string): boolean {
  const availableStats = getAvailableWeaponSlotStats();
  return availableStats.includes(statName);
}

// ============================================================================
// MASTER EPIC OPTIONS FUNCTIONS
// ============================================================================

/**
 * Get Master epic option values for a specific hand type, option name, grade and level
 * @param handType The weapon hand type (oneHanded, twoHanded)
 * @param optionName The Master option name (e.g., "combat_mastery")
 * @param grade The equipment grade (low, medium, high, highest, ultimate)
 * @param level The Master option level (1, 2, 3)
 * @returns The multi-stat values for the specified parameters, or empty object if not available
 */
export function getWeaponMasterEpicOption(
  handType: WeaponStatType,
  optionName: string,
  grade: string,
  level: number = 1
): WeaponMasterEpicOption {
  const gradeData = weaponMasterEpicOptions[grade];
  if (!gradeData) return {};
  
  const handTypeData = gradeData[handType];
  if (!handTypeData) return {};
  
  const optionDefinition = handTypeData[optionName];
  if (!optionDefinition) return {};
  
  // Ensure level is between 1-3
  const validLevel = Math.min(Math.max(1, level), 3);
  // Arrays are 0-indexed, so subtract 1 from level
  return optionDefinition.levels[validLevel - 1] || {};
}

/**
 * Get available Master epic options for a specific hand type and grade
 * @param handType The weapon hand type (oneHanded, twoHanded)
 * @param grade The equipment grade (low, medium, high, highest, ultimate)
 * @returns Array of available Master epic option names for the hand type and grade
 */
export function getAvailableWeaponMasterEpicOptions(handType: WeaponStatType, grade: string): string[] {
  const gradeData = weaponMasterEpicOptions[grade];
  if (!gradeData) return [];
  
  const handTypeData = gradeData[handType];
  if (!handTypeData) return [];
  
  return Object.keys(handTypeData);
}

/**
 * Get Master epic option definition for a specific hand type, option name and grade
 * @param handType The weapon hand type (oneHanded, twoHanded)
 * @param optionName The Master option name
 * @param grade The equipment grade
 * @returns The Master epic option definition, or null if not available
 */
export function getWeaponMasterEpicOptionDefinition(
  handType: WeaponStatType,
  optionName: string,
  grade: string
): WeaponMasterEpicOptionDefinition | null {
  const gradeData = weaponMasterEpicOptions[grade];
  if (!gradeData) return null;
  
  const handTypeData = gradeData[handType];
  if (!handTypeData) return null;
  
  return handTypeData[optionName] || null;
}

/**
 * Get maximum Master epic option level for a specific hand type, option name and grade
 * @param handType The weapon hand type (oneHanded, twoHanded)
 * @param optionName The Master option name
 * @param grade The equipment grade
 * @returns The maximum level available (always 3 for Master options)
 */
export function getWeaponMasterEpicOptionMaxLevel(handType: WeaponStatType, optionName: string, grade: string): number {
  const definition = getWeaponMasterEpicOptionDefinition(handType, optionName, grade);
  return definition ? definition.levels.length : 0;
}

/**
 * Check if a specific Master option is available for a hand type and grade
 * @param handType The weapon hand type (oneHanded, twoHanded)
 * @param optionName The Master option name to check
 * @param grade The equipment grade
 * @returns True if the Master option is available for this hand type and grade
 */
export function isWeaponMasterEpicOptionAvailable(handType: WeaponStatType, optionName: string, grade: string): boolean {
  const availableOptions = getAvailableWeaponMasterEpicOptions(handType, grade);
  return availableOptions.includes(optionName);
}

/**
 * Get all available grades that have Master epic options for weapons
 * @returns Array of available grade names
 */
export function getAvailableWeaponMasterEpicGrades(): string[] {
  return Object.keys(weaponMasterEpicOptions);
}

/**
 * Get all available hand types that have Master epic options
 * @returns Array of available hand types
 */
export function getAvailableWeaponMasterEpicHandTypes(): WeaponStatType[] {
  // Get hand types from the first grade (all grades should have the same hand types)
  const firstGrade = Object.values(weaponMasterEpicOptions)[0];
  return firstGrade ? Object.keys(firstGrade) as WeaponStatType[] : [];
}