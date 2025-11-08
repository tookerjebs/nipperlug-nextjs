import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { BuildStats, useBuildPlannerStore } from './buildPlannerStore';
import { statsConfig } from '../data/stats-config';

/**
 * Interface for the Stat Registry State
 * Tracks stats contributed by each system
 */
interface StatRegistryState {
  // Maps system IDs to their contributed stats
  systemStats: Record<string, BuildStats>;
  // Original combined stats before processing pseudo-stats (for display purposes)
  displayStats: BuildStats;
  // Debug flag to enable logging
  debugMode: boolean;
}

/**
 * Interface for the Stat Registry Actions
 * Provides methods to register and unregister stats
 */
interface StatRegistryActions {
  /**
   * Register stats from a system
   * @param systemId Unique identifier for the system (e.g., 'pet', 'gear', 'skill')
   * @param stats The stats contributed by this system
   */
  registerSystemStats: (systemId: string, stats: BuildStats) => void;
  
  /**
   * Unregister a system and remove its stats
   * @param systemId Unique identifier for the system
   */
  unregisterSystem: (systemId: string) => void;
  
  /**
   * Get combined stats from all registered systems
   * @returns Combined BuildStats object
   */
  getAllStats: () => BuildStats;
  
  /**
   * Get combined stats for display purposes (including pseudo-stats)
   * @returns Combined BuildStats object with pseudo-stats preserved
   */
  getDisplayStats: () => BuildStats;
  
  /**
   * Get stats contributed by a specific system
   * @param systemId Unique identifier for the system
   * @returns BuildStats object for the specified system
   */
  getSystemStats: (systemId: string) => BuildStats;
  
  /**
   * Toggle debug mode
   * @param enabled Whether debug mode should be enabled
   */
  setDebugMode: (enabled: boolean) => void;
  
  /**
   * Log debug information if debug mode is enabled
   * @param message Debug message
   * @param data Optional data to log
   */
  debugLog: (message: string, data?: any) => void;
}

/**
 * Process pseudo-stats that affect other stats
 * @param stats The combined stats to process
 * @returns Processed stats with pseudo-stats applied
 */
