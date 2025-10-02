# Cabal Online Damage Calculation System

**Important Note**: This is a work-in-progress prototype based on research and observation. Some aspects of the actual game formula remain mysteries. This document will be updated regularly as new information becomes available.

### Character Classes and Damage Types

**Magic Classes** (use Magic Attack as foundation):
- Wizard (WI)
- Dark Mage (DM) 
- Force Archer (FA)
- Force Gunner (FG)

**Sword Classes** (use Physical Attack as foundation):
- Blader (BL)
- Warrior (WA)
- Gladiator (GL)
- Force Blader (FB)
- Force Shielder (FS)

### Combat Scenarios
The game has different stat calculations for:
- **PvE Combat**: Player vs Environment (monsters, dungeons)
- **PvP Combat**: Player vs Player

Many stats have separate PvE and PvP variants that stack with base stats.
For Example you have 100 Attack, 100 PvE Attack, thats means in PvE scenarios you have total Attack of 200.

### Resist System Overview
The game has an extensive resist system where many offensive stats have corresponding defensive counterparts:
- Critical Rate, Resist Critical Rate, Ignore Resist Critical Rate
- Penetration, Ignore Penetration, Cancel Ignore Penetration
- Critical Damage, Resist Critical Damage, Ignore Resist Critical Damage  
- Skill Amp/All Skill Amp/Sword Skill Amp/Magic Skill Amp, Resist Skill Amp, Ignore Resist Skill Amp
- Resist Down, Ignore Resist Down
- Resist Stun, Ignore Resist Stun
- Resist Knockback, Ignore Resist Knockback
- Evasion, Ignore Evasion, Cancel Ignore Evasion
- Accuracy, Ignore Accuracy
- Damage Reduction, Ignore Damage Reduction, Cancel Ignore Damage Reduction

And resist stats can never reduce below zero! Same goes for counter resist stats!
---

## Current Implementation Summary

**THESE ARE IN NO PARTICULAR ORDER; WE DONT KNOW EXACT ORDER**

 **Base Attack** → Attack or Magic Attack based on class
 **Effective Attack** → Determine effective attack (So your Attack or Magic Attack + your All Attack Up stat)
 **Skill Amplification** → Normal hits (non critical hits) get 25% skill amp bonus, critical hits use base skill amp
 **Level Penalty** → 2% per level difference (max 50% at 25+ levels)
 **Defense Reduction** → Formula: `1 - 1000/(1000 + Defense)` with 95% cap, multiplied by penetration effect
 **Normal/Critical Paths** → Normal Damage Up for normal hits, Critical Damage for critical hits
 **Additional Damage** → Flat damage addition
 **Enemy Damage Reduction** → Flat reduction first, then percentage reduction
 **Final Damage Increase** → Final amplification with enemy final damage decrease
 **Variance** → 20% variance for sword (0.80x to 1.0x), none for sword classes and only (that variance needs more testing/confirmation)

---
**Current Implementation**: Attack (physical) or Magic Attack is the foundation.

- **Physical Classes**: Start with `attack` stat
- **Magic Classes**: Start with `magicAttack` stat
- Effective attack needs to be determined, thats the attack/magic attack + All Attack Up + Any additional attack you get from your particular skill you are using (every skill give some boost to attack, lets just call it Skill Attack/Magic Attack)

### Skill Amplification with Hit Type Bonus
Skill amplification is applied with different bonuses for normal vs critical hits.
The general skill amp below, is just like the Skill Attack we mentioned above. every skill you use for attacking gives some additional attack/magic attack and sword skill amp/magic skill amp (depending on class).
- **Physical Classes**: Use `swordSkillAmp` + general `skillAmp` + `allSkillAmp`
- **Magic Classes**: Use `magicSkillAmp` + general `skillAmp` + `allSkillAmp`
- **Normal Hit Bonus**: Normal hits get 25% skill amp bonus (`totalSkillAmp * 1.25`), Why ? more testing needed
- **Critical Hit**: Critical hits use base effective skill amp (no bonus)
- **EFFECTIVE AMP**: Dont forget about the resist stats, Resist Skill Amp and Ignore Resist Skill Amp to determine effective magic/sword skill amp. 

```
Total Skill Amp = skillAmp + (swordSkillAmp OR magicSkillAmp) + allSkillAmp
Normal Hit Skill Amp = Total Skill Amp × 1.25
Critical Hit Skill Amp = Total Skill Amp
```

### Level Difference Penalty

- **Formula**: `levelDifference * 2%` where level difference is capped at 25 levels
- **Maximum Penalty**: 50% at 25+ level difference. This one needs more testing, other sources have 25% max. level penalty.

```
Level Difference = min(25, max(0, Enemy Level - 200))
Level Penalty Percent = Level Difference × 2
```

### Defense vs Penetration Interaction
**Current Implementation**: Defense reduces damage using the correct Cabal Online formula with penetration multiplier.

- **Defense Formula**: `1 - 1000/(1000 + Defense)` with 95% maximum cap
- **Penetration Effect**: Multiplies defense reduction by `(1 - Penetration/Defense)`
- **Ignore Penetration**: Enemy stat reduces our effective penetration
- **Cancel Ignore Penetration**: Our stat counters enemy ignore penetration (but only to 0)


