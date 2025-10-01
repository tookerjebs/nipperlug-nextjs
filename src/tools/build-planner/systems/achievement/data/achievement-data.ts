// Achievement data for the build planner system - Real Cabal Online achievements only
export const achievementData = {
  "Dungeon": {
    "name": "Dungeon",
    "achievements": {
      "forgotten-temple-b1f": {
        "name": "Forgotten Temple B1F",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "hp": 4 } },
          { "threshold": 500, "stats": { "hp": 6 } },
          { "threshold": 1000, "stats": { "hp": 8 } },
          { "threshold": 5000, "stats": { "hp": 12 } }
        ]
      },
      "forgotten-temple-b2f": {
        "name": "Forgotten Temple B2F",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "accuracy": 5 } },
          { "threshold": 500, "stats": { "accuracy": 10 } },
          { "threshold": 1000, "stats": { "accuracy": 15 } },
          { "threshold": 5000, "stats": { "accuracy": 20 } }
        ]
      },
      "forgotten-temple-b3f": {
        "name": "Forgotten Temple B3F",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "allAttackUp": 4 } },
          { "threshold": 500, "stats": { "allAttackUp": 6, "penetration": 3 } },
          { "threshold": 1000, "stats": { "allAttackUp": 8, "penetration": 5 } },
          { "threshold": 5000, "stats": { "allAttackUp": 12, "penetration": 7 } }
        ]
      },
      "lake-in-dusk": {
        "name": "Lake in Dusk",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "partyExp": 1 } },
          { "threshold": 500, "stats": { "partyExp": 1 } },
          { "threshold": 1000, "stats": { "partyExp": 1 } },
          { "threshold": 2000, "stats": { "partyExp": 2 } }
        ]
      },
      "ruina-station": {
        "name": "Ruina Station",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "exp": 1 } },
          { "threshold": 500, "stats": { "exp": 1 } },
          { "threshold": 1000, "stats": { "exp": 1 } },
          { "threshold": 2000, "stats": { "exp": 2 } }
        ]
      },
      "volcanic-citadel": {
        "name": "Volcanic Citadel",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "defense": 1 } },
          { "threshold": 500, "stats": { "defense": 1 } },
          { "threshold": 1000, "stats": { "defense": 1 } },
          { "threshold": 3000, "stats": { "defense": 2 } }
        ]
      },
      "chaos-arena-lv1": {
        "name": "Chaos Arena Lv. 1",
        "type": "single",
        "stats": { "hp": 4 }
      },
      "chaos-arena-lv2": {
        "name": "Chaos Arena Lv. 2",
        "type": "single",
        "stats": { "hp": 6 }
      },
      "chaos-arena-lv3": {
        "name": "Chaos Arena Lv. 3",
        "type": "single",
        "stats": { "hp": 8 }
      },
      "illusion-castle-underworld": {
        "name": "Illusion Castle - Underworld",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "defenseRate": 2 } },
          { "threshold": 500, "stats": { "defenseRate": 4 } },
          { "threshold": 1000, "stats": { "defenseRate": 6 } },
          { "threshold": 5000, "stats": { "defenseRate": 8 } }
        ]
      },
      "illusion-castle-radiant": {
        "name": "Illusion Castle - Radiant Hall",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "attackRate": 2 } },
          { "threshold": 500, "stats": { "attackRate": 4 } },
          { "threshold": 1000, "stats": { "attackRate": 6 } },
          { "threshold": 5000, "stats": { "attackRate": 8 } }
        ]
      },
      "illusion-castle-underworld-apocrypha": {
        "name": "Illusion Castle - Underworld (Apocrypha)",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "resistSuppression": 1 } },
          { "threshold": 500, "stats": { "resistSuppression": 1 } },
          { "threshold": 1000, "stats": { "resistSuppression": 1 } },
          { "threshold": 5000, "stats": { "resistSuppression": 2 } }
        ]
      },
      "illusion-castle-radiant-apocrypha": {
        "name": "Illusion Castle - Radiant Hall (Apocrypha)",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "resistSilence": 1 } },
          { "threshold": 500, "stats": { "resistSilence": 1 } },
          { "threshold": 1000, "stats": { "resistSilence": 1 } },
          { "threshold": 5000, "stats": { "resistSilence": 2 } }
        ]
      },
      "forgotten-temple-b2f-awakening": {
        "name": "Forgotten Temple B2F (Awakening)",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "resistCriticalDamage": 2 } },
          { "threshold": 500, "stats": { "resistCriticalDamage": 2 } },
          { "threshold": 1000, "stats": { "resistCriticalDamage": 2 } },
          { "threshold": 5000, "stats": { "resistCriticalDamage": 2 } }
        ]
      },
      "weakened-lake-in-dusk": {
        "name": "Weakened Lake in Dusk",
        "type": "single",
        "stats": { "honourPoint": 2 }
      },
      "weakened-ruina-station": {
        "name": "Weakened Ruina Station",
        "type": "single",
        "stats": { "alzBombChance": 5 }
      },
      "weakened-tower-of-the-dead-b1f": {
        "name": "Weakened Tower of the Dead B1F",
        "type": "single",
        "stats": { "skillExp": 2 }
      },
      "chaos-arena-lv4": {
        "name": "Chaos Arena Lv. 4",
        "type": "single",
        "stats": { "defenseRate": 7 }
      },
      "chaos-arena-lv5": {
        "name": "Chaos Arena Lv. 5",
        "type": "single",
        "stats": { "defenseRate": 10 }
      },
      "chaos-arena-lv6": {
        "name": "Chaos Arena Lv. 6",
        "type": "milestone",
        "milestones": [
          { "threshold": 10, "stats": { "attackRate": 3 } },
          { "threshold": 100, "stats": { "attackRate": 5 } },
          { "threshold": 1000, "stats": { "attackRate": 7 } }
        ]
      },
      "chaos-arena-lv7": {
        "name": "Chaos Arena Lv. 7",
        "type": "milestone",
        "milestones": [
          { "threshold": 10, "stats": { "attackRate": 4 } },
          { "threshold": 100, "stats": { "attackRate": 8 } },
          { "threshold": 1000, "stats": { "attackRate": 13 } }
        ]
      },
      "eternal-chaos-arena": {
        "name": "Eternal Chaos Arena",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "defenseRate": 2 } },
          { "threshold": 500, "stats": { "ignoreAccuracy": 4, "defenseRate": 4 } },
          { "threshold": 1000, "stats": { "ignoreAccuracy": 6, "defenseRate": 6 } },
          { "threshold": 3000, "stats": { "ignoreAccuracy": 8, "defenseRate": 8 } }
        ]
      },
      "glacies-inferna": {
        "name": "Glacies Inferna",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "allAttackUp": 1, "ignorePenetration": 2 } },
          { "threshold": 500, "stats": { "allAttackUp": 2, "ignorePenetration": 4, "ignoreDamageReduction": 2 } },
          { "threshold": 1000, "stats": { "allAttackUp": 3, "ignorePenetration": 6, "ignoreDamageReduction": 6 } },
          { "threshold": 3000, "stats": { "allAttackUp": 4, "ignorePenetration": 8, "ignoreDamageReduction": 8 } }
        ]
      },
      "tower-of-the-dead-b1f": {
        "name": "Tower of the Dead B1F",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "mp": 2 } },
          { "threshold": 500, "stats": { "mp": 4 } },
          { "threshold": 1000, "stats": { "mp": 6 } },
          { "threshold": 3000, "stats": { "mp": 8 } }
        ]
      },
      "tower-of-the-dead-b2f": {
        "name": "Tower of the Dead B2F",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "maxHpStealPerHit": 1 } },
          { "threshold": 500, "stats": { "maxHpStealPerHit": 1 } },
          { "threshold": 1000, "stats": { "maxHpStealPerHit": 1 } },
          { "threshold": 3000, "stats": { "maxHpStealPerHit": 2 } }
        ]
      },
      "tower-of-the-dead-b3f-part2": {
        "name": "Tower of the Dead B3F (Part 2)",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "ignoreEvasion": 5 } },
          { "threshold": 500, "stats": { "ignoreEvasion": 8 } },
          { "threshold": 1000, "stats": { "ignoreEvasion": 12 } },
          { "threshold": 5000, "stats": { "ignoreEvasion": 15 } }
        ]
      },
      "tower-of-the-dead-b3f": {
        "name": "Tower of the Dead B3F",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "resistSkillAmp": 1, "resistCriticalDamage": 2 } },
          { "threshold": 500, "stats": { "resistSkillAmp": 1, "resistCriticalDamage": 2 } },
          { "threshold": 1000, "stats": { "resistSkillAmp": 1, "resistCriticalDamage": 2 } },
          { "threshold": 5000, "stats": { "resistSkillAmp": 1, "resistCriticalDamage": 2 } }
        ]
      },
      "forbidden-island": {
        "name": "Forbidden Island",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "evasion": 5 } },
          { "threshold": 500, "stats": { "evasion": 10 } },
          { "threshold": 1000, "stats": { "evasion": 15 } },
          { "threshold": 5000, "stats": { "evasion": 20 } }
        ]
      },
      "forbidden-island-awakening": {
        "name": "Forbidden Island (Awakening)",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "resistSkillAmp": 1 } },
          { "threshold": 500, "stats": { "resistSkillAmp": 1 } },
          { "threshold": 1000, "stats": { "resistSkillAmp": 1 } },
          { "threshold": 5000, "stats": { "resistSkillAmp": 1 } }
        ]
      },
      "altar-of-siena-b1f": {
        "name": "Altar of Siena B1F",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "hpAutoHeal": 1 } },
          { "threshold": 500, "stats": { "hpAutoHeal": 1 } },
          { "threshold": 1000, "stats": { "hpAutoHeal": 1 } },
          { "threshold": 5000, "stats": { "hpAutoHeal": 2 } }
        ]
      },
      "altar-of-siena-b2f": {
        "name": "Altar of Siena B2F",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "addDamage": 2 } },
          { "threshold": 500, "stats": { "addDamage": 4 } },
          { "threshold": 1000, "stats": { "addDamage": 6 } },
          { "threshold": 5000, "stats": { "addDamage": 8 } }
        ]
      },
      "pandemonium": {
        "name": "Pandemonium",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "ignoreEvasion": 4 } },
          { "threshold": 500, "stats": { "ignoreEvasion": 6 } },
          { "threshold": 1000, "stats": { "ignoreEvasion": 8 } },
          { "threshold": 5000, "stats": { "ignoreEvasion": 12 } }
        ]
      },
      "maquinas-outpost": {
        "name": "Maquinas Outpost",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "damageReduction": 1 } },
          { "threshold": 500, "stats": { "damageReduction": 2 } },
          { "threshold": 1000, "stats": { "damageReduction": 3 } },
          { "threshold": 5000, "stats": { "damageReduction": 4 } }
        ]
      },
      "acheron-arena": {
        "name": "Acheron Arena",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "defense": 2 } },
          { "threshold": 500, "stats": { "defense": 3 } },
          { "threshold": 1000, "stats": { "defense": 4 } },
          { "threshold": 5000, "stats": { "defense": 6 } }
        ]
      },
      "edge-of-phantom": {
        "name": "Edge of Phantom",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "normalDamageUp": 1 } },
          { "threshold": 500, "stats": { "normalDamageUp": 1 } },
          { "threshold": 1000, "stats": { "normalDamageUp": 2 } },
          { "threshold": 5000, "stats": { "normalDamageUp": 3 } }
        ]
      },
      "devils-tower": {
        "name": "Devil's Tower",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "ignoreAccuracy": 4 } },
          { "threshold": 500, "stats": { "ignoreAccuracy": 6 } },
          { "threshold": 1000, "stats": { "ignoreAccuracy": 8 } },
          { "threshold": 2000, "stats": { "ignoreAccuracy": 12 } }
        ]
      },
      "devils-tower-part2": {
        "name": "Devil's Tower (Part 2)",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "ignorePenetration": 2 } },
          { "threshold": 500, "stats": { "ignorePenetration": 3 } },
          { "threshold": 1000, "stats": { "ignorePenetration": 4 } },
          { "threshold": 2000, "stats": { "ignorePenetration": 6 } }
        ]
      },
      "panic-cave-hard": {
        "name": "Panic Cave (Hard)",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "hp": 3 } },
          { "threshold": 500, "stats": { "hp": 5 } },
          { "threshold": 1000, "stats": { "hp": 7 } }
        ]
      },
      "crazy-steamer-hard": {
        "name": "Crazy Steamer (Hard)",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "hp": 3 } },
          { "threshold": 500, "stats": { "hp": 5 } },
          { "threshold": 1000, "stats": { "hp": 7 } }
        ]
      },
      "catacombs-frost-hard": {
        "name": "Catacombs Frost (Hard)",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "hp": 3 } },
          { "threshold": 500, "stats": { "hp": 5 } },
          { "threshold": 1000, "stats": { "hp": 7 } }
        ]
      },
      "lava-hellfire-hard": {
        "name": "Lava Hellfire (Hard)",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "hp": 3 } },
          { "threshold": 500, "stats": { "hp": 5 } },
          { "threshold": 1000, "stats": { "hp": 7 } }
        ]
      },
      "hazardous-valley-hard": {
        "name": "Hazardous Valley (Hard)",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "defense": 1 } },
          { "threshold": 500, "stats": { "defense": 1 } },
          { "threshold": 1000, "stats": { "defense": 2 } },
          { "threshold": 5000, "stats": { "defense": 3 } }
        ]
      },
      "panic-cave-premium": {
        "name": "Panic Cave (Premium)",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "hp": 10 } },
          { "threshold": 500, "stats": { "resistKnockback": 2 } },
          { "threshold": 1000, "stats": { "allSkillAmp": 1 } }
        ]
      },
      "crazy-steamer-premium": {
        "name": "Crazy Steamer (Premium)",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "hp": 10 } },
          { "threshold": 500, "stats": { "resistDown": 2 } },
          { "threshold": 1000, "stats": { "criticalDmg": 2 } }
        ]
      },
      "catacombs-frost-premium": {
        "name": "Catacombs Frost (Premium)",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "hp": 10 } },
          { "threshold": 500, "stats": { "resistStun": 2 } },
          { "threshold": 1000, "stats": { "allSkillAmp": 1 } }
        ]
      },
      "lava-hellfire-premium": {
        "name": "Lava Hellfire (Premium)",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "hp": 10 } },
          { "threshold": 500, "stats": { "resistUnableToMove": 1 } },
          { "threshold": 1000, "stats": { "criticalDmg": 2 } }
        ]
      },
      "lava-hellfire-awakening": {
        "name": "Lava Hellfire (Awakening)",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "allAttackUp": 1 } },
          { "threshold": 500, "stats": { "allAttackUp": 1 } },
          { "threshold": 1000, "stats": { "allAttackUp": 2 } },
          { "threshold": 5000, "stats": { "allAttackUp": 3 } }
        ]
      },
      "panic-cave-awakening": {
        "name": "Panic Cave (Awakening)",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "allAttackUp": 1 } },
          { "threshold": 500, "stats": { "allAttackUp": 1 } },
          { "threshold": 1000, "stats": { "allAttackUp": 2 } },
          { "threshold": 5000, "stats": { "allAttackUp": 3 } }
        ]
      },
      "steamer-crazy-awakening": {
        "name": "Steamer Crazy (Awakening)",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "defense": 1 } },
          { "threshold": 500, "stats": { "defense": 2 } },
          { "threshold": 1000, "stats": { "defense": 3 } },
          { "threshold": 5000, "stats": { "defense": 4 } }
        ]
      },
      "catacombs-frost-awakening": {
        "name": "Catacombs Frost (Awakening)",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "defense": 1 } },
          { "threshold": 500, "stats": { "defense": 2 } },
          { "threshold": 1000, "stats": { "defense": 3 } },
          { "threshold": 5000, "stats": { "defense": 4 } }
        ]
      },
      "hazardous-valley-awakening": {
        "name": "Hazardous Valley (Awakening)",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "allAttackUp": 1 } },
          { "threshold": 500, "stats": { "allAttackUp": 2 } },
          { "threshold": 1000, "stats": { "allAttackUp": 4 } },
          { "threshold": 5000, "stats": { "allAttackUp": 5 } }
        ]
      },
      "flame-nest": {
        "name": "Flame Nest",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "hp": 10, "attackRate": 10 } },
          { "threshold": 500, "stats": { "hp": 15, "attackRate": 15 } },
          { "threshold": 1000, "stats": { "hp": 20, "attackRate": 22 } },
          { "threshold": 5000, "stats": { "hp": 25, "attackRate": 33 } }
        ]
      },
      "ancient-tomb": {
        "name": "Ancient Tomb",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "hp": 10, "allAttackUp": 1 } },
          { "threshold": 500, "stats": { "hp": 15, "allAttackUp": 2 } },
          { "threshold": 1000, "stats": { "hp": 20, "allAttackUp": 3 } },
          { "threshold": 5000, "stats": { "hp": 25, "allAttackUp": 4 } }
        ]
      },
      "frozen-canyon": {
        "name": "Frozen Canyon",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "hp": 10, "defense": 10 } },
          { "threshold": 500, "stats": { "hp": 15, "defense": 15 } },
          { "threshold": 1000, "stats": { "hp": 20, "defense": 22 } },
          { "threshold": 5000, "stats": { "hp": 25, "defense": 33 } }
        ]
      },
      "terminus-machina": {
        "name": "Terminus Machina",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "hp": 10, "defense": 2 } },
          { "threshold": 500, "stats": { "hp": 15, "defense": 4 } },
          { "threshold": 1000, "stats": { "hp": 20, "defense": 6 } },
          { "threshold": 5000, "stats": { "hp": 25, "defense": 12 } }
        ]
      },
      "labyrinth": {
        "name": "Labyrinth",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "defense": 10, "criticalDmg": 2 } },
          { "threshold": 500, "stats": { "defense": 10, "cancelIgnorePenetration": 5 } },
          { "threshold": 1000, "stats": { "cancelIgnorePenetration": 10, "criticalDmg": 3 } }
        ]
      },
      "mirage-island": {
        "name": "Mirage Island",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "ignoreResistCriticalDamage": 2 } },
          { "threshold": 500, "stats": { "ignoreResistSkillAmp": 1 } },
          { "threshold": 1000, "stats": { "ignoreResistCriticalDamage": 2, "ignoreResistSkillAmp": 1 } },
          { "threshold": 5000, "stats": { "ignoreResistCriticalDamage": 2, "ignoreResistSkillAmp": 1 } }
        ]
      },
      "mirage-island-awakening": {
        "name": "Mirage Island (Awakening)",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "pveDefense": 3, "cancelIgnorePenetration": 1 } },
          { "threshold": 500, "stats": { "pveDefense": 7, "cancelIgnorePenetration": 3, "resistCriticalDamage": 2 } },
          { "threshold": 1500, "stats": { "pveDefense": 10, "cancelIgnorePenetration": 6, "resistCriticalDamage": 3 } },
          { "threshold": 5000, "stats": { "pveDefense": 20, "cancelIgnorePenetration": 10, "resistCriticalDamage": 5 } }
        ]
      },
      "abandoned-city": {
        "name": "Abandoned City",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "criticalDmg": 1 } },
          { "threshold": 500, "stats": { "criticalDmg": 1 } },
          { "threshold": 1000, "stats": { "criticalDmg": 1, "allSkillAmp": 1 } },
          { "threshold": 5000, "stats": { "criticalDmg": 1, "allSkillAmp": 1 } }
        ]
      },
      "holia-windhill": {
        "name": "Holia Windhill",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "hp": 5 } },
          { "threshold": 500, "stats": { "hp": 10 } },
          { "threshold": 1000, "stats": { "hp": 15 } }
        ]
      },
      "holia-keldrasil": {
        "name": "Holia Keldrasil",
        "type": "milestone",
        "milestones": [
          { "threshold": 100, "stats": { "hp": 10 } },
          { "threshold": 500, "stats": { "hp": 15 } },
          { "threshold": 1000, "stats": { "hp": 20 } }
        ]
      }
    }
  },
  "PvP": {
    "name": "PvP",
    "achievements": {}
  },
  "Hunting": {
    "name": "Hunting",
    "achievements": {
      "virulent-cauda": {
        "name": "Virulent Cauda",
        "type": "milestone",
        "milestones": [
          { "threshold": 10, "stats": {} },
          { "threshold": 50, "stats": { "hp": 2 } },
          { "threshold": 100, "stats": { "hp": 3 } }
        ]
      },
      "ancient-cockatrice": {
        "name": "Ancient Cockatrice",
        "type": "milestone",
        "milestones": [
          { "threshold": 10, "stats": {} },
          { "threshold": 50, "stats": { "hp": 2 } },
          { "threshold": 100, "stats": { "hp": 3 } }
        ]
      },
      "distichous-mongrel": {
        "name": "Distichous Mongrel",
        "type": "milestone",
        "milestones": [
          { "threshold": 10, "stats": {} },
          { "threshold": 50, "stats": { "hp": 2 } },
          { "threshold": 100, "stats": { "hp": 3 } }
        ]
      },
      "monakus-karrion": {
        "name": "Monakus Karrion",
        "type": "milestone",
        "milestones": [
          { "threshold": 10, "stats": {} },
          { "threshold": 50, "stats": { "hp": 2 } },
          { "threshold": 100, "stats": { "hp": 3 } }
        ]
      },
      "berderk-faello": {
        "name": "Berderk Faello",
        "type": "milestone",
        "milestones": [
          { "threshold": 10, "stats": {} },
          { "threshold": 50, "stats": { "hp": 2 } },
          { "threshold": 100, "stats": { "hp": 3 } }
        ]
      },
      "ma-06-quadra": {
        "name": "MA-06 Quadra",
        "type": "milestone",
        "milestones": [
          { "threshold": 10, "stats": {} },
          { "threshold": 50, "stats": { "hp": 3 } },
          { "threshold": 100, "stats": { "hp": 5 } }
        ]
      },
      "ta-01-gravis-rota": {
        "name": "TA-01 Gravis Rota",
        "type": "milestone",
        "milestones": [
          { "threshold": 10, "stats": {} },
          { "threshold": 50, "stats": { "hp": 3 } },
          { "threshold": 100, "stats": { "hp": 5 } }
        ]
      },
      "umd-03-lautus-pluma": {
        "name": "UMD-03 Lautus Pluma",
        "type": "milestone",
        "milestones": [
          { "threshold": 10, "stats": {} },
          { "threshold": 50, "stats": { "hp": 3 } },
          { "threshold": 100, "stats": { "hp": 5 } }
        ]
      },
      "fp-01-magnus-penna": {
        "name": "FP-01 Magnus Penna",
        "type": "milestone",
        "milestones": [
          { "threshold": 10, "stats": {} },
          { "threshold": 50, "stats": { "hp": 3 } },
          { "threshold": 100, "stats": { "hp": 5 } }
        ]
      },
      "manticore": {
        "name": "Manticore",
        "type": "milestone",
        "milestones": [
          { "threshold": 10, "stats": {} },
          { "threshold": 50, "stats": { "defense": 1 } },
          { "threshold": 100, "stats": { "defense": 2 } }
        ]
      },
      "dark-kimzark": {
        "name": "Dark Kimzark",
        "type": "milestone",
        "milestones": [
          { "threshold": 10, "stats": {} },
          { "threshold": 50, "stats": { "defense": 1 } },
          { "threshold": 100, "stats": { "defense": 2 } }
        ]
      },
      "keshapone-minisha": {
        "name": "Keshapone Minisha",
        "type": "milestone",
        "milestones": [
          { "threshold": 10, "stats": {} },
          { "threshold": 50, "stats": { "defense": 1 } },
          { "threshold": 100, "stats": { "defense": 2 } }
        ]
      },
      "awakened-nola-ispita": {
        "name": "Awakened Nola Ispita (Golden Queen)",
        "type": "single",
        "stats": { "alzDropAmount": 10 }
      },
      "awakened-leth-tyrant": {
        "name": "Awakened Leth Tyrant (Berserker)",
        "type": "single",
        "stats": { "hpAutoHeal": 5 }
      },
      "giant-wolf-leader": {
        "name": "Giant Wolf Leader",
        "type": "milestone",
        "milestones": [
          { "threshold": 10, "stats": {} },
          { "threshold": 50, "stats": { "defense": 1 } },
          { "threshold": 100, "stats": { "defense": 2 } }
        ]
      },
      "enthlud": {
        "name": "Enthlud",
        "type": "milestone",
        "milestones": [
          { "threshold": 10, "stats": {} },
          { "threshold": 50, "stats": { "defense": 1 } },
          { "threshold": 100, "stats": { "defense": 2 } }
        ]
      },
      "margonos": {
        "name": "Margonos",
        "type": "milestone",
        "milestones": [
          { "threshold": 1, "stats": { "hp": 2 } },
          { "threshold": 5, "stats": { "hp": 3 } },
          { "threshold": 10, "stats": { "hp": 5 } }
        ]
      },
      "ragno": {
        "name": "Ragno",
        "type": "milestone",
        "milestones": [
          { "threshold": 1, "stats": { "defense": 1 } },
          { "threshold": 5, "stats": { "defense": 2 } },
          { "threshold": 10, "stats": { "defense": 3 } }
        ]
      },
      "urhorn": {
        "name": "Urhorn",
        "type": "milestone",
        "milestones": [
          { "threshold": 1, "stats": { "damageReduction": 1 } },
          { "threshold": 5, "stats": { "damageReduction": 2 } },
          { "threshold": 10, "stats": { "damageReduction": 3 } }
        ]
      },
      "set": {
        "name": "Set",
        "type": "milestone",
        "milestones": [
          { "threshold": 1, "stats": { "ignoreAccuracy": 3 } },
          { "threshold": 5, "stats": { "ignoreAccuracy": 5 } },
          { "threshold": 10, "stats": { "ignoreAccuracy": 7 } }
        ]
      },
      "james": {
        "name": "James",
        "type": "milestone",
        "milestones": [
          { "threshold": 1, "stats": { "ignoreEvasion": 3 } },
          { "threshold": 5, "stats": { "ignoreEvasion": 5 } },
          { "threshold": 10, "stats": { "ignoreEvasion": 7 } }
        ]
      },
      "zaken": {
        "name": "Zaken",
        "type": "milestone",
        "milestones": [
          { "threshold": 1, "stats": { "allAttackUp": 2 } },
          { "threshold": 5, "stats": { "allAttackUp": 3 } },
          { "threshold": 10, "stats": { "allAttackUp": 5 } }
        ]
      },
      "gustav-zg": {
        "name": "Gustav_Zg",
        "type": "milestone",
        "milestones": [
          { "threshold": 1, "stats": { "hp": 10 } },
          { "threshold": 5, "stats": { "hp": 15 } },
          { "threshold": 10, "stats": { "ignoreDamageReduction": 10 } }
        ]
      },
      "hell-rider": {
        "name": "Hell Rider",
        "type": "milestone",
        "milestones": [
          { "threshold": 1, "stats": { "defense": 4 } },
          { "threshold": 5, "stats": { "defense": 5 } },
          { "threshold": 10, "stats": { "ignoreResistCriticalDamage": 2 } }
        ]
      },
      "arcane-golem": {
        "name": "Arcane Golem",
        "type": "milestone",
        "milestones": [
          { "threshold": 1, "stats": { "ignorePenetration": 3 } },
          { "threshold": 5, "stats": { "ignorePenetration": 4 } },
          { "threshold": 10, "stats": { "ignoreResistSkillAmp": 1 } }
        ]
      },
      "kelosus": {
        "name": "Kelosus",
        "type": "milestone",
        "milestones": [
          { "threshold": 1, "stats": { "defense": 10 } },
          { "threshold": 5, "stats": { "ignorePenetration": 8 } },
          { "threshold": 10, "stats": { "criticalDmg": 2 } }
        ]
      },
      "kargos": {
        "name": "Kargos",
        "type": "milestone",
        "milestones": [
          { "threshold": 1, "stats": { "hp": 25 } },
          { "threshold": 5, "stats": { "damageReduction": 8 } },
          { "threshold": 10, "stats": { "cancelIgnorePenetration": 5 } }
        ]
      }
    }
  },
  "Items": {
    "name": "Items",
    "achievements": {}
  },
  "Mission War": {
    "name": "Mission War",
    "achievements": {

      "honour-grade-10": {
        "name": "Honour Grade 10",
        "type": "single",
        "stats": { "hp": 60 }
      },
      "honour-grade-11": {
        "name": "Honour Grade 11",
        "type": "single",
        "stats": { "hp": 60 }
      },
      "honour-grade-12": {
        "name": "Honour Grade 12",
        "type": "single",
        "stats": { "hp": 60 }
      },
      "honour-grade-13": {
        "name": "Honour Grade 13",
        "type": "single",
        "stats": { "hp": 60, "resistCriticalRate": 1, "resistCriticalDamage": 3 }
      },
      "honour-grade-14": {
        "name": "Honour Grade 14",
        "type": "single",
        "stats": { "hp": 60, "resistCriticalRate": 1, "resistCriticalDamage": 3 }
      },
      "honour-grade-15": {
        "name": "Honour Grade 15",
        "type": "single",
        "stats": { "hp": 60, "resistCriticalRate": 2, "resistCriticalDamage": 6, "resistStun": 4, "resistKnockback": 4, "resistDown": 4 }
      },
      "honour-grade-16": {
        "name": "Honour Grade 16",
        "type": "single",
        "stats": { "hp": 60, "resistCriticalRate": 2, "resistCriticalDamage": 6, "resistStun": 4, "resistKnockback": 4, "resistDown": 4, "resistUnableToMove": 6 }
      },
      "honour-grade-17": {
        "name": "Honour Grade 17",
        "type": "single",
        "stats": { "hp": 60, "resistCriticalRate": 2, "resistCriticalDamage": 6, "resistStun": 4, "resistKnockback": 4, "resistDown": 4, "resistUnableToMove": 6 }
      },
      "honour-grade-18": {
        "name": "Honour Grade 18",
        "type": "single",
        "stats": { "hp": 60, "resistCriticalRate": 2, "resistCriticalDamage": 6, "resistStun": 4, "resistKnockback": 4, "resistDown": 4, "resistUnableToMove": 6 }
      },
      "honour-grade-19": {
        "name": "Honour Grade 19",
        "type": "single",
        "stats": { "hp": 60, "resistCriticalRate": 2, "resistCriticalDamage": 6, "resistStun": 6, "resistKnockback": 6, "resistDown": 6, "resistUnableToMove": 6 }
      },
      "honour-grade-20": {
        "name": "Honour Grade 20",
        "type": "single",
        "stats": { "hp": 60, "resistCriticalRate": 2, "resistCriticalDamage": 6, "resistSkillAmp": 1, "resistSuppression": 2, "resistSilence": 2 }
      },
      "kill-opposite-nation-players": {
        "name": "Kill Opposite Nation Players",
        "type": "milestone",
        "milestones": [
          { "threshold": 30, "stats": { "hp": 10 } },
          { "threshold": 50, "stats": { "defense": 2 } },
          { "threshold": 100, "stats": { "hp": 20 } },
          { "threshold": 200, "stats": { "defense": 3 } },
          { "threshold": 300, "stats": { "hp": 40 } },
          { "threshold": 500, "stats": { "defense": 5 } },
          { "threshold": 700, "stats": { "hp": 80 } },
          { "threshold": 1000, "stats": { "defense": 7 } },
          { "threshold": 2000, "stats": { "allAttackUp": 3 } },
          { "threshold": 3000, "stats": { "defense": 8 } },
          { "threshold": 5000, "stats": { "allAttackUp": 5 } },
          { "threshold": 7500, "stats": { "allAttackUp": 7 } },
          { "threshold": 10000, "stats": { "resistCriticalDamage": 2 } },
          { "threshold": 20000, "stats": { "resistSkillAmp": 1 } },
          { "threshold": 30000, "stats": { "resistCriticalDamage": 4 } },
          { "threshold": 50000, "stats": { "resistSkillAmp": 2 } },
          { "threshold": 75000, "stats": { "resistCriticalDamage": 4 } },
          { "threshold": 100000, "stats": { "resistSkillAmp": 2 } }
        ]
      },
      "kill-legacy-guardian-l-hunter-lv2-10": {
        "name": "Kill Legacy Guardian (L) Hunter Lv. 2 (10)",
        "type": "single",
        "stats": { "hp": 20 }
      },
      "kill-legacy-guardian-l-hunter-lv3-100": {
        "name": "Kill Legacy Guardian (L) Hunter Lv. 3 (100)",
        "type": "single",
        "stats": { "defense": 3 }
      },
      "kill-legacy-guardian-m-hunter-lv2-10": {
        "name": "Kill Legacy Guardian (M) Hunter Lv. 2 (10)",
        "type": "single",
        "stats": { "hp": 10 }
      },
      "kill-legacy-guardian-m-hunter-lv3-100": {
        "name": "Kill Legacy Guardian (M) Hunter Lv. 3 (100)",
        "type": "single",
        "stats": { "defense": 2 }
      },
      "kill-legacy-guardian-s-hunter-lv2-10": {
        "name": "Kill Legacy Guardian (S) Hunter Lv. 2 (10)",
        "type": "single",
        "stats": { "hp": 5 }
      },
      "kill-legacy-guardian-s-hunter-lv3-100": {
        "name": "Kill Legacy Guardian (S) Hunter Lv. 3 (100)",
        "type": "single",
        "stats": { "defense": 1 }
      },
      "sages-ensign-destroyer": {
        "name": "Sage's Ensign Destroyer",
        "type": "milestone",
        "milestones": [
          { "threshold": 1, "stats": { "allAttackUp": 1 } },
          { "threshold": 10, "stats": { "allAttackUp": 2 } },
          { "threshold": 100, "stats": { "allAttackUp": 3 } }
        ]
      }
    }
  },
  "Quests": {
    "name": "Quests",
    "achievements": {
      "hidden-helper-t-is-watching-you": {
        "name": "Hidden Helper T is Watching You",
        "type": "single",
        "stats": { "alzBombChance": 2 }
      },
      "colony-trainee": {
        "name": "Colony Trainee",
        "type": "single",
        "stats": { "skillExp": 1 }
      },
      "colony-graduate": {
        "name": "Colony Graduate",
        "type": "single",
        "stats": { "honourPoint": 2 }
      },
      "open-the-era-of-humans": {
        "name": "Open the Era of Humans",
        "type": "single",
        "stats": { "hp": 50, "honourPoint": 1 }
      },
      "chief-obstructer": {
        "name": "Chief Obstructer",
        "type": "single",
        "stats": { "skillExp": 1 }
      },
      "chief-chaser": {
        "name": "Chief Chaser",
        "type": "single",
        "stats": { "skillExp": 1 }
      },
      "chief-hunter": {
        "name": "Chief Hunter",
        "type": "single",
        "stats": { "skillExp": 1 }
      },
      "chief-nemesis": {
        "name": "Chief Nemesis",
        "type": "single",
        "stats": { "skillExp": 2 }
      },
      "chief-sovereign": {
        "name": "Chief Sovereign",
        "type": "single",
        "stats": { "skillExp": 2 }
      }
    }
  },
  "Shared": {
    "name": "Shared Achievements",
    "achievements": {
      "combine-level-200": {
        "name": "Combine Level 200",
        "type": "single",
        "stats": {}
      },
      "combine-level-400": {
        "name": "Combine Level 400",
        "type": "single",
        "stats": { "hp": 50, "exp": 1, "petExp": 1, "skillExp": 1, "partyExp": 1 }
      },
      "combine-level-600": {
        "name": "Combine Level 600",
        "type": "single",
        "stats": { "hp": 50, "exp": 1, "petExp": 1, "skillExp": 1, "partyExp": 1 }
      },
      "combine-level-800": {
        "name": "Combine Level 800",
        "type": "single",
        "stats": { "hp": 50, "exp": 1, "petExp": 1, "skillExp": 1, "partyExp": 1 }
      },
      "combine-level-1000": {
        "name": "Combine Level 1000",
        "type": "single",
        "stats": { "hp": 50, "exp": 1, "petExp": 1, "skillExp": 1, "partyExp": 1, "accuracy": 10, "evasion": 10 }
      },
      "combine-level-1200": {
        "name": "Combine Level 1200",
        "type": "single",
        "stats": { "hp": 50, "exp": 1, "petExp": 1, "skillExp": 1, "partyExp": 1, "accuracy": 20, "evasion": 20, "attackRate": 10, "defenseRate": 10, "defense": 10, "damageReduction": 10 }
      },
      "combine-level-1400": {
        "name": "Combine Level 1400",
        "type": "single",
        "stats": { "hp": 50, "exp": 2, "petExp": 2, "skillExp": 2, "partyExp": 2, "accuracy": 30, "evasion": 30, "attackRate": 20, "defenseRate": 20, "defense": 10, "damageReduction": 10, "ignorePenetration": 10 }
      },
      "combine-level-1600": {
        "name": "Combine Level 1600",
        "type": "single",
        "stats": { "hp": 100, "exp": 3, "petExp": 3, "skillExp": 3, "partyExp": 3, "accuracy": 30, "evasion": 40, "attackRate": 20, "defenseRate": 20, "defense": 20, "damageReduction": 10, "ignorePenetration": 10 }
      }
    }
  },
  "Normal": {
    "name": "Normal",
    "achievements": {}
  }
};