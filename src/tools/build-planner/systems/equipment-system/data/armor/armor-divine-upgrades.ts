/**
 * Divine upgrade data for armor - contains upgrade stats that vary by armor type and grade
 * All grades support levels 0-15, with different stat values per grade
 */

import { ArmorDivineUpgradeLevel, ArmorStatType } from './armor-types';

/**
 * Divine upgrade stats for body armor by grade and level
 * Each grade (high, highest, ultimate) has different stat values but same level structure (0-15)
 */
export const bodyDivineUpgrades: Record<string, ArmorDivineUpgradeLevel[]> = {
  highest: [
    // Level 0 - No bonuses
    {},
    // Level 1
    {hp: 60, defense: 14},
    // Level 2
    {hp: 70, defense: 20},
    // Level 3
    {hp: 80, defense: 26},
    // Level 4
    {hp: 90, defense: 32},
    // Level 5
    {hp: 100, defense: 38},
    // Level 6
    {hp: 110, defense: 44},
    // Level 7
    {hp: 120, defense: 50, damageReduction: 10},
    // Level 8
    {hp: 130, defense: 56, damageReduction: 15},
    // Level 9
    {hp: 140, defense: 62, damageReduction: 20},
    // Level 10
    {hp: 150, defense: 68, damageReduction: 25, resistSkillAmp: 3},
    // Level 11
    {hp: 160, defense: 74, damageReduction: 30, resistSkillAmp: 4},
    // Level 12
    {hp: 170, defense: 80, damageReduction: 35, resistSkillAmp: 5},
    // Level 13
    {hp: 180, defense: 86, damageReduction: 40, resistSkillAmp: 6, allSkillAmp: 1},
    // Level 14
    {hp: 190, defense: 92, damageReduction: 50, resistSkillAmp: 7, allSkillAmp: 2},
    // Level 15
    {hp: 200, defense: 98, damageReduction: 60, resistSkillAmp: 8, allSkillAmp: 4}
  ],
  high: [
    // Level 0 - No bonuses
    {},
    // Level 1
    {hp: 40, defense: 4},
    // Level 2
    {hp: 50, defense: 10},
    // Level 3
    {hp: 60, defense: 16},
    // Level 4
    {hp: 70, defense: 22},
    // Level 5
    {hp: 80, defense: 28},
    // Level 6
    {hp: 90, defense: 34},
    // Level 7
    {hp: 100, defense: 40, damageReduction: 10},
    // Level 8
    {hp: 110, defense: 46, damageReduction: 15},
    // Level 9
    {hp: 120, defense: 52, damageReduction: 20},
    // Level 10
    {hp: 130, defense: 58, damageReduction: 25, resistSkillAmp: 2},
    // Level 11
    {hp: 140, defense: 64, damageReduction: 30, resistSkillAmp: 3},
    // Level 12
    {hp: 150, defense: 70, damageReduction: 35, resistSkillAmp: 4},
    // Level 13
    {hp: 160, defense: 76, damageReduction: 40, resistSkillAmp: 5, allSkillAmp: 1},
    // Level 14
    {hp: 170, defense: 82, damageReduction: 45, resistSkillAmp: 6, allSkillAmp: 2},
    // Level 15
    {hp: 180, defense: 88, damageReduction: 50, resistSkillAmp: 7, allSkillAmp: 3}
  ],
  ultimate: [
    // Level 0 - No bonuses
    {},
    // Level 1
    {hp: 80, defense: 24},
    // Level 2
    {hp: 90, defense: 30},
    // Level 3
    {hp: 100, defense: 36},
    // Level 4
    {hp: 110, defense: 42},
    // Level 5
    {hp: 120, defense: 48},
    // Level 6
    {hp: 130, defense: 54},
    // Level 7
    {hp: 140, defense: 60, damageReduction: 10},
    // Level 8
    {hp: 150, defense: 66, damageReduction: 15},
    // Level 9
    {hp: 160, defense: 72, damageReduction: 20},
    // Level 10
    {hp: 170, defense: 78, damageReduction: 25, resistSkillAmp: 4},
    // Level 11
    {hp: 180, defense: 84, damageReduction: 30, resistSkillAmp: 5},
    // Level 12
    {hp: 190, defense: 90, damageReduction: 35, resistSkillAmp: 6},
    // Level 13
    {hp: 200, defense: 96, damageReduction: 40, resistSkillAmp: 7, allSkillAmp: 1},
    // Level 14
    {hp: 210, defense: 102, damageReduction: 55, resistSkillAmp: 8, allSkillAmp: 2},
    // Level 15
    {hp: 220, defense: 108, damageReduction: 70, resistSkillAmp: 9, allSkillAmp: 5}
  ]
};

