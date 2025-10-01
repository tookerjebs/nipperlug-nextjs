/**
 * CP Weights Modal Component
 * Displays the Combat Power weights for each stat in a modal overlay
 */

'use client';

import React from 'react';
import { cpWeights } from '@/tools/build-planner/data/cp-weights';
import { IoClose } from 'react-icons/io5';

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
            <IoClose size={24} />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-gray-300 mb-6">
            These weights determine how much Combat Power each stat contributes. 
            Higher weights mean the stat has more impact on your overall CP.
          </p>

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
                    
                    return (
                      <div key={statName} className="flex justify-between items-center">
                        <span className="text-sm text-gray-300">
                          {formatStatName(statName)}
                        </span>
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