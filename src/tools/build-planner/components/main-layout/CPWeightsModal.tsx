/**
 * CP Weights Modal Component
 * Displays the Combat Power weights for each stat in a modal overlay
 */

'use client';

import React from 'react';
import { cpWeights, getCPWeight } from '@/tools/build-planner/data/cp-weights';
import { statsConfig } from '@/tools/build-planner/data/stats-config';
import { X } from 'lucide-react';

interface CPWeightsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CPWeightsModal: React.FC<CPWeightsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  // Group stats by category for better organization
  const statCategories = {
    'Critical Stats': [
      'criticalRate',
      'criticalDamage',
      'resistCriticalRate',
      'resistCriticalDamage',
      'ignoreResistCriticalRate',
      'ignoreResistCriticalDamage'
    ],
    'Skill Amplification': [
      'swordSkillAmp',
      'magicSkillAmp',
      'resistSkillAmp',
      'ignoreResistSkillAmp'
    ],
    'Attack Stats': [
      'attack',
      'magicAttack',
      'normalDamageUp',
      'addDamage'
    ],
    'Penetration': [
      'penetration',
      'ignorePenetration',
      'cancelIgnorePenetration'
    ],
    'Accuracy & Evasion': [
      'accuracy',
      'ignoreAccuracy',
      'evasion',
      'ignoreEvasion'
    ],
    'Final Damage': [
      'finalDamageIncreased',
      'finalDamageDecrease'
    ],
    'Defensive Stats': [
      'hp',
      'defense',
      'defenseRate',
      'damageReduction',
      'ignoreDamageReduction',
      'cancelIgnoreDamageReduction'
    ],
    'Other': [
      'attackRate'
    ]
  };

  // Format stat names for display
  const formatStatName = (statName: string): string => {
    const statDisplayNames: Record<string, string> = {
      criticalRate: 'Critical Rate (%)',
      criticalDamage: 'Critical Damage (%)',
      resistCriticalRate: 'Resist Critical Rate (%)',
      resistCriticalDamage: 'Resist Critical Damage (%)',
      ignoreResistCriticalRate: 'Ignore Resist Critical Rate (%)',
      ignoreResistCriticalDamage: 'Ignore Resist Critical Damage (%)',
      swordSkillAmp: 'Sword Skill AMP (%)',
      magicSkillAmp: 'Magic Skill AMP (%)',
      resistSkillAmp: 'Resist Skill AMP (%)',
      ignoreResistSkillAmp: 'Ignore Resist Skill AMP (%)',
      attack: 'Attack',
      magicAttack: 'Magic Attack',
      normalDamageUp: 'Normal Damage UP (%)',
      addDamage: 'Add Damage',
      penetration: 'Penetration',
      ignorePenetration: 'Ignore Penetration',
      cancelIgnorePenetration: 'Cancel Ignore Penetration',
      accuracy: 'Accuracy',
      ignoreAccuracy: 'Ignore Accuracy',
      evasion: 'Evasion',
      ignoreEvasion: 'Ignore Evasion',
      finalDamageIncreased: 'Final Damage Increase (%)',
      finalDamageDecrease: 'Final Damage Decrease (%)',
      hp: 'HP',
      defense: 'Defense',
      defenseRate: 'Defense Rate',
      damageReduction: 'Damage Reduction',
      ignoreDamageReduction: 'Ignore Damage Reduction',
      cancelIgnoreDamageReduction: 'Cancel Ignore Damage Reduction',
      attackRate: 'Attack Rate'
    };

    return statDisplayNames[statName] || statName;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
      <div className="glass-panel-dark rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto dark-scrollbar">
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b" style={{ borderColor: 'var(--border-dark)' }}>
          <h2 className="text-2xl font-bold text-game-gold">Combat Power Weights</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-gray-300 mb-6 space-y-2">
            <p>
              These weights determine how much Combat Power each stat contributes. 
              Higher weights mean the stat has more impact on your overall CP.
            </p>
            <div className="p-3 rounded-lg" style={{ backgroundColor: 'var(--theme-darkest)' }}>
              <p className="text-sm font-semibold text-game-gold mb-1">CP Types:</p>
              <ul className="text-xs space-y-1 text-gray-400 ml-4 list-disc">
                <li><strong className="text-gray-300">General CP:</strong> Base stats only (excludes PvE/PvP variants)</li>
                <li><strong className="text-gray-300">PvE CP:</strong> Base stats + PvE variants (excludes PvP variants)</li>
                <li><strong className="text-gray-300">PvP CP:</strong> Base stats + PvP variants (excludes PvE variants)</li>
              </ul>
              <p className="text-xs text-gray-500 mt-2">
                Stats marked with <span className="px-1.5 py-0.5 rounded bg-game-gold/20 text-game-gold">PvE/PvP</span> have variant versions that contribute to their respective CP types using the same weight.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(statCategories).map(([category, stats]) => (
              <div key={category} className="glass-panel p-4">
                <h3 className="text-lg font-semibold text-game-gold mb-3">
                  {category}
                </h3>
                <div className="space-y-2">
                  {stats.map((statName) => {
                    const weight = cpWeights[statName];
                    if (!weight) return null;
                    
                    // Check if this stat has variants
                    const statInfo = statsConfig.stats[statName];
                    const hasVariants = statInfo?.variants && statInfo.variants.length > 0;
                    
                    return (
                      <div key={statName} className="flex justify-between items-center">
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-300">
                            {formatStatName(statName)}
                          </span>
                          {hasVariants && (
                            <span className="text-xs px-1.5 py-0.5 rounded bg-game-gold/20 text-game-gold">
                              PvE/PvP
                            </span>
                          )}
                        </div>
                        <span className="text-sm font-mono text-game-gold">
                          {weight.toLocaleString()} CP
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Footer note */}
          <div className="mt-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--theme-darkest)' }}>
            <p className="text-xs text-gray-400">
              <strong>Note:</strong> These weights are based on the original CP calculator 
              and represent the relative importance of each stat in combat effectiveness. 
              The actual CP calculation multiplies your stat value by its weight.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CPWeightsModal;