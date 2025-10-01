// Main component for Gold Merit System
'use client';

import React from 'react';
import { GoldMeritSystemProps } from '../types/index';
import { useGoldMeritStore } from '../stores/goldMeritStore';
import { GoldMeritCategoryTabs } from './GoldMeritCategoryTabs';
import { GoldMeritSlotGrid } from './GoldMeritSlotGrid';
import { ActionButtons } from '@/tools/build-planner/components/systems/ActionButtons';

export const GoldMeritSystem: React.FC<GoldMeritSystemProps> = ({ className }) => {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    totalPointsSpent,
    quickFillSystem,
    resetAll
  } = useGoldMeritStore();

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
          <span className="text-game-gold font-bold">{totalPointsSpent}</span>
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
        <div className="p-4">
          <GoldMeritSlotGrid category={selectedCategoryData} />
        </div>
      )}
    </div>
  );
};