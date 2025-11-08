import React, { useState } from 'react';
import { getStatInfo, formatStatValue } from '../../data/stats-config';

interface TotalStatsButtonProps {
  totalStats: Record<string, number>;
  systemName?: string;
  className?: string;
}

export const TotalStatsButton: React.FC<TotalStatsButtonProps> = ({
  totalStats,
  systemName = 'System',
  className = ''
}) => {
  const [showStats, setShowStats] = useState(false);

  // Helper function to format stat names using stats-config
  const formatStatName = (stat: string): string => {
    const statInfo = getStatInfo(stat);
    return statInfo ? statInfo.name : stat.split(/(?=[A-Z])/).map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  // Helper function to check if a stat is a pseudo stat
  const isPseudoStat = (stat: string): boolean => {
    const pseudoStats = ['allAttackUp', 'allAttackUpPercent', 'pveAllAttackUp', 'pvpAllAttackUp', 'allSkillAmp', 'str', 'int', 'dex'];
    return pseudoStats.includes(stat);
  };

  const hasStats = Object.keys(totalStats).length > 0;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Stats Summary Button */}
      <div className="relative">
        <button
          onClick={() => setShowStats(!showStats)}
          className={`px-3 py-1 bg-theme-dark border border-border-dark rounded-md text-sm font-medium text-foreground hover:bg-theme-light hover:border-game-highlight/50 transition-all duration-200 flex items-center gap-2 ${!hasStats ? 'opacity-75' : ''}`}
        >
          <span>📊</span>
          <span>Total Stats</span>
          <span className={`text-xs px-2 py-1 rounded-full ${hasStats ? 'bg-game-highlight/20 text-game-highlight' : 'bg-gray-500/20 text-gray-400'}`}>
            {hasStats ? Object.keys(totalStats).length : '0'}
          </span>
        </button>

        {/* Stats Dropdown */}
        {showStats && (
          <div className="absolute top-full right-0 mt-2 min-w-80 max-w-96 bg-component-card border border-border-dark rounded-lg shadow-lg z-50">
            <div className="p-4">
              <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                <span>📊</span>
                Total {systemName} Stats
              </h4>
              {hasStats ? (
                <div className="space-y-1 max-h-80 overflow-y-auto dark-scrollbar">
                  {Object.entries(totalStats)
                    .sort(([a], [b]) => formatStatName(a).localeCompare(formatStatName(b)))
                    .map(([stat, value]) => {
                      return (
                        <div key={stat} className="flex justify-between items-center p-2 rounded text-sm min-h-8 bg-theme-darker">
                          <span className="flex-1 pr-3 truncate text-foreground/80" title={formatStatName(stat)}>
                            {formatStatName(stat)}
                          </span>
                          <span className="font-medium flex-shrink-0 text-game-highlight">
                            +{formatStatValue(stat, value)}
                          </span>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <div className="text-center py-8 text-foreground/60">
                  <div className="text-4xl mb-2">📊</div>
                  <p className="text-sm">No stats configured yet</p>
                  <p className="text-xs text-foreground/40 mt-1">
                    Configure items in this system to see stats here
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Click outside to close stats */}
      {showStats && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowStats(false)}
        />
      )}
    </div>
  );
};