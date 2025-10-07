import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { CollectionProgress } from '../types';

interface CollectionTrackerState {
  // UI State
  activeTab: string;
  activePage: number;
  activeCollection: string | null;
  isInitialized: boolean;
  
  // Progress tracking
  collectionProgress: CollectionProgress;
  
  // Actions
  setActiveTab: (tab: string) => void;
  setActivePage: (page: number) => void;
  setActiveCollection: (collectionId: string | null) => void;
  setInitialized: (initialized: boolean) => void;
  toggleItemCompletion: (collectionId: string, missionName: string, itemName: string, itemCount: number) => void;
  completeAllItemsInCollection: (collectionId: string, collectionData: any) => void;
  calculateCollectionProgress: (collectionId: string, collectionData: any) => number;
  getCollectionProgress: (collectionId: string, collectionData: any) => number;
  getActualCollectionProgress: (collectionId: string, collectionData: any) => number;
  isItemCompleted: (collectionId: string, missionName: string, itemName: string, itemCount: number) => boolean;
  isMissionCompleted: (collectionId: string, missionName: string, missionData: any) => boolean;
  resetAllProgress: () => void;
}

export const useCollectionTrackerStore = create<CollectionTrackerState>()(subscribeWithSelector((set, get) => ({
      // Initial state
      activeTab: 'Dungeon',
      activePage: 1,
      activeCollection: null,
      isInitialized: false,
      collectionProgress: {},

      // Actions
      setActiveTab: (tab: string) => {
        set({ activeTab: tab });
      },

      setActivePage: (page: number) => {
        set({ activePage: page });
      },

      setActiveCollection: (collectionId: string | null) => {
        set({ activeCollection: collectionId });
      },

      setInitialized: (initialized: boolean) => {
        set({ isInitialized: initialized });
      },

      toggleItemCompletion: (collectionId: string, missionName: string, itemName: string, itemCount: number) => {
        const { collectionProgress } = get();
        const current = collectionProgress[collectionId] || { completedItems: [] };
        const completedItems = current.completedItems || [];
        const itemId = `${missionName}|||${itemName}|||${itemCount}`;
        const isCompleted = completedItems.includes(itemId);
        
        const newCompletedItems = isCompleted
          ? completedItems.filter(id => id !== itemId)
          : [...completedItems, itemId];

        set({
          collectionProgress: {
            ...collectionProgress,
            [collectionId]: {
              completedItems: newCompletedItems,
            }
          }
        });
      },

      completeAllItemsInCollection: (collectionId: string, collectionData: any) => {
        if (!collectionData || !collectionData.missions) return;
        
        const { collectionProgress } = get();
        const allItemIds: string[] = [];
        
        // Generate all item IDs for this collection
        Object.values(collectionData.missions).forEach((mission: any) => {
          mission.items.forEach((item: any) => {
            const itemId = `${mission.name}|||${item.name}|||${item.count}`;
            allItemIds.push(itemId);
          });
        });

        set({
          collectionProgress: {
            ...collectionProgress,
            [collectionId]: {
              completedItems: allItemIds,
            }
          }
        });
      },

      calculateCollectionProgress: (collectionId: string, collectionData: any) => {
        const { collectionProgress } = get();
        const current = collectionProgress[collectionId];
        if (!current || !collectionData || !current.completedItems) return 0;

        // Count total items across all missions
        let totalItems = 0;
        Object.values(collectionData.missions).forEach((mission: any) => {
          totalItems += mission.items.length;
        });

        const completedCount = current.completedItems.length;
        const percentage = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;
        
        // Return the appropriate milestone (0, 30, 60, 100)
        if (percentage >= 100) return 100;
        if (percentage >= 60) return 60;
        if (percentage >= 30) return 30;
        return 0;
      },

      getCollectionProgress: (collectionId: string, collectionData: any) => {
        return get().calculateCollectionProgress(collectionId, collectionData);
      },

      getActualCollectionProgress: (collectionId: string, collectionData: any) => {
        const { collectionProgress } = get();
        const current = collectionProgress[collectionId];
        if (!current || !collectionData || !current.completedItems) return 0;

        // Count total items across all missions
        let totalItems = 0;
        Object.values(collectionData.missions).forEach((mission: any) => {
          totalItems += mission.items.length;
        });

        const completedCount = current.completedItems.length;
        return totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;
      },

      isItemCompleted: (collectionId: string, missionName: string, itemName: string, itemCount: number) => {
        const { collectionProgress } = get();
        const itemId = `${missionName}|||${itemName}|||${itemCount}`;
        return collectionProgress[collectionId]?.completedItems?.includes(itemId) || false;
      },

      isMissionCompleted: (collectionId: string, missionName: string, missionData: any) => {
        if (!missionData) return false;
        
        // Check if all items in the mission are completed
        return missionData.items.every((item: any) => 
          get().isItemCompleted(collectionId, missionName, item.name, item.count)
        );
      },

      resetAllProgress: () => {
        set({ collectionProgress: {} });
      },
    })));

// Manual localStorage handling (like build planner approach)
if (typeof window !== 'undefined') {
  // Subscribe to store changes to persist data
  useCollectionTrackerStore.subscribe(
    (state) => ({ 
      collectionProgress: state.collectionProgress,
      activeTab: state.activeTab,
      activePage: state.activePage,
    }),
    (data) => {
      try {
        localStorage.setItem('collection-tracker-storage', JSON.stringify(data));
      } catch (error) {
        console.warn('Failed to save collection tracker data to localStorage:', error);
      }
    }
  );

  // Load initial data from localStorage
  try {
    const savedData = localStorage.getItem('collection-tracker-storage');
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      
      if (parsedData && typeof parsedData === 'object') {
        // Migrate old item IDs from :: to ||| separator
        let collectionProgress = parsedData.collectionProgress || {};
        if (collectionProgress && typeof collectionProgress === 'object') {
          const migratedProgress: CollectionProgress = {};
          Object.entries(collectionProgress).forEach(([collectionId, data]: [string, any]) => {
            if (data && data.completedItems && Array.isArray(data.completedItems)) {
              migratedProgress[collectionId] = {
                completedItems: data.completedItems.map((itemId: string) => 
                  itemId.replace(/::/g, '|||')
                )
              };
            }
          });
          collectionProgress = migratedProgress;
        }
        
        useCollectionTrackerStore.setState({
          collectionProgress,
          activeTab: parsedData.activeTab || 'Dungeon',
          activePage: parsedData.activePage || 1,
          isInitialized: true,
        });
      } else {
        useCollectionTrackerStore.setState({ isInitialized: true });
      }
    } else {
      useCollectionTrackerStore.setState({ isInitialized: true });
    }
  } catch (error) {
    console.warn('Failed to load collection tracker data from localStorage:', error);
    useCollectionTrackerStore.setState({ isInitialized: true });
  }
}