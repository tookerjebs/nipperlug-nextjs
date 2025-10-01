/**
 * Stellar Stat Converter
 * Utility to convert stellar stats with levels into StatOption format for shared modal
 */

import { getStatsForConstellation } from '../data/stellar-data';
import { SystemSlot } from '@/tools/build-planner/types/systems';



/**
 * Get the actual stat value for a given stat ID and level
 * Looks up the value in the constellation's stat array
 */
export function getStellarStatValue(statId: string, level: number, constellation: string): number | null {
  const stats = getStatsForConstellation(constellation);
  const stat = stats.find(s => s.id === statId);
  
  if (!stat || !level || level < 1 || level > stat.values.length) {
    return null;
  }
  
  return stat.values[level - 1];
}

/**
 * Create a SystemSlot-like object for stellar nodes
 * This allows stellar nodes to work with the shared StatSelectionModal
 */
export function createStellarSlot(nodeId: number, constellation: string, isOccupied: boolean = false): SystemSlot {
  return {
    id: `stellar_node_${nodeId}`,
    category: constellation,
    position: nodeId,
    isOccupied,
    contributedStats: {} // Stellar system doesn't use contributed stats tracking
  };
}