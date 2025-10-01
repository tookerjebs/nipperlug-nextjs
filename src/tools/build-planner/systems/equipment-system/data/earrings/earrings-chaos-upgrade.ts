/**
 * Earrings Chaos Upgrade Data
 * Contains the chaos upgrade bonuses for earrings (levels 0-15)
 * Based on the official Cabal Online earrings chaos upgrade table
 */

export interface EarringChaosUpgradeStats {
  hp?: number;
  defense?: number;
  maxHpStealPerHit?: number; // HP Absorb Up / Max HP Steal per hit
  ignorePenetration?: number;
  normalDamageUp?: number; // Normal DMG Up (percentage)
  criticalDamage?: number; // Crit. DMG (percentage)
  allAttackUp?: number;
  ignoreAccuracy?: number;
  resistCriticalDamage?: number; // Resist Crit. DMG (percentage)
  resistSkillAmp?: number; // Resist Skill Amp (percentage)
  ignoreResistCriticalRate?: number; // Ignore Resist Crit. Rate (percentage)
}

export interface EarringChaosUpgrade {
  level: number;
  stats: EarringChaosUpgradeStats;
}

// Chaos upgrade levels (0-15) - shared by ALL earrings
// Data extracted from official Cabal Online earrings chaos upgrade table
export const earringChaosUpgrades: EarringChaosUpgrade[] = [
  { level: 0, stats: {} }, // No bonus at level 0
  { level: 1, stats: { hp: 10, defense: 5 } },
  { level: 2, stats: { hp: 20, defense: 10 } },
  { level: 3, stats: { hp: 30, defense: 15 } },
  { level: 4, stats: { hp: 40, defense: 20, maxHpStealPerHit: 1 } },
  { level: 5, stats: { hp: 50, defense: 25, maxHpStealPerHit: 2, ignorePenetration: 5 } },
  { level: 6, stats: { hp: 60, defense: 30, maxHpStealPerHit: 3, ignorePenetration: 10, normalDamageUp: 1 } },
  { level: 7, stats: { hp: 70, defense: 35, maxHpStealPerHit: 4, ignorePenetration: 15, normalDamageUp: 2, criticalDamage: 1 } },
  { level: 8, stats: { hp: 80, defense: 40, maxHpStealPerHit: 5, ignorePenetration: 20, normalDamageUp: 3, criticalDamage: 2 } },
  { level: 9, stats: { hp: 90, defense: 45, maxHpStealPerHit: 6, ignorePenetration: 25, normalDamageUp: 4, criticalDamage: 3, allAttackUp: 10 } },
  { level: 10, stats: { hp: 100, defense: 50, maxHpStealPerHit: 7, ignorePenetration: 30, normalDamageUp: 5, criticalDamage: 4, allAttackUp: 20 } },
  { level: 11, stats: { hp: 110, defense: 55, maxHpStealPerHit: 8, ignorePenetration: 35, normalDamageUp: 6, criticalDamage: 5, allAttackUp: 30, ignoreAccuracy: 15 } },
  { level: 12, stats: { hp: 120, defense: 60, maxHpStealPerHit: 9, ignorePenetration: 40, normalDamageUp: 7, criticalDamage: 6, allAttackUp: 40, ignoreAccuracy: 30, resistCriticalDamage: 1 } },
  { level: 13, stats: { hp: 130, defense: 65, maxHpStealPerHit: 10, ignorePenetration: 45, normalDamageUp: 8, criticalDamage: 7, allAttackUp: 50, ignoreAccuracy: 45, resistCriticalDamage: 2, resistSkillAmp: 1 } },
  { level: 14, stats: { hp: 140, defense: 70, maxHpStealPerHit: 11, ignorePenetration: 50, normalDamageUp: 9, criticalDamage: 8, allAttackUp: 60, ignoreAccuracy: 60, resistCriticalDamage: 4, resistSkillAmp: 2 } },
  { level: 15, stats: { hp: 150, defense: 75, maxHpStealPerHit: 12, ignorePenetration: 55, normalDamageUp: 10, criticalDamage: 9, allAttackUp: 80, ignoreAccuracy: 90, resistCriticalDamage: 8, resistSkillAmp: 4, ignoreResistCriticalRate: 1 } }
];

// Helper function to get chaos upgrade stats for a specific level
export const getEarringChaosUpgradeStats = (level: number): EarringChaosUpgradeStats => {
  if (level < 0 || level > 15) {
    return {};
  }
  return earringChaosUpgrades[level]?.stats || {};
};

// Helper function to get the maximum chaos level for earrings
export const getMaxEarringChaosLevel = (): number => {
  return 15;
};

// Helper function to validate chaos level
export const isValidEarringChaosLevel = (level: number): boolean => {
  return level >= 0 && level <= 15;
};

// Export the chaos upgrade data for use in other modules
export default earringChaosUpgrades;