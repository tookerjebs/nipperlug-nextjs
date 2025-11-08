// Static data and configurations for Force Wing System
import { SystemCategory, StatOption } from '@/tools/build-planner/types/systems';
import { getStatInfo } from '../../../data/stats-config';

// Helper function to create StatOption from stats-config data with composite key support
function createStatOption(
  statId: string,
  baseValue: number,
  maxLevel: number,
  trainingPointCosts: number[],
  levelValues: number[],
  variant?: string
): StatOption {
  const statInfo = getStatInfo(statId);
  if (!statInfo) {
    throw new Error(`Stat info not found for statId: ${statId}`);
  }

  // Create composite key if variant is provided
  const compositeId = variant ? `${statId}_${variant}` : statId;

  return {
    id: compositeId,
    name: statInfo.name,
    value: baseValue,
    isPercentage: statInfo.isPercentage,
    category: statInfo.category,
    maxLevel,
    trainingPointCosts,
    levelValues,
    // Store original stat ID for stat contribution
    originalStatId: statId,
    variant: variant
  };
}

// Available stat options for Force Wing system
// Slot-specific stat options mapping
export const forceWingSlotStats: Record<string, StatOption[]> = {
  // First slot (Row 1, Position 1) - force-wing-slot-1
  'force-wing-slot-1': [
    createStatOption(
      'pvpIgnorePenetration',
      2, // Base value at level 1
      5, // Max level
      [5, 8, 12, 20], // Training point costs for levels 2,3,4,5
      [2, 4, 6, 8, 15] // Values for levels 1,2,3,4,5
    ),
    createStatOption(
      'pvpDamageReduction',
      2, // Base value at level 1
      5, // Max level
      [10, 16, 28, 46], // Training point costs for levels 2,3,4,5
      [2, 16, 18, 22, 30], // Values for levels 1,2,3,4,5
      'weak' // Variant identifier
    ),
    createStatOption(
      'pveIgnorePenetration',
      3, // Base value at level 1
      5, // Max level
      [20, 28, 40, 62], // Training point costs for levels 2,3,4,5
      [3, 16, 18, 22, 30] // Values for levels 1,2,3,4,5
    ),
    createStatOption(
      'pveDamageReduction',
      3, // Base value at level 1
      5, // Max level
      [29, 40, 53, 80], // Training point costs for levels 2,3,4,5
      [3, 20, 26, 34, 50] // Values for levels 1,2,3,4,5
    ),
    createStatOption(
      'pvpDamageReduction',
      4, // Base value at level 1
      5, // Max level
      [65, 95, 125, 182], // Training point costs for levels 2,3,4,5
      [4, 20, 30, 40, 60], // Values for levels 1,2,3,4,5
      'strong' // Variant identifier
    )
  ],
  
  // Second slot (Row 1, Position 2) - force-wing-slot-2
  'force-wing-slot-2': [
    createStatOption(
      'pvpDefense',
      12, // Base value at level 1
      5, // Max level
      [3, 6, 9, 17], // Training point costs for levels 2,3,4,5
      [12, 22, 24, 28, 40], // Values for levels 1,2,3,4,5
      'weak' // Variant identifier
    ),
    createStatOption(
      'hp',
      16, // Base value at level 1
      5, // Max level
      [6, 10, 16, 28], // Training point costs for levels 2,3,4,5
      [16, 26, 38, 52, 80], // Values for levels 1,2,3,4,5
      'weak' // Variant identifier
    ),
    createStatOption(
      'pveDefense',
      10, // Base value at level 1
      5, // Max level
      [12, 22, 34, 52], // Training point costs for levels 2,3,4,5
      [10, 30, 42, 54, 75] // Values for levels 1,2,3,4,5
    ),
    createStatOption(
      'hp',
      25, // Base value at level 1
      5, // Max level
      [12, 23, 37, 60], // Training point costs for levels 2,3,4,5
      [25, 120, 150, 180, 250], // Values for levels 1,2,3,4,5
      'strong' // Variant identifier
    ),
    createStatOption(
      'pvpDefense',
      14, // Base value at level 1
      5, // Max level
      [35, 60, 85, 153], // Training point costs for levels 2,3,4,5
      [14, 30, 50, 70, 110], // Values for levels 1,2,3,4,5
      'strong' // Variant identifier
    )
  ],
  
  // Third slot (Row 1, Position 3) - force-wing-slot-3
  'force-wing-slot-3': [
    createStatOption(
      'ignoreResistKnockback',
      1, // Base value at level 1
      4, // Max level
      [3, 6, 18], // Training point costs for levels 2,3,4
      [1, 2, 4, 8] // Values for levels 1,2,3,4
    ),
    createStatOption(
      'resistDown',
      1, // Base value at level 1
      4, // Max level
      [2, 4, 14], // Training point costs for levels 2,3,4
      [1, 2, 4, 8] // Values for levels 1,2,3,4
    ),
    createStatOption(
      'ignoreResistStun',
      1, // Base value at level 1
      4, // Max level
      [3, 6, 18], // Training point costs for levels 2,3,4
      [1, 2, 4, 8] // Values for levels 1,2,3,4
    ),
    createStatOption(
      'resistUnableToMove',
      1, // Base value at level 1
      4, // Max level
      [9, 13, 23], // Training point costs for levels 2,3,4
      [1, 2, 3, 6] // Values for levels 1,2,3,4
    )
  ],
  
  // Fourth slot (Row 1, Position 4) - force-wing-slot-4
  'force-wing-slot-4': [
    createStatOption(
      'pvpNormalDamageUp',
      1, // Base value at level 1
      4, // Max level
      [4, 6, 15], // Training point costs for levels 2,3,4
      [1, 2, 3, 6] // Values for levels 1,2,3,4
    ),
    createStatOption(
      'pvpAddDamage',
      3, // Base value at level 1
      5, // Max level
      [5, 8, 14, 23], // Training point costs for levels 2,3,4,5
      [3, 8, 12, 20, 35], // Values for levels 1,2,3,4,5
      'weak' // Variant identifier
    ),
    createStatOption(
      'pveNormalDamageUp',
      2, // Base value at level 1
      4, // Max level
      [23, 35, 52], // Training point costs for levels 2,3,4
      [2, 4, 6, 12] // Values for levels 1,2,3,4
    ),
    createStatOption(
      'pveAddDamage',
      8, // Base value at level 1
      5, // Max level
      [14, 23, 36, 61], // Training point costs for levels 2,3,4,5
      [8, 20, 32, 48, 75], // Values for levels 1,2,3,4,5
      'strong' // Variant identifier
    ),
    createStatOption(
      'pvpCancelIgnoreDamageReduction',
      14, // Base value at level 1
      5, // Max level
      [40, 65, 90, 160], // Training point costs for levels 2,3,4,5
      [14, 30, 50, 70, 115] // Values for levels 1,2,3,4,5
    )
  ],
  
  // Fifth slot (Row 1, Position 5) - force-wing-slot-5
  'force-wing-slot-5': [
    createStatOption(
      'pvpAllAttackUp',
      4, // Base value at level 1
      5, // Max level
      [8, 12, 18, 32], // Training point costs for levels 2,3,4,5
      [4, 8, 12, 18, 30], // Values for levels 1,2,3,4,5
      'weak' // Variant identifier
    ),
    createStatOption(
      'pvpAllSkillAmp',
      1, // Base value at level 1
      3, // Max level
      [55, 95], // Training point costs for levels 2,3
      [1, 2, 4] // Values for levels 1,2,3
    ),
    createStatOption(
      'pveAllAttackUp',
      6, // Base value at level 1
      5, // Max level
      [35, 46, 58, 76], // Training point costs for levels 2,3,4,5
      [6, 14, 22, 32, 50] // Values for levels 1,2,3,4,5
    ),
    createStatOption(
      'pveAllSkillAmp',
      2, // Base value at level 1
      3, // Max level
      [90, 211], // Training point costs for levels 2,3
      [2, 4, 8] // Values for levels 1,2,3
    ),
    createStatOption(
      'pvpAllAttackUp',
      8, // Base value at level 1
      5, // Max level
      [80, 110, 140, 233], // Training point costs for levels 2,3,4,5
      [8, 20, 32, 46, 70], // Values for levels 1,2,3,4,5
      'strong' // Variant identifier
    )
  ],
  
  // Sixth slot (Row 1, Position 6) - force-wing-slot-6
  'force-wing-slot-6': [
    createStatOption(
      'pvpPenetration',
      2, // Base value at level 1
      4, // Max level
      [15, 22, 33], // Training point costs for levels 2,3,4
      [2, 5, 9, 15] // Values for levels 1,2,3,4
    ),
    createStatOption(
      'pvpCriticalDamage',
      1, // Base value at level 1
      3, // Max level
      [50, 90], // Training point costs for levels 2,3
      [1, 4, 8], // Values for levels 1,2,3
      'weak' // Variant identifier
    ),
    createStatOption(
      'pvePenetration',
      3, // Base value at level 1
      5, // Max level
      [35, 46, 58, 76], // Training point costs for levels 2,3,4,5
      [3, 7, 12, 16, 25] // Values for levels 1,2,3,4,5
    ),
    createStatOption(
      'pveCriticalDamage',
      2, // Base value at level 1
      4, // Max level
      [45, 80, 176], // Training point costs for levels 2,3,4
      [2, 4, 8, 16] // Values for levels 1,2,3,4
    ),
    createStatOption(
      'pvpCriticalDamage',
      3, // Base value at level 1
      4, // Max level
      [84, 174, 272], // Training point costs for levels 2,3,4
      [3, 6, 12, 25], // Values for levels 1,2,3,4
      'strong' // Variant identifier
    )
  ],
  
  // Seventh slot (Row 2, Position 1) - force-wing-slot-7
  'force-wing-slot-7': [
    createStatOption(
      'pveIgnorePenetration',
      2, // Base value at level 1
      5, // Max level
      [3, 6, 8, 17], // Training point costs for levels 2,3,4,5
      [2, 4, 6, 8, 15] // Values for levels 1,2,3,4,5
    ),
    createStatOption(
      'pveDamageReduction',
      2, // Base value at level 1
      5, // Max level
      [6, 12, 22, 40], // Training point costs for levels 2,3,4,5
      [2, 16, 18, 22, 30] // Values for levels 1,2,3,4,5
    ),
    createStatOption(
      'pvpIgnorePenetration',
      3, // Base value at level 1
      5, // Max level
      [12, 22, 34, 52], // Training point costs for levels 2,3,4,5
      [3, 16, 18, 22, 30] // Values for levels 1,2,3,4,5
    ),
    createStatOption(
      'pvpDamageReduction',
      3, // Base value at level 1
      5, // Max level
      [21, 31, 45, 80], // Training point costs for levels 2,3,4,5
      [3, 20, 26, 34, 50] // Values for levels 1,2,3,4,5
    ),
    createStatOption(
      'pveIgnorePenetration',
      3, // Base value at level 1
      5, // Max level
      [54, 95, 125, 182], // Training point costs for levels 2,3,4,5
      [3, 15, 20, 25, 35] // Values for levels 1,2,3,4,5
    )
  ],
  
  // Eighth slot (Row 2, Position 2) - force-wing-slot-8
  'force-wing-slot-8': [
    createStatOption(
      'pveDefense',
      12, // Base value at level 1
      5, // Max level
      [3, 5, 8, 15], // Training point costs for levels 2,3,4,5
      [12, 22, 24, 28, 40] // Values for levels 1,2,3,4,5
    ),
    createStatOption(
      'hp',
      16, // Base value at level 1
      5, // Max level
      [6, 12, 20, 35], // Training point costs for levels 2,3,4,5
      [16, 26, 38, 52, 80] // Values for levels 1,2,3,4,5
    ),
    createStatOption(
      'pvpDefense',
      10, // Base value at level 1
      5, // Max level
      [10, 17, 29, 49], // Training point costs for levels 2,3,4,5
      [10, 30, 42, 54, 75] // Values for levels 1,2,3,4,5
    ),
    createStatOption(
      'hp',
      35, // Base value at level 1
      5, // Max level
      [16, 27, 40, 62], // Training point costs for levels 2,3,4,5
      [35, 180, 210, 250, 350] // Values for levels 1,2,3,4,5
    ),
    createStatOption(
      'pveDefense',
      14, // Base value at level 1
      5, // Max level
      [35, 60, 85, 153], // Training point costs for levels 2,3,4,5
      [14, 30, 50, 70, 110] // Values for levels 1,2,3,4,5
    )
  ],
  
  // Ninth slot (Row 2, Position 3) - force-wing-slot-9
  'force-wing-slot-9': [
    createStatOption(
      'resistKnockback',
      1, // Base value at level 1
      4, // Max level
      [3, 4, 14], // Training point costs for levels 2,3,4
      [1, 2, 4, 8] // Values for levels 1,2,3,4
    ),
    createStatOption(
      'ignoreResistDown',
      1, // Base value at level 1
      4, // Max level
      [2, 6, 16], // Training point costs for levels 2,3,4
      [1, 2, 4, 8] // Values for levels 1,2,3,4
    ),
    createStatOption(
      'resistStun',
      1, // Base value at level 1
      4, // Max level
      [3, 4, 14], // Training point costs for levels 2,3,4
      [1, 2, 4, 8] // Values for levels 1,2,3,4
    ),
    createStatOption(
      'resistCriticalRate',
      1, // Base value at level 1
      2, // Max level
      [75], // Training point costs for level 2
      [1, 2] // Values for levels 1,2
    )
  ],
  
  // Tenth slot (Row 2, Position 4) - force-wing-slot-10
  'force-wing-slot-10': [
    createStatOption(
      'pveNormalDamageUp',
      1, // Base value at level 1
      4, // Max level
      [3, 5, 12], // Training point costs for levels 2,3,4
      [1, 2, 3, 6] // Values for levels 1,2,3,4
    ),
    createStatOption(
      'pveAddDamage',
      3, // Base value at level 1
      5, // Max level
      [3, 5, 11, 21], // Training point costs for levels 2,3,4,5
      [3, 8, 12, 20, 35], // Values for levels 1,2,3,4,5
      'weak' // Variant identifier
    ),
    createStatOption(
      'pvpNormalDamageUp',
      2, // Base value at level 1
      4, // Max level
      [23, 35, 52], // Training point costs for levels 2,3,4
      [2, 4, 6, 12] // Values for levels 1,2,3,4
    ),
    createStatOption(
      'pveAddDamage',
      8, // Base value at level 1
      5, // Max level
      [11, 21, 33, 55], // Training point costs for levels 2,3,4,5
      [8, 20, 32, 48, 75], // Values for levels 1,2,3,4,5
      'strong' // Variant identifier
    ),
    createStatOption(
      'pveCancelIgnoreDamageReduction',
      14, // Base value at level 1
      5, // Max level
      [40, 65, 90, 160], // Training point costs for levels 2,3,4,5
      [14, 30, 50, 70, 115] // Values for levels 1,2,3,4,5
    )
  ],
  
  // Eleventh slot (Row 2, Position 5) - force-wing-slot-11
  'force-wing-slot-11': [
    createStatOption(
      'pveAllAttackUp',
      4, // Base value at level 1
      5, // Max level
      [6, 10, 15, 24], // Training point costs for levels 2,3,4,5
      [4, 8, 12, 18, 30], // Values for levels 1,2,3,4,5
      'weak' // Variant identifier
    ),
    createStatOption(
      'pveAllSkillAmp',
      1, // Base value at level 1
      3, // Max level
      [33, 73], // Training point costs for levels 2,3
      [1, 2, 4] // Values for levels 1,2,3
    ),
    createStatOption(
      'pvpAllAttackUp',
      6, // Base value at level 1
      5, // Max level
      [24, 35, 48, 63], // Training point costs for levels 2,3,4,5
      [6, 14, 22, 32, 50], // Values for levels 1,2,3,4,5
      'weak' // Variant identifier
    ),
    createStatOption(
      'pvpAllSkillAmp',
      2, // Base value at level 1
      3, // Max level
      [70, 191], // Training point costs for levels 2,3
      [2, 4, 8], // Values for levels 1,2,3
      'strong' // Variant identifier
    ),
    createStatOption(
      'pveAllSkillAmp',
      2, // Base value at level 1
      4, // Max level
      [164, 285, 362], // Training point costs for levels 2,3,4
      [2, 3, 6, 13], // Values for levels 1,2,3,4
      'strong' // Variant identifier
    )
  ],
  
  // Twelfth slot (Row 2, Position 6) - force-wing-slot-12
  'force-wing-slot-12': [
    createStatOption(
      'pvePenetration',
      2, // Base value at level 1
      4, // Max level
      [12, 28, 25], // Training point costs for levels 2,3,4
      [2, 5, 9, 15] // Values for levels 1,2,3,4
    ),
    createStatOption(
      'pveCriticalDamage',
      1, // Base value at level 1
      3, // Max level
      [33, 73], // Training point costs for levels 2,3
      [1, 4, 8] // Values for levels 1,2,3
    ),
    createStatOption(
      'pvpPenetration',
      3, // Base value at level 1
      5, // Max level
      [24, 35, 48, 63], // Training point costs for levels 2,3,4,5
      [3, 7, 12, 16, 25], // Values for levels 1,2,3,4,5
      'weak' // Variant identifier
    ),
    createStatOption(
      'pvpCriticalDamage',
      2, // Base value at level 1
      4, // Max level
      [30, 70, 161], // Training point costs for levels 2,3,4
      [2, 4, 8, 16], // Values for levels 1,2,3,4
      'weak' // Variant identifier
    ),
    createStatOption(
      'pvpPenetration',
      13, // Base value at level 1
      4, // Max level
      [80, 110, 140], // Training point costs for levels 2,3,4
      [13, 17, 21, 26], // Values for levels 1,2,3,4
      'strong' // Variant identifier
    )
  ]
};

// Legacy export for backward compatibility - will be removed once all slots are defined
export const forceWingStatOptions: StatOption[] = [];

// Generate default Force Wing categories with 12 slots
export const getDefaultForceWingCategories = (): SystemCategory[] => {
  const slots = Array.from({ length: 12 }, (_, index) => ({
    id: `force-wing-slot-${index + 1}`,
    category: 'force-wing',
    position: index,
    isOccupied: false,
    contributedStats: {}
  }));

  return [
    {
      id: 'force-wing',
      name: 'force-wing',
      displayName: 'Force Wing',
      slots,
      maxSlots: 12
    }
  ];
};

export const FORCE_WING_CONFIG = {
  maxLevel: 10, // Fallback max level for individual slot stats (if not specified in stat data)
  slotsPerRow: 6,
  totalSlots: 12,
  // Force Wing Level Configuration
  // To extend max level in the future, simply change forceWingMaxLevel value
  // All components and validation will automatically adapt
  forceWingMaxLevel: 500, // Current max level for Force Wing itself
  forceWingMinLevel: 1,
  forceWingBaseStatMultiplier: 1 // 1:1 scaling (level = stat value)
};