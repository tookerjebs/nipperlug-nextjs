/**
 * Armor Epic Options Data for Equipment System
 * Contains definitions for epic option stats organized by grade and armor type
 * Each armor type has different available epic stats and values
 */

import { ArmorStatType } from './armor-types';

/**
 * Interface for Master epic options (multi-stat)
 */
export interface ArmorMasterEpicOption {
  [statName: string]: number;
}

/**
 * Interface for Master epic option definitions
 */
export interface ArmorMasterEpicOptionDefinition {
  name: string;
  description?: string;
  levels: ArmorMasterEpicOption[];
}



/**
 * Epic option stats organized by grade and armor type
 * Structure: Grade → ArmorType → Stat → Values[]
 * Levels 1-6: Very Low, Low, Medium Low, Medium High, High, Very High
 */
export const armorEpicOptionsByGradeAndType: Record<string, Record<ArmorStatType, Record<string, number[]>>> = {
  low: {
    body: {
      swordSkillAmp: [2, 3, 4, 5, 6, 7],
      magicSkillAmp: [2, 3, 4, 5, 6, 7],
      resistCriticalDamage: [1, 2, 3, 4, 5, 6],
    },
    helmet: {
      swordSkillAmp: [2, 3, 4, 5, 6, 7],
      magicSkillAmp: [2, 3, 4, 5, 6, 7],
      resistSkillAmp: [2, 3, 4, 5, 6, 7],
      criticalDamage: [6, 7, 10, 17, 18, 20],
      criticalRate: [3, 4, 5, 8, 9, 10],
    },
    gauntlet: {
      swordSkillAmp: [2, 3, 4, 5, 6, 7],
      magicSkillAmp: [2, 3, 4, 5, 6, 7],
      damageReduction: [1, 2, 3, 4, 5, 6],
    },
    shoes: {
      swordSkillAmp: [2, 3, 4, 5, 6, 7],
      magicSkillAmp: [2, 3, 4, 5, 6, 7],
      resistCriticalDamage: [1, 2, 3, 4, 5, 6],
    }
  },
  medium: {
    body: {
      swordSkillAmp: [2, 3, 4, 6, 7, 8],
      magicSkillAmp: [2, 3, 4, 6, 7, 8],
      resistCriticalDamage: [2, 3, 4, 5, 6, 7],
    },
    helmet: {
      swordSkillAmp: [2, 3, 4, 6, 7, 8],
      magicSkillAmp: [2, 3, 4, 6, 7, 8],
      resistSkillAmp: [2, 3, 4, 6, 7, 8],
      criticalDamage: [6, 7, 10, 16, 18, 20],
      criticalRate: [3, 4, 5, 8, 9, 10],
    },
    gauntlet: {
      swordSkillAmp: [2, 3, 4, 6, 7, 8],
      magicSkillAmp: [2, 3, 4, 6, 7, 8],
      damageReduction: [2, 3, 4, 5, 6, 7],
    },
    shoes: {
      swordSkillAmp: [2, 3, 4, 6, 7, 8],
      magicSkillAmp: [2, 3, 4, 6, 7, 8],
      resistCriticalDamage: [2, 3, 4, 5, 6, 7],
    }
  },
  high: {
    body: {
      swordSkillAmp: [3, 4, 5, 7, 8, 10],
      magicSkillAmp: [3, 4, 5, 7, 8, 10],
      resistCriticalDamage: [2, 3, 4, 6, 7, 8],
    },
    helmet: {
      swordSkillAmp: [3, 4, 5, 7, 8, 10],
      magicSkillAmp: [3, 4, 5, 7, 8, 10],
      resistSkillAmp: [3, 4, 5, 7, 8, 10],
      criticalDamage: [6, 7, 10, 16, 18, 20],
      criticalRate: [3, 4, 5, 8, 9, 10],
    },
    gauntlet: {
      swordSkillAmp: [3, 4, 5, 7, 8, 10],
      magicSkillAmp: [3, 4, 5, 7, 8, 10],
      damageReduction: [2, 3, 4, 6, 7, 8],
    },
    shoes: {
      swordSkillAmp: [3, 4, 5, 7, 8, 10],
      magicSkillAmp: [3, 4, 5, 7, 8, 10],
      resistCriticalDamage: [2, 3, 4, 6, 7, 8],
    }
  },
  highest: {
    body: {
      swordSkillAmp: [3, 4, 5, 7, 8, 10],
      magicSkillAmp: [3, 4, 5, 7, 8, 10],
      resistCriticalDamage: [3, 4, 5, 6, 7, 9],
    },
    helmet: {
      swordSkillAmp: [3, 4, 5, 7, 8, 10],
      magicSkillAmp: [3, 4, 5, 7, 8, 10],
      resistSkillAmp: [3, 4, 5, 7, 8, 10],
      criticalDamage: [6, 7, 10, 16, 18, 20],
      criticalRate: [3, 4, 5, 8, 9, 10],
    },
    gauntlet: {
      swordSkillAmp: [3, 4, 5, 7, 8, 10],
      magicSkillAmp: [3, 4, 5, 7, 8, 10],
      damageReduction: [3, 4, 5, 6, 7, 9],
    },
    shoes: {
      swordSkillAmp: [3, 4, 5, 7, 8, 10],
      magicSkillAmp: [3, 4, 5, 7, 8, 10],
      resistCriticalDamage: [3, 4, 5, 6, 7, 9],
    }
  },
  ultimate: {
    body: {
      swordSkillAmp: [4, 5, 6, 8, 9, 11],
      magicSkillAmp: [4, 5, 6, 8, 9, 11],
      resistCriticalDamage: [3, 4, 6, 7, 8, 10],
    },
    helmet: {
      swordSkillAmp: [4, 5, 6, 8, 9, 11],
      magicSkillAmp: [4, 5, 6, 8, 9, 11],
      resistSkillAmp: [4, 5, 6, 8, 9, 11],
      criticalDamage: [9, 11, 13, 19, 23, 27],
      criticalRate: [4, 5, 6, 9, 10, 11],
    },
    gauntlet: {
      swordSkillAmp: [4, 5, 6, 8, 9, 11],
      magicSkillAmp: [4, 5, 6, 8, 9, 11],
      damageReduction: [3, 4, 6, 7, 8, 10],
    },
    shoes: {
      swordSkillAmp: [4, 5, 6, 8, 9, 11],
      magicSkillAmp: [4, 5, 6, 8, 9, 11],
      resistCriticalDamage: [3, 4, 6, 7, 8, 10],
    }
  }
};

