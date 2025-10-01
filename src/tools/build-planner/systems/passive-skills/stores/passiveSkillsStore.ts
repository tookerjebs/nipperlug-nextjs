// Zustand store for Passive Skills System
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { useStatRegistryStore } from '@/tools/build-planner/stores/statRegistryStore';
import type { PassiveSkillsStore, SelectedPassiveSkill } from '../types';
import { PASSIVE_SKILLS_DATA, getSkillStatValue } from '../data/passive-skills-data';

const SYSTEM_ID = 'passiveSkills';
const MAX_SELECTED_SKILLS = 6;

export const usePassiveSkillsStore = create<PassiveSkillsStore>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    selectedSkills: [],
    maxSelectedSkills: MAX_SELECTED_SKILLS,

    // Actions
    selectSkill: (skillId: string) => {
      const { selectedSkills, canSelectMoreSkills } = get();
      
      // Check if we can select more skills
      if (!canSelectMoreSkills()) {
        return;
      }

      // Check if skill is already selected
      if (selectedSkills.some(skill => skill.id === skillId)) {
        return;
      }

      // Add the skill at level 1
      const newSelectedSkills = [...selectedSkills, { id: skillId, level: 1 }];
      
      set({ selectedSkills: newSelectedSkills });
      
      // Register stats
      const totalStats = get().calculateTotalStats();
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
    },

    deselectSkill: (skillId: string) => {
      const { selectedSkills } = get();
      
      const newSelectedSkills = selectedSkills.filter(skill => skill.id !== skillId);
      
      set({ selectedSkills: newSelectedSkills });
      
      // Register stats
      const totalStats = get().calculateTotalStats();
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
    },

    levelUpSkill: (skillId: string) => {
      const { selectedSkills } = get();
      const skill = PASSIVE_SKILLS_DATA.find(s => s.id === skillId);
      
      if (!skill) return;

      const newSelectedSkills = selectedSkills.map(selectedSkill => {
        if (selectedSkill.id === skillId && selectedSkill.level < skill.maxLevel) {
          return { ...selectedSkill, level: selectedSkill.level + 1 };
        }
        return selectedSkill;
      });

      set({ selectedSkills: newSelectedSkills });
      
      // Register stats
      const totalStats = get().calculateTotalStats();
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
    },

    levelDownSkill: (skillId: string) => {
      const { selectedSkills } = get();

      const newSelectedSkills = selectedSkills.map(selectedSkill => {
        if (selectedSkill.id === skillId && selectedSkill.level > 1) {
          return { ...selectedSkill, level: selectedSkill.level - 1 };
        }
        return selectedSkill;
      });

      set({ selectedSkills: newSelectedSkills });
      
      // Register stats
      const totalStats = get().calculateTotalStats();
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
    },

    setSkillLevel: (skillId: string, level: number) => {
      const { selectedSkills } = get();
      const skill = PASSIVE_SKILLS_DATA.find(s => s.id === skillId);
      
      if (!skill || level < 1 || level > skill.maxLevel) return;

      const newSelectedSkills = selectedSkills.map(selectedSkill => {
        if (selectedSkill.id === skillId) {
          return { ...selectedSkill, level };
        }
        return selectedSkill;
      });

      set({ selectedSkills: newSelectedSkills });
      
      // Register stats
      const totalStats = get().calculateTotalStats();
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
    },

    isSkillSelected: (skillId: string) => {
      const { selectedSkills } = get();
      return selectedSkills.some(skill => skill.id === skillId);
    },

    getSkillLevel: (skillId: string) => {
      const { selectedSkills } = get();
      const selectedSkill = selectedSkills.find(skill => skill.id === skillId);
      return selectedSkill ? selectedSkill.level : 0;
    },

    canSelectMoreSkills: () => {
      const { selectedSkills, maxSelectedSkills } = get();
      return selectedSkills.length < maxSelectedSkills;
    },

    calculateTotalStats: () => {
      const { selectedSkills } = get();
      const totalStats: Record<string, number> = {};

      selectedSkills.forEach(selectedSkill => {
        const skillStats = getSkillStatValue(selectedSkill.id, selectedSkill.level);
        
        Object.entries(skillStats).forEach(([statId, value]) => {
          totalStats[statId] = (totalStats[statId] || 0) + value;
        });
      });

      return totalStats;
    },

    resetSystem: () => {
      useStatRegistryStore.getState().unregisterSystem(SYSTEM_ID);
      set({ selectedSkills: [] });
    },

    quickFillSystem: () => {
      // Select first 6 skills at max level for quick fill
      const quickFillSkills: SelectedPassiveSkill[] = PASSIVE_SKILLS_DATA
        .slice(0, MAX_SELECTED_SKILLS)
        .map(skill => ({
          id: skill.id,
          level: skill.maxLevel
        }));

      set({ selectedSkills: quickFillSkills });
      
      // Register stats
      const totalStats = get().calculateTotalStats();
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
    },

    restoreFromImport: (selectedSkills: SelectedPassiveSkill[]) => {
      // Validate imported skills
      const validSkills = selectedSkills.filter(skill => {
        const skillData = PASSIVE_SKILLS_DATA.find(s => s.id === skill.id);
        return skillData && skill.level >= 1 && skill.level <= skillData.maxLevel;
      });

      // Limit to max selected skills
      const limitedSkills = validSkills.slice(0, MAX_SELECTED_SKILLS);

      set({ selectedSkills: limitedSkills });
      
      // Register stats
      const totalStats = get().calculateTotalStats();
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
    }
  }))
);