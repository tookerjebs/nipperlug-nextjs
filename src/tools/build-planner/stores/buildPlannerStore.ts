/**
 * Build Planner Zustand Store
 * Centralized store for character build stats and damage calculations
 * Works with the Stat Registry system for receiving stats from various systems
 */

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { statsConfig } from '@/tools/build-planner/data/stats-config';
import { calculateAllCP } from '@/tools/build-planner/data/cp-weights';
import type { CharacterClass } from '../systems/class/types';
import { getClassDamageType, getClassPrimaryStats } from '../utils/classDamageUtils';

import { calculateDamage, type EnemyConfig as DamageEnemyConfig } from '../utils/damageCalculationUtils';

// Define the build stats structure
export interface BuildStats {
  [key: string]: number;
}

// Define damage calculation results
export interface DamageStats {
  combatPower: number; // General CP (base stats only)
  pveCombatPower: number; // PvE CP (base + PvE variants)
  pvpCombatPower: number; // PvP CP (base + PvP variants)
  pveAttack?: {
    normal: {
      min: number;
      max: number;
    };
    critical: {
      min: number;
      max: number;
    };
    damageType: 'sword' | 'magic' | null;
  };
  dpsEstimate: number;
  defenseRating: number;
  hitRate: number;
  criticalRate: number;
  criticalDamage: number;
  selectedClass: CharacterClass | null;
  
  // Legacy fields (for backward compatibility)
  normalAttack: { min: number; max: number; critical: number; };
  magicAttack: { min: number; max: number; critical: number; };
}

// Use the shared EnemyConfig type from damage calculation utils
type EnemyConfig = DamageEnemyConfig;

// Define the state structure
interface BuildPlannerState {
  buildStats: BuildStats;
  damageStats: DamageStats;
  characterLevel: number;
  selectedClass: CharacterClass | null;
  characterName: string;
  enemyConfig: EnemyConfig;
  isLoading: boolean;
  error: string | null;
}

// Define actions interface
interface BuildPlannerActions {
  setStat: (statId: string, value: number) => void;
  setMultipleStats: (stats: BuildStats) => void;
  resetStats: () => void;
  setCharacterInfo: (info: { name?: string; level?: number }) => void;
  setSelectedClass: (characterClass: CharacterClass | null) => void;
  setEnemyConfig: (config: Partial<EnemyConfig>) => void;
  recalculateDamage: () => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
}

// Initial state
const initialBuildStats: BuildStats = {
  criticalRate: statsConfig.baseStats.criticalRate,
  maxCriticalRate: statsConfig.baseStats.maxCriticalRate,
  criticalDamage: statsConfig.baseStats.criticalDamage,
  normalDamageUp: 0,
  attack: 0,
  magicAttack: 0,
  defense: 0,
  penetration: 0,
  cancelIgnorePenetration: 0,
  skillAmp: 0,
  swordSkillAmp: 0,
  magicSkillAmp: 0,
  addDamage: 0,
  finalDamageIncreased: 0,
};

const initialCPValues = calculateAllCP(initialBuildStats);
const initialDamageStats: DamageStats = {
  combatPower: initialCPValues.general,
  pveCombatPower: initialCPValues.pve,
  pvpCombatPower: initialCPValues.pvp,
  selectedClass: null,
  normalAttack: { min: 0, max: 0, critical: 0 },
  magicAttack: { min: 0, max: 0, critical: 0 },
  dpsEstimate: 0,
  defenseRating: 0,
  hitRate: 0,
  criticalRate: statsConfig.baseStats.criticalRate,
  criticalDamage: statsConfig.baseStats.criticalDamage,
};

const initialEnemyConfig: EnemyConfig = {
  level: 1,
  defense: 0,
  damageReduction: 0,
  damageReductionPercent: 0,
  finalDamageDecrease: 0,
  ignorePenetration: 0,
  resistCriticalDamage: 0,
};

// Damage calculation functions now use the shared utility

function calculateDPS(stats: BuildStats, level: number): number {
  const attack = Math.max(stats.attack || 0, stats.magicAttack || 0);
  const criticalRate = stats.criticalRate || statsConfig.baseStats.criticalRate;
  const criticalDamage = stats.criticalDamage || statsConfig.baseStats.criticalDamage;
  
  const variance = 0.15; // 15% variance
  const min = Math.round(attack * (1 - variance));
  const max = Math.round(attack * (1 + variance));
  const avgDamage = (min + max) / 2;
  const critMultiplier = 1 + (criticalRate / 100) * (criticalDamage / 100);
  
  return Math.round(avgDamage * critMultiplier);
}

