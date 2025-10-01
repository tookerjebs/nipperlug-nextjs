/**
 * Armors Data for Equipment System
 * Contains definitions for armor items, their stats, and upgrade paths
 * Currently focused on Suit armors and Highest grade
 */

import {
  ArmorStats,
  ArmorEpicOption,
  ArmorSlotOption,
  ArmorTemplate,
  Armor,
  ArmorStatType
} from './armor-types';
import { getArmorExtremeUpgradeStats } from './armor-extreme-upgrades';
import { getArmorDivineUpgradeStats } from './armor-divine-upgrades';
import { armorTemplates, armorMaterialGrades, getArmorDisplayName } from './armor-templates';
import { 
  getArmorEpicOptionStatValue,
  getAvailableArmorEpicStats,
  getAllAvailableArmorEpicStats,
  getArmorEpicOptionMaxLevel,
  isArmorEpicStatAvailable,

  getAllAvailableArmorEpicOptionsForType,
  getArmorMasterEpicOption
} from './armor-epic-options';



/**
 * Slot options for different armor types
 * Each armor type has different available slot options
 */
export const armorSlotOptionsByType: Record<ArmorStatType, { normal: ArmorSlotOption; enhanced: ArmorSlotOption }> = {
  body: {
    normal: {
      swordSkillAmp: 7,
      maxCriticalRate: 2,
      magicSkillAmp: 7,
    },
    enhanced: {
      swordSkillAmp: 8,
      maxCriticalRate: 3,
      magicSkillAmp: 8,
    }
  },
  helmet: {
    normal: {
      swordSkillAmp: 7,
      magicSkillAmp: 7,
      criticalDamage: 10,
      criticalRate: 5,
    },
    enhanced: {
      swordSkillAmp: 8,
      magicSkillAmp: 8,
      criticalDamage: 12,
      criticalRate: 8,
    }
  },
  gauntlet: {
    normal: {
      swordSkillAmp: 7,
      maxCriticalRate: 2,
      magicSkillAmp: 7,
    },
    enhanced: {
      swordSkillAmp: 8,
      maxCriticalRate: 3,
      magicSkillAmp: 8,
    }
  },
  shoes: {
    normal: {
      swordSkillAmp: 7,
      magicSkillAmp: 7,
    },
    enhanced: {
      swordSkillAmp: 8,
      magicSkillAmp: 8,
    }
  }
};

/**
 * Get slot options for a specific armor type
 * @param armorType The armor subtype (body, helmet, gauntlet, shoes)
 * @param hasThirdSlotActive Whether the third slot is active (determines enhanced vs normal)
 * @returns The appropriate slot options for the armor type
 */
export function getArmorSlotOptions(armorType: ArmorStatType, hasThirdSlotActive: boolean = false): ArmorSlotOption {
  const typeOptions = armorSlotOptionsByType[armorType];
  if (!typeOptions) {
    // Fallback to body armor options if type not found
    return hasThirdSlotActive ? armorSlotOptionsByType.body.enhanced : armorSlotOptionsByType.body.normal;
  }
  
  return hasThirdSlotActive ? typeOptions.enhanced : typeOptions.normal;
}

/**
 * Get available slot stats for a specific armor type
 * @param armorType The armor subtype (body, helmet, gauntlet, shoes)
 * @returns Array of available slot stat names for the armor type
 */
export function getAvailableArmorSlotStats(armorType: ArmorStatType): string[] {
  const slotOptions = getArmorSlotOptions(armorType, false); // Use normal options to get all available stats
  return Object.keys(slotOptions).filter(key => slotOptions[key as keyof ArmorSlotOption] !== undefined);
}

/**
 * Get slot stat value for a specific armor type and stat
 * @param armorType The armor subtype (body, helmet, gauntlet, shoes)
 * @param statName The stat name (swordSkillAmp, maxCriticalRate, magicSkillAmp, criticalDamage, criticalRate)
 * @param hasThirdSlotActive Whether the third slot is active (determines enhanced vs normal)
 * @returns The stat value, or 0 if the stat is not available for this armor type
 */
export function getArmorSlotStatValue(armorType: ArmorStatType, statName: string, hasThirdSlotActive: boolean = false): number {
  const slotOptions = getArmorSlotOptions(armorType, hasThirdSlotActive);
  return slotOptions[statName as keyof ArmorSlotOption] || 0;
}