/**
 * Divine upgrade stats for helmets by grade and level
 * Placeholder for now - will be filled with actual data later
 */
export const helmetDivineUpgrades: Record<string, ArmorDivineUpgradeLevel[]> = {
  highest: [
    // Level 0 - No bonuses
    {},
    // Level 1
    {hp: 60, defense: 14},
    // Level 2
    {hp: 70, defense: 20},
    // Level 3
    {hp: 80, defense: 26},
    // Level 4
    {hp: 90, defense: 32},
    // Level 5
    {hp: 100, defense: 38},
    // Level 6
    {hp: 110, defense: 44},
    // Level 7
    {hp: 120, defense: 50, defenseRate: 160},
    // Level 8
    {hp: 130, defense: 56, defenseRate: 190},
    // Level 9
    {hp: 140, defense: 62, defenseRate: 230},
    // Level 10
    {hp: 150, defense: 68, defenseRate: 280},
    // Level 11
    {hp: 160, defense: 74, defenseRate: 330},
    // Level 12
    {hp: 170, defense: 80, defenseRate: 380},
    // Level 13
    {hp: 180, defense: 86, defenseRate: 430, resistCriticalDamage: 6, resistCriticalRate: 1},
    // Level 14
    {hp: 190, defense: 92, defenseRate: 480, resistCriticalDamage: 8, resistCriticalRate: 1},
    // Level 15
    {hp: 200, defense: 98, defenseRate: 530, resistCriticalDamage: 10, resistCriticalRate: 2}
  ],
  high: [
    // Level 0 - No bonuses
    {},
    // Level 1
    {hp: 40, defense: 4},
    // Level 2
    {hp: 50, defense: 10},
    // Level 3
    {hp: 60, defense: 16},
    // Level 4
    {hp: 70, defense: 22},
    // Level 5
    {hp: 80, defense: 28},
    // Level 6
    {hp: 90, defense: 34},
    // Level 7
    {hp: 100, defense: 40, defenseRate: 110},
    // Level 8
    {hp: 110, defense: 46, defenseRate: 140},
    // Level 9
    {hp: 120, defense: 52, defenseRate: 180},
    // Level 10
    {hp: 130, defense: 58, defenseRate: 230},
    // Level 11
    {hp: 140, defense: 64, defenseRate: 280},
    // Level 12
    {hp: 150, defense: 70, defenseRate: 330},
    // Level 13
    {hp: 160, defense: 76, defenseRate: 380, resistCriticalDamage: 4, resistCriticalRate: 1},
    // Level 14
    {hp: 170, defense: 82, defenseRate: 430, resistCriticalDamage: 6, resistCriticalRate: 1},
    // Level 15
    {hp: 180, defense: 88, defenseRate: 480, resistCriticalDamage: 8, resistCriticalRate: 1}
  ],
  ultimate: [
    // Level 0 - No bonuses
    {},
    // Level 1
    {hp: 80, defense: 24},
    // Level 2
    {hp: 90, defense: 30},
    // Level 3
    {hp: 100, defense: 36},
    // Level 4
    {hp: 110, defense: 42},
    // Level 5
    {hp: 120, defense: 48},
    // Level 6
    {hp: 130, defense: 54},
    // Level 7
    {hp: 140, defense: 60, defenseRate: 210},
    // Level 8
    {hp: 150, defense: 66, defenseRate: 240},
    // Level 9
    {hp: 160, defense: 72, defenseRate: 280},
    // Level 10
    {hp: 170, defense: 78, defenseRate: 330},
    // Level 11
    {hp: 180, defense: 84, defenseRate: 380},
    // Level 12
    {hp: 190, defense: 90, defenseRate: 430},
    // Level 13
    {hp: 200, defense: 96, defenseRate: 480, resistCriticalDamage: 8, resistCriticalRate: 1},
    // Level 14
    {hp: 210, defense: 102, defenseRate: 530, resistCriticalDamage: 10, resistCriticalRate: 1},
    // Level 15
    {hp: 220, defense: 108, defenseRate: 580, resistCriticalDamage: 12, resistCriticalRate: 3}
  ]
};

