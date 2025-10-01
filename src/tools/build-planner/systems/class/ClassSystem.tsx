// Main component for Class System
import React from 'react';
import { useClassStore } from './stores';
import { CLASS_LIST } from './data';
import type { CharacterClass, StatDistribution } from './types';

import { StatScalingDisplay } from './components/StatScalingDisplay';
import { useStatRegistryStore } from '../../stores/statRegistryStore';

export function ClassSystem() {
  const { 
    selectedClass, 
    setSelectedClass, 
    statDistribution, 
    remainingPoints,
    incrementStat,
    decrementStat
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
    return statDistribution[stat] - amount < 10;
  };

  const isIncrementDisabled = (amount: number) => {
    return remainingPoints < amount;
  };

  return (
    <div className="w-full">

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
                  <span className="text-white font-semibold">{statDistribution.str}</span>
                  {bonusStats.str > 0 && (
                    <span className="text-green-400 ml-1">(+{bonusStats.str})</span>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleStatDecrement('str', 1)}
                  disabled={isDecrementDisabled('str', 1)}
                  className="bg-[#1b1b21b3] hover:bg-[#1e1e28b3] disabled:bg-[#1b1b21b3] disabled:text-[#666] text-white px-2 py-1 rounded text-xs transition-colors border border-[#5050644d] disabled:border-[#28283299] disabled:cursor-not-allowed"
                >-</button>
                <button 
                  onClick={() => handleStatIncrement('str', 1)}
                  disabled={isIncrementDisabled(1)}
                  className="bg-[#1b1b21b3] hover:bg-[#1e1e28b3] disabled:bg-[#1b1b21b3] disabled:text-[#666] text-white px-2 py-1 rounded text-xs transition-colors border border-[#5050644d] disabled:border-[#28283299] disabled:cursor-not-allowed"
                >+</button>
                <button 
                  onClick={() => handleStatIncrement('str', 10)}
                  disabled={isIncrementDisabled(10)}
                  className="bg-[#1b1b21b3] hover:bg-[#1e1e28b3] disabled:bg-[#1b1b21b3] disabled:text-[#666] text-white px-2 py-1 rounded text-xs transition-colors border border-[#5050644d] disabled:border-[#28283299] disabled:cursor-not-allowed"
                >+10</button>
                <button 
                  onClick={() => handleStatIncrement('str', 100)}
                  disabled={isIncrementDisabled(100)}
                  className="bg-[#1b1b21b3] hover:bg-[#1e1e28b3] disabled:bg-[#1b1b21b3] disabled:text-[#666] text-white px-2 py-1 rounded text-xs transition-colors border border-[#5050644d] disabled:border-[#28283299] disabled:cursor-not-allowed"
                >+100</button>
              </div>
            </div>

            {/* INT */}
            <div className="flex items-center justify-between bg-[#1b1b21b3] rounded-lg p-3 border border-[#2a2a3a]">
              <div className="flex items-center space-x-3">
                <span className="text-blue-400 font-bold text-sm w-8">INT</span>
                <div className="flex items-center">
                  <span className="text-white font-semibold">{statDistribution.int}</span>
                  {bonusStats.int > 0 && (
                    <span className="text-green-400 ml-1">(+{bonusStats.int})</span>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleStatDecrement('int', 1)}
                  disabled={isDecrementDisabled('int', 1)}
                  className="bg-[#1b1b21b3] hover:bg-[#1e1e28b3] disabled:bg-[#1b1b21b3] disabled:text-[#666] text-white px-2 py-1 rounded text-xs transition-colors border border-[#5050644d] disabled:border-[#28283299] disabled:cursor-not-allowed"
                >-</button>
                <button 
                  onClick={() => handleStatIncrement('int', 1)}
                  disabled={isIncrementDisabled(1)}
                  className="bg-[#1b1b21b3] hover:bg-[#1e1e28b3] disabled:bg-[#1b1b21b3] disabled:text-[#666] text-white px-2 py-1 rounded text-xs transition-colors border border-[#5050644d] disabled:border-[#28283299] disabled:cursor-not-allowed"
                >+</button>
                <button 
                  onClick={() => handleStatIncrement('int', 10)}
                  disabled={isIncrementDisabled(10)}
                  className="bg-[#1b1b21b3] hover:bg-[#1e1e28b3] disabled:bg-[#1b1b21b3] disabled:text-[#666] text-white px-2 py-1 rounded text-xs transition-colors border border-[#5050644d] disabled:border-[#28283299] disabled:cursor-not-allowed"
                >+10</button>
                <button 
                  onClick={() => handleStatIncrement('int', 100)}
                  disabled={isIncrementDisabled(100)}
                  className="bg-[#1b1b21b3] hover:bg-[#1e1e28b3] disabled:bg-[#1b1b21b3] disabled:text-[#666] text-white px-2 py-1 rounded text-xs transition-colors border border-[#5050644d] disabled:border-[#28283299] disabled:cursor-not-allowed"
                >+100</button>
              </div>
            </div>

            {/* DEX */}
            <div className="flex items-center justify-between bg-[#1b1b21b3] rounded-lg p-3 border border-[#2a2a3a]">
              <div className="flex items-center space-x-3">
                <span className="text-green-400 font-bold text-sm w-8">DEX</span>
                <div className="flex items-center">
                  <span className="text-white font-semibold">{statDistribution.dex}</span>
                  {bonusStats.dex > 0 && (
                    <span className="text-green-400 ml-1">(+{bonusStats.dex})</span>
                  )}
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <button 
                  onClick={() => handleStatDecrement('dex', 1)}
                  disabled={isDecrementDisabled('dex', 1)}
                  className="bg-[#1b1b21b3] hover:bg-[#1e1e28b3] disabled:bg-[#1b1b21b3] disabled:text-[#666] text-white px-2 py-1 rounded text-xs transition-colors border border-[#5050644d] disabled:border-[#28283299] disabled:cursor-not-allowed"
                >-</button>
                <button 
                  onClick={() => handleStatIncrement('dex', 1)}
                  disabled={isIncrementDisabled(1)}
                  className="bg-[#1b1b21b3] hover:bg-[#1e1e28b3] disabled:bg-[#1b1b21b3] disabled:text-[#666] text-white px-2 py-1 rounded text-xs transition-colors border border-[#5050644d] disabled:border-[#28283299] disabled:cursor-not-allowed"
                >+</button>
                <button 
                  onClick={() => handleStatIncrement('dex', 10)}
                  disabled={isIncrementDisabled(10)}
                  className="bg-[#1b1b21b3] hover:bg-[#1e1e28b3] disabled:bg-[#1b1b21b3] disabled:text-[#666] text-white px-2 py-1 rounded text-xs transition-colors border border-[#5050644d] disabled:border-[#28283299] disabled:cursor-not-allowed"
                >+10</button>
                <button 
                  onClick={() => handleStatIncrement('dex', 100)}
                  disabled={isIncrementDisabled(100)}
                  className="bg-[#1b1b21b3] hover:bg-[#1e1e28b3] disabled:bg-[#1b1b21b3] disabled:text-[#666] text-white px-2 py-1 rounded text-xs transition-colors border border-[#5050644d] disabled:border-[#28283299] disabled:cursor-not-allowed"
                >+100</button>
              </div>
            </div>
          </div>
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