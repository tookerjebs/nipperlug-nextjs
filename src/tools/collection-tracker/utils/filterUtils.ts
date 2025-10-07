import collectionData from '@/lib/game-data/collection-tracker-data.json';
import type { Collection, CollectionData, FilterOptions, CollectionProgress } from '../types';

// Re-export FilterOptions for backward compatibility
export type { FilterOptions };

// Interface for item with aggregated data
export interface ItemWithCount {
  name: string;
  totalCount: number;
  collections: Array<{
    collectionId: string;
    collectionName: string;
    tabName: string;
    count: number;
  }>;
}

// Extract all unique stats from collection data
export function getAllAvailableStats(): string[] {
  const statsSet = new Set<string>();
  
  Object.values((collectionData as CollectionData).tabs).forEach(tab => {
    Object.values(tab.pages).forEach(page => {
      Object.values(page.collections).forEach((collection: Collection) => {
        if (collection.stats) {
          // Check all milestone levels (30, 60, 100)
          Object.values(collection.stats).forEach((statLevel: Record<string, number>) => {
            Object.keys(statLevel).forEach(statName => {
              statsSet.add(statName);
            });
          });
        }
      });
    });
  });
  
  return Array.from(statsSet).sort();
}

// Extract all unique rewards from collection data
export function getAllAvailableRewards(): string[] {
  const rewardsSet = new Set<string>();
  
  Object.values((collectionData as CollectionData).tabs).forEach(tab => {
    Object.values(tab.pages).forEach(page => {
      Object.values(page.collections).forEach((collection: Collection) => {
        if (collection.missions) {
          Object.values(collection.missions).forEach(mission => {
            if (mission.rewards) {
              mission.rewards.forEach(reward => {
                rewardsSet.add(reward.name);
              });
            }
          });
        }
      });
    });
  });
  
  return Array.from(rewardsSet).sort();
}

// Get unique stat count for a collection
export function getCollectionStatCount(collection: Collection): number {
  const allStats = new Set<string>();
  
  if (collection.stats) {
    Object.values(collection.stats).forEach(statLevel => {
      Object.keys(statLevel).forEach(statName => {
        allStats.add(statName);
      });
    });
  }
  
  return allStats.size;
}

// Check if collection has any of the specified stats
export function collectionHasStats(collection: Collection, targetStats: string[]): boolean {
  if (targetStats.length === 0) return true;
  
  const collectionStats = new Set<string>();
  if (collection.stats) {
    Object.values(collection.stats).forEach(statLevel => {
      Object.keys(statLevel).forEach(statName => {
        collectionStats.add(statName);
      });
    });
  }
  
  return targetStats.some(stat => collectionStats.has(stat));
}

// Check if collection has any of the specified rewards
export function collectionHasRewards(collection: Collection, targetRewards: string[]): boolean {
  if (targetRewards.length === 0) return true;
  
  const collectionRewards = new Set<string>();
  if (collection.missions) {
    Object.values(collection.missions).forEach(mission => {
      if (mission.rewards) {
        mission.rewards.forEach(reward => {
          collectionRewards.add(reward.name);
        });
      }
    });
  }
  
  return targetRewards.some(reward => collectionRewards.has(reward));
}

// Get all collections from a tab across all pages
export function getAllCollectionsFromTab(tab: any): { collection: Collection; pageNumber: number }[] {
  const allCollections: { collection: Collection; pageNumber: number }[] = [];
  
  Object.entries(tab.pages).forEach(([pageNum, page]: [string, any]) => {
    Object.values(page.collections).forEach((collection) => {
      allCollections.push({
        collection: collection as Collection,
        pageNumber: parseInt(pageNum)
      });
    });
  });
  
  return allCollections.sort((a, b) => {
    if (a.pageNumber !== b.pageNumber) {
      return a.pageNumber - b.pageNumber;
    }
    return a.collection.pageOrder - b.collection.pageOrder;
  });
}

// Normalize text for flexible searching (remove brackets, lowercase, etc.)
function normalizeSearchText(text: string): string {
  return text
    .toLowerCase()
    .replace(/[()]/g, '') // Remove parentheses
    .replace(/[^\w\s]/g, ' ') // Replace special chars with spaces
    .replace(/\s+/g, ' ') // Collapse multiple spaces
    .trim();
}

