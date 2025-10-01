// Type definitions for the Costume System
import { SystemSlot, SystemCategory, StatOption } from '../../../types/systems';

export interface CostumeSlot extends Omit<SystemSlot, 'selectedStat'> {
  costumeType?: string;
  slotIndex?: number;
  slotType: 'regular' | 'epic';
  selectedStat?: {
    id: string;
    name: string;
    value: number;
    isPercentage: boolean;
  };
}

export interface CostumeCategory extends Omit<SystemCategory, 'slots'> {
  slots: CostumeSlot[];
  costumeType: 'suit' | 'vehicle' | 'force-wings';
}

export interface CostumeState {
  categories: CostumeCategory[];
  selectedSlotId: string | null;
  isModalOpen: boolean;
  totalStats: Record<string, number>;
}

export interface CostumeActions {
  handleSlotClick: (categoryId: string, slotId: string) => void;
  selectStat: (statOption: { id: string; name: string; value: number; isPercentage: boolean }) => void;
  handleStatSelect: (statOption: { id: string; name: string; value: number; isPercentage: boolean }) => void;
  removeStat: (categoryId: string, slotId: string) => void;
  handleStatRemove: (categoryId: string, slotId: string) => void;
  calculateTotalStats: () => Record<string, number>;
  initializeCategories: () => void;
  resetSystem: () => void;
  loadFromUrl: (params: URLSearchParams) => void;
  setIsModalOpen: (isOpen: boolean) => void;
  setSelectedSlotId: (slotId: string | null) => void;
}