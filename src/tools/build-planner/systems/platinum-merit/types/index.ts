// Type definitions for Platinum Merit System

export interface PlatinumMeritSlot {
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
  values: number[]; // Stat values per level (only one stat type for platinum)
  statType: string; // The stat this slot affects
  prerequisites?: string[]; // Other slot IDs that must be learned first
  isExpansion?: boolean; // Whether this is an expansion slot
  expandsSlot?: string; // ID of the slot this expansion affects
}

export interface PlatinumMeritArrow {
  id: string;
  type: 'arrow';
  direction: 'up' | 'down' | 'left' | 'right' | 'up-right' | 'up-left' | 'down-right' | 'down-left';
  gridPosition: {
    row: number;
    col: number;
  };
}

export type PlatinumMeritGridElement = PlatinumMeritSlot | PlatinumMeritArrow;

export interface PlatinumMeritCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  slots: PlatinumMeritSlot[];
  gridElements?: PlatinumMeritGridElement[]; // Optional for backward compatibility
  gridSize: {
    rows: number;
    cols: number;
  };
}

export interface PlatinumMeritSlotState {
  slotId: string;
  currentLevel: number;
  isUnlocked: boolean;
  contributedStats: Record<string, number>;
}

export interface PlatinumMeritState {
  categories: PlatinumMeritCategory[];
  slotStates: Record<string, PlatinumMeritSlotState>;
  totalPointsSpent: number;
  maxPointsAllowed: number; // New: maximum points that can be spent
  selectedCategory: string;
}

export interface PlatinumMeritActions {
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
  getSlotById: (slotId: string) => PlatinumMeritSlot | undefined;
  getCategoryById: (categoryId: string) => PlatinumMeritCategory | undefined;
  getSlotState: (slotId: string) => PlatinumMeritSlotState | undefined;
  canUpgradeSlot: (slotId: string) => boolean;
  canDowngradeSlot: (slotId: string) => boolean;
  calculateTotalStats: () => Record<string, number>;
  isSlotPrerequisiteMet: (slotId: string) => boolean;
  updateSlotUnlockStates: (slotStates: Record<string, PlatinumMeritSlotState>) => Record<string, PlatinumMeritSlotState>;
  hasPointsAvailable: (pointsNeeded: number) => boolean; // New: check if points are available
  
  // Import/Export functionality
  restoreFromImport: (importData: {
    slotStates: Record<string, PlatinumMeritSlotState>;
    totalPointsSpent: number;
    selectedCategory: string;
  }) => void;
  validateAndRestoreSlotStates: (importedSlotStates: Record<string, PlatinumMeritSlotState>) => Record<string, PlatinumMeritSlotState>;
}

export type PlatinumMeritStore = PlatinumMeritState & PlatinumMeritActions;

// UI Component Props
export interface PlatinumMeritSlotProps {
  slot: PlatinumMeritSlot;
}

export interface PlatinumMeritSlotGridProps {
  category: PlatinumMeritCategory;
}

export interface PlatinumMeritCategoryTabsProps {
  categories: PlatinumMeritCategory[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export interface PlatinumMeritSystemProps {
  className?: string;
}