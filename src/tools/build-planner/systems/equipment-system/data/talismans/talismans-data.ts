/**
 * Talismans Data for Equipment System
 * Contains definitions for talisman items and their stats
 * Talismans have base stats and upgradable levels
 */

export interface TalismanStats {
  hp?: number;
  defense?: number;
  allAttackUp?: number;
  resistSkillAmp?: number;
  maxHpStealPerHit?: number;
  allSkillAmp?: number;
  finalDamageReduce?: number;
  finalDamageIncreased?: number;
}

export interface TalismanUpgrade {
  level: number;
  stats: TalismanStats;
}

export interface Talisman {
  id: string;
  name: string;
  type: 'talisman';
  subtype: 'talisman';
  grade: 'chaos';
  imagePath: string;
  baseStats: TalismanStats;
  maxBaseLevel: number;
  currentLevel?: number;
  upgrades: TalismanUpgrade[];
  totalStats?: TalismanStats;
}

export interface ConfiguredTalisman extends Talisman {
  currentLevel: number;
  totalStats: TalismanStats;
}

// Helper function to calculate the total stats for a talisman at a specific level
export const calculateTalismanStats = (talisman: Talisman | undefined, level: number = 0): TalismanStats => {
  // Handle case where talisman is undefined
  if (!talisman) {
    return {};
  }
  
  if (level < 0 || level > talisman.maxBaseLevel) {
    return { ...talisman.baseStats };
  }

  const upgradeStats = level > 0 ? talisman.upgrades[level - 1]?.stats || {} : {};
  const totalStats: TalismanStats = { ...talisman.baseStats };

  // Combine base stats with upgrade stats
  Object.entries(upgradeStats).forEach(([stat, value]) => {
    const statKey = stat as keyof TalismanStats;
    totalStats[statKey] = (totalStats[statKey] || 0) + (value || 0);
  });

  return totalStats;
};

/**
 * All available talismans in the game
 */
export const talismans: Talisman[] = [
  {
    id: 'chaos_talisman',
    name: 'Chaos Talisman',
    type: 'talisman',
    subtype: 'talisman',
    grade: 'chaos',
    imagePath: '/images/equipment-system/talisman/talisman.png',
    baseStats: {
      hp: 50
    },
    maxBaseLevel: 10,
    upgrades: [
      // Level 1: +10 HP, +5 Defense
      {
        level: 1,
        stats: {
          hp: 10,
          defense: 5
        }
      },
      // Level 2: +20 HP, +10 Defense
      {
        level: 2,
        stats: {
          hp: 20,
          defense: 10
        }
      },
      // Level 3: +30 HP, +15 Defense, +5 All Attack Up
      {
        level: 3,
        stats: {
          hp: 30,
          defense: 15,
          allAttackUp: 5
        }
      },
      // Level 4: +40 HP, +20 Defense, +10 All Attack Up
      {
        level: 4,
        stats: {
          hp: 40,
          defense: 20,
          allAttackUp: 10
        }
      },
      // Level 5: +50 HP, +25 Defense, +15 All Attack Up, +2% Resist Skill Amp., +10 Max HP Steal per hit
      {
        level: 5,
        stats: {
          hp: 50,
          defense: 25,
          allAttackUp: 15,
          resistSkillAmp: 2,
          maxHpStealPerHit: 10
        }
      },
      // Level 6: +60 HP, +30 Defense, +20 All Attack Up, +3% Resist Skill Amp., +12 Max HP Steal per hit
      {
        level: 6,
        stats: {
          hp: 60,
          defense: 30,
          allAttackUp: 20,
          resistSkillAmp: 3,
          maxHpStealPerHit: 12
        }
      },
      // Level 7: +70 HP, +35 Defense, +25 All Attack Up, +4% Resist Skill Amp., +14 Max HP Steal per hit, +2% All Skill Amp., +1% Final DMG Reduce
      {
        level: 7,
        stats: {
          hp: 70,
          defense: 35,
          allAttackUp: 25,
          resistSkillAmp: 4,
          maxHpStealPerHit: 14,
          allSkillAmp: 2,
          finalDamageReduce: 1
        }
      },
      // Level 8: +80 HP, +40 Defense, +30 All Attack Up, +6% Resist Skill Amp., +16 Max HP Steal per hit, +3% All Skill Amp., +2% Final DMG Reduce
      {
        level: 8,
        stats: {
          hp: 80,
          defense: 40,
          allAttackUp: 30,
          resistSkillAmp: 6,
          maxHpStealPerHit: 16,
          allSkillAmp: 3,
          finalDamageReduce: 2
        }
      },
      // Level 9: +90 HP, +45 Defense, +35 All Attack Up, +8% Resist Skill Amp., +18 Max HP Steal per hit, +4% All Skill Amp., +4% Final DMG Reduce, +2% Final DMG Increase
      {
        level: 9,
        stats: {
          hp: 90,
          defense: 45,
          allAttackUp: 35,
          resistSkillAmp: 8,
          maxHpStealPerHit: 18,
          allSkillAmp: 4,
          finalDamageReduce: 4,
          finalDamageIncreased: 2
        }
      },
      // Level 10: +100 HP, +50 Defense, +40 All Attack Up, +10% Resist Skill Amp., +20 Max HP Steal per hit, +5% All Skill Amp., +6% Final DMG Reduce, +5% Final DMG Increase
      {
        level: 10,
        stats: {
          hp: 100,
          defense: 50,
          allAttackUp: 40,
          resistSkillAmp: 10,
          maxHpStealPerHit: 20,
          allSkillAmp: 5,
          finalDamageReduce: 6,
          finalDamageIncreased: 5
        }
      }
    ]
  },
  {
    id: 'chaos_talisman_of_destruction',
    name: 'Chaos Talisman of Destruction',
    type: 'talisman',
    subtype: 'talisman',
    grade: 'chaos',
    imagePath: '/images/equipment-system/talisman/talisman.png',
    baseStats: {
      hp: 170,           // 50 base + 120 from upgrades
      defense: 60,
      allAttackUp: 60,
      resistSkillAmp: 15,
      maxHpStealPerHit: 25,
      allSkillAmp: 6,
      finalDamageReduce: 7,
      finalDamageIncreased: 6
    },
    maxBaseLevel: 0,     // No upgrades available
    upgrades: []         // Empty upgrades array since it's fixed stats
  }
];

/**
 * Get a talisman by its ID
 */
export const getTalismanById = (id: string): Talisman | undefined => {
  return talismans.find(talisman => talisman.id === id);
};

/**
 * Get all talismans
 */
export const getAllTalismans = (): Talisman[] => {
  return talismans;
};

/**
 * Create a configured talisman with current level and total stats
 */
export const createConfiguredTalisman = (
  talismanId: string,
  level: number = 0
): ConfiguredTalisman | undefined => {
  const talisman = getTalismanById(talismanId);
  if (!talisman) return undefined;

  const totalStats = calculateTalismanStats(talisman, level);
  
  return {
    ...talisman,
    currentLevel: level,
    totalStats: totalStats
  };
};

// Helper function to check if an item is a talisman
export const isTalisman = (item: any): item is Talisman => {
  return item && item.type === 'talisman' && 'maxBaseLevel' in item;
};