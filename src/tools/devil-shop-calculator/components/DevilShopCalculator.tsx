/**
 * Devil Shop Calculator - Enhanced Table-based UI
 * Migrated from WordPress implementation with modern React patterns
 */

'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { DEVIL_SHOP_ITEMS, type DevilShopItem } from '../data/items';
import { usePriceStore } from '@/stores/priceStore';
import { formatNumber } from '@/utils/numberFormat';
import DevilShopFilters from './DevilShopFilters';
import ImportPricesModal from './ImportPricesModal';

interface SortConfig {
  key: keyof DevilShopItem | 'profitPerPurchase' | 'profitPerToken' | 'tokenCost' | 'totalValue';
  direction: 'asc' | 'desc';
}

export default function DevilShopCalculator() {

  const [searchTerm, setSearchTerm] = useState('');
  const [tokenTypeFilter, setTokenTypeFilter] = useState<string>('');
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
  const [excludeMissingPrices, setExcludeMissingPrices] = useState(false);
  const [salesFee, setSalesFee] = useState(5);
  const [sortConfig, setSortConfig] = useState<SortConfig | null>({
    key: 'profitPerToken',
    direction: 'desc'
  });
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [importModal, setImportModal] = useState(false);
  const [showApiModal, setShowApiModal] = useState(false);
  
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
        tokenTypeFilter
      };
      localStorage.setItem('devil-shop-calculator-settings', JSON.stringify(settings));
      console.log('Settings saved successfully');
    } catch (error) {
      console.warn('Failed to save settings:', error);
    }
  };

  // Load all settings from localStorage
  const loadSettings = () => {
    try {
      const savedSettings = localStorage.getItem('devil-shop-calculator-settings');
      if (savedSettings) {
        const settings = JSON.parse(savedSettings);
        
        // Load each setting with fallback to current values
        if (settings.favorites) setFavorites(new Set(settings.favorites));
        if (settings.showOnlyFavorites !== undefined) setShowOnlyFavorites(settings.showOnlyFavorites);
        if (settings.excludeMissingPrices !== undefined) setExcludeMissingPrices(settings.excludeMissingPrices);
        if (settings.salesFee !== undefined) setSalesFee(settings.salesFee);
        if (settings.searchTerm !== undefined) setSearchTerm(settings.searchTerm);
        if (settings.tokenTypeFilter !== undefined) setTokenTypeFilter(settings.tokenTypeFilter);
      }
    } catch (error) {
      console.warn('Failed to load settings:', error);
    }
  };

  // Reset only settings to defaults (keeps prices)
  const resetSettings = () => {
    try {
      // Clear only settings localStorage (NOT prices)
      localStorage.removeItem('devil-shop-calculator-settings');
      
      // Reset only UI/filter settings to defaults (NOT prices)
      setFavorites(new Set());
      setShowOnlyFavorites(false);
      setExcludeMissingPrices(false);
      setSalesFee(5);
      setSearchTerm('');
      setTokenTypeFilter('');
      setSortConfig({
        key: 'profitPerToken',
        direction: 'desc'
      });
      
      console.log('Settings reset to defaults (prices preserved)');
    } catch (error) {
      console.warn('Failed to reset settings:', error);
    }
  };

  // Get token price from global price store
  const getTokenPrice = useCallback((tokenType: 'High' | 'Highest'): number => {
    return getPrice(`Devil's Token(${tokenType})`) || 0;
  }, [getPrice]);

  // Calculate profit for an item (per purchase)
  const calculateProfit = useCallback((item: DevilShopItem): number => {
    const marketPrice = getPrice(item.name) || 0;
    const tokenPrice = getTokenPrice(item.tokenType);
    
    // Apply sales fee to the market price
    const adjustedMarketPrice = marketPrice * (1 - salesFee / 100);
    
    const totalMarketValue = adjustedMarketPrice * item.quantity;
    const totalTokenCost = item.tokensRequired * tokenPrice;
    
    return totalMarketValue - totalTokenCost;
  }, [getPrice, getTokenPrice, salesFee]);

  // Calculate profit per token (for better comparison across items)
  const calculateProfitPerToken = useCallback((item: DevilShopItem): number => {
    const totalProfit = calculateProfit(item);
    return item.tokensRequired > 0 ? totalProfit / item.tokensRequired : 0;
  }, [calculateProfit]);

  // Calculate token cost for an item
  const calculateTokenCost = useCallback((item: DevilShopItem): number => {
    const tokenPrice = getTokenPrice(item.tokenType);
    return item.tokensRequired * tokenPrice;
  }, [getTokenPrice]);

  // Calculate total value for an item
  const calculateTotalValue = useCallback((item: DevilShopItem): number => {
    const marketPrice = getPrice(item.name) || 0;
    return marketPrice * item.quantity;
  }, [getPrice]);

  // Filter and sort items
  const filteredAndSortedItems = useMemo(() => {
    const filtered = DEVIL_SHOP_ITEMS.filter(item => {
      const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesTokenType = !tokenTypeFilter || item.tokenType === tokenTypeFilter;
      const matchesFavorites = !showOnlyFavorites || favorites.has(item.name);
      
      // Check for missing prices
      let matchesPriceFilter = true;
      if (excludeMissingPrices) {
        const hasMarketPrice = (getPrice(item.name) || 0) > 0;
        const hasTokenPrice = getTokenPrice(item.tokenType) > 0;
        matchesPriceFilter = hasMarketPrice && hasTokenPrice;
      }
      
      return matchesSearch && matchesTokenType && matchesFavorites && matchesPriceFilter;
    });

    if (sortConfig) {
      filtered.sort((a, b) => {
        let aValue: number | string;
        let bValue: number | string;

        if (sortConfig.key === 'profitPerPurchase') {
          aValue = calculateProfit(a);
          bValue = calculateProfit(b);
        } else if (sortConfig.key === 'profitPerToken') {
          aValue = calculateProfitPerToken(a);
          bValue = calculateProfitPerToken(b);
        } else if (sortConfig.key === 'tokenCost') {
          aValue = calculateTokenCost(a);
          bValue = calculateTokenCost(b);
        } else if (sortConfig.key === 'totalValue') {
          aValue = calculateTotalValue(a);
          bValue = calculateTotalValue(b);
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
  }, [DEVIL_SHOP_ITEMS, searchTerm, tokenTypeFilter, showOnlyFavorites, excludeMissingPrices, favorites, sortConfig, calculateProfit, calculateProfitPerToken, calculateTokenCost, calculateTotalValue, getPrice, getTokenPrice]);

  const handleSort = (key: SortConfig['key']) => {
    setSortConfig(current => ({
      key,
      direction: current?.key === key && current.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const toggleFavorite = (itemName: string) => {
    setFavorites(prev => {
      const newSet = new Set(prev);
      if (newSet.has(itemName)) {
        newSet.delete(itemName);
      } else {
        newSet.add(itemName);
      }
      return newSet;
    });
  };

  // Use a more subtle sort indicator
  const getSortIcon = (key: SortConfig['key']) => {
    // No indicator for unsorted columns - the hover effect is enough to show it's sortable
    if (sortConfig?.key !== key) return '';
    // Small space plus simple character for sorted columns
    return sortConfig.direction === 'asc' ? ' ↑' : ' ↓';
  };

  // formatNumber is now imported from central utility

  const openImportModal = () => {
    setImportModal(true);
  };

  const closeImportModal = () => {
    setImportModal(false);
  };



  return (
    <div className="min-h-screen bg-theme-darkest">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="bg-component-card border border-border-dark rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-foreground">Devil Shop Calculator</h1>
          
          {/* Description Section */}
          <div className="space-y-4 text-foreground/80">
            <div>
              <p>
                The Devil Shop Calculator helps you analyze the profitability of items available through 
                Devil's Token shops in Cabal Online. It calculates expected profits based on token costs 
                and current market prices to help you make informed purchasing decisions.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">How to use</h2>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Set token prices:</strong> Enter current market prices for High and Highest tokens</li>
                <li><strong>Set item prices:</strong> Enter current market prices in the "Item Sell Price" column</li>
                <li><strong>Use filters:</strong> Search by name, filter by token type, or show only profitable items</li>
                <li><strong>Sort columns:</strong> Click column headers to sort by profit, cost, or other metrics</li>
                <li><strong>Favorite items:</strong> Click the ♥ icon to mark items for easy access</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Understanding Profit Metrics</h2>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Profit Per Purchase:</strong> Total profit from buying one complete shop entry (e.g., 127 items for 10 tokens)</li>
                <li><strong>Profit Per Token:</strong> Profit efficiency per token spent - better for comparing items with different token costs</li>
                <li><strong>Tip:</strong> Sort by "Profit Per Token" to find the most efficient token investments</li>
              </ul>
            </div>

            {/* Devil Shop Merchants Section */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Devil Shop Merchants</h2>
              <div className="grid md:grid-cols-2 gap-6">
                {/* Incubo - High Token Merchant */}
                <div className="bg-theme-dark/50 border border-border-dark rounded-lg p-4 flex flex-col md:flex-row items-center gap-4">
                  <div className="w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg">
                    <img 
                      src="/images/devil-shop/devil merchant incubo.png" 
                      alt="Devil Merchant Incubo" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-blue-400">Incubo</h3>
                    <p className="text-sm text-foreground/80 mt-1">
                      Located in Porta Inferno (205, 227) near the Devil's Tower dungeon entrance. Incubo offers items in exchange for <strong>High Devil's Tokens</strong>. 
                      His inventory includes various consumables and enhancement materials at lower token costs.
                    </p>
                    <div className="flex items-center mt-2">
                      <img 
                        src="/images/devil-shop/devil-token-high.png" 
                        alt="High Devil's Token" 
                        className="w-6 h-6 mr-2"
                      />
                      <span className="text-sm text-foreground/80">Accepts High Devil's Tokens</span>
                    </div>
                  </div>
                </div>

                {/* Secubo - Highest Token Merchant */}
                <div className="bg-theme-dark/50 border border-border-dark rounded-lg p-4 flex flex-col md:flex-row items-center gap-4">
                  <div className="w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg">
                    <img 
                      src="/images/devil-shop/devil merchant secubo.png" 
                      alt="Devil Merchant Secubo" 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-purple-400">Secubo</h3>
                    <p className="text-sm text-foreground/80 mt-1">
                      Located in Porta Inferno (230, 227) near the Devil's Tower dungeon entrance. Secubo trades premium items for <strong>Highest Devil's Tokens</strong>. 
                      His shop features rarer and more valuable items, including equipment and special materials.
                    </p>
                    <div className="flex items-center mt-2">
                      <img 
                        src="/images/devil-shop/devil-token-highest.png" 
                        alt="Highest Devil's Token" 
                        className="w-6 h-6 mr-2"
                      />
                      <span className="text-sm text-foreground/80">Accepts Highest Devil's Tokens</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4">
              <h2 className="text-xl font-semibold text-yellow-400 mb-2">⚠️ Important Notes</h2>
              <ul className="list-disc list-inside space-y-1 ml-4 text-yellow-200">
                <li><strong>Market prices change:</strong> Update prices regularly as market conditions fluctuate</li>
                <li><strong>Sales fee applied:</strong> The calculator accounts for market transaction fees (default 5%)</li>
                <li><strong>Token availability:</strong> Consider how easy it is to obtain the required tokens</li>
                <li><strong>Demand matters:</strong> High-profit items might be hard to sell if there's no demand</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="bg-component-card border border-border-dark rounded-lg p-4">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Actions</h3>
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
        <DevilShopFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          tokenTypeFilter={tokenTypeFilter}
          setTokenTypeFilter={setTokenTypeFilter}
          salesFee={salesFee}
          setSalesFee={setSalesFee}
          showOnlyFavorites={showOnlyFavorites}
          setShowOnlyFavorites={setShowOnlyFavorites}
          excludeMissingPrices={excludeMissingPrices}
          setExcludeMissingPrices={setExcludeMissingPrices}
          getTokenPrice={getTokenPrice}
          setPrice={setPrice}
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
                    Item Name {getSortIcon('name')}
                  </th>
                  <th className="px-4 py-3 text-left border-r border-border-dark">Quantity</th>
                  <th 
                    className="px-4 py-3 text-left cursor-pointer hover:bg-theme-light border-r border-border-dark"
                    onClick={() => handleSort('tokensRequired')}
                  >
                    Token Cost {getSortIcon('tokensRequired')}
                  </th>
                  <th className="px-4 py-3 text-left w-40 border-r border-border-dark">Item Sell Price (per piece)</th>
                  <th 
                    className="px-4 py-3 text-left cursor-pointer hover:bg-theme-light border-r border-border-dark"
                    onClick={() => handleSort('profitPerPurchase')}
                  >
                    Profit Per Purchase {getSortIcon('profitPerPurchase')}
                  </th>
                  <th 
                    className="px-4 py-3 text-left cursor-pointer hover:bg-theme-light"
                    onClick={() => handleSort('profitPerToken')}
                  >
                    Profit Per Token {getSortIcon('profitPerToken')}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-dark">
                {filteredAndSortedItems.map((item) => {
                  const isFavorite = favorites.has(item.name);
                  const profit = calculateProfit(item);
                  const profitPerToken = calculateProfitPerToken(item);
                  const tokenCost = calculateTokenCost(item);
                  const marketPrice = getPrice(item.name) || 0;
                  const hasTokenPrice = getTokenPrice(item.tokenType) > 0;

                  return (
                    <tr 
                      key={item.name}
                      className="hover:bg-theme-light transition-colors"
                    >
                      <td className="px-4 py-3 border-r border-border-dark">
                        <button
                          onClick={() => toggleFavorite(item.name)}
                          className={`text-lg ${isFavorite ? 'text-red-500' : 'text-gray-400'} hover:text-red-400`}
                        >
                          ♥
                        </button>
                      </td>
                      <td className="px-4 py-3 border-r border-border-dark">
                        <span className="font-medium">{item.name}</span>
                      </td>
                      <td className="px-4 py-3 text-blue-400 border-r border-border-dark">{item.quantity}</td>
                      <td className="px-4 py-3 border-r border-border-dark">
                        <div className="flex items-center gap-1">
                          <img 
                            src={`/images/devil-shop/devil-token-${item.tokenType.toLowerCase()}.png`}
                            alt={`Devil's Token (${item.tokenType})`}
                            className="w-6 h-6 flex-shrink-0"
                            title={`Devil's Token (${item.tokenType})`}
                          />
                          <span className="text-white font-medium">×</span>
                          <span className="text-yellow-400 font-medium">
                            {item.tokensRequired}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3 w-40 border-r border-border-dark">
                        <input
                          type="number"
                          value={marketPrice || ''}
                          onChange={(e) => {
                            setPrice(item.name, Number(e.target.value) || 0);
                          }}
                          className="w-full bg-theme-dark border border-border-dark rounded px-2 py-1 text-white text-sm focus:border-blue-500 focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield]"
                          placeholder="0"
                        />
                      </td>
                      <td className={`px-4 py-3 font-medium border-r border-border-dark ${profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {formatNumber(profit)}
                        {(!hasTokenPrice || marketPrice === 0) && (
                          <span 
                            className="ml-2 text-yellow-400" 
                            title="Missing token price or market price - calculations may be inaccurate"
                          >
                            ⚠️
                          </span>
                        )}
                      </td>
                      <td className={`px-4 py-3 font-medium ${profitPerToken >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {formatNumber(profitPerToken)}
                        {(!hasTokenPrice || marketPrice === 0) && (
                          <span 
                            className="ml-2 text-yellow-400" 
                            title="Missing token price or market price - calculations may be inaccurate"
                          >
                            ⚠️
                          </span>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards - shown only on mobile */}
          <div className="md:hidden space-y-4 p-4">
            {filteredAndSortedItems.map((item) => {
              const isFavorite = favorites.has(item.name);
              const profit = calculateProfit(item);
              const profitPerToken = calculateProfitPerToken(item);
              const tokenCost = calculateTokenCost(item);
              const marketPrice = getPrice(item.name) || 0;
              const hasTokenPrice = getTokenPrice(item.tokenType) > 0;

              return (
                <div 
                  key={item.name}
                  className="bg-theme-dark/50 border border-border-dark rounded-lg p-4 space-y-3"
                >
                  {/* Card Header - Item Name + Favorite */}
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-foreground text-lg">{item.name}</h3>
                    <button
                      onClick={() => toggleFavorite(item.name)}
                      className={`text-xl ${isFavorite ? 'text-red-500' : 'text-gray-400'} hover:text-red-400 p-1`}
                    >
                      ♥
                    </button>
                  </div>

                  {/* Card Body - Token Cost + Quantity */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-foreground/80">Token Cost:</span>
                      <div className="flex items-center gap-1">
                        <img 
                          src={`/images/devil-shop/devil-token-${item.tokenType.toLowerCase()}.png`}
                          alt={`Devil's Token (${item.tokenType})`}
                          className="w-5 h-5 flex-shrink-0"
                        />
                        <span className="text-white font-medium">×</span>
                        <span className="text-yellow-400 font-medium">{item.tokensRequired}</span>
                      </div>
                    </div>
                    <div className="text-blue-400">
                      <span className="text-foreground/80">Qty:</span> {item.quantity}
                    </div>
                  </div>

                  {/* Price Input */}
                  <div className="space-y-2">
                    <label className="text-sm text-foreground/80">Item Sell Price (per piece)</label>
                    <input
                      type="number"
                      value={marketPrice || ''}
                      onChange={(e) => {
                        setPrice(item.name, Number(e.target.value) || 0);
                      }}
                      className="w-full bg-theme-darkest border border-border-dark rounded px-3 py-3 text-white focus:border-blue-500 focus:outline-none text-lg [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield]"
                      placeholder="Enter price..."
                    />
                  </div>

                  {/* Profit Metrics */}
                  <div className="grid grid-cols-2 gap-4 pt-2 border-t border-border-dark">
                    <div className="text-center">
                      <div className="text-xs text-foreground/60 mb-1">Profit Per Purchase</div>
                      <div className={`text-lg font-bold ${profit >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {formatNumber(profit)}
                        {(!hasTokenPrice || marketPrice === 0) && (
                          <span className="ml-1 text-yellow-400 text-sm">⚠️</span>
                        )}
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-xs text-foreground/60 mb-1">Profit Per Token</div>
                      <div className={`text-lg font-bold ${profitPerToken >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {formatNumber(profitPerToken)}
                        {(!hasTokenPrice || marketPrice === 0) && (
                          <span className="ml-1 text-yellow-400 text-sm">⚠️</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          
          {filteredAndSortedItems.length === 0 && (
            <div className="text-center py-8 text-foreground/80">
              No items found matching your criteria.
            </div>
          )}
        </div>

        {/* Import Prices Modal */}
        <ImportPricesModal
          isOpen={importModal}
          onClose={closeImportModal}
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