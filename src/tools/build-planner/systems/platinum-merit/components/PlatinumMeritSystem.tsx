// Main component for Platinum Merit System
'use client';

import React from 'react';
import { PlatinumMeritSystemProps } from '../types/index';
import { usePlatinumMeritStore } from '../stores/platinumMeritStore';
import { PlatinumMeritCategoryTabs } from './PlatinumMeritCategoryTabs';
import { PlatinumMeritSlotGrid } from './PlatinumMeritSlotGrid';
import { ActionButtons } from '@/tools/build-planner/components/systems/ActionButtons';

export const PlatinumMeritSystem: React.FC<PlatinumMeritSystemProps> = ({ className }) => {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    totalPointsSpent,
    maxPointsAllowed,
    quickFillSystem,
    resetAll
  } = usePlatinumMeritStore();

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className={`glass-panel ${className || ''}`}>
      {/* Header with Points Used Display and Action Buttons */}
      <div className="flex justify-between items-center p-4 border-b border-border-dark">
        <ActionButtons 
          onQuickFill={quickFillSystem}
          onReset={resetAll}
        />
        <div className="bg-theme-darker px-3 py-1 rounded border border-border-dark">
          <span className="text-sm text-gray-300">Points Used: </span>
          <span className="text-game-platinum font-bold">{totalPointsSpent}</span>
          <span className="text-gray-400 text-sm"> / {maxPointsAllowed}</span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-4">
        <PlatinumMeritCategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Main Content Area - Slot Grid */}
      {selectedCategoryData && (
        <div className="p-4">
          <PlatinumMeritSlotGrid category={selectedCategoryData} />
        </div>
      )}
    </div>
  );
};