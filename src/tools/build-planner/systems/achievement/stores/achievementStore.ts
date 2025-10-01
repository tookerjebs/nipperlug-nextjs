// Achievement System Store
import { create } from 'zustand';
import { useStatRegistryStore } from '../../../stores/statRegistryStore';
import { Achievement, AchievementCategory, AchievementStore } from '../types/achievement';
import { achievementData } from '../data/achievement-data';

// Unique system identifier for stat registry
const SYSTEM_ID = 'achievement';

export const useAchievementStore = create<AchievementStore>()((set, get) => ({
    // Initial state
    categories: [],
    selectedCategory: '',
    achievements: [],
    totalStats: {},

    // Initialize achievement data
    initializeAchievements: () => {
      const processedCategories: AchievementCategory[] = [];
      const allAchievements: Achievement[] = [];

      // Process achievement data
      Object.entries(achievementData).forEach(([categoryKey, categoryData]) => {
        const achievements: Achievement[] = [];
        
        Object.entries(categoryData.achievements).forEach(([achievementKey, achievementInfo]) => {
          const achievement: Achievement = {
            id: achievementKey,
            name: achievementInfo.name,
            type: achievementInfo.type,
            category: categoryKey,
            isCompleted: false,
            selectedMilestone: 0
          };

          if (achievementInfo.type === 'single') {
            achievement.stats = achievementInfo.stats;
          } else {
            achievement.milestones = achievementInfo.milestones;
          }

          achievements.push(achievement);
          allAchievements.push(achievement);
        });

        processedCategories.push({
          id: categoryKey,
          name: categoryData.name,
          achievements,
          completedCount: 0,
          totalCount: achievements.length
        });
      });

      // Set the first category as selected if available
      const initialCategory = processedCategories.length > 0 ? processedCategories[0].id : '';

      // 1. Update system state first
      set({
        categories: processedCategories,
        achievements: allAchievements,
        selectedCategory: initialCategory
      });

      // 2. Calculate new total stats
      const totalStats = get().calculateTotalStats();
      
      // 3. Register with stat registry
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
      
      // 4. Update local totalStats
      set({ totalStats });
    },

    // Toggle achievement completion
    toggleAchievement: (achievementId: string, milestone?: number) => {
      const { achievements } = get();
      
      const updatedAchievements = achievements.map(achievement => {
        if (achievement.id === achievementId) {
          if (achievement.type === 'single') {
            // For single achievements, milestone 1 means completed, 0 means not completed
            return { ...achievement, isCompleted: milestone === 1 };
          } else {
            return { ...achievement, selectedMilestone: milestone || 0 };
          }
        }
        return achievement;
      });
      
      // 1. Update system state first
      set({ achievements: updatedAchievements });
      
      // Update categories with new achievements
      get().updateCategoryCompletions();
      
      // 2. Calculate new total stats
      const totalStats = get().calculateTotalStats();
      
      // 3. Register with stat registry
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
      
      // 4. Update local totalStats
      set({ totalStats });
    },

    // Select a category
    selectCategory: (categoryId: string) => {
      set({ selectedCategory: categoryId });
    },

    // Update category completion counts
    updateCategoryCompletions: () => {
      const { achievements, categories } = get();
      
      const updatedCategories = categories.map(category => {
        const categoryAchievements = achievements.filter(a => a.category === category.id);
        const completedCount = categoryAchievements.filter(a => 
          a.type === 'single' ? a.isCompleted : (a.selectedMilestone || 0) > 0
        ).length;
        
        return { 
          ...category, 
          completedCount, 
          achievements: categoryAchievements 
        };
      });
      
      set({ categories: updatedCategories });
    },

    // Calculate total stats from achievements - STANDARD METHOD
    calculateTotalStats: (): Record<string, number> => {
      const { achievements } = get();
      const totalStats: Record<string, number> = {};
      
      achievements.forEach(achievement => {
        if (achievement.type === 'single' && achievement.isCompleted && achievement.stats) {
          Object.entries(achievement.stats).forEach(([stat, value]) => {
            totalStats[stat] = (totalStats[stat] || 0) + value;
          });
        } else if (achievement.type === 'milestone' && achievement.selectedMilestone && achievement.milestones) {
          // Sum all milestone stats up to AND INCLUDING the selected milestone
          for (let i = 0; i <= achievement.selectedMilestone - 1; i++) {
            const milestone = achievement.milestones[i];
            if (milestone) {
              Object.entries(milestone.stats).forEach(([stat, value]) => {
                totalStats[stat] = (totalStats[stat] || 0) + value;
              });
            }
          }
        }
      });
      
      return totalStats;
    },

    // Reset the entire system
    resetSystem: () => {
      // Unregister from stat registry
      useStatRegistryStore.getState().unregisterSystem(SYSTEM_ID);
      
      // Re-initialize with default values
      get().initializeAchievements();
      set({ totalStats: {} });
    },

    // Quick fill - max all achievements
    quickFillSystem: () => {
      const { achievements } = get();
      
      // Complete ALL achievements at maximum level
      const updatedAchievements = achievements.map((achievement) => {
        if (achievement.type === 'single') {
          return { ...achievement, isCompleted: true };
        } else if (achievement.milestones) {
          // Select the highest milestone for milestone achievements
          const highestMilestone = achievement.milestones.length;
          return { ...achievement, selectedMilestone: highestMilestone };
        }
        return achievement;
      });
      
      // 1. Update system state first
      set({ achievements: updatedAchievements });
      
      // Update categories with new achievements
      get().updateCategoryCompletions();
      
      // 2. Calculate new total stats
      const totalStats = get().calculateTotalStats();
      
      // 3. Register with stat registry
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
      
      // 4. Update local totalStats
      set({ totalStats });
    },

    // Restore from import - for build sharing
    restoreFromImport: (data: { achievements: Array<{ id: string; isCompleted: boolean; selectedMilestone: number }> }) => {
      try {
        // First, initialize the achievements with base data
        get().initializeAchievements();
        
        // Then merge the imported states with the initialized achievements
        const currentAchievements = get().achievements;
        const updatedAchievements = currentAchievements.map(currentAchievement => {
          // Find the corresponding imported achievement
          const importedAchievement = data.achievements.find(
            imported => imported.id === currentAchievement.id
          );
          
          if (importedAchievement) {
            // Merge the imported state with the current achievement
            return {
              ...currentAchievement,
              isCompleted: importedAchievement.isCompleted || false,
              selectedMilestone: importedAchievement.selectedMilestone || 0
            };
          }
          
          return currentAchievement;
        });
        
        // 1. Update system state first
        set({ achievements: updatedAchievements });
        
        // Update categories with new achievements
        get().updateCategoryCompletions();
        
        // 2. Calculate new total stats
        const totalStats = get().calculateTotalStats();
        
        // 3. Register with stat registry
        useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
        
        // 4. Update local totalStats
        set({ totalStats });
      } catch (error) {
        console.error('Failed to restore achievement system from import:', error);
        // Fallback to reset if import fails
        get().resetSystem();
      }
    }
  }));



// Export system configuration for build sharing
export const achievementSystemConfig = {
  systemId: SYSTEM_ID,
  getDefaultState: () => ({
    categories: [],
    selectedCategory: '',
    achievements: [],
    totalStats: {}
  })
};