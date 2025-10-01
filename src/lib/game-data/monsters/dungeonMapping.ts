/**
 * Mapping of dungeon IDs to readable dungeon names
 * Data source: dungeons_table.csv from RaGEZONE
 */

export const DUNGEON_ID_TO_NAME: Record<string, string> = {
  // Classic/Old dungeons
  '194': 'Lake in Dusk (old)',
  '218': 'Tower of the Undead B1F (old)',
  '245': 'Ruina Station',
  '253': 'Tower of the Undead B2F (old)',
  '293': 'Volcanic Citadel',
  '294': 'Forgotten Temple B1F',
  
  // Original dungeons
  '1219': 'The Lake in Dusk',
  '1374': 'Faded Tower of Undead(B1F)',
  '1497': 'Ruina Station',
  '1519': 'Faded Tower of Undead(B2F) Part1',
  '1689': 'The end of the narrow path near the Death Giant camp',
  '1691': 'Volcanic Citadel',
  '1692': 'Forgotten Temple B1F',
  '1697': 'Chaos Arena Lv30 ~ 60',
  '1698': 'Chaos Arena Lv61 ~ 80',
  '1699': 'Chaos Arena Lv81 ~ 94',
  '1700': 'Chaos Arena Lv95 ~ 124',
  '1701': 'Chaos Arena Lv125 ~',
  '1702': 'Weakened Lake In Dusk',
  '1703': 'Weakened Ruina Station',
  '1704': 'Weakened Frozen Tower of the Undead B1F',

  // Extended dungeons (4xxx range)
  '4096': 'Forgotten Temple B2F',
  '4097': 'Forbidden Island',
  '4098': 'Altar of Siena B1F',
  '4099': 'Altar of Siena B2F',
  '4100': 'Panic Cave (Easy)',
  '4101': 'Panic Cave (Normal)',
  '4102': 'Panic Cave (Hard)',
  '4103': 'Steamer Crazy (Easy)',
  '4104': 'Steamer Crazy (Normal)',
  '4105': 'Steamer Crazy (Hard)',
  '4106': 'Illusion Castle Underworld',
  '4107': 'Catacomb Frost (Easy)',
  '4108': 'Catacomb Frost (Normal)',
  '4109': 'Catacomb Frost (Hard)',
  '4110': 'Illusion Castle Radiant Hall',
  '4111': 'Chaos Arena Lv.1',
  '4112': 'Chaos Arena Lv.2',
  '4113': 'Chaos Arena Lv.3',
  '4114': 'Chaos Arena Lv.4',
  '4115': 'Chaos Arena Lv.5',
  '4116': 'Chaos Arena Lv.6',
  '4117': 'Panic Cave (Premium)',
  '4118': 'Steamer Crazy (Premium)',
  '4119': 'Catacomb Frost (Premium)',
  '4121': 'Lava Hellfire (Easy)',
  '4122': 'Lava Hellfire (Normal)',
  '4123': 'Lava Hellfire (Hard)',
  '4124': 'Lava Hellfire (Premium)',
  '4220': 'Maquinas Outpost',
  '4248': 'Hazardous Valley (Easy)',
  '4249': 'Hazardous Valley (Normal)',
  '4250': 'Hazardous Valley (Hard)',
  '4251': 'Chaos Infinity',
  '4263': 'Tower of Undead B3F',
  '4264': 'Forgotten Temple B2F (Awakened)',
  '4265': 'Forbidden Island (Awakened)',
  '4276': 'Eternal Chaos Arena',
  '4277': 'Lava Hellfire (Awakened)',
  '4278': 'Panic Cave (Awakened)',
  '4279': 'Steamer Crazy (Awakened)',
  '4280': 'Catacomb Frost (Awakened)',
  '4282': 'Hazardous Valley (Awakened)',
  '4283': 'Abandoned City',
  '4336': 'Tower of the Dead B3F (Part2)',
  '4337': 'Legend Arena',
  '4338': 'Glacies Inferna',
  '4339': 'Illusion Castle Underworld(Apocrypha)',
  '4340': 'Illusion Castle Radiant Hall(Apocrypha)',
  '4341': 'Edge of Phantom',
  '4342': 'Forgotten Temple B3F',
  '4343': 'Acheron Arena',
  '4344': 'Devil\'s Tower',
  '4345': 'Devil\'s Tower (Part2)',
  '4346': 'Pandemonium',
  '4347': 'Mirage Island',
  '4348': 'Chaos Arena Lv.7',
  '4349': 'Flame Dimension',
  '4350': 'Flame Nest',
  '4351': 'Holy WindMill',
  '4352': 'Labyrinth',
  '4353': 'Ancient Tomb',
  '4362': 'Frozen Canyon',
  '4363': 'Holy Keldrasil',
  '4364': 'Tower of the Undead B1F',
  '4365': 'Tower of the Undead B2F',
  '4366': 'Mirage Island (Awakened)',
  '4368': 'Terminus Machina',
  '4369': 'Garden of Dust',
  '4370': 'Lake in Dusk',
  '4371': 'Automata Lab',
  '4372': 'Infinite Ordeal',
  '4373': 'Holy Shrine',
  '4374': 'Palestra Inferna',
  '4375': 'Celestia',
};

/**
 * Get the human-readable dungeon name by dungeon ID
 * @param dungeonId - The dungeon ID as a string
 * @returns The dungeon name, or the original ID if no mapping exists
 */
export function getDungeonName(dungeonId: string | undefined | null): string {
  if (!dungeonId) return 'Unknown Dungeon';
  
  const dungeonName = DUNGEON_ID_TO_NAME[dungeonId];
  return dungeonName || `Dungeon ${dungeonId}`;
}

/**
 * Get all available dungeon names sorted alphabetically
 * @returns Array of dungeon names
 */
export function getAllDungeonNames(): string[] {
  return Object.values(DUNGEON_ID_TO_NAME).sort();
}

/**
 * Get dungeon ID by name (reverse lookup)
 * @param dungeonName - The dungeon name
 * @returns The dungeon ID or undefined if not found
 */
export function getDungeonIdByName(dungeonName: string): string | undefined {
  for (const [id, name] of Object.entries(DUNGEON_ID_TO_NAME)) {
    if (name === dungeonName) return id;
  }
  return undefined;
}
