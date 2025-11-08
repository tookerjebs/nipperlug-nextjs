/**
 * Earrings Data for Equipment System
 * Contains definitions for earring items with chaos upgrade system
 * Starting with simple normal earrings, will expand to chaos upgrades later
 */

import { getEarringChaosUpgradeStats } from './earrings-chaos-upgrade';

export interface EarringStats {
  hp?: number;
  mp?: number;
  attack?: number;
  magicAttack?: number;
  defense?: number;
  defenseRate?: number; // Added for Drosnin's Earring
  evasion?: number; // Added for Earring of Guard +9
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
  maxHpStealPerHit?: number; // New stat for vampiric earring
  maxMpStealPerHit?: number; // New stat for vampiric earring
  ignoreDamageReduction?: number; // Added for Eroding Perius' Earring slot options
  damageReduction?: number; // Added for Ascending Perius' Earring
  ignoreAccuracy?: number; // Added for Ascending Perius' Earring
  allAttackUp?: number; // Added for Ascending Perius' Earring slot options
  normalDamageUp?: number; // Added for Ascending Perius' Earring slot options
}

// Slot option for unique earrings (separate from varying stats)
export interface SlotOption {
  statId: keyof EarringStats;
  name: string;
  value: number;
}

// Selected slot for unique earrings
export interface SelectedSlot {
  statId: keyof EarringStats;
  value: number;
}

// Varying stat option for unique earrings
export interface VaryingStatOption {
  statId: keyof EarringStats;
  name: string;
  values: number[];
}

// Selected varying stat for unique earrings
export interface SelectedVaryingStat {
  statId: keyof EarringStats;
  value: number;
}

// For now, we'll use a simple structure similar to rings
// Later we'll add chaos upgrades when we expand the system
export interface Earring {
  id: string;
  name: string;
  type: 'earring';
  subtype: 'earring';
  grade: 'chaos' | 'highest' | 'high' | 'unique';
  imagePath: string;
  baseStats: EarringStats;
  // Unique earring properties
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
  totalStats?: EarringStats;
}

// Helper function to calculate the total stats for an earring
export const calculateEarringStats = (earring: Earring): EarringStats => {
  const totalStats: EarringStats = { ...earring.baseStats };
  
  // Add slot stats if they exist
  if (earring.selectedSlot) {
    const currentValue = totalStats[earring.selectedSlot.statId] || 0;
    totalStats[earring.selectedSlot.statId] = currentValue + earring.selectedSlot.value;
  }
  
  // Add varying stats if they exist
  if (earring.selectedVaryingStats) {
    earring.selectedVaryingStats.forEach(varyingStat => {
      const currentValue = totalStats[varyingStat.statId] || 0;
      totalStats[varyingStat.statId] = currentValue + varyingStat.value;
    });
  }
  
  // Add chaos upgrade stats if they exist
  if (earring.hasChaosUpgrade && earring.chaosUpgradeLevel && earring.chaosUpgradeLevel > 0) {
    const chaosStats = getEarringChaosUpgradeStats(earring.chaosUpgradeLevel);
    Object.entries(chaosStats).forEach(([statId, value]) => {
      if (value !== undefined) {
        const currentValue = totalStats[statId as keyof EarringStats] || 0;
        totalStats[statId as keyof EarringStats] = currentValue + value;
      }
    });
  }
  
  return totalStats;
};

// Helper function to create a configured earring
export const createConfiguredEarring = (earringId: string, varyingStats?: SelectedVaryingStat[]): Earring | undefined => {
  const earring = getEarringById(earringId);
  if (!earring) return undefined;

  const configuredEarring = {
    ...earring,
    selectedVaryingStats: varyingStats || earring.selectedVaryingStats || []
  };

  const totalStats = calculateEarringStats(configuredEarring);

  return {
    ...configuredEarring,
    totalStats
  };
};

// Helper function to create a copy of an earring with new varying stats and slot
export const createEarringWithVaryingStats = (
  earring: Earring, 
  varyingStats: SelectedVaryingStat[], 
  selectedSlot?: SelectedSlot
): Earring => {
  return {
    ...earring,
    selectedVaryingStats: [...varyingStats],
    // Use the passed selectedSlot value directly (undefined means no slot selected)
    selectedSlot
  };
};

// Helper functions
export const getEarringById = (id: string): Earring | undefined => {
  return earrings.find(earring => earring.id === id);
};

export const getAllEarrings = (): Earring[] => {
  return earrings;
};

/**
 * All available earrings in the game
 */
