// Types for the Manual Stats system

import { BuildStats } from '../../../stores/buildPlannerStore';

export interface ManualStatsState {
  stats: BuildStats;
}

export interface ManualStatsActions {
  updateStat: (statId: string, value: number) => void;
  resetStat: (statId: string) => void;
  resetAllStats: () => void;
  getStats: () => BuildStats;
}

export type ManualStatsStore = ManualStatsState & ManualStatsActions;