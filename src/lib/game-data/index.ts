/**
 * Shared Game Data Exports
 * Central export point for all shared game data
 */

// Monster data exports
export * from './monsters/types';
export * from './monsters/monster-processor';

// Shared item registry
export * from './items';

// Re-export the shared hook for convenience
export { useMonsterData } from '../hooks/useMonsterData';

// Re-export commonly used types
export type { GameItem } from './items';