// State management for the Mythical Level system
import { create } from 'zustand';
import { subscribeWithSelector, persist } from 'zustand/middleware';
import { useStatRegistryStore } from '@/tools/build-planner/stores/statRegistryStore';
import { BuildStats } from '@/tools/build-planner/stores/buildPlannerStore';
import { mythLevelNodes } from '../mythLevelNodes';
import { isNodeUnlocked, getNodeZone, getZoneProgress, MythZone, calculateActualHolyPowerCost } from '../data/mythZoneConfig';
import { getNodeData } from '../data/mythLevelNodeData';
import { getStatInfo } from '@/tools/build-planner/data/stats-config';

export interface MythNode {
  id: number;
  x: number;
  y: number;
  isActivated: boolean;
  selectedStat?: SelectedStatWithLevel;
}

export interface SelectedStatWithLevel {
  statKey: string;
  level: number;
  value: number;
  holyPower: number;
}

interface MythLevelState {
  nodes: MythNode[];
  selectedNodeId: number | null;
  nodeStats: Record<number, SelectedStatWithLevel>;
  totalHolyPower: number;
  totalStats: BuildStats;
}

interface MythLevelActions {
  // Core stat management actions (required by integration guide)
  calculateTotalStats: () => BuildStats;
  handleStatSelect: (nodeId: number, selectedStat: SelectedStatWithLevel) => void;
  handleStatRemove: (nodeId: number) => void;
  resetSystem: () => void;
  quickFillSystem: () => void;

  // Legacy actions for backward compatibility
  selectNode: (nodeId: number | null) => void;
  toggleNode: (nodeId: number) => void;

  // New actions for enhanced functionality
  updateNodeStats: (nodeId: number, selectedStat: SelectedStatWithLevel) => void;
  getNodeStats: (nodeId: number) => SelectedStatWithLevel | null;
  hasNodeStats: (nodeId: number) => boolean;

  // Zone system methods
  isNodeUnlocked: (nodeId: number) => boolean;
  getNodeZone: (nodeId: number) => MythZone | null;
  getZoneProgress: () => ReturnType<typeof getZoneProgress>;
  getUnlockedNodeCount: () => number;

  // Build sharing methods
  restoreFromImport: (data: { nodeStats: Record<number, SelectedStatWithLevel>; totalHolyPower: number }) => void;
}

type MythLevelStore = MythLevelState & MythLevelActions;

// Unique system identifier
const SYSTEM_ID = 'mythLevel';

