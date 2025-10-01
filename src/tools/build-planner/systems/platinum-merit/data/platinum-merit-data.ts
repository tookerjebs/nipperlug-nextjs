// Platinum Merit System data configuration
import type { PlatinumMeritCategory } from '../types/index';

export const PlatinumMeritData: PlatinumMeritCategory[] = [
  {
    id: 'fierce-spirit',
    name: 'Fierce Spirit',
    description: 'Enhance your fierce combat spirit and offensive capabilities',
    icon: '🔥',
    gridSize: { rows: 7, cols: 10 },
    slots: [
      // Row 1: Slot Expand Penetration I (Col 5)
      {
        id: 'slot-expand-penetration-1',
        name: 'Slot Expand Penetration I',
        description: 'Unlocks Penetration I expansion slot',
        icon: '/images/stat icons/penetration_icon.png',
        maxLevel: 1,
        gridPosition: { row: 0, col: 5 },
        pointsRequired: 15,
        values: [1],
        statType: 'penetration',
        isExpansion: true,
        expandsSlot: 'penetration-1'
      },
      // Row 1: Slot Expand All Attack III (Col 7)
      {
        id: 'slot-expand-all-attack-3',
        name: 'Slot Expand All Attack III',
        description: 'Unlocks All Attack III expansion slot',
        icon: '/images/stat icons/all_atk_icon.png',
        maxLevel: 1,
        gridPosition: { row: 0, col: 7 },
        pointsRequired: 30,
        values: [1],
        statType: 'allAttackUp',
        isExpansion: true,
        expandsSlot: 'all-attack-up-3'
      },
      // Row 1: Slot Expand Ignore Damage Reduction III (Col 9)
      {
        id: 'slot-expand-ignore-damage-reduction-3',
        name: 'Slot Expand Ignore Damage Reduction III',
        description: 'Unlocks Ignore Damage Reduction III expansion slot',
        icon: '/images/stat icons/ignore_dmg_reduce_icon.png',
        maxLevel: 1,
        gridPosition: { row: 0, col: 9 },
        pointsRequired: 45,
        values: [1],
        statType: 'ignoreDamageReduction',
        isExpansion: true,
        expandsSlot: 'ignore-damage-reduction-3'
      },
      // Row 2: All Attack I (Col 0)
      {
        id: 'all-attack-up-1',
        name: 'All Attack Up I',
        description: 'Increases all attack types - Tier 1',
        icon: '/images/stat icons/all_atk_icon.png',
        maxLevel: 5,
        gridPosition: { row: 1, col: 0 },
        pointsRequired: 3,
        values: [2, 4, 6, 8, 10],
        statType: 'allAttackUp'
      },
      // Row 2: Penetration I (Col 4)
      {
        id: 'penetration-1',
        name: 'Penetration I',
        description: 'Bypasses a portion of enemy defense - Tier 1',
        icon: '/images/stat icons/penetration_icon.png',
        maxLevel: 5,
        gridPosition: { row: 1, col: 4 },
        pointsRequired: 5,
        values: [4, 8, 12, 16, 20],
        statType: 'penetration'
      },
      // Row 2: Slot Expand All Attack II (Col 6)
      {
        id: 'slot-expand-all-attack-2',
        name: 'Slot Expand All Attack II',
        description: 'Unlocks All Attack II expansion slot',
        icon: '/images/stat icons/all_atk_icon.png',
        maxLevel: 1,
        gridPosition: { row: 1, col: 6 },
        pointsRequired: 20,
        values: [1],
        statType: 'allAttackUp',
        isExpansion: true,
        expandsSlot: 'all-attack-up-2'
      },
      // Row 2: Slot Expand Ignore Damage Reduction II (Col 8)
      {
        id: 'slot-expand-ignore-damage-reduction-2',
        name: 'Slot Expand Ignore Damage Reduction II',
        description: 'Unlocks Ignore Damage Reduction II expansion slot',
        icon: '/images/stat icons/ignore_dmg_reduce_icon.png',
        maxLevel: 1,
        gridPosition: { row: 1, col: 8 },
        pointsRequired: 25,
        values: [1],
        statType: 'ignoreDamageReduction',
        isExpansion: true,
        expandsSlot: 'ignore-damage-reduction-2'
      },
      // Row 4: Ignore Damage Reduction I (Col 0)
      {
        id: 'ignore-damage-reduction-1',
        name: 'Ignore Damage Reduction I',
        description: 'Bypasses enemy damage reduction - Tier 1',
        icon: '/images/stat icons/ignore_dmg_reduce_icon.png',
        maxLevel: 5,
        gridPosition: { row: 3, col: 0 },
        pointsRequired: 3,
        values: [2, 4, 6, 8, 10],
        statType: 'ignoreDamageReduction'
      },
      // Row 4: All Attack III (Col 2)
      {
        id: 'all-attack-up-3',
        name: 'All Attack Up III',
        description: 'Increases all attack types - Tier 3',
        icon: '/images/stat icons/all_atk_icon.png',
        maxLevel: 15,
        gridPosition: { row: 3, col: 2 },
        pointsRequired: 7,
        values: [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60],
        statType: 'allAttackUp'
      },
      // Row 4: Ignore Damage Reduction III (Col 4)
      {
        id: 'ignore-damage-reduction-3',
        name: 'Ignore Damage Reduction III',
        description: 'Bypasses enemy damage reduction - Tier 3',
        icon: '/images/stat icons/ignore_dmg_reduce_icon.png',
        maxLevel: 15,
        gridPosition: { row: 3, col: 4 },
        pointsRequired: 7,
        values: [4, 8, 12, 16, 20, 24, 28, 32, 36, 40, 44, 48, 52, 56, 60],
        statType: 'ignoreDamageReduction'
      },
      // Row 4: Slot Expand All Attack I (Col 6)
      {
        id: 'slot-expand-all-attack-1',
        name: 'Slot Expand All Attack I',
        description: 'Unlocks All Attack I expansion slot',
        icon: '/images/stat icons/all_atk_icon.png',
        maxLevel: 1,
        gridPosition: { row: 3, col: 6 },
        pointsRequired: 10,
        values: [1],
        statType: 'allAttackUp',
        isExpansion: true,
        expandsSlot: 'all-attack-up-1'
      },
      // Row 4: Slot Expand Ignore Damage Reduction I (Col 8)
      {
        id: 'slot-expand-ignore-damage-reduction-1',
        name: 'Slot Expand Ignore Damage Reduction I',
        description: 'Unlocks Ignore Damage Reduction I expansion slot',
        icon: '/images/stat icons/ignore_dmg_reduce_icon.png',
        maxLevel: 1,
        gridPosition: { row: 3, col: 8 },
        pointsRequired: 12,
        values: [1],
        statType: 'ignoreDamageReduction',
        isExpansion: true,
        expandsSlot: 'ignore-damage-reduction-1'
      },
      // Row 5: Expand Special Mastery (Col 9)
      {
        id: 'expand-special-mastery',
        name: 'Expand Special Mastery',
        description: 'Unlocks special mastery capabilities',
        icon: '/images/stat icons/special_mastery_icon.png',
        maxLevel: 1,
        gridPosition: { row: 4, col: 9 },
        pointsRequired: 50,
        values: [1],
        statType: 'specialMastery',
        isExpansion: true
      },
      // Row 6: All Attack II (Col 0)
      {
        id: 'all-attack-tier-2',
        name: 'All Attack II',
        description: 'Increases all attack damage - Tier 2',
        icon: '/images/stat icons/all_attack_icon.png',
        maxLevel: 10,
        gridPosition: { row: 5, col: 0 },
        pointsRequired: 5,
        values: [15, 30, 45, 60, 75, 90, 105, 120, 135, 150],
        statType: 'allAttack'
      },
      // Row 6: Ignore Damage Reduction II (Col 2)
      {
        id: 'ignore-damage-reduction-tier-2',
        name: 'Ignore Damage Reduction II',
        description: 'Ignores enemy damage reduction - Tier 2',
        icon: '/images/stat icons/ignore_dmg_reduce_icon.png',
        maxLevel: 10,
        gridPosition: { row: 5, col: 2 },
        pointsRequired: 5,
        values: [8, 16, 24, 32, 40, 48, 56, 64, 72, 80],
        statType: 'ignoreDamageReduction'
      },
      // Row 6: All Skill Amp I (Col 4)
      {
        id: 'all-skill-amp-tier-1',
        name: 'All Skill Amp I',
        description: 'Amplifies all skill damage - Tier 1',
        icon: '/images/stat icons/all_skill_amp_icon.png',
        maxLevel: 5,
        gridPosition: { row: 5, col: 4 },
        pointsRequired: 3,
        values: [5, 10, 15, 20, 25],
        statType: 'allSkillAmp'
      },
      // Row 6: Critical Damage I (Col 6)
      {
        id: 'critical-damage-tier-1',
        name: 'Critical Damage I',
        description: 'Increases critical hit damage',
        icon: '/images/stat icons/critical_damage_icon.png',
        maxLevel: 5,
        gridPosition: { row: 5, col: 6 },
        pointsRequired: 3,
        values: [10, 20, 30, 40, 50],
        statType: 'criticalDamage'
      },
      // Row 7: Expand All Skill Amp (Col 5)
      {
        id: 'expand-all-skill-amp',
        name: 'Expand All Skill Amp',
        description: 'Unlocks All Skill Amp I stats when activated',
        icon: '/images/stat icons/all_skill_amp_icon.png',
        maxLevel: 1,
        gridPosition: { row: 6, col: 5 },
        pointsRequired: 25,
        values: [1],
        statType: 'allSkillAmp',
        isExpansion: true,
        expandsSlot: 'all-skill-amp-tier-1'
      },
      // Row 7: Expand Critical Damage (Col 7)
      {
        id: 'expand-critical-damage',
        name: 'Expand Critical Damage',
        description: 'Unlocks Critical Damage I stats when activated',
        icon: '/images/stat icons/critical_damage_icon.png',
        maxLevel: 1,
        gridPosition: { row: 6, col: 7 },
        pointsRequired: 25,
        values: [1],
        statType: 'criticalDamage',
        isExpansion: true,
        expandsSlot: 'critical-damage-tier-1'
      }
    ],
    gridElements: [
      // Row 1 arrows
      {
        id: 'arrow-1-1',
        type: 'arrow',
        direction: 'up-right',
        gridPosition: { row: 0, col: 4 }
      },
      {
        id: 'arrow-1-2',
        type: 'arrow',
        direction: 'up-right',
        gridPosition: { row: 0, col: 6 }
      },
      {
        id: 'arrow-1-3',
        type: 'arrow',
        direction: 'up-right',
        gridPosition: { row: 0, col: 8 }
      },
      // Row 3 arrows
      {
        id: 'arrow-3-1',
        type: 'arrow',
        direction: 'down',
        gridPosition: { row: 2, col: 0 }
      },
      {
        id: 'arrow-3-2',
        type: 'arrow',
        direction: 'up',
        gridPosition: { row: 2, col: 4 }
      },
      {
        id: 'arrow-3-3',
        type: 'arrow',
        direction: 'up',
        gridPosition: { row: 2, col: 6 }
      },
      {
        id: 'arrow-3-4',
        type: 'arrow',
        direction: 'up',
        gridPosition: { row: 2, col: 8 }
      },
      // Row 4 arrows
      {
        id: 'arrow-4-1',
        type: 'arrow',
        direction: 'right',
        gridPosition: { row: 3, col: 3 }
      },
      {
        id: 'arrow-4-2',
        type: 'arrow',
        direction: 'right',
        gridPosition: { row: 3, col: 5 }
      },
      {
        id: 'arrow-4-3',
        type: 'arrow',
        direction: 'right',
        gridPosition: { row: 3, col: 7 }
      },
      // Row 5 arrows
      {
        id: 'arrow-5-1',
        type: 'arrow',
        direction: 'down',
        gridPosition: { row: 4, col: 0 }
      },
      {
        id: 'arrow-5-2',
        type: 'arrow',
        direction: 'up',
        gridPosition: { row: 4, col: 2 }
      },
      {
        id: 'arrow-5-3',
        type: 'arrow',
        direction: 'down',
        gridPosition: { row: 4, col: 4 }
      },
      {
        id: 'arrow-5-4',
        type: 'arrow',
        direction: 'down',
        gridPosition: { row: 4, col: 6 }
      },
      {
        id: 'arrow-5-5',
        type: 'arrow',
        direction: 'down-right',
        gridPosition: { row: 4, col: 8 }
      },
      // Row 6 arrows
      {
        id: 'arrow-6-1',
        type: 'arrow',
        direction: 'right',
        gridPosition: { row: 5, col: 1 }
      },
      // Row 7 arrows
      {
        id: 'arrow-7-1',
        type: 'arrow',
        direction: 'down-right',
        gridPosition: { row: 6, col: 4 }
      },
      {
        id: 'arrow-7-2',
        type: 'arrow',
        direction: 'down-right',
        gridPosition: { row: 6, col: 6 }
      }
    ]
    },
  {
    id: 'iron-will',
    name: 'Iron Will',
    description: 'Strengthen your mental fortitude and defensive capabilities',
    icon: '🛡️',
    gridSize: { rows: 6, cols: 10 },
    slots: [
      // HP I (Level 3 requirement, 5 levels)
      {
        id: 'hp-1',
        name: 'HP I',
        description: 'Increases total health points',
        icon: '/images/stat icons/hp_icon.png',
        maxLevel: 5,
        gridPosition: { row: 0, col: 0 },
        pointsRequired: 3,
        values: [10, 20, 30, 40, 50],
        statType: 'hp'
      },
      // Ignore Penetration I (Level 3 requirement, 5 levels)
      {
        id: 'ignore-penetration-1',
        name: 'Ignore Penetration I',
        description: 'Reduces enemy penetration',
        icon: '/images/stat icons/ignore_penetration_icon.png',
        maxLevel: 5,
        gridPosition: { row: 1, col: 0 },
        pointsRequired: 3,
        values: [1, 2, 3, 4, 5],
        statType: 'ignorePenetration'
      },
      // HP II (Level 5 requirement, 10 levels)
       {
         id: 'hp-2',
         name: 'HP II',
         description: 'Increases total health points',
         icon: '/images/stat icons/hp_icon.png',
         maxLevel: 10,
         gridPosition: { row: 2, col: 0 },
         pointsRequired: 5,
         values: [15, 30, 45, 60, 75, 90, 105, 120, 135, 150],
         statType: 'hp'
       },
       // Ignore Penetration II (Level 5 requirement, 10 levels)
       {
         id: 'ignore-penetration-2',
         name: 'Ignore Penetration II',
         description: 'Reduces enemy penetration',
         icon: '/images/stat icons/ignore_penetration_icon.png',
         maxLevel: 10,
         gridPosition: { row: 0, col: 1 },
         pointsRequired: 5,
         values: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
         statType: 'ignorePenetration'
       },
       // HP III (Level 7 requirement, 15 levels)
       {
         id: 'hp-3',
         name: 'HP III',
         description: 'Increases total health points',
         icon: '/images/stat icons/hp_icon.png',
         maxLevel: 15,
         gridPosition: { row: 1, col: 1 },
         pointsRequired: 7,
         values: [20, 40, 60, 80, 100, 120, 140, 160, 180, 200, 220, 240, 260, 280, 300],
         statType: 'hp'
       },
       // Ignore Penetration III (Level 7 requirement, 15 levels)
        {
          id: 'ignore-penetration-3',
          name: 'Ignore Penetration III',
          description: 'Reduces enemy penetration',
          icon: '/images/stat icons/ignore_penetration_icon.png',
          maxLevel: 15,
          gridPosition: { row: 2, col: 1 },
          pointsRequired: 7,
          values: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45],
          statType: 'ignorePenetration'
        },
        // Defense I (Level 3 requirement, 5 levels)
        {
          id: 'defense-1',
          name: 'Defense I',
          description: 'Reduces damage taken',
          icon: '/images/stat icons/defense_icon.png',
          maxLevel: 5,
          gridPosition: { row: 0, col: 2 },
          pointsRequired: 3,
          values: [5, 10, 15, 20, 25],
          statType: 'defense'
        },
        // Defense II (Level 5 requirement, 10 levels)
        {
          id: 'defense-2',
          name: 'Defense II',
          description: 'Reduces damage taken',
          icon: '/images/stat icons/defense_icon.png',
          maxLevel: 10,
          gridPosition: { row: 1, col: 2 },
          pointsRequired: 5,
          values: [8, 16, 24, 32, 40, 48, 56, 64, 72, 80],
          statType: 'defense'
        },
        // HP Absorb Limit Up I (Level 3 requirement, 5 levels)
        {
          id: 'hp-absorb-limit-up-1',
          name: 'HP Absorb Limit Up I',
          description: 'Increases HP absorption',
          icon: '/images/stat icons/max_hp_absorb_icon.png',
          maxLevel: 5,
          gridPosition: { row: 2, col: 2 },
          pointsRequired: 3,
          values: [3, 6, 9, 12, 15],
          statType: 'maxHpStealPerHit'
        }
    ]
  },
  {
    id: 'war-slayer',
    name: 'War Slayer',
    description: 'Master the art of warfare and combat techniques',
    icon: '⚔️',
    gridSize: { rows: 6, cols: 10 },
    slots: [
      // Cancel Ignore Penetration I (Level 3 requirement, 5 levels)
      {
        id: 'cancel-ignore-penetration-i',
        name: 'Cancel Ignore Penetration I',
        description: 'Cancels enemy ignore penetration effects',
        icon: '/images/stat icons/cancel_ignore_penetration_icon.png',
        maxLevel: 5,
        gridPosition: { row: 0, col: 0 },
        pointsRequired: 3,
        values: [1, 2, 3, 4, 5],
        statType: 'cancelIgnorePenetration'
      },
      // Ignore Resist Critical DMG I (Level 4 requirement, 3 levels)
      {
        id: 'ignore-resist-critical-dmg-i',
        name: 'Ignore Resist Critical DMG I',
        description: 'Ignores enemy critical damage resistance',
        icon: '/images/stat icons/ignore_resist_crit_dmg_icon.png',
        maxLevel: 3,
        gridPosition: { row: 0, col: 1 },
        pointsRequired: 4,
        values: [2, 4, 6],
        statType: 'ignoreResistCriticalDamage'
      },
      // Ignore Resist Skill Amp. I (Level 4 requirement, 3 levels)
      {
        id: 'ignore-resist-skill-amp-i',
        name: 'Ignore Resist Skill Amp. I',
        description: 'Ignores enemy skill amplification resistance',
        icon: '/images/stat icons/ignore_resist_skill_amp_icon.png',
        maxLevel: 3,
        gridPosition: { row: 0, col: 2 },
        pointsRequired: 4,
        values: [1, 2, 3],
        statType: 'ignoreResistSkillAmp'
      },
      // Cancel Ignore Penetration II (Level 5 requirement, 10 levels)
      {
        id: 'cancel-ignore-penetration-ii',
        name: 'Cancel Ignore Penetration II',
        description: 'Cancels enemy ignore penetration effects',
        icon: '/images/stat icons/cancel_ignore_penetration_icon.png',
        maxLevel: 10,
        gridPosition: { row: 1, col: 0 },
        pointsRequired: 5,
        values: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
        statType: 'cancelIgnorePenetration'
      },
      // Ignore Resist Critical DMG II (Level 6 requirement, 5 levels)
       {
         id: 'ignore-resist-critical-dmg-ii',
         name: 'Ignore Resist Critical DMG II',
         description: 'Ignores enemy critical damage resistance',
         icon: '/images/stat icons/ignore_resist_crit_dmg_icon.png',
         maxLevel: 5,
         gridPosition: { row: 1, col: 1 },
         pointsRequired: 6,
         values: [3, 6, 9, 12, 15],
         statType: 'ignoreResistCriticalDamage'
       },
       // Ignore Resist Skill Amp. II (Level 6 requirement, 5 levels)
        {
          id: 'ignore-resist-skill-amp-ii',
          name: 'Ignore Resist Skill Amp. II',
          description: 'Ignores enemy skill amplification resistance',
          icon: '/images/stat icons/ignore_resist_skill_amp_icon.png',
          maxLevel: 5,
          gridPosition: { row: 1, col: 2 },
          pointsRequired: 6,
          values: [1, 2, 3, 4, 5],
          statType: 'ignoreResistSkillAmp'
        },
        // Cancel Ignore Penetration III (Level 7 requirement, 15 levels)
        {
          id: 'cancel-ignore-penetration-iii',
          name: 'Cancel Ignore Penetration III',
          description: 'Cancels enemy ignore penetration effects',
          icon: '/images/stat icons/cancel_ignore_penetration_icon.png',
          maxLevel: 15,
          gridPosition: { row: 2, col: 0 },
          pointsRequired: 7,
          values: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45],
          statType: 'cancelIgnorePenetration'
        },
        // Ignore Resist Critical DMG III (Level 8 requirement, 7 levels)
        {
          id: 'ignore-resist-critical-dmg-iii',
          name: 'Ignore Resist Critical DMG III',
          description: 'Ignores enemy critical damage resistance',
          icon: '/images/stat icons/ignore_resist_crit_dmg_icon.png',
          maxLevel: 7,
          gridPosition: { row: 2, col: 1 },
          pointsRequired: 8,
          values: [4, 8, 12, 16, 20, 24, 28],
          statType: 'ignoreResistCriticalDamage'
        },
        // Ignore Resist Skill Amp. III (Level 8 requirement, 7 levels)
        {
          id: 'ignore-resist-skill-amp-iii',
          name: 'Ignore Resist Skill Amp. III',
          description: 'Ignores enemy skill amplification resistance',
          icon: '/images/stat icons/ignore_resist_skill_amp_icon.png',
          maxLevel: 7,
          gridPosition: { row: 2, col: 2 },
          pointsRequired: 8,
          values: [2, 4, 6, 8, 10, 12, 14],
          statType: 'ignoreResistSkillAmp'
        }
    ]
  },
  {
    id: 'war-guardian',
    name: 'War Guardian',
    description: 'Defensive mastery and protection against enemy attacks',
    icon: '🛡️',
    gridSize: { rows: 6, cols: 10 },
    slots: [
      // Cancel Ignore Damage Reduce I (Level 1 requirement, 5 levels)
      {
        id: 'cancel-ignore-damage-reduce-i',
        name: 'Cancel Ignore Damage Reduce I',
        description: 'Reduces enemy damage reduction bypass',
        icon: '/images/stat icons/cancel_ignore_damage_reduction_icon.png',
        maxLevel: 5,
        gridPosition: { row: 0, col: 0 },
        pointsRequired: 3,
        values: [1, 2, 3, 4, 5],
        statType: 'cancelIgnoreDamageReduction'
      },
      // Resist Critical DMG I (Level 1 requirement, 3 levels)
      {
        id: 'resist-critical-dmg-i',
        name: 'Resist Critical DMG I',
        description: 'Reduces critical damage taken',
        icon: '/images/stat icons/resist_crit_dmg_icon.png',
        maxLevel: 3,
        gridPosition: { row: 0, col: 1 },
        pointsRequired: 4,
        values: [2, 4, 6],
        statType: 'resistCriticalDamage'
      },
      // Resist Skill Amp. I (Level 1 requirement, 3 levels)
      {
        id: 'resist-skill-amp-i',
        name: 'Resist Skill Amp. I',
        description: 'Reduces skill damage taken',
        icon: '/images/stat icons/resist_skill_amp_icon.png',
        maxLevel: 3,
        gridPosition: { row: 0, col: 2 },
        pointsRequired: 4,
        values: [1, 2, 3],
        statType: 'resistSkillAmp'
      },
      // Cancel Ignore Damage Reduce II (Level 1 requirement, 10 levels)
      {
        id: 'cancel-ignore-damage-reduce-ii',
        name: 'Cancel Ignore Damage Reduce II',
        description: 'Reduces enemy damage reduction bypass',
        icon: '/images/stat icons/cancel_ignore_damage_reduction_icon.png',
        maxLevel: 10,
        gridPosition: { row: 1, col: 0 },
        pointsRequired: 5,
        values: [2, 4, 6, 8, 10, 12, 14, 16, 18, 20],
        statType: 'cancelIgnoreDamageReduction'
      },
      // Resist Critical DMG II (Level 1 requirement, 5 levels)
      {
        id: 'resist-critical-dmg-ii',
        name: 'Resist Critical DMG II',
        description: 'Reduces critical damage taken',
        icon: '/images/stat icons/resist_crit_dmg_icon.png',
        maxLevel: 5,
        gridPosition: { row: 1, col: 1 },
        pointsRequired: 6,
        values: [3, 6, 9, 12, 15],
        statType: 'resistCriticalDamage'
      },
      // Resist Skill Amp. II (Level 1 requirement, 5 levels)
       {
         id: 'resist-skill-amp-ii',
         name: 'Resist Skill Amp. II',
         description: 'Reduces skill damage taken',
         icon: '/images/stat icons/resist_skill_amp_icon.png',
         maxLevel: 5,
         gridPosition: { row: 1, col: 2 },
         pointsRequired: 6,
         values: [1, 2, 3, 4, 5],
         statType: 'resistSkillAmp'
       },
       // Cancel Ignore Damage Reduce III (Level 1 requirement, 15 levels)
       {
         id: 'cancel-ignore-damage-reduce-iii',
         name: 'Cancel Ignore Damage Reduce III',
         description: 'Reduces enemy damage reduction bypass',
         icon: '/images/stat icons/cancel_ignore_damage_reduction_icon.png',
         maxLevel: 15,
         gridPosition: { row: 2, col: 0 },
         pointsRequired: 7,
         values: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30, 33, 36, 39, 42, 45],
         statType: 'cancelIgnoreDamageReduction'
       },
       // Resist Critical DMG III (Level 1 requirement, 7 levels)
       {
         id: 'resist-critical-dmg-iii',
         name: 'Resist Critical DMG III',
         description: 'Reduces critical damage taken',
         icon: '/images/stat icons/resist_crit_dmg_icon.png',
         maxLevel: 7,
         gridPosition: { row: 2, col: 1 },
         pointsRequired: 8,
         values: [3, 6, 9, 12, 15, 18, 21],
         statType: 'resistCriticalDamage'
       },
       // Resist Skill Amp. III (Level 1 requirement, 7 levels)
       {
         id: 'resist-skill-amp-iii',
         name: 'Resist Skill Amp. III',
         description: 'Reduces skill damage taken',
         icon: '/images/stat icons/resist_skill_amp_icon.png',
         maxLevel: 7,
         gridPosition: { row: 2, col: 2 },
         pointsRequired: 8,
         values: [1, 2, 3, 4, 5, 6, 7],
         statType: 'resistSkillAmp'
       },
       // Damage Reduce I (Level 1 requirement, 5 levels)
       {
         id: 'damage-reduce-i',
         name: 'Damage Reduce I',
         description: 'Reduces all damage taken',
         icon: '/images/stat icons/dmg_reduction_icon.png',
         maxLevel: 5,
         gridPosition: { row: 3, col: 0 },
         pointsRequired: 3,
         values: [2, 4, 6, 8, 10],
         statType: 'damageReduction'
       },
       // Damage Reduce II (Level 1 requirement, 10 levels)
       {
         id: 'damage-reduce-ii',
         name: 'Damage Reduce II',
         description: 'Reduces all damage taken',
         icon: '/images/stat icons/dmg_reduction_icon.png',
         maxLevel: 10,
         gridPosition: { row: 4, col: 0 },
         pointsRequired: 5,
         values: [3, 6, 9, 12, 15, 18, 21, 24, 27, 30],
         statType: 'damageReduction'
       }
     ]
   },
  {
    id: 'sharp-blade',
    name: 'Sharp Blade',
    description: 'Enhance your offensive capabilities with evasion bypass and attack speed',
    icon: '⚔️',
    gridSize: { rows: 6, cols: 10 },
    slots: [
      // Ignore Evasion I (Level 1 requirement, 5 levels)
      {
        id: 'ignore-evasion-i',
        name: 'Ignore Evasion I',
        description: 'Reduces chance of being evaded',
        icon: '/images/stat icons/ignore_evasion_icon.png',
        maxLevel: 5,
        gridPosition: { row: 0, col: 0 },
        pointsRequired: 3,
        values: [5, 10, 15, 20, 25],
        statType: 'ignoreEvasion'
      },
      // Attack Rate I (Level 1 requirement, 5 levels)
      {
        id: 'attack-rate-i',
        name: 'Attack Rate I',
        description: 'Increases attack speed',
        icon: '/images/stat icons/attack_rate_icon.png',
        maxLevel: 5,
        gridPosition: { row: 0, col: 1 },
        pointsRequired: 3,
        values: [30, 60, 90, 120, 150],
        statType: 'attackRate'
      },
      // Ignore Evasion II (Level 1 requirement, 10 levels)
      {
        id: 'ignore-evasion-ii',
        name: 'Ignore Evasion II',
        description: 'Reduces chance of being evaded',
        icon: '/images/stat icons/ignore_evasion_icon.png',
        maxLevel: 10,
        gridPosition: { row: 1, col: 0 },
        pointsRequired: 5,
        values: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
        statType: 'ignoreEvasion'
      },
      // Attack Rate II (Level 1 requirement, 10 levels)
       {
         id: 'attack-rate-ii',
         name: 'Attack Rate II',
         description: 'Increases attack speed',
         icon: '/images/stat icons/attack_rate_icon.png',
         maxLevel: 10,
         gridPosition: { row: 1, col: 1 },
         pointsRequired: 5,
         values: [60, 120, 180, 240, 300, 360, 420, 480, 540, 600],
         statType: 'attackRate'
       },
       // Ignore Evasion III (Level 1 requirement, 15 levels)
       {
         id: 'ignore-evasion-iii',
         name: 'Ignore Evasion III',
         description: 'Reduces chance of being evaded',
         icon: '/images/stat icons/ignore_evasion_icon.png',
         maxLevel: 15,
         gridPosition: { row: 2, col: 0 },
         pointsRequired: 7,
         values: [15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165, 180, 195, 210, 225],
         statType: 'ignoreEvasion'
       }
    ]
  },
  {
    id: 'quick-evasion',
    name: 'Quick Evasion',
    description: 'Enhance your defensive capabilities with accuracy resistance and defense rate',
    icon: '💨',
    gridSize: { rows: 6, cols: 10 },
    slots: [
      // Ignore Accuracy I (Level 1 requirement, 5 levels)
      {
        id: 'ignore-accuracy-i',
        name: 'Ignore Accuracy I',
        description: 'Increases chance to evade despite enemy accuracy',
        icon: '/images/stat icons/ignore_accuracy_icon.png',
        maxLevel: 5,
        gridPosition: { row: 0, col: 0 },
        pointsRequired: 3,
        values: [6, 12, 18, 24, 30],
        statType: 'ignoreAccuracy'
      },
      // Defense Rate I (Level 1 requirement, 5 levels)
      {
        id: 'defense-rate-i',
        name: 'Defense Rate I',
        description: 'Increases damage reduction',
        icon: '/images/stat icons/defense_rate_icon.png',
        maxLevel: 5,
        gridPosition: { row: 0, col: 1 },
        pointsRequired: 3,
        values: [30, 60, 90, 120, 150],
        statType: 'defenseRate'
      },
      // Ignore Accuracy II (Level 1 requirement, 10 levels)
      {
        id: 'ignore-accuracy-ii',
        name: 'Ignore Accuracy II',
        description: 'Increases chance to evade despite enemy accuracy',
        icon: '/images/stat icons/ignore_accuracy_icon.png',
        maxLevel: 10,
        gridPosition: { row: 1, col: 0 },
        pointsRequired: 5,
        values: [12, 24, 36, 48, 60, 72, 84, 96, 108, 120],
        statType: 'ignoreAccuracy'
      },
      // Defense Rate II (Level 1 requirement, 10 levels)
      {
        id: 'defense-rate-ii',
        name: 'Defense Rate II',
        description: 'Increases damage reduction',
        icon: '/images/stat icons/defense_rate_icon.png',
        maxLevel: 10,
        gridPosition: { row: 1, col: 1 },
        pointsRequired: 5,
        values: [40, 80, 120, 160, 200, 240, 280, 320, 360, 400],
        statType: 'defenseRate'
      },
      // Ignore Accuracy III (Level 7 requirement, 15 levels)
      {
        id: 'ignore-accuracy-iii',
        name: 'Ignore Accuracy III',
        description: 'Increases chance to evade despite enemy accuracy',
        icon: '/images/stat icons/ignore_accuracy_icon.png',
        maxLevel: 15,
        gridPosition: { row: 2, col: 0 },
        pointsRequired: 7,
        values: [18, 36, 54, 72, 90, 108, 126, 144, 162, 180, 198, 216, 234, 252, 270],
        statType: 'ignoreAccuracy'
      }
    ]
  }
];

// Maximum platinum merit points that can be spent
export const MAX_PLATINUM_MERIT_POINTS = 1000; // Placeholder value - adjust as needed