// Types for the Manual Stats system

import { BuildStats } from '@/tools/build-planner/stores/buildPlannerStore';

export interface ManualStatsState {
  stats: BuildStats;
  overrideMode: boolean;
}

export interface ManualStatsActions {
  updateStat: (statId: string, value: number) => void;
  resetStat: (statId: string) => void;
  resetAllStats: () => void;
  getStats: () => BuildStats;
  setOverrideMode: (enabled: boolean) => void;
  getOverrideMode: () => boolean;
}

export type ManualStatsStore = ManualStatsState & ManualStatsActions;