export const useMythLevelStore = create<MythLevelStore>()(
  persist(
    subscribeWithSelector((set, get) => ({
    // Initialize nodes with coordinates and set all to not activated
    nodes: mythLevelNodes.map(node => ({
      ...node,
      isActivated: false
    })),
    selectedNodeId: null,
    nodeStats: {},
    totalHolyPower: 0,
    totalStats: {},

    // Core stat management actions (required by integration guide)
    calculateTotalStats: () => {
      const { nodeStats } = get();
      const totalStats: BuildStats = {};

      // Aggregate stats from all configured nodes
      Object.values(nodeStats).forEach(stat => {
        const currentValue = totalStats[stat.statKey] || 0;
        totalStats[stat.statKey] = currentValue + stat.value;
      });

      return totalStats;
    },

    handleStatSelect: (nodeId, selectedStat) => {
      set(state => {
        const newNodeStats = {
          ...state.nodeStats,
          [nodeId]: selectedStat
        };

        // Calculate total holy power
        const newTotalHolyPower = Object.values(newNodeStats)
          .reduce((sum, stat) => sum + stat.holyPower, 0);

        // Calculate total stats
        const newTotalStats: BuildStats = {};
        Object.values(newNodeStats).forEach(stat => {
          const currentValue = newTotalStats[stat.statKey] || 0;
          newTotalStats[stat.statKey] = currentValue + stat.value;
        });

        // Update node activation status
        const newNodes = state.nodes.map(node =>
          node.id === nodeId
            ? { ...node, isActivated: true, selectedStat }
            : node
        );

        return {
          nodeStats: newNodeStats,
          totalHolyPower: newTotalHolyPower,
          totalStats: newTotalStats,
          nodes: newNodes,
          selectedNodeId: null
        };
      });

      // Register stats with the stat registry
      const totalStats = get().calculateTotalStats();
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
    },

    handleStatRemove: (nodeId) => {
      set(state => {
        const newNodeStats = { ...state.nodeStats };
        delete newNodeStats[nodeId];

        // Calculate total holy power
        const newTotalHolyPower = Object.values(newNodeStats)
          .reduce((sum, stat) => sum + stat.holyPower, 0);

        // Calculate total stats
        const newTotalStats: BuildStats = {};
        Object.values(newNodeStats).forEach(stat => {
          const currentValue = newTotalStats[stat.statKey] || 0;
          newTotalStats[stat.statKey] = currentValue + stat.value;
        });

        // Update node activation status
        const newNodes = state.nodes.map(node =>
          node.id === nodeId
            ? { ...node, isActivated: false, selectedStat: undefined }
            : node
        );

        return {
          nodeStats: newNodeStats,
          totalHolyPower: newTotalHolyPower,
          totalStats: newTotalStats,
          nodes: newNodes,
          selectedNodeId: null
        };
      });

      // Register updated stats with the stat registry
      const totalStats = get().calculateTotalStats();
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
    },

    resetSystem: () => {
      // Unregister from stat registry first
      useStatRegistryStore.getState().unregisterSystem(SYSTEM_ID);

      set({
        nodes: mythLevelNodes.map(node => ({
          ...node,
          isActivated: false,
          selectedStat: undefined
        })),
        selectedNodeId: null,
        nodeStats: {},
        totalHolyPower: 0,
        totalStats: {}
      });
    },

    quickFillSystem: () => {
      const { totalHolyPower, nodeStats } = get();
      const newNodeStats = { ...nodeStats };

      // Get all currently unlocked nodes that don't have stats yet
      const unlockedEmptyNodes = mythLevelNodes
        .filter(node => {
          // Must be unlocked with current total holy power
          if (!isNodeUnlocked(node.id, totalHolyPower)) return false;
          
          // Must not already have stats assigned
          if (newNodeStats[node.id]) return false;
          
          // Must have available stats data
          const nodeData = getNodeData(node.id);
          return nodeData && nodeData.availableStats.length > 0;
        })
        .sort((a, b) => a.id - b.id); // Process in zone order

      // Fill each unlocked empty node with the highest holy power stat
      // Prioritize offensive stats over defensive when holy power is equal
      unlockedEmptyNodes.forEach(node => {
        const nodeData = getNodeData(node.id);
        if (!nodeData || !nodeData.availableStats.length) return;

        let bestStat: SelectedStatWithLevel | undefined;
        let maxHolyPower = 0;
        let bestStatCategory: 'offensive' | 'defensive' | 'utility' | null = null;
        let bestStatIsPve: boolean | null = null;

        // Find the stat with highest holy power at max level
        // When holy power is equal, prioritize: offensive > defensive > utility, then PVE > PVP
        nodeData.availableStats.forEach((stat) => {
          const maxLevel = stat.maxLevel;
          const maxLevelData = stat.levels.find((level) => level.level === maxLevel);

          if (maxLevelData) {
            // Calculate actual holy power with zone bonus
            const actualHolyPower = calculateActualHolyPowerCost(maxLevelData.holyPower, node.id);
            
            // Get stat category for prioritization
            const statInfo = getStatInfo(stat.statKey);
            const statCategory = statInfo?.category || 'utility';
            
            // Category priority: offensive (0) > defensive (1) > utility (2)
            const categoryPriority = statCategory === 'offensive' ? 0 : statCategory === 'defensive' ? 1 : 2;
            
            // Check if stat is PVE variant (prioritize PVE over PVP)
            const isPve = stat.statKey.toLowerCase().startsWith('pve');

            // Check if this stat is better than current best
            let isBetter = false;
            
            if (actualHolyPower > maxHolyPower) {
              // Higher holy power always wins
              isBetter = true;
            } else if (actualHolyPower === maxHolyPower) {
              // Same holy power - use tiebreakers
              if (bestStatCategory === null) {
                // First stat found, always accept it
                isBetter = true;
              } else {
                const currentCategoryPriority = bestStatCategory === 'offensive' ? 0 : bestStatCategory === 'defensive' ? 1 : 2;
                
                // First tiebreaker: category priority (offensive > defensive > utility)
                if (categoryPriority < currentCategoryPriority) {
                  isBetter = true;
                } else if (categoryPriority === currentCategoryPriority) {
                  // Second tiebreaker: PVE > PVP
                  if (bestStatIsPve === null) {
                    isBetter = true;
                  } else if (isPve && !bestStatIsPve) {
                    // Current is PVE, best is PVP - prefer PVE
                    isBetter = true;
                  }
                  // If both are PVE or both are PVP, keep current best (first found)
                }
              }
            }

            if (isBetter) {
              maxHolyPower = actualHolyPower;
              bestStatCategory = statCategory;
              bestStatIsPve = isPve;
              bestStat = {
                statKey: stat.statKey,
                level: maxLevelData.level,
                value: maxLevelData.value,
                holyPower: actualHolyPower
              };
            }
          }
        });

        // Add the best stat for this node
        if (bestStat) {
          newNodeStats[node.id] = bestStat;
        }
      });

      // Calculate new total holy power
      const newTotalHolyPower = Object.values(newNodeStats)
        .reduce((sum, stat) => sum + stat.holyPower, 0);

      // Calculate new total stats
      const newTotalStats: BuildStats = {};
      Object.values(newNodeStats).forEach(stat => {
        const currentValue = newTotalStats[stat.statKey] || 0;
        newTotalStats[stat.statKey] = currentValue + stat.value;
      });

      // Update state
      set(state => {
        const newNodes = state.nodes.map(node => ({
          ...node,
          isActivated: newNodeStats[node.id] !== undefined,
          selectedStat: newNodeStats[node.id]
        }));

        return {
          nodeStats: newNodeStats,
          totalHolyPower: newTotalHolyPower,
          totalStats: newTotalStats,
          nodes: newNodes
        };
      });

      // Register updated stats with the stat registry
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, newTotalStats);
    },

    // Legacy actions for backward compatibility
    selectNode: (nodeId) => {
      set({ selectedNodeId: nodeId });
    },

    toggleNode: (nodeId) => {
      set((state) => ({
        nodes: state.nodes.map(node =>
          node.id === nodeId
            ? { ...node, isActivated: !node.isActivated }
            : node
        ),
        selectedNodeId: null
      }));
    },

    // New actions for enhanced functionality
    updateNodeStats: (nodeId, selectedStat) => {
      get().handleStatSelect(nodeId, selectedStat);
    },

    getNodeStats: (nodeId) => {
      return get().nodeStats[nodeId] || null;
    },

    hasNodeStats: (nodeId) => {
      const stat = get().nodeStats[nodeId];
      return stat !== undefined && stat !== null;
    },

    // Zone system methods
    isNodeUnlocked: (nodeId) => {
      const { totalHolyPower } = get();
      return isNodeUnlocked(nodeId, totalHolyPower);
    },

    getNodeZone: (nodeId) => {
      return getNodeZone(nodeId);
    },

    getZoneProgress: () => {
      const { totalHolyPower } = get();
      return getZoneProgress(totalHolyPower);
    },

    getUnlockedNodeCount: () => {
      const { totalHolyPower } = get();
      return mythLevelNodes.filter(node => isNodeUnlocked(node.id, totalHolyPower)).length;
    },

    // Build sharing methods
    restoreFromImport: (data) => {
      set(state => {
        // Update node stats
        const newNodeStats = data.nodeStats || {};

        // Update nodes with imported data
        const newNodes = state.nodes.map(node => {
          const nodeStat = newNodeStats[node.id];
          return {
            ...node,
            isActivated: nodeStat !== undefined && nodeStat !== null,
            selectedStat: nodeStat
          };
        });

        return {
          nodeStats: newNodeStats,
          totalHolyPower: data.totalHolyPower || 0,
          nodes: newNodes,
          selectedNodeId: null
        };
      });

      // Register stats with the stat registry
      const totalStats = get().calculateTotalStats();
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
    }
  })),
  {
    name: 'myth-level-storage',
    partialize: (state) => ({
      nodeStats: state.nodeStats,
      totalHolyPower: state.totalHolyPower,
      totalStats: state.totalStats
    }),
    onRehydrateStorage: () => (state) => {
      if (state) {
        // Update nodes with persisted data
        const updatedNodes = mythLevelNodes.map(node => {
          const nodeStat = state.nodeStats[node.id];
          return {
            ...node,
            isActivated: nodeStat !== undefined && nodeStat !== null,
            selectedStat: nodeStat
          };
        });
        
        // Update the nodes in state (proper immutable update)
        Object.assign(state, {
          nodes: updatedNodes
        });
        
        // Re-register stats with the stat registry after rehydration
        useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, state.totalStats);
      }
    }
  }
  )
);