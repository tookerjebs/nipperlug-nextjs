'use client';

import { useState, useCallback } from 'react';
import { formatNumber } from '@/utils/numberFormat';

// EXP data table for levels 1-200
const expTable = [
  { level: 1, expRequired: 0, totalAccumulated: 0 },
  { level: 2, expRequired: 270, totalAccumulated: 270 },
  { level: 3, expRequired: 1080, totalAccumulated: 1350 },
  { level: 4, expRequired: 2430, totalAccumulated: 3780 },
  { level: 5, expRequired: 4320, totalAccumulated: 8100 },
  { level: 6, expRequired: 6750, totalAccumulated: 14850 },
  { level: 7, expRequired: 9720, totalAccumulated: 24570 },
  { level: 8, expRequired: 13230, totalAccumulated: 37800 },
  { level: 9, expRequired: 17280, totalAccumulated: 55080 },
  { level: 10, expRequired: 21870, totalAccumulated: 76950 },
  { level: 11, expRequired: 27000, totalAccumulated: 103950 },
  { level: 12, expRequired: 32670, totalAccumulated: 136620 },
  { level: 13, expRequired: 38880, totalAccumulated: 175500 },
  { level: 14, expRequired: 45630, totalAccumulated: 221130 },
  { level: 15, expRequired: 52920, totalAccumulated: 274050 },
  { level: 16, expRequired: 60750, totalAccumulated: 334800 },
  { level: 17, expRequired: 69120, totalAccumulated: 403920 },
  { level: 18, expRequired: 78030, totalAccumulated: 481950 },
  { level: 19, expRequired: 87480, totalAccumulated: 569430 },
  { level: 20, expRequired: 96228, totalAccumulated: 665658 },
  { level: 21, expRequired: 105755, totalAccumulated: 771413 },
  { level: 22, expRequired: 116119, totalAccumulated: 887532 },
  { level: 23, expRequired: 127382, totalAccumulated: 1014914 },
  { level: 24, expRequired: 139611, totalAccumulated: 1154525 },
  { level: 25, expRequired: 152874, totalAccumulated: 1307399 },
  { level: 26, expRequired: 167244, totalAccumulated: 1474643 },
  { level: 27, expRequired: 182798, totalAccumulated: 1657441 },
  { level: 28, expRequired: 199615, totalAccumulated: 1857056 },
  { level: 29, expRequired: 217780, totalAccumulated: 2074836 },
  { level: 30, expRequired: 237598, totalAccumulated: 2312434 },
  { level: 31, expRequired: 259219, totalAccumulated: 2571653 },
  { level: 32, expRequired: 282808, totalAccumulated: 2854461 },
  { level: 33, expRequired: 308544, totalAccumulated: 3163005 },
  { level: 34, expRequired: 336621, totalAccumulated: 3499626 },
  { level: 35, expRequired: 367254, totalAccumulated: 3866880 },
  { level: 36, expRequired: 400674, totalAccumulated: 4267554 },
  { level: 37, expRequired: 437135, totalAccumulated: 4704689 },
  { level: 38, expRequired: 476914, totalAccumulated: 5181603 },
  { level: 39, expRequired: 520314, totalAccumulated: 5701917 },
  { level: 40, expRequired: 567662, totalAccumulated: 6269579 },
  { level: 41, expRequired: 619319, totalAccumulated: 6888898 },
  { level: 42, expRequired: 675677, totalAccumulated: 7564575 },
  { level: 43, expRequired: 737164, totalAccumulated: 8301739 },
  { level: 44, expRequired: 804246, totalAccumulated: 9105985 },
  { level: 45, expRequired: 877432, totalAccumulated: 9983417 },
  { level: 46, expRequired: 957279, totalAccumulated: 10940696 },
  { level: 47, expRequired: 1044391, totalAccumulated: 11985087 },
  { level: 48, expRequired: 1139431, totalAccumulated: 13124518 },
  { level: 49, expRequired: 1243119, totalAccumulated: 14367637 },
  { level: 50, expRequired: 1350027, totalAccumulated: 15717664 },
  { level: 51, expRequired: 1459379, totalAccumulated: 17177043 },
  { level: 52, expRequired: 1570292, totalAccumulated: 18747335 },
  { level: 53, expRequired: 1681783, totalAccumulated: 20429118 },
  { level: 54, expRequired: 1792781, totalAccumulated: 22221899 },
  { level: 55, expRequired: 1902140, totalAccumulated: 24124039 },
  { level: 56, expRequired: 2008660, totalAccumulated: 26132699 },
  { level: 57, expRequired: 2111102, totalAccumulated: 28243801 },
  { level: 58, expRequired: 2208212, totalAccumulated: 30452013 },
  { level: 59, expRequired: 2298749, totalAccumulated: 32750762 },
  { level: 60, expRequired: 2392998, totalAccumulated: 35143760 },
  { level: 61, expRequired: 2491111, totalAccumulated: 37634871 },
  { level: 62, expRequired: 2593246, totalAccumulated: 40228117 },
  { level: 63, expRequired: 2699569, totalAccumulated: 42927686 },
  { level: 64, expRequired: 2810252, totalAccumulated: 45737938 },
  { level: 65, expRequired: 2925472, totalAccumulated: 48663410 },
  { level: 66, expRequired: 3045416, totalAccumulated: 51708826 },
  { level: 67, expRequired: 3170278, totalAccumulated: 54879104 },
  { level: 68, expRequired: 3300260, totalAccumulated: 58179364 },
  { level: 69, expRequired: 3435571, totalAccumulated: 61614935 },
  { level: 70, expRequired: 3576429, totalAccumulated: 65191364 },
  { level: 71, expRequired: 3723063, totalAccumulated: 68914427 },
  { level: 72, expRequired: 3875708, totalAccumulated: 72790135 },
  { level: 73, expRequired: 4034612, totalAccumulated: 76824747 },
  { level: 74, expRequired: 4200031, totalAccumulated: 81024778 },
  { level: 75, expRequired: 4372232, totalAccumulated: 85397010 },
  { level: 76, expRequired: 4551494, totalAccumulated: 89948504 },
  { level: 77, expRequired: 4738105, totalAccumulated: 94686609 },
  { level: 78, expRequired: 4932368, totalAccumulated: 99618977 },
  { level: 79, expRequired: 5134595, totalAccumulated: 104753572 },
  { level: 80, expRequired: 5345113, totalAccumulated: 110098685 },
  { level: 81, expRequired: 5564263, totalAccumulated: 115662948 },
  { level: 82, expRequired: 5792397, totalAccumulated: 121455345 },
  { level: 83, expRequired: 6029886, totalAccumulated: 127485231 },
  { level: 84, expRequired: 6277111, totalAccumulated: 133762342 },
  { level: 85, expRequired: 6534473, totalAccumulated: 140296815 },
  { level: 86, expRequired: 6802386, totalAccumulated: 147099201 },
  { level: 87, expRequired: 7081284, totalAccumulated: 154180485 },
  { level: 88, expRequired: 7371616, totalAccumulated: 161552101 },
  { level: 89, expRequired: 7673853, totalAccumulated: 169225954 },
  { level: 90, expRequired: 7988481, totalAccumulated: 177214435 },
  { level: 91, expRequired: 8316008, totalAccumulated: 185530443 },
  { level: 92, expRequired: 8656965, totalAccumulated: 194187408 },
  { level: 93, expRequired: 9011900, totalAccumulated: 203199308 },
  { level: 94, expRequired: 9381388, totalAccumulated: 212580696 },
  { level: 95, expRequired: 9766025, totalAccumulated: 222346721 },
  { level: 96, expRequired: 10166432, totalAccumulated: 232513153 },
  { level: 97, expRequired: 10583256, totalAccumulated: 243096409 },
  { level: 98, expRequired: 11017169, totalAccumulated: 254113578 },
  { level: 99, expRequired: 11468873, totalAccumulated: 265582451 },
  { level: 100, expRequired: 11948674, totalAccumulated: 277531125 },
  { level: 101, expRequired: 12458524, totalAccumulated: 289989649 },
  { level: 102, expRequired: 13000532, totalAccumulated: 302990181 },
  { level: 103, expRequired: 13576975, totalAccumulated: 316567156 },
  { level: 104, expRequired: 14190315, totalAccumulated: 330757471 },
  { level: 105, expRequired: 14843211, totalAccumulated: 345600682 },
  { level: 106, expRequired: 15538542, totalAccumulated: 361139224 },
  { level: 107, expRequired: 16279419, totalAccumulated: 377418643 },
  { level: 108, expRequired: 17069215, totalAccumulated: 394487858 },
  { level: 109, expRequired: 17911581, totalAccumulated: 412399439 },
  { level: 110, expRequired: 18810474, totalAccumulated: 431209913 },
  { level: 111, expRequired: 19770184, totalAccumulated: 450980097 },
  { level: 112, expRequired: 20795367, totalAccumulated: 471775464 },
  { level: 113, expRequired: 21891075, totalAccumulated: 493666539 },
  { level: 114, expRequired: 23062795, totalAccumulated: 516729334 },
  { level: 115, expRequired: 24316488, totalAccumulated: 541045822 },
  { level: 116, expRequired: 25658637, totalAccumulated: 566704459 },
  { level: 117, expRequired: 27096290, totalAccumulated: 593800749 },
  { level: 118, expRequired: 28637121, totalAccumulated: 622437870 },
  { level: 119, expRequired: 30289483, totalAccumulated: 652727353 },
  { level: 120, expRequired: 32062478, totalAccumulated: 684789831 },
  { level: 121, expRequired: 33966027, totalAccumulated: 718755858 },
  { level: 122, expRequired: 36010952, totalAccumulated: 754766810 },
  { level: 123, expRequired: 38209060, totalAccumulated: 792975870 },
  { level: 124, expRequired: 40573246, totalAccumulated: 833549116 },
  { level: 125, expRequired: 43117594, totalAccumulated: 876666710 },
  { level: 126, expRequired: 45857501, totalAccumulated: 922524211 },
  { level: 127, expRequired: 48809807, totalAccumulated: 971334018 },
  { level: 128, expRequired: 51992939, totalAccumulated: 1023326957 },
  { level: 129, expRequired: 55427073, totalAccumulated: 1078754030 },
  { level: 130, expRequired: 59134312, totalAccumulated: 1137888342 },
  { level: 131, expRequired: 63138888, totalAccumulated: 1201027230 },
  { level: 132, expRequired: 67467374, totalAccumulated: 1268494604 },
  { level: 133, expRequired: 72148936, totalAccumulated: 1340643540 },
  { level: 134, expRequired: 77215595, totalAccumulated: 1417859135 },
  { level: 135, expRequired: 82702535, totalAccumulated: 1500561670 },
  { level: 136, expRequired: 88648433, totalAccumulated: 1589210103 },
  { level: 137, expRequired: 95095834, totalAccumulated: 1684305937 },
  { level: 138, expRequired: 102091559, totalAccumulated: 1786397496 },
  { level: 139, expRequired: 109687171, totalAccumulated: 1896084667 },
  { level: 140, expRequired: 117939485, totalAccumulated: 2014024152 },
  { level: 141, expRequired: 126911142, totalAccumulated: 2140935294 },
  { level: 142, expRequired: 136671243, totalAccumulated: 2277606537 },
  { level: 143, expRequired: 147296066, totalAccumulated: 2424902603 },
  { level: 144, expRequired: 158869854, totalAccumulated: 2583772457 },
  { level: 145, expRequired: 171485709, totalAccumulated: 2755258166 },
  { level: 146, expRequired: 185246580, totalAccumulated: 2940504746 },
  { level: 147, expRequired: 200266373, totalAccumulated: 3140771119 },
  { level: 148, expRequired: 216671193, totalAccumulated: 3357442312 },
  { level: 149, expRequired: 234600734, totalAccumulated: 3592043046 },
  { level: 150, expRequired: 254209836, totalAccumulated: 3846252882 },
  { level: 151, expRequired: 275670231, totalAccumulated: 4121923113 },
  { level: 152, expRequired: 299172496, totalAccumulated: 4421095609 },
  { level: 153, expRequired: 324928256, totalAccumulated: 4746023865 },
  { level: 154, expRequired: 353172645, totalAccumulated: 5099196510 },
  { level: 155, expRequired: 384167076, totalAccumulated: 5483363586 },
  { level: 156, expRequired: 418202358, totalAccumulated: 5901565944 },
  { level: 157, expRequired: 455602195, totalAccumulated: 6357168139 },
  { level: 158, expRequired: 496727127, totalAccumulated: 6853895266 },
  { level: 159, expRequired: 541978969, totalAccumulated: 7395874235 },
  { level: 160, expRequired: 591805805, totalAccumulated: 7987680040 },
  { level: 161, expRequired: 646707630, totalAccumulated: 8634387670 },
  { level: 162, expRequired: 707242697, totalAccumulated: 9341630367 },
  { level: 163, expRequired: 774034698, totalAccumulated: 10115665065 },
  { level: 164, expRequired: 847780854, totalAccumulated: 10963445919 },
  { level: 165, expRequired: 929261071, totalAccumulated: 11892706990 },
  { level: 166, expRequired: 1019348286, totalAccumulated: 12912055276 },
  { level: 167, expRequired: 1119020161, totalAccumulated: 14031075437 },
  { level: 168, expRequired: 1229372335, totalAccumulated: 15260447772 },
  { level: 169, expRequired: 1351633413, totalAccumulated: 16612081185 },
  { level: 170, expRequired: 1487181970, totalAccumulated: 18099263155 },
  { level: 171, expRequired: 1637565811, totalAccumulated: 19736828966 },
  { level: 172, expRequired: 1804523833, totalAccumulated: 21541352799 },
  { level: 173, expRequired: 1990010838, totalAccumulated: 23531363637 },
  { level: 174, expRequired: 2196225711, totalAccumulated: 25727589348 },
  { level: 175, expRequired: 2425643449, totalAccumulated: 28153232797 },
  { level: 176, expRequired: 2681051576, totalAccumulated: 30834284373 },
  { level: 177, expRequired: 2965591579, totalAccumulated: 33799875952 },
  { level: 178, expRequired: 3282806083, totalAccumulated: 37082682035 },
  { level: 179, expRequired: 3636692578, totalAccumulated: 40719374613 },
  { level: 180, expRequired: 4031764677, totalAccumulated: 44751139290 },
  { level: 181, expRequired: 4473121956, totalAccumulated: 49224261246 },
  { level: 182, expRequired: 4966529673, totalAccumulated: 54190790919 },
  { level: 183, expRequired: 5518509781, totalAccumulated: 59709300700 },
  { level: 184, expRequired: 6136444914, totalAccumulated: 65845745614 },
  { level: 185, expRequired: 6828697264, totalAccumulated: 72674442878 },
  { level: 186, expRequired: 7604744565, totalAccumulated: 80279187443 },
  { level: 187, expRequired: 8475335723, totalAccumulated: 88754523166 },
  { level: 188, expRequired: 9452669062, totalAccumulated: 98207192228 },
  { level: 189, expRequired: 10550596573, totalAccumulated: 108757788801 },
  { level: 190, expRequired: 11784858113, totalAccumulated: 120542646914 },
  { level: 191, expRequired: 13173350096, totalAccumulated: 133715997010 },
  { level: 192, expRequired: 14885885608, totalAccumulated: 148601882618 },
  { level: 193, expRequired: 17118768450, totalAccumulated: 165720651068 },
  { level: 194, expRequired: 20028959086, totalAccumulated: 185749610154 },
  { level: 195, expRequired: 23834461313, totalAccumulated: 209584071467 },
  { level: 196, expRequired: 28839698188, totalAccumulated: 238423769655 },
  { level: 197, expRequired: 35184431790, totalAccumulated: 273608201445 },
  { level: 198, expRequired: 43276851101, totalAccumulated: 316885052546 },
  { level: 199, expRequired: 53663295366, totalAccumulated: 370548347912 },
  { level: 200, expRequired: 67079119207, totalAccumulated: 437627467119 }
];

