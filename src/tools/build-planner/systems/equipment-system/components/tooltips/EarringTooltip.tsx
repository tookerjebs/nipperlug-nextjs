/**
 * Earring Tooltip Component
 * Displays earring information in a tooltip format
 * Follows the same design pattern as other equipment tooltips
 */

import React from 'react';
import { ConfiguredEarring } from '../upgrade-modals/EarringUpgradeModal';
import { getEarringChaosUpgradeStats } from '../../data/earrings/earrings-chaos-upgrade';
import { getStatInfo, formatStatValue } from '@/tools/build-planner/data/stats-config';
import { StatIcon } from '@/tools/build-planner/components/StatIcon';

interface EarringTooltipProps {
  earring: ConfiguredEarring;
  // Utility functions can be passed in or defined locally
  formatStatName?: (stat: string) => string;
  formatStatValueWithSign?: (statId: string, value: number | undefined) => string;
}

const EarringTooltip: React.FC<EarringTooltipProps> = ({ 
  earring,
  formatStatName: externalFormatStatName,
  formatStatValueWithSign: externalFormatStatValueWithSign
}) => {
  // Local utility functions if not provided externally
  const formatStatName = externalFormatStatName || ((stat: string) => {
    const statInfo = getStatInfo(stat);
    return statInfo?.name || stat;
  });

  const formatStatValueWithSign = externalFormatStatValueWithSign || ((statId: string, value: number | undefined) => {
    if (value === undefined) return '';
    const formattedValue = formatStatValue(statId, value);
    return value >= 0 ? `+${formattedValue}` : `-${Math.abs(value)}${formattedValue.includes('%') ? '%' : ''}`;
  });

  // Get slot icons based on selected slot
  const getSlotIcons = (earring: ConfiguredEarring) => {
    if (!earring.selectedSlot) return null;
    
    const statInfo = getStatInfo(earring.selectedSlot.statId);
    
    return (
      <div className="inline-block mr-1">
        <StatIcon 
          statId={earring.selectedSlot.statId}
          width={32}
          height={32}
          alt={statInfo?.name || earring.selectedSlot.statId}
        />
      </div>
    );
  };

  // Get only the true base stats (no slot options or varying stats)
  const getBaseStatsOnly = (earring: ConfiguredEarring) => {
    return { ...earring.baseStats };
  };

  return (
    <>
      {/* Earring Name */}
      <div className="text-center text-game-gold font-bold mb-2">{earring.name}</div>
      
      {/* Divider after header */}
      <div className="w-full h-px bg-gray-600 bg-opacity-30 my-2"></div>
      
      {/* Base Stats */}
      <div className="mb-2">
        <div className="text-white font-bold mb-1">[ Base Stats ]</div>
        {(() => {
          const baseStats = getBaseStatsOnly(earring);
          return Object.entries(baseStats)
            .filter(([_, value]) => value !== undefined && value > 0)
            .map(([stat, value]) => (
              <div key={stat} className="text-white flex justify-between">
                <span>{formatStatName(stat)}</span>
                <span>{formatStatValueWithSign(stat, value)}</span>
              </div>
            ));
        })()}
      </div>

      {/* Option (Slot) */}
      {earring.selectedSlot && (
        <>
          <div className="w-full h-px bg-gray-600 bg-opacity-30 my-2"></div>
          <div className="mb-2">
            <div className="text-cyan-400 font-bold mb-1">[ Option ]</div>
            <div className="text-cyan-400 flex justify-between">
              <span>{formatStatName(earring.selectedSlot.statId)}</span>
              <span>{formatStatValueWithSign(earring.selectedSlot.statId, earring.selectedSlot.value)}</span>
            </div>
            <div className="mt-1">{getSlotIcons(earring)}</div>
          </div>
        </>
      )}

      {/* Special Stats (for unique earrings with varying stats) */}
      {earring.isUnique && earring.selectedVaryingStats && earring.selectedVaryingStats.length > 0 && (
        <>
          <div className="w-full h-px bg-gray-600 bg-opacity-30 my-2"></div>
          <div className="mb-2">
            <div className="text-amber-300 font-bold mb-1">[ Special Stats ]</div>
            {earring.selectedVaryingStats.map((varyingStat, index) => (
              <div key={index} className="text-amber-300 flex justify-between">
                <span>{formatStatName(varyingStat.statId)}</span>
                <span>{formatStatValueWithSign(varyingStat.statId, varyingStat.value)}</span>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Chaos Upgrade */}
      {(() => {
        if (!earring.hasChaosUpgrade || !earring.chaosUpgradeLevel || earring.chaosUpgradeLevel <= 0) {
          return null;
        }
        
        const chaosStats = getEarringChaosUpgradeStats(earring.chaosUpgradeLevel);
        const validStats = Object.entries(chaosStats)
          .filter(([_, value]) => value !== undefined && value > 0);
        
        // Only show the section if there are actual stats to display
        if (validStats.length === 0) {
          return null;
        }
        
        return (
          <>
            <div className="w-full h-px bg-gray-600 bg-opacity-30 my-2"></div>
            <div>
              <div className="text-orange-600 font-bold mb-1">
                [ Chaos Upgrade ({earring.chaosUpgradeLevel}/15) ]
              </div>
              {validStats.map(([stat, value]) => (
                <div key={stat} className="text-orange-600 flex justify-between">
                  <span>{getStatInfo(stat)?.name || formatStatName(stat)}</span>
                  <span>{formatStatValueWithSign(stat, value)}</span>
                </div>
              ))}
            </div>
          </>
        );
      })()}


    </>
  );
};

export default EarringTooltip;