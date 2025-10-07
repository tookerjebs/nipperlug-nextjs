'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { cn } from '@/tools/build-planner/lib/utils';
import { X, ChevronDown } from 'lucide-react';
import type { FilterOptions } from '../types';
import { ItemSearchBar } from './ItemSearchBar';
import { ItemSummaryBanner } from './ItemSummaryBanner';

interface CollectionFiltersProps {
  onFiltersChange: (filters: FilterOptions) => void;
  availableStats: string[];
  availableRewards: string[];
}

const FILTERS_STORAGE_KEY = 'collection-tracker-filters';
const FILTERS_VERSION_KEY = 'collection-tracker-filters-version';
const CURRENT_FILTERS_VERSION = '2'; // Increment this when FilterOptions interface changes

export function CollectionFilters({ onFiltersChange, availableStats, availableRewards }: CollectionFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    selectedItem: null,
    selectedStats: [],
    selectedRewards: [],
    progressFilter: 'all'
  });

  // Load filters from localStorage on mount
  useEffect(() => {
    try {
      const savedVersion = localStorage.getItem(FILTERS_VERSION_KEY);
      
      // If version doesn't match, clear old filters
      if (savedVersion !== CURRENT_FILTERS_VERSION) {
        localStorage.removeItem(FILTERS_STORAGE_KEY);
        localStorage.setItem(FILTERS_VERSION_KEY, CURRENT_FILTERS_VERSION);
        return;
      }
      
      const savedFilters = localStorage.getItem(FILTERS_STORAGE_KEY);
      if (savedFilters) {
        const parsed = JSON.parse(savedFilters);
        // Clean up any legacy properties (like searchTerm)
        const cleanedFilters: FilterOptions = {
          selectedItem: parsed.selectedItem || null,
          selectedStats: parsed.selectedStats || [],
          selectedRewards: parsed.selectedRewards || [],
          progressFilter: parsed.progressFilter || 'all'
        };
        setFilters(cleanedFilters);
        onFiltersChange(cleanedFilters);
      }
    } catch (error) {
      console.error('Failed to load filters from localStorage:', error);
      // Clear corrupted data
      localStorage.removeItem(FILTERS_STORAGE_KEY);
      localStorage.setItem(FILTERS_VERSION_KEY, CURRENT_FILTERS_VERSION);
    }
  }, [onFiltersChange]);

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
    
    // Save to localStorage
    try {
      localStorage.setItem(FILTERS_STORAGE_KEY, JSON.stringify(updatedFilters));
      localStorage.setItem(FILTERS_VERSION_KEY, CURRENT_FILTERS_VERSION);
    } catch (error) {
      console.error('Failed to save filters to localStorage:', error);
    }
  };

  const clearAllFilters = () => {
    const clearedFilters: FilterOptions = {
      selectedItem: null,
      selectedStats: [],
      selectedRewards: [],
      progressFilter: 'all'
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
    
    // Clear from localStorage
    try {
      localStorage.removeItem(FILTERS_STORAGE_KEY);
    } catch (error) {
      console.error('Failed to clear filters from localStorage:', error);
    }
  };

  const hasActiveFilters = useMemo(() => {
    return filters.selectedItem !== null ||
           filters.selectedStats.length > 0 || 
           filters.selectedRewards.length > 0 || 
           filters.progressFilter !== 'all';
  }, [filters]);

  const toggleStat = (stat: string) => {
    const newStats = filters.selectedStats.includes(stat)
      ? filters.selectedStats.filter(s => s !== stat)
      : [...filters.selectedStats, stat];
    updateFilters({ selectedStats: newStats });
  };

  const toggleReward = (reward: string) => {
    const newRewards = filters.selectedRewards.includes(reward)
      ? filters.selectedRewards.filter(r => r !== reward)
      : [...filters.selectedRewards, reward];
    updateFilters({ selectedRewards: newRewards });
  };

  return (
    <div className="space-y-4 mb-6">
      {/* Item Search Bar - Full Width Row */}
      <div className="bg-component-card border border-border-dark rounded-lg p-6">
        <ItemSearchBar 
          onItemSelect={(itemName) => updateFilters({ selectedItem: itemName })}
          selectedItem={filters.selectedItem}
        />
      </div>

      {/* Item Summary Banner - Shows when item is selected */}
      {filters.selectedItem && (
        <ItemSummaryBanner selectedItem={filters.selectedItem} />
      )}

      {/* Other Filters Row */}
      <div className="bg-component-card border border-border-dark rounded-lg p-6">
        <div className="flex flex-wrap gap-4 items-center mb-4">
          {/* Progress Filter */}
        <select
          value={filters.progressFilter}
          onChange={(e) => updateFilters({ progressFilter: e.target.value as any })}
          className="bg-theme-dark border border-border-dark rounded-lg px-3 py-2 text-white focus:border-game-gold focus:outline-none min-w-[140px]"
        >
          <option value="all">All Progress</option>
          <option value="completed">Completed</option>
          <option value="not-completed">Not Completed</option>
        </select>

        {/* Stats Dropdown */}
        <select
          value=""
          onChange={(e) => {
            if (e.target.value) {
              toggleStat(e.target.value);
              e.target.value = ''; // Reset dropdown
            }
          }}
          className="bg-theme-dark border border-border-dark rounded-lg px-3 py-2 text-white focus:border-game-gold focus:outline-none min-w-[140px] dark-scrollbar"
        >
          <option value="">Select stat...</option>
          {availableStats.map((stat) => (
            <option key={stat} value={stat} disabled={filters.selectedStats.includes(stat)}>
              {stat} {filters.selectedStats.includes(stat) ? '✓' : ''}
            </option>
          ))}
        </select>

        {/* Rewards Dropdown */}
        <select
          value=""
          onChange={(e) => {
            if (e.target.value) {
              toggleReward(e.target.value);
              e.target.value = ''; // Reset dropdown
            }
          }}
          className="bg-theme-dark border border-border-dark rounded-lg px-3 py-2 text-white focus:border-game-gold focus:outline-none min-w-[140px] dark-scrollbar"
        >
          <option value="">Select reward...</option>
          {availableRewards.slice(0, 15).map((reward) => (
            <option key={reward} value={reward} disabled={filters.selectedRewards.includes(reward)}>
              {reward.length > 30 ? `${reward.substring(0, 30)}...` : reward} {filters.selectedRewards.includes(reward) ? '✓' : ''}
            </option>
          ))}
        </select>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 px-3 py-2 text-sm text-gray-400 hover:text-white transition-colors border border-border-dark rounded-lg hover:border-border-light"
            >
              <X className="w-3 h-3" />
              Clear All
            </button>
          )}
        </div>

        {/* Active Filters Display */}
        {(filters.selectedStats.length > 0 || filters.selectedRewards.length > 0) && (
          <div className="flex flex-wrap gap-2">
            {filters.selectedStats.map((stat) => (
              <span
                key={stat}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded"
                style={{
                  backgroundColor: 'rgba(255, 215, 0, 0.2)',
                  color: 'var(--gold)',
                  border: '1px solid rgba(255, 215, 0, 0.3)'
                }}
              >
                {stat}
                <button
                  onClick={() => toggleStat(stat)}
                  className="hover:text-white transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            {filters.selectedRewards.map((reward) => (
              <span
                key={reward}
                className="inline-flex items-center gap-1 px-2 py-1 text-xs rounded"
                style={{
                  backgroundColor: 'rgba(59, 130, 246, 0.2)',
                  color: '#93c5fd',
                  border: '1px solid rgba(96, 165, 250, 0.3)'
                }}
              >
                {reward.length > 20 ? `${reward.substring(0, 20)}...` : reward}
                <button
                  onClick={() => toggleReward(reward)}
                  className="hover:text-white transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}