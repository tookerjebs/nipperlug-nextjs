'use client';

import React, { useState } from 'react';
import { cn } from '@/tools/build-planner/lib/utils';
import { MythNodeData } from '../data/mythLevelData';
import { ChevronDown, ChevronUp } from 'lucide-react';

interface MythNodeCardProps {
  node: MythNodeData;
}

export function MythNodeCard({ node }: MythNodeCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Get the highest probability stat for quick preview
  const topStat = node.stats.reduce((prev, current) => 
    current.statSelectionChance > prev.statSelectionChance ? current : prev
  );

  // Get highest holy power cost in this node
  const maxHolyPower = Math.max(
    ...node.stats.flatMap(stat => 
      stat.levels.map(level => typeof level.holyPower === 'number' ? level.holyPower : 0)
    )
  );

  return (
    <div className="bg-component-card border border-border-dark rounded-lg overflow-hidden hover:border-game-highlight/30 transition-colors">
      {/* Header */}
      <div className="p-4 border-b border-border-dark">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-game-gold">Node {node.nodeId}</h3>
            <p className="text-xs text-foreground/60">Pool Index: {node.optPoolIdx}</p>
          </div>
          <div className="text-right">
            <div className="text-sm font-medium text-foreground">{node.stats.length} Stats</div>
            <div className="text-xs text-foreground/60">Max HP: {maxHolyPower}</div>
          </div>
        </div>
      </div>

      {/* Quick Preview */}
      <div className="p-4">
        <div className="mb-3">
          <div className="text-sm font-medium text-foreground/80 mb-2">Top Stat:</div>
          <div className="bg-theme-darker rounded-lg p-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-game-highlight">
                ForceID {topStat.forceId}
                {topStat.name && <span className="text-foreground/60"> - {topStat.name}</span>}
              </span>
              <span className="text-sm font-bold text-game-gold">
                {topStat.statSelectionChance.toFixed(1)}%
              </span>
            </div>
            <div className="text-xs text-foreground/60">
              {topStat.levels.length} levels • Weight: {topStat.statWeight}
            </div>
          </div>
        </div>

        {/* Expand/Collapse Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full flex items-center justify-center gap-2 py-2 px-3 bg-theme-darker hover:bg-theme-dark rounded-lg transition-colors text-sm font-medium text-foreground/80"
        >
          {isExpanded ? 'Hide Details' : 'Show All Stats'}
          {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      {/* Expanded Details */}
      {isExpanded && (
        <div className="border-t border-border-dark">
          <div className="p-4 space-y-4">
            {node.stats.map((stat, statIndex) => (
              <div key={stat.forceId} className="bg-theme-darker rounded-lg p-3">
                {/* Stat Header */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <div className="font-medium text-game-highlight">
                      ForceID {stat.forceId}
                      {stat.name && <span className="text-foreground/60 ml-1">- {stat.name}</span>}
                    </div>
                    <div className="text-xs text-foreground/60">
                      Selection Chance: {stat.statSelectionChance.toFixed(1)}% • Weight: {stat.statWeight}
                    </div>
                  </div>
                </div>

                {/* Levels */}
                <div className="space-y-2">
                  {stat.levels.map((level, levelIndex) => (
                    <div 
                      key={level.level} 
                      className="bg-theme-dark rounded p-2 text-xs"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-medium text-foreground">
                          Level {level.level}
                        </span>
                        <span className="font-bold text-game-gold">
                          {level.finalProbability.toFixed(3)}%
                        </span>
                      </div>
                      <div className="grid grid-cols-2 gap-2 text-foreground/70">
                        <div>Value: {level.value}</div>
                        <div>HP: {level.holyPower}</div>
                        <div>Level %: {level.levelSelectionChance.toFixed(1)}%</div>
                        <div>Weight: {level.weight}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
