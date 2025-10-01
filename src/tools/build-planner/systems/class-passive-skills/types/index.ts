// Type definitions for Class Passive Skills System
import type { CharacterClass } from '../../class/types';

// Re-export CharacterClass for convenience
export type { CharacterClass };

export interface ClassPassiveSkill {
  id: string;
  name: string;
  description: string;
  icon: string;
  stats: Record<string, number>; // stat ID -> value
  maxLevel: number;
  levelStats?: Record<string, number[]>; // stat ID -> values per level
}

export interface ClassPassiveSkillsData {
  classId: CharacterClass;
  skills: ClassPassiveSkill[];
}

export interface ClassPassiveSkillsState {
  selectedClass: CharacterClass | null;
  passiveSkills: Record<string, number>; // skillId -> level
}

export interface ClassPassiveSkillsActions {
  setSelectedClass: (characterClass: CharacterClass | null) => void;
  setPassiveSkillLevel: (skillId: string, level: number) => void;
  resetPassiveSkills: () => void;
  quickFillSystem: () => void;
  resetSystem: () => void;
  calculateTotalStats: () => Record<string, number>;
  registerStatsWithRegistry: () => void;
  restoreFromImport: (selectedClass: CharacterClass | null, passiveSkills: Record<string, number>) => void;
}

// Complete store type
export type ClassPassiveSkillsStore = ClassPassiveSkillsState & ClassPassiveSkillsActions;