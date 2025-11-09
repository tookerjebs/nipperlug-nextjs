// Gold Merit System Configuration
import type { GoldMeritArrow } from '../types/index';

// ============================================================================
// Slot ID to MasteryIndex Mapping
// Maps old slot IDs to new masteryIndex values from gold-merit-comprehensive.json
// ============================================================================

export const GoldMeritSlotMapping: Record<string, number> = {
  // Category 1: Ignore Evasion
  'accuracy-tier-1': 1,              // Accuracy, maxLevel 5
  'attack-rate-tier-1': 2,            // Attack Rate, maxLevel 5
  'ignore-evasion-tier-1': 3,         // Ignore Evasion, maxLevel 5
  'attack-rate-tier-2': 4,            // Attack Rate, maxLevel 10
  'accuracy-tier-2': 5,               // Accuracy, maxLevel 10
  'ignore-evasion-tier-2': 6,        // Ignore Evasion, maxLevel 10
  'attack-rate-tier-3': 7,            // Attack Rate, maxLevel 15
  'accuracy-tier-3': 8,               // Accuracy, maxLevel 15
  'ignore-evasion-tier-3': 9,         // Ignore Evasion, maxLevel 15
  'expanded-attack-rate-tier-1': 10,  // Expansion slot, maxLevel 1, linked to attack-rate-tier-1
  'expanded-accuracy-tier-1': 11,    // Expansion slot, maxLevel 1, linked to accuracy-tier-1
  'expanded-attack-rate-tier-2': 12,  // Expansion slot, maxLevel 1, linked to attack-rate-tier-2
  'expanded-accuracy-tier-2': 13,    // Expansion slot, maxLevel 1, linked to accuracy-tier-2
  'expanded-attack-rate-tier-3': 14,  // Expansion slot, maxLevel 1, linked to attack-rate-tier-3
  'expanded-accuracy-tier-3': 15,    // Expansion slot, maxLevel 1, linked to accuracy-tier-3

  // Category 2: Ignore Accuracy
  'evasion-tier-1': 16,
  'defense-rate-tier-1': 17,
  'ignore-accuracy-tier-1': 18,
  'defense-rate-tier-2': 19,
  'evasion-tier-2': 20,
  'ignore-accuracy-tier-2': 21,
  'cancel-ignore-evasion-tier-1': 22,
  'defense-rate-tier-3': 23,          // Defense Rate, maxLevel 15
  'evasion-tier-3': 24,               // Evasion, maxLevel 15
  'cancel-ignore-evasion-tier-2': 25, // Cancel Ignore Evasion, maxLevel 10
  'ignore-accuracy-tier-3': 26,       // Ignore Accuracy, maxLevel 15
  'defense-rate-expand-tier-1': 27,   // Expansion slot, maxLevel 1
  'evasion-expand-tier-1': 28,        // Expansion slot, maxLevel 1
  'defense-rate-expand-tier-2': 29,   // Expansion slot, maxLevel 1
  'evasion-expand-tier-2': 30,        // Expansion slot, maxLevel 1
  'defense-rate-expand-tier-3': 31,    // Expansion slot, maxLevel 1
  'evasion-expand-tier-3': 32,        // Expansion slot, maxLevel 1

  // Category 3: Ignore Damage Reduction
  'penetration-tier-1': 33,           // Penetration, maxLevel 5
  'additional-damage-tier-1': 34,      // Additional Damage, maxLevel 5
  'ignore-damage-reduction-tier-1': 35, // Ignore Damage Reduction, maxLevel 5
  'penetration-tier-2': 36,            // Penetration, maxLevel 10
  'ignore-damage-reduction-tier-2': 37, // Ignore Damage Reduction, maxLevel 10
  'additional-damage-tier-2': 38,     // Additional Damage, maxLevel 10
  'penetration-tier-3': 39,            // Penetration, maxLevel 15
  'additional-damage-tier-3': 40,     // Additional Damage, maxLevel 15
  'ignore-damage-reduction-tier-3': 41, // Ignore Damage Reduction, maxLevel 15
  'additional-damage-expand-tier-1': 42, // Expansion slot, maxLevel 1
  'penetration-expand-tier-1': 43,    // Expansion slot, maxLevel 1
  'additional-damage-expand-tier-2': 44, // Expansion slot, maxLevel 1
  'penetration-expand-tier-2': 45,    // Expansion slot, maxLevel 1
  'additional-damage-expand-tier-3': 46, // Expansion slot, maxLevel 1
  'penetration-expand-tier-3': 47,    // Expansion slot, maxLevel 1

  // Category 4: Ignore Penetration
  'damage-reduce-tier-1': 48,          // Damage Reduction, maxLevel 5
  'defense-tier-1': 49,               // Defense, maxLevel 5
  'ignore-penetration-tier-1': 50,    // Ignore Penetration, maxLevel 5
  'cancel-ignore-damage-reduce-tier-1': 51, // Cancel Ignore Damage Reduction, maxLevel 5
  'damage-reduce-tier-2': 52,         // Damage Reduction, maxLevel 10
  'ignore-penetration-tier-2': 53,    // Ignore Penetration, maxLevel 10
  'defense-tier-2': 54,               // Defense, maxLevel 10
  'damage-reduce-tier-3': 55,         // Damage Reduction, maxLevel 15
  'defense-tier-3': 56,               // Defense, maxLevel 15
  'ignore-penetration-tier-3': 57,    // Ignore Penetration, maxLevel 15
  'cancel-ignore-damage-reduce-tier-2': 58, // Cancel Ignore Damage Reduction, maxLevel 10
  'defense-expand-tier-1': 59,        // Expansion slot, maxLevel 1
  'damage-reduce-expand-tier-1': 60,  // Expansion slot, maxLevel 1
  'defense-expand-tier-2': 61,        // Expansion slot, maxLevel 1
  'damage-reduce-expand-tier-2': 62,  // Expansion slot, maxLevel 1
  'defense-expand-tier-3': 63,        // Expansion slot, maxLevel 1
  'damage-reduce-expand-tier-3': 64   // Expansion slot, maxLevel 1
};

