/**
 * Epic Options Data Transformer
 * Transforms equipment-specific epic options into cascading dropdown format
 */

import { getStatInfo } from '@/tools/build-planner/data/stats-config';
import { EpicOption, EpicCategory } from './CascadingEpicDropdown';
import { getEquipmentStrategy } from '../../../strategies/equipment-strategy';

// Equipment types and strategy pattern
import { Equipment, isVehicle } from '../../../types/base-equipment';

/**
 * Transform normal epic options into cascading dropdown format
 */
export const transformNormalEpicOptions = (equipment: Equipment): EpicCategory[] => {
  // Get available stats using strategy pattern
  const strategy = getEquipmentStrategy(equipment);
  const availableStats = strategy.getAvailableEpicStats();

  // Group stats by category and create options for each level
  const categoryMap = new Map<string, EpicOption[]>();

  availableStats.forEach(stat => {
    const statInfo = getStatInfo(stat);
    const categoryName = statInfo?.name || stat.replace(/([A-Z])/g, ' $1').trim();
    
    // Get max level and create options using strategy pattern
    const maxLevel = strategy.getEpicOptionMaxLevel(stat);
    const options: EpicOption[] = [];
    
    for (let level = 1; level <= maxLevel; level++) {
      const value = strategy.getEpicOptionStatValue(stat, level);

      if (value > 0) {
        const statInfo = getStatInfo(stat);
        const suffix = statInfo?.isPercentage ? '%' : '';
        options.push({
          id: `${stat}_${level}`,
          displayName: `${categoryName} +${value}${suffix}`,
          value,
          category: categoryName,
          description: `Level ${level} ${categoryName}`
        });
      }
    }

    if (options.length > 0) {
      categoryMap.set(stat, options);
    }
  });

  // Convert to categories array
  const categories: EpicCategory[] = [];
  categoryMap.forEach((options, stat) => {
    const statInfo = getStatInfo(stat);
    categories.push({
      id: stat,
      name: statInfo?.name || stat.replace(/([A-Z])/g, ' $1').trim(),
      options
    });
  });

  return categories.sort((a, b) => a.name.localeCompare(b.name));
};

/**
 * Transform master epic options into cascading dropdown format
 */
export const transformMasterEpicOptions = (equipment: Equipment): EpicCategory[] => {
  if (isVehicle(equipment)) {
    return []; // Vehicles don't have master epic options
  }

  // Get available master options using strategy pattern
  const strategy = getEquipmentStrategy(equipment);
  const availableOptions = strategy.getAvailableMasterEpicOptions();

  const categories: EpicCategory[] = [];

  availableOptions.forEach(optionName => {
    // Get definition and max level using strategy pattern
    const definition = strategy.getMasterEpicOptionDefinition(optionName);
    const maxLevel = strategy.getMasterEpicOptionMaxLevel(optionName);

    if (!definition) return;

    const options: EpicOption[] = [];
    
    // Create options for each level
    for (let level = 1; level <= maxLevel; level++) {
      const statValues = strategy.getMasterEpicOptionValues(optionName, level);

      // Create display name from stat values
      const statsDisplay = Object.entries(statValues).map(([stat, value]) => {
        const statInfo = getStatInfo(stat);
        const statName = statInfo?.name || stat.replace(/([A-Z])/g, ' $1').trim();
        const valueDisplay = `+${value}${statInfo?.isPercentage ? '%' : ''}`;
        return `${statName}: ${valueDisplay}`;
      }).join(', ');

      if (Object.keys(statValues).length > 0) {
        options.push({
          id: `${optionName}_${level}`,
          displayName: `${definition.name} Lv.${level} (${statsDisplay})`,
          value: level, // For master options, the level is the "value"
          category: definition.name,
          description: definition.description
        });
      }
    }

    if (options.length > 0) {
      categories.push({
        id: optionName,
        name: definition.name,
        options
      });
    }
  });

  return categories.sort((a, b) => a.name.localeCompare(b.name));
};

/**
 * Parse selected option ID back to stat and level
 */
export const parseSelectedOption = (optionId: string | null): { stat: string; level: number; type: 'normal' | 'master' } | null => {
  if (!optionId) return null;
  
  const parts = optionId.split('_');
  if (parts.length < 2) return null;
  
  const level = parseInt(parts[parts.length - 1]);
  const stat = parts.slice(0, -1).join('_');
  
  // Determine if it's a master option based on common master option patterns
  // Master options typically have multiple underscores or specific known patterns
  const masterPatterns = [
    'criticalDamage_accuracy', 'hp_def', 'allAttackUp_criticalRate', 'skillAmp_criticalDamage',
    'hp_mp', 'def_resist', 'criticalRate_criticalDamage', 'accuracy_penetration',
    // Weapon master epic options
    'combat_mastery',
    // Armor master epic options
    'combat_vitality', 'combat_focus', 'combat_defense', 'combat_resilience', 'master_combat'
  ];
  
  // Check if it's a known master pattern or has multiple underscores (indicating multi-stat)
  const underscoreCount = (stat.match(/_/g) || []).length;
  const isMaster = masterPatterns.some(pattern => stat === pattern) || underscoreCount >= 2;
  
  return {
    stat,
    level,
    type: isMaster ? 'master' : 'normal'
  };
};

/**
 * Create option ID from stat and level
 */
export const createOptionId = (stat: string, level: number): string => {
  return `${stat}_${level}`;
};