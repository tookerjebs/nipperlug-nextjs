/**
 * Event Mob Data Types
 */

export interface MobSpawnerLocation {
  worldId: number;
  x: number;
  y: number;
  mobName: string;
  spawnGrouping?: string; // e.g., "1_2_3", "4_5_7", etc. - indicates which difficulty tiers this spawn appears in
}

export interface EventMobData {
  name: string;
  spawners: MobSpawnerLocation[];
}

export interface EventMobsByMap {
  [mapName: string]: EventMobData[];
}

export interface EventMobsByMobName {
  [mobName: string]: EventMobData;
}