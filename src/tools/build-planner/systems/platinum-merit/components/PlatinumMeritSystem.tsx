// Main component for Platinum Merit System
'use client';

import React from 'react';
import { PlatinumMeritSystemProps } from '../types/index';
import { usePlatinumMeritStore } from '../stores/platinumMeritStore';
import { PlatinumMeritCategoryTabs } from './PlatinumMeritCategoryTabs';
import { PlatinumMeritSlotGrid } from './PlatinumMeritSlotGrid';
import { ActionButtons } from '@/tools/build-planner/components/systems/ActionButtons';
import { TotalStatsButton } from '@/tools/build-planner/components/systems/TotalStatsButton';

export const PlatinumMeritSystem: React.FC<PlatinumMeritSystemProps> = ({ className }) => {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    totalPointsSpent,
    maxPointsAllowed,
    quickFillSystem,
    resetAll,
    calculateTotalStats
  } = usePlatinumMeritStore();

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className={`glass-panel min-w-0 w-full max-w-full ${className || ''}`}>
      {/* Header with Points Used Display and Action Buttons */}
      <div className="p-4 border-b border-border-dark space-y-3">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-3">
          <div className="flex flex-wrap items-center gap-2 lg:gap-4">
            <ActionButtons 
              onQuickFill={quickFillSystem}
              onReset={resetAll}
            />
            <TotalStatsButton
              totalStats={calculateTotalStats()}
              systemName="Platinum Merit"
            />
          </div>
          <div className="bg-theme-darker px-3 py-1 rounded border border-border-dark whitespace-nowrap self-end lg:self-auto">
            <span className="text-xs lg:text-sm text-gray-300">Points Used: </span>
            <span className="text-game-platinum font-bold">{totalPointsSpent}</span>
            <span className="text-xs lg:text-sm text-gray-400"> / {maxPointsAllowed}</span>
          </div>
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
        <div className="p-2 lg:p-4">
          <PlatinumMeritSlotGrid category={selectedCategoryData} />
        </div>
      )}
    </div>
  );
};