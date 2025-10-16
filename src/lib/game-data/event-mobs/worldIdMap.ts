/**
 * Mapping of game world IDs to map names
 * Used to identify which map event mobs spawn in
 */
export const WORLD_ID_MAP: Record<number, string> = {
  1: 'Bloody Ice',
  2: 'Desert Scream',
  3: 'Green Despair',
  4: 'Port Lux',
  5: 'Fort Ruina',
  6: 'Lakeside',
  7: 'Undead Ground',
  8: 'Forgotten Ruin',
  9: 'Mutant Forest',
  10: 'Pontus Ferrum',
  11: 'Porta Inferno',
  12: 'Arcane Trace',
  22: 'Senillinea',
};

/**
 * Reverse mapping: map name to world ID
 */
export const MAP_NAME_TO_ID: Record<string, number> = Object.entries(WORLD_ID_MAP).reduce(
  (acc, [id, name]) => {
    acc[name.toLowerCase()] = parseInt(id);
    return acc;
  },
  {} as Record<string, number>
);

/**
 * Sorted list of map names for UI selection (sorted by world ID, not alphabetically)
 */
export const AVAILABLE_MAPS = Object.entries(WORLD_ID_MAP)
  .sort(([idA], [idB]) => parseInt(idA) - parseInt(idB))
  .map(([, name]) => name);

/**
 * Get all available world IDs
 */
export const AVAILABLE_WORLD_IDS = Object.keys(WORLD_ID_MAP).map(Number).sort((a, b) => a - b);