/**
 * Master epic options organized by grade and armor type
 * Structure: Grade → ArmorType → OptionName → ArmorMasterEpicOptionDefinition
 * Each option can provide multiple stats with scaling values across 3 levels
 */
export const armorMasterEpicOptions: Record<string, Record<ArmorStatType, Record<string, ArmorMasterEpicOptionDefinition>>> = {
  low: {
    body: {},
    helmet: {},
    gauntlet: {},
    shoes: {}
  },
  medium: {
    body: {},
    helmet: {},
    gauntlet: {},
    shoes: {}
  },
  high: {
    body: {
      "combat_vitality": {
        name: "Master",
        description: "",
        levels: [
          { allSkillAmp: 9, hp: 250, maxCriticalRate: 2 },
          { allSkillAmp: 10, hp: 250, maxCriticalRate: 2 },
          { allSkillAmp: 11, hp: 250, maxCriticalRate: 2 }
        ]
      }
    },
    helmet: {
      "combat_focus": {
        name: "Master",
        description: "",
        levels: [
          { criticalRate: 9, resistCriticalDamage: 8, allSkillAmp: 2 },
          { criticalRate: 10, resistCriticalDamage: 8, allSkillAmp: 2 },
          { criticalRate: 11, resistCriticalDamage: 8, allSkillAmp: 2 }
        ]
      }
    },
    gauntlet: {
      "combat_defense": {
        name: "Master",
        description: "Sword skill amplification with damage reduction",
        levels: [
          { allSkillAmp: 9, resistCriticalRate: 3, maxCriticalRate: 2 },
          { allSkillAmp: 10, resistCriticalRate: 3, maxCriticalRate: 2 },
          { allSkillAmp: 11, resistCriticalRate: 3, maxCriticalRate: 2 },
        ]
      }
    },
    shoes: {
      "combat_resilience": {
        name: "Master",
        description: "",
        levels: [
          { allSkillAmp: 9, resistSkillAmp: 3, maxHpStealPerHit: 15 },
          { allSkillAmp: 10, resistSkillAmp: 3, maxHpStealPerHit: 15 },
          { allSkillAmp: 10, resistSkillAmp: 3, maxHpStealPerHit: 15 },
        ]
      }
    }
  },
  highest: {
    body: {
      "master_combat": {
        name: "Master",
        description: "",
        levels: [
          { allSkillAmp: 9, hp: 250, maxCriticalRate: 3 },
          { allSkillAmp: 10, hp: 250, maxCriticalRate: 3 },
          { allSkillAmp: 11, hp: 250, maxCriticalRate: 3 }
        ]
      }
    },
    helmet: {
      "combat_focus": {
        name: "Master",
        description: "",
        levels: [
          { criticalRate: 9, resistCriticalDamage: 8, allSkillAmp: 3 },
          { criticalRate: 10, resistCriticalDamage: 8, allSkillAmp: 3 },
          { criticalRate: 11, resistCriticalDamage: 8, allSkillAmp: 3 }
        ]
      }
    },
    gauntlet: {
      "combat_defense": {
        name: "Master",
        description: "Sword skill amplification with damage reduction",
        levels: [
          { allSkillAmp: 9, resistCriticalRate: 4, maxCriticalRate: 3 },
          { allSkillAmp: 10, resistCriticalRate: 4, maxCriticalRate: 3 },
          { allSkillAmp: 11, resistCriticalRate: 4, maxCriticalRate: 3 },
        ]
      }
    },
    shoes: {
      "combat_resilience": {
        name: "Master",
        description: "Sword skill amplification with critical damage resistance",
        levels: [
          { allSkillAmp: 9, resistSkillAmp: 4, maxHpStealPerHit: 20 },
          { allSkillAmp: 10, resistSkillAmp: 4, maxHpStealPerHit: 20 },
          { allSkillAmp: 11, resistSkillAmp: 4, maxHpStealPerHit: 20 },
        ]
      }
    }
  },
  ultimate: {
    body: {
      "master_combat": {
        name: "Master",
        description: "Ultimate combat enhancement",
        levels: [
          { allSkillAmp: 12, hp: 350, maxCriticalRate: 4 },
          { allSkillAmp: 13, hp: 350, maxCriticalRate: 4 },
          { allSkillAmp: 14, hp: 350, maxCriticalRate: 4 }
        ]
      }
    },
    helmet: {
      "combat_focus": {
        name: "Master",
        description: "Ultimate focus enhancement",
        levels: [
          { criticalRate: 12, resistCriticalDamage: 10, allSkillAmp: 4 },
          { criticalRate: 13, resistCriticalDamage: 10, allSkillAmp: 4 },
          { criticalRate: 14, resistCriticalDamage: 10, allSkillAmp: 4 }
        ]
      }
    },
    gauntlet: {
      "combat_defense": {
        name: "Master",
        description: "Ultimate defensive enhancement",
        levels: [
          { allSkillAmp: 12, resistCriticalRate: 5, maxCriticalRate: 4 },
          { allSkillAmp: 13, resistCriticalRate: 5, maxCriticalRate: 4 },
          { allSkillAmp: 14, resistCriticalRate: 5, maxCriticalRate: 4 },
        ]
      }
    },
    shoes: {
      "combat_resilience": {
        name: "Master",
        description: "Ultimate resilience enhancement",
        levels: [
          { allSkillAmp: 12, resistSkillAmp: 5, maxHpStealPerHit: 25 },
          { allSkillAmp: 13, resistSkillAmp: 5, maxHpStealPerHit: 25 },
          { allSkillAmp: 14, resistSkillAmp: 5, maxHpStealPerHit: 25 },
        ]
      }
    }
  }

};