// EXP pots data - from WordPress version
const expPots = [
  { name: "EXP Potion (10,000,000,000)", exp: 10000000000 },
  { name: "EXP Potion (5,000,000,000)", exp: 5000000000 },
  { name: "EXP Potion (1,500,000,000)", exp: 1500000000 },
  { name: "EXP Potion (1,000,000,000)", exp: 1000000000 },
  { name: "EXP Potion (170,000,000)", exp: 170000000 }
];

// formatNumber is now imported from central utility

interface CalculationResult {
  expNeeded: number;
  currentExp: number;
  targetExp: number;
  potionsNeeded: Array<{
    name: string;
    exp: number;
    count: number;
  }>;
}

export default function CharacterExpCalculator() {
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [currentPercentage, setCurrentPercentage] = useState<number>(0);
  const [targetLevel, setTargetLevel] = useState<number>(200);
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const validateInputs = useCallback((current: number, target: number, percentage: number): string => {
    if (current < 1 || current > 199) return 'Current level must be between 1 and 199';
    if (target < 2 || target > 200) return 'Target level must be between 2 and 200';
    if (current >= target) return 'Target level must be higher than current level';
    if (percentage < 0 || percentage > 99) return 'Percentage must be between 0 and 99';
    return '';
  }, []);

  const calculateExp = useCallback(() => {
    const validationError = validateInputs(currentLevel, targetLevel, currentPercentage);
    if (validationError) {
      setError(validationError);
      setResult(null);
      return;
    }

    setError('');

    // Find the current level data in the table
    const currentLevelData = expTable.find(item => item.level === currentLevel);
    const nextLevelData = expTable.find(item => item.level === currentLevel + 1);
    const targetLevelData = expTable.find(item => item.level === targetLevel);

    if (!currentLevelData || !nextLevelData || !targetLevelData) {
      setError("Invalid level data. Please try again.");
      return;
    }

    // Calculate current EXP based on the level percentage
    const expForCurrentLevel = currentLevelData.totalAccumulated;
    const expRangeForCurrentLevel = nextLevelData.expRequired;
    
    // Calculate how much EXP the user currently has
    const currentExp = expForCurrentLevel + (expRangeForCurrentLevel * (currentPercentage / 100));
    
    // Calculate how much EXP the user needs for the target level
    const targetExp = targetLevelData.totalAccumulated;
    const expNeeded = targetExp - currentExp;

    // Calculate EXP pots needed
    const potionsNeeded = expPots.map(pot => ({
      name: pot.name,
      exp: pot.exp,
      count: Math.ceil(expNeeded / pot.exp)
    }));

    setResult({
      expNeeded,
      currentExp,
      targetExp,
      potionsNeeded
    });
  }, [currentLevel, currentPercentage, targetLevel, validateInputs]);

  const handleCurrentLevelChange = (value: number) => {
    const level = Math.max(1, Math.min(199, value));
    setCurrentLevel(level);
    if (level >= targetLevel) {
      setTargetLevel(level + 1);
    }
  };

  const handleTargetLevelChange = (value: number) => {
    const level = Math.max(2, Math.min(200, value));
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
          <label htmlFor="current-level" className="block text-sm font-medium text-foreground">
            Current Level
          </label>
          <input
            type="number"
            id="current-level"
            min="1"
            max="199"
            value={currentLevel}
            onChange={(e) => handleCurrentLevelChange(parseInt(e.target.value) || 1)}
            className="w-full bg-theme-dark border border-border-dark rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-game-highlight focus:ring-2 focus:ring-game-highlight/30"
            placeholder="Enter current level (1-199)"
          />
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
            value={currentPercentage}
            onChange={(e) => handlePercentageChange(parseInt(e.target.value) || 0)}
            className="w-full bg-theme-dark border border-border-dark rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-game-highlight focus:ring-2 focus:ring-game-highlight/30"
            placeholder="Enter current level progress (0-99%)"
          />
          <p className="text-xs text-foreground/60">Optional. Enter your progress in the current level (0-99%)</p>
        </div>

        <div className="space-y-1">
          <label htmlFor="target-level" className="block text-sm font-medium text-foreground">
            Target Level
          </label>
          <input
            type="number"
            id="target-level"
            min="2"
            max="200"
            value={targetLevel}
            onChange={(e) => handleTargetLevelChange(parseInt(e.target.value) || 2)}
            className="w-full bg-theme-dark border border-border-dark rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-game-highlight focus:ring-2 focus:ring-game-highlight/30"
            placeholder="Enter target level (2-200)"
          />
        </div>

        <button
          onClick={calculateExp}
          className="w-full bg-game-highlight hover:bg-game-highlight/80 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-200"
        >
          Calculate EXP
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
                  <td className="py-2 px-4 text-foreground/80">Current EXP</td>
                  <td className="py-2 px-4 text-right text-foreground">{formatNumber(Math.round(result.currentExp))}</td>
                </tr>
                <tr className="border-b border-border-dark">
                  <td className="py-2 px-4 text-foreground/80">Target EXP</td>
                  <td className="py-2 px-4 text-right text-foreground">{formatNumber(Math.round(result.targetExp))}</td>
                </tr>
                <tr className="bg-game-highlight/10">
                  <td className="py-2 px-4 text-foreground font-medium">Required EXP</td>
                  <td className="py-2 px-4 text-right text-game-highlight font-bold">{formatNumber(Math.round(result.expNeeded))}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* EXP Potions Table */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground border-b border-border-dark pb-2">
              EXP Potions Needed (Choose One)
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
                              <img 
                                src="/images/exp/exp-pot-icon.png" 
                                alt="EXP Potion" 
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
        </div>
      )}
    </div>
  );
}