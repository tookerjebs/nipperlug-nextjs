/**
 * Chloe Calculator - Enhanced Table-based UI
 * Migrated from WordPress implementation with modern React patterns
 */

'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { CHLOE_RECIPES, getRecipeCategories, type ChloeRecipe } from '../data/recipes';
import { usePriceStore } from '@/stores/priceStore';
import FilterControls from './FilterControls';
import BatchCalculateModal from './BatchCalculateModal';
import ImportPricesModal from './ImportPricesModal';
import ChloeCalculatorHeader from './ChloeCalculatorHeader';
import PriceInput from './PriceInput';
import { ProfitCalculations, type RecipeMetrics } from './ProfitCalculations';
import RngBoxInfoModal from './RngBoxInfoModal';
import { detectRngBox } from '../utils/rngBoxDetector';
import { Info } from 'lucide-react';

interface SortConfig {
  key: keyof ChloeRecipe | 'profitMargin' | 'expectedProfit' | 'craftCost' | 'craftsToPayOff' | 'costPerUnit';
  direction: 'asc' | 'desc';
}

const RECIPES_PER_PAGE = 50; // Number of recipes to load per "Load More" click

export default function ChloeCalculator() {

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [demandFilter, setDemandFilter] = useState<string>('');
  const [showRegisterCost, setShowRegisterCost] = useState(false);
  const [showCostPerUnit, setShowCostPerUnit] = useState(false);
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [excludeMissingPrices, setExcludeMissingPrices] = useState(false);
  const [salesFee, setSalesFee] = useState(5);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>(null);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [batchModal, setBatchModal] = useState<{ isOpen: boolean; recipe: ChloeRecipe | null }>({
    isOpen: false,
    recipe: null
  });
  const [batchQuantity, setBatchQuantity] = useState(10);
  const [excludeRegisterCost, setExcludeRegisterCost] = useState(true);
  const [importModal, setImportModal] = useState(false);
  const [showApiModal, setShowApiModal] = useState(false);
  const [rngBoxModal, setRngBoxModal] = useState<{
    isOpen: boolean;
    itemName: string;
    recipeName: string;
    itemType: 'cartridge' | 'dice';
    outputQuantity: number;
  }>({
    isOpen: false,
    itemName: '',
    recipeName: '',
    itemType: 'cartridge',
    outputQuantity: 0
  });
  const [displayCount, setDisplayCount] = useState(RECIPES_PER_PAGE); // Initial number of recipes to show
  
  const { getPrice, setPrice, clearAllPrices, hydrate } = usePriceStore();

  useEffect(() => {
    hydrate(); // Load prices from localStorage
    loadSettings();
  }, [hydrate]);

  // Save all settings to localStorage
  const saveSettings = () => {
    try {
      const settings = {
        favorites: Array.from(favorites),
        showOnlyFavorites,
        excludeMissingPrices,
        salesFee,
        searchTerm,
        selectedCategories,
        demandFilter,
        showRegisterCost,
        showCostPerUnit,
        excludeRegisterCost
      };
      localStorage.setItem('chloe-calculator-settings', JSON.stringify(settings));
      // You could add a toast notification here if you want
      console.log('Settings saved successfully');
    } catch (error) {
      console.warn('Failed to save settings:', error);
    }
  };

  // Load all settings from localStorage
  const loadSettings = () => {
    try {
      const savedSettings = localStorage.getItem('chloe-calculator-settings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        
        // Load each setting with fallback to current values
        if (settings.favorites) setFavorites(new Set(settings.favorites));
        if (settings.showOnlyFavorites !== undefined) setShowOnlyFavorites(settings.showOnlyFavorites);
        if (settings.excludeMissingPrices !== undefined) setExcludeMissingPrices(settings.excludeMissingPrices);
        if (settings.salesFee !== undefined) setSalesFee(settings.salesFee);
        if (settings.searchTerm !== undefined) setSearchTerm(settings.searchTerm);
        if (settings.selectedCategories) setSelectedCategories(settings.selectedCategories);
        if (settings.demandFilter !== undefined) setDemandFilter(settings.demandFilter);
        if (settings.showRegisterCost !== undefined) setShowRegisterCost(settings.showRegisterCost);
        if (settings.showCostPerUnit !== undefined) setShowCostPerUnit(settings.showCostPerUnit);
        if (settings.excludeRegisterCost !== undefined) setExcludeRegisterCost(settings.excludeRegisterCost);
      }
    } catch (error) {
      console.warn('Failed to load settings:', error);
    }
  };

  // Reset only settings to defaults (keeps prices)
  const resetSettings = () => {
    try {
      // Clear only settings localStorage (NOT prices)
      localStorage.removeItem('chloe-calculator-settings');
      
      // Reset only UI/filter settings to defaults (NOT prices)
      setFavorites(new Set());
      setShowOnlyFavorites(false);
      setExcludeMissingPrices(false);
      setSalesFee(5);
      setSearchTerm('');
      setSelectedCategories([]);
      setDemandFilter('');
      setShowRegisterCost(false);
      setShowCostPerUnit(false);
      setExcludeRegisterCost(false);
      setSortConfig(null);
      setExpandedRows(new Set());
      
      console.log('Settings reset to defaults (prices preserved)');
    } catch (error) {
      console.warn('Failed to reset settings:', error);
    }
  };
  
  const categories = getRecipeCategories();

  // Calculate recipe metrics using utility class
  const calculateRecipeMetrics = useCallback((recipe: ChloeRecipe): RecipeMetrics => {
    return ProfitCalculations.calculateRecipeMetrics(recipe, getPrice, salesFee);
  }, [getPrice, salesFee]);

  // Filter and sort recipes
  const filteredAndSortedRecipes = useMemo(() => {
    const filtered = CHLOE_RECIPES.filter(recipe => {
      const recipeId = `${recipe.name}-${recipe.recipe}`;
      
      const matchesSearch = recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           recipe.recipe.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(recipe.category);
      const matchesDemand = !demandFilter || recipe.demand === demandFilter;
      const matchesFavorites = !showOnlyFavorites || favorites.has(recipeId);
      
      // Check for missing prices
      let matchesPriceFilter = true;
      if (excludeMissingPrices) {
        const metrics = ProfitCalculations.calculateRecipeMetrics(recipe, getPrice, salesFee);
        matchesPriceFilter = !metrics.missingAnyPrice;
      }
      
      return matchesSearch && matchesCategory && matchesDemand && matchesFavorites && matchesPriceFilter;
    });

    if (sortConfig) {
      filtered.sort((a, b) => {
        let aValue: number | string;
        let bValue: number | string;

        if (sortConfig.key === 'profitMargin' || sortConfig.key === 'expectedProfit' || 
            sortConfig.key === 'craftCost' || sortConfig.key === 'craftsToPayOff' || sortConfig.key === 'costPerUnit') {
          const aMetrics = calculateRecipeMetrics(a);
          const bMetrics = calculateRecipeMetrics(b);
          if (sortConfig.key === 'costPerUnit') {
            aValue = aMetrics.craftCost / a.outputQuantity;
            bValue = bMetrics.craftCost / b.outputQuantity;
          } else {
            aValue = aMetrics[sortConfig.key];
            bValue = bMetrics[sortConfig.key];
          }
        } else {
          aValue = a[sortConfig.key] as number | string;
          bValue = b[sortConfig.key] as number | string;
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortConfig.direction === 'asc' 
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        const numA = Number(aValue) || 0;
        const numB = Number(bValue) || 0;
        
        return sortConfig.direction === 'asc' ? numA - numB : numB - numA;
      });
    }

    return filtered;
  }, [CHLOE_RECIPES, searchTerm, selectedCategories, demandFilter, showOnlyFavorites, excludeMissingPrices, favorites, sortConfig, calculateRecipeMetrics, getPrice, salesFee]);

  // Slice the filtered/sorted recipes for display (but filtering/sorting works on all recipes)
  const displayedRecipes = useMemo(() => {
    return filteredAndSortedRecipes.slice(0, displayCount);
  }, [filteredAndSortedRecipes, displayCount]);

  // Reset display count when filters change (so search results show from the top)
  useEffect(() => {
    setDisplayCount(RECIPES_PER_PAGE);
  }, [searchTerm, selectedCategories, demandFilter, showOnlyFavorites, excludeMissingPrices, sortConfig]);

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + RECIPES_PER_PAGE);
  };

  const handleSort = (key: SortConfig['key']) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const toggleRowExpansion = (recipeId: string) => {
    setExpandedRows(prev => {
      const newSet = new Set<string>();
      // If clicking on the currently expanded row, close it (set remains empty)
      // If clicking on a different row, open only that one
      if (!prev.has(recipeId)) {
        newSet.add(recipeId);
      }
      return newSet;
    });
  };

  const toggleFavorite = (recipeId: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(recipeId)) {
        newSet.delete(recipeId);
      } else {
        newSet.add(recipeId);
      }
      return newSet;
    });
  };

  const openBatchModal = (recipe: ChloeRecipe) => {
    setBatchModal({ isOpen: true, recipe });
  };

  const closeBatchModal = () => {
    setBatchModal({ isOpen: false, recipe: null });
  };

  const openImportModal = () => {
    setImportModal(true);
  };

  const closeImportModal = () => {
    setImportModal(false);
  };

  const openRngBoxModal = (recipe: ChloeRecipe) => {
    const rngInfo = detectRngBox(recipe.name, recipe.recipe, recipe.outputQuantity);
    if (rngInfo.isRngBox && rngInfo.type) {
      setRngBoxModal({
        isOpen: true,
        itemName: recipe.name,
        recipeName: recipe.recipe,
        itemType: rngInfo.type,
        outputQuantity: rngInfo.outputQuantity
      });
    }
  };

  const closeRngBoxModal = () => {
    setRngBoxModal({
      isOpen: false,
      itemName: '',
      recipeName: '',
      itemType: 'cartridge',
      outputQuantity: 0
    });
  };

  // Use a more subtle sort indicator
  const getSortIcon = (key: SortConfig['key']) => {
    // No indicator for unsorted columns - the hover effect is enough to show it's sortable
    if (sortConfig?.key !== key) return '';
    // Small space plus simple character for sorted columns
    return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
  };



  return (
    <div className="min-h-screen bg-theme-darkest">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <ChloeCalculatorHeader />

        {/* Actions */}
        <div className="bg-component-card border border-border-dark rounded-lg p-4">
          <div className="flex items-center justify-start">
            <div className="flex flex-wrap gap-3">
              {/* Data Management */}
              <div className="flex gap-2">
                <button
                  onClick={openImportModal}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  Import Prices
                </button>
                <button
                  onClick={() => setShowApiModal(true)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  Load Prices
                </button>
                <button
                  onClick={clearAllPrices}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  Clear All Prices
                </button>
              </div>
              
              {/* Settings Management */}
              <div className="flex gap-2 border-l border-border-dark pl-3">
                <button
                  onClick={saveSettings}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  Save Settings
                </button>
                <button
                  onClick={resetSettings}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  Reset Settings
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Filters */}
        <FilterControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedCategories={selectedCategories}
          setSelectedCategories={setSelectedCategories}
          demandFilter={demandFilter}
          setDemandFilter={setDemandFilter}
          salesFee={salesFee}
          setSalesFee={setSalesFee}
          showRegisterCost={showRegisterCost}
          setShowRegisterCost={setShowRegisterCost}
          showCostPerUnit={showCostPerUnit}
          setShowCostPerUnit={setShowCostPerUnit}
          showOnlyFavorites={showOnlyFavorites}
          setShowOnlyFavorites={setShowOnlyFavorites}
          excludeMissingPrices={excludeMissingPrices}
          setExcludeMissingPrices={setExcludeMissingPrices}
          categories={categories}
        />

        {/* Results Table */}
        <div className="bg-component-card border border-border-dark rounded-lg overflow-hidden">
          {/* Desktop Table - hidden on mobile */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full">
              <thead className="bg-theme-dark border-b border-border-dark">
                <tr>
                  <th className="px-4 py-3 text-left border-r border-border-dark">⭐</th>
                  <th 
                    className="px-4 py-3 text-left cursor-pointer hover:bg-theme-light border-r border-border-dark"
                    onClick={() => handleSort('name')}
                  >
                    Name {getSortIcon('name')}
                  </th>
                  <th className="px-4 py-3 text-left border-r border-border-dark">Price Per Piece</th>
                  <th 
                    className="px-4 py-3 text-left cursor-pointer hover:bg-theme-light border-r border-border-dark"
                    onClick={() => handleSort('craftCost')}
                  >
                    Craft Cost {getSortIcon('craftCost')}
                  </th>
                  {showCostPerUnit && (
                    <th 
                      className="px-4 py-3 text-left cursor-pointer hover:bg-theme-light border-r border-border-dark"
                      onClick={() => handleSort('costPerUnit')}
                    >
                      Cost Per Unit {getSortIcon('costPerUnit')}
                    </th>
                  )}
                  <th 
                    className="px-4 py-3 text-left cursor-pointer hover:bg-theme-light border-r border-border-dark"
                    onClick={() => handleSort('profitMargin')}
                  >
                    Profit Margin {getSortIcon('profitMargin')}
                  </th>
                  <th 
                    className="px-4 py-3 text-left cursor-pointer hover:bg-theme-light border-r border-border-dark"
                    onClick={() => handleSort('expectedProfit')}
                  >
                    Expected Profit {getSortIcon('expectedProfit')}
                  </th>
                  {showRegisterCost && (
                    <>
                      <th className="px-4 py-3 text-left border-r border-border-dark">Register Cost</th>
                      <th 
                        className="px-4 py-3 text-left cursor-pointer hover:bg-theme-light border-r border-border-dark"
                        onClick={() => handleSort('craftsToPayOff')}
                      >
                        Crafts to Pay Off {getSortIcon('craftsToPayOff')}
                      </th>
                    </>
                  )}
                  <th className="px-4 py-3 text-left border-r border-border-dark">Success Rate</th>
                  <th className="px-4 py-3 text-left">Req. Amity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-dark">
                {displayedRecipes.map((recipe) => {
                  const recipeId = `${recipe.name}-${recipe.recipe}`;
                  const isExpanded = expandedRows.has(recipeId);
                  const isFavorite = favorites.has(recipeId);
                  const metrics = calculateRecipeMetrics(recipe);
                  const outputPrice = getPrice(recipe.name);

                  return (
                    <React.Fragment key={recipeId}>
                      <tr 
                        className="hover:bg-theme-light cursor-pointer transition-colors group"
                        onClick={(e) => {
                          // Only expand if click target is not a price input or its container
                          const target = e.target as Element;
                          if (!target.closest('input[type="number"]') && !target.matches('input[type="number"]')) {
                            toggleRowExpansion(recipeId);
                          }
                        }}
                        title="Click to view ingredients"
                      >
                        <td className="px-4 py-3 border-r border-border-dark">
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleFavorite(recipeId);
                            }}
                            className={`text-lg ${isFavorite ? 'text-red-500' : 'text-gray-400'} hover:text-red-400`}
                          >
                            ♥
                          </button>
                        </td>
                        <td className="px-4 py-3 border-r border-border-dark">
                          <div className="flex items-center space-x-3">
                            <img 
                              src={ProfitCalculations.getIconPath(recipe.iconPath)} 
                              alt={recipe.name}
                              className="w-8 h-8 object-contain"
                              onError={(e) => {
                                // Fallback to a default icon or hide if image fails to load
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                            <div className="flex items-center space-x-2">
                              <span className="font-medium">{recipe.recipe}</span>
                              <span 
                                className={`text-gray-400 group-hover:text-gray-300 transition-all duration-200 text-sm ${
                                  isExpanded ? 'rotate-90' : ''
                                }`}
                              >
                                ▶
                              </span>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-3 border-r border-border-dark">
                          <div className="flex items-center gap-2">
                            <PriceInput
                              value={outputPrice}
                              onChange={(value) => setPrice(recipe.name, value)}
                              variant="default"
                              placeholder="0"
                            />
                            {(() => {
                              const rngInfo = detectRngBox(recipe.name, recipe.recipe, recipe.outputQuantity);
                              return rngInfo.isRngBox ? (
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    openRngBoxModal(recipe);
                                  }}
                                  className="text-blue-400 hover:text-blue-300 transition-colors p-1 rounded hover:bg-blue-500/10"
                                  title="RNG Box Pricing Guide"
                                >
                                  <Info className="w-4 h-4" />
                                </button>
                              ) : null;
                            })()}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-red-400 border-r border-border-dark">
                          {ProfitCalculations.formatNumber(metrics.craftCost)}
                        </td>
                        {showCostPerUnit && (
                          <td className="px-4 py-3 text-orange-400 border-r border-border-dark">
                            {ProfitCalculations.formatNumber(metrics.craftCost / recipe.outputQuantity)}
                          </td>
                        )}
                        <td className={`px-4 py-3 border-r border-border-dark ${metrics.profitMargin >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {metrics.profitMargin.toFixed(2)}%
                        </td>
                        <td className={`px-4 py-3 border-r border-border-dark ${metrics.expectedProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {ProfitCalculations.formatNumber(metrics.expectedProfit)}
                          {metrics.missingAnyPrice && (
                            <span 
                              className="ml-2 text-yellow-400" 
                              title="Missing ingredient or recipe price - calculations may be inaccurate"
                            >
                              ⚠️
                            </span>
                          )}
                        </td>
                        {showRegisterCost && (
                          <>
                            <td className="px-4 py-3 text-yellow-400 border-r border-border-dark">
                              {ProfitCalculations.formatNumber(recipe.registerCost)}
                            </td>
                            <td className="px-4 py-3 text-blue-400 border-r border-border-dark">
                              {metrics.craftsToPayOff > 0 ? ProfitCalculations.formatNumber(metrics.craftsToPayOff) : '-'}
                            </td>
                          </>
                        )}
                        <td className="px-4 py-3 border-r border-border-dark">{recipe.successRate}%</td>
                        <td className="px-4 py-3">{recipe.requiredAmity || '0'}</td>
                      </tr>
                      
                      {/* Expanded Row Details */}
                      {isExpanded && (
                        <tr className="bg-theme-dark/50">
                          <td colSpan={showRegisterCost ? (showCostPerUnit ? 11 : 10) : (showCostPerUnit ? 9 : 8)} className="px-6 py-6">
                            <div className="max-w-4xl mx-auto">
                              {/* Ingredients Table */}
                              <div className="bg-theme-darkest/60 rounded-xl overflow-hidden border border-border-dark shadow-lg">
                                <table className="w-full">
                                  <thead>
                                    <tr className="bg-theme-dark border-b border-border-dark">
                                      <th className="px-6 py-3 text-left text-sm font-medium text-foreground/80 border-r border-border-dark">Item</th>
                                      <th className="px-4 py-3 text-center text-sm font-medium text-foreground/80 border-r border-border-dark">Quantity</th>
                                      <th className="px-4 py-3 text-center text-sm font-medium text-foreground/80 border-r border-border-dark">Price per unit</th>
                                      <th className="px-4 py-3 text-center text-sm font-medium text-foreground/80 border-r border-border-dark">Total</th>
                                      <th className="px-4 py-3 text-center text-sm font-medium text-foreground/80 w-20">Actions</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-border-dark">
                                    {recipe.ingredients.map((ingredient, index) => {
                                      const price = getPrice(ingredient.name);
                                      const total = (price || 0) * ingredient.quantity;
                                      
                                      return (
                                        <tr 
                                          key={`${recipeId}-ingredient-${index}`} 
                                          className="hover:bg-theme-light/30 transition-colors"
                                        >
                                          <td className="px-6 py-4 text-gray-200 font-medium border-r border-border-dark">{ingredient.name}</td>
                                          <td className="px-4 py-4 text-center text-foreground/80 border-r border-border-dark">{ingredient.quantity}</td>
                                          <td className="px-4 py-4 text-center border-r border-border-dark">
                                            <PriceInput
                                              value={price}
                                              onChange={(value) => setPrice(ingredient.name, value)}
                                              variant="ingredient-desktop"
                                              placeholder="0"
                                            />
                                          </td>
                                          <td className="px-4 py-4 text-right text-yellow-400 font-medium border-r border-border-dark">{ProfitCalculations.formatNumber(total)}</td>
                                          <td className="px-4 py-4 text-center">
                                            {index === 0 && (
                                              <button
                                                onClick={(e) => {
                                                  e.stopPropagation();
                                                  openBatchModal(recipe);
                                                }}
                                                className="bg-blue-600 hover:bg-blue-700 text-white p-1.5 rounded transition-all duration-200 text-sm shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:scale-105"
                                                title="Shopping List"
                                              >
                                                🛒
                                              </button>
                                            )}
                                          </td>
                                        </tr>
                                      );
                                    })}
                                  </tbody>
                                </table>
                              </div>
                            </div>
                          </td>
                        </tr>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards - shown only on mobile */}
          <div className="md:hidden space-y-4 p-4">
            {displayedRecipes.map((recipe) => {
              const recipeId = `${recipe.name}-${recipe.recipe}`;
              const isExpanded = expandedRows.has(recipeId);
              const isFavorite = favorites.has(recipeId);
              const metrics = calculateRecipeMetrics(recipe);
              const outputPrice = getPrice(recipe.name);

              return (
                <div 
                  key={recipeId}
                  className="bg-theme-dark/50 border border-border-dark rounded-lg p-4 space-y-3"
                >
                  {/* Card Header - Recipe Name + Icon + Favorite */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3 flex-1">
                      <img 
                        src={ProfitCalculations.getIconPath(recipe.iconPath)} 
                        alt={recipe.name}
                        className="w-10 h-10 object-contain flex-shrink-0"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <h3 className="font-medium text-foreground text-lg leading-tight">{recipe.recipe}</h3>
                    </div>
                    <button
                      onClick={() => toggleFavorite(recipeId)}
                      className={`text-xl ${isFavorite ? 'text-red-500' : 'text-gray-400'} hover:text-red-400 p-1 ml-2`}
                    >
                      ♥
                    </button>
                  </div>

                  {/* Card Body - Basic Info */}
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <span className="text-foreground/80">Success Rate:</span>
                      <div className="text-blue-400 font-medium">{recipe.successRate}%</div>
                    </div>
                    <div>
                      <span className="text-foreground/80">Req. Amity:</span>
                      <div className="text-purple-400 font-medium">{recipe.requiredAmity || '0'}</div>
                    </div>
                  </div>

                  {/* Price Input */}
                  <div className="space-y-2">
                    <label className="text-sm text-foreground/80">Price Per Piece</label>
                    <PriceInput
                      value={outputPrice}
                      onChange={(value) => setPrice(recipe.name, value)}
                      variant="mobile"
                      placeholder="Enter price..."
                    />
                  </div>

                  {/* Cost and Profit Metrics */}
                  <div className="space-y-3 pt-2 border-t border-border-dark">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-foreground/80">Craft Cost:</span>
                      <span className="text-red-400 font-medium">{ProfitCalculations.formatNumber(metrics.craftCost)}</span>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-xs text-foreground/60 mb-1">Profit Margin</div>
                        <div className={`text-lg font-bold ${metrics.profitMargin >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {metrics.profitMargin.toFixed(1)}%
                        </div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-foreground/60 mb-1">Expected Profit</div>
                        <div className={`text-lg font-bold ${metrics.expectedProfit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                          {ProfitCalculations.formatNumber(metrics.expectedProfit)}
                          {metrics.missingAnyPrice && (
                            <span className="ml-1 text-yellow-400 text-sm">⚠️</span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Register Cost Section - only show if enabled */}
                    {showRegisterCost && (
                      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border-dark/50">
                        <div className="text-center">
                          <div className="text-xs text-foreground/60 mb-1">Register Cost</div>
                          <div className="text-yellow-400 font-medium">
                            {ProfitCalculations.formatNumber(recipe.registerCost)}
                          </div>
                        </div>
                        <div className="text-center">
                          <div className="text-xs text-foreground/60 mb-1">Crafts to Pay Off</div>
                          <div className="text-blue-400 font-medium">
                            {metrics.craftsToPayOff > 0 ? ProfitCalculations.formatNumber(metrics.craftsToPayOff) : '-'}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2 pt-2">
                    <button
                      onClick={() => toggleRowExpansion(recipeId)}
                      className={`flex-1 py-2 px-4 rounded text-sm font-medium transition-colors ${
                        isExpanded 
                          ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                          : 'bg-theme-dark border border-border-dark hover:bg-theme-light text-foreground'
                      }`}
                    >
                      {isExpanded ? 'Hide Ingredients' : 'Show Ingredients'}
                    </button>
                    <button
                      onClick={() => openBatchModal(recipe)}
                      className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white text-sm font-medium rounded transition-colors"
                    >
                      Batch
                    </button>
                  </div>

                  {/* Expanded Ingredients - Mobile Version */}
                  {isExpanded && (
                    <div className="pt-3 border-t border-border-dark">
                      <h4 className="text-sm font-medium text-foreground/80 mb-3">Ingredients Required:</h4>
                      <div className="space-y-3">
                        {recipe.ingredients.map((ingredient, index) => {
                          const price = getPrice(ingredient.name);
                          const total = (price || 0) * ingredient.quantity;
                          
                          return (
                            <div key={`${recipeId}-ingredient-${index}`} className="bg-theme-darkest/60 rounded p-3 space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="font-medium text-sm">{ingredient.name}</span>
                                <span className="text-xs text-foreground/60">Qty: {ingredient.quantity}</span>
                              </div>
                              <div className="flex gap-2 items-center">
                                <PriceInput
                                  value={price}
                                  onChange={(value) => setPrice(ingredient.name, value)}
                                  variant="ingredient-mobile"
                                  placeholder="Price per unit"
                                />
                                <span className="text-yellow-400 text-sm font-medium w-20 text-right">
                                  {ProfitCalculations.formatNumber(total)}
                                </span>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          
          {filteredAndSortedRecipes.length === 0 && (
            <div className="text-center py-8 text-foreground/80">
              No recipes found matching your criteria.
            </div>
          )}

          {/* Load More Button */}
          {filteredAndSortedRecipes.length > displayCount && (
            <div className="border-t border-border-dark p-4 text-center">
              <button
                onClick={handleLoadMore}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors font-medium"
              >
                Load More ({filteredAndSortedRecipes.length - displayCount} remaining)
              </button>
            </div>
          )}

          {/* Show count info */}
          {filteredAndSortedRecipes.length > 0 && (
            <div className="border-t border-border-dark px-4 py-3 text-sm text-foreground/60 text-center">
              Showing {displayedRecipes.length} of {filteredAndSortedRecipes.length} recipes
            </div>
          )}
        </div>

        {/* Batch Calculation Modal */}
        <BatchCalculateModal
          isOpen={batchModal.isOpen}
          recipe={batchModal.recipe}
          batchQuantity={batchQuantity}
          setBatchQuantity={setBatchQuantity}
          excludeRegisterCost={excludeRegisterCost}
          setExcludeRegisterCost={setExcludeRegisterCost}
          getPrice={getPrice}
          salesFee={salesFee}
          onClose={closeBatchModal}
        />

        {/* Import Prices Modal */}
        <ImportPricesModal
          isOpen={importModal}
          onClose={closeImportModal}
        />

        {/* RNG Box Info Modal */}
        <RngBoxInfoModal
          isOpen={rngBoxModal.isOpen}
          onClose={closeRngBoxModal}
          itemName={rngBoxModal.itemName}
          recipeName={rngBoxModal.recipeName}
          itemType={rngBoxModal.itemType}
          outputQuantity={rngBoxModal.outputQuantity}
        />

        {/* API Modal */}
        {showApiModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-theme-darker border border-border-dark rounded-lg p-4 max-w-sm mx-4">
              <div className="text-center space-y-3">
                <h3 className="text-lg font-bold text-white">API Coming Soon™</h3>
                <p className="text-gray-300 text-sm">
                  Waiting for game devs to release market APIs! Use Import for now.
                </p>
                <button
                  onClick={() => setShowApiModal(false)}
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors text-sm"
                >
                  Got it
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}