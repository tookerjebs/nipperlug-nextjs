// Zustand store for Collection System
import { create } from 'zustand';
import type { CollectionStore, CollectionState } from '../types/collection';
import { getCollectionStatsAtProgress, COLLECTION_DATA } from '../data/collection-data';
import { useStatRegistryStore } from '@/tools/build-planner/stores/statRegistryStore';

const SYSTEM_ID = 'collection';

export const useCollectionStore = create<CollectionStore>()((set, get) => {
  // Helper function to update stats and registry - eliminates code duplication
  const updateStatsAndRegistry = () => {
    const totalStats = get().calculateTotalStats();
    useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
    set({ totalStats });
  };

  return {
    // Initial state
    activeCategory: 'world', // Start with world since it has data
    activeCollection: null,
    collectionProgress: {},
    totalStats: {},
    isInitialized: false,

    // Actions
      setActiveCategory: (categoryId: string) => {
        set({ 
          activeCategory: categoryId,
          // Reset active collection if it's not in the new category
          activeCollection: null
        });
      },

      setActiveCollection: (collectionId: string | null) => {
        set({ activeCollection: collectionId });
      },

      setCollectionProgress: (collectionId: string, progress: number) => {
        const { collectionProgress } = get();
        const newProgress = {
          ...collectionProgress,
          [collectionId]: progress
        };
        
        // Update system state first
        set({ collectionProgress: newProgress });
        
        // Update stats and registry
        updateStatsAndRegistry();
      },

      getCollectionProgress: (collectionId: string) => {
        const state = get();
        return state.collectionProgress[collectionId] || 0;
      },

      getCollectionStatsAtCurrentProgress: (collectionId: string) => {
        const state = get();
        const progress = state.collectionProgress[collectionId] || 0;
        return getCollectionStatsAtProgress(collectionId, progress);
      },

      getCollectionStatsAtProgress: (collectionId: string, progress: number) => {
        return getCollectionStatsAtProgress(collectionId, progress);
      },

      // Calculate total stats from all collections - STANDARD METHOD
      calculateTotalStats: (): Record<string, number> => {
        const { collectionProgress } = get();
        const totalStats: Record<string, number> = {};
        
        // Iterate through all collections and sum up their stats
        for (const categoryId in COLLECTION_DATA.categories) {
          const category = COLLECTION_DATA.categories[categoryId];
          for (const collectionId in category.collections) {
            const progress = collectionProgress[collectionId] || 0;
            if (progress > 0) {
              const stats = getCollectionStatsAtProgress(collectionId, progress);
              for (const statId in stats) {
                totalStats[statId] = (totalStats[statId] || 0) + stats[statId];
              }
            }
          }
        }
        
        return totalStats;
      },

      initialize: () => {
        // Update system state first
        set({ isInitialized: true });
        
        // Update stats and registry
        updateStatsAndRegistry();
      },

      quickFillAll: () => {
        const newProgress: Record<string, number> = {};
        
        // Set all collections to 100%
        for (const categoryId in COLLECTION_DATA.categories) {
          const category = COLLECTION_DATA.categories[categoryId];
          for (const collectionId in category.collections) {
            newProgress[collectionId] = 100;
          }
        }
        
        // Update system state first
        set({ collectionProgress: newProgress });
        
        // Update stats and registry
        updateStatsAndRegistry();
      },

      resetAllProgress: () => {
        // Unregister stats from the stat registry
        useStatRegistryStore.getState().unregisterSystem(SYSTEM_ID);
        
        set({ 
          collectionProgress: {},
          totalStats: {},
          activeCollection: null
        });
      },

      // Restore from import - for build sharing
      restoreFromImport: (data: { 
        collectionProgress: Record<string, number>;
        activeCategory?: string;
        activeCollection?: string | null;
      }) => {
        try {
          // Restore collection progress and UI state
          const newState: Partial<CollectionState> = {
            collectionProgress: data.collectionProgress || {},
          };

          // Restore UI state if provided
          if (data.activeCategory !== undefined) {
            newState.activeCategory = data.activeCategory;
          }
          if (data.activeCollection !== undefined) {
            newState.activeCollection = data.activeCollection;
          }

          // Update system state first
          set(newState);
          
          // Update stats and registry
          updateStatsAndRegistry();
        } catch (error) {
          console.error('Failed to restore collection system from import:', error);
          // Fallback to reset if import fails
          get().resetAllProgress();
        }
      }
    };
  }
);