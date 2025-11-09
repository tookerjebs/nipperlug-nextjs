/**
 * Artifact System Data
 * Parsed from artifact data raw.txt
 */

import { ArtifactDefinition, ArtifactSlotDefinition, ArtifactSlotOption, ArtifactType, SlotType } from '../types';

/**
 * Maps artifact stat names to stat IDs in stats-config.ts
 */
function mapStatNameToId(statName: string): string | null {
  const mapping: Record<string, string> = {
    // Dawn stats (no prefix)
    'All Attack Up': 'allAttackUp',
    'Normal DMG Up': 'normalDamageUp',
    'Attack Rate': 'attackRate',
    'Accuracy': 'accuracy',
    'Ignore Evasion': 'ignoreEvasion',
    'Defense': 'defense',
    'HP': 'hp',
    'Defense Rate': 'defenseRate',
    'Ignore Accuracy': 'ignoreAccuracy',
    'Evasion': 'evasion',
    'Cancel Ignore Penetration': 'cancelIgnorePenetration',
    'Ignore DMG Reduce': 'ignoreDamageReduction',
    'DMG Reduce': 'damageReduction',
    
    // PvE stats
    'PvE Penetration': 'pvePenetration',
    'PvE Normal DMG Up': 'pveNormalDamageUp',
    'PvE Attack Rate': 'pveAttackRate',
    'PvE Accuracy': 'pveAccuracy',
    'PvE Ignore Evasion': 'pveIgnoreEvasion',
    'PvE Ignore Penetration': 'pveIgnorePenetration',
    'PvE DMG Reduce': 'pveDamageReduction',
    'PvE Defense Rate': 'pveDefenseRate',
    'PvE Ignore Accuracy': 'pveIgnoreAccuracy',
    'PvE Evasion': 'pveEvasion',
    'PvE Crit. DMG': 'pveCriticalDamage',
    'PvE Ignore DMG Reduce': 'pveIgnoreDamageReduction',
    'PvE All Attack Up': 'pveAllAttackUp',
    'PvE Add Damage': 'pveAddDamage',
    'PvE Defense': 'pveDefense',
    
    // PvP stats
    'PvP Ignore Penetration': 'pvpIgnorePenetration',
    'PvP Defense': 'pvpDefense',
    'PvP Resist Skill Amp.': 'pvpResistSkillAmp',
    'PvP All Skill Amp.': 'pvpAllSkillAmp',
    'PvP Crit. DMG': 'pvpCriticalDamage',
    'PvP Attack Rate': 'pvpAttackRate',
    'PvP Accuracy': 'pvpAccuracy',
    'PvP Ignore Evasion': 'pvpIgnoreEvasion',
    'PvP All Attack Up': 'pvpAllAttackUp',
    'PvP Penetration': 'pvpPenetration',
    'PvP Add Damage': 'pvpAddDamage',
    'PvP Ignore DMG Reduce': 'pvpIgnoreDamageReduction',
    
    // Other stats
    'Resist Crit. DMG': 'resistCriticalDamage',
  };
  
  return mapping[statName] || null;
}

/**
 * Parse stat values from string (handles percentages and commas)
 */
function parseStatValues(valueString: string): { values: number[]; isPercentage: boolean } {
  const isPercentage = valueString.includes('%');
  const cleaned = valueString.replace(/%/g, '').replace(/,/g, '');
  const values = cleaned.split(',').map(v => parseFloat(v.trim())).filter(v => !isNaN(v));
  return { values, isPercentage };
}

/**
 * Artifact of Dawn
 * 2 Unique + 2 Assembled slots, max level 5
 */
