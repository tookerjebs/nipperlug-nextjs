// Type definitions for the Passive Skills System

// Individual passive skill definition
export interface PassiveSkill {
  id: string;
  name: string;
  description: string;
  icon: string;
  maxLevel: number;
  stats: PassiveSkillStat[];
}

// Stat definition for each level of a passive skill
export interface PassiveSkillStat {
  level: number;
  statId: string;
  value: number;
}

// Selected passive skill with current level
export interface SelectedPassiveSkill {
  id: string;
  level: number;
}

// State interface for the passive skills system
export interface PassiveSkillsState {
  selectedSkills: SelectedPassiveSkill[];
  maxSelectedSkills: number;
}

// Actions interface for the passive skills system
export interface PassiveSkillsActions {
  selectSkill: (skillId: string) => void;
  deselectSkill: (skillId: string) => void;
  levelUpSkill: (skillId: string) => void;
  levelDownSkill: (skillId: string) => void;
  setSkillLevel: (skillId: string, level: number) => void;
  isSkillSelected: (skillId: string) => boolean;
  getSkillLevel: (skillId: string) => number;
  canSelectMoreSkills: () => boolean;
  calculateTotalStats: () => Record<string, number>;
  resetSystem: () => void;
  quickFillSystem: () => void;
  restoreFromImport: (selectedSkills: SelectedPassiveSkill[]) => void;
}

// Complete store type
export type PassiveSkillsStore = PassiveSkillsState & PassiveSkillsActions;