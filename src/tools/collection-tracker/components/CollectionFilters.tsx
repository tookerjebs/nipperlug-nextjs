'use client';

import React, { useState, useMemo } from 'react';
import { cn } from '@/tools/build-planner/lib/utils';
import { X, ChevronDown } from 'lucide-react';
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
    <div className="bg-component-card border border-border-dark rounded-lg p-6 mb-6">
      <div className="flex flex-wrap gap-4 items-center mb-4">
        {/* Search Bar */}
        <div className="flex-1 min-w-64">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search collections or items... (e.g., 'force core highest')"
              value={filters.searchTerm}
              onChange={(e) => updateFilters({ searchTerm: e.target.value })}
              className="w-full pl-10 pr-4 py-2 bg-theme-dark border border-border-dark rounded-lg text-white placeholder-gray-400 focus:border-game-gold focus:outline-none transition-colors"
            />
          </div>
        </div>

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
          className="bg-theme-dark border border-border-dark rounded-lg px-3 py-2 text-white focus:border-game-gold focus:outline-none min-w-[140px]"
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
          className="bg-theme-dark border border-border-dark rounded-lg px-3 py-2 text-white focus:border-game-gold focus:outline-none min-w-[140px]"
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
  );
}