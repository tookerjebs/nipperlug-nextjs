/**
 * Shared Monster Data Processor
 * Efficiently processes and searches through the large monster dataset
 * Used by both Build Planner and Mob Table tools
 */

import { RawMonsterData, MonsterStats, MonsterSearchFilters } from './types';

// Search index interface for efficient searching
interface MonsterSearchIndex {
  id: string;
  name: string;
  level: number;
  isBoss: boolean;
  serverBossType: number;
  searchText: string;
}

// Cache for processed monsters to avoid reprocessing
const processedMonstersCache = new Map<string, MonsterStats>();
const searchIndexCache: MonsterSearchIndex[] = [];
let isIndexBuilt = false;

/**
 * Transform raw monster data to our application format
 */
export function processRawMonster(rawMonster: RawMonsterData, index?: number): MonsterStats {
  // Create unique cache key using both id and dungeonId to handle duplicates
  const cacheKey = `${rawMonster.id}-${rawMonster.dungeonId || index || 0}`;
  
  // Return cached version if available
  if (processedMonstersCache.has(cacheKey)) {
    return processedMonstersCache.get(cacheKey)!;
  }

  const processed: MonsterStats = {
    // Create unique ID by combining id and dungeonId, or use index as fallback
    id: rawMonster.dungeonId ? `${rawMonster.id}-${rawMonster.dungeonId}` : `${rawMonster.id}-${index || 0}`,
    dungeonId: rawMonster.dungeonId,
    
    // Direct mapping from cleaned data structure
    name: rawMonster.name,
    level: rawMonster.level,
    exp: rawMonster.exp,
    hp: rawMonster.hp,
    defense: rawMonster.defense,
    attackRate: rawMonster.attackRate,
    defenseRate: rawMonster.defenseRate,
    hpRecharge: rawMonster.hpRecharge,
    accuracy: rawMonster.accuracy,
    penetration: rawMonster.penetration,
    damageReduction: rawMonster.damageReduction,
    evasion: rawMonster.evasion,
    resistCritRate: rawMonster.resistCritRate,
    primaryAttackMin: rawMonster.primaryAttackMin,
    primaryAttackMax: rawMonster.primaryAttackMax,
    secondaryAttackMin: rawMonster.secondaryAttackMin,
    secondaryAttackMax: rawMonster.secondaryAttackMax,
    ignoreAccuracy: rawMonster.ignoreAccuracy,
    ignoreDamageReduction: rawMonster.ignoreDamageReduction,
    ignorePenetration: rawMonster.ignorePenetration,
    absoluteDamage: rawMonster.absoluteDamage,
    resistSkillAmp: rawMonster.resistSkillAmp,
    resistCritDamage: rawMonster.resistCritDamage,
    resistSuppress: rawMonster.resistSuppress,
    resistSilence: rawMonster.resistSilence,
    resistDiffDamage: rawMonster.resistDiffDamage,
    hpProportionDamage: rawMonster.hpProportionDamage,
    serverBossType: rawMonster.serverBossType,
    
    // Computed property for backward compatibility
    isABoss: rawMonster.serverBossType > 0,
  };

  // Cache the processed monster
  processedMonstersCache.set(cacheKey, processed);
  
  return processed;
}

/**
 * Build search index for efficient searching
 */
export function buildSearchIndex(rawMonsters: RawMonsterData[]): MonsterSearchIndex[] {
  if (isIndexBuilt && searchIndexCache.length > 0) {
    return searchIndexCache;
  }

  searchIndexCache.length = 0; // Clear existing cache
  
  for (let i = 0; i < rawMonsters.length; i++) {
    const rawMonster = rawMonsters[i];
    
    // Filter out monsters with empty names or invalid names
    if (!rawMonster.name || 
        rawMonster.name.trim() === '' || 
        rawMonster.name === "''" || 
        rawMonster.name === '"' ||
        !rawMonster.name.match(/[a-zA-Z0-9]/)) {
      continue;
    }
    
    const searchText = [
      rawMonster.name,
      `Level ${rawMonster.level}`,
      `Lv${rawMonster.level}`,
      rawMonster.serverBossType > 0 ? 'boss' : 'normal',
      rawMonster.serverBossType === 1 ? 'map boss' : '',
      rawMonster.serverBossType === 2 ? 'world boss' : ''
    ].join(' ').toLowerCase();

    // Create unique ID consistent with processRawMonster
    const uniqueId = rawMonster.dungeonId ? `${rawMonster.id}-${rawMonster.dungeonId}` : `${rawMonster.id}-${i}`;

    searchIndexCache.push({
      id: uniqueId,
      name: rawMonster.name,
      level: rawMonster.level,
      isBoss: rawMonster.serverBossType > 0,
      serverBossType: rawMonster.serverBossType,
      searchText
    });
  }

  isIndexBuilt = true;
  return searchIndexCache;
}

