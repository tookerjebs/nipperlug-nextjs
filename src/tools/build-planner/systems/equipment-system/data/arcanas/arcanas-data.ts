/**
 * Arcanas Data for Equipment System
 * Contains definitions for arcana items and their stats
 * Arcanas have base stats and upgradable levels to +20
 */

export interface ArcanaStats {
  hp?: number;
  allAttackUp?: number;
  criticalDamage?: number;
  allSkillAmp?: number;
  accuracy?: number;
  penetration?: number;
  ignoreDamageReduction?: number;
  cancelIgnorePenetration?: number;
  ignoreResistCriticalRate?: number;
  defense?: number;
  evasion?: number;
  damageReduction?: number;
  ignorePenetration?: number;
  ignoreAccuracy?: number;
  pveCriticalDamage?: number;
  pveAllSkillAmp?: number;
  defenseRate?: number;
  resistCriticalDamage?: number;
  resistSkillAmp?: number;
  resistCriticalRate?: number;
  pvpCritDmg?: number;
  pvpAllSkillAmp?: number;
}

export interface ArcanaUpgrade {
  level: number;
  stats: ArcanaStats;
}

export interface Arcana {
  id: string;
  name: string;
  type: 'arcana';
  subtype: 'arcana';
  grade: 'chaos' | 'highest' | 'high';
  imagePath: string;
  baseStats: ArcanaStats;
  maxBaseLevel: number; // 20 for arcanas
  currentLevel?: number;
  upgrades: ArcanaUpgrade[];
  totalStats?: ArcanaStats;
}

export interface ConfiguredArcana extends Arcana {
  currentLevel: number;
  totalStats: ArcanaStats;
}

// Helper function to calculate total stats
export const calculateArcanaStats = (arcana: Arcana | undefined, level: number = 0): ArcanaStats => {
  // Handle case where arcana is undefined
  if (!arcana) {
    return {};
  }
  
  if (level < 0 || level > arcana.maxBaseLevel) {
    return { ...arcana.baseStats };
  }

  const upgradeStats = level > 0 ? arcana.upgrades[level - 1]?.stats || {} : {};
  const totalStats: ArcanaStats = { ...arcana.baseStats };

  Object.entries(upgradeStats).forEach(([stat, value]) => {
    const statKey = stat as keyof ArcanaStats;
    totalStats[statKey] = (totalStats[statKey] || 0) + (value || 0);
  });

  return totalStats;
};

// Create configured arcana
export const createConfiguredArcana = (
  arcanaId: string,
  level: number = 0
): ConfiguredArcana | undefined => {
  const arcana = getArcanaById(arcanaId);
  if (!arcana) return undefined;

  const totalStats = calculateArcanaStats(arcana, level);
  
  return {
    ...arcana,
    currentLevel: level,
    totalStats: totalStats
  };
};

// Helper functions
export const getArcanaById = (id: string): Arcana | undefined => {
  return arcanas.find(arcana => arcana.id === id);
};

export const getAllArcanas = (): Arcana[] => {
  return arcanas;
};

export const isArcana = (item: any): item is Arcana => {
  return item && item.type === 'arcana' && 'maxBaseLevel' in item;
};

