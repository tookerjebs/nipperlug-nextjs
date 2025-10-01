// Independent stats summary component for Overlord Mastery system
import React from 'react';
import { useOverlordMasteryStore } from '../stores/overlordMasteryStore';
import { getStatInfo, formatStatValue } from '@/tools/build-planner/data/stats-config';

export const OverlordMasteryStats: React.FC = () => {
  const { calculateTotalStats } = useOverlordMasteryStore();
  
  const totalStats = calculateTotalStats();
  const totalStatsCount = Object.keys(totalStats).length;

  if (totalStatsCount === 0) {
    return (
      <div className="bg-theme-darker/50 rounded-lg p-4 border border-border-dark">
        <h3 className="text-lg font-semibold text-game-gold mb-4 text-center">Mastery Stats</h3>
        <div className="text-center text-gray-400 text-sm">
          No stats allocated yet
        </div>
      </div>
    );
  }

  return (
    <div className="bg-theme-darker/50 rounded-lg p-4 border border-border-dark">
      <h3 className="text-lg font-semibold text-game-gold mb-4 text-center">Mastery Stats</h3>
      <div className="space-y-2">
        {Object.entries(totalStats).map(([statId, value]) => {
          const statInfo = getStatInfo(statId);
          return (
            <div key={statId} className="flex justify-between items-center py-1 px-2 rounded bg-theme-darker/30">
              <span className="text-gray-300 text-sm">
                {statInfo?.name || statId.replace(/([A-Z])/g, ' $1').trim()}
              </span>
              <span className="text-game-gold font-medium text-sm">
                {formatStatValue(statId, value)}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};