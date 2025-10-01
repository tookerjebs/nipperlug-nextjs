/**
 * Charm equipment data and helper functions
 */

import { BaseItem } from '../../components/upgrade-modals/GenericItemUpgradeModal';

export interface CharmStats {
  defense?: number;
  hp?: number;
  allAttackUp?: number;
  penetration?: number;
  ignorePenetration?: number;
  battleModeDurationIncrease?: number;
  allSkillAmp?: number;
  resistCriticalRate?: number;
  // Add other stats as needed
}

export interface CharmUpgrade {
  level: number;
  stats: CharmStats;
}

export interface Charm {
  id: string;
  name: string;
  type: 'charm';
  subtype: 'charm';
  grade: 'unique' | 'rare' | 'common';
  imagePath: string;
  baseStats: CharmStats;
  maxBaseLevel: number; // 7 for charms (renamed from maxUpgradeLevel)
  currentLevel?: number;
  upgrades: CharmUpgrade[];
  totalStats?: CharmStats;
}

export interface ConfiguredCharm extends Charm {
  currentLevel: number;
  totalStats: Record<string, number>; // Changed from CharmStats to Record<string, number> for compatibility
}

// Helper function to calculate total stats for a charm at a specific level
export const calculateCharmStats = (charm: Charm, level: number = 0): CharmStats => {
  if (level < 0 || level > charm.maxBaseLevel) {
    return { ...charm.baseStats };
  }

  // Upgrade stats contain total values, not incremental bonuses
  const upgradeStats = charm.upgrades.find(upgrade => upgrade.level === level)?.stats || {};
  return { ...upgradeStats };
};

// Helper function to create a configured charm with calculated stats
export const createConfiguredCharm = (charm: Charm, level: number = 0): ConfiguredCharm => {
  const charmStats = calculateCharmStats(charm, level);
  // Convert CharmStats to Record<string, number>
  const totalStats: Record<string, number> = {};
  Object.entries(charmStats).forEach(([key, value]) => {
    if (value !== undefined) {
      totalStats[key] = value;
    }
  });
  
  return {
    ...charm,
    currentLevel: level,
    totalStats
  };
};

// Type guard to check if an item is a charm
export const isCharm = (item: any): item is Charm => {
  return item && item.type === 'charm' && 'maxBaseLevel' in item && item.maxBaseLevel === 7;
};

// Get a charm by ID
export const getCharmById = (id: string): Charm | undefined => {
  return charms.find(charm => charm.id === id);
};

// Get all charms
export const getAllCharms = (): Charm[] => {
  return charms;
};

// Adapter functions to make charms work with GenericItemUpgradeModal
export const getAllCharmsAsBaseItems = (): Charm[] => {
  return charms; // Charms now implement BaseItem interface
};

export const createConfiguredCharmFromId = (itemId: string, level: number): ConfiguredCharm | undefined => {
  const charm = getCharmById(itemId);
  if (!charm) return undefined;
  return createConfiguredCharm(charm, level);
};

export const calculateCharmStatsAsRecord = (item: BaseItem, level: number): Record<string, number> => {
  // Cast BaseItem back to Charm since we know it's a charm in this context
  const charm = item as Charm;
  const stats = calculateCharmStats(charm, level);
  // Convert CharmStats to Record<string, number>
  const result: Record<string, number> = {};
  Object.entries(stats).forEach(([key, value]) => {
    if (value !== undefined) {
      result[key] = value;
    }
  });
  return result;
};

// Sample charm data
export const charms: Charm[] = [
  {
    id: 'amethyst_charm',
    name: 'Amethyst Charm',
    type: 'charm',
    subtype: 'charm',
    grade: 'rare',
    imagePath: '/images/equipment-system/charms/amethyst_charm.png',
    baseStats: {
      defense: 3,
      hp: 15,
      ignorePenetration: 20
    },
    maxBaseLevel: 7,
    upgrades: [
      { level: 0, stats: { defense: 3, hp: 15, ignorePenetration: 20 } },
      { level: 1, stats: { defense: 4, hp: 20, ignorePenetration: 20, allAttackUp: 7 } },
      { level: 2, stats: { defense: 5, hp: 25, ignorePenetration: 20, allAttackUp: 9 } },
      { level: 3, stats: { defense: 6, hp: 30, ignorePenetration: 20, allSkillAmp: 1, allAttackUp: 11 } },
      { level: 4, stats: { defense: 8, hp: 35, ignorePenetration: 40, allSkillAmp: 1, allAttackUp: 14 } },
      { level: 5, stats: { defense: 10, hp: 40, ignorePenetration: 40, battleModeDurationIncrease: 4, allSkillAmp: 2, allAttackUp: 15 } },
      { level: 6, stats: { defense: 12, hp: 45, ignorePenetration: 40, battleModeDurationIncrease: 6, allSkillAmp: 2, allAttackUp: 18 } },
      { level: 7, stats: { defense: 14, hp: 50, ignorePenetration: 60, battleModeDurationIncrease: 10, allSkillAmp: 3, allAttackUp: 21 } }
    ]
  },
  {
    id: 'sapphire_charm',
    name: 'Sapphire Charm',
    type: 'charm',
    subtype: 'charm',
    grade: 'rare',
    imagePath: '/images/equipment-system/charms/sapphire_charm.png',
    baseStats: {
      defense: 3,
      hp: 15,
      resistCriticalRate: 1
    },
    maxBaseLevel: 7,
    upgrades: [
      { level: 0, stats: { defense: 3, hp: 15, resistCriticalRate: 1 } },
      { level: 1, stats: { defense: 4, hp: 20, resistCriticalRate: 1, allAttackUp: 7 } },
      { level: 2, stats: { defense: 5, hp: 25, resistCriticalRate: 1, allAttackUp: 9 } },
      { level: 3, stats: { defense: 6, hp: 30, resistCriticalRate: 1, allSkillAmp: 1, allAttackUp: 11 } },
      { level: 4, stats: { defense: 8, hp: 35, resistCriticalRate: 2, allSkillAmp: 1, allAttackUp: 14 } },
      { level: 5, stats: { defense: 10, hp: 40, resistCriticalRate: 2, battleModeDurationIncrease: 4, allSkillAmp: 2, allAttackUp: 15 } },
      { level: 6, stats: { defense: 12, hp: 45, resistCriticalRate: 2, battleModeDurationIncrease: 6, allSkillAmp: 2, allAttackUp: 18 } },
      { level: 7, stats: { defense: 14, hp: 50, resistCriticalRate: 3, battleModeDurationIncrease: 10, allSkillAmp: 3, allAttackUp: 21 } }
    ]
  }
  
];