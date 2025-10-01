/**
 * Stellar System Meta Builds
 * This file contains meta build configurations for the Stellar Link System
 * Meta builds use optimal stats and the highest tier color (emptiness) for maximum line effects
 */

import { NodeState, ConstellationState } from '../stores/stellarSystemStore';

// Meta build configuration for a single node
interface MetaNodeConfig {
  id: number;
  statId: string;
  level: number;
  colorKey: string;
  isActive: boolean;
}

// Meta build configuration for a constellation
interface MetaConstellationConfig {
  name: string;
  nodes: MetaNodeConfig[];
  colorKey: string;
  isComplete: boolean;
}

// Complete meta build configuration
interface MetaBuildConfig {
  constellations: Record<string, MetaConstellationConfig>;
  nodeStates: Record<number, NodeState>;
}

// Meta build: Optimized Stellar Build
// Uses emptiness color for all constellations (highest line effects)
// Focuses on specialized stats for maximum effectiveness
export const createMetaBuild = (): MetaBuildConfig => {
  const metaBuild: MetaBuildConfig = {
    constellations: {
      // Daedalus constellation - Focus on PvE penetration (4 nodes)
      daedalus: {
        name: 'daedalus',
        colorKey: 'emptiness', // Highest line effects
        isComplete: true,
        nodes: [
          { id: 1, statId: 'pvePenetration', level: 5, colorKey: 'emptiness', isActive: true },
          { id: 2, statId: 'pvePenetration', level: 5, colorKey: 'emptiness', isActive: true },
          { id: 3, statId: 'pvePenetration', level: 5, colorKey: 'emptiness', isActive: true },
          { id: 4, statId: 'pvePenetration', level: 5, colorKey: 'emptiness', isActive: true }
        ]
      },
      
      // Icarus constellation - Focus on PvE critical damage (6 nodes)
      icarus: {
        name: 'icarus',
        colorKey: 'emptiness',
        isComplete: true,
        nodes: [
          { id: 5, statId: 'pveCriticalDamage', level: 5, colorKey: 'emptiness', isActive: true },
          { id: 6, statId: 'pveCriticalDamage', level: 5, colorKey: 'emptiness', isActive: true },
          { id: 7, statId: 'pveCriticalDamage', level: 5, colorKey: 'emptiness', isActive: true },
          { id: 8, statId: 'pveCriticalDamage', level: 5, colorKey: 'emptiness', isActive: true },
          { id: 9, statId: 'pveCriticalDamage', level: 5, colorKey: 'emptiness', isActive: true },
          { id: 10, statId: 'pveCriticalDamage', level: 5, colorKey: 'emptiness', isActive: true }
        ]
      },
      
      // Vulcanos constellation - Focus on all attack (8 nodes)
      vulcanos: {
        name: 'vulcanos',
        colorKey: 'emptiness',
        isComplete: true,
        nodes: [
          { id: 11, statId: 'allAttackUp', level: 5, colorKey: 'emptiness', isActive: true },
          { id: 12, statId: 'allAttackUp', level: 5, colorKey: 'emptiness', isActive: true },
          { id: 13, statId: 'allAttackUp', level: 5, colorKey: 'emptiness', isActive: true },
          { id: 14, statId: 'allAttackUp', level: 5, colorKey: 'emptiness', isActive: true },
          { id: 15, statId: 'allAttackUp', level: 5, colorKey: 'emptiness', isActive: true },
          { id: 16, statId: 'allAttackUp', level: 5, colorKey: 'emptiness', isActive: true },
          { id: 17, statId: 'allAttackUp', level: 5, colorKey: 'emptiness', isActive: true },
          { id: 18, statId: 'allAttackUp', level: 5, colorKey: 'emptiness', isActive: true }
        ]
      },
      
      // Minerva constellation - Focus on penetration (10 nodes)
      minerva: {
        name: 'minerva',
        colorKey: 'emptiness',
        isComplete: true,
        nodes: [
          { id: 19, statId: 'penetration', level: 5, colorKey: 'emptiness', isActive: true },
          { id: 20, statId: 'penetration', level: 5, colorKey: 'emptiness', isActive: true },
          { id: 21, statId: 'penetration', level: 5, colorKey: 'emptiness', isActive: true },
          { id: 22, statId: 'penetration', level: 5, colorKey: 'emptiness', isActive: true },
          { id: 23, statId: 'penetration', level: 5, colorKey: 'emptiness', isActive: true },
          { id: 24, statId: 'penetration', level: 5, colorKey: 'emptiness', isActive: true },
          { id: 25, statId: 'penetration', level: 5, colorKey: 'emptiness', isActive: true },
          { id: 26, statId: 'penetration', level: 5, colorKey: 'emptiness', isActive: true },
          { id: 27, statId: 'penetration', level: 5, colorKey: 'emptiness', isActive: true },
          { id: 28, statId: 'penetration', level: 5, colorKey: 'emptiness', isActive: true }
        ]
      },
      
      // Pluto constellation - Focus on critical damage (12 nodes)
      pluto: {
        name: 'pluto',
        colorKey: 'emptiness',
        isComplete: true,
        nodes: [
          { id: 29, statId: 'criticalDamage', level: 5, colorKey: 'emptiness', isActive: true },
          { id: 30, statId: 'criticalDamage', level: 5, colorKey: 'emptiness', isActive: true },
          { id: 31, statId: 'criticalDamage', level: 5, colorKey: 'emptiness', isActive: true },
          { id: 32, statId: 'criticalDamage', level: 5, colorKey: 'emptiness', isActive: true },
          { id: 33, statId: 'criticalDamage', level: 5, colorKey: 'emptiness', isActive: true },
          { id: 34, statId: 'criticalDamage', level: 5, colorKey: 'emptiness', isActive: true },
          { id: 35, statId: 'criticalDamage', level: 5, colorKey: 'emptiness', isActive: true },
          { id: 36, statId: 'criticalDamage', level: 5, colorKey: 'emptiness', isActive: true },
          { id: 37, statId: 'criticalDamage', level: 5, colorKey: 'emptiness', isActive: true },
          { id: 38, statId: 'criticalDamage', level: 5, colorKey: 'emptiness', isActive: true },
          { id: 39, statId: 'criticalDamage', level: 5, colorKey: 'emptiness', isActive: true },
          { id: 40, statId: 'criticalDamage', level: 5, colorKey: 'emptiness', isActive: true }
        ]
      }
    },
    nodeStates: {}
  };
  
  // Generate nodeStates from constellation configurations
  Object.values(metaBuild.constellations).forEach(constellation => {
    constellation.nodes.forEach(node => {
      metaBuild.nodeStates[node.id] = {
        id: node.id,
        statId: node.statId,
        level: node.level,
        colorKey: node.colorKey,
        isActive: node.isActive
      };
    });
  });
  
  return metaBuild;
};

// Default meta build
export const createDefaultMetaBuild = createMetaBuild;