/**
 * Force Wing System Zustand Store
 * Manages force wing system state independently while contributing to global stats
 */

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { 
  SystemCategory, 
  SystemSlot, 
  StatOption, 
  ForceWingSystemState, 
  ForceWingSystemActions 
} from '../types/force-wing';
import { useStatRegistryStore } from '../../../stores/statRegistryStore';
import { getDefaultForceWingCategories, forceWingSlotStats, FORCE_WING_CONFIG } from '../data/force-wing-data';

// Default state for the force wing system
const getForceWingSystemDefaultState = (): SystemCategory[] => {
  return getDefaultForceWingCategories();
};

// Combined store type
type ForceWingSystemStore = ForceWingSystemState & ForceWingSystemActions;

// Create the force wing system store
export const useForceWingSystemStore = create<ForceWingSystemStore>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    categories: getForceWingSystemDefaultState(),
    selectedSlotId: null,
    isModalOpen: false,
    totalStats: {},
    forceWingLevel: FORCE_WING_CONFIG.forceWingMinLevel,
    forceWingBaseStats: {},
    totalTrainingPoints: 0,
    availableTrainingPoints: 0,

    // Actions
    setCategories: (categories) => set({ categories }),
    setSelectedSlotId: (slotId) => set({ selectedSlotId: slotId }),
    setIsModalOpen: (isOpen) => set({ isModalOpen: isOpen }),

    handleSlotClick: (slot) => {
      set({ selectedSlotId: slot.id, isModalOpen: true });
    },

    handleStatSelect: (slotId, stat) => {
      const { categories } = get();
      const level1Value = stat.levelValues ? stat.levelValues[0] : stat.value;
      
      // Use original stat ID for contribution, composite ID for identification
      const contributionStatId = stat.originalStatId || stat.id;
      
      const updatedCategories = categories.map(category => ({
        ...category,
        slots: category.slots.map(s => 
          s.id === slotId 
            ? { 
                ...s, 
                isOccupied: true, 
                selectedStat: {
                  id: stat.id, // Store composite ID for identification
                  name: stat.name,
                  value: level1Value,
                  level: 1
                },
                contributedStats: { [contributionStatId]: level1Value } // Use original ID for contribution
              }
            : s
        )
      }));
      
      set({ categories: updatedCategories });
      get().calculateTotalStats();
      get().calculateTotalTrainingPoints();
    },

    handleStatRemove: (slot) => {
      const { categories } = get();
      const updatedCategories = categories.map(category => ({
        ...category,
        slots: category.slots.map(s => 
          s.id === slot.id 
            ? { 
                ...s, 
                isOccupied: false, 
                selectedStat: undefined,
                contributedStats: {}
              }
            : s
        )
      }));
      
      set({ categories: updatedCategories });
      get().calculateTotalStats();
      get().calculateTotalTrainingPoints();
    },

    levelUpStat: (slotId) => {
      const { categories } = get();
      const updatedCategories = categories.map(category => ({
        ...category,
        slots: category.slots.map(s => {
          if (s.id === slotId && s.selectedStat) {
            const maxLevel = get().getStatMaxLevel(s.selectedStat.id, slotId);
            if (s.selectedStat.level < maxLevel) {
              const newLevel = s.selectedStat.level + 1;
              const newValue = get().getStatValueAtLevel(s.selectedStat.id, newLevel, slotId);
              
              // Get the original stat ID for contribution
              const statOption = get().getStatOptionByCompositeId(s.selectedStat.id, slotId);
              const contributionStatId = statOption?.originalStatId || s.selectedStat.id;
              
              return {
                ...s,
                selectedStat: {
                  ...s.selectedStat,
                  level: newLevel,
                  value: newValue
                },
                contributedStats: { [contributionStatId]: newValue }
              };
            }
          }
          return s;
        })
      }));
      
      set({ categories: updatedCategories });
      get().calculateTotalStats();
      get().calculateTotalTrainingPoints();
    },

    levelDownStat: (slotId) => {
      const { categories } = get();
      const updatedCategories = categories.map(category => ({
        ...category,
        slots: category.slots.map(s => {
          if (s.id === slotId && s.selectedStat && s.selectedStat.level > 1) {
            const newLevel = s.selectedStat.level - 1;
            const newValue = get().getStatValueAtLevel(s.selectedStat.id, newLevel, slotId);
            
            // Get the original stat ID for contribution
            const statOption = get().getStatOptionByCompositeId(s.selectedStat.id, slotId);
            const contributionStatId = statOption?.originalStatId || s.selectedStat.id;
            
            return {
              ...s,
              selectedStat: {
                ...s.selectedStat,
                level: newLevel,
                value: newValue
              },
              contributedStats: { [contributionStatId]: newValue }
            };
          }
          return s;
        })
      }));
      
      set({ categories: updatedCategories });
      get().calculateTotalStats();
      get().calculateTotalTrainingPoints();
    },

    canLevelUp: (slotId) => {
      const slot = get().getSlotById(slotId);
      if (!slot?.selectedStat) return false;
      
      const maxLevel = get().getStatMaxLevel(slot.selectedStat.id, slotId);
      if (slot.selectedStat.level >= maxLevel) return false;
      
      // Check if there are enough training points for the next level
      const nextLevel = slot.selectedStat.level + 1;
      const trainingPointCost = get().getTrainingPointCost(slot.selectedStat.id, nextLevel, slotId);
      const remainingPoints = get().getRemainingTrainingPoints();
      
      return remainingPoints >= trainingPointCost;
    },

    canLevelDown: (slotId) => {
      const slot = get().getSlotById(slotId);
      return slot?.selectedStat ? slot.selectedStat.level > 1 : false;
    },

    calculateTotalStats: () => {
      const { categories, forceWingBaseStats } = get();
      const totalStats: Record<string, number> = {};
      
      // Add base stats from Force Wing level
      Object.entries(forceWingBaseStats).forEach(([statId, value]) => {
        totalStats[statId] = (totalStats[statId] || 0) + value;
      });
      
      // Add stats from slots
      categories.forEach(category => {
        category.slots.forEach(slot => {
          if (slot.contributedStats) {
            Object.entries(slot.contributedStats).forEach(([statId, value]) => {
              totalStats[statId] = (totalStats[statId] || 0) + value;
            });
          }
        });
      });
      
      set({ totalStats });
      
      // Register stats with global registry
      const { registerSystemStats } = useStatRegistryStore.getState();
      registerSystemStats('force-wing', totalStats);
      
      return totalStats;
    },

    getSlotById: (slotId) => {
      if (!slotId) return null;
      const { categories } = get();
      for (const category of categories) {
        const slot = category.slots.find(s => s.id === slotId);
        if (slot) return slot;
      }
      return null;
    },

    getAvailableStats: (slotId) => {
      // Return slot-specific stats, or empty array if no stats defined for this slot
      return forceWingSlotStats[slotId] || [];
    },

    initializeCategories: () => {
      const defaultCategories = getForceWingSystemDefaultState();
      set({ categories: defaultCategories });
      get().calculateForceWingBaseStats();
      get().calculateAvailableTrainingPoints();
      get().calculateTotalStats();
    },

    resetSystem: () => {
      const defaultCategories = getForceWingSystemDefaultState();
      set({ 
        categories: defaultCategories,
        selectedSlotId: null,
        isModalOpen: false,
        totalStats: {},
        forceWingLevel: FORCE_WING_CONFIG.forceWingMinLevel,
        forceWingBaseStats: {},
        totalTrainingPoints: 0,
        availableTrainingPoints: 0
      });
      
      get().calculateForceWingBaseStats();
      get().calculateAvailableTrainingPoints();
      get().calculateTotalStats();
      get().calculateTotalTrainingPoints();
    },

    quickFillSystem: () => {
      // TODO: Implement quick fill logic when stat options are defined
    },

    restoreFromImport: (data: { categories?: SystemCategory[]; forceWingLevel?: number }) => {
      try {
        // Validate input data
        if (!data || typeof data !== 'object' || Array.isArray(data)) {
          console.warn('Invalid Force Wing import data format. Expected object with categories and forceWingLevel.');
          get().resetSystem();
          return;
        }
        
        // Restore categories if provided
        if (data.categories && Array.isArray(data.categories)) {
          set({ categories: data.categories });
        }
        
        // Restore force wing level if provided
        if (data.forceWingLevel !== undefined) {
          const clampedLevel = Math.max(
            FORCE_WING_CONFIG.forceWingMinLevel, 
            Math.min(FORCE_WING_CONFIG.forceWingMaxLevel, data.forceWingLevel)
          );
          set({ forceWingLevel: clampedLevel });
          get().calculateForceWingBaseStats();
          get().calculateAvailableTrainingPoints();
        }
        
        // Recalculate everything
        get().calculateTotalStats();
        get().calculateTotalTrainingPoints();
      } catch (error) {
        console.error('Failed to restore Force Wing system from import:', error);
        // Reset to default state on error
        get().resetSystem();
      }
    },

    setForceWingLevel: (level) => {
      const clampedLevel = Math.max(
        FORCE_WING_CONFIG.forceWingMinLevel, 
        Math.min(FORCE_WING_CONFIG.forceWingMaxLevel, level)
      );
      set({ forceWingLevel: clampedLevel });
      get().calculateForceWingBaseStats();
      get().calculateAvailableTrainingPoints();
      get().calculateTotalStats();
    },

    calculateForceWingBaseStats: () => {
      const { forceWingLevel } = get();
      const multiplier = FORCE_WING_CONFIG.forceWingBaseStatMultiplier;
      const baseStats = {
        'allAttack': forceWingLevel * multiplier,
        'hp': forceWingLevel * multiplier,
        'defense': forceWingLevel * multiplier
      };
      
      set({ forceWingBaseStats: baseStats });
      return baseStats;
    },

    calculateTotalTrainingPoints: () => {
      const { categories } = get();
      let totalPoints = 0;
      
      categories.forEach(category => {
        category.slots.forEach(slot => {
          if (slot.selectedStat && slot.selectedStat.level > 1) {
            const statId = slot.selectedStat.id;
            // Calculate training points for levels 2 to current level
            for (let level = 2; level <= slot.selectedStat.level; level++) {
              totalPoints += get().getTrainingPointCost(statId, level, slot.id);
            }
          }
        });
      });
      
      set({ totalTrainingPoints: totalPoints });
      return totalPoints;
    },

    getStatOptionByCompositeId: (compositeId, slotId) => {
      const slotStats = forceWingSlotStats[slotId];
      if (!slotStats) return null;
      
      return slotStats.find(s => s.id === compositeId) || null;
    },

    getStatMaxLevel: (statId, slotId) => {
      // First try to find by composite ID in the specific slot
      if (slotId) {
        const slotStats = forceWingSlotStats[slotId];
        if (slotStats) {
          const stat = slotStats.find(s => s.id === statId);
          if (stat) return stat.maxLevel;
        }
      }
      
      // Fallback: search through all slot stats to find the stat
      for (const slotStats of Object.values(forceWingSlotStats)) {
        const stat = slotStats.find(s => s.id === statId);
        if (stat) return stat.maxLevel;
      }
      return FORCE_WING_CONFIG.maxLevel; // Fallback to config default
    },

    getTrainingPointCost: (statId, level, slotId) => {
      // First try to find by composite ID in the specific slot
      if (slotId) {
        const slotStats = forceWingSlotStats[slotId];
        if (slotStats) {
          const stat = slotStats.find(s => s.id === statId);
          if (stat) {
            if (level < 2) return 0;
            // Training point costs array is 0-indexed for levels 2,3,4,5...
            // So level 2 = index 0, level 3 = index 1, etc.
            const costIndex = level - 2;
            return stat.trainingPointCosts[costIndex] || 0;
          }
        }
      }
      
      // Fallback: search through all slot stats to find the stat
      for (const slotStats of Object.values(forceWingSlotStats)) {
        const stat = slotStats.find(s => s.id === statId);
        if (stat) {
          if (level < 2) return 0;
          // Training point costs array is 0-indexed for levels 2,3,4,5...
          // So level 2 = index 0, level 3 = index 1, etc.
          const costIndex = level - 2;
          return stat.trainingPointCosts[costIndex] || 0;
        }
      }
      return 0;
    },

    getStatValueAtLevel: (statId, level, slotId) => {
      // First try to find by composite ID in the specific slot
      if (slotId) {
        const slotStats = forceWingSlotStats[slotId];
        if (slotStats) {
          const stat = slotStats.find(s => s.id === statId);
          if (stat) {
            if (stat.levelValues && level >= 1 && level <= stat.levelValues.length) {
              // levelValues array is 0-indexed for levels 1,2,3,4,5...
              // So level 1 = index 0, level 2 = index 1, etc.
              return stat.levelValues[level - 1];
            }
            // Fallback to simple multiplication if no levelValues defined
            return stat.value * level;
          }
        }
      }
      
      // Fallback: search through all slot stats to find the stat
      for (const slotStats of Object.values(forceWingSlotStats)) {
        const stat = slotStats.find(s => s.id === statId);
        if (stat) {
          if (stat.levelValues && level >= 1 && level <= stat.levelValues.length) {
            // levelValues array is 0-indexed for levels 1,2,3,4,5...
            // So level 1 = index 0, level 2 = index 1, etc.
            return stat.levelValues[level - 1];
          }
          // Fallback to simple multiplication if no levelValues defined
          return stat.value * level;
        }
      }
      return 0;
    },

    calculateAvailableTrainingPoints: () => {
      const { forceWingLevel } = get();
      
      // Base training points: 2 per level
      let totalPoints = forceWingLevel * 2;
      
      // Bonus points based on level milestones
      if (forceWingLevel >= 101) {
        totalPoints += 20;
      }
      if (forceWingLevel >= 201) {
        totalPoints += 30;
      }
      if (forceWingLevel >= 301) {
        totalPoints += 40;
      }
      if (forceWingLevel >= 401) {
        totalPoints += 50;
      }
      
      set({ availableTrainingPoints: totalPoints });
      return totalPoints;
    },

    getRemainingTrainingPoints: () => {
      const { availableTrainingPoints, totalTrainingPoints } = get();
      return Math.max(0, availableTrainingPoints - totalTrainingPoints);
    }
  }))
);

// System configuration for build sharing
export const forceWingSystemConfig = {
  systemId: 'force-wing',
  displayName: 'Force Wing',
  getState: () => {
    const state = useForceWingSystemStore.getState();
    return {
      categories: state.categories,
      forceWingLevel: state.forceWingLevel
    };
  },
  restoreState: (data: any) => {
    const store = useForceWingSystemStore.getState();
    if (data.categories) {
      store.restoreFromImport(data.categories);
    }
    if (data.forceWingLevel) {
      store.setForceWingLevel(data.forceWingLevel);
    }
  }
};