/**
 * Karma Rune System Zustand Store
 * Manages karma rune system state independently while contributing to global stats
 * 
 * DUPLICATION NOTICE:
 * This file contains similar logic to the essence rune store.
 * If making changes here, consider whether the same changes should be applied to:
 * src/tools/build-planner/systems/essence-rune/stores/essenceRuneStore.ts
 */

import { create } from 'zustand';
import { KarmaRune, karmaRunes } from '../data/karmaRuneData';
import { useStatRegistryStore } from '../../../stores/statRegistryStore';

// Equipped Karma Rune interface
export interface EquippedKarmaRune {
  id: string;
  name: string;
  level: number;
  statType: string;
}

// Karma Rune System State
interface KarmaRuneSystemState {
  equippedRunes: (EquippedKarmaRune | null)[];
  selectedSlot: number | null;
  isModalOpen: boolean;
  totalStats: Record<string, number>;
}

// Karma Rune System Actions
interface KarmaRuneSystemActions {
  setSelectedSlot: (slot: number | null) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  equipRune: (slotNumber: number, rune: KarmaRune) => void;
  removeRune: (slotNumber: number) => void;
  levelUpRune: (slotNumber: number) => void;
  calculateTotalStats: () => Record<string, number>;
  getUsedSlots: () => number;
  getTotalSlots: () => number;
  initializeSystem: () => void;
  resetSystem: () => void;
  quickFillSystem: () => void;
  loadFromUrl: (runeState: any) => void;
  restoreFromImport: (data: { equippedRunes: (EquippedKarmaRune | null)[] }) => void;
}

// Unique system identifier
const SYSTEM_ID = 'karmaRunes';

// Default state for the karma rune system
const getKarmaRuneSystemDefaultState = (): (EquippedKarmaRune | null)[] => {
  return Array(55).fill(null);
};

// Create the Zustand store
export const useKarmaRuneStore = create<
  KarmaRuneSystemState & KarmaRuneSystemActions
>()((set, get) => ({
    // Initial state
    equippedRunes: getKarmaRuneSystemDefaultState(),
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

    equipRune: (slotNumber: number, rune: KarmaRune) => {
      // 1. Update system state first
      const { equippedRunes } = get();
      const newEquippedRunes = [...equippedRunes];
      
      newEquippedRunes[slotNumber - 1] = {
        id: rune.id,
        name: rune.name,
        level: 1,
        statType: rune.statType
      };
      
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

    removeRune: (slotNumber: number) => {
      // 1. Update system state first
      const { equippedRunes } = get();
      const newEquippedRunes = [...equippedRunes];
      newEquippedRunes[slotNumber - 1] = null;
      
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

    levelUpRune: (slotNumber: number) => {
      const { equippedRunes } = get();
      const equippedRune = equippedRunes[slotNumber - 1];
      
      if (!equippedRune) return;
      
      const runeData = karmaRunes.find(r => r.id === equippedRune.id);
      if (!runeData || equippedRune.level >= runeData.maxLevel) return;
      
      // 1. Update system state first
      const newEquippedRunes = [...equippedRunes];
      newEquippedRunes[slotNumber - 1] = {
        ...equippedRune,
        level: equippedRune.level + 1
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
      
      equippedRunes.forEach(equippedRune => {
        if (!equippedRune) return;
        
        const runeData = karmaRunes.find(r => r.id === equippedRune.id);
        if (!runeData) return;
        
        // Get the stat value for the current level (level is 1-indexed, array is 0-indexed)
        const statValue = runeData.valuePerLevel[equippedRune.level - 1];
        if (statValue === undefined) return;
        
        // Add to total stats
        if (totalStats[runeData.statType]) {
          totalStats[runeData.statType] += statValue;
        } else {
          totalStats[runeData.statType] = statValue;
        }
      });
      
      return totalStats;
    },

    getUsedSlots: (): number => {
      const { equippedRunes } = get();
      return equippedRunes.filter(rune => rune !== null).length;
    },

    getTotalSlots: (): number => {
      return 55;
    },

    // Initialize system and register initial stats
    initializeSystem: () => {
      // Initialize system state
      const defaultRunes = getKarmaRuneSystemDefaultState();
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
      const defaultRunes = getKarmaRuneSystemDefaultState();
      set({
        equippedRunes: defaultRunes,
        selectedSlot: null,
        isModalOpen: false,
        totalStats: {}
      });
    },

    quickFillSystem: () => {
      // 1. Update system state first
      const newEquippedRunes: (EquippedKarmaRune | null)[] = Array(55).fill(null);
      
      // Fill slots with available runes, each at max level
      let slotIndex = 0;
      for (const rune of karmaRunes) {
        if (slotIndex >= 55) break;
        
        newEquippedRunes[slotIndex] = {
          id: rune.id,
          name: rune.name,
          level: rune.maxLevel,
          statType: rune.statType
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

    loadFromUrl: (params: URLSearchParams) => {
      const validatedRunes: (EquippedKarmaRune | null)[] = Array(55).fill(null);
      
      // Parse URL parameters for karma runes (kr_0, kr_1, etc.)
      for (let i = 0; i < 55; i++) {
        const paramKey = `kr_${i}`;
        const paramValue = params.get(paramKey);
        
        if (paramValue) {
          const [runeId, levelStr] = paramValue.split('_');
          const level = parseInt(levelStr, 10);
          
          const runeData = karmaRunes.find(r => r.id === runeId);
          if (runeData && level >= 1 && level <= runeData.maxLevel) {
            validatedRunes[i] = {
              id: runeId,
              name: runeData.name,
              level: level,
              statType: runeData.statType
            };
          }
        }
      }
      
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

    restoreFromImport: (data: { equippedRunes: (EquippedKarmaRune | null)[] }) => {
      if (!data || !Array.isArray(data.equippedRunes)) return;

      // Validate and restore the rune state
      const validatedRunes = data.equippedRunes.map((rune: any) => {
        if (!rune) return null;
        
        // Validate the rune exists in our data
        const runeData = karmaRunes.find(r => r.id === rune.id);
        if (!runeData) return null;

        // Validate level is within bounds
        const level = Math.max(1, Math.min(rune.level || 1, runeData.maxLevel));

        return {
          id: rune.id,
          name: rune.name || runeData.name,
          level,
          statType: rune.statType || runeData.statType
        };
      });

      // Ensure we have exactly 55 slots
      while (validatedRunes.length < 55) {
        validatedRunes.push(null);
      }
      validatedRunes.splice(55);

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
export const karmaRuneSystemConfig = {
  id: SYSTEM_ID,
  name: 'Karma Rune System',
  getState: () => {
    const state = useKarmaRuneStore.getState();
    return {
      equippedRunes: state.equippedRunes
    };
  },
  loadState: (state: any) => {
    useKarmaRuneStore.getState().loadFromUrl(state);
  }
};