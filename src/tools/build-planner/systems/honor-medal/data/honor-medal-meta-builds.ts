/**
 * Honor Medal System Meta Builds
 * Contains predefined optimal stat configurations for the honor medal system
 */

import { SystemCategory } from '@/tools/build-planner/types/systems';
import HonorMedalData from './honor-medal-data';
import { getStatInfo } from '@/tools/build-planner/data/stats-config';

// Meta build configuration - defines the optimal stat for each rank
const META_BUILD_CONFIG = {
  captain: { stat: 'str', count: 4 },           // All STR for captain rank
  general: { stat: 'criticalDamage', count: 6 },    // All Crit dmg for general slots
  commander: { stat: 'allSkillAmp', count: 8 }, // All skill amp for commander slots
  hero: { stat: 'penetration', count: 10 },     // All penetration for hero slots
  legend: { stat: 'ignoreResistCriticalDamage', count: 12 } // All ignore resist crit dmg for legend slots
} as const;

/**
 * Creates a filled honor medal system state with the meta build configuration
 * This represents the most commonly used optimal build for honor medals
 */
export const createMetaBuild = (): SystemCategory[] => {
  // Create the categories with filled slots using the configuration
  return Object.entries(META_BUILD_CONFIG).map(([rankId, config]) => {
    const priorityStats = Array(config.count).fill(config.stat);
    return createFilledCategory(rankId, priorityStats, config.count);
  });
};

/**
 * Helper function to create a filled category with the specified priority stats
 */
const createFilledCategory = (categoryId: string, priorityStats: string[], maxSlots: number): SystemCategory => {
  const displayName = categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
  const rankStats = HonorMedalData.rankStats[categoryId as keyof typeof HonorMedalData.rankStats] || [];
  
  // Create a map of available stats for quick lookup
  const availableStats = new Map();
  rankStats.forEach(stat => {
    availableStats.set(stat.id, stat);
  });
  
  // Create slots with the priority stats
  const slots = Array.from({ length: maxSlots }, (_, index) => {
    const position = index + 1;
    const slotId = `${categoryId}-${position}`;
    
    // Get the priority stat for this slot if available
    const priorityStat = priorityStats[index];
    const stat = priorityStat ? availableStats.get(priorityStat) : null;
    
    if (stat) {
      // Use max level (level 10) for meta build
      const maxLevel = 10;
      const value = stat.values[maxLevel - 1] || 0;
      
      return {
        id: slotId,
        category: categoryId,
        position,
        isOccupied: true,
        contributedStats: { [stat.id]: value },
        assignedItem: {
          id: `${stat.id}-meta-${position}`,
          name: getStatInfo(stat.id)?.name || stat.id,
          type: 'honor-medal-stat',
          availableStats: [stat.id],
          currentStats: { [stat.id]: value }
        }
      };
    } else {
      // If no priority stat is available for this slot, leave it empty
      return {
        id: slotId,
        category: categoryId,
        position,
        isOccupied: false,
        contributedStats: {}
      };
    }
  });
  
  return {
    id: categoryId,
    name: categoryId,
    displayName,
    maxSlots,
    slots
  };
};