const artifactDawn: ArtifactDefinition = {
  artifactType: 'dawn',
  name: 'Artifact of Dawn',
  maxLevel: 5,
  uniqueSlots: [
    {
      slotIndex: 1,
      slotType: 'unique',
      options: [
        {
          statId: 'allAttackUp',
          chance: 1.00,
          values: [8, 12, 18, 28, 40],
          isPercentage: false,
        },
        {
          statId: 'normalDamageUp',
          chance: 15.00,
          values: [3, 5, 8, 13, 20],
          isPercentage: true,
        },
        {
          statId: 'attackRate',
          chance: 28.00,
          values: [40, 45, 55, 70, 90],
          isPercentage: false,
        },
        {
          statId: 'accuracy',
          chance: 28.00,
          values: [40, 45, 55, 70, 90],
          isPercentage: false,
        },
        {
          statId: 'ignoreEvasion',
          chance: 28.00,
          values: [40, 45, 55, 70, 90],
          isPercentage: false,
        },
      ],
    },
    {
      slotIndex: 2,
      slotType: 'unique',
      options: [
        {
          statId: 'defense',
          chance: 2.00,
          values: [15, 18, 23, 32, 45],
          isPercentage: false,
        },
        {
          statId: 'hp',
          chance: 17.00,
          values: [20, 30, 45, 65, 90],
          isPercentage: false,
        },
        {
          statId: 'defenseRate',
          chance: 27.00,
          values: [40, 45, 55, 70, 90],
          isPercentage: false,
        },
        {
          statId: 'ignoreAccuracy',
          chance: 27.00,
          values: [40, 45, 55, 70, 90],
          isPercentage: false,
        },
        {
          statId: 'evasion',
          chance: 27.00,
          values: [40, 45, 55, 70, 90],
          isPercentage: false,
        },
      ],
    },
  ],
  assembledSlots: [
    {
      slotIndex: 1,
      slotType: 'assembled',
      options: [
        {
          statId: 'cancelIgnorePenetration',
          chance: 1.00,
          values: [5, 7, 9, 13, 20],
          isPercentage: false,
        },
        {
          statId: 'ignoreDamageReduction',
          chance: 15.00,
          values: [6, 9, 13, 18, 25],
          isPercentage: false,
        },
        {
          statId: 'attackRate',
          chance: 28.00,
          values: [40, 45, 55, 70, 90],
          isPercentage: false,
        },
        {
          statId: 'accuracy',
          chance: 28.00,
          values: [40, 45, 55, 70, 90],
          isPercentage: false,
        },
        {
          statId: 'ignoreEvasion',
          chance: 28.00,
          values: [40, 45, 55, 70, 90],
          isPercentage: false,
        },
      ],
    },
    {
      slotIndex: 2,
      slotType: 'assembled',
      options: [
        {
          statId: 'damageReduction',
          chance: 2.00,
          values: [5, 6, 8, 12, 20],
          isPercentage: false,
        },
        {
          statId: 'hp',
          chance: 17.00,
          values: [20, 30, 45, 65, 90],
          isPercentage: false,
        },
        {
          statId: 'defenseRate',
          chance: 27.00,
          values: [40, 45, 55, 70, 90],
          isPercentage: false,
        },
        {
          statId: 'ignoreAccuracy',
          chance: 27.00,
          values: [40, 45, 55, 70, 90],
          isPercentage: false,
        },
        {
          statId: 'evasion',
          chance: 27.00,
          values: [40, 45, 55, 70, 90],
          isPercentage: false,
        },
      ],
    },
  ],
};

/**
 * Artifact of Dusk
 * 2 Unique + 2 Assembled slots, max level 6
 */
