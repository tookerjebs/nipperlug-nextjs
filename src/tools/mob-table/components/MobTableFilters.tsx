'use client';

import React from 'react';
import { MonsterSearchFilters } from '../../../lib/game-data/monsters/types';
import { getDungeonName } from '../../../lib/game-data/monsters/dungeonMapping';

interface MobTableFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  filters: MonsterSearchFilters;
  onFiltersChange: (filters: MonsterSearchFilters) => void;
  dungeonIds: string[];
}

export const MobTableFilters: React.FC<MobTableFiltersProps> = ({
  searchTerm,
  onSearchChange,
  filters,
  onFiltersChange,
  dungeonIds
}) => {
  // Create sorted dungeon options by name
  const sortedDungeonOptions = React.useMemo(() => {
    return dungeonIds
      .map(dungeonId => ({
        id: dungeonId,
        name: getDungeonName(dungeonId)
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, [dungeonIds]);

  return (
    <div className="glass-panel p-6 mb-6">
      <h3 className="text-lg font-semibold text-game-gold glow-text-sm mb-4">Search & Filters</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Search Input - Takes more space */}
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-foreground/80 mb-2">
            Search Monster Name
          </label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Enter monster name..."
            className="w-full px-3 py-2 bg-component-card border border-border-dark rounded-md text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-stat-offensive focus:border-transparent"
          />
        </div>

        {/* Boss Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-2">
            Monster Type
          </label>
          <select
            value={
              filters.serverBossType !== undefined 
                ? filters.serverBossType.toString() 
                : 'all'
            }
            onChange={(e) => {
              const value = e.target.value;
              if (value === 'all') {
                onFiltersChange({
                  ...filters,
                  bossOnly: undefined,
                  serverBossType: undefined
                });
              } else {
                const serverBossType = parseInt(value);
                onFiltersChange({
                  ...filters,
                  bossOnly: undefined, // Clear old filter
                  serverBossType: serverBossType
                });
              }
            }}
            className="w-full px-3 py-2 bg-component-card border border-border-dark rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-stat-offensive focus:border-transparent"
          >
            <option value="all">All Monsters</option>
            <option value="0">Regular Monsters</option>
            <option value="1">Map Bosses</option>
            <option value="2">World Bosses</option>
          </select>
        </div>

        {/* Dungeon Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-2">
            Dungeon Bosses
          </label>
          <select
            value={filters.dungeonId || ''}
            onChange={(e) => onFiltersChange({
              ...filters,
              dungeonId: e.target.value || undefined
            })}
            className="w-full px-3 py-2 bg-component-card border border-border-dark rounded-md text-foreground focus:outline-none focus:ring-2 focus:ring-stat-offensive focus:border-transparent"
          >
            <option value="">All Dungeons</option>
            {sortedDungeonOptions.map(({ id, name }) => (
              <option key={id} value={id}>
                {name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Clear Filters Button */}
      <div className="mt-4">
        <button
          onClick={() => {
            onSearchChange('');
            onFiltersChange({});
          }}
          className="px-4 py-2 glass-panel border border-border-dark hover:border-border-light text-foreground rounded-md transition-colors"
        >
          Clear All Filters
        </button>
      </div>
    </div>
  );
};