/**
 * Divine upgrade stats for gauntlets by grade and level
 * Placeholder for now - will be filled with actual data later
 */
export const gauntletDivineUpgrades: Record<string, ArmorDivineUpgradeLevel[]> = {
  highest: [
    // Level 0 - No bonuses
    {},
    // Level 1
    {hp: 60, defense: 14},
    // Level 2
    {hp: 70, defense: 20},
    // Level 3
    {hp: 80, defense: 26},
    // Level 4
    {hp: 90, defense: 32},
    // Level 5
    {hp: 100, defense: 38},
    // Level 6
    {hp: 110, defense: 44},
    // Level 7
    {hp: 120, defense: 50, allAttackUp: 25},
    // Level 8
    {hp: 130, defense: 56, allAttackUp: 30},
    // Level 9
    {hp: 140, defense: 62, allAttackUp: 35},
    // Level 10
    {hp: 150, defense: 68, allAttackUp: 40, accuracy: 20},
    // Level 11
    {hp: 160, defense: 74, allAttackUp: 45, accuracy: 30},
    // Level 12
    {hp: 170, defense: 80, allAttackUp: 50, accuracy: 40},
    // Level 13
    {hp: 180, defense: 86, allAttackUp: 55, accuracy: 50, allSkillAmp: 1},
    // Level 14
    {hp: 190, defense: 92, allAttackUp: 60, accuracy: 60, allSkillAmp: 2},
    // Level 15
    {hp: 200, defense: 98, allAttackUp: 65, accuracy: 70, allSkillAmp: 4}
  ],
  high: [
    // Level 0 - No bonuses
    {},
    // Level 1
    {hp: 40, defense: 4},
    // Level 2
    {hp: 50, defense: 10},
    // Level 3
    {hp: 60, defense: 16},
    // Level 4
    {hp: 70, defense: 22},
    // Level 5
    {hp: 80, defense: 28},
    // Level 6
    {hp: 90, defense: 34},
    // Level 7
    {hp: 100, defense: 40, allAttackUp: 20},
    // Level 8
    {hp: 110, defense: 46, allAttackUp: 25},
    // Level 9
    {hp: 120, defense: 52, allAttackUp: 30},
    // Level 10
    {hp: 130, defense: 58, allAttackUp: 35, accuracy: 10},
    // Level 11
    {hp: 140, defense: 64, allAttackUp: 40, accuracy: 20},
    // Level 12
    {hp: 150, defense: 70, allAttackUp: 45, accuracy: 30},
    // Level 13
    {hp: 160, defense: 76, allAttackUp: 50, accuracy: 40, allSkillAmp: 1},
    // Level 14
    {hp: 170, defense: 82, allAttackUp: 55, accuracy: 50, allSkillAmp: 2},
    // Level 15
    {hp: 180, defense: 88, allAttackUp: 60, accuracy: 60, allSkillAmp: 3}
  ],
  ultimate: [
    // Level 0 - No bonuses
    {},
    // Level 1
    {hp: 80, defense: 24},
    // Level 2
    {hp: 90, defense: 30},
    // Level 3
    {hp: 100, defense: 36},
    // Level 4
    {hp: 110, defense: 42},
    // Level 5
    {hp: 120, defense: 48},
    // Level 6
    {hp: 130, defense: 54},
    // Level 7
    {hp: 140, defense: 60, allAttackUp: 30},
    // Level 8
    {hp: 150, defense: 66, allAttackUp: 35},
    // Level 9
    {hp: 160, defense: 72, allAttackUp: 40},
    // Level 10
    {hp: 170, defense: 78, allAttackUp: 45, accuracy: 30},
    // Level 11
    {hp: 180, defense: 84, allAttackUp: 50, accuracy: 40},
    // Level 12
    {hp: 190, defense: 90, allAttackUp: 55, accuracy: 50},
    // Level 13
    {hp: 200, defense: 96, allAttackUp: 60, accuracy: 60, allSkillAmp: 1},
    // Level 14
    {hp: 210, defense: 102, allAttackUp: 65, accuracy: 70, allSkillAmp: 2},
    // Level 15
    {hp: 220, defense: 108, allAttackUp: 70, accuracy: 80, allSkillAmp: 5}
  ]
};

