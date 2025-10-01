/**
 * Probability Statistics for Extreme Upgrade Calculator
 * Calculates confidence intervals and probability distributions for upgrade costs
 */

/**
 * Calculate the probability of success within N attempts using binomial distribution
 * P(success within N attempts) = 1 - (1 - p)^N
 */
export function probabilityOfSuccessWithinAttempts(successRate: number, attempts: number): number {
  if (successRate <= 0) return 0;
  if (successRate >= 1) return attempts >= 1 ? 1 : 0;
  return 1 - Math.pow(1 - successRate, attempts);
}

/**
 * Calculate the number of attempts needed for a given confidence level
 * Uses inverse of geometric distribution: N = ln(1 - confidence) / ln(1 - p)
 */
export function attemptsForConfidence(successRate: number, confidence: number): number {
  if (successRate <= 0) return Infinity;
  if (successRate >= 1) return 1;
  if (confidence <= 0) return 0;
  if (confidence >= 1) return Infinity;
  
  return Math.ceil(Math.log(1 - confidence) / Math.log(1 - successRate));
}

/**
 * Calculate cost statistics for different confidence levels
 */
export interface CostStatistics {
  expectedCost: number;
  expectedAttempts: number;
  confidence50: { attempts: number; cost: number };
  confidence75: { attempts: number; cost: number };
  confidence90: { attempts: number; cost: number };
  confidence95: { attempts: number; cost: number };
  confidence99: { attempts: number; cost: number };
}

export function calculateCostStatistics(
  successRate: number, 
  costPerAttempt: number, 
  hasResetOutcome: boolean = false
): CostStatistics {
  // Simple calculation for all servers
  const rawExpectedAttempts = successRate > 0 ? 1 / successRate : Infinity;
  // Round to 1 decimal place for consistency with display
  const expectedAttempts = rawExpectedAttempts === Infinity ? Infinity : Math.round(rawExpectedAttempts * 10) / 10;
  const expectedCost = expectedAttempts * costPerAttempt;

  if (hasResetOutcome) {
    // For reset servers, only show basic expected values
    // Don't show confidence intervals as they're too complex with reset mechanics
    return {
      expectedCost,
      expectedAttempts,
      confidence50: { attempts: 0, cost: 0 },
      confidence75: { attempts: 0, cost: 0 },
      confidence90: { attempts: 0, cost: 0 },
      confidence95: { attempts: 0, cost: 0 },
      confidence99: { attempts: 0, cost: 0 }
    };
  }

  // For non-reset servers, show full confidence intervals
  const confidence50 = attemptsForConfidence(successRate, 0.50);
  const confidence75 = attemptsForConfidence(successRate, 0.75);
  const confidence90 = attemptsForConfidence(successRate, 0.90);
  const confidence95 = attemptsForConfidence(successRate, 0.95);
  const confidence99 = attemptsForConfidence(successRate, 0.99);

  return {
    expectedCost,
    expectedAttempts,
    confidence50: { attempts: confidence50, cost: confidence50 * costPerAttempt },
    confidence75: { attempts: confidence75, cost: confidence75 * costPerAttempt },
    confidence90: { attempts: confidence90, cost: confidence90 * costPerAttempt },
    confidence95: { attempts: confidence95, cost: confidence95 * costPerAttempt },
    confidence99: { attempts: confidence99, cost: confidence99 * costPerAttempt }
  };
}

/**
 * Calculate probability distribution for number of attempts
 * Returns array of {attempts, probability, cumulativeProbability}
 */
export interface AttemptProbability {
  attempts: number;
  probability: number;
  cumulativeProbability: number;
  cost: number;
}

export function calculateAttemptDistribution(
  successRate: number, 
  costPerAttempt: number, 
  maxAttempts: number = 50
): AttemptProbability[] {
  const distribution: AttemptProbability[] = [];
  let cumulativeProbability = 0;

  for (let attempts = 1; attempts <= maxAttempts; attempts++) {
    // Probability of success on exactly the Nth attempt
    // P(success on attempt N) = (1-p)^(N-1) * p
    const probability = Math.pow(1 - successRate, attempts - 1) * successRate;
    cumulativeProbability += probability;
    
    distribution.push({
      attempts,
      probability,
      cumulativeProbability,
      cost: attempts * costPerAttempt
    });

    // Stop if we've covered 99.9% of the probability space
    if (cumulativeProbability > 0.999) break;
  }

  return distribution;
}

/**
 * Calculate aggregate statistics for multiple levels
 */
export interface MultiLevelStats {
  totalExpectedCost: number;
  totalExpectedAttempts: number;
  confidence95Cost: number;
  confidence99Cost: number;
  confidence95Attempts: number;
  confidence99Attempts: number;
  confidence95Breaks: number;
  confidence99Breaks: number;
  confidence95CoresByLevel: Record<number, number>;
  confidence99CoresByLevel: Record<number, number>;
  expectedBreaks: number;
  expectedResets: number;
  worstCaseScenario: {
    description: string;
    cost: number;
    probability: number;
  };
}

