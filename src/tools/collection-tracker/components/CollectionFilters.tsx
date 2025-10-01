'use client';

import React, { useState, useMemo } from 'react';
import { cn } from '@/tools/build-planner/lib/utils';
import { Search, X, ChevronDown } from 'lucide-react';
import type { FilterOptions } from '../types';

interface CollectionFiltersProps {
  onFiltersChange: (filters: FilterOptions) => void;
  availableStats: string[];
  availableRewards: string[];
}

export function CollectionFilters({ onFiltersChange, availableStats, availableRewards }: CollectionFiltersProps) {
  const [filters, setFilters] = useState<FilterOptions>({
    searchTerm: '',
    selectedStats: [],
    selectedRewards: [],
    progressFilter: 'all'
  });

  const updateFilters = (newFilters: Partial<FilterOptions>) => {
    const updatedFilters = { ...filters, ...newFilters };
    setFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters: FilterOptions = {
      searchTerm: '',
      selectedStats: [],
      selectedRewards: [],
      progressFilter: 'all'
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = useMemo(() => {
    return filters.searchTerm !== '' || 
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
    <div className="component-bg-light mb-6">
      {/* Search Bar */}
      <div className="p-4 border-b border-border-dark">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search collections or items... (e.g., 'force core highest')"
            value={filters.searchTerm}
            onChange={(e) => updateFilters({ searchTerm: e.target.value })}
            className="w-full pl-10 pr-4 py-2 bg-theme-darker border border-border-dark rounded-lg text-white placeholder-gray-400 focus:border-game-gold focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Compact Filter Row */}
      <div className="p-4 space-y-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Progress Filter */}
          <div className="flex items-center gap-2">
            <label className="text-gray-300 text-sm font-medium">Progress:</label>
            <select
              value={filters.progressFilter}
              onChange={(e) => updateFilters({ progressFilter: e.target.value as any })}
              className="bg-theme-darker border border-border-dark rounded px-3 py-1 text-white text-sm focus:border-game-gold focus:outline-none min-w-[140px] dark-scrollbar"
            >
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="not-completed">Not Completed</option>
            </select>
          </div>

          {/* Stats Dropdown */}
          <div className="flex items-center gap-2">
            <label className="text-gray-300 text-sm font-medium">Stats:</label>
            <select
              value=""
              onChange={(e) => {
                if (e.target.value) {
                  toggleStat(e.target.value);
                  e.target.value = ''; // Reset dropdown
                }
              }}
              className="bg-theme-darker border border-border-dark rounded px-3 py-1 text-white text-sm focus:border-game-gold focus:outline-none min-w-[140px] dark-scrollbar"
            >
              <option value="">Select stat...</option>
              {availableStats.map((stat) => (
                <option key={stat} value={stat} disabled={filters.selectedStats.includes(stat)}>
                  {stat} {filters.selectedStats.includes(stat) ? '✓' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Rewards Dropdown */}
          <div className="flex items-center gap-2">
            <label className="text-gray-300 text-sm font-medium">Rewards:</label>
            <select
              value=""
              onChange={(e) => {
                if (e.target.value) {
                  toggleReward(e.target.value);
                  e.target.value = ''; // Reset dropdown
                }
              }}
              className="bg-theme-darker border border-border-dark rounded px-3 py-1 text-white text-sm focus:border-game-gold focus:outline-none min-w-[140px] dark-scrollbar"
            >
              <option value="">Select reward...</option>
              {availableRewards.slice(0, 15).map((reward) => (
                <option key={reward} value={reward} disabled={filters.selectedRewards.includes(reward)}>
                  {reward.length > 30 ? `${reward.substring(0, 30)}...` : reward} {filters.selectedRewards.includes(reward) ? '✓' : ''}
                </option>
              ))}
            </select>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center gap-1 px-3 py-1 text-xs text-gray-400 hover:text-white transition-colors border border-border-dark rounded hover:border-border-light"
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
                className="inline-flex items-center gap-1 px-2 py-1 bg-game-gold/20 text-game-gold text-xs rounded-full border border-game-gold/40"
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
                className="inline-flex items-center gap-1 px-2 py-1 bg-blue-500/20 text-blue-300 text-xs rounded-full border border-blue-500/40"
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