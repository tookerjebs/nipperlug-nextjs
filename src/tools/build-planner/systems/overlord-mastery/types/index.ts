// Overlord Mastery System Types

export interface OverlordSkill {
  id: string;
  name: string;
  description: string;
  icon: string;
  maxLevel: number;
  gridPosition: {
    row: number;
    col: number;
  };
  opRequired: number; // OP points required to unlock
  values: number[]; // Stat values per level
  statType: string; // The stat this skill affects
  prerequisites?: string[]; // Other skill IDs that must be learned first
  connections?: string[]; // Visual connections to other skills
}

export interface OverlordCategory {
  id: string;
  name: string;
  description: string;
  icon: string;
  skills: OverlordSkill[];
  gridSize: {
    rows: number;
    cols: number;
  };
}

export interface OverlordSkillState {
  skillId: string;
  currentLevel: number;
  isUnlocked: boolean;
  contributedStats: Record<string, number>;
}

export interface OverlordMasteryState {
  categories: OverlordCategory[];
  skillStates: Record<string, OverlordSkillState>;
  totalOpSpent: number;
  availableOp: number;
  selectedCategory: string;
}

export interface OverlordMasteryActions {
  // Category management
  setSelectedCategory: (categoryId: string) => void;
  
  // Skill management
  upgradeSkill: (skillId: string) => void;
  downgradeSkill: (skillId: string) => void;
  resetSkill: (skillId: string) => void;
  resetCategory: (categoryId: string) => void;
  resetAll: () => void;
  quickFillSystem: () => void;
  
  // OP management
  setAvailableOp: (amount: number) => void;
  
  // Utility functions
  getSkillById: (skillId: string) => OverlordSkill | undefined;
  getCategoryById: (categoryId: string) => OverlordCategory | undefined;
  getSkillState: (skillId: string) => OverlordSkillState | undefined;
  canUpgradeSkill: (skillId: string) => boolean;
  canDowngradeSkill: (skillId: string) => boolean;
  calculateTotalStats: () => Record<string, number>;
  getSkillConnections: (skillId: string) => string[];
  isSkillPrerequisiteMet: (skillId: string) => boolean;
  updateSkillUnlockStates: (skillStates: Record<string, OverlordSkillState>) => Record<string, OverlordSkillState>;
  
  // Import/Export functionality
  restoreFromImport: (importData: {
    skillStates: Record<string, OverlordSkillState>;
    totalOpSpent: number;
    availableOp: number;
    selectedCategory: string;
  }) => void;
  validateAndRestoreSkillStates: (importedSkillStates: Record<string, OverlordSkillState>) => Record<string, OverlordSkillState>;
}

export type OverlordMasteryStore = OverlordMasteryState & OverlordMasteryActions;

// UI Component Props
export interface OverlordSkillSlotProps {
  skill: OverlordSkill;
}

export interface OverlordSkillGridProps {
  category: OverlordCategory;
}

export interface OverlordCategoryTabsProps {
  categories: OverlordCategory[];
  selectedCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export interface OverlordMasterySystemProps {
  className?: string;
}

