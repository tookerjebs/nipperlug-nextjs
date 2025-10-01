/**
 * Amity Path Results Display
 * Shows the calculated optimal path to reach target amity
 */

'use client';

import React from 'react';
import { AmityCalculationResult } from '../types';
import { formatAlz, formatNumber } from '../utils/amityLogic';

interface AmityPathResultsProps {
  result: AmityCalculationResult;
  onPriceChange: (itemName: string, price: number) => void;
  getPrice: (itemName: string) => number | null;
}

export default function AmityPathResults({
  result,
  onPriceChange,
  getPrice
}: AmityPathResultsProps) {
  if (!result.success) {
    return (
      <div className="bg-red-900/20 border border-red-500/30 p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-red-400 mb-3">Calculation Failed</h2>
        <p className="text-red-300">{result.message}</p>
        
        {result.path.length > 0 && (
          <div className="mt-4">
            <p className="text-gray-300 text-sm">
              Partial progress: {formatNumber(result.totalAmityGain)} amity gained in {result.totalCrafts} crafts
            </p>
          </div>
        )}
      </div>
    );
  }

  const totalProfit = result.path.reduce((sum, step) => 
    sum + (step.netProfit || 0), 0
  );
  const isProfitableOverall = totalProfit > 0;

  return (
    <div className="bg-component-card border border-border-dark rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-6">Optimal Amity Path</h2>
      
      {/* Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-component-panel p-4 rounded-lg">
          <div className="text-sm text-gray-400">Total Cost</div>
          <div className={`text-lg font-semibold ${isProfitableOverall ? 'text-green-400' : 'text-white'}`}>
            {isProfitableOverall ? `+${formatAlz(Math.abs(totalProfit))}` : formatAlz(result.totalCost)}
          </div>
        </div>
        
        <div className="bg-component-panel p-4 rounded-lg">
          <div className="text-sm text-gray-400">Total Crafts</div>
          <div className="text-lg font-semibold text-white">
            {formatNumber(result.totalCrafts)}
          </div>
        </div>
        
        <div className="bg-component-panel p-4 rounded-lg">
          <div className="text-sm text-gray-400">Amity Gained</div>
          <div className="text-lg font-semibold text-blue-400">
            {formatNumber(result.totalAmityGain)}
          </div>
        </div>
        
        <div className="bg-component-panel p-4 rounded-lg">
          <div className="text-sm text-gray-400">Final Amity</div>
          <div className="text-lg font-semibold text-green-400">
            {formatNumber(result.currentAmity + result.totalAmityGain)}
          </div>
        </div>
      </div>

      {/* Path Steps */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">Crafting Steps:</h3>
        
        {result.path.map((step, index) => (
          <div key={index} className="bg-component-panel p-4 rounded-lg">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Recipe Info */}
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="text-sm bg-blue-600 text-white px-2 py-1 rounded">
                    Step {index + 1}
                  </span>
                  <h4 className="font-medium text-white">{step.recipe.name}</h4>
                  {step.isProfit && (
                    <span className="text-xs bg-green-600 text-white px-2 py-1 rounded">
                      PROFIT
                    </span>
                  )}
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                  <div>
                    <span className="text-gray-400">Crafts:</span>
                    <span className="ml-2 text-white">{formatNumber(step.craftsNeeded)}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Amity:</span>
                    <span className="ml-2 text-blue-400">+{formatNumber(step.totalAmityGain)}</span>
                  </div>
                  <div>
                    <span className="text-gray-400">Cost:</span>
                    <span className={`ml-2 ${step.isProfit ? 'text-green-400' : 'text-white'}`}>
                      {step.isProfit ? `+${formatAlz(step.netProfit || 0)}` : formatAlz(step.totalCost)}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-400">Per Amity:</span>
                    <span className="ml-2 text-yellow-400">
                      {step.isProfit 
                        ? `+${formatAlz((step.netProfit || 0) / step.totalAmityGain)}`
                        : formatAlz(step.totalCost / step.totalAmityGain)
                      }
                    </span>
                  </div>
                </div>
              </div>

              {/* Price Inputs */}
              <div className="lg:w-64">
                <div className="text-sm text-gray-400 mb-2">Selling Price:</div>
                <input
                  type="number"
                  min="0"
                  value={getPrice(step.recipe.name) || ''}
                  onChange={(e) => onPriceChange(step.recipe.name, parseInt(e.target.value) || 0)}
                  placeholder="Enter price"
                  className="w-full px-3 py-1 bg-theme-darker border border-border-dark rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Ingredients */}
            {step.recipe.ingredients && step.recipe.ingredients.length > 0 && (
              <div className="mt-4 pt-4 border-t border-gray-700">
                <div className="text-sm text-gray-400 mb-2">Ingredients per craft:</div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {step.recipe.ingredients.map((ingredient, idx) => (
                    <div key={idx} className="flex items-center justify-between bg-theme-darker p-2 rounded">
                      <span className="text-sm text-white">
                        {ingredient.name} ×{ingredient.quantity}
                      </span>
                      <input
                        type="number"
                        min="0"
                        value={getPrice(ingredient.name) || ''}
                        onChange={(e) => onPriceChange(ingredient.name, parseInt(e.target.value) || 0)}
                        placeholder="Price"
                        className="w-20 px-2 py-1 bg-theme-darkest border border-border-dark rounded text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Additional Info */}
      <div className="mt-6 p-4 bg-component-panel rounded-lg">
        <h4 className="font-medium text-white mb-2">Notes:</h4>
        <ul className="text-sm text-gray-300 space-y-1">
          <li>• Failed crafts still give full amity points</li>
          <li>• Success rate only affects item production for profit calculations</li>
          <li>• Register costs are {result.path.some(s => s.recipe.registerCost) ? 'included' : 'excluded'} in this calculation</li>
          {isProfitableOverall && (
            <li className="text-green-400">• This path is profitable overall! You'll make money while gaining amity.</li>
          )}
        </ul>
      </div>
    </div>
  );
}