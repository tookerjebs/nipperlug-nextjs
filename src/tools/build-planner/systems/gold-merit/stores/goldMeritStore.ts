// Zustand store for Gold Merit System
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { GoldMeritStore, GoldMeritSlotState, GoldMeritSlot } from '../types/index';
import { loadGoldMeritData, getPointCostForLevel, getMasteryBySlotId, getPrerequisiteInfo } from '../data/gold-merit-data-loader';
import { GoldMeritSlotMapping } from '../data/gold-merit-config';
import { calculateRequiredMeritScore } from '../data/gold-merit-score';
import { useStatRegistryStore } from '@/tools/build-planner/stores/statRegistryStore';

// Load data
const GoldMeritData = loadGoldMeritData();

// Initialize slot states
const initializeSlotStates = (): Record<string, GoldMeritSlotState> => {
  const slotStates: Record<string, GoldMeritSlotState> = {};
  
  GoldMeritData.forEach(category => {
    category.slots.forEach(slot => {
      slotStates[slot.id] = {
        slotId: slot.id,
        currentLevel: 0,
        isUnlocked: !slot.prerequisites || slot.prerequisites.length === 0,
        contributedStats: {}
      };
    });
  });
  
  return slotStates;
};

// Helper function to update stats registry
const updateStatsRegistry = (getState: () => any) => {
  // Use a small delay to ensure state is fully updated
  setTimeout(() => {
    const state = getState();
    const totalStats = state.calculateTotalStats();
    useStatRegistryStore.getState().registerSystemStats('goldMerit', totalStats);
  }, 0);
};

