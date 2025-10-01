// Type definitions for the Pet System
import { SystemCategory, SystemSlot, StatOption } from '@/tools/build-planner/types/systems';

// Basic pet stat definition
export interface PetStat {
  id: string;
  value: number;
}

// Pet tier stats structure
export interface PetTierStats {
  normal: PetStat[];
  covenant: PetStat[];
  trust: PetStat[];
  transcendence: PetStat[];
}

// State interface for the pet system
export interface PetSystemState {
  categories: SystemCategory[];
  selectedSlotId: string | null;
  isModalOpen: boolean;
  totalStats: Record<string, number>;
}

// Actions interface for the pet system
export interface PetSystemActions {
  setCategories: (categories: SystemCategory[]) => void;
  setSelectedSlotId: (slotId: string | null) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  handleSlotClick: (slot: SystemSlot) => void;
  handleStatSelect: (slot: SystemSlot, stat: StatOption) => void;
  handleStatRemove: (slot: SystemSlot) => void;
  calculateTotalStats: () => Record<string, number>;
  calculateTotalPetStats: () => Record<string, number>; // Backward compatibility
  getSlotById: (slotId: string | null) => SystemSlot | null;
  getAvailableStats: (slotId: string) => StatOption[];
  initializeCategories: () => void;
  resetSystem: () => void;
  quickFillSystem: () => void;
  // loadFromUrl method removed as part of sharing cleanup
  restoreFromImport: (categories: SystemCategory[]) => void;
}

// Meta build definition
export interface PetMetaBuild {
  name: string;
  description: string;
  categories: SystemCategory[];
}

// Re-export types from the system types if needed
export type { SystemCategory, SystemSlot, StatOption };