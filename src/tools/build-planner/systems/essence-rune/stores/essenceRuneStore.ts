/**
 * Essence Rune System Zustand Store
 * Manages essence rune system state independently while contributing to global stats
 * 
 * DUPLICATION NOTICE:
 * This file contains similar logic to the karma rune store.
 * If making changes here, consider whether the same changes should be applied to:
 * src/tools/build-planner/systems/karma-rune/stores/karmaRuneStore.ts
 */

import { create } from 'zustand';
import { EssenceRune, essenceRunes } from '../data/essenceRuneData';
import { useStatRegistryStore } from '../../../stores/statRegistryStore';

// Equipped Essence Rune interface
interface EquippedEssenceRune {
  id: string;
  name: string;
  level: number;
  baseStatType: string;
}

// Essence Rune System State
interface EssenceRuneSystemState {
  equippedRunes: (EquippedEssenceRune | null)[];
  selectedSlot: number | null;
  isModalOpen: boolean;
  totalStats: Record<string, number>;
}

// Essence Rune System Actions
interface EssenceRuneSystemActions {
  setSelectedSlot: (slot: number | null) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  equipRune: (slotNumber: number, rune: EssenceRune) => void;
  removeRune: (slotNumber: number) => void;
  levelUpRune: (slotNumber: number) => void;
  calculateTotalStats: () => Record<string, number>;
  getUsedSlots: () => number;
  getTotalSlots: () => number;
  initializeSystem: () => void;
  resetSystem: () => void;
  quickFillSystem: () => void;
  loadFromUrl: (runeState: any) => void;
  restoreFromImport: (data: { equippedRunes: (EquippedEssenceRune | null)[] }) => void;
}

// Unique system identifier
const SYSTEM_ID = 'essenceRune';

// Default state for the essence rune system
const getEssenceRuneSystemDefaultState = (): (EquippedEssenceRune | null)[] => {
  return Array(62).fill(null);
};

// Create the Zustand store
export const useEssenceRuneStore = create<
  EssenceRuneSystemState & EssenceRuneSystemActions
