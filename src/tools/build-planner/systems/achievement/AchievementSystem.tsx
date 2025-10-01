import React, { useEffect } from 'react';
import { AchievementSidebar } from './AchievementSidebar';
import { AchievementContent } from './AchievementContent';
import { ActionButtons } from '../../components/systems/ActionButtons';
import { TotalStatsButton } from '../../components/systems/TotalStatsButton';
import { useAchievementStore } from './stores/achievementStore';
import { getStatInfo, formatStatValue } from '../../data/stats-config';
import { getCategoryIcon, getCategoryIconAlt } from './utils/iconMapping';

export const AchievementSystem: React.FC = () => {
  const {
    categories,
    selectedCategory,
    achievements,
    totalStats,
    initializeAchievements,
    selectCategory,
    toggleAchievement,
    resetSystem,
    quickFillSystem
  } = useAchievementStore();

  // Initialize achievement data only if not already initialized
  useEffect(() => {
    if (categories.length === 0) {
      initializeAchievements();
    }
  }, [categories.length, initializeAchievements]);

  const handleAchievementToggle = (achievementId: string, milestone?: number) => {
    toggleAchievement(achievementId, milestone);
  };



  const currentCategory = categories.find(cat => cat.id === selectedCategory);
  const displayedAchievements = currentCategory?.achievements || [];

  return (
    <div className="flex flex-col h-full bg-theme-darker rounded-lg overflow-hidden w-full max-w-none">
      {/* Mobile Category Tabs - Only visible on small screens */}
      <div className="md:hidden border-b border-border-dark bg-theme-dark">
        <div className="p-3">
          <div className="text-sm font-medium text-foreground/80 mb-2">Categories</div>
          <div className="flex gap-2 overflow-x-auto pb-2 dark-scrollbar">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => selectCategory(category.id)}
                className={`flex-shrink-0 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 border ${
                  selectedCategory === category.id
                    ? 'bg-game-highlight/20 border-game-highlight text-foreground shadow-lg'
                    : 'bg-theme-darker border-border-dark text-foreground/70 hover:text-foreground hover:border-border-light hover:bg-theme-light'
                }`}
              >
                <div className="flex items-center gap-2">
                  <img 
                    src={getCategoryIcon(category.name)} 
                    alt={getCategoryIconAlt(category.name)} 
                    className="w-4 h-4" 
                  />
                  <span className="whitespace-nowrap">{category.name}</span>
                  <span className="text-xs opacity-75">
                    {category.completedCount}/{category.totalCount}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="flex flex-1 min-h-0">
        {/* Desktop Sidebar - Hidden on mobile */}
        <div className="hidden md:block w-60 lg:w-72 bg-theme-darkest border-r border-border-dark flex-shrink-0">
          <AchievementSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={selectCategory}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0 max-w-full">
        {/* Header with controls */}
        <div className="p-4 border-b border-border-dark bg-theme-dark">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="min-w-0">
              <h2 className="text-xl font-semibold text-foreground truncate">
                {currentCategory?.name || 'Achievements'}
              </h2>
              <p className="text-sm text-foreground/70">
                {currentCategory?.completedCount || 0} / {currentCategory?.totalCount || 0} completed
              </p>
            </div>
            <div className="flex items-center gap-4 flex-shrink-0">
              <ActionButtons 
                onQuickFill={quickFillSystem}
                onReset={resetSystem}
              />
              <TotalStatsButton
                totalStats={totalStats}
                systemName="Achievement"
              />
            </div>
          </div>
        </div>

          {/* Achievement Content */}
          <div className="flex-1">
            <AchievementContent
              achievements={displayedAchievements}
              onAchievementToggle={handleAchievementToggle}
            />
          </div>
        </div>
      </div>
    </div>
  );
};