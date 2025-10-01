/**
 * Stellar System Store
 * Store for managing Stellar Link System state and stats
 */

import { create } from 'zustand';
import { useStatRegistryStore } from '@/tools/build-planner/stores/statRegistryStore';
import { getConstellationFromNodeId, lineEffects } from '../data/stellar-data';
import { getStellarStatValue } from '../utils/stellarStatConverter';
import { createDefaultMetaBuild } from '../data/stellar-meta-builds';

// Node state interface
export interface NodeState {
  id: number;
  statId?: string;
  level?: number;
  colorKey?: string;
  isActive: boolean;
}

// Constellation state interface
export interface ConstellationState {
  name: string;
  nodes: NodeState[];
  colorKey?: string; // Dominant color for line effects
  isComplete: boolean;
}

// Stellar system state interface
interface StellarSystemState {
  constellations: Record<string, ConstellationState>;
  nodeStates: Record<number, NodeState>;
  totalStats: Record<string, number>;
}

// Stellar system actions interface
interface StellarSystemActions {
  // Core stat management actions
  calculateTotalStats: () => Record<string, number>;
  handleStatSelect: (nodeId: number, statId: string, level: number) => void;
  handleStatRemove: (nodeId: number) => void;
  handleColorSelect: (nodeId: number, colorKey: string) => void;
  
  // Node management
  activateNode: (nodeId: number) => void;
  deactivateNode: (nodeId: number) => void;
  
  // Constellation management
  updateConstellationColor: (constellation: string) => void;
  checkConstellationCompletion: (constellation: string) => boolean;
  
  // System lifecycle actions
  initializeSystem: () => void;
  resetSystem: () => void;
  quickFillSystem: (metaBuild?: any) => void;
  loadFromUrl: (params: URLSearchParams) => void;
  exportToUrl: () => URLSearchParams;
  
  // Utility functions
  getNodeState: (nodeId: number) => NodeState | undefined;
  getConstellationStats: (constellation: string) => Record<string, number>;
  
  // Build sharing methods
  restoreFromImport: (data: { constellations: Record<string, ConstellationState>; nodeStates: Record<number, NodeState> }) => void;
}

// Unique system identifier
const SYSTEM_ID = 'stellarSystem';

// Initialize node states for all 40 nodes
const initializeNodeStates = (): Record<number, NodeState> => {
  const nodeStates: Record<number, NodeState> = {};
  for (let i = 1; i <= 40; i++) {
    nodeStates[i] = {
      id: i,
      isActive: false
    };
  }
  return nodeStates;
};

// Initialize constellation states
const initializeConstellations = (): Record<string, ConstellationState> => {
  const constellations: Record<string, ConstellationState> = {};
  
  const constellationRanges = {
    daedalus: { start: 1, end: 4 },
    icarus: { start: 5, end: 10 },
    vulcanos: { start: 11, end: 18 },
    minerva: { start: 19, end: 28 },
    pluto: { start: 29, end: 40 }
  };
  
  Object.entries(constellationRanges).forEach(([name, range]) => {
    const nodes: NodeState[] = [];
    for (let i = range.start; i <= range.end; i++) {
      nodes.push({
        id: i,
        isActive: false
      });
    }
    
    constellations[name] = {
      name,
      nodes,
      isComplete: false
    };
  });
  
  return constellations;
};