const artifactDusk: ArtifactDefinition = {
  artifactType: 'dusk',
  name: 'Artifact of Dusk',
  maxLevel: 6,
  uniqueSlots: [
    {
      slotIndex: 1,
      slotType: 'unique',
      options: [
        {
          statId: 'resistCriticalDamage',
          chance: 2.50,
          values: [20, 25, 32, 42, 55, 70],
          isPercentage: true,
        },
        {
          statId: 'pvpIgnorePenetration',
          chance: 21.50,
          values: [15, 18, 23, 30, 45, 65],
          isPercentage: false,
        },
        {
          statId: 'pvpDefense',
          chance: 38.00,
          values: [30, 35, 40, 50, 65, 90],
          isPercentage: false,
        },
        {
          statId: 'pvpResistSkillAmp',
          chance: 38.00,
          values: [3, 4, 5, 7, 10, 15],
          isPercentage: true,
        },
      ],
    },
    {
      slotIndex: 2,
      slotType: 'unique',
      options: [
        {
          statId: 'pvpAllSkillAmp',
          chance: 2.00,
          values: [1, 2, 3, 4, 7, 10],
          isPercentage: true,
        },
        {
          statId: 'pvpCriticalDamage',
          chance: 14.00,
          values: [1, 2, 3, 4, 5, 8],
          isPercentage: true,
        },
        {
          statId: 'pvpAttackRate',
          chance: 28.00,
          values: [30, 50, 80, 120, 170, 230],
          isPercentage: false,
        },
        {
          statId: 'pvpAccuracy',
          chance: 28.00,
          values: [30, 50, 80, 120, 170, 230],
          isPercentage: false,
        },
        {
          statId: 'pvpIgnoreEvasion',
          chance: 28.00,
          values: [30, 50, 80, 120, 170, 230],
          isPercentage: false,
        },
      ],
    },
  ],
  assembledSlots: [
    {
      slotIndex: 1,
      slotType: 'assembled',
      options: [
        {
          statId: 'pvpAllAttackUp',
          chance: 2.00,
          values: [10, 15, 25, 40, 60, 100],
          isPercentage: false,
        },
        {
          statId: 'pvpPenetration',
          chance: 14.00,
          values: [5, 7, 10, 14, 22, 35],
          isPercentage: false,
        },
        {
          statId: 'pvpAttackRate',
          chance: 28.00,
          values: [30, 50, 80, 120, 170, 230],
          isPercentage: false,
        },
        {
          statId: 'pvpAccuracy',
          chance: 28.00,
          values: [30, 50, 80, 120, 170, 230],
          isPercentage: false,
        },
        {
          statId: 'pvpIgnoreEvasion',
          chance: 28.00,
          values: [30, 50, 80, 120, 170, 230],
          isPercentage: false,
        },
      ],
    },
    {
      slotIndex: 2,
      slotType: 'assembled',
      options: [
        {
          statId: 'pvpAddDamage',
          chance: 2.00,
          values: [100, 150, 200, 300, 500, 1000],
          isPercentage: false,
        },
        {
          statId: 'pvpIgnoreDamageReduction',
          chance: 14.00,
          values: [120, 135, 155, 180, 210, 300],
          isPercentage: false,
        },
        {
          statId: 'pvpAttackRate',
          chance: 28.00,
          values: [30, 50, 80, 120, 170, 230],
          isPercentage: false,
        },
        {
          statId: 'pvpAccuracy',
          chance: 28.00,
          values: [30, 50, 80, 120, 170, 230],
          isPercentage: false,
        },
        {
          statId: 'pvpIgnoreEvasion',
          chance: 28.00,
          values: [30, 50, 80, 120, 170, 230],
          isPercentage: false,
        },
      ],
    },
  ],
};

/**
 * Artifact of Midnight
 * 3 Unique + 2 Assembled slots, max level 7
 */
