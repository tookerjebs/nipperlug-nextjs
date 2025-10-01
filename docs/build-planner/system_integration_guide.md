# System Integration Guide

This guide covers integrating new systems into the build planner's stat management architecture.

## Architecture Overview

```
System Store → Stat Registry Store → Build Planner Store → Display Components
```

**Key Components:**
- **System Stores**: Individual Zustand stores for each system
- **Stat Registry Store**: Central hub aggregating stats from all systems
- **Build Planner Store**: Processes combined stats for calculations
- **Display Components**: UI showing calculated stats

## Integration Steps

### 1. Create System Store

Create `src/tools/build-planner/systems/your-system/stores/yourSystemStore.ts`:

```typescript
import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { useStatRegistryStore } from '@/tools/build-planner/stores/statRegistryStore';

interface YourSystemState {
  // Your system's state
}

interface YourSystemActions {
  calculateTotalStats: () => Record<string, number>;
  handleStatSelect: (slotId: string, statId: string) => void;
  handleStatRemove: (slotId: string) => void;
  resetSystem: () => void;
}

const SYSTEM_ID = 'yourSystem';

export const useYourSystemStore = create<YourSystemState & YourSystemActions>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    
    calculateTotalStats: () => {
      // Calculate and return stats as Record<string, number>
      return {};
    },
    
    handleStatSelect: (slotId, statId) => {
      // Update state
      set(/* your updates */);
      
      // Register stats
      const totalStats = get().calculateTotalStats();
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
    },
    
    resetSystem: () => {
      useStatRegistryStore.getState().unregisterSystem(SYSTEM_ID);
      set(/* reset state */);
    }
  }))
);
```
### 2. Stat Registry Integration

**Key Pattern**: Always register stats after state changes:

```typescript
// After any state change that affects stats
const totalStats = get().calculateTotalStats();
useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);

// When resetting
useStatRegistryStore.getState().unregisterSystem(SYSTEM_ID);
```

**Important**: `calculateTotalStats()` must return `Record<string, number>` where:
- Keys are stat IDs from `stats-config.ts`
- Values are numeric contributions

### 3. Create UI Component

Create `src/tools/build-planner/systems/your-system/YourSystem.tsx`:

```typescript
import React from 'react';
import { useYourSystemStore } from './stores/yourSystemStore';

export const YourSystem: React.FC = () => {
  const { resetSystem, quickFillSystem } = useYourSystemStore();
  
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold text-yellow-400">Your System</h2>
        <div className="flex gap-2">
          <button onClick={quickFillSystem}>Quick Fill</button>
          <button onClick={resetSystem}>Reset</button>
        </div>
      </div>
      {/* Your system UI */}
    </div>
  );
};
```
### 4. Add to Build Planner

Update `src/app/build-planner/page.tsx` to include your system:

```typescript
import { YourSystem } from '@/tools/build-planner/systems/your-system/YourSystem';

// Add conditional rendering for your system (around line 210+)
{activeSystem === 'your-system' && (
  <YourSystem />
)}
```

## Required Methods

Every system must implement:

1. **calculateTotalStats()**: Returns `Record<string, number>` with stat contributions
2. **resetSystem()**: Clears state and calls `unregisterSystem()`
3. **handleStatSelect()**: Updates state and calls `registerSystemStats()`
4. **handleStatRemove()**: Updates state and calls `registerSystemStats()`

## Core Pattern

After any state change affecting stats:

```typescript
// 1. Update state
set(/* your changes */);

// 2. Recalculate and register
const totalStats = get().calculateTotalStats();
useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
```

## File Structure

```
src/tools/build-planner/systems/your-system/
├── stores/
│   └── yourSystemStore.ts
├── data/
│   └── yourSystemData.ts
├── types/
│   └── index.ts
└── YourSystem.tsx
```

## Common Pitfalls

1. **Forgetting to unregister**: Always call `unregisterSystem()` in `resetSystem()`
2. **Not registering after changes**: Call `registerSystemStats()` after state updates
3. **Wrong stat IDs**: Use stat IDs from `stats-config.ts`
4. **Missing subscribeWithSelector**: Required for Zustand store
5. **Duplicate system IDs**: Use unique SYSTEM_ID constants

## Best Practices

1. **Study existing systems**: Pet, honor medal, stellar systems for reference
2. **Use TypeScript**: Define proper interfaces
3. **Follow file structure**: Use established patterns
4. **Test thoroughly**: Verify stats appear/disappear correctly
5. **Use subscribeWithSelector**: Required Zustand middleware

## Example Systems

- **Pet System**: Complex categories and slots
- **Honor Medal System**: Level-based stat values
- **Stellar System**: Node-based activation

## Verification Checklist

- [ ] Stats appear in build planner display
- [ ] Stats update when system changes
- [ ] Stats disappear when system resets
- [ ] No console errors
- [ ] Uses `subscribeWithSelector` middleware
- [ ] Follows established file structure