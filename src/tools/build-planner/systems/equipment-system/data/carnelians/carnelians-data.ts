/**
 * Carnelians Data for Equipment System
 * Contains definitions for carnelian items and their stats
 * Carnelians have base stats and upgradable levels to +20
 */

export interface CarnelianStats {
  hp?: number;
  hpBase?: number;
  defense?: number;
  defenseRate?: number;
  damageReduction?: number;
  criticalDamage?: number;
  allSkillAmp?: number;
  boostHpRestoration?: number;
  penetration?: number;
}

export interface CarnelianUpgrade {
  level: number;
  stats: CarnelianStats;
}

export interface Carnelian {
  id: string;
  name: string;
  type: 'carnelian';
  subtype: 'carnelian';
  grade: 'chaos' | 'highest' | 'high';
  imagePath: string;
  baseStats: CarnelianStats;
  maxBaseLevel: number; // 20 for carnelians
  currentLevel?: number;
  upgrades: CarnelianUpgrade[];
  totalStats?: CarnelianStats;
}

export interface ConfiguredCarnelian extends Carnelian {
  currentLevel: number;
  totalStats: CarnelianStats;
}

// Helper function to calculate total stats
export const calculateCarnelianStats = (carnelian: Carnelian, level: number = 0): CarnelianStats => {
  if (level < 0 || level > carnelian.maxBaseLevel) {
    return { ...carnelian.baseStats };
  }

  const upgradeStats = level > 0 ? carnelian.upgrades[level - 1].stats : {};
  const totalStats: CarnelianStats = { ...carnelian.baseStats };

  Object.entries(upgradeStats).forEach(([stat, value]) => {
    const statKey = stat as keyof CarnelianStats;
    totalStats[statKey] = (totalStats[statKey] || 0) + (value || 0);
  });

  return totalStats;
};

// Create configured carnelian
export const createConfiguredCarnelian = (
  carnelianId: string,
  level: number = 0
): ConfiguredCarnelian | undefined => {
  const carnelian = getCarnelianById(carnelianId);
  if (!carnelian) return undefined;

  return {
    ...carnelian,
    currentLevel: level,
    totalStats: calculateCarnelianStats(carnelian, level)
  };
};

// Type guard function
export const isCarnelian = (item: any): item is Carnelian => {
  return item && item.type === 'carnelian' && 'maxBaseLevel' in item;
};

// Helper functions
export const getCarnelianById = (id: string): Carnelian | undefined => {
  return carnelians.find(carnelian => carnelian.id === id);
};

export const getAllCarnelians = (): Carnelian[] => {
  return carnelians;
};

// Carnelian data based on the provided image
export const carnelians: Carnelian[] = [
  {
    id: 'chaos_carnelian',
    name: 'Carnelian',
    type: 'carnelian',
    subtype: 'carnelian',
    grade: 'chaos',
    imagePath: '/images/equipment-system/carnelian/carnelian.png',
    baseStats: {
      hp: 50
    },
    maxBaseLevel: 20,
    upgrades: [
      { level: 1, stats: { defense: 10, defenseRate: 20 } },
      { level: 2, stats: { defense: 15, defenseRate: 30 } },
      { level: 3, stats: { defense: 20, defenseRate: 40 } },
      { level: 4, stats: { defense: 25, defenseRate: 50 } },
      { level: 5, stats: { defense: 30, defenseRate: 60 } },
      { level: 6, stats: { defense: 35, defenseRate: 70 } },
      { level: 7, stats: { defense: 40, defenseRate: 80 } },
      { level: 8, stats: { defense: 45, defenseRate: 90, damageReduction: 5, criticalDamage: 1 } },
      { level: 9, stats: { defense: 50, defenseRate: 100, damageReduction: 10, criticalDamage: 2, allSkillAmp: 1, boostHpRestoration: 3 } },
      { level: 10, stats: { defense: 55, defenseRate: 120, damageReduction: 15, criticalDamage: 3, allSkillAmp: 2, boostHpRestoration: 5 } },
      { level: 11, stats: { defense: 60, defenseRate: 140, damageReduction: 20, criticalDamage: 4, allSkillAmp: 3, boostHpRestoration: 10 } },
      { level: 12, stats: { defense: 70, defenseRate: 160, damageReduction: 25, criticalDamage: 5, allSkillAmp: 4, boostHpRestoration: 15 } },
      { level: 13, stats: { defense: 80, defenseRate: 180, damageReduction: 30, criticalDamage: 6, allSkillAmp: 4, boostHpRestoration: 20, penetration: 5 } },
      { level: 14, stats: { defense: 90, defenseRate: 200, damageReduction: 35, criticalDamage: 7, allSkillAmp: 4, boostHpRestoration: 25, penetration: 10 } },
      { level: 15, stats: { defense: 100, defenseRate: 220, damageReduction: 40, criticalDamage: 8, allSkillAmp: 4, boostHpRestoration: 30, penetration: 20 } },
      { level: 16, stats: { defense: 110, defenseRate: 240, damageReduction: 45, criticalDamage: 9, allSkillAmp: 5, boostHpRestoration: 30, penetration: 25, hp: 50 } },
      { level: 17, stats: { defense: 120, defenseRate: 260, damageReduction: 50, criticalDamage: 10, allSkillAmp: 6, boostHpRestoration: 30, penetration: 30, hp: 100 } },
      { level: 18, stats: { defense: 130, defenseRate: 280, damageReduction: 55, criticalDamage: 11, allSkillAmp: 7, boostHpRestoration: 30, penetration: 35, hp: 150 } },
      { level: 19, stats: { defense: 145, defenseRate: 310, damageReduction: 60, criticalDamage: 13, allSkillAmp: 8, boostHpRestoration: 30, penetration: 45, hp: 200 } },
      { level: 20, stats: { defense: 170, defenseRate: 350, damageReduction: 70, criticalDamage: 16, allSkillAmp: 10, boostHpRestoration: 30, penetration: 60, hp: 250 } }
    ]
  }
];