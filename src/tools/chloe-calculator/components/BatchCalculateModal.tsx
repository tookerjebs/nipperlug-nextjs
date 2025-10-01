/**
 * Batch Calculate Modal Component
 * Modal for calculating materials needed for batch crafting with full analysis
 */

'use client';

import React, { useState } from 'react';
import { ChloeRecipe } from '../data/recipes';
import { ProfitCalculations, BatchResults } from './ProfitCalculations';
import PriceInput from './PriceInput';

interface BatchCalculateModalProps {
  isOpen: boolean;
  recipe: ChloeRecipe | null;
  batchQuantity: number;
  setBatchQuantity: (value: number) => void;
  excludeRegisterCost: boolean;
  setExcludeRegisterCost: (value: boolean) => void;
  getPrice: (name: string) => number | null;
  salesFee: number;
  onClose: () => void;
}

export default function BatchCalculateModal({
  isOpen,
  recipe,
  batchQuantity,
  setBatchQuantity,
  excludeRegisterCost,
  setExcludeRegisterCost,
  getPrice,
  salesFee,
  onClose
}: BatchCalculateModalProps) {
  const [batchResults, setBatchResults] = useState<BatchResults | null>(null);

  const handleCalculate = () => {
    if (!recipe) return;
    const results = ProfitCalculations.calculateBatchResults(
      recipe,
      batchQuantity,
      getPrice,
      salesFee,
      excludeRegisterCost
    );
    setBatchResults(results);
  };

  const handleClose = () => {
    setBatchResults(null);
    onClose();
  };

  // Auto-calculate when modal opens or values change
  React.useEffect(() => {
    if (isOpen && recipe) {
      handleCalculate();
    }
  }, [isOpen, recipe, batchQuantity, excludeRegisterCost]);

  const profitStatusClass = batchResults ? ProfitCalculations.getProfitStatus(batchResults.profitMargin) : '';

  if (!isOpen || !recipe) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-theme-darker border border-border-dark rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">🛒 Shopping List: {recipe.recipe}</h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>
        
        <div className="space-y-4">
          {/* Input Controls */}
          <div className="flex items-center space-x-6 bg-theme-dark rounded-lg p-4">
            <div className="flex items-center space-x-2">
              <label className="text-sm text-gray-300">Number of Crafts:</label>
              <PriceInput
                value={batchQuantity}
                onChange={(value) => setBatchQuantity(value || 1)}
                variant="compact"
                className="w-20"
              />
            </div>
            
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={excludeRegisterCost}
                onChange={(e) => setExcludeRegisterCost(e.target.checked)}
                className="rounded"
              />
              <span className="text-sm text-gray-300">Exclude register cost (recipe already unlocked)</span>
            </label>
          </div>

          {/* Results Section */}
          {batchResults && (
            <div className="space-y-6">
              {/* Shopping List */}
              <div className="bg-theme-dark rounded-lg p-4">
                <h4 className="font-medium mb-3 flex items-center">
                  🛒 Shopping List
                  <span className="ml-2 text-sm text-gray-400">({batchQuantity} crafts)</span>
                </h4>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-700">
                        <th className="text-left py-2 text-gray-300">Item</th>
                        <th className="text-right py-2 text-gray-300">Quantity Needed</th>
                        <th className="text-right py-2 text-gray-300">Price per unit</th>
                        <th className="text-right py-2 text-gray-300">Total Cost</th>
                      </tr>
                    </thead>
                    <tbody>
                      {batchResults.materials.map((material, index) => (
                        <tr key={`batch-material-${index}`} className="border-b border-gray-700 hover:bg-theme-light/20">
                          <td className="py-3 text-white font-medium">{material.name}</td>
                          <td className="py-3 text-right text-blue-400 font-bold text-lg">
                            {ProfitCalculations.formatNumber(material.quantity)}
                          </td>
                          <td className="py-3 text-right text-gray-300">
                            {ProfitCalculations.formatNumber(material.price)} Alz
                          </td>
                          <td className="py-3 text-right text-yellow-400 font-medium">
                            {ProfitCalculations.formatNumber(material.total)} Alz
                          </td>
                        </tr>
                      ))}
                      <tr className="border-t-2 border-gray-600 bg-theme-light/10">
                        <td className="py-3 text-white font-bold">TOTAL SHOPPING COST</td>
                        <td className="py-3"></td>
                        <td className="py-3"></td>
                        <td className="py-3 text-right text-yellow-400 font-bold text-lg">
                          {ProfitCalculations.formatNumber(batchResults.totalCraftingCost)} Alz
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Fun Stats for Nerds */}
              <div className="bg-theme-dark rounded-lg p-4">
                <h4 className="font-medium mb-3 flex items-center">
                  Statistics
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Success Rate:</span>
                      <span className="text-blue-400 font-medium">{recipe.successRate}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Expected Output:</span>
                      <span className="text-green-400 font-medium">
                        {batchResults.expectedOutputQuantity.toFixed(1)} items
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Potential Failures:</span>
                      <span className="text-red-400 font-medium">
                        {(batchQuantity - batchResults.expectedOutputQuantity).toFixed(1)} crafts
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-300">Register Cost:</span>
                      <span className="text-yellow-400 font-medium">
                        {ProfitCalculations.formatNumber(batchResults.registerCost)} Alz 
                        <span className="text-gray-500 ml-1 text-xs">
                          {excludeRegisterCost ? '(excluded)' : '(included)'}
                        </span>
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-300">Expected Revenue:</span>
                      <span className="text-green-400 font-medium">{ProfitCalculations.formatNumber(batchResults.expectedRevenue)} Alz</span>
                    </div>
                    
                    <div className={`flex justify-between ${profitStatusClass === 'profit-negative' ? 'text-red-400' : 
                                                          profitStatusClass === 'profit-low' ? 'text-yellow-400' :
                                                          profitStatusClass === 'profit-medium' ? 'text-blue-400' : 'text-green-400'}`}>
                      <span className="text-gray-300">Expected Profit:</span>
                      <span className="font-bold">{ProfitCalculations.formatNumber(batchResults.expectedProfit)} Alz</span>
                    </div>
                    
                    <div className={`flex justify-between ${profitStatusClass === 'profit-negative' ? 'text-red-400' : 
                                                          profitStatusClass === 'profit-low' ? 'text-yellow-400' :
                                                          profitStatusClass === 'profit-medium' ? 'text-blue-400' : 'text-green-400'}`}>
                      <span className="text-gray-300">Profit Margin:</span>
                      <span className="font-bold">{batchResults.profitMargin.toFixed(2)}%</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-300">Cost per Success:</span>
                      <span className="text-purple-400 font-medium">
                        {ProfitCalculations.formatNumber(Math.round(batchResults.totalCraftingCost / batchResults.expectedOutputQuantity))} Alz
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}