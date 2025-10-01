/**
 * Bracelets Data for Equipment System
 * Contains definitions for bracelet items with chaos upgrade system
 * Following the same pattern as earrings
 */

import { getBraceletChaosUpgradeStats } from './bracelets-chaos-upgrade';

export interface BraceletStats {
  hp?: number;
  mp?: number;
  attack?: number;
  magicAttack?: number;
  defense?: number;
  defenseRate?: number;
  evasion?: number;
  criticalRate?: number;
  criticalDamage?: number;
  accuracy?: number;
  penetration?: number;
  allSkillAmp?: number;
  swordSkillAmp?: number;
  magicSkillAmp?: number;
  resistCriticalDamage?: number;
  resistSkillAmp?: number;
  ignorePenetration?: number;
  resistCriticalRate?: number;
  maxHpStealPerHit?: number;
  maxMpStealPerHit?: number;
  allAttackUp?: number;
  normalDamageUp?: number;
  ignoreAccuracy?: number;
  attackRate?: number;
  ignoreResistCriticalDamage?: number;
  pveAllAttackUp?: number;
  ignoreDamageReduction?: number;
  maxCriticalRate?: number;
}

// Slot option for unique bracelets (separate from varying stats)
export interface SlotOption {
  statId: keyof BraceletStats;
  name: string;
  value: number;
}

// Selected slot for unique bracelets
export interface SelectedSlot {
  statId: keyof BraceletStats;
  value: number;
}

// Varying stat option for unique bracelets
export interface VaryingStatOption {
  statId: keyof BraceletStats;
  name: string;
  values: number[];
}

// Selected varying stat for unique bracelets
export interface SelectedVaryingStat {
  statId: keyof BraceletStats;
  value: number;
}

export interface Bracelet {
  id: string;
  name: string;
  type: 'bracelet';
  subtype: 'bracelet';
  grade: 'chaos' | 'highest' | 'high' | 'unique';
  imagePath: string;
  baseStats: BraceletStats;
  // Unique bracelet properties
  isUnique?: boolean;
  // Slot system (separate from varying stats)
  hasSlot?: boolean;
  maxSlots?: number;
  slotOptions?: SlotOption[];
  selectedSlot?: SelectedSlot;
  // Varying stats system
  varyingStatOptions?: VaryingStatOption[];
  maxVaryingStats?: number;
  selectedVaryingStats?: SelectedVaryingStat[];
  // Chaos upgrade properties
  hasChaosUpgrade?: boolean;
  chaosUpgradeLevel?: number;
  totalStats?: BraceletStats;
}

// Helper function to calculate the total stats for a bracelet
export const calculateBraceletStats = (bracelet: Bracelet): BraceletStats => {
  const totalStats: BraceletStats = { ...bracelet.baseStats };
  
  // Add slot stats if they exist
  if (bracelet.selectedSlot) {
    const currentValue = totalStats[bracelet.selectedSlot.statId] || 0;
    totalStats[bracelet.selectedSlot.statId] = currentValue + bracelet.selectedSlot.value;
  }
  
  // Add varying stats if they exist
  if (bracelet.selectedVaryingStats) {
    bracelet.selectedVaryingStats.forEach(varyingStat => {
      const currentValue = totalStats[varyingStat.statId] || 0;
      totalStats[varyingStat.statId] = currentValue + varyingStat.value;
    });
  }
  
  // Add chaos upgrade stats if they exist
  if (bracelet.hasChaosUpgrade && bracelet.chaosUpgradeLevel && bracelet.chaosUpgradeLevel > 0) {
    const chaosStats = getBraceletChaosUpgradeStats(bracelet.chaosUpgradeLevel);
    Object.entries(chaosStats).forEach(([statId, value]) => {
      if (value !== undefined) {
        const currentValue = totalStats[statId as keyof BraceletStats] || 0;
        totalStats[statId as keyof BraceletStats] = currentValue + value;
      }
    });
  }
  
  return totalStats;
};

