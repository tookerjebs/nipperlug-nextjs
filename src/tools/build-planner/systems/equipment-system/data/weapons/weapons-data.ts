/**
 * Weapons Data for Equipment System
 * Contains definitions for weapon items, their stats, and upgrade paths
 * Focused on Ultimate and Highest grade weapons
 */

// Type definitions moved to ./types.ts
import {
  WeaponStats,
  WeaponUpgradeStats,
  ExtremeUpgradeLevel,
  DivineUpgradeLevel,
  EpicOption,
  SlotOption,
  WeaponGradeData,
  WeaponTemplate,
  Weapon,
  WeaponStatType
} from './types';

/**
 * Material grade mapping
 */
export const materialGrades: Record<string, string> = {
  sigmetal: 'high',       // Sigmetal is high grade
  mithril: 'highest',     // Mithril is highest grade
  palladium: 'highest',
  demonite: 'ultimate',
  dragonium: 'ultimate',
  archridium: 'highest'
};

import { weaponTemplates } from './weapon-templates';
import { extremeUpgrades, getExtremeUpgradeStats } from './extreme-upgrades';
import { divineUpgrades, getDivineUpgradeStats } from './divine-upgrades';
import { 
  epicOptionSuffixes, 
  epicOptionLevels, 
  slotOptions, 
  enhancedSlotOptions,
  getEpicOptionStatValue,
  getEpicOptionSuffix,
  getAvailableEpicStats
} from './epic-options';

/**
 * Weapon templates for different weapon types
 */

/**
 * Base upgrade stats per level for all weapon types and grades
 * Uses cumulative arrays (total bonus at each level) for all weapons
 * Organized by weapon type -> grade -> stat -> level array
 */

/**
 * Cumulative upgrade stats organized by weapon type and grade (levels 0-20)
 * These are TOTAL BONUS stats added to base stats at each level
 * Based on official upgrade tables
 */
