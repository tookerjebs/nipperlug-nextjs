// Zustand store for Class Passive Skills System
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import type { ClassPassiveSkillsStore, CharacterClass } from '../types';
import { getPassiveSkillsForClass, calculatePassiveSkillStats } from '../data/classPassiveSkills';
import { useStatRegistryStore } from '../../../stores/statRegistryStore';

const SYSTEM_ID = 'classPassiveSkills';

export const useClassPassiveSkillsStore = create<ClassPassiveSkillsStore>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    selectedClass: null,
    passiveSkills: {}, // skillId -> level

    // Actions
    setSelectedClass: (characterClass: CharacterClass | null) => {
      set({ 
        selectedClass: characterClass,
        passiveSkills: {} // Reset passive skills when changing class
      });
      
      // Re-register stats with new class context
      get().registerStatsWithRegistry();
    },

    setPassiveSkillLevel: (skillId: string, level: number) => {
      const { selectedClass } = get();
      if (!selectedClass) return;

      const availableSkills = getPassiveSkillsForClass(selectedClass);
      const skill = availableSkills.find(s => s.id === skillId);
      if (!skill) return;

      const clampedLevel = Math.max(0, Math.min(level, skill.maxLevel));
      
      set(state => ({
        passiveSkills: {
          ...state.passiveSkills,
          [skillId]: clampedLevel
        }
      }));
      
      get().registerStatsWithRegistry();
    },

    resetPassiveSkills: () => {
      set({ passiveSkills: {} });
      get().registerStatsWithRegistry();
    },

    quickFillSystem: () => {
      const { selectedClass } = get();
      if (!selectedClass) return;

      const availableSkills = getPassiveSkillsForClass(selectedClass);
      const maxedSkills: Record<string, number> = {};
      
      availableSkills.forEach(skill => {
        maxedSkills[skill.id] = skill.maxLevel;
      });

      set({ passiveSkills: maxedSkills });
      get().registerStatsWithRegistry();
    },

    resetSystem: () => {
      set({ 
        selectedClass: null,
        passiveSkills: {} 
      });
      useStatRegistryStore.getState().unregisterSystem(SYSTEM_ID);
    },

    calculateTotalStats: () => {
      const { selectedClass, passiveSkills } = get();
      const totalStats: Record<string, number> = {};

      if (selectedClass) {
        // Add passive skills stats
        const availableSkills = getPassiveSkillsForClass(selectedClass);
        Object.entries(passiveSkills).forEach(([skillId, level]) => {
          const skill = availableSkills.find(s => s.id === skillId);
          if (skill && level > 0) {
            const skillStats = calculatePassiveSkillStats(skill, level);
            Object.entries(skillStats).forEach(([statId, value]) => {
              totalStats[statId] = (totalStats[statId] || 0) + value;
            });
          }
        });
      }

      return totalStats;
    },

    registerStatsWithRegistry: () => {
      const totalStats = get().calculateTotalStats();
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
    },

    restoreFromImport: (selectedClass: CharacterClass | null, passiveSkills: Record<string, number>) => {
      // Validate imported skills against the selected class
      let validSkills: Record<string, number> = {};
      if (selectedClass) {
        const availableSkills = getPassiveSkillsForClass(selectedClass);
        Object.entries(passiveSkills).forEach(([skillId, level]) => {
          const skill = availableSkills.find(s => s.id === skillId);
          if (skill && level >= 0 && level <= skill.maxLevel) {
            validSkills[skillId] = level;
          }
        });
      }

      set({ 
        selectedClass,
        passiveSkills: validSkills 
      });
      
      get().registerStatsWithRegistry();
    }
  }))
);