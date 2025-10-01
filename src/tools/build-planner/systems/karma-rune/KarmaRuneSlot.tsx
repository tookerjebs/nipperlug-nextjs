/**
 * KarmaRuneSlot - Individual slot component for karma runes
 * Displays either an equipped rune or an empty slot placeholder
 */

'use client';

import React, { memo, useMemo, useCallback } from 'react';
import { cn } from '@/tools/build-planner/lib/utils';
import { getStatInfo } from '@/tools/build-planner/data/stats-config';
import { KarmaRune, karmaRunes } from './data/karmaRuneData'; // Import karmaRunes for rune details
import { StatIcon } from '@/tools/build-planner/components/StatIcon';
import { EquippedKarmaRune } from './stores/karmaRuneStore'; // Import EquippedKarmaRune type

interface KarmaRuneSlotProps {
  slotIndex: number; // Renamed from slotNumber
  equippedRune: EquippedKarmaRune | null; // Changed from rune and runeData
  onClick: () => void;
  onLevelUp: () => void;
  onRemove: () => void;
}

const KarmaRuneSlot: React.FC<KarmaRuneSlotProps> = memo(({ slotIndex, equippedRune, onClick, onLevelUp, onRemove }) => {
  // Find the full rune details from karmaRunes data using the ID from equippedRune
  const runeDetails = useMemo(() => {
    return equippedRune ? karmaRunes.find(r => r.id === equippedRune.id) : null;
  }, [equippedRune]);

  // Memoize stat info lookup to prevent recalculation
  const statInfo = useMemo(() => {
    // Use statType from runeDetails (KarmaRune) instead of baseStatType
    return runeDetails ? getStatInfo(runeDetails.statType) : null;
  }, [runeDetails]);

  // Memoize level up handler to prevent function recreation
  const handleLevelUp = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (runeDetails && equippedRune && equippedRune.level < runeDetails.maxLevel) {
      onLevelUp();
    }
  }, [runeDetails, equippedRune, onLevelUp]);

  // Memoize level up button state
  const canLevelUp = useMemo(() => {
    return runeDetails && equippedRune && equippedRune.level < runeDetails.maxLevel;
  }, [runeDetails, equippedRune]);

  // Memoize current stat value calculation
  const currentStatValue = useMemo(() => {
    if (!equippedRune || !runeDetails || !statInfo) return null;
    // valuePerLevel is on runeDetails (KarmaRune)
    return runeDetails.valuePerLevel[equippedRune.level - 1];
  }, [equippedRune, runeDetails, statInfo]);

  return (
    <div 
      className="rune-slot-panel p-3 rounded-lg border border-border-dark hover:border-game-highlight transition-colors cursor-pointer"
      onClick={onClick}
    >
      <div className="flex items-center justify-between">
        {/* Left side - slot number and rune info */}
        <div className="flex items-center space-x-3">
          {/* Slot number (use slotIndex + 1 for display) */}
          <div className="w-6 h-6 rounded-full bg-theme-light flex items-center justify-center text-xs font-bold text-gray-300">
            {slotIndex + 1}
          </div>

          {equippedRune && runeDetails ? (
            /* Equipped rune display */
            <div className="flex items-center space-x-2">
              {/* Stat icon */}
              <div className="w-8 h-8 flex-shrink-0">
                <StatIcon
                  statId={runeDetails.statType}
                  width={32}
                  height={32}
                  className="w-full h-full object-contain"
                />
              </div>
              
              {/* Rune name and current stat */}
              <div className="flex flex-col">
                <span className="text-white font-medium">{runeDetails.name}</span>
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
        {equippedRune && runeDetails && (
          <div className="flex items-center space-x-2">
            {/* Level display */}
            <span className="text-sm text-gray-300">
              Lv. {equippedRune.level}{runeDetails && `/${runeDetails.maxLevel}`}
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

export default KarmaRuneSlot;