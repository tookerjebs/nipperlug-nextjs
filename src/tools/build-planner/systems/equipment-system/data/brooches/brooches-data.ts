/**
 * Brooches Data for Equipment System
 * Contains definitions for brooch items without chaos upgrade system
 * Following the same pattern as amulets and bracelets but without chaos upgrades
 */

export interface BroochStats {
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
  // New stats specific to brooches
  cancelIgnorePenetration?: number;
  cancelIgnoreDamageReduction?: number;
  pvePenetration?: number;
  pveCriticalDamage?: number;
  pveAllSkillAmp?: number;
}

// Slot option for unique brooches (separate from varying stats)
export interface SlotOption {
  statId: keyof BroochStats;
  name: string;
  value: number;
}

// Selected slot for unique brooches
export interface SelectedSlot {
  statId: keyof BroochStats;
  value: number;
}

// Varying stat option for unique brooches
export interface VaryingStatOption {
  statId: keyof BroochStats;
  name: string;
  values: number[];
}

// Selected varying stat for unique brooches
export interface SelectedVaryingStat {
  statId: keyof BroochStats;
  value: number;
}

export interface Brooch {
  id: string;
  name: string;
  type: 'brooch';
  subtype: 'brooch';
  grade: 'chaos' | 'highest' | 'high' | 'unique';
  imagePath: string;
  baseStats: BroochStats;
  // Unique brooch properties
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
  totalStats?: BroochStats;
}

// Helper function to calculate the total stats for a brooch
export const calculateBroochStats = (brooch: Brooch): BroochStats => {
  const totalStats: BroochStats = { ...brooch.baseStats };
  
  // Add slot stats if they exist
  if (brooch.selectedSlot) {
    const currentValue = totalStats[brooch.selectedSlot.statId] || 0;
    totalStats[brooch.selectedSlot.statId] = currentValue + brooch.selectedSlot.value;
  }
  
  // Add varying stats if they exist
  if (brooch.selectedVaryingStats) {
    brooch.selectedVaryingStats.forEach(varyingStat => {
      const currentValue = totalStats[varyingStat.statId] || 0;
      totalStats[varyingStat.statId] = currentValue + varyingStat.value;
    });
  }
  
  return totalStats;
};

// Helper function to create a configured brooch
export const createConfiguredBrooch = (
  broochId: string, 
  varyingStats?: SelectedVaryingStat[], 
  selectedSlot?: SelectedSlot
): Brooch | undefined => {
  const brooch = getBroochById(broochId);
  if (!brooch) return undefined;

  const configuredBrooch = {
    ...brooch,
    selectedVaryingStats: varyingStats || brooch.selectedVaryingStats || [],
    selectedSlot: selectedSlot || brooch.selectedSlot
  };

  const totalStats = calculateBroochStats(configuredBrooch);

  return {
    ...configuredBrooch,
    totalStats
  };
};

// Helper function to create a copy of a brooch with new varying stats and slot
export const createBroochWithVaryingStats = (
  brooch: Brooch, 
  varyingStats: SelectedVaryingStat[], 
  selectedSlot?: SelectedSlot
): Brooch => {
  return {
    ...brooch,
    selectedVaryingStats: [...varyingStats],
    // Use the passed selectedSlot value directly (undefined means no slot selected)
    selectedSlot
  };
};

// Helper functions
export const getBroochById = (id: string): Brooch | undefined => {
  return brooches.find(brooch => brooch.id === id);
};

export const getAllBrooches = (): Brooch[] => {
  return brooches;
};

/**
 * All available brooches in the game
 */
