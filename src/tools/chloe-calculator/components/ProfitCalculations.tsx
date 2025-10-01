/**
 * Profit Calculations Utility
 * Contains all calculation logic for recipe metrics and profit analysis
 */

import { ChloeRecipe } from '../data/recipes';
import { formatNumber } from '@/utils/numberFormat';

export interface RecipeMetrics {
  craftCost: number;
  profitPerCraft: number;
  expectedProfit: number;
  profitMargin: number;
  craftsToPayOff: number;
  missingAnyPrice: boolean;
}

export interface BatchMaterial {
  name: string;
  quantity: number;
  price: number;
  total: number;
  stackDisplay: string;
}

export interface BatchResults {
  materials: BatchMaterial[];
  totalCraftingCost: number;
  registerCost: number;
  expectedSuccessfulCrafts: number;
  expectedOutputQuantity: number;
  expectedRevenue: number;
  expectedProfit: number;
  profitMargin: number;
}

export class ProfitCalculations {
  /**
   * Calculate all metrics for a recipe
   */
  static calculateRecipeMetrics(
    recipe: ChloeRecipe,
    getPrice: (name: string) => number | null,
    salesFee: number
  ): RecipeMetrics {
    const outputPrice = getPrice(recipe.name) || 0;
    const craftCost = recipe.ingredients.reduce((total, ingredient) => {
      return total + ((getPrice(ingredient.name) || 0) * ingredient.quantity);
    }, 0);
    
    // Check for missing prices
    const missingOutputPrice = getPrice(recipe.name) === null;
    const missingIngredientPrices = recipe.ingredients.some(ingredient => getPrice(ingredient.name) === null);
    const missingAnyPrice = missingOutputPrice || missingIngredientPrices;
    
    const totalRevenue = outputPrice * recipe.outputQuantity;
    const adjustedRevenue = totalRevenue * (1 - salesFee / 100);
    const expectedRevenue = adjustedRevenue * (recipe.successRate / 100);
    const expectedProfit = expectedRevenue - craftCost;
    const profitPerCraft = adjustedRevenue - craftCost;
    const profitMargin = craftCost > 0 ? (expectedProfit / craftCost) * 100 : 0;
    const craftsToPayOff = recipe.registerCost > 0 && expectedProfit > 0 
      ? Math.ceil(recipe.registerCost / expectedProfit) 
      : 0;

    return {
      craftCost,
      profitPerCraft,
      expectedProfit,
      profitMargin,
      craftsToPayOff,
      missingAnyPrice
    };
  }

  /**
   * Calculate batch materials needed for multiple crafts
   */
  static calculateBatchMaterials(
    recipe: ChloeRecipe,
    batchQuantity: number,
    getPrice: (name: string) => number | null
  ): BatchMaterial[] {
    const materials = new Map<string, { quantity: number; price: number; total: number }>();
    
    recipe.ingredients.forEach(ingredient => {
      const price = getPrice(ingredient.name) || 0;
      const totalQuantity = ingredient.quantity * batchQuantity;
      const total = price * totalQuantity;
      
      materials.set(ingredient.name, {
        quantity: totalQuantity,
        price,
        total
      });
    });
    
    return Array.from(materials.entries()).map(([name, data]) => ({
      name,
      quantity: data.quantity,
      price: data.price,
      total: data.total,
      stackDisplay: this.getStackDisplay(name, data.quantity)
    }));
  }

  /**
   * Calculate comprehensive batch results
   */
  static calculateBatchResults(
    recipe: ChloeRecipe,
    batchQuantity: number,
    getPrice: (name: string) => number | null,
    salesFee: number,
    excludeRegisterCost: boolean = false
  ): BatchResults {
    const materials = this.calculateBatchMaterials(recipe, batchQuantity, getPrice);
    const totalCraftingCost = materials.reduce((sum, m) => sum + m.total, 0);
    const registerCost = excludeRegisterCost ? 0 : recipe.registerCost;
    
    const expectedSuccessfulCrafts = (recipe.successRate / 100) * batchQuantity;
    const expectedOutputQuantity = expectedSuccessfulCrafts * recipe.outputQuantity;
    
    const outputPrice = getPrice(recipe.name) || 0;
    const expectedRevenue = expectedOutputQuantity * outputPrice * (1 - salesFee / 100);
    
    const totalCost = totalCraftingCost + registerCost;
    const expectedProfit = expectedRevenue - totalCost;
    const profitMargin = totalCraftingCost > 0 ? (expectedProfit / totalCraftingCost) * 100 : 0;
    
    return {
      materials,
      totalCraftingCost,
      registerCost,
      expectedSuccessfulCrafts,
      expectedOutputQuantity,
      expectedRevenue,
      expectedProfit,
      profitMargin
    };
  }

  /**
   * Format numbers with dot separation (uses central utility)
   */
  static formatNumber(num: number): string {
    return formatNumber(num);
  }

  /**
   * Get stack display for an item (e.g., "2 stacks + 15")
   */
  static getStackDisplay(itemName: string, quantity: number): string {
    const stackSize = this.getItemStackSize(itemName);
    
    if (stackSize <= 1 || quantity < 1) {
      return '';
    }
    
    const fullStacks = Math.floor(quantity / stackSize);
    const remainingItems = quantity % stackSize;
    
    if (fullStacks === 0) {
      return '';
    }
    
    let display = `${fullStacks} stack${fullStacks > 1 ? 's' : ''}`;
    if (remainingItems > 0) {
      display += ` + ${remainingItems}`;
    }
    
    return display;
  }

  /**
   * Get stack size for an item (default 127 for most items)
   */
  static getItemStackSize(itemName: string): number {
    // Common stackable items with known stack sizes
    const stackSizes: Record<string, number> = {
      'Force Essence': 127,
      'Alz': 1000000000, // Essentially unlimited
      'Honor Token': 127,
      'Chaos Token': 127,
      // Add more specific stack sizes as needed
    };
    
    return stackSizes[itemName] || 127; // Default stack size
  }

  /**
   * Get profit status class based on profit percentage
   */
  static getProfitStatus(profitPct: number): string {
    if (profitPct < 0) return 'profit-negative';
    if (profitPct < 5) return 'profit-low';
    if (profitPct < 15) return 'profit-medium';
    return 'profit-high';
  }

  /**
   * Get icon path for items
   */
  static getIconPath(iconPath: string): string {
    return `/images/items/${iconPath}`;
  }
}