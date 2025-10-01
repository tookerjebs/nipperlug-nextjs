/**
 * Filter Controls Component
 * Handles search, category filter, demand filter, sales fee, and other controls
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePriceStore } from '@/stores/priceStore';
import PriceInput from './PriceInput';

interface FilterControlsProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedCategories: string[];
  setSelectedCategories: (value: string[]) => void;
  demandFilter: string;
  setDemandFilter: (value: string) => void;
  salesFee: number;
  setSalesFee: (value: number) => void;
  showRegisterCost: boolean;
  setShowRegisterCost: (value: boolean) => void;
  showCostPerUnit: boolean;
  setShowCostPerUnit: (value: boolean) => void;
  showOnlyFavorites: boolean;
  setShowOnlyFavorites: (value: boolean) => void;
  excludeMissingPrices: boolean;
  setExcludeMissingPrices: (value: boolean) => void;
  categories: string[];
}

export default function FilterControls({
  searchTerm,
  setSearchTerm,
  selectedCategories,
  setSelectedCategories,
  demandFilter,
  setDemandFilter,
  salesFee,
  setSalesFee,
  showRegisterCost,
  setShowRegisterCost,
  showCostPerUnit,
  setShowCostPerUnit,
  showOnlyFavorites,
  setShowOnlyFavorites,
  excludeMissingPrices,
  setExcludeMissingPrices,
  categories
}: FilterControlsProps) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCategoryToggle = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter(c => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const selectAllCategories = () => {
    setSelectedCategories([...categories]);
  };

  const clearAllCategories = () => {
    setSelectedCategories([]);
  };
  return (
    <div className="bg-component-card border border-border-dark rounded-lg p-6">
      <div className="flex flex-wrap gap-4 items-center">
        {/* Search */}
        <div className="flex-1 min-w-64">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-theme-dark border border-border-dark rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Category Filter - Custom Dropdown */}
        <div className="relative" ref={dropdownRef}>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="bg-theme-dark border border-border-dark rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none min-w-48 flex items-center justify-between hover:border-border-light transition-colors"
          >
            <span className="text-left">
              {selectedCategories.length === 0 
                ? 'Select Categories...' 
                : selectedCategories.length === 1 
                  ? selectedCategories[0]
                  : `${selectedCategories.length} categories selected`
              }
            </span>
            <span className={`transform transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}>
              ▼
            </span>
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-theme-dark border border-border-dark rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
              {/* Select All / Clear All buttons */}
              <div className="flex border-b border-gray-700">
                <button
                  onClick={selectAllCategories}
                  className="flex-1 px-3 py-2 text-sm text-blue-400 hover:bg-theme-light transition-colors"
                >
                  Select All
                </button>
                <button
                  onClick={clearAllCategories}
                  className="flex-1 px-3 py-2 text-sm text-red-400 hover:bg-theme-light transition-colors border-l border-gray-700"
                >
                  Clear All
                </button>
              </div>

              {/* Category checkboxes */}
              <div className="py-1">
                {categories.map(category => (
                  <label
                    key={category}
                    className="flex items-center px-3 py-2 hover:bg-theme-light cursor-pointer transition-colors"
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.includes(category)}
                      onChange={() => handleCategoryToggle(category)}
                      className="mr-3 rounded border-gray-700 bg-theme-dark text-blue-500 focus:ring-blue-500 focus:ring-2"
                    />
                    <span className="text-white text-sm">{category}</span>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Selected count badge */}
          {selectedCategories.length > 0 && (
            <div className="absolute -top-2 -right-2 bg-blue-500 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center">
              {selectedCategories.length}
            </div>
          )}
        </div>

        {/* Demand Filter */}
        <select
          value={demandFilter}
          onChange={(e) => setDemandFilter(e.target.value)}
          className="bg-theme-dark border border-border-dark rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
        >
          <option value="">All Demand</option>
          <option value="High">High Demand</option>
          <option value="Medium">Medium Demand</option>
          <option value="Low">Low Demand</option>
        </select>

        {/* Sales Fee */}
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-300">Sales Fee:</label>
          <PriceInput
            value={salesFee}
            onChange={setSalesFee}
            variant="compact"
          />
          <span className="text-sm text-gray-300">%</span>
        </div>

        {/* Register Cost Toggle */}
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showRegisterCost}
            onChange={(e) => setShowRegisterCost(e.target.checked)}
            className="rounded"
          />
          <span className="text-sm text-gray-300">Show Register Costs</span>
        </label>

        {/* Cost Per Unit Toggle */}
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showCostPerUnit}
            onChange={(e) => setShowCostPerUnit(e.target.checked)}
            className="rounded"
          />
          <span className="text-sm text-gray-300">Show Craft Cost Per Unit</span>
        </label>

        {/* Show Only Favorites */}
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showOnlyFavorites}
            onChange={(e) => setShowOnlyFavorites(e.target.checked)}
            className="rounded"
          />
          <span className="text-sm text-gray-300">Show Only Favorites</span>
        </label>

        {/* Exclude Missing Prices */}
        <label className="flex items-center space-x-2 cursor-pointer">
          <input
            type="checkbox"
            checked={excludeMissingPrices}
            onChange={(e) => setExcludeMissingPrices(e.target.checked)}
            className="rounded"
          />
          <span className="text-sm text-gray-300">Exclude Missing Prices</span>
        </label>


      </div>


    </div>
  );
}