/**
 * Divine upgrade stats for shoes by grade and level
 * Placeholder for now - will be filled with actual data later
 */
export const shoesDivineUpgrades: Record<string, ArmorDivineUpgradeLevel[]> = {
  highest: [
    // Level 0 - No bonuses
    {},
    // Level 1
    {hp: 60,defense: 14},
    // Level 2
    {hp: 70,defense: 20},
    // Level 3
    {hp: 80,defense: 26},
    // Level 4
    {hp: 90,defense: 32},
    // Level 5
    {hp: 100,defense: 38},
    // Level 6
    {hp: 110,defense: 44},
    // Level 7
    {hp: 120,defense: 50,ignoreAccuracy: 55},
    // Level 8
    {hp: 130,defense: 56,ignoreAccuracy: 65},
    // Level 9
    {hp: 140,defense: 62,ignoreAccuracy: 75},
    // Level 10
    {hp: 150,defense: 68,ignoreAccuracy: 85,maxHpStealPerHit: 3},
    // Level 11
    {hp: 160,defense: 74,ignoreAccuracy: 100,maxHpStealPerHit: 6},
    // Level 12
    {hp: 170, defense: 80, ignoreAccuracy: 115, maxHpStealPerHit: 9},
    // Level 13
    {hp: 180, defense: 86, ignoreAccuracy: 130, maxHpStealPerHit: 12, ignorePenetration: 20},
    // Level 14
    {hp: 190, defense: 92, ignoreAccuracy: 145, maxHpStealPerHit: 15, ignorePenetration: 60},
    // Level 15
    {hp: 200, defense: 98, ignoreAccuracy: 170, maxHpStealPerHit: 18, ignorePenetration: 100}
  ],
  high: [
    // Level 0 - No bonuses
    {},
    // Level 1
    {hp: 40,defense: 4},
    // Level 2
    {hp: 50,defense: 10},
    // Level 3
    {hp: 60,defense: 16},
    // Level 4
    {hp: 70, defense: 22},
    // Level 5
    {hp: 80, defense: 28},
    // Level 6
    {hp: 90, defense: 34},
    // Level 7
    {hp: 100, defense: 40, ignoreAccuracy: 40},
    // Level 8
    {hp: 110, defense: 46, ignoreAccuracy: 50},
    // Level 9
    {hp: 120, defense: 52, ignoreAccuracy: 60},
    // Level 10
    {hp: 130, defense: 58, ignoreAccuracy: 70, maxHpStealPerHit: 1},
    // Level 11
    {hp: 140, defense: 64, ignoreAccuracy: 85, maxHpStealPerHit: 2},
    // Level 12
    {hp: 150, defense: 70, ignoreAccuracy: 100, maxHpStealPerHit: 3},
    // Level 13
    {hp: 160, defense: 76, ignoreAccuracy: 115, maxHpStealPerHit: 6, ignorePenetration: 10},
    // Level 14
    {hp: 170, defense: 82, ignoreAccuracy: 130, maxHpStealPerHit: 9, ignorePenetration: 50},
    // Level 15
    {hp: 180, defense: 88, ignoreAccuracy: 155, maxHpStealPerHit: 12, ignorePenetration: 90}
  ],
  ultimate: [
    // Level 0 - No bonuses
    {},
    // Level 1
    {hp: 80, defense: 24},
    // Level 2
    {hp: 90, defense: 30},
    // Level 3
    {hp: 100, defense: 36},
    // Level 4
    {hp: 110, defense: 42},
    // Level 5
    {hp: 120, defense: 48},
    // Level 6
    {hp: 130, defense: 54},
    // Level 7
    {hp: 140, defense: 60, ignoreAccuracy: 70},
    // Level 8
    {hp: 150, defense: 66, ignoreAccuracy: 80},
    // Level 9
    {hp: 160, defense: 72, ignoreAccuracy: 90},
    // Level 10
    {hp: 170, defense: 78, ignoreAccuracy: 100, maxHpStealPerHit: 5},
    // Level 11
    {hp: 180, defense: 84, ignoreAccuracy: 115, maxHpStealPerHit: 10},
    // Level 12
    {hp: 190, defense: 90, ignoreAccuracy: 130, maxHpStealPerHit: 15},
    // Level 13
    {hp: 200, defense: 96, ignoreAccuracy: 145, maxHpStealPerHit: 18, ignorePenetration: 30},
    // Level 14
    {hp: 210, defense: 102, ignoreAccuracy: 160, maxHpStealPerHit: 21, ignorePenetration: 70},
    // Level 15
    {hp: 220, defense: 108, ignoreAccuracy: 185, maxHpStealPerHit: 24, ignorePenetration: 110}
  ]
};