export const brooches: Brooch[] = [
  {
    id: 'unique_brooch_low',
    name: 'Unique Brooch (Low)',
    type: 'brooch',
    subtype: 'brooch',
    grade: 'unique',
    imagePath: '/images/equipment-system/brooches/brooch-low.png',
    baseStats: {
      hp: 50,
      defense: 10,
      cancelIgnoreDamageReduction: 5,
      ignoreResistCriticalDamage: 1
    },
    isUnique: true,
    // Slot system (1 slot max)
    hasSlot: true,
    maxSlots: 1,
    slotOptions: [
      {
        statId: 'cancelIgnorePenetration',
        name: 'Cancel Ignore Penetration',
        value: 60
      },
      {
        statId: 'pveCriticalDamage',
        name: 'PvE Crit Damage',
        value: 30
      },
      {
        statId: 'cancelIgnoreDamageReduction',
        name: 'Cancel Ignore Damage Reduce',
        value: 70
      }
    ],
    // Varying stats system (always 3 stats)
    maxVaryingStats: 3,
    varyingStatOptions: [
      {
        statId: 'criticalDamage',
        name: 'Crit Damage',
        values: [3, 6, 10]
      },
      {
        statId: 'allAttackUp',
        name: 'All Attack Up',
        values: [17, 33, 55]
      },
      {
        statId: 'ignorePenetration',
        name: 'Ignore Penetration',
        values: [30, 45, 65]
      },
      {
        statId: 'pvePenetration',
        name: 'PvE Penetration',
        values: [9, 18, 31]
      },
      {
        statId: 'pveAllSkillAmp',
        name: 'PvE All Skill Amp',
        values: [2, 3, 6]
      }
    ],
    selectedVaryingStats: []
  },
  {
    id: 'unique_brooch_medium',
    name: 'Unique Brooch (Medium)',
    type: 'brooch',
    subtype: 'brooch',
    grade: 'unique',
    imagePath: '/images/equipment-system/brooches/placeholder.png',
    baseStats: {
      hp: 50,
      defense: 10,
      cancelIgnoreDamageReduction: 5,
      ignoreResistCriticalDamage: 1
    },
    isUnique: true,
    // Slot system (1 slot max)
    hasSlot: true,
    maxSlots: 1,
    slotOptions: [
      {
        statId: 'cancelIgnorePenetration',
        name: 'Cancel Ignore Penetration',
        value: 60
      },
      {
        statId: 'pveCriticalDamage',
        name: 'PvE Crit Damage',
        value: 30
      },
      {
        statId: 'cancelIgnoreDamageReduction',
        name: 'Cancel Ignore Damage Reduce',
        value: 70
      }
    ],
    // Varying stats system (always 3 stats)
    maxVaryingStats: 3,
    varyingStatOptions: [
      {
        statId: 'criticalDamage',
        name: 'Crit Damage',
        values: [4, 7, 12]
      },
      {
        statId: 'allAttackUp',
        name: 'All Attack Up',
        values: [20, 38, 62]
      },
      {
        statId: 'ignorePenetration',
        name: 'Ignore Penetration',
        values: [35, 52, 75]
      },
      {
        statId: 'pvePenetration',
        name: 'PvE Penetration',
        values: [11, 21, 36]
      },
      {
        statId: 'pveAllSkillAmp',
        name: 'PvE All Skill Amp',
        values: [2, 4, 7]
      }
    ],
    selectedVaryingStats: []
  },
  {
    id: 'unique_brooch_high',
    name: 'Unique Brooch (High)',
    type: 'brooch',
    subtype: 'brooch',
    grade: 'unique',
    imagePath: '/images/equipment-system/brooches/brooch-high.png',
    baseStats: {
      hp: 50,
      defense: 10,
      cancelIgnoreDamageReduction: 5,
      ignoreResistCriticalDamage: 1
    },
    isUnique: true,
    // Slot system (1 slot max)
    hasSlot: true,
    maxSlots: 1,
    slotOptions: [
      {
        statId: 'cancelIgnorePenetration',
        name: 'Cancel Ignore Penetration',
        value: 60
      },
      {
        statId: 'pveCriticalDamage',
        name: 'PvE Crit Damage',
        value: 30
      },
      {
        statId: 'cancelIgnoreDamageReduction',
        name: 'Cancel Ignore Damage Reduce',
        value: 70
      }
    ],
    // Varying stats system (always 3 stats)
    maxVaryingStats: 3,
    varyingStatOptions: [
      {
        statId: 'criticalDamage',
        name: 'Crit Damage',
        values: [5, 9, 15]
      },
      {
        statId: 'allAttackUp',
        name: 'All Attack Up',
        values: [25, 45, 75]
      },
      {
        statId: 'ignorePenetration',
        name: 'Ignore Penetration',
        values: [40, 60, 90]
      },
      {
        statId: 'pvePenetration',
        name: 'PvE Penetration',
        values: [13, 25, 42]
      },
      {
        statId: 'pveAllSkillAmp',
        name: 'PvE All Skill Amp',
        values: [3, 5, 8]
      }
    ],
    selectedVaryingStats: []
  }
];

// Type guards
export const isBrooch = (item: any): item is Brooch => {
  return item && item.type === 'brooch';
};