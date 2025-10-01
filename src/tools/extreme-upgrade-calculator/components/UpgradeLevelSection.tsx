'use client';

import React from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import CoreSelector from './CoreSelector';
import { 
  calculateSuccessRate, 
  getMaxCoresForLevel, 
  getUpgradeCost,
  getCoreByLevel,
  getCorePriceName,
  getBaseLevel,
  checkMinimumPowerRequirement,
  type ServerConfig,
  type EquipmentType 
} from '@/tools/extreme-upgrade-calculator/data/extreme-upgrade-data';
import { usePriceStore } from '@/stores/priceStore';
import { formatNumber } from '@/utils/numberFormat';
import { 
  calculateCostStatistics, 
  getRiskLevel,
  type CostStatistics 
} from '@/tools/extreme-upgrade-calculator/utils/probabilityStats';

interface UpgradeLevelSectionProps {
  level: number;
  equipmentType: EquipmentType;
  serverConfig: ServerConfig;
  selectedCores: (number | null)[];
  onCoreChange: (slotIndex: number, coreLevel: number | null) => void;
  isExpanded: boolean;
  onToggleExpand: () => void;
}

export default function UpgradeLevelSection({
  level,
  equipmentType,
  serverConfig,
  selectedCores,
  onCoreChange,
  isExpanded,
  onToggleExpand
}: UpgradeLevelSectionProps) {
  const { getPrice } = usePriceStore();
  
  const maxCores = getMaxCoresForLevel(equipmentType.id, level);
  const upgradeCost = getUpgradeCost(equipmentType.id, level);
  
  // Calculate total core power
  const totalCorePower = selectedCores.reduce((total, coreLevel, index) => {
    if (index < maxCores && coreLevel) {
      const core = getCoreByLevel(coreLevel);
      return (total || 0) + (core?.power || 0);
    }
    return total || 0;
  }, 0);
  
  // Check minimum power requirement
  const baseLevel = getBaseLevel(equipmentType.name, level, serverConfig);
  const meetsPowerRequirement = checkMinimumPowerRequirement(
    equipmentType.name,
    level,
    serverConfig,
    totalCorePower || 0
  );
  
  // Calculate success rate
  const successRate = calculateSuccessRate(
    equipmentType.name,
    level,
    serverConfig,
    totalCorePower || 0
  );
  
  // Calculate core costs
  const coreCosts = selectedCores.map((coreLevel, index) => {
    if (index >= maxCores || !coreLevel) return 0;
    const priceName = getCorePriceName(coreLevel);
    return getPrice(priceName) || 0;
  });
  
  const totalCoreCost = coreCosts.reduce((sum, cost) => sum + cost, 0);
  const totalCost = upgradeCost.alz + totalCoreCost;
  
  // Calculate comprehensive cost statistics
  const costStats: CostStatistics = calculateCostStatistics(
    successRate, 
    totalCost,
    serverConfig.hasResetOutcome
  );
  const riskLevel = getRiskLevel(successRate);
  
  const filledSlots = selectedCores.filter((core, index) => index < maxCores && core !== null).length;
  const isComplete = filledSlots === maxCores;

  return (
    <div className="glass-panel p-6 mb-4">
      {/* Header */}
      <button
        onClick={onToggleExpand}
        className="w-full text-left group hover:bg-foreground/5 p-4 -m-4 rounded-lg transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <h3 className="text-xl font-semibold text-game-gold">
              Level {level - 1} → {level}
            </h3>
            <div className="flex items-center gap-2">
              <div className={`px-3 py-1 text-sm rounded-full ${
                isComplete 
                  ? 'bg-green-600/20 text-green-400 border border-green-600/30' 
                  : 'bg-orange-600/20 text-orange-400 border border-orange-600/30'
              }`}>
                {filledSlots}/{maxCores} cores
              </div>
              {isComplete && (
                <div className={`px-3 py-1 text-sm rounded-full ${
                  successRate >= 0.8 
                    ? 'bg-green-600/20 text-green-400 border border-green-600/30'
                    : successRate >= 0.5
                    ? 'bg-yellow-600/20 text-yellow-400 border border-yellow-600/30'
                    : 'bg-red-600/20 text-red-400 border border-red-600/30'
                }`}>
                  {(successRate * 100).toFixed(1)}% success
                </div>
              )}
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-foreground/60 group-hover:text-foreground/80 transition-colors">
              {isExpanded ? 'Hide Details' : 'Show Details'}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-game-gold" />
            ) : (
              <ChevronDown className="w-5 h-5 text-game-gold" />
            )}
          </div>
        </div>
      </button>

      {/* Expanded Content */}
      <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[2000px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
        <div className="space-y-6">
          {/* Core Selection */}
          <div>
            <h4 className="text-lg font-semibold mb-3">Select Cores ({filledSlots}/{maxCores})</h4>
            <div className="flex gap-3 flex-wrap">
              {Array.from({ length: maxCores }, (_, index) => (
                <div key={index} className="flex flex-col items-center gap-2">
                  <CoreSelector
                    selectedLevel={selectedCores[index] || null}
                    onSelect={(coreLevel) => onCoreChange(index, coreLevel)}
                  />
                  <div className="text-xs text-foreground/60">
                    {selectedCores[index] ? `Lv. ${selectedCores[index]}` : ''}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Power Level Warning */}
          {isComplete && !meetsPowerRequirement && (
            <div className="bg-red-600/20 border border-red-600/30 rounded-lg p-4">
              <div className="flex items-center gap-3">
                <div className="w-6 h-6 bg-red-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-white text-sm font-bold">!</span>
                </div>
                <div>
                  <h5 className="font-semibold text-red-400 mb-1">Power Level Too Low!</h5>
                  <p className="text-sm text-red-300">
                    Total core power ({totalCorePower}) must be at least {baseLevel} to start this upgrade on non-standard servers.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Stats Display */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Upgrade Statistics */}
              <div className="glass-panel-light p-4">
                <div className="mb-3">
                  <h5 className="font-semibold">Upgrade Statistics</h5>
                </div>
                {!isComplete ? (
                  <div className="space-y-2 text-sm text-foreground/50">
                    <div className="flex justify-between">
                      <span>Total Core Power:</span>
                      <span>—</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Success Rate:</span>
                      <span>—</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{serverConfig.hasResetOutcome ? 'Cost per Attempt:' : 'Average Attempts:'}</span>
                      <span>—</span>
                    </div>
                    {!serverConfig.hasResetOutcome && (
                      <div className="border-t border-border-dark pt-2 mt-2">
                        <div className="flex justify-between">
                          <span>Cost per Attempt:</span>
                          <span>—</span>
                        </div>
                        <div className="flex justify-between font-semibold">
                          <span>Average Cost:</span>
                          <span>—</span>
                        </div>
                      </div>
                    )}
                    <div className="text-xs text-center text-foreground/40 mt-3 italic">
                      Fill all core slots to see upgrade statistics
                    </div>
                  </div>
                ) : serverConfig.hasResetOutcome ? (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Core Power:</span>
                      <span className="text-yellow-400 font-semibold">{totalCorePower}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Success Rate:</span>
                      <span className="text-yellow-400 font-semibold">
                        {(successRate * 100).toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Cost per Attempt:</span>
                      <span className="text-yellow-400">{formatNumber(Math.round(totalCost))} Alz</span>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Total Core Power:</span>
                      <span className="text-yellow-400 font-semibold">{totalCorePower}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Success Rate:</span>
                      <span className="text-yellow-400 font-semibold">
                        {(successRate * 100).toFixed(2)}%
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Average Attempts:</span>
                      <span className="text-yellow-400 font-semibold">
                        {costStats.expectedAttempts === Infinity ? '∞' : costStats.expectedAttempts.toFixed(1)}
                      </span>
                    </div>
                    <div className="border-t border-border-dark pt-2 mt-2">
                      <div className="flex justify-between">
                        <span>Cost per Attempt:</span>
                        <span className="text-yellow-400">{formatNumber(Math.round(totalCost))} Alz</span>
                      </div>
                      <div className="flex justify-between font-semibold text-yellow-400">
                        <span>Average Cost:</span>
                        <span>
                          {costStats.expectedCost === Infinity ? '∞' : formatNumber(Math.round(costStats.expectedCost))} Alz
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Confidence Intervals - Only for non-reset servers */}
              {!serverConfig.hasResetOutcome && (
                <div className="glass-panel-light p-4">
                  <h5 className="font-semibold mb-3">Confidence Levels</h5>
                  {!isComplete ? (
                    <div className="space-y-2 text-sm text-foreground/50">
                      <div className="flex justify-between">
                        <span>50% Confidence:</span>
                        <span>—</span>
                      </div>
                      <div className="flex justify-between">
                        <span>75% Confidence:</span>
                        <span>—</span>
                      </div>
                      <div className="flex justify-between">
                        <span>90% Confidence:</span>
                        <span>—</span>
                      </div>
                      <div className="flex justify-between">
                        <span>95% Confidence:</span>
                        <span>—</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">99% Confidence:</span>
                        <span>—</span>
                      </div>
                      <div className="text-xs text-center text-foreground/40 mt-3 italic">
                        Fill all core slots to see confidence levels
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>50% Confidence:</span>
                        <span className="text-yellow-400 font-semibold">
                          {formatNumber(Math.round(costStats.confidence50.cost))} Alz
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>75% Confidence:</span>
                        <span className="text-yellow-400 font-semibold">
                          {formatNumber(Math.round(costStats.confidence75.cost))} Alz
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>90% Confidence:</span>
                        <span className="text-yellow-400 font-semibold">
                          {formatNumber(Math.round(costStats.confidence90.cost))} Alz
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span>95% Confidence:</span>
                        <span className="text-yellow-400 font-semibold">
                          {formatNumber(Math.round(costStats.confidence95.cost))} Alz
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="font-semibold">99% Confidence:</span>
                        <span className="text-yellow-400 font-bold">
                          {formatNumber(Math.round(costStats.confidence99.cost))} Alz
                        </span>
                      </div>
                      <div className="text-xs text-foreground/50 mt-2">
                        99% confidence means you have a 99% chance the upgrade will cost this amount or less
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Possible Outcomes */}
              <div className="glass-panel-light p-4">
                <h5 className="font-semibold mb-3">Possible Outcomes</h5>
                {!isComplete ? (
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="text-center p-2 bg-green-600/10 border border-green-600/30 rounded-lg">
                      <div className="text-green-400 font-medium text-sm">Success</div>
                      <div className="text-xl font-bold text-foreground/50 my-0.5">—</div>
                      <div className="text-xs text-foreground/60">Level increases to {level}</div>
                    </div>
                    
                    <div className="text-center p-2 bg-orange-600/10 border border-orange-600/30 rounded-lg">
                      <div className="text-orange-400 font-medium text-sm">Broken</div>
                      <div className="text-xl font-bold text-foreground/50 my-0.5">—</div>
                      <div className="text-xs text-foreground/60">Item breaks, needs repair</div>
                    </div>
                    
                    {serverConfig.hasResetOutcome && (
                      <div className="text-center p-2 bg-red-600/10 border border-red-600/30 rounded-lg">
                        <div className="text-red-400 font-medium text-sm">Reset</div>
                        <div className="text-xl font-bold text-foreground/50 my-0.5">—</div>
                        <div className="text-xs text-foreground/60">Level resets to 0</div>
                      </div>
                    )}
                    
                    <div className="text-xs text-center text-foreground/40 mt-1 italic">
                      Fill all core slots to see outcome probabilities
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div className="text-center p-2 bg-green-600/10 border border-green-600/30 rounded-lg">
                      <div className="text-green-400 font-medium text-sm">Success</div>
                      <div className="text-xl font-bold text-green-400 my-0.5">
                        {(successRate * 100).toFixed(1)}%
                      </div>
                      <div className="text-xs text-foreground/60">Level increases to {level}</div>
                    </div>
                    
                    <div className="text-center p-2 bg-orange-600/10 border border-orange-600/30 rounded-lg">
                      <div className="text-orange-400 font-medium text-sm">Broken</div>
                      <div className="text-xl font-bold text-orange-400 my-0.5">
                        {((1 - successRate) * (serverConfig.hasResetOutcome ? 0.5 : 1) * 100).toFixed(1)}%
                      </div>
                      <div className="text-xs text-foreground/60">Item breaks, needs repair</div>
                    </div>
                    
                    {serverConfig.hasResetOutcome && (
                      <div className="text-center p-2 bg-red-600/10 border border-red-600/30 rounded-lg">
                        <div className="text-red-400 font-medium text-sm">Reset</div>
                        <div className="text-xl font-bold text-red-400 my-0.5">
                          {((1 - successRate) * 0.5 * 100).toFixed(1)}%
                        </div>
                        <div className="text-xs text-foreground/60">Level resets to 0</div>
                      </div>
                    )}
                  </div>
                )}
              </div>
          </div>
        </div>
      </div>
    </div>
  );
}