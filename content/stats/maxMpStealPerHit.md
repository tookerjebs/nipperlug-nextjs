---
title: "Max MP Steal Per Hit"
category: "utility"
priority: "medium"
formula: "Actual MP Recovery = min(Potential MP Recovery, Max MP Steal Per Hit)"
related: ["mpAbsorb", "mp"]
lastUpdated: "2025-01-08"
---

# Max MP Steal Per Hit

Maximum MP recovery possible per attack.

## Overview

Max MP Steal Per Hit is essential for the MP steal mechanic. Both MP Absorb AND Max MP Steal Per Hit are required. 

**Key Difference**: MP steal only affects **one target maximum** per attack, unlike HP steal which works on all targets hit.

## Practical Examples

### Example 1: No Max MP Steal = No Recovery
**Stats**: 10% MP Absorb, 0 Max MP Steal Per Hit
- **Hit for 1,000 damage**: Potential = 100 MP, **Actual = 0 MP**
- **Result**: No recovery occurs despite having MP Absorb

### Example 2: Cap Applied
**Stats**: 5% MP Absorb, 20 Max MP Steal Per Hit
- **Hit for 1,000 damage**: Potential = 50 MP, Actual = 20 MP
- **Result**: Recovery limited by Max MP Steal Per Hit

### Example 3: Cap Not Reached
**Stats**: 3% MP Absorb, 100 Max MP Steal Per Hit
- **Hit for 1,000 damage**: Potential = 30 MP, Actual = 30 MP
- **Result**: MP Absorb is the limiting factor

### Example 4: AoE Scenario (Key Difference)
**Stats**: 5% MP Absorb, 40 Max MP Steal Per Hit
- **Hit 3 enemies for 800 damage each**: 
- **Recovery**: 40 MP total (only from 1 target, not 3 like HP steal)
- **Limitation**: Single target recovery regardless of enemies hit

## Sources

- **Primary Source**: Accessories (Earrings)

## Notes and Tips

- **MANDATORY** for MP steal to work - 0 value = no recovery
- MP Absorb is useless without this stat
- **Single target limitation** - AoE doesn't multiply recovery
- Great Quality of life (in combination with MP Absorb) to reduce MP usage

## Related Stats

- [MP Absorb](/stats/mp-absorb) - Determines potential MP recovery percentage (useless without Max MP Steal)
- [MP](/stats/mp) - Your total mana pool