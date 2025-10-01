/**
 * Amity Tier Display
 * Shows recipes organized by amity requirement tiers
 */

'use client';

import React, { useState } from 'react';
import { AmityTier } from '../types';
import { formatAlz, formatNumber, getIconPath } from '../utils/amityLogic';

interface AmityTierDisplayProps {
  tier: AmityTier;
  onPriceChange: (itemName: string, price: number) => void;
  getPrice: (itemName: string) => number | null;
  isExpanded?: boolean;
}

export default function AmityTierDisplay({
  tier,
  onPriceChange,
  getPrice,
  isExpanded = false
}: AmityTierDisplayProps) {
  const [expanded, setExpanded] = useState(isExpanded);
  const [expandedIngredients, setExpandedIngredients] = useState<Set<number>>(new Set());

  const toggleIngredients = (recipeIndex: number) => {
    const newExpanded = new Set(expandedIngredients);
    if (newExpanded.has(recipeIndex)) {
      newExpanded.delete(recipeIndex);
    } else {
      newExpanded.add(recipeIndex);
    }
    setExpandedIngredients(newExpanded);
  };

  return (
    <div className="bg-component-card border border-border-dark rounded-lg overflow-hidden">
      {/* Tier Header */}
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full px-6 py-4 text-left bg-component-panel hover:bg-theme-dark transition-colors flex items-center justify-between"
      >
        <div>
          <h3 className="text-lg font-semibold text-white">{tier.name}</h3>
          <p className="text-sm text-gray-300">
            {tier.recipes.length} recipe{tier.recipes.length !== 1 ? 's' : ''} available
          </p>
        </div>
        <div className="text-gray-400">
          {expanded ? '▼' : '▶'}
        </div>
      </button>

      {/* Tier Content */}
      {expanded && (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-theme-dark border-b border-gray-700">
              <tr>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Recipe</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">Amity</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">Success</th>
                <th className="px-4 py-3 text-center text-sm font-medium text-gray-300">Selling Price</th>
                <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Ingredients</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-dark">
              {tier.recipes.map((recipe, index) => (
                <tr key={index} className="hover:bg-theme-dark/50 transition-colors">
                  {/* Recipe Column */}
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3">
                      <img 
                        src={getIconPath(recipe.iconPath)} 
                        alt={recipe.name}
                        className="w-8 h-8 object-contain flex-shrink-0"
                        onError={(e) => {
                          e.currentTarget.style.display = 'none';
                        }}
                      />
                      <div className="min-w-0">
                        <div className="font-medium text-white truncate">
                          {recipe.outputQuantity || 1} × {recipe.name}
                        </div>
                        <div className="text-xs text-gray-400">
                          Req: {formatNumber(recipe.requiredAmity || 0)}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Amity Column */}
                  <td className="px-4 py-3 text-center">
                    <div className="text-blue-400 font-medium">
                      +{formatNumber(recipe.obtainedAmity || 0)}
                    </div>
                  </td>

                  {/* Success Rate Column */}
                  <td className="px-4 py-3 text-center">
                    <div className="text-green-400 text-sm">
                      {recipe.successRate || 80}%
                    </div>
                  </td>

                  {/* Price Column */}
                  <td className="px-4 py-3">
                    <input
                      type="number"
                      min="0"
                      value={getPrice(recipe.name) || ''}
                      onChange={(e) => onPriceChange(recipe.name, parseInt(e.target.value) || 0)}
                      placeholder="Price"
                      className="w-20 px-2 py-1 bg-theme-darker border border-border-dark rounded text-white text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 text-center"
                    />
                  </td>

                  {/* Ingredients Column */}
                  <td className="px-4 py-3">
                    {recipe.ingredients && recipe.ingredients.length > 0 ? (
                      <div className="space-y-1">
                        {/* Show first 2 ingredients or all if expanded */}
                        {(expandedIngredients.has(index) ? recipe.ingredients : recipe.ingredients.slice(0, 2)).map((ingredient, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs">
                            <span className="text-gray-300 truncate mr-2">
                              {ingredient.name} ×{ingredient.quantity}
                            </span>
                            <input
                              type="number"
                              min="0"
                              value={getPrice(ingredient.name) || ''}
                              onChange={(e) => onPriceChange(ingredient.name, parseInt(e.target.value) || 0)}
                              placeholder="0"
                              className="w-16 px-1 py-0.5 bg-theme-darkest border border-border-dark rounded text-white text-xs focus:outline-none focus:ring-1 focus:ring-blue-500"
                            />
                          </div>
                        ))}
                        {/* Show expand/collapse button if more than 2 ingredients */}
                        {recipe.ingredients.length > 2 && (
                          <button
                            onClick={() => toggleIngredients(index)}
                            className="text-xs text-blue-400 hover:text-blue-300 transition-colors cursor-pointer"
                          >
                            {expandedIngredients.has(index) 
                              ? 'Show less' 
                              : `+${recipe.ingredients.length - 2} more...`
                            }
                          </button>
                        )}
                      </div>
                    ) : (
                      <span className="text-gray-500 text-xs">No ingredients</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}