/**
 * Search monsters efficiently using the search index
 */
export function searchMonsters(
  rawMonsters: RawMonsterData[],
  searchTerm: string,
  filters: MonsterSearchFilters = {},
  limit: number = 50
): MonsterStats[] {
  const searchIndex = buildSearchIndex(rawMonsters);
  const normalizedSearch = searchTerm.toLowerCase().trim();
  
  let filteredIndex = searchIndex;

  // Apply text search
  if (normalizedSearch) {
    filteredIndex = searchIndex.filter(monster => 
      monster.searchText.includes(normalizedSearch)
    );
  }

  // Apply level filters
  if (filters.minLevel !== undefined) {
    filteredIndex = filteredIndex.filter(monster => monster.level >= filters.minLevel!);
  }
  if (filters.maxLevel !== undefined) {
    filteredIndex = filteredIndex.filter(monster => monster.level <= filters.maxLevel!);
  }

  // Apply boss filter (backward compatibility)
  if (filters.bossOnly) {
    filteredIndex = filteredIndex.filter(monster => monster.isBoss);
  }

  // Apply server boss type filter (new specific filtering)
  if (filters.serverBossType !== undefined) {
    filteredIndex = filteredIndex.filter(monster => monster.serverBossType === filters.serverBossType);
  }

  // Apply dungeon filter
  if (filters.dungeonId) {
    // We need to check the raw data for dungeon ID since it's not in the search index
    const dungeonFilteredIds = new Set(
      rawMonsters
        .filter(monster => monster.dungeonId === filters.dungeonId)
        .map((monster, index) => 
          monster.dungeonId ? `${monster.id}-${monster.dungeonId}` : `${monster.id}-${index}`
        )
    );
    filteredIndex = filteredIndex.filter(monster => dungeonFilteredIds.has(monster.id));
  }

  // Limit results and process only what we need
  // Note: Sorting is now handled by the calling component for better control
  const limitedResults = filteredIndex.slice(0, limit);
  
  // Create a map with unique IDs for lookup
  const rawMonsterMap = new Map<string, { monster: RawMonsterData; index: number }>();
  rawMonsters.forEach((monster, index) => {
    const uniqueId = monster.dungeonId ? `${monster.id}-${monster.dungeonId}` : `${monster.id}-${index}`;
    rawMonsterMap.set(uniqueId, { monster, index });
  });
  
  return limitedResults
    .map(indexEntry => rawMonsterMap.get(indexEntry.id))
    .filter((entry): entry is { monster: RawMonsterData; index: number } => entry !== undefined)
    .map(entry => processRawMonster(entry.monster, entry.index));
}

/**
 * Get monster by ID efficiently
 */
export function getMonsterById(rawMonsters: RawMonsterData[], id: string): MonsterStats | null {
  // Check cache first using the unique cache key format
  const cacheKeys = [`${id}`, ...rawMonsters.map((_, i) => `${id}-${i}`)];
  for (const cacheKey of cacheKeys) {
    if (processedMonstersCache.has(cacheKey)) {
      return processedMonstersCache.get(cacheKey)!;
    }
  }

  // Find in raw data by unique ID
  for (let i = 0; i < rawMonsters.length; i++) {
    const rawMonster = rawMonsters[i];
    const uniqueId = rawMonster.dungeonId ? `${rawMonster.id}-${rawMonster.dungeonId}` : `${rawMonster.id}-${i}`;
    
    if (uniqueId === id) {
      return processRawMonster(rawMonster, i);
    }
  }

  return null;
}

/**
 * Get popular/recommended monsters (bosses, high level, etc.)
 */
export function getPopularMonsters(rawMonsters: RawMonsterData[], limit: number = 15): MonsterStats[] {
  return searchMonsters(rawMonsters, '', { bossOnly: true }, limit);
}

/**
 * Get all unique dungeon IDs from the monster data
 */
export function getDungeonIds(rawMonsters: RawMonsterData[]): string[] {
  const dungeonIds = new Set<string>();
  rawMonsters.forEach(monster => {
    // Filter out monsters with empty names or invalid names
    if (!monster.name || 
        monster.name.trim() === '' || 
        monster.name === "''" || 
        monster.name === '"' ||
        !monster.name.match(/[a-zA-Z0-9]/)) {
      return;
    }
    
    if (monster.dungeonId) {
      dungeonIds.add(monster.dungeonId);
    }
  });
  return Array.from(dungeonIds).sort();
}

/**
 * Clear caches (useful for testing or memory management)
 */
export function clearCaches() {
  processedMonstersCache.clear();
  searchIndexCache.length = 0;
  isIndexBuilt = false;
}