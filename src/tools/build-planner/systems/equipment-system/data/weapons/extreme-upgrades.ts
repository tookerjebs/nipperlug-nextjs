/**
 * Extreme Upgrades Data for Weapons
 * Contains extreme upgrade stat progressions that are shared across all weapon types
 * Only the maxExtremeLevel varies per weapon grade, but the stat values per level are universal
 */

import { ExtremeUpgradeLevel, WeaponStatType } from './types';

/**
 * Extreme upgrade stats per level
 * Based on the original data from weapons-data.js
 * Each level has specific stat values rather than incremental ones
 * These stats apply to ALL weapons that support extreme upgrades
 */
export const extremeUpgrades: Record<WeaponStatType, ExtremeUpgradeLevel[]> = {
  oneHanded: [
    // Level 0 - No bonuses
    {},
    // Level 1
    {
      allAttackUp: 20,
      attackRate: 50
    },
    // Level 2
    {
      allAttackUp: 60,
      attackRate: 120,
      accuracy: 80
    },
    // Level 3
    {
      allAttackUp: 100,
      attackRate: 190,
      accuracy: 140,
      criticalDamage: 7
    },
    // Level 4
    {
      allAttackUp: 130,
      attackRate: 270,
      accuracy: 200,
      criticalDamage: 15,
      penetration: 30
    },
    // Level 5
    {
      allAttackUp: 160,
      attackRate: 360,
      accuracy: 260,
      criticalDamage: 23,
      penetration: 55
    },
    // Level 6
    {
      allAttackUp: 200,
      attackRate: 460,
      accuracy: 330,
      criticalDamage: 31,
      penetration: 80
    },
    // Level 7 (only highest material weapons can reach this)
    {
      allAttackUp: 250,
      attackRate: 600,
      accuracy: 420,
      criticalDamage: 40,
      penetration: 110
    }
  ],
  twoHanded: [
    // Level 0 - No bonuses
    {},
    // Level 1
    {
      allAttackUp: 40,
      attackRate: 100
    },
    // Level 2
    {
      allAttackUp: 120,
      attackRate: 240,
      accuracy: 160
    },
    // Level 3
    {
      allAttackUp: 200,
      attackRate: 380,
      accuracy: 280,
      criticalDamage: 14
    },
    // Level 4
    {
      allAttackUp: 260,
      attackRate: 540,
      accuracy: 400,
      criticalDamage: 30,
      penetration: 60
    },
    // Level 5
    {
      allAttackUp: 320,
      attackRate: 720,
      accuracy: 520,
      criticalDamage: 46,
      penetration: 110
    },
    // Level 6
    {
      allAttackUp: 400,
      attackRate: 920,
      accuracy: 660,
      criticalDamage: 62,
      penetration: 160
    },
    // Level 7 (only highest material weapons can reach this)
    {
      allAttackUp: 500,
      attackRate: 1200,
      accuracy: 840,
      criticalDamage: 80,
      penetration: 220
    }
  ]
};

/**
 * Get extreme upgrade stats for a weapon type and level
 * @param handType - The weapon hand type ('oneHanded' or 'twoHanded')
 * @param level - Extreme upgrade level (0-7)
 * @returns The extreme upgrade stats for the specified level
 */
export function getExtremeUpgradeStats(
  handType: WeaponStatType, 
  level: number = 0
): ExtremeUpgradeLevel {
  const typeStats = extremeUpgrades[handType] || extremeUpgrades.oneHanded;
  return typeStats[level] || {};
}

/**
 * Get maximum extreme upgrade level for any weapon (theoretical max)
 */
export function getMaxExtremeLevel(): number {
  return Math.max(
    extremeUpgrades.oneHanded.length - 1,
    extremeUpgrades.twoHanded.length - 1
  );
}