/**
 * Check if a specific stat is available for an armor type
 * @param armorType The armor subtype (body, helmet, gauntlet, shoes)
 * @param statName The stat name to check
 * @returns True if the stat is available for this armor type
 */
export function isArmorSlotStatAvailable(armorType: ArmorStatType, statName: string): boolean {
  const availableStats = getAvailableArmorSlotStats(armorType);
  return availableStats.includes(statName);
}

// Epic option functions are now imported from ./armor-epic-options
// Re-export them for backward compatibility if needed
export { 
  getArmorEpicOptionStatValue,
  getAvailableArmorEpicStats,
  getAllAvailableArmorEpicStats,
  getArmorEpicOptionMaxLevel,
  isArmorEpicStatAvailable
} from './armor-epic-options';

/**
 * Base upgrade stats per level organized by grade
 * All armor types (body, helmets, gauntlets, shoes) use the same stats based on their grade
 * These are TOTAL BONUS stats added to base stats at each level (cumulative)
 */
export const cumulativeArmorUpgradeStatsByGrade: Record<string, Record<string, number[]>> = {
  low: {
    // Normal grade armor upgrade stats (levels 0-20) - cumulative
    defense: [0, 3, 6, 9, 13, 17, 21, 26, 31, 36, 42, 48, 54, 61, 67, 74, 81, 88, 95, 102, 109],
    defenseRate: [0, 3, 6, 9, 13, 17, 21, 26, 31, 36, 42, 48, 54, 61, 67, 74, 81, 88, 95, 102, 109]
  },
  medium: {
    // Medium grade armor upgrade stats (levels 0-20) - cumulative
    // Stats positioned between normal and high grade
    defense: [0, 3, 6, 9, 14, 19, 24, 31, 38, 45, 54, 63, 72, 83, 94, 105, 116, 127, 138, 149, 160],
    defenseRate: [0, 4, 8, 12, 17, 22, 27, 33, 39, 45, 52, 59, 66, 74, 82, 90, 98, 106, 114, 122, 130],
    hp: [0, 5, 10, 15, 24, 33, 42, 55, 68, 81, 98, 115, 132, 153, 174, 195, 195, 195, 195, 195, 195]
  },
  high: {
    // High grade armor upgrade stats (levels 0-20) - cumulative
    defense: [0, 3, 6, 9, 15, 21, 27, 36, 45, 54, 66, 78, 90, 105, 120, 135, 152, 170, 189, 209, 230],
    defenseRate: [0, 4, 8, 12, 18, 24, 30, 39, 48, 57, 69, 81, 93, 108, 123, 138, 152, 166, 180, 194, 208],
    hp: [0, 3, 6, 9, 19, 29, 39, 56, 73, 90, 114, 138, 162, 193, 224, 255, 255, 255, 255, 255, 255]
  },
  highest: {
    // Highest grade armor upgrade stats (levels 0-20) - cumulative
    defense: [0, 6, 12, 18, 27, 36, 45, 57, 69, 81, 96, 111, 126, 144, 162, 180, 209, 229, 250, 272, 295],
    defenseRate: [0, 7, 14, 21, 30, 39, 48, 59, 70, 81, 94, 107, 120, 135, 150, 165, 181, 198, 216, 235, 255],
    hp: [0, 4, 8, 12, 24, 36, 48, 68, 88, 102, 102, 136, 192, 192, 192, 300, 300, 300, 300, 300, 300],
    ignorePenetration: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 4, 6, 8, 10]
  },
  ultimate: {
    // Ultimate grade armor upgrade stats (levels 0-20) - cumulative
    defense: [0, 10, 20, 30, 43, 56, 69, 85, 101, 117, 136, 155, 174, 196, 218, 240, 270, 291, 313, 336, 360],
    defenseRate: [0, 11, 22, 33, 46, 59, 72, 87, 102, 117, 134, 151, 168, 187, 206, 225, 242, 260, 279, 299, 320],
    ignorePenetration: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 6, 9, 12, 15]
  }
};

/**
 * Get base upgrade stats for armor based on grade
 * All armor types use the same upgrade stats based on their grade
 */