// Extract all unique items from collection data with their counts
export function getAllAvailableItems(): ItemWithCount[] {
  const itemsMap = new Map<string, ItemWithCount>();
  
  Object.entries((collectionData as CollectionData).tabs).forEach(([tabName, tab]) => {
    Object.values(tab.pages).forEach(page => {
      Object.values(page.collections).forEach((collection: Collection) => {
        if (collection.missions) {
          Object.values(collection.missions).forEach(mission => {
            if (mission.items) {
              mission.items.forEach(item => {
                const existing = itemsMap.get(item.name);
                if (existing) {
                  existing.totalCount += item.count;
                  existing.collections.push({
                    collectionId: collection.id,
                    collectionName: collection.name,
                    tabName: tabName,
                    count: item.count
                  });
                } else {
                  itemsMap.set(item.name, {
                    name: item.name,
                    totalCount: item.count,
                    collections: [{
                      collectionId: collection.id,
                      collectionName: collection.name,
                      tabName: tabName,
                      count: item.count
                    }]
                  });
                }
              });
            }
          });
        }
      });
    });
  });
  
  return Array.from(itemsMap.values()).sort((a, b) => a.name.localeCompare(b.name));
}

// Search items by query string
export function searchItems(query: string, limit: number = 10): ItemWithCount[] {
  if (!query || query.trim().length < 2) return [];
  
  const allItems = getAllAvailableItems();
  const normalizedQuery = normalizeSearchText(query);
  
  return allItems
    .filter(item => {
      const normalizedItemName = normalizeSearchText(item.name);
      return normalizedItemName.includes(normalizedQuery);
    })
    .slice(0, limit);
}

// Calculate remaining items needed based on progress
export function calculateRemainingItems(
  itemName: string,
  collectionProgress: CollectionProgress
): { total: number; completed: number; remaining: number } {
  const allItems = getAllAvailableItems();
  const itemData = allItems.find(item => item.name === itemName);
  
  if (!itemData) {
    return { total: 0, completed: 0, remaining: 0 };
  }
  
  let completedCount = 0;
  
  // Check each collection that contains this item
  itemData.collections.forEach(({ collectionId, count }) => {
    const progress = collectionProgress[collectionId];
    if (progress) {
      // Find the collection data
      Object.values((collectionData as CollectionData).tabs).forEach(tab => {
        Object.values(tab.pages).forEach(page => {
          const collection = Object.values(page.collections).find(
            (c: Collection) => c.id === collectionId
          ) as Collection | undefined;
          
          if (collection) {
            // Check each mission in the collection
            Object.values(collection.missions).forEach(mission => {
              mission.items.forEach(item => {
                if (item.name === itemName) {
                  // Check if this specific item is completed
                  const itemId = `${mission.name}|||${item.name}|||${item.count}`;
                  if (progress.completedItems.includes(itemId)) {
                    completedCount += item.count;
                  }
                }
              });
            });
          }
        });
      });
    }
  });
  
  return {
    total: itemData.totalCount,
    completed: completedCount,
    remaining: itemData.totalCount - completedCount
  };
}

// Filter collections based on filter options
export function filterCollections(
  collections: Collection[], 
  filters: FilterOptions,
  getCollectionProgress: (collectionId: string, collectionData: any) => number
): Collection[] {
  return collections.filter(collection => {
    // Item filter
    if (filters.selectedItem) {
      const hasItem = Object.values(collection.missions).some(mission =>
        mission.items.some(item => item.name === filters.selectedItem)
      );
      if (!hasItem) return false;
    }
    
    // Stats filter
    if (!collectionHasStats(collection, filters.selectedStats)) {
      return false;
    }
    
    // Rewards filter
    if (!collectionHasRewards(collection, filters.selectedRewards)) {
      return false;
    }
    
    // Progress filter
    if (filters.progressFilter !== 'all') {
      const progress = getCollectionProgress(collection.id, collection);
      switch (filters.progressFilter) {
        case 'completed':
          if (progress < 100) return false;
          break;
        case 'not-completed':
          if (progress >= 100) return false;
          break;
      }
    }
    
    return true;
  });
}