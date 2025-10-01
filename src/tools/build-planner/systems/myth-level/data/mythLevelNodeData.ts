// Mythical Level System Node Data
// Comprehensive data structure for all myth level nodes with flexible stat levels and holy power

import { getStatInfo } from '../../../data/stats-config';

// Individual level data for a stat
export interface StatLevelData {
  level: number;        // 1, 2, 3, etc.
  value: number;        // Actual stat value at this level
  holyPower: number;    // Holy power gained when rolling this level
}

// Complete stat configuration for a node
export interface MythNodeStat {
  statKey: string;                    // Key from stats-config.ts
  name: string;                       // Display name (from stats-config)
  category: 'offensive' | 'defensive' | 'utility';
  isPercentage: boolean;              // From stats-config
  description: string;                // From stats-config
  icon?: string;                      // Icon path (from stats-config)
  maxLevel: number;                   // Maximum level for this stat in this node
  levels: StatLevelData[];            // Array of level data (1 to maxLevel)
  minValue: number;                   // Minimum possible value (level 1)
  maxValue: number;                   // Maximum possible value (max level)
}

// Complete node configuration
export interface MythLevelNodeData {
  nodeId: number | number[];          // Single node ID or array of node IDs that share this configuration
  availableStats: MythNodeStat[];     // All stats available in this node
  isDataComplete: boolean;            // Flag to track if all data has been collected
  lastUpdated?: string;               // ISO date string for tracking updates
  notes?: string;                     // Optional notes for data collection
}

// Helper function to create stat from stats-config with level data
const createMythNodeStat = (
  statKey: string,
  maxLevel: number,
  levels: StatLevelData[]
): MythNodeStat => {
  const statInfo = getStatInfo(statKey);
  if (!statInfo) {
    throw new Error(`Stat key '${statKey}' not found in stats-config`);
  }

  // Calculate min/max from levels
  const values = levels.map(l => l.value);
  const minValue = Math.min(...values);
  const maxValue = Math.max(...values);

  return {
    statKey,
    name: statInfo.name,
    category: statInfo.category,
    isPercentage: statInfo.isPercentage,
    description: statInfo.description,
    icon: statInfo.icon,
    maxLevel,
    levels: [...levels].sort((a, b) => a.level - b.level), // Ensure sorted by level
    minValue,
    maxValue
  };
};