// Helper function to create a configured bracelet
export const createConfiguredBracelet = (
  braceletId: string, 
  varyingStats?: SelectedVaryingStat[], 
  selectedSlot?: SelectedSlot
): Bracelet | undefined => {
  const bracelet = getBraceletById(braceletId);
  if (!bracelet) return undefined;

  const configuredBracelet = {
    ...bracelet,
    selectedVaryingStats: varyingStats || bracelet.selectedVaryingStats || [],
    selectedSlot: selectedSlot || bracelet.selectedSlot
  };

  const totalStats = calculateBraceletStats(configuredBracelet);

  return {
    ...configuredBracelet,
    totalStats
  };
};

// Helper function to create a copy of a bracelet with new varying stats and slot
export const createBraceletWithVaryingStats = (
  bracelet: Bracelet, 
  varyingStats: SelectedVaryingStat[], 
  selectedSlot?: SelectedSlot
): Bracelet => {
  return {
    ...bracelet,
    selectedVaryingStats: [...varyingStats],
    selectedSlot: selectedSlot || bracelet.selectedSlot
  };
};

// Helper functions
export const getBraceletById = (id: string): Bracelet | undefined => {
  return bracelets.find(bracelet => bracelet.id === id);
};

export const getAllBracelets = (): Bracelet[] => {
  return bracelets;
};

/**
 * All available bracelets in the game
 */