function processPseudoStats(stats: BuildStats): BuildStats {
  const processedStats = { ...stats };
  
  // Process allSkillAmp - increases both sword and magic skill amp
  if (processedStats.allSkillAmp) {
    const allSkillAmpValue = processedStats.allSkillAmp;
    
    // Add to swordSkillAmp
    processedStats.swordSkillAmp = (processedStats.swordSkillAmp || 0) + allSkillAmpValue;
    
    // Add to magicSkillAmp
    processedStats.magicSkillAmp = (processedStats.magicSkillAmp || 0) + allSkillAmpValue;
    
    // Remove the pseudo-stat from final stats to avoid double counting in CP calculations
    delete processedStats.allSkillAmp;
  }

  // Process pveAllSkillAmp - increases both PvE sword and magic skill amp
  if (processedStats.pveAllSkillAmp) {
    const pveAllSkillAmpValue = processedStats.pveAllSkillAmp;
    
    // Add to pveSwordSkillAmp
    processedStats.pveSwordSkillAmp = (processedStats.pveSwordSkillAmp || 0) + pveAllSkillAmpValue;
    
    // Add to pveMagicSkillAmp
    processedStats.pveMagicSkillAmp = (processedStats.pveMagicSkillAmp || 0) + pveAllSkillAmpValue;
    
    // Remove the pseudo-stat from final stats to avoid double counting in CP calculations
    delete processedStats.pveAllSkillAmp;
  }

  // Process pvpAllSkillAmp - increases both PvP sword and magic skill amp
  if (processedStats.pvpAllSkillAmp) {
    const pvpAllSkillAmpValue = processedStats.pvpAllSkillAmp;
    
    // Add to pvpSwordSkillAmp
    processedStats.pvpSwordSkillAmp = (processedStats.pvpSwordSkillAmp || 0) + pvpAllSkillAmpValue;
    
    // Add to pvpMagicSkillAmp
    processedStats.pvpMagicSkillAmp = (processedStats.pvpMagicSkillAmp || 0) + pvpAllSkillAmpValue;
    
    // Remove the pseudo-stat from final stats to avoid double counting in CP calculations
    delete processedStats.pvpAllSkillAmp;
  }
  
  // Process allAttackUp - increases both physical and magic attack
  // Also applies allAttackUpPercent if present (percentage bonus to allAttackUp)
  if (processedStats.allAttackUp) {
    let allAttackUpValue = processedStats.allAttackUp;
    
    // Apply allAttackUpPercent if it exists (adds percentage bonus to allAttackUp)
    if (processedStats.allAttackUpPercent) {
      const percentBonus = allAttackUpValue * (processedStats.allAttackUpPercent / 100);
      allAttackUpValue = allAttackUpValue + percentBonus;
    }
    
    // Add to attack
    processedStats.attack = (processedStats.attack || 0) + allAttackUpValue;
    
    // Add to magicAttack
    processedStats.magicAttack = (processedStats.magicAttack || 0) + allAttackUpValue;
    
    // Remove the pseudo-stats from final stats to avoid double counting in CP calculations
    delete processedStats.allAttackUp;
    if (processedStats.allAttackUpPercent) {
      delete processedStats.allAttackUpPercent;
    }
  } else if (processedStats.allAttackUpPercent) {
    // If only allAttackUpPercent exists without allAttackUp, remove it (no base to apply to)
    delete processedStats.allAttackUpPercent;
  }

  // Process pveAllAttackUp - increases both PvE physical and magic attack
  if (processedStats.pveAllAttackUp) {
    const pveAllAttackUpValue = processedStats.pveAllAttackUp;
    
    // Add to pveAttack
    processedStats.pveAttack = (processedStats.pveAttack || 0) + pveAllAttackUpValue;
    
    // Add to pveMagicAttack
    processedStats.pveMagicAttack = (processedStats.pveMagicAttack || 0) + pveAllAttackUpValue;
    
    // Remove the pseudo-stat from final stats to avoid double counting in CP calculations
    delete processedStats.pveAllAttackUp;
  }

  // Process pvpAllAttackUp - increases both PvP physical and magic attack
  if (processedStats.pvpAllAttackUp) {
    const pvpAllAttackUpValue = processedStats.pvpAllAttackUp;
    
    // Add to pvpAttack
    processedStats.pvpAttack = (processedStats.pvpAttack || 0) + pvpAllAttackUpValue;
    
    // Add to pvpMagicAttack
    processedStats.pvpMagicAttack = (processedStats.pvpMagicAttack || 0) + pvpAllAttackUpValue;
    
    // Remove the pseudo-stat from final stats to avoid double counting in CP calculations
    delete processedStats.pvpAllAttackUp;
  }

  // Process resistSkillAmp - increases both sword and magic skill amp resistance
  if (processedStats.resistSkillAmp) {
    const resistSkillAmpValue = processedStats.resistSkillAmp;
    
    // Add to resistSwordSkillAmp
    processedStats.resistSwordSkillAmp = (processedStats.resistSwordSkillAmp || 0) + resistSkillAmpValue;
    
    // Add to resistMagicSkillAmp
    processedStats.resistMagicSkillAmp = (processedStats.resistMagicSkillAmp || 0) + resistSkillAmpValue;
    
    // Remove the pseudo-stat from final stats to avoid double counting in CP calculations
    delete processedStats.resistSkillAmp;
  }

  // Process pveResistSkillAmp - increases both PvE sword and magic skill amp resistance
  if (processedStats.pveResistSkillAmp) {
    const pveResistSkillAmpValue = processedStats.pveResistSkillAmp;
    
    // Add to pveResistSwordSkillAmp
    processedStats.pveResistSwordSkillAmp = (processedStats.pveResistSwordSkillAmp || 0) + pveResistSkillAmpValue;
    
    // Add to pveResistMagicSkillAmp
    processedStats.pveResistMagicSkillAmp = (processedStats.pveResistMagicSkillAmp || 0) + pveResistSkillAmpValue;
    
    // Remove the pseudo-stat from final stats to avoid double counting in CP calculations
    delete processedStats.pveResistSkillAmp;
  }

  // Process pvpResistSkillAmp - increases both PvP sword and magic skill amp resistance
  if (processedStats.pvpResistSkillAmp) {
    const pvpResistSkillAmpValue = processedStats.pvpResistSkillAmp;
    
    // Add to pvpResistSwordSkillAmp
    processedStats.pvpResistSwordSkillAmp = (processedStats.pvpResistSwordSkillAmp || 0) + pvpResistSkillAmpValue;
    
    // Add to pvpResistMagicSkillAmp
    processedStats.pvpResistMagicSkillAmp = (processedStats.pvpResistMagicSkillAmp || 0) + pvpResistSkillAmpValue;
    
    // Remove the pseudo-stat from final stats to avoid double counting in CP calculations
    delete processedStats.pvpResistSkillAmp;
  }
  
  // Cap crit rate at max crit rate (base from config, can be increased up to 100%)
  if (processedStats.criticalRate !== undefined) {
    // maxCriticalRate from equipment should be ADDED to base max crit rate, not replace it
    const equipmentMaxCritRate = processedStats.maxCriticalRate || 0;
    const totalMaxCritRate = Math.min(statsConfig.baseStats.maxCriticalRate + equipmentMaxCritRate, 100);
    processedStats.criticalRate = Math.min(processedStats.criticalRate, totalMaxCritRate);
  }
  
  return processedStats;
}

