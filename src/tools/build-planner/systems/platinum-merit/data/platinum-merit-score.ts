// Platinum Merit Score Calculator
// Calculates required merit score based on merit points needed

// Import the JSON file using require (TypeScript doesn't support JSON imports directly)
const platinumMeritData = require('./platinum-merit-comprehensive.json');

/**
 * Merit Score Formula data extracted from MeritSystem.txt
 * Format: [Min_MeritScore_Platinum, Max_MeritScore_Platinum, Reward_MeritPoint_Platinum]
 * 
 * To get N merit points, you need to accumulate points from ranges.
 * For example:
 * - 0-62 merit score = 1 point
 * - 62-122 merit score = 1 more point (total 2)
 * - 122-182 merit score = 1 more point (total 3)
 * etc.
 */
const MERIT_SCORE_FORMULA: Array<[number, number, number]> = platinumMeritData.meritScoreFormula as Array<[number, number, number]>;

/**
 * Calculate the minimum merit score required to earn a given number of merit points
 * @param meritPoints The number of merit points needed
 * @returns The minimum merit score required, or null if the points exceed the maximum possible
 */
export function calculateRequiredMeritScore(meritPoints: number): number | null {
  if (meritPoints <= 0) return 0;
  
  let cumulativePoints = 0;
  
  for (const [minScore, maxScore, rewardPoints] of MERIT_SCORE_FORMULA) {
    cumulativePoints += rewardPoints;
    
    if (cumulativePoints >= meritPoints) {
      // We need to be in this range
      // Calculate the exact score needed within this range
      // If we need exactly cumulativePoints, we need maxScore
      // If we need less, we interpolate between minScore and maxScore
      
      if (cumulativePoints === meritPoints) {
        return maxScore;
      } else {
        // We need fewer points than this range provides
        // Interpolate within this range
        const pointsNeededInRange = meritPoints - (cumulativePoints - rewardPoints);
        const rangeSize = maxScore - minScore;
        const pointsRatio = pointsNeededInRange / rewardPoints;
        return Math.ceil(minScore + (rangeSize * pointsRatio));
      }
    }
  }
  
  // Points exceed maximum possible
  return null;
}

/**
 * Calculate how many merit points you can earn with a given merit score
 * @param meritScore The merit score you have
 * @returns The total merit points earned
 */
export function calculateMeritPointsFromScore(meritScore: number): number {
  if (meritScore <= 0) return 0;
  
  let totalPoints = 0;
  
  for (const [minScore, maxScore, rewardPoints] of MERIT_SCORE_FORMULA) {
    if (meritScore >= minScore && meritScore < maxScore) {
      // We're in this range - calculate partial points
      const rangeSize = maxScore - minScore;
      const positionInRange = (meritScore - minScore) / rangeSize;
      return totalPoints + Math.floor(rewardPoints * positionInRange);
    } else if (meritScore >= maxScore) {
      // We've passed this range - add full points
      totalPoints += rewardPoints;
    } else {
      // We haven't reached this range yet
      break;
    }
  }
  
  return totalPoints;
}

