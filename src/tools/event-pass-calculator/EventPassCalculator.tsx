'use client';

import { useState, useCallback } from 'react';
import { formatNumber } from '@/utils/numberFormat';

// Event Pass constants
const MAX_LEVEL = 50;
const POINTS_PER_LEVEL = 400;
const TOTAL_POINTS_NEEDED = MAX_LEVEL * POINTS_PER_LEVEL; // 20,000

// Mission constants
const DAILY_MISSIONS_COUNT = 3;
const POINTS_PER_DAILY_MISSION = 50;
const DAILY_POINTS = DAILY_MISSIONS_COUNT * POINTS_PER_DAILY_MISSION; // 150

const WEEKLY_MISSIONS_COUNT = 20;
const WEEKLY_POINTS_M_GROUP_2 = 2840; // Sum of all 20 weekly missions from M_Group 2
const WEEKLY_POINTS_M_GROUP_3 = 2680; // Sum of all 20 weekly missions from M_Group 3

type WeeklyPointsOption = 'm_group_2' | 'm_group_3' | 'custom';

interface CalculationResult {
  pointsNeeded: number;
  currentLevel: number;
  targetLevel: number;
  remainingDays: number;
  dailyPointsAvailable: number;
  weeklyPointsAvailable: number;
  totalPointsAvailable: number;
  isAchievable: boolean;
  pointsShortfall: number;
  dailyMissionsNeeded: number;
  weeklyMissionsNeeded: number;
  fullWeeksAvailable: number;
  partialWeekDays: number;
  achievableLevel: number;
  achievablePoints: number;
  // Skip calculations
  dailyMissionsIfAllWeeklies: number;
  weeklyMissionsIfAllDailies: number;
  dailyMissionsCanSkip: number;
  weeklyMissionsCanSkip: number;
}

