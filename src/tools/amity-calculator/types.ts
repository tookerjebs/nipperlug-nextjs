/**
 * Amity Calculator Types
 */

import { ChloeRecipe } from '../chloe-calculator/data/recipes';

export interface AmityTier {
  min: number;
  max: number;
  name: string;
  recipes: ChloeRecipe[];
}

export interface AmityPathStep {
  recipe: ChloeRecipe;
  craftsNeeded: number;
  totalCost: number;
  totalAmityGain: number;
  isProfit: boolean;
  netProfit?: number;
}

export interface AmityCalculationResult {
  success: boolean;
  message?: string;
  totalCost: number;
  totalCrafts: number;
  totalAmityGain: number;
  path: AmityPathStep[];
  currentAmity: number;
  targetAmity: number;
}

export type OptimizationStrategy = 'cheapest' | 'profitable' | 'balanced';

export interface AmityCalculatorState {
  currentAmity: number;
  targetAmity: number;
  optimizationStrategy: OptimizationStrategy;
  excludeRegisterCost: boolean;
  salesFee: number;
}

export interface ShoppingListItem {
  name: string;
  totalQuantity: number;
  pricePerUnit: number | null;
  totalCost: number | null;
  iconPath?: string;
  stacks?: number;
}

export interface FinancialSummary {
  totalCapitalNeeded: number;
  totalPotentialRevenue: number;
  netResult: number;
  isOverallProfitable: boolean;
  missingPrices: string[];
}