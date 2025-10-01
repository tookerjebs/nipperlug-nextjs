import { TierListType } from './types';

// Tab configuration for tier list navigation
export const TIER_LIST_TABS: Array<{
  id: TierListType;
  label: string;
  description: string;
  icon: string;
}> = [
  {
    id: 'single-target',
    label: 'Single Target DPS',
    description: 'Maximum damage potential against single targets',
    icon: '⚔️'
  },
  {
    id: 'aoe',
    label: 'AoE Farming',
    description: 'Area-of-effect damage and farming efficiency',
    icon: '💥'
  },
  {
    id: 'nation-war',
    label: 'Nation War',
    description: 'PvP scenarios and nation war effectiveness',
    icon: '🛡️'
  },
  {
    id: 'bm3-only',
    label: 'BM3 Only',
    description: 'Battle Mode 3 damage rankings',
    icon: '⚡'
  },
  {
    id: 'bm2-only',
    label: 'BM2 Only',
    description: 'Battle Mode 2 damage rankings',
    icon: '🔥'
  }
];

// Tier color configuration
export const TIER_COLORS = {
  S: {
    bg: 'bg-gradient-to-r from-red-900/30 to-red-800/30',
    border: 'border-red-500/50',
    label: 'bg-red-600 text-white',
    hover: 'hover:from-red-900/40 hover:to-red-800/40'
  },
  'A+': {
    bg: 'bg-gradient-to-r from-orange-900/30 to-orange-800/30',
    border: 'border-orange-500/50',
    label: 'bg-orange-600 text-white',
    hover: 'hover:from-orange-900/40 hover:to-orange-800/40'
  },
  A: {
    bg: 'bg-gradient-to-r from-yellow-900/30 to-yellow-800/30',
    border: 'border-yellow-500/50',
    label: 'bg-yellow-600 text-white',
    hover: 'hover:from-yellow-900/40 hover:to-yellow-800/40'
  },
  B: {
    bg: 'bg-gradient-to-r from-green-900/30 to-green-800/30',
    border: 'border-green-500/50',
    label: 'bg-green-600 text-white',
    hover: 'hover:from-green-900/40 hover:to-green-800/40'
  },
  C: {
    bg: 'bg-gradient-to-r from-blue-900/30 to-blue-800/30',
    border: 'border-blue-500/50',
    label: 'bg-blue-600 text-white',
    hover: 'hover:from-blue-900/40 hover:to-blue-800/40'
  },
  D: {
    bg: 'bg-gradient-to-r from-purple-900/30 to-purple-800/30',
    border: 'border-purple-500/50',
    label: 'bg-purple-600 text-white',
    hover: 'hover:from-purple-900/40 hover:to-purple-800/40'
  },
  default: {
    bg: 'bg-gradient-to-r from-gray-900/30 to-gray-800/30',
    border: 'border-gray-500/50',
    label: 'bg-gray-600 text-white',
    hover: 'hover:from-gray-900/40 hover:to-gray-800/40'
  }
};

// Base class information (shared across all tier lists)
export const BASE_CLASSES = {
  'blader': {
    name: 'Blader',
    slug: 'blader',
    icon: '/images/classes/blader_icon.png'
  },
  'dark-mage': {
    name: 'Dark Mage',
    slug: 'dark-mager',
    icon: '/images/classes/dark_mage_icon.png'
  },
  'force-archer': {
    name: 'Force Archer',
    slug: 'force-archer',
    icon: '/images/classes/force_archer_icon.png'
  },
  'force-gunner': {
    name: 'Force Gunner',
    slug: 'force-gunner',
    icon: '/images/classes/force_gunner_icon.png'
  },
  'wizard': {
    name: 'Wizard',
    slug: 'wizard',
    icon: '/images/classes/wizard_icon.png'
  },
  'warrior': {
    name: 'Warrior',
    slug: 'warrior',
    icon: '/images/classes/warrior_icon.png'
  },
  'gladiator': {
    name: 'Gladiator',
    slug: 'gladiator',
    icon: '/images/classes/gladiator_icon.png'
  },
  'force-blader': {
    name: 'Force Blader',
    slug: 'force-blader',
    icon: '/images/classes/force_blader_icon.png'
  },
  'force-shielder': {
    name: 'Force Shielder',
    slug: 'force-shielder',
    icon: '/images/classes/force_shielder_icon.png'
  }
} as const;

export type ClassId = keyof typeof BASE_CLASSES;