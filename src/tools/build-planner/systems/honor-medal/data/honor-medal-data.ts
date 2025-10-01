/**
 * Honor Medal System Data
 * Contains data for Honor Medal progression with ranks:
 * - Captain (4 slots)
 * - General (6 slots) 
 * - Commander (8 slots)
 * - Hero (10 slots)
 * - Legend (12 slots)
 */

// Define types for the data structure
export interface StatDefinition {
  id: string;
  chance: number;
  values: number[];
}

export interface RankDefinition {
  name: string;
  slots: number;
}

export interface HonorMedalDataType {
  maxLevel: number;
  ranks: Record<string, RankDefinition>;
  rankStats: Record<string, StatDefinition[]>;
}

// Export the data as a TypeScript module
const HonorMedalData: HonorMedalDataType = {
  // Maximum level for each medal
  maxLevel: 10,
  
  // Available ranks and their slots
  ranks: {
    captain: {
      name: "Captain",
      slots: 4
    },
    general: {
      name: "General",
      slots: 6
    },
    commander: {
      name: "Commander",
      slots: 8
    },
    hero: {
      name: "Hero",
      slots: 10
    },
    legend: {
      name: "Legend",
      slots: 12
    }
  },
  
  // Available stats for each rank
  rankStats: {
    captain: [
      { id: 'hp', chance: 8, values: [6, 12, 18, 24, 30, 36, 42, 48, 54, 60] },
      { id: 'mp', chance: 8, values: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30] },
      { id: 'attackRate', chance: 8, values: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50] },
      { id: 'defenseRate', chance: 8, values: [4, 8, 12, 16, 20, 24, 28, 32, 36, 40] },
      { id: 'hpAutoHeal', chance: 11, values: [1, 2, 2, 3, 3, 4, 4, 5, 5, 6] },
      { id: 'mpAutoHeal', chance: 11, values: [1, 2, 2, 3, 3, 4, 4, 5, 5, 6] },
      { id: 'str', chance: 5, values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
      { id: 'int', chance: 5, values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
      { id: 'dex', chance: 5, values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
      { id: 'ignoreDamageReduction', chance: 7, values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
      { id: 'ignorePenetration', chance: 5, values: [1, 2, 2, 3, 3, 4, 4, 5, 5, 6] },
      { id: 'evasion', chance: 6, values: [4, 8, 12, 16, 20, 24, 28, 32, 36, 40] },
      { id: 'accuracy', chance: 7, values: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50] },
      { id: 'damageReduction', chance: 6, values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] }
    ],
    
    // General rank stats
    general: [
      { id: 'mp', chance: 8, values: [4, 8, 12, 16, 20, 24, 28, 32, 36, 40] },
      { id: 'defense', chance: 8, values: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15] },
      { id: 'attackRate', chance: 9, values: [6, 12, 18, 24, 30, 36, 42, 48, 54, 60] },
      { id: 'defenseRate', chance: 9, values: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50] },
      { id: 'hpAutoHeal', chance: 12, values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
      { id: 'mpAutoHeal', chance: 12, values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
      { id: 'allAttackUp', chance: 7, values: [6, 7, 8, 9, 10, 11, 12, 13, 14, 15] },
      { id: 'ignoreResistCriticalDamage', chance: 6, values: [2, 2, 2, 3, 3, 3, 4, 4, 4, 5] },
      { id: 'addDamage', chance: 8, values: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10] },
      { id: 'resistCriticalDamage', chance: 5, values: [2, 2, 2, 2, 3, 3, 3, 3, 3, 4] },
      { id: 'resistSkillAmp', chance: 5, values: [1, 1, 1, 1, 1, 1, 1, 1, 1, 2] },
      { id: 'ignoreEvasion', chance: 5, values: [6, 12, 18, 24, 30, 36, 42, 48, 54, 60] },
      { id: 'ignoreAccuracy', chance: 4, values: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50] },
      { id: 'criticalDamage', chance: 2, values: [2, 2, 2, 2, 3, 3, 3, 3, 3, 4] }
    ],
    
    // Commander rank stats
    commander: [
      { id: 'hp', chance: 8, values: [8, 16, 24, 32, 40, 48, 56, 64, 72, 80] },
      { id: 'mp', chance: 8, values: [5, 10, 15, 20, 25, 30, 35, 40, 45, 50] },
      { id: 'attackRate', chance: 7, values: [7, 14, 21, 28, 35, 42, 49, 56, 63, 70] },
      { id: 'defenseRate', chance: 7, values: [6, 12, 18, 24, 30, 36, 42, 48, 54, 60] },
      { id: 'ignoreEvasion', chance: 5, values: [7, 14, 21, 28, 35, 42, 49, 56, 63, 70] },
      { id: 'ignoreAccuracy', chance: 3, values: [6, 12, 18, 24, 30, 36, 42, 48, 54, 60] },
      { id: 'ignoreDamageReduction', chance: 5, values: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20] },
      { id: 'defense', chance: 8, values: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20] },
      { id: 'damageReduction', chance: 5, values: [1, 2, 3, 4, 5, 7, 9, 11, 13, 15] },
      { id: 'allAttackUp', chance: 7, values: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20] },
      { id: 'resistCriticalDamage', chance: 4, values: [2, 2, 2, 3, 3, 3, 4, 4, 4, 5] },
      { id: 'resistDown', chance: 8, values: [1, 1, 1, 1, 2, 2, 2, 2, 2, 3] },
      { id: 'resistKnockback', chance: 8, values: [1, 1, 1, 1, 2, 2, 2, 2, 2, 3] },
      { id: 'resistStun', chance: 8, values: [1, 1, 1, 1, 2, 2, 2, 2, 2, 3] },
      { id: 'resistSkillAmp', chance: 4, values: [1, 1, 1, 2, 2, 2, 3, 3, 3, 4] },
      { id: 'allSkillAmp', chance: 2, values: [1, 1, 1, 1, 2, 2, 2, 2, 2, 3] },
      { id: 'accuracy', chance: 3, values: [7, 14, 21, 28, 35, 42, 49, 56, 63, 70] }
    ],
    
    // Hero rank stats
    hero: [
      { id: 'mp', chance: 8, values: [6, 12, 18, 24, 30, 36, 42, 48, 54, 60] },
      { id: 'defense', chance: 8, values: [2, 4, 6, 8, 10, 12, 15, 18, 21, 25] },
      { id: 'attackRate', chance: 9, values: [8, 16, 24, 32, 40, 48, 56, 64, 72, 80] },
      { id: 'defenseRate', chance: 9, values: [7, 14, 21, 28, 35, 42, 49, 56, 63, 70] },
      { id: 'ignoreEvasion', chance: 5, values: [8, 16, 24, 32, 40, 48, 56, 64, 72, 80] },
      { id: 'ignoreAccuracy', chance: 3, values: [7, 14, 21, 28, 35, 42, 49, 56, 63, 70] },
      { id: 'ignoreDamageReduction', chance: 5, values: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30] },
      { id: 'penetration', chance: 2, values: [1, 2, 3, 4, 5, 7, 9, 11, 13, 15] },
      { id: 'resistSkillAmp', chance: 5, values: [1, 1, 1, 2, 2, 2, 3, 3, 3, 4] },
      { id: 'allAttackUp', chance: 7, values: [7, 9, 11, 13, 15, 17, 19, 21, 23, 25] },
      { id: 'ignoreResistSkillAmp', chance: 7, values: [1, 1, 1, 1, 2, 2, 2, 2, 2, 3] },
      { id: 'ignoreResistCriticalDamage', chance: 8, values: [2, 3, 3, 4, 4, 5, 5, 6, 6, 7] },
      { id: 'ignoreResistDown', chance: 8, values: [2, 2, 2, 3, 3, 3, 4, 4, 4, 5] },
      { id: 'ignoreResistKnockback', chance: 8, values: [2, 2, 2, 3, 3, 3, 4, 4, 4, 5] },
      { id: 'ignoreResistStun', chance: 8, values: [2, 2, 2, 3, 3, 3, 4, 4, 4, 5] }
    ],
    
    // Legend rank stats
    legend: [
      { id: 'hp', chance: 11, values: [18, 27, 36, 45, 54, 63, 72, 81, 90, 100] },
      { id: 'defense', chance: 9, values: [8, 10, 12, 14, 16, 18, 21, 24, 27, 30] },
      { id: 'attackRate', chance: 7, values: [16, 24, 32, 40, 48, 56, 64, 72, 80, 90] },
      { id: 'defenseRate', chance: 7, values: [14, 21, 28, 35, 42, 49, 56, 63, 70, 80] },
      { id: 'ignoreEvasion', chance: 6, values: [16, 24, 32, 40, 48, 56, 64, 72, 80, 90] },
      { id: 'accuracy', chance: 5, values: [14, 21, 28, 35, 42, 49, 56, 63, 70, 80] },
      { id: 'ignoreDamageReduction', chance: 12, values: [6, 9, 12, 15, 18, 21, 24, 27, 30, 35] },
      { id: 'cancelIgnorePenetration', chance: 2, values: [2, 3, 4, 5, 7, 9, 11, 13, 15, 18] },
      { id: 'cancelIgnoreDamageReduction', chance: 10, values: [6, 9, 12, 15, 18, 21, 24, 27, 30, 35] },
      { id: 'allAttackUp', chance: 6, values: [8, 10, 12, 14, 16, 18, 21, 24, 27, 30] },
      { id: 'ignoreResistCriticalDamage', chance: 5, values: [2, 3, 3, 4, 4, 5, 5, 6, 7, 8] },
      { id: 'resistSuppression', chance: 10, values: [1, 1, 1, 1, 1, 2, 2, 2, 2, 2] },
      { id: 'resistSilence', chance: 10, values: [1, 1, 1, 1, 1, 2, 2, 2, 2, 2] }
    ]
  }
};

export default HonorMedalData;