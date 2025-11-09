// Main component for Class System
import React from 'react';
import { useClassStore } from './stores';
import { CLASS_LIST } from './data';
import type { CharacterClass, StatDistribution } from './types';

import { StatScalingDisplay } from './components/StatScalingDisplay';
import { useStatRegistryStore } from '../../stores/statRegistryStore';
import { TotalStatsButton } from '../../components/systems/TotalStatsButton';
import { getRecommendedDistributions } from './data/recommendedDistributions';
import { CLASS_BASE_STATS } from './data/classScaling';

export function ClassSystem() {
  const { 
    selectedClass, 
    setSelectedClass, 
    statDistribution, 
    remainingPoints,
    incrementStat,
    decrementStat,
    resetStats,
    calculateDerivedStats,
    setStatValue
  } = useClassStore();

  // Get stats from other systems for bonus display
  const { systemStats } = useStatRegistryStore();
  
  // Calculate bonus stats from other systems (excluding the class system itself)
  const getBonusStats = () => {
    const bonusStats = { str: 0, int: 0, dex: 0 };
    // Sum up stats from all systems except the class system
    Object.entries(systemStats).forEach(([systemId, stats]) => {
      if (systemId !== 'class') {
        bonusStats.str += stats.str || 0;
        bonusStats.int += stats.int || 0;
        bonusStats.dex += stats.dex || 0;
      }
    });
    return bonusStats;
  };
  
  const bonusStats = getBonusStats();



  const handleClassHover = (classId: CharacterClass) => {
    // Future: Add hover effects or preview functionality
  };

  const handleStatIncrement = (stat: keyof StatDistribution, amount: number) => {
    incrementStat(stat, amount);
  };

  const handleStatDecrement = (stat: keyof StatDistribution, amount: number) => {
    decrementStat(stat, amount);
  };

  const isDecrementDisabled = (stat: keyof StatDistribution, amount: number) => {
    const baseStats = getBaseStats();
    return statDistribution[stat] - amount < baseStats[stat];
  };

  const isIncrementDisabled = (amount: number) => {
    return remainingPoints < amount;
  };

  // Helper to get base stats for current class
  const getBaseStats = () => {
    if (!selectedClass) {
      return { str: 10, int: 10, dex: 10 };
    }
    return CLASS_BASE_STATS[selectedClass];
  };

  // Handle input field change
  const handleStatInputChange = (stat: keyof StatDistribution, value: string) => {
    const numValue = parseInt(value) || 0;
    const baseStats = getBaseStats();
    const minValue = baseStats[stat];
    
    if (numValue >= minValue) {
      setStatValue(stat, numValue);
    }
  };

  // Calculate derived stats for TotalStatsButton
  const derivedStats = selectedClass ? calculateDerivedStats() : {};

  const handleReset = () => {
    resetStats();
  };

  return (
    <div className="w-full">
      {/* Header with Reset and Total Stats buttons */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button
            onClick={handleReset}
            className="game-button px-3 py-1 text-sm rounded flex items-center"
            title="Reset stat distribution to base stats"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Reset Stats
          </button>
          <TotalStatsButton
            totalStats={derivedStats}
            systemName="Class System"
          />
        </div>
      </div>

      {/* Stat Distribution and Scaling Section */}
      <div className="flex justify-center mb-6">
        <div className="flex gap-4 w-full max-w-6xl">
          {/* Stat Distribution Section */}
          <div className="bg-[#1e1e28b3] rounded-lg p-4 border border-[#2a2a3a] w-1/2">
        <div className="space-y-4">
          {/* Points Info */}
          <div className="flex justify-between items-center text-sm">
            <span className="text-[#9ca3af]">Level 200</span>
            <span className="text-[#9ca3af]">Total Points: 1379</span>
            <span className="text-white">Remaining: <span className="text-game-gold font-semibold">{remainingPoints}</span></span>
          </div>

          {/* Stat Controls */}
          <div className="space-y-3">
            {/* STR */}
            <div className="flex items-center justify-between bg-[#1b1b21b3] rounded-lg p-3 border border-[#2a2a3a]">
              <div className="flex items-center space-x-3">
                <span className="text-red-400 font-bold text-sm w-8">STR</span>
                <div className="flex items-center">
                  {bonusStats.str > 0 && (
                    <span className="text-green-400 mr-1">(+{bonusStats.str})</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                {/* Decrement button */}
                <button 
                  onClick={() => handleStatDecrement('str', 1)}
                  disabled={isDecrementDisabled('str', 1)}
                  className="bg-[#1b1b21b3] hover:bg-[#1e1e28b3] disabled:opacity-50 disabled:cursor-not-allowed text-white px-2 py-1 rounded text-xs transition-colors border border-[#5050644d] disabled:border-[#28283299]"
                  title="-1"
                >-</button>
                
                {/* Input field */}
                <input
                  type="number"
                  value={statDistribution.str}
                  onChange={(e) => handleStatInputChange('str', e.target.value)}
                  className="w-16 bg-[#1b1b21b3] border border-[#5050644d] text-white text-center text-sm font-semibold py-1 rounded mx-1 focus:outline-none focus:border-game-gold focus:ring-1 focus:ring-game-gold"
                  min={getBaseStats().str}
                  step="1"
                />
                
                {/* Increment button */}
                <button 
                  onClick={() => handleStatIncrement('str', 1)}
                  disabled={isIncrementDisabled(1)}
                  className="bg-[#1b1b21b3] hover:bg-[#1e1e28b3] disabled:opacity-50 disabled:cursor-not-allowed text-white px-2 py-1 rounded text-xs transition-colors border border-[#5050644d] disabled:border-[#28283299]"
                  title="+1"
                >+</button>
              </div>
            </div>

            {/* INT */}
            <div className="flex items-center justify-between bg-[#1b1b21b3] rounded-lg p-3 border border-[#2a2a3a]">
              <div className="flex items-center space-x-3">
                <span className="text-blue-400 font-bold text-sm w-8">INT</span>
                <div className="flex items-center">
                  {bonusStats.int > 0 && (
                    <span className="text-green-400 mr-1">(+{bonusStats.int})</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                {/* Decrement button */}
                <button 
                  onClick={() => handleStatDecrement('int', 1)}
                  disabled={isDecrementDisabled('int', 1)}
                  className="bg-[#1b1b21b3] hover:bg-[#1e1e28b3] disabled:opacity-50 disabled:cursor-not-allowed text-white px-2 py-1 rounded text-xs transition-colors border border-[#5050644d] disabled:border-[#28283299]"
                  title="-1"
                >-</button>
                
                {/* Input field */}
                <input
                  type="number"
                  value={statDistribution.int}
                  onChange={(e) => handleStatInputChange('int', e.target.value)}
                  className="w-16 bg-[#1b1b21b3] border border-[#5050644d] text-white text-center text-sm font-semibold py-1 rounded mx-1 focus:outline-none focus:border-game-gold focus:ring-1 focus:ring-game-gold"
                  min={getBaseStats().int}
                  step="1"
                />
                
                {/* Increment button */}
                <button 
                  onClick={() => handleStatIncrement('int', 1)}
                  disabled={isIncrementDisabled(1)}
                  className="bg-[#1b1b21b3] hover:bg-[#1e1e28b3] disabled:opacity-50 disabled:cursor-not-allowed text-white px-2 py-1 rounded text-xs transition-colors border border-[#5050644d] disabled:border-[#28283299]"
                  title="+1"
                >+</button>
              </div>
            </div>

            {/* DEX */}
            <div className="flex items-center justify-between bg-[#1b1b21b3] rounded-lg p-3 border border-[#2a2a3a]">
              <div className="flex items-center space-x-3">
                <span className="text-green-400 font-bold text-sm w-8">DEX</span>
                <div className="flex items-center">
                  {bonusStats.dex > 0 && (
                    <span className="text-green-400 mr-1">(+{bonusStats.dex})</span>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1">
                {/* Decrement button */}
                <button 
                  onClick={() => handleStatDecrement('dex', 1)}
                  disabled={isDecrementDisabled('dex', 1)}
                  className="bg-[#1b1b21b3] hover:bg-[#1e1e28b3] disabled:opacity-50 disabled:cursor-not-allowed text-white px-2 py-1 rounded text-xs transition-colors border border-[#5050644d] disabled:border-[#28283299]"
                  title="-1"
                >-</button>
                
                {/* Input field */}
                <input
                  type="number"
                  value={statDistribution.dex}
                  onChange={(e) => handleStatInputChange('dex', e.target.value)}
                  className="w-16 bg-[#1b1b21b3] border border-[#5050644d] text-white text-center text-sm font-semibold py-1 rounded mx-1 focus:outline-none focus:border-game-gold focus:ring-1 focus:ring-game-gold"
                  min={getBaseStats().dex}
                  step="1"
                />
                
                {/* Increment button */}
                <button 
                  onClick={() => handleStatIncrement('dex', 1)}
                  disabled={isIncrementDisabled(1)}
                  className="bg-[#1b1b21b3] hover:bg-[#1e1e28b3] disabled:opacity-50 disabled:cursor-not-allowed text-white px-2 py-1 rounded text-xs transition-colors border border-[#5050644d] disabled:border-[#28283299]"
                  title="+1"
                >+</button>
              </div>
            </div>
          </div>

          {/* Recommended Distributions */}
          {selectedClass && (() => {
            const recommendations = getRecommendedDistributions(selectedClass);
            if (!recommendations || Object.keys(recommendations).length === 0) return null;
            
            const handleSetRecommended = (dist: { str: number; int: number; dex: number }) => {
              setStatValue('str', dist.str);
              setStatValue('int', dist.int);
              setStatValue('dex', dist.dex);
            };
            
            return (
              <div className="mt-4 pt-4 border-t border-[#2a2a3a]">
                <div className="text-xs text-[#9ca3af] mb-2 font-semibold">Recommended Distributions:</div>
                <div className="space-y-2">
                  {Object.entries(recommendations).map(([weaponKey, dist]) => (
                    <div key={weaponKey} className="bg-[#1b1b21b3] rounded-lg p-2 border border-[#2a2a3a]">
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <div className="text-xs text-game-gold font-semibold mb-1">
                            {dist.weapon || weaponKey}
                          </div>
                          <div className="flex items-center gap-3 text-xs">
                            <span className="text-red-400">STR: <span className="text-white">{dist.str}</span></span>
                            <span className="text-blue-400">INT: <span className="text-white">{dist.int}</span></span>
                            <span className="text-green-400">DEX: <span className="text-white">{dist.dex}</span></span>
                          </div>
                        </div>
                        <button
                          onClick={() => handleSetRecommended(dist)}
                          className="bg-game-gold/20 hover:bg-game-gold/30 text-game-gold text-xs px-3 py-1.5 rounded transition-colors border border-game-gold/50 flex items-center justify-center ml-3 h-fit"
                        >
                          Set
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })()}
          </div>
          </div>
          
          {/* Stat Scaling Display Section */}
          <div className="w-1/2">
            <StatScalingDisplay />
          </div>
        </div>
      </div>



    </div>
  );
}