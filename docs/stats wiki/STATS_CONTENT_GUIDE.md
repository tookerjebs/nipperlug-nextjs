# Stats Content Management Guide

This guide explains how to create and manage stat content for the Stats Wiki.

## Content Structure

### File Location
All stat content files are stored in: `content/stats/`

### File Naming Convention
- Use the exact `statId` from `stats-config.ts` as the filename
- Example: `attack.md`, `criticalRate.md`, `swordSkillAmp.md`

### Frontmatter Fields

#### Required Fields
```yaml
title: "Attack"                     # Display name (from stats-config.ts)
category: "offensive"               # offensive | defensive | utility
priority: "high"                    # high | medium | low
```

#### Optional Fields
```yaml
formula: "Damage = Base × Amp"      # Mathematical formula
related: ["stat1", "stat2"]         # Related stat IDs
lastUpdated: "2025-01-08"          # YYYY-MM-DD format
minValue: 0                         # Minimum value
maxValue: 100                       # Maximum value
isPercentage: true                  # If displayed as %
variants: ["pvp", "pve"]           # PvP/PvE variants
```

## Content Sections

### Required Sections
1. **Main Description** - Brief overview
2. **How It Works** - Detailed mechanics
3. **Typical Values** - Value ranges by game stage
4. **Sources** - Where to get this stat
5. **Priority & Tips** - Optimization advice

### Optional Sections
- **Example Calculation** - For stats with formulas
- **Related Stats** - Links to related stats
- **Class-Specific Notes** - Class differences
- **Advanced Mechanics** - Complex interactions

## Related Stats Management

### Current System
Related stats are manually defined in the `related` array in frontmatter.

### Best Practices
1. **Use exact stat IDs** from `stats-config.ts`
2. **Keep relationships bidirectional** - if A relates to B, B should relate to A
3. **Limit to 3-5 most relevant stats** to avoid clutter
4. **Prioritize direct mechanical relationships** over thematic ones

### Common Relationships
- **Attack stats** → Skill Amplification stats
- **Critical Rate** → Critical Damage, Max Critical Rate
- **Defense** → HP, Damage Reduction
- **Accuracy** → Penetration, Ignore Evasion

## Available Stats (from stats-config.ts)

### Offensive Stats
- `attack`, `magicAttack`, `attackRate`
- `critRate`, `maxCritRate`, `critDamage`
- `swordSkillAmp`, `magicSkillAmp`, `skillAmp`
- `accuracy`, `penetration`, `additionalDamage`
- `minDamage`, `ignoreEvasion`, `cancelIgnoreEvasion`
- `finalDamageIncrease`, `finalDamageDecrease`
- `ignoreDamageReduction`, `ignoreResistCriticalRate`
- `ignoreResistCriticalDamage`, `cancelIgnoreDamageReduction`
- `ignoreResistSkillAmp`, `normalDamageUp`
- `cancelIgnorePenetration`, `allAttackUp`

### Defensive Stats
- `hp`, `defense`, `defenseRate`, `evasion`
- `resistCriticalRate`, `resistCriticalDamage`
- `resistSkillAmp`, `resistMagicSkillAmp`, `resistSwordSkillAmp`
- `ignorePenetration`, `ignoreAccuracy`, `damageReduction`
- `resistSuppression`, `resistSilence`

### Utility Stats
- `mp`, `hpAbsorb`, `maxHpStealPerHit`
- `mpAbsorb`, `maxMpStealPerHit`
- `hpAutoHeal`, `mpAutoHeal`
- `exp`, `skillExp`, `partyExp`, `petExp`
- `alzDropAmount`, `alzDropRate`, `alzBombChance`
- `twoSlotDropRate`, `resistUnableToMove`
- `resistDown`, `resistKnockback`, `resistStun`
- `ignoreResistKnockback`, `ignoreResistDown`, `ignoreResistStun`
- `auraDurationIncrease`, `battleModeDurationIncrease`
- `honourPoint`, `movementSpeed`, `boostHpRestoration`
- `str`, `int`, `dex`

### Variant Stats (PvP/PvE)
Most offensive and defensive stats have `pvp` and `pve` variants:
- `pvpAttack`, `pveAttack`
- `pvpCritRate`, `pveCritRate`
- etc.

## Technical Notes

### Stat ID Resolution
The system automatically converts stat IDs to display names:
- `criticalRate` → "Critical Rate"
- `swordSkillAmp` → "Sword Skill Amp"

### Formula Display
Formulas are displayed in a special highlighted section with mathematical formatting.

### Icon Integration
Stat icons are automatically loaded from the stats-config.ts icon paths.

### SEO Optimization
Each stat page automatically generates:
- Meta titles and descriptions
- Structured data
- Canonical URLs
- Social media tags

### Maintenance Tasks
- Regular content updates as game mechanics change
- Relationship audits to ensure bidirectional links
- Value range updates for different game versions
- Formula verification and updates