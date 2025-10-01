/**
 * Pet System Zustand Store
 * Manages pet system state independently while contributing to global stats
 */

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { 
  SystemCategory, 
  SystemSlot, 
  StatOption, 
  PetSystemState, 
  PetSystemActions 
} from '../types/pet';
import { petTierStats } from '@/tools/build-planner/systems/pet/data/pet-data';
import { createMetaBuild } from '@/tools/build-planner/systems/pet/data/pet-meta-builds';
import { useStatRegistryStore } from '../../../stores/statRegistryStore';
import { getStatInfo } from '@/tools/build-planner/data/stats-config';

// Default state for the pet system
const getPetSystemDefaultState = (): SystemCategory[] => {
  return [
    {
      id: 'normal',
      name: 'normal',
      displayName: 'Normal (Level 1-10)',
      maxSlots: 10,
      slots: Array.from({ length: 10 }, (_, index) => ({
        id: `normal-${index + 1}`,
        category: 'normal',
        position: index + 1,
        isOccupied: false,
        contributedStats: {}
      }))
    },
    {
      id: 'covenant',
      name: 'covenant',
      displayName: 'Covenant (Level 11-20)',
      maxSlots: 10,
      slots: Array.from({ length: 10 }, (_, index) => ({
        id: `covenant-${index + 1}`,
        category: 'covenant',
        position: index + 1,
        isOccupied: false,
        contributedStats: {}
      }))
    },
    {
      id: 'trust',
      name: 'trust',
      displayName: 'Trust (Level 21-30)',
      maxSlots: 10,
      slots: Array.from({ length: 10 }, (_, index) => ({
        id: `trust-${index + 1}`,
        category: 'trust',
        position: index + 1,
        isOccupied: false,
        contributedStats: {}
      }))
    },
    {
      id: 'transcendence',
      name: 'transcendence',
      displayName: 'Transcendence (Episode 39)',
      maxSlots: 10,
      slots: Array.from({ length: 10 }, (_, index) => ({
        id: `transcendence-${index + 1}`,
        category: 'transcendence',
        position: index + 1,
        isOccupied: false,
        contributedStats: {}
      }))
    }
  ];
};

// Helper functions for pet system

const isPercentageStat = (statId: string): boolean => {
  const statInfo = getStatInfo(statId);
  return statInfo?.isPercentage || false;
};

const getStatCategory = (statId: string): 'offensive' | 'defensive' | 'utility' => {
  const statInfo = getStatInfo(statId);
  return statInfo?.category || 'utility';
};

// Create the pet system store
export const usePetSystemStore = create<
  PetSystemState & PetSystemActions,
  [["zustand/subscribeWithSelector", never]]
