'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { StatOption, SystemSlot } from '@/tools/build-planner/types/systems';
import { cn } from '@/tools/build-planner/lib/utils';
import { X } from 'lucide-react';
import { getStatInfo } from '@/tools/build-planner/data/stats-config';
import Image from 'next/image';
import { StatItem, SearchBar } from './index';


interface StatSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  slot: SystemSlot | null;
  availableStats: StatOption[];
  onStatSelect: (slot: SystemSlot, stat: StatOption) => void;
  onRemoveStat?: (slot: SystemSlot) => void;
}

export default function StatSelectionModal({
  isOpen,
  onClose,
  slot,
  availableStats,
  onStatSelect,
  onRemoveStat
}: StatSelectionModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Reset search when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setSearchTerm('');
      setSelectedCategory('all');
    }
  }, [isOpen]);

  if (!isOpen || !slot) return null;

  // Filter stats based on search and category
  const filteredStats = availableStats.filter(stat => {
    const matchesSearch = stat.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || stat.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Group stats by category
  const statsByCategory = filteredStats.reduce((acc, stat) => {
    if (!acc[stat.category]) {
      acc[stat.category] = [];
    }
    acc[stat.category].push(stat);
    return acc;
  }, {} as Record<string, StatOption[]>);

  // Use useCallback to prevent unnecessary re-renders
  const handleStatSelect = useCallback((stat: StatOption) => {
    onStatSelect(slot, stat);
    onClose();
  }, [slot, onStatSelect, onClose]);

  const handleRemove = () => {
    if (onRemoveStat) {
      onRemoveStat(slot);
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
        onClick={onClose}
      />
      
      {/* Main modal content */}
        <div className="relative glass-panel w-full max-w-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border-dark">
          <div>
            <h2 className="text-xl font-bold text-white">
              Select Stat for Slot {slot.position}
            </h2>
            <p className="text-sm text-gray-400 capitalize">
              {slot.category} Category
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
        <div className="p-4 overflow-y-auto max-h-96 dark-scrollbar">
          {Object.entries(statsByCategory).length > 0 ? (
            <div className="space-y-4">
              {Object.entries(statsByCategory).map(([category, stats]) => (
                <div key={category}>
                  <h3 className={cn(
                    'text-sm font-semibold mb-2 px-2 py-1 rounded capitalize',
                    getCategoryColor(category)
                  )}>
                    {category} ({stats.length})
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {stats.map((stat) => (
                      <StatItem 
                        key={stat.id}
                        stat={stat}
                        onSelect={handleStatSelect}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">No stats found matching your criteria</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border-dark flex justify-between">
          {slot.isOccupied && onRemoveStat ? (
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
    </div>,
    document.body
  );
}
