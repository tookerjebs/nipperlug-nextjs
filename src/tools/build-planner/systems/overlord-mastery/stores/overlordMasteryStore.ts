import { create } from 'zustand';
import { devtools } from 'zustand/middleware';
import { OverlordMasteryStore, OverlordSkillState } from '../types/index';
import { OverlordMasteryData } from '../data/overlord-mastery-data';
import { useStatRegistryStore } from '@/tools/build-planner/stores/statRegistryStore';

// Initial state helper
const createInitialSkillStates = (): Record<string, OverlordSkillState> => {
  const skillStates: Record<string, OverlordSkillState> = {};
  
  OverlordMasteryData.categories.forEach(category => {
    category.skills.forEach(skill => {
      skillStates[skill.id] = {
        skillId: skill.id,
        currentLevel: 0,
        isUnlocked: skill.prerequisites ? false : true, // Skills without prerequisites start unlocked
        contributedStats: {}
      };
    });
  });
  
  return skillStates;
};

// Helper function to register stats with the global registry
const registerStats = (totalStats: Record<string, number>) => {
  useStatRegistryStore.getState().registerSystemStats('overlordMastery', totalStats);
};

export const useOverlordMasteryStore = create<OverlordMasteryStore>()(devtools(
  (set, get) => ({
    // State
    categories: OverlordMasteryData.categories,
    skillStates: createInitialSkillStates(),
    totalOpSpent: 0,
    availableOp: OverlordMasteryData.defaultOpPoints,
    selectedCategory: 'attack',

    // Category management
    setSelectedCategory: (categoryId: string) => {
      set({ selectedCategory: categoryId });
    },

    // Skill management
    upgradeSkill: (skillId: string) => {
      const { skillStates, canUpgradeSkill } = get();
      
      if (!canUpgradeSkill(skillId)) return;
      
      const skill = get().getSkillById(skillId);
      if (!skill) return;
      
      const currentState = skillStates[skillId];
      const newLevel = currentState.currentLevel + 1;
      const statValue = skill.values[newLevel - 1] || 0;
      
      const updatedSkillStates = {
        ...skillStates,
        [skillId]: {
          ...currentState,
          currentLevel: newLevel,
          contributedStats: { [skill.statType]: statValue }
        }
      };
      
      // Check and unlock dependent skills
      const unlockedStates = get().updateSkillUnlockStates(updatedSkillStates);
      
      set({
        skillStates: unlockedStates,
        totalOpSpent: get().totalOpSpent + skill.opRequired
      });
      
      // Register stats with the global registry
      registerStats(get().calculateTotalStats());
    },

    downgradeSkill: (skillId: string) => {
      const { skillStates, canDowngradeSkill } = get();
      
      if (!canDowngradeSkill(skillId)) return;
      
      const skill = get().getSkillById(skillId);
      if (!skill) return;
      
      const currentState = skillStates[skillId];
      const newLevel = currentState.currentLevel - 1;
      const statValue = newLevel > 0 ? (skill.values[newLevel - 1] || 0) : 0;
      
      const updatedSkillStates = {
        ...skillStates,
        [skillId]: {
          ...currentState,
          currentLevel: newLevel,
          contributedStats: newLevel > 0 ? { [skill.statType]: statValue } : {}
        }
      };
      
      // Check and lock dependent skills if necessary
      const lockedStates = get().updateSkillUnlockStates(updatedSkillStates);
      
      set({
        skillStates: lockedStates,
        totalOpSpent: get().totalOpSpent - skill.opRequired
      });
      
      // Register stats with the global registry
      registerStats(get().calculateTotalStats());
    },

    resetSkill: (skillId: string) => {
      const { skillStates } = get();
      const skill = get().getSkillById(skillId);
      if (!skill) return;
      
      const currentState = skillStates[skillId];
      const opToRefund = currentState.currentLevel * skill.opRequired;
      
      const updatedSkillStates = {
        ...skillStates,
        [skillId]: {
          ...currentState,
          currentLevel: 0,
          contributedStats: {}
        }
      };
      
      // Update unlock states
      const finalStates = get().updateSkillUnlockStates(updatedSkillStates);
      
      set({
        skillStates: finalStates,
        totalOpSpent: get().totalOpSpent - opToRefund
      });
      
      // Register stats with the global registry
      registerStats(get().calculateTotalStats());
    },

    resetCategory: (categoryId: string) => {
      const { skillStates } = get();
      const category = get().getCategoryById(categoryId);
      if (!category) return;
      
      let opToRefund = 0;
      const updatedSkillStates = { ...skillStates };
      
      category.skills.forEach(skill => {
        const currentState = skillStates[skill.id];
        opToRefund += currentState.currentLevel * skill.opRequired;
        
        updatedSkillStates[skill.id] = {
          ...currentState,
          currentLevel: 0,
          contributedStats: {}
        };
      });
      
      // Update unlock states
      const finalStates = get().updateSkillUnlockStates(updatedSkillStates);
      
      set({
        skillStates: finalStates,
        totalOpSpent: get().totalOpSpent - opToRefund
      });
      
      // Register stats with the global registry
      registerStats(get().calculateTotalStats());
    },

    resetAll: () => {
      set({
        skillStates: createInitialSkillStates(),
        totalOpSpent: 0
      });
      
      // Clear stats from the global registry
      registerStats({});
    },

    quickFillSystem: () => {
      const { categories } = get();
      const maxedSkillStates: Record<string, OverlordSkillState> = {};
      let totalOpCost = 0;
      
      // Max out all skills
      categories.forEach(category => {
        category.skills.forEach(skill => {
          const maxLevel = skill.maxLevel;
          const statValue = skill.values[maxLevel - 1] || 0;
          const opCost = skill.opRequired * maxLevel;
          
          maxedSkillStates[skill.id] = {
            skillId: skill.id,
            currentLevel: maxLevel,
            isUnlocked: true, // All skills are unlocked when maxed
            contributedStats: { [skill.statType]: statValue }
          };
          
          totalOpCost += opCost;
        });
      });
      
      set({
        skillStates: maxedSkillStates,
        totalOpSpent: totalOpCost
      });
      
      // Register stats with the global registry
      registerStats(get().calculateTotalStats());
    },

    // OP management
    setAvailableOp: (amount: number) => {
      set({ availableOp: Math.max(0, amount) });
    },

    // Utility functions
    getSkillById: (skillId: string) => {
      const { categories } = get();
      for (const category of categories) {
        const skill = category.skills.find(s => s.id === skillId);
        if (skill) return skill;
      }
      return undefined;
    },

    getCategoryById: (categoryId: string) => {
      const { categories } = get();
      return categories.find(cat => cat.id === categoryId);
    },

    getSkillState: (skillId: string) => {
      const { skillStates } = get();
      return skillStates[skillId];
    },

    canUpgradeSkill: (skillId: string) => {
      const { skillStates, availableOp, totalOpSpent } = get();
      const skill = get().getSkillById(skillId);
      const skillState = skillStates[skillId];
      
      if (!skill || !skillState) return false;
      
      // Check if skill is at max level
      if (skillState.currentLevel >= skill.maxLevel) return false;
      
      // Check if skill is unlocked
      if (!skillState.isUnlocked) return false;
      
      // Check if we have enough OP
      if (totalOpSpent + skill.opRequired > availableOp) return false;
      
      // Check prerequisites
      return get().isSkillPrerequisiteMet(skillId);
    },

    canDowngradeSkill: (skillId: string) => {
      const { skillStates } = get();
      const skillState = skillStates[skillId];
      
      if (!skillState) return false;
      
      // Check if skill has levels to downgrade
      if (skillState.currentLevel <= 0) return false;
      
      // Check if any dependent skills would become invalid
      const skill = get().getSkillById(skillId);
      if (!skill) return false;
      
      // If this skill would go to level 0, check if any skills depend on it
      if (skillState.currentLevel === 1) {
        const dependentSkills = get().categories.flatMap(cat => cat.skills)
          .filter(s => s.prerequisites?.includes(skillId));
        
        // Check if any dependent skills have levels
        for (const depSkill of dependentSkills) {
          const depState = skillStates[depSkill.id];
          if (depState && depState.currentLevel > 0) {
            return false; // Cannot downgrade if dependent skills have levels
          }
        }
      }
      
      return true;
    },

    calculateTotalStats: () => {
      const { skillStates } = get();
      const totalStats: Record<string, number> = {};
      
      Object.values(skillStates).forEach(skillState => {
        Object.entries(skillState.contributedStats).forEach(([statId, value]) => {
          totalStats[statId] = (totalStats[statId] || 0) + value;
        });
      });
      
      return totalStats;
    },

    getSkillConnections: (skillId: string) => {
      const skill = get().getSkillById(skillId);
      return skill?.connections || [];
    },

    isSkillPrerequisiteMet: (skillId: string) => {
      const { skillStates } = get();
      const skill = get().getSkillById(skillId);
      
      if (!skill || !skill.prerequisites) return true;
      
      return skill.prerequisites.every(prereqId => {
        const prereqState = skillStates[prereqId];
        return prereqState && prereqState.currentLevel > 0;
      });
    },

    // Helper function to update skill unlock states
    updateSkillUnlockStates: (skillStates: Record<string, OverlordSkillState>) => {
      const updatedStates = { ...skillStates };
      
      // Update unlock status for all skills
      get().categories.forEach(category => {
        category.skills.forEach(skill => {
          const isUnlocked = !skill.prerequisites || 
            skill.prerequisites.every(prereqId => {
              const prereqState = updatedStates[prereqId];
              return prereqState && prereqState.currentLevel > 0;
            });
          
          updatedStates[skill.id] = {
            ...updatedStates[skill.id],
            isUnlocked
          };
        });
      });
      
      return updatedStates;
    },

    // Import/Export functionality
    restoreFromImport: (importData: {
      skillStates: Record<string, OverlordSkillState>;
      totalOpSpent: number;
      availableOp: number;
      selectedCategory: string;
    }) => {
      try {
        // Validate and restore skill states
        const validatedSkillStates = get().validateAndRestoreSkillStates(importData.skillStates);
        
        set({
          skillStates: validatedSkillStates,
          totalOpSpent: importData.totalOpSpent || 0,
          availableOp: importData.availableOp || OverlordMasteryData.defaultOpPoints,
          selectedCategory: importData.selectedCategory || 'attack'
        });

        // Register stats with the global registry
        registerStats(get().calculateTotalStats());
      } catch (error) {
        console.error('Failed to restore overlord mastery from import:', error);
        // Reset to default state on error
        get().resetAll();
      }
    },

    // Validate and restore skill states from import
    validateAndRestoreSkillStates: (importedSkillStates: Record<string, OverlordSkillState>) => {
      const currentSkillStates = createInitialSkillStates();
      
      // Validate and merge imported states
      Object.entries(importedSkillStates).forEach(([skillId, importedState]) => {
        const skill = get().getSkillById(skillId);
        if (skill && currentSkillStates[skillId]) {
          // Validate level bounds
          const validLevel = Math.max(0, Math.min(importedState.currentLevel || 0, skill.maxLevel));
          
          // Calculate correct contributed stats based on level
          const contributedStats = validLevel > 0 
            ? { [skill.statType]: skill.values[validLevel - 1] || 0 }
            : {};
          
          currentSkillStates[skillId] = {
            skillId,
            currentLevel: validLevel,
            isUnlocked: importedState.isUnlocked || false,
            contributedStats
          };
        }
      });
      
      // Update unlock states based on prerequisites
      return get().updateSkillUnlockStates(currentSkillStates);
    }
  }),
  {
    name: 'overlord-mastery-store'
  }
));