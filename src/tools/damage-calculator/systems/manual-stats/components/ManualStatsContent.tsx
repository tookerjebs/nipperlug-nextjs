'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { getStatInfo, formatStatValue, getStatsByCategory } from '../../../data/stats-config';
import { useManualStatsStore } from '../stores/manual-stats-store';

interface ManualStatsContentProps {
  className?: string;
}

// Move StatInputItem outside the main component to prevent recreation on every render
const StatInputItem = React.memo(({ 
  statId, 
  colorClass
}: { 
  statId: string; 
  colorClass: string; 
}) => {
  const { stats, updateStat } = useManualStatsStore();
  const statInfo = getStatInfo(statId);
  
  if (!statInfo) return null;
  
  const storeValue = stats[statId] || 0;
  const displayValue = storeValue === 0 ? '' : storeValue.toString();
  const hasValue = storeValue !== 0;
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Update store immediately - no debouncing
    if (value === '' || value === '0') {
      updateStat(statId, 0);
    } else {
      const numValue = parseFloat(value);
      if (!isNaN(numValue)) {
        updateStat(statId, numValue);
      }
    }
  };
  
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="text-gray-300 text-sm flex-1">{statInfo.name}:</span>
      <input
        type="number"
        value={displayValue}
        onChange={handleChange}
        className={`
          bg-gray-800 border rounded px-2 py-1 w-20 text-sm text-right
          ${hasValue 
            ? `border-${colorClass.replace('text-', '')} ${colorClass}` 
            : 'border-gray-600 text-gray-300'
          }
          focus:outline-none focus:border-game-highlight focus:text-white
          [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none
        `}
        placeholder="0"
        step="any"
      />
    </div>
  );
});

// Move StatInputColumn outside to prevent recreation on every render
const StatInputColumn = React.memo(({ 
  title, 
  stats, 
  borderClass, 
  textClass 
}: { 
  title: string; 
  stats: string[]; 
  borderClass: string; 
  textClass: string; 
}) => (
  <div className={`glass-panel-light border-l-2 ${borderClass} p-3 sm:p-4`}>
    <h4 className={`text-sm font-medium mb-3 ${textClass} uppercase tracking-wide`}>{title}</h4>
    <div className="space-y-2">
      {stats.map(statId => (
        <StatInputItem 
          key={statId} 
          statId={statId} 
          colorClass={textClass}
        />
      ))}
    </div>
  </div>
));

export default function ManualStatsContent({ className = '' }: ManualStatsContentProps) {
  const { stats, resetAllStats } = useManualStatsStore();
  const [activeTab, setActiveTab] = useState<'offensive' | 'defensive' | 'utility'>('offensive');

  // Configuration for different stat categories
  const categoryConfig = {
    offensive: {
      borderClass: 'border-stat-offensive',
      textClass: 'text-stat-offensive'
    },
    defensive: {
      borderClass: 'border-stat-defensive',
      textClass: 'text-stat-defensive'
    },
    utility: {
      borderClass: 'border-stat-utility',
      textClass: 'text-stat-utility'
    }
  };

  // Generic renderer for offensive and defensive stats (responsive column layout)
  const renderThreeColumnStats = (category: 'offensive' | 'defensive') => {
    const categoryStats = getStatsByCategory(category);
    const config = categoryConfig[category];
    
    // Filter stats into base, pvp, and pve categories
    const baseStats = categoryStats.filter(stat => !stat.startsWith('pvp') && !stat.startsWith('pve'));
    const pvpStats = categoryStats.filter(stat => stat.startsWith('pvp'));
    const pveStats = categoryStats.filter(stat => stat.startsWith('pve'));

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 lg:gap-6">
        <StatInputColumn 
          title="Base Stats" 
          stats={baseStats} 
          borderClass={config.borderClass} 
          textClass={config.textClass} 
        />
        <StatInputColumn 
          title="PvP Stats" 
          stats={pvpStats} 
          borderClass={config.borderClass} 
          textClass={config.textClass} 
        />
        <StatInputColumn 
          title="PvE Stats" 
          stats={pveStats} 
          borderClass={config.borderClass} 
          textClass={config.textClass} 
        />
      </div>
    );
  };

  const renderOffensiveStats = () => renderThreeColumnStats('offensive');
  const renderDefensiveStats = () => renderThreeColumnStats('defensive');

  const renderUtilityStats = () => {
    const utilityStats = getStatsByCategory('utility');
    const config = categoryConfig.utility;
    
    // Determine if we should use a single column or multi-column layout
    const useMultiColumn = utilityStats.length > 6;
    
    return (
      <div className={`${useMultiColumn ? 'grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6' : ''}` }>
        <StatInputColumn 
          title="Utility Stats" 
          stats={utilityStats.slice(0, useMultiColumn ? Math.ceil(utilityStats.length / 2) : utilityStats.length)} 
          borderClass={config.borderClass} 
          textClass={config.textClass} 
        />

        {useMultiColumn && (
          <div className={`glass-panel-light border-l-2 ${config.borderClass} p-3 sm:p-4`}>
            <h4 className={`text-sm font-medium mb-3 ${config.textClass} uppercase tracking-wide`}>&nbsp;</h4>
            <div className="space-y-2">
              {utilityStats.slice(Math.ceil(utilityStats.length / 2)).map(statId => (
                <StatInputItem 
                  key={statId} 
                  statId={statId} 
                  colorClass={config.textClass}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  };

  const tabs = [
    { id: 'offensive' as const, name: 'Offensive', color: 'text-stat-offensive', bgColor: 'glass-button-offensive' },
    { id: 'defensive' as const, name: 'Defensive', color: 'text-stat-defensive', bgColor: 'glass-button-defensive' },
    { id: 'utility' as const, name: 'Utility', color: 'text-stat-utility', bgColor: 'glass-button-utility' }
  ];

  // Count total manual stats
  const totalManualStats = Object.keys(stats).length;

  return (
    <div className={`${className}`}>
      {/* Header with reset button */}
      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-gray-400">
          {totalManualStats > 0 ? (
            <span>{totalManualStats} stat{totalManualStats !== 1 ? 's' : ''} entered</span>
          ) : (
            <p className="text-sm text-gray-400">
              Enter your character's stats to calculate damage output and combat power.
            </p>
          )}
        </div>
        {totalManualStats > 0 && (
          <button
            onClick={resetAllStats}
            className="glass-button-red text-white font-medium py-1 px-3 rounded-lg transition duration-150 hover:glass-button-hover text-sm"
          >
            Reset All
          </button>
        )}
      </div>
      
      {/* Tab Navigation */}
      <div className="flex flex-col sm:flex-row space-y-1 sm:space-y-0 sm:space-x-1 mb-4 sm:mb-6 glass-button-group p-1 rounded-lg">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex-1 py-2 px-3 sm:px-4 rounded-md text-sm font-medium transition-all duration-200 border ${
              activeTab === tab.id
                ? `${tab.bgColor} text-white border-2 glow-border shadow-lg`
                : `${tab.color} border-transparent hover:text-white hover:glass-button-hover hover:border-border-light`
            }`}
          >
            {tab.name}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-64 sm:min-h-80 lg:min-h-96">
        {activeTab === 'offensive' && renderOffensiveStats()}
        {activeTab === 'defensive' && renderDefensiveStats()}
        {activeTab === 'utility' && renderUtilityStats()}
      </div>
    </div>
  );
}