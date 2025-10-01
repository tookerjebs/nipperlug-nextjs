/**
 * Amity Calculator - Main Component
 * Optimized amity path calculator using existing Chloe recipes
 */

'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { CHLOE_RECIPES } from '../../chloe-calculator/data/recipes';
import { usePriceStore } from '@/stores/priceStore';
import { 
  getAmityTiers, 
  calculateOptimalAmityPath, 
  formatAlz, 
  formatNumber 
} from '../utils/amityLogic';
import { AmityCalculationResult, AmityCalculatorState } from '../types';
import AmityTierDisplay from './AmityTierDisplay';
import EnhancedAmityResults from './EnhancedAmityResults';
import AmityControls from './AmityControls';
import ImportPricesModal from './ImportPricesModal';

export default function AmityCalculator() {

  const [calculatorState, setCalculatorState] = useState<AmityCalculatorState>({
    currentAmity: 0,
    targetAmity: 1000,
    optimizationStrategy: 'cheapest',
    excludeRegisterCost: true,
    salesFee: 5
  });
  const [calculationResult, setCalculationResult] = useState<AmityCalculationResult | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [importModal, setImportModal] = useState(false);

  const { getPrice, setPrice, clearAllPrices, hydrate } = usePriceStore();

  useEffect(() => {
    hydrate(); // Load prices from localStorage
  }, [hydrate]);

  // Get amity tiers with recipes
  const amityTiers = useMemo(() => {
    return getAmityTiers(CHLOE_RECIPES);
  }, []);

  // Calculate optimal path
  const calculatePath = useCallback(async () => {
    setIsCalculating(true);
    
    // Small delay to show loading state
    await new Promise(resolve => setTimeout(resolve, 100));
    
    const result = calculateOptimalAmityPath(
      CHLOE_RECIPES,
      calculatorState.currentAmity,
      calculatorState.targetAmity,
      getPrice,
      calculatorState.salesFee,
      calculatorState.excludeRegisterCost,
      calculatorState.optimizationStrategy
    );
    
    setCalculationResult(result);
    setIsCalculating(false);
  }, [calculatorState, getPrice]);

  // Update calculator state
  const updateState = useCallback((updates: Partial<AmityCalculatorState>) => {
    setCalculatorState(prev => ({ ...prev, ...updates }));
  }, []);

  // Handle price input changes
  const handlePriceChange = useCallback((itemName: string, price: number) => {
    setPrice(itemName, price);
  }, [setPrice]);

  // Clear all prices
  const handleClearPrices = useCallback(() => {
    clearAllPrices();
    setCalculationResult(null);
  }, [clearAllPrices]);

  // Import modal handlers
  const openImportModal = useCallback(() => {
    setImportModal(true);
  }, []);

  const closeImportModal = useCallback(() => {
    setImportModal(false);
  }, []);



  return (
    <div className="space-y-6">
        {/* Header */}
        <div className="bg-component-card border border-border-dark rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-6 text-foreground">Amity Calculator</h1>
          
          {/* Description Section */}
          <div className="space-y-4 text-foreground/80">
            <div>
              <p>
                The Amity Calculator helps you find the most efficient path to reach your target amity level 
                using Chloe crafting recipes. It analyzes all available recipes and calculates the optimal 
                combination to minimize costs or maximize profits while gaining amity points.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">How to use</h2>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li><strong>Set your amity levels:</strong> Enter your current amity and target amity</li>
                <li><strong>Enter item prices:</strong> Set market prices for ingredients and final products</li>
                <li><strong>Configure options:</strong> Choose whether to include register costs and sales fees</li>
                <li><strong>Calculate path:</strong> Click "Calculate Optimal Path" to find the best route</li>
                <li><strong>Import prices:</strong> Use the import button to load prices from JSON files</li>
                <li><strong>Browse recipes:</strong> Explore all amity recipes organized by requirement tiers</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-foreground mb-2">Understanding the calculations</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-semibold text-blue-400 mb-1">Strategy Priority</h3>
                  <p className="text-sm">
                    <strong>Cheapest:</strong> Minimizes ALZ cost per amity point.<br/>
                    <strong>Profitable:</strong> Maximizes profit per amity point (or minimizes losses).<br/>
                    <strong>Balanced:</strong> Prioritizes profitable recipes, then cheapest.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-400 mb-1">Failed Crafts</h3>
                  <p className="text-sm">
                    Failed crafts still give full amity points in Cabal Online. Success rate only 
                    affects item production for profit calculations, not amity gain.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-400 mb-1">Register Cost</h3>
                  <p className="text-sm">
                    One-time fee to unlock each recipe. Can be excluded from calculations if you're 
                    only interested in the ongoing crafting costs for amity gain.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-blue-400 mb-1">Sales Fee</h3>
                  <p className="text-sm">
                    Market transaction fee (default 5%) applied to selling prices. This affects 
                    profit calculations but not the amity gain itself.
                  </p>
                </div>
              </div>
            </div>

            {/* Chloe Craft Merchant Section */}
            <div className="mt-6">
              <h2 className="text-xl font-semibold text-foreground mb-4">Chloe Craft Merchant</h2>
              <div className="bg-theme-dark/50 border border-border-dark rounded-lg p-4 flex flex-col md:flex-row items-center gap-4">
                <div className="w-32 h-32 flex-shrink-0 overflow-hidden rounded-lg">
                  <img 
                    src="/images/chloe-craft/craft merchant chloe.png" 
                    alt="Craft Merchant Chloe" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-purple-400">Chloe</h3>
                  <p className="text-sm text-foreground/80 mt-1">
                    Located in Port Lux (42, 232) near the town center. Chloe offers various crafting recipes that provide amity points when completed. 
                    Each recipe requires a one-time registration fee and specific ingredients. Successfully crafting items through Chloe increases your amity level, 
                    unlocking access to more advanced recipes and better rewards.
                  </p>
                  <div className="flex items-center mt-2">
                    <span className="text-sm text-foreground/80">💜 Amity-based crafting system</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Controls */}
        <AmityControls
          state={calculatorState}
          onStateChange={updateState}
          onCalculate={calculatePath}
          onClearPrices={handleClearPrices}
          onImportPrices={openImportModal}
          isCalculating={isCalculating}
        />

        {/* Results */}
        {calculationResult && (
          <EnhancedAmityResults 
            result={calculationResult}
            onPriceChange={handlePriceChange}
            getPrice={getPrice}
            salesFee={calculatorState.salesFee}
          />
        )}

        {/* Amity Tiers */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Amity Tiers & Recipes</h2>
          <p className="text-gray-300 mb-6">
            Browse recipes by amity requirement. Enter prices to enable calculations.
          </p>
          
          <div className="space-y-6">
            {amityTiers.map((tier, index) => (
              <AmityTierDisplay
                key={`${tier.min}-${tier.max}`}
                tier={tier}
                onPriceChange={handlePriceChange}
                getPrice={getPrice}
                isExpanded={index === 0} // First tier expanded by default
              />
            ))}
          </div>
        </div>

        {/* Footer Info */}
        <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-yellow-400 mb-2">⚠️ Important Notes</h2>
          <ul className="list-disc list-inside space-y-1 ml-4 text-yellow-200">
            <li><strong>RNG is real:</strong> Success rates are averages. You might get unlucky streaks or lucky streaks</li>
            <li><strong>Market prices change:</strong> Update prices regularly as market conditions fluctuate</li>
            <li><strong>Failed crafts give amity:</strong> Unlike item production, amity gain is not affected by success rate</li>
            <li><strong>Shared price database:</strong> Prices are shared with Chloe Calculator and Devil Shop Calculator</li>
            <li><strong>Consider demand:</strong> Profitable recipes might be hard to sell if there's no market demand</li>
          </ul>
        </div>

        <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-6">
          <h2 className="text-xl font-semibold text-green-400 mb-2">💡 Pro Tips</h2>
          <ul className="list-disc list-inside space-y-1 ml-4 text-green-200">
            <li>Look for profitable recipes first - you can make money while gaining amity</li>
            <li>Use the "Show only profitable recipes" filter to find money-making opportunities</li>
            <li>Import price data from JSON files to quickly populate all ingredient costs</li>
            <li>Exclude register costs if you're planning long-term amity farming</li>
            <li>Check multiple amity ranges - sometimes higher tiers have better cost/profit ratios</li>
          </ul>
        </div>

        {/* Import Modal */}
        <ImportPricesModal
          isOpen={importModal}
          onClose={closeImportModal}
        />
    </div>
  );
}