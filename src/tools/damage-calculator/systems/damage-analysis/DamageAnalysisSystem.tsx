/**
 * Damage Analysis System
 * Provides detailed damage calculations and stat optimization analysis
 */

'use client';

import React, { useState, useMemo } from 'react';
import { useBuildPlannerStore } from '../../stores/buildPlannerStore';
import { useMonsterStore } from '../../stores/monsterStore';
import DamageCalculationModal from '../../components/main-layout/DamageCalculationModal';
import { analyzeStatOptimization, formatDamageNumber, formatPercentage } from '../../utils/statOptimizationUtils';
import { getAllCombinedStats } from '../../utils/statCombinationUtils';
import { IoCalculator, IoTrendingUp, IoBarChart } from 'react-icons/io5';
import { GiMagicSwirl, GiCrosshair, GiUpgrade } from 'react-icons/gi';
import { RiSwordFill } from 'react-icons/ri';
import { getClassDamageType } from '../../utils/classDamageUtils';

const DamageAnalysisSystem: React.FC = () => {
  const [showCalculationModal, setShowCalculationModal] = useState(false);

  const selectedClass = useBuildPlannerStore((state) => state.selectedClass);
  const buildStats = useBuildPlannerStore((state) => state.buildStats);
  const enemyConfig = useBuildPlannerStore((state) => state.enemyConfig);
  const characterLevel = useBuildPlannerStore((state) => state.characterLevel);
  const damageStats = useBuildPlannerStore((state) => state.damageStats);
  const { selectedMonster } = useMonsterStore();

  // Get combined stats for optimization analysis
  const combinedStats = useMemo(() => {
    if (!selectedClass || !buildStats) return null;
    return getAllCombinedStats(buildStats, selectedClass, 'pve');
  }, [selectedClass, buildStats]);

  // Perform stat optimization analysis
  const optimizationAnalysis = useMemo(() => {
    if (!selectedClass || !combinedStats) return null;
    
    return analyzeStatOptimization(
      combinedStats,
      enemyConfig,
      selectedClass,
      characterLevel
    );
  }, [selectedClass, combinedStats, enemyConfig, characterLevel]);

  if (!selectedClass) {
    return (
      <div className="text-center py-12">
        <div className="mb-4">
          <IoBarChart className="mx-auto text-6xl text-gray-600" />
        </div>
        <h3 className="text-xl font-semibold text-gray-400 mb-2">No Class Selected</h3>
        <p className="text-gray-500 mb-4">
          Please select a character class to access damage analysis.
        </p>
        <p className="text-sm text-gray-600">
          Damage analysis requires a character class to calculate class-specific damage formulas.
        </p>
      </div>
    );
  }

  const damageType = getClassDamageType(selectedClass);
  const damageIcon = damageType === 'magic' ? <GiMagicSwirl /> : <RiSwordFill />;
  const damageTypeLabel = damageType === 'magic' ? 'Magic' : 'Sword';

  return (
    <>
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <div className="flex items-center justify-center gap-3 mb-2">
            <IoBarChart className="text-3xl text-game-gold" />
            <h2 className="text-2xl font-bold text-game-gold">Damage Analysis</h2>
          </div>
          <p className="text-gray-400">
            Detailed damage calculations and stat optimization recommendations
          </p>
        </div>

        {/* Current Target Info */}
        <div className="glass-panel p-4">
          <h3 className="text-lg font-semibold text-red-400 mb-3 flex items-center gap-2">
            <GiCrosshair />
            Analysis Target: {selectedMonster?.name || 'No Monster Selected'}
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-gray-400">Level</div>
              <div className="text-white font-medium">{enemyConfig.level}</div>
            </div>
            <div className="text-center">
              <div className="text-gray-400">Defense</div>
              <div className="text-white font-medium">{formatDamageNumber(enemyConfig.defense)}</div>
            </div>
            {enemyConfig.ignorePenetration > 0 && (
              <div className="text-center">
                <div className="text-gray-400">Ignore Pen</div>
                <div className="text-white font-medium">{formatDamageNumber(enemyConfig.ignorePenetration)}</div>
              </div>
            )}
            {enemyConfig.damageReduction > 0 && (
              <div className="text-center">
                <div className="text-gray-400">Dmg Reduction</div>
                <div className="text-white font-medium">{formatDamageNumber(enemyConfig.damageReduction)}</div>
              </div>
            )}
          </div>
        </div>

        {/* Current Damage Overview */}
        <div className="glass-panel p-6">
          <h3 className="text-lg font-semibold text-blue-400 mb-4 flex items-center gap-2">
            {damageIcon}
            Current {damageTypeLabel} Damage
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Normal Hit */}
            <div className="bg-gray-800/30 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-gray-300 mb-2">Normal Hit</h4>
              <div className="text-2xl font-bold text-white mb-1">
                {damageStats.pveAttack ? 
                  `${formatDamageNumber(damageStats.pveAttack.normal.min)} - ${formatDamageNumber(damageStats.pveAttack.normal.max)}` : 
                  '0 - 0'
                }
              </div>
              <div className="text-sm text-gray-400">
                Average: {damageStats.pveAttack ? 
                  formatDamageNumber((damageStats.pveAttack.normal.min + damageStats.pveAttack.normal.max) / 2) : 
                  '0'
                }
              </div>
            </div>

            {/* Critical Hit */}
            <div className="bg-gray-800/30 rounded-lg p-4">
              <h4 className="text-sm font-semibold text-yellow-400 mb-2">Critical Hit</h4>
              <div className="text-2xl font-bold text-yellow-400 mb-1">
                {damageStats.pveAttack ? 
                  `${formatDamageNumber(damageStats.pveAttack.critical.min)} - ${formatDamageNumber(damageStats.pveAttack.critical.max)}` : 
                  '0 - 0'
                }
              </div>
              <div className="text-sm text-gray-400">
                Average: {damageStats.pveAttack ? 
                  formatDamageNumber((damageStats.pveAttack.critical.min + damageStats.pveAttack.critical.max) / 2) : 
                  '0'
                }
              </div>
            </div>
          </div>

          {/* Detailed Calculation Button */}
          <div className="mt-4 text-center">
            <button
              onClick={() => setShowCalculationModal(true)}
              className="px-6 py-2 bg-blue-600/20 text-blue-400 rounded border border-blue-400/30 hover:bg-blue-600/30 transition-colors flex items-center gap-2 mx-auto"
            >
              <IoCalculator />
              View Step-by-Step Calculation
            </button>
          </div>
        </div>

        {/* Stat Optimization Analysis */}
        {optimizationAnalysis && (
          <div className="glass-panel p-6">
            <h3 className="text-lg font-semibold text-game-gold mb-4 flex items-center gap-2">
              <IoTrendingUp />
              Stat Optimization Analysis
            </h3>
            
            <div className="mb-4 p-3 bg-gradient-to-r from-game-gold/10 to-green-500/10 rounded-lg border border-game-gold/20">
              <div className="flex items-center gap-2 mb-2">
                <GiUpgrade className="text-game-gold" />
                <span className="text-sm font-semibold text-game-gold">Best Stat to Increase</span>
              </div>
              <div className="text-lg font-bold text-white">
                {optimizationAnalysis.bestStat.displayName}
              </div>
              <div className="text-sm text-gray-300">
                +1 point = +{formatDamageNumber(optimizationAnalysis.bestStat.damageIncrease.average)} average damage 
                ({formatPercentage(optimizationAnalysis.bestStat.damageIncreasePercent.average)})
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="text-sm font-semibold text-gray-300 mb-3">Damage Increase per +1 Stat Point</h4>
              {optimizationAnalysis.optimizations.slice(0, 8).map((stat, index) => (
                <div 
                  key={stat.statName}
                  className={`flex items-center justify-between p-3 rounded-lg ${
                    index === 0 ? 'bg-game-gold/10 border border-game-gold/20' : 'bg-gray-800/30'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                      index === 0 ? 'bg-game-gold text-black' : 'bg-gray-600 text-white'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <div className={`font-medium ${index === 0 ? 'text-game-gold' : 'text-white'}`}>
                        {stat.displayName}
                      </div>
                      <div className="text-xs text-gray-400">
                        Current: {formatDamageNumber(stat.currentValue)}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className={`font-bold ${index === 0 ? 'text-game-gold' : 'text-white'}`}>
                      +{formatDamageNumber(stat.damageIncrease.average)}
                    </div>
                    <div className="text-xs text-gray-400">
                      {formatPercentage(stat.damageIncreasePercent.average)}
                    </div>
                  </div>
                </div>
              ))}
            </div>


          </div>
        )}
      </div>

      {/* Damage Calculation Modal */}
      <DamageCalculationModal
        isOpen={showCalculationModal}
        onClose={() => setShowCalculationModal(false)}
        title={`${damageTypeLabel} Damage Calculation vs ${selectedMonster?.name || 'No Monster'}`}
      />
    </>
  );
};

export default DamageAnalysisSystem;