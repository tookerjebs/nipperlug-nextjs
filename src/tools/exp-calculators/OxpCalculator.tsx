'use client';

import { useState, useCallback } from 'react';
import { formatNumber } from '@/utils/numberFormat';

// OXP data table for levels 1-100
const oxpTable = [
  { level: 1, oxpRequired: 0, totalAccumulated: 0 },
  { level: 2, oxpRequired: 3800000000, totalAccumulated: 3800000000 },
  { level: 3, oxpRequired: 4940000000, totalAccumulated: 8740000000 },
  { level: 4, oxpRequired: 6080000000, totalAccumulated: 14820000000 },
  { level: 5, oxpRequired: 7220000000, totalAccumulated: 22040000000 },
  { level: 6, oxpRequired: 8360000000, totalAccumulated: 30400000000 },
  { level: 7, oxpRequired: 9500000000, totalAccumulated: 39900000000 },
  { level: 8, oxpRequired: 10640000000, totalAccumulated: 50540000000 },
  { level: 9, oxpRequired: 11780000000, totalAccumulated: 62320000000 },
  { level: 10, oxpRequired: 12920000000, totalAccumulated: 75240000000 },
  { level: 11, oxpRequired: 14060000000, totalAccumulated: 89300000000 },
  { level: 12, oxpRequired: 15200000000, totalAccumulated: 104500000000 },
  { level: 13, oxpRequired: 16340000000, totalAccumulated: 120840000000 },
  { level: 14, oxpRequired: 17480000000, totalAccumulated: 138320000000 },
  { level: 15, oxpRequired: 18620000000, totalAccumulated: 156940000000 },
  { level: 16, oxpRequired: 19760000000, totalAccumulated: 176700000000 },
  { level: 17, oxpRequired: 20900000000, totalAccumulated: 197600000000 },
  { level: 18, oxpRequired: 22040000000, totalAccumulated: 219640000000 },
  { level: 19, oxpRequired: 23180000000, totalAccumulated: 242820000000 },
  { level: 20, oxpRequired: 24320000000, totalAccumulated: 267140000000 },
  { level: 21, oxpRequired: 43320000000, totalAccumulated: 310460000000 },
  { level: 22, oxpRequired: 45220000000, totalAccumulated: 355680000000 },
  { level: 23, oxpRequired: 47120000000, totalAccumulated: 402800000000 },
  { level: 24, oxpRequired: 49020000000, totalAccumulated: 451820000000 },
  { level: 25, oxpRequired: 50920000000, totalAccumulated: 502740000000 },
  { level: 26, oxpRequired: 52820000000, totalAccumulated: 555560000000 },
  { level: 27, oxpRequired: 54720000000, totalAccumulated: 610280000000 },
  { level: 28, oxpRequired: 56620000000, totalAccumulated: 666900000000 },
  { level: 29, oxpRequired: 58520000000, totalAccumulated: 725420000000 },
  { level: 30, oxpRequired: 60420000000, totalAccumulated: 785840000000 },
  { level: 31, oxpRequired: 62320000000, totalAccumulated: 848160000000 },
  { level: 32, oxpRequired: 64220000000, totalAccumulated: 912380000000 },
  { level: 33, oxpRequired: 66120000000, totalAccumulated: 978500000000 },
  { level: 34, oxpRequired: 68020000000, totalAccumulated: 1046520000000 },
  { level: 35, oxpRequired: 69920000000, totalAccumulated: 1116440000000 },
  { level: 36, oxpRequired: 71820000000, totalAccumulated: 1188260000000 },
  { level: 37, oxpRequired: 73720000000, totalAccumulated: 1261980000000 },
  { level: 38, oxpRequired: 75620000000, totalAccumulated: 1337600000000 },
  { level: 39, oxpRequired: 77520000000, totalAccumulated: 1415120000000 },
  { level: 40, oxpRequired: 79420000000, totalAccumulated: 1494540000000 },
  { level: 41, oxpRequired: 98420000000, totalAccumulated: 1592960000000 },
  { level: 42, oxpRequired: 100320000000, totalAccumulated: 1693280000000 },
  { level: 43, oxpRequired: 102220000000, totalAccumulated: 1795500000000 },
  { level: 44, oxpRequired: 104120000000, totalAccumulated: 1899620000000 },
  { level: 45, oxpRequired: 106020000000, totalAccumulated: 2005640000000 },
  { level: 46, oxpRequired: 107920000000, totalAccumulated: 2113560000000 },
  { level: 47, oxpRequired: 109820000000, totalAccumulated: 2223380000000 },
  { level: 48, oxpRequired: 111720000000, totalAccumulated: 2335100000000 },
  { level: 49, oxpRequired: 113620000000, totalAccumulated: 2448720000000 },
  { level: 50, oxpRequired: 115520000000, totalAccumulated: 2564240000000 },
  { level: 51, oxpRequired: 117420000000, totalAccumulated: 2681660000000 },
  { level: 52, oxpRequired: 119320000000, totalAccumulated: 2800980000000 },
  { level: 53, oxpRequired: 121220000000, totalAccumulated: 2922200000000 },
  { level: 54, oxpRequired: 123120000000, totalAccumulated: 3045320000000 },
  { level: 55, oxpRequired: 125020000000, totalAccumulated: 3170340000000 },
  { level: 56, oxpRequired: 126920000000, totalAccumulated: 3297260000000 },
  { level: 57, oxpRequired: 128820000000, totalAccumulated: 3426080000000 },
  { level: 58, oxpRequired: 130720000000, totalAccumulated: 3556800000000 },
  { level: 59, oxpRequired: 132620000000, totalAccumulated: 3689420000000 },
  { level: 60, oxpRequired: 134520000000, totalAccumulated: 3823940000000 },
  { level: 61, oxpRequired: 153520000000, totalAccumulated: 3977460000000 },
  { level: 62, oxpRequired: 155420000000, totalAccumulated: 4132880000000 },
  { level: 63, oxpRequired: 157320000000, totalAccumulated: 4290200000000 },
  { level: 64, oxpRequired: 159220000000, totalAccumulated: 4449420000000 },
  { level: 65, oxpRequired: 161120000000, totalAccumulated: 4610540000000 },
  { level: 66, oxpRequired: 163020000000, totalAccumulated: 4773560000000 },
  { level: 67, oxpRequired: 164920000000, totalAccumulated: 4938480000000 },
  { level: 68, oxpRequired: 166820000000, totalAccumulated: 5105300000000 },
  { level: 69, oxpRequired: 168720000000, totalAccumulated: 5274020000000 },
  { level: 70, oxpRequired: 170620000000, totalAccumulated: 5444640000000 },
  { level: 71, oxpRequired: 172520000000, totalAccumulated: 5617160000000 },
  { level: 72, oxpRequired: 174420000000, totalAccumulated: 5791580000000 },
  { level: 73, oxpRequired: 176320000000, totalAccumulated: 5967900000000 },
  { level: 74, oxpRequired: 178220000000, totalAccumulated: 6146120000000 },
  { level: 75, oxpRequired: 180120000000, totalAccumulated: 6326240000000 },
  { level: 76, oxpRequired: 182020000000, totalAccumulated: 6508260000000 },
  { level: 77, oxpRequired: 183920000000, totalAccumulated: 6692180000000 },
  { level: 78, oxpRequired: 185820000000, totalAccumulated: 6878000000000 },
  { level: 79, oxpRequired: 187720000000, totalAccumulated: 7065720000000 },
  { level: 80, oxpRequired: 189620000000, totalAccumulated: 7255340000000 },
  { level: 81, oxpRequired: 227520000000, totalAccumulated: 7482960000000 },
  { level: 82, oxpRequired: 229520000000, totalAccumulated: 7712480000000 },
  { level: 83, oxpRequired: 231420000000, totalAccumulated: 7943900000000 },
  { level: 84, oxpRequired: 233320000000, totalAccumulated: 8177220000000 },
  { level: 85, oxpRequired: 235220000000, totalAccumulated: 8412440000000 },
  { level: 86, oxpRequired: 237120000000, totalAccumulated: 8649560000000 },
  { level: 87, oxpRequired: 239020000000, totalAccumulated: 8888580000000 },
  { level: 88, oxpRequired: 240920000000, totalAccumulated: 9129500000000 },
  { level: 89, oxpRequired: 242820000000, totalAccumulated: 9372320000000 },
  { level: 90, oxpRequired: 244720000000, totalAccumulated: 9617040000000 },
  { level: 91, oxpRequired: 246620000000, totalAccumulated: 9863660000000 },
  { level: 92, oxpRequired: 248520000000, totalAccumulated: 10112180000000 },
  { level: 93, oxpRequired: 250420000000, totalAccumulated: 10362600000000 },
  { level: 94, oxpRequired: 252320000000, totalAccumulated: 10614920000000 },
  { level: 95, oxpRequired: 254220000000, totalAccumulated: 10869140000000 },
  { level: 96, oxpRequired: 256120000000, totalAccumulated: 11125260000000 },
  { level: 97, oxpRequired: 258020000000, totalAccumulated: 11383280000000 },
  { level: 98, oxpRequired: 259920000000, totalAccumulated: 11643200000000 },
  { level: 99, oxpRequired: 261820000000, totalAccumulated: 11905020000000 },
  { level: 100, oxpRequired: 263720000000, totalAccumulated: 12168740000000 }
];