// ============================================================================
// Grid Positions
// ============================================================================

export const GoldMeritGridPositions: Record<string, { row: number; col: number }> = {
  // Category 1: Ignore Evasion
  'accuracy-tier-1': { row: 0, col: 0 },
  'attack-rate-tier-1': { row: 2, col: 0 },
  'ignore-evasion-tier-1': { row: 4, col: 0 },
  'attack-rate-tier-2': { row: 4, col: 2 },
  'accuracy-tier-2': { row: 2, col: 2 },
  'ignore-evasion-tier-2': { row: 4, col: 4 },
  'attack-rate-tier-3': { row: 2, col: 4 },
  'accuracy-tier-3': { row: 0, col: 4 },
  'ignore-evasion-tier-3': { row: 0, col: 6 },
  'expanded-attack-rate-tier-1': { row: 1, col: 7 },
  'expanded-attack-rate-tier-2': { row: 3, col: 7 },
  'expanded-attack-rate-tier-3': { row: 5, col: 7 },
  'expanded-accuracy-tier-1': { row: 1, col: 9 },
  'expanded-accuracy-tier-2': { row: 3, col: 9 },
  'expanded-accuracy-tier-3': { row: 5, col: 9 },

  // Category 2: Ignore Accuracy
  'evasion-tier-1': { row: 0, col: 0 },
  'evasion-tier-3': { row: 0, col: 2 },
  'ignore-accuracy-tier-3': { row: 0, col: 4 },
  'defense-rate-tier-1': { row: 2, col: 0 },
  'defense-rate-tier-2': { row: 5, col: 1 },
  'cancel-ignore-evasion-tier-2': { row: 2, col: 4 },
  'defense-rate-expand-tier-1': { row: 2, col: 6 },
  'evasion-expand-tier-1': { row: 2, col: 8 },
  'ignore-accuracy-tier-1': { row: 4, col: 0 },
  'cancel-ignore-evasion-tier-1': { row: 4, col: 4 },
  'evasion-tier-2': { row: 6, col: 2 },
  'defense-rate-expand-tier-2': { row: 4, col: 6 },
  'evasion-expand-tier-2': { row: 4, col: 8 },
  'defense-rate-tier-3': { row: 2, col: 2 },
  'ignore-accuracy-tier-2': { row: 4, col: 2 },
  'defense-rate-expand-tier-3': { row: 6, col: 6 },
  'evasion-expand-tier-3': { row: 6, col: 8 },

  // Category 3: Ignore Damage Reduction
  'penetration-tier-1': { row: 0, col: 0 },
  'additional-damage-tier-3': { row: 0, col: 4 },
  'ignore-damage-reduction-tier-3': { row: 0, col: 6 },
  'additional-damage-expand-tier-1': { row: 1, col: 7 },
  'penetration-expand-tier-1': { row: 1, col: 9 },
  'additional-damage-tier-1': { row: 2, col: 0 },
  'ignore-damage-reduction-tier-2': { row: 2, col: 2 },
  'penetration-tier-3': { row: 2, col: 4 },
  'additional-damage-expand-tier-2': { row: 3, col: 7 },
  'penetration-expand-tier-2': { row: 3, col: 9 },
  'ignore-damage-reduction-tier-1': { row: 4, col: 0 },
  'penetration-tier-2': { row: 4, col: 2 },
  'additional-damage-tier-2': { row: 4, col: 4 },
  'additional-damage-expand-tier-3': { row: 5, col: 7 },
  'penetration-expand-tier-3': { row: 5, col: 9 },

  // Category 4: Ignore Penetration
  'damage-reduce-tier-1': { row: 0, col: 0 },
  'damage-reduce-tier-2': { row: 6, col: 2 },
  'cancel-ignore-damage-reduce-tier-2': { row: 0, col: 4 },
  'defense-tier-1': { row: 2, col: 0 },
  'damage-reduce-tier-3': { row: 2, col: 2 },
  'ignore-penetration-tier-3': { row: 2, col: 4 },
  'defense-expand-tier-1': { row: 2, col: 6 },
  'damage-reduce-expand-tier-1': { row: 2, col: 8 },
  'ignore-penetration-tier-1': { row: 4, col: 0 },
  'ignore-penetration-tier-2': { row: 4, col: 2 },
  'defense-tier-2': { row: 4, col: 4 },
  'defense-expand-tier-2': { row: 4, col: 6 },
  'damage-reduce-expand-tier-2': { row: 4, col: 8 },
  'cancel-ignore-damage-reduce-tier-1': { row: 5, col: 1 },
  'defense-tier-3': { row: 0, col: 2 },
  'defense-expand-tier-3': { row: 6, col: 6 },
  'damage-reduce-expand-tier-3': { row: 6, col: 8 }
};

