'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { formatNumber } from '@/utils/numberFormat';

// Myth Level data from Myth.scp [Myth_Level] section
// ReqExp is the exp needed to reach that level from the previous level
// totalAccumulated is the sum of all ReqExp values up to (but not including) that level
const reqExpValues = [
  47096512340, 47418635540, 47740758740, 48062881940, 48385005140, 48707128340, 49029251540, 49351374740, 49673497940, 49995621140,
  50317744340, 50639867540, 50961990740, 51284113940, 51606237140, 51928360340, 52250483540, 52572606740, 52894729940, 53216853140,
  53538976340, 53861099540, 54183222740, 54505345940, 54827469140, 55149592340, 55471715540, 55793838740, 56115961940, 56438085140,
  56760208340, 57082331540, 57404454740, 57726577940, 58048701140, 58370824340, 58692947540, 59015070740, 59337193940, 59659317140,
  59981440340, 60303563540, 60625686740, 60947809940, 61269933140, 61592056340, 61914179540, 62236302740, 62558425940, 62880549140,
  63202672340, 63524795540, 63846918740, 64169041940, 64491165140, 64813288340, 65135411540, 65457534740, 65779657940, 66101781140,
  66423904340, 66746027540, 67068150740, 67390273940, 67712397140, 68034520340, 68356643540, 68678766740, 69000889940, 69323013140,
  69645136340, 69967259540, 70289382740, 70611505940, 70933629140, 71255752340, 71577875540, 71899998740, 72222121940, 72544245140,
  72866368340, 73188491540, 73510614740, 73832737940, 74206739680, 76354260980, 78554388220, 80807787310, 83115124140, 85477064620,
  87894274640, 90367420090, 92897166880, 95484180910, 98129128060, 100832674250, 103595485370, 106418227310, 109301565980, 1
];

const mythLevelData = reqExpValues.map((reqExp, index) => {
  const level = index + 1;
  let totalAccumulated = 0;
  for (let i = 0; i < index; i++) {
    totalAccumulated += reqExpValues[i];
  }
  return { level, reqExp, totalAccumulated };
});

// Myth EXP potions
const mythExpPots = [
  { name: "Myth EXP Potion (10,000,000,000)", exp: 10000000000 },
  { name: "Myth EXP Potion (5,000,000,000)", exp: 5000000000 },
  { name: "Myth EXP Potion (2,000,000,000)", exp: 2000000000 },
];

// Constants from Myth.scp
const MIN_RESET_LEVEL = 95;
const MAX_LEVEL = 100;
const REBIRTH_MULTIPLIER_CAP = 500; // Limit from [RepeatPenalty]

interface RebirthBreakdown {
  rebirth: number;
  multiplier: number;
  expNeeded: number;
}

type CalculationMode = 'reset' | 'target-level';

interface CalculationResult {
  totalMythExpNeeded: number;
  currentRebirth: number;
  goalRebirth?: number;
  totalRebirths?: number;
  rebirthBreakdown: RebirthBreakdown[];
  potionsNeeded: Array<{
    name: string;
    exp: number;
    count: number;
  }>;
  currentMythExp: number;
  resetLevel?: number;
  targetLevel?: number;
  mode: CalculationMode;
}

