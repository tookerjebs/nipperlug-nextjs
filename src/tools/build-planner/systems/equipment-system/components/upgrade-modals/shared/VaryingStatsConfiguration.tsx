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
      <h3 className="text-md font-semibold text-game-gold mb-3">
        Varying Stats ({varyingStats.length}/{maxVaryingStats})
      </h3>
      
      {/* Current varying stats */}
      {varyingStats.length > 0 && (
        <div className="space-y-2 mb-4">
          {varyingStats.map((varyingStat, index) => {
            const option = varyingStatOptions.find(opt => opt.statId === varyingStat.statId);
            return (
              <div key={index} className="flex items-center justify-between bg-theme-dark p-2 rounded">
                <span className="text-sm text-game-gold">{option?.name || varyingStat.statId}:</span>
                <div className="flex items-center space-x-2">
                  <select
                    value={varyingStat.value}
                    onChange={(e) => onChangeVaryingStat(index, Number(e.target.value))}
                    className="bg-theme-darker border border-border-dark rounded pl-2 pr-10 py-1 text-sm text-white min-w-[70px]"
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
      )}

      {/* Add new varying stat */}
      {varyingStats.length < maxVaryingStats && (
        <div className="grid grid-cols-1 gap-2">
          {varyingStatOptions.map(option => (
            <div key={option.statId} className="flex items-center justify-between bg-theme-dark p-2 rounded">
              <span className="text-sm text-gray-300">{option.name}:</span>
              <div className="flex items-center space-x-2">
                {option.values.map(value => (
                  <button
                    key={value}
                    onClick={() => onAddVaryingStat(option.statId, value)}
                    className="text-game-gold hover:text-game-gold/80 px-3 py-1 rounded text-xs font-medium transition-colors duration-200"
                    style={{ border: '1px solid rgba(255, 215, 0, 0.3)' }}
                    onMouseEnter={(e) => e.currentTarget.style.border = '1px solid rgba(255, 215, 0, 0.5)'}
                    onMouseLeave={(e) => e.currentTarget.style.border = '1px solid rgba(255, 215, 0, 0.3)'}
                  >
                    +{value}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VaryingStatsConfiguration;