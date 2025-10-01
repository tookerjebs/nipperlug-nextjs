/**
 * Shared Monster Data Hook
 * Manages loading and caching of monster data for all tools
 */

import { useState, useEffect, useMemo } from 'react';
import { RawMonsterData, MonsterStats, MonsterSearchFilters } from '../game-data/monsters/types';
import { 
  searchMonsters, 
  getPopularMonsters, 
  getMonsterById,
  getDungeonIds,
  clearCaches 
} from '../game-data/monsters/monster-processor';

interface UseMonsterDataReturn {
  rawMonsters: RawMonsterData[];
  isLoading: boolean;
  error: string | null;
  searchMonsters: (searchTerm: string, filters?: MonsterSearchFilters, limit?: number) => MonsterStats[];
  getPopularMonsters: (limit?: number) => MonsterStats[];
  getMonsterById: (id: string) => MonsterStats | null;
  getDungeonIds: () => string[];
}

export function useMonsterData(): UseMonsterDataReturn {
  const [rawMonsters, setRawMonsters] = useState<RawMonsterData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadMonsterData = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Dynamic import to avoid loading the large JSON file until needed
        const { default: monsterData } = await import('../game-data/monsters/mob-stats.json');
        
        if (isMounted) {
          setRawMonsters(monsterData as RawMonsterData[]);
        }
      } catch (err) {
        console.error('Failed to load monster data:', err);
        if (isMounted) {
          setError('Failed to load monster data');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadMonsterData();

    return () => {
      isMounted = false;
      // Clear caches when component unmounts to free memory
      clearCaches();
    };
  }, []);

  // Memoized search function
  const searchMonstersCallback = useMemo(() => {
    return (searchTerm: string, filters: MonsterSearchFilters = {}, limit: number = 50) => {
      if (rawMonsters.length === 0) return [];
      return searchMonsters(rawMonsters, searchTerm, filters, limit);
    };
  }, [rawMonsters]);

  // Memoized popular monsters function
  const getPopularMonstersCallback = useMemo(() => {
    return (limit: number = 20) => {
      if (rawMonsters.length === 0) return [];
      return getPopularMonsters(rawMonsters, limit);
    };
  }, [rawMonsters]);

  // Memoized get monster by ID function
  const getMonsterByIdCallback = useMemo(() => {
    return (id: string) => {
      if (rawMonsters.length === 0) return null;
      return getMonsterById(rawMonsters, id);
    };
  }, [rawMonsters]);

  // Memoized get dungeon IDs function
  const getDungeonIdsCallback = useMemo(() => {
    return () => {
      if (rawMonsters.length === 0) return [];
      return getDungeonIds(rawMonsters);
    };
  }, [rawMonsters]);

  return {
    rawMonsters,
    isLoading,
    error,
    searchMonsters: searchMonstersCallback,
    getPopularMonsters: getPopularMonstersCallback,
    getMonsterById: getMonsterByIdCallback,
    getDungeonIds: getDungeonIdsCallback,
  };
}