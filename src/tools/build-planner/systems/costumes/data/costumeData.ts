// Costume system data and stat configurations
import { StatOption } from '../../../types/systems';
import { getStatInfo } from '../../../data/stats-config';

// Epic craft option interface
export interface EpicCraftOption {
  name: string;
  statId: string;
  values: number[];  // Values for grades 1-4
  grades: number[];  // [1, 2, 3, 4]
  chances: number[]; // % chance of obtaining each grade
}

// Epic craft options data - organized by costume type
export const epicCraftOptions = {
  suit: {
    penetration: {
      name: 'Penetration',
      statId: 'penetration',
      values: [10, 15, 20, 30],
      grades: [1, 2, 3, 4],
      chances: [25, 50, 15, 10]
    },
    criticalDamage: {
      name: 'Crit. DMG',
      statId: 'criticalDamage',
      values: [3, 5, 7, 10],
      grades: [1, 2, 3, 4],
      chances: [25, 50, 15, 10]
    },
    allSkillAmp: {
      name: 'All Skill Amp.',
      statId: 'allSkillAmp',
      values: [1, 2, 3, 5],
      grades: [1, 2, 3, 4],
      chances: [25, 50, 15, 10]
    },
    resistCriticalRate: {
      name: 'Resist Crit. Rate',
      statId: 'resistCriticalRate',
      values: [1, 2, 3, 4],
      grades: [1, 2, 3, 4],
      chances: [25, 50, 15, 10]
    },
    allAttackUp: {
      name: 'All Attack Up',
      statId: 'allAttackUp',
      values: [20, 30, 40, 50],
      grades: [1, 2, 3, 4],
      chances: [25, 50, 15, 10]
    },
    defense: {
      name: 'Defense',
      statId: 'defense',
      values: [15, 20, 30, 40],
      grades: [1, 2, 3, 4],
      chances: [25, 50, 15, 10]
    },
    evasion: {
      name: 'Evasion',
      statId: 'evasion',
      values: [50, 70, 100, 150],
      grades: [1, 2, 3, 4],
      chances: [25, 50, 15, 10]
    },
    hp: {
      name: 'HP',
      statId: 'hp',
      values: [50, 70, 100, 150],
      grades: [1, 2, 3, 4],
      chances: [25, 50, 15, 10]
    }
  },

  forceWing: {
    hp: {
      name: 'HP',
      statId: 'hp',
      values: [100, 150, 200, 300],
      grades: [1, 2, 3, 4],
      chances: [25, 50, 15, 10]
    },
    defense: {
      name: 'Defense',
      statId: 'defense',
      values: [30, 40, 50, 60],
      grades: [1, 2, 3, 4],
      chances: [25, 50, 15, 10]
    },
    allAttackUp: {
      name: 'All Attack Up',
      statId: 'allAttackUp',
      values: [30, 40, 50, 60],
      grades: [1, 2, 3, 4],
      chances: [25, 50, 15, 10]
    },
    allSkillAmp: {
      name: 'All Skill Amp.',
      statId: 'allSkillAmp',
      values: [2, 3, 4, 5],
      grades: [1, 2, 3, 4],
      chances: [25, 50, 15, 10]
    },
    criticalDamage: {
      name: 'Crit. DMG',
      statId: 'criticalDamage',
      values: [4, 7, 9, 11],
      grades: [1, 2, 3, 4],
      chances: [25, 50, 15, 10]
    },
    normalDamageUp: {
      name: 'Normal DMG Up',
      statId: 'normalDamageUp',
      values: [5, 8, 11, 14],
      grades: [1, 2, 3, 4],
      chances: [25, 50, 15, 10]
    },
    addDamage: {
      name: 'Add DMG',
      statId: 'addDamage',
      values: [15, 30, 45, 60],
      grades: [1, 2, 3, 4],
      chances: [25, 50, 15, 10]
    },
    ignoreDamageReduction: {
      name: 'Ignore DMG Reduce',
      statId: 'ignoreDamageReduction',
      values: [20, 40, 60, 80],
      grades: [1, 2, 3, 4],
      chances: [25, 50, 15, 10]
    }
  },

  vehicle: {
    hp: {
      name: 'HP',
      statId: 'hp',
      values: [100, 150, 200, 300],
      grades: [1, 2, 3, 4],
      chances: [25, 50, 15, 10]
    },
    defense: {
      name: 'Defense',
      statId: 'defense',
      values: [20, 30, 40, 60],
      grades: [1, 2, 3, 4],
      chances: [25, 50, 15, 10]
    },
    ignorePenetration: {
      name: 'Ignore Penetration',
      statId: 'ignorePenetration',
      values: [20, 25, 35, 45],
      grades: [1, 2, 3, 4],
      chances: [25, 50, 15, 10]
    },
    allAttackUp: {
      name: 'All Attack Up',
      statId: 'allAttackUp',
      values: [30, 40, 50, 70],
      grades: [1, 2, 3, 4],
      chances: [25, 50, 15, 10]
    },
    allSkillAmp: {
      name: 'All Skill Amp.',
      statId: 'allSkillAmp',
      values: [3, 5, 7, 9],
      grades: [1, 2, 3, 4],
      chances: [25, 50, 15, 10]
    },
    ignoreResistSkillAmp: {
      name: 'Ignore Resist Skill Amp.',
      statId: 'ignoreResistSkillAmp',
      values: [3, 5, 7, 9],
      grades: [1, 2, 3, 4],
      chances: [25, 50, 15, 10]
    },
    criticalDamage: {
      name: 'Crit. DMG',
      statId: 'criticalDamage',
      values: [3, 5, 7, 9],
      grades: [1, 2, 3, 4],
      chances: [25, 50, 15, 10]
    },
    resistCriticalDamage: {
      name: 'Resist Crit. DMG',
      statId: 'resistCriticalDamage',
      values: [8, 12, 16, 20],
      grades: [1, 2, 3, 4],
      chances: [25, 50, 15, 10]
    }
  }
};

