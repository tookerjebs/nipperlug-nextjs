// Shared class scaling utilities for centralized STR/INT/DEX processing
import { CLASS_SCALING, STAT_RANGES } from '../systems/class/data/classScaling';
import type { CharacterClass } from '../systems/class/types';
import type { BuildStats } from '../stores/buildPlannerStore';

/**
 * Determine which scaling tier a stat value falls into
 * @param statValue The stat value to check
 * @returns The tier index (0, 1, or 2)
 */
export function getStatTier(statValue: number): number {
  for (let i = 0; i < STAT_RANGES.length; i++) {
    const range = STAT_RANGES[i];
    if (statValue >= range.min && statValue <= range.max) {
      return i;
    }
  }
  return STAT_RANGES.length - 1; // Default to highest tier
}

/**
 * Calculate cumulative stat scaling across all tiers
 * This implements progressive tier scaling where each tier's multiplier
 * only applies to the points within that tier's range
 * 
 * Example: For 1200 STR with tiers [0-100, 101-200, 201-300, 301-400, 401-500, 501+]:
 * - Tier 0: 101 points (0-100) × multiplier[0]
 * - Tier 1: 100 points (101-200) × multiplier[1] 
 * - Tier 2: 100 points (201-300) × multiplier[2]
 * - Tier 3: 100 points (301-400) × multiplier[3]
 * - Tier 4: 100 points (401-500) × multiplier[4]
 * - Tier 5: 700 points (501-1200) × multiplier[5]
 * 
 * @param statValue The total stat value
 * @param multipliers Array of multipliers for each tier
 * @returns The cumulative scaled value
 */
export function calculateCumulativeScaling(statValue: number, multipliers: number[]): number {
  let totalValue = 0;
  
  for (let tierIndex = 0; tierIndex < STAT_RANGES.length; tierIndex++) {
    const range = STAT_RANGES[tierIndex];
    const multiplier = multipliers[tierIndex];
    
    if (multiplier === undefined) continue;
    
    const tierMin = range.min;
    const tierMax = range.max;
    
    // Skip tiers that are completely above our stat value
    if (statValue < tierMin) {
      break;
    }
    
    // Calculate how many points fall within this tier
    let pointsInThisTier = 0;
    
    if (statValue <= tierMax || tierMax === 999999) {
      // Stat value falls within this tier (or it's the final unlimited tier)
      if (tierMax === 999999) {
        // Final tier: all remaining points above tierMin
        pointsInThisTier = Math.max(0, statValue - tierMin + 1);
      } else {
        // Regular tier: points from tierMin to min(statValue, tierMax)
        pointsInThisTier = Math.min(statValue, tierMax) - tierMin + 1;
      }
    } else {
      // Stat value exceeds this tier, use full tier range
      pointsInThisTier = tierMax - tierMin + 1;
    }
    
    if (pointsInThisTier > 0) {
      const tierValue = pointsInThisTier * multiplier;
      totalValue += tierValue;
    }
  }
  
  return totalValue;
}

/**
 * Calculate derived stats from STR/INT/DEX based on selected class
 * Uses cumulative tier scaling where each tier's multiplier only applies
 * to the points within that tier's range (not retroactively to all points)
 * @param str Strength value
 * @param int Intelligence value  
 * @param dex Dexterity value
 * @param selectedClass The selected character class
 * @returns Object containing derived stats
 */
export function calculateClassStats(
  str: number,
  int: number,
  dex: number,
  selectedClass: CharacterClass
): BuildStats {
  const derivedStats: BuildStats = {};
  const classScaling = CLASS_SCALING[selectedClass];

  // Process STR scaling with cumulative tier calculation
  if (str > 0) {
    const strScaling = classScaling.str;
    
    Object.entries(strScaling).forEach(([statId, multipliers]) => {
      if (multipliers) {
        const value = calculateCumulativeScaling(str, multipliers);
        if (value > 0) {
          derivedStats[statId] = Math.round(((derivedStats[statId] || 0) + value) * 100) / 100;
        }
      }
    });
  }

  // Process INT scaling with cumulative tier calculation
  if (int > 0) {
    const intScaling = classScaling.int;
    
    Object.entries(intScaling).forEach(([statId, multipliers]) => {
      if (multipliers) {
        const value = calculateCumulativeScaling(int, multipliers);
        if (value > 0) {
          derivedStats[statId] = Math.round(((derivedStats[statId] || 0) + value) * 100) / 100;
        }
      }
    });
  }

  // Process DEX scaling with cumulative tier calculation
  if (dex > 0) {
    const dexScaling = classScaling.dex;
    
    Object.entries(dexScaling).forEach(([statId, multipliers]) => {
      if (multipliers) {
        const value = calculateCumulativeScaling(dex, multipliers);
        if (value > 0) {
          derivedStats[statId] = Math.round(((derivedStats[statId] || 0) + value) * 100) / 100;
        }
      }
    });
  }

  return derivedStats;
}