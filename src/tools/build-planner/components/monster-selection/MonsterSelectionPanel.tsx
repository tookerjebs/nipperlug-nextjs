/**
 * Monster Selection Panel
 * A dedicated panel for monster selection in the combat stats section
 */

import React from 'react';
import { useMonsterStore } from '../../stores/monsterStore';
import { Settings, Info, Skull } from 'lucide-react';

const MonsterSelectionPanel: React.FC = () => {
  const { selectedMonster, openMonsterModal } = useMonsterStore();

  return (
    <div className="glass-panel p-3 sm:p-4 flex flex-col items-center justify-center">
      <div className="text-xs sm:text-sm text-gray-300 mb-1 flex items-center gap-1">
        Target Monster
        <button
          onClick={openMonsterModal}
          className="text-gray-400 hover:text-game-gold transition-colors"
          title="Change Target Monster"
        >
          <Settings size={14} />
        </button>
      </div>
      
      <div className="flex flex-col items-center text-center">
        <div className="text-sm sm:text-lg font-bold text-game-gold mb-1">
          {selectedMonster?.name || 'No Monster Selected'}
        </div>
        
        {selectedMonster ? (
          <div className="text-xs text-gray-400 space-y-0.5">
            <div>Level {selectedMonster.level}</div>
            <div className="flex items-center gap-2 text-xs">
              <span>DEF: {selectedMonster.defense.toLocaleString()}</span>
              <span>•</span>
              <span>DMG Red: {selectedMonster.damageReduction.toLocaleString()}</span>
            </div>
            {selectedMonster.isABoss && (
              <div className="text-red-400 font-medium">Boss</div>
            )}
          </div>
        ) : (
          <div className="text-xs text-gray-400">
            Click below to select a target monster
          </div>
        )}
        
        <button
          onClick={openMonsterModal}
          className="mt-2 px-3 py-1 text-xs bg-theme-dark border border-gray-600 rounded-lg text-gray-300 hover:border-game-gold hover:text-game-gold transition-all"
        >
          {selectedMonster ? 'Change Monster' : 'Select Monster'}
        </button>
      </div>
    </div>
  );
};

export default MonsterSelectionPanel;