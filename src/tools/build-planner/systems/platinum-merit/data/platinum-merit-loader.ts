// Data loader for Platinum Merit System
import type { PlatinumMeritCategory, PlatinumMeritSlot } from '../types/index';
import { getStatInfo } from '@/tools/build-planner/data/stats-config';
import { getSlotGridPosition, getCategoryArrows } from './platinum-merit-grid-positions';

// Category metadata
const CATEGORY_METADATA: Record<number, { id: string; name: string; description: string; icon: string }> = {
  5: {
    id: 'fierce-spirit',
    name: 'Fierce Spirit',
    description: 'Enhance your fierce combat spirit and offensive capabilities',
    icon: '🔥'
  },
  6: {
    id: 'iron-will',
    name: 'Iron Will',
    description: 'Strengthen your resolve and defensive capabilities',
    icon: '💪'
  },
  7: {
    id: 'war-slayer',
    name: 'War Slayer',
    description: 'Master the art of warfare and combat techniques',
    icon: '⚔️'
  },
  8: {
    id: 'war-guardian',
    name: 'War Guardian',
    description: 'Become an unbreakable shield in battle',
    icon: '🛡️'
  },
  9: {
    id: 'sharp-blade',
    name: 'Sharp Blade',
    description: 'Sharpen your blade and cutting edge',
    icon: '🗡️'
  },
  10: {
    id: 'quick-evasion',
    name: 'Quick Evasion',
    description: 'Move with speed and agility',
    icon: '💨'
  }
};

let platinumMeritData: PlatinumMeritCategory[] | null = null;

/**
 * Load platinum merit data from comprehensive JSON
 */
