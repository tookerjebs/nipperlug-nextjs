/**
 * BroochTooltip Component
 * Displays detailed information about a brooch item
 * Following the same pattern as BraceletTooltip but without chaos upgrades
 */

import React from 'react';
import { ConfiguredBrooch } from '../upgrade-modals/BroochUpgradeModal';
import { getStatInfo } from '@/tools/build-planner/data/stats-config';
import { StatIcon } from '@/tools/build-planner/components/StatIcon';

interface BroochTooltipProps {
  brooch: ConfiguredBrooch;
  formatStatName: (stat: string) => string;
  formatStatValueWithSign: (statId: string, value: number | undefined) => string;
  className?: string;
}

const BroochTooltip: React.FC<BroochTooltipProps> = ({ 
  brooch, 
  formatStatName, 
  formatStatValueWithSign, 
  className = '' 
}) => {
  const renderStatLine = (statId: string, value: number, textColor: string = 'text-white', keyPrefix: string = '') => {
    return (
      <div key={`${keyPrefix}${statId}`} className={`${textColor} flex justify-between`}>
        <span>{formatStatName(statId)}</span>
        <span>{formatStatValueWithSign(statId, value)}</span>
      </div>
    );
  };

  // Get slot icons based on selected slot
  const getSlotIcons = (brooch: ConfiguredBrooch) => {
    if (!brooch.selectedSlot) return null;
    
    const statInfo = getStatInfo(brooch.selectedSlot.statId);
    
    return (
      <div className="inline-block mr-1">
        <StatIcon 
          statId={brooch.selectedSlot.statId}
          width={32}
          height={32}
          alt={statInfo?.name || brooch.selectedSlot.statId}
        />
      </div>
    );
  };

  return (
    <div className={className}>
      {/* Brooch Name */}
      <div className="text-center text-game-gold font-bold mb-2">{brooch.name}</div>
      
      {/* Divider after header */}
      <div className="w-full h-px bg-gray-600 bg-opacity-30 my-2"></div>
      
      {/* Base Stats */}
      <div className="mb-2">
        <div className="text-white font-bold mb-1">[ Base Stats ]</div>
        {Object.entries(brooch.baseStats)
          .filter(([_, value]) => value !== undefined && value > 0)
          .map(([stat, value]) => 
            renderStatLine(stat, value!, 'text-white', 'base-')
          )}
      </div>

      {/* Option (Slot) */}
      {brooch.selectedSlot && (
        <>
          <div className="w-full h-px bg-gray-600 bg-opacity-30 my-2"></div>
          <div className="mb-2">
            <div className="text-cyan-400 font-bold mb-1">[ Option ]</div>
            {renderStatLine(brooch.selectedSlot.statId, brooch.selectedSlot.value, 'text-cyan-400', 'slot-')}
            <div className="mt-1">{getSlotIcons(brooch)}</div>
          </div>
        </>
      )}

      {/* Special Stats (for unique brooches with varying stats) */}
      {brooch.isUnique && brooch.selectedVaryingStats && brooch.selectedVaryingStats.length > 0 && (
        <>
          <div className="w-full h-px bg-gray-600 bg-opacity-30 my-2"></div>
          <div className="mb-2">
            <div className="text-amber-300 font-bold mb-1">[ Special Stats ]</div>
            {brooch.selectedVaryingStats.map((varyingStat, index) => 
              renderStatLine(varyingStat.statId, varyingStat.value, 'text-amber-300', `varying-${index}-`)
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default BroochTooltip;