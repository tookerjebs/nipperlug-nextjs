'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/tools/build-planner/lib/utils';
import { X } from 'lucide-react';
import { getStatInfo } from '@/tools/build-planner/data/stats-config';
import { SearchBar } from '@/tools/build-planner/components/systems/stat-selection';
import { StatIcon } from '@/tools/build-planner/components/StatIcon';
import ColorSelectionModal from './ColorSelectionModal';
import { StellarStat } from '../data/stellar-data';

// Internal StellarStatSelector component
interface StellarStatSelectorProps {
  stat: StellarStat;
  onSelect: (statId: string, level: number, value: number) => void;
}

const StellarStatSelector: React.FC<StellarStatSelectorProps> = React.memo(({ stat, onSelect }) => {
  const statInfo = getStatInfo(stat.id);
  
  const handleLevelSelect = (level: number) => {
    const value = stat.values[level - 1];
    onSelect(stat.id, level, value);
  };

  return (
    <div className="flex items-center justify-between p-3 bg-theme-light rounded-lg">
      {/* Left side: Icon and name */}
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 flex items-center justify-center flex-shrink-0">
          <StatIcon
            statId={stat.id}
            width={32}
            height={32}
            className="object-contain"
            alt={stat.name}
          />
        </div>
        <span className="text-white font-medium">{stat.name}</span>
      </div>

      {/* Right side: Value selector buttons */}
      <div className="flex items-center space-x-1">
        {stat.values.map((value, index) => {
          const level = index + 1;
          return (
            <button
              key={level}
              onClick={() => handleLevelSelect(level)}
              className="min-w-[32px] h-8 px-2 flex items-center justify-center text-sm font-medium rounded-md transition-all duration-200 
                       bg-theme-dark hover:bg-theme-lighter border border-gray-600 hover:border-game-gold 
                       text-gray-300 hover:text-white hover:shadow-lg hover:shadow-game-gold/20"
              title={`Level ${level}: +${value}${statInfo?.isPercentage ? '%' : ''}`}
            >
              +{value}{statInfo?.isPercentage ? '%' : ''}
            </button>
          );
        })}
      </div>
    </div>
  );
});

interface StellarStatSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  nodeId: number;
  currentColor?: string;
  onColorSelect: (nodeId: number, colorKey: string) => void;
  stellarStats: StellarStat[];
  onStellarStatSelect: (statId: string, level: number, value: number) => void;
  onRemoveStat?: () => void;
  hasCurrentStat?: boolean;
}

export default function StellarStatSelectionModal({
  isOpen,
  onClose,
  nodeId,
  currentColor,
  onColorSelect,
  stellarStats,
  onStellarStatSelect,
  onRemoveStat,
  hasCurrentStat = false
}: StellarStatSelectionModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isColorModalOpen, setIsColorModalOpen] = useState(false);
  const [selectedStellarStat, setSelectedStellarStat] = useState<{statId: string, level: number, value: number} | null>(null);

  // Reset search when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setSearchTerm('');
      setSelectedCategory('all');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Filter stats based on search and category
  const filteredStats = stellarStats.filter(stat => {
    const matchesSearch = stat.name.toLowerCase().includes(searchTerm.toLowerCase());
    const statInfo = getStatInfo(stat.id);
    const matchesCategory = selectedCategory === 'all' || statInfo?.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleStellarStatSelect = useCallback((statId: string, level: number, value: number) => {
    // Store the selected stat and open color modal
    setSelectedStellarStat({ statId, level, value });
    setIsColorModalOpen(true);
  }, []);

  const handleColorSelect = useCallback((nodeId: number, colorKey: string) => {
    if (selectedStellarStat) {
      // Apply stellar stat and color selections
      onStellarStatSelect(selectedStellarStat.statId, selectedStellarStat.level, selectedStellarStat.value);
      onColorSelect(nodeId, colorKey);
      onClose();
    }
  }, [selectedStellarStat, onStellarStatSelect, onColorSelect, onClose]);

  const handleColorModalClose = useCallback(() => {
    setIsColorModalOpen(false);
    setSelectedStellarStat(null);
  }, []);

  const handleRemove = () => {
    if (onRemoveStat) {
      onRemoveStat();
      onClose();
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'offensive': return 'text-red-400 bg-red-900/20 border-red-400/30';
      case 'defensive': return 'text-blue-400 bg-blue-900/20 border-blue-400/30';
      case 'utility': return 'text-green-400 bg-green-900/20 border-green-400/30';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-400/30';
    }
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={isColorModalOpen ? handleColorModalClose : onClose}
      />
      
      {/* Only show main modal content when color modal is closed */}
      {!isColorModalOpen && (
        <div className="relative glass-panel w-full max-w-2xl max-h-[80vh] overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border-dark">
            <div>
              <h2 className="text-xl font-bold text-white">
                Select Stellar Stat for Node {nodeId}
              </h2>
              <p className="text-sm text-gray-400">
                Choose a stat and its level
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-theme-light rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-gray-400" />
            </button>
          </div>

          {/* Search and Filters */}
          <div className="p-4 border-b border-border-dark space-y-3">
            {/* Search */}
            <SearchBar 
              searchTerm={searchTerm}
              onSearchChange={setSearchTerm}
            />

            {/* Category Filter */}
            <div className="flex space-x-2">
              <span className="text-sm text-gray-400 self-center mr-2">Category:</span>
              {['all', 'offensive', 'defensive', 'utility'].map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={cn(
                    'px-3 py-1 rounded-lg text-sm font-medium transition-colors capitalize',
                    selectedCategory === category
                      ? 'bg-game-highlight text-theme-darkest'
                      : 'bg-theme-light text-gray-300 hover:bg-theme-lighter'
                  )}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Stats List */}
          <div className="p-4 overflow-y-auto max-h-96 dark-scrollbar overscroll-contain">
            <div className="space-y-3">
              {filteredStats.map((stat) => (
                <StellarStatSelector
                  key={stat.id}
                  stat={stat}
                  onSelect={handleStellarStatSelect}
                />
              ))}
              {filteredStats.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-400">No stats found matching your criteria</p>
                </div>
              )}
            </div>
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-border-dark flex justify-between">
            {hasCurrentStat && onRemoveStat ? (
              <button
                onClick={handleRemove}
                className="px-4 py-2 game-button bg-stat-offensive-bg text-stat-offensive hover:border-stat-offensive hover:text-white rounded-lg transition-colors"
              >
                Remove Current Stat
              </button>
            ) : (
              <div />
            )}
            
            <button
              onClick={onClose}
              className="px-4 py-2 game-button hover:bg-theme-lighter text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
      
      {/* Color Selection Modal - renders inside the same container */}
      {isColorModalOpen && (
        <ColorSelectionModal
          isOpen={isColorModalOpen}
          onClose={handleColorModalClose}
          nodeId={nodeId}
          currentColor={currentColor}
          onColorSelect={handleColorSelect}
        />
      )}
    </div>,
    document.body
  );
}