// Costume stat definitions with values per costume type
export const costumeStatsData = {
  suit: [
    { id: 'hp', value: 100 },
    { id: 'attack', value: 20 },
    { id: 'magicAttack', value: 20 },
    { id: 'defense', value: 15 },
    { id: 'evasion', value: 100 },
    { id: 'criticalDamage', value: 4 },
    { id: 'criticalRate', value: 1 },
    { id: 'maxCriticalRate', value: 1 },
    { id: 'swordSkillAmp', value: 2 },
    { id: 'magicSkillAmp', value: 2 },
    { id: 'resistCriticalRate', value: 1 },
    { id: 'accuracy', value: 50 },
    { id: 'penetration', value: 10 }
  ],

  // Force Wing costume stats - Specialized for offensive capabilities
  forceWing: [
    { id: 'hp', value: 200 },
    { id: 'attack', value: 30 },
    { id: 'damageReduction', value: 10 },
    { id: 'criticalDamage', value: 3 },
    { id: 'swordSkillAmp', value: 2 },
    { id: 'magicSkillAmp', value: 2 },
    { id: 'accuracy', value: 100 },
    { id: 'ignoreAccuracy', value: 20 },
    { id: 'penetration', value: 15 },
    { id: 'ignoreDamageReduction', value: 20 }
  ],

  // Vehicle costume stats - Focused on defensive and counter capabilities
  vehicle: [
    { id: 'hp', value: 200 },
    { id: 'defense', value: 20 },
    { id: 'evasion', value: 50 },
    { id: 'ignoreEvasion', value: 100 },
    { id: 'criticalDamage', value: 3 },
    { id: 'accuracy', value: 70 },
    { id: 'ignoreAccuracy', value: 20 },
    { id: 'penetration', value: 10 },
    { id: 'ignoreDamageReduction', value: 20 },
    { id: 'ignoreResistCriticalRate', value: 1 },
    { id: 'ignoreResistCriticalDamage', value: 4 }
  ]
};

/**
 * Get available stats for a specific costume category
 * Integrates with stats-config.ts for consistent stat information
 */
