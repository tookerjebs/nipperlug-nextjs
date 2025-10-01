'use client';

import React, { useState, useMemo } from 'react';
import { cn } from '@/tools/build-planner/lib/utils';
import { useCollectionTrackerStore } from '../stores/collectionTrackerStore';
import { getStatsAggregation, StatProgress } from '../utils/statsAggregator';
import { CPCategory } from '../utils/cpMapping';

type SortOption = 'alphabetical' | 'totalCP' | 'generalCP' | 'pveCP' | 'pvpCP';

export function StatsProgress() {
  const { collectionProgress } = useCollectionTrackerStore();
  
  const aggregation = getStatsAggregation(collectionProgress);
  
  // Sorting state
  const [sortBy, setSortBy] = useState<SortOption>('totalCP');
  
  // Get progress class for styling
  const getProgressClass = (percentage: number) => {
    if (percentage >= 80) return 'high';
    if (percentage >= 40) return 'medium';
    if (percentage > 0) return 'low';
    return '';
  };

  // Format numbers with commas
  const formatNumber = (num: number): string => {
    return num.toLocaleString('en-US');
  };

  // Sort stats based on selected option
  const sortedStats = useMemo(() => {
    const stats = [...aggregation.totalStats];
    
    switch (sortBy) {
      case 'alphabetical':
        return stats.sort((a, b) => a.statName.localeCompare(b.statName));
      case 'totalCP':
        return stats.sort((a, b) => {
          const aTotalMax = a.maxGeneralCP + a.maxPvECP + a.maxPvPCP;
          const bTotalMax = b.maxGeneralCP + b.maxPvECP + b.maxPvPCP;
          return bTotalMax - aTotalMax;
        });
      case 'generalCP':
        return stats.sort((a, b) => b.maxGeneralCP - a.maxGeneralCP);
      case 'pveCP':
        return stats.sort((a, b) => b.maxPvECP - a.maxPvECP);
      case 'pvpCP':
        return stats.sort((a, b) => b.maxPvPCP - a.maxPvPCP);
      default:
        return stats;
    }
  }, [aggregation.totalStats, sortBy]);

  return (
    <div className="component-bg-light">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">Collection Stats Overview</h2>
        <p className="text-gray-400">
          Track your total stat bonuses from all collections. Complete collections to unlock milestone bonuses.
        </p>
      </div>

      {/* CP Summary */}
      {aggregation.totalMaxGeneralCP > 0 || aggregation.totalMaxPvECP > 0 || aggregation.totalMaxPvPCP > 0 && (
        <div className="glass-panel-light p-4 rounded-lg mb-6">
          <div className="text-center">
            <h3 className="text-lg font-semibold text-white mb-3">Total Combat Power from Collections</h3>
            
            {/* General CP */}
            {aggregation.totalMaxGeneralCP > 0 && (
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="text-sm text-gray-300 w-20 text-right">General:</div>
                <div className="text-xl font-bold text-game-gold">
                  {formatNumber(aggregation.totalCurrentGeneralCP)}
                </div>
                <div className="text-gray-400">/</div>
                <div className="text-lg text-gray-300">
                  {formatNumber(aggregation.totalMaxGeneralCP)} CP
                </div>
                <div className="text-sm text-blue-300 ml-2">
                  ({Math.round((aggregation.totalCurrentGeneralCP / aggregation.totalMaxGeneralCP) * 100)}%)
                </div>
              </div>
            )}
            
            {/* PvE CP */}
            {aggregation.totalMaxPvECP > 0 && (
              <div className="flex items-center justify-center gap-4 mb-2">
                <div className="text-sm text-green-300 w-20 text-right">PvE:</div>
                <div className="text-xl font-bold text-green-400">
                  {formatNumber(aggregation.totalCurrentPvECP)}
                </div>
                <div className="text-gray-400">/</div>
                <div className="text-lg text-gray-300">
                  {formatNumber(aggregation.totalMaxPvECP)} CP
                </div>
                <div className="text-sm text-green-300 ml-2">
                  ({Math.round((aggregation.totalCurrentPvECP / aggregation.totalMaxPvECP) * 100)}%)
                </div>
              </div>
            )}
            
            {/* PvP CP */}
            {aggregation.totalMaxPvPCP > 0 && (
              <div className="flex items-center justify-center gap-4">
                <div className="text-sm text-red-300 w-20 text-right">PvP:</div>
                <div className="text-xl font-bold text-red-400">
                  {formatNumber(aggregation.totalCurrentPvPCP)}
                </div>
                <div className="text-gray-400">/</div>
                <div className="text-lg text-gray-300">
                  {formatNumber(aggregation.totalMaxPvPCP)} CP
                </div>
                <div className="text-sm text-red-300 ml-2">
                  ({Math.round((aggregation.totalCurrentPvPCP / aggregation.totalMaxPvPCP) * 100)}%)
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Sort Controls */}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <span className="text-sm text-gray-300 mr-2">Sort by:</span>
        
        <button
          onClick={() => setSortBy('alphabetical')}
          className={cn(
            "px-3 py-1 rounded text-xs font-medium transition-colors",
            sortBy === 'alphabetical'
              ? "bg-game-gold text-black"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          )}
        >
          A-Z
        </button>
        
        <button
          onClick={() => setSortBy('totalCP')}
          className={cn(
            "px-3 py-1 rounded text-xs font-medium transition-colors",
            sortBy === 'totalCP'
              ? "bg-game-gold text-black"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          )}
        >
          Total CP
        </button>
        
        <button
          onClick={() => setSortBy('generalCP')}
          className={cn(
            "px-3 py-1 rounded text-xs font-medium transition-colors",
            sortBy === 'generalCP'
              ? "bg-game-gold text-black"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          )}
        >
          General CP
        </button>
        
        <button
          onClick={() => setSortBy('pveCP')}
          className={cn(
            "px-3 py-1 rounded text-xs font-medium transition-colors",
            sortBy === 'pveCP'
              ? "bg-green-500 text-black"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          )}
        >
          PvE CP
        </button>
        
        <button
          onClick={() => setSortBy('pvpCP')}
          className={cn(
            "px-3 py-1 rounded text-xs font-medium transition-colors",
            sortBy === 'pvpCP'
              ? "bg-red-500 text-black"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          )}
        >
          PvP CP
        </button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedStats.map((stat: StatProgress) => {
          const progressClass = getProgressClass(stat.percentage);
          
          return (
            <div 
              key={stat.statName}
              className="glass-panel-light p-4 rounded-lg transition-all duration-200 hover:glass-panel"
            >
              {/* Stat header */}
              <div className="mb-3">
                <h3 className="text-white font-medium text-sm leading-tight">
                  {stat.statName}
                </h3>
              </div>

              {/* Progress values */}
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-300">
                  {formatNumber(stat.currentValue)} / {formatNumber(stat.maxValue)}
                </span>
                <span className={cn(
                  "text-sm font-bold",
                  progressClass === 'high' && "text-game-gold",
                  progressClass === 'medium' && "text-yellow-300",
                  progressClass === 'low' && "text-orange-300",
                  !progressClass && "text-gray-400"
                )}>
                  {stat.percentage}%
                </span>
              </div>

              {/* CP Information */}
              {stat.hasCPMapping && (
                <div className="space-y-1 mb-2">
                  {/* General CP */}
                  {stat.maxGeneralCP > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-blue-300">
                        {formatNumber(stat.currentGeneralCP)} / {formatNumber(stat.maxGeneralCP)} CP
                      </span>
                      <span className="text-xs text-blue-400 font-medium">
                        General
                      </span>
                    </div>
                  )}
                  
                  {/* PvE CP */}
                  {stat.maxPvECP > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-green-300">
                        {formatNumber(stat.currentPvECP)} / {formatNumber(stat.maxPvECP)} CP
                      </span>
                      <span className="text-xs text-green-400 font-medium">
                        PvE
                      </span>
                    </div>
                  )}
                  
                  {/* PvP CP */}
                  {stat.maxPvPCP > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-red-300">
                        {formatNumber(stat.currentPvPCP)} / {formatNumber(stat.maxPvPCP)} CP
                      </span>
                      <span className="text-xs text-red-400 font-medium">
                        PvP
                      </span>
                    </div>
                  )}
                </div>
              )}
              
              {/* No CP mapping indicator */}
              {!stat.hasCPMapping && (
                <div className="flex items-center justify-center mb-2">
                  <span className="text-xs text-gray-500 italic">
                    No CP calculation available
                  </span>
                </div>
              )}

              {/* Progress bar */}
              <div className="h-2 bg-theme-darker rounded-full overflow-hidden">
                <div 
                  className={cn(
                    "h-full transition-all duration-300 rounded-full",
                    progressClass === 'high' && "bg-game-gold shadow-sm",
                    progressClass === 'medium' && "bg-yellow-400",
                    progressClass === 'low' && "bg-orange-400",
                    !progressClass && "bg-gray-500"
                  )}
                  style={{ width: `${stat.percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      {/* Empty state */}
      {aggregation.totalStats.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4 opacity-20">📊</div>
          <h3 className="text-xl font-semibold text-gray-300 mb-2">
            No Stats Available
          </h3>
          <p className="text-gray-400">
            Complete collection missions to start earning stat bonuses.
          </p>
        </div>
      )}
    </div>
  );
}
