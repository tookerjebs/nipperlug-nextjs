/**
 * Bracelets Chaos Upgrade Data
 * Contains the chaos upgrade bonuses for bracelets (levels 0-15)
 * Based on the official Cabal Online bracelets chaos upgrade table
 */

export interface BraceletChaosUpgradeStats {
  hp?: number;
  defense?: number;
  ignoreEvasion?: number;
  normalDamageUp?: number; // Normal DMG Up (percentage)
  ignoreAccuracy?: number;
  allAttackUp?: number;
  damageReduction?: number; // DMG Reduce
  allSkillAmp?: number; // All Skill Amp (percentage)
  resistCriticalDamage?: number; // Resist Crit. DMG (percentage)
  cancelIgnorePenetration?: number;
  ignoreResistCriticalRate?: number; // Ignore Resist Crit. Rate (percentage)
}

export interface BraceletChaosUpgrade {
  level: number;
  stats: BraceletChaosUpgradeStats;
}

// Chaos upgrade levels (0-15) - shared by ALL bracelets
// Data extracted from official Cabal Online bracelets chaos upgrade table
export const braceletChaosUpgrades: BraceletChaosUpgrade[] = [
  { level: 0, stats: {} }, // No bonus at level 0
  { level: 1, stats: { hp: 10, defense: 5 } },
  { level: 2, stats: { hp: 20, defense: 10 } },
  { level: 3, stats: { hp: 30, defense: 15 } },
  { level: 4, stats: { hp: 40, defense: 20, ignoreEvasion: 10 } },
  { level: 5, stats: { hp: 50, defense: 25, ignoreEvasion: 20, normalDamageUp: 1 } },
  { level: 6, stats: { hp: 60, defense: 30, ignoreEvasion: 30, normalDamageUp: 2 } },
  { level: 7, stats: { hp: 70, defense: 35, ignoreEvasion: 40, normalDamageUp: 3 } },
  { level: 8, stats: { hp: 80, defense: 40, ignoreEvasion: 50, normalDamageUp: 4, ignoreAccuracy: 10 } },
  { level: 9, stats: { hp: 90, defense: 45, ignoreEvasion: 60, normalDamageUp: 5, ignoreAccuracy: 15, allAttackUp: 5 } },
  { level: 10, stats: { hp: 100, defense: 50, ignoreEvasion: 70, normalDamageUp: 6, ignoreAccuracy: 20, allAttackUp: 15 } },
  { level: 11, stats: { hp: 110, defense: 55, ignoreEvasion: 80, normalDamageUp: 7, ignoreAccuracy: 25, allAttackUp: 25, damageReduction: 5 } },
  { level: 12, stats: { hp: 120, defense: 60, ignoreEvasion: 90, normalDamageUp: 8, ignoreAccuracy: 30, allAttackUp: 35, damageReduction: 10, allSkillAmp: 1 } },
  { level: 13, stats: { hp: 130, defense: 65, ignoreEvasion: 100, normalDamageUp: 10, ignoreAccuracy: 35, allAttackUp: 45, damageReduction: 15, allSkillAmp: 2, resistCriticalDamage: 3 } },
  { level: 14, stats: { hp: 140, defense: 70, ignoreEvasion: 110, normalDamageUp: 12, ignoreAccuracy: 40, allAttackUp: 55, damageReduction: 20, allSkillAmp: 3, resistCriticalDamage: 5, cancelIgnorePenetration: 10 } },
  { level: 15, stats: { hp: 150, defense: 75, ignoreEvasion: 120, normalDamageUp: 15, ignoreAccuracy: 50, allAttackUp: 65, damageReduction: 25, allSkillAmp: 4, resistCriticalDamage: 8, cancelIgnorePenetration: 20, ignoreResistCriticalRate: 1 } }
];

// Helper function to get chaos upgrade stats for a specific level
export const getBraceletChaosUpgradeStats = (level: number): BraceletChaosUpgradeStats => {
  if (level < 0 || level > 15) {
    return {};
  }
  return braceletChaosUpgrades[level]?.stats || {};
};

// Helper function to get the maximum chaos level for bracelets
export const getMaxBraceletChaosLevel = (): number => {
  return 15;
};

// Helper function to validate chaos level
export const isValidBraceletChaosLevel = (level: number): boolean => {
  return level >= 0 && level <= 15;
};

// Export the chaos upgrade data for use in other modules
export default braceletChaosUpgrades;