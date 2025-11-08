import collectionData from '@/lib/game-data/collection-tracker-data.json';
import { calculateCollectionStatCP, hasCollectionStatCPMapping, CPCategory } from './cpMapping';
import { CollectionTab, CollectionPage, Collection, Mission } from '../types';

export interface StatProgress {
  statName: string;
  currentValue: number;
  maxValue: number;
  percentage: number;
  currentGeneralCP: number;
  maxGeneralCP: number;
  currentPvECP: number;
  maxPvECP: number;
  currentPvPCP: number;
  maxPvPCP: number;
  hasCPMapping: boolean;
  cpCategory: CPCategory | null;
}

export interface StatsAggregation {
  totalStats: StatProgress[];
  totalCollections: number;
  completedCollections: number;
  totalCurrentGeneralCP: number;
  totalMaxGeneralCP: number;
  totalCurrentPvECP: number;
  totalMaxPvECP: number;
  totalCurrentPvPCP: number;
  totalMaxPvPCP: number;
}

/**
 * Calculates the maximum possible stats from all collections
 */
export function calculateMaxStats(): Record<string, number> {
  const maxStats: Record<string, number> = {};
  
  // Iterate through all tabs
  Object.values(collectionData.tabs).forEach((tab: CollectionTab) => {
    // Iterate through all pages in the tab
    Object.values(tab.pages).forEach((page: CollectionPage) => {
      // Iterate through all collections in the page
      Object.values(page.collections).forEach((collection: Collection) => {
        // Get the 100% completion stats for this collection
        const stats100 = collection.stats['100'] || {};
        
        // Add each stat to the max totals (using original stat names)
        Object.entries(stats100).forEach(([statName, value]: [string, number]) => {
          maxStats[statName] = (maxStats[statName] || 0) + value;
        });
      });
    });
  });
  
  return maxStats;
}

/**
 * Calculates current stats based on collection progress
 */
export function calculateCurrentStats(collectionProgress: Record<string, { completedItems: string[] }>): Record<string, number> {
  const currentStats: Record<string, number> = {};
  
  // Iterate through all tabs
  Object.values(collectionData.tabs).forEach((tab: CollectionTab) => {
    // Iterate through all pages in the tab
    Object.values(tab.pages).forEach((page: CollectionPage) => {
      // Iterate through all collections in the page
      Object.values(page.collections).forEach((collection: Collection) => {
        const collectionId = collection.id;
        const progress = collectionProgress[collectionId];
        
        if (!progress || !progress.completedItems) return;
        
        // Calculate completion percentage for this collection
        let totalItems = 0;
        Object.values(collection.missions).forEach((mission: Mission) => {
          totalItems += mission.items.length;
        });
        
        const completedCount = progress.completedItems.length;
        const percentage = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;
        
        // Determine which milestone stats to apply
        let milestoneStats: Record<string, number> = {};
        if (percentage >= 100) {
          milestoneStats = collection.stats['100'] || {};
        } else if (percentage >= 60) {
          milestoneStats = collection.stats['60'] || {};
        } else if (percentage >= 30) {
          milestoneStats = collection.stats['30'] || {};
        }
        
        // Add milestone stats to current totals (using original stat names)
        Object.entries(milestoneStats).forEach(([statName, value]: [string, number]) => {
          currentStats[statName] = (currentStats[statName] || 0) + value;
        });
      });
    });
  });
  
  return currentStats;
}

/**
 * Gets aggregated stats information for display
 */
export function getStatsAggregation(collectionProgress: Record<string, { completedItems: string[] }>): StatsAggregation {
  const maxStats = calculateMaxStats();
  const currentStats = calculateCurrentStats(collectionProgress);
  
  // Combine all unique stat names
  const allStatNames = new Set([...Object.keys(maxStats), ...Object.keys(currentStats)]);
  
  let totalCurrentGeneralCP = 0;
  let totalMaxGeneralCP = 0;
  let totalCurrentPvECP = 0;
  let totalMaxPvECP = 0;
  let totalCurrentPvPCP = 0;
  let totalMaxPvPCP = 0;
  
  const totalStats: StatProgress[] = Array.from(allStatNames).map(statName => {
    const currentValue = currentStats[statName] || 0;
    const maxValue = maxStats[statName] || 0;
    const percentage = maxValue > 0 ? Math.round((currentValue / maxValue) * 100) : 0;
    const hasCPMapping = hasCollectionStatCPMapping(statName);
    
    let currentGeneralCP = 0;
    let maxGeneralCP = 0;
    let currentPvECP = 0;
    let maxPvECP = 0;
    let currentPvPCP = 0;
    let maxPvPCP = 0;
    let cpCategory: CPCategory | null = null;
    
    if (hasCPMapping) {
      // Calculate current CP
      const currentCPResult = calculateCollectionStatCP(statName, currentValue);
      if (currentCPResult) {
        cpCategory = currentCPResult.category;
        switch (currentCPResult.category) {
          case 'general':
            currentGeneralCP = currentCPResult.cp;
            totalCurrentGeneralCP += currentCPResult.cp;
            break;
          case 'pve':
            currentPvECP = currentCPResult.cp;
            totalCurrentPvECP += currentCPResult.cp;
            break;
          case 'pvp':
            currentPvPCP = currentCPResult.cp;
            totalCurrentPvPCP += currentCPResult.cp;
            break;
        }
      }
      
      // Calculate max CP
      const maxCPResult = calculateCollectionStatCP(statName, maxValue);
      if (maxCPResult) {
        switch (maxCPResult.category) {
          case 'general':
            maxGeneralCP = maxCPResult.cp;
            totalMaxGeneralCP += maxCPResult.cp;
            break;
          case 'pve':
            maxPvECP = maxCPResult.cp;
            totalMaxPvECP += maxCPResult.cp;
            break;
          case 'pvp':
            maxPvPCP = maxCPResult.cp;
            totalMaxPvPCP += maxCPResult.cp;
            break;
        }
      }
    }
    
    return {
      statName,
      currentValue,
      maxValue,
      percentage,
      currentGeneralCP,
      maxGeneralCP,
      currentPvECP,
      maxPvECP,
      currentPvPCP,
      maxPvPCP,
      hasCPMapping,
      cpCategory
    };
  }).filter(stat => stat.maxValue > 0) // Only include stats that have a maximum value
    .sort((a, b) => b.maxValue - a.maxValue); // Sort by max value descending
  
  // Calculate collection completion stats
  let totalCollections = 0;
  let completedCollections = 0;
  
  Object.values(collectionData.tabs).forEach((tab: CollectionTab) => {
    Object.values(tab.pages).forEach((page: CollectionPage) => {
      Object.values(page.collections).forEach((collection: Collection) => {
        totalCollections++;
        
        const progress = collectionProgress[collection.id];
        if (progress && progress.completedItems) {
          let totalItems = 0;
          Object.values(collection.missions).forEach((mission: Mission) => {
            totalItems += mission.items.length;
          });
          
          const completedCount = progress.completedItems.length;
          const percentage = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;
          
          if (percentage >= 100) {
            completedCollections++;
          }
        }
      });
    });
  });
  
  return {
    totalStats,
    totalCollections,
    completedCollections,
    totalCurrentGeneralCP,
    totalMaxGeneralCP,
    totalCurrentPvECP,
    totalMaxPvECP,
    totalCurrentPvPCP,
    totalMaxPvPCP
  };
}