/**
 * Get epic option stat value for a specific armor type, stat, grade and level
 * @param armorType The armor subtype (body, helmet, gauntlet, shoes)
 * @param stat The stat type (swordSkillAmp, magicSkillAmp, resistCriticalDamage, resistSkillAmp, damageReduction, criticalDamage, criticalRate)
 * @param grade The equipment grade (low, medium, high, highest, ultimate)
 * @param level The epic option level (1=Very Low, 2=Low, 3=Medium Low, 4=Medium High, 5=High, 6=Very High)
 * @returns The stat value for the specified parameters, or 0 if not available
 */
export function getArmorEpicOptionStatValue(
  armorType: ArmorStatType, 
  stat: string, 
  grade: string, 
  level: number = 5
): number {
  const gradeData = armorEpicOptionsByGradeAndType[grade];
  if (!gradeData) return 0;
  
  const armorTypeData = gradeData[armorType];
  if (!armorTypeData) return 0;
  
  const levels = armorTypeData[stat];
  if (!levels) return 0;
  
  // Ensure level is between 1-6
  const validLevel = Math.min(Math.max(1, level), 6);
  // Arrays are 0-indexed, so subtract 1 from level
  return levels[validLevel - 1] || 0;
}

/**
 * Get available epic option stats for a specific armor type and grade
 * @param armorType The armor subtype (body, helmet, gauntlet, shoes)
 * @param grade The equipment grade (low, medium, high, highest, ultimate)
 * @returns Array of available epic stat names for the armor type and grade
 */