export const cumulativeUpgradeStats: Record<string, Record<string, Record<string, number[]>>> = {
  // One-handed weapons
  orb: {
    highest: {
      // Magic weapons (Orb) - Highest grade DONE CHECKED
      // Per level bonuses: 1-3(+5,+20,+6), 4-6(+8,+26,+9), 7-9(+11,+32,+12), 10-12(+14,+38,+15), 13-15(+17,+44,+18), 16(+28,+46,+29), 17(+19,+48,+20), 18(+20,+50,+21), 19(+21,+52,+22), 20(+22,+54,+23)
      attack: [0, 5, 10, 15, 23, 31, 39, 50, 61, 72, 86, 100, 114, 131, 148, 165, 193, 212, 232, 253, 275],
      attackRate: [0, 20, 40, 60, 86, 112, 138, 170, 202, 234, 272, 310, 348, 392, 436, 480, 526, 574, 624, 676, 730],
      magicAttack: [0, 6, 12, 18, 27, 36, 45, 57, 69, 81, 96, 111, 126, 144, 162, 180, 209, 229, 250, 272, 295]
    },
    ultimate: {
      // Orb - Ultimate grade (official data) - DONE CHECKED
      // Per level bonuses: 1-3(+9,+28,+10), 4-6(+12,+37,+13), 7-9(+15,+46,+16), 10-12(+18,+55,+19), 13-15(+21,+64,+22), 16(+29,+76,+30), 17(+20,+68,+21), 18(+21,+70,+22), 19(+22,+72,+23), 20(+23,+74,+24)
      attack: [0, 9, 18, 27, 39, 51, 63, 78, 93, 108, 126, 144, 162, 183, 204, 225, 254, 274, 295, 317, 340],
      attackRate: [0, 28, 56, 84, 121, 158, 195, 241, 287, 333, 388, 443, 498, 562, 626, 690, 766, 834, 904, 976, 1050],
      magicAttack: [0, 10, 20, 30, 43, 56, 69, 85, 101, 117, 136, 155, 174, 196, 218, 240, 270, 291, 313, 336, 360]
    },
    high: {
      // Orb - High grade (placeholder values - adjust as needed)
      attack: [0, 2, 4, 6, 11, 16, 21, 29, 37, 45, 56, 67, 78, 92, 106, 120, 136, 153, 171, 190, 210],
      attackRate: [0, 12, 24, 36, 51, 66, 81, 99, 117, 135, 156, 177, 198, 222, 246, 270, 296, 324, 354, 386, 420],
      magicAttack: [0, 3, 6, 9, 15, 21, 27, 36, 45, 54, 66, 78, 90, 105, 120, 135, 152, 170, 189, 209, 230]
    }
  },
  crystal: {
    highest: {
      // Crystal - Highest grade (similar to orb but slightly different scaling) DONE CHECKED
      attack: [0, 5, 10, 15, 23, 31, 39, 50, 61, 72, 86, 100, 114, 131, 148, 165, 193, 212, 232, 253, 275],
      attackRate: [0, 22, 44, 66, 94, 122, 150, 184, 218, 252, 292, 332, 372, 418, 464, 510, 558, 608, 660, 714, 770],
      magicAttack: [0, 6, 12, 18, 27, 36, 45, 57, 69, 81, 96, 111, 126, 144, 162, 180, 209, 229, 250, 272, 295]
    },
    ultimate: {
      // Crystal - Ultimate grade (same as orb - official data) -DONE CHECKED
      // Per level bonuses: 1-3(+9,+28,+10), 4-6(+12,+37,+13), 7-9(+15,+46,+16), 10-12(+18,+55,+19), 13-15(+21,+64,+22), 16(+29,+76,+30), 17(+20,+68,+21), 18(+21,+70,+22), 19(+22,+72,+23), 20(+23,+74,+24)
      attack: [0, 9, 18, 27, 39, 51, 63, 78, 93, 108, 126, 144, 162, 183, 204, 225, 254, 274, 295, 317, 340],
      attackRate: [0, 28, 56, 84, 121, 158, 195, 241, 287, 333, 388, 443, 498, 562, 626, 690, 766, 834, 904, 976, 1050],
      magicAttack: [0, 10, 20, 30, 43, 56, 69, 85, 101, 117, 136, 155, 174, 196, 218, 240, 270, 291, 313, 336, 360]
    },
    high: {
      // Crystal - High grade (DONE CHECKED)
      attack: [0, 2, 4, 6, 11, 16, 21, 29, 37, 45, 56, 67, 78, 92, 106, 120, 136, 153, 171, 190, 210],
      attackRate: [0, 12, 24, 36, 51, 66, 81, 99, 117, 135, 156, 177, 198, 222, 246, 270, 296, 324, 354, 386, 420],
      magicAttack: [0, 3, 6, 9, 15, 21, 27, 36, 45, 54, 66, 78, 90, 105, 120, 135, 152, 170, 189, 209, 230]
    }
  },
  blade: {
    highest: {
      // Blade - Highest grade (physical weapon scaling) - DONE CHECKED
      attack: [0, 6, 12, 18, 27, 36, 45, 57, 69, 81, 96, 111, 126, 144, 162, 180, 209, 229, 250, 272, 295],
      attackRate: [0, 20, 40, 60, 86, 112, 138, 170, 202, 234, 272, 310, 348, 392, 436, 480, 526, 574, 624, 676, 730],
      magicAttack: [0, 5, 10, 15, 23, 31, 39, 50, 61, 72, 86, 100, 114, 131, 148, 165, 193, 212, 232, 253, 275]
    },
    ultimate: {
      // Blade - Ultimate grade
      attack: [0, 10, 20, 30, 43, 56, 69, 85, 101, 117, 136, 155, 174, 196, 218, 240, 270, 291, 313, 336, 360],
      attackRate: [0, 28, 56, 84, 121, 158, 195, 241, 287, 333, 388, 443, 498, 562, 626, 690, 766, 834, 904, 976, 1050],
      magicAttack: [0, 9, 18, 27, 39, 51, 63, 78, 93, 108, 126, 144, 162, 183, 204, 225, 254, 275, 297, 320, 343]
    },
    high: {
      // Blade - High grade
      attack: [0, 3, 6, 9, 15, 21, 27, 36, 45, 54, 66, 78, 90, 105, 120, 135, 152, 170, 189, 209, 230],
      attackRate: [0, 12, 24, 36, 51, 66, 81, 99, 117, 135, 156, 177, 198, 222, 246, 270, 296, 324, 354, 386, 420],
      magicAttack: [0, 2, 4, 6, 11, 16, 21, 29, 37, 45, 56, 67, 78, 92, 106, 120, 136, 153, 171, 190, 210]
    },
  },
  katana: {
    highest: {
      // Katana - Highest grade (balanced physical weapon) - DONE CHECKED
      attack: [0, 6, 12, 18, 27, 36, 45, 57, 69, 81, 96, 111, 126, 144, 162, 180, 209, 229, 250, 272, 295],
      attackRate: [0, 20, 40, 60, 86, 112, 138, 170, 202, 234, 272, 310, 348, 392, 436, 480, 526, 574, 624, 676, 730],
      magicAttack: [0, 5, 10, 15, 23, 31, 39, 50, 61, 72, 86, 100, 114, 131, 148, 165, 193, 212, 232, 253, 275]
    },
    ultimate: {
      // Katana - Ultimate grade (DONE CHECKED)
      attack: [0, 10, 20, 30, 43, 56, 69, 85, 101, 117, 136, 155, 174, 196, 218, 240, 270, 291, 313, 336, 360],
      attackRate: [0, 28, 56, 84, 121, 158, 195, 241, 287, 333, 388, 443, 498, 562, 626, 690, 766, 834, 904, 976, 1050],
      magicAttack: [0, 9, 18, 27, 39, 51, 63, 78, 93, 108, 126, 144, 162, 183, 204, 225, 254, 275, 297, 320, 343]
    },
    high: {
      // Katana - High grade (DONE CHECKED)
      attack: [0, 3, 6, 9, 15, 21, 27, 36, 45, 54, 66, 78, 90, 105, 120, 135, 152, 170, 189, 209, 230],
      attackRate: [0, 12, 24, 36, 51, 66, 81, 99, 117, 135, 156, 177, 198, 222, 246, 270, 296, 324, 354, 386, 420],
      magicAttack: [0, 2, 4, 6, 11, 16, 21, 29, 37, 45, 56, 67, 78, 92, 106, 120, 136, 153, 171, 190, 210]
    },
  },
  chakram: {
    highest: {
      // Chakram - Highest grade (throwing weapon) - DONE CHECKED
      attack: [0, 6, 12, 18, 27, 36, 45, 57, 69, 81, 96, 111, 126, 144, 162, 180, 209, 229, 250, 272, 295],
      attackRate: [0, 20, 40, 60, 86, 112, 138, 170, 202, 234, 272, 310, 348, 392, 436, 480, 526, 574, 624, 676, 730],
      magicAttack: [0, 5, 10, 15, 23, 31, 39, 50, 61, 72, 86, 100, 114, 131, 148, 165, 193, 212, 232, 253, 275]
    },
    ultimate: {
      // Chakram - Ultimate grade - DONE CHECKED
      attack: [0, 10, 20, 30, 43, 56, 69, 85, 101, 117, 136, 155, 174, 196, 218, 240, 270, 291, 313, 336, 360],
      attackRate: [0, 28, 56, 84, 121, 158, 195, 241, 287, 333, 388, 443, 498, 562, 626, 690, 766, 834, 904, 976, 1050],
      magicAttack: [0, 9, 18, 27, 39, 51, 63, 78, 93, 108, 126, 144, 162, 183, 204, 225, 254, 275, 297, 320, 343]
    },
    high: {
      // Chakram - High grade - DONE CHECKED
      attack: [0, 3, 6, 9, 15, 21, 27, 36, 45, 54, 66, 78, 90, 105, 120, 135, 152, 170, 189, 209, 230],
      attackRate: [0, 12, 24, 36, 51, 66, 81, 99, 117, 135, 156, 177, 198, 222, 246, 270, 296, 324, 354, 386, 420],
      magicAttack: [0, 2, 4, 6, 11, 16, 21, 29, 37, 45, 56, 67, 78, 92, 106, 120, 136, 153, 171, 190, 210]
    },
  },
  // Two-handed weapons
  greatsword: {
    highest: {
      // Greatsword - Highest grade (two-handed scaling - roughly 2x one-handed) - DONE CHECKED
      attack: [0, 12, 24, 36, 54, 72, 90, 114, 138, 162, 192, 222, 252, 288, 324, 360, 407, 445, 484, 524, 565],
      attackRate: [0, 40, 80, 120, 172, 224, 276, 340, 404, 468, 544, 620, 696, 784, 872, 960, 1050, 1142, 1236, 1332, 1430],
      magicAttack: [0, 10, 20, 30, 46, 62, 78, 100, 122, 144, 172, 200, 228, 262, 296, 330, 375, 411, 448, 486, 525]
    },
    ultimate: {
      // Greatsword - Ultimate grade - DONE CHECKED
      attack: [0, 20, 40, 60, 86, 112, 138, 170, 202, 234, 272, 310, 348, 392, 436, 480, 540, 582, 626, 672, 720],
      attackRate: [0, 56, 112, 168, 242, 316, 390, 482, 574, 666, 776, 886, 996, 1124, 1252, 1380, 1532, 1668, 1808, 1952, 2100],
      magicAttack: [0, 18, 36, 54, 78, 102, 126, 156, 186, 216, 252, 288, 324, 366, 408, 450, 508, 548, 590, 634, 680]
    },
    high: {
      // Greatsword - High grade - DONE CHECKED
      attack: [0, 6, 12, 18, 30, 42, 54, 72, 90, 108, 132, 156, 180, 210, 240, 270, 306, 342, 378, 414, 450],
      attackRate: [0, 24, 48, 72, 102, 132, 162, 198, 234, 270, 312, 354, 396, 444, 492, 540, 590, 642, 695, 751, 809],
      magicAttack: [0, 4, 8, 12, 22, 32, 42, 58, 74, 90, 112, 134, 156, 184, 212, 240, 270, 301, 333, 366, 399]
    },
  },
  daikatana: {
    highest: {
      // Daikatana - Highest grade (two-handed balanced weapon) - DONE CHECKED
      attack: [0, 12, 24, 36, 54, 72, 90, 114, 138, 162, 192, 222, 252, 288, 324, 360, 407, 445, 484, 524, 565],
      attackRate: [0, 40, 80, 120, 172, 224, 276, 340, 404, 468, 544, 620, 696, 784, 872, 960, 1050, 1142, 1236, 1332, 1430],
      magicAttack: [0, 10, 20, 30, 46, 62, 78, 100, 122, 144, 172, 200, 228, 262, 296, 330, 375, 411, 448, 486, 525]
    },
    ultimate: {
      // Daikatana - Ultimate grade - DONE CHECKED
      attack: [0, 20, 40, 60, 86, 112, 138, 170, 202, 234, 272, 310, 348, 392, 436, 480, 540, 582, 626, 672, 720],
      attackRate: [0, 56, 112, 168, 242, 316, 390, 482, 574, 666, 776, 886, 996, 1124, 1252, 1380, 1532, 1668, 1808, 1952, 2100],
      magicAttack: [0, 18, 36, 54, 78, 102, 126, 156, 186, 216, 252, 288, 324, 366, 408, 450, 508, 548, 590, 634, 680]
    },
    high: {
      // Daikatana - High grade - DONE CHECKED
      attack: [0, 6, 12, 18, 30, 42, 54, 72, 90, 108, 132, 156, 180, 210, 240, 270, 306, 342, 378, 414, 450],
      attackRate: [0, 24, 48, 72, 102, 132, 162, 198, 234, 270, 312, 354, 396, 444, 492, 540, 590, 642, 695, 751, 809],
      magicAttack: [0, 4, 8, 12, 22, 32, 42, 58, 74, 90, 112, 134, 156, 184, 212, 240, 270, 301, 333, 366, 399]
    },
  }
};

