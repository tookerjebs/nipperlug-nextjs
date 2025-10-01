# Stats Configuration Integration Guide

## Overview

This guide explains how to use the central stats configuration (`stats-config.ts`) in your system. The stats configuration is the single source of truth for all stat definitions, ensuring consistency across systems.

## Key Helper Functions

- `getStatInfo(statId)`: Get stat metadata (name, category, isPercentage, etc.)
- `formatStatValue(statId, value)`: Format values with % for percentage stats
- `getStatsByCategory(category)`: Get all stat IDs for a category

## Integration Steps

### 1. Import Functions

```typescript
import { getStatInfo, formatStatValue } from '@/tools/build-planner/data/stats-config';
```

### 2. Use getStatInfo for UI

```typescript
const statInfo = getStatInfo(statId);
const displayName = statInfo?.name || statId;
const isPercentage = statInfo?.isPercentage || false;
```

### 3. Format Values

```typescript
const displayValue = formatStatValue(statId, value); // Adds % if needed
```

### 4. Create StatOption Objects

```typescript
const statOption = {
  id: statId,
  name: statInfo?.name || statId,
  value: value,
  isPercentage: statInfo?.isPercentage || false,
  category: statInfo?.category || 'utility'
};
```

## Examples from Existing Systems

### Pet System Pattern

```typescript
// Getting available stats
getAvailableStats: (slotId: string): StatOption[] => {
  return tierStats.map(stat => {
    const statInfo = getStatInfo(stat.id);
    return {
      id: stat.id,
      name: statInfo?.name || stat.id,
      value: stat.value,
      isPercentage: statInfo?.isPercentage || false,
      category: statInfo?.category || 'utility'
    };
  });
}
```

### Honor Medal System Pattern

```typescript
// Level-based stat ranges
getAvailableStats: (slotId: string): StatOption[] => {
  return rankStats.map(statDef => {
    const statInfo = getStatInfo(statDef.id);
    const minValue = statDef.values[0];
    const maxValue = statDef.values[maxLevel - 1];
    const symbol = statInfo?.isPercentage ? '%' : '';
    
    return {
      id: statDef.id,
      name: `${statInfo?.name} (${minValue}${symbol}-${maxValue}${symbol})`,
      isPercentage: statInfo?.isPercentage || false
    };
  });
}
```

## Best Practices

1. **Always use helper functions** from `stats-config.ts` instead of hardcoding
2. **Handle null returns**: `const statName = statInfo?.name || statId;`
3. **Use exact stat IDs** from `stats-config.ts` when registering with stat registry
4. **Use formatStatValue()** for consistent percentage formatting

## Common Pitfalls

- Using stat IDs that don't exist in `stats-config.ts`
- Missing null checks for `getStatInfo()` returns
- Manual percentage formatting instead of using `formatStatValue()`
- Creating custom stat IDs instead of extending `stats-config.ts`

## Adding New Stats

To add new stats, extend the `stats` object in `stats-config.ts`:

```typescript
newStat: {
  name: "New Stat",
  category: "offensive",
  isPercentage: false,
  description: "Description"
}
```

Do not create custom stats in individual systems.