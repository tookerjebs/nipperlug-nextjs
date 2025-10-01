/**
 * Belts Data for Equipment System
 * Contains definitions for belt items and their stats
 * Belts have base stats and upgradable levels
 */

export interface BeltStats {
  hp?: number;
  attack?: number;
  magicAttack?: number;
  defense?: number;
  criticalDamage?: number;
  swordSkillAmp?: number;
  magicSkillAmp?: number;
  accuracy?: number;
  penetration?: number;
  resistCriticalDamage?: number;
  resistSkillAmp?: number;
  ignorePenetration?: number;
  resistCriticalRate?: number;
}

export interface BeltUpgrade {
  level: number;
  stats: BeltStats;
}

export interface Belt {
  id: string;
  name: string;
  type: 'belt';
  subtype: 'belt';
  grade: 'chaos';
  imagePath: string;
  baseStats: BeltStats;
  maxBaseLevel: number;
  currentLevel?: number;
  upgrades: BeltUpgrade[];
  totalStats?: BeltStats;
}

// Helper function to calculate the total stats for a belt at a specific level
export const calculateBeltStats = (belt: Belt, level: number = 0): BeltStats => {
  if (level < 0 || level > belt.maxBaseLevel) {
    return { ...belt.baseStats };
  }

  const upgradeStats = level > 0 ? belt.upgrades[level - 1]?.stats || {} : {};
  const totalStats: BeltStats = { ...belt.baseStats };

  // Combine base stats with upgrade stats
  Object.entries(upgradeStats).forEach(([stat, value]) => {
    const statKey = stat as keyof BeltStats;
    totalStats[statKey] = (totalStats[statKey] || 0) + (value || 0);
  });

  return totalStats;
};

/**
 * All available belts in the game
 */
