/**
 * Bracelet Tooltip Component
 * Displays bracelet information in a tooltip format
 * Follows the same design pattern as other equipment tooltips
 */

import React from 'react';
import { ConfiguredBracelet } from '../upgrade-modals/BraceletUpgradeModal';
import { getBraceletChaosUpgradeStats } from '../../data/bracelets/bracelets-chaos-upgrade';
import { getStatInfo, formatStatValue } from '@/tools/build-planner/data/stats-config';
import { StatIcon } from '@/tools/build-planner/components/StatIcon';

interface BraceletTooltipProps {
  bracelet: ConfiguredBracelet;
  // Utility functions can be passed in or defined locally
  formatStatName?: (stat: string) => string;
  formatStatValueWithSign?: (statId: string, value: number | undefined) => string;
}

const BraceletTooltip: React.FC<BraceletTooltipProps> = ({ 
  bracelet,
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
  const getSlotIcons = (bracelet: ConfiguredBracelet) => {
    if (!bracelet.selectedSlot) return null;
    
    const statInfo = getStatInfo(bracelet.selectedSlot.statId);
    
    return (
      <div className="inline-block mr-1">
        <StatIcon 
          statId={bracelet.selectedSlot.statId}
          width={32}
          height={32}
          alt={statInfo?.name || bracelet.selectedSlot.statId}
        />
      </div>
    );
  };

  // Calculate base stats only (base stats only, excluding varying stats, slot, and chaos upgrades)
  const getBaseStatsOnly = (bracelet: ConfiguredBracelet) => {
    return { ...bracelet.baseStats };
  };

  return (
    <>
      {/* Bracelet Name */}
      <div className="text-center text-game-gold font-bold mb-2">{bracelet.name}</div>
      
      {/* Divider after header */}
      <div className="w-full h-px bg-gray-600 bg-opacity-30 my-2"></div>
      
      {/* Base Stats */}
      <div className="mb-2">
        <div className="text-white font-bold mb-1">[ Base Stats ]</div>
        {(() => {
          const baseStats = getBaseStatsOnly(bracelet);
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
      {bracelet.selectedSlot && (
        <>
          <div className="w-full h-px bg-gray-600 bg-opacity-30 my-2"></div>
          <div className="mb-2">
            <div className="text-cyan-400 font-bold mb-1">[ Option ]</div>
            <div className="text-cyan-400 flex justify-between">
              <span>{formatStatName(bracelet.selectedSlot.statId)}</span>
              <span>{formatStatValueWithSign(bracelet.selectedSlot.statId, bracelet.selectedSlot.value)}</span>
            </div>
            <div className="mt-1">{getSlotIcons(bracelet)}</div>
          </div>
        </>
      )}

      {/* Special Stats (for unique bracelets with varying stats) */}
      {bracelet.isUnique && bracelet.selectedVaryingStats && bracelet.selectedVaryingStats.length > 0 && (
        <>
          <div className="w-full h-px bg-gray-600 bg-opacity-30 my-2"></div>
          <div className="mb-2">
            <div className="text-amber-300 font-bold mb-1">[ Special Stats ]</div>
            {bracelet.selectedVaryingStats.map((varyingStat, index) => (
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
        if (!bracelet.hasChaosUpgrade || !bracelet.chaosUpgradeLevel || bracelet.chaosUpgradeLevel <= 0) {
          return null;
        }
        
        const chaosStats = getBraceletChaosUpgradeStats(bracelet.chaosUpgradeLevel);
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
                [ Chaos Upgrade ({bracelet.chaosUpgradeLevel}/15) ]
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

export default BraceletTooltip;