/**
 * Get divine upgrade stats for a specific armor type, grade and level
 * @param armorType Armor type ('body', 'helmet', 'gauntlet', 'shoes')
 * @param grade Armor grade ('high', 'highest', 'ultimate')
 * @param level Divine upgrade level (0-15)
 * @returns Divine upgrade stats for the specified parameters
 */
export function getArmorDivineUpgradeStats(
  armorType: string | ArmorStatType,
  grade: string,
  level: number = 0
): ArmorDivineUpgradeLevel {
  // Get the right data source based on armor type
  let divineData;
  switch (armorType) {
    case 'body':
      divineData = bodyDivineUpgrades;
      break;
    case 'helmet':
      divineData = helmetDivineUpgrades;
      break;
    case 'gauntlet':
      divineData = gauntletDivineUpgrades;
      break;
    case 'shoes':
      divineData = shoesDivineUpgrades;
      break;
    default:
      return {};
  }
  
  // Get grade-specific data (default to highest if not found)
  const gradeUpgrades = divineData[grade.toLowerCase()] || divineData.highest;
  
  // Ensure level is within valid range
  const clampedLevel = Math.max(0, Math.min(15, level));
  
  return gradeUpgrades[clampedLevel] || {};
}

/**
 * Get the maximum divine upgrade level (always 15 for all grades)
 * @param grade Armor grade (unused but kept for consistency with weapon system)
 * @returns Maximum divine upgrade level
 */
export function getMaxDivineLevel(grade: string): number {
  return 15;
}

/**
 * Check if a divine upgrade level is valid
 * @param level Level to validate
 * @returns True if level is valid (0-15)
 */
export function isValidDivineLevel(level: number): boolean {
  return level >= 0 && level <= 15;
}