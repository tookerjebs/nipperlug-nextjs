// Type definitions for the Force Wing System
import { SystemCategory, SystemSlot, StatOption } from '@/tools/build-planner/types/systems';

// Extended slot interface for Force Wing system
export interface ForceWingSlot extends SystemSlot {
  selectedStat?: {
    id: string;
    name: string;
    value: number;
    level: number;
  };
}

// State interface for the force wing system
export interface ForceWingSystemState {
  categories: SystemCategory[];
  selectedSlotId: string | null;
  isModalOpen: boolean;
  totalStats: Record<string, number>;
  forceWingLevel: number;
  forceWingBaseStats: Record<string, number>;
  totalTrainingPoints: number; // Total training points used
  availableTrainingPoints: number; // Total training points available based on Force Wing level
}

// Actions interface for the force wing system
export interface ForceWingSystemActions {
  setCategories: (categories: SystemCategory[]) => void;
  setSelectedSlotId: (slotId: string | null) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  handleSlotClick: (slot: SystemSlot) => void;
  handleStatSelect: (slotId: string, stat: StatOption) => void;
  handleStatRemove: (slot: SystemSlot) => void;
  levelUpStat: (slotId: string) => void;
  levelDownStat: (slotId: string) => void;
  canLevelUp: (slotId: string) => boolean;
  canLevelDown: (slotId: string) => boolean;
  calculateTotalStats: () => Record<string, number>;
  getSlotById: (slotId: string | null) => SystemSlot | null;
  getAvailableStats: (slotId: string) => StatOption[];
  initializeCategories: () => void;
  resetSystem: () => void;
  quickFillSystem: () => void;
  restoreFromImport: (data: { categories?: SystemCategory[]; forceWingLevel?: number }) => void;
  setForceWingLevel: (level: number) => void;
  calculateForceWingBaseStats: () => Record<string, number>;
  calculateTotalTrainingPoints: () => number;
  calculateAvailableTrainingPoints: () => number;
  getRemainingTrainingPoints: () => number;
  getStatMaxLevel: (statId: string, slotId?: string) => number;
  getTrainingPointCost: (statId: string, level: number, slotId?: string) => number;
  getStatValueAtLevel: (statId: string, level: number, slotId?: string) => number;
  getStatOptionByCompositeId: (compositeId: string, slotId: string) => StatOption | null;
}

// Re-export types from the system types if needed
export type { SystemCategory, SystemSlot, StatOption };