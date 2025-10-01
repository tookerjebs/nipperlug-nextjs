---
title: "Penetration"
category: "offensive"
priority: "high"
formula: "Final Defense Reduction = Base Defense Reduction × (1 - Penetration/Defense)"
related: ["cancelIgnorePenetration", "ignorePenetration", "defense"]
variants: ["pvp", "pve"]
lastUpdated: "2025-01-08"
---

# Penetration

Reduces enemy [Defense](/stats/defense) effectiveness.

## Overview

Penetration works by reducing the effectiveness of enemy [Defense](/stats/defense). The final defense reduction has minimum and maximum caps.

Your penetration is reduced by enemy [Ignore Penetration](/stats/ignore-penetration) on a 1:1 ratio , but can be restored with [Cancel Ignore Penetration](/stats/cancel-ignore-penetration) on the same 1:1 basis.

The exact interaction between Defense and Petentration has not been officially confirmed, but this [Penetration Effectiveness Table](/penetration-effectiveness-table/) shows a good approximation of how it works.

## Example

Against an enemy with 1000 [Defense](/stats/defense):
- **0 Penetration:** Enemy takes ~50% reduced damage from their defense
- **500 Penetration:** Enemy takes ~25% reduced damage from their defense  
- **1000 Penetration:** Enemy takes ~0% reduced damage from their defense

Against Turmacan (6250 [Defense](/stats/defense)):
- **0 Penetration:** Enemy takes ~86% reduced damage from their defense
- **3000 Penetration:** Enemy takes ~52% reduced damage from their defense
- **5000 Penetration:** Enemy takes ~17% reduced damage from their defense

## Sources

- **Primary Source:** Equipment and their various upgrades, option slots
- **Secondary Sources:** Many progression systems throughout the game
- **Temporary Boosts:** GM Buffs, Penetration Potions

## PvE and PvP Variants

Penetration has specialized variants that provide additional effectiveness in specific content:

- **PvE Penetration**: Bonus penetration against monsters and NPCs
- **PvP Penetration**: Bonus penetration against other players

**How it works:**
- **PvE Content**: Your total penetration = Base Penetration + PvE Penetration
- **PvP Content**: Your total penetration = Base Penetration + PvP Penetration

These variants stack additively with your base Penetration, giving you higher defense reduction in their respective content types.

## Notes and Tips

- **Defense Dependent:** Effectiveness depends on enemy [Defense](/stats/defense) values
- **High Defense Priority:** Higher [Defense](/stats/defense) enemies make penetration more valuable
- **Resistance Matters:** High-end PvP/PvE enemies often have high [Ignore Penetration](/stats/ignore-penetration)
- **Significant Impact:** Provides substantial damage increases in most scenarios

## Related Stats

- [Cancel Ignore Penetration](/stats/cancel-ignore-penetration) - Preserves your penetration effectiveness
- [Ignore Penetration](/stats/ignore-penetration) - Defensive stat that reduces attacker's penetration  
- [Defense](/stats/defense) - The stat that Penetration interacts with
