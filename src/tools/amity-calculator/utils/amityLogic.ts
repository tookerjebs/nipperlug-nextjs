/**
 * Amity Calculator Logic
 * Optimized calculation logic for finding the most efficient amity path
 */

import { ChloeRecipe } from '../../chloe-calculator/data/recipes';
import { AmityTier, AmityPathStep, AmityCalculationResult, OptimizationStrategy, ShoppingListItem, FinancialSummary } from '../types';

/**
 * Get amity tiers with recipes that give amity points
 */
export function getAmityTiers(recipes: ChloeRecipe[]): AmityTier[] {
  const tiers: AmityTier[] = [
    { min: 0, max: 999, name: "0 - 999 Amity", recipes: [] },
    { min: 1000, max: 1999, name: "1,000 - 1,999 Amity", recipes: [] },
    { min: 2000, max: 2999, name: "2,000 - 2,999 Amity", recipes: [] },
    { min: 3000, max: 3999, name: "3,000 - 3,999 Amity", recipes: [] },
    { min: 4000, max: 4999, name: "4,000 - 4,999 Amity", recipes: [] },
    { min: 5000, max: 5999, name: "5,000 - 5,999 Amity", recipes: [] },
    { min: 6000, max: 6999, name: "6,000 - 6,999 Amity", recipes: [] },
    { min: 7000, max: 7999, name: "7,000 - 7,999 Amity", recipes: [] },
    { min: 8000, max: 8999, name: "8,000 - 8,999 Amity", recipes: [] },
    { min: 9000, max: 10000, name: "9,000+ Amity", recipes: [] }
  ];

  // Filter recipes that give amity points and organize by tier
  const amityRecipes = recipes.filter(recipe => 
    recipe.obtainedAmity && recipe.obtainedAmity > 0
  );

  amityRecipes.forEach(recipe => {
    const requiredAmity = recipe.requiredAmity || 0;
    const tier = tiers.find(t => requiredAmity >= t.min && requiredAmity <= t.max);
    if (tier) {
      tier.recipes.push(recipe);
    }
  });

  return tiers.filter(tier => tier.recipes.length > 0);
}

/**
 * Get the tier range for a recipe based on its required amity
 * Recipes give amity within their tier boundaries (0-999, 1000-1999, etc.)
 */
export function getRecipeTierRange(recipe: ChloeRecipe): { min: number; max: number } | null {
  const requiredAmity = recipe.requiredAmity || 0;
  
  // Define tier ranges based on required amity
  const tiers = [
    { min: 0, max: 999 },
    { min: 1000, max: 1999 },
    { min: 2000, max: 2999 },
    { min: 3000, max: 3999 },
    { min: 4000, max: 4999 },
    { min: 5000, max: 5999 },
    { min: 6000, max: 6999 },
    { min: 7000, max: 7999 },
    { min: 8000, max: 8999 },
    { min: 9000, max: 10000 }
  ];
  
  return tiers.find(tier => requiredAmity >= tier.min && requiredAmity <= tier.max) || null;
}

/**
 * Check if a recipe gives amity at the current amity level
 */
export function recipeGivesAmityAtLevel(recipe: ChloeRecipe, currentAmity: number): boolean {
  const requiredAmity = recipe.requiredAmity || 0;
  const obtainedAmity = recipe.obtainedAmity || 0;
  
  // Recipe must give amity points
  if (obtainedAmity <= 0) return false;
  
  // Recipe must be accessible (current amity >= required amity)
  if (currentAmity < requiredAmity) return false;
  
  // Recipe only gives amity if current amity is within its tier range
  const tierRange = getRecipeTierRange(recipe);
  if (!tierRange) return false;
  
  return currentAmity >= tierRange.min && currentAmity <= tierRange.max;
}

/**
 * Get available recipes for current amity level that actually give amity
 */
export function getAvailableRecipes(
  recipes: ChloeRecipe[], 
  currentAmity: number
): ChloeRecipe[] {
  return recipes.filter(recipe => recipeGivesAmityAtLevel(recipe, currentAmity));
}

/**
 * Calculate recipe costs and profits for amity gain
 */
