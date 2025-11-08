// Main exports for Gold Merit System
export { GoldMeritSystem } from './components/GoldMeritSystem';
export { GoldMeritCategoryTabs } from './components/GoldMeritCategoryTabs';
export { GoldMeritSlotGrid } from './components/GoldMeritSlotGrid';
export { GoldMeritSlot } from './components/GoldMeritSlot';

// Store exports
export { useGoldMeritStore } from './stores/goldMeritStore';

// Type exports
export type {
  GoldMeritSlot as GoldMeritSlotType,
  GoldMeritCategory,
  GoldMeritSlotState,
  GoldMeritState,
  GoldMeritActions,
  GoldMeritStore,
  GoldMeritSlotProps,
  GoldMeritSlotGridProps,
  GoldMeritCategoryTabsProps,
  GoldMeritSystemProps
} from './types/index';