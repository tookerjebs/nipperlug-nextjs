/**
 * Chloe Calculator Header Component
 * Contains the title, description, usage instructions, and documentation
 */

'use client';

import React from 'react';

export default function ChloeCalculatorHeader() {
  return (
    <div className="bg-component-card border border-border-dark rounded-lg p-6">
      <h1 className="text-3xl font-bold mb-6 text-foreground">Chloe Craft Calculator</h1>
      
      {/* Description Section */}
      <div className="space-y-4 text-foreground/80">
        <div>
          <p>
            The Chloe Craft Calculator helps you analyze the profitability of crafting recipes available through 
            Chloe NPCs in Cabal Online. It calculates expected profits, craft costs, and helps you make informed 
            decisions about which recipes are worth investing in.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">How to use</h2>
          <ul className="list-disc list-inside space-y-1 ml-4">
            <li><strong>Set item prices:</strong> Enter current market prices in the "Price Per Piece" column</li>
            <li><strong>Click on rows:</strong> Expand recipes to see detailed ingredient breakdowns</li>
            <li><strong>Use filters:</strong> Search by name, filter by category, or show only profitable recipes</li>
            <li><strong>Sort columns:</strong> Click column headers to sort by profit, cost, or success rate</li>
            <li><strong>Favorite recipes:</strong> Click the ♥ icon to mark recipes for easy access</li>
            <li><strong>Batch calculate:</strong> Use the calculator icon to plan bulk crafting sessions</li>
          </ul>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Understanding the calculations</h2>
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <h3 className="font-semibold text-blue-400 mb-1">Expected Profit</h3>
              <p className="text-sm">
                This is your <em>average</em> profit per craft attempt, accounting for success rate. 
                For example, a recipe with 80% success rate and 1000 Alz profit per success 
                gives 800 Alz expected profit.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-400 mb-1">Profit Margin</h3>
              <p className="text-sm">
                Percentage of revenue that becomes profit. Higher margins mean better returns 
                on your investment, but consider the absolute profit amounts too.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-400 mb-1">Register Cost</h3>
              <p className="text-sm">
                One-time fee to unlock each recipe. "Crafts to Pay Off" shows how many 
                successful crafts you need to recover this investment.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-blue-400 mb-1">Sales Fee</h3>
              <p className="text-sm">
                Market transaction fee (default 5%). This is deducted from your revenue 
                when selling items, affecting your actual profit.
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
                Located in Port Lux (42, 232) near the town center. Chloe offers a wide variety of crafting recipes for consumables, equipment, and materials. 
                Each recipe requires specific ingredients and has different success rates. Higher amity levels unlock access to more advanced and profitable recipes. 
                Successful crafts also provide amity points, creating a progression system for dedicated crafters.
              </p>
              <div className="flex items-center mt-2">
                <span className="text-sm text-foreground/80">💜 Craft recipes for profit and amity</span>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-yellow-900/20 border border-yellow-600/30 rounded-lg p-4">
          <h2 className="text-xl font-semibold text-yellow-400 mb-2">⚠️ Important Notes</h2>
          <ul className="list-disc list-inside space-y-1 ml-4 text-yellow-200">
            <li><strong>RNG is real:</strong> Success rates are averages. You might get unlucky streaks or lucky streaks</li>
            <li><strong>Market prices change:</strong> Update prices regularly as market conditions fluctuate</li>
            <li><strong>Expected ≠ Guaranteed:</strong> Expected profit is statistical average, not guaranteed income</li>
            <li><strong>Consider demand:</strong> High-profit items might be hard to sell if there's no demand</li>
            <li><strong>Factor in time:</strong> Some recipes take longer to craft - consider Alz per hour, not just per craft</li>
          </ul>
        </div>

        <div className="bg-green-900/20 border border-green-600/30 rounded-lg p-4">
          <h2 className="text-xl font-semibold text-green-400 mb-2">💡 Pro Tips</h2>
          <ul className="list-disc list-inside space-y-1 ml-4 text-green-200">
            <li>Start with recipes that have high success rates and reasonable profits</li>
            <li>Use the "Exclude Missing Prices" filter to focus on recipes you can accurately calculate</li>
            <li>Check the "Register Cost" option to see long-term profitability including unlock costs</li>
            <li>Import/export price data to share with guild members or backup your research</li>
            <li>Consider crafting multiple items to diversify risk and market exposure</li>
          </ul>
        </div>
      </div>
    </div>
  );
}