---
title: "Max HP Steal Per Hit"
category: "utility"
priority: "medium"
formula: "Actual Healing = min(Potential Healing, Max HP Steal Per Hit)"
related: ["hpAbsorb", "hp"]
lastUpdated: "2025-01-08"
---

# Max HP Steal Per Hit

Maximum healing possible per attack, per target.

## Overview

Max HP Steal Per Hit is essential for the HP steal mechanic. Both [HP Absorb](/stats/hp-absorb) AND Max HP Steal Per Hit are required:

**Healing Calculation**:
1. **Calculate Potential**: Damage × HP Absorb%
2. **Apply Cap**: min(Potential Healing, Max HP Steal Per Hit)
3. **If Max HP Steal = 0**: No healing occurs, even with HP Absorb

## Practical Examples

### Example 1: No Max HP Steal = No Healing
**Stats**: 10% HP Absorb, 0 Max HP Steal Per Hit
- **Hit for 1,000 damage**: Potential = 100 HP, **Actual = 0 HP**
- **Result**: No healing occurs despite having HP Absorb

### Example 2: Cap Applied
**Stats**: 5% HP Absorb, 20 Max HP Steal Per Hit
- **Hit for 1,000 damage**: Potential = 50 HP, Actual = 20 HP
- **Result**: Healing limited by Max HP Steal Per Hit

### Example 3: Cap Not Reached
**Stats**: 3% HP Absorb, 100 Max HP Steal Per Hit
- **Hit for 1,000 damage**: Potential = 30 HP, Actual = 30 HP
- **Result**: HP Absorb is the limiting factor

### Example 4: AoE Scenario
**Stats**: 5% HP Absorb, 40 Max HP Steal Per Hit
- **Hit 3 enemies for 800 damage each**: 
- **Per enemy**: Potential = 40 HP, Actual = 40 HP
- **Total healing**: 120 HP (40 × 3 targets)

## Sources

- **Primary Source**: Accessories (Earrings) and their Chaos Upgrades
- **Secondary Sources**: Master Craft Shoes, Option Slots, Pet, a few progression systems
- **Temporary Boosts**: GM Buffs

## Notes and Tips

- Works per target (AoE skills multiply healing potential)
- Higher values allow better scaling with high damage builds
- Balance with HP Absorb percentage for optimal sustain

## Related Stats

- [HP Absorb](/stats/hp-absorb) - Determines potential healing percentage (useless without Max HP Steal)
- [HP](/stats/hp) - Your total health pool