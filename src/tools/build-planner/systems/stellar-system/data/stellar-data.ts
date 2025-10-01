/**
 * Stellar System Data
 * This file contains data for the Stellar Link System
 */

// Stat data interface
export interface StellarStat {
  id: string;
  name: string;
  values: number[];
}

// Color option interface
export interface NodeColor {
  name: string;
  cssColor: string;
  borderColor: string;
  glowColor: string;
}

// Line effect interface
export interface LineEffect {
  name: string;
  effect1: { statId: string; value: number };
  effect2: { statId: string; value: number };
}

// Enhanced stat data with multiple values per level and icons
export const enhancedStatData: Record<string, StellarStat[]> = {
  // Daedalus line stats with 5 levels of values
  daedalus: [
    {
      id: 'str',
      name: 'STR',
      values: [1, 2, 3, 4, 5]
    },
    {
      id: 'int',
      name: 'INT',
      values: [1, 2, 3, 4, 5]
    },
    {
      id: 'dex',
      name: 'DEX',
      values: [1, 2, 3, 4, 5]
    },
    {
      id: 'ignoreAccuracy',
      name: 'Ignore Accuracy',
      values: [2, 4, 6, 8, 10]
    },
    {
      id: 'ignoreEvasion',
      name: 'Ignore Evasion',
      values: [2, 4, 6, 8, 10]
    },
    {
      id: 'pveDamageReduction',
      name: 'PvE DMG Reduction',
      values: [1, 2, 3, 4, 5]
    },
    {
      id: 'hp',
      name: 'HP',
      values: [10, 15, 20, 30, 50]
    },
    {
      id: 'pveDefense',
      name: 'PvE Defense',
      values: [3, 4, 6, 9, 16]
    },
    {
      id: 'resistCriticalDamage',
      name: 'Resist Crit. DMG',
      values: [1, 2, 3, 4, 5]
    },
    {
      id: 'ignoreDamageReduction',
      name: 'Ignore DMG Reduction',
      values: [1, 2, 3, 6, 10]
    },
    {
      id: 'hpAutoHeal',
      name: 'HP Auto Heal',
      values: [1, 2, 3, 4, 5]
    },
    {
      id: 'pvePenetration',
      name: 'PvE Penetration',
      values: [2, 3, 5, 8, 15]
    }
  ],
  
  // Icarus line stats with 5 levels of values
  icarus: [
    {
      id: 'str',
      name: 'STR',
      values: [1, 2, 3, 4, 5]
    },
    {
      id: 'int',
      name: 'INT',
      values: [1, 2, 3, 4, 5]
    },
    {
      id: 'dex',
      name: 'DEX',
      values: [1, 2, 3, 4, 5]
    },
    {
      id: 'ignoreAccuracy',
      name: 'Ignore Accuracy',
      values: [4, 6, 8, 10, 12]
    },
    {
      id: 'ignoreEvasion',
      name: 'Ignore Evasion',
      values: [4, 6, 8, 10, 12]
    },
    {
      id: 'pveDamageReduction',
      name: 'PvE DMG Reduction',
      values: [1, 2, 3, 4, 6]
    },
    {
      id: 'hp',
      name: 'HP',
      values: [20, 25, 35, 50, 85]
    },
    {
      id: 'pveDefense',
      name: 'PvE Defense',
      values: [4, 5, 8, 11, 20]
    },
    {
      id: 'pvpResistSkillAmp',
      name: 'PvP Resist All Skill Amp.',
      values: [1, 2, 3, 4, 5]
    },
    {
      id: 'normalDamageUp',
      name: 'Normal DMG Up',
      values: [1, 2, 3, 4, 5]
    },
    {
      id: 'pveIgnorePenetration',
      name: 'PvE Ignore Penetration',
      values: [1, 2, 3, 6, 10]
    },
    {
      id: 'pveCriticalDamage',
      name: 'PvE Crit. DMG',
      values: [1, 2, 3, 4, 7]
    }
  ],
  
  // Vulcanos line stats with 5 levels of values
  vulcanos: [
    {
      id: 'str',
      name: 'STR',
      values: [1, 2, 3, 4, 5]
    },
    {
      id: 'int',
      name: 'INT',
      values: [1, 2, 3, 4, 5]
    },
    {
      id: 'dex',
      name: 'DEX',
      values: [1, 2, 3, 4, 5]
    },
    {
      id: 'ignoreAccuracy',
      name: 'Ignore Accuracy',
      values: [6, 8, 10, 12, 14]
    },
    {
      id: 'ignoreEvasion',
      name: 'Ignore Evasion',
      values: [6, 8, 10, 12, 14]
    },
    {
      id: 'pveDamageReduction',
      name: 'PvE DMG Reduction',
      values: [1, 2, 3, 4, 7]
    },
    {
      id: 'hp',
      name: 'HP',
      values: [20, 30, 40, 55, 100]
    },
    {
      id: 'defense',
      name: 'Defense',
      values: [4, 6, 10, 15, 25]
    },
    {
      id: 'resistCriticalDamage',
      name: 'Resist Crit. DMG',
      values: [1, 2, 3, 4, 6]
    },
    {
      id: 'normalDamageUp',
      name: 'Normal DMG Up',
      values: [1, 2, 3, 4, 6]
    },
    {
      id: 'pveIgnorePenetration',
      name: 'PvE Ignore Penetration',
      values: [2, 3, 5, 7, 13]
    },
    {
      id: 'allAttackUp',
      name: 'All Attack Up',
      values: [4, 8, 13, 20, 40]
    }
  ],
  
  // Minerva line stats with 5 levels of values
  minerva: [
    {
      id: 'str',
      name: 'STR',
      values: [1, 2, 3, 4, 5]
    },
    {
      id: 'int',
      name: 'INT',
      values: [1, 2, 3, 4, 5]
    },
    {
      id: 'dex',
      name: 'DEX',
      values: [1, 2, 3, 4, 5]
    },
    {
      id: 'ignoreAccuracy',
      name: 'Ignore Accuracy',
      values: [8, 10, 12, 14, 16]
    },
    {
      id: 'ignoreEvasion',
      name: 'Ignore Evasion',
      values: [8, 10, 12, 14, 16]
    },
    {
      id: 'pveDamageReduction',
      name: 'PvE DMG Reduction',
      values: [1, 2, 3, 5, 8]
    },
    {
      id: 'hp',
      name: 'HP',
      values: [30, 35, 45, 60, 115]
    },
    {
      id: 'defense',
      name: 'Defense',
      values: [4, 6, 10, 16, 30]
    },
    {
      id: 'pvpResistSkillAmp',
      name: 'PvP Resist All Skill Amp.',
      values: [1, 2, 3, 4, 5]
    },
    {
      id: 'pveIgnorePenetration',
      name: 'PvE Ignore Penetration',
      values: [3, 4, 6, 9, 16]
    },
    {
      id: 'cancelIgnorePenetration',
      name: 'Cancel Ignore Penetration',
      values: [1, 2, 3, 4, 5]
    },
    {
      id: 'penetration',
      name: 'Penetration',
      values: [2, 3, 5, 8, 15]
    }
  ],
  
  // Pluto line stats with 5 levels of values
  pluto: [
    {
      id: 'str',
      name: 'STR',
      values: [1, 2, 3, 4, 5]
    },
    {
      id: 'int',
      name: 'INT',
      values: [1, 2, 3, 4, 5]
    },
    {
      id: 'dex',
      name: 'DEX',
      values: [1, 2, 3, 4, 5]
    },
    {
      id: 'ignoreAccuracy',
      name: 'Ignore Accuracy',
      values: [12, 14, 16, 18, 20]
    },
    {
      id: 'ignoreEvasion',
      name: 'Ignore Evasion',
      values: [12, 14, 16, 18, 20]
    },
    {
      id: 'pveDamageReduction',
      name: 'PvE DMG Reduction',
      values: [1, 2, 3, 5, 9]
    },
    {
      id: 'hp',
      name: 'HP',
      values: [35, 40, 50, 65, 125]
    },
    {
      id: 'defense',
      name: 'Defense',
      values: [5, 8, 12, 18, 35]
    },
    {
      id: 'resistCriticalDamage',
      name: 'Resist Crit. DMG',
      values: [1, 2, 3, 4, 7]
    },
    {
      id: 'pveIgnorePenetration',
      name: 'PvE Ignore Penetration',
      values: [3, 5, 8, 13, 20]
    },
    {
      id: 'cancelIgnorePenetration',
      name: 'Cancel Ignore Penetration',
      values: [1, 2, 3, 5, 8]
    },
    {
      id: 'criticalDamage',
      name: 'Crit. DMG',
      values: [1, 2, 3, 4, 7]
    }
  ]
};

