import { ConsumableItem } from '../types';

export const potionsData: ConsumableItem[] = [
  // Type 1 Potions - Only 1 can be active at a time
  {
    id: 'penetration-potion-200',
    name: 'Penetration +200',
    description: 'Increases Penetration.',
    icon: '/images/other icons/buffs_potions/penetration_potion.png',
    group: 'type-1-potions',
    stats: {
      penetration: 200
    },
    category: 'potion'
  },
  {
    id: 'penetration-potion-250',
    name: 'Penetration +250',
    description: 'Increases Penetration.',
    icon: '/images/other icons/buffs_potions/penetration_potion.png',
    group: 'type-1-potions',
    stats: {
      penetration: 250
    },
    category: 'potion'
  },
  {
    id: 'crit-elixir',
    name: 'Critical Elixir',
    description: '',
    icon: '/images/other icons/buffs_potions/holy_water_critical.png',
    group: 'type-1-potions',
    stats: {
      criticalDamage: 85
    },
    category: 'potion'
  },
  {
    id: 'physical_elixir_lv3',
    name: 'Physical Elixir (Lv.3)',
    description: '',
    icon: '/images/other icons/buffs_potions/physical_elixir.png',
    group: 'type-1-potions',
    stats: {
      swordSkillAmp: 65
    },
    category: 'potion'
  },
  
  // Type 2 Potions - Max 2 can be active at a time, any combination except duplicates
  {
    id: 'penetration-potion-100',
    name: 'Penetration +100',
    description: 'Increases Penetration.',
    icon: '/images/other icons/buffs_potions/penetration_potion.png',
    group: 'type-2-potions',
    stats: {
      penetration: 100
    },
    category: 'potion'
  },
  {
    id: 'extreme-holy-water',
    name: 'Extreme Holy Water',
    description: 'Increases critical damage and critical rate.',
    icon: '/images/other icons/buffs_potions/holy_water.png',
    group: 'type-2-potions',
    stats: {
      criticalDamage: 14,
      criticalRate: 5
    },
    category: 'potion'
  },
  {
    id: 'holy-water-critical-strike',
    name: 'Holy Water of Critical Strike',
    description: 'Increases critical damage and critical rate.',
    icon: '/images/other icons/buffs_potions/holy_water_critical.png',
    group: 'type-2-potions',
    stats: {
      criticalDamage: 10,
      criticalRate: 5
    },
    category: 'potion'
  },
  {
    id: 'holy-water-sage',
    name: 'Holy Water of Sage',
    description: 'Increases magic attack, defense, and magic skill amplification.',
    icon: '/images/other icons/buffs_potions/holy_water_sage.png',
    group: 'type-2-potions',
    stats: {
      magicAttack: 30,
      defense: 30,
      magicSkillAmp: 5
    },
    category: 'potion'
  },
  {
    id: 'evasion-potion',
    name: 'Evasion Potion',
    description: 'Significantly increases evasion.',
    icon: '/images/other icons/buffs_potions/evasion_potion.png',
    group: 'type-2-potions',
    stats: {
      evasion: 7000
    },
    category: 'potion'
  },
  {
    id: 'holy-water-fighter',
    name: 'Holy Water of Fighter',
    description: 'Increases attack, defense, and sword skill amplification.',
    icon: '/images/other icons/buffs_potions/holy_water_fighter.png',
    group: 'type-2-potions',
    stats: {
      attack: 30,
      defense: 30,
      swordSkillAmp: 5
    },
    category: 'potion'
  },
  {
    id: 'heroic-holy-water',
    name: 'Heroic Holy Fwater',
    description: '',
    icon: '/images/other icons/buffs_potions/heroic_holy_water.png',
    group: 'type-2-potions',
    stats: {
      attack: 30,
      defense: 30,
      swordSkillAmp: 5
    },
    category: 'potion'
  },
  {
    id: 'accuracy-potion',
    name: 'Accuracy Potion',
    description: 'Increases accuracy.',
    icon: '/images/other icons/buffs_potions/accuracy_potion.png',
    group: 'type-2-potions',
    stats: {
      accuracy: 500
    },
    category: 'potion'
  },
  {
    id: 'damage-reduction-potion',
    name: 'Damage Reduction Potion',
    description: 'Reduces damage taken.',
    icon: '/images/other icons/buffs_potions/damage_reduction_potion.png',
    group: 'type-2-potions',
    stats: {
      damageReduction: 200
    },
    category: 'potion'
  }
];

// Helper function to get all potions in the same group
export const getPotionsInGroup = (groupName: string): ConsumableItem[] => {
  return potionsData.filter(potion => potion.group === groupName);
};

// Helper function to check if a potion belongs to a group
export const isGroupedPotion = (potion: ConsumableItem): boolean => {
  return potion.group !== undefined;
};

// Helper function to get Type 1 potions (only 1 can be active)
export const getType1Potions = (): ConsumableItem[] => {
  return getPotionsInGroup('type-1-potions');
};

// Helper function to get Type 2 potions (max 2 can be active)
export const getType2Potions = (): ConsumableItem[] => {
  return getPotionsInGroup('type-2-potions');
};

// Helper function to check if a potion is Type 1
export const isType1Potion = (potion: ConsumableItem): boolean => {
  return potion.group === 'type-1-potions';
};

// Helper function to check if a potion is Type 2
export const isType2Potion = (potion: ConsumableItem): boolean => {
  return potion.group === 'type-2-potions';
};