// Grid position mapping for Platinum Merit System
// Maps slots and arrows to grid positions (1-indexed rows and columns)

import type { PlatinumMeritGridElement, PlatinumMeritArrow } from '../types/index';

export interface GridPosition {
  row: number; // 1-indexed
  col: number; // 1-indexed
}

/**
 * Grid configuration for each category
 * Format: categoryId -> { slots: Map<slotId, position>, arrows: Array<arrow> }
 */
export interface CategoryGridConfig {
  slots: Map<string, GridPosition>; // slotId -> position
  arrows: PlatinumMeritArrow[]; // Array of arrows with positions
}

export const PLATINUM_MERIT_GRID_CONFIGS: Record<string, CategoryGridConfig> = {
  'fierce-spirit': {
    slots: new Map([
      // Row 1
      ['mastery-82', { row: 1, col: 6 }], // expand pene 1 (expansion for penetration 73)
      ['mastery-76', { row: 2, col: 7 }], // expand allattack3 (expansion for all attack 3, mastery 67)
      ['mastery-79', { row: 1, col: 10 }], // expand ign dmg recution 3 (expansion for ignore damage reduction 3, mastery 70)
      
      // Row 2
      ['mastery-65', { row: 2, col: 1 }], // allattack 1
      ['mastery-73', { row: 2, col: 5 }], // penetr 1 (penetration)
      ['mastery-78', { row: 1, col: 8 }], // expand allattack2 (expansion for all attack 2, mastery 69)
      ['mastery-77', { row: 2, col: 9 }], // expand ign dmg recution 2 (expansion for ignore damage reduction 2, mastery 68)
      
      // Row 4
      ['mastery-66', { row: 4, col: 1 }], // ign dmg reduce 1
      ['mastery-69', { row: 4, col: 3 }], // allattack2
      ['mastery-68', { row: 6, col: 3 }], // ign dmg reduce 2
      ['mastery-74', { row: 4, col: 7 }], // all attack expand 1 (expansion for all attack 1, mastery 65)
      ['mastery-75', { row: 4, col: 9 }], // expand ign dmg reduce 1 (expansion for ignore damage reduction 1, mastery 66)
      
      // Row 5
      ['mastery-83', { row: 5, col: 10 }], // expand special mastery (expansion for special mastery, mastery 83)
      
      // Row 6
      ['mastery-67', { row: 6, col: 1 }], // all attack 3
      ['mastery-70', { row: 4, col: 5 }], // ign dmg reduce 3 (user said "ign dmg reduce 2" but this is likely 70 based on pattern)
      ['mastery-71', { row: 6, col: 5 }], // all skill amp 1
      ['mastery-72', { row: 6, col: 7 }], // crit dmg 1
      
      // Row 7
      ['mastery-80', { row: 7, col: 6 }], // expand all skill amp (expansion for all skill amp, mastery 71)
      ['mastery-81', { row: 7, col: 8 }], // expand crit dmg (expansion for crit damage, mastery 72)
    ]),
    arrows: [
      // Row 1 arrows
      { id: 'arrow-1-5', type: 'arrow', direction: 'up-right', gridPosition: { row: 1, col: 5 } },
      { id: 'arrow-1-7', type: 'arrow', direction: 'up-right', gridPosition: { row: 1, col: 7 } },
      { id: 'arrow-1-9', type: 'arrow', direction: 'up-right', gridPosition: { row: 1, col: 9 } },
      
      // Row 3 arrows
      { id: 'arrow-3-1', type: 'arrow', direction: 'down', gridPosition: { row: 3, col: 1 } },
      { id: 'arrow-3-5', type: 'arrow', direction: 'up', gridPosition: { row: 3, col: 5 } },
      { id: 'arrow-3-7', type: 'arrow', direction: 'up', gridPosition: { row: 3, col: 7 } },
      { id: 'arrow-3-9', type: 'arrow', direction: 'up', gridPosition: { row: 3, col: 9 } },
      
      // Row 4 arrows
      { id: 'arrow-4-4', type: 'arrow', direction: 'right', gridPosition: { row: 4, col: 4 } },
      { id: 'arrow-4-6', type: 'arrow', direction: 'right', gridPosition: { row: 4, col: 6 } },
      { id: 'arrow-4-8', type: 'arrow', direction: 'right', gridPosition: { row: 4, col: 8 } },
      
      // Row 5 arrows
      { id: 'arrow-5-1', type: 'arrow', direction: 'down', gridPosition: { row: 5, col: 1 } },
      { id: 'arrow-5-3', type: 'arrow', direction: 'up', gridPosition: { row: 5, col: 3 } },
      { id: 'arrow-5-5', type: 'arrow', direction: 'down', gridPosition: { row: 5, col: 5 } },
      { id: 'arrow-5-7', type: 'arrow', direction: 'down', gridPosition: { row: 5, col: 7 } },
      { id: 'arrow-5-9', type: 'arrow', direction: 'down-right', gridPosition: { row: 5, col: 9 } },
      
      // Row 6 arrows
      { id: 'arrow-6-2', type: 'arrow', direction: 'right', gridPosition: { row: 6, col: 2 } },
      
      // Row 7 arrows
      { id: 'arrow-7-5', type: 'arrow', direction: 'down-right', gridPosition: { row: 7, col: 5 } },
      { id: 'arrow-7-7', type: 'arrow', direction: 'down-right', gridPosition: { row: 7, col: 7 } },
      ]
    },
    'iron-will': {
      slots: new Map([
        // Row 1
        ['mastery-101', { row: 1, col: 4 }], // expand max hp absorb (expansion for max hp steal per hit 15, mastery 92)
        ['mastery-95', { row: 1, col: 6 }], // expand hp150 (expansion for HP 150, mastery 86)
        ['mastery-97', { row: 1, col: 8 }], // expand hp 300 (expansion for HP 300, mastery 88)
        
        // Row 2
        ['mastery-84', { row: 2, col: 1 }], // hp 50
        ['mastery-92', { row: 2, col: 3 }], // max hp absorb up 15 (Max HP Steal per hit)
        
        // Row 3
        ['mastery-93', { row: 3, col: 6 }], // expand hp 50 (expansion for HP 50, mastery 84)
        ['mastery-94', { row: 3, col: 8 }], // expand ign pene 5 (expansion for Ignore Penetration 5, mastery 85)
        ['mastery-102', { row: 3, col: 10 }], // expand special mastery (special expansion slot, forceID 146)
        
        // Row 4
        ['mastery-85', { row: 4, col: 1 }], // ignore pene 5
        ['mastery-88', { row: 4, col: 3 }], // hp 300
        ['mastery-89', { row: 4, col: 5 }], // ign penetration 45
        
        // Row 5
        ['mastery-96', { row: 5, col: 8 }], // expand ignore penetr20 (expansion for Ignore Penetration 20, mastery 87)
        ['mastery-98', { row: 5, col: 10 }], // expand ign penetratio 45 (expansion for Ignore Penetration 45, mastery 89)
        
        // Row 6
        ['mastery-86', { row: 6, col: 1 }], // hp 150
        ['mastery-87', { row: 6, col: 3 }], // ignore pene 20
        ['mastery-90', { row: 6, col: 5 }], // defense 25
        
        // Row 7
        ['mastery-91', { row: 7, col: 6 }], // defense 80
        ['mastery-99', { row: 7, col: 8 }], // expand defense 25 (expansion for Defense 25, mastery 90)
        ['mastery-100', { row: 7, col: 10 }], // expand defense 80 (expansion for Defense 80, mastery 91)
      ]),
      arrows: [
        // Row 1 arrows
        { id: 'arrow-1-3', type: 'arrow', direction: 'up-right', gridPosition: { row: 1, col: 3 } },
        { id: 'arrow-1-7', type: 'arrow', direction: 'right', gridPosition: { row: 1, col: 7 } },
        
        // Row 2 arrows
        { id: 'arrow-2-6', type: 'arrow', direction: 'up', gridPosition: { row: 2, col: 6 } },
        
        // Row 3 arrows
        { id: 'arrow-3-1', type: 'arrow', direction: 'down', gridPosition: { row: 3, col: 1 } },
        { id: 'arrow-3-3', type: 'arrow', direction: 'up', gridPosition: { row: 3, col: 3 } },
        { id: 'arrow-3-5', type: 'arrow', direction: 'up-right', gridPosition: { row: 3, col: 5 } },
        { id: 'arrow-3-7', type: 'arrow', direction: 'right', gridPosition: { row: 3, col: 7 } },
        { id: 'arrow-3-9', type: 'arrow', direction: 'right', gridPosition: { row: 3, col: 9 } },
        
        // Row 4 arrows
        { id: 'arrow-4-4', type: 'arrow', direction: 'right', gridPosition: { row: 4, col: 4 } },
        { id: 'arrow-4-8', type: 'arrow', direction: 'down', gridPosition: { row: 4, col: 8 } },
        
        // Row 5 arrows
        { id: 'arrow-5-1', type: 'arrow', direction: 'down', gridPosition: { row: 5, col: 1 } },
        { id: 'arrow-5-3', type: 'arrow', direction: 'up', gridPosition: { row: 5, col: 3 } },
        { id: 'arrow-5-9', type: 'arrow', direction: 'right', gridPosition: { row: 5, col: 9 } },
        
        // Row 6 arrows
        { id: 'arrow-6-2', type: 'arrow', direction: 'right', gridPosition: { row: 6, col: 2 } },
        { id: 'arrow-6-4', type: 'arrow', direction: 'right', gridPosition: { row: 6, col: 4 } },
        
        // Row 7 arrows
        { id: 'arrow-7-5', type: 'arrow', direction: 'down-right', gridPosition: { row: 7, col: 5 } },
        { id: 'arrow-7-7', type: 'arrow', direction: 'right', gridPosition: { row: 7, col: 7 } },
        { id: 'arrow-7-9', type: 'arrow', direction: 'right', gridPosition: { row: 7, col: 9 } },
      ]
    },
    'war-slayer': {
      slots: new Map([
        // Row 1
        ['mastery-103', { row: 1, col: 1 }], // cancel ignore pene 5
        ['mastery-116', { row: 1, col: 5 }], // ignore resist crit dmg expand 15 (expansion for Ignore Resist Critical Damage 15, mastery 107)
        ['mastery-118', { row: 1, col: 7 }], // ignore resist skill amp expand 5 (expansion for Ignore Resist Skill Amp 5, mastery 108)
        ['mastery-114', { row: 1, col: 9 }], // expand cancel ign pene 45 (expansion for Cancel Ignore Penetration 45, mastery 109)
        
        // Row 3
        ['mastery-104', { row: 3, col: 1 }], // ignore resist crit dmg 6
        ['mastery-112', { row: 3, col: 3 }], // expand cancel ign penetr 5 (expansion for Cancel Ignore Penetration 5, mastery 103)
        ['mastery-115', { row: 3, col: 5 }], // expand ign resist crit dmg 6 (expansion for Ignore Resist Critical Damage 6, mastery 104)
        ['mastery-117', { row: 3, col: 7 }], // expand ign resist skill amp 3 (expansion for Ignore Resist Skill Amp 3, mastery 105)
        ['mastery-113', { row: 3, col: 9 }], // expand cancel ignore penetration20 (expansion for Cancel Ignore Penetration 20, mastery 106)
        
        // Row 5
        ['mastery-105', { row: 5, col: 1 }], // ignore resist skill amp 3
        ['mastery-106', { row: 5, col: 3 }], // cancel ign penetr20
        ['mastery-107', { row: 5, col: 5 }], // ign resist crit dmg15
        ['mastery-108', { row: 5, col: 7 }], // ign resist skill amp 5
        ['mastery-109', { row: 5, col: 9 }], // cancel ign pene 45
        
        // Row 7
        ['mastery-110', { row: 7, col: 5 }], // ignore resist crit dmg 28
        ['mastery-111', { row: 7, col: 7 }], // ignore resist skill amp 14
        ['mastery-119', { row: 7, col: 9 }], // expand special mastery (special expansion slot, forceID 146)
      ]),
      arrows: [
        // Row 2 arrows
        { id: 'arrow-2-1', type: 'arrow', direction: 'down', gridPosition: { row: 2, col: 1 } },
        { id: 'arrow-2-5', type: 'arrow', direction: 'up', gridPosition: { row: 2, col: 5 } },
        { id: 'arrow-2-7', type: 'arrow', direction: 'up', gridPosition: { row: 2, col: 7 } },
        { id: 'arrow-2-9', type: 'arrow', direction: 'up', gridPosition: { row: 2, col: 9 } },
        
        // Row 4 arrows
        { id: 'arrow-4-1', type: 'arrow', direction: 'down', gridPosition: { row: 4, col: 1 } },
        { id: 'arrow-4-3', type: 'arrow', direction: 'up', gridPosition: { row: 4, col: 3 } },
        { id: 'arrow-4-5', type: 'arrow', direction: 'up', gridPosition: { row: 4, col: 5 } },
        { id: 'arrow-4-7', type: 'arrow', direction: 'up', gridPosition: { row: 4, col: 7 } },
        { id: 'arrow-4-9', type: 'arrow', direction: 'up', gridPosition: { row: 4, col: 9 } },
        
        // Row 5 arrows
        { id: 'arrow-5-2', type: 'arrow', direction: 'right', gridPosition: { row: 5, col: 2 } },
        { id: 'arrow-5-4', type: 'arrow', direction: 'right', gridPosition: { row: 5, col: 4 } },
        { id: 'arrow-5-6', type: 'arrow', direction: 'right', gridPosition: { row: 5, col: 6 } },
        { id: 'arrow-5-8', type: 'arrow', direction: 'right', gridPosition: { row: 5, col: 8 } },
        
        // Row 6 arrows
        { id: 'arrow-6-5', type: 'arrow', direction: 'down', gridPosition: { row: 6, col: 5 } },
        { id: 'arrow-6-7', type: 'arrow', direction: 'down', gridPosition: { row: 6, col: 7 } },
        { id: 'arrow-6-9', type: 'arrow', direction: 'down', gridPosition: { row: 6, col: 9 } },
      ]
    },
    'war-guardian': {
      slots: new Map([
        // Row 1
        ['mastery-120', { row: 1, col: 1 }], // cancel ign dmg reduction 5
        ['mastery-121', { row: 1, col: 3 }], // resist crit dmg 6
        ['mastery-122', { row: 1, col: 5 }], // resist skill amp 3
        ['mastery-127', { row: 1, col: 7 }], // resist crit dmg 21
        ['mastery-128', { row: 1, col: 9 }], // resist skill amp 7
        
        // Row 3
        ['mastery-129', { row: 3, col: 1 }], // dmg reduction 10
        ['mastery-123', { row: 3, col: 5 }], // cancel ign dmg reduce 20
        ['mastery-124', { row: 3, col: 7 }], // resist crit dmg 15
        ['mastery-125', { row: 3, col: 9 }], // resist skill amp 5
        
        // Row 5
        ['mastery-130', { row: 5, col: 1 }], // dmg reduction 30
        ['mastery-131', { row: 5, col: 5 }], // expand cancel ign dmg reduction 5 (expansion for Cancel Ignore DMG Reduction 5, mastery 120)
        ['mastery-132', { row: 5, col: 7 }], // expand cancel ign dmg reduction 20 (expansion for Cancel Ignore DMG Reduction 20, mastery 123)
        ['mastery-126', { row: 5, col: 9 }], // cancel ign dmg reduction 45
        
        // Row 7
        ['mastery-134', { row: 7, col: 1 }], // expand dmg reduction 10 (expansion for DMG Reduction 10, mastery 129)
        ['mastery-135', { row: 7, col: 3 }], // expand dmg reduction 30 (expansion for DMG Reduction 30, mastery 130)
        ['mastery-133', { row: 7, col: 7 }], // expand cancel ign dmg reduction 45 (expansion for Cancel Ignore DMG Reduction 45, mastery 126)
        ['mastery-136', { row: 7, col: 9 }], // expand special mastery (special expansion slot, forceID 146)
      ]),
      arrows: [
        // Row 1 arrows
        { id: 'arrow-1-2', type: 'arrow', direction: 'right', gridPosition: { row: 1, col: 2 } },
        { id: 'arrow-1-4', type: 'arrow', direction: 'right', gridPosition: { row: 1, col: 4 } },
        
        // Row 2 arrows
        { id: 'arrow-2-1', type: 'arrow', direction: 'down', gridPosition: { row: 2, col: 1 } },
        { id: 'arrow-2-5', type: 'arrow', direction: 'down', gridPosition: { row: 2, col: 5 } },
        { id: 'arrow-2-7', type: 'arrow', direction: 'up', gridPosition: { row: 2, col: 7 } },
        { id: 'arrow-2-9', type: 'arrow', direction: 'up', gridPosition: { row: 2, col: 9 } },
        
        // Row 3 arrows
        { id: 'arrow-3-6', type: 'arrow', direction: 'right', gridPosition: { row: 3, col: 6 } },
        { id: 'arrow-3-8', type: 'arrow', direction: 'right', gridPosition: { row: 3, col: 8 } },
        
        // Row 4 arrows
        { id: 'arrow-4-1', type: 'arrow', direction: 'down', gridPosition: { row: 4, col: 1 } },
        { id: 'arrow-4-5', type: 'arrow', direction: 'down', gridPosition: { row: 4, col: 5 } },
        { id: 'arrow-4-9', type: 'arrow', direction: 'down', gridPosition: { row: 4, col: 9 } },
        
        // Row 5 arrows
        { id: 'arrow-5-8', type: 'arrow', direction: 'left', gridPosition: { row: 5, col: 8 } },
        
        // Row 6 arrows
        { id: 'arrow-6-1', type: 'arrow', direction: 'down', gridPosition: { row: 6, col: 1 } },
        { id: 'arrow-6-7', type: 'arrow', direction: 'down', gridPosition: { row: 6, col: 7 } },
        { id: 'arrow-6-9', type: 'arrow', direction: 'down', gridPosition: { row: 6, col: 9 } },
        
        // Row 7 arrows
        { id: 'arrow-7-2', type: 'arrow', direction: 'right', gridPosition: { row: 7, col: 2 } },
      ]
    },
    'sharp-blade': {
      slots: new Map([
        // Row 1
        ['mastery-137', { row: 1, col: 1 }], // ignore evasion 25
        ['mastery-138', { row: 1, col: 3 }], // attack rate 150
        
        // Row 3
        ['mastery-139', { row: 3, col: 3 }], // ign evasion 100
        ['mastery-140', { row: 3, col: 5 }], // attack rate 600
        ['mastery-145', { row: 3, col: 7 }], // expand attack rate 150 (expansion for Attack Rate 150, mastery 138)
        ['mastery-146', { row: 3, col: 9 }], // expand attack rate 600 (expansion for Attack Rate 600, mastery 140)
        
        // Row 5
        ['mastery-141', { row: 5, col: 5 }], // ignore evasion 225
        ['mastery-147', { row: 5, col: 7 }], // expand special mastery (special expansion slot, forceID 146)
        
        // Row 7
        ['mastery-142', { row: 7, col: 5 }], // expand ignore evasion 25 (expansion for Ignore Evasion 25, mastery 137)
        ['mastery-143', { row: 7, col: 7 }], // expand ignore evasion 100 (expansion for Ignore Evasion 100, mastery 139)
        ['mastery-144', { row: 7, col: 9 }], // expand ign evasion 225 (expansion for Ignore Evasion 225, mastery 141)
      ]),
      arrows: [
        // Row 1 arrows
        { id: 'arrow-1-2', type: 'arrow', direction: 'right', gridPosition: { row: 1, col: 2 } },
        
        // Row 2 arrows
        { id: 'arrow-2-3', type: 'arrow', direction: 'down', gridPosition: { row: 2, col: 3 } },
        
        // Row 3 arrows
        { id: 'arrow-3-4', type: 'arrow', direction: 'right', gridPosition: { row: 3, col: 4 } },
        { id: 'arrow-3-6', type: 'arrow', direction: 'right', gridPosition: { row: 3, col: 6 } },
        { id: 'arrow-3-8', type: 'arrow', direction: 'right', gridPosition: { row: 3, col: 8 } },
        
        // Row 4 arrows
        { id: 'arrow-4-5', type: 'arrow', direction: 'down', gridPosition: { row: 4, col: 5 } },
        
        // Row 5 arrows
        { id: 'arrow-5-6', type: 'arrow', direction: 'right', gridPosition: { row: 5, col: 6 } },
        
        // Row 6 arrows
        { id: 'arrow-6-5', type: 'arrow', direction: 'down', gridPosition: { row: 6, col: 5 } },
        
        // Row 7 arrows
        { id: 'arrow-7-6', type: 'arrow', direction: 'right', gridPosition: { row: 7, col: 6 } },
        { id: 'arrow-7-8', type: 'arrow', direction: 'right', gridPosition: { row: 7, col: 8 } },
      ]
    },
    'quick-evasion': {
      slots: new Map([
        // Row 1
        ['mastery-153', { row: 1, col: 5 }], // expand ign accuracy 30 (expansion for Ignore Accuracy 30, mastery 148)
        ['mastery-154', { row: 1, col: 7 }], // expand ign accuracy 120 (expansion for Ignore Accuracy 120, mastery 150)
        ['mastery-155', { row: 1, col: 9 }], // expand ign accuracy 270 (expansion for Ignore Accuracy 270, mastery 152)
        
        // Row 3
        ['mastery-152', { row: 3, col: 5 }], // ignore accuracy 270
        ['mastery-158', { row: 3, col: 7 }], // expand special mastery (special expansion slot, forceID 146)
        
        // Row 5
        ['mastery-150', { row: 5, col: 3 }], // ignore accuracy 120
        ['mastery-151', { row: 5, col: 5 }], // defense rate 400
        ['mastery-156', { row: 5, col: 7 }], // expand defense rate 150 (expansion for Defense Rate 150, mastery 149)
        ['mastery-157', { row: 5, col: 9 }], // expand defense rate 400 (expansion for Defense Rate 400, mastery 151)
        
        // Row 7
        ['mastery-148', { row: 7, col: 1 }], // ignore accuracy 30
        ['mastery-149', { row: 7, col: 3 }], // defense rate 150
      ]),
      arrows: [
        // Row 1 arrows
        { id: 'arrow-1-6', type: 'arrow', direction: 'right', gridPosition: { row: 1, col: 6 } },
        { id: 'arrow-1-8', type: 'arrow', direction: 'right', gridPosition: { row: 1, col: 8 } },
        
        // Row 2 arrows
        { id: 'arrow-2-5', type: 'arrow', direction: 'up', gridPosition: { row: 2, col: 5 } },
        
        // Row 3 arrows
        { id: 'arrow-3-6', type: 'arrow', direction: 'right', gridPosition: { row: 3, col: 6 } },
        
        // Row 4 arrows
        { id: 'arrow-4-5', type: 'arrow', direction: 'up', gridPosition: { row: 4, col: 5 } },
        
        // Row 5 arrows
        { id: 'arrow-5-4', type: 'arrow', direction: 'right', gridPosition: { row: 5, col: 4 } },
        { id: 'arrow-5-6', type: 'arrow', direction: 'right', gridPosition: { row: 5, col: 6 } },
        { id: 'arrow-5-8', type: 'arrow', direction: 'right', gridPosition: { row: 5, col: 8 } },
        
        // Row 6 arrows
        { id: 'arrow-6-3', type: 'arrow', direction: 'up', gridPosition: { row: 6, col: 3 } },
        
        // Row 7 arrows
        { id: 'arrow-7-2', type: 'arrow', direction: 'right', gridPosition: { row: 7, col: 2 } },
      ]
    }
  };

