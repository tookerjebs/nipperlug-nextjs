// Class-specific Passive Skills Data
import type { CharacterClass } from '../../class/types';
import type { ClassPassiveSkill } from '../types';

// Main passive skills data structure
export const CLASS_PASSIVE_SKILLS: Record<CharacterClass, ClassPassiveSkill[]> = {
  blader: [
    {
      id: 'concentration',
      name: 'Concentration',
      description: 'Increases attack rate',
      icon: '/images/classes/passives/concentration.png',
      stats: { attackRate: 400 },
      maxLevel: 1,
      levelStats: {
        attackRate: [400]
      }
    },
    {
      id: 'soul_blade',
      name: 'Soul Blade',
      description: 'Increases attack power',
      icon: '/images/classes/passives/soul_blade.png',
      stats: { attack: 120 },
      maxLevel: 1,
      levelStats: {
        attack: [120]
      }
    },
    {
      id: 'iron_skin',
      name: 'Iron Skin',
      description: 'Increases HP and defense',
      icon: '/images/classes/passives/iron_skin.png',
      stats: { hp: 100, defense: 60 },
      maxLevel: 1,
      levelStats: {
        hp: [100],
        defense: [60]
      }
    },
    {
      id: 'mirage_step',
      name: 'Mirage Step',
      description: 'Increases defense rate and evasion',
      icon: '/images/classes/passives/mirage_step.png',
      stats: { defenseRate: 595, evasion: 500 },
      maxLevel: 1,
      levelStats: {
        defenseRate: [595],
        evasion: [500]
      }
    },
    {
      id: 'aura_barrier',
      name: 'Aura Barrier',
      description: 'Increases HP and defense',
      icon: '/images/classes/passives/aura_barrier.png',
      stats: { hp: 200, defense: 110 },
      maxLevel: 1,
      levelStats: {
        hp: [200],
        defense: [110]
      }
    },
    {
      id: 'blader_mastery',
      name: 'Blader Mastery',
      description: 'Increases HP and provides PvP resistance',
      icon: '/images/classes/passives/blader_mastery.png',
      stats: { hp: 160, pvpResistMagicSkillAmp: 2, pvpResistSwordSkillAmp: 7 },
      maxLevel: 1,
      levelStats: {
        hp: [160],
        pvpResistMagicSkillAmp: [2],
        pvpResistSwordSkillAmp: [7]
      }
    }
  ],
  wizard: [
    {
      id: 'magic_control',
      name: 'Magic Control',
      description: '',
      icon: '/images/classes/passives/magic_control.png',
      stats: { magicAttack: 210 }, // Max level stats
      maxLevel: 20,
      levelStats: {
        // Magic Control: starts at 58, max at 210 (level 20)
        // Linear progression: (210 - 58) / 19 = 8 per level after level 1
        magicAttack: [
          58, 66, 74, 82, 90, 98, 106, 114, 122, 130,  // levels 1-10
          138, 146, 154, 162, 170, 178, 186, 194, 202, 210  // levels 11-20
        ]
      }
    },
    {
      id: 'piercing_spell',
      name: 'Piercing Spell',
      description: '',
      icon: '/images/classes/passives/piercing_spell.png',
      stats: { penetration: 80 }, // Max level stats
      maxLevel: 20,
      levelStats: {
        // Piercing Spell: starts at 23, max at 80 (level 20)
        // Linear progression: (80 - 23) / 19 = 3 per level after level 1
        penetration: [
          23, 26, 29, 32, 35, 38, 41, 44, 47, 50,  // levels 1-10
          53, 56, 59, 62, 65, 68, 71, 74, 77, 80   // levels 11-20
        ]
      }
    },
    {
      id: 'focus',
      name: 'Focus',
      description: '',
      icon: '/images/classes/passives/focus.png',
      stats: { attackRate: 400, defenseRate: 300, pveDamageReduction: 10 }, // Max level stats
      maxLevel: 20,
      levelStats: {
        // Focus: Linear scaling to max values at level 20
        // Attack Rate: 400 / 20 = 20 per level
        attackRate: [
          20, 40, 60, 80, 100, 120, 140, 160, 180, 200,  // levels 1-10
          220, 240, 260, 280, 300, 320, 340, 360, 380, 400  // levels 11-20
        ],
        // Defense Rate: 300 / 20 = 15 per level
        defenseRate: [
          15, 30, 45, 60, 75, 90, 105, 120, 135, 150,  // levels 1-10
          165, 180, 195, 210, 225, 240, 255, 270, 285, 300  // levels 11-20
        ],
        // PvE Damage Reduce: 10 / 20 = 0.5 per level
        pveDamageReduction: [
          0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5,  // levels 1-10
          5.5, 6, 6.5, 7, 7.5, 8, 8.5, 9, 9.5, 10  // levels 11-20
        ]
      }
    },
    {
      id: 'wizard_mastery',
      name: 'Wizard Mastery',
      description: '',
      icon: '/images/classes/passives/wizard_mastery.png',
      stats: { hp: 70, pvpResistMagicSkillAmp: 9, pvpResistSwordSkillAmp: 2 }, // Only level 1
      maxLevel: 1,
      levelStats: {
        hp: [70],
        pvpResistMagicSkillAmp: [9],
        pvpResistSwordSkillAmp: [2]
      }
    }
  ],
  warrior: [
    {
      id: 'piercing_shield',
      name: 'Piercing Shield',
      description: 'Increases ignore penetration',
      icon: '/images/classes/passives/piercing_shield.png',
      stats: { ignorePenetration: 60 },
      maxLevel: 1,
      levelStats: {
        ignorePenetration: [60]
      }
    },
    {
      id: 'concentration',
      name: 'Concentration',
      description: 'Increases attack rate',
      icon: '/images/classes/passives/concentration.png',
      stats: { attackRate: 400 },
      maxLevel: 1,
      levelStats: {
        attackRate: [400]
      }
    },
    {
      id: 'soul_blade',
      name: 'Soul Blade',
      description: 'Increases attack power',
      icon: '/images/classes/passives/soul_blade.png',
      stats: { attack: 120 },
      maxLevel: 1,
      levelStats: {
        attack: [120]
      }
    },
    {
      id: 'iron_skin',
      name: 'Iron Skin',
      description: 'Increases HP and defense',
      icon: '/images/classes/passives/iron_skin.png',
      stats: { hp: 100, defense: 60 },
      maxLevel: 1,
      levelStats: {
        hp: [100],
        defense: [60]
      }
    },
    {
      id: 'down_breaker',
      name: 'Down Breaker',
      description: 'Increases attack and down effect',
      icon: '/images/classes/passives/down_breaker.png',
      stats: { attack: 60, 'down': 30 }, // 'down' is a custom stat not in stats config
      maxLevel: 1,
      levelStats: {
        attack: [60],
        'down': [30]
      }
    },
    {
      id: 'aura_barrier',
      name: 'Aura Barrier',
      description: 'Increases HP and defense',
      icon: '/images/classes/passives/aura_barrier.png',
      stats: { hp: 200, defense: 110 },
      maxLevel: 1,
      levelStats: {
        hp: [200],
        defense: [110]
      }
    },
    {
      id: 'warrior_mastery',
      name: 'Warrior Mastery',
      description: 'Increases HP and provides PvP resistance',
      icon: '/images/classes/passives/warrior_mastery.png',
      stats: { hp: 200, pvpResistMagicSkillAmp: 5, pvpResistSwordSkillAmp: 10 },
      maxLevel: 1,
      levelStats: {
        hp: [200],
        pvpResistMagicSkillAmp: [5],
        pvpResistSwordSkillAmp: [10]
      }
    }
  ],
  gladiator: [
    {
      id: 'piercing_shield',
      name: 'Piercing Shield',
      description: 'Increases ignore penetration',
      icon: '/images/classes/passives/piercing_shield.png',
      stats: { ignorePenetration: 60 },
      maxLevel: 1,
      levelStats: {
        ignorePenetration: [60]
      }
    },
    {
      id: 'mortal_combat',
      name: 'Mortal Combat',
      description: 'Increases attack, attack rate, and defense rate',
      icon: '/images/classes/passives/mortal_combat.png',
      stats: { attack: 40, attackRate: 700, defenseRate: 350 },
      maxLevel: 1,
      levelStats: {
        attack: [40],
        attackRate: [700],
        defenseRate: [350]
      }
    },
    {
      id: 'aegis',
      name: 'Aegis',
      description: 'Increases HP, defense, and damage reduction',
      icon: '/images/classes/passives/aegis.png',
      stats: { hp: 250, defense: 165, damageReduction: 40 },
      maxLevel: 1,
      levelStats: {
        hp: [250],
        defense: [165],
        damageReduction: [40]
      }
    },
    {
      id: 'battle_fury',
      name: 'Battle Fury',
      description: 'Increases attack power',
      icon: '/images/classes/passives/battle_fury.png',
      stats: { attack: 170 },
      maxLevel: 1,
      levelStats: {
        attack: [170]
      }
    },
    {
      id: 'gladiator_mastery',
      name: 'Gladiator Mastery',
      description: 'Increases HP and provides PvP resistance',
      icon: '/images/classes/passives/gladiator_mastery.png',
      stats: { hp: 170, pvpResistMagicSkillAmp: 5, pvpResistSwordSkillAmp: 10 },
      maxLevel: 1,
      levelStats: {
        hp: [170],
        pvpResistMagicSkillAmp: [5],
        pvpResistSwordSkillAmp: [10]
      }
    }
  ],
  dark_mage: [
    {
      id: 'force_overload',
      name: 'Force Overload',
      description: 'Increases magic skill amplification',
      icon: '/images/classes/passives/force_overload.png',
      stats: { magicSkillAmp: 15 },
      maxLevel: 1,
      levelStats: {
        magicSkillAmp: [15]
      }
    },
    {
      id: 'circle_crafting',
      name: 'Circle Crafting',
      description: 'Increases attack rate and defense rate',
      icon: '/images/classes/passives/circle_crafting.png',
      stats: { attackRate: 300, defenseRate: 400 },
      maxLevel: 1,
      levelStats: {
        attackRate: [300],
        defenseRate: [400]
      }
    },
    {
      id: 'amplify',
      name: 'Amplify',
      description: 'Increases magic attack power',
      icon: '/images/classes/passives/amplify.png',
      stats: { magicAttack: 200 },
      maxLevel: 1,
      levelStats: {
        magicAttack: [200]
      }
    },
    {
      id: 'dark_mage_mastery',
      name: 'Dark Mage Mastery',
      description: 'Increases HP and provides PvP resistance',
      icon: '/images/classes/passives/dark_mage_mastery.png',
      stats: { hp: 120, pvpResistMagicSkillAmp: 11, pvpResistSwordSkillAmp: 4 },
      maxLevel: 1,
      levelStats: {
        hp: [120],
        pvpResistMagicSkillAmp: [11],
        pvpResistSwordSkillAmp: [4]
      }
    }
  ],
  force_archer: [
    {
      id: 'eagle_eye',
      name: 'Eagle Eye',
      description: 'Enhances attack rate, accuracy, and attack range',
      icon: '/images/classes/passives/eagle_eye.png',
      stats: { attackRate: 1000, accuracy: 300, 'range': 1 }, // 'range' is a custom stat not in stats config
      maxLevel: 1,
      levelStats: {
        attackRate: [1000],
        accuracy: [300],
        'range': [1]
      }
    },
    {
      id: 'thrusting_arrow',
      name: 'Thrusting Arrow',
      description: 'Increases critical damage and knock back power',
      icon: '/images/classes/passives/thrusting_arrow.png',
      stats: { criticalDamage: 10, 'knockBack': 30 }, // 'knockBack' is a custom stat not in stats config
      maxLevel: 1,
      levelStats: {
        criticalDamage: [10],
        'knockBack': [30]
      }
    },
    {
      id: 'art_of_healing',
      name: 'Art of Healing',
      description: 'Enhances healing effectiveness',
      icon: '/images/classes/passives/art_of_healing.png',
      stats: { 'increasedHeal': 110 }, // 'increasedHeal' is a custom stat not in stats config
      maxLevel: 1,
      levelStats: {
        'increasedHeal': [110]
      }
    }
  ],
  force_gunner: [
    {
      id: 'force_gunner_mastery',
      name: 'Force Gunner Mastery',
      description: 'Increases HP and provides PvP resistance',
      icon: '/images/classes/passives/force_gunner_mastery.png',
      stats: { hp: 90, pvpResistMagicSkillAmp: 9, pvpResistSwordSkillAmp: 2 }, // Only level 1
      maxLevel: 1,
      levelStats: {
        hp: [90],
        pvpResistMagicSkillAmp: [9],
        pvpResistSwordSkillAmp: [2]
      }
    },
    {
      id: 'warfare_matrix',
      name: 'Warfare Matrix',
      description: 'Enhances critical damage, critical rate, and PvE defense',
      icon: '/images/classes/passives/warfare_matrix.png',
      stats: { criticalDamage: 20, criticalRate: 12, pveDefense: 12 }, // Only level 1
      maxLevel: 1,
      levelStats: {
        criticalDamage: [20],
        criticalRate: [12],
        pveDefense: [12]
      }
    },
    {
      id: 'target_focus',
      name: 'Target Focus',
      description: 'Improves attack rate, critical damage, and accuracy',
      icon: '/images/classes/passives/target_focus.png',
      stats: { attackRate: 200, criticalDamage: 5, accuracy: 500 }, // Only level 1
      maxLevel: 1,
      levelStats: {
        attackRate: [200],
        criticalDamage: [5],
        accuracy: [500]
      }
    },
    {
      id: 'sniper_plan',
      name: 'Sniper Plan',
      description: 'Significantly enhances attack rate, critical damage, and accuracy',
      icon: '/images/classes/passives/sniper_plan.png',
      stats: { attackRate: 400, criticalDamage: 10, accuracy: 600 }, // Only level 1
      maxLevel: 1,
      levelStats: {
        attackRate: [400],
        criticalDamage: [10],
        accuracy: [600]
      }
    }
  ],
  force_blader: [
    {
      id: 'earth_guard',
      name: 'Earth Guard',
      description: 'Increases defense',
      icon: '/images/classes/passives/earth_guard.png',
      stats: { defense: 90 }, // Only level 1
      maxLevel: 1,
      levelStats: {
        defense: [90]
      }
    },
    {
      id: 'wind_movement',
      name: 'Wind Movement',
      description: 'Enhances attack rate and defense rate',
      icon: '/images/classes/passives/wind_movement.png',
      stats: { attackRate: 780, defenseRate: 400 }, // Only level 1
      maxLevel: 1,
      levelStats: {
        attackRate: [780],
        defenseRate: [400]
      }
    },
    {
      id: 'aqua_vitality',
      name: 'Aqua Vitality',
      description: 'Increases HP, MP, and provides auto healing',
      icon: '/images/classes/passives/aqua_vitality.png',
      stats: { hp: 200, mp: 200, hpAutoHeal: 6, mpAutoHeal: 6 }, // Only level 1
      maxLevel: 1,
      levelStats: {
        hp: [200],
        mp: [200],
        hpAutoHeal: [6],
        mpAutoHeal: [6]
      }
    },
    {
      id: 'force_blader_mastery',
      name: 'Force Blader Mastery',
      description: 'Increases HP and provides PvP resistance',
      icon: '/images/classes/passives/force_blader_mastery.png',
      stats: { hp: 150, pvpResistMagicSkillAmp: 4, pvpResistSwordSkillAmp: 8 }, // Only level 1
      maxLevel: 1,
      levelStats: {
        hp: [150],
        pvpResistMagicSkillAmp: [4],
        pvpResistSwordSkillAmp: [8]
      }
    }
  ],
  force_shielder: [
    {
      id: 'shield_harden',
      name: 'Shield Harden',
      description: 'Increases defense, ignore penetration, and damage reduction',
      icon: '/images/classes/passives/shield_harden.png',
      stats: { defense: 210, ignorePenetration: 30, damageReduction: 30 },
      maxLevel: 1,
      levelStats: {
        defense: [210],
        ignorePenetration: [30],
        damageReduction: [30]
      }
    },
    {
      id: 'crushing_blade',
      name: 'Crushing Blade',
      description: 'Increases critical damage and critical rate',
      icon: '/images/classes/passives/crushing_blade.png',
      stats: { criticalDamage: 60, criticalRate: 24 },
      maxLevel: 1,
      levelStats: {
        criticalDamage: [60],
        criticalRate: [24]
      }
    },
    {
      id: 'force_shield_mastery',
      name: 'Force Shield Mastery',
      description: 'Increases HP and provides PvP resistance',
      icon: '/images/classes/passives/force_shield_mastery.png',
      stats: { hp: 180, pvpResistMagicSkillAmp: 7, pvpResistSwordSkillAmp: 12 },
      maxLevel: 1,
      levelStats: {
        hp: [180],
        pvpResistMagicSkillAmp: [7],
        pvpResistSwordSkillAmp: [12]
      }
    },
    {
      id: 'piercing_shield',
      name: 'Piercing Shield',
      description: 'Increases ignore penetration',
      icon: '/images/classes/passives/piercing_shield.png',
      stats: { ignorePenetration: 60 },
      maxLevel: 1,
      levelStats: {
        ignorePenetration: [60]
      }
    }
  ]
};

// Helper function to get passive skills for a class
export function getPassiveSkillsForClass(classId: CharacterClass): ClassPassiveSkill[] {
  return CLASS_PASSIVE_SKILLS[classId] || [];
}

// Helper function to calculate stats for a passive skill at a specific level
export function calculatePassiveSkillStats(skill: ClassPassiveSkill, level: number): Record<string, number> {
  if (level <= 0 || level > skill.maxLevel) {
    return {};
  }

  const stats: Record<string, number> = {};
  
  if (skill.levelStats) {
    Object.entries(skill.levelStats).forEach(([statId, values]) => {
      if (values[level - 1] !== undefined) {
        stats[statId] = values[level - 1];
      }
    });
  }

  return stats;
}