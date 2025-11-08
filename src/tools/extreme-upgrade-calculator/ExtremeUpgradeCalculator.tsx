'use client';

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import CorePriceConfig from './components/CorePriceConfig';
import UpgradeLevelSection from './components/UpgradeLevelSection';
import DataSummary from './components/DataSummary';
import { 
  EQUIPMENT_TYPES, 
  SERVER_CONFIGS, 
  getEquipmentTypeById, 
  getServerConfigByName,
  getUpgradeCost,
  getCoreByLevel,
  getCorePriceName,
  calculateSuccessRate,
  checkMinimumPowerRequirement
} from '@/tools/extreme-upgrade-calculator/data/extreme-upgrade-data';
import { usePriceStore } from '@/stores/priceStore';
import { formatNumber } from '@/utils/numberFormat';
import { calculateMultiLevelStatistics, type MultiLevelStats } from '@/tools/extreme-upgrade-calculator/utils/probabilityStats';

export default function ExtremeUpgradeCalculator() {
  const { getPrice, prices } = usePriceStore();
  
  // Configuration state
  const [selectedServer, setSelectedServer] = useState('other');
  const [selectedEquipmentType, setSelectedEquipmentType] = useState('oneHanded');
  const [startLevel, setStartLevel] = useState(0);
  const [targetLevel, setTargetLevel] = useState(1);
  
  // Core selection state - array of arrays for each level
  const [levelCores, setLevelCores] = useState<Record<number, (number | null)[]>>({});
  
  // UI state - Initialize with first level expanded
  const [expandedLevels, setExpandedLevels] = useState<Record<number, boolean>>({ 1: true });

  const serverConfig = getServerConfigByName(selectedServer);
  const equipmentType = getEquipmentTypeById(selectedEquipmentType);

  // Helper function to check if a level is fully configured and meets power requirements
  const isLevelFullyConfigured = (level: number): boolean => {
    if (!equipmentType || !serverConfig) return false;
    const cores = levelCores[level] || [];
    const maxCores = equipmentType.maxCores[level - 1] || 0;
    
    // Check if all core slots are filled
    const allSlotsFilled = cores.length === maxCores && cores.every(core => core !== null);
    if (!allSlotsFilled) return false;
    
    // Check if power requirement is met
    const totalCorePower = cores.reduce((total, coreLevel) => {
      if (coreLevel) {
        const core = getCoreByLevel(coreLevel);
        return (total || 0) + (core?.power || 0);
      }
      return total || 0;
    }, 0);
    
    return checkMinimumPowerRequirement(
      equipmentType.name,
      level,
      serverConfig,
      totalCorePower || 0
    );
  };

  // Initialize core arrays when level range or equipment type changes
  React.useEffect(() => {
    if (!equipmentType) return;
    
    const newLevelCores: Record<number, (number | null)[]> = {};
    for (let level = startLevel + 1; level <= targetLevel; level++) {
      const maxCores = equipmentType.maxCores[level - 1] || 0;
      
      if (levelCores[level]) {
        // Preserve existing cores but adjust array size
        const existingCores = levelCores[level];
        if (existingCores.length === maxCores) {
          // Same size, keep as is
          newLevelCores[level] = [...existingCores];
        } else if (existingCores.length < maxCores) {
          // Need more slots, add nulls
          newLevelCores[level] = [...existingCores, ...Array(maxCores - existingCores.length).fill(null)];
        } else {
          // Need fewer slots, truncate
          newLevelCores[level] = existingCores.slice(0, maxCores);
        }
      } else {
        // New level, create empty array
        newLevelCores[level] = Array(maxCores).fill(null);
      }
    }
    
    // Only update if we have levels to show
    if (Object.keys(newLevelCores).length > 0) {
      setLevelCores(newLevelCores);
    }
  }, [startLevel, targetLevel, selectedEquipmentType, equipmentType]);

  // Auto-expand first level
  React.useEffect(() => {
    if (startLevel < targetLevel) {
      setExpandedLevels(prev => ({ ...prev, [startLevel + 1]: true }));
    }
  }, [startLevel, targetLevel]);
  
  // Ensure target level is always startLevel + 1 for standard servers (with reset outcomes)
  React.useEffect(() => {
    if (serverConfig?.hasResetOutcome) {
      const expectedTargetLevel = startLevel + 1;
      if (targetLevel !== expectedTargetLevel) {
        setTargetLevel(expectedTargetLevel);
      }
    }
  }, [startLevel, targetLevel, serverConfig]);

  const handleCoreChange = (level: number, slotIndex: number, coreLevel: number | null) => {
    setLevelCores(prev => {
      const currentLevelCores = prev[level] || [];
      const newLevelCores = [...currentLevelCores];
      
      // Ensure the array is large enough
      const maxCores = equipmentType?.maxCores[level - 1] || 0;
      while (newLevelCores.length < maxCores) {
        newLevelCores.push(null);
      }
      
      // Update the specific slot
      if (slotIndex >= 0 && slotIndex < newLevelCores.length) {
        newLevelCores[slotIndex] = coreLevel;
      }
      
      return {
        ...prev,
        [level]: newLevelCores
      };
    });
  };

  const toggleLevelExpansion = (level: number) => {
    setExpandedLevels(prev => ({
      ...prev,
      [level]: !prev[level]
    }));
  };

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    if (!equipmentType || !serverConfig) return null;

    let totalAlzCost = 0;
    let totalCoreCost = 0;
    let totalExpectedCost = 0;
    let totalCoresNeeded = 0;
    let averageSuccessRate = 0;
    let validLevels = 0;
    const expectedBreaks = 0;
    const expectedResets = 0;
    

    
    // Track expected cores needed by level
    const expectedCoresByLevel: Record<number, number> = {};

    for (let level = startLevel + 1; level <= targetLevel; level++) {
      const cores = levelCores[level] || [];
      const upgradeCost = getUpgradeCost(equipmentType.id, level);
      const maxCores = equipmentType.maxCores[level - 1] || 0;
      
      // Only include this level in calculations if it's fully configured
      if (!isLevelFullyConfigured(level)) {
        continue; // Skip this level entirely if not fully configured
      }
      
      totalAlzCost += upgradeCost.alz;
      totalCoresNeeded += upgradeCost.coreCount;

      // Calculate core costs
      const levelCoreCost = cores.reduce((sum, coreLevel) => {
        if (coreLevel) {
          const priceName = getCorePriceName(coreLevel);
          return (sum || 0) + (getPrice(priceName) || 0);
        }
        return sum || 0;
      }, 0);
      
      totalCoreCost += levelCoreCost || 0;

      // Calculate success rate and expected cost
      const totalCorePower = cores.reduce((total, coreLevel) => {
        if (coreLevel) {
          const core = getCoreByLevel(coreLevel);
          return (total || 0) + (core?.power || 0);
        }
        return total || 0;
      }, 0);

      if ((totalCorePower || 0) > 0) {
        const successRate = calculateSuccessRate(
          equipmentType.name,
          level,
          serverConfig,
          totalCorePower || 0
        );
        
        averageSuccessRate += successRate;
        validLevels++;

        const levelTotalCost = upgradeCost.alz + (levelCoreCost || 0);
        const expectedAttempts = successRate > 0 ? 1 / successRate : Infinity;
        totalExpectedCost += expectedAttempts * levelTotalCost;
        
        // We'll calculate expected cores using the corrected approach after this loop
        // to properly account for cascading resets
      }
    }

    // Calculate expected cores with proper cascading reset logic
    if (serverConfig.hasResetOutcome) {
      // For servers with reset outcome, use cascading calculation
      let cumulativeResetFactor = 0;
      
      for (let level = startLevel + 1; level <= targetLevel; level++) {
        const cores = levelCores[level] || [];
        const maxCores = equipmentType.maxCores[level - 1] || 0;
        
        // Only process fully configured levels
        if (!isLevelFullyConfigured(level)) {
          continue;
        }
        
        const totalCorePower = cores.reduce((total, coreLevel) => {
          if (coreLevel) {
            const core = getCoreByLevel(coreLevel);
            return (total || 0) + (core?.power || 0);
          }
          return total || 0;
        }, 0);

        if ((totalCorePower || 0) > 0) {
          const successRate = calculateSuccessRate(
            equipmentType.name,
            level,
            serverConfig,
            totalCorePower || 0
          );
          
          // Base expected attempts for this level
          const baseExpectedAttempts = successRate > 0 ? 1 / successRate : Infinity;
          
          // Reset probability for this level
          const resetProbability = (1 - successRate) * 0.5;
          const resetFactor = resetProbability > 0 
            ? resetProbability / (1 - resetProbability) 
            : 0;
          
          // Expected attempts considering cascading resets from higher levels
          const expectedAttemptsForLevel = baseExpectedAttempts * (1 + cumulativeResetFactor);
          
          // Add cores needed for this level
          // Cores are consumed on every attempt (success, break, or reset)
          cores.forEach(coreLevel => {
            if (coreLevel && expectedAttemptsForLevel !== Infinity) {
              expectedCoresByLevel[coreLevel] = (expectedCoresByLevel[coreLevel] || 0) + expectedAttemptsForLevel;
            }
          });
          
          // Update cumulative reset factor for next levels
          // This accounts for the fact that resets at higher levels require redoing all previous levels
          cumulativeResetFactor = cumulativeResetFactor + resetFactor + (cumulativeResetFactor * resetFactor);
        }
      }
    } else {
      // For servers without reset outcome, use simple calculation
      for (let level = startLevel + 1; level <= targetLevel; level++) {
        const cores = levelCores[level] || [];
        const maxCores = equipmentType.maxCores[level - 1] || 0;
        
        // Only process fully configured levels
        if (!isLevelFullyConfigured(level)) {
          continue;
        }
        
        const totalCorePower = cores.reduce((total, coreLevel) => {
          if (coreLevel) {
            const core = getCoreByLevel(coreLevel);
            return (total || 0) + (core?.power || 0);
          }
          return total || 0;
        }, 0);

        if ((totalCorePower || 0) > 0) {
          const successRate = calculateSuccessRate(
            equipmentType.name,
            level,
            serverConfig,
            totalCorePower || 0
          );
          
          const expectedAttempts = successRate > 0 ? 1 / successRate : Infinity;
          
          cores.forEach(coreLevel => {
            if (coreLevel && expectedAttempts !== Infinity) {
              // Cores are consumed on every attempt (success, break, or reset)
              expectedCoresByLevel[coreLevel] = (expectedCoresByLevel[coreLevel] || 0) + expectedAttempts;
            }
          });
        }
      }
    }

    averageSuccessRate = validLevels > 0 ? averageSuccessRate / validLevels : 0;

    // Calculate multi-level probability statistics
    const levelStats = [];
    
    for (let level = startLevel + 1; level <= targetLevel; level++) {
      const cores = levelCores[level] || [];
      const upgradeCost = getUpgradeCost(equipmentType.id, level);
      const maxCores = equipmentType.maxCores[level - 1] || 0;
      
      // Only process fully configured levels
      if (!isLevelFullyConfigured(level)) {
        continue;
      }
      
      const levelCoreCost = cores.reduce((sum, coreLevel) => {
        if (coreLevel) {
          const priceName = getCorePriceName(coreLevel);
          return (sum || 0) + (getPrice(priceName) || 0);
        }
        return sum || 0;
      }, 0);
      
      const totalCorePower = cores.reduce((total, coreLevel) => {
        if (coreLevel) {
          const core = getCoreByLevel(coreLevel);
          return (total || 0) + (core?.power || 0);
        }
        return total || 0;
      }, 0);

      if ((totalCorePower || 0) > 0) {
        const successRate = calculateSuccessRate(
          equipmentType.name,
          level,
          serverConfig,
          totalCorePower || 0
        );
        
        const levelTotalCost = upgradeCost.alz + (levelCoreCost || 0);
        levelStats.push({ 
          successRate, 
          costPerAttempt: levelTotalCost,
          level: level,
          hasResetOutcome: serverConfig.hasResetOutcome,
          cores: cores
        });
      }
    }

    const multiLevelStats: MultiLevelStats | null = levelStats.length > 0 
      ? calculateMultiLevelStatistics(levelStats) 
      : null;

    // Get expected values from multi-level stats if available
    const finalExpectedBreaks = multiLevelStats ? multiLevelStats.expectedBreaks : expectedBreaks;
    const finalExpectedResets = multiLevelStats ? multiLevelStats.expectedResets : expectedResets;
    const finalExpectedCost = multiLevelStats ? multiLevelStats.totalExpectedCost : totalExpectedCost;



    return {
      totalAlzCost,
      totalCoreCost,
      totalExpectedCost: finalExpectedCost,
      totalCoresNeeded,
      expectedCoresByLevel,
      averageSuccessRate,
      validLevels,
      totalLevels: targetLevel - startLevel,
      expectedBreaks: finalExpectedBreaks,
      expectedResets: finalExpectedResets,
      multiLevelStats
    };
  }, [levelCores, startLevel, targetLevel, equipmentType, serverConfig, prices]);

  if (!equipmentType || !serverConfig) {
    return <div>Loading...</div>;
  }

  // Ensure we always have a valid level range
  const levelRange = targetLevel > startLevel 
    ? Array.from(
        { length: targetLevel - startLevel }, 
        (_, i) => startLevel + i + 1
      )
    : [];

  return (
    <div className="space-y-6">
      {/* Configuration Section */}
      <div className="glass-panel p-6">
        <h2 className="text-2xl font-semibold mb-6">Calculator Configuration</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Server Selection */}
          <div>
            <label className="block text-sm font-semibold mb-2">Server Type</label>
            <select
              value={selectedServer}
              onChange={(e) => setSelectedServer(e.target.value)}
              className="w-full px-3 py-2 bg-theme-dark border border-border-dark rounded-md focus:outline-none focus:border-orange-400"
            >
              {SERVER_CONFIGS.map(config => (
                <option key={config.name} value={config.name}>
                  {config.displayName}
                </option>
              ))}
            </select>
            <div className="text-xs text-foreground/60 mt-1">
              {serverConfig.hasResetOutcome ? 'Has reset outcome' : 'No reset outcome'}
            </div>
          </div>

          {/* Equipment Type */}
          <div>
            <label className="block text-sm font-semibold mb-2">Equipment Type</label>
            <select
              value={selectedEquipmentType}
              onChange={(e) => setSelectedEquipmentType(e.target.value)}
              className="w-full px-3 py-2 bg-theme-dark border border-border-dark rounded-md focus:outline-none focus:border-orange-400"
            >
              {EQUIPMENT_TYPES.map(type => (
                <option key={type.id} value={type.id}>
                  {type.displayName}
                </option>
              ))}
            </select>
          </div>

          {/* Start Level */}
          <div>
            <label className="block text-sm font-semibold mb-2">Current Level</label>
            <select
              value={startLevel}
              onChange={(e) => {
                const newStartLevel = parseInt(e.target.value);
                setStartLevel(newStartLevel);
                // For standard servers (with reset outcomes), ensure target level is always start level + 1
                if (serverConfig?.hasResetOutcome) {
                  setTargetLevel(newStartLevel + 1);
                } else {
                  // For PlayCabal servers, ensure target level is at least start level + 1
                  if (targetLevel <= newStartLevel) {
                    setTargetLevel(newStartLevel + 1);
                  }
                }
              }}
              className="w-full px-3 py-2 bg-theme-dark border border-border-dark rounded-md focus:outline-none focus:border-orange-400"
            >
              {Array.from({ length: 7 }, (_, i) => (
                <option key={i} value={i}>Level {i}</option>
              ))}
            </select>
          </div>

          {/* Target Level */}
          <div>
            <label className="block text-sm font-semibold mb-2">Target Level</label>
            <div className="flex items-center">
              {serverConfig.hasResetOutcome ? (
                // Standard servers: Fixed target level
                <>
                  <div className="w-full px-3 py-2 bg-theme-dark border border-border-dark rounded-md text-foreground/60">
                    Level {targetLevel}
                  </div>
                  <div className="ml-2 text-xs text-orange-400">
                    <span className="inline-block" title="For standard servers, target level is automatically set to current level + 1">ⓘ</span>
                  </div>
                </>
              ) : (
                // PlayCabal servers: Selectable target level
                <select
                  value={targetLevel}
                  onChange={(e) => setTargetLevel(parseInt(e.target.value))}
                  className="w-full px-3 py-2 bg-theme-dark border border-border-dark rounded-md focus:outline-none focus:border-orange-400"
                >
                  {Array.from({ length: 7 - startLevel }, (_, i) => {
                    const level = startLevel + i + 1;
                    return (
                      <option key={level} value={level}>Level {level}</option>
                    );
                  })}
                </select>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Core Price Configuration */}
      <CorePriceConfig />

      {/* Upgrade Levels */}
      {levelRange.length > 0 && (
        <div>
          {/* Warning if not all levels are fully configured - Only for non-reset servers */}
          {!serverConfig.hasResetOutcome && summaryStats && summaryStats.validLevels < summaryStats.totalLevels && (
            <div className="mb-4 p-3 bg-orange-600/10 border border-orange-600/30 rounded-md text-orange-400">
              <strong>Notice:</strong> Currently showing results for {summaryStats.validLevels} of {summaryStats.totalLevels} levels. Fill all core slots for each level to see complete statistics.
            </div>
          )}
          
          {levelRange.map(level => (
            <UpgradeLevelSection
              key={level}
              level={level}
              equipmentType={equipmentType}
              serverConfig={serverConfig}
              selectedCores={levelCores[level] || []}
              onCoreChange={(slotIndex, coreLevel) => handleCoreChange(level, slotIndex, coreLevel)}
              isExpanded={expandedLevels[level] || false}
              onToggleExpand={() => toggleLevelExpansion(level)}
            />
          ))}
        </div>
      )}

      {/* Summary - Only show for non-reset servers */}
      {!serverConfig.hasResetOutcome && summaryStats && summaryStats.validLevels > 0 && (
        <div className="glass-panel p-6">
          <h2 className="text-2xl font-semibold mb-6">Upgrade Summary</h2>
          
          {/* Expected Section */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-6 bg-blue-400 rounded-full"></div>
              <h3 className="text-xl font-semibold text-blue-400">Average</h3>
              <div className="flex-1 h-px bg-gradient-to-r from-blue-400/30 to-transparent"></div>
            </div>
            
            {/* All Cards in One Row */}
            <div className="grid gap-4" style={{gridTemplateColumns: `repeat(${3 + (serverConfig.hasResetOutcome ? 1 : 0) + Object.keys(summaryStats.expectedCoresByLevel).length}, 1fr)`}}>
              <div className="glass-panel-light p-4 rounded-xl">
                <div className="text-xs font-medium text-game-gold/80 uppercase tracking-wide mb-2">Total Cost</div>
                <div className="text-2xl font-bold text-game-gold mb-1">
                  {summaryStats.totalExpectedCost === Infinity 
                    ? '∞' 
                    : formatNumber(Math.round(summaryStats.totalExpectedCost))
                  }
                </div>
                <div className="text-xs text-foreground/60">ALZ + Cores</div>
              </div>
              
              <div className="glass-panel-light p-4 rounded-xl">
                <div className="text-xs font-medium text-game-gold/80 uppercase tracking-wide mb-2">Average Attempts</div>
                <div className="text-2xl font-bold text-game-gold mb-1">
                  {summaryStats.multiLevelStats?.totalExpectedAttempts === Infinity 
                    ? '∞' 
                    : summaryStats.multiLevelStats?.totalExpectedAttempts?.toFixed(1) || '0.0'
                  }
                </div>
                <div className="text-xs text-foreground/60">Mathematical expectation</div>
              </div>
              
              <div className="glass-panel-light p-4 rounded-xl">
                <div className="text-xs font-medium text-game-gold/80 uppercase tracking-wide mb-2">Average Breaks</div>
                <div className="text-2xl font-bold text-game-gold mb-1">
                  {summaryStats.expectedBreaks.toFixed(1)}
                </div>
                <div className="text-xs text-foreground/60">Mathematical expectation</div>
              </div>
              
              {serverConfig.hasResetOutcome && (
                <div className="glass-panel-light p-4 rounded-xl">
                  <div className="text-xs font-medium text-game-gold/80 uppercase tracking-wide mb-2">Average Resets</div>
                  <div className="text-2xl font-bold text-game-gold mb-1">
                    {summaryStats.expectedResets.toFixed(1)}
                  </div>
                  <div className="text-xs text-foreground/60">Mathematical expectation</div>
                </div>
              )}

              {/* Core Requirements */}
              {Object.entries(summaryStats.expectedCoresByLevel)
                .sort(([a], [b]) => parseInt(a) - parseInt(b))
                .map(([coreLevel, expectedCount]) => {
                  const core = getCoreByLevel(parseInt(coreLevel));
                  return (
                    <div key={coreLevel} className="glass-panel-light p-4 rounded-xl">
                      <div className="flex items-center justify-between mb-2">
                        <div className="text-xs font-medium text-game-gold/80 uppercase tracking-wide">Level {coreLevel} Cores</div>
                        <div className="w-8 h-8 flex-shrink-0">
                          <Image
                            src={core?.imagePath || '/images/extreme-upgrade/extreme-core-1-2-3.png'}
                            alt={`Core Level ${coreLevel}`}
                            width={32}
                            height={32}
                            className="object-contain"
                          />
                        </div>
                      </div>
                      <div className="text-2xl font-bold text-game-gold mb-1">
                        {expectedCount.toFixed(1)}
                      </div>
                      <div className="text-xs text-foreground/60">Average needed</div>
                    </div>
                  );
                })}
            </div>

          </div>

          {/* 95% Confidence Section */}
          {summaryStats.multiLevelStats && (
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-purple-400 rounded-full"></div>
                <h3 className="text-xl font-semibold text-purple-400">95% Confidence</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-purple-400/30 to-transparent"></div>
                <div className="text-xs text-purple-400/70 bg-purple-400/10 px-2 py-1 rounded-full">Safe Budget</div>
              </div>
              
              {/* All Cards in One Row */}
              <div className="grid gap-4" style={{gridTemplateColumns: `repeat(${3 + (summaryStats.multiLevelStats.confidence95CoresByLevel ? Object.keys(summaryStats.multiLevelStats.confidence95CoresByLevel).length : 0)}, 1fr)`}}>
                <div className="glass-panel-light p-4 rounded-xl">
                  <div className="text-xs font-medium text-game-gold/80 uppercase tracking-wide mb-2">Total Cost</div>
                  <div className="text-2xl font-bold text-game-gold mb-1">
                    {formatNumber(Math.round(summaryStats.multiLevelStats.confidence95Cost))}
                  </div>
                  <div className="text-xs text-foreground/60">95% chance to succeed within budget</div>
                </div>
                
                <div className="glass-panel-light p-4 rounded-xl">
                  <div className="text-xs font-medium text-game-gold/80 uppercase tracking-wide mb-2">Max Attempts</div>
                  <div className="text-2xl font-bold text-game-gold mb-1">
                    {summaryStats.multiLevelStats.confidence95Attempts?.toFixed(0) || '0'}
                  </div>
                  <div className="text-xs text-foreground/60">95% chance need this many or fewer</div>
                </div>
                
                <div className="glass-panel-light p-4 rounded-xl">
                  <div className="text-xs font-medium text-game-gold/80 uppercase tracking-wide mb-2">Max Breaks</div>
                  <div className="text-2xl font-bold text-game-gold mb-1">
                    {summaryStats.multiLevelStats.confidence95Breaks?.toFixed(0) || '0'}
                  </div>
                  <div className="text-xs text-foreground/60">Worst case within 95% confidence</div>
                </div>

                {/* Core Requirements */}
                {summaryStats.multiLevelStats.confidence95CoresByLevel && 
                  Object.entries(summaryStats.multiLevelStats.confidence95CoresByLevel)
                    .sort(([a], [b]) => parseInt(a) - parseInt(b))
                    .map(([coreLevel, coreCount]) => {
                      const core = getCoreByLevel(parseInt(coreLevel));
                      return (
                        <div key={`95-${coreLevel}`} className="glass-panel-light p-4 rounded-xl">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-xs font-medium text-game-gold/80 uppercase tracking-wide">Level {coreLevel} Cores</div>
                            <div className="w-8 h-8 flex-shrink-0">
                              <Image
                                src={core?.imagePath || '/images/extreme-upgrade/extreme-core-1-2-3.png'}
                                alt={`Core Level ${coreLevel}`}
                                width={32}
                                height={32}
                                className="object-contain"
                              />
                            </div>
                          </div>
                          <div className="text-2xl font-bold text-game-gold mb-1">
                            {Math.ceil(coreCount)}
                          </div>
                          <div className="text-xs text-foreground/60">95% chance need this many or fewer</div>
                        </div>
                      );
                    })}
              </div>

            </div>
          )}

          {/* 99% Confidence Section */}
          {summaryStats.multiLevelStats && (
            <div className="mb-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-6 bg-red-400 rounded-full"></div>
                <h3 className="text-xl font-semibold text-red-400">99% Confidence</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-red-400/30 to-transparent"></div>
                <div className="text-xs text-red-400/70 bg-red-400/10 px-2 py-1 rounded-full">Conservative</div>
              </div>
              
              {/* All Cards in One Row */}
              <div className="grid gap-4" style={{gridTemplateColumns: `repeat(${3 + (summaryStats.multiLevelStats.confidence99CoresByLevel ? Object.keys(summaryStats.multiLevelStats.confidence99CoresByLevel).length : 0)}, 1fr)`}}>
                <div className="glass-panel-light p-4 rounded-xl">
                  <div className="text-xs font-medium text-game-gold/80 uppercase tracking-wide mb-2">Total Cost</div>
                  <div className="text-2xl font-bold text-game-gold mb-1">
                    {formatNumber(Math.round(summaryStats.multiLevelStats.confidence99Cost))}
                  </div>
                  <div className="text-xs text-foreground/60">99% chance to succeed within budget</div>
                </div>
                
                <div className="glass-panel-light p-4 rounded-xl">
                  <div className="text-xs font-medium text-game-gold/80 uppercase tracking-wide mb-2">Max Attempts</div>
                  <div className="text-2xl font-bold text-game-gold mb-1">
                    {summaryStats.multiLevelStats.confidence99Attempts?.toFixed(0) || '0'}
                  </div>
                  <div className="text-xs text-foreground/60">99% chance need this many or fewer</div>
                </div>
                
                <div className="glass-panel-light p-4 rounded-xl">
                  <div className="text-xs font-medium text-game-gold/80 uppercase tracking-wide mb-2">Max Breaks</div>
                  <div className="text-2xl font-bold text-game-gold mb-1">
                    {summaryStats.multiLevelStats.confidence99Breaks?.toFixed(0) || '0'}
                  </div>
                  <div className="text-xs text-foreground/60">Worst case within 99% confidence</div>
                </div>

                {/* Core Requirements */}
                {summaryStats.multiLevelStats.confidence99CoresByLevel && 
                  Object.entries(summaryStats.multiLevelStats.confidence99CoresByLevel)
                    .sort(([a], [b]) => parseInt(a) - parseInt(b))
                    .map(([coreLevel, coreCount]) => {
                      const core = getCoreByLevel(parseInt(coreLevel));
                      return (
                        <div key={`99-${coreLevel}`} className="glass-panel-light p-4 rounded-xl">
                          <div className="flex items-center justify-between mb-2">
                            <div className="text-xs font-medium text-game-gold/80 uppercase tracking-wide">Level {coreLevel} Cores</div>
                            <div className="w-8 h-8 flex-shrink-0">
                              <Image
                                src={core?.imagePath || '/images/extreme-upgrade/extreme-core-1-2-3.png'}
                                alt={`Core Level ${coreLevel}`}
                                width={32}
                                height={32}
                                className="object-contain"
                              />
                            </div>
                          </div>
                          <div className="text-2xl font-bold text-game-gold mb-1">
                            {Math.ceil(coreCount)}
                          </div>
                          <div className="text-xs text-foreground/60">99% chance need this many or fewer</div>
                        </div>
                      );
                    })}
              </div>

            </div>
          )}

          {summaryStats.validLevels < summaryStats.totalLevels && (
            <div className="mt-4 p-4 bg-orange-600/10 border border-orange-600/30 rounded-lg">
              <div className="text-sm text-orange-400">
                <div className="font-semibold mb-1">⚠️ Incomplete Configuration</div>
                <div>
                  Configure cores for all levels to see accurate cost calculations. 
                  {summaryStats.totalLevels - summaryStats.validLevels} level(s) still need core selection.
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Data Summary Section */}
      <DataSummary />
    </div>
  );
}