'use client';

import React, { useState, useMemo } from 'react';
import { mythLevelData } from './data/mythLevelData';
import { MythDataTable } from './components/MythDataTable';
import { MythDataFilters } from './components/MythDataFilters';

export function MythLevelDataViewer() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedNodeId, setSelectedNodeId] = useState<number | null>(null);

  // Filter and sort nodes - but filter individual stats within nodes
  const filteredNodes = useMemo(() => {
    let processedNodes = mythLevelData.map(node => {
      // First apply node-level filters
      if (selectedNodeId !== null && node.nodeId !== selectedNodeId) {
        return null; // Skip this entire node
      }

      // Filter stats within the node
      const filteredStats = node.stats.filter(stat => {
        // Search term filter (stat names only)
        if (searchTerm) {
          if (!stat.name) return false;
          // Normalize search term: remove spaces and convert to lowercase
          const normalizedSearch = searchTerm.toLowerCase().replace(/\s+/g, '');
          // Normalize stat name: remove spaces and convert to lowercase
          const normalizedStatName = stat.name.toLowerCase().replace(/\s+/g, '');
          if (!normalizedStatName.includes(normalizedSearch)) return false;
        }

        return true;
      });

      // Only include nodes that have matching stats
      if (filteredStats.length === 0) {
        return null;
      }

      // Return node with filtered stats
      return {
        ...node,
        stats: filteredStats
      };
    }).filter(node => node !== null); // Remove null nodes

    // Always sort by node ID
    processedNodes.sort((a, b) => a.nodeId - b.nodeId);

    return processedNodes;
  }, [searchTerm, selectedNodeId]);

  return (
    <div className="min-h-screen bg-theme-darkest">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="bg-component-card border border-border-dark rounded-lg p-6">
          <h1 className="text-3xl font-bold text-foreground mb-4">Myth Level Data</h1>
          <p className="text-foreground/80 mb-6">
            Data table for the mythical levelling system in Cabal Online. Roll probabilities, stat values, holy power values across all levels and nodes.
          </p>



          {/* Myth Node Layout Reference */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-3">Node Layout Reference</h2>
            <p className="text-foreground/80 text-sm mb-4">
              Visual reference showing the positions of all 78 myth level nodes. Use this to identify which node corresponds to which number in the data table below.
            </p>
            <div className="flex justify-center">
              <div className="bg-theme-darker border border-border-dark rounded-lg p-4 inline-block">
                <img
                  src="/images/myth-level/myth-numbered.png"
                  alt="Myth Level Node Layout - Numbers 1-78"
                  className="max-w-full h-auto rounded-lg shadow-lg"
                  style={{ maxHeight: '500px' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Column Descriptions */}
        <div className="bg-component-card border border-border-dark rounded-lg p-4">
          <h3 className="text-lg font-semibold text-foreground mb-2">Column Descriptions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1 text-sm text-foreground/70">
            <div><strong className="text-blue-400">Value:</strong> the stat value you gain</div>
            <div><strong className="text-blue-400">Holy Power:</strong> Holy Power gained (includes zone bonus)</div>
            <div><strong className="text-blue-400">Stat %:</strong> Chance to roll this stat</div>
            <div><strong className="text-blue-400">Level %:</strong> Chance to get this level within the stat</div>
            <div><strong className="text-blue-400">Final %:</strong> Overall chance (Stat % × Level %)</div>
            <div><strong className="text-blue-400">Expected Rolls:</strong> Average rolls needed to get this stat level</div>
            <div><strong className="text-blue-400">Reroll Cost:</strong> Cost to reroll that node</div>
          </div>
        </div>

        {/* Filters */}
        <MythDataFilters
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedNodeId={selectedNodeId}
          onNodeIdChange={setSelectedNodeId}
        />

        {/* Results Count */}
        <div className="mb-4 text-sm text-foreground/60">
          {(() => {
            const totalStats = filteredNodes.reduce((sum, node) => sum + node.stats.length, 0);
            const totalOriginalStats = mythLevelData.reduce((sum, node) => sum + node.stats.length, 0);
            return `Showing ${totalStats} stats from ${filteredNodes.length} nodes (of ${totalOriginalStats} total stats from ${mythLevelData.length} nodes)`;
          })()}
        </div>

        {/* Data Table */}
        <MythDataTable nodes={filteredNodes} />

        {/* No Results */}
        {filteredNodes.length === 0 && (
          <div className="text-center py-12">
            <div className="text-foreground/50 text-lg mb-2">No matching stats found</div>
            <div className="text-foreground/40 text-sm">Try adjusting your search or filters</div>
          </div>
        )}
      </div>
    </div>
  );
}
