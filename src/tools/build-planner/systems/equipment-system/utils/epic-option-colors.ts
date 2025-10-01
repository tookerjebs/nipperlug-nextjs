/**
 * Utility functions for epic option color styling
 */

export interface EpicOptionColorClasses {
  text: string;
  background?: string;
  accent?: string;
}

/**
 * Get color classes for epic options based on level and type
 * @param level Epic option level (1-6)
 * @param type Epic option type ('normal' or 'master')
 * @returns Object containing CSS classes for text, background, and accent colors
 */
export const getEpicOptionColors = (level: number, type: 'normal' | 'master' = 'normal'): EpicOptionColorClasses => {
  // Master/multi-stat epic options keep the current purple color
  if (type === 'master') {
    return {
      text: 'text-purple-600',
      background: 'bg-purple-900/30',
      accent: 'text-purple-600'
    };
  }

  // Normal epic options: levels 1-3 are green, levels 4-6 are purple
  if (level >= 1 && level <= 3) {
    return {
      text: 'text-green-400',
      background: 'bg-green-900/30',
      accent: 'text-green-400'
    };
  } else {
    return {
      text: 'text-purple-600',
      background: 'bg-purple-900/30',
      accent: 'text-purple-600'
    };
  }
};

/**
 * Get text color class for epic options (shorthand for common use case)
 * @param level Epic option level (1-6)
 * @param type Epic option type ('normal' or 'master')
 * @returns CSS class string for text color
 */
export const getEpicOptionTextColor = (level: number, type: 'normal' | 'master' = 'normal'): string => {
  return getEpicOptionColors(level, type).text;
};