const artifactMidnight: ArtifactDefinition = {
  artifactType: 'midnight',
  name: 'Artifact of Midnight',
  maxLevel: 7,
  uniqueSlots: [
    {
      slotIndex: 1,
      slotType: 'unique',
      options: [
        {
          statId: 'pvePenetration',
          chance: 2.50,
          values: [3, 4, 6, 9, 13, 20, 30],
          isPercentage: false,
        },
        {
          statId: 'pveNormalDamageUp',
          chance: 16.50,
          values: [2, 3, 5, 7, 9, 13, 18],
          isPercentage: true,
        },
        {
          statId: 'pveAttackRate',
          chance: 27.00,
          values: [30, 50, 80, 120, 170, 230, 300],
          isPercentage: false,
        },
        {
          statId: 'pveAccuracy',
          chance: 27.00,
          values: [30, 50, 80, 120, 170, 230, 300],
          isPercentage: false,
        },
        {
          statId: 'pveIgnoreEvasion',
          chance: 27.00,
          values: [30, 50, 80, 120, 170, 230, 300],
          isPercentage: false,
        },
      ],
    },
    {
      slotIndex: 2,
      slotType: 'unique',
      options: [
        {
          statId: 'pveIgnorePenetration',
          chance: 5.00,
          values: [7, 10, 15, 22, 32, 45, 60],
          isPercentage: false,
        },
        {
          statId: 'pveDamageReduction',
          chance: 17.00,
          values: [3, 5, 8, 12, 17, 25, 35],
          isPercentage: false,
        },
        {
          statId: 'pveDefenseRate',
          chance: 26.00,
          values: [30, 50, 80, 120, 170, 230, 300],
          isPercentage: false,
        },
        {
          statId: 'pveIgnoreAccuracy',
          chance: 26.00,
          values: [30, 50, 80, 120, 170, 230, 300],
          isPercentage: false,
        },
        {
          statId: 'pveEvasion',
          chance: 26.00,
          values: [30, 50, 80, 120, 170, 230, 300],
          isPercentage: false,
        },
      ],
    },
    {
      slotIndex: 3,
      slotType: 'unique',
      options: [
        {
          statId: 'pveCriticalDamage',
          chance: 2.50,
          values: [1, 2, 3, 4, 5, 7, 10],
          isPercentage: true,
        },
        {
          statId: 'pveIgnoreDamageReduction',
          chance: 16.50,
          values: [8, 12, 20, 28, 36, 52, 80],
          isPercentage: false,
        },
        {
          statId: 'pveAttackRate',
          chance: 27.00,
          values: [30, 50, 80, 120, 170, 230, 300],
          isPercentage: false,
        },
        {
          statId: 'pveAccuracy',
          chance: 27.00,
          values: [30, 50, 80, 120, 170, 230, 300],
          isPercentage: false,
        },
        {
          statId: 'pveIgnoreEvasion',
          chance: 27.00,
          values: [30, 50, 80, 120, 170, 230, 300],
          isPercentage: false,
        },
      ],
    },
  ],
  assembledSlots: [
    {
      slotIndex: 1,
      slotType: 'assembled',
      options: [
        {
          statId: 'pveAllAttackUp',
          chance: 1.50,
          values: [5, 7, 11, 17, 25, 40, 60],
          isPercentage: false,
        },
        {
          statId: 'pveAddDamage',
          chance: 17.50,
          values: [6, 9, 14, 22, 32, 44, 60],
          isPercentage: false,
        },
        {
          statId: 'pveAttackRate',
          chance: 27.00,
          values: [30, 50, 80, 120, 170, 230, 300],
          isPercentage: false,
        },
        {
          statId: 'pveAccuracy',
          chance: 27.00,
          values: [30, 50, 80, 120, 170, 230, 300],
          isPercentage: false,
        },
        {
          statId: 'pveIgnoreEvasion',
          chance: 27.00,
          values: [30, 50, 80, 120, 170, 230, 300],
          isPercentage: false,
        },
      ],
    },
    {
      slotIndex: 2,
      slotType: 'assembled',
      options: [
        {
          statId: 'pveDefense',
          chance: 2.50,
          values: [10, 15, 22, 32, 45, 60, 90],
          isPercentage: false,
        },
        {
          statId: 'hp',
          chance: 19.50,
          values: [20, 30, 45, 65, 90, 120, 180],
          isPercentage: false,
        },
        {
          statId: 'pveDefenseRate',
          chance: 26.00,
          values: [30, 50, 80, 120, 170, 230, 300],
          isPercentage: false,
        },
        {
          statId: 'pveIgnoreAccuracy',
          chance: 26.00,
          values: [30, 50, 80, 120, 170, 230, 300],
          isPercentage: false,
        },
        {
          statId: 'pveEvasion',
          chance: 26.00,
          values: [30, 50, 80, 120, 170, 230, 300],
          isPercentage: false,
        },
      ],
    },
  ],
};

/**
 * Get artifact definition by type
 */
export function getArtifactDefinition(artifactType: ArtifactType): ArtifactDefinition {
  switch (artifactType) {
    case 'dawn':
      return artifactDawn;
    case 'dusk':
      return artifactDusk;
    case 'midnight':
      return artifactMidnight;
    default:
      throw new Error(`Unknown artifact type: ${artifactType}`);
  }
}

/**
 * Get all artifact definitions
 */
export function getAllArtifactDefinitions(): ArtifactDefinition[] {
  return [artifactDawn, artifactDusk, artifactMidnight];
}

/**
 * Get slot value for a configured slot
 */
export function getSlotValue(artifactType: ArtifactType, slotIndex: number, slotType: SlotType, statId: string, level: number): number {
  const artifact = getArtifactDefinition(artifactType);
  const slots = slotType === 'unique' ? artifact.uniqueSlots : artifact.assembledSlots;
  const slot = slots.find(s => s.slotIndex === slotIndex);
  
  if (!slot) return 0;
  
  const option = slot.options.find(o => o.statId === statId);
  if (!option) return 0;
  
  // Level is 1-indexed, array is 0-indexed
  const valueIndex = level - 1;
  if (valueIndex < 0 || valueIndex >= option.values.length) return 0;
  
  return option.values[valueIndex];
}

