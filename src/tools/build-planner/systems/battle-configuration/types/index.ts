// Type definitions for Battle Configuration System

import type { CharacterClass } from '../../class/types';

export interface AttackSkill {
  id: string;
  name: string;
  description: string;
  classId: CharacterClass;
  stats: Record<string, number>; // stat bonuses provided by this skill
}

export interface BattleConfigurationState {
  selectedAttackSkill: string | null;
  selectedBattleMode: string | null;
}

export interface BattleConfigurationActions {
  // Core stat management (required by integration guide)
  calculateTotalStats: () => Record<string, number>;
  resetSystem: () => void;
  
  // Selection management
  selectAttackSkill: (skillId: string | null) => void;
  selectBattleMode: (modeId: string | null) => void;
  
  // Build sharing methods
  restoreFromImport: (data: Partial<BattleConfigurationState>) => void;
  
  // Helper methods
  registerStatsWithRegistry: () => void;
}