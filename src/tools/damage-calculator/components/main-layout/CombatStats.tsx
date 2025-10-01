/**
 * CombatStats Component
 * Displays combat power and damage estimates for the current build
 */

'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useBuildPlannerStore } from '../../stores/buildPlannerStore';
import { GiMagicSwirl, GiCrossedSwords } from 'react-icons/gi';
import { RiSwordFill } from 'react-icons/ri';
import { IconContext } from 'react-icons';
import { IoInformationCircleOutline, IoTrendingUp, IoTrendingDown } from 'react-icons/io5';
import CPWeightsModal from './CPWeightsModal';
import DamageCalculationModal from './DamageCalculationModal';
import { MonsterSelectionModal, MonsterSelectionPanel } from '../monster-selection';

// Helper function to format numbers with commas
const formatNumber = (num: number): string => {
  return num.toLocaleString('en-US');
};

const CombatStats: React.FC = () => {
  const damageStats = useBuildPlannerStore((state) => state.damageStats);
  const setSelectedClass = useBuildPlannerStore((state) => state.setSelectedClass);
  const [damageType, setDamageType] = useState<'sword' | 'magic'>('sword');
  const [showCPWeightsModal, setShowCPWeightsModal] = useState(false);
  const [showPvEModal, setShowPvEModal] = useState(false);

  // Update build planner store when damage type changes
  const handleDamageTypeChange = (newDamageType: 'sword' | 'magic') => {
    setDamageType(newDamageType);
    setSelectedClass(newDamageType);
  };

  
  // Track CP changes
  const [cpChange, setCpChange] = useState<number>(0);
  const [showCpChange, setShowCpChange] = useState<boolean>(false);
  const previousCpRef = useRef<number>(damageStats.combatPower);

  // Track PvE damage changes
  const [pveNormalChange, setPveNormalChange] = useState<number>(0);
  const [showPveNormalChange, setShowPveNormalChange] = useState<boolean>(false);
  const previousPveNormalRef = useRef<number>(
    damageStats.pveAttack ? Math.round((damageStats.pveAttack.normal.min + damageStats.pveAttack.normal.max) / 2) : 0
  );

  const [pveCritChange, setPveCritChange] = useState<number>(0);
  const [showPveCritChange, setShowPveCritChange] = useState<boolean>(false);
  const previousPveCritRef = useRef<number>(
    damageStats.pveAttack ? Math.round((damageStats.pveAttack.critical.min + damageStats.pveAttack.critical.max) / 2) : 0
  );




  // Effect to track CP changes
  useEffect(() => {
    const currentCp = damageStats.combatPower;
    const previousCp = previousCpRef.current;
    
    if (currentCp !== previousCp) {
      const change = currentCp - previousCp;
      setCpChange(change);
      setShowCpChange(true);
      previousCpRef.current = currentCp;
    }
  }, [damageStats.combatPower]);

  // Effect to track PvE damage changes
  useEffect(() => {
    const currentPveNormal = damageStats.pveAttack ? Math.round((damageStats.pveAttack.normal.min + damageStats.pveAttack.normal.max) / 2) : 0;
    const previousPveNormal = previousPveNormalRef.current;
    
    if (currentPveNormal !== previousPveNormal) {
      const change = currentPveNormal - previousPveNormal;
      setPveNormalChange(change);
      setShowPveNormalChange(true);
      previousPveNormalRef.current = currentPveNormal;
    }

    const currentPveCrit = damageStats.pveAttack ? Math.round((damageStats.pveAttack.critical.min + damageStats.pveAttack.critical.max) / 2) : 0;
    const previousPveCrit = previousPveCritRef.current;
    
    if (currentPveCrit !== previousPveCrit) {
      const change = currentPveCrit - previousPveCrit;
      setPveCritChange(change);
      setShowPveCritChange(true);
      previousPveCritRef.current = currentPveCrit;
    }
  }, [damageStats.pveAttack]);





  // Render the combat power (always visible)
  const renderCombatPower = () => (
    <div className="glass-panel p-3 sm:p-4 flex flex-col items-center justify-center">
      <div className="text-xs sm:text-sm text-gray-300 mb-1 flex items-center gap-1">
        Combat Power
        <button
          onClick={() => setShowCPWeightsModal(true)}
          className="text-gray-400 hover:text-game-gold transition-colors"
          title="View CP Weights"
        >
          <IoInformationCircleOutline size={14} />
        </button>
      </div>
      <div className="flex flex-col items-center">
        <div className="text-xl sm:text-2xl font-bold text-game-gold">
          {formatNumber(damageStats.combatPower)}
        </div>
        {/* CP Change Indicator */}
        {showCpChange && cpChange !== 0 && (
          <div className={`flex items-center gap-1 text-xs sm:text-sm font-medium transition-all duration-300 ${
            cpChange > 0 
              ? 'text-green-400' 
              : 'text-red-400'
          }`}>
            {cpChange > 0 ? (
              <IoTrendingUp size={12} />
            ) : (
              <IoTrendingDown size={12} />
            )}
            <span>
              {cpChange > 0 ? '+' : ''}{formatNumber(cpChange)}
            </span>
          </div>
        )}
      </div>
    </div>
  );

  // Render the damage panels (damage type dependent)
  const renderDamagePanels = () => {
    const damageIcon = damageType === 'magic' ? <GiMagicSwirl /> : <RiSwordFill />;
    const damageTypeLabel = damageType === 'magic' ? 'Magic' : 'Sword';

    return (
      <>
        {/* PvE Damage */}
        <div className="glass-panel p-3 sm:p-4 flex flex-col items-center justify-center">
          <div className="text-xs sm:text-sm text-gray-300 mb-1 flex items-center gap-1">
            <IconContext.Provider value={{ className: 'text-game-gold' }}>
              {damageIcon}
            </IconContext.Provider>
            PvE {damageTypeLabel}
            <button
              onClick={() => setShowPvEModal(true)}
              className="text-gray-400 hover:text-game-gold transition-colors"
              title={`View PvE ${damageTypeLabel} Damage Calculation`}
            >
              <IoInformationCircleOutline size={14} />
            </button>
          </div>
          <div className="flex gap-2 sm:gap-4">
            <div className="flex flex-col items-center">
              <div className="text-xs text-gray-400">Normal</div>
              <div className="text-sm sm:text-lg font-bold text-game-gold">
                {damageStats.pveAttack ? 
                  formatNumber(Math.round((damageStats.pveAttack.normal.min + damageStats.pveAttack.normal.max) / 2)) : 
                  '0'
                }
              </div>
              {/* PvE Normal Change Indicator */}
              {showPveNormalChange && pveNormalChange !== 0 && (
                <div className={`flex items-center gap-1 text-xs font-medium transition-all duration-300 ${
                  pveNormalChange > 0 
                    ? 'text-green-400' 
                    : 'text-red-400'
                }`}>
                  {pveNormalChange > 0 ? (
                    <IoTrendingUp size={10} />
                  ) : (
                    <IoTrendingDown size={10} />
                  )}
                  <span>
                    {pveNormalChange > 0 ? '+' : ''}{formatNumber(pveNormalChange)}
                  </span>
                </div>
              )}
            </div>
            <div className="flex flex-col items-center">
              <div className="text-xs text-gray-400">Critical</div>
              <div className="text-sm sm:text-lg font-bold text-game-gold">
                {damageStats.pveAttack ? 
                  formatNumber(Math.round((damageStats.pveAttack.critical.min + damageStats.pveAttack.critical.max) / 2)) :
                  '0'
                }
              </div>
              {/* PvE Critical Change Indicator */}
              {showPveCritChange && pveCritChange !== 0 && (
                <div className={`flex items-center gap-1 text-xs font-medium transition-all duration-300 ${
                  pveCritChange > 0 
                    ? 'text-green-400' 
                    : 'text-red-400'
                }`}>
                  {pveCritChange > 0 ? (
                    <IoTrendingUp size={10} />
                  ) : (
                    <IoTrendingDown size={10} />
                  )}
                  <span>
                    {pveCritChange > 0 ? '+' : ''}{formatNumber(pveCritChange)}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Monster Selection Panel */}
        <MonsterSelectionPanel />
      </>
    );
  };



  return (
    <>
      <div className="component-bg p-3 sm:p-4 rounded-lg">
        {/* Damage Type Selection */}
        <div className="mb-4 sm:mb-6">
          <div className="text-center mb-3">
            <h2 className="text-sm sm:text-base font-medium text-gray-400 mb-3">
              Select Damage Type
            </h2>
            <div className="flex justify-center gap-2">
              <button
                onClick={() => handleDamageTypeChange('sword')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  damageType === 'sword'
                    ? 'bg-game-gold text-black font-semibold shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <GiCrossedSwords className="w-4 h-4" />
                Sword Class
              </button>
              <button
                onClick={() => handleDamageTypeChange('magic')}
                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                  damageType === 'magic'
                    ? 'bg-game-gold text-black font-semibold shadow-lg'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                <GiMagicSwirl className="w-4 h-4" />
                Magic Class
              </button>
            </div>
          </div>
        </div>

        {/* Combat Stats Grid */}
        <div className="relative">
          {/* Subtle divider */}
          <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-16 h-px bg-gradient-to-r from-transparent via-game-gold/30 to-transparent"></div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
            {renderCombatPower()}
            {renderDamagePanels()}
          </div>
        </div>

      </div>

      {/* CP Weights Modal */}
      <CPWeightsModal
        isOpen={showCPWeightsModal}
        onClose={() => setShowCPWeightsModal(false)}
      />

      {/* Enhanced PvE Damage Calculation Modal */}
      <DamageCalculationModal
        isOpen={showPvEModal}
        onClose={() => setShowPvEModal(false)}
        title={`PvE ${damageType === 'magic' ? 'Magic' : 'Sword'} Damage`}
      />



      {/* Monster Selection Modal */}
      <MonsterSelectionModal />
    </>
  );
};

export default CombatStats;