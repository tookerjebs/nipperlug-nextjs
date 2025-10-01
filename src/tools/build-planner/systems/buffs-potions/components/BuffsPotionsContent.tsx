import React from 'react';
import { useBuffsPotionsStore } from '../stores/buffs-potions-store';
import BuffSlot from './BuffSlot';
import PotionSlot from './PotionSlot';
import { getStatInfo, formatStatValue } from '../../../data/stats-config';
import { isType1Potion, isType2Potion } from '../data/potions-data';

const BuffsPotionsContent: React.FC = () => {
  const { buffs, potions, calculateTotalStats } = useBuffsPotionsStore();
  const totalStats = calculateTotalStats();
  const hasActiveItems = Object.keys(totalStats).length > 0;
  
  // Group potions by type
  const type1Potions = potions.filter(isType1Potion);
  const type2Potions = potions.filter(isType2Potion);

  return (
    <div className="p-4 space-y-6">
      
      

      {/* Buffs Section */}
      <div className="game-panel bg-component-card p-4 rounded">
        <h3 className="text-lg font-semibold mb-3 text-game-gold">Buffs</h3>

        
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
          {buffs.map((buff) => (
            <BuffSlot key={buff.id} buff={buff} />
          ))}
        </div>
      </div>

      {/* Potions Section */}
      <div className="game-panel bg-component-card p-4 rounded">
        <div className="flex justify-between items-start mb-3">
          <div>
            <h3 className="text-lg font-semibold text-game-gold">Potions</h3>
          </div>
        </div>
        
        {/* Type 1 Potions */}
        <div className="mb-4">
          <h4 className="text-md font-semibold mb-2 text-red-300">Type 1 Potions (Max 1 active)</h4>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {type1Potions.map((potion) => (
              <PotionSlot key={potion.id} potion={potion} />
            ))}
          </div>
        </div>
        
        {/* Type 2 Potions */}
        <div>
          <h4 className="text-md font-semibold mb-2 text-blue-300">Type 2 Potions (Max 2 active)</h4>
          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
            {type2Potions.map((potion) => (
              <PotionSlot key={potion.id} potion={potion} />
            ))}
          </div>
        </div>
      </div>

      {/* Active Items Summary */}
      {hasActiveItems && (
        <div className="game-panel bg-component-card p-4 rounded">
          <h3 className="text-lg font-semibold mb-3 text-game-gold">Active Effects</h3>
          
          <div className="space-y-2">
            {Object.entries(totalStats).map(([statId, value]) => {
              const statInfo = getStatInfo(statId);
              const statName = statInfo?.name || statId;
              const formattedValue = formatStatValue(statId, value);
              
              return (
                <div 
                  key={statId} 
                  className="flex justify-between items-center p-2 rounded bg-theme-darker"
                >
                  <span>{statName}</span>
                  <span>+{formattedValue}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default BuffsPotionsContent;