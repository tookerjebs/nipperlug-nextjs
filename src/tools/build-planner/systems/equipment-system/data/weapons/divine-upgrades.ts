/**
 * Divine upgrade data for weapons - contains upgrade stats that vary by weapon grade and weapon type
 * All grades support levels 0-15, with different stat values per grade
 * Two-handed weapons (greatsword, daikatana) have their own stats defined separately
 */

import { DivineUpgradeLevel, WeaponStatType } from './types';

/**
 * Divine upgrade stats by weapon grade, weapon type (one-handed/two-handed), and level
 * Each grade (high, highest, ultimate) has different stat values but same level structure (0-15)
 * Stats for two-handed weapons are defined explicitly rather than calculated on the fly
 */
export const divineUpgrades: Record<string, Record<WeaponStatType, DivineUpgradeLevel[]>> = {
  high: {
    oneHanded: [
      // Level 0 - No bonuses
      {},
      // Level 1
      {
        allAttackUp: 18,
        attackRate: 5
      },
      // Level 2
      {
        allAttackUp: 22,
        attackRate: 10
      },
      // Level 3
      {
        allAttackUp: 26,
        attackRate: 15
      },
      // Level 4
      {
        allAttackUp: 30,
        attackRate: 20
      },
      // Level 5
      {
        allAttackUp: 34,
        attackRate: 30
      },
      // Level 6
      {
        allAttackUp: 38,
        attackRate: 40
      },
      // Level 7
      {
        allAttackUp: 42,
        attackRate: 50,
        criticalDamage: 1
      },
      // Level 8
      {
        allAttackUp: 46,
        attackRate: 60,
        criticalDamage: 2
      },
      // Level 9
      {
        allAttackUp: 50,
        attackRate: 70,
        criticalDamage: 3,
        accuracy: 60
      },
      // Level 10
      {
        allAttackUp: 54,
        attackRate: 90,
        criticalDamage: 4,
        accuracy: 75
      },
      // Level 11
      {
        allAttackUp: 58,
        attackRate: 110,
        criticalDamage: 5,
        accuracy: 90
      },
      // Level 12
      {
        allAttackUp: 62,
        attackRate: 130,
        criticalDamage: 6,
        accuracy: 105
      },
      // Level 13
      {
        allAttackUp: 66,
        attackRate: 150,
        criticalDamage: 7,
        accuracy: 120,
        penetration: 5
      },
      // Level 14
      {
        allAttackUp: 70,
        attackRate: 180,
        criticalDamage: 9,
        accuracy: 135,
        penetration: 25
      },
      // Level 15
      {
        allAttackUp: 74,
        attackRate: 210,
        criticalDamage: 11,
        accuracy: 150,
        penetration: 45
      }
    ],
    twoHanded: [
      // Level 0 - No bonuses
      {},
      // Level 1
      {
        allAttackUp: 36,
        attackRate: 10
      },
      // Level 2
      {
        allAttackUp: 44,
        attackRate: 20
      },
      // Level 3
      {
        allAttackUp: 52,
        attackRate: 30
      },
      // Level 4
      {
        allAttackUp: 60,
        attackRate: 40
      },
      // Level 5
      {
        allAttackUp: 68,
        attackRate: 60
      },
      // Level 6
      {
        allAttackUp: 76,
        attackRate: 80
      },
      // Level 7
      {
        allAttackUp: 84,
        attackRate: 100,
        criticalDamage: 2
      },
      // Level 8
      {
        allAttackUp: 92,
        attackRate: 120,
        criticalDamage: 4
      },
      // Level 9
      {
        allAttackUp: 100,
        attackRate: 140,
        criticalDamage: 6,
        accuracy: 120
      },
      // Level 10
      {
        allAttackUp: 108,
        attackRate: 180,
        criticalDamage: 8,
        accuracy: 150
      },
      // Level 11
      {
        allAttackUp: 116,
        attackRate: 220,
        criticalDamage: 10,
        accuracy: 180
      },
      // Level 12
      {
        allAttackUp: 124,
        attackRate: 260,
        criticalDamage: 12,
        accuracy: 210
      },
      // Level 13
      {
        allAttackUp: 132,
        attackRate: 300,
        criticalDamage: 14,
        accuracy: 240,
        penetration: 10
      },
      // Level 14
      {
        allAttackUp: 140,
        attackRate: 360,
        criticalDamage: 18,
        accuracy: 270,
        penetration: 50
      },
      // Level 15
      {
        allAttackUp: 148,
        attackRate: 420,
        criticalDamage: 22,
        accuracy: 300,
        penetration: 90
      }
    ]
  },
  highest: {
    oneHanded: [
      // Level 0 - No bonuses
      {},
      // Level 1
      {
        allAttackUp: 27,
        attackRate: 10
      },
      // Level 2
      {
        allAttackUp: 31,
        attackRate: 20
      },
      // Level 3
      {
        allAttackUp: 35,
        attackRate: 30
      },
      // Level 4
      {
        allAttackUp: 39,
        attackRate: 40
      },
      // Level 5
      {
        allAttackUp: 43,
        attackRate: 60
      },
      // Level 6
      {
        allAttackUp: 47,
        attackRate: 80
      },
      // Level 7
      {
        allAttackUp: 51,
        attackRate: 100,
        criticalDamage: 1
      },
      // Level 8
      {
        allAttackUp: 55,
        attackRate: 120,
        criticalDamage: 2
      },
      // Level 9
      {
        allAttackUp: 59,
        attackRate: 140,
        criticalDamage: 3,
        accuracy: 80
      },
      // Level 10
      {
        allAttackUp: 63,
        attackRate: 160,
        criticalDamage: 4,
        accuracy: 95
      },
      // Level 11
      {
        allAttackUp: 67,
        attackRate: 180,
        criticalDamage: 5,
        accuracy: 120
      },
      // Level 12
      {
        allAttackUp: 71,
        attackRate: 200,
        criticalDamage: 6,
        accuracy: 135
      },
      // Level 13
      {
        allAttackUp: 75,
        attackRate: 220,
        criticalDamage: 8,
        accuracy: 150,
        penetration: 10
      },
      // Level 14
      {
        allAttackUp: 79,
        attackRate: 240,
        criticalDamage: 10,
        accuracy: 165,
        penetration: 30
      },
      // Level 15
      {
        allAttackUp: 83,
        attackRate: 270,
        criticalDamage: 13,
        accuracy: 180,
        penetration: 50
      }
    ],
    twoHanded: [
      // Level 0 - No bonuses
      {},
      // Level 1
      {
        allAttackUp: 54,
        attackRate: 20
      },
      // Level 2
      {
        allAttackUp: 62,
        attackRate: 40
      },
      // Level 3
      {
        allAttackUp: 70,
        attackRate: 60
      },
      // Level 4
      {
        allAttackUp: 78,
        attackRate: 80
      },
      // Level 5
      {
        allAttackUp: 86,
        attackRate: 120
      },
      // Level 6
      {
        allAttackUp: 94,
        attackRate: 160
      },
      // Level 7
      {
        allAttackUp: 102,
        attackRate: 200,
        criticalDamage: 2
      },
      // Level 8
      {
        allAttackUp: 110,
        attackRate: 240,
        criticalDamage: 4
      },
      // Level 9
      {
        allAttackUp: 118,
        attackRate: 280,
        criticalDamage: 6,
        accuracy: 160
      },
      // Level 10
      {
        allAttackUp: 126,
        attackRate: 320,
        criticalDamage: 8,
        accuracy: 190
      },
      // Level 11
      {
        allAttackUp: 134,
        attackRate: 360,
        criticalDamage: 10,
        accuracy: 240
      },
      // Level 12
      {
        allAttackUp: 142,
        attackRate: 400,
        criticalDamage: 12,
        accuracy: 270
      },
      // Level 13
      {
        allAttackUp: 150,
        attackRate: 440,
        criticalDamage: 16,
        accuracy: 300,
        penetration: 20
      },
      // Level 14
      {
        allAttackUp: 158,
        attackRate: 480,
        criticalDamage: 20,
        accuracy: 330,
        penetration: 60
      },
      // Level 15
      {
        allAttackUp: 166,
        attackRate: 540,
        criticalDamage: 26,
        accuracy: 360,
        penetration: 100
      }
    ]
  },
  ultimate: {
    oneHanded: [
      // Level 0 - No bonuses
      {},
      // Level 1
      {
        allAttackUp: 36,
        attackRate: 15
      },
      // Level 2
      {
        allAttackUp: 40,
        attackRate: 30
      },
      // Level 3
      {
        allAttackUp: 44,
        attackRate: 45
      },
      // Level 4
      {
        allAttackUp: 48,
        attackRate: 60
      },
      // Level 5
      {
        allAttackUp: 52,
        attackRate: 90
      },
      // Level 6
      {
        allAttackUp: 56,
        attackRate: 120
      },
      // Level 7
      {
        allAttackUp: 60,
        attackRate: 150,
        criticalDamage: 1
      },
      // Level 8
      {
        allAttackUp: 64,
        attackRate: 180,
        criticalDamage: 2
      },
      // Level 9
      {
        allAttackUp: 68,
        attackRate: 210,
        criticalDamage: 3,
        accuracy: 100
      },
      // Level 10
      {
        allAttackUp: 72,
        attackRate: 230,
        criticalDamage: 4,
        accuracy: 115
      },
      // Level 11
      {
        allAttackUp: 76,
        attackRate: 250,
        criticalDamage: 5,
        accuracy: 150
      },
      // Level 12
      {
        allAttackUp: 80,
        attackRate: 270,
        criticalDamage: 6,
        accuracy: 165
      },
      // Level 13
      {
        allAttackUp: 84,
        attackRate: 290,
        criticalDamage: 9,
        accuracy: 180,
        penetration: 15
      },
      // Level 14
      {
        allAttackUp: 88,
        attackRate: 300,
        criticalDamage: 11,
        accuracy: 195,
        penetration: 35
      },
      // Level 15
      {
        allAttackUp: 92,
        attackRate: 330,
        criticalDamage: 15,
        accuracy: 210,
        penetration: 55
      }
    ],
    twoHanded: [
      // Level 0 - No bonuses
      {},
      // Level 1
      {
        allAttackUp: 72,
        attackRate: 30
      },
      // Level 2
      {
        allAttackUp: 80,
        attackRate: 60
      },
      // Level 3
      {
        allAttackUp: 88,
        attackRate: 90
      },
      // Level 4
      {
        allAttackUp: 96,
        attackRate: 120
      },
      // Level 5
      {
        allAttackUp: 104,
        attackRate: 180
      },
      // Level 6
      {
        allAttackUp: 112,
        attackRate: 240
      },
      // Level 7
      {
        allAttackUp: 120,
        attackRate: 300,
        criticalDamage: 2
      },
      // Level 8
      {
        allAttackUp: 128,
        attackRate: 360,
        criticalDamage: 4
      },
      // Level 9
      {
        allAttackUp: 136,
        attackRate: 420,
        criticalDamage: 6,
        accuracy: 200
      },
      // Level 10
      {
        allAttackUp: 144,
        attackRate: 460,
        criticalDamage: 8,
        accuracy: 230
      },
      // Level 11
      {
        allAttackUp: 152,
        attackRate: 500,
        criticalDamage: 10,
        accuracy: 300
      },
      // Level 12
      {
        allAttackUp: 160,
        attackRate: 540,
        criticalDamage: 12,
        accuracy: 330
      },
      // Level 13
      {
        allAttackUp: 168,
        attackRate: 580,
        criticalDamage: 18,
        accuracy: 360,
        penetration: 30
      },
      // Level 14
      {
        allAttackUp: 176,
        attackRate: 600,
        criticalDamage: 22,
        accuracy: 390,
        penetration: 70
      },
      // Level 15
      {
        allAttackUp: 184,
        attackRate: 660,
        criticalDamage: 30,
        accuracy: 420,
        penetration: 110
      }
    ]
  }
};

