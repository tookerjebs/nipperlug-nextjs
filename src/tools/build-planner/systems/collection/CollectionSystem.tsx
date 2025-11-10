'use client';

import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { useCollectionStore } from './stores/collectionStore';
import { COLLECTION_DATA, getLocationsByCategory } from './data/collection-data';
import { getStatInfo, formatStatValue } from '@/tools/build-planner/data/stats-config';
import { cn } from '@/tools/build-planner/lib/utils';
import { ActionButtons } from '@/tools/build-planner/components/systems/ActionButtons';
import { TotalStatsButton } from '@/tools/build-planner/components/systems/TotalStatsButton';
import { StatIcon } from '@/tools/build-planner/components/StatIcon';
import CollectionExportImportButtons from './components/CollectionExportImportButtons';

export function CollectionSystem() {
  const {
    activeCategory,
    activeCollection,
    collectionProgress,
    totalStats,
    isInitialized,
    setActiveCategory,
    setActiveCollection,
    setCollectionProgress,
    getCollectionProgress,
    getCollectionStatsAtCurrentProgress,
    getCollectionStatsAtProgress,
    initialize,
    quickFillAll,
    resetAllProgress
  } = useCollectionStore();

  // Search functionality
  const [searchTerm, setSearchTerm] = useState('');

  // Initialize the system
  useEffect(() => {
    if (!isInitialized) {
      initialize();
    }
  }, [isInitialized, initialize]);

  // Memoized filtered collections - only recalculates when category or search changes
  const filteredCollections = useMemo(() => {
    const collections = getLocationsByCategory(activeCategory);
    
    if (!searchTerm.trim()) {
      return collections;
    }
    
    return collections.filter(collection => {
      // Search by collection name
      if (collection.name.toLowerCase().includes(searchTerm.toLowerCase())) {
        return true;
      }
      
      // Search by stat names that this collection provides
      const collectionData = COLLECTION_DATA.categories[activeCategory].collections[collection.id];
      if (collectionData) {
        // Check all progress levels for matching stats
        for (const progressLevel of [30, 60, 100]) {
          const stats = collectionData.stats[progressLevel as keyof typeof collectionData.stats];
          if (stats) {
            for (const statId in stats) {
              const statInfo = getStatInfo(statId);
              const statName = statInfo ? statInfo.name : statId;
              if (statName.toLowerCase().includes(searchTerm.toLowerCase()) || 
                  statId.toLowerCase().includes(searchTerm.toLowerCase())) {
                return true;
              }
            }
          }
        }
      }
      
      return false;
    });
  }, [activeCategory, searchTerm]);

  // Get progress class for styling
  const getProgressClass = (progress: number) => {
    if (progress >= 100) return 'high';
    if (progress >= 60) return 'medium';
    if (progress > 0) return 'low';
    return '';
  };

  // Memoized function to get collection display data - prevents unnecessary recalculations
  const getCollectionDisplayData = useCallback((location: any) => {
    const progress = getCollectionProgress(location.id);
    const progressClass = getProgressClass(progress);
    const stats = getCollectionStatsAtProgress(location.id, progress);
    const isActive = activeCollection === location.id;
    const milestones = getMilestoneData(location.id);
    const headerText = formatHeaderWithStats(location.name, location.id, progress);
    
    return {
      progress,
      progressClass,
      stats,
      isActive,
      milestones,
      headerText
    };
  }, [collectionProgress, activeCollection, activeCategory, getCollectionProgress, getCollectionStatsAtProgress]);

  // Format stats for display
  const formatStatsForDisplay = (stats: Record<string, number>) => {
    if (Object.keys(stats).length === 0) return 'No stats';
    
    const statTexts = [];
    for (const statId in stats) {
      const value = stats[statId];
      const statInfo = getStatInfo(statId);
      const statName = statInfo ? statInfo.name : statId;
      const displayValue = formatStatValue(statId, value);
      statTexts.push(`${statName} +${displayValue}`);
    }
    return statTexts.join(', ');
  };

  // Get milestone data for progress bars
  const getMilestoneData = (collectionId: string) => {
    const categoryId = activeCategory;
    const collectionData = COLLECTION_DATA.categories[categoryId]?.collections[collectionId];
    
    if (!collectionData) return [];
    
    const milestones = [];
    const progressLevels = [30, 60]; // Removed 100% milestone
    
    for (const level of progressLevels) {
      const stats = collectionData.stats[level as keyof typeof collectionData.stats];
      if (stats) {
        const statTexts = [];
        for (const statId in stats) {
          const value = stats[statId];
          const displayValue = formatStatValue(statId, value);
          statTexts.push(`+${displayValue}`);
        }
        
        milestones.push({
          percentage: level,
          label: statTexts.join(', '),
          stats: stats
        });
      }
    }
    
    return milestones;
  };

  // Format header with current stats
  const formatHeaderWithStats = (locationName: string, collectionId: string, currentProgress: number) => {
    // If progress is 0, show what stats are available (first milestone stats)
    if (currentProgress === 0) {
      const categoryId = activeCategory;
      const collectionData = COLLECTION_DATA.categories[categoryId]?.collections[collectionId];
      
      if (collectionData) {
        // Get the first available stats (usually at 30% progress)
        const firstMilestone = collectionData.stats[30];
        if (firstMilestone && Object.keys(firstMilestone).length > 0) {
          const statTexts = [];
          for (const statId in firstMilestone) {
            const statInfo = getStatInfo(statId);
            const statName = statInfo ? statInfo.name : statId;
            statTexts.push(statName);
          }
          return `${locationName} - ${statTexts.join(', ')}`;
        }
      }
      
      return locationName;
    }
    
    const stats = getCollectionStatsAtProgress(collectionId, currentProgress);
    if (Object.keys(stats).length === 0) return locationName;
    
    const statTexts = [];
    for (const statId in stats) {
      const value = stats[statId];
      const statInfo = getStatInfo(statId);
      const statName = statInfo ? statInfo.name : statId;
      const displayValue = formatStatValue(statId, value);
      statTexts.push(`${statName} +${displayValue}`);
    }
    
    return `${locationName} - ${statTexts.join(', ')}`;
  };



  return (
    <div className="w-full h-full bg-theme-darker rounded-lg overflow-hidden">
      {/* Collection System Container */}
      <div className="w-full h-full flex flex-col">
        <div className="glass-panel-dark p-6 flex-1 overflow-auto">
        {/* Header */}
        <div className="mb-6 text-center">
          <h3 className="text-xl font-semibold text-white">Collection</h3>
        </div>

        {/* Action Buttons and Search Bar */}
        <div className="mb-6 space-y-4">
          {/* Action Buttons */}
          <div className="flex items-center gap-4 justify-center flex-wrap">
            <ActionButtons
              onQuickFill={quickFillAll}
              onReset={resetAllProgress}
            />
            <TotalStatsButton
              totalStats={totalStats}
              systemName="Collection"
            />
            <CollectionExportImportButtons />
          </div>

          {/* Search Bar */}
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              placeholder="Search collections or stats (e.g., 'attack', 'hp', 'evasion')..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-theme-darker border border-border-dark rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-game-highlight focus:border-transparent backdrop-filter backdrop-blur-sm focus:shadow-lg transition-all duration-200"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex mb-6 gap-1">
          {Object.values(COLLECTION_DATA.categories).map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={cn(
                "flex-1 px-4 py-3 text-sm font-medium transition-all duration-200 relative",
                "rounded-t-lg backdrop-filter backdrop-blur-sm border-b-2",
                activeCategory === category.id
                  ? "glass-panel border-game-highlight glow-border text-white shadow-lg border-b-game-gold"
                  : "glass-panel-light text-gray-300 hover:border-border-light hover:text-white hover:shadow-md border-b-transparent hover:border-b-border-light"
              )}
            >
              {category.name}
              {/* Category indicator dot - only show on active tab */}
              {activeCategory === category.id && (
                <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-game-gold rounded-full opacity-80 shadow-sm glow-border" />
              )}
            </button>
          ))}
        </div>

        {/* Main Content Area - Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4 rounded-lg border-t-2 border-t-game-gold/30 bg-theme-darkest/20">
          {/* Collections List - Takes 2/3 of the width */}
          <div className="lg:col-span-2">
            <div className="space-y-6 h-[39rem] overflow-y-auto dark-scrollbar">
          {filteredCollections.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-400 mb-2">No collections found</p>
              {searchTerm && (
                <p className="text-sm text-gray-500">
                  Try searching for different terms like "hp", "attack", "defense", etc.
                </p>
              )}
            </div>
          ) : (
            filteredCollections.map((location) => {
            const displayData = getCollectionDisplayData(location);
            const { progress, progressClass, stats, isActive, milestones, headerText } = displayData;

            return (
              <div
                key={location.id}
                className={cn(
                  "p-3 pb-6 rounded-lg transition-all duration-200 cursor-pointer",
                  isActive 
                    ? "glass-panel border-game-highlight glow-border text-white shadow-lg" 
                    : "glass-panel-light text-gray-300 hover:border-border-light hover:text-white hover:shadow-md"
                )}
                onClick={() => setActiveCollection(location.id)}
              >
                {/* Collection Header - Now includes stats inline */}
                <div className="flex items-center justify-between mb-3">
                  <div className={cn(
                    "font-medium flex-1 mr-3",
                    isActive ? "text-white" : "text-gray-300"
                  )}>{headerText}</div>
                  <div className={cn(
                    "px-2 py-1 rounded-full text-xs font-bold min-w-[50px] text-center backdrop-filter backdrop-blur-sm flex-shrink-0",
                    progressClass === 'high' && "bg-game-gold/20 text-game-gold border border-game-gold/40 shadow-sm",
                    progressClass === 'medium' && "bg-yellow-400/20 text-yellow-300 border border-yellow-400/40",
                    progressClass === 'low' && "bg-orange-400/20 text-orange-300 border border-orange-400/40",
                    !progressClass && "bg-gray-500/20 text-gray-400 border border-gray-500/30"
                  )}>
                    {progress}%
                  </div>
                </div>

                {/* Enhanced Progress Bar with Milestone Markers */}
                <div className="relative">
                  {/* Main Progress Bar */}
                  <div 
                    className="h-6 bg-theme-darker rounded-lg overflow-hidden border border-border-dark backdrop-filter backdrop-blur-sm cursor-pointer hover:bg-theme-dark transition-colors duration-200 relative"
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      
                      // Calculate click position as percentage
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = e.clientX - rect.left;
                      const percentage = Math.round((clickX / rect.width) * 100);
                      
                      // Snap to valid progress levels (0, 30, 60, 100)
                      let newProgress = 0;
                      if (percentage <= 15) {
                        newProgress = 0;
                      } else if (percentage <= 45) {
                        newProgress = 30;
                      } else if (percentage <= 80) {
                        newProgress = 60;
                      } else {
                        newProgress = 100;
                      }
                      
                      setCollectionProgress(location.id, newProgress);
                    }}
                  >
                    {/* Progress Fill */}
                    <div 
                      className={cn(
                        "h-full transition-all duration-300 rounded-lg relative",
                        progressClass === 'high' && "bg-gradient-to-r from-game-gold to-game-highlight shadow-lg",
                        progressClass === 'medium' && "bg-gradient-to-r from-yellow-400 to-yellow-500 shadow-md", 
                        progressClass === 'low' && "bg-gradient-to-r from-orange-400 to-orange-500 shadow-sm",
                        !progressClass && "bg-gradient-to-r from-gray-400 to-gray-500"
                      )}
                      style={{ 
                        width: `${progress}%`,
                        boxShadow: progressClass === 'high' ? '0 0 15px rgba(255, 215, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)' :
                                  progressClass === 'medium' ? '0 0 10px rgba(255, 193, 7, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)' :
                                  progressClass === 'low' ? '0 0 8px rgba(255, 152, 0, 0.2)' : 'none'
                      }}
                    />

                    {/* Milestone Vertical Lines */}
                    {milestones.map((milestone) => (
                      <div
                        key={`line-${milestone.percentage}`}
                        className="absolute top-0 bottom-0 w-0.5 bg-gray-600/80 pointer-events-none"
                        style={{ left: `${milestone.percentage}%` }}
                      />
                    ))}
                  </div>

                  {/* Milestone Markers and Labels Below Progress Bar */}
                  <div className="relative mt-2 h-6">
                    {milestones.map((milestone) => (
                      <div
                        key={milestone.percentage}
                        className="absolute transform -translate-x-1/2 pointer-events-none flex flex-col items-center"
                        style={{ left: `${milestone.percentage}%` }}
                      >
                        {/* Triangle Marker pointing up to progress bar */}
                        <div className={cn(
                          "w-0 h-0 border-l-[6px] border-r-[6px] border-t-[8px] border-transparent mb-1",
                          progress >= milestone.percentage 
                            ? "border-t-white drop-shadow-lg" 
                            : "border-t-gray-400 opacity-60"
                        )} />
                        
                        {/* Stat Label */}
                        <div className={cn(
                          "text-xs font-medium whitespace-nowrap px-1.5 py-0.5 rounded backdrop-blur-sm border",
                          progress >= milestone.percentage 
                            ? "text-white bg-black/40 border-white/20" 
                            : "text-gray-400 bg-black/20 border-gray-500/20"
                        )}>
                          {milestone.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })
          )}
            </div>
          </div>

          {/* Right Sidebar - Collection Info & Stats */}
          <div className="lg:col-span-1 space-y-4">
            {/* Collection Stats Summary */}
            <div className="system-info-panel h-[39rem] flex flex-col !p-2">
              <div className="text-center mb-2">
                <h4 className="text-sm font-semibold text-white border-b border-border-light pb-1">
                  Total Collection Stats
                </h4>
              </div>
              
              <div className="space-y-1 flex-1 overflow-y-auto dark-scrollbar">
                {Object.keys(totalStats).length > 0 ? (
                  Object.entries(totalStats).map(([statId, value]) => {
                    const statInfo = getStatInfo(statId);
                    const statName = statInfo ? statInfo.name : statId;
                    const displayValue = formatStatValue(statId, value as number);
                    const category = statInfo?.category || 'utility';
                    
                    return (
                      <div key={statId} className="flex items-center justify-between py-1 px-1.5 rounded-md bg-theme-darker/30 border border-gray-700/30 hover:bg-theme-darker/50 transition-colors duration-200">
                        <div className="flex items-center gap-1.5 flex-1 min-w-0">
                          <div className="flex-shrink-0 w-4 h-4 relative">
                            <StatIcon 
                              statId={statId}
                              width={16}
                              height={16}
                              className="object-contain"
                              alt={statName}
                            />
                          </div>
                          <span className="text-white text-xs truncate">
                            {statName}
                          </span>
                        </div>
                        <span className="text-white font-medium text-xs flex-shrink-0 ml-1">
                          +{displayValue}
                        </span>
                      </div>
                    );
                  })
                ) : (
                  <p className="text-gray-400 text-center italic py-2 text-xs">
                    No collection stats selected yet.
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}