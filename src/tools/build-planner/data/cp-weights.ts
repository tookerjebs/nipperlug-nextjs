/**
 * Combat Power (CP) Weights Configuration
 * 
 * This file contains the CP weights for each stat, determining how much CP
 * each point of a stat contributes to the overall Combat Power calculation.
 * 
 * These weights are based on the original CP calculator from the old project
 * and represent the relative importance of each stat in combat effectiveness.
 */

export interface CPWeights {
  [statName: string]: number;
}

/**
 * CP weights for each stat (how much CP 1 point of each stat gives)
 * Values are taken from the original cp-calculator.js
 */
export const cpWeights: CPWeights = {
  // ======================================
  // OFFENSIVE STATS
  // ======================================
  
  // Critical stats
  criticalRate: 750,                    // 1% Crit. Rate = 750 CP
  criticalDamage: 177,                  // 1% Crit. Damage = 177 CP
  resistCriticalRate: 636,              // 1% Resist Crit. Rate = 636 CP
  resistCriticalDamage: 150,               // 1% Resist Crit. Damage = 150 CP
  ignoreResistCriticalRate: 574,        // 1% Ignore Resist Crit. Rate = 574 CP
  ignoreResistCriticalDamage: 142.5,       // 1% Ignore Resist Crit. Damage = 142.5 CP
  
  // Skill amplification stats
  // Note: allSkillAmp is a pseudo-stat that gets converted to swordSkillAmp and magicSkillAmp
  // so we don't include it here to avoid double counting
  swordSkillAmp: 349,               // 1% Sword Skill AMP = 349 CP
  magicSkillAmp: 349,               // 1% Magic Skill AMP = 349 CP
  resistSkillAmp: 296.5,            // 1% Resist Skill AMP = 296.5 CP
  ignoreResistSkillAmp: 267,        // 1% Ignore Resist Skill AMP = 267 CP
  
  // Attack stats
  // Note: allAttackUp is a pseudo-stat that gets converted to attack and magicAttack
  // so we don't include it here to avoid double counting
  attack: 34.5,                     // 1 Attack = 34.5 CP
  magicAttack: 34.5,                // 1 Magic Attack = 34.5 CP
  normalDamageUp: 86,               // 1% Normal Damage UP = 86 CP
  addDamage: 35,                    // 1 Add Damage = 35 CP
  
  // Penetration stats
  penetration: 71,                  // 1 Penetration = 71 CP
  ignorePenetration: 53.1,          // 1 Ignore Penetration = 53.1 CP
  cancelIgnorePenetration: 47.8,    // 1 Cancel Ignore Penetration = 47.8 CP
  
  // Accuracy and evasion
  accuracy: 6.5,                    // 1 Accuracy = 6.5 CP
  ignoreAccuracy: 5.3,              // 1 Ignore Accuracy = 5.3 CP
  evasion: 5.3,                     // 1 Evasion = 5.3 CP
  ignoreEvasion: 4.5,               // 1 Ignore Evasion = 4.5 CP
  
  // Final damage stats
  finalDamageIncreased: 1604,       // 1% Final Damage Increase = 1604 CP
  finalDamageDecrease: 1451,        // 1% Final Damage Decrease = 1451 CP
  
  // ======================================
  // DEFENSIVE STATS
  // ======================================
  
  // Basic defensive stats
  hp: 5,                            // 1 HP = 5 CP
  defense: 21,                      // 1 Defense = 21 CP
  defenseRate: 2.4,                 // 1 Defense Rate = 2.4 CP
  damageReduction: 19.5,               // 1 Damage Reduction = 19.5 CP
  ignoreDamageReduction: 16.8,         // 1 Ignore Damage Reduction = 16.8 CP
  cancelIgnoreDamageReduction: 19.9,   // 1 Cancel Ignore Damage Reduction = 19.9 CP
  
  // ======================================
  // ATTACK RATE STATS
  // ======================================
  
  attackRate: 3,                    // 1 Attack Rate = 3 CP
                // 1% Resist Silence = 20 CP (estimated)
};

/**
 * Check if a stat name is a PvE or PvP variant
 * @param statName - Name of the stat
 * @returns True if the stat is a variant (starts with 'pve' or 'pvp')
 */
export function isVariantStat(statName: string): boolean {
  return statName.startsWith('pve') || statName.startsWith('pvp');
}

/**
 * Extract the base stat name from a variant stat name
 * @param statName - Variant stat name (e.g., 'pveAttack', 'pvpCriticalDamage')
 * @returns Base stat name (e.g., 'attack', 'criticalDamage') or null if not a variant
 */
