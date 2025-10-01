/**
 * Monster Selection Modal
 * Allows users to select a monster for damage calculations
 * Optimized for large datasets with search and virtualization
 */

import React, { useState, useEffect, useMemo } from 'react';
import { useMonsterStore } from '../../stores/monsterStore';
import { MonsterStats } from '../../../../lib/game-data/monsters/types';
import { useMonsterData } from '../../hooks/useMonsterData';
import { IoClose, IoSearch, IoShield, IoSkull, IoSparkles, IoFilter } from 'react-icons/io5';

// Helper function to format HP values
const formatHP = (hp: number): string => {
  if (hp >= 1000000) {
    return (hp / 1000000).toFixed(2) + 'm';
  } else if (hp >= 1000) {
    return (hp / 1000).toFixed(1) + 'k';
  }
  return hp.toString();
};

const MonsterSelectionModal: React.FC = () => {
  const { 
    selectedMonster, 
    isMonsterModalOpen, 
    closeMonsterModal, 
    setSelectedMonster 
  } = useMonsterStore();
  
  const { searchMonsters, getPopularMonsters, isLoading, error } = useMonsterData();
  
  const [searchTerm, setSearchTerm] = useState('');
  const [levelMin, setLevelMin] = useState<number | undefined>();
  const [levelMax, setLevelMax] = useState<number | undefined>();
  const [bossOnly, setBossOnly] = useState(false);
  const [showFilters, setShowFilters] = useState(false);

  // Search results with debouncing effect
  const searchResults = useMemo(() => {
    if (isLoading) return [];
    
    const filters = {
      levelMin,
      levelMax,
      bossOnly: bossOnly || undefined,
    };

    let results: MonsterStats[] = [];

    if (searchTerm.trim()) {
      results = searchMonsters(searchTerm, filters, 20); // Limit to 20 results
    } else {
      // Show popular monsters when no search term
      results = getPopularMonsters(15);
    }

    // Always include the currently selected monster if one is selected
    if (selectedMonster && !results.some(m => m.id === selectedMonster.id)) {
      results = [selectedMonster, ...results];
    }

    return results;
  }, [searchTerm, levelMin, levelMax, bossOnly, searchMonsters, getPopularMonsters, isLoading, selectedMonster]);

  // Reset filters when modal opens
  useEffect(() => {
    if (isMonsterModalOpen) {
      setSearchTerm('');
      setLevelMin(undefined);
      setLevelMax(undefined);
      setBossOnly(false);
      setShowFilters(false);
    }
  }, [isMonsterModalOpen]);

  if (!isMonsterModalOpen) return null;

  const handleMonsterSelect = (monster: MonsterStats) => {
    setSelectedMonster(monster);
    closeMonsterModal();
  };

  const getMonsterIcon = (isABoss: boolean) => {
    return isABoss ? (
      <IoSkull className="text-red-400" />
    ) : (
      <IoShield className="text-gray-400" />
    );
  };

  const getMonsterTypeColor = (isABoss: boolean) => {
    return isABoss ? 'text-red-400' : 'text-gray-300';
  };

  const clearFilters = () => {
    setSearchTerm('');
    setLevelMin(undefined);
    setLevelMax(undefined);
    setBossOnly(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-theme-darker border border-game-gold rounded-lg w-full max-w-3xl max-h-[70vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-game-gold">Select Monster</h2>
            {isLoading && (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-game-gold"></div>
            )}
          </div>
          <button
            onClick={closeMonsterModal}
            className="text-gray-400 hover:text-game-gold transition-colors"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Search and Filters */}
        <div className="p-4 border-b border-gray-700 space-y-3">
          {/* Search Bar */}
          <div className="relative">
            <IoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search monsters by name or level..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-theme-dark border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:border-game-gold focus:outline-none"
            />
          </div>

          {/* Filter Toggle and Quick Filters */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-1 px-3 py-1 bg-theme-dark text-gray-300 rounded-lg hover:bg-gray-700 transition-colors"
              >
                <IoFilter size={14} />
                Filters
              </button>
              
              <button
                onClick={() => setBossOnly(!bossOnly)}
                className={`flex items-center gap-1 px-3 py-1 rounded-lg text-sm transition-colors ${
                  bossOnly
                    ? 'bg-red-600 text-white'
                    : 'bg-theme-dark text-gray-300 hover:bg-gray-700'
                }`}
              >
                <IoSkull size={14} />
                Bosses Only
              </button>

              {!searchTerm && (
                <div className="flex items-center gap-1 text-xs text-gray-400">
                  <IoSparkles size={12} />
                  Showing popular monsters
                </div>
              )}
            </div>

            {(searchTerm || levelMin || levelMax || bossOnly) && (
              <button
                onClick={clearFilters}
                className="text-xs text-gray-400 hover:text-game-gold transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>

          {/* Advanced Filters */}
          {showFilters && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 p-3 bg-theme-dark rounded-lg">
              <div>
                <label className="block text-xs text-gray-400 mb-1">Min Level</label>
                <input
                  type="number"
                  placeholder="e.g. 180"
                  value={levelMin || ''}
                  onChange={(e) => setLevelMin(e.target.value ? parseInt(e.target.value) : undefined)}
                  className="w-full px-3 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:border-game-gold focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-400 mb-1">Max Level</label>
                <input
                  type="number"
                  placeholder="e.g. 250"
                  value={levelMax || ''}
                  onChange={(e) => setLevelMax(e.target.value ? parseInt(e.target.value) : undefined)}
                  className="w-full px-3 py-1 bg-gray-800 border border-gray-600 rounded text-white text-sm focus:border-game-gold focus:outline-none"
                />
              </div>
            </div>
          )}
        </div>

        {/* Monster List */}
        <div className="flex-1 overflow-y-auto p-4 dark-scrollbar">
          {error ? (
            <div className="text-center text-red-400 py-8">
              Error loading monsters: {error}
            </div>
          ) : isLoading ? (
            <div className="text-center text-gray-400 py-8">
              Loading monsters...
            </div>
          ) : searchResults.length === 0 ? (
            <div className="text-center text-gray-400 py-8">
              {searchTerm ? 'No monsters found matching your search.' : 'No monsters available.'}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {searchResults.map(monster => (
                <div
                  key={monster.id}
                  onClick={() => handleMonsterSelect(monster)}
                  className={`p-2 rounded-lg border cursor-pointer transition-all hover:border-game-gold ${
                    selectedMonster?.id === monster.id
                      ? 'border-game-gold bg-theme-dark'
                      : 'border-gray-600 bg-theme-dark hover:bg-gray-800'
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <div className="flex items-center gap-1 min-w-0">
                      {getMonsterIcon(monster.isABoss)}
                      <h3 className="font-medium text-white truncate text-sm">{monster.name}</h3>
                    </div>
                    <div className="flex flex-col items-end text-xs text-gray-400">
                      <span>Lv.{monster.level}</span>
                      <span>{formatHP(monster.hp)}</span>
                    </div>
                  </div>
                  
                  <div className="space-y-0.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Defense:</span>
                      <span className="text-white">{monster.defense.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">DMG Reduction:</span>
                      <span className="text-white">{monster.damageReduction.toLocaleString()}</span>
                    </div>
                    {monster.resistSkillAmp > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Resist Skill Amp:</span>
                        <span className="text-white">{monster.resistSkillAmp}%</span>
                      </div>
                    )}
                    {monster.resistCritDamage > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Resist Crit DMG:</span>
                        <span className="text-white">{monster.resistCritDamage}%</span>
                      </div>
                    )}
                    {monster.ignorePenetration > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-400">Ignore Penetration:</span>
                        <span className="text-white">{monster.ignorePenetration.toLocaleString()}</span>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-1 flex items-center justify-between">
                    <span className={`text-xs font-medium ${getMonsterTypeColor(monster.isABoss)}`}>
                      {monster.isABoss ? 'Boss' : 'Normal'}
                    </span>
                    {selectedMonster?.id === monster.id && (
                      <span className="text-xs text-game-gold font-medium">Selected</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-700 flex justify-between items-center">
          <div className="text-sm text-gray-400">
            {searchResults.length} monster{searchResults.length !== 1 ? 's' : ''} shown
            {searchTerm && searchResults.length === 20 && ' (limited to 20 results)'}
          </div>
          <div className="flex gap-2">
            <button
              onClick={closeMonsterModal}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MonsterSelectionModal;