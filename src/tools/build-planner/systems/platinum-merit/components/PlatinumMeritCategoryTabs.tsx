// Category tabs component for Platinum Merit System
'use client';

import React from 'react';
import { PlatinumMeritCategoryTabsProps } from '../types/index';
import { cn } from '@/tools/build-planner/lib/utils';

export const PlatinumMeritCategoryTabs: React.FC<PlatinumMeritCategoryTabsProps> = ({
  categories,
  selectedCategory,
  onCategoryChange
}) => {
  return (
    <div className="mb-6">
      {/* Horizontal tabs on larger screens, stacked on small screens */}
      <div className="flex flex-col lg:flex-row gap-1 justify-center">
        {categories.map((category) => {
          const isSelected = category.id === selectedCategory;
          
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={cn(
                "px-4 lg:px-6 py-2 lg:py-3 text-sm font-medium transition-all duration-200 relative",
                "lg:min-w-[120px] w-full lg:w-auto",
                "lg:rounded-t-lg rounded-lg lg:border-b-2 border-2 lg:border-l lg:border-r lg:border-t backdrop-filter backdrop-blur-sm",
                isSelected
                  ? "glass-panel border-game-highlight glow-border text-white shadow-lg lg:border-b-game-platinum"
                  : "glass-panel-light text-gray-300 hover:border-border-light hover:text-white hover:shadow-md lg:border-b-transparent hover:border-game-highlight/30"
              )}
            >
              <span className="flex items-center justify-between lg:justify-center">
                <span>{category.name}</span>
                {/* Category indicator dot - only show on active tab */}
                {isSelected && (
                  <div className="w-1.5 h-1.5 bg-game-platinum rounded-full opacity-80 shadow-sm glow-border lg:absolute lg:top-2 lg:right-2" />
                )}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};