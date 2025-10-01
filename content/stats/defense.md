---
title: "Defense"
category: "defensive"
priority: "high"
formula: "Defense Reduction = 1 - 1000/(1000 + Defense)"
isPercentage: false
variants: ["pvp", "pve"]
related: ["defenseRate", "damageReduction", "penetration", "ignorePenetration", "cancelIgnorePenetration"]
lastUpdated: "2025-01-08"
---

# Defense

Primary defensive stat that provides percentage-based damage reduction against incoming attacks.

## Overview

Defense reduces incoming damage. The following formula provides a good estimate for Defense's impact: 

**Defense Reduction = 1 - 1000/(1000 + Defense)**

This formula creates diminishing returns, meaning each additional point of Defense provides less benefit than the previous point. The system is designed to prevent complete damage immunity while still providing meaningful protection.

## Defense Formula Breakdown

```
Base Defense Reduction = 1 - 1000/(1000 + Defense)
Maximum Defense Reduction = 95% (hard cap)
Minimum Defense Reduction = 0.3% 
```

**Example Calculations:**
- **1,000 Defense:** 50% damage reduction
- **4,000 Defense:** 80% damage reduction  
- **9,000 Defense:** 90% damage reduction
- **19,000 Defense:** 95% damage reduction (cap reached)

## Typical Values

Please Note: These values can be increased further with various temporary buffs

- **Early Game:** 0-2,000
- **Mid Game:** 2,000-6,000
- **End Game:** 6,000+

## Penetration Interaction

Defense effectiveness is reduced by enemy **[Penetration](/stats/penetration)**.

## Sources

- **Primary Source:** Armor, Vehicles, Accessories and their various upgrades (Divine, Extreme, Chaos)
- **Secondary Sources:** Passive Skills, various progression systems, Force Shielder class bonuses
- **Temporary Boosts:** GM Buffs, other temporary buffs (Platinum Buff, etc.)

## PvE and PvP Variants

Defense has specialized variants that provide additional protection in specific content:

- **PvE Defense**: Bonus defense against monsters and NPCs
- **PvP Defense**: Bonus defense against other players

**How it works:**
- **PvE Content**: Your total defense = Base Defense + PvE Defense
- **PvP Content**: Your total defense = Base Defense + PvP Defense

These variants stack additively with your base Defense, giving you higher damage reduction in their respective content types.

## Notes and Tips

- **Diminishing Returns:** Each additional Defense point provides less benefit than the previous
- **95% Cap:** Defense reduction cannot exceed 95%, regardless of Defense value
- **Penetration Vulnerability:** High penetration can significantly reduce Defense effectiveness
- **Balance Priority:** Consider penetration resistance stats alongside raw Defense

## Related Stats

- [Defense Rate](/stats/defense-rate) - Increases block chance
- [DMG Reduction](/stats/damage-reduction) - Flat damage reduction applied after percentage reduction
- [Penetration](/stats/penetration) - Reduces enemy defense effectiveness
- [Ignore Penetration](/stats/ignore-penetration) - Reduces enemy penetration effectiveness
- [Cancel Ignore Penetration](/stats/cancel-ignore-penetration) - Counters enemy ignore penetration