// Legacy upgradeStats removed - now using cumulative system for all weapon types

// Extreme upgrade data moved to ./extreme-upgrades.ts



// Epic options data moved to ./epic-options.ts
// Re-export for backward compatibility
export {
  epicOptionSuffixes,
  epicOptionLevels,
  slotOptions,
  enhancedSlotOptions,
  getEpicOptionStatValue,
  getEpicOptionSuffix,
  getAvailableEpicStats
} from './epic-options';



/**
 * Get upgrade stat type for weapon
 * @deprecated Use the handType property directly from Weapon object
 */
export function getUpgradeStatType(weaponType: string): WeaponStatType {
  // For backwards compatibility only - should not be used in new code
  return weaponType === 'greatsword' || weaponType === 'daikatana' ? 'twoHanded' : 'oneHanded';
}

/**
 * Get base upgrade stats for any weapon type and grade
 * Uses cumulative arrays with exact values per level
 */
export function getBaseUpgradeStats(weaponGrade: string, weaponType: string, level: number): Record<string, number> {
  const stats: Record<string, number> = {};
  
  // Check if we have data for this weapon type and grade
  const weaponData = cumulativeUpgradeStats[weaponType];
  if (!weaponData) {
    console.warn(`No base upgrade data found for weapon type: ${weaponType}`);
    return stats;
  }
  
  const gradeData = weaponData[weaponGrade];
  if (!gradeData) {
    console.warn(`No base upgrade data found for weapon type: ${weaponType}, grade: ${weaponGrade}`);
    return stats;
  }
  
  // Apply stats from the cumulative arrays
  Object.entries(gradeData).forEach(([stat, values]) => {
    const validLevel = Math.min(Math.max(0, level), values.length - 1);
    stats[stat] = values[validLevel] || 0;
  });
  
  return stats;
}

