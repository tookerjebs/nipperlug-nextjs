import React from 'react';
import Image from 'next/image';
import { useBuffsPotionsStore } from '../stores/buffs-potions-store';
import { ConsumableItem } from '../types';
import { formatStatValue } from '@/tools/build-planner/data/stats-config';

interface BuffSlotProps {
  buff: ConsumableItem;
}

const BuffSlot: React.FC<BuffSlotProps> = ({ buff }) => {
  const { isBuffActive, toggleBuff, getAvailableStats } = useBuffsPotionsStore();
  
  const isActive = isBuffActive(buff.id);
  
  // Get the stats for display
  const statOptions = getAvailableStats(buff.id);

  const handleClick = () => {
    // Toggle active state for all buffs (group logic is handled in the store)
    toggleBuff(buff.id);
  };

  return (
    <div className="relative group">
      <div 
        className={`game-slot rounded p-1 relative cursor-pointer ${isActive ? 'border-game-gold' : 'border-border-dark opacity-50'}`}
        onClick={handleClick}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <div className="relative w-10 h-10">
            <Image 
              src={buff.icon} 
              alt={buff.name} 
              width={40} 
              height={40} 
              className="rounded"
            />
          </div>
          <div className="text-xs text-center mt-1 truncate w-full">
            {buff.name}
          </div>
        </div>
        
        {/* Active indicator */}
        {isActive && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-game-gold rounded-full"></div>
        )}
      </div>

      {/* Tooltip with buff info */}
      <div className="absolute left-0 bottom-full mb-2 w-64 bg-component-card glass-panel p-3 rounded shadow-lg z-10 opacity-0 group-hover:opacity-100 pointer-events-none">
        <div className="font-bold text-game-gold">{buff.name}</div>
        <div className="text-sm mb-2">{buff.description}</div>
        
        {statOptions.length > 0 && (
          <div className="text-sm">
            <div className="font-semibold mb-1">Stats:</div>
            <ul className="space-y-1">
              {statOptions.map((stat) => (
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
        
        {buff.group && (
          <div className="mt-2 text-xs italic text-gray-400">
            Group: {buff.group} (mutually exclusive)
          </div>
        )}
      </div>
    </div>
  );
};

export default BuffSlot;