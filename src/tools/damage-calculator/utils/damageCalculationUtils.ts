/**
 * Shared Damage Calculation Utilities
 * Centralized damage calculation logic with step-by-step breakdown
 * Used by both the build planner store and damage calculation modal
 */

import type { BuildStats } from '../stores/buildPlannerStore';

// Define the build stats structure for calculations
export interface DamageCalculationStats {
  attack: number;
  magicAttack: number;
  penetration: number;
  cancelIgnorePenetration: number;
  criticalDamage: number;
  normalDamageUp: number;
  skillAmp: number;
  swordSkillAmp: number;
  magicSkillAmp: number;
  addDamage: number;
  finalDamageIncreased: number;
  ignoreDamageReduction: number;
  ignoreResistCriticalDamage: number;
}

// Define enemy configuration for damage calculations
export interface EnemyConfig {
  level: number;
  defense: number;
  damageReduction: number;
  damageReductionPercent: number;
  finalDamageDecrease: number;
  ignorePenetration: number;
  resistCriticalDamage: number;
}

// Define step-by-step calculation breakdown
export interface DamageCalculationSteps {
  // Input values
  baseAttackValue: number;
  totalSkillAmp: number;
  playerLevel: number;
  enemyLevel: number;
  levelDifference: number;
  levelPenaltyPercent: number;
  
  // Penetration calculations
  basePenetration: number;
  enemyIgnorePenetration: number;
  cancelIgnorePenetration: number;
  effectiveEnemyIgnorePenetration: number;
  effectivePenetration: number;
  
  // Defense calculations
  enemyDefense: number;
  baseDefenseReduction: number;
  cappedDefenseReduction: number;
  penetrationReduction: number;
  finalDefenseReduction: number;
  
  // Ignore damage reduction calculations
  ignoreDamageReduction: number;
  enemyDamageReduction: number;
  enemyDamageReductionPercent: number;
  effectiveEnemyDamageReduction: number;
  effectiveEnemyDamageReductionPercent: number;
  
  // Critical damage resistance calculations
  criticalDamage: number;
  ignoreResistCriticalDamage: number;
  enemyResistCritDmg: number;
  effectiveEnemyResistCritDmg: number;
  effectiveCritDamage: number;
  
  // Step-by-step damage values
  baseDamage: number;
  amplifiedDamage: number;
  levelAdjustedDamage: number;
  defenseAdjustedDamage: number;
  withAddDamage: number;
  afterDamageReduction: number;
  finalBaseDamage: number;
  
  // Final results with variance
  normalDamageWithNormalUp: number;
  criticalDamageValue: number;
  minNormalDamage: number;
  maxNormalDamage: number;
  minCriticalDamage: number;
  maxCriticalDamage: number;
  
  // Damage type and variance info
  damageType: 'sword' | 'magic';
  hasVariance: boolean;
  variance: number;
}

// Define the final damage calculation result
export interface DamageCalculationResult {
  sword: {
    normal: { min: number; max: number; };
    critical: { min: number; max: number; };
  };
  magic: {
    normal: { min: number; max: number; };
    critical: { min: number; max: number; };
  };
  steps?: DamageCalculationSteps;
}

/**
 * Calculate defense reduction using the correct Cabal Online formula
 * 
 * Defense Formula Research:
 * - Base Defense Reduction: 1 - 1000/(1000 + Defense)
 * - Maximum Defense Reduction: 95% (confirmed by official Korean documentation)
 * - Minimum Defense Reduction: 0.3% (confirmed by official Korean documentation)
 * - Penetration Effect: Multiplies defense reduction by (1 - Penetration/Defense)
 * 
 * Example: 5000 defense, 2000 penetration
 * - Base: 1 - 1000/(1000+5000) = 83.3%
 * - Penetration multiplier: 1 - 2000/5000 = 0.6
 * - Final: 83.3% × 0.6 = 50%
 */
export function calculateDefenseReduction(defense: number, penetration: number): number {
  if (defense <= 0) return 0;
  
  // Base defense reduction formula: 1 - 1000/(1000 + Defense)
  const baseReduction = 1 - (1000 / (1000 + defense));
  
  // Apply 95% maximum cap
  const cappedReduction = Math.min(baseReduction, 0.95);
  
  // Penetration multiplies the defense reduction by (1 - Penetration/Defense)
  const penetrationMultiplier = Math.max(0, 1 - penetration / defense);
  const finalReduction = cappedReduction * penetrationMultiplier;
  
  // Apply 0.3% minimum cap (official Korean documentation)
  // "no matter how high the penetration is, the amount of damage reduced from the base damage will not be reduced to less than 0.3%"
  const finalReductionWithMinimum = Math.max(finalReduction, 0.003);
  
  return finalReductionWithMinimum;
}

