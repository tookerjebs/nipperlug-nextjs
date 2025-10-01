/**
 * Pet System Meta Builds
 * Contains predefined optimal stat configurations for the pet system
 */

import { SystemCategory, PetMetaBuild } from '../types/pet';
import { petTierStats } from './pet-data';
import { getStatInfo } from '@/tools/build-planner/data/stats-config';

/**
 * Creates a filled pet system state with the meta build configuration
 * This represents the most commonly used optimal build for pets
 */
export const createMetaBuild = (): SystemCategory[] => {
  // Define the priority stats for each category
  const normalPriorityStats = [
    'maxCriticalRate',   // Increases both physical and magic attack
    'maxCriticalRate',    // Increases critical damage
    'maxCriticalRate',      // Increases critical rate
    'maxCriticalRate',   // Increases skill amplification
    'maxCriticalRate',     // Additional damage
    'maxCriticalRate',    // Attack rate
    'maxCriticalRate',            // Health points
    'maxCriticalRate',       // Defense
    'maxCriticalRate',   // Defense rate
    'maxCriticalRate'      // Minimum damage
  ];
  
  const covenantPriorityStats = [
    'criticalDamage',   // Increases both physical and magic attack
    'criticalDamage',    // Increases critical damage
    'criticalDamage',   // Increases skill amplification
    'criticalDamage',     // Additional damage
    'criticalDamage',      // Accuracy
    'criticalDamage',   // Penetration
    'criticalDamage',           // Strength
    'criticalDamage',           // Intelligence
    'criticalDamage',           // Dexterity
    'criticalDamage' // Ignore damage reduction
  ];
  
  const trustPriorityStats = [
    'penetration',   // Increases both physical and magic attack
    'penetration',     // Additional damage
    'penetration',      // Accuracy
    'penetration',   // Penetration
    'penetration', // Ignore damage reduction
    'penetration', // Normal damage up
    'penetration', // Ignore resist critical damage
    'penetration', // Ignore resist skill amplification
    'penetration', // Ignore resist critical rate
    'penetration'             // Health points
  ];

  // Create the categories with filled slots
  return [
    createFilledCategory('normal', normalPriorityStats),
    createFilledCategory('covenant', covenantPriorityStats),
    createFilledCategory('trust', trustPriorityStats)
  ];
};

/**
 * Helper function to create a filled category with the specified priority stats
 */
const createFilledCategory = (categoryId: string, priorityStats: string[]): SystemCategory => {
  // displayName will be preserved from the original category, so we use a simple fallback
  const displayName = categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
  const tierStats = petTierStats[categoryId as keyof typeof petTierStats] || [];
  
  // Create a map of available stats for quick lookup
  const availableStats = new Map();
  tierStats.forEach(stat => {
    availableStats.set(stat.id, stat);
  });
  
  // Create slots with the priority stats
  const slots = Array.from({ length: 10 }, (_, index) => {
    const position = index + 1;
    const slotId = `${categoryId}-${position}`;
    
    // Get the priority stat for this slot if available
    const priorityStat = priorityStats[index];
    const stat = priorityStat ? availableStats.get(priorityStat) : null;
    
    if (stat) {
      return {
        id: slotId,
        category: categoryId,
        position,
        isOccupied: true,
        contributedStats: { [stat.id]: stat.value },
        assignedItem: {
          id: `${stat.id}-meta-${position}`,
          name: getStatInfo(stat.id)?.name || stat.id,
          type: 'pet-stat',
          availableStats: [stat.id],
          currentStats: { [stat.id]: stat.value }
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
    maxSlots: 10,
    slots
  };
};