/**
 * Devil Shop Calculator - Filter Controls Component
 * Provides filtering and configuration options for the Devil Shop Calculator
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import { usePriceStore } from '@/stores/priceStore';

interface DevilShopFiltersProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  tokenTypeFilter: string;
  setTokenTypeFilter: (type: string) => void;
  salesFee: number;
  setSalesFee: (fee: number) => void;
  showOnlyFavorites: boolean;
  setShowOnlyFavorites: (show: boolean) => void;
  excludeMissingPrices: boolean;
  setExcludeMissingPrices: (exclude: boolean) => void;
  getTokenPrice: (tokenType: 'High' | 'Highest') => number;
  setPrice: (itemName: string, price: number) => void;
}

export default function DevilShopFilters({
  searchTerm,
  setSearchTerm,
  tokenTypeFilter,
  setTokenTypeFilter,
  salesFee,
  setSalesFee,
  showOnlyFavorites,
  setShowOnlyFavorites,
  excludeMissingPrices,
  setExcludeMissingPrices,
  getTokenPrice,
  setPrice
}: DevilShopFiltersProps) {


  const highTokenPrice = getTokenPrice('High');
  const highestTokenPrice = getTokenPrice('Highest');

  return (
    <div className="bg-component-card border border-border-dark rounded-lg p-6">
      {/* Token Prices Configuration */}
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-white mb-4">Token Market Prices</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <img 
                src="/images/devil-shop/devil-token-high.png"
                alt="Devil's Token (High)"
                className="w-5 h-5"
                title="Devil's Token (High)"
              />
              Devil's Token (High) - Market Price
            </label>
            <input
              type="number"
              value={highTokenPrice || ''}
              onChange={(e) => setPrice("Devil's Token(High)", Number(e.target.value) || 0)}
              className="w-full bg-theme-dark border border-border-dark rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield]"
              placeholder="Enter High Token price in Alz"
            />
          </div>
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <img 
                src="/images/devil-shop/devil-token-highest.png"
                alt="Devil's Token (Highest)"
                className="w-5 h-5"
                title="Devil's Token (Highest)"
              />
              Devil's Token (Highest) - Market Price
            </label>
            <input
              type="number"
              value={highestTokenPrice || ''}
              onChange={(e) => setPrice("Devil's Token(Highest)", Number(e.target.value) || 0)}
              className="w-full bg-theme-dark border border-border-dark rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield]"
              placeholder="Enter Highest Token price in Alz"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 items-center">
        {/* Search */}
        <div className="flex-1 min-w-64">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">🔍</span>
            <input
              type="text"
              placeholder="Search items..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-theme-dark border border-border-dark rounded-lg pl-10 pr-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
            />
          </div>
        </div>

        {/* Token Type Filter */}
        <select
          value={tokenTypeFilter}
          onChange={(e) => setTokenTypeFilter(e.target.value)}
          className="bg-theme-dark border border-border-dark rounded-lg px-3 py-2 text-white focus:border-blue-500 focus:outline-none"
        >
          <option value="">All Token Types</option>
          <option value="High">High Tokens Only</option>
          <option value="Highest">Highest Tokens Only</option>
        </select>

        {/* Sales Fee */}
        <div className="flex items-center space-x-2">
          <label className="text-sm text-gray-300">Sales Fee:</label>
          <input
            type="number"
            min="0"
            max="100"
            value={salesFee}
            onChange={(e) => setSalesFee(Number(e.target.value))}
            className="w-16 bg-theme-dark border border-border-dark rounded px-2 py-1 text-white text-center focus:border-blue-500 focus:outline-none [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-inner-spin-button]:m-0 [&::-webkit-outer-spin-button]:m-0 [-moz-appearance:textfield]"
          />
          <span className="text-sm text-gray-300">%</span>
        </div>

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