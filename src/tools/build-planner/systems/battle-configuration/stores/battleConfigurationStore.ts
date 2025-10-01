import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { BattleConfigurationState, BattleConfigurationActions } from '../types';
import { getAttackSkillById } from '../data/attackSkills';
import { getBattleModeById } from '../data/battleModes';
import { useStatRegistryStore } from '../../../stores/statRegistryStore';

type BattleConfigurationStore = BattleConfigurationState & BattleConfigurationActions;

const SYSTEM_ID = 'battleConfiguration';

export const useBattleConfigurationStore = create<BattleConfigurationStore>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    selectedAttackSkill: null,
    selectedBattleMode: null,

    // Selection management
    selectAttackSkill: (skillId: string | null) => {
      set({ selectedAttackSkill: skillId });
      get().registerStatsWithRegistry();
    },

    selectBattleMode: (modeId: string | null) => {
      set({ selectedBattleMode: modeId });
      get().registerStatsWithRegistry();
    },

    // Calculate total stats from selected configurations
    calculateTotalStats: (): Record<string, number> => {
      const { selectedAttackSkill, selectedBattleMode } = get();
      const totalStats: Record<string, number> = {};

      // Add battle mode stats if selected
      if (selectedBattleMode) {
        const battleMode = getBattleModeById(selectedBattleMode);
        if (battleMode) {
          Object.entries(battleMode.stats).forEach(([statId, value]) => {
            totalStats[statId] = (totalStats[statId] || 0) + value;
          });
        }
      }

      // Add attack skill stats if selected
      if (selectedAttackSkill) {
        const skill = getAttackSkillById(selectedAttackSkill);
        if (skill) {
          Object.entries(skill.stats).forEach(([statId, value]) => {
            totalStats[statId] = (totalStats[statId] || 0) + value;
          });
        }
      }

      return totalStats;
    },

    // Reset system
    resetSystem: () => {
      set({ selectedAttackSkill: null, selectedBattleMode: null });
      useStatRegistryStore.getState().unregisterSystem(SYSTEM_ID);
    },

    // Build sharing methods
    restoreFromImport: (data: Partial<BattleConfigurationState>) => {
      set({
        selectedAttackSkill: data.selectedAttackSkill || null,
        selectedBattleMode: data.selectedBattleMode || null
      });
      get().registerStatsWithRegistry();
    },

    // Helper method to register stats with StatRegistry
    registerStatsWithRegistry: () => {
      const totalStats = get().calculateTotalStats();
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
    }
  }))
);

// Subscribe to store changes and automatically register stats with the registry
useBattleConfigurationStore.subscribe(
  (state) => {
    // Calculate total stats whenever the store state changes
    const totalStats = state.calculateTotalStats();
    return totalStats;
  },
  (totalStats) => {
    // Register the calculated stats with the stat registry
    useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
  }
);