export function getBaseStatName(statName: string): string | null {
  if (statName.startsWith('pve') || statName.startsWith('pvp')) {
    // Remove the prefix (pve or pvp) and lowercase the first letter
    const withoutPrefix = statName.substring(3);
    if (withoutPrefix.length > 0) {
      return withoutPrefix.charAt(0).toLowerCase() + withoutPrefix.slice(1);
    }
  }
  return null;
}

/**
 * Get the CP weight for a stat, handling variants by looking up the base stat weight
 * @param statName - Name of the stat (can be base or variant)
 * @returns CP weight for the stat, or 0 if not found
 */
function getCPWeightForStat(statName: string): number {
  // If it's a variant, get the base stat name and use its weight
  if (isVariantStat(statName)) {
    const baseStatName = getBaseStatName(statName);
    if (baseStatName) {
      return cpWeights[baseStatName] || 0;
    }
  }
  // Otherwise, use the stat name directly
  return cpWeights[statName] || 0;
}

/**
 * Calculate Combat Power based on character stats
 * @param stats - Object containing character stats
 * @param combatType - Type of CP to calculate: 'general' (base only), 'pve' (base + PvE), 'pvp' (base + PvP), or undefined (all stats)
 * @returns Total Combat Power as a number
 */
export function calculateCombatPower(
  stats: Record<string, number>,
  combatType?: 'general' | 'pve' | 'pvp'
): number {
  if (!stats || typeof stats !== 'object') {
    return 0;
  }

  let totalCP = 0;

  // Calculate CP for each stat based on weights
  for (const statName in stats) {
    const statValue = stats[statName];
    
    // Filter stats based on combat type
    if (combatType === 'general') {
      // General CP: exclude all variants
      if (isVariantStat(statName)) {
        continue;
      }
    } else if (combatType === 'pve') {
      // PvE CP: exclude PvP variants
      if (statName.startsWith('pvp')) {
        continue;
      }
    } else if (combatType === 'pvp') {
      // PvP CP: exclude PvE variants
      if (statName.startsWith('pve')) {
        continue;
      }
    }
    // If combatType is undefined, include all stats (backward compatibility)

    const cpWeight = getCPWeightForStat(statName);
    
    if (typeof statValue === 'number' && cpWeight && statValue > 0) {
      totalCP += statValue * cpWeight;
    }
  }

  // Round to nearest integer
  return Math.round(totalCP);
}

/**
 * Calculate General CP (base stats only, no PvE/PvP variants)
 * @param stats - Object containing character stats
 * @returns General Combat Power as a number
 */
export function calculateGeneralCP(stats: Record<string, number>): number {
  return calculateCombatPower(stats, 'general');
}

/**
 * Calculate PvE CP (base stats + PvE variants)
 * @param stats - Object containing character stats
 * @returns PvE Combat Power as a number
 */
export function calculatePveCP(stats: Record<string, number>): number {
  return calculateCombatPower(stats, 'pve');
}

/**
 * Calculate PvP CP (base stats + PvP variants)
 * @param stats - Object containing character stats
 * @returns PvP Combat Power as a number
 */
export function calculatePvpCP(stats: Record<string, number>): number {
  return calculateCombatPower(stats, 'pvp');
}

/**
 * Calculate all three CP types at once
 * @param stats - Object containing character stats
 * @returns Object with general, pve, and pvp CP values
 */
export function calculateAllCP(stats: Record<string, number>): {
  general: number;
  pve: number;
  pvp: number;
} {
  return {
    general: calculateGeneralCP(stats),
    pve: calculatePveCP(stats),
    pvp: calculatePvpCP(stats),
  };
}

/**
 * Get the CP weight for a specific stat (handles variants)
 * @param statName - Name of the stat (can be base or variant)
 * @returns CP weight for the stat, or 0 if not found
 */
export function getCPWeight(statName: string): number {
  return getCPWeightForStat(statName);
}

/**
 * Get all stats that contribute to CP calculation
 * @returns Array of stat names that have CP weights
 */
export function getCPStats(): string[] {
  return Object.keys(cpWeights);
}

/**
 * Calculate CP contribution for a specific stat (handles variants)
 * @param statName - Name of the stat (can be base or variant)
 * @param statValue - Value of the stat
 * @returns CP contribution from this stat
 */
export function calculateStatCP(statName: string, statValue: number): number {
  const weight = getCPWeight(statName);
  return Math.round(statValue * weight);
}