export default function EventPassCalculator() {
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [currentProgress, setCurrentProgress] = useState<number>(0);
  const [remainingDays, setRemainingDays] = useState<number>(0);
  const [weeklyPointsOption, setWeeklyPointsOption] = useState<WeeklyPointsOption>('m_group_2');
  const [customWeeklyPoints, setCustomWeeklyPoints] = useState<number>(2840);
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<CalculationResult | null>(null);

  // Get the weekly points total based on selected option
  const getWeeklyPointsTotal = useCallback((): number => {
    switch (weeklyPointsOption) {
      case 'm_group_2':
        return WEEKLY_POINTS_M_GROUP_2;
      case 'm_group_3':
        return WEEKLY_POINTS_M_GROUP_3;
      case 'custom':
        return customWeeklyPoints;
      default:
        return WEEKLY_POINTS_M_GROUP_2;
    }
  }, [weeklyPointsOption, customWeeklyPoints]);

  const validateInputs = useCallback((level: number, progress: number, days: number, weeklyPoints: number): string => {
    if (level < 1 || level > MAX_LEVEL) return `Current level must be between 1 and ${MAX_LEVEL}`;
    if (progress < 0) return 'Progress points cannot be negative';
    if (progress >= POINTS_PER_LEVEL) return `Progress points must be less than ${POINTS_PER_LEVEL} (400 points = next level)`;
    if (level === MAX_LEVEL && progress > 0) return `You are already at max level (${MAX_LEVEL}). Progress should be 0.`;
    if (days < 0) return 'Remaining days cannot be negative';
    if (days > 365) return 'Remaining days seems too high. Please check your input.';
    if (weeklyPoints < 0) return 'Weekly points total cannot be negative';
    if (weeklyPoints > 10000) return 'Weekly points total seems too high. Please check your input.';
    return '';
  }, []);

  const calculateRequirements = useCallback(() => {
    const weeklyPointsTotal = getWeeklyPointsTotal();
    const validationError = validateInputs(currentLevel, currentProgress, remainingDays, weeklyPointsTotal);
    if (validationError) {
      setError(validationError);
      setResult(null);
      return;
    }

    setError('');

    // Calculate total current points from level and progress
    const currentPoints = (currentLevel * POINTS_PER_LEVEL) + currentProgress;
    const targetLevel = MAX_LEVEL;
    const pointsNeeded = TOTAL_POINTS_NEEDED - currentPoints;

    // Calculate available points
    const dailyPointsAvailable = remainingDays * DAILY_POINTS;
    const fullWeeksAvailable = Math.floor(remainingDays / 7);
    const partialWeekDays = remainingDays % 7;
    
    // Weekly missions reset at the start of each week
    // If there are any days remaining (partial week), count it as a full week of weekly missions
    const totalWeeksAvailable = partialWeekDays > 0 ? fullWeeksAvailable + 1 : fullWeeksAvailable;
    const totalWeeklyPoints = totalWeeksAvailable * weeklyPointsTotal;
    
    const totalPointsAvailable = dailyPointsAvailable + totalWeeklyPoints;

    // Determine if achievable
    const isAchievable = totalPointsAvailable >= pointsNeeded;
    const pointsShortfall = isAchievable ? 0 : pointsNeeded - totalPointsAvailable;

    // Calculate what level is achievable
    const achievablePoints = currentPoints + totalPointsAvailable;
    const achievableLevel = Math.min(MAX_LEVEL, Math.floor(achievablePoints / POINTS_PER_LEVEL));

    // Calculate missions needed (if achievable)
    let dailyMissionsNeeded = 0;
    let weeklyMissionsNeeded = 0;

    if (isAchievable) {
      // Strategy: Use weekly missions first (more efficient), then daily missions
      let remainingPointsNeeded = pointsNeeded;
      
      // Use weekly missions first
      const weeklyMissionsToUse = Math.min(
        totalWeeksAvailable * WEEKLY_MISSIONS_COUNT,
        Math.ceil(remainingPointsNeeded / (weeklyPointsTotal / WEEKLY_MISSIONS_COUNT))
      );
      
      const weeklyPointsUsed = Math.min(
        totalWeeklyPoints,
        weeklyMissionsToUse * (weeklyPointsTotal / WEEKLY_MISSIONS_COUNT)
      );
      remainingPointsNeeded -= weeklyPointsUsed;
      weeklyMissionsNeeded = weeklyMissionsToUse;

      // Use daily missions for remaining points
      if (remainingPointsNeeded > 0) {
        dailyMissionsNeeded = Math.ceil(remainingPointsNeeded / POINTS_PER_DAILY_MISSION);
        // Cap at available daily missions
        dailyMissionsNeeded = Math.min(dailyMissionsNeeded, remainingDays * DAILY_MISSIONS_COUNT);
      }
    } else {
      // If not achievable, show what's needed
      dailyMissionsNeeded = remainingDays * DAILY_MISSIONS_COUNT;
      weeklyMissionsNeeded = totalWeeksAvailable * WEEKLY_MISSIONS_COUNT;
    }

    // Calculate skip scenarios
    // If user completes ALL weekly missions, how many daily missions are needed?
    const dailyMissionsIfAllWeeklies = Math.max(0, Math.ceil((pointsNeeded - totalWeeklyPoints) / POINTS_PER_DAILY_MISSION));
    
    // If user completes ALL daily missions, how many weekly missions are needed?
    const weeklyMissionsIfAllDailies = Math.max(0, Math.ceil((pointsNeeded - dailyPointsAvailable) / (weeklyPointsTotal / WEEKLY_MISSIONS_COUNT)));
    
    // How many daily missions can be skipped if doing all weeklies?
    const dailyMissionsCanSkip = Math.max(0, (remainingDays * DAILY_MISSIONS_COUNT) - dailyMissionsIfAllWeeklies);
    
    // How many weekly missions can be skipped if doing all dailies?
    const weeklyMissionsCanSkip = Math.max(0, (totalWeeksAvailable * WEEKLY_MISSIONS_COUNT) - weeklyMissionsIfAllDailies);

    setResult({
      pointsNeeded,
      currentLevel,
      targetLevel,
      remainingDays,
      dailyPointsAvailable,
      weeklyPointsAvailable: totalWeeklyPoints,
      totalPointsAvailable,
      isAchievable,
      pointsShortfall,
      dailyMissionsNeeded,
      weeklyMissionsNeeded,
      fullWeeksAvailable,
      partialWeekDays,
      achievableLevel,
      achievablePoints,
      dailyMissionsIfAllWeeklies,
      weeklyMissionsIfAllDailies,
      dailyMissionsCanSkip,
      weeklyMissionsCanSkip,
    });
  }, [currentLevel, currentProgress, remainingDays, getWeeklyPointsTotal, validateInputs]);

  const handleCurrentLevelChange = (value: number) => {
    const level = Math.max(1, Math.min(MAX_LEVEL, value));
    setCurrentLevel(level);
    // If at max level, reset progress to 0
    if (level === MAX_LEVEL) {
      setCurrentProgress(0);
    }
  };

  const handleCurrentProgressChange = (value: number) => {
    const progress = Math.max(0, Math.min(POINTS_PER_LEVEL - 1, value));
    setCurrentProgress(progress);
  };

  const handleRemainingDaysChange = (value: number) => {
    const days = Math.max(0, value);
    setRemainingDays(days);
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
            max={MAX_LEVEL}
            value={currentLevel || ''}
            onChange={(e) => handleCurrentLevelChange(parseInt(e.target.value) || 1)}
            className="w-full bg-theme-dark border border-border-dark rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-game-highlight"
            placeholder="Enter your current Event Pass level (1-50)"
          />
          <p className="text-xs text-foreground/60">
            Your current Event Pass level
          </p>
        </div>

        <div className="space-y-1">
          <label htmlFor="current-progress" className="block text-sm font-medium text-foreground">
            Progress Points in Current Level
          </label>
          <input
            type="number"
            id="current-progress"
            min="0"
            max={POINTS_PER_LEVEL - 1}
            value={currentProgress || ''}
            onChange={(e) => handleCurrentProgressChange(parseInt(e.target.value) || 0)}
            className="w-full bg-theme-dark border border-border-dark rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-game-highlight"
            placeholder="Enter points in current level (0-399)"
          />
          <p className="text-xs text-foreground/60">
            Points you have in your current level (0-399). 400 points = next level.
          </p>
        </div>

        <div className="space-y-1">
          <label htmlFor="remaining-days" className="block text-sm font-medium text-foreground">
            Remaining Days
          </label>
          <input
            type="number"
            id="remaining-days"
            min="0"
            value={remainingDays || ''}
            onChange={(e) => handleRemainingDaysChange(parseInt(e.target.value) || 0)}
            className="w-full bg-theme-dark border border-border-dark rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-game-highlight"
            placeholder="Enter remaining days in the Event Pass period"
          />
          <p className="text-xs text-foreground/60">
            Days until Event Pass ends
          </p>
        </div>

        <div className="space-y-1">
          <label htmlFor="weekly-points-option" className="block text-sm font-medium text-foreground">
            Weekly Mission Points Total
          </label>
          <select
            id="weekly-points-option"
            value={weeklyPointsOption}
            onChange={(e) => setWeeklyPointsOption(e.target.value as WeeklyPointsOption)}
            className="w-full bg-theme-dark border border-border-dark rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-game-highlight"
          >
            <option value="m_group_2">M_Group 2 ({formatNumber(WEEKLY_POINTS_M_GROUP_2)} points/week)</option>
            <option value="m_group_3">M_Group 3 ({formatNumber(WEEKLY_POINTS_M_GROUP_3)} points/week)</option>
            <option value="custom">Custom (enter your own)</option>
          </select>
          {weeklyPointsOption === 'custom' && (
            <input
              type="number"
              min="0"
              value={customWeeklyPoints || ''}
              onChange={(e) => setCustomWeeklyPoints(parseInt(e.target.value) || 0)}
              className="w-full mt-2 bg-theme-dark border border-border-dark rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-game-highlight"
              placeholder="Enter total weekly mission points"
            />
          )}
          <p className="text-xs text-foreground/60">
            Total points from all 20 weekly missions combined
          </p>
        </div>

        <button
          onClick={calculateRequirements}
          className="w-full bg-game-highlight hover:bg-game-highlight/80 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-200"
        >
          Calculate Requirements
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
          {/* Status Banner */}
          <div className={`p-4 rounded-lg border ${result.isAchievable 
            ? 'bg-green-500/20 border-green-500/40' 
            : 'bg-yellow-500/20 border-yellow-500/40'}`}>
            <div className="flex items-center gap-2">
              <span className={`text-lg font-bold ${result.isAchievable ? 'text-green-400' : 'text-yellow-400'}`}>
                {result.isAchievable ? '✓ Achievable' : '⚠ Not Fully Achievable'}
              </span>
            </div>
            {!result.isAchievable && (
              <p className="text-sm text-foreground/80 mt-2">
                You can reach level {result.achievableLevel} with {formatNumber(result.achievablePoints)} points.
                You're short by {formatNumber(result.pointsShortfall)} points to reach level {MAX_LEVEL}.
              </p>
            )}
          </div>

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
                    <td className="py-2 px-4 text-foreground/80">Current Level</td>
                    <td className="py-2 px-4 text-right text-foreground">{result.currentLevel} / {MAX_LEVEL}</td>
                  </tr>
                  <tr className="border-b border-border-dark">
                    <td className="py-2 px-4 text-foreground/80">Current Total Points</td>
                    <td className="py-2 px-4 text-right text-foreground">{formatNumber((currentLevel * POINTS_PER_LEVEL) + currentProgress)}</td>
                  </tr>
                  <tr className="border-b border-border-dark">
                    <td className="py-2 px-4 text-foreground/80">Progress in Level</td>
                    <td className="py-2 px-4 text-right text-foreground">{formatNumber(currentProgress)} / {POINTS_PER_LEVEL}</td>
                  </tr>
                  <tr className="border-b border-border-dark">
                    <td className="py-2 px-4 text-foreground/80">Points Needed</td>
                    <td className="py-2 px-4 text-right text-foreground">{formatNumber(result.pointsNeeded)}</td>
                  </tr>
                  <tr className="border-b border-border-dark">
                    <td className="py-2 px-4 text-foreground/80">Daily Points Available</td>
                    <td className="py-2 px-4 text-right text-foreground">{formatNumber(result.dailyPointsAvailable)}</td>
                  </tr>
                  <tr className="border-b border-border-dark">
                    <td className="py-2 px-4 text-foreground/80">Weekly Points Available</td>
                    <td className="py-2 px-4 text-right text-foreground">{formatNumber(result.weeklyPointsAvailable)}</td>
                  </tr>
                  <tr className="bg-game-highlight/10">
                    <td className="py-2 px-4 text-foreground font-medium">Total Points Available</td>
                    <td className="py-2 px-4 text-right text-game-highlight font-bold">{formatNumber(result.totalPointsAvailable)}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Mission Requirements */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground border-b border-border-dark pb-2">
              Mission Requirements
            </h3>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border-dark">
                    <th className="text-left py-3 px-4 text-foreground font-semibold">Mission Type</th>
                    <th className="text-center py-3 px-4 text-foreground font-semibold">Points per Mission</th>
                    <th className="text-center py-3 px-4 text-foreground font-semibold">Missions Needed</th>
                    <th className="text-right py-3 px-4 text-foreground font-semibold">Total Points</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border-dark hover:bg-theme-dark/30">
                    <td className="py-2 px-4 text-foreground">Daily Missions</td>
                    <td className="py-2 px-4 text-center text-foreground/80">{formatNumber(POINTS_PER_DAILY_MISSION)}</td>
                    <td className="py-2 px-4 text-center text-foreground font-semibold">{formatNumber(result.dailyMissionsNeeded)}</td>
                    <td className="py-2 px-4 text-right text-foreground">{formatNumber(result.dailyMissionsNeeded * POINTS_PER_DAILY_MISSION)}</td>
                  </tr>
                  <tr className="border-b border-border-dark hover:bg-theme-dark/30">
                    <td className="py-2 px-4 text-foreground">Weekly Missions</td>
                    <td className="py-2 px-4 text-center text-foreground/80">~{formatNumber(Math.round(getWeeklyPointsTotal() / WEEKLY_MISSIONS_COUNT))}</td>
                    <td className="py-2 px-4 text-center text-foreground font-semibold">{formatNumber(result.weeklyMissionsNeeded)}</td>
                    <td className="py-2 px-4 text-right text-foreground">{formatNumber(result.weeklyMissionsNeeded * (getWeeklyPointsTotal() / WEEKLY_MISSIONS_COUNT))}</td>
                  </tr>
                  <tr className="bg-game-highlight/10">
                    <td className="py-2 px-4 text-foreground font-medium">Total</td>
                    <td className="py-2 px-4 text-center text-foreground/80">—</td>
                    <td className="py-2 px-4 text-center text-game-highlight font-bold">{formatNumber(result.dailyMissionsNeeded + result.weeklyMissionsNeeded)}</td>
                    <td className="py-2 px-4 text-right text-game-highlight font-bold">{formatNumber(result.dailyMissionsNeeded * POINTS_PER_DAILY_MISSION + result.weeklyMissionsNeeded * (getWeeklyPointsTotal() / WEEKLY_MISSIONS_COUNT))}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Skip Calculations */}
          {result.isAchievable && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground border-b border-border-dark pb-2">
                Mission Flexibility
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* If doing all weeklies */}
                <div className="bg-theme-dark p-4 rounded-lg border border-border-dark">
                  <h4 className="text-sm font-semibold text-foreground mb-3">If you complete ALL weekly missions:</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-foreground/80">
                      <strong className="text-foreground">Daily missions needed:</strong> {formatNumber(result.dailyMissionsIfAllWeeklies)}
                    </p>
                    <p className="text-foreground/80">
                      <strong className="text-foreground">Daily missions you can skip:</strong> <span className="text-green-400 font-semibold">{formatNumber(result.dailyMissionsCanSkip)}</span>
                    </p>
                    <p className="text-xs text-foreground/60 mt-2">
                      Out of {formatNumber(result.remainingDays * DAILY_MISSIONS_COUNT)} total daily missions available
                    </p>
                  </div>
                </div>

                {/* If doing all dailies */}
                <div className="bg-theme-dark p-4 rounded-lg border border-border-dark">
                  <h4 className="text-sm font-semibold text-foreground mb-3">If you complete ALL daily missions:</h4>
                  <div className="space-y-2 text-sm">
                    <p className="text-foreground/80">
                      <strong className="text-foreground">Weekly missions needed:</strong> {formatNumber(result.weeklyMissionsIfAllDailies)}
                    </p>
                    <p className="text-foreground/80">
                      <strong className="text-foreground">Weekly missions you can skip:</strong> <span className="text-green-400 font-semibold">{formatNumber(result.weeklyMissionsCanSkip)}</span>
                    </p>
                    <p className="text-xs text-foreground/60 mt-2">
                      Out of {formatNumber((result.fullWeeksAvailable + (result.partialWeekDays > 0 ? 1 : 0)) * WEEKLY_MISSIONS_COUNT)} total weekly missions available
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Breakdown by Week */}
          {(result.fullWeeksAvailable > 0 || result.partialWeekDays > 0) && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground border-b border-border-dark pb-2">
                Weekly Breakdown
              </h3>
              <div className="bg-theme-dark p-4 rounded-lg border border-border-dark">
                <p className="text-sm text-foreground/80 mb-2">
                  <strong>Full weeks available:</strong> {result.fullWeeksAvailable}
                </p>
                {result.partialWeekDays > 0 && (
                  <p className="text-sm text-foreground/80 mb-2">
                    <strong>Partial week days:</strong> {result.partialWeekDays} (counts as full week for weekly missions)
                  </p>
                )}
                <p className="text-sm text-foreground/80 mb-2">
                  <strong>Total weeks with weekly missions:</strong> {result.fullWeeksAvailable + (result.partialWeekDays > 0 ? 1 : 0)}
                </p>
                <p className="text-sm text-foreground/80">
                  <strong>Per full week:</strong> {formatNumber(DAILY_POINTS * 7)} daily points + {formatNumber(getWeeklyPointsTotal())} weekly points = {formatNumber(DAILY_POINTS * 7 + getWeeklyPointsTotal())} total points
                </p>
              </div>
            </div>
          )}

          {/* Additional Info */}
          <div className="text-xs text-foreground/60 bg-theme-dark p-3 rounded-lg border border-border-dark">
            <p className="mb-1"><strong>Note:</strong> Daily missions reset every day (3 missions × 50 points = 150 points/day).</p>
            <p className="mb-1"><strong>Note:</strong> Weekly missions reset every week (20 missions = {formatNumber(getWeeklyPointsTotal())} points/week).</p>
            <p><strong>Tip:</strong> Complete weekly missions first as they provide more points per mission on average.</p>
          </div>
        </div>
      )}
    </div>
  );
}

