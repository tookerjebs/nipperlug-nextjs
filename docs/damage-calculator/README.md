# Damage Calculator

## Overview
Universal damage analysis tool for Cabal Online. Manual stat input works across all server types/versions. Provides damage calculations, monster selection, and stat optimization analysis.

**Route**: `/damage-calculator`  
**Status**: Production-ready

## Architecture

### Core Components
- **Page**: `src/app/damage-calculator/page.tsx` - Main entry with Suspense wrapper
- **CombatStats**: Damage type selector (sword/magic), CP display, PvE damage cards, monster selection
- **ManualStatsSystem**: Manual stat input interface
- **DamageAnalysisSystem**: Damage breakdown, step-by-step calculations, stat optimization rankings

### State Management (Zustand)
- **buildPlannerStore**: Character stats, damage calculations, enemy config
- **monsterStore**: Selected monster data
- **statRegistryStore**: Stat aggregation system

### Key Files
- `stores/buildPlannerStore.ts` - Main state, damage recalculation logic
- `utils/damageCalculationUtils.ts` - Core damage formulas (⚠️ needs refinement)
- `utils/statOptimizationUtils.ts` - Stat efficiency analysis
- `data/stats-config.ts` - Stat definitions (40+ stats)
- `data/cp-weights.ts` - Combat power calculation weights

## Features

### Damage Type Selection
- Sword/Magic toggle in CombatStats header
- Updates all calculations dynamically
- Class-agnostic (damage type only)

### Monster Database Integration
- 4,422+ monsters from `/src/lib/game-data/monsters/`
- Auto-populates enemy config (level, defense, ignore pen, etc.)

### Stat Input
- Manual entry for all damage-relevant stats
- Real-time CP and damage updates
- Change indicators (green/red arrows)
- Supports offensive/defensive/utility stats

### Damage Analysis
- Step-by-step calculation modal
- Stat optimization rankings (best stat to increase)
- Damage increase per +1 stat point

### Combat Power (CP)
- Weighted calculation from all stats
- CP weights modal for transparency
- Real-time updates with change tracking


## Dependencies
- Monster database: `/src/lib/game-data/monsters/`
- Shared utilities: Build Planner calculation logic
- Icons: react-icons (GiMagicSwirl, RiSwordFill, IoCalculator, etc.)
- State: Zustand with subscribeWithSelector middleware