export function calculateMultiLevelStatistics(
  levels: Array<{ 
    successRate: number; 
    costPerAttempt: number; 
    level: number;
    hasResetOutcome: boolean;
    cores?: Array<number | null>;
  }>
): MultiLevelStats {
  if (levels.length === 0) {
    return {
      totalExpectedCost: 0,
      totalExpectedAttempts: 0,
      confidence95Cost: 0,
      confidence99Cost: 0,
      confidence95Attempts: 0,
      confidence99Attempts: 0,
      confidence95Breaks: 0,
      confidence99Breaks: 0,
      confidence95CoresByLevel: {},
      confidence99CoresByLevel: {},
      expectedBreaks: 0,
      expectedResets: 0,
      worstCaseScenario: {
        description: 'No levels to calculate',
        cost: 0,
        probability: 0
      }
    };
  }

  // Simple calculation for all servers (no complex reset modeling)
  let totalExpectedCost = 0;
  let totalExpectedAttempts = 0;
  let total95Cost = 0;
  let total99Cost = 0;
  let total95Attempts = 0;
  let total99Attempts = 0;
  let total95Breaks = 0;
  let total99Breaks = 0;
  let totalExpectedBreaks = 0;
  let totalExpectedResets = 0;
  
  const confidence95CoresByLevel: Record<number, number> = {};
  const confidence99CoresByLevel: Record<number, number> = {};

  for (const level of levels) {
    const rawExpectedAttempts = level.successRate > 0 ? 1 / level.successRate : Infinity;
    // Round to 1 decimal place for consistency with display
    const expectedAttempts = rawExpectedAttempts === Infinity ? Infinity : Math.round(rawExpectedAttempts * 10) / 10;
    const expectedCost = expectedAttempts * level.costPerAttempt;
    
    totalExpectedAttempts += expectedAttempts;
    totalExpectedCost += expectedCost;
    
    if (level.hasResetOutcome) {
      // For reset servers, split failures between breaks and resets
      const failureRate = 1 - level.successRate;
      const breakRate = failureRate * 0.5;
      const resetRate = failureRate * 0.5;
      
      totalExpectedBreaks += breakRate * expectedAttempts;
      totalExpectedResets += resetRate * expectedAttempts;
      
      // Don't show confidence intervals for reset servers
      // They're too complex and misleading
    } else {
      // All failures are breaks on non-reset servers
      const failureRate = 1 - level.successRate;
      totalExpectedBreaks += failureRate * expectedAttempts;
      
      // Confidence intervals for non-reset servers
      const attempts95 = attemptsForConfidence(level.successRate, 0.95);
      const attempts99 = attemptsForConfidence(level.successRate, 0.99);
      total95Cost += attempts95 * level.costPerAttempt;
      total99Cost += attempts99 * level.costPerAttempt;
      total95Attempts += attempts95;
      total99Attempts += attempts99;
      
      // Calculate maximum breaks for confidence intervals
      // Maximum breaks = attempts - 1 (worst case: fail all attempts except the last one)
      total95Breaks += Math.max(0, attempts95 - 1);
      total99Breaks += Math.max(0, attempts99 - 1);
      
      // Calculate cores needed for confidence intervals
      // Cores are consumed on every attempt (success, break, or reset)
      if (level.cores) {
        level.cores.forEach(coreLevel => {
          if (coreLevel) {
            confidence95CoresByLevel[coreLevel] = (confidence95CoresByLevel[coreLevel] || 0) + attempts95;
            confidence99CoresByLevel[coreLevel] = (confidence99CoresByLevel[coreLevel] || 0) + attempts99;
          }
        });
      }
    }
  }

  return {
    totalExpectedCost,
    totalExpectedAttempts,
    confidence95Cost: total95Cost,
    confidence99Cost: total99Cost,
    confidence95Attempts: total95Attempts,
    confidence99Attempts: total99Attempts,
    confidence95Breaks: total95Breaks,
    confidence99Breaks: total99Breaks,
    confidence95CoresByLevel,
    confidence99CoresByLevel,
    expectedBreaks: totalExpectedBreaks,
    expectedResets: totalExpectedResets,
    worstCaseScenario: {
      description: 'All levels require 5x expected attempts',
      cost: totalExpectedCost * 5,
      probability: Math.pow(0.2, levels.length)
    }
  };
}

/**
 * Format confidence level as percentage
 */
export function formatConfidence(confidence: number): string {
  return `${(confidence * 100).toFixed(0)}%`;
}

/**
 * Get risk level description based on success rate
 */
export function getRiskLevel(successRate: number): {
  level: 'low' | 'medium' | 'high' | 'extreme';
  description: string;
  color: string;
} {
  if (successRate >= 0.8) {
    return { level: 'low', description: 'Low Risk', color: 'text-green-400' };
  } else if (successRate >= 0.6) {
    return { level: 'medium', description: 'Medium Risk', color: 'text-yellow-400' };
  } else if (successRate >= 0.3) {
    return { level: 'high', description: 'High Risk', color: 'text-orange-400' };
  } else {
    return { level: 'extreme', description: 'Extreme Risk', color: 'text-red-400' };
  }
}