/**
 * Get grid position for a slot by slot ID
 * @param categoryId The category ID
 * @param slotId The slot ID
 * @returns Grid position if found, null otherwise
 */
export function getSlotGridPosition(categoryId: string, slotId: string): GridPosition | null {
  const config = PLATINUM_MERIT_GRID_CONFIGS[categoryId];
  if (!config) return null;
  return config.slots.get(slotId) || null;
}

/**
 * Get all arrows for a category
 * @param categoryId The category ID
 * @returns Array of arrows (with 0-indexed positions for grid component)
 */
export function getCategoryArrows(categoryId: string): PlatinumMeritArrow[] {
  const config = PLATINUM_MERIT_GRID_CONFIGS[categoryId];
  if (!config) return [];
  // Convert from 1-indexed to 0-indexed for grid component
  return config.arrows.map(arrow => ({
    ...arrow,
    gridPosition: {
      row: arrow.gridPosition.row - 1,
      col: arrow.gridPosition.col - 1
    }
  }));
}

/**
 * Get all grid elements (slots + arrows) for a category
 * @param categoryId The category ID
 * @returns Array of grid elements
 */
export function getCategoryGridElements(categoryId: string): PlatinumMeritGridElement[] {
  const config = PLATINUM_MERIT_GRID_CONFIGS[categoryId];
  if (!config) return [];
  
  // This will be populated with actual slot objects when called from the component
  // For now, just return arrows
  return config.arrows;
}
