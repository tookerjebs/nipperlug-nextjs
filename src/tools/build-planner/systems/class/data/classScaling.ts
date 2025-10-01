// Class-specific stat scaling data
// Current ranges: [0-100, 101-200, 201-300, 301-400, 401-500, 501-600, 601-700, 701-800, 801-900, 901-1000, 1001+]
// ✅ = Verified | ❓ = Placeholder

import type { CharacterClass } from '../types';

export interface StatScaling {
  hp?: number[];
  attack?: number[];
  magicAttack?: number[];
  attackRate?: number[];
  defenseRate?: number[];
  evasion?: number[];
  damageReduction?: number[];
  ignorePenetration?: number[];
  resistCriticalRate?: number[];
  resistCriticalDamage?: number[];
  resistSkillAmp?: number[];
  resistKnockback?: number[];
  resistStun?: number[];
  resistDown?: number[];
  resistUnableToMove?: number[];
}

export interface ClassScalingData {
  str: StatScaling;
  int: StatScaling;
  dex: StatScaling;
}

// Validation function to ensure scaling arrays match the number of stat ranges
export function validateScalingData(scaling: StatScaling, className: string, statType: string): void {
  const expectedLength = STAT_RANGES.length;
  
  Object.entries(scaling).forEach(([statKey, multipliers]) => {
    if (multipliers && multipliers.length !== expectedLength) {
      console.warn(
        `⚠️  ${className} ${statType}.${statKey}: Expected ${expectedLength} values, got ${multipliers.length}. ` +
        `Current ranges: ${STAT_RANGES.map(r => `${r.min}-${r.max === 999999 ? '∞' : r.max}`).join(', ')}`
      );
    }
  });
}

// Helper function to determine which tier a stat value belongs to (for data entry reference)
export function getStatTierInfo(statValue: number): { tier: number; range: string } {
  for (let i = 0; i < STAT_RANGES.length; i++) {
    const range = STAT_RANGES[i];
    if (statValue >= range.min && statValue <= range.max) {
      return {
        tier: i,
        range: `${range.min}-${range.max === 999999 ? '∞' : range.max}`
      };
    }
  }
  return {
    tier: STAT_RANGES.length - 1,
    range: `${STAT_RANGES[STAT_RANGES.length - 1].min}+`
  };
}

