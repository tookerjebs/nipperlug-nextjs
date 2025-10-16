/**
 * Event Mob Data Export
 * Provides access to all parsed event mob data
 */

import eventMobsData from './event-mobs.json';
import { EventMobData, EventMobsByMap, EventMobsByMobName } from './types';
import { WORLD_ID_MAP } from './worldIdMap';

// Re-export types
export type { EventMobData, MobSpawnerLocation } from './types';
export { WORLD_ID_MAP, MAP_NAME_TO_ID, AVAILABLE_MAPS, AVAILABLE_WORLD_IDS } from './worldIdMap';

/**
 * Get all event mobs
 */
export function getAllEventMobs(): EventMobData[] {
  return eventMobsData as EventMobData[];
}

/**
 * Get event mobs grouped by map
 */
export function getEventMobsByMap(): EventMobsByMap {
  const grouped: EventMobsByMap = {};

  for (const mob of eventMobsData as EventMobData[]) {
    for (const spawner of mob.spawners) {
      const mapName = WORLD_ID_MAP[spawner.worldId];
      if (!mapName) continue;

      if (!grouped[mapName]) {
        grouped[mapName] = [];
      }

      // Only add if not already present (avoid duplicates)
      if (!grouped[mapName].some(m => m.name === mob.name)) {
        grouped[mapName].push(mob);
      }
    }
  }

  return grouped;
}

/**
 * Get event mobs by name for quick lookup
 */
export function getEventMobsByName(): EventMobsByMobName {
  const indexed: EventMobsByMobName = {};

  for (const mob of eventMobsData as EventMobData[]) {
    indexed[mob.name] = mob;
  }

  return indexed;
}

/**
 * Get all unique mob names
 */
export function getAllMobNames(): string[] {
  return (eventMobsData as EventMobData[]).map(m => m.name).sort();
}

/**
 * Get spawners for a specific mob on a specific map
 */
export function getMobSpawnersOnMap(mobName: string, mapName: string) {
  const mob = (eventMobsData as EventMobData[]).find(m => m.name === mobName);
  if (!mob) return [];

  const worldId = Object.entries(WORLD_ID_MAP).find(([, name]) => name === mapName)?.[0];
  if (!worldId) return [];

  return mob.spawners.filter(s => s.worldId === parseInt(worldId));
}