/**
 * Combine stats from all systems without processing pseudo-stats
 * @param systemStats Record of system stats
 * @returns Combined stats with pseudo-stats preserved
 */
function combineStats(systemStats: Record<string, BuildStats>): BuildStats {
  const combinedStats: BuildStats = {};
  
  Object.values(systemStats).forEach(systemStat => {
    Object.entries(systemStat).forEach(([statId, value]) => {
      if (value !== 0) { // Skip zero values
        combinedStats[statId] = (combinedStats[statId] || 0) + value;
      }
    });
  });
  
  return combinedStats;
}

/**
 * Stat Registry Store
 * Central store for tracking stats contributed by different systems
 */
export const useStatRegistryStore = create<StatRegistryState & StatRegistryActions>()(subscribeWithSelector((set, get) => ({
  // Initial state
  systemStats: {},
  displayStats: {},
  debugMode: false,
  
  // Register stats from a system
  registerSystemStats: (systemId, stats) => {
    const { debugLog } = get();
    debugLog(`Registering stats for system: ${systemId}`, stats);
    
    set(state => {
      const newSystemStats = {
        ...state.systemStats,
        [systemId]: stats
      };
      
      // Update display stats (with pseudo-stats preserved)
      const newDisplayStats = combineStats(newSystemStats);
      
      return {
        systemStats: newSystemStats,
        displayStats: newDisplayStats
      };
    });
    
    // Update the build planner with combined stats (processed for calculations)
    const allStats = get().getAllStats();
    debugLog(`Combined stats after registering ${systemId}:`, allStats);
    useBuildPlannerStore.getState().setMultipleStats(allStats);
  },
  
  // Unregister a system and remove its stats
  unregisterSystem: (systemId) => {
    const { debugLog } = get();
    debugLog(`Unregistering system: ${systemId}`);
    
    set(state => {
      const newSystemStats = { ...state.systemStats };
      delete newSystemStats[systemId];
      
      // Update display stats (with pseudo-stats preserved)
      const newDisplayStats = combineStats(newSystemStats);
      
      return { 
        systemStats: newSystemStats,
        displayStats: newDisplayStats
      };
    });
    
    // Update the build planner with remaining stats
    const allStats = get().getAllStats();
    debugLog(`Combined stats after unregistering ${systemId}:`, allStats);
    useBuildPlannerStore.getState().setMultipleStats(allStats);
  },
  
  // Get combined stats from all registered systems (processed for calculations)
  getAllStats: () => {
    const { systemStats, debugLog } = get();
    
    // Combine all stats (no override mode in damage calculator)
    const allStats = combineStats(systemStats);
    
    // Process pseudo-stats before returning
    const processedStats = processPseudoStats(allStats);
    debugLog(`Processed stats after handling pseudo-stats:`, processedStats);
    
    return processedStats;
  },
  
  // Get combined stats for display purposes (with pseudo-stats preserved)
  getDisplayStats: () => {
    return get().displayStats;
  },
  
  // Get stats contributed by a specific system
  getSystemStats: (systemId) => {
    return get().systemStats[systemId] || {};
  },
  
  // Toggle debug mode
  setDebugMode: (enabled) => {
    set({ debugMode: enabled });
  },
  
  // Log debug information if debug mode is enabled
  debugLog: (message, data) => {
    // Debug logging removed for production
  }
})));