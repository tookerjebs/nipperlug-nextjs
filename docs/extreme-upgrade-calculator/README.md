# Extreme Upgrade Calculator

## Overview

Tool for planning equipment upgrades using the Extreme Upgrade system. Calculates success rates, costs, and risk assessment for informed upgrade decisions.

**Status**: Production-ready  
**Route**: `/extreme-upgrade-calculator`

## Features

- **Success Rate Calculation**: Real-time rates based on core combinations, server type, and item type
- **Cost Analysis**: Alz costs, core requirements, expected value calculations
- **Risk Assessment**: Probability of success/breakage/reset, expected attempts
- **Multi-Attempt Simulation**: Statistical projections for multiple upgrade attempts
- **Server Support**: PlayCabal (no reset) and Standard servers (with reset)

### State Management
Local state managing server selection, item type, extreme levels, core combinations, and prices.

### Calculation Engine
Success rate formula: `(Factor × SumCorePower) / (100 × BaseLevel)`

## Technical Details

### Server Differences
- **PlayCabal**: No reset outcome, higher base levels (4+), harder success rates
- **Standard**: Reset outcome enabled, lower base levels (4+), easier success rates

### Item Types
- **1H Weapons/Armor/Vehicles**: Standard costs and base levels
- **2H Weapons**: 1.5x-2x higher costs, different base levels

### Core System
12 core levels with power values:
- Levels 1-4: Linear (1-4 power)
- Levels 5-12: Exponential (8-48 power)

## Usage

1. Select server type and item type
2. Set current and target extreme levels
3. Input core combination for each level
4. View success rates and costs
5. Adjust cores to optimize success rate vs cost

## Documentation

**[EXTREME_UPGRADE_SYSTEM.md](EXTREME_UPGRADE_SYSTEM.md)** - Complete system mechanics, formulas, stat bonuses, and implementation details

## Data Sources

- [PlayCabal Wiki - Extreme Upgrade](https://wiki.playcabal.to/content/systems/upgrading/extreme-upgrade)
- [Mr. Wormy - Extreme Upgrade Guide](https://mrwormy.com/extreme-upgrade/)
- Build Planner extreme upgrade data files