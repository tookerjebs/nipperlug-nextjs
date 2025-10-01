/**
 * CP Mapping Utilities for Collection Tracker
 * 
 * Maps collection stat names to CP calculator stat names and calculates
 * combat power contributions from collection stats with separate PvE/PvP handling.
 */

import { cpWeights, getCPWeight } from '@/tools/build-planner/data/cp-weights';

export type CPCategory = 'general' | 'pve' | 'pvp';

/**
 * Mapping from collection stat names to CP calculator stat names with category
 */
export const COLLECTION_TO_CP_MAPPING: Record<string, { cpStat: string; category: CPCategory }> = {
  // General Attack & Damage Stats
  'All Attack UP': { cpStat: 'attack', category: 'general' },
  'Add. Damage': { cpStat: 'addDamage', category: 'general' },
  'Normal Attack DMG Up': { cpStat: 'normalDamageUp', category: 'general' },
  
  // PvE Attack & Damage Stats
  'PVE Add. DMG': { cpStat: 'addDamage', category: 'pve' },
  'PVE All Attack': { cpStat: 'attack', category: 'pve' },
  'PVE Normal Attack DMG Up': { cpStat: 'normalDamageUp', category: 'pve' },
  
  // PvP Attack & Damage Stats
  'PVP Add. DMG': { cpStat: 'addDamage', category: 'pvp' },
  
  // General Critical Stats
  'Critical Rate': { cpStat: 'criticalRate', category: 'general' },
  'Critical DMG.': { cpStat: 'criticalDamage', category: 'general' },
  'Critical Dmg.': { cpStat: 'criticalDamage', category: 'general' },
  'Resist Critical Rate': { cpStat: 'resistCriticalRate', category: 'general' },
  'Resist Critical Damage': { cpStat: 'resistCriticalDamage', category: 'general' },
  'Ignore Resist Critical Rate': { cpStat: 'ignoreResistCriticalRate', category: 'general' },
  'Ignore Resist Critical Damage': { cpStat: 'ignoreResistCriticalDamage', category: 'general' },
  
  // PvE Critical Stats
  'PVE Critical DMG': { cpStat: 'criticalDamage', category: 'pve' },
  
  // General Skill Amplification
  'All Skill Amp. UP': { cpStat: 'swordSkillAmp', category: 'general' }, // Uses 349 CP value
  'Resist Skill Amp': { cpStat: 'resistSkillAmp', category: 'general' },
  'Ignore Resist Skill Amp': { cpStat: 'ignoreResistSkillAmp', category: 'general' },
  
  // PvE Skill Amplification
  'PVE All Skill Amp. UP': { cpStat: 'swordSkillAmp', category: 'pve' },
  
  // General Penetration & Accuracy
  'Penetration': { cpStat: 'penetration', category: 'general' },
  'Ignore Penetration': { cpStat: 'ignorePenetration', category: 'general' },
  'Cancel Ignore Penetration': { cpStat: 'cancelIgnorePenetration', category: 'general' },
  'Accuracy': { cpStat: 'accuracy', category: 'general' },
  'Ignore Accuracy': { cpStat: 'ignoreAccuracy', category: 'general' },
  'Evasion': { cpStat: 'evasion', category: 'general' },
  'Ignore Evasion': { cpStat: 'ignoreEvasion', category: 'general' },
  
  // PvE Penetration & Accuracy
  'PVE Penetration': { cpStat: 'penetration', category: 'pve' },
  'PVE Ignore Penetration': { cpStat: 'ignorePenetration', category: 'pve' },
  'PVE Cancel Ignore Penetration': { cpStat: 'cancelIgnorePenetration', category: 'pve' },
  'PVE Ignore Accuracy': { cpStat: 'ignoreAccuracy', category: 'pve' },
  'PVE Ignore Evasion': { cpStat: 'ignoreEvasion', category: 'pve' },
  
  // General Defensive Stats
  'HP': { cpStat: 'hp', category: 'general' },
  'Defense': { cpStat: 'defense', category: 'general' },
  'Defense Rate': { cpStat: 'defenseRate', category: 'general' },
  'DMG Reduction': { cpStat: 'damageReduction', category: 'general' },
  'Ignore Damage Reduction': { cpStat: 'ignoreDamageReduction', category: 'general' },
  'Cancel Ignore DMG Reduction': { cpStat: 'cancelIgnoreDamageReduction', category: 'general' },
  
  // PvE Defensive Stats
  'PVE Defense': { cpStat: 'defense', category: 'pve' },
  'PVE Defense Rate': { cpStat: 'defenseRate', category: 'pve' },
  'PVE DMG Reduction': { cpStat: 'damageReduction', category: 'pve' },
  'PVE Cancel Ignore DMG Reduction': { cpStat: 'cancelIgnoreDamageReduction', category: 'pve' },
  
  // PvP Defensive Stats
  'PVP Defense': { cpStat: 'defense', category: 'pvp' },
  
  // General Attack Rate
  'Attack Rate': { cpStat: 'attackRate', category: 'general' },
  
  // PvE Attack Rate
  'PVE Attack Rate': { cpStat: 'attackRate', category: 'pve' },
  
  // Final Damage Stats
  'Final Damage Increased': { cpStat: 'finalDamageIncreased', category: 'general' },
  'Final Damage Decrease': { cpStat: 'finalDamageDecrease', category: 'general' },
  
  // NOTE: Removed STR, INT, DEX mappings as they don't actually contribute to CP
  // NOTE: Removed resist stats that don't have CP equivalents in the reference
};

