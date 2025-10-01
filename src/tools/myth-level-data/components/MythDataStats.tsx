'use client';

import React from 'react';
import { MythNodeData } from '../data/mythLevelData';

interface MythDataStatsProps {
  nodes: MythNodeData[];
  totalNodes: number;
}

export function MythDataStats({ nodes, totalNodes }: MythDataStatsProps) {
  // Calculate statistics
  const totalStats = nodes.reduce((sum, node) => sum + node.stats.length, 0);
  const totalLevels = nodes.reduce((sum, node) => 
    sum + node.stats.reduce((statSum, stat) => statSum + stat.levels.length, 0), 0
  );

  // Get unique ForceIDs
  const uniqueForceIds = new Set<number>();
  nodes.forEach(node => {
    node.stats.forEach(stat => {
      uniqueForceIds.add(stat.forceId);
    });
  });

  // Calculate holy power range
  const allHolyPowers = nodes.flatMap(node =>
    node.stats.flatMap(stat =>
      stat.levels.map(level => typeof level.holyPower === 'number' ? level.holyPower : 0)
    )
  ).filter(hp => hp > 0);

  const minHolyPower = allHolyPowers.length > 0 ? Math.min(...allHolyPowers) : 0;
  const maxHolyPower = allHolyPowers.length > 0 ? Math.max(...allHolyPowers) : 0;

  // Calculate probability range
  const allProbabilities = nodes.flatMap(node =>
    node.stats.flatMap(stat =>
      stat.levels.map(level => level.finalProbability)
    )
  );

  const minProbability = allProbabilities.length > 0 ? Math.min(...allProbabilities) : 0;
  const maxProbability = allProbabilities.length > 0 ? Math.max(...allProbabilities) : 0;

  return (
    <div className="component-bg-dark mb-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Data Overview</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {/* Nodes */}
        <div className="bg-theme-darker rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-game-gold">{nodes.length}</div>
          <div className="text-xs text-foreground/60">Nodes</div>
          {nodes.length !== totalNodes && (
            <div className="text-xs text-foreground/50">of {totalNodes}</div>
          )}
        </div>

        {/* Stats */}
        <div className="bg-theme-darker rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-game-highlight">{totalStats}</div>
          <div className="text-xs text-foreground/60">Total Stats</div>
        </div>

        {/* Levels */}
        <div className="bg-theme-darker rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-blue-400">{totalLevels}</div>
          <div className="text-xs text-foreground/60">Total Levels</div>
        </div>

        {/* Unique ForceIDs */}
        <div className="bg-theme-darker rounded-lg p-3 text-center">
          <div className="text-2xl font-bold text-purple-400">{uniqueForceIds.size}</div>
          <div className="text-xs text-foreground/60">Unique ForceIDs</div>
        </div>

        {/* Holy Power Range */}
        <div className="bg-theme-darker rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-green-400">
            {minHolyPower}-{maxHolyPower}
          </div>
          <div className="text-xs text-foreground/60">Holy Power Range</div>
        </div>

        {/* Probability Range */}
        <div className="bg-theme-darker rounded-lg p-3 text-center">
          <div className="text-lg font-bold text-orange-400">
            {minProbability.toFixed(3)}%-{maxProbability.toFixed(1)}%
          </div>
          <div className="text-xs text-foreground/60">Probability Range</div>
        </div>
      </div>

      {/* Additional Info */}
      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-theme-darker rounded-lg p-3">
          <h4 className="text-sm font-semibold text-foreground mb-2">Most Common ForceIDs</h4>
          <div className="text-xs text-foreground/70">
            {Array.from(uniqueForceIds)
              .slice(0, 10)
              .map(id => `${id}`)
              .join(', ')}
            {uniqueForceIds.size > 10 && '...'}
          </div>
        </div>

        <div className="bg-theme-darker rounded-lg p-3">
          <h4 className="text-sm font-semibold text-foreground mb-2">Average Stats per Node</h4>
          <div className="text-xs text-foreground/70">
            {nodes.length > 0 ? (totalStats / nodes.length).toFixed(1) : '0'} stats per node
          </div>
        </div>
      </div>
    </div>
  );
}
