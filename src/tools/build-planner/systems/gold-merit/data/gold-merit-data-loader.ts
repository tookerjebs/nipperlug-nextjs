// Data loader for Gold Merit System
// Transforms the new comprehensive JSON structure into the format expected by the store

import goldMeritComprehensive from './gold-merit-comprehensive.json';
import { GoldMeritGridPositions, GoldMeritGridElements, GoldMeritSlotMapping } from './gold-merit-config';
import type { GoldMeritCategory, GoldMeritSlot } from '../types/index';

// Map kebab-case stat names from JSON to camelCase stat names in stats-config.ts
const statNameMapping: Record<string, string> = {
  'accuracy': 'accuracy',
  'add-damage': 'addDamage',
  'attack-rate': 'attackRate',
  'cancel-ignore-dmg-reduction': 'cancelIgnoreDamageReduction',
  'cancel-ignore-evasion': 'cancelIgnoreEvasion',
  'defense': 'defense',
  'defense-rate': 'defenseRate',
  'dmg-reduction': 'damageReduction',
  'evasion': 'evasion',
  'ignore-accuracy': 'ignoreAccuracy',
  'ignore-damage-reduction': 'ignoreDamageReduction',
  'ignore-evasion': 'ignoreEvasion',
  'ignore-penetration': 'ignorePenetration',
  'penetration': 'penetration'
};

// Convert kebab-case to camelCase stat name
function normalizeStatName(statName: string): string {
  return statNameMapping[statName] || statName;
}

interface ComprehensiveMastery {
  masteryIndex: number;
  slotId: string;
  category: number;
  masteryType: number;
  maxLevel: number;
  stat: {
    forceID: number;
    name: string;
    type: string;
  };
  prerequisite: {
    masteryIndex: number;
    requiredLevel: number;
  } | null;
  linkedMasteryIndex: number | null;
  values: Array<{
    level: number;
    reqMeritPoint: number;
    baseStat: {
      forceID: number;
      name: string;
      type: string;
      value: number;
      valueType: 'flat' | 'percent';
    };
    bonusStat: {
      forceID: number;
      name: string;
      type: string;
      value: number;
      valueType: 'flat' | 'percent';
    } | null;
  }>;
}

interface ComprehensiveCategory {
  category: number;
  id: string;
  name: string;
  description: string;
  icon: string;
  gridSize: {
    rows: number;
    cols: number;
  };
}

interface ComprehensiveData {
  categories: ComprehensiveCategory[];
  masteries: ComprehensiveMastery[];
}

// Create a reverse mapping from masteryIndex to slotId
const masteryIndexToSlotId: Record<number, string> = {};
Object.entries(GoldMeritSlotMapping).forEach(([slotId, masteryIndex]) => {
  masteryIndexToSlotId[masteryIndex] = slotId;
});

// Create a mapping from masteryIndex to mastery data
const masteryIndexToMastery: Record<number, ComprehensiveMastery> = {};
(goldMeritComprehensive as ComprehensiveData).masteries.forEach(mastery => {
  masteryIndexToMastery[mastery.masteryIndex] = mastery;
});

// Transform comprehensive data to GoldMeritCategory format
export function loadGoldMeritData(): GoldMeritCategory[] {
  const data = goldMeritComprehensive as ComprehensiveData;
  const categories: GoldMeritCategory[] = [];

  data.categories.forEach(cat => {
    const slots: GoldMeritSlot[] = [];
    
    // Get all masteries for this category
    const categoryMasteries = data.masteries
      .filter(m => m.category === cat.category)
      .sort((a, b) => a.masteryIndex - b.masteryIndex);

    categoryMasteries.forEach(mastery => {
      // Find the old slot ID for this mastery
      const oldSlotId = masteryIndexToSlotId[mastery.masteryIndex];
      if (!oldSlotId) {
        console.warn(`No slot mapping found for masteryIndex ${mastery.masteryIndex}`);
        return;
      }

      // Get grid position
      const gridPosition = GoldMeritGridPositions[oldSlotId];
      if (!gridPosition) {
        console.warn(`No grid position found for slot ${oldSlotId}`);
        return;
      }

      // Extract values and bonus values
      const values: number[] = [];
      const bonusValues: number[] = [];
      mastery.values.forEach(value => {
        values.push(value.baseStat.value);
        if (value.bonusStat) {
          bonusValues.push(value.bonusStat.value);
        }
      });

      // Determine if this is an expansion slot
      const isExpansion = mastery.masteryType === 2; // Type 2 = expansion
      let expandsSlot: string | undefined;
      if (isExpansion && mastery.linkedMasteryIndex) {
        expandsSlot = masteryIndexToSlotId[mastery.linkedMasteryIndex];
      }

      // Get prerequisites (convert masteryIndex to slotId)
      const prerequisites: string[] = [];
      if (mastery.prerequisite) {
        const prereqSlotId = masteryIndexToSlotId[mastery.prerequisite.masteryIndex];
        if (prereqSlotId) {
          prerequisites.push(prereqSlotId);
        }
      }

      // Get stat type from mastery stat and normalize to camelCase
      const statType = normalizeStatName(mastery.stat.type);

      // Create slot
      const slot: GoldMeritSlot = {
        id: oldSlotId,
        name: mastery.stat.name, // You may want to enhance this with tier info
        description: `${mastery.stat.name} - Tier ${Math.ceil(mastery.maxLevel / 5)}`,
        icon: statType,
        maxLevel: mastery.maxLevel,
        gridPosition: gridPosition,
        pointsRequired: 1, // This will be overridden per-level in the store
        values: values,
        bonusValues: bonusValues.length > 0 ? bonusValues : undefined,
        statType: statType,
        prerequisites: prerequisites.length > 0 ? prerequisites : undefined,
        isExpansion: isExpansion,
        expandsSlot: expandsSlot
      };

      slots.push(slot);
    });

    // Get grid elements (arrows) for this category
    const gridElements = GoldMeritGridElements[cat.id] || [];

    categories.push({
      id: cat.id,
      name: cat.name,
      description: cat.description,
      icon: cat.icon,
      slots: slots,
      gridElements: gridElements,
      gridSize: cat.gridSize
    });
  });

  return categories;
}

// Export a helper to get point cost for a specific level
export function getPointCostForLevel(masteryIndex: number, level: number): number {
  const mastery = masteryIndexToMastery[masteryIndex];
  if (!mastery || level < 1 || level > mastery.maxLevel) {
    return 0;
  }
  const valueEntry = mastery.values.find(v => v.level === level);
  return valueEntry ? valueEntry.reqMeritPoint : 0;
}

// Export a helper to get mastery by slotId
export function getMasteryBySlotId(slotId: string): ComprehensiveMastery | undefined {
  const masteryIndex = GoldMeritSlotMapping[slotId];
  if (!masteryIndex) return undefined;
  return masteryIndexToMastery[masteryIndex];
}

// Export a helper to get prerequisite info
export function getPrerequisiteInfo(slotId: string): { slotId: string; requiredLevel: number } | null {
  const mastery = getMasteryBySlotId(slotId);
  if (!mastery || !mastery.prerequisite) return null;
  
  const prereqSlotId = masteryIndexToSlotId[mastery.prerequisite.masteryIndex];
  if (!prereqSlotId) return null;
  
  return {
    slotId: prereqSlotId,
    requiredLevel: mastery.prerequisite.requiredLevel
  };
}

