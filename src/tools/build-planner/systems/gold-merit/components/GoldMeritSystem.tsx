// Main component for Gold Merit System
'use client';

import React, { useMemo } from 'react';
import { GoldMeritSystemProps } from '../types/index';
import { useGoldMeritStore } from '../stores/goldMeritStore';
import { GoldMeritCategoryTabs } from './GoldMeritCategoryTabs';
import { GoldMeritSlotGrid } from './GoldMeritSlotGrid';
import { ActionButtons } from '@/tools/build-planner/components/systems/ActionButtons';
import { TotalStatsButton } from '@/tools/build-planner/components/systems/TotalStatsButton';
import { GoldMeritSlotMapping } from '../data/gold-merit-config';
import { getPointCostForLevel } from '../data/gold-merit-data-loader';
import { calculateRequiredMeritScore } from '../data/gold-merit-score';

export const GoldMeritSystem: React.FC<GoldMeritSystemProps> = ({ className }) => {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    totalPointsSpent,
    requiredMeritScore,
    quickFillSystem,
    resetAll,
    calculateTotalStats
  } = useGoldMeritStore();

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  // Calculate maximum possible points (all slots at max level)
  const maxPossiblePoints = useMemo(() => {
    let total = 0;
    categories.forEach(category => {
      category.slots.forEach(slot => {
        const masteryIndex = GoldMeritSlotMapping[slot.id];
        if (masteryIndex) {
          for (let level = 1; level <= slot.maxLevel; level++) {
            total += getPointCostForLevel(masteryIndex, level);
          }
        } else {
          total += slot.maxLevel * slot.pointsRequired;
        }
      });
    });
    return total;
  }, [categories]);

  // Calculate maximum merit score needed
  const maxMeritScore = useMemo(() => {
    return calculateRequiredMeritScore(maxPossiblePoints) ?? 0;
  }, [maxPossiblePoints]);

  // Calculate progress percentage
  const progressPercentage = maxMeritScore > 0
    ? Math.min(((requiredMeritScore ?? 0) / maxMeritScore) * 100, 100)
    : 0;

  return (
    <div className={`glass-panel ${className || ''}`}>
      {/* Header with Points Used Display and Action Buttons */}
      <div className="p-4 border-b border-border-dark space-y-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <ActionButtons 
              onQuickFill={quickFillSystem}
              onReset={resetAll}
            />
            <TotalStatsButton
              totalStats={calculateTotalStats()}
              systemName="Gold Merit"
            />
          </div>
          <div className="bg-theme-darker px-3 py-1 rounded border border-border-dark whitespace-nowrap self-end sm:self-auto">
            <span className="text-xs sm:text-sm text-gray-300">Points Used: </span>
            <span className="text-game-gold font-bold">{totalPointsSpent}</span>
            <span className="text-xs sm:text-sm text-gray-400"> / {maxPossiblePoints}</span>
          </div>
        </div>

        {/* Merit Score Progress Bar */}
        <div className="space-y-1">
          <div className="flex justify-between items-center text-xs text-gray-400">
            <span>Merit Score Required</span>
            <span className="font-medium">
              {(requiredMeritScore ?? 0).toLocaleString()} / {maxMeritScore.toLocaleString()}
            </span>
          </div>
          <div className="w-full bg-theme-darker rounded-full h-2.5 border border-border-dark overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-game-gold to-game-highlight transition-all duration-300 ease-out"
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
        <GoldMeritCategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Main Content Area - Slot Grid */}
      {selectedCategoryData && (
        <div className="p-2 sm:p-4">
          <GoldMeritSlotGrid category={selectedCategoryData} />
        </div>
      )}
    </div>
  );
};