/**
 * Initialize and generate all weapons from templates
 */
export function initializeWeapons(): Weapon[] {
  const weapons: Weapon[] = [];
  
  Object.keys(weaponTemplates).forEach(weaponType => {
    const template = weaponTemplates[weaponType];
    
    Object.keys(template.grades).forEach(materialGrade => {
      const gradeInfo = template.grades[materialGrade];
      
      const weapon: Weapon = {
        id: `${materialGrade}_${weaponType}`,
        name: `${materialGrade.charAt(0).toUpperCase() + materialGrade.slice(1)} ${weaponType.charAt(0).toUpperCase() + weaponType.slice(1)}`,
        type: template.type,
        subtype: template.subtype,
        material: template.material,
        class: template.class,
        grade: materialGrades[materialGrade] || 'highest',
        handType: template.handType, // Added the handType from the template
        imagePath: gradeInfo.imagePath,
        baseStats: gradeInfo.baseStats,
        maxSlots: template.maxSlots,
        maxExtremeLevel: gradeInfo.maxExtremeLevel
      };
      
      weapons.push(weapon);
    });
  });
  
  return weapons;
}

/**
 * Get all available weapons
 */
export const weapons = initializeWeapons();

/**
 * Get weapon by ID
 */
export function getWeaponById(id: string): Weapon | undefined {
  return weapons.find(weapon => weapon.id === id);
}

/**
 * Get weapons by type
 */
export function getWeaponsByType(type: string): Weapon[] {
  return weapons.filter(weapon => weapon.subtype === type);
}

/**
 * Get weapons by grade
 */
export function getWeaponsByGrade(grade: string): Weapon[] {
  return weapons.filter(weapon => weapon.grade === grade);
}