export function loadPlatinumMeritData(): PlatinumMeritCategory[] {
  if (platinumMeritData) {
    return platinumMeritData;
  }

  try {
    const comprehensiveData = require('./platinum-merit-comprehensive.json');
    const categories: PlatinumMeritCategory[] = [];
    
    // Group masteries by category
    const masteriesByCategory: Record<number, any[]> = {};
    comprehensiveData.masteries.forEach((mastery: any) => {
      if (!masteriesByCategory[mastery.category]) {
        masteriesByCategory[mastery.category] = [];
      }
      masteriesByCategory[mastery.category].push(mastery);
    });
    
    // First pass: create all slots for all categories (needed for cross-category prerequisites)
    const allSlotsByMasteryIndex: Record<number, PlatinumMeritSlot> = {};
    const slotsByCategory: Record<number, PlatinumMeritSlot[]> = {};
    
    // Create categories
    for (const [categoryNum, masteries] of Object.entries(masteriesByCategory)) {
      const categoryNumber = parseInt(categoryNum, 10);
      const metadata = CATEGORY_METADATA[categoryNumber];
      
      if (!metadata) continue;
      
      // Convert masteries to slots
      const slots: PlatinumMeritSlot[] = masteries.map((mastery: any, index: number) => {
        // Get stat info for icon
        const firstValue = mastery.values[0];
        const statInfo = firstValue?.baseStat ? getStatInfo(firstValue.baseStat.statType) : null;
        const icon = statInfo?.icon || '/images/stat icons/default_icon.png';
        
        // Extract values array
        const values = mastery.values.map((v: any) => v.baseStat?.value || 0);
        
        // Determine if this is an expansion slot (masteryType 2)
        const isExpansion = mastery.masteryType === 2;
        
        // Create slot ID from mastery index
        const slotId = `mastery-${mastery.masteryIndex}`;
        
        // Get unlock cost and time from slotCostsByCategory and slotTimesByCategory
        // The keys are string numbers representing slot position (0, 1, 2, etc.)
        const slotCost = comprehensiveData.slotCostsByCategory?.[categoryNumber]?.[index.toString()];
        const slotTime = comprehensiveData.slotTimesByCategory?.[categoryNumber]?.[index.toString()];
        
        // Generate slot name
        const statName = firstValue?.baseStat?.statName || 'Unknown';
        const slotName = isExpansion 
          ? `Slot Expand ${statName}` 
          : statName;
        
        // Get grid position from configuration (if available)
        const configuredPosition = getSlotGridPosition(metadata.id, slotId);
        const gridPosition = configuredPosition 
          ? { row: configuredPosition.row - 1, col: configuredPosition.col - 1 } // Convert from 1-indexed to 0-indexed
          : { row: 0, col: index }; // Fallback to simple ordering if not configured
        
        const slot: PlatinumMeritSlot = {
          id: slotId,
          name: slotName,
          description: `Mastery ${mastery.masteryIndex} - ${statName}${isExpansion ? ' (Expansion Slot)' : ''}`,
          icon,
          maxLevel: mastery.maxLevel,
          gridPosition,
          pointsRequired: mastery.values[0]?.reqMeritPoint || 3,
          values,
          statType: firstValue?.baseStat?.statType || 'unknown',
          unlockCost: slotCost ? {
            divineCore: slotCost.divineCore,
            chaosCore: slotCost.chaosCore
          } : undefined,
          unlockTime: slotTime,
          isExpansion,
          // Expansion slot linking will be handled separately based on linkedMasteryIndex
        };
        
        // Handle expansion slot linking
        if (isExpansion && mastery.linkedMasteryIndex > 0) {
          slot.expandsSlot = `mastery-${mastery.linkedMasteryIndex}`;
        }
        
        // Store slot by mastery index for cross-category prerequisite lookup
        allSlotsByMasteryIndex[mastery.masteryIndex] = slot;
        
        return slot;
      });
      
      slotsByCategory[categoryNumber] = slots;
    }
    
    // Second pass: Set prerequisites (now we can search across all categories)
    for (const [categoryNum, masteries] of Object.entries(masteriesByCategory)) {
      const categoryNumber = parseInt(categoryNum, 10);
      const slots = slotsByCategory[categoryNumber];
      
      slots.forEach((slot, index) => {
        const mastery = masteries[index];
        if (mastery.prerequisiteIndex > 0 && mastery.prerequisiteLevel > 0) {
          // Find prerequisite slot - search across all categories
          const prereqSlot = allSlotsByMasteryIndex[mastery.prerequisiteIndex];
          
          if (prereqSlot) {
            slot.prerequisites = [{
              slotId: prereqSlot.id,
              requiredLevel: mastery.prerequisiteLevel
            }];
          }
        }
      });
      
      const metadata = CATEGORY_METADATA[categoryNumber];
      if (!metadata) continue;
      
      // Get arrows for this category
      const arrows = getCategoryArrows(metadata.id);
      
      // Determine grid size - use configured size or calculate from slots
      let gridRows = 7; // Default for fierce-spirit
      let gridCols = 10; // Default
      
      // Check if we have configured positions to determine grid size
      if (slots.length > 0) {
        const maxRow = Math.max(...slots.map(s => s.gridPosition.row + 1));
        const maxCol = Math.max(...slots.map(s => s.gridPosition.col + 1));
        if (arrows.length > 0) {
          // Arrows are now 0-indexed, so add 1 to get actual grid size
          const maxArrowRow = Math.max(...arrows.map(a => a.gridPosition.row + 1));
          const maxArrowCol = Math.max(...arrows.map(a => a.gridPosition.col + 1));
          gridRows = Math.max(maxRow, maxArrowRow);
          gridCols = Math.max(maxCol, maxArrowCol);
        } else {
          gridRows = maxRow;
          gridCols = maxCol;
        }
      }
      
      const category: PlatinumMeritCategory = {
        id: metadata.id,
        name: metadata.name,
        description: metadata.description,
        icon: metadata.icon,
        gridSize: { rows: gridRows, cols: gridCols },
        slots,
        gridElements: arrows // Add arrows as grid elements
      };
      
      categories.push(category);
    }
    
    // Sort categories by category number
    categories.sort((a, b) => {
      const aNum = Object.entries(CATEGORY_METADATA).find(([_, meta]) => meta.id === a.id)?.[0];
      const bNum = Object.entries(CATEGORY_METADATA).find(([_, meta]) => meta.id === b.id)?.[0];
      return parseInt(aNum || '0', 10) - parseInt(bNum || '0', 10);
    });
    
    platinumMeritData = categories;
    return platinumMeritData;
  } catch (error) {
    console.error('Failed to load platinum merit data:', error);
    return [];
  }
}

/**
 * Maximum achievable merit score for platinum merit
 * This is the highest merit score value from the formula
 */
export const MAX_PLATINUM_MERIT_SCORE = 360542;

/**
 * Calculate maximum platinum merit points achievable from max merit score
 * This is the actual limit - you cannot earn more points than this
 */
export function calculateMaxPlatinumMeritPoints(): number {
  try {
    const comprehensiveData = require('./platinum-merit-comprehensive.json');
    let totalPoints = 0;
    
    // Sum all reward points from the formula up to max score
    for (const [minScore, maxScore, rewardPoints] of comprehensiveData.meritScoreFormula) {
      if (maxScore <= MAX_PLATINUM_MERIT_SCORE) {
        totalPoints += rewardPoints;
      } else if (minScore < MAX_PLATINUM_MERIT_SCORE) {
        // Partial points from the last range
        const rangeSize = maxScore - minScore;
        const positionInRange = (MAX_PLATINUM_MERIT_SCORE - minScore) / rangeSize;
        totalPoints += Math.floor(rewardPoints * positionInRange);
        break;
      } else {
        break;
      }
    }
    
    return totalPoints;
  } catch (error) {
    console.error('Failed to calculate max platinum merit points:', error);
    return 0;
  }
}

// Maximum platinum merit points that can be spent (calculated from actual data)
export const MAX_PLATINUM_MERIT_POINTS = calculateMaxPlatinumMeritPoints();