/**
 * Combine base stats with PvE variants for damage calculation
 * Simplified version that works directly with damage types instead of character classes
 * @param stats Base stats to combine (can be DamageCalculationStats or any BuildStats-like object)
 * @param damageType Damage type ('sword' | 'magic') for stat combination
 * @returns Combined stats with PvE variants applied
 */
function combineStatsWithPveVariants(
  stats: DamageCalculationStats | any,
  damageType: 'sword' | 'magic' | null
): DamageCalculationStats {
  // Convert to base format first
  const baseStats = {
    attack: stats.attack || 0,
    magicAttack: stats.magicAttack || 0,
    penetration: stats.penetration || 0,
    cancelIgnorePenetration: stats.cancelIgnorePenetration || 0,
    criticalDamage: stats.criticalDamage || 0,
    normalDamageUp: stats.normalDamageUp || 0,
    skillAmp: stats.skillAmp || 0,
    swordSkillAmp: stats.swordSkillAmp || 0,
    magicSkillAmp: stats.magicSkillAmp || 0,
    addDamage: stats.addDamage || 0,
    finalDamageIncreased: stats.finalDamageIncreased || 0,
    ignoreDamageReduction: stats.ignoreDamageReduction || 0,
    ignoreResistCriticalDamage: stats.ignoreResistCriticalDamage || 0,
  };

  // If no damage type is provided, return base stats as-is
  if (!damageType) {
    return baseStats;
  }

  // Combine with PvE variants manually (simplified approach)
  // This directly adds PvE variants to base stats without needing the complex class system
  const combinedStats = { ...baseStats };

  // Add PvE Attack variants
  if (damageType === 'magic') {
    combinedStats.magicAttack += stats.pveMagicAttack || 0;
    combinedStats.magicSkillAmp += stats.pveMagicSkillAmp || 0;
  } else {
    combinedStats.attack += stats.pveAttack || 0;
    combinedStats.swordSkillAmp += stats.pveSwordSkillAmp || 0;
  }

  // Add other PvE variants that apply to both damage types
  combinedStats.criticalDamage += stats.pveCriticalDamage || 0;
  combinedStats.normalDamageUp += stats.pveNormalDamageUp || 0;
  combinedStats.skillAmp += stats.pveSkillAmp || 0;
  combinedStats.addDamage += stats.pveAddDamage || 0;
  combinedStats.finalDamageIncreased += stats.pveFinalDamageIncreased || 0;
  combinedStats.penetration += stats.pvePenetration || 0;
  combinedStats.cancelIgnorePenetration += stats.pveCancelIgnorePenetration || 0;
  combinedStats.ignoreDamageReduction += stats.pveIgnoreDamageReduction || 0;
  combinedStats.ignoreResistCriticalDamage += stats.pveIgnoreResistCriticalDamage || 0;

  return combinedStats;
}

/**
 * Calculate effective penetration after enemy ignore penetration
 */
export function calculateEffectivePenetration(
  basePenetration: number,
  enemyIgnorePenetration: number,
  cancelIgnorePenetration: number
): { effectiveEnemyIgnorePenetration: number; effectivePenetration: number } {
  // Step 1: Enemy Ignore Penetration gets reduced by our Cancel Ignore Penetration
  const effectiveEnemyIgnorePenetration = Math.max(0, enemyIgnorePenetration - cancelIgnorePenetration);
  
  // Step 2: Our Penetration gets reduced by the remaining Enemy Ignore Penetration
  const effectivePenetration = Math.max(0, basePenetration - effectiveEnemyIgnorePenetration);
  
  return { effectiveEnemyIgnorePenetration, effectivePenetration };
}

/**
 * Calculate damage with detailed step-by-step breakdown
 * Always uses PvE stat combinations for damage calculations
 * 
 * @param stats Character stats for damage calculation
 * @param level Character level (defaults to 200 for calculations)
 * @param enemyConfig Enemy configuration
 * @param damageType Damage type ('sword' | 'magic', optional, for PvE stat combination)
 * @param includeSteps Whether to include detailed step breakdown
 */
