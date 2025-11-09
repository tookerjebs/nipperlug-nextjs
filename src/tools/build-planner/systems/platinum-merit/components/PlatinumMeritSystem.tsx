// Main component for Platinum Merit System
'use client';

import React from 'react';
import { PlatinumMeritSystemProps } from '../types/index';
import { usePlatinumMeritStore } from '../stores/platinumMeritStore';
import { PlatinumMeritCategoryTabs } from './PlatinumMeritCategoryTabs';
import { PlatinumMeritSlotGrid } from './PlatinumMeritSlotGrid';
import { PlatinumSpecialMasterySection } from './PlatinumSpecialMasterySection';
import { PlatinumMeritCostsDisplay } from './PlatinumMeritCostsDisplay';
import { ActionButtons } from '@/tools/build-planner/components/systems/ActionButtons';
import { TotalStatsButton } from '@/tools/build-planner/components/systems/TotalStatsButton';
import { useMemo } from 'react';

export const PlatinumMeritSystem: React.FC<PlatinumMeritSystemProps> = ({ className }) => {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    totalPointsSpent,
    maxPointsAllowed,
    requiredMeritScore,
    maxPossibleMeritScore,
    quickFillSystem,
    resetAll,
    calculateTotalStats
  } = usePlatinumMeritStore();

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  // Calculate progress percentage
  const progressPercentage = useMemo(() => {
    if (maxPossibleMeritScore > 0 && requiredMeritScore !== null && requiredMeritScore > 0) {
      return Math.min((requiredMeritScore / maxPossibleMeritScore) * 100, 100);
    }
    return 0;
  }, [requiredMeritScore, maxPossibleMeritScore]);

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

        {/* Merit Score Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>Merit Score Required</span>
            <span className="font-medium">
              {(requiredMeritScore ?? 0).toLocaleString()} / {maxPossibleMeritScore.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-theme-darker rounded-full h-2.5 border border-border-dark overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-game-platinum to-game-highlight transition-all duration-300 ease-out"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <div className="text-xs text-gray-500 text-center">
            {progressPercentage.toFixed(1)}% of maximum merit score
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
          
          {/* Special Mastery Section */}
          <PlatinumSpecialMasterySection categoryId={selectedCategory} />
          
          {/* Costs Display (includes separator) */}
          <PlatinumMeritCostsDisplay />
        </div>
      )}
    </div>
  );
};