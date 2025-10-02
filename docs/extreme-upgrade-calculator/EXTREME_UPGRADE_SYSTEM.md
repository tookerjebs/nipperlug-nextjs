# Extreme Upgrade System Documentation

## Overview

Extreme Upgrade is a high-risk, high-reward equipment enhancement system in Cabal Online that uses Extreme Cores as the primary material. Unlike other upgrade systems, it has no "safe points" and can result in item breakage or complete reset (server-dependent).

## Core Components

### 1. Extreme Cores

**Levels**: 1-12  
**Core Power Values**:
- Level 1: 1 power
- Level 2: 2 power
- Level 3: 3 power
- Level 4: 4 power
- Level 5: 8 power
- Level 6: 10 power
- Level 7: 12 power
- Level 8: 20 power
- Level 9: 24 power
- Level 10: 36 power
- Level 11: 42 power
- Level 12: 48 power

**Sources**:
- Extreme Core Pockets (Normal, Rare, Epic, Unique, Premium)
- Events
- NPC Chloe craft
- Cash Shop

### 2. Upgrade Results

Three possible outcomes when attempting an extreme upgrade:

1. **Success**: Extreme level increases by 1
2. **Broken**: Item becomes broken, needs repair kit to use again but the extreme level remains intact
3. **Reset**: Extreme level resets to 0 *(Note: PlayCabal server has disabled this outcome)*

### 3. Success Rate Calculation

**Formula**: `SuccessRate = (Factor × SumCorePower) / (100 × BaseLevel)`

Where:
- **Factor**: Based on current extreme level and item type
- **SumCorePower**: Total power level of all cores used in the attempt
- **BaseLevel**: Server and item type specific modifier

#### Factor Values

**For 1-Handed Weapons, Armor, and Vehicles (Bikes)**:
- Extreme Level 1: Factor = 2
- Extreme Level 2: Factor = 3
- Extreme Level 3: Factor = 4
- Extreme Level 4: Factor = 5
- Extreme Level 5: Factor = 6
- Extreme Level 6: Factor = 6
- Extreme Level 7: Factor = 6

**For 2-Handed Weapons**:
- Extreme Level 1: Factor = 2
- Extreme Level 2: Factor = 3
- Extreme Level 3: Factor = 4
- Extreme Level 4: Factor = 5
- Extreme Level 5: Factor = 6
- Extreme Level 6: Factor = 6
- Extreme Level 7: Factor = 6

#### Base Level Values

**PlayCabal Server**:

*1-Handed Weapons, Armor, Vehicles (Bikes)*:
- Extreme Level 1: Base Level = 2
- Extreme Level 2: Base Level = 12
- Extreme Level 3: Base Level = 36
- Extreme Level 4: Base Level = 180
- Extreme Level 5: Base Level = 360
- Extreme Level 6: Base Level = 370
- Extreme Level 7: Base Level = 400

*2-Handed Weapons*:
- Extreme Level 1: Base Level = 3
- Extreme Level 2: Base Level = 18
- Extreme Level 3: Base Level = 54
- Extreme Level 4: Base Level = 270
- Extreme Level 5: Base Level = 290
- Extreme Level 6: Base Level = 350
- Extreme Level 7: Base Level = 400

**Other Servers (Standard)**:

*1-Handed Weapons, Armor, Vehicles (Bikes)*:
- Extreme Level 1: Base Level = 2
- Extreme Level 2: Base Level = 12
- Extreme Level 3: Base Level = 36
- Extreme Level 4: Base Level = 80
- Extreme Level 5: Base Level = 180
- Extreme Level 6: Base Level = 180
- Extreme Level 7: Base Level = 180

*2-Handed Weapons*:
- Extreme Level 1: Base Level = 3
- Extreme Level 2: Base Level = 18
- Extreme Level 3: Base Level = 54
- Extreme Level 4: Base Level = 120
- Extreme Level 5: Base Level = 270
- Extreme Level 6: Base Level = 270
- Extreme Level 7: Base Level = 270

### 3. Item Grade
Different item grades have different maximum extreme levels:
- **Ultimate**: Max Level 7
- **Highest**: Max Level 5
- **High**: Max Level 3
- **Normal**: Max Level 2

