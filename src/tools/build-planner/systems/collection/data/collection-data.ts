// Collection System Data
import type { CollectionData } from '../types/collection';

export const COLLECTION_DATA: CollectionData = {
  categories: {
    dungeon: {
      id: 'dungeon',
      name: 'Dungeon',
      collections: {
        'lake-in-dusk-i': {
          id: 'lake-in-dusk-i',
          name: 'Lake in Dusk I',
          stats: {
            30: { hp: 6 },
            60: { hp: 10 },
            100: { hp: 20 }
          }
        },
        'lake-in-dusk-ii': {
          id: 'lake-in-dusk-ii',
          name: 'Lake in Dusk II',
          stats: {
            30: { hp: 30 },
            60: { hp: 50 },
            100: { hp: 100 }
          }
        },
        'ruina-station-i': {
          id: 'ruina-station-i',
          name: 'Ruina Station I',
          stats: {
            30: { hp: 7 },
            60: { hp: 12 },
            100: { hp: 25 }
          }
        },
        'ruina-station-ii': {
          id: 'ruina-station-ii',
          name: 'Ruina Station II',
          stats: {
            30: { allAttackUp: 3 },
            60: { allAttackUp: 5 },
            100: { allAttackUp: 10 }
          }
        },
        'tower-of-the-dead-b1f-i': {
          id: 'tower-of-the-dead-b1f-i',
          name: 'Tower of the Dead B1F I',
          stats: {
            30: { hp: 12 },
            60: { hp: 15 },
            100: { hp: 30 }
          }
        },
        'frozen-tower-of-undead-b1f-ii': {
          id: 'frozen-tower-of-undead-b1f-ii',
          name: 'Frozen Tower of Undead B1F II',
          stats: {
            30: { defense: 6 },
            60: { defense: 10 },
            100: { defense: 20 }
          }
        },
        'volcanic-citadel-i': {
          id: 'volcanic-citadel-i',
          name: 'Volcanic Citadel I',
          stats: {
            30: { attackRate: 6 },
            60: { attackRate: 10 },
            100: { attackRate: 20 }
          }
        },
        'volcanic-citadel-ii': {
          id: 'volcanic-citadel-ii',
          name: 'Volcanic Citadel II',
          stats: {
            30: { attackRate: 30 },
            60: { attackRate: 50 },
            100: { attackRate: 100 }
          }
        },
        'tower-of-the-dead-b2f-i': {
          id: 'tower-of-the-dead-b2f-i',
          name: 'Tower of the Dead B2F I',
          stats: {
            30: { defenseRate: 12 },
            60: { defenseRate: 20 },
            100: { defenseRate: 40 }
          }
        },
        'frozen-tower-of-undead-b2f-ii': {
          id: 'frozen-tower-of-undead-b2f-ii',
          name: 'Frozen Tower of Undead B2F II',
          stats: {
            30: { defenseRate: 60 },
            60: { defenseRate: 100 },
            100: { defenseRate: 200 }
          }
        },
        'forgotten-temple-b1f-i': {
          id: 'forgotten-temple-b1f-i',
          name: 'Forgotten Temple B1F I',
          stats: {
            30: { accuracy: 6 },
            60: { accuracy: 10 },
            100: { accuracy: 20 }
          }
        },
        'forgotten-temple-b1f-ii': {
          id: 'forgotten-temple-b1f-ii',
          name: 'Forgotten Temple B1F II',
          stats: {
            30: { accuracy: 30 },
            60: { accuracy: 50 },
            100: { accuracy: 100 }
          }
        },
        'illusion-castle-underworld-i': {
          id: 'illusion-castle-underworld-i',
          name: 'Illusion Castle - Underworld I',
          stats: {
            30: { evasion: 9 },
            60: { evasion: 15 },
            100: { evasion: 30 }
          }
        },
        'illusion-castle-underworld-ii': {
          id: 'illusion-castle-underworld-ii',
          name: 'Illusion Castle Underworld II',
          stats: {
            30: { evasion: 45 },
            60: { evasion: 75 },
            100: { evasion: 150 }
          }
        },
        'forbidden-island-i': {
          id: 'forbidden-island-i',
          name: 'Forbidden Island I',
          stats: {
            30: { ignoreDamageReduction: 1 },
            60: { ignoreDamageReduction: 2 },
            100: { ignoreDamageReduction: 5 }
          }
        },
        'forbidden-island-ii': {
          id: 'forbidden-island-ii',
          name: 'Forbidden Island II',
          stats: {
            30: { ignoreDamageReduction: 9 },
            60: { ignoreDamageReduction: 13 },
            100: { ignoreDamageReduction: 25 }
          }
        },
        'forgotten-temple-b2f-i': {
          id: 'forgotten-temple-b2f-i',
          name: 'Forgotten Temple B2F I',
          stats: {
            30: { resistCriticalDamage: 1 },
            60: { resistCriticalDamage: 2 },
            100: { resistCriticalDamage: 4 }
          }
        },
        'forgotten-temple-b2f-ii': {
          id: 'forgotten-temple-b2f-ii',
          name: 'Forgotten Temple B2F II',
          stats: {
            30: { allSkillAmp: 1 },
            60: { allSkillAmp: 2 },
            100: { allSkillAmp: 3 }
          }
        },
        'illusion-castle-radiant-hall-i': {
          id: 'illusion-castle-radiant-hall-i',
          name: 'Illusion Castle - Radiant Hall I',
          stats: {
            30: { ignoreEvasion: 9 },
            60: { ignoreEvasion: 15 },
            100: { ignoreEvasion: 30 }
          }
        },
        'illusion-castle-radiant-hall-ii': {
          id: 'illusion-castle-radiant-hall-ii',
          name: 'Illusion Castle Radiant Hall II',
          stats: {
            30: { ignoreEvasion: 54 },
            60: { ignoreEvasion: 90 },
            100: { ignoreEvasion: 180 }
          }
        },
        'altar-of-siena-b1f-i': {
          id: 'altar-of-siena-b1f-i',
          name: 'Altar of Siena B1F I',
          stats: {
            30: { ignoreAccuracy: 9 },
            60: { ignoreAccuracy: 15 },
            100: { ignoreAccuracy: 30 }
          }
        },
        'altar-of-siena-b1f-ii': {
          id: 'altar-of-siena-b1f-ii',
          name: 'Altar of Siena B1F II',
          stats: {
            30: { ignoreAccuracy: 45 },
            60: { ignoreAccuracy: 75 },
            100: { ignoreAccuracy: 150 }
          }
        },
        'altar-of-siena-b2f-i': {
          id: 'altar-of-siena-b2f-i',
          name: 'Altar of Siena B2F I',
          stats: {
            30: { ignorePenetration: 1 },
            60: { ignorePenetration: 2 },
            100: { ignorePenetration: 5 }
          }
        },
        'altar-of-siena-b2f-ii': {
          id: 'altar-of-siena-b2f-ii',
          name: 'Altar of Siena B2F II',
          stats: {
            30: { ignorePenetration: 12 },
            60: { ignorePenetration: 20 },
            100: { ignorePenetration: 40 }
          }
        },
        'catacomb-frost-i': {
          id: 'catacomb-frost-i',
          name: 'Catacomb Frost I',
          stats: {
            30: { hp: 12 },
            60: { hp: 20 },
            100: { hp: 40 }
          }
        },
        'catacomb-frost-ii': {
          id: 'catacomb-frost-ii',
          name: 'Catacomb Frost II',
          stats: {
            30: { resistStun: 2 },
            60: { resistStun: 3 },
            100: { resistStun: 5 }
          }
        },
        'panic-cave-i': {
          id: 'panic-cave-i',
          name: 'Panic Cave I',
          stats: {
            30: { defense: 3 },
            60: { defense: 5 },
            100: { defense: 10 }
          }
        },
        'panic-cave-ii': {
          id: 'panic-cave-ii',
          name: 'Panic Cave II',
          stats: {
            30: { resistDown: 2 },
            60: { resistDown: 3 },
            100: { resistDown: 5 }
          }
        },
        'lava-hellfire-i': {
          id: 'lava-hellfire-i',
          name: 'Lava Hellfire I',
          stats: {
            30: { hp: 12 },
            60: { hp: 20 },
            100: { hp: 40 }
          }
        },
        'lava-hellfire-ii': {
          id: 'lava-hellfire-ii',
          name: 'Lava Hellfire II',
          stats: {
            30: { resistUnableToMove: 1 },
            60: { resistUnableToMove: 2 },
            100: { resistUnableToMove: 3 }
          }
        },
        'steamer-crazy-i': {
          id: 'steamer-crazy-i',
          name: 'Steamer Crazy I',
          stats: {
            30: { defense: 3 },
            60: { defense: 5 },
            100: { defense: 10 }
          }
        },
        'steamer-crazy-ii': {
          id: 'steamer-crazy-ii',
          name: 'Steamer Crazy II',
          stats: {
            30: { resistKnockback: 2 },
            60: { resistKnockback: 3 },
            100: { resistKnockback: 5 }
          }
        },
        'hazardous-valley-i': {
          id: 'hazardous-valley-i',
          name: 'Hazardous Valley I',
          stats: {
            30: { resistCriticalDamage: 1 },
            60: { resistCriticalDamage: 2 },
            100: { resistCriticalDamage: 3 }
          }
        },
        'hazardous-valley-ii': {
          id: 'hazardous-valley-ii',
          name: 'Hazardous Valley II',
          stats: {
            30: { resistCriticalDamage: 3 },
            60: { resistCriticalDamage: 5 },
            100: { resistCriticalDamage: 10 }
          }
        },
        'maquinas-outpost-i': {
          id: 'maquinas-outpost-i',
          name: 'Maquinas Outpost I',
          stats: {
            30: { defense: 4 },
            60: { defense: 7 },
            100: { defense: 15 }
          }
        },
        'maquinas-outpost-ii': {
          id: 'maquinas-outpost-ii',
          name: 'Maquinas Outpost II',
          stats: {
            30: { defense: 18 },
            60: { defense: 30 },
            100: { defense: 60 }
          }
        },
        'eternal-chaos-arena-i': {
          id: 'eternal-chaos-arena-i',
          name: 'Eternal Chaos Arena I',
          stats: {
            30: { pveNormalDamageUp: 4 },
            60: { pveNormalDamageUp: 6 },
            100: { pveNormalDamageUp: 12 }
          }
        },
        'eternal-chaos-arena-ii': {
          id: 'eternal-chaos-arena-ii',
          name: 'Eternal Chaos Arena II',
          stats: {
            30: { resistSkillAmp: 2 },
            60: { resistSkillAmp: 4 },
            100: { resistSkillAmp: 8 }
          }
        },
        'tower-of-undead-b3f-i': {
          id: 'tower-of-undead-b3f-i',
          name: 'Tower of Undead B3F I',
          stats: {
            30: { pveAllAttackUp: 9 },
            60: { pveAllAttackUp: 15 },
            100: { pveAllAttackUp: 30 }
          }
        },
        'tower-of-the-dead-b3f': {
          id: 'tower-of-the-dead-b3f',
          name: 'Tower of the Dead B3F',
          stats: {
            30: { criticalDamage: 3 },
            60: { criticalDamage: 5 },
            100: { criticalDamage: 9 }
          }
        },
        'forgotten-temple-b2f-awakend-i': {
          id: 'forgotten-temple-b2f-awakend-i',
          name: 'Forgotten Temple B2F (Awakend) I',
          stats: {
            30: { pveDefense: 8 },
            60: { pveDefense: 13 },
            100: { pveDefense: 26 }
          }
        },
        'forgotten-temple-b2f-awakened': {
          id: 'forgotten-temple-b2f-awakened',
          name: 'Forgotten Temple B2F (Awakened)',
          stats: {
            30: { allAttackUp: 17 },
            60: { allAttackUp: 28 },
            100: { allAttackUp: 55 }
          }
        },
        'forbidden-island-awakened-i': {
          id: 'forbidden-island-awakened-i',
          name: 'Forbidden Island (Awakened) I',
          stats: {
            30: { evasion: 60 },
            60: { evasion: 100 },
            100: { evasion: 200 }
          }
        },
        'forbidden-island-awakened': {
          id: 'forbidden-island-awakened',
          name: 'Forbidden Island (Awakened)',
          stats: {
            30: { ignoreResistCriticalDamage: 2 },
            60: { ignoreResistCriticalDamage: 4 },
            100: { ignoreResistCriticalDamage: 7 }
          }
        },
        'abandoned-city-i': {
          id: 'abandoned-city-i',
          name: 'Abandoned City I',
          stats: {
            30: { accuracy: 21 },
            60: { accuracy: 45 },
            100: { accuracy: 90 }
          }
        },
        'abandoned-city': {
          id: 'abandoned-city',
          name: 'Abandoned City',
          stats: {
            30: { allSkillAmp: 2 },
            60: { allSkillAmp: 3 },
            100: { allSkillAmp: 5 }
          }
        },
        'glacies-inferna': {
          id: 'glacies-inferna',
          name: 'Glacies Inferna',
          stats: {
            30: { ignoreResistCriticalRate: 1 },
            60: { ignoreResistCriticalRate: 1 },
            100: { ignoreResistCriticalRate: 2 }
          }
        },
        'ic-underworld-apocrypha-i': {
          id: 'ic-underworld-apocrypha-i',
          name: 'IC: Underworld (Apocrypha) I',
          stats: {
            30: { attackRate: 40 },
            60: { attackRate: 80 },
            100: { attackRate: 160 }
          }
        },
        'illusion-castle-underworld-apocrypha': {
          id: 'illusion-castle-underworld-apocrypha',
          name: 'Illusion Castle Underworld Apocrypha',
          stats: {
            30: { attackRate: 15 },
            60: { attackRate: 125 },
            100: { attackRate: 250 }
          }
        },
        'ic-radiant-hall-apocrypha-i': {
          id: 'ic-radiant-hall-apocrypha-i',
          name: 'IC: Radiant Hall (Apocrypha) I',
          stats: {
            30: { defenseRate: 40 },
            60: { defenseRate: 80 },
            100: { defenseRate: 160 }
          }
        },
        'illusion-castle-radiant-hall-apocrypha': {
          id: 'illusion-castle-radiant-hall-apocrypha',
          name: 'Illusion Castle Radiant Hall Apocrypha',
          stats: {
            30: { defenseRate: 105 },
            60: { defenseRate: 175 },
            100: { defenseRate: 350 }
          }
        },
        'edge-of-phantom-i': {
          id: 'edge-of-phantom-i',
          name: 'Edge of Phantom I',
          stats: {
            30: { pveDamageReduction: 3 },
            60: { pveDamageReduction: 5 },
            100: { pveDamageReduction: 10 }
          }
        },
        'edge-of-phantom-ii': {
          id: 'edge-of-phantom-ii',
          name: 'Edge of Phantom II',
          stats: {
            30: { damageReduction: 15 },
            60: { damageReduction: 25 },
            100: { damageReduction: 50 }
          }
        },
        'acheron-arena-i': {
          id: 'acheron-arena-i',
          name: 'Acheron Arena I',
          stats: {
            30: { pveNormalDamageUp: 1 },
            60: { pveNormalDamageUp: 2 },
            100: { pveNormalDamageUp: 4 }
          }
        },
        'acheron-arena': {
          id: 'acheron-arena',
          name: 'Acheron Arena',
          stats: {
            30: { normalDamageUp: 4 },
            60: { normalDamageUp: 6 },
            100: { normalDamageUp: 12 }
          }
        },
        'forgotten-temple-b3f-i': {
          id: 'forgotten-temple-b3f-i',
          name: 'Forgotten Temple B3F I',
          stats: {
            30: { pvePenetration: 3 },
            60: { pvePenetration: 7 },
            100: { pvePenetration: 15 }
          }
        },
        'forgotten-temple-b3f': {
          id: 'forgotten-temple-b3f',
          name: 'Forgotten Temple B3F',
          stats: {
            30: { penetration: 15 },
            60: { penetration: 25 },
            100: { penetration: 50 }
          }
        },
        'devils-tower-i': {
          id: 'devils-tower-i',
          name: "Devil's Tower I",
          stats: {
            30: { ignoreAccuracy: 40 },
            60: { ignoreAccuracy: 80 },
            100: { ignoreAccuracy: 160 }
          }
        },
        'devils-tower-ii': {
          id: 'devils-tower-ii',
          name: "Devil's Tower II",
          stats: {
            30: { evasion: 90 },
            60: { evasion: 150 },
            100: { evasion: 300 }
          }
        },
        'pandemonium-i': {
          id: 'pandemonium-i',
          name: 'Pandemonium I',
          stats: {
            30: { ignoreEvasion: 21 },
            60: { ignoreEvasion: 35 },
            100: { ignoreEvasion: 70 }
          }
        },
        'pandemonium': {
          id: 'pandemonium',
          name: 'Pandemonium',
          stats: {
            30: { accuracy: 15 },
            60: { accuracy: 25 },
            100: { accuracy: 50 }
          }
        },
        'mirage-island-i': {
          id: 'mirage-island-i',
          name: 'Mirage Island I',
          stats: {
            30: { pveCancelIgnorePenetration: 3 },
            60: { pveCancelIgnorePenetration: 7 },
            100: { pveCancelIgnorePenetration: 14 }
          }
        },
        'mirage-island-ii': {
          id: 'mirage-island-ii',
          name: 'Mirage Island II',
          stats: {
            30: { criticalDamage: 4 },
            60: { criticalDamage: 7 },
            100: { criticalDamage: 13 }
          }
        },
        'flame-dimension-ii': {
          id: 'flame-dimension-ii',
          name: 'Flame Dimension II',
          stats: {
            30: { hp: 60 },
            60: { hp: 100 },
            100: { hp: 200 }
          }
        },
        'chaos-arena-ii': {
          id: 'chaos-arena-ii',
          name: 'Chaos Arena II',
          stats: {
            30: { allAttackUp: 30 },
            60: { allAttackUp: 50 },
            100: { allAttackUp: 100 }
          }
        },
        'frozen-canyon-i': {
          id: 'frozen-canyon-i',
          name: 'Frozen Canyon I',
          stats: {
            30: { pveDamageReduction: 6 },
            60: { pveDamageReduction: 11 },
            100: { pveDamageReduction: 22 }
          }
        },
        'frozen-canyon-ii': {
          id: 'frozen-canyon-ii',
          name: 'Frozen Canyon II',
          stats: {
            30: { attackRate: 20 },
            60: { attackRate: 35 },
            100: { attackRate: 70 }
          }
        },
        'ancient-tomb-i': {
          id: 'ancient-tomb-i',
          name: 'Ancient Tomb I',
          stats: {
            30: { pveIgnorePenetration: 5 },
            60: { pveIgnorePenetration: 10 },
            100: { pveIgnorePenetration: 20 }
          }
        },
        'ancient-tomb-ii': {
          id: 'ancient-tomb-ii',
          name: 'Ancient Tomb II',
          stats: {
            30: { defense: 12 },
            60: { defense: 50 },
            100: { defense: 130 }
          }
        },
        'flame-nest-i': {
          id: 'flame-nest-i',
          name: 'Flame Nest I',
          stats: {
            30: { pveDefense: 10 },
            60: { pveDefense: 20 },
            100: { pveDefense: 40 }
          }
        },
        'flame-nest-ii': {
          id: 'flame-nest-ii',
          name: 'Flame Nest II',
          stats: {
            30: { hp: 20 },
            60: { hp: 60 },
            100: { hp: 120 }
          }
        },
        'terminus-machina-i': {
          id: 'terminus-machina-i',
          name: 'Terminus Machina I',
          stats: {
            30: { pveDefense: 10 },
            60: { pveDefense: 20 },
            100: { pveDefense: 40 }
          }
        },
        'terminus-machina-ii': {
          id: 'terminus-machina-ii',
          name: 'Terminus Machina II',
          stats: {
            30: { ignoreEvasion: 15 },
            60: { ignoreEvasion: 25 },
            100: { ignoreEvasion: 50 }
          }
        },
        'garden-of-dust-i': {
          id: 'garden-of-dust-i',
          name: 'Garden of Dust I',
          stats: {
            30: { pveCancelIgnorePenetration: 3 },
            60: { pveCancelIgnorePenetration: 7 },
            100: { pveCancelIgnorePenetration: 14 }
          }
        },
        'garden-of-dust-ii': {
          id: 'garden-of-dust-ii',
          name: 'Garden of Dust II',
          stats: {
            30: { cancelIgnorePenetration: 8 },
            60: { cancelIgnorePenetration: 18 },
            100: { cancelIgnorePenetration: 40 }
          }
        },
        'mirage-island-awakening-i': {
          id: 'mirage-island-awakening-i',
          name: 'Mirage Island (Awakening) I',
          stats: {
            30: { pvePenetration: 5 },
            60: { pvePenetration: 10 },
            100: { pvePenetration: 20 }
          }
        },
        'mirage-island-awakening-ii': {
          id: 'mirage-island-awakening-ii',
          name: 'Mirage Island (Awakening) II',
          stats: {
            30: { ignoreResistCriticalDamage: 4 },
            60: { ignoreResistCriticalDamage: 9 },
            100: { ignoreResistCriticalDamage: 19 }
          }
        },
        'celestia-i': {
          id: 'celestia-i',
          name: 'Celestia I',
          stats: {
            30: { pveAllAttackUp: 10 },
            60: { pveAllAttackUp: 20 },
            100: { pveAllAttackUp: 40 }
          }
        },
        'celestia-ii': {
          id: 'celestia-ii',
          name: 'Celestia II',
          stats: {
            30: { resistCriticalDamage: 6 },
            60: { resistCriticalDamage: 14 },
            100: { resistCriticalDamage: 30 }
          }
        },
        'purifier-in-the-woods-i': {
          id: 'purifier-in-the-woods-i',
          name: 'Purifier in the Woods I',
          stats: {
            30: { pveAllAttackUp: 10 },
            60: { pveAllAttackUp: 20 },
            100: { pveAllAttackUp: 40 }
          }
        },
        'purifier-of-the-woods-ii': {
          id: 'purifier-of-the-woods-ii',
          name: 'Purifier of the Woods II',
          stats: {
            30: { allAttackUp: 20 },
            60: { allAttackUp: 40 },
            100: { allAttackUp: 80 }
          }
        },
        'secret-base-scr-76-i': {
          id: 'secret-base-scr-76-i',
          name: 'Secret Base SCR-76 I',
          stats: {
            30: { pveCriticalDamage: 2 },
            60: { pveCriticalDamage: 4 },
            100: { pveCriticalDamage: 9 }
          }
        },
        'secret-base-scr-76-ii': {
          id: 'secret-base-scr-76-ii',
          name: 'Secret Base SCR-76 II',
          stats: {
            30: { criticalDamage: 4 },
            60: { criticalDamage: 8 },
            100: { criticalDamage: 16 }
          }
        },
        'tower-of-the-dead-b4f-i': {
          id: 'tower-of-the-dead-b4f-i',
          name: 'Tower of the Dead B4F I',
          stats: {
            30: { pveAllSkillAmp: 1 },
            60: { pveAllSkillAmp: 2 },
            100: { pveAllSkillAmp: 5 }
          }
        },
        'tower-of-the-dead-b4f-ii': {
          id: 'tower-of-the-dead-b4f-ii',
          name: 'Tower of the Dead B4F II',
          stats: {
            30: { pveAllSkillAmp: 2 },
            60: { pveAllSkillAmp: 5 },
            100: { pveAllSkillAmp: 11 }
          }
        },
        'phantasmal-power': {
          id: 'phantasmal-power',
          name: 'Phantasmal Power',
          stats: {
            30: { pveAllSkillAmp: 1 },
            60: { pveAllSkillAmp: 2 },
            100: { pveAllSkillAmp: 4 }
          }
        },
        'plant-disaster': {
          id: 'plant-disaster',
          name: 'Plant Disaster',
          stats: {
            30: { hp: 40 },
            60: { hp: 100 },
            100: { hp: 250 }
          }
        },
        'labyrinth': {
          id: 'labyrinth',
          name: 'Labyrinth',
          stats: {
            30: { pvePenetration: 10 },
            60: { pvePenetration: 25 },
            100: { pvePenetration: 50 }
          }
        },
        'lost-research': {
          id: 'lost-research',
          name: 'Lost Research',
          stats: {
            30: { pveDefense: 10 },
            60: { pveDefense: 30 },
            100: { pveDefense: 70 }
          }
        },
        'oblivion-staff': {
          id: 'oblivion-staff',
          name: 'Oblivion Staff',
          stats: {
            30: { pveIgnorePenetration: 8 },
            60: { pveIgnorePenetration: 24 },
            100: { pveIgnorePenetration: 60 }
          }
        },
        'undead-ambition': {
          id: 'undead-ambition',
          name: 'Undead Ambition',
          stats: {
            30: { pvePenetration: 5 },
            60: { pvePenetration: 13 },
            100: { pvePenetration: 30 }
          }
        },
        'across-the-unknown-sea': {
          id: 'across-the-unknown-sea',
          name: 'Across the Unknown Sea',
          stats: {
            30: { pveCriticalDamage: 3 },
            60: { pveCriticalDamage: 8 },
            100: { pveCriticalDamage: 18 }
          }
        }

      }
    },
    world: {
      id: 'world',
      name: 'World',
      collections: {
        'bloody-ice-i': {
          id: 'bloody-ice-i',
          name: 'Bloody Ice I',
          stats: {
            30: { attackRate: 12 },
            60: { attackRate: 20 },
            100: { attackRate: 40 }
          }
        },
        'bloody-ice-ii': {
          id: 'bloody-ice-ii',
          name: 'Bloody Ice II',
          stats: {
            30: { str: 1 },
            60: { str: 2 },
            100: { str: 3 }
          }
        },
        'desert-scream-i': {
          id: 'desert-scream-i',
          name: 'Desert Scream I',
          stats: {
            30: { defenseRate: 12 },
            60: { defenseRate: 20 },
            100: { defenseRate: 40 }
          }
        },
        'desert-scream-ii': {
          id: 'desert-scream-ii',
          name: 'Desert Scream II',
          stats: {
            30: { int: 1 },
            60: { int: 2 },
            100: { int: 3 }
          }
        },
        'green-despair-i': {
          id: 'green-despair-i',
          name: 'Green Despair I',
          stats: {
            30: { defense: 4 },
            60: { defense: 6 },
            100: { defense: 12 }
          }
        },
        'green-despair-ii': {
          id: 'green-despair-ii',
          name: 'Green Despair II',
          stats: {
            30: { dex: 1 },
            60: { dex: 2 },
            100: { dex: 3 }
          }
        },
        'port-lux-i': {
          id: 'port-lux-i',
          name: 'Port Lux I',
          stats: {
            30: { evasion: 12 },
            60: { evasion: 20 },
            100: { evasion: 40 }
          }
        },
        'port-lux-ii': {
          id: 'port-lux-ii',
          name: 'Port Lux II',
          stats: {
            30: { hp: 18 },
            60: { hp: 30 },
            100: { hp: 60 }
          }
        },
        'fort-ruina-i': {
          id: 'fort-ruina-i',
          name: 'Fort Ruina I',
          stats: {
            30: { accuracy: 9 },
            60: { accuracy: 15 },
            100: { accuracy: 30 }
          }
        },
        'fort-ruina-ii': {
          id: 'fort-ruina-ii',
          name: 'Fort Ruina II',
          stats: {
            30: { allAttackUp: 3 },
            60: { allAttackUp: 5 },
            100: { allAttackUp: 10 }
          }
        },
        'undead-ground-i': {
          id: 'undead-ground-i',
          name: 'Undead Ground I',
          stats: {
            30: { defense: 4 },
            60: { defense: 7 },
            100: { defense: 14 }
          }
        },
        'undead-ground-ii': {
          id: 'undead-ground-ii',
          name: 'Undead Ground II',
          stats: {
            30: { defense: 5 },
            60: { defense: 8 },
            100: { defense: 15 }
          }
        },
        'forgotten-ruins-i': {
          id: 'forgotten-ruins-i',
          name: 'Forgotten Ruins I',
          stats: {
            30: { attackRate: 15 },
            60: { attackRate: 25 },
            100: { attackRate: 50 }
          }
        },
        'forgotten-ruins-ii': {
          id: 'forgotten-ruins-ii',
          name: 'Forgotten Ruins II',
          stats: {
            30: { attackRate: 21 },
            60: { attackRate: 35 },
            100: { attackRate: 70 }
          }
        },
        'lakeside-i': {
          id: 'lakeside-i',
          name: 'Lakeside I',
          stats: {
            30: { defenseRate: 15 },
            60: { defenseRate: 25 },
            100: { defenseRate: 50 }
          }
        },
        'lakeside-ii': {
          id: 'lakeside-ii',
          name: 'Lakeside II',
          stats: {
            30: { defenseRate: 42 },
            60: { defenseRate: 70 },
            100: { defenseRate: 140 }
          }
        },
        'mutant-forest-i': {
          id: 'mutant-forest-i',
          name: 'Mutant Forest I',
          stats: {
            30: { accuracy: 15 },
            60: { accuracy: 25 },
            100: { accuracy: 50 }
          }
        },
        'mutant-forest-ii': {
          id: 'mutant-forest-ii',
          name: 'Mutant Forest II',
          stats: {
            30: { accuracy: 24 },
            60: { accuracy: 40 },
            100: { accuracy: 80 }
          }
        },
        'pontus-ferrum-i': {
          id: 'pontus-ferrum-i',
          name: 'Pontus Ferrum I',
          stats: {
            30: { evasion: 18 },
            60: { evasion: 30 },
            100: { evasion: 60 }
          }
        },
        'pontus-ferrum-ii': {
          id: 'pontus-ferrum-ii',
          name: 'Pontus Ferrum II',
          stats: {
            30: { evasion: 36 },
            60: { evasion: 60 },
            100: { evasion: 120 }
          }
        },
        'porta-inferno-i': {
          id: 'porta-inferno-i',
          name: 'Porta Inferno I',
          stats: {
            30: { ignoreAccuracy: 15 },
            60: { ignoreAccuracy: 25 },
            100: { ignoreAccuracy: 50 }
          }
        },
        'porta-inferno-ii': {
          id: 'porta-inferno-ii',
          name: 'Porta Inferno II',
          stats: {
            30: { damageReduction: 5 },
            60: { damageReduction: 8 },
            100: { damageReduction: 15 }
          }
        },
        'arcane-trace-i': {
          id: 'arcane-trace-i',
          name: 'Arcane Trace I',
          stats: {
            30: { pveDefense: 5 },
            60: { pveDefense: 8 },
            100: { pveDefense: 16 }
          }
        },
        'arcane-trace-ii': {
          id: 'arcane-trace-ii',
          name: 'Arcane Trace II',
          stats: {
            30: { criticalDamage: 2 },
            60: { criticalDamage: 3 },
            100: { criticalDamage: 5 }
          }
        },
        'senilinia-i': {
          id: 'senilinia-i',
          name: 'Senilinia I',
          stats: {
            30: { allAttackUp: 4 },
            60: { allAttackUp: 6 },
            100: { allAttackUp: 12 }
          }
        },
        'senillinea-ii': {
          id: 'senillinea-ii',
          name: 'Senillinea II',
          stats: {
            30: { penetration: 5 },
            60: { penetration: 8 },
            100: { penetration: 15 }
          }
        }
      }
    },
    special: {
      id: 'special',
      name: 'Special',
      collections: {
        'general-upgrade': {
          id: 'general-upgrade',
          name: 'General Upgrade',
          stats: {
            30: { allAttackUp: 24 },
            60: { allAttackUp: 40 },
            100: { allAttackUp: 80 }
          }
        },
        'chaos-upgrade-i': {
          id: 'chaos-upgrade-i',
          name: 'Chaos Upgrade I',
          stats: {
            30: { ignoreResistSkillAmp: 2 },
            60: { ignoreResistSkillAmp: 3 },
            100: { ignoreResistSkillAmp: 6 }
          }
        },
        'chaos-upgrade-ii': {
          id: 'chaos-upgrade-ii',
          name: 'Chaos Upgrade II',
          stats: {
            30: { ignoreResistCriticalDamage: 4 },
            60: { ignoreResistCriticalDamage: 6 },
            100: { ignoreResistCriticalDamage: 12 }
          }
        },
        'divine-upgrade': {
          id: 'divine-upgrade',
          name: 'Divine Upgrade',
          stats: {
            30: { allSkillAmp: 2 },
            60: { allSkillAmp: 3 },
            100: { allSkillAmp: 5 }
          }
        },
        'extreme-upgrade': {
          id: 'extreme-upgrade',
          name: 'Extreme Upgrade',
          stats: {
            30: { allAttackUp: 36 },
            60: { allAttackUp: 60 },
            100: { allAttackUp: 120 }
          }
        },
        'craft-weapon': {
          id: 'craft-weapon',
          name: 'craft (Weapon)',
          stats: {
            30: { normalDamageUp: 5 },
            60: { normalDamageUp: 8 },
            100: { normalDamageUp: 15 }
          }
        },
        'craft-helm': {
          id: 'craft-helm',
          name: 'craft (Helm)',
          stats: {
            30: { resistCriticalDamage: 4 },
            60: { resistCriticalDamage: 7 },
            100: { resistCriticalDamage: 14 }
          }
        },
        'craft-suit': {
          id: 'craft-suit',
          name: 'craft (Suit)',
          stats: {
            30: { hp: 75 },
            60: { hp: 125 },
            100: { hp: 250 }
          }
        },
        'craft-gloves': {
          id: 'craft-gloves',
          name: 'craft (Gloves)',
          stats: {
            30: { defense: 21 },
            60: { defense: 35 },
            100: { defense: 70 }
          }
        },
        'craft-boots': {
          id: 'craft-boots',
          name: 'craft (Boots)',
          stats: {
            30: { ignoreAccuracy: 60 },
            60: { ignoreAccuracy: 100 },
            100: { ignoreAccuracy: 200 }
          }
        },
        'craft-ring': {
          id: 'craft-ring',
          name: 'craft (Ring)',
          stats: {
            30: { attackRate: 75 },
            60: { attackRate: 125 },
            100: { attackRate: 250 }
          }
        },
        'craft-amulet': {
          id: 'craft-amulet',
          name: 'craft (Amulet)',
          stats: {
            30: { defenseRate: 60 },
            60: { defenseRate: 100 },
            100: { defenseRate: 200 }
          }
        },
        'force-wing': {
          id: 'force-wing',
          name: 'Force Wing',
          stats: {
            30: { ignorePenetration: 9 },
            60: { ignorePenetration: 15 },
            100: { ignorePenetration: 30 }
          }
        },
        'war': {
          id: 'war',
          name: 'War',
          stats: {
            30: { resistSkillAmp: 3 },
            60: { resistSkillAmp: 5 },
            100: { resistSkillAmp: 10 }
          }
        },
        'costume': {
          id: 'costume',
          name: 'Costume',
          stats: {
            30: { damageReduction: 9 },
            60: { damageReduction: 15 },
            100: { damageReduction: 30 }
          }
        },
        'bike': {
          id: 'bike',
          name: 'Bike',
          stats: {
            30: { penetration: 18 },
            60: { penetration: 30 },
            100: { penetration: 60 }
          }
        },
        'token': {
          id: 'token',
          name: 'Token',
          stats: {
            30: { hp: 90 },
            60: { hp: 150 },
            100: { hp: 300 }
          }
        },
        'soul-ability': {
          id: 'soul-ability',
          name: 'Soul Ability',
          stats: {
            30: { criticalDamage: 5 },
            60: { criticalDamage: 8 },
            100: { criticalDamage: 15 }
          }
        },
        'accessories-earrings': {
          id: 'accessories-earrings',
          name: 'Accessories - Earrings',
          stats: {
            30: { damageReduction: 18 },
            60: { damageReduction: 30 },
            100: { damageReduction: 60 }
          }
        },
        'accessories-bracelets': {
          id: 'accessories-bracelets',
          name: 'Accessories - Bracelets',
          stats: {
            30: { allSkillAmp: 2 },
            60: { allSkillAmp: 4 },
            100: { allSkillAmp: 7 }
          }
        },
        'accessories-rings': {
          id: 'accessories-rings',
          name: 'Accessories - Rings',
          stats: {
            30: { penetration: 21 },
            60: { penetration: 35 },
            100: { penetration: 70 }
          }
        },
        'accessories-amulets': {
          id: 'accessories-amulets',
          name: 'Accessories - Amulets',
          stats: {
            30: { criticalDamage: 5 },
            60: { criticalDamage: 8 },
            100: { criticalDamage: 15 }
          }
        },
        'mercenary': {
          id: 'mercenary',
          name: 'Mercenary',
          stats: {
            30: { defense: 33 },
            60: { defense: 55 },
            100: { defense: 100 }
          }
        },
        'unbind': {
          id: 'unbind',
          name: 'Unbind',
          stats: {
            30: { ignorePenetration: 15 },
            60: { ignorePenetration: 25 },
            100: { ignorePenetration: 50 }
          }
        },
        'hells-research-support-i': {
          id: 'hells-research-support-i',
          name: "Hell's Research Support I",
          stats: {
            30: { attackRate: 24 },
            60: { attackRate: 40 },
            100: { attackRate: 80 }
          }
        },
        'hells-research-support-ii': {
          id: 'hells-research-support-ii',
          name: "Hell's Research Support II",
          stats: {
            30: { defenseRate: 24 },
            60: { defenseRate: 40 },
            100: { defenseRate: 80 }
          }
        },
        'hells-research-support-iii': {
          id: 'hells-research-support-iii',
          name: "Hell's Research Support III",
          stats: {
            30: { hp: 15 },
            60: { hp: 30 },
            100: { hp: 60 }
          }
        },
        'hells-research-support-iv': {
          id: 'hells-research-support-iv',
          name: "Hell's Research Support IV",
          stats: {
            30: { defense: 7 },
            60: { defense: 15 },
            100: { defense: 25 }
          }
        },
        'hells-research-support-v': {
          id: 'hells-research-support-v',
          name: "Hell's Research Support V",
          stats: {
            30: { allAttackUp: 5 },
            60: { allAttackUp: 8 },
            100: { allAttackUp: 15 }
          }
        },
        'hells-research-support-vi': {
          id: 'hells-research-support-vi',
          name: "Hell's Research Support VI",
          stats: {
            30: { hp: 36 },
            60: { hp: 60 },
            100: { hp: 120 }
          }
        },
        'hells-research-support-vii': {
          id: 'hells-research-support-vii',
          name: "Hell's Research Support VII",
          stats: {
            30: { ignorePenetration: 15 },
            60: { ignorePenetration: 25 },
            100: { ignorePenetration: 50 }
          }
        },
        'hells-research-support-viii': {
          id: 'hells-research-support-viii',
          name: "Hell's Research Support VIII",
          stats: {
            30: { damageReduction: 11 },
            60: { damageReduction: 21 },
            100: { damageReduction: 35 }
          }
        },
        'hells-research-support-ix': {
          id: 'hells-research-support-ix',
          name: "Hell's Research Support IX",
          stats: {
            30: { ignoreResistSkillAmp: 2 },
            60: { ignoreResistSkillAmp: 3 },
            100: { ignoreResistSkillAmp: 6 }
          }
        },
        'hells-research-support-x': {
          id: 'hells-research-support-x',
          name: "Hell's Research Support X",
          stats: {
            30: { ignoreResistCriticalDamage: 4 },
            60: { ignoreResistCriticalDamage: 6 },
            100: { ignoreResistCriticalDamage: 12 }
          }
        },
        'machine-attack-examination': {
          id: 'machine-attack-examination',
          name: 'Machine Attack Examination',
          stats: {
            30: { allSkillAmp: 2 },
            60: { allSkillAmp: 5 },
            100: { allSkillAmp: 8 }
          }
        },
        'intensive-research': {
          id: 'intensive-research',
          name: 'Intensive Research',
          stats: {
            30: { criticalDamage: 4 },
            60: { criticalDamage: 8 },
            100: { criticalDamage: 16 }
          }
        },
        'final-assembly': {
          id: 'final-assembly',
          name: 'Final Assembly',
          stats: {
            30: { penetration: 20 },
            60: { penetration: 40 },
            100: { penetration: 80 }
          }
        },
        'additional-research-i': {
          id: 'additional-research-i',
          name: 'Additional Research I',
          stats: {
            30: { resistCriticalDamage: 3 },
            60: { resistCriticalDamage: 5 },
            100: { resistCriticalDamage: 10 }
          }
        },
        'additional-research-ii': {
          id: 'additional-research-ii',
          name: 'Additional Research II',
          stats: {
            30: { damageReduction: 12 },
            60: { damageReduction: 20 },
            100: { damageReduction: 40 }
          }
        },
        'additional-research-iii': {
          id: 'additional-research-iii',
          name: 'Additional Research III',
          stats: {
            30: { defense: 15 },
            60: { defense: 25 },
            100: { defense: 50 }
          }
        },
        'additional-research-iv': {
          id: 'additional-research-iv',
          name: 'Additional Research IV',
          stats: {
            30: { normalDamageUp: 5 },
            60: { normalDamageUp: 8 },
            100: { normalDamageUp: 15 }
          }
        },
        'additional-research-v': {
          id: 'additional-research-v',
          name: 'Additional Research V',
          stats: {
            30: { criticalDamage: 3 },
            60: { criticalDamage: 5 },
            100: { criticalDamage: 10 }
          }
        },
        'additional-research-vi': {
          id: 'additional-research-vi',
          name: 'Additional Research VI',
          stats: {
            30: { cancelIgnorePenetration: 9 },
            60: { cancelIgnorePenetration: 15 },
            100: { cancelIgnorePenetration: 30 }
          }
        },
        'warrior-of-the-battlefield-i': {
          id: 'warrior-of-the-battlefield-i',
          name: 'Warrior of the Battlefield I',
          stats: {
            30: { cancelIgnorePenetration: 2 },
            60: { cancelIgnorePenetration: 4 },
            100: { cancelIgnorePenetration: 9 }
          }
        },
        'warrior-of-the-battlefield-ii': {
          id: 'warrior-of-the-battlefield-ii',
          name: 'Warrior of the Battlefield II',
          stats: {
            30: { allAttackUp: 4 },
            60: { allAttackUp: 8 },
            100: { allAttackUp: 18 }
          }
        },
        'warrior-of-the-battlefield-iii': {
          id: 'warrior-of-the-battlefield-iii',
          name: 'Warrior of the Battlefield III',
          stats: {
            30: { defense: 6 },
            60: { defense: 12 },
            100: { defense: 24 }
          }
        },
        'warrior-of-the-battlefield-iv': {
          id: 'warrior-of-the-battlefield-iv',
          name: 'Warrior of the Battlefield IV',
          stats: {
            30: { ignoreResistCriticalDamage: 3 },
            60: { ignoreResistCriticalDamage: 6 },
            100: { ignoreResistCriticalDamage: 12 }
          }
        },
        'warrior-of-the-battlefield-v': {
          id: 'warrior-of-the-battlefield-v',
          name: 'Warrior of the Battlefield V',
          stats: {
            30: { ignorePenetration: 5 },
            60: { ignorePenetration: 8 },
            100: { ignorePenetration: 24 }
          }
        },
        'warrior-of-the-battlefield-vi': {
          id: 'warrior-of-the-battlefield-vi',
          name: 'Warrior of the Battlefield VI',
          stats: {
            30: { penetration: 8 },
            60: { penetration: 16 },
            100: { penetration: 32 }
          }
        },
        'core-collection-i': {
          id: 'core-collection-i',
          name: 'Core Collection I',
          stats: {
            30: { ignoreEvasion: 12 },
            60: { ignoreEvasion: 20 },
            100: { ignoreEvasion: 40 }
          }
        },
        'core-collection-ii': {
          id: 'core-collection-ii',
          name: 'Core Collection II',
          stats: {
            30: { ignoreAccuracy: 21 },
            60: { ignoreAccuracy: 35 },
            100: { ignoreAccuracy: 70 }
          }
        },
        'core-collection-iii': {
          id: 'core-collection-iii',
          name: 'Core Collection III',
          stats: {
            30: { ignoreDamageReduction: 6 },
            60: { ignoreDamageReduction: 10 },
            100: { ignoreDamageReduction: 20 }
          }
        },
        'advanced-core-collection-i': {
          id: 'advanced-core-collection-i',
          name: 'Advanced Core Collection I',
          stats: {
            30: { resistCriticalDamage: 2 },
            60: { resistCriticalDamage: 4 },
            100: { resistCriticalDamage: 8 }
          }
        },
        'advanced-core-collection-ii': {
          id: 'advanced-core-collection-ii',
          name: 'Advanced Core Collection II',
          stats: {
            30: { resistSkillAmp: 1 },
            60: { resistSkillAmp: 2 },
            100: { resistSkillAmp: 4 }
          }
        },
        'advanced-core-collection-iii': {
          id: 'advanced-core-collection-iii',
          name: 'Advanced Core Collection III',
          stats: {
            30: { ignorePenetration: 12 },
            60: { ignorePenetration: 20 },
            100: { ignorePenetration: 40 }
          }
        },
        'advanced-core-collection-iv': {
          id: 'advanced-core-collection-iv',
          name: 'Advanced Core Collection IV',
          stats: {
            30: { cancelIgnoreDamageReduction: 12 },
            60: { cancelIgnoreDamageReduction: 20 },
            100: { cancelIgnoreDamageReduction: 40 }
          }
        },
        'core-slot-extender-low': {
          id: 'core-slot-extender-low',
          name: 'Core & Slot Extender (Low)',
          stats: {
            30: { resistSkillAmp: 1 },
            60: { resistSkillAmp: 3 },
            100: { resistSkillAmp: 6 }
          }
        },
        'core-slot-extender-medium': {
          id: 'core-slot-extender-medium',
          name: 'Core & Slot Extender (Medium)',
          stats: {
            30: { resistCriticalDamage: 4 },
            60: { resistCriticalDamage: 8 },
            100: { resistCriticalDamage: 16 }
          }
        },
        'core-slot-extender-high': {
          id: 'core-slot-extender-high',
          name: 'Core & Slot Extender (High)',
          stats: {
            30: { addDamage: 30 },
            60: { addDamage: 100 },
            100: { addDamage: 200 }
          }
        },
        'collect-extractum-medium-i': {
          id: 'collect-extractum-medium-i',
          name: 'Collect Extractum (Medium) I',
          stats: {
            30: { evasion: 18 },
            60: { evasion: 30 },
            100: { evasion: 60 }
          }
        },
        'collect-extractum-medium-ii': {
          id: 'collect-extractum-medium-ii',
          name: 'Collect Extractum (Medium) II',
          stats: {
            30: { evasion: 24 },
            60: { evasion: 40 },
            100: { evasion: 80 }
          }
        },
        'collect-extractum-medium-iii': {
          id: 'collect-extractum-medium-iii',
          name: 'Collect Extractum (Medium) III',
          stats: {
            30: { evasion: 30 },
            60: { evasion: 50 },
            100: { evasion: 100 }
          }
        },
        'collect-extractum-high-i': {
          id: 'collect-extractum-high-i',
          name: 'Collect Extractum (High) I',
          stats: {
            30: { accuracy: 18 },
            60: { accuracy: 30 },
            100: { accuracy: 60 }
          }
        },
        'collect-extractum-high-ii': {
          id: 'collect-extractum-high-ii',
          name: 'Collect Extractum (High) II',
          stats: {
            30: { accuracy: 24 },
            60: { accuracy: 40 },
            100: { accuracy: 80 }
          }
        },
        'collect-extractum-high-iii': {
          id: 'collect-extractum-high-iii',
          name: 'Collect Extractum (High) III',
          stats: {
            30: { accuracy: 30 },
            60: { accuracy: 50 },
            100: { accuracy: 100 }
          }
        },
        'collect-extractum-highest-i': {
          id: 'collect-extractum-highest-i',
          name: 'Collect Extractum (Highest) I',
          stats: {
            30: { pvpDamageReduction: 6 },
            60: { pvpDamageReduction: 10 },
            100: { pvpDamageReduction: 20 }
          }
        },
        'collect-extractum-highest-ii': {
          id: 'collect-extractum-highest-ii',
          name: 'Collect Extractum (Highest) II',
          stats: {
            30: { pvpDamageReduction: 9 },
            60: { pvpDamageReduction: 15 },
            100: { pvpDamageReduction: 30 }
          }
        },
        'collect-extractum-highest-iii': {
          id: 'collect-extractum-highest-iii',
          name: 'Collect Extractum (Highest) III',
          stats: {
            30: { pvpDamageReduction: 12 },
            60: { pvpDamageReduction: 20 },
            100: { pvpDamageReduction: 40 }
          }
        },
        'collect-extractum-ultimate-i': {
          id: 'collect-extractum-ultimate-i',
          name: 'Collect Extractum (Ultimate) I',
          stats: {
            30: { pvpDefense: 18 },
            60: { pvpDefense: 30 },
            100: { pvpDefense: 60 }
          }
        },
        'collect-extractum-ultimate-ii': {
          id: 'collect-extractum-ultimate-ii',
          name: 'Collect Extractum (Ultimate) II',
          stats: {
            30: { pvpDefense: 24 },
            60: { pvpDefense: 40 },
            100: { pvpDefense: 80 }
          }
        },
        'collect-extractum-ultimate-iii': {
          id: 'collect-extractum-ultimate-iii',
          name: 'Collect Extractum (Ultimate) III',
          stats: {
            30: { pvpDefense: 30 },
            60: { pvpDefense: 50 },
            100: { pvpDefense: 100 }
          }
        },
        'option-upgrade-weapon-medium': {
          id: 'option-upgrade-weapon-medium',
          name: 'Option Upgrade - Weapon (Medium)',
          stats: {
            30: { pveAllAttackUp: 3 },
            60: { pveAllAttackUp: 5 },
            100: { pveAllAttackUp: 10 }
          }
        },
        'option-upgrade-helmet-medium': {
          id: 'option-upgrade-helmet-medium',
          name: 'Option Upgrade - Helmet (Medium)',
          stats: {
            30: { pveDefense: 4 },
            60: { pveDefense: 7 },
            100: { pveDefense: 15 }
          }
        },
        'option-upgrade-suit-medium': {
          id: 'option-upgrade-suit-medium',
          name: 'Option Upgrade - Suit (Medium)',
          stats: {
            30: { pveDefense: 4 },
            60: { pveDefense: 7 },
            100: { pveDefense: 15 }
          }
        },
        'option-upgrade-glove-medium': {
          id: 'option-upgrade-glove-medium',
          name: 'Option Upgrade - Glove (Medium)',
          stats: {
            30: { pveDefense: 4 },
            60: { pveDefense: 7 },
            100: { pveDefense: 15 }
          }
        },
        'option-upgrade-boots-medium': {
          id: 'option-upgrade-boots-medium',
          name: 'Option Upgrade - Boots (Medium)',
          stats: {
            30: { pveDefense: 4 },
            60: { pveDefense: 7 },
            100: { pveDefense: 15 }
          }
        },
        'option-upgrade-weapon-high': {
          id: 'option-upgrade-weapon-high',
          name: 'Option Upgrade - Weapon (High)',
          stats: {
            30: { pveAllAttackUp: 6 },
            60: { pveAllAttackUp: 10 },
            100: { pveAllAttackUp: 20 }
          }
        },
        'option-upgrade-helmet-high': {
          id: 'option-upgrade-helmet-high',
          name: 'Option Upgrade - Helmet (High)',
          stats: {
            30: { resistCriticalDamage: 4 },
            60: { resistCriticalDamage: 8 },
            100: { resistCriticalDamage: 16 }
          }
        },
        'option-upgrade-suit-high': {
          id: 'option-upgrade-suit-high',
          name: 'Option Upgrade - Suit (High)',
          stats: {
            30: { resistCriticalDamage: 4 },
            60: { resistCriticalDamage: 8 },
            100: { resistCriticalDamage: 16 }
          }
        },
        'option-upgrade-gloves-high': {
          id: 'option-upgrade-gloves-high',
          name: 'Option Upgrade - Gloves (High)',
          stats: {
            30: { resistSkillAmp: 2 },
            60: { resistSkillAmp: 4 },
            100: { resistSkillAmp: 8 }
          }
        },
        'option-upgrade-boots-high': {
          id: 'option-upgrade-boots-high',
          name: 'Option Upgrade - Boots (High)',
          stats: {
            30: { resistSkillAmp: 2 },
            60: { resistSkillAmp: 4 },
            100: { resistSkillAmp: 8 }
          }
        },
        'ring-i': {
          id: 'ring-i',
          name: 'Ring I',
          stats: {
            30: { ignoreDamageReduction: 4 },
            60: { ignoreDamageReduction: 7 },
            100: { ignoreDamageReduction: 15 }
          }
        },
        'ring-ii': {
          id: 'ring-ii',
          name: 'Ring II',
          stats: {
            30: { pveAllAttackUp: 12 },
            60: { pveAllAttackUp: 20 },
            100: { pveAllAttackUp: 40 }
          }
        },
        'amulet-i': {
          id: 'amulet-i',
          name: 'Amulet I',
          stats: {
            30: { ignoreEvasion: 30 },
            60: { ignoreEvasion: 50 },
            100: { ignoreEvasion: 100 }
          }
        },
        'amulet-ii': {
          id: 'amulet-ii',
          name: 'Amulet II',
          stats: {
            30: { accuracy: 42 },
            60: { accuracy: 70 },
            100: { accuracy: 140 }
          }
        },
        'bracelet-i': {
          id: 'bracelet-i',
          name: 'Bracelet I',
          stats: {
            30: { ignoreEvasion: 35 },
            60: { ignoreEvasion: 60 },
            100: { ignoreEvasion: 120 }
          }
        },
        'bracelet-ii': {
          id: 'bracelet-ii',
          name: 'Bracelet II',
          stats: {
            30: { ignoreDamageReduction: 12 },
            60: { ignoreDamageReduction: 20 },
            100: { ignoreDamageReduction: 40 }
          }
        },
        'earring-i': {
          id: 'earring-i',
          name: 'Earring I',
          stats: {
            30: { evasion: 54 },
            60: { evasion: 90 },
            100: { evasion: 180 }
          }
        },
        'earring-ii': {
          id: 'earring-ii',
          name: 'Earring II',
          stats: {
            30: { ignoreDamageReduction: 15 },
            60: { ignoreDamageReduction: 25 },
            100: { ignoreDamageReduction: 50 }
          }
        },
        'essence-rune-i': {
          id: 'essence-rune-i',
          name: 'Essence Rune I',
          stats: {
            30: { defenseRate: 42 },
            60: { defenseRate: 70 },
            100: { defenseRate: 140 }
          }
        },
        'essence-rune-ii': {
          id: 'essence-rune-ii',
          name: 'Essence Rune II',
          stats: {
            30: { ignoreAccuracy: 27 },
            60: { ignoreAccuracy: 45 },
            100: { ignoreAccuracy: 90 }
          }
        },
        'essence-rune-iii': {
          id: 'essence-rune-iii',
          name: 'Essence Rune III',
          stats: {
            30: { ignoreDamageReduction: 10 },
            60: { ignoreDamageReduction: 17 },
            100: { ignoreDamageReduction: 35 }
          }
        },
        'essence-rune-iv': {
          id: 'essence-rune-iv',
          name: 'Essence Rune IV',
          stats: {
            30: { pveAllAttackUp: 45 },
            60: { pveAllAttackUp: 75 },
            100: { pveAllAttackUp: 150 }
          }
        },
        'mechanical-research-i': {
          id: 'mechanical-research-i',
          name: 'Mechanical Research I',
          stats: {
            30: { resistCriticalDamage: 3 },
            60: { resistCriticalDamage: 5 },
            100: { resistCriticalDamage: 8 }
          }
        },
        'mechanical-research-ii': {
          id: 'mechanical-research-ii',
          name: 'Mechanical Research II',
          stats: {
            30: { resistCriticalDamage: 3 },
            60: { resistCriticalDamage: 5 },
            100: { resistCriticalDamage: 8 }
          }
        },
        'mechanical-research-iii': {
          id: 'mechanical-research-iii',
          name: 'Mechanical Research III',
          stats: {
            30: { resistCriticalDamage: 3 },
            60: { resistCriticalDamage: 5 },
            100: { resistCriticalDamage: 8 }
          }
        },
        'mechanical-design-i': {
          id: 'mechanical-design-i',
          name: 'Mechanical Design I',
          stats: {
            30: { resistSkillAmp: 1 },
            60: { resistSkillAmp: 2 },
            100: { resistSkillAmp: 4 }
          }
        },
        'mechanical-design-ii': {
          id: 'mechanical-design-ii',
          name: 'Mechanical Design II',
          stats: {
            30: { resistSkillAmp: 1 },
            60: { resistSkillAmp: 2 },
            100: { resistSkillAmp: 4 }
          }
        },
        'mechanical-design-iii': {
          id: 'mechanical-design-iii',
          name: 'Mechanical Design III',
          stats: {
            30: { resistSkillAmp: 1 },
            60: { resistSkillAmp: 2 },
            100: { resistSkillAmp: 4 }
          }
        },
        'parts-procurement-i': {
          id: 'parts-procurement-i',
          name: 'Parts Procurement I',
          stats: {
            30: { hp: 35 },
            60: { hp: 75 },
            100: { hp: 150 }
          }
        },
        'parts-procurement-ii': {
          id: 'parts-procurement-ii',
          name: 'Parts Procurement II',
          stats: {
            30: { hp: 35 },
            60: { hp: 75 },
            100: { hp: 150 }
          }
        },
        'parts-procurement-iii': {
          id: 'parts-procurement-iii',
          name: 'Parts Procurement III',
          stats: {
            30: { hp: 35 },
            60: { hp: 75 },
            100: { hp: 150 }
          }
        },
        'machine-assembly-i': {
          id: 'machine-assembly-i',
          name: 'Machine Assembly I',
          stats: {
            30: { pveDefense: 15 },
            60: { pveDefense: 30 },
            100: { pveDefense: 60 }
          }
        },
        'machine-assembly-ii': {
          id: 'machine-assembly-ii',
          name: 'Machine Assembly II',
          stats: {
            30: { pveDefense: 15 },
            60: { pveDefense: 30 },
            100: { pveDefense: 60 }
          }
        },
        'machine-assembly-iii': {
          id: 'machine-assembly-iii',
          name: 'Machine Assembly III',
          stats: {
            30: { pveDefense: 15 },
            60: { pveDefense: 30 },
            100: { pveDefense: 60 }
          }
        },
        'machine-operation-i': {
          id: 'machine-operation-i',
          name: 'Machine Operation I',
          stats: {
            30: { pveIgnorePenetration: 11 },
            60: { pveIgnorePenetration: 22 },
            100: { pveIgnorePenetration: 45 }
          }
        },
        'machine-operation-ii': {
          id: 'machine-operation-ii',
          name: 'Machine Operation II',
          stats: {
            30: { pveIgnorePenetration: 11 },
            60: { pveIgnorePenetration: 22 },
            100: { pveIgnorePenetration: 45 }
          }
        },
        'machine-operation-iii': {
          id: 'machine-operation-iii',
          name: 'Machine Operation III',
          stats: {
            30: { pveIgnorePenetration: 11 },
            60: { pveIgnorePenetration: 22 },
            100: { pveIgnorePenetration: 45 }
          }
        },
        'machine-enhancement-i': {
          id: 'machine-enhancement-i',
          name: 'Machine Enhancement I',
          stats: {
            30: { pveAllAttackUp: 3 },
            60: { pveAllAttackUp: 5 },
            100: { pveAllAttackUp: 8 }
          }
        },
        'machine-enhancement-ii': {
          id: 'machine-enhancement-ii',
          name: 'Machine Enhancement II',
          stats: {
            30: { pveAllAttackUp: 3 },
            60: { pveAllAttackUp: 5 },
            100: { pveAllAttackUp: 8 }
          }
        },
        'machine-enhancement-iii': {
          id: 'machine-enhancement-iii',
          name: 'Machine Enhancement III',
          stats: {
            30: { pveAllAttackUp: 3 },
            60: { pveAllAttackUp: 5 },
            100: { pveAllAttackUp: 8 }
          }
        },
        'combat-combat-i': {
          id: 'combat-combat-i',
          name: 'Combat Combat I',
          stats: {
            30: { pvePenetration: 12 },
            60: { pvePenetration: 25 },
            100: { pvePenetration: 50 }
          }
        },
        'combat-combat-ii': {
          id: 'combat-combat-ii',
          name: 'Combat Combat II',
          stats: {
            30: { pvePenetration: 12 },
            60: { pvePenetration: 25 },
            100: { pvePenetration: 50 }
          }
        },
        'combat-combat-iii': {
          id: 'combat-combat-iii',
          name: 'Combat Combat III',
          stats: {
            30: { pvePenetration: 12 },
            60: { pvePenetration: 25 },
            100: { pvePenetration: 50 }
          }
        },
        'weapon-option-scroll-medium': {
          id: 'weapon-option-scroll-medium',
          name: 'Weapon Option Scroll (Medium)',
          stats: {
            30: { pveIgnoreEvasion: 25 },
            60: { pveIgnoreEvasion: 50 },
            100: { pveIgnoreEvasion: 100 }
          }
        },
        'weapon-option-scroll-high': {
          id: 'weapon-option-scroll-high',
          name: 'Weapon Option Scroll (High)',
          stats: {
            30: { pveAttackRate: 32 },
            60: { pveAttackRate: 65 },
            100: { pveAttackRate: 130 }
          }
        },
        'weapon-option-scroll-highest': {
          id: 'weapon-option-scroll-highest',
          name: 'Weapon Option Scroll (Highest)',
          stats: {
            30: { pveAddDamage: 7 },
            60: { pveAddDamage: 15 },
            100: { pveAddDamage: 30 }
          }
        },
        'weapon-option-scroll-ultimate': {
          id: 'weapon-option-scroll-ultimate',
          name: 'Weapon Option Scroll (Ultimate)',
          stats: {
            30: { pveNormalDamageUp: 3 },
            60: { pveNormalDamageUp: 5 },
            100: { pveNormalDamageUp: 10 }
          }
        },
        'armor-option-scroll-medium': {
          id: 'armor-option-scroll-medium',
          name: 'Armor Option Scroll (Medium)',
          stats: {
            30: { pveIgnoreAccuracy: 27 },
            60: { pveIgnoreAccuracy: 55 },
            100: { pveIgnoreAccuracy: 110 }
          }
        },
        'armor-option-scroll-high': {
          id: 'armor-option-scroll-high',
          name: 'Armor Option Scroll (High)',
          stats: {
            30: { pveDefense: 35 },
            60: { pveDefense: 70 },
            100: { pveDefense: 140 }
          }
        },
        'armor-option-scroll-highest': {
          id: 'armor-option-scroll-highest',
          name: 'Armor Option Scroll (Highest)',
          stats: {
            30: { pveCancelIgnoreDamageReduction: 10 },
            60: { pveCancelIgnoreDamageReduction: 20 },
            100: { pveCancelIgnoreDamageReduction: 40 }
          }
        },
        'armor-option-scroll-ultimate': {
          id: 'armor-option-scroll-ultimate',
          name: 'Armor Option Scroll (Ultimate)',
          stats: {
            30: { pveDefense: 7 },
            60: { pveDefense: 15 },
            100: { pveDefense: 30 }
          }
        },
        'special-accessories': {
          id: 'special-accessories',
          name: 'Special Accessories',
          stats: {
            30: { pveAllAttackUp: 10 },
            60: { pveAllAttackUp: 20 },
            100: { pveAllAttackUp: 50 }
          }
        },
        'magic-tech': {
          id: 'magic-tech',
          name: 'Magic Tech',
          stats: {
            30: { pveDefense: 8 },
            60: { pveDefense: 16 },
            100: { pveDefense: 35 }
          }
        }
      }
    },
    boss: {
      id: 'boss',
      name: 'Boss',
      collections: {
        'retaliation-of-field-boss-i': {
          id: 'retaliation-of-field-boss-i',
          name: 'Retaliation of Field Boss I',
          stats: {
            30: { hp: 60 },
            60: { hp: 100 },
            100: { hp: 200 }
          }
        },
        'retaliation-of-field-boss-ii': {
          id: 'retaliation-of-field-boss-ii',
          name: 'Retaliation of Field Boss II',
          stats: {
            30: { ignorePenetration: 20 },
            60: { ignorePenetration: 35 },
            100: { ignorePenetration: 10 }
          }
        },
        'retaliation-of-field-boss-iii': {
          id: 'retaliation-of-field-boss-iii',
          name: 'Retaliation of Field Boss III',
          stats: {
            30: { allSkillAmp: 2 },
            60: { allSkillAmp: 4 },
            100: { allSkillAmp: 8 }
          }
        },
        'retaliation-of-field-boss-iv': {
          id: 'retaliation-of-field-boss-iv',
          name: 'Retaliation of Field Boss IV',
          stats: {
            30: { penetration: 20 },
            60: { penetration: 40 },
            100: { penetration: 80 }
          }
        },
        
      }
    }
  }
};

// Helper functions
export const getLocationsByCategory = (categoryId: string) => {
  const collections = COLLECTION_DATA.categories[categoryId]?.collections || {};
  return Object.values(collections).map(collection => ({
    id: collection.id,
    name: collection.name
  }));
};

export const getCollectionById = (collectionId: string) => {
  for (const category of Object.values(COLLECTION_DATA.categories)) {
    if (category.collections[collectionId]) {
      return category.collections[collectionId];
    }
  }
  return null;
};

export const getCollectionStatsAtProgress = (collectionId: string, progress: number) => {
  const collection = getCollectionById(collectionId);
  if (!collection) return {};

  // Find the highest progress level that is less than or equal to the current progress
  const progressLevels = Object.keys(collection.stats)
    .map(Number)
    .filter(level => level <= progress)
    .sort((a, b) => b - a);

  if (progressLevels.length === 0) return {};
  
  // Return stats for the highest applicable progress level
  return collection.stats[progressLevels[0] as keyof typeof collection.stats];
};