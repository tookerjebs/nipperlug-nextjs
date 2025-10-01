---
title: "Resist Sword Skill Amp"
category: "defensive"
priority: "medium"
formula: "Effective Enemy Skill Amp = max(0, Enemy Sword Skill Amp - Your Resist Sword Skill Amp)"
related: ["swordSkillAmp", "resistSkillAmp", "ignoreResistSkillAmp"]
lastUpdated: "2025-01-08"
isPercentage: true
variants: ["pvp", "pve"]
---

# Resist Sword Skill Amp

Reduces incoming damage from sword-based attaks by lowering their effective Sword Skill Amplification. This defensive stat specifically counters sword skill amplification, making it valuable against Blader, Warrior, Gladiator, Force Blader, and Force Shielder opponents.

## Overview

Resist Sword Skill Amp directly reduces the effectiveness of enemy sword skill amplification. When an enemy attacks you, their effective skill amplification is reduced by your resistance:

**Effective Enemy Skill Amp = max(0, Enemy Total Skill Amp - Your Resist Sword Skill Amp)**

Where Enemy Total Skill Amp = Enemy Skill Amp + Enemy Sword Skill Amp + Enemy All Skill Amp

The enemy's Ignore Resist Skill Amp can counter your resistance, but only down to 0 (cannot create negative resistance).

## Understanding the Formula

The resistance calculation follows this priority:

1. **Enemy's Total Skill Amp:** Their Sword Skill Amp + Skill Amp + All Skill Amp combined
2. **Your Resistance:** Reduces their effective amplification
3. **Enemy's Ignore Resistance:** Counters your resistance

## Example Scenarios

**Against Ignore Resistance:**
- Enemy Sword Skill Amp: 300%
- Your Resist Sword Skill Amp: 100%
- Enemy Ignore Resist Skill Amp: 60%
- **Result:** Enemy effective skill amp reduced to 240% (300% - (100% - 60%))
- **Damage Reduction:** Partial resistance, but still meaningful

**Maximum Resistance:**
- Enemy Sword Skill Amp: 200%
- Your Resist Sword Skill Amp: 250%
- Enemy Ignore Resist Skill Amp: 0%
- **Result:** Enemy effective skill amp reduced to 0%
- **Damage Reduction:** Maximum possible reduction from skill amplification

## Sources

## Notes and Tips

## Related Stats

- [Sword Skill Amp](/stats/sword-skill-amp) - The offensive stat this resistance counters
- [Resist Skill Amp](/stats/resist-skill-amp) - General skill amplification resistance that affects all classes
- [Ignore Resist Skill Amp](/stats/ignore-resist-skill-amp) - Enemy stat that counters your resistance


**PvP vs. PvE Variants:**
- PvP Resist Sword Skill Amp only works against players
- PvE Resist Sword Skill Amp only works against monsters
- Base Resist Sword Skill Amp works against both
- All three stack together for maximum protection
