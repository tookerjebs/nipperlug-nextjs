/**
 * Amulets Data for Equipment System
 * Contains definitions for amulet items with chaos upgrade system
 * Following the same pattern as earrings
 */

import { getAmuletChaosUpgradeStats } from './amulets-chaos-upgrade';

export interface AmuletStats {
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
  allAttackUpPercent?: number;
  normalDamageUp?: number;
  ignoreAccuracy?: number;
  maxCriticalRate?: number;
  auraDurationIncrease?: number;
}

// Slot option for unique amulets (separate from varying stats)
export interface SlotOption {
  statId: keyof AmuletStats;
  name: string;
  value: number;
}

// Selected slot for unique amulets
export interface SelectedSlot {
  statId: keyof AmuletStats;
  value: number;
}

// Varying stat option for unique amulets
export interface VaryingStatOption {
  statId: keyof AmuletStats;
  name: string;
  values: number[];
}

// Selected varying stat for unique amulets
export interface SelectedVaryingStat {
  statId: keyof AmuletStats;
  value: number;
}

export interface Amulet {
  id: string;
  name: string;
  type: 'amulet';
  subtype: 'amulet';
  grade: 'chaos' | 'highest' | 'high' | 'unique';
  imagePath: string;
  baseStats: AmuletStats;
  // Unique amulet properties
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
  totalStats?: AmuletStats;
}

// Helper function to calculate the total stats for an amulet
export const calculateAmuletStats = (amulet: Amulet): AmuletStats => {
  const totalStats: AmuletStats = { ...amulet.baseStats };
  
  // Add slot stats if they exist
  if (amulet.selectedSlot) {
    const currentValue = totalStats[amulet.selectedSlot.statId] || 0;
    totalStats[amulet.selectedSlot.statId] = currentValue + amulet.selectedSlot.value;
  }
  
  // Add varying stats if they exist
  if (amulet.selectedVaryingStats) {
    amulet.selectedVaryingStats.forEach(varyingStat => {
      const currentValue = totalStats[varyingStat.statId] || 0;
      totalStats[varyingStat.statId] = currentValue + varyingStat.value;
    });
  }
  
  // Add chaos upgrade stats if they exist
  if (amulet.hasChaosUpgrade && amulet.chaosUpgradeLevel && amulet.chaosUpgradeLevel > 0) {
    const chaosStats = getAmuletChaosUpgradeStats(amulet.chaosUpgradeLevel);
    Object.entries(chaosStats).forEach(([statId, value]) => {
      if (value !== undefined) {
        const currentValue = totalStats[statId as keyof AmuletStats] || 0;
        totalStats[statId as keyof AmuletStats] = currentValue + value;
      }
    });
  }
  
  return totalStats;
};

// Helper function to create a configured amulet
export const createConfiguredAmulet = (
  amuletId: string, 
  varyingStats?: SelectedVaryingStat[], 
  selectedSlot?: SelectedSlot
): Amulet | undefined => {
  const amulet = getAmuletById(amuletId);
  if (!amulet) return undefined;

  const configuredAmulet = {
    ...amulet,
    selectedVaryingStats: varyingStats || amulet.selectedVaryingStats || [],
    selectedSlot: selectedSlot || amulet.selectedSlot
  };

  const totalStats = calculateAmuletStats(configuredAmulet);

  return {
    ...configuredAmulet,
    totalStats
  };
};

// Helper function to create a copy of an amulet with new varying stats and slot
export const createAmuletWithVaryingStats = (
  amulet: Amulet, 
  varyingStats: SelectedVaryingStat[], 
  selectedSlot?: SelectedSlot
): Amulet => {
  return {
    ...amulet,
    selectedVaryingStats: [...varyingStats],
    // Use the passed selectedSlot value directly (undefined means no slot selected)
    selectedSlot
  };
};

// Helper functions
export const getAmuletById = (id: string): Amulet | undefined => {
  return amulets.find(amulet => amulet.id === id);
};

export const getAllAmulets = (): Amulet[] => {
  return amulets;
};

/**
 * All available amulets in the game
 */
