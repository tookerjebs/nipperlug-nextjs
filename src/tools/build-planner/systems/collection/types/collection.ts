// Type definitions for Collection System

export interface CollectionStats {
  [statId: string]: number;
}

export interface CollectionProgressLevel {
  30: CollectionStats;
  60: CollectionStats;
  100: CollectionStats;
}

export interface Collection {
  id: string;
  name: string;
  stats: CollectionProgressLevel;
}

export interface CollectionCategory {
  id: string;
  name: string;
  collections: Record<string, Collection>;
}

export interface CollectionData {
  categories: Record<string, CollectionCategory>;
}

export interface CollectionState {
  // Currently active tab/category
  activeCategory: string;
  
  // Currently selected collection
  activeCollection: string | null;
  
  // Progress for each collection (0, 30, 60, 100)
  collectionProgress: Record<string, number>;
  
  // Total stats from all collections
  totalStats: Record<string, number>;
  
  // Whether the system is initialized
  isInitialized: boolean;
}

export interface CollectionActions {
  // Set active category
  setActiveCategory: (categoryId: string) => void;
  
  // Set active collection
  setActiveCollection: (collectionId: string | null) => void;
  
  // Set progress for a collection
  setCollectionProgress: (collectionId: string, progress: number) => void;
  
  // Get progress for a collection
  getCollectionProgress: (collectionId: string) => number;
  
  // Get stats at current progress for a collection
  getCollectionStatsAtCurrentProgress: (collectionId: string) => CollectionStats;
  
  // Get stats at specific progress for a collection
  getCollectionStatsAtProgress: (collectionId: string, progress: number) => CollectionStats;
  
  // Calculate total stats from all collections
  calculateTotalStats: () => Record<string, number>;
  
  // Initialize the system
  initialize: () => void;
  
  // Quick fill all collections to 100%
  quickFillAll: () => void;
  
  // Reset all progress
  resetAllProgress: () => void;
  
  // Restore from import - for build sharing
  restoreFromImport: (data: { 
    collectionProgress: Record<string, number>;
    activeCategory?: string;
    activeCollection?: string | null;
  }) => void;
}

export type CollectionStore = CollectionState & CollectionActions;