function recalculateDamageStats(
  buildStats: BuildStats, 
  level: number, 
  enemyConfig: EnemyConfig,
  selectedClass: CharacterClass | null = null
): DamageStats {
  // Calculate all three CP types
  const cpValues = calculateAllCP(buildStats);
  const dpsEstimate = calculateDPS(buildStats, level);
  
  // Legacy damage calculations (for backward compatibility) - now using shared utility
  const legacyDamageValues = calculateDamage(buildStats, level, enemyConfig);

  const baseStats: DamageStats = {
    combatPower: cpValues.general,
    pveCombatPower: cpValues.pve,
    pvpCombatPower: cpValues.pvp,
    selectedClass,
    normalAttack: {
      min: legacyDamageValues.sword.normal.min,
      max: legacyDamageValues.sword.normal.max,
      critical: buildStats.criticalRate || statsConfig.baseStats.criticalRate,
    },
    magicAttack: {
      min: legacyDamageValues.magic.normal.min,
      max: legacyDamageValues.magic.normal.max,
      critical: buildStats.criticalRate || statsConfig.baseStats.criticalRate,
    },
    dpsEstimate,
    defenseRating: buildStats.defense || 0,
    hitRate: 0,
    criticalRate: buildStats.criticalRate || statsConfig.baseStats.criticalRate,
    criticalDamage: buildStats.criticalDamage || statsConfig.baseStats.criticalDamage,
  };

  // If class is selected, calculate class-specific PvE damage
  if (selectedClass) {
    const damageType = getClassDamageType(selectedClass);
    
    // Calculate PvE damage with combined stats - now using shared utility
    const pveDamageValues = calculateDamage(buildStats, level, enemyConfig, selectedClass);
    const pveRelevantDamage = damageType === 'magic' ? pveDamageValues.magic : pveDamageValues.sword;
    
    baseStats.pveAttack = {
      normal: {
        min: pveRelevantDamage.normal.min,
        max: pveRelevantDamage.normal.max,
      },
      critical: {
        min: pveRelevantDamage.critical.min,
        max: pveRelevantDamage.critical.max,
      },
      damageType
    };
  }
  
  return baseStats;
}

// Create the Zustand store
export const useBuildPlannerStore = create<BuildPlannerState & BuildPlannerActions>()(subscribeWithSelector((set, get) => ({
  // Initial state
  buildStats: initialBuildStats,
  damageStats: initialDamageStats,
  characterLevel: 200,
  selectedClass: null,
  characterName: '',
  enemyConfig: initialEnemyConfig,
  isLoading: false,
  error: null,

  // Actions
  /**
   * Set a single stat
   * Note: For system-specific stats, use the Stat Registry instead.
   * This method should only be used for manual stat adjustments or base stats.
   * 
   * @param statId The ID of the stat to set
   * @param value The value to set the stat to
   */
  setStat: (statId: string, value: number) => {
    set((state) => {
      const newBuildStats = {
        ...state.buildStats,
        [statId]: value,
      };
      const newDamageStats = recalculateDamageStats(newBuildStats, state.characterLevel, state.enemyConfig, state.selectedClass);
      
      return {
        buildStats: newBuildStats,
        damageStats: newDamageStats,
      };
    });
  },

  /**
   * Set multiple stats at once
   * This is used by the Stat Registry to update the build planner with combined stats
   * from all registered systems.
   * 
   * @param stats The stats to set
   */
  setMultipleStats: (stats: BuildStats) => {
    set((state) => {
      // Start with initial base stats
      const newBuildStats = { ...initialBuildStats };
      
      // Add contributed stats to base stats instead of replacing them
      Object.entries(stats).forEach(([statId, value]) => {
        if (value !== 0) { // Skip zero values
          newBuildStats[statId] = (newBuildStats[statId] || 0) + value;
        }
      });
      
      const newDamageStats = recalculateDamageStats(newBuildStats, state.characterLevel, state.enemyConfig, state.selectedClass);
      
      return {
        buildStats: newBuildStats,
        damageStats: newDamageStats,
      };
    });
  },

  /**
   * Reset stats to initial values
   * Note: This only resets the base stats in the build planner.
   * System-specific stats are managed by the Stat Registry.
   */
  resetStats: () => {
    set((state) => {
      const newDamageStats = recalculateDamageStats(initialBuildStats, state.characterLevel, state.enemyConfig, state.selectedClass);
      
      return {
        buildStats: { ...initialBuildStats },
        damageStats: newDamageStats,
      };
    });
  },

  setCharacterInfo: (info: { name?: string; level?: number }) => {
    set((state) => {
      const newState: Partial<BuildPlannerState> = {};
      
      if (info.name !== undefined) newState.characterName = info.name;
      if (info.level !== undefined) {
        newState.characterLevel = info.level;
        newState.damageStats = recalculateDamageStats(state.buildStats, info.level, state.enemyConfig, state.selectedClass);
      }
      
      return newState;
    });
  },

  setSelectedClass: (characterClass: CharacterClass | null) => {
    set((state) => ({
      selectedClass: characterClass,
      damageStats: recalculateDamageStats(state.buildStats, state.characterLevel, state.enemyConfig, characterClass),
    }));
  },

  setEnemyConfig: (config: Partial<EnemyConfig>) => {
    set((state) => {
      const newEnemyConfig = {
        ...state.enemyConfig,
        ...config
      };
      
      return {
        enemyConfig: newEnemyConfig,
        damageStats: recalculateDamageStats(state.buildStats, state.characterLevel, newEnemyConfig, state.selectedClass),
      };
    });
  },

  recalculateDamage: () => {
    set((state) => ({
      damageStats: recalculateDamageStats(state.buildStats, state.characterLevel, state.enemyConfig, state.selectedClass),
    }));
  },

  setLoading: (loading: boolean) => {
    set({ isLoading: loading });
  },

  setError: (error: string | null) => {
    set({ error });
  },
})));

// Subscribe to class store changes
import { useClassStore } from '../systems/class/stores';

useClassStore.subscribe(
  (state) => state.selectedClass,
  (selectedClass) => {
    useBuildPlannerStore.getState().setSelectedClass(selectedClass);
  }
);

// Export types for use in components
export type { BuildPlannerState, BuildPlannerActions };