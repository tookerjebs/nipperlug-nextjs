import React from 'react';
import { MythNodeData } from '../data/mythLevelData';
import { mythNodeCosts } from '../data/mythNodeCosts';
import { calculateActualHolyPowerCost } from '@/tools/build-planner/systems/myth-level/data/mythZoneConfig';

interface MythDataTableProps {
  nodes: MythNodeData[];
}

export function MythDataTable({ nodes }: MythDataTableProps) {
  // Helper function to get background color class for expected rolls only
  const getExpectedRollsHighlight = (value: number) => {
    // Expected rolls: lower is better (green = few rolls, red = many rolls)
    if (value <= 50) return 'bg-green-600/30 text-green-100 border border-green-500/20';
    if (value <= 150) return 'bg-yellow-600/30 text-yellow-100 border border-yellow-500/20';
    if (value <= 500) return 'bg-orange-600/30 text-orange-100 border border-orange-500/20';
    if (value <= 1000) return 'bg-red-600/30 text-red-100 border border-red-500/20';
    if (value <= 10000) return 'bg-red-700/40 text-red-100 border border-red-600/30';
    // 10k+ rolls - much darker, almost black-red for crazy amounts
    return 'bg-red-950/90 text-red-300 shadow-inner';
  };

  // Flatten all stats from all nodes for table display with grouping info
  const tableData = nodes.flatMap(node =>
    node.stats.flatMap(stat => {
      const levels = stat.levels.map((level, index) => {
        const baseHolyPower = typeof level.holyPower === 'number' ? level.holyPower : 0;
        const actualHolyPower = calculateActualHolyPowerCost(baseHolyPower, node.nodeId);
        
        // Find cost data for this node
        const costData = mythNodeCosts.find(cost => cost.nodeId === node.nodeId);
        
        // Calculate expected rolls needed to achieve this level of this stat
        const rerollCost = costData?.rerollCost || 1; // Avoid division by zero
        const expectedRolls = level.finalProbability > 0 ? 1 / (level.finalProbability / 100) : Infinity;
        
        return {
          nodeId: node.nodeId,
          statName: stat.name || `Stat ${stat.forceId}`,
          level: level.level,
          value: level.value,
          holyPower: actualHolyPower,
          rerollCost: rerollCost,
          statChance: stat.statSelectionChance, // Convert decimal to percentage
          levelChance: level.levelSelectionChance, // Already a percentage
          finalProbability: level.finalProbability, // Convert decimal to percentage
          expectedRolls: expectedRolls,
          statGroupKey: `${node.nodeId}-${stat.forceId}`, // Unique key for each stat group
          isFirstInStatGroup: index === 0, // First level of each stat group
          isLastInStatGroup: index === stat.levels.length - 1, // Last level of each stat group
          statGroupSize: stat.levels.length // Number of levels for this stat
        };
      });
      
      return levels;
    })
  );

  return (
    <div className="bg-component-card border border-border-dark rounded-lg overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-theme-dark border-b border-border-dark">
            <tr>
              <th className="px-4 py-3 text-left border-r border-border-dark text-sm font-medium text-foreground/80">Node</th>
              <th className="px-4 py-3 text-left border-r border-border-dark text-sm font-medium text-foreground/80">Stat</th>
              <th className="px-4 py-3 text-left border-r border-border-dark text-sm font-medium text-foreground/80">Level</th>
              <th className="px-4 py-3 text-left border-r border-border-dark text-sm font-medium text-foreground/80">Value</th>
              <th className="px-4 py-3 text-left border-r border-border-dark text-sm font-medium text-foreground/80">Holy Power</th>
              <th className="px-4 py-3 text-left border-r border-border-dark text-sm font-medium text-foreground/80">Stat %</th>
              <th className="px-4 py-3 text-left border-r border-border-dark text-sm font-medium text-foreground/80">Level %</th>
              <th className="px-4 py-3 text-left border-r border-border-dark text-sm font-medium text-foreground/80">Final %</th>
              <th className="px-4 py-3 text-center border-r border-border-dark text-sm font-medium text-foreground/80">Expected Rolls</th>
              <th className="px-4 py-3 text-left text-sm font-medium text-foreground/80">Reroll Cost</th>
            </tr>
          </thead>
          <tbody>
            {tableData.map((row) => {
              return (
                <tr
                  key={`${row.nodeId}-${row.statName}-${row.level}`}
                  className={`hover:bg-theme-light/30 transition-colors border-b ${row.isLastInStatGroup ? 'border-b-2 border-b-border-dark' : 'border-b-border-dark'}`}
                >
                  {row.isFirstInStatGroup && (
                    <td 
                      className="px-4 py-3 border-r border-border-dark text-center align-middle"
                      rowSpan={row.statGroupSize}
                    >
                      <div className="inline-flex items-center justify-center w-7 h-7 bg-blue-500 rounded-full text-white font-bold text-sm">
                        {row.nodeId}
                      </div>
                    </td>
                  )}
                  {row.isFirstInStatGroup && (
                    <td 
                      className="px-4 py-3 border-r border-border-dark text-gray-200 font-medium align-middle text-sm"
                      rowSpan={row.statGroupSize}
                    >
                      {row.statName}
                    </td>
                  )}
                  <td className="px-4 py-3 border-r border-border-dark text-foreground/80">{row.level}</td>
                  <td className="px-4 py-3 border-r border-border-dark text-green-400 font-medium">+{row.value}</td>
                  <td className="px-4 py-3 border-r border-border-dark text-foreground/80">{row.holyPower}</td>
                  {row.isFirstInStatGroup && (
                    <td 
                      className="px-4 py-3 border-r border-border-dark text-blue-400 text-center align-middle"
                      rowSpan={row.statGroupSize}
                    >
                      {row.statChance}%
                    </td>
                  )}
                  <td className="px-4 py-3 border-r border-border-dark font-medium text-slate-300">{row.levelChance}%</td>
                  <td className="px-4 py-3 border-r border-border-dark font-medium text-yellow-400">{row.finalProbability}%</td>
                  <td className={`px-4 py-3 border-r border-border-dark font-medium text-center ${row.expectedRolls === Infinity ? 'bg-red-800/50 text-red-100 border border-red-700/40' : getExpectedRollsHighlight(row.expectedRolls)}`}>
                    {row.expectedRolls === Infinity ? '∞' : Math.ceil(row.expectedRolls)}
                  </td>
                  {row.isFirstInStatGroup && (
                    <td 
                      className="px-4 py-3 text-foreground/80 text-center align-middle"
                      rowSpan={row.statGroupSize}
                    >
                      {row.rerollCost}
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {tableData.length === 0 && (
        <div className="text-center py-12">
          <div className="text-foreground/50 text-lg mb-2">No data found</div>
          <div className="text-foreground/40 text-sm">Try adjusting your filters</div>
        </div>
      )}
    </div>
  );
}