// Node data for myth level system
// TODO: Complete data collection for all nodes
export const mythLevelNodeData: MythLevelNodeData[] = [
  {
    nodeId: [1,4,5],
    isDataComplete: true, // Updated with accurate server data
    lastUpdated: new Date().toISOString(),
    notes: "Updated with accurate server data from myth-data-grouped.txt",
    availableStats: [
      createMythNodeStat("pveIgnoreAccuracy", 10, [
        { level: 1, value: 1, holyPower: 40 },
        { level: 2, value: 2, holyPower: 50 },
        { level: 3, value: 3, holyPower: 60 },
        { level: 4, value: 4, holyPower: 65 },
        { level: 5, value: 5, holyPower: 70 },
        { level: 6, value: 6, holyPower: 75 },
        { level: 7, value: 7, holyPower: 80 },
        { level: 8, value: 9, holyPower: 100 },
        { level: 9, value: 12, holyPower: 120 },
        { level: 10, value: 16, holyPower: 200 },
      ]),
      createMythNodeStat("pvpIgnoreAccuracy", 10, [
        { level: 1, value: 1, holyPower: 40 },
        { level: 2, value: 2, holyPower: 50 },
        { level: 3, value: 3, holyPower: 60 },
        { level: 4, value: 4, holyPower: 65 },
        { level: 5, value: 5, holyPower: 70 },
        { level: 6, value: 6, holyPower: 75 },
        { level: 7, value: 7, holyPower: 80 },
        { level: 8, value: 9, holyPower: 100 },
        { level: 9, value: 12, holyPower: 120 },
        { level: 10, value: 16, holyPower: 200 },
      ]),
      createMythNodeStat("pvpCancelIgnoreDamageReduction", 5, [
        { level: 1, value: 1, holyPower: 55 },
        { level: 2, value: 2, holyPower: 66 },
        { level: 3, value: 3, holyPower: 88 },
        { level: 4, value: 5, holyPower: 132 },
        { level: 5, value: 8, holyPower: 220 }
      ]),
      createMythNodeStat("pveCancelIgnoreDamageReduction", 5, [
        { level: 1, value: 1, holyPower: 55 },
        { level: 2, value: 2, holyPower: 66 },
        { level: 3, value: 3, holyPower: 88 },
        { level: 4, value: 5, holyPower: 132 },
        { level: 5, value: 8, holyPower: 220 }
      ]),
      createMythNodeStat("pvpDefense", 5, [
        { level: 1, value: 1, holyPower: 70 },
        { level: 2, value: 2, holyPower: 84 },
        { level: 3, value: 3, holyPower: 112 },
        { level: 4, value: 5, holyPower: 168 },
        { level: 5, value: 8, holyPower: 280 }
      ]),
      createMythNodeStat("pveDefense", 5, [
        { level: 1, value: 1, holyPower: 70 },
        { level: 2, value: 2, holyPower: 84 },
        { level: 3, value: 3, holyPower: 112 },
        { level: 4, value: 5, holyPower: 168 },
        { level: 5, value: 8, holyPower: 280 }
      ]),
      createMythNodeStat("hp", 5, [
        { level: 1, value: 5, holyPower: 60 },
        { level: 2, value: 10, holyPower: 72 },
        { level: 3, value: 15, holyPower: 96 },
        { level: 4, value: 20, holyPower: 144 },
        { level: 5, value: 30, holyPower: 240 }
      ])
    ]
  },
  {
    nodeId: [2,6,7],
    isDataComplete: true,
    lastUpdated: new Date().toISOString(),
    notes: "Updated with accurate server data from myth-data-grouped.txt",
    availableStats: [
      createMythNodeStat("ignoreEvasion", 10, [
        { level: 1, value: 1, holyPower: 40 },
        { level: 2, value: 2, holyPower: 50 },
        { level: 3, value: 3, holyPower: 60 },
        { level: 4, value: 4, holyPower: 65 },
        { level: 5, value: 5, holyPower: 70 },
        { level: 6, value: 6, holyPower: 75 },
        { level: 7, value: 7, holyPower: 80 },
        { level: 8, value: 9, holyPower: 100 },
        { level: 9, value: 12, holyPower: 120 },
        { level: 10, value: 16, holyPower: 200 }
      ]),
      createMythNodeStat("cancelIgnoreEvasion", 10, [
        { level: 1, value: 1, holyPower: 40 },
        { level: 2, value: 2, holyPower: 50 },
        { level: 3, value: 3, holyPower: 60 },
        { level: 4, value: 4, holyPower: 65 },
        { level: 5, value: 5, holyPower: 70 },
        { level: 6, value: 6, holyPower: 75 },
        { level: 7, value: 7, holyPower: 80 },
        { level: 8, value: 9, holyPower: 100 },
        { level: 9, value: 12, holyPower: 120 },
        { level: 10, value: 16, holyPower: 200 }
      ]),
      createMythNodeStat("ignoreDamageReduction", 5, [
        { level: 1, value: 1, holyPower: 55 },
        { level: 2, value: 2, holyPower: 66 },
        { level: 3, value: 3, holyPower: 88 },
        { level: 4, value: 5, holyPower: 132 },
        { level: 5, value: 8, holyPower: 220 },
      ]),
      createMythNodeStat("cancelIgnoreDamageReduction", 5, [
         { level: 1, value: 1, holyPower: 55 },
        { level: 2, value: 2, holyPower: 66 },
        { level: 3, value: 3, holyPower: 88 },
        { level: 4, value: 5, holyPower: 132 },
        { level: 5, value: 8, holyPower: 220 },
      ]),
      createMythNodeStat("ignorePenetration", 5, [
        { level: 1, value: 3, holyPower: 70 },
        { level: 2, value: 4, holyPower: 84 },
        { level: 3, value: 5, holyPower: 112 },
        { level: 4, value: 7, holyPower: 168 },
        { level: 5, value: 10, holyPower: 280 }
      ]),
      createMythNodeStat("cancelIgnorePenetration", 5, [
        { level: 1, value: 3, holyPower: 70 },
        { level: 2, value: 4, holyPower: 84 },
        { level: 3, value: 5, holyPower: 112 },
        { level: 4, value: 8, holyPower: 168 },
        { level: 5, value: 10, holyPower: 280 }
      ])
    ]
  },
  {
    nodeId: [3,8,9], // Nodes 3, 8, and 9 share the same configuration
    isDataComplete: true,
    lastUpdated: new Date().toISOString(),
    notes: "Updated with accurate server data from myth-data-grouped.txt",
    availableStats: [
      createMythNodeStat("pvpIgnoreEvasion", 10, [
        { level: 1, value: 1, holyPower: 40 },
        { level: 2, value: 2, holyPower: 50 },
        { level: 3, value: 3, holyPower: 60 },
        { level: 4, value: 4, holyPower: 65 },
        { level: 5, value: 5, holyPower: 70 },
        { level: 6, value: 6, holyPower: 75 },
        { level: 7, value: 7, holyPower: 80 },
        { level: 8, value: 9, holyPower: 100 },
        { level: 9, value: 12, holyPower: 120 },
        { level: 10, value: 16, holyPower: 200 }
      ]),
      createMythNodeStat("pveIgnoreEvasion", 10, [
        { level: 1, value: 1, holyPower: 40 },
        { level: 2, value: 2, holyPower: 50 },
        { level: 3, value: 3, holyPower: 60 },
        { level: 4, value: 4, holyPower: 65 },
        { level: 5, value: 5, holyPower: 70 },
        { level: 6, value: 6, holyPower: 75 },
        { level: 7, value: 7, holyPower: 80 },
        { level: 8, value: 9, holyPower: 100 },
        { level: 9, value: 12, holyPower: 120 },
        { level: 10, value: 16, holyPower: 200 }
      ]),
      createMythNodeStat("pvpIgnoreDamageReduction", 5, [
        { level: 1, value: 1, holyPower: 55 },
        { level: 2, value: 2, holyPower: 66 },
        { level: 3, value: 3, holyPower: 88 },
        { level: 4, value: 5, holyPower: 132 },
        { level: 5, value: 8, holyPower: 220 },
      ]),
      createMythNodeStat("pveIgnoreDamageReduction", 5, [
        { level: 1, value: 1, holyPower: 55 },
        { level: 2, value: 2, holyPower: 66 },
        { level: 3, value: 3, holyPower: 88 },
        { level: 4, value: 5, holyPower: 132 },
        { level: 5, value: 8, holyPower: 220 },
      ]),
      createMythNodeStat("pvpAllAttackUp", 5, [
        { level: 1, value: 1, holyPower: 60 },
        { level: 2, value: 2, holyPower: 72 },
        { level: 3, value: 3, holyPower: 96 },
        { level: 4, value: 4, holyPower: 144 },
        { level: 5, value: 8, holyPower: 240 },
      ]),
      createMythNodeStat("pveAllAttackUp", 5, [
        { level: 1, value: 1, holyPower: 60 },
        { level: 2, value: 2, holyPower: 72 },
        { level: 3, value: 3, holyPower: 96 },
        { level: 4, value: 4, holyPower: 144 },
        { level: 5, value: 8, holyPower: 240 },
      ]),
      createMythNodeStat("pvpCancelIgnorePenetration", 5, [
        { level: 1, value: 3, holyPower: 70 },
        { level: 2, value: 4, holyPower: 84 },
        { level: 3, value: 5, holyPower: 112 },
        { level: 4, value: 7, holyPower: 168 },
        { level: 5, value: 10, holyPower: 280 }
      ]),
      createMythNodeStat("pveCancelIgnorePenetration", 5, [
        { level: 1, value: 3, holyPower: 70 },
        { level: 2, value: 4, holyPower: 84 },
        { level: 3, value: 5, holyPower: 112 },
        { level: 4, value: 7, holyPower: 168 },
        { level: 5, value: 10, holyPower: 280 }
      ])
    ]
  },
  {
    nodeId: 10,
    isDataComplete: true,
    lastUpdated: new Date().toISOString(),
    notes: "Updated with accurate server data from myth-data-grouped.txt",
    availableStats: [
      createMythNodeStat("hp", 5, [
        { level: 1, value: 25, holyPower: 100 },
        { level: 2, value: 30, holyPower: 120 },
        { level: 3, value: 35, holyPower: 160 },
        { level: 4, value: 40, holyPower: 240 },
        { level: 5, value: 45, holyPower: 400 }
      ]),
      createMythNodeStat("pveDefense", 5, [
        { level: 1, value: 2, holyPower: 115 },
        { level: 2, value: 3, holyPower: 138 },
        { level: 3, value: 5, holyPower: 184 },
        { level: 4, value: 8, holyPower: 276 },
        { level: 5, value: 11, holyPower: 460 }
      ]),
      createMythNodeStat("pvpDefense", 5, [
        { level: 1, value: 2, holyPower: 115 },
        { level: 2, value: 3, holyPower: 138 },
        { level: 3, value: 5, holyPower: 184 },
        { level: 4, value: 8, holyPower: 276 },
        { level: 5, value: 11, holyPower: 460 }
      ]),
      createMythNodeStat("pveCancelIgnoreDamageReduction", 5, [
        { level: 1, value: 4, holyPower: 70 },
        { level: 2, value: 5, holyPower: 84 },
        { level: 3, value: 6, holyPower: 112 },
        { level: 4, value: 8, holyPower: 168 },
        { level: 5, value: 11, holyPower: 280 }
      ]),
      createMythNodeStat("pvpCancelIgnoreDamageReduction", 5, [
        { level: 1, value: 4, holyPower: 70 },
        { level: 2, value: 5, holyPower: 84 },
        { level: 3, value: 6, holyPower: 112 },
        { level: 4, value: 8, holyPower: 168 },
        { level: 5, value: 11, holyPower: 280 }
      ]),
      createMythNodeStat("pveIgnoreAccuracy", 10, [
        { level: 1, value: 2, holyPower: 48 },
        { level: 2, value: 3, holyPower: 60 },
        { level: 3, value: 4, holyPower: 72 },
        { level: 4, value: 5, holyPower: 78 },
        { level: 5, value: 6, holyPower: 84 },
        { level: 6, value: 7, holyPower: 90 },
        { level: 7, value: 8, holyPower: 96 },
        { level: 8, value: 11, holyPower: 120 },
        { level: 9, value: 15, holyPower: 144 },
        { level: 10, value: 21, holyPower: 240 }
      ]),
      createMythNodeStat("pvpIgnoreAccuracy", 10, [
        { level: 1, value: 2, holyPower: 48 },
        { level: 2, value: 3, holyPower: 60 },
        { level: 3, value: 4, holyPower: 72 },
        { level: 4, value: 5, holyPower: 78 },
        { level: 5, value: 6, holyPower: 84 },
        { level: 6, value: 7, holyPower: 90 },
        { level: 7, value: 8, holyPower: 96 },
        { level: 8, value: 11, holyPower: 120 },
        { level: 9, value: 15, holyPower: 144 },
        { level: 10, value: 21, holyPower: 240 }
      ])
    ]
  },
  {
    nodeId: 11,
    isDataComplete: true,
    lastUpdated: new Date().toISOString(),
    notes: "Updated with accurate server data from myth-data-grouped.txt",
    availableStats: [
      createMythNodeStat("pveDamageReduction", 5, [
        { level: 1, value: 2, holyPower: 60 },
        { level: 2, value: 3, holyPower: 72 },
        { level: 3, value: 6, holyPower: 96 },
        { level: 4, value: 10, holyPower: 144 },
        { level: 5, value: 14, holyPower: 240 }
      ]),
      createMythNodeStat("pvpDamageReduction", 5, [
        { level: 1, value: 2, holyPower: 60 },
        { level: 2, value: 3, holyPower: 72 },
        { level: 3, value: 6, holyPower: 96 },
        { level: 4, value: 10, holyPower: 144 },
        { level: 5, value: 14, holyPower: 240 }
      ])
    ]
  },
  {
    nodeId: [12, 14],
    isDataComplete: true,
    lastUpdated: new Date().toISOString(),
    notes: "Updated with accurate server data from myth-data-grouped.txt",
    availableStats: [
      createMythNodeStat("ignoreEvasion", 10, [
        { level: 1, value: 2, holyPower: 48 },
        { level: 2, value: 3, holyPower: 60 },
        { level: 3, value: 4, holyPower: 72 },
        { level: 4, value: 5, holyPower: 78 },
        { level: 5, value: 6, holyPower: 84 },
        { level: 6, value: 7, holyPower: 90 },
        { level: 7, value: 8, holyPower: 96 },
        { level: 8, value: 11, holyPower: 120 },
        { level: 9, value: 15, holyPower: 144 },
        { level: 10, value: 21, holyPower: 240 }
      ]),
      createMythNodeStat("ignoreDamageReduction", 5, [
        { level: 1, value: 4, holyPower: 70 },
        { level: 2, value: 5, holyPower: 84 },
        { level: 3, value: 6, holyPower: 112 },
        { level: 4, value: 8, holyPower: 168 },
        { level: 5, value: 11, holyPower: 280 }
      ]),
      createMythNodeStat("ignorePenetration", 5, [
        { level: 1, value: 5, holyPower: 115 },
        { level: 2, value: 6, holyPower: 138 },
        { level: 3, value: 7, holyPower: 184 },
        { level: 4, value: 9, holyPower: 276 },
        { level: 5, value: 13, holyPower: 460 }
      ]),
      createMythNodeStat("cancelIgnoreEvasion", 10, [
        { level: 1, value: 2, holyPower: 48 },
        { level: 2, value: 3, holyPower: 60 },
        { level: 3, value: 4, holyPower: 72 },
        { level: 4, value: 5, holyPower: 78 },
        { level: 5, value: 6, holyPower: 84 },
        { level: 6, value: 7, holyPower: 90 },
        { level: 7, value: 8, holyPower: 96 },
        { level: 8, value: 11, holyPower: 120 },
        { level: 9, value: 15, holyPower: 144 },
        { level: 10, value: 21, holyPower: 240 }
      ]),
      createMythNodeStat("cancelIgnoreDamageReduction", 5, [
        { level: 1, value: 4, holyPower: 70 },
        { level: 2, value: 5, holyPower: 84 },
        { level: 3, value: 6, holyPower: 112 },
        { level: 4, value: 8, holyPower: 168 },
        { level: 5, value: 11, holyPower: 280 }
      ]),
      createMythNodeStat("cancelIgnorePenetration", 5, [
        { level: 1, value: 5, holyPower: 115 },
        { level: 2, value: 6, holyPower: 138 },
        { level: 3, value: 7, holyPower: 184 },
        { level: 4, value: 9, holyPower: 276 },
        { level: 5, value: 13, holyPower: 460 }
      ])
    ]
  },
  {
    nodeId: 13,
    isDataComplete: true,
    lastUpdated: new Date().toISOString(),
    notes: "Updated with accurate server data from myth-data-grouped.txt - ForceID: 132 (normalDamageUp)",
    availableStats: [
      createMythNodeStat("normalDamageUp", 10, [
        { level: 1, value: 1, holyPower: 48 },
        { level: 2, value: 2, holyPower: 60 },
        { level: 3, value: 3, holyPower: 72 },
        { level: 4, value: 4, holyPower: 78 },
        { level: 5, value: 5, holyPower: 84 },
        { level: 6, value: 6, holyPower: 90 },
        { level: 7, value: 7, holyPower: 96 },
        { level: 8, value: 8, holyPower: 120 },
        { level: 9, value: 10, holyPower: 144 },
        { level: 10, value: 13, holyPower: 240 },
      ])
    ]
  },
  {
    nodeId: 15,
    isDataComplete: true,
    lastUpdated: new Date().toISOString(),
    notes: "Updated with accurate server data from myth-data-grouped.txt - ForceIDs: 216 (pveIgnoreDamageReduction), 217 (pvpIgnoreDamageReduction)",
    availableStats: [
      createMythNodeStat("pveIgnoreDamageReduction", 5, [
        { level: 1, value: 2, holyPower: 55 },
        { level: 2, value: 3, holyPower: 66 },
        { level: 3, value: 6, holyPower: 88 },
        { level: 4, value: 10, holyPower: 132 },
        { level: 5, value: 16, holyPower: 220 }
      ]),
      createMythNodeStat("pvpIgnoreDamageReduction", 5, [
        { level: 1, value: 2, holyPower: 55 },
        { level: 2, value: 3, holyPower: 66 },
        { level: 3, value: 6, holyPower: 88 },
        { level: 4, value: 10, holyPower: 132 },
        { level: 5, value: 16, holyPower: 220 }
      ]),
    ]
  },
  {
    nodeId: 16,
    isDataComplete: true,
    lastUpdated: new Date().toISOString(),
    notes: "Updated with accurate server data from myth-data-grouped.txt - ForceIDs: 180,181,208,209,212,213,216,217",
    availableStats: [
      createMythNodeStat("pveAllAttackUp", 5, [
        { level: 1, value: 4, holyPower: 100 },
        { level: 2, value: 5, holyPower: 120 },
        { level: 3, value: 6, holyPower: 160 },
        { level: 4, value: 8, holyPower: 240 },
        { level: 5, value: 11, holyPower: 400 }
      ]),
      createMythNodeStat("pvpAllAttackUp", 5, [
        { level: 1, value: 4, holyPower: 100 },
        { level: 2, value: 5, holyPower: 120 },
        { level: 3, value: 6, holyPower: 160 },
        { level: 4, value: 8, holyPower: 240 },
        { level: 5, value: 11, holyPower: 400 }
      ]),
      createMythNodeStat("pveCancelIgnorePenetration", 5, [
        { level: 1, value: 4, holyPower: 115 },
        { level: 2, value: 5, holyPower: 138 },
        { level: 3, value: 7, holyPower: 184 },
        { level: 4, value: 10, holyPower: 276 },
        { level: 5, value: 13, holyPower: 460 }
      ]),
      createMythNodeStat("pvpCancelIgnorePenetration", 5, [
        { level: 1, value: 4, holyPower: 115 },
        { level: 2, value: 5, holyPower: 138 },
        { level: 3, value: 7, holyPower: 184 },
        { level: 4, value: 10, holyPower: 276 },
        { level: 5, value: 13, holyPower: 460 }
      ]),
      createMythNodeStat("pveIgnoreEvasion", 10, [
        { level: 1, value: 2, holyPower: 48 },
        { level: 2, value: 3, holyPower: 60 },
        { level: 3, value: 4, holyPower: 72 },
        { level: 4, value: 5, holyPower: 78 },
        { level: 5, value: 6, holyPower: 84 },
        { level: 6, value: 7, holyPower: 90 },
        { level: 7, value: 8, holyPower: 96 },
        { level: 8, value: 11, holyPower: 120 },
        { level: 9, value: 15, holyPower: 144 },
        { level: 10, value: 21, holyPower: 240 }
      ]),
      createMythNodeStat("pvpIgnoreEvasion", 10, [
        { level: 1, value: 2, holyPower: 48 },
        { level: 2, value: 3, holyPower: 60 },
        { level: 3, value: 4, holyPower: 72 },
        { level: 4, value: 5, holyPower: 78 },
        { level: 5, value: 6, holyPower: 84 },
        { level: 6, value: 7, holyPower: 90 },
        { level: 7, value: 8, holyPower: 96 },
        { level: 8, value: 11, holyPower: 120 },
        { level: 9, value: 15, holyPower: 144 },
        { level: 10, value: 21, holyPower: 240 }
      ]),
      createMythNodeStat("pveIgnoreDamageReduction", 5, [
        { level: 1, value: 4, holyPower: 70 },
        { level: 2, value: 5, holyPower: 84 },
        { level: 3, value: 6, holyPower: 112 },
        { level: 4, value: 8, holyPower: 168 },
        { level: 5, value: 11, holyPower: 280 }
      ]),
      createMythNodeStat("pvpIgnoreDamageReduction", 5, [
        { level: 1, value: 4, holyPower: 70 },
        { level: 2, value: 5, holyPower: 84 },
        { level: 3, value: 6, holyPower: 112 },
        { level: 4, value: 8, holyPower: 168 },
        { level: 5, value: 11, holyPower: 280 }
      ])
    ]
  },
  {
    nodeId: [17, 18],
    isDataComplete: true,
    lastUpdated: new Date().toISOString(),
    notes: "Updated with accurate server data from myth-data-grouped.txt - ForceIDs: 1 (hp), 98 (resistCriticalDamage), 112 (resistSkillAmp), 190 (pveDefenseRate), 191 (pvpDefenseRate)",
    availableStats: [
      createMythNodeStat("hp", 5, [
        { level: 1, value: 10, holyPower: 70 },
        { level: 2, value: 15, holyPower: 84 },
        { level: 3, value: 20, holyPower: 112 },
        { level: 4, value: 25, holyPower: 168 },
        { level: 5, value: 35, holyPower: 280 }
      ]),
      createMythNodeStat("resistCriticalDamage", 2, [
        { level: 1, value: 1, holyPower: 132 },
        { level: 2, value: 2, holyPower: 220 },
      ]),
      createMythNodeStat("resistSkillAmp", 2, [
        { level: 1, value: 1, holyPower: 144 },
        { level: 2, value: 2, holyPower: 240 }
      ]),
      createMythNodeStat("pveDefenseRate", 10, [
        { level: 1, value: 4, holyPower: 40 },
        { level: 2, value: 8, holyPower: 50 },
        { level: 3, value: 12, holyPower: 60 },
        { level: 4, value: 16, holyPower: 65 },
        { level: 5, value: 20, holyPower: 70 },
        { level: 6, value: 24, holyPower: 75 },
        { level: 7, value: 28, holyPower: 80 },
        { level: 8, value: 36, holyPower: 100 },
        { level: 9, value: 48, holyPower: 120 },
        { level: 10, value: 64, holyPower: 200 }
      ]),
      createMythNodeStat("pvpDefenseRate", 10, [
        { level: 1, value: 4, holyPower: 40 },
        { level: 2, value: 8, holyPower: 50 },
        { level: 3, value: 12, holyPower: 60 },
        { level: 4, value: 16, holyPower: 65 },
        { level: 5, value: 20, holyPower: 70 },
        { level: 6, value: 24, holyPower: 75 },
        { level: 7, value: 28, holyPower: 80 },
        { level: 8, value: 36, holyPower: 100 },
        { level: 9, value: 48, holyPower: 120 },
        { level: 10, value: 64, holyPower: 200 }
      ])
    ]
  },
  {
    nodeId: [19,20,21,22],
    isDataComplete: true,
    lastUpdated: new Date().toISOString(),
    notes: "Updated with accurate server data from myth-data-grouped.txt - ForceIDs: 1 (hp), 6 (attackRate), 7 (defenseRate), 39 (addDamage), 98 (resistCriticalDamage), 127 (ignoreResistCriticalDamage)",
    availableStats: [
      createMythNodeStat("hp", 5, [
        { level: 1, value: 10, holyPower: 60 },
        { level: 2, value: 15, holyPower: 72 },
        { level: 3, value: 20, holyPower: 96 },
        { level: 4, value: 25, holyPower: 144 },
        { level: 5, value: 35, holyPower: 240 }
      ]),
      createMythNodeStat("attackRate", 10, [
        { level: 1, value: 4, holyPower: 40 },
        { level: 2, value: 8, holyPower: 50 },
        { level: 3, value: 12, holyPower: 60 },
        { level: 4, value: 16, holyPower: 65 },
        { level: 5, value: 20, holyPower: 70 },
        { level: 6, value: 24, holyPower: 75 },
        { level: 7, value: 28, holyPower: 80 },
        { level: 8, value: 36, holyPower: 100 },
        { level: 9, value: 48, holyPower: 120 },
        { level: 10, value: 64, holyPower: 200 }
      ]),
      createMythNodeStat("defenseRate", 10, [
        { level: 1, value: 4, holyPower: 40 },
        { level: 2, value: 8, holyPower: 50 },
        { level: 3, value: 12, holyPower: 60 },
        { level: 4, value: 16, holyPower: 65 },
        { level: 5, value: 20, holyPower: 70 },
        { level: 6, value: 24, holyPower: 75 },
        { level: 7, value: 28, holyPower: 80 },
        { level: 8, value: 36, holyPower: 100 },
        { level: 9, value: 48, holyPower: 120 },
        { level: 10, value: 64, holyPower: 200 }
      ]),
      createMythNodeStat("addDamage", 5, [
        { level: 1, value: 2, holyPower: 60 },
        { level: 2, value: 3, holyPower: 72 },
        { level: 3, value: 4, holyPower: 96 },
        { level: 4, value: 6, holyPower: 144 },
        { level: 5, value: 9, holyPower: 240 }
      ]),
      createMythNodeStat("resistCriticalDamage", 3, [
        { level: 1, value: 1, holyPower: 112 },
        { level: 2, value: 2, holyPower: 168 },
        { level: 3, value: 3, holyPower: 280 }
      ]),
      createMythNodeStat("ignoreResistCriticalDamage", 3, [
        { level: 1, value: 1, holyPower: 112 },
        { level: 2, value: 2, holyPower: 168 },
        { level: 3, value: 3, holyPower: 280 }
      ])
    ]
  },
  {
    nodeId: [23,24],
    isDataComplete: true,
    lastUpdated: new Date().toISOString(),
    notes: "Corrected with server data - all stats and holy power values verified",
    availableStats: [
      createMythNodeStat("pveAllAttackUp", 5, [
        { level: 1, value: 2, holyPower: 60 },
        { level: 2, value: 3, holyPower: 72 },
        { level: 3, value: 4, holyPower: 96 },
        { level: 4, value: 6, holyPower: 144 },
        { level: 5, value: 9, holyPower: 240 }
      ]),
      createMythNodeStat("pvpAllAttackUp", 5, [
        { level: 1, value: 2, holyPower: 60 },
        { level: 2, value: 3, holyPower: 72 },
        { level: 3, value: 4, holyPower: 96 },
        { level: 4, value: 6, holyPower: 144 },
        { level: 5, value: 9, holyPower: 240 }
      ]),
      createMythNodeStat("pveAttackRate", 10, [
        { level: 1, value: 4, holyPower: 40 },
        { level: 2, value: 8, holyPower: 50 },
        { level: 3, value: 12, holyPower: 60 },
        { level: 4, value: 16, holyPower: 65 },
        { level: 5, value: 20, holyPower: 70 },
        { level: 6, value: 24, holyPower: 75 },
        { level: 7, value: 28, holyPower: 80 },
        { level: 8, value: 36, holyPower: 100 },
        { level: 9, value: 48, holyPower: 120 },
        { level: 10, value: 64, holyPower: 200 }
      ]),
      createMythNodeStat("pvpAttackRate", 10, [
        { level: 1, value: 4, holyPower: 40 },
        { level: 2, value: 8, holyPower: 50 },
        { level: 3, value: 12, holyPower: 60 },
        { level: 4, value: 16, holyPower: 65 },
        { level: 5, value: 20, holyPower: 70 },
        { level: 6, value: 24, holyPower: 75 },
        { level: 7, value: 28, holyPower: 80 },
        { level: 8, value: 36, holyPower: 100 },
        { level: 9, value: 48, holyPower: 120 },
        { level: 10, value: 64, holyPower: 200 }
      ]),
      createMythNodeStat("pveAddDamage", 5, [
        { level: 1, value: 2, holyPower: 55 },
        { level: 2, value: 3, holyPower: 66 },
        { level: 3, value: 4, holyPower: 88 },
        { level: 4, value: 6, holyPower: 132 },
        { level: 5, value: 9, holyPower: 220 }
      ]),
      createMythNodeStat("pvpAddDamage", 5, [
        { level: 1, value: 2, holyPower: 55 },
        { level: 2, value: 3, holyPower: 66 },
        { level: 3, value: 4, holyPower: 88 },
        { level: 4, value: 6, holyPower: 132 },
        { level: 5, value: 9, holyPower: 220 }
      ]),
      createMythNodeStat("pveIgnoreResistCriticalDamage", 3, [
        { level: 1, value: 1, holyPower: 112 },
        { level: 2, value: 2, holyPower: 168 },
        { level: 3, value: 3, holyPower: 280 }
      ]),
      createMythNodeStat("pvpIgnoreResistCriticalDamage", 3, [
        { level: 1, value: 1, holyPower: 112 },
        { level: 2, value: 2, holyPower: 168 },
        { level: 3, value: 3, holyPower: 280 }
      ])
    ]
  },
   {
     nodeId: 25,
     isDataComplete: true,
     lastUpdated: new Date().toISOString(),
     notes: "Corrected with server data - all stats and holy power values verified",
     availableStats: [
       createMythNodeStat("hp", 5, [
         { level: 1, value: 25, holyPower: 115 },
         { level: 2, value: 30, holyPower: 138 },
         { level: 3, value: 35, holyPower: 184 },
         { level: 4, value: 40, holyPower: 276 },
         { level: 5, value: 50, holyPower: 460 }
       ]),
       createMythNodeStat("resistCriticalDamage", 2, [
         { level: 1, value: 2, holyPower: 168 },
         { level: 2, value: 3, holyPower: 280 }
       ]),
       createMythNodeStat("resistSkillAmp", 2, [
         { level: 1, value: 2, holyPower: 240 },
         { level: 2, value: 3, holyPower: 400 }
       ]),
       createMythNodeStat("pveDefenseRate", 10, [
         { level: 1, value: 8, holyPower: 48 },
         { level: 2, value: 12, holyPower: 60 },
         { level: 3, value: 16, holyPower: 72 },
         { level: 4, value: 20, holyPower: 78 },
         { level: 5, value: 24, holyPower: 84 },
         { level: 6, value: 28, holyPower: 90 },
         { level: 7, value: 32, holyPower: 96 },
         { level: 8, value: 44, holyPower: 120 },
         { level: 9, value: 60, holyPower: 144 },
         { level: 10, value: 84, holyPower: 240 }
       ]),
       createMythNodeStat("pvpDefenseRate", 10, [
         { level: 1, value: 8, holyPower: 48 },
         { level: 2, value: 12, holyPower: 60 },
         { level: 3, value: 16, holyPower: 72 },
         { level: 4, value: 20, holyPower: 78 },
         { level: 5, value: 24, holyPower: 84 },
         { level: 6, value: 28, holyPower: 90 },
         { level: 7, value: 32, holyPower: 96 },
         { level: 8, value: 44, holyPower: 120 },
         { level: 9, value: 60, holyPower: 144 },
         { level: 10, value: 84, holyPower: 240 }
       ])
     ]
   },
   {
     nodeId: 26,
     isDataComplete: true,
     lastUpdated: new Date().toISOString(),
     notes: "Corrected with server data - all stats and holy power values verified",
     availableStats: [
       createMythNodeStat("pveDefenseRate", 5, [
         { level: 1, value: 10, holyPower: 60 },
         { level: 2, value: 20, holyPower: 72 },
         { level: 3, value: 35, holyPower: 96 },
         { level: 4, value: 50, holyPower: 144 },
         { level: 5, value: 100, holyPower: 240 }
       ]),
       createMythNodeStat("pvpDefenseRate", 5, [
         { level: 1, value: 10, holyPower: 60 },
         { level: 2, value: 20, holyPower: 72 },
         { level: 3, value: 35, holyPower: 96 },
         { level: 4, value: 50, holyPower: 144 },
         { level: 5, value: 100, holyPower: 240 }
       ])
     ]
   },
   {
     nodeId: [27,29],
     isDataComplete: true,
     lastUpdated: new Date().toISOString(),
     notes: "Corrected with server data - all stats and holy power values verified - ForceIDs: 1 (hp), 6 (attackRate), 7 (defenseRate), 39 (addDamage), 98 (resistCriticalDamage), 127 (ignoreResistCriticalDamage)",
     availableStats: [
       createMythNodeStat("hp", 5, [
         { level: 1, value: 25, holyPower: 100 },
         { level: 2, value: 30, holyPower: 120 },
         { level: 3, value: 35, holyPower: 160 },
         { level: 4, value: 40, holyPower: 240 },
         { level: 5, value: 50, holyPower: 400 }
       ]),
       createMythNodeStat("attackRate", 10, [
         { level: 1, value: 8, holyPower: 48 },
         { level: 2, value: 12, holyPower: 60 },
         { level: 3, value: 16, holyPower: 72 },
         { level: 4, value: 20, holyPower: 78 },
         { level: 5, value: 24, holyPower: 84 },
         { level: 6, value: 28, holyPower: 90 },
         { level: 7, value: 32, holyPower: 96 },
         { level: 8, value: 44, holyPower: 120 },
         { level: 9, value: 60, holyPower: 144 },
         { level: 10, value: 84, holyPower: 240 }
       ]),
       createMythNodeStat("defenseRate", 10, [
         { level: 1, value: 8, holyPower: 48 },
         { level: 2, value: 12, holyPower: 60 },
         { level: 3, value: 16, holyPower: 72 },
         { level: 4, value: 20, holyPower: 78 },
         { level: 5, value: 24, holyPower: 84 },
         { level: 6, value: 28, holyPower: 90 },
         { level: 7, value: 32, holyPower: 96 },
         { level: 8, value: 44, holyPower: 120 },
         { level: 9, value: 60, holyPower: 144 },
         { level: 10, value: 84, holyPower: 240 }
       ]),
       createMythNodeStat("addDamage", 5, [
         { level: 1, value: 3, holyPower: 100 },
         { level: 2, value: 4, holyPower: 120 },
         { level: 3, value: 6, holyPower: 160 },
         { level: 4, value: 9, holyPower: 240 },
         { level: 5, value: 12, holyPower: 400 }
       ]),
       createMythNodeStat("resistCriticalDamage", 3, [
         { level: 1, value: 2, holyPower: 184 },
         { level: 2, value: 3, holyPower: 276 },
         { level: 3, value: 4, holyPower: 460 }
       ]),
       createMythNodeStat("ignoreResistCriticalDamage", 3, [
         { level: 1, value: 2, holyPower: 184 },
         { level: 2, value: 3, holyPower: 276 },
         { level: 3, value: 4, holyPower: 460 }
       ])
     ]
   },
   {
     nodeId: 28,
     isDataComplete: true,
     lastUpdated: new Date().toISOString(),
     notes: "Corrected with server data - all stats and holy power values verified - ForceID: 113 (allAttackUp)",
     availableStats: [
       createMythNodeStat("allAttackUp", 10, [
         { level: 1, value: 2, holyPower: 56 },
         { level: 2, value: 3, holyPower: 70 },
         { level: 3, value: 4, holyPower: 84 },
         { level: 4, value: 5, holyPower: 91 },
         { level: 5, value: 6, holyPower: 98 },
         { level: 6, value: 7, holyPower: 105 },
         { level: 7, value: 8, holyPower: 112 },
         { level: 8, value: 10, holyPower: 140 },
         { level: 9, value: 12, holyPower: 168 },
         { level: 10, value: 18, holyPower: 280 }
       ])
     ]
   },
   {
     nodeId: 30,
     isDataComplete: true,
     lastUpdated: new Date().toISOString(),
     notes: "Corrected with server data - all stats and holy power values verified - ForceIDs: 182 (pveAttackRate), 183 (pvpAttackRate)",
     availableStats: [
       createMythNodeStat("pveAttackRate", 5, [
         { level: 1, value: 10, holyPower: 55 },
         { level: 2, value: 20, holyPower: 66 },
         { level: 3, value: 35, holyPower: 88 },
         { level: 4, value: 50, holyPower: 132 },
         { level: 5, value: 100, holyPower: 220 }
       ]),
       createMythNodeStat("pvpAttackRate", 5, [
         { level: 1, value: 10, holyPower: 55 },
         { level: 2, value: 20, holyPower: 66 },
         { level: 3, value: 35, holyPower: 88 },
         { level: 4, value: 50, holyPower: 132 },
         { level: 5, value: 100, holyPower: 220 }
       ])
     ]
   },
   {
     nodeId: 31,
     isDataComplete: true,
     lastUpdated: new Date().toISOString(),
     notes: "Corrected with accurate server data from myth-data-grouped-mapped.txt - ForceIDs: 180 (pveAllAttackUp), 181 (pvpAllAttackUp), 182 (pveAttackRate), 183 (pvpAttackRate), 202 (pveAddDamage), 203 (pvpAddDamage), 206 (pveIgnoreResistCriticalDamage), 207 (pvpIgnoreResistCriticalDamage)",
     availableStats: [
       createMythNodeStat("pveAllAttackUp", 5, [
         { level: 1, value: 3, holyPower: 100 },
         { level: 2, value: 4, holyPower: 120 },
         { level: 3, value: 6, holyPower: 160 },
         { level: 4, value: 9, holyPower: 240 },
         { level: 5, value: 12, holyPower: 400 }
       ]),
       createMythNodeStat("pvpAllAttackUp", 5, [
         { level: 1, value: 3, holyPower: 100 },
         { level: 2, value: 4, holyPower: 120 },
         { level: 3, value: 6, holyPower: 160 },
         { level: 4, value: 9, holyPower: 240 },
         { level: 5, value: 12, holyPower: 400 }
       ]),
       createMythNodeStat("pveAttackRate", 10, [
         { level: 1, value: 8, holyPower: 48 },
         { level: 2, value: 12, holyPower: 60 },
         { level: 3, value: 16, holyPower: 72 },
         { level: 4, value: 20, holyPower: 78 },
         { level: 5, value: 24, holyPower: 84 },
         { level: 6, value: 28, holyPower: 90 },
         { level: 7, value: 32, holyPower: 96 },
         { level: 8, value: 44, holyPower: 120 },
         { level: 9, value: 60, holyPower: 144 },
         { level: 10, value: 84, holyPower: 240 }
       ]),
       createMythNodeStat("pvpAttackRate", 10, [
         { level: 1, value: 8, holyPower: 48 },
         { level: 2, value: 12, holyPower: 60 },
         { level: 3, value: 16, holyPower: 72 },
         { level: 4, value: 20, holyPower: 78 },
         { level: 5, value: 24, holyPower: 84 },
         { level: 6, value: 28, holyPower: 90 },
         { level: 7, value: 32, holyPower: 96 },
         { level: 8, value: 44, holyPower: 120 },
         { level: 9, value: 60, holyPower: 144 },
         { level: 10, value: 84, holyPower: 240 }
       ]),
       createMythNodeStat("pveAddDamage", 5, [
         { level: 1, value: 3, holyPower: 70 },
         { level: 2, value: 4, holyPower: 84 },
         { level: 3, value: 6, holyPower: 112 },
         { level: 4, value: 9, holyPower: 168 },
         { level: 5, value: 12, holyPower: 280 }
       ]),
       createMythNodeStat("pvpAddDamage", 5, [
         { level: 1, value: 3, holyPower: 70 },
         { level: 2, value: 4, holyPower: 84 },
         { level: 3, value: 6, holyPower: 112 },
         { level: 4, value: 9, holyPower: 168 },
         { level: 5, value: 12, holyPower: 280 }
       ]),
       createMythNodeStat("pveIgnoreResistCriticalDamage", 3, [
         { level: 1, value: 2, holyPower: 184 },
         { level: 2, value: 3, holyPower: 276 },
         { level: 3, value: 4, holyPower: 460 }
       ]),
       createMythNodeStat("pvpIgnoreResistCriticalDamage", 3, [
         { level: 1, value: 2, holyPower: 184 },
         { level: 2, value: 3, holyPower: 276 },
         { level: 3, value: 4, holyPower: 460 }
       ])
     ]
   },
   {
     nodeId: [32,33],
     isDataComplete: true,
     lastUpdated: new Date().toISOString(),
     notes: "Corrected with accurate server data from myth-data-grouped-mapped.txt - ForceIDs: 1 (hp), 98 (resistCriticalDamage), 112 (resistSkillAmp), 210 (pveIgnoreAccuracy), 211 (pvpIgnoreAccuracy)",
     availableStats: [
       createMythNodeStat("hp", 5, [
         { level: 1, value: 20, holyPower: 70 },
         { level: 2, value: 25, holyPower: 84 },
         { level: 3, value: 30, holyPower: 112 },
         { level: 4, value: 35, holyPower: 168 },
         { level: 5, value: 40, holyPower: 280 }
       ]),
       createMythNodeStat("resistCriticalDamage", 2, [
         { level: 1, value: 2, holyPower: 132 },
         { level: 2, value: 3, holyPower: 220 }
       ]),
       createMythNodeStat("resistSkillAmp", 2, [
         { level: 1, value: 2, holyPower: 144 },
         { level: 2, value: 3, holyPower: 240 }
       ]),
       createMythNodeStat("pveIgnoreAccuracy", 10, [
         { level: 1, value: 3, holyPower: 40 },
         { level: 2, value: 4, holyPower: 50 },
         { level: 3, value: 5, holyPower: 60 },
         { level: 4, value: 6, holyPower: 65 },
         { level: 5, value: 7, holyPower: 70 },
         { level: 6, value: 8, holyPower: 75 },
         { level: 7, value: 9, holyPower: 80 },
         { level: 8, value: 11, holyPower: 100 },
         { level: 9, value: 14, holyPower: 120 },
         { level: 10, value: 18, holyPower: 200 }
       ]),
       createMythNodeStat("pvpIgnoreAccuracy", 10, [
         { level: 1, value: 3, holyPower: 40 },
         { level: 2, value: 4, holyPower: 50 },
         { level: 3, value: 5, holyPower: 60 },
         { level: 4, value: 6, holyPower: 65 },
         { level: 5, value: 7, holyPower: 70 },
         { level: 6, value: 8, holyPower: 75 },
         { level: 7, value: 9, holyPower: 80 },
         { level: 8, value: 11, holyPower: 100 },
         { level: 9, value: 14, holyPower: 120 },
         { level: 10, value: 18, holyPower: 200 }
       ])
     ]
   },
   {
     nodeId: [34,35,36,37],
     isDataComplete: true,
     lastUpdated: new Date().toISOString(),
     notes: "Updated with 100% accurate server data. ForceID mappings: 5=defense, 71=ignoreEvasion, 73=ignoreDamageReduction, 75=cancelIgnoreEvasion, 81=cancelIgnoreDamageReduction, 113=allAttackUp",
     availableStats: [
       createMythNodeStat("defense", 5, [
         { level: 1, value: 3, holyPower: 70 },
         { level: 2, value: 4, holyPower: 84 },
         { level: 3, value: 5, holyPower: 112 },
         { level: 4, value: 7, holyPower: 168 },
         { level: 5, value: 10, holyPower: 280 }
       ]),
       createMythNodeStat("ignoreEvasion", 10, [
         { level: 1, value: 3, holyPower: 40 },
         { level: 2, value: 4, holyPower: 50 },
         { level: 3, value: 5, holyPower: 60 },
         { level: 4, value: 6, holyPower: 65 },
         { level: 5, value: 7, holyPower: 70 },
         { level: 6, value: 8, holyPower: 75 },
         { level: 7, value: 9, holyPower: 80 },
         { level: 8, value: 11, holyPower: 100 },
         { level: 9, value: 14, holyPower: 120 },
         { level: 10, value: 18, holyPower: 200 }
       ]),
       createMythNodeStat("ignoreDamageReduction", 5, [
         { level: 1, value: 2, holyPower: 55 },
         { level: 2, value: 3, holyPower: 66 },
         { level: 3, value: 4, holyPower: 88 },
         { level: 4, value: 6, holyPower: 132 },
         { level: 5, value: 9, holyPower: 220 }
       ]),
       createMythNodeStat("cancelIgnoreEvasion", 10, [
         { level: 1, value: 3, holyPower: 40 },
         { level: 2, value: 4, holyPower: 50 },
         { level: 3, value: 5, holyPower: 60 },
         { level: 4, value: 6, holyPower: 65 },
         { level: 5, value: 7, holyPower: 70 },
         { level: 6, value: 8, holyPower: 75 },
         { level: 7, value: 9, holyPower: 80 },
         { level: 8, value: 11, holyPower: 100 },
         { level: 9, value: 14, holyPower: 120 },
         { level: 10, value: 18, holyPower: 200 }
       ]),
       createMythNodeStat("cancelIgnoreDamageReduction", 5, [
         { level: 1, value: 2, holyPower: 55 },
         { level: 2, value: 3, holyPower: 66 },
         { level: 3, value: 4, holyPower: 88 },
         { level: 4, value: 6, holyPower: 132 },
         { level: 5, value: 9, holyPower: 220 }
       ]),
       createMythNodeStat("allAttackUp", 5, [
         { level: 1, value: 3, holyPower: 70 },
         { level: 2, value: 4, holyPower: 84 },
         { level: 3, value: 5, holyPower: 112 },
         { level: 4, value: 7, holyPower: 168 },
         { level: 5, value: 10, holyPower: 280 }
       ])
     ]
   },
   {
     nodeId: [38,39],
     isDataComplete: true,
     lastUpdated: new Date().toISOString(),
     notes: "Updated with 100% accurate server data. ForceID mappings: 163=pvePenetration, 180=pveAllAttackUp, 181=pvpAllAttackUp, 188=pvpPenetration, 212=pveIgnoreEvasion, 213=pvpIgnoreEvasion, 216=pveIgnoreDamageReduction, 217=pvpIgnoreDamageReduction",
     availableStats: [
       createMythNodeStat("pvePenetration", 5, [
         { level: 1, value: 2, holyPower: 70 },
         { level: 2, value: 3, holyPower: 84 },
         { level: 3, value: 5, holyPower: 112 },
         { level: 4, value: 8, holyPower: 168 },
         { level: 5, value: 11, holyPower: 280 }
       ]),
       createMythNodeStat("pveAllAttackUp", 5, [
         { level: 1, value: 3, holyPower: 60 },
         { level: 2, value: 4, holyPower: 72 },
         { level: 3, value: 5, holyPower: 96 },
         { level: 4, value: 7, holyPower: 144 },
         { level: 5, value: 10, holyPower: 240 }
       ]),
       createMythNodeStat("pvpAllAttackUp", 5, [
         { level: 1, value: 3, holyPower: 60 },
         { level: 2, value: 4, holyPower: 72 },
         { level: 3, value: 5, holyPower: 96 },
         { level: 4, value: 7, holyPower: 144 },
         { level: 5, value: 10, holyPower: 240 }
       ]),
       createMythNodeStat("pvpPenetration", 5, [
         { level: 1, value: 2, holyPower: 70 },
         { level: 2, value: 3, holyPower: 84 },
         { level: 3, value: 5, holyPower: 112 },
         { level: 4, value: 8, holyPower: 168 },
         { level: 5, value: 11, holyPower: 280 }
       ]),
       createMythNodeStat("pveIgnoreEvasion", 10, [
         { level: 1, value: 3, holyPower: 40 },
         { level: 2, value: 4, holyPower: 50 },
         { level: 3, value: 5, holyPower: 60 },
         { level: 4, value: 6, holyPower: 65 },
         { level: 5, value: 7, holyPower: 70 },
         { level: 6, value: 8, holyPower: 75 },
         { level: 7, value: 9, holyPower: 80 },
         { level: 8, value: 11, holyPower: 100 },
         { level: 9, value: 14, holyPower: 120 },
         { level: 10, value: 18, holyPower: 200 }
       ]),
       createMythNodeStat("pvpIgnoreEvasion", 10, [
         { level: 1, value: 3, holyPower: 40 },
         { level: 2, value: 4, holyPower: 50 },
         { level: 3, value: 5, holyPower: 60 },
         { level: 4, value: 6, holyPower: 65 },
         { level: 5, value: 7, holyPower: 70 },
         { level: 6, value: 8, holyPower: 75 },
         { level: 7, value: 9, holyPower: 80 },
         { level: 8, value: 11, holyPower: 100 },
         { level: 9, value: 14, holyPower: 120 },
         { level: 10, value: 18, holyPower: 200 }
       ]),
       createMythNodeStat("pveIgnoreDamageReduction", 5, [
         { level: 1, value: 2, holyPower: 55 },
         { level: 2, value: 3, holyPower: 66 },
         { level: 3, value: 4, holyPower: 88 },
         { level: 4, value: 6, holyPower: 132 },
         { level: 5, value: 9, holyPower: 220 }
       ]),
       createMythNodeStat("pvpIgnoreDamageReduction", 5, [
         { level: 1, value: 2, holyPower: 55 },
         { level: 2, value: 3, holyPower: 66 },
         { level: 3, value: 4, holyPower: 88 },
         { level: 4, value: 6, holyPower: 132 },
         { level: 5, value: 9, holyPower: 220 }
       ])
     ]
   },
   {
     nodeId: 40,
     isDataComplete: true,
     lastUpdated: new Date().toISOString(),
     notes: "Updated with 100% accurate server data. ForceID mappings: 1=hp, 98=resistCriticalDamage, 112=resistSkillAmp, 210=pveIgnoreAccuracy, 211=pvpIgnoreAccuracy",
     availableStats: [
       createMythNodeStat("hp", 5, [
         { level: 1, value: 30, holyPower: 115 },
         { level: 2, value: 35, holyPower: 138 },
         { level: 3, value: 40, holyPower: 184 },
         { level: 4, value: 45, holyPower: 276 },
         { level: 5, value: 55, holyPower: 460 }
       ]),
       createMythNodeStat("resistCriticalDamage", 2, [
         { level: 1, value: 3, holyPower: 168 },
         { level: 2, value: 4, holyPower: 280 }
       ]),
       createMythNodeStat("resistSkillAmp", 2, [
         { level: 1, value: 3, holyPower: 240 },
         { level: 2, value: 4, holyPower: 400 }
       ]),
       createMythNodeStat("pveIgnoreAccuracy", 10, [
         { level: 1, value: 4, holyPower: 48 },
         { level: 2, value: 5, holyPower: 60 },
         { level: 3, value: 6, holyPower: 72 },
         { level: 4, value: 7, holyPower: 78 },
         { level: 5, value: 8, holyPower: 84 },
         { level: 6, value: 9, holyPower: 90 },
         { level: 7, value: 10, holyPower: 96 },
         { level: 8, value: 13, holyPower: 120 },
         { level: 9, value: 17, holyPower: 144 },
         { level: 10, value: 24, holyPower: 240 }
       ]),
       createMythNodeStat("pvpIgnoreAccuracy", 10, [
         { level: 1, value: 4, holyPower: 48 },
         { level: 2, value: 5, holyPower: 60 },
         { level: 3, value: 6, holyPower: 72 },
         { level: 4, value: 7, holyPower: 78 },
         { level: 5, value: 8, holyPower: 84 },
         { level: 6, value: 9, holyPower: 90 },
         { level: 7, value: 10, holyPower: 96 },
         { level: 8, value: 13, holyPower: 120 },
         { level: 9, value: 17, holyPower: 144 },
         { level: 10, value: 24, holyPower: 240 }
       ])
     ]
   },
   {
     nodeId: 41,
     isDataComplete: true,
     lastUpdated: new Date().toISOString(),
     notes: "Updated with 100% accurate server data. ForceID mappings: 155=pveDefense, 189=pvpDefense",
     availableStats: [
       createMythNodeStat("pveDefense", 5, [
         { level: 1, value: 4, holyPower: 70 },
         { level: 2, value: 7, holyPower: 84 },
         { level: 3, value: 10, holyPower: 112 },
         { level: 4, value: 15, holyPower: 168 },
         { level: 5, value: 24, holyPower: 280 }
       ]),
       createMythNodeStat("pvpDefense", 5, [
         { level: 1, value: 4, holyPower: 70 },
         { level: 2, value: 7, holyPower: 84 },
         { level: 3, value: 10, holyPower: 112 },
         { level: 4, value: 15, holyPower: 168 },
         { level: 5, value: 24, holyPower: 280 }
       ])
     ]
   },
   {
     nodeId: [42,44],
     isDataComplete: true,
     lastUpdated: new Date().toISOString(),
     notes: "Updated with 100% accurate server data. ForceID mappings: 5=defense, 71=ignoreEvasion, 73=ignoreDamageReduction, 75=cancelIgnoreEvasion, 81=cancelIgnoreDamageReduction, 113=allAttackUp",
     availableStats: [
       createMythNodeStat("defense", 5, [
         { level: 1, value: 4, holyPower: 115 },
         { level: 2, value: 5, holyPower: 138 },
         { level: 3, value: 7, holyPower: 184 },
         { level: 4, value: 10, holyPower: 276 },
         { level: 5, value: 13, holyPower: 460 }
       ]),
       createMythNodeStat("ignoreEvasion", 10, [
         { level: 1, value: 4, holyPower: 48 },
         { level: 2, value: 5, holyPower: 60 },
         { level: 3, value: 6, holyPower: 72 },
         { level: 4, value: 7, holyPower: 78 },
         { level: 5, value: 8, holyPower: 84 },
         { level: 6, value: 9, holyPower: 90 },
         { level: 7, value: 10, holyPower: 96 },
         { level: 8, value: 13, holyPower: 120 },
         { level: 9, value: 17, holyPower: 144 },
         { level: 10, value: 24, holyPower: 240 }
       ]),
       createMythNodeStat("ignoreDamageReduction", 5, [
         { level: 1, value: 3, holyPower: 100 },
         { level: 2, value: 4, holyPower: 120 },
         { level: 3, value: 6, holyPower: 160 },
         { level: 4, value: 9, holyPower: 240 },
         { level: 5, value: 12, holyPower: 400 }
       ]),
       createMythNodeStat("cancelIgnoreEvasion", 10, [
         { level: 1, value: 4, holyPower: 48 },
         { level: 2, value: 5, holyPower: 60 },
         { level: 3, value: 6, holyPower: 72 },
         { level: 4, value: 7, holyPower: 78 },
         { level: 5, value: 8, holyPower: 84 },
         { level: 6, value: 9, holyPower: 90 },
         { level: 7, value: 10, holyPower: 96 },
         { level: 8, value: 13, holyPower: 120 },
         { level: 9, value: 17, holyPower: 144 },
         { level: 10, value: 24, holyPower: 240 }
       ]),
       createMythNodeStat("cancelIgnoreDamageReduction", 5, [
         { level: 1, value: 3, holyPower: 100 },
         { level: 2, value: 4, holyPower: 120 },
         { level: 3, value: 6, holyPower: 160 },
         { level: 4, value: 9, holyPower: 240 },
         { level: 5, value: 12, holyPower: 400 }
       ]),
       createMythNodeStat("allAttackUp", 5, [
         { level: 1, value: 4, holyPower: 115 },
         { level: 2, value: 5, holyPower: 138 },
         { level: 3, value: 7, holyPower: 184 },
         { level: 4, value: 10, holyPower: 276 },
         { level: 5, value: 13, holyPower: 460 }
       ])
     ]
   },
   {
     nodeId: 43,
     isDataComplete: true,
     lastUpdated: new Date().toISOString(),
     notes: "Updated with 100% accurate server data. ForceID mappings: 1=hp",
     availableStats: [
       createMythNodeStat("hp", 10, [
         { level: 1, value: 5, holyPower: 48 },
         { level: 2, value: 10, holyPower: 60 },
         { level: 3, value: 15, holyPower: 72 },
         { level: 4, value: 20, holyPower: 78 },
         { level: 5, value: 30, holyPower: 84 },
         { level: 6, value: 40, holyPower: 90 },
         { level: 7, value: 50, holyPower: 96 },
         { level: 8, value: 60, holyPower: 120 },
         { level: 9, value: 70, holyPower: 144 },
         { level: 10, value: 100, holyPower: 240 }
       ])
     ]
   },
   {
     nodeId: 45,
     isDataComplete: true,
     lastUpdated: new Date().toISOString(),
     notes: "Updated with 100% accurate server data. ForceID mappings: 180=pveAllAttackUp, 181=pvpAllAttackUp",
     availableStats: [
       createMythNodeStat("pveAllAttackUp", 5, [
         { level: 1, value: 4, holyPower: 60 },
         { level: 2, value: 6, holyPower: 72 },
         { level: 3, value: 9, holyPower: 96 },
         { level: 4, value: 13, holyPower: 144 },
         { level: 5, value: 22, holyPower: 240 }
       ]),
       createMythNodeStat("pvpAllAttackUp", 5, [
         { level: 1, value: 4, holyPower: 60 },
         { level: 2, value: 6, holyPower: 72 },
         { level: 3, value: 9, holyPower: 96 },
         { level: 4, value: 13, holyPower: 144 },
         { level: 5, value: 22, holyPower: 240 }
       ])
     ]
   },
   {
     nodeId: 46,
     isDataComplete: true,
     lastUpdated: new Date().toISOString(),
     notes: "Updated with 100% accurate server data. ForceID mappings: 163=pvePenetration, 180=pveAllAttackUp, 181=pvpAllAttackUp, 188=pvpPenetration, 212=pveIgnoreEvasion, 213=pvpIgnoreEvasion, 216=pveIgnoreDamageReduction, 217=pvpIgnoreDamageReduction",
     availableStats: [
       createMythNodeStat("pvePenetration", 5, [
         { level: 1, value: 7, holyPower: 115 },
         { level: 2, value: 8, holyPower: 138 },
         { level: 3, value: 10, holyPower: 184 },
         { level: 4, value: 13, holyPower: 276 },
         { level: 5, value: 16, holyPower: 460 }
       ]),
       createMythNodeStat("pveAllAttackUp", 5, [
         { level: 1, value: 4, holyPower: 100 },
         { level: 2, value: 5, holyPower: 120 },
         { level: 3, value: 7, holyPower: 160 },
         { level: 4, value: 10, holyPower: 240 },
         { level: 5, value: 13, holyPower: 400 }
       ]),
       createMythNodeStat("pvpAllAttackUp", 5, [
         { level: 1, value: 4, holyPower: 100 },
         { level: 2, value: 5, holyPower: 120 },
         { level: 3, value: 7, holyPower: 160 },
         { level: 4, value: 10, holyPower: 240 },
         { level: 5, value: 13, holyPower: 400 }
       ]),
       createMythNodeStat("pvpPenetration", 5, [
         { level: 1, value: 7, holyPower: 115 },
         { level: 2, value: 8, holyPower: 138 },
         { level: 3, value: 10, holyPower: 184 },
         { level: 4, value: 13, holyPower: 276 },
         { level: 5, value: 16, holyPower: 460 }
       ]),
       createMythNodeStat("pveIgnoreEvasion", 10, [
         { level: 1, value: 4, holyPower: 48 },
         { level: 2, value: 5, holyPower: 60 },
         { level: 3, value: 6, holyPower: 72 },
         { level: 4, value: 7, holyPower: 78 },
         { level: 5, value: 8, holyPower: 84 },
         { level: 6, value: 9, holyPower: 90 },
         { level: 7, value: 10, holyPower: 96 },
         { level: 8, value: 13, holyPower: 120 },
         { level: 9, value: 17, holyPower: 144 },
         { level: 10, value: 24, holyPower: 240 }
       ]),
       createMythNodeStat("pvpIgnoreEvasion", 10, [
         { level: 1, value: 4, holyPower: 48 },
         { level: 2, value: 5, holyPower: 60 },
         { level: 3, value: 6, holyPower: 72 },
         { level: 4, value: 7, holyPower: 78 },
         { level: 5, value: 8, holyPower: 84 },
         { level: 6, value: 9, holyPower: 90 },
         { level: 7, value: 10, holyPower: 96 },
         { level: 8, value: 13, holyPower: 120 },
         { level: 9, value: 17, holyPower: 144 },
         { level: 10, value: 24, holyPower: 240 }
       ]),
       createMythNodeStat("pveIgnoreDamageReduction", 5, [
         { level: 1, value: 3, holyPower: 70 },
         { level: 2, value: 4, holyPower: 84 },
         { level: 3, value: 6, holyPower: 112 },
         { level: 4, value: 9, holyPower: 168 },
         { level: 5, value: 12, holyPower: 280 }
       ]),
       createMythNodeStat("pvpIgnoreDamageReduction", 5, [
         { level: 1, value: 3, holyPower: 70 },
         { level: 2, value: 4, holyPower: 84 },
         { level: 3, value: 6, holyPower: 112 },
         { level: 4, value: 9, holyPower: 168 },
         { level: 5, value: 12, holyPower: 280 }
       ])
     ]
   },
   {
     nodeId: [47,48,53],
     isDataComplete: true,
     lastUpdated: new Date().toISOString(),
     notes: "Updated with 100% accurate server data. FIXED GROUPING: Added node 53 to match server data. ForceID mappings: 1=hp, 155=pveDefense, 189=pvpDefense, 190=pveDefenseRate, 191=pvpDefenseRate, 204=pveCancelIgnoreDamageReduction, 205=pvpCancelIgnoreDamageReduction",
     availableStats: [
       createMythNodeStat("hp", 5, [
         { level: 1, value: 25, holyPower: 60 },
         { level: 2, value: 30, holyPower: 72 },
         { level: 3, value: 35, holyPower: 96 },
         { level: 4, value: 40, holyPower: 144 },
         { level: 5, value: 45, holyPower: 240 }
       ]),
       createMythNodeStat("pveDefense", 5, [
         { level: 1, value: 5, holyPower: 70 },
         { level: 2, value: 6, holyPower: 84 },
         { level: 3, value: 7, holyPower: 112 },
         { level: 4, value: 9, holyPower: 168 },
         { level: 5, value: 12, holyPower: 280 }
       ]),
       createMythNodeStat("pvpDefense", 5, [
         { level: 1, value: 5, holyPower: 70 },
         { level: 2, value: 6, holyPower: 84 },
         { level: 3, value: 7, holyPower: 112 },
         { level: 4, value: 9, holyPower: 168 },
         { level: 5, value: 12, holyPower: 280 }
       ]),
       createMythNodeStat("pveDefenseRate", 10, [
         { level: 1, value: 12, holyPower: 40 },
         { level: 2, value: 16, holyPower: 50 },
         { level: 3, value: 20, holyPower: 60 },
         { level: 4, value: 24, holyPower: 65 },
         { level: 5, value: 28, holyPower: 70 },
         { level: 6, value: 32, holyPower: 75 },
         { level: 7, value: 36, holyPower: 80 },
         { level: 8, value: 44, holyPower: 100 },
         { level: 9, value: 56, holyPower: 120 },
         { level: 10, value: 72, holyPower: 200 }
       ]),
       createMythNodeStat("pvpDefenseRate", 10, [
         { level: 1, value: 12, holyPower: 40 },
         { level: 2, value: 16, holyPower: 50 },
         { level: 3, value: 20, holyPower: 60 },
         { level: 4, value: 24, holyPower: 65 },
         { level: 5, value: 28, holyPower: 70 },
         { level: 6, value: 32, holyPower: 75 },
         { level: 7, value: 36, holyPower: 80 },
         { level: 8, value: 44, holyPower: 100 },
         { level: 9, value: 56, holyPower: 120 },
         { level: 10, value: 72, holyPower: 200 }
       ]),
       createMythNodeStat("pveCancelIgnoreDamageReduction", 5, [
         { level: 1, value: 5, holyPower: 55 },
         { level: 2, value: 6, holyPower: 66 },
         { level: 3, value: 7, holyPower: 88 },
         { level: 4, value: 9, holyPower: 132 },
         { level: 5, value: 12, holyPower: 220 }
       ]),
       createMythNodeStat("pvpCancelIgnoreDamageReduction", 5, [
         { level: 1, value: 5, holyPower: 55 },
         { level: 2, value: 6, holyPower: 66 },
         { level: 3, value: 7, holyPower: 88 },
         { level: 4, value: 9, holyPower: 132 },
         { level: 5, value: 12, holyPower: 220 }
       ])
     ]
   },
   {
     nodeId: [49,50],
     isDataComplete: true,
     lastUpdated: new Date().toISOString(),
     notes: "Updated with accurate server data - NODES 49,50 (Mixed stats). ForceID mappings: 1=hp, 6=attackRate, 7=defenseRate, 39=addDamage, 78=damageReduction, 80=Penetration",
     availableStats: [
       createMythNodeStat("hp", 5, [
         { level: 1, value: 25, holyPower: 60 },
         { level: 2, value: 30, holyPower: 72 },
         { level: 3, value: 35, holyPower: 96 },
         { level: 4, value: 40, holyPower: 144 },
         { level: 5, value: 45, holyPower: 240 }
       ]),
       createMythNodeStat("attackRate", 10, [
         { level: 1, value: 12, holyPower: 40 },
         { level: 2, value: 16, holyPower: 50 },
         { level: 3, value: 20, holyPower: 60 },
         { level: 4, value: 24, holyPower: 65 },
         { level: 5, value: 28, holyPower: 70 },
         { level: 6, value: 32, holyPower: 75 },
         { level: 7, value: 36, holyPower: 80 },
         { level: 8, value: 44, holyPower: 100 },
         { level: 9, value: 56, holyPower: 120 },
         { level: 10, value: 72, holyPower: 200 }
       ]),
       createMythNodeStat("defenseRate", 10, [
         { level: 1, value: 12, holyPower: 40 },
         { level: 2, value: 16, holyPower: 50 },
         { level: 3, value: 20, holyPower: 60 },
         { level: 4, value: 24, holyPower: 65 },
         { level: 5, value: 28, holyPower: 70 },
         { level: 6, value: 32, holyPower: 75 },
         { level: 7, value: 36, holyPower: 80 },
         { level: 8, value: 44, holyPower: 100 },
         { level: 9, value: 56, holyPower: 120 },
         { level: 10, value: 72, holyPower: 200 }
       ]),
       createMythNodeStat("addDamage", 5, [
         { level: 1, value: 3, holyPower: 60 },
         { level: 2, value: 4, holyPower: 72 },
         { level: 3, value: 5, holyPower: 96 },
         { level: 4, value: 7, holyPower: 144 },
         { level: 5, value: 10, holyPower: 240 }
       ]),
       createMythNodeStat("damageReduction", 5, [
         { level: 1, value: 2, holyPower: 70 },
         { level: 2, value: 3, holyPower: 84 },
         { level: 3, value: 4, holyPower: 112 },
         { level: 4, value: 6, holyPower: 168 },
         { level: 5, value: 9, holyPower: 280 }
       ]),
       createMythNodeStat("penetration", 5, [
         { level: 1, value: 5, holyPower: 70 },
         { level: 2, value: 6, holyPower: 84 },
         { level: 3, value: 7, holyPower: 112 },
         { level: 4, value: 9, holyPower: 168 },
         { level: 5, value: 12, holyPower: 280 }
       ])
     ]
   },
   {
     nodeId: [51,52,59],
     isDataComplete: true,
     lastUpdated: new Date().toISOString(),
     notes: "Updated with accurate server data from myth-data-grouped-mapped.txt. ForceIDs 214,215 are PvP/PvE ignoreResistSkillAmp (assignment uncertain). ForceID mappings: 180=pveAllAttackUp, 181=pvpAllAttackUp, 182=pveAttackRate, 183=pvpAttackRate, 202=pveAddDamage, 203=pvpAddDamage, 214=ignoreResistSkillAmp(pvp?), 215=ignoreResistSkillAmp(pve?)",
     availableStats: [
       createMythNodeStat("pveAllAttackUp", 5, [
         { level: 1, value: 4, holyPower: 60 },
         { level: 2, value: 5, holyPower: 72 },
         { level: 3, value: 6, holyPower: 96 },
         { level: 4, value: 8, holyPower: 144 },
         { level: 5, value: 11, holyPower: 240 }
       ]),
       createMythNodeStat("pvpAllAttackUp", 5, [
         { level: 1, value: 4, holyPower: 60 },
         { level: 2, value: 5, holyPower: 72 },
         { level: 3, value: 6, holyPower: 96 },
         { level: 4, value: 8, holyPower: 144 },
         { level: 5, value: 11, holyPower: 240 }
       ]),
       createMythNodeStat("pveAttackRate", 10, [
         { level: 1, value: 12, holyPower: 40 },
         { level: 2, value: 16, holyPower: 50 },
         { level: 3, value: 20, holyPower: 60 },
         { level: 4, value: 24, holyPower: 65 },
         { level: 5, value: 28, holyPower: 70 },
         { level: 6, value: 32, holyPower: 75 },
         { level: 7, value: 36, holyPower: 80 },
         { level: 8, value: 44, holyPower: 100 },
         { level: 9, value: 56, holyPower: 120 },
         { level: 10, value: 72, holyPower: 200 }
       ]),
       createMythNodeStat("pvpAttackRate", 10, [
         { level: 1, value: 12, holyPower: 40 },
         { level: 2, value: 16, holyPower: 50 },
         { level: 3, value: 20, holyPower: 60 },
         { level: 4, value: 24, holyPower: 65 },
         { level: 5, value: 28, holyPower: 70 },
         { level: 6, value: 32, holyPower: 75 },
         { level: 7, value: 36, holyPower: 80 },
         { level: 8, value: 44, holyPower: 100 },
         { level: 9, value: 56, holyPower: 120 },
         { level: 10, value: 72, holyPower: 200 }
       ]),
       createMythNodeStat("pveAddDamage", 5, [
         { level: 1, value: 4, holyPower: 55 },
         { level: 2, value: 5, holyPower: 66 },
         { level: 3, value: 6, holyPower: 88 },
         { level: 4, value: 8, holyPower: 132 },
         { level: 5, value: 11, holyPower: 220 }
       ]),
       createMythNodeStat("pvpAddDamage", 5, [
         { level: 1, value: 4, holyPower: 55 },
         { level: 2, value: 5, holyPower: 66 },
         { level: 3, value: 6, holyPower: 88 },
         { level: 4, value: 8, holyPower: 132 },
         { level: 5, value: 11, holyPower: 220 }
       ]),
       createMythNodeStat("pvpIgnoreResistSkillAmp", 2, [
         { level: 1, value: 1, holyPower: 168 },
         { level: 2, value: 2, holyPower: 280 }
       ]),
       createMythNodeStat("pveIgnoreResistSkillAmp", 2, [
         { level: 1, value: 1, holyPower: 168 },
         { level: 2, value: 2, holyPower: 280 }
       ])
     ]
   },

   {
     nodeId: 54,
     isDataComplete: true,
     lastUpdated: new Date().toISOString(),
     notes: "Updated with accurate server data from myth-data-grouped-mapped.txt. ForceIDs 157,195 are PvP/PvE ignorePenetration (assignment uncertain). ForceID mappings: 157=ignorePenetration(pvp?), 195=ignorePenetration(pve?)",
     availableStats: [
       createMythNodeStat("pveIgnorePenetration", 5, [
         { level: 1, value: 3, holyPower: 60 },
         { level: 2, value: 5, holyPower: 72 },
         { level: 3, value: 8, holyPower: 96 },
         { level: 4, value: 12, holyPower: 144 },
         { level: 5, value: 20, holyPower: 240 }
       ]),
       createMythNodeStat("pvpIgnorePenetration", 5, [
         { level: 1, value: 3, holyPower: 60 },
         { level: 2, value: 5, holyPower: 72 },
         { level: 3, value: 8, holyPower: 96 },
         { level: 4, value: 12, holyPower: 144 },
         { level: 5, value: 20, holyPower: 240 }
       ])
     ]
   },
   {
     nodeId: [55, 57],
     isDataComplete: true,
     lastUpdated: new Date().toISOString(),
     notes: "Updated with accurate server data from myth-data-grouped-mapped.txt. ForceID mappings: 1=hp, 6=attackRate, 7=defenseRate, 39=addDamage, 78=damageReduction, 80=penetration",
     availableStats: [
       createMythNodeStat("hp", 5, [
         { level: 1, value: 35, holyPower: 100 },
         { level: 2, value: 40, holyPower: 120 },
         { level: 3, value: 45, holyPower: 160 },
         { level: 4, value: 50, holyPower: 240 },
         { level: 5, value: 60, holyPower: 400 }
       ]),
       createMythNodeStat("attackRate", 10, [
         { level: 1, value: 14, holyPower: 48 },
         { level: 2, value: 18, holyPower: 60 },
         { level: 3, value: 22, holyPower: 72 },
         { level: 4, value: 26, holyPower: 78 },
         { level: 5, value: 30, holyPower: 84 },
         { level: 6, value: 34, holyPower: 90 },
         { level: 7, value: 38, holyPower: 96 },
         { level: 8, value: 50, holyPower: 120 },
         { level: 9, value: 66, holyPower: 144 },
         { level: 10, value: 94, holyPower: 240 }
       ]),
       createMythNodeStat("defenseRate", 10, [
         { level: 1, value: 14, holyPower: 48 },
         { level: 2, value: 18, holyPower: 60 },
         { level: 3, value: 22, holyPower: 72 },
         { level: 4, value: 26, holyPower: 78 },
         { level: 5, value: 30, holyPower: 84 },
         { level: 6, value: 34, holyPower: 90 },
         { level: 7, value: 38, holyPower: 96 },
         { level: 8, value: 50, holyPower: 120 },
         { level: 9, value: 66, holyPower: 144 },
         { level: 10, value: 94, holyPower: 240 }
       ]),
       createMythNodeStat("addDamage", 5, [
         { level: 1, value: 4, holyPower: 100 },
         { level: 2, value: 5, holyPower: 120 },
         { level: 3, value: 7, holyPower: 160 },
         { level: 4, value: 10, holyPower: 240 },
         { level: 5, value: 13, holyPower: 400 }
       ]),
       createMythNodeStat("damageReduction", 5, [
         { level: 1, value: 3, holyPower: 115 },
         { level: 2, value: 4, holyPower: 138 },
         { level: 3, value: 6, holyPower: 184 },
         { level: 4, value: 9, holyPower: 276 },
         { level: 5, value: 12, holyPower: 460 }
       ]),
       createMythNodeStat("penetration", 5, [
         { level: 1, value: 7, holyPower: 115 },
         { level: 2, value: 8, holyPower: 138 },
         { level: 3, value: 10, holyPower: 184 },
         { level: 4, value: 13, holyPower: 276 },
         { level: 5, value: 16, holyPower: 460 }
       ])
     ]
   },
   {
     nodeId: 56,
     isDataComplete: true,
     lastUpdated: new Date().toISOString(),
     notes: "Updated with server data - node 56. ForceID 5 → defense (10 levels)",
     availableStats: [
       createMythNodeStat("defense", 10, [
         { level: 1, value: 4, holyPower: 56 },
         { level: 2, value: 6, holyPower: 70 },
         { level: 3, value: 8, holyPower: 84 },
         { level: 4, value: 10, holyPower: 91 },
         { level: 5, value: 12, holyPower: 98 },
         { level: 6, value: 14, holyPower: 105 },
         { level: 7, value: 16, holyPower: 112 },
         { level: 8, value: 18, holyPower: 140 },
         { level: 9, value: 21, holyPower: 168 },
         { level: 10, value: 30, holyPower: 280 }
       ])
     ]
   },
   {
     nodeId: 58,
     isDataComplete: true,
     lastUpdated: new Date().toISOString(),
     notes: "Updated with server data - node 58. ForceID 208 → pveCancelIgnorePenetration, ForceID 209 → pvpCancelIgnorePenetration (5 levels each)",
     availableStats: [
       createMythNodeStat("pveCancelIgnorePenetration", 5, [
         { level: 1, value: 3, holyPower: 70 },
         { level: 2, value: 5, holyPower: 84 },
         { level: 3, value: 8, holyPower: 112 },
         { level: 4, value: 12, holyPower: 168 },
         { level: 5, value: 20, holyPower: 280 }
       ]),
       createMythNodeStat("pvpCancelIgnorePenetration", 5, [
         { level: 1, value: 3, holyPower: 70 },
         { level: 2, value: 5, holyPower: 84 },
         { level: 3, value: 8, holyPower: 112 },
         { level: 4, value: 12, holyPower: 168 },
         { level: 5, value: 20, holyPower: 280 }
       ])
     ]
   },
   {
     nodeId: [60, 62, 67],
     isDataComplete: true,
     lastUpdated: new Date().toISOString(),
     notes: "Updated with server data - nodes 60,62,67. ForceID 1 → hp (5 levels), ForceID 157/195 → ignorePenetration (assignment uncertain, 5 levels), ForceID 192/193 → evasion (assignment uncertain, 10 levels), ForceID 204/205 → cancelIgnoreDamageReduction (5 levels each)",
     availableStats: [
       createMythNodeStat("hp", 5, [
         { level: 1, value: 40, holyPower: 100 },
         { level: 2, value: 45, holyPower: 120 },
         { level: 3, value: 50, holyPower: 160 },
         { level: 4, value: 55, holyPower: 240 },
         { level: 5, value: 65, holyPower: 400 }
       ]),
       createMythNodeStat("pveIgnorePenetration", 5, [
         { level: 1, value: 12, holyPower: 115 },
         { level: 2, value: 13, holyPower: 138 },
         { level: 3, value: 15, holyPower: 184 },
         { level: 4, value: 18, holyPower: 276 },
         { level: 5, value: 21, holyPower: 460 }
       ]),
       createMythNodeStat("pveEvasion", 10, [
         { level: 1, value: 8, holyPower: 48 },
         { level: 2, value: 12, holyPower: 60 },
         { level: 3, value: 16, holyPower: 72 },
         { level: 4, value: 20, holyPower: 78 },
         { level: 5, value: 24, holyPower: 84 },
         { level: 6, value: 28, holyPower: 90 },
         { level: 7, value: 32, holyPower: 96 },
         { level: 8, value: 44, holyPower: 120 },
         { level: 9, value: 60, holyPower: 144 },
         { level: 10, value: 84, holyPower: 240 }
       ]),
       createMythNodeStat("pvpEvasion", 10, [
         { level: 1, value: 8, holyPower: 48 },
         { level: 2, value: 12, holyPower: 60 },
         { level: 3, value: 16, holyPower: 72 },
         { level: 4, value: 20, holyPower: 78 },
         { level: 5, value: 24, holyPower: 84 },
         { level: 6, value: 28, holyPower: 90 },
         { level: 7, value: 32, holyPower: 96 },
         { level: 8, value: 44, holyPower: 120 },
         { level: 9, value: 60, holyPower: 144 },
         { level: 10, value: 84, holyPower: 240 }
       ]),
       createMythNodeStat("pvpIgnorePenetration", 5, [
         { level: 1, value: 12, holyPower: 115 },
         { level: 2, value: 13, holyPower: 138 },
         { level: 3, value: 15, holyPower: 184 },
         { level: 4, value: 18, holyPower: 276 },
         { level: 5, value: 21, holyPower: 460 }
       ]),
       createMythNodeStat("pveCancelIgnoreDamageReduction", 5, [
         { level: 1, value: 10, holyPower: 70 },
         { level: 2, value: 11, holyPower: 84 },
         { level: 3, value: 13, holyPower: 112 },
         { level: 4, value: 16, holyPower: 168 },
         { level: 5, value: 19, holyPower: 280 }
       ]),
       createMythNodeStat("pvpCancelIgnoreDamageReduction", 5, [
         { level: 1, value: 10, holyPower: 70 },
         { level: 2, value: 11, holyPower: 84 },
         { level: 3, value: 13, holyPower: 112 },
         { level: 4, value: 16, holyPower: 168 },
         { level: 5, value: 19, holyPower: 280 }
       ])
     ]
   },
   {
     nodeId: [61, 70, 71],
     isDataComplete: true,
     lastUpdated: new Date().toISOString(),
     notes: "Updated with server data - nodes 61,70,71. ForceID 1 → hp (5 levels), ForceID 157/195 → ignorePenetration (assignment uncertain, 5 levels), ForceID 192/193 → evasion (assignment uncertain, 10 levels), ForceID 204/205 → cancelIgnoreDamageReduction (5 levels each)",
     availableStats: [
       createMythNodeStat("hp", 5, [
         { level: 1, value: 25, holyPower: 60 },
         { level: 2, value: 30, holyPower: 72 },
         { level: 3, value: 35, holyPower: 96 },
         { level: 4, value: 40, holyPower: 144 },
         { level: 5, value: 50, holyPower: 240 }
       ]),
       createMythNodeStat("pveIgnorePenetration", 5, [
         { level: 1, value: 5, holyPower: 70 },
         { level: 2, value: 7, holyPower: 84 },
         { level: 3, value: 9, holyPower: 112 },
         { level: 4, value: 12, holyPower: 168 },
         { level: 5, value: 16, holyPower: 280 }
       ]),
       createMythNodeStat("pveEvasion", 10, [
         { level: 1, value: 4, holyPower: 40 },
         { level: 2, value: 8, holyPower: 50 },
         { level: 3, value: 12, holyPower: 60 },
         { level: 4, value: 16, holyPower: 65 },
         { level: 5, value: 20, holyPower: 70 },
         { level: 6, value: 24, holyPower: 75 },
         { level: 7, value: 28, holyPower: 80 },
         { level: 8, value: 36, holyPower: 100 },
         { level: 9, value: 48, holyPower: 120 },
         { level: 10, value: 64, holyPower: 200 }
       ]),
       createMythNodeStat("pvpEvasion", 10, [
         { level: 1, value: 4, holyPower: 40 },
         { level: 2, value: 8, holyPower: 50 },
         { level: 3, value: 12, holyPower: 60 },
         { level: 4, value: 16, holyPower: 65 },
         { level: 5, value: 20, holyPower: 70 },
         { level: 6, value: 24, holyPower: 75 },
         { level: 7, value: 28, holyPower: 80 },
         { level: 8, value: 36, holyPower: 100 },
         { level: 9, value: 48, holyPower: 120 },
         { level: 10, value: 64, holyPower: 200 }
       ]),
       createMythNodeStat("pvpIgnorePenetration", 5, [
         { level: 1, value: 5, holyPower: 70 },
         { level: 2, value: 7, holyPower: 84 },
         { level: 3, value: 9, holyPower: 112 },
         { level: 4, value: 12, holyPower: 168 },
         { level: 5, value: 16, holyPower: 280 }
       ]),
       createMythNodeStat("pveCancelIgnoreDamageReduction", 5, [
         { level: 1, value: 7, holyPower: 55 },
         { level: 2, value: 8, holyPower: 66 },
         { level: 3, value: 9, holyPower: 88 },
         { level: 4, value: 11, holyPower: 132 },
         { level: 5, value: 14, holyPower: 220 }
       ]),
       createMythNodeStat("pvpCancelIgnoreDamageReduction", 5, [
         { level: 1, value: 7, holyPower: 55 },
         { level: 2, value: 8, holyPower: 66 },
         { level: 3, value: 9, holyPower: 88 },
         { level: 4, value: 11, holyPower: 132 },
         { level: 5, value: 14, holyPower: 220 }
       ])
     ]
   },
   {
     nodeId: 68,
     isDataComplete: true,
     lastUpdated: new Date().toISOString(),
     notes: "Updated with server data - node 68. ForceID 1 → hp (5 levels), ForceID 5 → defense (5 levels), ForceID 8 → criticalDamage (3 levels), ForceID 36 → evasion (10 levels), ForceID 79 → accuracy (10 levels), ForceID 132 → normalDamageUp (5 levels)",
     availableStats: [
       createMythNodeStat("hp", 5, [
         { level: 1, value: 40, holyPower: 100 },
         { level: 2, value: 45, holyPower: 120 },
         { level: 3, value: 50, holyPower: 160 },
         { level: 4, value: 55, holyPower: 240 },
         { level: 5, value: 65, holyPower: 400 }
       ]),
       createMythNodeStat("defense", 5, [
         { level: 1, value: 10, holyPower: 115 },
         { level: 2, value: 11, holyPower: 138 },
         { level: 3, value: 13, holyPower: 184 },
         { level: 4, value: 16, holyPower: 276 },
         { level: 5, value: 19, holyPower: 460 }
       ]),
       createMythNodeStat("criticalDamage", 3, [
         { level: 1, value: 2, holyPower: 184 },
         { level: 2, value: 3, holyPower: 276 },
         { level: 3, value: 6, holyPower: 460 }
       ]),
       createMythNodeStat("evasion", 10, [
         { level: 1, value: 8, holyPower: 48 },
         { level: 2, value: 12, holyPower: 60 },
         { level: 3, value: 16, holyPower: 72 },
         { level: 4, value: 20, holyPower: 78 },
         { level: 5, value: 24, holyPower: 84 },
         { level: 6, value: 28, holyPower: 90 },
         { level: 7, value: 32, holyPower: 96 },
         { level: 8, value: 44, holyPower: 120 },
         { level: 9, value: 60, holyPower: 144 },
         { level: 10, value: 84, holyPower: 240 }
       ]),
       createMythNodeStat("accuracy", 10, [
         { level: 1, value: 25, holyPower: 48 },
         { level: 2, value: 26, holyPower: 60 },
         { level: 3, value: 27, holyPower: 72 },
         { level: 4, value: 28, holyPower: 78 },
         { level: 5, value: 29, holyPower: 84 },
         { level: 6, value: 30, holyPower: 90 },
         { level: 7, value: 31, holyPower: 96 },
         { level: 8, value: 33, holyPower: 120 },
         { level: 9, value: 36, holyPower: 144 },
         { level: 10, value: 40, holyPower: 240 }
       ]),
       createMythNodeStat("normalDamageUp", 5, [
         { level: 1, value: 1, holyPower: 100 },
         { level: 2, value: 2, holyPower: 120 },
         { level: 3, value: 3, holyPower: 160 },
         { level: 4, value: 5, holyPower: 240 },
         { level: 5, value: 7, holyPower: 400 }
       ])
     ]
   },
   {
     nodeId: [63, 72, 73],
     isDataComplete: true,
     lastUpdated: new Date().toISOString(),
     notes: "Updated with server data - nodes 63,72,73. ForceID 1 → hp (5 levels), ForceID 5 → defense (5 levels), ForceID 8 → criticalDamage (3 levels), ForceID 36 → evasion (10 levels), ForceID 79 → accuracy (10 levels), ForceID 132 → normalDamageUp (5 levels)",
     availableStats: [
       createMythNodeStat("hp", 5, [
         { level: 1, value: 25, holyPower: 60 },
         { level: 2, value: 30, holyPower: 72 },
         { level: 3, value: 35, holyPower: 96 },
         { level: 4, value: 40, holyPower: 144 },
         { level: 5, value: 50, holyPower: 240 }
       ]),
       createMythNodeStat("defense", 5, [
         { level: 1, value: 7, holyPower: 70 },
         { level: 2, value: 8, holyPower: 84 },
         { level: 3, value: 9, holyPower: 112 },
         { level: 4, value: 11, holyPower: 168 },
         { level: 5, value: 14, holyPower: 280 }
       ]),
       createMythNodeStat("criticalDamage", 3, [
         { level: 1, value: 1, holyPower: 112 },
         { level: 2, value: 2, holyPower: 168 },
         { level: 3, value: 4, holyPower: 280 }
       ]),
       createMythNodeStat("evasion", 10, [
         { level: 1, value: 4, holyPower: 40 },
         { level: 2, value: 8, holyPower: 50 },
         { level: 3, value: 12, holyPower: 60 },
         { level: 4, value: 16, holyPower: 65 },
         { level: 5, value: 20, holyPower: 70 },
         { level: 6, value: 24, holyPower: 75 },
         { level: 7, value: 28, holyPower: 80 },
         { level: 8, value: 36, holyPower: 100 },
         { level: 9, value: 48, holyPower: 120 },
         { level: 10, value: 64, holyPower: 200 }
       ]),
       createMythNodeStat("accuracy", 10, [
         { level: 1, value: 15, holyPower: 40 },
         { level: 2, value: 16, holyPower: 50 },
         { level: 3, value: 17, holyPower: 60 },
         { level: 4, value: 18, holyPower: 65 },
         { level: 5, value: 19, holyPower: 70 },
         { level: 6, value: 20, holyPower: 75 },
         { level: 7, value: 21, holyPower: 80 },
         { level: 8, value: 23, holyPower: 100 },
         { level: 9, value: 26, holyPower: 120 },
         { level: 10, value: 30, holyPower: 200 }
       ]),
       createMythNodeStat("normalDamageUp", 5, [
         { level: 1, value: 1, holyPower: 55 },
         { level: 2, value: 2, holyPower: 66 },
         { level: 3, value: 3, holyPower: 88 },
         { level: 4, value: 4, holyPower: 132 },
         { level: 5, value: 5, holyPower: 220 }
       ])
     ]
   },
   {
     nodeId: [64, 66, 69],
     isDataComplete: true, // Updated with accurate server data
     lastUpdated: new Date().toISOString(),
     notes: "Updated with accurate server data from myth-data-grouped-mapped.txt. ForceIDs: 158/173 (criticalDamage), 180/181 (allAttackUp), 186/187 (accuracy), 198/199 (normalDamageUp)",
     availableStats: [
       createMythNodeStat("pvpCriticalDamage", 3, [
         { level: 1, value: 2, holyPower: 184 },
         { level: 2, value: 3, holyPower: 276 },
         { level: 3, value: 6, holyPower: 460 }
       ]),
       createMythNodeStat("pveCriticalDamage", 3, [
         { level: 1, value: 2, holyPower: 184 },
         { level: 2, value: 3, holyPower: 276 },
         { level: 3, value: 6, holyPower: 460 }
       ]),
       createMythNodeStat("pveAllAttackUp", 5, [
         { level: 1, value: 7, holyPower: 100 },
         { level: 2, value: 8, holyPower: 120 },
         { level: 3, value: 10, holyPower: 160 },
         { level: 4, value: 13, holyPower: 240 },
         { level: 5, value: 16, holyPower: 400 }
       ]),
       createMythNodeStat("pvpAllAttackUp", 5, [
         { level: 1, value: 7, holyPower: 100 },
         { level: 2, value: 8, holyPower: 120 },
         { level: 3, value: 10, holyPower: 160 },
         { level: 4, value: 13, holyPower: 240 },
         { level: 5, value: 16, holyPower: 400 }
       ]),
       createMythNodeStat("pveAccuracy", 10, [
         { level: 1, value: 25, holyPower: 48 },
         { level: 2, value: 26, holyPower: 60 },
         { level: 3, value: 27, holyPower: 72 },
         { level: 4, value: 28, holyPower: 78 },
         { level: 5, value: 29, holyPower: 84 },
         { level: 6, value: 30, holyPower: 90 },
         { level: 7, value: 31, holyPower: 96 },
         { level: 8, value: 33, holyPower: 120 },
         { level: 9, value: 36, holyPower: 144 },
         { level: 10, value: 40, holyPower: 240 }
       ]),
       createMythNodeStat("pvpAccuracy", 10, [
         { level: 1, value: 25, holyPower: 48 },
         { level: 2, value: 26, holyPower: 60 },
         { level: 3, value: 27, holyPower: 72 },
         { level: 4, value: 28, holyPower: 78 },
         { level: 5, value: 29, holyPower: 84 },
         { level: 6, value: 30, holyPower: 90 },
         { level: 7, value: 31, holyPower: 96 },
         { level: 8, value: 33, holyPower: 120 },
         { level: 9, value: 36, holyPower: 144 },
         { level: 10, value: 40, holyPower: 240 }
       ]),
       createMythNodeStat("pveNormalDamageUp", 5, [
         { level: 1, value: 1, holyPower: 70 },
         { level: 2, value: 2, holyPower: 84 },
         { level: 3, value: 3, holyPower: 112 },
         { level: 4, value: 5, holyPower: 168 },
         { level: 5, value: 7, holyPower: 280 }
       ]),
       createMythNodeStat("pvpNormalDamageUp", 5, [
         { level: 1, value: 1, holyPower: 70 },
         { level: 2, value: 2, holyPower: 84 },
         { level: 3, value: 3, holyPower: 112 },
         { level: 4, value: 5, holyPower: 168 },
         { level: 5, value: 7, holyPower: 280 }
       ])
     ]
   },
   {
     nodeId: [65, 74, 75],
     isDataComplete: true, // Updated with accurate server data
     lastUpdated: new Date().toISOString(),
     notes: "Updated with accurate server data from myth-data-grouped-mapped.txt. ForceIDs: 158/173 (criticalDamage), 180/181 (allAttackUp), 186/187 (accuracy), 198/199 (normalDamageUp). Fixed grouping - was incorrectly split as separate nodes.",
     availableStats: [
       createMythNodeStat("pvpCriticalDamage", 3, [
         { level: 1, value: 1, holyPower: 112 },
         { level: 2, value: 2, holyPower: 168 },
         { level: 3, value: 4, holyPower: 280 }
       ]),
       createMythNodeStat("pveCriticalDamage", 3, [
         { level: 1, value: 1, holyPower: 112 },
         { level: 2, value: 2, holyPower: 168 },
         { level: 3, value: 4, holyPower: 280 }
       ]),
       createMythNodeStat("pveAllAttackUp", 5, [
         { level: 1, value: 5, holyPower: 60 },
         { level: 2, value: 6, holyPower: 72 },
         { level: 3, value: 7, holyPower: 96 },
         { level: 4, value: 9, holyPower: 144 },
         { level: 5, value: 12, holyPower: 240 }
       ]),
       createMythNodeStat("pvpAllAttackUp", 5, [
         { level: 1, value: 5, holyPower: 60 },
         { level: 2, value: 6, holyPower: 72 },
         { level: 3, value: 7, holyPower: 96 },
         { level: 4, value: 9, holyPower: 144 },
         { level: 5, value: 12, holyPower: 240 }
       ]),
       createMythNodeStat("pveAccuracy", 10, [
         { level: 1, value: 15, holyPower: 40 },
         { level: 2, value: 16, holyPower: 50 },
         { level: 3, value: 17, holyPower: 60 },
         { level: 4, value: 18, holyPower: 65 },
         { level: 5, value: 19, holyPower: 70 },
         { level: 6, value: 20, holyPower: 75 },
         { level: 7, value: 21, holyPower: 80 },
         { level: 8, value: 23, holyPower: 100 },
         { level: 9, value: 26, holyPower: 120 },
         { level: 10, value: 30, holyPower: 200 }
       ]),
       createMythNodeStat("pvpAccuracy", 10, [
         { level: 1, value: 15, holyPower: 40 },
         { level: 2, value: 16, holyPower: 50 },
         { level: 3, value: 17, holyPower: 60 },
         { level: 4, value: 18, holyPower: 65 },
         { level: 5, value: 19, holyPower: 70 },
         { level: 6, value: 20, holyPower: 75 },
         { level: 7, value: 21, holyPower: 80 },
         { level: 8, value: 23, holyPower: 100 },
         { level: 9, value: 26, holyPower: 120 },
         { level: 10, value: 30, holyPower: 200 }
       ]),
       createMythNodeStat("pveNormalDamageUp", 5, [
         { level: 1, value: 1, holyPower: 55 },
         { level: 2, value: 2, holyPower: 66 },
         { level: 3, value: 3, holyPower: 88 },
         { level: 4, value: 4, holyPower: 132 },
         { level: 5, value: 5, holyPower: 220 }
       ]),
       createMythNodeStat("pvpNormalDamageUp", 5, [
         { level: 1, value: 1, holyPower: 55 },
         { level: 2, value: 2, holyPower: 66 },
         { level: 3, value: 3, holyPower: 88 },
         { level: 4, value: 4, holyPower: 132 },
         { level: 5, value: 5, holyPower: 220 }
       ])
     ]
   },
   {
     nodeId: 78,
     isDataComplete: true,
     lastUpdated: new Date().toISOString(),
     notes: "Updated with server data - node 78. ForceID 153 → pveAllSkillAmp (3 levels), ForceID 163 → pvePenetration (5 levels), ForceID 172 → pvpAllSkillAmp (3 levels), ForceID 180 → pveAllAttackUp (5 levels), ForceID 181 → pvpAllAttackUp (5 levels), ForceID 188 → pvpPenetration (5 levels), ForceID 198 → pveNormalDamageUp (5 levels), ForceID 199 → pvpNormalDamageUp (5 levels)",
     availableStats: [
       createMythNodeStat("pveAllSkillAmp", 3, [
         { level: 1, value: 2, holyPower: 200 },
         { level: 2, value: 3, holyPower: 300 },
         { level: 3, value: 7, holyPower: 500 }
       ]),
       createMythNodeStat("pvePenetration", 5, [
         { level: 1, value: 5, holyPower: 125 },
         { level: 2, value: 10, holyPower: 150 },
         { level: 3, value: 15, holyPower: 200 },
         { level: 4, value: 25, holyPower: 300 },
         { level: 5, value: 45, holyPower: 500 }
       ]),
       createMythNodeStat("pvpAllSkillAmp", 3, [
         { level: 1, value: 2, holyPower: 200 },
         { level: 2, value: 3, holyPower: 300 },
         { level: 3, value: 7, holyPower: 500 }
       ]),
       createMythNodeStat("pveAllAttackUp", 5, [
         { level: 1, value: 15, holyPower: 115 },
         { level: 2, value: 20, holyPower: 138 },
         { level: 3, value: 25, holyPower: 184 },
         { level: 4, value: 40, holyPower: 276 },
         { level: 5, value: 80, holyPower: 460 }
       ]),
       createMythNodeStat("pvpAllAttackUp", 5, [
         { level: 1, value: 15, holyPower: 115 },
         { level: 2, value: 20, holyPower: 138 },
         { level: 3, value: 25, holyPower: 184 },
         { level: 4, value: 40, holyPower: 276 },
         { level: 5, value: 80, holyPower: 460 }
       ]),
       createMythNodeStat("pvpPenetration", 5, [
         { level: 1, value: 5, holyPower: 125 },
         { level: 2, value: 10, holyPower: 150 },
         { level: 3, value: 15, holyPower: 200 },
         { level: 4, value: 25, holyPower: 300 },
         { level: 5, value: 45, holyPower: 500 }
       ]),
       createMythNodeStat("pveNormalDamageUp", 5, [
         { level: 1, value: 1, holyPower: 100 },
         { level: 2, value: 2, holyPower: 120 },
         { level: 3, value: 3, holyPower: 160 },
         { level: 4, value: 5, holyPower: 240 },
         { level: 5, value: 8, holyPower: 400 }
       ]),
       createMythNodeStat("pvpNormalDamageUp", 5, [
         { level: 1, value: 1, holyPower: 100 },
         { level: 2, value: 2, holyPower: 120 },
         { level: 3, value: 3, holyPower: 160 },
         { level: 4, value: 5, holyPower: 240 },
         { level: 5, value: 8, holyPower: 400 }
       ])
     ]
   },
   {
     nodeId: 76,
     isDataComplete: true,
     lastUpdated: new Date().toISOString(),
     notes: "Updated with server data - node 76. ForceID 1 → hp (5 levels), ForceID 155 → pveDefense (5 levels), ForceID 156 → pveDamageReduction (5 levels), ForceID 157 → pveIgnorePenetration (5 levels), ForceID 189 → pvpDefense (5 levels), ForceID 194 → pvpDamageReduction (5 levels), ForceID 195 → pvpIgnorePenetration (5 levels)",
     availableStats: [
       createMythNodeStat("hp", 5, [
         { level: 1, value: 40, holyPower: 115 },
         { level: 2, value: 80, holyPower: 138 },
         { level: 3, value: 120, holyPower: 184 },
         { level: 4, value: 180, holyPower: 276 },
         { level: 5, value: 300, holyPower: 460 }
       ]),
       createMythNodeStat("pveDefense", 5, [
         { level: 1, value: 15, holyPower: 115 },
         { level: 2, value: 25, holyPower: 138 },
         { level: 3, value: 30, holyPower: 184 },
         { level: 4, value: 50, holyPower: 276 },
         { level: 5, value: 100, holyPower: 460 }
       ]),
       createMythNodeStat("pveDamageReduction", 5, [
         { level: 1, value: 5, holyPower: 100 },
         { level: 2, value: 10, holyPower: 120 },
         { level: 3, value: 15, holyPower: 160 },
         { level: 4, value: 20, holyPower: 240 },
         { level: 5, value: 30, holyPower: 400 }
       ]),
       createMythNodeStat("pveIgnorePenetration", 5, [
         { level: 1, value: 10, holyPower: 125 },
         { level: 2, value: 15, holyPower: 150 },
         { level: 3, value: 20, holyPower: 200 },
         { level: 4, value: 30, holyPower: 300 },
         { level: 5, value: 60, holyPower: 500 }
       ]),
       createMythNodeStat("pvpDefense", 5, [
         { level: 1, value: 15, holyPower: 115 },
         { level: 2, value: 25, holyPower: 138 },
         { level: 3, value: 30, holyPower: 184 },
         { level: 4, value: 50, holyPower: 276 },
         { level: 5, value: 100, holyPower: 460 }
       ]),
       createMythNodeStat("pvpDamageReduction", 5, [
         { level: 1, value: 5, holyPower: 100 },
         { level: 2, value: 10, holyPower: 120 },
         { level: 3, value: 15, holyPower: 160 },
         { level: 4, value: 20, holyPower: 240 },
         { level: 5, value: 30, holyPower: 400 }
       ]),
       createMythNodeStat("pvpIgnorePenetration", 5, [
         { level: 1, value: 10, holyPower: 125 },
         { level: 2, value: 15, holyPower: 150 },
         { level: 3, value: 20, holyPower: 200 },
         { level: 4, value: 30, holyPower: 300 },
         { level: 5, value: 60, holyPower: 500 }
       ])
     ]
   },
   {
     nodeId: 77,
     isDataComplete: true,
     lastUpdated: new Date().toISOString(),
     notes: "Updated with server data - node 77. ForceID 1 → hp (5 levels), ForceID 5 → defense (5 levels), ForceID 8 → criticalDamage (5 levels), ForceID 113 → allAttackUp (5 levels), ForceID 132 → normalDamageUp (5 levels)",
     availableStats: [
       createMythNodeStat("hp", 5, [
         { level: 1, value: 40, holyPower: 115 },
         { level: 2, value: 80, holyPower: 138 },
         { level: 3, value: 120, holyPower: 184 },
         { level: 4, value: 180, holyPower: 276 },
         { level: 5, value: 300, holyPower: 460 }
       ]),
       createMythNodeStat("defense", 5, [
         { level: 1, value: 10, holyPower: 115 },
         { level: 2, value: 15, holyPower: 138 },
         { level: 3, value: 20, holyPower: 184 },
         { level: 4, value: 35, holyPower: 276 },
         { level: 5, value: 80, holyPower: 460 }
       ]),
       createMythNodeStat("criticalDamage", 5, [
         { level: 1, value: 3, holyPower: 125 },
         { level: 2, value: 4, holyPower: 150 },
         { level: 3, value: 5, holyPower: 200 },
         { level: 4, value: 8, holyPower: 300 },
         { level: 5, value: 13, holyPower: 500 }
       ]),
       createMythNodeStat("allAttackUp", 5, [
         { level: 1, value: 10, holyPower: 125 },
         { level: 2, value: 15, holyPower: 150 },
         { level: 3, value: 20, holyPower: 200 },
         { level: 4, value: 30, holyPower: 300 },
         { level: 5, value: 70, holyPower: 500 }
       ]),
       createMythNodeStat("normalDamageUp", 5, [
         { level: 1, value: 1, holyPower: 115 },
         { level: 2, value: 2, holyPower: 138 },
         { level: 3, value: 3, holyPower: 184 },
         { level: 4, value: 5, holyPower: 276 },
         { level: 5, value: 8, holyPower: 460 }
       ])
     ]
   }
];

