# New System Implementation Guide

## Overview

This guide explains how to add a new system to the Build Planner. Each system appears in the sidebar and displays its content when selected. All systems are fully implemented and follow a consistent architecture pattern.

## Current Structure

### Build Planner Page Structure
The main build planner page (`/src/app/build-planner/page.tsx`) contains:
- **Sidebar**: Lists all available systems
- **Main Content**: Shows the selected system's interface
- **System Routing**: Uses conditional rendering based on `activeSystem` state

### Systems Directory
All systems are located in: `/src/tools/build-planner/systems/`

Each system follows this standard folder structure:
```
system-name/
├── stores/          # Zustand state management
├── types/           # TypeScript type definitions  
├── data/            # Static data and configurations
├── components/      # React components (optional, for complex systems)
├── index.ts         # Main export file
└── SystemName.tsx   # Main system component (or in components/ folder)
```

**Note**: Some systems place the main component directly in the root (e.g., `PetSystem.tsx`), while others place it in the `components/` folder (e.g., `components/GoldMeritSystem.tsx`). Choose based on complexity.

## Step-by-Step Implementation

### Step 1: Add System to Build Planner Page

In `/src/app/build-planner/page.tsx`, add your system's conditional rendering block:

```tsx
{activeSystem === 'your-system' && (
  <YourSystem />
)}
```

Add the import at the top of the file:
```tsx
import { YourSystem } from '@/tools/build-planner/systems/your-system';
```

### Step 2: Create System Directory Structure

Create the following directories in `/src/tools/build-planner/systems/`:

```
your-system/
├── stores/
├── types/
├── data/
├── components/      # Optional, for complex systems
└── index.ts
```

### Step 3: Create Foundation Files

**Create `index.ts`** (main export file):
```typescript
export { YourSystem } from './YourSystem';
// Or if in components folder:
// export { YourSystem } from './components/YourSystem';
```

**Create `YourSystem.tsx`** (main component):
```tsx
'use client';

import React from 'react';

export function YourSystem() {
  return (
    <div className="space-y-6">
      <h3 className="text-xl font-semibold text-white">Your System</h3>
      <p className="text-gray-400">System implementation goes here...</p>
    </div>
  );
}
```

**Create `types/index.ts`** (type definitions):
```typescript
// Type definitions for Your System
export interface YourSystemState {
  // Define your state structure here
}

export interface YourSystemActions {
  // Define your actions here
}
```

**Create `stores/index.ts`** or `stores/yourSystemStore.ts`** (Zustand store):
```typescript
import { create } from 'zustand';
import type { YourSystemState, YourSystemActions } from '../types';

type YourSystemStore = YourSystemState & YourSystemActions;

export const useYourSystemStore = create<YourSystemStore>((set) => ({
  // Initial state
  
  // Actions
  
  // Restore method for build sharing
  restoreFromImport: (data: Partial<YourSystemState>) => {
    set(data);
    // Re-register stats if needed
  }
}));
```

**Create `data/index.ts`** (static data):
```typescript
// Static data and configurations for Your System
export const YOUR_SYSTEM_CONFIG = {
  // Configuration data
};
```

### Step 4: Register System for Build Sharing

**IMPORTANT**: To enable build export/import and URL sharing, register your system with the universal serializer.

Add this at the end of your store file (e.g., `stores/yourSystemStore.ts`):

```typescript
import { registerSystem } from '@/utils/sharing/universal-build-serializer';

// Register for build sharing
registerSystem({
  systemId: 'yourSystem', // Must match the system ID used in routing
  extract: () => {
    const state = useYourSystemStore.getState();
    return {
      // Only include data that needs to be saved/shared
      // Don't include UI state, loading states, or static data
    };
  },
  restore: (data) => {
    const store = useYourSystemStore.getState();
    store.restoreFromImport(data);
  }
});
```

See `docs/How To/adding_new_systems_to_sharing.md` for detailed sharing implementation guide.


