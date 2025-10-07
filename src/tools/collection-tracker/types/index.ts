// Collection Tracker Types

export interface Mission {
  name: string;
  items: Array<{
    name: string;
    count: number;
    slotOrder: number | null;
  }>;
  rewards: Array<{
    name: string;
    count: number;
  }>;
}

export interface Collection {
  id: string;
  name: string;
  pageOrder: number;
  missions: Record<string, Mission>;
  stats: {
    30: Record<string, number>;
    60: Record<string, number>;
    100: Record<string, number>;
  };
}

export interface CollectionPage {
  pageNumber: number;
  collections: Record<string, Collection>;
}

export interface CollectionTab {
  id: string;
  name: string;
  pages: Record<string, CollectionPage>;
}

export interface CollectionData {
  tabs: Record<string, CollectionTab>;
}

export interface FilterOptions {
  selectedItem: string | null; // Selected item from autocomplete
  selectedStats: string[];
  selectedRewards: string[];
  progressFilter: 'all' | 'completed' | 'not-completed';
}

export interface CollectionProgress {
  [collectionId: string]: {
    completedItems: string[]; // Array of completed item IDs (missionName + itemName)
  };
}