---
title: "Critical Damage"
category: "offensive"
priority: "high"
formula: "Critical Hit Damage = Base Damage × (100 + Effective Critical Damage) / 100"
related: ["criticalRate", "resistCriticalDamage", "ignoreResistCriticalDamage", "normalDamageUp"]
lastUpdated: "2025-01-08"
minValue: 20
isPercentage: true
---

# Critical Damage

Amplifies damage when landing critical hits. Critical Damage has a **base value of 20%** that cannot be reduced below this minimum, meaning all critical hits deal at least 120% of normal damage. Your effective Critical Damage is reduced by enemy Resist Critical Damage, but can be restored with Ignore Resist Critical Damage.

## Overview

When you land a critical hit (determined by [Critical Rate](/stats/critical-rate)), your damage is multiplied by your effective Critical Damage. This creates a significant damage spike that makes critical builds extremely powerful.

**Key Mechanics:**
- Base critical damage is always 20% (cannot be reduced)
- Critical Damage stat adds to this base value
- Enemy [Reist Critical Damage](/stats/resist-critical-damage) can reduce your effective critical damage
- You can counter enemy resist with [Ignore Resist Critical Damage](/stats/ignore-resist-critical-damage)
- Only applies when critical hits occur

## Effective Critical Damage Calculation

The effective Critical Damage calculation follows this priority:

1. **Base Critical Damage:** Always 20% minimum
2. **Your Critical Damage Stat:** Adds to the base
3. **Enemy Resistance:** Reduces your effective critical damage
4. **Ignore Resistance:** Counters enemy resistance

```
Effective Enemy Resist = max(0, Enemy Resist Critical Damage - Your Ignore Resist Critical Damage)
Effective Critical Damage = max(20, Your Critical Damage - Effective Enemy Resist)
```

## Example Scenarios

**Basic Example:**
- Critical Damage: 80%
- No enemy resistance
- **Result:** 100% critical damage (20% base + 80% stat)
- **Damage:** 200% of normal damage on critical hits

**Against Resistant Enemy:**
- Critical Damage: 80%
- Enemy Resist Critical Damage: 30%
- No Ignore Resist Critical Damage
- **Result:** 70% critical damage (20% base + 80% - 30%)
- **Damage:** 170% of normal damage on critical hits

**With Resistance Counter:**
- Critical Damage: 80%
- Enemy Resist Critical Damage: 30%
- Ignore Resist Critical Damage: 25%
- **Result:** 95% critical damage (20% base + 80% - max(0, 30% - 25%))
- **Damage:** 195% of normal damage on critical hits

**Minimum Protection:**
- Critical Damage: 30% (very low)
- Enemy Resist Critical Damage: 50% (very high)
- **Result:** 20% critical damage (protected by minimum base)
- **Damage:** 120% of normal damage on critical hits

## Typical Values

Critical Damage values vary significantly based on build focus:

- **Minimum Effective:** 20% (base protection)
- **Early Game Target:** 50-200%
- **Mid Game Target:** 200-600%
- **End Game Target:** >600%
- **Maximum Practical:** No hard cap, but diminishing returns vs. cost

## Sources

- **Primary Sources** - Most Equipment Pieces with their various upgrades (Chaos, Divine, Extreme, Option Slots)
- **Secondary Sources** - A large number of progression systems available in-game
- **Temporary Buffs** - GM Buffs, Critical Potions, Other Temporary Buffs (Platinum Buffs, etc.)

## Notes and Tips

- **Synergy is Key:** Critical Damage is less effective without sufficient Critical Rate
- **Base Protection:** The 20% base, that can not be bypassed
- **Resistance Matters:** High-end enemies always have critical damage resistance
- **Cost vs. Benefit:** Extremely high critical damage has diminishing returns
- **Build Balance:** Consider Normal Damage Up for non-critical hits in PvP scenarios

## Related Stats

- [Critical Rate](/stats/critical-rate) - Determines how often critical damage applies
- [Resist Critical Damage](/stats/resist-critical-damage) - Enemy defensive stat that reduces your critical damage
- [Ignore Resist Critical Damage](/stats/ignore-resist-critical-damage) - Counters enemy critical damage resistance
- [Normal Damage Up](/stats/normal-damage-up) - Alternative damage boost for non-critical hits

## Class-Specific Notes

**All Classes:**
- Critical Damage works identically for all classes
- Both sword and magic classes benefit equally from critical damage
- Force Classes naturally offer more base critical damage via their class bonuses.

## Advanced Mechanics

**Resistance Interaction:**
- Ignore Resist Critical Damage can only reduce enemy resistance to 0
- Cannot create "negative resistance" for bonus damage
- Enemy resistance is applied after your critical damage stat
- The 20% base is protected and cannot be reduced by any resistance

## PvE and Pvp Variants

Critical Damage has specialized variants that provide additional critical damage in specific content:

- **PvE Critical Damage**: Bonus critical damage against monsters and NPCs
- **PvP Critical Damage**: Bonus critical damage against other players

**How it works:**
- **PvE Content**: Your total critical damage = Base Critical Damage + PvE Critical Damage
- **PvP Content**: Your total critical damage = Base Critical Damage + PvP Critical Damage

These variants stack additively with your base Critical Damage before enemy resistance is applied. This gives you significantly higher critical hit damage in their respective content types.