export const amulets: Amulet[] = [
  {
    id: 'amulet_of_resist_1',
    name: 'Amulet of Resist +1',
    type: 'amulet',
    subtype: 'amulet',
    grade: 'chaos',
    imagePath: '/images/equipment-system/amulets/amulet_of_resist.png',
    baseStats: {
      defense: 20,
      resistCriticalDamage: 5,
      resistSkillAmp: 2,
      ignorePenetration: 20
    },
    hasChaosUpgrade: false,
    chaosUpgradeLevel: 0
  },
  {
    id: 'amulet_of_resist_2',
    name: 'Amulet of Resist +2',
    type: 'amulet',
    subtype: 'amulet',
    grade: 'chaos',
    imagePath: '/images/equipment-system/amulets/amulet_of_resist.png',
    baseStats: {
      defense: 40,
      resistCriticalDamage: 10,
      resistSkillAmp: 4,
      ignorePenetration: 30,
      maxCriticalRate: 1
    },
    hasChaosUpgrade: false,
    chaosUpgradeLevel: 0
  },
  {
    id: 'amulet_of_resist_3',
    name: 'Amulet of Resist +3',
    type: 'amulet',
    subtype: 'amulet',
    grade: 'chaos',
    imagePath: '/images/equipment-system/amulets/amulet_of_resist.png',
    baseStats: {
      defense: 60,
      resistCriticalDamage: 15,
      resistSkillAmp: 6,
      ignorePenetration: 40,
      maxCriticalRate: 2
    },
    hasChaosUpgrade: false,
    chaosUpgradeLevel: 0
  },
  {
    id: 'amulet_of_resist_4',
    name: 'Amulet of Resist +4',
    type: 'amulet',
    subtype: 'amulet',
    grade: 'chaos',
    imagePath: '/images/equipment-system/amulets/amulet_of_resist.png',
    baseStats: {
      defense: 80,
      resistCriticalDamage: 20,
      resistSkillAmp: 8,
      ignorePenetration: 50,
      maxCriticalRate: 3
    },
    hasChaosUpgrade: true,
    chaosUpgradeLevel: 0
  },
  {
    id: 'amulet_of_resist_5',
    name: 'Amulet of Resist +5',
    type: 'amulet',
    subtype: 'amulet',
    grade: 'chaos',
    imagePath: '/images/equipment-system/amulets/amulet_of_resist.png',
    baseStats: {
      defense: 100,
      resistCriticalDamage: 25,
      resistSkillAmp: 10,
      ignorePenetration: 60,
      maxCriticalRate: 4
    },
    hasChaosUpgrade: true,
    chaosUpgradeLevel: 0
  },
  {
    id: 'amulet_of_resist_6',
    name: 'Amulet of Resist +6',
    type: 'amulet',
    subtype: 'amulet',
    grade: 'chaos',
    imagePath: '/images/equipment-system/amulets/amulet_of_resist.png',
    baseStats: {
      defense: 125,
      resistCriticalDamage: 30,
      resistSkillAmp: 12,
      ignorePenetration: 70,
      maxCriticalRate: 4
    },
    hasChaosUpgrade: true,
    chaosUpgradeLevel: 0
  },
  {
    id: 'orphidias_amulet_low',
    name: 'Orphidia\'s Amulet (low)',
    type: 'amulet',
    subtype: 'amulet',
    grade: 'unique',
    imagePath: '/images/equipment-system/amulets/orphidia-amulet.png',
    baseStats: {
      defense: 20,
      evasion: 20,
      accuracy: 20,
      maxCriticalRate: 2
    },
    isUnique: true,
    // No slot system for this amulet (but structure supports it for future amulets)
    hasSlot: false,
    maxSlots: 0,
    slotOptions: [],
    // Varying stats system (always 3 stats)
    maxVaryingStats: 3,
    varyingStatOptions: [
      {
        statId: 'criticalDamage',
        name: 'Crit Damage',
        values: [2, 4, 6]
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
  },
  {
    id: 'orphidias_amulet_high',
    name: 'Orphidia\'s Amulet (high)',
    type: 'amulet',
    subtype: 'amulet',
    grade: 'unique',
    imagePath: '/images/equipment-system/amulets/orphidia-amulet.png',
    baseStats: {
      defense: 30,
      evasion: 60,
      accuracy: 60,
      maxCriticalRate: 4
    },
    isUnique: true,
    // No slot system for this amulet (but structure supports it for future amulets)
    hasSlot: false,
    maxSlots: 0,
    slotOptions: [],
    // Varying stats system (always 3 stats)
    maxVaryingStats: 3,
    varyingStatOptions: [
      {
        statId: 'criticalDamage',
        name: 'Crit Damage',
        values: [2, 4, 6]
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
  },
  {
    id: 'gaia_force_amulet_low',
    name: 'Gaia Force Amulet (low)',
    type: 'amulet',
    subtype: 'amulet',
    grade: 'unique',
    imagePath: '/images/equipment-system/amulets/orphidia-amulet.png', // Placeholder - using Orphidia's amulet icon temporarily
    baseStats: {
      allAttackUp: 5,
      defense: 35,
      evasion: 65,
      accuracy: 65,
      maxCriticalRate: 3
    },
    isUnique: true,
    // Slot system (max 1 slot)
    hasSlot: true,
    maxSlots: 1,
    slotOptions: [
      {
        statId: 'auraDurationIncrease',
        name: 'Aura Duration Increase',
        value: 6
      },
      {
        statId: 'allAttackUpPercent',
        name: 'All Attack Up %',
        value: 2
      }
    ],
    selectedSlot: undefined,
    // Varying stats system (always 3 stats)
    maxVaryingStats: 3,
    varyingStatOptions: [
      {
        statId: 'allSkillAmp',
        name: 'All Skill Amp',
        values: [1, 2, 3, 4]
      },
      {
        statId: 'criticalDamage',
        name: 'Crit DMG',
        values: [3, 5, 7, 9]
      }
    ],
    selectedVaryingStats: [],
    hasChaosUpgrade: true,
    chaosUpgradeLevel: 0
  },
  {
    id: 'gaia_force_amulet_medium',
    name: 'Gaia Force Amulet (medium)',
    type: 'amulet',
    subtype: 'amulet',
    grade: 'unique',
    imagePath: '/images/equipment-system/amulets/orphidia-amulet.png', // Placeholder - using Orphidia's amulet icon temporarily
    baseStats: {
      allAttackUp: 10,
      defense: 40,
      evasion: 85,
      accuracy: 85,
      maxCriticalRate: 4
    },
    isUnique: true,
    // Slot system (max 1 slot)
    hasSlot: true,
    maxSlots: 1,
    slotOptions: [
      {
        statId: 'auraDurationIncrease',
        name: 'Aura Duration Increase',
        value: 6
      },
      {
        statId: 'allAttackUpPercent',
        name: 'All Attack Up %',
        value: 2
      }
    ],
    selectedSlot: undefined,
    // Varying stats system (always 3 stats)
    maxVaryingStats: 3,
    varyingStatOptions: [
      {
        statId: 'allSkillAmp',
        name: 'All Skill Amp',
        values: [1, 2, 3, 4]
      },
      {
        statId: 'criticalDamage',
        name: 'Crit DMG',
        values: [3, 5, 7, 9]
      }
    ],
    selectedVaryingStats: [],
    hasChaosUpgrade: true,
    chaosUpgradeLevel: 0
  },
  {
    id: 'gaia_force_amulet_high',
    name: 'Gaia Force Amulet (high)',
    type: 'amulet',
    subtype: 'amulet',
    grade: 'unique',
    imagePath: '/images/equipment-system/amulets/orphidia-amulet.png', // Placeholder - using Orphidia's amulet icon temporarily
    baseStats: {
      allAttackUp: 35,
      defense: 80,
      evasion: 160,
      accuracy: 160,
      maxCriticalRate: 4
    },
    isUnique: true,
    // Slot system (max 1 slot)
    hasSlot: true,
    maxSlots: 1,
    slotOptions: [
      {
        statId: 'auraDurationIncrease',
        name: 'Aura Duration Increase',
        value: 6
      },
      {
        statId: 'allAttackUpPercent',
        name: 'All Attack Up %',
        value: 2
      }
    ],
    selectedSlot: undefined,
    // Varying stats system (always 3 stats)
    maxVaryingStats: 3,
    varyingStatOptions: [
      {
        statId: 'allSkillAmp',
        name: 'All Skill Amp',
        values: [4]
      },
      {
        statId: 'criticalDamage',
        name: 'Crit DMG',
        values: [7, 9]
      }
    ],
    selectedVaryingStats: [],
    hasChaosUpgrade: true,
    chaosUpgradeLevel: 0
  },
  {
    id: 'gaia_force_amulet_highest',
    name: 'Gaia Force Amulet (highest)',
    type: 'amulet',
    subtype: 'amulet',
    grade: 'unique',
    imagePath: '/images/equipment-system/amulets/orphidia-amulet.png', // Placeholder - using Orphidia's amulet icon temporarily
    baseStats: {
      allAttackUp: 70,
      defense: 120,
      evasion: 240,
      accuracy: 240,
      maxCriticalRate: 5
    },
    isUnique: true,
    // Slot system (max 1 slot)
    hasSlot: true,
    maxSlots: 1,
    slotOptions: [
      {
        statId: 'auraDurationIncrease',
        name: 'Aura Duration Increase',
        value: 6
      },
      {
        statId: 'allAttackUpPercent',
        name: 'All Attack Up %',
        value: 2
      }
    ],
    selectedSlot: undefined,
    // Varying stats system (always 3 stats)
    maxVaryingStats: 3,
    varyingStatOptions: [
      {
        statId: 'allSkillAmp',
        name: 'All Skill Amp',
        values: [5]
      },
      {
        statId: 'criticalDamage',
        name: 'Crit DMG',
        values: [9, 11]
      }
    ],
    selectedVaryingStats: [],
    hasChaosUpgrade: true,
    chaosUpgradeLevel: 0
  },
  {
    id: 'terra_force_amulet',
    name: 'Terra Force Amulet',
    type: 'amulet',
    subtype: 'amulet',
    grade: 'unique',
    imagePath: '/images/equipment-system/amulets/orphidia-amulet.png', // Placeholder - using Orphidia's amulet icon temporarily
    baseStats: {
      allAttackUp: 35,
      defense: 80,
      evasion: 160,
      accuracy: 160,
      maxCriticalRate: 4
    },
    isUnique: true,
    // Slot system (max 1 slot)
    hasSlot: true,
    maxSlots: 1,
    slotOptions: [
      {
        statId: 'auraDurationIncrease',
        name: 'Aura Duration Increase',
        value: 6
      },
      {
        statId: 'allAttackUpPercent',
        name: 'All Attack Up %',
        value: 2
      }
    ],
    selectedSlot: undefined,
    // Varying stats system (always 3 stats)
    maxVaryingStats: 3,
    varyingStatOptions: [
      {
        statId: 'allSkillAmp',
        name: 'All Skill Amp',
        values: [3, 4]
      },
      {
        statId: 'criticalDamage',
        name: 'Crit DMG',
        values: [5, 7, 9]
      }
    ],
    selectedVaryingStats: [],
    hasChaosUpgrade: true,
    chaosUpgradeLevel: 0
  },
  {
    id: 'amulet_of_pain_3',
    name: 'Amulet of Pain +3',
    type: 'amulet',
    subtype: 'amulet',
    grade: 'chaos',
    imagePath: '/images/equipment-system/amulets/amulet-of-pain.png',
    baseStats: {
      defense: 16,
      maxCriticalRate: 4
    },
    hasChaosUpgrade: true,
    chaosUpgradeLevel: 0
  },
  {
    id: 'amulet_of_pain_4',
    name: 'Amulet of Pain +4',
    type: 'amulet',
    subtype: 'amulet',
    grade: 'chaos',
    imagePath: '/images/equipment-system/amulets/amulet-of-pain.png',
    baseStats: {
      defense: 16,
      defenseRate: 10,
      criticalDamage: 5,
      maxCriticalRate: 1
    },
    hasChaosUpgrade: true,
    chaosUpgradeLevel: 0
  },
  {
    id: 'amulet_of_pain_5',
    name: 'Amulet of Pain +5',
    type: 'amulet',
    subtype: 'amulet',
    grade: 'chaos',
    imagePath: '/images/equipment-system/amulets/amulet-of-pain.png',
    baseStats: {
      defense: 18,
      defenseRate: 20,
      criticalDamage: 5,
      maxCriticalRate: 2
    },
    hasChaosUpgrade: true,
    chaosUpgradeLevel: 0
  },
  {
    id: 'amulet_of_pain_6',
    name: 'Amulet of Pain +6',
    type: 'amulet',
    subtype: 'amulet',
    grade: 'chaos',
    imagePath: '/images/equipment-system/amulets/amulet-of-pain.png',
    baseStats: {
      defense: 20,
      defenseRate: 30,
      criticalDamage: 10,
      maxCriticalRate: 3
    },
    hasChaosUpgrade: true,
    chaosUpgradeLevel: 0
  },
];

// Type guards
export const isAmulet = (item: any): item is Amulet => {
  return item && item.type === 'amulet';
};