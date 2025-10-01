/**
 * Amity Calculator Controls
 * Input controls for amity calculation parameters
 */

'use client';

import React from 'react';
import { AmityCalculatorState, OptimizationStrategy } from '../types';
import { formatNumber } from '../utils/amityLogic';

interface AmityControlsProps {
  state: AmityCalculatorState;
  onStateChange: (updates: Partial<AmityCalculatorState>) => void;
  onCalculate: () => void;
  onClearPrices: () => void;
  onImportPrices: () => void;
  isCalculating: boolean;
}

export default function AmityControls({
  state,
  onStateChange,
  onCalculate,
  onClearPrices,
  onImportPrices,
  isCalculating
}: AmityControlsProps) {
  return (
    <div className="bg-component-card border border-border-dark rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Find Your Optimal Amity Path</h2>
        <div className="text-sm text-gray-400">
          {state.currentAmity < state.targetAmity ? 
            `${formatNumber(state.targetAmity - state.currentAmity)} amity needed` : 
            'Target reached!'
          }
        </div>
      </div>
      
      {/* Primary Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Current Amity */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Current Amity
          </label>
          <input
            type="number"
            min="0"
            max="9000"
            value={state.currentAmity}
            onChange={(e) => onStateChange({ currentAmity: parseInt(e.target.value) || 0 })}
            className="w-full px-3 py-2 bg-theme-darker border border-border-dark rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
        </div>

        {/* Target Amity */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Target Amity
          </label>
          <input
            type="number"
            min="1"
            max="9000"
            value={state.targetAmity}
            onChange={(e) => onStateChange({ targetAmity: parseInt(e.target.value) || 1000 })}
            className="w-full px-3 py-2 bg-theme-darker border border-border-dark rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="1000"
          />
        </div>
      </div>

      {/* Strategy Selection - More Prominent */}
      <div className="mb-6 p-4 bg-blue-900/10 border border-blue-500/20 rounded-lg">
        <label className="block text-lg font-medium text-blue-300 mb-4">
          Choose Your Strategy
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            {
              value: 'cheapest' as OptimizationStrategy,
              title: 'Cheapest',
              description: 'Lowest cost, fastest start',
              color: 'green'
            },
            {
              value: 'profitable' as OptimizationStrategy,
              title: 'Profitable',
              description: 'Make money while gaining amity',
              color: 'blue'
            }
          ].map((strategy) => (
            <label
              key={strategy.value}
              className={`cursor-pointer p-3 rounded-lg border-2 transition-all ${
                state.optimizationStrategy === strategy.value
                  ? strategy.value === 'cheapest' ? 'border-green-500 bg-green-500/20 shadow-lg' :
                    strategy.value === 'profitable' ? 'border-blue-500 bg-blue-500/20 shadow-lg' :
                    'border-purple-500 bg-purple-500/20 shadow-lg'
                  : 'border-border-dark bg-component-panel hover:border-gray-500 hover:bg-theme-dark'
              }`}
            >
              <input
                type="radio"
                name="strategy"
                value={strategy.value}
                checked={state.optimizationStrategy === strategy.value}
                onChange={(e) => onStateChange({ optimizationStrategy: e.target.value as OptimizationStrategy })}
                className="sr-only"
              />
              <div className="text-sm font-medium text-white mb-1">{strategy.title}</div>
              <div className="text-xs text-gray-400">{strategy.description}</div>
            </label>
          ))}
        </div>
      </div>

      {/* Advanced Settings */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Sales Fee */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Sales Fee (%)
          </label>
          <input
            type="number"
            min="0"
            max="20"
            step="0.1"
            value={state.salesFee}
            onChange={(e) => onStateChange({ salesFee: parseFloat(e.target.value) || 5 })}
            className="w-full px-3 py-2 bg-theme-darker border border-border-dark rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="5"
          />
          <p className="text-xs text-gray-400 mt-1">Market transaction fee when selling crafted items</p>
        </div>

        {/* Register Cost Toggle */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Recipe Costs
          </label>
          <label className="flex items-center p-3 bg-theme-darker rounded-md">
            <input
              type="checkbox"
              checked={state.excludeRegisterCost}
              onChange={(e) => onStateChange({ excludeRegisterCost: e.target.checked })}
              className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-border-dark rounded bg-theme-darker"
            />
            <div>
              <span className="text-gray-300 text-sm">Exclude register costs</span>
              <p className="text-xs text-gray-400">Recommended for amity-only calculations</p>
            </div>
          </label>
        </div>
      </div>



      {/* Action Buttons */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <button
          onClick={onCalculate}
          disabled={isCalculating || state.currentAmity >= state.targetAmity}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:hover:bg-gray-600 disabled:cursor-not-allowed text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
        >
          {isCalculating ? (
            <span className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Finding optimal path...
            </span>
          ) : (
            "Calculate My Path"
          )}
        </button>

        <button
          onClick={onImportPrices}
          className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
          title="Import prices from JSON file"
        >
          Import Prices
        </button>

        <button
          onClick={onClearPrices}
          className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white font-semibold rounded-lg transition-colors shadow-lg hover:shadow-xl"
          title="Clear all entered prices"
        >
          Clear Prices
        </button>
      </div>

      {/* Quick Presets */}
      <div className="mt-6">
        <h3 className="text-sm font-medium text-gray-300 mb-3">Quick Presets:</h3>
        <div className="flex flex-wrap gap-2">
          {[
            { label: '0 → 1K', current: 0, target: 1000 },
            { label: '0 → 2K', current: 0, target: 2000 },
            { label: '0 → 5K', current: 0, target: 5000 },
            { label: '0 → 9K', current: 0, target: 9000 },
            { label: '5K → 9K', current: 5000, target: 9000 }
          ].map((preset) => (
            <button
              key={preset.label}
              onClick={() => onStateChange({ 
                currentAmity: preset.current, 
                targetAmity: preset.target 
              })}
              className="px-3 py-1 text-sm bg-theme-darker hover:bg-theme-dark border border-border-dark text-gray-300 rounded transition-colors"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}