export const CLASS_SCALING: Record<CharacterClass, ClassScalingData> = {
  // WARRIOR - Legacy data, needs verification
  // ❓ All tiers: Placeholder data from old system - needs game testing
  warrior: {
    str: {
      hp: [1.2, 1.0, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8], // ❓ Placeholder
      attack: [0.8, 0.6, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4], // ❓ Placeholder
      damageReduction: [0.25, 0.2, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15], // ❓ Placeholder
      ignorePenetration: [0.3, 0.25, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2] // ❓ Placeholder
    },
    int: {
      magicAttack: [0.3, 0.25, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2], // ❓ Placeholder
      resistCriticalRate: [0.06, 0.05, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04], // ❓ Placeholder
      resistCriticalDamage: [0.12, 0.1, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08], // ❓ Placeholder
      resistSkillAmp: [0.06, 0.05, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04], // ❓ Placeholder
      resistKnockback: [0.06, 0.05, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04], // ❓ Placeholder
      resistStun: [0.06, 0.05, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04] // ❓ Placeholder
    },
    dex: {
      attackRate: [0.5, 0.4, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3], // ❓ Placeholder
      defenseRate: [0.3, 0.25, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2], // ❓ Placeholder
      evasion: [0.5, 0.4, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3], // ❓ Placeholder
      resistDown: [0.06, 0.05, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04], // ❓ Placeholder
      resistUnableToMove: [0.06, 0.05, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04, 0.04] // ❓ Placeholder
    }
  },

  // WIZARD - Legacy data, needs verification
  // ❓ All tiers: Placeholder data from old system - needs game testing
  wizard: {
    str: {
      hp: [0.5, 0.4, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3], // ❓ Placeholder
      attack: [0.3, 0.25, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2], // ❓ Placeholder
      damageReduction: [0.15, 0.12, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1], // ❓ Placeholder
      ignorePenetration: [0.2, 0.15, 0.12, 0.12, 0.12, 0.12, 0.12, 0.12, 0.12, 0.12, 0.12] // ❓ Placeholder
    },
    int: {
      magicAttack: [1.2, 1.0, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8, 0.8], // ❓ Placeholder
      resistCriticalRate: [0.12, 0.1, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08], // ❓ Placeholder
      resistCriticalDamage: [0.2, 0.15, 0.12, 0.12, 0.12, 0.12, 0.12, 0.12, 0.12, 0.12, 0.12], // ❓ Placeholder
      resistSkillAmp: [0.12, 0.1, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08, 0.08], // ❓ Placeholder
      resistKnockback: [0.08, 0.06, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05], // ❓ Placeholder
      resistStun: [0.08, 0.06, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05] // ❓ Placeholder
    },
    dex: {
      attackRate: [0.4, 0.3, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25], // ❓ Placeholder
      defenseRate: [0.3, 0.25, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2], // ❓ Placeholder
      evasion: [0.4, 0.3, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25], // ❓ Placeholder
      resistDown: [0.08, 0.06, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05], // ❓ Placeholder
      resistUnableToMove: [0.08, 0.06, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05] // ❓ Placeholder
    }
  },
  // BLADER - Verified data from game testing
  // ✅ STR Tiers 0-10: Fully verified from game data
  // ✅ INT Tiers 0-2: Verified from game data  
  // ✅ DEX Tiers 0-2: Verified from game data
  blader: {
    str: {
      hp: [0, 1, 0.6, 0.5, 0.5, 0.5, 0.25, 0.25, 0.25, 0.25, 0.2], // ✅ Tiers 0-2 verified, ✅ Tiers 3-10 updated
      attack: [0.807, 0.807, 0.6, 0.807, 0.807, 0.807, 0.807, 0.807, 0.807, 0.807, 0.607], // ✅ Tiers 0-2 verified, ✅ Tiers 3-10 updated
      damageReduction: [0.5, 0.5, 0.12, 0.3, 0.3, 0.3, 0.15, 0.15, 0.15, 0.15, 0.15], // ✅ Tiers 0-2 verified, ✅ Tiers 3-10 updated
      resistKnockback: [0.03, 0.01, 0.05, 0.005, 0.005, 0.005, 0.005, 0.005, 0.005, 0.005, 0.005], // ✅ Tiers 0-2 verified, ✅ Tiers 3-10 updated
      resistDown: [0.036, 0.011, 0.05, 0.011, 0.011, 0.011, 0.011, 0.011, 0.011, 0.011, 0.011], // ✅ Tiers 0-2 verified, ✅ Tiers 3-10 updated
      ignorePenetration: [0.02, 0.02, 0.15, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02, 0.02] // ✅ Tiers 0-2 verified, ✅ Tiers 3-10 updated
    },
    int: {
      magicAttack: [0.3, 0.3, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25], // ✅ Tiers 0-1 verified
      resistCriticalRate: [0.02, 0.01, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05], // ✅ Tiers 0-1 verified
      resistCriticalDamage: [0.06, 0.02, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1], // ✅ Tiers 0-1 verified
      resistSkillAmp: [0.03, 0.01, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05], // ✅ Tiers 0-1 verified
      resistKnockback: [0.03, 0.005, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05], // ✅ Tiers 0-1 verified
      resistStun: [0.03, 0.01, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05] // ✅ Tiers 0-1 verified
    },
    dex: {
      attack: [0.807, 0.807, 0.807, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4], // ✅ Tiers 0-2 verified
      attackRate: [6.28, 6.28, 2.28, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4], // ✅ Tiers 0-2 verified
      defenseRate: [5.1, 5.1, 1.6, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25], // ✅ Tiers 0-2 verified
      evasion: [6, 6, 2, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4], // ✅ Tiers 0-2 verified
      resistUnableToMove: [0.025, 0.015, 0.009, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05], // ✅ Tiers 0-2 verified
      resistDown: [0.036, 0.011, 0.011, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05] // ✅ Tiers 0-2 verified
    }
  },

  // GLADIATOR - Legacy data, needs verification
  // ❓ All tiers: Placeholder data from old system - needs game testing
  gladiator: {
    str: {
      hp: [0.056, 0.912, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7], // ❓ Placeholder
      attack: [0.91, 0.91, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5], // ❓ Placeholder
      damageReduction: [0.53, 0.33, 0.14, 0.14, 0.14, 0.14, 0.14, 0.14, 0.14, 0.14, 0.14], // ❓ Placeholder
      resistKnockback: [0.035, 0.015, 0.045, 0.045, 0.045, 0.045, 0.045, 0.045, 0.045, 0.045, 0.045], // ❓ Placeholder
      resistDown: [0.035, 0.01, 0.045, 0.045, 0.045, 0.045, 0.045, 0.045, 0.045, 0.045, 0.045], // ❓ Placeholder
      ignorePenetration: [0.01, 0.22, 0.18, 0.18, 0.18, 0.18, 0.18, 0.18, 0.18, 0.18, 0.18] // ❓ Placeholder
    },
    int: {
      magicAttack: [0.4, 0.28, 0.22, 0.22, 0.22, 0.22, 0.22, 0.22, 0.22, 0.22, 0.22], // ❓ Placeholder
      resistCriticalRate: [0.02, 0.01, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05], // ❓ Placeholder
      resistCriticalDamage: [0.06, 0.02, 0.09, 0.09, 0.09, 0.09, 0.09, 0.09, 0.09, 0.09, 0.09], // ❓ Placeholder
      resistSkillAmp: [0.03, 0.01, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05], // ❓ Placeholder
      resistStun: [0.03, 0.01, 0.045, 0.045, 0.045, 0.045, 0.045, 0.045, 0.045, 0.045, 0.045] // ❓ Placeholder
    },
    dex: {
      attackRate: [6, 6, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35], // ❓ Placeholder
      defenseRate: [5, 5, 0.22, 0.22, 0.22, 0.22, 0.22, 0.22, 0.22, 0.22, 0.22], // ❓ Placeholder
      evasion: [6, 6, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35, 0.35], // ❓ Placeholder
      resistUnableToMove: [0.019, 0.009, 0.045, 0.045, 0.045, 0.045, 0.045, 0.045, 0.045, 0.045, 0.045], // ❓ Placeholder
      resistDown: [0.035, 0.01, 0.045, 0.045, 0.045, 0.045, 0.045, 0.045, 0.045, 0.045, 0.045] // ❓ Placeholder
    }
  },

  // DARK MAGE - STR: ✅ 0-100, 101-200 | DEX: ✅ 0-100, 101-200 | INT: ✅ 0-100, 1000+
  dark_mage: {
    str: {
      hp: [0, 1.1, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4], // ✅ 0-100, 
      attack: [0.3, 0.3, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25], // ✅ 0-100, 
      damageReduction: [0.8, 0.7, 0.11, 0.11, 0.11, 0.11, 0.11, 0.11, 0.11, 0.11, 0.11], // ✅ 0-100, 
      resistDown: [0.03, 0.005, 0.055, 0.055, 0.055, 0.055, 0.055, 0.055, 0.055, 0.055, 0.055], // ✅ 0-100, 
      ignorePenetration: [0.02, 0.02, 0.14, 0.14, 0.14, 0.14, 0.14, 0.14, 0.14, 0.14, 0.14] // ✅ 0-100,
    },
    int: {
      magicAttack: [0.93, 0.9, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 0.7, 1.02], // ✅ 0-100, INT 1000+
      resistCriticalRate: [0.02, 0.09, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07, 0.004], // ✅ 0-100, INT 1000+
      resistCriticalDamage: [0.097, 0.14, 0.11, 0.11, 0.11, 0.11, 0.11, 0.11, 0.11, 0.11, 0.035], // ✅ 0-100, INT 1000+
      resistSkillAmp: [0.045, 0.09, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07, 0.07, 0.007], // ✅ 0-100, INT 1000+
      resistKnockback: [0.042, 0.065, 0.055, 0.055, 0.055, 0.055, 0.055, 0.055, 0.055, 0.055, 0.012], // ✅ 0-100, INT 1000+
      resistStun: [0.044, 0.065, 0.055, 0.055, 0.055, 0.055, 0.055, 0.055, 0.055, 0.055, 0.014] // ✅ 0-100, INT 1000+
    },
    dex: {
      attackRate: [6.6, 6.6, 0.27, 0.27, 0.27, 0.27, 0.27, 0.27, 0.27, 0.27, 0.27], // ✅ 0-100, DEX 120
      defenseRate: [5.5, 5.5, 0.22, 0.22, 0.22, 0.22, 0.22, 0.22, 0.22, 0.22, 0.22], // ✅ 0-100, DEX 120
      evasion: [6, 6, 0.27, 0.27, 0.27, 0.27, 0.27, 0.27, 0.27, 0.27, 0.27], // ✅ 0-100, DEX 120
      resistDown: [0.02, 0.01, 0.055, 0.055, 0.055, 0.055, 0.055, 0.055, 0.055, 0.055, 0.055], // ✅ 0-100, DEX 120
      resistUnableToMove: [0.03, 0.005, 0.055, 0.055, 0.055, 0.055, 0.055, 0.055, 0.055, 0.055, 0.055] // ✅ 0-100, DEX 120
    }
  },

  // FORCE ARCHER - Legacy data, needs verification
  // ❓ All tiers: Placeholder data from old system - needs game testing
  force_archer: {
    str: {
      hp: [0.8, 0.6, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5], // ❓ Placeholder
      attack: [0.6, 0.5, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4], // ❓ Placeholder
      damageReduction: [0.18, 0.15, 0.12, 0.12, 0.12, 0.12, 0.12, 0.12, 0.12, 0.12, 0.12], // ❓ Placeholder
      ignorePenetration: [0.24, 0.18, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15] // ❓ Placeholder
    },
    int: {
      magicAttack: [0.5, 0.4, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3], // ❓ Placeholder
      resistCriticalRate: [0.09, 0.07, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06], // ❓ Placeholder
      resistCriticalDamage: [0.16, 0.13, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1, 0.1], // ❓ Placeholder
      resistSkillAmp: [0.09, 0.07, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06], // ❓ Placeholder
      resistKnockback: [0.07, 0.06, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05], // ❓ Placeholder
      resistStun: [0.07, 0.06, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05] // ❓ Placeholder
    },
    dex: {
      attackRate: [0.7, 0.6, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5], // ❓ Placeholder
      defenseRate: [0.35, 0.3, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25], // ❓ Placeholder
      evasion: [0.7, 0.6, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5], // ❓ Placeholder
      resistDown: [0.07, 0.06, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05], // ❓ Placeholder
      resistUnableToMove: [0.07, 0.06, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05, 0.05] // ❓ Placeholder
    }
  },

  // FORCE GUNNER - Legacy data, needs verification
  // ❓ All tiers: Placeholder data from old system - needs game testing
  force_gunner: {
    str: {
      hp: [0.7, 0.6, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5], // ❓ Placeholder
      attack: [0.7, 0.6, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5], // ❓ Placeholder
      damageReduction: [0.19, 0.16, 0.13, 0.13, 0.13, 0.13, 0.13, 0.13, 0.13, 0.13, 0.13], // ❓ Placeholder
      ignorePenetration: [0.26, 0.19, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16, 0.16] // ❓ Placeholder
    },
    int: {
      magicAttack: [0.6, 0.5, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4], // ❓ Placeholder
      resistCriticalRate: [0.095, 0.075, 0.065, 0.065, 0.065, 0.065, 0.065, 0.065, 0.065, 0.065, 0.065], // ❓ Placeholder
      resistCriticalDamage: [0.17, 0.135, 0.11, 0.11, 0.11, 0.11, 0.11, 0.11, 0.11, 0.11, 0.11], // ❓ Placeholder
      resistSkillAmp: [0.095, 0.075, 0.065, 0.065, 0.065, 0.065, 0.065, 0.065, 0.065, 0.065, 0.065], // ❓ Placeholder
      resistKnockback: [0.072, 0.062, 0.052, 0.052, 0.052, 0.052, 0.052, 0.052, 0.052, 0.052, 0.052], // ❓ Placeholder
      resistStun: [0.072, 0.062, 0.052, 0.052, 0.052, 0.052, 0.052, 0.052, 0.052, 0.052, 0.052] // ❓ Placeholder
    },
    dex: {
      attackRate: [0.65, 0.55, 0.45, 0.45, 0.45, 0.45, 0.45, 0.45, 0.45, 0.45, 0.45], // ❓ Placeholder
      defenseRate: [0.33, 0.28, 0.23, 0.23, 0.23, 0.23, 0.23, 0.23, 0.23, 0.23, 0.23], // ❓ Placeholder
      evasion: [0.65, 0.55, 0.45, 0.45, 0.45, 0.45, 0.45, 0.45, 0.45, 0.45, 0.45], // ❓ Placeholder
      resistDown: [0.072, 0.062, 0.052, 0.052, 0.052, 0.052, 0.052, 0.052, 0.052, 0.052, 0.052], // ❓ Placeholder
      resistUnableToMove: [0.072, 0.062, 0.052, 0.052, 0.052, 0.052, 0.052, 0.052, 0.052, 0.052, 0.052] // ❓ Placeholder
    }
  },

  // FORCE BLADER - Legacy data, needs verification
  // ❓ All tiers: Placeholder data from old system - needs game testing
  force_blader: {
    str: {
      hp: [0.9, 0.7, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55], // ❓ Placeholder
      attack: [0.85, 0.7, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55], // ❓ Placeholder
      damageReduction: [0.21, 0.17, 0.13, 0.13, 0.13, 0.13, 0.13, 0.13, 0.13, 0.13, 0.13], // ❓ Placeholder
      ignorePenetration: [0.27, 0.21, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17, 0.17] // ❓ Placeholder
    },
    int: {
      magicAttack: [0.7, 0.6, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5, 0.5], // ❓ Placeholder
      resistCriticalRate: [0.085, 0.07, 0.055, 0.055, 0.055, 0.055, 0.055, 0.055, 0.055, 0.055, 0.055], // ❓ Placeholder
      resistCriticalDamage: [0.155, 0.125, 0.095, 0.095, 0.095, 0.095, 0.095, 0.095, 0.095, 0.095, 0.095], // ❓ Placeholder
      resistSkillAmp: [0.085, 0.07, 0.055, 0.055, 0.055, 0.055, 0.055, 0.055, 0.055, 0.055, 0.055], // ❓ Placeholder
      resistKnockback: [0.068, 0.058, 0.048, 0.048, 0.048, 0.048, 0.048, 0.048, 0.048, 0.048, 0.048], // ❓ Placeholder
      resistStun: [0.068, 0.058, 0.048, 0.048, 0.048, 0.048, 0.048, 0.048, 0.048, 0.048, 0.048] // ❓ Placeholder
    },
    dex: {
      attackRate: [0.58, 0.48, 0.38, 0.38, 0.38, 0.38, 0.38, 0.38, 0.38, 0.38, 0.38], // ❓ Placeholder
      defenseRate: [0.36, 0.31, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26, 0.26], // ❓ Placeholder
      evasion: [0.58, 0.48, 0.38, 0.38, 0.38, 0.38, 0.38, 0.38, 0.38, 0.38, 0.38], // ❓ Placeholder
      resistDown: [0.068, 0.058, 0.048, 0.048, 0.048, 0.048, 0.048, 0.048, 0.048, 0.048, 0.048], // ❓ Placeholder
      resistUnableToMove: [0.068, 0.058, 0.048, 0.048, 0.048, 0.048, 0.048, 0.048, 0.048, 0.048, 0.048] // ❓ Placeholder
    }
  },

  // FORCE SHIELDER - Legacy data, needs verification
  // ❓ All tiers: Placeholder data from old system - needs game testing
  force_shielder: {
    str: {
      hp: [1.3, 1.1, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9, 0.9], // ❓ Placeholder
      attack: [0.6, 0.5, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4, 0.4], // ❓ Placeholder
      damageReduction: [0.3, 0.25, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2, 0.2], // ❓ Placeholder
      ignorePenetration: [0.25, 0.2, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15, 0.15] // ❓ Placeholder
    },
    int: {
      magicAttack: [0.45, 0.35, 0.28, 0.28, 0.28, 0.28, 0.28, 0.28, 0.28, 0.28, 0.28], // ❓ Placeholder
      resistCriticalRate: [0.1, 0.08, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06], // ❓ Placeholder
      resistCriticalDamage: [0.18, 0.15, 0.12, 0.12, 0.12, 0.12, 0.12, 0.12, 0.12, 0.12, 0.12], // ❓ Placeholder
      resistSkillAmp: [0.1, 0.08, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06], // ❓ Placeholder
      resistKnockback: [0.08, 0.07, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06], // ❓ Placeholder
      resistStun: [0.08, 0.07, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06] // ❓ Placeholder
    },
    dex: {
      attackRate: [0.4, 0.3, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25], // ❓ Placeholder
      defenseRate: [0.4, 0.35, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3, 0.3], // ❓ Placeholder
      evasion: [0.4, 0.3, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25, 0.25], // ❓ Placeholder
      resistDown: [0.08, 0.07, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06], // ❓ Placeholder
      resistUnableToMove: [0.08, 0.07, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06, 0.06] // ❓ Placeholder
    }
  }
};