export const earrings: Earring[] = [
  {
    id: 'vampiric_earring_plus6',
    name: 'Vampiric Earring +6',
    type: 'earring',
    subtype: 'earring',
    grade: 'chaos',
    imagePath: '/images/equipment-system//earrings/vampiric-earrings-6.png', // Using placeholder as requested
    baseStats: {
      maxHpStealPerHit: 45
    },
    hasChaosUpgrade: true,
    chaosUpgradeLevel: 0
  },
  {
    id: 'drosnins_earring',
    name: 'Drosnin\'s Earring',
    type: 'earring',
    subtype: 'earring',
    grade: 'unique',
    imagePath: '/images/equipment-system/earrings/drosnin-earring.png',
    baseStats: {
      defense: 17,
      defenseRate: 100
    },
    isUnique: true,
    maxVaryingStats: 3,
    varyingStatOptions: [
      {
        statId: 'defense',
        name: 'Defense',
        values: [10, 20, 30]
      },
      {
        statId: 'hp',
        name: 'HP',
        values: [20, 35, 50]
      },
      {
        statId: 'maxHpStealPerHit',
        name: 'Max HP Steal',
        values: [10, 15, 20]
      }
    ],
    selectedVaryingStats: [],
    hasChaosUpgrade: true,
    chaosUpgradeLevel: 0
  },
  {
    id: 'vampiric_earring_plus9',
    name: 'Vampiric Earring +9',
    type: 'earring',
    subtype: 'earring',
    grade: 'chaos',
    imagePath: '/images/equipment-system/earrings/vampiric-earrings-9.png',
    baseStats: {
      maxHpStealPerHit: 55,
      maxMpStealPerHit: 55,
      hp: 90,
      mp: 90
    },
    hasChaosUpgrade: true,
    chaosUpgradeLevel: 0
  },
  {
    id: 'earring_of_guard_plus9',
    name: 'Earring of Guard +9',
    type: 'earring',
    subtype: 'earring',
    grade: 'chaos',
    imagePath: '/images/equipment-system/earrings/earring-of-guard-9.png',
    baseStats: {
      defense: 30,
      defenseRate: 50,
      evasion: 600
    },
    hasChaosUpgrade: true,
    chaosUpgradeLevel: 0
  },
  {
    id: 'defensive_earring_plus8',
    name: 'Defensive Earring +8',
    type: 'earring',
    subtype: 'earring',
    grade: 'chaos',
    imagePath: '/images/equipment-system/earrings/defensive earring.png',
    baseStats: {
      defense: 180,
      defenseRate: 180,
      ignorePenetration: 30
    },
    hasChaosUpgrade: true,
    chaosUpgradeLevel: 0
  },
  {
    id: 'agent_yul_earring',
    name: 'Agent Yul Earring',
    type: 'earring',
    subtype: 'earring',
    grade: 'chaos',
    imagePath: '/images/equipment-system/earrings/agent-yul-earring.png',
    baseStats: {
      hp: 300,
      defense: 100,
      defenseRate: 150,
      maxHpStealPerHit: 100
    },
    hasChaosUpgrade: true,
    chaosUpgradeLevel: 0
  },
  {
    id: 'eroding_perious_earring_low',
    name: 'Eroding Perius\' Earring (low)',
    type: 'earring',
    subtype: 'earring',
    grade: 'unique',
    imagePath: '/images/equipment-system/earrings/eroding-perius-earring.png',
    baseStats: {
      resistCriticalRate: 1,
      hp: 60,
      resistSkillAmp: 1
    },
    isUnique: true,
    // Slot system (1 slot max)
    hasSlot: true,
    maxSlots: 1,
    slotOptions: [
      {
        statId: 'defense',
        name: 'Defense',
        value: 160
      },
      {
        statId: 'ignoreDamageReduction',
        name: 'Cancel Ignore Dmg Reduce',
        value: 60
      }
    ],
    // Varying stats system (always 3 stats, but all the same stat type)
    maxVaryingStats: 3,
    varyingStatOptions: [
      {
        statId: 'ignorePenetration',
        name: 'Ignore Penetration',
        values: [-8, 8, 11, 14, 18]
      }
    ],
    selectedVaryingStats: [],
    hasChaosUpgrade: true,
    chaosUpgradeLevel: 0
  },
  {
    id: 'eroding_perious_earring_medium',
    name: 'Eroding Perius\' Earring (medium)',
    type: 'earring',
    subtype: 'earring',
    grade: 'unique',
    imagePath: '/images/equipment-system/earrings/eroding-perius-earring.png',
    baseStats: {
      resistCriticalRate: 1,
      hp: 120,
      resistSkillAmp: 2
    },
    isUnique: true,
    // Slot system (1 slot max)
    hasSlot: true,
    maxSlots: 1,
    slotOptions: [
      {
        statId: 'defense',
        name: 'Defense',
        value: 160
      },
      {
        statId: 'ignoreDamageReduction',
        name: 'Cancel Ignore Dmg Reduce',
        value: 60
      }
    ],
    // Varying stats system (always 3 stats, but all the same stat type)
    maxVaryingStats: 3,
    varyingStatOptions: [
      {
        statId: 'ignorePenetration',
        name: 'Ignore Penetration',
        values: [-8, 8, 11, 14, 18, 23]
      }
    ],
    selectedVaryingStats: [],
    hasChaosUpgrade: true,
    chaosUpgradeLevel: 0
  },
  {
    id: 'eroding_perious_earring_high',
    name: 'Eroding Perius\' Earring (high)',
    type: 'earring',
    subtype: 'earring',
    grade: 'unique',
    imagePath: '/images/equipment-system/earrings/eroding-perius-earring.png',
    baseStats: {
      resistCriticalRate: 1,
      hp: 200,
      resistSkillAmp: 3
    },
    isUnique: true,
    // Slot system (1 slot max)
    hasSlot: true,
    maxSlots: 1,
    slotOptions: [
      {
        statId: 'defense',
        name: 'Defense',
        value: 160
      },
      {
        statId: 'ignoreDamageReduction',
        name: 'Cancel Ignore Dmg Reduce',
        value: 60
      }
    ],
    // Varying stats system (always 3 stats, but all the same stat type)
    maxVaryingStats: 3,
    varyingStatOptions: [
      {
        statId: 'ignorePenetration',
        name: 'Ignore Penetration',
        values: [-8, 8, 11, 14, 18, 23, 30]
      }
    ],
    selectedVaryingStats: [],
    hasChaosUpgrade: true,
    chaosUpgradeLevel: 0
  },
  {
    id: 'ascending_perious_earring_low',
    name: 'Ascending Perius\' Earring (low)',
    type: 'earring',
    subtype: 'earring',
    grade: 'unique',
    imagePath: '/images/equipment-system/earrings/ascending-perius-earring.png',
    baseStats: {
      damageReduction: 9,
      defenseRate: 60,
      ignoreAccuracy: 90
    },
    isUnique: true,
    // Slot system (1 slot max)
    hasSlot: true,
    maxSlots: 1,
    slotOptions: [
      {
        statId: 'allAttackUp',
        name: 'All Attack Up',
        value: 120
      },
      {
        statId: 'normalDamageUp',
        name: 'Normal DMG Up',
        value: 15
      }
    ],
    // Varying stats system (always 3 stats, but all the same stat type)
    maxVaryingStats: 3,
    varyingStatOptions: [
      {
        statId: 'maxHpStealPerHit',
        name: 'Max HP Steal Per Hit',
        values: [-10, 10, 15, 20, 25]
      }
    ],
    selectedVaryingStats: [],
    hasChaosUpgrade: true,
    chaosUpgradeLevel: 0
  },
  {
    id: 'ascending_perious_earring_medium',
    name: 'Ascending Perius\' Earring (medium)',
    type: 'earring',
    subtype: 'earring',
    grade: 'unique',
    imagePath: '/images/equipment-system/earrings/ascending-perius-earring.png',
    baseStats: {
      damageReduction: 12,
      defenseRate: 90,
      ignoreAccuracy: 120
    },
    isUnique: true,
    // Slot system (1 slot max)
    hasSlot: true,
    maxSlots: 1,
    slotOptions: [
      {
        statId: 'allAttackUp',
        name: 'All Attack Up',
        value: 120
      },
      {
        statId: 'normalDamageUp',
        name: 'Normal DMG Up',
        value: 15
      }
    ],
    // Varying stats system (always 3 stats, but all the same stat type)
    maxVaryingStats: 3,
    varyingStatOptions: [
      {
        statId: 'maxHpStealPerHit',
        name: 'Max HP Steal Per Hit',
        values: [-10, 10, 15, 20, 25, 30]
      }
    ],
    selectedVaryingStats: [],
    hasChaosUpgrade: true,
    chaosUpgradeLevel: 0
  },
  {
    id: 'ascending_perious_earring_high',
    name: 'Ascending Perius\' Earring (high)',
    type: 'earring',
    subtype: 'earring',
    grade: 'unique',
    imagePath: '/images/equipment-system/earrings/ascending-perius-earring.png',
    baseStats: {
      damageReduction: 15,
      defenseRate: 120,
      ignoreAccuracy: 150
    },
    isUnique: true,
    // Slot system (1 slot max)
    hasSlot: true,
    maxSlots: 1,
    slotOptions: [
      {
        statId: 'allAttackUp',
        name: 'All Attack Up',
        value: 120
      },
      {
        statId: 'normalDamageUp',
        name: 'Normal DMG Up',
        value: 15
      }
    ],
    // Varying stats system (always 3 stats, but all the same stat type)
    maxVaryingStats: 3,
    varyingStatOptions: [
      {
        statId: 'maxHpStealPerHit',
        name: 'Max HP Steal Per Hit',
        values: [-10, 10, 15, 20, 25, 30, 40]
      }
    ],
    selectedVaryingStats: [],
    hasChaosUpgrade: true,
    chaosUpgradeLevel: 0
  }
];

// Type guards
export const isEarring = (item: any): item is Earring => {
  return item && item.type === 'earring';
};