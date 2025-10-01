/**
 * RuneSelectionModal - Modal for selecting karma runes
 * Adapted from StatSelectionModal for karma rune system
 * 
 * DUPLICATION NOTICE:
 * This file is nearly identical to the corresponding file in the essence-rune system.
 * If making changes here, consider whether the same changes should be applied to:
 * src/tools/build-planner/systems/essence-rune/components/RuneSelectionModal.tsx
 */

'use client';

import { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { createPortal } from 'react-dom';
import { cn } from '@/tools/build-planner/lib/utils';
import { X } from 'lucide-react';
import { KarmaRune } from '../data/karmaRuneData';
import { getStatInfo } from '@/tools/build-planner/data/stats-config';
import { StatIcon } from '@/tools/build-planner/components/StatIcon';

interface RuneSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  availableRunes: KarmaRune[];
  onRuneSelect: (rune: KarmaRune) => void;
}

// Memoized search bar component to prevent unnecessary re-renders
const SearchBar = memo(({ searchTerm, onSearchChange }: { searchTerm: string; onSearchChange: (term: string) => void }) => (
  <div className="relative">
    <input
      type="text"
      placeholder="Search runes..."
      value={searchTerm}
      onChange={(e) => onSearchChange(e.target.value)}
      className="w-full px-3 py-2 bg-theme-dark border border-border-dark rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-game-highlight"
    />
  </div>
));

// Memoized rune item component to prevent unnecessary re-renders when list changes
const RuneItem = memo(({ rune, onSelect }: { rune: KarmaRune; onSelect: (rune: KarmaRune) => void }) => {
  // Memoize stat info lookup since it's expensive
  const statInfo = useMemo(() => getStatInfo(rune.statType), [rune.statType]);
  
  // Memoize click handler to prevent function recreation
  const handleClick = useCallback(() => onSelect(rune), [rune, onSelect]);
  
  return (
    <button
      onClick={handleClick}
      className={cn(
        'w-full p-3 rounded-lg border border-border-dark bg-theme-dark transition-all duration-200 text-left',
        'hover:border-game-highlight hover:bg-theme-light'
      )}
    >
      <div className="flex items-center gap-3 mb-2">
        {/* Stat Icon */}
        <div className="w-8 h-8 flex-shrink-0">
          <StatIcon
            statId={rune.statType}
            width={32}
            height={32}
            className="w-full h-full object-contain"
          />
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-1">
            <span className="font-medium text-white">{rune.name}</span>
            <span className="text-xs font-bold text-gray-400">
              {rune.category}
            </span>
          </div>
          <div className="text-xs text-gray-400 mb-1">
            Max Level: {rune.maxLevel}
          </div>
          {rune.description && (
            <div className="text-xs text-gray-300">
              {rune.description}
            </div>
          )}
        </div>
      </div>
    </button>
  );
});

export default function RuneSelectionModal({
  isOpen,
  onClose,
  availableRunes,
  onRuneSelect
}: RuneSelectionModalProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');


  // Reset search when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setSearchTerm('');
      setSelectedCategory('all');

    }
  }, [isOpen]);

  // Define callbacks before early return to maintain hook order
  const handleRuneSelect = useCallback((rune: KarmaRune) => {
    onRuneSelect(rune);
    onClose();
  }, [onRuneSelect, onClose]);

  // Memoize expensive filtering operations to prevent recalculation on every render
  const filteredRunes = useMemo(() => {
    return availableRunes.filter(rune => {
      const matchesSearch = rune.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || rune.category === selectedCategory;

      return matchesSearch && matchesCategory;
    });
  }, [availableRunes, searchTerm, selectedCategory]);

  // Memoize grouping operation since it's expensive with many runes
  const runesByCategory = useMemo(() => {
    return filteredRunes.reduce((acc, rune) => {
      if (!acc[rune.category]) {
        acc[rune.category] = [];
      }
      acc[rune.category].push(rune);
      return acc;
    }, {} as Record<string, KarmaRune[]>);
  }, [filteredRunes]);



  // Memoize category color function since it's pure
  const getCategoryColor = useCallback((category: string) => {
    switch (category) {
      case 'offensive': return 'text-red-400 bg-red-900/20 border-red-400/30';
      case 'defensive': return 'text-blue-400 bg-blue-900/20 border-blue-400/30';
      case 'utility': return 'text-green-400 bg-green-900/20 border-green-400/30';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-400/30';
    }
  }, []);

  if (!isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0
      }}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative glass-panel w-full max-w-2xl max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border-dark">
          <div>
            <h2 className="text-xl font-bold text-white">
              Select Karma Rune
            </h2>
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

        {/* Runes List */}
        <div className="p-4 overflow-y-auto max-h-96 dark-scrollbar">
          {Object.entries(runesByCategory).length > 0 ? (
            <div className="space-y-4">
              {Object.entries(runesByCategory).map(([category, runes]) => (
                <div key={category}>
                  <h3 className={cn(
                    'text-sm font-semibold mb-2 px-2 py-1 rounded capitalize',
                    getCategoryColor(category)
                  )}>
                    {category} ({runes.length})
                  </h3>
                  <div className="grid grid-cols-2 gap-2">
                    {runes.map((rune) => (
                      <RuneItem 
                        key={rune.id}
                        rune={rune}
                        onSelect={handleRuneSelect}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">No runes found matching your criteria</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border-dark flex justify-end">
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