## Stat Bonuses by Equipment Type

### Weapons (One-Handed)
- **Level 1**: +20 All Attack, +50 Attack Rate
- **Level 2**: +60 All Attack, +120 Attack Rate, +80 Accuracy
- **Level 3**: +100 All Attack, +190 Attack Rate, +140 Accuracy, +7% Critical Damage
- **Level 4**: +130 All Attack, +270 Attack Rate, +200 Accuracy, +15% Critical Damage, +30 Penetration
- **Level 5**: +160 All Attack, +360 Attack Rate, +260 Accuracy, +23% Critical Damage, +55 Penetration
- **Level 6**: +200 All Attack, +460 Attack Rate, +330 Accuracy, +31% Critical Damage, +80 Penetration
- **Level 7**: +250 All Attack, +600 Attack Rate, +420 Accuracy, +40% Critical Damage, +110 Penetration

### Weapons (Two-Handed)
- **Level 1**: +40 All Attack, +100 Attack Rate
- **Level 2**: +120 All Attack, +240 Attack Rate, +160 Accuracy
- **Level 3**: +200 All Attack, +380 Attack Rate, +280 Accuracy, +14% Critical Damage
- **Level 4**: +260 All Attack, +540 Attack Rate, +400 Accuracy, +30% Critical Damage, +60 Penetration
- **Level 5**: +320 All Attack, +720 Attack Rate, +520 Accuracy, +46% Critical Damage, +110 Penetration
- **Level 6**: +400 All Attack, +920 Attack Rate, +660 Accuracy, +62% Critical Damage, +160 Penetration
- **Level 7**: +500 All Attack, +1200 Attack Rate, +840 Accuracy, +80% Critical Damage, +220 Penetration

### Armor (Universal for all armor pieces)
- **Level 1**: +20 Defense, +30 Defense Rate
- **Level 2**: +50 Defense, +90 Defense Rate, +12 Damage Reduction
- **Level 3**: +80 Defense, +130 Defense Rate, +24 Damage Reduction, +3% All Skill Amp
- **Level 4**: +110 Defense, +170 Defense Rate, +25 Ignore Penetration, +36 Damage Reduction, +6% All Skill Amp
- **Level 5**: +140 Defense, +210 Defense Rate, +50 Ignore Penetration, +48 Damage Reduction, +9% All Skill Amp
- **Level 6**: +180 Defense, +260 Defense Rate, +75 Ignore Penetration, +60 Damage Reduction, +12% All Skill Amp
- **Level 7**: +230 Defense, +320 Defense Rate, +100 Ignore Penetration, +75 Damage Reduction, +16% All Skill Amp

### Vehicles (Bikes)
- **Level 1**: +30 Defense, +40 Defense Rate
- **Level 2**: +80 Defense, +100 Defense Rate, +120 Accuracy
- **Level 3**: +120 Defense, +160 Defense Rate, +240 Accuracy, +4% All Skill Amp
- **Level 4**: +160 Defense, +220 Defense Rate, +360 Accuracy, +7% All Skill Amp, +50 Penetration
- **Level 5**: +200 Defense, +280 Defense Rate, +480 Accuracy, +10% All Skill Amp, +100 Penetration, +60 Ignore Penetration
- **Level 6**: +250 Defense, +350 Defense Rate, +600 Accuracy, +13% All Skill Amp, +150 Penetration, +90 Ignore Penetration

## Repair System

When an item becomes broken, it can be repaired using repair kits:

- **Bronze Repair Kit**: 90% success rate, 10% item destruction chance
- **Silver Repair Kit**: 50% success rate, 50% no effect
- **Gold Repair Kit**: 100% success rate

**Repair Kit Sources**:
- Repair Kit Boxes (craftable at NPC Chloe)
- Premium Repair Kit Boxes (Cash Shop)
- Events

## Sealing System

Extreme upgrades can be sealed and transferred between compatible items:

### Seal Stone Types
- **Normal Seal Stone**: Can seal Extreme Level 2 only
- **Master Seal Stone**: Can seal Extreme Level 3-7
- **Level 1 cannot be sealed**

