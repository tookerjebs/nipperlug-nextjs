// Achievement system types
export interface Achievement {
  id: string;
  name: string;
  type: 'single' | 'milestone';
  stats?: Record<string, number>;
  milestones?: Array<{
    threshold: number;
    stats: Record<string, number>;
  }>;
  category: string;
  isCompleted?: boolean;
  selectedMilestone?: number;
}

export interface AchievementCategory {
  id: string;
  name: string;
  achievements: Achievement[];
  completedCount: number;
  totalCount: number;
}

export interface AchievementState {
  categories: AchievementCategory[];
  selectedCategory: string;
  achievements: Achievement[];
  totalStats: Record<string, number>;
}

export interface AchievementActions {
  // Initialize system
  initializeAchievements: () => void;
  
  // Toggle achievement completion
  toggleAchievement: (achievementId: string, milestone?: number) => void;
  
  // Update category selection
  selectCategory: (categoryId: string) => void;
  
  // Calculate total stats from all achievements
  calculateTotalStats: () => Record<string, number>;
  
  // Update category completion counts
  updateCategoryCompletions: () => void;
  
  // Reset the entire system
  resetSystem: () => void;
  
  // Quick fill achievements (for testing/demo)
  quickFillSystem: () => void;
  
  // Restore from import - for build sharing
  restoreFromImport: (data: { achievements: Array<{ id: string; isCompleted: boolean; selectedMilestone: number }> }) => void;
}

export type AchievementStore = AchievementState & AchievementActions;