/**
 * Honor Medal System Component
 * A simple UI implementation using existing SystemSlot and SystemSlotGrid components
 */

'use client';

import { useEffect } from 'react';
import { Minus, Plus } from 'lucide-react';
import { StatSelectionModal } from '@/tools/build-planner/components/systems';
import { ActionButtons } from '@/tools/build-planner/components/systems/ActionButtons';
import { TotalStatsButton } from '@/tools/build-planner/components/systems/TotalStatsButton';
import { cn } from '@/tools/build-planner/lib/utils';
import { useHonorMedalStore, honorMedalSystemConfig } from './stores/honorMedalStore';
import HonorMedalData from './data/honor-medal-data';
import { getStatInfo } from '../../data/stats-config';
import { StatIcon } from '../../components/StatIcon';

interface HonorMedalSystemProps {
  className?: string;
}

export function HonorMedalSystem({ className }: HonorMedalSystemProps) {
  const {
    categories,
    selectedSlotId,
    isModalOpen,
    slotStates,
    rankLevels,
    totalStats,
    initializeCategories,
    handleSlotClick,
    handleStatSelect,
    handleStatRemove,
    handleRankLevelChange,
    getAvailableStats,
    getSlotById,
    setIsModalOpen,
    setSelectedSlotId
  } = useHonorMedalStore();

  // Initialize categories on component mount
  useEffect(() => {
    if (categories.length === 0) {
      initializeCategories();
    }
  }, [initializeCategories, categories.length]);

  const renderRankControls = (category: any) => {
    const currentLevel = rankLevels[category.id] || 1;
    const hasAnyStats = category.slots.some((slot: any) => slot.isOccupied);
    
    if (!hasAnyStats) return null;
    
    return (
      <div className="flex items-center space-x-2 ml-4">
        <span className="text-white font-medium min-w-[80px] text-center">
          Level {currentLevel}
        </span>
        <div className="flex">
          <button
            onClick={() => handleRankLevelChange(category.id, -1)}
            disabled={currentLevel <= 1}
            className="p-1 rounded-l bg-red-700 hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Minus className="w-4 h-4 text-white" />
          </button>
          <button
            onClick={() => handleRankLevelChange(category.id, 1)}
            disabled={currentLevel >= 20}
            className="p-1 rounded-r bg-green-700 hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className={className}>
      <div className="flex items-center justify-between mb-6">

        <div className="flex items-center gap-4">
          <ActionButtons 
            onQuickFill={() => useHonorMedalStore.getState().quickFillSystem()} 
            onReset={() => useHonorMedalStore.getState().resetSystem()}
          />
          <TotalStatsButton
            totalStats={totalStats}
            systemName="Honor Medal System"
          />
        </div>
      </div>
      
      <div className="space-y-6">
        {categories.map((category) => (
          <div key={category.id} className="space-y-3 rounded-lg border border-gray-700 glass-panel-light p-3">
            {/* Category Header */}
            <div className="flex items-center justify-between">
               <div className="flex items-center">
                 <h3 className="text-lg font-semibold text-white">
                   {category.displayName}
                 </h3>
                 {renderRankControls(category)}
               </div>
               <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-gray-300">
                  {category.slots.filter(slot => slot.isOccupied).length}/{category.slots.length}
                </span>
                <div className="game-progress-bar w-16">
                  <div 
                    className="game-progress-fill bg-gray-400"
                    style={{ width: `${category.slots.length > 0 ? (category.slots.filter(slot => slot.isOccupied).length / category.slots.length) * 100 : 0}%` }}
                  />
                </div>
              </div>
            </div>
            
            {/* Slots Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-10 gap-2 mx-auto max-w-full px-2 sm:max-w-3xl sm:px-0 md:max-w-4xl lg:max-w-5xl">
              {category.slots.map((slot) => (
                <div key={slot.id} className="flex flex-col items-center relative">
                  <div
                    className={cn(
                      'relative border-2 rounded-lg cursor-pointer transition-all duration-50 flex items-center justify-center',
                      'min-w-12 min-h-12 aspect-square',
                      'game-slot',
                      selectedSlotId === slot.id && 'border-game-gold bg-theme-darker ring-2 ring-game-gold/50',
                      slot.isOccupied && 'border-green-500 bg-theme-darker',
                      'hover:scale-105 hover:border-stat-defensive hover:glow-border hover:bg-theme-darker',
                      !slot.isOccupied && 'hover:border-stat-defensive hover:bg-stat-defensive-bg'
                    )}
                    onClick={() => handleSlotClick(slot)}
                  >
                    {slot.isOccupied ? (
                        <div className="flex items-center justify-center w-full h-full p-1">
                          {(() => {
                            // Get the first stat for display (in case multiple stats)
                            const firstStatId = Object.keys(slot.contributedStats)[0];
                            const statInfo = firstStatId ? getStatInfo(firstStatId) : null;
                            
                            return firstStatId ? (
                              <div className="w-full h-full relative flex items-center justify-center">
                                <StatIcon
                                  statId={firstStatId}
                                  width={40}
                                  height={40}
                                  className="object-contain"
                                  fill={true}
                                />
                              </div>
                            ) : (
                              <div className="w-full h-full bg-green-500/20 rounded flex items-center justify-center">
                                <span className="text-xs font-bold text-green-400">USED</span>
                              </div>
                            );
                          })()
                        }
                        </div>
                      ) : (
                        <div className="text-gray-500 text-opacity-50">+</div>
                      )}
                  </div>
                  
                  {/* Stat Value */}
                  {slot.isOccupied && Object.keys(slot.contributedStats).length > 0 && (
                    <div className="mt-1 text-center">
                      {Object.entries(slot.contributedStats).map(([statId, value]) => {
                        const statInfo = getStatInfo(statId);
                        return (
                          <span key={statId} className="text-xs font-bold px-2 py-0.5 rounded bg-theme-darker text-game-gold">
                            +{value}{statInfo?.isPercentage ? '%' : ''}
                          </span>
                        );
                      })}
                    </div>
                  )}
                  
                  {/* Individual slot level display */}
                   {slot.isOccupied && slotStates[slot.id]?.statId && (
                     <div className="mt-1 text-center">
                       <span className="text-xs text-gray-400">
                         Lv.{rankLevels[slot.category] || 1}
                       </span>
                     </div>
                   )}
                </div>
              ))}
              
              {/* Empty slots to fill the grid if needed */}
              {Array.from({ length: Math.max(0, category.maxSlots - category.slots.length) }).map((_, index) => (
                <div
                  key={`empty-${index}`}
                  className="border-2 border-dashed border-border-dark rounded-lg bg-theme-darker min-w-12 min-h-12 aspect-square"
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedSlotId && (
          <StatSelectionModal
            isOpen={isModalOpen}
            onClose={() => {
              setIsModalOpen(false);
              setSelectedSlotId(null);
            }}
            slot={getSlotById(selectedSlotId)!}
            availableStats={getAvailableStats(selectedSlotId)}
            onStatSelect={handleStatSelect}
            onRemoveStat={handleStatRemove}
          />
        )}
    </div>
  );
}

export default HonorMedalSystem;