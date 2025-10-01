// Store for managing Costume System state and stats
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { useStatRegistryStore } from '../../../stores/statRegistryStore';
import { CostumeSlot, CostumeCategory, CostumeState, CostumeActions } from '../types/costumes';
import { getCostumeStats } from '../data/costumeData';
import { getStatInfo } from '../../../data/stats-config';

type CostumeStore = CostumeState & CostumeActions;

// Unique system identifier
const SYSTEM_ID = 'costumes';

export const useCostumeStore = create<CostumeStore>()(subscribeWithSelector((set, get) => ({
  // Initial state
  categories: [],
  selectedSlotId: null,
  isModalOpen: false,
  totalStats: {},

  // Actions
  // Handle slot click to open stat selection modal
  handleSlotClick: (categoryId: string, slotId: string) => {
    set({
      selectedSlotId: slotId,
      isModalOpen: true
    });
  },

  // Handle stat selection for a slot
  selectStat: (statOption: { name: string; value: number; isPercentage: boolean; id: string }) => {
    const { selectedSlotId, categories } = get();
    if (!selectedSlotId) return;

    // For epic craft options, extract the base stat ID for contributedStats
    // This ensures getStatInfo can find the stat for icon display
    const isEpicCraft = statOption.id.includes('_grade_');
    const baseStatId = isEpicCraft ? statOption.id.split('_grade_')[0] : statOption.id;

    const updatedCategories = categories.map(category => ({
      ...category,
      slots: category.slots.map(slot => {
        if (slot.id === selectedSlotId) {
          return {
            ...slot,
            selectedStat: statOption,
            isOccupied: true,
            contributedStats: { [baseStatId]: statOption.value }
          };
        }
        return slot;
      })
    }));

    set({
      categories: updatedCategories,
      isModalOpen: false,
      selectedSlotId: null
    });
    
    // Recalculate and register stats after selection
    get().calculateTotalStats();
  },

  // Alias for selectStat to match component expectations
  handleStatSelect: (statOption: { id: string; name: string; value: number; isPercentage: boolean }) => {
    get().selectStat(statOption);
  },

  // Remove stat from a slot
  removeStat: (categoryId: string, slotId: string) => {
    const { categories } = get();
    
    const updatedCategories = categories.map(category => {
      if (category.id === categoryId) {
        return {
          ...category,
          slots: category.slots.map(slot => {
            if (slot.id === slotId) {
              return {
                ...slot,
                selectedStat: undefined,
                isOccupied: false,
                contributedStats: {}
              };
            }
            return slot;
          })
        };
      }
      return category;
    });

    set({ categories: updatedCategories });
    
    // Recalculate and register stats after removal
    get().calculateTotalStats();
  },

  // Alias for removeStat to match component expectations
  handleStatRemove: (categoryId: string, slotId: string) => {
    get().removeStat(categoryId, slotId);
  },

  // Calculate total stats from all costume slots
  calculateTotalStats: () => {
    const state = get();
    const totalStats: Record<string, number> = {};
    
    state.categories.forEach(category => {
      category.slots.forEach(slot => {
        if (slot.contributedStats) {
          Object.entries(slot.contributedStats).forEach(([statId, value]) => {
            totalStats[statId] = (totalStats[statId] || 0) + value;
          });
        }
      });
    });
    
    // Register stats with the stat registry
    useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
    
    set({ totalStats });
    return totalStats;
  },

  initializeCategories: () => {
    const categories: CostumeCategory[] = [
      {
        id: 'suit',
        name: 'suit',
        displayName: 'Suit',
        costumeType: 'suit',
        slots: [
          // Regular slots
          ...Array.from({ length: 3 }, (_, i) => ({
            id: `suit-regular-${i + 1}`,
            category: 'suit',
            position: i + 1,
            isOccupied: false,
            contributedStats: {},
            costumeType: 'suit',
            slotIndex: i + 1,
            slotType: 'regular' as const
          })),
          // Epic slot
          {
            id: 'suit-epic-1',
            category: 'suit',
            position: 4,
            isOccupied: false,
            contributedStats: {},
            costumeType: 'suit',
            slotIndex: 1,
            slotType: 'epic' as const
          }
        ],
        maxSlots: 4
      },
      {
        id: 'vehicle',
        name: 'vehicle',
        displayName: 'Vehicle',
        costumeType: 'vehicle',
        slots: [
          // Regular slots
          ...Array.from({ length: 3 }, (_, i) => ({
            id: `vehicle-regular-${i + 1}`,
            category: 'vehicle',
            position: i + 1,
            isOccupied: false,
            contributedStats: {},
            costumeType: 'vehicle',
            slotIndex: i + 1,
            slotType: 'regular' as const
          })),
          // Epic slot
          {
            id: 'vehicle-epic-1',
            category: 'vehicle',
            position: 4,
            isOccupied: false,
            contributedStats: {},
            costumeType: 'vehicle',
            slotIndex: 1,
            slotType: 'epic' as const
          }
        ],
        maxSlots: 4
      },
      {
        id: 'force-wings',
        name: 'force-wings',
        displayName: 'Force Wings',
        costumeType: 'force-wings',
        slots: [
          // Regular slots
          ...Array.from({ length: 3 }, (_, i) => ({
            id: `force-wings-regular-${i + 1}`,
            category: 'force-wings',
            position: i + 1,
            isOccupied: false,
            contributedStats: {},
            costumeType: 'force-wings',
            slotIndex: i + 1,
            slotType: 'regular' as const
          })),
          // Epic slot
          {
            id: 'force-wings-epic-1',
            category: 'force-wings',
            position: 4,
            isOccupied: false,
            contributedStats: {},
            costumeType: 'force-wings',
            slotIndex: 1,
            slotType: 'epic' as const
          }
        ],
        maxSlots: 4
      }
    ];
    
    set({ categories });
  },

  // Reset all costume selections
  resetSystem: () => {
    // Unregister stats from the stat registry
    useStatRegistryStore.getState().unregisterSystem(SYSTEM_ID);
    
    get().initializeCategories();
    set({ totalStats: {} });
  },

  setIsModalOpen: (isOpen) => {
    set({ isModalOpen: isOpen });
  },

  setSelectedSlotId: (slotId) => {
    set({ selectedSlotId: slotId });
  },

  loadFromUrl: (params) => {
    const systemData = params.get(SYSTEM_ID);
    if (systemData) {
      try {
        const parsedData = JSON.parse(decodeURIComponent(systemData));
        set(parsedData);
        
        // Register stats after loading
        get().calculateTotalStats();
      } catch (error) {
        console.error(`Failed to load ${SYSTEM_ID} from URL:`, error);
      }
    }
  }
})));

// Export system configuration for build sharing
export const costumeSystemConfig = {
  systemId: SYSTEM_ID,
  getDefaultState: () => ({
    categories: [],
    selectedSlotId: null,
    isModalOpen: false,
    totalStats: {}
  })
};