export function calculateRecipeEfficiency(
  recipe: ChloeRecipe,
  getPrice: (itemName: string) => number | null,
  salesFee: number = 5,
  excludeRegisterCost: boolean = true
): {
  totalCost: number; // Per-craft cost (excluding register cost)
  totalRevenue: number;
  netProfit: number;
  isProfit: boolean;
  registerCost: number; // One-time register cost
  missingPrices: string[];
} {
  const missingPrices: string[] = [];
  let totalIngredientCost = 0;

  // Calculate ingredient costs
  if (recipe.ingredients) {
    for (const ingredient of recipe.ingredients) {
      const price = getPrice(ingredient.name);
      if (price === null || price <= 0) {
        missingPrices.push(ingredient.name);
      } else {
        totalIngredientCost += price * ingredient.quantity;
      }
    }
  }

  // If missing prices, return invalid values
  if (missingPrices.length > 0) {
    return {
      totalCost: Infinity,
      totalRevenue: 0,
      netProfit: -Infinity,
      isProfit: false,
      registerCost: excludeRegisterCost ? 0 : (recipe.registerCost || 0),
      missingPrices
    };
  }

  // Calculate revenue
  const sellingPrice = getPrice(recipe.name) || 0;
  const outputQuantity = recipe.outputQuantity || 1;
  const successRate = (recipe.successRate || 80) / 100;
  const expectedOutput = outputQuantity * successRate;
  const grossRevenue = sellingPrice * expectedOutput;
  const netRevenue = grossRevenue * (1 - salesFee / 100);

  // Calculate costs
  const registerCost = excludeRegisterCost ? 0 : (recipe.registerCost || 0);
  const perCraftCost = totalIngredientCost; // Cost per individual craft (no register cost)
  const netProfitPerCraft = netRevenue - perCraftCost; // Profit per craft (excluding register cost)
  const isProfit = netProfitPerCraft > 0;

  return {
    totalCost: perCraftCost, // Per-craft cost (excluding register cost)
    totalRevenue: netRevenue,
    netProfit: netProfitPerCraft,
    isProfit,
    registerCost,
    missingPrices: []
  };
}

/**
 * Calculate optimal amity path
 */
