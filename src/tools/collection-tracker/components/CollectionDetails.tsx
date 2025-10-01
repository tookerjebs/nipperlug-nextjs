'use client';

import React, { useState, useEffect } from 'react';
import { cn } from '@/tools/build-planner/lib/utils';
import { useCollectionTrackerStore } from '../stores/collectionTrackerStore';
import type { Collection } from '../types';

interface CollectionDetailsProps {
  collection: Collection;
}

export function CollectionDetails({ collection }: CollectionDetailsProps) {
  const { 
    getCollectionProgress, 
    isMissionCompleted, 
    isItemCompleted,
    toggleItemCompletion,
    completeAllItemsInCollection
  } = useCollectionTrackerStore();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const currentProgress = isClient ? getCollectionProgress(collection.id, collection) : 0;
  const missions = Object.values(collection.missions);

  // Format stats for display
  const formatStatsDisplay = (stats: Record<string, number>) => {
    if (Object.keys(stats).length === 0) return 'No stats available';
    
    const statTexts = [];
    for (const statId in stats) {
      const value = stats[statId];
      statTexts.push(`${statId} +${value}`);
    }
    return statTexts.join(', ');
  };

  // Calculate completion stats
  const totalItems = missions.reduce((sum, mission) => sum + mission.items.length, 0);
  const completedItems = isClient ? missions.reduce((sum, mission) => 
    sum + mission.items.filter(item => isItemCompleted(collection.id, mission.name, item.name, item.count)).length, 0
  ) : 0;
  const actualPercentage = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0;

  // Get progress class for styling
  const getProgressClass = (progress: number) => {
    if (progress >= 100) return 'high';
    if (progress >= 60) return 'medium';
    if (progress > 0) return 'low';
    return '';
  };

  const progressClass = getProgressClass(currentProgress);

  return (
    <div className="h-full flex flex-col">
      
      {/* Collection Header */}
      <div className="p-6 border-b border-border-dark flex-shrink-0">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-100">{collection.name}</h2>
          <button
            onClick={() => completeAllItemsInCollection(collection.id, collection)}
            className="glass-button-green text-white font-semibold py-2 px-4 rounded-lg transition duration-150 hover:glass-button-hover text-sm"
          >
            Complete All
          </button>
        </div>

        {/* Progress Bar */}
        <div className="mb-4">
          <div className="h-2 bg-theme-darker rounded-lg overflow-hidden">
            <div 
              className={cn(
                "h-full transition-all duration-300 rounded-lg",
                progressClass === 'high' && "bg-game-gold shadow-sm",
                progressClass === 'medium' && "bg-yellow-400",
                progressClass === 'low' && "bg-orange-400",
                !progressClass && "bg-gray-500"
              )}
              style={{ width: `${actualPercentage}%` }}
            />
            {/* Milestone markers */}
            <div className="relative -mt-2">
              {[30, 60, 100].map((milestone) => (
                <div
                  key={milestone}
                  className="absolute top-0 w-0.5 h-2 bg-white/30"
                  style={{ left: `${milestone}%` }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Stats Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[30, 60, 100].map((milestone) => (
            <div 
              key={milestone}
              className={cn(
                "p-3 rounded-lg",
                currentProgress >= milestone
                  ? "glass-panel border-game-highlight text-white"
                  : "glass-panel-light text-gray-400"
              )}
            >
              <div className="text-sm font-semibold mb-1">{milestone}% Bonus</div>
              <div className="text-xs">
                {formatStatsDisplay(collection.stats[milestone as keyof typeof collection.stats])}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Missions List */}
      <div className="flex-1 overflow-y-auto dark-scrollbar min-h-0">
        <div className="p-6 space-y-4">
          {missions.map((mission, index) => {
            const isMissionComplete = isClient ? isMissionCompleted(collection.id, mission.name, mission) : false;
            const completedMissionItems = isClient ? mission.items.filter(item => 
              isItemCompleted(collection.id, mission.name, item.name, item.count)
            ).length : 0;
            
            return (
              <div 
                key={mission.name}
                className="p-4 rounded-lg transition-all duration-200 glass-panel-light hover:glass-panel shadow-sm border border-border-dark/50"
              >
                {/* Mission Header */}
                <div className="flex items-center justify-between mb-4 pb-3 border-b-2 border-border-light">
                  <h3 className="text-lg font-semibold text-gray-100">
                    {mission.name}
                  </h3>
                  {/* Mission Rewards */}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-300">Rewards:</span>
                    <div className="flex items-center gap-2">
                      {mission.rewards.map((reward, rewardIndex) => (
                        <span 
                          key={rewardIndex}
                          className={cn(
                            "text-sm px-3 py-1.5 rounded-md font-medium",
                            isMissionComplete
                              ? "bg-green-500/15 text-green-300"
                              : "bg-game-gold/15 text-game-gold"
                          )}
                        >
                          {reward.name} ×{reward.count}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Required Items */}
                <div>
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">Required Items</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {mission.items.map((item, itemIndex) => {
                      const isCompleted = isClient ? isItemCompleted(collection.id, mission.name, item.name, item.count) : false;
                      
                      return (
                        <div 
                          key={itemIndex}
                          className={cn(
                            "flex items-center justify-between p-2.5 rounded-lg border-2 transition-all duration-200 cursor-pointer",
                            isCompleted
                              ? "bg-green-500/10 border-green-500/30 shadow-sm"
                              : "bg-theme-darker/50 hover:bg-theme-darker/70 border-border-light hover:border-border-highlight"
                          )}
                          onClick={() => toggleItemCompletion(collection.id, mission.name, item.name, item.count)}
                        >
                          <div className="flex items-center gap-2 flex-1 min-w-0">
                            <div className={cn(
                              "w-4 h-4 rounded border-2 flex items-center justify-center text-xs flex-shrink-0",
                              isCompleted
                                ? "bg-green-500 border-green-500 text-white"
                                : "border-gray-400"
                            )}>
                              {isCompleted && '✓'}
                            </div>
                            <span className={cn(
                              "text-sm truncate",
                              isCompleted ? "text-green-300" : "text-gray-100"
                            )}>
                              {item.name}
                            </span>
                          </div>
                          <span className={cn(
                            "font-medium ml-2 flex-shrink-0",
                            isCompleted ? "text-green-300" : "text-game-gold"
                          )}>
                            ×{item.count}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}