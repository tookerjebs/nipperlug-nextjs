'use client';

import React, { useMemo } from 'react';
import { Package, CheckCircle, AlertCircle } from 'lucide-react';
import { calculateRemainingItems, getAllAvailableItems } from '../utils/filterUtils';
import { useCollectionTrackerStore } from '../stores/collectionTrackerStore';
import { cn } from '@/utils/cn';

interface ItemSummaryBannerProps {
  selectedItem: string;
}

export function ItemSummaryBanner({ selectedItem }: ItemSummaryBannerProps) {
  const { collectionProgress } = useCollectionTrackerStore();

  // Calculate item statistics
  const itemStats = useMemo(() => {
    const stats = calculateRemainingItems(selectedItem, collectionProgress);
    const allItems = getAllAvailableItems();
    const itemData = allItems.find(item => item.name === selectedItem);
    
    return {
      ...stats,
      collectionsCount: itemData?.collections.length || 0,
      collections: itemData?.collections || []
    };
  }, [selectedItem, collectionProgress]);

  const completionPercentage = itemStats.total > 0 
    ? Math.round((itemStats.completed / itemStats.total) * 100) 
    : 0;

  return (
    <div className="bg-component-card border border-border-dark rounded-lg p-5 mb-6">
      <div className="flex items-start gap-4">
        {/* Icon */}
        <div className="flex-shrink-0 w-12 h-12 bg-theme-light rounded-lg flex items-center justify-center">
          <Package className="w-6 h-6 text-game-gold" />
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-bold text-white mb-3">
            Item Summary: {selectedItem}
          </h3>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
            {/* Total Needed */}
            <div className="bg-theme-dark/50 rounded-lg p-3 border border-border-dark">
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                Total Needed
              </div>
              <div className="text-2xl font-bold text-gray-300">
                {itemStats.total.toLocaleString()}
              </div>
            </div>

            {/* Completed */}
            <div className="bg-theme-dark/50 rounded-lg p-3 border border-border-dark">
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-1 flex items-center gap-1">
                <CheckCircle className="w-3 h-3" />
                Completed
              </div>
              <div className="text-2xl font-bold text-gray-300">
                {itemStats.completed.toLocaleString()}
              </div>
            </div>

            {/* Remaining */}
            <div className="bg-theme-dark/50 rounded-lg p-3 border border-border-dark">
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-1 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                Remaining
              </div>
              <div className="text-2xl font-bold text-gray-300">
                {itemStats.remaining.toLocaleString()}
              </div>
            </div>

            {/* Collections */}
            <div className="bg-theme-dark/50 rounded-lg p-3 border border-border-dark">
              <div className="text-xs text-gray-400 uppercase tracking-wide mb-1">
                Collections
              </div>
              <div className="text-2xl font-bold text-gray-300">
                {itemStats.collectionsCount}
              </div>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-300 font-medium">
                Overall Progress
              </span>
              <span className="text-sm font-bold text-game-gold">
                {completionPercentage}%
              </span>
            </div>
            <div className="h-3 bg-theme-darker rounded-full overflow-hidden">
              <div 
                className={cn(
                  "h-full transition-all duration-500 rounded-full",
                  completionPercentage === 100 ? "bg-green-500" : "bg-game-gold"
                )}
                style={{ width: `${completionPercentage}%` }}
              />
            </div>
          </div>

          {/* Collections Breakdown */}
          {itemStats.collections.length > 0 && (
            <details className="group">
              <summary className="cursor-pointer text-sm text-gray-300 hover:text-white transition-colors list-none flex items-center gap-2">
                <span className="group-open:rotate-90 transition-transform">▶</span>
                View breakdown by collection ({itemStats.collectionsCount} collections)
              </summary>
              <div className="mt-3 space-y-2 pl-6">
                {itemStats.collections.map((collection, index) => (
                  <div 
                    key={`${collection.collectionId}-${index}`}
                    className="flex items-center gap-3 text-sm p-2 bg-theme-dark/30 rounded border border-border-dark"
                  >
                    <div className="flex-shrink-0">
                      <span className="text-game-gold font-bold">
                        ×{collection.count}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <span className="text-white font-medium truncate block">
                        {collection.collectionName}
                      </span>
                      <span className="text-xs text-gray-400">
                        {collection.tabName}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </details>
          )}
        </div>
      </div>
    </div>
  );
}