// OXP pots data - from WordPress version
const oxpPots = [
  { name: "OXP Potion (10,000,000,000)", exp: 10000000000 },
  { name: "OXP Potion (5,000,000,000)", exp: 5000000000 },
  { name: "OXP Potion (1,200,000,000)", exp: 1200000000 }
];

// formatNumber is now imported from central utility

interface CalculationResult {
  oxpNeeded: number;
  currentOxp: number;
  targetOxp: number;
  potionsNeeded: Array<{
    name: string;
    exp: number;
    count: number;
  }>;
}

export default function OxpCalculator() {
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [currentPercentage, setCurrentPercentage] = useState<number>(0);
  const [targetLevel, setTargetLevel] = useState<number>(100);
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const validateInputs = useCallback((current: number, target: number, percentage: number): string => {
    if (current < 1 || current > 99) return 'Current OLevel must be between 1 and 99';
    if (target < 2 || target > 100) return 'Target OLevel must be between 2 and 100';
    if (current >= target) return 'Target OLevel must be higher than current OLevel';
    if (percentage < 0 || percentage > 99) return 'Percentage must be between 0 and 99';
    return '';
  }, []);

  const calculateOxp = useCallback(() => {
    const validationError = validateInputs(currentLevel, targetLevel, currentPercentage);
    if (validationError) {
      setError(validationError);
      setResult(null);
      return;
    }

    setError('');

    // Find the current level data in the table
    const currentLevelData = oxpTable.find(item => item.level === currentLevel);
    const nextLevelData = oxpTable.find(item => item.level === currentLevel + 1);
    const targetLevelData = oxpTable.find(item => item.level === targetLevel);

    if (!currentLevelData || !nextLevelData || !targetLevelData) {
      setError("Invalid level data. Please try again.");
      return;
    }

    // Calculate current OXP based on the level percentage
    const oxpForCurrentLevel = currentLevelData.totalAccumulated;
    const oxpRangeForCurrentLevel = nextLevelData.oxpRequired;
    
    // Calculate how much OXP the user currently has
    const currentOxp = oxpForCurrentLevel + (oxpRangeForCurrentLevel * (currentPercentage / 100));
    
    // Calculate how much OXP the user needs for the target level
    const targetOxp = targetLevelData.totalAccumulated;
    const oxpNeeded = targetOxp - currentOxp;

    // Calculate OXP pots needed
    const potionsNeeded = oxpPots.map(pot => ({
      name: pot.name,
      exp: pot.exp,
      count: Math.ceil(oxpNeeded / pot.exp)
    }));

    setResult({
      oxpNeeded,
      currentOxp,
      targetOxp,
      potionsNeeded
    });
  }, [currentLevel, currentPercentage, targetLevel, validateInputs]);

  const handleCurrentLevelChange = (value: number) => {
    const level = Math.max(1, Math.min(99, value));
    setCurrentLevel(level);
    if (level >= targetLevel) {
      setTargetLevel(level + 1);
    }
  };

  const handleTargetLevelChange = (value: number) => {
    const level = Math.max(2, Math.min(100, value));
    setTargetLevel(level);
    if (level <= currentLevel) {
      setCurrentLevel(level - 1);
    }
  };

  const handlePercentageChange = (value: number) => {
    const percentage = Math.max(0, Math.min(99, value));
    setCurrentPercentage(percentage);
  };

  return (
    <div>
      {/* Form */}
      <div className="p-6 space-y-4">
        <div className="space-y-1">
          <label htmlFor="current-olevel" className="block text-sm font-medium text-foreground">
            Current OLevel
          </label>
          <input
            type="number"
            id="current-olevel"
            min="1"
            max="99"
            value={currentLevel}
            onChange={(e) => handleCurrentLevelChange(parseInt(e.target.value) || 1)}
            className="w-full bg-theme-dark border border-border-dark rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-game-highlight focus:ring-2 focus:ring-game-highlight/30"
            placeholder="Enter current Overlord level (1-99)"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="current-olevel-percentage" className="block text-sm font-medium text-foreground">
            Current OLevel Progress
          </label>
          <input
            type="number"
            id="current-olevel-percentage"
            min="0"
            max="99"
            value={currentPercentage}
            onChange={(e) => handlePercentageChange(parseInt(e.target.value) || 0)}
            className="w-full bg-theme-dark border border-border-dark rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-game-highlight focus:ring-2 focus:ring-game-highlight/30"
            placeholder="Enter current level progress (0-99%)"
          />
          <p className="text-xs text-foreground/60">Optional. Enter your progress in the current level (0-99%)</p>
        </div>

        <div className="space-y-1">
          <label htmlFor="target-olevel" className="block text-sm font-medium text-foreground">
            Target OLevel
          </label>
          <input
            type="number"
            id="target-olevel"
            min="2"
            max="100"
            value={targetLevel}
            onChange={(e) => handleTargetLevelChange(parseInt(e.target.value) || 2)}
            className="w-full bg-theme-dark border border-border-dark rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-game-highlight focus:ring-2 focus:ring-game-highlight/30"
            placeholder="Enter target Overlord level (2-100)"
          />
        </div>

        <button
          onClick={calculateOxp}
          className="w-full bg-game-highlight hover:bg-game-highlight/80 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-200"
        >
          Calculate OXP
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
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border-dark">
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Summary</th>
                  <th className="text-right py-3 px-4 text-foreground font-semibold">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border-dark">
                  <td className="py-2 px-4 text-foreground/80">Current OXP</td>
                  <td className="py-2 px-4 text-right text-foreground">{formatNumber(Math.round(result.currentOxp))}</td>
                </tr>
                <tr className="border-b border-border-dark">
                  <td className="py-2 px-4 text-foreground/80">Target OXP</td>
                  <td className="py-2 px-4 text-right text-foreground">{formatNumber(Math.round(result.targetOxp))}</td>
                </tr>
                <tr className="bg-game-highlight/10">
                  <td className="py-2 px-4 text-foreground font-medium">Required OXP</td>
                  <td className="py-2 px-4 text-right text-game-highlight font-bold">{formatNumber(Math.round(result.oxpNeeded))}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* OXP Potions Table */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground border-b border-border-dark pb-2">
              OXP Potions Needed (Choose One)
            </h3>
            <p className="text-xs text-foreground/60 mb-3">Each row shows how many potions of that type you need to reach your goal.</p>
            
            {result.potionsNeeded.filter(pot => pot.count > 0).length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border-dark">
                      <th className="text-left py-3 px-4 text-foreground font-semibold">Potion Option</th>
                      <th className="text-center py-3 px-4 text-foreground font-semibold">OXP Value</th>
                      <th className="text-right py-3 px-4 text-foreground font-semibold">Quantity Needed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.potionsNeeded.filter(pot => pot.count > 0).map((pot, index) => (
                      <tr key={index} className="border-b border-border-dark hover:bg-theme-dark/30">
                        <td className="py-2 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-game-highlight/20 rounded border border-game-highlight/40 flex items-center justify-center flex-shrink-0">
                              <img 
                                src="/images/exp/oxp-pot-icon.png" 
                                alt="OXP Potion" 
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
              <p className="text-foreground/60 text-center py-4">No potions needed - you're already at your target level!</p>
            )}
          </div>

          {/* Additional Info */}
          <div className="text-xs text-foreground/60 bg-theme-dark p-3 rounded-lg border border-border-dark">
            <p className="mb-1"><strong>Note:</strong> OXP (Overlord Experience Points) is gained after reaching character level 200.</p>
          </div>
        </div>
      )}
    </div>
  );
}