/**
 * Get divine upgrade stats for a specific grade, level, and weapon hand type
 * @param grade - Weapon grade (high, highest, ultimate)
 * @param level - Divine upgrade level (0-15)
 * @param handType - The weapon hand type ('oneHanded' or 'twoHanded')
 * @returns Divine upgrade stats for the specified grade and level
 */
export function getDivineUpgradeStats(
  grade: string, 
  level: number, 
  handType: WeaponStatType
): DivineUpgradeLevel {
  // Get grade-specific data (default to 'high' if grade is not found)
  // Normal grade doesn't have divine upgrades, so we default to 'high'
  const validGrade = divineUpgrades[grade] ? grade : 'high';
  
  // Get stats for the specific grade, weapon type, and level
  const gradeUpgrades = divineUpgrades[validGrade][handType];
  const clampedLevel = Math.max(0, Math.min(15, level));
  
  return gradeUpgrades[clampedLevel] || {};
}

/**
 * Get the maximum divine upgrade level (always 15 for all grades)
 * @param grade - Weapon grade (unused but kept for consistency)
 * @returns Maximum divine upgrade level
 */
export function getMaxDivineLevel(grade: string): number {
  return 15;
}

/**
 * Check if a divine upgrade level is valid for any grade
 * @param level - Level to validate
 * @returns True if level is valid (0-15)
 */
export function isValidDivineLevel(level: number): boolean {
  return level >= 0 && level <= 15;
}