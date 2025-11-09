// Zustand store for Platinum Merit System
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { PlatinumMeritStore, PlatinumMeritSlotState, PlatinumMeritSlot, SpecialMasteryCategoryState, SpecialMasterySlotState } from '../types/index';
import { loadPlatinumMeritData, MAX_PLATINUM_MERIT_POINTS, MAX_PLATINUM_MERIT_SCORE } from '../data/platinum-merit-loader';
import { useStatRegistryStore } from '@/tools/build-planner/stores/statRegistryStore';
import { getSpecialMasteryStatsForCategory } from '../data/platinum-special-mastery-loader';
import { calculateRequiredMeritScore } from '../data/platinum-merit-score';

// Initialize slot states
const initializeSlotStates = (): Record<string, PlatinumMeritSlotState> => {
  const slotStates: Record<string, PlatinumMeritSlotState> = {};
  const PlatinumMeritData = loadPlatinumMeritData();
  
  PlatinumMeritData.forEach(category => {
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
    useStatRegistryStore.getState().registerSystemStats('platinumMerit', totalStats);
  }, 0);
};

export const usePlatinumMeritStore = create<PlatinumMeritStore>()(subscribeWithSelector(
  (set, get) => ({
    // State
    categories: loadPlatinumMeritData(),
    slotStates: initializeSlotStates(),
    totalPointsSpent: 0,
    maxPointsAllowed: MAX_PLATINUM_MERIT_POINTS,
    selectedCategory: 'fierce-spirit',
    specialMasteryStates: {} as Record<string, SpecialMasteryCategoryState>,
    requiredMeritScore: null as number | null,
    maxPossibleMeritScore: MAX_PLATINUM_MERIT_SCORE, // Maximum achievable merit score (360542)

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
      const pointCost = slot.pointsRequired;
      
      // Check if we have enough points available
      if (!state.hasPointsAvailable(pointCost)) return;
      
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
        const requiredScore = calculateRequiredMeritScore(newTotalPoints);
        
        return {
          slotStates: updatedSlotStates,
          totalPointsSpent: newTotalPoints,
          requiredMeritScore: requiredScore
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
      
      const newLevel = slotState.currentLevel - 1;
      const pointRefund = slot.pointsRequired;
      
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
        const requiredScore = calculateRequiredMeritScore(newTotalPoints);
        
        return {
          slotStates: updatedSlotStates,
          totalPointsSpent: newTotalPoints,
          requiredMeritScore: requiredScore
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
      
      const pointsToRefund = slotState.currentLevel * slot.pointsRequired;
      
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
        const requiredScore = calculateRequiredMeritScore(newTotalPoints);
        
        return {
          slotStates: updatedSlotStates,
          totalPointsSpent: newTotalPoints,
          requiredMeritScore: requiredScore
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
          totalRefund += slotState.currentLevel * slot.pointsRequired;
          newSlotStates[slot.id] = {
            ...slotState,
            currentLevel: 0
          };
        }
      });
      
      // Update unlock states
      const updatedSlotStates = state.updateSlotUnlockStates(newSlotStates);
      const newTotalPoints = state.totalPointsSpent - totalRefund;
      const requiredScore = calculateRequiredMeritScore(newTotalPoints);
      
      set({
        slotStates: updatedSlotStates,
        totalPointsSpent: newTotalPoints,
        requiredMeritScore: requiredScore
      });
      
      // Register stats with the global registry
      updateStatsRegistry(get);
    },

    resetAll: () => {
      set({
        slotStates: initializeSlotStates(),
        totalPointsSpent: 0,
        requiredMeritScore: null
      });
      
      // Register stats with the global registry
      updateStatsRegistry(get);
    },

    quickFillSystem: () => {
      const state = get();
      let newSlotStates = { ...state.slotStates };
      let currentPointsSpent = 0;
      
      // Helper function to check prerequisites using current working state
      const isSlotPrerequisiteMetInWorkingState = (slotId: string, workingStates: Record<string, PlatinumMeritSlotState>): boolean => {
        const slot = state.getSlotById(slotId);
        
        if (!slot || !slot.prerequisites) return true;
        
        return slot.prerequisites.every(prereq => {
          const prereqState = workingStates[prereq.slotId];
          return prereqState && prereqState.currentLevel >= prereq.requiredLevel;
        });
      };
      
      // Iterative approach: keep filling until no more progress can be made or points run out
      let progressMade = true;
      const maxIterations = 100; // Safety limit to prevent infinite loops
      let iterations = 0;
      
      while (progressMade && iterations < maxIterations && currentPointsSpent < state.maxPointsAllowed) {
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
              
              // Calculate how many levels we can afford
              const remainingPoints = state.maxPointsAllowed - currentPointsSpent;
              const maxAffordableLevels = Math.floor(remainingPoints / slot.pointsRequired);
              const maxPossibleLevels = slot.maxLevel - slotState.currentLevel;
              const levelsToAdd = Math.min(maxAffordableLevels, maxPossibleLevels);
              
              if (levelsToAdd > 0) {
                newSlotStates[slot.id] = {
                  ...slotState,
                  currentLevel: slotState.currentLevel + levelsToAdd
                };
                currentPointsSpent += levelsToAdd * slot.pointsRequired;
                progressMade = true;
              }
            }
          });
        });
      }
      
      // Final update of unlock states
      const finalSlotStates = state.updateSlotUnlockStates(newSlotStates);
      
      // Calculate actual total points spent
      let totalPointsSpent = 0;
      Object.values(finalSlotStates).forEach(slotState => {
        const slot = state.getSlotById(slotState.slotId);
        if (slot && slotState.currentLevel > 0) {
          totalPointsSpent += slotState.currentLevel * slot.pointsRequired;
        }
      });
      
      const requiredScore = calculateRequiredMeritScore(totalPointsSpent);
      
      set({
        slotStates: finalSlotStates,
        totalPointsSpent: totalPointsSpent,
        requiredMeritScore: requiredScore
      });
      
      // Register stats with the global registry
      updateStatsRegistry(get);
    },

    // Utility functions
    getSlotById: (slotId: string): PlatinumMeritSlot | undefined => {
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
      if (!state.hasPointsAvailable(slot.pointsRequired)) return false;
      
      return true;
    },

    canDowngradeSlot: (slotId: string): boolean => {
      const state = get();
      const slotState = state.slotStates[slotId];
      
      if (!slotState) return false;
      return slotState.currentLevel > 0;
    },

    hasPointsAvailable: (pointsNeeded: number): boolean => {
      const state = get();
      return (state.totalPointsSpent + pointsNeeded) <= state.maxPointsAllowed;
    },

    calculateTotalStats: (): Record<string, number> => {
      const state = get();
      const totalStats: Record<string, number> = {};
      
      // Helper function to find expansion slot for a given base slot
      const findExpansionSlotForBase = (baseSlotId: string): string | null => {
        for (const category of state.categories) {
          for (const slot of category.slots) {
            if (slot.isExpansion && slot.expandsSlot === baseSlotId) {
              return slot.id;
            }
          }
        }
        return null;
      };
      
      Object.values(state.slotStates).forEach(slotState => {
        const slot = state.getSlotById(slotState.slotId);
        if (slot && slotState.currentLevel > 0) {
          let statValue = 0;
          
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
              statValue = slot.values[slotState.currentLevel - 1] || 0;
            } else {
              // No expansion slot exists for this slot, so it never contributes stats
              return;
            }
          }
          
          // Add stat value to the total (only one stat type for platinum merit)
          if (statValue > 0) {
            totalStats[slot.statType] = (totalStats[slot.statType] || 0) + statValue;
          }
        }
      });
      
      // Add special mastery stats
      Object.entries(state.specialMasteryStates).forEach(([categoryId, categoryState]) => {
        const specialStats = state.calculateSpecialMasteryStats(categoryId);
        Object.entries(specialStats).forEach(([statType, value]) => {
          totalStats[statType] = (totalStats[statType] || 0) + value;
        });
      });
      
      return totalStats;
    },

    isSlotPrerequisiteMet: (slotId: string): boolean => {
      const state = get();
      const slot = state.getSlotById(slotId);
      
      if (!slot || !slot.prerequisites) return true;
      
      return slot.prerequisites.every(prereq => {
        const prereqState = state.slotStates[prereq.slotId];
        return prereqState && prereqState.currentLevel >= prereq.requiredLevel;
      });
    },

    updateSlotUnlockStates: (slotStates: Record<string, PlatinumMeritSlotState>) => {
      const state = get();
      const updatedStates = { ...slotStates };
      
      // Helper function to check prerequisites using the provided slot states
      const isSlotPrerequisiteMetInStates = (slotId: string, states: Record<string, PlatinumMeritSlotState>): boolean => {
        const slot = state.getSlotById(slotId);
        
        if (!slot || !slot.prerequisites) return true;
        
        return slot.prerequisites.every(prereq => {
          const prereqState = states[prereq.slotId];
          return prereqState && prereqState.currentLevel >= prereq.requiredLevel;
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

    // Special Mastery actions
    selectSpecialMasteryStat: (categoryId: string, slotIndex: 0 | 1, statIndex: number, grade: number) => {
      const state = get();
      const stats = state.getSpecialMasteryStats(categoryId);
      
      if (!stats || statIndex < 0 || statIndex >= stats.length) return;
      
      const statOption = stats[statIndex];
      const selectedGrade = statOption.grades.find(g => g.grade === grade);
      if (!selectedGrade) return;
      
      set(state => {
        const currentCategoryState = state.specialMasteryStates[categoryId] || {
          slots: [
            { selectedStatIndex: null, selectedGrade: null },
            { selectedStatIndex: null, selectedGrade: null }
          ]
        };
        
        const newSlots: [SpecialMasterySlotState, SpecialMasterySlotState] = [...currentCategoryState.slots] as [SpecialMasterySlotState, SpecialMasterySlotState];
        newSlots[slotIndex] = {
          selectedStatIndex: statIndex,
          selectedGrade: grade
        };
        
        return {
          specialMasteryStates: {
            ...state.specialMasteryStates,
            [categoryId]: {
              slots: newSlots
            }
          }
        };
      });
      
      // Register stats with the global registry
      updateStatsRegistry(get);
    },
    
    clearSpecialMasterySlot: (categoryId: string, slotIndex: 0 | 1) => {
      set(state => {
        const currentCategoryState = state.specialMasteryStates[categoryId];
        if (!currentCategoryState) return state;
        
        const newSlots: [SpecialMasterySlotState, SpecialMasterySlotState] = [...currentCategoryState.slots] as [SpecialMasterySlotState, SpecialMasterySlotState];
        newSlots[slotIndex] = {
          selectedStatIndex: null,
          selectedGrade: null
        };
        
        return {
          specialMasteryStates: {
            ...state.specialMasteryStates,
            [categoryId]: {
              slots: newSlots
            }
          }
        };
      });
      
      // Register stats with the global registry
      updateStatsRegistry(get);
    },
    
    getSpecialMasteryStats: (categoryId: string) => {
      // Map category ID to category number (5-10)
      const categoryMap: Record<string, string> = {
        'fierce-spirit': '5',
        'iron-will': '6',
        'war-slayer': '7',
        'war-guardian': '8',
        'sharp-blade': '9',
        'quick-evasion': '10'
      };
      
      const categoryNumber = categoryMap[categoryId];
      if (!categoryNumber) return null;
      
      return getSpecialMasteryStatsForCategory(categoryNumber);
    },
    
    getSpecialMasterySlotState: (categoryId: string, slotIndex: 0 | 1) => {
      const state = get();
      const categoryState = state.specialMasteryStates[categoryId];
      if (!categoryState) return undefined;
      return categoryState.slots[slotIndex];
    },
    
    calculateSpecialMasteryStats: (categoryId: string): Record<string, number> => {
      const state = get();
      const categoryState = state.specialMasteryStates[categoryId];
      if (!categoryState) return {};
      
      // Check if special mastery expansion slot is unlocked for this category
      // Special mastery expansion slots have statType "unknown" and forceID 146
      const category = state.categories.find(c => c.id === categoryId);
      if (!category) return {};
      
      // Find the special mastery expansion slot for this category
      const specialMasteryExpansionSlot = category.slots.find(
        slot => slot.isExpansion && slot.statType === 'unknown'
      );
      
      if (!specialMasteryExpansionSlot) return {};
      
      // Check if the expansion slot is unlocked (currentLevel > 0)
      const expansionSlotState = state.slotStates[specialMasteryExpansionSlot.id];
      if (!expansionSlotState || expansionSlotState.currentLevel === 0) {
        // Special mastery expansion slot not unlocked, don't contribute stats
        return {};
      }
      
      const stats = state.getSpecialMasteryStats(categoryId);
      if (!stats) return {};
      
      const totalStats: Record<string, number> = {};
      
      categoryState.slots.forEach(slotState => {
        if (slotState.selectedStatIndex !== null && slotState.selectedGrade !== null) {
          const statOption = stats[slotState.selectedStatIndex];
          const grade = statOption.grades.find(g => g.grade === slotState.selectedGrade);
          
          if (grade) {
            const value = grade.valueType === 'percent' ? grade.value : grade.value;
            totalStats[statOption.statType] = (totalStats[statOption.statType] || 0) + value;
          }
        }
      });
      
      return totalStats;
    },
    
    // Cost and time calculations
    calculateTotalUnlockCosts: () => {
      const state = get();
      let totalDivineCore = 0;
      let totalChaosCore = 0;
      
      state.categories.forEach(category => {
        category.slots.forEach(slot => {
          const slotState = state.slotStates[slot.id];
          // Only count costs for slots that are unlocked (currentLevel > 0)
          if (slotState && slotState.currentLevel > 0 && slot.unlockCost) {
            totalDivineCore += slot.unlockCost.divineCore;
            totalChaosCore += slot.unlockCost.chaosCore;
          }
        });
      });
      
      return { divineCore: totalDivineCore, chaosCore: totalChaosCore };
    },
    
    calculateTotalUnlockTime: () => {
      const state = get();
      let totalTime = 0;
      
      state.categories.forEach(category => {
        category.slots.forEach(slot => {
          const slotState = state.slotStates[slot.id];
          // Only count time for slots that are unlocked (currentLevel > 0)
          if (slotState && slotState.currentLevel > 0 && slot.unlockTime) {
            totalTime += slot.unlockTime;
          }
        });
      });
      
      return totalTime;
    },
    
    formatUnlockTime: (seconds: number) => {
      const days = Math.floor(seconds / 86400);
      const hours = Math.floor((seconds % 86400) / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      const secs = seconds % 60;
      
      const parts: string[] = [];
      if (days > 0) parts.push(`${days}d`);
      if (hours > 0) parts.push(`${hours}h`);
      if (minutes > 0) parts.push(`${minutes}m`);
      if (secs > 0 || parts.length === 0) parts.push(`${secs}s`);
      
      return parts.join(' ');
    },
    
    // Import/Export functionality
    restoreFromImport: (importData) => {
      const validatedSlotStates = get().validateAndRestoreSlotStates(importData.slotStates);
      const requiredScore = calculateRequiredMeritScore(importData.totalPointsSpent);
      
      set({
        slotStates: validatedSlotStates,
        totalPointsSpent: importData.totalPointsSpent,
        selectedCategory: importData.selectedCategory,
        specialMasteryStates: importData.specialMasteryStates || {},
        requiredMeritScore: requiredScore
      });
      
      // Register stats with the global registry after restore
      updateStatsRegistry(get);
    },

    validateAndRestoreSlotStates: (importedSlotStates) => {
      const state = get();
      const validatedStates: Record<string, PlatinumMeritSlotState> = {};
      
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
          slot.prerequisites.forEach(prereq => {
            if (importedSlotStates[prereq.slotId] && !processedSlots.has(prereq.slotId)) {
              addSlotWithDependencies(prereq.slotId, importedSlotStates[prereq.slotId]);
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
          const prereqsMet = !slot.prerequisites || slot.prerequisites.every(prereq => {
            const prereqState = validatedStates[prereq.slotId];
            return prereqState && prereqState.currentLevel >= prereq.requiredLevel;
          });
          
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