export const belts: Belt[] = [
  {
    id: 'chaos_fighter_belt',
    name: 'Minesta\'s Chaos Fighter Belt',
    type: 'belt',
    subtype: 'belt',
    grade: 'chaos',
    imagePath: '/images/equipment-system/belts/fighter-belt.png',
    baseStats: {
      hp: 10
    },
    maxBaseLevel: 20,
    upgrades: [
      // Level 0
      {
        level: 0,
        stats: {
          hp: 0,
          attack: 0,
          criticalDamage: 0,
          swordSkillAmp: 0,
          accuracy: 0,
          penetration: 0
        }
      },
      // Level 1
      {
        level: 1,
        stats: {
          hp: 20,
          attack: 5,
          criticalDamage: 0,
          swordSkillAmp: 0,
          accuracy: 0,
          penetration: 0
        }
      },
      // Level 2
      {
        level: 2,
        stats: {
          hp: 30,
          attack: 10,
          criticalDamage: 0,
          swordSkillAmp: 0,
          accuracy: 0,
          penetration: 0
        }
      },
      // Level 3
      {
        level: 3,
        stats: {
          hp: 40,
          attack: 15,
          criticalDamage: 0,
          swordSkillAmp: 0,
          accuracy: 0,
          penetration: 0
        }
      },
      // Level 4
      {
        level: 4,
        stats: {
          hp: 50,
          attack: 20,
          criticalDamage: 1,
          swordSkillAmp: 0,
          accuracy: 0,
          penetration: 0
        }
      },
      // Level 5
      {
        level: 5,
        stats: {
          hp: 60,
          attack: 25,
          criticalDamage: 2,
          swordSkillAmp: 0,
          accuracy: 0,
          penetration: 0
        }
      },
      // Level 6
      {
        level: 6,
        stats: {
          hp: 70,
          attack: 30,
          criticalDamage: 3,
          swordSkillAmp: 1,
          accuracy: 0,
          penetration: 0
        }
      },
      // Level 7
      {
        level: 7,
        stats: {
          hp: 80,
          attack: 30,
          criticalDamage: 4,
          swordSkillAmp: 2,
          accuracy: 0,
          penetration: 0
        }
      },
      // Level 8
      {
        level: 8,
        stats: {
          hp: 90,
          attack: 40,
          criticalDamage: 5,
          swordSkillAmp: 3,
          accuracy: 0,
          penetration: 0
        }
      },
      // Level 9
      {
        level: 9,
        stats: {
          hp: 100,
          attack: 45,
          criticalDamage: 6,
          swordSkillAmp: 4,
          accuracy: 10,
          penetration: 0
        }
      },
      // Level 10
      {
        level: 10,
        stats: {
          hp: 110,
          attack: 50,
          criticalDamage: 7,
          swordSkillAmp: 5,
          accuracy: 20,
          penetration: 0
        }
      },
      // Level 11
      {
        level: 11,
        stats: {
          hp: 120,
          attack: 55,
          criticalDamage: 8,
          swordSkillAmp: 6,
          accuracy: 30,
          penetration: 0
        }
      },
      // Level 12
      {
        level: 12,
        stats: {
          hp: 130,
          attack: 60,
          criticalDamage: 9,
          swordSkillAmp: 7,
          accuracy: 40,
          penetration: 10
        }
      },
      // Level 13
      {
        level: 13,
        stats: {
          hp: 140,
          attack: 65,
          criticalDamage: 10,
          swordSkillAmp: 8,
          accuracy: 50,
          penetration: 20
        }
      },
      // Level 14
      {
        level: 14,
        stats: {
          hp: 150,
          attack: 70,
          criticalDamage: 11,
          swordSkillAmp: 9,
          accuracy: 60,
          penetration: 30
        }
      },
      // Level 15
      {
        level: 15,
        stats: {
          hp: 160,
          attack: 75,
          criticalDamage: 12,
          swordSkillAmp: 10,
          accuracy: 70,
          penetration: 40
        }
      },
      // Level 16
      {
        level: 16,
        stats: {
          hp: 170,
          attack: 85,
          criticalDamage: 14,
          swordSkillAmp: 11,
          accuracy: 80,
          penetration: 50
        }
      },
      // Level 17
      {
        level: 17,
        stats: {
          hp: 180,
          attack: 95,
          criticalDamage: 16,
          swordSkillAmp: 12,
          accuracy: 90,
          penetration: 60
        }
      },
      // Level 18
      {
        level: 18,
        stats: {
          hp: 190,
          attack: 105,
          criticalDamage: 18,
          swordSkillAmp: 13,
          accuracy: 100,
          penetration: 70
        }
      },
      // Level 19
      {
        level: 19,
        stats: {
          hp: 200,
          attack: 115,
          criticalDamage: 20,
          swordSkillAmp: 14,
          accuracy: 110,
          penetration: 80
        }
      },
      // Level 20
      {
        level: 20,
        stats: {
          hp: 210,
          attack: 125,
          criticalDamage: 22,
          swordSkillAmp: 14,
          accuracy: 110,
          penetration: 80
        }
      }
    ]
  },
  {
    id: 'chaos_sage_belt',
    name: 'Minesta\'s Chaos Sage Belt',
    type: 'belt',
    subtype: 'belt',
    grade: 'chaos',
    imagePath: '/images/equipment-system/belts/sage-belt.png',
    baseStats: {
      hp: 10
    },
    maxBaseLevel: 20,
    upgrades: [
      // Level 0
      {
        level: 0,
        stats: {
          hp: 0,
          magicAttack: 0,
          criticalDamage: 0,
          magicSkillAmp: 0,
          accuracy: 0,
          penetration: 0
        }
      },
      // Level 1
      {
        level: 1,
        stats: {
          hp: 20,
          magicAttack: 5,
          criticalDamage: 0,
          magicSkillAmp: 0,
          accuracy: 0,
          penetration: 0
        }
      },
      // Level 2
      {
        level: 2,
        stats: {
          hp: 30,
          magicAttack: 10,
          criticalDamage: 0,
          magicSkillAmp: 0,
          accuracy: 0,
          penetration: 0
        }
      },
      // Level 3
      {
        level: 3,
        stats: {
          hp: 40,
          magicAttack: 15,
          criticalDamage: 0,
          magicSkillAmp: 0,
          accuracy: 0,
          penetration: 0
        }
      },
      // Level 4
      {
        level: 4,
        stats: {
          hp: 50,
          magicAttack: 20,
          criticalDamage: 1,
          magicSkillAmp: 0,
          accuracy: 0,
          penetration: 0
        }
      },
      // Level 5
      {
        level: 5,
        stats: {
          hp: 60,
          magicAttack: 25,
          criticalDamage: 2,
          magicSkillAmp: 0,
          accuracy: 0,
          penetration: 0
        }
      },
      // Level 6
      {
        level: 6,
        stats: {
          hp: 70,
          magicAttack: 30,
          criticalDamage: 3,
          magicSkillAmp: 1,
          accuracy: 0,
          penetration: 0
        }
      },
      // Level 7
      {
        level: 7,
        stats: {
          hp: 80,
          magicAttack: 30,
          criticalDamage: 4,
          magicSkillAmp: 2,
          accuracy: 0,
          penetration: 0
        }
      },
      // Level 8
      {
        level: 8,
        stats: {
          hp: 90,
          magicAttack: 40,
          criticalDamage: 5,
          magicSkillAmp: 3,
          accuracy: 0,
          penetration: 0
        }
      },
      // Level 9
      {
        level: 9,
        stats: {
          hp: 100,
          magicAttack: 45,
          criticalDamage: 6,
          magicSkillAmp: 4,
          accuracy: 10,
          penetration: 0
        }
      },
      // Level 10
      {
        level: 10,
        stats: {
          hp: 110,
          magicAttack: 50,
          criticalDamage: 7,
          magicSkillAmp: 5,
          accuracy: 20,
          penetration: 0
        }
      },
      // Level 11
      {
        level: 11,
        stats: {
          hp: 120,
          magicAttack: 55,
          criticalDamage: 8,
          magicSkillAmp: 6,
          accuracy: 30,
          penetration: 0
        }
      },
      // Level 12
      {
        level: 12,
        stats: {
          hp: 130,
          magicAttack: 60,
          criticalDamage: 9,
          magicSkillAmp: 7,
          accuracy: 40,
          penetration: 10
        }
      },
      // Level 13
      {
        level: 13,
        stats: {
          hp: 140,
          magicAttack: 65,
          criticalDamage: 10,
          magicSkillAmp: 8,
          accuracy: 50,
          penetration: 20
        }
      },
      // Level 14
      {
        level: 14,
        stats: {
          hp: 150,
          magicAttack: 70,
          criticalDamage: 11,
          magicSkillAmp: 9,
          accuracy: 60,
          penetration: 30
        }
      },
      // Level 15
      {
        level: 15,
        stats: {
          hp: 160,
          magicAttack: 75,
          criticalDamage: 12,
          magicSkillAmp: 10,
          accuracy: 70,
          penetration: 40
        }
      },
      // Level 16
      {
        level: 16,
        stats: {
          hp: 170,
          magicAttack: 85,
          criticalDamage: 14,
          magicSkillAmp: 11,
          accuracy: 80,
          penetration: 50
        }
      },
      // Level 17
      {
        level: 17,
        stats: {
          hp: 180,
          magicAttack: 95,
          criticalDamage: 16,
          magicSkillAmp: 12,
          accuracy: 90,
          penetration: 60
        }
      },
      // Level 18
      {
        level: 18,
        stats: {
          hp: 190,
          magicAttack: 105,
          criticalDamage: 18,
          magicSkillAmp: 13,
          accuracy: 100,
          penetration: 70
        }
      },
      // Level 19
      {
        level: 19,
        stats: {
          hp: 200,
          magicAttack: 115,
          criticalDamage: 20,
          magicSkillAmp: 14,
          accuracy: 110,
          penetration: 80
        }
      },
      // Level 20
      {
        level: 20,
        stats: {
          hp: 210,
          magicAttack: 125,
          criticalDamage: 22,
          magicSkillAmp: 14,
          accuracy: 110,
          penetration: 80
        }
      }
    ]
  },
  {
    id: 'chaos_guardian_belt',
    name: 'Minesta\'s Chaos Guardian Belt',
    type: 'belt',
    subtype: 'belt',
    grade: 'chaos',
    imagePath: '/images/equipment-system/belts/guardian-belt.png',
    baseStats: {
      hp: 10
    },
    maxBaseLevel: 20,
    upgrades: [
      // Level 0
      {
        level: 0,
        stats: {
          hp: 0,
          defense: 0,
          resistCriticalDamage: 0,
          resistSkillAmp: 0,
          ignorePenetration: 0,
          resistCriticalRate: 0
        }
      },
      // Level 1
      {
        level: 1,
        stats: {
          hp: 20,
          defense: 7,
          resistCriticalDamage: 2,
          resistSkillAmp: 0,
          ignorePenetration: 0,
          resistCriticalRate: 0
        }
      },
      // Level 2
      {
        level: 2,
        stats: {
          hp: 30,
          defense: 14,
          resistCriticalDamage: 4,
          resistSkillAmp: 0,
          ignorePenetration: 0,
          resistCriticalRate: 0
        }
      },
      // Level 3
      {
        level: 3,
        stats: {
          hp: 40,
          defense: 21,
          resistCriticalDamage: 6,
          resistSkillAmp: 0,
          ignorePenetration: 0,
          resistCriticalRate: 0
        }
      },
      // Level 4
      {
        level: 4,
        stats: {
          hp: 50,
          defense: 28,
          resistCriticalDamage: 8,
          resistSkillAmp: 0,
          ignorePenetration: 0,
          resistCriticalRate: 0
        }
      },
      // Level 5
      {
        level: 5,
        stats: {
          hp: 60,
          defense: 35,
          resistCriticalDamage: 10,
          resistSkillAmp: 0,
          ignorePenetration: 0,
          resistCriticalRate: 0
        }
      },
      // Level 6
      {
        level: 6,
        stats: {
          hp: 70,
          defense: 42,
          resistCriticalDamage: 6,
          resistSkillAmp: 2,
          ignorePenetration: 0,
          resistCriticalRate: 0
        }
      },
      // Level 7
      {
        level: 7,
        stats: {
          hp: 80,
          defense: 42,
          resistCriticalDamage: 8,
          resistSkillAmp: 3,
          ignorePenetration: 0,
          resistCriticalRate: 0
        }
      },
      // Level 8
      {
        level: 8,
        stats: {
          hp: 90,
          defense: 56,
          resistCriticalDamage: 10,
          resistSkillAmp: 4,
          ignorePenetration: 0,
          resistCriticalRate: 0
        }
      },
      // Level 9
      {
        level: 9,
        stats: {
          hp: 100,
          defense: 63,
          resistCriticalDamage: 12,
          resistSkillAmp: 5,
          ignorePenetration: 0,
          resistCriticalRate: 0
        }
      },
      // Level 10
      {
        level: 10,
        stats: {
          hp: 110,
          defense: 70,
          resistCriticalDamage: 14,
          resistSkillAmp: 6,
          ignorePenetration: 5,
          resistCriticalRate: 0
        }
      },
      // Level 11
      {
        level: 11,
        stats: {
          hp: 120,
          defense: 77,
          resistCriticalDamage: 16,
          resistSkillAmp: 7,
          ignorePenetration: 10,
          resistCriticalRate: 0
        }
      },
      // Level 12
      {
        level: 12,
        stats: {
          hp: 130,
          defense: 84,
          resistCriticalDamage: 18,
          resistSkillAmp: 8,
          ignorePenetration: 15,
          resistCriticalRate: 1
        }
      },
      // Level 13
      {
        level: 13,
        stats: {
          hp: 140,
          defense: 91,
          resistCriticalDamage: 20,
          resistSkillAmp: 9,
          ignorePenetration: 20,
          resistCriticalRate: 2
        }
      },
      // Level 14
      {
        level: 14,
        stats: {
          hp: 150,
          defense: 98,
          resistCriticalDamage: 22,
          resistSkillAmp: 10,
          ignorePenetration: 25,
          resistCriticalRate: 3
        }
      },
      // Level 15
      {
        level: 15,
        stats: {
          hp: 160,
          defense: 105,
          resistCriticalDamage: 24,
          resistSkillAmp: 12,
          ignorePenetration: 30,
          resistCriticalRate: 4
        }
      },
      // Level 16
      {
        level: 16,
        stats: {
          hp: 170,
          defense: 112,
          resistCriticalDamage: 27,
          resistSkillAmp: 14,
          ignorePenetration: 40,
          resistCriticalRate: 5
        }
      },
      // Level 17
      {
        level: 17,
        stats: {
          hp: 180,
          defense: 119,
          resistCriticalDamage: 30,
          resistSkillAmp: 16,
          ignorePenetration: 50,
          resistCriticalRate: 6
        }
      },
      // Level 18
      {
        level: 18,
        stats: {
          hp: 190,
          defense: 126,
          resistCriticalDamage: 33,
          resistSkillAmp: 18,
          ignorePenetration: 60,
          resistCriticalRate: 7
        }
      },
      // Level 19
      {
        level: 19,
        stats: {
          hp: 200,
          defense: 133,
          resistCriticalDamage: 36,
          resistSkillAmp: 20,
          ignorePenetration: 70,
          resistCriticalRate: 8
        }
      },
      // Level 20
      {
        level: 20,
        stats: {
          hp: 210,
          defense: 140,
          resistCriticalDamage: 39,
          resistSkillAmp: 20,
          ignorePenetration: 80,
          resistCriticalRate: 8
        }
      }
    ]
  }
];

/**
 * Get a belt by its ID
 */
export const getBeltById = (id: string): Belt | undefined => {
  return belts.find(belt => belt.id === id);
};

/**
 * Get all belts
 */
export const getAllBelts = (): Belt[] => {
  return belts;
};

/**
 * Create a configured belt with current level and total stats
 */
export const createConfiguredBelt = (
  beltId: string,
  level: number = 0
): Belt | undefined => {
  const belt = getBeltById(beltId);
  if (!belt) return undefined;

  const configuredBelt: Belt = {
    ...belt,
    currentLevel: level,
    totalStats: calculateBeltStats(belt, level)
  };

  return configuredBelt;
};