export function calculateOptimalAmityPath(
  recipes: ChloeRecipe[],
  currentAmity: number,
  targetAmity: number,
  getPrice: (itemName: string) => number | null,
  salesFee: number = 5,
  excludeRegisterCost: boolean = true,
  optimizationStrategy: OptimizationStrategy = 'cheapest'
): AmityCalculationResult {
  if (currentAmity >= targetAmity) {
    return {
      success: false,
      message: "Current amity is already at or above target amity",
      totalCost: 0,
      totalCrafts: 0,
      totalAmityGain: 0,
      path: [],
      currentAmity,
      targetAmity
    };
  }

  const path: AmityPathStep[] = [];
  let remainingAmity = targetAmity - currentAmity;
  let totalCost = 0;
  let totalCrafts = 0;
  let workingAmity = currentAmity;
  const usedRecipes = new Set<string>(); // Track recipes for register cost

  while (remainingAmity > 0) {
    // Get available recipes for current amity level
    const availableRecipes = getAvailableRecipes(recipes, workingAmity);
    
    if (availableRecipes.length === 0) {
      return {
        success: false,
        message: `No recipes available at amity level ${workingAmity}`,
        totalCost,
        totalCrafts,
        totalAmityGain: targetAmity - currentAmity - remainingAmity,
        path,
        currentAmity,
        targetAmity
      };
    }

    // Calculate costs and profits for each available recipe
    const recipeEfficiencies = availableRecipes
      .map(recipe => ({
        recipe,
        ...calculateRecipeEfficiency(recipe, getPrice, salesFee, excludeRegisterCost)
      }))
      .filter(item => {
        // Filter out recipes with missing prices
        if (item.missingPrices.length > 0) return false;
        
        // All recipes with valid prices are considered for all strategies
        return true;
      })
      .sort((a, b) => {
        // Sort based on optimization strategy
        const amityGainA = a.recipe.obtainedAmity || 1;
        const amityGainB = b.recipe.obtainedAmity || 1;
        
        switch (optimizationStrategy) {
          case 'cheapest':
            // Prioritize lowest cost per amity point
            const costPerAmityA = a.totalCost / amityGainA;
            const costPerAmityB = b.totalCost / amityGainB;
            return costPerAmityA - costPerAmityB;
          case 'profitable':
            // Prioritize highest profit per amity point (minimizes losses if no profit possible)
            const profitPerAmityA = a.netProfit / amityGainA;
            const profitPerAmityB = b.netProfit / amityGainB;
            return profitPerAmityB - profitPerAmityA;
          case 'balanced':
            // Balance between cost and profit - prioritize profitable recipes, then cheapest
            if (a.isProfit && !b.isProfit) return -1;
            if (!a.isProfit && b.isProfit) return 1;
            if (a.isProfit && b.isProfit) {
              // Both profitable: prioritize higher profit per amity
              const profitPerAmityA = a.netProfit / amityGainA;
              const profitPerAmityB = b.netProfit / amityGainB;
              return profitPerAmityB - profitPerAmityA;
            } else {
              // Both cost: prioritize lower cost per amity
              const costPerAmityA = a.totalCost / amityGainA;
              const costPerAmityB = b.totalCost / amityGainB;
              return costPerAmityA - costPerAmityB;
            }
          default:
            // Default to cheapest
            const defaultCostPerAmityA = a.totalCost / amityGainA;
            const defaultCostPerAmityB = b.totalCost / amityGainB;
            return defaultCostPerAmityA - defaultCostPerAmityB;
        }
      });

    if (recipeEfficiencies.length === 0) {
      const missingIngredients = new Set<string>();
      availableRecipes.forEach(recipe => {
        if (recipe.ingredients) {
          recipe.ingredients.forEach(ingredient => {
            if (!getPrice(ingredient.name)) {
              missingIngredients.add(ingredient.name);
            }
          });
        }
      });

      return {
        success: false,
        message: `Calculation stopped at amity level ${workingAmity}. Set prices for these ingredients to continue: ${Array.from(missingIngredients).join(', ')}`,
        totalCost,
        totalCrafts,
        totalAmityGain: targetAmity - currentAmity - remainingAmity,
        path,
        currentAmity,
        targetAmity
      };
    }

    // Use the most efficient recipe
    const bestRecipe = recipeEfficiencies[0];
    const amityGain = bestRecipe.recipe.obtainedAmity || 0;
    
    // Calculate how much we can craft with this recipe
    const tierRange = getRecipeTierRange(bestRecipe.recipe);
    const maxAmityInTier = tierRange ? tierRange.max : targetAmity;
    
    // Smart look-ahead: find the next recipe that would actually be better
    const currentCostPerAmity = bestRecipe.totalCost / amityGain;
    const currentProfitPerAmity = bestRecipe.netProfit / amityGain;

    let nextBetterRecipeAmity: number | null = null;
    
    // Look for better recipes that unlock later in this tier or early next tier
    const maxLookAhead = Math.min(targetAmity, maxAmityInTier + 1000); // Look into next tier too
    
    for (const recipe of recipes) {
      const recipeRequiredAmity = recipe.requiredAmity || 0;
      const recipeObtainedAmity = recipe.obtainedAmity || 0;
      
      // Skip if not an amity recipe or already available
      if (recipeObtainedAmity <= 0 || recipeRequiredAmity <= workingAmity) continue;
      
      // Skip if too far ahead
      if (recipeRequiredAmity > maxLookAhead) continue;
      
      // Check if this recipe would actually be better
      const recipeData = calculateRecipeEfficiency(recipe, getPrice, salesFee, excludeRegisterCost);
      
      // Skip if missing prices
      if (recipeData.missingPrices.length > 0) continue;
      
      // Calculate metrics for comparison
      const newCostPerAmity = recipeData.totalCost / recipeObtainedAmity;
      const newProfitPerAmity = recipeData.netProfit / recipeObtainedAmity;
      
      // Check if significantly better (at least 10% improvement)
      let isBetter = false;
      if (optimizationStrategy === 'cheapest') {
        // For cheapest: lower cost per amity is better
        isBetter = newCostPerAmity < currentCostPerAmity * 0.9;
      } else if (optimizationStrategy === 'profitable') {
        // For profitable: higher profit per amity is better
        isBetter = newProfitPerAmity > currentProfitPerAmity * 1.1;
      } else {
        // For balanced: consider both profit and cost
        if (recipeData.isProfit && !bestRecipe.isProfit) {
          isBetter = true; // Any profit is better than loss
        } else if (recipeData.isProfit && bestRecipe.isProfit) {
          isBetter = newProfitPerAmity > currentProfitPerAmity * 1.1;
        } else if (!recipeData.isProfit && !bestRecipe.isProfit) {
          isBetter = newCostPerAmity < currentCostPerAmity * 0.9;
        }
      }
      
      if (isBetter) {
        if (nextBetterRecipeAmity === null || recipeRequiredAmity < nextBetterRecipeAmity) {
          nextBetterRecipeAmity = recipeRequiredAmity;
        }
      }
    }
    
    // Determine how much to craft
    let maxAmityToReach = Math.min(targetAmity, maxAmityInTier);
    
    // If there's a better recipe coming up, stop just before it unlocks
    if (nextBetterRecipeAmity !== null && nextBetterRecipeAmity <= maxAmityToReach) {
      maxAmityToReach = nextBetterRecipeAmity;
    }
    
    const maxAmityGain = Math.max(0, maxAmityToReach - workingAmity);
    const maxCraftsByAmity = Math.ceil(Math.min(remainingAmity, maxAmityGain) / amityGain);
    
    // Craft as much as possible (but at least 1)
    const actualCrafts = Math.max(1, maxCraftsByAmity);
    const stepAmityGain = Math.min(amityGain * actualCrafts, remainingAmity);
    
    // Calculate costs
    const stepCost = bestRecipe.totalCost * actualCrafts; // Per-craft cost * number of crafts
    const registerCost = (excludeRegisterCost || usedRecipes.has(bestRecipe.recipe.name)) 
      ? 0 
      : bestRecipe.registerCost; // One-time register cost from recipe data
    const totalStepCost = stepCost + registerCost;
    
    // Track this recipe as used
    usedRecipes.add(bestRecipe.recipe.name);

    path.push({
      recipe: bestRecipe.recipe,
      craftsNeeded: actualCrafts,
      totalCost: totalStepCost,
      totalAmityGain: stepAmityGain,
      isProfit: bestRecipe.isProfit,
      netProfit: bestRecipe.isProfit ? bestRecipe.netProfit * actualCrafts : undefined
    });

    totalCost += totalStepCost;
    totalCrafts += actualCrafts;
    remainingAmity -= stepAmityGain;
    workingAmity += stepAmityGain;

    // Safety check to prevent infinite loops
    if (path.length > 50) {
      return {
        success: false,
        message: "Calculation exceeded maximum steps (possible infinite loop)",
        totalCost,
        totalCrafts,
        totalAmityGain: targetAmity - currentAmity - remainingAmity,
        path,
        currentAmity,
        targetAmity
      };
    }
  }

  return {
    success: true,
    totalCost,
    totalCrafts,
    totalAmityGain: targetAmity - currentAmity,
    path,
    currentAmity,
    targetAmity
  };
}

