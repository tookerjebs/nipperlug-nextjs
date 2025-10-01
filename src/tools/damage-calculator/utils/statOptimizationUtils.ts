/**
 * Stat Optimization Utilities
 * Analyzes which stats provide the biggest damage increase for the current build
 */

import { calculateDamageWithSteps, type DamageCalculationStats, type EnemyConfig } from './damageCalculationUtils';
import type { DamageType } from './statCombinationUtils';

export interface StatOptimizationResult {
  statName: string;
  displayName: string;
  currentValue: number;
  damageIncrease: {
    normal: number;
    critical: number;
    average: number;
  };
  damageIncreasePercent: {
    normal: number;
    critical: number;
    average: number;
  };
}

export interface StatOptimizationAnalysis {
  baselineDamage: {
    normal: { min: number; max: number; average: number };
    critical: { min: number; max: number; average: number };
  };
  optimizations: StatOptimizationResult[];
  bestStat: StatOptimizationResult;
}

// Define the stats we want to analyze for optimization
const OPTIMIZATION_STATS = [
  { key: 'attack', displayName: 'Attack' },
  { key: 'magicAttack', displayName: 'Magic Attack' },
  { key: 'penetration', displayName: 'Penetration' },
  { key: 'addDamage', displayName: 'Add Damage' },
  { key: 'ignoreResistCriticalDamage', displayName: 'Ignore Resist Crit Dmg' },
  { key: 'skillAmp', displayName: 'Skill Amp' },
  { key: 'swordSkillAmp', displayName: 'Sword Skill Amp' },
  { key: 'magicSkillAmp', displayName: 'Magic Skill Amp' },
  { key: 'cancelIgnorePenetration', displayName: 'Cancel Ignore Penetration' },
  { key: 'criticalDamage', displayName: 'Critical Damage' },
] as const;

/**
 * Analyzes which stat provides the biggest damage increase when increased by 1 point
 */
export function analyzeStatOptimization(
  currentStats: DamageCalculationStats | any,
  enemyConfig: EnemyConfig,
  damageType: DamageType | null,
  playerLevel: number
): StatOptimizationAnalysis {
  // Calculate baseline damage
  const baselineResult = calculateDamageWithSteps(currentStats, playerLevel, enemyConfig, damageType);
  
  // Determine which damage type to use
  const relevantDamage = damageType === 'magic' ? baselineResult.magic : baselineResult.sword;
  
  const baselineDamage = {
    normal: {
      min: relevantDamage.normal.min,
      max: relevantDamage.normal.max,
      average: (relevantDamage.normal.min + relevantDamage.normal.max) / 2
    },
    critical: {
      min: relevantDamage.critical.min,
      max: relevantDamage.critical.max,
      average: (relevantDamage.critical.min + relevantDamage.critical.max) / 2
    }
  };

  // Test each stat with +1 increase
  const optimizations: StatOptimizationResult[] = [];

  for (const stat of OPTIMIZATION_STATS) {
    // Skip irrelevant stats based on damage type
    if (damageType && stat.key === 'magicAttack' && damageType !== 'magic') {
      continue;
    }
    if (damageType && stat.key === 'attack' && damageType !== 'sword') {
      continue;
    }
    if (damageType && stat.key === 'swordSkillAmp' && damageType !== 'sword') {
      continue;
    }
    if (damageType && stat.key === 'magicSkillAmp' && damageType !== 'magic') {
      continue;
    }

    // Create modified stats with +1 to this stat
    const modifiedStats = {
      ...currentStats,
      [stat.key]: (currentStats[stat.key] || 0) + 1
    };

    // Calculate damage with modified stats
    const modifiedResult = calculateDamageWithSteps(modifiedStats, playerLevel, enemyConfig, damageType);
    
    // Use the same damage type as baseline
    const modifiedRelevantDamage = damageType === 'magic' ? modifiedResult.magic : modifiedResult.sword;
    
    const modifiedDamage = {
      normal: {
        min: modifiedRelevantDamage.normal.min,
        max: modifiedRelevantDamage.normal.max,
        average: (modifiedRelevantDamage.normal.min + modifiedRelevantDamage.normal.max) / 2
      },
      critical: {
        min: modifiedRelevantDamage.critical.min,
        max: modifiedRelevantDamage.critical.max,
        average: (modifiedRelevantDamage.critical.min + modifiedRelevantDamage.critical.max) / 2
      }
    };

    // Calculate increases
    const damageIncrease = {
      normal: modifiedDamage.normal.average - baselineDamage.normal.average,
      critical: modifiedDamage.critical.average - baselineDamage.critical.average,
      average: ((modifiedDamage.normal.average + modifiedDamage.critical.average) / 2) - 
               ((baselineDamage.normal.average + baselineDamage.critical.average) / 2)
    };

    const damageIncreasePercent = {
      normal: baselineDamage.normal.average > 0 ? (damageIncrease.normal / baselineDamage.normal.average) * 100 : 0,
      critical: baselineDamage.critical.average > 0 ? (damageIncrease.critical / baselineDamage.critical.average) * 100 : 0,
      average: ((baselineDamage.normal.average + baselineDamage.critical.average) / 2) > 0 ? 
               (damageIncrease.average / ((baselineDamage.normal.average + baselineDamage.critical.average) / 2)) * 100 : 0
    };

    optimizations.push({
      statName: stat.key,
      displayName: stat.displayName,
      currentValue: currentStats[stat.key] || 0,
      damageIncrease,
      damageIncreasePercent
    });
  }

  // Sort by average damage increase (descending)
  optimizations.sort((a, b) => b.damageIncrease.average - a.damageIncrease.average);

  return {
    baselineDamage,
    optimizations,
    bestStat: optimizations[0] || optimizations[0]
  };
}

/**
 * Formats damage numbers for display
 */
export function formatDamageNumber(num: number): string {
  return Math.round(num).toLocaleString('en-US');
}

/**
 * Formats percentage for display
 */
export function formatPercentage(num: number): string {
  return `${num >= 0 ? '+' : ''}${num.toFixed(3)}%`;
}