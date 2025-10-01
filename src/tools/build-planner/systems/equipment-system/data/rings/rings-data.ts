/**
 * Rings Data for Equipment System
 * Contains definitions for ring items and their stats
 * Rings have fixed stats and no upgrades
 */

export interface RingStats {
  hp?: number;
  attack?: number;
  magicAttack?: number;
  attackRate?: number;
  accuracy?: number;
  criticalRate?: number;
  criticalDamage?: number;
  penetration?: number;
  allAttackUp?: number;
  allSkillAmp?: number;
  swordSkillAmp?: number;
  magicSkillAmp?: number;
  defense?: number;
  damageReduction?: number;
  ignoreResistCriticalDamage?: number;
  ignoreResistCriticalRate?: number;
  cancelIgnorePenetration?: number;
}

export interface Ring {
  id: string;
  name: string;
  type: 'ring';
  subtype: 'ring';
  grade: 'ultimate' | 'highest' | 'high';
  imagePath: string;
  baseStats: RingStats;
  maxSlots: number;
  requiredLevel?: number; // Optional required level
}

/**
 * All available rings in the game
 */
export const rings: Ring[] = [
  {
    id: 'ring_of_luck_1',
    name: 'Ring of Luck +1',
    type: 'ring',
    subtype: 'ring',
    grade: 'high',
    imagePath: '/images/equipment-system/rings/ring_of_luck_1.png',
    baseStats: {
      criticalRate: 10
    },
    maxSlots: 0
  },
  {
    id: 'ring_of_luck_2',
    name: 'Ring of Luck +2',
    type: 'ring',
    subtype: 'ring',
    grade: 'highest',
    imagePath: '/images/equipment-system/rings/ring_of_luck_2.png',
    baseStats: {
      criticalRate: 15
    },
    maxSlots: 0
  },
  {
    id: 'ring_of_luck_3',
    name: 'Ring of Luck +3',
    type: 'ring',
    subtype: 'ring',
    grade: 'ultimate',
    imagePath: '/images/equipment-system/rings/ring_of_luck_3.png',
    baseStats: {
      criticalRate: 17
    },
    maxSlots: 0
  },
  {
    id: "mergaheph's_ring",
    name: "Mergaheph's Ring",
    type: 'ring',
    subtype: 'ring',
    grade: 'ultimate',
    imagePath: '/images/equipment-system/rings/mergaheph.png',
    baseStats: {
      criticalRate: 15,
      criticalDamage: 1,
      hp: 10,
      magicAttack: 2,
      attack: 2
    },
    maxSlots: 0
  },
  {
    id: 'tempus_ring',
    name: 'Tempus Ring',
    type: 'ring',
    subtype: 'ring',
    grade: 'ultimate',
    imagePath: '/images/equipment-system/rings/tempus_ring.png',
    baseStats: {
      criticalRate: 16,
      criticalDamage: 5,
      penetration: 50,
      allAttackUp: 15,
      accuracy: 100,
      hp: 50
    },
    maxSlots: 0
  },
  {
    id: 'ring_of_dr_mazel',
    name: 'Ring of Dr. Mazel',
    type: 'ring',
    subtype: 'ring',
    grade: 'ultimate',
    imagePath: '/images/equipment-system/rings/ring_of_dr_mazel.png',
    baseStats: {
      criticalDamage: 18,
      allSkillAmp: 6,
      defense: 40,
      damageReduction: 30,
      penetration: 50,
      accuracy: 100,
      hp: 50,
      allAttackUp: 18
    },
    maxSlots: 0
  },
  {
    id: 'happy_birthday_ring',
    name: 'Happy Birthday Ring',
    type: 'ring',
    subtype: 'ring',
    grade: 'ultimate',
    imagePath: '/images/equipment-system/rings/happy ring.png',
    baseStats: {
      criticalDamage: 20,
      criticalRate: 15,
      swordSkillAmp: 10,
      magicSkillAmp: 10
    },
    maxSlots: 0
  },
  {
    id: "agent_yul_ring",
    name: "Agent Yul's Ring",
    type: 'ring',
    subtype: 'ring',
    grade: 'ultimate',
    imagePath: '/images/equipment-system/rings/agent-yul-ring.png',
    baseStats: {
      allAttackUp: 100,
      allSkillAmp: 14,
      criticalRate: 17
    },
    maxSlots: 0
  },
  {
    id: 'critical_ring_1',
    name: 'Critical Ring +1',
    type: 'ring',
    subtype: 'ring',
    grade: 'high',
    imagePath: '/images/equipment-system/rings/critical_ring_1.png',
    baseStats: {
      criticalDamage: 10
    },
    maxSlots: 0
  },
  {
    id: 'critical_ring_2',
    name: 'Critical Ring +2',
    type: 'ring',
    subtype: 'ring',
    grade: 'highest',
    imagePath: '/images/equipment-system/rings/critical_ring_2.png',
    baseStats: {
      criticalDamage: 15
    },
    maxSlots: 0
  },
  {
    id: 'critical_ring_3',
    name: 'Critical Ring +3',
    type: 'ring',
    subtype: 'ring',
    grade: 'ultimate',
    imagePath: '/images/equipment-system/rings/critical_ring_3.png',
    baseStats: {
      criticalDamage: 17
    },
    maxSlots: 0
  },
  {
    id: 'critical_ring_4',
    name: 'Critical Ring +4',
    type: 'ring',
    subtype: 'ring',
    grade: 'ultimate',
    imagePath: '/images/equipment-system/rings/critical_ring_4.png',
    baseStats: {
      criticalDamage: 20,
      ignoreResistCriticalDamage: 2
    },
    maxSlots: 0
  },
  {
    id: 'critical_ring_5',
    name: 'Critical Ring +5',
    type: 'ring',
    subtype: 'ring',
    grade: 'ultimate',
    imagePath: '/images/equipment-system/rings/critical_ring_5.png',
    baseStats: {
      criticalDamage: 25,
      ignoreResistCriticalDamage: 10,
      attackRate: 100,
      accuracy: 50
    },
    maxSlots: 0
  },
  {
    id: 'ring_of_luck_5',
    name: 'Ring of Luck +5',
    type: 'ring',
    subtype: 'ring',
    grade: 'ultimate',
    imagePath: '/images/equipment-system/rings/ring_of_luck_5.png',
    baseStats: {
      criticalRate: 17,
      allAttackUp: 60,
      cancelIgnorePenetration: 20,
      ignoreResistCriticalRate: 1
    },
    maxSlots: 0
  },
  {
    id: 'ring_of_luck_4',
    name: 'Ring of Luck +4',
    type: 'ring',
    subtype: 'ring',
    grade: 'ultimate',
    imagePath: '/images/equipment-system/rings/ring_of_luck_4.png',
    baseStats: {
      criticalRate: 17,
      allAttackUp: 20,
      cancelIgnorePenetration: 5
    },
    maxSlots: 0
  },
  {
    id: 'killians_ring',
    name: "Killian's Ring",
    type: 'ring',
    subtype: 'ring',
    grade: 'ultimate',
    imagePath: '/images/equipment-system/rings/killians_ring.png',
    baseStats: {
      criticalRate: 16,
      criticalDamage: 3,
      hp: 15,
      magicAttack: 10,
      attack: 10
    },
    maxSlots: 0
  },
  {
    id: 'tyrants_ring',
    name: "Tyrant's Ring",
    type: 'ring',
    subtype: 'ring',
    grade: 'ultimate',
    imagePath: '/images/equipment-system/rings/tyrant-ring.png',
    baseStats: {
      criticalDamage: 15,
      swordSkillAmp: 2,
      magicSkillAmp: 2,
      defense: 20
    },
    maxSlots: 0
  },
  {
    id: 'awakened_tyrants_ring',
    name: "Awakened Tyrant's Ring",
    type: 'ring',
    subtype: 'ring',
    grade: 'ultimate',
    imagePath: '/images/equipment-system/rings/awakened_tyrants_ring.png',
    baseStats: {
      criticalDamage: 16,
      swordSkillAmp: 4,
      magicSkillAmp: 4,
      damageReduction: 20,
      accuracy: 50,
      hp: 20,
      allAttackUp: 15
    },
    maxSlots: 0
  }
];

/**
 * Get a ring by its ID
 */
export const getRingById = (id: string): Ring | undefined => {
  return rings.find(ring => ring.id === id);
};

/**
 * Get all rings
 */
export const getAllRings = (): Ring[] => {
  return rings;
};