### Sealing Rules
- Can only transfer to items with Extreme Level 0
- Cannot override existing extreme upgrades
- Must be compatible item type (weapon to weapon, armor to armor)
- Cannot seal from broken items
- Target item must support the extreme level being transferred

### Seal Stone Sources
- Premium DX Dungeons (Elite versions):
  - (Elite) Panic Cave (Premium)
  - (Elite) Catacombs Frost (Premium)
  - (Elite) Lava Hellfire (Premium)
  - (Elite) Steamer Crazy (Premium)
- Events

## Upgrade Costs

Upgrade costs vary by extreme level and item type:

### One-Handed Weapons
- Level 1: 10,000,000 Alz + 2 Extreme Cores
- Level 2: 20,000,000 Alz + 4 Extreme Cores
- Level 3: 30,000,000 Alz + 6 Extreme Cores
- Level 4: 40,000,000 Alz + 8 Extreme Cores
- Level 5: 50,000,000 Alz + 10 Extreme Cores
- Level 6: 60,000,000 Alz + 10 Extreme Cores
- Level 7: 70,000,000 Alz + 10 Extreme Cores

### Two-Handed Weapons
- Level 1: 20,000,000 Alz + 3 Extreme Cores
- Level 2: 40,000,000 Alz + 6 Extreme Cores
- Level 3: 60,000,000 Alz + 9 Extreme Cores
- Level 4: 80,000,000 Alz + 12 Extreme Cores
- Level 5: 100,000,000 Alz + 15 Extreme Cores
- Level 6: 120,000,000 Alz + 15 Extreme Cores
- Level 7: 140,000,000 Alz + 15 Extreme Cores

### Armor
- Level 1: 10,000,000 Alz + 2 Extreme Cores
- Level 2: 20,000,000 Alz + 4 Extreme Cores
- Level 3: 30,000,000 Alz + 6 Extreme Cores
- Level 4: 40,000,000 Alz + 8 Extreme Cores
- Level 5: 50,000,000 Alz + 10 Extreme Cores
- Level 6: 60,000,000 Alz + 10 Extreme Cores
- Level 7: 70,000,000 Alz + 10 Extreme Cores

### Vehicles (Bikes)
- Level 1: 20,000,000 Alz + 2 Extreme Cores
- Level 2: 40,000,000 Alz + 4 Extreme Cores
- Level 3: 60,000,000 Alz + 6 Extreme Cores
- Level 4: 80,000,000 Alz + 8 Extreme Cores
- Level 5: 100,000,000 Alz + 10 Extreme Cores
- Level 6: 120,000,000 Alz + 10 Extreme Cores
- Level 7: 140,000,000 Alz + 10 Extreme Cores

## Server Differences

### PlayCabal Server
- **Reset outcome disabled**: Items cannot have their extreme level reset to 0
- **Higher base levels**: More difficult success rates for levels 4+ compared to standard servers
- **Only Success or Broken outcomes**

### Standard Servers
- **Reset outcome enabled**: Items can have their extreme level reset to 0 on failure
- **Lower base levels**: Easier success rates for levels 4+ compared to PlayCabal
- **Three possible outcomes**: Success, Broken, or Reset

## Calculator Implementation Notes

The extreme upgrade calculator should support:

1. **Server Selection**: Toggle between Other and Standard server mechanics
2. **Success Rate Calculation**: Real-time calculation based on core combinations
3. **Cost Analysis**: Total Alz and core costs for upgrade attempts
4. **Expected Value Calculations**: Statistical analysis of costs to reach target levels
5. **Core Optimization**: Suggest optimal core combinations for desired success rates
6. **Risk Assessment**: Show probabilities for all possible outcomes
7. **Multi-attempt Simulation**: Calculate costs and probabilities for multiple upgrade attempts

## References

- [PlayCabal Wiki - Extreme Upgrade](https://wiki.playcabal.to/content/systems/upgrading/extreme-upgrade)
- [Mr. Wormy - Extreme Upgrade Guide](https://mrwormy.com/extreme-upgrade/)
- Build Planner extreme upgrade data files