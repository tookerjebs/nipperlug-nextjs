import { MonsterStats } from '../../../lib/game-data/monsters/types';
import boostData from '../DungeonBoostClean.json';

export interface BoostedStat {
  original: number;
  boosted: number;
  percentage: number;
}

export interface BoostedStats {
  [key: string]: BoostedStat;
}

export function calculateBoostedStat(
  originalValue: number,
  statKey: string,
  boostLevel: number
): BoostedStat {
  const statConfig = boostData.boostStats[statKey as keyof typeof boostData.boostStats];
  if (!statConfig || boostLevel === 0) {
    return {
      original: originalValue,
      boosted: originalValue,
      percentage: 0
    };
  }

  const levelKey = boostLevel.toString() as keyof typeof boostData.levelMapping;
  const levelMapping = boostData.levelMapping[levelKey];
  if (!levelMapping) {
    return {
      original: originalValue,
      boosted: originalValue,
      percentage: 0
    };
  }
  const steps = levelMapping.steps;
  const { boostValue, valueType } = statConfig;

  let boostedValue: number;

  if (valueType === 2) {
    // Multiplicative: boostedValue = baseValue × (1 + (boostValue × steps / 100))
    boostedValue = Math.round(originalValue * (1 + (boostValue * steps / 100)));
  } else {
    // Additive: boostedValue = baseValue + (boostValue × steps)
    boostedValue = originalValue + (boostValue * steps);
  }

  const percentage = Math.round(((boostedValue - originalValue) / originalValue) * 100);

  return {
    original: originalValue,
    boosted: boostedValue,
    percentage
  };
}

export function calculateAllBoostedStats(
  monster: MonsterStats,
  boostLevel: number
): BoostedStats {
  const boostedStats: BoostedStats = {};

  // Calculate boost for all stats that have boost configurations
  Object.entries(boostData.boostStats).forEach(([statKey]) => {
    if (monster[statKey as keyof MonsterStats] !== undefined) {
      const originalValue = monster[statKey as keyof MonsterStats] as number;
      boostedStats[statKey] = calculateBoostedStat(originalValue, statKey, boostLevel);
    }
  });

  return boostedStats;
}

export function getBoostLevelInfo(level: number) {
  const key = level.toString() as keyof typeof boostData.levelMapping;
  return boostData.levelMapping[key];
}

export function getBoostLevels() {
  return Object.keys(boostData.levelMapping).map(key => ({
    level: parseInt(key),
    ...boostData.levelMapping[key as keyof typeof boostData.levelMapping]
  }));
}