**Example**: 5000 defense, 2000 penetration
- Base: `1 - 1000/(1000+5000) = 83.3%`
- Penetration multiplier: `1 - 2000/5000 = 0.6`
- Final: `83.3% × 0.6 = 50%`
Source:osaka. not confirmed or tested !
```
Effective Enemy Ignore Pen = max(0, Enemy Ignore Penetration - Our Cancel Ignore Penetration)
Effective Penetration = max(0, Our Penetration - Effective Enemy Ignore Pen)

Base Defense Reduction = 1 - 1000/(1000 + Enemy Defense)
Capped Defense Reduction = min(Base Defense Reduction, 0.95)
Penetration Multiplier = max(0, 1 - Effective Penetration / Enemy Defense)
Final Defense Reduction = max(0.003, Capped Defense Reduction × Penetration Multiplier). Why 0.3% ? Got it from official cabal korean site. weird number
```

**🔬 Research Data - Defense Scaling**:
Test conducted on test server with maximum defense dummy:
- **Player Attack**: 840,386
- **Dummy Defense**: 104,700 (highest in game)
- **Dummy Damage Reduction**: 1,150 (flat)
- **Final Damage Dealt**: 43,392
- **Calculated Pre-Reduction Damage**: 44,542 (43,392 + 1,150)
- **Defense Reduction**: ~94.83% (44,542 from 840,386 attack)

**Key Finding**: Defense reduction approaches **95% maximum** as defense values increase, confirming diminishing returns theory. The formula appears to have an asymptotic limit preventing 100% damage reduction.

**Official Korean Documentation Confirmation**: Defense reduction is capped at a minimum of **0.3%** and maximum of **95%**, regardless of penetration values.

### Normal Damage Up vs Critical Damage Application
**Current Implementation**: Separate paths for normal and critical hits, applied after defense.

#### For Normal Hits:
```
Effective Enemy Resist Crit Dmg = max(0, Enemy Resist Critical Damage - Our Ignore Resist Critical Damage)
Effective Critical Damage = max(0, Our Critical Damage - Effective Enemy Resist Crit Dmg)

Normal Damage with Normal Up = Defense Adjusted Damage × (100 + Normal Damage Up) / 100
Critical Damage Value = Defense Adjusted Damage × (100 + Effective Critical Damage) / 100
```

**Note**: 
- Normal Damage Up has no resist or ignore resist counterparts
- Critical damage is reduced by enemy resist critical damage

### Additional Damage Application
**Current Implementation**: Additional damage (Add DMG) is applied as a flat increase after normal/critical damage calculation.

```
Normal Damage with Add = Normal Damage with Normal Up + Additional Damage
Critical Damage with Add = Critical Damage Value + Additional Damage
```

### Enemy Damage Reduction
**Current Implementation**: Enemy damage reduction is applied as both flat and percentage reduction. BE CAREFUL, THER IS A DEDICATED STAT IN THE GAME CALLED DAMAGE REDUCTION; THIS ONE APPLIES A FLAT REDUCTION TO DAMAGE. THE PERCENTAGE DAMAGE REDUCTION IS SIMPLY THE RESULT OF DEFENSE, THE DEFENSE STAT BASICALLY REDUCES YOUR DAMAGE BY A PERCENTAGE.

- **Flat Reduction**: Applied first, can be reduced by our "Ignore Damage Reduction"
- Enemy "Cancel Ignore Damage Reduction" counter Ignore Damage Reduction

### Final Damage Increase
Final damage increase is applied as the last amplification step.

```
Final Damage = Damage  × (100 + Final Damage Increased) / 100 × (100 - Enemy Final Damage Decrease) / 100
```

### Damage Variance
**Current Implementation**: Variance is applied probably as the final step, only for sword damage and only for non critical hits of that sword damage.!!

- **Sword Damage**: 20% variance from 0.80x to 1.0x (official Korean documentation) ONLY FOR NORMAL HITS
- **Magic Damage**: No variance (always exact value)

```
Sword Min Damage = Final Damage × 0.80
Sword Max Damage = Final Damage × 1.0
Magic Min/Max Damage = Final Damage (no variance)
```

---

## Research Status

- **Attack Foundation**: Attack/Magic Attack is the base for all damage
- **Skill Amplification**: 25% bonus for normal hits??, base skill amp for critical hits ??
- **All Stats**: Stats like All Skill Amp and All Attack Up increase as the name suggests All attack types (magic attack and attack, all skill amp increases magic skill amp and sword skill amp)
- **Defense Formula**: `1 - 1000/(1000 + Defense)` with 95% maximum cap ??
- **Penetration Mechanics**: Multiplies defense reduction by `(1 - Penetration/Defense)`
- **Level Penalty**: 2% per level difference, capped at 25 levels (50% max)???
- **Critical Damage**: Reduced by enemy resist critical damage
- **Normal Damage Up**: Applied to normal hits only
- **Additional Damage**: Flat damage addition after normal/critical calculation but before final dmg increased
- **Damage Reduction**: Both flat and percentage enemy damage reduction
- **Final Damage Increase**: Final percentage amplification step
- **Damage Variance**: 20% variance for sword (0.80x to 1.0x), none for magic
- **Resist Mechanics**: Ignore/cancel stats can only reduce to 0, not negative
- **Final Damage Decrease**: Final damage decrease of your target which reduces your damage