// Helper functions
export const getNodeData = (nodeId: number): MythLevelNodeData | undefined => {
  return mythLevelNodeData.find(node => {
    if (Array.isArray(node.nodeId)) {
      return node.nodeId.includes(nodeId);
    }
    return node.nodeId === nodeId;
  });
};

export const getNodeStat = (nodeId: number, statKey: string): MythNodeStat | undefined => {
  const nodeData = getNodeData(nodeId);
  return nodeData?.availableStats.find(stat => stat.statKey === statKey);
};

export const getStatLevelData = (nodeId: number, statKey: string, level: number): StatLevelData | undefined => {
  const stat = getNodeStat(nodeId, statKey);
  return stat?.levels.find(l => l.level === level);
};

export const getAllAvailableStats = (nodeId: number): MythNodeStat[] => {
  const nodeData = getNodeData(nodeId);
  return nodeData?.availableStats || [];
};

export const getStatValueRange = (nodeId: number, statKey: string): { min: number; max: number } | null => {
  const stat = getNodeStat(nodeId, statKey);
  if (!stat) return null;
  
  return {
    min: stat.minValue,
    max: stat.maxValue
  };
};

export const getHolyPowerRange = (nodeId: number, statKey: string): { min: number; max: number } | null => {
  const stat = getNodeStat(nodeId, statKey);
  if (!stat || stat.levels.length === 0) return null;
  
  const holyPowers = stat.levels.map(l => l.holyPower);
  return {
    min: Math.min(...holyPowers),
    max: Math.max(...holyPowers)
  };
};

