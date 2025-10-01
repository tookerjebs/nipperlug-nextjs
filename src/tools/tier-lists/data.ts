import { TierListData } from './types';

export const tierListsData: Record<string, TierListData> = {
  'single-target': {
    id: 'single-target',
    title: 'Single Target DPS Tier List',
    description: 'Classes ranked by their best single-target damage. Blader, Force Archer, and Dark Mage use Battle Mode 2 (BM2) for highest damage. Other classes use Battle Mode 3 (BM3). Click on each row to expand for more information.',
    tiers: [
      {
        tier: 'S',
        label: 'S',
        classes: [
          {
            name: 'Blader',
            slug: 'blader',
            icon: '/images/classes/blader_icon.png',
            description: 'Blader (BM2): Top single-target damage with Battle Mode 2. High defense, evasion + great life steal from fast claw attacks. Offers best survivability. Was by far the best DPS class until Dark Mage was added in EP28.'
          },
          {
            name: 'Dark Mage',
            slug: 'dark-mager',
            icon: '/images/classes/dark_mage_icon.png',
            description: 'Dark Mage (BM2): Newest class with Battle Mode 2 damage that matches or beats Blader. Good survivability from fast attacks with life steal and passive HP regen from Battle Mode.'
          }
        ]
      },
      {
        tier: 'A+',
        label: 'A+',
        classes: [
          {
            name: 'Force Archer',
            slug: 'force-archer',
            icon: '/images/classes/force_archer_icon.png',
            description: 'Force Archer (BM2): Great dual gun animations in Battle Mode 2. Similar damage to Force Gunner BM3 (against single targets).'
          },
          {
            name: 'Force Gunner',
            slug: 'force-gunner',
            icon: '/images/classes/force_gunner_icon.png',
            description: 'Force Gunner (BM3): Fastest attack speed among all BM3 classes with strong damage. Gets +30% bonus damage against single targets.'
          }
        ]
      },
      {
        tier: 'A',
        label: 'A',
        classes: [
          {
            name: 'Wizard',
            slug: 'wizard',
            icon: '/images/classes/wizard_icon.png',
            description: 'Wizard (BM3): Has higher base damage than Force Gunner but gets no damage bonus against single targets, also attacks are slightly slower compared to Force Gunner. Overall about 5-10% less DPS than A+ tier.'
          }
        ]
      },
      {
        tier: 'B',
        label: 'B',
        classes: [
          {
            name: 'Warrior',
            slug: 'warrior',
            icon: '/images/classes/warrior_icon.png',
            description: 'Warrior (BM3): Good damage for early and mid-game with decent AoE. Gets +10% damage bonus with fewer targets. Slower attack speed limits DPS.'
          },
          {
            name: 'Gladiator',
            slug: 'gladiator',
            icon: '/images/classes/gladiator_icon.png',
            description: 'Gladiator (BM2/BM3): Less popular class. Tests show BM2 is better than BM3 in late game.'
          },
          {
            name: 'Force Blader',
            slug: 'force-blader',
            icon: '/images/classes/force_blader_icon.png',
            description: 'Force Blader (BM3): Useful debuffs for end-game parties but average DPS. Gets +12% damage bonus with fewer targets.'
          }
        ]
      },
      {
        tier: 'C',
        label: 'C',
        classes: [
          {
            name: 'Force Shielder',
            slug: 'force-shielder',
            icon: '/images/classes/force_shielder_icon.png',
            description: 'Force Shielder: Best defense and aggro control but lowest damage of all classes. Gets +10% damage bonus with fewer targets. Can clear all dungeons but farms about 20% slower than other classes.'
          }
        ]
      }
    ]
  },
  'aoe': {
    id: 'aoe',
    title: 'AoE Damage Tier List',
    description: 'Classes ranked by AoE damage and area coverage. Most classes lose their 20% single-target bonus when hitting multiple enemies. BM2 classes like Blader and Dark Mage can only hit 1-2 targets. Click on each row to expand for more information.',
    tiers: [
      {
        tier: 'S',
        label: 'S',
        classes: [
          {
            name: 'Wizard',
            slug: 'wizard',
            icon: '/images/classes/wizard_icon.png',
            description: 'Wizard: Best AoE class with high damage, great area coverage, and no damage penalty when hitting multiple targets.'
          }
        ]
      },
      {
        tier: 'A',
        label: 'A',
        classes: [
          {
            name: 'Force Gunner',
            slug: 'force-gunner',
            icon: '/images/classes/force_gunner_icon.png',
            description: 'Force Gunner (BM3): Loses +30% single-target bonus in AoE but still very effective with fast attacks, good range, and strong base damage.'
          }
        ]
      },
      {
        tier: 'B',
        label: 'B',
        classes: [
          {
            name: 'Warrior',
            slug: 'warrior',
            icon: '/images/classes/warrior_icon.png',
            description: 'Warrior (BM3): Good damage and AoE but slower attack speed hurts area clearing.'
          },
          {
            name: 'Force Blader',
            slug: 'force-blader',
            icon: '/images/classes/force_blader_icon.png',
            description: 'Force Blader (BM3): Balanced AoE with consistent damage for multi-target fights.'
          },
          {
            name: 'Force Archer',
            slug: 'force-archer',
            icon: '/images/classes/force_archer_icon.png',
            description: 'Force Archer (BM3): Balanced AoE with consistent damage for multi-target fights.'
          }
        ]
      },
      {
        tier: 'C',
        label: 'C',
        classes: [
          {
            name: 'Blader',
            slug: 'blader',
            icon: '/images/classes/blader_icon.png',
            description: 'Blader & Gladiator (BM3): Similar damage to B-tier but limited AoE coverage makes them less effective against multiple enemies.'
          },
          {
            name: 'Gladiator',
            slug: 'gladiator',
            icon: '/images/classes/gladiator_icon.png',
            description: 'Blader & Gladiator (BM3): Similar damage to B-tier but limited AoE coverage makes them less effective against multiple enemies.'
          }
        ]
      },
      {
        tier: 'D',
        label: 'D',
        classes: [
          {
            name: 'Dark Mage',
            slug: 'dark-mager',
            icon: '/images/classes/dark_mage_icon.png',
            description: 'Dark Mage, Force Shielder (BM3): Both struggle with AoE. Force Shielder does about 5% more damage than Dark Mage in BM3, but both are poor for multi-target content.'
          },
          {
            name: 'Force Shielder',
            slug: 'force-shielder',
            icon: '/images/classes/force_shielder_icon.png',
            description: 'Dark Mage, Force Shielder (BM3): Both struggle with AoE. Force Shielder does about 5% more damage than Dark Mage in BM3, but both are poor for multi-target content.'
          }
        ]
      }
    ]
  },
  'nation-war': {
    id: 'nation-war',
    title: 'Nation War Farming Tier List (beginners)',
    description: 'Nation War ranking for beginners. You gain score by dealing damage, taking damage, or healing others. Without good gear, taking damage is easiest. Classes with high defense and defensive buffs work best for new players. Click on each row to expand for more information.',
    tiers: [
      {
        tier: 'S',
        label: 'S',
        classes: [
          {
            name: 'Force Shielder',
            slug: 'force-shielder',
            icon: '/images/classes/force_shielder_icon.png',
            description: 'Force Shielder: Best defense stats with strong defensive buffs. Battle Modes add more defense. Easiest class to earn Nation War points with basic gear.'
          }
        ]
      },
      {
        tier: 'A',
        label: 'A',
        classes: [
          {
            name: 'Warrior',
            slug: 'warrior',
            icon: '/images/classes/warrior_icon.png',
            description: 'Warrior: Good HP regen, defensive buffs, high base defense, and high HP for Nation War survival.'
          },
          {
            name: 'Gladiator',
            slug: 'gladiator',
            icon: '/images/classes/gladiator_icon.png',
            description: 'Gladiator: Similar defense to Warrior plus "immortality" buff that reduces damage to fixed amounts. Great for earning points when multiple enemies attack you.'
          }
        ]
      },
      {
        tier: 'B',
        label: 'B',
        classes: [
          {
            name: 'Force Gunner',
            slug: 'force-gunner',
            icon: '/images/classes/force_gunner_icon.png',
            description: 'Force Gunner: Average defense but good defensive buffs including "immortality" that reduces damage to fixed amounts.'
          },
          {
            name: 'Force Archer',
            slug: 'force-archer',
            icon: '/images/classes/force_archer_icon.png',
            description: 'Force Archer: Low defense like other magic classes but can heal allies. Long attack range lets you stay safer from enemies.'
          },
          {
            name: 'Blader',
            slug: 'blader',
            icon: '/images/classes/blader_icon.png',
            description: 'Blader: High defense and evasion work well against guardians. "Immortality" buff gives complete evasion instead of damage reduction, so less useful for earning points. Focus on guardians as a new player.'
          }
        ]
      },
      {
        tier: 'C',
        label: 'C',
        classes: [
          {
            name: 'Dark Mage',
            slug: 'dark-mager',
            icon: '/images/classes/dark_mage_icon.png',
            description: 'Dark Mage: Has debuffs that slow or petrify enemies but low base defense. Defensive buffs give moderate protection but have long cooldowns.'
          },
          {
            name: 'Force Blader',
            slug: 'force-blader',
            icon: '/images/classes/force_blader_icon.png',
            description: 'Force Blader: Moderate defensive buffs and utility debuffs. Control effects don\'t help earn Nation War points directly.'
          }
        ]
      },
      {
        tier: 'D',
        label: 'D',
        classes: [
          {
            name: 'Wizard',
            slug: 'wizard',
            icon: '/images/classes/wizard_icon.png',
            description: 'Wizard: Lowest defense of all classes. Defensive buffs aren\'t strong enough for survival. Very vulnerable to guardian damage for new players.'
          }
        ]
      }
    ]
  },
  'bm3-only': {
    id: 'bm3-only',
    title: 'Battle Mode 3 Only Tier List',
    description: 'Classes ranked by Battle Mode 3 (BM3) performance only. Direct comparison of all classes using only their BM3 abilities. Click on each row to expand for more information.',
    tiers: [
      {
        tier: 'S',
        label: 'S',
        classes: [
          {
            name: 'Force Gunner',
            slug: 'force-gunner',
            icon: '/images/classes/force_gunner_icon.png',
            description: 'Force Gunner (BM3): Fastest BM3 attacks with high damage. Best BM3 class, especially against single targets with +30% bonus damage.'
          },
          {
            name: 'Wizard',
            slug: 'wizard',
            icon: '/images/classes/wizard_icon.png',
            description: 'Wizard (BM3): Highest damage per hit in the game. Slower than Force Gunner but massive damage and consistent performance make it top-tier BM3.'
          }
        ]
      },
      {
        tier: 'A',
        label: 'A',
        classes: [
          {
            name: 'Force Archer',
            slug: 'force-archer',
            icon: '/images/classes/force_archer_icon.png',
            description: 'Force Archer (BM3): Moderate damage and attack speed with great AoE.'
          },
          {
            name: 'Force Blader',
            slug: 'force-blader',
            icon: '/images/classes/force_blader_icon.png',
            description: 'Force Blader (BM3): Good damage with great synergies.'
          },
          {
            name: 'Warrior',
            slug: 'warrior',
            icon: '/images/classes/warrior_icon.png',
            description: 'Warrior (BM3): Solid damage and good AoE make it a reliable A-tier BM3 choice.'
          }
        ]
      },
      {
        tier: 'B',
        label: 'B',
        classes: [
          {
            name: 'Blader',
            slug: 'blader',
            icon: '/images/classes/blader_icon.png',
            description: 'Blader (BM3): Moderate damage but poor AoE. Much weaker than Blader\'s BM2. Not the best battle mode for Blader.'
          },
          {
            name: 'Gladiator',
            slug: 'gladiator',
            icon: '/images/classes/gladiator_icon.png',
            description: 'Gladiator (BM3): Similar damage to other B-tier classes. BM2 might be better, but BM3 is still decent.'
          }
        ]
      },
      {
        tier: 'C',
        label: 'C',
        classes: [
          {
            name: 'Dark Mage',
            slug: 'dark-mager',
            icon: '/images/classes/dark_mage_icon.png',
            description: 'Dark Mage (BM3): Much weaker than Dark Mage\'s BM2 and other classes\' BM3. Poor AoE.'
          },
          {
            name: 'Force Shielder',
            slug: 'force-shielder',
            icon: '/images/classes/force_shielder_icon.png',
            description: 'Force Shielder (BM3): Similar to Dark Mage BM3 with low damage and poor AoE. Some defensive benefits but weak offense makes farming slow.'
          }
        ]
      }
    ]
  },
  'bm2-only': {
    id: 'bm2-only',
    title: 'Battle Mode 2 Only Tier List',
    description: 'Classes ranked by Battle Mode 2 (BM2) performance only. Some classes excel with BM2, others have weak or limited BM2 abilities. Note that some classes have very limited BM2 functionality. Click on each row to expand for more information.',
    tiers: [
      {
        tier: 'S',
        label: 'S',
        classes: [
          {
            name: 'Blader',
            slug: 'blader',
            icon: '/images/classes/blader_icon.png',
            description: 'Blader (BM2): Best BM2 class with top single-target damage from fast claw attacks. High DPS, great life steal, defense, and evasion make it the BM2 champion.'
          },
          {
            name: 'Dark Mage',
            slug: 'dark-mager',
            icon: '/images/classes/dark_mage_icon.png',
            description: 'Dark Mage (BM2): Damage rivals Blader with fast attacks giving good life steal. Built-in HP regen and health restore from Battle Modes boost survivability.'
          }
        ]
      },
      {
        tier: 'A',
        label: 'A',
        classes: [
          {
            name: 'Force Archer',
            slug: 'force-archer',
            icon: '/images/classes/force_archer_icon.png',
            description: 'Force Archer (BM2): Great dual gun visuals and strong damage that competes with top BM3 classes. Excellent choice for BM2 players.'
          }
        ]
      },
      {
        tier: 'B',
        label: 'B',
        classes: [
          {
            name: 'Gladiator',
            slug: 'gladiator',
            icon: '/images/classes/gladiator_icon.png',
            description: 'Gladiator (BM2): Korean tests show BM2 is better than BM3 for Gladiator. Good damage and the best battle mode choice for this class.'
          },
          {
            name: 'Force Gunner',
            slug: 'force-gunner',
            icon: '/images/classes/force_gunner_icon.png',
            description: 'Force Gunner (BM2): Much weaker than Force Gunner\'s BM3. Low damage makes BM2 impractical for this class.'
          },
          {
            name: 'Wizard',
            slug: 'wizard',
            icon: '/images/classes/wizard_icon.png',
            description: 'Wizard (BM2): Limited functionality and much lower damage than Wizard\'s BM3. Rarely used by experienced players.'
          }
        ]
      },
      {
        tier: 'C',
        label: 'C',
        classes: [
          {
            name: 'Warrior',
            slug: 'warrior',
            icon: '/images/classes/warrior_icon.png',
            description: 'Warrior (BM2): Basic functionality but can\'t compete with Warrior\'s BM3. Limited damage and utility make it suboptimal.'
          }
        ]
      },
      {
        tier: 'D',
        label: 'D',
        classes: [
          {
            name: 'Force Blader',
            slug: 'force-blader',
            icon: '/images/classes/force_blader_icon.png',
            description: 'Force Blader (BM2): Minimal effectiveness compared to BM3. Limited damage and functionality make it unsuitable for serious combat.'
          },
          {
            name: 'Force Shielder',
            slug: 'force-shielder',
            icon: '/images/classes/force_shielder_icon.png',
            description: 'Force Shielder (BM2): Very limited offense, focuses on defense. Some utility but still lowest damage of all classes even in BM2.'
          }
        ]
      }
    ]
  }
};