// ============================================================================
// Grid Elements (Arrows)
// Arrow definitions for each category (extracted from gold-merit-data.ts)
// ============================================================================

export const GoldMeritGridElements: Record<string, GoldMeritArrow[]> = {
  'ignore-evasion': [
    { id: 'arrow-1', type: 'arrow', direction: 'down', gridPosition: { row: 1, col: 0 } },
    { id: 'arrow-2', type: 'arrow', direction: 'down', gridPosition: { row: 3, col: 0 } },
    { id: 'arrow-3', type: 'arrow', direction: 'right', gridPosition: { row: 4, col: 1 } },
    { id: 'arrow-4', type: 'arrow', direction: 'up', gridPosition: { row: 3, col: 2 } },
    { id: 'arrow-5', type: 'arrow', direction: 'right', gridPosition: { row: 4, col: 3 } },
    { id: 'arrow-6', type: 'arrow', direction: 'up', gridPosition: { row: 3, col: 4 } },
    { id: 'arrow-7', type: 'arrow', direction: 'up', gridPosition: { row: 1, col: 4 } },
    { id: 'arrow-8', type: 'arrow', direction: 'right', gridPosition: { row: 0, col: 5 } },
    { id: 'arrow-expanded-1', type: 'arrow', direction: 'down', gridPosition: { row: 2, col: 7 } },
    { id: 'arrow-expanded-2', type: 'arrow', direction: 'down', gridPosition: { row: 4, col: 7 } },
    { id: 'arrow-curved-1', type: 'arrow', direction: 'down-right', gridPosition: { row: 1, col: 6 } },
    { id: 'arrow-to-accuracy-expand-1', type: 'arrow', direction: 'right', gridPosition: { row: 1, col: 8 } },
    { id: 'arrow-to-accuracy-expand-2', type: 'arrow', direction: 'right', gridPosition: { row: 3, col: 8 } },
    { id: 'arrow-to-accuracy-expand-3', type: 'arrow', direction: 'right', gridPosition: { row: 5, col: 8 } }
  ],
  'ignore-accuracy': [
    { id: 'arrow-1', type: 'arrow', direction: 'right', gridPosition: { row: 0, col: 3 } },
    { id: 'arrow-2', type: 'arrow', direction: 'down', gridPosition: { row: 1, col: 0 } },
    { id: 'arrow-3', type: 'arrow', direction: 'up', gridPosition: { row: 1, col: 2 } },
    { id: 'arrow-4', type: 'arrow', direction: 'right', gridPosition: { row: 2, col: 3 } },
    { id: 'arrow-5', type: 'arrow', direction: 'right', gridPosition: { row: 2, col: 5 } },
    { id: 'arrow-6', type: 'arrow', direction: 'right', gridPosition: { row: 2, col: 7 } },
    { id: 'arrow-7', type: 'arrow', direction: 'down', gridPosition: { row: 3, col: 0 } },
    { id: 'arrow-8', type: 'arrow', direction: 'up', gridPosition: { row: 3, col: 2 } },
    { id: 'arrow-9', type: 'arrow', direction: 'down', gridPosition: { row: 3, col: 6 } },
    { id: 'arrow-10', type: 'arrow', direction: 'up-right', gridPosition: { row: 4, col: 1 } },
    { id: 'arrow-11', type: 'arrow', direction: 'right', gridPosition: { row: 4, col: 3 } },
    { id: 'arrow-12', type: 'arrow', direction: 'right', gridPosition: { row: 4, col: 7 } },
    { id: 'arrow-13', type: 'arrow', direction: 'down-right', gridPosition: { row: 5, col: 0 } },
    { id: 'arrow-14', type: 'arrow', direction: 'down', gridPosition: { row: 5, col: 6 } },
    { id: 'arrow-15', type: 'arrow', direction: 'down-right', gridPosition: { row: 6, col: 1 } },
    { id: 'arrow-16', type: 'arrow', direction: 'right', gridPosition: { row: 6, col: 7 } }
  ],
  'ignore-damage-reduction': [
    { id: 'arrow-1', type: 'arrow', direction: 'right', gridPosition: { row: 0, col: 5 } },
    { id: 'arrow-2', type: 'arrow', direction: 'down', gridPosition: { row: 1, col: 0 } },
    { id: 'arrow-3', type: 'arrow', direction: 'up', gridPosition: { row: 1, col: 4 } },
    { id: 'arrow-4', type: 'arrow', direction: 'down-right', gridPosition: { row: 1, col: 6 } },
    { id: 'arrow-5', type: 'arrow', direction: 'right', gridPosition: { row: 1, col: 8 } },
    { id: 'arrow-6', type: 'arrow', direction: 'down', gridPosition: { row: 2, col: 7 } },
    { id: 'arrow-7', type: 'arrow', direction: 'down', gridPosition: { row: 3, col: 0 } },
    { id: 'arrow-8', type: 'arrow', direction: 'up', gridPosition: { row: 3, col: 2 } },
    { id: 'arrow-9', type: 'arrow', direction: 'up', gridPosition: { row: 3, col: 4 } },
    { id: 'arrow-10', type: 'arrow', direction: 'right', gridPosition: { row: 3, col: 8 } },
    { id: 'arrow-11', type: 'arrow', direction: 'right', gridPosition: { row: 4, col: 1 } },
    { id: 'arrow-12', type: 'arrow', direction: 'right', gridPosition: { row: 4, col: 3 } },
    { id: 'arrow-13', type: 'arrow', direction: 'down', gridPosition: { row: 4, col: 7 } },
    { id: 'arrow-14', type: 'arrow', direction: 'right', gridPosition: { row: 5, col: 8 } }
  ],
  'ignore-penetration': [
    { id: 'arrow-1', type: 'arrow', direction: 'down', gridPosition: { row: 1, col: 0 } },
    { id: 'arrow-2', type: 'arrow', direction: 'up', gridPosition: { row: 1, col: 2 } },
    { id: 'arrow-3', type: 'arrow', direction: 'up', gridPosition: { row: 1, col: 4 } },
    { id: 'arrow-4', type: 'arrow', direction: 'right', gridPosition: { row: 2, col: 3 } },
    { id: 'arrow-5', type: 'arrow', direction: 'right', gridPosition: { row: 2, col: 5 } },
    { id: 'arrow-6', type: 'arrow', direction: 'right', gridPosition: { row: 2, col: 7 } },
    { id: 'arrow-7', type: 'arrow', direction: 'down', gridPosition: { row: 3, col: 0 } },
    { id: 'arrow-8', type: 'arrow', direction: 'up', gridPosition: { row: 3, col: 2 } },
    { id: 'arrow-9', type: 'arrow', direction: 'down', gridPosition: { row: 3, col: 6 } },
    { id: 'arrow-10', type: 'arrow', direction: 'right', gridPosition: { row: 4, col: 1 } },
    { id: 'arrow-11', type: 'arrow', direction: 'right', gridPosition: { row: 4, col: 3 } },
    { id: 'arrow-12', type: 'arrow', direction: 'right', gridPosition: { row: 4, col: 7 } },
    { id: 'arrow-13', type: 'arrow', direction: 'down-right', gridPosition: { row: 5, col: 0 } },
    { id: 'arrow-14', type: 'arrow', direction: 'down', gridPosition: { row: 5, col: 6 } },
    { id: 'arrow-15', type: 'arrow', direction: 'down-right', gridPosition: { row: 6, col: 1 } },
    { id: 'arrow-16', type: 'arrow', direction: 'right', gridPosition: { row: 6, col: 7 } }
  ]
};