>()((set, get) => ({
    // Initial state
    equippedRunes: getEssenceRuneSystemDefaultState(),
    selectedSlot: null,
    isModalOpen: false,
    totalStats: {},

    // Actions
    setSelectedSlot: (slot: number | null) => {
      set({ selectedSlot: slot });
    },

    setIsModalOpen: (isOpen: boolean) => {
      set({ isModalOpen: isOpen });
    },

    equipRune: (slotNumber: number, rune: EssenceRune) => {
      // 1. Update system state first
      const { equippedRunes } = get();
      const newEquippedRunes = [...equippedRunes];
      
      newEquippedRunes[slotNumber - 1] = {
        id: rune.id,
        name: rune.name,
        level: 1, // Start at level 1
        baseStatType: rune.baseStatType
      };

      set({ 
        equippedRunes: newEquippedRunes,
        isModalOpen: false,
        selectedSlot: null
      });

      // 2. Calculate new total stats
      const totalStats = get().calculateTotalStats();
      
      // 3. Register with stat registry
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
      
      // 4. Update local totalStats
      set({ totalStats });
    },

    removeRune: (slotNumber: number) => {
      // 1. Update system state first
      const { equippedRunes } = get();
      const newEquippedRunes = [...equippedRunes];
      newEquippedRunes[slotNumber - 1] = null;

      set({ 
        equippedRunes: newEquippedRunes,
        isModalOpen: false,
        selectedSlot: null
      });

      // 2. Calculate new total stats
      const totalStats = get().calculateTotalStats();
      
      // 3. Register with stat registry
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
      
      // 4. Update local totalStats
      set({ totalStats });
    },

    levelUpRune: (slotNumber: number) => {
      const { equippedRunes } = get();
      const currentRune = equippedRunes[slotNumber - 1];
      if (!currentRune) return;

      // Find the rune data to check max level
      const runeData = essenceRunes.find(r => r.id === currentRune.id);
      if (!runeData) return;

      // Check if we can level up
      if (currentRune.level >= runeData.maxLevel) return;

      // 1. Update system state first
      const newEquippedRunes = [...equippedRunes];
      newEquippedRunes[slotNumber - 1] = {
        ...currentRune,
        level: currentRune.level + 1
      };

      set({ equippedRunes: newEquippedRunes });

      // 2. Calculate new total stats
      const totalStats = get().calculateTotalStats();
      
      // 3. Register with stat registry
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
      
      // 4. Update local totalStats
      set({ totalStats });
    },

    calculateTotalStats: (): Record<string, number> => {
      const { equippedRunes } = get();
      const totalStats: Record<string, number> = {};

      // Create a lookup map for rune data to avoid repeated array searches
      const runeDataMap = new Map(essenceRunes.map(rune => [rune.id, rune]));

      equippedRunes.forEach(equippedRune => {
        if (!equippedRune) return;

        // Use map lookup instead of array.find for better performance
        const runeData = runeDataMap.get(equippedRune.id);
        if (!runeData) return;

        // Get the stat value for the current level (level is 1-indexed, array is 0-indexed)
        const statValue = runeData.valuePerLevel[equippedRune.level - 1];
        if (statValue === undefined) return;

        // Add to total stats
        const statType = runeData.baseStatType;
        totalStats[statType] = (totalStats[statType] || 0) + statValue;
      });

      return totalStats;
    },

    getUsedSlots: (): number => {
      const { equippedRunes } = get();
      return equippedRunes.filter(rune => rune !== null).length;
    },

    getTotalSlots: (): number => {
      return 62;
    },

    // Initialize system and register initial stats
    initializeSystem: () => {
      // Initialize system state
      const defaultRunes = getEssenceRuneSystemDefaultState();
      set({ 
        equippedRunes: defaultRunes,
        selectedSlot: null,
        isModalOpen: false,
        totalStats: {}
      });

      // Calculate and register initial stats
      const totalStats = get().calculateTotalStats();
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
      set({ totalStats });
    },

    resetSystem: () => {
      // Unregister from stat registry FIRST
      useStatRegistryStore.getState().unregisterSystem(SYSTEM_ID);
      
      // Then reset state
      const defaultRunes = getEssenceRuneSystemDefaultState();
      set({ 
        equippedRunes: defaultRunes,
        selectedSlot: null,
        isModalOpen: false,
        totalStats: {}
      });
    },

    quickFillSystem: () => {
      // 1. Update system state first
      const newEquippedRunes: (EquippedEssenceRune | null)[] = Array(62).fill(null);
      
      // Fill slots with available runes, each at max level
      let slotIndex = 0;
      for (const rune of essenceRunes) {
        if (slotIndex >= 62) break;
        
        newEquippedRunes[slotIndex] = {
          id: rune.id,
          name: rune.name,
          level: rune.maxLevel, // Set to max level
          baseStatType: rune.baseStatType
        };
        slotIndex++;
      }

      set({ 
        equippedRunes: newEquippedRunes,
        selectedSlot: null,
        isModalOpen: false
      });

      // 2. Calculate new total stats
      const totalStats = get().calculateTotalStats();
      
      // 3. Register with stat registry
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
      
      // 4. Update local totalStats
      set({ totalStats });
    },

    loadFromUrl: (runeState: any) => {
      if (!runeState || !Array.isArray(runeState.equippedRunes)) return;

      // Validate and load the rune state
      const validatedRunes = runeState.equippedRunes.map((rune: any) => {
        if (!rune) return null;
        
        // Validate the rune exists in our data
        const runeData = essenceRunes.find(r => r.id === rune.id);
        if (!runeData) return null;

        // Validate level is within bounds
        const level = Math.max(1, Math.min(rune.level || 1, runeData.maxLevel));

        return {
          id: rune.id,
          name: rune.name || runeData.name,
          level,
          baseStatType: rune.baseStatType || runeData.baseStatType
        };
      });

      // Ensure we have exactly 62 slots
      while (validatedRunes.length < 62) {
        validatedRunes.push(null);
      }
      validatedRunes.splice(62);

      set({ 
        equippedRunes: validatedRunes,
        selectedSlot: null,
        isModalOpen: false
      });

      // 2. Calculate new total stats
      const totalStats = get().calculateTotalStats();
      
      // 3. Register with stat registry
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
      
      // 4. Update local totalStats
      set({ totalStats });
    },

    restoreFromImport: (data: { equippedRunes: (EquippedEssenceRune | null)[] }) => {
      if (!data || !Array.isArray(data.equippedRunes)) return;

      // Validate and restore the rune state
      const validatedRunes = data.equippedRunes.map((rune: any) => {
        if (!rune) return null;
        
        // Validate the rune exists in our data
        const runeData = essenceRunes.find(r => r.id === rune.id);
        if (!runeData) return null;

        // Validate level is within bounds
        const level = Math.max(1, Math.min(rune.level || 1, runeData.maxLevel));

        return {
          id: rune.id,
          name: rune.name || runeData.name,
          level,
          baseStatType: rune.baseStatType || runeData.baseStatType
        };
      });

      // Ensure we have exactly 62 slots
      while (validatedRunes.length < 62) {
        validatedRunes.push(null);
      }
      validatedRunes.splice(62);

      set({ 
        equippedRunes: validatedRunes,
        selectedSlot: null,
        isModalOpen: false
      });

      // 2. Calculate new total stats
      const totalStats = get().calculateTotalStats();
      
      // 3. Register with stat registry
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
      
      // 4. Update local totalStats
      set({ totalStats });
    }
  }));

// System configuration for build sharing
export const essenceRuneSystemConfig = {
  id: SYSTEM_ID,
  name: 'Essence Rune System',
  getState: () => {
    const state = useEssenceRuneStore.getState();
    return {
      equippedRunes: state.equippedRunes
    };
  },
  loadState: (state: any) => {
    useEssenceRuneStore.getState().loadFromUrl(state);
  }
};