// Validation helpers
export const validateNodeData = (nodeData: MythLevelNodeData): string[] => {
  const errors: string[] = [];
  
  // Validate nodeId
  const nodeIds = getNodeIds(nodeData);
  if (nodeIds.length === 0) {
    errors.push("Node must have at least one node ID");
  }
  
  // Check for duplicate node IDs within the same entry
  if (Array.isArray(nodeData.nodeId)) {
    const uniqueIds = new Set(nodeData.nodeId);
    if (nodeData.nodeId.length !== uniqueIds.size) {
      errors.push("Node has duplicate IDs in the same entry");
    }
  }
  
  if (nodeData.availableStats.length === 0) {
    errors.push("Node must have at least one available stat");
  }
  
  nodeData.availableStats.forEach((stat, index) => {
    if (stat.levels.length === 0) {
      errors.push(`Stat ${stat.name} has no level data`);
    }
    
    if (stat.levels.length !== stat.maxLevel) {
      errors.push(`Stat ${stat.name} maxLevel (${stat.maxLevel}) doesn't match levels array length (${stat.levels.length})`);
    }
    
    // Check for duplicate levels
    const levelNumbers = stat.levels.map(l => l.level);
    const uniqueLevels = new Set(levelNumbers);
    if (levelNumbers.length !== uniqueLevels.size) {
      errors.push(`Stat ${stat.name} has duplicate level entries`);
    }
    
    // Check level sequence
    const sortedLevels = [...levelNumbers].sort((a, b) => a - b);
    for (let i = 0; i < sortedLevels.length; i++) {
      if (sortedLevels[i] !== i + 1) {
        errors.push(`Stat ${stat.name} has missing or invalid level sequence`);
        break;
      }
    }
  });
  
  return errors;
};