export function getArmorBaseUpgradeStats(armorGrade: string, armorType: ArmorStatType, level: number): Record<string, number> {
  const stats: Record<string, number> = {};
  
  // Use the grade-based system
  if (cumulativeArmorUpgradeStatsByGrade[armorGrade]) {
    const cumulativeStats = cumulativeArmorUpgradeStatsByGrade[armorGrade];
    Object.entries(cumulativeStats).forEach(([stat, values]) => {
      const validLevel = Math.min(Math.max(0, level), values.length - 1);
      stats[stat] = values[validLevel] || 0;
    });
  }
  
  return stats;
}

/**
 * Get available armor upgrade grades
 */
export function getAvailableArmorUpgradeGrades(): string[] {
  return Object.keys(cumulativeArmorUpgradeStatsByGrade);
}

/**
 * Get maximum upgrade level for a specific grade
 */
export function getMaxArmorUpgradeLevel(grade: string): number {
  const gradeStats = cumulativeArmorUpgradeStatsByGrade[grade];
  if (!gradeStats) return 0;
  
  // Get the length of the first stat array (all should be the same length)
  const firstStatArray = Object.values(gradeStats)[0];
  return firstStatArray ? firstStatArray.length - 1 : 0;
}





/**
 * Initialize and generate all armors from templates
 */
export function initializeArmors(): Armor[] {
  const armors: Armor[] = [];
  
  Object.keys(armorTemplates).forEach(armorType => {
    const template = armorTemplates[armorType];
    
    Object.keys(template.grades).forEach(materialGrade => {
      const gradeInfo = template.grades[materialGrade];
      
      const armor: Armor = {
        id: `${materialGrade}_${armorType}`,
        name: getArmorDisplayName(materialGrade, armorType, template.weight),
        type: template.type,
        subtype: template.subtype as ArmorStatType,
        weight: template.weight,
        material: template.material,
        class: template.class,
        grade: armorMaterialGrades[materialGrade] || 'highest',
        imagePath: gradeInfo.imagePath,
        description: gradeInfo.description,
        baseStats: gradeInfo.baseStats,
        maxSlots: template.maxSlots,
        maxExtremeLevel: gradeInfo.maxExtremeLevel
      };
      
      armors.push(armor);
    });
  });
  
  return armors;
}

/**
 * Get all available armors
 */
export const armors = initializeArmors();

/**
 * Get armor by ID
 */
export function getArmorById(id: string): Armor | undefined {
  return armors.find(armor => armor.id === id);
}

/**
 * Get armors by type
 */
export function getArmorsByType(type: ArmorStatType): Armor[] {
  return armors.filter(armor => armor.subtype === type);
}

/**
 * Get armors by grade
 */
export function getArmorsByGrade(grade: string): Armor[] {
  return armors.filter(armor => armor.grade === grade);
}

/**
 * Calculate total stats for a configured armor piece
 */
