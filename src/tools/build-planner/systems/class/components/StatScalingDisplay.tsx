// Component to display class-specific stat scaling information
import React from 'react';
import { useClassStore } from '../stores';
import { CLASS_SCALING, STAT_RANGES } from '../data/classScaling';
import type { StatScaling } from '../data/classScaling';

interface StatScalingDisplayProps {
  className?: string;
}

export const StatScalingDisplay: React.FC<StatScalingDisplayProps> = ({ className = '' }) => {
  const { selectedClass, statDistribution } = useClassStore();

  if (!selectedClass) {
    return (
      <div className={`bg-[#1e1e28b3] rounded-lg p-4 border border-[#2a2a3a] ${className}`}>
        <h3 className="text-white font-semibold mb-3 text-center">Stat Scaling</h3>
        <p className="text-gray-400 text-sm text-center">Select a class to view scaling information</p>
      </div>
    );
  }

  const classScaling = CLASS_SCALING[selectedClass];

  const getStatTier = (statValue: number): number => {
    for (let i = 0; i < STAT_RANGES.length; i++) {
      const range = STAT_RANGES[i];
      if (statValue >= range.min && statValue <= range.max) {
        return i;
      }
    }
    return STAT_RANGES.length - 1;
  };

  const formatStatName = (statKey: string): string => {
    const statNames: Record<string, string> = {
      hp: 'HP',
      attack: 'Attack',
      magicAttack: 'Magic Attack',
      attackRate: 'Attack Rate',
      defenseRate: 'Defense Rate',
      evasion: 'Evasion',
      damageReduction: 'Damage Reduce',
      ignorePenetration: 'Ignore Penetration',
      resistCriticalRate: 'Resist Crit Rate',
      resistCriticalDamage: 'Resist Crit Dmg',
      resistSkillAmp: 'Resist Skill Amp',
      resistKnockback: 'Resist Knockback',
      resistStun: 'Resist Stun',
      resistDown: 'Resist Down',
      resistUnableToMove: 'Resist Unable to Move'
    };
    return statNames[statKey] || statKey;
  };

  const renderStatScaling = (statType: 'str' | 'int' | 'dex', scaling: StatScaling, currentValue: number) => {
    const currentTier = getStatTier(currentValue);
    const statColor = {
      str: 'text-red-400',
      int: 'text-blue-400',
      dex: 'text-green-400'
    }[statType];

    return (
      <div key={statType} className="mb-4">
        <h4 className={`${statColor} font-bold text-sm mb-2 uppercase`}>
          {statType} ({currentValue})
        </h4>
        <div className="space-y-1">
          {Object.entries(scaling).map(([statKey, multipliers]) => {
            if (!multipliers) return null;
            const currentMultiplier = multipliers[currentTier];
            const calculatedValue = currentValue * currentMultiplier;
            
            return (
              <div key={statKey} className="flex justify-between items-center text-xs">
                <span className="text-gray-300 truncate">{formatStatName(statKey)}</span>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-400">×{currentMultiplier}</span>
                  <span className="text-white font-medium min-w-[40px] text-right">
                    {calculatedValue.toFixed(3)}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className={`bg-[#1e1e28b3] rounded-lg p-4 border border-[#2a2a3a] ${className}`}>
      <h3 className="text-white font-semibold mb-3 text-center">Stat Scaling</h3>
      <div className="text-xs text-gray-400 mb-3 text-center">
        Ranges: 0-100 | 101-1000 | 1001+
      </div>
      <div className="space-y-3 max-h-80 overflow-y-auto dark-scrollbar">
        {renderStatScaling('str', classScaling.str, statDistribution.str)}
        {renderStatScaling('int', classScaling.int, statDistribution.int)}
        {renderStatScaling('dex', classScaling.dex, statDistribution.dex)}
      </div>
    </div>
  );
};