export const useGoldMeritStore = create<GoldMeritStore>()(subscribeWithSelector(
  (set, get) => ({
    // State
    categories: GoldMeritData,
    slotStates: initializeSlotStates(),
    totalPointsSpent: 0,
    requiredMeritScore: 0,
    selectedCategory: 'ignore-evasion',

    // Category management
    setSelectedCategory: (categoryId: string) => {
      set({ selectedCategory: categoryId });
    },

    // Slot management
    upgradeSlot: (slotId: string) => {
      const state = get();
      const slot = state.getSlotById(slotId);
      const slotState = state.slotStates[slotId];
      
      if (!slot || !slotState || !state.canUpgradeSlot(slotId)) return;
      
      const newLevel = slotState.currentLevel + 1;
      const masteryIndex = GoldMeritSlotMapping[slotId];
      const pointCost = masteryIndex ? getPointCostForLevel(masteryIndex, newLevel) : slot.pointsRequired;
      
      set(state => {
        const newSlotStates = {
          ...state.slotStates,
          [slotId]: {
            ...slotState,
            currentLevel: newLevel
          }
        };
        
        // Update unlock states for dependent slots
        const updatedSlotStates = state.updateSlotUnlockStates(newSlotStates);
        
        const newTotalPoints = state.totalPointsSpent + pointCost;
        return {
          slotStates: updatedSlotStates,
          totalPointsSpent: newTotalPoints,
          requiredMeritScore: calculateRequiredMeritScore(newTotalPoints) ?? 0
        };
      });
      
      // Register stats with the global registry
      updateStatsRegistry(get);
    },

    downgradeSlot: (slotId: string) => {
      const state = get();
      const slot = state.getSlotById(slotId);
      const slotState = state.slotStates[slotId];
      
      if (!slot || !slotState || !state.canDowngradeSlot(slotId)) return;
      
      const currentLevel = slotState.currentLevel;
      const newLevel = currentLevel - 1;
      const masteryIndex = GoldMeritSlotMapping[slotId];
      const pointRefund = masteryIndex ? getPointCostForLevel(masteryIndex, currentLevel) : slot.pointsRequired;
      
      set(state => {
        const newSlotStates = {
          ...state.slotStates,
          [slotId]: {
            ...slotState,
            currentLevel: newLevel
          }
        };
        
        // Update unlock states for dependent slots
        const updatedSlotStates = state.updateSlotUnlockStates(newSlotStates);
        
        const newTotalPoints = state.totalPointsSpent - pointRefund;
        return {
          slotStates: updatedSlotStates,
          totalPointsSpent: newTotalPoints,
          requiredMeritScore: calculateRequiredMeritScore(newTotalPoints) ?? 0
        };
      });
      
      // Register stats with the global registry
      updateStatsRegistry(get);
    },

    resetSlot: (slotId: string) => {
      const state = get();
      const slot = state.getSlotById(slotId);
      const slotState = state.slotStates[slotId];
      
      if (!slot || !slotState) return;
      
      // Calculate total points to refund
      const masteryIndex = GoldMeritSlotMapping[slotId];
      let pointsToRefund = 0;
      if (masteryIndex) {
        for (let level = 1; level <= slotState.currentLevel; level++) {
          pointsToRefund += getPointCostForLevel(masteryIndex, level);
        }
      } else {
        pointsToRefund = slotState.currentLevel * slot.pointsRequired;
      }
      
      set(state => {
        const newSlotStates = {
          ...state.slotStates,
          [slotId]: {
            ...slotState,
            currentLevel: 0
          }
        };
        
        // Update unlock states for dependent slots
        const updatedSlotStates = state.updateSlotUnlockStates(newSlotStates);
        
        const newTotalPoints = state.totalPointsSpent - pointsToRefund;
        return {
          slotStates: updatedSlotStates,
          totalPointsSpent: newTotalPoints,
          requiredMeritScore: calculateRequiredMeritScore(newTotalPoints) ?? 0
        };
      });
      
      // Register stats with the global registry
      updateStatsRegistry(get);
    },

    resetCategory: (categoryId: string) => {
      const state = get();
      const category = state.getCategoryById(categoryId);
      
      if (!category) return;
      
      let totalRefund = 0;
      const newSlotStates = { ...state.slotStates };
      
      category.slots.forEach(slot => {
        const slotState = newSlotStates[slot.id];
        if (slotState) {
          // Calculate points to refund using per-level costs
          const masteryIndex = GoldMeritSlotMapping[slot.id];
          if (masteryIndex) {
            for (let level = 1; level <= slotState.currentLevel; level++) {
              totalRefund += getPointCostForLevel(masteryIndex, level);
            }
          } else {
            totalRefund += slotState.currentLevel * slot.pointsRequired;
          }
          newSlotStates[slot.id] = {
            ...slotState,
            currentLevel: 0
          };
        }
      });
      
      // Update unlock states
      const updatedSlotStates = state.updateSlotUnlockStates(newSlotStates);
      
      const newTotalPoints = state.totalPointsSpent - totalRefund;
      set({
        slotStates: updatedSlotStates,
        totalPointsSpent: newTotalPoints,
        requiredMeritScore: calculateRequiredMeritScore(newTotalPoints) ?? 0
      });
      
      // Register stats with the global registry
      updateStatsRegistry(get);
    },

    resetAll: () => {
      set({
        slotStates: initializeSlotStates(),
        totalPointsSpent: 0,
        requiredMeritScore: 0
      });
      
      // Register stats with the global registry
      updateStatsRegistry(get);
    },

    quickFillSystem: () => {
      const state = get();
      let newSlotStates = { ...state.slotStates };
      
      // Helper function to check prerequisites using current working state
      const isSlotPrerequisiteMetInWorkingState = (slotId: string, workingStates: Record<string, GoldMeritSlotState>): boolean => {
        const slot = state.getSlotById(slotId);
        
        if (!slot || !slot.prerequisites) return true;
        
        // Get prerequisite info from new data structure
        const prereqInfo = getPrerequisiteInfo(slotId);
        if (prereqInfo) {
          const prereqState = workingStates[prereqInfo.slotId];
          return prereqState && prereqState.currentLevel >= prereqInfo.requiredLevel;
        }
        
        // Fallback to old prerequisites array
        return slot.prerequisites.every(prereqId => {
          const prereqState = workingStates[prereqId];
          return prereqState && prereqState.currentLevel > 0;
        });
      };
      
      // Iterative approach: keep filling until no more progress can be made
      let progressMade = true;
      const maxIterations = 100; // Safety limit to prevent infinite loops
      let iterations = 0;
      
      while (progressMade && iterations < maxIterations) {
        progressMade = false;
        iterations++;
        
        // Update unlock states based on current working state
        newSlotStates = state.updateSlotUnlockStates(newSlotStates);
        
        // Try to fill each slot
        state.categories.forEach(category => {
          category.slots.forEach(slot => {
            const slotState = newSlotStates[slot.id];
            
            // Check if slot can be upgraded
            if (slotState && 
                slotState.isUnlocked && 
                slotState.currentLevel < slot.maxLevel &&
                isSlotPrerequisiteMetInWorkingState(slot.id, newSlotStates)) {
              
              // Fill to max level
              const maxPossibleLevels = slot.maxLevel - slotState.currentLevel;
              
              if (maxPossibleLevels > 0) {
                newSlotStates[slot.id] = {
                  ...slotState,
                  currentLevel: slot.maxLevel
                };
                progressMade = true;
              }
            }
          });
        });
      }
      
      // Final update of unlock states
      const finalSlotStates = state.updateSlotUnlockStates(newSlotStates);
      
      // Calculate total points spent using per-level costs
      let totalPointsSpent = 0;
      Object.values(finalSlotStates).forEach(slotState => {
        const slot = state.getSlotById(slotState.slotId);
        if (slot && slotState.currentLevel > 0) {
          const masteryIndex = GoldMeritSlotMapping[slotState.slotId];
          if (masteryIndex) {
            for (let level = 1; level <= slotState.currentLevel; level++) {
              totalPointsSpent += getPointCostForLevel(masteryIndex, level);
            }
          } else {
            totalPointsSpent += slotState.currentLevel * slot.pointsRequired;
          }
        }
      });
      
      set({
        slotStates: finalSlotStates,
        totalPointsSpent: totalPointsSpent,
        requiredMeritScore: calculateRequiredMeritScore(totalPointsSpent) ?? 0
      });
      
      // Register stats with the global registry
      updateStatsRegistry(get);
    },

    // Utility functions
    getSlotById: (slotId: string): GoldMeritSlot | undefined => {
      const state = get();
      for (const category of state.categories) {
        const slot = category.slots.find(s => s.id === slotId);
        if (slot) return slot;
      }
      return undefined;
    },

    getCategoryById: (categoryId: string) => {
      const state = get();
      return state.categories.find(cat => cat.id === categoryId);
    },

    getSlotState: (slotId: string) => {
      const state = get();
      return state.slotStates[slotId];
    },

    canUpgradeSlot: (slotId: string): boolean => {
      const state = get();
      const slot = state.getSlotById(slotId);
      const slotState = state.slotStates[slotId];
      
      if (!slot || !slotState) return false;
      if (slotState.currentLevel >= slot.maxLevel) return false;
      if (!slotState.isUnlocked) return false;
      
      return true;
    },

    canDowngradeSlot: (slotId: string): boolean => {
      const state = get();
      const slotState = state.slotStates[slotId];
      
      if (!slotState) return false;
      return slotState.currentLevel > 0;
    },

    calculateTotalStats: (): Record<string, number> => {
      const state = get();
      const totalStats: Record<string, number> = {};
      
      // Helper function to find expansion slot for a given base slot
      const findExpansionSlotForBase = (baseSlotId: string): string | null => {
        const baseMasteryIndex = GoldMeritSlotMapping[baseSlotId];
        if (!baseMasteryIndex) return null;
        
        // Find expansion slot that has linkedMasteryIndex matching baseMasteryIndex
        for (const category of state.categories) {
          for (const slot of category.slots) {
            if (slot.isExpansion) {
              const expansionMastery = getMasteryBySlotId(slot.id);
              if (expansionMastery && expansionMastery.linkedMasteryIndex === baseMasteryIndex) {
                return slot.id;
              }
              // Fallback to old expandsSlot field
              if (slot.expandsSlot === baseSlotId) {
                return slot.id;
              }
            }
          }
        }
        return null;
      };
      
      Object.values(state.slotStates).forEach(slotState => {
        const slot = state.getSlotById(slotState.slotId);
        if (slot && slotState.currentLevel > 0) {
          let baseStatValue = 0;
          let bonusStatValue = 0;
          
          // Handle expansion slots - they don't contribute stats directly
          if (slot.isExpansion) {
            // Expansion slots themselves don't contribute stats
            // They only enable their base slots to contribute stats
            return;
          } else {
            // Regular slot - only contribute stats if expansion slot exists AND is unlocked
            const expansionSlotId = findExpansionSlotForBase(slot.id);
            
            if (expansionSlotId) {
              // This slot has an expansion slot - check if it's unlocked
              const expansionSlotState = state.slotStates[expansionSlotId];
              if (!expansionSlotState || expansionSlotState.currentLevel === 0) {
                // Expansion slot not unlocked, don't contribute stats
                return;
              }
              // Expansion slot is unlocked, contribute stats
              // Get stat values from the mastery data
              const mastery = getMasteryBySlotId(slot.id);
              if (mastery && mastery.values[slotState.currentLevel - 1]) {
                const valueEntry = mastery.values[slotState.currentLevel - 1];
                baseStatValue = valueEntry.baseStat.value;
                bonusStatValue = valueEntry.bonusStat ? valueEntry.bonusStat.value : 0;
              } else {
                // Fallback to slot values
                baseStatValue = slot.values[slotState.currentLevel - 1] || 0;
                bonusStatValue = slot.bonusValues ? (slot.bonusValues[slotState.currentLevel - 1] || 0) : 0;
              }
            } else {
              // No expansion slot exists for this slot, so it never contributes stats to PvE
              return;
            }
          }
          
          // Add both base and bonus stats to the total
          const totalStatValue = baseStatValue + bonusStatValue;
          if (totalStatValue > 0) {
            totalStats[slot.statType] = (totalStats[slot.statType] || 0) + totalStatValue;
          }
        }
      });
      
      return totalStats;
    },

    isSlotPrerequisiteMet: (slotId: string): boolean => {
      const state = get();
      const slot = state.getSlotById(slotId);
      
      if (!slot) return true;
      
      // Get prerequisite info from new data structure
      const prereqInfo = getPrerequisiteInfo(slotId);
      if (prereqInfo) {
        const prereqState = state.slotStates[prereqInfo.slotId];
        return prereqState && prereqState.currentLevel >= prereqInfo.requiredLevel;
      }
      
      // Fallback to old prerequisites array
      if (!slot.prerequisites) return true;
      
      return slot.prerequisites.every(prereqId => {
        const prereqState = state.slotStates[prereqId];
        return prereqState && prereqState.currentLevel > 0;
      });
    },

    updateSlotUnlockStates: (slotStates: Record<string, GoldMeritSlotState>) => {
      const state = get();
      const updatedStates = { ...slotStates };
      
      // Helper function to check prerequisites using the provided slot states
      const isSlotPrerequisiteMetInStates = (slotId: string, states: Record<string, GoldMeritSlotState>): boolean => {
        const slot = state.getSlotById(slotId);
        
        if (!slot) return true;
        
        // Get prerequisite info from new data structure
        const prereqInfo = getPrerequisiteInfo(slotId);
        if (prereqInfo) {
          const prereqState = states[prereqInfo.slotId];
          return prereqState && prereqState.currentLevel >= prereqInfo.requiredLevel;
        }
        
        // Fallback to old prerequisites array
        if (!slot.prerequisites) return true;
        
        return slot.prerequisites.every(prereqId => {
          const prereqState = states[prereqId];
          return prereqState && prereqState.currentLevel > 0;
        });
      };
      
      state.categories.forEach(category => {
        category.slots.forEach(slot => {
          const slotState = updatedStates[slot.id];
          if (slotState) {
            updatedStates[slot.id] = {
              ...slotState,
              isUnlocked: isSlotPrerequisiteMetInStates(slot.id, updatedStates)
            };
          }
        });
      });
      
      return updatedStates;
    },

    // Import/Export functionality
    restoreFromImport: (importData) => {
      const validatedSlotStates = get().validateAndRestoreSlotStates(importData.slotStates);
      
      set({
        slotStates: validatedSlotStates,
        totalPointsSpent: importData.totalPointsSpent,
        requiredMeritScore: calculateRequiredMeritScore(importData.totalPointsSpent) ?? 0,
        selectedCategory: importData.selectedCategory
      });
      
      // Register stats with the global registry after restore
      updateStatsRegistry(get);
    },

    validateAndRestoreSlotStates: (importedSlotStates) => {
      const state = get();
      const validatedStates: Record<string, GoldMeritSlotState> = {};
      
      // Initialize with default states
      state.categories.forEach(category => {
        category.slots.forEach(slot => {
          validatedStates[slot.id] = {
            slotId: slot.id,
            currentLevel: 0,
            isUnlocked: !slot.prerequisites || slot.prerequisites.length === 0,
            contributedStats: {}
          };
        });
      });
      
      // Create a dependency-ordered list of slots to restore
      const slotsToRestore: Array<{ slotId: string; slotState: any }> = [];
      const processedSlots = new Set<string>();
      
      // Helper function to add slot and its dependencies in correct order
      const addSlotWithDependencies = (slotId: string, slotState: any) => {
        if (processedSlots.has(slotId)) return;
        
        const slot = state.getSlotById(slotId);
        if (!slot) return;
        
        // First, add all prerequisites
        if (slot.prerequisites) {
          slot.prerequisites.forEach(prereqId => {
            if (importedSlotStates[prereqId] && !processedSlots.has(prereqId)) {
              addSlotWithDependencies(prereqId, importedSlotStates[prereqId]);
            }
          });
        }
        
        // Then add this slot
        if (!processedSlots.has(slotId)) {
          slotsToRestore.push({ slotId, slotState });
          processedSlots.add(slotId);
        }
      };
      
      // Build the ordered restoration list
      Object.entries(importedSlotStates).forEach(([slotId, slotState]) => {
        addSlotWithDependencies(slotId, slotState);
      });
      
      // Apply imported states in dependency order
      slotsToRestore.forEach(({ slotId, slotState }) => {
        const slot = state.getSlotById(slotId);
        if (slot && slotState.currentLevel <= slot.maxLevel && slotState.currentLevel >= 0) {
          // Check if prerequisites are met before restoring
          const prereqInfo = getPrerequisiteInfo(slotId);
          let prereqsMet = true;
          
          if (prereqInfo) {
            const prereqState = validatedStates[prereqInfo.slotId];
            prereqsMet = prereqState && prereqState.currentLevel >= prereqInfo.requiredLevel;
          } else if (slot.prerequisites) {
            prereqsMet = slot.prerequisites.every(prereqId => {
              const prereqState = validatedStates[prereqId];
              return prereqState && prereqState.currentLevel > 0;
            });
          }
          
          if (prereqsMet || slotState.currentLevel === 0) {
            validatedStates[slotId] = {
              slotId: slot.id,
              currentLevel: slotState.currentLevel,
              isUnlocked: prereqsMet || (!slot.prerequisites || slot.prerequisites.length === 0),
              contributedStats: slotState.contributedStats || {}
            };
          }
        }
      });
      
      return state.updateSlotUnlockStates(validatedStates);
    }
  })
));