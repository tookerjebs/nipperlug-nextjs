---
title: "MP Absorb"
category: "utility"
priority: "medium"
formula: "Potential MP Recovery = Damage Dealt × MP Absorb%"
related: ["maxMpStealPerHit", "mp"]
lastUpdated: "2025-01-08"
---

# MP Absorb

Percentage of your damage that can potentially become MP recovery. Has no effect without [Max MP Steal Per Hit](/stats/max-mp-steal-per-hit).

## Overview

MP Absorb determines what percentage of your damage can be converted to MP recovery. However, **without Max MP Steal Per Hit, no MP recovery occurs regardless of MP Absorb value**.

**Two-Step Process**:
1. **MP Absorb**: Calculates potential MP recovery from damage dealt
2. **Max MP Steal Per Hit**: Caps the actual MP recovery received (REQUIRED for any recovery)

**Key Difference from [HP Absorb](/stats/hp-absorb)**: MP steal only works on **one target maximum** per attack, even with AoE skills.

## Practical Examples

**Scenario**: 5% MP Absorb, 50 Max MP Steal Per Hit
- **Hit for 1,000 damage**: Potential recovery = 1,000 × 5% = 50 MP
- **Actual recovery**: 50 MP (not limited by Max MP Steal)

**Scenario**: 5% MP Absorb, 20 Max MP Steal Per Hit  
- **Hit for 1,000 damage**: Potential recovery = 1,000 × 5% = 50 MP
- **Actual recovery**: 20 MP (not enough MP steal per hit for maximum recovery)

## Sources

- **Primary Source**: Essence Rune
- **Secondary Sources**: Pet

## Notes and Tips

- **REQUIRES Max MP Steal Per Hit to work at all**
- **Single target only** - AoE skills don't multiply MP recovery
- Great Quality of life (in combination with Max MP Steal Per Hit) to reduce MP usage

## Related Stats

- [Max MP Steal Per Hit](/stats/max-mp-steal-per-hit) - Limits actual MP recovery received
- [MP](/stats/mp) - Your total mana pool