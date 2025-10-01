// Type definitions for Gold Merit System

export interface GoldMeritSlot {
  id: string;
  name: string;
  description: string;
  icon: string;
  maxLevel: number;
  gridPosition: {
    row: number;
    col: number;
  };
  pointsRequired: number; // Merit points required to unlock
  values: number[]; // Base stat values per level
  bonusValues?: number[]; // Bonus stat values per level (optional)
  statType: string; // The stat this slot affects
  prerequisites?: string[]; // Other slot IDs that must be learned first
  isExpansion?: boolean; // Whether this is an expansion slot
  expandsSlot?: string; // ID of the slot this expansion affects
}

export interface GoldMeritArrow {
  id: string;
  type: 'arrow';
  direction: 'up' | 'down' | 'left' | 'right' | 'up-right' | 'up-left' | 'down-right' | 'down-left';
  gridPosition: {
    row: number;
    col: number;
  };
}

export type GoldMeritGridElement = GoldMeritSlot | GoldMeritArrow;

export interface GoldMeritCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  slots: GoldMeritSlot[];
  gridElements?: GoldMeritGridElement[]; // Optional for backward compatibility
  gridSize: {
    rows: number;
    cols: number;
  };
}

export interface GoldMeritSlotState {
  slotId: string;
  currentLevel: number;
  isUnlocked: boolean;
  contributedStats: Record<string, number>;
}

export interface GoldMeritState {
  categories: GoldMeritCategory[];
  slotStates: Record<string, GoldMeritSlotState>;
  totalPointsSpent: number;
  selectedCategory: string;
}

export interface GoldMeritActions {
  // Category management
  setSelectedCategory: (categoryId: string) => void;
  
  // Slot management
  upgradeSlot: (slotId: string) => void;
  downgradeSlot: (slotId: string) => void;
  resetSlot: (slotId: string) => void;
  resetCategory: (categoryId: string) => void;
  resetAll: () => void;
  quickFillSystem: () => void;
  
  // Utility functions
  getSlotById: (slotId: string) => GoldMeritSlot | undefined;
  getCategoryById: (categoryId: string) => GoldMeritCategory | undefined;
  getSlotState: (slotId: string) => GoldMeritSlotState | undefined;
  canUpgradeSlot: (slotId: string) => boolean;
  canDowngradeSlot: (slotId: string) => boolean;
  calculateTotalStats: () => Record<string, number>;
  isSlotPrerequisiteMet: (slotId: string) => boolean;
  updateSlotUnlockStates: (slotStates: Record<string, GoldMeritSlotState>) => Record<string, GoldMeritSlotState>;
  
  // Import/Export functionality
  restoreFromImport: (importData: {
    slotStates: Record<string, GoldMeritSlotState>;
    totalPointsSpent: number;
    selectedCategory: string;
  }) => void;
  validateAndRestoreSlotStates: (importedSlotStates: Record<string, GoldMeritSlotState>) => Record<string, GoldMeritSlotState>;
}

export type GoldMeritStore = GoldMeritState & GoldMeritActions;

// UI Component Props
export interface GoldMeritSlotProps {
  slot: GoldMeritSlot;
}

export interface GoldMeritSlotGridProps {
  category: GoldMeritCategory;
}

export interface GoldMeritCategoryTabsProps {
  categories: GoldMeritCategory[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export interface GoldMeritSystemProps {
  className?: string;
}