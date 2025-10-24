'use client';

import React, { useEffect, useState } from 'react';
import { MonsterStats } from '../../../lib/game-data/monsters/types';
import { getDungeonName } from '../../../lib/game-data/monsters/dungeonMapping';
import { getCategorizedFields } from '../config/fieldMappings';
import { BoostSlider } from './BoostSlider';
import { BoostedStatDisplay } from './BoostedStatDisplay';
import { calculateAllBoostedStats, BoostedStats } from '../utils/boostCalculator';

interface MonsterDetailsModalProps {
  monster: MonsterStats | null;
  isOpen: boolean;
  onClose: () => void;
}

export const MonsterDetailsModal: React.FC<MonsterDetailsModalProps> = ({
  monster,
  isOpen,
  onClose
}) => {
  const [boostLevel, setBoostLevel] = useState(0);
  // Close modal on Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !monster) return null;

  // Calculate boosted stats
  const boostedStats = calculateAllBoostedStats(monster, boostLevel);

  const formatValue = (key: string, value: any): string => {
    if (value === null || value === undefined) return 'N/A';
    if (typeof value === 'number') {
      return value.toString();
    }
    if (typeof value === 'boolean') {
      return value ? 'Yes' : 'No';
    }
    if (key === 'dungeonId' && monster.dungeonId) {
      return getDungeonName(monster.dungeonId);
    }

    return value.toString();
  };

  // Get categorized fields dynamically from the field mappings
  const categorizedFields = getCategorizedFields();
  
  // Build stat categories with actual monster data
  const statCategories: Record<string, Array<{key: string, label: string, value: any}>> = {};
  
  Object.entries(categorizedFields).forEach(([categoryName, fields]) => {
    statCategories[categoryName] = fields.map(({ key, label }) => ({
      key,
      label,
      value: (monster as any)[key]
    }));
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl max-h-[85vh] mx-4 glass-panel-dark border border-border-light rounded-lg shadow-game overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border-dark">
          <div>
              <h2 className="text-2xl font-bold text-game-gold">
                {monster.name}
                {monster.serverBossType > 0 && (
                  <span className="ml-3 px-3 py-1 bg-stat-offensive text-white text-sm rounded">
                    {monster.serverBossType === 1 ? 'MAP BOSS' : 'WORLD BOSS'}
                  </span>
                )}
              </h2>
              <p className="text-foreground/60 mt-1">Level {monster.level} Monster</p>
            </div>
            
            <div className="flex items-center gap-4">
              <BoostSlider
                currentLevel={boostLevel}
                onLevelChange={setBoostLevel}
              />
            
              <button
                onClick={onClose}
                className="p-2 hover:bg-component-card rounded-lg transition-colors text-foreground/60 hover:text-foreground"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[calc(85vh-100px)] dark-scrollbar">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {Object.entries(statCategories).map(([categoryName, stats]) => (
              <div key={categoryName} className="component-bg">
                <h3 className="text-lg font-semibold text-game-gold mb-4 text-center">
                  {categoryName}
                  {boostLevel > 0 && (
                    <span className="ml-2 text-xs text-game-gold bg-game-gold/20 px-2 py-1 rounded">
                      Boost Active
                    </span>
                  )}
                </h3>
                
                <div className="space-y-2">
                  {stats.map(({ key, label, value }) => {
                    const boostedStat = boostedStats[key];
                    if (boostedStat && boostLevel > 0) {
                      return (
                        <BoostedStatDisplay
                          key={key}
                          label={label}
                          boostedStat={boostedStat}
                        />
                      );
                    }
                    return (
                      <div key={key} className="flex justify-between items-center py-1">
                        <span className="text-foreground/80 text-sm">{label}:</span>
                        <span className="text-foreground font-medium">
                          {formatValue(key, value)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-3 border-t border-border-dark">
          <button
            onClick={onClose}
            className="px-6 py-2 glass-panel border border-border-dark hover:border-border-light text-foreground rounded-md transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};