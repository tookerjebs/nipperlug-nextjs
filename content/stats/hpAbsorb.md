---
title: "HP Absorb"
category: "utility"
priority: "medium"
formula: "Potential Healing = Damage Dealt × HP Absorb%"
related: ["maxHpStealPerHit", "hp"]
lastUpdated: "2025-01-08"
---

# HP Absorb

Percentage of your damage that can potentially become healing. Has no effect without [Max HP Steal Per Hit](/stats/max-hp-steal-per-hit).

## Overview

HP Absorb determines what percentage of your damage can be converted to healing. However, requires **both HP Absorb and Max HP Steal Per Hit** - for any healing to occur.

**Two-Step Process**:
1. **HP Absorb**: Calculates potential healing from damage dealt
2. **Max HP Steal Per Hit**: Caps the actual healing received per target

## Practical Example

**Scenario**: 5% HP Absorb, 50 Max HP Steal Per Hit
- **Hit for 1,000 damage**: Potential healing = 1,000 × 5% = 50 HP
- **Actual healing**: 50 HP per target

**Scenario**: 5% HP Absorb, 20 Max HP Steal Per Hit  
- **Hit for 1,000 damage**: Potential healing = 1,000 × 5% = 50 HP
- **Actual healing**: 20 HP (limited by Max HP Steal Per Hit)

**Scenario**: 10% HP Absorb, 0 Max HP Steal Per Hit
- **Hit for 1,000 damage**: Potential healing = 1,000 × 10% = 100 HP
- **Actual healing**: 0 HP (no healing without Max HP Steal Per Hit)

## Sources

- **Primary Source**: Essence Rune
- **Secondary Sources**: GM Buffs, Pet

## Notes and Tips

- **REQUIRES Max HP Steal Per Hit to work at all**
- Works per target hit (AoE skills can heal from multiple enemies)
- For 1 on 1 fights with Bosses, fast attacking classes benefit more than slower ones

## Related Stats

- [Max HP Steal Per Hit](/stats/max-hp-steal-per-hit) - Limits actual healing received
- [HP](/stats/hp) - Your total health pool