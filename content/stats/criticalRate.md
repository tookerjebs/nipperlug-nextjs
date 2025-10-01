---
title: "Critical Rate"
category: "offensive"
priority: "high"
formula: "Effective Critical Rate = Critical Rate - max(0, Enemy Resist Critical Rate - Ignore Resist Critical Rate)"
related: ["criticalDamage", "ignoreResistCriticalRate", "resistCriticalRate"]
lastUpdated: "2025-01-08"
---

# Critical Rate

Determines the chance of landing a critical hit. Your effective Critical Rate is reduced by enemy Resist Critical Rate, but can be restored with Ignore Resist Critical Rate. Base Critical Chance is **5%**.

## Overview

Critical hits trigger Critical Damage multipliers, significantly increasing your damage output. The base critical chance is 5%, meaning any Critical Rate stat adds to this base value.

## Understanding the Formula

- Your base critical chance starts at 5%
- Critical Rate stat adds directly to this base
- Enemy resistance can reduce your effective critical rate
- Ignore Resist Critical Rate counters enemy resistance

## Example Scenarios

**Basic Example:**
- Critical Rate: 50%
- No enemy resistance
- **Result:** 55% chance to critically hit (base 5% + 50%)

**Against Resistant Enemy:**
- Critical Rate: 50%
- Enemy Resist Critical Rate: 20%
- No Ignore Resist Critical Rate
- **Result:** 35% chance to critically hit (5% + 50% - 20%)

**With Resistance Counter:**
- Critical Rate: 50%
- Enemy Resist Critical Rate: 20%
- Ignore Resist Critical Rate: 15%
- **Result:** 50% chance to critically hit (5% + 50% - max(0, 20% - 15%))

## Sources

Critical Rate can be obtained through:
- **Weapons** - Many weapons have critical rate options
- **Helmets** - Certain helmets provide critical rate
- **Vehicles** - As Epic Option or Slot Option
- **Rings** - Rings are a major source of critical rate
- **Costumes** - Some costume pieces offer critical rate

## Notes and Tips

- Pair with Critical Damage for maximum effectiveness
- Consider enemy resistance in high-end content when building critical rate
- Bosses in end-game dungeons can have up to 50% resist critical rate

## PvE and Pvp Variants

Critical Rate has specialized variants that provide additional crit chance in specific content:

- **PvE Critical Rate**: Bonus critical chance against monsters and NPCs
- **PvP Critical Rate**: Bonus critical chance against other players

**How it works:**
- **PvE Content**: Your total critical rate = Base Critical Rate + PvE Critical Rate
- **PvP Content**: Your total critical rate = Base Critical Rate + PvP Critical Rate

These variants stack additively with your base Critical Rate before being capped by your Max Critical Rate. This gives you higher critical hit chances in their respective content types.

## Related Stats

- [Critical Damage](/stats/critical-damage) - Amplifies damage when critical hits occur
- [Ignore Resist Critical Rate](/stats/ignore-resist-critical-rate) - Counters enemy critical rate resistance  
- [Resist Critical Rate](/stats/resist-critical-rate) - Defensive stat that reduces attacker's critical rate
- [Normal Attack DMG Up](/stats/normal-attack-damage-up) - Alternative damage boost for non-critical hits