export function getAvailableArmorEpicStats(armorType: ArmorStatType, grade: string): string[] {
  const gradeData = armorEpicOptionsByGradeAndType[grade];
  if (!gradeData) return [];
  
  const armorTypeData = gradeData[armorType];
  if (!armorTypeData) return [];
  
  return Object.keys(armorTypeData);
}

/**
 * Get all available epic option stats across all armor types (for UI purposes)
 * @returns Array of all unique epic stat names
 */
export function getAllAvailableArmorEpicStats(): string[] {
  const allStats = new Set<string>();
  
  Object.values(armorEpicOptionsByGradeAndType).forEach(gradeData => {
    Object.values(gradeData).forEach(armorTypeData => {
      Object.keys(armorTypeData).forEach(stat => allStats.add(stat));
    });
  });
  
  return Array.from(allStats);
}

/**
 * Get maximum epic option level for a specific armor type, stat and grade
 * @param armorType The armor subtype (body, helmet, gauntlet, shoes)
 * @param stat The stat type
 * @param grade The equipment grade
 * @returns The maximum level available for this armor type, stat and grade
 */
export function getArmorEpicOptionMaxLevel(armorType: ArmorStatType, stat: string, grade: string): number {
  const gradeData = armorEpicOptionsByGradeAndType[grade];
  if (!gradeData) return 0;
  
  const armorTypeData = gradeData[armorType];
  if (!armorTypeData) return 0;
  
  const levels = armorTypeData[stat];
  return levels ? levels.length : 0;
}

/**
 * Check if a specific stat is available for an armor type and grade
 * @param armorType The armor subtype (body, helmet, gauntlet, shoes)
 * @param stat The stat name to check
 * @param grade The equipment grade
 * @returns True if the stat is available for this armor type and grade
 */
export function isArmorEpicStatAvailable(armorType: ArmorStatType, stat: string, grade: string): boolean {
  const availableStats = getAvailableArmorEpicStats(armorType, grade);
  return availableStats.includes(stat);
}

/**
 * Get all available grades that have epic options
 * @returns Array of available grade names
 */
export function getAvailableArmorEpicGrades(): string[] {
  return Object.keys(armorEpicOptionsByGradeAndType);
}

/**
 * Get all available armor types that have epic options
 * @returns Array of available armor types
 */
export function getAvailableArmorEpicTypes(): ArmorStatType[] {
  // Get armor types from the first grade (all grades should have the same armor types)
  const firstGrade = Object.values(armorEpicOptionsByGradeAndType)[0];
  return firstGrade ? Object.keys(firstGrade) as ArmorStatType[] : [];
}

// ============================================================================
// MASTER EPIC OPTIONS FUNCTIONS
// ============================================================================

/**
 * Get Master epic option values for a specific armor type, option name, grade and level
 * @param armorType The armor subtype (body, helmet, gauntlet, shoes)
 * @param optionName The Master option name (e.g., "combat_vitality")
 * @param grade The equipment grade (low, medium, high, highest, ultimate)
 * @param level The Master option level (1, 2, 3)
 * @returns The multi-stat values for the specified parameters, or empty object if not available
 */
export function getArmorMasterEpicOption(
  armorType: ArmorStatType, 
  optionName: string, 
  grade: string, 
  level: number = 1
): ArmorMasterEpicOption {
  const gradeData = armorMasterEpicOptions[grade];
  if (!gradeData) return {};
  
  const armorTypeData = gradeData[armorType];
  if (!armorTypeData) return {};
  
  const optionDefinition = armorTypeData[optionName];
  if (!optionDefinition) return {};
  
  // Ensure level is between 1-3
  const validLevel = Math.min(Math.max(1, level), 3);
  // Arrays are 0-indexed, so subtract 1 from level
  return optionDefinition.levels[validLevel - 1] || {};
}



