// Main exports for Platinum Merit System
export { PlatinumMeritSystem } from './components/PlatinumMeritSystem';
export { PlatinumMeritCategoryTabs } from './components/PlatinumMeritCategoryTabs';
export { PlatinumMeritSlotGrid } from './components/PlatinumMeritSlotGrid';
export { PlatinumMeritSlot } from './components/PlatinumMeritSlot';

// Store exports
export { usePlatinumMeritStore } from './stores/platinumMeritStore';

// Data exports
export { loadPlatinumMeritData, MAX_PLATINUM_MERIT_POINTS, MAX_PLATINUM_MERIT_SCORE } from './data/platinum-merit-loader';

// Type exports
export type {
  PlatinumMeritSlot as PlatinumMeritSlotType,
  PlatinumMeritCategory,
  PlatinumMeritSlotState,
  PlatinumMeritState,
  PlatinumMeritActions,
  PlatinumMeritStore,
  PlatinumMeritSlotProps,
  PlatinumMeritSlotGridProps,
  PlatinumMeritCategoryTabsProps,
  PlatinumMeritSystemProps
} from './types/index';