export default function MythExpCalculator() {
  const [calculationMode, setCalculationMode] = useState<CalculationMode>('reset');
  const [currentRebirth, setCurrentRebirth] = useState<number>(0);
  const [goalRebirth, setGoalRebirth] = useState<number>(1);
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [currentPercentage, setCurrentPercentage] = useState<number>(0);
  const [resetLevel, setResetLevel] = useState<number>(100);
  const [targetLevel, setTargetLevel] = useState<number>(50);
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<CalculationResult | null>(null);

  // Calculate rebirth multiplier: 1 + (rebirthCount * 0.01), capped at 6.0 for 500+ rebirths
  const getRebirthMultiplier = useCallback((rebirthCount: number): number => {
    const cappedRebirth = Math.min(rebirthCount, REBIRTH_MULTIPLIER_CAP);
    return 1 + (cappedRebirth * 0.01);
  }, []);


  // Calculate exp needed for one rebirth cycle (from level 1 to reset level)
  const getExpForRebirthCycle = useCallback((resetLevel: number): number => {
    if (resetLevel < 1 || resetLevel > MAX_LEVEL) return 0;
    const levelData = mythLevelData.find(item => item.level === resetLevel);
    if (!levelData) return 0;
    return levelData.totalAccumulated;
  }, []);

  const validateInputs = useCallback((): string => {
    if (currentRebirth < 0) return 'Current rebirth count cannot be negative';
    if (currentLevel < 1 || currentLevel > MAX_LEVEL) return `Current myth level must be between 1 and ${MAX_LEVEL}`;
    if (currentPercentage < 0 || currentPercentage > 99) return 'Current progress percentage must be between 0 and 99';
    
    if (calculationMode === 'reset') {
      if (goalRebirth < 0) return 'Goal rebirth count cannot be negative';
      if (goalRebirth <= currentRebirth) return 'Goal rebirth count must be higher than current rebirth count';
      if (resetLevel < MIN_RESET_LEVEL || resetLevel > MAX_LEVEL) return `Reset level must be between ${MIN_RESET_LEVEL} and ${MAX_LEVEL}`;
    } else {
      if (targetLevel < 1 || targetLevel > MAX_LEVEL) return `Target level must be between 1 and ${MAX_LEVEL}`;
      if (targetLevel <= currentLevel) return 'Target level must be higher than current level';
    }
    
    return '';
  }, [calculationMode, currentRebirth, goalRebirth, currentLevel, currentPercentage, resetLevel, targetLevel]);

  const calculateMythExp = useCallback(() => {
    const validationError = validateInputs();
    if (validationError) {
      setError(validationError);
      setResult(null);
      return;
    }

    setError('');

    // Calculate current base myth exp (without multiplier)
    const currentLevelData = mythLevelData.find(item => item.level === currentLevel);
    const nextLevelData = mythLevelData.find(item => item.level === currentLevel + 1);
    
    if (!currentLevelData) {
      setError("Invalid level data. Please try again.");
      return;
    }

    // Calculate base exp at current position (without multiplier)
    let baseExpAtCurrentLevel = currentLevelData.totalAccumulated;
    if (nextLevelData && currentLevel < MAX_LEVEL) {
      const expRangeForCurrentLevel = nextLevelData.reqExp;
      baseExpAtCurrentLevel += (expRangeForCurrentLevel * (currentPercentage / 100));
    }

    const currentRebirthMultiplier = getRebirthMultiplier(currentRebirth);
    const rebirthBreakdown: RebirthBreakdown[] = [];
    let totalMythExpNeeded = 0;

    if (calculationMode === 'target-level') {
      // Mode: Reach target level within current rebirth
      const targetLevelData = mythLevelData.find(item => item.level === targetLevel);
      if (!targetLevelData) {
        setError("Invalid target level data. Please try again.");
        return;
      }

      const baseExpAtTargetLevel = targetLevelData.totalAccumulated;
      const baseExpNeeded = baseExpAtTargetLevel - baseExpAtCurrentLevel;
      
      if (baseExpNeeded > 0) {
        // Apply multiplier to get actual exp needed
        const expNeeded = baseExpNeeded * currentRebirthMultiplier;
        totalMythExpNeeded = expNeeded;
        
        rebirthBreakdown.push({
          rebirth: currentRebirth,
          multiplier: currentRebirthMultiplier,
          expNeeded: expNeeded,
        });
      }
    } else {
      // Mode: Reach reset level (multiple rebirths)
      // Calculate exp needed for one full rebirth cycle (from level 1 to reset level)
      const baseExpForCycle = getExpForRebirthCycle(resetLevel);

      // Calculate exp needed for current rebirth (from current level to reset level)
      if (currentRebirth < goalRebirth) {
        // Base exp still needed to reach reset level
        const baseExpNeeded = Math.max(0, baseExpForCycle - baseExpAtCurrentLevel);
        
        // Only add exp if there's still exp needed (user hasn't reached reset level yet)
        if (baseExpNeeded > 0) {
          // Apply multiplier to get actual exp needed
          const expNeededForCurrentCycle = baseExpNeeded * currentRebirthMultiplier;
          
          rebirthBreakdown.push({
            rebirth: currentRebirth,
            multiplier: currentRebirthMultiplier,
            expNeeded: expNeededForCurrentCycle,
          });
          
          totalMythExpNeeded += expNeededForCurrentCycle;
        }
      }

      // Calculate exp needed for future rebirths (full cycles from level 1 to reset level)
      for (let rebirth = currentRebirth + 1; rebirth < goalRebirth; rebirth++) {
        const multiplier = getRebirthMultiplier(rebirth);
        const expNeededForCycle = baseExpForCycle * multiplier;
        
        rebirthBreakdown.push({
          rebirth: rebirth,
          multiplier: multiplier,
          expNeeded: expNeededForCycle,
        });
        
        totalMythExpNeeded += expNeededForCycle;
      }
    }

    // Calculate potions needed
    const potionsNeeded = mythExpPots.map(pot => ({
      name: pot.name,
      exp: pot.exp,
      count: Math.ceil(totalMythExpNeeded / pot.exp)
    }));

    setResult({
      totalMythExpNeeded,
      currentRebirth,
      goalRebirth: calculationMode === 'reset' ? goalRebirth : undefined,
      totalRebirths: calculationMode === 'reset' ? goalRebirth - currentRebirth : undefined,
      rebirthBreakdown,
      potionsNeeded,
      currentMythExp: baseExpAtCurrentLevel,
      resetLevel: calculationMode === 'reset' ? resetLevel : undefined,
      targetLevel: calculationMode === 'target-level' ? targetLevel : undefined,
      mode: calculationMode,
    });
  }, [calculationMode, currentRebirth, goalRebirth, currentLevel, currentPercentage, resetLevel, targetLevel, validateInputs, getRebirthMultiplier, getExpForRebirthCycle]);

  const handleCurrentRebirthChange = (value: number) => {
    const rebirth = Math.max(0, value);
    setCurrentRebirth(rebirth);
  };

  const handleGoalRebirthChange = (value: number) => {
    if (isNaN(value)) return;
    const rebirth = Math.max(0, value);
    setGoalRebirth(rebirth);
  };

  const handleCurrentLevelChange = (value: number) => {
    const level = Math.max(1, Math.min(MAX_LEVEL, value));
    setCurrentLevel(level);
    if (level === MAX_LEVEL) {
      setCurrentPercentage(0);
    }
  };

  const handleCurrentPercentageChange = (value: number) => {
    const percentage = Math.max(0, Math.min(99, value));
    setCurrentPercentage(percentage);
  };

  const handleResetLevelChange = (value: number) => {
    const level = Math.max(MIN_RESET_LEVEL, Math.min(MAX_LEVEL, value));
    setResetLevel(level);
  };

  const handleTargetLevelChange = (value: number) => {
    if (isNaN(value)) return;
    const level = Math.max(1, Math.min(MAX_LEVEL, value));
    setTargetLevel(level);
  };

  return (
    <div>
      {/* Form */}
      <div className="p-6 space-y-4">
        {/* Calculation Mode Selector */}
        <div className="space-y-1">
          <label className="block text-sm font-medium text-foreground mb-2">
            Calculation Mode
          </label>
          <div className="flex gap-4">
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="calculation-mode"
                value="reset"
                checked={calculationMode === 'reset'}
                onChange={(e) => setCalculationMode(e.target.value as CalculationMode)}
                className="w-4 h-4 text-game-highlight focus:ring-game-highlight"
              />
              <span className="text-foreground">Reach Reset Level (Multiple Rebirths)</span>
            </label>
            <label className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="calculation-mode"
                value="target-level"
                checked={calculationMode === 'target-level'}
                onChange={(e) => setCalculationMode(e.target.value as CalculationMode)}
                className="w-4 h-4 text-game-highlight focus:ring-game-highlight"
              />
              <span className="text-foreground">Reach Target Level (Current Rebirth)</span>
            </label>
          </div>
          <p className="text-xs text-foreground/60">
            {calculationMode === 'reset' 
              ? 'Calculate exp needed to reach a specific rebirth count by resetting at a certain level.'
              : 'Calculate exp needed to reach a specific level within your current rebirth.'}
          </p>
        </div>
        <div className="space-y-1">
          <label htmlFor="current-rebirth" className="block text-sm font-medium text-foreground">
            Current Rebirth Count
          </label>
          <input
            type="number"
            id="current-rebirth"
            min="0"
            value={currentRebirth || ''}
            onChange={(e) => handleCurrentRebirthChange(parseInt(e.target.value) || 0)}
            className="w-full bg-theme-dark border border-border-dark rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-game-highlight"
            placeholder="Enter current rebirth count (0+)"
          />
          <p className="text-xs text-foreground/60">
            Your current rebirth count. Each rebirth increases exp requirements by 1% (capped at 500 rebirths).
          </p>
        </div>

        {calculationMode === 'reset' && (
          <div className="space-y-1">
            <label htmlFor="goal-rebirth" className="block text-sm font-medium text-foreground">
              Goal Rebirth Count
            </label>
            <input
              type="number"
              id="goal-rebirth"
              min="0"
              value={goalRebirth || ''}
              onChange={(e) => handleGoalRebirthChange(parseInt(e.target.value))}
              className="w-full bg-theme-dark border border-border-dark rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-game-highlight"
              placeholder="Enter goal rebirth count"
            />
            <p className="text-xs text-foreground/60">
              The rebirth count you want to reach.
            </p>
          </div>
        )}

        <div className="space-y-1">
          <label htmlFor="current-level" className="block text-sm font-medium text-foreground">
            Current Myth Level
          </label>
          <input
            type="number"
            id="current-level"
            min="1"
            max={MAX_LEVEL}
            value={currentLevel || ''}
            onChange={(e) => handleCurrentLevelChange(parseInt(e.target.value) || 1)}
            className="w-full bg-theme-dark border border-border-dark rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-game-highlight"
            placeholder={`Enter current myth level (1-${MAX_LEVEL})`}
          />
          <p className="text-xs text-foreground/60">
            Your current myth level in the current rebirth cycle.
          </p>
        </div>

        <div className="space-y-1">
          <label htmlFor="current-percentage" className="block text-sm font-medium text-foreground">
            Current Level Progress
          </label>
          <input
            type="number"
            id="current-percentage"
            min="0"
            max="99"
            value={currentPercentage || ''}
            onChange={(e) => handleCurrentPercentageChange(parseInt(e.target.value) || 0)}
            className="w-full bg-theme-dark border border-border-dark rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-game-highlight"
            placeholder="Enter current level progress (0-99%)"
          />
          <p className="text-xs text-foreground/60">
            Optional. Your progress in the current level (0-99%).
          </p>
        </div>

        {calculationMode === 'target-level' && (
          <div className="space-y-1">
            <label htmlFor="target-level" className="block text-sm font-medium text-foreground">
              Target Myth Level
            </label>
            <input
              type="number"
              id="target-level"
              min="1"
              max={MAX_LEVEL}
              value={targetLevel || ''}
              onChange={(e) => handleTargetLevelChange(parseInt(e.target.value))}
              className="w-full bg-theme-dark border border-border-dark rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-game-highlight"
              placeholder={`Enter target myth level (1-${MAX_LEVEL})`}
            />
            <p className="text-xs text-foreground/60">
              The myth level you want to reach in your current rebirth.
            </p>
          </div>
        )}

        {calculationMode === 'reset' && (
          <div className="space-y-1">
            <label htmlFor="reset-level" className="block text-sm font-medium text-foreground">
              Reset Level
            </label>
            <input
              type="number"
              id="reset-level"
              min={MIN_RESET_LEVEL}
              max={MAX_LEVEL}
              value={resetLevel || ''}
              onChange={(e) => handleResetLevelChange(parseInt(e.target.value) || MIN_RESET_LEVEL)}
              className="w-full bg-theme-dark border border-border-dark rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-game-highlight"
              placeholder={`Enter reset level (${MIN_RESET_LEVEL}-${MAX_LEVEL})`}
            />
            <p className="text-xs text-foreground/60">
              The level at which you will reset. Minimum is {MIN_RESET_LEVEL}. Resetting before level {MAX_LEVEL} costs force gems.
            </p>
          </div>
        )}

        <button
          onClick={calculateMythExp}
          className="w-full bg-game-highlight hover:bg-game-highlight/80 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-200"
        >
          Calculate Myth EXP
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mx-6 mb-6 p-4 bg-red-500/20 border border-red-500/40 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="mx-6 mb-6 glass-panel-light p-6 space-y-4">
          {/* Summary Table */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground border-b border-border-dark pb-2">
              Summary
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border-dark">
                    <th className="text-left py-3 px-4 text-foreground font-semibold">Metric</th>
                    <th className="text-right py-3 px-4 text-foreground font-semibold">Value</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border-dark">
                    <td className="py-2 px-4 text-foreground/80">Current Rebirth</td>
                    <td className="py-2 px-4 text-right text-foreground">{result.currentRebirth}</td>
                  </tr>
                  {result.mode === 'reset' && (
                    <>
                      <tr className="border-b border-border-dark">
                        <td className="py-2 px-4 text-foreground/80">Goal Rebirth</td>
                        <td className="py-2 px-4 text-right text-foreground">{result.goalRebirth}</td>
                      </tr>
                      <tr className="border-b border-border-dark">
                        <td className="py-2 px-4 text-foreground/80">Total Rebirths to Complete</td>
                        <td className="py-2 px-4 text-right text-foreground">{result.totalRebirths}</td>
                      </tr>
                      <tr className="border-b border-border-dark">
                        <td className="py-2 px-4 text-foreground/80">Reset Level</td>
                        <td className="py-2 px-4 text-right text-foreground">{result.resetLevel}</td>
                      </tr>
                    </>
                  )}
                  {result.mode === 'target-level' && (
                    <tr className="border-b border-border-dark">
                      <td className="py-2 px-4 text-foreground/80">Target Level</td>
                      <td className="py-2 px-4 text-right text-foreground">{result.targetLevel}</td>
                    </tr>
                  )}
                  <tr className="bg-game-highlight/10">
                    <td className="py-2 px-4 text-foreground font-medium">Total Myth EXP Needed</td>
                    <td className="py-2 px-4 text-right text-game-highlight font-bold">{formatNumber(Math.round(result.totalMythExpNeeded))}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Separator */}
          <div className="border-t border-border-dark my-6"></div>

          {/* Potions Needed */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground border-b border-border-dark pb-2">
              Myth EXP Potions Needed (Choose One)
            </h3>
            <p className="text-xs text-foreground/60 mb-3">Each row shows how many potions of that type you need to reach your goal.</p>
            
            {result.potionsNeeded.filter(pot => pot.count > 0).length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border-dark">
                      <th className="text-left py-3 px-4 text-foreground font-semibold">Potion Option</th>
                      <th className="text-center py-3 px-4 text-foreground font-semibold">EXP Value</th>
                      <th className="text-right py-3 px-4 text-foreground font-semibold">Quantity Needed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.potionsNeeded.filter(pot => pot.count > 0).map((pot, index) => (
                      <tr key={index} className="border-b border-border-dark hover:bg-theme-dark/30">
                        <td className="py-2 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-game-highlight/20 rounded border border-game-highlight/40 flex items-center justify-center flex-shrink-0">
                              <Image 
                                src="/images/exp/myth-pot.png" 
                                alt="Myth EXP Potion" 
                                width={16}
                                height={16}
                                className="w-4 h-4"
                              />
                            </div>
                            <span className="text-foreground text-sm">{pot.name}</span>
                          </div>
                        </td>
                        <td className="py-2 px-4 text-center text-foreground/80 text-sm">{formatNumber(pot.exp)}</td>
                        <td className="py-2 px-4 text-right text-foreground font-semibold">{formatNumber(pot.count)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-foreground/60 text-center py-4">No potions needed - you're already at your goal!</p>
            )}
          </div>

          {/* Additional Info */}
          <div className="text-xs text-foreground/60 bg-theme-dark p-3 rounded-lg border border-border-dark">
            <p className="mb-1"><strong>Note:</strong> Myth EXP requirements increase by 1% per rebirth, capped at 500 rebirths (6x multiplier).</p>
            <p><strong>Note:</strong> Minimum reset level is {MIN_RESET_LEVEL}. You can reset at any level from {MIN_RESET_LEVEL} to {MAX_LEVEL}.</p>
          </div>
        </div>
      )}
    </div>
  );
}