/**
 * Format number with dot separators (uses central utility)
 */
export function formatNumber(num: number): string {
  // Re-export from central utility for backwards compatibility
  const rounded = Math.round(num);
  return rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

/**
 * Format ALZ currency (uses central utility)
 */
export function formatAlz(amount: number): string {
  // Re-export from central utility for backwards compatibility
  const rounded = Math.round(amount);
  const formatted = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${formatted} ALZ`;
}

/**
 * Get icon path for items
 */
export function getIconPath(iconPath: string): string {
  return `/images/items/${iconPath}`;
}

/**
 * Generate shopping list from calculation result
 */
export function generateShoppingList(
  result: AmityCalculationResult,
  getPrice: (itemName: string) => number | null
): ShoppingListItem[] {
  const ingredientMap = new Map<string, number>();

  // Aggregate ingredients from all steps
  result.path.forEach(step => {
    if (step.recipe.ingredients) {
      step.recipe.ingredients.forEach(ingredient => {
        const totalNeeded = ingredient.quantity * step.craftsNeeded;
        const existing = ingredientMap.get(ingredient.name);
        
        if (existing) {
          ingredientMap.set(ingredient.name, existing + totalNeeded);
        } else {
          ingredientMap.set(ingredient.name, totalNeeded);
        }
      });
    }
  });

  // Convert to shopping list items (no icons for ingredients)
  return Array.from(ingredientMap.entries()).map(([name, quantity]) => {
    const pricePerUnit = getPrice(name);
    const stacks = quantity >= 127 ? parseFloat((quantity / 127).toFixed(2)) : undefined;
    return {
      name,
      totalQuantity: quantity,
      pricePerUnit,
      totalCost: pricePerUnit ? pricePerUnit * quantity : null,
      iconPath: undefined, // Ingredients don't have icons
      stacks
    };
  }).sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Calculate financial summary from calculation result
 */
export function calculateFinancialSummary(
  result: AmityCalculationResult,
  getPrice: (itemName: string) => number | null,
  salesFee: number = 5
): FinancialSummary {
  let totalCapitalNeeded = 0;
  let totalPotentialRevenue = 0;
  const missingPrices: string[] = [];

  // Calculate capital needed (ingredient costs)
  result.path.forEach(step => {
    if (step.recipe.ingredients) {
      step.recipe.ingredients.forEach(ingredient => {
        const price = getPrice(ingredient.name);
        if (price === null || price <= 0) {
          if (!missingPrices.includes(ingredient.name)) {
            missingPrices.push(ingredient.name);
          }
        } else {
          totalCapitalNeeded += price * ingredient.quantity * step.craftsNeeded;
        }
      });
    }
  });

  // Calculate potential revenue (selling crafted items)
  result.path.forEach(step => {
    const sellingPrice = getPrice(step.recipe.name);
    if (sellingPrice && sellingPrice > 0) {
      const outputQuantity = step.recipe.outputQuantity || 1;
      const successRate = (step.recipe.successRate || 80) / 100;
      const expectedOutput = step.craftsNeeded * successRate * outputQuantity;
      const revenueAfterFees = expectedOutput * sellingPrice * (1 - salesFee / 100);
      totalPotentialRevenue += revenueAfterFees;
    } else {
      if (!missingPrices.includes(step.recipe.name)) {
        missingPrices.push(step.recipe.name);
      }
    }
  });

  const netResult = totalPotentialRevenue - totalCapitalNeeded;
  const isOverallProfitable = netResult > 0;

  return {
    totalCapitalNeeded,
    totalPotentialRevenue,
    netResult,
    isOverallProfitable,
    missingPrices
  };
}