/**
 * Epaulets Data for Equipment System
 * Contains definitions for epaulet items and their stats
 * Epaulets have fixed stats and no upgrades
 */

export interface EpauletStats {
  hp?: number;
  attack?: number;
  magicAttack?: number;
  defense?: number;
  criticalRate?: number;
  criticalDamage?: number;
  allSkillAmp?: number;
  allAttackUp?: number;
  damageReduction?: number;
  attackRate?: number;
  magicSkillAmp?: number;
  swordSkillAmp?: number;
  resistCriticalRate?: number;
  resistSkillAmp?: number;
  resistCriticalDamage?: number;
  resistKnockback?: number;
  resistDown?: number;
  resistStun?: number;
  evasion?: number;
  defenseRate?: number;
  ignorePenetration?: number;
  resistSilence?: number;
  resistSuppression?: number;
}

export interface Epaulet {
  id: string;
  name: string;
  type: 'accessory';
  subtype: 'epaulet';
  grade: 'ultimate' | 'highest' | 'high';
  imagePath: string;
  baseStats: EpauletStats;
  maxSlots: number;
  requiredLevel?: number; // Optional required level
}

// Type guard to check if an item is an epaulet
export const isEpaulet = (item: any): item is Epaulet => {
  return item && item.type === 'accessory' && item.subtype === 'epaulet';
};

/**
 * All available epaulets in the game
 */
export const epaulets: Epaulet[] = [
  {
    id: 'demonite_epaulet_of_sage',
    name: 'Demonite Epaulet of Sage',
    type: 'accessory',
    subtype: 'epaulet',
    grade: 'ultimate',
    imagePath: '/images/equipment-system/epaulets/demonite_epaulet_of_sage.png',
    baseStats: {
      magicAttack: 200,
      attackRate: 320,
      magicSkillAmp: 12,
      hp: 550
    },
    maxSlots: 0
  },
  {
    id: 'demonite_epaulet_of_fighter',
    name: 'Demonite Epaulet of Fighter',
    type: 'accessory',
    subtype: 'epaulet',
    grade: 'ultimate',
    imagePath: '/images/equipment-system/epaulets/demonite_epaulet_of_fighter.png',
    baseStats: {
      attack: 180,
      attackRate: 300,
      swordSkillAmp: 11,
      hp: 500
    },
    maxSlots: 0
  },
  {
    id: 'demonite_epaulet_of_laws',
    name: 'Demonite Epaulet of Laws',
    type: 'accessory',
    subtype: 'epaulet',
    grade: 'ultimate',
    imagePath: '/images/equipment-system/epaulets/demonite_epaulet_of_laws.png',
    baseStats: {
      defense: 205,
      resistCriticalRate: 11,
      resistSkillAmp: 9,
      hp: 900,
      resistCriticalDamage: 15,
      resistKnockback: 4,
      resistDown: 4,
      resistStun: 4
    },
    maxSlots: 0
  },
  {
    id: 'palladium_epaulet_of_sage',
    name: 'Palladium Epaulet of Sage',
    type: 'accessory',
    subtype: 'epaulet',
    grade: 'ultimate',
    imagePath: '/images/equipment-system/epaulets/palladium-epaulet-sage.png',
    baseStats: {
      magicAttack: 150,
      attackRate: 240,
      magicSkillAmp: 9,
      hp: 450
    },
    maxSlots: 0
  },
  {
    id: 'palladium_epaulet_of_fighter',
    name: 'Palladium Epaulet of Fighter',
    type: 'accessory',
    subtype: 'epaulet',
    grade: 'ultimate',
    imagePath: '/images/equipment-system/epaulets/palladium-epaulet-fighter.png',
    baseStats: {
      attack: 150,
      attackRate: 240,
      swordSkillAmp: 9,
      hp: 450
    },
    maxSlots: 0
  },
  {
    id: 'palladium_epaulet_of_laws',
    name: 'Palladium Epaulet of Laws',
    type: 'accessory',
    subtype: 'epaulet',
    grade: 'ultimate',
    imagePath: '/images/equipment-system/epaulets/palladium-epaulet-of-laws.png',
    baseStats: {
      defense: 180,
      resistCriticalRate: 10,
      resistSkillAmp: 9,
      hp: 700,
      resistCriticalDamage: 20,
      resistKnockback: 3,
      resistDown: 3,
      resistStun: 3
    },
    maxSlots: 0
  },
  {
    id: 'dragonium_epaulet_of_guardian',
    name: 'Dragonium Epaulet of Guardian',
    type: 'accessory',
    subtype: 'epaulet',
    grade: 'ultimate',
    imagePath: '/images/equipment-system/epaulets/dragonium_epaulet_of_guardian.png',
    baseStats: {
      defense: 320,
      defenseRate: 290,
      evasion: 750,
      hp: 1300,
      damageReduction: 50,
      ignorePenetration: 35,
      resistSilence: 5,
      resistSuppression: 5
    },
    maxSlots: 0,
    requiredLevel: 185
  },
  {
    id: 'dragonium_epaulet_of_laws',
    name: 'Dragonium Epaulet of Laws',
    type: 'accessory',
    subtype: 'epaulet',
    grade: 'ultimate',
    imagePath: '/images/equipment-system/epaulets/dragonium_epaulet_of_laws.png',
    baseStats: {
      defense: 240,
      resistCriticalRate: 12,
      resistSkillAmp: 15,
      hp: 1300,
      resistCriticalDamage: 40,
      resistKnockback: 5,
      resistDown: 5,
      resistStun: 5
    },
    maxSlots: 0,
    requiredLevel: 185
  }

];

/**
 * Get an epaulet by its ID
 */
export const getEpauletById = (id: string): Epaulet | undefined => {
  return epaulets.find(epaulet => epaulet.id === id);
};

/**
 * Get all epaulets
 */
export const getAllEpaulets = (): Epaulet[] => {
  return epaulets;
};