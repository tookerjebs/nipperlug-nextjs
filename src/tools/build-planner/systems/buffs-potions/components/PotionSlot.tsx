import React from 'react';
import Image from 'next/image';
import { useBuffsPotionsStore } from '../stores/buffs-potions-store';
import { ConsumableItem } from '../types';
import { formatStatValue } from '@/tools/build-planner/data/stats-config';

interface PotionSlotProps {
  potion: ConsumableItem;
}

const PotionSlot: React.FC<PotionSlotProps> = ({ potion }) => {
  const { isPotionActive, togglePotion, getAvailableStats } = useBuffsPotionsStore();
  
  const isActive = isPotionActive(potion.id);
  const statOptions = getAvailableStats(potion.id);

  return (
    <div className="relative group">
      <div 
        className={`game-slot rounded p-1 relative cursor-pointer transition-all duration-200 ${
          isActive 
            ? 'border-game-gold shadow-glow' 
            : 'border-border-dark opacity-70 hover:opacity-100 hover:border-border-light'
        }`}
        onClick={() => togglePotion(potion.id)}
      >
        <div className="flex flex-col items-center justify-center h-full">
          <div className="relative w-10 h-10">
            <Image 
              src={potion.icon} 
              alt={potion.name} 
              width={40} 
              height={40} 
              className="rounded"
            />
          </div>
          <div className="text-xs text-center mt-1 truncate w-full">
            {potion.name}
          </div>
        </div>
        
        {/* Active indicator */}
        {isActive && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-game-gold rounded-full"></div>
        )}
      </div>

      {/* Tooltip with potion info */}
      <div className="absolute left-0 bottom-full mb-2 w-64 bg-component-card glass-panel p-3 rounded shadow-lg z-10 opacity-0 group-hover:opacity-100 pointer-events-none">
        <div className="font-bold text-game-gold">{potion.name}</div>

        <div className="text-sm mb-2">{potion.description}</div>
        

        
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
      </div>
    </div>
  );
};

export default PotionSlot;