/**
 * Get available Master epic options for a specific armor type and grade
 * @param armorType The armor subtype (body, helmet, gauntlet, shoes)
 * @param grade The equipment grade (low, medium, high, highest, ultimate)
 * @returns Array of available Master epic option names for the armor type and grade
 */
export function getAvailableArmorMasterEpicOptions(armorType: ArmorStatType, grade: string): string[] {
  const gradeData = armorMasterEpicOptions[grade];
  if (!gradeData) return [];
  
  const armorTypeData = gradeData[armorType];
  if (!armorTypeData) return [];
  
  return Object.keys(armorTypeData);
}



/**
 * Get Master epic option definition (including name and description)
 * @param armorType The armor subtype (body, helmet, gauntlet, shoes)
 * @param optionName The Master option name
 * @param grade The equipment grade (low, medium, high, highest, ultimate)
 * @returns The complete option definition or null if not found
 */
export function getArmorMasterEpicOptionDefinition(
  armorType: ArmorStatType, 
  optionName: string, 
  grade: string
): ArmorMasterEpicOptionDefinition | null {
  const gradeData = armorMasterEpicOptions[grade];
  if (!gradeData) return null;
  
  const armorTypeData = gradeData[armorType];
  if (!armorTypeData) return null;
  
  return armorTypeData[optionName] || null;
}



/**
 * Get all available Master epic option names across all armor types (for UI purposes)
 * @returns Array of all unique Master epic option names
 */
export function getAllAvailableArmorMasterEpicOptions(): string[] {
  const allOptions = new Set<string>();
  
  Object.values(armorMasterEpicOptions).forEach(gradeData => {
    Object.values(gradeData).forEach(armorTypeData => {
      Object.keys(armorTypeData).forEach(optionName => allOptions.add(optionName));
    });
  });
  
  return Array.from(allOptions);
}



/**
 * Check if a specific Master epic option is available for an armor type and grade
 * @param armorType The armor subtype (body, helmet, gauntlet, shoes)
 * @param optionName The Master option name to check
 * @param grade The equipment grade
 * @returns True if the option is available for this armor type and grade
 */
export function isArmorMasterEpicOptionAvailable(armorType: ArmorStatType, optionName: string, grade: string): boolean {
  const availableOptions = getAvailableArmorMasterEpicOptions(armorType, grade);
  return availableOptions.includes(optionName);
}



/**
 * Get maximum Master epic option level for a specific armor type, option and grade
 * @param armorType The armor subtype (body, helmet, gauntlet, shoes)
 * @param optionName The Master option name
 * @param grade The equipment grade
 * @returns The maximum level available for this armor type, option and grade (always 3 for Master options)
 */
export function getArmorMasterEpicOptionMaxLevel(armorType: ArmorStatType, optionName: string, grade: string): number {
  const optionDefinition = getArmorMasterEpicOptionDefinition(armorType, optionName, grade);
  return optionDefinition ? optionDefinition.levels.length : 0;
}



// ============================================================================
// COMBINED FUNCTIONS (Single + Master)
// ============================================================================

/**
 * Get all available epic options (both single and Master) for a specific armor type and grade
 * @param armorType The armor subtype (body, helmet, gauntlet, shoes)
 * @param grade The equipment grade (low, medium, high, highest, ultimate)
 * @returns Object containing single stats array and Master options array
 */
export function getAllAvailableArmorEpicOptionsForType(armorType: ArmorStatType, grade: string): {
  singleStats: string[];
  masterOptions: string[];
} {
  return {
    singleStats: getAvailableArmorEpicStats(armorType, grade),
    masterOptions: getAvailableArmorMasterEpicOptions(armorType, grade)
  };
}

/**
 * Get all available epic option names (both single and multi-stat) across all armor types
 * @returns Object containing single stats array and multi-stat options array
 */
export function getAllAvailableArmorEpicOptionsGlobal(): {
  singleStats: string[];
  masterOptions: string[];
} {
  return {
    singleStats: getAllAvailableArmorEpicStats(),
    masterOptions: getAllAvailableArmorMasterEpicOptions()
  };
}