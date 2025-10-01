import { StatOption } from '@/tools/build-planner/types/systems';

// Defines the structure of a buff or potion
export interface ConsumableItem {
  id: string;
  name: string;
  description: string;
  icon: string;
  stats: Record<string, number>;
  category: 'buff' | 'potion';
  group?: string; // Optional group for mutually exclusive buffs
}

// Represents an active buff or potion
export interface ActiveConsumable {
  id: string;
}

// State of the buffs & potions system
export interface BuffsPotionsState {
  buffs: ConsumableItem[];
  potions: ConsumableItem[];
  activeBuffs: ActiveConsumable[];
  activePotions: ActiveConsumable[];
  
  // Actions
  toggleBuff: (buffId: string) => void;
  togglePotion: (potionId: string) => void;
  isBuffActive: (buffId: string) => boolean;
  isPotionActive: (potionId: string) => boolean;
  calculateTotalStats: () => Record<string, number>;
  getAvailableStats: (itemId: string) => StatOption[];
  reset: () => void;
  
  // Potion helper functions
  canActivatePotion: (potionId: string) => { canActivate: boolean; reason?: string };
  getActivePotionCounts: () => { total: number; type1: number; type2: number };
  getPotionLimits: () => { maxTotal: number; maxType1: number; maxType2: number };
}