import React from 'react';
import { getBattleModeById } from '../data/battleModes';
import { formatStatValue, getStatInfo } from '@/tools/build-planner/data/stats-config';
import { useBattleConfigurationStore } from '../stores/battleConfigurationStore';

const BattleModeDisplay: React.FC = () => {
  const { selectedBattleMode, selectBattleMode } = useBattleConfigurationStore();
  const battleMode = getBattleModeById('battle_mode_3');

  if (!battleMode) {
    return null;
  }

  const isSelected = selectedBattleMode === battleMode.id;

  // Get stats for tooltip display
  const statEntries = Object.entries(battleMode.stats).map(([statId, value]) => {
    const statInfo = getStatInfo(statId);
    return {
      id: statId,
      name: statInfo?.name || statId,
      value,
      category: statInfo?.category || 'utility'
    };
  });

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-white">Battle Mode</h3>
      <div className="grid grid-cols-4 gap-3">
        <div className="relative group">
          <div 
            className={`game-slot rounded p-1 relative cursor-pointer transition-all duration-200 ${
              isSelected 
                ? 'border-game-gold shadow-glow' 
                : 'border-border-dark opacity-70 hover:opacity-100 hover:border-border-light'
            }`}
            onClick={() => {
              // Toggle selection - if already selected, deselect it
              const newSelection = selectedBattleMode === battleMode.id ? null : battleMode.id;
              selectBattleMode(newSelection);
            }}
          >
            <div className="flex flex-col items-center justify-center h-full">
              <div className="text-2xl mb-2">⚡</div>
              <div className="text-xs text-center mt-1 truncate w-full">
                {battleMode.name}
              </div>
            </div>
            
            {/* Active indicator */}
            {isSelected && (
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-game-gold rounded-full"></div>
            )}
          </div>

          {/* Tooltip with battle mode info */}
          <div className="absolute left-0 bottom-full mb-2 w-64 bg-component-card glass-panel p-3 rounded shadow-lg z-10 opacity-0 group-hover:opacity-100 pointer-events-none">
            <div className="font-bold text-game-gold">{battleMode.name}</div>
            <div className="text-sm mb-2">{battleMode.description}</div>
            
            {statEntries.length > 0 && (
              <div className="text-sm">
                <div className="font-semibold mb-1">Stats:</div>
                <ul className="space-y-1">
                  {statEntries.map((stat) => (
                    <li 
                      key={stat.id} 
                      className={`
                        ${stat.category === 'offensive' ? 'text-stat-offensive' : 
                          stat.category === 'defensive' ? 'text-stat-defensive' : 
                          'text-stat-utility'}
                      `}
                    >
                      {stat.name}: +{formatStatValue(stat.id, stat.value)}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
      <p className="text-sm text-gray-400">
        Click to activate Battle Mode 3 for enhanced combat bonuses.
      </p>
    </div>
  );
};

export default BattleModeDisplay;