export function calculateDamageWithSteps(
  stats: DamageCalculationStats | any,
  level: number,
  enemyConfig: EnemyConfig,
  damageType: 'sword' | 'magic' | null = null,
  includeSteps: boolean = false
): DamageCalculationResult {
  
  // Combine stats with PvE variants if damage type is provided
  const effectiveStats = combineStatsWithPveVariants(stats, damageType);
  
  // Extract stats from the combined stats
  const {
    attack,
    magicAttack,
    penetration: basePenetration,
    cancelIgnorePenetration,
    criticalDamage,
    normalDamageUp,
    skillAmp,
    swordSkillAmp,
    magicSkillAmp,
    addDamage,
    finalDamageIncreased,
    ignoreDamageReduction,
    ignoreResistCriticalDamage
  } = effectiveStats;
  
  // Extract enemy stats
  const {
    level: enemyLevel = level,
    defense: enemyDefense = 0,
    damageReduction: enemyDamageReduction = 0,
    damageReductionPercent: enemyDamageReductionPercent = 0,
    finalDamageDecrease: enemyFinalDamageDecrease = 0,
    ignorePenetration: enemyIgnorePenetration = 0,
    resistCriticalDamage: enemyResistCritDmg = 0
  } = enemyConfig;
  
  // Calculate effective penetration
  const { effectiveEnemyIgnorePenetration, effectivePenetration } = calculateEffectivePenetration(
    basePenetration,
    enemyIgnorePenetration,
    cancelIgnorePenetration
  );
  
  // Calculate defense reduction
  const baseDefenseReduction = enemyDefense > 0 ? (1 - (1000 / (1000 + enemyDefense))) : 0;
  const cappedDefenseReduction = Math.min(baseDefenseReduction, 0.95);
  const penetrationMultiplier = enemyDefense > 0 ? Math.max(0, 1 - effectivePenetration / enemyDefense) : 1;
  const penetrationReduction = enemyDefense > 0 ? (effectivePenetration / enemyDefense) : 0;
  const finalDefenseReduction = calculateDefenseReduction(enemyDefense, effectivePenetration);
  
  // Level calculations
  const playerLevel = 200; // Player is always assumed to be level 200 for damage calculations
  const levelDifference = Math.max(0, Math.min(25, enemyLevel - playerLevel));
  const levelPenaltyPercent = levelDifference * 2;
  
  // Apply ignore damage reduction to enemy damage reduction (but not below 0)
  const effectiveEnemyDamageReduction = Math.max(0, enemyDamageReduction - ignoreDamageReduction);
  const effectiveEnemyDamageReductionPercent = Math.max(0, enemyDamageReductionPercent - ignoreDamageReduction);
  
  // Apply ignore resist critical damage to enemy resist critical damage (but not below 0)
  const effectiveEnemyResistCritDmg = Math.max(0, enemyResistCritDmg - ignoreResistCriticalDamage);
  
  // Calculate effective critical damage (our crit damage reduced by effective enemy resist, but not below 0)
  const effectiveCritDamage = Math.max(0, criticalDamage - effectiveEnemyResistCritDmg);
  
  // SWORD DAMAGE CALCULATION
  const swordBaseDamage = attack;
  const totalSwordAmp = skillAmp + swordSkillAmp;
  
  // Calculate separate paths for normal and critical hits
  // Normal hits get 25% skill amp bonus, critical hits use base skill amp
  const swordNormalAmp = totalSwordAmp * 1.25; // 25% bonus for non-crits
  const swordCritAmp = totalSwordAmp; // No bonus for crits
  
  // Normal hit calculation path (without level penalty)
  let swordNormalAmplifiedDamage = swordBaseDamage * (100 + swordNormalAmp) / 100;
  let swordNormalDefenseAdjustedDamage = swordNormalAmplifiedDamage * (1 - finalDefenseReduction);
  let swordNormalDamageWithNormalUp = swordNormalDefenseAdjustedDamage * (100 + normalDamageUp) / 100;
  
  // Critical hit calculation path (without level penalty)
  let swordCritAmplifiedDamage = swordBaseDamage * (100 + swordCritAmp) / 100;
  let swordCritDefenseAdjustedDamage = swordCritAmplifiedDamage * (1 - finalDefenseReduction);
  let swordCriticalDamageValue = swordCritDefenseAdjustedDamage * (100 + effectiveCritDamage) / 100;
  
  // Apply Add Damage, Enemy Damage Reduction (after ignore damage reduction), and Final modifiers
  let swordNormalWithAddDamage = swordNormalDamageWithNormalUp + addDamage;
  let swordCritWithAddDamage = swordCriticalDamageValue + addDamage;
  let swordNormalAfterDamageReduction = (swordNormalWithAddDamage - effectiveEnemyDamageReduction) * (100 - effectiveEnemyDamageReductionPercent) / 100;
  let swordCritAfterDamageReduction = (swordCritWithAddDamage - effectiveEnemyDamageReduction) * (100 - effectiveEnemyDamageReductionPercent) / 100;
  let swordNormalBeforeLevelPenalty = swordNormalAfterDamageReduction * (100 + finalDamageIncreased) / 100 * (100 - enemyFinalDamageDecrease) / 100;
  let swordCritBeforeLevelPenalty = swordCritAfterDamageReduction * (100 + finalDamageIncreased) / 100 * (100 - enemyFinalDamageDecrease) / 100;
  
  // Apply level penalty at the very end
  let swordNormalFinalDamage = swordNormalBeforeLevelPenalty * (100 - levelPenaltyPercent) / 100;
  let swordCritFinalDamage = swordCritBeforeLevelPenalty * (100 - levelPenaltyPercent) / 100;
  
  // Apply variance for sword
  const swordVariance = 0.20; // 20% variance for sword normal hits (0.80 to 1.0, official Korean documentation)
  
  // Official Korean documentation: "When using a sword-type skill, 80%~100% of the original damage is applied"
  const swordMinNormalDamage = Math.max(1, swordNormalFinalDamage * (1 - swordVariance)); // 0.80x
  const swordMaxNormalDamage = Math.max(1, swordNormalFinalDamage * 1.0); // 1.0x (no bonus)
  const swordMinCriticalDamage = Math.max(1, swordCritFinalDamage);
  const swordMaxCriticalDamage = Math.max(1, swordCritFinalDamage);
  
  // MAGIC DAMAGE CALCULATION - NO VARIANCE EVER
  const magicBaseDamage = magicAttack;
  const totalMagicAmp = skillAmp + magicSkillAmp;
  
  // Calculate separate paths for normal and critical hits
  // Normal hits get 25% skill amp bonus, critical hits use base skill amp
  const magicNormalAmp = totalMagicAmp * 1.25; // 25% bonus for non-crits
  const magicCritAmp = totalMagicAmp; // No bonus for crits
  
  // Normal hit calculation path (without level penalty)
  let magicNormalAmplifiedDamage = magicBaseDamage * (100 + magicNormalAmp) / 100;
  let magicNormalDefenseAdjustedDamage = magicNormalAmplifiedDamage * (1 - finalDefenseReduction);
  let magicNormalDamageValue = magicNormalDefenseAdjustedDamage * (100 + normalDamageUp) / 100;
  
  // Critical hit calculation path (without level penalty)
  let magicCritAmplifiedDamage = magicBaseDamage * (100 + magicCritAmp) / 100;
  let magicCritDefenseAdjustedDamage = magicCritAmplifiedDamage * (1 - finalDefenseReduction);
  let magicCriticalDamageValue = magicCritDefenseAdjustedDamage * (100 + effectiveCritDamage) / 100;
  
  // Apply Add Damage, Enemy Damage Reduction (after ignore damage reduction), and Final modifiers
  let magicNormalWithAddDamage = magicNormalDamageValue + addDamage;
  let magicCritWithAddDamage = magicCriticalDamageValue + addDamage;
  let magicNormalAfterDamageReduction = (magicNormalWithAddDamage - effectiveEnemyDamageReduction) * (100 - effectiveEnemyDamageReductionPercent) / 100;
  let magicCritAfterDamageReduction = (magicCritWithAddDamage - effectiveEnemyDamageReduction) * (100 - effectiveEnemyDamageReductionPercent) / 100;
  let magicNormalBeforeLevelPenalty = magicNormalAfterDamageReduction * (100 + finalDamageIncreased) / 100 * (100 - enemyFinalDamageDecrease) / 100;
  let magicCritBeforeLevelPenalty = magicCritAfterDamageReduction * (100 + finalDamageIncreased) / 100 * (100 - enemyFinalDamageDecrease) / 100;
  
  // Apply level penalty at the very end
  let magicNormalFinalDamage = magicNormalBeforeLevelPenalty * (100 - levelPenaltyPercent) / 100;
  let magicCritFinalDamage = magicCritBeforeLevelPenalty * (100 - levelPenaltyPercent) / 100;
  
  const magicMinNormalDamage = Math.max(1, magicNormalFinalDamage);
  const magicMaxNormalDamage = Math.max(1, magicNormalFinalDamage);
  const magicMinCriticalDamage = Math.max(1, magicCritFinalDamage);
  const magicMaxCriticalDamage = Math.max(1, magicCritFinalDamage);
  
  // Prepare result
  const result: DamageCalculationResult = {
    sword: {
      normal: {
        min: Math.round(swordMinNormalDamage),
        max: Math.round(swordMaxNormalDamage),
      },
      critical: {
        min: Math.round(swordMinCriticalDamage),
        max: Math.round(swordMaxCriticalDamage),
      }
    },
    magic: {
      normal: {
        min: Math.round(magicMinNormalDamage),
        max: Math.round(magicMaxNormalDamage),
      },
      critical: {
        min: Math.round(magicMinCriticalDamage),
        max: Math.round(magicMaxCriticalDamage),
      }
    }
  };
  
  // Add detailed steps if requested
  if (includeSteps) {
    // Use the provided damage type, default to 'sword' if not provided
    const stepDamageType = damageType || 'sword';
    const isUsingMagic = stepDamageType === 'magic';
    
    result.steps = {
      // Input values (showing normal hit values with 25% skill amp bonus)
      baseAttackValue: isUsingMagic ? magicBaseDamage : swordBaseDamage,
      totalSkillAmp: isUsingMagic ? magicNormalAmp : swordNormalAmp,
      playerLevel,
      enemyLevel,
      levelDifference,
      levelPenaltyPercent,
      
      // Penetration calculations
      basePenetration,
      enemyIgnorePenetration,
      cancelIgnorePenetration,
      effectiveEnemyIgnorePenetration,
      effectivePenetration,
      
      // Defense calculations
      enemyDefense,
      baseDefenseReduction,
      cappedDefenseReduction,
      penetrationReduction,
      finalDefenseReduction,
      
      // Ignore damage reduction calculations
      ignoreDamageReduction,
      enemyDamageReduction,
      enemyDamageReductionPercent,
      effectiveEnemyDamageReduction,
      effectiveEnemyDamageReductionPercent,
      
      // Critical damage resistance calculations
      criticalDamage,
      ignoreResistCriticalDamage,
      enemyResistCritDmg,
      effectiveEnemyResistCritDmg,
      effectiveCritDamage,
      
      // Step-by-step damage values (use the relevant damage type - showing NORMAL hit path)
      // NEW CALCULATION ORDER: Base -> Skill Amp -> Defense -> Normal Damage Up -> Add Damage -> Enemy Damage Reduction -> Final Damage -> Level Penalty
      baseDamage: isUsingMagic ? magicBaseDamage : swordBaseDamage,
      amplifiedDamage: isUsingMagic ? magicNormalAmplifiedDamage : swordNormalAmplifiedDamage,
      defenseAdjustedDamage: isUsingMagic ? magicNormalDefenseAdjustedDamage : swordNormalDefenseAdjustedDamage,
      levelAdjustedDamage: isUsingMagic ? magicNormalDamageValue : swordNormalDamageWithNormalUp, // After normal damage up (no level penalty yet)
      withAddDamage: isUsingMagic ? magicNormalWithAddDamage : swordNormalWithAddDamage,
      afterDamageReduction: isUsingMagic ? magicNormalAfterDamageReduction : swordNormalAfterDamageReduction,
      finalBaseDamage: isUsingMagic ? magicNormalFinalDamage : swordNormalFinalDamage, // Final damage with level penalty applied at the end
      
      // Final results with variance
      normalDamageWithNormalUp: isUsingMagic ? magicNormalDamageValue : swordNormalDamageWithNormalUp,
      criticalDamageValue: isUsingMagic ? magicCriticalDamageValue : swordCriticalDamageValue,
      minNormalDamage: isUsingMagic ? magicMinNormalDamage : swordMinNormalDamage,
      maxNormalDamage: isUsingMagic ? magicMaxNormalDamage : swordMaxNormalDamage,
      minCriticalDamage: isUsingMagic ? magicMinCriticalDamage : swordMinCriticalDamage,
      maxCriticalDamage: isUsingMagic ? magicMaxCriticalDamage : swordMaxCriticalDamage,
      
      // Damage type and variance info
      damageType: stepDamageType,
      hasVariance: !isUsingMagic,
      variance: isUsingMagic ? 0 : swordVariance,
    };
  }
  
  return result;
}

/**
 * Legacy wrapper function for backward compatibility
 * Now simplified to always use PvE stat combinations
 */
export function calculateDamage(
  stats: any, // Using any for backward compatibility with BuildStats
  level: number,
  enemyConfig: EnemyConfig,
  damageType: 'sword' | 'magic' | null = null
): DamageCalculationResult {
  // Pass the stats directly to calculateDamageWithSteps
  // The combineStatsWithPveVariants function will handle the conversion and combination
  return calculateDamageWithSteps(stats, level, enemyConfig, damageType, false);
}