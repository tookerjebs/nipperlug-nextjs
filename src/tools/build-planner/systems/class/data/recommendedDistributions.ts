// Recommended stat distributions for each class and weapon type
import type { CharacterClass } from '../types';

export interface RecommendedDistribution {
  str: number;
  int: number;
  dex: number;
  weapon?: string; // Optional weapon type description
}

export interface ClassRecommendations {
  [weaponKey: string]: RecommendedDistribution;
}

export const RECOMMENDED_DISTRIBUTIONS: Record<CharacterClass, ClassRecommendations> = {
  warrior: {
    greatsword: {
      str: 1148, // max (1379 - 77 - 154)
      int: 77,
      dex: 154,
      weapon: 'Greatsword'
    },
    daikatana: {
      str: 1098, // max (1379 - 77 - 204)
      int: 77,
      dex: 204,
      weapon: 'Daikatana'
    }
  },
  force_shielder: {
    blade: {
      str: 870, // max (1379 - 309 - 200)
      int: 309,
      dex: 200,
      weapon: 'Blade'
    },
    katana: {
      str: 798, // max (1379 - 309 - 272)
      int: 309,
      dex: 272,
      weapon: 'Katana'
    }
  },
  gladiator: {
    chakram: {
      str: 948, // max (1379 - 97 - 334)
      int: 97,
      dex: 334,
      weapon: 'Chakram'
    }
  },
  blader: {
    blade: {
      str: 386,
      int: 77,
      dex: 916, // max (1379 - 386 - 77)
      weapon: 'Blade/Katana'
    }
  },
  wizard: {
    orb: {
      str: 68,
      int: 1175, // max (1379 - 68 - 136)
      dex: 136,
      weapon: 'Orb'
    },
    crystal: {
      str: 132,
      int: 1047, // max (1379 - 132 - 200)
      dex: 200,
      weapon: 'Crystal'
    }
  },
  dark_mage: {
    orb: {
      str: 159,
      int: 1084, // max (1379 - 159 - 136)
      dex: 136,
      weapon: 'Orb'
    },
    crystal: {
      str: 159,
      int: 1020, // max (1379 - 159 - 200)
      dex: 200,
      weapon: 'Crystal'
    }
  },
  force_archer: {
    bow: {
      str: 154,
      int: 916, // max (1379 - 154 - 309)
      dex: 309,
      weapon: 'Bow'
    }
  },
  force_blader: {
    katana: {
      str: 309,
      int: 309,
      dex: 761, // max (1379 - 309 - 309)
      weapon: 'Katana'
    },
    blade: {
      str: 340,
      int: 309,
      dex: 730, // max (1379 - 340 - 309)
      weapon: 'Blade'
    }
  },
  force_gunner: {
    gun: {
      str: 146,
      int: 1033, // max (1379 - 146 - 200)
      dex: 200,
      weapon: 'Gun'
    }
  }
};

/**
 * Get recommended distributions for a class
 */
export function getRecommendedDistributions(classId: CharacterClass | null): ClassRecommendations | null {
  if (!classId) return null;
  return RECOMMENDED_DISTRIBUTIONS[classId] || null;
}

