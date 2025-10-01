/**
 * EssenceRuneSlot - Individual slot component for essence runes
 * Displays either an equipped rune or an empty slot placeholder
 */

'use client';

import React, { memo, useMemo, useCallback } from 'react';
import { cn } from '@/tools/build-planner/lib/utils';
import { getStatInfo } from '@/tools/build-planner/data/stats-config';
import { EssenceRune } from './data/essenceRuneData';
import { StatIcon } from '@/tools/build-planner/components/StatIcon';

interface EssenceRuneSlotData {
  id: string;
  name: string;
  level: number;
  baseStatType: string;
}

interface EssenceRuneSlotProps {
  slotNumber: number;
  rune: EssenceRuneSlotData | null;
  runeData: EssenceRune | null;
  onClick: () => void;
  onLevelUp: () => void;
  onRemove: () => void;
}

const EssenceRuneSlot: React.FC<EssenceRuneSlotProps> = memo(({ slotNumber, rune, runeData, onClick, onLevelUp, onRemove }) => {
  // Memoize stat info lookup to prevent recalculation
  const statInfo = useMemo(() => {
    return rune ? getStatInfo(rune.baseStatType) : null;
  }, [rune?.baseStatType]);

  // Memoize level up handler to prevent function recreation
  const handleLevelUp = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (runeData && rune && rune.level < runeData.maxLevel) {
      onLevelUp();
    }
  }, [runeData, rune, onLevelUp]);

  // Memoize level up button state
  const canLevelUp = useMemo(() => {
    return runeData && rune && rune.level < runeData.maxLevel;
  }, [runeData, rune]);

  // Memoize current stat value calculation
  const currentStatValue = useMemo(() => {
    if (!rune || !runeData || !statInfo) return null;
    return runeData.valuePerLevel[rune.level - 1];
  }, [rune, runeData, statInfo]);

  return (
    <div 
      className="rune-slot-panel p-3 rounded-lg border border-border-dark hover:border-game-highlight transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        {/* Left side - slot number and rune info */}
        <div className="flex items-center space-x-3">
          {/* Slot number */}
          <div className="w-6 h-6 rounded-full bg-theme-light flex items-center justify-center text-xs font-bold text-gray-300">
            {slotNumber}
          </div>

          {rune ? (
            /* Equipped rune display */
            <div className="flex items-center space-x-2">
              {/* Stat icon */}
              <div className="w-8 h-8 flex-shrink-0">
                <StatIcon
                  statId={rune.baseStatType}
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Rune name and current stat */}
              <div className="flex flex-col">
                <span className="text-white font-medium">{rune.name}</span>
                {currentStatValue !== null && (
                  <span className="text-xs text-gray-400">
                    {statInfo?.name}: +{currentStatValue}
                  </span>
                )}
              </div>
            </div>
          ) : (
            /* Empty slot */
            <span className="text-gray-400 italic opacity-75">Click to add rune</span>
          )}
        </div>

        {/* Right side - level and actions */}
        {rune && (
          <div className="flex items-center space-x-2">
            {/* Level display */}
            <span className="text-sm text-gray-300">
              Lv. {rune.level}{runeData && `/${runeData.maxLevel}`}
            </span>
            
            {/* Level up button */}
            <button 
              className={cn(
                "w-6 h-6 rounded text-xs font-bold transition-colors",
                canLevelUp
                  ? "bg-green-600/20 border border-green-400/30 text-green-400 hover:bg-green-600/30"
                  : "bg-gray-600/20 border border-gray-400/30 text-gray-400 cursor-not-allowed"
              )}
              onClick={handleLevelUp}
              disabled={!canLevelUp}
            >
              +
            </button>
            
            {/* Remove button */}
            <button 
              className="w-6 h-6 rounded bg-red-600/20 border border-red-400/30 text-red-400 text-xs font-bold hover:bg-red-600/30 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                onRemove();
              }}
            >
              ×
            </button>
          </div>
        )}
      </div>
    </div>
  );
});

export default EssenceRuneSlot;