/**
 * Get the CP stat name and category for a collection stat name
 */
export function getCollectionStatCPMapping(collectionStatName: string): { cpStat: string; category: CPCategory } | null {
  const mapping = COLLECTION_TO_CP_MAPPING[collectionStatName];
  return mapping || null;
}

/**
 * Calculate CP contribution for a collection stat
 */
export function calculateCollectionStatCP(collectionStatName: string, statValue: number): {
  cp: number;
  category: CPCategory;
  cpStat: string;
} | null {
  const mapping = getCollectionStatCPMapping(collectionStatName);
  if (!mapping) {
    return null;
  }
  
  const cpWeight = getCPWeight(mapping.cpStat);
  if (!cpWeight) {
    return null;
  }
  
  return {
    cp: Math.round(statValue * cpWeight),
    category: mapping.category,
    cpStat: mapping.cpStat
  };
}

/**
 * Check if a collection stat has a CP mapping
 */
export function hasCollectionStatCPMapping(collectionStatName: string): boolean {
  return getCollectionStatCPMapping(collectionStatName) !== null;
}

/**
 * Get all collection stats that have CP mappings
 */
export function getCollectionStatsWithCPMapping(): string[] {
  return Object.keys(COLLECTION_TO_CP_MAPPING);
}

/**
 * Calculate CP for multiple collection stats, separated by category
 */
export function calculateMultipleCollectionStatsCP(stats: Record<string, number>): {
  totalGeneralCP: number;
  totalPvECP: number;
  totalPvPCP: number;
  statContributions: Array<{
    statName: string;
    statValue: number;
    cpContribution: number;
    cpStatName: string;
    category: CPCategory;
  }>;
} {
  let totalGeneralCP = 0;
  let totalPvECP = 0;
  let totalPvPCP = 0;
  const statContributions: Array<{
    statName: string;
    statValue: number;
    cpContribution: number;
    cpStatName: string;
    category: CPCategory;
  }> = [];
  
  Object.entries(stats).forEach(([statName, statValue]) => {
    const cpResult = calculateCollectionStatCP(statName, statValue);
    if (cpResult && statValue > 0) {
      // Add to appropriate category total
      switch (cpResult.category) {
        case 'general':
          totalGeneralCP += cpResult.cp;
          break;
        case 'pve':
          totalPvECP += cpResult.cp;
          break;
        case 'pvp':
          totalPvPCP += cpResult.cp;
          break;
      }
      
      statContributions.push({
        statName,
        statValue,
        cpContribution: cpResult.cp,
        cpStatName: cpResult.cpStat,
        category: cpResult.category
      });
    }
  });
  
  return {
    totalGeneralCP: Math.round(totalGeneralCP),
    totalPvECP: Math.round(totalPvECP),
    totalPvPCP: Math.round(totalPvPCP),
    statContributions
  };
}
