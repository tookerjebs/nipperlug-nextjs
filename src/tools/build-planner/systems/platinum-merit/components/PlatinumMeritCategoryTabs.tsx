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
    <div className="flex mb-6 gap-1 justify-center">
      {categories.map((category) => {
        const isSelected = category.id === selectedCategory;
        
        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={cn(
              "px-6 py-3 text-sm font-medium transition-all duration-200 relative min-w-[120px]",
              "rounded-t-lg backdrop-filter backdrop-blur-sm border-b-2",
              isSelected
                ? "glass-panel border-game-highlight glow-border text-white shadow-lg border-b-game-platinum"
                : "glass-panel-light text-gray-300 hover:border-border-light hover:text-white hover:shadow-md border-b-transparent hover:border-b-border-light"
            )}
          >
            {category.name}
            {/* Category indicator dot - only show on active tab */}
            {isSelected && (
              <div className="absolute top-2 right-2 w-1.5 h-1.5 bg-game-platinum rounded-full opacity-80 shadow-sm glow-border" />
            )}
          </button>
        );
      })}
    </div>
  );
};