// Color options for nodes
export const nodeColors: Record<string, NodeColor> = {
  desire: { 
    name: 'Desire', 
    cssColor: '#ffcc00', 
    borderColor: '#ffd700',
    glowColor: 'rgba(255, 215, 0, 0.6)'
  },
  grief: { 
    name: 'Grief', 
    cssColor: '#ff8800', 
    borderColor: '#ff9933',
    glowColor: 'rgba(255, 153, 51, 0.6)'
  },
  fury: { 
    name: 'Fury', 
    cssColor: '#ff3300', 
    borderColor: '#ff4500',
    glowColor: 'rgba(255, 69, 0, 0.6)'
  },
  oblivion: { 
    name: 'Oblivion', 
    cssColor: '#3366ff', 
    borderColor: '#4477ff',
    glowColor: 'rgba(68, 119, 255, 0.6)'
  },
  emptiness: { 
    name: 'Emptiness', 
    cssColor: '#9933cc', 
    borderColor: '#aa44ee',
    glowColor: 'rgba(170, 68, 238, 0.6)'
  }
};

// Line effects for constellation color combinations
export const lineEffects: Record<string, Record<string, LineEffect>> = {
  daedalus: {
    desire: {
      name: "Daedalus of Desire",
      effect1: { statId: "normalDamageUp", value: 1 },
      effect2: { statId: "defense", value: 9 }
    },
    grief: {
      name: "Daedalus of Grief",
      effect1: { statId: "normalDamageUp", value: 2 },
      effect2: { statId: "defense", value: 18 }
    },
    fury: {
      name: "Daedalus of Fury",
      effect1: { statId: "normalDamageUp", value: 3 },
      effect2: { statId: "defense", value: 30 }
    },
    oblivion: {
      name: "Daedalus of Oblivion",
      effect1: { statId: "normalDamageUp", value: 6 },
      effect2: { statId: "defense", value: 45 }
    },
    emptiness: {
      name: "Daedalus of Emptiness",
      effect1: { statId: "normalDamageUp", value: 14 },
      effect2: { statId: "defense", value: 105 }
    }
  },
  
  icarus: {
    desire: {
      name: "Icarus of Desire",
      effect1: { statId: "pvpAllSkillAmp", value: 1 },
      effect2: { statId: "resistSkillAmp", value: 1 }
    },
    grief: {
      name: "Icarus of Grief",
      effect1: { statId: "pvpAllSkillAmp", value: 2 },
      effect2: { statId: "resistSkillAmp", value: 2 }
    },
    fury: {
      name: "Icarus of Fury",
      effect1: { statId: "pvpAllSkillAmp", value: 3 },
      effect2: { statId: "resistSkillAmp", value: 3 }
    },
    oblivion: {
      name: "Icarus of Oblivion",
      effect1: { statId: "pvpAllSkillAmp", value: 4 },
      effect2: { statId: "resistSkillAmp", value: 6 }
    },
    emptiness: {
      name: "Icarus of Emptiness",
      effect1: { statId: "pvpAllSkillAmp", value: 9 },
      effect2: { statId: "resistSkillAmp", value: 12 }
    }
  },
  
  vulcanos: {
    desire: {
      name: "Vulcanos of Desire",
      effect1: { statId: "allAttackUp", value: 10 },
      effect2: { statId: "damageReduction", value: 5 }
    },
    grief: {
      name: "Vulcanos of Grief",
      effect1: { statId: "allAttackUp", value: 20 },
      effect2: { statId: "damageReduction", value: 10 }
    },
    fury: {
      name: "Vulcanos of Fury",
      effect1: { statId: "allAttackUp", value: 35 },
      effect2: { statId: "damageReduction", value: 18 }
    },
    oblivion: {
      name: "Vulcanos of Oblivion",
      effect1: { statId: "allAttackUp", value: 55 },
      effect2: { statId: "damageReduction", value: 30 }
    },
    emptiness: {
      name: "Vulcanos of Emptiness",
      effect1: { statId: "allAttackUp", value: 120 },
      effect2: { statId: "damageReduction", value: 70 }
    }
  },
  
  minerva: {
    desire: {
      name: "Minerva of Desire",
      effect1: { statId: "pvpCriticalDamage", value: 2 },
      effect2: { statId: "resistCriticalDamage", value: 2 }
    },
    grief: {
      name: "Minerva of Grief",
      effect1: { statId: "pvpCriticalDamage", value: 4 },
      effect2: { statId: "resistCriticalDamage", value: 4 }
    },
    fury: {
      name: "Minerva of Fury",
      effect1: { statId: "pvpCriticalDamage", value: 8 },
      effect2: { statId: "resistCriticalDamage", value: 8 }
    },
    oblivion: {
      name: "Minerva of Oblivion",
      effect1: { statId: "pvpCriticalDamage", value: 13 },
      effect2: { statId: "resistCriticalDamage", value: 13 }
    },
    emptiness: {
      name: "Minerva of Emptiness",
      effect1: { statId: "pvpCriticalDamage", value: 30 },
      effect2: { statId: "resistCriticalDamage", value: 30 }
    }
  },
  
  pluto: {
    desire: {
      name: "Pluto of Desire",
      effect1: { statId: "criticalDamage", value: 2 },
      effect2: { statId: "ignorePenetration", value: 9 }
    },
    grief: {
      name: "Pluto of Grief",
      effect1: { statId: "criticalDamage", value: 4 },
      effect2: { statId: "ignorePenetration", value: 18 }
    },
    fury: {
      name: "Pluto of Fury",
      effect1: { statId: "criticalDamage", value: 8 },
      effect2: { statId: "ignorePenetration", value: 30 }
    },
    oblivion: {
      name: "Pluto of Oblivion",
      effect1: { statId: "criticalDamage", value: 13 },
      effect2: { statId: "ignorePenetration", value: 45 }
    },
    emptiness: {
      name: "Pluto of Emptiness",
      effect1: { statId: "criticalDamage", value: 30 },
      effect2: { statId: "ignorePenetration", value: 100 }
    }
  }
};

// Helper function to get constellation type from node ID
export const getConstellationFromNodeId = (nodeId: number): string => {
  if (nodeId >= 1 && nodeId <= 4) return 'daedalus';
  if (nodeId >= 5 && nodeId <= 10) return 'icarus';
  if (nodeId >= 11 && nodeId <= 18) return 'vulcanos';
  if (nodeId >= 19 && nodeId <= 28) return 'minerva';
  if (nodeId >= 29 && nodeId <= 40) return 'pluto';
  return 'unknown';
};

// Helper function to get available stats for a constellation
export const getStatsForConstellation = (constellation: string): StellarStat[] => {
  return enhancedStatData[constellation] || [];
};