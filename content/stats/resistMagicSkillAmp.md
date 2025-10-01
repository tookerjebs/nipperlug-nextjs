---
title: "Resist Magic Skill Amp"
category: "defensive"
priority: "medium"
formula: "Effective Enemy Skill Amp = max(0, Enemy Magic Skill Amp - Your Resist Magic Skill Amp)"
related: ["magicSkillAmp", "resistSkillAmp", "ignoreResistSkillAmp"]
lastUpdated: "2025-01-08"
isPercentage: true
variants: ["pvp", "pve"]
---

# Resist Magic Skill Amp

Reduces incoming damage from magic-based classes by lowering their effective Magic Skill Amplification. This defensive stat specifically counters magic skill amplification, making it valuable against Wizard, Dark Mage, Force Archer, and Force Gunner opponents.

## Overview

Resist Magic Skill Amp directly reduces the effectiveness of enemy magic skill amplification. When an enemy attacks you, their effective skill amplification is reduced by your resistance:

**Effective Enemy Skill Amp = max(0, Enemy Total Skill Amp - Your Resist Magic Skill Amp)**

Where Enemy Total Skill Amp = Enemy Skill Amp + Enemy Magic Skill Amp + Enemy All Skill Amp

The enemy's Ignore Resist Skill Amp can counter your resistance, but only down to 0 (cannot create negative resistance).

## Understanding the Formula

The resistance calculation follows this priority:

1. **Enemy's Total Skill Amp:** Their Magic Skill Amp + Skill Amp + All Skill Amp combined
2. **Your Resistance:** Reduces their effective amplification
3. **Enemy's Ignore Resistance:** Counters your resistance

## Example Scenarios

**Basic Defense:**
- Enemy Magic Skill Amp: 400%
- Your Resist Magic Skill Amp: 120%
- Enemy Ignore Resist Skill Amp: 0%
- **Result:** Enemy effective skill amp reduced to 280%
- **Damage Reduction:** Significant reduction in incoming magic damage

**Against Ignore Resistance:**
- Enemy Magic Skill Amp: 400%
- Your Resist Magic Skill Amp: 120%
- Enemy Ignore Resist Skill Amp: 80%
- **Result:** Enemy effective skill amp reduced to 360% (400% - (120% - 80%))
- **Damage Reduction:** Partial resistance, but still meaningful

## Sources

## Notes and Tips

## Related Stats

- [Magic Skill Amp](/stats/magic-skill-amp) - The offensive stat this resistance counters
- [Resist Skill Amp](/stats/resist-skill-amp) - General skill amplification resistance that affects all classes
- [Ignore Resist Skill Amp](/stats/ignore-resist-skill-amp) - Enemy stat that counters your resistance

**PvP vs. PvE Variants:**
- PvP Resist Magic Skill Amp only works against players
- PvE Resist Magic Skill Amp only works against monsters