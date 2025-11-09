// Zustand store for Class System
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { ClassState, ClassActions, CharacterClass, StatDistribution } from '../types';
import { CLASS_BASE_STATS } from '../data/classScaling';
import { calculateClassStats } from '../../../data/classScaling';

import { useStatRegistryStore } from '../../../stores/statRegistryStore';

type ClassStore = ClassState & ClassActions;

// Constants
const TOTAL_STAT_POINTS = 1379; // Total stat points available for allocation
const SYSTEM_ID = 'class';

// Default base stats when no class is selected
const DEFAULT_BASE_STATS = {
  str: 10,
  int: 10,
  dex: 10
};

// Helper function to get base stats for a class
const getBaseStatsForClass = (characterClass: CharacterClass | null) => {
  if (!characterClass) {
    return DEFAULT_BASE_STATS;
  }
  return CLASS_BASE_STATS[characterClass];
};

export const useClassStore = create<ClassStore>()(subscribeWithSelector((set, get) => ({
  // Initial state
  selectedClass: null,
  statDistribution: DEFAULT_BASE_STATS,
  remainingPoints: TOTAL_STAT_POINTS, // Always 1379 available for allocation


  // Actions
  setSelectedClass: (characterClass: CharacterClass) => {
    const baseStats = getBaseStatsForClass(characterClass);
    
    set({ 
      selectedClass: characterClass,
      statDistribution: {
        str: baseStats.str,
        int: baseStats.int,
        dex: baseStats.dex
      },
      remainingPoints: TOTAL_STAT_POINTS // Always full points available
    });
    // Update StatRegistry with new class context
    useStatRegistryStore.getState().setSelectedClass(characterClass);
    // Re-register stats with new class context
    get().registerStatsWithRegistry();
  },

  resetClass: () => {
    const baseStats = getBaseStatsForClass(null);
    
    set({
      selectedClass: null,
      statDistribution: {
        str: baseStats.str,
        int: baseStats.int,
        dex: baseStats.dex
      },
      remainingPoints: TOTAL_STAT_POINTS
    });
    // Update StatRegistry to remove class context
    useStatRegistryStore.getState().setSelectedClass(null);
    // Unregister stats from registry
    useStatRegistryStore.getState().unregisterSystem(SYSTEM_ID);
  },

  // Stat distribution actions
  incrementStat: (stat: keyof StatDistribution, amount = 1) => {
    const { statDistribution, remainingPoints } = get();
    const actualAmount = Math.min(amount, remainingPoints);
    
    if (actualAmount > 0) {
      set(state => ({
        statDistribution: {
          ...state.statDistribution,
          [stat]: state.statDistribution[stat] + actualAmount
        },
        remainingPoints: state.remainingPoints - actualAmount
      }));
      get().registerStatsWithRegistry();
    }
  },

  decrementStat: (stat: keyof StatDistribution, amount = 1) => {
    const { statDistribution, selectedClass } = get();
    const baseStats = getBaseStatsForClass(selectedClass);
    const currentValue = statDistribution[stat];
    const minValue = baseStats[stat];
    const actualAmount = Math.min(amount, currentValue - minValue);
    
    if (actualAmount > 0) {
      set(state => ({
        statDistribution: {
          ...state.statDistribution,
          [stat]: state.statDistribution[stat] - actualAmount
        },
        remainingPoints: state.remainingPoints + actualAmount
      }));
      get().registerStatsWithRegistry();
    }
  },

  resetStats: () => {
    const { selectedClass } = get();
    const baseStats = getBaseStatsForClass(selectedClass);
    
    set({
      statDistribution: {
        str: baseStats.str,
        int: baseStats.int,
        dex: baseStats.dex
      },
      remainingPoints: TOTAL_STAT_POINTS
    });
    get().registerStatsWithRegistry();
  },



  setStatValue: (stat: keyof StatDistribution, value: number) => {
    const { statDistribution, selectedClass } = get();
    const baseStats = getBaseStatsForClass(selectedClass);
    const minValue = baseStats[stat];
    const clampedValue = Math.max(minValue, value);
    
    // Calculate how many points are currently allocated (above base stats)
    const currentAllocated = (statDistribution.str - baseStats.str) + 
                            (statDistribution.int - baseStats.int) + 
                            (statDistribution.dex - baseStats.dex);
    
    const newAllocatedForThisStat = clampedValue - minValue;
    const newTotalAllocated = currentAllocated - (statDistribution[stat] - minValue) + newAllocatedForThisStat;
    
    // Check if we have enough points
    if (newTotalAllocated <= TOTAL_STAT_POINTS) {
      set(state => ({
        statDistribution: {
          ...state.statDistribution,
          [stat]: clampedValue
        },
        remainingPoints: TOTAL_STAT_POINTS - newTotalAllocated
      }));
      get().registerStatsWithRegistry();
    }
  },

  // Calculate total stats from stat distribution (raw STR/INT/DEX for registry)
  calculateTotalStats: () => {
    const { statDistribution, selectedClass } = get();
    const totalStats: Record<string, number> = {};

    if (selectedClass) {
      // Add base stat distribution
      totalStats.str = statDistribution.str;
      totalStats.int = statDistribution.int;
      totalStats.dex = statDistribution.dex;
    }

    return totalStats;
  },

  // Calculate derived stats from STR/INT/DEX (for display in TotalStatsButton)
  calculateDerivedStats: () => {
    const { statDistribution, selectedClass } = get();
    
    if (!selectedClass) {
      return {};
    }

    // Calculate derived stats using the class scaling system
    return calculateClassStats(
      statDistribution.str,
      statDistribution.int,
      statDistribution.dex,
      selectedClass
    );
  },

  // Helper method to register stats with StatRegistry
  registerStatsWithRegistry: () => {
    const totalStats = get().calculateTotalStats();
    useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
  }
})));