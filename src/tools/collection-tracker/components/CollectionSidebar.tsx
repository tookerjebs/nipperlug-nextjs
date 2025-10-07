'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/tools/build-planner/lib/utils';
import { useCollectionTrackerStore } from '../stores/collectionTrackerStore';
import type { Collection } from '../types';

interface CollectionSidebarProps {
  collections: Collection[];
  activeCollection: string | null;
  onSelectCollection: (collectionId: string) => void;
  availablePages: number[];
  activePage: number;
  onPageChange: (page: number) => void;
  hasFilters?: boolean;
}

export function CollectionSidebar({ collections, activeCollection, onSelectCollection, availablePages, activePage, onPageChange, hasFilters = false }: CollectionSidebarProps) {
  const { getCollectionProgress, getActualCollectionProgress } = useCollectionTrackerStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Get progress class for styling
  const getProgressClass = (progress: number) => {
    if (progress >= 100) return 'high';
    if (progress >= 60) return 'medium';
    if (progress > 0) return 'low';
    return '';
  };

  // Format stats for display
  const formatStatsPreview = (stats: Record<string, number>, showZero: boolean = false) => {
    if (Object.keys(stats).length === 0) return 'No stats';
    
    const statTexts = [];
    for (const statId in stats) {
      const value = showZero ? 0 : stats[statId];
      statTexts.push(`${statId} +${value}`);
    }
    return statTexts.slice(0, 2).join(', ') + (statTexts.length > 2 ? '...' : '');
  };

  return (
    <div className="h-full flex flex-col">
      {/* Page Navigation */}
      {(availablePages.length > 1 || hasFilters) && (
        <div className="p-4 flex-shrink-0" style={{ 
          borderBottom: '2px solid rgba(100, 100, 120, 0.3)',
          backgroundColor: 'rgba(18, 18, 26, 0.5)'
        }}>
          {hasFilters && (
            <div className="text-center mb-3">
              <div className="text-xs text-game-gold font-medium rounded px-2 py-1 inline-block" style={{
                backgroundColor: 'rgba(255, 215, 0, 0.1)'
              }}>
                Filtered Results - {collections.length} collection{collections.length !== 1 ? 's' : ''} found
                {availablePages.length === 1 ? ` on page ${availablePages[0]}` : ' on this page'}
              </div>
            </div>
          )}
          <div className="flex flex-wrap gap-2 justify-center">
            <span className="text-gray-400 text-sm self-center mr-2">Page:</span>
            {availablePages.map((pageNum) => (
              <button
                key={pageNum}
                onClick={() => onPageChange(pageNum)}
                className={cn(
                  "px-3 py-1 text-sm font-medium transition-all duration-200 rounded",
                  "backdrop-filter backdrop-blur-sm",
                  activePage === pageNum
                    ? "glass-panel border-game-highlight text-white shadow-md"
                    : "glass-panel-light text-gray-300 hover:border-border-light hover:text-white"
                )}
              >
                {pageNum}
              </button>
            ))}
          </div>
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto dark-scrollbar min-h-0">
        <div className="p-2 space-y-2">
          {collections.length === 0 && hasFilters ? (
            <div className="text-center py-12">
              <div className="text-4xl mb-3 opacity-20">🔍</div>
              <h3 className="text-lg font-semibold text-gray-300 mb-2">
                No Collections Found
              </h3>
              <p className="text-gray-400 text-sm">
                Try adjusting your filters to see more results.
              </p>
            </div>
          ) : (
            collections.map((collection) => {
            // Only calculate progress after client hydration to prevent SSR mismatch
            const progress = isClient ? getCollectionProgress(collection.id, collection) : 0; // Milestone progress for display
            const actualProgress = isClient ? getActualCollectionProgress(collection.id, collection) : 0; // Actual progress for progress bar
            const progressClass = getProgressClass(progress);
            const isActive = activeCollection === collection.id;
            
            // Get stats preview based on current progress
            let statsPreview = '';
            if (progress >= 100) {
              statsPreview = formatStatsPreview(collection.stats[100]);
            } else if (progress >= 60) {
              statsPreview = formatStatsPreview(collection.stats[60]);
            } else if (progress >= 30) {
              statsPreview = formatStatsPreview(collection.stats[30]);
            } else {
              // Show stat names with +0 values when no progress
              statsPreview = formatStatsPreview(collection.stats[30], true);
            }

            return (
              <div
                key={collection.id}
                onClick={() => onSelectCollection(collection.id)}
                className={cn(
                  "p-3 rounded-lg cursor-pointer transition-all duration-200",
                  isActive
                    ? "glass-panel border-game-highlight glow-border text-white shadow-lg"
                    : "glass-panel-light text-gray-300 hover:border-border-light hover:text-white"
                )}
              >
                {/* Collection Header */}
                <div className="flex items-center justify-between mb-2">
                  <div className="font-medium text-sm leading-tight flex-1">
                    {collection.name}
                  </div>
                </div>

                {/* Stats Preview */}
                <div className="text-xs text-gray-400 leading-tight">
                  {statsPreview}
                </div>

                {/* Progress Bar */}
                <div className="mt-2 h-1.5 bg-theme-darker rounded-full overflow-hidden">
                  <div 
                    className={cn(
                      "h-full transition-all duration-300 rounded-full",
                      progressClass === 'high' && "bg-game-gold shadow-sm",
                      progressClass === 'medium' && "bg-yellow-400",
                      progressClass === 'low' && "bg-orange-400",
                      !progressClass && "bg-gray-500"
                    )}
                    style={{ width: `${actualProgress}%` }}
                  />
                </div>
              </div>
            );
          }))}
        </div>
      </div>
    </div>
  );
}