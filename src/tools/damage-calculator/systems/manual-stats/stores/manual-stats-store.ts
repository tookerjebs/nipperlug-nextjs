import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { useStatRegistryStore } from '../../../stores/statRegistryStore';
import { ManualStatsStore } from '../types';

const SYSTEM_ID = 'manual-stats';

export const useManualStatsStore = create<ManualStatsStore>()(
  subscribeWithSelector((set, get) => ({
    // State
    stats: {},

    // Actions
    updateStat: (statId: string, value: number) => {
      set((state) => {
        const newStats = { ...state.stats };
        
        if (value === 0) {
          // Remove stat if value is 0
          delete newStats[statId];
        } else {
          newStats[statId] = value;
        }
        
        return { stats: newStats };
      });
      
      // Register with stat registry
      const currentStats = get().stats;
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, currentStats);
    },

    resetStat: (statId: string) => {
      set((state) => {
        const newStats = { ...state.stats };
        delete newStats[statId];
        return { stats: newStats };
      });
      
      // Update stat registry
      const currentStats = get().stats;
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, currentStats);
    },

    resetAllStats: () => {
      set({ stats: {} });
      
      // Unregister from stat registry
      useStatRegistryStore.getState().unregisterSystem(SYSTEM_ID);
    },

    getStats: () => {
      return get().stats;
    }
  }))
);

// Subscribe to store changes to persist data
if (typeof window !== 'undefined') {
  useManualStatsStore.subscribe(
    (state) => state.stats,
    (stats) => {
      try {
        localStorage.setItem('damage-calculator-manual-stats', JSON.stringify(stats));
      } catch (error) {
        console.warn('Failed to save manual stats to localStorage:', error);
      }
    }
  );

  // Load initial data from localStorage
  try {
    const savedData = localStorage.getItem('damage-calculator-manual-stats');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      
      if (parsedData && typeof parsedData === 'object') {
        useManualStatsStore.setState({ stats: parsedData });
        
        // Register with stat registry on load
        if (Object.keys(parsedData).length > 0) {
          useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, parsedData);
        }
      }
    }
  } catch (error) {
    console.warn('Failed to load manual stats from localStorage:', error);
  }
}