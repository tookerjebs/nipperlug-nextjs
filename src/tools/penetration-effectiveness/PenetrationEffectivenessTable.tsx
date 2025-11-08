'use client';

import React, { useMemo } from 'react';

// Penetration effectiveness calculation functions
const calculateBaseDefenseReduction = (defense: number): number => {
  // Correct formula: 1 - 1000/(1000 + Defense)
  return 1 - 1000 / (1000 + defense);
};

const calculateCappedDefenseReduction = (baseReduction: number): number => {
  return Math.min(baseReduction, 0.95);
};

const calculateFinalDefenseReduction = (defense: number, penetration: number): number => {
  // Handle edge case where defense is 0 - no damage reduction
  if (defense === 0) return 0;
  
  const baseReduction = calculateBaseDefenseReduction(defense);
  const cappedReduction = calculateCappedDefenseReduction(baseReduction);
  
  // Correct penetration application: multiply by (1 - penetration/defense)
  const penetrationMultiplier = Math.max(0, 1 - penetration / defense);
  const finalReduction = cappedReduction * penetrationMultiplier;
  
  // Apply minimum 0.3% damage reduction cap (cannot go below 0.3% except for 0 defense)
  // Official Korean documentation: "damage reduction rate is adjusted to a minimum of 0.3%"
  return Math.max(finalReduction, 0.003);
};

// Generate defense values for the table
const generateDefenseValues = (): number[] => {
  const values: number[] = [];
  
  // 0, 100, 200, 500
  values.push(0, 100, 200, 500);
  
  // 1000, 1500, 2000, 2500, 3000 until 5000
  for (let i = 1000; i <= 5000; i += 500) {
    values.push(i);
  }
  
  // 6000, 7000, 8k, 9k, 10k
  values.push(6000, 7000, 8000, 9000, 10000);
  
  // 20k, 30k, to 100k
  for (let i = 20000; i <= 100000; i += 10000) {
    values.push(i);
  }
  
  return values;
};

// Generate penetration values for the table
const generatePenetrationValues = (): number[] => {
  const values: number[] = [];
  
  // 0-1000: every 250 (early game increments)
  for (let i = 0; i <= 1000; i += 250) {
    values.push(i);
  }
  
  // 1500, 2000, 2500, 3000 (mid game)
  for (let i = 1500; i <= 3000; i += 500) {
    values.push(i);
  }
  
  // 4000, 5000, 6000 (high penetration)
  for (let i = 4000; i <= 6000; i += 1000) {
    values.push(i);
  }
  
  // 8000, 10000, 12000 (extreme penetration)
  values.push(8000, 10000, 12000);
  
  return values;
};

// Color coding based on damage reduction percentage
const getReductionColor = (reduction: number): string => {
  const percentage = reduction * 100;
  
  if (percentage <= 0.3) return 'bg-green-900/50 text-green-300'; // Minimum cap
  if (percentage <= 15) return 'bg-green-800/50 text-green-200';
  if (percentage <= 30) return 'bg-yellow-800/50 text-yellow-200';
  if (percentage <= 50) return 'bg-orange-800/50 text-orange-200';
  if (percentage <= 75) return 'bg-red-800/50 text-red-200';
  return 'bg-red-900/50 text-red-300';
};

const formatNumber = (num: number): string => {
  if (isNaN(num)) return 'N/A';
  return num.toString();
};

const formatPercentage = (value: number): string => {
  return `${(value * 100).toFixed(1)}%`;
};

// Group defense values by game stage
const groupDefenseValuesByStage = (defenseValues: number[]) => {
  const groups = {
    early: [] as number[],
    mid: [] as number[],
    end: [] as number[],
    outliers: [] as number[]
  };

  defenseValues.forEach(defense => {
    if (defense === 0 || defense <= 2000) {
      groups.early.push(defense);
    } else if (defense <= 4000) {
      groups.mid.push(defense);
    } else if (defense <= 6000) {
      groups.end.push(defense);
    } else {
      groups.outliers.push(defense);
    }
  });

  return groups;
};

const getStageInfo = (stage: string) => {
  switch (stage) {
    case 'early':
      return { label: 'Early Game Bosses (0-2000 Boss Defense)', color: 'border-green-500 bg-green-500/5', textColor: 'text-green-400' };
    case 'mid':
      return { label: 'Mid Game Bosses (2500-4000 Boss Defense)', color: 'border-yellow-500 bg-yellow-500/5', textColor: 'text-yellow-400' };
    case 'end':
      return { label: 'End Game Bosses (4500-6000 Boss Defense)', color: 'border-orange-500 bg-orange-500/5', textColor: 'text-orange-400' };
    case 'outliers':
      return { label: 'Rare High-Defense Bosses (7000+ Boss Defense)', color: 'border-red-500 bg-red-500/5', textColor: 'text-red-400' };
    default:
      return { label: '', color: '', textColor: '' };
  }
};

