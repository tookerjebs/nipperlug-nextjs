// Data loader for Platinum Special Mastery
import type { SpecialMasteryData, SpecialMasteryStatOption } from '../types/index';

let specialMasteryData: SpecialMasteryData | null = null;

/**
 * Load special mastery data from JSON file
 */
export function loadSpecialMasteryData(): SpecialMasteryData {
  if (specialMasteryData) {
    return specialMasteryData;
  }

  try {
    // Import the JSON file
    const data = require('./platinum-special-mastery.json');
    specialMasteryData = data as SpecialMasteryData;
    return specialMasteryData;
  } catch (error) {
    console.error('Failed to load special mastery data:', error);
    // Return empty structure on error
    return {
      categories: {},
      unlockMapping: {}
    };
  }
}

/**
 * Get stat options for a specific category
 */
export function getSpecialMasteryStatsForCategory(categoryId: string): SpecialMasteryStatOption[] | null {
  const data = loadSpecialMasteryData();
  const category = data.categories[categoryId];
  return category ? category.statOptions : null;
}

/**
 * Get unlock mapping (which mastery index unlocks which category)
 */
export function getSpecialMasteryUnlockMapping(): Record<string, number> {
  const data = loadSpecialMasteryData();
  return data.unlockMapping;
}

/**
 * Get category ID from mastery index
 */
export function getCategoryFromMasteryIndex(masteryIndex: number): number | null {
  const data = loadSpecialMasteryData();
  const category = data.unlockMapping[masteryIndex.toString()];
  return category !== undefined ? category : null;
}

