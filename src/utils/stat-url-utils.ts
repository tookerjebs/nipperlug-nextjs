/**
 * Utility functions for converting between stat IDs and kebab-case URLs
 */

/**
 * Convert camelCase stat ID to kebab-case URL slug
 * Examples:
 * - criticalRate → critical-rate
 * - swordSkillAmp → sword-skill-amp
 * - hp → hp
 * - pvpAttack → pvp-attack
 */
export function statIdToSlug(statId: string): string {
  return statId
    // Insert hyphens before uppercase letters (but not at the start)
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    // Convert to lowercase
    .toLowerCase();
}

/**
 * Convert kebab-case URL slug to camelCase stat ID
 * Examples:
 * - critical-rate → criticalRate
 * - sword-skill-amp → swordSkillAmp
 * - hp → hp
 * - pvp-attack → pvpAttack
 */
export function slugToStatId(slug: string): string {
  return slug
    // Split by hyphens and convert to camelCase
    .split('-')
    .map((word, index) => {
      if (index === 0) {
        return word.toLowerCase();
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join('');
}

/**
 * Get all available stat slugs from the stats config
 * This is used for generating static params and validation
 */
export function getAllStatSlugs(): string[] {
  // Import stats config dynamically to avoid build issues
  try {
    const { statsConfig } = require('../tools/build-planner/data/stats-config');
    const statIds = Object.keys(statsConfig.stats);
    return statIds.map(statId => statIdToSlug(statId));
  } catch (error) {
    console.error('Error loading stats config:', error);
    return [];
  }
}

/**
 * Check if a stat ID exists in the stats config
 */
export function isValidStatId(statId: string): boolean {
  try {
    const { statsConfig } = require('../tools/build-planner/data/stats-config');
    return statId in statsConfig.stats;
  } catch (error) {
    console.error('Error validating stat ID:', error);
    return false;
  }
}

/**
 * Get stat display name from stat ID
 */
export function getStatDisplayName(statId: string): string | null {
  try {
    const { statsConfig } = require('../tools/build-planner/data/stats-config');
    return statsConfig.stats[statId]?.name || null;
  } catch (error) {
    console.error('Error getting stat display name:', error);
    return null;
  }
}

/**
 * Get the target slug for linking - handles PvP/PvE variants by linking to base stat
 * Examples:
 * - attack → attack (normal stat)
 * - pvpAttack → attack (PvP variant links to base)
 * - pveAttack → attack (PvE variant links to base)
 * - pvpSwordSkillAmp → sword-skill-amp (complex variant links to base)
 */
export function getTargetStatSlug(statId: string): string {
  // Detect PvP/PvE variants and extract base stat
  if (statId.startsWith('pvp') || statId.startsWith('pve')) {
    const prefix = statId.startsWith('pvp') ? 'pvp' : 'pve';
    const baseStatId = statId.substring(3, 4).toLowerCase() + statId.substring(4);
    return statIdToSlug(baseStatId); // Return base stat slug
  }
  return statIdToSlug(statId); // Return normal slug for base stats
}