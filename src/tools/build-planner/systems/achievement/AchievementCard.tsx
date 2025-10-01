import React from 'react';
import { Achievement } from './types/achievement';
import { getStatInfo, formatStatValue } from '../../data/stats-config';
import { getCategoryIcon, getCategoryIconAlt } from './utils/iconMapping';

interface AchievementCardProps {
  achievement: Achievement;
  onToggle: (achievementId: string, milestone?: number) => void;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  achievement,
  onToggle
}) => {
  // Helper function to format stat names using stats-config
  const formatStatName = (stat: string): string => {
    const statInfo = getStatInfo(stat);
    return statInfo ? statInfo.name : stat.split(/(?=[A-Z])/).map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  const renderStats = (stats: Record<string, number>) => {
    return Object.entries(stats).map(([stat, value]) => (
      <span key={stat} className="inline-block bg-theme-darker px-2 py-1 rounded text-xs text-foreground/80">
        {formatStatName(stat)}: +{formatStatValue(stat, value)}
      </span>
    ));
  };



  const renderAchievement = () => {
    const isSingle = achievement.type === 'single';
    const selectedValue = isSingle ? (achievement.isCompleted ? 1 : 0) : (achievement.selectedMilestone || 0);
    const totalOptions = isSingle ? 1 : (achievement.milestones?.length || 0);
    const progressPercentage = totalOptions > 0 ? (selectedValue / totalOptions) * 100 : 0;
    
    // Define currentStats based on achievement state
    const currentStats = isSingle 
      ? (achievement.isCompleted ? achievement.stats : null)
      : (selectedValue > 0 && achievement.milestones ? 
          // Calculate cumulative stats for milestone achievements
          (() => {
            const cumulativeStats: Record<string, number> = {};
            for (let i = 0; i <= selectedValue - 1; i++) {
              const milestone = achievement.milestones[i];
              if (milestone) {
                Object.entries(milestone.stats).forEach(([stat, value]) => {
                  cumulativeStats[stat] = (cumulativeStats[stat] || 0) + value;
                });
              }
            }
            return cumulativeStats;
          })()
        : null);

    return (
      <div className="bg-[#1e1e28b3] border border-border-dark rounded-lg p-4 hover:border-game-highlight/50 transition-all duration-200 h-full flex flex-col w-full min-h-[200px]">
        <div className="flex items-start gap-4 flex-1">
          {/* Achievement Icon */}
          <div className="w-12 h-12 bg-theme-darker rounded-lg flex items-center justify-center flex-shrink-0">
            <img 
              src={getCategoryIcon(achievement.category)} 
              alt={getCategoryIconAlt(achievement.category)} 
              className="w-10 h-10" 
            />
          </div>

          {/* Achievement Info */}
          <div className="flex-1 min-w-0 flex flex-col">
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground mb-1 leading-tight" title={achievement.name}>{achievement.name}</h4>
              </div>
            </div>

            {/* Progress Bar (only for milestone achievements) */}
            {!isSingle && (
              <div className="mb-3">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-foreground">
                    {selectedValue > 0 ? `Milestone ${selectedValue} of ${totalOptions}` : 'No milestone selected'}
                  </span>
                  {selectedValue > 0 && achievement.milestones && (
                    <span className="text-xs text-foreground/70 font-medium">
                      {achievement.milestones[selectedValue - 1].threshold.toLocaleString()} runs
                    </span>
                  )}
                </div>
                <div className="w-full bg-theme-darker rounded-full h-2">
                  <div 
                    className="bg-gradient-to-r from-yellow-500 to-orange-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${progressPercentage}%` }}
                  />
                </div>
              </div>
            )}

            {/* Current Stats */}
            {currentStats && Object.keys(currentStats).length > 0 && (
              <div className="mb-3">
                <div className="text-xs font-medium text-foreground/80 mb-2">
                  {isSingle ? 'Stats:' : 'Total Stats (Cumulative):'}
                </div>
                <div className="flex flex-wrap gap-2">
                  {Object.entries(currentStats).map(([stat, value]) => {
                    const statInfo = getStatInfo(stat);
                    const displayName = statInfo?.name || stat;
                    const formattedValue = formatStatValue(stat, value);
                    
                    return (
                      <span
                        key={stat}
                        className="inline-flex items-center px-2 py-1 bg-theme-darker rounded text-xs text-foreground"
                        title={`${displayName}: +${formattedValue}`}
                      >
                        <span className="truncate max-w-[120px]">{displayName}: +{formattedValue}</span>
                      </span>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Dropdown for milestones */}
            {!isSingle && (
              <div className="mb-3">
                <label className="block text-xs font-medium text-foreground/80 mb-2">
                  Select Milestone:
                </label>
                <select
                  value={selectedValue}
                  onChange={(e) => onToggle(achievement.id, parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-theme-darker border border-border-dark rounded-md text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-game-highlight/50 focus:border-game-highlight truncate min-w-0"
                >
                  <option value={0}>None</option>
                  {achievement.milestones?.map((milestone, index) => {
                    const milestoneNumber = index + 1;
                    const statsText = Object.entries(milestone.stats)
                      .map(([stat, value]) => {
                        const statInfo = getStatInfo(stat);
                        const displayName = statInfo?.name || stat;
                        const formattedValue = formatStatValue(stat, value);
                        return `${displayName}: +${formattedValue}`;
                      })
                      .join(', ');
                    
                    const statCount = Object.keys(milestone.stats).length;
                    const shortText = statCount === 1 
                      ? Object.entries(milestone.stats)[0][1] + ' ' + (getStatInfo(Object.keys(milestone.stats)[0])?.name || Object.keys(milestone.stats)[0])
                      : `${statCount} stats`;
                    
                    // Show the actual threshold value (e.g., "100 runs", "500 runs")
                    const thresholdText = milestone.threshold.toLocaleString();
                    
                    return (
                      <option key={milestoneNumber} value={milestoneNumber} title={`${thresholdText} - ${statsText}`}>
                        {thresholdText} - {shortText}
                      </option>
                    );
                  })}
                </select>
              </div>
            )}

            {/* Dropdown for single achievements */}
            {isSingle && (
              <div className="flex items-center gap-2">
                <label className="text-sm text-foreground/70">
                  Status:
                </label>
                <select
                  value={selectedValue}
                  onChange={(e) => onToggle(achievement.id, parseInt(e.target.value))}
                  className="bg-theme-darker border border-border-dark rounded px-3 py-1 text-sm text-foreground focus:border-game-highlight focus:outline-none min-w-0 flex-1"
                >
                  <option value={0}>None</option>
                  <option value={1} title={`Complete - ${Object.entries(achievement.stats || {}).map(([stat, value]) => `${formatStatName(stat)}: +${formatStatValue(stat, value)}`).join(', ')}`}>
                    Complete
                  </option>
                </select>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return renderAchievement();
};