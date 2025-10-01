'use client';

/**
 * VaryingStatsConfiguration Component
 * Unified varying stats configuration component for unique equipment items
 * Uses standardized yellow theme styling
 */

import React from 'react';

export interface VaryingStatOption {
  statId: string;
  name: string;
  values: number[];
}

export interface SelectedVaryingStat {
  statId: string;
  value: number;
}

interface VaryingStatsConfigurationProps {
  varyingStats: SelectedVaryingStat[];
  varyingStatOptions: VaryingStatOption[];
  maxVaryingStats: number;
  onAddVaryingStat: (statId: string, value: number) => void;
  onRemoveVaryingStat: (index: number) => void;
  onChangeVaryingStat: (index: number, newValue: number) => void;
}

const VaryingStatsConfiguration: React.FC<VaryingStatsConfigurationProps> = ({
  varyingStats,
  varyingStatOptions,
  maxVaryingStats,
  onAddVaryingStat,
  onRemoveVaryingStat,
  onChangeVaryingStat
}) => {
  return (
    <div className="mb-6 bg-theme-darker p-5 rounded-md border border-border-dark">
      <h3 className="text-md font-semibold text-amber-300 mb-3">
        Varying Stats ({varyingStats.length}/{maxVaryingStats})
      </h3>
      
      {/* Current varying stats */}
      {varyingStats.length > 0 && (
        <div className="mb-4">
          <h4 className="text-sm font-medium text-gray-300 mb-2">Selected Stats:</h4>
          <div className="space-y-2">
            {varyingStats.map((varyingStat, index) => {
              const option = varyingStatOptions.find(opt => opt.statId === varyingStat.statId);
              return (
                <div key={index} className="flex items-center justify-between bg-theme-dark p-2 rounded">
                  <span className="text-sm text-amber-300">{option?.name || varyingStat.statId}:</span>
                  <div className="flex items-center space-x-2">
                    <select
                      value={varyingStat.value}
                      onChange={(e) => onChangeVaryingStat(index, Number(e.target.value))}
                      className="bg-theme-darker border border-border-dark rounded px-2 py-1 text-sm text-white"
                    >
                      {option?.values.map(value => (
                        <option key={value} value={value}>+{value}</option>
                      ))}
                    </select>
                    <button
                      onClick={() => onRemoveVaryingStat(index)}
                      className="text-red-400 hover:text-red-300 text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Add new varying stat */}
      {varyingStats.length < maxVaryingStats && (
        <div>
          <h4 className="text-sm font-medium text-gray-300 mb-2">Add Stat:</h4>
          <div className="grid grid-cols-1 gap-2">
            {varyingStatOptions.map(option => (
              <div key={option.statId} className="flex items-center justify-between bg-theme-dark p-2 rounded">
                <span className="text-sm text-gray-300">{option.name}:</span>
                <div className="flex items-center space-x-2">
                  {option.values.map(value => (
                    <button
                      key={value}
                      onClick={() => onAddVaryingStat(option.statId, value)}
                      className="text-amber-300 hover:text-amber-200 px-2 py-1 rounded text-xs font-medium transition-colors duration-200 border border-amber-500/30 hover:border-amber-400/50"
                    >
                      +{value}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default VaryingStatsConfiguration;