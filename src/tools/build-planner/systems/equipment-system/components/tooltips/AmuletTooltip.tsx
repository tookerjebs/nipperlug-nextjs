/**
 * Amulet Tooltip Component
 * Displays amulet information in a tooltip format
 * Follows the same design pattern as other equipment tooltips
 */

import React from 'react';
import { ConfiguredAmulet } from '../upgrade-modals/AmuletUpgradeModal';
import { getAmuletChaosUpgradeStats } from '../../data/amulets/amulets-chaos-upgrade';
import { getStatInfo, formatStatValue } from '@/tools/build-planner/data/stats-config';
import { StatIcon } from '@/tools/build-planner/components/StatIcon';

interface AmuletTooltipProps {
  amulet: ConfiguredAmulet;
  // Utility functions can be passed in or defined locally
  formatStatName?: (stat: string) => string;
  formatStatValueWithSign?: (statId: string, value: number | undefined) => string;
}

const AmuletTooltip: React.FC<AmuletTooltipProps> = ({ 
  amulet,
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

  // Get only the actual base stats (no slot or varying stats)
  const getBaseStatsOnly = (amulet: ConfiguredAmulet) => {
    return { ...amulet.baseStats };
  };

  // Get slot icons based on selected slot
  const getSlotIcons = (amulet: ConfiguredAmulet) => {
    if (!amulet.selectedSlot) return null;
    
    const statInfo = getStatInfo(amulet.selectedSlot.statId);
    
    return (
      <div className="inline-block mr-1">
        <StatIcon 
          statId={amulet.selectedSlot.statId}
          width={32}
          height={32}
          alt={statInfo?.name || amulet.selectedSlot.statId}
        />
      </div>
    );
  };

  return (
    <>
      {/* Amulet Name */}
      <div className="text-center text-game-gold font-bold mb-2">{amulet.name}</div>
      
      {/* Divider after header */}
      <div className="w-full h-px bg-gray-600 bg-opacity-30 my-2"></div>
      
      {/* Base Stats */}
      <div className="mb-2">
        <div className="text-white font-bold mb-1">[ Base Stats ]</div>
        {(() => {
          const baseStats = getBaseStatsOnly(amulet);
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

      {/* Slot Stats (for unique amulets with slots) */}
      {amulet.isUnique && amulet.selectedSlot && (
        <>
          <div className="w-full h-px bg-gray-600 bg-opacity-30 my-2"></div>
          <div className="mb-2">
            <div className="text-cyan-400 font-bold mb-1">[ Slot Stats ]</div>
            <div className="text-cyan-400 flex justify-between">
              <span>{formatStatName(amulet.selectedSlot.statId)}</span>
              <span>{formatStatValueWithSign(amulet.selectedSlot.statId, amulet.selectedSlot.value)}</span>
            </div>
            <div className="mt-1">{getSlotIcons(amulet)}</div>
          </div>
        </>
      )}

      {/* Special Stats (for unique amulets) */}
      {amulet.isUnique && amulet.selectedVaryingStats && amulet.selectedVaryingStats.length > 0 && (
        <>
          <div className="w-full h-px bg-gray-600 bg-opacity-30 my-2"></div>
          <div className="mb-2">
            <div className="text-amber-300 font-bold mb-1">[ Special Stats ]</div>
            {amulet.selectedVaryingStats.map((varyingStat, index) => (
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
        if (!amulet.hasChaosUpgrade || !amulet.chaosUpgradeLevel || amulet.chaosUpgradeLevel <= 0) {
          return null;
        }
        
        const chaosStats = getAmuletChaosUpgradeStats(amulet.chaosUpgradeLevel);
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
                [ Chaos Upgrade ({amulet.chaosUpgradeLevel}/15) ]
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

export default AmuletTooltip;