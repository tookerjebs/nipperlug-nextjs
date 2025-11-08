/**
 * Honor Medal System Zustand Store
 * Manages honor medal system state independently while contributing to global stats
 */

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { SystemSlot, SystemCategory, StatOption } from '@/tools/build-planner/types/systems';
import { useStatRegistryStore } from '@/tools/build-planner/stores/statRegistryStore';
import { getStatInfo, getStatsByCategory } from '@/tools/build-planner/data/stats-config';
import HonorMedalData from '../data/honor-medal-data';
import { createMetaBuild } from '../data/honor-medal-meta-builds';

// Honor Medal System State
interface HonorMedalSystemState {
  categories: SystemCategory[];
  selectedSlotId: string | null;
  isModalOpen: boolean;
  slotStates: Record<string, SlotState>;
  rankLevels: RankLevel;
  totalStats: Record<string, number>;
}

// Honor Medal System Actions
interface HonorMedalSystemActions {
  setSelectedSlotId: (slotId: string | null) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  handleSlotClick: (slot: SystemSlot) => void;
  handleStatSelect: (slot: SystemSlot, stat: StatOption) => void;
  handleStatRemove: (slot: SystemSlot) => void;
  handleRankLevelChange: (rankId: string, delta: number) => void;
  calculateTotalStats: () => Record<string, number>;
  getSlotById: (slotId: string | null) => SystemSlot | null;
  getAvailableStats: (slotId: string) => StatOption[];
  initializeCategories: () => void;
  resetSystem: () => void;
  quickFillSystem: () => void;
  
  // Build sharing methods
  restoreFromImport: (data: { categories: SystemCategory[]; slotStates: Record<string, SlotState>; rankLevels: RankLevel }) => void;
}

interface SlotState {
  statId?: string;
}

interface RankLevel {
  [rankId: string]: number;
}

// Default state for the honor medal system
const getHonorMedalSystemDefaultState = (): SystemCategory[] => {
  return Object.entries(HonorMedalData.ranks).map(([rankId, rank]) => {
    const slots: SystemSlot[] = Array.from({ length: rank.slots }, (_, index) => ({
      id: `${rankId}-${index}`,
      category: rankId,
      position: index,
      isOccupied: false,
      contributedStats: {}
    }));

    return {
      id: rankId,
      name: rankId,
      displayName: rank.name,
      slots,
      maxSlots: rank.slots
    };
  });
};

const getDefaultRankLevels = (): RankLevel => ({
  captain: 1,
  general: 1,
  commander: 1,
  hero: 1,
  legend: 1
});

// System ID for stat registry
const SYSTEM_ID = 'honorMedal';

// Create the honor medal system store
export const useHonorMedalStore = create<
  HonorMedalSystemState & HonorMedalSystemActions,
  [["zustand/subscribeWithSelector", never]]
