/**
 * Shopping List Modal Component
 * Shows what ingredients to buy for a specific number of crafts
 */

'use client';

import React from 'react';
import { ChloeRecipe } from '../data/recipes';
import { ProfitCalculations } from './ProfitCalculations';

interface ShoppingListModalProps {
  recipe: ChloeRecipe;
  craftQuantity: number;
  getPrice: (name: string) => number | null;
  onClose: () => void;
}

export default function ShoppingListModal({
  recipe,
  craftQuantity,
  getPrice,
  onClose
}: ShoppingListModalProps) {
  
  // Calculate total ingredients needed
  const shoppingList = recipe.ingredients.map(ingredient => {
    const totalNeeded = ingredient.quantity * craftQuantity;
    const unitPrice = getPrice(ingredient.name);
    const totalCost = unitPrice ? unitPrice * totalNeeded : null;
    
    return {
      name: ingredient.name,
      unitQuantity: ingredient.quantity,
      totalNeeded,
      unitPrice,
      totalCost,
      hasPrice: unitPrice !== null
    };
  });

  const totalShoppingCost = shoppingList.reduce((sum, item) => {
    return sum + (item.totalCost || 0);
  }, 0);

  const missingPrices = shoppingList.filter(item => !item.hasPrice);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-theme-darker border border-border-dark rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-border-dark">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold text-white">Shopping List</h2>
              <p className="text-gray-300 text-sm mt-1">
                Ingredients needed for <span className="text-blue-400 font-medium">{craftQuantity}</span> crafts of{' '}
                <span className="text-green-400 font-medium">{recipe.recipe}</span>
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white text-2xl font-bold"
            >
              ×
            </button>
          </div>
        </div>

        {/* Shopping List Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {/* Shopping List Table */}
          <div className="bg-theme-dark/30 rounded-lg border border-border-dark overflow-hidden">
            <table className="w-full">
              <thead className="bg-theme-dark border-b border-border-dark">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold text-gray-300">Item</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-300">Per Craft</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-300">Total Needed</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-300">Unit Price</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold text-gray-300">Total Cost</th>
                </tr>
              </thead>
              <tbody>
                {shoppingList.map((item, index) => (
                  <tr 
                    key={index} 
                    className={`border-b border-gray-700/50 hover:bg-theme-light/20 transition-colors ${
                      !item.hasPrice ? 'bg-red-900/10' : ''
                    }`}
                  >
                    {/* Item Name */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className={`w-2 h-2 rounded-full flex-shrink-0 ${
                          item.hasPrice ? 'bg-green-400' : 'bg-red-400'
                        }`} />
                        <span className="text-white font-medium">{item.name}</span>
                      </div>
                    </td>

                    {/* Per Craft */}
                    <td className="px-4 py-3 text-center">
                      <span className="text-blue-300 font-medium">{item.unitQuantity}</span>
                    </td>

                    {/* Total Needed */}
                    <td className="px-4 py-3 text-center">
                      <div className="text-white font-bold">
                        {item.totalNeeded}
                      </div>
                    </td>

                    {/* Unit Price */}
                    <td className="px-4 py-3 text-center">
                      {item.hasPrice ? (
                        <span className="text-gray-300">
                          {ProfitCalculations.formatNumber(item.unitPrice!)}
                        </span>
                      ) : (
                        <span className="text-red-400 text-sm font-medium">No price</span>
                      )}
                    </td>

                    {/* Total Cost */}
                    <td className="px-4 py-3 text-center">
                      {item.hasPrice ? (
                        <span className="text-green-400 font-bold">
                          {ProfitCalculations.formatNumber(item.totalCost!)}
                        </span>
                      ) : (
                        <span className="text-red-400 text-sm">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Summary */}
          <div className="mt-6 bg-theme-dark/50 rounded-lg p-4 border border-border-dark">
            <div className="text-white mb-3">
              <div className="font-medium mb-2">You need to buy:</div>
              {shoppingList.map((item, index) => (
                <div key={index} className="ml-2 mb-1">
                  {item.name} × {item.totalNeeded}
                  {item.totalNeeded > 127 && (
                    <span className="text-gray-400"> (/127 = {(item.totalNeeded / 127).toFixed(2)})</span>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex justify-between items-center text-lg border-t border-gray-600/30 pt-3">
              <span>Total Cost:</span>
              <span className="font-bold text-green-400">
                {ProfitCalculations.formatNumber(totalShoppingCost)}
              </span>
            </div>
            
            {missingPrices.length > 0 && (
              <div className="mt-2 text-sm text-yellow-400">
                ⚠️ {missingPrices.length} items missing prices
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border-dark">
          <div className="flex justify-end gap-3">
            <button
              onClick={() => {
                const listText = shoppingList.map(item => {
                  const baseText = `${item.name}: ${item.totalNeeded}`;
                  const stackInfo = item.totalNeeded > 127 ? ` (/127 = ${(item.totalNeeded / 127).toFixed(2)})` : '';
                  return baseText + stackInfo;
                }).join('\n');
                const summaryText = `Shopping List - ${craftQuantity} × ${recipe.recipe}\n\n${listText}\n\nTotal Cost: ${ProfitCalculations.formatNumber(totalShoppingCost)}`;
                navigator.clipboard.writeText(summaryText);
              }}
              className="px-3 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm"
            >
              Copy List
            </button>
            <button
              onClick={onClose}
              className="px-3 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}