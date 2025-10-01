/**
 * Theme utility for centralized color management
 * This file provides easy access to theme colors and utilities for theme switching
 */

export const themeColors = {
  // Base theme colors
  background: {
    primary: 'bg-theme-primary',
    secondary: 'bg-theme-secondary',
    light: 'bg-theme-light',
    dark: 'bg-theme-dark',
    darkest: 'bg-theme-darkest',
  },
  
  // Component-specific backgrounds
  components: {
    sidebar: 'bg-component-sidebar',
    summary: 'bg-component-summary',
    card: 'bg-component-card',
  },
  
  // Stat category colors
  stats: {
    offensive: {
      text: 'text-stat-offensive',
      bg: 'bg-stat-offensive-bg',
      border: 'border-stat-offensive-border',
    },
    defensive: {
      text: 'text-stat-defensive',
      bg: 'bg-stat-defensive-bg',
      border: 'border-stat-defensive-border',
    },
    utility: {
      text: 'text-stat-utility',
      bg: 'bg-stat-utility-bg',
      border: 'border-stat-utility-border',
    },
  },
} as const;

/**
 * Get theme classes for a specific component
 */
export const getComponentTheme = (component: keyof typeof themeColors.components) => {
  return themeColors.components[component];
};

/**
 * Get stat category theme classes
 */
export const getStatTheme = (category: keyof typeof themeColors.stats) => {
  return themeColors.stats[category];
};

/**
 * Utility function to combine theme classes
 */
export const combineThemeClasses = (...classes: string[]) => {
  return classes.filter(Boolean).join(' ');
};

/**
 * Theme variants for easy switching
 */
export const themeVariants = {
  default: 'default',
  darker: 'darker',
  game: 'game',
} as const;

export type ThemeVariant = keyof typeof themeVariants;