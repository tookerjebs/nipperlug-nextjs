'use client';

import React from 'react';
import { OverlordMasterySystemProps } from '../types/index';
import { useOverlordMasteryStore } from '../stores/overlordMasteryStore';
import { OverlordCategoryTabs } from './OverlordCategoryTabs';
import { OverlordSkillGrid } from './OverlordSkillGrid';
import { ActionButtons } from '@/tools/build-planner/components/systems/ActionButtons';


export const OverlordMasterySystem: React.FC<OverlordMasterySystemProps> = ({ className }) => {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    totalOpSpent,
    quickFillSystem,
    resetAll
  } = useOverlordMasteryStore();

  const selectedCategoryData = categories.find(cat => cat.id === selectedCategory);

  return (
    <div className={`overlord-mastery-panel ${className || ''}`}>
      {/* Header with Points Used Display and Action Buttons */}
      <div className="flex justify-between items-center p-4 border-b border-border-dark">
        <ActionButtons 
          onQuickFill={quickFillSystem}
          onReset={resetAll}
        />
        <div className="bg-theme-darker px-3 py-1 rounded border border-border-dark">
          <span className="text-sm text-gray-300">Points Used: </span>
          <span className="text-game-gold font-bold">{totalOpSpent}</span>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="px-4">
        <OverlordCategoryTabs
          categories={categories}
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Main Content Area - Skill Grid */}
      {selectedCategoryData && (
        <div className="p-4">
          <OverlordSkillGrid category={selectedCategoryData} />
        </div>
      )}
    </div>
  );
};