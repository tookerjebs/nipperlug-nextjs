/**
 * Monster Data Hook (Build Planner)
 * Uses shared monster data - build planner just uses the fields it needs
 */

import { useMemo } from 'react';
import { useMonsterData as useSharedMonsterData } from '../../../lib/hooks/useMonsterData';
import { MonsterSearchFilters, MonsterStats } from '../../../lib/game-data/monsters/types';

interface UseMonsterDataReturn {
  isLoading: boolean;
  error: string | null;
  searchMonsters: (searchTerm: string, filters?: any, limit?: number) => MonsterStats[];
  getPopularMonsters: (limit?: number) => MonsterStats[];
}

export function useMonsterData(): UseMonsterDataReturn {
  const { 
    isLoading, 
    error, 
    searchMonsters: sharedSearchMonsters, 
    getPopularMonsters: sharedGetPopularMonsters 
  } = useSharedMonsterData();

  // Memoized search function with backward compatibility for old filter format
  const searchMonstersCallback = useMemo(() => {
    return (searchTerm: string, filters: any = {}, limit: number = 50) => {
      // Convert old filter format to new format for backward compatibility
      const newFilters: MonsterSearchFilters = {
        minLevel: filters.levelMin,
        maxLevel: filters.levelMax,
        bossOnly: filters.bossOnly,
      };

      return sharedSearchMonsters(searchTerm, newFilters, limit);
    };
  }, [sharedSearchMonsters]);

  // Memoized popular monsters function
  const getPopularMonstersCallback = useMemo(() => {
    return (limit: number = 20) => {
      return sharedGetPopularMonsters(limit);
    };
  }, [sharedGetPopularMonsters]);

  return {
    isLoading,
    error,
    searchMonsters: searchMonstersCallback,
    getPopularMonsters: getPopularMonstersCallback,
  };
}