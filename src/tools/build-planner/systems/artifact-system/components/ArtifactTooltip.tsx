/**
 * Artifact Tooltip Component
 * Displays artifact information with Unique and Assembled slot sections
 */

import React from 'react';
import { ConfiguredArtifact } from '../types';
import { getStatInfo, formatStatValue } from '@/tools/build-planner/data/stats-config';
import { StatIcon } from '@/tools/build-planner/components/StatIcon';
import { getSlotValue } from '../data/artifacts-data';

interface ArtifactTooltipProps {
  artifact: ConfiguredArtifact;
}

const ArtifactTooltip: React.FC<ArtifactTooltipProps> = ({ artifact }) => {
  const { artifactType, slots } = artifact;
  
  // Get artifact name
  const artifactName = artifactType === 'dawn' 
    ? 'Artifact of Dawn'
    : artifactType === 'dusk'
    ? 'Artifact of Dusk'
    : 'Artifact of Midnight';
  
  // Calculate total levels from all configured slots
  const totalLevels = slots
    .filter(slot => slot.statId !== null)
    .reduce((sum, slot) => sum + slot.level, 0);
  
  // Get requirement text
  const getRequirement = () => {
    switch (artifactType) {
      case 'dawn':
        return 'Level 125 or above';
      case 'dusk':
        return 'Level 190 or above';
      case 'midnight':
        return 'OLV 50 or above';
    }
  };
  
  // Separate unique and assembled slots
  const uniqueSlots = slots.filter(slot => slot.slotType === 'unique' && slot.statId);
  const assembledSlots = slots.filter(slot => slot.slotType === 'assembled' && slot.statId);
  
  // Calculate current and max levels for Unique Parts
  const uniqueCurrentLevels = uniqueSlots.reduce((sum, slot) => sum + slot.level, 0);
  const uniqueMaxLevels = slots
    .filter(slot => slot.slotType === 'unique')
    .reduce((sum, slot) => sum + slot.maxLevel, 0);
  
  // Calculate current and max levels for Assembled Parts
  const assembledCurrentLevels = assembledSlots.reduce((sum, slot) => sum + slot.level, 0);
  const assembledMaxLevels = slots
    .filter(slot => slot.slotType === 'assembled')
    .reduce((sum, slot) => sum + slot.maxLevel, 0);
  
  // Render slot entry
  const renderSlotEntry = (slot: typeof slots[0]) => {
    if (!slot.statId) return null;
    
    const statInfo = getStatInfo(slot.statId);
    const value = getSlotValue(
      artifactType,
      slot.slotIndex,
      slot.slotType,
      slot.statId,
      slot.level
    );
    
    if (!statInfo) return null;
    
    const formattedValue = formatStatValue(slot.statId, value);
    
    return (
      <div key={`${slot.slotType}-${slot.slotIndex}`} className="flex items-center space-x-2 text-white mb-2">
        {/* Icon that spans 2 rows */}
        <div className="flex-shrink-0 flex items-center">
          <StatIcon 
            statId={slot.statId}
            width={36}
            height={36}
            alt={statInfo.name}
          />
        </div>
        {/* Content next to icon */}
        <div className="flex-1 flex flex-col justify-center">
          {/* First row: Level */}
          <div className="mb-0.5">Lv. {slot.level}</div>
          {/* Second row: Stat Name + Value */}
          <div className="flex items-center gap-2">
            <span>{statInfo.name}</span>
            <span className="text-game-gold">+{formattedValue}</span>
          </div>
        </div>
      </div>
    );
  };
  
  return (
    <>
      {/* Artifact Name with + levels */}
      <div className="text-center text-game-gold font-bold mb-1">
        {artifactName} +{totalLevels}
      </div>
      
      {/* Drop Not Allowed */}
      <div className="text-center text-gray-400 text-xs mb-2">Drop Not Allowed</div>
      
      {/* Divider after header */}
      <div className="w-full h-px bg-gray-600 bg-opacity-30 my-2"></div>
      
      {/* Requirement Section */}
      <div className="mb-2">
        <div className="text-white font-bold mb-1">[ Requirement ]</div>
        <div className="text-white">{getRequirement()}</div>
      </div>
      
      {/* Divider after Requirement */}
      <div className="w-full h-px bg-gray-600 bg-opacity-30 my-2"></div>
      
      {/* Unique Slots Section */}
      {uniqueSlots.length > 0 && (
        <>
          <div className="mb-2">
            <div className="text-white font-bold mb-1">
              Unique Parts ({uniqueCurrentLevels}/{uniqueMaxLevels})
            </div>
            {uniqueSlots.map(slot => renderSlotEntry(slot))}
          </div>
          
          {/* Divider after Unique Slots */}
          <div className="w-full h-px bg-gray-600 bg-opacity-30 my-2"></div>
        </>
      )}
      
      {/* Assembled Slots Section */}
      {assembledSlots.length > 0 && (
        <div className="mb-2">
          <div className="text-white font-bold mb-1">
            Assembled Parts ({assembledCurrentLevels}/{assembledMaxLevels})
          </div>
          {assembledSlots.map(slot => renderSlotEntry(slot))}
        </div>
      )}
    </>
  );
};

export default ArtifactTooltip;

