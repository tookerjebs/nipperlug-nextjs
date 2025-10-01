import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { useStatRegistryStore } from '@/tools/build-planner/stores/statRegistryStore';
import { BuildStats } from '@/tools/build-planner/stores/buildPlannerStore';
import { ManualStatsStore } from '../types';

const SYSTEM_ID = 'manual-stats';

export const useManualStatsStore = create<ManualStatsStore>()(
  subscribeWithSelector((set, get) => ({
    // State
    stats: {},
    overrideMode: false,

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
    },

    setOverrideMode: (enabled: boolean) => {
      set({ overrideMode: enabled });
      
      // Trigger stat registry recalculation
      const currentStats = get().stats;
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, currentStats);
    },

    getOverrideMode: () => {
      return get().overrideMode;
    }
  }))
);

// Subscribe to store changes to persist data
if (typeof window !== 'undefined') {
  useManualStatsStore.subscribe(
    (state) => ({ stats: state.stats, overrideMode: state.overrideMode }),
    (data) => {
      try {
        localStorage.setItem('manual-stats', JSON.stringify(data));
      } catch (error) {
        console.warn('Failed to save manual stats to localStorage:', error);
      }
    }
  );

  // Load initial data from localStorage
  try {
    const savedData = localStorage.getItem('manual-stats');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      
      // Handle both old format (just stats) and new format (stats + overrideMode)
      if (parsedData && typeof parsedData === 'object') {
        if (parsedData.stats !== undefined) {
          // New format with overrideMode
          useManualStatsStore.setState({ 
            stats: parsedData.stats || {}, 
            overrideMode: parsedData.overrideMode || false 
          });
          
          // Register with stat registry on load
          if (Object.keys(parsedData.stats || {}).length > 0) {
            useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, parsedData.stats);
          }
        } else {
          // Old format (just stats object)
          useManualStatsStore.setState({ stats: parsedData, overrideMode: false });
          
          // Register with stat registry on load
          if (Object.keys(parsedData).length > 0) {
            useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, parsedData);
          }
        }
      }
    }
  } catch (error) {
    console.warn('Failed to load manual stats from localStorage:', error);
  }
}