// Create the store
export const useStellarSystemStore = create<StellarSystemState & StellarSystemActions>()((set, get) => ({
    // Initial state
    constellations: initializeConstellations(),
    nodeStates: initializeNodeStates(),
    totalStats: {},
    
    // Calculate total stats contributed by this system
    calculateTotalStats: () => {
      const { nodeStates, constellations } = get();
      const totalStats: Record<string, number> = {};
      
      // Add individual node stats
      Object.values(nodeStates).forEach(node => {
        if (node.isActive && node.statId && node.level) {
          const constellationName = getConstellationFromNodeId(node.id); // Get the constellation name
          const statValue = getStellarStatValue(node.statId, node.level, constellationName); // Get the actual value
          if (statValue !== null && statValue !== undefined) { // Ensure statValue is valid
            const currentValue = totalStats[node.statId] || 0;
            totalStats[node.statId] = currentValue + statValue;
          }
        }
      });
      
      // Add constellation line effects
      Object.entries(constellations).forEach(([constellationName, constellation]) => {
        if (constellation.isComplete && constellation.colorKey) {
          const lineEffect = lineEffects[constellationName]?.[constellation.colorKey];
          if (lineEffect) {
            // Add effect1
            const effect1Current = totalStats[lineEffect.effect1.statId] || 0;
            totalStats[lineEffect.effect1.statId] = effect1Current + lineEffect.effect1.value;
            
            // Add effect2
            const effect2Current = totalStats[lineEffect.effect2.statId] || 0;
            totalStats[lineEffect.effect2.statId] = effect2Current + lineEffect.effect2.value;
          }
        }
      });
      
      return totalStats;
    },
    
    // Handle stat selection
    handleStatSelect: (nodeId, statId, level) => {
      // 1. Update system state first
      set(state => {
        const newNodeStates = { ...state.nodeStates };
        const newConstellations = { ...state.constellations };
        
        // Update node state
        newNodeStates[nodeId] = {
          ...newNodeStates[nodeId],
          statId,
          level,
          isActive: true
        };
        
        // Update constellation
        const constellation = getConstellationFromNodeId(nodeId);
        if (newConstellations[constellation]) {
          const constellationState = { ...newConstellations[constellation] };
          const nodeIndex = constellationState.nodes.findIndex(n => n.id === nodeId);
          if (nodeIndex !== -1) {
            constellationState.nodes[nodeIndex] = { ...newNodeStates[nodeId] };
          }
          newConstellations[constellation] = constellationState;
        }
        
        return { nodeStates: newNodeStates, constellations: newConstellations };
      });
      
      // Update constellation color and completion
      const constellation = getConstellationFromNodeId(nodeId);
      get().updateConstellationColor(constellation);
      
      // 2. Calculate new total stats
      const totalStats = get().calculateTotalStats();
      
      // 3. Register with stat registry
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
      
      // 4. Update local totalStats
      set({ totalStats });
    },
    
    // Handle stat removal
    handleStatRemove: (nodeId) => {
      // 1. Update system state first
      set(state => {
        const newNodeStates = { ...state.nodeStates };
        const newConstellations = { ...state.constellations };
        
        // Update node state
        newNodeStates[nodeId] = {
          ...newNodeStates[nodeId],
          statId: undefined,
          level: undefined,
          isActive: false
        };
        
        // Update constellation
        const constellation = getConstellationFromNodeId(nodeId);
        if (newConstellations[constellation]) {
          const constellationState = { ...newConstellations[constellation] };
          const nodeIndex = constellationState.nodes.findIndex(n => n.id === nodeId);
          if (nodeIndex !== -1) {
            constellationState.nodes[nodeIndex] = { ...newNodeStates[nodeId] };
          }
          newConstellations[constellation] = constellationState;
        }
        
        return { nodeStates: newNodeStates, constellations: newConstellations };
      });
      
      // Update constellation color and completion
      const constellation = getConstellationFromNodeId(nodeId);
      get().updateConstellationColor(constellation);
      
      // 2. Calculate new total stats
      const totalStats = get().calculateTotalStats();
      
      // 3. Register with stat registry
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
      
      // 4. Update local totalStats
      set({ totalStats });
    },
    
    // Handle color selection
    handleColorSelect: (nodeId, colorKey) => {
      // 1. Update system state first
      set(state => {
        const newNodeStates = { ...state.nodeStates };
        const newConstellations = { ...state.constellations };
        
        // Update node state
        newNodeStates[nodeId] = {
          ...newNodeStates[nodeId],
          colorKey: colorKey || undefined
        };
        
        // Update constellation
        const constellation = getConstellationFromNodeId(nodeId);
        if (newConstellations[constellation]) {
          const constellationState = { ...newConstellations[constellation] };
          const nodeIndex = constellationState.nodes.findIndex(n => n.id === nodeId);
          if (nodeIndex !== -1) {
            constellationState.nodes[nodeIndex] = { ...newNodeStates[nodeId] };
          }
          newConstellations[constellation] = constellationState;
        }
        
        return { nodeStates: newNodeStates, constellations: newConstellations };
      });
      
      // Update constellation color
      const constellation = getConstellationFromNodeId(nodeId);
      get().updateConstellationColor(constellation);
      
      // 2. Calculate new total stats
      const totalStats = get().calculateTotalStats();
      
      // 3. Register with stat registry
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
      
      // 4. Update local totalStats
      set({ totalStats });
    },
    
    // Activate node
    activateNode: (nodeId) => {
      set(state => {
        const newNodeStates = { ...state.nodeStates };
        newNodeStates[nodeId] = {
          ...newNodeStates[nodeId],
          isActive: true
        };
        return { nodeStates: newNodeStates };
      });
    },
    
    // Deactivate node
    deactivateNode: (nodeId) => {
      set(state => {
        const newNodeStates = { ...state.nodeStates };
        newNodeStates[nodeId] = {
          ...newNodeStates[nodeId],
          isActive: false,
          statId: undefined,
          level: undefined
        };
        return { nodeStates: newNodeStates };
      });
    },
    
    // Update constellation color based on ALL nodes having same color
    updateConstellationColor: (constellation) => {
      set(state => {
        const newConstellations = { ...state.constellations };
        const constellationState = newConstellations[constellation];
        
        if (constellationState) {
          // Get all active nodes with stats in this constellation
          const activeNodesWithStats = constellationState.nodes.filter(node => {
            const nodeState = state.nodeStates[node.id];
            return nodeState?.isActive && nodeState.statId && nodeState.colorKey;
          });
          
          // Check if ALL active nodes with stats have the same color
          let constellationColor = '';
          let isComplete = false;
          
          if (activeNodesWithStats.length === constellationState.nodes.length) {
            // All nodes in constellation are active with stats
            const firstNodeColor = state.nodeStates[activeNodesWithStats[0].id]?.colorKey;
            const allSameColor = activeNodesWithStats.every(node => {
              const nodeState = state.nodeStates[node.id];
              return nodeState?.colorKey === firstNodeColor;
            });
            
            if (allSameColor && firstNodeColor) {
              constellationColor = firstNodeColor;
              isComplete = true;
            }
          }
          
          // Update constellation
          newConstellations[constellation] = {
            ...constellationState,
            colorKey: constellationColor || undefined,
            isComplete: isComplete
          };
        }
        
        return { constellations: newConstellations };
      });
    },
    
    // Check if constellation has line effects (ALL nodes same color)
    checkConstellationCompletion: (constellation) => {
      const { constellations, nodeStates } = get();
      const constellationState = constellations[constellation];
      
      if (!constellationState || !constellationState.colorKey) return false;
      
      // Get all active nodes with stats in this constellation
      const activeNodesWithStats = constellationState.nodes.filter(node => {
        const nodeState = nodeStates[node.id];
        return nodeState?.isActive && nodeState.statId && nodeState.colorKey;
      });
      
      // Line effects activate when ALL nodes are active with stats and have the same color
      if (activeNodesWithStats.length !== constellationState.nodes.length) {
        return false; // Not all nodes are active with stats
      }
      
      // Check if all active nodes have the same color as the constellation
      return activeNodesWithStats.every(node => {
        const nodeState = nodeStates[node.id];
        return nodeState?.colorKey === constellationState.colorKey;
      });
    },
    
    // Initialize system
    initializeSystem: () => {
      // Initialize system state
      set({
        constellations: initializeConstellations(),
        nodeStates: initializeNodeStates(),
        totalStats: {}
      });
      
      // 2. Calculate and register initial stats
      const totalStats = get().calculateTotalStats();
      
      // 3. Register with stat registry
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
      
      // 4. Update local totalStats
      set({ totalStats });
    },
    
    // Reset system
    resetSystem: () => {
      // Unregister from stat registry first
      useStatRegistryStore.getState().unregisterSystem(SYSTEM_ID);
      
      set({
        constellations: initializeConstellations(),
        nodeStates: initializeNodeStates(),
        totalStats: {}
      });
    },
    
    // Quick fill system
    quickFillSystem: (metaBuild) => {
      // Use provided meta build or default
      const buildConfig = metaBuild || createDefaultMetaBuild();
      
      // Reset system first
      get().resetSystem();
      
      // 1. Update system state first
      set({
        constellations: buildConfig.constellations,
        nodeStates: buildConfig.nodeStates
      });
      
      // 2. Calculate new total stats
      const totalStats = get().calculateTotalStats();
      
      // 3. Register with stat registry
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
      
      // 4. Update local totalStats
      set({ totalStats });
    },
    
    // Load from URL
    loadFromUrl: (params) => {
      const stellarData = params.get('stellar');
      if (stellarData) {
        try {
          const data = JSON.parse(decodeURIComponent(stellarData));
          if (Array.isArray(data)) {
            // Reset to default state first
            set({
              constellations: initializeConstellations(),
              nodeStates: initializeNodeStates()
            });
            
            // Apply loaded node states
            data.forEach((nodeData: any) => {
              if (nodeData.id && nodeData.statId) {
                get().handleStatSelect(nodeData.id, nodeData.statId, nodeData.level || 1);
                if (nodeData.colorKey) {
                  get().handleColorSelect(nodeData.id, nodeData.colorKey);
                }
              }
            });
          }
        } catch (error) {
          console.error('Failed to load stellar data from URL:', error);
        }
      }
    },
    
    // Export to URL
    exportToUrl: () => {
      const { nodeStates } = get();
      const activeNodes = Object.values(nodeStates)
        .filter(node => node.isActive)
        .map(node => ({
          id: node.id,
          statId: node.statId,
          level: node.level,
          colorKey: node.colorKey
        }));
      
      const params = new URLSearchParams();
      if (activeNodes.length > 0) {
        params.set('stellar', encodeURIComponent(JSON.stringify(activeNodes)));
      }
      
      return params;
    },
    
    // Get node state
    getNodeState: (nodeId) => {
      return get().nodeStates[nodeId];
    },
    
    // Get constellation stats
    getConstellationStats: (constellation) => {
      const { constellations, nodeStates } = get();
      const constellationState = constellations[constellation];
      const stats: Record<string, number> = {};
      
      if (constellationState) {
        // Add individual node stats
        constellationState.nodes.forEach(node => {
          const nodeState = nodeStates[node.id];
          if (nodeState?.isActive && nodeState.statId && nodeState.level) {
            const currentValue = stats[nodeState.statId] || 0;
            stats[nodeState.statId] = currentValue + nodeState.level;
          }
        });
        
        // Add line effects if constellation is complete
        if (constellationState.isComplete && constellationState.colorKey) {
          const lineEffect = lineEffects[constellation]?.[constellationState.colorKey];
          if (lineEffect) {
            const effect1Current = stats[lineEffect.effect1.statId] || 0;
            stats[lineEffect.effect1.statId] = effect1Current + lineEffect.effect1.value;
            
            const effect2Current = stats[lineEffect.effect2.statId] || 0;
            stats[lineEffect.effect2.statId] = effect2Current + lineEffect.effect2.value;
          }
        }
      }
      
      return stats;
    },
    
    // Method for universal build sharing - restores state and triggers stat registration
    restoreFromImport: (data) => {
      // 1. Update system state first
      set({
        constellations: data.constellations,
        nodeStates: data.nodeStates
      });
      
      // 2. Calculate new total stats
      const totalStats = get().calculateTotalStats();
      
      // 3. Register with stat registry
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
      
      // 4. Update local totalStats
      set({ totalStats });
      
      console.log('Stellar system restored from import with stats:', totalStats);
    }
  })
);

// Export system configuration for build sharing
export const stellarSystemConfig = {
  systemId: SYSTEM_ID,
  getDefaultState: () => ({
    constellations: initializeConstellations(),
    nodeStates: initializeNodeStates()
  })
};