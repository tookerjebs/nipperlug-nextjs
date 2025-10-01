import React from 'react';
import { AchievementCategory } from './types/achievement';
import { getCategoryIcon, getCategoryIconAlt } from './utils/iconMapping';

interface AchievementSidebarProps {
  categories: AchievementCategory[];
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

export const AchievementSidebar: React.FC<AchievementSidebarProps> = ({
  categories,
  selectedCategory,
  onCategorySelect
}) => {
  const totalCompleted = categories.reduce((sum, cat) => sum + cat.completedCount, 0);
  const totalAchievements = categories.reduce((sum, cat) => sum + cat.totalCount, 0);
  const totalProgress = (totalCompleted / Math.max(totalAchievements, 1)) * 100;

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-border-dark">
        <h3 className="text-lg font-semibold text-foreground truncate">Categories</h3>
        <div className="mt-2">
          <div className="text-xs text-foreground/60 mb-1">Total Progress</div>
          <div className="w-full bg-theme-darker rounded-full h-2">
            <div 
              className="bg-game-highlight h-2 rounded-full transition-all duration-300"
              style={{ width: `${totalProgress}%` }}
            />
          </div>
          <div className="text-xs text-foreground/70 mt-1">
            {totalCompleted} / {totalAchievements} completed ({totalProgress.toFixed(1)}%)
          </div>
        </div>
      </div>

      {/* Categories */}
      <div className="flex-1 overflow-y-auto p-2">
        {categories.map((category) => {
          const categoryProgress = (category.completedCount / Math.max(category.totalCount, 1)) * 100;
          return (
            <button
              key={category.id}
              onClick={() => onCategorySelect(category.id)}
              className={`w-full text-left p-3 rounded-lg mb-2 transition-all duration-200 min-h-[60px] border ${
                selectedCategory === category.id
                  ? 'hover:bg-theme-darker text-foreground border-game-highlight glow-border'
                  : 'hover:bg-theme-darker text-foreground border-transparent'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2 flex-1 min-w-0">
                  <img 
                    src={getCategoryIcon(category.name)} 
                    alt={getCategoryIconAlt(category.name)} 
                    className="w-6 h-6 flex-shrink-0" 
                  />
                  <span className="font-medium truncate" title={category.name}>{category.name}</span>
                </div>
                <span className="text-sm opacity-75 flex-shrink-0 ml-2">
                  {category.completedCount}/{category.totalCount}
                </span>
              </div>
              
              {/* Category Progress Bar */}
              <div className="w-full">
                <div className="w-full bg-theme-darker rounded-full h-1.5">
                  <div 
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      selectedCategory === category.id ? 'bg-white/80' : 'bg-game-highlight'
                    }`}
                    style={{ width: `${categoryProgress}%` }}
                  />
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};