// Static data and configurations for Class System
import type { ClassInfo, CharacterClass } from '../types';

export const CHARACTER_CLASSES: Record<CharacterClass, ClassInfo> = {
  blader: {
    id: 'blader',
    name: 'Blader',
    description: 'A swift warrior who excels in close combat with blade mastery.',
    icon: '/images/classes/blader_icon.png'
  },
  wizard: {
    id: 'wizard',
    name: 'Wizard',
    description: 'A master of elemental magic with devastating spell power.',
    icon: '/images/classes/wizard_icon.png'
  },
  warrior: {
    id: 'warrior',
    name: 'Warrior',
    description: 'A sturdy fighter with high defense and melee prowess.',
    icon: '/images/classes/warrior_icon.png'
  },
  gladiator: {
    id: 'gladiator',
    name: 'Gladiator',
    description: 'A fierce combatant specializing in dual-wielding weapons.',
    icon: '/images/classes/gladiator_icon.png'
  },
  dark_mage: {
    id: 'dark_mage',
    name: 'Dark Mage',
    description: 'A wielder of dark magic with powerful curse abilities.',
    icon: '/images/classes/dark_mage_icon.png'
  },
  force_archer: {
    id: 'force_archer',
    name: 'Force Archer',
    description: 'A ranged specialist with enhanced archery skills.',
    icon: '/images/classes/force_archer_icon.png'
  },
  force_gunner: {
    id: 'force_gunner',
    name: 'Force Gunner',
    description: 'A firearms expert with advanced shooting techniques.',
    icon: '/images/classes/force_gunner_icon.png'
  },
  force_blader: {
    id: 'force_blader',
    name: 'Force Blader',
    description: 'A hybrid warrior combining blade skills with force powers.',
    icon: '/images/classes/force_blader_icon.png'
  },
  force_shielder: {
    id: 'force_shielder',
    name: 'Force Shielder',
    description: 'A defensive specialist with shield mastery and protection abilities.',
    icon: '/images/classes/force_shielder_icon.png'
  }
};

export const CLASS_LIST: ClassInfo[] = Object.values(CHARACTER_CLASSES);

// Export class scaling data
export * from './classScaling';