export const getCostumeStats = (category: string): StatOption[] => {
  // Map category names to data keys
  const categoryMap: Record<string, keyof typeof costumeStatsData> = {
    'suit': 'suit',
    'vehicle': 'vehicle',
    'force-wings': 'forceWing'
  };

  const dataKey = categoryMap[category];
  if (!dataKey || !costumeStatsData[dataKey]) {
    return [];
  }

  const categoryStats = costumeStatsData[dataKey];

  return categoryStats.map(stat => {
    const statInfo = getStatInfo(stat.id);
    return {
      id: stat.id,
      name: statInfo?.name || stat.id,
      value: stat.value,
      isPercentage: statInfo?.isPercentage || false,
      category: statInfo?.category || 'utility',
      maxLevel: 1, // Costumes have fixed values, no leveling
      trainingPointCosts: [] // No training points needed for costumes
    };
  });
};

/**
 * Get epic craft options for a specific costume category
 * Returns options with grade-based values for stat selection
 */
export const getEpicCraftOptions = (category: string): Array<StatOption & { grade: number; chance: number }> => {
  // Map category names to epic craft data keys
  const categoryMap: Record<string, keyof typeof epicCraftOptions> = {
    'suit': 'suit',
    'vehicle': 'vehicle',
    'force-wings': 'forceWing'
  };

  const dataKey = categoryMap[category];
  if (!dataKey || !epicCraftOptions[dataKey]) {
    return [];
  }

  const categoryOptions = epicCraftOptions[dataKey];
  const options: Array<StatOption & { grade: number; chance: number }> = [];

  // Create options for each stat and each grade
  Object.values(categoryOptions).forEach(option => {
    option.grades.forEach((grade, index) => {
      const statInfo = getStatInfo(option.statId);
      options.push({
        id: `${option.statId}_grade_${grade}`,
        name: statInfo?.name || option.name,
        value: option.values[index],
        isPercentage: statInfo?.isPercentage || false,
        category: statInfo?.category || 'utility',
        maxLevel: 1, // Epic craft options have fixed values per grade
        trainingPointCosts: [], // No training points needed for epic craft
        grade: grade,
        chance: option.chances[index]
      });
    });
  });

  return options.sort((a, b) => {
    // Sort by stat name first, then by grade
    const nameCompare = a.name.localeCompare(b.name);
    if (nameCompare !== 0) return nameCompare;
    return a.grade - b.grade;
  });
};

/**
 * Get epic craft option by stat ID and grade
 */
export const getEpicCraftOption = (category: string, statId: string, grade: number): (StatOption & { grade: number; chance: number }) | null => {
  const options = getEpicCraftOptions(category);
  return options.find(option => 
    option.id === `${statId}_grade_${grade}` || 
    (option.id.startsWith(statId) && option.grade === grade)
  ) || null;
};

/**
 * Calculate any costume-specific bonuses
 * This can be expanded for set bonuses or special combinations
 */
export const calculateCostumeBonuses = (categories: any[]): Record<string, number> => {
  const bonuses: Record<string, number> = {};
  
  // Future implementation:
  // - Set bonuses for wearing multiple pieces
  // - Special costume combinations
  // - Costume upgrade bonuses
  
  return bonuses;
};

/**
 * Validate costume slot assignments
 * Ensures stat is valid for the costume type
 */
export const validateCostumeSlot = (costumeType: string, statId: string): boolean => {
  const categoryMap: Record<string, keyof typeof costumeStatsData> = {
    'suit': 'suit',
    'vehicle': 'vehicle',
    'force-wings': 'forceWing'
  };

  const dataKey = categoryMap[costumeType];
  if (!dataKey || !costumeStatsData[dataKey]) {
    return false;
  }

  return costumeStatsData[dataKey].some(stat => stat.id === statId);
};

/**
 * Get costume display information
 */
export const getCostumeDisplayInfo = (costumeType: string) => {
  const displayInfo = {
    suit: {
      name: 'Suit',
      description: 'Provides balanced offensive and defensive bonuses',
      icon: '/images/costumes/suit.png'
    },
    vehicle: {
      name: 'Vehicle',
      description: 'Focused on defensive and counter capabilities',
      icon: '/images/costumes/vehicle.png'
    },
    'force-wings': {
      name: 'Force Wings',
      description: 'Specialized for offensive capabilities',
      icon: '/images/costumes/force-wings.png'
    }
  };
  
  return displayInfo[costumeType as keyof typeof displayInfo] || {
    name: 'Unknown',
    description: 'Unknown costume type',
    icon: '/images/costumes/default.png'
  };
};