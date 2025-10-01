/**
 * Enhanced stat combination utilities for PvE/PvP damage calculations
 * Combines base stats with their PvE/PvP variants
 */

import type { BuildStats } from '../stores/buildPlannerStore';

// Simplified damage type for damage calculator
export type DamageType = 'sword' | 'magic';

/**
 * Get primary stats for a damage type
 */
function getPrimaryStats(damageType: DamageType) {
  if (damageType === 'magic') {
    return {
      baseAttackStat: 'magicAttack',
      skillAmpStat: 'magicSkillAmp'
    };
  } else {
    return {
      baseAttackStat: 'attack',
      skillAmpStat: 'swordSkillAmp'
    };
  }
}

/**
 * Get combined attack stats for a specific damage type and combat type
 */
export function getCombinedAttackStats(
  buildStats: BuildStats, 
  damageType: DamageType,
  combatType: 'pve' | 'pvp'
) {
  const { baseAttackStat, skillAmpStat } = getPrimaryStats(damageType);
  
  // Construct variant stat names (e.g., 'pveAttack', 'pvpMagicAttack')
  const variantAttackStat = `${combatType}${baseAttackStat.charAt(0).toUpperCase() + baseAttackStat.slice(1)}`;
  const variantSkillAmpStat = `${combatType}${skillAmpStat.charAt(0).toUpperCase() + skillAmpStat.slice(1)}`;
  
  const baseAttack = buildStats[baseAttackStat] || 0;
  const variantAttack = buildStats[variantAttackStat] || 0;
  
  const baseSkillAmp = buildStats[skillAmpStat] || 0;
  const variantSkillAmp = buildStats[variantSkillAmpStat] || 0;
  
  return {
    totalAttack: baseAttack + variantAttack,
    totalSkillAmp: baseSkillAmp + variantSkillAmp,
    breakdown: {
      baseAttack,
      variantAttack,
      baseSkillAmp,
      variantSkillAmp
    }
  };
}

/**
 * Get all combined stats with PvE/PvP variants applied
 */
export function getAllCombinedStats(
  buildStats: BuildStats,
  damageType: DamageType,
  combatType: 'pve' | 'pvp'
) {
  const attackStats = getCombinedAttackStats(buildStats, damageType, combatType);
  
  // Create a copy of build stats to modify
  const combinedStats = { ...buildStats };
  
  // Apply the combined attack stats
  const { baseAttackStat, skillAmpStat } = getPrimaryStats(damageType);
  combinedStats[baseAttackStat] = attackStats.totalAttack;
  combinedStats[skillAmpStat] = attackStats.totalSkillAmp;
  
  // Combine other relevant stats with their variants
  Object.keys(buildStats).forEach(statKey => {
    if (statKey.startsWith(combatType)) {
      // Extract base stat name from variant (e.g., 'pveAttack' -> 'attack')
      const baseStat = statKey.replace(combatType, '');
      const baseStatKey = baseStat.charAt(0).toLowerCase() + baseStat.slice(1);
      
      if (combinedStats[baseStatKey] !== undefined && baseStatKey !== baseAttackStat && baseStatKey !== skillAmpStat) {
        combinedStats[baseStatKey] = (combinedStats[baseStatKey] || 0) + (buildStats[statKey] || 0);
      }
    }
  });
  
  return combinedStats;
}