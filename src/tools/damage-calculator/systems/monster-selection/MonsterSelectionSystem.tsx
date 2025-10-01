/**
 * Monster Selection System
 * Simple system for selecting target monsters for damage calculations
 */

'use client';

import React from 'react';
import { MonsterSelectionPanel } from '../../components/monster-selection';
import { useMonsterStore } from '../../stores/monsterStore';
import { GiDragonHead, GiCrosshair } from 'react-icons/gi';
import { IoInformationCircleOutline } from 'react-icons/io5';

const MonsterSelectionSystem: React.FC = () => {
  const { selectedMonster } = useMonsterStore();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <div className="flex items-center justify-center gap-3 mb-2">
          <GiDragonHead className="text-3xl text-game-gold" />
          <h2 className="text-2xl font-bold text-game-gold">Target Monster</h2>
        </div>
        <p className="text-gray-400">
          Select a monster to calculate damage against
        </p>
      </div>

      {/* Monster Selection */}
      <div className="max-w-md mx-auto">
        <MonsterSelectionPanel />
      </div>

      {/* Monster Details */}
      {selectedMonster && (
        <div className="glass-panel p-6 max-w-2xl mx-auto">
          <h3 className="text-lg font-semibold text-red-400 mb-4 flex items-center gap-2">
            <GiCrosshair />
            Target Details: {selectedMonster.name}
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="text-center">
              <div className="text-gray-400">Level</div>
              <div className="text-white font-medium">{selectedMonster.level}</div>
            </div>
            <div className="text-center">
              <div className="text-gray-400">Defense</div>
              <div className="text-white font-medium">{selectedMonster.defense.toLocaleString()}</div>
            </div>
            <div className="text-center">
              <div className="text-gray-400">Damage Reduction</div>
              <div className="text-white font-medium">{selectedMonster.damageReduction.toLocaleString()}</div>
            </div>
            <div className="text-center">
              <div className="text-gray-400">Type</div>
              <div className={`font-medium ${selectedMonster.isABoss ? 'text-red-400' : 'text-white'}`}>
                {selectedMonster.isABoss ? 'Boss' : 'Normal'}
              </div>
            </div>
          </div>

          {selectedMonster.ignorePenetration > 0 && (
            <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
              <div className="flex items-center gap-2 text-yellow-400">
                <IoInformationCircleOutline />
                <span className="font-medium">Special Defense</span>
              </div>
              <div className="text-sm text-gray-300 mt-1">
                This monster ignores {selectedMonster.ignorePenetration.toLocaleString()} penetration
              </div>
            </div>
          )}
        </div>
      )}

      {/* Help Text */}
      {!selectedMonster && (
        <div className="text-center py-8">
          <div className="mb-4">
            <GiDragonHead className="mx-auto text-6xl text-gray-600" />
          </div>
          <h3 className="text-xl font-semibold text-gray-400 mb-2">No Monster Selected</h3>
          <p className="text-gray-500 mb-4">
            Choose a target monster to see detailed damage calculations.
          </p>
          <p className="text-sm text-gray-600">
            The damage calculator will use the monster's defense and damage reduction values.
          </p>
        </div>
      )}
    </div>
  );
};

export default MonsterSelectionSystem;