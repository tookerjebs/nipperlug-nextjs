/**
 * Shared Damage Calculation Utilities
 * Centralized damage calculation logic with step-by-step breakdown
 * Used by both the build planner store and damage calculation modal
 */

import type { CharacterClass } from '../systems/class/types';
import { getClassDamageType } from './classDamageUtils';
import { getAllCombinedStats } from './statCombinationUtils';
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
 * @param stats Base stats to combine (can be DamageCalculationStats or any BuildStats-like object)
 * @param characterClass Character class for stat combination
 * @returns Combined stats with PvE variants applied
 */
function combineStatsWithPveVariants(
  stats: DamageCalculationStats | any,
  characterClass: CharacterClass | null
): DamageCalculationStats {
  // If no character class is provided, return stats as-is (converted to DamageCalculationStats format)
  if (!characterClass) {
    return {
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
  }

  // Convert input stats to BuildStats format for combination
  // This handles both DamageCalculationStats and BuildStats inputs
  const buildStats: BuildStats = { ...stats };

  // Get combined stats with PvE variants only
  const combinedBuildStats = getAllCombinedStats(buildStats, characterClass, 'pve');

  // Convert back to DamageCalculationStats format
  return {
    attack: combinedBuildStats.attack || 0,
    magicAttack: combinedBuildStats.magicAttack || 0,
    penetration: combinedBuildStats.penetration || 0,
    cancelIgnorePenetration: combinedBuildStats.cancelIgnorePenetration || 0,
    criticalDamage: combinedBuildStats.criticalDamage || 0,
    normalDamageUp: combinedBuildStats.normalDamageUp || 0,
    skillAmp: combinedBuildStats.skillAmp || 0,
    swordSkillAmp: combinedBuildStats.swordSkillAmp || 0,
    magicSkillAmp: combinedBuildStats.magicSkillAmp || 0,
    addDamage: combinedBuildStats.addDamage || 0,
    finalDamageIncreased: combinedBuildStats.finalDamageIncreased || 0,
    ignoreDamageReduction: combinedBuildStats.ignoreDamageReduction || 0,
    ignoreResistCriticalDamage: combinedBuildStats.ignoreResistCriticalDamage || 0,
  };
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
 * @param characterClass Character class (optional, for damage type determination and PvE stat combination)
 * @param includeSteps Whether to include detailed step breakdown
 */
export function calculateDamageWithSteps(
  stats: DamageCalculationStats | any,
  level: number,
  enemyConfig: EnemyConfig,
  characterClass: CharacterClass | null = null,
  includeSteps: boolean = false
): DamageCalculationResult {
  
  // Combine stats with PvE variants if character class is provided
  const effectiveStats = combineStatsWithPveVariants(stats, characterClass);
  
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
  
  // Normal hit calculation path
  const swordNormalAmplifiedDamage = swordBaseDamage * (100 + swordNormalAmp) / 100;
  const swordNormalLevelAdjustedDamage = swordNormalAmplifiedDamage * (100 - levelPenaltyPercent) / 100;
  const swordNormalDefenseAdjustedDamage = swordNormalLevelAdjustedDamage * (1 - finalDefenseReduction);
  const swordNormalDamageWithNormalUp = swordNormalDefenseAdjustedDamage * (100 + normalDamageUp) / 100;
  
  // Critical hit calculation path
  const swordCritAmplifiedDamage = swordBaseDamage * (100 + swordCritAmp) / 100;
  const swordCritLevelAdjustedDamage = swordCritAmplifiedDamage * (100 - levelPenaltyPercent) / 100;
  const swordCritDefenseAdjustedDamage = swordCritLevelAdjustedDamage * (1 - finalDefenseReduction);
  const swordCriticalDamageValue = swordCritDefenseAdjustedDamage * (100 + effectiveCritDamage) / 100;
  
  // Now apply Add Damage, Enemy Damage Reduction (after ignore damage reduction), and Final modifiers
  const swordNormalWithAddDamage = swordNormalDamageWithNormalUp + addDamage;
  const swordCritWithAddDamage = swordCriticalDamageValue + addDamage;
  const swordNormalAfterDamageReduction = (swordNormalWithAddDamage - effectiveEnemyDamageReduction) * (100 - effectiveEnemyDamageReductionPercent) / 100;
  const swordCritAfterDamageReduction = (swordCritWithAddDamage - effectiveEnemyDamageReduction) * (100 - effectiveEnemyDamageReductionPercent) / 100;
  const swordNormalFinalDamage = swordNormalAfterDamageReduction * (100 + finalDamageIncreased) / 100 * (100 - enemyFinalDamageDecrease) / 100;
  const swordCritFinalDamage = swordCritAfterDamageReduction * (100 + finalDamageIncreased) / 100 * (100 - enemyFinalDamageDecrease) / 100;
  
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
  
  // Normal hit calculation path
  const magicNormalAmplifiedDamage = magicBaseDamage * (100 + magicNormalAmp) / 100;
  const magicNormalLevelAdjustedDamage = magicNormalAmplifiedDamage * (100 - levelPenaltyPercent) / 100;
  const magicNormalDefenseAdjustedDamage = magicNormalLevelAdjustedDamage * (1 - finalDefenseReduction);
  const magicNormalDamageValue = magicNormalDefenseAdjustedDamage * (100 + normalDamageUp) / 100;
  
  // Critical hit calculation path
  const magicCritAmplifiedDamage = magicBaseDamage * (100 + magicCritAmp) / 100;
  const magicCritLevelAdjustedDamage = magicCritAmplifiedDamage * (100 - levelPenaltyPercent) / 100;
  const magicCritDefenseAdjustedDamage = magicCritLevelAdjustedDamage * (1 - finalDefenseReduction);
  const magicCriticalDamageValue = magicCritDefenseAdjustedDamage * (100 + effectiveCritDamage) / 100;
  
  // Now apply Add Damage, Enemy Damage Reduction (after ignore damage reduction), and Final modifiers
  const magicNormalWithAddDamage = magicNormalDamageValue + addDamage;
  const magicCritWithAddDamage = magicCriticalDamageValue + addDamage;
  const magicNormalAfterDamageReduction = (magicNormalWithAddDamage - effectiveEnemyDamageReduction) * (100 - effectiveEnemyDamageReductionPercent) / 100;
  const magicCritAfterDamageReduction = (magicCritWithAddDamage - effectiveEnemyDamageReduction) * (100 - effectiveEnemyDamageReductionPercent) / 100;
  const magicNormalFinalDamage = magicNormalAfterDamageReduction * (100 + finalDamageIncreased) / 100 * (100 - enemyFinalDamageDecrease) / 100;
  const magicCritFinalDamage = magicCritAfterDamageReduction * (100 + finalDamageIncreased) / 100 * (100 - enemyFinalDamageDecrease) / 100;
  
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
    // Determine which damage type to use for steps based on character class
    const damageType = characterClass ? getClassDamageType(characterClass) : 'sword';
    const isUsingMagic = damageType === 'magic';
    
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
      baseDamage: isUsingMagic ? magicBaseDamage : swordBaseDamage,
      amplifiedDamage: isUsingMagic ? magicNormalAmplifiedDamage : swordNormalAmplifiedDamage,
      levelAdjustedDamage: isUsingMagic ? magicNormalLevelAdjustedDamage : swordNormalLevelAdjustedDamage,
      defenseAdjustedDamage: isUsingMagic ? magicNormalDefenseAdjustedDamage : swordNormalDefenseAdjustedDamage,
      withAddDamage: isUsingMagic ? magicNormalWithAddDamage : swordNormalWithAddDamage,
      afterDamageReduction: isUsingMagic ? magicNormalAfterDamageReduction : swordNormalAfterDamageReduction,
      finalBaseDamage: isUsingMagic ? magicNormalFinalDamage : swordNormalFinalDamage,
      
      // Final results with variance
      normalDamageWithNormalUp: isUsingMagic ? magicNormalDamageValue : swordNormalDamageWithNormalUp,
      criticalDamageValue: isUsingMagic ? magicCriticalDamageValue : swordCriticalDamageValue,
      minNormalDamage: isUsingMagic ? magicMinNormalDamage : swordMinNormalDamage,
      maxNormalDamage: isUsingMagic ? magicMaxNormalDamage : swordMaxNormalDamage,
      minCriticalDamage: isUsingMagic ? magicMinCriticalDamage : swordMinCriticalDamage,
      maxCriticalDamage: isUsingMagic ? magicMaxCriticalDamage : swordMaxCriticalDamage,
      
      // Damage type and variance info
      damageType,
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
  characterClass: CharacterClass | null = null
): DamageCalculationResult {
  // Pass the stats directly to calculateDamageWithSteps
  // The combineStatsWithPveVariants function will handle the conversion and combination
  return calculateDamageWithSteps(stats, level, enemyConfig, characterClass, false);
}