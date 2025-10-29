'use client';

import React from 'react';
import { Search, X } from 'lucide-react';

interface MythDataFiltersProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedNodeId: number | null;
  onNodeIdChange: (value: number | null) => void;
}

export function MythDataFilters({
  searchTerm,
  onSearchChange,
  selectedNodeId,
  onNodeIdChange
}: MythDataFiltersProps) {

  const clearAllFilters = () => {
    onSearchChange('');
    onNodeIdChange(null);
  };

  const hasActiveFilters = searchTerm || selectedNodeId !== null;

  return (
    <div className="bg-component-card border border-border-dark rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Filters & Search</h3>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center gap-2 px-3 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition-colors text-sm"
          >
            <X size={14} />
            Clear All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Node Filter */}
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-2">
            Node Number
          </label>
          <select
            value={selectedNodeId || ''}
            onChange={(e) => onNodeIdChange(e.target.value ? parseInt(e.target.value) : null)}
            className="w-full px-3 py-2 bg-theme-darker border-2 border-gray-600 hover:border-gray-500 focus:border-game-highlight rounded-lg text-foreground focus:outline-none dark-scrollbar transition-colors"
          >
            <option value="">All Nodes</option>
            {Array.from({ length: 78 }, (_, i) => i + 1).map(nodeId => (
              <option key={nodeId} value={nodeId}>Node {nodeId}</option>
            ))}
          </select>
        </div>

        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-foreground/80 mb-2">
            Search Stats
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-foreground/50" size={16} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search stat names..."
              className="w-full pl-10 pr-4 py-2 bg-theme-darker border-2 border-gray-600 hover:border-gray-500 focus:border-game-highlight rounded-lg text-foreground placeholder-foreground/50 focus:outline-none transition-colors"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