export function calculateArmorTotalStats(
  armor: Armor,
  baseLevel: number = 0,
  extremeLevel: number = 0,
  divineLevel: number = 0,
  epicStat: string | null = null,
  slots: { isActive: boolean; selectedStat: string | null }[] = [],
  epicOptionLevel: number = 1,
  isExtended: boolean = false,
  epicOptionType: 'none' | 'normal' | 'master' | 'single' | 'multi' | null = null,
  masterEpicOption: string | null = null,
  masterEpicOptionLevel: number = 1
): Record<string, number | string> {
  // Create a new stats object to avoid mutating the original
  const stats: Record<string, number | string> = {};
  
  // Copy base stats, handling null values (especially for ignore_penetration)
  Object.entries(armor.baseStats).forEach(([key, value]) => {
    if (value !== null) {
      stats[key] = value;
    }
  });
  
  // Add base upgrade stats
  if (baseLevel > 0) {
    const baseStats = getArmorBaseUpgradeStats(armor.grade, armor.subtype as ArmorStatType, baseLevel);
    Object.entries(baseStats).forEach(([stat, value]) => {
      if (typeof stats[stat] === 'number') {
        stats[stat] = (stats[stat] as number) + value;
      } else {
        stats[stat] = value;
      }
    });
  }
  
  // Add extreme upgrade stats
  if (extremeLevel > 0) {
    const extremeStats = getArmorExtremeUpgradeStats(armor.subtype as ArmorStatType, extremeLevel);
    Object.entries(extremeStats).forEach(([stat, value]) => {
      if (value !== undefined && value !== null) {
        if (typeof stats[stat] === 'number' && typeof value === 'number') {
          stats[stat] = (stats[stat] as number) + value;
        } else {
          stats[stat] = value;
        }
      }
    });
  }
  
  // Add divine upgrade stats
  if (divineLevel > 0) {
    const divineStats = getArmorDivineUpgradeStats(armor.subtype as ArmorStatType, armor.grade, divineLevel);
    Object.entries(divineStats).forEach(([stat, value]) => {
      if (value !== undefined && value !== null) {
        if (typeof stats[stat] === 'number' && typeof value === 'number') {
          stats[stat] = (stats[stat] as number) + value;
        } else {
          stats[stat] = value;
        }
      }
    });
  }
  
  // Add epic option stats (normal/single-stat)
  if ((epicOptionType === 'normal' || epicOptionType === 'single') && epicStat && armor) {
    const statValue = getArmorEpicOptionStatValue(
      armor.subtype as ArmorStatType, 
      epicStat, 
      armor.grade, 
      epicOptionLevel
    );
    
    if (statValue > 0) {
      if (typeof stats[epicStat] === 'number') {
        stats[epicStat] = (stats[epicStat] as number) + statValue;
      } else {
        stats[epicStat] = statValue;
      }
    }
  }
  
  // Add Master epic option stats (unified)
  if ((epicOptionType === 'master' || epicOptionType === 'multi') && masterEpicOption && armor) {
    const masterStatValues = getArmorMasterEpicOption(
      armor.subtype as ArmorStatType,
      masterEpicOption,
      armor.grade,
      masterEpicOptionLevel
    );
    
    Object.entries(masterStatValues).forEach(([stat, value]) => {
      if (value > 0) {
        if (typeof stats[stat] === 'number') {
          stats[stat] = (stats[stat] as number) + value;
        } else {
          stats[stat] = value;
        }
      }
    });
  }
  
  // Add slot stats using the extension-aware system
  const slotOptionsToUse = getArmorSlotOptions(armor.subtype as ArmorStatType, isExtended);
  
  slots.forEach(slot => {
    if (slot.isActive && slot.selectedStat) {
      const statValue = slotOptionsToUse[slot.selectedStat as keyof ArmorSlotOption];
      if (statValue !== undefined) {
        if (typeof stats[slot.selectedStat] === 'number') {
          stats[slot.selectedStat] = (stats[slot.selectedStat] as number) + statValue;
        } else {
          stats[slot.selectedStat] = statValue;
        }
      }
    }
  });
  
  return stats;
}

/**
 * Create a configured armor with calculated stats
 */
export function createConfiguredArmor(
  armor: Armor,
  baseLevel: number = 0,
  extremeLevel: number = 0,
  divineLevel: number = 0,
  epicStat: string | null = null,
  slots: { isActive: boolean; selectedStat: string | null }[] = [],
  epicOptionLevel: number = 1,
  isExtended: boolean = false,
  epicOptionType: 'none' | 'normal' | 'master' | 'single' | 'multi' | null = null,
  masterEpicOption: string | null = null,
  masterEpicOptionLevel: number = 1
) {
  const totalStats = calculateArmorTotalStats(
    armor,
    baseLevel,
    extremeLevel,
    divineLevel,
    epicStat,
    slots,
    epicOptionLevel,
    isExtended,
    epicOptionType,
    masterEpicOption,
    masterEpicOptionLevel
  );
  
  return {
    ...armor,
    baseUpgradeLevel: baseLevel,
    extremeUpgradeLevel: extremeLevel,
    divineUpgradeLevel: divineLevel,
    epicOptionStat: epicStat,
    epicOptionLevel: epicOptionLevel,
    masterEpicOption: masterEpicOption,
    masterEpicOptionLevel: masterEpicOptionLevel,
    epicOptionType: epicOptionType,
    slots: slots,
    isExtended: isExtended,
    totalStats: totalStats as Record<string, number> // Type cast to ensure it matches the expected type
  };
}