export default function PenetrationEffectivenessTable() {
  const defenseValues = useMemo(() => generateDefenseValues(), []);
  const penetrationValues = useMemo(() => generatePenetrationValues(), []);
  const groupedDefenseValues = useMemo(() => groupDefenseValuesByStage(defenseValues), [defenseValues]);

  return (
    <div className="space-y-6">
      {/* Formula Reference */}
      <div className="bg-component-card border border-border-dark p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-2">Damage Reduction Formulas</h3>
        <p className="text-xs text-gray-400 italic mb-4">Credits to osaka</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="bg-theme-dark p-3 rounded">
            <div className="font-semibold text-blue-300 mb-1">Base Reduction</div>
            <div className="font-mono text-xs">1 - 1000/(1000 + Defense)</div>
          </div>
          <div className="bg-theme-dark p-3 rounded">
            <div className="font-semibold text-yellow-300 mb-1">Penetration Effect</div>
            <div className="font-mono text-xs">1 - (Penetration/Defense)</div>
          </div>
          <div className="bg-theme-dark p-3 rounded">
            <div className="font-semibold text-green-300 mb-1">Final Reduction</div>
            <div className="font-mono text-xs">Base × PenEffect (min 0.3%, max 95%)</div>
          </div>
        </div>
        <div className="mt-4 p-3 bg-amber-900/30 border border-amber-500/50 rounded-lg">
          <p className="text-sm text-amber-200">
            The exact formula and interaction between penetration and defense has not 
            been officially confirmed by the game developers. However, the formulas used in this table provide a good 
            approximation.
          </p>
        </div>
      </div>

      {/* Table Legend */}
      <div className="bg-component-card border border-border-dark p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-3">How to Read the Table</h3>
        <div className="text-sm space-y-2">
          <p className="text-foreground/80">
            <strong>Rows:</strong> Boss defense values (what the enemy has)<br/>
            <strong>Columns:</strong> Your penetration stat<br/>
            <strong>Cell values:</strong> Final damage reduction % you'll face (lower = better damage)
          </p>
          <div className="flex flex-wrap gap-2">
            <span className="bg-green-900/50 text-green-300 px-2 py-1 rounded text-xs">0.3-15% Excellent</span>
            <span className="bg-yellow-800/50 text-yellow-200 px-2 py-1 rounded text-xs">15-30% Good</span>
            <span className="bg-orange-800/50 text-orange-200 px-2 py-1 rounded text-xs">30-50% OK</span>
            <span className="bg-red-800/50 text-red-200 px-2 py-1 rounded text-xs">50%+ Poor</span>
          </div>
          <p className="text-xs text-foreground/60">
            <strong>Note:</strong> Damage reduction cannot go below 0.3% (minimum cap) or above 95% (maximum cap).
          </p>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-component-card border border-border-dark rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-theme-darker border-b border-border-dark">
                <th className="sticky left-0 bg-theme-darker p-3 text-left font-semibold border-r border-border-dark">
                  Boss Defense
                </th>
                {penetrationValues.map((pen) => (
                  <th key={pen} className="p-3 text-center font-semibold min-w-[80px]">
                    {formatNumber(pen)}
                    <div className="text-xs text-foreground/60 font-normal">Pen</div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedDefenseValues).map(([stage, defenseList]) => {
                if (defenseList.length === 0) return null;
                const stageInfo = getStageInfo(stage);
                
                return (
                  <React.Fragment key={stage}>
                    {/* Stage Header Row */}
                    <tr className={`border-2 ${stageInfo.color}`}>
                      <td 
                        colSpan={penetrationValues.length + 1} 
                        className={`p-2 text-center font-bold ${stageInfo.textColor} ${stageInfo.color}`}
                      >
                        {stageInfo.label}
                      </td>
                    </tr>
                    
                    {/* Defense Rows for this stage */}
                    {defenseList.map((defense) => (
                      <tr 
                        key={defense} 
                        className={`border-b border-border-dark/50 hover:bg-theme-light/30 ${stageInfo.color}`}
                      >
                        <td className={`sticky left-0 bg-component-card p-3 font-semibold border-r border-border-dark ${stageInfo.color}`}>
                          {formatNumber(defense)}
                        </td>
                        {penetrationValues.map((penetration) => {
                          const reduction = calculateFinalDefenseReduction(defense, penetration);
                          const colorClass = getReductionColor(reduction);
                          
                          return (
                            <td 
                              key={`${defense}-${penetration}`} 
                              className={`p-3 text-center ${colorClass} transition-colors`}
                            >
                              {formatPercentage(reduction)}
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-component-card border border-border-dark p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="space-y-2">
            <div className="font-semibold text-blue-300">Penetration Effectiveness</div>
            <ul className="space-y-1 text-foreground/80">
              <li>• Penetration effectiveness varies based on target defense values</li>
              <li>• Higher defense targets may show more noticeable penetration benefits</li>
              <li>• Penetration can provide meaningful damage improvements across all defense ranges</li>
              <li>• Damage reduction is capped between 0.3% (minimum) and 95% (maximum)</li>
            </ul>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-yellow-300">Boss Defense Ranges</div>
            <ul className="space-y-1 text-foreground/80">
              <li>• Early game bosses: 1-2k boss defense</li>
              <li>• Mid game bosses: 3-4k boss defense</li>
              <li>• End game bosses: 4-6k boss defense</li>
              <li>• Rare high-defense bosses: 7k+ (e.g., Ruthless Groteus with 18,700)</li>
            </ul>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-green-300">Optimization Tips</div>
            <ul className="space-y-1 text-foreground/80">
              <li>• Consider penetration investment based on target content</li>
              <li>• Higher penetration values may show increased effectiveness</li>
              <li>• Efficiency may vary at different penetration levels</li>
              <li>• Consider balancing penetration with other offensive stats</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}