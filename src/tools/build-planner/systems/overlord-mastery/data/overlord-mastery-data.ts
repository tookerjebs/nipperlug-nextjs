import { OverlordCategory } from '../types/index';

// Overlord Mastery Data
export const OverlordMasteryData: {
  categories: OverlordCategory[];
  maxOpPoints: number;
  defaultOpPoints: number;
} = {
  maxOpPoints: 1000, // Maximum OP points available
  defaultOpPoints: 500, // Default OP points for new builds
  
  categories: [
    {
      id: 'attack',
      name: 'Attack',
      description: 'Offensive skills that enhance your combat prowess',
      icon: '/images/overlord/attack_category.png',
      gridSize: { rows: 4, cols: 4 },
      skills: [
        // Column 1: All Attack skills
        {
          id: 'allAttackI',
          name: 'All Attack I',
          description: 'Increases all attack power',
          icon: '/images/overlord/all_attack.png',
          maxLevel: 5,
          gridPosition: { row: 0, col: 0 },
          opRequired: 1,
          values: [2, 4, 6, 8, 10],
          statType: 'allAttackUp'
        },
        {
          id: 'allAttackII',
          name: 'All Attack II',
          description: 'Increases all attack power',
          icon: '/images/overlord/all_attack.png',
          maxLevel: 5,
          gridPosition: { row: 1, col: 0 },
          opRequired: 2,
          values: [3, 6, 9, 12, 15],
          statType: 'allAttackUp'
        },
        {
          id: 'allAttackIII',
          name: 'All Attack III',
          description: 'Increases all attack power',
          icon: '/images/overlord/all_attack.png',
          maxLevel: 5,
          gridPosition: { row: 3, col: 0 },
          opRequired: 3,
          values: [4, 8, 12, 16, 20],
          statType: 'allAttackUp'
        },

        // Column 2: Critical DMG and Ignore Resist Crit Rate
        {
          id: 'critDmgI',
          name: 'Critical DMG I',
          description: 'Increases critical hit damage',
          icon: '/images/overlord/critical_damage.png',
          maxLevel: 5,
          gridPosition: { row: 0, col: 1 },
          opRequired: 2,
          values: [1, 2, 3, 4, 5],
          statType: 'criticalDamage'
        },
        {
          id: 'critDmgII',
          name: 'Critical DMG II',
          description: 'Increases critical hit damage',
          icon: '/images/overlord/critical_damage.png',
          maxLevel: 3,
          gridPosition: { row: 1, col: 1 },
          opRequired: 3,
          values: [2, 4, 6],
          statType: 'criticalDamage'
        },
        {
          id: 'ignoreResistCriticalRate',
          name: 'Ignore Resist Critical Rate',
          description: 'Bypasses enemy critical rate resistance',
          icon: '/images/overlord/ignore_resist_crit_rate.png',
          maxLevel: 5,
          gridPosition: { row: 2, col: 1 },
          opRequired: 4,
          values: [1, 2, 3, 4, 5],
          statType: 'ignoreResistCriticalRate'
        },

        // Column 3: Attack Rate and Accuracy
        {
          id: 'attackRateI',
          name: 'Attack Rate I',
          description: 'Increases attack speed',
          icon: '/images/overlord/attack_rate.png',
          maxLevel: 5,
          gridPosition: { row: 0, col: 2 },
          opRequired: 1,
          values: [20, 40, 60, 80, 100],
          statType: 'attackRate'
        },
        {
          id: 'accuracyI',
          name: 'Accuracy I',
          description: 'Increases hit accuracy',
          icon: '/images/overlord/accuracy.png',
          maxLevel: 5,
          gridPosition: { row: 1, col: 2 },
          opRequired: 1,
          values: [40, 60, 80, 100, 120],
          statType: 'accuracy'
        },
        {
          id: 'attackRateII',
          name: 'Attack Rate II',
          description: 'Increases attack speed',
          icon: '/images/overlord/attack_rate.png',
          maxLevel: 5,
          gridPosition: { row: 2, col: 2 },
          opRequired: 2,
          values: [30, 60, 90, 120, 150],
          statType: 'attackRate'
        },
        {
          id: 'accuracyII',
          name: 'Accuracy II',
          description: 'Increases hit accuracy',
          icon: '/images/overlord/accuracy.png',
          maxLevel: 5,
          gridPosition: { row: 3, col: 2 },
          opRequired: 5,
          values: [50, 70, 90, 110, 130],
          statType: 'accuracy'
        },

        // Column 4: Add DMG and Penetration
        {
          id: 'addDmgI',
          name: 'Add. DMG I',
          description: 'Flat damage added to attacks',
          icon: '/images/overlord/add_damage.png',
          maxLevel: 5,
          gridPosition: { row: 0, col: 3 },
          opRequired: 1,
          values: [2, 4, 6, 8, 10],
          statType: 'addDamage'
        },
        {
          id: 'penetrationI',
          name: 'Penetration I',
          description: 'Bypasses a portion of enemy defense',
          icon: '/images/overlord/penetration.png',
          maxLevel: 5,
          gridPosition: { row: 1, col: 3 },
          opRequired: 2,
          values: [2, 4, 6, 8, 10],
          statType: 'penetration'
        },
        {
          id: 'addDmgII',
          name: 'Add. DMG II',
          description: 'Flat damage added to attacks',
          icon: '/images/overlord/add_damage.png',
          maxLevel: 5,
          gridPosition: { row: 2, col: 3 },
          opRequired: 5,
          values: [3, 6, 9, 12, 15],
          statType: 'addDamage'
        },
        {
          id: 'penetrationII',
          name: 'Penetration II',
          description: 'Bypasses a portion of enemy defense',
          icon: '/images/overlord/penetration.png',
          maxLevel: 3,
          gridPosition: { row: 3, col: 3 },
          opRequired: 10,
          values: [3, 6, 9],
          statType: 'penetration'
        }
      ]
    },
    {
      id: 'defense',
      name: 'Defense',
      description: 'Defensive skills that enhance your survivability',
      icon: '/images/overlord/defense_category.png',
      gridSize: { rows: 4, cols: 4 },
      skills: [
        // Column 1: Defense skills
        {
          id: 'defenseI',
          name: 'Defense I',
          description: 'Increases defense rating',
          icon: '/images/overlord/defense.png',
          maxLevel: 5,
          gridPosition: { row: 0, col: 0 },
          opRequired: 1,
          values: [3, 6, 9, 12, 15],
          statType: 'defense'
        },
        {
          id: 'dmgReduction',
          name: 'DMG Reduction',
          description: 'Reduces all damage taken',
          icon: '/images/overlord/damage_reduction.png',
          maxLevel: 5,
          gridPosition: { row: 1, col: 0 },
          opRequired: 2,
          values: [5, 10, 15, 20, 25],
          statType: 'damageReduction'
        },
        {
          id: 'defenseII',
          name: 'Defense II',
          description: 'Increases defense rating',
          icon: '/images/overlord/defense.png',
          maxLevel: 5,
          gridPosition: { row: 3, col: 0 },
          opRequired: 3,
          values: [15, 20, 25, 30, 35],
          statType: 'defense'
        },

        // Column 2: HP and Resist Critical DMG
        {
          id: 'hpUpI',
          name: 'HP UP I',
          description: 'Increases maximum health points',
          icon: '/images/overlord/hp.png',
          maxLevel: 5,
          gridPosition: { row: 0, col: 1 },
          opRequired: 1,
          values: [20, 40, 60, 80, 100],
          statType: 'hp'
        },
        {
          id: 'resistCriticalDamage',
          name: 'Resist Critical DMG',
          description: 'Reduces critical damage taken',
          icon: '/images/overlord/resist_crit_dmg.png',
          maxLevel: 5,
          gridPosition: { row: 1, col: 1 },
          opRequired: 2,
          values: [4, 8, 12, 16, 20],
          statType: 'resistCriticalDamage'
        },
        {
          id: 'hpUpII',
          name: 'HP UP II',
          description: 'Increases maximum health points',
          icon: '/images/overlord/hp.png',
          maxLevel: 5,
          gridPosition: { row: 2, col: 1 },
          opRequired: 3,
          values: [20, 40, 60, 80, 100],
          statType: 'hp'
        },

        // Column 3: Resist skills
        {
          id: 'resistKnockback',
          name: 'Resist Knockback',
          description: 'Reduces chance of being knocked back',
          icon: '/images/overlord/resist_knockback.png',
          maxLevel: 5,
          gridPosition: { row: 0, col: 2 },
          opRequired: 1,
          values: [2, 4, 6, 8, 10],
          statType: 'resistKnockback'
        },
        {
          id: 'resistDown',
          name: 'Resist Down',
          description: 'Reduces chance of knockdown',
          icon: '/images/overlord/resist_down.png',
          maxLevel: 5,
          gridPosition: { row: 1, col: 2 },
          opRequired: 2,
          values: [2, 4, 6, 8, 10],
          statType: 'resistDown'
        },
        {
          id: 'resistStun',
          name: 'Resist Stun',
          description: 'Reduces chance of being stunned',
          icon: '/images/overlord/resist_stun.png',
          maxLevel: 5,
          gridPosition: { row: 2, col: 2 },
          opRequired: 3,
          values: [2, 4, 6, 8, 10],
          statType: 'resistStun'
        },
        {
          id: 'resistSkillAmp',
          name: 'Resist Skill Amp.',
          description: 'Reduces skill damage taken',
          icon: '/images/overlord/resist_skill_amp.png',
          maxLevel: 5,
          gridPosition: { row: 3, col: 2 },
          opRequired: 5,
          values: [3, 6, 9, 12, 15],
          statType: 'resistSkillAmp'
        },

        // Column 4: Ignore Accuracy and Ignore Penetration
        {
          id: 'ignoreAccuracyI',
          name: 'Ignore Accuracy I',
          description: 'Increases chance to evade despite enemy accuracy',
          icon: '/images/overlord/ignore_accuracy.png',
          maxLevel: 5,
          gridPosition: { row: 0, col: 3 },
          opRequired: 1,
          values: [40, 60, 80, 100, 120],
          statType: 'ignoreAccuracy'
        },
        {
          id: 'ignorePenetrationI',
          name: 'Ignore Penetration I',
          description: 'Reduces enemy penetration',
          icon: '/images/overlord/ignore_penetration.png',
          maxLevel: 5,
          gridPosition: { row: 1, col: 3 },
          opRequired: 3,
          values: [5, 10, 15, 20, 25],
          statType: 'ignorePenetration'
        },
        {
          id: 'ignoreAccuracyII',
          name: 'Ignore Accuracy II',
          description: 'Increases chance to evade despite enemy accuracy',
          icon: '/images/overlord/ignore_accuracy.png',
          maxLevel: 5,
          gridPosition: { row: 2, col: 3 },
          opRequired: 5,
          values: [50, 70, 90, 110, 130],
          statType: 'ignoreAccuracy'
        },
        {
          id: 'ignorePenetrationII',
          name: 'Ignore Penetration II',
          description: 'Reduces enemy penetration',
          icon: '/images/overlord/ignore_penetration.png',
          maxLevel: 3,
          gridPosition: { row: 3, col: 3 },
          opRequired: 10,
          values: [5, 10, 15],
          statType: 'ignorePenetration'
        }
      ]
    }
  ]
};

// Helper function to get all skills from all categories
export const getAllOverlordSkills = (): Record<string, any> => {
  const skills: Record<string, any> = {};
  
  OverlordMasteryData.categories.forEach(category => {
    category.skills.forEach(skill => {
      skills[skill.id] = skill;
    });
  });
  
  return skills;
};

// Helper function to get skills by category
export const getSkillsByCategory = (categoryId: string) => {
  const category = OverlordMasteryData.categories.find(cat => cat.id === categoryId);
  return category?.skills || [];
};

// Helper function to get category by ID
export const getCategoryById = (categoryId: string) => {
  return OverlordMasteryData.categories.find(cat => cat.id === categoryId);
};