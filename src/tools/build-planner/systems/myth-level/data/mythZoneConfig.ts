/**
 * Mythical Level Zone System Configuration
 * Defines zones and their unlock requirements based on holy power
 */

export interface MythZone {
  id: number;
  name: string;
  requiredHolyPower: number;
  holyPowerBonus: number; // Additional holy power cost added to all stats in this zone
  nodeRange: {
    start: number;
    end: number;
  };
  description: string;
  color: {
    border: string;
    background: string;
    hover: string;
  };
}

export const mythZones: MythZone[] = [
  {
    id: 1,
    name: "Zone 1",
    requiredHolyPower: 0,
    holyPowerBonus: 0, // Lock group 0 bonus
    nodeRange: { start: 1, end: 16 },
    description: "The foundation zone - unlocked from the beginning",
    color: {
      border: "border-green-400/70",
      background: "bg-green-900/20",
      hover: "hover:bg-green-800/30 hover:border-green-300/90"
    }
  },
  {
    id: 2,
    name: "Zone 2", 
    requiredHolyPower: 1150,
    holyPowerBonus: 20, // Lock group 1 bonus
    nodeRange: { start: 17, end: 31 },
    description: "The advancement zone - unlocked at 1,150 holy power",
    color: {
      border: "border-blue-400/70",
      background: "bg-blue-900/20", 
      hover: "hover:bg-blue-800/30 hover:border-blue-300/90"
    }
  },
  {
    id: 3,
    name: "Zone 3",
    requiredHolyPower: 2750,
    holyPowerBonus: 40, // Lock group 2 bonus
    nodeRange: { start: 32, end: 46 },
    description: "The mastery zone - unlocked at 2,750 holy power",
    color: {
      border: "border-purple-400/70",
      background: "bg-purple-900/20",
      hover: "hover:bg-purple-800/30 hover:border-purple-300/90"
    }
  },
  {
    id: 4,
    name: "Zone 4",
    requiredHolyPower: 4550,
    holyPowerBonus: 60, // Lock group 3 bonus
    nodeRange: { start: 47, end: 59 },
    description: "The excellence zone - unlocked at 4,550 holy power",
    color: {
      border: "border-orange-400/70",
      background: "bg-orange-900/20",
      hover: "hover:bg-orange-800/30 hover:border-orange-300/90"
    }
  },
  {
    id: 5,
    name: "Zone 5",
    requiredHolyPower: 6450,
    holyPowerBonus: 80, // Lock group 4 bonus
    nodeRange: { start: 60, end: 78 },
    description: "The transcendence zone - unlocked at 6,450 holy power",
    color: {
      border: "border-red-400/70",
      background: "bg-red-900/20",
      hover: "hover:bg-red-800/30 hover:border-red-300/90"
    }
  }
];

/**
 * Get the zone for a specific node ID
 */
export const getNodeZone = (nodeId: number): MythZone | null => {
  return mythZones.find(zone => 
    nodeId >= zone.nodeRange.start && nodeId <= zone.nodeRange.end
  ) || null;
};

/**
 * Check if a node is unlocked based on current holy power
 */
export const isNodeUnlocked = (nodeId: number, currentHolyPower: number): boolean => {
  const zone = getNodeZone(nodeId);
  if (!zone) return false;
  
  return currentHolyPower >= zone.requiredHolyPower;
};

/**
 * Get all zones that are currently unlocked
 */
export const getUnlockedZones = (currentHolyPower: number): MythZone[] => {
  return mythZones.filter(zone => currentHolyPower >= zone.requiredHolyPower);
};

/**
 * Get the next zone to unlock
 */
export const getNextZoneToUnlock = (currentHolyPower: number): MythZone | null => {
  const lockedZones = mythZones
    .filter(zone => currentHolyPower < zone.requiredHolyPower)
    .sort((a, b) => a.requiredHolyPower - b.requiredHolyPower);
  
  return lockedZones.length > 0 ? lockedZones[0] : null;
};

/**
 * Get zone unlock progress information
 */
export const getZoneProgress = (currentHolyPower: number) => {
  const unlockedZones = getUnlockedZones(currentHolyPower);
  const nextZone = getNextZoneToUnlock(currentHolyPower);
  
  return {
    unlockedCount: unlockedZones.length,
    totalZones: mythZones.length,
    nextZone,
    progressPercentage: (unlockedZones.length / mythZones.length) * 100,
    holyPowerToNext: nextZone ? nextZone.requiredHolyPower - currentHolyPower : 0
  };
};

/**
 * Get all nodes in a specific zone
 */
export const getNodesInZone = (zoneId: number): number[] => {
  const zone = mythZones.find(z => z.id === zoneId);
  if (!zone) return [];
  
  const nodes: number[] = [];
  for (let i = zone.nodeRange.start; i <= zone.nodeRange.end; i++) {
    nodes.push(i);
  }
  return nodes;
};

/**
 * Get the holy power bonus for a specific node
 */
export const getNodeHolyPowerBonus = (nodeId: number): number => {
  const zone = getNodeZone(nodeId);
  return zone ? zone.holyPowerBonus : 0;
};

/**
 * Calculate the actual holy power cost including zone bonus
 */
export const calculateActualHolyPowerCost = (baseHolyPower: number, nodeId: number): number => {
  const bonus = getNodeHolyPowerBonus(nodeId);
  return baseHolyPower + bonus;
};

/**
 * Get zone statistics
 */
export const getZoneStats = (zoneId: number, nodeStats: Record<number, any>) => {
  const nodesInZone = getNodesInZone(zoneId);
  const activatedNodes = nodesInZone.filter(nodeId => nodeStats[nodeId]);
  
  return {
    totalNodes: nodesInZone.length,
    activatedNodes: activatedNodes.length,
    completionPercentage: (activatedNodes.length / nodesInZone.length) * 100
  };
};