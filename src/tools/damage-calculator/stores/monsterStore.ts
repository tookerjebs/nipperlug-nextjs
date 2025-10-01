/**
 * Monster Store
 * Manages the selected monster for damage calculations
 */

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { MonsterStats } from '../../../lib/game-data/monsters/types';
import { useBuildPlannerStore } from './buildPlannerStore';

interface MonsterState {
  selectedMonster: MonsterStats | null;
  isMonsterModalOpen: boolean;
}

interface MonsterActions {
  setSelectedMonster: (monster: MonsterStats) => void;
  clearSelectedMonster: () => void;
  openMonsterModal: () => void;
  closeMonsterModal: () => void;
  toggleMonsterModal: () => void;
}

export const useMonsterStore = create<MonsterState & MonsterActions>()(
  subscribeWithSelector((set, get) => ({
    // Initial state - no monster selected
    selectedMonster: null,
    isMonsterModalOpen: false,

    // Actions
    setSelectedMonster: (monster: MonsterStats) => {
      set({ selectedMonster: monster });
      
      // Update the build planner's enemy config with the new monster stats
      const buildPlannerStore = useBuildPlannerStore.getState();
      buildPlannerStore.setEnemyConfig({
        level: monster.level,
        defense: monster.defense,
        damageReduction: monster.damageReduction,
        damageReductionPercent: 0, // Not in our data structure
        finalDamageDecrease: 0, // Not in our data structure
        ignorePenetration: monster.ignorePenetration,
        resistCriticalDamage: monster.resistCritDamage,
      });
    },

    clearSelectedMonster: () => {
      set({ selectedMonster: null });
      
      // Reset enemy config to default values when no monster is selected
      const buildPlannerStore = useBuildPlannerStore.getState();
      buildPlannerStore.setEnemyConfig({
        level: 200,
        defense: 0,
        damageReduction: 0,
        damageReductionPercent: 0,
        finalDamageDecrease: 0,
        ignorePenetration: 0,
        resistCriticalDamage: 0,
      });
    },

    openMonsterModal: () => {
      set({ isMonsterModalOpen: true });
    },

    closeMonsterModal: () => {
      set({ isMonsterModalOpen: false });
    },

    toggleMonsterModal: () => {
      set(state => ({ isMonsterModalOpen: !state.isMonsterModalOpen }));
    }
  }))
);

// Subscribe to monster changes and automatically update damage calculations
useMonsterStore.subscribe(
  (state) => state.selectedMonster,
  (selectedMonster) => {
    // Trigger damage recalculation when monster changes
    const buildPlannerStore = useBuildPlannerStore.getState();
    buildPlannerStore.recalculateDamage();
  }
);