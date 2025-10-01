/**
 * Cascading Epic Options Dropdown
 * A two-level dropdown that first shows stat categories, then specific values
 * Provides an intuitive and streamlined epic option selection experience
 */

import React, { useState, useRef, useEffect } from 'react';
import { getStatInfo, formatStatValue } from '@/tools/build-planner/data/stats-config';
import { getEpicOptionColors } from '../../../utils/epic-option-colors';
import { parseSelectedOption } from './epic-options-transformer';

interface EpicOption {
  id: string;
  displayName: string;
  value: number;
  category: string;
  description?: string;
}

interface EpicCategory {
  id: string;
  name: string;
  options: EpicOption[];
}

interface CascadingEpicDropdownProps {
  categories: EpicCategory[];
  selectedOption: string | null;
  onSelect: (optionId: string | null) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

const CascadingEpicDropdown: React.FC<CascadingEpicDropdownProps> = ({
  categories,
  selectedOption,
  onSelect,
  placeholder = "Select Epic Option",
  disabled = false,
  className = ""
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const categoryRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setExpandedCategory(null);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        setExpandedCategory(null);
        setSearchTerm('');
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Auto-scroll to expanded category and smooth focus behavior
  useEffect(() => {
    if (expandedCategory && scrollContainerRef.current && categoryRefs.current[expandedCategory]) {
      // Add a small delay to allow the expand animation to start
      const timeoutId = setTimeout(() => {
        const categoryElement = categoryRefs.current[expandedCategory];
        const scrollContainer = scrollContainerRef.current;
        
        if (!categoryElement || !scrollContainer) return;
        
        // Calculate the position to scroll to
        const categoryTop = categoryElement.offsetTop;
        const categoryHeight = categoryElement.offsetHeight;
        const containerHeight = scrollContainer.clientHeight;
        const currentScrollTop = scrollContainer.scrollTop;
        
        // Check if the category is not fully visible
        const categoryBottom = categoryTop + categoryHeight;
        const visibleTop = currentScrollTop;
        const visibleBottom = currentScrollTop + containerHeight;
        
        if (categoryTop < visibleTop || categoryBottom > visibleBottom) {
          // Smooth scroll to center the category in view
          const targetScrollTop = Math.max(0, categoryTop - (containerHeight / 2) + (categoryHeight / 2));
          
          scrollContainer.scrollTo({
            top: targetScrollTop,
            behavior: 'smooth'
          });
        }
      }, 150); // Small delay to sync with animation
      
      return () => clearTimeout(timeoutId);
    }
  }, [expandedCategory]);

  // Get selected option details
  const getSelectedOptionDetails = () => {
    if (!selectedOption) return null;
    
    for (const category of categories) {
      const option = category.options.find(opt => opt.id === selectedOption);
      if (option) return { option, category };
    }
    return null;
  };

  // Filter categories based on search
  const getFilteredCategories = () => {
    if (!searchTerm) return categories;
    
    const searchLower = searchTerm.toLowerCase();
    const filtered = categories.map(category => ({
      ...category,
      options: category.options.filter(option =>
        option.displayName.toLowerCase().includes(searchLower) ||
        category.name.toLowerCase().includes(searchLower) ||
        option.description?.toLowerCase().includes(searchLower)
      )
    })).filter(category => category.options.length > 0);
    
    // Auto-expand first category if search results are limited
    if (filtered.length === 1 && !expandedCategory) {
      setTimeout(() => setExpandedCategory(filtered[0].id), 100);
    }
    
    return filtered;
  };

  const handleCategoryClick = (categoryId: string) => {
    if (expandedCategory === categoryId) {
      setExpandedCategory(null);
    } else {
      setExpandedCategory(categoryId);
      // Clear search when expanding a category for better UX
      if (searchTerm) {
        setSearchTerm('');
      }
    }
  };

  const handleOptionSelect = (optionId: string) => {
    onSelect(optionId);
    setIsOpen(false);
    setExpandedCategory(null);
    setSearchTerm('');
  };

  const handleClearSelection = () => {
    onSelect(null);
    setIsOpen(false);
    setExpandedCategory(null);
    setSearchTerm('');
  };

  const selectedDetails = getSelectedOptionDetails();
  const filteredCategories = getFilteredCategories();

  return (
    <div className={`relative ${className}`} ref={dropdownRef}>
      {/* Main Button */}
      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full bg-theme-dark border border-border-dark rounded px-3 py-2 text-sm 
          focus:outline-none focus:border-game-highlight text-left
          flex items-center justify-between transition-colors
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-500'}
          ${isOpen ? 'border-game-highlight' : ''}
        `}
      >
        <div className="flex items-center flex-1 min-w-0">
          {selectedDetails ? (
            <div className="flex-1 min-w-0">
              {(() => {
                const optionData = parseSelectedOption(selectedDetails.option.id);
                const epicColors = optionData ? getEpicOptionColors(optionData.level, optionData.type) : { text: 'text-gray-200' };
                
                return (
                  <>
                    <div className={`${epicColors.text} truncate font-medium`}>
                      {selectedDetails.option.displayName}
                    </div>
                    <div className="text-xs text-gray-400 truncate">
                      {selectedDetails.category.name}
                    </div>
                  </>
                );
              })()}
            </div>
          ) : (
            <span className="text-gray-400">{placeholder}</span>
          )}
        </div>
        
        <div className="flex items-center ml-2">
          {selectedDetails && (
            <div
              onClick={(e) => {
                e.stopPropagation();
                handleClearSelection();
              }}
              className="text-gray-400 hover:text-red-400 mr-2 p-1 transition-colors cursor-pointer"
              title="Clear selection"
            >
              <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
          )}
          <svg 
            className={`w-4 h-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </button>

      {/* Dropdown Content */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-theme-dark border border-border-dark rounded-md shadow-lg z-50 max-h-96 overflow-hidden">
          {/* Search Bar */}
          <div className="p-3 border-b border-border-dark">
            <div className="relative">
              <input
                ref={searchInputRef}
                type="text"
                placeholder="Search epic options..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-theme-darker border border-border-dark rounded px-3 py-2 pl-9 text-sm focus:outline-none focus:border-game-highlight"
              />
              <svg 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* Categories and Options */}
          <div ref={scrollContainerRef} className="max-h-80 overflow-y-auto dark-scrollbar">
            {filteredCategories.length === 0 ? (
              <div className="p-4 text-center text-gray-400">
                No epic options found
              </div>
            ) : (
              filteredCategories.map((category) => (
                <div 
                  key={category.id} 
                  ref={(el) => { categoryRefs.current[category.id] = el; }}
                  className="border-b border-border-dark last:border-b-0"
                >
                  {/* Category Header */}
                  <button
                    type="button"
                    onClick={() => handleCategoryClick(category.id)}
                    className={`
                      w-full px-4 py-3 text-left transition-all duration-200 flex items-center justify-between group
                      ${expandedCategory === category.id 
                        ? 'bg-theme-darker border-l-2 border-game-highlight' 
                        : 'hover:bg-theme-darker hover:border-l-2 hover:border-gray-600'
                      }
                    `}
                  >
                    <div className="flex items-center">
                      <div>
                        <div className={`font-medium transition-colors ${
                          expandedCategory === category.id 
                            ? 'text-game-highlight' 
                            : 'text-gray-200 group-hover:text-white'
                        }`}>
                          {category.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          {category.options.length} option{category.options.length !== 1 ? 's' : ''}
                          {expandedCategory === category.id && (
                            <span className="ml-2 text-game-highlight">• Expanded</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <svg 
                      className={`w-4 h-4 transition-all duration-200 ${
                        expandedCategory === category.id 
                          ? 'rotate-90 text-game-highlight' 
                          : 'text-gray-400 group-hover:text-gray-300'
                      }`}
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>

                  {/* Category Options */}
                  {expandedCategory === category.id && (
                    <div className="bg-theme-darker animate-slideDown border-l-2 border-game-highlight/30">
                      {category.options.map((option) => {
                        const isSelected = selectedOption === option.id;
                        
                        // Parse option to get level and type for coloring
                        const optionData = parseSelectedOption(option.id);
                        const epicColors = optionData ? getEpicOptionColors(optionData.level, optionData.type) : { text: 'text-gray-200' };
                        
                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => handleOptionSelect(option.id)}
                            className={`
                              w-full px-6 py-2 text-left transition-all duration-150 flex items-center
                              ${isSelected 
                                ? 'bg-game-gold/20 text-game-gold border-l-2 border-game-gold' 
                                : `hover:bg-theme-dark ${epicColors.text} hover:text-white hover:border-l-2 hover:border-game-highlight hover:px-7`
                              }
                            `}
                          >
                            <div className="flex items-center">
                              <div className={`w-2 h-2 rounded-full mr-3 flex-shrink-0 ${isSelected ? 'bg-game-gold' : epicColors.text.replace('text-', 'bg-')}`} />
                              <span className="font-medium">
                                {option.displayName}
                              </span>
                            </div>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              ))
            )}
          </div>

          {/* Quick Actions */}
          {selectedOption && (
            <div className="p-3 border-t border-border-dark bg-theme-darker">
              <button
                type="button"
                onClick={handleClearSelection}
                className="w-full px-3 py-2 text-sm text-red-400 hover:text-red-300 hover:bg-red-900/20 rounded transition-colors"
              >
                Clear Selection
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CascadingEpicDropdown;
export type { EpicOption, EpicCategory };