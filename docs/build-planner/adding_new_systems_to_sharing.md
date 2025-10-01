# Adding New Systems to Build Sharing

The Universal Build Serializer now uses a registry pattern that makes it easy to add new systems without modifying the core serialization code.

## Quick Setup for New Systems

When you create a new system, you only need to register it once. Here's how:

### Option 1: Register in your system's store file

Add this to your new system's store file (e.g., `newSystemStore.ts`):

```typescript
import { registerSystem } from '@/utils/sharing/universal-build-serializer';

// Register the system for automatic serialization
registerSystem({
  systemId: 'newSystem', // Unique identifier
  extract: () => {
    const state = useNewSystemStore.getState();
    // Return only the data you want to serialize
    return {
      importantData: state.importantData,
      userSelections: state.userSelections
      // Don't include UI state, loading states, etc.
    };
  },
  restore: (data) => {
    const store = useNewSystemStore.getState();
    // Use your store's restore method
    store.restoreFromImport({
      importantData: data.importantData,
      userSelections: data.userSelections
    });
  }
});
```

### Option 2: Register in a dedicated registration file

Create a file like `src/utils/sharing/system-registrations.ts`:

```typescript
import { registerSystem } from './universal-build-serializer';
import { useNewSystemStore } from '@/path/to/newSystemStore';

export function registerAllSystems() {
  // Register New System
  registerSystem({
    systemId: 'newSystem',
    extract: () => {
      const state = useNewSystemStore.getState();
      return {
        // your serializable data
      };
    },
    restore: (data) => {
      const store = useNewSystemStore.getState();
      store.restoreFromImport(data);
    }
  });
  
  // Register other new systems here...
}
```

Then call `registerAllSystems()` in your app initialization.

## What Gets Automatically Handled

Once registered, your system will automatically be included in:

- ✅ **File Export/Import** - JSON file downloads and uploads
- ✅ **URL Sharing** - Compressed URL generation with LZ-String
- ✅ **Gist Sharing** - Automatic fallback for large builds
- ✅ **localStorage** - Future local storage functionality
- ✅ **Compression Statistics** - Automatic size calculations

## Best Practices

### 1. Only Serialize Essential Data
```typescript
// ✅ Good - only user choices
extract: () => ({
  selectedItems: state.selectedItems,
  userPreferences: state.userPreferences
})

// ❌ Bad - includes UI state
extract: () => ({
  selectedItems: state.selectedItems,
  isLoading: state.isLoading,        // Don't serialize UI state
  modalOpen: state.modalOpen,        // Don't serialize UI state
  allAvailableItems: state.items     // Don't serialize static data
})
```

### 2. Handle Restore Properly
```typescript
restore: (data) => {
  const store = useNewSystemStore.getState();
  
  // Use your store's dedicated restore method if available
  if (store.restoreFromImport) {
    store.restoreFromImport(data);
  } else {
    // Or manually restore the data
    store.setSelectedItems(data.selectedItems);
    store.setUserPreferences(data.userPreferences);
  }
}
```

### 3. Use Unique System IDs
Make sure your `systemId` is unique and descriptive:
- ✅ `'newSystem'`, `'craftingSystem'`, `'guildSystem'`
- ❌ `'system'`, `'data'`, `'new'`

## Migration from Old Manual Method

If you have an existing system that was manually added to the old `extractSystemStates()` and `restoreSystemStates()` methods, you can:

1. Register it using the new method
2. Remove the manual code from those methods
3. Test that import/export still works

The new registry system is backward compatible and will work alongside any remaining manual registrations.

## Example: Complete New System Integration

```typescript
// 1. In your store file (newSystemStore.ts)
import { create } from 'zustand';
import { registerSystem } from '@/utils/sharing/universal-build-serializer';

interface NewSystemState {
  selectedOptions: string[];
  configuration: Record<string, any>;
  // ... other state
  
  // Add restore method
  restoreFromImport: (data: { selectedOptions: string[], configuration: Record<string, any> }) => void;
}

export const useNewSystemStore = create<NewSystemState>((set, get) => ({
  selectedOptions: [],
  configuration: {},
  
  restoreFromImport: (data) => {
    set({
      selectedOptions: data.selectedOptions || [],
      configuration: data.configuration || {}
    });
    
    // Re-register any stats or effects
    // ... your restoration logic
  }
}));

// 2. Register for sharing (can be at the end of the same file)
registerSystem({
  systemId: 'newSystem',
  extract: () => {
    const state = useNewSystemStore.getState();
    return {
      selectedOptions: state.selectedOptions,
      configuration: state.configuration
    };
  },
  restore: (data) => {
    const store = useNewSystemStore.getState();
    store.restoreFromImport(data);
  }
});
```

That's it! Your new system will now be automatically included in all sharing functionality.