import collectionData from '@/lib/game-data/collection-tracker-data.json';
import type { Collection, CollectionData, FilterOptions } from '../types';

// Re-export FilterOptions for backward compatibility
export type { FilterOptions };

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

// Check if search term matches item name with flexible matching
function itemMatchesSearch(itemName: string, searchTerm: string): boolean {
  const normalizedItem = normalizeSearchText(itemName);
  const normalizedSearch = normalizeSearchText(searchTerm);
  
  // Split search term into words
  const searchWords = normalizedSearch.split(' ').filter(word => word.length > 0);
  
  // Check if all search words are present in the item name
  return searchWords.every(word => normalizedItem.includes(word));
}

// Filter collections based on filter options
export function filterCollections(
  collections: Collection[], 
  filters: FilterOptions,
  getCollectionProgress: (collectionId: string, collectionData: any) => number
): Collection[] {
  return collections.filter(collection => {
    // Enhanced search term filter - search both collection names AND items
    if (filters.searchTerm) {
      const searchLower = filters.searchTerm.toLowerCase();
      
      // Check collection name (existing behavior)
      const matchesCollectionName = collection.name.toLowerCase().includes(searchLower);
      
      // Check item names with flexible matching (NEW)
      const matchesItemName = Object.values(collection.missions).some(mission =>
        mission.items.some(item => itemMatchesSearch(item.name, filters.searchTerm))
      );
      
      if (!matchesCollectionName && !matchesItemName) {
        return false;
      }
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