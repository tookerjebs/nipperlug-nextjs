// Category tabs component for Gold Merit System
'use client';

import React from 'react';
import { GoldMeritCategoryTabsProps } from '../types/index';
import { cn } from '@/tools/build-planner/lib/utils';

export const GoldMeritCategoryTabs: React.FC<GoldMeritCategoryTabsProps> = ({
  categories,
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div className="mb-6">
      {/* Horizontal tabs on larger screens, stacked on small screens */}
      <div className="flex flex-col sm:flex-row gap-1 justify-center">
        {categories.map((category) => {
          const isSelected = category.id === selectedCategory;
          
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                "px-4 sm:px-6 py-2 sm:py-3 text-sm font-medium transition-all duration-200 relative",
                "sm:min-w-[120px] w-full sm:w-auto",
                "sm:rounded-t-lg rounded-lg sm:border-b-2 border-2 sm:border-l sm:border-r sm:border-t backdrop-filter backdrop-blur-sm",
                isSelected
                  ? "glass-panel border-game-highlight glow-border text-white shadow-lg sm:border-b-game-gold"
                  : "glass-panel-light text-gray-300 hover:border-border-light hover:text-white hover:shadow-md sm:border-b-transparent hover:border-game-highlight/30"
              )}
            >
              <span className="flex items-center justify-between sm:justify-center">
                <span>{category.name}</span>
                {/* Category indicator dot - only show on active tab */}
                {isSelected && (
                  <div className="w-1.5 h-1.5 bg-game-gold rounded-full opacity-80 shadow-sm glow-border sm:absolute sm:top-2 sm:right-2" />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};