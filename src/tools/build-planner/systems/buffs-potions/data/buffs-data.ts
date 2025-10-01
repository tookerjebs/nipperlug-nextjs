import { ConsumableItem } from '../types';

// Buffs data - now all buffs are individual entries with optional groups for mutual exclusion
export const buffsData: ConsumableItem[] = [
  
  // GM Buff levels - each level as separate entry
  {
    id: 'gm-buff-1',
    name: 'GM Buff Lv.1',
    description: 'Special buff provided by Game Masters - Level 1.',
    icon: '/images/other icons/buffs_potions/gm_buff.png',
    group: 'gm-buff',
    stats: {
      hp: 200,
      defense: 40,
      attackRate: 100,
      defenseRate: 300,
      criticalDamage: 10,
      criticalRate: 5,
      maxHpStealPerHit: 3,
      hpAbsorb: 1,
      hpAutoHeal: 1,
      ignorePenetration: 15,
      damageReduction: 10,
      accuracy: 100,
      penetration: 10,
      allAttackUp: 25,
      allSkillAmp: 4
    },
    category: 'buff'
  },
  {
    id: 'gm-buff-2',
    name: 'GM Buff Lv.2',
    description: 'Special buff provided by Game Masters - Level 2.',
    icon: '/images/other icons/buffs_potions/gm_buff.png',
    group: 'gm-buff',
    stats: {
      attack: 100,
      defense: 100,
      hp: 400
    },
    category: 'buff'
  },
  {
    id: 'gm-buff-3',
    name: 'GM Buff Lv.3',
    description: 'Special buff provided by Game Masters - Level 3.',
    icon: '/images/other icons/buffs_potions/gm_buff.png',
    group: 'gm-buff',
    stats: {
      attack: 150,
      defense: 150,
      hp: 600,
      criticalRate: 2
    },
    category: 'buff'
  },
  {
    id: 'gm-buff-4',
    name: 'GM Buff Lv.4',
    description: 'Special buff provided by Game Masters - Level 4.',
    icon: '/images/other icons/buffs_potions/gm_buff.png',
    group: 'gm-buff',
    stats: {
      hp: 700,
      defense: 135,
      attackRate: 1800,
      defenseRate: 700,
      criticalDamage: 30,
      criticalRate: 6,
      maxHpStealPerHit: 15,
      maxCriticalRate: 1,
      hpAbsorb: 4,
      hpAutoHeal: 20,
      finalDamageIncreased: 1,
      finalDamageDecreased: 1,
      ignorePenetration: 80,
      damageReduction: 60,
      accuracy: 600,
      penetration: 70,
      allAttackUp: 120,
      allSkillAmp: 13
    },
    category: 'buff'
  },
  {
    id: 'gm-buff-5',
    name: 'GM Buff Lv.5',
    description: 'Special buff provided by Game Masters - Level 5.',
    icon: '/images/other icons/buffs_potions/gm_buff.png',
    group: 'gm-buff',
    stats: {
      hp: 1000,
      defense: 200,
      attackRate: 2500,
      defenseRate: 1000,
      criticalDamage: 40,
      criticalRate: 8,
      maxHpStealPerHit: 20,
      maxCriticalRate: 3,
      hpAbsorb: 5,
      hpAutoHeal: 25,
      finalDamageIncreased: 2,
      finalDamageDecreased: 2,
      ignorePenetration: 130,
      damageReduction: 80,
      accuracy: 1000,
      penetration: 120,
      allAttackUp: 180,
      allSkillAmp: 17
    },
    category: 'buff'
  },
  // Cube Seeker buffs - each level as separate entry
  {
    id: 'cube-seeker-1',
    name: 'Cube Seeker Lv.1',
    description: 'Passive skill buff that increases combat effectiveness.',
    icon: '/images/other icons/buffs_potions/cube_lv1.png',
    group: 'cube-seeker',
    stats: {
      hp: 100,
      defense: 25,
      attackRate: 100,
      criticalDamage: 1,
      allAttackUp: 20
    },
    category: 'buff'
  },
  {
    id: 'cube-seeker-2',
    name: 'Cube Seeker Lv.2',
    description: 'Passive skill buff that increases combat effectiveness.',
    icon: '/images/other icons/buffs_potions/cube_lv2.png',
    group: 'cube-seeker',
    stats: {
      hp: 200,
      defense: 50,
      attackRate: 200,
      criticalDamage: 2,
      allAttackUp: 40
    },
    category: 'buff'
  },
  {
    id: 'cube-seeker-3',
    name: 'Cube Seeker Lv.3',
    description: 'Passive skill buff that increases combat effectiveness.',
    icon: '/images/other icons/buffs_potions/cube_lv3.png',
    group: 'cube-seeker',
    stats: {
      hp: 300,
      defense: 75,
      attackRate: 300,
      criticalDamage: 3,
      allAttackUp: 60
    },
    category: 'buff'
  },
  
  // Platinum Buff levels - each level as separate entry
  {
    id: 'platinum-buff-normal',
    name: 'Platinum Buff (Normal)',
    description: 'Premium buff that provides enhanced combat capabilities.',
    icon: '/images/other icons/buffs_potions/platinum_normal.png',
    group: 'platinum-buff',
    stats: {
      hp: 300
    },
    category: 'buff'
  },
  {
    id: 'platinum-buff-rare',
    name: 'Platinum Buff (Rare)',
    description: 'Premium buff that provides enhanced combat capabilities.',
    icon: '/images/other icons/buffs_potions/platinum_rare.png',
    group: 'platinum-buff',
    stats: {
      hp: 300,
      defense: 30,
      damageReduction: 30,
      resistCriticalDamage: 10,
      resistSkillAmp: 3
    },
    category: 'buff'
  },
  {
    id: 'platinum-buff-unique',
    name: 'Platinum Buff (Unique)',
    description: 'Premium buff that provides enhanced combat capabilities.',
    icon: '/images/other icons/buffs_potions/platinum_unique.png',
    group: 'platinum-buff',
    stats: {
      hp: 300,
      defense: 30,
      attackRate: 100,
      criticalDamage: 3,
      damageReduction: 30,
      accuracy: 50,
      resistCriticalDamage: 10,
      resistSkillAmp: 3,
      allAttackUp: 30,
      allSkillAmp: 1
    },
    category: 'buff'
  }
];

// Helper function to get all buffs in the same group
export const getBuffsInGroup = (groupName: string): ConsumableItem[] => {
  return buffsData.filter(buff => buff.group === groupName);
};

// Helper function to check if a buff belongs to a group
export const isGroupedBuff = (buff: ConsumableItem): boolean => {
  return buff.group !== undefined;
};