>(
  subscribeWithSelector((set, get) => ({
    // Initial state
    categories: [],
    selectedSlotId: null,
    isModalOpen: false,
    totalStats: {},

    // Actions
    setCategories: (categories: SystemCategory[]) => {
      set({ categories });
    },

    setSelectedSlotId: (slotId: string | null) => {
      set({ selectedSlotId: slotId });
    },

    setIsModalOpen: (isOpen: boolean) => {
      set({ isModalOpen: isOpen });
    },

    handleSlotClick: (slot: SystemSlot) => {
      // Batch state updates in a single set call
      set({ 
        selectedSlotId: slot.id,
        isModalOpen: true
      });
    },

    handleStatSelect: (slot: SystemSlot, stat: StatOption) => {
      const { categories } = get();
      const categoryIndex = categories.findIndex(cat => cat.id === slot.category);
      const slotIndex = categories[categoryIndex]?.slots.findIndex(s => s.id === slot.id);

      if (categoryIndex === -1 || slotIndex === -1) return;

      // Create a new categories array with only the modified category
      const updatedCategories = [...categories];
      const targetCategory = { ...updatedCategories[categoryIndex] };
      updatedCategories[categoryIndex] = targetCategory;
      
      // Create a new slots array with only the modified slot
      targetCategory.slots = [...targetCategory.slots];
      const targetSlot = { ...targetCategory.slots[slotIndex] };
      targetCategory.slots[slotIndex] = targetSlot;
      
      // Update the slot properties
      targetSlot.isOccupied = true;
      targetSlot.contributedStats = { [stat.id]: stat.value };
      targetSlot.assignedItem = {
        id: `${stat.id}-${Date.now()}`,
        name: stat.name,
        type: 'pet-stat',
        availableStats: [stat.id],
        currentStats: { [stat.id]: stat.value }
      };

      // 1. Update system state first
      set({ 
        categories: updatedCategories,
        isModalOpen: false,
        selectedSlotId: null
      });

      // 2. Calculate new total stats
      const totalStats = get().calculateTotalStats();
      
      // 3. Register with stat registry
      useStatRegistryStore.getState().registerSystemStats('pet', totalStats);
      
      // 4. Update local totalStats
      set({ totalStats });
    },

    handleStatRemove: (slot: SystemSlot) => {
      const { categories } = get();
      const categoryIndex = categories.findIndex(cat => cat.id === slot.category);
      const slotIndex = categories[categoryIndex]?.slots.findIndex(s => s.id === slot.id);

      if (categoryIndex === -1 || slotIndex === -1) return;

      // Create a new categories array with only the modified category
      const updatedCategories = [...categories];
      const targetCategory = { ...updatedCategories[categoryIndex] };
      updatedCategories[categoryIndex] = targetCategory;
      
      // Create a new slots array with only the modified slot
      targetCategory.slots = [...targetCategory.slots];
      const targetSlot = { ...targetCategory.slots[slotIndex] };
      targetCategory.slots[slotIndex] = targetSlot;
      
      // Clear the slot properties
      targetSlot.isOccupied = false;
      targetSlot.contributedStats = {};
      targetSlot.assignedItem = undefined;

      // 1. Update system state first
      set({ categories: updatedCategories });

      // 2. Calculate new total stats
      const totalStats = get().calculateTotalStats();
      
      // 3. Register with stat registry
      useStatRegistryStore.getState().registerSystemStats('pet', totalStats);
      
      // 4. Update local totalStats
      set({ totalStats });
    },

    // STANDARD METHOD: Calculate total stats using current state
    calculateTotalStats: (): Record<string, number> => {
      const { categories } = get();
      const totalStats: Record<string, number> = {};

      categories.forEach((category) => {
        category.slots.forEach((slot) => {
          if (slot.isOccupied && slot.contributedStats) {
            Object.entries(slot.contributedStats).forEach(([statId, value]) => {
              totalStats[statId] = (totalStats[statId] || 0) + value;
            });
          }
        });
      });
      
      return totalStats;
    },

    // BACKWARD COMPATIBILITY: Keep old method name
    calculateTotalPetStats: (): Record<string, number> => {
      return get().calculateTotalStats();
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
      const [categoryId] = slotId.split('-');
      const tierStats = petTierStats[categoryId as keyof typeof petTierStats];
      
      if (!tierStats) return [];

      return tierStats.map(stat => {
        const statInfo = getStatInfo(stat.id);
        return {
          id: stat.id,
          name: statInfo?.name || stat.id,
          value: stat.value,
          isPercentage: isPercentageStat(stat.id),
          category: getStatCategory(stat.id),
          maxLevel: 1, // Pet stats don't have levels
          trainingPointCosts: [] // Pet stats don't use training points
        };
      });
    },

    initializeCategories: () => {
      // 1. Set initial state
      const defaultCategories = getPetSystemDefaultState();
      set({ categories: defaultCategories });
      
      // 2. Calculate initial total stats (should be empty for default state)
      const totalStats = get().calculateTotalStats();
      
      // 3. Register with stat registry
      useStatRegistryStore.getState().registerSystemStats('pet', totalStats);
      
      // 4. Update local totalStats
      set({ totalStats });
    },

    resetSystem: () => {
      // Reset local state
      const defaultCategories = getPetSystemDefaultState();
      set({ 
        categories: defaultCategories,
        selectedSlotId: null,
        isModalOpen: false,
        totalStats: {}
      });
      
      // Clear this system's contribution from the registry
      useStatRegistryStore.getState().unregisterSystem('pet');
    },

    quickFillSystem: () => {
      // Get the meta build configuration
      const metaCategories = createMetaBuild();
      const currentCategories = get().categories;
      
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
        isModalOpen: false
      });
      
      // 2. Calculate new total stats
      const totalStats = get().calculateTotalStats();
      
      // 3. Register with stat registry
      useStatRegistryStore.getState().registerSystemStats('pet', totalStats);
      
      // 4. Update local totalStats
      set({ totalStats });
    },

    // loadFromUrl method removed as part of sharing cleanup
    // Will be replaced with universal build sharing approach
    
    // Method for universal build sharing - restores state and triggers stat registration
    restoreFromImport: (categories: SystemCategory[]) => {
      // 1. Set the categories first
      set({ categories });
      
      // 2. Calculate total stats
      const totalStats = get().calculateTotalStats();
      
      // 3. Register with stat registry
      useStatRegistryStore.getState().registerSystemStats('pet', totalStats);
      
      // 4. Update local totalStats
      set({ totalStats });
    },
  }))
);

// Export the default state function for build sharing
export const petSystemConfig = {
  systemId: 'pet',
  getDefaultState: () => ({ categories: getPetSystemDefaultState() })
};

// Export types via the types file