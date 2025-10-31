'use client';

import React, { useState, useRef, useEffect } from 'react';
import { cn } from '@/tools/build-planner/lib/utils';
import { Search, X } from 'lucide-react';
import { searchItems, type ItemWithCount, calculateRemainingItems } from '../utils/filterUtils';
import { useCollectionTrackerStore } from '../stores/collectionTrackerStore';

interface ItemSearchBarProps {
  onItemSelect: (itemName: string | null) => void;
  selectedItem: string | null;
}

export function ItemSearchBar({ onItemSelect, selectedItem }: ItemSearchBarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState<ItemWithCount[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Get collection progress from store
  const { collectionProgress } = useCollectionTrackerStore();

  // Handle click outside to close suggestions
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Handle search input change
  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    
    if (value.trim().length >= 2) {
      const results = searchItems(value, 10);
      setSuggestions(results);
      setShowSuggestions(true);
      setHighlightedIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  };

  // Handle item selection
  const handleSelectItem = (itemName: string) => {
    onItemSelect(itemName);
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    setHighlightedIndex(-1);
  };

  // Handle clear selected item
  const handleClearSelection = () => {
    onItemSelect(null);
    setSearchQuery('');
    setSuggestions([]);
    setShowSuggestions(false);
    inputRef.current?.focus();
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!showSuggestions || suggestions.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex(prev => 
          prev < suggestions.length - 1 ? prev + 1 : prev
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex(prev => prev > 0 ? prev - 1 : -1);
        break;
      case 'Enter':
        e.preventDefault();
        if (highlightedIndex >= 0 && highlightedIndex < suggestions.length) {
          handleSelectItem(suggestions[highlightedIndex].name);
        }
        break;
      case 'Escape':
        setShowSuggestions(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  return (
    <div ref={searchRef} className="relative w-full">
      {/* Search Input */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Search for items... (e.g., 'Force Core Highest', 'Critical Ring +1')"
          value={searchQuery}
          onChange={(e) => handleSearchChange(e.target.value)}
          onKeyDown={handleKeyDown}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          disabled={!!selectedItem}
          className={cn(
            "w-full pl-12 pr-4 py-3 bg-theme-dark border-2 border-border-dark rounded-lg text-white placeholder-gray-400 transition-all",
            "focus:border-game-gold focus:outline-none",
            selectedItem && "opacity-50 cursor-not-allowed"
          )}
        />
      </div>

      {/* Suggestions Dropdown */}
      {showSuggestions && suggestions.length > 0 && !selectedItem && (
        <div className="absolute z-50 w-full mt-2 bg-theme-dark border-2 border-border-light rounded-lg shadow-2xl max-h-96 overflow-y-auto dark-scrollbar">
          <div className="p-2">
            <div className="text-xs text-gray-400 px-3 py-2 font-semibold uppercase tracking-wide">
              Found {suggestions.length} item{suggestions.length !== 1 ? 's' : ''}
            </div>
            {suggestions.map((item, index) => (
              <button
                key={item.name}
                onClick={() => handleSelectItem(item.name)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={cn(
                  "w-full text-left px-3 py-3 rounded-lg transition-all duration-150",
                  "hover:bg-theme-light border border-transparent",
                  highlightedIndex === index && "bg-theme-light border-game-gold/30"
                )}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="text-white font-medium truncate mb-1">
                      {item.name}
                    </div>
                    <div className="text-xs text-gray-400">
                      Progress: {(() => {
                        const progress = calculateRemainingItems(item.name, collectionProgress);
                        // Cap the completed at total to prevent over 100%
                        const actualCompleted = Math.min(progress.completed, progress.total);
                        const percentage = progress.total > 0 ? Math.round((actualCompleted / progress.total) * 100) : 0;
                        return `${actualCompleted}/${progress.total} completed (${percentage}%)`;
                      })()}
                    </div>
                  </div>
                  <div className="flex-shrink-0 text-right">
                    <div className="text-game-gold font-bold text-sm">
                      {item.totalCount.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400">
                      total needed
                    </div>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* No Results Message */}
      {showSuggestions && suggestions.length === 0 && searchQuery.trim().length >= 2 && (
        <div className="absolute z-50 w-full mt-2 bg-theme-dark border-2 border-border-light rounded-lg shadow-2xl p-4">
          <div className="text-center text-gray-400">
            <div className="text-lg mb-1">🔍</div>
            <div className="text-sm">No items found matching "{searchQuery}"</div>
          </div>
        </div>
      )}

      {/* Selected Item Display */}
      {selectedItem && (
        <div className="mt-3">
          <span
            className="inline-flex items-center gap-2 px-3 py-2 text-sm rounded-lg font-medium"
            style={{
              backgroundColor: 'rgba(255, 215, 0, 0.2)',
              color: 'var(--gold)',
              border: '1px solid rgba(255, 215, 0, 0.3)'
            }}
          >
            {selectedItem}
            <button
              onClick={handleClearSelection}
              className="hover:text-white transition-colors"
              title="Clear item filter"
            >
              <X className="w-4 h-4" />
            </button>
          </span>
        </div>
      )}
    </div>
  );
}