// Arcana data based on the provided image
export const arcanas: Arcana[] = [
  {
    id: 'arcana_of_chaos',
    name: 'Arcana of Chaos',
    type: 'arcana',
    subtype: 'arcana',
    grade: 'chaos',
    imagePath: '/images/equipment-system/arcanas/arcana_of_chaos.png',
    baseStats: {
      hp: 50
    },
    maxBaseLevel: 20,
    upgrades: [
      { level: 1, stats: { allAttackUp: 5 } },
      { level: 2, stats: { allAttackUp: 10, criticalDamage: 1 } },
      { level: 3, stats: { allAttackUp: 15, criticalDamage: 2 } },
      { level: 4, stats: { allAttackUp: 20, criticalDamage: 3, allSkillAmp: 2 } },
      { level: 5, stats: { allAttackUp: 25, criticalDamage: 4, allSkillAmp: 3 } },
      { level: 6, stats: { allAttackUp: 30, criticalDamage: 5, allSkillAmp: 4 } },
      { level: 7, stats: { allAttackUp: 35, criticalDamage: 6, allSkillAmp: 5 } },
      { level: 8, stats: { allAttackUp: 40, criticalDamage: 7, allSkillAmp: 6 } },
      { level: 9, stats: { allAttackUp: 45, criticalDamage: 8, allSkillAmp: 7 } },
      { level: 10, stats: { allAttackUp: 50, criticalDamage: 9, allSkillAmp: 8, accuracy: 10 } },
      { level: 11, stats: { allAttackUp: 55, criticalDamage: 10, allSkillAmp: 9, accuracy: 20 } },
      { level: 12, stats: { allAttackUp: 60, criticalDamage: 11, allSkillAmp: 10, accuracy: 30 } },
      { level: 13, stats: { allAttackUp: 70, criticalDamage: 12, allSkillAmp: 11, accuracy: 40 } },
      { level: 14, stats: { allAttackUp: 80, criticalDamage: 14, allSkillAmp: 12, accuracy: 50 } },
      { level: 15, stats: { allAttackUp: 90, criticalDamage: 16, allSkillAmp: 13, accuracy: 60, penetration: 5 } },
      { level: 16, stats: { allAttackUp: 100, criticalDamage: 18, allSkillAmp: 14, accuracy: 70, penetration: 10 } },
      { level: 17, stats: { allAttackUp: 110, criticalDamage: 20, allSkillAmp: 16, accuracy: 90, penetration: 15 } },
      { level: 18, stats: { allAttackUp: 120, criticalDamage: 22, allSkillAmp: 18, accuracy: 120, penetration: 25, hp: 40 } },
      { level: 19, stats: { allAttackUp: 135, criticalDamage: 25, allSkillAmp: 21, accuracy: 160, penetration: 40, hp: 80, ignoreDamageReduction: 10 } },
      { level: 20, stats: { allAttackUp: 150, criticalDamage: 28, allSkillAmp: 25, accuracy: 200, penetration: 45, hp: 130, ignoreDamageReduction: 15, cancelIgnorePenetration: 5, ignoreResistCriticalRate: 1 } }
    ]
  },
  {
    id: 'arcana_of_guardian',
    name: 'Arcana of Guardian',
    type: 'arcana',
    subtype: 'arcana',
    grade: 'chaos',
    imagePath: '/images/equipment-system/arcanas/arcana_of_guardian.png',
    baseStats: {
      defense: 30
    },
    maxBaseLevel: 20,
    upgrades: [
      { level: 1, stats: { defense: 20, evasion: 20 } },
      { level: 2, stats: { defense: 30, evasion: 30 } },
      { level: 3, stats: { defense: 40, evasion: 40 } },
      { level: 4, stats: { defense: 50, evasion: 50, damageReduction: 5 } },
      { level: 5, stats: { defense: 60, evasion: 60, damageReduction: 10 } },
      { level: 6, stats: { defense: 70, evasion: 70, damageReduction: 15, ignorePenetration: 3 } },
      { level: 7, stats: { defense: 80, evasion: 80, damageReduction: 20, ignorePenetration: 6 } },
      { level: 8, stats: { defense: 90, evasion: 90, damageReduction: 25, ignorePenetration: 10 } },
      { level: 9, stats: { defense: 100, evasion: 100, damageReduction: 30, ignorePenetration: 14 } },
      { level: 10, stats: { defense: 110, evasion: 110, damageReduction: 35, ignorePenetration: 18 } },
      { level: 11, stats: { defense: 125, evasion: 120, damageReduction: 40, ignorePenetration: 25 } },
      { level: 12, stats: { defense: 140, evasion: 130, damageReduction: 45, ignorePenetration: 30 } },
       { level: 13, stats: { defense: 155, evasion: 140, damageReduction: 50, ignorePenetration: 35 } },
       { level: 14, stats: { defense: 170, evasion: 150, damageReduction: 55, ignorePenetration: 45 } },
       { level: 15, stats: { defense: 185, evasion: 160, damageReduction: 60, ignorePenetration: 55 } },
       { level: 16, stats: { defense: 210, evasion: 180, damageReduction: 65, ignorePenetration: 65, hp: 50 } },
       { level: 17, stats: { defense: 240, evasion: 210, damageReduction: 70, ignorePenetration: 70, hp: 100, ignoreAccuracy: 30 } },
       { level: 18, stats: { defense: 280, evasion: 250, damageReduction: 75, ignorePenetration: 75, hp: 160, ignoreAccuracy: 60, pveCriticalDamage: 2 } },
       { level: 19, stats: { defense: 330, evasion: 300, damageReduction: 85, ignorePenetration: 85, hp: 230, ignoreAccuracy: 100, pveCriticalDamage: 4 } },
       { level: 20, stats: { defense: 400, evasion: 360, damageReduction: 100, ignorePenetration: 100, hp: 320, ignoreAccuracy: 150, pveCriticalDamage: 6, pveAllSkillAmp: 1 } }
    ]
  },
  {
    id: 'arcana_of_laws',
    name: 'Arcana of Laws',
    type: 'arcana',
    subtype: 'arcana',
    grade: 'chaos',
    imagePath: '/images/equipment-system/arcanas/arcana_of_laws.png',
    baseStats: {
      hp: 100
    },
    maxBaseLevel: 20,
    upgrades: [
      { level: 1, stats: { defense: 20, defenseRate: 20 } },
      { level: 2, stats: { defense: 30, defenseRate: 30 } },
      { level: 3, stats: { defense: 40, defenseRate: 40 } },
      { level: 4, stats: { defense: 50, defenseRate: 50, resistCriticalDamage: 4 } },
      { level: 5, stats: { defense: 60, defenseRate: 60, resistCriticalDamage: 5 } },
      { level: 6, stats: { defense: 70, defenseRate: 70, resistCriticalDamage: 6, resistSkillAmp: 2 } },
      { level: 7, stats: { defense: 80, defenseRate: 80, resistCriticalDamage: 7, resistSkillAmp: 3 } },
      { level: 8, stats: { defense: 90, defenseRate: 90, resistCriticalDamage: 9, resistSkillAmp: 4 } },
      { level: 9, stats: { defense: 100, defenseRate: 100, resistCriticalDamage: 11, resistSkillAmp: 5 } },
      { level: 10, stats: { defense: 110, defenseRate: 110, resistCriticalDamage: 13, resistSkillAmp: 6 } },
      { level: 11, stats: { defense: 120, defenseRate: 120, resistCriticalDamage: 16, resistSkillAmp: 8, ignorePenetration: 10 } },
      { level: 12, stats: { defense: 130, defenseRate: 130, resistCriticalDamage: 19, resistSkillAmp: 10, ignorePenetration: 15 } },
      { level: 13, stats: { defense: 140, defenseRate: 150, resistCriticalDamage: 22, resistSkillAmp: 12, ignorePenetration: 20 } },
      { level: 14, stats: { defense: 150, defenseRate: 170, resistCriticalDamage: 26, resistSkillAmp: 15, ignorePenetration: 40 } },
      { level: 15, stats: { defense: 160, defenseRate: 190, resistCriticalDamage: 30, resistSkillAmp: 18, ignorePenetration: 60, hp: 60 } },
      { level: 16, stats: { defense: 180, defenseRate: 210, resistCriticalDamage: 34, resistSkillAmp: 21, ignorePenetration: 65, hp: 120 } },
      { level: 17, stats: { defense: 210, defenseRate: 240, resistCriticalDamage: 40, resistSkillAmp: 23, ignorePenetration: 75, hp: 200, resistCriticalRate: 2 } },
      { level: 18, stats: { defense: 250, defenseRate: 280, resistCriticalDamage: 48, resistSkillAmp: 26, ignorePenetration: 85, hp: 300, resistCriticalRate: 4, pvpCritDmg: 2 } },
      { level: 19, stats: { defense: 300, defenseRate: 330, resistCriticalDamage: 58, resistSkillAmp: 30, ignorePenetration: 95, hp: 450, resistCriticalRate: 8, pvpCritDmg: 6 } },
      { level: 20, stats: { defense: 360, defenseRate: 400, resistCriticalDamage: 70, resistSkillAmp: 35, ignorePenetration: 110, hp: 450, resistCriticalRate: 12, pvpCritDmg: 8, pvpAllSkillAmp: 1 } }
    ]
  }
];