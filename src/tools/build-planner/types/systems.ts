/**
 * System Types
 * Shared interfaces for all game systems
 */

export interface SystemSlot {
  id: string;
  category: string;
  position: number;
  isOccupied: boolean;
  assignedItem?: SystemItem;
  contributedStats: Record<string, number>;
  slotType?: 'regular' | 'epic' | 'normal'; // Compatible with costume system
  selectedStat?: {
    id: string;
    name: string;
    value: number;
    level: number;
  };
}

export interface SystemItem {
  id: string;
  name: string;
  type: string;
  icon?: string;
  availableStats: string[];
  currentStats: Record<string, number>;
}

export interface SystemCategory {
  id: string;
  name: string;
  displayName: string;
  slots: SystemSlot[];
  maxSlots: number;
}

export interface SystemConfig {
  id: string;
  name: string;
  categories: SystemCategory[];
  totalSlots: number;
}

// Modal and UI Types
export interface StatOption {
  id: string;
  name: string;
  value: number;
  isPercentage: boolean;
  category: 'offensive' | 'defensive' | 'utility';
  maxLevel: number; // Individual max level for this stat (2-5, or potentially higher)
  trainingPointCosts: number[]; // Array of training point costs per level [level2, level3, level4, level5, ...]
  levelValues?: number[]; // Array of stat values per level [level1, level2, level3, level4, level5, ...]
  // Composite key support for duplicate stats
  originalStatId?: string; // Original stat ID for contribution (used when id is composite)
  variant?: string; // Variant identifier for duplicate stats
}

export interface SlotSelectionState {
  selectedSlotId: string | null;
  isModalOpen: boolean;
  availableStats: StatOption[];
}