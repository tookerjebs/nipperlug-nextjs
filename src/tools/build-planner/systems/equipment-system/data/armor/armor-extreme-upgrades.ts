/**
 * Extreme Upgrades Data for Armor
 * Contains extreme upgrade stat progressions that are shared across all armor types
 * Only the maxExtremeLevel varies per armor grade, but the stat values per level are universal
 */

import { ArmorExtremeUpgradeLevel, ArmorStatType } from './armor-types';

/**
 * Universal extreme upgrade progression for all armor types
 * All armor pieces (body, helmet, gauntlet, shoes) share the same extreme upgrade stats
 */
const universalArmorExtremeUpgrades: ArmorExtremeUpgradeLevel[] = [
  // Level 0 - No bonuses
  {},
  // Level 1
  {
    defense: 20,
    defenseRate: 30
  },
  // Level 2
  {
    defense: 50,
    defenseRate: 90,
    damageReduction: 12
  },
  // Level 3
  {
    defense: 80,
    defenseRate: 130,
    damageReduction: 24,
    allSkillAmp: 3
  },
  // Level 4
  {
    defense: 110,
    defenseRate: 170,
    ignorePenetration: 25,
    damageReduction: 36,
    allSkillAmp: 6
  },
  // Level 5
  {
    defense: 140,
    defenseRate: 210,
    ignorePenetration: 50,
    damageReduction: 48,
    allSkillAmp: 9
  },
  // Level 6
  {
    defense: 180,
    defenseRate: 260,
    ignorePenetration: 75,
    damageReduction: 60,
    allSkillAmp: 12
  },
  // Level 7
  {
    defense: 230,
    defenseRate: 320,
    ignorePenetration: 100,
    damageReduction: 75,
    allSkillAmp: 16,
  }
];

/**
 * Extreme upgrade stats per armor type
 * All armor types now use the same universal progression
 */
export const armorExtremeUpgrades: Record<ArmorStatType, ArmorExtremeUpgradeLevel[]> = {
  body: universalArmorExtremeUpgrades,
  helmet: universalArmorExtremeUpgrades,
  gauntlet: universalArmorExtremeUpgrades,
  shoes: universalArmorExtremeUpgrades
};

/**
 * Get extreme upgrade stats for an armor type and level
 * @param armorType The type of armor (body, helmet, gauntlet, shoes)
 * @param level The extreme upgrade level (0-7)
 * @returns The stats for the specified armor type and level
 */
export function getArmorExtremeUpgradeStats(armorType: ArmorStatType, level: number = 0): ArmorExtremeUpgradeLevel {
  const typeStats = armorExtremeUpgrades[armorType] || armorExtremeUpgrades.body;
  return typeStats[level] || {};
}

/**
 * Get maximum extreme upgrade level for any armor (theoretical max)
 * @returns The maximum extreme level available
 */
export function getMaxExtremeLevel(): number {
  return Math.max(
    armorExtremeUpgrades.body.length - 1, 
    armorExtremeUpgrades.helmet.length - 1,
    armorExtremeUpgrades.gauntlet.length - 1,
    armorExtremeUpgrades.shoes.length - 1
  );
}

/**
 * Get maximum extreme level based on armor grade
 * @param grade The armor grade (high, highest, ultimate, etc.)
 * @returns The maximum extreme level for the specified grade
 */
export function getGradeMaxExtremeLevel(grade: string): number {
  const gradeLimits: Record<string, number> = {
    ultimate: 7,
    highest: 5,
    high: 3,
    normal: 2
  };
  
  return gradeLimits[grade.toLowerCase()] || 0;
}