>(
  subscribeWithSelector((set, get) => ({
    // Initial state
    categories: [],
    selectedSlotId: null,
    isModalOpen: false,
    slotStates: {},
    rankLevels: getDefaultRankLevels(),
    totalStats: {},

    // Actions
    setSelectedSlotId: (slotId: string | null) => {
      set({ selectedSlotId: slotId });
    },

    setIsModalOpen: (isOpen: boolean) => {
      set({ isModalOpen: isOpen });
    },

    handleSlotClick: (slot: SystemSlot) => {
      set({ 
        selectedSlotId: slot.id,
        isModalOpen: true
      });
    },

    handleStatSelect: (slot: SystemSlot, stat: StatOption) => {
      const { slotStates, rankLevels } = get();
      
      // Update slot state
      const newSlotStates = {
        ...slotStates,
        [slot.id]: { statId: stat.id }
      };
      
      // Update categories with new slot state
      const updatedCategories = get().categories.map(category => {
        if (category.id !== slot.category) return category;
        
        const updatedSlots = category.slots.map(s => {
          if (s.id !== slot.id) return s;
          
          const slotState = newSlotStates[s.id];
          const isOccupied = !!slotState?.statId;
          
          const contributedStats: Record<string, number> = {};
          if (isOccupied && slotState.statId) {
            const statDef = HonorMedalData.rankStats[s.category]?.find(stat => stat.id === slotState.statId);
            if (statDef) {
              const currentLevel = rankLevels[s.category] || 1;
              const value = statDef.values[currentLevel - 1] || 0;
              contributedStats[slotState.statId] = value;
            }
          }
          
          return {
            ...s,
            isOccupied,
            contributedStats,
            assignedItem: isOccupied ? {
              id: `${stat.id}-${Date.now()}`,
              name: stat.name,
              type: 'honor-medal-stat',
              availableStats: [stat.id],
              currentStats: contributedStats
            } : undefined
          };
        });
        
        return { ...category, slots: updatedSlots };
      });
      
      // 1. Update system state first
      set({ 
        categories: updatedCategories,
        slotStates: newSlotStates,
        isModalOpen: false,
        selectedSlotId: null
      });

      // 2. Calculate new total stats
      const totalStats = get().calculateTotalStats();
      
      // 3. Register with stat registry
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
      
      // 4. Update local totalStats
      set({ totalStats });
    },

    handleStatRemove: (slot: SystemSlot) => {
      const { slotStates } = get();
      
      // Remove slot state
      const newSlotStates = { ...slotStates };
      delete newSlotStates[slot.id];
      
      // Update categories
      const updatedCategories = get().categories.map(category => {
        if (category.id !== slot.category) return category;
        
        const updatedSlots = category.slots.map(s => {
          if (s.id !== slot.id) return s;
          
          return {
            ...s,
            isOccupied: false,
            contributedStats: {},
            assignedItem: undefined
          };
        });
        
        return { ...category, slots: updatedSlots };
      });
      
      // 1. Update system state first
      set({ 
        categories: updatedCategories,
        slotStates: newSlotStates
      });

      // 2. Calculate new total stats
      const totalStats = get().calculateTotalStats();
      
      // 3. Register with stat registry
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
      
      // 4. Update local totalStats
      set({ totalStats });
    },

    handleRankLevelChange: (rankId: string, delta: number) => {
      const { rankLevels, slotStates } = get();
      const currentLevel = rankLevels[rankId] || 1;
      const newLevel = Math.max(1, Math.min(HonorMedalData.maxLevel, currentLevel + delta));
      
      if (newLevel === currentLevel) return;
      
      const newRankLevels = {
        ...rankLevels,
        [rankId]: newLevel
      };
      
      // Update categories with new level-based stat values
      const updatedCategories = get().categories.map(category => {
        if (category.id !== rankId) return category;
        
        const updatedSlots = category.slots.map(slot => {
          const slotState = slotStates[slot.id];
          if (!slotState?.statId) return slot;
          
          const statDef = HonorMedalData.rankStats[rankId]?.find(s => s.id === slotState.statId);
          if (!statDef) return slot;
          
          const value = statDef.values[newLevel - 1] || 0;
          const contributedStats = { [slotState.statId]: value };
          
          return {
            ...slot,
            contributedStats,
            assignedItem: slot.assignedItem ? {
              ...slot.assignedItem,
              currentStats: contributedStats
            } : undefined
          };
        });
        
        return { ...category, slots: updatedSlots };
      });
      
      // 1. Update system state first
      set({ 
        rankLevels: newRankLevels,
        categories: updatedCategories
      });

      // 2. Calculate new total stats
      const totalStats = get().calculateTotalStats();
      
      // 3. Register with stat registry
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
      
      // 4. Update local totalStats
      set({ totalStats });
    },

    calculateTotalStats: (): Record<string, number> => {
      const state = get(); // Get current state inside method
      const totalStats: Record<string, number> = {};

      state.categories.forEach(category => {
        category.slots.forEach(slot => {
          if (slot.isOccupied && slot.contributedStats) {
            Object.entries(slot.contributedStats).forEach(([statId, value]) => {
              totalStats[statId] = (totalStats[statId] || 0) + value;
            });
          }
        });
      });

      return totalStats;
    },

    getSlotById: (slotId: string | null): SystemSlot | null => {
      if (!slotId) return null;
      
      const { categories } = get();
      for (const category of categories) {
        const slot = category.slots.find(s => s.id === slotId);
        if (slot) return slot;
      }
      
      return null;
    },

    getAvailableStats: (slotId: string): StatOption[] => {
      const slot = get().getSlotById(slotId);
      if (!slot) return [];

      const rankStats = HonorMedalData.rankStats[slot.category];
      if (!rankStats) return [];

      return rankStats.map(statDef => {
        const statInfo = getStatInfo(statDef.id);
        const minValue = statDef.values[0];
        const maxValue = statDef.values[HonorMedalData.maxLevel - 1];
        const percentageSymbol = statInfo?.isPercentage ? '%' : '';
        
        return {
          id: statDef.id,
          name: `${statInfo?.name || statDef.id} (${minValue}${percentageSymbol}-${maxValue}${percentageSymbol})`,
          value: 0, // Will be set based on level
          isPercentage: statInfo?.isPercentage || false,
          category: statInfo?.category || 'utility',
          maxLevel: HonorMedalData.maxLevel,
          trainingPointCosts: [] // Honor medals don't use training points
        };
      });
    },

    initializeCategories: () => {
      // 1. Set initial state
      const defaultCategories = getHonorMedalSystemDefaultState();
      set({ 
        categories: defaultCategories,
        slotStates: {},
        rankLevels: getDefaultRankLevels()
      });
      
      // 2. Calculate initial total stats (should be empty for default state)
      const totalStats = get().calculateTotalStats();
      
      // 3. Register with stat registry
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
      
      // 4. Update local totalStats
      set({ totalStats });
    },

    resetSystem: () => {
      // Unregister from stat registry FIRST
      useStatRegistryStore.getState().unregisterSystem(SYSTEM_ID);
      
      // Then reset state
      const defaultCategories = getHonorMedalSystemDefaultState();
      set({ 
        categories: defaultCategories,
        selectedSlotId: null,
        isModalOpen: false,
        slotStates: {},
        rankLevels: getDefaultRankLevels(),
        totalStats: {}
      });
    },

    quickFillSystem: () => {
      // Get the meta build configuration
      const metaCategories = createMetaBuild();
      const currentCategories = get().categories;
      
      // Set all ranks to max level (10) for quick fill
      const maxRankLevels: Record<string, number> = {
        captain: 10,
        general: 10,
        commander: 10,
        hero: 10,
        legend: 10
      };
      
      // Create slot states for all filled slots
      const newSlotStates: Record<string, SlotState> = {};
      metaCategories.forEach(category => {
        category.slots.forEach(slot => {
          if (slot.isOccupied && slot.contributedStats) {
            const firstStatId = Object.keys(slot.contributedStats)[0];
            if (firstStatId) {
              newSlotStates[slot.id] = { statId: firstStatId };
            }
          }
        });
      });
      
      // Only update the slots, preserve displayName and other properties
      const updatedCategories = currentCategories.map(category => {
        const metaCategory = metaCategories.find(meta => meta.id === category.id);
        return {
          ...category, // Keep original displayName, maxSlots, etc.
          slots: metaCategory?.slots || category.slots
        };
      });
      
      // 1. Update system state first
      set({ 
        categories: updatedCategories,
        selectedSlotId: null,
        isModalOpen: false,
        slotStates: newSlotStates,
        rankLevels: maxRankLevels
      });
      
      // 2. Calculate new total stats
      const totalStats = get().calculateTotalStats();
      
      // 3. Register with stat registry
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
      
      // 4. Update local totalStats
      set({ totalStats });
    },

    // Method for universal build sharing - restores state and triggers stat registration
    restoreFromImport: (data) => {
      // 1. Set the imported data first
      set({
        categories: data.categories,
        slotStates: data.slotStates,
        rankLevels: data.rankLevels,
        selectedSlotId: null,
        isModalOpen: false
      });
      
      // 2. Calculate total stats
      const totalStats = get().calculateTotalStats();
      
      // 3. Register with stat registry
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
      
      // 4. Update local totalStats
      set({ totalStats });
      
      console.log('Honor medal system restored from import with stats:', totalStats);
    }
  }))
);

// Export the default state function for build sharing
export const honorMedalSystemConfig = {
  systemId: SYSTEM_ID,
  getDefaultState: () => ({ 
    categories: getHonorMedalSystemDefaultState(),
    slotStates: {},
    rankLevels: getDefaultRankLevels()
  })
};

// Export types
export type { HonorMedalSystemState, HonorMedalSystemActions, SlotState, RankLevel };