export const getTotalNodesWithData = (): number => {
  return mythLevelNodeData.length;
};

export const getCompleteNodesCount = (): number => {
  return mythLevelNodeData.filter(node => node.isDataComplete).length;
};

// Helper to get all node IDs from a node data entry
export const getNodeIds = (nodeData: MythLevelNodeData): number[] => {
  return Array.isArray(nodeData.nodeId) ? nodeData.nodeId : [nodeData.nodeId];
};

// Helper to get all unique node IDs across all data
export const getAllNodeIds = (): number[] => {
  const allIds: number[] = [];
  mythLevelNodeData.forEach(nodeData => {
    allIds.push(...getNodeIds(nodeData));
  });
  return [...new Set(allIds)].sort((a, b) => a - b);
};

// Validate that no node ID appears in multiple entries
export const validateUniqueNodeIds = (): string[] => {
  const errors: string[] = [];
  const seenIds = new Map<number, number>(); // nodeId -> index of first occurrence
  
  mythLevelNodeData.forEach((nodeData, index) => {
    const nodeIds = getNodeIds(nodeData);
    nodeIds.forEach(nodeId => {
      if (seenIds.has(nodeId)) {
        errors.push(`Node ID ${nodeId} appears in multiple entries (indices ${seenIds.get(nodeId)} and ${index})`);
      } else {
        seenIds.set(nodeId, index);
      }
    });
  });
  
  return errors;
};