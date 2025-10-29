/**
 * Enhanced Damage Calculation Modal
 * Shows detailed step-by-step damage calculations for debugging and understanding
 */

'use client';

import React from 'react';
import { useBuildPlannerStore } from '../../stores/buildPlannerStore';
import { useStatRegistryStore } from '../../stores/statRegistryStore';
import { getAllCombinedStats } from '../../utils/statCombinationUtils';
import { calculateDamageWithSteps, type DamageCalculationStats } from '../../utils/damageCalculationUtils';
import { IoClose } from 'react-icons/io5';

interface DamageCalculationModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

// Helper function to format numbers with commas
const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US');
};

const DamageCalculationModal: React.FC<DamageCalculationModalProps> = ({
  isOpen,
  onClose,
  title
}) => {
  const buildStats = useBuildPlannerStore((state) => state.buildStats);
  const damageStats = useBuildPlannerStore((state) => state.damageStats);
  const characterLevel = useBuildPlannerStore((state) => state.characterLevel);
  const enemyConfig = useBuildPlannerStore((state) => state.enemyConfig);
  const selectedClass = useBuildPlannerStore((state) => state.selectedClass);
  const getAllStats = useStatRegistryStore((state) => state.getAllStats);

  if (!isOpen || !selectedClass) return null;

  // Get combined stats for PvE (always use PvE for damage calculations)
  const combinedStats = selectedClass ? getAllCombinedStats(buildStats, selectedClass, 'pve') : buildStats;
  
  // Convert to DamageCalculationStats format
  const calculationStats: DamageCalculationStats = {
    attack: combinedStats.attack || 0,
    magicAttack: combinedStats.magicAttack || 0,
    penetration: combinedStats.penetration || 0,
    cancelIgnorePenetration: combinedStats.cancelIgnorePenetration || 0,
    criticalDamage: combinedStats.criticalDamage || 0,
    normalDamageUp: combinedStats.normalDamageUp || 0,
    skillAmp: combinedStats.skillAmp || 0,
    swordSkillAmp: combinedStats.swordSkillAmp || 0,
    magicSkillAmp: combinedStats.magicSkillAmp || 0,
    addDamage: combinedStats.addDamage || 0,
    finalDamageIncreased: combinedStats.finalDamageIncreased || 0,
    ignoreDamageReduction: combinedStats.ignoreDamageReduction || 0,
    ignoreResistCriticalDamage: combinedStats.ignoreResistCriticalDamage || 0,
  };

  // Calculate damage with detailed steps using the shared utility
  const damageResult = calculateDamageWithSteps(
    calculationStats,
    characterLevel,
    enemyConfig,
    selectedClass,
    true // Include detailed steps
  );

  // Extract the calculation steps
  const steps = damageResult.steps!;
  
  // Extract values for display (using the steps data)
  const {
    baseAttackValue,
    totalSkillAmp,
    playerLevel,
    enemyLevel,
    levelDifference,
    levelPenaltyPercent,
    basePenetration,
    enemyIgnorePenetration,
    cancelIgnorePenetration,
    effectiveEnemyIgnorePenetration,
    effectivePenetration,
    enemyDefense,
    finalDefenseReduction: defenseReduction,
    baseDamage,
    amplifiedDamage,
    levelAdjustedDamage,
    defenseAdjustedDamage,
    withAddDamage,
    afterDamageReduction,
    finalBaseDamage,
    minNormalDamage,
    maxNormalDamage,
    minCriticalDamage,
    maxCriticalDamage,
    normalDamageWithNormalUp,
    criticalDamageValue,
    damageType,
    // Critical damage resistance values
    criticalDamage,
    ignoreResistCriticalDamage,
    enemyResistCritDmg,
    effectiveEnemyResistCritDmg,
    effectiveCritDamage,
    // Ignore damage reduction values
    ignoreDamageReduction,
    enemyDamageReduction,
    enemyDamageReductionPercent,
    effectiveEnemyDamageReduction,
    effectiveEnemyDamageReductionPercent
  } = steps;

  // Extract stats for display
  const normalDamageUp = calculationStats.normalDamageUp;
  const addDamage = calculationStats.addDamage;
  const finalDamageIncreased = calculationStats.finalDamageIncreased;

  // Extract enemy stats for display
  const enemyFinalDamageDecrease = enemyConfig.finalDamageDecrease || 0;

  const StepRow: React.FC<{ 
    step: string; 
    minValue: number; 
    maxValue: number; 
    formula?: string;
    highlight?: boolean;
  }> = ({ step, minValue, maxValue, formula, highlight = false }) => (
    <div className={`grid grid-cols-3 gap-4 py-3 px-4 rounded-lg transition-all duration-200 ${
      highlight 
        ? 'glass-panel-light border-l-4 border-game-gold shadow-lg' 
        : 'glass-panel hover:glass-panel-light'
    }`}>
      <div className="flex flex-col">
        <div className={`font-semibold text-sm ${
          highlight ? 'text-game-gold' : 'text-gray-200'
        }`}>
          {step}
        </div>
      </div>
      
      <div className="flex flex-col">
        <div className="text-xs text-gray-300 font-mono break-all">{formula || ''}</div>
      </div>
      
      <div className="text-right font-mono">
        <div className={`text-sm font-bold ${
          highlight ? 'text-game-gold' : 'text-white'
        }`}>
          {formatNumber(Math.round(minValue))}
          {minValue !== maxValue && ` - ${formatNumber(Math.round(maxValue))}`}
        </div>
      </div>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="glass-panel-dark max-w-6xl w-full max-h-[90vh] overflow-hidden shadow-game">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border-light">
          <h2 className="text-xl font-bold text-game-gold glow-text-sm">{title} - Step-by-Step Calculation</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-game-gold transition-colors p-1 rounded-md hover:bg-theme-light/30"
          >
            <IoClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 overflow-y-auto max-h-[calc(90vh-80px)] dark-scrollbar">
          {/* Input Values */}
          <div className="mb-6 grid grid-cols-1 lg:grid-cols-2 gap-4">
            {/* Player Stats */}
            <div className="glass-panel p-4">
              <h3 className="text-sm font-semibold text-game-gold mb-3 flex items-center">
                <span className="w-2 h-2 bg-game-gold rounded-full mr-2"></span>
                Player Stats
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="text-gray-300">Player Level: <span className="text-white font-mono">{playerLevel}</span></div>
                <div className="text-gray-300">Base Attack: <span className="text-white font-mono">{formatNumber(baseAttackValue)}</span></div>
                <div className="text-gray-300">Skill Amp: <span className="text-white font-mono">{totalSkillAmp}%</span></div>
                <div className="text-gray-300">Base Penetration: <span className="text-white font-mono">{formatNumber(basePenetration)}</span></div>
                <div className="text-gray-300">Cancel Ignore Pen: <span className="text-white font-mono">{formatNumber(cancelIgnorePenetration)}</span></div>
                <div className="text-gray-300">Normal DMG Up: <span className="text-white font-mono">{normalDamageUp}%</span></div>
                <div className="text-gray-300">Add Damage: <span className="text-white font-mono">{formatNumber(addDamage)}</span></div>
                <div className="text-gray-300">Base Critical DMG: <span className="text-white font-mono">{criticalDamage}%</span></div>
                <div className="text-gray-300">Ignore Resist Crit DMG: <span className="text-white font-mono">{ignoreResistCriticalDamage}%</span></div>
                <div className="text-gray-300">Ignore DMG Reduction: <span className="text-white font-mono">{ignoreDamageReduction}</span></div>
                <div className="text-gray-300">Final DMG Increased: <span className="text-white font-mono">{finalDamageIncreased}%</span></div>
              </div>
            </div>

            {/* Boss/Monster Stats */}
            <div className="glass-panel p-4">
              <h3 className="text-sm font-semibold text-red-400 mb-3 flex items-center">
                <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                Boss/Monster Stats
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="text-gray-300">Enemy Level: <span className="text-white font-mono">{enemyLevel}</span></div>
                <div className="text-gray-300">Enemy Defense: <span className="text-white font-mono">{formatNumber(enemyDefense)}</span></div>
                <div className="text-gray-300">Enemy Ignore Pen: <span className="text-white font-mono">{formatNumber(enemyIgnorePenetration)}</span></div>
                <div className="text-gray-300">Enemy Resist Crit DMG: <span className="text-white font-mono">{enemyResistCritDmg}%</span></div>
                <div className="text-gray-300">Enemy DMG Reduction: <span className="text-white font-mono">{enemyDamageReduction}</span></div>
                <div className="text-gray-300">Enemy DMG Reduction %: <span className="text-white font-mono">{enemyDamageReductionPercent}%</span></div>
                <div className="text-gray-300">Final DMG Decrease: <span className="text-white font-mono">{enemyFinalDamageDecrease}%</span></div>
              </div>
              
              {/* Effective Values */}
              <div className="mt-4 pt-3 border-t border-border-light">
                <h4 className="text-xs font-semibold text-gray-400 mb-2">Effective Values (After Player Modifiers)</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="text-gray-300">Effective Enemy Ignore: <span className="text-white font-mono">{formatNumber(effectiveEnemyIgnorePenetration)}</span></div>
                  <div className="text-gray-300">Effective Penetration: <span className="text-white font-mono">{formatNumber(effectivePenetration)}</span></div>
                  <div className="text-gray-300">Effective Enemy Resist: <span className="text-white font-mono">{effectiveEnemyResistCritDmg}%</span></div>
                  <div className="text-gray-300">Effective Critical DMG: <span className="text-white font-mono">{effectiveCritDamage}%</span></div>
                  <div className="text-gray-300">Effective Enemy DMG Red: <span className="text-white font-mono">{effectiveEnemyDamageReduction}</span></div>
                  <div className="text-gray-300">Effective Enemy DMG Red %: <span className="text-white font-mono">{effectiveEnemyDamageReductionPercent}%</span></div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
            {/* Normal Hit Calculation */}
            <div className="glass-panel">
              <div className="p-4 pb-3 border-b border-border-light">
                <h3 className="text-lg font-semibold text-gray-200">Normal Hit Step-by-Step</h3>
              </div>
              <div className="p-4 space-y-3">

                <StepRow 
                  step="1. Base Attack" 
                  minValue={baseDamage} 
                  maxValue={baseDamage}
                  formula={`${formatNumber(baseAttackValue)}`}
                />

                <StepRow 
                  step="2. Skill Amplification" 
                  minValue={amplifiedDamage} 
                  maxValue={amplifiedDamage}
                  formula={`${formatNumber(baseAttackValue)} × ${(100 + totalSkillAmp)/100}`}
                />

                {enemyDefense > 0 && (
                  <StepRow 
                    step="3a. Base Defense" 
                    minValue={enemyDefense > 0 ? ((1 - (1 / (1 + enemyDefense / 1000))) * 100) : 0} 
                    maxValue={enemyDefense > 0 ? ((1 - (1 / (1 + enemyDefense / 1000))) * 100) : 0}
                    formula={`1 - 1/(1 + ${formatNumber(enemyDefense)}/1000) = ${((1 - (1 / (1 + enemyDefense / 1000))) * 100).toFixed(2)}%`}
                  />
                )}

                {enemyDefense > 0 && (enemyIgnorePenetration > 0 || cancelIgnorePenetration > 0) && (
                  <StepRow 
                    step="3b. Ignore Penetration" 
                    minValue={effectiveEnemyIgnorePenetration} 
                    maxValue={effectiveEnemyIgnorePenetration}
                    formula={`max(0, ${formatNumber(enemyIgnorePenetration)} - ${formatNumber(cancelIgnorePenetration)}) = ${formatNumber(effectiveEnemyIgnorePenetration)}`}
                  />
                )}

                {enemyDefense > 0 && (basePenetration > 0 || effectiveEnemyIgnorePenetration > 0) && (
                  <StepRow 
                    step="3c. Effective Penetration" 
                    minValue={effectivePenetration} 
                    maxValue={effectivePenetration}
                    formula={`max(0, ${formatNumber(basePenetration)} - ${formatNumber(effectiveEnemyIgnorePenetration)}) = ${formatNumber(effectivePenetration)}`}
                  />
                )}

                {enemyDefense > 0 && effectivePenetration > 0 && (
                  <StepRow 
                    step="3d. Penetration Effect" 
                    minValue={((effectivePenetration / enemyDefense) * 100)} 
                    maxValue={((effectivePenetration / enemyDefense) * 100)}
                    formula={`${formatNumber(effectivePenetration)}/${formatNumber(enemyDefense)} = ${((effectivePenetration / enemyDefense) * 100).toFixed(2)}% reduction`}
                  />
                )}

                <StepRow 
                  step="3e. Defense Applied" 
                  minValue={defenseAdjustedDamage} 
                  maxValue={defenseAdjustedDamage}
                  formula={enemyDefense > 0 ? `Final: ${(defenseReduction * 100).toFixed(2)}% → ${formatNumber(Math.round(amplifiedDamage))} × ${(1 - defenseReduction).toFixed(3)}` : `No defense`}
                />

                {normalDamageUp > 0 && (
                  <StepRow 
                    step="4. Normal Damage Up" 
                    minValue={levelAdjustedDamage} 
                    maxValue={levelAdjustedDamage}
                    formula={`${formatNumber(Math.round(defenseAdjustedDamage))} × ${(100 + normalDamageUp)/100}`}
                  />
                )}

                {addDamage > 0 && (
                  <StepRow 
                    step="5. Add Damage" 
                    minValue={withAddDamage} 
                    maxValue={withAddDamage}
                    formula={`${formatNumber(Math.round(normalDamageUp > 0 ? levelAdjustedDamage : defenseAdjustedDamage))} + ${formatNumber(addDamage)}`}
                  />
                )}

                {(enemyDamageReduction > 0 || enemyDamageReductionPercent > 0) && (
                  <StepRow 
                    step="6. Enemy Damage Reduction" 
                    minValue={afterDamageReduction} 
                    maxValue={afterDamageReduction}
                    formula={`(${formatNumber(Math.round(withAddDamage))} - ${enemyDamageReduction}) × ${(100 - enemyDamageReductionPercent)/100}`}
                  />
                )}

                <StepRow 
                  step="7. Final Modifiers" 
                  minValue={afterDamageReduction * (100 + finalDamageIncreased)/100 * (100 - enemyFinalDamageDecrease)/100} 
                  maxValue={afterDamageReduction * (100 + finalDamageIncreased)/100 * (100 - enemyFinalDamageDecrease)/100}
                  formula={`${formatNumber(Math.round(afterDamageReduction))} × ${(100 + finalDamageIncreased)/100} × ${(100 - enemyFinalDamageDecrease)/100}`}
                />

                {levelDifference > 0 && (
                  <StepRow 
                    step="8. Level Penalty" 
                    minValue={finalBaseDamage} 
                    maxValue={finalBaseDamage}
                    formula={`${formatNumber(Math.round(afterDamageReduction * (100 + finalDamageIncreased)/100 * (100 - enemyFinalDamageDecrease)/100))} × ${(100 - levelPenaltyPercent)/100}`}
                  />
                )}

                {damageType === 'sword' && (
                  <StepRow 
                    step="9. Sword Variance" 
                    minValue={minNormalDamage} 
                    maxValue={maxNormalDamage}
                    formula={`${formatNumber(Math.round(finalBaseDamage))} × (0.80 to 1.00)`}
                    highlight={true}
                  />
                )}

                {damageType === 'magic' && levelDifference === 0 && (
                  <StepRow 
                    step="8. Final Result" 
                    minValue={minNormalDamage} 
                    maxValue={maxNormalDamage}
                    formula={`No variance for magic`}
                    highlight={true}
                  />
                )}

                {damageType === 'magic' && levelDifference > 0 && (
                  <StepRow 
                    step="9. Final Result" 
                    minValue={minNormalDamage} 
                    maxValue={maxNormalDamage}
                    formula={`No variance for magic`}
                    highlight={true}
                  />
                )}
              </div>
            </div>

            {/* Critical Hit Calculation */}
            <div className="glass-panel">
              <div className="p-4 pb-3 border-b border-border-light">
                <h3 className="text-lg font-semibold text-gray-200">Critical Hit Step-by-Step</h3>
              </div>
              <div className="p-3">

                <StepRow 
                  step="1. Base" 
                  minValue={baseDamage} 
                  maxValue={baseDamage}
                  formula={`${formatNumber(baseAttackValue)}`}
                />

                <StepRow 
                  step="2. Skill Amp" 
                  minValue={amplifiedDamage} 
                  maxValue={amplifiedDamage}
                  formula={`${formatNumber(baseAttackValue)} × ${(100 + totalSkillAmp)/100}`}
                />

                <StepRow 
                  step="3. Level Penalty" 
                  minValue={levelAdjustedDamage} 
                  maxValue={levelAdjustedDamage}
                  formula={levelDifference > 0 ? `${formatNumber(Math.round(amplifiedDamage))} × ${(100 - levelPenaltyPercent)/100}` : `No penalty (${playerLevel} vs ${enemyLevel})`}
                />

                {enemyDefense > 0 && (
                  <StepRow 
                    step="4a. Base Defense" 
                    minValue={enemyDefense > 0 ? ((1 - (1 / (1 + enemyDefense / 1000))) * 100) : 0} 
                    maxValue={enemyDefense > 0 ? ((1 - (1 / (1 + enemyDefense / 1000))) * 100) : 0}
                    formula={`1 - 1/(1 + ${formatNumber(enemyDefense)}/1000) = ${((1 - (1 / (1 + enemyDefense / 1000))) * 100).toFixed(2)}%`}
                  />
                )}

                {enemyDefense > 0 && (enemyIgnorePenetration > 0 || cancelIgnorePenetration > 0) && (
                  <StepRow 
                    step="4b. Ignore Penetration" 
                    minValue={effectiveEnemyIgnorePenetration} 
                    maxValue={effectiveEnemyIgnorePenetration}
                    formula={`max(0, ${formatNumber(enemyIgnorePenetration)} - ${formatNumber(cancelIgnorePenetration)}) = ${formatNumber(effectiveEnemyIgnorePenetration)}`}
                  />
                )}

                {enemyDefense > 0 && (basePenetration > 0 || effectiveEnemyIgnorePenetration > 0) && (
                  <StepRow 
                    step="4c. Effective Penetration" 
                    minValue={effectivePenetration} 
                    maxValue={effectivePenetration}
                    formula={`max(0, ${formatNumber(basePenetration)} - ${formatNumber(effectiveEnemyIgnorePenetration)}) = ${formatNumber(effectivePenetration)}`}
                  />
                )}

                {enemyDefense > 0 && effectivePenetration > 0 && (
                  <StepRow 
                    step="4d. Penetration Effect" 
                    minValue={((effectivePenetration / enemyDefense) * 100)} 
                    maxValue={((effectivePenetration / enemyDefense) * 100)}
                    formula={`${formatNumber(effectivePenetration)}/${formatNumber(enemyDefense)} = ${((effectivePenetration / enemyDefense) * 100).toFixed(2)}% reduction`}
                  />
                )}

                <StepRow 
                  step="4e. Defense Applied" 
                  minValue={defenseAdjustedDamage} 
                  maxValue={defenseAdjustedDamage}
                  formula={enemyDefense > 0 ? `Final: ${(defenseReduction * 100).toFixed(2)}% → ${formatNumber(Math.round(levelAdjustedDamage))} × ${(1 - defenseReduction).toFixed(3)}` : `No defense`}
                />

                <StepRow 
                  step="5. Critical Damage" 
                  minValue={criticalDamageValue} 
                  maxValue={criticalDamageValue}
                  formula={`${formatNumber(Math.round(defenseAdjustedDamage))} × ${(100 + effectiveCritDamage)/100}`}
                />

                {addDamage > 0 && (
                  <StepRow 
                    step="6. Add Damage" 
                    minValue={withAddDamage} 
                    maxValue={withAddDamage}
                    formula={`${formatNumber(Math.round(criticalDamageValue))} + ${formatNumber(addDamage)}`}
                  />
                )}

                {(enemyDamageReduction > 0 || enemyDamageReductionPercent > 0) && (
                  <StepRow 
                    step="7. Enemy Damage Reduction" 
                    minValue={afterDamageReduction} 
                    maxValue={afterDamageReduction}
                    formula={`(${formatNumber(Math.round(withAddDamage))} - ${enemyDamageReduction}) × ${(100 - enemyDamageReductionPercent)/100}`}
                  />
                )}

                <StepRow 
                  step="8. Final Modifiers" 
                  minValue={minCriticalDamage} 
                  maxValue={maxCriticalDamage}
                  formula={`${formatNumber(Math.round(afterDamageReduction))} × ${(100 + finalDamageIncreased)/100} × ${(100 - enemyFinalDamageDecrease)/100}`}
                  highlight={true}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DamageCalculationModal;