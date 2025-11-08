import React, { useState } from 'react';
import { getStatInfo, formatStatValue } from '../../data/stats-config';
import { calculateAllCP } from '../../data/cp-weights';
import { formatNumber } from '@/utils/numberFormat';

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
  
  // Calculate all CP types from the stats
  const cpValues = calculateAllCP(totalStats);

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
    <>
      {/* Stats Summary Button */}
      <div className={`flex items-center gap-3 ${className}`}>
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
      </div>

      {/* Independent Modal - Not attached to button */}
      {showStats && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm" 
            onClick={() => setShowStats(false)}
          />
          
          {/* Modal Window - Centered and independent */}
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] max-w-[90vw] max-h-[80vh] bg-component-card border-2 border-border-dark rounded-lg shadow-2xl z-50 flex flex-col">
            {/* Header */}
            <div className="p-4 border-b border-border-dark">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-semibold text-lg text-foreground flex items-center gap-2">
                  <span>📊</span>
                  Total {systemName} Stats
                </h4>
                <button
                  onClick={() => setShowStats(false)}
                  className="text-foreground/60 hover:text-foreground hover:bg-theme-darker rounded p-1 transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              {/* CP Display */}
              {(cpValues.general > 0 || cpValues.pve > 0 || cpValues.pvp > 0) && (
                <div className="flex flex-col gap-2 mt-2 pt-2 border-t border-border-dark/50">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-gray-400">General CP:</span>
                    <span className="text-base font-bold text-game-gold">
                      {formatNumber(cpValues.general)} CP
                    </span>
                  </div>
                  {cpValues.pve > cpValues.general && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">PvE CP:</span>
                      <span className="text-base font-bold text-game-gold">
                        {formatNumber(cpValues.pve)} CP
                      </span>
                    </div>
                  )}
                  {cpValues.pvp > cpValues.general && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">PvP CP:</span>
                      <span className="text-base font-bold text-game-gold">
                        {formatNumber(cpValues.pvp)} CP
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Content */}
            <div className="p-4 overflow-y-auto dark-scrollbar flex-1">
              {hasStats ? (
                <div className="space-y-2">
                  {Object.entries(totalStats)
                    .sort(([a], [b]) => formatStatName(a).localeCompare(formatStatName(b)))
                    .map(([stat, value]) => {
                      return (
                        <div key={stat} className="flex justify-between items-center p-3 rounded-md text-sm bg-theme-darker hover:bg-theme-dark transition-colors">
                          <span className="flex-1 pr-3 text-foreground/90 font-medium" title={formatStatName(stat)}>
                            {formatStatName(stat)}
                          </span>
                          <span className="font-bold flex-shrink-0 text-game-highlight text-base">
                            +{formatStatValue(stat, value)}
                          </span>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <div className="text-center py-12 text-foreground/60">
                  <div className="text-5xl mb-3">📊</div>
                  <p className="text-base font-medium mb-1">No stats configured yet</p>
                  <p className="text-sm text-foreground/40">
                    Configure items in this system to see stats here
                  </p>
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
};