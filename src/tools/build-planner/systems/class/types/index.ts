// Type definitions for Class System

export type CharacterClass = 
  | 'blader'
  | 'wizard'
  | 'warrior'
  | 'gladiator'
  | 'dark_mage'
  | 'force_archer'
  | 'force_gunner'
  | 'force_blader'
  | 'force_shielder';

export interface ClassInfo {
  id: CharacterClass;
  name: string;
  description: string;
  icon: string;
}

export interface StatDistribution {
  str: number;
  int: number;
  dex: number;
}



export interface ClassState {
  selectedClass: CharacterClass | null;
  statDistribution: StatDistribution;
  remainingPoints: number;
}

export interface ClassActions {
  setSelectedClass: (characterClass: CharacterClass) => void;
  resetClass: () => void;
  
  // Stat distribution actions
  incrementStat: (stat: keyof StatDistribution, amount?: number) => void;
  decrementStat: (stat: keyof StatDistribution, amount?: number) => void;
  resetStats: () => void;
  setStatValue: (stat: keyof StatDistribution, value: number) => void;
  

  
  // Helper methods
  registerStatsWithRegistry: () => void;
  calculateTotalStats: () => Record<string, number>;
  calculateDerivedStats: () => Record<string, number>;
}