// Stat ranges for scaling calculation
// TODO: Verify exact ranges - may need ranges every 100 points (0-100, 101-200, 201-300, etc.)
export const STAT_RANGES = [
  { min: 0, max: 100 },     // Tier 0
  { min: 101, max: 200 },   // Tier 1
  { min: 201, max: 300 },   // Tier 2
  { min: 301, max: 400 },   // Tier 3
  { min: 401, max: 500 },   // Tier 4
  { min: 501, max: 600 },   // Tier 5
  { min: 601, max: 700 },   // Tier 6
  { min: 701, max: 800 },   // Tier 7
  { min: 801, max: 900 },   // Tier 8
  { min: 901, max: 1000 },  // Tier 9
  { min: 1001, max: 999999 } // Tier 10 (1001+)
];

// Class-specific base stats
export interface ClassBaseStats {
  str: number;
  int: number;
  dex: number;
}

export const CLASS_BASE_STATS: Record<CharacterClass, ClassBaseStats> = {
  warrior: {
    str: 24,
    int: 3,
    dex: 8
  },
  wizard: {
    str: 10, // Keep default for wizard (not specified in requirements)
    int: 10,
    dex: 10
  },
  blader: {
    str: 16,
    int: 3,
    dex: 16
  },
  gladiator: {
    str: 10, // Keep default for gladiator (not specified in requirements)
    int: 10,
    dex: 10
  },
  dark_mage: {
    str: 3,
    int: 26,
    dex: 6
  },
  force_archer: {
    str: 10, // Keep default for force_archer (not specified in requirements)
    int: 10,
    dex: 10
  },
  force_gunner: {
    str: 10, // Keep default for force_gunner (not specified in requirements)
    int: 10,
    dex: 10
  },
  force_blader: {
    str: 12,
    int: 12,
    dex: 11
  },
  force_shielder: {
    str: 15,
    int: 11,
    dex: 9
  }
};

// Validate all scaling data on module load (development only)
if (process.env.NODE_ENV === 'development') {
  Object.entries(CLASS_SCALING).forEach(([className, classData]) => {
    validateScalingData(classData.str, className, 'STR');
    validateScalingData(classData.int, className, 'INT');
    validateScalingData(classData.dex, className, 'DEX');
  });
}