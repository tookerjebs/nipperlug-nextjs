/**
 * Amulets Chaos Upgrade Data
 * Contains the chaos upgrade bonuses for amulets (levels 0-15)
 * Based on the official Cabal Online amulets chaos upgrade table
 */

export interface AmuletChaosUpgradeStats {
  defense?: number;
  defenseRate?: number;
  ignoreAccuracy?: number;
  ignoreEvasion?: number;
  ignoreDamageReduction?: number;
  criticalDamage?: number; // Crit. DMG (percentage)
  resistCriticalDamage?: number; // Resist Crit. DMG (percentage)
  allSkillAmp?: number; // All Skill Amp (percentage)
  resistSkillAmp?: number; // Resist Skill Amp (percentage)
  maxCriticalRate?: number; // Max Crit. Rate (percentage)
}

export interface AmuletChaosUpgrade {
  level: number;
  stats: AmuletChaosUpgradeStats;
}

// Chaos upgrade levels (0-15) - shared by ALL amulets
// Data extracted from official Cabal Online amulets chaos upgrade table
export const amuletChaosUpgrades: AmuletChaosUpgrade[] = [
  { level: 0, stats: {} }, // No bonus at level 0
  { level: 1, stats: { defense: 10, defenseRate: 15 } },
  { level: 2, stats: { defense: 20, defenseRate: 30 } },
  { level: 3, stats: { defense: 30, defenseRate: 45, ignoreAccuracy: 10 } },
  { level: 4, stats: { defense: 40, defenseRate: 60, ignoreAccuracy: 20, ignoreEvasion: 10 } },
  { level: 5, stats: { defense: 50, defenseRate: 75, ignoreAccuracy: 30, ignoreEvasion: 20, ignoreDamageReduction: 5 } },
  { level: 6, stats: { defense: 60, defenseRate: 90, ignoreAccuracy: 40, ignoreEvasion: 30, ignoreDamageReduction: 10, criticalDamage: 1 } },
  { level: 7, stats: { defense: 70, defenseRate: 105, ignoreAccuracy: 50, ignoreEvasion: 40, ignoreDamageReduction: 15, criticalDamage: 2, resistCriticalDamage: 1 } },
  { level: 8, stats: { defense: 80, defenseRate: 120, ignoreAccuracy: 60, ignoreEvasion: 50, ignoreDamageReduction: 20, criticalDamage: 3, resistCriticalDamage: 2 } },
  { level: 9, stats: { defense: 90, defenseRate: 135, ignoreAccuracy: 70, ignoreEvasion: 60, ignoreDamageReduction: 25, criticalDamage: 4, resistCriticalDamage: 3 } },
  { level: 10, stats: { defense: 100, defenseRate: 150, ignoreAccuracy: 80, ignoreEvasion: 70, ignoreDamageReduction: 30, criticalDamage: 5, resistCriticalDamage: 4 } },
  { level: 11, stats: { defense: 110, defenseRate: 165, ignoreAccuracy: 90, ignoreEvasion: 80, ignoreDamageReduction: 35, criticalDamage: 6, resistCriticalDamage: 5, allSkillAmp: 1 } },
  { level: 12, stats: { defense: 120, defenseRate: 180, ignoreAccuracy: 100, ignoreEvasion: 90, ignoreDamageReduction: 40, criticalDamage: 7, resistCriticalDamage: 6, allSkillAmp: 2, resistSkillAmp: 1 } },
  { level: 13, stats: { defense: 130, defenseRate: 195, ignoreAccuracy: 110, ignoreEvasion: 100, ignoreDamageReduction: 45, criticalDamage: 8, resistCriticalDamage: 7, allSkillAmp: 3, resistSkillAmp: 2 } },
  { level: 14, stats: { defense: 140, defenseRate: 210, ignoreAccuracy: 120, ignoreEvasion: 110, ignoreDamageReduction: 50, criticalDamage: 9, resistCriticalDamage: 8, allSkillAmp: 4, resistSkillAmp: 3 } },
  { level: 15, stats: { defense: 150, defenseRate: 225, ignoreAccuracy: 130, ignoreEvasion: 120, ignoreDamageReduction: 50, criticalDamage: 10, resistCriticalDamage: 9, allSkillAmp: 5, resistSkillAmp: 4, maxCriticalRate: 1 } }
];

// Helper function to get chaos upgrade stats for a specific level
export const getAmuletChaosUpgradeStats = (level: number): AmuletChaosUpgradeStats => {
  if (level < 0 || level > 15) {
    return {};
  }
  return amuletChaosUpgrades[level]?.stats || {};
};

// Helper function to get the maximum chaos level for amulets
export const getMaxAmuletChaosLevel = (): number => {
  return 15;
};

// Helper function to validate chaos level
export const isValidAmuletChaosLevel = (level: number): boolean => {
  return level >= 0 && level <= 15;
};

// Export the chaos upgrade data for use in other modules
export default amuletChaosUpgrades;