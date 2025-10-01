/**
 * Enhanced Amity Results Display
 * Shows calculation results with shopping list and financial summary
 */

'use client';

import React, { useState, useMemo } from 'react';
import { AmityCalculationResult } from '../types';
import { 
  formatAlz, 
  formatNumber, 
  getIconPath, 
  generateShoppingList, 
  calculateFinancialSummary 
} from '../utils/amityLogic';

interface EnhancedAmityResultsProps {
  result: AmityCalculationResult;
  onPriceChange: (itemName: string, price: number) => void;
  getPrice: (itemName: string) => number | null;
  salesFee: number;
}

export default function EnhancedAmityResults({
  result,
  onPriceChange,
  getPrice,
  salesFee
}: EnhancedAmityResultsProps) {
  const [activeTab, setActiveTab] = useState<'summary' | 'path' | 'shopping' | 'financial'>('summary');

  // Calculate amity ranges for each step
  const pathWithRanges = useMemo(() => {
    let currentAmity = result.currentAmity;
    return result.path.map((step, index) => {
      const startAmity = currentAmity;
      const endAmity = currentAmity + step.totalAmityGain;
      currentAmity = endAmity;
      return {
        ...step,
        stepNumber: index + 1,
        amityRange: `${formatNumber(startAmity)} - ${formatNumber(endAmity)}`,
        startAmity,
        endAmity
      };
    });
  }, [result]);

  const shoppingList = useMemo(() => 
    generateShoppingList(result, getPrice), 
    [result, getPrice]
  );

  const financialSummary = useMemo(() => 
    calculateFinancialSummary(result, getPrice, salesFee), 
    [result, getPrice, salesFee]
  );

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

  const copyShoppingList = () => {
    const listText = shoppingList
      .map(item => `${item.name}: ${formatNumber(item.totalQuantity)}${item.pricePerUnit ? ` (${formatAlz(item.totalCost || 0)})` : ' (no price set)'}`)
      .join('\n');
    
    navigator.clipboard.writeText(`Shopping List for ${formatNumber(result.totalAmityGain)} Amity:\n\n${listText}`);
  };

  return (
    <div className="bg-component-card border border-border-dark rounded-lg overflow-hidden">
      {/* Header with Tabs */}
      <div className="border-b border-gray-700">
        <div className="flex flex-wrap">
          {[
            { key: 'summary', label: '📊 Summary', count: null },
            { key: 'path', label: '🛤️ Path', count: result.path.length },
            { key: 'shopping', label: '🛒 Shopping List', count: shoppingList.length },
            { key: 'financial', label: '💰 Financial', count: null }
          ].map(tab => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                activeTab === tab.key
                  ? 'border-blue-500 text-blue-400 bg-blue-500/10'
                  : 'border-transparent text-gray-400 hover:text-gray-300 hover:bg-theme-dark'
              }`}
            >
              {tab.label}
              {tab.count !== null && (
                <span className="ml-1 px-2 py-0.5 text-xs bg-theme-darker rounded-full">
                  {tab.count}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6">
        {/* Summary Tab */}
        {activeTab === 'summary' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">🎯 Your Optimal Path</h2>
              <div className={`px-3 py-1 rounded-full text-sm font-medium ${
                financialSummary.isOverallProfitable 
                  ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                  : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
              }`}>
                {financialSummary.isOverallProfitable ? '💰 Profitable' : '📊 Cost-based'}
              </div>
            </div>
            
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-gradient-to-br from-blue-500/10 to-blue-600/5 border border-blue-500/20 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm text-blue-300">🎯 Amity Gained</div>
                </div>
                <div className="text-2xl font-bold text-blue-400">
                  {formatNumber(result.totalAmityGain)}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {result.currentAmity} → {result.currentAmity + result.totalAmityGain}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-500/10 to-purple-600/5 border border-purple-500/20 p-4 rounded-lg">
                <div className="text-sm text-purple-300 mb-2">⚒️ Total Crafts</div>
                <div className="text-2xl font-bold text-white">
                  {formatNumber(result.totalCrafts)}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Crafting attempts needed
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-yellow-500/10 to-yellow-600/5 border border-yellow-500/20 p-4 rounded-lg">
                <div className="text-sm text-yellow-300 mb-2">💸 Capital Needed</div>
                <div className="text-2xl font-bold text-yellow-400">
                  {formatAlz(financialSummary.totalCapitalNeeded)}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  Money to buy ingredients
                </div>
              </div>
              
              <div className={`bg-gradient-to-br p-4 rounded-lg border ${
                financialSummary.isOverallProfitable 
                  ? 'from-green-500/10 to-green-600/5 border-green-500/20' 
                  : 'from-red-500/10 to-red-600/5 border-red-500/20'
              }`}>
                <div className={`text-sm mb-2 ${
                  financialSummary.isOverallProfitable ? 'text-green-300' : 'text-red-300'
                }`}>
                  {financialSummary.isOverallProfitable ? '📈 Net Profit' : '📉 Net Cost'}
                </div>
                <div className={`text-2xl font-bold ${
                  financialSummary.isOverallProfitable ? 'text-green-400' : 'text-red-400'
                }`}>
                  {financialSummary.isOverallProfitable ? '+' : ''}{formatAlz(financialSummary.netResult)}
                </div>
                <div className="text-xs text-gray-400 mt-1">
                  {financialSummary.isOverallProfitable ? 'You make money!' : 'Investment for amity'}
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex flex-wrap gap-3">
              <button
                onClick={copyShoppingList}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md transition-colors"
              >
                Copy Shopping List
              </button>
              <button
                onClick={() => setActiveTab('shopping')}
                className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white text-sm rounded-md transition-colors"
              >
                View Shopping List ({shoppingList.length} items)
              </button>
              <button
                onClick={() => setActiveTab('path')}
                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white text-sm rounded-md transition-colors"
              >
                View Crafting Path ({result.path.length} steps)
              </button>
            </div>

            {/* Warnings */}
            {financialSummary.missingPrices.length > 0 && (
              <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4">
                <h3 className="text-yellow-400 font-medium mb-2">Missing Prices</h3>
                <p className="text-yellow-200 text-sm mb-2">
                  Set prices for these items to get accurate financial calculations:
                </p>
                <div className="flex flex-wrap gap-2">
                  {financialSummary.missingPrices.map(item => (
                    <span key={item} className="px-2 py-1 bg-yellow-600/20 text-yellow-300 text-xs rounded">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* Shopping List Tab */}
        {activeTab === 'shopping' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Shopping List</h2>
              <button
                onClick={copyShoppingList}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded transition-colors"
              >
                Copy List
              </button>
            </div>

            {shoppingList.length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="bg-theme-darker border-b border-gray-700">
                      <th className="text-left p-3 text-sm font-medium text-gray-300">Item</th>
                      <th className="text-center p-3 text-sm font-medium text-gray-300">Quantity</th>
                      <th className="text-center p-3 text-sm font-medium text-gray-300">Stacks (÷127)</th>
                      <th className="text-center p-3 text-sm font-medium text-gray-300">Price per Unit</th>
                      <th className="text-center p-3 text-sm font-medium text-gray-300">Total Cost</th>
                    </tr>
                  </thead>
                  <tbody>
                    {shoppingList.map((item, index) => (
                      <tr key={index} className="border-b border-gray-700 hover:bg-theme-darker/50">
                        {/* Item */}
                        <td className="p-3">
                          <div className="font-medium text-white">
                            {item.name}
                          </div>
                        </td>
                        
                        {/* Quantity */}
                        <td className="p-3 text-center">
                          <div className="text-white font-medium">
                            {formatNumber(item.totalQuantity)}
                          </div>
                        </td>
                        
                        {/* Stacks */}
                        <td className="p-3 text-center">
                          {item.stacks ? (
                            <div className="text-blue-400 font-medium">
                              {item.stacks % 1 === 0 ? item.stacks.toString() : item.stacks.toFixed(2)}
                            </div>
                          ) : (
                            <div className="text-gray-500 text-sm">
                              -
                            </div>
                          )}
                        </td>
                        
                        {/* Price per Unit */}
                        <td className="p-3 text-center">
                          {item.pricePerUnit ? (
                            <div className="text-yellow-400 font-medium">
                              {formatAlz(item.pricePerUnit)}
                            </div>
                          ) : (
                            <div className="text-gray-500 text-sm">
                              No price set
                            </div>
                          )}
                        </td>
                        
                        {/* Total Cost */}
                        <td className="p-3 text-center">
                          {item.totalCost ? (
                            <div className="text-red-400 font-medium">
                              {formatAlz(item.totalCost)}
                            </div>
                          ) : (
                            <div className="text-gray-500 text-sm">
                              -
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="bg-theme-darker border-t-2 border-gray-700">
                      <td className="p-3 font-medium text-gray-300">Total</td>
                      <td className="p-3 text-center font-medium text-blue-400">
                        {formatNumber(shoppingList.reduce((sum, item) => sum + item.totalQuantity, 0))} items
                      </td>
                      <td className="p-3 text-center text-gray-500">-</td>
                      <td className="p-3 text-center text-gray-500">-</td>
                      <td className="p-3 text-center font-medium text-red-400">
                        {formatAlz(shoppingList.reduce((sum, item) => sum + (item.totalCost || 0), 0))}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            ) : (
              <div className="text-center py-8 text-gray-400">
                No ingredients needed for this path.
              </div>
            )}
          </div>
        )}

        {/* Financial Tab */}
        {activeTab === 'financial' && (
          <div className="space-y-6">
            <h2 className="text-xl font-semibold">Financial Analysis</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-component-panel p-6 rounded-lg">
                <h3 className="text-lg font-medium text-red-400 mb-3">💸 Capital Required</h3>
                <div className="text-2xl font-bold text-white mb-2">
                  {formatAlz(financialSummary.totalCapitalNeeded)}
                </div>
                <p className="text-sm text-gray-400">
                  Money needed to buy all ingredients
                </p>
              </div>

              <div className="bg-component-panel p-6 rounded-lg">
                <h3 className="text-lg font-medium text-green-400 mb-3">💰 Potential Revenue</h3>
                <div className="text-2xl font-bold text-white mb-2">
                  {formatAlz(financialSummary.totalPotentialRevenue)}
                </div>
                <p className="text-sm text-gray-400">
                  Expected income from selling crafted items
                </p>
              </div>

              <div className="bg-component-panel p-6 rounded-lg">
                <h3 className={`text-lg font-medium mb-3 ${
                  financialSummary.isOverallProfitable ? 'text-green-400' : 'text-red-400'
                }`}>
                  {financialSummary.isOverallProfitable ? '📈 Net Profit' : '📉 Net Loss'}
                </h3>
                <div className={`text-2xl font-bold mb-2 ${
                  financialSummary.isOverallProfitable ? 'text-green-400' : 'text-red-400'
                }`}>
                  {financialSummary.isOverallProfitable ? '+' : ''}{formatAlz(financialSummary.netResult)}
                </div>
                <p className="text-sm text-gray-400">
                  {financialSummary.isOverallProfitable 
                    ? 'You\'ll make money while gaining amity!' 
                    : 'This path costs money but gains amity'
                  }
                </p>
              </div>
            </div>

            <div className="bg-blue-900/20 border border-blue-600/30 rounded-lg p-4">
              <h3 className="text-blue-400 font-medium mb-2">💡 Financial Notes</h3>
              <ul className="text-blue-200 text-sm space-y-1">
                <li>• Revenue calculations include success rates and sales fees ({salesFee}%)</li>
                <li>• Failed crafts still give full amity points</li>
                <li>• Consider market demand when planning to sell items</li>
                <li>• Prices may fluctuate - update regularly for accuracy</li>
              </ul>
            </div>
          </div>
        )}

        {/* Path Tab */}
        {activeTab === 'path' && (
          <div className="space-y-4">
            <h2 className="text-xl font-semibold">🛤️ Crafting Path Details</h2>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-theme-darker border-b border-gray-700">
                    <th className="text-left p-3 text-sm font-medium text-gray-300">Step</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-300">Amity Range</th>
                    <th className="text-left p-3 text-sm font-medium text-gray-300">Recipe</th>
                    <th className="text-center p-3 text-sm font-medium text-gray-300">Crafts</th>
                    <th className="text-center p-3 text-sm font-medium text-gray-300">Amity Gain</th>
                    <th className="text-center p-3 text-sm font-medium text-gray-300">Cost</th>
                    <th className="text-center p-3 text-sm font-medium text-gray-300">Revenue</th>
                  </tr>
                </thead>
                <tbody>
                  {pathWithRanges.map((step, index) => {
                    // Calculate potential revenue for this step
                    const sellingPrice = getPrice(step.recipe.name) || 0;
                    const outputQuantity = step.recipe.outputQuantity || 1;
                    const successRate = (step.recipe.successRate || 80) / 100;
                    const expectedOutput = step.craftsNeeded * successRate * outputQuantity;
                    const grossRevenue = expectedOutput * sellingPrice;
                    const netRevenue = grossRevenue * (1 - salesFee / 100);
                    
                    return (
                      <tr key={index} className="border-b border-gray-700 hover:bg-theme-darker/50">
                        {/* Step Number */}
                        <td className="p-3">
                          <span className="inline-flex items-center justify-center w-8 h-8 bg-blue-600 text-white text-sm font-medium rounded-full">
                            {step.stepNumber}
                          </span>
                        </td>
                        
                        {/* Amity Range */}
                        <td className="p-3">
                          <div className="text-sm text-blue-400 font-medium">
                            {step.amityRange}
                          </div>
                          <div className="text-xs text-gray-500">
                            +{formatNumber(step.totalAmityGain)} amity
                          </div>
                        </td>
                        
                        {/* Recipe */}
                        <td className="p-3">
                          <div className="flex items-center gap-3">
                            <img 
                              src={getIconPath(step.recipe.iconPath)} 
                              alt={step.recipe.recipe}
                              className="w-8 h-8 object-contain flex-shrink-0"
                              onError={(e) => {
                                e.currentTarget.style.display = 'none';
                              }}
                            />
                            <div>
                              <div className="font-medium text-white text-sm">
                                {step.recipe.recipe}
                              </div>
                              {step.isProfit && (
                                <span className="inline-block mt-1 text-xs bg-green-600 text-white px-2 py-0.5 rounded">
                                  PROFIT
                                </span>
                              )}
                            </div>
                          </div>
                        </td>
                        
                        {/* Crafts */}
                        <td className="p-3 text-center">
                          <div className="text-white font-medium">
                            {formatNumber(step.craftsNeeded)}
                          </div>
                        </td>
                        
                        {/* Amity Gain */}
                        <td className="p-3 text-center">
                          <div className="text-blue-400 font-medium">
                            +{formatNumber(step.totalAmityGain)}
                          </div>
                        </td>
                        
                        {/* Cost */}
                        <td className="p-3 text-center">
                          <div className="text-red-400 font-medium">
                            -{formatAlz(step.totalCost)}
                          </div>
                        </td>
                        
                        {/* Revenue */}
                        <td className="p-3 text-center">
                          {sellingPrice > 0 ? (
                            <div className="text-green-400 font-medium">
                              +{formatAlz(netRevenue)}
                            </div>
                          ) : (
                            <div className="text-gray-500 text-sm">
                              No price set
                            </div>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}