export const bracelets: Bracelet[] = [
  {
    id: 'sienna_bracelet',
    name: 'Sienna Bracelet',
    type: 'bracelet',
    subtype: 'bracelet',
    grade: 'unique',
    imagePath: '/images/equipment-system/bracelets/sienna bracelet.png',
    baseStats: {
      attack: 25,
      magicAttack: 25,
      maxCriticalRate: 1
    },
    isUnique: true,
    // Slot system (1 slot max)
    hasSlot: true,
    maxSlots: 1,
    slotOptions: [
      {
        statId: 'accuracy',
        name: 'Accuracy',
        value: 50
      },
      {
        statId: 'penetration',
        name: 'Penetration',
        value: 50
      }
    ],
    // Varying stats system (always 3 stats)
    maxVaryingStats: 3,
    varyingStatOptions: [
      {
        statId: 'allAttackUp',
        name: 'All Attack Up',
        values: [9, 14, 21]
      },
      {
        statId: 'criticalDamage',
        name: 'Crit Damage',
        values: [2, 5, 9]
      },
      {
        statId: 'allSkillAmp',
        name: 'All Skill Amp',
        values: [1, 2, 4]
      }
    ],
    selectedVaryingStats: [],
    hasChaosUpgrade: true,
    chaosUpgradeLevel: 0
  },
  {
    id: 'turmacans_bracelet_low',
    name: 'Turmacan\'s Bracelet (low)',
    type: 'bracelet',
    subtype: 'bracelet',
    grade: 'unique',
    imagePath: '/images/equipment-system/bracelets/turmacan_low.png',
    baseStats: {
      allAttackUp: 25,
      maxCriticalRate: 1,
      ignoreResistCriticalDamage: 1
    },
    isUnique: true,
    // Slot system (1 slot max)
    hasSlot: true,
    maxSlots: 1,
    slotOptions: [
      {
        statId: 'penetration',
        name: 'Penetration',
        value: 50
      },
      {
        statId: 'pveAllAttackUp',
        name: 'PvE All Attack Up',
        value: 140
      },
      {
        statId: 'ignoreDamageReduction',
        name: 'Ignore Dmg Reduce',
        value: 50
      }
    ],
    // Varying stats system (always 3 stats)
    maxVaryingStats: 3,
    varyingStatOptions: [
      {
        statId: 'criticalDamage',
        name: 'Crit Damage',
        values: [4, 6, 8]
      },
      {
        statId: 'allAttackUp',
        name: 'All Attack Up',
        values: [20, 30, 40]
      },
      {
        statId: 'allSkillAmp',
        name: 'All Skill Amp',
        values: [2, 3, 4]
      }
    ],
    selectedVaryingStats: [],
    hasChaosUpgrade: true,
    chaosUpgradeLevel: 0
  },
  {
    id: 'turmacans_bracelet_medium',
    name: 'Turmacan\'s Bracelet (medium)',
    type: 'bracelet',
    subtype: 'bracelet',
    grade: 'unique',
    imagePath: '/images/equipment-system/bracelets/turmacan_medium.png',
    baseStats: {
      allAttackUp: 30,
      maxCriticalRate: 1,
      ignoreResistCriticalDamage: 2
    },
    isUnique: true,
    // Slot system (1 slot max)
    hasSlot: true,
    maxSlots: 1,
    slotOptions: [
      {
        statId: 'penetration',
        name: 'Penetration',
        value: 50
      },
      {
        statId: 'pveAllAttackUp',
        name: 'PvE All Attack Up',
        value: 140
      },
      {
        statId: 'ignoreDamageReduction',
        name: 'Ignore Dmg Reduce',
        value: 50
      }
    ],
    // Varying stats system (always 3 stats)
    maxVaryingStats: 3,
    varyingStatOptions: [
      {
        statId: 'criticalDamage',
        name: 'Crit Damage',
        values: [6, 8, 10]
      },
      {
        statId: 'allAttackUp',
        name: 'All Attack Up',
        values: [30, 40, 50]
      },
      {
        statId: 'allSkillAmp',
        name: 'All Skill Amp',
        values: [3, 4, 5]
      }
    ],
    selectedVaryingStats: [],
    hasChaosUpgrade: true,
    chaosUpgradeLevel: 0
  },
  {
    id: 'turmacans_bracelet_high',
    name: 'Turmacan\'s Bracelet (high)',
    type: 'bracelet',
    subtype: 'bracelet',
    grade: 'unique',
    imagePath: '/images/equipment-system/bracelets/turmacan_high.png',
    baseStats: {
      allAttackUp: 40,
      maxCriticalRate: 1,
      ignoreResistCriticalDamage: 2
    },
    isUnique: true,
    // Slot system (1 slot max)
    hasSlot: true,
    maxSlots: 1,
    slotOptions: [
      {
        statId: 'penetration',
        name: 'Penetration',
        value: 50
      },
      {
        statId: 'pveAllAttackUp',
        name: 'PvE All Attack Up',
        value: 140
      },
      {
        statId: 'ignoreDamageReduction',
        name: 'Ignore Dmg Reduce',
        value: 50
      }
    ],
    // Varying stats system (always 3 stats)
    maxVaryingStats: 3,
    varyingStatOptions: [
      {
        statId: 'criticalDamage',
        name: 'Crit Damage',
        values: [8, 10, 13]
      },
      {
        statId: 'allAttackUp',
        name: 'All Attack Up',
        values: [40, 50, 60]
      },
      {
        statId: 'allSkillAmp',
        name: 'All Skill Amp',
        values: [4, 5, 6]
      }
    ],
    selectedVaryingStats: [],
    hasChaosUpgrade: true,
    chaosUpgradeLevel: 0
  },
  {
    id: 'prideus_bracelet',
    name: 'Prideus\' Bracelet',
    type: 'bracelet',
    subtype: 'bracelet',
    grade: 'unique',
    imagePath: '/images/equipment-system/bracelets/prideus-bracelet.png',
    baseStats: {
      attack: 22,
      magicAttack: 22,
      maxCriticalRate: 1
    },
    isUnique: true,
    // No slot system for this bracelet
    hasSlot: false,
    // Varying stats system (always 3 stats)
    maxVaryingStats: 3,
    varyingStatOptions: [
      {
        statId: 'allAttackUp',
        name: 'All Attack Up',
        values: [9, 14, 17]
      },
      {
        statId: 'criticalDamage',
        name: 'Crit Damage',
        values: [2, 5, 7]
      },
      {
        statId: 'allSkillAmp',
        name: 'All Skill Amp',
        values: [1, 2, 3]
      }
    ],
    selectedVaryingStats: [],
    hasChaosUpgrade: true,
    chaosUpgradeLevel: 0
  }
];

// Type guards
export const isBracelet = (item: any): item is Bracelet => {
  return item && item.type === 'bracelet';
};