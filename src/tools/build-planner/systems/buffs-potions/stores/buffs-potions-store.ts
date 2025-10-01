import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { buffsData, getBuffsInGroup, isGroupedBuff } from '../data/buffs-data';
import { potionsData, getPotionsInGroup, isGroupedPotion, isType1Potion, isType2Potion } from '../data/potions-data';
import { ActiveConsumable, BuffsPotionsState, ConsumableItem } from '../types';
import { useStatRegistryStore } from '@/tools/build-planner/stores/statRegistryStore';
import { StatOption } from '@/tools/build-planner/types/systems';
import { getStatInfo } from '@/tools/build-planner/data/stats-config';

export const useBuffsPotionsStore = create<BuffsPotionsState>()(subscribeWithSelector((set, get) => ({
  buffs: buffsData,
  potions: potionsData,
  activeBuffs: [],
  activePotions: [],

  // Toggle a buff on/off
  toggleBuff: (buffId: string) => {
    const { activeBuffs } = get();
    const activeBuff = activeBuffs.find(buff => buff.id === buffId);

    if (activeBuff) {
      // Deactivate the buff
      set({
        activeBuffs: activeBuffs.filter(buff => buff.id !== buffId)
      });
    } else {
      // Activate the buff
      let newActiveBuffs = [...activeBuffs];
      const buff = get().buffs.find(b => b.id === buffId);

      if (!buff) return;

      // If this buff belongs to a group, deactivate other buffs in the same group
      if (isGroupedBuff(buff)) {
        const groupBuffs = getBuffsInGroup(buff.group!);
        const groupBuffIds = groupBuffs.map(b => b.id);
        
        // Remove any active buffs from the same group
        newActiveBuffs = newActiveBuffs.filter(activeBuff => 
          !groupBuffIds.includes(activeBuff.id)
        );
      }

      // Add the new buff
      newActiveBuffs.push({ id: buffId });

      set({ activeBuffs: newActiveBuffs });
    }
  },

  // Toggle a potion on/off with smart grouping rules
  togglePotion: (potionId: string) => {
    const { activePotions } = get();
    const activePotion = activePotions.find(potion => potion.id === potionId);

    if (activePotion) {
      // Deactivate the potion
      set({
        activePotions: activePotions.filter(potion => potion.id !== potionId)
      });
    } else {
      // Activate the potion with smart management
      const potion = get().potions.find(p => p.id === potionId);
      if (!potion) return;

      let newActivePotions = [...activePotions];

      // Handle Type 1 potions (only 1 can be active - remove others)
      if (isType1Potion(potion)) {
        const type1PotionIds = getPotionsInGroup('type-1-potions').map(p => p.id);
        newActivePotions = newActivePotions.filter(activePotion => 
          !type1PotionIds.includes(activePotion.id)
        );
      }

      // Handle Type 2 potions (max 2 can be active)
      if (isType2Potion(potion)) {
        const activeType2Potions = newActivePotions.filter(activePotion => {
          const activePotionData = get().potions.find(p => p.id === activePotion.id);
          return activePotionData && isType2Potion(activePotionData);
        });

        // If we already have 2 Type 2 potions, remove the oldest one
        if (activeType2Potions.length >= 2) {
          // Remove the first Type 2 potion to make room
          const firstType2PotionId = activeType2Potions[0].id;
          newActivePotions = newActivePotions.filter(activePotion => 
            activePotion.id !== firstType2PotionId
          );
        }
      }

      // Check total limit and remove oldest potion if needed
      if (newActivePotions.length >= 3) {
        // Remove the oldest potion to make room
        newActivePotions = newActivePotions.slice(1);
      }

      // Add the new potion
      newActivePotions.push({ id: potionId });

      set({ activePotions: newActivePotions });
    }
  },

  // Check if a buff is active
  isBuffActive: (buffId: string) => {
    return get().activeBuffs.some(buff => buff.id === buffId);
  },

  // Check if a potion is active
  isPotionActive: (potionId: string) => {
    return get().activePotions.some(potion => potion.id === potionId);
  },

  // Calculate total stats from all active buffs and potions
  calculateTotalStats: (): Record<string, number> => {
    const { activeBuffs, activePotions, buffs, potions } = get();
    const totalStats: Record<string, number> = {};

    // Process active buffs
    activeBuffs.forEach(activeBuff => {
      const buff = buffs.find(b => b.id === activeBuff.id);
      if (!buff) return;

      // Add buff stats to total
      Object.entries(buff.stats).forEach(([statId, value]) => {
        totalStats[statId] = (totalStats[statId] || 0) + value;
      });
    });

    // Process active potions
    activePotions.forEach(activePotion => {
      const potion = potions.find(p => p.id === activePotion.id);
      if (!potion) return;

      // Add potion stats to total
      Object.entries(potion.stats).forEach(([statId, value]) => {
        totalStats[statId] = (totalStats[statId] || 0) + value;
      });
    });

    return totalStats;
  },

  // Get available stats for a buff or potion
  getAvailableStats: (itemId: string): StatOption[] => {
    // Check if it's a buff
    const buff = get().buffs.find(b => b.id === itemId);
    if (buff) {
      return Object.entries(buff.stats).map(([statId, value]) => {
        const statInfo = getStatInfo(statId);
        return {
          id: statId,
          name: statInfo?.name || statId,
          value,
          isPercentage: statInfo?.isPercentage || false,
          category: statInfo?.category || 'utility',
          maxLevel: 1, // Buffs don't have levels, so max level is 1
          trainingPointCosts: [] // Buffs don't require training points
        };
      });
    }

    // Check if it's a potion
    const potion = get().potions.find(p => p.id === itemId);
    if (potion) {
      return Object.entries(potion.stats).map(([statId, value]) => {
        const statInfo = getStatInfo(statId);
        return {
          id: statId,
          name: statInfo?.name || statId,
          value,
          isPercentage: statInfo?.isPercentage || false,
          category: statInfo?.category || 'utility',
          maxLevel: 1, // Potions don't have levels, so max level is 1
          trainingPointCosts: [] // Potions don't require training points
        };
      });
    }

    return [];
  },

  // Reset all buffs and potions
  reset: () => {
    set({
      activeBuffs: [],
      activePotions: []
    });
  },

  // Check if a potion can be activated (informational - doesn't block activation)
  canActivatePotion: (potionId: string) => {
    const { activePotions, potions } = get();
    const potion = potions.find(p => p.id === potionId);
    
    if (!potion) {
      return { canActivate: false, reason: 'Potion not found' };
    }

    // Check if already active
    if (activePotions.some(p => p.id === potionId)) {
      return { canActivate: false, reason: 'Potion is already active' };
    }

    // Always allow activation - the toggle function will handle smart management
    return { canActivate: true };
  },

  // Get current active potion counts
  getActivePotionCounts: () => {
    const { activePotions, potions } = get();
    
    let type1Count = 0;
    let type2Count = 0;

    activePotions.forEach(activePotion => {
      const potionData = potions.find(p => p.id === activePotion.id);
      if (potionData) {
        if (isType1Potion(potionData)) {
          type1Count++;
        } else if (isType2Potion(potionData)) {
          type2Count++;
        }
      }
    });

    return {
      total: activePotions.length,
      type1: type1Count,
      type2: type2Count
    };
  },

  // Get potion limits
  getPotionLimits: () => {
    return {
      maxTotal: 3,
      maxType1: 1,
      maxType2: 2
    };
  }
})));

// Subscribe to store changes and automatically register stats with the registry
useBuffsPotionsStore.subscribe(
  (state) => {
    // Calculate total stats whenever the store state changes
    const totalStats = state.calculateTotalStats();
    return totalStats;
  },
  (totalStats) => {
    // Register the calculated stats with the stat registry
    useStatRegistryStore.getState().registerSystemStats('buffsPotions', totalStats);
  }
);