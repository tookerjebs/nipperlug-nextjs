/**
 * Karma Rune Data - Complete rune definitions ported from prototype
 * Contains all karma rune variants with their stats, costs, and materials
 * 
 * DUPLICATION NOTICE:
 * This file contains similar data structure to the essence rune data.
 * If making changes here, consider whether the same changes should be applied to:
 * src/tools/build-planner/systems/essence-rune/data/essenceRuneData.ts
 * 
 * Notable differences:
 * - Uses 'statType' instead of 'baseStatType' for the same concept
 */

export interface KarmaRune {
  id: string;
  name: string;
  tier: number;
  maxLevel: number;
  statType: string; // Maps to baseStatType from the original data
  category: 'offensive' | 'defensive' | 'utility';
  description?: string;
  location: string;
  valuePerLevel: number[];
  apCost: number[];
  runeCount?: number[]; // Some runes have rune count requirements
  materials: Array<{
    level: number;
    name: string | null;
    quantity: number;
  }>;
}

// Complete karma runes data ported from the correct source
export const karmaRunes: KarmaRune[] = [
  // HP Karma Rune
  {
    id: 'karmaHp',
    name: 'HP Karma Rune',
    tier: 1,
    maxLevel: 100,
    statType: 'hp',
    category: 'defensive',
    description: 'Increases maximum HP by 10 per level, up to 1000 HP at level 100',
    location: 'Karma Rune Dungeon, Karma Shop',
    valuePerLevel: Array.from({ length: 100 }, (_, i) => (i + 1) * 10),
    apCost: Array.from({ length: 100 }, (_, i) => Math.floor(3 + i * 1.5)),
    materials: []
  },

  // PvE All Attack Up
  {
    id: 'pveAllAttackUp',
    name: 'PvE All Attack Up',
    tier: 1,
    maxLevel: 15,
    statType: 'pveAllAttackUp',
    category: 'offensive',
    description: 'Increases all attack power in PvE',
    location: 'Karma Rune Dungeon, Karma Shop',
    valuePerLevel: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45],
    apCost: [500, 500, 500, 500, 500, 600, 600, 600, 600, 600, 700, 700, 700, 700, 700],
    runeCount: [1, 2, 3, 4, 5, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    materials: []
  },

  // PvP All Attack Up
  {
    id: 'pvpAllAttackUp',
    name: 'PvP All Attack Up',
    tier: 1,
    maxLevel: 15,
    statType: 'pvpAllAttackUp',
    category: 'offensive',
    description: 'Increases all attack power in PvP',
    location: 'Karma Rune Dungeon, Karma Shop',
    valuePerLevel: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45],
    apCost: [500, 500, 500, 500, 500, 600, 600, 600, 600, 600, 700, 700, 700, 700, 700],
    runeCount: [1, 2, 3, 4, 5, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18],
    materials: []
  },

  // PvP Resist Skill Amp
  {
    id: 'pvpResistSkillAmp',
    name: 'PvP Resist Skill Amp.',
    tier: 1,
    maxLevel: 5,
    statType: 'resistSkillAmp',
    category: 'defensive',
    description: 'Increases resistance to skill amplification in PvP',
    location: 'Karma Rune Dungeon, Karma Shop',
    valuePerLevel: [1, 2, 3, 4, 5],
    apCost: [700, 700, 700, 1200, 2200],
    runeCount: [0, 5, 7, 9, 11],
    materials: []
  },

  // PvE Attack Rate
  {
    id: 'pveAttackRate',
    name: 'PvE Attack Rate',
    tier: 1,
    maxLevel: 20,
    statType: 'attackRate',
    category: 'offensive',
    description: 'Increases attack rate in PvE',
    location: 'Karma Rune Dungeon, Karma Shop',
    valuePerLevel: [20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400],
    apCost: [400, 400, 500, 500, 500, 500, 500, 500, 500, 500, 600, 600, 600, 600, 600, 700, 700, 700, 700, 700],
    runeCount: [0, 0, 5, 5, 5, 10, 10, 10, 10, 10, 15, 15, 15, 15, 15, 20, 20, 20, 20, 20],
    materials: []
  },

  // PvE Defense Rate
  {
    id: 'pveDefenseRate',
    name: 'PvE Defense Rate',
    tier: 1,
    maxLevel: 20,
    statType: 'defenseRate',
    category: 'defensive',
    description: 'Increases defense rate in PvE',
    location: 'Karma Rune Dungeon, Karma Shop',
    valuePerLevel: [20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400],
    apCost: [400, 400, 500, 500, 500, 500, 500, 500, 500, 500, 600, 600, 600, 600, 600, 700, 700, 700, 700, 700],
    runeCount: [0, 0, 5, 5, 5, 10, 10, 10, 10, 10, 15, 15, 15, 15, 15, 20, 20, 20, 20, 20],
    materials: []
  },

  // PvP Attack Rate
  {
    id: 'pvpAttackRate',
    name: 'PvP Attack Rate',
    tier: 1,
    maxLevel: 20,
    statType: 'attackRate',
    category: 'offensive',
    description: 'Increases attack rate in PvP',
    location: 'Karma Rune Dungeon, Karma Shop',
    valuePerLevel: [20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400],
    apCost: [400, 400, 500, 500, 500, 500, 500, 500, 500, 500, 600, 600, 600, 600, 600, 700, 700, 700, 700, 700],
    runeCount: [0, 0, 5, 5, 5, 10, 10, 10, 10, 10, 15, 15, 15, 15, 15, 20, 20, 20, 20, 20],
    materials: []
  },

  // PvP Defense Rate
  {
    id: 'pvpDefenseRate',
    name: 'PvP Defense Rate',
    tier: 1,
    maxLevel: 20,
    statType: 'defenseRate',
    category: 'defensive',
    description: 'Increases defense rate in PvP',
    location: 'Karma Rune Dungeon, Karma Shop',
    valuePerLevel: [20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400],
    apCost: [400, 400, 500, 500, 500, 500, 500, 500, 500, 500, 600, 600, 600, 600, 600, 700, 700, 700, 700, 700],
    runeCount: [0, 0, 5, 5, 5, 10, 10, 10, 10, 10, 15, 15, 15, 15, 15, 20, 20, 20, 20, 20],
    materials: []
  }
];

// Helper functions
export const getRuneById = (id: string): KarmaRune | undefined => {
  return karmaRunes.find(rune => rune.id === id);
};

export const getRunesByCategory = (category: 'offensive' | 'defensive' | 'utility'): KarmaRune[] => {
  return karmaRunes.filter(rune => rune.category === category);
};

export const getRunesByTier = (tier: number): KarmaRune[] => {
  return karmaRunes.filter(rune => rune.tier === tier);
};

export const getRunesByStatType = (statType: string): KarmaRune[] => {
  return karmaRunes.filter(rune => rune.statType === statType);
};