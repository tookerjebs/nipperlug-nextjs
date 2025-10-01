/**
 * Stats Configuration
 * Central configuration for stats shared across all systems
 */

import { getSpriteData } from '../utils/spriteIconUtils';

export interface StatInfo {
  name: string;
  category: 'offensive' | 'defensive' | 'utility';
  isPercentage: boolean;
  description: string;
  variants?: string[];
  icon?: string;
  spriteData?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface StatsConfig {
  baseStats: {
    criticalRate: number;
    maxCriticalRate: number;
    criticalDamage: number;
  };
  stats: Record<string, StatInfo>;
}

export const statsConfig: StatsConfig = {
  // Base stats that all characters have by default
  // These are universal constants that always apply to every character
  baseStats: {
    criticalRate: 5,        // Base critical rate is 5%
    maxCriticalRate: 50,    // Base max critical rate is 50%
    criticalDamage: 20      // Base critical damage is 20%
  },

  // Comprehensive stat definitions
  stats: {
    //======================================
    // OFFENSIVE STATS
    //======================================

    // Base attack stats
    attack: {
      name: "Attack",
      category: "offensive",
      isPercentage: false,
      description: "Increases damage of sword classes",
      variants: ["pvp", "pve"],
      icon: "/images/stat icons/attack_icon.png"
    },

    magicAttack: {
      name: "Magic Attack",
      category: "offensive",
      isPercentage: false,
      description: "Increases damage of magic classes",
      variants: ["pvp", "pve"],
      icon: "/images/stat icons/mattack_icon.png"
    },

    attackRate: {
      name: "Attack Rate",
      category: "offensive",
      isPercentage: false,
      description: "Reduces chance getting attacks blocked",
      variants: ["pvp", "pve"],
      icon: "/images/stat icons/attack_rate_icon.png"
    },

    criticalRate: {
      name: "Critical Rate",
      category: "offensive",
      isPercentage: true,
      description: "Increases chance of landing critical hits",
      variants: ["pvp", "pve"],
      icon: "/images/stat icons/critical_rate_icon.png"
    },

    maxCriticalRate: {
      name: "Max Crit. Rate",
      category: "offensive",
      isPercentage: true,
      description: "Maximum critical rate cap",
      variants: ["pvp", "pve"],
      icon: "/images/stat icons/max_crit_rate_icon.png"
    },

    criticalDamage: {
      name: "Critical DMG",
      category: "offensive",
      isPercentage: true,
      description: "Increases critical hit damage",
      variants: ["pvp", "pve"],
      icon: "/images/stat icons/critical_damage_icon.png"
    },

    swordSkillAmp: {
      name: "Sword Skill Amp.",
      category: "offensive",
      isPercentage: true,
      description: "Amplifies sword skill damage",
      variants: ["pvp", "pve"],
      icon: "/images/stat icons/sword_amp_icon.png"
    },

    magicSkillAmp: {
      name: "Magic Skill Amp.",
      category: "offensive",
      isPercentage: true,
      description: "Amplifies magic skill damage",
      variants: ["pvp", "pve"],
      icon: "/images/stat icons/magic_amp_icon.png"
    },

    accuracy: {
      name: "Accuracy",
      category: "offensive",
      isPercentage: false,
      description: "Reduces chance of attacks being evaded",
      variants: ["pvp", "pve"],
      icon: "/images/stat icons/accuracy_icon.png"
    },

    penetration: {
      name: "Penetration",
      category: "offensive",
      isPercentage: false,
      description: "Reduces effectiveness of enemy defense",
      variants: ["pvp", "pve"],
      icon: "/images/stat icons/penetration_icon.png"
    },

    addDamage: {
      name: "Add. Damage",
      category: "offensive",
      isPercentage: false,
      description: "Flat damage added to attacks",
      variants: ["pvp", "pve"],
      icon: "/images/stat icons/add_dmg_icon.png"
    },

    minDamage: {
      name: "Min Damage",
      category: "offensive",
      isPercentage: true,
      description: "Decreases damage variance",
      variants: ["pvp", "pve"],
      icon: "/images/stat icons/min_dmg_icon.png"
    },

    ignoreEvasion: {
      name: "Ignore Evasion",
      category: "offensive",
      isPercentage: false,
      description: "Reduces evasion of your target",
      variants: ["pvp", "pve"],
      icon: "/images/stat icons/ignore_evasion_icon.png"
    },

    finalDamageIncreased: {
      name: "Final DMG Increased",
      category: "offensive",
      isPercentage: true,
      description: "Finaly damage modifier, Increases final damage",
      variants: ["pvp", "pve"],
      icon: "/images/stat icons/final_dmg_increase_icon.png"
    },

    ignoreDamageReduction: {
      name: "Ignore DMG Reduction",
      category: "offensive",
      isPercentage: false,
      description: "Bypasses enemy damage reduction",
      variants: ["pvp", "pve"],
      icon: "/images/stat icons/ignore_damage_reduction_icon.png"
    },

    ignoreResistCriticalRate: {
      name: "Ignore Resist Critical Rate",
      category: "offensive",
      isPercentage: true,
      description: "Bypasses enemy Resist Critical Rate",
      variants: ["pvp", "pve"],
      icon: "/images/stat icons/ignore_resist_crit_rate_icon.png"
    },

    ignoreResistCriticalDamage: {
      name: "Ignore Resist Critical DMG",
      category: "offensive",
      isPercentage: true,
      description: "Bypasses enemy Resist Critical Damage",
      variants: ["pvp", "pve"],
      icon: "/images/stat icons/ignore_resist_crit_dmg_icon.png"
    },

    ignoreResistSkillAmp: {
      name: "Ignore Resist Skill Amp",
      category: "offensive",
      isPercentage: true,
      description: "Bypasses enemy Resist Skill Amp",
      variants: ["pvp", "pve"],
      icon: "/images/stat icons/ignore_resist_skill_amp_icon.png"
    },

    normalDamageUp: {
      name: "Normal DMG Up",
      category: "offensive",
      isPercentage: true,
      description: "Increases normal attack damage (non critical damage)",
      variants: ["pvp", "pve"],
      icon: "/images/stat icons/normal_dmg_icon.png"
    },

    cancelIgnorePenetration: {
      name: "Cancel Ignore Penetration",
      category: "offensive",
      isPercentage: false,
      description: "Reduces enemy Ignore Penetration",
      variants: ["pvp", "pve"],
      icon: "/images/stat icons/cancel_ignore_penetration_icon.png"
    },

    allAttackUp: {
      name: "All Attack Up",
      category: "offensive",
      isPercentage: false,
      description: "Increases Attack and Magic Attack by an equal ammount",
      variants: ["pvp", "pve"],
      icon: "/images/stat icons/all_atk_icon.png"
    },

    allSkillAmp: {
      name: "All Skill Amp.",
      category: "offensive",
      isPercentage: true,
      description: "Increases Magic & Sword Skill Amp by an equal ammount",
      variants: ["pvp", "pve"],
      icon: "/images/stat icons/all_amp_icon.png"
    },

    //======================================
    // DEFENSIVE STATS
    //======================================

    hp: {
      name: "HP",
      category: "defensive",
      isPercentage: false,
      description: "Total health points",
      icon: "/images/stat icons/hp_icon.png"
    },

    defense: {
      name: "Defense",
      category: "defensive",
      isPercentage: false,
      description: "Reduces damage taken by a certain percentage",
      variants: ["pvp", "pve"],
      icon: "/images/stat icons/defense_icon.png"
    },

    defenseRate: {
      name: "Defense Rate",
      category: "defensive",
      isPercentage: false,
      description: "Increases block chance",
      variants: ["pvp", "pve"],
      icon: "/images/stat icons/defense_rate_icon.png"
    },

    evasion: {
      name: "Evasion",
      category: "defensive",
      isPercentage: false,
      description: "Increases chance to evade attacks",
      variants: ["pvp", "pve"],
      icon: "/images/stat icons/evasion_icon.png"
    },

    resistCriticalRate: {
      name: "Resist Critical Rate",
      category: "defensive",
      isPercentage: true,
      description: "Reduces chance of receiving critical hits",
      icon: "/images/stat icons/resist_critical_rate_icon.png"
    },

    resistCriticalDamage: {
      name: "Resist Critical DMG",
      category: "defensive",
      isPercentage: true,
      description: "Reduces critical damage taken",
      icon: "/images/stat icons/resist_crit_dmg_icon.png"
    },

    resistSkillAmp: {
      name: "Resist Skill Amp",
      category: "defensive",
      isPercentage: true,
      description: "Reduces skill amplification of your attacker",
      variants: ["pvp", "pve"],
      icon: "/images/stat icons/resist_skill_amp_icon.png"
    },

    resistMagicSkillAmp: {
      name: "Resist Magic Skill Amp",
      category: "defensive",
      isPercentage: true,
      description: "Reduces magic skill amplification of your attacker",
      variants: ["pvp", "pve"],
      icon: "/images/stat icons/resist_skill_amp_icon.png" // Using general resist skill amp as placeholder
    },

    resistSwordSkillAmp: {
      name: "Resist Sword Skill Amp",
      category: "defensive",
      isPercentage: true,
      description: "Reduces sword skill amplification of your attacker",
      variants: ["pvp", "pve"],
      icon: "/images/stat icons/resist_skill_amp_icon.png" // Using general resist skill amp as placeholder
    },

    ignorePenetration: {
      name: "Ignore Penetration",
      category: "defensive",
      isPercentage: false,
      description: "Reduces Penetration of your attacker",
      variants: ["pvp", "pve"],
      icon: "/images/stat icons/ignore_penetration_icon.png"
    },

    ignoreAccuracy: {
      name: "Ignore Accuracy",
      category: "defensive",
      isPercentage: false,
      description: "Reduces Accuracy of your attacker",
      variants: ["pvp", "pve"],
      icon: "/images/stat icons/ignore_accuracy_icon.png"
    },

    damageReduction: {
      name: "DMG Reduction",
      category: "defensive",
      isPercentage: false,
      description: "Flat damage reduction",
      variants: ["pvp", "pve"],
      icon: "/images/stat icons/dmg_reduction_icon.png"
    },

    resistSuppression: {
      name: "Resist Suppression",
      category: "defensive",
      isPercentage: true,
      description: "Reduces chance of being suppressed",
      icon: "/images/stat icons/resist_suppression_icon.png"
    },

    resistSilence: {
      name: "Resist Silence",
      category: "defensive",
      isPercentage: true,
      description: "Reduces chance of being silenced",
      icon: "/images/stat icons/resist_silence_icon.png"
    },

    cancelIgnoreEvasion: {
      name: "Cancel Ignore Evasion",
      category: "defensive",
      isPercentage: false,
      description: "Reduces ignore evasion of your target",
      variants: ["pvp", "pve"],
      icon: "/images/stat icons/cancel_ignore_evasion_icon.png"
    },

    finalDamageDecreased: {
      name: "Final DMG Decreased",
      category: "defensive",
      isPercentage: true,
      description: "Decreases final damage",
      variants: ["pvp", "pve"],
      icon: "/images/stat icons/final_dmg_decrease_icon.png"
    },

    cancelIgnoreDamageReduction: {
      name: "Cancel Ignore Damage Reduction",
      category: "defensive",
      isPercentage: false,
      description: "Reduces enemy damage reduction",
      variants: ["pvp", "pve"],
      icon: "/images/stat icons/cancel_ignore_damage_reduction_icon.png"
    },

    //======================================
    // UTILITY STATS
    //======================================

    mp: {
      name: "MP",
      category: "utility",
      isPercentage: false,
      description: "Total mana points",
      icon: "/images/stat icons/mana_icon.png"
    },

    hpAbsorb: {
      name: "HP Absorb",
      category: "utility",
      isPercentage: true,
      description: "Percentage of your damage that can potentially become healing",
      icon: "/images/stat icons/hp_absorb_icon.png"
    },

    maxHpStealPerHit: {
      name: "Max HP Steal Per Hit",
      category: "utility",
      isPercentage: false,
      description: "Maximum healing possible per attack, per target",
      icon: "/images/stat icons/max_hp_absorb_icon.png"
    },

    mpAbsorb: {
      name: "MP Absorb",
      category: "utility",
      isPercentage: true,
      description: "Percentage of your damage that can potentially become healing",
      icon: "/images/stat icons/mp_absorb_icon.png"
    },

    maxMpStealPerHit: {
      name: "Max MP Steal Per Hit",
      category: "utility",
      isPercentage: false,
      description: "Maximum healing possible per attack, per target",
      icon: "/images/stat icons/max_mp_absorb_icon.png"
    },

    hpAutoHeal: {
      name: "HP Auto Heal",
      category: "utility",
      isPercentage: false,
      description: "HP regenerated over time",
      icon: "/images/stat icons/hp_auto_heal_icon.png"
    },

    mpAutoHeal: {
      name: "MP Auto Heal",
      category: "utility",
      isPercentage: false,
      description: "MP regenerated over time",
      icon: "/images/stat icons/mp_auto_heal_icon.png"
    },

    exp: {
      name: "EXP",
      category: "utility",
      isPercentage: true,
      description: "Increases experience gain",
      icon: "/images/stat icons/exp_icon.png"
    },

    skillExp: {
      name: "Skill EXP",
      category: "utility",
      isPercentage: true,
      description: "Increases skill experience gain",
      icon: "/images/stat icons/skill_exp_icon.png"
    },

    partyExp: {
      name: "Party EXP",
      category: "utility",
      isPercentage: true,
      description: "Increases party experience gain",
      icon: "/images/stat icons/party_exp_icon.png"
    },

    petExp: {
      name: "Pet EXP",
      category: "utility",
      isPercentage: true,
      description: "Increases pet experience gain",
      icon: "/images/stat icons/pet_exp_icon.png"
    },

    alzDropAmount: {
      name: "Alz Drop Amount",
      category: "utility",
      isPercentage: true,
      description: "Increases amount of Alz dropped",
      icon: "/images/stat icons/alz_drop_amount_icon.png"
    },

    alzDropRate: {
      name: "Alz Drop Rate",
      category: "utility",
      isPercentage: true,
      description: "Increases frequency of Alz drops",
      icon: "/images/stat icons/alz_drop_rate_icon.png"
    },

    alzBombChance: {
      name: "Alz Bomb Chance",
      category: "utility",
      isPercentage: true,
      description: "Increases frequency of Alz bombs",
      icon: "/images/stat icons/alz_bomb_chance_icon.png"
    },

    '2SlotDropRate': {
      name: "2-Slot Drop Rate",
      category: "utility",
      isPercentage: true,
      description: "Increases 2-slot item drop rate",
      icon: "/images/stat icons/2_slot_item_drop_icon.png"
    },

    resistUnableToMove: {
      name: "Resist Unable to Move",
      category: "utility",
      isPercentage: true,
      description: "Reduces chance of movement-impairing effects",
      icon: "/images/stat icons/resist_unable_move_icon.png"
    },

    resistDown: {
      name: "Resist Down",
      category: "utility",
      isPercentage: true,
      description: "Reduces chance of knockdown",
      icon: "/images/stat icons/resist_down_icon.png"
    },

    resistKnockback: {
      name: "Resist Knockback",
      category: "utility",
      isPercentage: true,
      description: "Reduces chance of being knocked back",
      icon: "/images/stat icons/resist_knock_back_icon.png"
    },

    resistStun: {
      name: "Resist Stun",
      category: "utility",
      isPercentage: true,
      description: "Reduces chance of being stunned",
      icon: "/images/stat icons/stun_resist_icon.png"
    },

    ignoreResistKnockback: {
      name: "Ignore Resist Knockback",
      category: "utility",
      isPercentage: true,
      description: "Bypasses enemy knockback resistance",
      icon: "/images/stat icons/ignore_resist_knockback_icon.png"
    },

    ignoreResistDown: {
      name: "Ignore Resist Down",
      category: "utility",
      isPercentage: true,
      description: "Bypasses enemy knockdown resistance",
      icon: "/images/stat icons/ignore_resist_down_icon.png"
    },

    ignoreResistStun: {
      name: "Ignore Resist Stun",
      category: "utility",
      isPercentage: true,
      description: "Bypasses enemy stun resistance",
      icon: "/images/stat icons/ignore_resist_stun_icon.png"
    },

    auraDurationIncrease: {
      name: "Aura Duration Increase",
      category: "utility",
      isPercentage: false,
      description: "Extends aura skill duration",
      icon: "/images/stat icons/aura_duration_increase_icon.png"
    },

    battleModeDurationIncrease: {
      name: "Battle Mode Duration Increase",
      category: "utility",
      isPercentage: false,
      description: "Extends battle mode duration",
      icon: "/images/stat icons/battle_mode_increase_icon.png"
    },

    honourPoint: {
      name: "Honour Point",
      category: "utility",
      isPercentage: false,
      description: "Increases honor point gain per kill"
    },

    movementSpeed: {
      name: "Movement Speed",
      category: "utility",
      isPercentage: false,
      description: "Increases character movement speed"
    },

    boostHpRestoration: {
      name: "Boost HP Restoration",
      category: "utility",
      isPercentage: false,
      description: "Increases the amount of HP restored by potions",
      icon: "/images/stat icons/boost_hp_restoration_icon.png"
    },

    // SPECIAL STATS; DERIVED STATS; THESE STATS SIMPLY INCREASE OTHER STATS
    str: {
      name: "STR",
      category: "offensive",
      isPercentage: false,
      description: "Increaes Strength",
      icon: "/images/stat icons/str_icon.png"
    },

    int: {
      name: "INT",
      category: "offensive",
      isPercentage: false,
      description: "Increases Intelligence",
      icon: "/images/stat icons/int_icon.png"
    },

    dex: {
      name: "DEX",
      category: "offensive",
      isPercentage: false,
      description: "Increases Dexterity",
      icon: "/images/stat icons/dex_icon.png"
    }
  }
};

// Helper functions
export function getStatInfo(statId: string): StatInfo | null {
  // Direct lookup first - for exact matches
  if (statsConfig.stats[statId]) {
    const stat = statsConfig.stats[statId];
    const spriteData = stat.icon ? getSpriteData(stat.icon) : null;
    return {
      ...stat,
      spriteData: spriteData || undefined
    };
  }
  
  // Check if this is a variant (like "pvpAttack")
  if (statId.startsWith('pvp') || statId.startsWith('pve')) {
    const prefix = statId.substring(0, 3);
    const baseStatId = statId.substring(3, 4).toLowerCase() + statId.substring(4);

    if (statsConfig.stats[baseStatId] &&
        statsConfig.stats[baseStatId].variants &&
        statsConfig.stats[baseStatId].variants.includes(prefix)) {

      const baseStat = statsConfig.stats[baseStatId];
      
      // Use base icon for variants (overlay will be added by StatIcon component)
      const baseIcon = baseStat.icon;

      // Return a new object with variant-specific properties but base icon
      const baseSpriteData = baseIcon ? getSpriteData(baseIcon) : null;
      return {
        name: `${prefix.toUpperCase()} ${baseStat.name}`,
        category: baseStat.category,
        isPercentage: baseStat.isPercentage,
        description: `${baseStat.description} against ${prefix === 'pvp' ? 'players' : 'monsters'}`,
        icon: baseIcon,
        spriteData: baseSpriteData || undefined
      };
    }
  }

  return null;
}

export function formatStatValue(statId: string, value: number): string {
  const stat = getStatInfo(statId);
  if (!stat) return value.toString();

  return stat.isPercentage ? value + '%' : value.toString();
}

export function getStatsByCategory(category: 'offensive' | 'defensive' | 'utility'): string[] {
  const result: string[] = [];

  // First add all base stats in this category
  for (const statId in statsConfig.stats) {
    if (statsConfig.stats[statId].category === category) {
      result.push(statId);

      // Then add any variants
      if (statsConfig.stats[statId].variants) {
        statsConfig.stats[statId].variants.forEach(variant => {
          result.push(variant + statId.charAt(0).toUpperCase() + statId.slice(1));
        });
      }
    }
  }

  return result;
}