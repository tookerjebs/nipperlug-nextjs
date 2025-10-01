'use client';

import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { X, Info } from 'lucide-react';
import { cn } from '@/tools/build-planner/lib/utils';
import { getNodeData, getStatLevelData } from '../data/mythLevelNodeData';
import { getRankByHolyPower, getTotalFlatBonuses } from '../data/mythHolyPowerRanks';
import { calculateActualHolyPowerCost } from '../data/mythZoneConfig';
import type { MythLevelNodeData, MythNodeStat, StatLevelData } from '../data/mythLevelNodeData';
import { StatIcon } from '@/tools/build-planner/components/StatIcon';

interface SelectedStatWithLevel {
  statKey: string;
  level: number;
  value: number;
  holyPower: number;
}

interface MythNodeStatModalEnhancedProps {
  isOpen: boolean;
  onClose: () => void;
  nodeId: number;
  onStatConfirm: (nodeId: number, selectedStat: SelectedStatWithLevel) => void;
  currentStat?: SelectedStatWithLevel | null;
}

export default function MythNodeStatModalEnhanced({
  isOpen,
  onClose,
  nodeId,
  onStatConfirm,
  currentStat
}: MythNodeStatModalEnhancedProps) {
  const [selectedStat, setSelectedStat] = useState<SelectedStatWithLevel | null>(currentStat || null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const nodeData = getNodeData(nodeId);

  // Reset when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      setSearchTerm('');
      setSelectedCategory('all');
      setSelectedStat(currentStat || null);
    }
  }, [isOpen, currentStat]);

  if (!isOpen || !nodeData) return null;

  // Calculate holy power from selected stat (needed for other functionality)
  const totalHolyPower = selectedStat ? selectedStat.holyPower : 0;
  const currentRank = getRankByHolyPower(totalHolyPower);
  const flatBonuses = getTotalFlatBonuses(totalHolyPower);

  // Filter stats based on search and category
  const filteredStats = nodeData.availableStats.filter(stat => {
    const matchesSearch = stat.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || stat.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Sort stats by max level holy power cost (highest first)
  const sortedStats = [...filteredStats].sort((a, b) => {
    // Get the max level (last level) holy power cost for each stat
    const aMaxLevel = a.levels[a.levels.length - 1];
    const bMaxLevel = b.levels[b.levels.length - 1];
    const aMaxHolyPower = calculateActualHolyPowerCost(aMaxLevel.holyPower, nodeId);
    const bMaxHolyPower = calculateActualHolyPowerCost(bMaxLevel.holyPower, nodeId);
    return bMaxHolyPower - aMaxHolyPower; // Descending order (highest first)
  });

  // Group sorted stats by category
  const statsByCategory = sortedStats.reduce((acc, stat) => {
    if (!acc[stat.category]) {
      acc[stat.category] = [];
    }
    acc[stat.category].push(stat);
    return acc;
  }, {} as Record<string, MythNodeStat[]>);

  const handleStatLevelChange = useCallback((statKey: string, level: number) => {
    const levelData = getStatLevelData(nodeId, statKey, level);
    if (!levelData) return;

    // Calculate actual holy power cost including zone bonus
    const actualHolyPower = calculateActualHolyPowerCost(levelData.holyPower, nodeId);

    const newStat: SelectedStatWithLevel = {
      statKey,
      level,
      value: levelData.value,
      holyPower: actualHolyPower
    };

    setSelectedStat(newStat);
  }, [nodeId]);

  const handleRemoveStat = useCallback(() => {
    setSelectedStat(null);
  }, []);

  const handleConfirm = () => {
    if (selectedStat) {
      onStatConfirm(nodeId, selectedStat);
      onClose();
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'offensive': return 'text-red-400 bg-red-900/20 border-red-400/30';
      case 'defensive': return 'text-blue-400 bg-blue-900/20 border-blue-400/30';
      case 'utility': return 'text-green-400 bg-green-900/20 border-green-400/30';
      default: return 'text-gray-400 bg-gray-900/20 border-gray-400/30';
    }
  };

  const getHolyPowerColor = (holyPower: number) => {
    if (holyPower < 100) return 'text-green-400';    // Low: Below 100
    if (holyPower < 200) return 'text-yellow-400';   // Medium: 100-199
    return 'text-orange-400';                        // High: 200+
  };

  const getSelectedStatData = (statKey: string): SelectedStatWithLevel | undefined => {
    return selectedStat && selectedStat.statKey === statKey ? selectedStat : undefined;
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative glass-panel w-full max-w-4xl max-h-[95vh] sm:max-h-[90vh] min-h-[60vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-3 sm:p-4 border-b border-border-dark flex-shrink-0">
          <div>
            <h2 className="text-xl font-bold text-white">
              Node {nodeId}
            </h2>
            {!nodeData.isDataComplete && (
              <div className="flex items-center mt-1 text-xs text-yellow-400">
                <Info className="w-3 h-3 mr-1" />
Data collection in progress
              </div>
            )}
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-theme-light rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Search and Filters */}
        <div className="p-3 sm:p-4 border-b border-border-dark space-y-3 flex-shrink-0">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search stats..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 bg-theme-light border border-border-dark rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-game-highlight"
            />
          </div>

          {/* Category Filter */}
          <div className="flex space-x-2">
            <span className="text-sm text-gray-400 self-center mr-2">Category:</span>
            {['all', 'offensive', 'defensive', 'utility'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={cn(
                  'px-3 py-1 rounded-lg text-sm font-medium transition-colors capitalize',
                  selectedCategory === category
                    ? 'bg-game-highlight text-theme-darkest'
                    : 'bg-theme-light text-gray-300 hover:bg-theme-lighter'
                )}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Stats List */}
        <div className="p-3 sm:p-4 overflow-y-auto flex-1 min-h-0 dark-scrollbar">
          {Object.entries(statsByCategory).length > 0 ? (
            <div className="space-y-4">
              {Object.entries(statsByCategory).map(([category, stats]) => (
                <div key={category}>
                  <h3 className={cn(
                    'text-sm font-semibold mb-3 px-2 py-1 rounded capitalize',
                    getCategoryColor(category)
                  )}>
                    {category} ({stats.length})
                  </h3>
                  <div className="space-y-3">
                    {stats.map((stat) => {
                      const selectedData = getSelectedStatData(stat.statKey);
                      const isSelected = selectedData !== undefined;
                      const unit = stat.isPercentage ? '%' : '';
                      
                      return (
                        <div 
                          key={stat.statKey}
                          className={cn(
                            'p-3 rounded-lg border transition-colors',
                            isSelected 
                              ? 'bg-theme-light border-yellow-400 ring-2 ring-yellow-400/30' 
                              : 'bg-theme-light border-border-dark hover:border-gray-500'
                          )}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex items-center space-x-2">
                              <StatIcon 
                                statId={stat.statKey}
                                width={32}
                                height={32}
                                alt={stat.name}
                              />
                              <div>
                                <h4 className="text-white font-medium">
                                  {stat.name}
                                  {isSelected && selectedData && (
                                    <span className="text-game-highlight ml-2">
                                      +{selectedData.value}{unit}
                                    </span>
                                  )}
                                </h4>
                              </div>
                            </div>
                            {isSelected && (
                              <button
                                onClick={() => handleRemoveStat()}
                                className="text-red-400 hover:text-red-300 text-sm"
                              >
                                Remove
                              </button>
                            )}
                          </div>
                          
                          {/* Level Selection */}
                          <div className="space-y-2">
                            <div className="flex items-center justify-between text-sm">
                              <span className="text-gray-400">
                                Select Level (1-{stat.maxLevel}):
                              </span>
                              {isSelected && selectedData && (
                                <div className="text-right">
                                  <div className="text-game-highlight font-medium">
                                    Level {selectedData.level}
                                  </div>
                                  <div className="text-white font-semibold">
                                    Stat Value: {selectedData.value}{unit}
                                  </div>
                                  <div className={cn("font-medium", getHolyPowerColor(selectedData.holyPower))}>
                                    Holy Power: +{selectedData.holyPower}
                                  </div>
                                </div>
                              )}
                            </div>
                            
                            {/* Level buttons with holy power display */}
                            <div className={cn(
                              "grid gap-2",
                              stat.maxLevel <= 5 ? "grid-cols-5" : "grid-cols-5"
                            )}>
                              {stat.levels.map((levelData) => {
                                const isLevelSelected = selectedData?.level === levelData.level;
                                const actualHolyPower = calculateActualHolyPowerCost(levelData.holyPower, nodeId);
                                return (
                                  <button
                                    key={levelData.level}
                                    onClick={() => handleStatLevelChange(stat.statKey, levelData.level)}
                                    className={cn(
                                      'px-2 py-2 rounded-lg text-sm font-medium transition-colors border-2',
                                      isLevelSelected
                                        ? 'bg-theme-lighter text-gray-300 border-yellow-400 shadow-lg'
                                        : 'bg-theme-lighter text-gray-300 border-gray-600 hover:bg-theme-light hover:border-gray-500 shadow-sm'
                                    )}
                                    title={`Level ${levelData.level} - Stat Value: ${levelData.value}${unit} - Holy Power: +${actualHolyPower}`}
                                  >
                                    <div className="text-center">
                                      <div className="text-sm">Lv.{levelData.level}</div>
                                      <div className="text-sm text-yellow-400">+{levelData.value}{unit}</div>
                                      <div className={cn("text-sm", getHolyPowerColor(actualHolyPower))}>
                                        Holy: +{actualHolyPower}
                                      </div>
                                    </div>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-400">No stats found matching your criteria</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 sm:p-4 border-t border-border-dark flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-0 flex-shrink-0">
          <div className="text-xs sm:text-sm text-gray-400 text-center sm:text-left">
            Selected: {selectedStat ? '1 stat' : 'None'} | 
            Total Holy Power: <span className={cn("font-medium", getHolyPowerColor(totalHolyPower))}>{totalHolyPower}</span>
          </div>
          
          <div className="flex space-x-2 w-full sm:w-auto justify-center sm:justify-end">
            <button
              onClick={onClose}
              className="px-3 sm:px-4 py-2 game-button hover:bg-theme-lighter text-white rounded-lg transition-colors text-sm"
            >
              Cancel
            </button>
            <button
              onClick={handleConfirm}
              disabled={!selectedStat}
              className={cn(
                "px-3 sm:px-4 py-2 game-button rounded-lg transition-colors text-sm",
                selectedStat
                  ? "bg-game-highlight text-theme-darkest hover:bg-game-highlight/80"
                  : "bg-gray-600 text-gray-400 cursor-not-allowed"
              )}
            >
              Confirm Selection
            </button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}