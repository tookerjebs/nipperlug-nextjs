// Gold Merit System data configuration
import type { GoldMeritCategory } from '../types/index';

export const GoldMeritData: GoldMeritCategory[] = [
  {
    id: 'ignore-evasion',
    name: 'Ignore Evasion',
    description: 'Enhance your offensive capabilities with accuracy, ignore evasion, and attack rate',
    icon: '🎯',
    gridSize: { rows: 6, cols: 10 },
    slots: [
      // Accuracy I - Row 0, Col 0 (BASE - no prerequisites)
      {
        id: 'accuracy-tier-1',
        name: 'Accuracy I',
        description: 'Increases hit accuracy - Tier 1',
        icon: 'accuracy',
        maxLevel: 5,
        gridPosition: { row: 0, col: 0 },
        pointsRequired: 1,
        values: [10, 20, 30, 40, 50],
        statType: 'accuracy'
      },
      // Attack Rate I - Row 2, Col 0
      {
        id: 'attack-rate-tier-1',
        name: 'Attack Rate I',
        description: 'Increases attack speed - Tier 1',
        icon: 'attackRate',
        maxLevel: 5,
        gridPosition: { row: 2, col: 0 },
        pointsRequired: 1,
        values: [100, 120, 140, 160, 180],
        statType: 'attackRate',
        prerequisites: ['accuracy-tier-1']
      },
      // Ignore Evasion I - Row 4, Col 0
      {
        id: 'ignore-evasion-tier-1',
        name: 'Ignore Evasion I',
        description: 'Reduces chance of being evaded - Tier 1',
        icon: 'ignoreEvasion',
        maxLevel: 5,
        gridPosition: { row: 4, col: 0 },
        pointsRequired: 1,
        values: [20, 25, 30, 35, 40],
        statType: 'ignoreEvasion',
        prerequisites: ['attack-rate-tier-1']
      },
      // Attack Rate II - Row 4, Col 2
      {
        id: 'attack-rate-tier-2',
        name: 'Attack Rate II',
        description: 'Increases attack speed - Tier 2',
        icon: 'attackRate',
        maxLevel: 10,
        gridPosition: { row: 4, col: 2 },
        pointsRequired: 2,
        values: [150, 170, 190, 210, 230, 250, 270, 290, 310, 330],
        bonusValues: [20, 40, 60, 80, 100, 120, 140, 160, 180, 200],
        statType: 'attackRate',
        prerequisites: ['ignore-evasion-tier-1']
      },
      // Accuracy II - Row 2, Col 2
      {
        id: 'accuracy-tier-2',
        name: 'Accuracy II',
        description: 'Increases hit accuracy - Tier 2',
        icon: 'accuracy',
        maxLevel: 10,
        gridPosition: { row: 2, col: 2 },
        pointsRequired: 2,
        values: [30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
        bonusValues: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        statType: 'accuracy',
        prerequisites: ['attack-rate-tier-2']
      },
      // Ignore Evasion II - Row 4, Col 4
      {
        id: 'ignore-evasion-tier-2',
        name: 'Ignore Evasion II',
        description: 'Reduces chance of being evaded - Tier 2',
        icon: 'ignoreEvasion',
        maxLevel: 10,
        gridPosition: { row: 4, col: 4 },
        pointsRequired: 2,
        values: [40, 45, 50, 55, 60, 65, 70, 75, 80, 85],
        bonusValues: [3, 5, 7, 9, 11, 13, 15, 17, 19, 21],
        statType: 'ignoreEvasion',
        prerequisites: ['attack-rate-tier-2']
      },
      // Attack Rate III - Row 2, Col 4
      {
        id: 'attack-rate-tier-3',
        name: 'Attack Rate III',
        description: 'Increases attack speed - Tier 3',
        icon: 'attackRate',
        maxLevel: 15,
        gridPosition: { row: 2, col: 4 },
        pointsRequired: 3,
        values: [200, 220, 240, 260, 280, 300, 320, 340, 360, 380, 400, 420, 440, 460, 480],
        bonusValues: [20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300],
        statType: 'attackRate',
        prerequisites: ['ignore-evasion-tier-2']
      },
      // Accuracy III - Row 0, Col 4
      {
        id: 'accuracy-tier-3',
        name: 'Accuracy III',
        description: 'Increases hit accuracy - Tier 3',
        icon: 'accuracy',
        maxLevel: 15,
        gridPosition: { row: 0, col: 4 },
        pointsRequired: 3,
        values: [50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150, 160, 170, 180, 190],
        bonusValues: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100, 110, 120, 130, 140, 150],
        statType: 'accuracy',
        prerequisites: ['attack-rate-tier-3']
      },
      // Ignore Evasion III - Row 0, Col 6
      {
        id: 'ignore-evasion-tier-3',
        name: 'Ignore Evasion III',
        description: 'Reduces chance of being evaded - Tier 3',
        icon: 'ignoreEvasion',
        maxLevel: 15,
        gridPosition: { row: 0, col: 6 },
        pointsRequired: 3,
        values: [60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130],
        bonusValues: [6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32, 34],
        statType: 'ignoreEvasion',
        prerequisites: ['accuracy-tier-3']
      },
      // Expanded Attack Rate I - Row 1, Col 7
      {
        id: 'expanded-attack-rate-tier-1',
        name: 'Expanded Attack Rate I',
        description: 'Unlocks Attack Rate I stats when activated',
        icon: 'attackRate',
        maxLevel: 1,
        gridPosition: { row: 1, col: 7 },
        pointsRequired: 15,
        values: [1],
        statType: 'attackRate',
        isExpansion: true,
        expandsSlot: 'attack-rate-tier-1',
        prerequisites: ['ignore-evasion-tier-3']
      },
      // Expanded Attack Rate II - Row 3, Col 7
      {
        id: 'expanded-attack-rate-tier-2',
        name: 'Expanded Attack Rate II',
        description: 'Unlocks Attack Rate II stats when activated',
        icon: 'attackRate',
        maxLevel: 1,
        gridPosition: { row: 3, col: 7 },
        pointsRequired: 30,
        values: [1],
        statType: 'attackRate',
        isExpansion: true,
        expandsSlot: 'attack-rate-tier-2',
        prerequisites: ['expanded-attack-rate-tier-1']
      },
      // Expanded Attack Rate III - Row 5, Col 7
      {
        id: 'expanded-attack-rate-tier-3',
        name: 'Expanded Attack Rate III',
        description: 'Unlocks Attack Rate III stats when activated',
        icon: 'attackRate',
        maxLevel: 1,
        gridPosition: { row: 5, col: 7 },
        pointsRequired: 45,
        values: [1],
        statType: 'attackRate',
        isExpansion: true,
        expandsSlot: 'attack-rate-tier-3',
        prerequisites: ['expanded-attack-rate-tier-2']
      },
      // Expanded Accuracy I - Row 1, Col 9
      {
        id: 'expanded-accuracy-tier-1',
        name: 'Expanded Accuracy I',
        description: 'Unlocks Accuracy I stats when activated',
        icon: 'accuracy',
        maxLevel: 1,
        gridPosition: { row: 1, col: 9 },
        pointsRequired: 15,
        values: [1],
        statType: 'accuracy',
        isExpansion: true,
        expandsSlot: 'accuracy-tier-1',
        prerequisites: ['expanded-attack-rate-tier-1']
      },
      // Expanded Accuracy II - Row 3, Col 9
      {
        id: 'expanded-accuracy-tier-2',
        name: 'Expanded Accuracy II',
        description: 'Unlocks Accuracy II stats when activated',
        icon: 'accuracy',
        maxLevel: 1,
        gridPosition: { row: 3, col: 9 },
        pointsRequired: 30,
        values: [1],
        statType: 'accuracy',
        isExpansion: true,
        expandsSlot: 'accuracy-tier-2',
        prerequisites: ['expanded-attack-rate-tier-2']
      },
      // Expanded Accuracy III - Row 5, Col 9
      {
        id: 'expanded-accuracy-tier-3',
        name: 'Expanded Accuracy III',
        description: 'Unlocks Accuracy III stats when activated',
        icon: 'accuracy',
        maxLevel: 1,
        gridPosition: { row: 5, col: 9 },
        pointsRequired: 45,
        values: [1],
        statType: 'accuracy',
        isExpansion: true,
        expandsSlot: 'accuracy-tier-3',
        prerequisites: ['expanded-attack-rate-tier-3']
      }
    ],
    gridElements: [
      // Arrows
      {
        id: 'arrow-1',
        type: 'arrow',
        direction: 'down',
        gridPosition: { row: 1, col: 0 }
      },
      {
        id: 'arrow-2',
        type: 'arrow',
        direction: 'down',
        gridPosition: { row: 3, col: 0 }
      },
      {
        id: 'arrow-3',
        type: 'arrow',
        direction: 'right',
        gridPosition: { row: 4, col: 1 }
      },
      {
        id: 'arrow-4',
        type: 'arrow',
        direction: 'up',
        gridPosition: { row: 3, col: 2 }
      },
      {
        id: 'arrow-5',
        type: 'arrow',
        direction: 'right',
        gridPosition: { row: 4, col: 3 }
      },
      {
        id: 'arrow-6',
        type: 'arrow',
        direction: 'up',
        gridPosition: { row: 3, col: 4 }
      },
      {
        id: 'arrow-7',
        type: 'arrow',
        direction: 'up',
        gridPosition: { row: 1, col: 4 }
      },
      {
        id: 'arrow-8',
        type: 'arrow',
        direction: 'right',
        gridPosition: { row: 0, col: 5 }
      },
      // Arrows for Expanded Attack Rate slots
      {
        id: 'arrow-expanded-1',
        type: 'arrow',
        direction: 'down',
        gridPosition: { row: 2, col: 7 }
      },
      {
        id: 'arrow-expanded-2',
        type: 'arrow',
        direction: 'down',
        gridPosition: { row: 4, col: 7 }
      },
      // Curved arrow - goes down then right
      {
        id: 'arrow-curved-1',
        type: 'arrow',
        direction: 'down-right',
        gridPosition: { row: 1, col: 6 }
      },
      // Arrows pointing right from Attack Rate Expand to Accuracy Expand slots
      {
        id: 'arrow-to-accuracy-expand-1',
        type: 'arrow',
        direction: 'right',
        gridPosition: { row: 1, col: 8 }
      },
      {
        id: 'arrow-to-accuracy-expand-2',
        type: 'arrow',
        direction: 'right',
        gridPosition: { row: 3, col: 8 }
      },
      {
        id: 'arrow-to-accuracy-expand-3',
        type: 'arrow',
        direction: 'right',
        gridPosition: { row: 5, col: 8 }
      }
    ]
  },
  {
    id: 'ignore-accuracy',
    name: 'Ignore Accuracy',
    description: 'Reduce the effectiveness of enemy accuracy',
    icon: '🛡️',
    gridSize: { rows: 7, cols: 9 },
    slots: [
      // Row 0, Col 0: Evasion I
      {
        id: 'evasion-tier-1',
        name: 'Evasion I',
        description: 'Increases evasion chance - Tier 1',
        icon: 'evasion',
        maxLevel: 5,
        gridPosition: { row: 0, col: 0 },
        pointsRequired: 1,
        values: [20, 25, 30, 35, 40],
        statType: 'evasion'
      },
      // Row 0, Col 2: Evasion III
      {
        id: 'evasion-tier-3',
        name: 'Evasion III',
        description: 'Increases evasion chance - Tier 3',
        icon: 'evasion',
        maxLevel: 15,
        gridPosition: { row: 0, col: 2 },
        pointsRequired: 3,
        values: [60, 65, 70, 75, 80, 85, 90, 95, 100, 105, 110, 115, 120, 125, 130],
        bonusValues: [15, 20, 25, 30, 35, 40, 45, 50, 55, 60, 65, 70, 75, 80, 85],
        statType: 'evasion',
        prerequisites: ['defense-rate-tier-3']
      },
      // Row 0, Col 4: Cancel Ignore Evasion II
      {
        id: 'cancel-ignore-evasion-tier-2',
        name: 'Cancel Ignore Evasion II',
        description: 'Cancels enemy ignore evasion effects - Tier 2',
        icon: 'cancelIgnoreEvasion',
        maxLevel: 10,
        gridPosition: { row: 0, col: 4 },
        pointsRequired: 2,
        values: [25, 45, 65, 85, 105, 125, 145, 165, 185, 205],
        bonusValues: [7, 9, 11, 13, 15, 17, 19, 21, 23, 25],
        statType: 'cancelIgnoreEvasion',
        prerequisites: ['evasion-tier-3']
      },
      // Row 2, Col 0: Defense Rate I
      {
        id: 'defense-rate-tier-1',
        name: 'Defense Rate I',
        description: 'Increases defense rate - Tier 1',
        icon: 'defenseRate',
        maxLevel: 5,
        gridPosition: { row: 2, col: 0 },
        pointsRequired: 1,
        values: [50, 70, 90, 110, 130],
        statType: 'defenseRate',
        prerequisites: ['evasion-tier-1']
      },
      // Row 2, Col 2: Defense Rate II
      {
        id: 'defense-rate-tier-2',
        name: 'Defense Rate II',
        description: 'Increases defense rate - Tier 2',
        icon: 'defenseRate',
        maxLevel: 10,
        gridPosition: { row: 5, col: 1 },
        pointsRequired: 2,
        values: [90, 110, 130, 150, 170, 190, 210, 230, 250, 270],
        bonusValues: [10, 30, 50, 70, 90, 110, 130, 150, 170, 190],
        statType: 'defenseRate',
        prerequisites: ['ignore-accuracy-tier-1']
      },
      // Row 2, Col 4: Ignore Accuracy
      {
        id: 'ignore-accuracy-tier-3',
        name: 'Ignore Accuracy III',
        description: 'Reduces enemy accuracy effectiveness',
        icon: 'ignoreAccuracy',
        maxLevel: 15,
        gridPosition: { row: 2, col: 4 },
        pointsRequired: 3,
        values: [8, 16, 24, 32, 40, 48, 56, 64, 72, 80, 88, 96, 104, 112, 120],
        bonusValues: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30],
        statType: 'ignoreAccuracy',
        prerequisites: ['defense-rate-tier-3']
      },
      // Row 2, Col 6: Defense Rate Expand I
      {
        id: 'defense-rate-expand-tier-1',
        name: 'Defense Rate Expand I',
        description: 'Unlocks Defense Rate I stats when activated',
        icon: 'defenseRate',
        maxLevel: 1,
        gridPosition: { row: 2, col: 6 },
        pointsRequired: 15,
        values: [1],
        statType: 'defenseRate',
        isExpansion: true,
        expandsSlot: 'defense-rate-tier-1',
        prerequisites: ['ignore-accuracy-tier-3']
      },
      // Row 2, Col 8: Evasion Expand I
      {
        id: 'evasion-expand-tier-1',
        name: 'Evasion Expand I',
        description: 'Unlocks Evasion I stats when activated',
        icon: 'evasion',
        maxLevel: 1,
        gridPosition: { row: 2, col: 8 },
        pointsRequired: 15,
        values: [1],
        statType: 'evasion',
        isExpansion: true,
        expandsSlot: 'evasion-tier-1',
        prerequisites: ['defense-rate-expand-tier-1']
      },
      // Row 4, Col 0: Ignore Accuracy I
      {
        id: 'ignore-accuracy-tier-1',
        name: 'Ignore Accuracy I',
        description: 'Reduces enemy accuracy effectiveness - Tier 1',
        icon: 'ignoreAccuracy',
        maxLevel: 5,
        gridPosition: { row: 4, col: 0 },
        pointsRequired: 1,
        values: [10, 20, 30, 40, 50],
        statType: 'ignoreAccuracy',
        prerequisites: ['defense-rate-tier-1']
      },
      // Row 4, Col 2: Ignore Accuracy II
      {
        id: 'ignore-accuracy-tier-2',
        name: 'Ignore Accuracy II',
        description: 'Reduces enemy accuracy effectiveness - Tier 2',
        icon: 'ignoreAccuracy',
        maxLevel: 10,
        gridPosition: { row: 4, col: 2 },
        pointsRequired: 2,
        values: [30, 40, 50, 60, 70, 80, 90, 100, 110, 120],
        bonusValues: [3, 5, 7, 9, 11, 13, 15, 17, 19, 21],
        statType: 'ignoreAccuracy',
        prerequisites: ['defense-rate-tier-2']
      },
      // Row 4, Col 4: Cancel Ignore Evasion I
      {
        id: 'cancel-ignore-evasion-tier-1',
        name: 'Cancel Ignore Evasion I',
        description: 'Cancels enemy ignore evasion effects - Tier 1',
        icon: 'cancelIgnoreEvasion',
        maxLevel: 5,
        gridPosition: { row: 4, col: 4 },
        pointsRequired: 1,
        values: [25, 45, 65, 85, 105],
        statType: 'cancelIgnoreEvasion',
        prerequisites: ['ignore-accuracy-tier-2']
      },
      // Row 4, Col 6: Defense Rate Expand II
      {
        id: 'defense-rate-expand-tier-2',
        name: 'Defense Rate Expand II',
        description: 'Unlocks Defense Rate II stats when activated',
        icon: 'defenseRate',
        maxLevel: 1,
        gridPosition: { row: 4, col: 6 },
        pointsRequired: 30,
        values: [1],
        statType: 'defenseRate',
        isExpansion: true,
        expandsSlot: 'defense-rate-tier-2',
        prerequisites: ['defense-rate-expand-tier-1']
      },
      // Row 4, Col 8: Evasion Expand II
      {
        id: 'evasion-expand-tier-2',
        name: 'Evasion Expand II',
        description: 'Unlocks Evasion II stats when activated',
        icon: 'evasion',
        maxLevel: 1,
        gridPosition: { row: 4, col: 8 },
        pointsRequired: 30,
        values: [1],
        statType: 'evasion',
        isExpansion: true,
        expandsSlot: 'evasion-tier-2',
        prerequisites: ['defense-rate-expand-tier-2']
      },
      // Row 5, Col 1: Defense Rate III
      {
        id: 'defense-rate-tier-3',
        name: 'Defense Rate III',
        description: 'Increases defense rate - Tier 3',
        icon: 'defenseRate',
        maxLevel: 15,
        gridPosition: { row: 2, col: 2 },
        pointsRequired: 3,
        values: [130, 150, 170, 190, 210, 230, 250, 270, 290, 310, 330, 350, 370, 390, 410],
        bonusValues: [10, 30, 50, 70, 90, 110, 130, 150, 170, 190, 210, 230, 250, 270, 290],
        statType: 'defenseRate',
        prerequisites: ['ignore-accuracy-tier-2']
      },
      // Row 6, Col 2: Evasion II
      {
        id: 'evasion-tier-2',
        name: 'Evasion II',
        description: 'Increases evasion chance - Tier 2',
        icon: 'evasion',
        maxLevel: 10,
        gridPosition: { row: 6, col: 2 },
        pointsRequired: 2,
        values: [40, 45, 50, 55, 60, 65, 70, 75, 80, 85],
        bonusValues: [15, 20, 25, 30, 35, 40, 45, 50, 55, 60],
        statType: 'evasion',
        prerequisites: ['defense-rate-tier-2']
      },
      // Row 6, Col 6: Defense Rate Expand III
      {
        id: 'defense-rate-expand-tier-3',
        name: 'Defense Rate Expand III',
        description: 'Unlocks Defense Rate III stats when activated',
        icon: 'defenseRate',
        maxLevel: 1,
        gridPosition: { row: 6, col: 6 },
        pointsRequired: 45,
        values: [1],
        statType: 'defenseRate',
        isExpansion: true,
        expandsSlot: 'defense-rate-tier-3',
        prerequisites: ['defense-rate-expand-tier-2']
      },
      // Row 6, Col 8: Evasion Expand III
      {
        id: 'evasion-expand-tier-3',
        name: 'Evasion Expand III',
        description: 'Unlocks Evasion III stats when activated',
        icon: 'evasion',
        maxLevel: 1,
        gridPosition: { row: 6, col: 8 },
        pointsRequired: 45,
        values: [1],
        statType: 'evasion',
        isExpansion: true,
        expandsSlot: 'evasion-tier-3',
        prerequisites: ['defense-rate-expand-tier-3']
      }
    ],
    gridElements: [
      // Row 0 arrows
      {
        id: 'arrow-1',
        type: 'arrow',
        direction: 'right',
        gridPosition: { row: 0, col: 3 }
      },
      // Row 1 arrows
      {
        id: 'arrow-2',
        type: 'arrow',
        direction: 'down',
        gridPosition: { row: 1, col: 0 }
      },
      {
        id: 'arrow-3',
        type: 'arrow',
        direction: 'up',
        gridPosition: { row: 1, col: 2 }
      },
      // Row 2 arrows
      {
        id: 'arrow-4',
        type: 'arrow',
        direction: 'right',
        gridPosition: { row: 2, col: 3 }
      },
      {
        id: 'arrow-5',
        type: 'arrow',
        direction: 'right',
        gridPosition: { row: 2, col: 5 }
      },
      {
        id: 'arrow-6',
        type: 'arrow',
        direction: 'right',
        gridPosition: { row: 2, col: 7 }
      },
      // Row 3 arrows
      {
        id: 'arrow-7',
        type: 'arrow',
        direction: 'down',
        gridPosition: { row: 3, col: 0 }
      },
      {
        id: 'arrow-8',
        type: 'arrow',
        direction: 'up',
        gridPosition: { row: 3, col: 2 }
      },
      {
        id: 'arrow-9',
        type: 'arrow',
        direction: 'down',
        gridPosition: { row: 3, col: 6 }
      },
      // Row 4 arrows
      {
        id: 'arrow-10',
        type: 'arrow',
        direction: 'right',
        gridPosition: { row: 4, col: 1 }
      },
      {
        id: 'arrow-11',
        type: 'arrow',
        direction: 'right',
        gridPosition: { row: 4, col: 3 }
      },
      {
        id: 'arrow-12',
        type: 'arrow',
        direction: 'right',
        gridPosition: { row: 4, col: 7 }
      },
      // Row 5 arrows
      {
        id: 'arrow-13',
        type: 'arrow',
        direction: 'right',
        gridPosition: { row: 5, col: 0 }
      },
      {
        id: 'arrow-14',
        type: 'arrow',
        direction: 'down',
        gridPosition: { row: 5, col: 6 }
      },
      // Row 6 arrows
      {
        id: 'arrow-15',
        type: 'arrow',
        direction: 'right',
        gridPosition: { row: 6, col: 1 }
      },
      {
        id: 'arrow-16',
        type: 'arrow',
        direction: 'right',
        gridPosition: { row: 6, col: 7 }
      }
    ]
  },
  {
    id: 'ignore-damage-reduction',
    name: 'Ignore Damage Reduction',
    description: 'Bypass enemy damage reduction defenses',
    icon: '⚔️',
    gridSize: { rows: 6, cols: 10 },
    slots: [
      // Row 0, Col 0: Penetration I
      {
        id: 'penetration-tier-1',
        name: 'Penetration I',
        description: 'Increases penetration power - Tier 1',
        icon: 'penetration',
        maxLevel: 5,
        gridPosition: { row: 0, col: 0 },
        pointsRequired: 1,
        values: [1, 2, 3, 4, 5],
        statType: 'penetration'
      },
      // Row 0, Col 4: Add. Dmg III
      {
        id: 'additional-damage-tier-3',
        name: 'Add. Dmg III',
        description: 'Increases additional damage - Tier 3',
        icon: 'additionalDamage',
        maxLevel: 15,
        gridPosition: { row: 0, col: 4 },
        pointsRequired: 3,
        values: [25, 50, 75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375],
        statType: 'addDamage',
        prerequisites: ['penetration-tier-3']
      },
      // Row 0, Col 6: Ignore Damage Reduce III
      {
        id: 'ignore-damage-reduction-tier-3',
        name: 'Ignore Damage Reduce III',
        description: 'Ignores enemy damage reduction - Tier 3',
        icon: 'ignoreDamageReduction',
        maxLevel: 15,
        gridPosition: { row: 0, col: 6 },
        pointsRequired: 3,
        values: [20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300],
        statType: 'ignoreDamageReduction',
        prerequisites: ['additional-damage-tier-3']
      },
      // Row 1, Col 7: Add. Dmg Expand I
      {
        id: 'additional-damage-expand-tier-1',
        name: 'Add. Dmg Expand I',
        description: 'Unlocks Add. Dmg I stats when activated',
        icon: 'additionalDamage',
        maxLevel: 1,
        gridPosition: { row: 1, col: 7 },
        pointsRequired: 15,
        values: [1],
        statType: 'addDamage',
        isExpansion: true,
        expandsSlot: 'additional-damage-tier-1',
        prerequisites: ['ignore-damage-reduction-tier-3']
      },
      // Row 1, Col 9: Penetration Expand I
      {
        id: 'penetration-expand-tier-1',
        name: 'Penetration Expand I',
        description: 'Unlocks Penetration I stats when activated',
        icon: 'penetration',
        maxLevel: 1,
        gridPosition: { row: 1, col: 9 },
        pointsRequired: 15,
        values: [1],
        statType: 'penetration',
        isExpansion: true,
        expandsSlot: 'penetration-tier-1',
        prerequisites: ['additional-damage-expand-tier-1']
      },
      // Row 2, Col 0: Add Dmg I
      {
        id: 'additional-damage-tier-1',
        name: 'Add Dmg I',
        description: 'Increases additional damage - Tier 1',
        icon: 'additionalDamage',
        maxLevel: 5,
        gridPosition: { row: 2, col: 0 },
        pointsRequired: 1,
        values: [5, 7, 9, 11, 13],
        statType: 'addDamage',
        prerequisites: ['penetration-tier-1']
      },
      // Row 2, Col 2: Add Dmg II
      {
        id: 'additional-damage-tier-2',
        name: 'Add Dmg II',
        description: 'Increases additional damage - Tier 2',
        icon: 'additionalDamage',
        maxLevel: 10,
        gridPosition: { row: 2, col: 2 },
        pointsRequired: 2,
        values: [7, 9, 11, 13, 15, 17, 19, 21, 23, 25],
        bonusValues: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        statType: 'addDamage',
        prerequisites: ['penetration-tier-2']
      },
      // Row 2, Col 4: Penetration III
      {
        id: 'penetration-tier-3',
        name: 'Penetration III',
        description: 'Increases penetration power - Tier 3',
        icon: 'penetration',
        maxLevel: 15,
        gridPosition: { row: 2, col: 4 },
        pointsRequired: 3,
        values: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        bonusValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        statType: 'penetration',
        prerequisites: ['ignore-damage-reduction-tier-2']
      },
      // Row 3, Col 7: Add Dmg Expand II
      {
        id: 'additional-damage-expand-tier-2',
        name: 'Add Dmg Expand II',
        description: 'Unlocks Add. Dmg II stats when activated',
        icon: 'additionalDamage',
        maxLevel: 1,
        gridPosition: { row: 3, col: 7 },
        pointsRequired: 30,
        values: [1],
        statType: 'addDamage',
        isExpansion: true,
        expandsSlot: 'additional-damage-tier-2',
        prerequisites: ['additional-damage-expand-tier-1']
      },
      // Row 3, Col 9: Penetration Expand II
      {
        id: 'penetration-expand-tier-2',
        name: 'Penetration Expand II',
        description: 'Unlocks Penetration II stats when activated',
        icon: 'penetration',
        maxLevel: 1,
        gridPosition: { row: 3, col: 9 },
        pointsRequired: 30,
        values: [1],
        statType: 'penetration',
        isExpansion: true,
        expandsSlot: 'penetration-tier-2',
        prerequisites: ['additional-damage-expand-tier-2']
      },
      // Row 4, Col 0: Ignore Damage Reduce I
      {
        id: 'ignore-damage-reduction-tier-1',
        name: 'Ignore Damage Reduce I',
        description: 'Ignores enemy damage reduction - Tier 1',
        icon: 'ignoreDamageReduction',
        maxLevel: 5,
        gridPosition: { row: 4, col: 0 },
        pointsRequired: 1,
        values: [8, 16, 24, 32, 40],
        statType: 'ignoreDamageReduction',
        prerequisites: ['additional-damage-tier-1']
      },
      // Row 4, Col 2: Penetration II
      {
        id: 'penetration-tier-2',
        name: 'Penetration II',
        description: 'Increases penetration power - Tier 2',
        icon: 'penetration',
        maxLevel: 10,
        gridPosition: { row: 4, col: 2 },
        pointsRequired: 2,
        values: [3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
        bonusValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        statType: 'penetration',
        prerequisites: ['ignore-damage-reduction-tier-1']
      },
      // Row 4, Col 4: Ignore Damage Reduce II
      {
        id: 'ignore-damage-reduction-tier-2',
        name: 'Ignore Damage Reduce II',
        description: 'Ignores enemy damage reduction - Tier 2',
        icon: 'ignoreDamageReduction',
        maxLevel: 10,
        gridPosition: { row: 4, col: 4 },
        pointsRequired: 2,
        values: [12, 24, 36, 48, 60, 72, 84, 96, 108, 120],
        statType: 'ignoreDamageReduction',
        prerequisites: ['penetration-tier-2']
      },
      // Row 5, Col 7: Add Dmg Expand III
      {
        id: 'additional-damage-expand-tier-3',
        name: 'Add Dmg Expand III',
        description: 'Unlocks Add. Dmg III stats when activated',
        icon: 'additionalDamage',
        maxLevel: 1,
        gridPosition: { row: 5, col: 7 },
        pointsRequired: 45,
        values: [1],
        statType: 'addDamage',
        isExpansion: true,
        expandsSlot: 'additional-damage-tier-3',
        prerequisites: ['additional-damage-expand-tier-2']
      },
      // Row 5, Col 9: Penetration Expand III
      {
        id: 'penetration-expand-tier-3',
        name: 'Penetration Expand III',
        description: 'Unlocks Penetration III stats when activated',
        icon: 'penetration',
        maxLevel: 1,
        gridPosition: { row: 5, col: 9 },
        pointsRequired: 45,
        values: [1],
        statType: 'penetration',
        isExpansion: true,
        expandsSlot: 'penetration-tier-3',
        prerequisites: ['additional-damage-expand-tier-3']
      }
    ],
    gridElements: [
      // Row 0 arrows
      {
        id: 'arrow-1',
        type: 'arrow',
        direction: 'right',
        gridPosition: { row: 0, col: 5 }
      },
      // Row 1 arrows
      {
        id: 'arrow-2',
        type: 'arrow',
        direction: 'down',
        gridPosition: { row: 1, col: 0 }
      },
      {
        id: 'arrow-3',
        type: 'arrow',
        direction: 'up',
        gridPosition: { row: 1, col: 4 }
      },
      {
        id: 'arrow-4',
        type: 'arrow',
        direction: 'right',
        gridPosition: { row: 1, col: 6 }
      },
      {
        id: 'arrow-5',
        type: 'arrow',
        direction: 'right',
        gridPosition: { row: 1, col: 8 }
      },
      // Row 2 arrows
      {
        id: 'arrow-6',
        type: 'arrow',
        direction: 'down',
        gridPosition: { row: 2, col: 7 }
      },
      // Row 3 arrows
      {
        id: 'arrow-7',
        type: 'arrow',
        direction: 'down',
        gridPosition: { row: 3, col: 0 }
      },
      {
        id: 'arrow-8',
        type: 'arrow',
        direction: 'up',
        gridPosition: { row: 3, col: 2 }
      },
      {
        id: 'arrow-9',
        type: 'arrow',
        direction: 'up',
        gridPosition: { row: 3, col: 4 }
      },
      {
        id: 'arrow-10',
        type: 'arrow',
        direction: 'right',
        gridPosition: { row: 3, col: 8 }
      },
      // Row 4 arrows
      {
        id: 'arrow-11',
        type: 'arrow',
        direction: 'right',
        gridPosition: { row: 4, col: 1 }
      },
      {
        id: 'arrow-12',
        type: 'arrow',
        direction: 'right',
        gridPosition: { row: 4, col: 3 }
      },
      {
        id: 'arrow-13',
        type: 'arrow',
        direction: 'down',
        gridPosition: { row: 4, col: 7 }
      },
      // Row 5 arrows
      {
        id: 'arrow-14',
        type: 'arrow',
        direction: 'right',
        gridPosition: { row: 5, col: 8 }
      }
    ]
  },
  {
    id: 'ignore-penetration',
    name: 'Ignore Penetration',
    description: 'Reduce the effectiveness of enemy penetration',
    icon: '🔰',
    gridSize: { rows: 7, cols: 9 },
    slots: [
      // Row 0, Col 0: Damage Reduce I
      {
        id: 'damage-reduce-tier-1',
        name: 'Damage Reduce I',
        description: 'Reduces incoming damage - Tier 1',
        icon: 'damageReduction',
        maxLevel: 5,
        gridPosition: { row: 0, col: 0 },
        pointsRequired: 1,
        values: [5, 10, 15, 20, 25],
        statType: 'damageReduction'
      },
      // Row 6, Col 2: Damage Reduce II
      {
        id: 'damage-reduce-tier-2',
        name: 'Damage Reduce II',
        description: 'Reduces incoming damage - Tier 2',
        icon: 'damageReduction',
        maxLevel: 10,
        gridPosition: { row: 6, col: 2 },
        pointsRequired: 2,
        values: [7, 9, 11, 13, 15, 17, 19, 21, 23, 25],
        bonusValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        statType: 'damageReduction'
      },
      // Row 0, Col 4: Cancel Ignore Damage Reduce II
      {
        id: 'cancel-ignore-damage-reduce-tier-2',
        name: 'Cancel Ignore Damage Reduce II',
        description: 'Cancels enemy ignore damage reduction effects - Tier 2',
        icon: 'cancelIgnoreDamageReduction',
        maxLevel: 10,
        gridPosition: { row: 0, col: 4 },
        pointsRequired: 2,
        values: [12, 24, 36, 48, 60, 72, 84, 96, 108, 120],
        statType: 'cancelIgnoreDamageReduction'
      },
      // Row 2, Col 0: Defense I
      {
        id: 'defense-tier-1',
        name: 'Defense I',
        description: 'Increases defense - Tier 1',
        icon: 'defense',
        maxLevel: 5,
        gridPosition: { row: 2, col: 0 },
        pointsRequired: 1,
        values: [10, 20, 30, 40, 50],
        statType: 'defense'
      },
      // Row 2, Col 2: Defense III
      {
        id: 'defense-tier-3',
        name: 'Defense III',
        description: 'Increases defense - Tier 3',
        icon: 'defense',
        maxLevel: 15,
        gridPosition: { row: 2, col: 2 },
        pointsRequired: 3,
        values: [17, 20, 23, 26, 29, 32, 35, 38, 41, 44, 47, 50, 53, 56, 59],
        bonusValues: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19],
        statType: 'defense'
      },
      // Row 2, Col 4: Ignore Penetration III
      {
        id: 'ignore-penetration-tier-3',
        name: 'Ignore Penetration III',
        description: 'Reduces enemy penetration effectiveness - Tier 3',
        icon: 'ignorePenetration',
        maxLevel: 15,
        gridPosition: { row: 2, col: 4 },
        pointsRequired: 3,
        values: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
        bonusValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        statType: 'ignorePenetration'
      },
      // Row 2, Col 6: Defense Expand I
      {
        id: 'defense-expand-tier-1',
        name: 'Defense Expand I',
        description: 'Unlocks Defense I stats when activated',
        icon: 'defense',
        maxLevel: 1,
        gridPosition: { row: 2, col: 6 },
        pointsRequired: 15,
        values: [1],
        statType: 'defense',
        isExpansion: true,
        expandsSlot: 'defense-tier-1'
      },
      // Row 2, Col 8: Damage Reduce Expand I
      {
        id: 'damage-reduce-expand-tier-1',
        name: 'Damage Reduce Expand I',
        description: 'Unlocks Damage Reduce I stats when activated',
        icon: 'damageReduction',
        maxLevel: 1,
        gridPosition: { row: 2, col: 8 },
        pointsRequired: 15,
        values: [1],
        statType: 'damageReduction',
        isExpansion: true,
        expandsSlot: 'damage-reduce-tier-1'
      },
      // Row 4, Col 0: Ignore Penetration I
      {
        id: 'ignore-penetration-tier-1',
        name: 'Ignore Penetration I',
        description: 'Reduces enemy penetration effectiveness - Tier 1',
        icon: 'ignorePenetration',
        maxLevel: 5,
        gridPosition: { row: 4, col: 0 },
        pointsRequired: 1,
        values: [5, 10, 15, 20, 25],
        statType: 'ignorePenetration'
      },
      // Row 4, Col 2: Ignore Penetration II
      {
        id: 'ignore-penetration-tier-2',
        name: 'Ignore Penetration II',
        description: 'Reduces enemy penetration effectiveness - Tier 2',
        icon: 'ignorePenetration',
        maxLevel: 10,
        gridPosition: { row: 4, col: 2 },
        pointsRequired: 2,
        values: [7, 8, 9, 10, 11, 12, 13, 14, 15, 16],
        bonusValues: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        statType: 'ignorePenetration'
      },
      // Row 4, Col 4: Cancel Ignore Damage Reduce I
      {
        id: 'cancel-ignore-damage-reduce-tier-1',
        name: 'Cancel Ignore Damage Reduce I',
        description: 'Cancels enemy ignore damage reduction effects - Tier 1',
        icon: 'cancelIgnoreDamageReduction',
        maxLevel: 5,
        gridPosition: { row: 4, col: 4 },
        pointsRequired: 1,
        values: [8, 16, 24, 32, 40],
        statType: 'cancelIgnoreDamageReduction'
      },
      // Row 4, Col 6: Defense Expand II
      {
        id: 'defense-expand-tier-2',
        name: 'Defense Expand II',
        description: 'Unlocks Defense II stats when activated',
        icon: 'defense',
        maxLevel: 1,
        gridPosition: { row: 4, col: 6 },
        pointsRequired: 30,
        values: [1],
        statType: 'defense',
        isExpansion: true,
        expandsSlot: 'defense-tier-2'
      },
      // Row 4, Col 8: Damage Reduce Expand II
      {
        id: 'damage-reduce-expand-tier-2',
        name: 'Damage Reduce Expand II',
        description: 'Unlocks Damage Reduce II stats when activated',
        icon: 'damageReduction',
        maxLevel: 1,
        gridPosition: { row: 4, col: 8 },
        pointsRequired: 30,
        values: [1],
        statType: 'damageReduction',
        isExpansion: true,
        expandsSlot: 'damage-reduce-tier-2'
      },
      // Row 5, Col 1: Defense II
      {
        id: 'defense-tier-2',
        name: 'Defense II',
        description: 'Increases defense - Tier 2',
        icon: 'defense',
        maxLevel: 10,
        gridPosition: { row: 5, col: 1 },
        pointsRequired: 2,
        values: [12, 15, 18, 21, 24, 27, 30, 33, 36, 39],
        bonusValues: [5, 6, 7, 8, 9, 10, 11, 12, 13, 14],
        statType: 'defense'
      },
      // Row 0, Col 2: Damage Reduce III
      {
        id: 'damage-reduce-tier-3',
        name: 'Damage Reduce III',
        description: 'Reduces incoming damage - Tier 3',
        icon: 'damageReduction',
        maxLevel: 15,
        gridPosition: { row: 0, col: 2 },
        pointsRequired: 3,
        values: [12, 24, 36, 48, 60, 72, 84, 96, 108, 120, 132, 144, 156, 168, 180],
        bonusValues: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45],
        statType: 'damageReduction'
      },
      // Row 6, Col 6: Defense Expand III
      {
        id: 'defense-expand-tier-3',
        name: 'Defense Expand III',
        description: 'Unlocks Defense III stats when activated',
        icon: 'defense',
        maxLevel: 1,
        gridPosition: { row: 6, col: 6 },
        pointsRequired: 45,
        values: [1],
        statType: 'defense',
        isExpansion: true,
        expandsSlot: 'defense-tier-3'
      },
      // Row 6, Col 8: Damage Reduce Expand III
      {
        id: 'damage-reduce-expand-tier-3',
        name: 'Damage Reduce Expand III',
        description: 'Unlocks Damage Reduce III stats when activated',
        icon: 'damageReduction',
        maxLevel: 1,
        gridPosition: { row: 6, col: 8 },
        pointsRequired: 45,
        values: [1],
        statType: 'damageReduction',
        isExpansion: true,
        expandsSlot: 'damage-reduce-tier-3'
      }
    ],
    gridElements: [
      // Row 1 arrows
      {
        id: 'arrow-1',
        type: 'arrow',
        direction: 'down',
        gridPosition: { row: 1, col: 0 }
      },
      {
        id: 'arrow-2',
        type: 'arrow',
        direction: 'up',
        gridPosition: { row: 1, col: 2 }
      },
      {
        id: 'arrow-3',
        type: 'arrow',
        direction: 'up',
        gridPosition: { row: 1, col: 4 }
      },
      // Row 2 arrows
      {
        id: 'arrow-4',
        type: 'arrow',
        direction: 'right',
        gridPosition: { row: 2, col: 3 }
      },
      {
        id: 'arrow-5',
        type: 'arrow',
        direction: 'right',
        gridPosition: { row: 2, col: 5 }
      },
      {
        id: 'arrow-6',
        type: 'arrow',
        direction: 'right',
        gridPosition: { row: 2, col: 7 }
      },
      // Row 3 arrows
      {
        id: 'arrow-7',
        type: 'arrow',
        direction: 'down',
        gridPosition: { row: 3, col: 0 }
      },
      {
        id: 'arrow-8',
        type: 'arrow',
        direction: 'up',
        gridPosition: { row: 3, col: 2 }
      },
      {
        id: 'arrow-9',
        type: 'arrow',
        direction: 'down',
        gridPosition: { row: 3, col: 6 }
      },
      // Row 4 arrows
      {
        id: 'arrow-10',
        type: 'arrow',
        direction: 'right',
        gridPosition: { row: 4, col: 1 }
      },
      {
        id: 'arrow-11',
        type: 'arrow',
        direction: 'right',
        gridPosition: { row: 4, col: 3 }
      },
      {
        id: 'arrow-12',
        type: 'arrow',
        direction: 'right',
        gridPosition: { row: 4, col: 7 }
      },
      // Row 5 arrows
      {
        id: 'arrow-13',
        type: 'arrow',
        direction: 'right',
        gridPosition: { row: 5, col: 0 }
      },
      {
        id: 'arrow-14',
        type: 'arrow',
        direction: 'down',
        gridPosition: { row: 5, col: 6 }
      },
      // Row 6 arrows
      {
        id: 'arrow-15',
        type: 'arrow',
        direction: 'right',
        gridPosition: { row: 6, col: 1 }
      },
      {
        id: 'arrow-16',
        type: 'arrow',
        direction: 'right',
        gridPosition: { row: 6, col: 7 }
      }
    ]
  }
];